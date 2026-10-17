"use client";

import * as React from "react";
type DiffChange = {
  type: "change";
  remove: string;
  insert: string;
};
type DiffDecision = "accepted" | "rejected";
interface DiffChangeEntry {
  seg: number;
  remove: string;
  insert: string;
}
type DiffSegment =
  | {
      type: "equal";
      text: string;
    }
  | DiffChange;
type InlineDiffHandle = {
  highlight: (index: number | null) => void;
  accept: (index: number) => void;
  reject: (index: number) => void;
  acceptAll: () => void;
  rejectAll: () => void;
  undo: () => void;
  reset: () => void;
};
interface InlineDiffProps {
  original?: string;
  suggested?: string;
  changes?: DiffSegment[];
  onChange?: (text: string) => void;
  onDone?: (text: string) => void;
  label?: string;
  ref?: React.Ref<InlineDiffHandle>;
  className?: string;
}
var diffTokenPattern = /\s+|[\p{L}\p{N}_'’]+|[^\s\p{L}\p{N}_]/gu;
var isWhitespace = (text: string) => /^\s+$/.test(text);
function diffWords(original: string, suggested: string): DiffSegment[] {
  let beforeTokens = original.match(diffTokenPattern) ?? [],
    afterTokens = suggested.match(diffTokenPattern) ?? [],
    prefixCount = 0;
  for (
    ;
    prefixCount < beforeTokens.length &&
    prefixCount < afterTokens.length &&
    beforeTokens[prefixCount] === afterTokens[prefixCount];
  )
    prefixCount++;
  let suffixCount = 0;
  for (
    ;
    suffixCount < beforeTokens.length - prefixCount &&
    suffixCount < afterTokens.length - prefixCount &&
    beforeTokens[beforeTokens.length - 1 - suffixCount] ===
      afterTokens[afterTokens.length - 1 - suffixCount];
  )
    suffixCount++;
  let beforeMiddle = beforeTokens.slice(prefixCount, beforeTokens.length - suffixCount),
    afterMiddle = afterTokens.slice(prefixCount, afterTokens.length - suffixCount),
    beforeCount = beforeMiddle.length,
    afterCount = afterMiddle.length,
    operations = beforeTokens.slice(0, prefixCount).map((e) => ({
      t: 0,
      s: e,
    }));
  if (beforeCount * afterCount > 4e6)
    (beforeMiddle.forEach((e) =>
      operations.push({
        t: 1,
        s: e,
      }),
    ),
      afterMiddle.forEach((e) =>
        operations.push({
          t: 2,
          s: e,
        }),
      ));
  else {
    let e = afterCount + 1,
      t = new Uint16Array((beforeCount + 1) * e);
    for (let n = beforeCount - 1; n >= 0; n--)
      for (let r = afterCount - 1; r >= 0; r--)
        t[n * e + r] =
          beforeMiddle[n] === afterMiddle[r]
            ? t[(n + 1) * e + r + 1] + 1
            : Math.max(t[(n + 1) * e + r], t[n * e + r + 1]);
    let n = 0,
      r = 0;
    for (; n < beforeCount && r < afterCount;)
      beforeMiddle[n] === afterMiddle[r]
        ? (operations.push({
            t: 0,
            s: beforeMiddle[n],
          }),
          n++,
          r++)
        : t[(n + 1) * e + r] >= t[n * e + r + 1]
          ? operations.push({
              t: 1,
              s: beforeMiddle[n++],
            })
          : operations.push({
              t: 2,
              s: afterMiddle[r++],
            });
    for (; n < beforeCount;)
      operations.push({
        t: 1,
        s: beforeMiddle[n++],
      });
    for (; r < afterCount;)
      operations.push({
        t: 2,
        s: afterMiddle[r++],
      });
  }
  beforeTokens.slice(beforeTokens.length - suffixCount).forEach((e) =>
    operations.push({
      t: 0,
      s: e,
    }),
  );
  for (let e = 0; e < operations.length; e++) {
    if (operations[e].t === 0 || (e > 0 && operations[e - 1].t !== 0)) continue;
    let t = operations[e].t,
      n = e;
    for (; n < operations.length && operations[n].t === t;) n++;
    if (!(n < operations.length && operations[n].t !== 0)) {
      for (
        ;
        n < operations.length &&
        operations[n].t === 0 &&
        operations[n].s === operations[e].s &&
        isWhitespace(operations[e].s);
      )
        ((operations[n] = {
          t,
          s: operations[n].s,
        }),
          (operations[e] = {
            t: 0,
            s: operations[e].s,
          }),
          e++,
          n++);
      e = n - 1;
    }
  }
  let grouped: DiffSegment[] = [];
  for (let e of operations) {
    let t = grouped[grouped.length - 1];
    if (e.t === 0)
      t?.type === `equal`
        ? (t.text += e.s)
        : grouped.push({
            type: `equal`,
            text: e.s,
          });
    else {
      t?.type !== `change` &&
        grouped.push({
          type: `change`,
          remove: ``,
          insert: ``,
        });
      let n = grouped[grouped.length - 1] as DiffChange;
      e.t === 1 ? (n.remove += e.s) : (n.insert += e.s);
    }
  }
  let merged: DiffSegment[] = [];
  for (let e = 0; e < grouped.length; e++) {
    let t = grouped[e],
      n = merged[merged.length - 1],
      r = grouped[e + 1];
    if (
      t.type === `equal` &&
      isWhitespace(t.text) &&
      n?.type === `change` &&
      r?.type === `change`
    ) {
      ((n.remove += t.text + r.remove), (n.insert += t.text + r.insert), e++);
      continue;
    }
    merged.push({
      ...t,
    });
  }
  let output: DiffSegment[] = [],
    pushEqual = (e: string) => {
      if (!e) return;
      let t = output[output.length - 1];
      t?.type === `equal`
        ? (t.text += e)
        : output.push({
            type: `equal`,
            text: e,
          });
    };
  for (let e of merged) {
    if (e.type === `equal`) {
      pushEqual(e.text);
      continue;
    }
    let { remove: t, insert: n } = e,
      r = ``,
      i = ``;
    if (t && n) {
      let e = t.match(/^\s+/)?.[0] ?? ``;
      e &&
        n.startsWith(e) &&
        e.length < t.length &&
        e.length < n.length &&
        ((r = e), (t = t.slice(e.length)), (n = n.slice(e.length)));
      let a = t.match(/\s+$/)?.[0] ?? ``;
      a &&
        n.endsWith(a) &&
        a.length < t.length &&
        a.length < n.length &&
        ((i = a), (t = t.slice(0, -a.length)), (n = n.slice(0, -a.length)));
    }
    (pushEqual(r),
      output.push({
        type: `change`,
        remove: t,
        insert: n,
      }),
      pushEqual(i));
  }
  return output;
}
var suggestionCount = (count: number) => `${count} suggestion${count === 1 ? `` : `s`}`;
var quoteText = (text: string) => `“${text.trim()}”`;
var describeChange = (change: { remove: string; insert: string }) =>
  change.remove.trim() && change.insert.trim()
    ? `replace ${quoteText(change.remove)} with ${quoteText(change.insert)}`
    : change.insert.trim()
      ? `add ${quoteText(change.insert)}`
      : `remove ${quoteText(change.remove)}`;
function InlineDiff({
  original = ``,
  suggested = ``,
  changes: changes,
  onChange: onChange,
  onDone: onDone,
  label: label,
  ref: forwardedRef,
  className: className,
}: InlineDiffProps) {
  let segments = React.useMemo(
      () => changes ?? diffWords(original, suggested),
      [changes, original, suggested],
    ),
    signature = React.useMemo(() => JSON.stringify(segments), [segments]),
    changeList = React.useMemo(() => {
      let e: DiffChangeEntry[] = [];
      return (
        segments.forEach((t, n) => {
          t.type === `change` &&
            e.push({
              seg: n,
              remove: t.remove,
              insert: t.insert,
            });
        }),
        e
      );
    }, [segments]),
    [decisions, setDecisions] = React.useState<Partial<Record<number, DiffDecision>>>({}),
    [history, setHistory] = React.useState<number[][]>([]),
    [hovered, setHovered] = React.useState<number | null>(null),
    [focused, setFocused] = React.useState<number | null>(null),
    [highlighted, setHighlighted] = React.useState<number | null>(null),
    [announcement, setAnnouncement] = React.useState(``),
    [previousSignature, setPreviousSignature] = React.useState(signature);
  previousSignature !== signature &&
    (setPreviousSignature(signature),
    setDecisions({}),
    setHistory([]),
    setHovered(null),
    setFocused(null),
    setHighlighted(null));
  let rootRef = React.useRef<HTMLDivElement | null>(null),
    changeRefs = React.useRef<HTMLDivElement | null>(null),
    toolbarRef = React.useRef<HTMLDivElement | null>(null),
    undoRef = React.useRef<HTMLButtonElement | null>(null),
    registeredRefs = React.useRef<Array<HTMLSpanElement | null>>([]),
    activeRef = React.useRef(0),
    pendingFocusRef = React.useRef<number | "undo" | number | null>(null),
    latestDecisionRef = React.useRef<number | null>(null),
    callbacksRef = React.useRef({
      onChange: onChange,
      onDone: onDone,
    });
  callbacksRef.current = {
    onChange: onChange,
    onDone: onDone,
  };
  let pendingIndices = changeList.map((e, t) => t).filter((e) => !decisions[e]),
    allReviewed = changeList.length > 0 && pendingIndices.length === 0,
    composeText = (e: Partial<Record<number, DiffDecision>>) =>
      segments
        .map((t, n) =>
          t.type === `equal`
            ? t.text
            : e[changeList.findIndex((e) => e.seg === n)] === `accepted`
              ? t.insert
              : t.remove,
        )
        .join(``),
    currentRef = React.useRef({
      decisions: decisions,
      history: history,
      list: changeList,
      pending: pendingIndices,
    });
  currentRef.current = {
    decisions: decisions,
    history: history,
    list: changeList,
    pending: pendingIndices,
  };
  let applyDecision = (e: number[], t: DiffDecision, n: boolean = false) => {
      let { decisions: r, list: i } = currentRef.current,
        a = e.filter((e) => e >= 0 && e < i.length && !r[e]);
      if (!a.length) return;
      let o = {
        ...r,
      };
      a.forEach((e) => (o[e] = t));
      let c = i.length - Object.keys(o).length;
      (setDecisions(o),
        setHistory((e) => [...e, a]),
        setHighlighted(null),
        (latestDecisionRef.current = Math.max(...a)));
      let u = t === `accepted` ? `Accepted` : `Rejected`,
        d =
          a.length === 1
            ? describeChange(i[a[0]]).replace(/^./, (e) => e.toUpperCase())
            : `${a.length} suggestions`;
      if (
        (setAnnouncement(
          `${u}: ${d}. ${c ? `${suggestionCount(c)} left.` : `All changes reviewed.`}`,
        ),
        n)
      ) {
        let e = Math.max(...a),
          t = i.map((e, t) => t).filter((e) => !o[e]);
        pendingFocusRef.current = c ? (t.find((t) => t > e) ?? t[0]) : `undo`;
      }
      let f = composeText(o);
      (callbacksRef.current.onChange?.(f), c || callbacksRef.current.onDone?.(f));
    },
    undo = (e: boolean = false) => {
      let { decisions: t, history: n } = currentRef.current,
        r = n[n.length - 1];
      if (!r) return;
      let i = {
        ...t,
      };
      (r.forEach((e) => delete i[e]),
        setDecisions(i),
        setHistory(n.slice(0, -1)),
        setAnnouncement(
          `Undone. ${suggestionCount(currentRef.current.list.length - Object.keys(i).length)} left.`,
        ),
        e && (pendingFocusRef.current = Math.min(...r)),
        callbacksRef.current.onChange?.(composeText(i)));
    },
    reset = () => {
      (setDecisions({}),
        setHistory([]),
        setHighlighted(null),
        setHovered(null),
        setAnnouncement(``),
        (latestDecisionRef.current = null));
    };
  (React.useImperativeHandle(forwardedRef, () => ({
    highlight: (e: number | null) => setHighlighted(e),
    accept: (e) => applyDecision([e], `accepted`),
    reject: (e) => applyDecision([e], `rejected`),
    acceptAll: () => applyDecision(currentRef.current.pending, `accepted`),
    rejectAll: () => applyDecision(currentRef.current.pending, `rejected`),
    undo: () => undo(),
    reset: reset,
  })),
    React.useLayoutEffect(() => {
      let e = pendingFocusRef.current;
      e !== null &&
        ((pendingFocusRef.current = null),
        e === `undo` ? undoRef.current?.focus() : registeredRefs.current[e]?.focus());
    }, [decisions]));
  let q =
    [hovered, focused, highlighted].find(
      (e) => e !== null && !decisions[e] && e < changeList.length,
    ) ?? null;
  React.useEffect(() => {
    q !== null && (latestDecisionRef.current = q);
  }, [q]);
  let J = (e: number) => {
    let t = currentRef.current.pending;
    if (!t.length) return;
    let n = q ?? latestDecisionRef.current ?? (e === 1 ? -1 : 1 / 0),
      r =
        e === 1
          ? (t.find((e) => e > n) ?? t[0])
          : ([...t].reverse().find((e) => e < n) ?? t[t.length - 1]);
    (window.clearTimeout(activeRef.current),
      setHovered(null),
      setHighlighted(r),
      (latestDecisionRef.current = r));
    let i = registeredRefs.current[r];
    if (!i) return;
    focused !== null &&
      i.focus({
        preventScroll: true,
      });
    let a = window.matchMedia?.(`(prefers-reduced-motion: reduce)`).matches;
    i.scrollIntoView({
      block: `nearest`,
      inline: `nearest`,
      behavior: a ? `auto` : `smooth`,
    });
  };
  React.useEffect(() => {
    if (highlighted === null) return;
    let e = (e: PointerEvent) => {
      rootRef.current?.contains(e.target as Node | null) || setHighlighted(null);
    };
    return (
      document.addEventListener(`pointerdown`, e),
      () => document.removeEventListener(`pointerdown`, e)
    );
  }, [highlighted]);
  let [Y, ee] = React.useState<{
      left: number;
      top: number;
      snap: boolean;
    } | null>(null),
    X = React.useRef(false);
  React.useLayoutEffect(() => {
    let e = () => {
      let e = changeRefs.current,
        t = toolbarRef.current,
        n = q === null ? null : registeredRefs.current[q];
      if (!e || !t || !n) return;
      let r = e.getBoundingClientRect(),
        i = r.width ? e.offsetWidth / r.width : 1,
        a = n.getClientRects()[0] ?? n.getBoundingClientRect(),
        o = t.offsetWidth,
        s = t.offsetHeight,
        c = (a.left - r.left + a.width / 2) * i,
        l = Math.min(Math.max(c - o / 2, 8), Math.max(8, e.offsetWidth - o - 8)),
        u = (a.top - r.top) * i - s - 6;
      (ee({
        left: l,
        top: u,
        snap: !X.current,
      }),
        (X.current = true));
    };
    if (q === null) {
      X.current = false;
      return;
    }
    e();
    let t = new ResizeObserver(e);
    return (changeRefs.current && t.observe(changeRefs.current), () => t.disconnect());
  }, [q, decisions]);
  let Z = (e: number | null) => {
      (window.clearTimeout(activeRef.current), setHovered(e));
    },
    Q: React.MouseEventHandler<HTMLDivElement> = () => {
      (window.clearTimeout(activeRef.current),
        (activeRef.current = window.setTimeout(() => setHovered(null), 140)));
    };
  React.useEffect(() => () => window.clearTimeout(activeRef.current), []);
  let te = (e: React.KeyboardEvent<HTMLSpanElement>, t: number) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      let n = e.key.toLowerCase();
      n === `y` || n === `enter`
        ? (e.preventDefault(), applyDecision([t], `accepted`, true))
        : n === `n` || n === `backspace` || n === `delete`
          ? (e.preventDefault(), applyDecision([t], `rejected`, true))
          : n === `escape` && e.currentTarget.blur();
    },
    ne = changeList.length,
    $ = -1;
  return (
    <div
      ref={rootRef}
      className={[`ui-df`, className].filter(Boolean).join(` `)}
      data-done={allReviewed || void 0}
      onKeyDown={(e) => {
        e.key === `Escape` && highlighted !== null && setHighlighted(null);
      }}
    >
      <style href={`ui-inline-diff`} precedence={`default`}>
        {documentDiffStyles}
      </style>
      {label && (
        <div className={`ui-df__label`}>
          <svg viewBox={`0 0 16 16`} aria-hidden={`true`}>
            <path
              d={`M8 1.75c.3 2.9 1.35 3.95 4.25 4.25-2.9.3-3.95 1.35-4.25 4.25C7.7 7.35 6.65 6.3 3.75 6 6.65 5.7 7.7 4.65 8 1.75Z`}
            />
            <path
              d={`M12.5 10.25c.15 1.25.6 1.7 1.75 1.75-1.15.15-1.6.6-1.75 1.75-.15-1.15-.6-1.6-1.75-1.75 1.15-.05 1.6-.5 1.75-1.75Z`}
            />
          </svg>
          <span>{label}</span>
        </div>
      )}
      <div ref={changeRefs} className={`ui-df__card`}>
        <div className={`ui-df__head`}>
          <div className={`ui-df__bar`}>
            <div
              className={`ui-df__layer`}
              data-show={!allReviewed || void 0}
              inert={allReviewed}
              aria-hidden={allReviewed || void 0}
            >
              <span className={`ui-df__count`}>
                <span className={`ui-df__num`}>{pendingIndices.length}</span>
                <span className={`ui-df__word`}>
                  {pendingIndices.length === 1 ? `suggestion` : `suggestions`}
                </span>
              </span>
              <span className={`ui-df__actions`}>
                <span className={`ui-df__nav`} onMouseDown={(e) => e.preventDefault()}>
                  <button
                    type={`button`}
                    className={`ui-df__icon`}
                    onClick={() => J(-1)}
                    disabled={!pendingIndices.length}
                    aria-label={`Previous suggestion`}
                  >
                    <svg viewBox={`0 0 16 16`} aria-hidden={`true`}>
                      <path d={`M10 12.5 5.5 8 10 3.5`} />
                    </svg>
                  </button>
                  <button
                    type={`button`}
                    className={`ui-df__icon`}
                    onClick={() => J(1)}
                    disabled={!pendingIndices.length}
                    aria-label={`Next suggestion`}
                  >
                    <svg viewBox={`0 0 16 16`} aria-hidden={`true`}>
                      <path d={`M6 3.5 10.5 8 6 12.5`} />
                    </svg>
                  </button>
                </span>
                <button
                  type={`button`}
                  className={`ui-df__btn`}
                  onClick={() => applyDecision(pendingIndices, `rejected`)}
                  disabled={!pendingIndices.length}
                >{`Reject all`}</button>
                <button
                  type={`button`}
                  className={`ui-df__btn ui-df__btn--primary`}
                  onClick={() => applyDecision(pendingIndices, `accepted`)}
                  disabled={!pendingIndices.length}
                >{`Accept all`}</button>
              </span>
            </div>
            <div
              className={`ui-df__layer`}
              data-show={allReviewed || void 0}
              inert={!allReviewed}
              aria-hidden={!allReviewed || void 0}
            >
              <span className={`ui-df__count ui-df__count--done`}>
                <svg className={`ui-df__ok`} viewBox={`0 0 16 16`} aria-hidden={`true`}>
                  <path d={`M3.75 8.4 6.6 11.1 12.25 5`} pathLength={1} />
                </svg>
                {`All changes reviewed`}
              </span>
              <button
                ref={undoRef}
                type={`button`}
                className={`ui-df__btn`}
                onClick={() => undo(true)}
                disabled={!history.length}
              >
                <svg viewBox={`0 0 16 16`} aria-hidden={`true`}>
                  <path d={`M5.5 4 2.75 6.75 5.5 9.5`} />
                  <path d={`M3 6.75h6.5a3.75 3.75 0 0 1 0 7.5H7.5`} />
                </svg>
                {`Undo`}
              </button>
            </div>
          </div>
        </div>
        <div className={`ui-df__body`}>
          <p className={`ui-df__text`}>
            {segments.map((e, t) => {
              if (e.type === `equal`) return <span key={t}>{e.text}</span>;
              $++;
              let n = $,
                i = decisions[n] ?? `pending`,
                a = i === `pending`;
              return (
                <span
                  ref={(e) => {
                    registeredRefs.current[n] = e;
                  }}
                  className={`ui-df__chg`}
                  data-state={i}
                  data-active={q === n || void 0}
                  tabIndex={a ? 0 : void 0}
                  role={a ? `button` : void 0}
                  aria-label={
                    a
                      ? `Suggestion ${n + 1} of ${ne}: ${describeChange(e)}. Press Y to accept, N to reject`
                      : void 0
                  }
                  onKeyDown={a ? (e) => te(e, n) : void 0}
                  onFocus={() => setFocused(n)}
                  onBlur={() => setFocused((e) => (e === n ? null : e))}
                  onMouseEnter={() => Z(n)}
                  onMouseLeave={Q}
                  key={t}
                >
                  {e.remove && (
                    <del className={`ui-df__del`} aria-hidden={i === `accepted` || void 0}>
                      {e.remove}
                    </del>
                  )}
                  {e.insert && (
                    <ins className={`ui-df__ins`} aria-hidden={i === `rejected` || void 0}>
                      {e.insert}
                    </ins>
                  )}
                </span>
              );
            })}
          </p>
        </div>
        <div
          ref={toolbarRef}
          className={`ui-df__pop`}
          data-open={q !== null || void 0}
          data-snap={Y?.snap || void 0}
          style={
            Y
              ? {
                  left: Y.left,
                  top: Y.top,
                }
              : void 0
          }
          role={`group`}
          aria-label={`Review suggestion`}
          aria-hidden={q === null || void 0}
          onMouseEnter={() => q !== null && Z(q)}
          onMouseLeave={Q}
          onMouseDown={(e) => e.preventDefault()}
        >
          <button
            type={`button`}
            tabIndex={-1}
            className={`ui-df__pbtn`}
            aria-label={`Accept suggestion`}
            onClick={() => q !== null && applyDecision([q], `accepted`, focused === q)}
          >
            <svg viewBox={`0 0 16 16`} aria-hidden={`true`}>
              <path d={`M3.75 8.4 6.6 11.1 12.25 5`} />
            </svg>
            {`Accept`}
            <kbd>{`Y`}</kbd>
          </button>
          <span className={`ui-df__sep`} aria-hidden={`true`} />
          <button
            type={`button`}
            tabIndex={-1}
            className={`ui-df__pbtn`}
            aria-label={`Reject suggestion`}
            onClick={() => q !== null && applyDecision([q], `rejected`, focused === q)}
          >
            <svg viewBox={`0 0 16 16`} aria-hidden={`true`}>
              <path d={`M4.5 4.5l7 7M11.5 4.5l-7 7`} />
            </svg>
            {`Reject`}
            <kbd>{`N`}</kbd>
          </button>
        </div>
      </div>
      <span className={`ui-df__sr`} role={`status`} aria-live={`polite`}>
        {announcement}
      </span>
    </div>
  );
}
var documentDiffStyles = `
.ui-df {
  --ui-df-ink: #171717;
  --ui-df-text: #525252;
  --ui-df-muted: #8a8a8a;
  --ui-df-tray: #f0f0f0;
  --ui-df-line: #ececec;
  --ui-df-bg: #ffffff;
  --ui-df-soft: #f5f5f5;
  --ui-df-add: rgba(34, 160, 90, 0.1);
  --ui-df-add-strong: rgba(34, 160, 90, 0.18);
  --ui-df-add-ink: #18794e;
  --ui-df-del: rgba(220, 60, 60, 0.08);
  --ui-df-del-strong: rgba(220, 60, 60, 0.15);
  --ui-df-del-ink: #b42318;
  --ui-df-strike: rgba(180, 35, 24, 0.55);
  --ui-df-ok: #1f8a4c;
  --ui-df-pop: #171717;
  --ui-df-pop-ink: #ffffff;
  --ui-df-pop-soft: rgba(255, 255, 255, 0.14);
  --ui-df-pop-kbd: rgba(255, 255, 255, 0.55);
  --ui-df-primary: #171717;
  --ui-df-primary-ink: #ffffff;
  --ui-df-focus: rgba(23, 23, 23, 0.35);
  --ui-df-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
  --ui-df-ease: cubic-bezier(0.22, 1, 0.36, 1);
  position: relative;
  box-sizing: border-box;
  display: grid;
  width: 100%;
  min-width: 0;
  padding: 4px;
  border-radius: 20px;
  background: var(--ui-df-tray);
  color: var(--ui-df-text);
  font-family: "Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
  text-align: left;
}
.ui-df *, .ui-df *::before, .ui-df *::after { box-sizing: border-box; }

/* The optional label sits on the gray tray, above the card */
.ui-df__label {
  display: flex;
  align-items: center;
  gap: 6px;
  min-width: 0;
  padding: 6px 8px 4px;
  color: var(--ui-df-muted);
  font-size: 12.5px;
  line-height: 1.3;
  letter-spacing: -0.003em;
}
.ui-df__label span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.ui-df__label svg { flex: none; width: 13px; height: 13px; fill: currentColor; }

/* The white card: toolbar, paragraph and the popover (positioned relative to it) */
.ui-df__card {
  position: relative;
  min-width: 0;
  border-radius: 16px;
  background: var(--ui-df-bg);
  box-shadow: 0 0 0 1px var(--ui-df-line), var(--ui-df-shadow);
}
.ui-df__head {
  padding: 10px 10px 10px 16px;
  border-bottom: 1px solid var(--ui-df-line);
}

/* The two toolbars share one cell and cross-fade */
.ui-df__bar { display: grid; }
.ui-df__layer {
  grid-area: 1 / 1;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  min-width: 0;
  opacity: 0;
  visibility: hidden;
  transform: translateY(4px);
  filter: blur(2px);
  transition: opacity 260ms ease, transform 420ms var(--ui-df-ease), filter 260ms ease, visibility 0s 420ms;
}
.ui-df__layer[data-show] {
  opacity: 1;
  visibility: visible;
  transform: none;
  filter: none;
  transition: opacity 320ms ease 80ms, transform 460ms var(--ui-df-ease) 80ms, filter 320ms ease 80ms, visibility 0s;
}
/* Narrow cards (e.g. a side panel): the count keeps only its number, so the toolbar stays on one line */
.ui-df__card { container: ui-df-card / inline-size; }
@container ui-df-card (max-width: 400px) {
  .ui-df__word { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
}
.ui-df__count {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  color: var(--ui-df-ink);
  font-size: 13px;
  font-weight: 500;
  line-height: 1;
  letter-spacing: -0.006em;
  white-space: nowrap;
}
.ui-df__num {
  display: inline-grid;
  place-items: center;
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  border-radius: 999px;
  background: var(--ui-df-add);
  color: var(--ui-df-add-ink);
  font-size: 11.5px;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
}
.ui-df__ok {
  width: 16px;
  height: 16px;
  fill: none;
  stroke: var(--ui-df-ok);
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
}
.ui-df[data-done] .ui-df__ok { animation: ui-df-draw 420ms var(--ui-df-ease) 220ms forwards; }
.ui-df__actions { display: inline-flex; align-items: center; gap: 6px; margin-left: auto; }
.ui-df__nav { display: inline-flex; gap: 2px; margin-right: 2px; }

.ui-df__btn,
.ui-df__icon {
  appearance: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: 30px;
  margin: 0;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: var(--ui-df-ink);
  font: inherit;
  font-size: 13px;
  font-weight: 500;
  line-height: 1;
  letter-spacing: -0.006em;
  white-space: nowrap;
  cursor: pointer;
  transition: background-color 160ms ease, color 160ms ease, opacity 160ms ease, transform 160ms var(--ui-df-ease);
  -webkit-tap-highlight-color: transparent;
}
.ui-df__btn { padding: 0 11px; box-shadow: inset 0 0 0 1px var(--ui-df-line); }
.ui-df__icon { width: 28px; color: var(--ui-df-muted); }
.ui-df__btn svg,
.ui-df__icon svg {
  width: 14px;
  height: 14px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.6;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.ui-df__btn:hover:not(:disabled) { background: var(--ui-df-soft); }
.ui-df__icon:hover:not(:disabled) { background: var(--ui-df-soft); color: var(--ui-df-ink); }
.ui-df__btn--primary { background: var(--ui-df-primary); color: var(--ui-df-primary-ink); box-shadow: none; }
.ui-df__btn--primary:hover:not(:disabled) { background: var(--ui-df-primary); opacity: 0.88; }
.ui-df__btn:active:not(:disabled),
.ui-df__icon:active:not(:disabled) { transform: scale(0.97); }
.ui-df__btn:disabled,
.ui-df__icon:disabled { opacity: 0.4; cursor: default; }
.ui-df__btn:focus-visible,
.ui-df__icon:focus-visible { outline: 2px solid var(--ui-df-focus); outline-offset: 2px; }

/* The prose */
.ui-df__body { padding: 16px 18px 18px; }
.ui-df__text {
  margin: 0;
  color: var(--ui-df-text);
  font-size: 15px;
  line-height: 1.65;
  letter-spacing: -0.006em;
  white-space: pre-line; /* line breaks stay, doubled spaces around a settled change collapse */
  overflow-wrap: anywhere;
}

.ui-df__chg { border-radius: 4px; cursor: pointer; scroll-margin: 64px 0 24px; }
.ui-df__chg:not([data-state="pending"]) { cursor: auto; }
.ui-df__chg:focus { outline: none; }
.ui-df__chg:focus-visible { outline: 2px solid var(--ui-df-focus); outline-offset: 2px; }

.ui-df__del,
.ui-df__ins {
  padding: 1px 2px;
  border-radius: 4px;
  -webkit-box-decoration-break: clone;
  box-decoration-break: clone;
  font-size: 1em;
  transition:
    background-color 360ms ease,
    color 360ms ease,
    text-decoration-color 300ms ease,
    font-size 460ms var(--ui-df-ease),
    padding 460ms var(--ui-df-ease),
    margin 460ms var(--ui-df-ease),
    opacity 300ms ease;
}
.ui-df__del {
  background: var(--ui-df-del);
  color: var(--ui-df-del-ink);
  text-decoration: line-through;
  text-decoration-color: var(--ui-df-strike);
  text-decoration-thickness: 1.2px;
}
.ui-df__ins {
  background: var(--ui-df-add);
  color: var(--ui-df-add-ink);
  text-decoration: none;
}
.ui-df__del + .ui-df__ins { margin-left: 3px; }
.ui-df__chg[data-active] .ui-df__del { background: var(--ui-df-del-strong); }
.ui-df__chg[data-active] .ui-df__ins { background: var(--ui-df-add-strong); }

/* Accepted: the old words shrink away, the new ones settle into the text */
.ui-df__chg[data-state="accepted"] .ui-df__del,
.ui-df__chg[data-state="rejected"] .ui-df__ins {
  font-size: 0;
  padding: 0;
  margin: 0;
  opacity: 0;
}
.ui-df__chg[data-state="accepted"] .ui-df__ins,
.ui-df__chg[data-state="rejected"] .ui-df__del {
  padding: 0;
  margin: 0;
  background: transparent;
  color: inherit;
  text-decoration-color: transparent;
}

/* Popover */
.ui-df__pop {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 2px;
  padding: 3px;
  border-radius: 10px;
  background: var(--ui-df-pop);
  color: var(--ui-df-pop-ink);
  box-shadow: 0 6px 20px -6px rgba(0, 0, 0, 0.35), 0 1px 2px rgba(0, 0, 0, 0.2);
  opacity: 0;
  visibility: hidden;
  transform: translateY(4px) scale(0.96);
  transform-origin: 50% 100%;
  pointer-events: none;
  transition:
    opacity 180ms ease,
    transform 260ms var(--ui-df-ease),
    left 320ms var(--ui-df-ease),
    top 320ms var(--ui-df-ease),
    visibility 0s 260ms;
}
.ui-df__pop[data-open] {
  opacity: 1;
  visibility: visible;
  transform: none;
  pointer-events: auto;
  transition:
    opacity 180ms ease,
    transform 300ms var(--ui-df-ease),
    left 320ms var(--ui-df-ease),
    top 320ms var(--ui-df-ease),
    visibility 0s;
}
.ui-df__pop[data-snap] { transition-property: opacity, transform, visibility; }
.ui-df__pbtn {
  appearance: none;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 28px;
  margin: 0;
  padding: 0 8px 0 7px;
  border: 0;
  border-radius: 7px;
  background: transparent;
  color: inherit;
  font: inherit;
  font-size: 12.5px;
  font-weight: 500;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  transition: background-color 140ms ease;
}
.ui-df__pbtn:hover { background: var(--ui-df-pop-soft); }
.ui-df__pbtn svg {
  width: 14px;
  height: 14px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.ui-df__pbtn kbd {
  display: inline-grid;
  place-items: center;
  min-width: 17px;
  height: 17px;
  padding: 0 4px;
  border-radius: 4px;
  background: var(--ui-df-pop-soft);
  color: var(--ui-df-pop-kbd);
  font: inherit;
  font-size: 10.5px;
  font-weight: 500;
}
.ui-df__sep { width: 1px; height: 16px; background: var(--ui-df-pop-soft); }

.ui-df__sr {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
  border: 0;
}

@keyframes ui-df-draw { to { stroke-dashoffset: 0; } }

/* Narrow screens: the arrows step aside (Tab still moves between changes) */
@media (max-width: 400px) {
  .ui-df__nav { display: none; }
  .ui-df__head { padding-left: 14px; }
  .ui-df__label { padding-left: 6px; }
  .ui-df__body { padding: 14px 14px 16px; }
}
@media (hover: none) and (pointer: coarse) {
  .ui-df__pbtn kbd { display: none; }
  .ui-df__pbtn { height: 34px; padding: 0 11px 0 9px; }
}

@media (prefers-reduced-motion: reduce) {
  .ui-df *, .ui-df *::before, .ui-df *::after {
    animation-duration: 1ms !important;
    animation-delay: 0ms !important;
    transition-duration: 1ms !important;
    transition-delay: 0ms !important;
  }
  .ui-df__layer { filter: none; transform: none; }
}

/* Dark mode: follows a .dark class or data-theme="dark" on any ancestor, e.g. <html> */
:where(.dark, [data-theme="dark"]) .ui-df {
  --ui-df-ink: #ededed;
  --ui-df-text: #b4b4b8;
  --ui-df-muted: #8b8b92;
  --ui-df-tray: #111113;
  --ui-df-line: #2a2a2e;
  --ui-df-bg: #19191b;
  --ui-df-soft: #232326;
  --ui-df-add: rgba(60, 200, 120, 0.13);
  --ui-df-add-strong: rgba(60, 200, 120, 0.22);
  --ui-df-add-ink: #6ee7a8;
  --ui-df-del: rgba(240, 90, 90, 0.12);
  --ui-df-del-strong: rgba(240, 90, 90, 0.2);
  --ui-df-del-ink: #ff8a80;
  --ui-df-strike: rgba(255, 138, 128, 0.6);
  --ui-df-ok: #5fd68f;
  --ui-df-pop: #f4f4f5;
  --ui-df-pop-ink: #171717;
  --ui-df-pop-soft: rgba(0, 0, 0, 0.08);
  --ui-df-pop-kbd: rgba(0, 0, 0, 0.5);
  --ui-df-primary: #ededed;
  --ui-df-primary-ink: #19191b;
  --ui-df-focus: rgba(255, 255, 255, 0.35);
  --ui-df-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}
`;
var demoOriginal = `Hi everyone, we are very excited to announce that the new dashboard is now available for all users. It loads a lot faster than before, and you can now export any report to CSV with just a single click. Let us know what you think!`;
var demoSuggested = `Hi everyone, the new dashboard is now live for all users. It loads twice as fast, and you can now export any report to CSV in one click. Let us know what you think!`;
var demoDecisions = [`accept`, `reject`, `accept`, `accept`];
var highlightDuration = 1200;
var decisionGap = 450;
var resetHold = 2800;
function InlineDiffDemo2() {
  let diffRef = React.useRef<InlineDiffHandle | null>(null),
    [playing, setPlaying] = React.useState(true);
  React.useEffect(() => {
    if (!playing) return;
    let n: number[] = [],
      r = 900,
      i = (e: number | undefined, t: TimerHandler) => n.push(window.setTimeout(t, e)),
      a = () => {
        (demoDecisions.forEach((t, n) => {
          (i(r, () => diffRef.current?.highlight(n)),
            (r += highlightDuration),
            i(r, () => (t === `accept` ? diffRef.current?.accept(n) : diffRef.current?.reject(n))),
            (r += decisionGap));
        }),
          (r += resetHold),
          i(r, () => diffRef.current?.reset()),
          (r += 900),
          i(r, () => {
            ((r = 0), (n.length = 0), a());
          }));
      };
    return (a(), () => n.forEach((e) => window.clearTimeout(e)));
  }, [playing]);
  let stopAutoplay = () => {
    playing && (setPlaying(false), diffRef.current?.highlight(null));
  };
  return (
    <div
      className={`df-demo`}
      onPointerDown={stopAutoplay}
      onKeyDown={stopAutoplay}
      onFocus={stopAutoplay}
      onPointerOver={(e) => {
        (e.target as Element).closest?.(`.ui-df__chg, .ui-df__pop, button`) && stopAutoplay();
      }}
    >
      <InlineDiff
        ref={diffRef}
        label={`Suggested by AI · Make it shorter`}
        original={demoOriginal}
        suggested={demoSuggested}
      />
    </div>
  );
}
const demoStyles =
  ".df-demo{grid-template-columns:minmax(0,520px);place-content:center;width:100%;font-family:Inter,ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,sans-serif;display:grid}.card__preview .df-demo{grid-template-columns:auto;place-content:start center;padding:42px 0 0;position:absolute;inset:0}.card__preview .df-demo .ui-df{zoom:.7;width:500px;max-width:none}.stage:has(.df-demo){height:440px}.stage .df-demo{align-self:start;margin-top:96px}@media (width<=760px){.stage:has(.df-demo){height:500px;padding-left:16px;padding-right:16px}.stage .df-demo{margin-top:70px}}:where(.dark,[data-theme=dark]) .df-demo{--lightningcss-light: ;--lightningcss-dark:initial;color-scheme:dark}.stage .df-demo .ui-dfc{zoom:1.15}.card__preview .df-demo .ui-dfc{zoom:.68;width:460px;max-width:none}\n";
function InlineDiffDemo(props: React.JSX.IntrinsicAttributes) {
  return (
    <>
      <style href="plico-demo-inline-diff" precedence="default">
        {demoStyles}
      </style>
      <InlineDiffDemo2 {...props} />
    </>
  );
}
export { InlineDiff as Component };
export { InlineDiffDemo as Demo };
export { InlineDiff };
export { InlineDiffDemo };
export { diffWords };
export default InlineDiff;
export type { DiffChange };
export type { DiffDecision };
export type { DiffChangeEntry };
export type { DiffSegment };
export type { InlineDiffHandle };
export type { InlineDiffProps };

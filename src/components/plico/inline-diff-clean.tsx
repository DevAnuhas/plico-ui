"use client";

import * as React from "react";
interface InlineDiffCleanProps {
  original?: string;
  suggested?: string;
  changes?: DiffSegment[];
  onChange?: (text: string) => void;
  onDone?: (text: string) => void;
  label?: string;
  ref?: React.Ref<InlineDiffHandle>;
  className?: string;
}
type InlineDiffHandle = {
  highlight: (index: number | null) => void;
  accept: (index: number) => void;
  reject: (index: number) => void;
  acceptAll: () => void;
  rejectAll: () => void;
  undo: () => void;
  reset: () => void;
};
type DiffSegment =
  | {
      type: "equal";
      text: string;
    }
  | DiffChange;
interface DiffChangeEntry {
  seg: number;
  remove: string;
  insert: string;
}
type DiffDecision = "accepted" | "rejected";
type DiffChange = {
  type: "change";
  remove: string;
  insert: string;
};
var cleanDiffTokenPattern = /\s+|[\p{L}\p{N}_'’]+|[^\s\p{L}\p{N}_]/gu;
var cleanIsWhitespace = (text: string) => /^\s+$/.test(text);
function diffWords(original: string, suggested: string) {
  let beforeTokens = original.match(cleanDiffTokenPattern) ?? [],
    afterTokens = suggested.match(cleanDiffTokenPattern) ?? [],
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
        cleanIsWhitespace(operations[e].s);
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
      cleanIsWhitespace(t.text) &&
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
var cleanSuggestionCount = (count: number) => `${count} suggestion${count === 1 ? `` : `s`}`;
var cleanQuoteText = (text: string) => `“${text.trim()}”`;
var describeCleanChange = (change: { remove: string; insert: string }) =>
  change.remove.trim() && change.insert.trim()
    ? `replace ${cleanQuoteText(change.remove)} with ${cleanQuoteText(change.insert)}`
    : change.insert.trim()
      ? `add ${cleanQuoteText(change.insert)}`
      : `remove ${cleanQuoteText(change.remove)}`;
function InlineDiffClean({
  original = ``,
  suggested = ``,
  changes: changes,
  onChange: onChange,
  onDone: onDone,
  label: label,
  ref: forwardedRef,
  className: className,
}: InlineDiffCleanProps) {
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
    composeText = (decisions: Partial<Record<number, DiffDecision>>) =>
      segments
        .map((t, n) =>
          t.type === `equal`
            ? t.text
            : decisions[changeList.findIndex((e) => e.seg === n)] === `accepted`
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
  let applyDecision = (indices: number[], decision: DiffDecision, moveFocus: boolean = false) => {
      let { decisions: decisions, list: list } = currentRef.current,
        eligible = indices.filter((e) => e >= 0 && e < list.length && !decisions[e]);
      if (!eligible.length) return;
      let nextDecisions = {
        ...decisions,
      };
      eligible.forEach((e) => (nextDecisions[e] = decision));
      let remainingCount = list.length - Object.keys(nextDecisions).length;
      (setDecisions(nextDecisions),
        setHistory((e) => [...e, eligible]),
        setHighlighted(null),
        (latestDecisionRef.current = Math.max(...eligible)));
      let verb = decision === `accepted` ? `Accepted` : `Rejected`,
        description =
          eligible.length === 1
            ? describeCleanChange(list[eligible[0]]).replace(/^./, (e) => e.toUpperCase())
            : `${eligible.length} suggestions`;
      if (
        (setAnnouncement(
          `${verb}: ${description}. ${remainingCount ? `${cleanSuggestionCount(remainingCount)} left.` : `All changes reviewed.`}`,
        ),
        moveFocus)
      ) {
        let e = Math.max(...eligible),
          t = list.map((e, t) => t).filter((e) => !nextDecisions[e]);
        pendingFocusRef.current = remainingCount ? (t.find((t) => t > e) ?? t[0]) : `undo`;
      }
      let text = composeText(nextDecisions);
      (callbacksRef.current.onChange?.(text),
        remainingCount || callbacksRef.current.onDone?.(text));
    },
    undo = (moveFocus: boolean = false) => {
      let { decisions: decisions, history: history } = currentRef.current,
        batch = history[history.length - 1];
      if (!batch) return;
      let nextDecisions = {
        ...decisions,
      };
      (batch.forEach((e) => delete nextDecisions[e]),
        setDecisions(nextDecisions),
        setHistory(history.slice(0, -1)),
        setAnnouncement(
          `Undone. ${cleanSuggestionCount(currentRef.current.list.length - Object.keys(nextDecisions).length)} left.`,
        ),
        moveFocus && (pendingFocusRef.current = Math.min(...batch)),
        callbacksRef.current.onChange?.(composeText(nextDecisions)));
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
      className={[`ui-dfc`, className].filter(Boolean).join(` `)}
      data-done={allReviewed || void 0}
      onKeyDown={(e) => {
        e.key === `Escape` && highlighted !== null && setHighlighted(null);
      }}
    >
      <style href={`ui-inline-diff-clean`} precedence={`default`}>
        {inlineDiffCleanStyles}
      </style>
      <div ref={changeRefs} className={`ui-dfc__card`}>
        <div className={`ui-dfc__body`}>
          {label && (
            <div className={`ui-dfc__label`}>
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
          <p className={`ui-dfc__text`}>
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
                  className={`ui-dfc__chg`}
                  data-state={i}
                  data-active={q === n || void 0}
                  tabIndex={a ? 0 : void 0}
                  role={a ? `button` : void 0}
                  aria-label={
                    a
                      ? `Suggestion ${n + 1} of ${ne}: ${describeCleanChange(e)}. Press Y to accept, N to reject`
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
                    <del className={`ui-dfc__del`} aria-hidden={i === `accepted` || void 0}>
                      {e.remove}
                    </del>
                  )}
                  {e.insert && (
                    <ins className={`ui-dfc__ins`} aria-hidden={i === `rejected` || void 0}>
                      {e.insert}
                    </ins>
                  )}
                </span>
              );
            })}
          </p>
        </div>
        <div className={`ui-dfc__foot`}>
          <div className={`ui-dfc__bar`}>
            <div
              className={`ui-dfc__layer`}
              data-show={!allReviewed || void 0}
              inert={allReviewed}
              aria-hidden={allReviewed || void 0}
            >
              <span className={`ui-dfc__count`}>
                <span className={`ui-dfc__num`}>{pendingIndices.length}</span>
                <span className={`ui-dfc__word`}>
                  {pendingIndices.length === 1 ? `suggestion` : `suggestions`}
                </span>
              </span>
              <span className={`ui-dfc__actions`}>
                <span className={`ui-dfc__nav`} onMouseDown={(e) => e.preventDefault()}>
                  <button
                    type={`button`}
                    className={`ui-dfc__icon`}
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
                    className={`ui-dfc__icon`}
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
                  className={`ui-dfc__btn`}
                  onClick={() => applyDecision(pendingIndices, `rejected`)}
                  disabled={!pendingIndices.length}
                >{`Reject all`}</button>
                <button
                  type={`button`}
                  className={`ui-dfc__btn ui-dfc__btn--primary`}
                  onClick={() => applyDecision(pendingIndices, `accepted`)}
                  disabled={!pendingIndices.length}
                >{`Accept all`}</button>
              </span>
            </div>
            <div
              className={`ui-dfc__layer`}
              data-show={allReviewed || void 0}
              inert={!allReviewed}
              aria-hidden={!allReviewed || void 0}
            >
              <span className={`ui-dfc__count ui-dfc__count--done`}>
                <svg className={`ui-dfc__ok`} viewBox={`0 0 16 16`} aria-hidden={`true`}>
                  <path d={`M3.75 8.4 6.6 11.1 12.25 5`} pathLength={1} />
                </svg>
                {`All changes reviewed`}
              </span>
              <button
                ref={undoRef}
                type={`button`}
                className={`ui-dfc__btn`}
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
        <div
          ref={toolbarRef}
          className={`ui-dfc__pop`}
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
            className={`ui-dfc__pbtn ui-dfc__pbtn--primary`}
            aria-label={`Accept suggestion`}
            onClick={() => q !== null && applyDecision([q], `accepted`, focused === q)}
          >
            <svg viewBox={`0 0 16 16`} aria-hidden={`true`}>
              <path d={`M3.75 8.4 6.6 11.1 12.25 5`} />
            </svg>
            {`Accept`}
            <kbd>{`Y`}</kbd>
          </button>
          <button
            type={`button`}
            tabIndex={-1}
            className={`ui-dfc__pbtn`}
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
      <span className={`ui-dfc__sr`} role={`status`} aria-live={`polite`}>
        {announcement}
      </span>
    </div>
  );
}
var inlineDiffCleanStyles = `
/* Colors and motion as variables – override them on .ui-dfc */
.ui-dfc {
  --ui-dfc-card: #ffffff;
  --ui-dfc-ink: rgba(0, 0, 0, 0.88);
  --ui-dfc-strong: #000000;
  --ui-dfc-text: rgba(0, 0, 0, 0.61);
  --ui-dfc-muted: rgba(0, 0, 0, 0.45);
  --ui-dfc-faint: rgba(0, 0, 0, 0.27);
  --ui-dfc-icon: rgba(0, 0, 0, 0.447);
  --ui-dfc-line: rgba(0, 0, 0, 0.06);
  --ui-dfc-fill: rgba(0, 0, 0, 0.06);
  --ui-dfc-wash: rgba(0, 0, 0, 0.03);
  --ui-dfc-accent: rgba(0, 96, 226, 0.765);
  /* Edits are tinted fills only – no strokes */
  --ui-dfc-add: rgba(26, 154, 82, 0.1);
  --ui-dfc-add-strong: rgba(26, 154, 82, 0.16);
  --ui-dfc-del: rgba(229, 72, 77, 0.08);
  --ui-dfc-del-strong: rgba(229, 72, 77, 0.14);
  --ui-dfc-del-ink: rgba(0, 0, 0, 0.45);
  --ui-dfc-strike: rgba(229, 72, 77, 0.6);
  --ui-dfc-ok: #1a9a52;
  --ui-dfc-primary: rgba(0, 0, 0, 0.88);
  --ui-dfc-primary-ink: #fcfcfc;
  --ui-dfc-primary-kbd: rgba(255, 255, 255, 0.16);
  --ui-dfc-primary-kbd-ink: rgba(255, 255, 255, 0.66);
  --ui-dfc-secondary-hover: #fafafa;
  /* Strokes are shadows: a 0.5px hairline plus a soft lift */
  --ui-dfc-shadow: 0 0 0 0.5px rgba(0, 0, 0, 0.06), 0 1px 1px -1px rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --ui-dfc-shadow-pop: 0 0 0 0.5px rgba(0, 0, 0, 0.08), 0 12px 28px -10px rgba(0, 0, 0, 0.16), 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --ui-dfc-focus: rgba(0, 96, 226, 0.35);
  --ui-dfc-ease: cubic-bezier(0.22, 1, 0.36, 1);
  position: relative;
  box-sizing: border-box;
  display: grid;
  width: 100%;
  min-width: 0;
  color: var(--ui-dfc-ink);
  font-family: "Inter", "InterVariable", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  font-size: 13px;
  line-height: 20px;
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
  text-align: left;
}
.ui-dfc *, .ui-dfc *::before, .ui-dfc *::after { box-sizing: border-box; }
:where(.ui-dfc) button {
  appearance: none;
  margin: 0;
  padding: 0;
  border: 0;
  background: none;
  font: inherit;
  color: inherit;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}
:where(.ui-dfc) svg { display: block; flex: none; }

/* One white card – the edge is a shadow, not a border. The popover is positioned relative to it */
.ui-dfc__card {
  position: relative;
  min-width: 0;
  border-radius: 10px;
  background: var(--ui-dfc-card);
  box-shadow: var(--ui-dfc-shadow);
  container: ui-dfc-card / inline-size;
}

/* The optional label opens the card */
.ui-dfc__label {
  display: flex;
  align-items: center;
  gap: 6px;
  min-width: 0;
  margin: 0 0 8px;
  color: var(--ui-dfc-text);
  font-size: 12px;
  line-height: 16px;
}
.ui-dfc__label span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.ui-dfc__label svg { width: 16px; height: 16px; fill: var(--ui-dfc-accent); }

/* The prose */
.ui-dfc__body { padding: 16px 16px 18px; }
.ui-dfc__text {
  margin: 0;
  color: var(--ui-dfc-ink);
  font-size: 13px;
  line-height: 22px;
  white-space: pre-line; /* line breaks stay, doubled spaces around a settled change collapse */
  overflow-wrap: anywhere;
}

.ui-dfc__chg { border-radius: 4px; cursor: pointer; scroll-margin: 64px 0 72px; }
.ui-dfc__chg:not([data-state="pending"]) { cursor: auto; }
.ui-dfc__chg:focus { outline: none; }
.ui-dfc__chg:focus-visible { outline: 2px solid var(--ui-dfc-focus); outline-offset: 1px; }

.ui-dfc__del,
.ui-dfc__ins {
  padding: 1px 2px;
  border-radius: 4px;
  -webkit-box-decoration-break: clone;
  box-decoration-break: clone;
  font-size: 1em;
  transition:
    background-color 360ms ease,
    color 360ms ease,
    text-decoration-color 300ms ease,
    font-size 460ms var(--ui-dfc-ease),
    padding 460ms var(--ui-dfc-ease),
    margin 460ms var(--ui-dfc-ease),
    opacity 300ms ease;
}
/* Removed: a red tint, the words grayed and struck */
.ui-dfc__del {
  background: var(--ui-dfc-del);
  color: var(--ui-dfc-del-ink);
  text-decoration: line-through;
  text-decoration-color: var(--ui-dfc-strike);
  text-decoration-thickness: 1px;
}
/* Added: a green tint, the words in full ink */
.ui-dfc__ins {
  background: var(--ui-dfc-add);
  color: var(--ui-dfc-ink);
  text-decoration: none;
}
.ui-dfc__del + .ui-dfc__ins { margin-left: 3px; }
.ui-dfc__chg[data-active] .ui-dfc__del { background: var(--ui-dfc-del-strong); }
.ui-dfc__chg[data-active] .ui-dfc__ins { background: var(--ui-dfc-add-strong); }

/* Accepted: the old words shrink away, the new ones settle into the text */
.ui-dfc__chg[data-state="accepted"] .ui-dfc__del,
.ui-dfc__chg[data-state="rejected"] .ui-dfc__ins {
  font-size: 0;
  padding: 0;
  margin: 0;
  opacity: 0;
}
.ui-dfc__chg[data-state="accepted"] .ui-dfc__ins,
.ui-dfc__chg[data-state="rejected"] .ui-dfc__del {
  padding: 0;
  margin: 0;
  background: transparent;
  color: inherit;
  text-decoration-color: transparent;
}

/* The toolbar: the last row of the card. Its two states share one cell and cross-fade */
.ui-dfc__foot {
  display: grid;
  align-items: center;
  min-height: 44px;
  padding: 8px 8px 8px 16px;
  border-top: 0.5px solid var(--ui-dfc-line);
}
.ui-dfc__bar { display: grid; }
.ui-dfc__layer {
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
  transition: opacity 260ms ease, transform 420ms var(--ui-dfc-ease), filter 260ms ease, visibility 0s 420ms;
}
.ui-dfc__layer[data-show] {
  opacity: 1;
  visibility: visible;
  transform: none;
  filter: none;
  transition: opacity 320ms ease 80ms, transform 460ms var(--ui-dfc-ease) 80ms, filter 320ms ease 80ms, visibility 0s;
}
/* Narrow cards (e.g. a side panel): the count keeps only its number, so the toolbar stays on one line */
@container ui-dfc-card (max-width: 400px) {
  .ui-dfc__word { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
}
.ui-dfc__count {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--ui-dfc-text);
  font-size: 13px;
  line-height: 20px;
  white-space: nowrap;
}
.ui-dfc__count--done { gap: 6px; color: var(--ui-dfc-ink); font-weight: 500; }
.ui-dfc__num {
  display: inline-grid;
  place-items: center;
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  border-radius: 5px;
  background: var(--ui-dfc-fill);
  color: var(--ui-dfc-ink);
  font-size: 12px;
  font-weight: 500;
  font-variant-numeric: tabular-nums;
}
.ui-dfc__ok {
  width: 16px;
  height: 16px;
  fill: none;
  stroke: var(--ui-dfc-ok);
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
}
.ui-dfc[data-done] .ui-dfc__ok { animation: ui-dfc-draw 420ms var(--ui-dfc-ease) 220ms forwards; }
.ui-dfc__actions { display: inline-flex; align-items: center; gap: 8px; margin-left: auto; }
.ui-dfc__nav { display: inline-flex; gap: 2px; }

/* Buttons: 28px, radius 6 – secondary is white with the card shadow, primary a dark chip */
.ui-dfc__btn,
.ui-dfc__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: 28px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  line-height: 20px;
  white-space: nowrap;
  transition: background-color 160ms ease, color 160ms ease, opacity 160ms ease, transform 160ms var(--ui-dfc-ease);
}
.ui-dfc__btn { padding: 0 10px; background: var(--ui-dfc-card); box-shadow: var(--ui-dfc-shadow); color: var(--ui-dfc-strong); }
.ui-dfc__btn:has(svg) { padding: 0 10px 0 8px; }
.ui-dfc__icon { width: 28px; color: var(--ui-dfc-icon); }
.ui-dfc__btn svg,
.ui-dfc__icon svg,
.ui-dfc__pbtn svg {
  width: 16px;
  height: 16px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.1;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.ui-dfc__btn svg { color: var(--ui-dfc-icon); }
.ui-dfc__btn:hover:not(:disabled) { background: var(--ui-dfc-secondary-hover); }
.ui-dfc__icon:hover:not(:disabled) { background: var(--ui-dfc-wash); color: var(--ui-dfc-ink); }
.ui-dfc__btn--primary { background: var(--ui-dfc-primary); color: var(--ui-dfc-primary-ink); box-shadow: none; }
.ui-dfc__btn--primary:hover:not(:disabled) { background: var(--ui-dfc-primary); opacity: 0.9; }
.ui-dfc__btn:active:not(:disabled),
.ui-dfc__icon:active:not(:disabled) { transform: scale(0.97); }
.ui-dfc__btn:disabled,
.ui-dfc__icon:disabled { opacity: 0.4; cursor: default; }
.ui-dfc__btn:focus-visible,
.ui-dfc__icon:focus-visible { outline: 2px solid var(--ui-dfc-focus); outline-offset: 1px; }

/* Popover: white, radius 10 – Accept is the dark chip, Reject the white secondary button */
.ui-dfc__pop {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px;
  border-radius: 10px;
  background: var(--ui-dfc-card);
  box-shadow: var(--ui-dfc-shadow-pop);
  opacity: 0;
  visibility: hidden;
  transform: translateY(4px) scale(0.96);
  transform-origin: 50% 100%;
  pointer-events: none;
  /* Moving from one change to the next is a short, crisp step – not a long glide */
  transition:
    opacity 160ms ease,
    transform 240ms var(--ui-dfc-ease),
    left 90ms ease-out,
    top 90ms ease-out,
    visibility 0s 240ms;
}
.ui-dfc__pop[data-open] {
  opacity: 1;
  visibility: visible;
  transform: none;
  pointer-events: auto;
  transition:
    opacity 160ms ease,
    transform 280ms var(--ui-dfc-ease),
    left 90ms ease-out,
    top 90ms ease-out,
    visibility 0s;
}
.ui-dfc__pop[data-snap] { transition-property: opacity, transform, visibility; }
.ui-dfc__pbtn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 28px;
  padding: 0 6px 0 8px;
  border-radius: 6px;
  background: var(--ui-dfc-card);
  box-shadow: var(--ui-dfc-shadow);
  color: var(--ui-dfc-strong);
  font-size: 13px;
  font-weight: 500;
  line-height: 20px;
  white-space: nowrap;
  transition: background-color 140ms ease, opacity 140ms ease;
}
.ui-dfc__pbtn svg { color: var(--ui-dfc-icon); }
.ui-dfc__pbtn:hover { background: var(--ui-dfc-secondary-hover); }
.ui-dfc__pbtn--primary { background: var(--ui-dfc-primary); box-shadow: none; color: var(--ui-dfc-primary-ink); }
.ui-dfc__pbtn--primary svg { color: currentColor; }
.ui-dfc__pbtn--primary:hover { background: var(--ui-dfc-primary); opacity: 0.9; }
.ui-dfc__pbtn kbd {
  display: inline-grid;
  place-items: center;
  min-width: 16px;
  height: 16px;
  padding: 0 4px;
  border-radius: 4px;
  background: var(--ui-dfc-fill);
  color: var(--ui-dfc-muted);
  font: inherit;
  font-size: 10px;
  font-weight: 500;
  line-height: 16px;
}
.ui-dfc__pbtn--primary kbd { background: var(--ui-dfc-primary-kbd); color: var(--ui-dfc-primary-kbd-ink); }

.ui-dfc__sr {
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

@keyframes ui-dfc-draw { to { stroke-dashoffset: 0; } }

/* Narrow cards: the arrows step aside (Tab still moves between changes) */
@container ui-dfc-card (max-width: 360px) {
  .ui-dfc__nav { display: none; }
  .ui-dfc__body { padding: 14px 14px 16px; }
  .ui-dfc__foot { padding-left: 14px; }
}
/* Touch screens: taller targets, no key hints */
@media (hover: none) and (pointer: coarse) {
  .ui-dfc__pbtn kbd { display: none; }
  .ui-dfc__pbtn { height: 34px; padding: 0 12px 0 10px; }
  .ui-dfc__btn { height: 34px; }
  .ui-dfc__icon { width: 34px; height: 34px; }
  .ui-dfc__foot { min-height: 52px; }
}

@media (prefers-reduced-motion: reduce) {
  .ui-dfc *, .ui-dfc *::before, .ui-dfc *::after {
    animation-duration: 1ms !important;
    animation-delay: 0ms !important;
    transition-duration: 1ms !important;
    transition-delay: 0ms !important;
  }
  .ui-dfc__layer { filter: none; transform: none; }
}

/* Dark mode: follows a .dark class or data-theme="dark" on any ancestor, e.g. <html> */
:where(.dark, [data-theme="dark"]) .ui-dfc {
  --ui-dfc-card: #1c1c1e;
  --ui-dfc-ink: rgba(255, 255, 255, 0.9);
  --ui-dfc-strong: #ffffff;
  --ui-dfc-text: rgba(255, 255, 255, 0.62);
  --ui-dfc-muted: rgba(255, 255, 255, 0.46);
  --ui-dfc-faint: rgba(255, 255, 255, 0.3);
  --ui-dfc-icon: rgba(255, 255, 255, 0.5);
  --ui-dfc-line: rgba(255, 255, 255, 0.08);
  --ui-dfc-fill: rgba(255, 255, 255, 0.08);
  --ui-dfc-wash: rgba(255, 255, 255, 0.04);
  --ui-dfc-accent: #4d8dff;
  --ui-dfc-add: rgba(62, 194, 122, 0.14);
  --ui-dfc-add-strong: rgba(62, 194, 122, 0.22);
  --ui-dfc-del: rgba(240, 90, 90, 0.14);
  --ui-dfc-del-strong: rgba(240, 90, 90, 0.22);
  --ui-dfc-del-ink: rgba(255, 255, 255, 0.46);
  --ui-dfc-strike: rgba(255, 120, 120, 0.7);
  --ui-dfc-ok: #3ec27a;
  --ui-dfc-primary: rgba(255, 255, 255, 0.9);
  --ui-dfc-primary-ink: #1c1c1e;
  --ui-dfc-primary-kbd: rgba(0, 0, 0, 0.08);
  --ui-dfc-primary-kbd-ink: rgba(28, 28, 30, 0.6);
  --ui-dfc-secondary-hover: #232326;
  --ui-dfc-shadow: 0 0 0 0.5px rgba(255, 255, 255, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.4);
  --ui-dfc-shadow-pop: 0 0 0 0.5px rgba(255, 255, 255, 0.12), 0 12px 28px -10px rgba(0, 0, 0, 0.6);
  --ui-dfc-focus: rgba(77, 141, 255, 0.5);
}
:where(.dark, [data-theme="dark"]) .ui-dfc__pop { --ui-dfc-card: #232326; --ui-dfc-secondary-hover: #2a2a2d; }
`;
var cleanDemoOriginal = `Hi everyone, we are very excited to announce that the new dashboard is now available for all users. It loads a lot faster than before, and you can now export any report to CSV with just a single click. Let us know what you think!`;
var cleanDemoSuggested = `Hi everyone, the new dashboard is now live for all users. It loads twice as fast, and you can now export any report to CSV in one click. Let us know what you think!`;
var cleanDemoDecisions = [`accept`, `reject`, `accept`, `accept`];
var cleanHighlightDuration = 1200;
var cleanDecisionGap = 450;
var cleanResetHold = 2800;
function InlineDiffCleanDemo2() {
  let diffRef = React.useRef<InlineDiffHandle | null>(null),
    [playing, setPlaying] = React.useState(true);
  React.useEffect(() => {
    if (!playing) return;
    let n: number[] = [],
      r = 900,
      i = (e: number | undefined, t: TimerHandler) => n.push(window.setTimeout(t, e)),
      a = () => {
        (cleanDemoDecisions.forEach((t, n) => {
          (i(r, () => diffRef.current?.highlight(n)),
            (r += cleanHighlightDuration),
            i(r, () => (t === `accept` ? diffRef.current?.accept(n) : diffRef.current?.reject(n))),
            (r += cleanDecisionGap));
        }),
          (r += cleanResetHold),
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
        (e.target as Element).closest?.(`.ui-dfc__chg, .ui-dfc__pop, button`) && stopAutoplay();
      }}
    >
      <InlineDiffClean
        ref={diffRef}
        label={`Suggested by AI · Make it shorter`}
        original={cleanDemoOriginal}
        suggested={cleanDemoSuggested}
      />
    </div>
  );
}
const demoStyles =
  ".df-demo{grid-template-columns:minmax(0,520px);place-content:center;width:100%;font-family:Inter,ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,sans-serif;display:grid}.card__preview .df-demo{grid-template-columns:auto;place-content:start center;padding:42px 0 0;position:absolute;inset:0}.card__preview .df-demo .ui-df{zoom:.7;width:500px;max-width:none}.stage:has(.df-demo){height:440px}.stage .df-demo{align-self:start;margin-top:96px}@media (width<=760px){.stage:has(.df-demo){height:500px;padding-left:16px;padding-right:16px}.stage .df-demo{margin-top:70px}}:where(.dark,[data-theme=dark]) .df-demo{--lightningcss-light: ;--lightningcss-dark:initial;color-scheme:dark}.stage .df-demo .ui-dfc{zoom:1.15}.card__preview .df-demo .ui-dfc{zoom:.68;width:460px;max-width:none}\n";
function InlineDiffCleanDemo(props: React.JSX.IntrinsicAttributes) {
  return (
    <>
      <style href="plico-demo-inline-diff-clean" precedence="default">
        {demoStyles}
      </style>
      <InlineDiffCleanDemo2 {...props} />
    </>
  );
}
export { InlineDiffClean as Component };
export { InlineDiffCleanDemo as Demo };
export { InlineDiffClean };
export { InlineDiffCleanDemo };
export { diffWords };
export default InlineDiffClean;
export type { InlineDiffCleanProps };
export type { InlineDiffHandle };
export type { DiffSegment };
export type { DiffChangeEntry };
export type { DiffDecision };
export type { DiffChange };

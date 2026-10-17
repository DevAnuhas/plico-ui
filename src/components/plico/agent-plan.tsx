"use client";

import * as React from "react";
interface PlanDragState {
  id: string;
  pointer: number;
  ids: string[];
  from: number;
  to: number;
  startY: number;
  scale: number;
  dy: number;
  tops: number[];
  heights: number[];
}
type PlanStep = {
  id: string;
  title: string;
  detail?: string;
  tool?: string;
  status?: "pending" | "active" | "done" | "failed" | "skipped";
  duration?: number;
  error?: string;
};
interface AgentPlanProps {
  steps?: PlanStep[];
  defaultSteps?: PlanStep[];
  status?: "draft" | "running" | "done";
  onChange?: (steps: PlanStep[]) => void;
  onRun?: (steps: PlanStep[]) => void;
  onCancel?: () => void;
  onRetry?: (stepId: string) => void;
  title?: string;
  estimate?: string;
  className?: string;
}
var nextStepId = 0;
var createStepId = () => `step-${Date.now().toString(36)}-${(nextStepId++).toString(36)}`;
var spinnerRays = Array.from(
  {
    length: 8,
  },
  (e, t) => t,
);
var moveStep = (e: PlanStep[], t: number, n: number) => {
  let r = e.slice(),
    [i] = r.splice(t, 1);
  return (r.splice(n, 0, i), r);
};
var prefersReducedMotion = () =>
  typeof window < `u` && !!window.matchMedia?.(`(prefers-reduced-motion: reduce)`).matches;
var readTranslateY = (e: Element) => {
  let t = getComputedStyle(e).transform;
  if (!t || t === `none`) return 0;
  try {
    return new DOMMatrixReadOnly(t).m42;
  } catch {
    return 0;
  }
};
var formatStepDuration = (e: number) => {
  let t = Math.max(0, e) / 1e3;
  if (t < 10) return `${t.toFixed(1)}s`;
  if (t < 60) return `${Math.round(t)}s`;
  let n = Math.round(t);
  return `${Math.floor(n / 60)}m ${String(n % 60).padStart(2, `0`)}s`;
};
var formatPlanDuration = (e: number) => {
  let t = Math.max(1, Math.round(e / 1e3));
  return t < 60 ? `${t}s` : `${Math.floor(t / 60)}m ${String(t % 60).padStart(2, `0`)}s`;
};
var stepStatusLabels = {
  pending: `Pending`,
  active: `In progress`,
  done: `Done`,
  failed: `Failed`,
  skipped: `Skipped`,
};
function AgentPlan({
  steps: steps,
  defaultSteps = [],
  status = `draft`,
  onChange: onChange,
  onRun: onRun,
  onCancel: onCancel,
  onRetry: onRetry,
  title: title,
  estimate: estimate,
  className: className,
}: AgentPlanProps) {
  let [internalSteps, setInternalSteps] = React.useState(defaultSteps),
    currentSteps = steps ?? internalSteps,
    isDraft = status === `draft`,
    stepsRef = React.useRef(currentSteps);
  stepsRef.current = currentSteps;
  let [editing, setEditing] = React.useState<{
      id: string;
      value: string;
    } | null>(null),
    editingRef = React.useRef(editing);
  editingRef.current = editing;
  let [newTitle, setNewTitle] = React.useState<string>(``),
    [removingIds, setRemovingIds] = React.useState<(string | null)[]>([]),
    [draggingId, setDraggingId] = React.useState<string | null>(null),
    [announcement, setAnnouncement] = React.useState(``),
    [, forceTick] = React.useState(0),
    [elapsedMs, setElapsedMs] = React.useState<number | null>(null),
    rootRef = React.useRef<HTMLDivElement | null>(null),
    addInputRef = React.useRef<HTMLInputElement | null>(null),
    rowRefs = React.useRef<Map<string, HTMLLIElement>>(new Map()),
    rowTopsRef = React.useRef<Map<string, number>>(new Map()),
    dragRef = React.useRef<PlanDragState | null>(null),
    focusAfterRenderRef = React.useRef<string | null>(null),
    enteringIdsRef = React.useRef<Set<string>>(new Set()),
    timeoutsRef = React.useRef<Set<number>>(new Set()),
    stepStartedAtRef = React.useRef<Map<string, number>>(new Map()),
    stepDurationsRef = React.useRef<Map<string, number>>(new Map()),
    planStartedAtRef = React.useRef<number | null>(null),
    previousStepStatusesRef = React.useRef<Map<string, NonNullable<PlanStep["status"]>>>(new Map()),
    instructionsId = React.useId(),
    schedule = (e: () => void, t: number) => {
      let n = window.setTimeout(() => {
        (timeoutsRef.current.delete(n), e());
      }, t);
      timeoutsRef.current.add(n);
    };
  React.useEffect(() => {
    let e = timeoutsRef.current;
    return () => e.forEach((e) => window.clearTimeout(e));
  }, []);
  let updateSteps = (t: PlanStep[]) => {
      (steps === void 0 && setInternalSteps(t), onChange?.(t));
    },
    announce = (e: string) => setAnnouncement((t) => (t === e ? `${e} ` : e)),
    stepIdsKey = currentSteps.map((e) => e.id).join(`
`),
    previousStepIdsKeyRef = React.useRef(stepIdsKey);
  React.useLayoutEffect(() => {
    let e = previousStepIdsKeyRef.current !== stepIdsKey;
    previousStepIdsKeyRef.current = stepIdsKey;
    let t = new Map(),
      n = e && !prefersReducedMotion();
    if (
      (rowRefs.current.forEach((r, i) => {
        let a = r.offsetTop;
        if ((t.set(i, a), !e)) return;
        let o = rowTopsRef.current.get(i);
        (n &&
          o !== void 0 &&
          o !== a &&
          ((r.style.transition = `none`),
          (r.style.transform = `translateY(${o - a}px)`),
          r.getBoundingClientRect()),
          (r.style.transition = ``),
          (r.style.transform = ``));
      }),
      (rowTopsRef.current = t),
      focusAfterRenderRef.current)
    ) {
      let e = rowRefs.current.get(focusAfterRenderRef.current);
      ((focusAfterRenderRef.current = null), e && document.activeElement !== e && e.focus());
    }
  });
  let previousPlanStatusRef = React.useRef(status);
  (React.useLayoutEffect(() => {
    let e = previousPlanStatusRef.current;
    if (
      ((previousPlanStatusRef.current = status),
      status === `running` &&
        (planStartedAtRef.current === null || e === `done`) &&
        (planStartedAtRef.current = Date.now()),
      status === `draft` && ((planStartedAtRef.current = null), setElapsedMs(null)),
      status === `done`)
    ) {
      let e = stepsRef.current.reduce(
        (e, t) => e + (t.duration ?? stepDurationsRef.current.get(t.id) ?? 0),
        0,
      );
      setElapsedMs(planStartedAtRef.current === null ? e : Date.now() - planStartedAtRef.current);
    }
  }, [status]),
    React.useLayoutEffect(() => {
      currentSteps.forEach((e) => {
        let t = e.status ?? `pending`;
        (t === `active`
          ? stepStartedAtRef.current.has(e.id) || stepStartedAtRef.current.set(e.id, Date.now())
          : stepStartedAtRef.current.has(e.id) &&
            (t === `done` &&
              stepDurationsRef.current.set(e.id, Date.now() - stepStartedAtRef.current.get(e.id)!),
            stepStartedAtRef.current.delete(e.id)),
          t === `pending` && stepDurationsRef.current.delete(e.id));
      });
    }),
    React.useEffect(() => {
      if (status !== `running`) return;
      let e = window.setInterval(() => forceTick((e) => e + 1), 100);
      return () => window.clearInterval(e);
    }, [status]),
    React.useEffect(() => {
      let e: string[] = [];
      (currentSteps.forEach((t, n) => {
        let r = t.status ?? `pending`,
          i = previousStepStatusesRef.current.get(t.id);
        (!isDraft &&
          i !== void 0 &&
          i !== r &&
          (r === `done` && e.push(`Step ${n + 1} done: ${t.title}`),
          r === `failed` &&
            e.push(`Step ${n + 1} failed: ${t.title}${t.error ? `. ${t.error}` : ``}`),
          r === `skipped` && e.push(`Step ${n + 1} skipped`)),
          previousStepStatusesRef.current.set(t.id, r));
      }),
        e.length && announce(e.join(`. `)));
    }),
    React.useEffect(() => {
      (status === `running` && announce(`Running plan`),
        status === `done` &&
          elapsedMs !== null &&
          announce(`Plan done in ${formatPlanDuration(elapsedMs)}`));
    }, [status, elapsedMs]),
    React.useEffect(() => {
      isDraft || (setEditing(null), setNewTitle(``));
    }, [isDraft]));
  let focusRow = (e: string | undefined) => {
      e ? rowRefs.current.get(e)?.focus() : addInputRef.current?.focus();
    },
    reorderStep = (e: string, t: number) => {
      let n = stepsRef.current,
        r = n.findIndex((t) => t.id === e),
        i = r + t;
      r < 0 ||
        i < 0 ||
        i >= n.length ||
        ((focusAfterRenderRef.current = e),
        updateSteps(moveStep(n, r, i)),
        announce(`Moved “${n[r].title}” to position ${i + 1} of ${n.length}`));
    },
    removeStep = (e: string) => {
      if (!isDraft || removingIds.includes(e)) return;
      let t = stepsRef.current,
        n = t.findIndex((t) => t.id === e);
      if (n < 0) return;
      let r = rowRefs.current.get(e);
      if (
        (r?.contains(document.activeElement) && focusRow((t[n + 1] ?? t[n - 1])?.id),
        announce(`Removed “${t[n].title}”`),
        !r || prefersReducedMotion())
      ) {
        updateSteps(t.filter((t) => t.id !== e));
        return;
      }
      ((r!.style.height = `${r!.offsetHeight}px`),
        r!.getBoundingClientRect(),
        setRemovingIds((t) => [...t, e]),
        schedule(() => {
          ((r!.style.height = ``),
            setRemovingIds((t) => t.filter((t) => t !== e)),
            updateSteps(stepsRef.current.filter((t) => t.id !== e)));
        }, 260));
    },
    startRename = (e: string) => {
      if (!isDraft) return;
      let t = stepsRef.current.find((t) => t.id === e);
      t &&
        setEditing({
          id: e,
          value: t.title,
        });
    },
    finishRename = (e: boolean, t: boolean = false) => {
      let n = editingRef.current;
      if (!n) return;
      ((editingRef.current = null), setEditing(null), t && (focusAfterRenderRef.current = n.id));
      let r = n.value.trim(),
        i = stepsRef.current.find((e) => e.id === n.id);
      e &&
        i &&
        r &&
        r !== i.title &&
        (updateSteps(
          stepsRef.current.map((e) =>
            e.id === n.id
              ? {
                  ...e,
                  title: r,
                }
              : e,
          ),
        ),
        announce(`Renamed to “${r}”`));
    },
    addStep = () => {
      let e = newTitle.trim();
      if (!e) return;
      let t = createStepId();
      (enteringIdsRef.current.add(t),
        updateSteps([
          ...stepsRef.current,
          {
            id: t,
            title: e,
          },
        ]),
        setNewTitle(``),
        announce(`Added “${e}” as step ${stepsRef.current.length + 1}`));
    },
    onRowKeyDown = (e: React.KeyboardEvent<HTMLLIElement>, t: string) => {
      if (!isDraft || e.target !== e.currentTarget) return;
      let n = stepsRef.current,
        r = n.findIndex((e) => e.id === t);
      if (e.altKey && (e.key === `ArrowUp` || e.key === `ArrowDown`))
        (e.preventDefault(), reorderStep(t, e.key === `ArrowUp` ? -1 : 1));
      else if (e.key === `ArrowUp` || e.key === `ArrowDown`) {
        e.preventDefault();
        let t = n[r + (e.key === `ArrowUp` ? -1 : 1)];
        t ? focusRow(t.id) : e.key === `ArrowDown` && addInputRef.current?.focus();
      } else
        e.key === `Enter` || e.key === `F2`
          ? (e.preventDefault(), startRename(t))
          : (e.key === `Delete` || e.key === `Backspace`) && (e.preventDefault(), removeStep(t));
    },
    onDragStart = (e: React.PointerEvent<HTMLSpanElement>, t: string) => {
      if (!isDraft || e.button !== 0 || editingRef.current || removingIds.length) return;
      let n = stepsRef.current.map((e) => e.id),
        r = n.map((e) => rowRefs.current.get(e));
      if (r.some((e) => !e)) return;
      let i = r as HTMLLIElement[],
        a = n.indexOf(t),
        o = i[a],
        s = o.offsetHeight ? o.getBoundingClientRect().height / o.offsetHeight : 1;
      e.preventDefault();
      try {
        e.currentTarget.setPointerCapture(e.pointerId);
      } catch {}
      ((dragRef.current = {
        id: t,
        pointer: e.pointerId,
        ids: n,
        from: a,
        to: a,
        startY: e.clientY,
        scale: s || 1,
        dy: 0,
        tops: i.map((e) => e.offsetTop),
        heights: i.map((e) => e.offsetHeight),
      }),
        setDraggingId(t));
    },
    onDragMove: React.PointerEventHandler<HTMLSpanElement> = (e) => {
      let t = dragRef.current;
      if (!t || t.pointer !== e.pointerId) return;
      let n = t.ids.length - 1,
        r = t.tops[0] - t.tops[t.from],
        i = t.tops[n] + t.heights[n] - (t.tops[t.from] + t.heights[t.from]);
      ((t.dy = Math.min(i, Math.max(r, (e.clientY - t.startY) / t.scale))),
        rowRefs.current.get(t.id)?.style.setProperty(`transform`, `translateY(${t.dy}px)`));
      let a = t.tops[t.from] + t.dy + t.heights[t.from] / 2,
        o = 0;
      if (
        (t.ids.forEach((e, n) => {
          n !== t.from && t.tops[n] + t.heights[n] / 2 < a && o++;
        }),
        o === t.to)
      )
        return;
      t.to = o;
      let s = t.heights[t.from];
      t.ids.forEach((e, n) => {
        if (n === t.from) return;
        let r =
            t.from < o && n > t.from && n <= o ? -s : o < t.from && n >= o && n < t.from ? s : 0,
          i = rowRefs.current.get(e);
        i && (i.style.transform = r ? `translateY(${r}px)` : ``);
      });
    },
    onDragEnd: React.PointerEventHandler<HTMLSpanElement> = (e) => {
      let t = dragRef.current;
      if (!t || t.pointer !== e.pointerId) return;
      if (((dragRef.current = null), setDraggingId(null), t.to === t.from)) {
        let e = rowRefs.current.get(t.id);
        e && (e.style.transform = ``);
        return;
      }
      rowRefs.current.forEach((e, t) => {
        (rowTopsRef.current.set(t, e.offsetTop + readTranslateY(e)),
          (e.style.transition = `none`),
          (e.style.transform = ``));
      });
      let n = stepsRef.current,
        r = n.find((e) => e.id === t.id);
      (updateSteps(moveStep(n, t.from, t.to)),
        requestAnimationFrame(() => rowRefs.current.forEach((e) => (e.style.transition = ``))),
        r && announce(`Moved “${r.title}” to position ${t.to + 1} of ${n.length}`));
    },
    stepCount = currentSteps.length,
    getStepStatus = (e: PlanStep) => e.status ?? `pending`,
    activeIndex = currentSteps.findIndex((e) => getStepStatus(e) === `active`),
    failedIndex = currentSteps.findIndex((e) => getStepStatus(e) === `failed`),
    completeCount = currentSteps.filter(
      (e) => getStepStatus(e) === `done` || getStepStatus(e) === `skipped`,
    ).length,
    now = Date.now(),
    phase = `draft`,
    statusLabel = ``;
  status === `done`
    ? ((phase = `done`), (statusLabel = `Done in ${formatPlanDuration(elapsedMs ?? 0)}`))
    : status === `running` &&
      (failedIndex >= 0 && activeIndex < 0
        ? ((phase = `failed`), (statusLabel = `Stopped · step ${failedIndex + 1} failed`))
        : ((phase = `running`),
          (statusLabel = `Running · ${activeIndex >= 0 ? activeIndex + 1 : Math.min(completeCount + 1, stepCount)} of ${stepCount}`)));
  let runningElapsedMs = planStartedAtRef.current === null ? 0 : now - planStartedAtRef.current;
  return (
    <div
      ref={rootRef}
      className={[`ui-pl`, className].filter(Boolean).join(` `)}
      data-status={status}
      data-dragging={draggingId ? `` : void 0}
    >
      <style href={`ui-agent-plan`} precedence={`default`}>
        {agentPlanStyles}
      </style>
      <div className={`ui-pl__card`}>
        <div className={`ui-pl__head`}>
          <div className={`ui-pl__meta`}>
            <span className={`ui-pl__state`}>
              <span className={`ui-pl__state-icon`} aria-hidden={`true`}>
                <svg viewBox={`0 0 16 16`}>
                  <path d={`M6.5 4.5h7M6.5 8h7M6.5 11.5h7`} />
                  <circle cx={`3.25`} cy={`4.5`} r={`.6`} />
                  <circle cx={`3.25`} cy={`8`} r={`.6`} />
                  <circle cx={`3.25`} cy={`11.5`} r={`.6`} />
                </svg>
              </span>
              <span className={`ui-pl__state-label`}>
                {`Plan · `}
                {stepCount}
                {` `}
                {stepCount === 1 ? `step` : `steps`}
              </span>
            </span>
            {isDraft && estimate ? (
              <span className={`ui-pl__estimate`}>
                <svg viewBox={`0 0 16 16`} aria-hidden={`true`}>
                  <circle cx={`8`} cy={`8`} r={`6`} />
                  <path d={`M8 5v3.2l2 1.3`} />
                </svg>
                <span>
                  <span className={`ui-pl__sr`}>{`Estimated time `}</span>
                  {estimate}
                </span>
              </span>
            ) : null}
          </div>
          {title && <h3 className={`ui-pl__title`}>{title}</h3>}
        </div>
        <p
          id={instructionsId}
          className={`ui-pl__sr`}
        >{`Press Enter to rename, Alt plus arrow keys to move, Delete to remove.`}</p>
        <ol className={`ui-pl__list`} aria-label={title ? `Plan: ${title}` : `Plan`}>
          {currentSteps.map((e, t) => {
            let n = getStepStatus(e),
              i = isDraft && editing?.id === e.id,
              a = e.duration ?? stepDurationsRef.current.get(e.id),
              o = stepStartedAtRef.current.get(e.id)!;
            return (
              <li
                ref={(t) => (
                  t && rowRefs.current.set(e.id, t),
                  () => {
                    rowRefs.current.delete(e.id);
                  }
                )}
                className={`ui-pl__step`}
                data-step={isDraft ? void 0 : n}
                data-dragging={draggingId === e.id ? `` : void 0}
                data-removing={removingIds.includes(e.id) ? `` : void 0}
                data-enter={enteringIdsRef.current.has(e.id) ? `` : void 0}
                onAnimationEnd={(t) => {
                  t.target === t.currentTarget && enteringIdsRef.current.delete(e.id);
                }}
                tabIndex={isDraft && !i ? 0 : void 0}
                aria-describedby={isDraft ? instructionsId : void 0}
                aria-current={n === `active` && !isDraft ? `step` : void 0}
                onKeyDown={(t) => onRowKeyDown(t, e.id)}
                key={e.id}
              >
                {isDraft && (
                  <span
                    className={`ui-pl__grip`}
                    aria-hidden={`true`}
                    title={`Drag to reorder`}
                    onPointerDown={(t) => onDragStart(t, e.id)}
                    onPointerMove={onDragMove}
                    onPointerUp={onDragEnd}
                    onPointerCancel={onDragEnd}
                  >
                    <svg viewBox={`0 0 16 16`}>
                      <circle cx={`6`} cy={`4`} r={`1.1`} />
                      <circle cx={`10`} cy={`4`} r={`1.1`} />
                      <circle cx={`6`} cy={`8`} r={`1.1`} />
                      <circle cx={`10`} cy={`8`} r={`1.1`} />
                      <circle cx={`6`} cy={`12`} r={`1.1`} />
                      <circle cx={`10`} cy={`12`} r={`1.1`} />
                    </svg>
                  </span>
                )}
                <span className={`ui-pl__marker`} aria-hidden={`true`}>
                  {isDraft || n === `pending` ? (
                    <span className={`ui-pl__num`}>{t + 1}</span>
                  ) : n === `active` ? (
                    <PlanSpinner />
                  ) : n === `done` ? (
                    <svg viewBox={`0 0 16 16`} className={`ui-pl__mark`}>
                      <path d={`M4.2 8.4 6.8 11l5-5.6`} pathLength={1} className={`ui-pl__draw`} />
                    </svg>
                  ) : n === `failed` ? (
                    <svg viewBox={`0 0 16 16`} className={`ui-pl__mark`}>
                      <path d={`M8 4.2v4.4M8 11.6h.01`} />
                    </svg>
                  ) : (
                    <svg viewBox={`0 0 16 16`} className={`ui-pl__mark`}>
                      <path d={`M5 8h6`} />
                    </svg>
                  )}
                </span>
                <div className={`ui-pl__main`}>
                  {i ? (
                    <input
                      className={`ui-pl__edit`}
                      value={editing!.value}
                      aria-label={`Rename step ${t + 1}`}
                      autoFocus={true}
                      onFocus={(e) => e.currentTarget.select()}
                      onChange={(t) =>
                        setEditing({
                          id: e.id,
                          value: t.target.value,
                        })
                      }
                      onBlur={() => finishRename(true)}
                      onKeyDown={(e) => {
                        e.key === `Enter`
                          ? (e.preventDefault(), finishRename(true, true))
                          : e.key === `Escape` &&
                            (e.preventDefault(), e.stopPropagation(), finishRename(false, true));
                      }}
                    />
                  ) : (
                    <span className={`ui-pl__name`} onDoubleClick={() => startRename(e.id)}>
                      {e.title}
                    </span>
                  )}
                  {(e.detail || e.tool) && (
                    <span className={`ui-pl__sub`}>
                      {e.detail && <span className={`ui-pl__detail`}>{e.detail}</span>}
                      {e.tool && <code className={`ui-pl__tool`}>{e.tool}</code>}
                    </span>
                  )}
                  {!isDraft && (
                    <span className={`ui-pl__sr`}>
                      {`, `}
                      {stepStatusLabels[n]}
                    </span>
                  )}
                  {!isDraft && n === `failed` && (
                    <span className={`ui-pl__fail`}>
                      <span className={`ui-pl__error`}>{e.error ?? `This step failed`}</span>
                      {onRetry && (
                        <button
                          type={`button`}
                          className={`ui-pl__retry`}
                          onClick={() => onRetry(e.id)}
                        >
                          <svg viewBox={`0 0 16 16`} aria-hidden={`true`}>
                            <path d={`M13 8a5 5 0 1 1-1.6-3.7`} />
                            <path d={`M13 3v2.6h-2.6`} />
                          </svg>
                          {`Retry from here`}
                        </button>
                      )}
                    </span>
                  )}
                </div>
                <span className={`ui-pl__aside`}>
                  {isDraft ? (
                    <button
                      type={`button`}
                      className={`ui-pl__remove`}
                      aria-label={`Remove step ${t + 1}: ${e.title}`}
                      onClick={() => removeStep(e.id)}
                    >
                      <svg viewBox={`0 0 16 16`} aria-hidden={`true`}>
                        <path d={`M4.5 4.5l7 7M11.5 4.5l-7 7`} />
                      </svg>
                    </button>
                  ) : n === `active` ? (
                    <span className={`ui-pl__time`} aria-hidden={`true`}>
                      {formatStepDuration(o === void 0 ? 0 : now - o)}
                    </span>
                  ) : n === `done` && a !== void 0 ? (
                    <span className={`ui-pl__time ui-pl__time--done`}>
                      <span className={`ui-pl__sr`}>{`took `}</span>
                      {formatStepDuration(a)}
                    </span>
                  ) : n === `skipped` ? (
                    <span className={`ui-pl__time`} aria-hidden={`true`}>{`Skipped`}</span>
                  ) : null}
                </span>
                {t < stepCount - 1 && <span className={`ui-pl__rail`} aria-hidden={`true`} />}
              </li>
            );
          })}
        </ol>
        <div className={`ui-pl__tail`} inert={!isDraft}>
          <div className={`ui-pl__tail-inner`}>
            <label className={`ui-pl__add`}>
              <span className={`ui-pl__add-icon`} aria-hidden={`true`}>
                <svg viewBox={`0 0 16 16`}>
                  <path d={`M8 4.5v7M4.5 8h7`} />
                </svg>
              </span>
              <input
                ref={addInputRef}
                value={newTitle}
                placeholder={`Add step`}
                aria-label={`Add a step at the end`}
                enterKeyHint={`done`}
                onChange={(e) => setNewTitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === `Enter`) (e.preventDefault(), addStep());
                  else if (e.key === `Escape`) setNewTitle(``);
                  else if (e.key === `ArrowUp` && !newTitle) {
                    let t = stepsRef.current[stepsRef.current.length - 1];
                    t && (e.preventDefault(), focusRow(t.id));
                  }
                }}
              />
            </label>
          </div>
        </div>
      </div>
      <div className={`ui-pl__foot`} data-phase={phase} key={phase}>
        {phase === `draft` ? (
          <>
            <span
              className={`ui-pl__hint`}
              aria-hidden={`true`}
            >{`Drag to reorder · double-click to rename`}</span>
            <span className={`ui-pl__actions`}>
              {onCancel && (
                <button
                  type={`button`}
                  className={`ui-pl__btn ui-pl__btn--quiet`}
                  onClick={onCancel}
                >{`Cancel`}</button>
              )}
              <button
                type={`button`}
                className={`ui-pl__btn ui-pl__btn--primary ui-pl__run`}
                disabled={!stepCount}
                onClick={() => onRun?.(stepsRef.current)}
              >
                {`Run plan`}
                <svg viewBox={`0 0 16 16`} aria-hidden={`true`}>
                  <path d={`M5.5 3.8v8.4L12 8z`} />
                </svg>
              </button>
            </span>
          </>
        ) : (
          <>
            <span className={`ui-pl__status`}>
              <span className={`ui-pl__status-icon`} aria-hidden={`true`}>
                {phase === `running` ? (
                  <PlanSpinner />
                ) : phase === `done` ? (
                  <svg viewBox={`0 0 16 16`}>
                    <circle cx={`8`} cy={`8`} r={`6.5`} />
                    <path d={`M5.4 8.2 7.2 10l3.4-3.8`} pathLength={1} className={`ui-pl__draw`} />
                  </svg>
                ) : (
                  <svg viewBox={`0 0 16 16`}>
                    <circle cx={`8`} cy={`8`} r={`6.5`} />
                    <path d={`M8 4.9v3.6M8 11h.01`} />
                  </svg>
                )}
              </span>
              <span className={`ui-pl__status-label`}>{statusLabel}</span>
            </span>
            {phase === `running` ? (
              <span className={`ui-pl__elapsed`} aria-hidden={`true`}>
                {formatPlanDuration(runningElapsedMs)}
              </span>
            ) : phase === `done` && onRun ? (
              <span className={`ui-pl__actions`}>
                <button
                  type={`button`}
                  className={`ui-pl__btn ui-pl__btn--quiet ui-pl__again`}
                  onClick={() => onRun(stepsRef.current)}
                >
                  <svg viewBox={`0 0 16 16`} aria-hidden={`true`}>
                    <path d={`M13 8a5 5 0 1 1-1.6-3.7`} />
                    <path d={`M13 3v2.6h-2.6`} />
                  </svg>
                  {`Run again`}
                </button>
              </span>
            ) : null}
          </>
        )}
      </div>
      <p className={`ui-pl__sr`} role={`status`} aria-live={`polite`}>
        {announcement}
      </p>
    </div>
  );
}
function PlanSpinner() {
  return (
    <svg className={`ui-pl__spinner`} viewBox={`0 0 16 16`}>
      {spinnerRays.map((e) => (
        <line
          x1={`8`}
          y1={`1.75`}
          x2={`8`}
          y2={`4.75`}
          transform={`rotate(${e * 45} 8 8)`}
          style={{
            animationDelay: `${(e - 8) * 100}ms`,
          }}
          key={e}
        />
      ))}
    </svg>
  );
}
var agentPlanStyles = `
/* Colors and motion as variables – override them on .ui-pl */
.ui-pl {
  --ui-pl-tray: #f0f0f0;
  --ui-pl-card: #ffffff;
  --ui-pl-ink: #171717;
  --ui-pl-text: #6b6b6b;
  --ui-pl-muted: #8a8a8a;
  --ui-pl-faint: #b8b8b8;
  --ui-pl-line: #ececec;
  --ui-pl-raise: #ffffff;
  --ui-pl-hover: #f6f6f6;
  --ui-pl-quiet-hover: #e4e4e5;
  --ui-pl-press: rgba(23, 23, 23, 0.05);
  --ui-pl-chip: #f3f3f3;
  --ui-pl-chip-text: #555555;
  --ui-pl-marker: #f0f0f0;
  --ui-pl-rail: #c4c4c8;
  --ui-pl-on-ink: #ffffff;
  --ui-pl-red: #c2331f;
  --ui-pl-red-bg: #fdf3f1;
  --ui-pl-red-ring: rgba(194, 51, 31, 0.32);
  --ui-pl-ring: rgba(23, 23, 23, 0.22);
  --ui-pl-lift: 0 1px 2px rgba(0, 0, 0, 0.06), 0 12px 28px -10px rgba(0, 0, 0, 0.2);
  --ui-pl-ease: cubic-bezier(0.22, 1, 0.36, 1);
  --ui-pl-inset: 30px;

  container-type: inline-size;
  position: relative;
  box-sizing: border-box;
  display: grid;
  width: 100%;
  max-width: 460px;
  padding: 4px;
  border-radius: 20px;
  background: var(--ui-pl-tray);
  color: var(--ui-pl-text);
  font-family: "Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.006em;
  text-align: left;
  -webkit-font-smoothing: antialiased;
}
/* The white card holds the goal and the steps */
.ui-pl__card {
  position: relative;
  border-radius: 16px;
  background: var(--ui-pl-card);
  box-shadow: 0 0 0 1px var(--ui-pl-line), 0 1px 2px rgba(0, 0, 0, 0.04);
}
.ui-pl:not([data-status="draft"]) {
  --ui-pl-inset: 14px;
}
.ui-pl[data-dragging] {
  cursor: grabbing;
  user-select: none;
  -webkit-user-select: none;
}
.ui-pl *,
.ui-pl *::before,
.ui-pl *::after {
  box-sizing: border-box;
}
.ui-pl svg {
  display: block;
  width: 100%;
  height: 100%;
  overflow: visible;
}
:where(.ui-pl) button {
  margin: 0;
  padding: 0;
  border: 0;
  background: none;
  font: inherit;
  letter-spacing: inherit;
  color: inherit;
  cursor: pointer;
}
.ui-pl__sr {
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

/* Header: a quiet status line, then the goal */
.ui-pl__head {
  display: grid;
  gap: 4px;
  padding: 16px 18px 8px;
}
.ui-pl__meta {
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 18px;
  font-size: 12.5px;
  line-height: 18px;
  color: var(--ui-pl-muted);
}
.ui-pl__state {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  min-width: 0;
}
.ui-pl__state-label {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-variant-numeric: tabular-nums;
}
.ui-pl__state-icon,
.ui-pl__status-icon {
  flex: none;
  width: 13px;
  height: 13px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.ui-pl__state-icon circle[r=".6"] {
  fill: currentColor;
}
.ui-pl__estimate {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  margin-left: auto;
  white-space: nowrap;
  font-variant-numeric: tabular-nums;
}
.ui-pl__estimate svg {
  width: 13px;
  height: 13px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.4;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.ui-pl__title {
  margin: 0;
  color: var(--ui-pl-ink);
  font-size: 15px;
  font-weight: 600;
  line-height: 22px;
  letter-spacing: -0.012em;
  text-wrap: balance;
}

/* Steps */
.ui-pl__list {
  position: relative;
  margin: 0;
  padding: 2px 6px 6px;
  list-style: none;
}
.ui-pl__step {
  position: relative;
  display: grid;
  grid-template-columns: 22px minmax(0, 1fr) auto;
  column-gap: 12px;
  align-items: start;
  padding: 10px 10px 10px var(--ui-pl-inset);
  border-radius: 10px;
  outline: none;
  transition:
    transform 420ms var(--ui-pl-ease),
    padding 420ms var(--ui-pl-ease),
    height 260ms var(--ui-pl-ease),
    opacity 180ms ease,
    background-color 160ms ease,
    box-shadow 200ms ease;
}
.ui-pl[data-status="draft"] .ui-pl__step:hover {
  background: var(--ui-pl-hover);
}
.ui-pl__step:focus-visible {
  outline: 2px solid var(--ui-pl-ring);
  outline-offset: 0;
}
.ui-pl__step[data-dragging] {
  z-index: 2;
  background: var(--ui-pl-raise) !important;
  box-shadow: inset 0 0 0 1px var(--ui-pl-line), var(--ui-pl-lift);
  transition: background-color 160ms ease, box-shadow 200ms ease;
}
.ui-pl__step[data-removing] {
  height: 0 !important;
  padding-top: 0;
  padding-bottom: 0;
  overflow: hidden;
  opacity: 0;
  pointer-events: none;
}
.ui-pl__step[data-enter] {
  animation: ui-pl-enter 380ms var(--ui-pl-ease) both;
}

/* Grip: in the left gutter, shows on hover and focus */
.ui-pl__grip {
  position: absolute;
  top: 10px;
  left: 6px;
  display: grid;
  place-items: center;
  width: 18px;
  height: 22px;
  margin-top: -1px;
  border-radius: 5px;
  color: var(--ui-pl-faint);
  fill: currentColor;
  cursor: grab;
  touch-action: none;
  opacity: 0;
  transition: opacity 160ms ease, color 160ms ease, background-color 160ms ease;
}
.ui-pl__grip svg {
  width: 14px;
  height: 14px;
}
.ui-pl__step:hover .ui-pl__grip,
.ui-pl__step:focus-visible .ui-pl__grip,
.ui-pl__step[data-dragging] .ui-pl__grip {
  opacity: 1;
}
.ui-pl__grip:hover,
.ui-pl__step[data-dragging] .ui-pl__grip {
  color: var(--ui-pl-text);
  background: var(--ui-pl-press);
}
.ui-pl__step[data-dragging] .ui-pl__grip {
  cursor: grabbing;
}

/* Marker: a quiet ring with the number → spinner → check */
.ui-pl__marker {
  position: relative;
  z-index: 1;
  display: grid;
  place-items: center;
  justify-self: center;
  width: 20px;
  height: 20px;
  border-radius: 999px;
  background: var(--ui-pl-card);
  box-shadow: inset 0 0 0 1px var(--ui-pl-line);
  color: var(--ui-pl-muted);
  font-size: 11px;
  font-weight: 500;
  line-height: 1;
  font-variant-numeric: tabular-nums;
  transition: background-color 320ms ease, color 320ms ease, box-shadow 320ms ease;
}
.ui-pl__marker > * {
  grid-area: 1 / 1;
  animation: ui-pl-pop 360ms var(--ui-pl-ease) both;
}
.ui-pl__num {
  animation: none !important;
}
.ui-pl__marker .ui-pl__spinner {
  width: 13px;
  height: 13px;
}
.ui-pl__mark {
  width: 11px !important;
  height: 11px !important;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.9;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.ui-pl__step[data-step="active"] .ui-pl__marker {
  box-shadow: none;
  color: var(--ui-pl-ink);
}
.ui-pl__step[data-step="done"] .ui-pl__marker {
  background: var(--ui-pl-marker);
  box-shadow: none;
  color: var(--ui-pl-ink);
}
.ui-pl__step[data-step="failed"] .ui-pl__marker {
  background: var(--ui-pl-red-bg);
  box-shadow: inset 0 0 0 1px var(--ui-pl-red-ring);
  color: var(--ui-pl-red);
}
.ui-pl__step[data-step="skipped"] .ui-pl__marker {
  box-shadow: none;
  outline: 1px dashed var(--ui-pl-faint);
  outline-offset: -1px;
}

/* The check draws itself */
.ui-pl__draw {
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
  animation: ui-pl-draw 420ms var(--ui-pl-ease) 80ms forwards;
}

.ui-pl__spinner line {
  stroke: currentColor;
  stroke-width: 1.7;
  stroke-linecap: round;
  opacity: 0.18;
  animation: ui-pl-ray 800ms linear infinite;
}

/* Text */
.ui-pl__main {
  display: grid;
  gap: 2px;
  min-width: 0;
}
.ui-pl__name {
  color: var(--ui-pl-ink);
  font-weight: 500;
  overflow-wrap: anywhere;
  transition: color 300ms ease;
}
.ui-pl[data-status="draft"] .ui-pl__name {
  cursor: text;
}
.ui-pl__step[data-step="pending"] .ui-pl__name {
  color: var(--ui-pl-text);
}
.ui-pl__step[data-step="skipped"] .ui-pl__name {
  color: var(--ui-pl-muted);
  text-decoration: line-through;
  text-decoration-color: var(--ui-pl-faint);
}
.ui-pl__sub {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 3px 8px;
  min-width: 0;
  color: var(--ui-pl-muted);
  font-size: 12.5px;
  line-height: 18px;
}
.ui-pl__detail {
  min-width: 0;
  overflow-wrap: anywhere;
}
.ui-pl__tool {
  padding: 1px 6px;
  border-radius: 6px;
  background: var(--ui-pl-chip);
  color: var(--ui-pl-chip-text);
  font-family: ui-monospace, "SF Mono", Menlo, monospace;
  font-size: 11px;
  line-height: 16px;
  letter-spacing: 0;
  white-space: nowrap;
}
.ui-pl__edit {
  width: calc(100% + 14px);
  height: 26px;
  margin: -3px -7px;
  padding: 0 6px;
  border: 0;
  border-radius: 7px;
  background: var(--ui-pl-raise);
  box-shadow: inset 0 0 0 1px var(--ui-pl-line), 0 0 0 3px var(--ui-pl-press);
  color: var(--ui-pl-ink);
  font: inherit;
  font-weight: 500;
  letter-spacing: inherit;
  outline: none;
}

/* Failed: an error line and a way back in */
.ui-pl__fail {
  display: grid;
  justify-items: start;
  gap: 8px;
  margin-top: 4px;
  animation: ui-pl-fade 360ms var(--ui-pl-ease) both;
}
.ui-pl__error {
  color: var(--ui-pl-red);
  font-size: 12.5px;
  line-height: 18px;
  overflow-wrap: anywhere;
}
.ui-pl__retry {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 28px;
  padding: 0 10px 0 9px;
  border-radius: 8px;
  background: var(--ui-pl-raise);
  box-shadow: inset 0 0 0 1px var(--ui-pl-line), 0 1px 2px rgba(0, 0, 0, 0.04);
  color: var(--ui-pl-ink);
  font-size: 12.5px;
  font-weight: 500;
  transition: background-color 160ms ease, transform 160ms var(--ui-pl-ease);
}
.ui-pl__retry svg {
  width: 13px;
  height: 13px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.6;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.ui-pl__retry:hover {
  background: var(--ui-pl-hover);
}
.ui-pl__retry:active {
  transform: scale(0.97);
}

/* Right column: remove, live timer, duration */
.ui-pl__aside {
  display: flex;
  align-items: center;
  min-height: 20px;
  color: var(--ui-pl-muted);
  font-size: 12.5px;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}
.ui-pl__time {
  animation: ui-pl-fade 300ms ease both;
}
.ui-pl__step[data-step="active"] .ui-pl__time {
  color: var(--ui-pl-ink);
}
.ui-pl__remove {
  display: grid;
  place-items: center;
  width: 24px;
  height: 24px;
  margin: -2px -4px 0 0;
  border-radius: 7px;
  color: var(--ui-pl-faint);
  fill: none;
  stroke: currentColor;
  stroke-width: 1.6;
  stroke-linecap: round;
  opacity: 0;
  transition: opacity 160ms ease, color 160ms ease, background-color 160ms ease;
}
.ui-pl__remove svg {
  width: 14px;
  height: 14px;
}
.ui-pl__step:hover .ui-pl__remove,
.ui-pl__step:focus-visible .ui-pl__remove,
.ui-pl__remove:focus-visible {
  opacity: 1;
}
.ui-pl__remove:hover {
  color: var(--ui-pl-ink);
  background: var(--ui-pl-press);
}
.ui-pl__remove:focus-visible,
.ui-pl__retry:focus-visible,
.ui-pl__btn:focus-visible {
  outline: 2px solid var(--ui-pl-ring);
  outline-offset: 1px;
}

/* Progress line: a segment under each marker that fills when the step finishes */
.ui-pl__rail {
  position: absolute;
  top: 35px;
  bottom: -5px;
  left: calc(var(--ui-pl-inset) + 10.5px);
  width: 1px;
  overflow: hidden;
  background: var(--ui-pl-line);
  opacity: 0;
  pointer-events: none;
  transition: opacity 300ms ease;
}
.ui-pl:not([data-status="draft"]) .ui-pl__rail {
  opacity: 1;
  transition-delay: 240ms;
}
.ui-pl__rail::after {
  content: "";
  position: absolute;
  inset: 0;
  background: var(--ui-pl-rail);
  transform: scaleY(0);
  transform-origin: top;
  transition: transform 560ms var(--ui-pl-ease);
}
.ui-pl__step[data-step="done"] .ui-pl__rail::after,
.ui-pl__step[data-step="skipped"] .ui-pl__rail::after {
  transform: scaleY(1);
}

/* Add step folds away once running */
.ui-pl__tail {
  display: grid;
  grid-template-rows: 1fr;
  transition: grid-template-rows 420ms var(--ui-pl-ease), opacity 260ms ease;
}
.ui-pl:not([data-status="draft"]) .ui-pl__tail {
  grid-template-rows: 0fr;
  opacity: 0;
}
.ui-pl__tail-inner {
  min-height: 0;
  overflow: hidden;
}
.ui-pl__add {
  display: grid;
  grid-template-columns: 22px minmax(0, 1fr);
  column-gap: 12px;
  align-items: center;
  margin: 0 6px 8px;
  padding: 7px 10px 7px var(--ui-pl-inset);
  border-radius: 10px;
  cursor: text;
  transition: background-color 160ms ease;
}
.ui-pl__add:hover,
.ui-pl__add:focus-within {
  background: var(--ui-pl-hover);
}
.ui-pl__add-icon {
  display: grid;
  place-items: center;
  width: 22px;
  height: 22px;
  border-radius: 999px;
  outline: 1px dashed var(--ui-pl-faint);
  outline-offset: -1px;
  color: var(--ui-pl-muted);
  fill: none;
  stroke: currentColor;
  stroke-width: 1.6;
  stroke-linecap: round;
}
.ui-pl__add-icon svg {
  width: 12px;
  height: 12px;
}
.ui-pl__add input {
  width: 100%;
  min-width: 0;
  height: 22px;
  padding: 0;
  border: 0;
  background: none;
  color: var(--ui-pl-ink);
  font: inherit;
  letter-spacing: inherit;
  outline: none;
}
.ui-pl__add input::placeholder {
  color: var(--ui-pl-muted);
  opacity: 1;
}
/* The tray below the card */
.ui-pl__foot {
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 46px;
  padding: 0 6px 0 12px;
  font-size: 12.5px;
  color: var(--ui-pl-muted);
  animation: ui-pl-fade 320ms var(--ui-pl-ease) both;
}
.ui-pl__hint {
  min-width: 0;
  overflow: hidden;
  color: var(--ui-pl-muted);
  font-size: 12px;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.ui-pl__actions {
  display: flex;
  flex: none;
  gap: 8px;
  margin-left: auto;
}
.ui-pl__btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 32px;
  padding: 0 13px;
  border-radius: 9px;
  font-size: 13px;
  font-weight: 500;
  white-space: nowrap;
  transition: background-color 160ms ease, opacity 160ms ease, transform 160ms var(--ui-pl-ease);
}
.ui-pl__btn:active {
  transform: scale(0.97);
}
.ui-pl__btn--primary {
  padding-right: 11px;
  background: var(--ui-pl-ink);
  color: var(--ui-pl-on-ink);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.12);
}
.ui-pl__btn--primary:hover {
  opacity: 0.88;
}
.ui-pl__btn--primary:disabled {
  opacity: 0.4;
  cursor: default;
  transform: none;
}
.ui-pl__btn--primary svg {
  width: 12px;
  height: 12px;
  fill: currentColor;
}
.ui-pl__btn--quiet {
  padding: 0 11px;
  color: var(--ui-pl-text);
}
.ui-pl__btn--quiet:hover {
  background: var(--ui-pl-quiet-hover);
  color: var(--ui-pl-ink);
}
.ui-pl__btn--quiet svg {
  width: 13px;
  height: 13px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.6;
  stroke-linecap: round;
  stroke-linejoin: round;
}

/* Status on the tray while running and after */
.ui-pl__status {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
  color: var(--ui-pl-ink);
}
.ui-pl__foot[data-phase="failed"] .ui-pl__status {
  color: var(--ui-pl-red);
}
.ui-pl__status-label {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-variant-numeric: tabular-nums;
}
.ui-pl__elapsed {
  margin-left: auto;
  padding-right: 6px;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}
/* Touch screens have no hover: keep the grip and remove button visible */
@media (hover: none) {
  .ui-pl__grip,
  .ui-pl__remove {
    opacity: 1;
  }
}

/* Narrow: drop the hint, tighten the gutters */
@container (max-width: 400px) {
  .ui-pl__hint {
    display: none;
  }
}
@container (max-width: 340px) {
  .ui-pl__head {
    padding: 14px 14px 8px;
  }
  .ui-pl__list {
    padding-inline: 4px;
  }
  .ui-pl__step,
  .ui-pl__add {
    column-gap: 10px;
    padding-right: 8px;
  }
  .ui-pl__add {
    margin-inline: 4px;
  }
  .ui-pl__foot {
    padding-left: 10px;
  }
  .ui-pl__btn {
    padding: 0 11px;
  }
}

@keyframes ui-pl-fade {
  from { opacity: 0; transform: translateY(3px); }
  to { opacity: 1; transform: none; }
}
@keyframes ui-pl-enter {
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: none; }
}
@keyframes ui-pl-pop {
  from { opacity: 0; transform: scale(0.5); }
  to { opacity: 1; transform: none; }
}
@keyframes ui-pl-draw {
  to { stroke-dashoffset: 0; }
}
@keyframes ui-pl-ray {
  0% { opacity: 1; }
  100% { opacity: 0.18; }
}

@media (prefers-reduced-motion: reduce) {
  .ui-pl *,
  .ui-pl *::before,
  .ui-pl *::after {
    animation-duration: 1ms !important;
    animation-delay: 0ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 1ms !important;
    transition-delay: 0ms !important;
  }
  .ui-pl__spinner line { opacity: 0.6; }
  .ui-pl__draw { stroke-dashoffset: 0; }
}

/* Dark mode: follows a .dark class or data-theme="dark" on any ancestor, e.g. <html> */
:where(.dark, [data-theme="dark"]) .ui-pl {
  --ui-pl-tray: #111113;
  --ui-pl-card: #19191b;
  --ui-pl-ink: #ededed;
  --ui-pl-text: #a1a1a1;
  --ui-pl-muted: #8b8b92;
  --ui-pl-faint: #5c5c63;
  --ui-pl-line: #2a2a2e;
  --ui-pl-raise: #1f1f22;
  --ui-pl-hover: #1f1f22;
  --ui-pl-quiet-hover: #222225;
  --ui-pl-press: rgba(255, 255, 255, 0.07);
  --ui-pl-chip: #232326;
  --ui-pl-chip-text: #b4b4b4;
  --ui-pl-marker: #26262a;
  --ui-pl-rail: #4a4a50;
  --ui-pl-on-ink: #19191b;
  --ui-pl-red: #f2786b;
  --ui-pl-red-bg: rgba(242, 120, 107, 0.08);
  --ui-pl-red-ring: rgba(242, 120, 107, 0.4);
  --ui-pl-ring: rgba(237, 237, 237, 0.3);
  --ui-pl-lift: 0 1px 2px rgba(0, 0, 0, 0.4), 0 14px 32px -10px rgba(0, 0, 0, 0.7);
}
`;
var valueValue = [
  {
    id: `revenue`,
    title: `Pull Q3 revenue and ARR`,
    detail: `Monthly revenue, ARR and net retention`,
    tool: `stripe.query`,
  },
  {
    id: `launches`,
    title: `Summarize product launches`,
    detail: `Shipped projects and adoption`,
    tool: `linear.search`,
  },
  {
    id: `slides`,
    title: `Build the KPI slides`,
    detail: `Six charts in the board template`,
    tool: `slides.create`,
  },
  {
    id: `memo`,
    title: `Draft the board memo`,
    detail: `One page, wins, risks and asks`,
    tool: `docs.write`,
  },
  {
    id: `email`,
    title: `Send the draft to Maya for review`,
    tool: `gmail.draft`,
  },
];
var valueValue2: Record<string, number> = {
  revenue: 1300,
  launches: 1100,
  slides: 1400,
  memo: 1250,
  email: 900,
};
var valueValue3 = `slides`;
function AgentPlanDemo2() {
  let [e, t] = React.useState<PlanStep[]>(valueValue),
    [c, l] = React.useState<"done" | "running" | "draft">(`draft`),
    u = React.useRef<HTMLDivElement | null>(null),
    d = React.useRef(true),
    f = React.useRef<number[]>([]),
    p = React.useRef<number[]>([]),
    m = React.useRef(c);
  m.current = c;
  let h = React.useRef(true),
    g = (e: React.RefObject<number[]>, t: () => void, n: number) => {
      e.current.push(window.setTimeout(t, n));
    },
    _ = (e: React.RefObject<number[]>) => {
      (e.current.forEach((e) => window.clearTimeout(e)), (e.current = []));
    },
    v = (e: string) => u.current?.querySelector<HTMLElement>(e)?.click(),
    y = (e: string, n: Partial<PlanStep>) =>
      t((t) =>
        t.map((t) =>
          t.id === e
            ? {
                ...t,
                ...n,
              }
            : t,
        ),
      ),
    b = (e: PlanStep[], t: number) => {
      if (t >= e.length) {
        (l(`done`), d.current ? g(f, w, 3600) : g(p, C, 3200));
        return;
      }
      let n = e[t];
      y(n.id, {
        status: `active`,
        error: void 0,
      });
      let r = valueValue2[n.id] ?? 1200;
      g(
        p,
        () => {
          if (n.id === valueValue3 && h.current) {
            ((h.current = false),
              y(n.id, {
                status: `failed`,
                error: `Slides API timed out after 30s`,
              }),
              d.current && g(f, () => v(`.ui-pl__retry`), 1700));
            return;
          }
          (y(n.id, {
            status: `done`,
          }),
            b(e, t + 1));
        },
        r,
      );
    },
    x: (steps: PlanStep[]) => void = (e) => {
      (_(p), (h.current = true));
      let n = e.map(({ status: status, error: error, duration: duration, ...r }) => r);
      (t(n), l(`running`), g(p, () => b(n, 0), 350));
    },
    S: (stepId: string) => void = (e) => {
      _(p);
      let n: PlanStep[] = [];
      (t((t) => {
        let r = t.findIndex((t) => t.id === e);
        return (
          (n = t.map((e, t) =>
            t >= r
              ? {
                  ...e,
                  status: `pending`,
                  error: void 0,
                }
              : e,
          )),
          n
        );
      }),
        g(
          p,
          () =>
            b(
              n,
              n.findIndex((t) => t.id === e),
            ),
          250,
        ));
    },
    C = () => {
      (t((e) => e.map(({ status: status, error: error, duration: duration, ...r }) => r)),
        l(`draft`));
    },
    w = () => {
      (_(p),
        t(valueValue),
        l(`draft`),
        g(
          f,
          () =>
            t((e) => {
              let t = e.findIndex((e) => e.id === `memo`);
              if (t < 1) return e;
              let n = e.slice(),
                [r] = n.splice(t, 1);
              return (n.splice(t - 1, 0, r), n);
            }),
          1500,
        ),
        g(f, () => v(`.ui-pl__run`), 3e3));
    };
  React.useEffect(
    () => (
      w(),
      () => {
        (_(f), _(p));
      }
    ),
    [],
  );
  let T = (e: boolean) => {
    e && d.current && ((d.current = false), _(f), m.current === `done` && g(p, C, 1200));
  };
  return (
    <div
      ref={u}
      className={`pl-demo`}
      onPointerDownCapture={(e) => T(e.nativeEvent.isTrusted)}
      onKeyDownCapture={(e) => T(e.nativeEvent.isTrusted)}
    >
      <AgentPlan
        title={`Prepare the Q3 board update`}
        estimate={`~2 min`}
        steps={e}
        status={c}
        onChange={t}
        onRun={x}
        onCancel={() => {
          (_(p), t(valueValue), l(`draft`));
        }}
        onRetry={S}
      />
    </div>
  );
}
const demoStyles =
  ".pl-demo{grid-template-columns:minmax(0,440px);justify-content:center;width:100%;display:grid}.card__preview .pl-demo{grid-template-columns:auto;align-content:start;padding:38px 16px 0;position:absolute;inset:0}.card__preview .pl-demo .ui-pl{zoom:.6;width:440px;max-width:none}.card__preview .pl-demo .ui-pl__add,.card__preview .pl-demo .ui-pl__hint,.card__preview .pl-demo .ui-pl__sub{display:none}.stage:has(.pl-demo){height:620px}.stage .pl-demo{align-self:start;margin-top:56px}@media (width<=760px){.stage:has(.pl-demo){height:770px;padding-left:12px;padding-right:12px}.stage .pl-demo{margin-top:70px}}.card__preview .pl-demo .ui-plc{zoom:.6;width:440px;max-width:none}.card__preview .pl-demo .ui-plc__add,.card__preview .pl-demo .ui-plc__hint,.card__preview .pl-demo .ui-plc__sub{display:none}\n";
function AgentPlanDemo(props: React.JSX.IntrinsicAttributes) {
  return (
    <>
      <style href="plico-demo-agent-plan" precedence="default">
        {demoStyles}
      </style>
      <AgentPlanDemo2 {...props} />
    </>
  );
}
export { AgentPlan };
export { AgentPlanDemo };
export { AgentPlan as Component };
export { AgentPlanDemo as Demo };
export default AgentPlan;
export type { PlanDragState };
export type { PlanStep };
export type { AgentPlanProps };

"use client";

import * as React from "react";
import * as JSXRuntime from "react/jsx-runtime";
var inboxFilters = [
  {
    id: `all`,
    label: `All`,
  },
  {
    id: `needs-you`,
    label: `Needs you`,
  },
  {
    id: `running`,
    label: `Running`,
  },
  {
    id: `done`,
    label: `Done`,
  },
];
var statusLabels = {
  waiting: `Needs you`,
  running: `Running`,
  done: `Done`,
  failed: `Failed`,
};
var statusOrder = {
  waiting: 0,
  failed: 1,
  running: 2,
  done: 3,
};
var matchesFilter = (filter, status) =>
  filter === `all` ||
  (filter === `needs-you` && (status === `waiting` || status === `failed`)) ||
  (filter === `running` && status === `running`) ||
  (filter === `done` && status === `done`);
var isLiveStatus = (status) => status === `running` || status === `waiting`;
var toTimestamp = (value) => (typeof value == `number` ? value : value.getTime());
var padTwoDigits = (value) => String(value).padStart(2, `0`);
var formatDuration = (milliseconds) => {
  let seconds = Math.max(0, Math.floor(milliseconds / 1e3));
  if (seconds < 60) return `${seconds}s`;
  let minutes = Math.floor(seconds / 60);
  return minutes < 60
    ? `${minutes}m ${padTwoDigits(seconds % 60)}s`
    : `${Math.floor(minutes / 60)}h ${padTwoDigits(minutes % 60)}m`;
};
var prefersReducedMotion = () =>
  typeof window < `u` && window.matchMedia(`(prefers-reduced-motion: reduce)`).matches;
var motionEase = `cubic-bezier(0.32, 0.72, 0.24, 1)`;
function StatusSwap({ id: id, tone: tone, className: className, children: children }) {
  let previousRef = React.useRef({
      id: id,
      tone: tone,
      node: children,
    }),
    [currentId, setCurrentId] = React.useState(id),
    [outgoing, setOutgoing] = React.useState(null);
  return (
    currentId !== id && (setCurrentId(id), setOutgoing(previousRef.current)),
    (previousRef.current = {
      id: id,
      tone: tone,
      node: children,
    }),
    React.useEffect(() => {
      if (!outgoing) return;
      let e = window.setTimeout(() => setOutgoing(null), 260);
      return () => window.clearTimeout(e);
    }, [outgoing]),
    (
      <span className={[`ui-ai__swap`, className].filter(Boolean).join(` `)}>
        {outgoing && (
          <span
            className={`ui-ai__swap-item`}
            data-out={``}
            data-tone={outgoing.tone}
            aria-hidden={`true`}
            key={`out-${outgoing.id}`}
          >
            {outgoing.node}
          </span>
        )}
        <span className={`ui-ai__swap-item`} data-tone={tone} key={id}>
          {children}
        </span>
      </span>
    )
  );
}
function RollingCount({ value: value }) {
  let [rollState, setRollState] = React.useState({
    now: value,
    old: null,
    up: true,
  });
  return (
    rollState.now !== value &&
      setRollState({
        now: value,
        old: rollState.now,
        up: value > rollState.now,
      }),
    React.useEffect(() => {
      if (rollState.old === null) return;
      let e = window.setTimeout(
        () =>
          setRollState((e) => ({
            ...e,
            old: null,
          })),
        340,
      );
      return () => window.clearTimeout(e);
    }, [rollState.old, rollState.now]),
    (
      <span className={`ui-ai__roll`} data-dir={rollState.up ? `up` : `down`}>
        {rollState.old !== null && (
          <span data-out={``} aria-hidden={`true`} key={`out-${rollState.old}-${rollState.now}`}>
            {rollState.old}
          </span>
        )}
        <span key={rollState.now}>{rollState.now}</span>
      </span>
    )
  );
}
var iconStroke = {
  stroke: `currentColor`,
  strokeWidth: 1.5,
  strokeLinecap: `round`,
  strokeLinejoin: `round`,
};
var CheckIcon = () => (
  <svg width={`10`} height={`10`} viewBox={`0 0 10 10`} fill={`none`} aria-hidden={`true`}>
    <path d={`m2.4 5.2 1.7 1.7 3.6-3.9`} {...iconStroke} strokeWidth={1.6} />
  </svg>
);
var ErrorIcon = () => (
  <svg width={`10`} height={`10`} viewBox={`0 0 10 10`} fill={`none`} aria-hidden={`true`}>
    <path d={`M5 2.6v3M5 7.4v.01`} {...iconStroke} strokeWidth={1.7} />
  </svg>
);
var OpenIcon = () => (
  <svg width={`12`} height={`12`} viewBox={`0 0 12 12`} fill={`none`} aria-hidden={`true`}>
    <path d={`M3.5 8.5 8.5 3.5M4.5 3.5h4v4`} {...iconStroke} strokeWidth={1.4} />
  </svg>
);
var RetryIcon = () => (
  <svg width={`12`} height={`12`} viewBox={`0 0 12 12`} fill={`none`} aria-hidden={`true`}>
    <path d={`M9.6 6A3.6 3.6 0 1 1 8.5 3.4M9.3 1.8v2.1H7.2`} {...iconStroke} strokeWidth={1.4} />
  </svg>
);
var PlusIcon = () => (
  <svg width={`12`} height={`12`} viewBox={`0 0 12 12`} fill={`none`} aria-hidden={`true`}>
    <path d={`M6 2.5v7M2.5 6h7`} {...iconStroke} strokeWidth={1.4} />
  </svg>
);
function StatusGlyph({ status: status }) {
  return (
    <span className={`ui-ai__glyph`} data-status={status}>
      {status === `running` && <span className={`ui-ai__spin`} />}
      {status === `waiting` && <span className={`ui-ai__wait`} />}
      {status === `done` && <CheckIcon />}
      {status === `failed` && <ErrorIcon />}
    </span>
  );
}
function AgentInbox({
  tasks: tasks,
  onApprove: onApprove,
  onReject: onReject,
  onRetry: onRetry,
  onOpen: onOpen,
  filter: filter,
  defaultFilter = `all`,
  onFilterChange: onFilterChange,
  action: action,
  className: className,
}) {
  let instanceId = React.useId(),
    rootRef = React.useRef(null),
    [internalFilter, setInternalFilter] = React.useState(defaultFilter),
    activeFilter = filter ?? internalFilter,
    [expandedTaskId, setExpandedTaskId] = React.useState(null),
    [hoverTarget, setHoverTarget] = React.useState(null),
    [now, setNow] = React.useState(() => Date.now()),
    firstSeenRef = React.useRef({}),
    completedAtRef = React.useRef({}),
    [localOverrides, setLocalOverrides] = React.useState({}),
    effectiveTasks = tasks.map((e) => {
      let t = localOverrides[e.id];
      return t
        ? {
            ...e,
            status: t.status,
            startedAt: t.startedAt ?? e.startedAt,
            steps: [...(e.steps ?? []), ...t.steps],
          }
        : e;
    });
  for (let e of effectiveTasks) firstSeenRef.current[e.id] ??= now;
  let hasLiveTasks = effectiveTasks.some((e) => isLiveStatus(e.status));
  React.useEffect(() => {
    if (!hasLiveTasks) return;
    let e = window.setInterval(() => setNow(Date.now()), 1e3);
    return () => window.clearInterval(e);
  }, [hasLiveTasks]);
  let statusSignature = effectiveTasks.map((e) => `${e.id}:${e.status}`).join(`|`);
  React.useEffect(() => {
    for (let e of effectiveTasks)
      isLiveStatus(e.status)
        ? delete completedAtRef.current[e.id]
        : (completedAtRef.current[e.id] ??= Date.now());
  }, [statusSignature]);
  let elapsedLabel = (task) => {
      let startTime =
        task.startedAt === void 0
          ? firstSeenRef.current[task.id] - (task.elapsed ?? 0)
          : toTimestamp(task.startedAt);
      return isLiveStatus(task.status)
        ? formatDuration(now - startTime)
        : task.elapsed === void 0
          ? task.startedAt === void 0
            ? null
            : formatDuration((completedAtRef.current[task.id] ?? now) - startTime)
          : formatDuration(task.elapsed);
    },
    [displayStatuses, setDisplayStatuses] = React.useState(() =>
      Object.fromEntries(tasks.map((e) => [e.id, e.status])),
    ),
    displayStatus = (task) => displayStatuses[task.id] ?? task.status,
    rowNodesRef = React.useRef(new Map()),
    previousTopsRef = React.useRef(null),
    latestTasksRef = React.useRef(effectiveTasks);
  ((latestTasksRef.current = effectiveTasks),
    React.useEffect(() => {
      let e = effectiveTasks.some(
          (e) => displayStatuses[e.id] !== void 0 && displayStatuses[e.id] !== e.status,
        ),
        t = effectiveTasks.filter((e) => displayStatuses[e.id] === void 0);
      if (
        (t.length &&
          setDisplayStatuses((e) => ({
            ...e,
            ...Object.fromEntries(t.map((e) => [e.id, e.status])),
          })),
        !e)
      )
        return;
      let n = window.setTimeout(
        () => {
          let e = new Map();
          (rowNodesRef.current.forEach((t, n) => e.set(n, t.getBoundingClientRect().top)),
            (previousTopsRef.current = e),
            setDisplayStatuses(
              Object.fromEntries(latestTasksRef.current.map((e) => [e.id, e.status])),
            ));
        },
        prefersReducedMotion() ? 0 : 950,
      );
      return () => window.clearTimeout(n);
    }, [statusSignature]));
  let sortedTasks = effectiveTasks
      .map((e, t) => ({
        t: e,
        i: t,
      }))
      .sort(
        (e, t) => statusOrder[displayStatus(e.t)] - statusOrder[displayStatus(t.t)] || e.i - t.i,
      )
      .map(({ t: e }) => e),
    orderSignature = sortedTasks.map((e) => e.id).join(`|`);
  React.useLayoutEffect(() => {
    let e = previousTopsRef.current;
    if (((previousTopsRef.current = null), !e || prefersReducedMotion())) return;
    let t = null,
      n = 0;
    rowNodesRef.current.forEach((r, i) => {
      let a = e.get(i);
      if (a === void 0) return;
      let o = a - r.getBoundingClientRect().top;
      Math.abs(o) < 1 ||
        (r.animate(
          [
            {
              transform: `translateY(${o}px)`,
            },
            {
              transform: `none`,
            },
          ],
          {
            duration: 560,
            easing: motionEase,
          },
        ),
        Math.abs(o) > n && ((n = Math.abs(o)), (t = r)));
    });
    let r = t;
    r && ((r.style.zIndex = `1`), window.setTimeout(() => (r.style.zIndex = ``), 600));
  }, [orderSignature]);
  let knownIdsRef = React.useRef(null);
  knownIdsRef.current ||= new Set(tasks.map((e) => e.id));
  let [enteringTasks, setEnteringTasks] = React.useState({}),
    newTaskIds = effectiveTasks.filter((e) => !knownIdsRef.current.has(e.id)).map((e) => e.id);
  React.useLayoutEffect(() => {
    if (
      !newTaskIds.length ||
      (newTaskIds.forEach((e) => knownIdsRef.current.add(e)), prefersReducedMotion())
    )
      return;
    setEnteringTasks((e) => ({
      ...e,
      ...Object.fromEntries(newTaskIds.map((e) => [e, true])),
    }));
    let e = requestAnimationFrame(() => {
      e = requestAnimationFrame(() => setEnteringTasks({}));
    });
    return () => cancelAnimationFrame(e);
  }, [newTaskIds.join(`|`)]);
  let countFilter = (filter) =>
      effectiveTasks.filter((t) => matchesFilter(filter, t.status)).length,
    waitingCount = effectiveTasks.filter((e) => e.status === `waiting`).length,
    failedCount = effectiveTasks.filter((e) => e.status === `failed`).length,
    runningCount = countFilter(`running`),
    needsYouCount = waitingCount + failedCount,
    updateLocalTask = (task, status, label, resetClock = false) =>
      setLocalOverrides((i) => ({
        ...i,
        [task.id]: {
          status: status,
          startedAt: resetClock ? Date.now() : i[task.id]?.startedAt,
          steps: [
            ...(i[task.id]?.steps ?? []),
            {
              label: label,
              time: `now`,
            },
          ],
        },
      })),
    approveTask = (task) =>
      onApprove ? onApprove(task) : updateLocalTask(task, `running`, `Approved – continuing`),
    rejectTask = (task) =>
      onReject ? onReject(task) : updateLocalTask(task, `failed`, `Rejected by you`),
    retryTask = (task) =>
      onRetry ? onRetry(task) : updateLocalTask(task, `running`, `Retrying`, true),
    [announcement, setAnnouncement] = React.useState(``),
    previousStatusesRef = React.useRef({});
  React.useEffect(() => {
    let e = effectiveTasks.filter(
      (e) => previousStatusesRef.current[e.id] && previousStatusesRef.current[e.id] !== e.status,
    );
    (e.length &&
      setAnnouncement(
        e.map((e) => `${e.title}: ${statusLabels[e.status].toLowerCase()}`).join(`. `),
      ),
      (previousStatusesRef.current = Object.fromEntries(
        effectiveTasks.map((e) => [e.id, e.status]),
      )));
  }, [statusSignature]);
  let changeFilter = (filter) => {
      (setInternalFilter(filter), onFilterChange?.(filter));
    },
    tabsRef = React.useRef(null),
    [thumb, setThumb] = React.useState(null);
  React.useLayoutEffect(() => {
    let e = tabsRef.current;
    if (!e) return;
    let t = () => {
      let t = e.querySelector(`[data-filter="${activeFilter}"]`);
      t &&
        setThumb({
          x: t.offsetLeft,
          w: t.offsetWidth,
        });
    };
    t();
    let n = new ResizeObserver(t);
    return (e.querySelectorAll(`button`).forEach((e) => n.observe(e)), () => n.disconnect());
  }, [activeFilter]);
  let handleFilterKeyDown = (event) => {
      let currentIndex = inboxFilters.findIndex((e) => e.id === activeFilter),
        nextIndex =
          event.key === `ArrowRight` || event.key === `ArrowDown`
            ? (currentIndex + 1) % inboxFilters.length
            : event.key === `ArrowLeft` || event.key === `ArrowUp`
              ? (currentIndex - 1 + inboxFilters.length) % inboxFilters.length
              : event.key === `Home`
                ? 0
                : event.key === `End`
                  ? inboxFilters.length - 1
                  : -1;
      nextIndex < 0 ||
        (event.preventDefault(),
        changeFilter(inboxFilters[nextIndex].id),
        tabsRef.current?.querySelector(`[data-filter="${inboxFilters[nextIndex].id}"]`)?.focus());
    },
    handleEscape = (event) => {
      if (event.key !== `Escape` || !expandedTaskId) return;
      event.stopPropagation();
      let taskId = expandedTaskId;
      (setExpandedTaskId(null),
        rowNodesRef.current.get(taskId)?.querySelector(`.ui-ai__head`)?.focus({
          preventScroll: true,
        }));
    },
    hoveredTask =
      hoverTarget && `task` in hoverTarget
        ? effectiveTasks.find((e) => e.id === hoverTarget.task)
        : void 0,
    hoveredFilter = hoverTarget && `filter` in hoverTarget ? hoverTarget.filter : null,
    latestStepLabel = (task) => task.steps?.[task.steps.length - 1]?.label,
    caption,
    captionKey;
  if (hoveredTask) {
    let e = latestStepLabel(hoveredTask),
      t = elapsedLabel(hoveredTask);
    ((caption =
      hoveredTask.status === `waiting` ? (
        <>
          <b>{`Asks`}</b>
          {` · `}
          {e ?? `Waiting for your answer`}
        </>
      ) : hoveredTask.status === `running` ? (
        <>
          <b>{`Now`}</b>
          {` · `}
          {e ?? `Working`}
        </>
      ) : hoveredTask.status === `failed` ? (
        <>
          <b>{`Failed`}</b>
          {` · `}
          {e ?? `Stopped with an error`}
        </>
      ) : (
        <>
          {`Finished`}
          {t ? (
            <>
              {` in `}
              <b>{t}</b>
            </>
          ) : (
            ``
          )}
        </>
      )),
      (captionKey = `task-${hoveredTask.id}-${hoveredTask.status}`));
  } else if (hoveredFilter) {
    let e = countFilter(hoveredFilter);
    ((caption =
      hoveredFilter === `needs-you`
        ? needsYouCount
          ? `${waitingCount} waiting for approval · ${failedCount} failed`
          : `Nothing needs you`
        : hoveredFilter === `running`
          ? `${e} ${e === 1 ? `agent` : `agents`} working`
          : hoveredFilter === `done`
            ? `${e} finished`
            : `${e} ${e === 1 ? `task` : `tasks`}`),
      (captionKey = `filter-${hoveredFilter}`));
  } else {
    let e = (e, t) => (
      <span
        className={`ui-ai__part`}
        onPointerEnter={(t) =>
          t.pointerType === `mouse` &&
          setHoverTarget({
            filter: e,
          })
        }
      >
        {t}
      </span>
    );
    ((caption =
      needsYouCount || runningCount ? (
        <>
          {needsYouCount > 0 &&
            e(`needs-you`, `${needsYouCount} ${needsYouCount === 1 ? `needs` : `need`} you`)}
          {needsYouCount > 0 && runningCount > 0 && ` · `}
          {runningCount > 0 && e(`running`, `${runningCount} running`)}
        </>
      ) : effectiveTasks.length ? (
        `All done`
      ) : (
        `No tasks yet`
      )),
      (captionKey = `rest`));
  }
  let visibleTasks = sortedTasks.filter((e) => matchesFilter(activeFilter, displayStatus(e))),
    emptyLabel =
      activeFilter === `needs-you`
        ? `Nothing needs you`
        : activeFilter === `running`
          ? `No agent is running`
          : activeFilter === `done`
            ? `Nothing finished yet`
            : `No tasks yet`;
  return (
    <div
      ref={rootRef}
      className={[`ui-ai`, className].filter(Boolean).join(` `)}
      role={`group`}
      aria-label={`Agent tasks`}
      onPointerLeave={() => setHoverTarget(null)}
      onKeyDown={handleEscape}
    >
      <style href={`ui-agent-inbox`} precedence={`default`}>
        {agentInboxStyles}
      </style>
      <div className={`ui-ai__card`}>
        <div
          ref={tabsRef}
          className={`ui-ai__tabs`}
          role={`radiogroup`}
          aria-label={`Show`}
          onKeyDown={handleFilterKeyDown}
          onPointerLeave={() => setHoverTarget(null)}
        >
          <span
            className={`ui-ai__thumb`}
            aria-hidden={`true`}
            data-ready={thumb ? `` : void 0}
            style={
              thumb
                ? {
                    transform: `translateX(${thumb.x}px)`,
                    width: thumb.w,
                  }
                : void 0
            }
          />
          {inboxFilters.map((e) => (
            <button
              type={`button`}
              role={`radio`}
              aria-checked={activeFilter === e.id}
              tabIndex={activeFilter === e.id ? 0 : -1}
              className={`ui-ai__tab`}
              data-filter={e.id}
              data-active={activeFilter === e.id ? `` : void 0}
              onClick={() => changeFilter(e.id)}
              onPointerEnter={(t) =>
                t.pointerType === `mouse` &&
                setHoverTarget({
                  filter: e.id,
                })
              }
              key={e.id}
            >
              <span className={`ui-ai__tab-label`} data-text={e.label}>
                {e.label}
              </span>
              <span className={`ui-ai__count`} data-zero={countFilter(e.id) === 0 ? `` : void 0}>
                <RollingCount value={countFilter(e.id)} />
              </span>
            </button>
          ))}
        </div>
        <ul className={`ui-ai__list`} onPointerLeave={() => setHoverTarget(null)}>
          {sortedTasks.map((e) => {
            let t = matchesFilter(activeFilter, displayStatus(e)) && !enteringTasks[e.id],
              n = expandedTaskId === e.id && t,
              i = elapsedLabel(e),
              o = (e.steps ?? []).slice(-4),
              l = (e.steps?.length ?? 0) - o.length,
              u =
                (hoveredFilter && !matchesFilter(hoveredFilter, e.status)) ||
                (hoveredTask && hoveredTask.id !== e.id);
            return (
              <li
                ref={(t) => {
                  t ? rowNodesRef.current.set(e.id, t) : rowNodesRef.current.delete(e.id);
                }}
                className={`ui-ai__item`}
                aria-hidden={!t || void 0}
                key={e.id}
              >
                <div className={`ui-ai__fold`} data-open={t ? `` : void 0} inert={!t}>
                  <div className={`ui-ai__clip`}>
                    <div
                      className={`ui-ai__row`}
                      data-status={e.status}
                      data-open={n ? `` : void 0}
                      data-hot={hoveredTask?.id === e.id ? `` : void 0}
                      data-dim={u && !n ? `` : void 0}
                      onPointerEnter={(t) =>
                        t.pointerType === `mouse` &&
                        setHoverTarget({
                          task: e.id,
                        })
                      }
                    >
                      <button
                        type={`button`}
                        className={`ui-ai__head`}
                        aria-expanded={n}
                        aria-controls={`${instanceId}-${e.id}`}
                        onClick={() => setExpandedTaskId(n ? null : e.id)}
                        onFocus={() =>
                          setHoverTarget({
                            task: e.id,
                          })
                        }
                        onBlur={() => setHoverTarget(null)}
                      >
                        <StatusSwap id={e.status} className={`ui-ai__glyph-box`}>
                          <StatusGlyph status={e.status} />
                        </StatusSwap>
                        <span className={`ui-ai__text`}>
                          <span className={`ui-ai__title`}>{e.title}</span>
                          <span className={`ui-ai__meta`}>
                            <span className={`ui-ai__agent`}>{e.agent}</span>
                            {i && (
                              <>
                                <span aria-hidden={`true`}>{`·`}</span>
                                <span
                                  className={`ui-ai__time`}
                                  data-live={isLiveStatus(e.status) ? `` : void 0}
                                >
                                  {i}
                                </span>
                              </>
                            )}
                          </span>
                        </span>
                        <span className={`ui-ai__tag`} data-status={e.status}>
                          {Object.keys(statusLabels).map((e) => (
                            <span className={`ui-ai__tag-size`} aria-hidden={`true`} key={e}>
                              {statusLabels[e]}
                            </span>
                          ))}
                          <StatusSwap id={e.status}>{statusLabels[e.status]}</StatusSwap>
                        </span>
                      </button>
                      <div
                        id={`${instanceId}-${e.id}`}
                        className={`ui-ai__fold ui-ai__fold--panel`}
                        data-open={n ? `` : void 0}
                        inert={!n}
                      >
                        <div className={`ui-ai__clip`}>
                          <div className={`ui-ai__panel`}>
                            {o.length > 0 && (
                              <ol className={`ui-ai__steps`} aria-label={`Latest steps`}>
                                {o.map((t, n) => {
                                  let i = n === o.length - 1;
                                  return (
                                    <li
                                      className={`ui-ai__step`}
                                      data-last={i ? `` : void 0}
                                      data-status={i ? e.status : void 0}
                                      key={l + n}
                                    >
                                      <span className={`ui-ai__dot`} />
                                      <span className={`ui-ai__step-label`}>{t.label}</span>
                                      {t.time && (
                                        <span className={`ui-ai__step-time`}>{t.time}</span>
                                      )}
                                    </li>
                                  );
                                })}
                              </ol>
                            )}
                            <div className={`ui-ai__actions`}>
                              <StatusSwap id={`${e.status}`} className={`ui-ai__actions-swap`}>
                                <span className={`ui-ai__buttons`}>
                                  {e.status === `waiting` && (
                                    <>
                                      <button
                                        type={`button`}
                                        className={`ui-ai__btn`}
                                        data-kind={`primary`}
                                        onClick={() => approveTask(e)}
                                      >{`Approve`}</button>
                                      <button
                                        type={`button`}
                                        className={`ui-ai__btn`}
                                        onClick={() => rejectTask(e)}
                                      >{`Reject`}</button>
                                    </>
                                  )}
                                  {e.status === `failed` && (
                                    <button
                                      type={`button`}
                                      className={`ui-ai__btn`}
                                      data-kind={`primary`}
                                      onClick={() => retryTask(e)}
                                    >
                                      <RetryIcon />
                                      {`Retry`}
                                    </button>
                                  )}
                                  {(e.status === `done` || e.status === `running`) && onOpen && (
                                    <button
                                      type={`button`}
                                      className={`ui-ai__btn`}
                                      onClick={() => onOpen(e)}
                                    >
                                      {`Open`}
                                      <OpenIcon />
                                    </button>
                                  )}
                                  {e.status === `running` && !onOpen && (
                                    <span className={`ui-ai__note`}>{`Working on it…`}</span>
                                  )}
                                  {e.status === `done` && !onOpen && (
                                    <span className={`ui-ai__note`}>{`Finished`}</span>
                                  )}
                                </span>
                              </StatusSwap>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        <div
          className={`ui-ai__fold`}
          data-open={visibleTasks.length === 0 ? `` : void 0}
          aria-hidden={visibleTasks.length ? true : void 0}
        >
          <div className={`ui-ai__clip`}>
            <div className={`ui-ai__empty`}>
              <StatusSwap id={activeFilter}>{emptyLabel}</StatusSwap>
            </div>
          </div>
        </div>
      </div>
      <div className={`ui-ai__foot`}>
        <span className={`ui-ai__caption`}>
          <StatusSwap id={captionKey}>{caption}</StatusSwap>
        </span>
        {action && (
          <button type={`button`} className={`ui-ai__action`} onClick={action.onClick}>
            <PlusIcon />
            {action.label}
          </button>
        )}
      </div>
      <span className={`ui-ai__sr`} aria-live={`polite`}>
        {announcement}
      </span>
    </div>
  );
}
var agentInboxStyles = `
.ui-ai {
  --ui-ai-tray: #f0f0f0;
  --ui-ai-card: #ffffff;
  --ui-ai-line: #ececec;
  --ui-ai-ink: #171717;
  --ui-ai-text: #404040;
  --ui-ai-muted: #8f8f8f;
  --ui-ai-well: #f4f4f5;
  --ui-ai-soft: #fafafa;
  --ui-ai-thread: #e4e4e7;
  --ui-ai-blue: #2f6bff;
  --ui-ai-blue-text: #1f55d6;
  --ui-ai-blue-bg: rgba(47, 107, 255, 0.09);
  --ui-ai-green: #18794e;
  --ui-ai-green-bg: rgba(34, 160, 90, 0.11);
  --ui-ai-red: #b42318;
  --ui-ai-red-bg: rgba(229, 72, 77, 0.1);
  --ui-ai-amber: #96590a;
  --ui-ai-amber-dot: #e8930c;
  --ui-ai-amber-bg: rgba(240, 160, 32, 0.14);
  --ui-ai-thumb-shadow: 0 0 0 1px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.08);
  --ui-ai-focus: rgba(23, 23, 23, 0.22);
  --ui-ai-ease: ${motionEase};
  box-sizing: border-box;
  width: 100%;
  max-width: 400px;
  min-width: 0;
  container-type: inline-size;
  padding: 4px;
  border-radius: 20px;
  background: var(--ui-ai-tray);
  font-family: "Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  font-size: 13px;
  line-height: 20px;
  color: var(--ui-ai-text);
  text-align: left;
  -webkit-font-smoothing: antialiased;
}
.ui-ai *, .ui-ai *::before, .ui-ai *::after { box-sizing: border-box; }
:where(.ui-ai) button { margin: 0; padding: 0; border: 0; background: none; font: inherit; color: inherit; text-align: inherit; cursor: pointer; -webkit-tap-highlight-color: transparent; }
.ui-ai button:focus-visible { outline: 2px solid var(--ui-ai-focus); outline-offset: 2px; }
.ui-ai svg { display: block; flex: none; }
.ui-ai b { font-weight: 500; color: var(--ui-ai-ink); }
.ui-ai ul, .ui-ai ol { margin: 0; padding: 0; list-style: none; }
.ui-ai__sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }

.ui-ai__card { position: relative; padding: 8px; border-radius: 16px; background: var(--ui-ai-card); box-shadow: 0 0 0 1px var(--ui-ai-line), 0 1px 2px rgba(0, 0, 0, 0.04); }

/* ----- Filter tabs: a well with a white thumb that slides to the picked one ----- */
.ui-ai__tabs { position: relative; display: flex; gap: 2px; padding: 3px; border-radius: 11px; background: var(--ui-ai-well); }
.ui-ai__thumb { position: absolute; top: 3px; bottom: 3px; left: 0; border-radius: 8px; background: var(--ui-ai-card); box-shadow: var(--ui-ai-thumb-shadow); opacity: 0; pointer-events: none; }
.ui-ai__thumb[data-ready] { opacity: 1; transition: transform 380ms var(--ui-ai-ease), width 380ms var(--ui-ai-ease), opacity 160ms ease; }
.ui-ai__tab { position: relative; z-index: 1; display: flex; flex: 1 0 auto; align-items: center; justify-content: center; gap: 6px; height: 28px; padding: 0 9px; border-radius: 8px; font-size: 12.5px; font-weight: 500; color: var(--ui-ai-muted); white-space: nowrap; transition: color 200ms ease; }
.ui-ai__tab:hover, .ui-ai__tab[data-active] { color: var(--ui-ai-ink); }
.ui-ai__tab:focus-visible { outline-offset: 0; }
/* The semibold width is reserved, so picking a tab never nudges the others */
.ui-ai__tab-label { display: inline-grid; }
.ui-ai__tab-label::after { content: attr(data-text); height: 0; overflow: hidden; font-weight: 600; visibility: hidden; }
.ui-ai__tab[data-active] .ui-ai__tab-label { font-weight: 600; }
.ui-ai__count { display: inline-grid; min-width: 18px; height: 18px; padding: 0 5px; border-radius: 6px; background: rgba(0, 0, 0, 0.05); font-size: 11px; font-weight: 600; line-height: 18px; text-align: center; color: var(--ui-ai-text); font-variant-numeric: tabular-nums; transition: background-color 200ms ease, color 200ms ease, opacity 200ms ease; }
.ui-ai__tab[data-active] .ui-ai__count { background: var(--ui-ai-well); color: var(--ui-ai-ink); }
.ui-ai__count[data-zero] { opacity: 0.55; }
.ui-ai__roll { display: inline-grid; overflow: hidden; }
.ui-ai__roll > span { grid-area: 1 / 1; animation: ui-ai-roll-in 340ms var(--ui-ai-ease) both; }
.ui-ai__roll > span[data-out] { animation: ui-ai-roll-out 300ms var(--ui-ai-ease) both; }
.ui-ai__roll[data-dir="down"] > span { animation-name: ui-ai-roll-in-down; }
.ui-ai__roll[data-dir="down"] > span[data-out] { animation-name: ui-ai-roll-out-down; }

/* ----- Rows ----- */
.ui-ai__list { margin-top: 6px !important; }
.ui-ai__item { position: relative; }
/* Everything that comes and goes does it the same quiet way: it unfolds and fades, nothing flies */
.ui-ai__fold { display: grid; grid-template-rows: 0fr; opacity: 0; transition: grid-template-rows 440ms var(--ui-ai-ease), opacity 220ms ease; }
.ui-ai__fold[data-open] { grid-template-rows: 1fr; opacity: 1; transition: grid-template-rows 440ms var(--ui-ai-ease), opacity 320ms ease 80ms; }
.ui-ai__clip { min-height: 0; overflow: hidden; }
.ui-ai__row { margin-bottom: 2px; border-radius: 12px; transition: background-color 180ms ease, opacity 220ms ease; }
.ui-ai__row[data-hot], .ui-ai__row[data-open] { background: var(--ui-ai-well); }
.ui-ai__row[data-dim] { opacity: 0.45; }
.ui-ai__head { display: flex; align-items: center; gap: 10px; width: 100%; min-height: 50px; padding: 7px 10px; border-radius: 12px; }
.ui-ai__head:focus-visible { outline-offset: -2px; }
.ui-ai__text { display: grid; flex: 1; min-width: 0; }
.ui-ai__title { overflow: hidden; font-weight: 500; color: var(--ui-ai-ink); white-space: nowrap; text-overflow: ellipsis; }
.ui-ai__meta { display: flex; gap: 5px; min-width: 0; overflow: hidden; font-size: 12px; line-height: 16px; color: var(--ui-ai-muted); white-space: nowrap; }
.ui-ai__agent { min-width: 0; overflow: hidden; text-overflow: ellipsis; }
.ui-ai__time { flex: none; font-variant-numeric: tabular-nums; }

/* Status glyph – each one crossfades into the next */
.ui-ai__glyph-box { flex: none; width: 16px; height: 16px; }
.ui-ai__glyph-box > .ui-ai__swap-item { animation-name: ui-ai-pop-in; }
.ui-ai__glyph-box > .ui-ai__swap-item[data-out] { animation-name: ui-ai-pop-out; }
.ui-ai__glyph { display: grid; place-items: center; width: 16px; height: 16px; border-radius: 50%; }
.ui-ai__glyph[data-status="done"] { background: var(--ui-ai-green-bg); color: var(--ui-ai-green); }
.ui-ai__glyph[data-status="failed"] { background: var(--ui-ai-red-bg); color: var(--ui-ai-red); }
.ui-ai__glyph[data-status="waiting"] { background: var(--ui-ai-amber-bg); }
.ui-ai__spin { width: 14px; height: 14px; border: 1.6px solid var(--ui-ai-blue-bg); border-top-color: var(--ui-ai-blue); border-radius: 50%; animation: ui-ai-spin 800ms linear infinite; }
.ui-ai__wait { width: 6px; height: 6px; border-radius: 50%; background: var(--ui-ai-amber-dot); animation: ui-ai-pulse 2000ms ease-in-out infinite; }

/* Status tag: colored text on a light fill of the same color; all tags are as wide as the longest */
.ui-ai__tag { display: inline-grid; flex: none; justify-items: center; height: 20px; padding: 0 7px; border-radius: 5px; background: var(--ui-ai-tag-bg); font-size: 12px; font-weight: 500; line-height: 20px; color: var(--ui-ai-tag); white-space: nowrap; transition: background-color 300ms ease, color 300ms ease; }
.ui-ai__tag > * { grid-area: 1 / 1; }
.ui-ai__tag-size { visibility: hidden; }
.ui-ai__tag[data-status="waiting"] { --ui-ai-tag: var(--ui-ai-amber); --ui-ai-tag-bg: var(--ui-ai-amber-bg); }
.ui-ai__tag[data-status="running"] { --ui-ai-tag: var(--ui-ai-blue-text); --ui-ai-tag-bg: var(--ui-ai-blue-bg); }
.ui-ai__tag[data-status="done"] { --ui-ai-tag: var(--ui-ai-green); --ui-ai-tag-bg: var(--ui-ai-green-bg); }
.ui-ai__tag[data-status="failed"] { --ui-ai-tag: var(--ui-ai-red); --ui-ai-tag-bg: var(--ui-ai-red-bg); }

/* ----- The open row: the last steps as a tiny timeline, then what you can do ----- */
.ui-ai__panel { padding: 0 10px 10px; }
.ui-ai__steps { padding-bottom: 6px !important; }
.ui-ai__step { position: relative; display: flex; align-items: center; gap: 10px; height: 24px; font-size: 12.5px; animation: ui-ai-step-in 360ms var(--ui-ai-ease) both; }
.ui-ai__step:not(:last-child)::before { content: ""; position: absolute; top: 16px; left: 7.5px; width: 1px; height: 16px; background: var(--ui-ai-thread); }
.ui-ai__dot { display: grid; flex: none; place-items: center; width: 16px; height: 16px; }
.ui-ai__dot::before { content: ""; width: 5px; height: 5px; border-radius: 50%; background: var(--ui-ai-dot, #c4c4ca); transition: background-color 300ms ease, box-shadow 300ms ease; }
.ui-ai__step[data-status="running"] { --ui-ai-dot: var(--ui-ai-blue); }
.ui-ai__step[data-status="waiting"] { --ui-ai-dot: var(--ui-ai-amber-dot); }
.ui-ai__step[data-status="done"] { --ui-ai-dot: var(--ui-ai-green); }
.ui-ai__step[data-status="failed"] { --ui-ai-dot: var(--ui-ai-red); }
.ui-ai__step[data-last] .ui-ai__dot::before { width: 7px; height: 7px; box-shadow: 0 0 0 3px color-mix(in srgb, var(--ui-ai-dot, #c4c4ca) 18%, transparent); }
.ui-ai__step-label { flex: 1; min-width: 0; overflow: hidden; color: var(--ui-ai-muted); white-space: nowrap; text-overflow: ellipsis; }
.ui-ai__step[data-last] .ui-ai__step-label { color: var(--ui-ai-ink); }
.ui-ai__step-time { flex: none; font-size: 12px; color: var(--ui-ai-muted); font-variant-numeric: tabular-nums; }
.ui-ai__actions { padding-left: 26px; }
.ui-ai__actions-swap { display: grid; }
.ui-ai__buttons { display: flex; flex-wrap: wrap; align-items: center; gap: 6px; min-height: 28px; }
.ui-ai__btn { display: inline-flex; align-items: center; gap: 5px; height: 28px; padding: 0 11px; border-radius: 8px; background: var(--ui-ai-card); box-shadow: 0 0 0 1px var(--ui-ai-line), 0 1px 1px rgba(0, 0, 0, 0.03); font-size: 12.5px; font-weight: 500; color: var(--ui-ai-ink); white-space: nowrap; transition: background-color 160ms ease, box-shadow 160ms ease, transform 160ms var(--ui-ai-ease); }
.ui-ai__btn:hover { box-shadow: 0 0 0 1px #dcdce0, 0 1px 2px rgba(0, 0, 0, 0.06); }
.ui-ai__btn:active { transform: scale(0.97); }
.ui-ai__btn[data-kind="primary"] { background: var(--ui-ai-ink); box-shadow: none; color: var(--ui-ai-card); }
.ui-ai__btn[data-kind="primary"]:hover { background: #2a2a2a; }
.ui-ai__btn svg { margin: 0 -1px; }
.ui-ai__note { font-size: 12.5px; color: var(--ui-ai-muted); }

.ui-ai__empty { display: grid; place-items: center; height: 72px; font-size: 12.5px; color: var(--ui-ai-muted); }

/* ----- Tray ----- */
.ui-ai__foot { display: flex; align-items: center; gap: 8px; min-height: 38px; padding: 4px 4px 0 10px; }
.ui-ai__caption { flex: 1; min-width: 0; overflow: hidden; font-size: 12.5px; color: var(--ui-ai-muted); white-space: nowrap; text-overflow: ellipsis; }
.ui-ai__part { border-radius: 4px; transition: color 160ms ease; }
.ui-ai__part:hover { color: var(--ui-ai-ink); }
.ui-ai__swap { display: grid; min-width: 0; }
.ui-ai__swap-item { grid-area: 1 / 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; animation: ui-ai-swap-in 320ms ease both; }
.ui-ai__swap-item[data-out] { animation: ui-ai-swap-out 220ms ease both; pointer-events: none; }
.ui-ai__action { display: inline-flex; flex: none; align-items: center; gap: 5px; height: 26px; padding: 0 8px 0 7px; border-radius: 10px; font-size: 12.5px; font-weight: 500; color: var(--ui-ai-text); white-space: nowrap; transition: background-color 160ms ease, color 160ms ease; }
.ui-ai__action:hover { background: var(--ui-ai-card); color: var(--ui-ai-ink); }

@keyframes ui-ai-swap-in { from { opacity: 0; filter: blur(2px); } }
@keyframes ui-ai-swap-out { from { opacity: 1; } to { opacity: 0; filter: blur(2px); } }
@keyframes ui-ai-pop-in { from { opacity: 0; transform: scale(0.6); } }
@keyframes ui-ai-pop-out { to { opacity: 0; transform: scale(0.6); } }
@keyframes ui-ai-roll-in { from { opacity: 0; transform: translateY(70%); } }
@keyframes ui-ai-roll-out { to { opacity: 0; transform: translateY(-70%); } }
@keyframes ui-ai-roll-in-down { from { opacity: 0; transform: translateY(-70%); } }
@keyframes ui-ai-roll-out-down { to { opacity: 0; transform: translateY(70%); } }
@keyframes ui-ai-step-in { from { opacity: 0; transform: translateY(4px); } }
@keyframes ui-ai-spin { to { transform: rotate(360deg); } }
@keyframes ui-ai-pulse { 0%, 100% { box-shadow: 0 0 0 0 rgba(232, 147, 12, 0.35); } 50% { box-shadow: 0 0 0 3px rgba(232, 147, 12, 0); } }

/* Narrow cards: the tabs tighten and the count of "All" gives way, the tags shrink a little */
@container (max-width: 380px) {
  .ui-ai__tabs { gap: 0; }
  .ui-ai__tab { gap: 5px; padding: 0 7px; font-size: 12px; }
  .ui-ai__count { min-width: 16px; padding: 0 4px; font-size: 10.5px; }
}
@container (max-width: 330px) {
  .ui-ai__tab[data-filter="all"] .ui-ai__count { display: none; }
  .ui-ai__tab { padding: 0 6px; }
  .ui-ai__card { padding: 6px; }
  .ui-ai__head { gap: 9px; padding: 7px 8px; }
  .ui-ai__panel { padding: 0 8px 10px; }
  .ui-ai__tag { padding: 0 6px; font-size: 11.5px; }
}
/* Phones: titles may take two lines and each tag is only as wide as its own word, so little gets cut */
@container (max-width: 360px) {
  .ui-ai__tag-size { display: none; }
  .ui-ai__title { display: -webkit-box; white-space: normal; -webkit-line-clamp: 2; -webkit-box-orient: vertical; }
}

@media (pointer: coarse) {
  .ui-ai__tab { height: 34px; }
  .ui-ai__head { min-height: 56px; }
  .ui-ai__btn { height: 34px; padding: 0 14px; }
  .ui-ai__action { height: 32px; }
}

@media (prefers-reduced-motion: reduce) {
  .ui-ai *, .ui-ai *::before, .ui-ai *::after { animation: none !important; transition: none !important; }
  .ui-ai__spin { border-color: var(--ui-ai-blue); border-right-color: var(--ui-ai-blue-bg); }
}

/* Dark mode: follows a .dark class or data-theme="dark" on any ancestor, e.g. <html> */
:where(.dark, [data-theme="dark"]) .ui-ai {
  --ui-ai-tray: #111113;
  --ui-ai-card: #19191b;
  --ui-ai-line: #2a2a2e;
  --ui-ai-ink: #ededed;
  --ui-ai-text: #c8c8cc;
  --ui-ai-muted: #8b8b92;
  --ui-ai-well: #222225;
  --ui-ai-thread: #34343a;
  --ui-ai-blue: #6f9bff;
  --ui-ai-blue-text: #9bb8ff;
  --ui-ai-blue-bg: rgba(79, 130, 255, 0.16);
  --ui-ai-green: #6ee7a8;
  --ui-ai-green-bg: rgba(52, 199, 120, 0.14);
  --ui-ai-red: #ff9b93;
  --ui-ai-red-bg: rgba(255, 99, 99, 0.14);
  --ui-ai-amber: #f5c264;
  --ui-ai-amber-dot: #f0a83a;
  --ui-ai-amber-bg: rgba(240, 160, 32, 0.16);
  --ui-ai-thumb-shadow: 0 0 0 1px rgba(255, 255, 255, 0.06), 0 1px 2px rgba(0, 0, 0, 0.4);
  --ui-ai-focus: rgba(255, 255, 255, 0.3);
}
:where(.dark, [data-theme="dark"]) .ui-ai__tabs { background: #111113; }
:where(.dark, [data-theme="dark"]) .ui-ai__thumb { background: #2a2a2e; }
:where(.dark, [data-theme="dark"]) .ui-ai__count { background: rgba(255, 255, 255, 0.07); }
:where(.dark, [data-theme="dark"]) .ui-ai__tab[data-active] .ui-ai__count { background: rgba(255, 255, 255, 0.1); }
:where(.dark, [data-theme="dark"]) .ui-ai__btn:hover { box-shadow: 0 0 0 1px #3a3a40; }
:where(.dark, [data-theme="dark"]) .ui-ai__btn[data-kind="primary"] { color: #111113; }
:where(.dark, [data-theme="dark"]) .ui-ai__btn[data-kind="primary"]:hover { background: #ffffff; }
:where(.dark, [data-theme="dark"]) .ui-ai__dot::before { background: var(--ui-ai-dot, #55555c); }
`;
var minuteMs = 6e4;
var makeDemoTasks = () => {
  let e = Date.now();
  return [
    {
      id: `migrate`,
      title: `Migrate users table to Postgres 17`,
      agent: `Opus 5.5`,
      status: `waiting`,
      startedAt: e - 6 * minuteMs - 12e3,
      steps: [
        {
          label: `Read schema and 14 migrations`,
          time: `6m ago`,
        },
        {
          label: `Wrote migration 0042_split_users`,
          time: `4m ago`,
        },
        {
          label: `Dry run on staging – no errors`,
          time: `2m ago`,
        },
        {
          label: `Wants to run it on production`,
          time: `1m ago`,
        },
      ],
    },
    {
      id: `review`,
      title: `Review PR #482 – billing webhooks`,
      agent: `Sonnet 5.5`,
      status: `running`,
      startedAt: e - 3 * minuteMs - 4e4,
      steps: [
        {
          label: `Checked out feature/billing-hooks`,
          time: `3m ago`,
        },
        {
          label: `Read 12 changed files`,
          time: `2m ago`,
        },
        {
          label: `Ran the test suite – 214 passed`,
          time: `1m ago`,
        },
        {
          label: `Writing review comments`,
          time: `now`,
        },
      ],
    },
    {
      id: `crm`,
      title: `Clean up duplicate CRM contacts`,
      agent: `Haiku 5.5`,
      status: `failed`,
      elapsed: 161e3,
      steps: [
        {
          label: `Loaded 18,240 contacts`,
          time: `9m ago`,
        },
        {
          label: `Matched 1,312 likely duplicates`,
          time: `8m ago`,
        },
        {
          label: `Merge stopped – API rate limit (429)`,
          time: `7m ago`,
        },
      ],
    },
    {
      id: `notes`,
      title: `Write release notes for v2.4`,
      agent: `Sonnet 5.5`,
      status: `running`,
      startedAt: e - 1 * minuteMs - 18e3,
      steps: [
        {
          label: `Collected 23 merged pull requests`,
          time: `1m ago`,
        },
        {
          label: `Grouped them into features and fixes`,
          time: `40s ago`,
        },
        {
          label: `Drafting the highlights`,
          time: `now`,
        },
      ],
    },
    {
      id: `translate`,
      title: `Translate onboarding emails to German`,
      agent: `Haiku 5.5`,
      status: `running`,
      startedAt: e - 52e3,
      steps: [
        {
          label: `Found 6 email templates`,
          time: `50s ago`,
        },
        {
          label: `Translated 4 of 6`,
          time: `now`,
        },
      ],
    },
    {
      id: `digest`,
      title: `Weekly metrics digest`,
      agent: `Haiku 5.5`,
      status: `done`,
      elapsed: 252e3,
      steps: [
        {
          label: `Pulled numbers from 3 dashboards`,
          time: `22m ago`,
        },
        {
          label: `Wrote the summary`,
          time: `19m ago`,
        },
        {
          label: `Posted to #metrics`,
          time: `18m ago`,
        },
      ],
    },
    {
      id: `react`,
      title: `Upgrade React to 19.2`,
      agent: `Opus 5.5`,
      status: `done`,
      elapsed: 663e3,
      steps: [
        {
          label: `Bumped 4 packages`,
          time: `1h ago`,
        },
        {
          label: `Fixed 2 type errors`,
          time: `58m ago`,
        },
        {
          label: `All checks green`,
          time: `52m ago`,
        },
      ],
    },
  ];
};
var makeNewDemoTask = () => ({
  id: `interviews-${Date.now()}`,
  title: `Summarize 9 customer interviews`,
  agent: `Sonnet 5.5`,
  status: `running`,
  startedAt: Date.now(),
  steps: [
    {
      label: `Reading the transcripts`,
      time: `now`,
    },
  ],
});
function AgentInboxDemo() {
  let rootRef = React.useRef(null),
    [runId, setRunId] = React.useState(0),
    [tasks, setTasks] = React.useState(makeDemoTasks),
    tourCancelledRef = React.useRef(false),
    pendingTimeoutsRef = React.useRef([]),
    patchTask = (id, patch, stepLabel) =>
      setTasks((r) =>
        r.map((r) =>
          r.id === id
            ? {
                ...r,
                ...patch,
                steps: stepLabel
                  ? [
                      ...(r.steps ?? []),
                      {
                        label: stepLabel,
                        time: `now`,
                      },
                    ]
                  : r.steps,
              }
            : r,
        ),
      ),
    schedule = (callback, delayMs) =>
      pendingTimeoutsRef.current.push(window.setTimeout(callback, delayMs)),
    approveTask = (task) => {
      (patchTask(
        task.id,
        {
          status: `running`,
        },
        `Approved by you – running on production`,
      ),
        schedule(
          () =>
            patchTask(
              task.id,
              {
                status: `done`,
                elapsed: Date.now() - Number(task.startedAt ?? Date.now()),
              },
              `Migrated 48,210 rows`,
            ),
          5e3,
        ));
    },
    retryTask = (task) => {
      (patchTask(
        task.id,
        {
          status: `running`,
          startedAt: Date.now(),
          elapsed: void 0,
        },
        `Retrying with a slower pace`,
      ),
        schedule(
          () =>
            patchTask(
              task.id,
              {
                status: `done`,
                elapsed: 4200,
              },
              `Merged 1,312 duplicates`,
            ),
          4200,
        ));
    },
    rejectTask = (task) =>
      patchTask(
        task.id,
        {
          status: `failed`,
          elapsed: Date.now() - Number(task.startedAt ?? Date.now()),
        },
        `Rejected by you`,
      );
  (React.useEffect(
    () => () => pendingTimeoutsRef.current.forEach((e) => window.clearTimeout(e)),
    [],
  ),
    React.useEffect(() => {
      let t = (t) => () => rootRef.current?.querySelector(t)?.click(),
        n = [
          [700, t(`.ui-ai__head`)],
          [2700, t(`.ui-ai__row[data-open] .ui-ai__btn[data-kind='primary']`)],
          [2400, t(`.ui-ai__row[data-open] .ui-ai__head`)],
          [1100, t(`.ui-ai__tab[data-filter='running']`)],
          [1500, () => setTasks((e) => [makeNewDemoTask(), ...e])],
          [3e3, t(`.ui-ai__tab[data-filter='done']`)],
          [2600, t(`.ui-ai__tab[data-filter='all']`)],
          [
            3200,
            () => {
              (pendingTimeoutsRef.current.forEach((e) => window.clearTimeout(e)),
                (pendingTimeoutsRef.current = []),
                setTasks(makeDemoTasks()),
                setRunId((e) => e + 1));
            },
          ],
        ],
        r = 0,
        a = 0,
        l = () => {
          tourCancelledRef.current ||
            r >= n.length ||
            (a = window.setTimeout(() => {
              tourCancelledRef.current || (n[r][1](), r++, l());
            }, n[r][0]));
        };
      return (l(), () => window.clearTimeout(a));
    }, [runId]));
  let stopTour = () => (tourCancelledRef.current = true);
  return (
    <div
      ref={rootRef}
      className={`ai-demo`}
      onPointerEnter={stopTour}
      onPointerDownCapture={stopTour}
      onKeyDownCapture={stopTour}
      onFocusCapture={stopTour}
    >
      <AgentInbox
        tasks={tasks}
        onApprove={approveTask}
        onReject={rejectTask}
        onRetry={retryTask}
        onOpen={() => {}}
        action={{
          label: `New task`,
          onClick: () => setTasks((e) => [makeNewDemoTask(), ...e]),
        }}
        key={runId}
      />
    </div>
  );
}
export default AgentInboxDemo;
export { AgentInbox as PlicoCore__ };
export { AgentInboxDemo as PlicoDemo_x };

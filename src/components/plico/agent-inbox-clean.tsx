"use client";

import * as React from "react";
type AgentTask = {
  id: string;
  title: string;
  agent?: string;
  status: string;
  description?: string;
  detail?: string;
  progress?: number;
  time?: string;
  duration?: number;
  tool?: string;
  tools?: number;
  sources?: number;
  error?: string;
  action?: string;
  meta?: string;
  icon?: React.ReactNode;
  startedAt?: number | Date;
  elapsed?: number;
  steps?: { label: string; time?: string }[];
  completedAt?: number;
  approval?: {
    title?: string;
    description?: string;
    risk?: string;
    details?: Array<{
      label: string;
      value: React.ReactNode;
    }>;
  };
};
type AgentInboxView = "board" | "list";
interface AgentInboxCleanProps {
  tasks: AgentTask[];
  onApprove?: (task: AgentTask) => void;
  onReject?: (task: AgentTask) => void;
  onRetry?: (task: AgentTask) => void;
  onOpen?: (task: AgentTask) => void;
  title?: string;
  view?: "board" | "list";
  defaultView?: "board" | "list";
  onViewChange?: (view: AgentInboxView) => void;
  className?: string;
}
var inboxLanes = [
  {
    id: `needs`,
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
var statusLane = (status: string) =>
  status === `waiting` || status === `failed` ? `needs` : status === `running` ? `running` : `done`;
var statusLabels: Record<string, string> = {
  waiting: `Waiting for you`,
  running: `Running`,
  done: `Done`,
  failed: `Failed`,
};
var isLiveStatus = (status: string) => status === `running` || status === `waiting`;
var toTimestamp = (value: number | Date) => (typeof value == `number` ? value : value.getTime());
var padTwoDigits = (value: number) => String(value).padStart(2, `0`);
var formatDuration = (milliseconds: number) => {
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
var iconStroke: Pick<
  React.SVGProps<SVGElement>,
  "fill" | "stroke" | "strokeWidth" | "strokeLinecap" | "strokeLinejoin"
> = {
  fill: `none`,
  stroke: `currentColor`,
  strokeWidth: 1.4,
  strokeLinecap: `round`,
  strokeLinejoin: `round`,
};
var SparkIcon = () => (
  <svg width={`14`} height={`14`} viewBox={`0 0 14 14`} aria-hidden={`true`}>
    <path
      d={`M7 1.2c.4 2.9 1.9 4.4 4.8 4.8-2.9.4-4.4 1.9-4.8 4.8C6.6 7.9 5.1 6.4 2.2 6 5.1 5.6 6.6 4.1 7 1.2Z`}
      fill={`currentColor`}
    />
    <circle cx={`11.6`} cy={`11.4`} r={`1.1`} fill={`currentColor`} opacity={`0.55`} />
  </svg>
);
var StatusIcon = ({ status: status }: { status: string }) => (
  <span className={`ui-aic__state-icon`} data-status={status} aria-hidden={`true`}>
    {status === `running` && (
      <svg width={`12`} height={`12`} viewBox={`0 0 12 12`}>
        <circle
          cx={`6`}
          cy={`6`}
          r={`4.6`}
          fill={`none`}
          stroke={`currentColor`}
          strokeOpacity={`0.25`}
          strokeWidth={`1.6`}
        />
        <path
          d={`M6 1.4a4.6 4.6 0 0 1 4.6 4.6`}
          fill={`none`}
          stroke={`currentColor`}
          strokeWidth={`1.6`}
          strokeLinecap={`round`}
        />
      </svg>
    )}
    {status === `waiting` && (
      <svg width={`12`} height={`12`} viewBox={`0 0 12 12`}>
        <path d={`M6 1.6 11 10.2H1L6 1.6Z`} fill={`currentColor`} />
      </svg>
    )}
    {status === `done` && (
      <svg width={`12`} height={`12`} viewBox={`0 0 12 12`}>
        <circle cx={`6`} cy={`6`} r={`3.4`} fill={`currentColor`} />
      </svg>
    )}
    {status === `failed` && (
      <svg width={`12`} height={`12`} viewBox={`0 0 12 12`}>
        <circle cx={`6`} cy={`6`} r={`4.8`} fill={`currentColor`} />
        <path
          d={`M6 3.6v2.8M6 8.3v.1`}
          stroke={`#fff`}
          strokeWidth={`1.5`}
          strokeLinecap={`round`}
        />
      </svg>
    )}
  </span>
);
var ToolIcon = () => (
  <svg width={`12`} height={`12`} viewBox={`0 0 12 12`} aria-hidden={`true`}>
    <path
      d={`M7.6 1.6a2.6 2.6 0 0 0-2.4 3.5L1.7 8.6a1.1 1.1 0 0 0 1.6 1.6l3.5-3.5a2.6 2.6 0 0 0 3.5-2.4l-1.5 1.1-1.5-.4-.4-1.5 1.1-1.5c-.1 0-.3-.4-.4-.4Z`}
      {...iconStroke}
      strokeWidth={1.2}
    />
  </svg>
);
var SearchIcon = () => (
  <svg width={`12`} height={`12`} viewBox={`0 0 12 12`} aria-hidden={`true`}>
    <circle cx={`5.2`} cy={`5.2`} r={`3.3`} {...iconStroke} strokeWidth={1.2} />
    <path d={`m7.7 7.7 2.6 2.6`} {...iconStroke} strokeWidth={1.2} />
  </svg>
);
var BoardIcon = () => (
  <svg width={`13`} height={`13`} viewBox={`0 0 14 14`} aria-hidden={`true`}>
    <rect
      x={`1.8`}
      y={`2.2`}
      width={`3.2`}
      height={`9.6`}
      rx={`1`}
      {...iconStroke}
      strokeWidth={1.2}
    />
    <rect
      x={`8.9`}
      y={`2.2`}
      width={`3.2`}
      height={`6.4`}
      rx={`1`}
      {...iconStroke}
      strokeWidth={1.2}
    />
  </svg>
);
var ListIcon = () => (
  <svg width={`13`} height={`13`} viewBox={`0 0 14 14`} aria-hidden={`true`}>
    <path d={`M2.2 3.6h9.6M2.2 7h9.6M2.2 10.4h9.6`} {...iconStroke} strokeWidth={1.2} />
  </svg>
);
function AgentInboxClean({
  tasks: tasks,
  onApprove: onApprove,
  onReject: onReject,
  onRetry: onRetry,
  onOpen: onOpen,
  title = `Agent inbox`,
  view: view,
  defaultView = `board`,
  onViewChange: onViewChange,
  className: className,
}: AgentInboxCleanProps) {
  let instanceId = React.useId(),
    rootRef = React.useRef<HTMLDivElement | null>(null),
    [internalView, setInternalView] = React.useState(defaultView),
    activeView = view ?? internalView,
    [expandedTaskId, setExpandedTaskId] = React.useState<string | null>(null),
    [now, setNow] = React.useState(() => Date.now()),
    [localOverrides, setLocalOverrides] = React.useState<Record<string, Partial<AgentTask>>>({}),
    effectiveTasks = tasks.map((e) =>
      localOverrides[e.id]
        ? {
            ...e,
            ...localOverrides[e.id],
          }
        : e,
    ),
    hasLiveTasks = effectiveTasks.some((e) => isLiveStatus(e.status));
  React.useEffect(() => {
    if (!hasLiveTasks) return;
    let e = window.setInterval(() => setNow(Date.now()), 1e3);
    return () => window.clearInterval(e);
  }, [hasLiveTasks]);
  let firstSeenRef = React.useRef<Record<string, number>>({});
  for (let e of effectiveTasks) firstSeenRef.current[e.id] ??= Date.now();
  let elapsedMs = (task: AgentTask) => {
      if (!isLiveStatus(task.status)) return task.elapsed ?? 0;
      let startTime =
        task.startedAt === void 0
          ? firstSeenRef.current[task.id] - (task.elapsed ?? 0)
          : toTimestamp(task.startedAt);
      return now - startTime;
    },
    [displayLanes, setDisplayLanes] = React.useState(() =>
      Object.fromEntries(effectiveTasks.map((e) => [e.id, statusLane(e.status)])),
    ),
    laneSignature = effectiveTasks.map((e) => `${e.id}:${statusLane(e.status)}`).join(`|`);
  React.useEffect(() => {
    if (!effectiveTasks.some((e) => displayLanes[e.id] !== statusLane(e.status))) return;
    let e = window.setTimeout(
      () =>
        setDisplayLanes(
          Object.fromEntries(effectiveTasks.map((e) => [e.id, statusLane(e.status)])),
        ),
      prefersReducedMotion() ? 0 : 900,
    );
    return () => window.clearTimeout(e);
  }, [laneSignature]);
  let displayLane = (task: { id: string | number; status: string }) =>
      displayLanes[task.id] ?? statusLane(task.status),
    cardNodesRef = React.useRef(new Map<string, HTMLElement>()),
    previousRectsRef = React.useRef(new Map<string, DOMRect>()),
    layoutSignature = JSON.stringify(displayLanes) + activeView;
  rootRef.current &&
    (previousRectsRef.current = new Map(
      [...cardNodesRef.current].map(([e, t]) => [e, t.getBoundingClientRect()]),
    ));
  let previousLayoutSignatureRef = React.useRef(layoutSignature);
  React.useLayoutEffect(() => {
    if (
      previousLayoutSignatureRef.current !== layoutSignature &&
      ((previousLayoutSignatureRef.current = layoutSignature), !prefersReducedMotion())
    )
      for (let [e, t] of cardNodesRef.current) {
        let n = previousRectsRef.current.get(e);
        if (!n) {
          t.animate(
            [
              {
                opacity: 0,
                transform: `translateY(6px)`,
              },
              {
                opacity: 1,
                transform: `none`,
              },
            ],
            {
              duration: 380,
              easing: motionEase,
            },
          );
          continue;
        }
        let r = t.getBoundingClientRect(),
          i = n.left - r.left,
          a = n.top - r.top;
        (Math.abs(i) < 1 && Math.abs(a) < 1) ||
          t.animate(
            [
              {
                transform: `translate(${i}px, ${a}px)`,
                zIndex: 2,
              },
              {
                transform: `none`,
                zIndex: 2,
              },
            ],
            {
              duration: 560,
              easing: motionEase,
            },
          );
      }
  }, [layoutSignature]);
  let applyAction = (
      task: AgentTask,
      status: string,
      label: string,
      callback?: (task: AgentTask) => void,
    ) => {
      if (callback) return callback(task);
      setLocalOverrides((r) => ({
        ...r,
        [task.id]: {
          status: status,
          startedAt: Date.now(),
          steps: [
            ...(task.steps ?? []),
            {
              label: label,
              time: `now`,
            },
          ],
        },
      }));
    },
    toggleTask = (taskId: string | null) =>
      setExpandedTaskId((t) => (t === taskId ? null : taskId)),
    handleEscape: React.KeyboardEventHandler<HTMLDivElement> = (event) => {
      event.key === `Escape` &&
        expandedTaskId &&
        (event.stopPropagation(),
        rootRef.current
          ?.querySelector<HTMLElement>(`[data-id="${expandedTaskId}"] .ui-aic__card-main`)
          ?.focus({
            preventScroll: true,
          }),
        setExpandedTaskId(null));
    },
    changeView = (view: AgentInboxView) => {
      (setInternalView(view), onViewChange?.(view));
    },
    renderTask = (task: AgentTask) => {
      let isExpanded = expandedTaskId === task.id,
        latestSteps = (task.steps ?? []).slice(-4),
        statusPrefix =
          task.status === `done`
            ? `Done in `
            : task.status === `failed`
              ? statusLabels.failed
              : `${statusLabels[task.status]} · `,
        elapsedText = task.status === `failed` ? `` : formatDuration(elapsedMs(task));
      return (
        <li
          data-id={task.id}
          className={`ui-aic__card`}
          data-status={task.status}
          data-open={isExpanded ? `` : void 0}
          ref={(t) => {
            t ? cardNodesRef.current.set(task.id, t) : cardNodesRef.current.delete(task.id);
          }}
          key={task.id}
        >
          <button
            type={`button`}
            className={`ui-aic__card-main`}
            aria-expanded={isExpanded}
            aria-controls={`${instanceId}-${task.id}`}
            onClick={() => toggleTask(task.id)}
          >
            <span className={`ui-aic__title-row`}>
              <span className={`ui-aic__spark`}>
                <SparkIcon />
              </span>
              <span className={`ui-aic__title`}>{task.title}</span>
            </span>
            {task.description && <span className={`ui-aic__desc`}>{task.description}</span>}
            <span className={`ui-aic__foot`}>
              <span className={`ui-aic__state`} data-status={task.status}>
                <StatusIcon status={task.status} />
                <span>
                  <span className={`ui-aic__state-word`}>{statusPrefix}</span>
                  {elapsedText}
                </span>
              </span>
              <span className={`ui-aic__meta`}>
                {task.sources !== void 0 && (
                  <span title={`Sources read`}>
                    <SearchIcon />
                    {task.sources}
                  </span>
                )}
                {task.tools !== void 0 && (
                  <span title={`Tool calls`}>
                    <ToolIcon />
                    {task.tools}
                  </span>
                )}
              </span>
            </span>
          </button>
          <div
            id={`${instanceId}-${task.id}`}
            className={`ui-aic__fold`}
            data-open={isExpanded ? `` : void 0}
            inert={!isExpanded}
          >
            <div className={`ui-aic__clip`}>
              <div className={`ui-aic__more`}>
                <div className={`ui-aic__agent`}>{task.agent}</div>
                {latestSteps.length > 0 && (
                  <ol className={`ui-aic__steps`}>
                    {latestSteps.map((e, t) => (
                      <li data-last={t === latestSteps.length - 1 ? `` : void 0} key={t}>
                        <span>{e.label}</span>
                        {e.time && <time>{e.time}</time>}
                      </li>
                    ))}
                  </ol>
                )}
                <div className={`ui-aic__actions`}>
                  {task.status === `waiting` && (
                    <>
                      <button
                        type={`button`}
                        className={`ui-aic__btn`}
                        onClick={() =>
                          applyAction(task, `failed`, `You rejected the request`, onReject)
                        }
                      >{`Reject`}</button>
                      <button
                        type={`button`}
                        className={`ui-aic__btn ui-aic__btn--primary`}
                        onClick={() =>
                          applyAction(task, `running`, `You approved – continuing`, onApprove)
                        }
                      >{`Approve`}</button>
                    </>
                  )}
                  {task.status === `failed` && (
                    <button
                      type={`button`}
                      className={`ui-aic__btn ui-aic__btn--primary`}
                      onClick={() => applyAction(task, `running`, `Retrying`, onRetry)}
                    >{`Retry`}</button>
                  )}
                  {(task.status === `running` || task.status === `done`) && onOpen && (
                    <button
                      type={`button`}
                      className={`ui-aic__btn`}
                      onClick={() => onOpen(task)}
                    >{`Open`}</button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </li>
      );
    },
    laneCounts = Object.fromEntries(
      inboxLanes.map((e) => [e.id, effectiveTasks.filter((t) => displayLane(t) === e.id).length]),
    ),
    announcement = `${effectiveTasks.filter((e) => e.status === `waiting` || e.status === `failed`).length} need you, ${effectiveTasks.filter((e) => e.status === `running`).length} running`;
  return (
    <div
      ref={rootRef}
      className={[`ui-aic`, className].filter(Boolean).join(` `)}
      data-view={activeView}
      onKeyDown={handleEscape}
    >
      <style href={`ui-agent-inbox-clean`} precedence={`default`}>
        {agentInboxCleanStyles}
      </style>
      <div className={`ui-aic__bar`}>
        <span className={`ui-aic__heading`}>
          <span className={`ui-aic__crumb`}>{`Agents`}</span>
          <span className={`ui-aic__slash`} aria-hidden={`true`}>{`/`}</span>
          <span>{title}</span>
        </span>
        <div className={`ui-aic__views`} role={`radiogroup`} aria-label={`Layout`}>
          {([`board`, `list`] as const).map((e) => (
            <button
              type={`button`}
              role={`radio`}
              aria-checked={activeView === e}
              className={`ui-aic__view`}
              onClick={() => changeView(e)}
              key={e}
            >
              {e === `board` ? <BoardIcon /> : <ListIcon />}
              {e === `board` ? `Board` : `List`}
            </button>
          ))}
        </div>
      </div>
      <div className={`ui-aic__lanes`}>
        {inboxLanes.map((e) => (
          <section className={`ui-aic__lane`} aria-label={e.label} key={e.id}>
            <header className={`ui-aic__lane-head`}>
              <span className={`ui-aic__lane-spark`} aria-hidden={`true`}>
                <SparkIcon />
              </span>
              <span className={`ui-aic__lane-name`}>{e.label}</span>
              <span className={`ui-aic__count`}>{laneCounts[e.id]}</span>
            </header>
            <ul className={`ui-aic__cards`}>
              {effectiveTasks.filter((t) => displayLane(t) === e.id).map(renderTask)}
              {laneCounts[e.id] === 0 && <li className={`ui-aic__empty`}>{`Nothing here`}</li>}
            </ul>
          </section>
        ))}
      </div>
      <span className={`ui-aic__sr`} aria-live={`polite`}>
        {announcement}
      </span>
    </div>
  );
}
var agentInboxCleanStyles = `
.ui-aic {
  --ui-aic-lane: #f4f4f5;
  --ui-aic-card: #ffffff;
  --ui-aic-line: #e9e9ec;
  --ui-aic-ink: #1c1c1f;
  --ui-aic-text: #55555c;
  --ui-aic-muted: #8e8e96;
  --ui-aic-faint: #b4b4bb;
  --ui-aic-blue: #2f6bff;
  --ui-aic-amber: #e8a20c;
  --ui-aic-green: #22a05a;
  --ui-aic-red: #e5484d;
  --ui-aic-focus: rgba(23, 23, 23, 0.22);
  --ui-aic-ease: cubic-bezier(0.32, 0.72, 0.24, 1);
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
  container-type: inline-size;
  font-family: "Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  font-size: 13px;
  line-height: 20px;
  color: var(--ui-aic-text);
  text-align: left;
  -webkit-font-smoothing: antialiased;
}
.ui-aic *, .ui-aic *::before, .ui-aic *::after { box-sizing: border-box; }
:where(.ui-aic) button { margin: 0; padding: 0; border: 0; background: none; font: inherit; color: inherit; text-align: inherit; cursor: pointer; -webkit-tap-highlight-color: transparent; }
.ui-aic button:focus-visible { outline: 2px solid var(--ui-aic-focus); outline-offset: 2px; }
.ui-aic ul, .ui-aic ol { margin: 0; padding: 0; list-style: none; }
.ui-aic svg { display: block; flex: none; }
.ui-aic__sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }

/* ----- Bar: where you are, and the layout ----- */
.ui-aic__bar { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 12px; padding: 0 2px; }
.ui-aic__heading { display: flex; align-items: center; gap: 10px; min-width: 0; font-size: 14px; font-weight: 500; color: var(--ui-aic-ink); white-space: nowrap; }
.ui-aic__crumb { color: var(--ui-aic-muted); font-weight: 400; }
.ui-aic__slash { color: var(--ui-aic-faint); }
.ui-aic__views { display: flex; flex: none; gap: 2px; padding: 3px; border-radius: 10px; background: var(--ui-aic-lane); }
.ui-aic__view { display: inline-flex; align-items: center; gap: 6px; height: 26px; padding: 0 10px; border-radius: 7px; font-size: 12.5px; font-weight: 500; color: var(--ui-aic-muted); transition: background-color 180ms ease, color 180ms ease, box-shadow 180ms ease; }
.ui-aic__view:hover { color: var(--ui-aic-ink); }
.ui-aic__view[aria-checked="true"] { background: var(--ui-aic-card); color: var(--ui-aic-ink); box-shadow: 0 1px 2px rgba(16, 16, 24, 0.08), 0 0 0 1px rgba(16, 16, 24, 0.04); }

/* ----- Columns ----- */
.ui-aic__lanes { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 8px; align-items: start; }
.ui-aic__lane { min-width: 0; padding: 4px 4px 4px; border-radius: 14px; background: var(--ui-aic-lane); }
.ui-aic__lane-head { display: grid; grid-template-columns: 20px 1fr 20px; align-items: center; height: 34px; padding: 0 8px 0 10px; }
.ui-aic__lane-spark { color: var(--ui-aic-blue); opacity: 0.7; }
.ui-aic__lane-name { overflow: hidden; font-size: 11px; font-weight: 500; letter-spacing: 0.08em; text-align: center; text-transform: uppercase; color: var(--ui-aic-muted); white-space: nowrap; text-overflow: ellipsis; }
.ui-aic__count { display: grid; place-items: center; min-width: 20px; height: 18px; padding: 0 5px; border-radius: 6px; background: rgba(16, 16, 24, 0.06); font-size: 11px; font-weight: 500; color: var(--ui-aic-text); font-variant-numeric: tabular-nums; }
.ui-aic__cards { display: grid; gap: 6px; }
.ui-aic__empty { padding: 18px 0 20px; font-size: 12.5px; text-align: center; color: var(--ui-aic-faint); }

/* ----- A card ----- */
.ui-aic__card { position: relative; border-radius: 10px; background: var(--ui-aic-card); box-shadow: 0 0 0 1px var(--ui-aic-line), 0 1px 2px rgba(16, 16, 24, 0.04); transition: box-shadow 200ms ease; }
.ui-aic__card:hover, .ui-aic__card[data-open] { box-shadow: 0 0 0 1px #dcdce1, 0 4px 14px -6px rgba(16, 16, 24, 0.12); }
.ui-aic__card-main { display: grid; gap: 6px; width: 100%; padding: 12px 14px 12px 12px; border-radius: 10px; container: aic-card / inline-size; }
.ui-aic__title-row { display: flex; align-items: center; gap: 10px; min-width: 0; }
.ui-aic__spark { display: grid; flex: none; place-items: center; width: 16px; color: var(--ui-aic-blue); transition: color 300ms ease; }
.ui-aic__card[data-status="waiting"] .ui-aic__spark { color: var(--ui-aic-amber); }
.ui-aic__card[data-status="failed"] .ui-aic__spark { color: var(--ui-aic-red); }
.ui-aic__card[data-status="done"] .ui-aic__spark { color: var(--ui-aic-green); }
.ui-aic__title { min-width: 0; overflow: hidden; font-size: 14px; font-weight: 500; line-height: 20px; color: var(--ui-aic-ink); white-space: nowrap; text-overflow: ellipsis; }
.ui-aic__desc { display: -webkit-box; padding-left: 26px; overflow: hidden; font-size: 13px; line-height: 19px; color: var(--ui-aic-text); -webkit-line-clamp: 2; -webkit-box-orient: vertical; }
.ui-aic__foot { display: flex; align-items: center; justify-content: space-between; gap: 10px; min-width: 0; margin-top: 4px; padding-left: 26px; }
.ui-aic__state { display: inline-flex; align-items: center; gap: 8px; min-width: 0; font-size: 12.5px; color: var(--ui-aic-text); white-space: nowrap; font-variant-numeric: tabular-nums; }
.ui-aic__state > span:last-child { overflow: hidden; text-overflow: ellipsis; }
.ui-aic__state-icon { display: grid; flex: none; place-items: center; width: 12px; height: 12px; color: var(--ui-aic-blue); animation: ui-aic-pop 360ms var(--ui-aic-ease) both; }
.ui-aic__state-icon[data-status="running"] svg { animation: ui-aic-spin 900ms linear infinite; }
.ui-aic__state-icon[data-status="waiting"] { color: var(--ui-aic-amber); }
.ui-aic__state-icon[data-status="done"] { color: var(--ui-aic-green); }
.ui-aic__state-icon[data-status="failed"] { color: var(--ui-aic-red); }
.ui-aic__meta { display: inline-flex; flex: none; align-items: center; font-size: 12px; color: var(--ui-aic-muted); font-variant-numeric: tabular-nums; }
.ui-aic__meta > span { display: inline-flex; align-items: center; gap: 5px; padding: 0 9px; }
.ui-aic__meta > span + span { border-left: 1px solid var(--ui-aic-line); }
.ui-aic__meta > span:last-child { padding-right: 0; }

/* Open: steps and decisions unfold under the card's text */
.ui-aic__fold { display: grid; grid-template-rows: 0fr; opacity: 0; transition: grid-template-rows 460ms var(--ui-aic-ease), opacity 240ms ease; }
.ui-aic__fold[data-open] { grid-template-rows: 1fr; opacity: 1; transition: grid-template-rows 460ms var(--ui-aic-ease), opacity 320ms ease 100ms; }
.ui-aic__clip { min-height: 0; overflow: hidden; }
/* Starts at the card's left edge, like the spark – the full width for reading */
.ui-aic__more { margin: 0 14px 0 12px; padding: 10px 0 12px; border-top: 1px solid var(--ui-aic-line); }
.ui-aic__agent { font-size: 12px; color: var(--ui-aic-muted); }
.ui-aic__steps { position: relative; display: grid; gap: 5px; margin-top: 6px !important; padding-left: 12px !important; }
.ui-aic__steps li { position: relative; display: flex; justify-content: space-between; gap: 10px; font-size: 12.5px; line-height: 18px; color: var(--ui-aic-text); }
.ui-aic__steps li::before { content: ""; position: absolute; top: 7px; left: -12px; width: 4px; height: 4px; border-radius: 50%; background: var(--ui-aic-faint); }
/* Short line segments between the dots, with a little air on both ends */
.ui-aic__steps li:not(:last-child)::after { content: ""; position: absolute; top: 15px; bottom: -8px; left: -10.5px; width: 1px; background: var(--ui-aic-line); }
.ui-aic__steps li[data-last]::before { background: var(--ui-aic-ink); }
.ui-aic__steps li > span { min-width: 0; }
.ui-aic__steps time { flex: none; color: var(--ui-aic-muted); }
.ui-aic__actions { display: flex; justify-content: flex-end; gap: 6px; margin-top: 10px; }
.ui-aic__actions:empty { display: none; }
.ui-aic__btn { display: inline-flex; align-items: center; height: 28px; padding: 0 12px; border-radius: 8px; box-shadow: inset 0 0 0 1px var(--ui-aic-line); background: var(--ui-aic-card); font-size: 12.5px; font-weight: 500; color: var(--ui-aic-ink); transition: background-color 160ms ease; }
.ui-aic__btn:hover { background: var(--ui-aic-lane); }
.ui-aic__btn--primary { background: var(--ui-aic-ink); box-shadow: none; color: var(--ui-aic-card); }
.ui-aic__btn--primary:hover { background: #33333a; }

/* ----- List layout: the columns stack, one after another ----- */
.ui-aic[data-view="list"] .ui-aic__lanes { grid-template-columns: minmax(0, 1fr); }
.ui-aic[data-view="list"] .ui-aic__lane-head { grid-template-columns: 20px auto 1fr; gap: 4px; }
.ui-aic[data-view="list"] .ui-aic__lane-name { text-align: left; }
.ui-aic[data-view="list"] .ui-aic__count { justify-self: start; }
.ui-aic__lanes { animation: ui-aic-in 320ms ease both; }

@keyframes ui-aic-spin { to { transform: rotate(360deg); } }
@keyframes ui-aic-pop { from { opacity: 0; transform: scale(0.6); } }
@keyframes ui-aic-in { from { opacity: 0.4; } }

/* Narrow containers: always the list, without the switch */
@container (max-width: 620px) {
  .ui-aic__views { display: none; }
  .ui-aic .ui-aic__lanes { grid-template-columns: minmax(0, 1fr); }
  .ui-aic .ui-aic__lane-head { grid-template-columns: 20px auto 1fr; gap: 4px; }
  .ui-aic .ui-aic__lane-name { text-align: left; }
  .ui-aic .ui-aic__count { justify-self: start; }
}
/* Slim cards (three columns in a narrow board): the text starts under the spark, so the footer keeps its words */
@container aic-card (max-width: 300px) {
  .ui-aic__desc, .ui-aic__foot { padding-left: 0; }
  .ui-aic__state:is([data-status="running"], [data-status="done"]) .ui-aic__state-word { display: none; }
}
@container (max-width: 360px) {
  .ui-aic__desc, .ui-aic__foot { padding-left: 0; }
  .ui-aic__title { white-space: normal; }
}

@media (pointer: coarse) {
  .ui-aic__view { height: 32px; }
  .ui-aic__btn { height: 36px; padding: 0 16px; }
}

@media (prefers-reduced-motion: reduce) {
  .ui-aic *, .ui-aic *::before, .ui-aic *::after { animation: none !important; transition: none !important; }
}

/* Dark mode: follows a .dark class or data-theme="dark" on any ancestor, e.g. <html> */
:where(.dark, [data-theme="dark"]) .ui-aic {
  --ui-aic-lane: #161618;
  --ui-aic-card: #1e1e21;
  --ui-aic-line: #2c2c31;
  --ui-aic-ink: #ededed;
  --ui-aic-text: #b6b6bd;
  --ui-aic-muted: #85858d;
  --ui-aic-faint: #5c5c63;
  --ui-aic-blue: #5b8cff;
  --ui-aic-amber: #f5b638;
  --ui-aic-green: #3ecf8e;
  --ui-aic-red: #ff6b66;
  --ui-aic-focus: rgba(255, 255, 255, 0.3);
}
:where(.dark, [data-theme="dark"]) .ui-aic__card:hover, :where(.dark, [data-theme="dark"]) .ui-aic__card[data-open] { box-shadow: 0 0 0 1px #3a3a40, 0 6px 18px -8px rgba(0, 0, 0, 0.6); }
:where(.dark, [data-theme="dark"]) .ui-aic__count { background: rgba(255, 255, 255, 0.07); }
:where(.dark, [data-theme="dark"]) .ui-aic__btn--primary:hover { background: #d6d6da; }
:where(.dark, [data-theme="dark"]) .ui-aic__state-icon[data-status="failed"] path { stroke: #1e1e21; }
`;
var minuteMs = 6e4;
var makeCleanDemoTasks = () => {
  let e = Date.now();
  return [
    {
      id: `migrate`,
      title: `Migrate users table`,
      description: `Split users into accounts and profiles on Postgres 17. The dry run on staging passed.`,
      agent: `Opus 5.5`,
      status: `waiting`,
      startedAt: e - 6 * minuteMs - 12e3,
      tools: 14,
      sources: 9,
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
      id: `crm`,
      title: `Clean up CRM contacts`,
      description: `Matched 1,312 likely duplicates, then the merge hit the API rate limit.`,
      agent: `Haiku 5.5`,
      status: `failed`,
      elapsed: 161e3,
      tools: 6,
      sources: 2,
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
      id: `review`,
      title: `Review PR #482`,
      description: `Billing webhooks: reading the diff and the test run, writing comments.`,
      agent: `Sonnet 5.5`,
      status: `running`,
      startedAt: e - 3 * minuteMs - 4e4,
      tools: 21,
      sources: 12,
      steps: [
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
      id: `notes`,
      title: `Release notes v2.4`,
      description: `Grouping 23 merged pull requests into features and fixes.`,
      agent: `Sonnet 5.5`,
      status: `running`,
      startedAt: e - 1 * minuteMs - 18e3,
      tools: 5,
      sources: 23,
      steps: [
        {
          label: `Collected 23 merged pull requests`,
          time: `1m ago`,
        },
        {
          label: `Drafting the highlights`,
          time: `now`,
        },
      ],
    },
    {
      id: `digest`,
      title: `Weekly metrics digest`,
      description: `Pulled numbers from three dashboards and posted the summary to #metrics.`,
      agent: `Haiku 5.5`,
      status: `done`,
      elapsed: 252e3,
      tools: 8,
      sources: 3,
      steps: [
        {
          label: `Pulled numbers from 3 dashboards`,
          time: `22m ago`,
        },
        {
          label: `Posted to #metrics`,
          time: `18m ago`,
        },
      ],
    },
  ];
};
function AgentInboxCleanDemo2() {
  let rootRef = React.useRef<HTMLDivElement | null>(null),
    [runId, setRunId] = React.useState(0),
    [tasks, setTasks] = React.useState<AgentTask[]>(makeCleanDemoTasks),
    tourCancelledRef = React.useRef(false),
    pendingTimeoutsRef = React.useRef<number[]>([]),
    patchTask = (
      id: string,
      patch: {
        status: string;
        startedAt?: number;
        elapsed?: number | undefined;
        tools?: number;
      },
      stepLabel: string,
    ) =>
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
    schedule = (callback: TimerHandler, delayMs: number | undefined) =>
      pendingTimeoutsRef.current.push(window.setTimeout(callback, delayMs)),
    approveTask: (task: AgentTask) => void = (task) => {
      (patchTask(
        task.id,
        {
          status: `running`,
          startedAt: Date.now() - 6 * minuteMs,
        },
        `Approved by you – running on production`,
      ),
        schedule(
          () =>
            patchTask(
              task.id,
              {
                status: `done`,
                elapsed: 408e3,
                tools: 17,
              },
              `Migrated 48,210 rows`,
            ),
          4200,
        ));
    },
    retryTask: (task: AgentTask) => void = (task) => {
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
    rejectTask: (task: AgentTask) => void = (task) =>
      patchTask(
        task.id,
        {
          status: `failed`,
          elapsed: 6 * minuteMs,
        },
        `Rejected by you`,
      );
  (React.useEffect(
    () => () => pendingTimeoutsRef.current.forEach((e) => window.clearTimeout(e)),
    [],
  ),
    React.useEffect(() => {
      let t = (t: string) => () => rootRef.current?.querySelector<HTMLElement>(t)?.click(),
        n: [number, () => void][] = [
          [700, t(`.ui-aic__card[data-status='waiting'] .ui-aic__card-main`)],
          [2600, t(`.ui-aic__card[data-open] .ui-aic__btn--primary`)],
          [1400, t(`.ui-aic__card[data-open] .ui-aic__card-main`)],
          [
            7e3,
            () => {
              (pendingTimeoutsRef.current.forEach((e) => window.clearTimeout(e)),
                (pendingTimeoutsRef.current = []),
                setTasks(makeCleanDemoTasks()),
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
      className={`aic-demo`}
      onPointerEnter={stopTour}
      onPointerDownCapture={stopTour}
      onKeyDownCapture={stopTour}
      onFocusCapture={stopTour}
    >
      <AgentInboxClean
        tasks={tasks}
        onApprove={approveTask}
        onReject={rejectTask}
        onRetry={retryTask}
        onOpen={() => {}}
        key={runId}
      />
    </div>
  );
}
const demoStyles =
  ".ai-demo{grid-template-columns:min(400px,100%);place-content:start center;width:100%;height:600px;display:grid}.card__preview .ai-demo{grid-template-columns:auto;height:auto;position:absolute;inset:44px 0 0}.card__preview .ai-demo .ui-ai{zoom:.5;width:400px;max-width:none}.stage:has(.ai-demo){height:700px}@media (width<=760px){.ai-demo{height:auto}.stage:has(.ai-demo){align-items:start;height:800px;padding:120px 16px 24px}}.aic-demo{grid-template-columns:min(860px,100%);place-content:start center;width:100%;height:560px;display:grid}.card__preview .aic-demo{grid-template-columns:auto;height:auto;position:absolute;inset:44px 0 0;overflow:hidden}.card__preview .aic-demo .ui-aic{zoom:.39;width:760px}.stage:has(.aic-demo){height:660px;padding:56px 88px}@media (width<=760px){.aic-demo{height:auto}.stage:has(.aic-demo){align-items:start;height:900px;padding:120px 16px 24px}}\n";
function AgentInboxCleanDemo(props: React.JSX.IntrinsicAttributes) {
  return (
    <>
      <style href="plico-demo-agent-inbox-clean" precedence="default">
        {demoStyles}
      </style>
      <AgentInboxCleanDemo2 {...props} />
    </>
  );
}
export { AgentInboxClean };
export { AgentInboxCleanDemo };
export { AgentInboxClean as Component };
export { AgentInboxCleanDemo as Demo };
export default AgentInboxClean;

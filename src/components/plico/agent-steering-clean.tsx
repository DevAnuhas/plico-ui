"use client";

import * as React from "react";
type SteerStep = {
  id: string;
  title: string;
} & {
  status?: string;
  startedAt?: number | Date;
  notes?: SteerNote[];
  detail?: string;
  tool?: string;
  duration?: number;
};
type SteerNote = {
  id: string;
  text: string;
  picked?: string;
  status?: string;
  time?: string;
};
interface AgentSteeringCleanProps {
  title?: string;
  agent?: string;
  steps: SteerStep[];
  queue: SteerNote[];
  status?: "running" | "paused" | "done";
  startedAt?: number | Date;
  onQueue?: (text: string) => void;
  onInterrupt?: (text: string, queuedId?: string) => void;
  onRemove?: (id: string) => void;
  onPause?: () => void;
  onResume?: () => void;
  draft?: string;
  onDraftChange?: (text: string) => void;
  placeholder?: string;
  className?: string;
}
var valueValue = (e: number | Date) => (typeof e == `number` ? e : e.getTime());
var valueValue2 = (e: number) => String(e).padStart(2, `0`);
var valueValue3 = (e: number) => {
  let t = Math.max(0, Math.floor(e / 1e3));
  if (t < 60) return `${t}s`;
  let n = Math.floor(t / 60);
  return n < 60
    ? `${n}m ${valueValue2(t % 60)}s`
    : `${Math.floor(n / 60)}h ${valueValue2(n % 60)}m`;
};
var valueValue4 = (e: number) => `${(Math.max(0, e) / 1e3).toFixed(1)}s`;
var valueValue5 = () =>
  typeof window < `u` &&
  window.matchMedia(`(prefers-reduced-motion: reduce)`).matches;
var valueValue6 = () =>
  typeof navigator < `u` &&
  /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);
var valueValue7 = `cubic-bezier(0.32, 0.72, 0.24, 1)`;
var valueValue8: Pick<
  React.SVGProps<SVGElement>,
  "fill" | "stroke" | "strokeWidth" | "strokeLinecap" | "strokeLinejoin"
> = {
  fill: `none`,
  stroke: `currentColor`,
  strokeWidth: 1.4,
  strokeLinecap: `round`,
  strokeLinejoin: `round`,
};
var Iconf = () => (
  <svg width={`14`} height={`14`} viewBox={`0 0 14 14`} aria-hidden={`true`}>
    <path
      d={`M7 1.2c.4 2.9 1.9 4.4 4.8 4.8-2.9.4-4.4 1.9-4.8 4.8C6.6 7.9 5.1 6.4 2.2 6 5.1 5.6 6.6 4.1 7 1.2Z`}
      fill={`currentColor`}
    />
    <circle
      cx={`11.6`}
      cy={`11.4`}
      r={`1.1`}
      fill={`currentColor`}
      opacity={`0.55`}
    />
  </svg>
);
var Iconp = ({ status: status }: { status: string }) => (
  <span
    className={`ui-stc__step-icon`}
    data-status={status}
    aria-hidden={`true`}
  >
    {status === `done` && (
      <svg width={`16`} height={`16`} viewBox={`0 0 16 16`}>
        <circle cx={`8`} cy={`8`} r={`6.5`} fill={`currentColor`} />
        <path
          d={`m5.4 8.2 1.8 1.8 3.4-3.7`}
          fill={`none`}
          stroke={`#fff`}
          strokeWidth={`1.5`}
          strokeLinecap={`round`}
          strokeLinejoin={`round`}
        />
      </svg>
    )}
    {status === `active` && (
      <svg width={`16`} height={`16`} viewBox={`0 0 16 16`}>
        <circle
          cx={`8`}
          cy={`8`}
          r={`5.8`}
          fill={`none`}
          stroke={`currentColor`}
          strokeOpacity={`0.2`}
          strokeWidth={`1.6`}
        />
        <path
          d={`M8 2.2a5.8 5.8 0 0 1 5.8 5.8`}
          fill={`none`}
          stroke={`currentColor`}
          strokeWidth={`1.6`}
          strokeLinecap={`round`}
        />
      </svg>
    )}
    {status === `pending` && (
      <svg width={`16`} height={`16`} viewBox={`0 0 16 16`}>
        <circle
          cx={`8`}
          cy={`8`}
          r={`5.8`}
          fill={`none`}
          stroke={`currentColor`}
          strokeWidth={`1.2`}
          strokeDasharray={`2 2.2`}
        />
      </svg>
    )}
  </span>
);
var Iconm = () => (
  <svg width={`16`} height={`16`} viewBox={`0 0 16 16`} aria-hidden={`true`}>
    <rect
      x={`4.2`}
      y={`3.4`}
      width={`2.6`}
      height={`9.2`}
      rx={`0.9`}
      fill={`currentColor`}
    />
    <rect
      x={`9.2`}
      y={`3.4`}
      width={`2.6`}
      height={`9.2`}
      rx={`0.9`}
      fill={`currentColor`}
    />
  </svg>
);
var Iconh = () => (
  <svg width={`16`} height={`16`} viewBox={`0 0 16 16`} aria-hidden={`true`}>
    <path
      d={`M5 3.6v8.8c0 .6.6.9 1.1.6l6.6-4.4a.7.7 0 0 0 0-1.2L6.1 3c-.5-.3-1.1 0-1.1.6Z`}
      fill={`currentColor`}
    />
  </svg>
);
var Icong = () => (
  <svg width={`12`} height={`12`} viewBox={`0 0 12 12`} aria-hidden={`true`}>
    <path
      d={`M6.9 1 2.6 6.6h3l-.5 4.4 4.3-5.6h-3L6.9 1Z`}
      fill={`currentColor`}
    />
  </svg>
);
var View_ = () => (
  <svg width={`12`} height={`12`} viewBox={`0 0 12 12`} aria-hidden={`true`}>
    <path d={`m3.4 3.4 5.2 5.2M8.6 3.4 3.4 8.6`} {...valueValue8} />
  </svg>
);
var Iconv = () => (
  <svg width={`16`} height={`16`} viewBox={`0 0 16 16`} aria-hidden={`true`}>
    <path
      d={`M8 12.6V3.6M4.2 7.2 8 3.4l3.8 3.8`}
      {...valueValue8}
      strokeWidth={1.6}
    />
  </svg>
);
var Icony = () => (
  <svg width={`12`} height={`12`} viewBox={`0 0 12 12`} aria-hidden={`true`}>
    <path d={`m2.8 6.2 2 2 4.4-4.6`} {...valueValue8} strokeWidth={1.5} />
  </svg>
);
var Iconb = () => (
  <svg width={`12`} height={`12`} viewBox={`0 0 12 12`} aria-hidden={`true`}>
    <path
      d={`M3 2.4v3.4c0 .9.7 1.6 1.6 1.6h4.6M7.6 5.6l1.8 1.8-1.8 1.8`}
      {...valueValue8}
      strokeWidth={1.2}
    />
  </svg>
);
function AgentSteeringClean({
  title: title,
  agent: agent,
  steps: steps,
  queue: queue,
  status = `running`,
  startedAt: startedAt,
  onQueue: onQueue,
  onInterrupt: onInterrupt,
  onRemove: onRemove,
  draft: draft,
  onDraftChange: onDraftChange,
  onPause: onPause,
  onResume: onResume,
  placeholder = `Steer the agent…`,
  className: className,
}: AgentSteeringCleanProps) {
  let N = React.useId(),
    P = React.useRef<HTMLDivElement | null>(null),
    F = React.useRef<HTMLDivElement | null>(null),
    I = React.useRef<HTMLTextAreaElement | null>(null),
    [L, ee] = React.useState(``),
    R = draft ?? L,
    z = (e: string) => {
      (ee(e), onDraftChange?.(e));
    },
    [te, B] = React.useState(``),
    [V, ne] = React.useState(() => Date.now()),
    H = valueValue6() ? `⌘` : `Ctrl`;
  React.useEffect(() => {
    if (status !== `running`) return;
    let e = window.setInterval(() => ne(Date.now()), 100);
    return () => window.clearInterval(e);
  }, [status]);
  let re = React.useRef(Date.now()),
    U = V - (startedAt === void 0 ? re.current : valueValue(startedAt)),
    W = React.useRef(new Map<string, number>()),
    ie = (e: SteerStep) => {
      if (e.startedAt !== void 0) return V - valueValue(e.startedAt);
      let t = W.current.get(e.id);
      return (t === void 0 && W.current.set(e.id, (t = Date.now())), V - t);
    },
    ae = steps.filter((e) => e.status === `done`).length,
    G = status !== `done`,
    K = React.useRef(new Map<string, HTMLElement>()),
    q = (e: string) => (t: HTMLElement | null) => {
      t ? K.current.set(e, t) : K.current.delete(e);
    },
    J = React.useRef(new Map<string, DOMRect>()),
    Y = React.useRef(0),
    X = JSON.stringify([
      steps.map((e) => [
        e.id,
        e.status,
        e.title,
        (e.notes ?? []).map((e) => e.id),
      ]),
      queue.map((e) => e.id),
    ]),
    Z = React.useRef(X);
  (P.current &&
    X !== Z.current &&
    ((J.current = new Map(
      [...K.current].map(([e, t]) => [e, t.getBoundingClientRect()]),
    )),
    (Y.current = F.current?.offsetHeight ?? 0)),
    React.useLayoutEffect(() => {
      if (Z.current === X || ((Z.current = X), valueValue5())) return;
      let e = F.current;
      e &&
        Y.current &&
        Math.abs(e.offsetHeight - Y.current) > 1 &&
        e.animate(
          [
            {
              height: `${Y.current}px`,
            },
            {
              height: `${e.offsetHeight}px`,
            },
          ],
          {
            duration: 480,
            easing: valueValue7,
          },
        );
      for (let [e, t] of K.current) {
        let n = e.slice(e.indexOf(`:`) + 1),
          r =
            J.current.get(e) ??
            (e.startsWith(`note:`) ? J.current.get(`queued:${n}`) : void 0),
          i = t.getBoundingClientRect();
        if (!r) {
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
              duration: 360,
              easing: valueValue7,
            },
          );
          continue;
        }
        let a = r.left - i.left,
          o = r.top - i.top;
        if (Math.abs(a) < 1 && Math.abs(o) < 1) continue;
        let s = !J.current.has(e);
        (t.animate(
          [
            {
              transform: `translate(${a}px, ${o}px)`,
              zIndex: 2,
            },
            {
              transform: `none`,
              zIndex: 2,
            },
          ],
          {
            duration: s ? 620 : 480,
            easing: valueValue7,
          },
        ),
          s && t.setAttribute(`data-landed`, ``));
      }
    }, [X]));
  let Q = steps
      .flatMap((e) => (e.notes ?? []).filter((e) => e.picked).map((e) => e.id))
      .join(`|`),
    $ = React.useRef(new Set(Q.split(`|`).filter(Boolean)));
  React.useEffect(() => {
    for (let e of steps)
      for (let n of e.notes ?? [])
        n.picked &&
          !$.current.has(n.id) &&
          ($.current.add(n.id),
          B(`${agent ?? `The agent`} picked up: ${n.text}`));
  }, [Q]);
  let oe = (e: boolean) => {
      let t = R.trim();
      t &&
        G &&
        (e ? onInterrupt?.(t) : onQueue?.(t),
        B(e ? `Interrupting: ${t}` : `Queued for the next step: ${t}`),
        z(``));
    },
    se: React.KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
      e.key === `Enter` && !e.shiftKey && !e.nativeEvent.isComposing
        ? (e.preventDefault(), oe(e.metaKey || e.ctrlKey))
        : e.key === `Escape` && R && (e.stopPropagation(), z(``));
    };
  React.useLayoutEffect(() => {
    let e = I.current;
    e &&
      ((e.style.height = `0px`),
      (e.style.height = `${Math.min(e.scrollHeight, 60)}px`));
  }, [R]);
  let ce =
    status === `done`
      ? `Done in ${valueValue3(U)}`
      : status === `paused`
        ? `Paused`
        : `Running · ${valueValue3(U)}`;
  return (
    <div
      ref={P}
      className={[`ui-stc`, className].filter(Boolean).join(` `)}
      data-status={status}
    >
      <style href={`ui-agent-steering-clean`} precedence={`default`}>
        {ValueValue}
      </style>
      <div ref={F} className={`ui-stc__card`}>
        <header className={`ui-stc__head`}>
          <span className={`ui-stc__spark`}>
            <Iconf />
          </span>
          <div className={`ui-stc__heading`}>
            <span className={`ui-stc__title`}>{title}</span>
            <span className={`ui-stc__sub`}>
              {agent && (
                <>
                  {agent}
                  <span
                    className={`ui-stc__dot`}
                    aria-hidden={`true`}
                  >{`·`}</span>
                </>
              )}
              {status === `done`
                ? `${steps.length} steps`
                : `Step ${Math.min(ae + 1, steps.length)} of ${steps.length}`}
            </span>
          </div>
          <span className={`ui-stc__state`} data-status={status}>
            <span className={`ui-stc__pulse`} aria-hidden={`true`} />
            {ce}
          </span>
          {status === `running` && onPause && (
            <button
              type={`button`}
              className={`ui-stc__icon-btn`}
              aria-label={`Pause the run`}
              title={`Pause`}
              onClick={onPause}
            >
              <Iconm />
            </button>
          )}
          {status === `paused` && onResume && (
            <button
              type={`button`}
              className={`ui-stc__icon-btn`}
              aria-label={`Resume the run`}
              title={`Resume`}
              onClick={onResume}
            >
              <Iconh />
            </button>
          )}
        </header>
        <ol className={`ui-stc__plan`} aria-label={`Plan`}>
          {steps.map((e) => {
            let t = e.status ?? `pending`;
            return (
              <li
                ref={q(`step:${e.id}`)}
                className={`ui-stc__step`}
                data-status={t}
                aria-current={t === `active` ? `step` : void 0}
                key={e.id}
              >
                <div className={`ui-stc__step-row`}>
                  <Iconp status={t} />
                  <span className={`ui-stc__step-title`}>{e.title}</span>
                  <span className={`ui-stc__step-time`}>
                    {t === `done` && e.duration !== void 0
                      ? valueValue4(e.duration)
                      : t === `active` && status === `running`
                        ? valueValue4(ie(e))
                        : ``}
                  </span>
                </div>
                {(e.notes ?? []).map((e) => (
                  <div
                    ref={q(`note:${e.id}`)}
                    className={`ui-stc__note`}
                    data-picked={e.picked ?? void 0}
                    key={e.id}
                  >
                    <Iconb />
                    <span className={`ui-stc__note-text`}>{e.text}</span>
                    {e.picked && (
                      <span className={`ui-stc__note-tag`}>
                        <Icony />
                        {e.picked === `now` ? `Interrupted` : `Picked up`}
                      </span>
                    )}
                  </div>
                ))}
              </li>
            );
          })}
        </ol>
        {queue.length > 0 && (
          <div className={`ui-stc__queue`} ref={q(`queue:box`)}>
            <div className={`ui-stc__label`}>
              {`Queued for the next step `}
              <span>{queue.length}</span>
            </div>
            <ul className={`ui-stc__queued`}>
              {queue.map((e) => (
                <li
                  ref={q(`queued:${e.id}`)}
                  className={`ui-stc__chip`}
                  key={e.id}
                >
                  <span className={`ui-stc__chip-text`}>{e.text}</span>
                  {onInterrupt && G && (
                    <button
                      type={`button`}
                      className={`ui-stc__chip-btn`}
                      title={`Apply now (${H}↵)`}
                      onClick={() => onInterrupt(e.text, e.id)}
                    >
                      <Icong />
                      {`Now`}
                    </button>
                  )}
                  {onRemove && (
                    <button
                      type={`button`}
                      className={`ui-stc__chip-x`}
                      aria-label={`Remove “${e.text}”`}
                      onClick={() => onRemove(e.id)}
                    >
                      <View_ />
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
        <div
          className={`ui-stc__compose`}
          ref={q(`compose:box`)}
          data-disabled={G ? void 0 : ``}
        >
          <div className={`ui-stc__field`} onClick={() => I.current?.focus()}>
            <textarea
              ref={I}
              id={`${N}-field`}
              rows={1}
              value={R}
              disabled={!G}
              placeholder={G ? placeholder : `The run has finished`}
              aria-label={`Steer the agent`}
              aria-describedby={`${N}-hint`}
              onChange={(e) => z(e.target.value)}
              onKeyDown={se}
            />
            <button
              type={`button`}
              className={`ui-stc__send`}
              aria-label={`Queue for the next step`}
              disabled={!R.trim() || !G}
              onClick={() => oe(false)}
            >
              <Iconv />
            </button>
          </div>
          <div className={`ui-stc__hint`} id={`${N}-hint`}>
            {G ? (
              <>
                <span>
                  <kbd>{`↵`}</kbd>
                  {` next step`}
                </span>
                {onInterrupt && (
                  <span>
                    <kbd>{H}</kbd>
                    <kbd>{`↵`}</kbd>
                    {` interrupt now`}
                  </span>
                )}
              </>
            ) : (
              <span>{`Notes still in the queue were not used`}</span>
            )}
          </div>
        </div>
      </div>
      <span className={`ui-stc__sr`} aria-live={`polite`}>
        {te}
      </span>
    </div>
  );
}
var ValueValue = `
/* Colors and motion as variables – override them on .ui-stc */
.ui-stc {
  --ui-stc-card: #ffffff;
  --ui-stc-strong: #000000;
  --ui-stc-ink: rgba(0, 0, 0, 0.88);
  --ui-stc-text: rgba(0, 0, 0, 0.61);
  --ui-stc-muted: rgba(0, 0, 0, 0.45);
  --ui-stc-faint: rgba(0, 0, 0, 0.27);
  --ui-stc-icon: rgba(0, 0, 0, 0.447);
  --ui-stc-line: rgba(0, 0, 0, 0.06);
  --ui-stc-rail: rgba(0, 0, 0, 0.15);
  --ui-stc-wash: rgba(0, 0, 0, 0.03);
  --ui-stc-fill: rgba(0, 0, 0, 0.06);
  --ui-stc-solid: rgba(0, 0, 0, 0.88);
  --ui-stc-on-solid: #fcfcfc;
  --ui-stc-accent: rgba(0, 96, 226, 0.765);
  --ui-stc-accent-bg: rgba(0, 96, 226, 0.06);
  --ui-stc-amber: #d9930d;
  --ui-stc-green: #1a9a52;
  --ui-stc-focus: rgba(0, 96, 226, 0.35);
  /* Strokes are shadows: a 0.5px hairline plus a soft lift */
  --ui-stc-shadow: 0 0 0 0.5px rgba(0, 0, 0, 0.06), 0 1px 1px -1px rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --ui-stc-ease: cubic-bezier(0.32, 0.72, 0.24, 1);
  position: relative;
  box-sizing: border-box;
  width: 100%;
  max-width: 460px;
  container-type: inline-size;
  font-family: "Inter", "InterVariable", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  font-size: 13px;
  font-weight: 400;
  line-height: 20px;
  color: var(--ui-stc-text);
  text-align: left;
  -webkit-font-smoothing: antialiased;
}
.ui-stc *, .ui-stc *::before, .ui-stc *::after { box-sizing: border-box; }
:where(.ui-stc) button { margin: 0; padding: 0; border: 0; background: none; font: inherit; color: inherit; text-align: inherit; cursor: pointer; -webkit-tap-highlight-color: transparent; }
.ui-stc button:focus-visible { outline: 2px solid var(--ui-stc-focus); outline-offset: 1px; }
.ui-stc ol, .ui-stc ul { margin: 0; padding: 0; list-style: none; }
.ui-stc svg { display: block; flex: none; }
.ui-stc__sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }

/* One white card – the edge is a shadow, not a border */
.ui-stc__card { overflow: hidden; border-radius: 10px; background: var(--ui-stc-card); box-shadow: var(--ui-stc-shadow); }

/* ----- The run ----- */
.ui-stc__head { display: flex; align-items: center; gap: 10px; min-width: 0; padding: 12px 12px 12px 14px; }
.ui-stc__spark { display: grid; flex: none; place-items: center; width: 16px; color: var(--ui-stc-accent); }
.ui-stc[data-status="paused"] .ui-stc__spark { color: var(--ui-stc-amber); }
.ui-stc[data-status="done"] .ui-stc__spark { color: var(--ui-stc-green); }
.ui-stc__heading { display: grid; flex: 1; min-width: 0; }
.ui-stc__title { overflow: hidden; font-weight: 500; color: var(--ui-stc-strong); white-space: nowrap; text-overflow: ellipsis; }
.ui-stc__sub { overflow: hidden; font-size: 12px; line-height: 16px; color: var(--ui-stc-muted); white-space: nowrap; text-overflow: ellipsis; }
.ui-stc__dot { margin: 0 6px; color: var(--ui-stc-faint); }
.ui-stc__state { display: inline-flex; flex: none; align-items: center; gap: 7px; font-size: 12px; line-height: 16px; color: var(--ui-stc-text); white-space: nowrap; font-variant-numeric: tabular-nums; }
.ui-stc__pulse { position: relative; width: 6px; height: 6px; border-radius: 50%; background: var(--ui-stc-accent); }
.ui-stc__pulse::after { content: ""; position: absolute; inset: -3px; border-radius: 50%; background: var(--ui-stc-accent); opacity: 0; animation: ui-stc-pulse 1600ms ease-out infinite; }
.ui-stc__state[data-status="paused"] .ui-stc__pulse { background: var(--ui-stc-amber); }
.ui-stc__state[data-status="done"] .ui-stc__pulse { background: var(--ui-stc-green); }
.ui-stc__state:not([data-status="running"]) .ui-stc__pulse::after { display: none; }
.ui-stc__icon-btn { display: grid; flex: none; place-items: center; width: 28px; height: 28px; border-radius: 6px; background: var(--ui-stc-card); box-shadow: var(--ui-stc-shadow); color: var(--ui-stc-icon); transition: color 160ms ease, background-color 160ms ease; }
.ui-stc__icon-btn:hover { color: var(--ui-stc-ink); background: var(--ui-stc-wash); }

/* ----- The plan: a quiet timeline under a hairline ----- */
.ui-stc__plan { display: grid; padding: 10px 14px 12px !important; border-top: 0.5px solid var(--ui-stc-line); }
.ui-stc__step { position: relative; padding: 5px 0; }
/* Short rail segments between the icons, with a little air on both ends */
.ui-stc__step:not(:last-child)::after { content: ""; position: absolute; top: 25px; bottom: -3px; left: 7.5px; width: 0.5px; background: var(--ui-stc-rail); }
.ui-stc__step-row { display: flex; align-items: center; gap: 10px; min-width: 0; }
.ui-stc__step-icon { display: grid; flex: none; place-items: center; width: 16px; height: 16px; color: var(--ui-stc-faint); }
.ui-stc__step-icon[data-status="done"] { color: var(--ui-stc-accent); animation: ui-stc-pop 360ms var(--ui-stc-ease) both; }
.ui-stc__step-icon[data-status="active"] { color: var(--ui-stc-accent); }
.ui-stc__step-icon[data-status="active"] svg { animation: ui-stc-spin 900ms linear infinite; }
.ui-stc__step-title { flex: 1; min-width: 0; overflow: hidden; color: var(--ui-stc-ink); white-space: nowrap; text-overflow: ellipsis; transition: color 240ms ease; }
.ui-stc__step[data-status="done"] .ui-stc__step-title { color: var(--ui-stc-text); }
.ui-stc__step[data-status="pending"] .ui-stc__step-title { color: var(--ui-stc-muted); }
/* The active step shimmers while it runs */
.ui-stc[data-status="running"] .ui-stc__step[data-status="active"] .ui-stc__step-title {
  font-weight: 500;
  background: linear-gradient(90deg, var(--ui-stc-ink) 0%, var(--ui-stc-ink) 40%, var(--ui-stc-faint) 50%, var(--ui-stc-ink) 60%, var(--ui-stc-ink) 100%) 0 0 / 300% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: ui-stc-shimmer 2200ms linear infinite;
}
.ui-stc__step[data-status="active"] .ui-stc__step-title { font-weight: 500; }
.ui-stc__step-time { flex: none; font-size: 12px; color: var(--ui-stc-faint); font-variant-numeric: tabular-nums; }

/* A note the agent took in – attached to its step */
.ui-stc__note { display: flex; align-items: flex-start; gap: 6px; margin: 4px 0 2px 26px; padding: 4px 8px 4px 6px; border-radius: 6px; background: var(--ui-stc-wash); box-shadow: inset 0 0 0 0.5px var(--ui-stc-line); font-size: 12px; line-height: 16px; color: var(--ui-stc-ink); }
.ui-stc__note > svg { margin-top: 2px; color: var(--ui-stc-muted); }
.ui-stc__note-text { flex: 1; min-width: 0; }
.ui-stc__note-tag { display: inline-flex; flex: none; align-items: center; gap: 3px; color: var(--ui-stc-accent); font-weight: 500; white-space: nowrap; }
.ui-stc__note[data-landed] { animation: ui-stc-land 1400ms ease both; }

/* ----- Queued notes ----- */
.ui-stc__queue { padding: 10px 12px 2px 14px; border-top: 0.5px solid var(--ui-stc-line); }
.ui-stc__label { display: flex; align-items: center; gap: 6px; margin-bottom: 6px; font-size: 10px; font-weight: 500; line-height: 16px; letter-spacing: 0.5px; text-transform: uppercase; color: var(--ui-stc-muted); }
.ui-stc__label span { display: grid; place-items: center; min-width: 16px; height: 16px; padding: 0 4px; border-radius: 4px; background: var(--ui-stc-fill); color: var(--ui-stc-text); letter-spacing: 0; font-variant-numeric: tabular-nums; }
.ui-stc__queued { display: grid; gap: 6px; }
.ui-stc__chip { position: relative; display: flex; align-items: center; gap: 6px; min-height: 32px; padding: 4px 4px 4px 10px; border-radius: 8px; background: var(--ui-stc-card); box-shadow: var(--ui-stc-shadow); color: var(--ui-stc-ink); }
.ui-stc__chip::before { content: ""; position: absolute; top: 8px; bottom: 8px; left: 0; width: 2px; border-radius: 0 2px 2px 0; background: var(--ui-stc-accent); }
.ui-stc__chip-text { flex: 1; min-width: 0; font-size: 12.5px; line-height: 18px; }
.ui-stc__chip-btn { display: inline-flex; flex: none; align-items: center; gap: 4px; height: 24px; padding: 0 8px 0 6px; border-radius: 6px; font-size: 12px; font-weight: 500; color: var(--ui-stc-text); transition: background-color 160ms ease, color 160ms ease; }
.ui-stc__chip-btn:hover { background: var(--ui-stc-accent-bg); color: var(--ui-stc-accent); }
.ui-stc__chip-x { display: grid; flex: none; place-items: center; width: 24px; height: 24px; border-radius: 6px; color: var(--ui-stc-faint); transition: background-color 160ms ease, color 160ms ease; }
.ui-stc__chip-x:hover { background: var(--ui-stc-wash); color: var(--ui-stc-ink); }

/* ----- Steer ----- */
.ui-stc__compose { padding: 10px 12px 10px 14px; border-top: 0.5px solid var(--ui-stc-line); }
.ui-stc__field { display: flex; align-items: flex-end; gap: 8px; min-height: 36px; padding: 4px 4px 4px 10px; border-radius: 8px; background: var(--ui-stc-wash); box-shadow: inset 0 0 0 0.5px var(--ui-stc-line); cursor: text; transition: box-shadow 160ms ease, background-color 160ms ease; }
.ui-stc__field:focus-within { background: var(--ui-stc-card); box-shadow: inset 0 0 0 0.5px var(--ui-stc-rail), 0 0 0 3px var(--ui-stc-accent-bg); }
.ui-stc__field textarea { flex: 1; min-width: 0; height: 20px; margin: 4px 0; padding: 0; border: 0; outline: none; background: none; font: inherit; color: var(--ui-stc-strong); resize: none; }
.ui-stc__field textarea::placeholder { color: var(--ui-stc-muted); }
.ui-stc__field textarea:focus-visible { outline: none; }
.ui-stc__send { display: grid; flex: none; place-items: center; width: 28px; height: 28px; border-radius: 6px; background: var(--ui-stc-solid); color: var(--ui-stc-on-solid); transition: opacity 160ms ease, transform 160ms ease; }
.ui-stc__send:disabled { opacity: 0.18; cursor: default; }
.ui-stc__send:not(:disabled):active { transform: scale(0.94); }
.ui-stc__hint { display: flex; flex-wrap: wrap; align-items: center; gap: 4px 14px; margin-top: 8px; font-size: 12px; line-height: 16px; color: var(--ui-stc-muted); }
.ui-stc__hint > span { display: inline-flex; align-items: center; gap: 3px; white-space: nowrap; }
.ui-stc kbd { display: inline-grid; place-items: center; min-width: 16px; height: 16px; padding: 0 3px; border-radius: 4px; background: var(--ui-stc-card); box-shadow: var(--ui-stc-shadow); font: inherit; font-size: 10px; color: var(--ui-stc-text); }
.ui-stc__compose[data-disabled] .ui-stc__field { opacity: 0.6; cursor: default; }

@keyframes ui-stc-spin { to { transform: rotate(360deg); } }
@keyframes ui-stc-pop { from { opacity: 0; transform: scale(0.6); } }
@keyframes ui-stc-pulse { from { opacity: 0.45; transform: scale(0.6); } to { opacity: 0; transform: scale(1.8); } }
@keyframes ui-stc-shimmer { from { background-position: 100% 0; } to { background-position: 0 0; } }
@keyframes ui-stc-land { 0%, 30% { background-color: var(--ui-stc-accent-bg); box-shadow: inset 0 0 0 0.5px var(--ui-stc-focus); } }

/* Narrow containers: tighter padding */
@container (max-width: 380px) {
    .ui-stc__head { padding-left: 12px; }
  .ui-stc__plan, .ui-stc__queue, .ui-stc__compose { padding-left: 12px; padding-right: 12px; }
}
@media (pointer: coarse) {
  .ui-stc__icon-btn, .ui-stc__send { width: 34px; height: 34px; }
  .ui-stc__chip-btn, .ui-stc__chip-x { height: 30px; }
  .ui-stc__chip-x { width: 30px; }
}
@media (prefers-reduced-motion: reduce) {
  .ui-stc *, .ui-stc *::before, .ui-stc *::after { animation: none !important; transition: none !important; }
  .ui-stc[data-status="running"] .ui-stc__step[data-status="active"] .ui-stc__step-title { background: none; color: var(--ui-stc-ink); }
}

/* Dark mode: follows a .dark class or data-theme="dark" on any ancestor, e.g. <html> */
:where(.dark, [data-theme="dark"]) .ui-stc {
  --ui-stc-card: #1c1c1f;
  --ui-stc-strong: #ffffff;
  --ui-stc-ink: rgba(255, 255, 255, 0.9);
  --ui-stc-text: rgba(255, 255, 255, 0.62);
  --ui-stc-muted: rgba(255, 255, 255, 0.45);
  --ui-stc-faint: rgba(255, 255, 255, 0.28);
  --ui-stc-icon: rgba(255, 255, 255, 0.5);
  --ui-stc-line: rgba(255, 255, 255, 0.08);
  --ui-stc-rail: rgba(255, 255, 255, 0.16);
  --ui-stc-wash: rgba(255, 255, 255, 0.04);
  --ui-stc-fill: rgba(255, 255, 255, 0.08);
  --ui-stc-solid: rgba(255, 255, 255, 0.92);
  --ui-stc-on-solid: #141416;
  --ui-stc-accent: #5b9aff;
  --ui-stc-accent-bg: rgba(91, 154, 255, 0.12);
  --ui-stc-amber: #f5b638;
  --ui-stc-green: #3ecf8e;
  --ui-stc-focus: rgba(91, 154, 255, 0.45);
  --ui-stc-shadow: 0 0 0 0.5px rgba(255, 255, 255, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.4);
}
:where(.dark, [data-theme="dark"]) .ui-stc__step-icon[data-status="done"] path { stroke: #1c1c1f; }
`;
var ValueValue2 = [
  {
    id: `read`,
    title: `Read schema and 14 migrations`,
  },
  {
    id: `draft`,
    title: `Plan the split into accounts and profiles`,
  },
  {
    id: `write`,
    title: `Write migration 0042_split_users`,
  },
  {
    id: `dry`,
    title: `Dry run on staging`,
  },
  {
    id: `pr`,
    title: `Open a pull request for review`,
  },
];
var valueValue9: Record<string, number> = {
  read: 1400,
  draft: 4600,
  write: 5200,
  dry: 2600,
  pr: 1800,
};
var ValueValue3: Record<string, string> = {
  write: `Write migration 0042 for Postgres 16`,
};
var ValueValue4 = `Use Postgres 16 syntax – prod isn't on 17 yet`;
var ValueValue5 = `Keep the old users view for a week`;
function AgentSteeringCleanDemo2() {
  let [e, t] = React.useState<SteerStep[]>(ValueValue2),
    [i, a] = React.useState<SteerNote[]>([]),
    [o, s] = React.useState<"done" | "running" | "paused">(`running`),
    [c, l] = React.useState(``),
    [u, d] = React.useState<number | Date>(() => Date.now() - 12e4 - 6e3),
    f = React.useRef<HTMLDivElement | null>(null),
    p = React.useRef(true),
    m = React.useRef<number[]>([]),
    h = React.useRef([]),
    g = React.useRef(i);
  g.current = i;
  let _ = React.useRef(e);
  _.current = e;
  let v = React.useRef(0),
    y = (
      e: React.RefObject<number[]>,
      t: TimerHandler,
      n: number | undefined,
    ) => {
      e.current.push(window.setTimeout(t, n));
    },
    b = (e: React.RefObject<number[]>) => {
      (e.current.forEach((e) => window.clearTimeout(e)), (e.current = []));
    },
    S = (e: string) => f.current?.querySelector<HTMLElement>(e)?.click(),
    O = (e: number) => {
      let n = _.current;
      if (e >= n.length) {
        (s(`done`), y(p.current ? m : h, I, p.current ? 3800 : 4200));
        return;
      }
      let r = n[e].id;
      (t((t) =>
        t.map((t, n) =>
          n === e
            ? {
                ...t,
                status: `active`,
                startedAt: Date.now(),
              }
            : t,
        ),
      ),
        y(
          h,
          () => {
            let n = g.current;
            (t((t) =>
              t.map((t, r) =>
                r === e
                  ? {
                      ...t,
                      status: `done`,
                      duration: Date.now() - k(t.startedAt),
                    }
                  : r === e + 1 && n.length
                    ? {
                        ...t,
                        title: ValueValue3[t.id] ?? t.title,
                        notes: [
                          ...(t.notes ?? []),
                          ...n.map((e) => ({
                            ...e,
                            picked: `next`,
                          })),
                        ],
                      }
                    : t,
              ),
            ),
              n.length && a([]),
              O(e + 1));
          },
          valueValue9[r] ?? 2e3,
        ));
    },
    k = (e: number | Date | undefined) =>
      e === void 0 ? Date.now() : typeof e == `number` ? e : e.getTime(),
    A: (text: string) => void = (e: string) =>
      a((t) => [
        ...t,
        {
          id: `n${++v.current}`,
          text: e,
        },
      ]),
    j: (text: string, queuedId?: string | undefined) => void = (e, n) => {
      let r = _.current.findIndex((e) => e.status === `active`);
      if (r < 0) return A(e);
      let i = {
        id: n ?? `n${++v.current}`,
        text: e,
        picked: `now`,
      };
      (n && a((e) => e.filter((e) => e.id !== n)),
        b(h),
        t((e) =>
          e.map((e, t) =>
            t === r
              ? {
                  ...e,
                  notes: [...(e.notes ?? []), i],
                }
              : e,
          ),
        ),
        y(h, () => O(r), 120));
    },
    M: (id: string) => void = (e) => a((t) => t.filter((t) => t.id !== e)),
    N: () => void = () => {
      (b(h), s(`paused`));
    },
    P: () => void = () => {
      s(`running`);
      let e = _.current.findIndex((e) => e.status === `active`);
      y(h, () => O(Math.max(0, e)), 200);
    },
    F = (e: string, t: number, n: TimerHandler) => {
      ([...e].forEach((n, r) => y(m, () => l(e.slice(0, r + 1)), t + r * 38)),
        n && y(m, n, t + e.length * 38 + 420));
    },
    I = () => {
      if (
        (b(h),
        b(m),
        t(
          ValueValue2.map((e, t) =>
            t === 0
              ? {
                  ...e,
                  status: `done`,
                  duration: 1400,
                }
              : e,
          ),
        ),
        a([]),
        l(``),
        s(`running`),
        d(Date.now() - 12e4 - 6e3),
        y(h, () => O(1), 200),
        !p.current)
      )
        return;
      F(ValueValue4, 900, () => S(`.ui-stc__send`));
      let e = 200 + valueValue9.draft;
      (F(ValueValue5, e + 900, () => S(`.ui-stc__send`)),
        y(m, () => S(`.ui-stc__chip-btn`), e + 900 + 1292 + 1400));
    };
  React.useEffect(
    () => (
      I(),
      () => {
        (b(m), b(h));
      }
    ),
    [],
  );
  let L = (e: boolean) => {
    e && p.current && ((p.current = false), b(m), l(``));
  };
  return (
    <div
      ref={f}
      className={`steer-demo`}
      onPointerDownCapture={(e) => L(e.nativeEvent.isTrusted)}
      onKeyDownCapture={(e) => L(e.nativeEvent.isTrusted)}
    >
      <AgentSteeringClean
        title={`Migrate users table`}
        agent={`Opus 5.5`}
        steps={e}
        queue={i}
        status={o}
        startedAt={u}
        draft={c}
        onDraftChange={l}
        onQueue={A}
        onInterrupt={j}
        onRemove={M}
        onPause={N}
        onResume={P}
      />
    </div>
  );
}
const demoStyles =
  ".steer-demo{grid-template-columns:minmax(0,460px);justify-content:center;width:100%;display:grid}.card__preview .steer-demo{grid-template-columns:auto;align-content:start;padding:42px 16px 0;position:absolute;inset:0}.card__preview .steer-demo :is(.ui-st,.ui-stc){zoom:.47;width:460px;max-width:none}.card__preview .steer-demo .ui-st{zoom:.44}.card__preview .steer-demo :is(.ui-st__hint,.ui-stc__hint){display:none}.stage:has(.steer-demo){height:600px}.stage .steer-demo{align-self:start;margin-top:64px}.stage .steer-demo .ui-stc{zoom:1.1}@media (width<=760px){.stage:has(.steer-demo){height:680px;padding-left:12px;padding-right:12px}.stage .steer-demo{margin-top:72px}.stage .steer-demo .ui-stc{zoom:1}}\n";
function AgentSteeringCleanDemo(props: React.JSX.IntrinsicAttributes) {
  return (
    <>
      <style href="plico-demo-agent-steering-clean" precedence="default">
        {demoStyles}
      </style>
      <AgentSteeringCleanDemo2 {...props} />
    </>
  );
}
export { AgentSteeringClean };
export { AgentSteeringCleanDemo };
export { AgentSteeringClean as Component };
export { AgentSteeringCleanDemo as Demo };
export default AgentSteeringClean;

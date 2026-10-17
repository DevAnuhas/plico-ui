"use client";

import * as React from "react";
interface DropdownMenuProps {
  trigger: (state: { open: boolean; toggle: () => void }) => React.ReactNode;
  items: MenuItem[];
  align?: PopoverAlign;
  side?: PopoverSide;
  title?: string;
  className?: string;
}
interface MenuItem {
  label: string;
  icon?: IconNode;
  description?: string;
  checked?: boolean;
  danger?: boolean;
  onSelect?: () => void;
}
interface PopoverProps {
  open: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  align?: PopoverAlign;
  side?: PopoverSide;
  className?: string;
}
type PopoverAlign = "start" | "end";
type PopoverSide = "top" | "bottom";
interface NavigationGroup {
  label: string;
  items: NavigationItem[];
  empty?: string;
}
interface NavigationItem {
  label: string;
  icon: IconNode;
  count?: number;
}
type ThinkingSource = {label: string; href?: string; tooltip?: string; icon?: React.ReactNode};
type ThinkingStep = {kind: "step"; label: string} | {kind: "search"; label: string; activeLabel?: string; sources: ThinkingSource[]; moreSources?: ThinkingSource[]};
interface ChatReply {steps: ThinkingStep[]; paragraphs: string[]}
type ChatMessage = {id: number; role: "user"; text: string} | {id: number; role: "assistant"; reply: ChatReply};
interface MessageListProps {messages: ChatMessage[]; name: string; scroller: React.RefObject<HTMLElement | null>; onDone: () => void}
interface ReplyProps {name: string; reply: ChatReply; onGrow: () => void; onDone: () => void}
interface ComposerProps {placeholder?: string; onSend?: (message: string) => void; busy?: boolean; className?: string}

interface SetupTask {
  id: string;
  label: string;
  done?: boolean;
}
interface SetupGroup {
  id: string;
  title: string;
  tasks: SetupTask[];
}
type ShellNavItem = {
  id?: string;
  label: string;
  icon?: React.ReactNode;
  badge?: string | number;
  active?: boolean;
  items?: ShellNavItem[];
};
interface ThinkingStateProps {
  steps: ThinkingStep[];
  doneLabel?: string;
  stepMs?: number;
  loop?: boolean;
  onDone?: (seconds: number) => void;
  className?: string;
}
interface SetupGuideProps {
  title?: string;
  groups: SetupGroup[];
  onEdit?: () => void;
  onClose?: () => void;
  onChange?: (done: string[]) => void;
  className?: string;
}
interface AppShellProps {
  children?: React.ReactNode;
  active?: string;
  onNavigate?: (label: string) => void;
  workspace?: string;
  user?: {
    name: string;
    avatar?: string;
  };
  nav?: NavigationItem[];
  projects?: string[];
  groups?: NavigationGroup[];
  setup?: SetupGroup[];
  className?: string;
}
type IconNode = Array<[string, Record<string, string | number | undefined>]>;
interface HugeiconsProps extends Omit<React.SVGProps<SVGSVGElement>, "strokeWidth"> {
  icon: IconNode;
  altIcon?: IconNode;
  size?: string | number;
  strokeWidth?: string | number;
  absoluteStrokeWidth?: boolean;
  showAlt?: boolean;
  primaryColor?: string;
  secondaryColor?: string;
  disableSecondaryOpacity?: boolean;
}
const ScreenFrameModeContext = React.createContext<boolean | null>(null);
function PreviewFrame({ children }: { children?: React.ReactNode }) {
  const mode = React.useContext(ScreenFrameModeContext);
  const full =
    mode ?? (typeof window !== "undefined" && /\/full\/?$/.test(window.location.pathname));
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = React.useState(0);
  React.useLayoutEffect(() => {
    const element = ref.current;
    if (!element || full) return;
    const resize = () => setScale(element.clientWidth / 1440);
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(element);
    return () => observer.disconnect();
  }, [full]);
  return (
    <>
      <style
        href="plico-screen-frame"
        precedence="default"
      >{`.screen-stage{position:relative;width:100%;overflow:hidden;isolation:isolate}.screen-stage__canvas{position:absolute;inset:0 auto auto 0;transform-origin:top left}.screen-full{width:100%;height:100dvh;overflow:hidden}.screen-full>.ui-as-app{height:100%;min-height:0;border-radius:0}.screen-full>.screen-full{height:100%}`}</style>
      {full ? (
        <div className="screen-full">{children}</div>
      ) : (
        <div
          ref={ref}
          className="screen-stage"
          style={{
            aspectRatio: "1440 / 900",
          }}
        >
          {scale > 0 && (
            <div
              className="screen-stage__canvas"
              style={{
                width: 1440,
                height: 900,
                transform: `scale(${scale})`,
              }}
            >
              {children}
            </div>
          )}
        </div>
      )}
    </>
  );
}
const projects = ["Q3 Campaign", "Brand assets", "Hiring", "Research"];
const routes: Record<string, string> = {
  "New chat": "assistant-home",
  Folders: "files",
  Integrations: "integrations",
  Chat: "agent-chat",
  Companies: "crm",
  Revenue: "analytics",
  Analytics: "analytics",
  Runs: "agent-run",
  Evals: "evals",
  Settings: "settings-billing",
};
function navigateScreen(label: string) {
  const project = projects.includes(label),
    slug = routes[label] ?? (project ? "folder" : null);
  if (!slug) return;
  const full = /\/full\/?$/.test(window.location.pathname);
  const url = `/screens/${slug}${full ? "/full" : ""}${project ? `?folder=${encodeURIComponent(label)}` : ""}`;
  window.history.pushState(null, "", url);
  window.dispatchEvent(new PopStateEvent("popstate"));
  window.dispatchEvent(new Event("screen-query"));
}
var ValueValue37 = `M38 0H176Q196 0 204 14L218 30Q224 38 246 38H562Q600 38 600 76V462Q600 500 562 500H38Q0 500 0 462V38Q0 0 38 0Z`;
var ValueValue38 = [78, 180, 140, 175, 126, 168, 110];
function GlassFolderComponent({
  className: className,
  label = `Blue folder holding three documents behind a frosted front pocket`,
}: {className?: string; label?: string}) {
  let n = `ui-fd` + React.useId().replace(/[^a-zA-Z0-9_-]/g, ``);
  return (
    <div className={[`ui-fd`, className].filter(Boolean).join(` `)} role={`img`} aria-label={label}>
      <style href={`ui-glass-folder`} precedence={`default`}>
        {ValueValue39}
      </style>
      <div className={`ui-fd-icon`} aria-hidden={`true`}>
        <svg className={`ui-fd-layer ui-fd-back`} viewBox={`0 0 600 500`}>
          <defs>
            <filter id={`${n}-hl`} x={`-10%`} y={`-10%`} width={`120%`} height={`120%`}>
              <feGaussianBlur in={`SourceAlpha`} stdDeviation={`4`} result={`blur`} />
              <feOffset in={`blur`} dy={`3`} result={`offset`} />
              <feComposite
                in={`blur`}
                in2={`offset`}
                operator={`arithmetic`}
                k2={`1`}
                k3={`-1`}
                result={`diff`}
              />
              <feFlood floodColor={`#fff`} floodOpacity={`0.65`} />
              <feComposite in2={`diff`} operator={`in`} result={`light`} />
              <feComposite in={`light`} in2={`SourceAlpha`} operator={`in`} />
            </filter>
          </defs>
          <path className={`ui-fd-back-fill`} d={ValueValue37} fill={`#5bb7ea`} />
          <path d={ValueValue37} fill={`#000`} filter={`url(#${n}-hl)`} />
        </svg>
        <svg className={`ui-fd-layer`} viewBox={`0 0 600 500`}>
          <defs>
            <linearGradient id={`${n}-paper`} x1={`0`} y1={`0`} x2={`0`} y2={`1`}>
              <stop className={`ui-fd-paper-top`} offset={`0%`} stopColor={`#fff`} />
              <stop className={`ui-fd-paper-bottom`} offset={`100%`} stopColor={`#eaf2f8`} />
            </linearGradient>
            <symbol id={`${n}-doc`} overflow={`visible`}>
              <rect
                className={`ui-fd-paper`}
                x={`0.6`}
                y={`0.6`}
                width={`278.8`}
                height={`348.8`}
                rx={`19.4`}
                fill={`url(#${n}-paper)`}
                stroke={`rgba(0,0,0,0.12)`}
                strokeWidth={`1.2`}
              />
              {ValueValue38.map((e, t) => (
                <rect
                  className={`ui-fd-line`}
                  x={`30`}
                  y={87 + t * 28}
                  width={e}
                  height={`9`}
                  rx={`4.5`}
                  fill={`rgba(0,0,0,0.12)`}
                  key={t}
                />
              ))}
            </symbol>
          </defs>
          <use className={`ui-fd-doc ui-fd-doc--left`} href={`#${n}-doc`} />
          <use className={`ui-fd-doc ui-fd-doc--right`} href={`#${n}-doc`} />
          <use className={`ui-fd-doc ui-fd-doc--middle`} href={`#${n}-doc`} />
        </svg>
        <div className={`ui-fd-front`} />
      </div>
    </div>
  );
}
var ValueValue39 = `
.ui-fd {
  --ui-fd-ease: cubic-bezier(0.2, 0.85, 0.25, 1);
  position: relative;
  width: 100%;
  aspect-ratio: 3 / 2;
  overflow: hidden;
  container-type: inline-size;
  font-family: "Inter", ui-sans-serif, system-ui, -apple-system, sans-serif;
}

/* The folder is drawn on a 600 × 500 grid; cqw keeps every detail in proportion */
.ui-fd-icon {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 40%;
  aspect-ratio: 6 / 5;
  container-type: inline-size;
  perspective: 220cqw;
  perspective-origin: 50% 60%;
  transform: translate(-50%, -48%);
  transition: transform 0.6s var(--ui-fd-ease);
}
.ui-fd-icon:hover { transform: translate(-50%, -48%) scale(1.03); }

.ui-fd-layer { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; }
.ui-fd-back {
  filter:
    drop-shadow(0 4cqw 4.6cqw rgba(60, 130, 180, 0.28))
    drop-shadow(0 1.3cqw 2cqw rgba(60, 130, 180, 0.16))
    drop-shadow(0 0.3cqw 0.7cqw rgba(60, 130, 180, 0.1));
}

.ui-fd-doc {
  transform-box: fill-box;
  transform-origin: center;
  filter: drop-shadow(0 3px 4px rgba(0, 30, 60, 0.18));
  transition: transform 0.55s var(--ui-fd-ease);
}
.ui-fd-doc--left   { transform: translate(40px, 80px) rotate(6deg); }
.ui-fd-doc--right  { transform: translate(280px, 80px) rotate(6deg); }
.ui-fd-doc--middle { transform: translate(160px, 66px) rotate(-4deg); }
.ui-fd-icon:hover .ui-fd-doc--left   { transform: translate(32px, 70px) rotate(9deg); }
.ui-fd-icon:hover .ui-fd-doc--right  { transform: translate(286px, 76px) rotate(5deg); }
.ui-fd-icon:hover .ui-fd-doc--middle { transform: translate(166px, 52px) rotate(-7deg); }

/* Pocket: top edge at 108 of 500, corners 38; on hover it drops to 124 and tips forward */
.ui-fd-front {
  position: absolute;
  inset: 21.6% 0 0;
  border-radius: 6.333cqw;
  background:
    linear-gradient(180deg, rgba(0, 40, 75, 0) 74%, rgba(0, 40, 75, 0.28) 100%),
    linear-gradient(180deg, rgba(132, 214, 248, 0.45) 0%, rgba(69, 170, 220, 0.45) 100%);
  box-shadow: inset 0 0 0 0.67cqw rgba(255, 255, 255, 0.3), inset 0 0.25cqw 0 rgba(255, 255, 255, 0.55);
  -webkit-backdrop-filter: blur(3.3cqw) saturate(1.1);
  backdrop-filter: blur(3.3cqw) saturate(1.1);
  transform-origin: 50% 100%;
  transition: top 0.6s var(--ui-fd-ease), border-radius 0.6s var(--ui-fd-ease), transform 0.6s var(--ui-fd-ease);
}
.ui-fd-icon:hover .ui-fd-front {
  top: 24.8%;
  border-radius: 3cqw 3cqw 6.333cqw 6.333cqw;
  transform: translateZ(2.33cqw) rotateX(-9deg);
}

/* Dark mode: follows a .dark class or data-theme="dark" on any ancestor, e.g. <html>.
   Dark paper with light lines, a deeper blue folder and a pocket that lets less light through. */
:where(.dark, [data-theme="dark"]) .ui-fd-back-fill { fill: #3d8fc6; }
:where(.dark, [data-theme="dark"]) .ui-fd-paper-top { stop-color: #34363c; }
:where(.dark, [data-theme="dark"]) .ui-fd-paper-bottom { stop-color: #26292f; }
:where(.dark, [data-theme="dark"]) .ui-fd-paper { stroke: rgba(255, 255, 255, 0.1); }
:where(.dark, [data-theme="dark"]) .ui-fd-line { fill: rgba(255, 255, 255, 0.16); }
:where(.dark, [data-theme="dark"]) .ui-fd-back {
  filter:
    drop-shadow(0 4cqw 4.6cqw rgba(0, 0, 0, 0.45))
    drop-shadow(0 1.3cqw 2cqw rgba(0, 0, 0, 0.3));
}
:where(.dark, [data-theme="dark"]) .ui-fd-doc { filter: drop-shadow(0 3px 4px rgba(0, 0, 0, 0.45)); }
:where(.dark, [data-theme="dark"]) .ui-fd-front {
  background:
    linear-gradient(180deg, rgba(0, 20, 40, 0) 70%, rgba(0, 20, 40, 0.4) 100%),
    linear-gradient(180deg, rgba(100, 190, 235, 0.42) 0%, rgba(45, 130, 190, 0.5) 100%);
  box-shadow: inset 0 0 0 0.67cqw rgba(255, 255, 255, 0.14), inset 0 0.25cqw 0 rgba(255, 255, 255, 0.3);
}

@media (prefers-reduced-motion: reduce) {
  .ui-fd-icon, .ui-fd-doc, .ui-fd-front { transition: none; }
}
`;
var initialDelayMs = 700;
var sourceDelayMs = 160;
function ThinkingState({
  steps: steps,
  doneLabel = `Finished thinking`,
  stepMs = 1300,
  loop = false,
  onDone: onDone,
  className: className,
}: ThinkingStateProps) {
  let [cycle, setCycle] = React.useState(0),
    [visibleSteps, setVisibleSteps] = React.useState(0),
    [done, setDone] = React.useState(false),
    [elapsedSeconds, setElapsedSeconds] = React.useState(0),
    [expanded, setExpanded] = React.useState(true),
    [expandedSources, setExpandedSources] = React.useState(() => new Set()),
    startedAt = React.useRef(0),
    cancelled = React.useRef(false);
  (React.useEffect(() => {
    ((startedAt.current = Date.now()),
      setVisibleSteps(0),
      setDone(false),
      setElapsedSeconds(0),
      setExpanded(true),
      setExpandedSources(new Set()));
    let t = [],
      n = initialDelayMs;
    return (
      steps.forEach((e, r) => {
        (t.push(window.setTimeout(() => setVisibleSteps(r + 1), n)),
          (n += stepMs + (e.kind === `search` ? (e.sources.length + 1) * sourceDelayMs : 0)));
      }),
      t.push(
        window.setTimeout(() => {
          let e = Math.max(1, Math.round((Date.now() - startedAt.current) / 1e3));
          (setElapsedSeconds(e), setDone(true), onDone?.(e));
        }, n),
      ),
      loop &&
        t.push(window.setTimeout(() => !cancelled.current && setCycle((e) => e + 1), n + 4e3)),
      () => t.forEach(clearTimeout)
    );
  }, [cycle, steps, stepMs, loop]),
    React.useEffect(() => {
      if (done) return;
      let e = window.setInterval(
        () => setElapsedSeconds(Math.floor((Date.now() - startedAt.current) / 1e3)),
        250,
      );
      return () => clearInterval(e);
    }, [done, cycle]));
  let activeStep = done ? -1 : visibleSteps - 1;
  return (
    <div
      className={[`ui-think`, className].filter(Boolean).join(` `)}
      data-done={done || void 0}
      key={cycle}
    >
      <style href={`ui-thinking-state`} precedence={`default`}>
        {thinkingStyles}
      </style>
      <button
        type={`button`}
        className={`ui-think__head`}
        aria-expanded={expanded}
        onClick={() => setExpanded((e) => !e)}
      >
        <span className={`ui-think__chevron`} aria-hidden={`true`}>
          <svg viewBox={`0 0 24 24`}>
            <path d={`M18 9s-4.419 6-6 6c-1.581 0-6-6-6-6`} />
          </svg>
        </span>
        <span className={`ui-think__title`} key={done ? `done` : `busy`}>
          {done ? (
            `Worked for ${formatDuration(elapsedSeconds)}`
          ) : (
            <>
              <span className={`ui-think__shimmer`} data-text={`Thinking`}>{`Thinking`}</span>
              <span className={`ui-think__time`}>{formatDuration(elapsedSeconds)}</span>
            </>
          )}
        </span>
      </button>
      <div className={`ui-think__body`} data-open={expanded}>
        <ol className={`ui-think__list`} aria-live={`polite`}>
          {steps.slice(0, visibleSteps).map((e, t) => {
            let n = t === activeStep,
              i = e.kind === `search` && n ? (e.activeLabel ?? `Searching`) : e.label;
            return (
              <li className={`ui-think__item`} data-kind={e.kind} data-active={n || void 0} key={t}>
                <span className={`ui-think__node`} aria-hidden={`true`}>
                  {e.kind === `search` ? (
                    <svg viewBox={`0 0 24 24`} className={`ui-think__globe`}>
                      <path d={`M22 12A10 10 0 1 0 12 22`} />
                      <path
                        d={`M20 5.7c-.93.07-2.13.43-2.96 1.5-1.5 1.94-3 2.1-4 1.46-1.5-.97-.24-2.54-2-3.4-1.15-.56-1.31-2.07-.67-3.26`}
                      />
                      <path
                        d={`M2 11c.76.66 1.83 1.27 3.09 1.27 2.6 0 3.12.5 3.12 2.48s0 1.99.52 3.48c.34.97.46 1.94-.22 2.77`}
                      />
                      <path
                        d={`m19.9 19.93 2.1 2.07m-.89-4.95a4.05 4.05 0 1 1-8.11 0 4.05 4.05 0 0 1 8.11 0Z`}
                      />
                    </svg>
                  ) : (
                    <span className={`ui-think__dot`} />
                  )}
                </span>
                <div className={`ui-think__content`}>
                  <span
                    className={n ? `ui-think__label ui-think__shimmer` : `ui-think__label`}
                    data-text={i}
                  >
                    {i}
                  </span>
                  {e.kind === `search` && (
                    <div className={`ui-think__sources`}>
                      {[...e.sources, ...(expandedSources.has(t) ? (e.moreSources ?? []) : [])].map(
                        (t, n) => (
                          <ThinkingStep
                            source={t}
                            delay={
                              n < e.sources.length
                                ? 120 + n * sourceDelayMs
                                : (n - e.sources.length) * 70
                            }
                            key={t.label + n}
                          />
                        ),
                      )}
                      {e.moreSources?.length ? (
                        <button
                          type={`button`}
                          className={`ui-think__source ui-think__more`}
                          aria-expanded={expandedSources.has(t)}
                          style={{
                            animationDelay: `${120 + e.sources.length * sourceDelayMs}ms`,
                          }}
                          onClick={() => {
                            ((cancelled.current = true),
                              setExpandedSources((e) => {
                                let n = new Set(e);
                                return (n.has(t) ? n.delete(t) : n.add(t), n);
                              }));
                          }}
                        >
                          {expandedSources.has(t) ? `Show less` : `+${e.moreSources.length} more`}
                        </button>
                      ) : null}
                    </div>
                  )}
                </div>
              </li>
            );
          })}
          {done && (
            <li className={`ui-think__item`} data-kind={`done`}>
              <span className={`ui-think__node`} aria-hidden={`true`}>
                <svg viewBox={`0 0 24 24`} className={`ui-think__check`}>
                  <circle cx={`12`} cy={`12`} r={`10`} />
                  <path d={`M8 12.5l2.5 2.5L16 9`} />
                </svg>
              </span>
              <div className={`ui-think__content`}>
                <span className={`ui-think__label`}>{doneLabel}</span>
              </div>
            </li>
          )}
        </ol>
      </div>
    </div>
  );
}
function ThinkingStep({ source: source, delay: delay }: {source: ThinkingSource; delay: number}) {
  let n = source.tooltip ?? source.href?.replace(/^https?:\/\//, ``),
    i = (
      <>
        {source.icon && <span className={`ui-think__favicon`}>{source.icon}</span>}
        <span className={`ui-think__source-label`}>{source.label}</span>
        {n && (
          <span className={`ui-think__tip`} aria-hidden={`true`}>
            {n}
          </span>
        )}
      </>
    ),
    a = {
      className: `ui-think__source`,
      "data-count": !source.icon || void 0,
      style: {
        animationDelay: `${delay}ms`,
      },
    };
  return source.href ? (
    <a {...a} href={source.href} target={`_blank`} rel={`noreferrer`}>
      {i}
    </a>
  ) : (
    <span {...a}>{i}</span>
  );
}
var formatDuration = (e: number) =>
  e < 60 ? `${e}s` : `${Math.floor(e / 60)}m ${String(e % 60).padStart(2, `0`)}s`;
var thinkingStyles = `
/* Colors and motion as variables – override them on .ui-think (see Theming in the docs) */
.ui-think {
  --ui-tk-ink: #171717;
  --ui-tk-text: #525252;
  --ui-tk-muted: #8a8a8a;
  --ui-tk-line: #e5e5e5;
  --ui-tk-chip: #f0f0f0;
  --ui-tk-done: #2f6bff;
  --ui-tk-shine: rgba(255, 255, 255, 0.82);
  --ui-tk-dot: #b5b5b5;
  --ui-tk-chip-hover: #e6e6e6;
  --ui-tk-tip-text: #fff;
  --ui-tk-focus: rgba(23, 23, 23, 0.22);
  --ui-tk-ease: cubic-bezier(0.22, 1, 0.36, 1);

  width: 100%;
  max-width: 440px;
  font-family: "Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  font-size: 14px;
  line-height: 1.45;
  color: var(--ui-tk-text);
  -webkit-font-smoothing: antialiased;
}
.ui-think *,
.ui-think *::before,
.ui-think *::after {
  box-sizing: border-box;
}
.ui-think svg {
  display: block;
  width: 100%;
  height: 100%;
}

/* Header: chevron + "Thinking 4s" / "Worked for 18s" */
.ui-think__head {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin: 0 0 0 -4px;
  padding: 4px 8px 4px 4px;
  border: 0;
  border-radius: 8px;
  background: none;
  font: inherit;
  font-size: 15px;
  color: var(--ui-tk-muted);
  cursor: pointer;
  transition: background-color 160ms ease, color 160ms ease;
}
.ui-think__head:hover {
  background: var(--ui-tk-chip);
  color: var(--ui-tk-text);
}
.ui-think__head:focus-visible {
  outline: 2px solid var(--ui-tk-focus);
  outline-offset: 2px;
}
.ui-think__chevron {
  width: 18px;
  height: 18px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.6;
  stroke-linecap: round;
  stroke-linejoin: round;
  transform: rotate(-90deg);
  transition: transform 260ms var(--ui-tk-ease);
}
.ui-think__head[aria-expanded="true"] .ui-think__chevron {
  transform: none;
}
.ui-think__title {
  display: inline-flex;
  gap: 8px;
  animation: ui-think-in 420ms var(--ui-tk-ease) both;
}
.ui-think__time {
  font-variant-numeric: tabular-nums;
}

/* Body collapses smoothly */
.ui-think__body {
  display: grid;
  grid-template-rows: 1fr;
  transition: grid-template-rows 360ms var(--ui-tk-ease), opacity 260ms ease;
}
.ui-think__body[data-open="false"] {
  grid-template-rows: 0fr;
  opacity: 0;
}
.ui-think__body[data-open="false"] .ui-think__list {
  overflow: hidden;
}
.ui-think__list {
  min-height: 0;
  /* clips only while collapsed, so tooltips can reach out when open */
  overflow: visible;
  margin: 0;
  padding: 10px 0 0;
  list-style: none;
}

/* Timeline: icon column with a line growing down to the next node */
.ui-think__item {
  position: relative;
  display: grid;
  grid-template-columns: 20px minmax(0, 1fr);
  gap: 12px;
  padding-bottom: 12px;
  animation: ui-think-in 520ms var(--ui-tk-ease) both;
}
.ui-think__item:not(:last-child)::before {
  content: "";
  position: absolute;
  left: 9.5px;
  top: 24px;
  bottom: 2px;
  width: 1px;
  background: var(--ui-tk-line);
  transform-origin: top;
  animation: ui-think-line 520ms var(--ui-tk-ease) both;
}
.ui-think__node {
  display: grid;
  place-items: center;
  width: 20px;
  height: 21px;
}
.ui-think__globe {
  width: 18px !important;
  height: 18px !important;
  fill: none;
  stroke: var(--ui-tk-muted);
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.ui-think__dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--ui-tk-dot);
  transition: background-color 300ms ease, transform 300ms ease;
}
.ui-think__item[data-active] .ui-think__dot {
  background: var(--ui-tk-ink);
  animation: ui-think-pulse 1.2s ease-in-out infinite;
}
.ui-think__check {
  width: 18px !important;
  height: 18px !important;
  animation: ui-think-pop 460ms cubic-bezier(0.34, 1.56, 0.64, 1) both;
}
.ui-think__check circle {
  fill: var(--ui-tk-done);
}
.ui-think__check path {
  fill: none;
  stroke: #fff;
  stroke-width: 2.2;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 14;
  stroke-dashoffset: 14;
  animation: ui-think-draw 360ms var(--ui-tk-ease) 180ms forwards;
}

.ui-think__content {
  min-width: 0;
  padding-top: 0.5px;
}
.ui-think__label {
  display: inline-block;
  color: var(--ui-tk-muted);
  transition: color 300ms ease;
}
.ui-think__item[data-active] .ui-think__label,
.ui-think__item[data-kind="done"] .ui-think__label {
  color: var(--ui-tk-text);
}

/* Sources: chips pop in one after another */
.ui-think__sources {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 8px;
}
.ui-think__source {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  max-width: 100%;
  height: 28px;
  padding: 0 10px 0 6px;
  border-radius: 8px;
  background: var(--ui-tk-chip);
  font-size: 13px;
  color: var(--ui-tk-ink);
  animation: ui-think-chip 420ms var(--ui-tk-ease) both;
}
a.ui-think__source,
.ui-think__more {
  position: relative;
  border: 0;
  font: inherit;
  font-size: 13px;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 160ms ease, color 160ms ease;
}
a.ui-think__source:hover {
  background: var(--ui-tk-chip-hover);
}
.ui-think__more {
  padding: 0 10px;
  background: none;
  color: var(--ui-tk-muted);
}
.ui-think__more:hover {
  background: var(--ui-tk-chip);
  color: var(--ui-tk-ink);
}
a.ui-think__source:focus-visible,
.ui-think__more:focus-visible {
  outline: 2px solid var(--ui-tk-focus);
  outline-offset: 2px;
}

/* Tooltip above the chip */
.ui-think__tip {
  position: absolute;
  left: 50%;
  bottom: calc(100% + 6px);
  z-index: 2;
  padding: 4px 8px;
  border-radius: 6px;
  background: var(--ui-tk-ink);
  color: var(--ui-tk-tip-text);
  font-size: 12px;
  line-height: 1.3;
  white-space: nowrap;
  pointer-events: none;
  opacity: 0;
  transform: translate(-50%, 4px);
  transition: opacity 140ms ease, transform 200ms var(--ui-tk-ease);
}
.ui-think__source:hover .ui-think__tip,
.ui-think__source:focus-visible .ui-think__tip {
  opacity: 1;
  transform: translate(-50%, 0);
  transition-delay: 250ms;
}

.ui-think__source[data-count] {
  padding: 0 10px;
  background: none;
  color: var(--ui-tk-muted);
}
.ui-think__source-label {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.ui-think__favicon {
  display: grid;
  place-items: center;
  flex: none;
  width: 18px;
  height: 18px;
  border-radius: 5px;
  overflow: hidden;
}

/* Shimmer over the active label, like the loading states elsewhere */
.ui-think__shimmer {
  position: relative;
}
.ui-think__shimmer::after {
  content: attr(data-text);
  content: attr(data-text) / "";
  position: absolute;
  inset: 0;
  white-space: nowrap;
  color: transparent;
  background: linear-gradient(90deg, transparent 38%, var(--ui-tk-shine) 50%, transparent 62%) 100% 0 / 300% 100%
    no-repeat;
  -webkit-background-clip: text;
  background-clip: text;
  animation: ui-think-sweep 1.6s linear infinite;
  pointer-events: none;
}

@keyframes ui-think-in {
  from { opacity: 0; transform: translateY(6px); filter: blur(3px); }
  to { opacity: 1; transform: none; filter: none; }
}
@keyframes ui-think-line {
  from { transform: scaleY(0); }
  to { transform: scaleY(1); }
}
@keyframes ui-think-chip {
  from { opacity: 0; transform: translateY(4px) scale(0.92); }
  to { opacity: 1; transform: none; }
}
@keyframes ui-think-pulse {
  50% { transform: scale(0.7); opacity: 0.5; }
}
@keyframes ui-think-pop {
  0% { transform: scale(0.5); }
  60% { transform: scale(1.12); }
  100% { transform: scale(1); }
}
@keyframes ui-think-draw {
  to { stroke-dashoffset: 0; }
}
@keyframes ui-think-sweep {
  from { background-position: 100% 0; }
  to { background-position: 0% 0; }
}

@media (prefers-reduced-motion: reduce) {
  .ui-think *,
  .ui-think *::before,
  .ui-think *::after {
    animation-duration: 1ms !important;
    animation-delay: 0ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 1ms !important;
  }
  .ui-think__shimmer::after {
    display: none;
  }
  .ui-think__check path {
    stroke-dashoffset: 0;
  }
}

/* Dark mode: follows a .dark class or data-theme="dark" on any ancestor, e.g. <html> */
:where(.dark, [data-theme="dark"]) .ui-think {
  --ui-tk-ink: #ededed;
  --ui-tk-text: #c4c4c4;
  --ui-tk-muted: #8f8f8f;
  --ui-tk-line: rgba(255, 255, 255, 0.1);
  --ui-tk-chip: #2a2a2d;
  --ui-tk-chip-hover: #313135;
  --ui-tk-shine: rgba(255, 255, 255, 0.95);
  --ui-tk-dot: #5c5c61;
  --ui-tk-tip-text: #121213;
  --ui-tk-focus: rgba(255, 255, 255, 0.3);
}
`;
var ClaudeIcon: IconNode = [
  [
    `path`,
    {
      d: `M7 4.5C5.34315 4.5 4 5.84315 4 7.5C4 8.06866 4.15822 8.60037 4.43304 9.0535C3.04727 9.31855 2 10.537 2 12C2 13.463 3.04727 14.6814 4.43304 14.9465M7 4.5C7 3.11929 8.11929 2 9.5 2C10.8807 2 12 3.11929 12 4.5V19.5C12 20.8807 10.8807 22 9.5 22C8.11929 22 7 20.8807 7 19.5C5.34315 19.5 4 18.1569 4 16.5C4 15.9313 4.15822 15.3996 4.43304 14.9465M7 4.5C7 5.31791 7.39278 6.04408 8 6.50018M4.43304 14.9465C4.78948 14.3588 5.34207 13.9032 6 13.6707`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `0`,
    },
  ],
  [
    `path`,
    {
      d: `M17 19.4999C18.6569 19.4999 20 18.1567 20 16.4999C20 15.9312 19.8418 15.3995 19.567 14.9464C20.9527 14.6813 22 13.4629 22 11.9999C22 10.5369 20.9527 9.31843 19.567 9.05338M17 19.4999C17 20.8806 15.8807 21.9999 14.5 21.9999C13.1193 21.9999 12 20.8806 12 19.4999L12 4.49988C12 3.11917 13.1193 1.99988 14.5 1.99988C15.8807 1.99988 17 3.11917 17 4.49988C18.6569 4.49988 20 5.84302 20 7.49988C20 8.06854 19.8418 8.60024 19.567 9.05338M17 19.4999C17 18.682 16.6072 17.9558 16 17.4997M19.567 9.05338C19.2105 9.64109 18.6579 10.0966 18 10.3292`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `1`,
    },
  ],
];
var PresentationBarChart01Icon: IconNode = [
  [
    `path`,
    {
      d: `M12 18V22`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `0`,
    },
  ],
  [
    `path`,
    {
      d: `M10 18L5 22`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `1`,
    },
  ],
  [
    `path`,
    {
      d: `M14 18L19 22`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `2`,
    },
  ],
  [
    `path`,
    {
      d: `M2.5 12C2.5 14.8284 2.5 16.2426 3.37868 17.1213C4.25736 18 5.67157 18 8.5 18H15.5C18.3284 18 19.7426 18 20.6213 17.1213C21.5 16.2426 21.5 14.8284 21.5 12V8C21.5 5.17157 21.5 3.75736 20.6213 2.87868C19.7426 2 18.3284 2 15.5 2H8.5C5.67157 2 4.25736 2 3.37868 2.87868C2.5 3.75736 2.5 5.17157 2.5 8V12Z`,
      stroke: `currentColor`,
      strokeWidth: `1.5`,
      key: `3`,
    },
  ],
  [
    `path`,
    {
      d: `M8 13V10M12 13V7M16 13V11`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeWidth: `1.5`,
      key: `4`,
    },
  ],
];
var svgDefaults = {
  xmlns: `http://www.w3.org/2000/svg`,
  width: 24,
  height: 24,
  viewBox: `0 0 24 24`,
  fill: `none`,
};
var HugeiconsIcon = React.forwardRef<SVGSVGElement, HugeiconsProps>(
  (
    {
      color = `currentColor`,
      size = 24,
      strokeWidth: strokeWidth,
      absoluteStrokeWidth = false,
      className = ``,
      altIcon: altIcon,
      showAlt = false,
      icon: icon,
      primaryColor: primaryColor,
      secondaryColor: secondaryColor,
      disableSecondaryOpacity = false,
      ...p
    },
    m,
  ) => {
    let h =
        strokeWidth === void 0
          ? void 0
          : absoluteStrokeWidth
            ? (Number(strokeWidth) * 24) / Number(size)
            : strokeWidth,
      g =
        h === void 0
          ? {}
          : {
              strokeWidth: h,
              stroke: `currentColor`,
            },
      _: React.SVGProps<SVGSVGElement> = {
        ref: m,
        ...svgDefaults,
        width: size,
        height: size,
        color: primaryColor || color,
        className: className,
        ...g,
        ...p,
      },
      v = [...(showAlt && altIcon ? altIcon : icon)]
        .sort(([, e], [, t]) => {
          let n = e.opacity !== void 0;
          return t.opacity === void 0 ? (n ? -1 : 0) : 1;
        })
        .map(([n, r]) => {
          let i = r.opacity !== void 0,
            a = i && !disableSecondaryOpacity ? r.opacity : void 0,
            o = secondaryColor
              ? {
                  ...(r.stroke === void 0
                    ? {
                        fill: i ? secondaryColor : primaryColor || color,
                      }
                    : {
                        stroke: i ? secondaryColor : primaryColor || color,
                      }),
                }
              : {};
          return React.createElement(n, {
            ...r,
            ...g,
            ...o,
            opacity: a,
            key: r.key,
          });
        });
    return React.createElement(`svg`, _, v);
  },
);
function SetupGuide({
  title = `Setup guide`,
  groups: groups,
  onEdit: onEdit,
  onClose: onClose,
  onChange: onChange,
  className: className,
}: SetupGuideProps) {
  let [completedTaskIds, setCompletedTaskIds] = React.useState(
      () => new Set(groups.flatMap((e) => e.tasks.filter((e) => e.done).map((e) => e.id))),
    ),
    firstIncompleteGroup = groups.find((e) => e.tasks.some((e) => !completedTaskIds.has(e.id))),
    [expandedGroup, setExpandedGroup] = React.useState(firstIncompleteGroup?.id ?? null),
    [minimized, setMinimized] = React.useState(false),
    totalTasks = groups.reduce((e, t) => e + t.tasks.length, 0),
    progress = totalTasks ? completedTaskIds.size / totalTasks : 0,
    toggleTask = (e: SetupGroup, n: string) => {
      let r = new Set(completedTaskIds);
      if (
        (r.has(n) ? r.delete(n) : r.add(n),
        setCompletedTaskIds(r),
        onChange?.([...r]),
        e.tasks.every((e) => r.has(e.id)))
      ) {
        let e = groups.find((e) => e.tasks.some((e) => !r.has(e.id)));
        window.setTimeout(() => setExpandedGroup(e?.id ?? null), 420);
      }
    };
  return (
    <>
      <style href={`ui-setup-guide`} precedence={`default`}>
        {setupGuideStyles}
      </style>
      <section className={[`ui-sg`, className].filter(Boolean).join(` `)} aria-label={title}>
        <header className={`ui-sg__head`}>
          <h3 className={`ui-sg__title`}>{title}</h3>
          <div className={`ui-sg__actions`}>
            {onEdit && (
              <button type={`button`} className={`ui-sg__edit`} onClick={onEdit}>{`Edit`}</button>
            )}
            <button
              type={`button`}
              className={`ui-sg__icon-btn`}
              aria-label={minimized ? `Expand setup guide` : `Minimize setup guide`}
              aria-expanded={!minimized}
              onClick={() => setMinimized((e) => !e)}
            >
              {minimized ? <ChevronDownIcon2 /> : <ChevronUpIcon />}
            </button>
            {onClose && (
              <button
                type={`button`}
                className={`ui-sg__icon-btn`}
                aria-label={`Close setup guide`}
                onClick={onClose}
              >
                <CloseIcon2 />
              </button>
            )}
          </div>
        </header>
        <span
          className={`ui-sg__track`}
          role={`progressbar`}
          aria-label={`${title} progress`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress * 100)}
        >
          <span
            className={`ui-sg__fill`}
            style={{
              transform: `scaleX(${progress})`,
            }}
          />
        </span>
        <div className={`ui-sg__body`} data-hidden={minimized || void 0}>
          <div className={`ui-sg__groups`}>
            {groups.map((e) => {
              let t = expandedGroup === e.id,
                n = e.tasks.every((e) => completedTaskIds.has(e.id)),
                i = e.tasks.find((e) => !completedTaskIds.has(e.id))?.id,
                o = e.tasks.findIndex((e) => e.id === i),
                s = `ui-sg-${e.id}`;
              return (
                <div className={`ui-sg__group`} data-open={t || void 0} key={e.id}>
                  <button
                    type={`button`}
                    className={`ui-sg__group-head`}
                    aria-expanded={t}
                    aria-controls={s}
                    onClick={() => setExpandedGroup(t ? null : e.id)}
                  >
                    <span className={`ui-sg__group-title`} data-done={n || void 0}>
                      {e.title}
                    </span>
                    <TaskMark />
                  </button>
                  <div className={`ui-sg__panel`} id={s} inert={!t}>
                    <ul className={`ui-sg__tasks`}>
                      {e.tasks.map((t, n) => {
                        let i = completedTaskIds.has(t.id),
                          a = !i && o !== -1 && n > o,
                          s = i ? `done` : a ? `locked` : `current`;
                        return (
                          <li key={t.id}>
                            <button
                              type={`button`}
                              className={`ui-sg__task`}
                              data-state={s}
                              disabled={a}
                              aria-pressed={i}
                              onClick={() => toggleTask(e, t.id)}
                            >
                              <span className={`ui-sg__mark`} aria-hidden={`true`}>
                                {s === `done` ? (
                                  <SetupProgressIcon />
                                ) : s === `locked` ? (
                                  <CheckIcon2 />
                                ) : null}
                              </span>
                              <span className={`ui-sg__task-label`}>{t.label}</span>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
var TaskMark = () => (
  <svg
    className={`ui-sg__chevron`}
    viewBox={`0 0 16 16`}
    fill={`none`}
    stroke={`currentColor`}
    strokeWidth={`1.6`}
    strokeLinecap={`round`}
    strokeLinejoin={`round`}
    aria-hidden={`true`}
  >
    <path d={`m4.5 6.25 3.5 3.5 3.5-3.5`} />
  </svg>
);
var ChevronUpIcon = () => (
  <svg
    viewBox={`0 0 16 16`}
    fill={`none`}
    stroke={`currentColor`}
    strokeWidth={`1.5`}
    strokeLinecap={`round`}
    strokeLinejoin={`round`}
    aria-hidden={`true`}
  >
    <path d={`M9.5 2.5v4h4M9.5 6.5l4.5-4.5M6.5 13.5v-4h-4M6.5 9.5 2 14`} />
  </svg>
);
var ChevronDownIcon2 = () => (
  <svg
    viewBox={`0 0 16 16`}
    fill={`none`}
    stroke={`currentColor`}
    strokeWidth={`1.5`}
    strokeLinecap={`round`}
    strokeLinejoin={`round`}
    aria-hidden={`true`}
  >
    <path d={`M10 2h4v4M14 2 9.5 6.5M6 14H2v-4M2 14l4.5-4.5`} />
  </svg>
);
var CloseIcon2 = () => (
  <svg
    viewBox={`0 0 16 16`}
    fill={`none`}
    stroke={`currentColor`}
    strokeWidth={`1.5`}
    strokeLinecap={`round`}
    aria-hidden={`true`}
  >
    <path d={`m3.5 3.5 9 9M12.5 3.5l-9 9`} />
  </svg>
);
var SetupProgressIcon = () => (
  <svg viewBox={`0 0 16 16`} aria-hidden={`true`}>
    <circle cx={`8`} cy={`8`} r={`7`} fill={`currentColor`} />
    <path
      d={`m5 8.2 2 2 4-4.2`}
      fill={`none`}
      stroke={`#fff`}
      strokeWidth={`1.6`}
      strokeLinecap={`round`}
      strokeLinejoin={`round`}
    />
  </svg>
);
var CheckIcon2 = () => (
  <svg
    viewBox={`0 0 16 16`}
    fill={`none`}
    stroke={`currentColor`}
    strokeWidth={`1.5`}
    aria-hidden={`true`}
  >
    <circle cx={`8`} cy={`8`} r={`6`} />
    <path d={`m4 12 8-8`} />
  </svg>
);
var setupGuideStyles = `
.ui-sg {
  --ui-sg-card: #ffffff;
  --ui-sg-line: #ececec;
  --ui-sg-ink: #171717;
  --ui-sg-text: #262626;
  --ui-sg-muted: #a3a3a3;
  --ui-sg-icon: #737373;
  --ui-sg-track: #ececec;
  --ui-sg-accent: #2f6bff;
  --ui-sg-open: #f6f6f7;
  --ui-sg-dot: #e1e3e8;
  --ui-sg-ease: cubic-bezier(0.22, 1, 0.36, 1);
  box-sizing: border-box;
  width: 100%;
  max-width: 320px;
  padding: 16px 8px 8px;
  background: var(--ui-sg-card);
  border: 1px solid var(--ui-sg-line);
  border-radius: 20px;
  box-shadow:
    0 1px 2px rgba(0, 0, 0, 0.03),
    0 8px 24px rgba(0, 0, 0, 0.035);
  font-family: "Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  color: var(--ui-sg-ink);
  -webkit-font-smoothing: antialiased;
}
.ui-sg *, .ui-sg *::before, .ui-sg *::after { box-sizing: border-box; }
.ui-sg button {
  margin: 0;
  border: 0;
  background: none;
  font: inherit;
  color: inherit;
  cursor: pointer;
}
.ui-sg button:focus-visible {
  outline: 2px solid var(--ui-sg-accent);
  outline-offset: 2px;
}

.ui-sg__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 0 8px;
}
.ui-sg__title {
  margin: 0;
  font-size: 15px;
  font-weight: 600;
  line-height: 22px;
}
.ui-sg__actions {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-right: -4px;
}
.ui-sg__edit {
  padding: 2px 6px;
  border-radius: 6px;
  font-size: 14px;
  line-height: 20px;
  color: var(--ui-sg-accent) !important;
  transition: opacity 160ms ease;
}
.ui-sg__edit:hover { opacity: 0.75; }
.ui-sg__icon-btn {
  display: grid;
  place-items: center;
  width: 26px;
  height: 26px;
  border-radius: 7px;
  color: var(--ui-sg-icon) !important;
  transition: background-color 160ms ease, color 160ms ease;
}
.ui-sg__icon-btn:hover { background: #f2f2f2 !important; color: var(--ui-sg-ink) !important; }
.ui-sg__icon-btn svg { width: 16px; height: 16px; }

/* One continuous bar for all tasks */
.ui-sg__track {
  display: block;
  height: 5px;
  margin: 10px 8px 8px;
  overflow: hidden;
  border-radius: 3px;
  background: var(--ui-sg-track);
}
.ui-sg__fill {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: var(--ui-sg-accent);
  transform-origin: left center;
  transition: transform 700ms var(--ui-sg-ease);
}

/* Minimize folds the whole list away */
.ui-sg__body {
  display: grid;
  grid-template-rows: 1fr;
  transition: grid-template-rows 420ms var(--ui-sg-ease), opacity 260ms ease;
}
.ui-sg__body[data-hidden] { grid-template-rows: 0fr; opacity: 0; }
.ui-sg__groups { min-height: 0; overflow: hidden; }

.ui-sg__group {
  border-radius: 12px;
  transition: background-color 260ms ease;
}
.ui-sg__group[data-open] { background: var(--ui-sg-open); }
.ui-sg__group-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  width: 100%;
  padding: 11px 12px;
  border-radius: 12px;
  text-align: left;
}
.ui-sg__group-title {
  position: relative;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  transition: color 300ms ease;
}
/* Finished: a line draws through the title */
.ui-sg__group-title::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: 52%;
  height: 1.5px;
  border-radius: 1px;
  background: currentColor;
  transform: scaleX(0);
  transform-origin: left center;
  transition: transform 420ms var(--ui-sg-ease);
}
.ui-sg__group-title[data-done]::after { transform: scaleX(1); }
.ui-sg__chevron {
  flex: none;
  width: 16px;
  height: 16px;
  color: var(--ui-sg-icon);
  transition: transform 320ms var(--ui-sg-ease);
}
.ui-sg__group[data-open] .ui-sg__chevron { transform: rotate(180deg); }

/* Each group is a dropdown */
.ui-sg__panel {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 380ms var(--ui-sg-ease);
}
.ui-sg__group[data-open] .ui-sg__panel { grid-template-rows: 1fr; }
.ui-sg__tasks {
  min-height: 0;
  overflow: hidden;
  margin: 0;
  padding: 0;
  list-style: none;
}
.ui-sg__tasks li:last-child { padding-bottom: 8px; }
.ui-sg__task {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  width: 100%;
  padding: 7px 12px;
  border-radius: 10px;
  text-align: left;
  opacity: 0;
  transform: translateY(-4px);
  transition: opacity 260ms ease, transform 320ms var(--ui-sg-ease), color 260ms ease;
}
.ui-sg__group[data-open] .ui-sg__task { opacity: 1; transform: none; transition-delay: 80ms; }
.ui-sg__task[data-state="current"] { color: var(--ui-sg-text); }
.ui-sg__task[data-state="current"]:hover .ui-sg__mark { background: #d3d7de; }
.ui-sg__task[data-state="locked"] { color: var(--ui-sg-muted); cursor: default; }
.ui-sg__task[data-state="done"] { color: var(--ui-sg-muted); }
.ui-sg__mark {
  display: grid;
  place-items: center;
  flex: none;
  width: 16px;
  height: 16px;
  margin-top: 2px;
  border-radius: 50%;
  transition: background-color 200ms ease;
}
.ui-sg__task[data-state="current"] .ui-sg__mark { background: var(--ui-sg-dot); }
.ui-sg__task[data-state="locked"] .ui-sg__mark { color: #d4d4d4; }
.ui-sg__task[data-state="done"] .ui-sg__mark { color: var(--ui-sg-accent); }
.ui-sg__mark svg { width: 16px; height: 16px; }
.ui-sg__task[data-state="done"] .ui-sg__mark svg { animation: ui-sg-pop 420ms var(--ui-sg-ease); }
.ui-sg__task-label {
  font-size: 14px;
  line-height: 20px;
  text-decoration-line: line-through;
  text-decoration-color: transparent;
  text-decoration-thickness: 1.5px;
  transition: text-decoration-color 260ms ease;
}
.ui-sg__task[data-state="done"] .ui-sg__task-label { text-decoration-color: currentColor; }

@keyframes ui-sg-pop {
  from { transform: scale(0.5); opacity: 0; }
}

@media (prefers-reduced-motion: reduce) {
  .ui-sg__fill, .ui-sg__body, .ui-sg__panel, .ui-sg__task, .ui-sg__chevron, .ui-sg__group-title::after { transition: none; }
  .ui-sg__mark svg { animation: none !important; }
}

/* Dark mode: follows a .dark class or data-theme="dark" on any ancestor, e.g. <html> */
:where(.dark, [data-theme="dark"]) .ui-sg {
  --ui-sg-card: #232326;
  --ui-sg-line: rgba(255, 255, 255, 0.08);
  --ui-sg-ink: #ededed;
  --ui-sg-text: #dcdcdc;
  --ui-sg-muted: #8f8f8f;
  --ui-sg-icon: #8f8f8f;
  --ui-sg-track: rgba(255, 255, 255, 0.1);
  --ui-sg-open: #2a2a2d;
  --ui-sg-dot: #3a3a3f;
  box-shadow:
    0 1px 2px rgba(0, 0, 0, 0.4),
    0 8px 24px rgba(0, 0, 0, 0.35);
}
:where(.dark, [data-theme="dark"]) .ui-sg__edit { color: #6b95ff !important; }
:where(.dark, [data-theme="dark"]) .ui-sg__icon-btn:hover { background: rgba(255, 255, 255, 0.06) !important; }
:where(.dark, [data-theme="dark"]) .ui-sg__task[data-state="current"]:hover .ui-sg__mark { background: #4a4a50; }
:where(.dark, [data-theme="dark"]) .ui-sg__task[data-state="locked"] .ui-sg__mark { color: #4a4a50; }
`;
var ChevronDownIcon: IconNode = [
  [
    `path`,
    {
      d: `M18 9.00005C18 9.00005 13.5811 15 12 15C10.4188 15 6 9 6 9`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `0`,
    },
  ],
];
var ChevronRightIcon: IconNode = [
  [
    `path`,
    {
      d: `M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `0`,
    },
  ],
];
var CloseIcon: IconNode = [
  [
    `path`,
    {
      d: `M18 6L6.00081 17.9992M17.9992 18L6 6.00085`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `0`,
    },
  ],
];
var GridIcon: IconNode = [
  [
    `path`,
    {
      d: `M10.5 8.75V6.75C10.5 5.10626 10.5 4.28439 10.046 3.73121C9.96291 3.62995 9.87005 3.53709 9.76879 3.45398C9.21561 3 8.39374 3 6.75 3C5.10626 3 4.28439 3 3.73121 3.45398C3.62995 3.53709 3.53709 3.62995 3.45398 3.73121C3 4.28439 3 5.10626 3 6.75V8.75C3 10.3937 3 11.2156 3.45398 11.7688C3.53709 11.8701 3.62995 11.9629 3.73121 12.046C4.28439 12.5 5.10626 12.5 6.75 12.5C8.39374 12.5 9.21561 12.5 9.76879 12.046C9.87005 11.9629 9.96291 11.8701 10.046 11.7688C10.5 11.2156 10.5 10.3937 10.5 8.75Z`,
      stroke: `currentColor`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `0`,
    },
  ],
  [
    `path`,
    {
      d: `M7.75 15.5H5.75C5.05222 15.5 4.70333 15.5 4.41943 15.5861C3.78023 15.78 3.28002 16.2802 3.08612 16.9194C3 17.2033 3 17.5522 3 18.25C3 18.9478 3 19.2967 3.08612 19.5806C3.28002 20.2198 3.78023 20.72 4.41943 20.9139C4.70333 21 5.05222 21 5.75 21H7.75C8.44778 21 8.79667 21 9.08057 20.9139C9.71977 20.72 10.22 20.2198 10.4139 19.5806C10.5 19.2967 10.5 18.9478 10.5 18.25C10.5 17.5522 10.5 17.2033 10.4139 16.9194C10.22 16.2802 9.71977 15.78 9.08057 15.5861C8.79667 15.5 8.44778 15.5 7.75 15.5Z`,
      stroke: `currentColor`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `1`,
    },
  ],
  [
    `path`,
    {
      d: `M21 17.25V15.25C21 13.6063 21 12.7844 20.546 12.2312C20.4629 12.1299 20.3701 12.0371 20.2688 11.954C19.7156 11.5 18.8937 11.5 17.25 11.5C15.6063 11.5 14.7844 11.5 14.2312 11.954C14.1299 12.0371 14.0371 12.1299 13.954 12.2312C13.5 12.7844 13.5 13.6063 13.5 15.25V17.25C13.5 18.8937 13.5 19.7156 13.954 20.2688C14.0371 20.3701 14.1299 20.4629 14.2312 20.546C14.7844 21 15.6063 21 17.25 21C18.8937 21 19.7156 21 20.2688 20.546C20.3701 20.4629 20.4629 20.3701 20.546 20.2688C21 19.7156 21 18.8937 21 17.25Z`,
      stroke: `currentColor`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `2`,
    },
  ],
  [
    `path`,
    {
      d: `M18.25 3H16.25C15.5522 3 15.2033 3 14.9194 3.08612C14.2802 3.28002 13.78 3.78023 13.5861 4.41943C13.5 4.70333 13.5 5.05222 13.5 5.75C13.5 6.44778 13.5 6.79667 13.5861 7.08057C13.78 7.71977 14.2802 8.21998 14.9194 8.41388C15.2033 8.5 15.5522 8.5 16.25 8.5H18.25C18.9478 8.5 19.2967 8.5 19.5806 8.41388C20.2198 8.21998 20.72 7.71977 20.9139 7.08057C21 6.79667 21 6.44778 21 5.75C21 5.05222 21 4.70333 20.9139 4.41943C20.72 3.78023 20.2198 3.28002 19.5806 3.08612C19.2967 3 18.9478 3 18.25 3Z`,
      stroke: `currentColor`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `3`,
    },
  ],
];
var FilesIcon: IconNode = [
  [
    `path`,
    {
      d: `M8 7H16.75C18.8567 7 19.91 7 20.6667 7.50559C20.9943 7.72447 21.2755 8.00572 21.4944 8.33329C22 9.08996 22 10.1433 22 12.25C22 15.7612 22 17.5167 21.1573 18.7779C20.7926 19.3238 20.3238 19.7926 19.7779 20.1573C18.5167 21 16.7612 21 13.25 21H12C7.28595 21 4.92893 21 3.46447 19.5355C2 18.0711 2 15.714 2 11V7.94427C2 6.1278 2 5.21956 2.38032 4.53806C2.65142 4.05227 3.05227 3.65142 3.53806 3.38032C4.21956 3 5.1278 3 6.94427 3C8.10802 3 8.6899 3 9.19926 3.19101C10.3622 3.62712 10.8418 4.68358 11.3666 5.73313L12 7`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeWidth: `1.5`,
      key: `0`,
    },
  ],
];
var FolderIcon: IconNode = [
  [
    `path`,
    {
      d: `M2.5 20V8.87695C2.5 7.58945 2.5 6.9457 2.78533 6.47048C2.9541 6.18939 3.18939 5.9541 3.47048 5.78533C3.9457 5.5 4.59449 5.5 5.89206 5.5C6.52339 5.5 6.83906 5.5 7.12612 5.58819C7.31759 5.64702 7.49914 5.73428 7.66469 5.84705C7.91289 6.01611 8.10859 6.26074 8.5 6.75C8.89141 7.23926 9.08711 7.48389 9.33531 7.65295C9.50086 7.76572 9.68241 7.85298 9.87388 7.91181C10.1609 8 10.4742 8 11.1008 8H15C16.4045 8 17.1067 8 17.6111 8.33706C17.8295 8.48298 18.017 8.67048 18.1629 8.88886C18.5 9.39331 18.5 10.0955 18.5 11.5`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `0`,
    },
  ],
  [
    `path`,
    {
      d: `M4.42028 14.0144L3.63368 16.0144C2.65618 18.4998 2.16743 19.7425 2.7524 20.6213C3.33737 21.5 4.65337 21.5 7.28537 21.5H15.1903C16.4249 21.5 17.0422 21.5 17.5295 21.1795C18.0169 20.859 18.2702 20.2865 18.7769 19.1415L19.6618 17.1415C20.7866 14.5992 21.349 13.3281 20.7679 12.4141C20.1868 11.5 18.8163 11.5 16.0752 11.5H8.07196C6.78232 11.5 6.1375 11.5 5.63811 11.8439C5.13872 12.1877 4.89924 12.7966 4.42028 14.0144Z`,
      stroke: `currentColor`,
      strokeWidth: `1.5`,
      key: `1`,
    },
  ],
  [
    `path`,
    {
      d: `M11.5 4.51456C12.4151 3.28409 13.6662 2.55594 15.5125 2.50161C16.1155 2.48386 16.7152 2.61395 17.2682 2.85544C18.5748 3.42601 19.4185 4.15644 20 5.5L21.5 3`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `2`,
    },
  ],
];
var NotificationIcon: IconNode = [
  [
    `circle`,
    {
      cx: `12`,
      cy: `12`,
      r: `10`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `0`,
    },
  ],
  [
    `path`,
    {
      d: `M9.5 9.5C9.5 8.11929 10.6193 7 12 7C13.3807 7 14.5 8.11929 14.5 9.5C14.5 10.3569 14.0689 11.1131 13.4117 11.5636C12.7283 12.0319 12 12.6716 12 13.5`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `1`,
    },
  ],
  [
    `path`,
    {
      d: `M12.125 16.75H12M12.25 16.75C12.25 16.8881 12.1381 17 12 17C11.8619 17 11.75 16.8881 11.75 16.75C11.75 16.6119 11.8619 16.5 12 16.5C12.1381 16.5 12.25 16.6119 12.25 16.75Z`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `2`,
    },
  ],
];
var MailIcon: IconNode = [
  [
    `path`,
    {
      d: `M15.5 8.04045C15.4588 6.87972 15.3216 6.15451 14.8645 5.58671C14.2114 4.77536 13.0944 4.52064 10.8605 4.01121L9.85915 3.78286C6.4649 3.00882 4.76777 2.6218 3.63388 3.51317C2.5 4.40454 2.5 6.1257 2.5 9.56803V14.432C2.5 17.8743 2.5 19.5955 3.63388 20.4868C4.76777 21.3782 6.4649 20.9912 9.85915 20.2171L10.8605 19.9888C13.0944 19.4794 14.2114 19.2246 14.8645 18.4133C15.3216 17.8455 15.4588 17.1203 15.5 15.9595`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `0`,
    },
  ],
  [
    `path`,
    {
      d: `M18.5 9.01172C18.5 9.01172 21.5 11.2212 21.5 12.0117C21.5 12.8023 18.5 15.0117 18.5 15.0117M21 12.0117H8.49998`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `1`,
    },
  ],
];
var EditIcon: IconNode = [
  [
    `path`,
    {
      d: `M16.4249 4.60509L17.4149 3.6151C18.2351 2.79497 19.5648 2.79497 20.3849 3.6151C21.205 4.43524 21.205 5.76493 20.3849 6.58507L19.3949 7.57506M16.4249 4.60509L9.76558 11.2644C9.25807 11.772 8.89804 12.4078 8.72397 13.1041L8 16L10.8959 15.276C11.5922 15.102 12.228 14.7419 12.7356 14.2344L19.3949 7.57506M16.4249 4.60509L19.3949 7.57506`,
      stroke: `currentColor`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `0`,
    },
  ],
  [
    `path`,
    {
      d: `M18.9999 13.5C18.9999 16.7875 18.9999 18.4312 18.092 19.5376C17.9258 19.7401 17.7401 19.9258 17.5375 20.092C16.4312 21 14.7874 21 11.4999 21H11C7.22876 21 5.34316 21 4.17159 19.8284C3.00003 18.6569 3 16.7712 3 13V12.5C3 9.21252 3 7.56879 3.90794 6.46244C4.07417 6.2599 4.2599 6.07417 4.46244 5.90794C5.56879 5 7.21252 5 10.5 5`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `1`,
    },
  ],
];
var PlusIcon: IconNode = [
  [
    `path`,
    {
      d: `M12 4V20M20 12H4`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `0`,
    },
  ],
];
var SearchIcon: IconNode = [
  [
    `path`,
    {
      d: `M17 17L21 21`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `0`,
    },
  ],
  [
    `path`,
    {
      d: `M19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C15.4183 19 19 15.4183 19 11Z`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `1`,
    },
  ],
];
var SettingsIcon: IconNode = [
  [
    `path`,
    {
      d: `M21.3175 7.14139L20.8239 6.28479C20.4506 5.63696 20.264 5.31305 19.9464 5.18388C19.6288 5.05472 19.2696 5.15664 18.5513 5.36048L17.3311 5.70418C16.8725 5.80994 16.3913 5.74994 15.9726 5.53479L15.6357 5.34042C15.2766 5.11043 15.0004 4.77133 14.8475 4.37274L14.5136 3.37536C14.294 2.71534 14.1842 2.38533 13.9228 2.19657C13.6615 2.00781 13.3143 2.00781 12.6199 2.00781H11.5051C10.8108 2.00781 10.4636 2.00781 10.2022 2.19657C9.94085 2.38533 9.83106 2.71534 9.61149 3.37536L9.27753 4.37274C9.12465 4.77133 8.84845 5.11043 8.48937 5.34042L8.15249 5.53479C7.73374 5.74994 7.25259 5.80994 6.79398 5.70418L5.57375 5.36048C4.85541 5.15664 4.49625 5.05472 4.17867 5.18388C3.86109 5.31305 3.67445 5.63696 3.30115 6.28479L2.80757 7.14139C2.45766 7.74864 2.2827 8.05227 2.31666 8.37549C2.35061 8.69871 2.58483 8.95918 3.05326 9.48012L4.0843 10.6328C4.3363 10.9518 4.51521 11.5078 4.51521 12.0077C4.51521 12.5078 4.33636 13.0636 4.08433 13.3827L3.05326 14.5354C2.58483 15.0564 2.35062 15.3168 2.31666 15.6401C2.2827 15.9633 2.45766 16.2669 2.80757 16.8741L3.30114 17.7307C3.67443 18.3785 3.86109 18.7025 4.17867 18.8316C4.49625 18.9608 4.85542 18.8589 5.57377 18.655L6.79394 18.3113C7.25263 18.2055 7.73387 18.2656 8.15267 18.4808L8.4895 18.6752C8.84851 18.9052 9.12464 19.2442 9.2775 19.6428L9.61149 20.6403C9.83106 21.3003 9.94085 21.6303 10.2022 21.8191C10.4636 22.0078 10.8108 22.0078 11.5051 22.0078H12.6199C13.3143 22.0078 13.6615 22.0078 13.9228 21.8191C14.1842 21.6303 14.294 21.3003 14.5136 20.6403L14.8476 19.6428C15.0004 19.2442 15.2765 18.9052 15.6356 18.6752L15.9724 18.4808C16.3912 18.2656 16.8724 18.2055 17.3311 18.3113L18.5513 18.655C19.2696 18.8589 19.6288 18.9608 19.9464 18.8316C20.264 18.7025 20.4506 18.3785 20.8239 17.7307L21.3175 16.8741C21.6674 16.2669 21.8423 15.9633 21.8084 15.6401C21.7744 15.3168 21.5402 15.0564 21.0718 14.5354L20.0407 13.3827C19.7887 13.0636 19.6098 12.5078 19.6098 12.0077C19.6098 11.5078 19.7888 10.9518 20.0407 10.6328L21.0718 9.48012C21.5402 8.95918 21.7744 8.69871 21.8084 8.37549C21.8423 8.05227 21.6674 7.74864 21.3175 7.14139Z`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeWidth: `1.5`,
      key: `0`,
    },
  ],
  [
    `path`,
    {
      d: `M15.5195 12C15.5195 13.933 13.9525 15.5 12.0195 15.5C10.0865 15.5 8.51953 13.933 8.51953 12C8.51953 10.067 10.0865 8.5 12.0195 8.5C13.9525 8.5 15.5195 10.067 15.5195 12Z`,
      stroke: `currentColor`,
      strokeWidth: `1.5`,
      key: `1`,
    },
  ],
];
var SidebarIcon: IconNode = [
  [
    `path`,
    {
      d: `M2 12C2 8.31087 2 6.4663 2.81382 5.15877C3.1149 4.67502 3.48891 4.25427 3.91891 3.91554C5.08116 3 6.72077 3 10 3H14C17.2792 3 18.9188 3 20.0811 3.91554C20.5111 4.25427 20.8851 4.67502 21.1862 5.15877C22 6.4663 22 8.31087 22 12C22 15.6891 22 17.5337 21.1862 18.8412C20.8851 19.325 20.5111 19.7457 20.0811 20.0845C18.9188 21 17.2792 21 14 21H10C6.72077 21 5.08116 21 3.91891 20.0845C3.48891 19.7457 3.1149 19.325 2.81382 18.8412C2 17.5337 2 15.6891 2 12Z`,
      stroke: `currentColor`,
      strokeWidth: `1.5`,
      key: `0`,
    },
  ],
  [
    `path`,
    {
      d: `M9.5 3L9.5 21`,
      stroke: `currentColor`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `1`,
    },
  ],
  [
    `path`,
    {
      d: `M5 7H6M5 10H6`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `2`,
    },
  ],
];
var CheckIcon: IconNode = [
  [
    `path`,
    {
      d: `M5 14L8.5 17.5L19 6.5`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `0`,
    },
  ],
];
var UserIcon: IconNode = [
  [
    `path`,
    {
      d: `M20 21.0001C19.713 17.269 16.7289 14.3151 12.995 14.0662L12 13.9999C11.6446 14.0096 11.3134 14.0225 11.0008 14.0378C7.3 14.2192 4.28417 17.3057 4 21.0001`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `0`,
    },
  ],
  [
    `circle`,
    {
      cx: `12`,
      cy: `6.99988`,
      r: `4`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `1`,
    },
  ],
];
var Icon = ({
  icon: icon,
  size = 16,
  stroke = 1.9,
  color = `currentColor`,
}: {
  icon: IconNode;
  size?: number;
  stroke?: number;
  color?: string;
}) => (
  <HugeiconsIcon icon={icon} size={size} strokeWidth={stroke} color={color} aria-hidden={true} />
);
var defaultNavigation = [
  {
    label: `New chat`,
    icon: EditIcon,
  },
  {
    label: `Folders`,
    icon: FilesIcon,
  },
  {
    label: `Integrations`,
    icon: GridIcon,
  },
];
var defaultProjects = [`Q3 Campaign`, `Brand assets`, `Hiring`, `Research`];
var defaultSetup = [
  {
    id: `workspace`,
    title: `Set up your workspace`,
    tasks: [
      {
        id: `name`,
        label: `Name your workspace`,
        done: true,
      },
      {
        id: `invite`,
        label: `Invite your teammates`,
      },
      {
        id: `connect`,
        label: `Connect your first app`,
      },
    ],
  },
  {
    id: `work`,
    title: `Start working`,
    tasks: [
      {
        id: `folder`,
        label: `Create a folder`,
      },
      {
        id: `chat`,
        label: `Start your first chat`,
      },
      {
        id: `upload`,
        label: `Upload a file`,
      },
    ],
  },
  {
    id: `profile`,
    title: `Make it yours`,
    tasks: [
      {
        id: `avatar`,
        label: `Add a profile picture`,
      },
      {
        id: `notify`,
        label: `Choose your notifications`,
      },
    ],
  },
];
var sidebarBreakpoint = 900;
var setupProgressLabel = (e: number) =>
  e >= 100 ? `All done!` : e >= 60 ? `Almost there!` : e > 0 ? `Great start!` : `Let's go!`;
function AppShell({
  children: children,
  active: active,
  onNavigate: onNavigate,
  workspace = `Acme`,
  user = {
    name: `Alex Morgan`,
  },
  nav = defaultNavigation,
  projects = defaultProjects,
  groups: groups,
  setup = defaultSetup,
  className: className,
}: AppShellProps) {
  let [newsCount, setNewsCount] = React.useState(2),
    [collapsed, setCollapsed] = React.useState(false),
    shellRef = React.useRef<HTMLDivElement | null>(null),
    [isCompact, setIsCompact] = React.useState(false),
    [drawerOpen, setDrawerOpen] = React.useState(false);
  (React.useLayoutEffect(() => {
    let e = shellRef.current;
    if (!e) return;
    let t = () => setIsCompact(e.offsetWidth <= sidebarBreakpoint);
    t();
    let n = new ResizeObserver(t);
    return (n.observe(e), () => n.disconnect());
  }, []),
    React.useEffect(() => {
      isCompact || setDrawerOpen(false);
    }, [isCompact]));
  let sidebarInert = isCompact ? !drawerOpen : collapsed,
    navigate = (e: string) => {
      (setDrawerOpen(false), onNavigate?.(e));
    },
    [setupPanelState, setSetupPanelState] = React.useState(`closed`),
    setupOpen = setupPanelState === `open`,
    setSetupOpen = (e: boolean) => {
      if (e) return setSetupPanelState(`open`);
      setSetupPanelState((e) => (e === `open` ? `closing` : e));
    };
  React.useEffect(() => {
    if (setupPanelState !== `closing`) return;
    let e = window.setTimeout(() => setSetupPanelState(`closed`), 420);
    return () => window.clearTimeout(e);
  }, [setupPanelState]);
  let setupHeaderRef = React.useRef<HTMLDivElement | null>(null),
    [setupHeaderHeight, setSetupHeaderHeight] = React.useState(0),
    [closedSetupHeight, setClosedSetupHeight] = React.useState(0);
  (React.useLayoutEffect(() => {
    let e = setupHeaderRef.current;
    e &&
      (setSetupHeaderHeight(e.offsetHeight),
      setupPanelState === `closed` && setClosedSetupHeight(e.offsetHeight));
  }, [setupPanelState]),
    React.useLayoutEffect(() => {
      let e = setupHeaderRef.current;
      if (!e) return;
      let t = () => setSetupHeaderHeight(e.offsetHeight);
      t();
      let n = new ResizeObserver(t);
      return (n.observe(e), () => n.disconnect());
    }, []),
    React.useEffect(() => {
      if (!setupOpen) return;
      let e = (e: { key: string }) => e.key === `Escape` && setSetupOpen(false);
      return (
        document.addEventListener(`keydown`, e),
        () => document.removeEventListener(`keydown`, e)
      );
    }, [setupOpen]),
    React.useEffect(() => {
      if (!drawerOpen || setupPanelState !== `closed`) return;
      let e = (e: { key: string }) => e.key === `Escape` && setDrawerOpen(false);
      return (
        document.addEventListener(`keydown`, e),
        () => document.removeEventListener(`keydown`, e)
      );
    }, [drawerOpen, setupPanelState]));
  let [completedTaskIds, setCompletedTaskIds] = React.useState(() =>
      setup.flatMap((e) => e.tasks.filter((e) => e.done).map((e) => e.id)),
    ),
    totalTasks = setup.reduce((e, t) => e + t.tasks.length, 0),
    progress = totalTasks ? Math.round((completedTaskIds.length / totalTasks) * 100) : 0,
    initials = user.name
      .split(` `)
      .map((e) => e[0])
      .slice(0, 2)
      .join(``);
  return (
    <div
      ref={shellRef}
      className={[`ui-as`, `ui-as-app`, className].filter(Boolean).join(` `)}
      data-collapsed={(collapsed && !isCompact) || void 0}
      data-drawer={(isCompact && drawerOpen) || void 0}
    >
      <style href={`ui-app-shell`} precedence={`default`}>
        {appShellStyles}
      </style>
      <button
        className={`ui-as-icon-btn ui-as-side-open`}
        type={`button`}
        aria-label={`Open sidebar`}
        tabIndex={sidebarInert ? 0 : -1}
        onClick={() => (isCompact ? setDrawerOpen(true) : setCollapsed(false))}
      >
        <Icon icon={SidebarIcon} size={16} />
      </button>
      <div className={`ui-as-scrim`} aria-hidden={`true`} onClick={() => setDrawerOpen(false)} />
      <aside className={`ui-as-side`} inert={sidebarInert}>
        <header className={`ui-as-side__head`}>
          <DropdownMenu
            title={`Workspaces`}
            items={[
              {
                label: workspace,
                description: `Pro · 8 members`,
                checked: true,
              },
              {
                label: `Personal`,
                description: `Free`,
                checked: false,
              },
              {
                label: `Create workspace`,
                icon: PlusIcon,
              },
            ]}
            trigger={({ open: open, toggle: toggle }) => (
              <button
                className={`ui-as-side__workspace`}
                type={`button`}
                aria-expanded={open}
                onClick={toggle}
              >
                <span className={`ui-as-side__logo`}>{workspace[0]}</span>
                {workspace}
                <Icon icon={ChevronDownIcon} size={13} />
              </button>
            )}
          />
          <span className={`ui-as-side__tools`}>
            <button className={`ui-as-icon-btn`} type={`button`} aria-label={`Search`}>
              <Icon icon={SearchIcon} size={16} />
            </button>
            <button
              className={`ui-as-icon-btn`}
              type={`button`}
              aria-label={isCompact ? `Close sidebar` : `Collapse sidebar`}
              onClick={() => (isCompact ? setDrawerOpen(false) : setCollapsed(true))}
            >
              <Icon icon={SidebarIcon} size={16} />
            </button>
          </span>
        </header>
        <nav className={`ui-as-side__nav`} aria-label={`Main menu`}>
          <div className={`ui-as-side__group`}>
            {nav.map((e) => (
              <button
                type={`button`}
                className={`ui-as-side__item`}
                aria-current={active === e.label ? `page` : void 0}
                onClick={() => navigate(e.label)}
                key={e.label}
              >
                <Icon icon={e.icon} size={16} />
                {e.label}
                {e.count !== void 0 && <span className={`ui-as-side__count`}>{e.count}</span>}
              </button>
            ))}
          </div>
          {groups ? (
            groups.map((e) => (
              <div className={`ui-as-side__group`} key={e.label}>
                <span className={`ui-as-side__label`}>{e.label}</span>
                {e.items.length === 0 && e.empty && (
                  <span className={`ui-as-side__empty`}>{e.empty}</span>
                )}
                {e.items.map((e) => (
                  <button
                    type={`button`}
                    className={`ui-as-side__item`}
                    aria-current={active === e.label ? `page` : void 0}
                    onClick={() => navigate(e.label)}
                    key={e.label}
                  >
                    <Icon icon={e.icon} size={16} />
                    {e.label}
                    {e.count !== void 0 && <span className={`ui-as-side__count`}>{e.count}</span>}
                  </button>
                ))}
              </div>
            ))
          ) : (
            <>
              <span className={`ui-as-side__label`}>{`Projects`}</span>
              {projects.map((e) => (
                <button
                  type={`button`}
                  className={`ui-as-side__item`}
                  aria-current={active === e ? `page` : void 0}
                  onClick={() => navigate(e)}
                  key={e}
                >
                  <Icon icon={FolderIcon} size={16} />
                  {e}
                </button>
              ))}
            </>
          )}
        </nav>
        <div className={`ui-as-side__foot`}>
          {newsCount > 0 && (
            <div className={`ui-as-news`} data-count={newsCount}>
              <div className={`ui-as-news__card ui-as-news__card--back`} aria-hidden={`true`}>
                <span className={`ui-as-news__kicker`}>
                  {`New in `}
                  {workspace}
                </span>
                <Icon icon={CloseIcon} size={13} />
              </div>
              <div className={`ui-as-news__card`}>
                <div className={`ui-as-news__top`}>
                  <span className={`ui-as-news__kicker`}>
                    {`New in `}
                    {workspace}
                  </span>
                  <button
                    type={`button`}
                    className={`ui-as-news__close`}
                    aria-label={`Dismiss`}
                    onClick={() => setNewsCount((e) => e - 1)}
                  >
                    <Icon icon={CloseIcon} size={13} />
                  </button>
                </div>
                <b className={`ui-as-news__title`}>
                  {newsCount > 1 ? `Shared folders` : `Scheduled chats`}
                </b>
                <button type={`button`} className={`ui-as-news__more`}>
                  {`Full changelog`}
                  <Icon icon={ChevronRightIcon} size={13} />
                </button>
              </div>
            </div>
          )}
          <div
            className={`ui-as-guide-slot`}
            style={
              closedSetupHeight
                ? {
                    height: closedSetupHeight,
                  }
                : void 0
            }
          >
            <div
              className={`ui-as-guide`}
              data-open={setupPanelState !== `closed` || void 0}
              data-state={setupPanelState}
              style={{
                height:
                  (setupPanelState === `open` ? setupHeaderHeight : closedSetupHeight) || void 0,
              }}
            >
              <div ref={setupHeaderRef} className={`ui-as-guide__inner`}>
                {setupPanelState === `closed` ? (
                  <button
                    type={`button`}
                    className={`ui-as-steps ui-as-guide__content`}
                    aria-expanded={false}
                    onClick={() => setSetupOpen(true)}
                    key={`summary`}
                  >
                    <span className={`ui-as-steps__title`}>
                      {`Getting started`}
                      <Icon icon={ChevronRightIcon} size={13} />
                    </span>
                    <span className={`ui-as-steps__sub`}>
                      {progress}
                      {`% done · `}
                      <span className={`ui-as-steps__cheer`}>{setupProgressLabel(progress)}</span>
                    </span>
                    <span className={`ui-as-steps__bar`}>
                      <i
                        style={{
                          width: `${Math.max(progress, 4)}%`,
                        }}
                      />
                    </span>
                  </button>
                ) : (
                  <div className={`ui-as-guide__content`} key={`guide`}>
                    <SetupGuide
                      title={`Getting started`}
                      groups={setup.map((e) => ({
                        ...e,
                        tasks: e.tasks.map((e) => ({
                          ...e,
                          done: completedTaskIds.includes(e.id),
                        })),
                      }))}
                      onChange={setCompletedTaskIds}
                      onClose={() => setSetupOpen(false)}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          <DropdownMenu
            side={`top`}
            className={`ui-as-user-menu`}
            items={[
              {
                label: `Profile`,
                icon: UserIcon,
              },
              {
                label: `Settings`,
                icon: SettingsIcon,
              },
              {
                label: `Help & feedback`,
                icon: NotificationIcon,
              },
              {
                label: `Log out`,
                icon: MailIcon,
                danger: true,
              },
            ]}
            trigger={({ open: open, toggle: toggle }) => (
              <button
                type={`button`}
                className={`ui-as-user`}
                aria-expanded={open}
                onClick={toggle}
              >
                {user.avatar ? (
                  <img src={user.avatar} alt={``} width={21} height={21} />
                ) : (
                  <span className={`ui-as-user__initials`}>{initials}</span>
                )}
                {user.name}
                <Icon icon={ChevronDownIcon} size={13} />
              </button>
            )}
          />
        </div>
      </aside>
      <main className={`ui-as-main`}>{children}</main>
    </div>
  );
}
function getClippingBoundary(element: HTMLDivElement) {
  for (let t = element.parentElement; t; t = t.parentElement) {
    let e = getComputedStyle(t);
    if (
      /(auto|scroll|hidden|clip)/.test(e.overflow + e.overflowY + e.overflowX) ||
      t.classList.contains(`ui-as`)
    )
      return t.getBoundingClientRect();
  }
  return new DOMRect(0, 0, window.innerWidth, window.innerHeight);
}
function Popover({
  open: open,
  onClose: onClose,
  children: children,
  align = `start`,
  side = `bottom`,
  className: className,
}: PopoverProps) {
  let popoverRef = React.useRef<HTMLDivElement | null>(null),
    [placement, setPlacement] = React.useState({
      side: side,
      align: align,
    });
  return (
    React.useLayoutEffect(() => {
      let t = popoverRef.current;
      if (!open || !t) return;
      let n: {
        side: PopoverSide;
        align: PopoverAlign;
      } = {
        side: side,
        align: align,
      };
      ((t.dataset.side = side), (t.dataset.align = align));
      let a = getClippingBoundary(t),
        s = t.getBoundingClientRect();
      (side === `bottom` &&
        s.bottom > a.bottom - 6 &&
        (n = {
          ...n,
          side: `top`,
        }),
        side === `top` &&
          s.top < a.top + 6 &&
          (n = {
            ...n,
            side: `bottom`,
          }),
        align === `start` &&
          s.right > a.right - 6 &&
          (n = {
            ...n,
            align: `end`,
          }),
        align === `end` &&
          s.left < a.left + 6 &&
          (n = {
            ...n,
            align: `start`,
          }),
        (t.dataset.side = n.side),
        (t.dataset.align = n.align),
        (t.style.translate = ``));
      let l = t.getBoundingClientRect(),
        u = l.width / t.offsetWidth || 1,
        d = 0;
      (l.right > a.right - 6 && (d = a.right - 6 - l.right),
        l.left + d < a.left + 6 && (d = a.left + 6 - l.left),
        d && (t.style.translate = `${d / u}px 0`),
        setPlacement(n));
    }, [open, side, align]),
    React.useEffect(() => {
      if (!open) return;
      let n = (e: PointerEvent) => {
          let n = popoverRef.current?.parentElement;
          n && !n.contains(e.target as Node | null) && onClose();
        },
        r = (e: { key: string }) => e.key === `Escape` && onClose();
      return (
        document.addEventListener(`pointerdown`, n),
        document.addEventListener(`keydown`, r),
        () => {
          (document.removeEventListener(`pointerdown`, n),
            document.removeEventListener(`keydown`, r));
        }
      );
    }, [open, onClose]),
    open ? (
      <div
        ref={popoverRef}
        className={[`ui-as-popover`, className].filter(Boolean).join(` `)}
        data-align={placement.align}
        data-side={placement.side}
        role={`dialog`}
      >
        {children}
      </div>
    ) : null
  );
}
function MenuItems({ items: items, onPick: onPick }: { items: MenuItem[]; onPick: () => void }) {
  return (
    <div role={`menu`} className={`ui-as-menu__list`}>
      {items.map((e) => (
        <button
          type={`button`}
          role={e.checked === void 0 ? `menuitem` : `menuitemradio`}
          aria-checked={e.checked}
          className={`ui-as-menu__item`}
          data-danger={e.danger || void 0}
          data-rich={e.description ? true : void 0}
          onClick={() => {
            (e.onSelect?.(), onPick());
          }}
          key={e.label}
        >
          {e.icon && <Icon icon={e.icon} size={15} />}
          <span className={`ui-as-menu__label`}>
            {e.label}
            {e.description && <small>{e.description}</small>}
          </span>
          {e.checked && <Icon icon={CheckIcon} size={14} />}
        </button>
      ))}
    </div>
  );
}
function DropdownMenu({
  trigger: trigger,
  items: items,
  align = `start`,
  side = `bottom`,
  title: title,
  className: className,
}: DropdownMenuProps) {
  let [open, setOpen] = React.useState(false);
  return (
    <span className={[`ui-as-anchor`, className].filter(Boolean).join(` `)}>
      {trigger({
        open: open,
        toggle: () => setOpen((e) => !e),
      })}
      <Popover
        open={open}
        onClose={() => setOpen(false)}
        align={align}
        side={side}
        className={`ui-as-menu`}
      >
        {title && <span className={`ui-as-menu__title`}>{title}</span>}
        <MenuItems items={items} onPick={() => setOpen(false)} />
      </Popover>
    </span>
  );
}
var appShellStyles = `
/* Design tokens – same values as the Plico UI library components */
.ui-as {
  --tray: #f4f4f4;
  --card: #ffffff;
  /* Like the Plico UI library: gray page, the main area is a rounded panel on it */
  --page: #f8f8f8;
  --panel: #ffffff;
  --radius-panel: 18px;
  --frame-gap: 8px;
  --line: #ebebeb;
  --line-soft: #f0f0f0;
  --ink: #171717;
  --text: #404040;
  --muted: #737373;
  --faint: #a3a3a3;
  --placeholder: #a3a3a3;
  --chip: #f5f5f5;
  --chip-hover: #eeeeee;
  --hover: rgba(0, 0, 0, 0.035);
  --accent: #4469fc;
  --button: #262626;
  --button-hover: #333333;
  --accent-soft: #eef3ff;
  --shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  --line-strong: #dedede;
  --subtle: #fafafa;
  --disabled: #dcdcdc;
  --on-ink: #ffffff;
  --ink-hover: #3a3a3a;
  --select: rgba(0, 0, 0, 0.055);
  --toggle-off: #e2e2e2;
  --switch-on: #171717;
  --logo-bg: #ffffff;
  --ease: cubic-bezier(0.22, 1, 0.36, 1);
  --font: "Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
}

/* Library components inside a screen follow the shell's scale: 13–13.5px text, 30px buttons, compact rows */
.ui-as .ui-pl { font-size: 13.5px; line-height: 19px; }
.ui-as .ui-pl__title { font-size: 14px; line-height: 20px; }
.ui-as .ui-df__text { font-size: 13.5px; line-height: 1.6; }
.ui-as .ui-df__body { padding: 14px 16px 16px; }
.ui-as .ui-ap__title { font-size: 13.5px; }
.ui-as .ui-ap__btn { height: 30px; }
.ui-as .ui-tc { font-size: 13px; }
.ui-as .ui-tc__head { min-height: 40px; padding-top: 6px; padding-bottom: 6px; }
/* Actions look the same in every card: 30px, radius 10, quiet = white with a hairline, primary = ink; never stretched */
.ui-as .ui-ap__foot .ui-ap__actions { flex: 0 0 auto; margin-left: auto; }
.ui-as .ui-ap__actions .ui-ap__btn { flex: none; padding: 0 12px; border-radius: 10px; }
.ui-as .ui-ap__actions .ui-ap__btn--quiet { background: var(--card); box-shadow: inset 0 0 0 1px var(--line); }
.ui-as .ui-ap__actions .ui-ap__btn--quiet:hover { background: var(--subtle); }
.ui-as .ui-df__head .ui-df__btn, .ui-as .ui-df__head .ui-df__icon { border-radius: 10px; }
.ui-as .ui-ap__actions .ui-ap__btn--primary, .ui-as .ui-df__head .ui-df__btn--primary { background: var(--button); }
.ui-as .ui-um__action { border-radius: 10px; }
/* …and the screens' lighter grays: trays and their hovers a step lighter than the components' own defaults */
.ui-as .ui-ap { --ui-ap-tray: var(--tray); --ui-ap-hover: #ebebeb; }
.ui-as .ui-pl { --ui-pl-tray: var(--tray); --ui-pl-quiet-hover: #ebebeb; --ui-pl-marker: var(--chip); }
.ui-as .ui-df { --ui-df-tray: var(--tray); }
.ui-as .ui-um { --ui-um-tray: var(--tray); }
.ui-as .ui-cb { --ui-cb-tray: var(--tray); }
:where(.dark, [data-theme="dark"]) .ui-as .ui-ap { --ui-ap-tray: #111113; --ui-ap-hover: #222225; }
:where(.dark, [data-theme="dark"]) .ui-as .ui-pl { --ui-pl-tray: #111113; --ui-pl-quiet-hover: #222225; --ui-pl-marker: #26262a; }
:where(.dark, [data-theme="dark"]) .ui-as :is(.ui-df, .ui-um, .ui-cb) { --ui-df-tray: #111113; --ui-um-tray: #111113; --ui-cb-tray: #111113; }

/* Dark mode: follows a .dark class or data-theme="dark" on any ancestor, e.g. <html>.
   Every screen draws from these tokens, and the library parts inside switch on their own. */
:where(.dark, [data-theme="dark"]) .ui-as {
  --tray: #1d1d20;
  --card: #1b1b1e;
  --page: #0e0e10;
  --panel: #141416;
  --line: #29292d;
  --line-soft: #222225;
  --ink: #f4f4f5;
  --text: #d4d4d8;
  --muted: #a1a1aa;
  --faint: #71717a;
  --placeholder: #71717a;
  --chip: #232326;
  --chip-hover: #2c2c30;
  --hover: rgba(255, 255, 255, 0.05);
  --accent: #6d8bff;
  --button: #f4f4f5;
  --button-hover: #ffffff;
  --accent-soft: rgba(109, 139, 255, 0.14);
  --shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
  --line-strong: #3a3a3f;
  --subtle: #18181b;
  --disabled: #3a3a3f;
  --on-ink: #111113;
  --ink-hover: #d4d4d8;
  --select: rgba(255, 255, 255, 0.08);
  --toggle-off: #3a3a3f;
  --switch-on: #6d8bff;
  --logo-bg: #2a2a2e;
  color-scheme: dark;
}

.ui-as, .ui-as *, .ui-as *::before, .ui-as *::after { box-sizing: border-box; }
.ui-as {
  font-family: var(--font);
  font-size: 13px;
  color: var(--text);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
:where(.ui-as) button {
  appearance: none;
  margin: 0;
  padding: 0;
  border: 0;
  background: none;
  font: inherit;
  color: inherit;
  cursor: pointer;
}
:where(.ui-as) svg { display: block; flex: none; }
.ui-as :focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
.ui-as textarea:focus-visible, .ui-as input:focus-visible { outline: none; }

/* Primary buttons: one flat dark gray, with the soft light edge on top and faint one below from the Figma button 590:4159 */
.ui-as-app .ui-button[data-variant="primary"] {
  border-color: transparent;
  background: var(--button);
  color: var(--on-ink);
  box-shadow:
    inset 0 1px 0.5px rgba(255, 255, 255, 0.16),
    inset 0 -1px 0.5px rgba(19, 20, 27, 0.1),
    0 1px 2px rgba(19, 20, 27, 0.1);
}
.ui-as-app .ui-button[data-variant="primary"]:hover:not(:disabled) { background: var(--button-hover); }

/* App frame shared by all screens: sidebar on the gray page, main area as a rounded white panel */

.ui-as-app {
  /* The layout answers to the app's own width (container queries), not the window – see the end of this file */
  container: ui-as / inline-size;
  position: relative;
  display: grid;
  grid-template-columns: 220px minmax(0, 1fr);
  height: 100%;
  min-height: 560px;
  background: var(--page);
  transition: grid-template-columns 420ms var(--ease);
}
/* Collapsed: the sidebar is gone completely, the main area keeps the same gap on all sides */
.ui-as-app[data-collapsed] { grid-template-columns: 0 minmax(0, 1fr); }
.ui-as-app[data-collapsed] .ui-as-main { margin-left: var(--frame-gap); }

/* ---------- Sidebar ---------- */

.ui-as-side {
  display: flex;
  flex-direction: column;
  width: 220px;
  min-height: 0;
  padding: 10px 8px 8px 10px;
  transition: opacity 260ms ease, translate 420ms var(--ease), visibility 0s;
}
.ui-as-app[data-collapsed] .ui-as-side {
  visibility: hidden;
  opacity: 0;
  translate: -16px 0;
  transition: opacity 200ms ease, translate 420ms var(--ease), visibility 0s 420ms;
}

/* The icon to bring the sidebar back, in the top left corner of the main area */
.ui-as-side-open {
  position: fixed;
  z-index: 20;
  top: calc(var(--frame-gap) + 9px);
  left: calc(var(--frame-gap) + 9px);
  visibility: hidden;
  opacity: 0;
  transition: opacity 200ms ease, visibility 0s 200ms;
}
.ui-as-app[data-collapsed] .ui-as-side-open {
  visibility: visible;
  opacity: 1;
  transition: opacity 260ms ease 160ms, visibility 0s;
}

.ui-as-side__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 28px;
}
.ui-as-side__workspace {
  display: flex;
  align-items: center;
  gap: 6px;
  height: 30px;
  padding: 0 6px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  color: var(--ink);
}
.ui-as-side__workspace svg { color: var(--faint); }
.ui-as-side__workspace:hover { background: var(--hover); }
.ui-as-user-menu { display: flex; }
.ui-as-user-menu > .ui-as-user { flex: 1; }
.ui-as-user-menu .ui-as-menu { width: 100%; }
/* Workspace logo on a white tile with a small, tight shadow below */
.ui-as-side__logo {
  display: grid;
  place-items: center;
  width: 18px;
  height: 18px;
  margin-right: 1px;
  border-radius: 5px;
  background: var(--logo-bg);
  box-shadow: 0 0 0 0.5px rgba(0, 0, 0, 0.08), 0 1px 1px rgba(0, 0, 0, 0.12);
}
.ui-as-side__logo svg { width: 11px; height: auto; }
.ui-as-side__tools { display: flex; gap: 2px; }

.ui-as-icon-btn {
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
  border-radius: 8px;
  color: var(--muted);
  transition: background-color 140ms ease, color 140ms ease;
}
.ui-as-icon-btn:hover { background: var(--hover); color: var(--ink); }

.ui-as-side__nav {
  display: flex;
  flex-direction: column;
  margin-top: 16px;
}
.ui-as-side__group { display: flex; flex-direction: column; }
.ui-as-side__group + .ui-as-side__group { margin-top: 10px; }
.ui-as-side__group + .ui-as-side__group > .ui-as-side__label:first-child { margin-top: 6px; }
.ui-as-side__count { margin-left: auto; font-size: 12px; color: var(--faint); font-variant-numeric: tabular-nums; }
.ui-as-side__empty { padding: 4px 6px; font-size: 13px; color: var(--faint); }
.ui-as-side__item {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  height: 30px;
  padding: 0 6px;
  border-radius: 8px;
  font-size: 13.5px;
  color: var(--text);
  text-align: left;
  transition: background-color 140ms ease, color 140ms ease;
}
.ui-as-side__item svg { color: var(--muted); }
.ui-as-side__item:hover { background: var(--hover); color: var(--ink); }
.ui-as-side__item[aria-current="page"] { background: var(--select); color: var(--ink); font-weight: 500; }
.ui-as-side__item[aria-current="page"] svg { color: var(--ink); }
a.ui-as-side__item { text-decoration: none; cursor: pointer; }
.ui-as-side__label {
  margin: 16px 0 4px;
  padding: 0 6px;
  font-size: 12.5px;
  line-height: 16px;
  color: var(--faint);
}

.ui-as-side__foot {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: auto;
}

/* "What's new" – two cards stacked, the second one peeks out above */
.ui-as-news { position: relative; padding-top: 30px; }
.ui-as-news__card {
  position: relative;
  z-index: 1;
  padding: 10px 10px 0;
  border-radius: 12px;
  background: var(--card);
  box-shadow: 0 0 0 1px var(--line), 0 2px 6px rgba(0, 0, 0, 0.04);
}
.ui-as-news__card--back {
  position: absolute;
  z-index: 0;
  top: 0;
  left: 10px;
  right: 10px;
  height: 48px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 9px 9px 0;
  background: var(--card);
  color: var(--faint);
}
.ui-as-news[data-count="1"] { padding-top: 0; }
.ui-as-news[data-count="1"] .ui-as-news__card--back { display: none; }
.ui-as-news__top { display: flex; align-items: center; justify-content: space-between; }
.ui-as-news__kicker { font-size: 11.5px; line-height: 15px; font-weight: 500; color: var(--accent); }
.ui-as-news__close {
  display: grid;
  place-items: center;
  width: 18px;
  height: 18px;
  margin: -2px -2px 0 0;
  border-radius: 6px;
  color: var(--faint);
}
.ui-as-news__close:hover { background: var(--hover); color: var(--ink); }
.ui-as-news__title { display: block; margin-top: 4px; font-size: 13.5px; line-height: 18px; font-weight: 600; color: var(--ink); }
.ui-as-news__more {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: calc(100% + 20px);
  height: 34px;
  margin: 10px -10px 0;
  padding: 0 10px;
  border-top: 1px solid var(--line-soft);
  border-radius: 0 0 12px 12px;
  font-size: 12.5px;
  color: var(--muted);
}
.ui-as-news__more:hover { background: var(--subtle); color: var(--ink); }

/* Onboarding progress */
/* Getting started: one card that morphs between the short summary and the full Setup Guide */
.ui-as-guide-slot { position: relative; flex: none; }
.ui-as-guide {
  position: absolute;
  z-index: 6;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
  border-radius: 12px;
  background: var(--card);
  box-shadow: 0 0 0 1px var(--line), 0 2px 6px rgba(0, 0, 0, 0.04);
  transition: height 480ms var(--ease), border-radius 480ms var(--ease), box-shadow 200ms ease;
}
.ui-as-guide:not([data-open]):hover { box-shadow: 0 0 0 1px var(--line-strong), 0 2px 6px rgba(0, 0, 0, 0.05); }
.ui-as-guide[data-open] { border-radius: 14px; box-shadow: 0 0 0 1px var(--line), 0 8px 24px -10px rgba(0, 0, 0, 0.14); }
.ui-as-guide__content { animation: ui-as-guide-in 360ms var(--ease) both; }
/* Closing: the guide fades out while the card shrinks back to the summary's height */
.ui-as-guide[data-state="closing"] .ui-as-guide__content { animation: ui-as-guide-out 260ms ease both; }
.ui-as-guide[data-state="closing"] { border-radius: 12px; box-shadow: 0 0 0 1px var(--line), 0 2px 6px rgba(0, 0, 0, 0.04); }
@keyframes ui-as-guide-out { to { opacity: 0; } }
@keyframes ui-as-guide-in { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
.ui-as-steps {
  display: grid;
  gap: 3px;
  width: 100%;
  padding: 10px 10px 9px;
  text-align: left;
}
/* The library's Setup Guide inside the card: its own frame drops away, the card is the frame */
/* Opening and closing belong to the card, so the guide's own minimize button is left out */
.ui-as-guide .ui-sg__icon-btn[aria-expanded] { display: none; }
.ui-as-guide .ui-sg { zoom: 0.86; max-width: none; padding: 12px 4px 4px; border: 0; border-radius: 0; background: transparent; box-shadow: none; }
.ui-as-steps__title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 13.5px;
  line-height: 18px;
  font-weight: 600;
  color: var(--ink);
}
.ui-as-steps__title svg { color: var(--faint); }
.ui-as-steps__sub { font-size: 12.5px; line-height: 17px; color: var(--muted); }
.ui-as-steps__cheer { color: var(--accent); }
.ui-as-steps__bar {
  height: 4px;
  margin-top: 6px;
  overflow: hidden;
  border-radius: 2px;
  background: var(--tray);
}
.ui-as-steps__bar i { display: block; min-width: 6px; height: 100%; border-radius: inherit; background: var(--accent); transition: width 600ms var(--ease); }

.ui-as-user {
  display: flex;
  align-items: center;
  gap: 7px;
  height: 34px;
  padding: 0 6px;
  border-radius: 8px;
  font-size: 13.5px;
  font-weight: 500;
  color: var(--ink);
}
.ui-as-user img { width: 21px; height: 21px; border-radius: 50%; object-fit: cover; box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.06); }
.ui-as-user svg { margin-left: auto; color: var(--faint); }
.ui-as-user:hover { background: var(--hover); }

/* ---------- Main ---------- */

/* Main area as a rounded panel, like the Plico UI library */
.ui-as-main {
  /* Screens reflow their content by the width of this panel */
  container: ui-as-main / inline-size;
  position: relative;
  min-width: 0;
  margin: var(--frame-gap) var(--frame-gap) var(--frame-gap) 0;
  overflow-y: auto;
  /* No rubber-band bounce at the ends – sticky headers stay put */
  overscroll-behavior: none;
  transition: margin-left 420ms var(--ease);
  border: 1px solid var(--line);
  border-radius: var(--radius-panel);
  background: var(--panel);
}


/* Shared page parts: headings, toolbars, tabs, search, empty states – Plico UI tokens */

.ui-as-page {
  padding: 46px 32px 56px;
}
.ui-as-page-title {
  margin: 0;
  font-size: 22px;
  line-height: 28px;
  font-weight: 600;
  letter-spacing: -0.02em;
  color: var(--ink);
}
.ui-as-page-sub {
  margin: 6px 0 0;
  font-size: 13.5px;
  line-height: 20px;
  color: var(--muted);
}
.ui-as-page-sub a { color: var(--text); text-decoration: underline; text-decoration-color: var(--line-strong); text-underline-offset: 3px; }
.ui-as-page-sub a:hover { color: var(--ink); text-decoration-color: currentColor; }

.ui-as-section-head { margin-top: 38px; }
/* Without tabs the tools sit on the same line as the title */
.ui-as-section-head[data-inline] { display: flex; align-items: center; justify-content: space-between; gap: 16px; }
.ui-as-section-head[data-inline] .ui-as-toolbar { margin-top: 0; }
.ui-as-section-head__title {
  margin: 0;
  font-size: 16px;
  line-height: 22px;
  font-weight: 600;
  letter-spacing: -0.01em;
  color: var(--ink);
}
.ui-as-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-top: 16px;
}
.ui-as-toolbar__left, .ui-as-toolbar__right { display: flex; align-items: center; gap: 6px; }

/* Segmented tabs: the active one gets a soft gray fill */
.ui-as-tabs { position: relative; display: flex; gap: 2px; }
/* The gray pill glides under the active tab */
.ui-as-tabs__pill {
  position: absolute;
  top: 0;
  left: 0;
  height: 32px;
  border-radius: 9px;
  background: var(--chip);
  transition: transform 340ms var(--ease), width 340ms var(--ease);
}
.ui-as-tabs__tab {
  position: relative;
  height: 32px;
  padding: 0 10px;
  border-radius: 9px;
  font-size: 13.5px;
  color: var(--muted);
  transition: background-color 140ms ease, color 140ms ease;
}
.ui-as-tabs__tab:hover { color: var(--ink); }
.ui-as-tabs__tab[aria-selected="true"] { color: var(--ink); }

/* Small outlined tools */
.ui-as-tool {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  min-width: 32px;
  height: 32px;
  border-radius: 9px;
  background: var(--card);
  box-shadow: 0 0 0 1px var(--line), var(--shadow);
  color: var(--text);
  transition: box-shadow 140ms ease, color 140ms ease;
}
.ui-as-tool svg { color: var(--muted); }
.ui-as-tool:hover { box-shadow: 0 0 0 1px var(--line-strong), var(--shadow); color: var(--ink); }
.ui-as-tool--label { padding: 0 10px; font-size: 13px; }

.ui-as-view {
  position: relative;
  display: flex;
  gap: 2px;
  height: 32px;
  padding: 2px;
  border-radius: 9px;
  background: var(--chip);
}
.ui-as-view__btn {
  display: grid;
  place-items: center;
  width: 30px;
  border-radius: 7px;
  color: var(--faint);
}
.ui-as-view__btn:hover { color: var(--ink); }
.ui-as-view__btn { position: relative; transition: color 160ms ease; }
.ui-as-view__btn[aria-checked="true"] { color: var(--ink); }
/* White pill that slides between grid and list */
.ui-as-view__pill {
  position: absolute;
  top: 2px;
  bottom: 2px;
  left: 2px;
  width: 30px;
  border-radius: 7px;
  background: var(--card);
  box-shadow: 0 0 0 1px var(--line), var(--shadow);
  transition: transform 320ms var(--ease);
}
.ui-as-view[data-view="list"] .ui-as-view__pill { transform: translateX(32px); }

.ui-as-search {
  display: flex;
  align-items: center;
  gap: 7px;
  height: 32px;
  padding: 0 10px;
  border-radius: 9px;
  background: var(--card);
  box-shadow: 0 0 0 1px var(--line), var(--shadow);
  color: var(--faint);
  cursor: text;
  transition: box-shadow 140ms ease;
}
.ui-as-search:focus-within { box-shadow: 0 0 0 1px var(--line-strong), 0 0 0 3px rgba(0, 0, 0, 0.04); }
.ui-as-search input {
  flex: 1;
  min-width: 0;
  padding: 0;
  border: 0;
  background: transparent;
  font: inherit;
  font-size: 13px;
  color: var(--ink);
}
.ui-as-search input::placeholder { color: var(--placeholder); }
.ui-as-search__clear {
  display: grid;
  flex: none;
  place-items: center;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: var(--chip);
  color: var(--muted);
  animation: ui-as-pop 220ms var(--ease);
}
.ui-as-search__clear:hover { color: var(--ink); }

/* Sort: the arrows turn half a circle for Z–A */
.ui-as-sort svg { transition: transform 360ms var(--ease); }
.ui-as-sort[data-dir="desc"] svg { transform: rotate(180deg); }
.ui-as-tool[data-active] { box-shadow: 0 0 0 1px var(--line-strong), var(--shadow); color: var(--ink); }
.ui-as-tool__count {
  display: grid;
  place-items: center;
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  border-radius: 999px;
  background: var(--ink);
  font-size: 11px;
  font-weight: 600;
  color: var(--on-ink);
  animation: ui-as-pop 220ms var(--ease);
}

/* Popovers: attached to their trigger, they fade and scale in from that side */
.ui-as-anchor { position: relative; display: inline-flex; }
.ui-as-popover {
  position: absolute;
  z-index: 30;
  top: calc(100% + 6px);
  left: 0;
  transform-origin: top left;
  animation: ui-as-popover 220ms var(--ease);
}
.ui-as-popover[data-align="end"] { right: 0; left: auto; transform-origin: top right; }
.ui-as-popover[data-side="top"] { top: auto; bottom: calc(100% + 6px); transform-origin: bottom left; animation-name: ui-as-popover-up; }
.ui-as-popover[data-side="top"][data-align="end"] { transform-origin: bottom right; }
.ui-as-popover[data-side="right"] { top: auto; bottom: 0; left: calc(100% + 12px); transform-origin: bottom left; }
@keyframes ui-as-popover-up { from { opacity: 0; transform: scale(0.96) translateY(4px); } to { opacity: 1; transform: none; } }
.ui-as-popover--filter .ui-fm { zoom: 0.9; width: 340px; }

.ui-as-menu {
  min-width: 168px;
  padding: 4px;
  border-radius: 12px;
  background: var(--card);
  box-shadow: 0 0 0 1px var(--line), 0 12px 32px -8px rgba(0, 0, 0, 0.16);
}
.ui-as-menu__title { display: block; padding: 6px 10px 4px; font-size: 12px; font-weight: 500; color: var(--faint); }
.ui-as-menu__list { display: grid; gap: 1px; }
.ui-as-menu__item {
  display: flex;
  align-items: center;
  gap: 9px;
  width: 100%;
  min-height: 32px;
  padding: 0 10px;
  border-radius: 8px;
  font-size: 13px;
  color: var(--text);
  text-align: left;
  white-space: nowrap;
  transition: background-color 120ms ease, color 120ms ease;
}
.ui-as-menu__item[data-rich] { min-height: 44px; padding: 6px 10px; }
.ui-as-menu__item > svg { flex: none; color: var(--muted); }
.ui-as-menu__item > svg:last-child:not(:first-child) { margin-left: auto; color: var(--ink); }
.ui-as-menu__label { display: grid; flex: 1; gap: 1px; min-width: 0; }
.ui-as-menu__label small { font-size: 12px; line-height: 16px; color: var(--faint); }
.ui-as-menu__item:hover { background: var(--hover); color: var(--ink); }
.ui-as-menu__item[aria-checked="true"] { color: var(--ink); font-weight: 500; }
.ui-as-menu__item[aria-checked="true"] small { font-weight: 400; }
.ui-as-menu__item[data-danger] { color: #dc2626; }
.ui-as-menu__item[data-danger] > svg { color: #dc2626; }

.ui-as-toast {
  position: absolute;
  z-index: 40;
  left: 50%;
  bottom: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  height: 36px;
  padding: 0 14px 0 12px;
  border-radius: 999px;
  background: var(--ink);
  font-size: 13px;
  color: var(--on-ink);
  box-shadow: 0 10px 24px -8px rgba(0, 0, 0, 0.35);
  translate: -50% 0;
  animation: ui-as-toast 2200ms var(--ease) both;
}

/* Shared motion: content that changes (tabs, filters, new messages) rises in; --i staggers a list */
.ui-as-rise { animation: ui-as-rise 420ms var(--ease) both; animation-delay: calc(var(--i, 0) * 35ms); }
@keyframes ui-as-rise { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
@keyframes ui-as-pop { from { opacity: 0; transform: scale(0.6); } to { opacity: 1; transform: none; } }
@keyframes ui-as-popover { from { opacity: 0; transform: scale(0.96) translateY(-4px); } to { opacity: 1; transform: none; } }
@keyframes ui-as-toast {
  0% { opacity: 0; transform: translateY(12px) scale(0.96); }
  12%, 85% { opacity: 1; transform: none; }
  100% { opacity: 0; transform: translateY(6px); }
}
@media (prefers-reduced-motion: reduce) {
  .ui-as *, .ui-as *::before, .ui-as *::after { animation-duration: 1ms !important; transition-duration: 1ms !important; }
}
.ui-as-search input::-webkit-search-cancel-button { display: none; }

/* Empty state in a dashed drop area */
.ui-as-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 16px;
  padding: 48px 24px 52px;
  border: 1px dashed var(--line-strong);
  border-radius: 14px;
  text-align: center;
}
.ui-as-empty[data-tall] { padding: 48px 24px 48px; }
.ui-as-empty__icon {
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  border-radius: 11px;
  background: var(--chip);
  color: var(--muted);
}
.ui-as-empty__title { margin-top: 16px; font-size: 14px; line-height: 20px; font-weight: 500; color: var(--ink); }
.ui-as-empty__text { max-width: 430px; margin: 6px 0 0; font-size: 13px; line-height: 19px; color: var(--muted); text-wrap: balance; }
.ui-as-empty > .ui-button { margin-top: 18px; }

/* Glass Folder from the library at icon size; hovering the whole card or row opens it like hovering the folder itself */
.ui-as-folder-card__icon, .ui-as-folder-head__icon {
  position: relative;
  flex: none;
  width: 30px;
  height: 25px;
}
.ui-as-folder-card__icon .ui-fd, .ui-as-folder-head__icon .ui-fd {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 75px;
  translate: -50% -50%;
}
:is(.ui-as-folder-card, .ui-as-folder-head):hover .ui-fd-icon { transform: translate(-50%, -48%) scale(1.03); }
:is(.ui-as-folder-card, .ui-as-folder-head):hover .ui-fd-doc--left { transform: translate(32px, 70px) rotate(9deg); }
:is(.ui-as-folder-card, .ui-as-folder-head):hover .ui-fd-doc--right { transform: translate(286px, 76px) rotate(5deg); }
:is(.ui-as-folder-card, .ui-as-folder-head):hover .ui-fd-doc--middle { transform: translate(166px, 52px) rotate(-7deg); }
:is(.ui-as-folder-card, .ui-as-folder-head):hover .ui-fd-front {
  top: 24.8%;
  border-radius: 3cqw 3cqw 6.333cqw 6.333cqw;
  transform: translateZ(2.33cqw) rotateX(-9deg);
}

.ui-as-meta { display: inline-flex; align-items: center; gap: 4px; font-size: 12.5px; line-height: 17px; color: var(--muted); }
.ui-as-meta svg { color: var(--faint); }


/* File card – used for templates and for the files inside a folder */
.ui-as-template { display: grid; width: 239px; text-align: left; }
.ui-as-template__preview {
  display: block;
  height: 158px;
  padding: 7px;
  border-radius: 14px;
  background: var(--card);
  box-shadow: 0 0 0 1px var(--line), var(--shadow);
  transition: box-shadow 160ms ease;
}
.ui-as-template:hover .ui-as-template__preview { box-shadow: 0 0 0 1px var(--line-strong), 0 2px 8px rgba(0, 0, 0, 0.05); }
.ui-as-template__name { margin-top: 10px; font-size: 13.5px; line-height: 18px; font-weight: 500; color: var(--ink); }
.ui-as-template .ui-as-meta { margin-top: 2px; }

/* File illustration in the Glass Folder style: tinted back sheet, paper page, frosted type badge */
.ui-as-doc {
  --doc-back: #5bb7ea;
  --doc-glass-1: rgba(120, 200, 245, 0.72);
  --doc-glass-2: rgba(52, 150, 212, 0.78);
  --doc-shade: 60, 130, 180;
  --doc-paper: #eaf2f8;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  border-radius: 10px;
  background: var(--card);
}
.ui-as-doc[data-color="rose"] {
  --doc-back: #f27b90;
  --doc-glass-1: rgba(250, 150, 170, 0.74);
  --doc-glass-2: rgba(222, 70, 100, 0.8);
  --doc-shade: 190, 60, 88;
  --doc-paper: #f9eef1;
}
.ui-as-doc[data-color="emerald"] {
  --doc-back: #4cc591;
  --doc-glass-1: rgba(110, 215, 165, 0.74);
  --doc-glass-2: rgba(30, 160, 102, 0.8);
  --doc-shade: 40, 140, 96;
  --doc-paper: #edf7f2;
}
.ui-as-doc__art { position: relative; display: block; width: 72px; height: 92px; }

/* Tinted sheet peeking out behind the page, like the back of the folder */
.ui-as-doc__back {
  position: absolute;
  inset: 0;
  border-radius: 11px;
  background: var(--doc-back);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.45), 0 10px 18px -8px rgba(var(--doc-shade), 0.45);
  transform: translate(10px, -4px) rotate(8deg);
  transition: transform 420ms var(--ease);
}

/* The page: white fading into a hint of the file's colour, like the documents in the folder */
.ui-as-doc__page {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 13px 11px;
  border-radius: 11px;
  background: linear-gradient(180deg, var(--doc-page, #fff) 0%, var(--doc-paper) 100%);
  box-shadow: 0 0 0 1px var(--doc-edge, rgba(0, 0, 0, 0.1)), 0 3px 5px rgba(var(--doc-shade), 0.16);
  transform: rotate(-3deg);
  transition: transform 420ms var(--ease);
}
.ui-as-doc__title { display: block; width: 58%; height: 5px; margin-bottom: 3px; border-radius: 3px; background: var(--doc-ink-strong, rgba(0, 0, 0, 0.2)); }
.ui-as-doc__line { display: block; height: 4px; border-radius: 2px; background: var(--doc-ink, rgba(0, 0, 0, 0.1)); }
.ui-as-doc__image {
  display: block;
  height: 26px;
  margin-bottom: 2px;
  border-radius: 5px;
  background: linear-gradient(160deg, var(--doc-glass-1), var(--doc-glass-2));
  opacity: 0.55;
}

/* Spreadsheet: a 3 × 6 grid with a darker header row */
.ui-as-sheet { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; }
.ui-as-sheet i { height: 8px; border-radius: 2px; background: var(--doc-cell, rgba(0, 0, 0, 0.07)); }
.ui-as-sheet i:nth-child(-n + 3) { background: rgba(var(--doc-shade), 0.35); }

/* Small frosted glass tag at the lower right corner, the same recipe as the folder's front pocket */
.ui-as-doc__type {
  position: absolute;
  right: -12px;
  bottom: 10px;
  z-index: 2;
  padding: 3px 6px;
  border-radius: 5px;
  background:
    linear-gradient(180deg, rgba(0, 0, 0, 0) 55%, rgba(var(--doc-shade), 0.25) 100%),
    linear-gradient(180deg, var(--doc-glass-1), var(--doc-glass-2));
  box-shadow:
    inset 0 0 0 1px rgba(255, 255, 255, 0.35),
    inset 0 1px 0 rgba(255, 255, 255, 0.6),
    0 6px 12px -4px rgba(var(--doc-shade), 0.45);
  -webkit-backdrop-filter: blur(4px) saturate(1.15);
  backdrop-filter: blur(4px) saturate(1.15);
  font-size: 10px;
  line-height: 13px;
  font-weight: 600;
  color: #fff;
  text-shadow: 0 1px 2px rgba(var(--doc-shade), 0.45);
  transition: transform 420ms var(--ease);
}
.ui-as-template:hover .ui-as-doc__back { transform: translate(14px, -7px) rotate(12deg); }
.ui-as-template:hover .ui-as-doc__page { transform: translateY(-4px) rotate(-5deg); }
.ui-as-template:hover .ui-as-doc__type { transform: translate(2px, -2px); }

/* Workspace initial and user initials */
.ui-as-side__logo { font-size: 10.5px; font-weight: 600; color: var(--ink); }
.ui-as-user__initials {
  display: grid;
  place-items: center;
  width: 21px;
  height: 21px;
  border-radius: 50%;
  background: var(--accent-soft);
  font-size: 9.5px;
  font-weight: 600;
  color: var(--accent);
}

/* File illustrations in dark mode: dark paper tinted by the file's color, light lines */
:where(.dark, [data-theme="dark"]) .ui-as-doc {
  --doc-page: #303238;
  --doc-edge: rgba(255, 255, 255, 0.1);
  --doc-ink: rgba(255, 255, 255, 0.14);
  --doc-ink-strong: rgba(255, 255, 255, 0.3);
  --doc-cell: rgba(255, 255, 255, 0.08);
}
:where(.dark, [data-theme="dark"]) .ui-as-doc { --doc-paper: #263039; }
:where(.dark, [data-theme="dark"]) .ui-as-doc[data-color="rose"] { --doc-paper: #36282d; }
:where(.dark, [data-theme="dark"]) .ui-as-doc[data-color="emerald"] { --doc-paper: #243530; }

/* Scrim behind the drawer – only used on narrow screens */
.ui-as-scrim { display: none; }

/* ---------- Narrow: tablet and phone ---------- */
/* Container queries on the app itself, so a scaled 1440 px preview keeps the desktop layout */

@container ui-as (max-width: 900px) {
  /* The main panel takes the whole width; the sidebar slides in over it as a drawer */
  .ui-as-app > .ui-as-main { grid-row: 1; grid-column: 1 / -1; margin-left: var(--frame-gap); }
  .ui-as-app > .ui-as-side {
    position: absolute;
    z-index: 50;
    top: 0;
    bottom: 0;
    left: 0;
    width: min(264px, calc(100% - 56px));
    padding: 10px 10px 10px 12px;
    border-radius: 0 18px 18px 0;
    background: var(--page);
    box-shadow: 0 0 0 1px var(--line), 0 24px 48px -12px rgba(0, 0, 0, 0.28);
  }
  .ui-as-app:not([data-drawer]) > .ui-as-side {
    visibility: hidden;
    translate: calc(-100% - 24px) 0;
    transition: translate 380ms var(--ease), visibility 0s 380ms;
  }
  .ui-as-app[data-drawer] > .ui-as-side {
    visibility: visible;
    opacity: 1;
    translate: 0 0;
    transition: translate 420ms var(--ease), visibility 0s;
  }
  .ui-as-app > .ui-as-scrim {
    display: block;
    position: absolute;
    z-index: 45;
    inset: 0;
    background: rgba(0, 0, 0, 0.28);
    visibility: hidden;
    opacity: 0;
    transition: opacity 300ms ease, visibility 0s 300ms;
  }
  .ui-as-app[data-drawer] > .ui-as-scrim { visibility: visible; opacity: 1; transition: opacity 300ms ease, visibility 0s; }
  :where(.dark, [data-theme="dark"]) .ui-as-app > .ui-as-scrim { background: rgba(0, 0, 0, 0.55); }
  /* The icon to open it always waits in the top left corner of the panel */
  .ui-as-app:not([data-drawer]) > .ui-as-side-open {
    visibility: visible;
    opacity: 1;
    transition: opacity 260ms ease 160ms, visibility 0s;
  }
  /* It stays put while the panel scrolls, so it gets the panel's color behind it */
  .ui-as-app > .ui-as-side-open { left: calc(var(--frame-gap) + 9px); background: var(--panel); }
  .ui-as-app > .ui-as-side-open:hover { background: var(--chip); }

  /* Page parts: less padding, toolbars wrap */
  .ui-as-page { padding: 46px 24px 48px; }
  /* File cards fill the cells of the grids the screens switch to */
  .ui-as-main .ui-as-file-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); }
  .ui-as-main .ui-as-file-grid .ui-as-template { width: 100%; }
  .ui-as-main .ui-as-file-grid .ui-as-template__name { overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }
  .ui-as-main .ui-as-file-grid .ui-as-meta { display: block; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }
  .ui-as-main .ui-as-file-grid .ui-as-meta svg { display: inline-block; vertical-align: -2px; }
  .ui-as-toolbar { flex-wrap: wrap; row-gap: 10px; }
  .ui-as-toolbar__right { flex-wrap: wrap; }
  .ui-as-section-head[data-inline] { flex-wrap: wrap; row-gap: 12px; }
}

@container ui-as (max-width: 600px) {
  .ui-as-app > * { --frame-gap: 6px; }
  .ui-as-app > .ui-as-main { border-radius: 16px; }
  .ui-as-page { padding: 52px 16px 40px; }
  .ui-as-page-title { font-size: 20px; line-height: 26px; }
  .ui-as-section-head { margin-top: 32px; }
  /* Toolbars: tabs on their own line, the tools below; search takes what is left */
  .ui-as-toolbar__left, .ui-as-toolbar__right { width: 100%; }
  .ui-as-toolbar__right .ui-as-search { order: 9; flex: 1 1 100%; width: auto !important; }
  .ui-as-toolbar__right > .ui-button:last-child { margin-left: auto; }
  .ui-as-tabs { max-width: 100%; overflow-x: auto; scrollbar-width: none; }
  .ui-as-tabs__tab { flex: none; }
  .ui-as-empty { padding: 36px 18px 40px; }
  .ui-as-popover--filter .ui-fm { width: 300px; }
  .ui-as-main .ui-as-file-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px 10px; }
  .ui-as-main .ui-as-file-grid .ui-as-template__preview { height: 128px; }
}
`;
var valueValue13: IconNode = [
  [
    `path`,
    {
      d: `M8 9V17`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `0`,
    },
  ],
  [
    `path`,
    {
      d: `M13 5V17`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `1`,
    },
  ],
  [
    `path`,
    {
      d: `M18 13V17`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `2`,
    },
  ],
  [
    `path`,
    {
      d: `M3 3V13C3 16.7712 3 18.6569 4.17157 19.8284C5.34315 21 7.22876 21 11 21H21`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `3`,
    },
  ],
];
var valueValue14: IconNode = [
  [
    `path`,
    {
      d: `M3 12C3 7.75736 3 5.63604 4.31802 4.31802C5.63604 3 7.75736 3 12 3C16.2426 3 18.364 3 19.682 4.31802C21 5.63604 21 7.75736 21 12C21 16.2426 21 18.364 19.682 19.682C18.364 21 16.2426 21 12 21C7.75736 21 5.63604 21 4.31802 19.682C3 18.364 3 16.2426 3 12Z`,
      stroke: `currentColor`,
      strokeWidth: `1.5`,
      key: `0`,
    },
  ],
  [
    `path`,
    {
      d: `M3 12H21`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `1`,
    },
  ],
  [
    `path`,
    {
      d: `M11 7.5L17 7.5`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `2`,
    },
  ],
  [
    `path`,
    {
      d: `M7.125 7.5H7M7.25 7.5C7.25 7.63807 7.13807 7.75 7 7.75C6.86193 7.75 6.75 7.63807 6.75 7.5C6.75 7.36193 6.86193 7.25 7 7.25C7.13807 7.25 7.25 7.36193 7.25 7.5Z`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `3`,
    },
  ],
  [
    `path`,
    {
      d: `M11 16.5L17 16.5`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `4`,
    },
  ],
  [
    `path`,
    {
      d: `M7.125 16.5H7M7.25 16.5C7.25 16.6381 7.13807 16.75 7 16.75C6.86193 16.75 6.75 16.6381 6.75 16.5C6.75 16.3619 6.86193 16.25 7 16.25C7.13807 16.25 7.25 16.3619 7.25 16.5Z`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `5`,
    },
  ],
];
var valueValue15: IconNode = [
  [
    `circle`,
    {
      cx: `12`,
      cy: `12`,
      r: `10`,
      stroke: `currentColor`,
      strokeWidth: `1.5`,
      key: `0`,
    },
  ],
  [
    `path`,
    {
      d: `M8 12C8 18 12 22 12 22C12 22 16 18 16 12C16 6 12 2 12 2C12 2 8 6 8 12Z`,
      stroke: `currentColor`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `1`,
    },
  ],
  [
    `path`,
    {
      d: `M21 15H3`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `2`,
    },
  ],
  [
    `path`,
    {
      d: `M21 9H3`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `3`,
    },
  ],
];
var valueValue16: IconNode = [
  [
    `path`,
    {
      d: `M20 10C20 10 22.375 11.8222 21.375 14.6667C20.375 17.5111 21.375 19.4074 22 20M20 10H4M20 10V4M4 10C4 10 1.625 11.8222 2.625 14.6667C3.625 17.5111 2.625 19.4074 2 20M4 10V4M22 4H20.75H20M2 4H3.25H4M4 4H20`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `0`,
    },
  ],
  [
    `path`,
    {
      d: `M11 7H13`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `1`,
    },
  ],
];
var valueValue17: IconNode = [
  [
    `path`,
    {
      d: `M3 20.5002C3.28417 16.8058 6.3 13.7193 10.0008 13.5379C10.3134 13.5226 10.6446 13.5097 11 13.5L11.995 13.5663C12.6939 13.6129 13.3665 13.7543 14 13.9777`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `0`,
    },
  ],
  [
    `path`,
    {
      d: `M18 15.5V21.5M21 18.5L15 18.5`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `1`,
    },
  ],
  [
    `circle`,
    {
      cx: `11`,
      cy: `6.5`,
      r: `4`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `2`,
    },
  ],
];
var valueValue: IconNode = [
  [
    `path`,
    {
      d: `M13.427 8.08396C12.8007 5.84272 12.3226 4 11.0004 4C9.67824 4 9.19964 5.84274 8.5731 8.08399C8.31853 8.99465 8.19125 9.44998 7.82042 9.82077C7.4496 10.1916 6.99434 10.3188 6.08381 10.5732C3.84273 11.1995 2 11.6775 2 13C2 14.3225 3.84273 14.8005 6.08381 15.4268C6.99434 15.6812 7.4496 15.8084 7.82042 16.1792C8.19125 16.55 8.31853 17.0054 8.5731 17.916C9.19964 20.1573 9.67824 22 11.0004 22C12.3226 22 12.8007 20.1573 13.427 17.916C13.6815 17.0054 13.8087 16.5501 14.1795 16.1793C14.5504 15.8085 15.0056 15.6812 15.9162 15.4268C18.1573 14.8005 20 14.3225 20 13C20 11.6775 18.1573 11.1995 15.9162 10.5732C15.0056 10.3188 14.5504 10.1915 14.1795 9.8207C13.8087 9.44986 13.6815 8.99456 13.427 8.08396Z`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `0`,
    },
  ],
  [
    `path`,
    {
      d: `M19.5 2.9375V4.5M19.5 4.5V6.0625M19.5 4.5H18.25M19.5 4.5H20.75M22 4.5L21.548 4.34934C20.8497 4.11658 20.5006 4.00019 20.2502 3.74981C19.9998 3.49942 19.8834 3.15027 19.6507 2.45198L19.5 2L19.3493 2.45198C19.1166 3.15027 19.0002 3.49942 18.7498 3.74981C18.4994 4.00019 18.1503 4.11658 17.452 4.34934L17 4.5L17.452 4.65066C18.1503 4.88342 18.4994 4.99981 18.7498 5.25019C19.0002 5.50058 19.1166 5.84973 19.3493 6.54802L19.5 7L19.6507 6.54802C19.8834 5.84973 19.9998 5.50058 20.2502 5.25019C20.5006 4.99981 20.8497 4.88342 21.548 4.65066L22 4.5Z`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `1`,
    },
  ],
];
var valueValue2: IconNode = [
  [
    `path`,
    {
      d: `M12 5.5V19`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `0`,
    },
  ],
  [
    `path`,
    {
      d: `M18 11C18 11 13.5811 5.00001 12 5C10.4188 4.99999 6 11 6 11`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `1`,
    },
  ],
];
var ValueValue: IconNode = [
  [
    `path`,
    {
      d: `M8 7L16 7`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `0`,
    },
  ],
  [
    `path`,
    {
      d: `M8 11L12 11`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `1`,
    },
  ],
  [
    `path`,
    {
      d: `M13 21.5V21C13 18.1716 13 16.7574 13.8787 15.8787C14.7574 15 16.1716 15 19 15H19.5M20 13.3431V10C20 6.22876 20 4.34315 18.8284 3.17157C17.6569 2 15.7712 2 12 2C8.22877 2 6.34315 2 5.17157 3.17157C4 4.34314 4 6.22876 4 10L4 14.5442C4 17.7892 4 19.4117 4.88607 20.5107C5.06508 20.7327 5.26731 20.9349 5.48933 21.1139C6.58831 22 8.21082 22 11.4558 22C12.1614 22 12.5141 22 12.8372 21.886C12.9044 21.8623 12.9702 21.835 13.0345 21.8043C13.3436 21.6564 13.593 21.407 14.0919 20.9081L18.8284 16.1716C19.4065 15.5935 19.6955 15.3045 19.8478 14.9369C20 14.5694 20 14.1606 20 13.3431Z`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `2`,
    },
  ],
];
var ValueValue2: IconNode = [
  [
    `circle`,
    {
      cx: `7.5`,
      cy: `7.5`,
      r: `1.5`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `0`,
    },
  ],
  [
    `path`,
    {
      d: `M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z`,
      stroke: `currentColor`,
      strokeWidth: `1.5`,
      key: `1`,
    },
  ],
  [
    `path`,
    {
      d: `M5 21C9.37246 15.775 14.2741 8.88406 21.4975 13.5424`,
      stroke: `currentColor`,
      strokeWidth: `1.5`,
      key: `2`,
    },
  ],
];
var valueValue3: IconNode = [
  [
    `path`,
    {
      d: `M7 6.5C7 4.01472 9.01472 2 11.5 2C13.9853 2 16 4.01472 16 6.5V11.5C16 13.9853 13.9853 16 11.5 16C9.01472 16 7 13.9853 7 11.5V6.5Z`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `0`,
    },
  ],
  [
    `path`,
    {
      d: `M11.5 19H11.0828C7.57267 19 4.57706 16.4623 4 13M11.5 19H11.9172C15.4273 19 18.4229 16.4623 19 13M11.5 19V22`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `1`,
    },
  ],
];
var ValueValue3: IconNode = [
  [
    `path`,
    {
      d: `M15.5 2V6M8.5 6V2`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `0`,
    },
  ],
  [
    `path`,
    {
      d: `M6.00446 7.61331C5.93719 6.74273 6.63957 6 7.53014 6H16.4699C17.3604 6 18.0628 6.74273 17.9955 7.61331L17.8117 9.99197C17.6796 11.7019 17.1011 13.3498 16.132 14.7773L15.5312 15.6622C14.9638 16.4979 14.0077 17 12.9838 17H11.0162C9.99228 17 9.03617 16.4979 8.46881 15.6622L7.86803 14.7773C6.89885 13.3498 6.32041 11.7019 6.18827 9.99197L6.00446 7.61331Z`,
      stroke: `currentColor`,
      strokeWidth: `1.5`,
      key: `1`,
    },
  ],
  [
    `path`,
    {
      d: `M12 17V22`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `2`,
    },
  ],
  [
    `path`,
    {
      d: `M11 9H13`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `3`,
    },
  ],
];
var ValueValue4: IconNode = [
  [
    `path`,
    {
      d: `M15 2L15.5387 4.39157C15.9957 6.42015 17.5798 8.00431 19.6084 8.46127L22 9L19.6084 9.53873C17.5798 9.99569 15.9957 11.5798 15.5387 13.6084L15 16L14.4613 13.6084C14.0043 11.5798 12.4202 9.99569 10.3916 9.53873L8 9L10.3916 8.46127C12.4201 8.00431 14.0043 6.42015 14.4613 4.39158L15 2Z`,
      stroke: `currentColor`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `0`,
    },
  ],
  [
    `path`,
    {
      d: `M7 12L7.38481 13.7083C7.71121 15.1572 8.84275 16.2888 10.2917 16.6152L12 17L10.2917 17.3848C8.84275 17.7112 7.71121 18.8427 7.38481 20.2917L7 22L6.61519 20.2917C6.28879 18.8427 5.15725 17.7112 3.70827 17.3848L2 17L3.70827 16.6152C5.15725 16.2888 6.28879 15.1573 6.61519 13.7083L7 12Z`,
      stroke: `currentColor`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `1`,
    },
  ],
];
var ValueValue5: IconNode = [
  [
    `path`,
    {
      d: `M16.1995 2.62118C17.0064 2.153 17.4099 1.91892 17.8053 2.02539C18.2007 2.13186 18.4336 2.53732 18.8995 3.34823L20.3819 5.92852C20.8478 6.73943 21.0807 7.14489 20.9747 7.54225C20.8688 7.93961 20.4653 8.1737 19.6584 8.64188L16.235 10.6282C15.4281 11.0964 15.0247 11.3305 14.6293 11.224C14.2339 11.1175 14.0009 10.7121 13.5351 9.90115L12.0527 7.32085C11.5868 6.50994 11.3539 6.10449 11.4598 5.70713C11.5658 5.30977 11.9692 5.07568 12.7761 4.6075L16.1995 2.62118Z`,
      stroke: `currentColor`,
      strokeWidth: `1.5`,
      key: `0`,
    },
  ],
  [
    `path`,
    {
      d: `M11.5585 6.46075L14.0292 10.7613L10.6058 12.7476C9.79886 13.2157 9.39541 13.4498 9.00001 13.3434C8.60461 13.2369 8.37167 12.8314 7.9058 12.0205L7.41168 11.1604C6.94581 10.3495 6.71288 9.94406 6.81882 9.5467C6.92477 9.14934 7.32822 8.91525 8.13513 8.44707L11.5585 6.46075Z`,
      stroke: `currentColor`,
      strokeWidth: `1.5`,
      key: `1`,
    },
  ],
  [
    `path`,
    {
      d: `M6.91755 10.3003L8.39993 12.8806L5.40444 14.6186C5.00566 14.85 4.80627 14.9657 4.61138 14.9915C4.35152 15.0259 4.08871 14.9551 3.88077 14.7948C3.72482 14.6745 3.6097 14.4741 3.37947 14.0734C3.14923 13.6726 3.03412 13.4722 3.00846 13.2764C2.97425 13.0152 3.04467 12.7511 3.20422 12.5421C3.32389 12.3854 3.52328 12.2697 3.92206 12.0384L6.91755 10.3003Z`,
      stroke: `currentColor`,
      strokeWidth: `1.5`,
      key: `2`,
    },
  ],
  [
    `path`,
    {
      d: `M7.5 22L12 12L16.5 22`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `3`,
    },
  ],
];
var ValueValue6 = [
  [
    {
      label: `Company knowledge`,
      icon: valueValue14,
    },
    {
      label: `Create document`,
      icon: ValueValue,
    },
    {
      label: `Create presentation`,
      icon: PresentationBarChart01Icon,
    },
    {
      label: `Create table`,
      icon: valueValue16,
    },
  ],
  [
    {
      label: `Generate image`,
      icon: ValueValue2,
    },
    {
      label: `Deep research`,
      icon: ValueValue5,
    },
    {
      label: `Visualize data`,
      icon: valueValue13,
    },
  ],
];
function valueValue4() {
  let e = new Date().getHours();
  return e < 11 ? `Good morning!` : e < 18 ? `Good afternoon!` : `Good evening!`;
}
function ValueValue7(e: string): ChatReply {
  let t = e.toLowerCase();
  return /document|doc|write/.test(t)
    ? {
        steps: [
          {
            kind: `step`,
            label: `Reading your request`,
          },
          {
            kind: `step`,
            label: `Checking Brand assets for tone of voice`,
          },
          {
            kind: `step`,
            label: `Outlining the document`,
          },
        ],
        paragraphs: [
          `Here's an outline to start from – it follows your Tone-of-Voice guide:`,
          `1. Summary – what this is about and why it matters now, in three sentences.`,
          `2. Context – the numbers behind it, taken from Q3 Campaign.`,
          `3. Proposal – what we do next, who owns it and by when.`,
          `Shall I write the full draft into a new document in Q3 Campaign?`,
        ],
      }
    : /research|study|market/.test(t)
      ? {
          steps: [
            {
              kind: `step`,
              label: `Planning the research`,
            },
            {
              kind: `step`,
              label: `Reading Market-Study and Survey-Results`,
            },
            {
              kind: `step`,
              label: `Comparing the findings`,
            },
          ],
          paragraphs: [
            `Two things stand out in your Research folder:`,
            `Customers who buy twice do so within 30 days – after that, repeat orders drop by more than half.`,
            `Price is rarely the reason to leave; slow delivery is named three times as often.`,
            `Want a short report with sources, ready to share with the team?`,
          ],
        }
      : /table|data|visual|chart/.test(t)
        ? {
            steps: [
              {
                kind: `step`,
                label: `Reading Media-Budget and Results-Q2`,
              },
              {
                kind: `step`,
                label: `Matching spend to results`,
              },
              {
                kind: `step`,
                label: `Building the table`,
              },
            ],
            paragraphs: [
              `I matched your Q2 spend against results per channel:`,
              `Organic brought the most revenue at no media cost, paid ads the most new customers, and email the best return per dollar.`,
              `Shall I add this as a table to Q3 Campaign, with a chart for the weekly trend?`,
            ],
          }
        : {
            steps: [
              {
                kind: `step`,
                label: `Reading your message`,
              },
              {
                kind: `step`,
                label: `Looking through Q3 Campaign and Brand assets`,
              },
              {
                kind: `step`,
                label: `Sorting ideas by effort and impact`,
              },
            ],
            paragraphs: [
              `Here are a few directions for “${e}”:`,
              `1. Start with the problem customers name most often in reviews and support chats – it gives every idea a real reason to exist.`,
              `2. Turn your strongest proof into the story: 412 orders of the Linen Overshirt last month make a good headline.`,
              `3. Test two angles side by side for a week before you commit budget – desire-driven and problem–solution usually split clearly.`,
              `Want me to turn one of these into a brief or a first draft?`,
            ],
          };
}
function AssistantHome(e: AppShellProps) {
  let [t, n] = React.useState(`start`),
    r = ValueValue8(ValueValue7),
    i = React.useRef<HTMLDivElement | null>(null),
    a = React.useRef<DOMRect | null>(null),
    o = React.useRef<HTMLDivElement | null>(null),
    s = (e: string) => {
      if (t !== `start`) return r.send(e);
      ((a.current = i.current?.getBoundingClientRect() ?? null),
        n(`leaving`),
        window.setTimeout(() => {
          (n(`chat`), r.send(e));
        }, 180));
    };
  return (
    React.useLayoutEffect(() => {
      let e = i.current;
      if (t !== `chat` || !e || !a.current) return;
      let n = e.getBoundingClientRect(),
        r = n.width / e.offsetWidth || 1,
        o = (a.current.top - n.top) / r;
      ((a.current = null),
        e.animate(
          [
            {
              transform: `translateY(${o}px)`,
            },
            {
              transform: `none`,
            },
          ],
          {
            duration: 720,
            easing: `cubic-bezier(0.22, 1, 0.36, 1)`,
          },
        ));
    }, [t]),
    (
      <AppShell active={`New chat`} {...e}>
        <style href={`ui-screen-assistant-home`} precedence={`default`}>
          {ValueValue18}
        </style>
        <button type={`button`} className={`ui-as-invite`}>
          <Icon icon={valueValue17} size={14} />
          {`Invite people`}
        </button>
        <section className={`ui-as-start`} data-phase={t}>
          {t === `chat` && (
            <div ref={o} className={`ui-as-start__thread`}>
              <div className={`ui-as-start__column`}>
                <ValueValue9
                  messages={r.messages}
                  name={`Assistant`}
                  scroller={o}
                  onDone={r.finish}
                />
              </div>
            </div>
          )}
          {t !== `chat` && (
            <h1 className={`ui-as-start__title`}>
              {valueValue4()}
              {` What's next on your list?`}
            </h1>
          )}
          <div ref={i} className={`ui-as-start__composer`}>
            <ValueValue13 onSend={s} busy={r.busy} placeholder={t === `chat` ? `Reply…` : void 0} />
          </div>
          {t !== `chat` && (
            <div className={`ui-as-chips`}>
              {ValueValue6.map((e, t) => (
                <div className={`ui-as-chips__row`} key={t}>
                  {e.map((e) => (
                    <button
                      type={`button`}
                      className={`ui-as-chip`}
                      onClick={() => s(e.label)}
                      key={e.label}
                    >
                      <Icon icon={e.icon} size={15} />
                      {e.label}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          )}
        </section>
      </AppShell>
    )
  );
}
function ValueValue8(e: (message: string) => ChatReply) {
  let [t, n] = React.useState<ChatMessage[]>([]),
    [r, i] = React.useState(false);
  return {
    messages: t,
    busy: r,
    send: (t: string) => {
      if (r || !t.trim()) return;
      let a = Date.now();
      (n((n) => [
        ...n,
        {
          id: a,
          role: `user`,
          text: t,
        },
        {
          id: a + 1,
          role: `assistant`,
          reply: e(t),
        },
      ]),
        i(true));
    },
    finish: () => i(false),
  };
}
function ValueValue9({ messages: messages, name: name, scroller: scroller, onDone: onDone }: MessageListProps) {
  let i = () => {
    let e = scroller.current;
    e &&
      e.scrollHeight - e.scrollTop - e.clientHeight < 160 &&
      e.scrollTo({
        top: e.scrollHeight,
        behavior: `smooth`,
      });
  };
  return (
    React.useEffect(i, [messages.length]),
    (
      <>
        <style href={`ui-screen-chat`} precedence={`default`}>
          {ValueValue11}
        </style>
        {messages.map((e) =>
          e.role === `user` ? (
            <p className={`ui-as-msg-user`} key={e.id}>
              {e.text}
            </p>
          ) : (
            <ValueValue10 name={name} reply={e.reply} onGrow={i} onDone={onDone} key={e.id} />
          ),
        )}
      </>
    )
  );
}
function ValueValue10({ name: name, reply: reply, onGrow: onGrow, onDone: onDone }: ReplyProps) {
  let [o, s] = React.useState(false),
    [c, l] = React.useState(0),
    u = reply.paragraphs.map((e: string) => e.split(` `)),
    d = u.reduce((e, t) => e + t.length, 0);
  (React.useEffect(() => {
    if (!o) return;
    let e = window.setInterval(() => l((e) => Math.min(e + 2, d)), 45);
    return () => window.clearInterval(e);
  }, [o, d]),
    React.useEffect(() => {
      o && (onGrow(), c >= d && onDone());
    }, [c, o]));
  let f = c;
  return (
    <div className={`ui-as-msg`}>
      <span className={`ui-as-msg__who`}>
        <span className={`ui-as-msg__avatar`}>
          <Icon icon={ClaudeIcon} size={12} />
        </span>
        {name}
      </span>
      <ThinkingState
        className={`ui-as-msg__thinking`}
        steps={reply.steps}
        stepMs={700}
        doneLabel={`Ready`}
        onDone={() => (s(true), onGrow())}
      />
      {o &&
        u.map((e, t) => {
          let n = Math.max(0, Math.min(e.length, f));
          return (
            (f -= e.length),
            n > 0 ? (
              <p className={`ui-as-msg__p`} key={t}>
                {e.slice(0, n).join(` `)}
              </p>
            ) : null
          );
        })}
    </div>
  );
}
var ValueValue11 = `
/* Chat thread shared by Assistant Home and Agent Chat */
.ui-as-msg-user {
  align-self: flex-end;
  max-width: 80%;
  margin: 0;
  padding: 9px 14px;
  border-radius: 16px;
  background: var(--chip);
  font-size: 14px;
  line-height: 1.5;
  color: var(--ink);
  animation: ui-as-msg-in 480ms var(--ease) both;
}
.ui-as-msg {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  font-size: 14px;
  line-height: 1.6;
  color: var(--ink);
  animation: ui-as-msg-in 480ms var(--ease) 160ms both;
}
.ui-as-msg__who { display: flex; align-items: center; gap: 8px; font-weight: 500; }
.ui-as-msg__avatar { display: grid; place-items: center; width: 22px; height: 22px; border-radius: 50%; background: var(--chip); color: var(--ink); }
.ui-as-msg__thinking.ui-think { zoom: 0.92; width: 100%; max-width: 440px; }
.ui-as-msg__p { margin: 0; animation: ui-as-msg-fade 360ms ease both; }
@keyframes ui-as-msg-in { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: none; } }
@keyframes ui-as-msg-fade { from { opacity: 0; } to { opacity: 1; } }
`;
var ValueValue12 = [
  {
    name: `Auto`,
    description: `Picks the best model for each task`,
    icon: valueValue,
  },
  {
    name: `Claude`,
    description: `Thoughtful writing and code`,
    icon: ClaudeIcon,
  },
  {
    name: `ChatGPT`,
    description: `Quick answers for everyday tasks`,
    icon: ValueValue4,
  },
  {
    name: `Gemini`,
    description: `Long documents and research`,
    icon: ValueValue5,
  },
];
var valueValue5 = [
  {
    label: `Web search`,
    description: `Look things up while answering`,
    icon: valueValue15,
  },
  {
    label: `Canvas`,
    description: `Write and edit side by side`,
    icon: EditIcon,
  },
  {
    label: `Image generation`,
    description: `Create images from a prompt`,
    icon: ValueValue2,
  },
];
function ValueValue13({
  placeholder = `Help me brainstorm ideas for...`,
  onSend: onSend,
  busy: busy,
  className: className,
}: ComposerProps) {
  let [a, s] = React.useState(``),
    m = React.useRef<HTMLTextAreaElement | null>(null),
    h = React.useRef<HTMLInputElement | null>(null),
    [g, _] = React.useState(ValueValue12[0].name),
    [v, y] = React.useState<string[]>([]),
    [C, E] = React.useState<string | null>(null),
    [D, A] = React.useState([`Gmail`]),
    [j, M] = React.useState<string[]>([]),
    [N, P] = React.useState(false),
    F = (e: string[], t: string) => (e.includes(t) ? e.filter((e) => e !== t) : [...e, t]);
  (React.useEffect(() => {
    if (!N) return;
    let e = window.setTimeout(() => {
      (s((e) => (e ? e + ` ` : ``) + `Draft a short update for the team about this week.`),
        P(false),
        m.current?.focus());
    }, 1800);
    return () => window.clearTimeout(e);
  }, [N]),
    React.useLayoutEffect(() => {
      let e = m.current;
      e && ((e.style.height = `auto`), (e.style.height = `${Math.min(e.scrollHeight, 120)}px`));
    }, [a]));
  let I = () => {
    a.trim() && !busy && (onSend?.(a.trim()), s(``), M([]));
  };
  return (
    <form
      className={[`ui-as-composer`, className].filter(Boolean).join(` `)}
      onSubmit={(e) => (e.preventDefault(), I())}
    >
      <style href={`ui-screen-composer`} precedence={`default`}>
        {ValueValue19}
      </style>
      <div className={`ui-as-composer__card`}>
        {j.length > 0 && (
          <div className={`ui-as-attachments`}>
            {j.map((e) => (
              <span className={`ui-as-attachment`} key={e}>
                <Icon icon={ValueValue} size={13} />
                {e}
                <button
                  type={`button`}
                  aria-label={`Remove ${e}`}
                  onClick={() => M((t) => t.filter((t) => t !== e))}
                >
                  <Icon icon={CloseIcon} size={11} />
                </button>
              </span>
            ))}
          </div>
        )}
        <textarea
          ref={m}
          className={`ui-as-composer__field`}
          rows={1}
          value={a}
          placeholder={placeholder}
          aria-label={`Message`}
          onChange={(e) => s(e.target.value)}
          onKeyDown={(e) => {
            e.key === `Enter` && !e.shiftKey && (e.preventDefault(), I());
          }}
        />
        <div className={`ui-as-composer__bar`}>
          <button
            type={`button`}
            className={`ui-as-icon-btn`}
            aria-label={`Add file`}
            onClick={() => h.current?.click()}
          >
            <Icon icon={PlusIcon} size={15} />
          </button>
          <input
            ref={h}
            type={`file`}
            multiple={true}
            hidden={true}
            onChange={(e) => {
              let t = [...(e.target.files ?? [])].map((e) => e.name);
              (M((e) => [...e, ...t.filter((t) => !e.includes(t))]), (e.target.value = ``));
            }}
          />
          <DropdownMenu
            title={`Plugins`}
            items={valueValue5.map((e) => ({
              label: e.label,
              description: e.description,
              icon: e.icon,
              checked: v.includes(e.label),
              onSelect: () => y((t) => F(t, e.label)),
            }))}
            trigger={({ open: open, toggle: toggle }) => (
              <button
                type={`button`}
                className={`ui-as-ghost`}
                aria-expanded={open}
                data-active={v.length > 0 || void 0}
                onClick={toggle}
              >
                <Icon icon={ValueValue3} size={14} />
                {v.length ? `Plugins · ${v.length}` : `Plugins`}
              </button>
            )}
          />
          <span className={`ui-as-composer__end`}>
            <DropdownMenu
              align={`end`}
              title={`Model`}
              items={ValueValue12.map((e) => ({
                label: e.name,
                description: e.description,
                icon: e.icon,
                checked: e.name === g,
                onSelect: () => _(e.name),
              }))}
              trigger={({ open: open, toggle: toggle }) => (
                <button
                  type={`button`}
                  className={`ui-as-ghost ui-as-ghost--model`}
                  aria-expanded={open}
                  aria-haspopup={`menu`}
                  onClick={toggle}
                >
                  <Icon
                    icon={ValueValue12.find((e) => e.name === g)?.icon ?? valueValue}
                    size={14}
                  />
                  {g}
                  <Icon icon={ChevronDownIcon} size={12} />
                </button>
              )}
            />
            <button
              type={`button`}
              className={`ui-as-icon-btn ui-as-mic`}
              aria-label={N ? `Stop dictation` : `Dictate`}
              aria-pressed={N}
              onClick={() => P((e) => !e)}
            >
              <Icon icon={valueValue3} size={15} />
            </button>
            <button
              type={`submit`}
              className={`ui-as-send`}
              aria-label={`Send`}
              disabled={!a.trim() || busy}
            >
              <Icon icon={valueValue2} size={15} />
            </button>
          </span>
        </div>
      </div>
      <div className={`ui-as-composer__tray`}>
        <DropdownMenu
          title={`Work in a folder`}
          items={[
            ...defaultProjects.map((e) => ({
              label: e,
              icon: FolderIcon,
              checked: C === e,
              onSelect: () => E(C === e ? null : e),
            })),
          ]}
          trigger={({ open: open, toggle: toggle }) => (
            <button
              type={`button`}
              className={`ui-as-tray-link`}
              aria-expanded={open}
              onClick={toggle}
            >
              <span className={`ui-as-tray-link__folder`}>
                <GlassFolderComponent label={``} />
              </span>
              {C ?? `Work in a folder`}
            </button>
          )}
        />
        <DropdownMenu
          align={`end`}
          title={`Apps`}
          items={[`Gmail`, `Slack`, `ClickUp`].map((e) => ({
            label: e,
            description: D.includes(e) ? `Connected` : `Not connected`,
            checked: D.includes(e),
            onSelect: () => A((t) => F(t, e)),
          }))}
          trigger={({ open: open, toggle: toggle }) => (
            <button
              type={`button`}
              className={`ui-as-tray-link ui-as-tray-link--apps`}
              aria-expanded={open}
              onClick={toggle}
            >
              {`Connect apps`}
              <span className={`ui-as-apps`} aria-hidden={`true`}>
                <ValueValue15 />
                <ValueValue16 />
                <ValueValue17 />
              </span>
            </button>
          )}
        />
      </div>
    </form>
  );
}
var ValueValue14 = () => `lg` + React.useId().replace(/[^a-zA-Z0-9_-]/g, ``);
var ValueValue15 = () => {
  let e = ValueValue14();
  return (
    <svg viewBox={`0 0 56.4108 44.8722`} fill={`none`} aria-hidden={`true`}>
      <path
        d={`M44.2255 5.76727H56.4051V41.0239C56.4051 43.148 54.683 44.8701 52.5589 44.8701H46.1486C45.8961 44.8701 45.646 44.8204 45.4127 44.7237C45.1794 44.6271 44.9674 44.4854 44.7888 44.3069C44.6102 44.1283 44.4686 43.9163 44.3719 43.683C44.2753 43.4497 44.2255 43.1996 44.2255 42.947V5.76727Z`}
        fill={`url(#${e}-0)`}
      />
      <path
        d={`M12.1796 5.76727H0V41.0239C0 43.148 1.72213 44.8701 3.84618 44.8701H10.2565C10.509 44.8701 10.7591 44.8204 10.9924 44.7237C11.2257 44.6271 11.4377 44.4854 11.6163 44.3069C11.7949 44.1283 11.9365 43.9163 12.0332 43.683C12.1298 43.4497 12.1796 43.1996 12.1796 42.947V5.76727Z`}
        fill={`#FC413D`}
      />
      <path
        d={`M10.0085 1.42778C7.43377 -0.736342 3.5924 -0.403647 1.42828 2.17105C-0.735843 4.74543 -0.403148 8.58681 2.17155 10.7512L26.5557 31.2479C27.0178 31.6362 27.602 31.8492 28.2056 31.8492C28.8091 31.8492 29.3934 31.6362 29.8554 31.2479L54.2396 10.7509C56.814 8.58681 57.1467 4.74543 54.9825 2.17073C52.8184 -0.403648 48.977 -0.736342 46.4027 1.42778L28.2054 16.724L10.0085 1.42778Z`}
        fill={`url(#${e}-1)`}
      />
      <defs>
        <linearGradient
          id={`${e}-0`}
          x1={`50.3153`}
          y1={`5.76727`}
          x2={`50.3153`}
          y2={`44.8701`}
          gradientUnits={`userSpaceOnUse`}
        >
          <stop stopColor={`#60D673`} />
          <stop offset={`0.17`} stopColor={`#42C868`} />
          <stop offset={`0.39`} stopColor={`#0EBC5F`} />
          <stop offset={`0.62`} stopColor={`#00A9BB`} />
          <stop offset={`0.86`} stopColor={`#3C90FF`} />
          <stop offset={`1`} stopColor={`#3186FF`} />
        </linearGradient>
        <linearGradient
          id={`${e}-1`}
          x1={`6.04194e-05`}
          y1={`6.45153`}
          x2={`56.4107`}
          y2={`6.45153`}
          gradientUnits={`userSpaceOnUse`}
        >
          <stop offset={`0.08`} stopColor={`#FF63A0`} />
          <stop offset={`0.3`} stopColor={`#FC413D`} />
          <stop offset={`0.5`} stopColor={`#FC413D`} />
          <stop offset={`0.65`} stopColor={`#FC413D`} />
          <stop offset={`0.72`} stopColor={`#FC5C30`} />
          <stop offset={`0.86`} stopColor={`#FEB10C`} />
          <stop offset={`0.91`} stopColor={`#FEC700`} />
          <stop offset={`0.96`} stopColor={`#FFDB0F`} />
        </linearGradient>
      </defs>
    </svg>
  );
};
var ValueValue16 = () => (
  <svg viewBox={`0 0 49.883 49.877`} fill={`none`} aria-hidden={`true`}>
    <g transform={`translate(0 0)`}>
      <path
        d={`M18.3549 10.4784C15.4713 10.4784 13.1157 8.12279 13.1157 5.2392C13.1157 2.35561 15.4713 0 18.3549 0C21.2385 0 23.5941 2.35561 23.5941 5.2392V10.4784H18.3549Z`}
        fill={`#36C5F0`}
      />
      <path
        d={`M18.3575 13.12C21.2411 13.12 23.5967 15.4756 23.5967 18.3592C23.5967 21.2428 21.2411 23.5984 18.3575 23.5984H5.2392C2.35561 23.5984 0 21.2428 0 18.3592C0 15.4756 2.35561 13.12 5.2392 13.12H18.3575Z`}
        fill={`#36C5F0`}
      />
    </g>
    <g transform={`translate(26.28 0)`}>
      <path
        d={`M13.1244 18.3592C13.1244 15.4756 15.48 13.12 18.3636 13.12C21.2472 13.12 23.6028 15.4756 23.6028 18.3592C23.6028 21.2428 21.2472 23.5984 18.3636 23.5984H13.1244V18.3592Z`}
        fill={`#2EB67D`}
      />
      <path
        d={`M10.4785 18.3575C10.4785 21.2411 8.12286 23.5967 5.23927 23.5967C2.35568 23.5967 7.4362e-05 21.2411 7.4362e-05 18.3575V5.2392C7.4362e-05 2.35561 2.35568 0 5.23927 0C8.12286 0 10.4785 2.35561 10.4785 5.2392V18.3575Z`}
        fill={`#2EB67D`}
      />
    </g>
    <g transform={`translate(0 26.28)`}>
      <path
        d={`M10.4784 5.2392C10.4784 8.12279 8.12279 10.4784 5.2392 10.4784C2.35561 10.4784 0 8.12279 0 5.2392C0 2.35561 2.35561 0 5.2392 0H10.4784V5.2392Z`}
        fill={`#E01E5A`}
      />
      <path
        d={`M13.1157 5.2392C13.1157 2.35561 15.4713 0 18.3549 0C21.2385 0 23.5941 2.35561 23.5941 5.2392V18.3575C23.5941 21.2411 21.2385 23.5967 18.3549 23.5967C15.4713 23.5967 13.1157 21.2411 13.1157 18.3575V5.2392Z`}
        fill={`#E01E5A`}
      />
    </g>
    <g transform={`translate(26.28 26.28)`}>
      <path
        d={`M5.23927 13.1157C8.12286 13.1157 10.4785 15.4713 10.4785 18.3549C10.4785 21.2385 8.12286 23.5941 5.23927 23.5941C2.35568 23.5941 7.4362e-05 21.2385 7.4362e-05 18.3549V13.1157H5.23927Z`}
        fill={`#ECB22E`}
      />
      <path
        d={`M5.23927 10.4784C2.35568 10.4784 7.4362e-05 8.12279 7.4362e-05 5.2392C7.4362e-05 2.35561 2.35568 0 5.23927 0H18.3576C21.2412 0 23.5968 2.35561 23.5968 5.2392C23.5968 8.12279 21.2412 10.4784 18.3576 10.4784H5.23927Z`}
        fill={`#ECB22E`}
      />
    </g>
  </svg>
);
var ValueValue17 = () => {
  let e = ValueValue14();
  return (
    <svg viewBox={`0 0 49.7096 59.6884`} fill={`none`} aria-hidden={`true`}>
      <path
        fillRule={`evenodd`}
        clipRule={`evenodd`}
        d={`M0 45.9002L9.1618 38.8247C14.0602 45.1745 19.2307 48.1679 24.9455 48.1679C30.6603 48.1679 35.7401 45.2652 40.3663 38.9154L49.7096 45.8094C42.997 54.8805 34.6516 59.6882 24.9455 59.6882C15.3301 59.6882 6.89403 54.8805 0 45.9002Z`}
        fill={`url(#${e}-0)`}
      />
      <path
        fillRule={`evenodd`}
        clipRule={`evenodd`}
        d={`M24.9535 15.3301L8.62558 29.3903L1.09657 20.5914L25.0442 0L48.8105 20.5914L41.1908 29.2996L24.9535 15.3301Z`}
        fill={`url(#${e}-1)`}
      />
      <defs>
        <linearGradient
          id={`${e}-0`}
          x1={`0`}
          y1={`49.2666`}
          x2={`49.75`}
          y2={`49.2666`}
          gradientUnits={`userSpaceOnUse`}
        >
          <stop stopColor={`#8930FD`} />
          <stop offset={`1`} stopColor={`#49CCF9`} />
        </linearGradient>
        <linearGradient
          id={`${e}-1`}
          x1={`1.09231`}
          y1={`14.6901`}
          x2={`48.7603`}
          y2={`14.6901`}
          gradientUnits={`userSpaceOnUse`}
        >
          <stop stopColor={`#FF02F0`} />
          <stop offset={`1`} stopColor={`#FFC800`} />
        </linearGradient>
      </defs>
    </svg>
  );
};
var ValueValue18 = `
/* Assistant start screen – layout taken 1 : 1 from the reference, styled with Plico UI tokens */

.ui-as-invite {
  position: absolute;
  top: 8px;
  right: 8px;
  display: flex;
  align-items: center;
  gap: 6px;
  height: 28px;
  padding: 0 8px;
  border-radius: 8px;
  font-size: 12.5px;
  color: var(--text);
}
.ui-as-invite svg { color: var(--muted); }
.ui-as-invite:hover { background: var(--hover); color: var(--ink); }

.ui-as-start {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: min(672px, calc(100% - 48px));
  /* Fills the main area, so heading, composer and suggestions sit in its exact vertical middle */
  min-height: 100%;
  margin: 0 auto;
  padding: 64px 0;
}

.ui-as-start__title {
  margin: 0;
  font-size: 28px;
  line-height: 34px;
  font-weight: 500;
  letter-spacing: -0.025em;
  color: var(--ink);
  text-align: center;
  text-wrap: balance;
}

.ui-as-start__composer { width: 100%; margin-top: 30px; }
.ui-as-start__title, .ui-as-chips { transition: opacity 180ms ease, transform 180ms ease; }
.ui-as-start[data-phase="leaving"] .ui-as-start__title { opacity: 0; transform: translateY(-8px); }
.ui-as-start[data-phase="leaving"] .ui-as-chips { opacity: 0; transform: translateY(8px); }

/* Chat: the thread fills the area and scrolls, the composer waits at the bottom */
.ui-as-start[data-phase="chat"] { width: 100%; height: 100%; min-height: 0; padding: 0; justify-content: flex-end; }
.ui-as-start__thread { flex: 1; width: 100%; min-height: 0; overflow-y: auto; padding: 64px 32px 24px; }
.ui-as-start__column { display: flex; flex-direction: column; gap: 22px; max-width: 672px; margin: 0 auto; }
.ui-as-start[data-phase="chat"] .ui-as-start__composer { flex: none; width: min(672px, calc(100% - 64px)); margin: 0 0 24px; }

/* Suggestions */
.ui-as-chips { display: grid; gap: 7px; margin-top: 18px; }
.ui-as-chips__row { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px; }
.ui-as-chip {
  display: flex;
  align-items: center;
  gap: 7px;
  height: 32px;
  padding: 0 12px 0 11px;
  border-radius: 16px;
  background: var(--chip);
  font-size: 12px;
  color: var(--text);
  transition: background-color 140ms ease, color 140ms ease;
}
.ui-as-chip svg { color: var(--text); }
.ui-as-chip:hover { background: var(--chip-hover); color: var(--ink); }

/* Narrow: a little less room around the column; on a phone the composer runs almost edge to edge */
@container ui-as (max-width: 600px) {
  .ui-as-start { width: calc(100% - 24px); padding: 56px 0 40px; }
  .ui-as-start__title { font-size: 23px; line-height: 29px; }
  .ui-as-start__composer { margin-top: 22px; }
  .ui-as-chips { margin-top: 14px; }
  .ui-as-chips__row { gap: 6px; }
  .ui-as-start__thread { padding: 56px 16px 16px; }
  .ui-as-start[data-phase="chat"] .ui-as-start__composer { width: calc(100% - 16px); margin-bottom: 8px; }
}
`;
var ValueValue19 = `
/* Composer: white card in the gray tray, folder and apps in the tray below */
.ui-as-composer {
  width: 100%;
  padding: 4px;
  border-radius: 18px;
  background: var(--tray);
}
.ui-as-composer__card {
  padding: 14px 10px 8px 14px;
  border-radius: 14px;
  background: var(--card);
  box-shadow: 0 0 0 1px var(--line), var(--shadow);
}
.ui-as-composer__field {
  display: block;
  width: 100%;
  min-height: 20px;
  margin: 0;
  padding: 0;
  border: 0;
  resize: none;
  background: transparent;
  font: inherit;
  font-size: 14px;
  line-height: 20px;
  color: var(--ink);
}
.ui-as-composer__field::placeholder { color: var(--placeholder); }
.ui-as-composer__bar {
  display: flex;
  align-items: center;
  gap: 2px;
  margin: 19px 0 0 -6px;
}
.ui-as-composer__end { display: flex; align-items: center; gap: 4px; margin-left: auto; }
.ui-as-ghost[data-active] { color: var(--ink); }
.ui-as-ghost[data-active] svg { color: var(--accent); }
.ui-as-ghost--model > svg:last-child { margin-left: -2px; color: var(--faint); }
.ui-as-composer .ui-as-menu { min-width: 248px; }
.ui-as-composer__tray .ui-as-anchor { display: flex; }
/* Dictation: the mic turns red and pulses while it listens */
.ui-as-mic[aria-pressed="true"] { background: rgba(220, 38, 38, 0.1); color: #dc2626; animation: ui-as-listen 1s ease-in-out infinite; }
@keyframes ui-as-listen { 50% { box-shadow: 0 0 0 4px rgba(220, 38, 38, 0.12); } }
.ui-as-attachments { display: flex; flex-wrap: wrap; gap: 6px; margin: -4px 0 10px; }
.ui-as-attachment {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 28px;
  padding: 0 4px 0 9px;
  border-radius: 8px;
  background: var(--chip);
  font-size: 12.5px;
  color: var(--ink);
  animation: ui-as-pop 240ms var(--ease);
}
.ui-as-attachment > svg { color: var(--muted); }
.ui-as-attachment button { display: grid; place-items: center; width: 20px; height: 20px; border-radius: 6px; color: var(--muted); }
.ui-as-attachment button:hover { background: var(--hover); color: var(--ink); }
.ui-as-ghost {
  display: flex;
  align-items: center;
  gap: 6px;
  height: 28px;
  padding: 0 8px;
  border-radius: 8px;
  font-size: 12.5px;
  color: var(--text);
  transition: background-color 140ms ease;
}
.ui-as-ghost svg { color: var(--muted); }
.ui-as-ghost:hover { background: var(--hover); }
.ui-as-ghost--model { font-weight: 500; color: var(--ink); }
.ui-as-send {
  display: grid;
  place-items: center;
  width: 30px;
  height: 30px;
  margin-left: 2px;
  border-radius: 50%;
  background: var(--ink);
  color: var(--on-ink);
  transition: background-color 160ms ease, transform 160ms var(--ease);
}
.ui-as-send:disabled { background: var(--disabled); cursor: default; }
.ui-as-send:not(:disabled):active { transform: scale(0.94); }

.ui-as-composer__tray {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 37px;
  padding: 0 8px 0 6px;
}
.ui-as-tray-link {
  display: flex;
  align-items: center;
  gap: 7px;
  height: 26px;
  padding: 0 6px;
  border-radius: 8px;
  font-size: 11.5px;
  color: var(--text);
}
.ui-as-tray-link:hover { background: var(--hover); }
/* Glass Folder from the library at icon size; hovering the link opens it like hovering the folder itself */
.ui-as-tray-link__folder { position: relative; flex: none; width: 16px; height: 14px; }
.ui-as-tray-link__folder .ui-fd { position: absolute; top: 50%; left: 50%; width: 40px; translate: -50% -50%; }
.ui-as-tray-link:hover .ui-fd-icon { transform: translate(-50%, -48%) scale(1.03); }
.ui-as-tray-link:hover .ui-fd-doc--left { transform: translate(32px, 70px) rotate(9deg); }
.ui-as-tray-link:hover .ui-fd-doc--right { transform: translate(286px, 76px) rotate(5deg); }
.ui-as-tray-link:hover .ui-fd-doc--middle { transform: translate(166px, 52px) rotate(-7deg); }
.ui-as-tray-link:hover .ui-fd-front {
  top: 24.8%;
  border-radius: 3cqw 3cqw 6.333cqw 6.333cqw;
  transform: translateZ(2.33cqw) rotateX(-9deg);
}
.ui-as-tray-link--apps { gap: 10px; color: var(--muted); }
.ui-as-apps { display: flex; align-items: center; gap: 6px; }
.ui-as-apps svg { width: 13px; height: 13px; }
`;
function AssistantHomeDemo2() {
  return (
    <PreviewFrame>
      <AssistantHome onNavigate={navigateScreen} />
    </PreviewFrame>
  );
}
function FullScreen(props: {}) {
  return (
    <ScreenFrameModeContext.Provider value={true}>
      <AssistantHomeDemo2 {...props} />
    </ScreenFrameModeContext.Provider>
  );
}
const demoStyles = "";
function AssistantHomeDemo(props: {}) {
  return (
    <>
      <style href="plico-demo-assistant-home" precedence="default">
        {demoStyles}
      </style>
      <AssistantHomeDemo2 {...props} />
    </>
  );
}
export { AssistantHome };
export { AssistantHomeDemo };
export { AssistantHome as Component };
export { AssistantHomeDemo as Demo };
export { FullScreen };
export default AssistantHome;

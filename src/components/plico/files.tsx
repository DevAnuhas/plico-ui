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
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {variant?: string; size?: string; loading?: boolean; icon?: React.ReactNode; iconRight?: React.ReactNode; ref?: React.Ref<HTMLButtonElement>;}
type FilterValue = Record<string, string[]>;
interface FilterOption {id: string; label: string}
interface FilterGroup {id: string; label: string; chipPrefix?: string; options: FilterOption[]}
type FilterEntry = {kind: "group"; group: FilterGroup} | {kind: "option"; group: FilterGroup; option: FilterOption};
interface FilterMenuProps {groups: FilterGroup[]; value?: FilterValue; defaultValue?: FilterValue; onChange?: (value: FilterValue) => void; defaultOpen?: string[]; title?: string; hints?: boolean; className?: string}
interface FileRecord {name: string; type: "DOC" | "PDF" | "XLS"; edited?: string; owner?: string; shared?: boolean}
interface FileFolder {name: string; access: string; files: FileRecord[]}
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
var ValueValue23 = `M38 0H176Q196 0 204 14L218 30Q224 38 246 38H562Q600 38 600 76V462Q600 500 562 500H38Q0 500 0 462V38Q0 0 38 0Z`;
var ValueValue24 = [78, 180, 140, 175, 126, 168, 110];
function GlassFolderComponent({
  className: className,
  label = `Blue folder holding three documents behind a frosted front pocket`,
}: {className?: string; label?: string}) {
  let n = `ui-fd` + React.useId().replace(/[^a-zA-Z0-9_-]/g, ``);
  return (
    <div className={[`ui-fd`, className].filter(Boolean).join(` `)} role={`img`} aria-label={label}>
      <style href={`ui-glass-folder`} precedence={`default`}>
        {ValueValue25}
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
          <path className={`ui-fd-back-fill`} d={ValueValue23} fill={`#5bb7ea`} />
          <path d={ValueValue23} fill={`#000`} filter={`url(#${n}-hl)`} />
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
              {ValueValue24.map((e, t) => (
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
var ValueValue25 = `
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
function Button({
  variant = `primary`,
  size = `md`,
  loading = false,
  icon: icon,
  iconRight: iconRight,
  children: children,
  className: className,
  disabled: disabled,
  onClick: onClick,
  type = `button`,
  ref: ref,
  ...g
}: ButtonProps) {
  let _ = typeof children == `string` ? children : void 0,
    v = !children && !!(icon || iconRight),
    y = React.useRef<HTMLButtonElement | null>(null),
    b = React.useRef(0),
    [x, S] = React.useState(false);
  React.useEffect(() => S(true), []);
  let C = _ ?? `label`,
    w = loading && icon ? `spinner` : getIconKey(icon),
    T = getIconKey(iconRight),
    E = `${C}|${w}|${T}`,
    D = React.useRef(E);
  return (
    React.useLayoutEffect(() => {
      let e = y.current;
      if (!e) return;
      let t = e.getBoundingClientRect().width,
        n = b.current,
        r = D.current !== E;
      ((b.current = t),
        (D.current = E),
        !(!r || !n || Math.abs(n - t) < 0.5) &&
          (window.matchMedia(`(prefers-reduced-motion: reduce)`).matches ||
            e.animate(
              [
                {
                  width: `${n}px`,
                },
                {
                  width: `${t}px`,
                },
              ],
              {
                duration: 480,
                easing: `cubic-bezier(0.25, 1, 0.5, 1)`,
              },
            )));
    }),
    (
      <>
        <style href={`ui-button`} precedence={`default`}>
          {buttonStyles}
        </style>
        <button
          type={type}
          className={[`ui-button`, className].filter(Boolean).join(` `)}
          data-variant={variant}
          data-size={size}
          data-loading={loading || void 0}
          data-icon-only={v || void 0}
          data-ready={x || void 0}
          ref={(e) => {
            ((y.current = e), typeof ref == `function` ? ref(e) : ref && (ref.current = e));
          }}
          disabled={disabled}
          aria-busy={loading || void 0}
          aria-disabled={loading || void 0}
          onClick={(e) => {
            if (loading) {
              e.preventDefault();
              return;
            }
            onClick?.(e);
          }}
          {...g}
        >
          {icon && (
            <span className={`ui-button__icon`} aria-hidden={`true`} key={`icon-${w}`}>
              {loading ? <ButtonSpinner /> : icon}
            </span>
          )}
          {children != null && (
            <span className={`ui-button__label`} data-text={_} key={`label-${C}`}>
              {children}
            </span>
          )}
          {iconRight && (
            <span className={`ui-button__icon`} aria-hidden={`true`} key={`icon-right-${T}`}>
              {iconRight}
            </span>
          )}
        </button>
      </>
    )
  );
}
var ButtonSpinner = () => (
  <svg
    className={`ui-button__spinner`}
    viewBox={`0 0 24 24`}
    fill={`none`}
    stroke={`currentColor`}
    strokeWidth={2}
    strokeLinecap={`round`}
  >
    <circle cx={`12`} cy={`12`} r={`8.5`} opacity={0.2} />
    <path d={`M12 3.5a8.5 8.5 0 0 1 8.5 8.5`} />
  </svg>
);
var iconIdentity = new WeakMap();
var buttonSpinnerStyles = 1;
function getIconKey(e: {} | null | undefined) {
  if (!React.isValidElement(e) || typeof e.type == `string`) return 0;
  let t = e.type;
  return (iconIdentity.has(t) || iconIdentity.set(t, buttonSpinnerStyles++), iconIdentity.get(t));
}
var buttonStyles = `
/* Colors and motion as variables – override them on .ui-button (see Theming in the docs) */
.ui-button {
  --ui-btn-ink: #171717;
  --ui-btn-on-ink: #fafafa;
  --ui-btn-dark-top: #323137;
  --ui-btn-dark-bottom: #201e25;
  --ui-btn-dark-hover-top: #3c3b42;
  --ui-btn-dark-hover-bottom: #29272f;
  --ui-btn-edge-top: #4b4951;
  --ui-btn-edge-mid: #31303a;
  --ui-btn-edge-bottom: #18171b;
  --ui-btn-ring: #0d0d0d;
  --ui-btn-dark-shadow: rgba(0, 0, 0, 0.1);
  --ui-btn-surface: #ffffff;
  --ui-btn-surface-hover: #fafafa;
  --ui-btn-surface-shadow: rgba(0, 0, 0, 0.06);
  --ui-btn-line: #e5e5e5;
  --ui-btn-muted: #737373;
  --ui-btn-hover: #404040;
  --ui-btn-fill: #f0f0f0;
  --ui-btn-shine: rgba(255, 255, 255, 0.82);
  --ui-btn-shine-on-ink: rgba(255, 255, 255, 0.95);
  --ui-btn-danger: #ff0000;
  --ui-btn-danger-bg: #ffe6e9;
  --ui-btn-focus: rgba(23, 23, 23, 0.22);
  --ui-btn-ease: cubic-bezier(0.22, 1, 0.36, 1);
  --ui-btn-load: 650ms;

  --h: 40px;
  --px: 16px;
  --gap: 8px;
  --fs: 14px;
  --icon: 18px;
  --radius: 12px;

  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--gap);
  height: var(--h);
  padding: 0 var(--px);
  margin: 0;
  border: 1px solid transparent;
  border-radius: var(--radius);
  font-family: "Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  font-size: var(--fs);
  font-weight: 500;
  line-height: 1;
  letter-spacing: -0.01em;
  white-space: nowrap;
  text-decoration: none;
  cursor: pointer;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  -webkit-font-smoothing: antialiased;
  transition:
    background-color 160ms ease,
    border-color 160ms ease,
    color 160ms ease,
    box-shadow 160ms ease,
    transform 160ms var(--ui-btn-ease),
    opacity 160ms ease;
}

.ui-button[data-size="sm"] {
  --h: 32px;
  --px: 12px;
  --gap: 6px;
  --fs: 13px;
  --icon: 16px;
  --radius: 10px;
}
.ui-button[data-size="lg"] {
  --h: 48px;
  --px: 20px;
  --gap: 10px;
  --fs: 15px;
  --icon: 20px;
  --radius: 14px;
}
.ui-button[data-icon-only] {
  width: var(--h);
  padding: 0;
}

/* primary: like the send button */
/* primary: a dark gradient with a light edge running down the border and a 1px ring */
.ui-button[data-variant="primary"] {
  background:
    linear-gradient(var(--ui-btn-dark-top), var(--ui-btn-dark-bottom)) padding-box,
    linear-gradient(var(--ui-btn-edge-top), var(--ui-btn-edge-mid), var(--ui-btn-edge-bottom)) border-box;
  color: var(--ui-btn-on-ink);
  box-shadow:
    0 0 0 1px var(--ui-btn-ring),
    0 2px 4px var(--ui-btn-dark-shadow);
}
.ui-button[data-variant="primary"]:hover:not(:disabled) {
  background:
    linear-gradient(var(--ui-btn-dark-hover-top), var(--ui-btn-dark-hover-bottom)) padding-box,
    linear-gradient(var(--ui-btn-edge-top), var(--ui-btn-edge-mid), var(--ui-btn-edge-bottom)) border-box;
}

/* secondary: white with the card outline */
.ui-button[data-variant="secondary"] {
  background: var(--ui-btn-surface);
  border-color: var(--ui-btn-line);
  color: var(--ui-btn-ink);
  box-shadow: 0 1px 2px var(--ui-btn-surface-shadow);
}
.ui-button[data-variant="secondary"]:hover:not(:disabled) {
  background: var(--ui-btn-surface-hover);
}

/* ghost: a muted label, the gray layer appears on hover */
.ui-button[data-variant="ghost"] {
  background: transparent;
  color: var(--ui-btn-muted);
}
.ui-button[data-variant="ghost"]:hover:not(:disabled) {
  background: var(--ui-btn-fill);
  color: var(--ui-btn-hover);
}

/* destructive: red label on a light red fill */
.ui-button[data-variant="destructive"] {
  background: var(--ui-btn-danger-bg);
  color: var(--ui-btn-danger);
}
.ui-button[data-variant="destructive"]:hover:not(:disabled) {
  background: color-mix(in srgb, var(--ui-btn-danger-bg) 88%, var(--ui-btn-danger));
}
.ui-button[data-variant="destructive"] .ui-button__label::after {
  --ui-btn-shine: rgba(255, 255, 255, 0.82);
}

.ui-button:active:not(:disabled):not([data-loading]) {
  transform: scale(0.97);
}
.ui-button:focus-visible {
  outline: 2px solid var(--ui-btn-focus);
  outline-offset: 2px;
}
.ui-button:disabled {
  opacity: 0.4;
  cursor: default;
}
.ui-button[data-loading] {
  cursor: default;
}

.ui-button__icon {
  display: grid;
  place-items: center;
  flex: none;
  width: var(--icon);
  height: var(--icon);
}
.ui-button__icon > svg {
  width: 100%;
  height: 100%;
}

/* Morph: the button clips while its width glides; changed parts blur in */
.ui-button {
  overflow: clip;
}
.ui-button[data-ready] .ui-button__label {
  animation: ui-button-label-in 480ms cubic-bezier(0.25, 1, 0.5, 1) both;
}
.ui-button[data-ready] .ui-button__icon {
  animation: ui-button-icon-in 520ms cubic-bezier(0.25, 1, 0.5, 1) both;
}

/* Loading: a band sweeps across a copy of the label, like "Request approval" in the Chat Composer */
.ui-button__label {
  position: relative;
}
.ui-button__label::after {
  content: attr(data-text);
  content: attr(data-text) / "";
  position: absolute;
  inset: 0;
  white-space: nowrap;
  color: transparent;
  background: linear-gradient(90deg, transparent 38%, var(--ui-btn-shine) 50%, transparent 62%) 100% 0 / 300% 100%
    no-repeat;
  -webkit-background-clip: text;
  background-clip: text;
  opacity: 0;
  pointer-events: none;
}
.ui-button[data-variant="primary"] .ui-button__label::after {
  --ui-btn-shine: var(--ui-btn-shine-on-ink);
}
.ui-button[data-loading] .ui-button__label {
  color: color-mix(in srgb, currentColor 55%, transparent);
}
.ui-button[data-loading] .ui-button__label::after {
  opacity: 1;
  animation: ui-button-sweep calc(var(--ui-btn-load) * 1.6) linear infinite;
}
.ui-button__spinner {
  animation: ui-button-spin 900ms linear infinite;
}

@keyframes ui-button-label-in {
  from {
    opacity: 0;
    filter: blur(3px);
    transform: translateY(25%);
  }
}
@keyframes ui-button-icon-in {
  from {
    opacity: 0;
    filter: blur(2px);
    transform: scale(0.7);
  }
}

@keyframes ui-button-spin {
  to {
    transform: rotate(1turn);
  }
}

@keyframes ui-button-sweep {
  from {
    background-position: 100% 0;
  }
  to {
    background-position: 0% 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .ui-button[data-ready] .ui-button__label,
  .ui-button[data-ready] .ui-button__icon {
    animation: none;
  }
  .ui-button {
    transition-duration: 1ms;
  }
  .ui-button[data-loading] .ui-button__label::after {
    animation: none;
    opacity: 0;
  }
}

/* Dark mode: follows a .dark class or data-theme="dark" on any ancestor, e.g. <html> */
:where(.dark, [data-theme="dark"]) .ui-button {
  /* primary inverts: a light gradient with dark text */
  --ui-btn-on-ink: #121213;
  --ui-btn-dark-top: #f4f4f5;
  --ui-btn-dark-bottom: #e4e4e7;
  --ui-btn-dark-hover-top: #ffffff;
  --ui-btn-dark-hover-bottom: #ececef;
  --ui-btn-edge-top: #ffffff;
  --ui-btn-edge-mid: #ececef;
  --ui-btn-edge-bottom: #d4d4d8;
  --ui-btn-ring: rgba(0, 0, 0, 0.6);
  --ui-btn-dark-shadow: rgba(0, 0, 0, 0.4);
  --ui-btn-shine-on-ink: rgba(255, 255, 255, 0.9);

  --ui-btn-ink: #ededed;
  --ui-btn-surface: #232326;
  --ui-btn-surface-hover: #2a2a2d;
  --ui-btn-surface-shadow: rgba(0, 0, 0, 0.4);
  --ui-btn-line: rgba(255, 255, 255, 0.1);
  --ui-btn-muted: #8f8f8f;
  --ui-btn-hover: #ededed;
  --ui-btn-fill: rgba(255, 255, 255, 0.06);
  --ui-btn-shine: rgba(237, 237, 237, 0.95);
  --ui-btn-danger: #ff6b6b;
  --ui-btn-danger-bg: rgba(255, 64, 64, 0.16);
  --ui-btn-focus: rgba(237, 237, 237, 0.3);
}
`;
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
function FilterMenu({
  groups: groups,
  value: value,
  defaultValue = {},
  onChange: onChange,
  defaultOpen: defaultOpen,
  title = `Filters`,
  hints = true,
  className: className,
}: FilterMenuProps) {
  let [f, p] = React.useState(defaultValue),
    m = value ?? f,
    [h, g] = React.useState(() => new Set(defaultOpen ?? groups.slice(0, 1).map((e) => e.id))),
    [_, v] = React.useState<string|null>(null),
    y = React.useRef<HTMLDivElement | null>(null),
    b = React.useRef<HTMLDivElement | null>(null),
    x = useAnimatedHeight(b),
    S = (e: FilterValue) => {
      (value === void 0 && p(e), onChange?.(e));
    },
    C = (e: string, t: string) => m[e]?.includes(t) ?? false,
    w = (e: string, t: string) => {
      let n = m[e] ?? [];
      S({
        ...m,
        [e]: n.includes(t) ? n.filter((e) => e !== t) : [...n, t],
      });
    },
    T = (e: string) =>
      g((t) => {
        let n = new Set(t);
        return (n.has(e) ? n.delete(e) : n.add(e), n);
      }),
    E = groups.flatMap((e) =>
      e.options
        .filter((t) => C(e.id, t.id))
        .map((t) => ({
          group: e,
          option: t,
          label: `${e.chipPrefix ?? ``}${t.label}`,
        })),
    ),
    D = groups.flatMap<FilterEntry>((e) => [
      {
        kind: `group`,
        group: e,
      },
      ...(h.has(e.id)
        ? e.options.map((t) => ({
            kind: `option` as const,
            group: e,
            option: t,
          }))
        : []),
    ]),
    O = (e: FilterEntry) => (e.kind === `group` ? `g:${e.group.id}` : `o:${e.group.id}:${e.option.id}`),
    k = (e: string) => {
      (v(e), y.current?.querySelector<HTMLElement>(`[data-key="${CSS.escape(e)}"]`)?.focus());
    };
  return (
    <div className={[`ui-fm`, className].filter(Boolean).join(` `)}>
      <style href={`ui-filter-menu`} precedence={`default`}>
        {filterMenuStyles}
      </style>
      <div className={`ui-fm__card`}>
        <div className={`ui-fm__head`}>
          <span className={`ui-fm__title`}>{title}</span>
          <button
            type={`button`}
            className={`ui-fm__clear`}
            disabled={E.length === 0}
            onClick={() => S({})}
          >{`Clear all`}</button>
        </div>
        <div className={`ui-fm__chips-outer`} ref={x}>
          <div className={`ui-fm__chips`} ref={b} aria-live={`polite`}>
            {E.map((e) => (
              <span className={`ui-fm__chip`} key={`${e.group.id}:${e.option.id}`}>
                {e.label}
                <button
                  type={`button`}
                  aria-label={`Remove ${e.label}`}
                  onClick={() => w(e.group.id, e.option.id)}
                >
                  <svg viewBox={`0 0 24 24`} aria-hidden={`true`}>
                    <path d={`M6.5 6.5l11 11M17.5 6.5l-11 11`} />
                  </svg>
                </button>
              </span>
            ))}
          </div>
        </div>
        <div
          className={`ui-fm__groups`}
          ref={y}
          onKeyDown={(e) => {
            let t = D.findIndex((e) => O(e) === _),
              n = D[t];
            if (e.key === `ArrowDown` || e.key === `ArrowUp`) {
              e.preventDefault();
              let n =
                D[Math.max(0, Math.min(D.length - 1, t + (e.key === `ArrowDown` ? 1 : -1)))] ??
                D[0];
              k(O(n));
            } else if (e.key === `Home` || e.key === `End`)
              (e.preventDefault(), k(O(D[e.key === `Home` ? 0 : D.length - 1])));
            else if (n && (e.key === `ArrowRight` || e.key === `ArrowLeft`)) {
              e.preventDefault();
              let t = n.group.id;
              (e.key === `ArrowRight` && !h.has(t) && T(t),
                e.key === `ArrowLeft` && (h.has(t) && T(t), k(`g:${t}`)));
            } else
              n &&
                (e.key === `Enter` || e.key === ` `) &&
                (e.preventDefault(),
                n.kind === `group` ? T(n.group.id) : w(n.group.id, n.option.id));
          }}
        >
          {groups.map((t) => {
            let n = h.has(t.id),
              i = m[t.id]?.length ?? 0,
              a = `g:${t.id}`;
            return (
              <section className={`ui-fm__group`} data-open={n ? `` : void 0} key={t.id}>
                <button
                  type={`button`}
                  className={`ui-fm__group-head`}
                  data-key={a}
                  tabIndex={_ === a || (_ === null && t === groups[0]) ? 0 : -1}
                  aria-expanded={n}
                  aria-controls={`${t.id}-options`}
                  onFocus={() => v(a)}
                  onClick={() => T(t.id)}
                >
                  <svg className={`ui-fm__chevron`} viewBox={`0 0 24 24`} aria-hidden={`true`}>
                    <path d={`M6.5 9.5 12 15l5.5-5.5`} />
                  </svg>
                  <span className={`ui-fm__group-label`}>{t.label}</span>
                  <span className={`ui-fm__group-count`}>{t.options.length}</span>
                  <span className={`ui-fm__group-picked`} aria-live={`polite`}>
                    {i > 0 ? `${i} filter${i === 1 ? `` : `s`}` : ``}
                  </span>
                </button>
                <div
                  className={`ui-fm__panel`}
                  id={`${t.id}-options`}
                  role={`group`}
                  aria-label={t.label}
                >
                  <div className={`ui-fm__panel-inner`}>
                    {t.options.map((e) => {
                      let i = `o:${t.id}:${e.id}`,
                        a = C(t.id, e.id);
                      return (
                        <button
                          type={`button`}
                          role={`checkbox`}
                          aria-checked={a}
                          className={`ui-fm__option`}
                          data-key={i}
                          tabIndex={n && _ === i ? 0 : -1}
                          onFocus={() => v(i)}
                          onClick={() => w(t.id, e.id)}
                          key={e.id}
                        >
                          <span className={`ui-fm__box`} aria-hidden={`true`}>
                            <svg viewBox={`0 0 24 24`}>
                              <path d={`m6 12.5 4 4 8-9`} />
                            </svg>
                          </span>
                          {e.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      </div>
      {hints && (
        <div className={`ui-fm__hints`} aria-hidden={`true`}>
          <span className={`ui-fm__hint`}>
            <kbd>
              <svg viewBox={`0 0 24 24`}>
                <path d={`M12 5v14m0 0-5-5m5 5 5-5`} />
              </svg>
            </kbd>
            <kbd>
              <svg viewBox={`0 0 24 24`}>
                <path d={`M12 19V5m0 0-5 5m5-5 5 5`} />
              </svg>
            </kbd>
            {`To navigate`}
          </span>
          <span className={`ui-fm__hint`}>
            <kbd>
              <svg viewBox={`0 0 24 24`}>
                <path d={`M18 6v6.5a2 2 0 0 1-2 2H7m0 0 3.5-3.5M7 14.5 10.5 18`} />
              </svg>
            </kbd>
            {`To select`}
          </span>
        </div>
      )}
    </div>
  );
}
function useAnimatedHeight(e: React.RefObject<HTMLElement | null>) {
  let t = React.useRef<HTMLDivElement | null>(null);
  return (
    React.useLayoutEffect(() => {
      let n = t.current,
        r = e.current;
      if (!n || !r) return;
      let i = () => {
        n.style.height = `${r.offsetHeight}px`;
      };
      i();
      let a = new ResizeObserver(i);
      a.observe(r);
      let o = requestAnimationFrame(() => n.setAttribute(`data-smooth`, ``));
      return () => {
        (a.disconnect(), cancelAnimationFrame(o));
      };
    }, [e]),
    t
  );
}
var filterMenuStyles = `
.ui-fm {
  --ui-fm-tray: #f0f0f0;
  --ui-fm-card: #ffffff;
  --ui-fm-card-line: #e5e5e5;
  --ui-fm-ink: #171717;
  --ui-fm-text: #404040;
  --ui-fm-muted: #8f8f8f;
  --ui-fm-chip: #f3f3f3;
  --ui-fm-chip-hover: #ebebeb;
  --ui-fm-box: #f0f0f0;
  --ui-fm-box-line: #e3e3e3;
  --ui-fm-check: #ffffff;
  --ui-fm-row-hover: #f7f7f7;
  --ui-fm-kbd: #ffffff;
  --ui-fm-focus: #2f6bff;
  --ui-fm-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);
  --ui-fm-ease: cubic-bezier(0.22, 1, 0.36, 1);
  width: 100%;
  max-width: 420px;
  padding: 6px;
  border-radius: 24px;
  background: var(--ui-fm-tray);
  font-family: "Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  color: var(--ui-fm-ink);
  -webkit-font-smoothing: antialiased;
}
.ui-fm *, .ui-fm *::before, .ui-fm *::after { box-sizing: border-box; }
.ui-fm button { font: inherit; color: inherit; margin: 0; cursor: pointer; -webkit-tap-highlight-color: transparent; }
.ui-fm button:focus-visible { outline: 2px solid var(--ui-fm-focus); outline-offset: 2px; }

.ui-fm__card {
  padding: 16px 16px 10px;
  border: 1px solid var(--ui-fm-card-line);
  border-radius: 20px;
  background: var(--ui-fm-card);
  box-shadow: var(--ui-fm-shadow);
}

/* ---------- Header ---------- */

.ui-fm__head { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 0 2px; }
.ui-fm__title { font-size: 15px; font-weight: 600; letter-spacing: -0.01em; }
.ui-fm__clear {
  padding: 4px 6px;
  margin-right: -6px !important;
  border: 0;
  border-radius: 8px;
  background: none;
  font-size: 13px;
  color: var(--ui-fm-muted) !important;
  transition: color 160ms ease, background-color 160ms ease, opacity 200ms ease;
}
.ui-fm__clear:hover:not(:disabled) { color: var(--ui-fm-ink) !important; background: var(--ui-fm-row-hover); }
.ui-fm__clear:disabled { opacity: 0.45; cursor: default; }

/* ---------- Chips ---------- */

.ui-fm__chips-outer { overflow: hidden; }
.ui-fm__chips-outer[data-smooth] { transition: height 320ms var(--ui-fm-ease); }
.ui-fm__chips { display: flex; flex-wrap: wrap; gap: 6px; padding-top: 12px; }
.ui-fm__chips:empty { padding-top: 0; }
.ui-fm__chip {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  height: 30px;
  padding: 0 4px 0 11px;
  border-radius: 10px;
  background: var(--ui-fm-chip);
  font-size: 13px;
  color: var(--ui-fm-text);
  white-space: nowrap;
  animation: ui-fm-chip-in 260ms var(--ui-fm-ease) both;
}
.ui-fm__chip button {
  display: grid;
  place-items: center;
  width: 22px;
  height: 22px;
  padding: 0;
  border: 0;
  border-radius: 6px;
  background: none;
  color: var(--ui-fm-muted);
  transition: background-color 160ms ease, color 160ms ease;
}
.ui-fm__chip button:hover { background: var(--ui-fm-chip-hover); color: var(--ui-fm-ink); }
.ui-fm__chip svg { width: 14px; height: 14px; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; }

/* ---------- Groups ---------- */

.ui-fm__groups { display: grid; padding-top: 6px; }
.ui-fm__group-head {
  display: flex;
  align-items: center;
  gap: 7px;
  width: calc(100% + 12px);
  height: 36px;
  margin: 2px -6px 0 !important;
  padding: 0 8px 0 6px;
  border: 0;
  border-radius: 10px;
  background: none;
  text-align: left;
  transition: background-color 160ms ease;
}
.ui-fm__group-head:hover { background: var(--ui-fm-row-hover); }
.ui-fm__chevron {
  width: 16px;
  height: 16px;
  flex: none;
  fill: none;
  stroke: var(--ui-fm-text);
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
  transform: rotate(-90deg);
  transition: transform 260ms var(--ui-fm-ease);
}
.ui-fm__group[data-open] .ui-fm__chevron { transform: none; }
.ui-fm__group-label { font-size: 14px; font-weight: 500; }
.ui-fm__group-count { font-size: 12.5px; color: var(--ui-fm-muted); font-variant-numeric: tabular-nums; }
.ui-fm__group-picked { margin-left: auto; font-size: 12.5px; color: var(--ui-fm-muted); }

.ui-fm__panel {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 320ms var(--ui-fm-ease);
}
.ui-fm__group[data-open] .ui-fm__panel { grid-template-rows: 1fr; }
.ui-fm__panel-inner {
  min-height: 0;
  overflow: hidden;
  display: grid;
  gap: 1px;
  padding: 0 0 0;
  opacity: 0;
  transition: opacity 220ms ease, padding 320ms var(--ui-fm-ease);
}
.ui-fm__group[data-open] .ui-fm__panel-inner { opacity: 1; padding: 2px 0 6px; }

.ui-fm__option {
  display: flex;
  align-items: center;
  gap: 12px;
  width: calc(100% + 12px);
  height: 34px;
  margin: 0 -6px !important;
  padding: 0 6px;
  border: 0;
  border-radius: 10px;
  background: none;
  font-size: 14px;
  color: var(--ui-fm-text) !important;
  text-align: left;
  transition: background-color 160ms ease;
}
.ui-fm__option:hover { background: var(--ui-fm-row-hover); }
.ui-fm__option:focus-visible { outline-offset: -2px; }
.ui-fm__box {
  display: grid;
  place-items: center;
  width: 20px;
  height: 20px;
  flex: none;
  border-radius: 6px;
  background: var(--ui-fm-box);
  box-shadow: inset 0 0 0 1px var(--ui-fm-box-line);
  transition: background-color 180ms ease, box-shadow 180ms ease;
}
.ui-fm__box svg {
  width: 14px;
  height: 14px;
  fill: none;
  stroke: var(--ui-fm-check);
  stroke-width: 2.2;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 20;
  stroke-dashoffset: 20;
  transition: stroke-dashoffset 260ms var(--ui-fm-ease);
}
.ui-fm__option[aria-checked="true"] .ui-fm__box { background: var(--ui-fm-ink); box-shadow: inset 0 0 0 1px var(--ui-fm-ink); }
.ui-fm__option[aria-checked="true"] .ui-fm__box svg { stroke-dashoffset: 0; }

/* ---------- Keyboard hints on the tray ---------- */

.ui-fm__hints { display: flex; justify-content: space-between; gap: 12px; padding: 10px 8px 4px; }
.ui-fm__hint { display: inline-flex; align-items: center; gap: 5px; font-size: 12.5px; color: var(--ui-fm-text); }
.ui-fm__hint kbd {
  display: grid;
  place-items: center;
  width: 22px;
  height: 22px;
  border-radius: 6px;
  background: var(--ui-fm-kbd);
  box-shadow: 0 0 0 1px var(--ui-fm-card-line), 0 1px 1px rgba(0, 0, 0, 0.04);
}
.ui-fm__hint kbd:last-of-type { margin-right: 4px; }
.ui-fm__hint svg { width: 13px; height: 13px; fill: none; stroke: var(--ui-fm-text); stroke-width: 1.9; stroke-linecap: round; stroke-linejoin: round; }

@keyframes ui-fm-chip-in { from { opacity: 0; transform: scale(0.9); } }

@media (prefers-reduced-motion: reduce) {
  .ui-fm__chips-outer[data-smooth], .ui-fm__panel, .ui-fm__panel-inner, .ui-fm__chevron, .ui-fm__box svg { transition: none; }
  .ui-fm__chip { animation: none; }
}

/* Dark mode: follows a .dark class or data-theme="dark" on any ancestor, e.g. <html> */
:where(.dark, [data-theme="dark"]) .ui-fm {
  --ui-fm-tray: #161618;
  --ui-fm-card: #232326;
  --ui-fm-card-line: rgba(255, 255, 255, 0.08);
  --ui-fm-ink: #ededed;
  --ui-fm-text: #c4c4c4;
  --ui-fm-muted: #8f8f8f;
  --ui-fm-chip: #2a2a2d;
  --ui-fm-chip-hover: #313135;
  --ui-fm-box: #2a2a2d;
  --ui-fm-box-line: rgba(255, 255, 255, 0.1);
  --ui-fm-check: #121213;
  --ui-fm-row-hover: rgba(255, 255, 255, 0.05);
  --ui-fm-kbd: #232326;
  --ui-fm-focus: #6b95ff;
  --ui-fm-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
}
`;
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
var SortIcon: IconNode = [
  [
    `path`,
    {
      d: `M7 4V20`,
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
      d: `M17 19L17 4`,
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
      d: `M10 6.99998C10 6.99998 7.79053 4.00001 6.99998 4C6.20942 3.99999 4 7 4 7`,
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
      d: `M20 17C20 17 17.7905 20 17 20C16.2094 20 14 17 14 17`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `3`,
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
var GridViewIcon: IconNode = [
  [
    `path`,
    {
      d: `M8 17H16`,
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
      d: `M8 13H12`,
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
      d: `M13 2.5V3C13 5.82843 13 7.24264 13.8787 8.12132C14.7574 9 16.1716 9 19 9H19.5M20 10.6569V14C20 17.7712 20 19.6569 18.8284 20.8284C17.6569 22 15.7712 22 12 22C8.22876 22 6.34315 22 5.17157 20.8284C4 19.6569 4 17.7712 4 14V9.45584C4 6.21082 4 4.58831 4.88607 3.48933C5.06508 3.26731 5.26731 3.06508 5.48933 2.88607C6.58831 2 8.21082 2 11.4558 2C12.1614 2 12.5141 2 12.8372 2.11401C12.9044 2.13772 12.9702 2.165 13.0345 2.19575C13.3436 2.34355 13.593 2.593 14.0919 3.09188L18.8284 7.82843C19.4065 8.40649 19.6955 8.69552 19.8478 9.06306C20 9.4306 20 9.83935 20 10.6569Z`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `2`,
    },
  ],
];
var ListViewIcon: IconNode = [
  [
    `path`,
    {
      d: `M8.85746 12.5061C6.36901 10.6456 4.59564 8.59915 3.62734 7.44867C3.3276 7.09253 3.22938 6.8319 3.17033 6.3728C2.96811 4.8008 2.86701 4.0148 3.32795 3.5074C3.7889 3 4.60404 3 6.23433 3H17.7657C19.396 3 20.2111 3 20.672 3.5074C21.133 4.0148 21.0319 4.8008 20.8297 6.37281C20.7706 6.83191 20.6724 7.09254 20.3726 7.44867C19.403 8.60062 17.6261 10.6507 15.1326 12.5135C14.907 12.6821 14.7583 12.9567 14.7307 13.2614C14.4837 15.992 14.2559 17.4876 14.1141 18.2442C13.8853 19.4657 12.1532 20.2006 11.226 20.8563C10.6741 21.2466 10.0043 20.782 9.93278 20.1778C9.79643 19.0261 9.53961 16.6864 9.25927 13.2614C9.23409 12.9539 9.08486 12.6761 8.85746 12.5061Z`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `0`,
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
var MoreIcon: IconNode = [
  [
    `path`,
    {
      d: `M3.88884 9.66294C4.39329 10 5.09552 10 6.49998 10C7.90445 10 8.60668 10 9.11113 9.66294C9.32951 9.51702 9.51701 9.32952 9.66292 9.11114C9.99998 8.60669 9.99998 7.90446 9.99998 6.5C9.99998 5.09554 9.99998 4.39331 9.66292 3.88886C9.51701 3.67048 9.32951 3.48298 9.11113 3.33706C8.60668 3 7.90445 3 6.49998 3C5.09552 3 4.39329 3 3.88884 3.33706C3.67046 3.48298 3.48296 3.67048 3.33705 3.88886C2.99998 4.39331 2.99998 5.09554 2.99998 6.5C2.99998 7.90446 2.99998 8.60669 3.33705 9.11114C3.48296 9.32952 3.67046 9.51702 3.88884 9.66294Z`,
      stroke: `currentColor`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `0`,
    },
  ],
  [
    `path`,
    {
      d: `M14.8888 9.66294C15.3933 10 16.0955 10 17.5 10C18.9044 10 19.6067 10 20.1111 9.66294C20.3295 9.51702 20.517 9.32952 20.6629 9.11114C21 8.60669 21 7.90446 21 6.5C21 5.09554 21 4.39331 20.6629 3.88886C20.517 3.67048 20.3295 3.48298 20.1111 3.33706C19.6067 3 18.9044 3 17.5 3C16.0955 3 15.3933 3 14.8888 3.33706C14.6705 3.48298 14.483 3.67048 14.337 3.88886C14 4.39331 14 5.09554 14 6.5C14 7.90446 14 8.60669 14.337 9.11114C14.483 9.32952 14.6705 9.51702 14.8888 9.66294Z`,
      stroke: `currentColor`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `1`,
    },
  ],
  [
    `path`,
    {
      d: `M3.88884 20.6629C4.39329 21 5.09552 21 6.49998 21C7.90445 21 8.60668 21 9.11113 20.6629C9.32951 20.517 9.51701 20.3295 9.66292 20.1111C9.99998 19.6067 9.99998 18.9045 9.99998 17.5C9.99998 16.0955 9.99998 15.3933 9.66292 14.8889C9.51701 14.6705 9.32951 14.483 9.11113 14.3371C8.60668 14 7.90445 14 6.49998 14C5.09552 14 4.39329 14 3.88884 14.3371C3.67046 14.483 3.48296 14.6705 3.33705 14.8889C2.99998 15.3933 2.99998 16.0955 2.99998 17.5C2.99998 18.9045 2.99998 19.6067 3.33705 20.1111C3.48296 20.3295 3.67046 20.517 3.88884 20.6629Z`,
      stroke: `currentColor`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `2`,
    },
  ],
  [
    `path`,
    {
      d: `M14.8888 20.6629C15.3933 21 16.0955 21 17.5 21C18.9044 21 19.6067 21 20.1111 20.6629C20.3295 20.517 20.517 20.3295 20.6629 20.1111C21 19.6067 21 18.9045 21 17.5C21 16.0955 21 15.3933 20.6629 14.8889C20.517 14.6705 20.3295 14.483 20.1111 14.3371C19.6067 14 18.9044 14 17.5 14C16.0955 14 15.3933 14 14.8888 14.3371C14.6705 14.483 14.483 14.6705 14.337 14.8889C14 15.3933 14 16.0955 14 17.5C14 18.9045 14 19.6067 14.337 20.1111C14.483 20.3295 14.6705 20.517 14.8888 20.6629Z`,
      stroke: `currentColor`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `3`,
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
var HelpIcon: IconNode = [
  [
    `path`,
    {
      d: `M8 5.5L20 5.5`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeWidth: `1.5`,
      key: `0`,
    },
  ],
  [
    `path`,
    {
      d: `M8 12.5L20 12.5`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeWidth: `1.5`,
      key: `1`,
    },
  ],
  [
    `path`,
    {
      d: `M8 19.5L20 19.5`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeWidth: `1.5`,
      key: `2`,
    },
  ],
  [
    `path`,
    {
      d: `M4.375 5.5H4.25M4.5 5.5C4.5 5.63807 4.38807 5.75 4.25 5.75C4.11193 5.75 4 5.63807 4 5.5C4 5.36193 4.11193 5.25 4.25 5.25C4.38807 5.25 4.5 5.36193 4.5 5.5Z`,
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
      d: `M4.375 12.5H4.25M4.5 12.5C4.5 12.6381 4.38807 12.75 4.25 12.75C4.11193 12.75 4 12.6381 4 12.5C4 12.3619 4.11193 12.25 4.25 12.25C4.38807 12.25 4.5 12.3619 4.5 12.5Z`,
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
      d: `M4.375 19.5H4.25M4.5 19.5C4.5 19.6381 4.38807 19.75 4.25 19.75C4.11193 19.75 4 19.6381 4 19.5C4 19.3619 4.11193 19.25 4.25 19.25C4.38807 19.25 4.5 19.3619 4.5 19.5Z`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `5`,
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
function useControllableState<T>(controlledValue: T | undefined, defaultValue: T, onChange?: (value: T) => void): [T, (value: T) => void] {
  let [internalValue, setInternalValue] = React.useState(defaultValue);
  return [controlledValue ?? internalValue, (e) => (setInternalValue(e), onChange?.(e))];
}
function ShellTabs({ items: items, value: value, defaultValue: defaultValue, onChange: onChange }: {items: string[]; value?: string; defaultValue?: string; onChange?: (value: string) => void}) {
  let [currentValue, setValue] = useControllableState(value, defaultValue ?? items[0], onChange),
    tabsRef = React.useRef<HTMLDivElement | null>(null),
    [pillGeometry, setPillGeometry] = React.useState<{x: number; w: number} | null>(null);
  return (
    React.useLayoutEffect(() => {
      let e = tabsRef.current?.querySelector<HTMLElement>(`[aria-selected="true"]`);
      e &&
        setPillGeometry({
          x: e.offsetLeft,
          w: e.offsetWidth,
        });
    }, [currentValue, items.join(`|`)]),
    (
      <div ref={tabsRef} className={`ui-as-tabs`} role={`tablist`}>
        {pillGeometry && (
          <span
            className={`ui-as-tabs__pill`}
            style={{
              transform: `translateX(${pillGeometry.x}px)`,
              width: pillGeometry.w,
            }}
            aria-hidden={`true`}
          />
        )}
        {items.map((e) => (
          <button
            type={`button`}
            role={`tab`}
            aria-selected={currentValue === e}
            className={`ui-as-tabs__tab`}
            onClick={() => setValue(e)}
            key={e}
          >
            {e}
          </button>
        ))}
      </div>
    )
  );
}
function SortButton({ value: value, onChange: onChange }: {value?: string; onChange?: (value: string) => void}) {
  let [n, r] = useControllableState(value, `asc`, onChange);
  return (
    <button
      type={`button`}
      className={`ui-as-tool ui-as-sort`}
      data-dir={n}
      aria-label={n === `asc` ? `Sorted A to Z – sort Z to A` : `Sorted Z to A – sort A to Z`}
      title={n === `asc` ? `A–Z` : `Z–A`}
      onClick={() => r(n === `asc` ? `desc` : `asc`)}
    >
      <Icon icon={SortIcon} size={15} />
    </button>
  );
}
function ViewToggle({ value: value, onChange: onChange }: {value?: string; onChange?: (value: string) => void}) {
  let [n, r] = useControllableState(value, `grid`, onChange);
  return (
    <div className={`ui-as-view`} role={`radiogroup`} aria-label={`View`} data-view={n}>
      <span className={`ui-as-view__pill`} aria-hidden={`true`} />
      {([
        [`grid`, MoreIcon, `Grid`],
        [`list`, HelpIcon, `List`],
      ] as Array<[string, IconNode, string]>).map(([e, t, i]) => (
        <button
          type={`button`}
          role={`radio`}
          aria-checked={n === e}
          aria-label={i}
          className={`ui-as-view__btn`}
          onClick={() => r(e)}
          key={e}
        >
          <Icon icon={t} size={15} />
        </button>
      ))}
    </div>
  );
}
function SearchField({ placeholder: placeholder, width = 175, value: value, onChange: onChange }: {placeholder?: string; width?: number; value?: string; onChange?: (value: string) => void}) {
  let [i, a] = useControllableState(value, ``, onChange);
  return (
    <label
      className={`ui-as-search`}
      style={{
        width: width,
      }}
    >
      <Icon icon={SearchIcon} size={15} />
      <input
        type={`search`}
        placeholder={placeholder}
        aria-label={placeholder}
        value={i}
        onChange={(e) => a(e.target.value)}
        onKeyDown={(e) => e.key === `Escape` && a(``)}
      />
      {i && (
        <button
          type={`button`}
          className={`ui-as-search__clear`}
          aria-label={`Clear search`}
          onClick={() => a(``)}
        >
          <Icon icon={CloseIcon} size={12} />
        </button>
      )}
    </label>
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
function FilterButton({
  label: label,
  groups: groups,
  value: value,
  onChange: onChange,
  align = `end`,
}: {label: string; groups: FilterGroup[]; value: FilterValue; onChange: (value: FilterValue) => void; align?: PopoverAlign}) {
  let [s, c] = React.useState(false),
    l = Object.values(value).reduce((e, t) => e + t.length, 0);
  return (
    <span className={`ui-as-anchor`}>
      <button
        type={`button`}
        className={`ui-as-tool ui-as-tool--label`}
        aria-expanded={s}
        data-active={l > 0 || void 0}
        onClick={() => c((e) => !e)}
      >
        <Icon icon={ListViewIcon} size={15} />
        {label}
        {l > 0 ? (
          <span className={`ui-as-tool__count`}>{l}</span>
        ) : (
          <Icon icon={ChevronDownIcon} size={13} />
        )}
      </button>
      <Popover open={s} onClose={() => c(false)} align={align} className={`ui-as-popover--filter`}>
        <FilterMenu
          groups={groups}
          value={value}
          onChange={onChange}
          defaultOpen={groups.map((e) => e.id)}
          hints={false}
          title={label}
        />
      </Popover>
    </span>
  );
}
function SectionHeading({ title: title, left: left, right: right }: {title: React.ReactNode; left?: React.ReactNode; right?: React.ReactNode}) {
  return (
    <div className={`ui-as-section-head`} data-inline={!left || void 0}>
      <h2 className={`ui-as-section-head__title`}>{title}</h2>
      {(left || right) && (
        <div className={`ui-as-toolbar`}>
          <div className={`ui-as-toolbar__left`}>{left}</div>
          <div className={`ui-as-toolbar__right`}>{right}</div>
        </div>
      )}
    </div>
  );
}
function EmptyState({
  title: title,
  text: text,
  action: action,
  tall: tall,
}: {
  title: string;
  text: string;
  action?: React.ReactNode;
  tall?: boolean;
}) {
  return (
    <div className={`ui-as-empty`} data-tall={tall || void 0}>
      <span className={`ui-as-empty__icon`}>
        <Icon icon={GridViewIcon} size={18} />
      </span>
      <b className={`ui-as-empty__title`}>{title}</b>
      <p className={`ui-as-empty__text`}>{text}</p>
      {action}
    </div>
  );
}
var documentColors = {
  DOC: `blue`,
  PDF: `rose`,
  XLS: `emerald`,
};
var documentNames = {
  DOC: `Document`,
  PDF: `PDF`,
  XLS: `Spreadsheet`,
};
function FileTemplate({ file: file, meta: meta }: {file: FileRecord; meta?: React.ReactNode}) {
  return (
    <button type={`button`} className={`ui-as-template`}>
      <span className={`ui-as-template__preview`}>
        <DocumentIcon type={file.type} color={documentColors[file.type]} />
      </span>
      <b className={`ui-as-template__name`}>{file.name}</b>
      <span className={`ui-as-meta`}>{meta}</span>
    </button>
  );
}
function DocumentIcon({ type: type, color: color }: {type: FileRecord["type"]; color?: string}) {
  return (
    <span className={`ui-as-doc`} data-color={color} aria-hidden={`true`}>
      <span className={`ui-as-doc__art`}>
        <span className={`ui-as-doc__back`} />
        <span className={`ui-as-doc__page`} data-type={type}>
          {type === `XLS` ? (
            <span className={`ui-as-sheet`}>
              {Array.from(
                {
                  length: 18,
                },
                (e, t) => (
                  <i key={t} />
                ),
              )}
            </span>
          ) : (
            <>
              {type === `PDF` ? (
                <span className={`ui-as-doc__image`} />
              ) : (
                <i className={`ui-as-doc__title`} />
              )}
              {(type === `PDF` ? [100, 82, 92] : [100, 86, 94, 70, 88]).map((e, t) => (
                <i
                  className={`ui-as-doc__line`}
                  style={{
                    width: `${e}%`,
                  }}
                  key={t}
                />
              ))}
            </>
          )}
        </span>
        <span className={`ui-as-doc__type`}>{type}</span>
      </span>
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
var valueValue10: IconNode = [
  [
    `path`,
    {
      d: `M18.5 7C18.5 9.20914 16.7091 11 14.5 11C12.2909 11 10.5 9.20914 10.5 7C10.5 4.79086 12.2909 3 14.5 3C16.7091 3 18.5 4.79086 18.5 7Z`,
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
      d: `M8 11C6.34315 11 5 9.65685 5 8C5 6.34315 6.34315 5 8 5`,
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
      d: `M14.5 14C9.8125 14 7 16.5 7 19C7 20.1046 7.83947 21 8.875 21H20.125C21.1605 21 22 20.1046 22 19C22 16.5 19.1875 14 14.5 14Z`,
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
      d: `M4 19.9992H3.5C2.67157 19.9992 2 19.2317 2 18.2849C2 16.673 3.27307 15.0612 5.5 14.3613`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `3`,
    },
  ],
];
var valueValue: IconNode = [
  [
    `path`,
    {
      d: `M12 14.5V17.5M13 14.5C13 15.0523 12.5523 15.5 12 15.5C11.4477 15.5 11 15.0523 11 14.5C11 13.9477 11.4477 13.5 12 13.5C12.5523 13.5 13 13.9477 13 14.5Z`,
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
      d: `M16.5 9V6.5C16.5 4.01472 14.4853 2 12 2C9.51471 2 7.49999 4.01472 7.49999 6.5V9`,
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
      d: `M4.2678 18.8447C4.49268 20.515 5.87612 21.8235 7.55965 21.9009C8.97627 21.966 10.4153 22 12 22C13.5847 22 15.0237 21.966 16.4403 21.9009C18.1239 21.8235 19.5073 20.515 19.7322 18.8447C19.8789 17.7547 20 16.6376 20 15.5C20 14.3624 19.8789 13.2453 19.7322 12.1553C19.5073 10.485 18.1239 9.17649 16.4403 9.09909C15.0237 9.03397 13.5847 9 12 9C10.4153 9 8.97627 9.03397 7.55965 9.09909C5.87612 9.17649 4.49268 10.485 4.2678 12.1553C4.12104 13.2453 3.99999 14.3624 3.99999 15.5C3.99999 16.6376 4.12104 17.7547 4.2678 18.8447Z`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `2`,
    },
  ],
];
var ValueValue: FileFolder[] = [
  {
    name: `Q3 Campaign`,
    access: `Shared`,
    files: [
      {
        name: `Campaign-Brief`,
        type: `DOC`,
        edited: `2 hours ago`,
      },
      {
        name: `Launch-Plan`,
        type: `PDF`,
        edited: `Yesterday`,
      },
      {
        name: `Media-Budget`,
        type: `XLS`,
        edited: `Yesterday`,
      },
      {
        name: `Ad-Copy`,
        type: `DOC`,
        edited: `3 days ago`,
      },
      {
        name: `Results-Q2`,
        type: `XLS`,
        edited: `Last week`,
      },
    ],
  },
  {
    name: `Brand assets`,
    access: `Shared`,
    files: [
      {
        name: `Brand-Guidelines`,
        type: `PDF`,
        edited: `4 days ago`,
      },
      {
        name: `Tone-of-Voice`,
        type: `DOC`,
        edited: `Last week`,
      },
      {
        name: `Logo-Usage`,
        type: `PDF`,
        edited: `2 weeks ago`,
      },
    ],
  },
  {
    name: `Hiring`,
    access: `Private`,
    files: [
      {
        name: `Job-Description`,
        type: `DOC`,
        edited: `Today`,
      },
      {
        name: `Candidates`,
        type: `XLS`,
        edited: `Yesterday`,
      },
      {
        name: `Interview-Guide`,
        type: `PDF`,
        edited: `5 days ago`,
      },
      {
        name: `Offer-Template`,
        type: `DOC`,
        edited: `Last month`,
      },
    ],
  },
  {
    name: `Research`,
    access: `Private`,
    files: [
      {
        name: `Market-Study`,
        type: `PDF`,
        edited: `3 days ago`,
      },
      {
        name: `Survey-Results`,
        type: `XLS`,
        edited: `Last week`,
      },
    ],
  },
];
var ValueValue2: FileRecord[] = [
  {
    name: `Design-Book`,
    type: `DOC`,
    owner: `Alex Morgan`,
  },
  {
    name: `Brand-Guidelines`,
    type: `PDF`,
    owner: `Jonas Weber`,
    shared: true,
  },
  {
    name: `Campaign-Budget`,
    type: `XLS`,
    owner: `Jonas Weber`,
    shared: true,
  },
  {
    name: `Weekly-Report`,
    type: `XLS`,
    owner: `Alex Morgan`,
  },
];
var valueValue2 = [
  {
    id: `type`,
    label: `Type`,
    options: [
      {
        id: `DOC`,
        label: `Document`,
      },
      {
        id: `PDF`,
        label: `PDF`,
      },
      {
        id: `XLS`,
        label: `Spreadsheet`,
      },
    ],
  },
];
var ValueValue3 = (e: string) => (t: {name: string}, n: {name: string}) => (e === `asc` ? 1 : -1) * t.name.localeCompare(n.name);
var ValueValue4 = (e: string, t: string) => e.toLowerCase().includes(t.trim().toLowerCase());
function Files(e: AppShellProps) {
  let t = e.user?.name ?? `Alex Morgan`,
    [n, i] = React.useState(ValueValue),
    [D, k] = React.useState(`All`),
    [A, j] = React.useState(`asc`),
    [M, N] = React.useState(`grid`),
    [P, F] = React.useState(``),
    I = n
      .filter((e) => D === `All` || e.access === D)
      .filter((e) => ValueValue4(e.name, P))
      .sort(ValueValue3(A)),
    L = () => {
      let e = new Set(n.map((e) => e.name)),
        t = `Untitled folder`;
      for (
        let n = 2;
        e.has(t);
        n++
      )
        t = `Untitled folder ${n}`;
      (i((e) => [
        ...e,
        {
          name: t,
          access: `Private`,
          files: [],
        },
      ]),
        k(`All`),
        F(``));
    },
    [R, z] = React.useState(ValueValue2),
    [B, V] = React.useState(`All`),
    [H, U] = React.useState<FilterValue>({}),
    [W, G] = React.useState(`asc`),
    [K, q] = React.useState(``),
    J = H.type ?? [],
    Y = R.filter((e) => B === `All` || (B === `Mine` ? e.owner === t : e.owner !== t))
      .filter((e) => !J.length || J.includes(e.type))
      .filter((e) => ValueValue4(e.name, K))
      .sort(ValueValue3(W)),
    X = () => {
      let e = new Set(R.map((e) => e.name)),
        n = `Untitled`;
      for (let t = 2; e.has(n); t++) n = `Untitled-${t}`;
      (z((e) => [
        ...e,
        {
          name: n,
          type: `DOC`,
          owner: t,
        },
      ]),
        V(`All`),
        U({}),
        q(``));
    };
  return (
    <AppShell active={`Folders`} {...e}>
      <style href={`ui-screen-files`} precedence={`default`}>
        {ValueValue5}
      </style>
      <div className={`ui-as-page`}>
        <h1 className={`ui-as-page-title`}>{`Files`}</h1>
        <p className={`ui-as-page-sub`}>
          {`See files you recently used in chats and manage files saved in folders. `}
          <a href={`#learn-more`}>{`Learn more`}</a>
        </p>
        <SectionHeading
          title={`Folders`}
          left={<ShellTabs items={[`All`, `Shared`, `Private`]} value={D} onChange={k} />}
          right={
            <>
              <SortButton value={A} onChange={j} />
              <ViewToggle value={M} onChange={N} />
              <SearchField placeholder={`Search folders...`} width={172} value={P} onChange={F} />
              <Button
                size={`sm`}
                icon={<Icon icon={PlusIcon} size={15} />}
                onClick={L}
              >{`Create folder`}</Button>
            </>
          }
        />
        {I.length ? (
          <div className={`ui-as-folders`} data-view={M} key={`${D}|${A}|${M}|${P}`}>
            {I.map((t, n) => (
              <button
                type={`button`}
                className={`ui-as-folder-card ui-as-rise`}
                style={{
                  "--i": n,
                } as React.CSSProperties}
                onClick={() => e.onNavigate?.(t.name)}
                key={t.name}
              >
                <span className={`ui-as-folder-card__icon`}>
                  <GlassFolderComponent label={``} />
                </span>
                <span className={`ui-as-folder-card__text`}>
                  <b>{t.name}</b>
                  <span className={`ui-as-meta`}>
                    <Icon icon={t.access === `Shared` ? valueValue10 : valueValue} size={12} />
                    {t.access}
                    {` · `}
                    {t.files.length}
                    {` `}
                    {t.files.length === 1 ? `file` : `files`}
                  </span>
                </span>
              </button>
            ))}
          </div>
        ) : (
          <div className={`ui-as-rise ui-as-files-empty`}>
            <EmptyState
              title={`No folders found`}
              text={P ? `Nothing matches “${P}”.` : `There are no ${D.toLowerCase()} folders yet.`}
            />
          </div>
        )}
        <SectionHeading
          title={`File templates`}
          left={<ShellTabs items={[`All`, `Mine`, `Shared with me`]} value={B} onChange={V} />}
          right={
            <>
              <FilterButton label={`Type`} groups={valueValue2} value={H} onChange={U} />
              <SortButton value={W} onChange={G} />
              <SearchField placeholder={`Search templates...`} width={172} value={K} onChange={q} />
              <Button
                size={`sm`}
                variant={`secondary`}
                icon={<Icon icon={PlusIcon} size={15} />}
                onClick={X}
              >{`Add template`}</Button>
            </>
          }
        />
        {Y.length ? (
          <div className={`ui-as-templates ui-as-file-grid`} key={`${B}|${J.join()}|${W}|${K}`}>
            {Y.map((e, t) => (
              <div
                className={`ui-as-rise`}
                style={{
                  "--i": t,
                } as React.CSSProperties}
                key={e.name}
              >
                <FileTemplate
                  file={e}
                  meta={
                    <>
                      {documentNames[e.type]}
                      {` · `}
                      {e.owner}
                      {` · `}
                      <Icon icon={e.shared ? valueValue10 : valueValue} size={12} />
                      {` `}
                      {e.shared ? `Shared` : `Private`}
                    </>
                  }
                />
              </div>
            ))}
          </div>
        ) : (
          <div className={`ui-as-rise ui-as-files-empty`}>
            <EmptyState title={`No templates found`} text={`Try another tab, type or search.`} />
          </div>
        )}
      </div>
    </AppShell>
  );
}
var ValueValue5 = `
/* Files overview – folders and file templates */

.ui-as-folders {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 11px;
  margin-top: 16px;
}
.ui-as-folder-card {
  display: flex;
  align-items: center;
  gap: 12px;
  height: 59px;
  padding: 0 14px 0 12px;
  border-radius: 12px;
  background: var(--card);
  box-shadow: 0 0 0 1px var(--line), var(--shadow);
  text-decoration: none;
  transition: box-shadow 160ms ease;
}
.ui-as-folder-card:hover { box-shadow: 0 0 0 1px var(--line-strong), 0 2px 8px rgba(0, 0, 0, 0.05); }
.ui-as-folder-card__text { display: grid; gap: 2px; min-width: 0; }
.ui-as-folder-card__text b { overflow: hidden; font-size: 13.5px; line-height: 18px; font-weight: 500; color: var(--ink); white-space: nowrap; text-overflow: ellipsis; }

.ui-as-templates { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 16px; }
.ui-as-files-empty { margin-top: 16px; }

/* List view: one folder per row */
.ui-as-folders[data-view="list"] { grid-template-columns: minmax(0, 1fr); gap: 6px; }
.ui-as-folders[data-view="list"] .ui-as-folder-card { height: 52px; }

/* Narrow panels: folders 4 → 2 → 1 per row */
@container ui-as-main (max-width: 760px) {
  .ui-as-folders { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@container ui-as-main (max-width: 760px) {
  .ui-as-folder-card { text-align: left; }
  .ui-as-folder-card__text { flex: 1; }
}
@container ui-as-main (max-width: 480px) {
  .ui-as-folders { grid-template-columns: minmax(0, 1fr); gap: 8px; }
}
`;
function FilesDemo2() {
  return (
    <PreviewFrame>
      <Files onNavigate={navigateScreen} />
    </PreviewFrame>
  );
}
function FullScreen(props: {}) {
  return (
    <ScreenFrameModeContext.Provider value={true}>
      <FilesDemo2 {...props} />
    </ScreenFrameModeContext.Provider>
  );
}
const demoStyles = "";
function FilesDemo(props: {}) {
  return (
    <>
      <style href="plico-demo-files" precedence="default">
        {demoStyles}
      </style>
      <FilesDemo2 {...props} />
    </>
  );
}
export { Files as Component };
export { FilesDemo as Demo };
export { Files };
export { FilesDemo };
export { FullScreen };
export default Files;

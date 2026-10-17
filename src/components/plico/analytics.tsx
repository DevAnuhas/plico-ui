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
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: string;
  size?: string;
  loading?: boolean;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  ref?: React.Ref<HTMLButtonElement>;
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
var formatCompactNumber = (value: number) =>
  Math.abs(value) >= 1e3
    ? `${+(value / 1e3).toFixed(Math.abs(value) >= 1e4 ? 0 : 1)}k`
    : `${Math.round(value)}`;
function axisCeiling(value: number) {
  let halfMaximum = value / 2 || 1,
    magnitude = 10 ** Math.floor(Math.log10(halfMaximum));
  return (
    ([1, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10].find((e) => e * magnitude >= halfMaximum) ?? 10) *
    magnitude *
    2
  );
}
interface KPISeries {
  values: number[];
  label?: string;
  color?: string;
}
interface KPIChartProps {
  title: React.ReactNode;
  value: React.ReactNode;
  delta: number;
  labels: string[];
  tooltipLabels?: string[];
  series: KPISeries[];
  format?: (value: number) => string;
  footer?: React.ReactNode;
  defaultIndex?: number;
  className?: string;
}
function KPIChart({
  title: title,
  value: value,
  delta: delta,
  labels: labels,
  tooltipLabels: tooltipLabels,
  series: series,
  format = formatCompactNumber,
  footer: footer,
  defaultIndex: defaultIndex,
  className: className,
}: KPIChartProps) {
  let [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null),
    activeIndex = hoveredIndex ?? defaultIndex ?? null,
    [lastIndex, setLastIndex] = React.useState(activeIndex ?? 0);
  activeIndex !== null && activeIndex !== lastIndex && setLastIndex(activeIndex);
  let pointCount = labels.length,
    maximum = axisCeiling(Math.max(...series.flatMap((e) => e.values))),
    xPercent = (index: number) => (pointCount > 1 ? (index / (pointCount - 1)) * 100 : 50),
    yPercent = (value: number) => (1 - value / maximum) * 100,
    indexFromPointer = (event: React.PointerEvent<HTMLDivElement>) => {
      let rect = event.currentTarget.getBoundingClientRect(),
        percent = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
      return Math.round(percent * (pointCount - 1));
    },
    handleKeyDown = (event: { key: string; preventDefault: () => void }) => {
      let currentIndex = activeIndex ?? (event.key === `ArrowLeft` ? pointCount : -1);
      if (event.key === `ArrowRight`) setHoveredIndex(Math.min(pointCount - 1, currentIndex + 1));
      else if (event.key === `ArrowLeft`) setHoveredIndex(Math.max(0, currentIndex - 1));
      else if (event.key === `Escape`) setHoveredIndex(null);
      else return;
      event.preventDefault();
    },
    tooltipSeries = series
      .map((e) => ({
        ...e,
        value: e.values[lastIndex] ?? 0,
      }))
      .sort(
        (
          e: {
            value: number;
          },
          t: {
            value: number;
          },
        ) => t.value - e.value,
      ),
    tooltipOnLeft = xPercent(lastIndex) > 50,
    labelIndices = [0, Math.round(pointCount / 2 - 0.5), pointCount - 1].filter(
      (e, t, n) => n.indexOf(e) === t,
    );
  return (
    <>
      <style href={`ui-kpi-chart`} precedence={`default`}>
        {kpiChartStyles}
      </style>
      <section className={[`ui-kpi`, className].filter(Boolean).join(` `)}>
        <h3 className={`ui-kpi__title`}>{title}</h3>
        <p className={`ui-kpi__value`}>
          {value}
          {delta !== void 0 && delta !== 0 && (
            <span className={`ui-kpi__delta`} data-trend={delta > 0 ? `up` : `down`}>
              {delta > 0 ? `+` : `−`}
              {format(Math.abs(delta))}
            </span>
          )}
        </p>
        <div className={`ui-kpi__chart`}>
          <div className={`ui-kpi__yaxis`} aria-hidden={`true`}>
            <span>{format(maximum)}</span>
            <span>{format(maximum / 2)}</span>
            <span>{format(0)}</span>
          </div>
          <div
            className={`ui-kpi__plot`}
            tabIndex={0}
            role={`group`}
            aria-label={`${title} chart – use the arrow keys to read the values per day`}
            onPointerMove={(e) => setHoveredIndex(indexFromPointer(e))}
            onPointerDown={(e) => setHoveredIndex(indexFromPointer(e))}
            onPointerLeave={() => setHoveredIndex(null)}
            onBlur={() => setHoveredIndex(null)}
            onKeyDown={handleKeyDown}
          >
            <span
              className={`ui-kpi__grid`}
              style={{
                top: `0%`,
              }}
            />
            <span
              className={`ui-kpi__grid`}
              style={{
                top: `50%`,
              }}
            />
            <span
              className={`ui-kpi__grid`}
              style={{
                top: `100%`,
              }}
            />
            <svg
              className={`ui-kpi__lines`}
              viewBox={`0 0 100 100`}
              preserveAspectRatio={`none`}
              aria-hidden={`true`}
            >
              {series.map((e) => (
                <polyline
                  points={e.values
                    .map((e: number, t: number) => `${xPercent(t)},${yPercent(e)}`)
                    .join(` `)}
                  stroke={e.color}
                  vectorEffect={`non-scaling-stroke`}
                  key={e.label}
                />
              ))}
            </svg>
            <div
              className={`ui-kpi__marker`}
              data-open={activeIndex !== null || void 0}
              aria-hidden={`true`}
            >
              <span
                className={`ui-kpi__guide`}
                style={{
                  left: `${xPercent(lastIndex)}%`,
                }}
              />
              {series.map((e) => (
                <span
                  className={`ui-kpi__dot`}
                  style={{
                    left: `${xPercent(lastIndex)}%`,
                    top: `${yPercent(e.values[lastIndex] ?? 0)}%`,
                    background: e.color,
                  }}
                  key={e.label}
                />
              ))}
            </div>
            <div
              className={`ui-kpi__tooltip`}
              data-open={activeIndex !== null || void 0}
              data-side={tooltipOnLeft ? `left` : `right`}
              style={{
                left: `${xPercent(lastIndex)}%`,
              }}
              role={`status`}
              aria-live={`polite`}
            >
              <p className={`ui-kpi__date`}>{(tooltipLabels ?? labels)[lastIndex]}</p>
              <ul>
                {tooltipSeries.map((e) => (
                  <li key={e.label}>
                    <span
                      className={`ui-kpi__swatch`}
                      style={{
                        background: e.color,
                      }}
                    />
                    <span className={`ui-kpi__label`}>{e.label}</span>
                    <span className={`ui-kpi__num`}>{format(e.value)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className={`ui-kpi__xaxis`} aria-hidden={`true`}>
            {labelIndices.map((e) => (
              <span
                style={{
                  left: `${xPercent(e)}%`,
                }}
                data-edge={e === 0 ? `start` : e === pointCount - 1 ? `end` : void 0}
                key={e}
              >
                {labels[e]}
              </span>
            ))}
          </div>
        </div>
        {footer && <p className={`ui-kpi__footer`}>{footer}</p>}
      </section>
    </>
  );
}
var kpiChartStyles = `
.ui-kpi {
  --ui-kpi-card: #ffffff;
  --ui-kpi-line: #ebebeb;
  --ui-kpi-grid: #f0f0f0;
  --ui-kpi-ink: #171717;
  --ui-kpi-muted: #8f8f8f;
  --ui-kpi-up: #1f8a4c;
  --ui-kpi-down: #e5484d;
  --ui-kpi-guide: #d9d9d9;
  --ui-kpi-label: #525252;
  --ui-kpi-ring-gap: #fff;
  --ui-kpi-ring: rgba(23, 23, 23, 0.25);
  --ui-kpi-shadow: 0 1px 2px rgba(0, 0, 0, 0.03), 0 8px 24px rgba(0, 0, 0, 0.035);
  --ui-kpi-tip-shadow: 0 8px 24px -6px rgba(0, 0, 0, 0.12), 0 2px 6px rgba(0, 0, 0, 0.04);
  --ui-kpi-ease: cubic-bezier(0.22, 1, 0.36, 1);
  box-sizing: border-box;
  width: 100%;
  max-width: 460px;
  padding: 20px 20px 18px;
  background: var(--ui-kpi-card);
  border: 1px solid var(--ui-kpi-line);
  border-radius: 20px;
  box-shadow: var(--ui-kpi-shadow);
  font-family: "Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  color: var(--ui-kpi-ink);
  -webkit-font-smoothing: antialiased;
  font-variant-numeric: tabular-nums;
}
.ui-kpi *, .ui-kpi *::before, .ui-kpi *::after { box-sizing: border-box; }

.ui-kpi__title {
  margin: 0;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  color: var(--ui-kpi-muted);
}
.ui-kpi__value {
  display: flex;
  align-items: baseline;
  gap: 10px;
  margin: 8px 0 0;
  font-size: 28px;
  font-weight: 500;
  line-height: 34px;
  letter-spacing: -0.02em;
}
.ui-kpi__delta {
  font-size: 14px;
  font-weight: 450;
  letter-spacing: 0;
}
.ui-kpi__delta[data-trend="up"] { color: var(--ui-kpi-up); }
.ui-kpi__delta[data-trend="down"] { color: var(--ui-kpi-down); }

/* Chart: y labels on the left, plot on the right, x labels below */
.ui-kpi__chart {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: 116px 20px;
  column-gap: 12px;
  row-gap: 8px;
  margin-top: 24px;
}
.ui-kpi__yaxis {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: -9px 0;
  font-size: 12px;
  line-height: 18px;
  text-align: right;
  color: var(--ui-kpi-muted);
}
.ui-kpi__plot {
  position: relative;
  touch-action: pan-y;
  outline: none;
  cursor: crosshair;
}
.ui-kpi__plot:focus-visible {
  border-radius: 4px;
  box-shadow: 0 0 0 4px var(--ui-kpi-ring-gap), 0 0 0 6px var(--ui-kpi-ring);
}
.ui-kpi__grid {
  position: absolute;
  left: 0;
  right: 0;
  height: 1px;
  background: var(--ui-kpi-grid);
}
.ui-kpi__lines {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: visible;
  animation: ui-kpi-draw 1100ms var(--ui-kpi-ease) both;
}
.ui-kpi__lines polyline {
  fill: none;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

/* Hover marker: thin guide and one dot per line */
.ui-kpi__marker {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0;
  transition: opacity 160ms ease;
}
.ui-kpi__marker[data-open] { opacity: 1; }
.ui-kpi__guide,
.ui-kpi__dot {
  position: absolute;
  transition: left 220ms var(--ui-kpi-ease), top 220ms var(--ui-kpi-ease);
}
.ui-kpi__guide {
  top: -4px;
  bottom: 0;
  width: 1px;
  margin-left: -0.5px;
  background: var(--ui-kpi-guide);
}
.ui-kpi__dot {
  width: 10px;
  height: 10px;
  margin: -5px 0 0 -5px;
  border-radius: 50%;
  box-shadow: 0 0 0 2px var(--ui-kpi-card);
}

/* Tooltip: sits beside the guide, flips to the left on the right half */
.ui-kpi__tooltip {
  position: absolute;
  top: -12px;
  z-index: 2;
  min-width: 176px;
  padding: 10px 12px 12px;
  background: var(--ui-kpi-card);
  border: 1px solid var(--ui-kpi-line);
  border-radius: 12px;
  box-shadow: var(--ui-kpi-tip-shadow);
  pointer-events: none;
  opacity: 0;
  transform: translateX(var(--ui-kpi-shift)) scale(0.97);
  transition:
    left 220ms var(--ui-kpi-ease),
    opacity 160ms ease,
    transform 220ms var(--ui-kpi-ease);
}
.ui-kpi__tooltip[data-side="right"] { --ui-kpi-shift: 14px; transform-origin: left top; }
.ui-kpi__tooltip[data-side="left"] { --ui-kpi-shift: calc(-100% - 14px); transform-origin: right top; }
.ui-kpi__tooltip[data-open] {
  opacity: 1;
  transform: translateX(var(--ui-kpi-shift));
}
.ui-kpi__date {
  margin: 0 0 6px;
  font-size: 12px;
  line-height: 18px;
  color: var(--ui-kpi-muted);
}
.ui-kpi__tooltip ul {
  display: grid;
  gap: 4px;
  margin: 0;
  padding: 0;
  list-style: none;
}
.ui-kpi__tooltip li {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  line-height: 20px;
}
.ui-kpi__swatch {
  flex: none;
  width: 10px;
  height: 2px;
  border-radius: 1px;
}
.ui-kpi__label {
  flex: 1;
  white-space: nowrap;
  color: var(--ui-kpi-label);
}
.ui-kpi__num {
  padding-left: 16px;
  font-weight: 500;
}

.ui-kpi__xaxis {
  position: relative;
  grid-column: 2;
  font-size: 12px;
  line-height: 20px;
  color: var(--ui-kpi-muted);
}
.ui-kpi__xaxis span {
  position: absolute;
  top: 0;
  white-space: nowrap;
  transform: translateX(-50%);
}
.ui-kpi__xaxis span[data-edge="start"] { transform: none; }
.ui-kpi__xaxis span[data-edge="end"] { transform: translateX(-100%); }

.ui-kpi__footer {
  margin: 16px 0 0;
  font-size: 13px;
  line-height: 18px;
  color: var(--ui-kpi-muted);
}

@keyframes ui-kpi-draw {
  from { clip-path: inset(-10% 100% -10% 0); }
  to { clip-path: inset(-10% -2% -10% 0); }
}

@media (prefers-reduced-motion: reduce) {
  .ui-kpi__lines { animation: none; }
  .ui-kpi__marker, .ui-kpi__guide, .ui-kpi__dot, .ui-kpi__tooltip { transition: none; }
}

/* Dark mode: follows a .dark class or data-theme="dark" on any ancestor, e.g. <html> */
:where(.dark, [data-theme="dark"]) .ui-kpi {
  --ui-kpi-card: #232326;
  --ui-kpi-line: rgba(255, 255, 255, 0.08);
  --ui-kpi-grid: rgba(255, 255, 255, 0.06);
  --ui-kpi-ink: #ededed;
  --ui-kpi-muted: #8f8f8f;
  --ui-kpi-up: #3dd68c;
  --ui-kpi-down: #ff6369;
  --ui-kpi-guide: rgba(255, 255, 255, 0.2);
  --ui-kpi-label: #c4c4c4;
  --ui-kpi-ring-gap: #232326;
  --ui-kpi-ring: rgba(237, 237, 237, 0.35);
  --ui-kpi-shadow: 0 1px 2px rgba(0, 0, 0, 0.4), 0 8px 24px rgba(0, 0, 0, 0.35);
  --ui-kpi-tip-shadow: 0 8px 24px -6px rgba(0, 0, 0, 0.5), 0 2px 6px rgba(0, 0, 0, 0.35), 0 0 0 0.5px rgba(255, 255, 255, 0.04);
}
:where(.dark, [data-theme="dark"]) .ui-kpi__tooltip {
  background: #2a2a2d;
  border-color: rgba(255, 255, 255, 0.1);
}
`;
var valueValue8: IconNode = [
  [
    `path`,
    {
      d: `M7 17L7 13`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeWidth: `1.5`,
      key: `0`,
    },
  ],
  [
    `path`,
    {
      d: `M12 17L12 7`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeWidth: `1.5`,
      key: `1`,
    },
  ],
  [
    `path`,
    {
      d: `M17 17L17 11`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeWidth: `1.5`,
      key: `2`,
    },
  ],
  [
    `path`,
    {
      d: `M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z`,
      stroke: `currentColor`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `3`,
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
function SelectMenu({
  value: value,
  options: options,
  onChange: onChange,
  icon: icon,
  align = `end`,
  className: className,
}: {
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
  icon?: IconNode;
  align?: PopoverAlign;
  className?: string;
}) {
  let [s, c] = React.useState(false),
    l = options.find((t) => t.value === value);
  return (
    <span className={`ui-as-anchor`}>
      <button
        type={`button`}
        className={[`ui-as-tool ui-as-tool--label`, className].filter(Boolean).join(` `)}
        aria-expanded={s}
        aria-haspopup={`menu`}
        onClick={() => c((e) => !e)}
      >
        {icon && <Icon icon={icon} size={15} />}
        {l?.label}
        <Icon icon={ChevronDownIcon} size={13} />
      </button>
      <Popover open={s} onClose={() => c(false)} align={align} className={`ui-as-menu`}>
        <MenuItems
          items={options.map((t) => ({
            label: t.label,
            checked: t.value === value,
            onSelect: () => onChange(t.value),
          }))}
          onPick={() => c(false)}
        />
      </Popover>
    </span>
  );
}
function useToast(): [React.ReactNode, (message: string) => void] {
  let [message, setMessage] = React.useState<{ id: number; text: string } | null>(null);
  return (
    React.useEffect(() => {
      if (!message) return;
      let n = window.setTimeout(() => setMessage(null), 2200);
      return () => window.clearTimeout(n);
    }, [message]),
    [
      message ? (
        <div className={`ui-as-toast`} role={`status`} key={message.id}>
          <Icon icon={CheckIcon} size={14} />
          {message.text}
        </div>
      ) : null,
      (e: string) =>
        setMessage({
          id: Date.now(),
          text: e,
        }),
    ]
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
var valueValue9: IconNode = [
  [
    `path`,
    {
      d: `M16 2V6M8 2V6`,
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
      d: `M13 4H11C7.22876 4 5.34315 4 4.17157 5.17157C3 6.34315 3 8.22876 3 12V14C3 17.7712 3 19.6569 4.17157 20.8284C5.34315 22 7.22876 22 11 22H13C16.7712 22 18.6569 22 19.8284 20.8284C21 19.6569 21 17.7712 21 14V12C21 8.22876 21 6.34315 19.8284 5.17157C18.6569 4 16.7712 4 13 4Z`,
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
      d: `M3 10H21`,
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
      d: `M12.1258 14H12.0008M12.1258 18H12.0008M7.625 14H7.5M7.625 18H7.5M16.625 14H16.5M12.2508 14C12.2508 14.1381 12.1389 14.25 12.0008 14.25C11.8628 14.25 11.7508 14.1381 11.7508 14C11.7508 13.8619 11.8628 13.75 12.0008 13.75C12.1389 13.75 12.2508 13.8619 12.2508 14ZM12.2508 18C12.2508 18.1381 12.1389 18.25 12.0008 18.25C11.8628 18.25 11.7508 18.1381 11.7508 18C11.7508 17.8619 11.8628 17.75 12.0008 17.75C12.1389 17.75 12.2508 17.8619 12.2508 18ZM7.75 14C7.75 14.1381 7.63807 14.25 7.5 14.25C7.36193 14.25 7.25 14.1381 7.25 14C7.25 13.8619 7.36193 13.75 7.5 13.75C7.63807 13.75 7.75 13.8619 7.75 14ZM7.75 18C7.75 18.1381 7.63807 18.25 7.5 18.25C7.36193 18.25 7.25 18.1381 7.25 18C7.25 17.8619 7.36193 17.75 7.5 17.75C7.63807 17.75 7.75 17.8619 7.75 18ZM16.75 14C16.75 14.1381 16.6381 14.25 16.5 14.25C16.3619 14.25 16.25 14.1381 16.25 14C16.25 13.8619 16.3619 13.75 16.5 13.75C16.6381 13.75 16.75 13.8619 16.75 14Z`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `3`,
    },
  ],
];
var valueValue10: IconNode = [
  [
    `path`,
    {
      d: `M16.9504 12.1817C17.1981 12.814 16.5076 13.5726 15.1267 15.0899C13.6702 16.6902 12.9201 17.4904 12 17.5C11.0799 17.4904 10.3298 16.6902 8.87331 15.0899C7.49239 13.5726 6.80193 12.814 7.04964 12.1817C7.05868 12.1586 7.06851 12.1359 7.0791 12.1135C7.34928 11.542 8.24477 11.5029 10 11.5002V4.99998C10 4.53501 10 4.30253 10.0511 4.11179C10.1898 3.59414 10.5941 3.1898 11.1118 3.05111C11.3025 3 11.535 3 12 3C12.4649 3 12.6974 3 12.8882 3.05111C13.4058 3.1898 13.8102 3.59414 13.9489 4.11179C14 4.30253 14 4.53501 14 4.99998V11.5002C15.7552 11.5029 16.6507 11.542 16.9209 12.1135C16.9315 12.1359 16.9413 12.1586 16.9504 12.1817Z`,
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
      d: `M5.00006 21H19.0001`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `1`,
    },
  ],
];
var valueValue11: IconNode = [
  [
    `path`,
    {
      d: `M3 11.9896V14.5C3 17.7998 3 19.4497 4.02513 20.4749C5.05025 21.5 6.70017 21.5 10 21.5H14C17.2998 21.5 18.9497 21.5 19.9749 20.4749C21 19.4497 21 17.7998 21 14.5V11.9896C21 10.3083 21 9.46773 20.6441 8.74005C20.2882 8.01237 19.6247 7.49628 18.2976 6.46411L16.2976 4.90855C14.2331 3.30285 13.2009 2.5 12 2.5C10.7991 2.5 9.76689 3.30285 7.70242 4.90855L5.70241 6.46411C4.37533 7.49628 3.71179 8.01237 3.3559 8.74005C3 9.46773 3 10.3083 3 11.9896Z`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `0`,
    },
  ],
];
var valueValue12: IconNode = [
  [
    `path`,
    {
      d: `M16.3884 3L17.3913 3.97574C17.8393 4.41165 18.0633 4.62961 17.9844 4.81481C17.9056 5 17.5888 5 16.9552 5H9.19422C5.22096 5 2 8.13401 2 12C2 13.4872 2.47668 14.8662 3.2895 16`,
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
      d: `M7.61156 21L6.60875 20.0243C6.16074 19.5883 5.93673 19.3704 6.01557 19.1852C6.09441 19 6.4112 19 7.04478 19H14.8058C18.779 19 22 15.866 22 12C22 10.5128 21.5233 9.13383 20.7105 8`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `1`,
    },
  ],
];
var valueValue13: IconNode = [
  [
    `path`,
    {
      d: `M3.32352 13.0113C3.6739 10.009 4.18586 7.75784 4.66063 6.15851C5.04994 4.84711 5.24459 4.19141 6.04283 3.5957C6.84107 3 7.65697 3 9.28876 3H14.7113C16.3431 3 17.159 3 17.9572 3.5957C18.7554 4.19141 18.9501 4.84711 19.3394 6.15851C19.8142 7.75784 20.3261 10.009 20.6765 13.0113C21.0895 16.5497 21.2959 18.3189 20.1027 19.6594C18.9095 21 16.9758 21 13.1084 21H10.8916C7.02422 21 5.09052 21 3.89731 19.6594C2.70411 18.3189 2.91058 16.5497 3.32352 13.0113Z`,
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
      d: `M9 7C9 8.65685 10.3431 10 12 10C13.6569 10 15 8.65685 15 7`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `1`,
    },
  ],
];
var valueValue14: IconNode = [
  [
    `path`,
    {
      d: `M16 21C15.7668 18.0685 13.3422 15.7477 10.3085 15.5521L9.49999 15.5C9.21121 15.5076 8.94209 15.5178 8.68816 15.5298C5.68124 15.6723 3.23089 18.0974 3 21`,
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
      d: `M12.75 9.75C12.75 11.5449 11.2949 13 9.5 13C7.70508 13 6.25 11.5449 6.25 9.75C6.25 7.95507 7.70508 6.5 9.5 6.5C11.2949 6.5 12.75 7.95507 12.75 9.75Z`,
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
      d: `M21 17.501C20.7709 14.6314 18.4541 12.2748 15.5 11.9961`,
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
      d: `M15.9877 9C16.8965 8.42434 17.5001 7.40788 17.5001 6.25C17.5001 4.45507 16.0496 3 14.2602 3C13.3811 3 12.5838 3.35121 12.0001 3.92139`,
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
      d: `M4 18.6458V8.05426C4 5.20025 4 3.77325 4.87868 2.88663C5.75736 2 7.17157 2 10 2H14C16.8284 2 18.2426 2 19.1213 2.88663C20 3.77325 20 5.20025 20 8.05426V18.6458C20 20.1575 20 20.9133 19.538 21.2108C18.7831 21.6971 17.6161 20.6774 17.0291 20.3073C16.5441 20.0014 16.3017 19.8485 16.0325 19.8397C15.7417 19.8301 15.4949 19.9768 14.9709 20.3073L13.06 21.5124C12.5445 21.8374 12.2868 22 12 22C11.7132 22 11.4555 21.8374 10.94 21.5124L9.02913 20.3073C8.54415 20.0014 8.30166 19.8485 8.03253 19.8397C7.74172 19.8301 7.49493 19.9768 6.97087 20.3073C6.38395 20.6774 5.21687 21.6971 4.46195 21.2108C4 20.9133 4 20.1575 4 18.6458Z`,
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
      d: `M11 11H8`,
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
      d: `M14 7L8 7`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `2`,
    },
  ],
];
var valueValue2: IconNode = [
  [
    `path`,
    {
      d: `M3.50002 10V15C3.50002 17.8284 3.50002 19.2426 4.37869 20.1213C5.25737 21 6.67159 21 9.50002 21H14.5C17.3284 21 18.7427 21 19.6213 20.1213C20.5 19.2426 20.5 17.8284 20.5 15V10`,
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
      d: `M17 7.50184C17 8.88255 15.8807 9.99997 14.5 9.99997C13.1193 9.99997 12 8.88068 12 7.49997C12 8.88068 10.8807 9.99997 9.50002 9.99997C8.1193 9.99997 7.00002 8.88068 7.00002 7.49997C7.00002 8.88068 5.82655 9.99997 4.37901 9.99997C3.59984 9.99997 2.90008 9.67567 2.42 9.16087C1.59462 8.2758 2.12561 6.97403 2.81448 5.98842L3.20202 5.45851C4.08386 4.2527 4.52478 3.6498 5.16493 3.32494C5.80508 3.00008 6.55201 3.00018 8.04587 3.00038L15.9551 3.00143C17.4485 3.00163 18.1952 3.00173 18.8351 3.32658C19.475 3.65143 19.9158 4.25414 20.7974 5.45957L21.1855 5.99029C21.8744 6.97589 22.4054 8.27766 21.58 9.16273C21.0999 9.67754 20.4002 10.0018 19.621 10.0018C18.1734 10.0018 17 8.88255 17 7.50184Z`,
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
      d: `M14.9971 17C14.3133 17.6072 13.2247 18 11.9985 18C10.7723 18 9.68376 17.6072 9 17`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `2`,
    },
  ],
];
var valueValue3: IconNode = [
  [
    `path`,
    {
      d: `M14 3H5C3.89543 3 3 3.89543 3 5C3 6.10457 3.89543 7 5 7H18C18 6.07003 18 5.60504 17.8978 5.22354C17.6204 4.18827 16.8117 3.37962 15.7765 3.10222C15.395 3 14.93 3 14 3Z`,
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
      d: `M3 5V15C3 17.8284 3 19.2426 3.87868 20.1213C4.75736 21 6.17157 21 9 21H15C17.8284 21 19.2426 21 20.1213 20.1213C21 19.2426 21 17.8284 21 15V13C21 10.1716 21 8.75736 20.1213 7.87868C19.2426 7 17.8284 7 15 7H7`,
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
      d: `M21 12H19C18.535 12 18.3025 12 18.1118 12.0511C17.5941 12.1898 17.1898 12.5941 17.0511 13.1118C17 13.3025 17 13.535 17 14C17 14.465 17 14.6975 17.0511 14.8882C17.1898 15.4059 17.5941 15.8102 18.1118 15.9489C18.3025 16 18.535 16 19 16H21`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `2`,
    },
  ],
];
var ValueValue = [
  {
    label: `Home`,
    icon: valueValue11,
  },
  {
    label: `Revenue`,
    icon: valueValue8,
  },
  {
    label: `Invoices`,
    icon: valueValue,
    count: 12,
  },
  {
    label: `Payouts`,
    icon: valueValue3,
  },
  {
    label: `Customers`,
    icon: valueValue14,
  },
];
var ValueValue2 = [
  {
    label: `Channels`,
    items: [
      {
        label: `Online store`,
        icon: valueValue2,
      },
      {
        label: `Marketplace`,
        icon: valueValue13,
      },
      {
        label: `Wholesale`,
        icon: valueValue3,
      },
      {
        label: `Subscriptions`,
        icon: valueValue12,
      },
    ],
  },
];
var valueValue4 = [`Mar 3`, `Mar 4`, `Mar 5`, `Mar 6`, `Mar 7`, `Mar 8`, `Mar 9`];
var ValueValue3 = [
  `Mon, Mar 3`,
  `Tue, Mar 4`,
  `Wed, Mar 5`,
  `Thu, Mar 6`,
  `Fri, Mar 7`,
  `Sat, Mar 8`,
  `Sun, Mar 9`,
];
var ValueValue4 = [
  {
    label: `Organic`,
    color: `#2f6bff`,
    values: [4200, 4700, 3900, 4600, 5400, 5100, 5900],
  },
  {
    label: `Paid ads`,
    color: `#ec4899`,
    values: [3600, 3300, 4400, 4800, 4e3, 4500, 4200],
  },
  {
    label: `Referral`,
    color: `#8b5cf6`,
    values: [1800, 2300, 2e3, 1500, 2400, 2200, 2700],
  },
  {
    label: `Email`,
    color: `#14b8a6`,
    values: [1200, 1100, 1700, 2100, 1600, 1300, 1500],
  },
];
var ValueValue5 = (e: number) => (e >= 1e3 ? `$${+(e / 1e3).toFixed(1)}k` : `$${Math.round(e)}`);
var ValueValue6 = (e: number[], t: number[]) => [
  {
    label: `This week`,
    color: `#2f6bff`,
    values: e,
  },
  {
    label: `Last week`,
    color: `#a5c0ff`,
    values: t,
  },
];
var valueValue5 = ValueValue6(
  [1820, 2140, 1960, 2480, 2710, 2390, 2950],
  [1650, 1720, 1880, 1790, 2010, 1940, 2100],
);
var ValueValue7 = ValueValue6(
  [118, 124, 121, 132, 129, 137, 141],
  [112, 115, 119, 117, 121, 120, 124],
);
var valueValue6 = [
  {
    label: `Gross revenue`,
    value: `$96,412`,
    delta: `+12.5%`,
    bars: [5, 7, 6, 8, 7, 9, 10],
  },
  {
    label: `Active customers`,
    value: `2,847`,
    delta: `+8.2%`,
    bars: [6, 6, 7, 7, 8, 8, 9],
  },
  {
    label: `Conversion`,
    value: `3.24%`,
    delta: `+0.4%`,
    bars: [7, 5, 6, 8, 6, 7, 8],
  },
  {
    label: `Refund rate`,
    value: `1.8%`,
    delta: `-0.3%`,
    bars: [9, 8, 8, 6, 7, 5, 4],
  },
];
var ValueValue8 = [
  {
    label: `Gross sales`,
    value: `$104,210`,
    spark: [3, 5, 4, 6, 5, 7, 8],
  },
  {
    label: `Discounts`,
    value: `−$4,180`,
    spark: [4, 3, 5, 4, 3, 4, 3],
    tone: `down`,
  },
  {
    label: `Refunds`,
    value: `−$1,734`,
    spark: [5, 4, 4, 3, 3, 2, 2],
    tone: `down`,
  },
  {
    label: `Shipping`,
    value: `$2,940`,
    spark: [2, 3, 3, 4, 3, 4, 5],
  },
  {
    label: `Taxes`,
    value: `$8,316`,
    spark: [4, 4, 4, 4, 4, 4, 4],
    tone: `flat`,
  },
  {
    label: `Net revenue`,
    value: `$96,412`,
    spark: [3, 4, 4, 5, 6, 6, 8],
  },
];
var ValueValue9 = [
  {
    label: `Annual plan`,
    value: `$38,400`,
    share: 100,
  },
  {
    label: `Team seats`,
    value: `$24,150`,
    share: 63,
  },
  {
    label: `Monthly plan`,
    value: `$18,920`,
    share: 49,
  },
  {
    label: `Add-ons`,
    value: `$9,640`,
    share: 25,
  },
];
function ValueValue10(e: string, t: number) {
  return e === `Gross revenue`
    ? valueValue7(96412 * t)
    : e === `Active customers`
      ? Math.round(2847 * Math.sqrt(t)).toLocaleString(`en-US`)
      : e === `Conversion`
        ? `${(3.24 + (t - 1) * 0.012).toFixed(2)}%`
        : e === `Refund rate`
          ? `${(1.8 + (t - 1) * 0.008).toFixed(1)}%`
          : ``;
}
function ValueValue11({ values: values, tone = `up` }: { values: number[]; tone?: string }) {
  let n = Math.max(...values),
    r = Math.min(...values),
    i = values
      .map(
        (i: number, a: number) =>
          `${(a / (values.length - 1)) * 40},${tone === `flat` ? 7 : 13 - ((i - r) / (n - r || 1)) * 12}`,
      )
      .join(` `);
  return (
    <svg className={`ui-as-rev__spark`} data-tone={tone} viewBox={`0 0 40 14`} aria-hidden={`true`}>
      <polyline points={i} />
    </svg>
  );
}
var ValueValue12 = [
  {
    value: `7d`,
    label: `Last 7 days`,
  },
  {
    value: `30d`,
    label: `Last 30 days`,
  },
  {
    value: `90d`,
    label: `Last 90 days`,
  },
];
var ValueValue13: Record<string, { labels: string[]; factor: number }> = {
  "7d": {
    labels: valueValue4,
    factor: 1,
  },
  "30d": {
    labels: [`Feb 9`, `Feb 14`, `Feb 19`, `Feb 24`, `Mar 1`, `Mar 5`, `Mar 9`],
    factor: 4.3,
  },
  "90d": {
    labels: [`Dec 10`, `Dec 25`, `Jan 9`, `Jan 24`, `Feb 8`, `Feb 23`, `Mar 9`],
    factor: 12.9,
  },
};
var ValueValue14 = (e: { values: number[] }[], t: string) =>
  e.map(
    (
      e: {
        values: number[];
      },
      n: number,
    ) => ({
      ...e,
      values: e.values.map((e: number, r: number) =>
        Math.round(
          e * ValueValue13[t].factor * (t === `7d` ? 1 : 1 + 0.09 * Math.sin(r * 1.7 + n)),
        ),
      ),
    }),
  );
var valueValue7 = (e: number) => `$` + Math.round(e).toLocaleString(`en-US`);
function Analytics(e: AppShellProps) {
  let [t, n] = React.useState(`7d`),
    [r, p] = useToast(),
    m = ValueValue13[t].factor,
    h = ValueValue13[t].labels,
    g = t === `7d` ? ValueValue3 : h,
    _ = ValueValue14(ValueValue4, t),
    v = (e: number) => valueValue7(e * m);
  return (
    <AppShell active={`Revenue`} nav={ValueValue} groups={ValueValue2} {...e}>
      <style href={`ui-screen-analytics`} precedence={`default`}>
        {ValueValue15}
      </style>
      <div className={`ui-as-rev`}>
        <header className={`ui-as-rev__head`}>
          <h1>
            <Icon icon={valueValue8} size={17} />
            {`Revenue`}
          </h1>
          <div className={`ui-as-rev__actions`}>
            <SelectMenu
              value={t}
              options={ValueValue12}
              onChange={n}
              icon={valueValue9}
              className={`ui-as-rev__period`}
            />
            <Button
              variant={`secondary`}
              size={`sm`}
              icon={<Icon icon={valueValue10} size={14} />}
            >{`Export`}</Button>
            <Button size={`sm`} onClick={() => p(`Saved to Reports`)}>{`Save as report`}</Button>
          </div>
        </header>
        <div className={`ui-as-rev__content`} key={t}>
          <div className={`ui-as-rev__stats`}>
            {valueValue6.map((e, t) => (
              <div
                className={`ui-as-rev__card ui-as-rev__stat ui-as-rise`}
                style={
                  {
                    "--i": t,
                  } as React.CSSProperties
                }
                key={e.label}
              >
                <span className={`ui-as-rev__cap`}>{e.label}</span>
                <div className={`ui-as-rev__stat-row`}>
                  <strong>
                    {ValueValue10(e.label, m) ?? e.value}
                    <em>{e.delta}</em>
                  </strong>
                  <span className={`ui-as-rev__minibars`} aria-hidden={`true`}>
                    {e.bars.map((e, t) => (
                      <i
                        style={{
                          height: `${e * 10}%`,
                        }}
                        key={t}
                      />
                    ))}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className={`ui-as-rev__row ui-as-rev__row--main`}>
            <KPIChart
              className={`ui-as-rev__chart ui-as-rev__chart--tall`}
              title={`Revenue by channel`}
              value={ValueValue5(96400 * m)}
              delta={Math.round(7900 * m)}
              format={ValueValue5}
              labels={h}
              tooltipLabels={g}
              series={_}
              footer={`Top 4 channels`}
            />
            <div className={`ui-as-rev__card ui-as-rev__breakdown`}>
              <span className={`ui-as-rev__cap`}>{`Revenue breakdown`}</span>
              <ul>
                {ValueValue8.map((e) => (
                  <li key={e.label}>
                    <span>{e.label}</span>
                    <b>
                      {(e.value.startsWith(`−`) ? `−` : ``) + v(+e.value.replace(/[^\d]/g, ``))}
                    </b>
                    <ValueValue11 values={e.spark} tone={e.tone} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className={`ui-as-rev__row ui-as-rev__row--3`}>
            <div className={`ui-as-rev__card ui-as-rev__products`}>
              <span className={`ui-as-rev__cap`}>{`Top products`}</span>
              {ValueValue9.map((e) => (
                <div className={`ui-as-rev__product`} key={e.label}>
                  <span>
                    {e.label}
                    <b>{v(+e.value.replace(/[^\d]/g, ``))}</b>
                  </span>
                  <i
                    style={{
                      width: `${e.share}%`,
                    }}
                  />
                </div>
              ))}
            </div>
            <KPIChart
              className={`ui-as-rev__chart`}
              title={`Sessions over time`}
              value={`${+(16.4 * m).toFixed(1)}k`}
              delta={Math.round(2340 * m)}
              labels={h}
              tooltipLabels={g}
              series={ValueValue14(valueValue5, t)}
              footer={t === `7d` ? `This week vs. last week` : `This period vs. the one before`}
            />
            <KPIChart
              className={`ui-as-rev__chart`}
              title={`Average order value`}
              value={`$141`}
              delta={17}
              format={(e) => `$${Math.round(e)}`}
              labels={h}
              tooltipLabels={g}
              series={ValueValue7}
              footer={t === `7d` ? `This week vs. last week` : `This period vs. the one before`}
            />
          </div>
        </div>
      </div>
      {r}
    </AppShell>
  );
}
var ValueValue15 = `
/* Revenue dashboard: a header, then rows of white cards on the panel */
.ui-as-rev { display: flex; flex-direction: column; min-height: 100%; }
.ui-as-rev__head { display: flex; flex: none; align-items: center; justify-content: space-between; height: 60px; padding: 0 16px 0 24px; }
.ui-as-rev__head h1 { display: flex; align-items: center; gap: 8px; margin: 0; font-size: 16px; font-weight: 500; color: var(--ink); }
.ui-as-rev__actions { display: flex; align-items: center; gap: 6px; }
.ui-as-rev__period { border-radius: 9px; }

.ui-as-rev__content { display: flex; flex: 1; flex-direction: column; gap: 12px; padding: 0 16px 16px; }
.ui-as-rev__card {
  padding: 14px 16px;
  border-radius: 14px;
  background: var(--card);
  box-shadow: 0 0 0 1px var(--line), var(--shadow);
}
/* Card titles with a dotted underline – a hint that there is an explanation */
.ui-as-rev__cap {
  align-self: flex-start;
  font-size: 13px;
  color: var(--muted);
  text-decoration: underline dotted var(--faint);
  text-underline-offset: 3px;
}

.ui-as-rev__stats { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 12px; }
.ui-as-rev__stat { display: flex; flex-direction: column; gap: 14px; }
.ui-as-rev__stat-row { display: flex; align-items: flex-end; justify-content: space-between; }
.ui-as-rev__stat strong {
  display: flex;
  align-items: baseline;
  gap: 8px;
  font-size: 22px;
  font-weight: 500;
  letter-spacing: -0.02em;
  color: var(--ink);
  font-variant-numeric: tabular-nums;
}
.ui-as-rev__stat em { font-size: 12px; font-style: normal; font-weight: 500; letter-spacing: 0; color: #16a34a; }
.ui-as-rev__minibars { display: flex; align-items: flex-end; gap: 3px; height: 26px; }
.ui-as-rev__minibars i { width: 5px; border-radius: 2px; background: var(--line); }
.ui-as-rev__minibars i:last-child { background: var(--faint); }

.ui-as-rev__row { display: grid; grid-template-columns: minmax(0, 1fr) 340px; gap: 12px; align-items: stretch; }
/* The revenue chart takes the spare height; the three cards below keep their own */
.ui-as-rev__row--main { flex: 1; }
.ui-as-rev__row--3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }

/* Library charts flat, with the same edge as the other cards */
.ui-as-rev .ui-as-rev__chart.ui-kpi {
  --ui-kpi-shadow: 0 0 0 1px var(--line), var(--shadow);
  width: 100%;
  max-width: none;
  border: 0;
  border-radius: 14px;
}

/* Its plot grows with the card */
.ui-as-rev .ui-as-rev__chart--tall.ui-kpi { display: flex; flex-direction: column; }
.ui-as-rev .ui-as-rev__chart--tall .ui-kpi__chart { flex: 1; grid-template-rows: minmax(116px, 1fr) 20px; }

.ui-as-rev__breakdown { display: flex; flex-direction: column; }
.ui-as-rev__breakdown ul { display: flex; flex-direction: column; margin: 12px -6px 0; padding: 0; list-style: none; }
.ui-as-rev__breakdown li {
  display: grid;
  grid-template-columns: 1fr auto 40px;
  align-items: center;
  gap: 12px;
  height: 38px;
  padding: 0 8px;
  border-radius: 8px;
  font-size: 13.5px;
}
.ui-as-rev__breakdown li:nth-child(even) { background: var(--chip); }
.ui-as-rev__breakdown li span { color: var(--muted); }
.ui-as-rev__breakdown li b { font-weight: 500; color: var(--ink); font-variant-numeric: tabular-nums; }
.ui-as-rev__spark { width: 40px; height: 14px; overflow: visible; }
.ui-as-rev__spark polyline { fill: none; stroke-width: 1.5; stroke-linecap: round; stroke-linejoin: round; vector-effect: non-scaling-stroke; }
.ui-as-rev__spark[data-tone="up"] polyline { stroke: #16a34a; }
.ui-as-rev__spark[data-tone="down"] polyline { stroke: #dc2626; }
.ui-as-rev__spark[data-tone="flat"] polyline { stroke: var(--faint); }

.ui-as-rev__products { display: flex; flex-direction: column; gap: 14px; }
.ui-as-rev__product { display: flex; flex-direction: column; gap: 7px; }
.ui-as-rev__product span { display: flex; justify-content: space-between; font-size: 13.5px; color: var(--muted); }
.ui-as-rev__product b { font-weight: 500; color: var(--ink); font-variant-numeric: tabular-nums; }
.ui-as-rev__product i { display: block; height: 6px; border-radius: 3px; background: #2f6bff; }

/* Room for the sidebar icon while the sidebar is collapsed */
.ui-as-rev__head { transition: padding-left 420ms var(--ease); }
.ui-as-app[data-collapsed] .ui-as-rev__head { padding-left: 52px; }

/* Narrow panels: stat cards 4 → 2, the rows stack */
@container ui-as-main (max-width: 900px) {
  .ui-as-rev__row { grid-template-columns: minmax(0, 1fr); }
  .ui-as-rev__row--3 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .ui-as-rev__row--3 > .ui-as-rev__products { grid-column: 1 / -1; }
}
@container ui-as-main (max-width: 820px) {
  .ui-as-rev__stats { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@container ui-as-main (max-width: 560px) {
  .ui-as-rev__row--3 { grid-template-columns: minmax(0, 1fr); }
  .ui-as-rev__stats { gap: 8px; }
  .ui-as-rev__stat { gap: 10px; padding: 12px; }
  .ui-as-rev__stat strong { flex-wrap: wrap; gap: 0 6px; font-size: 19px; }
  .ui-as-rev__minibars { display: none; }
}
@container ui-as (max-width: 900px) {
  .ui-as-rev__head { padding-left: 52px; }
}
@container ui-as (max-width: 600px) {
  /* Title next to the sidebar icon, the actions on a row below */
  .ui-as-rev__head { flex-wrap: wrap; row-gap: 10px; height: auto; padding: 14px 8px 12px 52px; }
  .ui-as-rev__actions { flex-wrap: wrap; gap: 6px 4px; width: calc(100% + 44px); margin-left: -44px; }
  .ui-as-rev__actions > :last-child { margin-left: auto; }
  .ui-as-rev__actions button { white-space: nowrap; }
  .ui-as-rev__content { gap: 8px; padding: 0 8px 8px; }
}
`;
function AnalyticsDemo2() {
  return (
    <PreviewFrame>
      <Analytics onNavigate={navigateScreen} />
    </PreviewFrame>
  );
}
function FullScreen(props: {}) {
  return (
    <ScreenFrameModeContext.Provider value={true}>
      <AnalyticsDemo2 {...props} />
    </ScreenFrameModeContext.Provider>
  );
}
const demoStyles = "";
function AnalyticsDemo(props: {}) {
  return (
    <>
      <style href="plico-demo-analytics" precedence="default">
        {demoStyles}
      </style>
      <AnalyticsDemo2 {...props} />
    </>
  );
}
export { Analytics };
export { AnalyticsDemo };
export { Analytics as Component };
export { AnalyticsDemo as Demo };
export { FullScreen };
export default Analytics;

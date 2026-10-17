"use client";

import * as React from "react";
type BillingMember = {
  id: string;
  name: string;
  email: string;
  role: string;
  invited?: boolean;
};
interface UsageDemoData {
  used: UsageRow[];
  limits: UsageLimit[];
  days: (date: Date) => Array<{
    label: string;
    value: number | null;
  }>;
}
type UsageLimit = NonNullable<UsageMeterProps["limits"]>[number];
interface UsageRow {
  label: string;
  value: number;
  color?: string;
  leaving?: boolean;
}
type SegmentedControlProps<T extends string = string> = {
  options: SegmentOption<T>[];
  value?: T;
  defaultValue?: T;
  onChange?: (value: T) => void;
  size?: "sm" | "md" | "lg";
  variant?: "tray" | "underline";
  fullWidth?: boolean;
  kind?: "radio" | "tabs";
  disabled?: boolean;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  className?: string;
};
type SegmentOption<T extends string = string> = {
  value: T;
  label?: React.ReactNode;
  icon?: React.ReactNode;
  count?: number | string;
  badge?: React.ReactNode;
  disabled?: boolean;
  ariaLabel?: string;
  controls?: string;
};
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
interface UsageMeterProps {
  total: number;
  used: {
    label: string;
    value: number;
    color?: string;
  }[];
  limits?: Array<{
    label: string;
    used: number;
    total?: number | null;
    unit?: string;
    decimals?: number;
  }>;
  periods?: {
    id: string;
    label: string;
  }[];
  period?: string;
  defaultPeriod?: string;
  onPeriodChange?: (id: string) => void;
  resetAt?: Date | string | number;
  daily?: {
    label: string;
    value: number | null;
  }[];
  title?: string;
  plan?: string;
  unit?: string;
  warnAt?: number;
  upgradeLabel?: string;
  topUpLabel?: string;
  className?: string;
  onUpgrade?: (state: "ok" | "warn" | "limit") => void;
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
interface SettingsBillingProps extends AppShellProps {
  defaultTab?: "General" | "Members" | "Billing" | "API keys";
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
function SegmentedControl({
  options: options,
  value: value,
  defaultValue: defaultValue,
  onChange: onChange,
  size = `md`,
  variant = `tray`,
  fullWidth = false,
  kind = `radio`,
  disabled = false,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledby,
  className: className,
}: SegmentedControlProps) {
  let [internalValue, setInternalValue] = React.useState(
      () => defaultValue ?? options.find((e) => !e.disabled)?.value,
    ),
    activeValue = value === void 0 ? internalValue : value,
    rootRef = React.useRef<HTMLDivElement | null>(null),
    scrollerRef = React.useRef<HTMLDivElement | null>(null),
    trackRef = React.useRef<HTMLDivElement | null>(null),
    pillRef = React.useRef<HTMLSpanElement | null>(null),
    activeValueRef = React.useRef(activeValue);
  activeValueRef.current = activeValue;
  let movingRef = React.useRef(false),
    movementTimerRef = React.useRef(0),
    previousValueRef = React.useRef<string | undefined>(void 0),
    pointerRef = React.useRef<{
      id: number;
      touch: boolean;
      drag: boolean;
      x: number;
      moved: boolean;
    } | null>(null),
    optionNodes = () =>
      Array.from(trackRef.current?.querySelectorAll<HTMLElement>(`:scope > .ui-seg__opt`) ?? []),
    selectedIndex = options.findIndex((e) => e.value === activeValue),
    tabIndex = selectedIndex >= 0 ? selectedIndex : options.findIndex((e) => !e.disabled),
    changeValue = (n: string) => {
      let r = options.find((e) => e.value === n);
      !r ||
        r.disabled ||
        disabled ||
        n === activeValueRef.current ||
        ((activeValueRef.current = n), value === void 0 && setInternalValue(n), onChange?.(n));
    },
    measureOptions = () => {
      let e = optionNodes();
      if (!e.length || !trackRef.current) return;
      let t = getComputedStyle(e[0]),
        n = parseFloat(t.paddingLeft) + parseFloat(t.paddingRight),
        r = e.map((e) => (e.firstElementChild as HTMLElement).offsetWidth + n);
      fullWidth
        ? (trackRef.current.style.setProperty(`--ui-seg-min`, `${Math.max(...r)}px`),
          e.forEach((e) => (e.style.width = ``)))
        : e.forEach((e, t) => (e.style.width = `${r[t]}px`));
    },
    positionSegmentPill = (e: boolean) => {
      let t = trackRef.current,
        n = pillRef.current;
      if (!t || !n) return;
      let r = t.querySelector<HTMLElement>(`:scope > .ui-seg__opt[data-active]`);
      if (!r || !r.offsetWidth) {
        n.style.opacity = `0`;
        return;
      }
      let i = r.offsetLeft,
        a = r.offsetWidth;
      if (variant === `underline`) {
        let e = r.firstElementChild as HTMLElement;
        ((i += e.offsetLeft), (a = e.offsetWidth));
      }
      let o = !n.dataset.ready || (!e && !movingRef.current),
        s = parseFloat(n.style.left) || 0;
      (!o && i !== s && (n.dataset.dir = i > s ? `right` : `left`),
        o && (n.style.transition = `none`),
        (n.style.opacity = `1`),
        (n.style.left = `${i}px`),
        (n.style.right = `${t.clientWidth - i - a}px`),
        o && ((n.dataset.ready = `1`), n.offsetWidth, (n.style.transition = ``)));
    },
    updateOverflow = () => {
      let e = scrollerRef.current;
      if (!e) return;
      let t = e.scrollWidth - e.clientWidth;
      (rootRef.current?.toggleAttribute(`data-overflow`, t > 1),
        e.style.setProperty(`--ui-seg-fade-l`, e.scrollLeft > 1 ? `24px` : `0px`),
        e.style.setProperty(`--ui-seg-fade-r`, e.scrollLeft < t - 1 ? `24px` : `0px`));
    },
    scrollSelected = (e: boolean) => {
      let t = scrollerRef.current,
        n = trackRef.current,
        r = n?.querySelector<HTMLElement>(`:scope > .ui-seg__opt[data-active]`);
      if (!t || !n || !r || t.scrollWidth <= t.clientWidth + 1) return;
      let i = n.offsetLeft + r.offsetLeft - (t.clientWidth - r.offsetWidth) / 2;
      t.scrollTo({
        left: Math.max(0, i),
        behavior: e ? `smooth` : `auto`,
      });
    };
  (React.useLayoutEffect(() => {
    let e = trackRef.current,
      t = scrollerRef.current;
    if (!e || !t) return;
    let n = () => {
      (measureOptions(), positionSegmentPill(false), updateOverflow());
    };
    n();
    let r = requestAnimationFrame(() => rootRef.current?.setAttribute(`data-ready`, ``)),
      i = 0,
      a = new ResizeObserver(() => {
        (cancelAnimationFrame(i), (i = requestAnimationFrame(n)));
      });
    return (
      a.observe(t),
      a.observe(e),
      e
        .querySelectorAll<HTMLElement>(`.ui-seg__opt, .ui-seg__content`)
        .forEach((e) => a.observe(e)),
      () => {
        (a.disconnect(), cancelAnimationFrame(i), cancelAnimationFrame(r));
      }
    );
  }, [options.length, fullWidth, variant, size]),
    React.useLayoutEffect(() => {
      if (previousValueRef.current === activeValue) return;
      let e = previousValueRef.current === void 0;
      ((previousValueRef.current = activeValue),
        e ||
          ((movingRef.current = true),
          clearTimeout(movementTimerRef.current),
          (movementTimerRef.current = window.setTimeout(() => (movingRef.current = false), 440))),
        positionSegmentPill(!e),
        scrollSelected(!e));
      let t = trackRef.current;
      !e &&
        t &&
        t.contains(document.activeElement) &&
        optionNodes()[selectedIndex]?.focus({
          preventScroll: true,
        });
    }, [activeValue]),
    React.useEffect(() => () => clearTimeout(movementTimerRef.current), []));
  let handleKeyDown = (t: React.KeyboardEvent<HTMLDivElement>) => {
      let n = options.filter((e) => !e.disabled);
      if (!n.length || disabled) return;
      let r = kind === `radio` ? [`ArrowLeft`, `ArrowUp`] : [`ArrowLeft`],
        i = kind === `radio` ? [`ArrowRight`, `ArrowDown`] : [`ArrowRight`],
        a = n.findIndex((e) => e.value === activeValueRef.current),
        o;
      (r.includes(t.key)
        ? (o = n[(a - 1 + n.length) % n.length])
        : i.includes(t.key)
          ? (o = n[(a + 1) % n.length])
          : t.key === `Home`
            ? (o = n[0])
            : t.key === `End` && (o = n[n.length - 1]),
        o &&
          (t.preventDefault(), changeValue(o.value), optionNodes()[options.indexOf(o)]?.focus()));
    },
    nearestOption = (t: number) => {
      let n = -1,
        r = 1 / 0;
      return (
        optionNodes().forEach((e, i) => {
          let a = e.getBoundingClientRect(),
            o = t < a.left ? a.left - t : t > a.right ? t - a.right : 0;
          o < r && ((r = o), (n = i));
        }),
        options[n]
      );
    },
    clearPointer = () => {
      ((pointerRef.current = null), rootRef.current?.removeAttribute(`data-pressed`));
    },
    handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
      if (disabled || e.button !== 0) return;
      let t = nearestOption(e.clientX);
      if (!t || t.disabled) return;
      let n = e.pointerType === `touch`,
        r = !n || t.value === activeValueRef.current;
      if (
        ((pointerRef.current = {
          id: e.pointerId,
          touch: n,
          drag: r,
          x: e.clientX,
          moved: false,
        }),
        r && rootRef.current?.setAttribute(`data-pressed`, ``),
        !n)
      ) {
        changeValue(t.value);
        try {
          e.currentTarget.setPointerCapture(e.pointerId);
        } catch {}
      }
    },
    handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
      let t = pointerRef.current;
      if (
        !t ||
        t.id !== e.pointerId ||
        (!t.moved && Math.abs(e.clientX - t.x) < (t.touch ? 8 : 3)) ||
        ((t.moved = true), !t.drag)
      )
        return;
      let n = nearestOption(e.clientX);
      n && !n.disabled && changeValue(n.value);
    },
    handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
      let t = pointerRef.current;
      if (t && t.id === e.pointerId) {
        if (t.touch && !t.moved) {
          let t = nearestOption(e.clientX);
          t && changeValue(t.value);
        }
        clearPointer();
      }
    },
    isTabs = kind === `tabs`;
  return (
    <div
      ref={rootRef}
      className={[`ui-seg`, className].filter(Boolean).join(` `)}
      data-size={size}
      data-variant={variant}
      data-full={fullWidth || void 0}
      data-disabled={disabled || void 0}
    >
      <style href={`ui-segmented-control`} precedence={`default`}>
        {segmentedControlStyles}
      </style>
      <div ref={scrollerRef} className={`ui-seg__scroller`} onScroll={updateOverflow}>
        <div
          ref={trackRef}
          className={`ui-seg__track`}
          role={isTabs ? `tablist` : `radiogroup`}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledby}
          aria-disabled={disabled || void 0}
          aria-orientation={isTabs ? `horizontal` : void 0}
          onKeyDown={handleKeyDown}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={clearPointer}
          onLostPointerCapture={clearPointer}
        >
          <span ref={pillRef} className={`ui-seg__pill`} aria-hidden={`true`} />
          {options.map((e, t) => {
            let n = t === selectedIndex;
            return (
              <button
                type={`button`}
                className={`ui-seg__opt`}
                role={isTabs ? `tab` : `radio`}
                aria-checked={isTabs ? void 0 : n}
                aria-selected={isTabs ? n : void 0}
                aria-controls={isTabs ? e.controls : void 0}
                aria-label={e.ariaLabel}
                data-active={n || void 0}
                disabled={e.disabled || disabled}
                tabIndex={t === tabIndex ? 0 : -1}
                onClick={() => changeValue(e.value)}
                key={e.value}
              >
                <span className={`ui-seg__content`}>
                  {e.icon && <span className={`ui-seg__icon`}>{e.icon}</span>}
                  {e.label != null && (
                    <span className={`ui-seg__label`}>
                      <span className={`ui-seg__text`}>{e.label}</span>
                      <span className={`ui-seg__text ui-seg__text-bold`} aria-hidden={`true`}>
                        {e.label}
                      </span>
                    </span>
                  )}
                  {e.count != null && (
                    <span className={`ui-seg__count`} key={String(e.count)}>
                      {e.count}
                    </span>
                  )}
                  {e.badge != null && <span className={`ui-seg__badge`}>{e.badge}</span>}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
var segmentedControlStyles = `
/* Animatable custom properties: the equal segment width and the soft edges glide too */
@property --ui-seg-min { syntax: "<length>"; inherits: true; initial-value: 0px; }
@property --ui-seg-fade-l { syntax: "<length>"; inherits: false; initial-value: 0px; }
@property --ui-seg-fade-r { syntax: "<length>"; inherits: false; initial-value: 0px; }

.ui-seg {
  --ui-seg-tray: #f0f0f0;
  --ui-seg-pill: #ffffff;
  --ui-seg-line: #ececec;
  --ui-seg-ink: #171717;
  --ui-seg-text: #404040;
  --ui-seg-soft: #737373;
  --ui-seg-muted: #8f8f8f;
  --ui-seg-count: rgba(0, 0, 0, 0.06);
  --ui-seg-accent: #2f6bff;
  --ui-seg-accent-soft: rgba(47, 107, 255, 0.1);
  --ui-seg-pill-shadow: 0 0 0 0.5px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.08), 0 2px 8px -2px rgba(0, 0, 0, 0.06);
  --ui-seg-focus: rgba(23, 23, 23, 0.22);
  --ui-seg-ease: cubic-bezier(0.22, 1, 0.36, 1);
  /* Size: md */
  --ui-seg-h: 30px;
  --ui-seg-px: 12px;
  --ui-seg-fs: 13.5px;
  --ui-seg-r: 11px;
  --ui-seg-pad: 3px;
  --ui-seg-icon: 15px;
  --ui-seg-gap: 20px;
  box-sizing: border-box;
  display: inline-flex;
  max-width: 100%;
  min-width: 0;
  vertical-align: middle;
  border-radius: var(--ui-seg-r);
  background: var(--ui-seg-tray);
  font-family: "Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  font-size: var(--ui-seg-fs);
  line-height: 1;
  color: var(--ui-seg-soft);
  -webkit-font-smoothing: antialiased;
}
.ui-seg[data-size="sm"] { --ui-seg-h: 26px; --ui-seg-px: 10px; --ui-seg-fs: 12.5px; --ui-seg-r: 9px; --ui-seg-pad: 2px; --ui-seg-icon: 14px; --ui-seg-gap: 16px; }
.ui-seg[data-size="lg"] { --ui-seg-h: 36px; --ui-seg-px: 16px; --ui-seg-fs: 14px; --ui-seg-r: 13px; --ui-seg-pad: 4px; --ui-seg-icon: 16px; --ui-seg-gap: 24px; }
.ui-seg[data-full] { display: flex; width: 100%; }
.ui-seg[data-disabled] { opacity: 0.5; pointer-events: none; }
.ui-seg *, .ui-seg *::before, .ui-seg *::after { box-sizing: border-box; }
:where(.ui-seg) button { margin: 0; border: 0; background: none; font: inherit; color: inherit; cursor: pointer; }
:where(.ui-seg) svg { display: block; flex: none; }

/* Scrolls sideways only when it doesn't fit; the padding keeps focus rings from being cut off */
.ui-seg__scroller {
  position: relative;
  flex: 1;
  min-width: 0;
  overflow-x: auto;
  overflow-y: hidden;
  padding: var(--ui-seg-pad);
  border-radius: inherit;
  overscroll-behavior-x: contain;
  scrollbar-width: none;
  -webkit-mask-image: linear-gradient(to right, transparent, #000 var(--ui-seg-fade-l), #000 calc(100% - var(--ui-seg-fade-r)), transparent);
  mask-image: linear-gradient(to right, transparent, #000 var(--ui-seg-fade-l), #000 calc(100% - var(--ui-seg-fade-r)), transparent);
  transition: --ui-seg-fade-l 200ms ease, --ui-seg-fade-r 200ms ease;
}
.ui-seg__scroller::-webkit-scrollbar { display: none; }

.ui-seg__track {
  position: relative;
  display: flex;
  width: max-content;
  min-width: 100%;
  /* Horizontal drags move the pill; vertical ones still scroll the page */
  touch-action: pan-y;
  -webkit-user-select: none;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
}
/* When it scrolls, swipes scroll it instead of dragging the pill */
.ui-seg[data-overflow] .ui-seg__track { touch-action: pan-x pan-y; }
/* Equal segments, each as wide as the widest one needs */
.ui-seg[data-full] .ui-seg__track { display: grid; grid-auto-flow: column; grid-auto-columns: minmax(var(--ui-seg-min), 1fr); }
.ui-seg[data-ready] .ui-seg__track { transition: --ui-seg-min 320ms var(--ui-seg-ease); }

/* An option */
.ui-seg__opt {
  position: relative;
  z-index: 1;
  display: flex;
  flex: none;
  align-items: center;
  justify-content: center;
  height: var(--ui-seg-h);
  padding: 0 var(--ui-seg-px);
  overflow: clip;
  border-radius: calc(var(--ui-seg-r) - var(--ui-seg-pad));
  white-space: nowrap;
  transition: color 200ms ease;
}
.ui-seg[data-ready]:not([data-full]) .ui-seg__opt { transition: color 200ms ease, width 320ms var(--ui-seg-ease); }
.ui-seg__opt[data-active] { color: var(--ui-seg-ink); }
.ui-seg__opt:disabled { opacity: 0.4; cursor: not-allowed; }
.ui-seg__opt:focus-visible { outline: 2px solid var(--ui-seg-focus); outline-offset: 0; }
@media (hover: hover) {
  .ui-seg__opt:not([data-active]):not(:disabled):hover { color: var(--ui-seg-text); }
}

.ui-seg__content { display: inline-flex; flex: none; align-items: center; gap: 6px; }
.ui-seg__icon { display: grid; place-items: center; width: var(--ui-seg-icon); height: var(--ui-seg-icon); }
.ui-seg__icon svg { width: 100%; height: 100%; }

/* Regular and semibold copies of the label crossfade */
.ui-seg__label { display: grid; justify-items: center; }
.ui-seg__text { grid-area: 1 / 1; font-weight: 500; transition: opacity 200ms ease; }
.ui-seg__text-bold { font-weight: 600; opacity: 0; }
.ui-seg__opt[data-active] .ui-seg__text { opacity: 0; }
.ui-seg__opt[data-active] .ui-seg__text-bold { opacity: 1; }

.ui-seg__count {
  display: inline-grid;
  place-items: center;
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  border-radius: 9px;
  background: var(--ui-seg-count);
  font-size: 11px;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  color: var(--ui-seg-text);
  animation: ui-seg-in 260ms var(--ui-seg-ease) both;
}
.ui-seg[data-size="sm"] .ui-seg__count { min-width: 16px; height: 16px; padding: 0 4px; font-size: 10.5px; }
.ui-seg__badge {
  display: inline-flex;
  align-items: center;
  height: 18px;
  padding: 0 6px;
  border-radius: 6px;
  background: var(--ui-seg-accent-soft);
  font-size: 11px;
  font-weight: 500;
  color: var(--ui-seg-accent);
}

/* The indicator: left and right edges glide separately – the one facing the target leads, so it stretches and settles */
.ui-seg__pill {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 100%;
  z-index: 0;
  border-radius: calc(var(--ui-seg-r) - var(--ui-seg-pad));
  background: var(--ui-seg-pill);
  box-shadow: var(--ui-seg-pill-shadow);
  opacity: 0;
  pointer-events: none;
  transition: left 380ms var(--ui-seg-ease), right 380ms var(--ui-seg-ease), scale 200ms var(--ui-seg-ease), opacity 160ms ease;
}
.ui-seg__pill[data-dir="right"] { transition-duration: 400ms, 270ms, 200ms, 160ms; }
.ui-seg__pill[data-dir="left"] { transition-duration: 270ms, 400ms, 200ms, 160ms; }
/* Press feedback: the pill gives a little while held or dragged */
.ui-seg[data-pressed]:not([data-variant="underline"]) .ui-seg__pill { scale: 0.97; }

/* Underline variant: text tabs on a hairline */
.ui-seg[data-variant="underline"] { --ui-seg-px: 2px; border-radius: 0; background: none; box-shadow: inset 0 -1px 0 var(--ui-seg-line); }
.ui-seg[data-variant="underline"] .ui-seg__scroller { padding: 0; }
.ui-seg[data-variant="underline"]:not([data-full]) .ui-seg__track { gap: var(--ui-seg-gap); }
.ui-seg[data-variant="underline"][data-full] { --ui-seg-px: 10px; }
.ui-seg[data-variant="underline"] .ui-seg__opt { height: calc(var(--ui-seg-h) + 6px); border-radius: 6px; }
.ui-seg[data-variant="underline"] .ui-seg__opt:focus-visible { outline-offset: -2px; }
.ui-seg[data-variant="underline"] .ui-seg__pill { top: auto; height: 2px; border-radius: 2px 2px 0 0; background: var(--ui-seg-ink); box-shadow: none; }

@keyframes ui-seg-in { from { opacity: 0; transform: translateY(3px); filter: blur(2px); } to { opacity: 1; transform: none; filter: none; } }

/* Touch screens: every option at least 40px tall */
@media (hover: none) and (pointer: coarse) {
  .ui-seg[data-size] { --ui-seg-h: 40px; }
  .ui-seg[data-size="lg"] { --ui-seg-h: 44px; }
  .ui-seg[data-variant="underline"] .ui-seg__opt { height: var(--ui-seg-h); }
}
@media (prefers-reduced-motion: reduce) {
  .ui-seg *, .ui-seg *::before, .ui-seg *::after { animation: none !important; transition: none !important; }
}

/* Dark mode: follows a .dark class or data-theme="dark" on any ancestor, e.g. <html> */
:where(.dark, [data-theme="dark"]) .ui-seg {
  --ui-seg-tray: #111113;
  --ui-seg-pill: #26262a;
  --ui-seg-line: #2a2a2e;
  --ui-seg-ink: #ededed;
  --ui-seg-text: #c8c8cc;
  --ui-seg-soft: #8b8b92;
  --ui-seg-muted: #8b8b92;
  --ui-seg-count: rgba(255, 255, 255, 0.08);
  --ui-seg-accent: #6d8bff;
  --ui-seg-accent-soft: rgba(109, 139, 255, 0.14);
  --ui-seg-pill-shadow: 0 0 0 1px rgba(255, 255, 255, 0.06), 0 1px 2px rgba(0, 0, 0, 0.4);
  --ui-seg-focus: rgba(255, 255, 255, 0.3);
}
`;
var formatUsageNumber = (value: number | bigint, decimals: number = 0) =>
  new Intl.NumberFormat(`en-US`, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
var withUsageUnit = (value: string, unit: string | undefined) =>
  unit ? `${value} ${unit}` : value;
var resetDateFormatter = new Intl.DateTimeFormat(`en-US`, {
  month: `short`,
  day: `numeric`,
});
function resetCountdown(date: Date) {
  let days = Math.ceil((date.getTime() - Date.now()) / 864e5);
  return days <= 0 ? `Resets today` : days === 1 ? `Resets tomorrow` : `Resets in ${days} days`;
}
var categoryColors = [
  `var(--ui-um-c1)`,
  `var(--ui-um-c2)`,
  `var(--ui-um-c3)`,
  `var(--ui-um-c4)`,
  `var(--ui-um-c5)`,
];
var easeOutQuart = (progress: number) => 1 - (1 - progress) ** 4;
var prefersReducedMotion = () =>
  typeof window < `u` && window.matchMedia(`(prefers-reduced-motion: reduce)`).matches;
function useAnimatedValues(
  targets: Record<string, number>,
  initialDuration: number,
  updateDuration: number,
) {
  let [values, setValues] = React.useState(() =>
      Object.fromEntries(Object.keys(targets).map((e) => [e, 0])),
    ),
    currentRef = React.useRef(values),
    hasAnimatedRef = React.useRef(false),
    signature = JSON.stringify(targets);
  return (
    React.useEffect(() => {
      let e = JSON.parse(signature) as Record<string, number>,
        n = {
          ...currentRef.current,
        };
      if (prefersReducedMotion()) {
        ((currentRef.current = e), setValues(e));
        return;
      }
      let i = Object.values(e).some((e) => e !== 0),
        d = i && !hasAnimatedRef.current ? initialDuration : updateDuration;
      i && (hasAnimatedRef.current = true);
      let f = performance.now(),
        p = 0,
        m = (t: number) => {
          let r = Math.min(1, (t - f) / d),
            i = easeOutQuart(r),
            s: Record<string, number> = {};
          for (let t in e) s[t] = (n[t] ?? 0) + (e[t] - (n[t] ?? 0)) * i;
          ((currentRef.current = s), setValues(s), r < 1 && (p = requestAnimationFrame(m)));
        };
      return ((p = requestAnimationFrame(m)), () => cancelAnimationFrame(p));
    }, [signature]),
    (e: string | number) => values[e] ?? 0
  );
}
function positionPill(
  container: HTMLDivElement | null,
  pill: HTMLSpanElement | null,
  selector: string,
) {
  if (!container || !pill) return;
  let option = container.querySelector<HTMLElement>(selector);
  if (!option || !option.offsetWidth) {
    pill.style.opacity = `0`;
    return;
  }
  let firstPlacement = !pill.dataset.ready;
  (firstPlacement && (pill.style.transition = `none`),
    (pill.style.opacity = `1`),
    (pill.style.width = `${option.offsetWidth}px`),
    (pill.style.height = `${option.offsetHeight}px`),
    (pill.style.transform = `translate(${option.offsetLeft}px, ${option.offsetTop}px)`),
    firstPlacement && ((pill.dataset.ready = `1`), pill.offsetWidth, (pill.style.transition = ``)));
}
function mergeUsageRows(previousRows: UsageRow[], nextRows: UsageRow[]) {
  let merged = [...nextRows];
  return (
    previousRows.forEach((e, r) => {
      nextRows.some((t) => t.label === e.label) ||
        merged.splice(Math.min(r, merged.length), 0, {
          ...e,
          value: 0,
          leaving: true,
        });
    }),
    merged
  );
}
function UsageMeter({
  total: total,
  used: used,
  limits = [],
  periods: periods,
  period: period,
  defaultPeriod: defaultPeriod,
  onPeriodChange: onPeriodChange,
  resetAt: resetAt,
  daily: daily,
  onUpgrade: onUpgrade,
  title = `Usage`,
  plan: plan,
  unit = `credits`,
  warnAt = 0.8,
  upgradeLabel = `Upgrade`,
  topUpLabel = `Add credits`,
  className: className,
}: UsageMeterProps) {
  let instanceId = React.useId(),
    rootRef = React.useRef<HTMLElement | null>(null),
    cardRef = React.useRef<HTMLDivElement | null>(null),
    innerRef = React.useRef<HTMLDivElement | null>(null),
    periodRef = React.useRef<HTMLDivElement | null>(null),
    pillRef = React.useRef<HTMLSpanElement | null>(null),
    actionRef = React.useRef<HTMLButtonElement | null>(null),
    actionInnerRef = React.useRef<HTMLSpanElement | null>(null),
    [internalPeriod, setInternalPeriod] = React.useState(defaultPeriod ?? periods?.[0]?.id),
    activePeriod = period ?? internalPeriod,
    [visible, setVisible] = React.useState(false),
    [activeLabel, setActiveLabel] = React.useState<string | null>(null),
    [lastLabel, setLastLabel] = React.useState<string | null>(null),
    [activeDay, setActiveDay] = React.useState<number | null>(null),
    [announcement, setAnnouncement] = React.useState(``),
    colorsRef = React.useRef<Map<string, string>>(new Map()),
    getCategoryColor = (category: { label: string; value: number; color?: string | undefined }) =>
      category.color
        ? category.color
        : (colorsRef.current.has(category.label) ||
            colorsRef.current.set(
              category.label,
              categoryColors[colorsRef.current.size % categoryColors.length],
            ),
          colorsRef.current.get(category.label)!),
    coloredUsed = used.map((e) => ({
      ...e,
      color: getCategoryColor(e),
    })),
    [displayRows, setDisplayRows] = React.useState<UsageRow[]>(coloredUsed),
    rowsSignature = used.map((e) => `${e.label}:${e.value}:${e.color ?? ``}`).join(`|`),
    firstRowsRef = React.useRef(true);
  (React.useLayoutEffect(() => {
    if (firstRowsRef.current) {
      firstRowsRef.current = false;
      return;
    }
    setDisplayRows((e) =>
      mergeUsageRows(
        e.filter((e) => !e.leaving),
        coloredUsed,
      ),
    );
    let e = window.setTimeout(() => setDisplayRows((e) => e.filter((e) => !e.leaving)), 460);
    return () => clearTimeout(e);
  }, [rowsSignature]),
    React.useEffect(() => {
      let e = rootRef.current;
      if (!e || typeof IntersectionObserver > `u`) {
        setVisible(true);
        return;
      }
      let t = new IntersectionObserver(
        (e) => {
          e.some((e) => e.isIntersecting) && (setVisible(true), t.disconnect());
        },
        {
          threshold: 0.2,
        },
      );
      return (t.observe(e), () => t.disconnect());
    }, []));
  let usedTotal = used.reduce((e, t) => e + Math.max(0, t.value), 0),
    ratio = total > 0 ? usedTotal / total : 0,
    state: "ok" | "warn" | "limit" = ratio >= 1 ? `limit` : ratio >= warnAt ? `warn` : `ok`,
    barTotal = Math.max(total, usedTotal) || 1,
    targets: Record<string, number> = {
      used: usedTotal,
      left: Math.max(0, total - usedTotal),
      pct: ratio * 100,
    };
  if (
    (displayRows.forEach((e) => (targets[`r:${e.label}`] = e.leaving ? 0 : Math.max(0, e.value))),
    limits.forEach((e) => (targets[`l:${e.label}`] = e.used)),
    daily?.forEach((e, t) => (targets[`d:${t}`] = e.value ?? 0)),
    !visible)
  )
    for (let e in targets) targets[e] = 0;
  let animatedValue = useAnimatedValues(targets, 1200, 650),
    segmentOffset = 0,
    segments = displayRows.map((e) => {
      let t = (animatedValue(`r:${e.label}`) / barTotal) * 100,
        n = {
          ...e,
          left: segmentOffset,
          width: t,
        };
      return ((segmentOffset += t), n);
    }),
    activeRow = displayRows.find((e) => e.label === activeLabel && !e.leaving),
    lastRow = displayRows.find((e) => e.label === lastLabel),
    lastSegment = segments.find((e) => e.label === lastLabel),
    tipPercent = lastSegment
      ? Math.min(100, Math.max(0, lastSegment.left + lastSegment.width / 2))
      : 50,
    highlight = (label: string | null) => {
      (setActiveLabel(label), label && setLastLabel(label));
    },
    hitCategory = (event: React.PointerEvent<HTMLDivElement>) => {
      let rect = event.currentTarget.getBoundingClientRect(),
        percent = ((event.clientX - rect.left) / rect.width) * 100;
      return (
        segments.find(
          (e) => !e.leaving && e.width > 0 && percent >= e.left && percent <= e.left + e.width,
        )?.label ?? null
      );
    },
    handleBarKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (event) => {
      let categories = displayRows.filter((e) => !e.leaving && e.value > 0);
      if (!categories.length) return;
      let activeIndex = categories.findIndex((e) => e.label === activeLabel);
      if (event.key === `ArrowRight`)
        highlight(categories[(activeIndex + 1) % categories.length].label);
      else if (event.key === `ArrowLeft`)
        highlight(categories[(activeIndex - 1 + categories.length) % categories.length].label);
      else if (event.key === `Escape`) highlight(null);
      else return;
      event.preventDefault();
    },
    dailyData = daily ?? [],
    dailyMax = Math.max(1, ...dailyData.map((e) => e.value ?? 0)),
    pastDays = dailyData.filter((e) => e.value !== null),
    average = pastDays.length
      ? pastDays.reduce((e, t) => e + (t.value ?? 0), 0) / pastDays.length
      : 0,
    hitDay = (event: React.PointerEvent<HTMLDivElement>) => {
      let rect = event.currentTarget.getBoundingClientRect(),
        index = Math.floor(((event.clientX - rect.left) / rect.width) * dailyData.length);
      return Math.min(dailyData.length - 1, Math.max(0, index));
    },
    handleDailyKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (event) => {
      if (dailyData.length) {
        if (event.key === `ArrowRight`)
          setActiveDay((e) => Math.min(dailyData.length - 1, e === null ? 0 : e + 1));
        else if (event.key === `ArrowLeft`)
          setActiveDay((e) => Math.max(0, e === null ? dailyData.length - 1 : e - 1));
        else if (event.key === `Escape`) setActiveDay(null);
        else return;
        event.preventDefault();
      }
    },
    selectedDay = activeDay === null ? void 0 : dailyData[activeDay],
    previousDailyCountRef = React.useRef(dailyData.length),
    dailyRegrowRef = React.useRef(false);
  previousDailyCountRef.current !== dailyData.length &&
    ((previousDailyCountRef.current = dailyData.length), (dailyRegrowRef.current = true));
  let changePeriod = (nextPeriod: string) => {
      nextPeriod !== activePeriod &&
        (period === void 0 && setInternalPeriod(nextPeriod),
        onPeriodChange?.(nextPeriod),
        setActiveLabel(null),
        setActiveDay(null));
    },
    handlePeriodKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (event) => {
      if (!periods?.length) return;
      let currentIndex = periods.findIndex((e) => e.id === activePeriod),
        nextIndex = -1;
      (event.key === `ArrowRight` || event.key === `ArrowDown`
        ? (nextIndex = (currentIndex + 1) % periods.length)
        : (event.key === `ArrowLeft` || event.key === `ArrowUp`) &&
          (nextIndex = (currentIndex - 1 + periods.length) % periods.length),
        !(nextIndex < 0) &&
          (event.preventDefault(),
          changePeriod(periods[nextIndex].id),
          periodRef.current?.querySelectorAll<HTMLElement>(`[role=radio]`)[nextIndex]?.focus()));
    };
  (React.useLayoutEffect(() => {
    positionPill(periodRef.current, pillRef.current, `[aria-checked="true"]`);
  }),
    React.useLayoutEffect(() => {
      let e = periodRef.current;
      if (!e) return;
      let t = new ResizeObserver(() => positionPill(e, pillRef.current, `[aria-checked="true"]`));
      return (t.observe(e), () => t.disconnect());
    }, []),
    React.useLayoutEffect(() => {
      let e = cardRef.current,
        t = innerRef.current;
      if (!e || !t) return;
      let n = () => (e.style.height = `${t.offsetHeight}px`);
      n();
      let r = new ResizeObserver(n);
      return (r.observe(t), () => r.disconnect());
    }, []),
    React.useLayoutEffect(() => {
      let e = actionRef.current,
        t = actionInnerRef.current;
      if (!e || !t) return;
      let n = () => (e.style.width = `${t.offsetWidth}px`);
      n();
      let r = new ResizeObserver(n);
      return (r.observe(t), () => r.disconnect());
    }, []));
  let previousStateRef = React.useRef(state);
  React.useEffect(() => {
    previousStateRef.current !== state &&
      ((previousStateRef.current = state),
      setAnnouncement(
        state === `limit`
          ? `${title}: limit reached, ${formatUsageNumber(usedTotal)} of ${formatUsageNumber(total)} ${unit} used`
          : state === `warn`
            ? `${title}: running low, ${Math.round(ratio * 100)}% of ${unit} used`
            : `${title}: ${formatUsageNumber(usedTotal)} of ${formatUsageNumber(total)} ${unit} used`,
      ));
  }, [state]);
  let resetDate = resetAt === void 0 ? null : new Date(resetAt),
    needsAttention = state !== `ok`,
    animatedPercent = animatedValue(`pct`);
  return (
    <section
      ref={rootRef}
      className={[`ui-um`, className].filter(Boolean).join(` `)}
      aria-labelledby={`${instanceId}-title`}
      data-state={state}
    >
      <style href={`ui-usage-meter`} precedence={`default`}>
        {usageMeterStyles}
      </style>
      <div ref={cardRef} className={`ui-um__card`}>
        <div ref={innerRef} className={`ui-um__inner`}>
          <header className={`ui-um__head`}>
            <div className={`ui-um__heading`}>
              <h3 id={`${instanceId}-title`} className={`ui-um__title`}>
                {title}
              </h3>
              {(plan || resetDate) && (
                <p className={`ui-um__sub`}>
                  {plan}
                  {plan && resetDate && <span className={`ui-um__sep`}>{`·`}</span>}
                  {resetDate && (
                    <time
                      dateTime={resetDate.toISOString()}
                      title={`Resets on ${resetDateFormatter.format(resetDate)}`}
                    >
                      {resetCountdown(resetDate)}
                    </time>
                  )}
                </p>
              )}
            </div>
            {periods && periods.length > 1 && (
              <div
                ref={periodRef}
                className={`ui-um__switch`}
                role={`radiogroup`}
                aria-label={`Period`}
                onKeyDown={handlePeriodKeyDown}
              >
                <span ref={pillRef} className={`ui-um__pill`} aria-hidden={`true`} />
                {periods.map((e) => (
                  <button
                    type={`button`}
                    role={`radio`}
                    aria-checked={e.id === activePeriod}
                    tabIndex={e.id === activePeriod ? 0 : -1}
                    className={`ui-um__option`}
                    onClick={() => changePeriod(e.id)}
                    key={e.id}
                  >
                    {e.label}
                  </button>
                ))}
              </div>
            )}
          </header>
          <div className={`ui-um__figure`}>
            <p className={`ui-um__amount`}>
              <span className={`ui-um__big`}>{formatUsageNumber(animatedValue(`used`))}</span>
              <span className={`ui-um__of`}>
                {`of `}
                {withUsageUnit(formatUsageNumber(total), unit)}
              </span>
            </p>
            <span className={`ui-um__pct`} data-state={state}>
              {needsAttention && <span className={`ui-um__dot`} aria-hidden={`true`} />}
              {formatUsageNumber(Math.min(animatedPercent, 999))}
              {`%`}
            </span>
          </div>
          <div
            className={`ui-um__bar`}
            tabIndex={0}
            role={`group`}
            aria-label={`${formatUsageNumber(usedTotal)} of ${formatUsageNumber(total)} ${unit} used – arrow keys read each category`}
            data-active={activeRow ? `` : void 0}
            onPointerMove={(e) => e.pointerType === `mouse` && highlight(hitCategory(e))}
            onPointerLeave={(e) => e.pointerType === `mouse` && highlight(null)}
            onPointerUp={(e) => {
              if (e.pointerType === `mouse`) return;
              let t = hitCategory(e);
              highlight(t === activeLabel ? null : t);
            }}
            onKeyDown={handleBarKeyDown}
            onBlur={() => highlight(null)}
          >
            <div
              className={`ui-um__track`}
              role={`meter`}
              aria-valuemin={0}
              aria-valuemax={total}
              aria-valuenow={Math.min(usedTotal, total)}
              aria-valuetext={`${formatUsageNumber(usedTotal)} of ${formatUsageNumber(total)} ${unit}`}
            >
              {segments.map((e) => (
                <span
                  className={`ui-um__seg`}
                  data-active={e.label === activeLabel || void 0}
                  style={{
                    width: `${e.width}%`,
                    background: e.color,
                  }}
                  key={e.label}
                />
              ))}
            </div>
            <div
              className={`ui-um__tip`}
              data-open={activeRow ? `` : void 0}
              style={
                {
                  left: `${tipPercent}%`,
                  "--ui-um-tip-x": `${-tipPercent}%`,
                } as React.CSSProperties
              }
              aria-live={`polite`}
            >
              {lastRow && (
                <>
                  <span className={`ui-um__tip-label`}>
                    <span
                      className={`ui-um__swatch`}
                      style={{
                        background: lastRow.color,
                      }}
                    />
                    {lastRow.label}
                  </span>
                  <span className={`ui-um__tip-value`}>
                    {withUsageUnit(formatUsageNumber(lastRow.value), unit)}
                    <span className={`ui-um__muted`}>
                      {` · `}
                      {formatUsageNumber(usedTotal ? (lastRow.value / usedTotal) * 100 : 0)}
                      {`%`}
                    </span>
                  </span>
                </>
              )}
            </div>
          </div>
          <ul
            className={`ui-um__legend`}
            aria-label={`By category`}
            data-active={activeRow ? `` : void 0}
          >
            {displayRows.map((e) => {
              let t = animatedValue(`r:${e.label}`);
              return (
                <li className={`ui-um__row`} data-leaving={e.leaving || void 0} key={e.label}>
                  <div
                    className={`ui-um__item`}
                    data-active={e.label === activeLabel || void 0}
                    onPointerEnter={(t) =>
                      t.pointerType === `mouse` && !e.leaving && highlight(e.label)
                    }
                    onPointerLeave={(e) => e.pointerType === `mouse` && highlight(null)}
                    onPointerUp={(t) =>
                      t.pointerType !== `mouse` &&
                      !e.leaving &&
                      highlight(e.label === activeLabel ? null : e.label)
                    }
                  >
                    <span
                      className={`ui-um__swatch`}
                      style={{
                        background: e.color,
                      }}
                    />
                    <span className={`ui-um__label`}>{e.label}</span>
                    <span className={`ui-um__value`}>{formatUsageNumber(t)}</span>
                    <span className={`ui-um__share`}>
                      {formatUsageNumber(
                        animatedValue(`used`) ? (t / animatedValue(`used`)) * 100 : 0,
                      )}
                      {`%`}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
          {dailyData.length > 0 && (
            <div className={`ui-um__daily`}>
              <div className={`ui-um__daily-head`}>
                <span>{`Per day`}</span>
                <span className={`ui-um__daily-read`} key={selectedDay ? `d${activeDay}` : `avg`}>
                  {selectedDay ? (
                    <>
                      {selectedDay.label}
                      {` · `}
                      <b>
                        {selectedDay.value === null
                          ? `–`
                          : withUsageUnit(formatUsageNumber(selectedDay.value), unit)}
                      </b>
                    </>
                  ) : (
                    <>
                      {`Avg `}
                      <b>{formatUsageNumber(average)}</b>
                      {` / day`}
                    </>
                  )}
                </span>
              </div>
              <div
                className={`ui-um__spark`}
                tabIndex={0}
                role={`img`}
                aria-label={`${title} per day, ${formatUsageNumber(average)} ${unit} on average – arrow keys read each day`}
                data-hover={activeDay !== null || void 0}
                data-regrow={dailyRegrowRef.current || void 0}
                data-few={dailyData.length <= 14 || void 0}
                onPointerMove={(e) => setActiveDay(hitDay(e))}
                onPointerDown={(e) => setActiveDay(hitDay(e))}
                onPointerLeave={(e) => e.pointerType === `mouse` && setActiveDay(null)}
                onKeyDown={handleDailyKeyDown}
                onBlur={() => setActiveDay(null)}
                key={dailyData.length}
              >
                {dailyData.map((e, t) => (
                  <span
                    className={`ui-um__day`}
                    data-future={e.value === null || void 0}
                    data-active={t === activeDay || void 0}
                    style={
                      {
                        "--i": t,
                      } as React.CSSProperties
                    }
                    key={t}
                  >
                    <span
                      style={{
                        height:
                          e.value === null
                            ? void 0
                            : `${Math.max(4, (animatedValue(`d:${t}`) / dailyMax) * 100)}%`,
                      }}
                    />
                  </span>
                ))}
              </div>
            </div>
          )}
          {limits.length > 0 && (
            <ul
              className={`ui-um__limits`}
              aria-label={`Plan limits`}
              style={
                {
                  "--n": Math.min(3, limits.length),
                } as React.CSSProperties
              }
            >
              {limits.map((e) => {
                let t = e.total == null || !isFinite(e.total),
                  n =
                    e.decimals ??
                    (Number.isInteger(e.used) && (t || Number.isInteger(e.total)) ? 0 : 1),
                  o = t ? 0 : e.used / Math.max(e.total!, 1e-9),
                  s = t ? `ok` : o >= 1 ? `limit` : o >= warnAt ? `warn` : `ok`,
                  c = animatedValue(`l:${e.label}`),
                  l = t ? `∞` : formatUsageNumber(e.total!, Number.isInteger(e.total) ? 0 : n);
                return (
                  <li className={`ui-um__limit`} data-state={s} key={e.label}>
                    <span className={`ui-um__limit-label`}>
                      {e.label}
                      {s !== `ok` && (
                        <span
                          className={`ui-um__dot`}
                          aria-label={s === `limit` ? `At the limit` : `Close to the limit`}
                        />
                      )}
                    </span>
                    <span className={`ui-um__limit-value`}>
                      {formatUsageNumber(c, n)}
                      <span className={`ui-um__muted`}>
                        {` of `}
                        {withUsageUnit(l, t ? void 0 : e.unit)}
                      </span>
                    </span>
                    {t ? (
                      <span
                        className={`ui-um__thin`}
                        data-unlimited={``}
                        aria-label={`${e.label}: ${formatUsageNumber(e.used, n)}, unlimited`}
                        role={`img`}
                      />
                    ) : (
                      <span
                        className={`ui-um__thin`}
                        role={`meter`}
                        aria-label={e.label}
                        aria-valuemin={0}
                        aria-valuemax={e.total!}
                        aria-valuenow={Math.min(e.used, e.total!)}
                        aria-valuetext={`${formatUsageNumber(e.used, n)} of ${withUsageUnit(l, e.unit)}`}
                      >
                        <span
                          style={{
                            width: `${Math.min(100, (c / Math.max(e.total!, 1e-9)) * 100)}%`,
                          }}
                        />
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
      <div className={`ui-um__foot`}>
        <span className={`ui-um__status`} key={state}>
          {needsAttention && <span className={`ui-um__dot`} aria-hidden={`true`} />}
          {state === `limit` ? (
            <>
              <b>{`Limit reached`}</b>
              {usedTotal > total && (
                <span className={`ui-um__muted`}>
                  {withUsageUnit(formatUsageNumber(usedTotal - total), `over`)}
                </span>
              )}
            </>
          ) : (
            <>
              {state === `warn` && <b>{`Running low`}</b>}
              <span className={state === `warn` ? `ui-um__muted` : void 0}>
                {withUsageUnit(formatUsageNumber(animatedValue(`left`)), unit)}
                {` left`}
              </span>
            </>
          )}
        </span>
        <button
          ref={actionRef}
          type={`button`}
          className={`ui-um__action`}
          data-strong={needsAttention || void 0}
          onClick={() => onUpgrade?.(state)}
        >
          <span ref={actionInnerRef} className={`ui-um__action-inner`}>
            <span className={`ui-um__action-text`} key={needsAttention ? `top-up` : `upgrade`}>
              {needsAttention ? topUpLabel : upgradeLabel}
            </span>
          </span>
        </button>
      </div>
      <span className={`ui-um__live`} aria-live={`polite`}>
        {announcement}
      </span>
    </section>
  );
}
var usageMeterStyles = `
/* Colors and motion as variables – override them on .ui-um */
.ui-um {
  --ui-um-tray: #f0f0f0;
  --ui-um-card: #ffffff;
  --ui-um-line: #ececec;
  --ui-um-ink: #171717;
  --ui-um-text: #404040;
  --ui-um-muted: #8f8f8f;
  --ui-um-faint: #b5b5b5;
  --ui-um-well: #f4f4f5;
  --ui-um-hover: #f4f4f5;
  --ui-um-track: #efeff1;
  --ui-um-fill: #4a4a4f;
  --ui-um-spark: #dcdce0;
  --ui-um-accent: #2f6bff;
  --ui-um-warn: #f59e0b;
  --ui-um-warn-text: #b45309;
  --ui-um-c1: #2f6bff;
  --ui-um-c2: #74a0ff;
  --ui-um-c3: #b4cbff;
  --ui-um-c4: #a8a8ae;
  --ui-um-c5: #d4d4d8;
  --ui-um-focus: rgba(23, 23, 23, 0.22);
  --ui-um-tip-shadow: 0 8px 24px -6px rgba(0, 0, 0, 0.16), 0 2px 6px rgba(0, 0, 0, 0.06);
  --ui-um-ease: cubic-bezier(0.22, 1, 0.36, 1);
  box-sizing: border-box;
  container-type: inline-size;
  position: relative;
  display: grid;
  width: 100%;
  max-width: 460px;
  padding: 4px;
  border-radius: 20px;
  background: var(--ui-um-tray);
  font-family: "Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  font-size: 13px;
  line-height: 1.45;
  color: var(--ui-um-text);
  -webkit-font-smoothing: antialiased;
}
.ui-um *, .ui-um *::before, .ui-um *::after { box-sizing: border-box; }
:where(.ui-um) button { margin: 0; padding: 0; border: 0; background: none; font: inherit; color: inherit; cursor: pointer; }
:where(.ui-um) :is(h3, p, ul) { margin: 0; padding: 0; }
:where(.ui-um) ul { list-style: none; }
.ui-um :is(button, [tabindex="0"]):focus-visible { outline: 2px solid var(--ui-um-focus); outline-offset: 2px; }
.ui-um b { font-weight: 500; color: var(--ui-um-ink); }
.ui-um__muted { color: var(--ui-um-muted); }

/* The white card */
.ui-um__card { overflow: hidden; border-radius: 16px; background: var(--ui-um-card); box-shadow: 0 0 0 1px var(--ui-um-line), 0 1px 2px rgba(0, 0, 0, 0.04); transition: height 360ms var(--ui-um-ease); }
.ui-um__inner { display: flow-root; padding: 14px 16px 18px; }

/* Head: title and reset date, the period switch on the right */
.ui-um__head { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; }
.ui-um__heading { min-width: 0; padding-top: 2px; }
.ui-um__title { overflow: hidden; font-size: 14px; font-weight: 600; line-height: 20px; color: var(--ui-um-ink); white-space: nowrap; text-overflow: ellipsis; }
.ui-um__sub { font-size: 12.5px; color: var(--ui-um-muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.ui-um__sep { margin: 0 6px; color: var(--ui-um-faint); }

.ui-um__switch { position: relative; display: grid; grid-auto-columns: auto; grid-auto-flow: column; flex: none; padding: 2px; border-radius: 10px; background: var(--ui-um-well); box-shadow: inset 0 0 0 1px var(--ui-um-line); }
.ui-um__pill {
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 8px;
  background: var(--ui-um-card);
  box-shadow: 0 0 0 1px var(--ui-um-line), 0 1px 2px rgba(0, 0, 0, 0.06);
  opacity: 0;
  pointer-events: none;
  transition: transform 320ms var(--ui-um-ease), width 320ms var(--ui-um-ease), height 320ms var(--ui-um-ease), opacity 200ms ease;
}
.ui-um__option { position: relative; z-index: 1; min-width: 0; height: 26px; padding: 0 9px; overflow: hidden; border-radius: 8px; font-size: 12px; font-weight: 500; color: var(--ui-um-muted); white-space: nowrap; text-overflow: ellipsis; transition: color 200ms ease; }
.ui-um__option:hover, .ui-um__option[aria-checked="true"] { color: var(--ui-um-ink); }

/* The big number and its share */
.ui-um__figure { display: flex; align-items: baseline; justify-content: space-between; gap: 12px; margin-top: 18px; }
.ui-um__amount { display: flex; flex-wrap: wrap; align-items: baseline; column-gap: 6px; min-width: 0; }
.ui-um__big { font-size: 28px; font-weight: 600; line-height: 34px; letter-spacing: -0.02em; color: var(--ui-um-ink); font-variant-numeric: tabular-nums; }
.ui-um__of { font-size: 13px; color: var(--ui-um-muted); font-variant-numeric: tabular-nums; white-space: nowrap; }
.ui-um__pct { display: inline-flex; flex: none; align-items: center; gap: 6px; font-size: 13px; font-weight: 500; color: var(--ui-um-text); font-variant-numeric: tabular-nums; transition: color 260ms ease; }
.ui-um__pct[data-state="warn"] { color: var(--ui-um-warn-text); }
.ui-um__pct[data-state="limit"] { color: var(--ui-um-ink); }
/* The only place amber shows up: a small dot */
.ui-um__dot { display: inline-block; flex: none; width: 6px; height: 6px; border-radius: 50%; background: var(--ui-um-warn); animation: ui-um-pop 420ms cubic-bezier(0.34, 1.56, 0.64, 1) both; }
.ui-um[data-state="limit"] .ui-um__pct .ui-um__dot, .ui-um[data-state="limit"] .ui-um__status .ui-um__dot, .ui-um__limit[data-state="limit"] .ui-um__dot { box-shadow: 0 0 0 3px color-mix(in srgb, var(--ui-um-warn) 22%, transparent); }

/* The stacked bar */
.ui-um__bar { position: relative; margin-top: 10px; padding: 4px 0; border-radius: 6px; cursor: default; }
.ui-um__track { display: flex; height: 10px; overflow: hidden; border-radius: 5px; background: var(--ui-um-track); }
.ui-um__seg { position: relative; flex: none; height: 100%; overflow: hidden; transition: opacity 200ms ease; }
/* A thin cut between the parts */
.ui-um__seg::after { content: ""; position: absolute; top: 0; right: 0; bottom: 0; width: 2px; background: var(--ui-um-card); }
.ui-um__bar[data-active] .ui-um__seg:not([data-active]) { opacity: 0.28; }

/* Tooltip: anchored to the middle of the part, shifted so it never leaves the card */
.ui-um__tip {
  position: absolute;
  bottom: calc(100% + 6px);
  z-index: 2;
  display: grid;
  gap: 1px;
  padding: 7px 10px 8px;
  border: 1px solid var(--ui-um-line);
  border-radius: 10px;
  background: var(--ui-um-card);
  box-shadow: var(--ui-um-tip-shadow);
  white-space: nowrap;
  pointer-events: none;
  opacity: 0;
  transform: translate(var(--ui-um-tip-x), 4px) scale(0.97);
  transition: left 260ms var(--ui-um-ease), transform 260ms var(--ui-um-ease), opacity 160ms ease;
}
.ui-um__tip[data-open] { opacity: 1; transform: translate(var(--ui-um-tip-x), 0); }
.ui-um__tip-label { display: flex; align-items: center; gap: 7px; font-size: 12px; color: var(--ui-um-muted); }
.ui-um__tip-value { font-size: 13px; font-weight: 500; color: var(--ui-um-ink); font-variant-numeric: tabular-nums; }
.ui-um__tip-value .ui-um__muted { font-weight: 400; }

/* Legend: one row per category, highlighted with the bar */
.ui-um__legend { display: grid; margin-top: 10px; }
.ui-um__row { display: grid; grid-template-rows: 1fr; animation: ui-um-grow 380ms var(--ui-um-ease) both; transition: grid-template-rows 320ms var(--ui-um-ease) 80ms, opacity 200ms ease; }
.ui-um__row[data-leaving] { grid-template-rows: 0fr; opacity: 0; pointer-events: none; }
.ui-um__item { display: flex; align-items: center; gap: 10px; min-height: 0; height: 30px; margin: 0 -8px; padding: 0 8px; overflow: hidden; border-radius: 8px; transition: background-color 160ms ease, opacity 200ms ease; }
.ui-um__row[data-leaving] .ui-um__item { background: none; }
.ui-um__item[data-active] { background: var(--ui-um-hover); }
.ui-um__legend[data-active] .ui-um__item:not([data-active]) { opacity: 0.45; }
.ui-um__swatch { flex: none; width: 8px; height: 8px; border-radius: 2.5px; }
.ui-um__label { flex: 1; min-width: 0; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; color: var(--ui-um-text); }
.ui-um__value { color: var(--ui-um-ink); font-weight: 500; font-variant-numeric: tabular-nums; }
.ui-um__share { width: 40px; text-align: right; color: var(--ui-um-muted); font-variant-numeric: tabular-nums; }

/* Daily sparkline */
.ui-um__daily { margin-top: 12px; }
.ui-um__daily-head { display: flex; justify-content: space-between; gap: 12px; font-size: 12px; color: var(--ui-um-muted); white-space: nowrap; }
.ui-um__daily-read { font-variant-numeric: tabular-nums; animation: ui-um-in 220ms var(--ui-um-ease) both; }
.ui-um__spark { display: flex; align-items: stretch; gap: 2px; height: 34px; margin-top: 8px; border-radius: 4px; cursor: default; }
/* A week gets wider gaps, so seven bars don't read as one block */
.ui-um__spark[data-few] { gap: 5px; }
.ui-um__day { display: flex; flex: 1 1 0; align-items: flex-end; min-width: 0; }
.ui-um__day > span { width: 100%; border-radius: 2px; background: var(--ui-um-spark); transform-origin: bottom; transition: background-color 160ms ease, opacity 160ms ease; }
.ui-um__spark[data-regrow] .ui-um__day > span { animation: ui-um-rise 520ms var(--ui-um-ease) both; animation-delay: calc(var(--i) * 18ms); }
.ui-um__day[data-future] > span { height: 2px; background: var(--ui-um-track); }
.ui-um__spark[data-hover] .ui-um__day:not([data-active]) > span { opacity: 0.6; }
.ui-um__day[data-active] > span { background: var(--ui-um-accent); }

/* Plan limits: thin meters, side by side on wide cards */
.ui-um__limits { display: grid; grid-template-columns: repeat(var(--n, 3), minmax(0, 1fr)); gap: 12px 18px; margin-top: 16px; padding-top: 14px; border-top: 1px solid var(--ui-um-line); }
.ui-um__limit { display: grid; grid-template-columns: minmax(0, 1fr); align-content: start; min-width: 0; }
.ui-um__limit-label { display: flex; align-items: center; gap: 6px; min-width: 0; overflow: hidden; font-size: 12px; color: var(--ui-um-muted); white-space: nowrap; }
.ui-um__limit-value { overflow: hidden; color: var(--ui-um-ink); font-weight: 500; font-variant-numeric: tabular-nums; white-space: nowrap; text-overflow: ellipsis; }
.ui-um__limit-value .ui-um__muted { font-weight: 400; }
.ui-um__thin { position: relative; display: block; height: 4px; margin-top: 7px; overflow: hidden; border-radius: 2px; background: var(--ui-um-track); }
.ui-um__thin > span { position: absolute; top: 0; bottom: 0; left: 0; border-radius: inherit; background: var(--ui-um-fill); }
/* Unlimited: a quiet striped track instead of a fill */
.ui-um__thin[data-unlimited] { background: repeating-linear-gradient(-45deg, var(--ui-um-track) 0 3px, transparent 3px 6px); }

/* The tray below the card */
.ui-um__foot { display: flex; align-items: center; justify-content: space-between; gap: 12px; min-height: 44px; padding: 6px 2px 2px 12px; font-size: 12.5px; color: var(--ui-um-muted); }
.ui-um__status { display: flex; align-items: center; gap: 7px; min-width: 0; overflow: hidden; white-space: nowrap; font-variant-numeric: tabular-nums; animation: ui-um-in 260ms var(--ui-um-ease) both; }
.ui-um__status > :last-child { overflow: hidden; text-overflow: ellipsis; }
.ui-um__action {
  display: inline-flex;
  flex: none;
  justify-content: center;
  height: 32px;
  overflow: hidden;
  border-radius: 14px;
  font-size: 13px;
  font-weight: 500;
  color: var(--ui-um-ink);
  background: var(--ui-um-card);
  box-shadow: 0 0 0 1px var(--ui-um-line), 0 1px 2px rgba(0, 0, 0, 0.04);
  transition: background-color 280ms ease, color 280ms ease, box-shadow 280ms ease, width 320ms var(--ui-um-ease), transform 140ms ease;
}
.ui-um__action:hover { background: var(--ui-um-hover); }
.ui-um__action:active { transform: scale(0.97); }
.ui-um__action[data-strong] { background: var(--ui-um-ink); color: var(--ui-um-card); box-shadow: 0 1px 2px rgba(0, 0, 0, 0.12), 0 6px 14px -6px rgba(0, 0, 0, 0.35); animation: ui-um-nudge 520ms cubic-bezier(0.34, 1.56, 0.64, 1); }
.ui-um__action[data-strong]:hover { background: var(--ui-um-ink); opacity: 0.88; }
.ui-um__action-inner { display: inline-flex; align-items: center; flex: none; height: 100%; padding: 0 14px; white-space: nowrap; }
.ui-um__action-text { animation: ui-um-in 260ms var(--ui-um-ease) both; }
.ui-um__live { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }

@keyframes ui-um-in { from { opacity: 0; transform: translateY(3px); filter: blur(2px); } to { opacity: 1; transform: none; filter: none; } }
@keyframes ui-um-grow { from { grid-template-rows: 0fr; opacity: 0; } to { grid-template-rows: 1fr; opacity: 1; } }
@keyframes ui-um-rise { from { transform: scaleY(0); } to { transform: none; } }
@keyframes ui-um-pop { 0% { transform: scale(0.3); } 60% { transform: scale(1.25); } 100% { transform: scale(1); } }
@keyframes ui-um-nudge { 0% { transform: scale(0.94); } 60% { transform: scale(1.04); } 100% { transform: scale(1); } }

/* Narrow (phones): the switch gets its own full-width row, limits stack as rows */
@container (max-width: 400px) {
  .ui-um__inner { padding: 12px 14px 16px; }
  .ui-um__head { flex-direction: column; align-items: stretch; gap: 12px; }
  .ui-um__switch { grid-auto-columns: minmax(0, auto); }
  .ui-um__option { padding: 0 6px; }
  .ui-um__big { font-size: 26px; }
  .ui-um__limits { grid-template-columns: minmax(0, 1fr); gap: 12px; }
  .ui-um__limit { grid-template-columns: minmax(0, 1fr) auto; column-gap: 12px; }
  .ui-um__limit-value { font-size: 12.5px; }
  .ui-um__thin { grid-column: 1 / -1; margin-top: 6px; }
}
@container (max-width: 300px) {
  .ui-um__of { font-size: 12px; }
  .ui-um__share { width: 34px; }
}
/* Touch screens: bigger targets */
@media (hover: none) and (pointer: coarse) {
  .ui-um__option { height: 34px; }
  .ui-um__item { height: 36px; }
  .ui-um__action { height: 38px; border-radius: 13px; }
  .ui-um__foot { min-height: 50px; }
  .ui-um__bar { padding: 10px 0; margin-top: 4px; }
}
@media (prefers-reduced-motion: reduce) {
  .ui-um *, .ui-um *::before, .ui-um *::after { animation: none !important; transition: none !important; }
}

/* Dark mode: follows a .dark class or data-theme="dark" on any ancestor, e.g. <html> */
:where(.dark, [data-theme="dark"]) .ui-um {
  --ui-um-tray: #111113;
  --ui-um-card: #19191b;
  --ui-um-line: #2a2a2e;
  --ui-um-ink: #ededed;
  --ui-um-text: #c8c8cc;
  --ui-um-muted: #8b8b92;
  --ui-um-faint: #5c5c63;
  --ui-um-well: #111113;
  --ui-um-hover: #232326;
  --ui-um-track: #2a2a2e;
  --ui-um-fill: #b4b4ba;
  --ui-um-spark: #3a3a40;
  --ui-um-accent: #6d8bff;
  --ui-um-warn: #f5a524;
  --ui-um-warn-text: #f5b350;
  --ui-um-c1: #6d8bff;
  --ui-um-c2: #4c66c9;
  --ui-um-c3: #34468a;
  --ui-um-c4: #6b6b72;
  --ui-um-c5: #45454b;
  --ui-um-focus: rgba(255, 255, 255, 0.3);
  --ui-um-tip-shadow: 0 8px 24px -6px rgba(0, 0, 0, 0.5), 0 2px 6px rgba(0, 0, 0, 0.35);
}
:where(.dark, [data-theme="dark"]) .ui-um__pill { background: #2a2a2e; box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.06); }
:where(.dark, [data-theme="dark"]) .ui-um__tip { background: #2a2a2d; border-color: rgba(255, 255, 255, 0.1); }
`;
var valueValue5: IconNode = [
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
function useControllableState<T>(
  controlledValue: T | undefined,
  defaultValue: T,
  onChange?: ((value: T) => void) | undefined,
): [T, (value: T) => void] {
  let [internalValue, setInternalValue] = React.useState(defaultValue);
  return [controlledValue ?? internalValue, (e) => (setInternalValue(e), onChange?.(e))];
}
function ShellTabs({
  items: items,
  value: value,
  defaultValue: defaultValue,
  onChange: onChange,
}: {
  items: string[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
}) {
  let [currentValue, setValue] = useControllableState(value, defaultValue ?? items[0], onChange),
    tabsRef = React.useRef<HTMLDivElement | null>(null),
    [pillGeometry, setPillGeometry] = React.useState<{
      x: number;
      w: number;
    } | null>(null);
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
function ToolButton({
  icon: icon,
  label: label,
  onClick: onClick,
  pressed: pressed,
}: {
  icon: IconNode;
  label: string;
  onClick?: () => void;
  pressed?: boolean;
}) {
  return (
    <button
      type={`button`}
      className={`ui-as-tool`}
      aria-label={label}
      title={label}
      aria-pressed={pressed}
      onClick={onClick}
    >
      <Icon icon={icon} size={15} />
    </button>
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
  let [open, setOpen] = React.useState<boolean>(false);
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
  options: {
    value: string;
    label: string;
  }[];
  onChange: (value: string) => void;
  icon?: IconNode;
  align?: PopoverAlign;
  className?: string;
}) {
  let [s, c] = React.useState<boolean>(false),
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
  let [message, setMessage] = React.useState<{
    id: number;
    text: string;
  } | null>(null);
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
var valueValue6: IconNode = [
  [
    `path`,
    {
      d: `M21.5 12C21.5 17.2467 17.2467 21.5 12 21.5C10.3719 21.5 8.8394 21.0904 7.5 20.3687C5.63177 19.362 4.37462 20.2979 3.26592 20.4658C3.09774 20.4913 2.93024 20.4302 2.80997 20.31C2.62741 20.1274 2.59266 19.8451 2.6935 19.6074C3.12865 18.5818 3.5282 16.6382 2.98341 15C2.6698 14.057 2.5 13.0483 2.5 12C2.5 6.75329 6.75329 2.5 12 2.5C17.2467 2.5 21.5 6.75329 21.5 12Z`,
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
      d: `M12.1257 12H12.0007M8.125 12H8M16.125 12H16M12.2507 12C12.2507 12.1381 12.1388 12.25 12.0007 12.25C11.8627 12.25 11.7507 12.1381 11.7507 12C11.7507 11.8619 11.8627 11.75 12.0007 11.75C12.1388 11.75 12.2507 11.8619 12.2507 12ZM8.25 12C8.25 12.1381 8.13807 12.25 8 12.25C7.86193 12.25 7.75 12.1381 7.75 12C7.75 11.8619 7.86193 11.75 8 11.75C8.13807 11.75 8.25 11.8619 8.25 12ZM16.25 12C16.25 12.1381 16.1381 12.25 16 12.25C15.8619 12.25 15.75 12.1381 15.75 12C15.75 11.8619 15.8619 11.75 16 11.75C16.1381 11.75 16.25 11.8619 16.25 12Z`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `1`,
    },
  ],
];
var valueValue7: IconNode = [
  [
    `path`,
    {
      d: `M7.5 14.5C7.5 11.2002 7.5 9.55025 8.52513 8.52513C9.55025 7.5 11.2002 7.5 14.5 7.5C17.7998 7.5 19.4497 7.5 20.4749 8.52513C21.5 9.55025 21.5 11.2002 21.5 14.5C21.5 17.7998 21.5 19.4497 20.4749 20.4749C19.4497 21.5 17.7998 21.5 14.5 21.5C11.2002 21.5 9.55025 21.5 8.52513 20.4749C7.5 19.4497 7.5 17.7998 7.5 14.5Z`,
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
      d: `M7.5 16.5C6.10355 16.5 5.40533 16.5 4.84402 16.3036C3.83866 15.9518 3.0482 15.1613 2.69641 14.156C2.5 13.5947 2.5 12.8964 2.5 11.5V9.5C2.5 6.20017 2.5 4.55025 3.52513 3.52513C4.55025 2.5 6.20017 2.5 9.5 2.5H11.5C12.8964 2.5 13.5947 2.5 14.156 2.69641C15.1613 3.0482 15.9518 3.83866 16.3036 4.84402C16.5 5.40533 16.5 6.10355 16.5 7.5`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `1`,
    },
  ],
];
var valueValue8: IconNode = [
  [
    `path`,
    {
      d: `M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeWidth: `1.5`,
      key: `0`,
    },
  ],
  [
    `path`,
    {
      d: `M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeWidth: `1.5`,
      key: `1`,
    },
  ],
  [
    `path`,
    {
      d: `M9.5 16.5L9.5 10.5`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeWidth: `1.5`,
      key: `2`,
    },
  ],
  [
    `path`,
    {
      d: `M14.5 16.5L14.5 10.5`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeWidth: `1.5`,
      key: `3`,
    },
  ],
];
var valueValue9: IconNode = [
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
var valueValue10: IconNode = [
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
var valueValue11: IconNode = [
  [
    `path`,
    {
      d: `M2 6L8.91302 9.91697C11.4616 11.361 12.5384 11.361 15.087 9.91697L22 6`,
      stroke: `currentColor`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `0`,
    },
  ],
  [
    `path`,
    {
      d: `M2.01577 13.4756C2.08114 16.5412 2.11383 18.0739 3.24496 19.2094C4.37608 20.3448 5.95033 20.3843 9.09883 20.4634C11.0393 20.5122 12.9607 20.5122 14.9012 20.4634C18.0497 20.3843 19.6239 20.3448 20.7551 19.2094C21.8862 18.0739 21.9189 16.5412 21.9842 13.4756C22.0053 12.4899 22.0053 11.5101 21.9842 10.5244C21.9189 7.45886 21.8862 5.92609 20.7551 4.79066C19.6239 3.65523 18.0497 3.61568 14.9012 3.53657C12.9607 3.48781 11.0393 3.48781 9.09882 3.53656C5.95033 3.61566 4.37608 3.65521 3.24495 4.79065C2.11382 5.92608 2.08114 7.45885 2.01576 10.5244C1.99474 11.5101 1.99475 12.4899 2.01577 13.4756Z`,
      stroke: `currentColor`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `1`,
    },
  ],
];
var valueValue12: IconNode = [
  [
    `path`,
    {
      d: `M6.00449 12.5V12M18.0045 12.5V12M12.0045 12.5V12M7.00449 12.5C7.00449 11.9477 6.55677 11.5 6.00449 11.5C5.4522 11.5 5.00449 11.9477 5.00449 12.5C5.00449 13.0523 5.4522 13.5 6.00449 13.5C6.55677 13.5 7.00449 13.0523 7.00449 12.5ZM19.0045 12.5C19.0045 11.9477 18.5568 11.5 18.0045 11.5C17.4522 11.5 17.0045 11.9477 17.0045 12.5C17.0045 13.0523 17.4522 13.5 18.0045 13.5C18.5568 13.5 19.0045 13.0523 19.0045 12.5ZM13.0045 12.5C13.0045 11.9477 12.5568 11.5 12.0045 11.5C11.4522 11.5 11.0045 11.9477 11.0045 12.5C11.0045 13.0523 11.4522 13.5 12.0045 13.5C12.5568 13.5 13.0045 13.0523 13.0045 12.5Z`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `0`,
    },
  ],
];
var valueValue13: IconNode = [
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
      d: `M2 12C2 8.46252 2 6.69377 3.0528 5.5129C3.22119 5.32403 3.40678 5.14935 3.60746 4.99087C4.86213 4 6.74142 4 10.5 4H13.5C17.2586 4 19.1379 4 20.3925 4.99087C20.5932 5.14935 20.7788 5.32403 20.9472 5.5129C22 6.69377 22 8.46252 22 12C22 15.5375 22 17.3062 20.9472 18.4871C20.7788 18.676 20.5932 18.8506 20.3925 19.0091C19.1379 20 17.2586 20 13.5 20H10.5C6.74142 20 4.86213 20 3.60746 19.0091C3.40678 18.8506 3.22119 18.676 3.0528 18.4871C2 17.3062 2 15.5375 2 12Z`,
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
      d: `M10 16H11.5`,
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
      d: `M14.5 16L18 16`,
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
      d: `M2 9H22`,
      stroke: `currentColor`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `3`,
    },
  ],
];
var ValueValue: IconNode = [
  [
    `path`,
    {
      d: `M5 21C9.20998 16.2487 13.9412 9.9475 21 14.6734`,
      stroke: `currentColor`,
      strokeWidth: `1.5`,
      key: `0`,
    },
  ],
  [
    `path`,
    {
      d: `M17 4.50012C17.4915 3.99442 18.7998 2.00012 19.5 2.00012M22 4.50012C21.5085 3.99442 20.2002 2.00012 19.5 2.00012M19.5 2.00012V10.0001`,
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
      d: `M20.9999 13C20.998 17.147 20.9472 19.2703 19.6088 20.6088C18.2175 22 15.9783 22 11.5 22C7.02166 22 4.78249 22 3.39124 20.6088C2 19.2175 2 16.9783 2 12.5C2 8.02166 2 5.78249 3.39124 4.39124C4.78249 3 7.02166 3 11.5 3C11.6699 3 14 3.00008 14 3.00008`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeWidth: `1.5`,
      key: `2`,
    },
  ],
];
var ValueValue2: IconNode = [
  [
    `path`,
    {
      d: `M15.5 14.5C18.8137 14.5 21.5 11.8137 21.5 8.5C21.5 5.18629 18.8137 2.5 15.5 2.5C12.1863 2.5 9.5 5.18629 9.5 8.5C9.5 9.38041 9.68962 10.2165 10.0303 10.9697L2.5 18.5V21.5H5.5V19.5H7.5V17.5H9.5L13.0303 13.9697C13.7835 14.3104 14.6196 14.5 15.5 14.5Z`,
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
      d: `M17.5 6.5L16.5 7.5`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `1`,
    },
  ],
];
var ValueValue3 = [
  {
    label: `New chat`,
    icon: EditIcon,
  },
  {
    label: `Chat`,
    icon: valueValue6,
  },
  {
    label: `Folders`,
    icon: FilesIcon,
  },
  {
    label: `Integrations`,
    icon: GridIcon,
  },
  {
    label: `Analytics`,
    icon: valueValue5,
  },
  {
    label: `Settings`,
    icon: SettingsIcon,
  },
];
var ValueValue4 = [`General`, `Members`, `Billing`, `API keys`];
var ValueValue5 = [
  {
    id: `starter`,
    name: `Starter`,
    monthly: 19,
    yearly: 15,
    blurb: `For individuals trying things out`,
    features: [`10,000 credits / month`, `3 seats`, `10 GB storage`],
  },
  {
    id: `pro`,
    name: `Pro`,
    monthly: 49,
    yearly: 39,
    blurb: `For small teams shipping every day`,
    features: [`50,000 credits / month`, `10 seats`, `100 GB storage`, `Agents and API access`],
  },
  {
    id: `team`,
    name: `Team`,
    monthly: 99,
    yearly: 79,
    blurb: `For growing teams with more seats`,
    features: [`150,000 credits / month`, `25 seats`, `1 TB storage`, `SSO and audit log`],
  },
];
var valueValue2 = `Nov 12, 2026`;
var ValueValue6 = [
  {
    id: `INV-2026-0412`,
    date: `Oct 12, 2026`,
    amount: `$49.00`,
    status: `Due`,
  },
  {
    id: `INV-2026-0371`,
    date: `Sep 12, 2026`,
    amount: `$49.00`,
    status: `Paid`,
  },
  {
    id: `INV-2026-0329`,
    date: `Aug 12, 2026`,
    amount: `$69.00`,
    status: `Paid`,
  },
  {
    id: `INV-2026-0288`,
    date: `Jul 12, 2026`,
    amount: `$49.00`,
    status: `Paid`,
  },
  {
    id: `INV-2026-0240`,
    date: `Jun 12, 2026`,
    amount: `$49.00`,
    status: `Paid`,
  },
];
var ValueValue7 = [
  {
    id: `m1`,
    name: `Alex Morgan`,
    email: `alex@acme.com`,
    role: `Owner`,
  },
  {
    id: `m2`,
    name: `Priya Shah`,
    email: `priya@acme.com`,
    role: `Admin`,
  },
  {
    id: `m3`,
    name: `Jonas Weber`,
    email: `jonas@acme.com`,
    role: `Member`,
  },
  {
    id: `m4`,
    name: `Mia Chen`,
    email: `mia@acme.com`,
    role: `Member`,
  },
  {
    id: `m5`,
    name: `Leo Martins`,
    email: `leo@acme.com`,
    role: `Viewer`,
  },
];
var ValueValue8 = [`Admin`, `Member`, `Viewer`].map((e) => ({
  value: e,
  label: e,
}));
var ValueValue9 = [
  {
    id: `k1`,
    name: `Production`,
    secret: `sk-live-4f9a2c71d0e84b6a8F2q`,
    created: `Mar 4, 2026`,
    lastUsed: `2 minutes ago`,
  },
  {
    id: `k2`,
    name: `Staging`,
    secret: `sk-test-91bd03e6aa7c4f12Lm7x`,
    created: `May 18, 2026`,
    lastUsed: `Yesterday`,
  },
  {
    id: `k3`,
    name: `Zapier sync`,
    secret: `sk-live-0c6e57b2f1a948d3Qz4k`,
    created: `Aug 2, 2026`,
    lastUsed: `Sep 28, 2026`,
  },
];
var ValueValue10 = [
  {
    value: `eu`,
    label: `Europe (Frankfurt)`,
  },
  {
    value: `us`,
    label: `United States (Virginia)`,
  },
  {
    value: `ap`,
    label: `Asia Pacific (Singapore)`,
  },
];
var ValueValue11 = Array.from(
  {
    length: 30,
  },
  (e, t) => ({
    label: `Oct ${t + 1}`,
    value: t < 10 ? Math.round(900 + 650 * Math.abs(Math.sin(t * 1.3)) + t * 40) : null,
  }),
);
var ValueValue12 = (e: string) => `${e.slice(0, 8)}••••••••••••${e.slice(-4)}`;
var valueValue3 = (e: string) =>
  e
    .split(/[\s@.]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((e: string) => e[0].toUpperCase())
    .join(``);
function SettingsBilling({ defaultTab = `Billing`, ...t }: SettingsBillingProps) {
  let [n, r] = React.useState<string>(defaultTab),
    [i, a] = useToast();
  return (
    <AppShell active={`Settings`} nav={ValueValue3} {...t}>
      <style href={`ui-settings-billing`} precedence={`default`}>
        {valueValue4}
      </style>
      <div className={`ui-sb`}>
        <h1 className={`ui-as-page-title`}>{`Settings`}</h1>
        <p
          className={`ui-as-page-sub`}
        >{`Manage your workspace, your team, your plan and access to the API.`}</p>
        <div className={`ui-as-toolbar ui-sb__bar`}>
          <ShellTabs
            items={ValueValue4}
            value={n}
            onChange={(e: React.SetStateAction<string>) => r(e)}
          />
        </div>
        <div className={`ui-sb__body`} key={n}>
          {n === `General` && <ValueValue14 workspace={t.workspace ?? `Acme`} toast={a} />}
          {n === `Members` && <ValueValue15 toast={a} />}
          {n === `Billing` && <ValueValue13 toast={a} />}
          {n === `API keys` && <ValueValue16 toast={a} />}
        </div>
      </div>
      {i}
    </AppShell>
  );
}
function ValueValue13({ toast: toast }: { toast: (message: string) => void }) {
  let [t, n] = React.useState({
      id: `pro`,
      cycle: `monthly`,
    }),
    [r, s] = React.useState<string>(`monthly`),
    [c, l] = React.useState(false),
    [u, d] = React.useState(`billing@acme.com`),
    [f, p] = React.useState<string | null>(null),
    m = React.useRef<HTMLElement | null>(null),
    h = ValueValue5.find((e) => e.id === t.id)!,
    g = t.cycle === `monthly` ? `$${h.monthly}/mo` : `$${h.yearly * 12}/yr`;
  return (
    <>
      <div className={`ui-sb-overview`}>
        <div
          className={`ui-sb-usage ui-as-rise`}
          style={
            {
              "--i": 0,
            } as React.CSSProperties
          }
        >
          <UsageMeter
            title={`Usage this period`}
            plan={`${h.name} plan`}
            total={5e4}
            used={[
              {
                label: `Chat`,
                value: 18400,
              },
              {
                label: `Agents`,
                value: 9200,
              },
              {
                label: `API`,
                value: 4100,
              },
              {
                label: `Images`,
                value: 2300,
              },
            ]}
            limits={[
              {
                label: `Seats`,
                used: 8,
                total: 10,
              },
              {
                label: `Storage`,
                used: 42.6,
                total: 100,
                unit: `GB`,
              },
            ]}
            daily={ValueValue11}
            resetAt={new Date(2026, 10, 12)}
            onUpgrade={(t: string) => toast(t === `ok` ? `Opening plans` : `1,000 credits added`)}
          />
        </div>
        <div className={`ui-sb-stack`}>
          <section
            className={`ui-sb-card ui-sb-plan ui-as-rise`}
            style={
              {
                "--i": 1,
              } as React.CSSProperties
            }
          >
            <div className={`ui-sb-plan__top`}>
              <span className={`ui-sb-cap`}>{`Current plan`}</span>
              <span className={`ui-sb-pill`} data-tone={c ? `amber` : `green`}>
                {c ? `Cancels soon` : `Active`}
              </span>
            </div>
            <strong className={`ui-sb-plan__name`}>
              {h.name}
              {` `}
              <span>
                {`· `}
                {g}
              </span>
            </strong>
            <p className={`ui-sb-muted`}>
              {c
                ? `Your plan ends on ${valueValue2}. You keep every feature until then.`
                : `Renews on ${valueValue2} · billed ${t.cycle}`}
            </p>
            <div className={`ui-sb-actions`}>
              <Button
                size={`sm`}
                onClick={() =>
                  m.current?.scrollIntoView({
                    behavior: `smooth`,
                    block: `start`,
                  })
                }
              >{`Change plan`}</Button>
              {c ? (
                <Button
                  size={`sm`}
                  variant={`secondary`}
                  onClick={() => {
                    (l(false), toast(`${h.name} plan resumed`));
                  }}
                >{`Resume plan`}</Button>
              ) : (
                <Button
                  size={`sm`}
                  variant={`ghost`}
                  onClick={() => {
                    (l(true), toast(`Plan canceled – active until ${valueValue2}`));
                  }}
                >{`Cancel plan`}</Button>
              )}
            </div>
          </section>
          <section
            className={`ui-sb-card ui-sb-pay ui-as-rise`}
            style={
              {
                "--i": 2,
              } as React.CSSProperties
            }
          >
            <div className={`ui-sb-pay__row`}>
              <span className={`ui-sb-visa`} aria-hidden={`true`}>{`VISA`}</span>
              <span className={`ui-sb-pay__text`}>
                <b>{`Visa •••• 4242`}</b>
                <span>{`Expires 08/2028`}</span>
              </span>
              <Button
                size={`sm`}
                variant={`secondary`}
                icon={<Icon icon={valueValue} size={14} />}
                onClick={() => toast(`Payment method updated`)}
              >{`Update`}</Button>
            </div>
            <div className={`ui-sb-pay__row`}>
              <span className={`ui-sb-tile`} aria-hidden={`true`}>
                <Icon icon={valueValue11} size={15} />
              </span>
              {f === null ? (
                <>
                  <span className={`ui-sb-pay__text`}>
                    <b>{u}</b>
                    <span>{`Invoices and receipts go here`}</span>
                  </span>
                  <Button size={`sm`} variant={`secondary`} onClick={() => p(u)}>{`Edit`}</Button>
                </>
              ) : (
                <form
                  className={`ui-sb-inline`}
                  onSubmit={(t) => {
                    (t.preventDefault(),
                      f?.includes(`@`) && (d(f.trim()), p(null), toast(`Billing email updated`)));
                  }}
                >
                  <input
                    className={`ui-sb-input`}
                    type={`email`}
                    autoFocus={true}
                    value={f}
                    aria-label={`Billing email`}
                    onChange={(e) => p(e.target.value)}
                    onKeyDown={(e) => e.key === `Escape` && p(null)}
                  />
                  <Button size={`sm`} type={`submit`} disabled={!f.includes(`@`)}>{`Save`}</Button>
                  <Button
                    size={`sm`}
                    variant={`ghost`}
                    type={`button`}
                    onClick={() => p(null)}
                  >{`Cancel`}</Button>
                </form>
              )}
            </div>
          </section>
        </div>
      </div>
      <section ref={m} className={`ui-sb-section`}>
        <div className={`ui-sb-section__head`}>
          <div>
            <h2 className={`ui-sb-h2`}>{`Plans`}</h2>
            <p className={`ui-sb-muted`}>{`Switch any time – we prorate the difference.`}</p>
          </div>
          <SegmentedControl
            size={`sm`}
            aria-label={`Billing period`}
            value={r}
            onChange={s}
            options={[
              {
                value: `monthly`,
                label: `Monthly`,
              },
              {
                value: `yearly`,
                label: `Yearly`,
                badge: `−20%`,
              },
            ]}
          />
        </div>
        <div className={`ui-sb-plans`}>
          {ValueValue5.map((a, o) => {
            let s = a.id === t.id && r === t.cycle,
              c = a.id === t.id ? `Switch to ${r}` : `Switch to ${a.name}`;
            return (
              <div
                className={`ui-sb-card ui-sb-tier ui-as-rise`}
                data-current={a.id === t.id || void 0}
                style={
                  {
                    "--i": o,
                  } as React.CSSProperties
                }
                key={a.id}
              >
                <div className={`ui-sb-tier__top`}>
                  <b>{a.name}</b>
                  {a.id === t.id && <span className={`ui-sb-pill`}>{`Current`}</span>}
                </div>
                <div className={`ui-sb-tier__price`}>
                  <strong key={r}>
                    {`$`}
                    {r === `monthly` ? a.monthly : a.yearly}
                  </strong>
                  <span>
                    {`/ month`}
                    {r === `yearly` ? `, billed yearly` : ``}
                  </span>
                </div>
                <p className={`ui-sb-muted`}>{a.blurb}</p>
                <ul className={`ui-sb-tier__list`}>
                  {a.features.map((e) => (
                    <li key={e}>
                      <Icon icon={CheckIcon} size={14} />
                      {e}
                    </li>
                  ))}
                </ul>
                <Button
                  size={`sm`}
                  variant={s ? `secondary` : a.id === `team` ? `primary` : `secondary`}
                  disabled={s}
                  onClick={() => {
                    (n({
                      id: a.id,
                      cycle: r,
                    }),
                      l(false),
                      toast(`Switched to ${a.name} · ${r}`));
                  }}
                >
                  {s ? `Current plan` : c}
                </Button>
              </div>
            );
          })}
        </div>
      </section>
      <section className={`ui-sb-section`}>
        <div className={`ui-sb-section__head`}>
          <h2 className={`ui-sb-h2`}>{`Invoices`}</h2>
          <Button
            size={`sm`}
            variant={`secondary`}
            icon={<Icon icon={valueValue9} size={14} />}
            onClick={() => toast(`Downloading all invoices`)}
          >{`Download all`}</Button>
        </div>
        <div className={`ui-sb-table-wrap`}>
          <table className={`ui-sb-table`}>
            <thead>
              <tr>
                <th>{`Date`}</th>
                <th>{`Invoice`}</th>
                <th className={`ui-sb-num`}>{`Amount`}</th>
                <th>{`Status`}</th>
                <th aria-label={`Download`} />
              </tr>
            </thead>
            <tbody>
              {ValueValue6.map((t) => (
                <tr key={t.id}>
                  <td>{t.date}</td>
                  <td className={`ui-sb-mono`}>{t.id}</td>
                  <td className={`ui-sb-num`}>{t.amount}</td>
                  <td>
                    <span
                      className={`ui-sb-pill`}
                      data-tone={t.status === `Paid` ? `green` : `amber`}
                    >
                      {t.status}
                    </span>
                  </td>
                  <td className={`ui-sb-end`}>
                    <ToolButton
                      icon={valueValue9}
                      label={`Download ${t.id}`}
                      onClick={() => toast(`Downloaded ${t.id}.pdf`)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
function ValueValue14({
  workspace: workspace,
  toast: toast,
}: {
  workspace: string;
  toast: (message: string) => void;
}) {
  let n = React.useRef({
      name: workspace,
      region: `eu`,
    }),
    [r, a] = React.useState<string>(workspace),
    [o, s] = React.useState<string>(`eu`),
    c = r.trim() !== n.current.name || o !== n.current.region;
  return (
    <form
      className={`ui-sb-tray ui-sb-form ui-as-rise`}
      onSubmit={(e) => {
        (e.preventDefault(),
          c &&
            r.trim() &&
            ((n.current = {
              name: r.trim(),
              region: o,
            }),
            a(r.trim()),
            toast(`Workspace settings saved`)));
      }}
    >
      <div className={`ui-sb-card ui-sb-form__fields`}>
        <div className={`ui-sb-field`}>
          <span className={`ui-sb-field__label`}>
            <b>{`Logo`}</b>
            <span>{`Shown in the sidebar and on invites. Square, at least 128 px.`}</span>
          </span>
          <div className={`ui-sb-logo-row`}>
            <span className={`ui-sb-logo`}>{(r.trim() || `A`)[0].toUpperCase()}</span>
            <Button
              type={`button`}
              size={`sm`}
              variant={`secondary`}
              icon={<Icon icon={ValueValue} size={14} />}
              onClick={() => toast(`Logo uploaded`)}
            >{`Upload`}</Button>
          </div>
        </div>
        <label className={`ui-sb-field`}>
          <span className={`ui-sb-field__label`}>
            <b>{`Workspace name`}</b>
            <span>{`Your team sees this name everywhere.`}</span>
          </span>
          <input className={`ui-sb-input`} value={r} onChange={(e) => a(e.target.value)} />
        </label>
        <div className={`ui-sb-field`}>
          <span className={`ui-sb-field__label`}>
            <b>{`Data region`}</b>
            <span>{`Where chats, files and embeddings are stored.`}</span>
          </span>
          <div>
            <SelectMenu
              value={o}
              options={ValueValue10}
              onChange={s}
              icon={valueValue10}
              align={`start`}
            />
          </div>
        </div>
      </div>
      <div className={`ui-sb-form__foot`}>
        <Button
          type={`button`}
          size={`sm`}
          variant={`ghost`}
          disabled={!c}
          onClick={() => (a(n.current.name), s(n.current.region))}
        >{`Discard`}</Button>
        <Button type={`submit`} size={`sm`} disabled={!c || !r.trim()}>{`Save changes`}</Button>
      </div>
    </form>
  );
}
function ValueValue15({ toast: toast }: { toast: (message: string) => void }) {
  let [t, n] = React.useState<BillingMember[]>(ValueValue7),
    [r, a] = React.useState<boolean>(false),
    [o, s] = React.useState<string>(``),
    c = /^\S+@\S+\.\S+$/.test(o.trim());
  return (
    <section className={`ui-sb-section ui-sb-section--first`}>
      <div className={`ui-sb-section__head`}>
        <div>
          <h2 className={`ui-sb-h2`}>{`Members`}</h2>
          <p className={`ui-sb-muted`}>
            {t.length}
            {` of 10 seats used`}
          </p>
        </div>
        <span className={`ui-as-anchor`}>
          <Button
            size={`sm`}
            icon={<Icon icon={valueValue13} size={14} />}
            onClick={() => a((e) => !e)}
          >{`Invite`}</Button>
          <Popover
            open={r}
            onClose={() => a(false)}
            align={`end`}
            className={`ui-as-menu ui-sb-invite`}
          >
            <form
              onSubmit={(t) => {
                if ((t.preventDefault(), !c)) return;
                let r = o.trim();
                (n((e) => [
                  ...e,
                  {
                    id: `m${Date.now()}`,
                    name: r.split(`@`)[0],
                    email: r,
                    role: `Member`,
                    invited: true,
                  },
                ]),
                  s(``),
                  a(false),
                  toast(`Invite sent to ${r}`));
              }}
            >
              <b>{`Invite a teammate`}</b>
              <span>{`They get an email with a link to join.`}</span>
              <input
                className={`ui-sb-input`}
                autoFocus={true}
                type={`email`}
                value={o}
                placeholder={`name@company.com`}
                aria-label={`Email address`}
                onChange={(e) => s(e.target.value)}
              />
              <Button size={`sm`} type={`submit`} disabled={!c}>{`Send invite`}</Button>
            </form>
          </Popover>
        </span>
      </div>
      <div className={`ui-sb-tray`}>
        <div className={`ui-sb-tray__head`} aria-hidden={`true`}>
          <span>{`Member`}</span>
          <span className={`ui-sb-tray__end`}>{`Role`}</span>
        </div>
        <div className={`ui-sb-card ui-sb-list`}>
          {t.map((t, r) => (
            <div
              className={`ui-sb-row ui-as-rise`}
              style={
                {
                  "--i": r,
                } as React.CSSProperties
              }
              key={t.id}
            >
              <span className={`ui-sb-avatar`} data-tone={r % 4}>
                {valueValue3(t.name)}
              </span>
              <span className={`ui-sb-row__text`}>
                <b>
                  {t.name}
                  {t.invited && <span className={`ui-sb-pill`}>{`Invited`}</span>}
                </b>
                <span>{t.email}</span>
              </span>
              {t.role === `Owner` ? (
                <span className={`ui-sb-role`}>{`Owner`}</span>
              ) : (
                <SelectMenu
                  value={t.role}
                  options={ValueValue8}
                  onChange={(r: string) => {
                    (n((e) =>
                      e.map((e) =>
                        e.id === t.id
                          ? {
                              ...e,
                              role: r,
                            }
                          : e,
                      ),
                    ),
                      toast(`${t.name} is now ${r.toLowerCase() === `admin` ? `an` : `a`} ${r}`));
                  }}
                />
              )}
              {t.role === `Owner` ? (
                <span className={`ui-sb-row__spacer`} />
              ) : (
                <DropdownMenu
                  align={`end`}
                  items={[
                    ...(t.invited
                      ? [
                          {
                            label: `Resend invite`,
                            icon: valueValue11,
                            onSelect: () => toast(`Invite resent to ${t.email}`),
                          },
                        ]
                      : []),
                    {
                      label: t.invited ? `Revoke invite` : `Remove from workspace`,
                      icon: valueValue8,
                      danger: true,
                      onSelect: () => {
                        (n((e) => e.filter((e) => e.id !== t.id)),
                          toast(t.invited ? `Invite to ${t.email} revoked` : `${t.name} removed`));
                      },
                    },
                  ]}
                  trigger={({ open: open, toggle: toggle }) => (
                    <button
                      type={`button`}
                      className={`ui-as-tool`}
                      aria-label={`More for ${t.name}`}
                      aria-expanded={open}
                      onClick={toggle}
                    >
                      <Icon icon={valueValue12} size={15} />
                    </button>
                  )}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
function ValueValue16({ toast: toast }: { toast: (message: string) => void }) {
  let [t, n] = React.useState(ValueValue9),
    r = () => {
      let r = t.length + 1,
        i = `sk-live-${Array.from(
          {
            length: 20,
          },
          () => `0123456789abcdefABCDEFxyz`[Math.floor(Math.random() * 25)],
        ).join(``)}`;
      (n((e) => [
        {
          id: `k${Date.now()}`,
          name: `New key ${r}`,
          secret: i,
          created: `Just now`,
          lastUsed: `Never`,
        },
        ...e,
      ]),
        toast(`API key created`));
    },
    a = (t: (typeof ValueValue9)[number]) => {
      (navigator.clipboard?.writeText(t.secret).catch(() => {}), toast(`${t.name} key copied`));
    };
  return (
    <section className={`ui-sb-section ui-sb-section--first`}>
      <div className={`ui-sb-section__head`}>
        <div>
          <h2 className={`ui-sb-h2`}>{`API keys`}</h2>
          <p
            className={`ui-sb-muted`}
          >{`Keys give full access to this workspace – keep them secret.`}</p>
        </div>
        <Button
          size={`sm`}
          icon={<Icon icon={PlusIcon} size={14} />}
          onClick={r}
        >{`Create key`}</Button>
      </div>
      {t.length === 0 ? (
        <div className={`ui-as-rise`}>
          <EmptyState
            title={`No API keys`}
            text={`Create a key to call the API from your own code.`}
          />
        </div>
      ) : (
        <div className={`ui-sb-tray`}>
          <div className={`ui-sb-tray__head`} aria-hidden={`true`}>
            <span>{`Name`}</span>
            <span className={`ui-sb-tray__end ui-sb-tray__end--key`}>{`Key`}</span>
          </div>
          <div className={`ui-sb-card ui-sb-list`}>
            {t.map((t, r) => (
              <div
                className={`ui-sb-row ui-as-rise`}
                style={
                  {
                    "--i": r,
                  } as React.CSSProperties
                }
                key={t.id}
              >
                <span className={`ui-sb-tile`} aria-hidden={`true`}>
                  <Icon icon={ValueValue2} size={15} />
                </span>
                <span className={`ui-sb-row__text`}>
                  <b>{t.name}</b>
                  <span>
                    {`Created `}
                    {t.created}
                    {` · last used `}
                    {t.lastUsed}
                  </span>
                </span>
                <code className={`ui-sb-key`}>{ValueValue12(t.secret)}</code>
                <ToolButton icon={valueValue7} label={`Copy ${t.name} key`} onClick={() => a(t)} />
                <button
                  type={`button`}
                  className={`ui-as-tool ui-sb-danger`}
                  aria-label={`Revoke ${t.name} key`}
                  title={`Revoke`}
                  onClick={() => {
                    (n((e) => e.filter((e) => e.id !== t.id)), toast(`${t.name} key revoked`));
                  }}
                >
                  <Icon icon={valueValue8} size={15} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
var valueValue4 = `
/* Settings & Billing – a centered column of white cards on the panel */
.ui-sb {
  width: min(1040px, calc(100% - 64px));
  margin: 0 auto;
  padding: 40px 0 64px;
}
.ui-sb__bar {
  position: sticky;
  top: 0;
  z-index: 5;
  margin: 10px -16px 0;
  padding: 18px 16px 12px;
  background: var(--panel);
}
/* Soft fade below the bar, so content dissolves instead of being cut by a line */
.ui-sb__bar::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: 100%;
  height: 24px;
  background: linear-gradient(to bottom, var(--panel), transparent);
  pointer-events: none;
}
.ui-sb__body { margin-top: 14px; }

.ui-sb-card {
  border-radius: 14px;
  background: var(--card);
  box-shadow: 0 0 0 1px var(--line), var(--shadow);
}
.ui-sb-cap { font-size: 13px; color: var(--muted); }
.ui-sb-muted { margin: 0; font-size: 13px; line-height: 19px; color: var(--muted); }
.ui-sb-h2 { margin: 0; font-size: 15px; line-height: 20px; font-weight: 500; color: var(--ink); }
.ui-sb-actions { display: flex; align-items: center; gap: 6px; }

/* Small status pills: neutral, green (paid, active), amber (due, canceling) */
.ui-sb-pill {
  display: inline-flex;
  align-items: center;
  height: 20px;
  padding: 0 7px;
  border-radius: 999px;
  background: var(--chip);
  font-size: 11.5px;
  font-weight: 500;
  line-height: 1;
  color: var(--text);
  white-space: nowrap;
}
.ui-sb-pill[data-tone="green"] { background: #ecfdf3; color: #15803d; }
.ui-sb-pill[data-tone="amber"] { background: #fff7e6; color: #b45309; }
:where(.dark, [data-theme="dark"]) .ui-sb-pill[data-tone="green"] { background: rgba(34, 197, 94, 0.14); color: #4ade80; }
:where(.dark, [data-theme="dark"]) .ui-sb-pill[data-tone="amber"] { background: rgba(245, 158, 11, 0.14); color: #fbbf24; }

/* Overview: usage across the full width, plan and payment side by side below */
.ui-sb-overview { display: grid; gap: 16px; }
.ui-sb-stack { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 16px; align-items: stretch; }
.ui-sb-usage .ui-um { max-width: none; }

/* Wide: the meter in two columns so it stays low – figure, bar and categories left; daily bars and limits right */
@container ui-as-main (min-width: 901px) {
  .ui-sb-usage .ui-um__inner {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    column-gap: 40px;
    padding: 16px 20px 18px;
  }
  .ui-sb-usage .ui-um__head { grid-column: 1; grid-row: 1; }
  .ui-sb-usage .ui-um__figure { grid-column: 1; grid-row: 2; }
  .ui-sb-usage .ui-um__bar { grid-column: 1; grid-row: 3; }
  .ui-sb-usage .ui-um__legend { grid-column: 1; grid-row: 4; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); column-gap: 24px; }
  .ui-sb-usage .ui-um__daily { grid-column: 2; grid-row: 1 / span 3; align-self: end; margin-top: 0; }
  .ui-sb-usage .ui-um__daily .ui-um__spark { height: 64px; }
  .ui-sb-usage .ui-um__limits { grid-column: 2; grid-row: 4; align-self: start; margin-top: 10px; }
}

.ui-sb-plan { display: grid; gap: 8px; padding: 16px 18px 18px; }
.ui-sb-plan__top { display: flex; align-items: center; justify-content: space-between; }
.ui-sb-plan__name { font-size: 22px; line-height: 28px; font-weight: 500; letter-spacing: -0.02em; color: var(--ink); }
.ui-sb-plan__name span { color: var(--muted); font-weight: 400; }
.ui-sb-plan .ui-sb-actions { margin-top: 8px; }

.ui-sb-pay { display: grid; padding: 4px 18px; }
.ui-sb-pay__row { display: flex; align-items: center; gap: 12px; min-height: 64px; }
.ui-sb-pay__row + .ui-sb-pay__row { border-top: 1px solid var(--line-soft); }
.ui-sb-pay__text { display: grid; flex: 1; gap: 2px; min-width: 0; }
.ui-sb-pay__text b, .ui-sb-row__text b { display: flex; align-items: center; gap: 8px; overflow: hidden; font-size: 13.5px; line-height: 19px; font-weight: 500; color: var(--ink); white-space: nowrap; text-overflow: ellipsis; }
.ui-sb-pay__text span, .ui-sb-row__text > span { overflow: hidden; font-size: 12.5px; line-height: 17px; color: var(--muted); white-space: nowrap; text-overflow: ellipsis; }
.ui-sb-visa {
  display: grid;
  place-items: center;
  flex: none;
  width: 42px;
  height: 28px;
  border-radius: 6px;
  background: #1a1f71;
  font-size: 11px;
  font-style: italic;
  font-weight: 800;
  letter-spacing: 0.02em;
  color: #ffffff;
}
.ui-sb-tile {
  display: grid;
  place-items: center;
  flex: none;
  width: 32px;
  height: 32px;
  border-radius: 9px;
  background: var(--chip);
  color: var(--muted);
}
.ui-sb-pay .ui-sb-tile { width: 42px; height: 28px; border-radius: 6px; }
.ui-sb-inline { display: flex; flex: 1; align-items: center; gap: 6px; min-width: 0; }
.ui-sb-inline .ui-sb-input { flex: 1; min-width: 0; }

.ui-sb-input {
  height: 34px;
  padding: 0 10px;
  border: 0;
  border-radius: 9px;
  background: var(--card);
  box-shadow: 0 0 0 1px var(--line);
  font: inherit;
  font-size: 13px;
  color: var(--ink);
  outline: none;
  transition: box-shadow 140ms ease;
}
.ui-sb-input::placeholder { color: var(--placeholder); }
.ui-sb-input:focus { box-shadow: 0 0 0 1px var(--line-strong), 0 0 0 3px var(--hover); }

/* Sections below the overview */
.ui-sb-section { margin-top: 40px; scroll-margin-top: 72px; }
.ui-sb-section--first { margin-top: 10px; }
.ui-sb-section__head { display: flex; align-items: flex-end; justify-content: space-between; gap: 16px; margin-bottom: 14px; }
.ui-sb-section__head .ui-sb-muted { margin-top: 2px; }

.ui-sb-plans { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; }
.ui-sb-tier { display: flex; flex-direction: column; gap: 10px; padding: 16px 18px 18px; }
/* Current plan: a darker gray hairline with a wider soft gray halo around it – highlighted, still quiet */
.ui-sb-tier[data-current] {
  box-shadow:
    0 0 0 1px color-mix(in srgb, var(--ink) 22%, transparent),
    0 0 0 5px color-mix(in srgb, var(--ink) 6%, transparent),
    var(--shadow);
}
.ui-sb-tier__top { display: flex; align-items: center; justify-content: space-between; height: 20px; }
.ui-sb-tier__top b { font-size: 14px; font-weight: 500; color: var(--ink); }
.ui-sb-tier__price { display: flex; align-items: baseline; gap: 6px; }
.ui-sb-tier__price strong { font-size: 26px; line-height: 32px; font-weight: 500; letter-spacing: -0.02em; color: var(--ink); font-variant-numeric: tabular-nums; animation: ui-as-rise 360ms var(--ease) both; }
.ui-sb-tier__price span { font-size: 12.5px; color: var(--muted); }
.ui-sb-tier__list { display: grid; gap: 7px; flex: 1; margin: 4px 0 6px; padding: 12px 0 0; border-top: 1px solid var(--line-soft); list-style: none; }
.ui-sb-tier__list li { display: flex; align-items: center; gap: 8px; font-size: 13px; color: var(--text); }
.ui-sb-tier__list svg { color: var(--muted); }
.ui-sb-tier .ui-button { width: 100%; }

/* Invoices: a plain table in a card */
/* Invoices: the header row sits on a gray tray, the rows in a white card inside it */
.ui-sb-table-wrap { overflow-x: auto; padding: 0 4px 4px; border-radius: 18px; background: var(--tray); }
.ui-sb-table { width: 100%; border-collapse: separate; border-spacing: 0; font-size: 13px; }
.ui-sb-table th {
  height: 38px;
  padding: 0 18px;
  font-size: 12px;
  font-weight: 500;
  color: var(--muted);
  text-align: left;
  white-space: nowrap;
}
.ui-sb-table td { height: 52px; padding: 0 18px; background: var(--card); color: var(--text); white-space: nowrap; transition: background-color 140ms ease; }
.ui-sb-table tbody tr + tr td { border-top: 1px solid var(--line-soft); }
.ui-sb-table tbody tr:first-child td { border-top: 1px solid var(--line); }
.ui-sb-table tbody tr:last-child td { border-bottom: 1px solid var(--line); }
.ui-sb-table tbody td:first-child { border-left: 1px solid var(--line); }
.ui-sb-table tbody td:last-child { border-right: 1px solid var(--line); }
.ui-sb-table tbody tr:first-child td:first-child { border-top-left-radius: 14px; }
.ui-sb-table tbody tr:first-child td:last-child { border-top-right-radius: 14px; }
.ui-sb-table tbody tr:last-child td:first-child { border-bottom-left-radius: 14px; }
.ui-sb-table tbody tr:last-child td:last-child { border-bottom-right-radius: 14px; }
.ui-sb-table tbody tr:hover td { background: var(--subtle); }
.ui-sb-table .ui-sb-num { text-align: right; font-variant-numeric: tabular-nums; }
.ui-sb-table td.ui-sb-num { color: var(--ink); }
.ui-sb-table .ui-sb-end { width: 1%; padding-right: 12px; }
.ui-sb-mono { font-variant-numeric: tabular-nums; color: var(--muted) !important; }

/* General: label on the left, control on the right */
/* Gray tray around a white card, like the library components: column labels or actions sit on the gray */
.ui-sb-tray { padding: 0 4px 4px; border-radius: 18px; background: var(--tray); }
.ui-sb-tray > .ui-sb-card { box-shadow: 0 0 0 1px var(--line); }
.ui-sb-tray__head { display: flex; align-items: center; justify-content: space-between; height: 38px; padding: 0 18px; font-size: 12px; font-weight: 500; color: var(--muted); }
.ui-sb-tray__end { padding-right: 44px; }
.ui-sb-tray__end--key { padding-right: 258px; }

.ui-sb-form { display: grid; padding: 4px; }
.ui-sb-form__fields { padding: 4px 22px; }
.ui-sb-field { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 24px; align-items: center; padding: 20px 0; }
.ui-sb-field + .ui-sb-field { border-top: 1px solid var(--line-soft); }
.ui-sb-field__label { display: grid; gap: 3px; }
.ui-sb-field__label b { font-size: 13.5px; font-weight: 500; color: var(--ink); }
.ui-sb-field__label span { font-size: 12.5px; line-height: 17px; color: var(--muted); }
.ui-sb-logo-row { display: flex; align-items: center; gap: 12px; }
.ui-sb-logo {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: var(--ink);
  font-size: 18px;
  font-weight: 600;
  color: var(--on-ink);
}
.ui-sb-form__foot { display: flex; justify-content: flex-end; gap: 6px; padding: 6px 2px 2px; }

/* Members and API keys: rows in one card */
.ui-sb-list { display: grid; padding: 4px 8px; }
.ui-sb-row { display: flex; align-items: center; gap: 12px; min-height: 60px; padding: 0 10px; }
.ui-sb-row + .ui-sb-row { border-top: 1px solid var(--line-soft); }
.ui-sb-row__text { display: grid; flex: 1; gap: 2px; min-width: 0; }
.ui-sb-row__spacer { width: 32px; flex: none; }
.ui-sb-role { padding: 0 10px; font-size: 13px; color: var(--muted); }
.ui-sb-avatar {
  display: grid;
  place-items: center;
  flex: none;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #eef3ff;
  font-size: 12px;
  font-weight: 500;
  color: #3756d9;
}
.ui-sb-avatar[data-tone="1"] { background: #fdf2f8; color: #be185d; }
.ui-sb-avatar[data-tone="2"] { background: #ecfdf3; color: #15803d; }
.ui-sb-avatar[data-tone="3"] { background: #fff7e6; color: #b45309; }
:where(.dark, [data-theme="dark"]) .ui-sb-avatar { background: rgba(109, 139, 255, 0.16); color: #a5b8ff; }
:where(.dark, [data-theme="dark"]) .ui-sb-avatar[data-tone="1"] { background: rgba(236, 72, 153, 0.16); color: #f9a8d4; }
:where(.dark, [data-theme="dark"]) .ui-sb-avatar[data-tone="2"] { background: rgba(34, 197, 94, 0.14); color: #86efac; }
:where(.dark, [data-theme="dark"]) .ui-sb-avatar[data-tone="3"] { background: rgba(245, 158, 11, 0.14); color: #fcd34d; }
.ui-sb-key {
  padding: 5px 9px;
  border-radius: 8px;
  background: var(--chip);
  font-family: ui-monospace, "SF Mono", Menlo, monospace;
  font-size: 12px;
  color: var(--text);
  white-space: nowrap;
}
.ui-sb-danger:hover { color: #dc2626; }
.ui-sb-danger:hover svg { color: #dc2626; }

.ui-sb-invite { width: 280px; padding: 14px; }
.ui-sb-invite form { display: grid; gap: 6px; }
.ui-sb-invite b { font-size: 13.5px; font-weight: 500; color: var(--ink); }
.ui-sb-invite span { font-size: 12.5px; color: var(--muted); }
.ui-sb-invite .ui-sb-input { margin: 6px 0 4px; }

/* Narrower panels: overview and plans stack, fields put the label above */
@container ui-as-main (max-width: 900px) {
  .ui-sb-stack { grid-template-columns: minmax(0, 1fr); }
  .ui-sb-plans { grid-template-columns: minmax(0, 1fr); }
}
@container ui-as-main (max-width: 640px) {
  .ui-sb-field { grid-template-columns: minmax(0, 1fr); gap: 10px; }
  .ui-sb-key, .ui-sb-tray__end--key { display: none; }
  .ui-sb-section__head { flex-wrap: wrap; align-items: flex-start; }
}
@container ui-as (max-width: 900px) {
  .ui-sb { width: calc(100% - 48px); }
}
@container ui-as (max-width: 600px) {
  .ui-sb { width: calc(100% - 32px); padding: 52px 0 48px; }
  .ui-sb__bar { margin: 6px -12px 0; padding: 14px 12px 10px; overflow-x: auto; }
  .ui-sb-pay { padding: 4px 14px; }
  .ui-sb-pay__row { flex-wrap: wrap; padding: 12px 0; }
  .ui-sb-form__fields { padding: 4px 16px; }
  .ui-sb-tray__end { display: none; }
}
`;
function SettingsBillingDemo2() {
  return (
    <PreviewFrame>
      <SettingsBilling onNavigate={navigateScreen} />
    </PreviewFrame>
  );
}
function FullScreen(props: Record<string, never>) {
  return (
    <ScreenFrameModeContext.Provider value={true}>
      <SettingsBillingDemo2 {...props} />
    </ScreenFrameModeContext.Provider>
  );
}
const demoStyles = "";
function SettingsBillingDemo(props: Record<string, never>) {
  return (
    <>
      <style href="plico-demo-settings-billing" precedence="default">
        {demoStyles}
      </style>
      <SettingsBillingDemo2 {...props} />
    </>
  );
}
export { SettingsBilling as Component };
export { SettingsBillingDemo as Demo };
export { FullScreen };
export { SettingsBilling };
export { SettingsBillingDemo };
export default SettingsBilling;

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
type OnboardingValues = {workspace: string; slug: string; teamSize: string; tools: string[]; invites: string[]; role: string; template: string};
interface SegmentOption {value: string; label?: React.ReactNode; icon?: React.ReactNode; count?: React.ReactNode; badge?: React.ReactNode; disabled?: boolean; controls?: string; ariaLabel?: string}
interface SegmentedControlProps {options: SegmentOption[]; value?: string; defaultValue?: string; onChange?: (value: string) => void; size?: string; variant?: string; fullWidth?: boolean; kind?: string; disabled?: boolean; "aria-label"?: string; "aria-labelledby"?: string; className?: string}
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
interface OnboardingProps extends AppShellProps {
  defaultStep?: 1 | 2 | 3 | 4;
  onComplete?: (values: OnboardingValues) => void;
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
    pointerRef = React.useRef<{id: number; touch: boolean; drag: boolean; x: number; moved: boolean} | null>(null),
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
      e.querySelectorAll(`.ui-seg__opt, .ui-seg__content`).forEach((e) => a.observe(e)),
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
}: {value: string; options: {value: string; label: string}[]; onChange: (value: string) => void; icon?: IconNode; align?: PopoverAlign; className?: string}) {
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
  let [message, setMessage] = React.useState<{id: number; text: string} | null>(null);
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
      (e: string) => setMessage({
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
var valueValue10: IconNode = [
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
var valueValue11: IconNode = [
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
var valueValue12: IconNode = [
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
var valueValue13: IconNode = [
  [
    `path`,
    {
      d: `M9.14339 10.691L9.35031 10.4841C11.329 8.50532 14.5372 8.50532 16.5159 10.4841C18.4947 12.4628 18.4947 15.671 16.5159 17.6497L13.6497 20.5159C11.671 22.4947 8.46279 22.4947 6.48405 20.5159C4.50532 18.5372 4.50532 15.329 6.48405 13.3503L6.9484 12.886`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeWidth: `1.5`,
      key: `0`,
    },
  ],
  [
    `path`,
    {
      d: `M17.0516 11.114L17.5159 10.6497C19.4947 8.67095 19.4947 5.46279 17.5159 3.48405C15.5372 1.50532 12.329 1.50532 10.3503 3.48405L7.48405 6.35031C5.50532 8.32904 5.50532 11.5372 7.48405 13.5159C9.46279 15.4947 12.671 15.4947 14.6497 13.5159L14.8566 13.309`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeWidth: `1.5`,
      key: `1`,
    },
  ],
];
var valueValue: IconNode = [
  [
    `path`,
    {
      d: `M15 6C15 6 9.00001 10.4189 9 12C8.99999 13.5812 15 18 15 18`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `0`,
    },
  ],
];
var ViewB: IconNode = [
  [
    `path`,
    {
      d: `M17 10.8045C17 10.4588 17 10.286 17.052 10.132C17.2032 9.68444 17.6018 9.51076 18.0011 9.32888C18.45 9.12442 18.6744 9.02219 18.8968 9.0042C19.1493 8.98378 19.4022 9.03818 19.618 9.15929C19.9041 9.31984 20.1036 9.62493 20.3079 9.87302C21.2513 11.0188 21.7229 11.5918 21.8955 12.2236C22.0348 12.7334 22.0348 13.2666 21.8955 13.7764C21.6438 14.6979 20.8485 15.4704 20.2598 16.1854C19.9587 16.5511 19.8081 16.734 19.618 16.8407C19.4022 16.9618 19.1493 17.0162 18.8968 16.9958C18.6744 16.9778 18.45 16.8756 18.0011 16.6711C17.6018 16.4892 17.2032 16.3156 17.052 15.868C17 15.714 17 15.5412 17 15.1955V10.8045Z`,
      stroke: `currentColor`,
      strokeWidth: `1.5`,
      key: `0`,
    },
  ],
  [
    `path`,
    {
      d: `M7 10.8046C7 10.3694 6.98778 9.97821 6.63591 9.6722C6.50793 9.5609 6.33825 9.48361 5.99891 9.32905C5.55001 9.12458 5.32556 9.02235 5.10316 9.00436C4.43591 8.9504 4.07692 9.40581 3.69213 9.87318C2.74875 11.019 2.27706 11.5919 2.10446 12.2237C1.96518 12.7336 1.96518 13.2668 2.10446 13.7766C2.3562 14.6981 3.15152 15.4705 3.74021 16.1856C4.11129 16.6363 4.46577 17.0475 5.10316 16.996C5.32556 16.978 5.55001 16.8757 5.99891 16.6713C6.33825 16.5167 6.50793 16.4394 6.63591 16.3281C6.98778 16.0221 7 15.631 7 15.1957V10.8046Z`,
      stroke: `currentColor`,
      strokeWidth: `1.5`,
      key: `1`,
    },
  ],
  [
    `path`,
    {
      d: `M5 9C5 5.68629 8.13401 3 12 3C15.866 3 19 5.68629 19 9`,
      stroke: `currentColor`,
      strokeLinecap: `square`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `2`,
    },
  ],
  [
    `path`,
    {
      d: `M19 17V17.8C19 19.5673 17.2091 21 15 21H13`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `3`,
    },
  ],
];
var valueValue2: IconNode = [
  [
    `path`,
    {
      d: `M11.5 13.5C11.1446 13.5097 10.8134 13.5226 10.5008 13.5379C6.8 13.7193 3.78417 16.8058 3.5 20.5002`,
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
      d: `M20.5 21.5L19 20M19.5 17.5C19.5 15.8431 18.1569 14.5 16.5 14.5C14.8431 14.5 13.5 15.8431 13.5 17.5C13.5 19.1569 14.8431 20.5 16.5 20.5C18.1569 20.5 19.5 19.1569 19.5 17.5Z`,
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
      cx: `11.5`,
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
var valueValue3 = [
  {
    label: `Home`,
    icon: valueValue12,
  },
  {
    label: `Chat`,
    icon: valueValue9,
  },
  {
    label: `Analytics`,
    icon: valueValue8,
  },
  {
    label: `Integrations`,
    icon: GridIcon,
  },
];
var valueValue4 = [
  {
    id: `workspace`,
    short: `Workspace`,
    title: `Workspace`,
    heading: `Set up your workspace`,
    text: `Give it a name and an address your team will recognize.`,
    time: `About 1 min`,
  },
  {
    id: `tools`,
    short: `Tools`,
    title: `Connect your tools`,
    heading: `Connect your tools`,
    text: `Your agents can read from and act in the apps you connect. Change this anytime.`,
    time: `About 1 min`,
  },
  {
    id: `team`,
    short: `Team`,
    title: `Invite your team`,
    heading: `Invite your team`,
    text: `Work together on chats, folders and agents. They'll get an email invite.`,
    time: `Under a minute`,
  },
  {
    id: `agent`,
    short: `Agent`,
    title: `Your first agent`,
    heading: `Create your first agent`,
    text: `Start from a template – you can change its instructions and tools later.`,
    time: `About 1 min`,
  },
];
var ValueValue = (e: string | undefined, t: string | undefined) => (
  <svg viewBox={`0 0 24 24`} fill={t} aria-hidden={`true`}>
    <path d={e} />
  </svg>
);
const View_InlineView = () => (
  <svg viewBox={`0 0 24 24`} aria-hidden={`true`}>
    <path
      fill={`#E01E5A`}
      d={`M5.04 15.17a2.53 2.53 0 0 1-2.52 2.52A2.53 2.53 0 0 1 0 15.17a2.53 2.53 0 0 1 2.52-2.53h2.52zm1.27 0a2.53 2.53 0 0 1 2.53-2.53 2.53 2.53 0 0 1 2.52 2.53v6.31A2.53 2.53 0 0 1 8.84 24a2.53 2.53 0 0 1-2.53-2.52z`}
    />
    <path
      fill={`#36C5F0`}
      d={`M8.84 5.04a2.53 2.53 0 0 1-2.53-2.52A2.53 2.53 0 0 1 8.84 0a2.53 2.53 0 0 1 2.52 2.52v2.52zm0 1.27a2.53 2.53 0 0 1 2.52 2.53 2.53 2.53 0 0 1-2.52 2.52H2.52A2.53 2.53 0 0 1 0 8.84a2.53 2.53 0 0 1 2.52-2.53z`}
    />
    <path
      fill={`#2EB67D`}
      d={`M18.96 8.84a2.53 2.53 0 0 1 2.52-2.53A2.53 2.53 0 0 1 24 8.84a2.53 2.53 0 0 1-2.52 2.52h-2.52zm-1.27 0a2.53 2.53 0 0 1-2.53 2.52 2.53 2.53 0 0 1-2.52-2.52V2.52A2.53 2.53 0 0 1 15.16 0a2.53 2.53 0 0 1 2.53 2.52z`}
    />
    <path
      fill={`#ECB22E`}
      d={`M15.16 18.96a2.53 2.53 0 0 1 2.53 2.52A2.53 2.53 0 0 1 15.16 24a2.53 2.53 0 0 1-2.52-2.52v-2.52zm0-1.27a2.53 2.53 0 0 1-2.52-2.53 2.53 2.53 0 0 1 2.52-2.52h6.32A2.53 2.53 0 0 1 24 15.16a2.53 2.53 0 0 1-2.52 2.53z`}
    />
  </svg>
);
var valueValue5 = [
  {
    id: `slack`,
    name: `Slack`,
    description: `Ask your agents from any channel and get their reports there.`,
    logo: <View_InlineView />,
  },
  {
    id: `notion`,
    name: `Notion`,
    description: `Search pages while you chat and save answers as docs.`,
    logo: ValueValue(
      `M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.139c-.093-.514.28-.887.747-.933zM1.936 1.035l13.31-.98c1.634-.14 2.055-.047 3.082.7l4.249 2.986c.7.513.934.653.934 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.047-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.667c0-.839.374-1.54 1.447-1.632z`,
      `currentColor`,
    ),
  },
  {
    id: `google-drive`,
    name: `Google Drive`,
    description: `Pick files from Drive and let agents read them for context.`,
    logo: ValueValue(
      `M12.01 1.485c-2.082 0-3.754.02-3.743.047.01.02 1.708 3.001 3.774 6.62l3.76 6.574h3.76c2.081 0 3.753-.02 3.742-.047-.005-.02-1.708-3.001-3.775-6.62l-3.76-6.574zm-4.76 1.73a789.828 789.861 0 0 0-3.63 6.319L0 15.868l1.89 3.298 1.885 3.297 3.62-6.335 3.618-6.33-1.88-3.287C8.1 4.704 7.255 3.22 7.25 3.214zm2.259 12.653-.203.348c-.114.198-.96 1.672-1.88 3.287a423.93 423.948 0 0 1-1.698 2.97c-.01.026 3.24.042 7.222.042h7.244l1.796-3.157c.992-1.734 1.85-3.23 1.906-3.323l.104-.167h-7.249z`,
      `#1FA463`,
    ),
  },
  {
    id: `hubspot`,
    name: `HubSpot`,
    description: `Look up contacts and deals, and log what agents find.`,
    logo: ValueValue(
      `M18.164 7.93V5.084a2.198 2.198 0 001.267-1.978v-.067A2.2 2.2 0 0017.238.845h-.067a2.2 2.2 0 00-2.193 2.193v.067a2.196 2.196 0 001.252 1.973l.013.006v2.852a6.22 6.22 0 00-2.969 1.31l.012-.01-7.828-6.095A2.497 2.497 0 104.3 4.656l-.012.006 7.697 5.991a6.176 6.176 0 00-1.038 3.446c0 1.343.425 2.588 1.147 3.607l-.013-.02-2.342 2.343a1.968 1.968 0 00-.58-.095h-.002a2.033 2.033 0 102.033 2.033 1.978 1.978 0 00-.1-.595l.005.014 2.317-2.317a6.247 6.247 0 104.782-11.134l-.036-.005zm-.964 9.378a3.206 3.206 0 113.215-3.207v.002a3.206 3.206 0 01-3.207 3.207z`,
      `#FF7A59`,
    ),
  },
  {
    id: `linear`,
    name: `Linear`,
    description: `Turn requests from chat into issues and follow them to release.`,
    tile: `#5E6AD2`,
    logo: ValueValue(
      `M2.886 4.18A11.982 11.982 0 0 1 11.99 0C18.624 0 24 5.376 24 12.009c0 3.64-1.62 6.903-4.18 9.105L2.887 4.18ZM1.817 5.626l16.556 16.556c-.524.33-1.075.62-1.65.866L.951 7.277c.247-.575.537-1.126.866-1.65ZM.322 9.163l14.515 14.515c-.71.172-1.443.282-2.195.322L0 11.358a12 12 0 0 1 .322-2.195Zm-.17 4.862 9.823 9.824a12.02 12.02 0 0 1-9.824-9.824Z`,
      `#ffffff`,
    ),
  },
  {
    id: `google-calendar`,
    name: `Google Calendar`,
    description: `Schedule agent runs and prepare briefs before meetings.`,
    logo: ValueValue(
      `M18.316 5.684H24v12.632h-5.684V5.684zM5.684 24h12.632v-5.684H5.684V24zM18.316 5.684V0H1.895A1.894 1.894 0 0 0 0 1.895v16.421h5.684V5.684h12.632zm-7.207 6.25v-.065c.272-.144.5-.349.687-.617s.279-.595.279-.982c0-.379-.099-.72-.3-1.025a2.05 2.05 0 0 0-.832-.714 2.703 2.703 0 0 0-1.197-.257c-.6 0-1.094.156-1.481.467-.386.311-.65.671-.793 1.078l1.085.452c.086-.249.224-.461.413-.633.189-.172.445-.257.767-.257.33 0 .602.088.816.264a.86.86 0 0 1 .322.703c0 .33-.12.589-.36.778-.24.19-.535.284-.886.284h-.567v1.085h.633c.407 0 .748.109 1.02.327.272.218.407.499.407.843 0 .336-.129.614-.387.832s-.565.327-.924.327c-.351 0-.651-.103-.897-.311-.248-.208-.422-.502-.521-.881l-1.096.452c.178.616.505 1.082.977 1.401.472.319.984.478 1.538.477a2.84 2.84 0 0 0 1.293-.291c.382-.193.684-.458.902-.794.218-.336.327-.72.327-1.149 0-.429-.115-.797-.344-1.105a2.067 2.067 0 0 0-.881-.689zm2.093-1.931l.602.913L15 10.045v5.744h1.187V8.446h-.827l-2.158 1.557zM22.105 0h-3.289v5.184H24V1.895A1.894 1.894 0 0 0 22.105 0zm-3.289 23.5l4.684-4.684h-4.684V23.5zM0 22.105C0 23.152.848 24 1.895 24h3.289v-5.184H0v3.289z`,
      `#4285F4`,
    ),
  },
];
var ValueValue2 = [
  {
    value: `1`,
    label: `Just me`,
  },
  {
    value: `2-10`,
    label: `2–10`,
  },
  {
    value: `11-50`,
    label: `11–50`,
  },
  {
    value: `51-200`,
    label: `51–200`,
  },
  {
    value: `200+`,
    label: `200+`,
  },
];
var ValueValue3 = [
  {
    value: `member`,
    label: `Member`,
  },
  {
    value: `admin`,
    label: `Admin`,
  },
  {
    value: `viewer`,
    label: `Viewer`,
  },
];
var ValueValue4 = [
  {
    id: `weekly-report`,
    name: `Weekly report`,
    text: `Pulls numbers and updates from your tools into a short Monday summary.`,
    meta: `Every Monday`,
    icon: valueValue10,
  },
  {
    id: `lead-research`,
    name: `Lead research`,
    text: `Researches new sign-ups and adds company notes to your CRM.`,
    meta: `On new leads`,
    icon: valueValue2,
  },
  {
    id: `support-triage`,
    name: `Support triage`,
    text: `Sorts incoming requests, drafts replies and flags anything urgent.`,
    meta: `On new tickets`,
    icon: ViewB,
  },
];
var valueValue6 = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
var ValueValue5 = (e: string) =>
  e
    .toLowerCase()
    .normalize(`NFKD`)
    .replace(/[̀-ͯ]/g, ``)
    .replace(/[^a-z0-9]+/g, `-`)
    .replace(/^-+|-+$/g, ``)
    .slice(0, 32);
function Onboarding({ defaultStep = 2, onComplete: onComplete, ...n }: OnboardingProps) {
  let r = n.workspace ?? `Acme`,
    o = (n.user?.name ?? `Alex Morgan`).split(` `)[0],
    [s, c] = React.useState(defaultStep - 1),
    [u, h] = React.useState(`next`),
    [g, _] = React.useState(() =>
      Object.fromEntries(
        Array.from(
          {
            length: defaultStep - 1,
          },
          (e, t) => [t, `done`],
        ),
      ),
    ),
    [v, y] = React.useState(r),
    [x, T] = React.useState(ValueValue5(r)),
    [D, k] = React.useState(false),
    [j, M] = React.useState(`2-10`),
    [N, P] = React.useState(false),
    [F, I] = React.useState(() => new Set([`slack`])),
    [L, R] = React.useState(() => new Set()),
    [z, oe] = React.useState<string[]>([`jamie@acme.com`]),
    [B, se] = React.useState(`member`),
    [V, ce] = React.useState(`weekly-report`),
    [H, U] = React.useState(false),
    [le, ue] = useToast(),
    W = React.useRef<number[]>([]);
  React.useEffect(() => () => W.current.forEach((e) => window.clearTimeout(e)), []);
  let G = (e: TimerHandler, t: number | undefined) => W.current.push(window.setTimeout(e, t)),
    K = () => ({
      workspace: v.trim(),
      slug: x,
      teamSize: j,
      tools: [...F],
      invites: z,
      role: B,
      template: V,
    }),
    q = (e: number) => {
      e !== s && (h(e > s ? `next` : `back`), c(e));
    },
    J = (e: number, t: string) =>
      _((n) => ({
        ...n,
        [e]: t,
      })),
    de = () => {
      (J(3, `done`), onComplete?.(K()), q(4));
    },
    fe = (e: React.FormEvent<HTMLFormElement>) => {
      if ((e.preventDefault(), !H)) {
        if (s === 0 && !v.trim()) {
          P(true);
          return;
        }
        if (s === 3) {
          (U(true),
            G(() => {
              (U(false), de());
            }, 1100));
          return;
        }
        (J(s, `done`), q(s + 1));
      }
    },
    pe = () => {
      (g[s] !== `done` && J(s, `skipped`), s === 3 ? (onComplete?.(K()), q(4)) : q(s + 1));
    },
    Y = () => {
      (_({}), h(`back`), c(0));
    },
    me = (e: {id: string}) => {
      if (!L.has(e.id)) {
        if (F.has(e.id)) {
          I((t) => new Set([...t].filter((t) => t !== e.id)));
          return;
        }
        (R((t) => new Set(t).add(e.id)),
          G(() => {
            (R((t) => new Set([...t].filter((t) => t !== e.id))), I((t) => new Set(t).add(e.id)));
          }, 800));
      }
    },
    X = s === 4,
    Z = Object.values(g).filter((e) => e === `done`).length,
    Q = valueValue4[Math.min(s, 3)],
    $ = ValueValue4.find((e) => e.id === V)!,
    he = (e: number) =>
      e === 0
        ? `${v.trim() || r} · ${j === `1` ? `Just you` : `${ValueValue2.find((e) => e.value === j)?.label} people`}`
        : e === 1
          ? F.size
            ? `${F.size} ${F.size === 1 ? `tool` : `tools`} connected`
            : `No tools yet`
          : e === 2
            ? z.length
              ? `${z.length} ${z.length === 1 ? `invite` : `invites`} sent`
              : `Just you for now`
            : $.name,
    ge = s === 3 ? `Create agent` : s === 2 && z.length > 0 ? `Send invites` : `Continue`;
  return (
    <AppShell active={`Home`} nav={valueValue3} {...n}>
      <style href={`ui-onboarding`} precedence={`default`}>
        {valueValue7}
      </style>
      <div className={`ui-ob`}>
        <header className={`ui-ob-head`}>
          <span className={`ui-ob-kicker`}>
            {X ? `All set` : `Step ${s + 1} of ${valueValue4.length}`}
          </span>
          <h1 className={`ui-ob-title`}>
            {`Welcome to `}
            {v.trim() || r}
            {`, `}
            {o}
          </h1>
          <p className={`ui-ob-sub`}>
            {X
              ? `Your workspace is ready. Here's where to go next.`
              : `A few quick steps and your workspace is ready – about two minutes.`}
          </p>
          <ol className={`ui-ob-steps`} aria-label={`Onboarding progress`}>
            {valueValue4.map((e, t) => {
              let n = X || t < s ? `done` : t === s ? `current` : `next`;
              return (
                <li
                  className={`ui-ob-steps__item`}
                  data-state={n}
                  aria-current={n === `current` ? `step` : void 0}
                  key={e.id}
                >
                  <span className={`ui-ob-steps__mark`} aria-hidden={`true`}>
                    {n === `done` ? (
                      <Icon icon={CheckIcon} size={11} stroke={2.4} key={`done`} />
                    ) : (
                      t + 1
                    )}
                  </span>
                  <span className={`ui-ob-steps__label`}>
                    {e.short}
                    <span className={`ui-ob-sr`}>
                      {n === `done` ? `, done` : n === `current` ? `, current step` : ``}
                    </span>
                  </span>
                </li>
              );
            })}
          </ol>
        </header>
        <div className={`ui-ob-card`}>
          {X ? (
            <Iconie
              workspace={v.trim() || r}
              agent={$.name}
              tools={F.size}
              invites={g[2] === `done` ? z.length : 0}
              onNavigate={n.onNavigate}
              onRestart={Y}
              key={`done`}
            />
          ) : (
            <form className={`ui-ob-form`} onSubmit={fe} noValidate={true}>
              <div className={`ui-ob-step`} data-dir={u} key={s}>
                <div className={`ui-ob-step__head`}>
                  <h2 className={`ui-ob-step__title`}>{Q.heading}</h2>
                  <p className={`ui-ob-step__text`}>{Q.text}</p>
                </div>
                {s === 0 && (
                  <div className={`ui-ob-fields`}>
                    <label className={`ui-ob-field`}>
                      <span className={`ui-ob-label`}>{`Workspace name`}</span>
                      <input
                        className={`ui-ob-input`}
                        value={v}
                        aria-invalid={N || void 0}
                        placeholder={`e.g. Acme`}
                        onChange={(e) => {
                          (y(e.target.value), P(false), D || T(ValueValue5(e.target.value)));
                        }}
                      />
                      {N && (
                        <span
                          className={`ui-ob-error`}
                        >{`Give your workspace a name to continue.`}</span>
                      )}
                    </label>
                    <label className={`ui-ob-field`}>
                      <span className={`ui-ob-label`}>{`Workspace URL`}</span>
                      <span className={`ui-ob-input ui-ob-input--prefix`}>
                        <span className={`ui-ob-prefix`}>{`app.workspace.ai/`}</span>
                        <input
                          value={x}
                          placeholder={`acme`}
                          aria-label={`Workspace URL`}
                          onChange={(e) => {
                            (k(true),
                              T(
                                ValueValue5(e.target.value) +
                                  (e.target.value.endsWith(`-`) ? `-` : ``),
                              ));
                          }}
                        />
                      </span>
                      <span className={`ui-ob-hint`}>
                        {x ? (
                          <>
                            {`Your team signs in at `}
                            <b>
                              {`app.workspace.ai/`}
                              {x.replace(/-+$/, ``)}
                            </b>
                          </>
                        ) : (
                          `Letters, numbers and dashes`
                        )}
                      </span>
                    </label>
                    <div className={`ui-ob-field`}>
                      <span
                        className={`ui-ob-label`}
                        id={`ui-ob-size`}
                      >{`How many people will use it?`}</span>
                      <SegmentedControl
                        options={ValueValue2}
                        value={j}
                        onChange={M}
                        fullWidth={true}
                        aria-labelledby={`ui-ob-size`}
                      />
                    </div>
                  </div>
                )}
                {s === 1 && (
                  <ul className={`ui-ob-tools`}>
                    {valueValue5.map((e, t) => {
                      let n = F.has(e.id),
                        r = L.has(e.id);
                      return (
                        <li
                          className={`ui-ob-tool`}
                          style={{
                            "--i": t,
                          } as React.CSSProperties}
                          key={e.id}
                        >
                          <span
                            className={`ui-ob-logo`}
                            style={
                              e.tile
                                ? {
                                    background: e.tile,
                                    boxShadow: `none`,
                                  }
                                : void 0
                            }
                          >
                            {e.logo}
                          </span>
                          <span className={`ui-ob-tool__text`}>
                            <span className={`ui-ob-tool__name`}>
                              {e.name}
                              {n && <span className={`ui-ob-tool__state`}>{`Connected`}</span>}
                            </span>
                            <span className={`ui-ob-tool__desc`}>{e.description}</span>
                          </span>
                          {r && <span className={`ui-ob-spinner`} aria-hidden={`true`} />}
                          <button
                            type={`button`}
                            role={`switch`}
                            aria-checked={n}
                            aria-busy={r || void 0}
                            aria-label={`Connect ${e.name}`}
                            className={`ui-ob-switch`}
                            data-busy={r || void 0}
                            onClick={() => me(e)}
                          />
                        </li>
                      );
                    })}
                  </ul>
                )}
                {s === 2 && (
                  <Iconre
                    invites={z}
                    onChange={oe}
                    role={B}
                    onRole={se}
                    link={`app.workspace.ai/${x.replace(/-+$/, ``) || `acme`}/join`}
                    onCopy={() => ue(`Invite link copied`)}
                  />
                )}
                {s === 3 && (
                  <div
                    className={`ui-ob-templates`}
                    role={`radiogroup`}
                    aria-label={`Agent template`}
                  >
                    {ValueValue4.map((e, t) => (
                      <button
                        type={`button`}
                        role={`radio`}
                        aria-checked={V === e.id}
                        className={`ui-ob-template`}
                        style={{
                          "--i": t,
                        } as React.CSSProperties}
                        onClick={() => ce(e.id)}
                        key={e.id}
                      >
                        <span className={`ui-ob-template__top`}>
                          <span className={`ui-ob-template__icon`}>
                            <Icon icon={e.icon} size={17} />
                          </span>
                          <span className={`ui-ob-template__check`} aria-hidden={`true`}>
                            <Icon icon={CheckIcon} size={12} stroke={2.4} />
                          </span>
                        </span>
                        <b className={`ui-ob-template__name`}>{e.name}</b>
                        <span className={`ui-ob-template__text`}>{e.text}</span>
                        <span className={`ui-ob-template__meta`}>{e.meta}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <footer className={`ui-ob-foot`}>
                <button
                  type={`button`}
                  className={`ui-ob-skip`}
                  onClick={pe}
                >{`Skip for now`}</button>
                <span className={`ui-ob-foot__actions`}>
                  {s > 0 && (
                    <Button
                      size={`sm`}
                      variant={`secondary`}
                      icon={<Icon icon={valueValue} size={14} />}
                      onClick={() => q(s - 1)}
                      disabled={H}
                    >{`Back`}</Button>
                  )}
                  <Button
                    size={`sm`}
                    type={`submit`}
                    loading={H}
                    iconRight={s < 3 ? <Icon icon={ChevronRightIcon} size={14} /> : void 0}
                  >
                    {H ? `Creating agent` : ge}
                  </Button>
                </span>
              </footer>
            </form>
          )}
        </div>
        <aside className={`ui-ob-aside`} aria-label={`Setup checklist`}>
          <div className={`ui-ob-check`}>
            <div className={`ui-ob-check__head`}>
              <b>{`Setup checklist`}</b>
              <span className={`ui-ob-check__count`}>
                <span key={Z}>{Z}</span>
                {`/`}
                {valueValue4.length}
              </span>
            </div>
            <span className={`ui-ob-check__bar`} aria-hidden={`true`}>
              <i
                style={{
                  transform: `scaleX(${Z / valueValue4.length})`,
                }}
              />
            </span>
            <ol className={`ui-ob-check__list`}>
              {valueValue4.map((e, t) => {
                let n = g[t] ?? (t === s ? `current` : `todo`);
                return (
                  <li key={e.id}>
                    <button
                      type={`button`}
                      className={`ui-ob-check__item`}
                      data-state={n}
                      aria-current={t === s ? `step` : void 0}
                      onClick={() => q(t)}
                    >
                      <span className={`ui-ob-check__mark`} aria-hidden={`true`}>
                        {n === `done` ? (
                          <Icon icon={CheckIcon} size={11} stroke={2.6} key={`done`} />
                        ) : n === `skipped` ? (
                          <i className={`ui-ob-dash`} />
                        ) : null}
                      </span>
                      <span className={`ui-ob-check__text`}>
                        <span className={`ui-ob-check__label`}>{e.title}</span>
                        <span className={`ui-ob-check__sub`}>
                          {n === `done`
                            ? he(t)
                            : n === `skipped`
                              ? `Skipped – pick it up anytime`
                              : n === `current`
                                ? `In progress`
                                : e.time}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>
          <button type={`button`} className={`ui-ob-help`}>
            <span className={`ui-ob-help__icon`}>
              <Icon icon={ViewB} size={15} />
            </span>
            <span>
              <b>{`Need a hand?`}</b>
              <span>{`Book a free 15-minute setup call`}</span>
            </span>
          </button>
        </aside>
      </div>
      {le}
    </AppShell>
  );
}
function Iconre({
  invites: invites,
  onChange: onChange,
  role: role,
  onRole: onRole,
  link: link,
  onCopy: onCopy,
}: {invites: string[]; onChange: (value: string[]) => void; role: string; onRole: (role: string) => void; link: string; onCopy: () => void}) {
  let [s, l] = React.useState(``),
    [d, p] = React.useState(``),
    m = React.useRef<HTMLInputElement | null>(null),
    h = (n: string) => {
      let r = n.split(/[\s,;]+/).filter(Boolean);
      if (!r.length) return true;
      let i = r.filter((e: string) => valueValue6.test(e)),
        a = r.filter((e: string) => !valueValue6.test(e)),
        o = i
          .map((e: string) => e.toLowerCase())
          .filter((t, n, r) => !invites.includes(t) && r.indexOf(t) === n);
      return (
        o.length && onChange([...invites, ...o]),
        l(a.join(` `)),
        p(a.length ? `“${a[0]}” doesn't look like an email address.` : ``),
        a.length === 0
      );
    };
  return (
    <div className={`ui-ob-fields`}>
      <div className={`ui-ob-field`}>
        <span className={`ui-ob-label`} id={`ui-ob-invite-label`}>{`Email addresses`}</span>
        <div className={`ui-ob-invite-row`}>
          <div
            className={`ui-ob-chips`}
            data-invalid={d ? true : void 0}
            onClick={() => m.current?.focus()}
          >
            {invites.map((n) => (
              <span className={`ui-ob-chip`} key={n}>
                <span className={`ui-ob-chip__avatar`} aria-hidden={`true`}>
                  {n[0].toUpperCase()}
                </span>
                {n}
                <button
                  type={`button`}
                  className={`ui-ob-chip__remove`}
                  aria-label={`Remove ${n}`}
                  onClick={(r) => {
                    (r.stopPropagation(), onChange(invites.filter((e) => e !== n)));
                  }}
                >
                  <Icon icon={CloseIcon} size={11} stroke={2.2} />
                </button>
              </span>
            ))}
            <input
              ref={m}
              value={s}
              aria-labelledby={`ui-ob-invite-label`}
              aria-invalid={d ? true : void 0}
              placeholder={invites.length ? `Add more…` : `name@company.com`}
              onChange={(e) => {
                (l(e.target.value), d && p(``));
              }}
              onKeyDown={(n) => {
                (n.key === `Enter` || n.key === `,` || n.key === ` ` || n.key === `Tab`) && s.trim()
                  ? (n.preventDefault(), h(s))
                  : n.key === `Enter` ||
                    (n.key === `Backspace` &&
                      !s &&
                      invites.length &&
                      onChange(invites.slice(0, -1)));
              }}
              onBlur={() => s.trim() && h(s)}
              onPaste={(e) => {
                let t = e.clipboardData.getData(`text`);
                /[\s,;]/.test(t.trim()) && (e.preventDefault(), h(s + ` ` + t));
              }}
            />
          </div>
          <SelectMenu
            value={role}
            options={ValueValue3}
            onChange={onRole}
            className={`ui-ob-role`}
          />
        </div>
        {d ? (
          <span className={`ui-ob-error`}>{d}</span>
        ) : (
          <span
            className={`ui-ob-hint`}
          >{`Separate several addresses with a comma or space.`}</span>
        )}
      </div>
      <div className={`ui-ob-link`}>
        <span className={`ui-ob-link__icon`}>
          <Icon icon={valueValue13} size={15} />
        </span>
        <span className={`ui-ob-link__text`}>
          <b>{`Or share an invite link`}</b>
          <span>{link}</span>
        </span>
        <Button
          variant={`secondary`}
          size={`sm`}
          icon={<Icon icon={valueValue11} size={14} />}
          onClick={() => {
            (navigator.clipboard?.writeText(`https://${link}`).catch(() => {}), onCopy());
          }}
        >{`Copy link`}</Button>
      </div>
    </div>
  );
}
function Iconie({
  workspace: workspace,
  agent: agent,
  tools: tools,
  invites: invites,
  onNavigate: onNavigate,
  onRestart: onRestart,
}: {workspace: string; agent: string; tools: number; invites: number; onNavigate?: (label: string) => void; onRestart: () => void}) {
  let l = [
    {
      label: `Say hello to your ${agent} agent`,
      text: `Open a chat and give it its first task.`,
      icon: valueValue9,
      to: `Chat`,
    },
    {
      label: tools ? `Connect more tools` : `Connect your first tool`,
      text: tools
        ? `${tools} connected – add the rest when you need them.`
        : `Agents get far more useful with your data.`,
      icon: GridIcon,
      to: `Integrations`,
    },
    {
      label: `See how your workspace is doing`,
      text: invites
        ? `${invites} ${invites === 1 ? `teammate is` : `teammates are`} on the way.`
        : `Usage, agent runs and time saved.`,
      icon: valueValue8,
      to: `Analytics`,
    },
  ];
  return (
    <div className={`ui-ob-success`}>
      <div className={`ui-ob-success__body`}>
        <span className={`ui-ob-success__badge`} aria-hidden={`true`}>
          <svg viewBox={`0 0 24 24`}>
            <path d={`M6.5 12.5l3.5 3.5 7.5-8`} pathLength={1} />
          </svg>
        </span>
        <h2 className={`ui-ob-step__title`}>
          {workspace}
          {` is ready`}
        </h2>
        <p className={`ui-ob-step__text`}>
          {`Your `}
          {agent}
          {` agent is set up and waiting for its first task.`}
        </p>
        <ul className={`ui-ob-next`}>
          {l.map((e, t) => (
            <li
              style={{
                "--i": t,
              } as React.CSSProperties}
              key={e.label}
            >
              <button
                type={`button`}
                className={`ui-ob-next__item`}
                onClick={() => onNavigate?.(e.to)}
              >
                <span className={`ui-ob-next__icon`}>
                  <Icon icon={e.icon} size={16} />
                </span>
                <span className={`ui-ob-next__text`}>
                  <b>{e.label}</b>
                  <span>{e.text}</span>
                </span>
                <Icon icon={ChevronRightIcon} size={14} />
              </button>
            </li>
          ))}
        </ul>
      </div>
      <footer className={`ui-ob-foot`}>
        <button type={`button`} className={`ui-ob-skip`} onClick={onRestart}>{`Start over`}</button>
        <Button
          size={`sm`}
          iconRight={<Icon icon={ChevronRightIcon} size={14} />}
          onClick={() => onNavigate?.(`Chat`)}
        >{`Open chat`}</Button>
      </footer>
    </div>
  );
}
var valueValue7 = `
/* Onboarding – greeting and progress on top, the step card in a centered column, the checklist beside it */

.ui-ob {
  display: grid;
  grid-template-columns: minmax(0, 640px) 264px;
  grid-template-areas: "head ." "card aside";
  justify-content: center;
  align-items: start;
  column-gap: 40px;
  padding: 52px 40px 64px;
}
.ui-ob-head { grid-area: head; }
.ui-ob-card { grid-area: card; min-width: 0; }
.ui-ob-aside { grid-area: aside; position: sticky; top: 24px; display: grid; gap: 10px; }

.ui-ob-kicker { font-size: 12.5px; line-height: 16px; font-weight: 500; color: var(--muted); }
.ui-ob-title {
  margin: 8px 0 0;
  font-size: 26px;
  line-height: 32px;
  font-weight: 600;
  letter-spacing: -0.025em;
  color: var(--ink);
}
.ui-ob-sub { margin: 6px 0 0; font-size: 14px; line-height: 20px; color: var(--muted); }

/* Step row: marker + short label, joined by hairlines that darken once a step is done */
.ui-ob-steps { display: flex; align-items: center; margin: 22px 0 24px; padding: 0; list-style: none; }
.ui-ob-steps__item { display: flex; align-items: center; gap: 8px; min-width: 0; font-size: 13px; line-height: 16px; color: var(--muted); }
.ui-ob-steps__item:not(:last-child) { flex: 1; }
.ui-ob-steps__item:not(:last-child)::after {
  content: "";
  flex: 1;
  min-width: 12px;
  height: 1px;
  margin: 0 4px 0 6px;
  background: var(--line);
  transition: background-color 420ms var(--ease);
}
.ui-ob-steps__item[data-state="done"]::after { background: var(--line-strong); }
.ui-ob-steps__mark {
  display: grid;
  place-items: center;
  flex: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  box-shadow: inset 0 0 0 1px var(--line);
  font-size: 11px;
  font-weight: 500;
  font-variant-numeric: tabular-nums;
  color: var(--faint);
  transition: background-color 320ms ease, box-shadow 320ms ease, color 320ms ease;
}
.ui-ob-steps__item[data-state="done"] .ui-ob-steps__mark { background: var(--chip); box-shadow: none; color: var(--ink); }
.ui-ob-steps__item[data-state="current"] { color: var(--ink); font-weight: 500; }
.ui-ob-steps__item[data-state="current"] .ui-ob-steps__mark { box-shadow: inset 0 0 0 1px var(--line-strong); color: var(--ink); }
.ui-ob-steps__label { white-space: nowrap; }
.ui-ob-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }

/* The step card */
/* Gray tray around a white card; the actions sit on the tray below it, like the library components */
.ui-ob-card {
  padding: 4px;
  border-radius: 20px;
  background: var(--tray);
}
.ui-ob-form { display: grid; }
.ui-ob-step,
.ui-ob-success__body {
  border-radius: 16px;
  background: var(--card);
  box-shadow: 0 0 0 1px var(--line), 0 1px 2px rgba(0, 0, 0, 0.04);
}
.ui-ob-step { padding: 26px 28px 26px; animation: ui-ob-in-next 380ms var(--ease) both; }
.ui-ob-success__body { padding: 30px 0 22px; }
.ui-ob-step[data-dir="back"] { animation-name: ui-ob-in-back; }
@keyframes ui-ob-in-next { from { opacity: 0; transform: translateX(14px); } to { opacity: 1; transform: none; } }
@keyframes ui-ob-in-back { from { opacity: 0; transform: translateX(-14px); } to { opacity: 1; transform: none; } }
.ui-ob-step__head { margin-bottom: 22px; }
.ui-ob-step__title { margin: 0; font-size: 17px; line-height: 24px; font-weight: 600; letter-spacing: -0.01em; color: var(--ink); }
.ui-ob-step__text { margin: 4px 0 0; font-size: 13.5px; line-height: 20px; color: var(--muted); }

.ui-ob-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  min-height: 52px;
  padding: 6px 6px 2px 16px;
}
.ui-ob-foot__actions { display: flex; gap: 8px; }
.ui-ob-skip {
  font-size: 13px;
  color: var(--muted);
  text-decoration: underline;
  text-decoration-color: transparent;
  text-underline-offset: 3px;
  transition: color 140ms ease, text-decoration-color 140ms ease;
}
.ui-ob-skip:hover { color: var(--ink); text-decoration-color: var(--line-strong); }

/* Fields */
.ui-ob-fields { display: grid; gap: 20px; }
.ui-ob-field { display: grid; gap: 7px; min-width: 0; }
.ui-ob-label { font-size: 13px; line-height: 18px; font-weight: 500; color: var(--ink); }
.ui-ob-hint, .ui-ob-error { font-size: 12.5px; line-height: 17px; color: var(--muted); }
.ui-ob-hint b { font-weight: 500; color: var(--text); }
.ui-ob-error { color: #dc2626; }
.ui-ob-input, .ui-ob-chips {
  display: flex;
  align-items: center;
  min-height: 38px;
  border-radius: 10px;
  background: var(--card);
  box-shadow: 0 0 0 1px var(--line-strong), var(--shadow);
  transition: box-shadow 140ms ease;
}
.ui-ob-input:hover, .ui-ob-chips:hover { box-shadow: 0 0 0 1px var(--faint), var(--shadow); }
.ui-ob-input:focus-within, .ui-ob-chips:focus-within { box-shadow: 0 0 0 1px var(--ink), 0 0 0 4px var(--select); }
.ui-ob-input[aria-invalid], .ui-ob-chips[data-invalid] { box-shadow: 0 0 0 1px #dc2626, 0 0 0 4px rgba(220, 38, 38, 0.1); }
input.ui-ob-input { width: 100%; padding: 0 12px; }
.ui-ob-input, .ui-ob-input input, .ui-ob-chips input {
  border: 0;
  outline: none;
  font: inherit;
  font-size: 14px;
  color: var(--ink);
}
.ui-ob-input input, .ui-ob-chips input { flex: 1; min-width: 0; height: 36px; padding: 0 12px 0 0; background: none; }
.ui-ob-input::placeholder, .ui-ob-input input::placeholder, .ui-ob-chips input::placeholder { color: var(--placeholder); }
.ui-ob-prefix { padding: 0 1px 0 12px; font-size: 14px; color: var(--muted); white-space: nowrap; }

/* Tools: a list of rows, each with a switch */
.ui-ob-tools { display: grid; margin: -6px -10px 0; padding: 0; list-style: none; }
.ui-ob-tool {
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 56px;
  padding: 0 10px;
  border-radius: 12px;
  transition: background-color 140ms ease;
  animation: ui-ob-rise 380ms var(--ease) both;
  animation-delay: calc(var(--i, 0) * 30ms);
}
.ui-ob-tool:hover { background: var(--subtle); }
@keyframes ui-ob-rise { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
.ui-ob-logo {
  display: grid;
  place-items: center;
  flex: none;
  width: 32px;
  height: 32px;
  border-radius: 9px;
  background: var(--logo-bg);
  box-shadow: 0 0 0 1px var(--line), var(--shadow);
  color: var(--ink);
}
.ui-ob-logo svg { width: 17px; height: 17px; }
.ui-ob-tool__text { display: grid; gap: 2px; flex: 1; min-width: 0; }
.ui-ob-tool__name { display: flex; align-items: center; gap: 8px; font-size: 14px; line-height: 19px; font-weight: 500; color: var(--ink); }
.ui-ob-tool__state {
  padding: 1px 7px;
  border-radius: 999px;
  background: var(--chip);
  font-size: 11.5px;
  line-height: 16px;
  font-weight: 500;
  color: var(--muted);
  animation: ui-ob-fade 240ms ease both;
}
@keyframes ui-ob-fade { from { opacity: 0; } }
.ui-ob-tool__desc { overflow: hidden; font-size: 13px; line-height: 18px; color: var(--muted); white-space: nowrap; text-overflow: ellipsis; }

.ui-ob-switch {
  position: relative;
  flex: none;
  width: 32px;
  height: 20px;
  border-radius: 999px;
  background: var(--toggle-off);
  transition: background-color 200ms ease;
}
.ui-ob-switch::after {
  content: "";
  position: absolute;
  top: 2px;
  left: 2px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  transition: translate 240ms var(--ease);
}
.ui-ob-switch[aria-checked="true"] { background: var(--switch-on); }
.ui-ob-switch[aria-checked="true"]::after, .ui-ob-switch[data-busy]::after { translate: 12px 0; }
.ui-ob-switch[data-busy] { background: var(--faint); }
.ui-ob-spinner {
  flex: none;
  width: 14px;
  height: 14px;
  border: 2px solid var(--line);
  border-top-color: var(--ink);
  border-radius: 50%;
  animation: ui-ob-spin 700ms linear infinite;
}
@keyframes ui-ob-spin { to { transform: rotate(360deg); } }

/* Invites: chips in a field, the role next to it, a link below */
.ui-ob-invite-row { display: flex; align-items: flex-start; gap: 8px; }
.ui-ob-chips { flex: 1; flex-wrap: wrap; gap: 6px; min-width: 0; padding: 4px 4px 4px 6px; cursor: text; }
.ui-ob-chips input { min-width: 120px; height: 28px; padding-left: 4px; }
.ui-ob-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 28px;
  padding: 0 4px 0 4px;
  border-radius: 8px;
  background: var(--chip);
  font-size: 13px;
  color: var(--ink);
  animation: ui-as-pop 220ms var(--ease);
}
.ui-ob-chip__avatar {
  display: grid;
  place-items: center;
  width: 20px;
  height: 20px;
  border-radius: 6px;
  background: var(--card);
  box-shadow: 0 0 0 1px var(--line);
  font-size: 10.5px;
  font-weight: 600;
  color: var(--text);
}
.ui-ob-chip__remove { display: grid; place-items: center; width: 20px; height: 20px; border-radius: 6px; color: var(--faint); transition: background-color 140ms ease, color 140ms ease; }
.ui-ob-chip__remove:hover { background: var(--chip-hover); color: var(--ink); }
.ui-ob-role { height: 38px; min-width: 104px; justify-content: space-between; border-radius: 10px; }
.ui-ob-role > svg { color: var(--faint); }

.ui-ob-link {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 12px 12px 14px;
  border-radius: 12px;
  background: var(--subtle);
  box-shadow: inset 0 0 0 1px var(--line-soft);
}
.ui-ob-link__icon { display: grid; place-items: center; flex: none; width: 30px; height: 30px; border-radius: 9px; background: var(--card); box-shadow: 0 0 0 1px var(--line); color: var(--text); }
.ui-ob-link__text { display: grid; gap: 1px; flex: 1; min-width: 0; }
.ui-ob-link__text b { font-size: 13.5px; font-weight: 500; color: var(--ink); }
.ui-ob-link__text span { overflow: hidden; font-size: 12.5px; color: var(--muted); white-space: nowrap; text-overflow: ellipsis; }

/* Templates: three cards to pick from */
.ui-ob-templates { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; }
.ui-ob-template {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  padding: 14px 14px 13px;
  border-radius: 12px;
  background: var(--card);
  box-shadow: 0 0 0 1px var(--line), var(--shadow);
  text-align: left;
  transition: box-shadow 160ms ease, background-color 160ms ease;
  animation: ui-ob-rise 380ms var(--ease) both;
  animation-delay: calc(var(--i, 0) * 40ms);
}
.ui-ob-template:hover { box-shadow: 0 0 0 1px var(--line-strong), var(--shadow); }
.ui-ob-template[aria-checked="true"] { background: var(--subtle); box-shadow: 0 0 0 1.5px var(--ink), var(--shadow); }
.ui-ob-template__top { display: flex; align-self: stretch; align-items: flex-start; justify-content: space-between; margin-bottom: 10px; }
.ui-ob-template__icon { display: grid; place-items: center; width: 32px; height: 32px; border-radius: 9px; background: var(--chip); color: var(--ink); }
.ui-ob-template__check {
  display: grid;
  place-items: center;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  box-shadow: inset 0 0 0 1.5px var(--line-strong);
  color: transparent;
  transition: background-color 160ms ease, box-shadow 160ms ease, color 160ms ease;
}
.ui-ob-template[aria-checked="true"] .ui-ob-template__check { background: var(--ink); box-shadow: none; color: var(--on-ink); }
.ui-ob-template__name { font-size: 14px; line-height: 19px; font-weight: 500; color: var(--ink); }
.ui-ob-template__text { font-size: 12.5px; line-height: 18px; color: var(--muted); }
.ui-ob-template__meta { margin-top: auto; padding-top: 10px; font-size: 12px; line-height: 16px; color: var(--faint); }

/* Finished */
.ui-ob-success { animation: ui-ob-in-next 420ms var(--ease) both; }
.ui-ob-success__body > .ui-ob-step__title, .ui-ob-success__body > .ui-ob-step__text { padding: 0 28px; }
.ui-ob-success__badge {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  margin: 0 28px 16px;
  border-radius: 50%;
  background: var(--ink);
  animation: ui-as-pop 360ms var(--ease) both;
}
.ui-ob-success__badge svg { width: 20px; height: 20px; fill: none; stroke: var(--on-ink); stroke-width: 2.4; stroke-linecap: round; stroke-linejoin: round; }
.ui-ob-success__badge path { stroke-dasharray: 1; stroke-dashoffset: 1; animation: ui-ob-draw 420ms var(--ease) 220ms forwards; }
@keyframes ui-ob-draw { to { stroke-dashoffset: 0; } }
.ui-ob-next { display: grid; margin: 20px 18px 0; padding: 0; list-style: none; }
.ui-ob-next li { animation: ui-ob-rise 380ms var(--ease) both; animation-delay: calc(200ms + var(--i, 0) * 50ms); }
.ui-ob-next__item {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  min-height: 56px;
  padding: 0 10px;
  border-radius: 12px;
  text-align: left;
  transition: background-color 140ms ease;
}
.ui-ob-next__item:hover { background: var(--subtle); }
.ui-ob-next__item > svg { color: var(--faint); transition: translate 200ms var(--ease), color 140ms ease; }
.ui-ob-next__item:hover > svg { color: var(--ink); translate: 2px 0; }
.ui-ob-next__icon { display: grid; place-items: center; flex: none; width: 32px; height: 32px; border-radius: 9px; background: var(--chip); color: var(--ink); }
.ui-ob-next__text { display: grid; gap: 1px; flex: 1; min-width: 0; }
.ui-ob-next__text b { font-size: 14px; line-height: 19px; font-weight: 500; color: var(--ink); }
.ui-ob-next__text span { font-size: 13px; line-height: 18px; color: var(--muted); }

/* Checklist beside the card */
.ui-ob-check {
  padding: 16px 8px 8px;
  border-radius: 14px;
  background: var(--subtle);
  box-shadow: inset 0 0 0 1px var(--line-soft);
}
.ui-ob-check__head { display: flex; align-items: baseline; justify-content: space-between; padding: 0 8px; }
.ui-ob-check__head b { font-size: 13.5px; font-weight: 600; color: var(--ink); }
.ui-ob-check__count { font-size: 12.5px; color: var(--muted); font-variant-numeric: tabular-nums; }
.ui-ob-check__count span { display: inline-block; color: var(--ink); animation: ui-ob-rise 360ms var(--ease); }
.ui-ob-check__bar { display: block; height: 4px; margin: 12px 8px 8px; overflow: hidden; border-radius: 999px; background: var(--chip-hover); }
.ui-ob-check__bar i { display: block; height: 100%; border-radius: inherit; background: var(--ink); transform-origin: left; transition: transform 620ms var(--ease); }
.ui-ob-check__list { display: grid; gap: 1px; margin: 0; padding: 0; list-style: none; }
.ui-ob-check__item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  width: 100%;
  padding: 8px;
  border-radius: 9px;
  text-align: left;
  transition: background-color 140ms ease;
}
.ui-ob-check__item:hover { background: var(--hover); }
.ui-ob-check__item[aria-current] { background: var(--card); box-shadow: 0 0 0 1px var(--line), var(--shadow); }
.ui-ob-check__mark {
  display: grid;
  place-items: center;
  flex: none;
  width: 16px;
  height: 16px;
  margin-top: 1px;
  border-radius: 50%;
  box-shadow: inset 0 0 0 1.5px var(--line-strong);
  color: var(--on-ink);
  transition: background-color 200ms ease, box-shadow 200ms ease;
}
.ui-ob-check__mark svg { animation: ui-as-pop 260ms var(--ease); }
.ui-ob-check__item[data-state="current"] .ui-ob-check__mark { box-shadow: inset 0 0 0 1.5px var(--ink); }
.ui-ob-check__item[data-state="done"] .ui-ob-check__mark { background: var(--ink); box-shadow: none; }
.ui-ob-check__item[data-state="skipped"] .ui-ob-check__mark { box-shadow: inset 0 0 0 1.5px var(--line-strong); }
.ui-ob-dash { display: block; width: 6px; height: 1.5px; border-radius: 1px; background: var(--faint); }
.ui-ob-check__text { display: grid; gap: 1px; min-width: 0; }
.ui-ob-check__label { font-size: 13px; line-height: 18px; font-weight: 500; color: var(--ink); }
.ui-ob-check__item[data-state="todo"] .ui-ob-check__label { color: var(--text); font-weight: 400; }
.ui-ob-check__item[data-state="done"] .ui-ob-check__label { color: var(--muted); }
.ui-ob-check__sub { overflow: hidden; font-size: 12px; line-height: 16px; color: var(--muted); white-space: nowrap; text-overflow: ellipsis; }
.ui-ob-check__item[data-state="todo"] .ui-ob-check__sub { color: var(--faint); }

.ui-ob-help {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 12px;
  text-align: left;
  transition: background-color 140ms ease;
}
.ui-ob-help:hover { background: var(--hover); }
.ui-ob-help__icon { display: grid; place-items: center; flex: none; width: 28px; height: 28px; border-radius: 8px; background: var(--chip); color: var(--text); }
.ui-ob-help > span:last-child { display: grid; gap: 1px; }
.ui-ob-help b { font-size: 13px; font-weight: 500; color: var(--ink); }
.ui-ob-help > span:last-child > span { font-size: 12px; color: var(--muted); }

/* Narrower panels: one column, the checklist moves below the card */
@container ui-as-main (max-width: 1000px) {
  .ui-ob {
    grid-template-columns: minmax(0, 640px);
    grid-template-areas: "head" "card" "aside";
    row-gap: 16px;
    padding: 44px 32px 56px;
  }
  .ui-ob-head .ui-ob-steps { margin-bottom: 8px; }
  .ui-ob-aside { position: static; grid-template-columns: minmax(0, 1fr); }
}
@container ui-as-main (max-width: 620px) {
  .ui-ob-templates { grid-template-columns: minmax(0, 1fr); }
  .ui-ob-template__meta { padding-top: 6px; }
  .ui-ob-invite-row { flex-direction: column; align-items: stretch; }
  .ui-ob-role { width: 100%; }
  .ui-ob-tool__desc { white-space: normal; }
  .ui-ob-tool { padding-top: 8px; padding-bottom: 8px; }
}
@container ui-as (max-width: 600px) {
  .ui-ob { padding: 56px 16px 40px; }
  .ui-ob-title { font-size: 22px; line-height: 28px; }
  .ui-ob-step { padding: 22px 18px 22px; }
  .ui-ob-foot { padding: 6px 4px 2px 12px; }
  .ui-ob-success__body > .ui-ob-step__title, .ui-ob-success__body > .ui-ob-step__text { padding: 0 18px; }
  /* Narrow: only the current step keeps its label */
  .ui-ob-steps__item:not([data-state="current"]) .ui-ob-steps__label { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }
  .ui-ob-success__badge { margin-left: 18px; margin-right: 18px; }
  .ui-ob-next { margin: 16px 8px 0; }
  .ui-ob-link .ui-button { flex: none; }
}

@media (prefers-reduced-motion: reduce) {
  .ui-ob *, .ui-ob *::before, .ui-ob *::after { animation-duration: 1ms !important; animation-delay: 0ms !important; transition-duration: 1ms !important; }
  .ui-ob-success__badge path { stroke-dashoffset: 0; }
}
`;
function OnboardingDemo2() {
  return (
    <PreviewFrame>
      <Onboarding onNavigate={navigateScreen} />
    </PreviewFrame>
  );
}
function FullScreen(props: {}) {
  return (
    <ScreenFrameModeContext.Provider value={true}>
      <OnboardingDemo2 {...props} />
    </ScreenFrameModeContext.Provider>
  );
}
const demoStyles = "";
function OnboardingDemo(props: {}) {
  return (
    <>
      <style href="plico-demo-onboarding" precedence="default">
        {demoStyles}
      </style>
      <OnboardingDemo2 {...props} />
    </>
  );
}
export { Onboarding as Component };
export { OnboardingDemo as Demo };
export { FullScreen };
export { Onboarding };
export { OnboardingDemo };
export default Onboarding;

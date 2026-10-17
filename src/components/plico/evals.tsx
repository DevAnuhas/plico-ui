"use client";

import * as React from "react";
type EvalStatus = EvalVerdict | "running" | "queued";
type EvalVerdict = "pass" | "partial" | "fail";
type EvalCase = (typeof ValueValue11)[number];
interface InlineDiffProps {
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
interface KpiChartProps {
  title?: string;
  value?: string;
  delta?: number;
  labels: string[];
  tooltipLabels?: string[];
  series: KpiSeries[];
  format?: (n: number) => string;
  footer?: string;
  defaultIndex?: number;
  className?: string;
}
type KpiSeries = {
  label: string;
  color: string;
  values: number[];
} & {
  id?: string;
  name?: string;
};
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
var diffTokenPattern = /\s+|[\p{L}\p{N}_'’]+|[^\s\p{L}\p{N}_]/gu;
var isWhitespace = (text: string) => /^\s+$/.test(text);
function diffText(original: string, suggested: string): DiffSegment[] {
  let beforeTokens = original.match(diffTokenPattern) ?? [],
    afterTokens = suggested.match(diffTokenPattern) ?? [],
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
        isWhitespace(operations[e].s);
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
      isWhitespace(t.text) &&
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
var suggestionCount = (count: number) => `${count} suggestion${count === 1 ? `` : `s`}`;
var quoteText = (text: string) => `“${text.trim()}”`;
var describeChange = (change: { remove: string; insert: string }) =>
  change.remove.trim() && change.insert.trim()
    ? `replace ${quoteText(change.remove)} with ${quoteText(change.insert)}`
    : change.insert.trim()
      ? `add ${quoteText(change.insert)}`
      : `remove ${quoteText(change.remove)}`;
function DocumentDiff({
  original = ``,
  suggested = ``,
  changes: changes,
  onChange: onChange,
  onDone: onDone,
  label: label,
  ref: forwardedRef,
  className: className,
}: InlineDiffProps) {
  let segments = React.useMemo(
      () => changes ?? diffText(original, suggested),
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
    composeText = (e: Partial<Record<number, DiffDecision>>) =>
      segments
        .map((t, n) =>
          t.type === `equal`
            ? t.text
            : e[changeList.findIndex((e) => e.seg === n)] === `accepted`
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
  let applyDecision = (e: number[], t: DiffDecision, n: boolean = false) => {
      let { decisions: r, list: i } = currentRef.current,
        a = e.filter((e) => e >= 0 && e < i.length && !r[e]);
      if (!a.length) return;
      let o = {
        ...r,
      };
      a.forEach((e) => (o[e] = t));
      let c = i.length - Object.keys(o).length;
      (setDecisions(o),
        setHistory((e) => [...e, a]),
        setHighlighted(null),
        (latestDecisionRef.current = Math.max(...a)));
      let u = t === `accepted` ? `Accepted` : `Rejected`,
        d =
          a.length === 1
            ? describeChange(i[a[0]]).replace(/^./, (e) => e.toUpperCase())
            : `${a.length} suggestions`;
      if (
        (setAnnouncement(
          `${u}: ${d}. ${c ? `${suggestionCount(c)} left.` : `All changes reviewed.`}`,
        ),
        n)
      ) {
        let e = Math.max(...a),
          t = i.map((e, t) => t).filter((e) => !o[e]);
        pendingFocusRef.current = c ? (t.find((t) => t > e) ?? t[0]) : `undo`;
      }
      let f = composeText(o);
      (callbacksRef.current.onChange?.(f), c || callbacksRef.current.onDone?.(f));
    },
    undo = (e: boolean = false) => {
      let { decisions: t, history: n } = currentRef.current,
        r = n[n.length - 1];
      if (!r) return;
      let i = {
        ...t,
      };
      (r.forEach((e) => delete i[e]),
        setDecisions(i),
        setHistory(n.slice(0, -1)),
        setAnnouncement(
          `Undone. ${suggestionCount(currentRef.current.list.length - Object.keys(i).length)} left.`,
        ),
        e && (pendingFocusRef.current = Math.min(...r)),
        callbacksRef.current.onChange?.(composeText(i)));
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
      className={[`ui-df`, className].filter(Boolean).join(` `)}
      data-done={allReviewed || void 0}
      onKeyDown={(e) => {
        e.key === `Escape` && highlighted !== null && setHighlighted(null);
      }}
    >
      <style href={`ui-inline-diff`} precedence={`default`}>
        {documentDiffStyles}
      </style>
      {label && (
        <div className={`ui-df__label`}>
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
      <div ref={changeRefs} className={`ui-df__card`}>
        <div className={`ui-df__head`}>
          <div className={`ui-df__bar`}>
            <div
              className={`ui-df__layer`}
              data-show={!allReviewed || void 0}
              inert={allReviewed}
              aria-hidden={allReviewed || void 0}
            >
              <span className={`ui-df__count`}>
                <span className={`ui-df__num`}>{pendingIndices.length}</span>
                <span className={`ui-df__word`}>
                  {pendingIndices.length === 1 ? `suggestion` : `suggestions`}
                </span>
              </span>
              <span className={`ui-df__actions`}>
                <span className={`ui-df__nav`} onMouseDown={(e) => e.preventDefault()}>
                  <button
                    type={`button`}
                    className={`ui-df__icon`}
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
                    className={`ui-df__icon`}
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
                  className={`ui-df__btn`}
                  onClick={() => applyDecision(pendingIndices, `rejected`)}
                  disabled={!pendingIndices.length}
                >{`Reject all`}</button>
                <button
                  type={`button`}
                  className={`ui-df__btn ui-df__btn--primary`}
                  onClick={() => applyDecision(pendingIndices, `accepted`)}
                  disabled={!pendingIndices.length}
                >{`Accept all`}</button>
              </span>
            </div>
            <div
              className={`ui-df__layer`}
              data-show={allReviewed || void 0}
              inert={!allReviewed}
              aria-hidden={!allReviewed || void 0}
            >
              <span className={`ui-df__count ui-df__count--done`}>
                <svg className={`ui-df__ok`} viewBox={`0 0 16 16`} aria-hidden={`true`}>
                  <path d={`M3.75 8.4 6.6 11.1 12.25 5`} pathLength={1} />
                </svg>
                {`All changes reviewed`}
              </span>
              <button
                ref={undoRef}
                type={`button`}
                className={`ui-df__btn`}
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
        <div className={`ui-df__body`}>
          <p className={`ui-df__text`}>
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
                  className={`ui-df__chg`}
                  data-state={i}
                  data-active={q === n || void 0}
                  tabIndex={a ? 0 : void 0}
                  role={a ? `button` : void 0}
                  aria-label={
                    a
                      ? `Suggestion ${n + 1} of ${ne}: ${describeChange(e)}. Press Y to accept, N to reject`
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
                    <del className={`ui-df__del`} aria-hidden={i === `accepted` || void 0}>
                      {e.remove}
                    </del>
                  )}
                  {e.insert && (
                    <ins className={`ui-df__ins`} aria-hidden={i === `rejected` || void 0}>
                      {e.insert}
                    </ins>
                  )}
                </span>
              );
            })}
          </p>
        </div>
        <div
          ref={toolbarRef}
          className={`ui-df__pop`}
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
            className={`ui-df__pbtn`}
            aria-label={`Accept suggestion`}
            onClick={() => q !== null && applyDecision([q], `accepted`, focused === q)}
          >
            <svg viewBox={`0 0 16 16`} aria-hidden={`true`}>
              <path d={`M3.75 8.4 6.6 11.1 12.25 5`} />
            </svg>
            {`Accept`}
            <kbd>{`Y`}</kbd>
          </button>
          <span className={`ui-df__sep`} aria-hidden={`true`} />
          <button
            type={`button`}
            tabIndex={-1}
            className={`ui-df__pbtn`}
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
      <span className={`ui-df__sr`} role={`status`} aria-live={`polite`}>
        {announcement}
      </span>
    </div>
  );
}
var documentDiffStyles = `
.ui-df {
  --ui-df-ink: #171717;
  --ui-df-text: #525252;
  --ui-df-muted: #8a8a8a;
  --ui-df-tray: #f0f0f0;
  --ui-df-line: #ececec;
  --ui-df-bg: #ffffff;
  --ui-df-soft: #f5f5f5;
  --ui-df-add: rgba(34, 160, 90, 0.1);
  --ui-df-add-strong: rgba(34, 160, 90, 0.18);
  --ui-df-add-ink: #18794e;
  --ui-df-del: rgba(220, 60, 60, 0.08);
  --ui-df-del-strong: rgba(220, 60, 60, 0.15);
  --ui-df-del-ink: #b42318;
  --ui-df-strike: rgba(180, 35, 24, 0.55);
  --ui-df-ok: #1f8a4c;
  --ui-df-pop: #171717;
  --ui-df-pop-ink: #ffffff;
  --ui-df-pop-soft: rgba(255, 255, 255, 0.14);
  --ui-df-pop-kbd: rgba(255, 255, 255, 0.55);
  --ui-df-primary: #171717;
  --ui-df-primary-ink: #ffffff;
  --ui-df-focus: rgba(23, 23, 23, 0.35);
  --ui-df-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
  --ui-df-ease: cubic-bezier(0.22, 1, 0.36, 1);
  position: relative;
  box-sizing: border-box;
  display: grid;
  width: 100%;
  min-width: 0;
  padding: 4px;
  border-radius: 20px;
  background: var(--ui-df-tray);
  color: var(--ui-df-text);
  font-family: "Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
  text-align: left;
}
.ui-df *, .ui-df *::before, .ui-df *::after { box-sizing: border-box; }

/* The optional label sits on the gray tray, above the card */
.ui-df__label {
  display: flex;
  align-items: center;
  gap: 6px;
  min-width: 0;
  padding: 6px 8px 4px;
  color: var(--ui-df-muted);
  font-size: 12.5px;
  line-height: 1.3;
  letter-spacing: -0.003em;
}
.ui-df__label span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.ui-df__label svg { flex: none; width: 13px; height: 13px; fill: currentColor; }

/* The white card: toolbar, paragraph and the popover (positioned relative to it) */
.ui-df__card {
  position: relative;
  min-width: 0;
  border-radius: 16px;
  background: var(--ui-df-bg);
  box-shadow: 0 0 0 1px var(--ui-df-line), var(--ui-df-shadow);
}
.ui-df__head {
  padding: 10px 10px 10px 16px;
  border-bottom: 1px solid var(--ui-df-line);
}

/* The two toolbars share one cell and cross-fade */
.ui-df__bar { display: grid; }
.ui-df__layer {
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
  transition: opacity 260ms ease, transform 420ms var(--ui-df-ease), filter 260ms ease, visibility 0s 420ms;
}
.ui-df__layer[data-show] {
  opacity: 1;
  visibility: visible;
  transform: none;
  filter: none;
  transition: opacity 320ms ease 80ms, transform 460ms var(--ui-df-ease) 80ms, filter 320ms ease 80ms, visibility 0s;
}
/* Narrow cards (e.g. a side panel): the count keeps only its number, so the toolbar stays on one line */
.ui-df__card { container: ui-df-card / inline-size; }
@container ui-df-card (max-width: 400px) {
  .ui-df__word { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
}
.ui-df__count {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  color: var(--ui-df-ink);
  font-size: 13px;
  font-weight: 500;
  line-height: 1;
  letter-spacing: -0.006em;
  white-space: nowrap;
}
.ui-df__num {
  display: inline-grid;
  place-items: center;
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  border-radius: 999px;
  background: var(--ui-df-add);
  color: var(--ui-df-add-ink);
  font-size: 11.5px;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
}
.ui-df__ok {
  width: 16px;
  height: 16px;
  fill: none;
  stroke: var(--ui-df-ok);
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
}
.ui-df[data-done] .ui-df__ok { animation: ui-df-draw 420ms var(--ui-df-ease) 220ms forwards; }
.ui-df__actions { display: inline-flex; align-items: center; gap: 6px; margin-left: auto; }
.ui-df__nav { display: inline-flex; gap: 2px; margin-right: 2px; }

.ui-df__btn,
.ui-df__icon {
  appearance: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: 30px;
  margin: 0;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: var(--ui-df-ink);
  font: inherit;
  font-size: 13px;
  font-weight: 500;
  line-height: 1;
  letter-spacing: -0.006em;
  white-space: nowrap;
  cursor: pointer;
  transition: background-color 160ms ease, color 160ms ease, opacity 160ms ease, transform 160ms var(--ui-df-ease);
  -webkit-tap-highlight-color: transparent;
}
.ui-df__btn { padding: 0 11px; box-shadow: inset 0 0 0 1px var(--ui-df-line); }
.ui-df__icon { width: 28px; color: var(--ui-df-muted); }
.ui-df__btn svg,
.ui-df__icon svg {
  width: 14px;
  height: 14px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.6;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.ui-df__btn:hover:not(:disabled) { background: var(--ui-df-soft); }
.ui-df__icon:hover:not(:disabled) { background: var(--ui-df-soft); color: var(--ui-df-ink); }
.ui-df__btn--primary { background: var(--ui-df-primary); color: var(--ui-df-primary-ink); box-shadow: none; }
.ui-df__btn--primary:hover:not(:disabled) { background: var(--ui-df-primary); opacity: 0.88; }
.ui-df__btn:active:not(:disabled),
.ui-df__icon:active:not(:disabled) { transform: scale(0.97); }
.ui-df__btn:disabled,
.ui-df__icon:disabled { opacity: 0.4; cursor: default; }
.ui-df__btn:focus-visible,
.ui-df__icon:focus-visible { outline: 2px solid var(--ui-df-focus); outline-offset: 2px; }

/* The prose */
.ui-df__body { padding: 16px 18px 18px; }
.ui-df__text {
  margin: 0;
  color: var(--ui-df-text);
  font-size: 15px;
  line-height: 1.65;
  letter-spacing: -0.006em;
  white-space: pre-line; /* line breaks stay, doubled spaces around a settled change collapse */
  overflow-wrap: anywhere;
}

.ui-df__chg { border-radius: 4px; cursor: pointer; scroll-margin: 64px 0 24px; }
.ui-df__chg:not([data-state="pending"]) { cursor: auto; }
.ui-df__chg:focus { outline: none; }
.ui-df__chg:focus-visible { outline: 2px solid var(--ui-df-focus); outline-offset: 2px; }

.ui-df__del,
.ui-df__ins {
  padding: 1px 2px;
  border-radius: 4px;
  -webkit-box-decoration-break: clone;
  box-decoration-break: clone;
  font-size: 1em;
  transition:
    background-color 360ms ease,
    color 360ms ease,
    text-decoration-color 300ms ease,
    font-size 460ms var(--ui-df-ease),
    padding 460ms var(--ui-df-ease),
    margin 460ms var(--ui-df-ease),
    opacity 300ms ease;
}
.ui-df__del {
  background: var(--ui-df-del);
  color: var(--ui-df-del-ink);
  text-decoration: line-through;
  text-decoration-color: var(--ui-df-strike);
  text-decoration-thickness: 1.2px;
}
.ui-df__ins {
  background: var(--ui-df-add);
  color: var(--ui-df-add-ink);
  text-decoration: none;
}
.ui-df__del + .ui-df__ins { margin-left: 3px; }
.ui-df__chg[data-active] .ui-df__del { background: var(--ui-df-del-strong); }
.ui-df__chg[data-active] .ui-df__ins { background: var(--ui-df-add-strong); }

/* Accepted: the old words shrink away, the new ones settle into the text */
.ui-df__chg[data-state="accepted"] .ui-df__del,
.ui-df__chg[data-state="rejected"] .ui-df__ins {
  font-size: 0;
  padding: 0;
  margin: 0;
  opacity: 0;
}
.ui-df__chg[data-state="accepted"] .ui-df__ins,
.ui-df__chg[data-state="rejected"] .ui-df__del {
  padding: 0;
  margin: 0;
  background: transparent;
  color: inherit;
  text-decoration-color: transparent;
}

/* Popover */
.ui-df__pop {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 2px;
  padding: 3px;
  border-radius: 10px;
  background: var(--ui-df-pop);
  color: var(--ui-df-pop-ink);
  box-shadow: 0 6px 20px -6px rgba(0, 0, 0, 0.35), 0 1px 2px rgba(0, 0, 0, 0.2);
  opacity: 0;
  visibility: hidden;
  transform: translateY(4px) scale(0.96);
  transform-origin: 50% 100%;
  pointer-events: none;
  transition:
    opacity 180ms ease,
    transform 260ms var(--ui-df-ease),
    left 320ms var(--ui-df-ease),
    top 320ms var(--ui-df-ease),
    visibility 0s 260ms;
}
.ui-df__pop[data-open] {
  opacity: 1;
  visibility: visible;
  transform: none;
  pointer-events: auto;
  transition:
    opacity 180ms ease,
    transform 300ms var(--ui-df-ease),
    left 320ms var(--ui-df-ease),
    top 320ms var(--ui-df-ease),
    visibility 0s;
}
.ui-df__pop[data-snap] { transition-property: opacity, transform, visibility; }
.ui-df__pbtn {
  appearance: none;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 28px;
  margin: 0;
  padding: 0 8px 0 7px;
  border: 0;
  border-radius: 7px;
  background: transparent;
  color: inherit;
  font: inherit;
  font-size: 12.5px;
  font-weight: 500;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  transition: background-color 140ms ease;
}
.ui-df__pbtn:hover { background: var(--ui-df-pop-soft); }
.ui-df__pbtn svg {
  width: 14px;
  height: 14px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.ui-df__pbtn kbd {
  display: inline-grid;
  place-items: center;
  min-width: 17px;
  height: 17px;
  padding: 0 4px;
  border-radius: 4px;
  background: var(--ui-df-pop-soft);
  color: var(--ui-df-pop-kbd);
  font: inherit;
  font-size: 10.5px;
  font-weight: 500;
}
.ui-df__sep { width: 1px; height: 16px; background: var(--ui-df-pop-soft); }

.ui-df__sr {
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

@keyframes ui-df-draw { to { stroke-dashoffset: 0; } }

/* Narrow screens: the arrows step aside (Tab still moves between changes) */
@media (max-width: 400px) {
  .ui-df__nav { display: none; }
  .ui-df__head { padding-left: 14px; }
  .ui-df__label { padding-left: 6px; }
  .ui-df__body { padding: 14px 14px 16px; }
}
@media (hover: none) and (pointer: coarse) {
  .ui-df__pbtn kbd { display: none; }
  .ui-df__pbtn { height: 34px; padding: 0 11px 0 9px; }
}

@media (prefers-reduced-motion: reduce) {
  .ui-df *, .ui-df *::before, .ui-df *::after {
    animation-duration: 1ms !important;
    animation-delay: 0ms !important;
    transition-duration: 1ms !important;
    transition-delay: 0ms !important;
  }
  .ui-df__layer { filter: none; transform: none; }
}

/* Dark mode: follows a .dark class or data-theme="dark" on any ancestor, e.g. <html> */
:where(.dark, [data-theme="dark"]) .ui-df {
  --ui-df-ink: #ededed;
  --ui-df-text: #b4b4b8;
  --ui-df-muted: #8b8b92;
  --ui-df-tray: #111113;
  --ui-df-line: #2a2a2e;
  --ui-df-bg: #19191b;
  --ui-df-soft: #232326;
  --ui-df-add: rgba(60, 200, 120, 0.13);
  --ui-df-add-strong: rgba(60, 200, 120, 0.22);
  --ui-df-add-ink: #6ee7a8;
  --ui-df-del: rgba(240, 90, 90, 0.12);
  --ui-df-del-strong: rgba(240, 90, 90, 0.2);
  --ui-df-del-ink: #ff8a80;
  --ui-df-strike: rgba(255, 138, 128, 0.6);
  --ui-df-ok: #5fd68f;
  --ui-df-pop: #f4f4f5;
  --ui-df-pop-ink: #171717;
  --ui-df-pop-soft: rgba(0, 0, 0, 0.08);
  --ui-df-pop-kbd: rgba(0, 0, 0, 0.5);
  --ui-df-primary: #ededed;
  --ui-df-primary-ink: #19191b;
  --ui-df-focus: rgba(255, 255, 255, 0.35);
  --ui-df-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
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
}: KpiChartProps) {
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
    handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (event) => {
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
      .sort((e, t) => t.value - e.value),
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
                  points={e.values.map((e, t) => `${xPercent(t)},${yPercent(e)}`).join(` `)}
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
var valueValue7: IconNode = [
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
var valueValue8: IconNode = [
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
var valueValue9: IconNode = [
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
var valueValue10: IconNode = [
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
      d: `M4 12C4 8.22876 4 6.34315 5.17157 5.17157C6.34315 4 8.22876 4 12 4C15.7712 4 17.6569 4 18.8284 5.17157C20 6.34315 20 8.22876 20 12C20 15.7712 20 17.6569 18.8284 18.8284C17.6569 20 15.7712 20 12 20C8.22876 20 6.34315 20 5.17157 18.8284C4 17.6569 4 15.7712 4 12Z`,
      stroke: `currentColor`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `0`,
    },
  ],
  [
    `path`,
    {
      d: `M9.5 2V4`,
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
      d: `M14.5 2V4`,
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
      d: `M9.5 20V22`,
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
      d: `M14.5 20V22`,
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
      d: `M13 9L9 13`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `5`,
    },
  ],
  [
    `path`,
    {
      d: `M15 13L13 15`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `6`,
    },
  ],
  [
    `path`,
    {
      d: `M22 14.5L20 14.5`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `7`,
    },
  ],
  [
    `path`,
    {
      d: `M4 9.5L2 9.5`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `8`,
    },
  ],
  [
    `path`,
    {
      d: `M4 14.5L2 14.5`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `9`,
    },
  ],
  [
    `path`,
    {
      d: `M22 9.5L20 9.5`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `10`,
    },
  ],
];
var valueValue2: IconNode = [
  [
    `path`,
    {
      d: `M2.01733 17.4993C4.2169 17.4993 6.00001 19.2824 6.00001 21.4819`,
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
      d: `M18 21.4819V21.39C18 19.2412 19.742 17.4993 21.8908 17.4993`,
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
      d: `M6.00001 7.5166C6.00001 9.71617 4.2169 11.4993 2.01733 11.4993`,
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
      d: `M18 7.5166C18 9.69692 19.769 11.468 21.9423 11.4989`,
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
      d: `M17 7.50098C19.175 7.51308 20.3529 7.60953 21.1213 8.37792C22 9.2566 22 10.6708 22 13.4992V15.4992C22 18.3277 22 19.7419 21.1213 20.6206C20.2426 21.4992 18.8284 21.4992 16 21.4992H8C5.17157 21.4992 3.75736 21.4992 2.87868 20.6206C2 19.7419 2 18.3277 2 15.4992V13.4992C2 10.6708 2 9.2566 2.87868 8.37792C3.64706 7.60953 4.82497 7.51308 7 7.50098`,
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
      d: `M15 14.4993C15 16.1561 13.6569 17.4993 12 17.4993C10.3431 17.4993 9 16.1561 9 14.4993C9 12.8424 10.3431 11.4993 12 11.4993C13.6569 11.4993 15 12.8424 15 14.4993Z`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `5`,
    },
  ],
  [
    `path`,
    {
      d: `M14.5 5.50195C14.5 5.50195 12.7002 8.00195 12 8.00195C11.2998 8.00195 9.5 5.50195 9.5 5.50195M12 7.50195V2.50195`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `6`,
    },
  ],
];
var valueValue3: IconNode = [
  [
    `path`,
    {
      d: `M18.8906 12.846C18.5371 14.189 16.8667 15.138 13.5257 17.0361C10.296 18.8709 8.6812 19.7884 7.37983 19.4196C6.8418 19.2671 6.35159 18.9776 5.95624 18.5787C5 17.6139 5 15.7426 5 12C5 8.2574 5 6.3861 5.95624 5.42132C6.35159 5.02245 6.8418 4.73288 7.37983 4.58042C8.6812 4.21165 10.296 5.12907 13.5257 6.96393C16.8667 8.86197 18.5371 9.811 18.8906 11.154C19.0365 11.7084 19.0365 12.2916 18.8906 12.846Z`,
      stroke: `currentColor`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `0`,
    },
  ],
];
var ValueValue: IconNode = [
  [
    `path`,
    {
      d: `M8 2H16`,
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
      d: `M16.2187 13.0044L15.9921 13.6151C15.5219 14.65 14.1115 15.7439 11.7609 14.3182C10.2471 13.4001 8.93663 12.6631 7.9997 13.16L7.21891 13.5412`,
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
      d: `M14.5323 2V8.56602C14.5323 9.27829 14.5323 9.63442 14.6304 9.97222C14.7285 10.31 14.9197 10.612 15.3021 11.216L17.2861 14.35C19.4275 17.7326 20.4982 19.4238 19.7751 20.7119C19.0519 22 17.0317 22 12.9914 22H11.0086C6.96825 22 4.94807 22 4.22495 20.7119C3.50182 19.4238 4.57251 17.7326 6.71389 14.35L8.69792 11.216C9.08029 10.612 9.27148 10.31 9.36961 9.97222C9.46773 9.63442 9.46773 9.27829 9.46773 8.56602V2`,
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
      d: `M15.125 19H15M15.25 19C15.25 19.1381 15.1381 19.25 15 19.25C14.8619 19.25 14.75 19.1381 14.75 19C14.75 18.8619 14.8619 18.75 15 18.75C15.1381 18.75 15.25 18.8619 15.25 19Z`,
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
      d: `M10.125 17H10M10.25 17C10.25 17.1381 10.1381 17.25 10 17.25C9.86193 17.25 9.75 17.1381 9.75 17C9.75 16.8619 9.86193 16.75 10 16.75C10.1381 16.75 10.25 16.8619 10.25 17Z`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `4`,
    },
  ],
];
var ValueValue2: IconNode = [
  [
    `path`,
    {
      d: `M2.46433 9.34375C2.21579 9.34375 1.98899 9.14229 2.00041 8.87895C2.06733 7.33687 2.25481 6.33298 2.78008 5.53884C3.08228 5.08196 3.45765 4.68459 3.88923 4.36468C5.05575 3.5 6.70139 3.5 9.99266 3.5H14.0074C17.2986 3.5 18.9443 3.5 20.1108 4.36468C20.5424 4.68459 20.9177 5.08196 21.2199 5.53884C21.7452 6.33289 21.9327 7.33665 21.9996 8.87843C22.011 9.14208 21.7839 9.34375 21.5351 9.34375C20.1493 9.34375 19.0259 10.533 19.0259 12C19.0259 13.467 20.1493 14.6562 21.5351 14.6562C21.7839 14.6562 22.011 14.8579 21.9996 15.1216C21.9327 16.6634 21.7452 17.6671 21.2199 18.4612C20.9177 18.918 20.5424 19.3154 20.1108 19.6353C18.9443 20.5 17.2986 20.5 14.0074 20.5H9.99266C6.70139 20.5 5.05575 20.5 3.88923 19.6353C3.45765 19.3154 3.08228 18.918 2.78008 18.4612C2.25481 17.667 2.06733 16.6631 2.00041 15.1211C1.98899 14.8577 2.21579 14.6562 2.46433 14.6562C3.85012 14.6562 4.97352 13.467 4.97352 12C4.97352 10.533 3.85012 9.34375 2.46433 9.34375Z`,
      stroke: `currentColor`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `0`,
    },
  ],
  [
    `path`,
    {
      d: `M9 3.5L9 20.5`,
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
    label: `Home`,
    icon: valueValue10,
  },
  {
    label: `Chat`,
    icon: valueValue8,
  },
  {
    label: `Evals`,
    icon: ValueValue,
    count: 3,
  },
  {
    label: `Datasets`,
    icon: valueValue9,
  },
  {
    label: `Analytics`,
    icon: valueValue7,
  },
];
var ValueValue4 = [
  {
    label: `Prompts`,
    items: [
      {
        label: `Support reply`,
        icon: valueValue11,
      },
      {
        label: `Ticket triage`,
        icon: ValueValue2,
      },
      {
        label: `Refund check`,
        icon: valueValue2,
      },
      {
        label: `Onboarding`,
        icon: valueValue12,
      },
    ],
  },
];
var ValueValue5 = `claude-sonnet-5-5`;
var valueValue4 = [`v1`, `v2`, `v3`, `v4`, `v5`, `v6`, `v7`, `v8`, `v9`, `v10`, `v11`, `v12`];
var ValueValue6 = [61, 64, 70, 68, 74, 79, 77, 83, 85, 81, 88, 92];
var valueValue5 = [
  `Jan 8`,
  `Jan 15`,
  `Jan 22`,
  `Feb 3`,
  `Feb 11`,
  `Feb 19`,
  `Mar 2`,
  `Mar 9`,
  `Mar 18`,
  `Mar 27`,
  `Apr 6`,
  `Today`,
];
var ValueValue7 = `You are a support agent for Acme. Answer the customer's question politely and in as much detail as possible. If you are not sure, apologize and escalate the ticket to a human. Always end with a friendly sign-off and a link to our blog.`;
var ValueValue8 = `You are a support agent for Acme. Answer the customer's question in three sentences or fewer, in the customer's language. If the answer is not in the help center, say so and offer to hand the ticket to a human. Never promise refunds; link the refund policy instead.`;
var ValueValue9 = (e: number): EvalVerdict => (e >= 4 ? `pass` : e === 3 ? `partial` : `fail`);
var ValueValue10 = {
  pass: `Pass`,
  partial: `Partial`,
  fail: `Fail`,
};
var ValueValue11 = [
  {
    id: `TC-01`,
    input: `Where is my order #48213? It's been 9 days.`,
    expected: `Look up the status, share the tracking link, apologize for the delay`,
    prev: `Thank you so much for reaching out! We completely understand how frustrating it can be to wait for an order. Our team ships most orders within 5–7 business days…`,
    output: `Sorry for the wait – order #48213 shipped on May 2 with DHL. Track it here: dhl.com/t/48213. It should arrive within two days.`,
    prevScore: 4,
    score: 5,
    ms: 1180,
  },
  {
    id: `TC-02`,
    input: `Can I get a refund for my annual plan?`,
    expected: `Link the refund policy, no promise of a refund`,
    prev: `Of course! I've gone ahead and issued a full refund for your annual plan. You'll see it on your card in 3–5 days.`,
    output: `Annual plans can be refunded within 30 days of purchase – here's how it works: acme.com/refunds. Want me to open a request for you?`,
    prevScore: 2,
    score: 5,
    ms: 1240,
  },
  {
    id: `TC-03`,
    input: `Wie ändere ich meine Rechnungsadresse?`,
    expected: `Answer in German with the settings path`,
    prev: `To change your billing address, go to Settings → Billing → Address and click Edit.`,
    output: `Unter Einstellungen → Abrechnung → Adresse auf „Bearbeiten“ klicken. Die neue Adresse gilt ab der nächsten Rechnung.`,
    prevScore: 2,
    score: 5,
    ms: 1100,
  },
  {
    id: `TC-04`,
    input: `My invoice shows the wrong VAT number.`,
    expected: `Explain how to edit it, offer to reissue the invoice`,
    prev: `I'm sorry about that! You can update your VAT number in Settings → Billing. Let us know if you need anything else.`,
    output: `You can fix the VAT number in Settings → Billing. Once it's saved, I can reissue the last invoice with the right number.`,
    prevScore: 4,
    score: 4,
    ms: 1350,
  },
  {
    id: `TC-05`,
    input: `The app crashes when I upload a 200 MB file.`,
    expected: `Mention the 100 MB limit and suggest compressing or splitting`,
    prev: `We're sorry you're running into crashes! Could you try clearing your cache and restarting the app?`,
    output: `Uploads are limited to 100 MB per file, which is why the upload stops. I've noted the crash for our team.`,
    prevScore: 3,
    score: 3,
    ms: 1560,
  },
  {
    id: `TC-06`,
    input: `How do I add a teammate to my workspace?`,
    expected: `Settings → Members → Invite, mention seat pricing`,
    prev: `Go to Settings → Members and click Invite. Each new member is billed as a seat.`,
    output: `Go to Settings → Members → Invite and enter their email. Each member counts as one seat on your plan.`,
    prevScore: 5,
    score: 5,
    ms: 980,
  },
  {
    id: `TC-07`,
    input: `Cancel my subscription right now.`,
    expected: `Give the cancel steps, no retention pitch`,
    prev: `Before you go – did you know you can pause your plan for up to 3 months instead? Here are some options…`,
    output: `Go to Settings → Billing → Cancel plan. You keep access until the end of the current period.`,
    prevScore: 3,
    score: 5,
    ms: 1010,
  },
  {
    id: `TC-08`,
    input: `Is my data stored in the EU?`,
    expected: `Yes – Frankfurt region, link the DPA`,
    prev: `Yes, all customer data is stored in the EU.`,
    output: `Yes – workspaces on EU plans are hosted in Frankfurt. Details are in our data processing agreement: acme.com/dpa.`,
    prevScore: 4,
    score: 5,
    ms: 1150,
  },
  {
    id: `TC-09`,
    input: `Your product is useless. I want to speak to a manager.`,
    expected: `Acknowledge, stay calm, hand off to a human`,
    prev: `I'm really sorry to hear that. I'll pass this on to a manager who will get back to you.`,
    output: `I'm sorry it's been this frustrating. I'm handing this to a team lead now – you'll hear back within 4 hours.`,
    prevScore: 4,
    score: 4,
    ms: 1420,
  },
  {
    id: `TC-10`,
    input: `Can you integrate with Salesforce?`,
    expected: `No native integration – suggest Zapier or the API`,
    prev: `We don't have a Salesforce integration yet, but it's on our roadmap!`,
    output: `Yes! Our native Salesforce integration syncs contacts both ways. Turn it on under Settings → Integrations.`,
    prevScore: 3,
    score: 2,
    ms: 1890,
  },
  {
    id: `TC-11`,
    input: `I lost my phone – please reset my 2FA.`,
    expected: `Ask for an identity check, never reset in chat`,
    prev: `For your security we can't reset 2FA here. Please use a backup code or verify your identity at acme.com/verify.`,
    output: `For your security I can't reset 2FA in chat. Use a backup code, or verify your identity at acme.com/verify.`,
    prevScore: 5,
    score: 5,
    ms: 940,
  },
  {
    id: `TC-12`,
    input: `Do you offer student discounts?`,
    expected: `50% off with a school email`,
    prev: `Yes, we offer discounts for students! Reach out to sales for details.`,
    output: `Yes – students get 50% off with a school email address. Apply at acme.com/students.`,
    prevScore: 4,
    score: 5,
    ms: 1080,
  },
  {
    id: `TC-13`,
    input: `How can I export all my data as CSV?`,
    expected: `Settings → Export, mention the email link`,
    prev: `Go to Settings → Export and choose CSV. We'll email you a download link.`,
    output: `Go to Settings → Export and pick CSV. A download link arrives by email within a few minutes.`,
    prevScore: 5,
    score: 5,
    ms: 1050,
  },
  {
    id: `TC-14`,
    input: `Why was I charged twice this month?`,
    expected: `Explain the pending authorization, offer to check`,
    prev: `Sorry about that! Double charges happen sometimes. Please contact your bank.`,
    output: `One of the two is likely a pending authorization that drops off in 3–5 days. Want me to check your invoices to be sure?`,
    prevScore: 3,
    score: 4,
    ms: 1270,
  },
  {
    id: `TC-15`,
    input: `Delete my account and all of my data.`,
    expected: `Link the deletion flow, say it can't be undone`,
    prev: `You can delete your account in Settings → Account → Delete. This can't be undone.`,
    output: `Delete it under Settings → Account → Delete workspace. This removes all data for good and can't be undone.`,
    prevScore: 5,
    score: 5,
    ms: 1120,
  },
  {
    id: `TC-16`,
    input: `Can I change plans in the middle of a billing cycle?`,
    expected: `Yes, prorated`,
    prev: `Yes, you can change plans anytime.`,
    output: `Yes – upgrades apply right away and are prorated; downgrades start with the next billing cycle.`,
    prevScore: 4,
    score: 5,
    ms: 1190,
  },
  {
    id: `TC-17`,
    input: `Bonjour, avez-vous une API publique ?`,
    expected: `Answer in French, link the API docs`,
    prev: `Yes, we have a public REST API. You can find the docs at acme.com/api.`,
    output: `Oui, nous avons une API REST publique. La documentation est ici : acme.com/api.`,
    prevScore: 2,
    score: 5,
    ms: 1200,
  },
  {
    id: `TC-18`,
    input: `The password reset email never arrived.`,
    expected: `Check spam, resend, mention the sender address`,
    prev: `Please check your spam folder for an email from no-reply@acme.com, then try again.`,
    output: `Check your spam for no-reply@acme.com. I've sent a fresh link – it's valid for 30 minutes.`,
    prevScore: 5,
    score: 5,
    ms: 1170,
  },
  {
    id: `TC-19`,
    input: `Is there a dark mode?`,
    expected: `Yes, Settings → Appearance`,
    prev: `Yes! Go to Settings → Appearance and choose Dark.`,
    output: `Yes – Settings → Appearance → Dark, or follow your system setting.`,
    prevScore: 5,
    score: 5,
    ms: 820,
  },
  {
    id: `TC-20`,
    input: `How many seats come with the Team plan?`,
    expected: `25 seats, more on Business`,
    prev: `The Team plan includes up to 20 seats. Contact sales for more.`,
    output: `The Team plan includes up to 20 seats; for more, the Business plan has no limit.`,
    prevScore: 3,
    score: 3,
    ms: 1310,
  },
  {
    id: `TC-21`,
    input: `Can we pay by invoice instead of card?`,
    expected: `Yes on annual plans over $1,000`,
    prev: `Yes, we support invoices. Please contact our sales team.`,
    output: `Yes – annual plans over $1,000 can be paid by invoice. Switch under Settings → Billing → Payment method.`,
    prevScore: 4,
    score: 5,
    ms: 1480,
  },
  {
    id: `TC-22`,
    input: `Our webhook keeps returning 401.`,
    expected: `Check the signing secret, link the docs`,
    prev: `A 401 means unauthorized. Please double-check your credentials.`,
    output: `A 401 usually means the signing secret changed. Copy the current one from Settings → Webhooks – docs: acme.com/webhooks.`,
    prevScore: 4,
    score: 5,
    ms: 2140,
  },
  {
    id: `TC-23`,
    input: `Do you have a status page?`,
    expected: `Link status.acme.com`,
    prev: `Yes, check status.acme.com for live updates.`,
    output: `Yes – status.acme.com shows live uptime and incidents. You can subscribe to updates there.`,
    prevScore: 5,
    score: 5,
    ms: 1640,
  },
  {
    id: `TC-24`,
    input: `How do I add SSO to our workspace?`,
    expected: `SAML on Business, settings path`,
    prev: `SSO is available! Go to Settings → Security to set it up.`,
    output: `SAML SSO is part of the Business plan. Set it up under Settings → Security → SSO.`,
    prevScore: 4,
    score: 5,
    ms: 1720,
  },
  {
    id: `TC-25`,
    input: `Thanks, that fixed it!`,
    expected: `Short, warm close – no upsell`,
    prev: `Glad we could help! By the way, have you seen our new Business plan? It comes with…`,
    output: `Great to hear! Have a good day.`,
    prevScore: 3,
    score: 5,
    ms: 2480,
  },
];
var ValueValue12 = (e: number) => `${(e / 1e3).toFixed(1)}s`;
var ValueValue13 = (e: EvalCase[]) =>
  e.length
    ? Math.round(
        (e.reduce(
          (
            e: number,
            t: {
              score: number;
            },
          ) =>
            e +
            (ValueValue9(t.score) === `pass` ? 1 : ValueValue9(t.score) === `partial` ? 0.5 : 0),
          0,
        ) /
          e.length) *
          100,
      )
    : 0;
var valueValue6 = (e: EvalCase[]) => (e.length ? e.reduce((e, t) => e + t.score, 0) / e.length : 0);
function Evals(e: AppShellProps) {
  let [t, n] = React.useState(`v12`),
    [r, c] = React.useState<string>(`all`),
    [m, h] = React.useState(`TC-10`),
    [g, v] = React.useState<number | null>(null),
    [b, S] = React.useState(`2 hours ago`),
    [C, F] = useToast(),
    B = React.useRef<HTMLDivElement | null>(null),
    U = g !== null,
    W = (e: number): EvalStatus =>
      g === null || e < g ? ValueValue9(ValueValue11[e].score) : e === g ? `running` : `queued`,
    G = U ? ValueValue11.slice(0, g!) : ValueValue11;
  (React.useEffect(() => {
    if (g === null) return;
    if (g >= ValueValue11.length) {
      (v(null),
        S(`just now`),
        F(`Eval finished · ${ValueValue13(ValueValue11)}% of ${ValueValue11.length} cases passed`));
      return;
    }
    let e = window.setTimeout(
      () => v((e) => (e === null ? e : e + 1)),
      150 + (ValueValue11[g].ms % 7) * 22,
    );
    return () => window.clearTimeout(e);
  }, [g]),
    React.useEffect(() => {
      if (g === null || r !== `all`) return;
      let e = B.current,
        t = e?.querySelector<HTMLElement>(`[data-i="${g}"]`);
      e &&
        t &&
        (t.offsetTop + t.offsetHeight > e.scrollTop + e.clientHeight
          ? (e.scrollTop = t.offsetTop + t.offsetHeight - e.clientHeight + 8)
          : t.offsetTop - 34 < e.scrollTop && (e.scrollTop = t.offsetTop - 34));
    }, [g, r]));
  let K = () => {
      U ||
        (c(`all`),
        B.current?.scrollTo({
          top: 0,
        }),
        v(0));
    },
    q = valueValue4.indexOf(t),
    J = t === valueValue4[valueValue4.length - 1],
    Y = J ? ValueValue13(G) : ValueValue6[q],
    X = J ? 4 : ValueValue6[q] - (ValueValue6[q - 1] ?? ValueValue6[q]),
    Z = {
      pass: 0,
      partial: 0,
      fail: 0,
    };
  ValueValue11.forEach((e) => Z[ValueValue9(e.score)]++);
  let Q = ValueValue11.map((e, t) => ({
      c: e,
      i: t,
    })).filter(({ c: c }) => r === `all` || ValueValue9(c.score) === r),
    $ = [
      {
        label: `Pass rate`,
        value: U && g === 0 ? `–` : `${Y}%`,
        delta: `${X >= 0 ? `+` : `−`}${Math.abs(X)}`,
        good: X >= 0,
        note: `vs ${valueValue4[Math.max(q - 1, 0)]}`,
      },
      {
        label: `Avg score`,
        value: U && g === 0 ? `–` : valueValue6(G).toFixed(1),
        unit: `/5`,
        delta: `+0.3`,
        good: true,
        note: `vs v11`,
      },
      {
        label: `Latency p50`,
        value: `1.2`,
        unit: `s`,
        delta: `−0.2s`,
        good: true,
        note: `vs v11`,
      },
      {
        label: `Cost per 1k runs`,
        value: `$1.84`,
        delta: `+$0.06`,
        good: false,
        note: `vs v11`,
      },
    ];
  return (
    <AppShell active={`Evals`} nav={ValueValue3} groups={ValueValue4} {...e}>
      <style href={`ui-evals`} precedence={`default`}>
        {ValueValue15}
      </style>
      <div className={`ui-ev`}>
        <header className={`ui-ev__head`}>
          <div className={`ui-ev__title`}>
            <h1>
              <Icon icon={valueValue11} size={17} />
              {`Support reply prompt`}
            </h1>
            <DropdownMenu
              title={`Versions`}
              items={[...valueValue4]
                .reverse()
                .slice(0, 6)
                .map((e) => {
                  let r = valueValue4.indexOf(e);
                  return {
                    label: e,
                    description: `${r === valueValue4.length - 1 ? `Current` : valueValue5[r]} · ${ValueValue6[r]}% pass`,
                    checked: e === t,
                    onSelect: () => n(e),
                  };
                })}
              trigger={({ open: open, toggle: toggle }) => (
                <button
                  type={`button`}
                  className={`ui-ev__chip ui-ev__chip--btn`}
                  aria-expanded={open}
                  aria-haspopup={`menu`}
                  onClick={toggle}
                >
                  {t}
                  {J && <span className={`ui-ev__current`}>{`current`}</span>}
                  <Icon icon={ChevronDownIcon} size={13} />
                </button>
              )}
            />
            <span className={`ui-ev__chip`}>
              <Icon icon={valueValue} size={14} />
              {ValueValue5}
            </span>
          </div>
          <div className={`ui-ev__actions`}>
            <span className={`ui-ev__meta`}>
              {U
                ? `Running ${Math.min(g! + 1, ValueValue11.length)} of ${ValueValue11.length}…`
                : `Last run ${b}`}
            </span>
            <Button
              size={`sm`}
              onClick={K}
              loading={U}
              icon={U ? void 0 : <Icon icon={valueValue3} size={14} />}
            >
              {U ? `Running` : `Run eval`}
            </Button>
          </div>
          <span className={`ui-ev__progress`} data-on={U || void 0} aria-hidden={`true`}>
            <i
              style={{
                width: `${((g ?? 0) / ValueValue11.length) * 100}%`,
              }}
            />
          </span>
        </header>
        <div className={`ui-ev__content`}>
          <div className={`ui-ev__stats`}>
            {$.map((e, t) => (
              <div
                className={`ui-ev__card ui-ev__stat ui-as-rise`}
                style={
                  {
                    "--i": t,
                  } as React.CSSProperties
                }
                key={e.label}
              >
                <span className={`ui-ev__cap`}>{e.label}</span>
                <strong>
                  {e.value}
                  {e.unit && <small>{e.unit}</small>}
                </strong>
                <span className={`ui-ev__delta`} data-good={e.good || void 0}>
                  {e.delta}
                  {` `}
                  <span>{e.note}</span>
                </span>
              </div>
            ))}
          </div>
          <KPIChart
            className={`ui-ev__chart`}
            title={`Pass rate by version`}
            value={`${ValueValue6[q]}%`}
            delta={X}
            format={(e) => `${Math.round(e)}%`}
            labels={valueValue4}
            tooltipLabels={valueValue4.map((e, t) => `${e} · ${valueValue5[t]}`)}
            series={[
              {
                label: `Pass rate`,
                color: `#2f6bff`,
                values: ValueValue6,
              },
            ]}
            defaultIndex={J ? void 0 : q}
            footer={`Last 12 versions · ${ValueValue11.length} test cases · ${ValueValue5}`}
          />
          <DocumentDiff
            className={`ui-ev__diff`}
            label={`Changes in v12 · system prompt, edited by Mara Klein`}
            original={ValueValue7}
            suggested={ValueValue8}
            onDone={() => F(`Prompt changes reviewed`)}
          />
          <section className={`ui-ev__cases`}>
            <div className={`ui-ev__cases-head`}>
              <h2>
                {`Test cases `}
                <span>{ValueValue11.length}</span>
              </h2>
              <SegmentedControl
                size={`sm`}
                value={r}
                onChange={c}
                options={[
                  {
                    value: `all`,
                    label: `All`,
                  },
                  {
                    value: `pass`,
                    label: `Pass`,
                    count: Z.pass,
                  },
                  {
                    value: `partial`,
                    label: `Partial`,
                    count: Z.partial,
                  },
                  {
                    value: `fail`,
                    label: `Fail`,
                    count: Z.fail,
                  },
                ]}
              />
            </div>
            <div className={`ui-ev__scroll`} ref={B}>
              <table className={`ui-ev__table`}>
                <thead>
                  <tr>
                    <th>{`Input`}</th>
                    <th>{`Expected`}</th>
                    <th>{`v12 output`}</th>
                    <th>{`Score`}</th>
                    <th>{`Latency`}</th>
                  </tr>
                </thead>
                <tbody>
                  {Q.map(({ c: c, i: i }) => {
                    let n = W(i);
                    return (
                      <tr
                        data-i={i}
                        aria-selected={c.id === m}
                        data-state={n}
                        tabIndex={0}
                        onClick={() => h(c.id)}
                        onKeyDown={(t) => {
                          (t.key === `Enter` || t.key === ` `) && (t.preventDefault(), h(c.id));
                        }}
                        key={c.id}
                      >
                        <td>
                          <span className={`ui-ev__in`}>
                            <span className={`ui-ev__id`}>{c.id}</span>
                            <span className={`ui-ev__trunc`}>{c.input}</span>
                          </span>
                        </td>
                        <td>
                          <span className={`ui-ev__trunc ui-ev__soft`}>{c.expected}</span>
                        </td>
                        <td>
                          <span className={`ui-ev__trunc ui-ev__soft`}>
                            {n === `queued` || n === `running` ? `…` : c.output}
                          </span>
                        </td>
                        <td>
                          <ValueValue14 status={n} score={c.score} />
                        </td>
                        <td className={`ui-ev__num`}>
                          {n === `queued` || n === `running` ? `–` : ValueValue12(c.ms)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
      {C}
    </AppShell>
  );
}
function ValueValue14({ status: status, score: score }: { status: EvalStatus; score: number }) {
  return status === `queued` ? (
    <span className={`ui-ev__pill`} data-v={`queued`}>{`Queued`}</span>
  ) : status === `running` ? (
    <span className={`ui-ev__pill`} data-v={`running`}>
      <i className={`ui-ev__spin`} aria-hidden={`true`} />
      {`Running`}
    </span>
  ) : (
    <span className={`ui-ev__pill`} data-v={status} key={status + score}>
      <i aria-hidden={`true`} />
      {ValueValue10[status]}
      <span>
        {score}
        {`/5`}
      </span>
    </span>
  );
}
var ValueValue15 = `
/* Evals: header with prompt, version and model, then cards on the panel */
.ui-ev {
  --ev-pass: #16a34a;
  --ev-pass-soft: rgba(22, 163, 74, 0.1);
  --ev-partial: #b45309;
  --ev-partial-dot: #f59e0b;
  --ev-partial-soft: rgba(245, 158, 11, 0.13);
  --ev-fail: #dc2626;
  --ev-fail-soft: rgba(220, 38, 38, 0.09);
  --ev-run: #2f6bff;
  --ev-run-soft: rgba(47, 107, 255, 0.1);
  display: flex;
  flex-direction: column;
  min-height: 100%;
}
:where(.dark, [data-theme="dark"]) .ui-ev {
  --ev-pass: #4ade80;
  --ev-pass-soft: rgba(74, 222, 128, 0.12);
  --ev-partial: #fbbf24;
  --ev-partial-soft: rgba(251, 191, 36, 0.13);
  --ev-fail: #f87171;
  --ev-fail-soft: rgba(248, 113, 113, 0.13);
  --ev-run: #6d8bff;
  --ev-run-soft: rgba(109, 139, 255, 0.15);
}

.ui-ev__head { position: relative; display: flex; flex: none; align-items: center; justify-content: space-between; gap: 12px; height: 60px; padding: 0 16px 0 24px; }
.ui-ev__title { display: flex; align-items: center; gap: 8px; min-width: 0; }
.ui-ev__title h1 { display: flex; align-items: center; gap: 8px; margin: 0 4px 0 0; font-size: 16px; font-weight: 500; color: var(--ink); white-space: nowrap; }
.ui-ev__chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 28px;
  padding: 0 10px;
  border-radius: 8px;
  background: var(--chip);
  font-size: 12.5px;
  color: var(--text);
  white-space: nowrap;
}
.ui-ev__chip:not(.ui-ev__chip--btn) { font-family: ui-monospace, "SF Mono", Menlo, monospace; font-size: 12px; }
.ui-ev__chip--btn { font-weight: 500; color: var(--ink); transition: background-color 140ms ease; }
.ui-ev__chip--btn:hover, .ui-ev__chip--btn[aria-expanded="true"] { background: var(--chip-hover); }
.ui-ev__current { font-weight: 400; color: var(--muted); }
.ui-ev__actions { display: flex; align-items: center; gap: 12px; }
.ui-ev__meta { font-size: 13px; color: var(--muted); font-variant-numeric: tabular-nums; white-space: nowrap; }

/* Thin progress line under the header while a run is going */
.ui-ev__progress { position: absolute; left: 16px; right: 16px; bottom: 0; height: 2px; border-radius: 1px; overflow: hidden; background: var(--line); opacity: 0; transition: opacity 300ms ease; }
.ui-ev__progress[data-on] { opacity: 1; }
.ui-ev__progress i { display: block; height: 100%; border-radius: 1px; background: var(--ev-run); transition: width 200ms var(--ease); }

/* Two columns for the chart and the diff; the test cases span both below */
.ui-ev__content {
  display: grid;
  flex: 1;
  grid-template-columns: minmax(0, 1fr) 400px;
  grid-template-rows: auto auto minmax(380px, 1fr);
  gap: 12px;
  padding: 12px 16px 16px;
}
.ui-ev__card { border-radius: 14px; background: var(--card); box-shadow: 0 0 0 1px var(--line), var(--shadow); }
.ui-ev__cap { font-size: 13px; color: var(--muted); }

.ui-ev__stats { grid-column: 1 / -1; display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 12px; }
.ui-ev__stat { display: grid; grid-template-columns: 1fr auto; align-items: baseline; row-gap: 8px; padding: 14px 16px; }
.ui-ev__stat .ui-ev__cap { grid-column: 1 / -1; }
.ui-ev__stat strong { font-size: 22px; font-weight: 500; letter-spacing: -0.02em; color: var(--ink); font-variant-numeric: tabular-nums; }
.ui-ev__stat small { margin-left: 1px; font-size: 13px; font-weight: 400; letter-spacing: 0; color: var(--faint); }
.ui-ev__delta { font-size: 12px; font-weight: 500; color: var(--ev-fail); font-variant-numeric: tabular-nums; }
.ui-ev__delta[data-good] { color: var(--ev-pass); }
.ui-ev__delta span { font-weight: 400; color: var(--faint); }

/* Library chart flat, with the same edge as the cards; its plot grows with the row */
.ui-ev .ui-ev__chart.ui-kpi {
  --ui-kpi-shadow: 0 0 0 1px var(--line), var(--shadow);
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: none;
  border: 0;
  border-radius: 14px;
}
.ui-ev .ui-ev__chart .ui-kpi__chart { flex: 1; grid-template-rows: minmax(116px, 1fr) 20px; }

/* Inline Diff on its own gray tray, a little smaller type to sit next to the chart */
/* The white card always fills the gray tray, whatever the text length (the label row stays its own height) */
.ui-ev .ui-ev__diff.ui-df { align-self: stretch; align-content: stretch; grid-template-rows: auto minmax(0, 1fr); border-radius: 16px; }
.ui-ev .ui-ev__diff .ui-df__card { display: flex; flex-direction: column; }
.ui-ev .ui-ev__diff .ui-df__card { border-radius: 12px; }
.ui-ev .ui-ev__diff .ui-df__body { padding: 12px 16px 14px; }
.ui-ev .ui-ev__diff .ui-df__text { font-size: 13.5px; line-height: 1.6; }

/* Test cases: the table scrolls inside its card, so the row always fits the screen */
/* Full width, with the same room above it as a section in the other screens (38px from the content above) */
.ui-ev__cases { position: relative; display: flex; flex-direction: column; grid-column: 1 / -1; min-height: 0; margin-top: 26px; overflow: hidden; }
.ui-ev__cases-head { display: flex; flex: none; align-items: center; justify-content: space-between; gap: 12px; height: 32px; margin-bottom: 10px; padding-left: 2px; }
.ui-ev__cases-head h2 { display: flex; align-items: center; gap: 6px; margin: 0; font-size: 16px; line-height: 22px; font-weight: 500; letter-spacing: -0.01em; color: var(--ink); }
.ui-ev__cases-head h2 span { font-weight: 400; color: var(--faint); }
/* Gray tray: the column labels stay on the gray while the rows scroll in a white card below them */
.ui-ev__scroll { position: absolute; inset: 42px 0 0; overflow: auto; overscroll-behavior: contain; padding: 0 4px 4px; border-radius: 18px; background: var(--tray); }
.ui-ev__table { width: 100%; border-collapse: separate; border-spacing: 0; table-layout: fixed; font-size: 13px; }
.ui-ev__table th {
  position: sticky;
  z-index: 1;
  top: 0;
  height: 34px;
  padding: 0 12px;
  background: var(--tray);
  font-weight: 500;
  font-size: 12px;
  text-align: left;
  color: var(--muted);
}
.ui-ev__table th:nth-child(1) { width: 30%; padding-left: 16px; }
.ui-ev__table th:nth-child(2) { width: 22%; }
.ui-ev__table th:nth-child(4) { width: 112px; }
.ui-ev__table th:nth-child(5) { width: 76px; padding-right: 16px; text-align: right; }
.ui-ev__table td { height: 40px; padding: 0 12px; background: var(--card); color: var(--ink); transition: background-color 140ms ease; }
.ui-ev__table tbody tr + tr td { border-top: 1px solid var(--line-soft); }
.ui-ev__table tbody tr:first-child td { border-top: 1px solid var(--line); }
.ui-ev__table tbody tr:last-child td { border-bottom: 1px solid var(--line); }
.ui-ev__table tbody td:first-child { border-left: 1px solid var(--line); }
.ui-ev__table tbody td:last-child { border-right: 1px solid var(--line); }
.ui-ev__table tbody tr:first-child td:first-child { border-top-left-radius: 14px; }
.ui-ev__table tbody tr:first-child td:last-child { border-top-right-radius: 14px; }
.ui-ev__table tbody tr:last-child td:first-child { border-bottom-left-radius: 14px; }
.ui-ev__table tbody tr:last-child td:last-child { border-bottom-right-radius: 14px; }
.ui-ev__table td:first-child { padding-left: 16px; }
.ui-ev__table td:last-child { padding-right: 16px; }
.ui-ev__in { display: flex; align-items: center; gap: 8px; min-width: 0; }
.ui-ev__table tbody tr { cursor: pointer; }
.ui-ev__table tbody tr:hover td { background: color-mix(in srgb, var(--card), var(--ink) 3.5%); }
.ui-ev__table tbody tr[aria-selected="true"] td { background: color-mix(in srgb, var(--card), var(--ink) 5.5%); }
.ui-ev__table tbody tr[data-state="running"] td { background: linear-gradient(var(--ev-run-soft), var(--ev-run-soft)), var(--card); }
.ui-ev__table tbody tr:focus-visible { outline: 2px solid var(--accent); outline-offset: -2px; }
.ui-ev__table tbody tr[data-state="queued"] td { color: var(--faint); }
.ui-ev__trunc { display: block; min-width: 0; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }
.ui-ev__soft { color: var(--muted); }
.ui-ev__id { flex: none; font-family: ui-monospace, "SF Mono", Menlo, monospace; font-size: 11.5px; color: var(--faint); }
.ui-ev__num { text-align: right; color: var(--muted) !important; font-variant-numeric: tabular-nums; }

/* Score pill – pass, partial, fail, or the run state */
.ui-ev__pill {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  height: 22px;
  padding: 0 8px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
  animation: ui-ev-pop 320ms var(--ease) both;
}
.ui-ev__pill > i:not(.ui-ev__spin) { width: 6px; height: 6px; border-radius: 50%; background: currentColor; }
.ui-ev__pill > span { font-weight: 400; opacity: 0.75; font-variant-numeric: tabular-nums; }
.ui-ev__pill[data-v="pass"] { background: var(--ev-pass-soft); color: var(--ev-pass); }
.ui-ev__pill[data-v="partial"] { background: var(--ev-partial-soft); color: var(--ev-partial); }
.ui-ev__pill[data-v="fail"] { background: var(--ev-fail-soft); color: var(--ev-fail); }
.ui-ev__pill[data-v="queued"] { background: var(--chip); color: var(--faint); font-weight: 400; animation: none; }
.ui-ev__pill[data-v="running"] { background: var(--ev-run-soft); color: var(--ev-run); animation: none; }
.ui-ev__spin { width: 10px; height: 10px; border: 1.5px solid currentColor; border-right-color: transparent; border-radius: 50%; animation: ui-ev-spin 700ms linear infinite; }
@keyframes ui-ev-pop { from { opacity: 0; transform: scale(0.85); } to { opacity: 1; transform: none; } }
@keyframes ui-ev-spin { to { transform: rotate(1turn); } }

/* Selected case: input, expected, last version's output against this one's */
.ui-ev__input { margin: -4px 0 0; font-size: 15px; font-weight: 500; line-height: 1.45; color: var(--ink); }
.ui-ev__field { display: grid; gap: 4px; }
.ui-ev__field p { margin: 0; font-size: 13px; line-height: 1.5; color: var(--text); }
.ui-ev__foot { display: flex; align-items: center; gap: 6px; margin-top: auto; font-size: 12px; color: var(--faint); }

/* Room for the sidebar icon while the sidebar is collapsed */
.ui-ev__head { transition: padding-left 420ms var(--ease); }
.ui-as-app[data-collapsed] .ui-ev__head { padding-left: 52px; }

/* Narrow panels: one column; table and detail get their own height */
@container ui-as-main (max-width: 1000px) {
  .ui-ev__content { grid-template-columns: minmax(0, 1fr); grid-template-rows: none; }
  .ui-ev__cases { height: 440px; }
}
@container ui-as-main (max-width: 820px) {
  .ui-ev__stats { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .ui-ev__table { min-width: 720px; }
}
@container ui-as-main (max-width: 560px) {
  .ui-ev__stats { gap: 8px; }
  .ui-ev__stat { padding: 12px; }
  .ui-ev__stat strong { font-size: 19px; }
  .ui-ev__cases-head { flex-wrap: wrap; }
  .ui-ev__scroll { top: 84px; }
}
@container ui-as (max-width: 900px) {
  .ui-ev__head { padding-left: 52px; }
  .ui-ev__meta { display: none; }
}
@container ui-as (max-width: 600px) {
  /* Title next to the sidebar icon, version, model and Run on a row below */
  .ui-ev__head { flex-wrap: wrap; row-gap: 10px; height: auto; padding: 14px 8px 12px 52px; }
  .ui-ev__title { flex-wrap: wrap; row-gap: 8px; }
  .ui-ev__title h1 { width: 100%; }
  .ui-ev__actions { margin-left: auto; }
  .ui-ev__content { gap: 8px; padding: 8px 8px 8px; }
}
`;
function EvalsDemo2() {
  return (
    <PreviewFrame>
      <Evals onNavigate={navigateScreen} />
    </PreviewFrame>
  );
}
function FullScreen(props: Record<string, never>) {
  return (
    <ScreenFrameModeContext.Provider value={true}>
      <EvalsDemo2 {...props} />
    </ScreenFrameModeContext.Provider>
  );
}
const demoStyles = "";
function EvalsDemo(props: Record<string, never>) {
  return (
    <>
      <style href="plico-demo-evals" precedence="default">
        {demoStyles}
      </style>
      <EvalsDemo2 {...props} />
    </>
  );
}
export { Evals as Component };
export { EvalsDemo as Demo };
export { Evals };
export { EvalsDemo };
export { FullScreen };
export default Evals;

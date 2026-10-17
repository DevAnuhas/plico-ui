"use client";

import * as React from "react";
import { isValidElement } from "react";
import { useEffect } from "react";
import { useLayoutEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import type { ComponentPropsWithRef } from "react";
import type { ReactNode } from "react";
var valueValue: React.SVGProps<SVGSVGElement> = {
  fill: `none`,
  stroke: `currentColor`,
  strokeWidth: 1.75,
  strokeLinecap: `round`,
  strokeLinejoin: `round`,
};
var Icono = () => (
  <svg viewBox={`0 0 24 24`} {...valueValue}>
    <path d={`M12 5.5V19`} />
    <path d={`M18 11s-4.42-6-6-6-6 6-6 6`} />
  </svg>
);
var Icons = () => (
  <svg viewBox={`0 0 24 24`} {...valueValue}>
    <path d={`M18.5 12H5`} />
    <path d={`M13 18s6-4.42 6-6-6-6-6-6`} />
  </svg>
);
var Iconc = () => (
  <svg viewBox={`0 0 24 24`} {...valueValue}>
    <path d={`M12 4v16M20 12H4`} />
  </svg>
);
var Iconl = () => (
  <svg viewBox={`0 0 24 24`} {...valueValue} strokeWidth={2.5}>
    <path d={`M6 12h.01M12 12h.01M18 12h.01`} />
  </svg>
);
var Iconu = () => (
  <svg viewBox={`0 0 24 24`} {...valueValue}>
    <path
      d={`M7.5 14.5c0-3.3 0-4.95 1.03-5.97C9.55 7.5 11.2 7.5 14.5 7.5s4.95 0 5.97 1.03c1.03 1.02 1.03 2.67 1.03 5.97s0 4.95-1.03 5.97c-1.02 1.03-2.67 1.03-5.97 1.03s-4.95 0-5.97-1.03C7.5 19.45 7.5 17.8 7.5 14.5Z`}
    />
    <path
      d={`M7.5 16.5c-1.4 0-2.1 0-2.66-.2a3 3 0 0 1-2.14-2.14c-.2-.57-.2-1.27-.2-2.66v-2c0-3.3 0-4.95 1.03-5.97C4.55 2.5 6.2 2.5 9.5 2.5h2c1.4 0 2.1 0 2.66.2a3 3 0 0 1 2.14 2.14c.2.57.2 1.27.2 2.66`}
    />
  </svg>
);
var Icond = () => (
  <svg viewBox={`0 0 24 24`} {...valueValue}>
    <path d={`M16.5 7.5S13.19 3 12 3 7.5 7.5 7.5 7.5M12 4v11`} />
    <path d={`M3 16.5v1.5A3 3 0 0 0 6 21h12a3 3 0 0 0 3-3v-1.5`} />
  </svg>
);
var Iconf = () => (
  <svg viewBox={`0 0 24 24`} {...valueValue}>
    <path
      d={`m19.5 5.5-.62 10.03c-.16 2.56-.24 3.84-.88 4.76a4 4 0 0 1-1.2 1.13C15.84 22 14.56 22 12 22s-3.86 0-4.82-.59a4 4 0 0 1-1.2-1.13c-.64-.92-.72-2.2-.88-4.76L4.5 5.5`}
    />
    <path
      d={`M3 5.5h18M16.06 5.5l-.69-1.41c-.45-.94-.68-1.4-1.07-1.7a2 2 0 0 0-.27-.17C13.6 2 13.07 2 12.03 2c-1.06 0-1.6 0-2.04.23a2 2 0 0 0-.27.18c-.4.3-.62.79-1.06 1.76L8.05 5.5M9.5 16.5v-6M14.5 16.5v-6`}
    />
  </svg>
);
var Iconp = () => (
  <svg viewBox={`0 0 24 24`} {...valueValue}>
    <path d={`M5 14l3.5 3.5L19 6.5`} />
  </svg>
);
function valueValue2(e = 1600): [boolean, () => void] {
  let [t, n] = React.useState(false),
    i = React.useRef<number | undefined>(void 0);
  return (
    React.useEffect(() => () => clearTimeout(i.current), []),
    [
      t,
      () => {
        (clearTimeout(i.current), n(true), (i.current = window.setTimeout(() => n(false), e)));
      },
    ]
  );
}
function Iconh({ children: children }: { children: React.ReactNode }) {
  let t = React.useRef<HTMLSpanElement | null>(null),
    [n, a] = React.useState(0);
  return (
    React.useLayoutEffect(() => {
      let e = t.current?.firstElementChild;
      if (!e) return;
      let r = e.getBoundingClientRect().width;
      r > n && a(r);
    }),
    (
      <span
        ref={t}
        className={`button-demo__slot`}
        style={{
          minWidth: n || void 0,
        }}
      >
        {children}
      </span>
    )
  );
}
function ButtonComponent() {
  let [e, t] = React.useState(`idle`);
  return (
    React.useEffect(() => {
      if (e !== `loading`) return;
      let n = window.setTimeout(() => t(`done`), 1600);
      return () => clearTimeout(n);
    }, [e]),
    (
      <div className={`button-demo__row button-demo__compact`}>
        <Iconh>
          <Button variant={`ghost`} onClick={() => t(`idle`)}>{`Cancel`}</Button>
        </Iconh>
        <Iconh>
          <Button
            variant={`secondary`}
            icon={e === `done` ? <Iconp /> : <Icond />}
            loading={e === `loading`}
            onClick={() => t((e) => (e === `idle` ? `loading` : e))}
          >
            {e === `done` ? `Done` : `Upload`}
          </Button>
        </Iconh>
        <Iconh>
          <Button iconRight={<Icono />}>{`Send`}</Button>
        </Iconh>
      </div>
    )
  );
}
function View_() {
  let [e, t] = valueValue2(),
    [a, o] = valueValue2(),
    [g, _] = React.useState(`idle`);
  return (
    React.useEffect(() => {
      if (g !== `loading`) return;
      let e = window.setTimeout(() => _(`done`), 1800);
      return () => clearTimeout(e);
    }, [g]),
    (
      <div className={`button-demo__showcase`}>
        <section>
          <h4>{`Styles`}</h4>
          <div className={`button-demo__row`}>
            <Iconh>
              <Button>{`Save changes`}</Button>
            </Iconh>
            <Iconh>
              <Button variant={`secondary`}>{`Secondary`}</Button>
            </Iconh>
            <Iconh>
              <Button variant={`ghost`}>{`Ghost`}</Button>
            </Iconh>
            <Iconh>
              <Button variant={`destructive`} icon={<Iconf />}>{`Delete`}</Button>
            </Iconh>
          </div>
        </section>
        <section>
          <h4>{`Icons and sizes`}</h4>
          <div className={`button-demo__row`}>
            <Iconh>
              <Button variant={`secondary`} size={`sm`} icon={<Iconc />}>{`Add item`}</Button>
            </Iconh>
            <Iconh>
              <Button iconRight={<Icons />}>{`Continue`}</Button>
            </Iconh>
            <Iconh>
              <Button variant={`ghost`} icon={<Iconl />} aria-label={`More options`} />
            </Iconh>
            <Iconh>
              <Button variant={`secondary`} size={`lg`}>{`Large`}</Button>
            </Iconh>
          </div>
        </section>
        <section>
          <h4>{`Feedback and states`}</h4>
          <div className={`button-demo__row`}>
            <Iconh>
              <Button variant={`secondary`} icon={e ? <Iconp /> : <Iconu />} onClick={t}>
                {e ? `Copied` : `Copy link`}
              </Button>
            </Iconh>
            <Iconh>
              <Button
                variant={`secondary`}
                icon={a ? <Iconp /> : <Iconu />}
                aria-label={a ? `Copied` : `Copy`}
                onClick={o}
              />
            </Iconh>
            <Iconh>
              <Button
                variant={`secondary`}
                icon={g === `done` ? <Iconp /> : <Icond />}
                loading={g === `loading`}
                onClick={() => _((e) => (e === `loading` ? e : `loading`))}
              >{`Upload file`}</Button>
            </Iconh>
            <Iconh>
              <Button variant={`secondary`} disabled={true}>{`Disabled`}</Button>
            </Iconh>
          </div>
          <p className={`button-demo__status`} aria-live={`polite`}>
            {g === `loading` ? `Uploading…` : g === `done` ? `Upload complete` : ` `}
          </p>
        </section>
      </div>
    )
  );
}
function ButtonDemo2() {
  return (
    <div className={`button-demo`}>
      <ButtonComponent />
      <View_ />
    </div>
  );
}
type ButtonProps = ComponentPropsWithRef<"button"> & {
  variant?: "primary" | "secondary" | "ghost" | "destructive";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  icon?: ReactNode;
  iconRight?: ReactNode;
};
function Button({
  variant = "primary",
  size = "md",
  loading = false,
  icon,
  iconRight,
  children,
  className,
  disabled,
  onClick,
  type = "button",
  ref,
  ...rest
}: ButtonProps) {
  const text = typeof children === "string" ? children : undefined;
  const iconOnly = !children && Boolean(icon || iconRight);
  const inner = useRef<HTMLButtonElement | null>(null);
  const lastWidth = useRef(0);
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  const labelKey = text ?? "label";
  const iconKey = loading && icon ? "spinner" : contentKey(icon);
  const iconRightKey = contentKey(iconRight);
  const content = `${labelKey}|${iconKey}|${iconRightKey}`;
  const lastContent = useRef(content);
  useLayoutEffect(() => {
    const el = inner.current;
    if (!el) return;
    const width = el.getBoundingClientRect().width;
    const from = lastWidth.current;
    const changed = lastContent.current !== content;
    lastWidth.current = width;
    lastContent.current = content;
    if (!changed || !from || Math.abs(from - width) < 0.5) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    el.animate(
      [
        {
          width: `${from}px`,
        },
        {
          width: `${width}px`,
        },
      ],
      {
        duration: 480,
        easing: "cubic-bezier(0.25, 1, 0.5, 1)",
      },
    );
  });
  return (
    <>
      {}
      <style href="ui-button" precedence="default">
        {css}
      </style>
      <button
        type={type}
        className={["ui-button", className].filter(Boolean).join(" ")}
        data-variant={variant}
        data-size={size}
        data-loading={loading || undefined}
        data-icon-only={iconOnly || undefined}
        data-ready={ready || undefined}
        ref={(el) => {
          inner.current = el;
          if (typeof ref === "function") ref(el);
          else if (ref) ref.current = el;
        }}
        disabled={disabled}
        aria-busy={loading || undefined}
        aria-disabled={loading || undefined}
        onClick={(event) => {
          if (loading) {
            event.preventDefault();
            return;
          }
          onClick?.(event);
        }}
        {...rest}
      >
        {}
        {icon && (
          <span className="ui-button__icon" aria-hidden="true" key={`icon-${iconKey}`}>
            {loading ? <Spinner /> : icon}
          </span>
        )}
        {children != null && (
          <span className="ui-button__label" data-text={text} key={`label-${labelKey}`}>
            {children}
          </span>
        )}
        {iconRight && (
          <span className="ui-button__icon" aria-hidden="true" key={`icon-right-${iconRightKey}`}>
            {iconRight}
          </span>
        )}
      </button>
    </>
  );
}
const Spinner = () => (
  <svg
    className="ui-button__spinner"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
  >
    <circle cx="12" cy="12" r="8.5" opacity={0.2} />
    <path d="M12 3.5a8.5 8.5 0 0 1 8.5 8.5" />
  </svg>
);
const ids = new WeakMap<object, number>();
let nextId = 1;
function contentKey(node: ReactNode) {
  if (!isValidElement(node) || typeof node.type === "string") return 0;
  const type = node.type as object;
  if (!ids.has(type)) ids.set(type, nextId++);
  return ids.get(type)!;
}
const css = `
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
const demoStyles =
  ".button-demo{place-items:center;display:grid}.button-demo__row{flex-wrap:wrap;justify-content:center;align-items:center;gap:10px;display:flex}.button-demo__compact{display:none}.button-demo__showcase{text-align:center;gap:22px;display:grid}.button-demo__showcase section{gap:10px;display:grid}.button-demo__showcase h4{color:var(--text-muted);margin:0;font-size:13px;font-weight:400}.button-demo__status{min-height:1.4em;color:var(--text-muted);margin:4px 0 0;font-size:13px}.card__preview .button-demo__showcase{display:none}.card__preview .button-demo__compact{flex-wrap:nowrap;gap:6px;display:flex}.card__preview .button-demo .ui-button{--h:32px;--px:12px;--gap:6px;--fs:13px;--icon:16px;--radius:10px}.button-demo__slot{justify-content:center;display:inline-flex}.stage .button-demo .ui-buttonc{zoom:1.15}\n";
function ButtonDemo(props: Record<string, never>) {
  return (
    <>
      <style href="plico-demo-button" precedence="default">
        {demoStyles}
      </style>
      <ButtonDemo2 {...props} />
    </>
  );
}
export { Button };
export { ButtonDemo };
export { Button as Component };
export { ButtonDemo as Demo };
export type { ButtonProps };
export default Button;

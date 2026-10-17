"use client";

import * as React from "react";
import { useEffect } from "react";
import { useLayoutEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import type { KeyboardEvent } from "react";
import type { PointerEvent } from "react";
import type { ReactNode } from "react";
var Icona = ({ d: d }: { d: string }) => (
  <svg
    viewBox={`0 0 24 24`}
    fill={`none`}
    stroke={`currentColor`}
    strokeWidth={`1.8`}
    strokeLinecap={`round`}
    strokeLinejoin={`round`}
    aria-hidden={`true`}
  >
    <path d={d} />
  </svg>
);
var valueValue = [
  {
    value: `overview`,
    label: `Overview`,
  },
  {
    value: `analytics`,
    label: `Analytics`,
  },
  {
    value: `reports`,
    label: `Reports`,
  },
  {
    value: `notifications`,
    label: `Notifications`,
    count: 3,
  },
];
var valueValue2 = [
  {
    value: `list`,
    label: `List`,
    icon: <Icona d={`M9 6h11M9 12h11M9 18h11M4.5 6h.01M4.5 12h.01M4.5 18h.01`} />,
  },
  {
    value: `board`,
    label: `Board`,
    icon: (
      <Icona
        d={`M5 4h4a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1zM15 4h4a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z`}
      />
    ),
  },
  {
    value: `calendar`,
    label: `Calendar`,
    icon: (
      <Icona
        d={`M8 3v3M16 3v3M4 9.5h16M6 5h12a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z`}
      />
    ),
  },
];
var valueValue3 = [
  {
    value: `monthly`,
    label: `Monthly`,
  },
  {
    value: `yearly`,
    label: `Yearly`,
    badge: `Save 20%`,
  },
];
var valueValue4 = [`analytics`, `reports`, `notifications`, `overview`];
function SegmentedControlDemo2() {
  let [e, t] = React.useState(`overview`),
    [a, u] = React.useState(`board`),
    [d, f] = React.useState(`yearly`),
    p = React.useRef<number[]>([]),
    m = React.useId(),
    h = () => {
      (p.current.forEach(clearTimeout), (p.current = []));
    };
  return (
    React.useEffect(
      () => (
        (p.current = valueValue4.map((e, n) => window.setTimeout(() => t(e), 1e3 + n * 1400))),
        h
      ),
      [],
    ),
    (
      <div className={`seg-demo`} onPointerDownCapture={h} onKeyDownCapture={h}>
        <div className={`seg-demo__card`}>
          <div className={`seg-demo__row`}>
            <span className={`seg-demo__label`} id={`${m}-section`}>{`Dashboard`}</span>
            <SegmentedControl
              options={valueValue}
              value={e}
              onChange={t}
              aria-labelledby={`${m}-section`}
            />
          </div>
          <div className={`seg-demo__row`}>
            <span className={`seg-demo__label`} id={`${m}-view`}>{`Layout`}</span>
            <SegmentedControl
              options={valueValue2}
              value={a}
              onChange={u}
              size={`sm`}
              aria-labelledby={`${m}-view`}
            />
          </div>
          <div className={`seg-demo__row`}>
            <span className={`seg-demo__label`} id={`${m}-billing`}>{`Billing`}</span>
            <SegmentedControl
              options={valueValue3}
              value={d}
              onChange={f}
              variant={`underline`}
              aria-labelledby={`${m}-billing`}
            />
          </div>
        </div>
      </div>
    )
  );
}
type SegmentOption<T extends string = string> = {
  value: T;
  label?: ReactNode;
  icon?: ReactNode;
  count?: number | string;
  badge?: ReactNode;
  disabled?: boolean;
  ariaLabel?: string;
  controls?: string;
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
function SegmentedControl<T extends string = string>({
  options,
  value,
  defaultValue,
  onChange,
  size = "md",
  variant = "tray",
  fullWidth = false,
  kind = "radio",
  disabled = false,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledby,
  className,
}: SegmentedControlProps<T>) {
  const [inner, setInner] = useState<T | undefined>(
    () => defaultValue ?? options.find((o) => !o.disabled)?.value,
  );
  const current = value !== undefined ? value : inner;
  const root = useRef<HTMLDivElement>(null);
  const scroller = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const pill = useRef<HTMLSpanElement>(null);
  const latest = useRef(current);
  latest.current = current;
  const gliding = useRef(false);
  const glideTimer = useRef(0);
  const placed = useRef<T | undefined>(undefined);
  const press = useRef<{
    id: number;
    touch: boolean;
    drag: boolean;
    x: number;
    moved: boolean;
  } | null>(null);
  const buttons = () =>
    Array.from(track.current?.querySelectorAll<HTMLElement>(":scope > .ui-seg__opt") ?? []);
  const activeIndex = options.findIndex((o) => o.value === current);
  const tabbable = activeIndex >= 0 ? activeIndex : options.findIndex((o) => !o.disabled);
  const select = (v: T) => {
    const opt = options.find((o) => o.value === v);
    if (!opt || opt.disabled || disabled || v === latest.current) return;
    latest.current = v;
    if (value === undefined) setInner(v);
    onChange?.(v);
  };
  const measure = () => {
    const els = buttons();
    if (!els.length || !track.current) return;
    const cs = getComputedStyle(els[0]);
    const pad = parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight);
    const widths = els.map((b) => (b.firstElementChild as HTMLElement).offsetWidth + pad);
    if (fullWidth) {
      track.current.style.setProperty("--ui-seg-min", `${Math.max(...widths)}px`);
      els.forEach((b) => (b.style.width = ""));
    } else els.forEach((b, i) => (b.style.width = `${widths[i]}px`));
  };
  const place = (animate: boolean) => {
    const t = track.current;
    const p = pill.current;
    if (!t || !p) return;
    const btn = t.querySelector<HTMLElement>(":scope > .ui-seg__opt[data-active]");
    if (!btn || !btn.offsetWidth) {
      p.style.opacity = "0";
      return;
    }
    let x = btn.offsetLeft;
    let w = btn.offsetWidth;
    if (variant === "underline") {
      const content = btn.firstElementChild as HTMLElement;
      x += content.offsetLeft;
      w = content.offsetWidth;
    }
    const instant = !p.dataset.ready || (!animate && !gliding.current);
    const prev = parseFloat(p.style.left) || 0;
    if (!instant && x !== prev) p.dataset.dir = x > prev ? "right" : "left";
    if (instant) p.style.transition = "none";
    p.style.opacity = "1";
    p.style.left = `${x}px`;
    p.style.right = `${t.clientWidth - x - w}px`;
    if (instant) {
      p.dataset.ready = "1";
      void p.offsetWidth;
      p.style.transition = "";
    }
  };
  const fades = () => {
    const s = scroller.current;
    if (!s) return;
    const max = s.scrollWidth - s.clientWidth;
    root.current?.toggleAttribute("data-overflow", max > 1);
    s.style.setProperty("--ui-seg-fade-l", s.scrollLeft > 1 ? "24px" : "0px");
    s.style.setProperty("--ui-seg-fade-r", s.scrollLeft < max - 1 ? "24px" : "0px");
  };
  const reveal = (smooth: boolean) => {
    const s = scroller.current;
    const t = track.current;
    const btn = t?.querySelector<HTMLElement>(":scope > .ui-seg__opt[data-active]");
    if (!s || !t || !btn || s.scrollWidth <= s.clientWidth + 1) return;
    const left = t.offsetLeft + btn.offsetLeft - (s.clientWidth - btn.offsetWidth) / 2;
    s.scrollTo({
      left: Math.max(0, left),
      behavior: smooth ? "smooth" : "auto",
    });
  };
  useLayoutEffect(() => {
    const t = track.current;
    const s = scroller.current;
    if (!t || !s) return;
    const sync = () => {
      measure();
      place(false);
      fades();
    };
    sync();
    const ready = requestAnimationFrame(() => root.current?.setAttribute("data-ready", ""));
    let frame = 0;
    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(sync);
    });
    ro.observe(s);
    ro.observe(t);
    t.querySelectorAll(".ui-seg__opt, .ui-seg__content").forEach((el) => ro.observe(el));
    return () => {
      ro.disconnect();
      cancelAnimationFrame(frame);
      cancelAnimationFrame(ready);
    };
  }, [options.length, fullWidth, variant, size]);
  useLayoutEffect(() => {
    if (placed.current === current) return;
    const first = placed.current === undefined;
    placed.current = current;
    if (!first) {
      gliding.current = true;
      clearTimeout(glideTimer.current);
      glideTimer.current = window.setTimeout(() => (gliding.current = false), 440);
    }
    place(!first);
    reveal(!first);
    const t = track.current;
    if (!first && t && t.contains(document.activeElement))
      buttons()[activeIndex]?.focus({
        preventScroll: true,
      });
  }, [current]);
  useEffect(() => () => clearTimeout(glideTimer.current), []);
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const enabled = options.filter((o) => !o.disabled);
    if (!enabled.length || disabled) return;
    const prevKeys = kind === "radio" ? ["ArrowLeft", "ArrowUp"] : ["ArrowLeft"];
    const nextKeys = kind === "radio" ? ["ArrowRight", "ArrowDown"] : ["ArrowRight"];
    const at = enabled.findIndex((o) => o.value === latest.current);
    let target: SegmentOption<T> | undefined;
    if (prevKeys.includes(e.key)) target = enabled[(at - 1 + enabled.length) % enabled.length];
    else if (nextKeys.includes(e.key)) target = enabled[(at + 1) % enabled.length];
    else if (e.key === "Home") target = enabled[0];
    else if (e.key === "End") target = enabled[enabled.length - 1];
    if (!target) return;
    e.preventDefault();
    select(target.value);
    buttons()[options.indexOf(target)]?.focus();
  };
  const optionAt = (clientX: number) => {
    let best = -1;
    let dist = Infinity;
    buttons().forEach((b, i) => {
      const r = b.getBoundingClientRect();
      const d = clientX < r.left ? r.left - clientX : clientX > r.right ? clientX - r.right : 0;
      if (d < dist) {
        dist = d;
        best = i;
      }
    });
    return options[best];
  };
  const endPress = () => {
    press.current = null;
    root.current?.removeAttribute("data-pressed");
  };
  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (disabled || e.button !== 0) return;
    const opt = optionAt(e.clientX);
    if (!opt || opt.disabled) return;
    const touch = e.pointerType === "touch";
    const drag = !touch || opt.value === latest.current;
    press.current = {
      id: e.pointerId,
      touch,
      drag,
      x: e.clientX,
      moved: false,
    };
    if (drag) root.current?.setAttribute("data-pressed", "");
    if (!touch) {
      select(opt.value);
      try {
        e.currentTarget.setPointerCapture(e.pointerId);
      } catch {}
    }
  };
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const p = press.current;
    if (!p || p.id !== e.pointerId) return;
    if (!p.moved && Math.abs(e.clientX - p.x) < (p.touch ? 8 : 3)) return;
    p.moved = true;
    if (!p.drag) return;
    const opt = optionAt(e.clientX);
    if (opt && !opt.disabled) select(opt.value);
  };
  const onPointerUp = (e: PointerEvent<HTMLDivElement>) => {
    const p = press.current;
    if (!p || p.id !== e.pointerId) return;
    if (p.touch && !p.moved) {
      const opt = optionAt(e.clientX);
      if (opt) select(opt.value);
    }
    endPress();
  };
  const isTabs = kind === "tabs";
  return (
    <div
      ref={root}
      className={["ui-seg", className].filter(Boolean).join(" ")}
      data-size={size}
      data-variant={variant}
      data-full={fullWidth || undefined}
      data-disabled={disabled || undefined}
    >
      {}
      <style href="ui-segmented-control" precedence="default">
        {css}
      </style>

      <div ref={scroller} className="ui-seg__scroller" onScroll={fades}>
        <div
          ref={track}
          className="ui-seg__track"
          role={isTabs ? "tablist" : "radiogroup"}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledby}
          aria-disabled={disabled || undefined}
          aria-orientation={isTabs ? "horizontal" : undefined}
          onKeyDown={onKeyDown}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={endPress}
          onLostPointerCapture={endPress}
        >
          <span ref={pill} className="ui-seg__pill" aria-hidden="true" />
          {options.map((o, i) => {
            const active = i === activeIndex;
            return (
              <button
                key={o.value}
                type="button"
                className="ui-seg__opt"
                role={isTabs ? "tab" : "radio"}
                aria-checked={isTabs ? undefined : active}
                aria-selected={isTabs ? active : undefined}
                aria-controls={isTabs ? o.controls : undefined}
                aria-label={o.ariaLabel}
                data-active={active || undefined}
                disabled={o.disabled || disabled}
                tabIndex={i === tabbable ? 0 : -1}
                onClick={() => select(o.value)}
              >
                <span className="ui-seg__content">
                  {o.icon && <span className="ui-seg__icon">{o.icon}</span>}
                  {o.label != null && (
                    <span className="ui-seg__label">
                      <span className="ui-seg__text">{o.label}</span>
                      <span className="ui-seg__text ui-seg__text-bold" aria-hidden="true">
                        {o.label}
                      </span>
                    </span>
                  )}
                  {o.count != null && (
                    <span key={String(o.count)} className="ui-seg__count">
                      {o.count}
                    </span>
                  )}
                  {o.badge != null && <span className="ui-seg__badge">{o.badge}</span>}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
const css = `
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
const demoStyles =
  ".seg-demo{grid-template-columns:minmax(0,440px);place-content:center;width:100%;display:grid}.seg-demo__card{background:#fff;border-radius:16px;min-width:0;padding:4px 20px;font-family:Inter,ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,sans-serif;display:grid;box-shadow:0 0 0 1px #ececec,0 1px 2px #0000000a}.seg-demo__row{justify-items:start;gap:10px;min-width:0;padding:18px 0;display:grid}.seg-demo__row+.seg-demo__row{border-top:1px solid #ececec}.seg-demo__label{color:#8f8f8f;font-size:12px;font-weight:500}:where(.dark,[data-theme=dark]) .seg-demo__card{background:#19191b;box-shadow:0 0 0 1px #2a2a2e}:where(.dark,[data-theme=dark]) .seg-demo__row+.seg-demo__row{border-color:#2a2a2e}.card__preview .seg-demo{grid-template-columns:auto;align-content:start;padding-top:46px;position:absolute;inset:0}.card__preview .seg-demo__card{zoom:.55;width:440px}.stage:has(.seg-demo){height:460px;padding:48px 32px}@media (width<=760px){.stage:has(.seg-demo){height:440px;padding:52px 12px 16px}.seg-demo__card{padding:4px 16px}}.seg-demo--clean .seg-demo__card{border-radius:10px;font-family:Inter,InterVariable,ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,sans-serif;box-shadow:0 0 0 .5px #0000000f,0 1px 1px -1px #0000001a,0 1px 2px #0000000d}.seg-demo--clean .seg-demo__row{gap:8px;padding:16px 0}.seg-demo--clean .seg-demo__row+.seg-demo__row{border-top:.5px solid #0000000f}.seg-demo--clean .seg-demo__label{color:#00000073;font-size:12px;line-height:16px}:where(.dark,[data-theme=dark]) .seg-demo--clean .seg-demo__card{background:#1c1c1e;box-shadow:0 0 0 .5px #ffffff1a,0 1px 2px #0006}:where(.dark,[data-theme=dark]) .seg-demo--clean .seg-demo__row+.seg-demo__row{border-color:#ffffff14}:where(.dark,[data-theme=dark]) .seg-demo--clean .seg-demo__label{color:#ffffff75}\n";
function SegmentedControlDemo(props: Record<string, never>) {
  return (
    <>
      <style href="plico-demo-segmented-control" precedence="default">
        {demoStyles}
      </style>
      <SegmentedControlDemo2 {...props} />
    </>
  );
}
export { SegmentedControl as Component };
export { SegmentedControlDemo as Demo };
export { SegmentedControl };
export { SegmentedControlDemo };
export type { SegmentOption };
export type { SegmentedControlProps };
export default SegmentedControl;

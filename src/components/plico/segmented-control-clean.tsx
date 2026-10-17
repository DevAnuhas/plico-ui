"use client";

import * as React from "react";
import { useEffect } from "react";
import { useLayoutEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import type { KeyboardEvent } from "react";
import type { PointerEvent } from "react";
import type { ReactNode } from "react";
var Icono = ({ d: d }: { d: string }) => (
  <svg
    viewBox={`0 0 24 24`}
    fill={`none`}
    stroke={`currentColor`}
    strokeWidth={`1.6`}
    strokeLinecap={`round`}
    strokeLinejoin={`round`}
    aria-hidden={`true`}
  >
    <path d={d} />
  </svg>
);
var valueValue2 = [
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
var valueValue3 = [
  {
    value: `list`,
    label: `List`,
    icon: <Icono d={`M9 6h11M9 12h11M9 18h11M4.5 6h.01M4.5 12h.01M4.5 18h.01`} />,
  },
  {
    value: `board`,
    label: `Board`,
    icon: (
      <Icono
        d={`M5 4h4a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1zM15 4h4a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z`}
      />
    ),
  },
  {
    value: `calendar`,
    label: `Calendar`,
    icon: (
      <Icono
        d={`M8 3v3M16 3v3M4 9.5h16M6 5h12a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z`}
      />
    ),
  },
];
var valueValue4 = [
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
var valueValue5 = [`analytics`, `reports`, `notifications`, `overview`];
function SegmentedControlCleanDemo2() {
  let [e, t] = React.useState(`overview`),
    [a, o] = React.useState(`board`),
    [d, f] = React.useState(`yearly`),
    p = React.useRef<number[]>([]),
    m = React.useId(),
    h = () => {
      (p.current.forEach(clearTimeout), (p.current = []));
    };
  return (
    React.useEffect(
      () => (
        (p.current = valueValue5.map((e, n) => window.setTimeout(() => t(e), 1e3 + n * 1400))),
        h
      ),
      [],
    ),
    (
      <div className={`seg-demo seg-demo--clean`} onPointerDownCapture={h} onKeyDownCapture={h}>
        <div className={`seg-demo__card`}>
          <div className={`seg-demo__row`}>
            <span className={`seg-demo__label`} id={`${m}-section`}>{`Dashboard`}</span>
            <SegmentedControl
              options={valueValue2}
              value={e}
              onChange={t}
              aria-labelledby={`${m}-section`}
            />
          </div>
          <div className={`seg-demo__row`}>
            <span className={`seg-demo__label`} id={`${m}-view`}>{`Layout`}</span>
            <SegmentedControl
              options={valueValue3}
              value={a}
              onChange={o}
              size={`sm`}
              variant={`tray`}
              aria-labelledby={`${m}-view`}
            />
          </div>
          <div className={`seg-demo__row`}>
            <span className={`seg-demo__label`} id={`${m}-billing`}>{`Billing`}</span>
            <SegmentedControl
              options={valueValue4}
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
  variant?: "buttons" | "tray" | "underline";
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
  variant = "buttons",
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
    Array.from(track.current?.querySelectorAll<HTMLElement>(":scope > .ui-segc__opt") ?? []);
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
      track.current.style.setProperty("--ui-segc-min", `${Math.max(...widths)}px`);
      els.forEach((b) => (b.style.width = ""));
    } else els.forEach((b, i) => (b.style.width = `${widths[i]}px`));
  };
  const place = (animate: boolean) => {
    const t = track.current;
    const p = pill.current;
    if (!t || !p) return;
    const btn = t.querySelector<HTMLElement>(":scope > .ui-segc__opt[data-active]");
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
    s.style.setProperty("--ui-segc-fade-l", s.scrollLeft > 1 ? "24px" : "0px");
    s.style.setProperty("--ui-segc-fade-r", s.scrollLeft < max - 1 ? "24px" : "0px");
  };
  const reveal = (smooth: boolean) => {
    const s = scroller.current;
    const t = track.current;
    const btn = t?.querySelector<HTMLElement>(":scope > .ui-segc__opt[data-active]");
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
    t.querySelectorAll(".ui-segc__opt, .ui-segc__content").forEach((el) => ro.observe(el));
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
      glideTimer.current = window.setTimeout(() => (gliding.current = false), 240);
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
      className={["ui-segc", className].filter(Boolean).join(" ")}
      data-size={size}
      data-variant={variant}
      data-full={fullWidth || undefined}
      data-disabled={disabled || undefined}
    >
      {}
      <style href="ui-segmented-control-clean" precedence="default">
        {css}
      </style>

      <div ref={scroller} className="ui-segc__scroller" onScroll={fades}>
        <div
          ref={track}
          className="ui-segc__track"
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
          <span ref={pill} className="ui-segc__pill" aria-hidden="true" />
          {options.map((o, i) => {
            const active = i === activeIndex;
            return (
              <button
                key={o.value}
                type="button"
                className="ui-segc__opt"
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
                <span className="ui-segc__content">
                  {o.icon && <span className="ui-segc__icon">{o.icon}</span>}
                  {}
                  {o.label != null && <span className="ui-segc__label">{o.label}</span>}
                  {o.count != null && (
                    <span key={String(o.count)} className="ui-segc__count">
                      {o.count}
                    </span>
                  )}
                  {o.badge != null && <span className="ui-segc__badge">{o.badge}</span>}
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
@property --ui-segc-min { syntax: "<length>"; inherits: true; initial-value: 0px; }
@property --ui-segc-fade-l { syntax: "<length>"; inherits: false; initial-value: 0px; }
@property --ui-segc-fade-r { syntax: "<length>"; inherits: false; initial-value: 0px; }

.ui-segc {
  --ui-segc-ink: rgba(0, 0, 0, 0.88);
  --ui-segc-text: rgba(0, 0, 0, 0.61);
  --ui-segc-hover-text: rgba(0, 0, 0, 0.75);
  --ui-segc-line: rgba(0, 0, 0, 0.06);
  --ui-segc-wash: rgba(0, 0, 0, 0.03);
  --ui-segc-fill: rgba(0, 0, 0, 0.06);
  --ui-segc-track: rgba(0, 0, 0, 0.04);
  --ui-segc-card: #ffffff;
  --ui-segc-card-shadow: 0 0 0 0.5px rgba(0, 0, 0, 0.06), 0 1px 1px -1px rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --ui-segc-accent: rgba(0, 96, 226, 0.765);
  --ui-segc-accent-soft: rgba(0, 96, 226, 0.08);
  --ui-segc-focus: rgba(0, 96, 226, 0.35);
  --ui-segc-ease: cubic-bezier(0.25, 0.9, 0.3, 1);
  /* Size: md – 28px chips, 4px 10px */
  --ui-segc-h: 28px;
  --ui-segc-px: 10px;
  --ui-segc-fs: 13px;
  --ui-segc-lh: 20px;
  --ui-segc-icon: 16px;
  --ui-segc-gap: 8px;
  --ui-segc-pad: 2px;
  --ui-segc-ring: 3px;
  box-sizing: border-box;
  display: inline-flex;
  max-width: 100%;
  min-width: 0;
  vertical-align: middle;
  border-radius: 8px;
  font-family: "Inter", "InterVariable", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  font-size: var(--ui-segc-fs);
  font-weight: 500;
  line-height: var(--ui-segc-lh);
  color: var(--ui-segc-text);
  -webkit-font-smoothing: antialiased;
}
.ui-segc[data-size="sm"] { --ui-segc-h: 24px; --ui-segc-px: 8px; --ui-segc-fs: 12px; --ui-segc-lh: 16px; --ui-segc-icon: 14px; --ui-segc-gap: 6px; }
.ui-segc[data-size="lg"] { --ui-segc-h: 32px; --ui-segc-px: 12px; --ui-segc-icon: 16px; --ui-segc-gap: 8px; }
.ui-segc[data-full] { display: flex; width: 100%; }
.ui-segc[data-disabled] { opacity: 0.5; pointer-events: none; }
.ui-segc *, .ui-segc *::before, .ui-segc *::after { box-sizing: border-box; }
:where(.ui-segc) button { margin: 0; padding: 0; border: 0; background: none; font: inherit; color: inherit; cursor: pointer; }
:where(.ui-segc) svg { display: block; flex: none; }

/* Scrolls sideways only when it doesn't fit; the padding keeps focus rings from being cut off */
.ui-segc__scroller {
  position: relative;
  flex: 1;
  min-width: 0;
  overflow-x: auto;
  overflow-y: hidden;
  padding: var(--ui-segc-pad);
  border-radius: inherit;
  overscroll-behavior-x: contain;
  scrollbar-width: none;
  -webkit-mask-image: linear-gradient(to right, transparent, #000 var(--ui-segc-fade-l), #000 calc(100% - var(--ui-segc-fade-r)), transparent);
  mask-image: linear-gradient(to right, transparent, #000 var(--ui-segc-fade-l), #000 calc(100% - var(--ui-segc-fade-r)), transparent);
  transition: --ui-segc-fade-l 160ms ease, --ui-segc-fade-r 160ms ease;
}
.ui-segc__scroller::-webkit-scrollbar { display: none; }

.ui-segc__track {
  position: relative;
  display: flex;
  width: max-content;
  min-width: 100%;
  /* Horizontal drags move the indicator; vertical ones still scroll the page */
  touch-action: pan-y;
  -webkit-user-select: none;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
}
/* When it scrolls, swipes scroll it instead of dragging the indicator */
.ui-segc[data-overflow] .ui-segc__track { touch-action: pan-x pan-y; }
/* Equal segments, each as wide as the widest one needs */
.ui-segc[data-full] .ui-segc__track { display: grid; grid-auto-flow: column; grid-auto-columns: minmax(var(--ui-segc-min), 1fr); }
.ui-segc[data-ready] .ui-segc__track { transition: --ui-segc-min 200ms var(--ui-segc-ease); }

/* An option */
.ui-segc__opt {
  position: relative;
  z-index: 1;
  display: flex;
  flex: none;
  align-items: center;
  justify-content: center;
  height: var(--ui-segc-h);
  padding: 0 var(--ui-segc-px);
  overflow: clip;
  border-radius: 6px;
  white-space: nowrap;
  /* Hover washes are short and crisp, in and out */
  transition: color 90ms ease, background-color 90ms ease;
}
.ui-segc[data-ready]:not([data-full]) .ui-segc__opt { transition: color 90ms ease, background-color 90ms ease, width 200ms var(--ui-segc-ease); }
.ui-segc__opt[data-active] { color: var(--ui-segc-ink); }
.ui-segc__opt:disabled { opacity: 0.4; cursor: not-allowed; }
.ui-segc__opt:focus-visible { outline: 2px solid var(--ui-segc-focus); outline-offset: 1px; }
@media (hover: hover) {
  .ui-segc__opt:not([data-active]):not(:disabled):hover { background-color: var(--ui-segc-wash); }
}

.ui-segc__content { display: inline-flex; flex: none; align-items: center; gap: 6px; }
.ui-segc[data-size="sm"] .ui-segc__content { gap: 5px; }
.ui-segc__icon { display: grid; place-items: center; width: var(--ui-segc-icon); height: var(--ui-segc-icon); color: rgba(0, 0, 0, 0.447); transition: color 90ms ease; }
.ui-segc__opt[data-active] .ui-segc__icon { color: var(--ui-segc-ink); }
.ui-segc__icon svg { width: 100%; height: 100%; }
.ui-segc__label { display: block; }

.ui-segc__count {
  display: inline-grid;
  place-items: center;
  min-width: 16px;
  height: 16px;
  padding: 0 4px;
  border-radius: 5px;
  background: var(--ui-segc-fill);
  font-size: 11px;
  line-height: 16px;
  font-weight: 500;
  font-variant-numeric: tabular-nums;
  color: var(--ui-segc-text);
  animation: ui-segc-in 200ms var(--ui-segc-ease) both;
}
.ui-segc__opt[data-active] .ui-segc__count { background: var(--ui-segc-card); box-shadow: 0 0 0 0.5px var(--ui-segc-line); color: var(--ui-segc-ink); }
.ui-segc[data-size="sm"] .ui-segc__count { min-width: 14px; height: 14px; padding: 0 3px; border-radius: 4px; font-size: 10px; line-height: 14px; }
.ui-segc__badge {
  display: inline-flex;
  align-items: center;
  height: 18px;
  padding: 0 6px;
  border-radius: 5px;
  background: var(--ui-segc-accent-soft);
  font-size: 11px;
  line-height: 16px;
  font-weight: 500;
  color: var(--ui-segc-accent);
}
.ui-segc[data-size="sm"] .ui-segc__badge { height: 16px; padding: 0 5px; font-size: 10px; }

/* The indicator: left and right edges slide separately – the one facing the target leads a touch. Short and crisp */
.ui-segc__pill {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 100%;
  z-index: 0;
  border-radius: 6px;
  background: var(--ui-segc-fill);
  opacity: 0;
  pointer-events: none;
  transition: left 200ms var(--ui-segc-ease), right 200ms var(--ui-segc-ease), scale 120ms var(--ui-segc-ease), opacity 120ms ease;
}
.ui-segc__pill[data-dir="right"] { transition-duration: 220ms, 160ms, 120ms, 120ms; }
.ui-segc__pill[data-dir="left"] { transition-duration: 160ms, 220ms, 120ms, 120ms; }
/* Press feedback: the indicator gives a little while held or dragged */
.ui-segc[data-pressed]:not([data-variant="underline"]) .ui-segc__pill { scale: 0.97; }

/* Buttons (default): separate chips with a hairline; the light-gray fill slides to the active one.
   The control reaches a few px past its box so focus rings are never clipped, and still lines up with its neighbours */
.ui-segc[data-variant="buttons"] { --ui-segc-pad: var(--ui-segc-ring); margin: calc(var(--ui-segc-ring) * -1); max-width: calc(100% + var(--ui-segc-ring) * 2); }
.ui-segc[data-variant="buttons"][data-full] { width: calc(100% + var(--ui-segc-ring) * 2); }
.ui-segc[data-variant="buttons"] .ui-segc__track { gap: var(--ui-segc-gap); }
.ui-segc[data-variant="buttons"] .ui-segc__opt { box-shadow: inset 0 0 0 0.5px var(--ui-segc-line); }

/* Tray: a compact light-gray track with a white raised pill */
.ui-segc[data-variant="tray"] { background: var(--ui-segc-track); }
.ui-segc[data-variant="tray"] .ui-segc__opt { height: calc(var(--ui-segc-h) - var(--ui-segc-pad) * 2); }
.ui-segc[data-variant="tray"] .ui-segc__pill { background: var(--ui-segc-card); box-shadow: var(--ui-segc-card-shadow); }

/* Underline: text tabs on a hairline */
.ui-segc[data-variant="underline"] { --ui-segc-px: 2px; --ui-segc-gap: 20px; border-radius: 0; box-shadow: inset 0 -0.5px 0 var(--ui-segc-line); }
.ui-segc[data-variant="underline"] .ui-segc__scroller { padding: 0; }
.ui-segc[data-variant="underline"]:not([data-full]) .ui-segc__track { gap: var(--ui-segc-gap); }
.ui-segc[data-variant="underline"][data-full] { --ui-segc-px: 10px; }
.ui-segc[data-variant="underline"] .ui-segc__opt { height: calc(var(--ui-segc-h) + 6px); }
.ui-segc[data-variant="underline"] .ui-segc__opt:focus-visible { outline-offset: -2px; }
.ui-segc[data-variant="underline"] .ui-segc__pill { top: auto; height: 1.5px; border-radius: 1.5px 1.5px 0 0; background: var(--ui-segc-ink); }
@media (hover: hover) {
  .ui-segc[data-variant="underline"] .ui-segc__opt:not([data-active]):not(:disabled):hover { background-color: transparent; color: var(--ui-segc-hover-text); }
}

@keyframes ui-segc-in { from { opacity: 0; transform: translateY(2px); filter: blur(2px); } to { opacity: 1; transform: none; filter: none; } }

/* Touch screens: every option at least 40px tall */
@media (hover: none) and (pointer: coarse) {
  .ui-segc[data-size] { --ui-segc-h: 40px; }
  .ui-segc[data-size="lg"] { --ui-segc-h: 44px; }
  .ui-segc[data-variant="tray"][data-size] { --ui-segc-h: 44px; }
  .ui-segc[data-variant="underline"] .ui-segc__opt { height: var(--ui-segc-h); }
}
@media (prefers-reduced-motion: reduce) {
  .ui-segc *, .ui-segc *::before, .ui-segc *::after { animation: none !important; transition: none !important; }
}

/* Dark mode: follows a .dark class or data-theme="dark" on any ancestor, e.g. <html> */
:where(.dark, [data-theme="dark"]) .ui-segc {
  --ui-segc-ink: rgba(255, 255, 255, 0.9);
  --ui-segc-text: rgba(255, 255, 255, 0.62);
  --ui-segc-hover-text: rgba(255, 255, 255, 0.78);
  --ui-segc-line: rgba(255, 255, 255, 0.08);
  --ui-segc-wash: rgba(255, 255, 255, 0.04);
  --ui-segc-fill: rgba(255, 255, 255, 0.08);
  --ui-segc-track: rgba(255, 255, 255, 0.05);
  --ui-segc-card: #2c2c2f;
  --ui-segc-card-shadow: 0 0 0 0.5px rgba(255, 255, 255, 0.1), 0 1px 2px rgba(0, 0, 0, 0.4);
  --ui-segc-accent: #4d8dff;
  --ui-segc-accent-soft: rgba(77, 141, 255, 0.14);
  --ui-segc-focus: rgba(77, 141, 255, 0.45);
}
:where(.dark, [data-theme="dark"]) .ui-segc__icon { color: rgba(255, 255, 255, 0.46); }
:where(.dark, [data-theme="dark"]) .ui-segc__opt[data-active] .ui-segc__icon { color: var(--ui-segc-ink); }
`;
const demoStyles =
  ".seg-demo{grid-template-columns:minmax(0,440px);place-content:center;width:100%;display:grid}.seg-demo__card{background:#fff;border-radius:16px;min-width:0;padding:4px 20px;font-family:Inter,ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,sans-serif;display:grid;box-shadow:0 0 0 1px #ececec,0 1px 2px #0000000a}.seg-demo__row{justify-items:start;gap:10px;min-width:0;padding:18px 0;display:grid}.seg-demo__row+.seg-demo__row{border-top:1px solid #ececec}.seg-demo__label{color:#8f8f8f;font-size:12px;font-weight:500}:where(.dark,[data-theme=dark]) .seg-demo__card{background:#19191b;box-shadow:0 0 0 1px #2a2a2e}:where(.dark,[data-theme=dark]) .seg-demo__row+.seg-demo__row{border-color:#2a2a2e}.card__preview .seg-demo{grid-template-columns:auto;align-content:start;padding-top:46px;position:absolute;inset:0}.card__preview .seg-demo__card{zoom:.55;width:440px}.stage:has(.seg-demo){height:460px;padding:48px 32px}@media (width<=760px){.stage:has(.seg-demo){height:440px;padding:52px 12px 16px}.seg-demo__card{padding:4px 16px}}.seg-demo--clean .seg-demo__card{border-radius:10px;font-family:Inter,InterVariable,ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,sans-serif;box-shadow:0 0 0 .5px #0000000f,0 1px 1px -1px #0000001a,0 1px 2px #0000000d}.seg-demo--clean .seg-demo__row{gap:8px;padding:16px 0}.seg-demo--clean .seg-demo__row+.seg-demo__row{border-top:.5px solid #0000000f}.seg-demo--clean .seg-demo__label{color:#00000073;font-size:12px;line-height:16px}:where(.dark,[data-theme=dark]) .seg-demo--clean .seg-demo__card{background:#1c1c1e;box-shadow:0 0 0 .5px #ffffff1a,0 1px 2px #0006}:where(.dark,[data-theme=dark]) .seg-demo--clean .seg-demo__row+.seg-demo__row{border-color:#ffffff14}:where(.dark,[data-theme=dark]) .seg-demo--clean .seg-demo__label{color:#ffffff75}\n";
function SegmentedControlCleanDemo(props: Record<string, never>) {
  return (
    <>
      <style href="plico-demo-segmented-control-clean" precedence="default">
        {demoStyles}
      </style>
      <SegmentedControlCleanDemo2 {...props} />
    </>
  );
}
export { SegmentedControl as Component };
export { SegmentedControlCleanDemo as Demo };
export { SegmentedControl };
export { SegmentedControl as SegmentedControlClean };
export { SegmentedControlCleanDemo };
export type { SegmentOption };
export type { SegmentedControlProps };
export default SegmentedControl;

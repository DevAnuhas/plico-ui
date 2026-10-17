"use client";

import * as React from "react";
import { Children } from "react";
import { isValidElement } from "react";
import { useEffect } from "react";
import { useId } from "react";
import { useLayoutEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import type { ReactElement } from "react";
import type { ReactNode } from "react";
function ToolCallCardCleanComponent({
  children: children,
  label: label,
  runningLabel = `Using tools…`,
  duration: duration,
  defaultOpen = false,
  open: open,
  onOpenChange: onOpenChange,
  className: className,
}: ToolCallGroupProps) {
  let m = React.useId(),
    [h, g] = React.useState(defaultOpen),
    _ = open ?? h,
    y = React.Children.toArray(children)
      .filter(React.isValidElement)
      .map((e) => e.props as Partial<ToolCallCardProps>),
    b = y.some((e) => e.status === `running`),
    x = y.filter((e) => e.status === `error`).length,
    S = valueValue(b, void 0, true),
    C =
      y.length && y.every((e) => e.duration != null)
        ? y.reduce((e, t) => e + (t.duration ?? 0), 0)
        : null,
    w = b ? S : (duration ?? C ?? S),
    T = `Used ${y.length} ${y.length === 1 ? `tool` : `tools`}`,
    E = b ? runningLabel : (label ?? T),
    D = y.slice(-3);
  return (
    <div
      className={[`ui-tcc-group`, className].filter(Boolean).join(` `)}
      data-running={b || void 0}
      data-open={_ || void 0}
    >
      <style href={`ui-tool-call-clean`} precedence={`default`}>
        {valueValue6}
      </style>
      <span className={`ui-tcc-sr`} role={`status`} aria-live={`polite`}>
        {b ? runningLabel : `${T}${x ? `, ${x} failed` : ``}`}
      </span>
      <button
        type={`button`}
        className={`ui-tcc-group__head`}
        aria-expanded={_}
        aria-controls={`${m}-list`}
        onClick={() => {
          (open === void 0 && g(!_), onOpenChange?.(!_));
        }}
      >
        <span className={`ui-tcc-group__stack`} aria-hidden={`true`}>
          {D.map((e, t) => (
            <span className={`ui-tcc__icon`} key={y.length - D.length + t}>
              {e.icon ?? <Icond />}
            </span>
          ))}
        </span>
        <span className={`ui-tcc-group__title`} key={b ? `busy` : `done`}>
          <span
            className={b ? `ui-tcc-group__label ui-tcc__shine` : `ui-tcc-group__label`}
            data-text={E}
          >
            {E}
          </span>
          {!b && x > 0 && (
            <span className={`ui-tcc-group__failed`}>
              {`· `}
              {x}
              {` failed`}
            </span>
          )}
          {w != null && (
            <span className={`ui-tcc-group__time`}>
              {`· `}
              {ViewP(w, b)}
            </span>
          )}
        </span>
        <Iconu />
      </button>
      <div className={`ui-tcc__body`} id={`${m}-list`} inert={!_}>
        <div className={`ui-tcc__clip`}>
          <div className={`ui-tcc-group__list`}>{children}</div>
        </div>
      </div>
    </div>
  );
}
function Iconu() {
  return (
    <svg className={`ui-tcc__chevron`} viewBox={`0 0 12 12`} aria-hidden={`true`}>
      <path d={`M3.5 5.25 6 7.75l2.5-2.5`} />
    </svg>
  );
}
function Icond() {
  return (
    <svg viewBox={`0 0 16 16`}>
      <path
        d={`M10.2 2.4a3.5 3.5 0 0 0-4.3 4.6L2.6 10.3a1.4 1.4 0 0 0 2 2L7.9 9a3.5 3.5 0 0 0 4.6-4.3l-2 2-1.6-.4-.4-1.6 1.7-2.3Z`}
      />
    </svg>
  );
}
function valueValue(e: boolean, t: number | undefined, r: boolean) {
  let i = React.useRef<number | null>(null),
    a = React.useRef(0),
    [o, s] = React.useState<number | null>(null);
  return (
    React.useEffect(() => {
      if (!e) {
        i.current !== null &&
          ((a.current += Date.now() - i.current), (i.current = null), s(a.current));
        return;
      }
      (r || (a.current = 0), (i.current = t ?? Date.now()));
      let n = () => s(a.current + Date.now() - (i.current ?? Date.now()));
      n();
      let o = window.setInterval(n, 100);
      return () => window.clearInterval(o);
    }, [e, t, r]),
    o
  );
}
function ViewP(e: number, t: boolean) {
  if (!t && e < 1e3) return `${Math.max(1, Math.round(e))}ms`;
  if (e < 6e4) return `${(Math.floor(e / 100) / 10).toFixed(1)}s`;
  let n = Math.floor(e / 1e3);
  return `${Math.floor(n / 60)}m ${String(n % 60).padStart(2, `0`)}s`;
}
var valueValue6 = `
/* Colors and motion as variables – override them on .ui-tcc / .ui-tcc-group */
.ui-tcc,
.ui-tcc-group {
  --ui-tcc-card: #ffffff;
  --ui-tcc-strong: #000000;
  --ui-tcc-ink: rgba(0, 0, 0, 0.88);
  --ui-tcc-text: rgba(0, 0, 0, 0.61);
  --ui-tcc-muted: rgba(0, 0, 0, 0.45);
  --ui-tcc-faint: rgba(0, 0, 0, 0.27);
  --ui-tcc-icon: rgba(0, 0, 0, 0.447);
  --ui-tcc-line: rgba(0, 0, 0, 0.06);
  --ui-tcc-wash: rgba(0, 0, 0, 0.03);
  --ui-tcc-wash-big: rgba(0, 0, 0, 0.015);
  /* The code panel: a 2% black frame, kept opaque so the fade of capped blocks can end on it */
  --ui-tcc-code: #fafafa;
  --ui-tcc-accent: rgba(0, 96, 226, 0.765);
  --ui-tcc-red: #d93a2b;
  --ui-tcc-red-bg: rgba(217, 58, 43, 0.04);
  --ui-tcc-red-line: rgba(217, 58, 43, 0.14);
  --ui-tcc-key: rgba(0, 0, 0, 0.88);
  --ui-tcc-str: rgba(0, 123, 172, 0.9);
  --ui-tcc-num: #b25b0c;
  --ui-tcc-lit: #5b5bd6;
  --ui-tcc-shine: rgba(255, 255, 255, 0.82);
  /* Strokes are shadows: a 0.5px hairline plus a soft lift */
  --ui-tcc-shadow: 0 0 0 0.5px rgba(0, 0, 0, 0.06), 0 1px 1px -1px rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --ui-tcc-focus: rgba(0, 96, 226, 0.35);
  --ui-tcc-ease: cubic-bezier(0.22, 1, 0.36, 1);
  --ui-tcc-mono: ui-monospace, "SF Mono", Menlo, monospace;
  box-sizing: border-box;
  container-type: inline-size;
  min-width: 0;
  color: var(--ui-tcc-ink);
  font-family: "Inter", "InterVariable", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  font-size: 13px;
  line-height: 20px;
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
}
.ui-tcc *,
.ui-tcc-group * { box-sizing: border-box; }

.ui-tcc {
  position: relative;
  border-radius: 10px;
  background: var(--ui-tcc-card);
  box-shadow: var(--ui-tcc-shadow);
}
.ui-tcc-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}

/* Header row: icon, name + summary, status, chevron – everything truncates before it overflows */
.ui-tcc__head {
  all: unset;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  min-height: 44px;
  padding: 0 14px;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 160ms ease, border-radius 0ms linear 380ms;
}
.ui-tcc[data-open] .ui-tcc__head {
  border-radius: 10px 10px 0 0;
  transition: background-color 160ms ease;
}
.ui-tcc__head:focus-visible,
.ui-tcc-group__head:focus-visible,
.ui-tcc__copy:focus-visible,
.ui-tcc__more:focus-visible,
.ui-tcc__retry:focus-visible {
  outline: 2px solid var(--ui-tcc-focus);
  outline-offset: 1px;
}
@media (hover: hover) {
  .ui-tcc__head:hover { background: var(--ui-tcc-wash-big); }
  .ui-tcc__head:hover .ui-tcc__chevron { stroke: var(--ui-tcc-ink); }
  .ui-tcc-group__head:hover { background: var(--ui-tcc-wash); color: var(--ui-tcc-ink); }
  .ui-tcc__copy:hover { background: var(--ui-tcc-wash-big); color: var(--ui-tcc-ink); }
  .ui-tcc__more:hover { color: var(--ui-tcc-ink); }
  .ui-tcc__retry:hover { background: var(--ui-tcc-wash-big); }
}

/* The tool's icon: a plain 16px glyph, no tile */
.ui-tcc__icon {
  display: grid;
  place-items: center;
  flex: none;
  width: 16px;
  height: 16px;
  color: var(--ui-tcc-icon);
}
.ui-tcc__icon > svg { width: 16px; height: 16px; fill: none; stroke: currentColor; stroke-width: 1.4; stroke-linecap: round; stroke-linejoin: round; }

.ui-tcc__main {
  display: flex;
  align-items: baseline;
  gap: 8px;
  flex: 1;
  min-width: 0;
}
.ui-tcc__name {
  flex: 0 1 auto;
  max-width: 55%;
  overflow: hidden;
  color: var(--ui-tcc-strong);
  font-family: var(--ui-tcc-mono);
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.ui-tcc__summary {
  flex: 1 1 0;
  min-width: 0;
  overflow: hidden;
  color: var(--ui-tcc-text);
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ui-tcc__status {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  flex: none;
  color: var(--ui-tcc-muted);
  font-size: 12px;
  line-height: 16px;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
  animation: ui-tcc-in 360ms var(--ui-tcc-ease) both;
}
.ui-tcc[data-status="error"] .ui-tcc__status { color: var(--ui-tcc-red); font-weight: 500; }
.ui-tcc__status > svg { width: 14px; height: 14px; flex: none; fill: none; stroke-linecap: round; stroke-linejoin: round; }
.ui-tcc__spinner circle { stroke: var(--ui-tcc-line); stroke-width: 1.6; }
.ui-tcc__spinner path { stroke: var(--ui-tcc-accent); stroke-width: 1.6; }
.ui-tcc__spinner { animation: ui-tcc-spin 800ms linear infinite; }
/* Done: a solid blue dot whose white check draws itself */
.ui-tcc__ok { animation: ui-tcc-pop 460ms cubic-bezier(0.34, 1.56, 0.64, 1) both; }
.ui-tcc__ok circle { fill: var(--ui-tcc-accent); }
.ui-tcc__ok path { stroke: #fff; stroke-width: 1.5; stroke-dasharray: 1; stroke-dashoffset: 1; animation: ui-tcc-draw 360ms var(--ui-tcc-ease) 160ms forwards; }
.ui-tcc__err circle { fill: var(--ui-tcc-red); }
.ui-tcc__err path { stroke: #fff; stroke-width: 1.6; stroke-linecap: round; }

.ui-tcc__chevron {
  flex: none;
  width: 12px;
  height: 12px;
  fill: none;
  stroke: var(--ui-tcc-icon);
  stroke-width: 1.2;
  stroke-linecap: round;
  stroke-linejoin: round;
  transition: transform 360ms var(--ui-tcc-ease), stroke 160ms ease;
}
.ui-tcc[data-open] > .ui-tcc__head .ui-tcc__chevron,
.ui-tcc-group[data-open] > .ui-tcc-group__head .ui-tcc__chevron { transform: rotate(180deg); }

/* Body: grows from 0fr to 1fr, so the height animates without measuring */
.ui-tcc__body {
  display: grid;
  grid-template-rows: 0fr;
  opacity: 0;
  transition: grid-template-rows 380ms var(--ui-tcc-ease), opacity 240ms ease;
}
.ui-tcc[data-open] > .ui-tcc__body,
.ui-tcc-group[data-open] > .ui-tcc__body {
  grid-template-rows: 1fr;
  opacity: 1;
}
.ui-tcc__clip { min-height: 0; overflow: hidden; }
.ui-tcc__sections {
  display: grid;
  gap: 14px;
  padding: 12px 14px 14px;
  border-top: 0.5px solid var(--ui-tcc-line);
}

.ui-tcc__section { display: grid; gap: 6px; min-width: 0; }
.ui-tcc__section-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  min-height: 28px;
}
/* Tiny uppercase labels: "ARGUMENTS", "RESULT" */
.ui-tcc__label {
  color: var(--ui-tcc-muted);
  font-size: 10px;
  line-height: 16px;
  font-weight: 500;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}
.ui-tcc__pending { margin: 0; color: var(--ui-tcc-muted); font-size: 12px; line-height: 16px; }

/* Copy: a small white icon button with the card's hairline */
.ui-tcc__copy {
  all: unset;
  position: relative;
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
  border-radius: 6px;
  background: var(--ui-tcc-card);
  box-shadow: var(--ui-tcc-shadow);
  color: var(--ui-tcc-icon);
  cursor: pointer;
  transition: background-color 160ms ease, color 160ms ease;
}
.ui-tcc__copy svg {
  position: absolute;
  width: 16px;
  height: 16px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.4;
  stroke-linecap: round;
  stroke-linejoin: round;
  transition: opacity 200ms ease, transform 320ms var(--ui-tcc-ease), filter 200ms ease;
}
.ui-tcc__copy-icon rect { fill: currentColor; stroke: none; }
.ui-tcc__copy-done { opacity: 0; transform: scale(0.6); filter: blur(2px); stroke-width: 1.7; }
.ui-tcc__copy[data-copied] { color: var(--ui-tcc-accent); }
.ui-tcc__copy[data-copied] .ui-tcc__copy-icon { opacity: 0; transform: scale(0.6); filter: blur(2px); }
.ui-tcc__copy[data-copied] .ui-tcc__copy-done { opacity: 1; transform: none; filter: none; }

/* Code: a faint panel with a 0.5px frame; wraps instead of scrolling sideways, capped blocks fade out */
.ui-tcc__code {
  position: relative;
  margin: 0;
  padding: 10px 12px;
  overflow: hidden;
  border-radius: 8px;
  background: var(--ui-tcc-code);
  box-shadow: inset 0 0 0 0.5px var(--ui-tcc-line);
  color: var(--ui-tcc-muted);
  font-family: var(--ui-tcc-mono);
  font-size: 12px;
  line-height: 20px;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
  tab-size: 2;
  transition: max-height 420ms var(--ui-tcc-ease);
}
.ui-tcc__code code { display: block; font: inherit; }
.ui-tcc__code::after {
  content: "";
  position: absolute;
  left: 0.5px;
  right: 0.5px;
  bottom: 0.5px;
  height: 56px;
  border-radius: 0 0 7.5px 7.5px;
  background: linear-gradient(to bottom, transparent, var(--ui-tcc-code));
  opacity: 0;
  transition: opacity 240ms ease;
  pointer-events: none;
}
.ui-tcc__code[data-capped]::after { opacity: 1; }
.ui-tcc__t-key { color: var(--ui-tcc-key); }
.ui-tcc__t-str { color: var(--ui-tcc-str); }
.ui-tcc__t-num { color: var(--ui-tcc-num); }
.ui-tcc__t-lit { color: var(--ui-tcc-lit); }

.ui-tcc__more {
  all: unset;
  justify-self: start;
  padding: 2px 4px;
  margin-left: -4px;
  border-radius: 6px;
  color: var(--ui-tcc-text);
  font-size: 12px;
  line-height: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: color 160ms ease;
}

/* Error: the message on a faint red panel and an optional white Retry button */
.ui-tcc__error {
  display: flex;
  align-items: center;
  gap: 8px;
  min-height: 44px;
  padding: 8px 8px 8px 12px;
  border-radius: 8px;
  background: var(--ui-tcc-red-bg);
  box-shadow: inset 0 0 0 0.5px var(--ui-tcc-red-line);
}
.ui-tcc__error > .ui-tcc__err { flex: none; align-self: flex-start; width: 16px; height: 16px; margin-top: 6px; }
.ui-tcc__error-text {
  flex: 1;
  min-width: 0;
  margin: 0;
  color: var(--ui-tcc-red);
  font-size: 13px;
  line-height: 20px;
  overflow-wrap: anywhere;
}
.ui-tcc__retry {
  all: unset;
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  flex: none;
  height: 28px;
  padding: 0 10px 0 6px;
  border-radius: 6px;
  background: var(--ui-tcc-card);
  box-shadow: var(--ui-tcc-shadow);
  color: var(--ui-tcc-strong);
  font-size: 13px;
  line-height: 20px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 160ms ease;
}
.ui-tcc__retry svg { width: 16px; height: 16px; fill: none; stroke: var(--ui-tcc-icon); stroke-width: 1.5; stroke-linecap: round; stroke-linejoin: round; }
.ui-tcc__retry:active svg { transform: rotate(-60deg); transition: transform 200ms var(--ui-tcc-ease); }

/* Group: one quiet line with the tool icons stacked on small white tiles, the cards below */
.ui-tcc-group { display: grid; }
.ui-tcc-group__head {
  all: unset;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: 8px;
  justify-self: start;
  max-width: 100%;
  min-height: 32px;
  margin-left: -6px;
  padding: 4px 10px 4px 6px;
  border-radius: 8px;
  color: var(--ui-tcc-ink);
  cursor: pointer;
  transition: background-color 160ms ease, color 160ms ease;
}
.ui-tcc-group__stack { display: flex; flex: none; padding: 0.5px; }
.ui-tcc-group__stack .ui-tcc__icon {
  width: 22px;
  height: 22px;
  border-radius: 6px;
  background: var(--ui-tcc-card);
  box-shadow: var(--ui-tcc-shadow);
  animation: ui-tcc-pop 420ms var(--ui-tcc-ease) both;
}
.ui-tcc-group__stack .ui-tcc__icon + .ui-tcc__icon { margin-left: -4px; }
.ui-tcc-group__stack .ui-tcc__icon > svg { width: 12px; height: 12px; stroke-width: 1.5; }
.ui-tcc-group__title {
  display: flex;
  align-items: baseline;
  gap: 6px;
  min-width: 0;
  white-space: nowrap;
  animation: ui-tcc-in 360ms var(--ui-tcc-ease) both;
}
.ui-tcc-group__label {
  position: relative;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  color: inherit;
  font-weight: 500;
}
.ui-tcc-group__label.ui-tcc__shine { color: var(--ui-tcc-muted); }
.ui-tcc-group__failed { flex: none; color: var(--ui-tcc-red); }
.ui-tcc-group__time { flex: none; color: var(--ui-tcc-faint); font-variant-numeric: tabular-nums; }
.ui-tcc-group__list { display: grid; gap: 8px; padding: 6px 0 2px; }

/* A soft light sweeping over "Using tools…" */
.ui-tcc__shine::after {
  content: attr(data-text);
  content: attr(data-text) / "";
  position: absolute;
  inset: 0;
  white-space: nowrap;
  color: transparent;
  background: linear-gradient(90deg, transparent 38%, var(--ui-tcc-shine) 50%, transparent 62%) 100% 0 / 300% 100% no-repeat;
  -webkit-background-clip: text;
  background-clip: text;
  animation: ui-tcc-sweep 1.8s linear infinite;
  pointer-events: none;
}

@keyframes ui-tcc-in {
  from { opacity: 0; transform: translateY(3px); filter: blur(2px); }
  to { opacity: 1; transform: none; filter: none; }
}
@keyframes ui-tcc-pop {
  from { opacity: 0; transform: scale(0.6); }
  to { opacity: 1; transform: none; }
}
@keyframes ui-tcc-spin { to { transform: rotate(360deg); } }
@keyframes ui-tcc-draw { to { stroke-dashoffset: 0; } }
@keyframes ui-tcc-sweep {
  from { background-position: 100% 0; }
  to { background-position: 0% 0; }
}

/* Narrow (phones): a little less padding, the summary gives way first */
@container (max-width: 360px) {
  .ui-tcc__head { gap: 8px; padding: 0 12px; }
  .ui-tcc__sections { padding: 12px 12px 12px; }
}
/* Touch screens: bigger tap targets */
@media (pointer: coarse) {
  .ui-tcc__head { min-height: 52px; }
}
@media (prefers-reduced-motion: reduce) {
  .ui-tcc *,
  .ui-tcc-group *,
  .ui-tcc *::after,
  .ui-tcc-group *::after {
    animation-duration: 1ms !important;
    animation-delay: 0ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 1ms !important;
  }
  .ui-tcc__shine::after { display: none; }
  .ui-tcc__ok path { stroke-dashoffset: 0; }
}

/* Dark mode: follows a .dark class or data-theme="dark" on any ancestor, e.g. <html> */
:where(.dark, [data-theme="dark"]) .ui-tcc,
:where(.dark, [data-theme="dark"]) .ui-tcc-group {
  --ui-tcc-card: #1c1c1e;
  --ui-tcc-strong: #ffffff;
  --ui-tcc-ink: rgba(255, 255, 255, 0.9);
  --ui-tcc-text: rgba(255, 255, 255, 0.62);
  --ui-tcc-muted: rgba(255, 255, 255, 0.46);
  --ui-tcc-faint: rgba(255, 255, 255, 0.3);
  --ui-tcc-icon: rgba(255, 255, 255, 0.5);
  --ui-tcc-line: rgba(255, 255, 255, 0.08);
  --ui-tcc-wash: rgba(255, 255, 255, 0.04);
  --ui-tcc-wash-big: rgba(255, 255, 255, 0.025);
  --ui-tcc-code: #212123;
  --ui-tcc-accent: #4d8dff;
  --ui-tcc-red: #ff7b72;
  --ui-tcc-red-bg: rgba(255, 110, 100, 0.07);
  --ui-tcc-red-line: rgba(255, 110, 100, 0.18);
  --ui-tcc-key: rgba(255, 255, 255, 0.9);
  --ui-tcc-str: #5fc8e8;
  --ui-tcc-num: #f2a65a;
  --ui-tcc-lit: #a5a5ff;
  --ui-tcc-shine: #ffffff;
  --ui-tcc-shadow: 0 0 0 0.5px rgba(255, 255, 255, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.4);
  --ui-tcc-focus: rgba(77, 141, 255, 0.5);
}
`;
var valueValue7 = [0, 1500, 2700, 4300, 5400, 6700, 8e3];
var valueValue8 = 11500;
var valueValue9 = {
  results: [
    {
      title: `HubSpot Sales Hub pricing`,
      url: `https://www.hubspot.com/pricing/sales`,
      price_per_seat: 90,
    },
    {
      title: `Pipedrive plans and pricing`,
      url: `https://www.pipedrive.com/en/pricing`,
      price_per_seat: 49,
    },
    {
      title: `Attio pricing`,
      url: `https://attio.com/pricing`,
      price_per_seat: 59,
    },
    {
      title: `Salesforce Starter Suite`,
      url: `https://www.salesforce.com/sales/pricing`,
      price_per_seat: 25,
    },
    {
      title: `Close CRM pricing`,
      url: `https://www.close.com/pricing`,
      price_per_seat: 49,
    },
  ],
  total: 5,
  cached: false,
};
function ToolCallCardCleanDemo2() {
  let [e, t] = React.useState(0),
    [o, s] = React.useState(0),
    [c, l] = React.useState(true),
    u = React.useRef(false);
  React.useEffect(() => {
    ((u.current = false), s(0), l(true));
    let e = valueValue7
      .slice(1)
      .map((e, t) => window.setTimeout(() => s((e) => Math.max(e, t + 1)), e));
    return (
      e.push(window.setTimeout(() => !u.current && l(false), valueValue7[6])),
      e.push(window.setTimeout(() => !u.current && t((e) => e + 1), valueValue8)),
      () => e.forEach(clearTimeout)
    );
  }, [e]);
  let d: ToolCallStatus = o === 2 ? `error` : o >= 4 ? `success` : `running`;
  return (
    <div className={`tc-demo`}>
      <div className={`tc-demo__chat`}>
        <p
          className={`tc-demo__you`}
        >{`Compare CRM pricing for our 10-person team and check open deals.`}</p>
        <ToolCallCardCleanComponent
          open={c}
          onOpenChange={(e: boolean | ((prevState: boolean) => boolean)) => {
            ((u.current = true), l(e));
          }}
          key={e}
        >
          <ToolCallCard
            name={`search_web`}
            icon={<ValueValue />}
            status={o >= 1 ? `success` : `running`}
            summary={
              o >= 1
                ? `Searched the web for 'CRM pricing 2026'`
                : `Searching the web for 'CRM pricing 2026'`
            }
            args={{
              query: `CRM pricing 2026 small sales team`,
              max_results: 5,
            }}
            result={o >= 1 ? valueValue9 : void 0}
          />
          {o >= 1 && (
            <ToolCallCard
              name={`fetch_page`}
              icon={<Iconw />}
              status={d}
              summary={d === `success` ? `Read hubspot.com/pricing` : `Reading hubspot.com/pricing`}
              args={{
                url: `https://www.hubspot.com/pricing/sales`,
                timeout_ms: 8e3,
              }}
              result={
                d === `success`
                  ? {
                      status: 200,
                      title: `Sales Hub Pricing`,
                      words: 2140,
                    }
                  : void 0
              }
              error={`Request timed out after 8s – hubspot.com didn't respond.`}
              onRetry={() => s((e) => Math.max(e, 3))}
            />
          )}
          {o >= 4 && (
            <ToolCallCard
              name={`crm.list_deals`}
              icon={<ValueValue2 />}
              status={o >= 5 ? `success` : `running`}
              summary={o >= 5 ? `Found 4 open deals in negotiation` : `Looking up open deals`}
              args={{
                stage: `negotiation`,
                owner: `me`,
                limit: 10,
              }}
              result={
                o >= 5
                  ? {
                      count: 4,
                      deals: [
                        {
                          name: `Northwind`,
                          value: 18400,
                        },
                        {
                          name: `Globex`,
                          value: 9600,
                        },
                      ],
                    }
                  : void 0
              }
            />
          )}
        </ToolCallCardCleanComponent>
      </div>
    </div>
  );
}
function ValueValue() {
  return (
    <svg viewBox={`0 0 16 16`}>
      <circle cx={`7`} cy={`7`} r={`4.25`} />
      <path d={`m10.25 10.25 3 3`} />
    </svg>
  );
}
function Iconw() {
  return (
    <svg viewBox={`0 0 16 16`}>
      <path d={`M4 2.75h5l3 3v7.5H4z`} />
      <path d={`M9 2.75v3h3M6 9h4M6 11h3`} />
    </svg>
  );
}
function ValueValue2() {
  return (
    <svg viewBox={`0 0 16 16`}>
      <ellipse cx={`8`} cy={`4`} rx={`4.75`} ry={`1.75`} />
      <path
        d={`M3.25 4v8c0 .97 2.13 1.75 4.75 1.75s4.75-.78 4.75-1.75V4M3.25 8c0 .97 2.13 1.75 4.75 1.75S12.75 8.97 12.75 8`}
      />
    </svg>
  );
}
type ToolCallStatus = "running" | "success" | "error";
type ToolCallCardProps = {
  name: string;
  summary?: ReactNode;
  icon?: ReactNode;
  status: ToolCallStatus;
  args?: unknown;
  result?: unknown;
  error?: string;
  startedAt?: number;
  duration?: number;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  openOnError?: boolean;
  onRetry?: () => void;
  maxCodeHeight?: number;
  className?: string;
};
type ToolCallGroupProps = {
  children: ReactNode;
  label?: string;
  runningLabel?: string;
  duration?: number;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
};
function ToolCallCard({
  name,
  summary,
  icon,
  status,
  args,
  result,
  error,
  startedAt,
  duration,
  defaultOpen = false,
  open: openProp,
  onOpenChange,
  openOnError = true,
  onRetry,
  maxCodeHeight = 220,
  className,
}: ToolCallCardProps) {
  const id = useId();
  const [openState, setOpenState] = useState(defaultOpen);
  const open = openProp ?? openState;
  const setOpen = (next: boolean) => {
    if (openProp === undefined) setOpenState(next);
    onOpenChange?.(next);
  };
  const [prevStatus, setPrevStatus] = useState(status);
  const [autoOpened, setAutoOpened] = useState(false);
  if (status !== prevStatus) {
    setPrevStatus(status);
    if (openProp === undefined && openOnError) {
      if (status === "error" && !openState) {
        setOpenState(true);
        setAutoOpened(true);
      } else if (prevStatus === "error" && autoOpened) {
        setOpenState(false);
        setAutoOpened(false);
      }
    }
  }
  const measured = useStopwatch(status === "running", startedAt, false);
  const ms = status === "running" ? (measured ?? 0) : (duration ?? measured);
  const announce =
    status === "running"
      ? `${name} running`
      : status === "success"
        ? `${name} finished`
        : `${name} failed${error ? `: ${error}` : ""}`;
  return (
    <div
      className={["ui-tcc", className].filter(Boolean).join(" ")}
      data-status={status}
      data-open={open || undefined}
    >
      {}
      <style href="ui-tool-call-clean" precedence="default">
        {css}
      </style>
      <span className="ui-tcc-sr" role="status" aria-live="polite">
        {announce}
      </span>

      <button
        type="button"
        className="ui-tcc__head"
        aria-expanded={open}
        aria-controls={`${id}-body`}
        onClick={() => {
          setAutoOpened(false);
          setOpen(!open);
        }}
      >
        <span className="ui-tcc__icon" aria-hidden="true">
          {icon ?? <WrenchIcon />}
        </span>
        <span className="ui-tcc__main">
          <code className="ui-tcc__name">{name}</code>
          {summary != null && (
            <span
              className="ui-tcc__summary"
              title={typeof summary === "string" ? summary : undefined}
            >
              {summary}
            </span>
          )}
        </span>
        <span className="ui-tcc__status" key={status}>
          {status === "running" && <Spinner />}
          {status === "success" && (
            <svg className="ui-tcc__ok" viewBox="0 0 16 16" aria-hidden="true">
              <circle cx="8" cy="8" r="7" />
              <path d="M5.1 8.2 7.1 10.1 10.9 6" pathLength={1} />
            </svg>
          )}
          {status === "error" && <ErrorIcon />}
          <span className="ui-tcc__time">
            {status === "error" ? "Failed" : ms != null ? formatMs(ms, status === "running") : null}
          </span>
        </span>
        <Chevron />
      </button>

      <div className="ui-tcc__body" id={`${id}-body`} inert={!open}>
        <div className="ui-tcc__clip">
          <div className="ui-tcc__sections">
            {status === "error" && (
              <div className="ui-tcc__error">
                <ErrorIcon />
                <p className="ui-tcc__error-text">{error ?? "The tool call failed."}</p>
                {onRetry && (
                  <button type="button" className="ui-tcc__retry" onClick={onRetry}>
                    <svg viewBox="0 0 16 16" aria-hidden="true">
                      <path d="M2.75 8a5.25 5.25 0 1 0 1.6-3.77" />
                      <path d="M2.5 2.5v2.75h2.75" />
                    </svg>
                    Retry
                  </button>
                )}
              </div>
            )}
            {args !== undefined && (
              <CodeSection label="Arguments" value={args} cap={maxCodeHeight} />
            )}
            {result !== undefined ? (
              <CodeSection label="Result" value={result} cap={maxCodeHeight} />
            ) : status === "running" ? (
              <div className="ui-tcc__section">
                <div className="ui-tcc__section-head">
                  <span className="ui-tcc__label">Result</span>
                </div>
                <p className="ui-tcc__pending">Waiting for result…</p>
              </div>
            ) : null}
            {args === undefined && result === undefined && status === "success" && (
              <p className="ui-tcc__pending">No arguments or result.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
function ToolCallGroup({
  children,
  label,
  runningLabel = "Using tools…",
  duration,
  defaultOpen = false,
  open: openProp,
  onOpenChange,
  className,
}: ToolCallGroupProps) {
  const id = useId();
  const [openState, setOpenState] = useState(defaultOpen);
  const open = openProp ?? openState;
  const calls = Children.toArray(children)
    .filter(isValidElement)
    .map((c) => (c as ReactElement<Partial<ToolCallCardProps>>).props);
  const running = calls.some((c) => c.status === "running");
  const failed = calls.filter((c) => c.status === "error").length;
  const measured = useStopwatch(running, undefined, true);
  const sum =
    calls.length && calls.every((c) => c.duration != null)
      ? calls.reduce((t, c) => t + (c.duration ?? 0), 0)
      : null;
  const ms = running ? measured : (duration ?? sum ?? measured);
  const count = `Used ${calls.length} ${calls.length === 1 ? "tool" : "tools"}`;
  const title = running ? runningLabel : (label ?? count);
  const icons = calls.slice(-3);
  return (
    <div
      className={["ui-tcc-group", className].filter(Boolean).join(" ")}
      data-running={running || undefined}
      data-open={open || undefined}
    >
      <style href="ui-tool-call-clean" precedence="default">
        {css}
      </style>
      <span className="ui-tcc-sr" role="status" aria-live="polite">
        {running ? runningLabel : `${count}${failed ? `, ${failed} failed` : ""}`}
      </span>

      <button
        type="button"
        className="ui-tcc-group__head"
        aria-expanded={open}
        aria-controls={`${id}-list`}
        onClick={() => {
          if (openProp === undefined) setOpenState(!open);
          onOpenChange?.(!open);
        }}
      >
        <span className="ui-tcc-group__stack" aria-hidden="true">
          {icons.map((c, i) => (
            <span className="ui-tcc__icon" key={calls.length - icons.length + i}>
              {c.icon ?? <WrenchIcon />}
            </span>
          ))}
        </span>
        <span className="ui-tcc-group__title" key={running ? "busy" : "done"}>
          <span
            className={running ? "ui-tcc-group__label ui-tcc__shine" : "ui-tcc-group__label"}
            data-text={title}
          >
            {title}
          </span>
          {!running && failed > 0 && (
            <span className="ui-tcc-group__failed">· {failed} failed</span>
          )}
          {ms != null && <span className="ui-tcc-group__time">· {formatMs(ms, running)}</span>}
        </span>
        <Chevron />
      </button>

      <div className="ui-tcc__body" id={`${id}-list`} inert={!open}>
        <div className="ui-tcc__clip">
          <div className="ui-tcc-group__list">{children}</div>
        </div>
      </div>
    </div>
  );
}
function CodeSection({ label, value, cap }: { label: string; value: unknown; cap: number }) {
  const { text, json } = toText(value);
  const pre = useRef<HTMLPreElement>(null);
  const [full, setFull] = useState(false);
  const [height, setHeight] = useState(0);
  useLayoutEffect(() => {
    const el = pre.current;
    const inner = el?.firstElementChild;
    if (!el || !inner) return;
    const measure = () => setHeight(el.scrollHeight);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(inner);
    return () => ro.disconnect();
  }, [text]);
  const capped = height > cap + 24;
  return (
    <div className="ui-tcc__section">
      <div className="ui-tcc__section-head">
        <span className="ui-tcc__label">{label}</span>
        <CopyButton text={text} label={label.toLowerCase()} />
      </div>
      <pre
        ref={pre}
        className="ui-tcc__code"
        data-capped={(capped && !full) || undefined}
        style={
          capped
            ? {
                maxHeight: full ? height : cap,
              }
            : undefined
        }
      >
        <code>{json ? highlight(text) : text}</code>
      </pre>
      {capped && (
        <button
          type="button"
          className="ui-tcc__more"
          aria-expanded={full}
          onClick={() => setFull(!full)}
        >
          {full ? "Show less" : "Show all"}
        </button>
      )}
    </div>
  );
}
function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (!copied) return;
    const t = window.setTimeout(() => setCopied(false), 1400);
    return () => window.clearTimeout(t);
  }, [copied]);
  return (
    <button
      type="button"
      className="ui-tcc__copy"
      data-copied={copied || undefined}
      aria-label={copied ? "Copied" : `Copy ${label}`}
      title={copied ? "Copied" : `Copy ${label}`}
      onClick={() => copyText(text).then((ok) => ok && setCopied(true))}
    >
      <svg className="ui-tcc__copy-icon" viewBox="0 0 16 16" aria-hidden="true">
        <rect x="5.5" y="5.5" width="8.5" height="8.5" rx="2" />
        <path d="M10.5 3.75v-.25A1.5 1.5 0 0 0 9 2H3.5A1.5 1.5 0 0 0 2 3.5V9a1.5 1.5 0 0 0 1.5 1.5h.25" />
      </svg>
      <svg className="ui-tcc__copy-done" viewBox="0 0 16 16" aria-hidden="true">
        <path d="M3.5 8.4 6.6 11.3 12.5 4.9" pathLength={1} />
      </svg>
    </button>
  );
}
function Spinner() {
  return (
    <svg className="ui-tcc__spinner" viewBox="0 0 16 16" aria-hidden="true">
      <circle cx="8" cy="8" r="6" />
      <path d="M8 2a6 6 0 0 1 6 6" />
    </svg>
  );
}
function ErrorIcon() {
  return (
    <svg className="ui-tcc__err" viewBox="0 0 16 16" aria-hidden="true">
      <circle cx="8" cy="8" r="7" />
      <path d="M8 4.9v3.5M8 10.9v.1" />
    </svg>
  );
}
function Chevron() {
  return (
    <svg className="ui-tcc__chevron" viewBox="0 0 12 12" aria-hidden="true">
      <path d="M3.5 5.25 6 7.75l2.5-2.5" />
    </svg>
  );
}
function WrenchIcon() {
  return (
    <svg viewBox="0 0 16 16">
      <path d="M10.2 2.4a3.5 3.5 0 0 0-4.3 4.6L2.6 10.3a1.4 1.4 0 0 0 2 2L7.9 9a3.5 3.5 0 0 0 4.6-4.3l-2 2-1.6-.4-.4-1.6 1.7-2.3Z" />
    </svg>
  );
}
function useStopwatch(running: boolean, startedAt: number | undefined, accumulate: boolean) {
  const start = useRef<number | null>(null);
  const base = useRef(0);
  const [ms, setMs] = useState<number | null>(null);
  useEffect(() => {
    if (!running) {
      if (start.current !== null) {
        base.current += Date.now() - start.current;
        start.current = null;
        setMs(base.current);
      }
      return;
    }
    if (!accumulate) base.current = 0;
    start.current = startedAt ?? Date.now();
    const tick = () => setMs(base.current + Date.now() - (start.current ?? Date.now()));
    tick();
    const t = window.setInterval(tick, 100);
    return () => window.clearInterval(t);
  }, [running, startedAt, accumulate]);
  return ms;
}
function formatMs(ms: number, live: boolean) {
  if (!live && ms < 1000) return `${Math.max(1, Math.round(ms))}ms`;
  if (ms < 60_000) return `${(Math.floor(ms / 100) / 10).toFixed(1)}s`;
  const s = Math.floor(ms / 1000);
  return `${Math.floor(s / 60)}m ${String(s % 60).padStart(2, "0")}s`;
}
function toText(value: unknown): {
  text: string;
  json: boolean;
} {
  if (typeof value === "string") {
    const t = value.trim();
    if (t.startsWith("{") || t.startsWith("[")) {
      try {
        return {
          text: JSON.stringify(JSON.parse(t), null, 2),
          json: true,
        };
      } catch {}
    }
    return {
      text: value,
      json: false,
    };
  }
  try {
    const s = JSON.stringify(value, null, 2);
    return s === undefined
      ? {
          text: String(value),
          json: false,
        }
      : {
          text: s,
          json: true,
        };
  } catch {
    return {
      text: String(value),
      json: false,
    };
  }
}
const TOKEN =
  /("(?:[^"\\]|\\.)*")(\s*:)?|\b(?:true|false|null)\b|-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/g;
function highlight(text: string): ReactNode[] {
  const out: ReactNode[] = [];
  const re = new RegExp(TOKEN.source, "g");
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    if (m[1] && m[2]) {
      out.push(
        <span key={m.index} className="ui-tcc__t-key">
          {m[1]}
        </span>,
        m[2],
      );
    } else {
      const kind = m[1] ? "str" : /^[tfn]/.test(m[0]) ? "lit" : "num";
      out.push(
        <span key={m.index} className={`ui-tcc__t-${kind}`}>
          {m[0]}
        </span>,
      );
    }
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}
async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const area = document.createElement("textarea");
    area.value = text;
    area.style.cssText = "position:fixed;opacity:0";
    document.body.appendChild(area);
    area.select();
    const ok = document.execCommand("copy");
    area.remove();
    return ok;
  }
}
const css = `
/* Colors and motion as variables – override them on .ui-tcc / .ui-tcc-group */
.ui-tcc,
.ui-tcc-group {
  --ui-tcc-card: #ffffff;
  --ui-tcc-strong: #000000;
  --ui-tcc-ink: rgba(0, 0, 0, 0.88);
  --ui-tcc-text: rgba(0, 0, 0, 0.61);
  --ui-tcc-muted: rgba(0, 0, 0, 0.45);
  --ui-tcc-faint: rgba(0, 0, 0, 0.27);
  --ui-tcc-icon: rgba(0, 0, 0, 0.447);
  --ui-tcc-line: rgba(0, 0, 0, 0.06);
  --ui-tcc-wash: rgba(0, 0, 0, 0.03);
  --ui-tcc-wash-big: rgba(0, 0, 0, 0.015);
  /* The code panel: a 2% black frame, kept opaque so the fade of capped blocks can end on it */
  --ui-tcc-code: #fafafa;
  --ui-tcc-accent: rgba(0, 96, 226, 0.765);
  --ui-tcc-red: #d93a2b;
  --ui-tcc-red-bg: rgba(217, 58, 43, 0.04);
  --ui-tcc-red-line: rgba(217, 58, 43, 0.14);
  --ui-tcc-key: rgba(0, 0, 0, 0.88);
  --ui-tcc-str: rgba(0, 123, 172, 0.9);
  --ui-tcc-num: #b25b0c;
  --ui-tcc-lit: #5b5bd6;
  --ui-tcc-shine: rgba(255, 255, 255, 0.82);
  /* Strokes are shadows: a 0.5px hairline plus a soft lift */
  --ui-tcc-shadow: 0 0 0 0.5px rgba(0, 0, 0, 0.06), 0 1px 1px -1px rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --ui-tcc-focus: rgba(0, 96, 226, 0.35);
  --ui-tcc-ease: cubic-bezier(0.22, 1, 0.36, 1);
  --ui-tcc-mono: ui-monospace, "SF Mono", Menlo, monospace;
  box-sizing: border-box;
  container-type: inline-size;
  min-width: 0;
  color: var(--ui-tcc-ink);
  font-family: "Inter", "InterVariable", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  font-size: 13px;
  line-height: 20px;
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
}
.ui-tcc *,
.ui-tcc-group * { box-sizing: border-box; }

.ui-tcc {
  position: relative;
  border-radius: 10px;
  background: var(--ui-tcc-card);
  box-shadow: var(--ui-tcc-shadow);
}
.ui-tcc-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}

/* Header row: icon, name + summary, status, chevron – everything truncates before it overflows */
.ui-tcc__head {
  all: unset;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  min-height: 44px;
  padding: 0 14px;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 160ms ease, border-radius 0ms linear 380ms;
}
.ui-tcc[data-open] .ui-tcc__head {
  border-radius: 10px 10px 0 0;
  transition: background-color 160ms ease;
}
.ui-tcc__head:focus-visible,
.ui-tcc-group__head:focus-visible,
.ui-tcc__copy:focus-visible,
.ui-tcc__more:focus-visible,
.ui-tcc__retry:focus-visible {
  outline: 2px solid var(--ui-tcc-focus);
  outline-offset: 1px;
}
@media (hover: hover) {
  .ui-tcc__head:hover { background: var(--ui-tcc-wash-big); }
  .ui-tcc__head:hover .ui-tcc__chevron { stroke: var(--ui-tcc-ink); }
  .ui-tcc-group__head:hover { background: var(--ui-tcc-wash); color: var(--ui-tcc-ink); }
  .ui-tcc__copy:hover { background: var(--ui-tcc-wash-big); color: var(--ui-tcc-ink); }
  .ui-tcc__more:hover { color: var(--ui-tcc-ink); }
  .ui-tcc__retry:hover { background: var(--ui-tcc-wash-big); }
}

/* The tool's icon: a plain 16px glyph, no tile */
.ui-tcc__icon {
  display: grid;
  place-items: center;
  flex: none;
  width: 16px;
  height: 16px;
  color: var(--ui-tcc-icon);
}
.ui-tcc__icon > svg { width: 16px; height: 16px; fill: none; stroke: currentColor; stroke-width: 1.4; stroke-linecap: round; stroke-linejoin: round; }

.ui-tcc__main {
  display: flex;
  align-items: baseline;
  gap: 8px;
  flex: 1;
  min-width: 0;
}
.ui-tcc__name {
  flex: 0 1 auto;
  max-width: 55%;
  overflow: hidden;
  color: var(--ui-tcc-strong);
  font-family: var(--ui-tcc-mono);
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.ui-tcc__summary {
  flex: 1 1 0;
  min-width: 0;
  overflow: hidden;
  color: var(--ui-tcc-text);
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ui-tcc__status {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  flex: none;
  color: var(--ui-tcc-muted);
  font-size: 12px;
  line-height: 16px;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
  animation: ui-tcc-in 360ms var(--ui-tcc-ease) both;
}
.ui-tcc[data-status="error"] .ui-tcc__status { color: var(--ui-tcc-red); font-weight: 500; }
.ui-tcc__status > svg { width: 14px; height: 14px; flex: none; fill: none; stroke-linecap: round; stroke-linejoin: round; }
.ui-tcc__spinner circle { stroke: var(--ui-tcc-line); stroke-width: 1.6; }
.ui-tcc__spinner path { stroke: var(--ui-tcc-accent); stroke-width: 1.6; }
.ui-tcc__spinner { animation: ui-tcc-spin 800ms linear infinite; }
/* Done: a solid blue dot whose white check draws itself */
.ui-tcc__ok { animation: ui-tcc-pop 460ms cubic-bezier(0.34, 1.56, 0.64, 1) both; }
.ui-tcc__ok circle { fill: var(--ui-tcc-accent); }
.ui-tcc__ok path { stroke: #fff; stroke-width: 1.5; stroke-dasharray: 1; stroke-dashoffset: 1; animation: ui-tcc-draw 360ms var(--ui-tcc-ease) 160ms forwards; }
.ui-tcc__err circle { fill: var(--ui-tcc-red); }
.ui-tcc__err path { stroke: #fff; stroke-width: 1.6; stroke-linecap: round; }

.ui-tcc__chevron {
  flex: none;
  width: 12px;
  height: 12px;
  fill: none;
  stroke: var(--ui-tcc-icon);
  stroke-width: 1.2;
  stroke-linecap: round;
  stroke-linejoin: round;
  transition: transform 360ms var(--ui-tcc-ease), stroke 160ms ease;
}
.ui-tcc[data-open] > .ui-tcc__head .ui-tcc__chevron,
.ui-tcc-group[data-open] > .ui-tcc-group__head .ui-tcc__chevron { transform: rotate(180deg); }

/* Body: grows from 0fr to 1fr, so the height animates without measuring */
.ui-tcc__body {
  display: grid;
  grid-template-rows: 0fr;
  opacity: 0;
  transition: grid-template-rows 380ms var(--ui-tcc-ease), opacity 240ms ease;
}
.ui-tcc[data-open] > .ui-tcc__body,
.ui-tcc-group[data-open] > .ui-tcc__body {
  grid-template-rows: 1fr;
  opacity: 1;
}
.ui-tcc__clip { min-height: 0; overflow: hidden; }
.ui-tcc__sections {
  display: grid;
  gap: 14px;
  padding: 12px 14px 14px;
  border-top: 0.5px solid var(--ui-tcc-line);
}

.ui-tcc__section { display: grid; gap: 6px; min-width: 0; }
.ui-tcc__section-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  min-height: 28px;
}
/* Tiny uppercase labels: "ARGUMENTS", "RESULT" */
.ui-tcc__label {
  color: var(--ui-tcc-muted);
  font-size: 10px;
  line-height: 16px;
  font-weight: 500;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}
.ui-tcc__pending { margin: 0; color: var(--ui-tcc-muted); font-size: 12px; line-height: 16px; }

/* Copy: a small white icon button with the card's hairline */
.ui-tcc__copy {
  all: unset;
  position: relative;
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
  border-radius: 6px;
  background: var(--ui-tcc-card);
  box-shadow: var(--ui-tcc-shadow);
  color: var(--ui-tcc-icon);
  cursor: pointer;
  transition: background-color 160ms ease, color 160ms ease;
}
.ui-tcc__copy svg {
  position: absolute;
  width: 16px;
  height: 16px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.4;
  stroke-linecap: round;
  stroke-linejoin: round;
  transition: opacity 200ms ease, transform 320ms var(--ui-tcc-ease), filter 200ms ease;
}
.ui-tcc__copy-icon rect { fill: currentColor; stroke: none; }
.ui-tcc__copy-done { opacity: 0; transform: scale(0.6); filter: blur(2px); stroke-width: 1.7; }
.ui-tcc__copy[data-copied] { color: var(--ui-tcc-accent); }
.ui-tcc__copy[data-copied] .ui-tcc__copy-icon { opacity: 0; transform: scale(0.6); filter: blur(2px); }
.ui-tcc__copy[data-copied] .ui-tcc__copy-done { opacity: 1; transform: none; filter: none; }

/* Code: a faint panel with a 0.5px frame; wraps instead of scrolling sideways, capped blocks fade out */
.ui-tcc__code {
  position: relative;
  margin: 0;
  padding: 10px 12px;
  overflow: hidden;
  border-radius: 8px;
  background: var(--ui-tcc-code);
  box-shadow: inset 0 0 0 0.5px var(--ui-tcc-line);
  color: var(--ui-tcc-muted);
  font-family: var(--ui-tcc-mono);
  font-size: 12px;
  line-height: 20px;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
  tab-size: 2;
  transition: max-height 420ms var(--ui-tcc-ease);
}
.ui-tcc__code code { display: block; font: inherit; }
.ui-tcc__code::after {
  content: "";
  position: absolute;
  left: 0.5px;
  right: 0.5px;
  bottom: 0.5px;
  height: 56px;
  border-radius: 0 0 7.5px 7.5px;
  background: linear-gradient(to bottom, transparent, var(--ui-tcc-code));
  opacity: 0;
  transition: opacity 240ms ease;
  pointer-events: none;
}
.ui-tcc__code[data-capped]::after { opacity: 1; }
.ui-tcc__t-key { color: var(--ui-tcc-key); }
.ui-tcc__t-str { color: var(--ui-tcc-str); }
.ui-tcc__t-num { color: var(--ui-tcc-num); }
.ui-tcc__t-lit { color: var(--ui-tcc-lit); }

.ui-tcc__more {
  all: unset;
  justify-self: start;
  padding: 2px 4px;
  margin-left: -4px;
  border-radius: 6px;
  color: var(--ui-tcc-text);
  font-size: 12px;
  line-height: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: color 160ms ease;
}

/* Error: the message on a faint red panel and an optional white Retry button */
.ui-tcc__error {
  display: flex;
  align-items: center;
  gap: 8px;
  min-height: 44px;
  padding: 8px 8px 8px 12px;
  border-radius: 8px;
  background: var(--ui-tcc-red-bg);
  box-shadow: inset 0 0 0 0.5px var(--ui-tcc-red-line);
}
.ui-tcc__error > .ui-tcc__err { flex: none; align-self: flex-start; width: 16px; height: 16px; margin-top: 6px; }
.ui-tcc__error-text {
  flex: 1;
  min-width: 0;
  margin: 0;
  color: var(--ui-tcc-red);
  font-size: 13px;
  line-height: 20px;
  overflow-wrap: anywhere;
}
.ui-tcc__retry {
  all: unset;
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  flex: none;
  height: 28px;
  padding: 0 10px 0 6px;
  border-radius: 6px;
  background: var(--ui-tcc-card);
  box-shadow: var(--ui-tcc-shadow);
  color: var(--ui-tcc-strong);
  font-size: 13px;
  line-height: 20px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 160ms ease;
}
.ui-tcc__retry svg { width: 16px; height: 16px; fill: none; stroke: var(--ui-tcc-icon); stroke-width: 1.5; stroke-linecap: round; stroke-linejoin: round; }
.ui-tcc__retry:active svg { transform: rotate(-60deg); transition: transform 200ms var(--ui-tcc-ease); }

/* Group: one quiet line with the tool icons stacked on small white tiles, the cards below */
.ui-tcc-group { display: grid; }
.ui-tcc-group__head {
  all: unset;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: 8px;
  justify-self: start;
  max-width: 100%;
  min-height: 32px;
  margin-left: -6px;
  padding: 4px 10px 4px 6px;
  border-radius: 8px;
  color: var(--ui-tcc-ink);
  cursor: pointer;
  transition: background-color 160ms ease, color 160ms ease;
}
.ui-tcc-group__stack { display: flex; flex: none; padding: 0.5px; }
.ui-tcc-group__stack .ui-tcc__icon {
  width: 22px;
  height: 22px;
  border-radius: 6px;
  background: var(--ui-tcc-card);
  box-shadow: var(--ui-tcc-shadow);
  animation: ui-tcc-pop 420ms var(--ui-tcc-ease) both;
}
.ui-tcc-group__stack .ui-tcc__icon + .ui-tcc__icon { margin-left: -4px; }
.ui-tcc-group__stack .ui-tcc__icon > svg { width: 12px; height: 12px; stroke-width: 1.5; }
.ui-tcc-group__title {
  display: flex;
  align-items: baseline;
  gap: 6px;
  min-width: 0;
  white-space: nowrap;
  animation: ui-tcc-in 360ms var(--ui-tcc-ease) both;
}
.ui-tcc-group__label {
  position: relative;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  color: inherit;
  font-weight: 500;
}
.ui-tcc-group__label.ui-tcc__shine { color: var(--ui-tcc-muted); }
.ui-tcc-group__failed { flex: none; color: var(--ui-tcc-red); }
.ui-tcc-group__time { flex: none; color: var(--ui-tcc-faint); font-variant-numeric: tabular-nums; }
.ui-tcc-group__list { display: grid; gap: 8px; padding: 6px 0 2px; }

/* A soft light sweeping over "Using tools…" */
.ui-tcc__shine::after {
  content: attr(data-text);
  content: attr(data-text) / "";
  position: absolute;
  inset: 0;
  white-space: nowrap;
  color: transparent;
  background: linear-gradient(90deg, transparent 38%, var(--ui-tcc-shine) 50%, transparent 62%) 100% 0 / 300% 100% no-repeat;
  -webkit-background-clip: text;
  background-clip: text;
  animation: ui-tcc-sweep 1.8s linear infinite;
  pointer-events: none;
}

@keyframes ui-tcc-in {
  from { opacity: 0; transform: translateY(3px); filter: blur(2px); }
  to { opacity: 1; transform: none; filter: none; }
}
@keyframes ui-tcc-pop {
  from { opacity: 0; transform: scale(0.6); }
  to { opacity: 1; transform: none; }
}
@keyframes ui-tcc-spin { to { transform: rotate(360deg); } }
@keyframes ui-tcc-draw { to { stroke-dashoffset: 0; } }
@keyframes ui-tcc-sweep {
  from { background-position: 100% 0; }
  to { background-position: 0% 0; }
}

/* Narrow (phones): a little less padding, the summary gives way first */
@container (max-width: 360px) {
  .ui-tcc__head { gap: 8px; padding: 0 12px; }
  .ui-tcc__sections { padding: 12px 12px 12px; }
}
/* Touch screens: bigger tap targets */
@media (pointer: coarse) {
  .ui-tcc__head { min-height: 52px; }
}
@media (prefers-reduced-motion: reduce) {
  .ui-tcc *,
  .ui-tcc-group *,
  .ui-tcc *::after,
  .ui-tcc-group *::after {
    animation-duration: 1ms !important;
    animation-delay: 0ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 1ms !important;
  }
  .ui-tcc__shine::after { display: none; }
  .ui-tcc__ok path { stroke-dashoffset: 0; }
}

/* Dark mode: follows a .dark class or data-theme="dark" on any ancestor, e.g. <html> */
:where(.dark, [data-theme="dark"]) .ui-tcc,
:where(.dark, [data-theme="dark"]) .ui-tcc-group {
  --ui-tcc-card: #1c1c1e;
  --ui-tcc-strong: #ffffff;
  --ui-tcc-ink: rgba(255, 255, 255, 0.9);
  --ui-tcc-text: rgba(255, 255, 255, 0.62);
  --ui-tcc-muted: rgba(255, 255, 255, 0.46);
  --ui-tcc-faint: rgba(255, 255, 255, 0.3);
  --ui-tcc-icon: rgba(255, 255, 255, 0.5);
  --ui-tcc-line: rgba(255, 255, 255, 0.08);
  --ui-tcc-wash: rgba(255, 255, 255, 0.04);
  --ui-tcc-wash-big: rgba(255, 255, 255, 0.025);
  --ui-tcc-code: #212123;
  --ui-tcc-accent: #4d8dff;
  --ui-tcc-red: #ff7b72;
  --ui-tcc-red-bg: rgba(255, 110, 100, 0.07);
  --ui-tcc-red-line: rgba(255, 110, 100, 0.18);
  --ui-tcc-key: rgba(255, 255, 255, 0.9);
  --ui-tcc-str: #5fc8e8;
  --ui-tcc-num: #f2a65a;
  --ui-tcc-lit: #a5a5ff;
  --ui-tcc-shine: #ffffff;
  --ui-tcc-shadow: 0 0 0 0.5px rgba(255, 255, 255, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.4);
  --ui-tcc-focus: rgba(77, 141, 255, 0.5);
}
`;
const demoStyles =
  ".tc-demo{grid-template-columns:minmax(0,460px);place-content:start center;align-self:stretch;width:100%;padding-top:56px;font-family:Inter,ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,sans-serif;display:grid}.tc-demo__chat{gap:18px;min-width:0;display:grid}.tc-demo__you{color:#171717;background:#f0f0f0;border-radius:18px 18px 6px;justify-self:end;max-width:88%;margin:0;padding:10px 14px;font-size:14px;line-height:1.45}:where(.dark,[data-theme=dark]) .tc-demo__you{color:#ededed;background:#262628}.card__preview .tc-demo{grid-template-columns:auto;padding:44px 20px 0;position:absolute;inset:0}.card__preview .tc-demo__you{display:none}.card__preview .tc-demo__chat{zoom:.7;width:420px}.stage:has(.tc-demo){height:580px}@media (width<=760px){.stage:has(.tc-demo){height:680px;padding-left:16px;padding-right:16px}.tc-demo{padding-top:70px}}.card__preview .tc-demo:has(.ui-tcc-group){padding-top:48px}.card__preview .tc-demo__chat:has(.ui-tcc-group){zoom:.7}.stage .tc-demo .ui-tcc-group{zoom:1.08}\n";
function ToolCallCardCleanDemo(props: Record<string, never>) {
  return (
    <>
      <style href="plico-demo-tool-call-card-clean" precedence="default">
        {demoStyles}
      </style>
      <ToolCallCardCleanDemo2 {...props} />
    </>
  );
}
export { ToolCallCard as Component };
export { ToolCallCardCleanDemo as Demo };
export { ToolCallCard };
export { ToolCallCard as ToolCallCardClean };
export { ToolCallCardCleanDemo };
export { ToolCallGroup };
export type { ToolCallCardProps };
export type { ToolCallGroupProps };
export type { ToolCallStatus };
export default ToolCallCard;

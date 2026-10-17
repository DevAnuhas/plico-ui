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
function ToolCallGroup2({
  children: children,
  label: label,
  runningLabel = `Using tools…`,
  duration: duration,
  defaultOpen = false,
  open: open,
  onOpenChange: onOpenChange,
  className: className,
}: ToolCallGroupProps) {
  let instanceId = React.useId(),
    [localOpen, setLocalOpen] = React.useState(defaultOpen),
    isOpen = open ?? localOpen,
    childProps = React.Children.toArray(children)
      .filter(React.isValidElement)
      .map((e) => e.props as Partial<ToolCallCardProps>),
    running = childProps.some((e) => e.status === `running`),
    errorCount = childProps.filter((e) => e.status === `error`).length,
    elapsedMs = useElapsedToolTime(running, void 0, true),
    totalDuration =
      childProps.length && childProps.every((e) => e.duration != null)
        ? childProps.reduce((e, t) => e + (t.duration ?? 0), 0)
        : null,
    displayDuration = running ? elapsedMs : (duration ?? totalDuration ?? elapsedMs),
    defaultLabel = `Used ${childProps.length} ${childProps.length === 1 ? `tool` : `tools`}`,
    displayLabel = running ? runningLabel : (label ?? defaultLabel),
    lastChildren = childProps.slice(-3);
  return (
    <div
      className={[`ui-tc-group`, className].filter(Boolean).join(` `)}
      data-running={running || void 0}
      data-open={isOpen || void 0}
    >
      <style href={`ui-tool-call`} precedence={`default`}>
        {toolCallStyles}
      </style>
      <span className={`ui-tc-sr`} role={`status`} aria-live={`polite`}>
        {running ? runningLabel : `${defaultLabel}${errorCount ? `, ${errorCount} failed` : ``}`}
      </span>
      <button
        type={`button`}
        className={`ui-tc-group__head`}
        aria-expanded={isOpen}
        aria-controls={`${instanceId}-list`}
        onClick={() => {
          (open === void 0 && setLocalOpen(!isOpen), onOpenChange?.(!isOpen));
        }}
      >
        <span className={`ui-tc-group__stack`} aria-hidden={`true`}>
          {lastChildren.map((e, t) => (
            <span className={`ui-tc__icon`} key={childProps.length - lastChildren.length + t}>
              {e.icon ?? <ToolWrenchIcon />}
            </span>
          ))}
        </span>
        <span className={`ui-tc-group__title`} key={running ? `busy` : `done`}>
          <span
            className={running ? `ui-tc-group__label ui-tc__shine` : `ui-tc-group__label`}
            data-text={displayLabel}
          >
            {displayLabel}
          </span>
          {!running && errorCount > 0 && (
            <span className={`ui-tc-group__failed`}>
              {`· `}
              {errorCount}
              {` failed`}
            </span>
          )}
          {displayDuration != null && (
            <span className={`ui-tc-group__time`}>
              {`· `}
              {formatToolDuration(displayDuration, running)}
            </span>
          )}
        </span>
        <ToolChevronIcon />
      </button>
      <div className={`ui-tc__body`} id={`${instanceId}-list`} inert={!isOpen}>
        <div className={`ui-tc__clip`}>
          <div className={`ui-tc-group__list`}>{children}</div>
        </div>
      </div>
    </div>
  );
}
function ToolChevronIcon() {
  return (
    <svg className={`ui-tc__chevron`} viewBox={`0 0 16 16`} aria-hidden={`true`}>
      <path d={`M4.5 6.25 8 9.75l3.5-3.5`} />
    </svg>
  );
}
function ToolWrenchIcon() {
  return (
    <svg viewBox={`0 0 16 16`}>
      <path
        d={`M10.2 2.4a3.5 3.5 0 0 0-4.3 4.6L2.6 10.3a1.4 1.4 0 0 0 2 2L7.9 9a3.5 3.5 0 0 0 4.6-4.3l-2 2-1.6-.4-.4-1.6 1.7-2.3Z`}
      />
    </svg>
  );
}
function useElapsedToolTime(e: boolean, t: number | undefined, r: boolean) {
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
function formatToolDuration(milliseconds: number, running: boolean) {
  if (!running && milliseconds < 1e3) return `${Math.max(1, Math.round(milliseconds))}ms`;
  if (milliseconds < 6e4) return `${(Math.floor(milliseconds / 100) / 10).toFixed(1)}s`;
  let seconds = Math.floor(milliseconds / 1e3);
  return `${Math.floor(seconds / 60)}m ${String(seconds % 60).padStart(2, `0`)}s`;
}
var toolCallStyles = `
.ui-tc,
.ui-tc-group {
  --ui-tc-ink: #171717;
  --ui-tc-text: #6b6b6b;
  --ui-tc-muted: #8a8a8a;
  --ui-tc-bg: #ffffff;
  --ui-tc-line: #e7e7e7;
  --ui-tc-hover: #fafafa;
  --ui-tc-tile: #f5f5f5;
  --ui-tc-code: #fafafa;
  --ui-tc-ring: #ffffff;
  --ui-tc-red: #c8372d;
  --ui-tc-red-bg: rgba(200, 55, 45, 0.06);
  --ui-tc-red-line: rgba(200, 55, 45, 0.16);
  --ui-tc-key: #171717;
  --ui-tc-str: #0f7b6c;
  --ui-tc-num: #b25b0c;
  --ui-tc-lit: #6e56cf;
  --ui-tc-shine: rgba(255, 255, 255, 0.82);
  --ui-tc-focus: rgba(23, 23, 23, 0.22);
  --ui-tc-ease: cubic-bezier(0.22, 1, 0.36, 1);
  --ui-tc-mono: ui-monospace, "SF Mono", Menlo, monospace;
  box-sizing: border-box;
  min-width: 0;
  color: var(--ui-tc-text);
  font-family: "Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  font-size: 13.5px;
  line-height: 1.4;
  letter-spacing: -0.006em;
  -webkit-font-smoothing: antialiased;
}
.ui-tc *,
.ui-tc-group * { box-sizing: border-box; }

.ui-tc {
  position: relative;
  border-radius: 12px;
  background: var(--ui-tc-bg);
  box-shadow: inset 0 0 0 1px var(--ui-tc-line), 0 1px 2px rgba(0, 0, 0, 0.04);
}
.ui-tc-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}

/* Header: icon, name + summary, status, chevron – everything truncates before it overflows */
.ui-tc__head {
  all: unset;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  min-height: 44px;
  padding: 8px 10px 8px 9px;
  border-radius: 12px;
  cursor: pointer;
  transition: background-color 160ms ease;
}
.ui-tc[data-open] .ui-tc__head { border-radius: 12px 12px 0 0; }
.ui-tc__head:focus-visible,
.ui-tc-group__head:focus-visible,
.ui-tc__copy:focus-visible,
.ui-tc__more:focus-visible,
.ui-tc__retry:focus-visible {
  outline: 2px solid var(--ui-tc-focus);
  outline-offset: 2px;
}
@media (hover: hover) {
  .ui-tc__head:hover { background: var(--ui-tc-hover); }
  .ui-tc-group__head:hover { background: var(--ui-tc-hover); color: var(--ui-tc-ink); }
  .ui-tc__copy:hover { background: var(--ui-tc-hover); color: var(--ui-tc-ink); }
  .ui-tc__more:hover { color: var(--ui-tc-ink); }
  .ui-tc__retry:hover { background: var(--ui-tc-hover); }
}

.ui-tc__icon {
  display: grid;
  place-items: center;
  flex: none;
  width: 26px;
  height: 26px;
  border-radius: 7px;
  background: var(--ui-tc-tile);
  box-shadow: inset 0 0 0 1px var(--ui-tc-line);
  color: var(--ui-tc-ink);
}
.ui-tc__icon > svg { width: 14px; height: 14px; fill: none; stroke: currentColor; stroke-width: 1.4; stroke-linecap: round; stroke-linejoin: round; }

.ui-tc__main {
  display: flex;
  align-items: baseline;
  gap: 8px;
  flex: 1;
  min-width: 0;
}
.ui-tc__name {
  flex: 0 1 auto;
  max-width: 55%;
  overflow: hidden;
  color: var(--ui-tc-ink);
  font-family: var(--ui-tc-mono);
  font-size: 12.5px;
  font-weight: 500;
  letter-spacing: 0;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.ui-tc__summary {
  flex: 1 1 0;
  min-width: 0;
  overflow: hidden;
  color: var(--ui-tc-text);
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ui-tc__status {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  flex: none;
  color: var(--ui-tc-muted);
  font-size: 12.5px;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
  animation: ui-tc-in 360ms var(--ui-tc-ease) both;
}
.ui-tc[data-status="error"] .ui-tc__status { color: var(--ui-tc-red); }
.ui-tc__status > svg { width: 14px; height: 14px; flex: none; fill: none; stroke-linecap: round; stroke-linejoin: round; }
.ui-tc__spinner circle { stroke: currentColor; stroke-width: 1.6; opacity: 0.22; }
.ui-tc__spinner path { stroke: var(--ui-tc-ink); stroke-width: 1.6; }
.ui-tc__spinner { animation: ui-tc-spin 800ms linear infinite; }
.ui-tc__ok { stroke: var(--ui-tc-ink); stroke-width: 1.8; }
.ui-tc__ok path { stroke-dasharray: 1; stroke-dashoffset: 1; animation: ui-tc-draw 360ms var(--ui-tc-ease) 80ms forwards; }
.ui-tc__err { stroke: var(--ui-tc-red); stroke-width: 1.5; }

.ui-tc__chevron {
  flex: none;
  width: 14px;
  height: 14px;
  fill: none;
  stroke: var(--ui-tc-muted);
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-linejoin: round;
  transition: transform 360ms var(--ui-tc-ease);
}
.ui-tc[data-open] > .ui-tc__head .ui-tc__chevron,
.ui-tc-group[data-open] > .ui-tc-group__head .ui-tc__chevron { transform: rotate(180deg); }

/* Body: grows from 0fr to 1fr, so the height animates without measuring */
.ui-tc__body {
  display: grid;
  grid-template-rows: 0fr;
  opacity: 0;
  transition: grid-template-rows 380ms var(--ui-tc-ease), opacity 240ms ease;
}
.ui-tc[data-open] > .ui-tc__body,
.ui-tc-group[data-open] > .ui-tc__body {
  grid-template-rows: 1fr;
  opacity: 1;
}
.ui-tc__clip { min-height: 0; overflow: hidden; }
.ui-tc__sections {
  display: grid;
  gap: 12px;
  padding: 12px;
  border-top: 1px solid var(--ui-tc-line);
}

.ui-tc__section { display: grid; gap: 6px; min-width: 0; }
.ui-tc__section-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  min-height: 24px;
}
.ui-tc__label { color: var(--ui-tc-muted); font-size: 12px; font-weight: 500; }
.ui-tc__pending { margin: 0; color: var(--ui-tc-muted); font-size: 12.5px; }

.ui-tc__copy {
  all: unset;
  position: relative;
  display: grid;
  place-items: center;
  width: 24px;
  height: 24px;
  border-radius: 6px;
  color: var(--ui-tc-muted);
  cursor: pointer;
  transition: background-color 160ms ease, color 160ms ease;
}
.ui-tc__copy svg {
  position: absolute;
  width: 14px;
  height: 14px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.4;
  stroke-linecap: round;
  stroke-linejoin: round;
  transition: opacity 200ms ease, transform 320ms var(--ui-tc-ease), filter 200ms ease;
}
.ui-tc__copy-done { opacity: 0; transform: scale(0.6); filter: blur(2px); stroke-width: 1.7; }
.ui-tc__copy[data-copied] { color: var(--ui-tc-ink); }
.ui-tc__copy[data-copied] .ui-tc__copy-icon { opacity: 0; transform: scale(0.6); filter: blur(2px); }
.ui-tc__copy[data-copied] .ui-tc__copy-done { opacity: 1; transform: none; filter: none; }

/* Code: wraps instead of scrolling sideways; capped blocks fade out at the bottom */
.ui-tc__code {
  position: relative;
  margin: 0;
  padding: 10px 12px;
  overflow: hidden;
  border-radius: 8px;
  background: var(--ui-tc-code);
  box-shadow: inset 0 0 0 1px var(--ui-tc-line);
  color: var(--ui-tc-muted);
  font-family: var(--ui-tc-mono);
  font-size: 12px;
  line-height: 1.6;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
  tab-size: 2;
  transition: max-height 420ms var(--ui-tc-ease);
}
.ui-tc__code code { display: block; font: inherit; }
.ui-tc__code::after {
  content: "";
  position: absolute;
  left: 1px;
  right: 1px;
  bottom: 1px;
  height: 56px;
  border-radius: 0 0 7px 7px;
  background: linear-gradient(to bottom, transparent, var(--ui-tc-code));
  opacity: 0;
  transition: opacity 240ms ease;
  pointer-events: none;
}
.ui-tc__code[data-capped]::after { opacity: 1; }
.ui-tc__t-key { color: var(--ui-tc-key); }
.ui-tc__t-str { color: var(--ui-tc-str); }
.ui-tc__t-num { color: var(--ui-tc-num); }
.ui-tc__t-lit { color: var(--ui-tc-lit); }

.ui-tc__more {
  all: unset;
  justify-self: start;
  padding: 2px 4px;
  margin-left: -4px;
  border-radius: 5px;
  color: var(--ui-tc-text);
  font-size: 12.5px;
  font-weight: 500;
  cursor: pointer;
  transition: color 160ms ease;
}

/* Error: the message and an optional retry */
.ui-tc__error {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 9px 10px 9px 11px;
  border-radius: 8px;
  background: var(--ui-tc-red-bg);
  box-shadow: inset 0 0 0 1px var(--ui-tc-red-line);
}
.ui-tc__error > .ui-tc__err { flex: none; width: 14px; height: 14px; margin-top: 2px; fill: none; stroke-linecap: round; }
.ui-tc__error-text {
  flex: 1;
  min-width: 0;
  margin: 0;
  color: var(--ui-tc-red);
  font-size: 13px;
  line-height: 1.45;
  overflow-wrap: anywhere;
}
.ui-tc__retry {
  all: unset;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  flex: none;
  height: 26px;
  margin: -3px 0;
  padding: 0 10px 0 8px;
  border-radius: 7px;
  background: var(--ui-tc-bg);
  box-shadow: inset 0 0 0 1px var(--ui-tc-line), 0 1px 2px rgba(0, 0, 0, 0.04);
  color: var(--ui-tc-ink);
  font-size: 12.5px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 160ms ease;
}
.ui-tc__retry svg { width: 13px; height: 13px; fill: none; stroke: currentColor; stroke-width: 1.5; stroke-linecap: round; stroke-linejoin: round; }
.ui-tc__retry:active svg { transform: rotate(-60deg); transition: transform 200ms var(--ui-tc-ease); }

/* Group: one quiet line with the tool icons stacked, the cards below */
.ui-tc-group { display: grid; }
.ui-tc-group__head {
  all: unset;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: 9px;
  justify-self: start;
  max-width: 100%;
  min-height: 36px;
  padding: 4px 10px 4px 5px;
  border-radius: 10px;
  color: var(--ui-tc-text);
  cursor: pointer;
  transition: background-color 160ms ease, color 160ms ease;
}
.ui-tc-group__stack { display: flex; flex: none; }
.ui-tc-group__stack .ui-tc__icon {
  width: 24px;
  height: 24px;
  border-radius: 7px;
  box-shadow: inset 0 0 0 1px var(--ui-tc-line), 0 0 0 2px var(--ui-tc-ring);
  animation: ui-tc-pop 420ms var(--ui-tc-ease) both;
}
.ui-tc-group__stack .ui-tc__icon + .ui-tc__icon { margin-left: -5px; }
.ui-tc-group__stack .ui-tc__icon > svg { width: 13px; height: 13px; }
.ui-tc-group__title {
  display: flex;
  align-items: baseline;
  gap: 5px;
  min-width: 0;
  white-space: nowrap;
  animation: ui-tc-in 360ms var(--ui-tc-ease) both;
}
.ui-tc-group__label {
  position: relative;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  color: inherit;
  font-weight: 500;
}
.ui-tc-group__failed { flex: none; color: var(--ui-tc-red); }
.ui-tc-group__time { flex: none; color: var(--ui-tc-muted); font-variant-numeric: tabular-nums; }
.ui-tc-group__list { display: grid; gap: 8px; padding-top: 8px; }

/* A soft light sweeping over "Using tools…" */
.ui-tc__shine::after {
  content: attr(data-text);
  content: attr(data-text) / "";
  position: absolute;
  inset: 0;
  white-space: nowrap;
  color: transparent;
  background: linear-gradient(90deg, transparent 38%, var(--ui-tc-shine) 50%, transparent 62%) 100% 0 / 300% 100% no-repeat;
  -webkit-background-clip: text;
  background-clip: text;
  animation: ui-tc-sweep 1.8s linear infinite;
  pointer-events: none;
}

@keyframes ui-tc-in {
  from { opacity: 0; transform: translateY(3px); filter: blur(2px); }
  to { opacity: 1; transform: none; filter: none; }
}
@keyframes ui-tc-pop {
  from { opacity: 0; transform: scale(0.6); }
  to { opacity: 1; transform: none; }
}
@keyframes ui-tc-spin { to { transform: rotate(360deg); } }
@keyframes ui-tc-draw { to { stroke-dashoffset: 0; } }
@keyframes ui-tc-sweep {
  from { background-position: 100% 0; }
  to { background-position: 0% 0; }
}

@media (prefers-reduced-motion: reduce) {
  .ui-tc *,
  .ui-tc-group *,
  .ui-tc *::after,
  .ui-tc-group *::after {
    animation-duration: 1ms !important;
    animation-delay: 0ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 1ms !important;
  }
  .ui-tc__shine::after { display: none; }
  .ui-tc__ok path { stroke-dashoffset: 0; }
}

/* Dark mode: follows a .dark class or data-theme="dark" on any ancestor, e.g. <html> */
:where(.dark, [data-theme="dark"]) .ui-tc,
:where(.dark, [data-theme="dark"]) .ui-tc-group {
  --ui-tc-ink: #ededed;
  --ui-tc-text: #a1a1a1;
  --ui-tc-muted: #7c7c7c;
  --ui-tc-bg: #161618;
  --ui-tc-line: rgba(255, 255, 255, 0.1);
  --ui-tc-hover: rgba(255, 255, 255, 0.035);
  --ui-tc-tile: #1d1d20;
  --ui-tc-code: #1d1d20;
  --ui-tc-ring: #161618;
  --ui-tc-red: #ff7b72;
  --ui-tc-red-bg: rgba(255, 110, 100, 0.08);
  --ui-tc-red-line: rgba(255, 110, 100, 0.2);
  --ui-tc-key: #ededed;
  --ui-tc-str: #5fd4b8;
  --ui-tc-num: #f2a65a;
  --ui-tc-lit: #b5a4ff;
  --ui-tc-shine: rgba(255, 255, 255, 0.95);
  --ui-tc-focus: rgba(255, 255, 255, 0.3);
}
:where(.dark, [data-theme="dark"]) .ui-tc { box-shadow: inset 0 0 0 1px var(--ui-tc-line); }
`;
var valueValue = [0, 1500, 2700, 4300, 5400, 6700, 8e3];
var valueValue2 = 11500;
var valueValue3 = {
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
function ToolCallCardDemo2() {
  let [e, t] = React.useState(0),
    [l, p] = React.useState(0),
    [m, h] = React.useState(true),
    g = React.useRef(false);
  React.useEffect(() => {
    ((g.current = false), p(0), h(true));
    let e = valueValue
      .slice(1)
      .map((e, t) => window.setTimeout(() => p((e) => Math.max(e, t + 1)), e));
    return (
      e.push(window.setTimeout(() => !g.current && h(false), valueValue[6])),
      e.push(window.setTimeout(() => !g.current && t((e) => e + 1), valueValue2)),
      () => e.forEach(clearTimeout)
    );
  }, [e]);
  let _: ToolCallStatus = l === 2 ? `error` : l >= 4 ? `success` : `running`;
  return (
    <div className={`tc-demo`}>
      <div className={`tc-demo__chat`}>
        <p
          className={`tc-demo__you`}
        >{`Compare CRM pricing for our 10-person team and check open deals.`}</p>
        <ToolCallGroup2
          open={m}
          onOpenChange={(e: boolean | ((prevState: boolean) => boolean)) => {
            ((g.current = true), h(e));
          }}
          key={e}
        >
          <ToolCallCard
            name={`search_web`}
            icon={<Iconu />}
            status={l >= 1 ? `success` : `running`}
            summary={
              l >= 1
                ? `Searched the web for 'CRM pricing 2026'`
                : `Searching the web for 'CRM pricing 2026'`
            }
            args={{
              query: `CRM pricing 2026 small sales team`,
              max_results: 5,
            }}
            result={l >= 1 ? valueValue3 : void 0}
          />
          {l >= 1 && (
            <ToolCallCard
              name={`fetch_page`}
              icon={<Icond />}
              status={_}
              summary={_ === `success` ? `Read hubspot.com/pricing` : `Reading hubspot.com/pricing`}
              args={{
                url: `https://www.hubspot.com/pricing/sales`,
                timeout_ms: 8e3,
              }}
              result={
                _ === `success`
                  ? {
                      status: 200,
                      title: `Sales Hub Pricing`,
                      words: 2140,
                    }
                  : void 0
              }
              error={`Request timed out after 8s – hubspot.com didn't respond.`}
              onRetry={() => p((e) => Math.max(e, 3))}
            />
          )}
          {l >= 4 && (
            <ToolCallCard
              name={`crm.list_deals`}
              icon={<Iconf />}
              status={l >= 5 ? `success` : `running`}
              summary={l >= 5 ? `Found 4 open deals in negotiation` : `Looking up open deals`}
              args={{
                stage: `negotiation`,
                owner: `me`,
                limit: 10,
              }}
              result={
                l >= 5
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
        </ToolCallGroup2>
      </div>
    </div>
  );
}
function Iconu() {
  return (
    <svg viewBox={`0 0 16 16`}>
      <circle cx={`7`} cy={`7`} r={`4.25`} />
      <path d={`m10.25 10.25 3 3`} />
    </svg>
  );
}
function Icond() {
  return (
    <svg viewBox={`0 0 16 16`}>
      <path d={`M4 2.75h5l3 3v7.5H4z`} />
      <path d={`M9 2.75v3h3M6 9h4M6 11h3`} />
    </svg>
  );
}
function Iconf() {
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
      className={["ui-tc", className].filter(Boolean).join(" ")}
      data-status={status}
      data-open={open || undefined}
    >
      {}
      <style href="ui-tool-call" precedence="default">
        {css}
      </style>
      <span className="ui-tc-sr" role="status" aria-live="polite">
        {announce}
      </span>

      <button
        type="button"
        className="ui-tc__head"
        aria-expanded={open}
        aria-controls={`${id}-body`}
        onClick={() => {
          setAutoOpened(false);
          setOpen(!open);
        }}
      >
        <span className="ui-tc__icon" aria-hidden="true">
          {icon ?? <WrenchIcon />}
        </span>
        <span className="ui-tc__main">
          <code className="ui-tc__name">{name}</code>
          {summary != null && (
            <span
              className="ui-tc__summary"
              title={typeof summary === "string" ? summary : undefined}
            >
              {summary}
            </span>
          )}
        </span>
        <span className="ui-tc__status" key={status}>
          {status === "running" && <Spinner />}
          {status === "success" && (
            <svg className="ui-tc__ok" viewBox="0 0 16 16" aria-hidden="true">
              <path d="M3.5 8.4 6.6 11.3 12.5 4.9" pathLength={1} />
            </svg>
          )}
          {status === "error" && <ErrorIcon />}
          <span className="ui-tc__time">
            {status === "error" ? "Failed" : ms != null ? formatMs(ms, status === "running") : null}
          </span>
        </span>
        <Chevron />
      </button>

      <div className="ui-tc__body" id={`${id}-body`} inert={!open}>
        <div className="ui-tc__clip">
          <div className="ui-tc__sections">
            {status === "error" && (
              <div className="ui-tc__error">
                <ErrorIcon />
                <p className="ui-tc__error-text">{error ?? "The tool call failed."}</p>
                {onRetry && (
                  <button type="button" className="ui-tc__retry" onClick={onRetry}>
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
              <div className="ui-tc__section">
                <div className="ui-tc__section-head">
                  <span className="ui-tc__label">Result</span>
                </div>
                <p className="ui-tc__pending">Waiting for result…</p>
              </div>
            ) : null}
            {args === undefined && result === undefined && status === "success" && (
              <p className="ui-tc__pending">No arguments or result.</p>
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
      className={["ui-tc-group", className].filter(Boolean).join(" ")}
      data-running={running || undefined}
      data-open={open || undefined}
    >
      <style href="ui-tool-call" precedence="default">
        {css}
      </style>
      <span className="ui-tc-sr" role="status" aria-live="polite">
        {running ? runningLabel : `${count}${failed ? `, ${failed} failed` : ""}`}
      </span>

      <button
        type="button"
        className="ui-tc-group__head"
        aria-expanded={open}
        aria-controls={`${id}-list`}
        onClick={() => {
          if (openProp === undefined) setOpenState(!open);
          onOpenChange?.(!open);
        }}
      >
        <span className="ui-tc-group__stack" aria-hidden="true">
          {icons.map((c, i) => (
            <span className="ui-tc__icon" key={calls.length - icons.length + i}>
              {c.icon ?? <WrenchIcon />}
            </span>
          ))}
        </span>
        <span className="ui-tc-group__title" key={running ? "busy" : "done"}>
          <span
            className={running ? "ui-tc-group__label ui-tc__shine" : "ui-tc-group__label"}
            data-text={title}
          >
            {title}
          </span>
          {!running && failed > 0 && <span className="ui-tc-group__failed">· {failed} failed</span>}
          {ms != null && <span className="ui-tc-group__time">· {formatMs(ms, running)}</span>}
        </span>
        <Chevron />
      </button>

      <div className="ui-tc__body" id={`${id}-list`} inert={!open}>
        <div className="ui-tc__clip">
          <div className="ui-tc-group__list">{children}</div>
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
    <div className="ui-tc__section">
      <div className="ui-tc__section-head">
        <span className="ui-tc__label">{label}</span>
        <CopyButton text={text} label={label.toLowerCase()} />
      </div>
      <pre
        ref={pre}
        className="ui-tc__code"
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
          className="ui-tc__more"
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
      className="ui-tc__copy"
      data-copied={copied || undefined}
      aria-label={copied ? "Copied" : `Copy ${label}`}
      title={copied ? "Copied" : `Copy ${label}`}
      onClick={() => copyText(text).then((ok) => ok && setCopied(true))}
    >
      <svg className="ui-tc__copy-icon" viewBox="0 0 16 16" aria-hidden="true">
        <rect x="5.25" y="5.25" width="8" height="8" rx="2" />
        <path d="M10.75 5.25v-1a1.5 1.5 0 0 0-1.5-1.5h-4.5a2 2 0 0 0-2 2v4.5a1.5 1.5 0 0 0 1.5 1.5h1" />
      </svg>
      <svg className="ui-tc__copy-done" viewBox="0 0 16 16" aria-hidden="true">
        <path d="M3.5 8.4 6.6 11.3 12.5 4.9" pathLength={1} />
      </svg>
    </button>
  );
}
function Spinner() {
  return (
    <svg className="ui-tc__spinner" viewBox="0 0 16 16" aria-hidden="true">
      <circle cx="8" cy="8" r="5.75" />
      <path d="M8 2.25a5.75 5.75 0 0 1 5.75 5.75" />
    </svg>
  );
}
function ErrorIcon() {
  return (
    <svg className="ui-tc__err" viewBox="0 0 16 16" aria-hidden="true">
      <circle cx="8" cy="8" r="6" />
      <path d="M8 5v3.4M8 10.9v.1" />
    </svg>
  );
}
function Chevron() {
  return (
    <svg className="ui-tc__chevron" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M4.5 6.25 8 9.75l3.5-3.5" />
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
        <span key={m.index} className="ui-tc__t-key">
          {m[1]}
        </span>,
        m[2],
      );
    } else {
      const kind = m[1] ? "str" : /^[tfn]/.test(m[0]) ? "lit" : "num";
      out.push(
        <span key={m.index} className={`ui-tc__t-${kind}`}>
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
.ui-tc,
.ui-tc-group {
  --ui-tc-ink: #171717;
  --ui-tc-text: #6b6b6b;
  --ui-tc-muted: #8a8a8a;
  --ui-tc-bg: #ffffff;
  --ui-tc-line: #e7e7e7;
  --ui-tc-hover: #fafafa;
  --ui-tc-tile: #f5f5f5;
  --ui-tc-code: #fafafa;
  --ui-tc-ring: #ffffff;
  --ui-tc-red: #c8372d;
  --ui-tc-red-bg: rgba(200, 55, 45, 0.06);
  --ui-tc-red-line: rgba(200, 55, 45, 0.16);
  --ui-tc-key: #171717;
  --ui-tc-str: #0f7b6c;
  --ui-tc-num: #b25b0c;
  --ui-tc-lit: #6e56cf;
  --ui-tc-shine: rgba(255, 255, 255, 0.82);
  --ui-tc-focus: rgba(23, 23, 23, 0.22);
  --ui-tc-ease: cubic-bezier(0.22, 1, 0.36, 1);
  --ui-tc-mono: ui-monospace, "SF Mono", Menlo, monospace;
  box-sizing: border-box;
  min-width: 0;
  color: var(--ui-tc-text);
  font-family: "Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  font-size: 13.5px;
  line-height: 1.4;
  letter-spacing: -0.006em;
  -webkit-font-smoothing: antialiased;
}
.ui-tc *,
.ui-tc-group * { box-sizing: border-box; }

.ui-tc {
  position: relative;
  border-radius: 12px;
  background: var(--ui-tc-bg);
  box-shadow: inset 0 0 0 1px var(--ui-tc-line), 0 1px 2px rgba(0, 0, 0, 0.04);
}
.ui-tc-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}

/* Header: icon, name + summary, status, chevron – everything truncates before it overflows */
.ui-tc__head {
  all: unset;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  min-height: 44px;
  padding: 8px 10px 8px 9px;
  border-radius: 12px;
  cursor: pointer;
  transition: background-color 160ms ease;
}
.ui-tc[data-open] .ui-tc__head { border-radius: 12px 12px 0 0; }
.ui-tc__head:focus-visible,
.ui-tc-group__head:focus-visible,
.ui-tc__copy:focus-visible,
.ui-tc__more:focus-visible,
.ui-tc__retry:focus-visible {
  outline: 2px solid var(--ui-tc-focus);
  outline-offset: 2px;
}
@media (hover: hover) {
  .ui-tc__head:hover { background: var(--ui-tc-hover); }
  .ui-tc-group__head:hover { background: var(--ui-tc-hover); color: var(--ui-tc-ink); }
  .ui-tc__copy:hover { background: var(--ui-tc-hover); color: var(--ui-tc-ink); }
  .ui-tc__more:hover { color: var(--ui-tc-ink); }
  .ui-tc__retry:hover { background: var(--ui-tc-hover); }
}

.ui-tc__icon {
  display: grid;
  place-items: center;
  flex: none;
  width: 26px;
  height: 26px;
  border-radius: 7px;
  background: var(--ui-tc-tile);
  box-shadow: inset 0 0 0 1px var(--ui-tc-line);
  color: var(--ui-tc-ink);
}
.ui-tc__icon > svg { width: 14px; height: 14px; fill: none; stroke: currentColor; stroke-width: 1.4; stroke-linecap: round; stroke-linejoin: round; }

.ui-tc__main {
  display: flex;
  align-items: baseline;
  gap: 8px;
  flex: 1;
  min-width: 0;
}
.ui-tc__name {
  flex: 0 1 auto;
  max-width: 55%;
  overflow: hidden;
  color: var(--ui-tc-ink);
  font-family: var(--ui-tc-mono);
  font-size: 12.5px;
  font-weight: 500;
  letter-spacing: 0;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.ui-tc__summary {
  flex: 1 1 0;
  min-width: 0;
  overflow: hidden;
  color: var(--ui-tc-text);
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ui-tc__status {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  flex: none;
  color: var(--ui-tc-muted);
  font-size: 12.5px;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
  animation: ui-tc-in 360ms var(--ui-tc-ease) both;
}
.ui-tc[data-status="error"] .ui-tc__status { color: var(--ui-tc-red); }
.ui-tc__status > svg { width: 14px; height: 14px; flex: none; fill: none; stroke-linecap: round; stroke-linejoin: round; }
.ui-tc__spinner circle { stroke: currentColor; stroke-width: 1.6; opacity: 0.22; }
.ui-tc__spinner path { stroke: var(--ui-tc-ink); stroke-width: 1.6; }
.ui-tc__spinner { animation: ui-tc-spin 800ms linear infinite; }
.ui-tc__ok { stroke: var(--ui-tc-ink); stroke-width: 1.8; }
.ui-tc__ok path { stroke-dasharray: 1; stroke-dashoffset: 1; animation: ui-tc-draw 360ms var(--ui-tc-ease) 80ms forwards; }
.ui-tc__err { stroke: var(--ui-tc-red); stroke-width: 1.5; }

.ui-tc__chevron {
  flex: none;
  width: 14px;
  height: 14px;
  fill: none;
  stroke: var(--ui-tc-muted);
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-linejoin: round;
  transition: transform 360ms var(--ui-tc-ease);
}
.ui-tc[data-open] > .ui-tc__head .ui-tc__chevron,
.ui-tc-group[data-open] > .ui-tc-group__head .ui-tc__chevron { transform: rotate(180deg); }

/* Body: grows from 0fr to 1fr, so the height animates without measuring */
.ui-tc__body {
  display: grid;
  grid-template-rows: 0fr;
  opacity: 0;
  transition: grid-template-rows 380ms var(--ui-tc-ease), opacity 240ms ease;
}
.ui-tc[data-open] > .ui-tc__body,
.ui-tc-group[data-open] > .ui-tc__body {
  grid-template-rows: 1fr;
  opacity: 1;
}
.ui-tc__clip { min-height: 0; overflow: hidden; }
.ui-tc__sections {
  display: grid;
  gap: 12px;
  padding: 12px;
  border-top: 1px solid var(--ui-tc-line);
}

.ui-tc__section { display: grid; gap: 6px; min-width: 0; }
.ui-tc__section-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  min-height: 24px;
}
.ui-tc__label { color: var(--ui-tc-muted); font-size: 12px; font-weight: 500; }
.ui-tc__pending { margin: 0; color: var(--ui-tc-muted); font-size: 12.5px; }

.ui-tc__copy {
  all: unset;
  position: relative;
  display: grid;
  place-items: center;
  width: 24px;
  height: 24px;
  border-radius: 6px;
  color: var(--ui-tc-muted);
  cursor: pointer;
  transition: background-color 160ms ease, color 160ms ease;
}
.ui-tc__copy svg {
  position: absolute;
  width: 14px;
  height: 14px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.4;
  stroke-linecap: round;
  stroke-linejoin: round;
  transition: opacity 200ms ease, transform 320ms var(--ui-tc-ease), filter 200ms ease;
}
.ui-tc__copy-done { opacity: 0; transform: scale(0.6); filter: blur(2px); stroke-width: 1.7; }
.ui-tc__copy[data-copied] { color: var(--ui-tc-ink); }
.ui-tc__copy[data-copied] .ui-tc__copy-icon { opacity: 0; transform: scale(0.6); filter: blur(2px); }
.ui-tc__copy[data-copied] .ui-tc__copy-done { opacity: 1; transform: none; filter: none; }

/* Code: wraps instead of scrolling sideways; capped blocks fade out at the bottom */
.ui-tc__code {
  position: relative;
  margin: 0;
  padding: 10px 12px;
  overflow: hidden;
  border-radius: 8px;
  background: var(--ui-tc-code);
  box-shadow: inset 0 0 0 1px var(--ui-tc-line);
  color: var(--ui-tc-muted);
  font-family: var(--ui-tc-mono);
  font-size: 12px;
  line-height: 1.6;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
  tab-size: 2;
  transition: max-height 420ms var(--ui-tc-ease);
}
.ui-tc__code code { display: block; font: inherit; }
.ui-tc__code::after {
  content: "";
  position: absolute;
  left: 1px;
  right: 1px;
  bottom: 1px;
  height: 56px;
  border-radius: 0 0 7px 7px;
  background: linear-gradient(to bottom, transparent, var(--ui-tc-code));
  opacity: 0;
  transition: opacity 240ms ease;
  pointer-events: none;
}
.ui-tc__code[data-capped]::after { opacity: 1; }
.ui-tc__t-key { color: var(--ui-tc-key); }
.ui-tc__t-str { color: var(--ui-tc-str); }
.ui-tc__t-num { color: var(--ui-tc-num); }
.ui-tc__t-lit { color: var(--ui-tc-lit); }

.ui-tc__more {
  all: unset;
  justify-self: start;
  padding: 2px 4px;
  margin-left: -4px;
  border-radius: 5px;
  color: var(--ui-tc-text);
  font-size: 12.5px;
  font-weight: 500;
  cursor: pointer;
  transition: color 160ms ease;
}

/* Error: the message and an optional retry */
.ui-tc__error {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 9px 10px 9px 11px;
  border-radius: 8px;
  background: var(--ui-tc-red-bg);
  box-shadow: inset 0 0 0 1px var(--ui-tc-red-line);
}
.ui-tc__error > .ui-tc__err { flex: none; width: 14px; height: 14px; margin-top: 2px; fill: none; stroke-linecap: round; }
.ui-tc__error-text {
  flex: 1;
  min-width: 0;
  margin: 0;
  color: var(--ui-tc-red);
  font-size: 13px;
  line-height: 1.45;
  overflow-wrap: anywhere;
}
.ui-tc__retry {
  all: unset;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  flex: none;
  height: 26px;
  margin: -3px 0;
  padding: 0 10px 0 8px;
  border-radius: 7px;
  background: var(--ui-tc-bg);
  box-shadow: inset 0 0 0 1px var(--ui-tc-line), 0 1px 2px rgba(0, 0, 0, 0.04);
  color: var(--ui-tc-ink);
  font-size: 12.5px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 160ms ease;
}
.ui-tc__retry svg { width: 13px; height: 13px; fill: none; stroke: currentColor; stroke-width: 1.5; stroke-linecap: round; stroke-linejoin: round; }
.ui-tc__retry:active svg { transform: rotate(-60deg); transition: transform 200ms var(--ui-tc-ease); }

/* Group: one quiet line with the tool icons stacked, the cards below */
.ui-tc-group { display: grid; }
.ui-tc-group__head {
  all: unset;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: 9px;
  justify-self: start;
  max-width: 100%;
  min-height: 36px;
  padding: 4px 10px 4px 5px;
  border-radius: 10px;
  color: var(--ui-tc-text);
  cursor: pointer;
  transition: background-color 160ms ease, color 160ms ease;
}
.ui-tc-group__stack { display: flex; flex: none; }
.ui-tc-group__stack .ui-tc__icon {
  width: 24px;
  height: 24px;
  border-radius: 7px;
  box-shadow: inset 0 0 0 1px var(--ui-tc-line), 0 0 0 2px var(--ui-tc-ring);
  animation: ui-tc-pop 420ms var(--ui-tc-ease) both;
}
.ui-tc-group__stack .ui-tc__icon + .ui-tc__icon { margin-left: -5px; }
.ui-tc-group__stack .ui-tc__icon > svg { width: 13px; height: 13px; }
.ui-tc-group__title {
  display: flex;
  align-items: baseline;
  gap: 5px;
  min-width: 0;
  white-space: nowrap;
  animation: ui-tc-in 360ms var(--ui-tc-ease) both;
}
.ui-tc-group__label {
  position: relative;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  color: inherit;
  font-weight: 500;
}
.ui-tc-group__failed { flex: none; color: var(--ui-tc-red); }
.ui-tc-group__time { flex: none; color: var(--ui-tc-muted); font-variant-numeric: tabular-nums; }
.ui-tc-group__list { display: grid; gap: 8px; padding-top: 8px; }

/* A soft light sweeping over "Using tools…" */
.ui-tc__shine::after {
  content: attr(data-text);
  content: attr(data-text) / "";
  position: absolute;
  inset: 0;
  white-space: nowrap;
  color: transparent;
  background: linear-gradient(90deg, transparent 38%, var(--ui-tc-shine) 50%, transparent 62%) 100% 0 / 300% 100% no-repeat;
  -webkit-background-clip: text;
  background-clip: text;
  animation: ui-tc-sweep 1.8s linear infinite;
  pointer-events: none;
}

@keyframes ui-tc-in {
  from { opacity: 0; transform: translateY(3px); filter: blur(2px); }
  to { opacity: 1; transform: none; filter: none; }
}
@keyframes ui-tc-pop {
  from { opacity: 0; transform: scale(0.6); }
  to { opacity: 1; transform: none; }
}
@keyframes ui-tc-spin { to { transform: rotate(360deg); } }
@keyframes ui-tc-draw { to { stroke-dashoffset: 0; } }
@keyframes ui-tc-sweep {
  from { background-position: 100% 0; }
  to { background-position: 0% 0; }
}

@media (prefers-reduced-motion: reduce) {
  .ui-tc *,
  .ui-tc-group *,
  .ui-tc *::after,
  .ui-tc-group *::after {
    animation-duration: 1ms !important;
    animation-delay: 0ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 1ms !important;
  }
  .ui-tc__shine::after { display: none; }
  .ui-tc__ok path { stroke-dashoffset: 0; }
}

/* Dark mode: follows a .dark class or data-theme="dark" on any ancestor, e.g. <html> */
:where(.dark, [data-theme="dark"]) .ui-tc,
:where(.dark, [data-theme="dark"]) .ui-tc-group {
  --ui-tc-ink: #ededed;
  --ui-tc-text: #a1a1a1;
  --ui-tc-muted: #7c7c7c;
  --ui-tc-bg: #161618;
  --ui-tc-line: rgba(255, 255, 255, 0.1);
  --ui-tc-hover: rgba(255, 255, 255, 0.035);
  --ui-tc-tile: #1d1d20;
  --ui-tc-code: #1d1d20;
  --ui-tc-ring: #161618;
  --ui-tc-red: #ff7b72;
  --ui-tc-red-bg: rgba(255, 110, 100, 0.08);
  --ui-tc-red-line: rgba(255, 110, 100, 0.2);
  --ui-tc-key: #ededed;
  --ui-tc-str: #5fd4b8;
  --ui-tc-num: #f2a65a;
  --ui-tc-lit: #b5a4ff;
  --ui-tc-shine: rgba(255, 255, 255, 0.95);
  --ui-tc-focus: rgba(255, 255, 255, 0.3);
}
:where(.dark, [data-theme="dark"]) .ui-tc { box-shadow: inset 0 0 0 1px var(--ui-tc-line); }
`;
const demoStyles =
  ".tc-demo{grid-template-columns:minmax(0,460px);place-content:start center;align-self:stretch;width:100%;padding-top:56px;font-family:Inter,ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,sans-serif;display:grid}.tc-demo__chat{gap:18px;min-width:0;display:grid}.tc-demo__you{color:#171717;background:#f0f0f0;border-radius:18px 18px 6px;justify-self:end;max-width:88%;margin:0;padding:10px 14px;font-size:14px;line-height:1.45}:where(.dark,[data-theme=dark]) .tc-demo__you{color:#ededed;background:#262628}.card__preview .tc-demo{grid-template-columns:auto;padding:44px 20px 0;position:absolute;inset:0}.card__preview .tc-demo__you{display:none}.card__preview .tc-demo__chat{zoom:.7;width:420px}.stage:has(.tc-demo){height:580px}@media (width<=760px){.stage:has(.tc-demo){height:680px;padding-left:16px;padding-right:16px}.tc-demo{padding-top:70px}}.card__preview .tc-demo:has(.ui-tcc-group){padding-top:48px}.card__preview .tc-demo__chat:has(.ui-tcc-group){zoom:.7}.stage .tc-demo .ui-tcc-group{zoom:1.08}\n";
function ToolCallCardDemo(props: Record<string, never>) {
  return (
    <>
      <style href="plico-demo-tool-call-card" precedence="default">
        {demoStyles}
      </style>
      <ToolCallCardDemo2 {...props} />
    </>
  );
}
export { ToolCallCard as Component };
export { ToolCallCardDemo as Demo };
export { ToolCallCard };
export { ToolCallCardDemo };
export { ToolCallGroup };
export type { ToolCallCardProps };
export type { ToolCallGroupProps };
export type { ToolCallStatus };
export default ToolCallCard;

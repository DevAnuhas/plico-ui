"use client";

import * as React from "react";
import { Fragment } from "react";
import { useEffect } from "react";
import { useId } from "react";
import { useRef } from "react";
import { useState } from "react";
import type { KeyboardEvent } from "react";
import type { ReactNode } from "react";
import type { Ref } from "react";
function Icona({
  id: id,
  children: children,
  className: className,
}: {
  id: string | number;
  children: React.ReactNode;
  className?: string;
}) {
  let a = React.useRef({
      id: id,
      node: children,
    }),
    [o, s] = React.useState(id),
    [c, l] = React.useState<{ id: string | number; node: React.ReactNode } | null>(null);
  return (
    o !== id && (s(id), l(a.current)),
    (a.current = {
      id: id,
      node: children,
    }),
    React.useEffect(() => {
      if (!c) return;
      let e = window.setTimeout(() => l(null), 300);
      return () => window.clearTimeout(e);
    }, [c]),
    (
      <span className={[`ui-mac__swap`, className].filter(Boolean).join(` `)}>
        {c && (
          <span
            className={`ui-mac__swap-item`}
            data-out={``}
            aria-hidden={`true`}
            key={`out-${c.id}`}
          >
            {c.node}
          </span>
        )}
        <span className={`ui-mac__swap-item`} key={id}>
          {children}
        </span>
      </span>
    )
  );
}
function MessageActionsCleanComponent({
  version: version,
  children: children,
  className: className,
}: React.ComponentProps<typeof MessageText>) {
  let o = React.useRef<HTMLDivElement | null>(null),
    [s, c] = React.useState<number | undefined>(void 0);
  return (
    React.useEffect(() => {
      let e = o.current;
      if (!e || typeof ResizeObserver > `u`) return;
      let t = new ResizeObserver(() => c(e.offsetHeight));
      return (t.observe(e), () => t.disconnect());
    }, []),
    (
      <div
        className={[`ui-mac-text`, className].filter(Boolean).join(` `)}
        style={{
          height: s,
        }}
      >
        <style href={`ui-message-actions-clean`} precedence={`default`}>
          {ViewP}
        </style>
        <div ref={o} className={`ui-mac-text__inner`}>
          <Icona id={String(version)} className={`ui-mac-text__swap`}>
            {children}
          </Icona>
        </div>
      </div>
    )
  );
}
var ViewP = `
/* Colors and motion as variables – override them on .ui-mac */
.ui-mac {
  --ui-mac-card: #ffffff;
  --ui-mac-strong: #000000;
  --ui-mac-ink: rgba(0, 0, 0, 0.88);
  --ui-mac-text: rgba(0, 0, 0, 0.61);
  --ui-mac-muted: rgba(0, 0, 0, 0.45);
  --ui-mac-faint: rgba(0, 0, 0, 0.27);
  --ui-mac-icon: rgba(0, 0, 0, 0.447);
  --ui-mac-line: rgba(0, 0, 0, 0.06);
  --ui-mac-fill: rgba(0, 0, 0, 0.06);
  --ui-mac-wash: rgba(0, 0, 0, 0.03);
  --ui-mac-solid: rgba(0, 0, 0, 0.88);
  --ui-mac-solid-hover: rgba(0, 0, 0, 0.8);
  --ui-mac-on-solid: #fcfcfc;
  --ui-mac-accent: rgba(0, 96, 226, 0.765);
  --ui-mac-ok: #1a9a52;
  --ui-mac-ok-bg: rgba(26, 154, 82, 0.08);
  /* Strokes are shadows: a 0.5px hairline plus a soft lift */
  --ui-mac-shadow: 0 0 0 0.5px rgba(0, 0, 0, 0.06), 0 1px 1px -1px rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --ui-mac-shadow-pop: 0 0 0 0.5px rgba(0, 0, 0, 0.08), 0 12px 28px -10px rgba(0, 0, 0, 0.16), 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --ui-mac-focus: rgba(0, 96, 226, 0.35);
  --ui-mac-ease: cubic-bezier(0.22, 1, 0.36, 1);
  box-sizing: border-box;
  display: block;
  width: 100%;
  min-width: 0;
  container-type: inline-size;
  font-family: "Inter", "InterVariable", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  font-size: 13px;
  font-weight: 400;
  line-height: 20px;
  color: var(--ui-mac-ink);
  text-align: left;
  -webkit-font-smoothing: antialiased;
}
.ui-mac *, .ui-mac *::before, .ui-mac *::after { box-sizing: border-box; }
:where(.ui-mac) button { margin: 0; padding: 0; border: 0; background: none; font: inherit; color: inherit; text-align: inherit; cursor: pointer; -webkit-tap-highlight-color: transparent; }
.ui-mac button:focus-visible, .ui-mac input:focus-visible { outline: 2px solid var(--ui-mac-focus); outline-offset: 1px; }
.ui-mac svg { display: block; flex: none; }
.ui-mac__sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }

/* ----- The bar: quiet until the message is hovered, something inside is focused or busy ----- */
.ui-mac__bar { display: flex; align-items: center; gap: 2px; min-height: 28px; transition: opacity 240ms ease; }
.ui-mac[data-quiet] .ui-mac__bar { opacity: 0.6; }
.ui-mac[data-quiet]:hover .ui-mac__bar,
.ui-mac[data-quiet]:focus-within .ui-mac__bar,
.ui-mac[data-quiet][data-active] .ui-mac__bar,
:where([data-ui-message]:hover, [data-ui-message]:focus-within) .ui-mac[data-quiet] .ui-mac__bar { opacity: 1; }

/* Ghost icon buttons; pressed takes the selected-tab look */
.ui-mac__item { position: relative; display: inline-flex; flex: none; }
.ui-mac__btn { display: grid; place-items: center; width: 28px; height: 28px; border-radius: 6px; color: var(--ui-mac-icon); transition: background-color 160ms ease, color 160ms ease, box-shadow 160ms ease; }
.ui-mac__btn:hover { background: var(--ui-mac-wash); color: var(--ui-mac-ink); }
.ui-mac__btn:active .ui-mac__icon { transform: scale(0.9); }
.ui-mac__btn[aria-pressed="true"],
.ui-mac__btn[aria-pressed="true"]:hover { background: var(--ui-mac-fill); box-shadow: inset 0 0 0 0.5px var(--ui-mac-line); color: var(--ui-mac-ink); }
.ui-mac__btn--copy[data-done] { color: var(--ui-mac-ok); }

.ui-mac__icon { position: relative; display: grid; place-items: center; width: 16px; height: 16px; transition: transform 160ms var(--ui-mac-ease); }
.ui-mac__glyph { width: 16px; height: 16px; fill: none; stroke: currentColor; stroke-width: 1.1; stroke-linecap: round; stroke-linejoin: round; }
.ui-mac__glyph[data-solid] { fill: currentColor; stroke: none; }
.ui-mac__fill { fill: currentColor; stroke: none; }

/* Two icons on top of each other – one blurs away while the other comes in */
.ui-mac__morph { display: grid; }
.ui-mac__layer { grid-area: 1 / 1; display: grid; place-items: center; opacity: 0; transform: scale(0.6); filter: blur(2px); transition: opacity 200ms ease, transform 300ms var(--ui-mac-ease), filter 200ms ease; }
.ui-mac__layer[data-on] { opacity: 1; transform: none; filter: none; }

/* Regenerate spins once per press, and keeps going while busy */
.ui-mac__spin { display: grid; place-items: center; }
.ui-mac__spin[data-spin] { animation: ui-mac-spin 640ms var(--ui-mac-ease); }
.ui-mac__btn[data-busy] { color: var(--ui-mac-ink); }
.ui-mac__btn[data-busy] .ui-mac__spin { animation: ui-mac-spin 900ms linear infinite; }

/* Thumbs: down is the same glyph turned upside down; a vote gives it a little pop */
.ui-mac__btn--down .ui-mac__glyph { transform: scaleY(-1); }
.ui-mac__btn[aria-pressed="true"] .ui-mac__thumb { animation: ui-mac-pop 420ms var(--ui-mac-ease); }

/* Read aloud: four bars in the accent blue that bounce while it plays */
.ui-mac__eq { display: flex; align-items: center; justify-content: center; gap: 2px; width: 16px; height: 16px; color: var(--ui-mac-accent); }
.ui-mac__eq i { display: block; width: 2px; height: 11px; border-radius: 1px; background: currentColor; transform: scaleY(0.3); }
.ui-mac__eq[data-on] i { animation: ui-mac-eq 900ms ease-in-out infinite; }
.ui-mac__eq[data-on] i:nth-child(2) { animation-delay: -300ms; animation-duration: 760ms; }
.ui-mac__eq[data-on] i:nth-child(3) { animation-delay: -520ms; animation-duration: 1000ms; }
.ui-mac__eq[data-on] i:nth-child(4) { animation-delay: -140ms; animation-duration: 820ms; }

/* ----- Tooltips: a small white popover above the button – on hover after a beat, on keyboard focus, and briefly after Copy ----- */
.ui-mac__tip { position: absolute; bottom: calc(100% + 6px); left: 50%; z-index: 3; display: block; width: max-content; padding: 2px 8px; border-radius: 6px; background: var(--ui-mac-card); box-shadow: var(--ui-mac-shadow-pop); font-size: 12px; font-weight: 500; line-height: 20px; color: var(--ui-mac-ink); white-space: nowrap; pointer-events: none; opacity: 0; transform: translate(-50%, 3px); transition: opacity 140ms ease, transform 200ms var(--ui-mac-ease); }
.ui-mac__btn:focus-visible + .ui-mac__tip,
.ui-mac__item[data-flash] .ui-mac__tip { opacity: 1; transform: translate(-50%, 0); transition-delay: 0ms; }
@media (hover: hover) {
  .ui-mac__item:hover .ui-mac__tip { opacity: 1; transform: translate(-50%, 0); transition-delay: 380ms; }
}

/* ----- Version switcher: unfolds next to Regenerate once there are two versions ----- */
.ui-mac__regen { display: inline-flex; align-items: center; flex: none; }
.ui-mac__versions { display: grid; grid-template-columns: 0fr; opacity: 0; transition: grid-template-columns 420ms var(--ui-mac-ease), opacity 220ms ease; }
.ui-mac__versions[data-open] { grid-template-columns: 1fr; opacity: 1; transition: grid-template-columns 420ms var(--ui-mac-ease), opacity 320ms ease 100ms; }
.ui-mac__versions-clip { display: flex; align-items: center; min-width: 0; overflow: hidden; padding-right: 2px; }
.ui-mac__step { display: grid; flex: none; place-items: center; width: 20px; height: 28px; border-radius: 6px; color: var(--ui-mac-icon); transition: background-color 160ms ease, color 160ms ease, opacity 160ms ease; }
.ui-mac__step[data-dir="prev"] .ui-mac__glyph { transform: scaleX(-1); }
.ui-mac__step:hover:not(:disabled) { background: var(--ui-mac-wash); color: var(--ui-mac-ink); }
.ui-mac__step:disabled { cursor: default; opacity: 0.45; }
.ui-mac__count { display: inline-flex; align-items: center; gap: 2px; padding: 0 2px; font-size: 12px; line-height: 16px; color: var(--ui-mac-faint); white-space: nowrap; font-variant-numeric: tabular-nums; }
.ui-mac__count-now { color: var(--ui-mac-ink); font-weight: 500; }
.ui-mac__count > .ui-mac__swap:last-child { color: var(--ui-mac-muted); }

/* ----- Swapping text ----- */
.ui-mac__swap { display: inline-grid; min-width: 0; }
.ui-mac__swap-item { grid-area: 1 / 1; display: inline-flex; align-items: center; justify-content: center; gap: 4px; min-width: 0; animation: ui-mac-in 300ms ease both; }
.ui-mac__swap-item[data-out] { animation: ui-mac-out 220ms ease both; }

/* ----- Feedback row: unfolds below the bar, no card of its own – it sits in the card the bar sits in ----- */
.ui-mac__fold { display: grid; grid-template-rows: 0fr; opacity: 0; transition: grid-template-rows 420ms var(--ui-mac-ease), opacity 220ms ease; }
.ui-mac__fold[data-open] { grid-template-rows: 1fr; opacity: 1; transition: grid-template-rows 420ms var(--ui-mac-ease), opacity 320ms ease 80ms; }
.ui-mac__clip { min-height: 0; overflow: hidden; margin: -3px; padding: 3px; }  /* the 3px keep hairlines and focus rings from being clipped */
.ui-mac__panel { padding: 10px 8px 8px; }
.ui-mac__panel-head { display: flex; align-items: center; justify-content: space-between; gap: 8px; min-height: 24px; }
.ui-mac__ask { font-size: 13px; font-weight: 500; line-height: 20px; color: var(--ui-mac-strong); }
.ui-mac__close { display: grid; flex: none; place-items: center; width: 24px; height: 24px; margin-right: -4px; border-radius: 6px; color: var(--ui-mac-icon); transition: background-color 160ms ease, color 160ms ease; }
.ui-mac__close:hover { background: var(--ui-mac-wash); color: var(--ui-mac-ink); }
.ui-mac__chips { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; margin-top: 8px; }
/* Reasons: the tab-button look – a hairline, gray text; the picked one gets the gray fill */
.ui-mac__chip { height: 28px; padding: 4px 10px; border-radius: 6px; box-shadow: inset 0 0 0 0.5px var(--ui-mac-line); font-size: 13px; font-weight: 500; line-height: 20px; color: var(--ui-mac-text); white-space: nowrap; transition: background-color 140ms ease, color 140ms ease, opacity 200ms ease; }
.ui-mac__chip:hover:not(:disabled) { background: var(--ui-mac-wash); color: var(--ui-mac-ink); }
.ui-mac__chip[aria-pressed="true"], .ui-mac__chip[aria-pressed="true"]:hover:not(:disabled) { background: var(--ui-mac-fill); color: var(--ui-mac-ink); }
.ui-mac__chip:disabled { cursor: default; }
.ui-mac__chip:disabled:not([aria-pressed="true"]) { opacity: 0.45; }
/* Send: the dark chip; once sent a soft green fill */
.ui-mac__send { display: inline-flex; align-items: center; justify-content: center; min-width: 60px; height: 28px; margin-left: auto; padding: 0 10px; border-radius: 6px; background: var(--ui-mac-solid); font-size: 13px; font-weight: 500; line-height: 20px; color: var(--ui-mac-on-solid); white-space: nowrap; transition: background-color 220ms ease, color 220ms ease, opacity 200ms ease; }
.ui-mac__send:hover:not(:disabled):not([data-sent]) { background: var(--ui-mac-solid-hover); }
.ui-mac__send:disabled { cursor: default; opacity: 0.3; }
.ui-mac__send[data-sent] { cursor: default; background: var(--ui-mac-ok-bg); color: var(--ui-mac-ok); }
.ui-mac__send .ui-mac__glyph { width: 14px; height: 14px; stroke-width: 1.5; }
.ui-mac__input { display: block; width: 100%; height: 32px; margin-top: 8px; padding: 0 10px; border: 0; border-radius: 6px; background: var(--ui-mac-card); box-shadow: var(--ui-mac-shadow); font: inherit; font-size: 13px; line-height: 20px; color: var(--ui-mac-ink); outline: none; }
.ui-mac__input::placeholder { color: var(--ui-mac-faint); }

/* ----- Message text that crossfades between versions (MessageText) ----- */
.ui-mac-text { overflow: hidden; transition: height 360ms var(--ui-mac-ease, cubic-bezier(0.22, 1, 0.36, 1)); }
.ui-mac-text__swap { display: grid; }
.ui-mac-text__swap > .ui-mac__swap-item { display: block; animation: ui-mac-text-in 420ms ease both; }
.ui-mac-text__swap > .ui-mac__swap-item[data-out] { animation: ui-mac-out 260ms ease both; }

@keyframes ui-mac-in { from { opacity: 0; filter: blur(2px); } }
@keyframes ui-mac-text-in { from { opacity: 0; filter: blur(3px); } }
@keyframes ui-mac-out { from { opacity: 1; } to { opacity: 0; filter: blur(2px); } }
@keyframes ui-mac-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
@keyframes ui-mac-pop { 0% { transform: scale(1); } 40% { transform: scale(1.22) rotate(-8deg); } 100% { transform: scale(1); } }
@keyframes ui-mac-eq { 0%, 100% { transform: scaleY(0.3); } 50% { transform: scaleY(1); } }

/* Narrow: the feedback row stacks its send button under the reasons */
@container (max-width: 320px) {
  .ui-mac__send { flex-basis: 100%; }
}

@media (pointer: coarse) {
  .ui-mac[data-quiet] .ui-mac__bar { opacity: 1; }
  .ui-mac__btn { width: 36px; height: 36px; }
  .ui-mac__step { width: 28px; height: 36px; }
  .ui-mac__chip, .ui-mac__send { height: 34px; padding-top: 7px; padding-bottom: 7px; }
  .ui-mac__close { width: 32px; height: 32px; }
  .ui-mac__input { height: 38px; }
}

@media (prefers-reduced-motion: reduce) {
  .ui-mac *, .ui-mac *::before, .ui-mac *::after, .ui-mac-text, .ui-mac-text * { animation: none !important; transition: none !important; }
  .ui-mac__eq[data-on] i:nth-child(odd) { transform: scaleY(0.8); }
  .ui-mac__eq[data-on] i:nth-child(even) { transform: scaleY(0.5); }
}

/* Dark mode: follows a .dark class or data-theme="dark" on any ancestor, e.g. <html> */
:where(.dark, [data-theme="dark"]) .ui-mac {
  --ui-mac-card: #1c1c1e;
  --ui-mac-strong: #ffffff;
  --ui-mac-ink: rgba(255, 255, 255, 0.9);
  --ui-mac-text: rgba(255, 255, 255, 0.62);
  --ui-mac-muted: rgba(255, 255, 255, 0.46);
  --ui-mac-faint: rgba(255, 255, 255, 0.3);
  --ui-mac-icon: rgba(255, 255, 255, 0.5);
  --ui-mac-line: rgba(255, 255, 255, 0.08);
  --ui-mac-fill: rgba(255, 255, 255, 0.08);
  --ui-mac-wash: rgba(255, 255, 255, 0.04);
  --ui-mac-solid: rgba(255, 255, 255, 0.9);
  --ui-mac-solid-hover: rgba(255, 255, 255, 0.8);
  --ui-mac-on-solid: #1c1c1e;
  --ui-mac-accent: #4d8dff;
  --ui-mac-ok: #3ec27a;
  --ui-mac-ok-bg: rgba(62, 194, 122, 0.14);
  --ui-mac-shadow: 0 0 0 0.5px rgba(255, 255, 255, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.4);
  --ui-mac-shadow-pop: 0 0 0 0.5px rgba(255, 255, 255, 0.12), 0 12px 28px -10px rgba(0, 0, 0, 0.6);
  --ui-mac-focus: rgba(77, 141, 255, 0.5);
}
`;
var valueValue4 = [
  `Version 2.4 adds shared workspaces, cuts sync time in half and fixes the export bug on Windows.`,
  `Shared workspaces arrive in 2.4, sync is twice as fast, and exports on Windows work again.`,
  `In short: teams can now share a workspace, syncing takes half as long and Windows exports are fixed.`,
];
function MessageActionsCleanDemo2() {
  let e = React.useRef<HTMLDivElement | null>(null),
    [t, i] = React.useState(0),
    [a, s] = React.useState(1),
    [c, l] = React.useState(0),
    [u, d] = React.useState(false),
    [p, h] = React.useState(false),
    g = React.useRef(false),
    _ = () => {
      u ||
        (d(true),
        window.setTimeout(() => {
          (d(false), s((e) => Math.min(valueValue4.length, e + 1)));
        }, 1e3));
    };
  (React.useEffect(() => l(a - 1), [a]),
    React.useEffect(() => {
      let t = (t: string) => () => e.current?.querySelector<HTMLButtonElement>(t)?.click(),
        n: [number, () => void][] = [
          [700, t(`.ui-mac__btn--copy`)],
          [1e3, t(`.ui-mac__btn--down`)],
          [700, t(`.ui-mac__chip:nth-child(2)`)],
          [900, t(`.ui-mac__send`)],
          [2600, t(`.ui-mac__btn--regenerate`)],
          [2800, t(`.ui-mac__step[data-dir='prev']`)],
          [2e3, t(`.ui-mac__step[data-dir='next']`)],
          [
            3e3,
            () => {
              (s(1), l(0), i((e) => e + 1));
            },
          ],
        ],
        r = 0,
        a = 0,
        o = () => {
          g.current ||
            r >= n.length ||
            (a = window.setTimeout(() => {
              g.current || (n[r][1](), r++, o());
            }, n[r][0]));
        };
      return (o(), () => window.clearTimeout(a));
    }, [t]));
  let v = () => {
      ((g.current = true), h(true));
    },
    y = valueValue4[c];
  return (
    <div
      ref={e}
      className={`ma-demo ma-demo--clean`}
      onPointerEnter={v}
      onPointerDownCapture={v}
      onKeyDownCapture={v}
      onFocusCapture={v}
    >
      <div className={`mac-demo__card`} data-ui-message={``}>
        <div className={`mac-demo__body`}>
          <p className={`mac-demo__ask`}>{`Summarize the 2.4 release notes in one sentence.`}</p>
          <div className={`mac-demo__who`}>
            <span className={`mac-demo__dot`} aria-hidden={`true`} />
            {`Sonnet 5.5`}
          </div>
          <div className={`mac-demo__answer`} data-writing={u ? `` : void 0}>
            <MessageActionsCleanComponent version={c}>{y}</MessageActionsCleanComponent>
          </div>
        </div>
        <div className={`mac-demo__foot`}>
          <MessageActions
            text={p ? y : void 0}
            versions={a}
            version={c}
            onVersionChange={l}
            onRegenerate={_}
            regenerating={u}
            key={t}
          />
        </div>
      </div>
    </div>
  );
}
type MessageActionKey = "copy" | "regenerate" | "feedback" | "speak";
type FeedbackKind = "up" | "down";
type MessageActionsProps = {
  text?: string;
  actions?: MessageActionKey[];
  versions?: number | string[];
  version?: number;
  defaultVersion?: number;
  onVersionChange?: (index: number) => void;
  onCopy?: (text?: string) => void;
  onRegenerate?: () => void;
  regenerating?: boolean;
  onFeedback?: (kind: FeedbackKind | null, reason?: string) => void;
  reasons?: string[];
  onSpeak?: (playing: boolean) => void;
  speaking?: boolean;
  speakDuration?: number;
  quiet?: boolean;
  label?: string;
  className?: string;
};
const reduced = () =>
  typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
function Swap({
  id,
  children,
  className,
}: {
  id: string;
  children: ReactNode;
  className?: string;
}) {
  type Line = {
    id: string;
    node: ReactNode;
  };
  const last = useRef<Line>({
    id,
    node: children,
  });
  const [shownId, setShownId] = useState(id);
  const [out, setOut] = useState<Line | null>(null);
  if (shownId !== id) {
    setShownId(id);
    setOut(last.current);
  }
  last.current = {
    id,
    node: children,
  };
  useEffect(() => {
    if (!out) return;
    const timer = window.setTimeout(() => setOut(null), 300);
    return () => window.clearTimeout(timer);
  }, [out]);
  return (
    <span className={["ui-mac__swap", className].filter(Boolean).join(" ")}>
      {out && (
        <span key={`out-${out.id}`} className="ui-mac__swap-item" data-out="" aria-hidden="true">
          {out.node}
        </span>
      )}
      <span key={id} className="ui-mac__swap-item">
        {children}
      </span>
    </span>
  );
}
function MessageText({
  version,
  children,
  className,
}: {
  version: string | number;
  children: ReactNode;
  className?: string;
}) {
  const inner = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | undefined>(undefined);
  useEffect(() => {
    const el = inner.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => setHeight(el.offsetHeight));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return (
    <div
      className={["ui-mac-text", className].filter(Boolean).join(" ")}
      style={{
        height,
      }}
    >
      <style href="ui-message-actions-clean" precedence="default">
        {css}
      </style>
      <div ref={inner} className="ui-mac-text__inner">
        <Swap id={String(version)} className="ui-mac-text__swap">
          {children}
        </Swap>
      </div>
    </div>
  );
}
const Glyph = ({ d, solid }: { d: string; solid?: boolean }) => (
  <svg
    viewBox="0 0 16 16"
    className="ui-mac__glyph"
    data-solid={solid || undefined}
    aria-hidden="true"
  >
    <path d={d} />
  </svg>
);
const Speaker = () => (
  <svg viewBox="0 0 16 16" className="ui-mac__glyph" aria-hidden="true">
    <path
      className="ui-mac__fill"
      d="M7.4 3.2a.6.6 0 0 1 1 .46v8.68a.6.6 0 0 1-1 .46L4.6 10.5H3A1.5 1.5 0 0 1 1.5 9V7A1.5 1.5 0 0 1 3 5.5h1.6l2.8-2.3Z"
    />
    <path d="M10.6 6.2a2.6 2.6 0 0 1 0 3.6M12.4 4.4a5.2 5.2 0 0 1 0 7.2" />
  </svg>
);
const icons = {
  copy: "M5.5 2A1.5 1.5 0 0 0 4 3.5V4h5A3 3 0 0 1 12 7v5h.5a1.5 1.5 0 0 0 1.5-1.5v-7A1.5 1.5 0 0 0 12.5 2h-7ZM3.5 5A1.5 1.5 0 0 0 2 6.5v6A1.5 1.5 0 0 0 3.5 14H9a1.5 1.5 0 0 0 1.5-1.5v-6A1.5 1.5 0 0 0 9 5H3.5Z",
  check:
    "M1.5 8a6.5 6.5 0 1 1 13 0 6.5 6.5 0 0 1-13 0Zm8.9-1.2a.5.5 0 0 0-.8-.6L7.44 9.23 6.35 8.15a.5.5 0 1 0-.7.7l1.5 1.5a.5.5 0 0 0 .76-.06l2.5-3.5Z",
  tick: "M3.5 8.5 6.5 11.5 12.5 4.5",
  redo: "M13 8a5 5 0 1 1-1.46-3.54M13 2.5v2.5h-2.5",
  thumb:
    "M4.5 7v6.5H3a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h1.5Zm1 6.5h5.95a1.5 1.5 0 0 0 1.47-1.2l.86-4.3A1.5 1.5 0 0 0 12.31 6.2H9.5l.42-2.08A1.4 1.4 0 0 0 7.3 3.1L5.5 6.8v6.7Z",
  next: "M10.85 7.65a.5.5 0 0 1 0 .7L7.2 12a.5.5 0 0 1-.7-.7L9.79 8 6.5 4.7a.5.5 0 1 1 .7-.7l3.65 3.65Z",
  close: "m4.5 4.5 7 7m0-7-7 7",
};
const DEFAULT_ACTIONS: MessageActionKey[] = ["copy", "regenerate", "feedback", "speak"];
const DEFAULT_REASONS = ["Not accurate", "Too long", "Didn't follow instructions", "Other"];
function MessageActions({
  text,
  actions = DEFAULT_ACTIONS,
  versions,
  version,
  defaultVersion,
  onVersionChange,
  onCopy,
  onRegenerate,
  regenerating = false,
  onFeedback,
  reasons = DEFAULT_REASONS,
  onSpeak,
  speaking,
  speakDuration,
  quiet = true,
  label = "Message actions",
  className,
}: MessageActionsProps) {
  const uid = useId();
  const count = Math.max(
    1,
    typeof versions === "number" ? Math.floor(versions) : (versions?.length ?? 1),
  );
  const [inner, setInner] = useState(() =>
    Math.min(count - 1, Math.max(0, defaultVersion ?? count - 1)),
  );
  const [seenCount, setSeenCount] = useState(count);
  const [vote, setVote] = useState<FeedbackKind | null>(null);
  const [panel, setPanel] = useState(false);
  const [reason, setReason] = useState<string | null>(null);
  const [other, setOther] = useState("");
  const [sent, setSent] = useState(false);
  if (seenCount !== count) {
    if (count > seenCount) {
      setInner(count - 1);
      setVote(null);
      setPanel(false);
    }
    setSeenCount(count);
  }
  const index = Math.min(count - 1, Math.max(0, version ?? inner));
  const goTo = (i: number) => {
    const next = Math.min(count - 1, Math.max(0, i));
    if (next === index) return;
    if (version === undefined) setInner(next);
    onVersionChange?.(next);
    announce(`Version ${next + 1} of ${count}`);
  };
  const [status, setStatus] = useState("");
  const announce = (s: string) => setStatus((old) => (old === s ? `${s} ` : s));
  const [copied, setCopied] = useState(0);
  useEffect(() => {
    if (!copied) return;
    const t = window.setTimeout(() => setCopied(0), 1600);
    return () => window.clearTimeout(t);
  }, [copied]);
  const copy = () => {
    if (text !== undefined) navigator.clipboard?.writeText(text).catch(() => {});
    onCopy?.(text);
    setCopied(Date.now());
    announce("Copied");
  };
  const [spin, setSpin] = useState(0);
  const regenerate = () => {
    setSpin((s) => s + 1);
    onRegenerate?.();
    announce("Regenerating");
  };
  const thumbsUp = () => {
    if (vote === "up") {
      setVote(null);
      onFeedback?.(null);
      return;
    }
    setVote("up");
    setPanel(false);
    onFeedback?.("up");
    announce("Marked as good response");
  };
  const thumbsDown = () => {
    if (vote === "down") {
      setVote(null);
      setPanel(false);
      onFeedback?.(null);
      return;
    }
    setVote("down");
    setPanel(true);
    setSent(false);
    setReason(null);
    setOther("");
    onFeedback?.("down");
    announce("Marked as bad response. Tell us what went wrong below");
  };
  const send = () => {
    if (!reason || sent) return;
    onFeedback?.("down", reason === "Other" ? other.trim() || "Other" : reason);
    setSent(true);
    announce("Thanks for the feedback");
  };
  useEffect(() => {
    if (!sent) return;
    const t = window.setTimeout(() => setPanel(false), reduced() ? 1200 : 1500);
    return () => window.clearTimeout(t);
  }, [sent]);
  const downRef = useRef<HTMLButtonElement>(null);
  const closePanel = () => {
    setPanel(false);
    downRef.current?.focus();
  };
  const [innerSpeaking, setInnerSpeaking] = useState(false);
  const playing = speaking ?? innerSpeaking;
  const words = text ? text.trim().split(/\s+/).length : 0;
  const duration = speakDuration ?? Math.max(2600, words * 380);
  useEffect(() => {
    if (speaking !== undefined || !innerSpeaking) return;
    const t = window.setTimeout(() => {
      setInnerSpeaking(false);
      onSpeak?.(false);
      announce("Finished reading");
    }, duration);
    return () => window.clearTimeout(t);
  }, [innerSpeaking, speaking, duration]);
  const speak = () => {
    const next = !playing;
    if (speaking === undefined) setInnerSpeaking(next);
    onSpeak?.(next);
    announce(next ? "Reading aloud" : "Stopped reading");
  };
  const active = Boolean(copied) || panel || playing || regenerating;
  const button = (o: {
    key: string;
    tip: string;
    labelText: string;
    onClick: () => void;
    children: ReactNode;
    pressed?: boolean;
    flash?: boolean;
    extra?: Record<string, string | undefined>;
    expanded?: boolean;
    controls?: string;
    refEl?: Ref<HTMLButtonElement>;
  }) => (
    <span className="ui-mac__item" key={o.key} data-flash={o.flash ? "" : undefined}>
      <button
        ref={o.refEl}
        type="button"
        className={`ui-mac__btn ui-mac__btn--${o.key}`}
        aria-label={o.labelText}
        aria-pressed={o.pressed}
        aria-expanded={o.expanded}
        aria-controls={o.controls}
        onClick={o.onClick}
        {...o.extra}
      >
        {o.children}
      </button>
      <span className="ui-mac__tip" aria-hidden="true">
        <Swap id={o.tip}>{o.tip}</Swap>
      </span>
    </span>
  );
  const parts: ReactNode[] = actions.map((key) => {
    if (key === "copy")
      return button({
        key: "copy",
        tip: copied ? "Copied" : "Copy",
        labelText: copied ? "Copied" : "Copy message",
        onClick: copy,
        flash: Boolean(copied),
        extra: {
          "data-done": copied ? "" : undefined,
        },
        children: (
          <span className="ui-mac__icon ui-mac__morph">
            <span className="ui-mac__layer" data-on={copied ? undefined : ""}>
              <Glyph d={icons.copy} solid />
            </span>
            <span className="ui-mac__layer ui-mac__layer--check" data-on={copied ? "" : undefined}>
              <Glyph d={icons.check} solid />
            </span>
          </span>
        ),
      });
    if (key === "regenerate")
      return (
        <span className="ui-mac__regen" key="regenerate">
          {button({
            key: "regenerate",
            tip: regenerating ? "Writing…" : "Regenerate",
            labelText: "Regenerate response",
            onClick: regenerate,
            extra: {
              "data-busy": regenerating ? "" : undefined,
            },
            children: (
              <span className="ui-mac__icon">
                <span className="ui-mac__spin" key={spin} data-spin={spin ? "" : undefined}>
                  <Glyph d={icons.redo} />
                </span>
              </span>
            ),
          })}
          <span
            className="ui-mac__versions"
            data-open={count > 1 ? "" : undefined}
            inert={count < 2}
          >
            <span className="ui-mac__versions-clip" role="group" aria-label="Versions">
              <button
                type="button"
                className="ui-mac__step"
                data-dir="prev"
                aria-label="Previous version"
                disabled={index === 0}
                onClick={() => goTo(index - 1)}
              >
                <Glyph d={icons.next} solid />
              </button>
              <span className="ui-mac__count" aria-label={`Version ${index + 1} of ${count}`}>
                <Swap id={String(index)} className="ui-mac__count-now">
                  {index + 1}
                </Swap>
                <span aria-hidden="true">/</span>
                <Swap id={String(count)}>{count}</Swap>
              </span>
              <button
                type="button"
                className="ui-mac__step"
                data-dir="next"
                aria-label="Next version"
                disabled={index >= count - 1}
                onClick={() => goTo(index + 1)}
              >
                <Glyph d={icons.next} solid />
              </button>
            </span>
          </span>
        </span>
      );
    if (key === "feedback")
      return (
        <Fragment key="feedback">
          {button({
            key: "up",
            tip: vote === "up" ? "Thanks!" : "Good response",
            labelText: "Good response",
            pressed: vote === "up",
            onClick: thumbsUp,
            children: (
              <span className="ui-mac__icon ui-mac__thumb">
                <Glyph d={icons.thumb} solid />
              </span>
            ),
          })}
          {button({
            key: "down",
            tip: "Bad response",
            labelText: "Bad response",
            pressed: vote === "down",
            expanded: panel,
            controls: `${uid}-feedback`,
            onClick: thumbsDown,
            refEl: downRef,
            children: (
              <span className="ui-mac__icon ui-mac__thumb">
                <Glyph d={icons.thumb} solid />
              </span>
            ),
          })}
        </Fragment>
      );
    return button({
      key: "speak",
      tip: playing ? "Stop" : "Read aloud",
      labelText: playing ? "Stop reading" : "Read aloud",
      pressed: playing,
      onClick: speak,
      children: (
        <span className="ui-mac__icon ui-mac__morph">
          <span className="ui-mac__layer" data-on={playing ? undefined : ""}>
            <Speaker />
          </span>
          <span className="ui-mac__layer ui-mac__eq" data-on={playing ? "" : undefined}>
            <i />
            <i />
            <i />
            <i />
          </span>
        </span>
      ),
    });
  });
  const onPanelKey = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      e.stopPropagation();
      closePanel();
    }
  };
  return (
    <div
      className={["ui-mac", className].filter(Boolean).join(" ")}
      data-quiet={quiet ? "" : undefined}
      data-active={active ? "" : undefined}
    >
      <style href="ui-message-actions-clean" precedence="default">
        {css}
      </style>

      <div className="ui-mac__bar" role="group" aria-label={label}>
        {parts}
      </div>

      {actions.includes("feedback") && (
        <div
          id={`${uid}-feedback`}
          className="ui-mac__fold"
          data-open={panel ? "" : undefined}
          inert={!panel}
        >
          <div className="ui-mac__clip">
            <div
              className="ui-mac__panel"
              role="group"
              aria-labelledby={`${uid}-ask`}
              onKeyDown={onPanelKey}
            >
              <div className="ui-mac__panel-head">
                <span id={`${uid}-ask`} className="ui-mac__ask">
                  What went wrong?
                </span>
                <button
                  type="button"
                  className="ui-mac__close"
                  aria-label="Close feedback"
                  onClick={closePanel}
                >
                  <Glyph d={icons.close} />
                </button>
              </div>
              <div className="ui-mac__chips">
                {reasons.map((r) => (
                  <button
                    key={r}
                    type="button"
                    className="ui-mac__chip"
                    aria-pressed={reason === r}
                    disabled={sent}
                    onClick={() => setReason(reason === r ? null : r)}
                  >
                    {r}
                  </button>
                ))}
                <button
                  type="button"
                  className="ui-mac__send"
                  data-sent={sent ? "" : undefined}
                  disabled={!reason}
                  aria-disabled={sent || undefined}
                  onClick={send}
                >
                  <Swap id={sent ? "sent" : "send"}>
                    {sent ? (
                      <>
                        <Glyph d={icons.tick} />
                        Thanks!
                      </>
                    ) : (
                      "Send"
                    )}
                  </Swap>
                </button>
              </div>
              {reasons.includes("Other") && (
                <div
                  className="ui-mac__fold"
                  data-open={reason === "Other" && !sent ? "" : undefined}
                  inert={reason !== "Other" || sent}
                >
                  <div className="ui-mac__clip">
                    <input
                      className="ui-mac__input"
                      value={other}
                      placeholder="Tell us more (optional)"
                      aria-label="What went wrong, in your words"
                      onChange={(e) => setOther(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") send();
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <span className="ui-mac__sr" aria-live="polite">
        {status}
      </span>
    </div>
  );
}
const css = `
/* Colors and motion as variables – override them on .ui-mac */
.ui-mac {
  --ui-mac-card: #ffffff;
  --ui-mac-strong: #000000;
  --ui-mac-ink: rgba(0, 0, 0, 0.88);
  --ui-mac-text: rgba(0, 0, 0, 0.61);
  --ui-mac-muted: rgba(0, 0, 0, 0.45);
  --ui-mac-faint: rgba(0, 0, 0, 0.27);
  --ui-mac-icon: rgba(0, 0, 0, 0.447);
  --ui-mac-line: rgba(0, 0, 0, 0.06);
  --ui-mac-fill: rgba(0, 0, 0, 0.06);
  --ui-mac-wash: rgba(0, 0, 0, 0.03);
  --ui-mac-solid: rgba(0, 0, 0, 0.88);
  --ui-mac-solid-hover: rgba(0, 0, 0, 0.8);
  --ui-mac-on-solid: #fcfcfc;
  --ui-mac-accent: rgba(0, 96, 226, 0.765);
  --ui-mac-ok: #1a9a52;
  --ui-mac-ok-bg: rgba(26, 154, 82, 0.08);
  /* Strokes are shadows: a 0.5px hairline plus a soft lift */
  --ui-mac-shadow: 0 0 0 0.5px rgba(0, 0, 0, 0.06), 0 1px 1px -1px rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --ui-mac-shadow-pop: 0 0 0 0.5px rgba(0, 0, 0, 0.08), 0 12px 28px -10px rgba(0, 0, 0, 0.16), 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --ui-mac-focus: rgba(0, 96, 226, 0.35);
  --ui-mac-ease: cubic-bezier(0.22, 1, 0.36, 1);
  box-sizing: border-box;
  display: block;
  width: 100%;
  min-width: 0;
  container-type: inline-size;
  font-family: "Inter", "InterVariable", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  font-size: 13px;
  font-weight: 400;
  line-height: 20px;
  color: var(--ui-mac-ink);
  text-align: left;
  -webkit-font-smoothing: antialiased;
}
.ui-mac *, .ui-mac *::before, .ui-mac *::after { box-sizing: border-box; }
:where(.ui-mac) button { margin: 0; padding: 0; border: 0; background: none; font: inherit; color: inherit; text-align: inherit; cursor: pointer; -webkit-tap-highlight-color: transparent; }
.ui-mac button:focus-visible, .ui-mac input:focus-visible { outline: 2px solid var(--ui-mac-focus); outline-offset: 1px; }
.ui-mac svg { display: block; flex: none; }
.ui-mac__sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }

/* ----- The bar: quiet until the message is hovered, something inside is focused or busy ----- */
.ui-mac__bar { display: flex; align-items: center; gap: 2px; min-height: 28px; transition: opacity 240ms ease; }
.ui-mac[data-quiet] .ui-mac__bar { opacity: 0.6; }
.ui-mac[data-quiet]:hover .ui-mac__bar,
.ui-mac[data-quiet]:focus-within .ui-mac__bar,
.ui-mac[data-quiet][data-active] .ui-mac__bar,
:where([data-ui-message]:hover, [data-ui-message]:focus-within) .ui-mac[data-quiet] .ui-mac__bar { opacity: 1; }

/* Ghost icon buttons; pressed takes the selected-tab look */
.ui-mac__item { position: relative; display: inline-flex; flex: none; }
.ui-mac__btn { display: grid; place-items: center; width: 28px; height: 28px; border-radius: 6px; color: var(--ui-mac-icon); transition: background-color 160ms ease, color 160ms ease, box-shadow 160ms ease; }
.ui-mac__btn:hover { background: var(--ui-mac-wash); color: var(--ui-mac-ink); }
.ui-mac__btn:active .ui-mac__icon { transform: scale(0.9); }
.ui-mac__btn[aria-pressed="true"],
.ui-mac__btn[aria-pressed="true"]:hover { background: var(--ui-mac-fill); box-shadow: inset 0 0 0 0.5px var(--ui-mac-line); color: var(--ui-mac-ink); }
.ui-mac__btn--copy[data-done] { color: var(--ui-mac-ok); }

.ui-mac__icon { position: relative; display: grid; place-items: center; width: 16px; height: 16px; transition: transform 160ms var(--ui-mac-ease); }
.ui-mac__glyph { width: 16px; height: 16px; fill: none; stroke: currentColor; stroke-width: 1.1; stroke-linecap: round; stroke-linejoin: round; }
.ui-mac__glyph[data-solid] { fill: currentColor; stroke: none; }
.ui-mac__fill { fill: currentColor; stroke: none; }

/* Two icons on top of each other – one blurs away while the other comes in */
.ui-mac__morph { display: grid; }
.ui-mac__layer { grid-area: 1 / 1; display: grid; place-items: center; opacity: 0; transform: scale(0.6); filter: blur(2px); transition: opacity 200ms ease, transform 300ms var(--ui-mac-ease), filter 200ms ease; }
.ui-mac__layer[data-on] { opacity: 1; transform: none; filter: none; }

/* Regenerate spins once per press, and keeps going while busy */
.ui-mac__spin { display: grid; place-items: center; }
.ui-mac__spin[data-spin] { animation: ui-mac-spin 640ms var(--ui-mac-ease); }
.ui-mac__btn[data-busy] { color: var(--ui-mac-ink); }
.ui-mac__btn[data-busy] .ui-mac__spin { animation: ui-mac-spin 900ms linear infinite; }

/* Thumbs: down is the same glyph turned upside down; a vote gives it a little pop */
.ui-mac__btn--down .ui-mac__glyph { transform: scaleY(-1); }
.ui-mac__btn[aria-pressed="true"] .ui-mac__thumb { animation: ui-mac-pop 420ms var(--ui-mac-ease); }

/* Read aloud: four bars in the accent blue that bounce while it plays */
.ui-mac__eq { display: flex; align-items: center; justify-content: center; gap: 2px; width: 16px; height: 16px; color: var(--ui-mac-accent); }
.ui-mac__eq i { display: block; width: 2px; height: 11px; border-radius: 1px; background: currentColor; transform: scaleY(0.3); }
.ui-mac__eq[data-on] i { animation: ui-mac-eq 900ms ease-in-out infinite; }
.ui-mac__eq[data-on] i:nth-child(2) { animation-delay: -300ms; animation-duration: 760ms; }
.ui-mac__eq[data-on] i:nth-child(3) { animation-delay: -520ms; animation-duration: 1000ms; }
.ui-mac__eq[data-on] i:nth-child(4) { animation-delay: -140ms; animation-duration: 820ms; }

/* ----- Tooltips: a small white popover above the button – on hover after a beat, on keyboard focus, and briefly after Copy ----- */
.ui-mac__tip { position: absolute; bottom: calc(100% + 6px); left: 50%; z-index: 3; display: block; width: max-content; padding: 2px 8px; border-radius: 6px; background: var(--ui-mac-card); box-shadow: var(--ui-mac-shadow-pop); font-size: 12px; font-weight: 500; line-height: 20px; color: var(--ui-mac-ink); white-space: nowrap; pointer-events: none; opacity: 0; transform: translate(-50%, 3px); transition: opacity 140ms ease, transform 200ms var(--ui-mac-ease); }
.ui-mac__btn:focus-visible + .ui-mac__tip,
.ui-mac__item[data-flash] .ui-mac__tip { opacity: 1; transform: translate(-50%, 0); transition-delay: 0ms; }
@media (hover: hover) {
  .ui-mac__item:hover .ui-mac__tip { opacity: 1; transform: translate(-50%, 0); transition-delay: 380ms; }
}

/* ----- Version switcher: unfolds next to Regenerate once there are two versions ----- */
.ui-mac__regen { display: inline-flex; align-items: center; flex: none; }
.ui-mac__versions { display: grid; grid-template-columns: 0fr; opacity: 0; transition: grid-template-columns 420ms var(--ui-mac-ease), opacity 220ms ease; }
.ui-mac__versions[data-open] { grid-template-columns: 1fr; opacity: 1; transition: grid-template-columns 420ms var(--ui-mac-ease), opacity 320ms ease 100ms; }
.ui-mac__versions-clip { display: flex; align-items: center; min-width: 0; overflow: hidden; padding-right: 2px; }
.ui-mac__step { display: grid; flex: none; place-items: center; width: 20px; height: 28px; border-radius: 6px; color: var(--ui-mac-icon); transition: background-color 160ms ease, color 160ms ease, opacity 160ms ease; }
.ui-mac__step[data-dir="prev"] .ui-mac__glyph { transform: scaleX(-1); }
.ui-mac__step:hover:not(:disabled) { background: var(--ui-mac-wash); color: var(--ui-mac-ink); }
.ui-mac__step:disabled { cursor: default; opacity: 0.45; }
.ui-mac__count { display: inline-flex; align-items: center; gap: 2px; padding: 0 2px; font-size: 12px; line-height: 16px; color: var(--ui-mac-faint); white-space: nowrap; font-variant-numeric: tabular-nums; }
.ui-mac__count-now { color: var(--ui-mac-ink); font-weight: 500; }
.ui-mac__count > .ui-mac__swap:last-child { color: var(--ui-mac-muted); }

/* ----- Swapping text ----- */
.ui-mac__swap { display: inline-grid; min-width: 0; }
.ui-mac__swap-item { grid-area: 1 / 1; display: inline-flex; align-items: center; justify-content: center; gap: 4px; min-width: 0; animation: ui-mac-in 300ms ease both; }
.ui-mac__swap-item[data-out] { animation: ui-mac-out 220ms ease both; }

/* ----- Feedback row: unfolds below the bar, no card of its own – it sits in the card the bar sits in ----- */
.ui-mac__fold { display: grid; grid-template-rows: 0fr; opacity: 0; transition: grid-template-rows 420ms var(--ui-mac-ease), opacity 220ms ease; }
.ui-mac__fold[data-open] { grid-template-rows: 1fr; opacity: 1; transition: grid-template-rows 420ms var(--ui-mac-ease), opacity 320ms ease 80ms; }
.ui-mac__clip { min-height: 0; overflow: hidden; margin: -3px; padding: 3px; }  /* the 3px keep hairlines and focus rings from being clipped */
.ui-mac__panel { padding: 10px 8px 8px; }
.ui-mac__panel-head { display: flex; align-items: center; justify-content: space-between; gap: 8px; min-height: 24px; }
.ui-mac__ask { font-size: 13px; font-weight: 500; line-height: 20px; color: var(--ui-mac-strong); }
.ui-mac__close { display: grid; flex: none; place-items: center; width: 24px; height: 24px; margin-right: -4px; border-radius: 6px; color: var(--ui-mac-icon); transition: background-color 160ms ease, color 160ms ease; }
.ui-mac__close:hover { background: var(--ui-mac-wash); color: var(--ui-mac-ink); }
.ui-mac__chips { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; margin-top: 8px; }
/* Reasons: the tab-button look – a hairline, gray text; the picked one gets the gray fill */
.ui-mac__chip { height: 28px; padding: 4px 10px; border-radius: 6px; box-shadow: inset 0 0 0 0.5px var(--ui-mac-line); font-size: 13px; font-weight: 500; line-height: 20px; color: var(--ui-mac-text); white-space: nowrap; transition: background-color 140ms ease, color 140ms ease, opacity 200ms ease; }
.ui-mac__chip:hover:not(:disabled) { background: var(--ui-mac-wash); color: var(--ui-mac-ink); }
.ui-mac__chip[aria-pressed="true"], .ui-mac__chip[aria-pressed="true"]:hover:not(:disabled) { background: var(--ui-mac-fill); color: var(--ui-mac-ink); }
.ui-mac__chip:disabled { cursor: default; }
.ui-mac__chip:disabled:not([aria-pressed="true"]) { opacity: 0.45; }
/* Send: the dark chip; once sent a soft green fill */
.ui-mac__send { display: inline-flex; align-items: center; justify-content: center; min-width: 60px; height: 28px; margin-left: auto; padding: 0 10px; border-radius: 6px; background: var(--ui-mac-solid); font-size: 13px; font-weight: 500; line-height: 20px; color: var(--ui-mac-on-solid); white-space: nowrap; transition: background-color 220ms ease, color 220ms ease, opacity 200ms ease; }
.ui-mac__send:hover:not(:disabled):not([data-sent]) { background: var(--ui-mac-solid-hover); }
.ui-mac__send:disabled { cursor: default; opacity: 0.3; }
.ui-mac__send[data-sent] { cursor: default; background: var(--ui-mac-ok-bg); color: var(--ui-mac-ok); }
.ui-mac__send .ui-mac__glyph { width: 14px; height: 14px; stroke-width: 1.5; }
.ui-mac__input { display: block; width: 100%; height: 32px; margin-top: 8px; padding: 0 10px; border: 0; border-radius: 6px; background: var(--ui-mac-card); box-shadow: var(--ui-mac-shadow); font: inherit; font-size: 13px; line-height: 20px; color: var(--ui-mac-ink); outline: none; }
.ui-mac__input::placeholder { color: var(--ui-mac-faint); }

/* ----- Message text that crossfades between versions (MessageText) ----- */
.ui-mac-text { overflow: hidden; transition: height 360ms var(--ui-mac-ease, cubic-bezier(0.22, 1, 0.36, 1)); }
.ui-mac-text__swap { display: grid; }
.ui-mac-text__swap > .ui-mac__swap-item { display: block; animation: ui-mac-text-in 420ms ease both; }
.ui-mac-text__swap > .ui-mac__swap-item[data-out] { animation: ui-mac-out 260ms ease both; }

@keyframes ui-mac-in { from { opacity: 0; filter: blur(2px); } }
@keyframes ui-mac-text-in { from { opacity: 0; filter: blur(3px); } }
@keyframes ui-mac-out { from { opacity: 1; } to { opacity: 0; filter: blur(2px); } }
@keyframes ui-mac-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
@keyframes ui-mac-pop { 0% { transform: scale(1); } 40% { transform: scale(1.22) rotate(-8deg); } 100% { transform: scale(1); } }
@keyframes ui-mac-eq { 0%, 100% { transform: scaleY(0.3); } 50% { transform: scaleY(1); } }

/* Narrow: the feedback row stacks its send button under the reasons */
@container (max-width: 320px) {
  .ui-mac__send { flex-basis: 100%; }
}

@media (pointer: coarse) {
  .ui-mac[data-quiet] .ui-mac__bar { opacity: 1; }
  .ui-mac__btn { width: 36px; height: 36px; }
  .ui-mac__step { width: 28px; height: 36px; }
  .ui-mac__chip, .ui-mac__send { height: 34px; padding-top: 7px; padding-bottom: 7px; }
  .ui-mac__close { width: 32px; height: 32px; }
  .ui-mac__input { height: 38px; }
}

@media (prefers-reduced-motion: reduce) {
  .ui-mac *, .ui-mac *::before, .ui-mac *::after, .ui-mac-text, .ui-mac-text * { animation: none !important; transition: none !important; }
  .ui-mac__eq[data-on] i:nth-child(odd) { transform: scaleY(0.8); }
  .ui-mac__eq[data-on] i:nth-child(even) { transform: scaleY(0.5); }
}

/* Dark mode: follows a .dark class or data-theme="dark" on any ancestor, e.g. <html> */
:where(.dark, [data-theme="dark"]) .ui-mac {
  --ui-mac-card: #1c1c1e;
  --ui-mac-strong: #ffffff;
  --ui-mac-ink: rgba(255, 255, 255, 0.9);
  --ui-mac-text: rgba(255, 255, 255, 0.62);
  --ui-mac-muted: rgba(255, 255, 255, 0.46);
  --ui-mac-faint: rgba(255, 255, 255, 0.3);
  --ui-mac-icon: rgba(255, 255, 255, 0.5);
  --ui-mac-line: rgba(255, 255, 255, 0.08);
  --ui-mac-fill: rgba(255, 255, 255, 0.08);
  --ui-mac-wash: rgba(255, 255, 255, 0.04);
  --ui-mac-solid: rgba(255, 255, 255, 0.9);
  --ui-mac-solid-hover: rgba(255, 255, 255, 0.8);
  --ui-mac-on-solid: #1c1c1e;
  --ui-mac-accent: #4d8dff;
  --ui-mac-ok: #3ec27a;
  --ui-mac-ok-bg: rgba(62, 194, 122, 0.14);
  --ui-mac-shadow: 0 0 0 0.5px rgba(255, 255, 255, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.4);
  --ui-mac-shadow-pop: 0 0 0 0.5px rgba(255, 255, 255, 0.12), 0 12px 28px -10px rgba(0, 0, 0, 0.6);
  --ui-mac-focus: rgba(77, 141, 255, 0.5);
}
`;
const demoStyles =
  ".ma-demo{grid-template-columns:min(400px,100%);place-content:start center;width:100%;height:330px;font-family:Inter,ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,sans-serif;display:grid}.ma-demo__message{background:#f0f0f0;border-radius:20px;padding:4px}.ma-demo__card{color:#404040;background:#fff;border-radius:16px;padding:12px 14px 14px;font-size:13px;line-height:20px;box-shadow:0 0 0 1px #ececec,0 1px 2px #0000000a}.ma-demo__ask{color:#171717;background:#f4f4f5;border-radius:12px;width:fit-content;max-width:85%;margin:0 0 12px auto;padding:6px 10px}.ma-demo__who{color:#8f8f8f;align-items:center;gap:6px;margin-bottom:4px;font-size:12px;display:flex}.ma-demo__dot{background:#d97757;border-radius:3px;width:8px;height:8px}.ma-demo__answer{color:#171717;transition:opacity .3s}.ma-demo__answer[data-writing]{animation:1s ease-in-out infinite ma-demo-writing}@keyframes ma-demo-writing{50%{opacity:.4}}.ma-demo__tray{padding:0}.ma-demo__tray .ui-ma__bar{padding:4px 4px 4px 6px}.ma-demo__tray .ui-ma__panel{max-width:none;margin-top:2px}:where(.dark,[data-theme=dark]) .ma-demo__message{background:#111113}:where(.dark,[data-theme=dark]) .ma-demo__card{color:#c8c8cc;background:#19191b;box-shadow:0 0 0 1px #2a2a2e}:where(.dark,[data-theme=dark]) .ma-demo__ask{color:#ededed;background:#222225}:where(.dark,[data-theme=dark]) .ma-demo__answer{color:#ededed}:where(.dark,[data-theme=dark]) .ma-demo__who{color:#8b8b92}@media (prefers-reduced-motion:reduce){.ma-demo__answer[data-writing]{opacity:.5;animation:none}}.card__preview .ma-demo{grid-template-columns:auto;height:auto;position:absolute;inset:44px 0 0}.card__preview .ma-demo__message{zoom:.58;width:400px}.stage:has(.ma-demo){height:480px}@media (width<=760px){.ma-demo{height:auto;min-height:340px}.stage:has(.ma-demo){align-items:start;height:560px;padding:120px 16px 24px}}.mac-demo__card{color:#000000e0;background:#fff;border-radius:10px;font-size:13px;line-height:20px;box-shadow:0 0 0 .5px #0000000f,0 1px 1px -1px #0000001a,0 1px 2px #0000000d}.mac-demo__body{padding:16px 16px 14px}.mac-demo__ask{color:#000000e0;background:#00000008;border-radius:8px;width:fit-content;max-width:85%;margin:0 0 14px auto;padding:6px 10px;box-shadow:inset 0 0 0 .5px #0000000f}.mac-demo__who{color:#00000073;align-items:center;gap:6px;margin-bottom:4px;font-size:12px;line-height:16px;display:flex}.mac-demo__dot{background:#d97757;border-radius:2px;width:8px;height:8px}.mac-demo__answer{color:#000000e0;transition:opacity .3s}.mac-demo__answer[data-writing]{animation:1s ease-in-out infinite ma-demo-writing}.mac-demo__foot{border-top:.5px solid #0000000f;padding:8px}:where(.dark,[data-theme=dark]) .mac-demo__card{color:#ffffffe6;background:#1c1c1e;box-shadow:0 0 0 .5px #ffffff1a,0 1px 2px #0006}:where(.dark,[data-theme=dark]) .mac-demo__ask{color:#ffffffe6;background:#ffffff0a;box-shadow:inset 0 0 0 .5px #ffffff14}:where(.dark,[data-theme=dark]) .mac-demo__who{color:#ffffff75}:where(.dark,[data-theme=dark]) .mac-demo__answer{color:#ffffffe6}:where(.dark,[data-theme=dark]) .mac-demo__foot{border-top-color:#ffffff14}@media (prefers-reduced-motion:reduce){.mac-demo__answer[data-writing]{opacity:.5;animation:none}}.card__preview .mac-demo__card{zoom:.58;width:400px}\n";
function MessageActionsCleanDemo(props: Record<string, never>) {
  return (
    <>
      <style href="plico-demo-message-actions-clean" precedence="default">
        {demoStyles}
      </style>
      <MessageActionsCleanDemo2 {...props} />
    </>
  );
}
export { MessageActions as Component };
export { MessageActionsCleanDemo as Demo };
export { MessageActions };
export { MessageActions as MessageActionsClean };
export { MessageActionsCleanDemo };
export { MessageText };
export type { FeedbackKind };
export type { MessageActionKey };
export type { MessageActionsProps };
export default MessageActions;

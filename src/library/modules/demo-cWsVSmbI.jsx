"use client";

import * as React from "react";
import * as JSXRuntime from "react/jsx-runtime";
function TeamInviteComponent({ avatars: e, className: t, label: i }) {
  let s = `ui-ti` + React.useId().replace(/[^a-zA-Z0-9_-]/g, ``),
    [c, l, u] = e,
    d = e.map((e, t) => e.name ?? `Teammate ${t + 1}`);
  return (
    <div
      className={[`ui-ti`, t].filter(Boolean).join(` `)}
      role={`img`}
      aria-label={
        i ??
        `${d[0]} and ${d[1]} are connected; ${d[2]} is dragged into the empty slot and joins the team`
      }
    >
      <style href={`ui-team-invite`} precedence={`default`}>
        {o}
      </style>
      <svg className={`ui-ti-lines`} viewBox={`0 0 600 400`} aria-hidden={`true`}>
        <defs>
          <linearGradient id={`${s}-line`} x1={`0`} y1={`0`} x2={`1`} y2={`0`}>
            <stop offset={`0%`} className={`ui-ti-stop-a`} />
            <stop offset={`100%`} className={`ui-ti-stop-b`} />
          </linearGradient>
        </defs>
        <path
          className={`ui-ti-line`}
          d={`M162 159C214 159 222 105 258 105`}
          stroke={`url(#${s}-line)`}
        />
        <path className={`ui-ti-line ui-ti-line--dashed`} d={`M162 159C214 165 214 245 248 245`} />
        <path
          className={`ui-ti-line ui-ti-line--joined`}
          d={`M162 159C214 165 214 245 248 245`}
          pathLength={1}
          stroke={`url(#${s}-line)`}
        />
        <g className={`ui-ti-slot`}>
          <circle className={`ui-ti-line ui-ti-line--slot`} cx={`290`} cy={`245`} r={`40`} />
          <path className={`ui-ti-plus`} d={`M290 234v22M279 245h22`} />
        </g>
      </svg>
      <_View_a className={`ui-ti-node--a`} avatar={c} online={true} />
      <_View_a className={`ui-ti-node--b`} avatar={l} online={true} />
      <div className={`ui-ti-drag`} aria-hidden={`true`}>
        <_View_a className={`ui-ti-node--c`} avatar={u} online={true} />
        <svg
          className={`ui-ti-cursor`}
          viewBox={`-2.186 -0.256 18.514 22.277`}
          aria-hidden={`true`}
        >
          <path
            transform={`rotate(21.37)`}
            d={`M13.92 4.07c1.69.66 3.03 1.18 3.94 1.68.46.25.87.53 1.16.86.31.35.51.79.48 1.29-.03.51-.27.92-.62 1.23-.33.3-.77.53-1.25.74-.96.4-2.36.78-4.12 1.26-.56.15-.98.27-1.26.37-.26.1-.38.18-.47.27-.09.09-.17.21-.27.47-.1.28-.22.7-.37 1.26-.48 1.76-.86 3.16-1.26 4.12-.2.49-.44.93-.74 1.25-.32.35-.72.6-1.23.62-.51.03-.94-.17-1.29-.48-.33-.29-.61-.7-.86-1.16-.5-.91-1.02-2.25-1.68-3.94L1.66 7.76C.96 5.99.41 4.59.16 3.51-.09 2.44-.12 1.39.63.63 1.39-.12 2.44-.09 3.51.16c1.08.25 2.48.8 4.25 1.5l6.16 2.41Z`}
          />
        </svg>
      </div>
    </div>
  );
}
function _View_a({ avatar: e, online: t, className: n }) {
  return (
    <div className={`ui-ti-node ${n}`} aria-hidden={`true`}>
      <span className={`ui-ti-face`}>
        <img src={e.src} alt={``} draggable={false} />
      </span>
      {t && <span className={`ui-ti-dot`} />}
    </div>
  );
}
var o = `
.ui-ti {
  /* 1 unit of the 600 × 400 layout grid */
  --u: calc(100cqw / 600);
  --ui-ti-bubble: #ffffff;
  --ui-ti-bubble-ring: rgba(10, 10, 10, 0.06);
  --ui-ti-face: #eef0f4;
  /* Same gray as the lines in Outreach Branches */
  --ui-ti-line-a: #e4e7ec;
  --ui-ti-line-b: #e4e7ec;
  --ui-ti-dash: #e4e7ec;
  --ui-ti-plus: #c4c4c4;
  --ui-ti-online: #34c46a;
  /* Ring around the status dot: mostly white with a hint of the green, fully opaque */
  --ui-ti-dot-ring: #e2f6e9;
  --ui-ti-dot-edge: rgba(52, 196, 106, 0.1);
  --ui-ti-cursor: #141b34;
  --ui-ti-shadow: 0 calc(10 * var(--u)) calc(24 * var(--u)) rgba(0, 0, 0, 0.07), 0 calc(2 * var(--u)) calc(5 * var(--u)) rgba(0, 0, 0, 0.05);
  --ui-ti-lift: 0 calc(18 * var(--u)) calc(34 * var(--u)) rgba(0, 0, 0, 0.12), 0 calc(3 * var(--u)) calc(8 * var(--u)) rgba(0, 0, 0, 0.06);
  --ui-ti-loop: 4.4s;
  --ui-ti-ease: cubic-bezier(0.7, 0, 0.25, 1);
  position: relative;
  width: 100%;
  aspect-ratio: 3 / 2;
  overflow: hidden;
  container-type: inline-size;
}
.ui-ti *, .ui-ti *::before, .ui-ti *::after { box-sizing: border-box; }

.ui-ti-lines { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; }
.ui-ti-stop-a { stop-color: var(--ui-ti-line-a); }
.ui-ti-stop-b { stop-color: var(--ui-ti-line-b); }
.ui-ti-line { fill: none; stroke-width: 2.4; stroke-linecap: round; }
.ui-ti-line--dashed {
  stroke: var(--ui-ti-dash);
  stroke-dasharray: 6 7.23;
  animation: ui-ti-dashed var(--ui-ti-loop) linear infinite;
}
.ui-ti-line--slot {
  stroke: var(--ui-ti-dash);
  stroke-dasharray: 6 7.23;
}
.ui-ti-line--joined {
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
  animation: ui-ti-joined var(--ui-ti-loop) linear infinite;
}

/* ---------- Nodes ---------- */

.ui-ti-node {
  position: absolute;
  width: calc(84 * var(--u));
  height: calc(84 * var(--u));
  margin: calc(-42 * var(--u)) 0 0 calc(-42 * var(--u));
  padding: calc(5 * var(--u));
  border-radius: 50%;
  background: var(--ui-ti-bubble);
  box-shadow: inset 0 0 0 calc(1 * var(--u)) var(--ui-ti-bubble-ring), var(--ui-ti-shadow);
}
.ui-ti-node--a { left: calc(120 * var(--u)); top: calc(159 * var(--u)); }
.ui-ti-node--b { left: calc(300 * var(--u)); top: calc(105 * var(--u)); }
.ui-ti-face {
  display: block;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 50%;
  background: var(--ui-ti-face);
}
.ui-ti-face img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  user-select: none;
}
/* Status: a bright green dot in a thick, pale green ring with a faint 10% halo outside */
.ui-ti-dot {
  position: absolute;
  right: calc(1 * var(--u));
  bottom: calc(3 * var(--u));
  width: calc(24 * var(--u));
  height: calc(24 * var(--u));
  border: calc(7 * var(--u)) solid var(--ui-ti-dot-ring);
  border-radius: 50%;
  background: var(--ui-ti-online);
  box-shadow: 0 0 0 calc(2 * var(--u)) var(--ui-ti-dot-edge);
}

/* ---------- Empty slot ---------- */

.ui-ti-slot {
  transform-box: fill-box;
  transform-origin: center;
  animation: ui-ti-slot var(--ui-ti-loop) linear infinite;
}
.ui-ti-plus { fill: none; stroke: var(--ui-ti-plus); stroke-width: 1.8; stroke-linecap: round; }

/* ---------- The invite being dragged in ---------- */

/* Starts on the right and is carried to the slot (290, 245) */
.ui-ti-drag {
  position: absolute;
  left: calc(456 * var(--u));
  top: calc(281 * var(--u));
  animation: ui-ti-drag var(--ui-ti-loop) infinite;
}
.ui-ti-node--c {
  left: 0;
  top: 0;
  animation: ui-ti-lift var(--ui-ti-loop) infinite;
}
.ui-ti-node--c .ui-ti-dot { animation: ui-ti-online var(--ui-ti-loop) infinite; }
/* The pointer rests on the photo: its tip at (+16, +14) from the avatar's centre (the tip is 11.8% / 1.15% into the image) */
.ui-ti-cursor {
  position: absolute;
  left: calc(11.28 * var(--u));
  top: calc(13.45 * var(--u));
  width: calc(40 * var(--u));
  height: calc(48.13 * var(--u));
  overflow: visible;
  transform-origin: calc(4.72 * var(--u)) calc(0.55 * var(--u));
  filter: drop-shadow(0 calc(3 * var(--u)) calc(7 * var(--u)) rgba(0, 0, 0, 0.16));
  animation: ui-ti-cursor var(--ui-ti-loop) infinite;
}
.ui-ti-cursor path {
  fill: var(--ui-ti-cursor);
  stroke: #fff;
  stroke-width: 1.7;
  stroke-linejoin: round;
  paint-order: stroke;
}

/*
 * One loop:
 *   (4.4 s)
 *   0–12%   rest on the right          12–16% pick up (lift)
 *   16–42%  carried to the slot        42–48% drop, settle
 *   48–54%  line draws solid, dot pops 54–62% cursor lets go and drifts off
 *   62–88%  hold the finished team     88–100% fade back to the start
 */
@keyframes ui-ti-drag {
  0%, 16% { transform: translate(0, 0); opacity: 1; animation-timing-function: var(--ui-ti-ease); }
  42%, 88% { transform: translate(calc(-166 * var(--u)), calc(-36 * var(--u))); opacity: 1; }
  94% { transform: translate(calc(-166 * var(--u)), calc(-36 * var(--u))); opacity: 0; }
  95% { transform: translate(0, 0); opacity: 0; }
  100% { transform: translate(0, 0); opacity: 1; }
}
@keyframes ui-ti-lift {
  0%, 12% { transform: scale(1); box-shadow: inset 0 0 0 calc(1 * var(--u)) var(--ui-ti-bubble-ring), var(--ui-ti-shadow); animation-timing-function: var(--ui-ti-ease); }
  16%, 40% { transform: scale(1.07); box-shadow: inset 0 0 0 calc(1 * var(--u)) var(--ui-ti-bubble-ring), var(--ui-ti-lift); animation-timing-function: var(--ui-ti-ease); }
  46%, 100% { transform: scale(1); box-shadow: inset 0 0 0 calc(1 * var(--u)) var(--ui-ti-bubble-ring), var(--ui-ti-shadow); }
}
@keyframes ui-ti-online {
  0%, 48% { transform: scale(0); }
  52% { transform: scale(1.25); }
  56%, 100% { transform: scale(1); }
}
@keyframes ui-ti-cursor {
  0%, 11% { transform: translate(0, 0) scale(1); opacity: 1; animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1); }
  14%, 42% { transform: translate(0, 0) scale(0.86); opacity: 1; animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1); }
  47% { transform: translate(0, 0) scale(1); opacity: 1; animation-timing-function: var(--ui-ti-ease); }
  62%, 88% { transform: translate(calc(70 * var(--u)), calc(44 * var(--u))) scale(1); opacity: 0; }
  95% { transform: translate(calc(20 * var(--u)), calc(14 * var(--u))) scale(1); opacity: 0; }
  100% { transform: translate(0, 0) scale(1); opacity: 1; }
}
@keyframes ui-ti-slot {
  0%, 30% { opacity: 1; transform: scale(1); animation-timing-function: var(--ui-ti-ease); }
  42%, 90% { opacity: 0; transform: scale(1.12); }
  100% { opacity: 1; transform: scale(1); }
}
@keyframes ui-ti-dashed {
  0%, 46% { opacity: 1; }
  50%, 92% { opacity: 0; }
  100% { opacity: 1; }
}
@keyframes ui-ti-joined {
  0%, 44% { stroke-dashoffset: 1; opacity: 1; }
  54%, 88% { stroke-dashoffset: 0; opacity: 1; }
  94%, 100% { stroke-dashoffset: 0; opacity: 0; }
}

/* Reduced motion: a still frame of the waiting state */
@media (prefers-reduced-motion: reduce) {
  .ui-ti-drag, .ui-ti-node--c, .ui-ti-node--c .ui-ti-dot, .ui-ti-cursor, .ui-ti-slot,
  .ui-ti-line--dashed, .ui-ti-line--joined { animation: none; }
  .ui-ti-node--c .ui-ti-dot { transform: scale(0); }
}

/* Dark mode: follows a .dark class or data-theme="dark" on any ancestor, e.g. <html> */
:where(.dark, [data-theme="dark"]) .ui-ti {
  --ui-ti-bubble: #232326;
  --ui-ti-bubble-ring: rgba(255, 255, 255, 0.08);
  --ui-ti-face: #2e2e33;
  --ui-ti-line-a: rgba(255, 255, 255, 0.14);
  --ui-ti-line-b: rgba(255, 255, 255, 0.14);
  --ui-ti-dash: rgba(255, 255, 255, 0.14);
  --ui-ti-plus: #5c5c61;
  --ui-ti-online: #3fd17a;
  --ui-ti-dot-ring: #24392c;
  --ui-ti-dot-edge: rgba(63, 209, 122, 0.12);
  --ui-ti-shadow: 0 calc(10 * var(--u)) calc(24 * var(--u)) rgba(0, 0, 0, 0.4), 0 calc(2 * var(--u)) calc(5 * var(--u)) rgba(0, 0, 0, 0.3);
  --ui-ti-lift: 0 calc(18 * var(--u)) calc(34 * var(--u)) rgba(0, 0, 0, 0.5), 0 calc(3 * var(--u)) calc(8 * var(--u)) rgba(0, 0, 0, 0.3);
}
`;
function TeamInviteDemo() {
  return (
    <div className={`team-invite-demo`}>
      <TeamInviteComponent
        avatars={[
          {
            src: `data:image/jpeg;base64,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`,
            name: `Mara`,
          },
          {
            src: `data:image/jpeg;base64,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`,
            name: `Jonas`,
          },
          {
            src: `data:image/jpeg;base64,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`,
            name: `Sofia`,
          },
        ]}
      />
    </div>
  );
}
export default TeamInviteDemo;
export { TeamInviteComponent as PlicoCore_i };
export { TeamInviteDemo as PlicoDemo_s };

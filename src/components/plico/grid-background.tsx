"use client";

import * as React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import type { CSSProperties } from "react";
import type { ReactNode } from "react";
function GridBackgroundDemo2() {
  return (
    <div className={`grid-background-demo`}>
      <GridBackground className={`grid-background-demo__panel`}>
        <div className={`grid-background-demo__inner`}>
          <span className={`grid-background-demo__pill`}>{`New`}</span>
          <h3 className={`grid-background-demo__title`}>{`Build on a steady grid`}</h3>
          <p
            className={`grid-background-demo__sub`}
          >{`A quiet backdrop that keeps moving, so your hero never feels static.`}</p>
        </div>
      </GridBackground>
    </div>
  );
}
type GridDirection = "up" | "down" | "left" | "right" | "diagonal";
type GridBackgroundProps = {
  children?: ReactNode;
  size?: number;
  color?: string;
  speed?: number;
  direction?: GridDirection;
  reveal?: boolean;
  fade?: number;
  className?: string;
};
const offsets: Record<GridDirection, [number, number]> = {
  up: [0, -1],
  down: [0, 1],
  left: [-1, 0],
  right: [1, 0],
  diagonal: [-1, 1],
};
function GridBackground({
  children,
  size = 48,
  color,
  speed = 3,
  direction = "diagonal",
  reveal = true,
  fade = 70,
  className,
}: GridBackgroundProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(!reveal);
  useEffect(() => {
    if (!reveal) return setShown(true);
    const el = ref.current;
    if (
      !el ||
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true);
          io.disconnect();
        }
      },
      {
        threshold: 0.2,
      },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reveal]);
  const [dx, dy] = offsets[direction] ?? offsets.diagonal;
  const style = {
    "--ui-gb-size": `${size}px`,
    "--ui-gb-dx": `${dx * size}px`,
    "--ui-gb-dy": `${dy * size}px`,
    "--ui-gb-speed": `${Math.max(speed, 0)}s`,
    "--ui-gb-fade": `${fade}%`,
    ...(color
      ? {
          "--ui-gb-line": color,
        }
      : {}),
  } as CSSProperties;
  return (
    <div
      ref={ref}
      className={["ui-gb", className].filter(Boolean).join(" ")}
      style={style}
      data-reveal={reveal ? "" : undefined}
      data-shown={shown ? "" : undefined}
      data-static={speed > 0 ? undefined : ""}
    >
      {}
      <style href="ui-grid-background" precedence="default">
        {css}
      </style>
      <div className="ui-gb-grid" aria-hidden="true">
        <div className="ui-gb-reveal">
          <div className="ui-gb-lines" />
        </div>
      </div>
      <div className="ui-gb-content">{children}</div>
    </div>
  );
}
const css = `
@property --ui-gb-r {
  syntax: "<percentage>";
  inherits: false;
  initial-value: 0%;
}

.ui-gb {
  --ui-gb-color: rgba(0, 0, 0, 0.07);
  --ui-gb-ease: cubic-bezier(0.22, 1, 0.36, 1);
  position: relative;
  isolation: isolate;
  overflow: hidden;
}

/* Edge fade: a still radial mask, so the drifting lines dissolve towards the sides */
.ui-gb-grid {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  -webkit-mask-image: radial-gradient(ellipse at center, #000 20%, transparent var(--ui-gb-fade));
  mask-image: radial-gradient(ellipse at center, #000 20%, transparent var(--ui-gb-fade));
}

/* Reveal: a circle from the center grows until it reaches the corners */
.ui-gb-reveal {
  position: absolute;
  inset: 0;
  overflow: hidden;
}
.ui-gb[data-reveal] .ui-gb-reveal {
  --ui-gb-r: 0%;
  -webkit-mask-image: radial-gradient(circle farthest-corner at center, #000 var(--ui-gb-r), transparent calc(var(--ui-gb-r) + 12%));
  mask-image: radial-gradient(circle farthest-corner at center, #000 var(--ui-gb-r), transparent calc(var(--ui-gb-r) + 12%));
}
.ui-gb[data-reveal][data-shown] .ui-gb-reveal {
  animation: ui-gb-reveal 1.6s var(--ui-gb-ease) forwards;
}

/* The lines: one cell larger on every side, so a shift by one cell loops seamlessly */
.ui-gb-lines {
  position: absolute;
  inset: calc(var(--ui-gb-size) * -1);
  background-image:
    linear-gradient(to right, var(--ui-gb-line, var(--ui-gb-color)) 1px, transparent 1px),
    linear-gradient(to bottom, var(--ui-gb-line, var(--ui-gb-color)) 1px, transparent 1px);
  background-size: var(--ui-gb-size) var(--ui-gb-size);
  animation: ui-gb-drift var(--ui-gb-speed) linear infinite;
}
.ui-gb[data-static] .ui-gb-lines {
  animation: none;
}

.ui-gb-content {
  position: relative;
  z-index: 1;
  height: 100%;
}

@keyframes ui-gb-drift {
  from { transform: translate3d(0, 0, 0); }
  to { transform: translate3d(var(--ui-gb-dx), var(--ui-gb-dy), 0); }
}
@keyframes ui-gb-reveal {
  from { --ui-gb-r: 0%; }
  to { --ui-gb-r: 100%; }
}

@media (prefers-reduced-motion: reduce) {
  .ui-gb-lines { animation: none; }
  .ui-gb[data-reveal] .ui-gb-reveal { -webkit-mask-image: none; mask-image: none; animation: none; }
}

/* Dark mode: follows a .dark class or data-theme="dark" on any ancestor, e.g. <html> */
:where(.dark, [data-theme="dark"]) .ui-gb {
  --ui-gb-color: rgba(255, 255, 255, 0.07);
}
`;
const demoStyles =
  ".grid-background-demo{-webkit-font-smoothing:antialiased;width:100%;font-family:Inter,ui-sans-serif,system-ui,-apple-system,sans-serif}.grid-background-demo__panel{background:#fff;border-radius:20px;height:360px;box-shadow:inset 0 0 0 1px #e5e5e5,0 1px 2px #0000000a}.grid-background-demo__inner{text-align:center;flex-direction:column;justify-content:center;align-items:center;height:100%;padding:24px;display:flex}.grid-background-demo__pill{color:#171717;background:#fff;border-radius:999px;padding:4px 11px;font-size:12px;font-weight:500;line-height:16px;box-shadow:inset 0 0 0 1px #e5e5e5,0 1px 2px #0000000a}.grid-background-demo__title{letter-spacing:-.03em;color:#171717;text-wrap:balance;margin:16px 0 0;font-size:32px;font-weight:600;line-height:1.15}.grid-background-demo__sub{color:#8f8f8f;text-wrap:balance;max-width:340px;margin:10px 0 0;font-size:15px;line-height:1.5}@media (width<=520px){.grid-background-demo__title{font-size:26px}}.card__preview .grid-background-demo{position:absolute;inset:0}.card__preview .grid-background-demo__panel{height:100%;box-shadow:none;background:0 0;border-radius:0}.card__preview .grid-background-demo__inner{zoom:.78}:where(.dark,[data-theme=dark]) .grid-background-demo__panel{background:#1a1a1c;box-shadow:inset 0 0 0 1px #ffffff14}:where(.dark,[data-theme=dark]) .card__preview .grid-background-demo__panel{box-shadow:none;background:0 0}:where(.dark,[data-theme=dark]) .grid-background-demo__pill{color:#ededed;background:#232326;box-shadow:inset 0 0 0 1px #ffffff14}:where(.dark,[data-theme=dark]) .grid-background-demo__title{color:#ededed}\n";
function GridBackgroundDemo(props: Record<string, never>) {
  return (
    <>
      <style href="plico-demo-grid-background" precedence="default">
        {demoStyles}
      </style>
      <GridBackgroundDemo2 {...props} />
    </>
  );
}
export { GridBackground as Component };
export { GridBackgroundDemo as Demo };
export { GridBackground };
export { GridBackgroundDemo };
export type { GridBackgroundProps };
export type { GridDirection };
export default GridBackground;

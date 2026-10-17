"use client";

import * as React from "react";
import type { CSSProperties } from "react";
import type { ReactNode } from "react";
var Icona = () => (
  <style href={`ui-shimmer-loader`} precedence={`default`}>
    {valueValue2}
  </style>
);
function ShimmerLoaderComponent({
  children: children,
  duration = 2,
  className: className,
}: ShimmerTextProps) {
  return (
    <>
      <Icona />
      <span
        className={[`ui-shm-text`, className].filter(Boolean).join(` `)}
        style={
          {
            "--ui-shm-text-dur": `${duration}s`,
          } as React.CSSProperties
        }
      >
        {children}
      </span>
    </>
  );
}
var valueValue2 = `
.ui-shm,
.ui-shm-text {
  --ui-shm-base: #ececec;
  --ui-shm-glow: rgba(255, 255, 255, 0.9);
  --ui-shm-text: #a3a3a3;
  --ui-shm-text-glow: #ffffff;
  --ui-shm-dur: 2.2s;
}

/* Skeleton: one fixed gradient for the whole viewport, so all blocks sweep together */
.ui-shm {
  display: block;
  flex: none;
  width: 100%;
  height: 12px;
  max-width: 100%;
  border-radius: 6px;
  background-color: var(--ui-shm-base);
  background-image: linear-gradient(
    100deg,
    transparent 0%,
    transparent 30%,
    var(--ui-shm-glow) 50%,
    transparent 70%,
    transparent 100%
  );
  background-size: 150vw 100%;
  background-repeat: repeat-x;
  background-attachment: fixed;
  animation: ui-shm-sweep var(--ui-shm-dur) linear infinite;
}
@keyframes ui-shm-sweep {
  from { background-position: -50vw 0; }
  to { background-position: 100vw 0; }
}

/* Text: a highlight band runs through the letters */
.ui-shm-text {
  display: inline-block;
  color: var(--ui-shm-text);
  background-image: linear-gradient(
    90deg,
    var(--ui-shm-text) 0%,
    var(--ui-shm-text) 40%,
    var(--ui-shm-text-glow) 50%,
    var(--ui-shm-text) 60%,
    var(--ui-shm-text) 100%
  );
  background-size: 300% 100%;
  background-position: 100% 0;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ui-shm-text var(--ui-shm-text-dur, 2s) linear infinite;
}
@keyframes ui-shm-text {
  from { background-position: 100% 0; }
  to { background-position: 0% 0; }
}

@media (prefers-reduced-motion: reduce) {
  .ui-shm { animation: none; background-image: none; }
  .ui-shm-text { animation: none; background-image: none; -webkit-text-fill-color: currentColor; }
}

/* Dark mode: follows a .dark class or data-theme="dark" on any ancestor, e.g. <html> */
:where(.dark, [data-theme="dark"]) .ui-shm,
:where(.dark, [data-theme="dark"]) .ui-shm-text {
  --ui-shm-base: #2f2f33;
  --ui-shm-glow: rgba(255, 255, 255, 0.08);
  --ui-shm-text: #6e6e73;
  --ui-shm-text-glow: #f5f5f5;
}
`;
var valueValue3 = [`#ffd6a8, #ff9f6b`, `#c7d7ff, #8aa7ff`, `#cdeccf, #7fcf9a`];
function ShimmerLoaderDemo2() {
  let [e, t] = React.useState(true),
    [i, a] = React.useState(0);
  return (
    React.useEffect(() => {
      let n = setTimeout(() => t((e) => !e), e ? 2500 : 3200);
      return () => clearTimeout(n);
    }, [e, i]),
    (
      <div className={`shimmer-loader-demo`}>
        <div className={`shd-top`}>
          <ShimmerLoaderComponent
            className={`shd-label`}
          >{`Generating summary…`}</ShimmerLoaderComponent>
          <button
            type={`button`}
            className={`shd-btn`}
            onClick={() => {
              (t(true), a((e) => e + 1));
            }}
          >{`Reload`}</button>
        </div>
        <div className={`shd-card`} aria-busy={e}>
          {e ? (
            <>
              <div className={`shd-row`}>
                <ShimmerLoader circle={true} width={36} />
                <div className={`shd-meta`}>
                  <ShimmerLoader width={96} height={10} radius={5} />
                  <ShimmerLoader width={64} height={8} radius={4} />
                </div>
              </div>
              <div className={`shd-lines`}>
                <ShimmerLoader height={10} radius={5} />
                <ShimmerLoader width={`72%`} height={10} radius={5} />
              </div>
              <div className={`shd-tiles`}>
                {valueValue3.map((e) => (
                  <ShimmerLoader height={56} radius={10} key={e} />
                ))}
              </div>
            </>
          ) : (
            <div className={`shd-loaded`}>
              <div className={`shd-row`}>
                <span className={`shd-avatar`}>{`MC`}</span>
                <div className={`shd-meta`}>
                  <span className={`shd-name`}>{`Maya Chen`}</span>
                  <span className={`shd-sub`}>{`Product design · 2h`}</span>
                </div>
              </div>
              <p
                className={`shd-text`}
              >{`New onboarding flow is live – activation is up 18% in the first week.`}</p>
              <div className={`shd-tiles`}>
                {valueValue3.map((e) => (
                  <span
                    className={`shd-tile`}
                    style={{
                      background: `linear-gradient(135deg, ${e})`,
                    }}
                    key={e}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    )
  );
}
type SkeletonProps = {
  width?: number | string;
  height?: number | string;
  radius?: number | string;
  circle?: boolean;
  className?: string;
  style?: CSSProperties;
};
type ShimmerTextProps = {
  children: ReactNode;
  duration?: number;
  className?: string;
};
const len = (v: number | string | undefined) => (typeof v === "number" ? `${v}px` : v);
const Style = () => (
  <style href="ui-shimmer-loader" precedence="default">
    {css}
  </style>
);
function ShimmerLoader({ width, height, radius, circle, className, style }: SkeletonProps) {
  const w = len(width);
  return (
    <>
      <Style />
      <span
        className={["ui-shm", className].filter(Boolean).join(" ")}
        aria-hidden="true"
        style={{
          width: w,
          height: circle ? (w ?? len(height)) : len(height),
          borderRadius: circle ? "50%" : len(radius),
          ...style,
        }}
      />
    </>
  );
}
function ShimmerText({ children, duration = 2, className }: ShimmerTextProps) {
  return (
    <>
      <Style />
      <span
        className={["ui-shm-text", className].filter(Boolean).join(" ")}
        style={
          {
            "--ui-shm-text-dur": `${duration}s`,
          } as CSSProperties
        }
      >
        {children}
      </span>
    </>
  );
}
const css = `
.ui-shm,
.ui-shm-text {
  --ui-shm-base: #ececec;
  --ui-shm-glow: rgba(255, 255, 255, 0.9);
  --ui-shm-text: #a3a3a3;
  --ui-shm-text-glow: #ffffff;
  --ui-shm-dur: 2.2s;
}

/* Skeleton: one fixed gradient for the whole viewport, so all blocks sweep together */
.ui-shm {
  display: block;
  flex: none;
  width: 100%;
  height: 12px;
  max-width: 100%;
  border-radius: 6px;
  background-color: var(--ui-shm-base);
  background-image: linear-gradient(
    100deg,
    transparent 0%,
    transparent 30%,
    var(--ui-shm-glow) 50%,
    transparent 70%,
    transparent 100%
  );
  background-size: 150vw 100%;
  background-repeat: repeat-x;
  background-attachment: fixed;
  animation: ui-shm-sweep var(--ui-shm-dur) linear infinite;
}
@keyframes ui-shm-sweep {
  from { background-position: -50vw 0; }
  to { background-position: 100vw 0; }
}

/* Text: a highlight band runs through the letters */
.ui-shm-text {
  display: inline-block;
  color: var(--ui-shm-text);
  background-image: linear-gradient(
    90deg,
    var(--ui-shm-text) 0%,
    var(--ui-shm-text) 40%,
    var(--ui-shm-text-glow) 50%,
    var(--ui-shm-text) 60%,
    var(--ui-shm-text) 100%
  );
  background-size: 300% 100%;
  background-position: 100% 0;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ui-shm-text var(--ui-shm-text-dur, 2s) linear infinite;
}
@keyframes ui-shm-text {
  from { background-position: 100% 0; }
  to { background-position: 0% 0; }
}

@media (prefers-reduced-motion: reduce) {
  .ui-shm { animation: none; background-image: none; }
  .ui-shm-text { animation: none; background-image: none; -webkit-text-fill-color: currentColor; }
}

/* Dark mode: follows a .dark class or data-theme="dark" on any ancestor, e.g. <html> */
:where(.dark, [data-theme="dark"]) .ui-shm,
:where(.dark, [data-theme="dark"]) .ui-shm-text {
  --ui-shm-base: #2f2f33;
  --ui-shm-glow: rgba(255, 255, 255, 0.08);
  --ui-shm-text: #6e6e73;
  --ui-shm-text-glow: #f5f5f5;
}
`;
const demoStyles =
  ".shimmer-loader-demo{-webkit-font-smoothing:antialiased;color:#171717;justify-items:center;gap:14px;width:min(100%,320px);font-family:Inter,ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,sans-serif;display:grid}.shd-top{justify-content:space-between;align-items:center;gap:12px;width:100%;padding:0 2px;display:flex}.shd-label{font-size:14px;font-weight:500;line-height:20px}.shd-btn{color:#171717;height:30px;font:inherit;cursor:pointer;background:#fff;border:0;border-radius:9px;flex:none;margin:0;padding:0 12px;font-size:12.5px;font-weight:500;transition:background-color .15s;box-shadow:0 0 0 1px #e5e5e5}.shd-btn:hover{background:#f7f7f7}.shd-btn:focus-visible{outline-offset:2px;outline:2px solid #2f6bff}.shd-card{background:#fff;border:1px solid #e5e5e5;border-radius:16px;gap:14px;width:100%;padding:16px;display:grid;box-shadow:0 1px 2px #0000000f}.shd-loaded{gap:14px;animation:.4s cubic-bezier(.22,1,.36,1) both shd-in;display:grid}@keyframes shd-in{0%{opacity:0}}.shd-row{align-items:center;gap:10px;height:36px;display:flex}.shd-meta{gap:6px;display:grid}.shd-avatar{color:#fff;background:linear-gradient(135deg,#a5b4fc,#6366f1);border-radius:50%;place-items:center;width:36px;height:36px;font-size:12px;font-weight:600;display:grid}.shd-name{font-size:13px;font-weight:600;line-height:14px}.shd-sub{color:#8f8f8f;font-size:11.5px;line-height:12px}.shd-lines{gap:10px;padding:4px 0;display:grid}.shd-text{color:#404040;text-wrap:pretty;margin:0;font-size:13px;line-height:18px}.shd-tiles{grid-template-columns:repeat(3,1fr);gap:8px;display:grid}.shd-tile{border-radius:10px;height:56px}:where(.dark,[data-theme=dark]) .shimmer-loader-demo{color:#ededed}:where(.dark,[data-theme=dark]) .shd-card{background:#232326;border-color:#ffffff14}:where(.dark,[data-theme=dark]) .shd-text{color:#c4c4c4}:where(.dark,[data-theme=dark]) .shd-btn{color:#ededed;background:#2c2c30;box-shadow:0 0 0 1px #ffffff1a}:where(.dark,[data-theme=dark]) .shd-btn:hover{background:#343439}:where(.dark,[data-theme=dark]) .shd-tile{opacity:.85}@media (prefers-reduced-motion:reduce){.shd-loaded{animation:none}}.card__preview .shimmer-loader-demo{zoom:.72}\n";
function ShimmerLoaderDemo(props: Record<string, never>) {
  return (
    <>
      <style href="plico-demo-shimmer-loader" precedence="default">
        {demoStyles}
      </style>
      <ShimmerLoaderDemo2 {...props} />
    </>
  );
}
export { ShimmerLoader as Component };
export { ShimmerLoaderDemo as Demo };
export { ShimmerLoader };
export { ShimmerLoaderDemo };
export { ShimmerText };
export { ShimmerLoader as Skeleton };
export type { ShimmerTextProps };
export type { SkeletonProps };
export default ShimmerLoader;

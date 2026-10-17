"use client";

import * as React from "react";
import * as JSXRuntime from "react/jsx-runtime";
var i = (e) => (typeof e == `number` ? `${e}px` : e);
var _View_a = () => (
  <style href={`ui-shimmer-loader`} precedence={`default`}>
    {c}
  </style>
);
function _View_o({ width: e, height: t, radius: n, circle: o, className: s, style: c }) {
  let l = i(e);
  return (
    <>
      <_View_a />
      <span
        className={[`ui-shm`, s].filter(Boolean).join(` `)}
        aria-hidden={`true`}
        style={{
          width: l,
          height: o ? (l ?? i(t)) : i(t),
          borderRadius: o ? `50%` : i(n),
          ...c,
        }}
      />
    </>
  );
}
function ShimmerLoaderComponent({ children: e, duration: t = 2, className: n }) {
  return (
    <>
      <_View_a />
      <span
        className={[`ui-shm-text`, n].filter(Boolean).join(` `)}
        style={{
          "--ui-shm-text-dur": `${t}s`,
        }}
      >
        {e}
      </span>
    </>
  );
}
var c = `
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
var l = [`#ffd6a8, #ff9f6b`, `#c7d7ff, #8aa7ff`, `#cdeccf, #7fcf9a`];
function ShimmerLoaderDemo() {
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
                <_View_o circle={true} width={36} />
                <div className={`shd-meta`}>
                  <_View_o width={96} height={10} radius={5} />
                  <_View_o width={64} height={8} radius={4} />
                </div>
              </div>
              <div className={`shd-lines`}>
                <_View_o height={10} radius={5} />
                <_View_o width={`72%`} height={10} radius={5} />
              </div>
              <div className={`shd-tiles`}>
                {l.map((e) => (
                  <_View_o height={56} radius={10} key={e} />
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
                {l.map((e) => (
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
export default ShimmerLoaderDemo;
export { ShimmerLoaderComponent as PlicoCore_s };
export { ShimmerLoaderDemo as PlicoDemo_u };

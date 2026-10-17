"use client";

import * as React from "react";
import * as JSXRuntime from "react/jsx-runtime";
var colorGeometry = {
  k: 1,
  v1: [926.8, 565.8],
  c: [302.1, 297.3],
  l: [291.3, 291.3],
  bottom: 1222.8,
  r: [3155.8, 361.3],
  v4: [2493.8, 565.8],
  v3: [2189.3, 565.8],
  m2: [1898.8, 428.8],
  m1: [1510.8, 428.8],
  v2: [1230.8, 565.8],
};
var lightGeometry = {
  k: 0.8427,
  v1: [781.039, 476.815],
  c: [254.588, 250.543],
  l: [245.486, 245.486],
  bottom: 1030.49,
  r: [2659.48, 304.477],
  v4: [2101.59, 476.815],
  v3: [1844.98, 476.815],
  m2: [1600.17, 361.361],
  m1: [1273.19, 361.361],
  v2: [1037.23, 476.815],
};
var horizontalAmplitude = 110;
var verticalAmplitude = 80;
function buildFloorPath(geometry, phase) {
  let offsets = {
      l: horizontalAmplitude * Math.sin(phase),
      m: -110 * Math.sin(phase + 0.5),
      r: horizontalAmplitude * Math.sin(phase + 1),
      vL: verticalAmplitude * Math.sin(phase + Math.PI / 2 + 0.25),
      vR: verticalAmplitude * Math.sin(phase - Math.PI / 2 + 0.75),
    },
    ordinate = (point, offset) => (point[1] + offset * geometry.k).toFixed(1);
  return `M${geometry.v1[0]} ${ordinate(geometry.v1, offsets.vL)}C${geometry.v1[0]} ${ordinate(geometry.v1, offsets.vL)} ${geometry.c[0]} ${ordinate(geometry.c, offsets.l)} ${geometry.l[0]} ${ordinate(geometry.l, offsets.l)}V${geometry.bottom}H${geometry.r[0]}V${ordinate(geometry.r, offsets.r)}L${geometry.v4[0]} ${ordinate(geometry.v4, offsets.vR)}H${geometry.v3[0]}V${ordinate(geometry.v3, offsets.vR)}L${geometry.m2[0]} ${ordinate(geometry.m2, offsets.m)}H${geometry.m1[0]}V${ordinate(geometry.m1, offsets.m)}L${geometry.v2[0]} ${ordinate(geometry.v2, offsets.vL)}H${geometry.v1[0]}V${ordinate(geometry.v1, offsets.vL)}Z`;
}
function GradientFloor({
  children: children,
  colors = [`#FF7700`, `#FF0055`, `#0073FF`],
  speed = 3,
  className: className,
}) {
  let gradientId = `ui-gf` + React.useId().replace(/[^a-zA-Z0-9_-]/g, ``),
    rootRef = React.useRef(null),
    colorPathRef = React.useRef(null),
    lightPathRef = React.useRef(null);
  return (
    React.useEffect(() => {
      let e = rootRef.current;
      if (!e) return;
      let t = speed > 0 && !window.matchMedia(`(prefers-reduced-motion: reduce)`).matches,
        n = 0,
        r = 0,
        s = (e) => {
          if (((n = requestAnimationFrame(s)), e - r < 32)) return;
          r = e;
          let t = (e / (speed * 1e3)) * Math.PI * 2;
          (colorPathRef.current?.setAttribute(`d`, buildFloorPath(colorGeometry, t)),
            lightPathRef.current?.setAttribute(`d`, buildFloorPath(lightGeometry, t)));
        };
      if (typeof IntersectionObserver > `u`)
        return (t && (n = requestAnimationFrame(s)), () => cancelAnimationFrame(n));
      let l = new IntersectionObserver(([r]) => {
        (cancelAnimationFrame(n),
          e.toggleAttribute(`data-paused`, !r.isIntersecting),
          r.isIntersecting && t && (n = requestAnimationFrame(s)));
      });
      return (
        l.observe(e),
        () => {
          (l.disconnect(), cancelAnimationFrame(n));
        }
      );
    }, [speed]),
    (
      <div ref={rootRef} className={[`ui-gf`, className].filter(Boolean).join(` `)}>
        <style href={`ui-gradient-floor`} precedence={`default`}>
          {gradientFloorStyles}
        </style>
        <div className={`ui-gf-layer ui-gf-layer--color`} aria-hidden={`true`}>
          <div className={`ui-gf-bleed`}>
            <svg viewBox={`0 0 3447.1 1514.1`} preserveAspectRatio={`none`}>
              <defs>
                <linearGradient
                  id={`${gradientId}-fill`}
                  x1={`1723.8`}
                  y1={`423.3`}
                  x2={`1723.8`}
                  y2={`894.3`}
                  gradientUnits={`userSpaceOnUse`}
                >
                  <stop stopColor={colors[0]} />
                  <stop offset={`0.302885`} stopColor={colors[1]} />
                  <stop offset={`0.673077`} stopColor={colors[2]} />
                </linearGradient>
              </defs>
              <path
                ref={colorPathRef}
                d={buildFloorPath(colorGeometry, 0)}
                fill={`url(#${gradientId}-fill)`}
              />
            </svg>
          </div>
        </div>
        <div className={`ui-gf-layer ui-gf-layer--light`} aria-hidden={`true`}>
          <div className={`ui-gf-bleed`}>
            <svg viewBox={`0 0 2904.96 1275.97`} preserveAspectRatio={`none`}>
              <path
                ref={lightPathRef}
                d={buildFloorPath(lightGeometry, 0)}
                fill={`#fff`}
                fillOpacity={`0.8`}
              />
            </svg>
          </div>
        </div>
        {children != null && <div className={`ui-gf-content`}>{children}</div>}
      </div>
    )
  );
}
var containerWidthUnit = (value) => `calc(${value} * 100cqw / 2200)`;
var gradientFloorStyles = `
.ui-gf {
  position: relative;
  container-type: inline-size;
  overflow: hidden;
  /* Its own group, so plus-lighter only lightens the floor and the background below it */
  isolation: isolate;
  background: var(--ui-gf-bg, #fafafa);
}
.ui-gf-layer { position: absolute; pointer-events: none; }
/* Anchored to the bottom edge */
.ui-gf-layer--color { left: ${containerWidthUnit(-290)}; bottom: ${containerWidthUnit(-484.5)}; width: ${containerWidthUnit(2864.5)}; height: ${containerWidthUnit(931.5)}; }
.ui-gf-layer--light { left: ${containerWidthUnit(-65)}; bottom: ${containerWidthUnit(-507)}; width: ${containerWidthUnit(2414)}; height: ${containerWidthUnit(785)}; mix-blend-mode: plus-lighter; }
.ui-gf-bleed { position: absolute; inset: -31.27% -10.17%; transform-origin: 50% 70%; will-change: transform; }
/* The floor is so soft that it can be drawn at a quarter of its size and scaled up 4× on the GPU –
   it looks the same, but every redraw of the moving shapes costs about a sixteenth */
.ui-gf-bleed svg {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 25%;
  height: 25%;
  overflow: visible;
  transform: scale(4);
  transform-origin: 0 0;
  will-change: transform;
}
.ui-gf-layer--color svg { filter: blur(calc(${containerWidthUnit(145.65)} / 4)); }
.ui-gf-layer--light svg { filter: blur(calc(${containerWidthUnit(122.74)} / 4)); }
/* Both layers drift on the same beat; the light one moves a little less */
.ui-gf-layer--color .ui-gf-bleed { animation: ui-gf-drift-color 2.5s ease-in-out infinite; }
.ui-gf-layer--light .ui-gf-bleed { animation: ui-gf-drift-light 2.5s ease-in-out infinite; }
@keyframes ui-gf-drift-color {
  0%, 100% { transform: translate(0, 0) scale(1, 1); }
  33% { transform: translate(${containerWidthUnit(-120)}, ${containerWidthUnit(-20)}) scale(1.05, 1.08); }
  66% { transform: translate(${containerWidthUnit(100)}, ${containerWidthUnit(12)}) scale(0.98, 0.96); }
}
@keyframes ui-gf-drift-light {
  0%, 100% { transform: translate(0, 0) scale(1, 1); }
  33% { transform: translate(${containerWidthUnit(-100)}, ${containerWidthUnit(-10)}) scale(1.03, 1); }
  66% { transform: translate(${containerWidthUnit(85)}, ${containerWidthUnit(10)}) scale(0.98, 0.94); }
}
.ui-gf[data-paused] .ui-gf-bleed { animation-play-state: paused; }
.ui-gf-content { position: relative; z-index: 1; height: 100%; }

:where(.dark, [data-theme="dark"]) .ui-gf { --ui-gf-bg: #111113; }

@media (prefers-reduced-motion: reduce) {
  .ui-gf-bleed { animation: none; }
}
`;
function GradientFloorDemo() {
  return (
    <div className={`gradient-floor-demo`}>
      <GradientFloor className={`gradient-floor-demo__panel`} />
    </div>
  );
}
export default GradientFloorDemo;
export { GradientFloor as PlicoCore_l };
export { GradientFloorDemo as PlicoDemo_f };

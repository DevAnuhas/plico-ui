"use client";

import * as React from "react";
import * as JSXRuntime from "react/jsx-runtime";
function TiltCard({
  children: children,
  maxTilt = 10,
  glare = true,
  scale = 1.02,
  perspective = 900,
  className: className,
}) {
  let rootRef = React.useRef(null),
    cardRef = React.useRef(null),
    frameRef = React.useRef(0),
    pointRef = React.useRef(null),
    reducedMotionRef = React.useRef(false);
  React.useEffect(() => {
    let e = window.matchMedia(`(prefers-reduced-motion: reduce)`),
      t = () => (reducedMotionRef.current = e.matches);
    return (
      t(),
      e.addEventListener(`change`, t),
      () => {
        (e.removeEventListener(`change`, t), cancelAnimationFrame(frameRef.current));
      }
    );
  }, []);
  let flushFrame = () => {
      frameRef.current = 0;
      let root = rootRef.current,
        card = cardRef.current,
        point = pointRef.current;
      if (!root || !card || !point) return;
      let rect = root.getBoundingClientRect(),
        x = Math.min(Math.max((point.x - rect.left) / rect.width, 0), 1),
        y = Math.min(Math.max((point.y - rect.top) / rect.height, 0), 1);
      (card.style.setProperty(`--rx`, `${((0.5 - y) * 2 * maxTilt).toFixed(2)}deg`),
        card.style.setProperty(`--ry`, `${((x - 0.5) * 2 * maxTilt).toFixed(2)}deg`),
        card.style.setProperty(`--gx`, `${(x * 100).toFixed(1)}%`),
        card.style.setProperty(`--gy`, `${(y * 100).toFixed(1)}%`));
    },
    move = (event) => {
      if (event.pointerType === `touch`) return;
      let card = cardRef.current;
      (card && !card.hasAttribute(`data-active`) && card.setAttribute(`data-active`, ``),
        !reducedMotionRef.current &&
          ((pointRef.current = {
            x: event.clientX,
            y: event.clientY,
          }),
          (frameRef.current ||= requestAnimationFrame(flushFrame))));
    },
    reset = () => {
      (cancelAnimationFrame(frameRef.current), (frameRef.current = 0), (pointRef.current = null));
      let card = cardRef.current;
      card &&
        (card.removeAttribute(`data-active`),
        card.style.setProperty(`--rx`, `0deg`),
        card.style.setProperty(`--ry`, `0deg`));
    },
    rootStyle = {
      "--ui-tc-perspective": `${perspective}px`,
      "--ui-tc-scale": scale,
    };
  return (
    <div
      ref={rootRef}
      className={[`ui-tc`, className].filter(Boolean).join(` `)}
      style={rootStyle}
      onPointerMove={move}
      onPointerLeave={reset}
      onPointerCancel={reset}
    >
      <style href={`ui-tilt-card`} precedence={`default`}>
        {tiltCardStyles}
      </style>
      <div ref={cardRef} className={`ui-tc-card`}>
        {children}
        {glare && <span className={`ui-tc-glare`} aria-hidden={`true`} />}
      </div>
    </div>
  );
}
var tiltCardStyles = `
.ui-tc {
  --ui-tc-radius: 20px;
  --ui-tc-shadow: 0 1px 2px rgba(0, 0, 0, 0.06), 0 8px 24px -12px rgba(0, 0, 0, 0.18);
  --ui-tc-shadow-active: 0 2px 4px rgba(0, 0, 0, 0.05), 0 24px 48px -16px rgba(0, 0, 0, 0.3);
  --ui-tc-glare-color: rgba(255, 255, 255, 0.32);
  --ui-tc-spring: cubic-bezier(0.34, 1.36, 0.64, 1);
  display: inline-block;
  perspective: var(--ui-tc-perspective);
}

.ui-tc-card {
  --rx: 0deg;
  --ry: 0deg;
  --gx: 50%;
  --gy: 50%;
  --ui-tc-lift: 0px;
  --ui-tc-s: 1;
  position: relative;
  overflow: hidden;
  border-radius: var(--ui-tc-radius);
  box-shadow: var(--ui-tc-shadow);
  transform: translateY(var(--ui-tc-lift)) rotateX(var(--rx)) rotateY(var(--ry)) scale(var(--ui-tc-s));
  /* The return: a soft spring back to rest */
  transition: transform 700ms var(--ui-tc-spring), box-shadow 500ms ease;
  will-change: transform;
}

/* While the pointer is over it: follow closely, with just enough easing to smooth the steps */
.ui-tc-card[data-active] {
  --ui-tc-s: var(--ui-tc-scale);
  --ui-tc-lift: -2px;
  box-shadow: var(--ui-tc-shadow-active);
  transition: transform 140ms ease-out, box-shadow 300ms ease;
}

/* Keyboard focus inside the card: a slight lift */
.ui-tc:has(:focus-visible) .ui-tc-card {
  --ui-tc-lift: -4px;
  box-shadow: var(--ui-tc-shadow-active);
}

.ui-tc-glare {
  position: absolute;
  inset: 0;
  z-index: 1;
  border-radius: inherit;
  pointer-events: none;
  background: radial-gradient(circle at var(--gx) var(--gy), var(--ui-tc-glare-color), transparent 55%);
  mix-blend-mode: soft-light;
  opacity: 0;
  transition: opacity 400ms ease;
}
.ui-tc-card[data-active] .ui-tc-glare { opacity: 1; }

@media (hover: none), (pointer: coarse) {
  .ui-tc-card[data-active] { --ui-tc-s: 1; }
}

@media (prefers-reduced-motion: reduce) {
  .ui-tc-card,
  .ui-tc-card[data-active],
  .ui-tc:has(:focus-visible) .ui-tc-card {
    transform: none;
    transition: box-shadow 300ms ease;
  }
  .ui-tc-glare { display: none; }
}

/* Dark mode: follows a .dark class or data-theme="dark" on any ancestor, e.g. <html> */
:where(.dark, [data-theme="dark"]) .ui-tc {
  --ui-tc-shadow: 0 1px 2px rgba(0, 0, 0, 0.4), 0 8px 24px -12px rgba(0, 0, 0, 0.6);
  --ui-tc-shadow-active: 0 2px 4px rgba(0, 0, 0, 0.4), 0 28px 56px -16px rgba(0, 0, 0, 0.75);
  --ui-tc-glare-color: rgba(255, 255, 255, 0.24);
}
`;
function TiltCardDemo() {
  return (
    <div className={`tilt-card-demo`}>
      <TiltCard>
        <div className={`tilt-card-demo__card`}>
          <div className={`tilt-card-demo__top`}>
            <span className={`tilt-card-demo__brand`}>
              {`Plico UI `}
              <b>{`Pro`}</b>
            </span>
            <svg className={`tilt-card-demo__wave`} viewBox={`0 0 24 24`} aria-hidden={`true`}>
              <path
                d={`M8.5 7.5a7 7 0 0 1 0 9M12 5a10.5 10.5 0 0 1 0 14M15.5 2.5a14 14 0 0 1 0 19`}
              />
            </svg>
          </div>
          <span className={`tilt-card-demo__chip`} aria-hidden={`true`} />
          <div className={`tilt-card-demo__number`}>{`•••• •••• •••• 4821`}</div>
          <div className={`tilt-card-demo__bottom`}>
            <div>
              <span className={`tilt-card-demo__label`}>{`Member`}</span>
              <span className={`tilt-card-demo__value`}>{`Alex Morgan`}</span>
            </div>
            <div>
              <span className={`tilt-card-demo__label`}>{`Since`}</span>
              <span className={`tilt-card-demo__value`}>{`10/26`}</span>
            </div>
          </div>
        </div>
      </TiltCard>
      <p className={`tilt-card-demo__caption`}>{`Move your pointer over the card`}</p>
    </div>
  );
}
export default TiltCardDemo;
export { TiltCard as PlicoCore_i };
export { TiltCardDemo as PlicoDemo_o };

"use client";

import * as React from "react";
type CSSVariables = React.CSSProperties & {
  [key: `--${string}`]: string | number;
};
interface TiltCardProps {
  children?: React.ReactNode;
  maxTilt?: number;
  glare?: boolean;
  scale?: number;
  perspective?: number;
  className?: string;
}
function TiltCard({
  children: children,
  maxTilt = 10,
  glare = true,
  scale = 1.02,
  perspective = 900,
  className: className,
}: TiltCardProps) {
  let rootRef = React.useRef<HTMLDivElement | null>(null),
    cardRef = React.useRef<HTMLDivElement | null>(null),
    frameRef = React.useRef(0),
    pointRef = React.useRef<{
      x: number;
      y: number;
    } | null>(null),
    reducedMotionRef = React.useRef(false);
  React.useEffect(() => {
    let e = window.matchMedia(`(prefers-reduced-motion: reduce)`),
      t = () => (reducedMotionRef.current = e.matches);
    return (
      t(),
      e.addEventListener(`change`, t),
      () => {
        (e.removeEventListener(`change`, t),
          cancelAnimationFrame(frameRef.current));
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
      (card.style.setProperty(
        `--rx`,
        `${((0.5 - y) * 2 * maxTilt).toFixed(2)}deg`,
      ),
        card.style.setProperty(
          `--ry`,
          `${((x - 0.5) * 2 * maxTilt).toFixed(2)}deg`,
        ),
        card.style.setProperty(`--gx`, `${(x * 100).toFixed(1)}%`),
        card.style.setProperty(`--gy`, `${(y * 100).toFixed(1)}%`));
    },
    move = (event: React.PointerEvent<HTMLDivElement>) => {
      if (event.pointerType === `touch`) return;
      let card = cardRef.current;
      (card &&
        !card.hasAttribute(`data-active`) &&
        card.setAttribute(`data-active`, ``),
        !reducedMotionRef.current &&
          ((pointRef.current = {
            x: event.clientX,
            y: event.clientY,
          }),
          (frameRef.current ||= requestAnimationFrame(flushFrame))));
    },
    reset = () => {
      (cancelAnimationFrame(frameRef.current),
        (frameRef.current = 0),
        (pointRef.current = null));
      let card = cardRef.current;
      card &&
        (card.removeAttribute(`data-active`),
        card.style.setProperty(`--rx`, `0deg`),
        card.style.setProperty(`--ry`, `0deg`));
    },
    rootStyle: CSSVariables = {
      "--ui-tc-perspective": `${perspective}px`,
      "--ui-tc-scale": scale,
    } as CSSVariables;
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
function TiltCardDemo2() {
  return (
    <div className={`tilt-card-demo`}>
      <TiltCard>
        <div className={`tilt-card-demo__card`}>
          <div className={`tilt-card-demo__top`}>
            <span className={`tilt-card-demo__brand`}>
              {`Plico UI `}
              <b>{`Pro`}</b>
            </span>
            <svg
              className={`tilt-card-demo__wave`}
              viewBox={`0 0 24 24`}
              aria-hidden={`true`}
            >
              <path
                d={`M8.5 7.5a7 7 0 0 1 0 9M12 5a10.5 10.5 0 0 1 0 14M15.5 2.5a14 14 0 0 1 0 19`}
              />
            </svg>
          </div>
          <span className={`tilt-card-demo__chip`} aria-hidden={`true`} />
          <div
            className={`tilt-card-demo__number`}
          >{`•••• •••• •••• 4821`}</div>
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
      <p
        className={`tilt-card-demo__caption`}
      >{`Move your pointer over the card`}</p>
    </div>
  );
}
const demoStyles =
  '.tilt-card-demo{-webkit-font-smoothing:antialiased;flex-direction:column;align-items:center;gap:28px;width:100%;font-family:Inter,ui-sans-serif,system-ui,-apple-system,sans-serif;display:flex}.tilt-card-demo .ui-tc{max-width:100%}.tilt-card-demo__card{aspect-ratio:1.586;box-sizing:border-box;color:#fff;-webkit-user-select:none;user-select:none;background:radial-gradient(120% 90% at 100% 0,#ffffff38,#0000 55%),radial-gradient(90% 80% at 0 100%,#7c4dff8c,#0000 60%),linear-gradient(135deg,#2f6bff 0%,#4f5bff 45%,#7c4dff 100%);flex-direction:column;width:340px;max-width:100%;padding:22px 24px;display:flex;position:relative}.tilt-card-demo__card:after{content:"";border-radius:inherit;pointer-events:none;position:absolute;inset:0;box-shadow:inset 0 0 0 1px #ffffff2e}.tilt-card-demo__top{justify-content:space-between;align-items:center;display:flex}.tilt-card-demo__brand{letter-spacing:-.01em;font-size:15px;font-weight:500}.tilt-card-demo__brand b{opacity:.75;font-weight:600}.tilt-card-demo__wave{fill:none;stroke:currentColor;stroke-width:1.8px;stroke-linecap:round;opacity:.8;width:20px;height:20px}.tilt-card-demo__chip{background:linear-gradient(135deg,#f3e2b3,#d9b86c 55%,#f1dca4);border-radius:6px;width:40px;height:30px;margin-top:auto;position:relative;box-shadow:inset 0 0 0 1px #785a1e40}.tilt-card-demo__chip:before,.tilt-card-demo__chip:after{content:"";border-block:1px solid #785a1e4d;position:absolute;inset:9px 0}.tilt-card-demo__chip:after{border:0;border-inline:1px solid #785a1e4d;inset:0 13px}.tilt-card-demo__number{letter-spacing:.06em;font-variant-numeric:tabular-nums;white-space:nowrap;margin-top:14px;font-size:17px;font-weight:500}.tilt-card-demo__bottom{gap:28px;margin-top:12px;display:flex}.tilt-card-demo__bottom>div{flex-direction:column;gap:2px;display:flex}.tilt-card-demo__label{letter-spacing:.08em;text-transform:uppercase;opacity:.65;font-size:10px;font-weight:500}.tilt-card-demo__value{font-size:13px;font-weight:500}.tilt-card-demo__caption{color:#8f8f8f;margin:0;font-size:13px;line-height:1.4}.card__preview .tilt-card-demo{zoom:.62;justify-content:center;gap:18px;position:absolute;inset:0}\n';
function TiltCardDemo() {
  return (
    <>
      <style href="plico-demo-tilt-card" precedence="default">
        {demoStyles}
      </style>
      <TiltCardDemo2 />
    </>
  );
}
export { TiltCard as Component };
export { TiltCardDemo as Demo };
export { TiltCard };
export { TiltCardDemo };
export default TiltCard;

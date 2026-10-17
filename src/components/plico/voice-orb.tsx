"use client";

import * as React from "react";
type CSSVariables = React.CSSProperties & {
  [key: `--${string}`]: string | number;
};
type OrbState = "idle" | "listening" | "thinking" | "speaking";
interface VoiceOrbProps {
  state?: "idle" | "listening" | "thinking" | "speaking";
  level?: number;
  size?: number;
  dots?: number;
  accent?: string;
  label?: boolean | Partial<Record<"idle" | "listening" | "thinking" | "speaking", string>>;
  interactive?: boolean;
  onPress?: () => void;
  className?: string;
  style?: React.CSSProperties;
}
var ViewI = {
  idle: `Tap to speak`,
  listening: `Listening`,
  thinking: `Thinking`,
  speaking: `Speaking`,
};
var valueValue: OrbState[] = [`idle`, `listening`, `thinking`, `speaking`];
var valueValue2 = {
  idle: 0.16,
  listening: 0.3,
  thinking: 1.9,
  speaking: 0.42,
};
var valueValue3 = (e: number, t = 0, n = 1) => Math.min(n, Math.max(t, e));
var valueValue4 = () =>
  typeof window < `u` && window.matchMedia(`(prefers-reduced-motion: reduce)`).matches;
function valueValue5(e: string, t: HTMLElement) {
  t.style.color = e;
  let n = getComputedStyle(t).color.match(/[\d.]+/g);
  return n ? [Number(n[0]), Number(n[1]), Number(n[2])] : [23, 23, 23];
}
function VoiceOrb({
  state = `idle`,
  level: level,
  size = 220,
  dots = 520,
  accent: accent,
  label = true,
  interactive = true,
  onPress: onPress,
  className: className,
  style: style,
}: VoiceOrbProps) {
  let y = React.useRef<HTMLCanvasElement | null>(null),
    b = React.useRef({
      state: state,
      level: level,
      interactive: interactive,
    });
  b.current = {
    state: state,
    level: level,
    interactive: interactive,
  };
  let x = React.useRef(() => {});
  (React.useEffect(() => {
    let e = y.current,
      t = e?.getContext(`2d`);
    if (!e || !t) return;
    let n = Math.max(60, Math.round(dots)),
      r = new Float32Array(n * 3),
      i = Math.PI * (3 - Math.sqrt(5));
    for (let e = 0; e < n; e++) {
      let t = 1 - (e / (n - 1)) * 2,
        a = Math.sqrt(1 - t * t);
      ((r[e * 3] = Math.cos(i * e) * a), (r[e * 3 + 1] = t), (r[e * 3 + 2] = Math.sin(i * e) * a));
    }
    let d = Math.min(window.devicePixelRatio || 1, 2.5);
    ((e.width = Math.round(size * d)), (e.height = Math.round(size * d)));
    let p = document.createElement(`span`);
    ((p.style.display = `none`), e.parentElement?.appendChild(p));
    let m = [23, 23, 23],
      h = [47, 107, 255],
      g = () => {
        let t = getComputedStyle(e);
        ((m = valueValue5(t.color, p)),
          (h = valueValue5(t.getPropertyValue(`--ui-vo-accent`).trim() || `#2f6bff`, p)));
      };
    g();
    let _ = {
      idle: 0,
      listening: 0,
      thinking: 0,
      speaking: 0,
    };
    _[b.current.state] = 1;
    let v = 0,
      S = 0,
      C = {
        x: 0,
        y: 0,
        on: false,
        strength: 0,
      },
      w = performance.now(),
      T = 0,
      E = 0,
      D = true,
      O = valueValue4(),
      k = (e: number) => {
        let i = Math.min(0.05, (e - w) / 1e3);
        w = e;
        let c = e / 1e3,
          l = b.current;
        ++E % 30 == 0 && g();
        let f = 0;
        for (let e of valueValue)
          ((_[e] += (+(e === l.state) - _[e]) * Math.min(1, i * 5)), (f += _[e] * valueValue2[e]));
        v += f * i;
        let p =
            l.state === `listening`
              ? valueValue3(
                  0.35 +
                    0.35 * Math.sin(c * 2.1) * Math.sin(c * 5.3) +
                    0.3 * Math.sin(c * 9.7 + 1) * Math.sin(c * 0.9),
                )
              : valueValue3(
                  0.3 + 0.7 * Math.abs(Math.sin(c * 4.1)) * (0.5 + 0.5 * Math.sin(c * 1.3 + 2)),
                ),
          y = l.level === void 0 ? p : valueValue3(l.level);
        ((S += (y - S) * Math.min(1, i * 12)),
          (C.strength += ((C.on && l.interactive ? 1 : 0) - C.strength) * Math.min(1, i * 8)));
        let x = size,
          A = x / 2,
          j = x * 0.32,
          M = 0.32 + _.thinking * 0.55,
          N = Math.sin(M),
          P = Math.cos(M),
          F = Math.sin(v),
          I = Math.cos(v),
          L = x * 0.2,
          R = Math.max(0.9, x / 190);
        (t.setTransform(d, 0, 0, d, 0, 0), t.clearRect(0, 0, x, x));
        let z = (_.listening + _.speaking) * S * 0.16 + _.thinking * 0.05;
        if (z > 0.004) {
          let e = t.createRadialGradient(A, A, j * 0.2, A, A, j * 1.55);
          (e.addColorStop(0, `rgba(${h[0]}, ${h[1]}, ${h[2]}, ${z})`),
            e.addColorStop(1, `rgba(${h[0]}, ${h[1]}, ${h[2]}, 0)`),
            (t.fillStyle = e),
            t.fillRect(0, 0, x, x));
        }
        for (let e = 0; e < n; e++) {
          let n = r[e * 3],
            i = r[e * 3 + 1],
            a = r[e * 3 + 2],
            o =
              (Math.sin(n * 3.1 + c * 2.3) +
                Math.sin(i * 4.3 - c * 1.7) +
                Math.sin(a * 5.2 + c * 2.9)) /
              3,
            l = _.idle * 0.022 * Math.sin(c * 1.3 + i * 2),
            u = _.listening * S * 0.3 * Math.max(0, o) ** 1.4,
            d = _.speaking * S * 0.13 * Math.sin(i * 7.5 - c * 7),
            f = l + u + d,
            p = n * (1 + f),
            g = i * (1 + f),
            y = a * (1 + f),
            b = 0,
            w = 1;
          if (_.thinking > 0.001) {
            let t = Math.hypot(n, a) || 1,
              r = 1 + 0.035 * Math.sin(c * 3 + e * 0.7),
              o = _.thinking;
            ((p += ((n / t) * r - p) * o),
              (g += (i * 0.2 - g) * o),
              (w = 1 - o * (1 - valueValue3((Math.hypot(n, a) - 0.25) * 2.2))),
              (y += ((a / t) * r - y) * o));
            let l = Math.atan2(a, n) + v;
            b = o * Math.max(0, Math.cos(l - c * 2.2)) ** 6;
          }
          let T = p * I + y * F,
            E = -p * F + y * I,
            D = g * P - E * N,
            O = g * N + E * P,
            k = 3.4 / (3.4 - O),
            M = A + T * j * k,
            z = A + D * j * k;
          if (C.strength > 0.01) {
            let e = M - C.x,
              t = z - C.y,
              n = Math.hypot(e, t) || 1;
            if (n < L) {
              let r = (1 - n / L) ** 2 * x * 0.07 * C.strength;
              ((M += (e / n) * r), (z += (t / n) * r));
            }
          }
          let B = (O + 1.3) / 2.6,
            V = valueValue3(Math.abs(u + d) * 9 + b),
            H = R * (0.55 + 0.75 * B) * k * (1 + V * 0.5),
            U = valueValue3(0.12 + 0.88 * B ** 1.6 + V * 0.3) * w;
          if (U < 0.01) continue;
          let W = Math.round(m[0] + (h[0] - m[0]) * V),
            G = Math.round(m[1] + (h[1] - m[1]) * V),
            K = Math.round(m[2] + (h[2] - m[2]) * V);
          ((t.fillStyle = `rgba(${W}, ${G}, ${K}, ${U.toFixed(3)})`),
            t.beginPath(),
            t.arc(M, z, H, 0, Math.PI * 2),
            t.fill());
        }
        !O && D && (T = requestAnimationFrame(k));
      };
    x.current = () => {
      if (O) {
        for (let e of valueValue) _[e] = +(e === b.current.state);
        ((S = b.current.level ?? 0.6), (w = performance.now()), k(w));
      }
    };
    let A = () => {
        (cancelAnimationFrame(T), (w = performance.now()), (T = requestAnimationFrame(k)));
      },
      j =
        `IntersectionObserver` in window
          ? new IntersectionObserver(([e]) => {
              ((D = e.isIntersecting && !document.hidden), D && A());
            })
          : null;
    j?.observe(e);
    let M = () => {
      ((D = !document.hidden), D && A());
    };
    (document.addEventListener(`visibilitychange`, M), A());
    let N = (t: { clientX: number; clientY: number; pointerType: string }) => {
        let n = e.getBoundingClientRect(),
          r = size / (n.width || size);
        ((C.x = (t.clientX - n.left) * r),
          (C.y = (t.clientY - n.top) * r),
          (C.on = t.pointerType === `mouse`));
      },
      P = () => (C.on = false);
    return (
      e.addEventListener(`pointermove`, N),
      e.addEventListener(`pointerleave`, P),
      () => {
        (cancelAnimationFrame(T),
          j?.disconnect(),
          document.removeEventListener(`visibilitychange`, M),
          e.removeEventListener(`pointermove`, N),
          e.removeEventListener(`pointerleave`, P),
          p.remove());
      }
    );
  }, [size, dots]),
    React.useEffect(() => x.current(), [state, level]));
  let S =
      label === false
        ? null
        : {
            ...ViewI,
            ...(typeof label == `object` ? label : {}),
          }[state],
    C = {
      ...style,
      "--ui-vo-size": `${size}px`,
      ...(accent
        ? {
            "--ui-vo-accent": accent,
          }
        : {}),
    } as CSSVariables,
    w = (
      <>
        <canvas ref={y} className={`ui-vo__canvas`} aria-hidden={`true`} />
        {S !== null && (
          <span className={`ui-vo__label`} aria-live={`polite`}>
            <span key={state}>
              {S}
              {state !== `idle` && (
                <span className={`ui-vo__dots`} aria-hidden={`true`}>
                  <i />
                  <i />
                  <i />
                </span>
              )}
            </span>
          </span>
        )}
      </>
    );
  return (
    <>
      <style href={`ui-voice-orb`} precedence={`default`}>
        {valueValue6}
      </style>
      {onPress ? (
        <button
          type={`button`}
          className={[`ui-vo`, className].filter(Boolean).join(` `)}
          data-state={state}
          style={C}
          aria-label={S ? void 0 : `Voice assistant: ${ViewI[state]}`}
          onClick={onPress}
        >
          {w}
        </button>
      ) : (
        <div
          className={[`ui-vo`, className].filter(Boolean).join(` `)}
          data-state={state}
          style={C}
          role={`img`}
          aria-label={`Voice assistant: ${S ?? ViewI[state]}`}
        >
          {w}
        </div>
      )}
    </>
  );
}
var valueValue6 = `
.ui-vo {
  --ui-vo-ink: #171717;
  --ui-vo-muted: #8f8f8f;
  --ui-vo-accent: #2f6bff;
  --ui-vo-focus: rgba(23, 23, 23, 0.22);
  display: inline-grid;
  justify-items: center;
  gap: 2px;
  margin: 0;
  padding: 0;
  border: 0;
  background: none;
  font-family: "Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  color: var(--ui-vo-ink);
  -webkit-font-smoothing: antialiased;
  -webkit-tap-highlight-color: transparent;
}
button.ui-vo { border-radius: 24px; cursor: pointer; }
button.ui-vo:focus-visible { outline: 2px solid var(--ui-vo-focus); outline-offset: 4px; }
.ui-vo__canvas { display: block; width: var(--ui-vo-size); height: var(--ui-vo-size); color: var(--ui-vo-ink); transition: transform 500ms cubic-bezier(0.32, 0.72, 0.24, 1); }
button.ui-vo:active .ui-vo__canvas { transform: scale(0.97); }

.ui-vo__label { height: 20px; overflow: hidden; font-size: 13px; font-weight: 500; line-height: 20px; color: var(--ui-vo-muted); white-space: nowrap; }
.ui-vo__label > span { display: inline-flex; align-items: baseline; gap: 1px; animation: ui-vo-in 360ms cubic-bezier(0.32, 0.72, 0.24, 1) both; }
.ui-vo[data-state="listening"] .ui-vo__label, .ui-vo[data-state="speaking"] .ui-vo__label { color: var(--ui-vo-ink); }
.ui-vo__dots { display: inline-flex; gap: 2px; margin-left: 2px; }
.ui-vo__dots i { width: 2.5px; height: 2.5px; border-radius: 50%; background: currentColor; animation: ui-vo-blink 1.2s ease-in-out infinite; }
.ui-vo__dots i:nth-child(2) { animation-delay: 0.16s; }
.ui-vo__dots i:nth-child(3) { animation-delay: 0.32s; }

@keyframes ui-vo-in { from { opacity: 0; transform: translateY(5px); filter: blur(3px); } }
@keyframes ui-vo-blink { 0%, 100% { opacity: 0.25; } 40% { opacity: 1; } }

@media (prefers-reduced-motion: reduce) {
  .ui-vo *, .ui-vo *::before, .ui-vo *::after { animation: none !important; transition: none !important; }
}

/* Dark mode: follows a .dark class or data-theme="dark" on any ancestor, e.g. <html> */
:where(.dark, [data-theme="dark"]) .ui-vo {
  --ui-vo-ink: #ededed;
  --ui-vo-muted: #8b8b92;
  --ui-vo-accent: #6f9bff;
  --ui-vo-focus: rgba(255, 255, 255, 0.3);
}
`;
var valueValue7: { state: OrbState; label: string; ms: number }[] = [
  {
    state: `idle`,
    label: `Idle`,
    ms: 2e3,
  },
  {
    state: `listening`,
    label: `Listening`,
    ms: 3200,
  },
  {
    state: `thinking`,
    label: `Thinking`,
    ms: 2600,
  },
  {
    state: `speaking`,
    label: `Speaking`,
    ms: 3600,
  },
];
function VoiceOrbDemo2() {
  let [e, t] = React.useState(0),
    i = React.useRef(false);
  React.useEffect(() => {
    if (i.current) return;
    let n = window.setTimeout(() => t((e) => (e + 1) % valueValue7.length), valueValue7[e].ms);
    return () => window.clearTimeout(n);
  }, [e]);
  let a = (e: React.SetStateAction<number>) => {
    ((i.current = true), t(e));
  };
  return (
    <div className={`vo-demo`}>
      <VoiceOrb state={valueValue7[e].state} onPress={() => a((e + 1) % valueValue7.length)} />
      <div className={`segmented vo-demo__states`} role={`radiogroup`} aria-label={`State`}>
        {valueValue7.map((t, n) => (
          <button
            type={`button`}
            role={`radio`}
            aria-checked={n === e}
            onClick={() => a(n)}
            key={t.state}
          >
            {t.label}
          </button>
        ))}
      </div>
    </div>
  );
}
const demoStyles =
  ".vo-demo{justify-items:center;gap:22px;width:100%;display:grid}.card__preview .vo-demo{align-content:center;position:absolute;inset:34px 0 0}.card__preview .vo-demo__states{display:none}.card__preview .vo-demo .ui-vo{zoom:.72}.stage:has(.vo-demo){height:480px}@media (width<=760px){.vo-demo__states button{height:28px;padding:0 8px;font-size:12px}.stage:has(.vo-demo){height:520px;padding:120px 16px 24px}}\n";
function VoiceOrbDemo() {
  return (
    <>
      <style href="plico-demo-voice-orb" precedence="default">
        {demoStyles}
      </style>
      <VoiceOrbDemo2 />
    </>
  );
}
export { VoiceOrb as Component };
export { VoiceOrbDemo as Demo };
export { VoiceOrb };
export { VoiceOrbDemo };
export default VoiceOrb;

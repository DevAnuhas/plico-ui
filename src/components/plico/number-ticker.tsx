"use client";

import * as React from "react";
import { useEffect } from "react";
import { useMemo } from "react";
import { useRef } from "react";
import { useState } from "react";
var valueValue6: Intl.NumberFormatOptions = {
  style: `currency`,
  currency: `USD`,
  maximumFractionDigits: 0,
};
var valueValue7: Intl.NumberFormatOptions = {
  style: `percent`,
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
  signDisplay: `exceptZero`,
};
var valueValue8 = (e: number, t: number) => Math.round(e + Math.random() * (t - e));
function NumberTickerDemo2() {
  let [e, t] = React.useState(48240),
    [i, a] = React.useState(0.124),
    o = (e: number) => {
      (t((t) => Math.max(0, t + e * valueValue8(600, 6400))),
        a((t) => Math.round((t + (e * valueValue8(8, 46)) / 1e3) * 1e3) / 1e3));
    };
  return (
    <div className={`number-ticker-demo`}>
      <div className={`ntd-card`}>
        <div className={`ntd-head`}>
          <span className={`ntd-label`}>{`Revenue`}</span>
          <span className={`ntd-period`}>{`This month`}</span>
        </div>
        <div className={`ntd-value`}>
          <NumberTicker value={e} format={valueValue6} locale={`en-US`} />
        </div>
        <div className={`ntd-meta`}>
          <span className={`ntd-delta`} data-down={i < 0 || void 0}>
            <svg viewBox={`0 0 12 12`} width={`10`} height={`10`} aria-hidden={`true`}>
              <path
                d={`M6 2.5v7M2.75 5.75 6 2.5l3.25 3.25`}
                fill={`none`}
                stroke={`currentColor`}
                strokeWidth={`1.6`}
                strokeLinecap={`round`}
                strokeLinejoin={`round`}
              />
            </svg>
            <NumberTicker
              value={i}
              format={valueValue7}
              locale={`en-US`}
              duration={700}
              delay={150}
            />
          </span>
          <span className={`ntd-vs`}>{`vs last month`}</span>
        </div>
        <div className={`ntd-actions`}>
          <button
            type={`button`}
            className={`ntd-btn`}
            aria-label={`Decrease revenue`}
            onClick={() => o(-1)}
          >{`−`}</button>
          <button
            type={`button`}
            className={`ntd-btn`}
            aria-label={`Increase revenue`}
            onClick={() => o(1)}
          >{`+`}</button>
        </div>
      </div>
    </div>
  );
}
type NumberTickerProps = {
  value: number;
  format?: Intl.NumberFormatOptions;
  locale?: string;
  duration?: number;
  delay?: number;
  className?: string;
};
type Part =
  | {
      key: string;
      digit: number;
    }
  | {
      key: string;
      char: string;
    };
function split(text: string): Part[] {
  const chars = Array.from(text);
  const parts: Part[] = [];
  let d = 0;
  let s = 0;
  for (let i = chars.length - 1; i >= 0; i--) {
    const c = chars[i];
    if (c >= "0" && c <= "9")
      parts.unshift({
        key: `d${d++}`,
        digit: c.charCodeAt(0) - 48,
      });
    else
      parts.unshift({
        key: `s${s++}`,
        char: c,
      });
  }
  return parts;
}
const mod10 = (n: number) => ((n % 10) + 10) % 10;
const ease = (t: number) => 1 - Math.pow(1 - t, 4);
const place = (el: HTMLElement, pos: number) => {
  el.style.transform = `translateY(${(-mod10(pos) / 11) * 100}%)`;
};
type Roll = {
  pos: number;
  from: number;
  to: number;
};
function NumberTicker({
  value,
  format,
  locale,
  duration = 900,
  delay = 0,
  className,
}: NumberTickerProps) {
  const fmtKey = JSON.stringify(format ?? {});
  const text = useMemo(
    () => new Intl.NumberFormat(locale, format).format(value),
    [value, locale, fmtKey],
  );
  const parts = useMemo(() => split(text), [text]);
  const root = useRef<HTMLSpanElement>(null);
  const rolls = useRef(new Map<string, Roll>());
  const stacks = useRef(new Map<string, HTMLElement>());
  const prev = useRef(0);
  const up = useRef(true);
  const mounted = useRef(false);
  const entering = useRef(new Set<string>());
  const seen = useRef(new Set<string>());
  const [started, setStarted] = useState(false);
  const keysNow = new Set(parts.filter((p) => "digit" in p).map((p) => p.key));
  for (const k of keysNow) if (mounted.current && !seen.current.has(k)) entering.current.add(k);
  for (const k of entering.current) if (!keysNow.has(k)) entering.current.delete(k);
  seen.current = keysNow;
  useEffect(() => {
    mounted.current = true;
    const el = root.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setStarted(true);
      return;
    }
    let timer = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        timer = window.setTimeout(() => setStarted(true), delay);
      },
      {
        threshold: 0.3,
      },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      clearTimeout(timer);
    };
  }, []);
  useEffect(() => {
    if (!started) return;
    if (value !== prev.current) up.current = value > prev.current;
    prev.current = value;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const keys = new Set<string>();
    for (const p of parts) {
      if (!("digit" in p)) continue;
      keys.add(p.key);
      const r = rolls.current.get(p.key) ?? {
        pos: 0,
        from: 0,
        to: 0,
      };
      const delta = up.current ? mod10(p.digit - r.pos) : -mod10(r.pos - p.digit);
      r.from = r.pos;
      r.to = r.pos + delta;
      if (reduce) r.pos = r.from = r.to;
      rolls.current.set(p.key, r);
    }
    for (const k of rolls.current.keys()) if (!keys.has(k)) rolls.current.delete(k);
    const apply = () => {
      for (const [k, r] of rolls.current) {
        const el = stacks.current.get(k);
        if (el) place(el, r.pos);
      }
    };
    if (reduce) return apply();
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - t0) / duration);
      const e = ease(t);
      for (const r of rolls.current.values()) r.pos = r.from + (r.to - r.from) * e;
      apply();
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [parts, started, value, duration]);
  return (
    <>
      <style href="ui-number-ticker" precedence="default">
        {css}
      </style>
      <span
        ref={root}
        className={["ui-nt", className].filter(Boolean).join(" ")}
        aria-live="polite"
      >
        <span className="ui-nt__sr">{text}</span>
        <span className="ui-nt__track" aria-hidden="true">
          {parts.map((p) =>
            "digit" in p ? (
              <span
                key={p.key}
                className="ui-nt__col"
                data-enter={entering.current.has(p.key) || undefined}
              >
                <span
                  className="ui-nt__stack"
                  ref={(el) => {
                    if (!el) return;
                    stacks.current.set(p.key, el);
                    place(el, rolls.current.get(p.key)?.pos ?? 0);
                    return () => {
                      if (stacks.current.get(p.key) === el) stacks.current.delete(p.key);
                    };
                  }}
                >
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((n, i) => (
                    <span key={i} className="ui-nt__cell">
                      {n}
                    </span>
                  ))}
                </span>
              </span>
            ) : (
              <span key={p.key} className="ui-nt__static">
                {p.char}
              </span>
            ),
          )}
        </span>
      </span>
    </>
  );
}
const css = `
.ui-nt {
  --ui-nt-lh: 1.15em;
  --ui-nt-ease: cubic-bezier(0.22, 1, 0.36, 1);
  position: relative;
  display: inline-flex;
  line-height: var(--ui-nt-lh);
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}
.ui-nt__sr {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
  border: 0;
}
.ui-nt__track {
  display: inline-flex;
  align-items: flex-start;
  height: var(--ui-nt-lh);
  line-height: var(--ui-nt-lh);
}
.ui-nt__col {
  display: inline-block;
  height: var(--ui-nt-lh);
  overflow: hidden;
  /* Soft top and bottom edges while digits pass through */
  -webkit-mask-image: linear-gradient(transparent, #000 14%, #000 86%, transparent);
  mask-image: linear-gradient(transparent, #000 14%, #000 86%, transparent);
}
.ui-nt__col[data-enter] { animation: ui-nt-in 450ms var(--ui-nt-ease) both; }
.ui-nt__stack {
  display: flex;
  flex-direction: column;
  will-change: transform;
}
.ui-nt__cell,
.ui-nt__static {
  display: block;
  height: var(--ui-nt-lh);
  text-align: center;
}
.ui-nt__static { white-space: pre; }

@keyframes ui-nt-in {
  from { opacity: 0; transform: translateY(-35%); }
}
@media (prefers-reduced-motion: reduce) {
  .ui-nt__col[data-enter] { animation: none; }
}

/* Dark mode: follows a .dark class or data-theme="dark" on any ancestor, e.g. <html>.
   The ticker inherits its color, so nothing needs to change here. */
:where(.dark, [data-theme="dark"]) .ui-nt {
  --ui-nt-lh: 1.15em;
}
`;
const demoStyles =
  ".number-ticker-demo{-webkit-font-smoothing:antialiased;place-items:center;width:100%;font-family:Inter,ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,sans-serif;display:grid}.ntd-card{color:#171717;background:#fff;border:1px solid #e5e5e5;border-radius:16px;width:min(100%,300px);padding:20px 20px 16px;box-shadow:0 1px 2px #0000000f}.ntd-head{justify-content:space-between;align-items:baseline;gap:12px;font-size:13px;line-height:18px;display:flex}.ntd-label{font-weight:500}.ntd-period{color:#8f8f8f}.ntd-value{letter-spacing:-.03em;margin-top:10px;font-size:38px;font-weight:600;line-height:1}.ntd-meta{align-items:center;gap:8px;margin-top:12px;font-size:12.5px;display:flex}.ntd-delta{color:#15803d;background:#e9f9ef;border-radius:999px;align-items:center;gap:4px;height:22px;padding:0 8px 0 7px;font-weight:500;display:inline-flex}.ntd-delta svg{transition:transform .3s cubic-bezier(.22,1,.36,1)}.ntd-delta[data-down]{color:#c02626;background:#fdecec}.ntd-delta[data-down] svg{transform:rotate(180deg)}.ntd-vs{color:#8f8f8f}.ntd-actions{border-top:1px solid #f0f0f0;gap:6px;margin-top:18px;padding-top:14px;display:flex}.ntd-btn{color:#171717;height:30px;font:inherit;cursor:pointer;background:#fff;border:0;border-radius:9px;flex:1;margin:0;padding:0 12px;font-size:15px;font-weight:500;line-height:1;transition:background-color .15s;box-shadow:0 0 0 1px #e5e5e5}.ntd-btn:hover{background:#f7f7f7}.ntd-btn:focus-visible{outline-offset:2px;outline:2px solid #2f6bff}:where(.dark,[data-theme=dark]) .ntd-card{color:#ededed;background:#232326;border-color:#ffffff14}:where(.dark,[data-theme=dark]) .ntd-delta{color:#4ade80;background:#22c55e24}:where(.dark,[data-theme=dark]) .ntd-delta[data-down]{color:#f87171;background:#ef444429}:where(.dark,[data-theme=dark]) .ntd-actions{border-top-color:#ffffff12}:where(.dark,[data-theme=dark]) .ntd-btn{color:#ededed;background:#2c2c30;box-shadow:0 0 0 1px #ffffff1a}:where(.dark,[data-theme=dark]) .ntd-btn:hover{background:#343439}.card__preview .number-ticker-demo{position:absolute;inset:0}.card__preview .number-ticker-demo .ntd-card{zoom:.7}\n";
function NumberTickerDemo(props: Record<string, never>) {
  return (
    <>
      <style href="plico-demo-number-ticker" precedence="default">
        {demoStyles}
      </style>
      <NumberTickerDemo2 {...props} />
    </>
  );
}
export { NumberTicker as Component };
export { NumberTickerDemo as Demo };
export { NumberTicker };
export { NumberTickerDemo };
export type { NumberTickerProps };
export default NumberTicker;

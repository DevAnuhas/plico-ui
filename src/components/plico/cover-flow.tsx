"use client";

import * as React from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import { useLayoutEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import type { KeyboardEvent } from "react";
import type { PointerEvent } from "react";
import type { ReactNode } from "react";
var valueValue3 = [
  [`Stone`, `#f4f4f5`, `#d4d4d8`],
  [`Mint`, `#f0fbf7`, `#b6e4d3`],
  [`Sky`, `#eff6ff`, `#bcd6fb`],
  [`Sage`, `#f0f7f2`, `#bfdcc8`],
  [`Blush`, `#fdf2f8`, `#f5b5d6`],
  [`Sand`, `#fdfaf3`, `#ead9b8`],
  [`Lilac`, `#f5f3ff`, `#cdc3f5`],
  [`Ice`, `#f0faff`, `#b8e0f0`],
  [`Peach`, `#fff7ed`, `#f6c9a4`],
  [`Mist`, `#f8fafc`, `#cbd5e1`],
].map(([e, t, n]) => ({
  id: e,
  title: e,
  subtitle: `${t} → ${n}`.toUpperCase(),
  cover: (
    <div
      className={`cf-demo__gradient`}
      style={{
        background: `linear-gradient(160deg, ${t}, ${n})`,
      }}
    />
  ),
}));
function CoverFlowDemo2() {
  return (
    <div className={`cf-demo`}>
      <CoverFlow
        items={valueValue3}
        defaultIndex={4}
        itemWidth={240}
        itemHeight={320}
        aria-label={`Gradient collection`}
      />
    </div>
  );
}
type CoverFlowItem = {
  id: string | number;
  title?: string;
  subtitle?: string;
  image?: string;
  alt?: string;
  cover?: ReactNode;
};
type CoverFlowProps = {
  items: CoverFlowItem[];
  index?: number;
  defaultIndex?: number;
  onIndexChange?: (index: number) => void;
  onSelect?: (item: CoverFlowItem, index: number) => void;
  itemWidth?: number;
  itemHeight?: number;
  angle?: number;
  reflection?: boolean;
  caption?: boolean;
  renderCaption?: (item: CoverFlowItem, index: number) => ReactNode;
  controls?: boolean;
  ticks?: boolean;
  sound?: boolean;
  "aria-label"?: string;
  className?: string;
};
const VISIBLE = 7;
const DRAG_PX = 110;
function CoverFlow({
  items,
  index,
  defaultIndex,
  onIndexChange,
  onSelect,
  itemWidth = 280,
  itemHeight = 280,
  angle = 50,
  reflection = true,
  caption = true,
  renderCaption,
  controls = true,
  ticks = true,
  sound = false,
  "aria-label": ariaLabel = "Cover flow",
  className,
}: CoverFlowProps) {
  const count = items.length;
  const last = Math.max(count - 1, 0);
  const clamp = (v: number) => Math.min(Math.max(v, 0), last);
  const start = clamp(index ?? defaultIndex ?? Math.floor(last / 2));
  const [active, setActive] = useState(start);
  const [dir, setDir] = useState(1);
  const [scale, setScale] = useState(1);
  const root = useRef<HTMLDivElement>(null);
  const cards = useRef<(HTMLDivElement | null)[]>([]);
  const m = useRef({
    pos: start,
    target: start,
    vel: 0,
    raf: 0,
    last: 0,
    active: start,
  });
  const opts = useRef({
    angle,
    scale,
    itemWidth,
    onIndexChange,
    sound,
    count,
  });
  opts.current = {
    angle,
    scale,
    itemWidth,
    onIndexChange,
    sound,
    count,
  };
  const reduced = useRef(false);
  useEffect(() => {
    const q = window.matchMedia("(prefers-reduced-motion: reduce)");
    reduced.current = q.matches;
    const on = () => (reduced.current = q.matches);
    q.addEventListener("change", on);
    return () => q.removeEventListener("change", on);
  }, []);
  const audio = useRef<AudioContext | null>(null);
  const tick = () => {
    const ctx = audio.current;
    if (!ctx || ctx.state !== "running") return;
    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(2200, t);
    osc.frequency.exponentialRampToValueAtTime(900, t + 0.03);
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(0.05, t + 0.004);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.045);
    osc.connect(gain).connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.05);
  };
  const wakeAudio = () => {
    if (!opts.current.sound) return;
    const Ctx =
      window.AudioContext ??
      (
        window as unknown as {
          webkitAudioContext?: typeof AudioContext;
        }
      ).webkitAudioContext;
    if (!audio.current && Ctx) audio.current = new Ctx();
    if (audio.current?.state === "suspended") void audio.current.resume();
  };
  useEffect(() => () => void audio.current?.close(), []);
  const paint = useCallback(() => {
    const { pos } = m.current;
    const { angle: a, scale: s, itemWidth: w } = opts.current;
    const gap = w * 0.78 * s;
    const step = w * 0.27 * s;
    const depth = w * 0.7 * s;
    cards.current.forEach((el, i) => {
      if (!el) return;
      const d = i - pos;
      const ad = Math.abs(d);
      if (ad > VISIBLE + 1) {
        el.style.visibility = "hidden";
        return;
      }
      const t = Math.min(ad, 1);
      const dir = Math.sign(d);
      const x = dir * (t * gap + Math.max(ad - 1, 0) * step);
      el.style.visibility = "";
      const k = 1 - t * 0.08 - Math.min(Math.max(ad - 1, 0), 4) * 0.015;
      el.style.transform = `translate3d(${x}px, 0, ${-t * depth}px) rotateY(${-dir * t * a}deg) scale(${k.toFixed(4)})`;
      el.style.zIndex = String(1000 - Math.round(ad * 10));
      el.style.setProperty("--ui-cf-t", t.toFixed(3));
      el.style.setProperty("--ui-cf-d", Math.min(Math.max(d, -1.5), 1.5).toFixed(3));
      el.dataset.side = d < 0 ? "left" : "right";
    });
    const now = Math.round(Math.min(Math.max(pos, 0), opts.current.count - 1));
    if (now !== m.current.active) {
      setDir(now > m.current.active ? 1 : -1);
      m.current.active = now;
      setActive(now);
      opts.current.onIndexChange?.(now);
      tick();
    }
  }, []);
  const run = useCallback(() => {
    const s = m.current;
    if (s.raf) return;
    s.last = performance.now();
    const frame = (now: number) => {
      const dt = Math.min(now - s.last, 32) / 1000;
      s.last = now;
      const k = 190;
      const c = 2 * Math.sqrt(k) * 0.92;
      s.vel += (k * (s.target - s.pos) - c * s.vel) * dt;
      s.pos += s.vel * dt;
      if (Math.abs(s.target - s.pos) < 0.0006 && Math.abs(s.vel) < 0.002) {
        s.pos = s.target;
        s.vel = 0;
        s.raf = 0;
        paint();
        return;
      }
      paint();
      s.raf = requestAnimationFrame(frame);
    };
    s.raf = requestAnimationFrame(frame);
  }, [paint]);
  const goTo = useCallback(
    (i: number) => {
      const s = m.current;
      s.target = Math.min(Math.max(Math.round(i), 0), opts.current.count - 1);
      if (reduced.current) {
        s.pos = s.target;
        s.vel = 0;
        paint();
      } else run();
    },
    [paint, run],
  );
  useEffect(() => () => cancelAnimationFrame(m.current.raf), []);
  useEffect(() => {
    if (index !== undefined && index !== Math.round(m.current.target)) goTo(index);
  }, [index, goTo]);
  useEffect(() => {
    if (m.current.target > last) goTo(last);
    else paint();
  }, [last, goTo, paint]);
  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const fit = () => setScale(Math.min(1, Math.max(0.5, el.clientWidth / (itemWidth * 3.2))));
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, [itemWidth]);
  useLayoutEffect(paint);
  const snapTimer = useRef(0);
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      const dx = e.shiftKey && !e.deltaX ? e.deltaY : e.deltaX;
      if (Math.abs(dx) <= Math.abs(e.deltaY) && !e.shiftKey) return;
      e.preventDefault();
      wakeAudio();
      const s = m.current;
      const unit = DRAG_PX * opts.current.scale * 1.4;
      s.target = Math.min(Math.max(s.target + dx / unit, -0.35), opts.current.count - 1 + 0.35);
      run();
      window.clearTimeout(snapTimer.current);
      snapTimer.current = window.setTimeout(() => goTo(s.target + Math.sign(dx) * 0.3), 110);
    };
    el.addEventListener("wheel", onWheel, {
      passive: false,
    });
    return () => {
      el.removeEventListener("wheel", onWheel);
      window.clearTimeout(snapTimer.current);
    };
  }, [run, goTo]);
  const drag = useRef<{
    id: number;
    x: number;
    from: number;
    moved: boolean;
    hit: number | null;
    samples: {
      x: number;
      t: number;
    }[];
  } | null>(null);
  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    wakeAudio();
    const hit = (e.target as HTMLElement).closest<HTMLElement>("[data-cf-index]");
    drag.current = {
      id: e.pointerId,
      x: e.clientX,
      from: m.current.pos,
      moved: false,
      hit: hit ? Number(hit.dataset.cfIndex) : null,
      samples: [
        {
          x: e.clientX,
          t: performance.now(),
        },
      ],
    };
  };
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    const dx = e.clientX - d.x;
    if (!d.moved) {
      if (Math.abs(dx) < 6) return;
      d.moved = true;
      e.currentTarget.setPointerCapture(e.pointerId);
      e.currentTarget.dataset.dragging = "";
    }
    const s = m.current;
    cancelAnimationFrame(s.raf);
    s.raf = 0;
    let p = d.from - dx / (DRAG_PX * opts.current.scale);
    const max = opts.current.count - 1;
    if (p < 0) p = p * 0.3;
    if (p > max) p = max + (p - max) * 0.3;
    s.pos = s.target = p;
    s.vel = 0;
    d.samples.push({
      x: e.clientX,
      t: performance.now(),
    });
    if (d.samples.length > 6) d.samples.shift();
    paint();
  };
  const onPointerUp = (e: PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    drag.current = null;
    delete e.currentTarget.dataset.dragging;
    if (!d.moved) {
      if (d.hit === null) return;
      if (d.hit === Math.round(m.current.target)) onSelect?.(items[d.hit], d.hit);
      else goTo(d.hit);
      return;
    }
    const first = d.samples[0];
    const lastS = d.samples[d.samples.length - 1];
    const dt = Math.max(lastS.t - first.t, 1);
    const v = (-((lastS.x - first.x) / dt) * 1000) / (DRAG_PX * opts.current.scale);
    const s = m.current;
    s.vel = reduced.current ? 0 : v;
    let to = Math.round(s.pos + v * 0.18);
    if (Math.abs(v) > 0.8 && to === Math.round(d.from)) to += Math.sign(v);
    goTo(to);
  };
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const cur = Math.round(m.current.target);
    const keys: Record<string, number> = {
      ArrowLeft: cur - 1,
      ArrowRight: cur + 1,
      Home: 0,
      End: last,
    };
    if (e.key in keys) {
      e.preventDefault();
      wakeAudio();
      goTo(keys[e.key]);
    } else if ((e.key === "Enter" || e.key === " ") && onSelect && e.target === e.currentTarget) {
      e.preventDefault();
      onSelect(items[cur], cur);
    }
  };
  const current = items[active];
  const w = Math.round(itemWidth * scale);
  const h = Math.round(itemHeight * scale);
  const face = (item: CoverFlowItem, decorative = false) => (
    <div className="ui-cf__media">
      {item.cover ??
        (item.image ? (
          <img
            src={item.image}
            alt={decorative ? "" : (item.alt ?? item.title ?? "")}
            draggable={false}
            loading="lazy"
            decoding="async"
          />
        ) : null)}
    </div>
  );
  return (
    <div
      className={["ui-cf", className].filter(Boolean).join(" ")}
      style={
        {
          "--ui-cf-w": `${w}px`,
          "--ui-cf-h": `${h}px`,
        } as React.CSSProperties
      }
      data-reflection={reflection || undefined}
    >
      {}
      <style href="ui-cover-flow" precedence="default">
        {css}
      </style>

      <div
        ref={root}
        className="ui-cf__viewport"
        role="region"
        aria-roledescription="carousel"
        aria-label={ariaLabel}
        tabIndex={0}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        data-selectable={onSelect ? "" : undefined}
      >
        <div
          className="ui-cf__stage"
          style={{
            perspective: `${Math.round(1000 * scale)}px`,
          }}
        >
          {items.map((item, i) => (
            <div
              key={item.id}
              ref={(el) => {
                cards.current[i] = el;
              }}
              className="ui-cf__item"
              data-cf-index={i}
              data-active={i === active || undefined}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}${item.title ? `: ${item.title}` : ""}`}
              aria-hidden={i !== active || undefined}
            >
              <div className="ui-cf__ground" aria-hidden="true" />
              <div className="ui-cf__card">{face(item)}</div>
              {reflection && (
                <div className="ui-cf__reflection" aria-hidden="true" inert>
                  <div className="ui-cf__card">{face(item, true)}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {(caption || controls || ticks) && (
        <div className="ui-cf__footer">
          <div className="ui-cf__row">
            {controls && (
              <button
                type="button"
                className="ui-cf__nav"
                aria-label="Previous"
                disabled={active === 0}
                onClick={() => goTo(Math.round(m.current.target) - 1)}
              >
                <svg viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M10 3.5 5.5 8l4.5 4.5" />
                </svg>
              </button>
            )}
            {caption && (
              <div className="ui-cf__caption" aria-live="polite">
                <div
                  key={current?.id}
                  className="ui-cf__caption-in"
                  data-dir={dir > 0 ? "next" : "prev"}
                >
                  {current &&
                    (renderCaption ? (
                      renderCaption(current, active)
                    ) : (
                      <>
                        {current.title && <div className="ui-cf__title">{current.title}</div>}
                        {current.subtitle && (
                          <div className="ui-cf__subtitle">{current.subtitle}</div>
                        )}
                      </>
                    ))}
                </div>
              </div>
            )}
            {controls && (
              <button
                type="button"
                className="ui-cf__nav"
                aria-label="Next"
                disabled={active === last}
                onClick={() => goTo(Math.round(m.current.target) + 1)}
              >
                <svg viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M6 3.5 10.5 8 6 12.5" />
                </svg>
              </button>
            )}
          </div>
          {ticks && count > 1 && (
            <div className="ui-cf__ticks">
              {items.map((item, i) => (
                <button
                  key={item.id}
                  type="button"
                  tabIndex={-1}
                  className="ui-cf__tick"
                  aria-label={`Show ${item.title ?? `cover ${i + 1}`}`}
                  aria-current={i === active || undefined}
                  onClick={() => goTo(i)}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
const css = `
.ui-cf {
  --ui-cf-ink: #171717;
  --ui-cf-muted: #8a8a8a;
  --ui-cf-card: #f1f1f1;
  --ui-cf-edge: rgba(0, 0, 0, 0.08);
  --ui-cf-dim: rgba(255, 255, 255, 0.24);
  --ui-cf-shadow: 0 1px 2px rgba(0, 0, 0, 0.05), 0 10px 20px -12px rgba(0, 0, 0, 0.18);
  --ui-cf-reflect: 0.22;
  --ui-cf-ground: rgba(0, 0, 0, 0.16);
  --ui-cf-tick: rgba(0, 0, 0, 0.16);
  --ui-cf-nav: #ffffff;
  --ui-cf-nav-line: #e7e7e7;
  --ui-cf-focus: rgba(23, 23, 23, 0.25);
  --ui-cf-ease: cubic-bezier(0.22, 1, 0.36, 1);
  display: grid;
  gap: 4px;
  width: 100%;
  min-width: 0;
  font-family: "Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
}

/* Soft fade on both sides, so the stacks run out instead of being cut off */
.ui-cf__viewport {
  position: relative;
  overflow: hidden;
  padding: calc(var(--ui-cf-h) * 0.08) 0 0;
  height: calc(var(--ui-cf-h) * 1.08);
  border-radius: 12px;
  outline: none;
  cursor: grab;
  touch-action: pan-y;
  user-select: none;
  -webkit-user-select: none;
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 9%, #000 91%, transparent);
  mask-image: linear-gradient(90deg, transparent, #000 9%, #000 91%, transparent);
}
.ui-cf[data-reflection] .ui-cf__viewport { height: calc(var(--ui-cf-h) * 1.4); }
.ui-cf__viewport[data-dragging] { cursor: grabbing; }
.ui-cf__viewport:focus-visible .ui-cf__item[data-active] .ui-cf__card {
  box-shadow: var(--ui-cf-shadow), 0 0 0 3px var(--ui-cf-focus);
}

.ui-cf__stage {
  position: relative;
  height: var(--ui-cf-h);
  transform-style: preserve-3d;
}
.ui-cf__item {
  position: absolute;
  top: 0;
  left: 50%;
  width: var(--ui-cf-w);
  height: var(--ui-cf-h);
  margin-left: calc(var(--ui-cf-w) / -2);
  transform-style: preserve-3d;
  will-change: transform;
}
.ui-cf__viewport[data-selectable] .ui-cf__item[data-active] { cursor: pointer; }
.ui-cf__card {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 12px;
  background: var(--ui-cf-card);
  box-shadow: var(--ui-cf-shadow);
}
.ui-cf__media {
  position: absolute;
  inset: 0 -8%;
  transform: translateX(calc(var(--ui-cf-d, 0) * -5%));
}
.ui-cf__media > img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
}
/* A soft shadow on the floor that fades as a cover turns away */
.ui-cf__ground {
  position: absolute;
  left: 10%;
  right: 10%;
  bottom: -3px;
  height: 8px;
  border-radius: 50%;
  background: var(--ui-cf-ground);
  filter: blur(5px);
  opacity: calc(1 - var(--ui-cf-t, 0) * 0.7);
  pointer-events: none;
}
/* Hairline edge, a dim that grows as a cover turns away, and a sheen on the side facing the light */
.ui-cf__card::before,
.ui-cf__card::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
}
.ui-cf__card::before {
  z-index: 2;
  box-shadow: inset 0 0 0 1px var(--ui-cf-edge);
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.22), transparent 45%);
  opacity: calc(var(--ui-cf-t, 0) * 0.9);
}
.ui-cf__item[data-side="right"] .ui-cf__card::before {
  background: linear-gradient(270deg, rgba(255, 255, 255, 0.22), transparent 45%);
}
.ui-cf__card::after {
  z-index: 1;
  background: var(--ui-cf-dim);
  opacity: var(--ui-cf-t, 0);
}

/* The floor: a flipped copy that fades out – a mask, so it works on any background */
.ui-cf__reflection {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  height: 32%;
  margin-top: 2px;
  overflow: hidden;
  pointer-events: none;
  -webkit-mask-image: linear-gradient(to bottom, rgba(0, 0, 0, var(--ui-cf-reflect)), transparent 85%);
  mask-image: linear-gradient(to bottom, rgba(0, 0, 0, var(--ui-cf-reflect)), transparent 85%);
}
.ui-cf__reflection > .ui-cf__card {
  height: var(--ui-cf-h);
  transform: scaleY(-1);
  transform-origin: 50% calc(var(--ui-cf-h) / 2);
  box-shadow: none;
}
.ui-cf__reflection > .ui-cf__card {
  position: absolute;
  bottom: auto;
  top: 0;
}

/* Caption with previous / next on either side, position ticks below */
.ui-cf__footer {
  position: relative;
  z-index: 1;
  display: grid;
  justify-items: center;
  gap: 14px;
  margin-top: calc(var(--ui-cf-h) * -0.04);
}
.ui-cf:not([data-reflection]) .ui-cf__footer { margin-top: 12px; }
.ui-cf__row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  min-height: 44px;
}
.ui-cf__ticks {
  display: flex;
  align-items: center;
  gap: 2px;
}
.ui-cf__tick {
  display: grid;
  place-items: center;
  width: 14px;
  height: 14px;
  padding: 0;
  border: 0;
  background: none;
  cursor: pointer;
}
.ui-cf__tick::before {
  content: "";
  width: 5px;
  height: 5px;
  border-radius: 999px;
  background: var(--ui-cf-tick);
  transition: width 320ms var(--ui-cf-ease), background-color 200ms ease;
}
.ui-cf__tick[aria-current]::before {
  width: 14px;
  background: var(--ui-cf-ink);
}
.ui-cf__tick:hover::before { background: var(--ui-cf-muted); }
.ui-cf__tick[aria-current]:hover::before { background: var(--ui-cf-ink); }
.ui-cf__caption {
  display: grid;
  min-width: min(220px, 50vw);
  text-align: center;
}
.ui-cf__caption-in { animation: ui-cf-in 420ms var(--ui-cf-ease) both; }
.ui-cf__caption-in[data-dir="prev"] { animation-name: ui-cf-in-prev; }
.ui-cf__title {
  color: var(--ui-cf-ink);
  font-size: 15px;
  font-weight: 600;
  letter-spacing: -0.01em;
  line-height: 1.35;
}
.ui-cf__subtitle {
  color: var(--ui-cf-muted);
  font-size: 13px;
  line-height: 1.4;
}
.ui-cf__nav {
  display: grid;
  place-items: center;
  flex: none;
  width: 32px;
  height: 32px;
  padding: 0;
  border: 0;
  border-radius: 999px;
  background: var(--ui-cf-nav);
  box-shadow: inset 0 0 0 1px var(--ui-cf-nav-line), 0 1px 2px rgba(0, 0, 0, 0.05);
  color: var(--ui-cf-ink);
  cursor: pointer;
  transition: transform 160ms var(--ui-cf-ease), opacity 160ms ease;
}
.ui-cf__nav:active { transform: scale(0.92); }
.ui-cf__nav:disabled { opacity: 0.35; cursor: default; transform: none; }
.ui-cf__nav:focus-visible { outline: 2px solid var(--ui-cf-focus); outline-offset: 2px; }
.ui-cf__nav svg {
  width: 14px;
  height: 14px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.7;
  stroke-linecap: round;
  stroke-linejoin: round;
}
@media (pointer: coarse) {
  .ui-cf__nav { width: 40px; height: 40px; }
}

/* The caption rises in from the direction of travel */
@keyframes ui-cf-in {
  from { opacity: 0; transform: translate(14px, 4px); filter: blur(3px); }
  to { opacity: 1; transform: none; filter: none; }
}
@keyframes ui-cf-in-prev {
  from { opacity: 0; transform: translate(-14px, 4px); filter: blur(3px); }
  to { opacity: 1; transform: none; filter: none; }
}

@media (prefers-reduced-motion: reduce) {
  .ui-cf__caption-in { animation: none; }
  .ui-cf__media { transform: none; }
  .ui-cf__tick::before { transition: none; }
  .ui-cf__nav { transition: none; }
}

/* Dark mode: follows a .dark class or data-theme="dark" on any ancestor, e.g. <html> */
:where(.dark, [data-theme="dark"]) .ui-cf {
  --ui-cf-ink: #ededed;
  --ui-cf-muted: #8f8f8f;
  --ui-cf-card: #1d1d20;
  --ui-cf-edge: rgba(255, 255, 255, 0.1);
  --ui-cf-dim: rgba(0, 0, 0, 0.5);
  --ui-cf-shadow: 0 1px 2px rgba(0, 0, 0, 0.3), 0 12px 24px -14px rgba(0, 0, 0, 0.6);
  --ui-cf-reflect: 0.3;
  --ui-cf-ground: rgba(0, 0, 0, 0.45);
  --ui-cf-tick: rgba(255, 255, 255, 0.2);
  --ui-cf-nav: #1d1d20;
  --ui-cf-nav-line: rgba(255, 255, 255, 0.1);
  --ui-cf-focus: rgba(255, 255, 255, 0.35);
}
`;
const demoStyles =
  ".cf-demo{grid-template-columns:minmax(0,1fr);width:100%;max-width:980px;margin:0 auto;display:grid}.cf-demo__gradient{width:100%;height:100%}.card__preview .cf-demo{place-content:center;max-width:none;padding-top:26px;position:absolute;inset:0}.card__preview .cf-demo .ui-cf{zoom:.62;pointer-events:none}.card__preview .cf-demo .ui-cf__footer{display:none}.stage:has(.cf-demo){height:580px;padding-left:0;padding-right:0}@media (width<=760px){.stage:has(.cf-demo){height:520px}}\n";
function CoverFlowDemo(props: Record<string, never>) {
  return (
    <>
      <style href="plico-demo-cover-flow" precedence="default">
        {demoStyles}
      </style>
      <CoverFlowDemo2 {...props} />
    </>
  );
}
export { CoverFlow as Component };
export { CoverFlow };
export { CoverFlowDemo };
export { CoverFlowDemo as Demo };
export type { CoverFlowItem };
export type { CoverFlowProps };
export default CoverFlow;

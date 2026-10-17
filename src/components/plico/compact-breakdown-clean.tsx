"use client";

import * as React from "react";
interface CompactBreakdownCleanProps {
  title?: string;
  items: BreakdownItem[];
  periods?: {
    id: string;
    label: string;
  }[];
  period?: string;
  defaultPeriod?: string;
  onPeriodChange?: (id: string) => void;
  delta?: number;
  format?: (value: number) => string;
  totalLabel?: string;
  footer?: React.ReactNode | null;
  className?: string;
}
type BreakdownItem = {
  id?: string;
  key?: string;
  label: string;
  value: number;
  color?: string;
};
var cleanFormatNumber = (value: number | bigint) =>
  new Intl.NumberFormat(`en-US`, {
    maximumFractionDigits: 0,
  }).format(value);
var cleanDefaultPalette = [
  `var(--ui-cbc-c1)`,
  `var(--ui-cbc-c2)`,
  `var(--ui-cbc-c3)`,
  `var(--ui-cbc-c4)`,
  `var(--ui-cbc-c5)`,
];
var cleanMotionEase = `cubic-bezier(0.22, 1, 0.36, 1)`;
var cleanEaseOutQuart = (value: number) => 1 - (1 - value) ** 4;
var cleanPrefersReducedMotion = () =>
  typeof window < `u` && window.matchMedia(`(prefers-reduced-motion: reduce)`).matches;
var cleanItemKey = (item: BreakdownItem) => item.id ?? item.label;
function useAnimatedNumbersClean(
  targets: Record<string, number>,
  initialDuration: number,
  updateDuration: number,
) {
  let [values, setValues] = React.useState(() =>
      Object.fromEntries(Object.keys(targets).map((e) => [e, 0])),
    ),
    currentRef = React.useRef(values),
    mountedRef = React.useRef(false),
    serialized = JSON.stringify(targets);
  return (
    React.useEffect(() => {
      let e = JSON.parse(serialized) as Record<string, number>,
        n = {
          ...currentRef.current,
        };
      if (cleanPrefersReducedMotion()) {
        ((currentRef.current = e), setValues(e));
        return;
      }
      let i = mountedRef.current ? updateDuration : initialDuration;
      mountedRef.current = true;
      let d = performance.now(),
        f = 0,
        p = (t: number) => {
          let r = Math.min(1, (t - d) / i),
            c = cleanEaseOutQuart(r),
            l: Record<string, number> = {};
          for (let t in e) l[t] = (n[t] ?? 0) + (e[t] - (n[t] ?? 0)) * c;
          ((currentRef.current = l), setValues(l), r < 1 && (f = requestAnimationFrame(p)));
        };
      return ((f = requestAnimationFrame(p)), () => cancelAnimationFrame(f));
    }, [serialized]),
    values
  );
}
function CompactBreakdownClean({
  title = `Breakdown`,
  items: items,
  periods: periods,
  period: period,
  defaultPeriod: defaultPeriod,
  onPeriodChange: onPeriodChange,
  delta: delta,
  format = cleanFormatNumber,
  totalLabel = `Total`,
  footer: footer,
  className: className,
}: CompactBreakdownCleanProps) {
  let instanceId = React.useId(),
    [localPeriod, setLocalPeriod] = React.useState(defaultPeriod ?? periods?.[0]?.id),
    resolvedPeriod = period ?? localPeriod,
    [hoveredKey, setHoveredKey] = React.useState<string | null>(null),
    registryRef = React.useRef<
      Array<{
        key: string;
        label: string;
        color: string;
      }>
    >([]);
  for (let e of items) {
    let t = cleanItemKey(e),
      n = registryRef.current.find((e) => e.key === t);
    n
      ? ((n.label = e.label), e.color && (n.color = e.color))
      : registryRef.current.push({
          key: t,
          label: e.label,
          color: e.color ?? cleanDefaultPalette[registryRef.current.length] ?? `var(--ui-cbc-c5)`,
        });
  }
  let valueMap = new Map(items.map((e) => [cleanItemKey(e), Math.max(0, e.value)])),
    total = [...valueMap.values()].reduce((e, t) => e + t, 0),
    activeKey = hoveredKey !== null && valueMap.has(hoveredKey) ? hoveredKey : null,
    animationTargets: Record<string, number> = {
      "#total": total,
      "#figure": activeKey ? (valueMap.get(activeKey) ?? 0) : total,
    };
  for (let e of registryRef.current) animationTargets[e.key] = valueMap.get(e.key) ?? 0;
  let animated = useAnimatedNumbersClean(animationTargets, 900, 620),
    animatedTotal = Math.max(animated[`#total`] ?? 0, 1e-4),
    rankedRows = registryRef.current
      .map((e) => ({
        ...e,
        value: valueMap.get(e.key) ?? 0,
        leaving: !valueMap.has(e.key),
      }))
      .filter((e) => !e.leaving || (animated[e.key] ?? 0) > 0.5)
      .sort((e, t) => Number(e.leaving) - Number(t.leaving) || t.value - e.value),
    orderKey = rankedRows.map((e) => e.key).join(`|`),
    leader = rankedRows.find((e) => !e.leaving),
    rowRefs = React.useRef<Map<string, HTMLLIElement>>(new Map()),
    previousTopsRef = React.useRef<Map<string, number>>(new Map());
  React.useLayoutEffect(() => {
    let e = new Map();
    (rowRefs.current.forEach((t, n) => e.set(n, t.offsetTop)),
      cleanPrefersReducedMotion() ||
        e.forEach((e, t) => {
          let n = previousTopsRef.current.get(t),
            r = rowRefs.current.get(t);
          r &&
            n !== void 0 &&
            n !== e &&
            r.animate(
              [
                {
                  transform: `translateY(${n - e}px)`,
                },
                {
                  transform: `none`,
                },
              ],
              {
                duration: 560,
                easing: cleanMotionEase,
              },
            );
        }),
      (previousTopsRef.current = e));
  }, [orderKey]);
  let switchRef = React.useRef<HTMLDivElement | null>(null),
    pillRef = React.useRef<HTMLSpanElement | null>(null),
    pillReadyRef = React.useRef(false);
  React.useLayoutEffect(() => {
    let e = switchRef.current,
      t = pillRef.current,
      n = e?.querySelector<HTMLElement>(`[aria-checked="true"]`);
    if (!e || !t || !n) return;
    let r = () => {
      (pillReadyRef.current || (t.style.transition = `none`),
        (t.style.width = `${n.offsetWidth}px`),
        (t.style.height = `${n.offsetHeight}px`),
        (t.style.transform = `translate(${n.offsetLeft}px, ${n.offsetTop}px)`),
        (t.style.opacity = `1`),
        (pillReadyRef.current ||= (t.offsetWidth, (t.style.transition = ``), true)));
    };
    r();
    let i = new ResizeObserver(r);
    return (i.observe(e), () => i.disconnect());
  }, [resolvedPeriod, periods?.length]);
  let selectPeriod = (id: string) => {
      (period === void 0 && setLocalPeriod(id), onPeriodChange?.(id));
    },
    handlePeriodKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (event) => {
      if (!periods?.length) return;
      let index = periods.findIndex((e) => e.id === resolvedPeriod),
        nextIndex =
          event.key === `ArrowRight` || event.key === `ArrowDown`
            ? index + 1
            : event.key === `ArrowLeft` || event.key === `ArrowUp`
              ? index - 1
              : event.key === `Home`
                ? 0
                : event.key === `End`
                  ? periods.length - 1
                  : null;
      if (nextIndex === null) return;
      event.preventDefault();
      let nextPeriod = periods[(nextIndex + periods.length) % periods.length];
      (selectPeriod(nextPeriod.id),
        requestAnimationFrame(() =>
          switchRef.current?.querySelector<HTMLElement>(`[aria-checked="true"]`)?.focus(),
        ));
    },
    activeItem = activeKey ? rankedRows.find((e) => e.key === activeKey) : void 0,
    shareOf = (key: string | number) => ((animated[key] ?? 0) / animatedTotal) * 100,
    deltaUp = (delta ?? 0) >= 0;
  return (
    <div
      className={[`ui-cbc`, className].filter(Boolean).join(` `)}
      role={`group`}
      aria-labelledby={`${instanceId}-title`}
    >
      <style href={`ui-compact-breakdown-clean`} precedence={`default`}>
        {cleanCompactBreakdownStyles}
      </style>
      <div className={`ui-cbc__body`}>
        <header className={`ui-cbc__head`}>
          <h3 id={`${instanceId}-title`} className={`ui-cbc__title`}>
            {title}
          </h3>
          {periods && periods.length > 1 && (
            <div
              ref={switchRef}
              className={`ui-cbc__switch`}
              role={`radiogroup`}
              aria-label={`Period`}
              onKeyDown={handlePeriodKeyDown}
            >
              <span ref={pillRef} className={`ui-cbc__pill`} aria-hidden={`true`} />
              {periods.map((e) => (
                <button
                  type={`button`}
                  role={`radio`}
                  aria-checked={e.id === resolvedPeriod}
                  tabIndex={e.id === resolvedPeriod ? 0 : -1}
                  className={`ui-cbc__option`}
                  onClick={() => selectPeriod(e.id)}
                  key={e.id}
                >
                  {e.label}
                </button>
              ))}
            </div>
          )}
        </header>
        <div className={`ui-cbc__figure`}>
          <p className={`ui-cbc__big`} aria-hidden={`true`}>
            {format(animated[`#figure`] ?? 0)}
          </p>
          {delta !== void 0 && !activeItem && (
            <span
              className={`ui-cbc__delta`}
              data-up={deltaUp || void 0}
              key={`${resolvedPeriod}-${delta}`}
            >
              <svg viewBox={`0 0 12 12`} aria-hidden={`true`}>
                <path
                  d={deltaUp ? `M6 9.5v-7M2.8 5.6 6 2.4l3.2 3.2` : `M6 2.5v7M2.8 6.4 6 9.6l3.2-3.2`}
                />
              </svg>
              {Math.abs(delta).toLocaleString(`en-US`, {
                maximumFractionDigits: 1,
              })}
              {`%`}
            </span>
          )}
        </div>
        <p className={`ui-cbc__caption`} aria-hidden={`true`}>
          <span className={`ui-cbc__caption-in`} key={activeItem?.key ?? `#total`}>
            {activeItem ? (
              <>
                <i
                  className={`ui-cbc__swatch`}
                  style={{
                    background: activeItem.color,
                  }}
                />
                {activeItem.label}
                {` · `}
                {shareOf(activeItem.key).toFixed(0)}
                {`%`}
              </>
            ) : (
              totalLabel
            )}
          </span>
        </p>
        <p className={`ui-cbc__sr`}>
          {totalLabel}
          {`: `}
          {format(total)}
          {delta === void 0
            ? ``
            : `, ${deltaUp ? `up` : `down`} ${Math.abs(delta)}% against the previous period`}
        </p>
        <div
          className={`ui-cbc__bar`}
          data-active={activeKey ? `` : void 0}
          aria-hidden={`true`}
          onPointerLeave={() => setHoveredKey(null)}
        >
          {registryRef.current.map((e) => {
            let t = shareOf(e.key);
            return t > 0.05 ? (
              <span
                className={`ui-cbc__seg`}
                data-active={e.key === activeKey || void 0}
                style={{
                  flexGrow: t,
                  background: e.color,
                }}
                onPointerEnter={() => valueMap.has(e.key) && setHoveredKey(e.key)}
                key={e.key}
              />
            ) : null;
          })}
        </div>
        <ul
          className={`ui-cbc__list`}
          data-active={activeKey ? `` : void 0}
          onPointerLeave={() => setHoveredKey(null)}
        >
          {rankedRows.map((e) => (
            <li
              ref={(t) => {
                t ? rowRefs.current.set(e.key, t) : rowRefs.current.delete(e.key);
              }}
              className={`ui-cbc__row`}
              data-leaving={e.leaving || void 0}
              key={e.key}
            >
              <div
                className={`ui-cbc__item`}
                tabIndex={e.leaving ? -1 : 0}
                data-active={e.key === activeKey || void 0}
                onPointerEnter={() => !e.leaving && setHoveredKey(e.key)}
                onFocus={() => !e.leaving && setHoveredKey(e.key)}
                onBlur={() => setHoveredKey(null)}
              >
                <i
                  className={`ui-cbc__swatch`}
                  style={{
                    background: e.color,
                  }}
                />
                <span className={`ui-cbc__label`}>{e.label}</span>
                <span className={`ui-cbc__value`}>{format(animated[e.key] ?? 0)}</span>
                <span className={`ui-cbc__share`}>
                  {shareOf(e.key).toFixed(0)}
                  {`%`}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {footer !== null && (
        <div className={`ui-cbc__foot`}>
          {footer ??
            (leader && (
              <span className={`ui-cbc__foot-in`} key={leader.key}>
                {`Largest: `}
                <b>{leader.label}</b>
              </span>
            ))}
        </div>
      )}
    </div>
  );
}
var cleanCompactBreakdownStyles = `
/* Colors and motion as variables – override them on .ui-cbc */
.ui-cbc {
  --ui-cbc-card: #ffffff;
  --ui-cbc-ink: rgba(0, 0, 0, 0.88);
  --ui-cbc-strong: #000000;
  --ui-cbc-text: rgba(0, 0, 0, 0.61);
  --ui-cbc-muted: rgba(0, 0, 0, 0.45);
  --ui-cbc-faint: rgba(0, 0, 0, 0.27);
  --ui-cbc-line: rgba(0, 0, 0, 0.06);
  --ui-cbc-wash: rgba(0, 0, 0, 0.03);
  --ui-cbc-fill: rgba(0, 0, 0, 0.06);
  --ui-cbc-up: #1a9a52;
  --ui-cbc-up-bg: rgba(26, 154, 82, 0.08);
  --ui-cbc-down: #e5484d;
  --ui-cbc-down-bg: rgba(229, 72, 77, 0.08);
  /* Parts: the accent blue, then lighter tints of it, then a gray */
  --ui-cbc-c1: rgba(0, 96, 226, 0.765);
  --ui-cbc-c2: rgba(0, 96, 226, 0.5);
  --ui-cbc-c3: rgba(0, 96, 226, 0.32);
  --ui-cbc-c4: rgba(0, 96, 226, 0.18);
  --ui-cbc-c5: rgba(0, 0, 0, 0.14);
  /* Strokes are shadows: a 0.5px hairline plus a soft lift */
  --ui-cbc-shadow: 0 0 0 0.5px rgba(0, 0, 0, 0.06), 0 1px 1px -1px rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --ui-cbc-focus: rgba(0, 96, 226, 0.35);
  --ui-cbc-ease: cubic-bezier(0.22, 1, 0.36, 1);
  --ui-cbc-snap: cubic-bezier(0.25, 0.9, 0.3, 1);
  box-sizing: border-box;
  container-type: inline-size;
  display: grid;
  width: 100%;
  max-width: 360px;
  overflow: hidden;
  border-radius: 10px;
  background: var(--ui-cbc-card);
  box-shadow: var(--ui-cbc-shadow);
  font-family: "Inter", "InterVariable", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  font-size: 13px;
  line-height: 20px;
  font-weight: 400;
  color: var(--ui-cbc-ink);
  -webkit-font-smoothing: antialiased;
}
.ui-cbc *, .ui-cbc *::before, .ui-cbc *::after { box-sizing: border-box; }
:where(.ui-cbc) button { margin: 0; padding: 0; border: 0; background: none; font: inherit; color: inherit; cursor: pointer; }
:where(.ui-cbc) :is(h3, p, ul) { margin: 0; padding: 0; }
:where(.ui-cbc) ul { list-style: none; }
:where(.ui-cbc) svg { display: block; flex: none; }
.ui-cbc :is(button, [tabindex="0"]):focus-visible { outline: 2px solid var(--ui-cbc-focus); outline-offset: 1px; }
.ui-cbc b { font-weight: 500; color: var(--ui-cbc-ink); }
.ui-cbc__sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }

.ui-cbc__body { padding: 16px 16px 10px; }

/* Head: title, the period switch on the right */
.ui-cbc__head { display: flex; align-items: center; justify-content: space-between; gap: 12px; min-height: 28px; }
.ui-cbc__title { overflow: hidden; font-size: 15px; font-weight: 500; line-height: 24px; color: var(--ui-cbc-strong); white-space: nowrap; text-overflow: ellipsis; }
/* The "button switch": separate chips with a hairline; the light-gray fill slides to the chosen one */
.ui-cbc__switch { position: relative; display: grid; grid-auto-columns: auto; grid-auto-flow: column; gap: 4px; flex: none; }
.ui-cbc__pill {
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 6px;
  background: var(--ui-cbc-fill);
  opacity: 0;
  pointer-events: none;
  transition: transform 200ms var(--ui-cbc-snap), width 200ms var(--ui-cbc-snap);
}
.ui-cbc__option {
  position: relative;
  z-index: 1;
  height: 28px;
  padding: 4px 10px;
  border-radius: 6px;
  box-shadow: inset 0 0 0 0.5px var(--ui-cbc-line);
  font-size: 13px;
  font-weight: 500;
  line-height: 20px;
  color: var(--ui-cbc-text);
  white-space: nowrap;
  transition: color 90ms ease, background-color 90ms ease;
}
.ui-cbc__option[aria-checked="true"] { color: var(--ui-cbc-ink); }
@media (hover: hover) {
  .ui-cbc__option[aria-checked="false"]:hover { background: var(--ui-cbc-wash); }
}

/* The big number and the change against the period before */
.ui-cbc__figure { display: flex; align-items: center; gap: 8px; margin-top: 14px; }
.ui-cbc__big { font-size: 24px; font-weight: 500; line-height: 32px; letter-spacing: -0.02em; color: var(--ui-cbc-strong); font-variant-numeric: tabular-nums; }
.ui-cbc__delta {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  height: 20px;
  padding: 0 6px 0 4px;
  border-radius: 5px;
  background: var(--ui-cbc-down-bg);
  color: var(--ui-cbc-down);
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
  font-variant-numeric: tabular-nums;
  animation: ui-cbc-pop 380ms var(--ui-cbc-ease) both;
}
.ui-cbc__delta[data-up] { background: var(--ui-cbc-up-bg); color: var(--ui-cbc-up); }
.ui-cbc__delta svg { width: 12px; height: 12px; fill: none; stroke: currentColor; stroke-width: 1.3; stroke-linecap: round; stroke-linejoin: round; }
.ui-cbc__caption { height: 16px; overflow: hidden; font-size: 12px; line-height: 16px; color: var(--ui-cbc-muted); font-variant-numeric: tabular-nums; }
.ui-cbc__caption-in { display: inline-flex; align-items: center; gap: 6px; animation: ui-cbc-in 260ms var(--ui-cbc-ease) both; }

/* The stacked bar – parts keep their place and color, only the widths glide */
.ui-cbc__bar { display: flex; gap: 2px; height: 6px; margin-top: 16px; padding: 0; border-radius: 3px; }
/* Shares as flex-grow, so the 2px gaps come out of the bar instead of making it wider than the card */
.ui-cbc__seg { flex: 0 1 0; height: 100%; min-width: 2px; border-radius: 1.5px; transition: opacity 160ms ease, transform 200ms var(--ui-cbc-ease); }
.ui-cbc__seg:first-child { border-radius: 3px 1.5px 1.5px 3px; }
.ui-cbc__seg:last-child { border-radius: 1.5px 3px 3px 1.5px; }
.ui-cbc__bar[data-active] .ui-cbc__seg:not([data-active]) { opacity: 0.3; }
.ui-cbc__seg[data-active] { transform: scaleY(1.5); }

/* The ranked list */
.ui-cbc__list { position: relative; display: grid; margin-top: 10px; }
.ui-cbc__row { display: grid; grid-template-rows: 1fr; transition: grid-template-rows 320ms var(--ui-cbc-ease), opacity 200ms ease; }
.ui-cbc__row[data-leaving] { grid-template-rows: 0fr; opacity: 0; pointer-events: none; }
.ui-cbc__item {
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 0;
  height: 32px;
  margin: 0 -8px;
  padding: 0 8px;
  overflow: hidden;
  border-radius: 6px;
  cursor: default;
  /* The hover wash is short and crisp – no long glide between rows */
  transition: background-color 90ms ease-out, opacity 160ms ease;
}
.ui-cbc__item[data-active] { background: var(--ui-cbc-wash); }
.ui-cbc__list[data-active] .ui-cbc__item:not([data-active]) { opacity: 0.45; }
.ui-cbc__swatch { flex: none; width: 8px; height: 8px; border-radius: 2px; }
.ui-cbc__label { flex: 1; min-width: 0; overflow: hidden; color: var(--ui-cbc-ink); white-space: nowrap; text-overflow: ellipsis; }
.ui-cbc__value { color: var(--ui-cbc-ink); font-weight: 500; font-variant-numeric: tabular-nums; }
.ui-cbc__share { width: 34px; font-size: 12px; line-height: 16px; text-align: right; color: var(--ui-cbc-muted); font-variant-numeric: tabular-nums; }

/* The last row inside the card */
.ui-cbc__foot {
  display: flex;
  align-items: center;
  min-height: 40px;
  padding: 0 16px;
  overflow: hidden;
  border-top: 0.5px solid var(--ui-cbc-line);
  font-size: 12px;
  line-height: 16px;
  color: var(--ui-cbc-muted);
  white-space: nowrap;
}
.ui-cbc__foot-in { overflow: hidden; text-overflow: ellipsis; animation: ui-cbc-in 320ms var(--ui-cbc-ease) both; }

@keyframes ui-cbc-in {
  from { opacity: 0; transform: translateY(4px); filter: blur(2px); }
  to { opacity: 1; transform: none; filter: none; }
}
@keyframes ui-cbc-pop {
  from { opacity: 0; transform: scale(0.85); }
  to { opacity: 1; transform: none; }
}

/* Narrow cards: tighter chips, then the share column goes and the values stay */
@container (max-width: 320px) {
  .ui-cbc__body { padding: 14px 14px 8px; }
  .ui-cbc__foot { padding: 0 14px; }
  .ui-cbc__switch { gap: 2px; }
  .ui-cbc__option { padding: 4px 8px; }
}
@container (max-width: 250px) {
  .ui-cbc__share { display: none; }
  .ui-cbc__option { padding: 4px 6px; }
}
@media (hover: none) and (pointer: coarse) {
  .ui-cbc__option { height: 32px; padding: 6px 10px; }
  .ui-cbc__item { height: 40px; }
  .ui-cbc__foot { min-height: 44px; }
}

@media (prefers-reduced-motion: reduce) {
  .ui-cbc *, .ui-cbc *::before, .ui-cbc *::after { animation: none !important; transition: none !important; }
}

/* Dark mode: follows a .dark class or data-theme="dark" on any ancestor, e.g. <html> */
:where(.dark, [data-theme="dark"]) .ui-cbc {
  --ui-cbc-card: #1c1c1e;
  --ui-cbc-ink: rgba(255, 255, 255, 0.9);
  --ui-cbc-strong: #ffffff;
  --ui-cbc-text: rgba(255, 255, 255, 0.62);
  --ui-cbc-muted: rgba(255, 255, 255, 0.46);
  --ui-cbc-faint: rgba(255, 255, 255, 0.3);
  --ui-cbc-line: rgba(255, 255, 255, 0.08);
  --ui-cbc-wash: rgba(255, 255, 255, 0.04);
  --ui-cbc-fill: rgba(255, 255, 255, 0.08);
  --ui-cbc-up: #3ec27a;
  --ui-cbc-up-bg: rgba(62, 194, 122, 0.14);
  --ui-cbc-down: #ff6b70;
  --ui-cbc-down-bg: rgba(229, 72, 77, 0.14);
  --ui-cbc-c1: #4d8dff;
  --ui-cbc-c2: rgba(77, 141, 255, 0.62);
  --ui-cbc-c3: rgba(77, 141, 255, 0.4);
  --ui-cbc-c4: rgba(77, 141, 255, 0.22);
  --ui-cbc-c5: rgba(255, 255, 255, 0.16);
  --ui-cbc-shadow: 0 0 0 0.5px rgba(255, 255, 255, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.4);
  --ui-cbc-focus: rgba(77, 141, 255, 0.5);
}
`;
var cleanPeriods = [
  {
    id: `7d`,
    label: `7d`,
  },
  {
    id: `30d`,
    label: `30d`,
  },
  {
    id: `90d`,
    label: `90d`,
  },
];
var cleanRevenueData: Record<
  string,
  {
    delta: number;
    items: BreakdownItem[];
  }
> = {
  "7d": {
    delta: 12.4,
    items: [
      {
        label: `Direct`,
        value: 4820,
      },
      {
        label: `Organic search`,
        value: 3910,
      },
      {
        label: `Referrals`,
        value: 2240,
      },
      {
        label: `Social`,
        value: 1680,
      },
      {
        label: `Email`,
        value: 940,
      },
    ],
  },
  "30d": {
    delta: 8.1,
    items: [
      {
        label: `Organic search`,
        value: 18400,
      },
      {
        label: `Direct`,
        value: 16900,
      },
      {
        label: `Social`,
        value: 9800,
      },
      {
        label: `Referrals`,
        value: 7300,
      },
      {
        label: `Email`,
        value: 5200,
      },
    ],
  },
  "90d": {
    delta: -3.2,
    items: [
      {
        label: `Organic search`,
        value: 51200,
      },
      {
        label: `Social`,
        value: 38600,
      },
      {
        label: `Direct`,
        value: 36100,
      },
      {
        label: `Email`,
        value: 21400,
      },
      {
        label: `Referrals`,
        value: 16900,
      },
    ],
  },
};
var cleanFormatCurrency: (value: number) => string = (value) =>
  `$${Math.round(value).toLocaleString(`en-US`)}`;
function CompactBreakdownCleanDemo2() {
  let [period, setPeriod] = React.useState<string>(`7d`),
    pausedRef = React.useRef(false);
  React.useEffect(() => {
    let e = window.setInterval(() => {
      pausedRef.current ||
        setPeriod(
          (e) =>
            cleanPeriods[(cleanPeriods.findIndex((t) => t.id === e) + 1) % cleanPeriods.length].id,
        );
    }, 2800);
    return () => window.clearInterval(e);
  }, []);
  let pause: () => void = () => (pausedRef.current = true);
  return (
    <div
      className={`cb-demo`}
      onPointerEnter={pause}
      onPointerDownCapture={pause}
      onKeyDownCapture={pause}
      onFocusCapture={pause}
    >
      <CompactBreakdownClean
        title={`Revenue by channel`}
        periods={cleanPeriods}
        period={period}
        onPeriodChange={setPeriod}
        items={cleanRevenueData[period].items}
        delta={cleanRevenueData[period].delta}
        format={cleanFormatCurrency}
        totalLabel={`Total revenue`}
      />
    </div>
  );
}
const demoStyles =
  ".cb-demo{grid-template-columns:minmax(0,360px);place-content:center;width:100%;display:grid}.card__preview .cb-demo{grid-template-columns:auto;place-content:center;position:absolute;inset:40px 0 18px}.card__preview .cb-demo .ui-cb{zoom:.54;width:340px;max-width:none}.stage:has(.cb-demo){height:480px}@media (width<=760px){.stage:has(.cb-demo){align-items:start;height:520px;padding:120px 16px 24px}}.card__preview .cb-demo .ui-cbc{zoom:.47;width:340px;max-width:none}\n";
function CompactBreakdownCleanDemo(props: React.JSX.IntrinsicAttributes) {
  return (
    <>
      <style href="plico-demo-compact-breakdown-clean" precedence="default">
        {demoStyles}
      </style>
      <CompactBreakdownCleanDemo2 {...props} />
    </>
  );
}
export { CompactBreakdownClean };
export { CompactBreakdownCleanDemo };
export { CompactBreakdownClean as Component };
export { CompactBreakdownCleanDemo as Demo };
export default CompactBreakdownClean;
export type { CompactBreakdownCleanProps };
export type { BreakdownItem };

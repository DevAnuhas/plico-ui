"use client";

import * as React from "react";
type BreakdownItem = {
  id?: string;
  key?: string;
  label: string;
  value: number;
  color?: string;
};
interface CompactBreakdownProps {
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
var formatNumber = (value: number | bigint) =>
  new Intl.NumberFormat(`en-US`, {
    maximumFractionDigits: 0,
  }).format(value);
var defaultPalette = [
  `var(--ui-cb-c1)`,
  `var(--ui-cb-c2)`,
  `var(--ui-cb-c3)`,
  `var(--ui-cb-c4)`,
  `var(--ui-cb-c5)`,
];
var motionEase = `cubic-bezier(0.22, 1, 0.36, 1)`;
var easeOutQuart = (value: number) => 1 - (1 - value) ** 4;
var prefersReducedMotion = () =>
  typeof window < `u` && window.matchMedia(`(prefers-reduced-motion: reduce)`).matches;
var itemKey = (item: BreakdownItem) => item.id ?? item.label;
function useAnimatedNumbers(
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
      if (prefersReducedMotion()) {
        ((currentRef.current = e), setValues(e));
        return;
      }
      let i = mountedRef.current ? updateDuration : initialDuration;
      mountedRef.current = true;
      let d = performance.now(),
        f = 0,
        p = (t: number) => {
          let r = Math.min(1, (t - d) / i),
            c = easeOutQuart(r),
            l: Record<string, number> = {};
          for (let t in e) l[t] = (n[t] ?? 0) + (e[t] - (n[t] ?? 0)) * c;
          ((currentRef.current = l), setValues(l), r < 1 && (f = requestAnimationFrame(p)));
        };
      return ((f = requestAnimationFrame(p)), () => cancelAnimationFrame(f));
    }, [serialized]),
    values
  );
}
function CompactBreakdown({
  title = `Breakdown`,
  items: items,
  periods: periods,
  period: period,
  defaultPeriod: defaultPeriod,
  onPeriodChange: onPeriodChange,
  delta: delta,
  format = formatNumber,
  totalLabel = `Total`,
  footer: footer,
  className: className,
}: CompactBreakdownProps) {
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
    let t = itemKey(e),
      n = registryRef.current.find((e) => e.key === t);
    n
      ? ((n.label = e.label), e.color && (n.color = e.color))
      : registryRef.current.push({
          key: t,
          label: e.label,
          color: e.color ?? defaultPalette[registryRef.current.length] ?? `var(--ui-cb-c5)`,
        });
  }
  let valueMap = new Map(items.map((e) => [itemKey(e), Math.max(0, e.value)])),
    total = [...valueMap.values()].reduce((e, t) => e + t, 0),
    activeKey = hoveredKey !== null && valueMap.has(hoveredKey) ? hoveredKey : null,
    animationTargets: Record<string, number> = {
      "#total": total,
      "#figure": activeKey ? (valueMap.get(activeKey) ?? 0) : total,
    };
  for (let e of registryRef.current) animationTargets[e.key] = valueMap.get(e.key) ?? 0;
  let animated = useAnimatedNumbers(animationTargets, 900, 620),
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
      prefersReducedMotion() ||
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
                easing: motionEase,
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
      className={[`ui-cb`, className].filter(Boolean).join(` `)}
      role={`group`}
      aria-labelledby={`${instanceId}-title`}
    >
      <style href={`ui-compact-breakdown`} precedence={`default`}>
        {compactBreakdownStyles}
      </style>
      <div className={`ui-cb__card`}>
        <header className={`ui-cb__head`}>
          <h3 id={`${instanceId}-title`} className={`ui-cb__title`}>
            {title}
          </h3>
          {periods && periods.length > 1 && (
            <div
              ref={switchRef}
              className={`ui-cb__switch`}
              role={`radiogroup`}
              aria-label={`Period`}
              onKeyDown={handlePeriodKeyDown}
            >
              <span ref={pillRef} className={`ui-cb__pill`} aria-hidden={`true`} />
              {periods.map((e) => (
                <button
                  type={`button`}
                  role={`radio`}
                  aria-checked={e.id === resolvedPeriod}
                  tabIndex={e.id === resolvedPeriod ? 0 : -1}
                  className={`ui-cb__option`}
                  onClick={() => selectPeriod(e.id)}
                  key={e.id}
                >
                  {e.label}
                </button>
              ))}
            </div>
          )}
        </header>
        <div className={`ui-cb__figure`}>
          <p className={`ui-cb__big`} aria-hidden={`true`}>
            {format(animated[`#figure`] ?? 0)}
          </p>
          {delta !== void 0 && !activeItem && (
            <span
              className={`ui-cb__delta`}
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
        <p className={`ui-cb__caption`} aria-hidden={`true`}>
          <span className={`ui-cb__caption-in`} key={activeItem?.key ?? `#total`}>
            {activeItem ? (
              <>
                <i
                  className={`ui-cb__swatch`}
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
        <p className={`ui-cb__sr`}>
          {totalLabel}
          {`: `}
          {format(total)}
          {delta === void 0
            ? ``
            : `, ${deltaUp ? `up` : `down`} ${Math.abs(delta)}% against the previous period`}
        </p>
        <div
          className={`ui-cb__bar`}
          data-active={activeKey ? `` : void 0}
          aria-hidden={`true`}
          onPointerLeave={() => setHoveredKey(null)}
        >
          {registryRef.current.map((e) => {
            let t = shareOf(e.key);
            return t > 0.05 ? (
              <span
                className={`ui-cb__seg`}
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
          className={`ui-cb__list`}
          data-active={activeKey ? `` : void 0}
          onPointerLeave={() => setHoveredKey(null)}
        >
          {rankedRows.map((e) => (
            <li
              ref={(t) => {
                t ? rowRefs.current.set(e.key, t) : rowRefs.current.delete(e.key);
              }}
              className={`ui-cb__row`}
              data-leaving={e.leaving || void 0}
              key={e.key}
            >
              <div
                className={`ui-cb__item`}
                tabIndex={e.leaving ? -1 : 0}
                data-active={e.key === activeKey || void 0}
                onPointerEnter={() => !e.leaving && setHoveredKey(e.key)}
                onFocus={() => !e.leaving && setHoveredKey(e.key)}
                onBlur={() => setHoveredKey(null)}
              >
                <i
                  className={`ui-cb__swatch`}
                  style={{
                    background: e.color,
                  }}
                />
                <span className={`ui-cb__label`}>{e.label}</span>
                <span className={`ui-cb__value`}>{format(animated[e.key] ?? 0)}</span>
                <span className={`ui-cb__share`}>
                  {shareOf(e.key).toFixed(0)}
                  {`%`}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {footer !== null && (
        <div className={`ui-cb__foot`}>
          {footer ??
            (leader && (
              <span className={`ui-cb__foot-in`} key={leader.key}>
                {`Largest: `}
                <b>{leader.label}</b>
              </span>
            ))}
        </div>
      )}
    </div>
  );
}
var compactBreakdownStyles = `
/* Colors and motion as variables – override them on .ui-cb */
.ui-cb {
  --ui-cb-tray: #f0f0f0;
  --ui-cb-card: #ffffff;
  --ui-cb-line: #ececec;
  --ui-cb-ink: #171717;
  --ui-cb-text: #404040;
  --ui-cb-muted: #8f8f8f;
  --ui-cb-well: #f4f4f5;
  --ui-cb-hover: #f4f4f5;
  --ui-cb-up: #18794e;
  --ui-cb-up-bg: rgba(34, 160, 90, 0.1);
  --ui-cb-down: #b42318;
  --ui-cb-down-bg: rgba(220, 60, 60, 0.08);
  --ui-cb-c1: #2f6bff;
  --ui-cb-c2: #74a0ff;
  --ui-cb-c3: #b4cbff;
  --ui-cb-c4: #a8a8ae;
  --ui-cb-c5: #d4d4d8;
  --ui-cb-focus: rgba(23, 23, 23, 0.22);
  --ui-cb-ease: cubic-bezier(0.22, 1, 0.36, 1);
  box-sizing: border-box;
  container-type: inline-size;
  display: grid;
  width: 100%;
  max-width: 360px;
  padding: 4px;
  border-radius: 20px;
  background: var(--ui-cb-tray);
  font-family: "Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  font-size: 13px;
  line-height: 1.45;
  color: var(--ui-cb-text);
  -webkit-font-smoothing: antialiased;
}
.ui-cb *, .ui-cb *::before, .ui-cb *::after { box-sizing: border-box; }
:where(.ui-cb) button { margin: 0; padding: 0; border: 0; background: none; font: inherit; color: inherit; cursor: pointer; }
:where(.ui-cb) :is(h3, p, ul) { margin: 0; padding: 0; }
:where(.ui-cb) ul { list-style: none; }
.ui-cb :is(button, [tabindex="0"]):focus-visible { outline: 2px solid var(--ui-cb-focus); outline-offset: 2px; }
.ui-cb b { font-weight: 500; color: var(--ui-cb-ink); }
.ui-cb__sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }

.ui-cb__card { border-radius: 16px; background: var(--ui-cb-card); box-shadow: 0 0 0 1px var(--ui-cb-line), 0 1px 2px rgba(0, 0, 0, 0.04); padding: 12px 14px 8px; }

/* Head: title, the period switch on the right */
.ui-cb__head { display: flex; align-items: center; justify-content: space-between; gap: 10px; min-height: 30px; }
.ui-cb__title { overflow: hidden; font-size: 13.5px; font-weight: 600; line-height: 20px; color: var(--ui-cb-ink); white-space: nowrap; text-overflow: ellipsis; }
.ui-cb__switch { position: relative; display: grid; grid-auto-columns: auto; grid-auto-flow: column; flex: none; padding: 2px; border-radius: 10px; background: var(--ui-cb-well); box-shadow: inset 0 0 0 1px var(--ui-cb-line); }
.ui-cb__pill {
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 8px;
  background: var(--ui-cb-card);
  box-shadow: 0 0 0 1px var(--ui-cb-line), 0 1px 2px rgba(0, 0, 0, 0.06);
  opacity: 0;
  pointer-events: none;
  transition: transform 420ms var(--ui-cb-ease), width 420ms var(--ui-cb-ease);
}
.ui-cb__option { position: relative; z-index: 1; height: 24px; padding: 0 8px; border-radius: 8px; font-size: 12px; font-weight: 500; color: var(--ui-cb-muted); white-space: nowrap; transition: color 200ms ease; }
.ui-cb__option:hover, .ui-cb__option[aria-checked="true"] { color: var(--ui-cb-ink); }

/* The big number and the change against the period before */
.ui-cb__figure { display: flex; align-items: center; gap: 8px; margin-top: 12px; }
.ui-cb__big { font-size: 26px; font-weight: 600; line-height: 32px; letter-spacing: -0.02em; color: var(--ui-cb-ink); font-variant-numeric: tabular-nums; }
.ui-cb__delta {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  height: 20px;
  padding: 0 6px 0 4px;
  border-radius: 999px;
  background: var(--ui-cb-down-bg);
  color: var(--ui-cb-down);
  font-size: 12px;
  font-weight: 500;
  font-variant-numeric: tabular-nums;
  animation: ui-cb-pop 380ms var(--ui-cb-ease) both;
}
.ui-cb__delta[data-up] { background: var(--ui-cb-up-bg); color: var(--ui-cb-up); }
.ui-cb__delta svg { width: 12px; height: 12px; fill: none; stroke: currentColor; stroke-width: 1.6; stroke-linecap: round; stroke-linejoin: round; }
.ui-cb__caption { height: 18px; overflow: hidden; font-size: 12.5px; line-height: 18px; color: var(--ui-cb-muted); font-variant-numeric: tabular-nums; }
.ui-cb__caption-in { display: inline-flex; align-items: center; gap: 6px; animation: ui-cb-in 260ms var(--ui-cb-ease) both; }

/* The stacked bar – parts keep their place and color, only the widths glide */
.ui-cb__bar { display: flex; gap: 2px; height: 8px; margin-top: 12px; padding: 0; border-radius: 4px; }
/* Shares as flex-grow, so the 2px gaps come out of the bar instead of making it wider than the card */
.ui-cb__seg { flex: 0 1 0; height: 100%; min-width: 2px; border-radius: 2.5px; transition: opacity 200ms ease, transform 260ms var(--ui-cb-ease); }
.ui-cb__seg:first-child { border-radius: 4px 2.5px 2.5px 4px; }
.ui-cb__seg:last-child { border-radius: 2.5px 4px 4px 2.5px; }
.ui-cb__bar[data-active] .ui-cb__seg:not([data-active]) { opacity: 0.25; }
.ui-cb__seg[data-active] { transform: scaleY(1.5); }

/* The ranked list */
.ui-cb__list { position: relative; display: grid; margin-top: 8px; }
.ui-cb__row { display: grid; grid-template-rows: 1fr; transition: grid-template-rows 320ms var(--ui-cb-ease), opacity 200ms ease; }
.ui-cb__row[data-leaving] { grid-template-rows: 0fr; opacity: 0; pointer-events: none; }
.ui-cb__item { display: flex; align-items: center; gap: 9px; min-height: 0; height: 30px; margin: 0 -8px; padding: 0 8px; overflow: hidden; border-radius: 8px; cursor: default; transition: background-color 160ms ease, opacity 200ms ease; }
.ui-cb__item[data-active] { background: var(--ui-cb-hover); }
.ui-cb__list[data-active] .ui-cb__item:not([data-active]) { opacity: 0.45; }
.ui-cb__swatch { flex: none; width: 8px; height: 8px; border-radius: 2.5px; }
.ui-cb__label { flex: 1; min-width: 0; overflow: hidden; color: var(--ui-cb-text); white-space: nowrap; text-overflow: ellipsis; }
.ui-cb__value { color: var(--ui-cb-ink); font-weight: 500; font-variant-numeric: tabular-nums; }
.ui-cb__share { width: 34px; text-align: right; color: var(--ui-cb-muted); font-variant-numeric: tabular-nums; }

/* The line on the gray tray */
.ui-cb__foot { display: flex; align-items: center; min-height: 34px; padding: 4px 10px 0; overflow: hidden; font-size: 12.5px; color: var(--ui-cb-muted); white-space: nowrap; }
.ui-cb__foot-in { overflow: hidden; text-overflow: ellipsis; animation: ui-cb-in 320ms var(--ui-cb-ease) both; }

@keyframes ui-cb-in {
  from { opacity: 0; transform: translateY(5px); filter: blur(2px); }
  to { opacity: 1; transform: none; filter: none; }
}
@keyframes ui-cb-pop {
  from { opacity: 0; transform: scale(0.85); }
  to { opacity: 1; transform: none; }
}

/* Narrow cards: the share column goes, the values stay */
@container (max-width: 250px) {
  .ui-cb__share { display: none; }
  .ui-cb__option { padding: 0 6px; }
}
@media (hover: none) and (pointer: coarse) {
  .ui-cb__option { height: 32px; padding: 0 10px; }
  .ui-cb__item { height: 36px; }
}

@media (prefers-reduced-motion: reduce) {
  .ui-cb *, .ui-cb *::before, .ui-cb *::after { animation: none !important; transition: none !important; }
}

/* Dark mode: follows a .dark class or data-theme="dark" on any ancestor, e.g. <html> */
:where(.dark, [data-theme="dark"]) .ui-cb {
  --ui-cb-tray: #111113;
  --ui-cb-card: #19191b;
  --ui-cb-line: #2a2a2e;
  --ui-cb-ink: #ededed;
  --ui-cb-text: #c8c8cc;
  --ui-cb-muted: #8b8b92;
  --ui-cb-well: #222225;
  --ui-cb-hover: #222225;
  --ui-cb-up: #6ee7a8;
  --ui-cb-up-bg: rgba(110, 231, 168, 0.12);
  --ui-cb-down: #ff8a80;
  --ui-cb-down-bg: rgba(255, 138, 128, 0.12);
  --ui-cb-c1: #5b8cff;
  --ui-cb-c2: #3d63c9;
  --ui-cb-c3: #2c4388;
  --ui-cb-c4: #6b6b73;
  --ui-cb-c5: #3d3d42;
  --ui-cb-focus: rgba(255, 255, 255, 0.3);
}
:where(.dark, [data-theme="dark"]) .ui-cb__pill { background: #2a2a2e; box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.06); }
`;
var periods = [
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
var revenueData: Record<
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
var formatCurrency: (value: number) => string = (value) =>
  `$${Math.round(value).toLocaleString(`en-US`)}`;
function CompactBreakdownDemo2() {
  let [period, setPeriod] = React.useState<string>(`7d`),
    pausedRef = React.useRef(false);
  React.useEffect(() => {
    let e = window.setInterval(() => {
      pausedRef.current ||
        setPeriod((e) => periods[(periods.findIndex((t) => t.id === e) + 1) % periods.length].id);
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
      <CompactBreakdown
        title={`Revenue by channel`}
        periods={periods}
        period={period}
        onPeriodChange={setPeriod}
        items={revenueData[period].items}
        delta={revenueData[period].delta}
        format={formatCurrency}
        totalLabel={`Total revenue`}
      />
    </div>
  );
}
const demoStyles =
  ".cb-demo{grid-template-columns:minmax(0,360px);place-content:center;width:100%;display:grid}.card__preview .cb-demo{grid-template-columns:auto;place-content:center;position:absolute;inset:40px 0 18px}.card__preview .cb-demo .ui-cb{zoom:.54;width:340px;max-width:none}.stage:has(.cb-demo){height:480px}@media (width<=760px){.stage:has(.cb-demo){align-items:start;height:520px;padding:120px 16px 24px}}.card__preview .cb-demo .ui-cbc{zoom:.47;width:340px;max-width:none}\n";
function CompactBreakdownDemo(props: React.JSX.IntrinsicAttributes) {
  return (
    <>
      <style href="plico-demo-compact-breakdown" precedence="default">
        {demoStyles}
      </style>
      <CompactBreakdownDemo2 {...props} />
    </>
  );
}
export { CompactBreakdown };
export { CompactBreakdownDemo };
export { CompactBreakdown as Component };
export { CompactBreakdownDemo as Demo };
export default CompactBreakdown;
export type { BreakdownItem };
export type { CompactBreakdownProps };

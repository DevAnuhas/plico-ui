"use client";

import * as React from "react";
type KpiSeries = {
  label: string;
  color: string;
  values: number[];
} & {
  id?: string;
  name?: string;
};
interface KpiChartCleanProps {
  title?: string;
  value?: string;
  delta?: number;
  labels: string[];
  tooltipLabels?: string[];
  series: KpiSeries[];
  format?: (n: number) => string;
  footer?: string;
  defaultIndex?: number;
  className?: string;
}
var formatCleanCompactNumber = (value: number) =>
  Math.abs(value) >= 1e3
    ? `${+(value / 1e3).toFixed(Math.abs(value) >= 1e4 ? 0 : 1)}k`
    : `${Math.round(value)}`;
function cleanAxisCeiling(value: number) {
  let halfMaximum = value / 2 || 1,
    magnitude = 10 ** Math.floor(Math.log10(halfMaximum));
  return (
    ([1, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10].find((e) => e * magnitude >= halfMaximum) ?? 10) *
    magnitude *
    2
  );
}
function KpiChartClean({
  title: title,
  value: value,
  delta: delta,
  labels: labels,
  tooltipLabels: tooltipLabels,
  series: series,
  format = formatCleanCompactNumber,
  footer: footer,
  defaultIndex: defaultIndex,
  className: className,
}: KpiChartCleanProps) {
  let [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null),
    activeIndex = hoveredIndex ?? defaultIndex ?? null,
    [lastIndex, setLastIndex] = React.useState(activeIndex ?? 0);
  activeIndex !== null && activeIndex !== lastIndex && setLastIndex(activeIndex);
  let pointCount = labels.length,
    maximum = cleanAxisCeiling(Math.max(...series.flatMap((e) => e.values))),
    xPercent = (index: number) => (pointCount > 1 ? (index / (pointCount - 1)) * 100 : 50),
    yPercent = (value: number) => (1 - value / maximum) * 100,
    indexFromPointer = (event: React.PointerEvent<HTMLDivElement>) => {
      let rect = event.currentTarget.getBoundingClientRect(),
        percent = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
      return Math.round(percent * (pointCount - 1));
    },
    handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (event) => {
      let currentIndex = activeIndex ?? (event.key === `ArrowLeft` ? pointCount : -1);
      if (event.key === `ArrowRight`) setHoveredIndex(Math.min(pointCount - 1, currentIndex + 1));
      else if (event.key === `ArrowLeft`) setHoveredIndex(Math.max(0, currentIndex - 1));
      else if (event.key === `Escape`) setHoveredIndex(null);
      else return;
      event.preventDefault();
    },
    tooltipSeries = series
      .map((e) => ({
        ...e,
        value: e.values[lastIndex] ?? 0,
      }))
      .sort((e, t) => t.value - e.value),
    tooltipOnLeft = xPercent(lastIndex) > 50,
    labelIndices = [0, Math.round(pointCount / 2 - 0.5), pointCount - 1].filter(
      (e, t, n) => n.indexOf(e) === t,
    );
  return (
    <>
      <style href={`ui-kpi-chart-clean`} precedence={`default`}>
        {kpiChartCleanStyles}
      </style>
      <section className={[`ui-kpic`, className].filter(Boolean).join(` `)}>
        <div className={`ui-kpic__body`}>
          <h3 className={`ui-kpic__title`}>{title}</h3>
          <p className={`ui-kpic__value`}>
            {value}
            {delta !== void 0 && delta !== 0 && (
              <span className={`ui-kpic__delta`} data-trend={delta > 0 ? `up` : `down`}>
                {delta > 0 ? `+` : `−`}
                {format(Math.abs(delta))}
              </span>
            )}
          </p>
          <div className={`ui-kpic__chart`}>
            <div className={`ui-kpic__yaxis`} aria-hidden={`true`}>
              <span>{format(maximum)}</span>
              <span>{format(maximum / 2)}</span>
              <span>{format(0)}</span>
            </div>
            <div
              className={`ui-kpic__plot`}
              tabIndex={0}
              role={`group`}
              aria-label={`${title} chart – use the arrow keys to read the values per day`}
              onPointerMove={(e) => setHoveredIndex(indexFromPointer(e))}
              onPointerDown={(e) => setHoveredIndex(indexFromPointer(e))}
              onPointerLeave={() => setHoveredIndex(null)}
              onBlur={() => setHoveredIndex(null)}
              onKeyDown={handleKeyDown}
            >
              <span
                className={`ui-kpic__grid`}
                style={{
                  top: `0%`,
                }}
              />
              <span
                className={`ui-kpic__grid`}
                style={{
                  top: `50%`,
                }}
              />
              <span
                className={`ui-kpic__grid`}
                style={{
                  top: `100%`,
                }}
              />
              <svg
                className={`ui-kpic__lines`}
                viewBox={`0 0 100 100`}
                preserveAspectRatio={`none`}
                aria-hidden={`true`}
              >
                {series.map((e) => (
                  <polyline
                    points={e.values.map((e, t) => `${xPercent(t)},${yPercent(e)}`).join(` `)}
                    stroke={e.color}
                    vectorEffect={`non-scaling-stroke`}
                    key={e.label}
                  />
                ))}
              </svg>
              <div
                className={`ui-kpic__marker`}
                data-open={activeIndex !== null || void 0}
                aria-hidden={`true`}
              >
                <span
                  className={`ui-kpic__guide`}
                  style={{
                    left: `${xPercent(lastIndex)}%`,
                  }}
                />
                {series.map((e) => (
                  <span
                    className={`ui-kpic__dot`}
                    style={{
                      left: `${xPercent(lastIndex)}%`,
                      top: `${yPercent(e.values[lastIndex] ?? 0)}%`,
                      background: e.color,
                    }}
                    key={e.label}
                  />
                ))}
              </div>
              <div
                className={`ui-kpic__tooltip`}
                data-open={activeIndex !== null || void 0}
                data-side={tooltipOnLeft ? `left` : `right`}
                style={{
                  left: `${xPercent(lastIndex)}%`,
                }}
                role={`status`}
                aria-live={`polite`}
              >
                <p className={`ui-kpic__date`}>{(tooltipLabels ?? labels)[lastIndex]}</p>
                <ul>
                  {tooltipSeries.map((e) => (
                    <li key={e.label}>
                      <span
                        className={`ui-kpic__swatch`}
                        style={{
                          background: e.color,
                        }}
                      />
                      <span className={`ui-kpic__label`}>{e.label}</span>
                      <span className={`ui-kpic__num`}>{format(e.value)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className={`ui-kpic__xaxis`} aria-hidden={`true`}>
              {labelIndices.map((e) => (
                <span
                  style={{
                    left: `${xPercent(e)}%`,
                  }}
                  data-edge={e === 0 ? `start` : e === pointCount - 1 ? `end` : void 0}
                  key={e}
                >
                  {labels[e]}
                </span>
              ))}
            </div>
          </div>
        </div>
        {footer && <p className={`ui-kpic__footer`}>{footer}</p>}
      </section>
    </>
  );
}
var kpiChartCleanStyles = `
/* Colors and motion as variables – override them on .ui-kpic */
.ui-kpic {
  --ui-kpic-card: #ffffff;
  --ui-kpic-pop: #ffffff;
  --ui-kpic-ink: rgba(0, 0, 0, 0.88);
  --ui-kpic-strong: #000000;
  --ui-kpic-text: rgba(0, 0, 0, 0.61);
  --ui-kpic-muted: rgba(0, 0, 0, 0.45);
  --ui-kpic-line: rgba(0, 0, 0, 0.06);
  --ui-kpic-grid: rgba(0, 0, 0, 0.06);
  --ui-kpic-guide: rgba(0, 0, 0, 0.12);
  --ui-kpic-up: #1a9a52;
  --ui-kpic-up-bg: rgba(26, 154, 82, 0.08);
  --ui-kpic-down: #e5484d;
  --ui-kpic-down-bg: rgba(229, 72, 77, 0.08);
  --ui-kpic-focus: rgba(0, 96, 226, 0.35);
  /* Strokes are shadows: a 0.5px hairline plus a soft lift */
  --ui-kpic-shadow: 0 0 0 0.5px rgba(0, 0, 0, 0.06), 0 1px 1px -1px rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --ui-kpic-shadow-pop: 0 0 0 0.5px rgba(0, 0, 0, 0.08), 0 12px 28px -10px rgba(0, 0, 0, 0.16), 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --ui-kpic-ease: cubic-bezier(0.22, 1, 0.36, 1);
  box-sizing: border-box;
  container-type: inline-size;
  width: 100%;
  max-width: 460px;
  /* One white card – the edge is a shadow, not a border */
  border-radius: 10px;
  background: var(--ui-kpic-card);
  box-shadow: var(--ui-kpic-shadow);
  font-family: "Inter", "InterVariable", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  font-size: 13px;
  line-height: 20px;
  font-weight: 400;
  color: var(--ui-kpic-ink);
  -webkit-font-smoothing: antialiased;
  font-variant-numeric: tabular-nums;
}
.ui-kpic *, .ui-kpic *::before, .ui-kpic *::after { box-sizing: border-box; }

.ui-kpic__body { padding: 14px 16px 12px; }

/* Title, the big number and the change as a tinted badge */
.ui-kpic__title {
  margin: 0;
  overflow: hidden;
  font-size: 15px;
  font-weight: 500;
  line-height: 24px;
  color: var(--ui-kpic-strong);
  white-space: nowrap;
  text-overflow: ellipsis;
}
.ui-kpic__value {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 6px 0 0;
  font-size: 24px;
  font-weight: 500;
  line-height: 32px;
  letter-spacing: -0.02em;
  color: var(--ui-kpic-strong);
}
.ui-kpic__delta {
  display: inline-flex;
  align-items: center;
  height: 20px;
  padding: 0 6px;
  border-radius: 5px;
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
  letter-spacing: 0;
}
.ui-kpic__delta[data-trend="up"] { background: var(--ui-kpic-up-bg); color: var(--ui-kpic-up); }
.ui-kpic__delta[data-trend="down"] { background: var(--ui-kpic-down-bg); color: var(--ui-kpic-down); }

/* Chart: y labels on the left, plot on the right, x labels below */
.ui-kpic__chart {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: 124px 16px;
  column-gap: 10px;
  row-gap: 8px;
  margin-top: 20px;
}
.ui-kpic__yaxis {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: -8px 0;
  font-size: 11px;
  line-height: 16px;
  text-align: right;
  color: var(--ui-kpic-muted);
}
.ui-kpic__plot {
  position: relative;
  touch-action: pan-y;
  outline: none;
  cursor: crosshair;
}
.ui-kpic__plot:focus-visible {
  border-radius: 4px;
  outline: 2px solid var(--ui-kpic-focus);
  outline-offset: 4px;
}
.ui-kpic__grid {
  position: absolute;
  left: 0;
  right: 0;
  height: 0;
  border-top: 0.5px solid var(--ui-kpic-grid);
}
.ui-kpic__lines {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: visible;
  animation: ui-kpic-draw 1100ms var(--ui-kpic-ease) both;
}
.ui-kpic__lines polyline {
  fill: none;
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-linejoin: round;
}

/* Hover marker: a hairline guide and one dot per line – short, crisp moves between points */
.ui-kpic__marker {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0;
  transition: opacity 140ms ease;
}
.ui-kpic__marker[data-open] { opacity: 1; }
.ui-kpic__guide,
.ui-kpic__dot {
  position: absolute;
  transition: left 90ms ease-out, top 90ms ease-out;
}
.ui-kpic__guide {
  top: -4px;
  bottom: 0;
  width: 0;
  border-left: 1px solid var(--ui-kpic-guide);
  margin-left: -0.5px;
}
.ui-kpic__dot {
  width: 8px;
  height: 8px;
  margin: -4px 0 0 -4px;
  border-radius: 50%;
  box-shadow: 0 0 0 2px var(--ui-kpic-card);
}

/* Tooltip: a small white popover beside the guide, flips to the left on the right half */
.ui-kpic__tooltip {
  position: absolute;
  top: -8px;
  z-index: 2;
  min-width: 160px;
  padding: 6px 10px 8px;
  border-radius: 10px;
  background: var(--ui-kpic-pop);
  box-shadow: var(--ui-kpic-shadow-pop);
  pointer-events: none;
  opacity: 0;
  transform: translateX(var(--ui-kpic-shift)) scale(0.98);
  transition:
    left 90ms ease-out,
    opacity 140ms ease,
    transform 180ms var(--ui-kpic-ease);
}
.ui-kpic__tooltip[data-side="right"] { --ui-kpic-shift: 14px; transform-origin: left top; }
.ui-kpic__tooltip[data-side="left"] { --ui-kpic-shift: calc(-100% - 14px); transform-origin: right top; }
.ui-kpic__tooltip[data-open] {
  opacity: 1;
  transform: translateX(var(--ui-kpic-shift));
}
.ui-kpic__date {
  margin: 0;
  font-size: 13px;
  line-height: 20px;
  font-weight: 500;
  color: var(--ui-kpic-strong);
  white-space: nowrap;
}
.ui-kpic__tooltip ul {
  display: grid;
  gap: 0;
  margin: 4px 0 0;
  padding: 4px 0 0;
  border-top: 0.5px solid var(--ui-kpic-line);
  list-style: none;
}
.ui-kpic__tooltip li {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  line-height: 20px;
  color: var(--ui-kpic-text);
}
.ui-kpic__swatch {
  flex: none;
  width: 8px;
  height: 8px;
  border-radius: 2px;
}
.ui-kpic__label {
  flex: 1;
  white-space: nowrap;
}
.ui-kpic__num {
  padding-left: 16px;
  color: var(--ui-kpic-ink);
}

.ui-kpic__xaxis {
  position: relative;
  grid-column: 2;
  font-size: 11px;
  line-height: 16px;
  color: var(--ui-kpic-muted);
}
.ui-kpic__xaxis span {
  position: absolute;
  top: 0;
  white-space: nowrap;
  transform: translateX(-50%);
}
.ui-kpic__xaxis span[data-edge="start"] { transform: none; }
.ui-kpic__xaxis span[data-edge="end"] { transform: translateX(-100%); }

/* The last row of the card */
.ui-kpic__footer {
  margin: 0;
  padding: 10px 16px;
  border-top: 0.5px solid var(--ui-kpic-line);
  font-size: 12px;
  line-height: 16px;
  color: var(--ui-kpic-muted);
}

@keyframes ui-kpic-draw {
  from { clip-path: inset(-10% 100% -10% 0); }
  to { clip-path: inset(-10% -2% -10% 0); }
}

/* Narrow (phones): tighter padding, a slightly shorter plot */
@container (max-width: 360px) {
  .ui-kpic__body { padding: 12px 12px 10px; }
  .ui-kpic__chart { grid-template-rows: 112px 16px; column-gap: 8px; }
  .ui-kpic__footer { padding: 10px 12px; }
  .ui-kpic__tooltip { min-width: 144px; }
  .ui-kpic__num { padding-left: 12px; }
}

@media (prefers-reduced-motion: reduce) {
  .ui-kpic__lines { animation: none; }
  .ui-kpic__marker, .ui-kpic__guide, .ui-kpic__dot, .ui-kpic__tooltip { transition: none; }
}

/* Dark mode: follows a .dark class or data-theme="dark" on any ancestor, e.g. <html> */
:where(.dark, [data-theme="dark"]) .ui-kpic {
  --ui-kpic-card: #1c1c1e;
  --ui-kpic-pop: #252527;
  --ui-kpic-ink: rgba(255, 255, 255, 0.9);
  --ui-kpic-strong: #ffffff;
  --ui-kpic-text: rgba(255, 255, 255, 0.62);
  --ui-kpic-muted: rgba(255, 255, 255, 0.46);
  --ui-kpic-line: rgba(255, 255, 255, 0.08);
  --ui-kpic-grid: rgba(255, 255, 255, 0.08);
  --ui-kpic-guide: rgba(255, 255, 255, 0.2);
  --ui-kpic-up: #3ec27a;
  --ui-kpic-up-bg: rgba(62, 194, 122, 0.14);
  --ui-kpic-down: #ff6b70;
  --ui-kpic-down-bg: rgba(229, 72, 77, 0.14);
  --ui-kpic-focus: rgba(77, 141, 255, 0.5);
  --ui-kpic-shadow: 0 0 0 0.5px rgba(255, 255, 255, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.4);
  --ui-kpic-shadow-pop: 0 0 0 0.5px rgba(255, 255, 255, 0.12), 0 12px 28px -10px rgba(0, 0, 0, 0.6);
}
`;
var cleanDemoLabels = [`Mar 3`, `Mar 4`, `Mar 5`, `Mar 6`, `Mar 7`, `Mar 8`, `Mar 9`];
var cleanDemoTooltipLabels = [
  `Mon, Mar 3`,
  `Tue, Mar 4`,
  `Wed, Mar 5`,
  `Thu, Mar 6`,
  `Fri, Mar 7`,
  `Sat, Mar 8`,
  `Sun, Mar 9`,
];
var cleanDemoColors = [`#2f6bff`, `#ec4899`, `#8b5cf6`, `#14b8a6`, `#a3a3a3`];
var cleanDemoChannels = [`Organic`, `Paid ads`, `Referral`, `Email`, `Direct`];
var cleanDemoSeries = ((e) =>
  e.map((e, t) => ({
    label: cleanDemoChannels[t],
    color: cleanDemoColors[t],
    values: e,
  })))([
  [4200, 4700, 3900, 4600, 5400, 5100, 5900],
  [3600, 3300, 4400, 4800, 4e3, 4500, 4200],
  [1800, 2300, 2e3, 1500, 2400, 2200, 2700],
  [1200, 1100, 1700, 2100, 1600, 1300, 1500],
  [600, 900, 700, 800, 1e3, 1400, 1100],
]);
var formatCleanDemoCurrency: (n: number) => string = (value) =>
  value >= 1e3 ? `$${+(value / 1e3).toFixed(1)}k` : `$${Math.round(value)}`;
function KPIChartCleanDemo() {
  return (
    <div className={`kpi-demo`}>
      <KpiChartClean
        title={`Revenue`}
        value={`$96.4k`}
        delta={7900}
        format={formatCleanDemoCurrency}
        labels={cleanDemoLabels}
        tooltipLabels={cleanDemoTooltipLabels}
        series={cleanDemoSeries}
        footer={`Top 5 channels`}
      />
    </div>
  );
}
const demoStyles =
  ".kpi-demo{grid-template-columns:minmax(0,1fr);place-items:center;width:100%;display:grid}.kpi-demo .ui-kpi{width:440px;max-width:100%}.card__preview .kpi-demo{position:absolute;inset:0}.card__preview .kpi-demo .ui-kpi{zoom:.62;max-width:none}.kpi-demo .ui-kpic{width:440px;max-width:100%}.card__preview .kpi-demo:has(.ui-kpic){inset:40px 0 0}.card__preview .kpi-demo .ui-kpic{zoom:.54;max-width:none}\n";
function KpiChartCleanDemo(props: React.JSX.IntrinsicAttributes) {
  return (
    <>
      <style href="plico-demo-kpi-chart-clean" precedence="default">
        {demoStyles}
      </style>
      <KPIChartCleanDemo {...props} />
    </>
  );
}
export { KpiChartClean as Component };
export { KpiChartCleanDemo as Demo };
export { KpiChartClean };
export { KpiChartCleanDemo };
export default KpiChartClean;
export type { KpiSeries };
export type { KpiChartCleanProps };

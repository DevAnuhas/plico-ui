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
interface KpiChartProps {
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
var formatCompactNumber = (value: number) =>
  Math.abs(value) >= 1e3
    ? `${+(value / 1e3).toFixed(Math.abs(value) >= 1e4 ? 0 : 1)}k`
    : `${Math.round(value)}`;
function axisCeiling(value: number) {
  let halfMaximum = value / 2 || 1,
    magnitude = 10 ** Math.floor(Math.log10(halfMaximum));
  return (
    ([1, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10].find((e) => e * magnitude >= halfMaximum) ?? 10) *
    magnitude *
    2
  );
}
function KpiChart({
  title: title,
  value: value,
  delta: delta,
  labels: labels,
  tooltipLabels: tooltipLabels,
  series: series,
  format = formatCompactNumber,
  footer: footer,
  defaultIndex: defaultIndex,
  className: className,
}: KpiChartProps) {
  let [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null),
    activeIndex = hoveredIndex ?? defaultIndex ?? null,
    [lastIndex, setLastIndex] = React.useState(activeIndex ?? 0);
  activeIndex !== null && activeIndex !== lastIndex && setLastIndex(activeIndex);
  let pointCount = labels.length,
    maximum = axisCeiling(Math.max(...series.flatMap((e) => e.values))),
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
      <style href={`ui-kpi-chart`} precedence={`default`}>
        {kpiChartStyles}
      </style>
      <section className={[`ui-kpi`, className].filter(Boolean).join(` `)}>
        <h3 className={`ui-kpi__title`}>{title}</h3>
        <p className={`ui-kpi__value`}>
          {value}
          {delta !== void 0 && delta !== 0 && (
            <span className={`ui-kpi__delta`} data-trend={delta > 0 ? `up` : `down`}>
              {delta > 0 ? `+` : `−`}
              {format(Math.abs(delta))}
            </span>
          )}
        </p>
        <div className={`ui-kpi__chart`}>
          <div className={`ui-kpi__yaxis`} aria-hidden={`true`}>
            <span>{format(maximum)}</span>
            <span>{format(maximum / 2)}</span>
            <span>{format(0)}</span>
          </div>
          <div
            className={`ui-kpi__plot`}
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
              className={`ui-kpi__grid`}
              style={{
                top: `0%`,
              }}
            />
            <span
              className={`ui-kpi__grid`}
              style={{
                top: `50%`,
              }}
            />
            <span
              className={`ui-kpi__grid`}
              style={{
                top: `100%`,
              }}
            />
            <svg
              className={`ui-kpi__lines`}
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
              className={`ui-kpi__marker`}
              data-open={activeIndex !== null || void 0}
              aria-hidden={`true`}
            >
              <span
                className={`ui-kpi__guide`}
                style={{
                  left: `${xPercent(lastIndex)}%`,
                }}
              />
              {series.map((e) => (
                <span
                  className={`ui-kpi__dot`}
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
              className={`ui-kpi__tooltip`}
              data-open={activeIndex !== null || void 0}
              data-side={tooltipOnLeft ? `left` : `right`}
              style={{
                left: `${xPercent(lastIndex)}%`,
              }}
              role={`status`}
              aria-live={`polite`}
            >
              <p className={`ui-kpi__date`}>{(tooltipLabels ?? labels)[lastIndex]}</p>
              <ul>
                {tooltipSeries.map((e) => (
                  <li key={e.label}>
                    <span
                      className={`ui-kpi__swatch`}
                      style={{
                        background: e.color,
                      }}
                    />
                    <span className={`ui-kpi__label`}>{e.label}</span>
                    <span className={`ui-kpi__num`}>{format(e.value)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className={`ui-kpi__xaxis`} aria-hidden={`true`}>
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
        {footer && <p className={`ui-kpi__footer`}>{footer}</p>}
      </section>
    </>
  );
}
var kpiChartStyles = `
.ui-kpi {
  --ui-kpi-card: #ffffff;
  --ui-kpi-line: #ebebeb;
  --ui-kpi-grid: #f0f0f0;
  --ui-kpi-ink: #171717;
  --ui-kpi-muted: #8f8f8f;
  --ui-kpi-up: #1f8a4c;
  --ui-kpi-down: #e5484d;
  --ui-kpi-guide: #d9d9d9;
  --ui-kpi-label: #525252;
  --ui-kpi-ring-gap: #fff;
  --ui-kpi-ring: rgba(23, 23, 23, 0.25);
  --ui-kpi-shadow: 0 1px 2px rgba(0, 0, 0, 0.03), 0 8px 24px rgba(0, 0, 0, 0.035);
  --ui-kpi-tip-shadow: 0 8px 24px -6px rgba(0, 0, 0, 0.12), 0 2px 6px rgba(0, 0, 0, 0.04);
  --ui-kpi-ease: cubic-bezier(0.22, 1, 0.36, 1);
  box-sizing: border-box;
  width: 100%;
  max-width: 460px;
  padding: 20px 20px 18px;
  background: var(--ui-kpi-card);
  border: 1px solid var(--ui-kpi-line);
  border-radius: 20px;
  box-shadow: var(--ui-kpi-shadow);
  font-family: "Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  color: var(--ui-kpi-ink);
  -webkit-font-smoothing: antialiased;
  font-variant-numeric: tabular-nums;
}
.ui-kpi *, .ui-kpi *::before, .ui-kpi *::after { box-sizing: border-box; }

.ui-kpi__title {
  margin: 0;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  color: var(--ui-kpi-muted);
}
.ui-kpi__value {
  display: flex;
  align-items: baseline;
  gap: 10px;
  margin: 8px 0 0;
  font-size: 28px;
  font-weight: 500;
  line-height: 34px;
  letter-spacing: -0.02em;
}
.ui-kpi__delta {
  font-size: 14px;
  font-weight: 450;
  letter-spacing: 0;
}
.ui-kpi__delta[data-trend="up"] { color: var(--ui-kpi-up); }
.ui-kpi__delta[data-trend="down"] { color: var(--ui-kpi-down); }

/* Chart: y labels on the left, plot on the right, x labels below */
.ui-kpi__chart {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: 116px 20px;
  column-gap: 12px;
  row-gap: 8px;
  margin-top: 24px;
}
.ui-kpi__yaxis {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: -9px 0;
  font-size: 12px;
  line-height: 18px;
  text-align: right;
  color: var(--ui-kpi-muted);
}
.ui-kpi__plot {
  position: relative;
  touch-action: pan-y;
  outline: none;
  cursor: crosshair;
}
.ui-kpi__plot:focus-visible {
  border-radius: 4px;
  box-shadow: 0 0 0 4px var(--ui-kpi-ring-gap), 0 0 0 6px var(--ui-kpi-ring);
}
.ui-kpi__grid {
  position: absolute;
  left: 0;
  right: 0;
  height: 1px;
  background: var(--ui-kpi-grid);
}
.ui-kpi__lines {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: visible;
  animation: ui-kpi-draw 1100ms var(--ui-kpi-ease) both;
}
.ui-kpi__lines polyline {
  fill: none;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

/* Hover marker: thin guide and one dot per line */
.ui-kpi__marker {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0;
  transition: opacity 160ms ease;
}
.ui-kpi__marker[data-open] { opacity: 1; }
.ui-kpi__guide,
.ui-kpi__dot {
  position: absolute;
  transition: left 220ms var(--ui-kpi-ease), top 220ms var(--ui-kpi-ease);
}
.ui-kpi__guide {
  top: -4px;
  bottom: 0;
  width: 1px;
  margin-left: -0.5px;
  background: var(--ui-kpi-guide);
}
.ui-kpi__dot {
  width: 10px;
  height: 10px;
  margin: -5px 0 0 -5px;
  border-radius: 50%;
  box-shadow: 0 0 0 2px var(--ui-kpi-card);
}

/* Tooltip: sits beside the guide, flips to the left on the right half */
.ui-kpi__tooltip {
  position: absolute;
  top: -12px;
  z-index: 2;
  min-width: 176px;
  padding: 10px 12px 12px;
  background: var(--ui-kpi-card);
  border: 1px solid var(--ui-kpi-line);
  border-radius: 12px;
  box-shadow: var(--ui-kpi-tip-shadow);
  pointer-events: none;
  opacity: 0;
  transform: translateX(var(--ui-kpi-shift)) scale(0.97);
  transition:
    left 220ms var(--ui-kpi-ease),
    opacity 160ms ease,
    transform 220ms var(--ui-kpi-ease);
}
.ui-kpi__tooltip[data-side="right"] { --ui-kpi-shift: 14px; transform-origin: left top; }
.ui-kpi__tooltip[data-side="left"] { --ui-kpi-shift: calc(-100% - 14px); transform-origin: right top; }
.ui-kpi__tooltip[data-open] {
  opacity: 1;
  transform: translateX(var(--ui-kpi-shift));
}
.ui-kpi__date {
  margin: 0 0 6px;
  font-size: 12px;
  line-height: 18px;
  color: var(--ui-kpi-muted);
}
.ui-kpi__tooltip ul {
  display: grid;
  gap: 4px;
  margin: 0;
  padding: 0;
  list-style: none;
}
.ui-kpi__tooltip li {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  line-height: 20px;
}
.ui-kpi__swatch {
  flex: none;
  width: 10px;
  height: 2px;
  border-radius: 1px;
}
.ui-kpi__label {
  flex: 1;
  white-space: nowrap;
  color: var(--ui-kpi-label);
}
.ui-kpi__num {
  padding-left: 16px;
  font-weight: 500;
}

.ui-kpi__xaxis {
  position: relative;
  grid-column: 2;
  font-size: 12px;
  line-height: 20px;
  color: var(--ui-kpi-muted);
}
.ui-kpi__xaxis span {
  position: absolute;
  top: 0;
  white-space: nowrap;
  transform: translateX(-50%);
}
.ui-kpi__xaxis span[data-edge="start"] { transform: none; }
.ui-kpi__xaxis span[data-edge="end"] { transform: translateX(-100%); }

.ui-kpi__footer {
  margin: 16px 0 0;
  font-size: 13px;
  line-height: 18px;
  color: var(--ui-kpi-muted);
}

@keyframes ui-kpi-draw {
  from { clip-path: inset(-10% 100% -10% 0); }
  to { clip-path: inset(-10% -2% -10% 0); }
}

@media (prefers-reduced-motion: reduce) {
  .ui-kpi__lines { animation: none; }
  .ui-kpi__marker, .ui-kpi__guide, .ui-kpi__dot, .ui-kpi__tooltip { transition: none; }
}

/* Dark mode: follows a .dark class or data-theme="dark" on any ancestor, e.g. <html> */
:where(.dark, [data-theme="dark"]) .ui-kpi {
  --ui-kpi-card: #232326;
  --ui-kpi-line: rgba(255, 255, 255, 0.08);
  --ui-kpi-grid: rgba(255, 255, 255, 0.06);
  --ui-kpi-ink: #ededed;
  --ui-kpi-muted: #8f8f8f;
  --ui-kpi-up: #3dd68c;
  --ui-kpi-down: #ff6369;
  --ui-kpi-guide: rgba(255, 255, 255, 0.2);
  --ui-kpi-label: #c4c4c4;
  --ui-kpi-ring-gap: #232326;
  --ui-kpi-ring: rgba(237, 237, 237, 0.35);
  --ui-kpi-shadow: 0 1px 2px rgba(0, 0, 0, 0.4), 0 8px 24px rgba(0, 0, 0, 0.35);
  --ui-kpi-tip-shadow: 0 8px 24px -6px rgba(0, 0, 0, 0.5), 0 2px 6px rgba(0, 0, 0, 0.35), 0 0 0 0.5px rgba(255, 255, 255, 0.04);
}
:where(.dark, [data-theme="dark"]) .ui-kpi__tooltip {
  background: #2a2a2d;
  border-color: rgba(255, 255, 255, 0.1);
}
`;
var demoLabels = [`Mar 3`, `Mar 4`, `Mar 5`, `Mar 6`, `Mar 7`, `Mar 8`, `Mar 9`];
var demoTooltipLabels = [
  `Mon, Mar 3`,
  `Tue, Mar 4`,
  `Wed, Mar 5`,
  `Thu, Mar 6`,
  `Fri, Mar 7`,
  `Sat, Mar 8`,
  `Sun, Mar 9`,
];
var demoColors = [`#2f6bff`, `#ec4899`, `#8b5cf6`, `#14b8a6`, `#a3a3a3`];
var demoChannels = [`Organic`, `Paid ads`, `Referral`, `Email`, `Direct`];
var demoSeries = ((e) =>
  e.map((e, t) => ({
    label: demoChannels[t],
    color: demoColors[t],
    values: e,
  })))([
  [4200, 4700, 3900, 4600, 5400, 5100, 5900],
  [3600, 3300, 4400, 4800, 4e3, 4500, 4200],
  [1800, 2300, 2e3, 1500, 2400, 2200, 2700],
  [1200, 1100, 1700, 2100, 1600, 1300, 1500],
  [600, 900, 700, 800, 1e3, 1400, 1100],
]);
var formatDemoCurrency: (n: number) => string = (value) =>
  value >= 1e3 ? `$${+(value / 1e3).toFixed(1)}k` : `$${Math.round(value)}`;
function KPIChartDemo() {
  return (
    <div className={`kpi-demo`}>
      <KpiChart
        title={`Revenue`}
        value={`$96.4k`}
        delta={7900}
        format={formatDemoCurrency}
        labels={demoLabels}
        tooltipLabels={demoTooltipLabels}
        series={demoSeries}
        footer={`Top 5 channels`}
      />
    </div>
  );
}
const demoStyles =
  ".kpi-demo{grid-template-columns:minmax(0,1fr);place-items:center;width:100%;display:grid}.kpi-demo .ui-kpi{width:440px;max-width:100%}.card__preview .kpi-demo{position:absolute;inset:0}.card__preview .kpi-demo .ui-kpi{zoom:.62;max-width:none}.kpi-demo .ui-kpic{width:440px;max-width:100%}.card__preview .kpi-demo:has(.ui-kpic){inset:40px 0 0}.card__preview .kpi-demo .ui-kpic{zoom:.54;max-width:none}\n";
function KpiChartDemo(props: React.JSX.IntrinsicAttributes) {
  return (
    <>
      <style href="plico-demo-kpi-chart" precedence="default">
        {demoStyles}
      </style>
      <KPIChartDemo {...props} />
    </>
  );
}
export { KpiChart as Component };
export { KpiChartDemo as Demo };
export { KpiChart };
export { KpiChartDemo };
export default KpiChart;
export type { KpiSeries };
export type { KpiChartProps };

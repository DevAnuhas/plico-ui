"use client";

import * as React from "react";
type CSSVariables = React.CSSProperties & {
  [key: `--${string}`]: string | number;
};
type KpiBoardSeries = {
  current: number[];
  previous: number[];
};
export interface KpiBoardData {
  stats: {
    id: string;
    label: string;
    kind: string;
    labels: string[];
    values: number[];
    previous?: number;
    lowerIsBetter?: boolean;
  }[];
  overview: KpiBoardSeries & {
    title: string;
    labels: string[];
    segments?: Record<string, KpiBoardSeries>;
  };
  focus: {
    title: string;
    note?: string;
    metric: string;
    unit?: string;
    labels: string[];
    values: number[];
    previous: number;
  };
}
interface KpiBoardProps {
  data: Record<string, KpiBoardData>;
  ranges: {
    id: string;
    label: string;
  }[];
  range?: string;
  defaultRange?: string;
  onRangeChange?: (id: string) => void;
  segments?: {
    id: string;
    label: string;
  }[];
  segment?: string;
  defaultSegment?: string;
  onSegmentChange?: (id: string) => void;
  compareLabel?: string;
  currentLabel?: string;
  previousLabel?: string;
  formatMoney?: (value: number) => string;
  icon?: React.ReactNode;
  title?: string;
  setup?: {
    label: string;
    onClick: () => void;
  };
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}
var sumValues = (values: number[]) => values.reduce((e, t) => e + t, 0);
var formatCount = (value: number) =>
  new Intl.NumberFormat(`en-US`, {
    maximumFractionDigits: 0,
  }).format(Math.round(value));
var formatBoardMoney = (value: number) =>
  `$${new Intl.NumberFormat(`en-US`, {
    minimumFractionDigits: Math.abs(value) < 1e4 ? 2 : 0,
    maximumFractionDigits: Math.abs(value) < 1e4 ? 2 : 0,
  }).format(value)}`;
var easeOutQuart = (progress: number) => 1 - (1 - progress) ** 4;
var lerp = (from: number, to: number, progress: number) => from + (to - from) * progress;
var prefersReducedMotion = () =>
  typeof window < `u` && window.matchMedia(`(prefers-reduced-motion: reduce)`).matches;
function resampleValues(values: number[], length: number) {
  return !values || values.length === 0
    ? Array<number>(length).fill(0)
    : values.length === 1
      ? Array<number>(length).fill(values[0])
      : Array.from(
          {
            length: length,
          },
          (n, r) => {
            let i = (r / (length - 1)) * (values.length - 1),
              a = Math.floor(i),
              o = Math.min(values.length - 1, a + 1);
            return lerp(values[a], values[o], i - a);
          },
        );
}
function buildChartPath(values: number[], minimum: number, maximum: number, top = 6, bottom = 94) {
  let span = maximum - minimum || 1,
    pts = values.map((n: number, o: number) => [
      (o / Math.max(1, values.length - 1)) * 100,
      bottom - ((n - minimum) / span) * (bottom - top),
    ]),
    line = pts.map((e, t) => `${t ? `L` : `M`}${e[0].toFixed(2)},${e[1].toFixed(2)}`).join(``);
  return {
    pts: pts,
    line: line,
    area: `${line}L100,100L0,100Z`,
  };
}
var nearestPoint = (points: number[][], index: number, count: number) =>
  points[Math.round((index / Math.max(1, count - 1)) * (points.length - 1))];
function useBoardTransition<T>(target: T, key: string | undefined, duration = 760) {
  let fromRef = React.useRef<T | null>(null),
    targetRef = React.useRef(target),
    keyRef = React.useRef<string | null | undefined>(null),
    [progress, setProgress] = React.useState<{
      key: string | null | undefined;
      t: number;
    }>({
      key: null,
      t: 0,
    });
  return (
    keyRef.current !== key &&
      (keyRef.current !== null && (fromRef.current = targetRef.current), (keyRef.current = key)),
    (targetRef.current = target),
    React.useEffect(() => {
      if (prefersReducedMotion())
        return setProgress({
          key: key,
          t: 1,
        });
      let e = performance.now(),
        n = 0,
        i = (a: number) => {
          let o = Math.min(1, (a - e) / duration);
          (setProgress({
            key: key,
            t: easeOutQuart(o),
          }),
            o < 1 && (n = requestAnimationFrame(i)));
        };
      return ((n = requestAnimationFrame(i)), () => cancelAnimationFrame(n));
    }, [key, duration]),
    {
      from: fromRef.current,
      t: progress.key === key ? progress.t : 0,
    }
  );
}
var ChevronDownIcon = () => (
  <svg width={`10`} height={`10`} viewBox={`0 0 10 10`} fill={`none`} aria-hidden={`true`}>
    <path
      d={`m2.5 3.8 2.5 2.5 2.5-2.5`}
      stroke={`currentColor`}
      strokeWidth={`1.4`}
      strokeLinecap={`round`}
      strokeLinejoin={`round`}
    />
  </svg>
);
var CheckIcon = () => (
  <svg width={`12`} height={`12`} viewBox={`0 0 12 12`} fill={`none`} aria-hidden={`true`}>
    <path
      d={`m2.6 6.3 2.2 2.2 4.6-5`}
      stroke={`currentColor`}
      strokeWidth={`1.5`}
      strokeLinecap={`round`}
      strokeLinejoin={`round`}
    />
  </svg>
);
var SettingsIcon = () => (
  <svg width={`13`} height={`13`} viewBox={`0 0 14 14`} fill={`none`} aria-hidden={`true`}>
    <path
      d={`M2 4.2h5.2M10.2 4.2H12M2 9.8h1.8M6.8 9.8H12`}
      stroke={`currentColor`}
      strokeWidth={`1.3`}
      strokeLinecap={`round`}
    />
    <circle cx={`8.7`} cy={`4.2`} r={`1.5`} stroke={`currentColor`} strokeWidth={`1.3`} />
    <circle cx={`5.3`} cy={`9.8`} r={`1.5`} stroke={`currentColor`} strokeWidth={`1.3`} />
  </svg>
);
var ProductIcon = () => (
  <svg width={`16`} height={`16`} viewBox={`0 0 16 16`} fill={`none`} aria-hidden={`true`}>
    <path
      d={`M8 1.9 13.3 4.8v6.4L8 14.1 2.7 11.2V4.8L8 1.9Z`}
      stroke={`currentColor`}
      strokeWidth={`1.3`}
      strokeLinejoin={`round`}
    />
    <path
      d={`M2.9 4.9 8 7.7l5.1-2.8M8 7.7V14`}
      stroke={`currentColor`}
      strokeWidth={`1.3`}
      strokeLinejoin={`round`}
    />
  </svg>
);
function ChangeBadge({
  up: up,
  good: good,
  children: children,
}: {
  up: boolean;
  good: boolean;
  children: React.ReactNode;
}) {
  return (
    <span className={`ui-kb__change`} data-good={good ? `` : void 0}>
      <svg
        width={`8`}
        height={`8`}
        viewBox={`0 0 8 8`}
        aria-hidden={`true`}
        style={
          up
            ? void 0
            : {
                transform: `scaleY(-1)`,
              }
        }
      >
        <path d={`M4 1.2 7.2 6.4H.8L4 1.2Z`} fill={`currentColor`} />
      </svg>
      {children}
    </span>
  );
}
function BoardSelect({
  label: label,
  value: value,
  options: options,
  onChange: onChange,
}: {
  label: string;
  value?: string;
  options: { id: string; label: string }[];
  onChange: (id: string) => void;
}) {
  let instanceId = React.useId(),
    rootRef = React.useRef<HTMLDivElement | null>(null),
    [open, setOpen] = React.useState(false),
    [activeIndex, setActiveIndex] = React.useState(0),
    selectedIndex = Math.max(
      0,
      options.findIndex((e) => e.id === value),
    );
  React.useEffect(() => {
    if (!open) return;
    let e = (e: PointerEvent) => {
      rootRef.current?.contains(e.target as Node | null) || setOpen(false);
    };
    return (
      document.addEventListener(`pointerdown`, e),
      () => document.removeEventListener(`pointerdown`, e)
    );
  }, [open]);
  let openMenu = () => {
      (setActiveIndex(selectedIndex), setOpen(true));
    },
    choose = (index: number) => {
      (setOpen(false),
        options[index] && options[index].id !== value && onChange(options[index].id),
        rootRef.current?.querySelector(`button`)?.focus({
          preventScroll: true,
        }));
    };
  return (
    <div
      ref={rootRef}
      className={`ui-kb__pick`}
      data-open={open ? `` : void 0}
      onKeyDown={(e) => {
        if (!open) {
          (e.key === `ArrowDown` || e.key === `ArrowUp`) && (e.preventDefault(), openMenu());
          return;
        }
        e.key === `Escape`
          ? (e.preventDefault(), e.stopPropagation(), setOpen(false))
          : e.key === `ArrowDown` || e.key === `ArrowUp`
            ? (e.preventDefault(),
              setActiveIndex(
                (t) => (t + (e.key === `ArrowDown` ? 1 : -1) + options.length) % options.length,
              ))
            : e.key === `Home` || e.key === `End`
              ? (e.preventDefault(), setActiveIndex(e.key === `Home` ? 0 : options.length - 1))
              : e.key === `Enter` || e.key === ` `
                ? (e.preventDefault(), choose(activeIndex))
                : e.key === `Tab` && setOpen(false);
      }}
    >
      <button
        type={`button`}
        className={`ui-kb__pick-button`}
        role={`combobox`}
        aria-label={label}
        aria-haspopup={`listbox`}
        aria-expanded={open}
        aria-controls={`${instanceId}-list`}
        aria-activedescendant={open ? `${instanceId}-${activeIndex}` : void 0}
        onClick={() => (open ? setOpen(false) : openMenu())}
      >
        <span>{options[selectedIndex]?.label}</span>
        <ChevronDownIcon />
      </button>
      {open && (
        <ul id={`${instanceId}-list`} className={`ui-kb__menu`} role={`listbox`} aria-label={label}>
          {options.map((e, t) => (
            <li
              id={`${instanceId}-${t}`}
              role={`option`}
              aria-selected={t === selectedIndex}
              className={`ui-kb__option`}
              data-active={t === activeIndex ? `` : void 0}
              onPointerEnter={() => setActiveIndex(t)}
              onClick={() => choose(t)}
              key={e.id}
            >
              <span>{e.label}</span>
              {t === selectedIndex && <CheckIcon />}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
function KpiBoard({
  data: data,
  ranges: ranges,
  range: range,
  defaultRange: defaultRange,
  onRangeChange: onRangeChange,
  segments: segments,
  segment: segment,
  defaultSegment: defaultSegment,
  onSegmentChange: onSegmentChange,
  compareLabel = `vs. last period`,
  currentLabel = `This period`,
  previousLabel = `Last period`,
  formatMoney = formatBoardMoney,
  icon: icon,
  title: title,
  setup: setup,
  action: action,
  className: className,
}: KpiBoardProps) {
  let instanceId = React.useId().replace(/:/g, ``),
    [localRange, setLocalRange] = React.useState(defaultRange ?? ranges[0]?.id),
    activeRange = range ?? localRange ?? ranges[0]?.id,
    [localSegment, setLocalSegment] = React.useState(defaultSegment ?? segments?.[0]?.id),
    activeSegment = segment ?? localSegment,
    dataset = data[activeRange!] ?? Object.values(data)[0],
    { from: fromData, t: progress } = useBoardTransition(dataset, activeRange),
    overview = (activeSegment && dataset.overview.segments?.[activeSegment]) || dataset.overview,
    overviewKey = `${activeRange}/${activeSegment ?? ``}`,
    overviewTransition = useBoardTransition(sumValues(overview.current), overviewKey),
    interpolateMetric = (readValue: (dataset: KpiBoardData) => number) =>
      lerp(fromData ? readValue(fromData) : 0, readValue(dataset), progress),
    chartValues = (readValues: (dataset: KpiBoardData) => number[] | undefined, limit: number) => {
      let values = readValues(dataset) ?? [];
      return values.length >= 2 && values.length <= limit ? values : resampleValues(values, limit);
    },
    chartKey = activeRange,
    formatMetric = (kind: string, value: number) =>
      kind === `count` ? formatCount(value) : formatMoney(value),
    [statHover, setStatHover] = React.useState<{
      id: string;
      at: number;
    } | null>(null),
    [overviewHover, setOverviewHover] = React.useState<number | null>(null),
    [focusHover, setFocusHover] = React.useState<number | null>(null),
    pointerHandlers = (setHover: (value: number | null) => void) => {
      let move = (t: React.PointerEvent<HTMLDivElement>) => {
          let n = t.currentTarget.getBoundingClientRect();
          setHover(Math.min(1, Math.max(0, (t.clientX - n.left) / n.width)));
        },
        release = (t: { pointerType: string }) => {
          t.pointerType !== `mouse` && setHover(null);
        };
      return {
        onPointerDown: move,
        onPointerMove: move,
        onPointerUp: release,
        onPointerCancel: release,
        onPointerLeave: () => setHover(null),
      };
    },
    changeRange = (id: string) => {
      (setLocalRange(id),
        setStatHover(null),
        setOverviewHover(null),
        setFocusHover(null),
        onRangeChange?.(id));
    },
    changeSegment = (id: string) => {
      (setLocalSegment(id), setOverviewHover(null), onSegmentChange?.(id));
    },
    overviewCurrent = chartValues(() => overview.current, 72),
    overviewPrevious = chartValues(() => overview.previous, 72),
    overviewMax = Math.max(...overviewCurrent, ...overviewPrevious, 1) * 1.06,
    overviewMin = Math.min(...overviewCurrent, ...overviewPrevious) * 0.82,
    overviewPath = buildChartPath(overviewCurrent, overviewMin, overviewMax),
    previousOverviewPath = buildChartPath(overviewPrevious, overviewMin, overviewMax),
    overviewTotal = lerp(
      overviewTransition.from ?? 0,
      sumValues(overview.current),
      overviewTransition.t,
    ),
    overviewChange = sumValues(overview.previous)
      ? ((sumValues(overview.current) - sumValues(overview.previous)) /
          sumValues(overview.previous)) *
        100
      : 0,
    overviewIndex =
      overviewHover === null ? null : Math.round(overviewHover * (overview.current.length - 1)),
    overviewPoint =
      overviewIndex === null
        ? null
        : nearestPoint(overviewPath.pts, overviewIndex, overview.current.length),
    previousOverviewPoint =
      overviewIndex === null
        ? null
        : nearestPoint(previousOverviewPath.pts, overviewIndex, overview.current.length),
    focusValues = chartValues((e) => e.focus.values, 48),
    focusMax = Math.max(...focusValues, 1) * 1.05,
    focusPath = buildChartPath(focusValues, Math.min(...focusValues) * 0.8, focusMax, 8, 92),
    focusTotal = interpolateMetric((e) => sumValues(e.focus.values)),
    focusChange = dataset.focus.previous
      ? ((sumValues(dataset.focus.values) - dataset.focus.previous) / dataset.focus.previous) * 100
      : 0,
    focusIndex =
      focusHover === null ? null : Math.round(focusHover * (dataset.focus.values.length - 1)),
    focusPoint =
      focusIndex === null
        ? null
        : nearestPoint(focusPath.pts, focusIndex, dataset.focus.values.length);
  return (
    <div className={[`ui-kb`, className].filter(Boolean).join(` `)}>
      <style href={`ui-kpi-board`} precedence={`default`}>
        {kpiBoardStyles}
      </style>
      <div className={`ui-kb__bar`}>
        {title && <h2 className={`ui-kb__heading`}>{title}</h2>}
        <BoardSelect
          label={`Date range`}
          value={activeRange}
          options={ranges}
          onChange={changeRange}
        />
      </div>
      {dataset.stats.map((e, t) => {
        let n = chartValues((e) => e.stats[t]?.values, 48),
          a = Math.max(...n, 1) * 1.08,
          o = buildChartPath(n, Math.min(...n) * 0.75, a, 10, 92),
          s = interpolateMetric((e) => sumValues(e.stats[t]?.values ?? [])),
          c = e.previous === void 0 ? null : sumValues(e.values) - e.previous,
          l = statHover?.id === e.id ? Math.round(statHover.at * (e.values.length - 1)) : null,
          u = l === null ? null : nearestPoint(o.pts, l, e.values.length);
        return (
          <section
            className={`ui-kb__card ui-kb__stat`}
            aria-label={e.label}
            style={
              {
                "--n": t,
              } as CSSVariables
            }
            key={e.id}
          >
            <header className={`ui-kb__row`}>
              <span className={`ui-kb__pair`}>
                <b>{formatMetric(e.kind, s)}</b>
                <span>{e.label}</span>
              </span>
              {c !== null && (
                <span className={`ui-kb__pair ui-kb__pair--end`}>
                  {c === 0 ? (
                    <b>{`0`}</b>
                  ) : (
                    <ChangeBadge up={c > 0} good={e.lowerIsBetter ? c < 0 : c > 0}>
                      {formatMetric(e.kind, Math.abs(c))}
                    </ChangeBadge>
                  )}
                  <span>{compareLabel}</span>
                </span>
              )}
            </header>
            <div
              className={`ui-kb__plot ui-kb__plot--small`}
              {...pointerHandlers((t: number | null) =>
                setStatHover(
                  t === null
                    ? null
                    : {
                        id: e.id,
                        at: t,
                      },
                ),
              )}
            >
              <svg
                viewBox={`0 0 100 100`}
                preserveAspectRatio={`none`}
                aria-hidden={`true`}
                key={chartKey}
              >
                <path className={`ui-kb__fill`} d={o.area} />
                <path className={`ui-kb__line`} d={o.line} />
              </svg>
              {u && l !== null && (
                <>
                  <span
                    className={`ui-kb__rule`}
                    style={{
                      left: `${u[0]}%`,
                      top: `${u[1]}%`,
                    }}
                  />
                  <span
                    className={`ui-kb__dot`}
                    style={{
                      left: `${u[0]}%`,
                      top: `${u[1]}%`,
                    }}
                  />
                  <span
                    className={`ui-kb__tag`}
                    data-side={u[0] > 62 ? `left` : `right`}
                    style={{
                      left: `${u[0]}%`,
                      top: `${u[1]}%`,
                    }}
                  >
                    <span>{e.labels[l]}</span>
                    <b>{formatMetric(e.kind, e.values[l])}</b>
                  </span>
                </>
              )}
            </div>
            <div className={`ui-kb__axis`} aria-hidden={`true`}>
              <span>{e.labels[0]}</span>
              <span>{e.labels[e.labels.length - 1]}</span>
              {u && l !== null && (
                <span
                  className={`ui-kb__axis-tag`}
                  style={{
                    left: `${Math.min(88, Math.max(12, u[0]))}%`,
                  }}
                >
                  {e.labels[l]}
                </span>
              )}
            </div>
          </section>
        );
      })}
      <section
        className={`ui-kb__card ui-kb__overview`}
        aria-label={dataset.overview.title}
        style={
          {
            "--n": 3,
          } as CSSVariables
        }
      >
        <header className={`ui-kb__row ui-kb__row--top`}>
          <div>
            <div className={`ui-kb__label`}>{dataset.overview.title}</div>
            <div className={`ui-kb__figure`}>
              <b>{formatMoney(overviewTotal)}</b>
              <span className={`ui-kb__vs`}>
                <i data-good={overviewChange >= 0 ? `` : void 0}>
                  {overviewChange >= 0 ? `+` : `−`}
                  {Math.abs(overviewChange).toFixed(1)}
                  {`%`}
                </i>
                {` `}
                {compareLabel}
              </span>
            </div>
          </div>
          {segments && activeSegment && (
            <BoardSelect
              label={`Segment`}
              value={activeSegment}
              options={segments}
              onChange={changeSegment}
            />
          )}
        </header>
        <div className={`ui-kb__plot ui-kb__plot--large`} {...pointerHandlers(setOverviewHover)}>
          <svg
            viewBox={`0 0 100 100`}
            preserveAspectRatio={`none`}
            aria-hidden={`true`}
            key={overviewKey}
          >
            <defs>
              <linearGradient id={`${instanceId}-fade`} x1={`0`} y1={`0`} x2={`0`} y2={`1`}>
                <stop offset={`0`} stopColor={`var(--ui-kb-accent)`} stopOpacity={`0.14`} />
                <stop offset={`1`} stopColor={`var(--ui-kb-accent)`} stopOpacity={`0`} />
              </linearGradient>
            </defs>
            {Array.from(
              {
                length: 19,
              },
              (e, t) => (
                <path
                  className={`ui-kb__grid`}
                  d={`M${((t / 18) * 100).toFixed(2)},0V100`}
                  key={t}
                />
              ),
            )}
            <path d={overviewPath.area} fill={`url(#${instanceId}-fade)`} />
            <path className={`ui-kb__line ui-kb__line--soft`} d={previousOverviewPath.line} />
            <path className={`ui-kb__line`} d={overviewPath.line} />
          </svg>
          {overviewPoint && previousOverviewPoint && overviewIndex !== null && (
            <>
              <span
                className={`ui-kb__rule`}
                style={{
                  left: `${overviewPoint[0]}%`,
                  top: 0,
                }}
              />
              <span
                className={`ui-kb__dot ui-kb__dot--soft`}
                style={{
                  left: `${previousOverviewPoint[0]}%`,
                  top: `${previousOverviewPoint[1]}%`,
                }}
              />
              <span
                className={`ui-kb__dot`}
                style={{
                  left: `${overviewPoint[0]}%`,
                  top: `${overviewPoint[1]}%`,
                }}
              />
              <div
                className={`ui-kb__tip`}
                data-side={overviewPoint[0] > 58 ? `left` : `right`}
                style={{
                  left: `${overviewPoint[0]}%`,
                  top: `${Math.min(overviewPoint[1], previousOverviewPoint[1])}%`,
                }}
              >
                <div className={`ui-kb__tip-head`}>
                  <span>{dataset.overview.labels[overviewIndex]}</span>
                  <b>
                    {formatMoney(
                      overview.current[overviewIndex] + (overview.previous[overviewIndex] ?? 0),
                    )}
                  </b>
                </div>
                <div className={`ui-kb__tip-row`}>
                  <i />
                  <span>{currentLabel}</span>
                  <b>{formatMoney(overview.current[overviewIndex])}</b>
                </div>
                <div className={`ui-kb__tip-row`} data-soft={``}>
                  <i />
                  <span>{previousLabel}</span>
                  <b>{formatMoney(overview.previous[overviewIndex] ?? 0)}</b>
                </div>
              </div>
            </>
          )}
        </div>
        <div className={`ui-kb__axis`} aria-hidden={`true`}>
          <span>{dataset.overview.labels[0]}</span>
          <span>{dataset.overview.labels[dataset.overview.labels.length - 1]}</span>
        </div>
      </section>
      <section
        className={`ui-kb__card ui-kb__focus`}
        aria-label={dataset.focus.title}
        style={
          {
            "--n": 4,
          } as CSSVariables
        }
      >
        <header className={`ui-kb__row ui-kb__row--top`}>
          <div className={`ui-kb__product`}>
            <span className={`ui-kb__icon`}>{icon ?? <ProductIcon />}</span>
            <span className={`ui-kb__pair`}>
              <b>{dataset.focus.title}</b>
              {dataset.focus.note && <span>{dataset.focus.note}</span>}
            </span>
          </div>
          {setup && (
            <button type={`button`} className={`ui-kb__setup`} onClick={setup.onClick}>
              <SettingsIcon />
              {setup.label}
            </button>
          )}
        </header>
        <div className={`ui-kb__label`}>{dataset.focus.metric}</div>
        <div className={`ui-kb__figure ui-kb__figure--small`}>
          <b>
            {formatCount(focusIndex === null ? focusTotal : dataset.focus.values[focusIndex])}
            {dataset.focus.unit ? ` ${dataset.focus.unit}` : ``}
          </b>
          <span className={`ui-kb__vs`}>
            {focusIndex === null ? (
              <>
                <ChangeBadge up={focusChange >= 0} good={focusChange >= 0}>
                  {Math.abs(focusChange).toFixed(0)}
                  {`%`}
                </ChangeBadge>
                {` `}
                {compareLabel}
              </>
            ) : (
              dataset.focus.labels[focusIndex]
            )}
          </span>
        </div>
        <div className={`ui-kb__plot ui-kb__plot--small`} {...pointerHandlers(setFocusHover)}>
          <svg
            viewBox={`0 0 100 100`}
            preserveAspectRatio={`none`}
            aria-hidden={`true`}
            key={chartKey}
          >
            <path className={`ui-kb__fill`} d={focusPath.area} />
            <path className={`ui-kb__line`} d={focusPath.line} />
          </svg>
          {focusPoint && (
            <>
              <span
                className={`ui-kb__rule`}
                style={{
                  left: `${focusPoint[0]}%`,
                  top: `${focusPoint[1]}%`,
                }}
              />
              <span
                className={`ui-kb__dot`}
                style={{
                  left: `${focusPoint[0]}%`,
                  top: `${focusPoint[1]}%`,
                }}
              />
            </>
          )}
        </div>
        <div className={`ui-kb__legend`}>
          <span>{previousLabel}</span>
          <b data-soft={``}>{formatCount(interpolateMetric((e) => e.focus.previous))}</b>
          <span>{currentLabel}</span>
          <b>{formatCount(focusTotal)}</b>
        </div>
        {action && (
          <button type={`button`} className={`ui-kb__action`} onClick={action.onClick}>
            {action.label}
          </button>
        )}
      </section>
    </div>
  );
}
var kpiBoardStyles = `
.ui-kb {
  --ui-kb-card: #ffffff;
  --ui-kb-line: #e7e7ea;
  --ui-kb-ink: #26262b;
  --ui-kb-text: #55555c;
  --ui-kb-muted: #96969e;
  --ui-kb-well: #f6f6f8;
  --ui-kb-rule: #a4a4ac;
  --ui-kb-accent: #2f6bff;
  --ui-kb-soft: #a9c4ff;
  --ui-kb-good: #12a36b;
  --ui-kb-bad: #d6453d;
  --ui-kb-tip: #1c1c20;
  --ui-kb-focus: rgba(23, 23, 23, 0.22);
  --ui-kb-ease: cubic-bezier(0.32, 0.72, 0.24, 1);
  box-sizing: border-box;
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 8px;
  width: 100%;
  min-width: 0;
  container-type: inline-size;
  font-family: "Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  font-size: 13.5px;
  line-height: 20px;
  color: var(--ui-kb-text);
  text-align: left;
  -webkit-font-smoothing: antialiased;
}
.ui-kb *, .ui-kb *::before, .ui-kb *::after { box-sizing: border-box; }
:where(.ui-kb) button { margin: 0; padding: 0; border: 0; background: none; font: inherit; color: inherit; cursor: pointer; -webkit-tap-highlight-color: transparent; }
.ui-kb button:focus-visible { outline: 2px solid var(--ui-kb-focus); outline-offset: 2px; }
.ui-kb svg { display: block; }
.ui-kb b { font-weight: 600; color: var(--ui-kb-ink); }
.ui-kb i { font-style: normal; }

/* ----- The bar above the cards: a heading, and the date range for all of them ----- */
.ui-kb__bar { grid-column: 1 / -1; display: flex; align-items: center; justify-content: flex-end; gap: 12px; min-height: 30px; }
.ui-kb__heading { flex: 1; min-width: 0; margin: 0; overflow: hidden; font-size: 17px; font-weight: 600; line-height: 24px; letter-spacing: -0.01em; color: var(--ui-kb-ink); white-space: nowrap; text-overflow: ellipsis; }

/* ----- Cards: white, a hairline, a whisper of shadow ----- */
.ui-kb__card { grid-column: span 2; display: flex; flex-direction: column; min-width: 0; padding: 16px 16px 14px; border: 1px solid var(--ui-kb-line); border-radius: 12px; background: var(--ui-kb-card); box-shadow: 0 1px 2px rgba(16, 16, 24, 0.04); animation: ui-kb-rise 620ms var(--ui-kb-ease) both; animation-delay: calc(var(--n) * 60ms); }
.ui-kb__overview { grid-column: span 4; }
.ui-kb__focus { padding-bottom: 16px; }
.ui-kb__row { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; min-width: 0; }
.ui-kb__pair { display: grid; min-width: 0; font-variant-numeric: tabular-nums; }
.ui-kb__pair > * { overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }
.ui-kb__pair b { font-size: 14px; }
.ui-kb__pair span { color: var(--ui-kb-muted); }
.ui-kb__pair--end { justify-items: end; flex: none; text-align: right; }
.ui-kb__change { display: inline-flex; align-items: center; gap: 5px; font-size: 14px; font-weight: 600; color: var(--ui-kb-bad); font-variant-numeric: tabular-nums; }
.ui-kb__change[data-good] { color: var(--ui-kb-good); }

/* ----- One look for every chart: thin angular line, quiet fill, a floor line ----- */
.ui-kb__plot { position: relative; margin-top: 14px; border-bottom: 1px solid var(--ui-kb-line); cursor: crosshair; touch-action: pan-y; }
.ui-kb__plot--small { height: 64px; }
.ui-kb__plot--large { flex: 1; min-height: 190px; margin-top: 16px; border-bottom: 0; }
.ui-kb__plot svg { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; animation: ui-kb-draw 1100ms var(--ui-kb-ease) both; animation-delay: calc(120ms + var(--n) * 60ms); }
.ui-kb__line { fill: none; stroke: var(--ui-kb-accent); stroke-width: 1.5; stroke-linejoin: miter; stroke-linecap: round; vector-effect: non-scaling-stroke; }
.ui-kb__line--soft { stroke: var(--ui-kb-soft); }
.ui-kb__fill { fill: var(--ui-kb-well); }
.ui-kb__grid { fill: none; stroke: var(--ui-kb-line); stroke-width: 1; stroke-dasharray: 4 4; vector-effect: non-scaling-stroke; }
.ui-kb__axis { position: relative; display: flex; justify-content: space-between; height: 16px; margin-top: 8px; font-size: 12px; line-height: 16px; color: var(--ui-kb-muted); white-space: nowrap; }

/* Pointing at a day */
.ui-kb__rule { position: absolute; bottom: 0; width: 0; margin-left: -0.5px; border-left: 1px dashed var(--ui-kb-rule); pointer-events: none; }
.ui-kb__dot { position: absolute; z-index: 1; width: 8px; height: 8px; margin: -4px 0 0 -4px; border: 1.5px solid var(--ui-kb-accent); border-radius: 50%; background: var(--ui-kb-card); pointer-events: none; }
.ui-kb__dot--soft { border-color: var(--ui-kb-soft); }
.ui-kb__tag { position: absolute; z-index: 2; display: inline-flex; gap: 12px; height: 24px; padding: 0 8px; border: 1px solid var(--ui-kb-line); border-radius: 6px; background: var(--ui-kb-card); box-shadow: 0 2px 6px rgba(16, 16, 24, 0.06); font-size: 12px; line-height: 22px; color: var(--ui-kb-text); white-space: nowrap; pointer-events: none; transform: translate(10px, -130%); font-variant-numeric: tabular-nums; animation: ui-kb-in 160ms ease both; }
.ui-kb__tag[data-side="left"] { transform: translate(calc(-100% - 10px), -130%); }
.ui-kb__tag b { font-weight: 500; color: var(--ui-kb-accent); }
.ui-kb__axis-tag { position: absolute; top: -4px; height: 22px; padding: 0 7px; border: 1px solid var(--ui-kb-line); border-radius: 6px; background: var(--ui-kb-card); line-height: 20px; color: var(--ui-kb-ink); transform: translateX(-50%); }

/* ----- Overview ----- */
.ui-kb__row--top { padding-bottom: 14px; border-bottom: 1px solid var(--ui-kb-line); }
.ui-kb__label { font-size: 13px; color: var(--ui-kb-text); }
.ui-kb__figure { display: flex; flex-wrap: wrap; align-items: baseline; gap: 2px 10px; margin-top: 4px; font-variant-numeric: tabular-nums; }
.ui-kb__figure b { font-size: 24px; line-height: 30px; letter-spacing: -0.02em; }
.ui-kb__figure--small b { font-size: 19px; line-height: 26px; }
.ui-kb__vs { display: inline-flex; align-items: baseline; gap: 5px; font-size: 13px; color: var(--ui-kb-muted); white-space: nowrap; }
.ui-kb__vs i { font-weight: 600; color: var(--ui-kb-bad); }
.ui-kb__vs i[data-good] { color: var(--ui-kb-good); }
.ui-kb__vs .ui-kb__change { font-size: 13px; }
.ui-kb__pick { position: relative; flex: none; }
.ui-kb__pick-button { display: inline-flex; align-items: center; gap: 8px; height: 30px; padding: 0 9px 0 11px; border: 1px solid var(--ui-kb-line); border-radius: 8px; background: var(--ui-kb-card); box-shadow: 0 1px 1px rgba(16, 16, 24, 0.04); font-size: 12.5px; color: var(--ui-kb-ink); white-space: nowrap; transition: border-color 160ms ease, background-color 160ms ease; }
.ui-kb__pick-button:hover, .ui-kb__pick[data-open] .ui-kb__pick-button { border-color: #cfcfd6; }
.ui-kb__pick[data-open] .ui-kb__pick-button { background: var(--ui-kb-well); }
.ui-kb__pick-button svg { color: var(--ui-kb-muted); transition: transform 240ms var(--ui-kb-ease); }
.ui-kb__pick[data-open] .ui-kb__pick-button svg { transform: rotate(180deg); }
.ui-kb__menu { position: absolute; top: calc(100% + 6px); right: 0; z-index: 10; min-width: max(100%, 148px); margin: 0; padding: 4px; border: 1px solid var(--ui-kb-line); border-radius: 10px; background: var(--ui-kb-card); box-shadow: 0 10px 28px rgba(16, 16, 24, 0.1), 0 2px 6px rgba(16, 16, 24, 0.05); list-style: none; transform-origin: 100% 0; animation: ui-kb-menu 200ms var(--ui-kb-ease) both; }
.ui-kb__option { display: flex; align-items: center; justify-content: space-between; gap: 14px; height: 30px; padding: 0 8px 0 9px; border-radius: 7px; font-size: 12.5px; color: var(--ui-kb-text); white-space: nowrap; cursor: pointer; }
.ui-kb__option[data-active] { background: var(--ui-kb-well); color: var(--ui-kb-ink); }
.ui-kb__option[aria-selected="true"] { font-weight: 500; color: var(--ui-kb-ink); }
.ui-kb__option svg { color: var(--ui-kb-accent); }

.ui-kb__tip { position: absolute; z-index: 3; min-width: 168px; padding: 9px 11px 10px; border-radius: 8px; background: var(--ui-kb-tip); box-shadow: 0 8px 24px rgba(16, 16, 24, 0.18); font-size: 12.5px; line-height: 20px; color: rgba(255, 255, 255, 0.72); pointer-events: none; transform: translate(14px, calc(-100% - 12px)); font-variant-numeric: tabular-nums; animation: ui-kb-in 160ms ease both; }
.ui-kb__tip[data-side="left"] { transform: translate(calc(-100% - 14px), calc(-100% - 12px)); }
.ui-kb__tip b { font-weight: 500; color: #fff; }
.ui-kb__tip-head { display: flex; justify-content: space-between; gap: 16px; margin-bottom: 6px; color: #fff; }
.ui-kb__tip-head b { color: #4ade9b; }
.ui-kb__tip-row { display: flex; align-items: center; gap: 7px; }
.ui-kb__tip-row span { flex: 1; }
.ui-kb__tip-row i { width: 7px; height: 7px; border: 1.5px solid #7ea2ff; border-radius: 50%; }
.ui-kb__tip-row[data-soft] i { border-color: #5a6a96; }

/* ----- Focus card ----- */
.ui-kb__focus .ui-kb__row--top { align-items: center; min-height: 69px; margin-bottom: 16px; }
.ui-kb__focus .ui-kb__plot--small { flex: 1; min-height: 64px; margin-top: 16px; }
.ui-kb__product { display: flex; align-items: center; gap: 12px; min-width: 0; }
.ui-kb__product b { font-size: 14.5px; font-weight: 500; }
.ui-kb__icon { display: grid; flex: none; place-items: center; width: 36px; height: 36px; border: 1px solid var(--ui-kb-line); border-radius: 9px; box-shadow: 0 1px 1px rgba(16, 16, 24, 0.04); color: var(--ui-kb-text); }
.ui-kb__focus .ui-kb__label { font-size: 12.5px; color: var(--ui-kb-muted); }
.ui-kb__legend { display: flex; flex-wrap: wrap; align-items: baseline; gap: 2px 8px; margin-top: 12px; font-size: 12.5px; color: var(--ui-kb-muted); white-space: nowrap; font-variant-numeric: tabular-nums; }
.ui-kb__legend b { margin-right: 6px; font-weight: 500; color: var(--ui-kb-accent); }
.ui-kb__legend b[data-soft] { color: var(--ui-kb-soft); }
.ui-kb__setup { display: inline-flex; flex: none; align-items: center; gap: 6px; height: 30px; padding: 0 11px 0 9px; border: 1px solid var(--ui-kb-line); border-radius: 8px; background: var(--ui-kb-card); box-shadow: 0 1px 1px rgba(16, 16, 24, 0.04); font-size: 12.5px; color: var(--ui-kb-ink); white-space: nowrap; transition: border-color 160ms ease, background-color 160ms ease; }
.ui-kb__setup:hover { border-color: #cfcfd6; background: var(--ui-kb-well); }
.ui-kb__setup svg { color: var(--ui-kb-muted); }
.ui-kb__action { height: 34px; margin-top: auto; border: 1px solid var(--ui-kb-line); border-radius: 8px; background: var(--ui-kb-card); box-shadow: 0 1px 2px rgba(16, 16, 24, 0.06); font-size: 13px; font-weight: 500; color: var(--ui-kb-ink); transition: background-color 160ms ease; }
.ui-kb__legend + .ui-kb__action { margin-top: 16px; }
.ui-kb__action:hover { background: var(--ui-kb-well); }

@keyframes ui-kb-rise { from { opacity: 0; transform: translateY(8px); } }
@keyframes ui-kb-draw { from { clip-path: inset(0 100% 0 0); } to { clip-path: inset(-8px -8px -8px -8px); } }
@keyframes ui-kb-in { from { opacity: 0; } }
@keyframes ui-kb-menu { from { opacity: 0; transform: translateY(-4px) scale(0.97); } }

/* Narrower containers: the overview and the focus card take a full row, then everything stacks */
@container (max-width: 820px) {
  .ui-kb__overview, .ui-kb__focus { grid-column: span 6; }
  /* Three small cards still share a row – the change moves under the label, and its words give way */
  .ui-kb__stat .ui-kb__row { flex-direction: column; gap: 2px; }
  .ui-kb__stat .ui-kb__pair--end { justify-items: start; text-align: left; }
  .ui-kb__stat .ui-kb__change { font-size: 12.5px; }
  .ui-kb__stat .ui-kb__pair--end > span:last-child { display: none; }
}
@container (max-width: 600px) {
  .ui-kb { gap: 8px; }
  .ui-kb__card { grid-column: span 6; }
  .ui-kb__stat .ui-kb__row { flex-direction: row; gap: 12px; }
  .ui-kb__stat .ui-kb__pair--end { justify-items: end; text-align: right; }
  .ui-kb__stat .ui-kb__change { font-size: 14px; }
  .ui-kb__stat .ui-kb__pair--end > span:last-child { display: block; }
  .ui-kb__row--top { flex-wrap: wrap; }
  .ui-kb__plot--large { min-height: 160px; }
}

@media (pointer: coarse) {
  .ui-kb__pick-button, .ui-kb__setup { height: 36px; }
  .ui-kb__option { height: 38px; }
  .ui-kb__action { height: 40px; }
}

@media (prefers-reduced-motion: reduce) {
  .ui-kb *, .ui-kb *::before, .ui-kb *::after { animation: none !important; transition: none !important; }
}

/* Dark mode: follows a .dark class or data-theme="dark" on any ancestor, e.g. <html> */
:where(.dark, [data-theme="dark"]) .ui-kb {
  --ui-kb-card: #19191b;
  --ui-kb-line: #2a2a2e;
  --ui-kb-ink: #ededed;
  --ui-kb-text: #b9b9bf;
  --ui-kb-muted: #84848c;
  --ui-kb-well: #202024;
  --ui-kb-rule: #6a6a72;
  --ui-kb-accent: #5b8cff;
  --ui-kb-soft: #37508f;
  --ui-kb-good: #4ade9b;
  --ui-kb-bad: #ff8f86;
  --ui-kb-tip: #2c2c32;
  --ui-kb-focus: rgba(255, 255, 255, 0.3);
}
:where(.dark, [data-theme="dark"]) .ui-kb__pick-button:hover, :where(.dark, [data-theme="dark"]) .ui-kb__pick[data-open] .ui-kb__pick-button { border-color: #45454c; }
:where(.dark, [data-theme="dark"]) .ui-kb__menu { box-shadow: 0 12px 30px rgba(0, 0, 0, 0.5); }
`;
var demoWidth = 960;
var rangeOptions = [
  {
    id: `7d`,
    label: `Last 7 days`,
  },
  {
    id: `30d`,
    label: `Last 30 days`,
  },
  {
    id: `90d`,
    label: `Last 90 days`,
  },
];
var segmentOptions = [
  {
    id: `all`,
    label: `All items`,
  },
  {
    id: `pro`,
    label: `Pro`,
  },
  {
    id: `team`,
    label: `Team`,
  },
];
var seededRandom = (seed: number) => {
  let state = seed;
  return () => ((state = (state * 9301 + 49297) % 233280), state / 233280);
};
var monthNames = [
  `Jan`,
  `Feb`,
  `Mar`,
  `Apr`,
  `May`,
  `Jun`,
  `Jul`,
  `Aug`,
  `Sep`,
  `Oct`,
  `Nov`,
  `Dec`,
];
var demoAnchor = new Date(2026, 9, 12);
var makeDateLabels = (count: number, stepDays: number) =>
  Array.from(
    {
      length: count,
    },
    (n, r) => {
      if (r === count - 1) return `Today`;
      let i = new Date(demoAnchor.getTime() - (count - 1 - r) * stepDays * 864e5);
      return `${i.getDate()} ${monthNames[i.getMonth()]}`;
    },
  );
var makeSeriesValues = (
  count: number,
  base: number,
  trend: number,
  variance: number,
  seed: number,
) => {
  let random = seededRandom(seed),
    momentum = 0;
  return Array.from(
    {
      length: count,
    },
    (i, s) => {
      let c = random();
      c > 0.22 && (momentum = momentum * 0.45 + (random() - 0.5) * variance * 0.5);
      let l = c > 0.92 ? variance * 0.22 : c < 0.06 ? -variance * 0.18 : 0;
      return Math.max(0, Math.round(base * (1 + (trend * s) / count + momentum + l)));
    },
  );
};
function makeBoardData(count: number, stepDays: number, scale: number, seed: number) {
  let labels = makeDateLabels(count, stepDays),
    revenue = makeSeriesValues(count, 156 * stepDays * scale, 0.5, 0.5, seed),
    licenses = makeSeriesValues(count, 24 * stepDays * scale, 0.45, 0.5, seed + 4);
  return {
    stats: [
      {
        id: `revenue`,
        label: `Total revenue`,
        kind: `money`,
        labels: labels,
        values: revenue,
        previous: Math.round(revenue.reduce((e, t) => e + t, 0) * 0.83),
      },
      {
        id: `emails`,
        label: `Emails sent`,
        kind: `count`,
        labels: labels,
        values: makeSeriesValues(count, 1620 * stepDays * scale, 0.1, 0.7, seed + 2),
        previous: Math.round(1540 * stepDays * count * scale),
      },
      {
        id: `refunds`,
        label: `Refunds`,
        kind: `count`,
        labels: labels,
        values: makeSeriesValues(count, Math.max(3, 4 * stepDays) * scale, -0.3, 1.5, seed + 3),
        previous: Math.round(Math.max(3, 4 * stepDays) * 1.2 * count * scale),
        lowerIsBetter: true,
      },
    ],
    overview: {
      title: `Sales overview`,
      labels: labels,
      current: makeSeriesValues(count, 122 * stepDays * scale, 0.9, 0.42, seed + 1),
      previous: makeSeriesValues(count, 98 * stepDays * scale, 0.45, 0.3, seed + 7),
    },
    focus: {
      title: `Pro license`,
      note: `One-time`,
      metric: `Licenses sold`,
      unit: `licenses`,
      labels: labels,
      values: licenses,
      previous: Math.round(licenses.reduce((e, t) => e + t, 0) * 0.89),
    },
  };
}
function makeSegmentedBoardData(count: number, stepDays: number, seed: number) {
  let base = makeBoardData(count, stepDays, 1, seed),
    pro = makeBoardData(count, stepDays, 0.64, seed + 1).overview,
    team = makeBoardData(count, stepDays, 0.36, seed + 2).overview;
  return {
    ...base,
    overview: {
      ...base.overview,
      segments: {
        pro: {
          current: pro.current,
          previous: pro.previous,
        },
        team: {
          current: team.current,
          previous: team.previous,
        },
      },
    },
  };
}
var demoData = {
  "7d": makeSegmentedBoardData(21, 1 / 3, 11),
  "30d": makeSegmentedBoardData(30, 1, 23),
  "90d": makeSegmentedBoardData(45, 2, 37),
};
function KPIBoardDemo() {
  let rootRef = React.useRef<HTMLDivElement | null>(null),
    [fit, setFit] = React.useState<{ scale: number; card: boolean } | null>(null),
    [range, setRange] = React.useState(`30d`),
    pausedRef = React.useRef(false);
  (React.useLayoutEffect(() => {
    let t = rootRef.current,
      n = t?.closest(`.card__preview`),
      r = n ?? t?.closest(`.stage`);
    if (!t || !r) return;
    let a = () => {
      let e = r.clientWidth;
      if (n)
        return setFit({
          scale: (e - 48) / demoWidth,
          card: true,
        });
      if (e < 760) return setFit(null);
      setFit({
        scale: Math.min(0.82, (e - 168) / demoWidth),
        card: false,
      });
    };
    a();
    let o = new ResizeObserver(a);
    return (o.observe(r), () => o.disconnect());
  }, []),
    React.useEffect(() => {
      let e = window.setInterval(() => {
        pausedRef.current ||
          setRange(
            (e) =>
              rangeOptions[(rangeOptions.findIndex((t) => t.id === e) + 1) % rangeOptions.length]
                .id,
          );
      }, 3600);
      return () => window.clearInterval(e);
    }, []));
  let pause = () => (pausedRef.current = true);
  return (
    <div
      ref={rootRef}
      className={`kb-demo`}
      data-fit={fit ? (fit.card ? `card` : `stage`) : void 0}
      onPointerEnter={pause}
      onPointerDownCapture={pause}
      onKeyDownCapture={pause}
      onFocusCapture={pause}
    >
      <div
        className={`kb-demo__frame`}
        style={
          fit
            ? fit.card
              ? {
                  width: demoWidth,
                  transform: `scale(${fit.scale})`,
                }
              : {
                  width: demoWidth,
                  zoom: fit.scale,
                }
            : void 0
        }
      >
        <KpiBoard
          data={demoData}
          ranges={rangeOptions}
          range={range}
          onRangeChange={setRange}
          segments={segmentOptions}
          compareLabel={`vs. last period`}
          title={`Dashboard`}
          setup={{
            label: `Set up`,
            onClick: () => {},
          }}
          action={{
            label: `See full analytics`,
            onClick: () => {},
          }}
        />
      </div>
    </div>
  );
}
const demoStyles =
  ".kb-demo{align-self:stretch;width:100%;min-width:0;padding:20px 16px}.kb-demo[data-fit=stage]{justify-items:center;padding:36px 0;display:grid}.card__preview .kb-demo{padding:0;position:absolute;inset:0;overflow:hidden;-webkit-mask-image:linear-gradient(#000 72%,#0000);mask-image:linear-gradient(#000 72%,#0000)}.kb-demo[data-fit=card] .kb-demo__frame{transform-origin:0 0;position:absolute;top:40px;left:24px}.kb-demo__frame{min-width:0}@media (width<=760px){.kb-demo{padding-top:96px}}\n";
function KpiBoardDemo() {
  return (
    <>
      <style href="plico-demo-kpi-board" precedence="default">
        {demoStyles}
      </style>
      <KPIBoardDemo />
    </>
  );
}
export { KpiBoard as Component };
export { KpiBoardDemo as Demo };
export { KpiBoard };
export { KpiBoardDemo };
export default KpiBoard;

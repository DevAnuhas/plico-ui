"use client";

import * as React from "react";
import * as JSXRuntime from "react/jsx-runtime";
var formatUsageNumber = (value, decimals = 0) =>
  new Intl.NumberFormat(`en-US`, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
var withUsageUnit = (value, unit) => (unit ? `${value} ${unit}` : value);
var resetDateFormatter = new Intl.DateTimeFormat(`en-US`, {
  month: `short`,
  day: `numeric`,
});
function resetCountdown(date) {
  let days = Math.ceil((date.getTime() - Date.now()) / 864e5);
  return days <= 0 ? `Resets today` : days === 1 ? `Resets tomorrow` : `Resets in ${days} days`;
}
var categoryColors = [
  `var(--ui-um-c1)`,
  `var(--ui-um-c2)`,
  `var(--ui-um-c3)`,
  `var(--ui-um-c4)`,
  `var(--ui-um-c5)`,
];
var easeOutQuart = (progress) => 1 - (1 - progress) ** 4;
var prefersReducedMotion = () =>
  typeof window < `u` && window.matchMedia(`(prefers-reduced-motion: reduce)`).matches;
function useAnimatedValues(targets, initialDuration, updateDuration) {
  let [values, setValues] = React.useState(() =>
      Object.fromEntries(Object.keys(targets).map((e) => [e, 0])),
    ),
    currentRef = React.useRef(values),
    hasAnimatedRef = React.useRef(false),
    signature = JSON.stringify(targets);
  return (
    React.useEffect(() => {
      let e = JSON.parse(signature),
        n = {
          ...currentRef.current,
        };
      if (prefersReducedMotion()) {
        ((currentRef.current = e), setValues(e));
        return;
      }
      let i = Object.values(e).some((e) => e !== 0),
        d = i && !hasAnimatedRef.current ? initialDuration : updateDuration;
      i && (hasAnimatedRef.current = true);
      let f = performance.now(),
        p = 0,
        m = (t) => {
          let r = Math.min(1, (t - f) / d),
            i = easeOutQuart(r),
            s = {};
          for (let t in e) s[t] = (n[t] ?? 0) + (e[t] - (n[t] ?? 0)) * i;
          ((currentRef.current = s), setValues(s), r < 1 && (p = requestAnimationFrame(m)));
        };
      return ((p = requestAnimationFrame(m)), () => cancelAnimationFrame(p));
    }, [signature]),
    (e) => values[e] ?? 0
  );
}
function positionPill(container, pill, selector) {
  if (!container || !pill) return;
  let option = container.querySelector(selector);
  if (!option || !option.offsetWidth) {
    pill.style.opacity = `0`;
    return;
  }
  let firstPlacement = !pill.dataset.ready;
  (firstPlacement && (pill.style.transition = `none`),
    (pill.style.opacity = `1`),
    (pill.style.width = `${option.offsetWidth}px`),
    (pill.style.height = `${option.offsetHeight}px`),
    (pill.style.transform = `translate(${option.offsetLeft}px, ${option.offsetTop}px)`),
    firstPlacement && ((pill.dataset.ready = `1`), pill.offsetWidth, (pill.style.transition = ``)));
}
function mergeUsageRows(previousRows, nextRows) {
  let merged = [...nextRows];
  return (
    previousRows.forEach((e, r) => {
      nextRows.some((t) => t.label === e.label) ||
        merged.splice(Math.min(r, merged.length), 0, {
          ...e,
          value: 0,
          leaving: true,
        });
    }),
    merged
  );
}
function UsageMeter({
  total: total,
  used: used,
  limits = [],
  periods: periods,
  period: period,
  defaultPeriod: defaultPeriod,
  onPeriodChange: onPeriodChange,
  resetAt: resetAt,
  daily: daily,
  onUpgrade: onUpgrade,
  title = `Usage`,
  plan: plan,
  unit = `credits`,
  warnAt = 0.8,
  upgradeLabel = `Upgrade`,
  topUpLabel = `Add credits`,
  className: className,
}) {
  let instanceId = React.useId(),
    rootRef = React.useRef(null),
    cardRef = React.useRef(null),
    innerRef = React.useRef(null),
    periodRef = React.useRef(null),
    pillRef = React.useRef(null),
    actionRef = React.useRef(null),
    actionInnerRef = React.useRef(null),
    [internalPeriod, setInternalPeriod] = React.useState(defaultPeriod ?? periods?.[0]?.id),
    activePeriod = period ?? internalPeriod,
    [visible, setVisible] = React.useState(false),
    [activeLabel, setActiveLabel] = React.useState(null),
    [lastLabel, setLastLabel] = React.useState(null),
    [activeDay, setActiveDay] = React.useState(null),
    [announcement, setAnnouncement] = React.useState(``),
    colorsRef = React.useRef(new Map()),
    getCategoryColor = (category) =>
      category.color
        ? category.color
        : (colorsRef.current.has(category.label) ||
            colorsRef.current.set(
              category.label,
              categoryColors[colorsRef.current.size % categoryColors.length],
            ),
          colorsRef.current.get(category.label)),
    coloredUsed = used.map((e) => ({
      ...e,
      color: getCategoryColor(e),
    })),
    [displayRows, setDisplayRows] = React.useState(coloredUsed),
    rowsSignature = used.map((e) => `${e.label}:${e.value}:${e.color ?? ``}`).join(`|`),
    firstRowsRef = React.useRef(true);
  (React.useLayoutEffect(() => {
    if (firstRowsRef.current) {
      firstRowsRef.current = false;
      return;
    }
    setDisplayRows((e) =>
      mergeUsageRows(
        e.filter((e) => !e.leaving),
        coloredUsed,
      ),
    );
    let e = window.setTimeout(() => setDisplayRows((e) => e.filter((e) => !e.leaving)), 460);
    return () => clearTimeout(e);
  }, [rowsSignature]),
    React.useEffect(() => {
      let e = rootRef.current;
      if (!e || typeof IntersectionObserver > `u`) {
        setVisible(true);
        return;
      }
      let t = new IntersectionObserver(
        (e) => {
          e.some((e) => e.isIntersecting) && (setVisible(true), t.disconnect());
        },
        {
          threshold: 0.2,
        },
      );
      return (t.observe(e), () => t.disconnect());
    }, []));
  let usedTotal = used.reduce((e, t) => e + Math.max(0, t.value), 0),
    ratio = total > 0 ? usedTotal / total : 0,
    state = ratio >= 1 ? `limit` : ratio >= warnAt ? `warn` : `ok`,
    barTotal = Math.max(total, usedTotal) || 1,
    targets = {
      used: usedTotal,
      left: Math.max(0, total - usedTotal),
      pct: ratio * 100,
    };
  if (
    (displayRows.forEach((e) => (targets[`r:${e.label}`] = e.leaving ? 0 : Math.max(0, e.value))),
    limits.forEach((e) => (targets[`l:${e.label}`] = e.used)),
    daily?.forEach((e, t) => (targets[`d:${t}`] = e.value ?? 0)),
    !visible)
  )
    for (let e in targets) targets[e] = 0;
  let animatedValue = useAnimatedValues(targets, 1200, 650),
    segmentOffset = 0,
    segments = displayRows.map((e) => {
      let t = (animatedValue(`r:${e.label}`) / barTotal) * 100,
        n = {
          ...e,
          left: segmentOffset,
          width: t,
        };
      return ((segmentOffset += t), n);
    }),
    activeRow = displayRows.find((e) => e.label === activeLabel && !e.leaving),
    lastRow = displayRows.find((e) => e.label === lastLabel),
    lastSegment = segments.find((e) => e.label === lastLabel),
    tipPercent = lastSegment
      ? Math.min(100, Math.max(0, lastSegment.left + lastSegment.width / 2))
      : 50,
    highlight = (label) => {
      (setActiveLabel(label), label && setLastLabel(label));
    },
    hitCategory = (event) => {
      let rect = event.currentTarget.getBoundingClientRect(),
        percent = ((event.clientX - rect.left) / rect.width) * 100;
      return (
        segments.find(
          (e) => !e.leaving && e.width > 0 && percent >= e.left && percent <= e.left + e.width,
        )?.label ?? null
      );
    },
    handleBarKeyDown = (event) => {
      let categories = displayRows.filter((e) => !e.leaving && e.value > 0);
      if (!categories.length) return;
      let activeIndex = categories.findIndex((e) => e.label === activeLabel);
      if (event.key === `ArrowRight`)
        highlight(categories[(activeIndex + 1) % categories.length].label);
      else if (event.key === `ArrowLeft`)
        highlight(categories[(activeIndex - 1 + categories.length) % categories.length].label);
      else if (event.key === `Escape`) highlight(null);
      else return;
      event.preventDefault();
    },
    dailyData = daily ?? [],
    dailyMax = Math.max(1, ...dailyData.map((e) => e.value ?? 0)),
    pastDays = dailyData.filter((e) => e.value !== null),
    average = pastDays.length
      ? pastDays.reduce((e, t) => e + (t.value ?? 0), 0) / pastDays.length
      : 0,
    hitDay = (event) => {
      let rect = event.currentTarget.getBoundingClientRect(),
        index = Math.floor(((event.clientX - rect.left) / rect.width) * dailyData.length);
      return Math.min(dailyData.length - 1, Math.max(0, index));
    },
    handleDailyKeyDown = (event) => {
      if (dailyData.length) {
        if (event.key === `ArrowRight`)
          setActiveDay((e) => Math.min(dailyData.length - 1, e === null ? 0 : e + 1));
        else if (event.key === `ArrowLeft`)
          setActiveDay((e) => Math.max(0, e === null ? dailyData.length - 1 : e - 1));
        else if (event.key === `Escape`) setActiveDay(null);
        else return;
        event.preventDefault();
      }
    },
    selectedDay = activeDay === null ? void 0 : dailyData[activeDay],
    previousDailyCountRef = React.useRef(dailyData.length),
    dailyRegrowRef = React.useRef(false);
  previousDailyCountRef.current !== dailyData.length &&
    ((previousDailyCountRef.current = dailyData.length), (dailyRegrowRef.current = true));
  let changePeriod = (nextPeriod) => {
      nextPeriod !== activePeriod &&
        (period === void 0 && setInternalPeriod(nextPeriod),
        onPeriodChange?.(nextPeriod),
        setActiveLabel(null),
        setActiveDay(null));
    },
    handlePeriodKeyDown = (event) => {
      if (!periods?.length) return;
      let currentIndex = periods.findIndex((e) => e.id === activePeriod),
        nextIndex = -1;
      (event.key === `ArrowRight` || event.key === `ArrowDown`
        ? (nextIndex = (currentIndex + 1) % periods.length)
        : (event.key === `ArrowLeft` || event.key === `ArrowUp`) &&
          (nextIndex = (currentIndex - 1 + periods.length) % periods.length),
        !(nextIndex < 0) &&
          (event.preventDefault(),
          changePeriod(periods[nextIndex].id),
          periodRef.current?.querySelectorAll(`[role=radio]`)[nextIndex]?.focus()));
    };
  (React.useLayoutEffect(() => {
    positionPill(periodRef.current, pillRef.current, `[aria-checked="true"]`);
  }),
    React.useLayoutEffect(() => {
      let e = periodRef.current;
      if (!e) return;
      let t = new ResizeObserver(() => positionPill(e, pillRef.current, `[aria-checked="true"]`));
      return (t.observe(e), () => t.disconnect());
    }, []),
    React.useLayoutEffect(() => {
      let e = cardRef.current,
        t = innerRef.current;
      if (!e || !t) return;
      let n = () => (e.style.height = `${t.offsetHeight}px`);
      n();
      let r = new ResizeObserver(n);
      return (r.observe(t), () => r.disconnect());
    }, []),
    React.useLayoutEffect(() => {
      let e = actionRef.current,
        t = actionInnerRef.current;
      if (!e || !t) return;
      let n = () => (e.style.width = `${t.offsetWidth}px`);
      n();
      let r = new ResizeObserver(n);
      return (r.observe(t), () => r.disconnect());
    }, []));
  let previousStateRef = React.useRef(state);
  React.useEffect(() => {
    previousStateRef.current !== state &&
      ((previousStateRef.current = state),
      setAnnouncement(
        state === `limit`
          ? `${title}: limit reached, ${formatUsageNumber(usedTotal)} of ${formatUsageNumber(total)} ${unit} used`
          : state === `warn`
            ? `${title}: running low, ${Math.round(ratio * 100)}% of ${unit} used`
            : `${title}: ${formatUsageNumber(usedTotal)} of ${formatUsageNumber(total)} ${unit} used`,
      ));
  }, [state]);
  let resetDate = resetAt === void 0 ? null : new Date(resetAt),
    needsAttention = state !== `ok`,
    animatedPercent = animatedValue(`pct`);
  return (
    <section
      ref={rootRef}
      className={[`ui-um`, className].filter(Boolean).join(` `)}
      aria-labelledby={`${instanceId}-title`}
      data-state={state}
    >
      <style href={`ui-usage-meter`} precedence={`default`}>
        {usageMeterStyles}
      </style>
      <div ref={cardRef} className={`ui-um__card`}>
        <div ref={innerRef} className={`ui-um__inner`}>
          <header className={`ui-um__head`}>
            <div className={`ui-um__heading`}>
              <h3 id={`${instanceId}-title`} className={`ui-um__title`}>
                {title}
              </h3>
              {(plan || resetDate) && (
                <p className={`ui-um__sub`}>
                  {plan}
                  {plan && resetDate && <span className={`ui-um__sep`}>{`·`}</span>}
                  {resetDate && (
                    <time
                      dateTime={resetDate.toISOString()}
                      title={`Resets on ${resetDateFormatter.format(resetDate)}`}
                    >
                      {resetCountdown(resetDate)}
                    </time>
                  )}
                </p>
              )}
            </div>
            {periods && periods.length > 1 && (
              <div
                ref={periodRef}
                className={`ui-um__switch`}
                role={`radiogroup`}
                aria-label={`Period`}
                onKeyDown={handlePeriodKeyDown}
              >
                <span ref={pillRef} className={`ui-um__pill`} aria-hidden={`true`} />
                {periods.map((e) => (
                  <button
                    type={`button`}
                    role={`radio`}
                    aria-checked={e.id === activePeriod}
                    tabIndex={e.id === activePeriod ? 0 : -1}
                    className={`ui-um__option`}
                    onClick={() => changePeriod(e.id)}
                    key={e.id}
                  >
                    {e.label}
                  </button>
                ))}
              </div>
            )}
          </header>
          <div className={`ui-um__figure`}>
            <p className={`ui-um__amount`}>
              <span className={`ui-um__big`}>{formatUsageNumber(animatedValue(`used`))}</span>
              <span className={`ui-um__of`}>
                {`of `}
                {withUsageUnit(formatUsageNumber(total), unit)}
              </span>
            </p>
            <span className={`ui-um__pct`} data-state={state}>
              {needsAttention && <span className={`ui-um__dot`} aria-hidden={`true`} />}
              {formatUsageNumber(Math.min(animatedPercent, 999))}
              {`%`}
            </span>
          </div>
          <div
            className={`ui-um__bar`}
            tabIndex={0}
            role={`group`}
            aria-label={`${formatUsageNumber(usedTotal)} of ${formatUsageNumber(total)} ${unit} used – arrow keys read each category`}
            data-active={activeRow ? `` : void 0}
            onPointerMove={(e) => e.pointerType === `mouse` && highlight(hitCategory(e))}
            onPointerLeave={(e) => e.pointerType === `mouse` && highlight(null)}
            onPointerUp={(e) => {
              if (e.pointerType === `mouse`) return;
              let t = hitCategory(e);
              highlight(t === activeLabel ? null : t);
            }}
            onKeyDown={handleBarKeyDown}
            onBlur={() => highlight(null)}
          >
            <div
              className={`ui-um__track`}
              role={`meter`}
              aria-valuemin={0}
              aria-valuemax={total}
              aria-valuenow={Math.min(usedTotal, total)}
              aria-valuetext={`${formatUsageNumber(usedTotal)} of ${formatUsageNumber(total)} ${unit}`}
            >
              {segments.map((e) => (
                <span
                  className={`ui-um__seg`}
                  data-active={e.label === activeLabel || void 0}
                  style={{
                    width: `${e.width}%`,
                    background: e.color,
                  }}
                  key={e.label}
                />
              ))}
            </div>
            <div
              className={`ui-um__tip`}
              data-open={activeRow ? `` : void 0}
              style={{
                left: `${tipPercent}%`,
                "--ui-um-tip-x": `${-tipPercent}%`,
              }}
              aria-live={`polite`}
            >
              {lastRow && (
                <>
                  <span className={`ui-um__tip-label`}>
                    <span
                      className={`ui-um__swatch`}
                      style={{
                        background: lastRow.color,
                      }}
                    />
                    {lastRow.label}
                  </span>
                  <span className={`ui-um__tip-value`}>
                    {withUsageUnit(formatUsageNumber(lastRow.value), unit)}
                    <span className={`ui-um__muted`}>
                      {` · `}
                      {formatUsageNumber(usedTotal ? (lastRow.value / usedTotal) * 100 : 0)}
                      {`%`}
                    </span>
                  </span>
                </>
              )}
            </div>
          </div>
          <ul
            className={`ui-um__legend`}
            aria-label={`By category`}
            data-active={activeRow ? `` : void 0}
          >
            {displayRows.map((e) => {
              let t = animatedValue(`r:${e.label}`);
              return (
                <li className={`ui-um__row`} data-leaving={e.leaving || void 0} key={e.label}>
                  <div
                    className={`ui-um__item`}
                    data-active={e.label === activeLabel || void 0}
                    onPointerEnter={(t) =>
                      t.pointerType === `mouse` && !e.leaving && highlight(e.label)
                    }
                    onPointerLeave={(e) => e.pointerType === `mouse` && highlight(null)}
                    onPointerUp={(t) =>
                      t.pointerType !== `mouse` &&
                      !e.leaving &&
                      highlight(e.label === activeLabel ? null : e.label)
                    }
                  >
                    <span
                      className={`ui-um__swatch`}
                      style={{
                        background: e.color,
                      }}
                    />
                    <span className={`ui-um__label`}>{e.label}</span>
                    <span className={`ui-um__value`}>{formatUsageNumber(t)}</span>
                    <span className={`ui-um__share`}>
                      {formatUsageNumber(
                        animatedValue(`used`) ? (t / animatedValue(`used`)) * 100 : 0,
                      )}
                      {`%`}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
          {dailyData.length > 0 && (
            <div className={`ui-um__daily`}>
              <div className={`ui-um__daily-head`}>
                <span>{`Per day`}</span>
                <span className={`ui-um__daily-read`} key={selectedDay ? `d${activeDay}` : `avg`}>
                  {selectedDay ? (
                    <>
                      {selectedDay.label}
                      {` · `}
                      <b>
                        {selectedDay.value === null
                          ? `–`
                          : withUsageUnit(formatUsageNumber(selectedDay.value), unit)}
                      </b>
                    </>
                  ) : (
                    <>
                      {`Avg `}
                      <b>{formatUsageNumber(average)}</b>
                      {` / day`}
                    </>
                  )}
                </span>
              </div>
              <div
                className={`ui-um__spark`}
                tabIndex={0}
                role={`img`}
                aria-label={`${title} per day, ${formatUsageNumber(average)} ${unit} on average – arrow keys read each day`}
                data-hover={activeDay !== null || void 0}
                data-regrow={dailyRegrowRef.current || void 0}
                data-few={dailyData.length <= 14 || void 0}
                onPointerMove={(e) => setActiveDay(hitDay(e))}
                onPointerDown={(e) => setActiveDay(hitDay(e))}
                onPointerLeave={(e) => e.pointerType === `mouse` && setActiveDay(null)}
                onKeyDown={handleDailyKeyDown}
                onBlur={() => setActiveDay(null)}
                key={dailyData.length}
              >
                {dailyData.map((e, t) => (
                  <span
                    className={`ui-um__day`}
                    data-future={e.value === null || void 0}
                    data-active={t === activeDay || void 0}
                    style={{
                      "--i": t,
                    }}
                    key={t}
                  >
                    <span
                      style={{
                        height:
                          e.value === null
                            ? void 0
                            : `${Math.max(4, (animatedValue(`d:${t}`) / dailyMax) * 100)}%`,
                      }}
                    />
                  </span>
                ))}
              </div>
            </div>
          )}
          {limits.length > 0 && (
            <ul
              className={`ui-um__limits`}
              aria-label={`Plan limits`}
              style={{
                "--n": Math.min(3, limits.length),
              }}
            >
              {limits.map((e) => {
                let t = e.total == null || !isFinite(e.total),
                  n =
                    e.decimals ??
                    (Number.isInteger(e.used) && (t || Number.isInteger(e.total)) ? 0 : 1),
                  o = t ? 0 : e.used / Math.max(e.total, 1e-9),
                  s = t ? `ok` : o >= 1 ? `limit` : o >= warnAt ? `warn` : `ok`,
                  c = animatedValue(`l:${e.label}`),
                  l = t ? `∞` : formatUsageNumber(e.total, Number.isInteger(e.total) ? 0 : n);
                return (
                  <li className={`ui-um__limit`} data-state={s} key={e.label}>
                    <span className={`ui-um__limit-label`}>
                      {e.label}
                      {s !== `ok` && (
                        <span
                          className={`ui-um__dot`}
                          aria-label={s === `limit` ? `At the limit` : `Close to the limit`}
                        />
                      )}
                    </span>
                    <span className={`ui-um__limit-value`}>
                      {formatUsageNumber(c, n)}
                      <span className={`ui-um__muted`}>
                        {` of `}
                        {withUsageUnit(l, t ? void 0 : e.unit)}
                      </span>
                    </span>
                    {t ? (
                      <span
                        className={`ui-um__thin`}
                        data-unlimited={``}
                        aria-label={`${e.label}: ${formatUsageNumber(e.used, n)}, unlimited`}
                        role={`img`}
                      />
                    ) : (
                      <span
                        className={`ui-um__thin`}
                        role={`meter`}
                        aria-label={e.label}
                        aria-valuemin={0}
                        aria-valuemax={e.total}
                        aria-valuenow={Math.min(e.used, e.total)}
                        aria-valuetext={`${formatUsageNumber(e.used, n)} of ${withUsageUnit(l, e.unit)}`}
                      >
                        <span
                          style={{
                            width: `${Math.min(100, (c / Math.max(e.total, 1e-9)) * 100)}%`,
                          }}
                        />
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
      <div className={`ui-um__foot`}>
        <span className={`ui-um__status`} key={state}>
          {needsAttention && <span className={`ui-um__dot`} aria-hidden={`true`} />}
          {state === `limit` ? (
            <>
              <b>{`Limit reached`}</b>
              {usedTotal > total && (
                <span className={`ui-um__muted`}>
                  {withUsageUnit(formatUsageNumber(usedTotal - total), `over`)}
                </span>
              )}
            </>
          ) : (
            <>
              {state === `warn` && <b>{`Running low`}</b>}
              <span className={state === `warn` ? `ui-um__muted` : void 0}>
                {withUsageUnit(formatUsageNumber(animatedValue(`left`)), unit)}
                {` left`}
              </span>
            </>
          )}
        </span>
        <button
          ref={actionRef}
          type={`button`}
          className={`ui-um__action`}
          data-strong={needsAttention || void 0}
          onClick={() => onUpgrade?.(state)}
        >
          <span ref={actionInnerRef} className={`ui-um__action-inner`}>
            <span className={`ui-um__action-text`} key={needsAttention ? `top-up` : `upgrade`}>
              {needsAttention ? topUpLabel : upgradeLabel}
            </span>
          </span>
        </button>
      </div>
      <span className={`ui-um__live`} aria-live={`polite`}>
        {announcement}
      </span>
    </section>
  );
}
var usageMeterStyles = `
/* Colors and motion as variables – override them on .ui-um */
.ui-um {
  --ui-um-tray: #f0f0f0;
  --ui-um-card: #ffffff;
  --ui-um-line: #ececec;
  --ui-um-ink: #171717;
  --ui-um-text: #404040;
  --ui-um-muted: #8f8f8f;
  --ui-um-faint: #b5b5b5;
  --ui-um-well: #f4f4f5;
  --ui-um-hover: #f4f4f5;
  --ui-um-track: #efeff1;
  --ui-um-fill: #4a4a4f;
  --ui-um-spark: #dcdce0;
  --ui-um-accent: #2f6bff;
  --ui-um-warn: #f59e0b;
  --ui-um-warn-text: #b45309;
  --ui-um-c1: #2f6bff;
  --ui-um-c2: #74a0ff;
  --ui-um-c3: #b4cbff;
  --ui-um-c4: #a8a8ae;
  --ui-um-c5: #d4d4d8;
  --ui-um-focus: rgba(23, 23, 23, 0.22);
  --ui-um-tip-shadow: 0 8px 24px -6px rgba(0, 0, 0, 0.16), 0 2px 6px rgba(0, 0, 0, 0.06);
  --ui-um-ease: cubic-bezier(0.22, 1, 0.36, 1);
  box-sizing: border-box;
  container-type: inline-size;
  position: relative;
  display: grid;
  width: 100%;
  max-width: 460px;
  padding: 4px;
  border-radius: 20px;
  background: var(--ui-um-tray);
  font-family: "Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  font-size: 13px;
  line-height: 1.45;
  color: var(--ui-um-text);
  -webkit-font-smoothing: antialiased;
}
.ui-um *, .ui-um *::before, .ui-um *::after { box-sizing: border-box; }
:where(.ui-um) button { margin: 0; padding: 0; border: 0; background: none; font: inherit; color: inherit; cursor: pointer; }
:where(.ui-um) :is(h3, p, ul) { margin: 0; padding: 0; }
:where(.ui-um) ul { list-style: none; }
.ui-um :is(button, [tabindex="0"]):focus-visible { outline: 2px solid var(--ui-um-focus); outline-offset: 2px; }
.ui-um b { font-weight: 500; color: var(--ui-um-ink); }
.ui-um__muted { color: var(--ui-um-muted); }

/* The white card */
.ui-um__card { overflow: hidden; border-radius: 16px; background: var(--ui-um-card); box-shadow: 0 0 0 1px var(--ui-um-line), 0 1px 2px rgba(0, 0, 0, 0.04); transition: height 360ms var(--ui-um-ease); }
.ui-um__inner { display: flow-root; padding: 14px 16px 18px; }

/* Head: title and reset date, the period switch on the right */
.ui-um__head { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; }
.ui-um__heading { min-width: 0; padding-top: 2px; }
.ui-um__title { overflow: hidden; font-size: 14px; font-weight: 600; line-height: 20px; color: var(--ui-um-ink); white-space: nowrap; text-overflow: ellipsis; }
.ui-um__sub { font-size: 12.5px; color: var(--ui-um-muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.ui-um__sep { margin: 0 6px; color: var(--ui-um-faint); }

.ui-um__switch { position: relative; display: grid; grid-auto-columns: auto; grid-auto-flow: column; flex: none; padding: 2px; border-radius: 10px; background: var(--ui-um-well); box-shadow: inset 0 0 0 1px var(--ui-um-line); }
.ui-um__pill {
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 8px;
  background: var(--ui-um-card);
  box-shadow: 0 0 0 1px var(--ui-um-line), 0 1px 2px rgba(0, 0, 0, 0.06);
  opacity: 0;
  pointer-events: none;
  transition: transform 320ms var(--ui-um-ease), width 320ms var(--ui-um-ease), height 320ms var(--ui-um-ease), opacity 200ms ease;
}
.ui-um__option { position: relative; z-index: 1; min-width: 0; height: 26px; padding: 0 9px; overflow: hidden; border-radius: 8px; font-size: 12px; font-weight: 500; color: var(--ui-um-muted); white-space: nowrap; text-overflow: ellipsis; transition: color 200ms ease; }
.ui-um__option:hover, .ui-um__option[aria-checked="true"] { color: var(--ui-um-ink); }

/* The big number and its share */
.ui-um__figure { display: flex; align-items: baseline; justify-content: space-between; gap: 12px; margin-top: 18px; }
.ui-um__amount { display: flex; flex-wrap: wrap; align-items: baseline; column-gap: 6px; min-width: 0; }
.ui-um__big { font-size: 28px; font-weight: 600; line-height: 34px; letter-spacing: -0.02em; color: var(--ui-um-ink); font-variant-numeric: tabular-nums; }
.ui-um__of { font-size: 13px; color: var(--ui-um-muted); font-variant-numeric: tabular-nums; white-space: nowrap; }
.ui-um__pct { display: inline-flex; flex: none; align-items: center; gap: 6px; font-size: 13px; font-weight: 500; color: var(--ui-um-text); font-variant-numeric: tabular-nums; transition: color 260ms ease; }
.ui-um__pct[data-state="warn"] { color: var(--ui-um-warn-text); }
.ui-um__pct[data-state="limit"] { color: var(--ui-um-ink); }
/* The only place amber shows up: a small dot */
.ui-um__dot { display: inline-block; flex: none; width: 6px; height: 6px; border-radius: 50%; background: var(--ui-um-warn); animation: ui-um-pop 420ms cubic-bezier(0.34, 1.56, 0.64, 1) both; }
.ui-um[data-state="limit"] .ui-um__pct .ui-um__dot, .ui-um[data-state="limit"] .ui-um__status .ui-um__dot, .ui-um__limit[data-state="limit"] .ui-um__dot { box-shadow: 0 0 0 3px color-mix(in srgb, var(--ui-um-warn) 22%, transparent); }

/* The stacked bar */
.ui-um__bar { position: relative; margin-top: 10px; padding: 4px 0; border-radius: 6px; cursor: default; }
.ui-um__track { display: flex; height: 10px; overflow: hidden; border-radius: 5px; background: var(--ui-um-track); }
.ui-um__seg { position: relative; flex: none; height: 100%; overflow: hidden; transition: opacity 200ms ease; }
/* A thin cut between the parts */
.ui-um__seg::after { content: ""; position: absolute; top: 0; right: 0; bottom: 0; width: 2px; background: var(--ui-um-card); }
.ui-um__bar[data-active] .ui-um__seg:not([data-active]) { opacity: 0.28; }

/* Tooltip: anchored to the middle of the part, shifted so it never leaves the card */
.ui-um__tip {
  position: absolute;
  bottom: calc(100% + 6px);
  z-index: 2;
  display: grid;
  gap: 1px;
  padding: 7px 10px 8px;
  border: 1px solid var(--ui-um-line);
  border-radius: 10px;
  background: var(--ui-um-card);
  box-shadow: var(--ui-um-tip-shadow);
  white-space: nowrap;
  pointer-events: none;
  opacity: 0;
  transform: translate(var(--ui-um-tip-x), 4px) scale(0.97);
  transition: left 260ms var(--ui-um-ease), transform 260ms var(--ui-um-ease), opacity 160ms ease;
}
.ui-um__tip[data-open] { opacity: 1; transform: translate(var(--ui-um-tip-x), 0); }
.ui-um__tip-label { display: flex; align-items: center; gap: 7px; font-size: 12px; color: var(--ui-um-muted); }
.ui-um__tip-value { font-size: 13px; font-weight: 500; color: var(--ui-um-ink); font-variant-numeric: tabular-nums; }
.ui-um__tip-value .ui-um__muted { font-weight: 400; }

/* Legend: one row per category, highlighted with the bar */
.ui-um__legend { display: grid; margin-top: 10px; }
.ui-um__row { display: grid; grid-template-rows: 1fr; animation: ui-um-grow 380ms var(--ui-um-ease) both; transition: grid-template-rows 320ms var(--ui-um-ease) 80ms, opacity 200ms ease; }
.ui-um__row[data-leaving] { grid-template-rows: 0fr; opacity: 0; pointer-events: none; }
.ui-um__item { display: flex; align-items: center; gap: 10px; min-height: 0; height: 30px; margin: 0 -8px; padding: 0 8px; overflow: hidden; border-radius: 8px; transition: background-color 160ms ease, opacity 200ms ease; }
.ui-um__row[data-leaving] .ui-um__item { background: none; }
.ui-um__item[data-active] { background: var(--ui-um-hover); }
.ui-um__legend[data-active] .ui-um__item:not([data-active]) { opacity: 0.45; }
.ui-um__swatch { flex: none; width: 8px; height: 8px; border-radius: 2.5px; }
.ui-um__label { flex: 1; min-width: 0; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; color: var(--ui-um-text); }
.ui-um__value { color: var(--ui-um-ink); font-weight: 500; font-variant-numeric: tabular-nums; }
.ui-um__share { width: 40px; text-align: right; color: var(--ui-um-muted); font-variant-numeric: tabular-nums; }

/* Daily sparkline */
.ui-um__daily { margin-top: 12px; }
.ui-um__daily-head { display: flex; justify-content: space-between; gap: 12px; font-size: 12px; color: var(--ui-um-muted); white-space: nowrap; }
.ui-um__daily-read { font-variant-numeric: tabular-nums; animation: ui-um-in 220ms var(--ui-um-ease) both; }
.ui-um__spark { display: flex; align-items: stretch; gap: 2px; height: 34px; margin-top: 8px; border-radius: 4px; cursor: default; }
/* A week gets wider gaps, so seven bars don't read as one block */
.ui-um__spark[data-few] { gap: 5px; }
.ui-um__day { display: flex; flex: 1 1 0; align-items: flex-end; min-width: 0; }
.ui-um__day > span { width: 100%; border-radius: 2px; background: var(--ui-um-spark); transform-origin: bottom; transition: background-color 160ms ease, opacity 160ms ease; }
.ui-um__spark[data-regrow] .ui-um__day > span { animation: ui-um-rise 520ms var(--ui-um-ease) both; animation-delay: calc(var(--i) * 18ms); }
.ui-um__day[data-future] > span { height: 2px; background: var(--ui-um-track); }
.ui-um__spark[data-hover] .ui-um__day:not([data-active]) > span { opacity: 0.6; }
.ui-um__day[data-active] > span { background: var(--ui-um-accent); }

/* Plan limits: thin meters, side by side on wide cards */
.ui-um__limits { display: grid; grid-template-columns: repeat(var(--n, 3), minmax(0, 1fr)); gap: 12px 18px; margin-top: 16px; padding-top: 14px; border-top: 1px solid var(--ui-um-line); }
.ui-um__limit { display: grid; grid-template-columns: minmax(0, 1fr); align-content: start; min-width: 0; }
.ui-um__limit-label { display: flex; align-items: center; gap: 6px; min-width: 0; overflow: hidden; font-size: 12px; color: var(--ui-um-muted); white-space: nowrap; }
.ui-um__limit-value { overflow: hidden; color: var(--ui-um-ink); font-weight: 500; font-variant-numeric: tabular-nums; white-space: nowrap; text-overflow: ellipsis; }
.ui-um__limit-value .ui-um__muted { font-weight: 400; }
.ui-um__thin { position: relative; display: block; height: 4px; margin-top: 7px; overflow: hidden; border-radius: 2px; background: var(--ui-um-track); }
.ui-um__thin > span { position: absolute; top: 0; bottom: 0; left: 0; border-radius: inherit; background: var(--ui-um-fill); }
/* Unlimited: a quiet striped track instead of a fill */
.ui-um__thin[data-unlimited] { background: repeating-linear-gradient(-45deg, var(--ui-um-track) 0 3px, transparent 3px 6px); }

/* The tray below the card */
.ui-um__foot { display: flex; align-items: center; justify-content: space-between; gap: 12px; min-height: 44px; padding: 6px 2px 2px 12px; font-size: 12.5px; color: var(--ui-um-muted); }
.ui-um__status { display: flex; align-items: center; gap: 7px; min-width: 0; overflow: hidden; white-space: nowrap; font-variant-numeric: tabular-nums; animation: ui-um-in 260ms var(--ui-um-ease) both; }
.ui-um__status > :last-child { overflow: hidden; text-overflow: ellipsis; }
.ui-um__action {
  display: inline-flex;
  flex: none;
  justify-content: center;
  height: 32px;
  overflow: hidden;
  border-radius: 14px;
  font-size: 13px;
  font-weight: 500;
  color: var(--ui-um-ink);
  background: var(--ui-um-card);
  box-shadow: 0 0 0 1px var(--ui-um-line), 0 1px 2px rgba(0, 0, 0, 0.04);
  transition: background-color 280ms ease, color 280ms ease, box-shadow 280ms ease, width 320ms var(--ui-um-ease), transform 140ms ease;
}
.ui-um__action:hover { background: var(--ui-um-hover); }
.ui-um__action:active { transform: scale(0.97); }
.ui-um__action[data-strong] { background: var(--ui-um-ink); color: var(--ui-um-card); box-shadow: 0 1px 2px rgba(0, 0, 0, 0.12), 0 6px 14px -6px rgba(0, 0, 0, 0.35); animation: ui-um-nudge 520ms cubic-bezier(0.34, 1.56, 0.64, 1); }
.ui-um__action[data-strong]:hover { background: var(--ui-um-ink); opacity: 0.88; }
.ui-um__action-inner { display: inline-flex; align-items: center; flex: none; height: 100%; padding: 0 14px; white-space: nowrap; }
.ui-um__action-text { animation: ui-um-in 260ms var(--ui-um-ease) both; }
.ui-um__live { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }

@keyframes ui-um-in { from { opacity: 0; transform: translateY(3px); filter: blur(2px); } to { opacity: 1; transform: none; filter: none; } }
@keyframes ui-um-grow { from { grid-template-rows: 0fr; opacity: 0; } to { grid-template-rows: 1fr; opacity: 1; } }
@keyframes ui-um-rise { from { transform: scaleY(0); } to { transform: none; } }
@keyframes ui-um-pop { 0% { transform: scale(0.3); } 60% { transform: scale(1.25); } 100% { transform: scale(1); } }
@keyframes ui-um-nudge { 0% { transform: scale(0.94); } 60% { transform: scale(1.04); } 100% { transform: scale(1); } }

/* Narrow (phones): the switch gets its own full-width row, limits stack as rows */
@container (max-width: 400px) {
  .ui-um__inner { padding: 12px 14px 16px; }
  .ui-um__head { flex-direction: column; align-items: stretch; gap: 12px; }
  .ui-um__switch { grid-auto-columns: minmax(0, auto); }
  .ui-um__option { padding: 0 6px; }
  .ui-um__big { font-size: 26px; }
  .ui-um__limits { grid-template-columns: minmax(0, 1fr); gap: 12px; }
  .ui-um__limit { grid-template-columns: minmax(0, 1fr) auto; column-gap: 12px; }
  .ui-um__limit-value { font-size: 12.5px; }
  .ui-um__thin { grid-column: 1 / -1; margin-top: 6px; }
}
@container (max-width: 300px) {
  .ui-um__of { font-size: 12px; }
  .ui-um__share { width: 34px; }
}
/* Touch screens: bigger targets */
@media (hover: none) and (pointer: coarse) {
  .ui-um__option { height: 34px; }
  .ui-um__item { height: 36px; }
  .ui-um__action { height: 38px; border-radius: 13px; }
  .ui-um__foot { min-height: 50px; }
  .ui-um__bar { padding: 10px 0; margin-top: 4px; }
}
@media (prefers-reduced-motion: reduce) {
  .ui-um *, .ui-um *::before, .ui-um *::after { animation: none !important; transition: none !important; }
}

/* Dark mode: follows a .dark class or data-theme="dark" on any ancestor, e.g. <html> */
:where(.dark, [data-theme="dark"]) .ui-um {
  --ui-um-tray: #111113;
  --ui-um-card: #19191b;
  --ui-um-line: #2a2a2e;
  --ui-um-ink: #ededed;
  --ui-um-text: #c8c8cc;
  --ui-um-muted: #8b8b92;
  --ui-um-faint: #5c5c63;
  --ui-um-well: #111113;
  --ui-um-hover: #232326;
  --ui-um-track: #2a2a2e;
  --ui-um-fill: #b4b4ba;
  --ui-um-spark: #3a3a40;
  --ui-um-accent: #6d8bff;
  --ui-um-warn: #f5a524;
  --ui-um-warn-text: #f5b350;
  --ui-um-c1: #6d8bff;
  --ui-um-c2: #4c66c9;
  --ui-um-c3: #34468a;
  --ui-um-c4: #6b6b72;
  --ui-um-c5: #45454b;
  --ui-um-focus: rgba(255, 255, 255, 0.3);
  --ui-um-tip-shadow: 0 8px 24px -6px rgba(0, 0, 0, 0.5), 0 2px 6px rgba(0, 0, 0, 0.35);
}
:where(.dark, [data-theme="dark"]) .ui-um__pill { background: #2a2a2e; box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.06); }
:where(.dark, [data-theme="dark"]) .ui-um__tip { background: #2a2a2d; border-color: rgba(255, 255, 255, 0.1); }
`;
export { UsageMeter as t };
export { UsageMeter as PlicoCore_m };

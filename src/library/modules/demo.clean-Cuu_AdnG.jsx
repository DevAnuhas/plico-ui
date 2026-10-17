"use client";

import * as React from "react";
import * as JSXRuntime from "react/jsx-runtime";
var cleanFormatUsageNumber = (value, decimals = 0) =>
  new Intl.NumberFormat(`en-US`, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
var cleanWithUsageUnit = (value, unit) => (unit ? `${value} ${unit}` : value);
var cleanResetDateFormatter = new Intl.DateTimeFormat(`en-US`, {
  month: `short`,
  day: `numeric`,
});
function cleanResetCountdown(date) {
  let days = Math.ceil((date.getTime() - Date.now()) / 864e5);
  return days <= 0 ? `Resets today` : days === 1 ? `Resets tomorrow` : `Resets in ${days} days`;
}
var cleanCategoryColors = [
  `var(--ui-umc-c1)`,
  `var(--ui-umc-c2)`,
  `var(--ui-umc-c3)`,
  `var(--ui-umc-c4)`,
  `var(--ui-umc-c5)`,
];
var cleanEaseOutQuart = (progress) => 1 - (1 - progress) ** 4;
var prefersReducedMotion = () =>
  typeof window < `u` && window.matchMedia(`(prefers-reduced-motion: reduce)`).matches;
function useAnimatedValuesClean(targets, initialDuration, updateDuration) {
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
        ee = i && !hasAnimatedRef.current ? initialDuration : updateDuration;
      i && (hasAnimatedRef.current = true);
      let d = performance.now(),
        f = 0,
        p = (t) => {
          let r = Math.min(1, (t - d) / ee),
            i = cleanEaseOutQuart(r),
            s = {};
          for (let t in e) s[t] = (n[t] ?? 0) + (e[t] - (n[t] ?? 0)) * i;
          ((currentRef.current = s), setValues(s), r < 1 && (f = requestAnimationFrame(p)));
        };
      return ((f = requestAnimationFrame(p)), () => cancelAnimationFrame(f));
    }, [signature]),
    (e) => values[e] ?? 0
  );
}
function positionCleanPill(container, pill, selector) {
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
function mergeCleanUsageRows(previousRows, nextRows) {
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
function UsageMeterClean({
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
              cleanCategoryColors[colorsRef.current.size % cleanCategoryColors.length],
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
      mergeCleanUsageRows(
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
  let animatedValue = useAnimatedValuesClean(targets, 1200, 650),
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
    positionCleanPill(periodRef.current, pillRef.current, `[aria-checked="true"]`);
  }),
    React.useLayoutEffect(() => {
      let e = periodRef.current;
      if (!e) return;
      let t = new ResizeObserver(() =>
        positionCleanPill(e, pillRef.current, `[aria-checked="true"]`),
      );
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
          ? `${title}: limit reached, ${cleanFormatUsageNumber(usedTotal)} of ${cleanFormatUsageNumber(total)} ${unit} used`
          : state === `warn`
            ? `${title}: running low, ${Math.round(ratio * 100)}% of ${unit} used`
            : `${title}: ${cleanFormatUsageNumber(usedTotal)} of ${cleanFormatUsageNumber(total)} ${unit} used`,
      ));
  }, [state]);
  let resetDate = resetAt === void 0 ? null : new Date(resetAt),
    needsAttention = state !== `ok`,
    animatedPercent = animatedValue(`pct`);
  return (
    <section
      ref={rootRef}
      className={[`ui-umc`, className].filter(Boolean).join(` `)}
      aria-labelledby={`${instanceId}-title`}
      data-state={state}
    >
      <style href={`ui-usage-meter-clean`} precedence={`default`}>
        {usageMeterCleanStyles}
      </style>
      <div ref={cardRef} className={`ui-umc__card`}>
        <div ref={innerRef} className={`ui-umc__inner`}>
          <header className={`ui-umc__head`}>
            <div className={`ui-umc__heading`}>
              <h3 id={`${instanceId}-title`} className={`ui-umc__title`}>
                {title}
              </h3>
              {(plan || resetDate) && (
                <p className={`ui-umc__sub`}>
                  {plan}
                  {plan && resetDate && <span className={`ui-umc__sep`}>{`·`}</span>}
                  {resetDate && (
                    <time
                      dateTime={resetDate.toISOString()}
                      title={`Resets on ${cleanResetDateFormatter.format(resetDate)}`}
                    >
                      {cleanResetCountdown(resetDate)}
                    </time>
                  )}
                </p>
              )}
            </div>
            {periods && periods.length > 1 && (
              <div
                ref={periodRef}
                className={`ui-umc__switch`}
                role={`radiogroup`}
                aria-label={`Period`}
                onKeyDown={handlePeriodKeyDown}
              >
                <span ref={pillRef} className={`ui-umc__pill`} aria-hidden={`true`} />
                {periods.map((e) => (
                  <button
                    type={`button`}
                    role={`radio`}
                    aria-checked={e.id === activePeriod}
                    tabIndex={e.id === activePeriod ? 0 : -1}
                    className={`ui-umc__option`}
                    onClick={() => changePeriod(e.id)}
                    key={e.id}
                  >
                    {e.label}
                  </button>
                ))}
              </div>
            )}
          </header>
          <div className={`ui-umc__figure`}>
            <p className={`ui-umc__amount`}>
              <span className={`ui-umc__big`}>{cleanFormatUsageNumber(animatedValue(`used`))}</span>
              <span className={`ui-umc__of`}>
                {`of `}
                {cleanWithUsageUnit(cleanFormatUsageNumber(total), unit)}
              </span>
            </p>
            <span className={`ui-umc__pct`} data-state={state}>
              {needsAttention && <span className={`ui-umc__dot`} aria-hidden={`true`} />}
              {cleanFormatUsageNumber(Math.min(animatedPercent, 999))}
              {`%`}
            </span>
          </div>
          <div
            className={`ui-umc__bar`}
            tabIndex={0}
            role={`group`}
            aria-label={`${cleanFormatUsageNumber(usedTotal)} of ${cleanFormatUsageNumber(total)} ${unit} used – arrow keys read each category`}
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
              className={`ui-umc__track`}
              role={`meter`}
              aria-valuemin={0}
              aria-valuemax={total}
              aria-valuenow={Math.min(usedTotal, total)}
              aria-valuetext={`${cleanFormatUsageNumber(usedTotal)} of ${cleanFormatUsageNumber(total)} ${unit}`}
            >
              {segments.map((e) => (
                <span
                  className={`ui-umc__seg`}
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
              className={`ui-umc__tip`}
              data-open={activeRow ? `` : void 0}
              style={{
                left: `${tipPercent}%`,
                "--ui-umc-tip-x": `${-tipPercent}%`,
              }}
              aria-live={`polite`}
            >
              {lastRow && (
                <>
                  <span className={`ui-umc__tip-label`}>
                    <span
                      className={`ui-umc__swatch`}
                      style={{
                        background: lastRow.color,
                      }}
                    />
                    {lastRow.label}
                  </span>
                  <span className={`ui-umc__tip-value`}>
                    {cleanWithUsageUnit(cleanFormatUsageNumber(lastRow.value), unit)}
                    <span className={`ui-umc__muted`}>
                      {` · `}
                      {cleanFormatUsageNumber(usedTotal ? (lastRow.value / usedTotal) * 100 : 0)}
                      {`%`}
                    </span>
                  </span>
                </>
              )}
            </div>
          </div>
          <ul
            className={`ui-umc__legend`}
            aria-label={`By category`}
            data-active={activeRow ? `` : void 0}
          >
            {displayRows.map((e) => {
              let t = animatedValue(`r:${e.label}`);
              return (
                <li className={`ui-umc__row`} data-leaving={e.leaving || void 0} key={e.label}>
                  <div
                    className={`ui-umc__item`}
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
                      className={`ui-umc__swatch`}
                      style={{
                        background: e.color,
                      }}
                    />
                    <span className={`ui-umc__label`}>{e.label}</span>
                    <span className={`ui-umc__value`}>{cleanFormatUsageNumber(t)}</span>
                    <span className={`ui-umc__share`}>
                      {cleanFormatUsageNumber(
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
            <div className={`ui-umc__daily`}>
              <div className={`ui-umc__daily-head`}>
                <span>{`Per day`}</span>
                <span className={`ui-umc__daily-read`} key={selectedDay ? `d${activeDay}` : `avg`}>
                  {selectedDay ? (
                    <>
                      {selectedDay.label}
                      {` · `}
                      <b>
                        {selectedDay.value === null
                          ? `–`
                          : cleanWithUsageUnit(cleanFormatUsageNumber(selectedDay.value), unit)}
                      </b>
                    </>
                  ) : (
                    <>
                      {`Avg `}
                      <b>{cleanFormatUsageNumber(average)}</b>
                      {` / day`}
                    </>
                  )}
                </span>
              </div>
              <div
                className={`ui-umc__spark`}
                tabIndex={0}
                role={`img`}
                aria-label={`${title} per day, ${cleanFormatUsageNumber(average)} ${unit} on average – arrow keys read each day`}
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
                    className={`ui-umc__day`}
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
              className={`ui-umc__limits`}
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
                  l = t ? `∞` : cleanFormatUsageNumber(e.total, Number.isInteger(e.total) ? 0 : n);
                return (
                  <li className={`ui-umc__limit`} data-state={s} key={e.label}>
                    <span className={`ui-umc__limit-label`}>
                      {e.label}
                      {s !== `ok` && (
                        <span
                          className={`ui-umc__dot`}
                          aria-label={s === `limit` ? `At the limit` : `Close to the limit`}
                        />
                      )}
                    </span>
                    <span className={`ui-umc__limit-value`}>
                      {cleanFormatUsageNumber(c, n)}
                      <span className={`ui-umc__muted`}>
                        {` of `}
                        {cleanWithUsageUnit(l, t ? void 0 : e.unit)}
                      </span>
                    </span>
                    {t ? (
                      <span
                        className={`ui-umc__thin`}
                        data-unlimited={``}
                        aria-label={`${e.label}: ${cleanFormatUsageNumber(e.used, n)}, unlimited`}
                        role={`img`}
                      />
                    ) : (
                      <span
                        className={`ui-umc__thin`}
                        role={`meter`}
                        aria-label={e.label}
                        aria-valuemin={0}
                        aria-valuemax={e.total}
                        aria-valuenow={Math.min(e.used, e.total)}
                        aria-valuetext={`${cleanFormatUsageNumber(e.used, n)} of ${cleanWithUsageUnit(l, e.unit)}`}
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
      <div className={`ui-umc__foot`}>
        <span className={`ui-umc__status`} key={state}>
          {needsAttention && <span className={`ui-umc__dot`} aria-hidden={`true`} />}
          {state === `limit` ? (
            <>
              <b>{`Limit reached`}</b>
              {usedTotal > total && (
                <span className={`ui-umc__muted`}>
                  {cleanWithUsageUnit(cleanFormatUsageNumber(usedTotal - total), `over`)}
                </span>
              )}
            </>
          ) : (
            <>
              {state === `warn` && <b>{`Running low`}</b>}
              <span className={state === `warn` ? `ui-umc__muted` : void 0}>
                {cleanWithUsageUnit(cleanFormatUsageNumber(animatedValue(`left`)), unit)}
                {` left`}
              </span>
            </>
          )}
        </span>
        <button
          ref={actionRef}
          type={`button`}
          className={`ui-umc__action`}
          data-strong={needsAttention || void 0}
          onClick={() => onUpgrade?.(state)}
        >
          <span ref={actionInnerRef} className={`ui-umc__action-inner`}>
            <span className={`ui-umc__action-text`} key={needsAttention ? `top-up` : `upgrade`}>
              {needsAttention ? topUpLabel : upgradeLabel}
            </span>
          </span>
        </button>
      </div>
      <span className={`ui-umc__live`} aria-live={`polite`}>
        {announcement}
      </span>
    </section>
  );
}
var usageMeterCleanStyles = `
/* Colors and motion as variables – override them on .ui-umc */
.ui-umc {
  --ui-umc-card: #ffffff;
  --ui-umc-strong: #000000;
  --ui-umc-ink: rgba(0, 0, 0, 0.88);
  --ui-umc-text: rgba(0, 0, 0, 0.61);
  --ui-umc-muted: rgba(0, 0, 0, 0.45);
  --ui-umc-faint: rgba(0, 0, 0, 0.27);
  --ui-umc-line: rgba(0, 0, 0, 0.06);
  --ui-umc-wash: rgba(0, 0, 0, 0.03);
  --ui-umc-fill: rgba(0, 0, 0, 0.06);
  --ui-umc-track: rgba(0, 0, 0, 0.06);
  --ui-umc-spark: rgba(0, 0, 0, 0.12);
  --ui-umc-accent: rgba(0, 96, 226, 0.765);
  --ui-umc-warn: #e8a20c;
  --ui-umc-warn-text: #b07800;
  --ui-umc-warn-bg: rgba(232, 162, 12, 0.12);
  --ui-umc-full: #e5484d;
  --ui-umc-full-text: #d63f44;
  --ui-umc-full-bg: rgba(229, 72, 77, 0.08);
  /* The parts: the accent blue, then lighter tints of it, then a gray */
  --ui-umc-c1: rgba(0, 96, 226, 0.765);
  --ui-umc-c2: rgba(0, 96, 226, 0.5);
  --ui-umc-c3: rgba(0, 96, 226, 0.3);
  --ui-umc-c4: rgba(0, 96, 226, 0.16);
  --ui-umc-c5: rgba(0, 0, 0, 0.14);
  /* The solid button near the limit */
  --ui-umc-dark: rgba(0, 0, 0, 0.88);
  --ui-umc-on-dark: #fcfcfc;
  /* Strokes are shadows: a 0.5px hairline plus a soft lift */
  --ui-umc-shadow: 0 0 0 0.5px rgba(0, 0, 0, 0.06), 0 1px 1px -1px rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --ui-umc-tip-shadow: 0 0 0 0.5px rgba(0, 0, 0, 0.06), 0 1px 2px 0 rgba(0, 0, 0, 0.05), 0 8px 20px -8px rgba(0, 0, 0, 0.14);
  --ui-umc-focus: rgba(0, 96, 226, 0.35);
  --ui-umc-ease: cubic-bezier(0.22, 1, 0.36, 1);
  box-sizing: border-box;
  container-type: inline-size;
  position: relative;
  display: grid;
  width: 100%;
  max-width: 460px;
  border-radius: 10px;
  background: var(--ui-umc-card);
  box-shadow: var(--ui-umc-shadow);
  font-family: "Inter", "InterVariable", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  font-size: 13px;
  line-height: 20px;
  font-weight: 400;
  color: var(--ui-umc-ink);
  text-align: left;
  -webkit-font-smoothing: antialiased;
}
.ui-umc *, .ui-umc *::before, .ui-umc *::after { box-sizing: border-box; }
:where(.ui-umc) button { margin: 0; padding: 0; border: 0; background: none; font: inherit; color: inherit; cursor: pointer; -webkit-tap-highlight-color: transparent; }
:where(.ui-umc) :is(h3, p, ul) { margin: 0; padding: 0; }
:where(.ui-umc) ul { list-style: none; }
.ui-umc :is(button, [tabindex="0"]):focus-visible { outline: 2px solid var(--ui-umc-focus); outline-offset: 1px; }
.ui-umc b { font-weight: 500; color: var(--ui-umc-ink); }
.ui-umc__muted { color: var(--ui-umc-muted); }

/* The body of the card – glides to its new height when rows come or go */
.ui-umc__card { overflow: hidden; border-radius: 10px 10px 0 0; transition: height 360ms var(--ui-umc-ease); }
.ui-umc__inner { display: flow-root; padding: 16px 16px 16px; }

/* Head: title and reset date, the period switch on the right */
.ui-umc__head { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; }
.ui-umc__heading { min-width: 0; }
.ui-umc__title { overflow: hidden; font-size: 15px; font-weight: 500; line-height: 24px; color: var(--ui-umc-strong); white-space: nowrap; text-overflow: ellipsis; }
.ui-umc__sub { overflow: hidden; font-size: 12px; line-height: 16px; color: var(--ui-umc-muted); white-space: nowrap; text-overflow: ellipsis; }
.ui-umc__sep { margin: 0 6px; color: var(--ui-umc-faint); }

/* The "button switch": separate chips with a hairline; the light-gray fill glides to the chosen one */
.ui-umc__switch { position: relative; display: grid; grid-auto-columns: auto; grid-auto-flow: column; gap: 8px; flex: none; }
.ui-umc__pill {
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 6px;
  background: var(--ui-umc-fill);
  opacity: 0;
  pointer-events: none;
  transition: transform 320ms var(--ui-umc-ease), width 320ms var(--ui-umc-ease), height 320ms var(--ui-umc-ease), opacity 200ms ease;
}
.ui-umc__option {
  position: relative;
  z-index: 1;
  min-width: 0;
  height: 28px;
  padding: 4px 10px;
  overflow: hidden;
  border-radius: 6px;
  box-shadow: inset 0 0 0 0.5px var(--ui-umc-line);
  font-size: 13px;
  font-weight: 500;
  line-height: 20px;
  color: var(--ui-umc-text);
  white-space: nowrap;
  text-overflow: ellipsis;
  transition: color 200ms ease, background-color 120ms ease;
}
.ui-umc__option[aria-checked="true"] { color: var(--ui-umc-ink); }
@media (hover: hover) {
  .ui-umc__option[aria-checked="false"]:hover { background: var(--ui-umc-wash); color: var(--ui-umc-ink); }
}

/* The big number and its share */
.ui-umc__figure { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-top: 14px; }
.ui-umc__amount { display: flex; flex-wrap: wrap; align-items: baseline; column-gap: 8px; min-width: 0; }
.ui-umc__big { font-size: 24px; font-weight: 500; line-height: 32px; letter-spacing: -0.24px; color: var(--ui-umc-strong); font-variant-numeric: tabular-nums; }
.ui-umc__of { font-size: 12px; line-height: 16px; color: var(--ui-umc-muted); font-variant-numeric: tabular-nums; white-space: nowrap; }
/* The share as a small tag – tinted amber, then red, near and at the limit */
.ui-umc__pct {
  display: inline-flex;
  flex: none;
  align-items: center;
  gap: 5px;
  height: 20px;
  padding: 0 6px;
  border-radius: 5px;
  background: var(--ui-umc-fill);
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
  color: var(--ui-umc-text);
  font-variant-numeric: tabular-nums;
  transition: color 260ms ease, background-color 260ms ease;
}
.ui-umc__pct[data-state="warn"] { background: var(--ui-umc-warn-bg); color: var(--ui-umc-warn-text); }
.ui-umc__pct[data-state="limit"] { background: var(--ui-umc-full-bg); color: var(--ui-umc-full-text); }
/* A small status dot: amber when running low, red at the limit */
.ui-umc__dot { display: inline-block; flex: none; width: 6px; height: 6px; border-radius: 50%; background: var(--ui-umc-warn); animation: ui-umc-pop 420ms cubic-bezier(0.34, 1.56, 0.64, 1) both; }
.ui-umc[data-state="limit"] :is(.ui-umc__pct, .ui-umc__status) .ui-umc__dot, .ui-umc__limit[data-state="limit"] .ui-umc__dot { background: var(--ui-umc-full); }

/* The stacked bar */
.ui-umc__bar { position: relative; margin-top: 10px; padding: 4px 0; border-radius: 4px; cursor: default; }
.ui-umc__track { display: flex; height: 8px; overflow: hidden; border-radius: 4px; background: var(--ui-umc-track); }
.ui-umc__seg { position: relative; flex: none; height: 100%; overflow: hidden; transition: opacity 200ms ease; }
/* A thin cut between the parts */
.ui-umc__seg::after { content: ""; position: absolute; top: 0; right: 0; bottom: 0; width: 2px; background: var(--ui-umc-card); }
.ui-umc__bar[data-active] .ui-umc__seg:not([data-active]) { opacity: 0.3; }

/* Tooltip: a small white card anchored to the middle of the part, shifted so it never leaves the card */
.ui-umc__tip {
  position: absolute;
  bottom: calc(100% + 6px);
  z-index: 2;
  display: grid;
  gap: 2px;
  padding: 6px 10px 7px;
  border-radius: 8px;
  background: var(--ui-umc-card);
  box-shadow: var(--ui-umc-tip-shadow);
  white-space: nowrap;
  pointer-events: none;
  opacity: 0;
  transform: translate(var(--ui-umc-tip-x), 4px) scale(0.97);
  transition: left 260ms var(--ui-umc-ease), transform 260ms var(--ui-umc-ease), opacity 160ms ease;
}
.ui-umc__tip[data-open] { opacity: 1; transform: translate(var(--ui-umc-tip-x), 0); }
.ui-umc__tip-label { display: flex; align-items: center; gap: 6px; font-size: 12px; line-height: 16px; color: var(--ui-umc-muted); }
.ui-umc__tip-value { font-size: 13px; font-weight: 500; line-height: 20px; color: var(--ui-umc-ink); font-variant-numeric: tabular-nums; }
.ui-umc__tip-value .ui-umc__muted { font-weight: 400; }

/* Legend: one row per category, highlighted with the bar */
.ui-umc__legend { display: grid; margin-top: 10px; }
.ui-umc__row { display: grid; grid-template-rows: 1fr; animation: ui-umc-grow 380ms var(--ui-umc-ease) both; transition: grid-template-rows 320ms var(--ui-umc-ease) 80ms, opacity 200ms ease; }
.ui-umc__row[data-leaving] { grid-template-rows: 0fr; opacity: 0; pointer-events: none; }
.ui-umc__item { display: flex; align-items: center; gap: 10px; min-height: 0; height: 32px; margin: 0 -8px; padding: 0 8px; overflow: hidden; border-radius: 6px; transition: background-color 120ms ease-out, opacity 200ms ease; }
.ui-umc__row[data-leaving] .ui-umc__item { background: none; }
.ui-umc__item[data-active] { background: var(--ui-umc-wash); }
.ui-umc__legend[data-active] .ui-umc__item:not([data-active]) { opacity: 0.45; }
.ui-umc__swatch { flex: none; width: 8px; height: 8px; border-radius: 2px; }
.ui-umc__label { flex: 1; min-width: 0; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; color: var(--ui-umc-ink); }
.ui-umc__value { color: var(--ui-umc-ink); font-weight: 500; font-variant-numeric: tabular-nums; }
.ui-umc__share { width: 40px; font-size: 12px; line-height: 16px; text-align: right; color: var(--ui-umc-muted); font-variant-numeric: tabular-nums; }

/* Daily sparkline */
.ui-umc__daily { margin-top: 14px; }
.ui-umc__daily-head { display: flex; align-items: center; justify-content: space-between; gap: 12px; font-size: 12px; line-height: 16px; color: var(--ui-umc-muted); white-space: nowrap; }
/* A tiny uppercase label, the readout on the right */
.ui-umc__daily-head > :first-child { font-size: 10px; font-weight: 500; line-height: 16px; letter-spacing: 0.5px; text-transform: uppercase; }
.ui-umc__daily-read { font-variant-numeric: tabular-nums; animation: ui-umc-in 220ms var(--ui-umc-ease) both; }
.ui-umc__spark { display: flex; align-items: stretch; gap: 2px; height: 32px; margin-top: 8px; border-radius: 4px; cursor: default; }
/* A week gets wider gaps, so seven bars don't read as one block */
.ui-umc__spark[data-few] { gap: 5px; }
.ui-umc__day { display: flex; flex: 1 1 0; align-items: flex-end; min-width: 0; }
.ui-umc__day > span { width: 100%; border-radius: 2px; background: var(--ui-umc-spark); transform-origin: bottom; transition: background-color 160ms ease, opacity 160ms ease; }
.ui-umc__spark[data-regrow] .ui-umc__day > span { animation: ui-umc-rise 520ms var(--ui-umc-ease) both; animation-delay: calc(var(--i) * 18ms); }
.ui-umc__day[data-future] > span { height: 2px; background: var(--ui-umc-track); }
.ui-umc__spark[data-hover] .ui-umc__day:not([data-active]) > span { opacity: 0.6; }
.ui-umc__day[data-active] > span { background: var(--ui-umc-accent); }

/* Plan limits: thin meters, side by side on wide cards */
.ui-umc__limits { display: grid; grid-template-columns: repeat(var(--n, 3), minmax(0, 1fr)); gap: 12px 18px; margin-top: 16px; padding-top: 14px; border-top: 0.5px solid var(--ui-umc-line); }
.ui-umc__limit { display: grid; grid-template-columns: minmax(0, 1fr); align-content: start; min-width: 0; }
.ui-umc__limit-label { display: flex; align-items: center; gap: 6px; min-width: 0; overflow: hidden; font-size: 12px; line-height: 16px; color: var(--ui-umc-muted); white-space: nowrap; }
.ui-umc__limit-value { overflow: hidden; color: var(--ui-umc-ink); font-weight: 500; font-variant-numeric: tabular-nums; white-space: nowrap; text-overflow: ellipsis; }
.ui-umc__limit-value .ui-umc__muted { font-weight: 400; }
.ui-umc__thin { position: relative; display: block; height: 4px; margin-top: 6px; overflow: hidden; border-radius: 2px; background: var(--ui-umc-track); }
.ui-umc__thin > span { position: absolute; top: 0; bottom: 0; left: 0; border-radius: inherit; background: var(--ui-umc-accent); transition: background-color 260ms ease; }
.ui-umc__limit[data-state="warn"] .ui-umc__thin > span { background: var(--ui-umc-warn); }
.ui-umc__limit[data-state="limit"] .ui-umc__thin > span { background: var(--ui-umc-full); }
/* Unlimited: a quiet striped track instead of a fill */
.ui-umc__thin[data-unlimited] { background: repeating-linear-gradient(-45deg, var(--ui-umc-track) 0 3px, transparent 3px 6px); }

/* The last row of the card, under a hairline */
.ui-umc__foot { display: flex; align-items: center; justify-content: space-between; gap: 12px; min-height: 44px; padding: 0 8px 0 16px; border-top: 0.5px solid var(--ui-umc-line); font-size: 12px; line-height: 16px; color: var(--ui-umc-muted); }
.ui-umc__status { display: flex; align-items: center; gap: 6px; min-width: 0; overflow: hidden; white-space: nowrap; font-variant-numeric: tabular-nums; animation: ui-umc-in 260ms var(--ui-umc-ease) both; }
.ui-umc__status > :last-child { overflow: hidden; text-overflow: ellipsis; }
/* The button: white with the hairline shadow, a dark chip near the limit */
.ui-umc__action {
  display: inline-flex;
  flex: none;
  justify-content: center;
  height: 28px;
  overflow: hidden;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  line-height: 20px;
  color: var(--ui-umc-strong);
  background: var(--ui-umc-card);
  box-shadow: var(--ui-umc-shadow);
  transition: background-color 280ms ease, color 280ms ease, box-shadow 280ms ease, width 320ms var(--ui-umc-ease), transform 140ms ease;
}
.ui-umc__action:hover { background: #fafafa; }
.ui-umc__action:active { transform: scale(0.97); }
.ui-umc__action[data-strong] { background: var(--ui-umc-dark); color: var(--ui-umc-on-dark); box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.12); animation: ui-umc-nudge 520ms cubic-bezier(0.34, 1.56, 0.64, 1); }
.ui-umc__action[data-strong]:hover { background: var(--ui-umc-dark); opacity: 0.88; }
.ui-umc__action-inner { display: inline-flex; align-items: center; flex: none; height: 100%; padding: 0 10px; white-space: nowrap; }
.ui-umc__action-text { animation: ui-umc-in 260ms var(--ui-umc-ease) both; }
.ui-umc__live { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }

@keyframes ui-umc-in { from { opacity: 0; transform: translateY(3px); filter: blur(2px); } to { opacity: 1; transform: none; filter: none; } }
@keyframes ui-umc-grow { from { grid-template-rows: 0fr; opacity: 0; } to { grid-template-rows: 1fr; opacity: 1; } }
@keyframes ui-umc-rise { from { transform: scaleY(0); } to { transform: none; } }
@keyframes ui-umc-pop { 0% { transform: scale(0.3); } 60% { transform: scale(1.25); } 100% { transform: scale(1); } }
@keyframes ui-umc-nudge { 0% { transform: scale(0.94); } 60% { transform: scale(1.04); } 100% { transform: scale(1); } }

/* Narrow (phones): the switch gets its own full-width row, limits stack as rows */
@container (max-width: 400px) {
  .ui-umc__inner { padding: 14px 14px 14px; }
  .ui-umc__foot { padding: 0 8px 0 14px; }
  .ui-umc__head { flex-direction: column; align-items: stretch; gap: 12px; }
  .ui-umc__switch { grid-auto-columns: minmax(0, auto); gap: 4px; }
  .ui-umc__option { padding: 4px 8px; }
  .ui-umc__limits { grid-template-columns: minmax(0, 1fr); gap: 12px; }
  .ui-umc__limit { grid-template-columns: minmax(0, 1fr) auto; column-gap: 12px; }
  .ui-umc__limit-value { font-size: 12px; line-height: 16px; }
  .ui-umc__thin { grid-column: 1 / -1; margin-top: 6px; }
}
@container (max-width: 300px) {
  .ui-umc__option { padding: 4px 6px; }
  .ui-umc__share { width: 34px; }
}
/* Touch screens: bigger targets */
@media (hover: none) and (pointer: coarse) {
  .ui-umc__option { height: 34px; padding: 7px 10px; }
  .ui-umc__item { height: 36px; }
  .ui-umc__action { height: 36px; }
  .ui-umc__foot { min-height: 52px; }
  .ui-umc__bar { padding: 10px 0; margin-top: 4px; }
}
@media (prefers-reduced-motion: reduce) {
  .ui-umc *, .ui-umc *::before, .ui-umc *::after { animation: none !important; transition: none !important; }
}

/* Dark mode: follows a .dark class or data-theme="dark" on any ancestor, e.g. <html> */
:where(.dark, [data-theme="dark"]) .ui-umc {
  --ui-umc-card: #1c1c1e;
  --ui-umc-strong: #ffffff;
  --ui-umc-ink: rgba(255, 255, 255, 0.9);
  --ui-umc-text: rgba(255, 255, 255, 0.62);
  --ui-umc-muted: rgba(255, 255, 255, 0.46);
  --ui-umc-faint: rgba(255, 255, 255, 0.3);
  --ui-umc-line: rgba(255, 255, 255, 0.08);
  --ui-umc-wash: rgba(255, 255, 255, 0.04);
  --ui-umc-fill: rgba(255, 255, 255, 0.08);
  --ui-umc-track: rgba(255, 255, 255, 0.08);
  --ui-umc-spark: rgba(255, 255, 255, 0.16);
  --ui-umc-accent: #4d8dff;
  --ui-umc-warn: #f0b43a;
  --ui-umc-warn-text: #f0b43a;
  --ui-umc-warn-bg: rgba(232, 162, 12, 0.16);
  --ui-umc-full: #ff6b70;
  --ui-umc-full-text: #ff8a8e;
  --ui-umc-full-bg: rgba(229, 72, 77, 0.14);
  --ui-umc-c1: #4d8dff;
  --ui-umc-c2: rgba(77, 141, 255, 0.62);
  --ui-umc-c3: rgba(77, 141, 255, 0.4);
  --ui-umc-c4: rgba(77, 141, 255, 0.22);
  --ui-umc-c5: rgba(255, 255, 255, 0.16);
  --ui-umc-dark: rgba(255, 255, 255, 0.9);
  --ui-umc-on-dark: #111113;
  --ui-umc-shadow: 0 0 0 0.5px rgba(255, 255, 255, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.4);
  --ui-umc-tip-shadow: 0 0 0 0.5px rgba(255, 255, 255, 0.1), 0 8px 20px -8px rgba(0, 0, 0, 0.6);
  --ui-umc-focus: rgba(77, 141, 255, 0.5);
}
:where(.dark, [data-theme="dark"]) .ui-umc__action:hover { background: #232326; }
:where(.dark, [data-theme="dark"]) .ui-umc__tip { background: #2a2a2d; }
`;
var cleanPeriods = [
  {
    id: `month`,
    label: `This month`,
  },
  {
    id: `last`,
    label: `Last month`,
  },
  {
    id: `7d`,
    label: `7 days`,
  },
];
var cleanDailyDateFormatter = new Intl.DateTimeFormat(`en-US`, {
  month: `short`,
  day: `numeric`,
});
var addCleanDays = (date, days) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
function generateCleanDaily(date, count, total, seed, length = count) {
  let state = seed,
    random = () => ((state = (state * 16807) % 2147483647) - 1) / 2147483646,
    weights = Array.from(
      {
        length: count,
      },
      (n, r) => {
        let i = addCleanDays(date, r).getDay();
        return (i === 0 || i === 6 ? 0.45 : 1) * (0.7 + random() * 0.6) * (1 + r / count / 3);
      },
    ),
    weightSum = weights.reduce((e, t) => e + t, 0),
    allocations = weights.map((e) => Math.round((e / weightSum) * total));
  return (
    (allocations[allocations.length - 1] += total - allocations.reduce((e, t) => e + t, 0)),
    Array.from(
      {
        length: length,
      },
      (n, r) => ({
        label: cleanDailyDateFormatter.format(addCleanDays(date, r)),
        value: r < count ? allocations[r] : null,
      }),
    )
  );
}
var cleanDemoData = {
  month: {
    used: [
      {
        label: `Chat`,
        value: 3980,
      },
      {
        label: `Search`,
        value: 1640,
      },
      {
        label: `Image`,
        value: 1120,
      },
      {
        label: `API`,
        value: 680,
      },
    ],
    limits: [
      {
        label: `Seats`,
        used: 8,
        total: 10,
      },
      {
        label: `Storage`,
        used: 3.2,
        total: 5,
        unit: `GB`,
      },
      {
        label: `Projects`,
        used: 12,
        total: null,
      },
    ],
    days: (e) => generateCleanDaily(addCleanDays(e, -21), 22, 7420, 11, 30),
  },
  last: {
    used: [
      {
        label: `Chat`,
        value: 5210,
      },
      {
        label: `Search`,
        value: 2140,
      },
      {
        label: `Image`,
        value: 1690,
      },
      {
        label: `API`,
        value: 960,
      },
    ],
    limits: [
      {
        label: `Seats`,
        used: 10,
        total: 10,
      },
      {
        label: `Storage`,
        used: 2.9,
        total: 5,
        unit: `GB`,
      },
      {
        label: `Projects`,
        used: 11,
        total: null,
      },
    ],
    days: (e) => generateCleanDaily(addCleanDays(e, -51), 30, 1e4, 29),
  },
  "7d": {
    used: [
      {
        label: `Chat`,
        value: 1260,
      },
      {
        label: `Search`,
        value: 540,
      },
      {
        label: `API`,
        value: 340,
      },
    ],
    limits: [
      {
        label: `Seats`,
        used: 8,
        total: 10,
      },
      {
        label: `Storage`,
        used: 3.2,
        total: 5,
        unit: `GB`,
      },
      {
        label: `Projects`,
        used: 12,
        total: null,
      },
    ],
    days: (e) => generateCleanDaily(addCleanDays(e, -6), 7, 2140, 5),
  },
};
function UsageMeterCleanDemo() {
  let [period, setPeriod] = React.useState(`month`),
    pausedRef = React.useRef(false),
    baseDate = React.useMemo(() => {
      let e = new Date();
      return new Date(e.getFullYear(), e.getMonth(), e.getDate());
    }, []),
    dailyData = React.useMemo(() => cleanDemoData[period].days(baseDate), [period, baseDate]);
  return (
    React.useEffect(() => {
      let e = [`last`, `7d`, `month`].map((e, n) =>
        window.setTimeout(() => !pausedRef.current && setPeriod(e), 3600 + n * 3200),
      );
      return () => e.forEach(clearTimeout);
    }, []),
    (
      <div
        className={`usage-demo`}
        onPointerDown={() => (pausedRef.current = true)}
        onKeyDown={() => (pausedRef.current = true)}
      >
        <UsageMeterClean
          title={`Acme AI`}
          plan={`Pro plan`}
          total={1e4}
          used={cleanDemoData[period].used}
          limits={cleanDemoData[period].limits}
          daily={dailyData}
          periods={cleanPeriods}
          period={period}
          onPeriodChange={setPeriod}
          resetAt={addCleanDays(baseDate, 9)}
          onUpgrade={() => {}}
        />
      </div>
    )
  );
}
export default UsageMeterCleanDemo;
export { UsageMeterClean as PlicoCore_p };
export { UsageMeterCleanDemo as PlicoDemo_v };

"use client";

import * as React from "react";
type CompareMode = "off" | "previous" | "year";
type DateDraft = { start: Date; end: Date | null };
type DateRange = {
  start: Date;
  end: Date;
};
type DatePreset = {
  id: string;
  label: string;
  range: (today: Date) => DateRange;
};
interface DateRangePickerCleanProps {
  value?: {
    start: Date;
    end: Date;
  };
  defaultValue?: {
    start: Date;
    end: Date;
  };
  onChange?: (
    range: DateRange,
    compare: DateRange | null,
    mode: string,
  ) => void;
  presets?: DatePreset[];
  compare?: boolean;
  defaultCompare?: "off" | "previous" | "year";
  weekStartsOn?: 0 | 1;
  max?: Date;
  min?: Date;
  defaultOpen?: boolean;
  today?: Date;
  className?: string;
}
var valueValue = (e: Date) =>
  new Date(e.getFullYear(), e.getMonth(), e.getDate());
var valueValue2 = (e: Date, t: number) =>
  new Date(e.getFullYear(), e.getMonth(), e.getDate() + t);
var valueValue3 = (e: Date, t: number) =>
  new Date(e.getFullYear(), e.getMonth() + t, 1);
var valueValue4 = (e: Date) => new Date(e.getFullYear(), e.getMonth(), 1);
var valueValue5 = (e: Date) => new Date(e.getFullYear(), e.getMonth() + 1, 0);
var valueValue6 = (e: Date, t: Date) =>
  !!e && !!t && e.getTime() === t.getTime();
var valueValue7 = (e: Date) =>
  Date.UTC(e.getFullYear(), e.getMonth(), e.getDate());
var valueValue8 = (e: Date, t: Date) =>
  Math.round((valueValue7(t) - valueValue7(e)) / 864e5) + 1;
var valueValue9 = (e: Date, t: Date | undefined, n: Date) =>
  t && e < t ? t : n && e > n ? n : e;
var valueValue10 = (e: Date, t: Date) =>
  e <= t
    ? {
        start: e,
        end: t,
      }
    : {
        start: t,
        end: e,
      };
var valueValue11 = new Intl.DateTimeFormat(`en-US`, {
  month: `short`,
  day: `numeric`,
});
var valueValue12 = new Intl.DateTimeFormat(`en-US`, {
  month: `short`,
  day: `numeric`,
  year: `numeric`,
});
var valueValue13 = new Intl.DateTimeFormat(`en-US`, {
  month: `long`,
  year: `numeric`,
});
var valueValue14 = new Intl.DateTimeFormat(`en-US`, {
  weekday: `long`,
  month: `long`,
  day: `numeric`,
  year: `numeric`,
});
function valueValue15({ start: start, end: end }: DateRange) {
  return valueValue6(start, end)
    ? valueValue12.format(start)
    : `${(start.getFullYear() === end.getFullYear() ? valueValue11 : valueValue12).format(start)} – ${valueValue12.format(end)}`;
}
function valueValue16(e: DateRange, t: CompareMode) {
  if (t === `previous`) {
    let t = valueValue8(e.start, e.end);
    return {
      start: valueValue2(e.start, -t),
      end: valueValue2(e.start, -1),
    };
  }
  if (t === `year`) {
    let t = (e: Date) =>
      new Date(e.getFullYear() - 1, e.getMonth(), e.getDate());
    return {
      start: t(e.start),
      end: t(e.end),
    };
  }
  return null;
}
var valueValue17 = (e: Date) =>
  new Date(e.getFullYear(), Math.floor(e.getMonth() / 3) * 3, 1);
var defaultPresets: DatePreset[] = [
  {
    id: `today`,
    label: `Today`,
    range: (e) => ({
      start: e,
      end: e,
    }),
  },
  {
    id: `yesterday`,
    label: `Yesterday`,
    range: (e: Date) => ({
      start: valueValue2(e, -1),
      end: valueValue2(e, -1),
    }),
  },
  {
    id: `7d`,
    label: `Last 7 days`,
    range: (e: Date) => ({
      start: valueValue2(e, -6),
      end: e,
    }),
  },
  {
    id: `30d`,
    label: `Last 30 days`,
    range: (e: Date) => ({
      start: valueValue2(e, -29),
      end: e,
    }),
  },
  {
    id: `90d`,
    label: `Last 90 days`,
    range: (e: Date) => ({
      start: valueValue2(e, -89),
      end: e,
    }),
  },
  {
    id: `month`,
    label: `This month`,
    range: (e: Date) => ({
      start: valueValue4(e),
      end: e,
    }),
  },
  {
    id: `last-month`,
    label: `Last month`,
    range: (e: Date) => ({
      start: valueValue3(e, -1),
      end: valueValue5(valueValue3(e, -1)),
    }),
  },
  {
    id: `quarter`,
    label: `This quarter`,
    range: (e: Date) => ({
      start: valueValue17(e),
      end: e,
    }),
  },
  {
    id: `ytd`,
    label: `Year to date`,
    range: (e: Date) => ({
      start: new Date(e.getFullYear(), 0, 1),
      end: e,
    }),
  },
];
var valueValue18: { id: CompareMode; label: string }[] = [
  {
    id: `off`,
    label: `Off`,
  },
  {
    id: `previous`,
    label: `Previous period`,
  },
  {
    id: `year`,
    label: `Previous year`,
  },
];
var Iconv = ({
  d: d,
  className: className,
}: {
  d: string;
  className?: string;
}) => (
  <svg
    viewBox={`0 0 24 24`}
    className={[`ui-drpc__glyph`, className].filter(Boolean).join(` `)}
    aria-hidden={`true`}
  >
    <path d={d} />
  </svg>
);
var valueValue19 = {
  calendar: `M7 3v3M17 3v3M4.5 9.5h15M6 5h12a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z`,
  chevron: `M8 10l4 4 4-4`,
  left: `M14.5 6l-6 6 6 6`,
  right: `M9.5 6l6 6-6 6`,
  arrow: `M5 12h14M13 6l6 6-6 6`,
};
function valueValue20(e: Date, t: number) {
  let n = (valueValue4(e).getDay() - t + 7) % 7,
    r = valueValue5(e).getDate(),
    i = [];
  for (let e = 0; e < n; e++) i.push(null);
  for (let t = 1; t <= r; t++)
    i.push(new Date(e.getFullYear(), e.getMonth(), t));
  for (; i.length % 7;) i.push(null);
  let a = [];
  for (let e = 0; e < i.length; e += 7) a.push(i.slice(e, e + 7));
  return a;
}
function DateRangePickerClean({
  value: value,
  defaultValue: defaultValue,
  onChange: onChange,
  presets = defaultPresets,
  compare = true,
  defaultCompare = `previous`,
  weekStartsOn = 1,
  max: max,
  min: min,
  defaultOpen = false,
  today: today,
  className: className,
}: DateRangePickerCleanProps) {
  let S = React.useMemo(
      () => valueValue(today ?? new Date()),
      [today?.getTime()],
    ),
    C = max ? valueValue(max) : S,
    w = min ? valueValue(min) : void 0,
    [de, fe] = React.useState(
      () =>
        defaultValue ?? {
          start: valueValue2(S, -29),
          end: S,
        },
    ),
    T = value ?? de,
    [E, pe] = React.useState(compare ? defaultCompare : `off`),
    [D, O] = React.useState<boolean | "true" | "false">(defaultOpen),
    [k, A] = React.useState<DateDraft>(T),
    [j, M] = React.useState<Date | null>(null),
    [N, P] = React.useState(E),
    [F, I] = React.useState(() => valueValue3(T.end, -1)),
    [me, L] = React.useState(1),
    [R, z] = React.useState(T.end),
    B = React.useRef<HTMLDivElement | null>(null),
    V = React.useRef<HTMLDivElement | null>(null),
    H = React.useRef<HTMLDivElement | null>(null),
    U = React.useRef<HTMLButtonElement | null>(null),
    W = React.useRef(false),
    he = React.useId(),
    ge = React.useRef<HTMLDivElement | null>(null),
    _e = React.useRef<HTMLSpanElement | null>(null),
    ve = React.useRef<HTMLDivElement | null>(null),
    G = React.useRef<{
      start: Date;
      end: Date;
    } | null>(null),
    ye = () => {
      (A(T), P(E), I(valueValue3(T.end, -1)), z(T.end), M(null), O(true));
    },
    K = (e = true) => {
      (O(false), e && U.current?.focus());
    };
  (React.useEffect(() => {
    if (!D) return;
    let e = (e: PointerEvent) => {
      B.current && !B.current.contains(e.target as Node | null) && O(false);
    };
    return (
      document.addEventListener(`pointerdown`, e),
      () => document.removeEventListener(`pointerdown`, e)
    );
  }, [D]),
    React.useLayoutEffect(() => {
      D &&
        W.current &&
        H.current
          ?.querySelector<HTMLElement>(`[data-day="${R.getTime()}"]`)
          ?.focus();
    }, [R, F, D]));
  let q = k.end
      ? valueValue10(k.start, k.end)
      : j
        ? valueValue10(k.start, j)
        : null,
    J = q ?? {
      start: k.start,
      end: k.start,
    },
    Y = compare && q ? valueValue16(q, N) : null,
    X = k.end
      ? presets.find((e) => {
          let t = e.range(S);
          return (
            valueValue6(valueValue(t.start), J.start) &&
            valueValue6(valueValue(t.end), J.end)
          );
        })
      : void 0,
    be = (e: Date) => {
      if (k.end)
        A({
          start: e,
          end: null,
        });
      else {
        let t = valueValue10(k.start, e);
        A(t);
      }
      (M(null), z(e));
    },
    xe = (e: DatePreset) => {
      let t = e.range(S),
        n = {
          start: valueValue9(valueValue(t.start), w, C),
          end: valueValue9(valueValue(t.end), w, C),
        };
      (A(n), M(null), z(n.end));
      let r = valueValue3(n.end, -1);
      r.getTime() !== F.getTime() && (L(r > F ? 1 : -1), I(r));
    },
    Z = (e: number) => {
      (L(e > 0 ? 1 : -1), I((t) => valueValue3(t, e)));
    },
    Se: React.MouseEventHandler<HTMLButtonElement> = () => {
      let t = k.end
        ? valueValue10(k.start, k.end)
        : {
            start: k.start,
            end: k.start,
          };
      (value || fe(t),
        pe(N),
        onChange?.(t, compare ? valueValue16(t, N) : null, N),
        K());
    },
    Ce = (e: number | Date) => e > C || (!!w && e < w),
    we: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
      let t: Record<string, number> = {
          ArrowLeft: -1,
          ArrowRight: 1,
          ArrowUp: -7,
          ArrowDown: 7,
        },
        n = null;
      if (
        (e.key in t
          ? (n = valueValue2(R, t[e.key]))
          : e.key === `PageUp`
            ? (n = new Date(
                R.getFullYear(),
                R.getMonth() - 1,
                Math.min(R.getDate(), 28),
              ))
            : e.key === `PageDown`
              ? (n = new Date(
                  R.getFullYear(),
                  R.getMonth() + 1,
                  Math.min(R.getDate(), 28),
                ))
              : e.key === `Home`
                ? (n = valueValue2(R, -((R.getDay() - weekStartsOn + 7) % 7)))
                : e.key === `End` &&
                  (n = valueValue2(
                    R,
                    6 - ((R.getDay() - weekStartsOn + 7) % 7),
                  )),
        !n)
      )
        return;
      (e.preventDefault(),
        (W.current = true),
        (n = valueValue9(n, w, C)),
        z(n),
        k.end || M(n));
      let r = valueValue5(valueValue3(F, 1));
      n < F ? Z(-1) : n > r && Z(1);
    },
    Te = Array.from(
      {
        length: 7,
      },
      (e, t) =>
        new Intl.DateTimeFormat(`en-US`, {
          weekday: `short`,
        })
          .format(new Date(2026, 0, 4 + weekStartsOn + t))
          .slice(0, 2),
    ),
    Ee = [F, valueValue3(F, 1)],
    De = Math.max(...Ee.map((e) => valueValue20(e, weekStartsOn).length)),
    Q = valueValue8(J.start, J.end),
    Oe = (
      e: number | Date,
      t:
        | {
            start: Date;
            end: Date;
          }
        | {
            start: number;
            end: number;
          }
        | null,
    ) => !!t && e >= t.start && e <= t.end;
  Y && (G.current = Y);
  let $ = React.useRef(false);
  return (
    React.useEffect(() => {
      if (!D) {
        $.current = false;
        return;
      }
      let e = ve.current,
        t = e?.querySelector<HTMLElement>(`[aria-selected="true"]`);
      if (!e || !t || e.scrollWidth <= e.clientWidth) return;
      let n = Math.max(0, t.offsetLeft - (e.clientWidth - t.offsetWidth) / 2);
      (e.scrollTo({
        left: n,
        behavior: $.current ? `smooth` : `auto`,
      }),
        ($.current = true));
    }, [D, X?.id]),
    React.useLayoutEffect(() => {
      let e = V.current,
        t = ge.current;
      if (!D || !e || !t) return;
      let n = () => (e.style.height = `${t.offsetHeight}px`);
      n();
      let r = new ResizeObserver(n);
      return (r.observe(t), () => r.disconnect());
    }, [D]),
    React.useLayoutEffect(() => {
      let e = U.current,
        t = _e.current;
      if (!e || !t) return;
      let n = () => (e.style.width = `${t.offsetWidth + 16}px`);
      n();
      let r = new ResizeObserver(n);
      return (r.observe(t), () => r.disconnect());
    }, []),
    (
      <div
        ref={B}
        className={[`ui-drpc`, className].filter(Boolean).join(` `)}
        data-open={D || void 0}
      >
        <style href={`ui-date-range-picker-clean`} precedence={`default`}>
          {valueValue21}
        </style>
        <button
          ref={U}
          type={`button`}
          className={`ui-drpc__trigger`}
          aria-haspopup={`dialog`}
          aria-expanded={D}
          aria-controls={`${he}-panel`}
          onClick={() => (D ? K() : ye())}
        >
          <span ref={_e} className={`ui-drpc__trigger-inner`}>
            <Iconv d={valueValue19.calendar} />
            <span
              className={`ui-drpc__trigger-text`}
              key={`${valueValue15(T)}-${E}`}
            >
              <span className={`ui-drpc__trigger-range`}>
                {valueValue15(T)}
              </span>
              {compare && E !== `off` && (
                <span className={`ui-drpc__trigger-compare`}>
                  {`vs. `}
                  {valueValue15(valueValue16(T, E)!)}
                </span>
              )}
            </span>
            <Iconv d={valueValue19.chevron} className={`ui-drpc__chevron`} />
          </span>
        </button>
        {D && (
          <div
            id={`${he}-panel`}
            role={`dialog`}
            aria-label={`Choose a date range`}
            className={`ui-drpc__panel`}
            onKeyDown={(e) => {
              e.key === `Escape` && (e.stopPropagation(), K());
            }}
          >
            <div ref={V} className={`ui-drpc__clip`}>
              <div ref={ge} className={`ui-drpc__body`}>
                <div
                  ref={ve}
                  className={`ui-drpc__presets`}
                  role={`listbox`}
                  aria-label={`Presets`}
                >
                  {presets.map((e) => (
                    <button
                      type={`button`}
                      role={`option`}
                      aria-selected={X?.id === e.id}
                      className={`ui-drpc__preset`}
                      onClick={() => xe(e)}
                      key={e.id}
                    >
                      {e.label}
                    </button>
                  ))}
                  <span
                    className={`ui-drpc__preset ui-drpc__preset-custom`}
                    aria-hidden={!!X}
                    data-active={!X || void 0}
                  >{`Custom`}</span>
                </div>
                <div className={`ui-drpc__cal`}>
                  <div className={`ui-drpc__nav`}>
                    <button
                      type={`button`}
                      className={`ui-drpc__icon-btn`}
                      aria-label={`Previous month`}
                      onClick={() => Z(-1)}
                    >
                      <Iconv d={valueValue19.left} />
                    </button>
                    <button
                      type={`button`}
                      className={`ui-drpc__icon-btn`}
                      aria-label={`Next month`}
                      onClick={() => Z(1)}
                    >
                      <Iconv d={valueValue19.right} />
                    </button>
                  </div>
                  <div
                    ref={H}
                    className={`ui-drpc__months`}
                    data-dir={me}
                    onKeyDown={we}
                    onPointerLeave={() => !k.end && M(null)}
                    onPointerDown={() => (W.current = false)}
                    key={F.getTime()}
                  >
                    {Ee.map((e, t) => (
                      <div
                        className={`ui-drpc__month`}
                        data-second={t === 1 || void 0}
                        key={e.getTime()}
                      >
                        <div
                          className={`ui-drpc__month-name`}
                          aria-live={t === 0 ? `polite` : void 0}
                        >
                          {valueValue13.format(e)}
                        </div>
                        <div
                          role={`grid`}
                          aria-label={valueValue13.format(e)}
                          className={`ui-drpc__grid`}
                        >
                          <div role={`row`} className={`ui-drpc__weekdays`}>
                            {Te.map((e) => (
                              <span
                                role={`columnheader`}
                                className={`ui-drpc__weekday`}
                                key={e}
                              >
                                {e}
                              </span>
                            ))}
                          </div>
                          {Array.from(
                            {
                              length: De,
                            },
                            (t, n) =>
                              valueValue20(e, weekStartsOn)[n] ??
                              Array(7).fill(null),
                          ).map((e, t) => (
                            <div
                              role={`row`}
                              className={`ui-drpc__week`}
                              key={t}
                            >
                              {e.map((e, t) => {
                                if (!e)
                                  return (
                                    <span
                                      className={`ui-drpc__day ui-drpc__day-empty`}
                                      role={`gridcell`}
                                      key={t}
                                    />
                                  );
                                let n = valueValue6(e, J.start),
                                  i = valueValue6(e, J.end),
                                  a = Oe(e, q),
                                  o = !a && Oe(e, Y),
                                  s = Ce(e);
                                return (
                                  <span
                                    role={`gridcell`}
                                    aria-selected={a || n || void 0}
                                    className={`ui-drpc__day`}
                                    data-range={a || void 0}
                                    data-start={n || void 0}
                                    data-end={i || void 0}
                                    data-preview={(!k.end && a) || void 0}
                                    data-compare={o || void 0}
                                    data-compare-start={
                                      (Y && valueValue6(e, Y.start)) || void 0
                                    }
                                    data-compare-end={
                                      (Y && valueValue6(e, Y.end)) || void 0
                                    }
                                    data-row-start={
                                      t === 0 || e.getDate() === 1 || void 0
                                    }
                                    data-row-end={
                                      t === 6 ||
                                      valueValue6(e, valueValue5(e)) ||
                                      void 0
                                    }
                                    key={t}
                                  >
                                    <button
                                      type={`button`}
                                      data-day={e.getTime()}
                                      tabIndex={valueValue6(e, R) ? 0 : -1}
                                      disabled={s}
                                      aria-label={valueValue14.format(e)}
                                      aria-current={
                                        valueValue6(e, S) ? `date` : void 0
                                      }
                                      onClick={() => be(e)}
                                      onPointerEnter={() => !k.end && M(e)}
                                      onFocus={() => z(e)}
                                    >
                                      {e.getDate()}
                                    </button>
                                  </span>
                                );
                              })}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className={`ui-drpc__foot`}>
              <div className={`ui-drpc__summary`}>
                <div className={`ui-drpc__summary-range`}>
                  <span key={`${J.start.getTime()}-${J.end.getTime()}`}>
                    {k.end || j
                      ? valueValue15(J)
                      : `${valueValue12.format(k.start)} – pick an end`}
                  </span>
                  <span className={`ui-drpc__count`} key={Q}>
                    {Q}
                    {` `}
                    {Q === 1 ? `day` : `days`}
                  </span>
                </div>
                {compare && (
                  <div className={`ui-drpc__compare`}>
                    <span
                      className={`ui-drpc__compare-label`}
                    >{`Compare`}</span>
                    <div
                      className={`ui-drpc__segments`}
                      role={`radiogroup`}
                      aria-label={`Compare to`}
                    >
                      {valueValue18.map((e) => (
                        <button
                          type={`button`}
                          role={`radio`}
                          aria-checked={N === e.id}
                          className={`ui-drpc__segment`}
                          onClick={() => P(e.id)}
                          key={e.id}
                        >
                          {e.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {compare && (
                  <div className={`ui-drpc__fold`} data-open={!!Y || void 0}>
                    <div>
                      {G.current && (
                        <div
                          className={`ui-drpc__compare-range`}
                          key={`${G.current.start.getTime()}-${G.current.end.getTime()}`}
                        >
                          {`vs. `}
                          {valueValue15(G.current)}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
              <div className={`ui-drpc__buttons`}>
                <button
                  type={`button`}
                  className={`ui-drpc__btn`}
                  onClick={() => K()}
                >{`Cancel`}</button>
                <button
                  type={`button`}
                  className={`ui-drpc__btn ui-drpc__btn-primary`}
                  disabled={!k.end}
                  onClick={Se}
                >{`Apply`}</button>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  );
}
var valueValue21 = `
/* Colors and motion as variables – override them on .ui-drpc */
.ui-drpc {
  --ui-drpc-card: #ffffff;
  --ui-drpc-ink: rgba(0, 0, 0, 0.88);
  --ui-drpc-strong: #000000;
  --ui-drpc-text: rgba(0, 0, 0, 0.61);
  --ui-drpc-muted: rgba(0, 0, 0, 0.45);
  --ui-drpc-faint: rgba(0, 0, 0, 0.27);
  --ui-drpc-icon: rgba(0, 0, 0, 0.447);
  --ui-drpc-line: rgba(0, 0, 0, 0.06);
  --ui-drpc-wash: rgba(0, 0, 0, 0.03);
  --ui-drpc-fill: rgba(0, 0, 0, 0.06);
  --ui-drpc-fill-strong: rgba(0, 0, 0, 0.1);
  /* The picked range: dark chips at the ends, a light gray band between them */
  --ui-drpc-chip: rgba(0, 0, 0, 0.88);
  --ui-drpc-chip-hover: rgba(0, 0, 0, 0.78);
  --ui-drpc-on-chip: #fcfcfc;
  --ui-drpc-band: rgba(0, 0, 0, 0.06);
  --ui-drpc-band-preview: rgba(0, 0, 0, 0.04);
  /* The comparison period: a soft blue band with hairline ends */
  --ui-drpc-compare: rgba(0, 96, 226, 0.08);
  --ui-drpc-compare-edge: rgba(0, 96, 226, 0.4);
  --ui-drpc-accent: rgba(0, 96, 226, 0.765);
  --ui-drpc-today-on-chip: #6ea2ff;
  --ui-drpc-focus: rgba(0, 96, 226, 0.35);
  /* Strokes are shadows: a 0.5px hairline plus a soft lift */
  --ui-drpc-shadow: 0 0 0 0.5px rgba(0, 0, 0, 0.06), 0 1px 1px -1px rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --ui-drpc-shadow-hover: 0 0 0 0.5px rgba(0, 0, 0, 0.12), 0 1px 1px -1px rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --ui-drpc-shadow-pop: 0 0 0 0.5px rgba(0, 0, 0, 0.08), 0 12px 28px -10px rgba(0, 0, 0, 0.16), 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --ui-drpc-ease: cubic-bezier(0.22, 1, 0.36, 1);
  --ui-drpc-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
  position: relative;
  display: inline-block;
  max-width: 100%;
  font-family: "Inter", "InterVariable", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  font-size: 13px;
  line-height: 20px;
  font-weight: 400;
  color: var(--ui-drpc-ink);
  -webkit-font-smoothing: antialiased;
}
.ui-drpc *, .ui-drpc *::before, .ui-drpc *::after { box-sizing: border-box; }
:where(.ui-drpc) button { margin: 0; padding: 0; border: 0; background: none; font: inherit; color: inherit; cursor: pointer; -webkit-tap-highlight-color: transparent; }
:where(.ui-drpc) svg { display: block; flex: none; }
.ui-drpc button:focus-visible { outline: 2px solid var(--ui-drpc-focus); outline-offset: 1px; }
/* 16px icons with thin ~1.1px lines */
.ui-drpc__glyph { width: 16px; height: 16px; fill: none; stroke: currentColor; stroke-width: 1.65; stroke-linecap: round; stroke-linejoin: round; }

/* The trigger: a white one-line field with the hairline shadow; its width glides to the new text */
.ui-drpc__trigger {
  display: inline-flex;
  align-items: center;
  overflow: hidden;
  max-width: 100%;
  height: 32px;
  padding: 0 8px;
  border-radius: 8px;
  background: var(--ui-drpc-card);
  box-shadow: var(--ui-drpc-shadow);
  text-align: left;
  transition: box-shadow 160ms ease, width 320ms var(--ui-drpc-ease);
}
.ui-drpc__trigger:hover { box-shadow: var(--ui-drpc-shadow-hover); }
.ui-drpc__trigger-inner { display: inline-flex; flex: none; align-items: center; gap: 8px; max-width: calc(100vw - 56px); color: var(--ui-drpc-icon); }
.ui-drpc__trigger-text { display: flex; align-items: baseline; gap: 6px; min-width: 0; white-space: nowrap; animation: ui-drpc-in 240ms var(--ui-drpc-ease) both; }
.ui-drpc__trigger-range { flex: 0 0 auto; max-width: 100%; overflow: hidden; color: var(--ui-drpc-ink); font-weight: 500; text-overflow: ellipsis; }
/* The comparison stays on the same line and gives way first when space runs out */
.ui-drpc__trigger-compare { flex: 0 1 auto; min-width: 0; overflow: hidden; font-size: 12px; line-height: 16px; color: var(--ui-drpc-muted); text-overflow: ellipsis; }
.ui-drpc__chevron { transition: transform 260ms var(--ui-drpc-ease); }
.ui-drpc[data-open] .ui-drpc__chevron { transform: rotate(180deg); }

/* The panel: one white popover; the calendars glide to their height, the last row sits below them */
.ui-drpc__panel {
  position: absolute;
  z-index: 30;
  top: calc(100% + 6px);
  left: 0;
  container-type: inline-size;
  /* A fixed width (not max-content), so the container queries below can measure it; override --ui-drpc-panel-width to fit your layout */
  width: var(--ui-drpc-panel-width, min(652px, calc(100vw - 32px)));
  overflow: hidden;
  border-radius: 10px;
  background: var(--ui-drpc-card);
  box-shadow: var(--ui-drpc-shadow-pop);
  transform-origin: top left;
  animation: ui-drpc-open 240ms var(--ui-drpc-ease) both;
}
.ui-drpc__clip { overflow: hidden; transition: height 320ms var(--ui-drpc-ease); }
.ui-drpc__body { display: grid; grid-template-columns: 140px 1fr; }

/* Presets: tab-style rows – gray text, the active one gets the gray fill (no gliding highlight) */
.ui-drpc__presets { position: relative; display: flex; flex-direction: column; gap: 2px; padding: 4px; border-right: 0.5px solid var(--ui-drpc-line); }
.ui-drpc__preset {
  display: flex;
  align-items: center;
  flex: none;
  height: 28px;
  padding: 0 10px;
  border-radius: 6px;
  text-align: left;
  white-space: nowrap;
  font-weight: 500;
  color: var(--ui-drpc-text);
  transition: background-color 120ms ease, color 120ms ease;
}
button.ui-drpc__preset:hover:not([aria-selected="true"]) { background: var(--ui-drpc-wash); color: var(--ui-drpc-ink); }
.ui-drpc__preset[aria-selected="true"], .ui-drpc__preset-custom[data-active] { background: var(--ui-drpc-fill); color: var(--ui-drpc-ink); }
.ui-drpc__preset-custom { margin-top: auto; color: var(--ui-drpc-faint); cursor: default; }

/* Calendars */
.ui-drpc__cal { position: relative; padding: 10px 12px 10px; overflow: hidden; }
.ui-drpc__nav { position: absolute; top: 10px; left: 12px; right: 12px; z-index: 1; display: flex; justify-content: space-between; pointer-events: none; }
.ui-drpc__nav > * { pointer-events: auto; }
.ui-drpc__icon-btn { display: grid; place-items: center; width: 28px; height: 28px; border-radius: 6px; color: var(--ui-drpc-icon); transition: background-color 120ms ease, color 120ms ease; }
.ui-drpc__icon-btn:hover { background: var(--ui-drpc-wash); color: var(--ui-drpc-ink); }
.ui-drpc__months { display: grid; grid-template-columns: repeat(2, auto); justify-content: center; gap: 24px; animation: ui-drpc-slide 320ms var(--ui-drpc-ease) both; }
.ui-drpc__months[data-dir="-1"] { animation-name: ui-drpc-slide-back; }
.ui-drpc__month-name { height: 28px; margin-bottom: 4px; font-weight: 500; line-height: 28px; text-align: center; color: var(--ui-drpc-strong); }
.ui-drpc__grid { display: grid; gap: 2px; }
.ui-drpc__weekdays, .ui-drpc__week { display: grid; grid-template-columns: repeat(7, 32px); }
.ui-drpc__weekday { height: 24px; font-size: 10px; font-weight: 500; line-height: 24px; letter-spacing: 0.5px; text-transform: uppercase; text-align: center; color: var(--ui-drpc-muted); }

/* A day: the band sits behind the number and runs on into its neighbours */
.ui-drpc__day { position: relative; display: grid; height: 32px; }
.ui-drpc__day::before { content: ""; position: absolute; inset: 2px 0; transition: background-color 160ms ease, border-radius 220ms var(--ui-drpc-ease), left 220ms var(--ui-drpc-ease), right 220ms var(--ui-drpc-ease); }
.ui-drpc__day[data-range]::before { background: var(--ui-drpc-band); }
.ui-drpc__day[data-preview]::before { background: var(--ui-drpc-band-preview); }
.ui-drpc__day[data-compare]::before { background: var(--ui-drpc-compare); }
.ui-drpc__day[data-start]::before, .ui-drpc__day[data-compare-start]::before, .ui-drpc__day[data-row-start]::before { left: 2px; border-top-left-radius: 6px; border-bottom-left-radius: 6px; }
.ui-drpc__day[data-end]::before, .ui-drpc__day[data-compare-end]::before, .ui-drpc__day[data-row-end]::before { right: 2px; border-top-right-radius: 6px; border-bottom-right-radius: 6px; }
.ui-drpc__day button {
  position: relative;
  margin: 2px;
  border-radius: 6px;
  font-size: 13px;
  line-height: 20px;
  font-variant-numeric: tabular-nums;
  color: var(--ui-drpc-ink);
  transition: background-color 120ms ease, color 120ms ease, box-shadow 120ms ease, transform 160ms var(--ui-drpc-ease);
}
.ui-drpc__day button:hover:not(:disabled) { background: var(--ui-drpc-fill); }
.ui-drpc__day button:active:not(:disabled) { transform: scale(0.94); }
.ui-drpc__day button:disabled { color: var(--ui-drpc-faint); cursor: default; }
/* Today: a small blue dot under the number */
.ui-drpc__day button[aria-current="date"] { color: var(--ui-drpc-accent); font-weight: 500; }
.ui-drpc__day button[aria-current="date"]::after { content: ""; position: absolute; left: 50%; bottom: 3px; width: 4px; height: 4px; margin-left: -2px; border-radius: 50%; background: var(--ui-drpc-accent); }
/* The ends of the range: dark chips */
.ui-drpc__day[data-start] button, .ui-drpc__day[data-end] button { background: var(--ui-drpc-chip) !important; color: var(--ui-drpc-on-chip); font-weight: 500; box-shadow: none !important; animation: ui-drpc-pick 380ms var(--ui-drpc-spring); }
.ui-drpc__day[data-start] button[aria-current="date"]::after, .ui-drpc__day[data-end] button[aria-current="date"]::after { background: var(--ui-drpc-today-on-chip); }
/* While previewing, the end follows the pointer – no pop on every move */
.ui-drpc__day[data-preview][data-end] button { animation: none; }
.ui-drpc__day[data-compare-start] button, .ui-drpc__day[data-compare-end] button { box-shadow: inset 0 0 0 0.5px var(--ui-drpc-compare-edge); }
.ui-drpc__day-empty::before { display: none; }

/* The last row, under a hairline: summary and compare on the left, Cancel / Apply on the right */
.ui-drpc__foot { display: flex; align-items: flex-end; justify-content: space-between; gap: 12px; padding: 10px 10px 10px 14px; border-top: 0.5px solid var(--ui-drpc-line); }
.ui-drpc__summary { display: grid; gap: 8px; min-width: 0; }
.ui-drpc__summary-range { display: flex; align-items: baseline; gap: 8px; min-width: 0; white-space: nowrap; color: var(--ui-drpc-strong); font-weight: 500; }
.ui-drpc__summary-range > span:first-child { min-width: 0; overflow: hidden; text-overflow: ellipsis; animation: ui-drpc-in 240ms var(--ui-drpc-ease) both; }
.ui-drpc__count { flex: none; font-size: 12px; line-height: 16px; font-weight: 400; font-variant-numeric: tabular-nums; color: var(--ui-drpc-muted); animation: ui-drpc-in 240ms var(--ui-drpc-ease) both; }
.ui-drpc__compare { display: flex; align-items: center; gap: 8px; }
.ui-drpc__compare-label { font-size: 12px; line-height: 16px; color: var(--ui-drpc-muted); }
/* Compare: tab-style buttons with a hairline, the active one filled */
.ui-drpc__segments { display: inline-flex; flex-wrap: wrap; gap: 4px; }
.ui-drpc__segment { padding: 4px 10px; border-radius: 6px; box-shadow: inset 0 0 0 0.5px var(--ui-drpc-line); font-weight: 500; white-space: nowrap; color: var(--ui-drpc-text); transition: background-color 120ms ease, color 120ms ease; }
.ui-drpc__segment:hover:not([aria-checked="true"]) { background: var(--ui-drpc-wash); color: var(--ui-drpc-ink); }
.ui-drpc__segment[aria-checked="true"] { background: var(--ui-drpc-fill); color: var(--ui-drpc-ink); }
.ui-drpc__fold { display: grid; grid-template-rows: 0fr; opacity: 0; margin-top: -8px; transition: grid-template-rows 300ms var(--ui-drpc-ease), opacity 200ms ease, margin-top 300ms var(--ui-drpc-ease); }
.ui-drpc__fold[data-open] { grid-template-rows: 1fr; opacity: 1; margin-top: 0; }
.ui-drpc__fold > div { min-height: 0; overflow: hidden; }
.ui-drpc__compare-range { display: flex; align-items: center; gap: 6px; font-size: 12px; line-height: 16px; color: var(--ui-drpc-muted); animation: ui-drpc-in 220ms var(--ui-drpc-ease) both; }
.ui-drpc__compare-range::before { content: ""; flex: none; width: 14px; height: 8px; border-radius: 3px; background: var(--ui-drpc-compare); box-shadow: inset 0 0 0 0.5px var(--ui-drpc-compare-edge); }
.ui-drpc__buttons { display: flex; flex: none; gap: 8px; }
.ui-drpc__btn {
  display: inline-flex;
  align-items: center;
  height: 28px;
  padding: 0 10px;
  border-radius: 6px;
  background: var(--ui-drpc-card);
  box-shadow: var(--ui-drpc-shadow);
  font-weight: 500;
  color: var(--ui-drpc-strong);
  transition: background-color 140ms ease, box-shadow 140ms ease, opacity 140ms ease, transform 140ms ease;
}
.ui-drpc__btn:not(.ui-drpc__btn-primary):hover { box-shadow: var(--ui-drpc-shadow-hover); }
.ui-drpc__btn-primary { background: var(--ui-drpc-chip); box-shadow: none; color: var(--ui-drpc-on-chip); }
.ui-drpc__btn-primary:hover:not(:disabled) { background: var(--ui-drpc-chip-hover); }
.ui-drpc__btn:active:not(:disabled) { transform: scale(0.97); }
.ui-drpc__btn-primary:disabled { opacity: 0.35; cursor: default; }

@keyframes ui-drpc-open { from { opacity: 0; transform: translateY(-4px) scale(0.98); } to { opacity: 1; transform: none; } }
@keyframes ui-drpc-slide { from { opacity: 0; transform: translateX(14px); } to { opacity: 1; transform: none; } }
@keyframes ui-drpc-slide-back { from { opacity: 0; transform: translateX(-14px); } to { opacity: 1; transform: none; } }
@keyframes ui-drpc-in { from { opacity: 0; transform: translateY(3px); } to { opacity: 1; transform: none; } }
@keyframes ui-drpc-pick { 0% { transform: scale(0.82); } 60% { transform: scale(1.06); } 100% { transform: scale(1); } }

/* Narrow panel (phones): presets as a scrolling row of tab chips, one month, stacked last row */
@container (max-width: 600px) {
  .ui-drpc__body { grid-template-columns: 1fr; }
  .ui-drpc__presets {
    flex-direction: row;
    gap: 4px;
    padding: 8px;
    overflow-x: auto;
    border-right: 0;
    border-bottom: 0.5px solid var(--ui-drpc-line);
    scrollbar-width: none;
  }
  .ui-drpc__presets::-webkit-scrollbar { display: none; }
  .ui-drpc__preset { height: auto; padding: 4px 10px; box-shadow: inset 0 0 0 0.5px var(--ui-drpc-line); }
  .ui-drpc__preset-custom { display: none; }
  .ui-drpc__months { grid-template-columns: 1fr; justify-items: center; }
  /* One month: the one the range ends in */
  .ui-drpc__month:not([data-second]) { display: none; }
  .ui-drpc__foot { flex-direction: column; align-items: stretch; padding: 10px 10px 10px 12px; }
  .ui-drpc__buttons { justify-content: flex-end; }
  .ui-drpc__compare { flex-wrap: wrap; }
}
@container (max-width: 340px) {
  .ui-drpc__weekdays, .ui-drpc__week { grid-template-columns: repeat(7, 1fr); }
  .ui-drpc__cal { padding: 10px 8px; }
  .ui-drpc__nav { left: 8px; right: 8px; }
  .ui-drpc__months { justify-items: stretch; }
}
/* Touch screens: bigger targets */
@media (hover: none) and (pointer: coarse) {
  .ui-drpc__trigger { height: 40px; }
  .ui-drpc__day { height: 40px; }
  .ui-drpc__weekdays, .ui-drpc__week { grid-template-columns: repeat(7, minmax(0, 40px)); }
  .ui-drpc__icon-btn { width: 36px; height: 36px; }
  .ui-drpc__month-name { height: 36px; line-height: 36px; }
  .ui-drpc__preset { height: 36px; }
  .ui-drpc__btn { height: 36px; padding: 0 14px; }
  .ui-drpc__segment { padding: 8px 12px; }
}
@media (prefers-reduced-motion: reduce) {
  .ui-drpc *, .ui-drpc *::before, .ui-drpc *::after { animation: none !important; transition: none !important; }
}

/* Dark mode: follows a .dark class or data-theme="dark" on any ancestor, e.g. <html> */
:where(.dark, [data-theme="dark"]) .ui-drpc {
  --ui-drpc-card: #1c1c1e;
  --ui-drpc-ink: rgba(255, 255, 255, 0.9);
  --ui-drpc-strong: #ffffff;
  --ui-drpc-text: rgba(255, 255, 255, 0.62);
  --ui-drpc-muted: rgba(255, 255, 255, 0.46);
  --ui-drpc-faint: rgba(255, 255, 255, 0.3);
  --ui-drpc-icon: rgba(255, 255, 255, 0.5);
  --ui-drpc-line: rgba(255, 255, 255, 0.08);
  --ui-drpc-wash: rgba(255, 255, 255, 0.04);
  --ui-drpc-fill: rgba(255, 255, 255, 0.08);
  --ui-drpc-fill-strong: rgba(255, 255, 255, 0.13);
  --ui-drpc-chip: rgba(255, 255, 255, 0.9);
  --ui-drpc-chip-hover: rgba(255, 255, 255, 0.8);
  --ui-drpc-on-chip: #111113;
  --ui-drpc-band: rgba(255, 255, 255, 0.08);
  --ui-drpc-band-preview: rgba(255, 255, 255, 0.05);
  --ui-drpc-compare: rgba(77, 141, 255, 0.14);
  --ui-drpc-compare-edge: rgba(77, 141, 255, 0.55);
  --ui-drpc-accent: #4d8dff;
  --ui-drpc-today-on-chip: #0060e2;
  --ui-drpc-focus: rgba(77, 141, 255, 0.5);
  --ui-drpc-shadow: 0 0 0 0.5px rgba(255, 255, 255, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.4);
  --ui-drpc-shadow-hover: 0 0 0 0.5px rgba(255, 255, 255, 0.18), 0 1px 2px 0 rgba(0, 0, 0, 0.4);
  --ui-drpc-shadow-pop: 0 0 0 0.5px rgba(255, 255, 255, 0.1), 0 12px 28px -10px rgba(0, 0, 0, 0.6), 0 1px 2px 0 rgba(0, 0, 0, 0.4);
}
`;
function DateRangePickerCleanDemo2() {
  return (
    <div className={`drp-demo`}>
      <DateRangePickerClean defaultOpen={true} defaultCompare={`off`} />
    </div>
  );
}
const demoStyles =
  ".drp-demo{width:min(100%,652px)}.card__preview .drp-demo{place-content:center;width:auto;display:grid;position:absolute;inset:0}.card__preview .drp-demo .ui-drp{--ui-drp-panel-width:652px;zoom:.4;justify-items:start;display:grid}.card__preview .drp-demo .ui-drp__panel{margin-top:8px;position:relative;top:auto}.stage:has(.drp-demo){align-items:start;height:560px;padding:48px 32px}@media (width<=760px){.stage:has(.drp-demo){height:640px;padding:52px 12px 16px}.drp-demo .ui-drp{--ui-drp-panel-width:100%;display:block}}.card__preview .drp-demo .ui-drpc{--ui-drpc-panel-width:652px;zoom:.4;justify-items:start;display:grid}.card__preview .drp-demo .ui-drpc__panel{margin-top:8px;position:relative;top:auto}@media (width<=760px){.drp-demo .ui-drpc{--ui-drpc-panel-width:100%;display:block}}\n";
function DateRangePickerCleanDemo(props: React.JSX.IntrinsicAttributes) {
  return (
    <>
      <style href="plico-demo-date-range-picker-clean" precedence="default">
        {demoStyles}
      </style>
      <DateRangePickerCleanDemo2 {...props} />
    </>
  );
}
export { DateRangePickerClean as Component };
export { DateRangePickerClean };
export { DateRangePickerCleanDemo };
export { DateRangePickerCleanDemo as Demo };
export { defaultPresets };
export default DateRangePickerClean;

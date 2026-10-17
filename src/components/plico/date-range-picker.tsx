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
interface DateRangePickerProps {
  value?: {
    start: Date;
    end: Date;
  };
  defaultValue?: {
    start: Date;
    end: Date;
  };
  onChange?: (range: DateRange, compare: DateRange | null, mode: string) => void;
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
var valueValue = (e: Date) => new Date(e.getFullYear(), e.getMonth(), e.getDate());
var valueValue2 = (e: Date, t: number) => new Date(e.getFullYear(), e.getMonth(), e.getDate() + t);
var valueValue3 = (e: Date, t: number) => new Date(e.getFullYear(), e.getMonth() + t, 1);
var valueValue4 = (e: Date) => new Date(e.getFullYear(), e.getMonth(), 1);
var valueValue5 = (e: Date) => new Date(e.getFullYear(), e.getMonth() + 1, 0);
var valueValue6 = (e: Date, t: Date) => !!e && !!t && e.getTime() === t.getTime();
var valueValue7 = (e: Date) => Date.UTC(e.getFullYear(), e.getMonth(), e.getDate());
var valueValue8 = (e: Date, t: Date) => Math.round((valueValue7(t) - valueValue7(e)) / 864e5) + 1;
var valueValue9 = (e: Date, t: Date | undefined, n: Date) => (t && e < t ? t : n && e > n ? n : e);
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
    let t = (e: Date) => new Date(e.getFullYear() - 1, e.getMonth(), e.getDate());
    return {
      start: t(e.start),
      end: t(e.end),
    };
  }
  return null;
}
var valueValue17 = (e: Date) => new Date(e.getFullYear(), Math.floor(e.getMonth() / 3) * 3, 1);
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
var View_ = ({ d: d, className: className }: { d: string; className?: string }) => (
  <svg
    viewBox={`0 0 24 24`}
    className={[`ui-drp__glyph`, className].filter(Boolean).join(` `)}
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
function valueValue20(e: HTMLDivElement | null, t: HTMLSpanElement | null, n: string) {
  if (!e || !t) return;
  let r = e.querySelector<HTMLElement>(n);
  if (!r || !r.offsetWidth) {
    t.style.opacity = `0`;
    return;
  }
  let i = !t.dataset.ready;
  (i && (t.style.transition = `none`),
    (t.style.opacity = `1`),
    (t.style.width = `${r.offsetWidth}px`),
    (t.style.height = `${r.offsetHeight}px`),
    (t.style.transform = `translate(${r.offsetLeft}px, ${r.offsetTop}px)`),
    i && ((t.dataset.ready = `1`), t.offsetWidth, (t.style.transition = ``)));
}
function valueValue21(e: Date, t: number) {
  let n = (valueValue4(e).getDay() - t + 7) % 7,
    r = valueValue5(e).getDate(),
    i = [];
  for (let e = 0; e < n; e++) i.push(null);
  for (let t = 1; t <= r; t++) i.push(new Date(e.getFullYear(), e.getMonth(), t));
  for (; i.length % 7;) i.push(null);
  let a = [];
  for (let e = 0; e < i.length; e += 7) a.push(i.slice(e, e + 7));
  return a;
}
function DateRangePicker({
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
}: DateRangePickerProps) {
  let S = React.useMemo(() => valueValue(today ?? new Date()), [today?.getTime()]),
    C = max ? valueValue(max) : S,
    w = min ? valueValue(min) : void 0,
    [fe, pe] = React.useState(
      () =>
        defaultValue ?? {
          start: valueValue2(S, -29),
          end: S,
        },
    ),
    T = value ?? fe,
    [E, me] = React.useState(compare ? defaultCompare : `off`),
    [D, O] = React.useState<boolean | "true" | "false">(defaultOpen),
    [k, A] = React.useState<DateDraft>(T),
    [j, M] = React.useState<Date | null>(null),
    [N, he] = React.useState(E),
    [P, F] = React.useState(() => valueValue3(T.end, -1)),
    [ge, I] = React.useState(1),
    [L, R] = React.useState(T.end),
    z = React.useRef<HTMLDivElement | null>(null),
    B = React.useRef<HTMLDivElement | null>(null),
    V = React.useRef<HTMLDivElement | null>(null),
    H = React.useRef<HTMLButtonElement | null>(null),
    U = React.useRef(false),
    _e = React.useId(),
    ve = React.useRef<HTMLDivElement | null>(null),
    ye = React.useRef<HTMLSpanElement | null>(null),
    W = React.useRef<HTMLDivElement | null>(null),
    be = React.useRef<HTMLSpanElement | null>(null),
    xe = React.useRef<HTMLDivElement | null>(null),
    Se = React.useRef<HTMLSpanElement | null>(null),
    G = React.useRef<{
      start: Date;
      end: Date;
    } | null>(null),
    Ce = () => {
      (A(T), he(E), F(valueValue3(T.end, -1)), R(T.end), M(null), O(true));
    },
    K = (e = true) => {
      (O(false), e && H.current?.focus());
    };
  (React.useEffect(() => {
    if (!D) return;
    let e = (e: PointerEvent) => {
      z.current && !z.current.contains(e.target as Node | null) && O(false);
    };
    return (
      document.addEventListener(`pointerdown`, e),
      () => document.removeEventListener(`pointerdown`, e)
    );
  }, [D]),
    React.useLayoutEffect(() => {
      D &&
        U.current &&
        V.current?.querySelector<HTMLElement>(`[data-day="${L.getTime()}"]`)?.focus();
    }, [L, P, D]));
  let q = k.end ? valueValue10(k.start, k.end) : j ? valueValue10(k.start, j) : null,
    J = q ?? {
      start: k.start,
      end: k.start,
    },
    Y = compare && q ? valueValue16(q, N) : null,
    X = k.end
      ? presets.find((e) => {
          let t = e.range(S);
          return valueValue6(valueValue(t.start), J.start) && valueValue6(valueValue(t.end), J.end);
        })
      : void 0,
    we = (e: Date) => {
      if (k.end)
        A({
          start: e,
          end: null,
        });
      else {
        let t = valueValue10(k.start, e);
        A(t);
      }
      (M(null), R(e));
    },
    Te = (e: DatePreset) => {
      let t = e.range(S),
        n = {
          start: valueValue9(valueValue(t.start), w, C),
          end: valueValue9(valueValue(t.end), w, C),
        };
      (A(n), M(null), R(n.end));
      let r = valueValue3(n.end, -1);
      r.getTime() !== P.getTime() && (I(r > P ? 1 : -1), F(r));
    },
    Z = (e: number) => {
      (I(e > 0 ? 1 : -1), F((t) => valueValue3(t, e)));
    },
    Ee: React.MouseEventHandler<HTMLButtonElement> = () => {
      let t = k.end
        ? valueValue10(k.start, k.end)
        : {
            start: k.start,
            end: k.start,
          };
      (value || pe(t), me(N), onChange?.(t, compare ? valueValue16(t, N) : null, N), K());
    },
    De = (e: Date) => e > C || (!!w && e < w),
    Oe: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
      let t: Record<string, number> = {
          ArrowLeft: -1,
          ArrowRight: 1,
          ArrowUp: -7,
          ArrowDown: 7,
        },
        n = null;
      if (
        (e.key in t
          ? (n = valueValue2(L, t[e.key]))
          : e.key === `PageUp`
            ? (n = new Date(L.getFullYear(), L.getMonth() - 1, Math.min(L.getDate(), 28)))
            : e.key === `PageDown`
              ? (n = new Date(L.getFullYear(), L.getMonth() + 1, Math.min(L.getDate(), 28)))
              : e.key === `Home`
                ? (n = valueValue2(L, -((L.getDay() - weekStartsOn + 7) % 7)))
                : e.key === `End` &&
                  (n = valueValue2(L, 6 - ((L.getDay() - weekStartsOn + 7) % 7))),
        !n)
      )
        return;
      (e.preventDefault(), (U.current = true), (n = valueValue9(n, w, C)), R(n), k.end || M(n));
      let r = valueValue5(valueValue3(P, 1));
      n < P ? Z(-1) : n > r && Z(1);
    },
    ke = Array.from(
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
    Ae = [P, valueValue3(P, 1)],
    je = Math.max(...Ae.map((e) => valueValue21(e, weekStartsOn).length)),
    Q = valueValue8(J.start, J.end),
    Me = (
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
  (Y && (G.current = Y),
    React.useLayoutEffect(() => {
      (valueValue20(W.current, be.current, `[aria-selected="true"], [data-active]`),
        valueValue20(xe.current, Se.current, `[aria-checked="true"]`));
    }));
  let $ = React.useRef(false);
  return (
    React.useEffect(() => {
      if (!D) {
        $.current = false;
        return;
      }
      let e = W.current,
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
      let e = B.current,
        t = ve.current;
      if (!D || !e || !t) return;
      let n = () => (e.style.height = `${t.offsetHeight + 8}px`);
      n();
      let r = new ResizeObserver(n);
      return (r.observe(t), () => r.disconnect());
    }, [D]),
    React.useLayoutEffect(() => {
      let e = H.current,
        t = ye.current;
      if (!e || !t) return;
      let n = () => (e.style.width = `${t.offsetWidth + 20}px`);
      n();
      let r = new ResizeObserver(n);
      return (r.observe(t), () => r.disconnect());
    }, []),
    (
      <div
        ref={z}
        className={[`ui-drp`, className].filter(Boolean).join(` `)}
        data-open={D || void 0}
      >
        <style href={`ui-date-range-picker`} precedence={`default`}>
          {valueValue22}
        </style>
        <button
          ref={H}
          type={`button`}
          className={`ui-drp__trigger`}
          aria-haspopup={`dialog`}
          aria-expanded={D}
          aria-controls={`${_e}-panel`}
          onClick={() => (D ? K() : Ce())}
        >
          <span ref={ye} className={`ui-drp__trigger-inner`}>
            <View_ d={valueValue19.calendar} />
            <span className={`ui-drp__trigger-text`} key={`${valueValue15(T)}-${E}`}>
              <span className={`ui-drp__trigger-range`}>{valueValue15(T)}</span>
              {compare && E !== `off` && (
                <span className={`ui-drp__trigger-compare`}>
                  {`vs. `}
                  {valueValue15(valueValue16(T, E)!)}
                </span>
              )}
            </span>
            <View_ d={valueValue19.chevron} className={`ui-drp__chevron`} />
          </span>
        </button>
        {D && (
          <div
            ref={B}
            id={`${_e}-panel`}
            role={`dialog`}
            aria-label={`Choose a date range`}
            className={`ui-drp__panel`}
            onKeyDown={(e) => {
              e.key === `Escape` && (e.stopPropagation(), K());
            }}
          >
            <div ref={ve} className={`ui-drp__panel-inner`}>
              <div className={`ui-drp__body`}>
                <div ref={W} className={`ui-drp__presets`} role={`listbox`} aria-label={`Presets`}>
                  <span ref={be} className={`ui-drp__pill`} aria-hidden={`true`} />
                  {presets.map((e) => (
                    <button
                      type={`button`}
                      role={`option`}
                      aria-selected={X?.id === e.id}
                      className={`ui-drp__preset`}
                      onClick={() => Te(e)}
                      key={e.id}
                    >
                      {e.label}
                    </button>
                  ))}
                  <span
                    className={`ui-drp__preset ui-drp__preset-custom`}
                    aria-hidden={!!X}
                    data-active={!X || void 0}
                  >{`Custom`}</span>
                </div>
                <div className={`ui-drp__cal`}>
                  <div className={`ui-drp__nav`}>
                    <button
                      type={`button`}
                      className={`ui-drp__icon-btn`}
                      aria-label={`Previous month`}
                      onClick={() => Z(-1)}
                    >
                      <View_ d={valueValue19.left} />
                    </button>
                    <button
                      type={`button`}
                      className={`ui-drp__icon-btn`}
                      aria-label={`Next month`}
                      onClick={() => Z(1)}
                    >
                      <View_ d={valueValue19.right} />
                    </button>
                  </div>
                  <div
                    ref={V}
                    className={`ui-drp__months`}
                    data-dir={ge}
                    onKeyDown={Oe}
                    onPointerLeave={() => !k.end && M(null)}
                    onPointerDown={() => (U.current = false)}
                    key={P.getTime()}
                  >
                    {Ae.map((e, t) => (
                      <div
                        className={`ui-drp__month`}
                        data-second={t === 1 || void 0}
                        key={e.getTime()}
                      >
                        <div
                          className={`ui-drp__month-name`}
                          aria-live={t === 0 ? `polite` : void 0}
                        >
                          {valueValue13.format(e)}
                        </div>
                        <div
                          role={`grid`}
                          aria-label={valueValue13.format(e)}
                          className={`ui-drp__grid`}
                        >
                          <div role={`row`} className={`ui-drp__weekdays`}>
                            {ke.map((e) => (
                              <span role={`columnheader`} className={`ui-drp__weekday`} key={e}>
                                {e}
                              </span>
                            ))}
                          </div>
                          {Array.from(
                            {
                              length: je,
                            },
                            (t, n) => valueValue21(e, weekStartsOn)[n] ?? Array(7).fill(null),
                          ).map((e, t) => (
                            <div role={`row`} className={`ui-drp__week`} key={t}>
                              {e.map((e, t) => {
                                if (!e)
                                  return (
                                    <span
                                      className={`ui-drp__day ui-drp__day-empty`}
                                      role={`gridcell`}
                                      key={t}
                                    />
                                  );
                                let n = valueValue6(e, J.start),
                                  i = valueValue6(e, J.end),
                                  a = Me(e, q),
                                  o = !a && Me(e, Y),
                                  s = De(e);
                                return (
                                  <span
                                    role={`gridcell`}
                                    aria-selected={a || n || void 0}
                                    className={`ui-drp__day`}
                                    data-range={a || void 0}
                                    data-start={n || void 0}
                                    data-end={i || void 0}
                                    data-preview={(!k.end && a) || void 0}
                                    data-compare={o || void 0}
                                    data-compare-start={(Y && valueValue6(e, Y.start)) || void 0}
                                    data-compare-end={(Y && valueValue6(e, Y.end)) || void 0}
                                    data-row-start={t === 0 || e.getDate() === 1 || void 0}
                                    data-row-end={
                                      t === 6 || valueValue6(e, valueValue5(e)) || void 0
                                    }
                                    key={t}
                                  >
                                    <button
                                      type={`button`}
                                      data-day={e.getTime()}
                                      tabIndex={valueValue6(e, L) ? 0 : -1}
                                      disabled={s}
                                      aria-label={valueValue14.format(e)}
                                      aria-current={valueValue6(e, S) ? `date` : void 0}
                                      onClick={() => we(e)}
                                      onPointerEnter={() => !k.end && M(e)}
                                      onFocus={() => R(e)}
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
              <div className={`ui-drp__foot`}>
                <div className={`ui-drp__summary`}>
                  <div className={`ui-drp__summary-range`}>
                    <span key={`${J.start.getTime()}-${J.end.getTime()}`}>
                      {k.end || j
                        ? valueValue15(J)
                        : `${valueValue12.format(k.start)} – pick an end`}
                    </span>
                    <span className={`ui-drp__count`} key={Q}>
                      {Q}
                      {` `}
                      {Q === 1 ? `day` : `days`}
                    </span>
                  </div>
                  {compare && (
                    <div className={`ui-drp__compare`}>
                      <span className={`ui-drp__compare-label`}>{`Compare`}</span>
                      <div
                        ref={xe}
                        className={`ui-drp__segments`}
                        role={`radiogroup`}
                        aria-label={`Compare to`}
                      >
                        <span ref={Se} className={`ui-drp__pill`} aria-hidden={`true`} />
                        {valueValue18.map((e) => (
                          <button
                            type={`button`}
                            role={`radio`}
                            aria-checked={N === e.id}
                            className={`ui-drp__segment`}
                            onClick={() => he(e.id)}
                            key={e.id}
                          >
                            {e.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  {compare && (
                    <div className={`ui-drp__fold`} data-open={!!Y || void 0}>
                      <div>
                        {G.current && (
                          <div
                            className={`ui-drp__compare-range`}
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
                <div className={`ui-drp__buttons`}>
                  <button
                    type={`button`}
                    className={`ui-drp__btn`}
                    onClick={() => K()}
                  >{`Cancel`}</button>
                  <button
                    type={`button`}
                    className={`ui-drp__btn ui-drp__btn-primary`}
                    disabled={!k.end}
                    onClick={Ee}
                  >{`Apply`}</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  );
}
var valueValue22 = `
/* Colors and motion as variables – override them on .ui-drp */
.ui-drp {
  --ui-drp-tray: #f0f0f0;
  --ui-drp-card: #ffffff;
  --ui-drp-line: #ececec;
  --ui-drp-ink: #171717;
  --ui-drp-text: #404040;
  --ui-drp-muted: #8f8f8f;
  --ui-drp-faint: #c4c4c7;
  --ui-drp-hover: #f2f2f3;
  --ui-drp-active: #ebebed;
  --ui-drp-band: rgba(47, 107, 255, 0.1);
  --ui-drp-band-preview: rgba(47, 107, 255, 0.06);
  --ui-drp-accent: #2f6bff;
  --ui-drp-on-accent: #ffffff;
  --ui-drp-compare: #ececee;
  --ui-drp-compare-edge: #b9b9be;
  --ui-drp-focus: rgba(23, 23, 23, 0.22);
  --ui-drp-shadow: 0 0 0 1px rgba(0, 0, 0, 0.06), 0 18px 40px -12px rgba(0, 0, 0, 0.18), 0 4px 12px -4px rgba(0, 0, 0, 0.06);
  --ui-drp-ease: cubic-bezier(0.22, 1, 0.36, 1);
  position: relative;
  display: inline-block;
  max-width: 100%;
  font-family: "Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  font-size: 13px;
  line-height: 1.4;
  color: var(--ui-drp-text);
  -webkit-font-smoothing: antialiased;
}
.ui-drp *, .ui-drp *::before, .ui-drp *::after { box-sizing: border-box; }
:where(.ui-drp) button { margin: 0; padding: 0; border: 0; background: none; font: inherit; color: inherit; cursor: pointer; }
:where(.ui-drp) svg { display: block; flex: none; }
.ui-drp button:focus-visible { outline: 2px solid var(--ui-drp-focus); outline-offset: 2px; }
.ui-drp__glyph { width: 16px; height: 16px; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }

/* The trigger */
.ui-drp__trigger {
  display: inline-flex;
  align-items: center;
  overflow: hidden;
  max-width: 100%;
  min-height: 38px;
  padding: 5px 9px 5px 11px;
  border-radius: 11px;
  background: var(--ui-drp-card);
  box-shadow: 0 0 0 1px var(--ui-drp-line), 0 1px 2px rgba(0, 0, 0, 0.04);
  text-align: left;
  transition: box-shadow 160ms ease, width 320ms var(--ui-drp-ease);
}
.ui-drp__trigger-inner { display: inline-flex; flex: none; align-items: center; gap: 10px; max-width: calc(100vw - 56px); }
.ui-drp__trigger:hover { box-shadow: 0 0 0 1px var(--ui-drp-faint), 0 1px 2px rgba(0, 0, 0, 0.04); }
.ui-drp__trigger > .ui-drp__glyph { color: var(--ui-drp-muted); }
.ui-drp__trigger-text { display: grid; min-width: 0; animation: ui-drp-in 280ms var(--ui-drp-ease) both; }
.ui-drp__trigger-range { overflow: hidden; color: var(--ui-drp-ink); font-weight: 500; white-space: nowrap; text-overflow: ellipsis; }
.ui-drp__trigger-compare { overflow: hidden; font-size: 12px; color: var(--ui-drp-muted); white-space: nowrap; text-overflow: ellipsis; }
.ui-drp__chevron { color: var(--ui-drp-muted); transition: transform 260ms var(--ui-drp-ease); }
.ui-drp[data-open] .ui-drp__chevron { transform: rotate(180deg); }

/* The panel: a gray tray around a white card, like the other Plico UI menus */
.ui-drp__panel {
  position: absolute;
  z-index: 30;
  top: calc(100% + 8px);
  left: 0;
  container-type: inline-size;
  /* A fixed width (not max-content), so the container queries below can measure it; override --ui-drp-panel-width to fit your layout */
  width: var(--ui-drp-panel-width, min(652px, calc(100vw - 32px)));
  padding: 4px;
  border-radius: 20px;
  background: var(--ui-drp-tray);
  box-shadow: var(--ui-drp-shadow);
  overflow: hidden;
  transform-origin: top left;
  transition: height 320ms var(--ui-drp-ease);
  animation: ui-drp-open 260ms var(--ui-drp-ease) both;
}
/* The pill behind the active preset and compare option */
.ui-drp__pill {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
  border-radius: 8px;
  background: var(--ui-drp-active);
  opacity: 0;
  pointer-events: none;
  transition: transform 320ms var(--ui-drp-ease), width 320ms var(--ui-drp-ease), height 320ms var(--ui-drp-ease), opacity 200ms ease;
}
.ui-drp__body {
  display: grid;
  grid-template-columns: 136px 1fr;
  border-radius: 16px;
  background: var(--ui-drp-card);
  box-shadow: 0 0 0 1px var(--ui-drp-line);
}

/* Presets */
.ui-drp__presets { position: relative; display: flex; flex-direction: column; gap: 1px; padding: 6px; border-right: 1px solid var(--ui-drp-line); }
.ui-drp__preset {
  display: flex;
  align-items: center;
  height: 30px;
  padding: 0 10px;
  border-radius: 8px;
  text-align: left;
  white-space: nowrap;
  color: var(--ui-drp-text);
  position: relative;
  z-index: 1;
  transition: background-color 140ms ease, color 200ms ease;
}
button.ui-drp__preset:hover:not([aria-selected="true"]) { background: var(--ui-drp-hover); color: var(--ui-drp-ink); }
.ui-drp__preset[aria-selected="true"], .ui-drp__preset-custom[data-active] { color: var(--ui-drp-ink); }
.ui-drp__preset-custom { margin-top: auto; color: var(--ui-drp-muted); cursor: default; }

/* Calendars */
.ui-drp__cal { position: relative; padding: 12px 14px 10px; overflow: hidden; }
.ui-drp__nav { position: absolute; top: 8px; left: 10px; right: 10px; z-index: 1; display: flex; justify-content: space-between; pointer-events: none; }
.ui-drp__nav > * { pointer-events: auto; }
.ui-drp__icon-btn { display: grid; place-items: center; width: 28px; height: 28px; border-radius: 8px; color: var(--ui-drp-muted); transition: background-color 140ms ease, color 140ms ease; }
.ui-drp__icon-btn:hover { background: var(--ui-drp-hover); color: var(--ui-drp-ink); }
.ui-drp__months { display: grid; grid-template-columns: repeat(2, auto); justify-content: center; gap: 24px; animation: ui-drp-slide 320ms var(--ui-drp-ease) both; }
.ui-drp__months[data-dir="-1"] { animation-name: ui-drp-slide-back; }
.ui-drp__month-name { height: 22px; margin-bottom: 6px; font-weight: 600; text-align: center; color: var(--ui-drp-ink); }
.ui-drp__grid { display: grid; gap: 2px; }
.ui-drp__weekdays, .ui-drp__week { display: grid; grid-template-columns: repeat(7, 32px); }
.ui-drp__weekday { height: 26px; font-size: 11px; font-weight: 500; line-height: 26px; text-align: center; color: var(--ui-drp-muted); }

/* A day: the band sits behind the number and runs on into its neighbours */
.ui-drp__day { position: relative; display: grid; height: 32px; }
.ui-drp__day::before { content: ""; position: absolute; inset: 2px 0; transition: background-color 220ms ease, border-radius 220ms var(--ui-drp-ease), left 220ms var(--ui-drp-ease), right 220ms var(--ui-drp-ease); }
.ui-drp__day[data-range]::before { background: var(--ui-drp-band); }
.ui-drp__day[data-preview]::before { background: var(--ui-drp-band-preview); }
.ui-drp__day[data-compare]::before { background: var(--ui-drp-compare); }
.ui-drp__day[data-start]::before, .ui-drp__day[data-compare-start]::before, .ui-drp__day[data-row-start]::before { left: 2px; border-top-left-radius: 9px; border-bottom-left-radius: 9px; }
.ui-drp__day[data-end]::before, .ui-drp__day[data-compare-end]::before, .ui-drp__day[data-row-end]::before { right: 2px; border-top-right-radius: 9px; border-bottom-right-radius: 9px; }
.ui-drp__day button {
  position: relative;
  border-radius: 9px;
  font-size: 12.5px;
  font-variant-numeric: tabular-nums;
  color: var(--ui-drp-ink);
  transition: background-color 200ms ease, color 200ms ease, box-shadow 200ms ease, transform 160ms var(--ui-drp-ease);
}
.ui-drp__day button:hover:not(:disabled) { background: var(--ui-drp-hover); }
.ui-drp__day[data-range] button:hover:not(:disabled) { background: transparent; box-shadow: inset 0 0 0 1px var(--ui-drp-accent); }
.ui-drp__day button:active:not(:disabled) { transform: scale(0.94); }
.ui-drp__day button:disabled { color: var(--ui-drp-faint); cursor: default; }
.ui-drp__day button[aria-current="date"]::after { content: ""; position: absolute; left: 50%; bottom: 4px; width: 3px; height: 3px; margin-left: -1.5px; border-radius: 50%; background: currentColor; opacity: 0.55; }
.ui-drp__day[data-start] button, .ui-drp__day[data-end] button { background: var(--ui-drp-accent) !important; color: var(--ui-drp-on-accent); font-weight: 600; box-shadow: none !important; animation: ui-drp-pick 380ms cubic-bezier(0.34, 1.56, 0.64, 1); }
/* While previewing, the end follows the pointer – no pop on every move */
.ui-drp__day[data-preview][data-end] button { animation: none; }
.ui-drp__day[data-compare-start] button, .ui-drp__day[data-compare-end] button { box-shadow: inset 0 0 0 1px var(--ui-drp-compare-edge); }
.ui-drp__day-empty::before { display: none; }

/* Footer */
.ui-drp__foot { display: flex; align-items: flex-end; justify-content: space-between; gap: 14px; padding: 10px 10px 6px 10px; }
.ui-drp__summary { display: grid; gap: 6px; min-width: 0; }
.ui-drp__summary-range { display: flex; align-items: baseline; gap: 8px; color: var(--ui-drp-ink); font-weight: 500; }
.ui-drp__summary-range > span:first-child { animation: ui-drp-in 280ms var(--ui-drp-ease) both; }
.ui-drp__count { font-size: 12px; font-weight: 400; font-variant-numeric: tabular-nums; color: var(--ui-drp-muted); animation: ui-drp-in 280ms var(--ui-drp-ease) both; }
.ui-drp__compare { display: flex; align-items: center; gap: 8px; }
.ui-drp__compare-label { font-size: 12px; color: var(--ui-drp-muted); }
.ui-drp__segments { position: relative; display: inline-flex; padding: 2px; border-radius: 9px; background: var(--ui-drp-card); box-shadow: 0 0 0 1px var(--ui-drp-line); }
.ui-drp__segment { position: relative; z-index: 1; height: 24px; padding: 0 8px; border-radius: 7px; font-size: 12px; white-space: nowrap; color: var(--ui-drp-muted); transition: color 200ms ease; }
.ui-drp__segment:hover { color: var(--ui-drp-ink); }
.ui-drp__segment[aria-checked="true"] { color: var(--ui-drp-ink); }
.ui-drp__segments .ui-drp__pill { border-radius: 7px; }
.ui-drp__fold { display: grid; grid-template-rows: 0fr; opacity: 0; margin-top: -6px; transition: grid-template-rows 300ms var(--ui-drp-ease), opacity 200ms ease, margin-top 300ms var(--ui-drp-ease); }
.ui-drp__fold[data-open] { grid-template-rows: 1fr; opacity: 1; margin-top: 0; }
.ui-drp__fold > div { min-height: 0; overflow: hidden; }
.ui-drp__compare-range { display: flex; align-items: center; gap: 6px; font-size: 12px; color: var(--ui-drp-muted); animation: ui-drp-in 220ms var(--ui-drp-ease) both; }
.ui-drp__compare-range::before { content: ""; width: 14px; height: 8px; border-radius: 3px; background: var(--ui-drp-compare); box-shadow: inset 0 0 0 1px var(--ui-drp-compare-edge); }
.ui-drp__buttons { display: flex; flex: none; gap: 6px; }
.ui-drp__btn { height: 32px; padding: 0 13px; border-radius: 9px; font-weight: 500; color: var(--ui-drp-text); transition: background-color 140ms ease, opacity 140ms ease, transform 140ms ease; }
.ui-drp__btn:not(.ui-drp__btn-primary):hover { background: var(--ui-drp-active); }
.ui-drp__btn-primary { background: var(--ui-drp-ink); color: var(--ui-drp-card); }
.ui-drp__btn-primary:hover { opacity: 0.88; }
.ui-drp__btn-primary:active { transform: scale(0.97); }
.ui-drp__btn-primary:disabled { opacity: 0.35; cursor: default; }

@keyframes ui-drp-open { from { opacity: 0; transform: translateY(-4px) scale(0.98); } to { opacity: 1; transform: none; } }
@keyframes ui-drp-slide { from { opacity: 0; transform: translateX(14px); } to { opacity: 1; transform: none; } }
@keyframes ui-drp-slide-back { from { opacity: 0; transform: translateX(-14px); } to { opacity: 1; transform: none; } }
@keyframes ui-drp-in { from { opacity: 0; transform: translateY(4px); filter: blur(2px); } to { opacity: 1; transform: none; filter: none; } }
@keyframes ui-drp-pick { 0% { transform: scale(0.82); } 60% { transform: scale(1.06); } 100% { transform: scale(1); } }

/* Narrow panel (phones): presets as a scrolling row of chips, one month, stacked footer */
@container (max-width: 600px) {
  .ui-drp__body { grid-template-columns: 1fr; }
  .ui-drp__presets {
    flex-direction: row;
    gap: 6px;
    padding: 10px;
    overflow-x: auto;
    border-right: 0;
    border-bottom: 1px solid var(--ui-drp-line);
    scrollbar-width: none;
  }
  .ui-drp__presets::-webkit-scrollbar { display: none; }
  .ui-drp__preset { flex: none; height: 32px; padding: 0 12px; border-radius: 999px; box-shadow: inset 0 0 0 1px var(--ui-drp-line); }
  .ui-drp__presets .ui-drp__pill { border-radius: 999px; }
  .ui-drp__preset-custom { display: none; }
  .ui-drp__months { grid-template-columns: 1fr; justify-items: center; }
  /* One month: the one the range ends in */
  .ui-drp__month:not([data-second]) { display: none; }
  .ui-drp__foot { flex-direction: column; align-items: stretch; }
  .ui-drp__buttons { justify-content: flex-end; }
  .ui-drp__compare { flex-wrap: wrap; }
}
@container (max-width: 340px) {
  .ui-drp__weekdays, .ui-drp__week { grid-template-columns: repeat(7, 1fr); }
  .ui-drp__cal { padding: 14px 8px 10px; }
  .ui-drp__months { justify-items: stretch; }
}
/* Touch screens: bigger targets */
@media (hover: none) and (pointer: coarse) {
  .ui-drp__day { height: 38px; }
  .ui-drp__weekdays, .ui-drp__week { grid-template-columns: repeat(7, minmax(0, 38px)); }
  .ui-drp__icon-btn { width: 38px; height: 38px; }
  .ui-drp__btn { height: 38px; }
  .ui-drp__segment { height: 30px; }
}
@media (prefers-reduced-motion: reduce) {
  .ui-drp *, .ui-drp *::before, .ui-drp *::after { animation: none !important; transition: none !important; }
}

/* Dark mode: follows a .dark class or data-theme="dark" on any ancestor, e.g. <html> */
:where(.dark, [data-theme="dark"]) .ui-drp {
  --ui-drp-tray: #111113;
  --ui-drp-card: #19191b;
  --ui-drp-line: #2a2a2e;
  --ui-drp-ink: #ededed;
  --ui-drp-text: #c8c8cc;
  --ui-drp-muted: #8b8b92;
  --ui-drp-faint: #4a4a50;
  --ui-drp-hover: #232326;
  --ui-drp-active: #2a2a2e;
  --ui-drp-band: rgba(109, 139, 255, 0.18);
  --ui-drp-band-preview: rgba(109, 139, 255, 0.1);
  --ui-drp-accent: #6d8bff;
  --ui-drp-on-accent: #0d0d10;
  --ui-drp-compare: #26262a;
  --ui-drp-compare-edge: #4a4a50;
  --ui-drp-focus: rgba(255, 255, 255, 0.3);
  --ui-drp-shadow: 0 0 0 1px rgba(255, 255, 255, 0.06), 0 18px 40px -12px rgba(0, 0, 0, 0.6);
}
`;
function DateRangePickerDemo2() {
  return (
    <div className={`drp-demo`}>
      <DateRangePicker defaultOpen={true} />
    </div>
  );
}
const demoStyles =
  ".drp-demo{width:min(100%,652px)}.card__preview .drp-demo{place-content:center;width:auto;display:grid;position:absolute;inset:0}.card__preview .drp-demo .ui-drp{--ui-drp-panel-width:652px;zoom:.4;justify-items:start;display:grid}.card__preview .drp-demo .ui-drp__panel{margin-top:8px;position:relative;top:auto}.stage:has(.drp-demo){align-items:start;height:560px;padding:48px 32px}@media (width<=760px){.stage:has(.drp-demo){height:640px;padding:52px 12px 16px}.drp-demo .ui-drp{--ui-drp-panel-width:100%;display:block}}.card__preview .drp-demo .ui-drpc{--ui-drpc-panel-width:652px;zoom:.4;justify-items:start;display:grid}.card__preview .drp-demo .ui-drpc__panel{margin-top:8px;position:relative;top:auto}@media (width<=760px){.drp-demo .ui-drpc{--ui-drpc-panel-width:100%;display:block}}\n";
function DateRangePickerDemo(props: React.JSX.IntrinsicAttributes) {
  return (
    <>
      <style href="plico-demo-date-range-picker" precedence="default">
        {demoStyles}
      </style>
      <DateRangePickerDemo2 {...props} />
    </>
  );
}
export { DateRangePicker as Component };
export { DateRangePicker };
export { DateRangePickerDemo };
export { DateRangePickerDemo as Demo };
export { defaultPresets };
export default DateRangePicker;

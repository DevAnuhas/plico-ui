"use client";

import * as React from "react";
type CatalogItem = {
  name: string;
  repeat: string;
  price: number;
} & {
  id?: string;
  unit?: string;
  description?: string;
};
export type ScheduleLine = { id: string; name: string } & (
  | { kind: "product"; repeat: string; price: number; timing: string }
  | { kind: "discount"; percent: number }
  | { kind: "minimum"; amount: number }
);
interface SchedulePatch {
  repeat?: string;
  timing?: string;
  price?: number;
  percent?: number;
  amount?: number;
}
interface BillingScheduleCleanProps {
  title?: string;
  phase?: string;
  currency?: string;
  catalog?: CatalogItem[];
  defaultLines?: ScheduleLine[];
  defaultStart?: string;
  onChange?: (schedule: {
    phase: string;
    duration: string;
    lines: ScheduleLine[];
    start: string;
  }) => void;
  className?: string;
}
var valueValue = [
  {
    id: `milestone`,
    label: `Milestone`,
    months: 0,
  },
  {
    id: `1m`,
    label: `1 month`,
    months: 1,
  },
  {
    id: `3m`,
    label: `3 months`,
    months: 3,
  },
  {
    id: `6m`,
    label: `6 months`,
    months: 6,
  },
  {
    id: `12m`,
    label: `12 months`,
    months: 12,
  },
];
var valueValue2 = [
  {
    id: `once`,
    label: `Once`,
    perYear: 0,
  },
  {
    id: `monthly`,
    label: `Monthly`,
    perYear: 12,
  },
  {
    id: `quarterly`,
    label: `Quarterly`,
    perYear: 4,
  },
  {
    id: `yearly`,
    label: `Yearly`,
    perYear: 1,
  },
];
var valueValue3 = [
  {
    name: `Set-up fee`,
    repeat: `once`,
    price: 4999,
  },
  {
    name: `Platform licence`,
    repeat: `monthly`,
    price: 1200,
  },
  {
    name: `Premium support`,
    repeat: `monthly`,
    price: 350,
  },
  {
    name: `Extra seats (10)`,
    repeat: `monthly`,
    price: 240,
  },
  {
    name: `Onboarding workshop`,
    repeat: `once`,
    price: 1500,
  },
];
var valueValue4 = 0;
var valueValue5 = () => `l${++valueValue4}`;
function BillingScheduleClean({
  title = `Create a billing schedule`,
  phase = `Build-out phase`,
  currency = `$`,
  catalog = valueValue3,
  defaultLines = [
    {
      id: `seed-1`,
      kind: `product` as const,
      name: `Set-up fee`,
      repeat: `once`,
      price: 4999,
      timing: `advance`,
    },
  ],
  defaultStart = `2026-01-01`,
  onChange: onChange,
  className: className,
}: BillingScheduleCleanProps) {
  let [S, C] = React.useState<string>(phase),
    [w, T] = React.useState<string>(defaultStart),
    [E, D] = React.useState(`milestone`),
    [O, k] = React.useState(defaultLines),
    [A, j] = React.useState<string | null>(null),
    M = React.useRef<HTMLDivElement | null>(null),
    N = valueValue9(M);
  React.useEffect(() => {
    onChange?.({
      phase: S,
      start: w,
      duration: E,
      lines: O,
    });
  }, [S, w, E, O, onChange]);
  let P = (e: number) =>
      `${currency}${e.toLocaleString(`en-US`, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
    F = (e: string) => {
      let t = new Date(`${e}T12:00:00`);
      return isNaN(t.getTime())
        ? `–`
        : t.toLocaleDateString(`en-GB`, {
            day: `numeric`,
            month: `short`,
            year: `numeric`,
          });
    },
    I = valueValue.find((e) => e.id === E)!,
    L = (() => {
      if (!I.months) return `Milestone`;
      let e = new Date(`${w}T12:00:00`);
      return isNaN(e.getTime())
        ? `–`
        : (e.setMonth(e.getMonth() + I.months),
          e.setDate(e.getDate() - 1),
          F(e.toISOString().slice(0, 10)));
    })(),
    R = (e: string, t: SchedulePatch) =>
      k((n) =>
        n.map((n) =>
          n.id === e
            ? {
                ...n,
                ...t,
              }
            : n,
        ),
      ),
    z = (e: string) => k((t) => t.filter((t) => t.id !== e)),
    B = (e: CatalogItem) => {
      (k((t) => [
        ...t.filter((e) => e.kind === `product`),
        {
          id: valueValue5(),
          kind: `product` as const,
          ...e,
          timing: `advance`,
        },
        ...t.filter((e) => e.kind !== `product`),
      ]),
        j(null));
    },
    V = O.some((e) => e.kind === `discount`),
    H = O.some((e) => e.kind === `minimum`),
    U = O.filter((e) => e.kind === `product`),
    W = O.find((e) => e.kind === `discount`),
    G = O.find((e) => e.kind === `minimum`),
    K = 1 - (W?.percent ?? 0) / 100,
    q = U.filter((e) => e.timing === `advance`).reduce((e, t) => e + t.price, 0) * K,
    J = I.months || 1,
    Y =
      U.reduce((e, t) => {
        let n = valueValue2.find((e) => e.id === t.repeat)!.perYear;
        return e + (n ? t.price * Math.max(1, Math.round((n * J) / 12)) : t.price);
      }, 0) * K,
    X = Math.max(Y, G?.amount ?? 0);
  return (
    <div className={[`ui-bsc`, className].filter(Boolean).join(` `)}>
      <style href={`ui-billing-schedule-clean`} precedence={`default`}>
        {valueValue10}
      </style>
      <div className={`ui-bsc__head`}>
        <p className={`ui-bsc__title`}>{title}</p>
        <div className={`ui-bsc__summary`}>
          <input
            className={`ui-bsc__phase`}
            value={S}
            onChange={(e) => C(e.target.value)}
            aria-label={`Phase name`}
            size={Math.max(6, S.length)}
          />
          <span className={`ui-bsc__dot`} aria-hidden={`true`}>{`·`}</span>
          <span className={`ui-bsc__date`}>{F(w)}</span>
          <svg viewBox={`0 0 24 24`} aria-hidden={`true`}>
            <path d={`M5 12h14m0 0-5-5m5 5-5 5`} />
          </svg>
          <span className={`ui-bsc__end`} key={L}>
            {L}
          </span>
        </div>
      </div>
      <div className={`ui-bsc__fields`}>
        <label className={`ui-bsc__field`}>
          <span className={`ui-bsc__label`}>{`Start date`}</span>
          <span className={`ui-bsc__input`}>
            <input type={`date`} value={w} onChange={(e) => T(e.target.value)} />
            <Iconp
              d={`M7 4v3M17 4v3M4.5 9.5h15M6 6h12a1.5 1.5 0 0 1 1.5 1.5v11A1.5 1.5 0 0 1 18 20H6a1.5 1.5 0 0 1-1.5-1.5v-11A1.5 1.5 0 0 1 6 6Z`}
            />
          </span>
        </label>
        <div className={`ui-bsc__field`}>
          <span className={`ui-bsc__label`} id={`ui-bsc-duration`}>{`Duration`}</span>
          <Iconh
            open={A === `duration`}
            onOpenChange={(e) => j(e ? `duration` : null)}
            label={I.label}
            labelledBy={`ui-bsc-duration`}
          >
            {valueValue.map((e) => (
              <button
                type={`button`}
                role={`option`}
                aria-selected={e.id === E}
                onClick={() => (D(e.id), j(null))}
                key={e.id}
              >
                {e.label}
                {e.id === E && <Iconp d={`m6 12.5 4 4 8-9`} />}
              </button>
            ))}
          </Iconh>
        </div>
      </div>
      <div className={`ui-bsc__table`} role={`table`} aria-label={`Billing lines`}>
        <div className={`ui-bsc__row ui-bsc__row--head`} role={`row`}>
          <span role={`columnheader`}>{`Name`}</span>
          <span role={`columnheader`}>{`Repeats`}</span>
          <span role={`columnheader`} className={`ui-bsc__right`}>{`Price`}</span>
        </div>
        <div className={`ui-bsc__rows-outer`} ref={N}>
          <div ref={M}>
            {O.length === 0 && (
              <p className={`ui-bsc__empty`}>{`No products yet – add one below.`}</p>
            )}
            {O.map((e) => (
              <div className={`ui-bsc__row`} role={`row`} data-kind={e.kind} key={e.id}>
                <span role={`cell`} className={`ui-bsc__name`}>
                  {e.kind !== `product` && (
                    <span className={`ui-bsc__tag`} aria-hidden={`true`}>
                      <Iconp d={e.kind === `discount` ? valueValue7 : valueValue8} />
                    </span>
                  )}
                  <span className={`ui-bsc__name-text`}>{e.name}</span>
                </span>
                <span role={`cell`}>
                  {e.kind === `product` ? (
                    <label className={`ui-bsc__repeat`}>
                      <Iconp d={valueValue6} />
                      <select
                        value={e.repeat}
                        onChange={(t) =>
                          R(e.id, {
                            repeat: t.target.value,
                          })
                        }
                        aria-label={`${e.name} repeats`}
                      >
                        {valueValue2.map((e) => (
                          <option value={e.id} key={e.id}>
                            {e.label}
                          </option>
                        ))}
                      </select>
                    </label>
                  ) : (
                    <span className={`ui-bsc__muted`}>
                      {e.kind === `discount` ? `Whole phase` : `Per phase`}
                    </span>
                  )}
                </span>
                <span role={`cell`} className={`ui-bsc__price`}>
                  <span className={`ui-bsc__price-main`}>
                    {e.kind === `product` && (
                      <>
                        <Iconm
                          value={e.price}
                          prefix={currency}
                          onChange={(t) =>
                            R(e.id, {
                              price: t,
                            })
                          }
                          label={`${e.name} price`}
                        />
                        <span className={`ui-bsc__muted`}>
                          {`/ `}
                          {e.repeat === `once`
                            ? `once`
                            : valueValue2
                                .find((t) => t.id === e.repeat)!
                                .label.toLowerCase()
                                .replace(`ly`, ``)}
                        </span>
                      </>
                    )}
                    {e.kind === `discount` && (
                      <>
                        <Iconm
                          value={e.percent}
                          suffix={`%`}
                          max={100}
                          onChange={(t) =>
                            R(e.id, {
                              percent: t,
                            })
                          }
                          label={`Discount percent`}
                        />
                        <span className={`ui-bsc__muted`}>{`off`}</span>
                      </>
                    )}
                    {e.kind === `minimum` && (
                      <>
                        <Iconm
                          value={e.amount}
                          prefix={currency}
                          onChange={(t) =>
                            R(e.id, {
                              amount: t,
                            })
                          }
                          label={`Minimum commitment`}
                        />
                        <span className={`ui-bsc__muted`}>{`minimum`}</span>
                      </>
                    )}
                    <button
                      type={`button`}
                      className={`ui-bsc__remove`}
                      aria-label={`Remove ${e.name}`}
                      onClick={() => z(e.id)}
                    >
                      <Iconp d={`M7 7l10 10M17 7 7 17`} />
                    </button>
                  </span>
                  {e.kind === `product` && (
                    <select
                      className={`ui-bsc__timing`}
                      value={e.timing}
                      onChange={(t) =>
                        R(e.id, {
                          timing: t.target.value,
                        })
                      }
                      aria-label={`${e.name} billed`}
                    >
                      <option value={`advance`}>{`Billed in advance`}</option>
                      <option value={`arrears`}>{`Billed in arrears`}</option>
                    </select>
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={`ui-bsc__actions`}>
        <Iconh
          open={A === `product`}
          onOpenChange={(e) => j(e ? `product` : null)}
          label={
            <>
              <Iconp d={`M12 5.5v13M5.5 12h13`} />
              {`Add product`}
            </>
          }
          button={true}
          up={true}
        >
          {catalog.map((e) => (
            <button
              type={`button`}
              role={`option`}
              aria-selected={false}
              onClick={() => B(e)}
              key={e.name}
            >
              <span>
                {e.name}
                <small>
                  {P(e.price)}
                  {` · `}
                  {valueValue2.find((t) => t.id === e.repeat)!.label.toLowerCase()}
                </small>
              </span>
            </button>
          ))}
        </Iconh>
        <span className={`ui-bsc__spacer`} />
        <button
          type={`button`}
          className={`ui-bsc__btn`}
          disabled={V}
          onClick={() =>
            k((e) => [
              ...e,
              {
                id: valueValue5(),
                kind: `discount` as const,
                name: `Discount`,
                percent: 10,
              },
            ])
          }
        >
          <Iconp d={valueValue7} />
          {`Add discount`}
        </button>
        <button
          type={`button`}
          className={`ui-bsc__btn`}
          disabled={H}
          onClick={() =>
            k((e) => [
              ...e,
              {
                id: valueValue5(),
                kind: `minimum` as const,
                name: `Minimum commitment`,
                amount: 1e4,
              },
            ])
          }
        >
          <Iconp d={valueValue8} />
          {`Add minimum`}
        </button>
      </div>
      <div className={`ui-bsc__totals`} aria-live={`polite`}>
        <span className={`ui-bsc__total`}>
          <span className={`ui-bsc__total-label`}>{`First invoice`}</span>
          <b>{P(q)}</b>
        </span>
        <span className={`ui-bsc__total ui-bsc__total--phase`}>
          {G && X === G.amount && Y < G.amount && <em>{`Minimum applies`}</em>}
          <span className={`ui-bsc__total-label`}>
            {I.months ? `Phase total (${I.label})` : `Phase total`}
          </span>
          <b>{P(X)}</b>
        </span>
      </div>
    </div>
  );
}
var valueValue6 = `M17 3.5 19.5 6 17 8.5M19.5 6H9a5 5 0 0 0-5 5M7 20.5 4.5 18 7 15.5M4.5 18H15a5 5 0 0 0 5-5`;
var valueValue7 = `M9 15 15 9M9.5 9.5h.01M14.5 14.5h.01M12 3l2.1 1.6 2.6-.2.9 2.5 2.3 1.2-.4 2.6L21 12.6l-1.5 2.1.4 2.6-2.3 1.2-.9 2.5-2.6-.2L12 21.4l-2.1-1.6-2.6.2-.9-2.5L4.1 16.3l.4-2.6L3 12l1.5-2.1-.4-2.6 2.3-1.2.9-2.5 2.6.2Z`;
var valueValue8 = `M5 19.5h14M7 15.5h10M9 11.5h6M10 7.5h4M12 4v1`;
var Iconp = ({ d: d }: { d: string }) => (
  <svg viewBox={`0 0 24 24`} aria-hidden={`true`}>
    <path d={d} />
  </svg>
);
function Iconm({
  value: value,
  onChange: onChange,
  prefix: prefix,
  suffix: suffix,
  max: max,
  label: label,
}: {
  value: number;
  onChange: (value: number) => void;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  max?: number;
  label: string;
}) {
  let [c, l] = React.useState<string | null>(null),
    u =
      c ??
      value.toLocaleString(`en-US`, {
        minimumFractionDigits: suffix ? 0 : 2,
        maximumFractionDigits: 2,
      });
  return (
    <span className={`ui-bsc__num`}>
      {prefix}
      <input
        value={u}
        inputMode={`decimal`}
        aria-label={label}
        size={Math.max(2, u.length)}
        onFocus={() => l(String(value))}
        onChange={(e) => l(e.target.value.replace(/[^\d.]/g, ``))}
        onBlur={() => {
          (onChange(Math.max(0, Math.min(max ?? 1 / 0, parseFloat(c ?? ``) || 0))), l(null));
        }}
        onKeyDown={(e) => e.key === `Enter` && e.currentTarget.blur()}
      />
      {suffix}
    </span>
  );
}
function Iconh({
  open: open,
  onOpenChange: onOpenChange,
  label: label,
  labelledBy: labelledBy,
  accent: accent,
  button: button,
  up: up,
  children: children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  label: React.ReactNode;
  labelledBy?: string;
  accent?: boolean;
  button?: boolean;
  up?: boolean;
  children?: React.ReactNode;
}) {
  let u = React.useRef<HTMLDivElement | null>(null);
  return (
    React.useEffect(() => {
      if (!open) return;
      let n = (e: PointerEvent) =>
          !u.current?.contains(e.target as Node | null) && onOpenChange(false),
        r = (e: { key: string }) => e.key === `Escape` && onOpenChange(false);
      return (
        document.addEventListener(`pointerdown`, n),
        document.addEventListener(`keydown`, r),
        () => {
          (document.removeEventListener(`pointerdown`, n),
            document.removeEventListener(`keydown`, r));
        }
      );
    }, [open, onOpenChange]),
    (
      <div className={`ui-bsc__dd`} ref={u}>
        <button
          type={`button`}
          className={
            button
              ? `ui-bsc__btn`
              : accent
                ? `ui-bsc__select ui-bsc__select--accent`
                : `ui-bsc__select`
          }
          aria-haspopup={`listbox`}
          aria-expanded={open}
          aria-labelledby={labelledBy}
          onClick={() => onOpenChange(!open)}
        >
          <span className={`ui-bsc__select-label`}>{label}</span>
          {!button && <Iconp d={`m7 10 5 5 5-5`} />}
        </button>
        {open && (
          <div className={`ui-bsc__menu`} role={`listbox`} data-up={up ? `` : void 0}>
            {children}
          </div>
        )}
      </div>
    )
  );
}
function valueValue9(e: React.RefObject<HTMLDivElement | null>) {
  let t = React.useRef<HTMLDivElement | null>(null);
  return (
    React.useLayoutEffect(() => {
      let n = t.current,
        r = e.current;
      if (!n || !r) return;
      let i = () => {
        n.style.height = `${r.offsetHeight}px`;
      };
      i();
      let a = new ResizeObserver(i);
      a.observe(r);
      let o = requestAnimationFrame(() => n.setAttribute(`data-smooth`, ``));
      return () => {
        (a.disconnect(), cancelAnimationFrame(o));
      };
    }, [e]),
    t
  );
}
var valueValue10 = `
/* Colors and motion as variables – override them on .ui-bsc */
.ui-bsc {
  --ui-bsc-card: #ffffff;
  --ui-bsc-ink: rgba(0, 0, 0, 0.88);
  --ui-bsc-strong: #000000;
  --ui-bsc-text: rgba(0, 0, 0, 0.61);
  --ui-bsc-muted: rgba(0, 0, 0, 0.45);
  --ui-bsc-faint: rgba(0, 0, 0, 0.27);
  --ui-bsc-icon: rgba(0, 0, 0, 0.447);
  --ui-bsc-line: rgba(0, 0, 0, 0.06);
  --ui-bsc-wash: rgba(0, 0, 0, 0.03);
  --ui-bsc-fill: rgba(0, 0, 0, 0.06);
  --ui-bsc-accent: rgba(0, 96, 226, 0.765);
  --ui-bsc-pick: rgba(0, 96, 226, 0.05);
  --ui-bsc-pick-edge: rgba(0, 96, 226, 0.35);
  --ui-bsc-focus: rgba(0, 96, 226, 0.35);
  /* Strokes are shadows: a 0.5px hairline plus a soft lift */
  --ui-bsc-shadow: 0 0 0 0.5px rgba(0, 0, 0, 0.06), 0 1px 1px -1px rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --ui-bsc-shadow-hover: 0 0 0 0.5px rgba(0, 0, 0, 0.12), 0 1px 1px -1px rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --ui-bsc-shadow-pop: 0 0 0 0.5px rgba(0, 0, 0, 0.08), 0 12px 28px -10px rgba(0, 0, 0, 0.16), 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --ui-bsc-ease: cubic-bezier(0.22, 1, 0.36, 1);
  position: relative;
  box-sizing: border-box;
  container-type: inline-size;
  width: 100%;
  max-width: 560px;
  border-radius: 10px;
  background: var(--ui-bsc-card);
  box-shadow: var(--ui-bsc-shadow);
  font-family: "Inter", "InterVariable", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  font-size: 13px;
  line-height: 20px;
  font-weight: 400;
  color: var(--ui-bsc-ink);
  -webkit-font-smoothing: antialiased;
}
.ui-bsc *, .ui-bsc *::before, .ui-bsc *::after { box-sizing: border-box; }
:where(.ui-bsc) button, :where(.ui-bsc) select, :where(.ui-bsc) input { margin: 0; padding: 0; border: 0; background: none; font: inherit; color: inherit; }
:where(.ui-bsc) button { cursor: pointer; -webkit-tap-highlight-color: transparent; }
.ui-bsc button:focus-visible, .ui-bsc select:focus-visible { outline: 2px solid var(--ui-bsc-focus); outline-offset: 1px; }
/* 16px icons with thin ~1.1px lines */
.ui-bsc svg { display: block; width: 16px; height: 16px; flex: none; fill: none; stroke: currentColor; stroke-width: 1.65; stroke-linecap: round; stroke-linejoin: round; }

/* Head: title and the phase summary */
.ui-bsc__head { display: grid; gap: 2px; padding: 14px 14px 12px; }
.ui-bsc__title { margin: 0; font-size: 15px; line-height: 24px; font-weight: 500; color: var(--ui-bsc-strong); }
.ui-bsc__summary { display: flex; align-items: center; gap: 6px; min-width: 0; color: var(--ui-bsc-text); white-space: nowrap; }
.ui-bsc__phase {
  min-width: 0;
  max-width: 100%;
  margin-left: -4px;
  padding: 0 4px;
  border-radius: 5px;
  font-weight: 500;
  color: var(--ui-bsc-ink);
  outline: none;
  text-overflow: ellipsis;
  /* Hugs its text where supported – the size attribute is the fallback */
  field-sizing: content;
  transition: background-color 120ms ease, box-shadow 120ms ease;
}
.ui-bsc__phase:hover { background: var(--ui-bsc-wash); }
.ui-bsc__phase:focus { background: var(--ui-bsc-pick); box-shadow: inset 0 0 0 0.5px var(--ui-bsc-pick-edge); }
.ui-bsc__dot { color: var(--ui-bsc-faint); }
.ui-bsc__summary svg { width: 14px; height: 14px; color: var(--ui-bsc-faint); }
.ui-bsc__end { animation: ui-bsc-fade 260ms ease both; }

/* Fields */
.ui-bsc__fields { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; padding: 0 14px 14px; }
.ui-bsc__field { display: grid; gap: 6px; min-width: 0; }
.ui-bsc__label { font-size: 12px; line-height: 16px; color: var(--ui-bsc-text); }
.ui-bsc__input,
.ui-bsc__select {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  width: 100%;
  height: 32px;
  padding: 0 8px 0 10px;
  border-radius: 8px;
  background: var(--ui-bsc-card);
  box-shadow: var(--ui-bsc-shadow);
  color: var(--ui-bsc-ink);
  text-align: left;
  transition: box-shadow 140ms ease;
}
.ui-bsc__select:hover, .ui-bsc__input:hover { box-shadow: var(--ui-bsc-shadow-hover); }
.ui-bsc__input input {
  flex: 1;
  min-width: 0;
  height: 100%;
  outline: none;
  font-variant-numeric: tabular-nums;
}
/* The native picker opens from the whole field; its own icon is hidden behind ours */
.ui-bsc__input input::-webkit-calendar-picker-indicator { position: absolute; inset: 0; width: auto; height: auto; opacity: 0; cursor: pointer; }
.ui-bsc__input svg { color: var(--ui-bsc-icon); pointer-events: none; }
.ui-bsc__input:focus-within { outline: 2px solid var(--ui-bsc-focus); outline-offset: 1px; }
.ui-bsc__select svg { color: var(--ui-bsc-icon); transition: transform 220ms var(--ui-bsc-ease); }
.ui-bsc__select[aria-expanded="true"] svg { transform: rotate(180deg); }
.ui-bsc__select--accent { background: var(--ui-bsc-pick); box-shadow: inset 0 0 0 0.5px var(--ui-bsc-pick-edge); }

/* Dropdowns: white popover, rows with a gray fill on hover */
.ui-bsc__dd { position: relative; }
.ui-bsc__menu {
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  right: 0;
  z-index: 5;
  display: grid;
  gap: 1px;
  min-width: 220px;
  padding: 4px;
  border-radius: 10px;
  background: var(--ui-bsc-card);
  box-shadow: var(--ui-bsc-shadow-pop);
  animation: ui-bsc-menu 200ms var(--ui-bsc-ease) both;
  transform-origin: top;
}
.ui-bsc__menu[data-up] { top: auto; bottom: calc(100% + 6px); right: auto; transform-origin: bottom left; }
.ui-bsc__menu button {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  min-height: 28px;
  padding: 4px 8px;
  border-radius: 6px;
  text-align: left;
  color: var(--ui-bsc-ink);
  transition: background-color 90ms ease-out;
}
.ui-bsc__menu button:hover { background: var(--ui-bsc-fill); }
.ui-bsc__menu button svg { color: var(--ui-bsc-accent); }
.ui-bsc__menu small { display: block; font-size: 12px; line-height: 16px; color: var(--ui-bsc-muted); }

/* Table: hairline rows from edge to edge */
.ui-bsc__table { border-top: 0.5px solid var(--ui-bsc-line); }
.ui-bsc__row {
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr) 216px;
  align-items: center;
  gap: 12px;
  min-height: 48px;
  padding: 6px 10px 6px 14px;
  border-bottom: 0.5px solid var(--ui-bsc-line);
  transition: background-color 120ms ease;
  animation: ui-bsc-row 320ms var(--ui-bsc-ease) both;
}
.ui-bsc__rows-outer .ui-bsc__row:hover { background: var(--ui-bsc-wash); }
.ui-bsc__row--head {
  min-height: 32px;
  padding-top: 8px;
  padding-bottom: 8px;
  font-size: 10px;
  line-height: 16px;
  font-weight: 500;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  color: var(--ui-bsc-muted);
  animation: none;
}
.ui-bsc__right { text-align: right; padding-right: 36px; }
.ui-bsc__rows-outer { overflow: hidden; }
.ui-bsc__rows-outer[data-smooth] { transition: height 320ms var(--ui-bsc-ease); }
.ui-bsc__empty { margin: 0; padding: 14px; border-bottom: 0.5px solid var(--ui-bsc-line); color: var(--ui-bsc-muted); }
.ui-bsc__name { display: flex; align-items: center; gap: 8px; min-width: 0; font-weight: 500; color: var(--ui-bsc-ink); }
.ui-bsc__name-text { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.ui-bsc__tag { display: grid; place-items: center; width: 20px; height: 20px; flex: none; border-radius: 5px; background: var(--ui-bsc-fill); color: var(--ui-bsc-icon); }
.ui-bsc__tag svg { width: 14px; height: 14px; }
.ui-bsc__muted { font-size: 12px; line-height: 16px; color: var(--ui-bsc-muted); white-space: nowrap; }
.ui-bsc__repeat { position: relative; display: inline-flex; align-items: center; gap: 4px; color: var(--ui-bsc-icon); }
.ui-bsc__repeat select { color: var(--ui-bsc-text); }
.ui-bsc__repeat select,
.ui-bsc__timing {
  height: 24px;
  padding: 0 6px;
  border-radius: 6px;
  appearance: none;
  cursor: pointer;
  transition: background-color 120ms ease, color 120ms ease;
}
.ui-bsc__repeat select:hover, .ui-bsc__timing:hover { background: var(--ui-bsc-fill); color: var(--ui-bsc-ink); }
/* Under the amount, right-aligned with it (the remove button's slot stays free) */
.ui-bsc__timing { height: 20px; margin: 0 30px 0 0; padding: 0 4px; font-size: 12px; line-height: 16px; color: var(--ui-bsc-muted); text-align: right; }
.ui-bsc__price { display: grid; justify-items: end; min-width: 0; }
.ui-bsc__price-main { display: flex; align-items: center; gap: 4px; white-space: nowrap; }
.ui-bsc__num { display: inline-flex; align-items: center; font-weight: 500; color: var(--ui-bsc-ink); font-variant-numeric: tabular-nums; }
.ui-bsc__num input {
  height: 24px;
  padding: 0 1px;
  border-radius: 5px;
  outline: none;
  font-weight: 500;
  text-align: right;
  font-variant-numeric: tabular-nums;
  field-sizing: content;
  min-width: 2ch;
  transition: background-color 120ms ease, box-shadow 120ms ease;
}
.ui-bsc__num input:hover { background: var(--ui-bsc-fill); }
.ui-bsc__num input:focus { background: var(--ui-bsc-pick); box-shadow: inset 0 0 0 0.5px var(--ui-bsc-pick-edge); }
/* Ghost icon button – shows on row hover */
.ui-bsc__remove {
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
  margin-left: 2px;
  border-radius: 6px;
  color: var(--ui-bsc-icon);
  opacity: 0;
  transition: opacity 120ms ease, background-color 120ms ease, color 120ms ease;
}
.ui-bsc__row:hover .ui-bsc__remove, .ui-bsc__remove:focus-visible { opacity: 1; }
.ui-bsc__remove:hover { background: var(--ui-bsc-wash); color: var(--ui-bsc-ink); }

/* Actions: secondary buttons right under the lines */
.ui-bsc__actions { display: flex; align-items: center; gap: 8px; padding: 10px 14px 12px; }
.ui-bsc__spacer { flex: 1; }
.ui-bsc__btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 28px;
  padding: 0 10px 0 8px;
  border-radius: 6px;
  background: var(--ui-bsc-card);
  box-shadow: var(--ui-bsc-shadow);
  font-weight: 500;
  color: var(--ui-bsc-strong);
  white-space: nowrap;
  transition: box-shadow 140ms ease, opacity 200ms ease, transform 140ms ease;
}
.ui-bsc__btn:hover:not(:disabled) { box-shadow: var(--ui-bsc-shadow-hover); }
.ui-bsc__btn:active:not(:disabled) { transform: scale(0.97); }
.ui-bsc__btn:disabled { opacity: 0.4; cursor: default; }
.ui-bsc__btn svg { color: var(--ui-bsc-icon); }
.ui-bsc__select-label { display: inline-flex; align-items: center; gap: 6px; min-width: 0; }

/* Totals: the last row under a hairline */
.ui-bsc__totals { display: flex; align-items: center; justify-content: space-between; gap: 6px 16px; flex-wrap: wrap; padding: 10px 14px; border-top: 0.5px solid var(--ui-bsc-line); }
.ui-bsc__total { display: inline-flex; align-items: baseline; gap: 8px; min-width: 0; white-space: nowrap; }
.ui-bsc__total-label { font-size: 12px; line-height: 16px; color: var(--ui-bsc-muted); }
.ui-bsc__total b { font-size: 15px; line-height: 24px; font-weight: 500; color: var(--ui-bsc-strong); font-variant-numeric: tabular-nums; }
.ui-bsc__total em {
  align-self: center;
  padding: 2px 6px;
  border-radius: 5px;
  background: var(--ui-bsc-pick);
  font-size: 11px;
  line-height: 16px;
  font-style: normal;
  font-weight: 500;
  color: var(--ui-bsc-accent);
  animation: ui-bsc-fade 220ms ease both;
}

@keyframes ui-bsc-fade { from { opacity: 0; } }
@keyframes ui-bsc-row { from { opacity: 0; transform: translateY(-4px); } }
@keyframes ui-bsc-menu { from { opacity: 0; transform: scale(0.97) translateY(-4px); } }

/* Narrow card (phones): fields stack, each line stacks, buttons wrap */
@container (max-width: 500px) {
  .ui-bsc__fields { grid-template-columns: 1fr; }
  .ui-bsc__summary { flex-wrap: wrap; row-gap: 0; }
  .ui-bsc__row { grid-template-columns: minmax(0, 1fr); gap: 2px; padding: 10px 8px 10px 14px; }
  .ui-bsc__row > :nth-child(2) { display: none; }
  .ui-bsc__row--head { display: none; }
  .ui-bsc__price { justify-items: stretch; }
  .ui-bsc__price-main { justify-content: flex-start; }
  .ui-bsc__num { margin-left: -2px; }
  .ui-bsc__timing { justify-self: start; margin: 0 0 0 -4px; }
  .ui-bsc__remove { opacity: 1; margin-left: auto; }
  .ui-bsc__actions { flex-wrap: wrap; }
  .ui-bsc__spacer { display: none; }
  .ui-bsc__totals { flex-direction: column; align-items: stretch; }
  .ui-bsc__total { justify-content: space-between; }
  .ui-bsc__total--phase .ui-bsc__total-label { margin-right: auto; order: -1; }
}
/* Touch screens: bigger targets, the remove button always visible */
@media (hover: none) and (pointer: coarse) {
  .ui-bsc__input, .ui-bsc__select { height: 40px; }
  .ui-bsc__btn { height: 36px; padding: 0 12px 0 10px; }
  .ui-bsc__menu button { min-height: 40px; }
  .ui-bsc__remove { width: 36px; height: 36px; opacity: 1; }
  .ui-bsc__repeat select { height: 32px; }
  .ui-bsc__num input { height: 32px; }
}
@media (prefers-reduced-motion: reduce) {
  .ui-bsc__rows-outer[data-smooth] { transition: none; }
  .ui-bsc__row, .ui-bsc__menu, .ui-bsc__end, .ui-bsc__total em { animation: none; }
}

/* Text fields: no focus box while typing – also against global :focus-visible rules of the host page */
.ui-bsc input:not([type="checkbox"]):not([type="radio"]):focus-visible,
.ui-bsc textarea:focus-visible,
.ui-bsc [contenteditable]:focus-visible { outline: none; }

/* Dark mode: follows a .dark class or data-theme="dark" on any ancestor, e.g. <html> */
:where(.dark, [data-theme="dark"]) .ui-bsc {
  --ui-bsc-card: #1c1c1e;
  --ui-bsc-ink: rgba(255, 255, 255, 0.9);
  --ui-bsc-strong: #ffffff;
  --ui-bsc-text: rgba(255, 255, 255, 0.62);
  --ui-bsc-muted: rgba(255, 255, 255, 0.46);
  --ui-bsc-faint: rgba(255, 255, 255, 0.3);
  --ui-bsc-icon: rgba(255, 255, 255, 0.5);
  --ui-bsc-line: rgba(255, 255, 255, 0.08);
  --ui-bsc-wash: rgba(255, 255, 255, 0.04);
  --ui-bsc-fill: rgba(255, 255, 255, 0.08);
  --ui-bsc-accent: #4d8dff;
  --ui-bsc-pick: rgba(77, 141, 255, 0.14);
  --ui-bsc-pick-edge: rgba(77, 141, 255, 0.5);
  --ui-bsc-focus: rgba(77, 141, 255, 0.5);
  --ui-bsc-shadow: 0 0 0 0.5px rgba(255, 255, 255, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.4);
  --ui-bsc-shadow-hover: 0 0 0 0.5px rgba(255, 255, 255, 0.18), 0 1px 2px 0 rgba(0, 0, 0, 0.4);
  --ui-bsc-shadow-pop: 0 0 0 0.5px rgba(255, 255, 255, 0.1), 0 12px 28px -10px rgba(0, 0, 0, 0.6), 0 1px 2px 0 rgba(0, 0, 0, 0.4);
}
:where(.dark, [data-theme="dark"]) .ui-bsc__input input { color-scheme: dark; }
:where(.dark, [data-theme="dark"]) .ui-bsc select option { background: #1c1c1e; color: rgba(255, 255, 255, 0.9); }
`;
function BillingScheduleCleanDemo2() {
  return (
    <div className={`billing-schedule-demo`}>
      <BillingScheduleClean />
    </div>
  );
}
const demoStyles =
  ".billing-schedule-demo{grid-template-columns:minmax(0,1fr);place-items:center;width:100%;display:grid}.card__preview .billing-schedule-demo{grid-template-columns:auto;place-content:center;position:absolute;inset:0}.card__preview .billing-schedule-demo .ui-bs{zoom:.4;width:560px}.stage:has(.billing-schedule-demo){height:auto;min-height:520px}@media (width<=760px){.stage:has(.billing-schedule-demo){align-items:start;padding:120px 12px 16px}}.card__preview .billing-schedule-demo:has(.ui-bsc){inset:40px 0 0}.card__preview .billing-schedule-demo .ui-bsc{zoom:.46;width:560px;max-width:none}@media (width>=761px){.stage .billing-schedule-demo .ui-bsc{zoom:1.08}}\n";
function BillingScheduleCleanDemo(props: React.JSX.IntrinsicAttributes) {
  return (
    <>
      <style href="plico-demo-billing-schedule-clean" precedence="default">
        {demoStyles}
      </style>
      <BillingScheduleCleanDemo2 {...props} />
    </>
  );
}
export { BillingScheduleClean };
export { BillingScheduleCleanDemo };
export { BillingScheduleClean as Component };
export { BillingScheduleCleanDemo as Demo };
export default BillingScheduleClean;

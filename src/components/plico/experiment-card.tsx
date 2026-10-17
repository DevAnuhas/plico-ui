"use client";

import * as React from "react";
type ExperimentVariant = {
  id: string;
  key: string;
  name: string;
  control?: boolean;
  visitors?: number;
  values: Record<string, number>;
  confidence?: Record<string, number>;
  label?: string;
  color?: string;
  description?: string;
  conversions?: number;
  revenue?: number;
  weight?: number;
};
type ExperimentMetric = {
  id: string;
  label: string;
  format?: (e: number) => string;
  lowerIsBetter?: boolean;
} & {
  higherIsBetter?: boolean;
  unit?: string;
};
type ExperimentTone = "red" | "amber" | "green" | "blue" | "violet" | "gray";
interface ExperimentCardProps {
  title?: string;
  variants: ExperimentVariant[];
  metrics: ExperimentMetric[];
  metric?: string;
  defaultMetric?: string;
  onMetricChange?: (id: string) => void;
  winner?: string | null;
  defaultWinner?: string | null;
  onWinnerChange?: (id: string | null) => void;
  status?: {
    label: string;
    tone?: ExperimentTone;
  };
  note?: string;
  action?: {
    label: string | ((variant: ExperimentVariant) => string);
    onClick: (variant: ExperimentVariant) => void;
  };
  hint?: React.ReactNode;
  trigger?: "hover" | "click";
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}
var valueValue = [`var(--ui-xc-c1)`, `var(--ui-xc-c2)`, `var(--ui-xc-c3)`, `var(--ui-xc-c4)`];
var valueValue2 = (e: number | bigint) =>
  new Intl.NumberFormat(`en-US`, {
    maximumFractionDigits: 1,
  }).format(e);
var valueValue3 = (e: number | bigint) =>
  new Intl.NumberFormat(`en-US`, {
    maximumFractionDigits: 0,
  }).format(e);
var valueValue4 = (e: number) => 1 - (1 - e) ** 4;
var valueValue5 = () =>
  typeof window < `u` && window.matchMedia(`(prefers-reduced-motion: reduce)`).matches;
function valueValue6(e: Record<string, number>, t: number) {
  let [r, i] = React.useState(e),
    a = React.useRef(e),
    o = JSON.stringify(e);
  return (
    React.useEffect(() => {
      let e: Record<string, number> = JSON.parse(o),
        n = {
          ...a.current,
        };
      if (valueValue5() || Object.keys(e).every((t) => n[t] === e[t])) {
        ((a.current = e), i(e));
        return;
      }
      let r = performance.now(),
        l = 0,
        u = (o: number) => {
          let c = Math.min(1, (o - r) / t),
            d = valueValue4(c),
            f: Record<string, number> = {};
          for (let t in e) f[t] = (n[t] ?? e[t]) + (e[t] - (n[t] ?? e[t])) * d;
          ((a.current = f), i(f), c < 1 && (l = requestAnimationFrame(u)));
        };
      return ((l = requestAnimationFrame(u)), () => cancelAnimationFrame(l));
    }, [o, t]),
    r
  );
}
var valueValue7: React.SVGAttributes<SVGElement> = {
  stroke: `currentColor`,
  strokeWidth: 1.5,
  strokeLinecap: `round`,
  strokeLinejoin: `round`,
};
var Icond = () => (
  <svg width={`10`} height={`10`} viewBox={`0 0 10 10`} fill={`none`} aria-hidden={`true`}>
    <path d={`m2.2 5.2 1.9 1.9 3.7-4.1`} {...valueValue7} strokeWidth={1.7} />
  </svg>
);
var Iconf = () => (
  <svg width={`12`} height={`12`} viewBox={`0 0 12 12`} fill={`none`} aria-hidden={`true`}>
    <path d={`M2.5 6h7M6.5 3l3 3-3 3`} {...valueValue7} strokeWidth={1.4} />
  </svg>
);
var Iconee = ({ down: down }: { down: boolean }) => (
  <svg
    width={`10`}
    height={`10`}
    viewBox={`0 0 10 10`}
    fill={`none`}
    aria-hidden={`true`}
    style={
      down
        ? {
            transform: `scaleY(-1)`,
          }
        : void 0
    }
  >
    <path d={`M1.5 7 4 4.5l1.6 1.6L8.5 3M6.2 3h2.3v2.3`} {...valueValue7} strokeWidth={1.4} />
  </svg>
);
var Iconte = () => (
  <svg width={`12`} height={`12`} viewBox={`0 0 12 12`} fill={`none`} aria-hidden={`true`}>
    <circle cx={`6`} cy={`6`} r={`4.25`} {...valueValue7} />
    <circle cx={`6`} cy={`6`} r={`1.5`} fill={`currentColor`} />
  </svg>
);
function ExperimentCard({
  title: title,
  variants: variants,
  metrics: metrics,
  metric: metric,
  defaultMetric: defaultMetric,
  onMetricChange: onMetricChange,
  winner: winner,
  defaultWinner = null,
  onWinnerChange: onWinnerChange,
  status: status,
  note: note,
  action: action,
  hint: hint,
  trigger = `hover`,
  open: open,
  defaultOpen = false,
  onOpenChange: onOpenChange,
  className: className,
}: ExperimentCardProps) {
  let x = React.useId(),
    [ce, S] = React.useState(defaultOpen),
    C = open ?? ce,
    [le, ue] = React.useState(defaultMetric ?? metrics[0]?.id),
    w = metrics.find((e) => e.id === (metric ?? le)) ?? metrics[0],
    [de, fe] = React.useState(defaultWinner),
    T = winner === void 0 ? de : winner,
    [E, D] = React.useState<string | null>(null),
    O = React.useRef<HTMLDivElement | null>(null),
    k = w?.format ?? valueValue2,
    pe = !!w?.lowerIsBetter,
    A = (e: ExperimentVariant) => e.values[w?.id ?? ``] ?? 0,
    j = variants.find((e) => e.control) ?? variants[0],
    M = j ? A(j) : 0,
    N = (e: ExperimentVariant) => (M ? ((A(e) - M) / Math.abs(M)) * 100 : 0),
    P = (e: ExperimentVariant) => N(e) * (pe ? -1 : 1),
    F = (e: number) => `${e >= 0 ? `+` : `−`}${Math.abs(e).toFixed(1)}%`,
    I: ExperimentVariant | undefined = variants.reduce<ExperimentVariant | undefined>(
      (e, t) => (!e || P(t) > P(e) ? t : e),
      void 0,
    ),
    L = Math.max(...variants.map(A), 1e-4),
    R = Math.min(...variants.map(A)),
    z = (e: ExperimentVariant) => (L > R ? 0.38 + 0.62 * ((A(e) - R) / (L - R)) : 0.7),
    B = (e: ExperimentVariant) =>
      e.color ??
      (e === j
        ? `var(--ui-xc-c0)`
        : valueValue[variants.filter((e) => e !== j).indexOf(e) % valueValue.length]),
    me = valueValue6(Object.fromEntries(variants.map((e) => [e.id, A(e)])), 620),
    V = React.useRef(0),
    H = (e: boolean) => {
      (window.clearTimeout(V.current), e !== C && (e || D(null), S(e), onOpenChange?.(e)));
    },
    U = (e: boolean, t: number | undefined) => {
      (window.clearTimeout(V.current), (V.current = window.setTimeout(() => H(e), t)));
    };
  React.useEffect(() => () => window.clearTimeout(V.current), []);
  let W = trigger === `hover`,
    he: React.PointerEventHandler<HTMLDivElement> = (e) => {
      W && e.pointerType === `mouse` && U(true, 90);
    },
    ge: React.PointerEventHandler<HTMLDivElement> = (e) => {
      W && e.pointerType === `mouse` && U(false, 220);
    };
  React.useEffect(() => {
    if (!C) return;
    let e = (e: PointerEvent) => {
      O.current?.contains(e.target as Node | null) || H(false);
    };
    return (
      document.addEventListener(`pointerdown`, e),
      () => document.removeEventListener(`pointerdown`, e)
    );
  });
  let _e: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
      e.key === `Escape` &&
        C &&
        (e.stopPropagation(),
        H(false),
        O.current?.querySelector<HTMLElement>(`.ui-xc__toggle`)?.focus({
          preventScroll: true,
        }));
    },
    G = React.useRef<HTMLDivElement | null>(null),
    [K, ve] = React.useState<{
      left: number;
      width: number;
    } | null>(null);
  React.useLayoutEffect(() => {
    let e = G.current?.querySelector<HTMLElement>(`[aria-checked="true"]`);
    e &&
      ve({
        left: e.offsetLeft,
        width: e.offsetWidth,
      });
  }, [w?.id, metrics.length, C]);
  let q = (e: string) => {
      (ue(e), onMetricChange?.(e));
    },
    ye: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
      let t = metrics.findIndex((e) => e.id === w?.id),
        n =
          e.key === `ArrowRight`
            ? t + 1
            : e.key === `ArrowLeft`
              ? t - 1
              : e.key === `Home`
                ? 0
                : e.key === `End`
                  ? metrics.length - 1
                  : null;
      if (n === null) return;
      e.preventDefault();
      let r = metrics[(n + metrics.length) % metrics.length];
      (q(r.id),
        requestAnimationFrame(() =>
          G.current?.querySelector<HTMLElement>(`[aria-checked="true"]`)?.focus(),
        ));
    },
    J = (e: string) => {
      let t = T === e ? null : e;
      (fe(t), onWinnerChange?.(t));
    },
    Y = I && I !== j && P(I) > 0 ? I : null,
    X = variants.find((e) => e.id === T) ?? null,
    Z = variants.find((e) => e.id === E) ?? null,
    Q = hint ?? (X ? null : `Pick a winner`),
    $ = `rest`;
  if (Z) {
    let e = Z.confidence?.[w?.id ?? ``];
    ((Q = (
      <>
        <b>{Z.key}</b>
        {Z.visitors !== void 0 && (
          <>
            {` · `}
            {valueValue3(Z.visitors)}
            {` visitors`}
          </>
        )}
        {Z === j ? (
          <>{` · baseline`}</>
        ) : (
          e !== void 0 && (
            <>
              {` · `}
              {valueValue3(e)}
              {`% confidence`}
            </>
          )
        )}
      </>
    )),
      ($ = `hot-${Z.id}-${w?.id}`));
  } else
    X &&
      ((Q = (
        <>
          <b>{X.name}</b>
          {` picked`}
        </>
      )),
      ($ = `picked-${X.id}`));
  let be =
    X && action ? (typeof action.label == `function` ? action.label(X) : action.label) : null;
  return (
    <div
      ref={O}
      className={[`ui-xc`, className].filter(Boolean).join(` `)}
      data-open={C ? `` : void 0}
      onPointerEnter={he}
      onPointerLeave={ge}
      onKeyDown={_e}
    >
      <style href={`ui-experiment-card`} precedence={`default`}>
        {valueValue8}
      </style>
      <div className={`ui-xc__card`}>
        <div className={`ui-xc__head`}>
          <button
            type={`button`}
            className={`ui-xc__toggle`}
            aria-expanded={C}
            aria-controls={`${x}-body`}
            aria-label={`${title}${status ? `, ${status.label}` : ``}${Y ? `, ${Y.name} is ahead by ${Math.abs(N(Y)).toFixed(1)} percent` : ``}`}
            onClick={() => H(!C)}
          />
          <span className={`ui-xc__chart`} aria-hidden={`true`} onPointerLeave={() => D(null)}>
            {variants.map((e) => (
              <span
                className={`ui-xc__col`}
                data-hot={E === e.id ? `` : void 0}
                data-dim={E && E !== e.id ? `` : void 0}
                data-picked={T === e.id ? `` : void 0}
                data-passed={T && T !== e.id ? `` : void 0}
                style={
                  {
                    "--ui-xc-color": B(e),
                    "--ui-xc-size": z(e),
                  } as React.CSSProperties
                }
                onPointerEnter={(t) => t.pointerType === `mouse` && D(e.id)}
                onClick={() => J(e.id)}
                key={e.id}
              />
            ))}
          </span>
          <span className={`ui-xc__titles`}>
            <span className={`ui-xc__name`}>{title}</span>
            <span className={`ui-xc__sub`}>
              {status && (
                <span className={`ui-xc__tag`} data-tone={status.tone ?? `gray`}>
                  <Iconte />
                  {status.label}
                </span>
              )}
              {note && <span className={`ui-xc__note`}>{note}</span>}
            </span>
          </span>
          {Y ? (
            <span className={`ui-xc__lead`} data-tone={`green`} key={`${Y.id}-${w?.id}`}>
              <b>{Y.key}</b>
              <Iconee down={N(Y) < 0} />
              {F(N(Y))}
            </span>
          ) : (
            <span
              className={`ui-xc__lead`}
              data-tone={`gray`}
              key={`none-${w?.id}`}
            >{`No lift yet`}</span>
          )}
        </div>
        <div id={`${x}-body`} className={`ui-xc__fold`} inert={!C}>
          <div className={`ui-xc__clip`}>
            <div className={`ui-xc__body`}>
              {metrics.length > 1 && (
                <div
                  ref={G}
                  className={`ui-xc__switch`}
                  role={`radiogroup`}
                  aria-label={`Metric`}
                  onKeyDown={ye}
                >
                  {K && (
                    <span
                      className={`ui-xc__thumb`}
                      style={{
                        transform: `translateX(${K.left}px)`,
                        width: K.width,
                      }}
                    />
                  )}
                  {metrics.map((e) => (
                    <button
                      type={`button`}
                      role={`radio`}
                      aria-checked={e.id === w?.id}
                      tabIndex={e.id === w?.id ? 0 : -1}
                      className={`ui-xc__metric`}
                      onClick={() => q(e.id)}
                      key={e.id}
                    >
                      {e.label}
                    </button>
                  ))}
                </div>
              )}
              <div
                className={`ui-xc__rows`}
                role={`radiogroup`}
                aria-label={`Winner`}
                onPointerLeave={() => D(null)}
              >
                {variants.map((e) => {
                  let t = P(e),
                    n = e === j;
                  return (
                    <button
                      type={`button`}
                      role={`radio`}
                      aria-checked={T === e.id}
                      aria-label={`${e.name}: ${k(A(e))}${n ? `, baseline` : `, ${N(e) >= 0 ? `up` : `down`} ${Math.abs(N(e)).toFixed(1)} percent`}`}
                      className={`ui-xc__row`}
                      data-hot={E === e.id ? `` : void 0}
                      data-dim={E && E !== e.id ? `` : void 0}
                      style={
                        {
                          "--ui-xc-color": B(e),
                        } as React.CSSProperties
                      }
                      onPointerEnter={(t) => t.pointerType === `mouse` && D(e.id)}
                      onFocus={() => D(e.id)}
                      onBlur={() => D(null)}
                      onClick={() => J(e.id)}
                      key={e.id}
                    >
                      <span className={`ui-xc__badge`}>
                        <span>{e.key}</span>
                        <Icond />
                      </span>
                      <span className={`ui-xc__label`}>{e.name}</span>
                      <span className={`ui-xc__value`}>{k(me[e.id] ?? A(e))}</span>
                      {n ? (
                        <span className={`ui-xc__lift`} data-tone={`gray`}>{`Base`}</span>
                      ) : (
                        <span
                          className={`ui-xc__lift`}
                          data-tone={t > 0.05 ? `green` : t < -0.05 ? `red` : `gray`}
                        >
                          {F(N(e))}
                        </span>
                      )}
                      <span className={`ui-xc__track`}>
                        <span
                          className={`ui-xc__bar`}
                          style={{
                            transform: `scaleX(${Math.max(0.02, A(e) / L)})`,
                          }}
                        />
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`ui-xc__fold`} inert={!C}>
        <div className={`ui-xc__clip`}>
          <div className={`ui-xc__foot`}>
            <span className={`ui-xc__caption`} aria-live={`polite`}>
              <span key={$}>{Q}</span>
            </span>
            {X && action && (
              <button
                type={`button`}
                className={`ui-xc__action`}
                onClick={() => action.onClick(X)}
                key={X.id}
              >
                {be}
                <Iconf />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
var valueValue8 = `
.ui-xc {
  --ui-xc-tray: #f0f0f0;
  --ui-xc-card: #ffffff;
  --ui-xc-line: #ececec;
  --ui-xc-ink: #171717;
  --ui-xc-text: #404040;
  --ui-xc-muted: #8f8f8f;
  --ui-xc-well: #f4f4f5;
  --ui-xc-track: #ededf0;
  --ui-xc-c0: #b4b4ba;
  --ui-xc-c1: #2f6bff;
  --ui-xc-c2: #7c5cff;
  --ui-xc-c3: #f0a020;
  --ui-xc-c4: #22a05a;
  --ui-xc-focus: rgba(23, 23, 23, 0.22);
  --ui-xc-ease: cubic-bezier(0.32, 0.72, 0.24, 1);
  --ui-xc-time: 520ms;
  box-sizing: border-box;
  width: 100%;
  max-width: 340px;
  padding: 4px;
  border-radius: 20px;
  background: var(--ui-xc-tray);
  container-type: inline-size;
  font-family: "Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  font-size: 13px;
  line-height: 20px;
  color: var(--ui-xc-text);
  text-align: left;
  -webkit-font-smoothing: antialiased;
}
.ui-xc *, .ui-xc *::before, .ui-xc *::after { box-sizing: border-box; }
:where(.ui-xc) button { margin: 0; padding: 0; border: 0; background: none; font: inherit; color: inherit; text-align: inherit; cursor: pointer; -webkit-tap-highlight-color: transparent; }
.ui-xc button:focus-visible { outline: 2px solid var(--ui-xc-focus); outline-offset: 2px; }
.ui-xc svg { display: block; flex: none; }
.ui-xc b { font-weight: 600; color: var(--ui-xc-ink); }

/* Tags and lifts: colored text on a light fill of the same color */
.ui-xc [data-tone="red"] { --ui-xc-tag: #b42318; --ui-xc-tag-bg: rgba(229, 72, 77, 0.1); }
.ui-xc [data-tone="amber"] { --ui-xc-tag: #96590a; --ui-xc-tag-bg: rgba(240, 160, 32, 0.14); }
.ui-xc [data-tone="green"] { --ui-xc-tag: #18794e; --ui-xc-tag-bg: rgba(34, 160, 90, 0.11); }
.ui-xc [data-tone="blue"] { --ui-xc-tag: #1f55d6; --ui-xc-tag-bg: rgba(47, 107, 255, 0.09); }
.ui-xc [data-tone="violet"] { --ui-xc-tag: #6941c6; --ui-xc-tag-bg: rgba(124, 92, 255, 0.1); }
.ui-xc [data-tone="gray"] { --ui-xc-tag: #6b6b72; --ui-xc-tag-bg: rgba(110, 110, 120, 0.09); }

.ui-xc__card { border-radius: 16px; background: var(--ui-xc-card); box-shadow: 0 0 0 1px var(--ui-xc-line), 0 1px 2px rgba(0, 0, 0, 0.04); }

/* Everything that opens does it the same quiet way: it unfolds and fades, nothing travels */
.ui-xc__fold { display: grid; grid-template-rows: 0fr; opacity: 0; transition: grid-template-rows var(--ui-xc-time) var(--ui-xc-ease), opacity 260ms ease; }
.ui-xc__clip { min-height: 0; overflow: hidden; }
.ui-xc[data-open] > .ui-xc__fold, .ui-xc[data-open] > .ui-xc__card > .ui-xc__fold { grid-template-rows: 1fr; opacity: 1; transition: grid-template-rows var(--ui-xc-time) var(--ui-xc-ease), opacity 380ms ease 120ms; }

/* ----- Head: the same in both states ----- */
.ui-xc__head { position: relative; display: flex; align-items: center; gap: 10px; padding: 10px 12px; }
.ui-xc__toggle { position: absolute; inset: 0; border-radius: 16px; }
.ui-xc__head > :not(.ui-xc__toggle) { position: relative; pointer-events: none; }
.ui-xc[data-open] .ui-xc__chart { pointer-events: auto; }

.ui-xc__chart { display: flex; flex: none; align-items: flex-end; justify-content: center; gap: 3px; width: 34px; height: 34px; padding: 6px 5px 5px; border-radius: 10px; background: var(--ui-xc-well); box-shadow: inset 0 0 0 1px var(--ui-xc-line); }
.ui-xc__col { flex: 1; max-width: 7px; height: calc(var(--ui-xc-size) * 100%); border-radius: 2.5px; background: var(--ui-xc-color); cursor: pointer; transition: height 620ms var(--ui-xc-ease), opacity 220ms ease, transform 260ms var(--ui-xc-ease); transform-origin: 50% 100%; }
.ui-xc__col[data-hot] { transform: scaleX(1.25); }
.ui-xc__col[data-dim] { opacity: 0.3; }
.ui-xc__col[data-passed]:not([data-hot]) { opacity: 0.35; }

.ui-xc__titles { display: grid; grid-template-columns: minmax(0, 1fr); flex: 1; min-width: 0; }
.ui-xc__name { overflow: hidden; font-size: 13.5px; font-weight: 600; color: var(--ui-xc-ink); white-space: nowrap; text-overflow: ellipsis; }
.ui-xc__sub { display: flex; align-items: center; gap: 6px; min-width: 0; height: 20px; margin-top: 1px; overflow: hidden; font-size: 12px; line-height: 20px; color: var(--ui-xc-muted); white-space: nowrap; }
.ui-xc__tag { display: inline-flex; flex: none; align-items: center; gap: 4px; height: 20px; padding: 0 7px 0 5px; border-radius: 5px; background: var(--ui-xc-tag-bg); font-weight: 500; color: var(--ui-xc-tag); }
.ui-xc__note { min-width: 0; overflow: hidden; text-overflow: ellipsis; }
.ui-xc__lead { display: inline-flex; flex: none; align-items: center; gap: 4px; height: 24px; padding: 0 8px; border-radius: 6px; background: var(--ui-xc-tag-bg); font-size: 12px; font-weight: 500; color: var(--ui-xc-tag); white-space: nowrap; font-variant-numeric: tabular-nums; animation: ui-xc-pop 360ms var(--ui-xc-ease) both; }
.ui-xc__lead b { color: inherit; }

/* ----- Body ----- */
.ui-xc__body { padding: 0 12px 10px; }
.ui-xc__switch { position: relative; display: grid; grid-auto-columns: 1fr; grid-auto-flow: column; padding: 2px; border-radius: 10px; background: var(--ui-xc-well); box-shadow: inset 0 0 0 1px var(--ui-xc-line); }
.ui-xc__thumb { position: absolute; top: 2px; left: 0; height: calc(100% - 4px); border-radius: 8px; background: var(--ui-xc-card); box-shadow: 0 0 0 1px var(--ui-xc-line), 0 1px 2px rgba(0, 0, 0, 0.06); transition: transform 420ms var(--ui-xc-ease), width 420ms var(--ui-xc-ease); }
.ui-xc__metric { position: relative; height: 26px; padding: 0 8px; border-radius: 8px; font-size: 12px; font-weight: 500; color: var(--ui-xc-muted); text-align: center; white-space: nowrap; transition: color 200ms ease; }
.ui-xc__metric:hover, .ui-xc__metric[aria-checked="true"] { color: var(--ui-xc-ink); }

.ui-xc__rows { display: grid; gap: 2px; margin-top: 8px; }
.ui-xc__row { display: grid; grid-template-columns: auto minmax(0, 1fr) auto auto; align-items: center; column-gap: 9px; row-gap: 6px; width: calc(100% + 12px); margin: 0 -6px; padding: 7px 6px 8px; border-radius: 10px; transition: background-color 160ms ease, opacity 220ms ease, box-shadow 200ms ease; }
.ui-xc__row[data-hot] { background: var(--ui-xc-well); }
.ui-xc__row[data-dim] { opacity: 0.5; }
.ui-xc__row[aria-checked="true"] { background: var(--ui-xc-well); box-shadow: inset 0 0 0 1px var(--ui-xc-line); }
.ui-xc__badge { display: grid; place-items: center; width: 20px; height: 20px; border-radius: 6px; background: color-mix(in srgb, var(--ui-xc-color) 16%, transparent); font-size: 11px; font-weight: 600; line-height: 1; color: color-mix(in srgb, var(--ui-xc-color) 72%, var(--ui-xc-ink)); transition: background-color 220ms ease, color 220ms ease; }
.ui-xc__badge > * { grid-area: 1 / 1; transition: opacity 180ms ease, transform 260ms var(--ui-xc-ease); }
.ui-xc__badge svg { opacity: 0; transform: scale(0.5); }
.ui-xc__row[aria-checked="true"] .ui-xc__badge { background: var(--ui-xc-color); color: #fff; }
.ui-xc__row[aria-checked="true"] .ui-xc__badge span { opacity: 0; transform: scale(0.5); }
.ui-xc__row[aria-checked="true"] .ui-xc__badge svg { opacity: 1; transform: none; }
.ui-xc__label { overflow: hidden; color: var(--ui-xc-text); white-space: nowrap; text-overflow: ellipsis; }
.ui-xc__value { font-weight: 500; color: var(--ui-xc-ink); font-variant-numeric: tabular-nums; }
.ui-xc__lift { min-width: 50px; height: 20px; padding: 0 6px; border-radius: 5px; background: var(--ui-xc-tag-bg); font-size: 11.5px; font-weight: 500; line-height: 20px; color: var(--ui-xc-tag); text-align: center; font-variant-numeric: tabular-nums; transition: background-color 240ms ease, color 240ms ease; }
.ui-xc__track { grid-column: 2 / -1; height: 4px; overflow: hidden; border-radius: 2px; background: var(--ui-xc-track); }
.ui-xc__bar { display: block; width: 100%; height: 100%; border-radius: 2px; background: var(--ui-xc-color); transform-origin: 0 50%; transition: transform 620ms var(--ui-xc-ease); }

/* ----- Tray ----- */
.ui-xc__foot { display: flex; align-items: center; gap: 8px; height: 38px; padding: 4px 4px 0 10px; }
.ui-xc__caption { flex: 1; min-width: 0; overflow: hidden; font-size: 12.5px; color: var(--ui-xc-muted); white-space: nowrap; text-overflow: ellipsis; font-variant-numeric: tabular-nums; }
.ui-xc__caption > span { display: inline-block; animation: ui-xc-in 280ms var(--ui-xc-ease) both; }
.ui-xc__action { display: inline-flex; align-items: center; gap: 4px; flex: none; height: 26px; padding: 0 7px 0 10px; border-radius: 10px; background: var(--ui-xc-ink); font-size: 12.5px; font-weight: 500; color: var(--ui-xc-card); white-space: nowrap; animation: ui-xc-pop 360ms var(--ui-xc-ease) both; transition: opacity 160ms ease; }
.ui-xc__action:hover { opacity: 0.88; }
.ui-xc__action svg { transition: transform 220ms var(--ui-xc-ease); }
.ui-xc__action:hover svg { transform: translateX(2px); }

@keyframes ui-xc-in { from { opacity: 0; transform: translateY(3px); } }
@keyframes ui-xc-pop { from { opacity: 0; transform: scale(0.94); } }

/* Narrow cards: the note gives way first, then the lift chip loses its padding */
@container (max-width: 300px) {
  .ui-xc__head { gap: 8px; padding: 10px; }
  .ui-xc__chart { width: 30px; height: 30px; padding: 5px 4px 4px; gap: 2.5px; }
  .ui-xc__note { display: none; }
  .ui-xc__lead { gap: 3px; padding: 0 6px; }
  .ui-xc__lead svg { display: none; }
  .ui-xc__body { padding: 0 10px 10px; }
  .ui-xc__metric { padding: 0 4px; }
  .ui-xc__row { column-gap: 7px; }
  .ui-xc__lift { min-width: 44px; padding: 0 4px; }
}

@media (pointer: coarse) {
  .ui-xc__metric { height: 32px; }
  .ui-xc__row { padding: 10px 6px 11px; }
  .ui-xc__action { height: 30px; }
}

@media (prefers-reduced-motion: reduce) {
  .ui-xc *, .ui-xc *::before, .ui-xc *::after { animation: none !important; transition: none !important; }
}

/* Dark mode: follows a .dark class or data-theme="dark" on any ancestor, e.g. <html> */
:where(.dark, [data-theme="dark"]) .ui-xc {
  --ui-xc-tray: #111113;
  --ui-xc-card: #19191b;
  --ui-xc-line: #2a2a2e;
  --ui-xc-ink: #ededed;
  --ui-xc-text: #c8c8cc;
  --ui-xc-muted: #8b8b92;
  --ui-xc-well: #222225;
  --ui-xc-track: #2c2c31;
  --ui-xc-c0: #6e6e76;
  --ui-xc-c1: #5b8cff;
  --ui-xc-c2: #9b83ff;
  --ui-xc-focus: rgba(255, 255, 255, 0.3);
}
:where(.dark, [data-theme="dark"]) .ui-xc [data-tone="red"] { --ui-xc-tag: #ff9b93; }
:where(.dark, [data-theme="dark"]) .ui-xc [data-tone="amber"] { --ui-xc-tag: #f5c264; }
:where(.dark, [data-theme="dark"]) .ui-xc [data-tone="green"] { --ui-xc-tag: #6ee7a8; }
:where(.dark, [data-theme="dark"]) .ui-xc [data-tone="blue"] { --ui-xc-tag: #9bb8ff; }
:where(.dark, [data-theme="dark"]) .ui-xc [data-tone="violet"] { --ui-xc-tag: #c3b1ff; }
:where(.dark, [data-theme="dark"]) .ui-xc [data-tone="gray"] { --ui-xc-tag: #b4b4bb; }
:where(.dark, [data-theme="dark"]) .ui-xc__row[aria-checked="true"] .ui-xc__badge { color: #111113; }
`;
var valueValue9 = [
  {
    id: `conversion`,
    label: `Conversion`,
    format: (e: number) => `${e.toFixed(1)}%`,
  },
  {
    id: `revenue`,
    label: `Revenue`,
    format: (e: number) => `$${e.toFixed(2)}`,
  },
  {
    id: `bounce`,
    label: `Bounce`,
    format: (e: number) => `${e.toFixed(1)}%`,
    lowerIsBetter: true,
  },
];
var valueValue10 = [
  {
    id: `a`,
    key: `A`,
    name: `Start free trial`,
    control: true,
    visitors: 4790,
    values: {
      conversion: 4.2,
      revenue: 18.4,
      bounce: 41.3,
    },
  },
  {
    id: `b`,
    key: `B`,
    name: `Try it free`,
    visitors: 4812,
    values: {
      conversion: 4.7,
      revenue: 19.1,
      bounce: 38.2,
    },
    confidence: {
      conversion: 96,
      revenue: 81,
      bounce: 93,
    },
  },
  {
    id: `c`,
    key: `C`,
    name: `Get started – $0`,
    visitors: 4755,
    values: {
      conversion: 4,
      revenue: 21.6,
      bounce: 43.9,
    },
    confidence: {
      conversion: 62,
      revenue: 97,
      bounce: 71,
    },
  },
];
function ExperimentCardDemo2() {
  let [e, t] = React.useState<boolean>(false),
    [i, a] = React.useState<string>(`conversion`),
    o = React.useRef(false);
  React.useEffect(() => {
    let e = 0,
      n = () => {
        o.current ||
          ((e = (e + 1) % 5),
          e === 1
            ? t(true)
            : e === 2
              ? a(`revenue`)
              : e === 3
                ? a(`bounce`)
                : e === 4
                  ? a(`conversion`)
                  : t(false));
      },
      r = 0,
      i = window.setTimeout(() => {
        (n(), (r = window.setInterval(n, 2200)));
      }, 700);
    return () => {
      (window.clearTimeout(i), window.clearInterval(r));
    };
  }, []);
  let s: () => void = () => (o.current = true);
  return (
    <div
      className={`xc-demo`}
      onPointerEnter={s}
      onPointerDownCapture={s}
      onKeyDownCapture={s}
      onFocusCapture={s}
    >
      <ExperimentCard
        title={`Signup button copy`}
        status={{
          label: `Running`,
          tone: `green`,
        }}
        note={`Day 9 of 14`}
        metrics={valueValue9}
        metric={i}
        onMetricChange={a}
        variants={valueValue10}
        action={{
          label: (e) => `Ship ${e.key}`,
          onClick: () => {},
        }}
        open={e}
        onOpenChange={t}
      />
    </div>
  );
}
const demoStyles =
  ".xc-demo{grid-template-columns:min(340px,100%);place-content:start center;width:100%;height:320px;display:grid}.card__preview .xc-demo{grid-template-columns:auto;height:auto;position:absolute;inset:50px 0 0}.card__preview .xc-demo .ui-xc{zoom:.52;width:340px;max-width:none}.stage:has(.xc-demo){height:500px}@media (width<=760px){.xc-demo{height:auto}.stage:has(.xc-demo){align-items:start;height:560px;padding:120px 16px 24px}}.card__preview .xc-demo .ui-xcc{zoom:.52;width:340px;max-width:none}\n";
function ExperimentCardDemo(props: React.JSX.IntrinsicAttributes) {
  return (
    <>
      <style href="plico-demo-experiment-card" precedence="default">
        {demoStyles}
      </style>
      <ExperimentCardDemo2 {...props} />
    </>
  );
}
export { ExperimentCard as Component };
export { ExperimentCardDemo as Demo };
export { ExperimentCard };
export { ExperimentCardDemo };
export default ExperimentCard;

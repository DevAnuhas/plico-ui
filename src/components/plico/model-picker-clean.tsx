"use client";

import * as React from "react";
type Effort = "low" | "medium" | "high";
type PickerModel = {
  id: string;
  name: string;
  description: string;
  speed?: number;
  quality?: number;
  cost?: number;
  latencyMs?: number;
  pricePerM?: number;
  icon?: React.ReactNode;
} & {
  provider?: string;
  tag?: string;
  badge?: string;
  thinking?: boolean;
};
interface ModelPickerCleanProps {
  models: PickerModel[];
  value?: string;
  defaultValue?: string;
  onChange?: (id: string) => void;
  thinking?: boolean;
  defaultThinking?: boolean;
  onThinkingChange?: (on: boolean) => void;
  webSearch?: boolean;
  defaultWebSearch?: boolean;
  onWebSearchChange?: (on: boolean) => void;
  effort?: "low" | "medium" | "high";
  defaultEffort?: "low" | "medium" | "high";
  onEffortChange?: (effort: "low" | "medium" | "high") => void;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  align?: "start" | "end";
  side?: "bottom" | "top";
  className?: string;
}
var valueValue: { id: Effort; label: string }[] = [
  {
    id: `low`,
    label: `Low`,
  },
  {
    id: `medium`,
    label: `Medium`,
  },
  {
    id: `high`,
    label: `High`,
  },
];
var valueValue2 = {
  low: 1.6,
  medium: 2.5,
  high: 4,
};
var valueValue3: { key: "speed" | "quality" | "cost"; label: string }[] = [
  {
    key: `speed`,
    label: `Speed`,
  },
  {
    key: `quality`,
    label: `Quality`,
  },
  {
    key: `cost`,
    label: `Cost`,
  },
];
var valueValue4 = (e: number) => 1 - (1 - e) ** 4;
var valueValue5 = () =>
  typeof window < `u` && window.matchMedia(`(prefers-reduced-motion: reduce)`).matches;
var valueValue6 = (e: number) => Math.max(0, Math.min(5, Math.round(e)));
var valueValue7 = (e: number) => `${(e / 1e3).toFixed(1)}s`;
var valueValue8 = (e: number, t: unknown) => `$${e.toFixed(Number.isInteger(t) ? 0 : 2)}`;
function valueValue9(e: Record<string, number>, t: number) {
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
function Iconp({ id: id, children: children }: { id: string; children: React.ReactNode }) {
  let i = React.useRef({
      id: id,
      node: children,
    }),
    [a, o] = React.useState(id),
    [s, c] = React.useState<{ id: string; node: React.ReactNode } | null>(null);
  return (
    a !== id && (o(id), c(i.current)),
    (i.current = {
      id: id,
      node: children,
    }),
    React.useEffect(() => {
      if (!s) return;
      let e = window.setTimeout(() => c(null), 260);
      return () => window.clearTimeout(e);
    }, [s]),
    (
      <span className={`ui-mdpc__swap`}>
        {s && (
          <span
            className={`ui-mdpc__swap-item`}
            data-out={``}
            aria-hidden={`true`}
            key={`out-${s.id}`}
          >
            {s.node}
          </span>
        )}
        <span className={`ui-mdpc__swap-item`} key={id}>
          {children}
        </span>
      </span>
    )
  );
}
var valueValue10: Pick<
  React.SVGProps<SVGElement>,
  "stroke" | "strokeWidth" | "strokeLinecap" | "strokeLinejoin"
> = {
  stroke: `currentColor`,
  strokeWidth: 1.2,
  strokeLinecap: `round`,
  strokeLinejoin: `round`,
};
var Iconee = () => (
  <svg
    className={`ui-mdpc__chevron`}
    width={`14`}
    height={`14`}
    viewBox={`0 0 12 12`}
    fill={`none`}
    aria-hidden={`true`}
  >
    <path d={`m3 4.5 3 3 3-3`} {...valueValue10} />
  </svg>
);
var Iconte = () => (
  <svg
    className={`ui-mdpc__check`}
    width={`16`}
    height={`16`}
    viewBox={`0 0 14 14`}
    fill={`none`}
    aria-hidden={`true`}
  >
    <path d={`m3.4 7.3 2.4 2.4 4.8-5.2`} {...valueValue10} strokeWidth={1.3} />
  </svg>
);
var Iconh = () => (
  <svg width={`16`} height={`16`} viewBox={`0 0 14 14`} fill={`none`} aria-hidden={`true`}>
    <path
      d={`M5.3 10.6h3.4M5.8 12.3h2.4M7 1.7a3.9 3.9 0 0 0-2.3 7c.4.3.6.7.6 1.1v.1h3.4v-.1c0-.4.2-.8.6-1.1A3.9 3.9 0 0 0 7 1.7Z`}
      {...valueValue10}
    />
  </svg>
);
var Iconne = () => (
  <svg width={`16`} height={`16`} viewBox={`0 0 14 14`} fill={`none`} aria-hidden={`true`}>
    <circle cx={`7`} cy={`7`} r={`5.3`} {...valueValue10} />
    <path
      d={`M1.9 7h10.2M7 1.7c1.4 1.5 2 3.3 2 5.3s-.6 3.8-2 5.3c-1.4-1.5-2-3.3-2-5.3s.6-3.8 2-5.3Z`}
      {...valueValue10}
    />
  </svg>
);
function Icong({ model: model }: { model: PickerModel }) {
  return (
    <span className={`ui-mdpc__glyph`} aria-hidden={`true`}>
      {model.icon ?? model.name.trim().charAt(0).toUpperCase()}
    </span>
  );
}
function ModelPickerClean({
  models: models,
  value: value,
  defaultValue: defaultValue,
  onChange: onChange,
  thinking: thinking,
  defaultThinking = false,
  onThinkingChange: onThinkingChange,
  webSearch: webSearch,
  defaultWebSearch = false,
  onWebSearchChange: onWebSearchChange,
  effort: effort,
  defaultEffort = `medium`,
  onEffortChange: onEffortChange,
  open: open,
  defaultOpen = false,
  onOpenChange: onOpenChange,
  align = `start`,
  side = `bottom`,
  className: className,
}: ModelPickerCleanProps) {
  let S = React.useId(),
    C = React.useRef<HTMLDivElement | null>(null),
    w = React.useRef<HTMLButtonElement | null>(null),
    T = React.useRef<HTMLDivElement | null>(null),
    [pe, me] = React.useState(defaultValue ?? models[0]?.id),
    [he, ge] = React.useState(defaultThinking),
    [_e, ve] = React.useState(defaultWebSearch),
    [ye, be] = React.useState(defaultEffort),
    [xe, Se] = React.useState(defaultOpen),
    E = value ?? pe,
    D = thinking ?? he,
    O = webSearch ?? _e,
    k = effort ?? ye,
    A = open ?? xe,
    j = Math.max(
      0,
      models.findIndex((e) => e.id === E),
    ),
    M = models[j],
    [N, P] = React.useState(j),
    [F, I] = React.useState(false),
    [Ce, L] = React.useState<"search" | null>(null),
    R = models[F ? N : j] ?? M,
    z = (e: boolean, t?: string) => {
      (e !== A && (e ? (P(j), I(false)) : L(null), Se(e), onOpenChange?.(e)),
        t === `list` &&
          requestAnimationFrame(() =>
            T.current?.focus({
              preventScroll: true,
            }),
          ),
        t === `trigger` &&
          w.current?.focus({
            preventScroll: true,
          }));
    },
    B = React.useRef(A);
  React.useEffect(() => {
    (A && !B.current && (P(j), I(false)), (B.current = A));
  }, [A, j]);
  let V = React.useRef<HTMLDivElement | null>(null),
    [H, we] = React.useState(0);
  (React.useLayoutEffect(() => {
    if (!A) return;
    let e = () => {
      let e = w.current?.getBoundingClientRect(),
        t = V.current?.offsetWidth ?? 0;
      if (!e || !t) return;
      let n = document.documentElement.clientWidth,
        r = align === `end` ? e.right - t : e.left;
      we(r < 12 ? 12 - r : r + t > n - 12 ? Math.min(0, n - 12 - (r + t)) : 0);
    };
    return (
      e(),
      window.addEventListener(`resize`, e),
      () => window.removeEventListener(`resize`, e)
    );
  }, [A, align]),
    React.useEffect(() => {
      if (!A) return;
      let e = (e: PointerEvent) => {
        C.current?.contains(e.target as Node) || z(false);
      };
      return (
        document.addEventListener(`pointerdown`, e),
        () => document.removeEventListener(`pointerdown`, e)
      );
    }));
  let Te = () => C.current?.contains(document.activeElement) ?? false,
    U = (t: number) => {
      let n = models[t];
      n && (me(n.id), n.id !== E && onChange?.(n.id), z(false, Te() ? `trigger` : void 0));
    },
    Ee: React.MouseEventHandler<HTMLButtonElement> = () => {
      (ge(!D), onThinkingChange?.(!D));
    },
    De: React.MouseEventHandler<HTMLButtonElement> = () => {
      (ve(!O), onWebSearchChange?.(!O));
    },
    W = (e: Effort) => {
      (be(e), e !== k && onEffortChange?.(e));
    },
    Oe: React.KeyboardEventHandler<HTMLButtonElement> = (e) => {
      (e.key === `ArrowDown` || e.key === `ArrowUp`) && (e.preventDefault(), z(true, `list`));
    },
    ke: React.KeyboardEventHandler<HTMLDivElement> = (t) => {
      let n = models.length;
      if (!n) return;
      let r = (e: number) => {
        (t.preventDefault(), P(((e % n) + n) % n), I(true));
      };
      t.key === `ArrowDown`
        ? r(N + 1)
        : t.key === `ArrowUp`
          ? r(N - 1)
          : t.key === `Home`
            ? r(0)
            : t.key === `End`
              ? r(n - 1)
              : (t.key === `Enter` || t.key === ` `) && (t.preventDefault(), U(N));
    },
    G = React.useRef<HTMLDivElement | null>(null),
    [K, Ae] = React.useState<{ x: number; w: number } | null>(null);
  React.useLayoutEffect(() => {
    let e = G.current?.querySelector<HTMLElement>(`[data-effort="${k}"]`);
    e &&
      Ae({
        x: e.offsetLeft,
        w: e.offsetWidth,
      });
  }, [k, A, D]);
  let je: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
      let t = valueValue.findIndex((e) => e.id === k),
        n =
          e.key === `ArrowRight` || e.key === `ArrowDown`
            ? 1
            : e.key === `ArrowLeft` || e.key === `ArrowUp`
              ? -1
              : 0;
      if (!n) return;
      e.preventDefault();
      let r = valueValue[(t + n + valueValue.length) % valueValue.length];
      (W(r.id), C.current?.querySelector<HTMLElement>(`[data-effort="${r.id}"]`)?.focus());
    },
    Me: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
      e.key === `Escape` && A && (e.stopPropagation(), z(false, `trigger`));
    },
    Ne = D ? valueValue2[k] : 1,
    q = (R?.latencyMs ?? 0) * Ne,
    J = R?.pricePerM ?? 0,
    Y = valueValue9(
      {
        latency: q,
        price: J,
      },
      560,
    ),
    X = R?.latencyMs !== void 0 || R?.pricePerM !== void 0,
    Z,
    Q,
    $;
  if (Ce === `search`)
    ((Z = O ? `Looks things up on the web when it helps` : `Answers from what it already knows`),
      (Q = `search-${O}`),
      ($ = Z));
  else if (!X)
    ((Z = R?.description ?? R?.name ?? ``), (Q = `plain-${R?.id}`), ($ = `${R?.name ?? ``}: ${Z}`));
  else {
    let e = [],
      t = [];
    (R.latencyMs !== void 0 &&
      (e.push(
        <span key={`l`}>
          {`~`}
          <b>{valueValue7(Y.latency ?? q)}</b>
          {` first token`}
        </span>,
      ),
      t.push(`about ${valueValue7(q)} to the first token`)),
      R.pricePerM !== void 0 &&
        (e.push(
          <span key={`p`}>
            <b>{valueValue8(Y.price ?? J, J)}</b>
            {` / M tokens`}
          </span>,
        ),
        t.push(`${valueValue8(J, J)} per million tokens`)),
      (Z = e.flatMap((e, t) =>
        t ? [<span className={`ui-mdpc__dot`} key={`d${t}`}>{` · `}</span>, e] : [e],
      )),
      (Q = `stats`),
      ($ = `${R.name}: ${t.join(`, `)}`));
  }
  let Pe = models[N] ? `${S}-opt-${models[N].id}` : void 0;
  return (
    <div
      ref={C}
      className={[`ui-mdpc`, className].filter(Boolean).join(` `)}
      data-open={A ? `` : void 0}
      data-align={align}
      data-side={side}
      onKeyDown={Me}
      onBlur={(e) => {
        A && e.relatedTarget && !C.current?.contains(e.relatedTarget) && z(false);
      }}
    >
      <style href={`ui-model-picker-clean`} precedence={`default`}>
        {valueValue11}
      </style>
      <button
        ref={w}
        type={`button`}
        className={`ui-mdpc__trigger`}
        aria-haspopup={`dialog`}
        aria-expanded={A}
        aria-controls={`${S}-menu`}
        aria-label={`Model: ${M?.name ?? `none`}${D ? `, extended thinking` : ``}`}
        onClick={() => z(!A, A ? void 0 : `list`)}
        onKeyDown={Oe}
      >
        {M && <Icong model={M} />}
        <span className={`ui-mdpc__name`}>
          <Iconp id={M?.id ?? `none`}>{M?.name ?? `Choose a model`}</Iconp>
        </span>
        <span className={`ui-mdpc__flag`} data-on={D ? `` : void 0} aria-hidden={`true`}>
          <span>
            <Iconh />
          </span>
        </span>
        <Iconee />
      </button>
      <div
        id={`${S}-menu`}
        ref={V}
        className={`ui-mdpc__pop`}
        style={
          H
            ? {
                translate: `${H}px 0`,
              }
            : void 0
        }
        role={`dialog`}
        aria-label={`Model settings`}
        inert={!A}
      >
        <div className={`ui-mdpc__card`}>
          <div className={`ui-mdpc__head`} aria-hidden={`true`}>
            <span>{`Model`}</span>
            <span className={`ui-mdpc__cols`}>
              {valueValue3.map((e) => (
                <span key={e.key}>{e.label}</span>
              ))}
            </span>
          </div>
          <div
            ref={T}
            className={`ui-mdpc__list`}
            role={`listbox`}
            aria-label={`Model`}
            tabIndex={0}
            aria-activedescendant={A ? Pe : void 0}
            data-pointing={F ? `` : void 0}
            onKeyDown={ke}
            onPointerLeave={() => I(false)}
          >
            {models.map((e, t) => {
              let n = e.speed !== void 0 || e.quality !== void 0 || e.cost !== void 0;
              return (
                <div
                  id={`${S}-opt-${e.id}`}
                  role={`option`}
                  aria-selected={t === j}
                  aria-label={`${e.name}${e.description ? `, ${e.description}` : ``}${n ? `. Speed ${e.speed ?? 0}, quality ${e.quality ?? 0}, cost ${e.cost ?? 0} of 5` : ``}`}
                  className={`ui-mdpc__option`}
                  data-active={t === N ? `` : void 0}
                  data-lit={e.id === R?.id ? `` : void 0}
                  onPointerEnter={(e) => {
                    e.pointerType === `mouse` && (P(t), I(true));
                  }}
                  onClick={() => U(t)}
                  key={e.id}
                >
                  <Icong model={e} />
                  <span className={`ui-mdpc__text`}>
                    <span className={`ui-mdpc__title`}>
                      <span className={`ui-mdpc__title-name`}>{e.name}</span>
                      {t === j && <Iconte />}
                    </span>
                    {e.description && <span className={`ui-mdpc__desc`}>{e.description}</span>}
                  </span>
                  {n ? (
                    <span className={`ui-mdpc__bars`} aria-hidden={`true`}>
                      {valueValue3.map((t, n) => {
                        let i = valueValue6(e[t.key] ?? 0);
                        return (
                          <span
                            className={`ui-mdpc__meter`}
                            style={
                              {
                                "--c": n,
                              } as React.CSSProperties
                            }
                            key={t.key}
                          >
                            {[0, 1, 2, 3, 4].map((e) => (
                              <span
                                className={`ui-mdpc__seg`}
                                data-on={e < i ? `` : void 0}
                                style={
                                  {
                                    "--s": e,
                                  } as React.CSSProperties
                                }
                                key={e}
                              />
                            ))}
                          </span>
                        );
                      })}
                    </span>
                  ) : (
                    <span className={`ui-mdpc__varies`} aria-hidden={`true`}>{`Varies`}</span>
                  )}
                </div>
              );
            })}
          </div>
          <div className={`ui-mdpc__settings`}>
            <button
              type={`button`}
              role={`switch`}
              aria-checked={D}
              className={`ui-mdpc__toggle`}
              onClick={Ee}
            >
              <span className={`ui-mdpc__toggle-icon`}>
                <Iconh />
              </span>
              <span className={`ui-mdpc__toggle-label`}>{`Extended thinking`}</span>
              <span className={`ui-mdpc__switch`} aria-hidden={`true`} />
            </button>
            <div className={`ui-mdpc__fold`} data-open={D ? `` : void 0} inert={!D}>
              <div className={`ui-mdpc__clip`}>
                <div className={`ui-mdpc__effort`}>
                  <span className={`ui-mdpc__effort-label`} id={`${S}-effort`}>{`Effort`}</span>
                  <div
                    ref={G}
                    className={`ui-mdpc__segmented`}
                    role={`radiogroup`}
                    aria-labelledby={`${S}-effort`}
                    style={
                      K
                        ? ({
                            "--x": `${K.x}px`,
                            "--w": `${K.w}px`,
                          } as React.CSSProperties)
                        : void 0
                    }
                    onKeyDown={je}
                  >
                    <span className={`ui-mdpc__thumb`} aria-hidden={`true`} />
                    {valueValue.map((e) => (
                      <button
                        type={`button`}
                        role={`radio`}
                        aria-checked={e.id === k}
                        tabIndex={e.id === k ? 0 : -1}
                        data-effort={e.id}
                        className={`ui-mdpc__seg-btn`}
                        onClick={() => W(e.id)}
                        key={e.id}
                      >
                        {e.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <button
              type={`button`}
              role={`switch`}
              aria-checked={O}
              className={`ui-mdpc__toggle`}
              onClick={De}
              onPointerEnter={(e) => e.pointerType === `mouse` && L(`search`)}
              onPointerLeave={() => L(null)}
              onFocus={() => L(`search`)}
              onBlur={() => L(null)}
            >
              <span className={`ui-mdpc__toggle-icon`}>
                <Iconne />
              </span>
              <span className={`ui-mdpc__toggle-label`}>{`Web search`}</span>
              <span className={`ui-mdpc__switch`} aria-hidden={`true`} />
            </button>
          </div>
        </div>
        <div className={`ui-mdpc__foot`}>
          <span className={`ui-mdpc__caption`} aria-hidden={`true`}>
            <Iconp id={Q}>{Z}</Iconp>
          </span>
          <span className={`ui-mdpc__keys`} aria-hidden={`true`}>
            <kbd>{`↑↓`}</kbd>
            <kbd>{`↵`}</kbd>
          </span>
          <span className={`ui-mdpc__sr`} aria-live={`polite`}>
            {A ? $ : ``}
          </span>
        </div>
      </div>
    </div>
  );
}
var valueValue11 = `
/* Colors and motion as variables – override them on .ui-mdpc */
.ui-mdpc {
  --ui-mdpc-card: #ffffff;
  --ui-mdpc-strong: #000000;
  --ui-mdpc-ink: rgba(0, 0, 0, 0.88);
  --ui-mdpc-text: rgba(0, 0, 0, 0.61);
  --ui-mdpc-muted: rgba(0, 0, 0, 0.45);
  --ui-mdpc-faint: rgba(0, 0, 0, 0.27);
  --ui-mdpc-icon: rgba(0, 0, 0, 0.447);
  --ui-mdpc-line: rgba(0, 0, 0, 0.06);
  --ui-mdpc-line-strong: rgba(0, 0, 0, 0.1);
  --ui-mdpc-fill: rgba(0, 0, 0, 0.06);
  --ui-mdpc-wash: rgba(0, 0, 0, 0.03);
  --ui-mdpc-bar: rgba(0, 0, 0, 0.2);
  --ui-mdpc-bar-off: rgba(0, 0, 0, 0.06);
  --ui-mdpc-switch: rgba(0, 0, 0, 0.1);
  --ui-mdpc-knob: #ffffff;
  --ui-mdpc-accent: rgba(0, 96, 226, 0.765);
  --ui-mdpc-focus: rgba(0, 96, 226, 0.35);
  /* Strokes are shadows: a 0.5px hairline plus a soft lift */
  --ui-mdpc-shadow-tile: 0 0 0 0.5px rgba(0, 0, 0, 0.1), 0 1px 1px -1px rgba(0, 0, 0, 0.1);
  --ui-mdpc-shadow-pop: 0 0 0 0.5px rgba(0, 0, 0, 0.08), 0 12px 28px -10px rgba(0, 0, 0, 0.16), 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --ui-mdpc-ease: cubic-bezier(0.32, 0.72, 0.24, 1);
  position: relative;
  display: inline-block;
  font-family: "Inter", "InterVariable", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  font-size: 13px;
  line-height: 20px;
  font-weight: 400;
  color: var(--ui-mdpc-ink);
  text-align: left;
  -webkit-font-smoothing: antialiased;
}
.ui-mdpc *, .ui-mdpc *::before, .ui-mdpc *::after { box-sizing: border-box; }
:where(.ui-mdpc) button { appearance: none; margin: 0; padding: 0; border: 0; background: none; font: inherit; color: inherit; text-align: inherit; cursor: pointer; -webkit-tap-highlight-color: transparent; }
.ui-mdpc button:focus-visible { outline: 2px solid var(--ui-mdpc-focus); outline-offset: 1px; }
.ui-mdpc svg { display: block; flex: none; }
.ui-mdpc b { font-weight: 500; color: var(--ui-mdpc-ink); }
.ui-mdpc__sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }

/* ----- Trigger: a quiet button – glyph, name and a small chevron ----- */
.ui-mdpc__trigger { display: inline-flex; align-items: center; gap: 6px; max-width: 100%; height: 28px; padding: 0 6px 0 6px; border-radius: 6px; font-weight: 500; color: var(--ui-mdpc-text); white-space: nowrap; transition: background-color 160ms ease, color 160ms ease; }
.ui-mdpc__trigger:hover, .ui-mdpc[data-open] .ui-mdpc__trigger { background: var(--ui-mdpc-wash); color: var(--ui-mdpc-ink); }
.ui-mdpc__trigger .ui-mdpc__glyph { width: 18px; height: 18px; border-radius: 5px; font-size: 10px; }
.ui-mdpc__trigger .ui-mdpc__glyph > svg { width: 10px; height: 10px; }
.ui-mdpc__name { display: grid; min-width: 0; }
.ui-mdpc__chevron { margin-left: -2px; color: var(--ui-mdpc-icon); transition: transform 300ms var(--ui-mdpc-ease); }
.ui-mdpc[data-open] .ui-mdpc__chevron { transform: rotate(180deg); }
.ui-mdpc__flag { display: grid; grid-template-columns: 0fr; margin-left: -6px; opacity: 0; color: var(--ui-mdpc-accent); transition: grid-template-columns 360ms var(--ui-mdpc-ease), margin 360ms var(--ui-mdpc-ease), opacity 220ms ease; }
.ui-mdpc__flag > span { min-width: 0; overflow: hidden; }
.ui-mdpc__flag[data-on] { grid-template-columns: 1fr; margin-left: -2px; opacity: 1; transition: grid-template-columns 360ms var(--ui-mdpc-ease), margin 360ms var(--ui-mdpc-ease), opacity 280ms ease 80ms; }

/* Glyph: a small white tile with a hairline */
.ui-mdpc__glyph { display: grid; flex: none; place-items: center; width: 20px; height: 20px; overflow: hidden; border-radius: 5px; background: var(--ui-mdpc-card); box-shadow: var(--ui-mdpc-shadow-tile); font-size: 10px; font-weight: 500; line-height: 1; color: var(--ui-mdpc-strong); }
.ui-mdpc__glyph > svg, .ui-mdpc__glyph > img { width: 12px; height: 12px; }

/* ----- Menu: one white popover, unfolds softly from the trigger ----- */
.ui-mdpc__pop {
  position: absolute;
  z-index: 30;
  top: calc(100% + 6px);
  left: 0;
  width: min(320px, calc(100vw - 32px));
  container-type: inline-size;
  border-radius: 10px;
  background: var(--ui-mdpc-card);
  box-shadow: var(--ui-mdpc-shadow-pop);
  transform-origin: top left;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-4px) scale(0.96);
  transition: opacity 160ms ease, transform 220ms var(--ui-mdpc-ease), visibility 0s linear 220ms;
}
.ui-mdpc[data-align="end"] .ui-mdpc__pop { left: auto; right: 0; transform-origin: top right; }
.ui-mdpc[data-side="top"] .ui-mdpc__pop { top: auto; bottom: calc(100% + 6px); transform-origin: bottom left; transform: translateY(4px) scale(0.96); }
.ui-mdpc[data-side="top"][data-align="end"] .ui-mdpc__pop { transform-origin: bottom right; }
.ui-mdpc[data-open] .ui-mdpc__pop { opacity: 1; visibility: visible; transform: none; transition: opacity 200ms ease, transform 320ms var(--ui-mdpc-ease), visibility 0s; }

.ui-mdpc__card { padding: 4px; }
.ui-mdpc__head { display: flex; align-items: center; justify-content: space-between; gap: 12px; height: 28px; padding: 4px 8px 0; font-size: 10px; font-weight: 500; line-height: 16px; letter-spacing: 0.5px; text-transform: uppercase; color: var(--ui-mdpc-muted); }
.ui-mdpc__cols { display: grid; grid-template-columns: repeat(3, 40px); gap: 8px; }
.ui-mdpc__cols > span { display: flex; justify-content: center; white-space: nowrap; }

/* ----- Rows ----- */
.ui-mdpc__list { display: grid; gap: 0; border-radius: 6px; outline: none; }
.ui-mdpc__option { display: flex; align-items: center; gap: 10px; min-height: 44px; padding: 6px 8px; border-radius: 6px; cursor: pointer; transition: background-color 90ms ease-out, opacity 200ms ease; }
/* The fill appears crisply on the row under the pointer and fades out when the pointer leaves the list */
.ui-mdpc__list[data-pointing] .ui-mdpc__option[data-active] { background: var(--ui-mdpc-fill); }
.ui-mdpc__list:focus-visible { outline: none; }
.ui-mdpc__list:focus-visible .ui-mdpc__option[data-active] { background: var(--ui-mdpc-fill); box-shadow: inset 0 0 0 1px var(--ui-mdpc-focus); }
.ui-mdpc__list[data-pointing] .ui-mdpc__option:not([data-active]) { opacity: 0.55; }
.ui-mdpc__text { display: grid; flex: 1; min-width: 0; }
.ui-mdpc__title { display: flex; align-items: center; gap: 4px; min-width: 0; font-weight: 500; color: var(--ui-mdpc-strong); }
.ui-mdpc__title-name { min-width: 0; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }
.ui-mdpc__check { color: var(--ui-mdpc-accent); animation: ui-mdpc-pop 320ms var(--ui-mdpc-ease) both; }
.ui-mdpc__desc { overflow: hidden; font-size: 12px; line-height: 16px; color: var(--ui-mdpc-text); white-space: nowrap; text-overflow: ellipsis; }

/* Strength bars: five small segments each. The lit row fills them one after another, in the accent */
.ui-mdpc__bars { display: grid; flex: none; grid-template-columns: repeat(3, 40px); gap: 8px; }
.ui-mdpc__meter { display: grid; grid-template-columns: repeat(5, 1fr); gap: 2px; height: 4px; }
.ui-mdpc__seg { border-radius: 1px; background: var(--ui-mdpc-bar-off); transition: background-color 180ms ease, transform 260ms var(--ui-mdpc-ease); }
.ui-mdpc__seg[data-on] { background: var(--ui-mdpc-bar); }
.ui-mdpc__option[data-lit] .ui-mdpc__seg[data-on] { background: var(--ui-mdpc-accent); transition-delay: calc(var(--c) * 70ms + var(--s) * 45ms); animation: ui-mdpc-fill 360ms var(--ui-mdpc-ease) both; animation-delay: calc(var(--c) * 70ms + var(--s) * 45ms); }
.ui-mdpc__varies { flex: none; width: 136px; font-size: 12px; line-height: 16px; color: var(--ui-mdpc-muted); text-align: center; }

/* ----- Switches and effort ----- */
.ui-mdpc__settings { margin: 4px -4px 0; padding: 4px 4px 0; border-top: 0.5px solid var(--ui-mdpc-line); }
.ui-mdpc__toggle { display: flex; align-items: center; gap: 10px; width: 100%; height: 32px; padding: 0 8px; border-radius: 6px; color: var(--ui-mdpc-ink); transition: background-color 90ms ease-out; }
.ui-mdpc__toggle:hover { background: var(--ui-mdpc-fill); }
.ui-mdpc__toggle-icon { display: grid; flex: none; place-items: center; width: 20px; color: var(--ui-mdpc-icon); transition: color 200ms ease; }
.ui-mdpc__toggle[aria-checked="true"] .ui-mdpc__toggle-icon { color: var(--ui-mdpc-ink); }
.ui-mdpc__toggle-label { flex: 1; min-width: 0; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }
/* Switch: a soft square track – no full pill – that turns blue when on */
.ui-mdpc__switch { position: relative; flex: none; width: 26px; height: 16px; border-radius: 5px; background: var(--ui-mdpc-switch); transition: background-color 220ms ease; }
.ui-mdpc__switch::after { content: ""; position: absolute; top: 2px; left: 2px; width: 12px; height: 12px; border-radius: 3.5px; background: var(--ui-mdpc-knob); box-shadow: 0 0 0 0.5px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.16); transition: transform 280ms var(--ui-mdpc-ease); }
.ui-mdpc__toggle[aria-checked="true"] .ui-mdpc__switch { background: var(--ui-mdpc-accent); }
.ui-mdpc__toggle[aria-checked="true"] .ui-mdpc__switch::after { transform: translateX(10px); }

.ui-mdpc__fold { display: grid; grid-template-rows: 0fr; opacity: 0; transition: grid-template-rows 420ms var(--ui-mdpc-ease), opacity 220ms ease; }
.ui-mdpc__fold[data-open] { grid-template-rows: 1fr; opacity: 1; transition: grid-template-rows 420ms var(--ui-mdpc-ease), opacity 320ms ease 100ms; }
.ui-mdpc__clip { min-height: 0; overflow: hidden; }
/* Effort: the label lines up with the switch labels, the levels are tab buttons with a fill that slides */
.ui-mdpc__effort { display: flex; align-items: center; gap: 10px; padding: 2px 8px 6px 38px; }
.ui-mdpc__effort-label { flex: 1; min-width: 0; color: var(--ui-mdpc-text); }
/* Each level is as wide as its word; the fill is measured and glides from one to the next */
.ui-mdpc__segmented { position: relative; display: flex; flex: none; gap: 4px; }
.ui-mdpc__thumb { position: absolute; top: 0; bottom: 0; left: 0; width: var(--w, 0); border-radius: 5px; background: var(--ui-mdpc-fill); transform: translateX(var(--x, 0)); transition: transform 220ms var(--ui-mdpc-ease), width 220ms var(--ui-mdpc-ease); }
.ui-mdpc__seg-btn { position: relative; height: 22px; padding: 0 7px; border-radius: 5px; box-shadow: inset 0 0 0 0.5px var(--ui-mdpc-line); font-size: 12px; font-weight: 500; line-height: 16px; color: var(--ui-mdpc-text); text-align: center !important; transition: color 160ms ease, background-color 160ms ease; }
.ui-mdpc__seg-btn[aria-checked="true"] { color: var(--ui-mdpc-ink); }
.ui-mdpc__seg-btn[aria-checked="false"]:hover { background: var(--ui-mdpc-wash); color: var(--ui-mdpc-ink); }

/* ----- Last row: what the model you point at costs you ----- */
.ui-mdpc__foot { display: flex; align-items: center; gap: 8px; height: 36px; padding: 0 8px 0 12px; border-top: 0.5px solid var(--ui-mdpc-line); }
.ui-mdpc__caption { flex: 1; min-width: 0; overflow: hidden; font-size: 12px; line-height: 16px; color: var(--ui-mdpc-muted); white-space: nowrap; font-variant-numeric: tabular-nums; }
.ui-mdpc__dot { color: var(--ui-mdpc-faint); }
.ui-mdpc__swap { display: grid; min-width: 0; }
.ui-mdpc__swap-item { grid-area: 1 / 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; animation: ui-mdpc-swap-in 320ms ease both; }
.ui-mdpc__swap-item[data-out] { animation: ui-mdpc-swap-out 220ms ease both; }
.ui-mdpc__keys { display: flex; flex: none; gap: 2px; }
.ui-mdpc__keys kbd { display: grid; place-items: center; min-width: 20px; height: 20px; padding: 0 5px; border-radius: 5px; box-shadow: inset 0 0 0 0.5px var(--ui-mdpc-line-strong); font-family: inherit; font-size: 11px; font-weight: 500; line-height: 16px; color: var(--ui-mdpc-muted); }

@keyframes ui-mdpc-swap-in { from { opacity: 0; filter: blur(2px); } }
@keyframes ui-mdpc-swap-out { from { opacity: 1; } to { opacity: 0; filter: blur(2px); } }
@keyframes ui-mdpc-pop { from { opacity: 0; transform: scale(0.6); } }
@keyframes ui-mdpc-fill { 0% { transform: scaleY(1); } 45% { transform: scaleY(1.6); } 100% { transform: scaleY(1); } }

/* Narrow menus: the glyphs in the rows and the key hints give way, effort moves left */
@container (max-width: 300px) {
  .ui-mdpc__option .ui-mdpc__glyph { display: none; }
  .ui-mdpc__keys { display: none; }
  .ui-mdpc__effort { padding-left: 8px; }
}

@media (pointer: coarse) {
  .ui-mdpc__trigger { height: 34px; }
  .ui-mdpc__option { min-height: 52px; }
  .ui-mdpc__toggle { height: 40px; }
  .ui-mdpc__seg-btn { height: 30px; padding: 0 10px; }
  .ui-mdpc__keys { display: none; }
}

@media (prefers-reduced-motion: reduce) {
  .ui-mdpc *, .ui-mdpc *::before, .ui-mdpc *::after { animation: none !important; transition: none !important; }
}

/* Dark mode: follows a .dark class or data-theme="dark" on any ancestor, e.g. <html> */
:where(.dark, [data-theme="dark"]) .ui-mdpc {
  --ui-mdpc-card: #1c1c1e;
  --ui-mdpc-strong: #ffffff;
  --ui-mdpc-ink: rgba(255, 255, 255, 0.9);
  --ui-mdpc-text: rgba(255, 255, 255, 0.62);
  --ui-mdpc-muted: rgba(255, 255, 255, 0.46);
  --ui-mdpc-faint: rgba(255, 255, 255, 0.3);
  --ui-mdpc-icon: rgba(255, 255, 255, 0.5);
  --ui-mdpc-line: rgba(255, 255, 255, 0.08);
  --ui-mdpc-line-strong: rgba(255, 255, 255, 0.12);
  --ui-mdpc-fill: rgba(255, 255, 255, 0.08);
  --ui-mdpc-wash: rgba(255, 255, 255, 0.04);
  --ui-mdpc-bar: rgba(255, 255, 255, 0.24);
  --ui-mdpc-bar-off: rgba(255, 255, 255, 0.08);
  --ui-mdpc-switch: rgba(255, 255, 255, 0.14);
  --ui-mdpc-knob: #ffffff;
  --ui-mdpc-accent: #4d8dff;
  --ui-mdpc-focus: rgba(77, 141, 255, 0.5);
  --ui-mdpc-shadow-tile: 0 0 0 0.5px rgba(255, 255, 255, 0.12), 0 1px 2px rgba(0, 0, 0, 0.4);
  --ui-mdpc-shadow-pop: 0 0 0 0.5px rgba(255, 255, 255, 0.12), 0 12px 28px -10px rgba(0, 0, 0, 0.6), 0 1px 2px 0 rgba(0, 0, 0, 0.4);
}
:where(.dark, [data-theme="dark"]) .ui-mdpc__glyph { background: #2a2a2d; }
`;
const View_InlineView = () => (
  <svg viewBox={`0 0 12 12`} fill={`none`} aria-hidden={`true`}>
    <path d={`M6 1.5 7.1 4.9 10.5 6 7.1 7.1 6 10.5 4.9 7.1 1.5 6 4.9 4.9Z`} fill={`currentColor`} />
  </svg>
);
var valueValue12 = [
  {
    id: `opus`,
    name: `Opus 5.5`,
    description: `Hardest problems`,
    speed: 2,
    quality: 5,
    cost: 5,
    latencyMs: 2100,
    pricePerM: 25,
  },
  {
    id: `sonnet`,
    name: `Sonnet 5.5`,
    description: `Everyday work`,
    speed: 4,
    quality: 4,
    cost: 3,
    latencyMs: 900,
    pricePerM: 15,
  },
  {
    id: `haiku`,
    name: `Haiku 5.5`,
    description: `Quick and light`,
    speed: 5,
    quality: 3,
    cost: 1,
    latencyMs: 400,
    pricePerM: 4,
  },
  {
    id: `auto`,
    name: `Auto`,
    description: `Picks per message`,
    icon: <View_InlineView />,
  },
];
function ModelPickerCleanDemo2() {
  let e = React.useRef<HTMLDivElement | null>(null),
    [t, i] = React.useState(0),
    [a, o] = React.useState<boolean>(false),
    s = React.useRef(false),
    c = React.useRef(false);
  React.useEffect(() => {
    let t = (t: string) => e.current?.querySelector<HTMLElement>(t) ?? null,
      n = (e: Element | null, t: string, n: { relatedTarget?: Element | null } = {}) => {
        e &&
          ((c.current = true),
          e.dispatchEvent(
            new PointerEvent(t, {
              bubbles: true,
              pointerType: `mouse`,
              ...n,
            }),
          ),
          (c.current = false));
      },
      r = (e: number) => t(`.ui-mdpc__option:nth-child(${e})`),
      a = (e: number) => () => n(r(e), `pointerover`),
      l = () =>
        n(t(`.ui-mdpc__option[data-active]`), `pointerout`, {
          relatedTarget: t(`.ui-mdpc__settings`),
        }),
      u: [number, () => void][] = [
        [700, () => o(true)],
        [800, a(1)],
        [2800, a(3)],
        [1200, a(1)],
        [
          1300,
          () => {
            (l(), t(`.ui-mdpc__toggle`)?.click());
          },
        ],
        [1400, () => t(`[data-effort="high"]`)?.click()],
        [1400, a(1)],
        [1100, () => r(1)?.click()],
        [3200, () => i((e) => e + 1)],
      ],
      d = 0,
      f = 0,
      p = () => {
        s.current ||
          d >= u.length ||
          (f = window.setTimeout(() => {
            s.current || (u[d][1](), d++, p());
          }, u[d][0]));
      };
    return (p(), () => window.clearTimeout(f));
  }, [t]);
  let l = () => {
    c.current || (s.current = true);
  };
  return (
    <div
      ref={e}
      className={`mdp-demo mdp-demo--clean`}
      onPointerEnter={l}
      onPointerDownCapture={l}
      onKeyDownCapture={l}
      onFocusCapture={l}
      onClick={(e) => (e.target as HTMLElement).closest(`.ui-mdpc__pop`) && e.stopPropagation()}
    >
      <div className={`mdp-demo__composer`}>
        <div className={`mdp-demo__text`}>{`Ask anything…`}</div>
        <div className={`mdp-demo__bar`}>
          <ModelPickerClean
            models={valueValue12}
            defaultValue={`sonnet`}
            open={a}
            onOpenChange={o}
            key={t}
          />
          <span className={`mdp-demo__send`} aria-hidden={`true`}>
            <svg width={`16`} height={`16`} viewBox={`0 0 14 14`} fill={`none`}>
              <path
                d={`M7 11.5v-9M3.2 6.3 7 2.5l3.8 3.8`}
                stroke={`currentColor`}
                strokeWidth={`1.3`}
                strokeLinecap={`round`}
                strokeLinejoin={`round`}
              />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
}
const demoStyles =
  ".mdp-demo{grid-template-columns:min(360px,100%);place-content:start center;width:100%;height:470px;font-family:Inter,ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,sans-serif;display:grid}.mdp-demo__composer{background:#fff;border-radius:18px;padding:12px 10px 8px;box-shadow:0 0 0 1px #ececec,0 1px 2px #0000000a}.mdp-demo__text{color:#8f8f8f;padding:0 6px 14px;font-size:13.5px;line-height:20px}.mdp-demo__bar{justify-content:space-between;align-items:center;gap:8px;display:flex}.mdp-demo__send{color:#fff;background:#171717;border-radius:50%;place-items:center;width:30px;height:30px;display:grid}:where(.dark,[data-theme=dark]) .mdp-demo__composer{background:#19191b;box-shadow:0 0 0 1px #2a2a2e}:where(.dark,[data-theme=dark]) .mdp-demo__send{color:#171717;background:#ededed}.card__preview .mdp-demo{grid-template-columns:auto;height:auto;position:absolute;inset:44px 0 0}.card__preview .mdp-demo__composer{zoom:.47;width:360px}.card__preview .mdp-demo__text{display:none}.stage:has(.mdp-demo){height:600px}@media (width<=760px){.stage:has(.mdp-demo){align-items:start;height:640px;padding:120px 16px 24px}}.mdp-demo--clean .mdp-demo__composer{border-radius:10px;padding:14px 10px 10px;box-shadow:0 0 0 .5px #0000000f,0 1px 1px -1px #0000001a,0 1px 2px #0000000d}.mdp-demo--clean .mdp-demo__text{color:#00000045;padding:0 4px 14px;font-size:13px}.mdp-demo--clean .mdp-demo__send{color:#fcfcfc;background:#000000e0;border-radius:6px;width:28px;height:28px}:where(.dark,[data-theme=dark]) .mdp-demo--clean .mdp-demo__composer{background:#1c1c1e;box-shadow:0 0 0 .5px #ffffff1a,0 1px 2px #0006}:where(.dark,[data-theme=dark]) .mdp-demo--clean .mdp-demo__text{color:#ffffff4d}:where(.dark,[data-theme=dark]) .mdp-demo--clean .mdp-demo__send{color:#161618;background:#ffffffeb}\n";
function ModelPickerCleanDemo(props: React.JSX.IntrinsicAttributes) {
  return (
    <>
      <style href="plico-demo-model-picker-clean" precedence="default">
        {demoStyles}
      </style>
      <ModelPickerCleanDemo2 {...props} />
    </>
  );
}
export { ModelPickerClean as Component };
export { ModelPickerCleanDemo as Demo };
export { ModelPickerClean };
export { ModelPickerCleanDemo };
export default ModelPickerClean;

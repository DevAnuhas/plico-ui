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
interface ModelPickerProps {
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
      <span className={`ui-mdp__swap`}>
        {s && (
          <span
            className={`ui-mdp__swap-item`}
            data-out={``}
            aria-hidden={`true`}
            key={`out-${s.id}`}
          >
            {s.node}
          </span>
        )}
        <span className={`ui-mdp__swap-item`} key={id}>
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
  strokeWidth: 1.4,
  strokeLinecap: `round`,
  strokeLinejoin: `round`,
};
var Iconee = () => (
  <svg
    className={`ui-mdp__chevron`}
    width={`12`}
    height={`12`}
    viewBox={`0 0 12 12`}
    fill={`none`}
    aria-hidden={`true`}
  >
    <path d={`m3 4.5 3 3 3-3`} {...valueValue10} />
  </svg>
);
var Iconte = () => (
  <svg
    className={`ui-mdp__check`}
    width={`14`}
    height={`14`}
    viewBox={`0 0 14 14`}
    fill={`none`}
    aria-hidden={`true`}
  >
    <path d={`m3.4 7.3 2.4 2.4 4.8-5.2`} {...valueValue10} strokeWidth={1.6} />
  </svg>
);
var Iconh = () => (
  <svg width={`14`} height={`14`} viewBox={`0 0 14 14`} fill={`none`} aria-hidden={`true`}>
    <path
      d={`M5.3 10.6h3.4M5.8 12.3h2.4M7 1.7a3.9 3.9 0 0 0-2.3 7c.4.3.6.7.6 1.1v.1h3.4v-.1c0-.4.2-.8.6-1.1A3.9 3.9 0 0 0 7 1.7Z`}
      {...valueValue10}
    />
  </svg>
);
var Iconne = () => (
  <svg width={`14`} height={`14`} viewBox={`0 0 14 14`} fill={`none`} aria-hidden={`true`}>
    <circle cx={`7`} cy={`7`} r={`5.3`} {...valueValue10} />
    <path
      d={`M1.9 7h10.2M7 1.7c1.4 1.5 2 3.3 2 5.3s-.6 3.8-2 5.3c-1.4-1.5-2-3.3-2-5.3s.6-3.8 2-5.3Z`}
      {...valueValue10}
    />
  </svg>
);
function Icong({ model: model }: { model: PickerModel }) {
  return (
    <span className={`ui-mdp__glyph`} aria-hidden={`true`}>
      {model.icon ?? model.name.trim().charAt(0).toUpperCase()}
    </span>
  );
}
function ModelPicker({
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
}: ModelPickerProps) {
  let w = React.useId(),
    T = React.useRef<HTMLDivElement | null>(null),
    E = React.useRef<HTMLButtonElement | null>(null),
    D = React.useRef<HTMLDivElement | null>(null),
    [de, fe] = React.useState(defaultValue ?? models[0]?.id),
    [pe, me] = React.useState(defaultThinking),
    [he, ge] = React.useState(defaultWebSearch),
    [_e, ve] = React.useState(defaultEffort),
    [ye, be] = React.useState(defaultOpen),
    O = value ?? de,
    k = thinking ?? pe,
    A = webSearch ?? he,
    j = effort ?? _e,
    M = open ?? ye,
    N = Math.max(
      0,
      models.findIndex((e) => e.id === O),
    ),
    P = models[N],
    [F, I] = React.useState(N),
    [L, R] = React.useState(false),
    [xe, z] = React.useState<"search" | null>(null),
    B = models[L ? F : N] ?? P,
    V = (e: boolean, t?: string) => {
      (e !== M && (e ? (I(N), R(false)) : z(null), be(e), onOpenChange?.(e)),
        t === `list` &&
          requestAnimationFrame(() =>
            D.current?.focus({
              preventScroll: true,
            }),
          ),
        t === `trigger` &&
          E.current?.focus({
            preventScroll: true,
          }));
    },
    H = React.useRef(M);
  React.useEffect(() => {
    (M && !H.current && (I(N), R(false)), (H.current = M));
  }, [M, N]);
  let U = React.useRef<HTMLDivElement | null>(null),
    [W, Se] = React.useState(0);
  (React.useLayoutEffect(() => {
    if (!M) return;
    let e = () => {
      let e = E.current?.getBoundingClientRect(),
        t = U.current?.offsetWidth ?? 0;
      if (!e || !t) return;
      let n = document.documentElement.clientWidth,
        r = align === `end` ? e.right - t : e.left;
      Se(r < 12 ? 12 - r : r + t > n - 12 ? Math.min(0, n - 12 - (r + t)) : 0);
    };
    return (
      e(),
      window.addEventListener(`resize`, e),
      () => window.removeEventListener(`resize`, e)
    );
  }, [M, align]),
    React.useEffect(() => {
      if (!M) return;
      let e = (e: PointerEvent) => {
        T.current?.contains(e.target as Node) || V(false);
      };
      return (
        document.addEventListener(`pointerdown`, e),
        () => document.removeEventListener(`pointerdown`, e)
      );
    }));
  let Ce = () => T.current?.contains(document.activeElement) ?? false,
    G = (t: number) => {
      let n = models[t];
      n && (fe(n.id), n.id !== O && onChange?.(n.id), V(false, Ce() ? `trigger` : void 0));
    },
    we: React.MouseEventHandler<HTMLButtonElement> = () => {
      (me(!k), onThinkingChange?.(!k));
    },
    Te: React.MouseEventHandler<HTMLButtonElement> = () => {
      (ge(!A), onWebSearchChange?.(!A));
    },
    K = (e: Effort) => {
      (ve(e), e !== j && onEffortChange?.(e));
    },
    Ee: React.KeyboardEventHandler<HTMLButtonElement> = (e) => {
      (e.key === `ArrowDown` || e.key === `ArrowUp`) && (e.preventDefault(), V(true, `list`));
    },
    q: React.KeyboardEventHandler<HTMLDivElement> = (t) => {
      let n = models.length;
      if (!n) return;
      let r = (e: number) => {
        (t.preventDefault(), I(((e % n) + n) % n), R(true));
      };
      t.key === `ArrowDown`
        ? r(F + 1)
        : t.key === `ArrowUp`
          ? r(F - 1)
          : t.key === `Home`
            ? r(0)
            : t.key === `End`
              ? r(n - 1)
              : (t.key === `Enter` || t.key === ` `) && (t.preventDefault(), G(F));
    },
    De: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
      let t = valueValue.findIndex((e) => e.id === j),
        n =
          e.key === `ArrowRight` || e.key === `ArrowDown`
            ? 1
            : e.key === `ArrowLeft` || e.key === `ArrowUp`
              ? -1
              : 0;
      if (!n) return;
      e.preventDefault();
      let r = valueValue[(t + n + valueValue.length) % valueValue.length];
      (K(r.id), T.current?.querySelector<HTMLElement>(`[data-effort="${r.id}"]`)?.focus());
    },
    Oe: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
      e.key === `Escape` && M && (e.stopPropagation(), V(false, `trigger`));
    },
    ke = k ? valueValue2[j] : 1,
    J = (B?.latencyMs ?? 0) * ke,
    Y = B?.pricePerM ?? 0,
    X = valueValue9(
      {
        latency: J,
        price: Y,
      },
      560,
    ),
    Ae = B?.latencyMs !== void 0 || B?.pricePerM !== void 0,
    Z,
    Q,
    $;
  if (xe === `search`)
    ((Z = A ? `Looks things up on the web when it helps` : `Answers from what it already knows`),
      (Q = `search-${A}`),
      ($ = Z));
  else if (!Ae)
    ((Z = B?.description ?? B?.name ?? ``), (Q = `plain-${B?.id}`), ($ = `${B?.name ?? ``}: ${Z}`));
  else {
    let e = [],
      t = [];
    (B.latencyMs !== void 0 &&
      (e.push(
        <span key={`l`}>
          {`~`}
          <b>{valueValue7(X.latency ?? J)}</b>
          {` first token`}
        </span>,
      ),
      t.push(`about ${valueValue7(J)} to the first token`)),
      B.pricePerM !== void 0 &&
        (e.push(
          <span key={`p`}>
            <b>{valueValue8(X.price ?? Y, Y)}</b>
            {` / M tokens`}
          </span>,
        ),
        t.push(`${valueValue8(Y, Y)} per million tokens`)),
      (Z = e.flatMap((e, t) =>
        t ? [<span className={`ui-mdp__dot`} key={`d${t}`}>{` · `}</span>, e] : [e],
      )),
      (Q = `stats`),
      ($ = `${B.name}: ${t.join(`, `)}`));
  }
  let je = models[F] ? `${w}-opt-${models[F].id}` : void 0;
  return (
    <div
      ref={T}
      className={[`ui-mdp`, className].filter(Boolean).join(` `)}
      data-open={M ? `` : void 0}
      data-align={align}
      data-side={side}
      onKeyDown={Oe}
      onBlur={(e) => {
        M && e.relatedTarget && !T.current?.contains(e.relatedTarget) && V(false);
      }}
    >
      <style href={`ui-model-picker`} precedence={`default`}>
        {valueValue11}
      </style>
      <button
        ref={E}
        type={`button`}
        className={`ui-mdp__trigger`}
        aria-haspopup={`dialog`}
        aria-expanded={M}
        aria-controls={`${w}-menu`}
        aria-label={`Model: ${P?.name ?? `none`}${k ? `, extended thinking` : ``}`}
        onClick={() => V(!M, M ? void 0 : `list`)}
        onKeyDown={Ee}
      >
        {P && <Icong model={P} />}
        <span className={`ui-mdp__name`}>
          <Iconp id={P?.id ?? `none`}>{P?.name ?? `Choose a model`}</Iconp>
        </span>
        <span className={`ui-mdp__flag`} data-on={k ? `` : void 0} aria-hidden={`true`}>
          <span>
            <Iconh />
          </span>
        </span>
        <Iconee />
      </button>
      <div
        id={`${w}-menu`}
        ref={U}
        className={`ui-mdp__pop`}
        style={
          W
            ? {
                translate: `${W}px 0`,
              }
            : void 0
        }
        role={`dialog`}
        aria-label={`Model settings`}
        inert={!M}
      >
        <div className={`ui-mdp__card`}>
          <div className={`ui-mdp__head`} aria-hidden={`true`}>
            <span>{`Model`}</span>
            <span className={`ui-mdp__cols`}>
              {valueValue3.map((e) => (
                <span key={e.key}>{e.label}</span>
              ))}
            </span>
          </div>
          <div
            ref={D}
            className={`ui-mdp__list`}
            role={`listbox`}
            aria-label={`Model`}
            tabIndex={0}
            aria-activedescendant={M ? je : void 0}
            data-pointing={L ? `` : void 0}
            onKeyDown={q}
            onPointerLeave={() => R(false)}
          >
            {models.map((e, t) => {
              let n = e.speed !== void 0 || e.quality !== void 0 || e.cost !== void 0;
              return (
                <div
                  id={`${w}-opt-${e.id}`}
                  role={`option`}
                  aria-selected={t === N}
                  aria-label={`${e.name}${e.description ? `, ${e.description}` : ``}${n ? `. Speed ${e.speed ?? 0}, quality ${e.quality ?? 0}, cost ${e.cost ?? 0} of 5` : ``}`}
                  className={`ui-mdp__option`}
                  data-active={t === F ? `` : void 0}
                  data-lit={e.id === B?.id ? `` : void 0}
                  onPointerEnter={(e) => {
                    e.pointerType === `mouse` && (I(t), R(true));
                  }}
                  onClick={() => G(t)}
                  key={e.id}
                >
                  <Icong model={e} />
                  <span className={`ui-mdp__text`}>
                    <span className={`ui-mdp__title`}>
                      <span className={`ui-mdp__title-name`}>{e.name}</span>
                      {t === N && <Iconte />}
                    </span>
                    {e.description && <span className={`ui-mdp__desc`}>{e.description}</span>}
                  </span>
                  {n ? (
                    <span className={`ui-mdp__bars`} aria-hidden={`true`}>
                      {valueValue3.map((t, n) => {
                        let i = valueValue6(e[t.key] ?? 0);
                        return (
                          <span
                            className={`ui-mdp__meter`}
                            style={
                              {
                                "--c": n,
                              } as React.CSSProperties
                            }
                            key={t.key}
                          >
                            {[0, 1, 2, 3, 4].map((e) => (
                              <span
                                className={`ui-mdp__seg`}
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
                    <span className={`ui-mdp__varies`} aria-hidden={`true`}>{`Varies`}</span>
                  )}
                </div>
              );
            })}
          </div>
          <div className={`ui-mdp__settings`}>
            <button
              type={`button`}
              role={`switch`}
              aria-checked={k}
              className={`ui-mdp__toggle`}
              onClick={we}
            >
              <span className={`ui-mdp__toggle-icon`}>
                <Iconh />
              </span>
              <span className={`ui-mdp__toggle-label`}>{`Extended thinking`}</span>
              <span className={`ui-mdp__switch`} aria-hidden={`true`} />
            </button>
            <div className={`ui-mdp__fold`} data-open={k ? `` : void 0} inert={!k}>
              <div className={`ui-mdp__clip`}>
                <div className={`ui-mdp__effort`}>
                  <span className={`ui-mdp__effort-label`} id={`${w}-effort`}>{`Effort`}</span>
                  <div
                    className={`ui-mdp__segmented`}
                    role={`radiogroup`}
                    aria-labelledby={`${w}-effort`}
                    style={
                      {
                        "--i": valueValue.findIndex((e) => e.id === j),
                      } as React.CSSProperties
                    }
                    onKeyDown={De}
                  >
                    <span className={`ui-mdp__thumb`} aria-hidden={`true`} />
                    {valueValue.map((e) => (
                      <button
                        type={`button`}
                        role={`radio`}
                        aria-checked={e.id === j}
                        tabIndex={e.id === j ? 0 : -1}
                        data-effort={e.id}
                        className={`ui-mdp__seg-btn`}
                        onClick={() => K(e.id)}
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
              aria-checked={A}
              className={`ui-mdp__toggle`}
              onClick={Te}
              onPointerEnter={(e) => e.pointerType === `mouse` && z(`search`)}
              onPointerLeave={() => z(null)}
              onFocus={() => z(`search`)}
              onBlur={() => z(null)}
            >
              <span className={`ui-mdp__toggle-icon`}>
                <Iconne />
              </span>
              <span className={`ui-mdp__toggle-label`}>{`Web search`}</span>
              <span className={`ui-mdp__switch`} aria-hidden={`true`} />
            </button>
          </div>
        </div>
        <div className={`ui-mdp__foot`}>
          <span className={`ui-mdp__caption`} aria-hidden={`true`}>
            <Iconp id={Q}>{Z}</Iconp>
          </span>
          <span className={`ui-mdp__keys`} aria-hidden={`true`}>
            <kbd>{`↑↓`}</kbd>
            <kbd>{`↵`}</kbd>
          </span>
          <span className={`ui-mdp__sr`} aria-live={`polite`}>
            {M ? $ : ``}
          </span>
        </div>
      </div>
    </div>
  );
}
var valueValue11 = `
.ui-mdp {
  --ui-mdp-tray: #f0f0f0;
  --ui-mdp-card: #ffffff;
  --ui-mdp-line: #ececec;
  --ui-mdp-ink: #171717;
  --ui-mdp-text: #404040;
  --ui-mdp-muted: #8f8f8f;
  --ui-mdp-well: #f4f4f5;
  --ui-mdp-bar: #d4d4d9;
  --ui-mdp-bar-off: #e6e6ea;
  --ui-mdp-switch: #dcdce0;
  --ui-mdp-knob: #ffffff;
  --ui-mdp-focus: rgba(23, 23, 23, 0.22);
  --ui-mdp-ease: cubic-bezier(0.32, 0.72, 0.24, 1);
  position: relative;
  display: inline-block;
  font-family: "Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  font-size: 13px;
  line-height: 20px;
  color: var(--ui-mdp-text);
  text-align: left;
  -webkit-font-smoothing: antialiased;
}
.ui-mdp *, .ui-mdp *::before, .ui-mdp *::after { box-sizing: border-box; }
:where(.ui-mdp) button { margin: 0; padding: 0; border: 0; background: none; font: inherit; color: inherit; text-align: inherit; cursor: pointer; -webkit-tap-highlight-color: transparent; }
.ui-mdp button:focus-visible, .ui-mdp__list:focus-visible { outline: 2px solid var(--ui-mdp-focus); outline-offset: 2px; }
.ui-mdp svg { display: block; flex: none; }
.ui-mdp b { font-weight: 500; color: var(--ui-mdp-ink); }
.ui-mdp__sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }

/* ----- Trigger ----- */
.ui-mdp__trigger { display: inline-flex; align-items: center; gap: 7px; max-width: 100%; height: 30px; padding: 0 8px 0 6px; border-radius: 10px; font-weight: 500; color: var(--ui-mdp-ink); white-space: nowrap; transition: background-color 160ms ease; }
.ui-mdp__trigger:hover, .ui-mdp[data-open] .ui-mdp__trigger { background: var(--ui-mdp-well); }
.ui-mdp__trigger .ui-mdp__glyph { width: 18px; height: 18px; }
.ui-mdp__name { display: grid; min-width: 0; }
.ui-mdp__chevron { color: var(--ui-mdp-muted); transition: transform 300ms var(--ui-mdp-ease); }
.ui-mdp[data-open] .ui-mdp__chevron { transform: rotate(180deg); }
.ui-mdp__flag { display: grid; grid-template-columns: 0fr; margin-left: -7px; opacity: 0; color: var(--ui-mdp-muted); transition: grid-template-columns 360ms var(--ui-mdp-ease), margin 360ms var(--ui-mdp-ease), opacity 220ms ease; }
.ui-mdp__flag > span { min-width: 0; overflow: hidden; }
.ui-mdp__flag[data-on] { grid-template-columns: 1fr; margin-left: -3px; opacity: 1; transition: grid-template-columns 360ms var(--ui-mdp-ease), margin 360ms var(--ui-mdp-ease), opacity 280ms ease 80ms; }

.ui-mdp__glyph { display: grid; flex: none; place-items: center; width: 22px; height: 22px; overflow: hidden; border-radius: 6px; background: var(--ui-mdp-card); box-shadow: inset 0 0 0 1px var(--ui-mdp-line); font-size: 10.5px; font-weight: 600; line-height: 1; color: var(--ui-mdp-ink); }
.ui-mdp__glyph > svg, .ui-mdp__glyph > img { width: 12px; height: 12px; }

/* ----- Menu: unfolds softly from the trigger ----- */
.ui-mdp__pop {
  position: absolute;
  z-index: 30;
  top: calc(100% + 6px);
  left: 0;
  width: min(320px, calc(100vw - 32px));
  container-type: inline-size;
  padding: 4px;
  border-radius: 20px;
  background: var(--ui-mdp-tray);
  box-shadow: 0 12px 32px -12px rgba(0, 0, 0, 0.16), 0 2px 6px rgba(0, 0, 0, 0.04);
  transform-origin: top left;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-4px) scale(0.96);
  transition: opacity 160ms ease, transform 220ms var(--ui-mdp-ease), visibility 0s linear 220ms;
}
.ui-mdp[data-align="end"] .ui-mdp__pop { left: auto; right: 0; transform-origin: top right; }
.ui-mdp[data-side="top"] .ui-mdp__pop { top: auto; bottom: calc(100% + 6px); transform-origin: bottom left; transform: translateY(4px) scale(0.96); }
.ui-mdp[data-side="top"][data-align="end"] .ui-mdp__pop { transform-origin: bottom right; }
.ui-mdp[data-open] .ui-mdp__pop { opacity: 1; visibility: visible; transform: none; transition: opacity 200ms ease, transform 320ms var(--ui-mdp-ease), visibility 0s; }

.ui-mdp__card { padding: 6px; border-radius: 16px; background: var(--ui-mdp-card); box-shadow: 0 0 0 1px var(--ui-mdp-line), 0 1px 2px rgba(0, 0, 0, 0.04); }
.ui-mdp__head { display: flex; align-items: center; justify-content: space-between; gap: 12px; height: 24px; padding: 0 10px; font-size: 11px; line-height: 16px; color: var(--ui-mdp-muted); }
.ui-mdp__cols { display: grid; grid-template-columns: repeat(3, 34px); gap: 8px; }
.ui-mdp__cols > span { display: flex; justify-content: center; white-space: nowrap; }

/* ----- Rows ----- */
.ui-mdp__list { display: grid; gap: 1px; border-radius: 10px; }
.ui-mdp__option { display: flex; align-items: center; gap: 10px; min-height: 48px; padding: 6px 10px; border-radius: 10px; cursor: pointer; transition: background-color 160ms ease, opacity 220ms ease; }
.ui-mdp__list[data-pointing] .ui-mdp__option[data-active] { background: var(--ui-mdp-well); }
.ui-mdp__list:focus-visible { outline: none; }
.ui-mdp__list:focus-visible .ui-mdp__option[data-active] { background: var(--ui-mdp-well); box-shadow: inset 0 0 0 1.5px var(--ui-mdp-focus); }
.ui-mdp__list[data-pointing] .ui-mdp__option:not([data-active]) { opacity: 0.5; }
.ui-mdp__text { display: grid; flex: 1; min-width: 0; }
.ui-mdp__title { display: flex; align-items: center; gap: 4px; min-width: 0; font-weight: 500; color: var(--ui-mdp-ink); }
.ui-mdp__title-name { min-width: 0; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }
.ui-mdp__check { color: var(--ui-mdp-ink); animation: ui-mdp-pop 320ms var(--ui-mdp-ease) both; }
.ui-mdp__desc { overflow: hidden; font-size: 12px; line-height: 17px; color: var(--ui-mdp-muted); white-space: nowrap; text-overflow: ellipsis; }

/* Strength bars: five small segments each. The lit row fills them one after another */
.ui-mdp__bars { display: grid; flex: none; grid-template-columns: repeat(3, 34px); gap: 8px; }
.ui-mdp__meter { display: grid; grid-template-columns: repeat(5, 1fr); gap: 2px; height: 5px; }
.ui-mdp__seg { border-radius: 1.5px; background: var(--ui-mdp-bar-off); transition: background-color 180ms ease, transform 260ms var(--ui-mdp-ease); }
.ui-mdp__seg[data-on] { background: var(--ui-mdp-bar); }
.ui-mdp__option[data-lit] .ui-mdp__seg[data-on] { background: var(--ui-mdp-ink); transition-delay: calc(var(--c) * 70ms + var(--s) * 45ms); animation: ui-mdp-fill 360ms var(--ui-mdp-ease) both; animation-delay: calc(var(--c) * 70ms + var(--s) * 45ms); }
.ui-mdp__varies { flex: none; width: 118px; font-size: 11.5px; color: var(--ui-mdp-muted); text-align: center; }

/* ----- Switches and effort ----- */
.ui-mdp__settings { margin-top: 6px; padding-top: 6px; border-top: 1px solid var(--ui-mdp-line); }
.ui-mdp__toggle { display: flex; align-items: center; gap: 10px; width: 100%; height: 34px; padding: 0 10px; border-radius: 10px; color: var(--ui-mdp-text); transition: background-color 160ms ease; }
.ui-mdp__toggle:hover { background: var(--ui-mdp-well); }
.ui-mdp__toggle-icon { display: grid; flex: none; place-items: center; width: 22px; color: var(--ui-mdp-muted); transition: color 200ms ease; }
.ui-mdp__toggle[aria-checked="true"] .ui-mdp__toggle-icon { color: var(--ui-mdp-ink); }
.ui-mdp__toggle-label { flex: 1; min-width: 0; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }
.ui-mdp__switch { position: relative; flex: none; width: 28px; height: 16px; border-radius: 8px; background: var(--ui-mdp-switch); transition: background-color 220ms ease; }
.ui-mdp__switch::after { content: ""; position: absolute; top: 2px; left: 2px; width: 12px; height: 12px; border-radius: 50%; background: var(--ui-mdp-knob); box-shadow: 0 1px 2px rgba(0, 0, 0, 0.18); transition: transform 280ms var(--ui-mdp-ease); }
.ui-mdp__toggle[aria-checked="true"] .ui-mdp__switch { background: var(--ui-mdp-ink); }
.ui-mdp__toggle[aria-checked="true"] .ui-mdp__switch::after { transform: translateX(12px); }

.ui-mdp__fold { display: grid; grid-template-rows: 0fr; opacity: 0; transition: grid-template-rows 420ms var(--ui-mdp-ease), opacity 220ms ease; }
.ui-mdp__fold[data-open] { grid-template-rows: 1fr; opacity: 1; transition: grid-template-rows 420ms var(--ui-mdp-ease), opacity 320ms ease 100ms; }
.ui-mdp__clip { min-height: 0; overflow: hidden; }
.ui-mdp__effort { display: flex; align-items: center; gap: 10px; padding: 2px 10px 6px 42px; }
.ui-mdp__effort-label { flex: 1; min-width: 0; font-size: 12.5px; color: var(--ui-mdp-muted); }
.ui-mdp__segmented { position: relative; display: grid; flex: none; grid-template-columns: repeat(3, 58px); padding: 2px; border-radius: 9px; background: var(--ui-mdp-well); box-shadow: inset 0 0 0 1px var(--ui-mdp-line); }
.ui-mdp__thumb { position: absolute; top: 2px; bottom: 2px; left: 2px; width: 58px; border-radius: 7px; background: var(--ui-mdp-card); box-shadow: 0 0 0 1px var(--ui-mdp-line), 0 1px 2px rgba(0, 0, 0, 0.06); transform: translateX(calc(var(--i) * 100%)); transition: transform 320ms var(--ui-mdp-ease); }
.ui-mdp__seg-btn { position: relative; height: 24px; border-radius: 7px; font-size: 12px; font-weight: 500; color: var(--ui-mdp-muted); text-align: center !important; transition: color 200ms ease; }
.ui-mdp__seg-btn[aria-checked="true"] { color: var(--ui-mdp-ink); }
.ui-mdp__seg-btn:hover { color: var(--ui-mdp-ink); }

/* ----- Tray ----- */
.ui-mdp__foot { display: flex; align-items: center; gap: 8px; height: 38px; padding: 4px 8px 0 12px; }
.ui-mdp__caption { flex: 1; min-width: 0; overflow: hidden; font-size: 12.5px; color: var(--ui-mdp-muted); white-space: nowrap; font-variant-numeric: tabular-nums; }
.ui-mdp__dot { color: var(--ui-mdp-muted); }
.ui-mdp__swap { display: grid; min-width: 0; }
.ui-mdp__swap-item { grid-area: 1 / 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; animation: ui-mdp-swap-in 320ms ease both; }
.ui-mdp__swap-item[data-out] { animation: ui-mdp-swap-out 220ms ease both; }
.ui-mdp__keys { display: flex; flex: none; gap: 3px; }
.ui-mdp__keys kbd { display: grid; place-items: center; min-width: 20px; height: 18px; padding: 0 4px; border-radius: 5px; background: var(--ui-mdp-card); box-shadow: 0 0 0 1px var(--ui-mdp-line); font-family: inherit; font-size: 10.5px; line-height: 1; color: var(--ui-mdp-muted); }

@keyframes ui-mdp-swap-in { from { opacity: 0; filter: blur(2px); } }
@keyframes ui-mdp-swap-out { from { opacity: 1; } to { opacity: 0; filter: blur(2px); } }
@keyframes ui-mdp-pop { from { opacity: 0; transform: scale(0.6); } }
@keyframes ui-mdp-fill { 0% { transform: scaleY(1); } 45% { transform: scaleY(1.6); } 100% { transform: scaleY(1); } }

/* Narrow menus: the bars move closer and the glyphs in the rows give way */
@container (max-width: 300px) {
  .ui-mdp__option .ui-mdp__glyph { display: none; }
  .ui-mdp__cols, .ui-mdp__bars { grid-template-columns: repeat(3, 30px); gap: 6px; }
  .ui-mdp__varies { width: 102px; }
  .ui-mdp__keys { display: none; }
  .ui-mdp__effort { padding-left: 10px; }
  .ui-mdp__segmented { grid-template-columns: repeat(3, 52px); }
  .ui-mdp__thumb { width: 52px; }
}

@media (pointer: coarse) {
  .ui-mdp__trigger { height: 36px; }
  .ui-mdp__option { min-height: 54px; }
  .ui-mdp__toggle { height: 42px; }
  .ui-mdp__seg-btn { height: 30px; }
  .ui-mdp__keys { display: none; }
}

@media (prefers-reduced-motion: reduce) {
  .ui-mdp *, .ui-mdp *::before, .ui-mdp *::after { animation: none !important; transition: none !important; }
}

/* Dark mode: follows a .dark class or data-theme="dark" on any ancestor, e.g. <html> */
:where(.dark, [data-theme="dark"]) .ui-mdp {
  --ui-mdp-tray: #111113;
  --ui-mdp-card: #19191b;
  --ui-mdp-line: #2a2a2e;
  --ui-mdp-ink: #ededed;
  --ui-mdp-text: #c8c8cc;
  --ui-mdp-muted: #8b8b92;
  --ui-mdp-well: #222225;
  --ui-mdp-bar: #55555c;
  --ui-mdp-bar-off: #303035;
  --ui-mdp-switch: #3a3a40;
  --ui-mdp-knob: #ededed;
  --ui-mdp-focus: rgba(255, 255, 255, 0.3);
}
:where(.dark, [data-theme="dark"]) .ui-mdp__pop { box-shadow: 0 0 0 1px #222225, 0 12px 32px -12px rgba(0, 0, 0, 0.6); }
:where(.dark, [data-theme="dark"]) .ui-mdp__toggle[aria-checked="true"] .ui-mdp__switch::after { background: #19191b; }
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
function ModelPickerDemo2() {
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
      r = (e: number) => t(`.ui-mdp__option:nth-child(${e})`),
      a = (e: number) => () => n(r(e), `pointerover`),
      l = () =>
        n(t(`.ui-mdp__option[data-active]`), `pointerout`, {
          relatedTarget: t(`.ui-mdp__settings`),
        }),
      u: [number, () => void][] = [
        [700, () => o(true)],
        [800, a(1)],
        [2800, a(3)],
        [1200, a(1)],
        [
          1300,
          () => {
            (l(), t(`.ui-mdp__toggle`)?.click());
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
      className={`mdp-demo`}
      onPointerEnter={l}
      onPointerDownCapture={l}
      onKeyDownCapture={l}
      onFocusCapture={l}
      onClick={(e) => (e.target as HTMLElement).closest(`.ui-mdp__pop`) && e.stopPropagation()}
    >
      <div className={`mdp-demo__composer`}>
        <div className={`mdp-demo__text`}>{`Ask anything…`}</div>
        <div className={`mdp-demo__bar`}>
          <ModelPicker
            models={valueValue12}
            defaultValue={`sonnet`}
            open={a}
            onOpenChange={o}
            key={t}
          />
          <span className={`mdp-demo__send`} aria-hidden={`true`}>
            <svg width={`14`} height={`14`} viewBox={`0 0 14 14`} fill={`none`}>
              <path
                d={`M7 11.5v-9M3.2 6.3 7 2.5l3.8 3.8`}
                stroke={`currentColor`}
                strokeWidth={`1.6`}
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
function ModelPickerDemo(props: React.JSX.IntrinsicAttributes) {
  return (
    <>
      <style href="plico-demo-model-picker" precedence="default">
        {demoStyles}
      </style>
      <ModelPickerDemo2 {...props} />
    </>
  );
}
export { ModelPicker as Component };
export { ModelPickerDemo as Demo };
export { ModelPicker };
export { ModelPickerDemo };
export default ModelPicker;

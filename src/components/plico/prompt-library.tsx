"use client";

import * as React from "react";
export interface PromptTemplate {
  id: string;
  title: string;
  category?: string;
  body: string;
  variables?: Partial<
    Record<string, { description?: string; default?: string }>
  >;
  tone?: string;
  description?: string;
}
interface PromptLibraryProps {
  templates: PromptTemplate[];
  value?: string;
  defaultValue?: string;
  onSelect?: (id: string) => void;
  onUse?: (
    prompt: string,
    template: PromptTemplate,
    values: Record<string, string>,
  ) => void;
  onCopy?: (prompt: string) => void;
  title?: string;
  useLabel?: string;
  className?: string;
}
var valueValue = [`blue`, `violet`, `amber`, `green`, `red`, `gray`];
var valueValue2 = /\{([A-Za-z0-9_-]+)\}/g;
var valueValue3 = (e: string) => {
  let t = [],
    n = 0;
  for (let r of e.matchAll(valueValue2)) {
    r.index > n &&
      t.push({
        text: e.slice(n, r.index),
      });
    let i = r.index + r[0].length,
      a = /^[.,;:!?)\]"'’…]+/.exec(e.slice(i))?.[0] ?? ``;
    (t.push({
      name: r[1],
      tail: a,
    }),
      (n = i + a.length));
  }
  return (
    n < e.length &&
      t.push({
        text: e.slice(n),
      }),
    t
  );
};
var valueValue4 = (e: string) => [
  ...new Set([...e.matchAll(valueValue2)].map((e) => e[1])),
];
var valueValue5 = (e: string, t: Record<string, string>) =>
  e.replace(valueValue2, (e, n) => (t[n]?.trim() ? t[n] : e));
var valueValue6 = (e: string) => Math.max(1, Math.round(e.length / 4));
var valueValue7 = (e: PromptTemplate) => {
  let t: Record<string, string> = {};
  for (let n of valueValue4(e.body)) t[n] = e.variables?.[n]?.default ?? ``;
  return t;
};
var valueValue8 = (e: number) => 1 - (1 - e) ** 4;
var valueValue9 = () =>
  typeof window < `u` &&
  window.matchMedia(`(prefers-reduced-motion: reduce)`).matches;
function ViewP(e: number, t: number) {
  let [r, i] = React.useState(e),
    a = React.useRef(e);
  return (
    React.useEffect(() => {
      let n = a.current;
      if (valueValue9() || n === e) {
        ((a.current = e), i(e));
        return;
      }
      let r = performance.now(),
        o = 0,
        s = (c: number) => {
          let l = Math.min(1, (c - r) / t);
          ((a.current = n + (e - n) * valueValue8(l)),
            i(a.current),
            l < 1 && (o = requestAnimationFrame(s)));
        };
      return ((o = requestAnimationFrame(s)), () => cancelAnimationFrame(o));
    }, [e, t]),
    r
  );
}
function Iconm({
  id: id,
  tone: tone,
  children: children,
}: {
  id: string;
  tone: string | undefined;
  children: React.ReactNode;
}) {
  let a = React.useRef({
      id: id,
      tone: tone,
      node: children,
    }),
    [o, s] = React.useState(id),
    [c, l] = React.useState<{
      id: string;
      tone: string | undefined;
      node: React.ReactNode;
    } | null>(null);
  return (
    o !== id && (s(id), l(a.current)),
    (a.current = {
      id: id,
      tone: tone,
      node: children,
    }),
    React.useEffect(() => {
      if (!c) return;
      let e = window.setTimeout(() => l(null), 260);
      return () => window.clearTimeout(e);
    }, [c]),
    (
      <span className={`ui-pli__swap`}>
        {c && (
          <span
            className={`ui-pli__swap-item`}
            data-out={``}
            data-tone={c.tone}
            aria-hidden={`true`}
            key={`out-${c.id}`}
          >
            {c.node}
          </span>
        )}
        <span className={`ui-pli__swap-item`} data-tone={tone} key={id}>
          {children}
        </span>
      </span>
    )
  );
}
var valueValue10: React.SVGAttributes<SVGElement> = {
  stroke: `currentColor`,
  strokeWidth: 1.4,
  strokeLinecap: `round`,
  strokeLinejoin: `round`,
};
var Icong = () => (
  <svg
    width={`13`}
    height={`13`}
    viewBox={`0 0 13 13`}
    fill={`none`}
    aria-hidden={`true`}
  >
    <circle cx={`5.8`} cy={`5.8`} r={`3.8`} {...valueValue10} />
    <path d={`m8.6 8.6 2.4 2.4`} {...valueValue10} />
  </svg>
);
var Iconee = () => (
  <svg
    width={`12`}
    height={`12`}
    viewBox={`0 0 12 12`}
    fill={`none`}
    aria-hidden={`true`}
  >
    <rect
      x={`3.8`}
      y={`3.8`}
      width={`6.4`}
      height={`6.4`}
      rx={`1.6`}
      {...valueValue10}
    />
    <path
      d={`M8.2 3.6V3.2A1.4 1.4 0 0 0 6.8 1.8H3.2a1.4 1.4 0 0 0-1.4 1.4v3.6a1.4 1.4 0 0 0 1.4 1.4h.4`}
      {...valueValue10}
    />
  </svg>
);
var Iconte = () => (
  <svg
    width={`12`}
    height={`12`}
    viewBox={`0 0 12 12`}
    fill={`none`}
    aria-hidden={`true`}
  >
    <path d={`m2.6 6.3 2.2 2.2 4.6-5`} {...valueValue10} strokeWidth={1.6} />
  </svg>
);
var Iconne = () => (
  <svg
    width={`12`}
    height={`12`}
    viewBox={`0 0 12 12`}
    fill={`none`}
    aria-hidden={`true`}
  >
    <path d={`M2.5 6h7M6.5 3l3 3-3 3`} {...valueValue10} />
  </svg>
);
function View_({
  template: template,
  tone: tone,
  values: values,
  flash: flash,
  idBase: idBase,
  onChange: onChange,
  onHint: onHint,
  onEnter: onEnter,
  out: out,
}: {
  template: PromptTemplate;
  tone: string;
  values: Record<string, string>;
  flash: { name: string; n: number } | null;
  idBase: string;
  onChange?: (name: string, value: string) => void;
  onHint?: (name: string | null) => void;
  onEnter?: (name: string) => void;
  out?: boolean;
}) {
  let p = valueValue3(template.body),
    m = valueValue4(template.body),
    h = m.filter((e) => values[e]?.trim()).length,
    g = (e: string) =>
      flash && flash.name === e ? (flash.n % 2 ? `a` : `b`) : void 0;
  return (
    <div
      className={`ui-pli__panel`}
      data-out={out ? `` : void 0}
      aria-hidden={out || void 0}
      inert={out}
    >
      <div className={`ui-pli__panel-head`}>
        <span className={`ui-pli__panel-title`}>{template.title}</span>
        {template.category && (
          <span className={`ui-pli__tag`} data-tone={tone}>
            {template.category}
          </span>
        )}
        {m.length > 0 && (
          <span className={`ui-pli__count`}>
            <span className={`ui-pli__bars`} aria-hidden={`true`}>
              {m.map((e) => (
                <span
                  className={`ui-pli__bar`}
                  data-on={values[e]?.trim() ? `` : void 0}
                  key={e}
                />
              ))}
            </span>
            {h}
            {` of `}
            {m.length}
            {` filled`}
          </span>
        )}
      </div>
      <p className={`ui-pli__body`}>
        {p.map((t, a) =>
          `text` in t ? (
            <React.Fragment key={a}>{t.text}</React.Fragment>
          ) : (
            <span className={`ui-pli__glue`} key={a}>
              <span
                className={`ui-pli__token`}
                data-filled={values[t.name]?.trim() ? `` : void 0}
                data-flash={g(t.name)}
                onPointerEnter={(e) =>
                  e.pointerType === `mouse` && onHint?.(t.name)
                }
                onPointerLeave={(e) =>
                  e.pointerType === `mouse` && onHint?.(null)
                }
              >
                <span className={`ui-pli__sizer`} aria-hidden={`true`}>
                  {values[t.name] || t.name}
                </span>
                <input
                  className={`ui-pli__input`}
                  data-var={t.name}
                  size={1}
                  value={values[t.name] ?? ``}
                  placeholder={t.name}
                  aria-label={
                    template.variables?.[t.name]?.description
                      ? `${t.name} – ${template.variables[t.name]!.description}`
                      : t.name
                  }
                  spellCheck={false}
                  autoComplete={`off`}
                  onChange={(e) => onChange?.(t.name, e.target.value)}
                  onFocus={() => onHint?.(t.name)}
                  onBlur={() => onHint?.(null)}
                  onKeyDown={(e) => {
                    e.key === `Enter` &&
                      (e.preventDefault(), onEnter?.(t.name));
                  }}
                />
              </span>
              {t.tail}
            </span>
          ),
        )}
      </p>
      <div
        className={`ui-pli__label`}
        id={`${idBase}-preview`}
      >{`Preview`}</div>
      <div
        className={`ui-pli__preview`}
        aria-labelledby={`${idBase}-preview`}
        role={`region`}
      >
        {p.map((e, t) =>
          `text` in e ? (
            <React.Fragment key={t}>{e.text}</React.Fragment>
          ) : (
            <span className={`ui-pli__glue`} key={t}>
              {values[e.name]?.trim() ? (
                <span className={`ui-pli__fill`} data-flash={g(e.name)}>
                  {values[e.name]}
                </span>
              ) : (
                <span className={`ui-pli__hole`}>{`{${e.name}}`}</span>
              )}
              {e.tail}
            </span>
          ),
        )}
      </div>
    </div>
  );
}
function PromptLibrary({
  templates: templates,
  value: value,
  defaultValue: defaultValue,
  onSelect: onSelect,
  onUse: onUse,
  onCopy: onCopy,
  title = `Prompts`,
  useLabel = `Use prompt`,
  className: className,
}: PromptLibraryProps) {
  let x = React.useId(),
    [S, ie] = React.useState(defaultValue ?? templates[0]?.id),
    ae = value ?? S,
    C = templates.find((e) => e.id === ae) ?? templates[0],
    [w, T] = React.useState<string>(``),
    [oe, se] = React.useState<Record<string, Record<string, string>>>({}),
    E = (e: PromptTemplate) => ({
      ...valueValue7(e),
      ...oe[e.id],
    }),
    [ce, D] = React.useState<{ name: string; n: number } | null>(null),
    [O, k] = React.useState<string | null>(null),
    [le, A] = React.useState(false),
    [j, M] = React.useState<{
      id: number;
      kind: string;
    } | null>(null),
    [N, P] = React.useState(``),
    F = (() => {
      let t = new Map<string, string>();
      for (let n of templates)
        n.category &&
          !t.has(n.category) &&
          t.set(n.category, valueValue[t.size % valueValue.length]);
      return (e: PromptTemplate) => e.tone ?? t.get(e.category ?? ``) ?? `gray`;
    })(),
    I = w.trim().toLowerCase(),
    L = I
      ? templates.filter((e) =>
          [e.title, e.category ?? ``, e.body].some((e) =>
            e.toLowerCase().includes(I),
          ),
        )
      : templates,
    R = (e: string) => {
      e !== ae && (value === void 0 && ie(e), onSelect?.(e));
    },
    [z, B] = React.useState<{
      id: string;
      key: number;
    } | null>(null),
    [V, ue] = React.useState(C?.id);
  (C &&
    V !== C.id &&
    (V &&
      !valueValue9() &&
      B({
        id: V,
        key: Date.now(),
      }),
    ue(C.id),
    k(null),
    D(null)),
    React.useEffect(() => {
      if (!z) return;
      let e = window.setTimeout(() => B(null), 260);
      return () => window.clearTimeout(e);
    }, [z]));
  let H = z ? templates.find((e) => e.id === z.id) : void 0,
    U = React.useRef<HTMLDivElement | null>(null),
    W = React.useRef(new Map()),
    [G, de] = React.useState({
      y: 0,
      h: 0,
      on: false,
      moved: false,
    }),
    fe = L.map((e) => e.id).join(`|`);
  React.useLayoutEffect(() => {
    let e = () => {
      let e = C ? W.current.get(C.id) : void 0;
      de((t) =>
        e
          ? {
              y: e.offsetTop,
              h: e.offsetHeight,
              on: true,
              moved: t.on,
            }
          : {
              ...t,
              on: false,
              moved: false,
            },
      );
    };
    e();
    let t = U.current;
    if (!t || typeof ResizeObserver > `u`) return;
    let n = new ResizeObserver(e);
    return (n.observe(t), () => n.disconnect());
  }, [C?.id, fe]);
  let pe: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
      if (!L.length) return;
      let t = L.findIndex((e) => e.id === C?.id),
        n = -1;
      if (e.key === `ArrowDown`) n = t < 0 ? 0 : Math.min(L.length - 1, t + 1);
      else if (e.key === `ArrowUp`)
        n = t < 0 ? L.length - 1 : Math.max(0, t - 1);
      else if (e.key === `Home`) n = 0;
      else if (e.key === `End`) n = L.length - 1;
      else return;
      (e.preventDefault(), R(L[n].id), W.current.get(L[n].id)?.focus());
    },
    K = C ? E(C) : {},
    q = C ? valueValue4(C.body) : [],
    J = q.filter((e) => !K[e]?.trim()),
    Y = !!C && J.length === 0,
    X = C ? valueValue5(C.body, K) : ``,
    me = ViewP(valueValue6(X), 420),
    he = (e: string, t: string) => {
      if (!C) return;
      let n = C.id;
      (se((r) => ({
        ...r,
        [n]: {
          ...E(C),
          ...r[n],
          [e]: t,
        },
      })),
        D((t) => ({
          name: e,
          n: (t?.n ?? 0) + 1,
        })));
    },
    [ge, _e] = React.useState(0),
    ve = React.useRef(Y),
    ye = React.useRef(C?.id);
  React.useEffect(() => {
    (Y &&
      !ve.current &&
      ye.current === C?.id &&
      (_e((e) => e + 1), P(`All variables filled`)),
      (ve.current = Y),
      (ye.current = C?.id));
  }, [Y, C?.id]);
  let be = React.useRef<HTMLDivElement | null>(null),
    xe = (e: string) => {
      let t = [
          ...(be.current?.querySelectorAll<HTMLInputElement>(
            `.ui-pli__panel:not([data-out]) .ui-pli__input`,
          ) ?? []),
        ],
        n = t.findIndex((t) => t.dataset.var === e),
        r = [...t.slice(n + 1), ...t.slice(0, n)].find((e) => !e.value.trim());
      r ? r.focus() : Y && Ce();
    },
    Se = async () => {
      try {
        await navigator.clipboard?.writeText(X);
      } catch {}
      (onCopy?.(X),
        M({
          id: Date.now(),
          kind: `copied`,
        }),
        P(`Prompt copied`));
    },
    Ce = () => {
      Y &&
        C &&
        (onUse?.(X, C, K),
        M({
          id: Date.now(),
          kind: `used`,
        }),
        P(`${C.title} used`));
    };
  (React.useEffect(() => {
    if (!j) return;
    let e = window.setTimeout(() => M(null), 1800);
    return () => window.clearTimeout(e);
  }, [j]),
    React.useEffect(() => {
      if (!N) return;
      let e = window.setTimeout(() => P(``), 2e3);
      return () => window.clearTimeout(e);
    }, [N]));
  let Z: React.ReactNode = (
      <>
        {`~`}
        {Math.round(me)}
        {` tokens`}
      </>
    ),
    Q = `tokens`,
    we,
    $ = O && q.includes(O) ? O : null;
  if (j)
    ((Z = j.kind === `copied` ? `Copied to clipboard` : `Prompt sent`),
      (Q = `${j.kind}-${j.id}`),
      (we = `ok`));
  else if ($) {
    let e = C?.variables?.[$]?.description;
    ((Z = (
      <>
        <b>{$}</b>
        {` · `}
        {e ?? (K[$]?.trim() ? `filled` : `fill this in`)}
      </>
    )),
      (Q = `hint-${$}`));
  } else le && !Y && ((Z = `Fill ${J.length} more to use`), (Q = `missing`));
  return (
    <div
      ref={be}
      className={[`ui-pli`, className].filter(Boolean).join(` `)}
      role={`group`}
      aria-labelledby={`${x}-title`}
    >
      <style href={`ui-prompt-library`} precedence={`default`}>
        {valueValue11}
      </style>
      <div className={`ui-pli__card`}>
        <div className={`ui-pli__side`}>
          <div className={`ui-pli__side-head`}>
            <span id={`${x}-title`} className={`ui-pli__title`}>
              {title}
            </span>
            <span className={`ui-pli__total`}>{templates.length}</span>
          </div>
          <label className={`ui-pli__search`}>
            <Icong />
            <input
              type={`search`}
              value={w}
              placeholder={`Search templates`}
              aria-label={`Search templates`}
              aria-controls={`${x}-list`}
              onChange={(e) => T(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === `ArrowDown` && L.length) {
                  e.preventDefault();
                  let t = L.find((e) => e.id === C?.id) ?? L[0];
                  (R(t.id), W.current.get(t.id)?.focus());
                } else e.key === `Escape` && w && (e.preventDefault(), T(``));
              }}
            />
          </label>
          <div
            ref={U}
            id={`${x}-list`}
            className={`ui-pli__list`}
            role={`listbox`}
            aria-label={`Templates`}
            onKeyDown={pe}
          >
            <span
              className={`ui-pli__glide`}
              aria-hidden={`true`}
              data-on={G.on ? `` : void 0}
              data-moved={G.moved ? `` : void 0}
              style={{
                transform: `translateY(${G.y}px)`,
                height: G.h,
              }}
            />
            {L.map((e) => {
              let t = e.id === C?.id,
                n = t || (!L.some((e) => e.id === C?.id) && e === L[0]);
              return (
                <div
                  ref={(t) => {
                    t ? W.current.set(e.id, t) : W.current.delete(e.id);
                  }}
                  className={`ui-pli__option`}
                  role={`option`}
                  aria-selected={t}
                  tabIndex={n ? 0 : -1}
                  onClick={() => R(e.id)}
                  onKeyDown={(t) => {
                    (t.key === `Enter` || t.key === ` `) &&
                      (t.preventDefault(), R(e.id));
                  }}
                  key={e.id}
                >
                  <span className={`ui-pli__option-title`}>{e.title}</span>
                  {e.category && (
                    <span className={`ui-pli__tag`} data-tone={F(e)}>
                      {e.category}
                    </span>
                  )}
                </div>
              );
            })}
            {L.length === 0 && (
              <div className={`ui-pli__empty`}>{`No templates match`}</div>
            )}
          </div>
        </div>
        <div className={`ui-pli__main`}>
          {H && (
            <View_
              template={H}
              tone={F(H)}
              values={E(H)}
              flash={null}
              idBase={`${x}-out`}
              out={true}
              key={`out-${z!.key}`}
            />
          )}
          {C && (
            <View_
              template={C}
              tone={F(C)}
              values={K}
              flash={ce}
              idBase={x}
              onChange={he}
              onHint={k}
              onEnter={xe}
              key={C.id}
            />
          )}
        </div>
      </div>
      <div className={`ui-pli__foot`}>
        <span className={`ui-pli__caption`}>
          <Iconm id={Q} tone={we}>
            {Z}
          </Iconm>
        </span>
        <button
          type={`button`}
          className={`ui-pli__copy`}
          onClick={Se}
          aria-label={`Copy prompt`}
          disabled={!C}
        >
          <span
            className={`ui-pli__copy-icon`}
            key={j?.kind === `copied` ? `done` : `copy`}
          >
            {j?.kind === `copied` ? <Iconte /> : <Iconee />}
          </span>
          <span className={`ui-pli__copy-text`}>{`Copy`}</span>
        </button>
        <button
          type={`button`}
          className={`ui-pli__use`}
          aria-disabled={!Y}
          data-pulse={ge ? (ge % 2 ? `a` : `b`) : void 0}
          onClick={Ce}
          onPointerEnter={() => A(true)}
          onPointerLeave={() => A(false)}
          onFocus={() => A(true)}
          onBlur={() => A(false)}
        >
          {useLabel}
          <Iconne />
        </button>
      </div>
      <span className={`ui-pli__sr`} role={`status`} aria-live={`polite`}>
        {N}
      </span>
    </div>
  );
}
var valueValue11 = `
.ui-pli {
  --ui-pli-tray: #f0f0f0;
  --ui-pli-card: #ffffff;
  --ui-pli-line: #ececec;
  --ui-pli-ink: #171717;
  --ui-pli-text: #404040;
  --ui-pli-muted: #8f8f8f;
  --ui-pli-well: #f4f4f5;
  --ui-pli-accent: #2f6bff;
  --ui-pli-accent-ink: #1f55d6;
  --ui-pli-accent-bg: rgba(47, 107, 255, 0.09);
  --ui-pli-accent-flash: rgba(47, 107, 255, 0.24);
  --ui-pli-hole: #b4b4b9;
  --ui-pli-on-ink: #ffffff;
  --ui-pli-ok: #18794e;
  --ui-pli-blue: #2f6bff;
  --ui-pli-blue-bg: rgba(47, 107, 255, 0.1);
  --ui-pli-violet: #6941c6;
  --ui-pli-violet-bg: rgba(105, 65, 198, 0.1);
  --ui-pli-amber: #96590a;
  --ui-pli-amber-bg: rgba(240, 160, 32, 0.14);
  --ui-pli-green: #18794e;
  --ui-pli-green-bg: rgba(34, 160, 90, 0.11);
  --ui-pli-red: #b42318;
  --ui-pli-red-bg: rgba(229, 72, 77, 0.1);
  --ui-pli-gray: #5f5f66;
  --ui-pli-gray-bg: #f0f0f2;
  --ui-pli-focus: rgba(23, 23, 23, 0.22);
  --ui-pli-ease: cubic-bezier(0.32, 0.72, 0.24, 1);
  box-sizing: border-box;
  width: 100%;
  max-width: 640px;
  min-width: 0;
  container-type: inline-size;
  padding: 4px;
  border-radius: 20px;
  background: var(--ui-pli-tray);
  font-family: "Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  font-size: 13px;
  line-height: 20px;
  color: var(--ui-pli-text);
  text-align: left;
  -webkit-font-smoothing: antialiased;
}
.ui-pli *, .ui-pli *::before, .ui-pli *::after { box-sizing: border-box; }
:where(.ui-pli) button { margin: 0; padding: 0; border: 0; background: none; font: inherit; color: inherit; text-align: inherit; cursor: pointer; -webkit-tap-highlight-color: transparent; }
:where(.ui-pli) input { margin: 0; padding: 0; border: 0; background: none; font: inherit; color: inherit; outline: none; }
.ui-pli button:focus-visible, .ui-pli__option:focus-visible { outline: 2px solid var(--ui-pli-focus); outline-offset: 2px; }
.ui-pli svg { display: block; flex: none; }
.ui-pli b { font-weight: 500; color: var(--ui-pli-ink); }
.ui-pli p { margin: 0; }
.ui-pli__sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }

.ui-pli__card { display: grid; grid-template-columns: 220px minmax(0, 1fr); border-radius: 16px; background: var(--ui-pli-card); box-shadow: 0 0 0 1px var(--ui-pli-line), 0 1px 2px rgba(0, 0, 0, 0.04); }

/* ----- List ----- */
.ui-pli__side { min-width: 0; padding: 12px 8px 8px; border-right: 1px solid var(--ui-pli-line); }
.ui-pli__side-head { display: flex; align-items: center; gap: 6px; height: 22px; padding: 0 6px; }
.ui-pli__title { overflow: hidden; font-size: 13px; font-weight: 500; color: var(--ui-pli-text); white-space: nowrap; text-overflow: ellipsis; }
.ui-pli__total { font-size: 12px; color: var(--ui-pli-muted); font-variant-numeric: tabular-nums; }
.ui-pli__search { display: flex; align-items: center; gap: 7px; height: 30px; margin-top: 8px; padding: 0 9px; border-radius: 8px; background: var(--ui-pli-well); color: var(--ui-pli-muted); cursor: text; transition: box-shadow 160ms ease; }
.ui-pli__search:focus-within { box-shadow: 0 0 0 1px var(--ui-pli-line), 0 0 0 3px var(--ui-pli-focus); }
.ui-pli__search input { flex: 1; min-width: 0; height: 100%; font-size: 12.5px; color: var(--ui-pli-ink); -webkit-appearance: none; appearance: none; }
.ui-pli__search input::placeholder { color: var(--ui-pli-muted); }
.ui-pli__search input::-webkit-search-cancel-button { -webkit-appearance: none; }

.ui-pli__list { position: relative; display: flex; flex-direction: column; gap: 2px; margin-top: 6px; }
.ui-pli__glide { position: absolute; top: 0; left: 0; right: 0; border-radius: 9px; background: var(--ui-pli-well); opacity: 0; pointer-events: none; transition: opacity 180ms ease; }
.ui-pli__glide[data-on] { opacity: 1; }
.ui-pli__glide[data-moved] { transition: transform 340ms var(--ui-pli-ease), height 340ms var(--ui-pli-ease), opacity 180ms ease; }
.ui-pli__option { position: relative; display: flex; align-items: center; gap: 8px; height: 34px; padding: 0 6px 0 8px; border-radius: 9px; color: var(--ui-pli-text); cursor: pointer; user-select: none; transition: color 160ms ease; -webkit-tap-highlight-color: transparent; }
.ui-pli__option::before { content: ""; position: absolute; inset: 0; z-index: -1; border-radius: inherit; transition: background-color 160ms ease; }
.ui-pli__list { isolation: isolate; }
.ui-pli__glide { z-index: -1; }
.ui-pli__option:hover:not([aria-selected="true"])::before { background: color-mix(in srgb, var(--ui-pli-well) 55%, transparent); }
.ui-pli__option[aria-selected="true"] { color: var(--ui-pli-ink); }
.ui-pli__option-title { flex: 1; min-width: 0; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }
.ui-pli__empty { height: 34px; padding: 0 8px; font-size: 12.5px; line-height: 34px; color: var(--ui-pli-muted); }

.ui-pli__tag { flex: none; height: 18px; padding: 0 5px; border-radius: 5px; font-size: 11px; font-weight: 500; line-height: 18px; white-space: nowrap; color: var(--ui-pli-gray); background: var(--ui-pli-gray-bg); }
.ui-pli__tag[data-tone="blue"] { color: var(--ui-pli-blue); background: var(--ui-pli-blue-bg); }
.ui-pli__tag[data-tone="violet"] { color: var(--ui-pli-violet); background: var(--ui-pli-violet-bg); }
.ui-pli__tag[data-tone="amber"] { color: var(--ui-pli-amber); background: var(--ui-pli-amber-bg); }
.ui-pli__tag[data-tone="green"] { color: var(--ui-pli-green); background: var(--ui-pli-green-bg); }
.ui-pli__tag[data-tone="red"] { color: var(--ui-pli-red); background: var(--ui-pli-red-bg); }

/* ----- Chosen template: the old one fades out underneath while the new one fades in ----- */
.ui-pli__main { display: grid; min-width: 0; }
.ui-pli__panel { grid-area: 1 / 1; min-width: 0; padding: 12px 14px 14px; animation: ui-pli-in 360ms ease both; }
.ui-pli__panel[data-out] { animation: ui-pli-out 240ms ease both; pointer-events: none; }
.ui-pli__panel-head { display: flex; align-items: center; gap: 8px; min-height: 22px; }
.ui-pli__panel-title { min-width: 0; overflow: hidden; font-size: 13.5px; font-weight: 600; color: var(--ui-pli-ink); white-space: nowrap; text-overflow: ellipsis; }
.ui-pli__count { display: inline-flex; flex: none; align-items: center; gap: 7px; margin-left: auto; font-size: 12px; color: var(--ui-pli-muted); white-space: nowrap; font-variant-numeric: tabular-nums; }
.ui-pli__bars { display: inline-flex; gap: 2px; }
.ui-pli__bar { width: 8px; height: 4px; border-radius: 2px; background: var(--ui-pli-line); transition: background-color 300ms ease; }
.ui-pli__bar[data-on] { background: var(--ui-pli-accent); }

.ui-pli__body { margin-top: 10px !important; font-size: 13px; line-height: 26px; color: var(--ui-pli-text); overflow-wrap: anywhere; }
.ui-pli__glue { white-space: nowrap; }
.ui-pli__preview .ui-pli__glue { white-space: inherit; }
.ui-pli__token { position: relative; display: inline-grid; vertical-align: top; max-width: 100%; height: 22px; margin: 2px 0; padding: 0 6px; border-radius: 6px; background: var(--ui-pli-well); box-shadow: inset 0 0 0 1px var(--ui-pli-line); line-height: 22px; color: var(--ui-pli-muted); cursor: text; transition: background-color 200ms ease, box-shadow 200ms ease, color 200ms ease; }
.ui-pli__token:hover { box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--ui-pli-muted) 45%, transparent); }
.ui-pli__token[data-filled] { background: var(--ui-pli-accent-bg); box-shadow: none; color: var(--ui-pli-accent-ink); }
.ui-pli__token:focus-within { box-shadow: inset 0 0 0 1px var(--ui-pli-accent), 0 0 0 3px var(--ui-pli-accent-bg); }
.ui-pli__token[data-flash="a"] { animation: ui-pli-flash-a 900ms ease-out; }
.ui-pli__token[data-flash="b"] { animation: ui-pli-flash-b 900ms ease-out; }
.ui-pli__sizer, .ui-pli__input { grid-area: 1 / 1; min-width: 2ch; font-size: 13px; line-height: 22px; white-space: pre; }
.ui-pli__sizer { padding-right: 1px; font-weight: 500; visibility: hidden; overflow: hidden; }
.ui-pli__input { width: 100%; height: 22px; color: inherit; font-weight: 500; text-overflow: ellipsis; }
.ui-pli__input::placeholder { color: var(--ui-pli-muted); font-weight: 400; opacity: 1; }

.ui-pli__label { margin-top: 12px; font-size: 12px; color: var(--ui-pli-muted); }
.ui-pli__preview { margin-top: 4px; padding: 9px 11px; border-radius: 10px; background: var(--ui-pli-well); font-size: 12.5px; line-height: 20px; color: var(--ui-pli-text); white-space: pre-wrap; overflow-wrap: anywhere; }
.ui-pli__fill { border-radius: 4px; color: var(--ui-pli-ink); font-weight: 500; box-decoration-break: clone; -webkit-box-decoration-break: clone; }
.ui-pli__fill[data-flash="a"] { animation: ui-pli-mark-a 1100ms ease-out; }
.ui-pli__fill[data-flash="b"] { animation: ui-pli-mark-b 1100ms ease-out; }
.ui-pli__hole { color: var(--ui-pli-hole); }

/* ----- Tray ----- */
.ui-pli__foot { display: flex; align-items: center; gap: 4px; min-height: 40px; padding: 4px 2px 0 10px; }
.ui-pli__caption { flex: 1; min-width: 0; overflow: hidden; font-size: 12.5px; color: var(--ui-pli-muted); white-space: nowrap; text-overflow: ellipsis; font-variant-numeric: tabular-nums; }
.ui-pli__swap { display: grid; min-width: 0; }
.ui-pli__swap-item { grid-area: 1 / 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; animation: ui-pli-swap-in 320ms ease both; }
.ui-pli__swap-item[data-out] { animation: ui-pli-swap-out 220ms ease both; }
.ui-pli__swap-item[data-tone="ok"] { color: var(--ui-pli-ok); }
.ui-pli__copy { display: inline-flex; flex: none; align-items: center; gap: 5px; height: 28px; padding: 0 9px 0 8px; border-radius: 10px; font-size: 12.5px; font-weight: 500; color: var(--ui-pli-text); white-space: nowrap; transition: background-color 160ms ease, color 160ms ease; }
.ui-pli__copy:hover:not(:disabled) { background: var(--ui-pli-card); color: var(--ui-pli-ink); }
.ui-pli__copy-icon { display: grid; place-items: center; width: 12px; height: 12px; animation: ui-pli-swap-in 300ms ease both; }
.ui-pli__use { position: relative; display: inline-flex; flex: none; align-items: center; gap: 5px; height: 28px; padding: 0 9px 0 11px; border-radius: 10px; background: var(--ui-pli-ink); font-size: 12.5px; font-weight: 500; color: var(--ui-pli-on-ink); white-space: nowrap; transition: background-color 200ms ease, color 200ms ease, opacity 200ms ease; }
.ui-pli__use svg { transition: transform 220ms var(--ui-pli-ease); }
.ui-pli__use:hover:not([aria-disabled="true"]) svg { transform: translateX(2px); }
.ui-pli__use[aria-disabled="true"] { background: color-mix(in srgb, var(--ui-pli-ink) 10%, transparent); color: var(--ui-pli-muted); cursor: default; }
.ui-pli__use[data-pulse="a"] { animation: ui-pli-pulse-a 1400ms ease-out; }
.ui-pli__use[data-pulse="b"] { animation: ui-pli-pulse-b 1400ms ease-out; }

@keyframes ui-pli-in { from { opacity: 0; filter: blur(2px); transform: translateY(3px); } }
@keyframes ui-pli-out { to { opacity: 0; filter: blur(2px); } }
@keyframes ui-pli-swap-in { from { opacity: 0; filter: blur(2px); } }
@keyframes ui-pli-swap-out { from { opacity: 1; } to { opacity: 0; filter: blur(2px); } }
@keyframes ui-pli-flash-a { from { background-color: var(--ui-pli-accent-flash); } }
@keyframes ui-pli-flash-b { from { background-color: var(--ui-pli-accent-flash); } }
@keyframes ui-pli-mark-a { from { background-color: var(--ui-pli-accent-flash); box-shadow: 0 0 0 2px var(--ui-pli-accent-flash); } to { background-color: transparent; box-shadow: 0 0 0 2px transparent; } }
@keyframes ui-pli-mark-b { from { background-color: var(--ui-pli-accent-flash); box-shadow: 0 0 0 2px var(--ui-pli-accent-flash); } to { background-color: transparent; box-shadow: 0 0 0 2px transparent; } }
@keyframes ui-pli-pulse-a { 0% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--ui-pli-ink) 30%, transparent); } 60%, 100% { box-shadow: 0 0 0 8px transparent; } }
@keyframes ui-pli-pulse-b { 0% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--ui-pli-ink) 30%, transparent); } 60%, 100% { box-shadow: 0 0 0 8px transparent; } }

/* Narrow: the list moves on top, the copy button keeps only its icon */
@container (max-width: 540px) {
  .ui-pli__card { grid-template-columns: minmax(0, 1fr); }
  .ui-pli__side { border-right: 0; border-bottom: 1px solid var(--ui-pli-line); }
}
@container (max-width: 360px) {
  .ui-pli__copy { width: 28px; padding: 0; justify-content: center; }
  .ui-pli__copy-text { display: none; }
  .ui-pli__count .ui-pli__bars { display: none; }
}

@media (pointer: coarse) {
  .ui-pli__option { height: 40px; }
  .ui-pli__search { height: 36px; }
  .ui-pli__copy, .ui-pli__use { height: 34px; }
  .ui-pli__body { line-height: 30px; }
  .ui-pli__token, .ui-pli__input, .ui-pli__sizer { height: 26px; line-height: 26px; }
}

@media (prefers-reduced-motion: reduce) {
  .ui-pli *, .ui-pli *::before, .ui-pli *::after { animation: none !important; transition: none !important; }
}

/* Dark mode: follows a .dark class or data-theme="dark" on any ancestor, e.g. <html> */
:where(.dark, [data-theme="dark"]) .ui-pli {
  --ui-pli-tray: #111113;
  --ui-pli-card: #19191b;
  --ui-pli-line: #2a2a2e;
  --ui-pli-ink: #ededed;
  --ui-pli-text: #c8c8cc;
  --ui-pli-muted: #8b8b92;
  --ui-pli-well: #222225;
  --ui-pli-accent: #4f82ff;
  --ui-pli-accent-ink: #9dbbff;
  --ui-pli-accent-bg: rgba(79, 130, 255, 0.16);
  --ui-pli-accent-flash: rgba(79, 130, 255, 0.36);
  --ui-pli-hole: #5c5c63;
  --ui-pli-on-ink: #111113;
  --ui-pli-ok: #6ee7a8;
  --ui-pli-blue: #8fb1ff;
  --ui-pli-blue-bg: rgba(79, 130, 255, 0.16);
  --ui-pli-violet: #b9a2f5;
  --ui-pli-violet-bg: rgba(150, 110, 240, 0.16);
  --ui-pli-amber: #f5c264;
  --ui-pli-amber-bg: rgba(240, 160, 32, 0.15);
  --ui-pli-green: #6ee7a8;
  --ui-pli-green-bg: rgba(34, 160, 90, 0.16);
  --ui-pli-red: #ff9b93;
  --ui-pli-red-bg: rgba(229, 72, 77, 0.16);
  --ui-pli-gray: #b4b4ba;
  --ui-pli-gray-bg: #26262a;
  --ui-pli-focus: rgba(255, 255, 255, 0.3);
}
`;
var valueValue12 = [
  {
    id: `meeting`,
    title: `Summarize a meeting`,
    category: `Notes`,
    body: `Summarize the meeting below for {audience} in under {length}. Lead with the decisions, then list open questions about {topic}.`,
    variables: {
      audience: {
        description: `Who reads the summary`,
      },
      length: {
        description: `How long it may be`,
        default: `150 words`,
      },
      topic: {
        description: `What the open questions are about`,
      },
    },
  },
  {
    id: `release`,
    title: `Write release notes`,
    category: `Product`,
    body: `Write release notes for {product} {version} for {audience}. Keep the tone {tone} and group the changes into New, Improved and Fixed.`,
    variables: {
      product: {
        description: `Name of the product`,
      },
      version: {
        description: `Version number, e.g. 2.4`,
      },
      audience: {
        description: `Who reads the notes`,
      },
      tone: {
        description: `How it should sound`,
        default: `friendly`,
      },
    },
  },
  {
    id: `error`,
    title: `Explain an error`,
    category: `Debug`,
    body: `Explain this {language} error in plain words: {error}. Say what most likely caused it and suggest a fix that works with {framework}.`,
    variables: {
      language: {
        description: `Programming language`,
      },
      error: {
        description: `The error message`,
      },
      framework: {
        description: `Framework or runtime in use`,
      },
    },
  },
  {
    id: `email`,
    title: `Draft a cold email`,
    category: `Sales`,
    body: `Draft a short cold email to {name}, {role} at {company}. Open with {hook} and ask for a 15-minute call. No more than {length}.`,
    variables: {
      name: {
        description: `First name of the person`,
      },
      role: {
        description: `Their job title`,
      },
      company: {
        description: `Where they work`,
      },
      hook: {
        description: `Something specific about them`,
      },
      length: {
        description: `How long it may be`,
        default: `120 words`,
      },
    },
  },
];
var ViewB = [
  {
    id: `release`,
    type: [
      [`product`, `Relay`],
      [`version`, `2.4`],
      [`audience`, `existing customers`],
    ],
  },
  {
    id: `error`,
    type: [
      [`language`, `TypeScript`],
      [`error`, `Cannot read properties of undefined`],
      [`framework`, `Next.js`],
    ],
  },
  {
    id: `meeting`,
    type: [
      [`audience`, `the design team`],
      [`topic`, `the onboarding flow`],
    ],
  },
];
function valueValue13(e: Element, t: string) {
  (Object.getOwnPropertyDescriptor(
    HTMLInputElement.prototype,
    `value`,
  )?.set?.call(e, t),
    e.dispatchEvent(
      new Event(`input`, {
        bubbles: true,
      }),
    ));
}
function PromptLibraryDemo2() {
  let e = React.useRef<HTMLDivElement | null>(null),
    [t, i] = React.useState<number>(0),
    [a, o] = React.useState<string>(`meeting`),
    s = React.useRef(false);
  React.useEffect(() => {
    let n = ViewB[t % ViewB.length],
      r: [number, () => void][] = [[t === 0 ? 700 : 900, () => o(n.id)]];
    (n.type.forEach(([n, i], a) => {
      for (let o = 1; o <= i.length; o++) {
        let s =
          o === 1 ? (a === 0 && t === 0 ? 2500 : 520) : 55 + ((o * 37) % 40);
        r.push([
          s,
          () => {
            let t = e.current?.querySelector(
              `.ui-pli__panel:not([data-out]) .ui-pli__input[data-var="${n}"]`,
            );
            t && valueValue13(t, i.slice(0, o));
          },
        ]);
      }
    }),
      r.push([3600, () => i((e) => e + 1)]));
    let a = 0,
      c = 0,
      l = () => {
        s.current ||
          a >= r.length ||
          (c = window.setTimeout(() => {
            s.current || (r[a][1](), a++, l());
          }, r[a][0]));
      };
    return (l(), () => window.clearTimeout(c));
  }, [t]);
  let c = () => (s.current = true);
  return (
    <div
      ref={e}
      className={`pli-demo`}
      onPointerEnter={c}
      onPointerDownCapture={c}
      onKeyDownCapture={c}
      onFocusCapture={c}
    >
      <PromptLibrary
        templates={valueValue12}
        value={a}
        onSelect={o}
        onUse={() => {}}
        key={t}
      />
    </div>
  );
}
const demoStyles =
  ".pli-demo{grid-template-columns:min(620px,100%);place-content:start center;width:100%;height:340px;display:grid}.card__preview .pli-demo{grid-template-columns:auto;height:auto;position:absolute;inset:44px 0 0}.card__preview .pli-demo .ui-pli{zoom:.56;width:620px;max-width:none}.stage:has(.pli-demo){height:480px}@media (width<=760px){.pli-demo{height:auto}.stage:has(.pli-demo){align-items:start;height:820px;padding:120px 16px 24px}}.card__preview .pli-demo .ui-plic{zoom:.56;width:556px;max-width:none}\n";
function PromptLibraryDemo(props: React.JSX.IntrinsicAttributes) {
  return (
    <>
      <style href="plico-demo-prompt-library" precedence="default">
        {demoStyles}
      </style>
      <PromptLibraryDemo2 {...props} />
    </>
  );
}
export { PromptLibrary as Component };
export { PromptLibraryDemo as Demo };
export { PromptLibrary };
export { PromptLibraryDemo };
export default PromptLibrary;

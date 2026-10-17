"use client";

import * as React from "react";
type CitedSegment = {
  text: string;
  cite?: string[];
  paragraph?: boolean;
} & {
  source?: string;
  sources?: string[];
  citation?: string;
};
type CitedSource = {
  id: string;
  site: string;
  title: string;
  url?: string;
  date?: string;
  quote?: string;
  highlight?: string[];
  domain?: string;
  description?: string;
  icon?: React.ReactNode;
  excerpt?: string;
};
interface CitedAnswerCleanProps {
  segments: CitedSegment[];
  sources: CitedSource[];
  pagesRead?: number;
  defaultOpen?: string;
  onOpenSource?: (source: CitedSource) => void;
  onPreviewChange?: (id: string | null) => void;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}
var valueValue = [`blue`, `violet`, `green`, `amber`, `gray`];
var ViewA = (e: string) =>
  valueValue[[...e].reduce((e, t) => (e * 31 + t.charCodeAt(0)) % 997, 7) % valueValue.length];
var valueValue2 = (e: string | undefined) => {
  if (!e) return ``;
  try {
    return new URL(e).hostname.replace(/^www\./, ``);
  } catch {
    return e;
  }
};
var valueValue3 = (e: string) => e.replace(/[.*+?^${}()|[\]\\]/g, `\\$&`);
var valueValue4 = new Set([
  `about`,
  `after`,
  `again`,
  `their`,
  `there`,
  `these`,
  `those`,
  `which`,
  `while`,
  `would`,
  `could`,
  `should`,
  `every`,
  `other`,
  `being`,
  `still`,
  `where`,
  `until`,
  `since`,
  `under`,
  `first`,
  `people`,
  `thing`,
  `things`,
]);
function valueValue5(e: string, t: string[] | undefined, n: string) {
  let i = null;
  if (t?.length) {
    let e = t.filter((e: string) => e.trim()).map(valueValue3);
    e.length && (i = RegExp(`(${e.join(`|`)})`, `gi`));
  } else {
    let e = [
      ...new Set(
        (n.toLowerCase().match(/[a-z0-9%]+/g) ?? []).filter(
          (e) => (e.length >= 5 || /\d/.test(e)) && !valueValue4.has(e),
        ),
      ),
    ];
    e.length && (i = RegExp(`\\b(${e.map(valueValue3).join(`|`)})\\b`, `gi`));
  }
  return i ? e.split(i).map((e, t) => (t % 2 ? <mark key={t}>{e}</mark> : e)) : e;
}
function Iconu({
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
      <span className={`ui-cac__swap`}>
        {c && (
          <span
            className={`ui-cac__swap-item`}
            data-out={``}
            data-tone={c.tone}
            aria-hidden={`true`}
            key={`out-${c.id}`}
          >
            {c.node}
          </span>
        )}
        <span className={`ui-cac__swap-item`} data-tone={tone} key={id}>
          {children}
        </span>
      </span>
    )
  );
}
var Icond = ({ d: d }: { d: string }) => (
  <svg viewBox={`0 0 16 16`} className={`ui-cac__icon`} aria-hidden={`true`}>
    <path d={d} />
  </svg>
);
var valueValue6 = {
  close: `M4.75 4.75l6.5 6.5m0-6.5-6.5 6.5`,
  out: `M6.5 4.5h5v5M11.25 4.75 4.5 11.5`,
  copy: `M6.75 5.5h5c.69 0 1.25.56 1.25 1.25v5c0 .69-.56 1.25-1.25 1.25h-5c-.69 0-1.25-.56-1.25-1.25v-5c0-.69.56-1.25 1.25-1.25ZM10.5 3.5A1.25 1.25 0 0 0 9.25 3h-5C3.56 3 3 3.56 3 4.25v5c0 .54.34 1 .82 1.17`,
  done: `M3.75 8.4 6.6 11.2 12.25 5`,
  arrow: `M3.5 8h9M8.75 4.25 12.5 8l-3.75 3.75`,
};
function Iconp({ source: source }: { source: CitedSource }) {
  return (
    <span className={`ui-cac__glyph`} data-tone={ViewA(source.site)} aria-hidden={`true`}>
      {source.icon ?? source.site.trim().charAt(0).toUpperCase()}
    </span>
  );
}
var valueValue7 = 4;
function CitedAnswerClean({
  segments: segments,
  sources: sources,
  pagesRead: pagesRead,
  defaultOpen: defaultOpen,
  onOpenSource: onOpenSource,
  onPreviewChange: onPreviewChange,
  action: action,
  className: className,
}: CitedAnswerCleanProps) {
  let v = React.useId(),
    [y, b] = React.useState<{
      source: string;
      segment?: number;
    } | null>(null),
    [x, S] = React.useState(
      defaultOpen && sources.some((e) => e.id === defaultOpen) ? defaultOpen : null,
    ),
    C = React.useRef(x);
  x && (C.current = x);
  let [w, T] = React.useState<{
      id: number;
      source: string;
    } | null>(null),
    E = React.useRef<HTMLDivElement | null>(null),
    D = React.useRef<HTMLDivElement | null>(null),
    [ee, O] = React.useState(sources.length),
    [k, A] = React.useState(false),
    j = (e: React.Key | null | undefined) => sources.findIndex((t) => t.id === e) + 1,
    M = (e: React.Key | null | undefined) => sources.find((t) => t.id === e) ?? null,
    N = (e: string) => sources.some((t) => t.id === e);
  React.useLayoutEffect(() => {
    let e = E.current,
      t = D.current;
    if (!e || !t) return;
    let n = () => {
      let n = [...t.querySelectorAll<HTMLElement>(`[data-chip]`)].map((e) => e.offsetWidth),
        r = t.querySelector<HTMLElement>(`[data-more]`)?.offsetWidth ?? 36,
        i = e.clientWidth;
      if (n.reduce((e, t) => e + t, 0) + valueValue7 * Math.max(0, n.length - 1) <= i + 0.5)
        return O(n.length);
      let a = 0,
        o = 0;
      for (; o < n.length; o++) {
        let e = a + (o ? valueValue7 : 0) + n[o];
        if (e + valueValue7 + r > i) break;
        a = e;
      }
      O(Math.max(1, o));
    };
    n();
    let r = new ResizeObserver(n);
    return (r.observe(e), document.fonts?.ready.then(n).catch(() => {}), () => r.disconnect());
  }, [sources]);
  let P = k ? sources.length : Math.min(ee, sources.length),
    F = sources.length - P,
    I: {
      seg: CitedSegment;
      index: number;
    }[][] = [];
  segments.forEach((e, t) => {
    ((e.paragraph || I.length === 0) && I.push([]),
      I[I.length - 1].push({
        seg: e,
        index: t,
      }));
  });
  let L = segments.filter((e) => e.text.trim()).length,
    R = segments.filter((e) => e.text.trim() && e.cite?.some(N)).length,
    z = (t: string) => segments.filter((e) => e.cite?.includes(t)),
    B = (e: string) => {
      let t = x === e ? null : e;
      (S(t), onPreviewChange?.(t));
    },
    V: () => void = () => {
      if (!x) return;
      let e = x;
      (S(null),
        onPreviewChange?.(null),
        E.current?.querySelector<HTMLElement>(`[data-source="${CSS.escape(e)}"]`)?.focus({
          preventScroll: true,
        }));
    },
    H = (e: CitedSource) => {
      let t = `“${e.quote ?? e.title}” – ${e.title}, ${e.site}${e.url ? ` (${e.url})` : ``}`;
      (navigator.clipboard?.writeText(t).catch(() => {}),
        T({
          id: Date.now(),
          source: e.id,
        }));
    };
  React.useEffect(() => {
    if (!w) return;
    let e = window.setTimeout(() => T(null), 1800);
    return () => window.clearTimeout(e);
  }, [w]);
  let U: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
      e.key === `Escape` && x && (e.stopPropagation(), V());
    },
    W: React.KeyboardEventHandler<HTMLButtonElement> = (e) => {
      let t = [...(E.current?.querySelectorAll<HTMLElement>(`.ui-cac__chip, .ui-cac__more`) ?? [])],
        n = t.indexOf(e.currentTarget),
        r = t.length - 1,
        i =
          e.key === `ArrowRight`
            ? Math.min(r, n + 1)
            : e.key === `ArrowLeft`
              ? Math.max(0, n - 1)
              : e.key === `Home`
                ? 0
                : e.key === `End`
                  ? r
                  : null;
      i === null || n < 0 || (e.preventDefault(), t[i]?.focus());
    },
    G = y?.source ?? null,
    K = (e: CitedSegment, t: number) => {
      if (y)
        return y.segment === void 0
          ? e.cite?.includes(y.source)
            ? `hl`
            : `dim`
          : y.segment === t
            ? `hl`
            : void 0;
      if (x && e.cite?.includes(x)) return `hl`;
    },
    q = M(G),
    J = M(x),
    Y: React.ReactNode = (
      <>
        <b>{R}</b>
        {` of `}
        {L}
        {` `}
        {L === 1 ? `sentence` : `sentences`}
        {` backed by a source`}
      </>
    ),
    X = `rest`,
    Z;
  if (w) ((Y = `Quote copied`), (X = `copied-${w.id}`), (Z = `ok`));
  else if (q && y?.segment !== void 0)
    ((Y = (
      <>
        <b>{q.site}</b>
        {` `}
        <span className={`ui-cac__dot`}>{`·`}</span>
        {` `}
        {q.title}
      </>
    )),
      (X = `mark-${y.segment}-${q.id}`));
  else if (q) {
    let e = z(q.id).length;
    ((Y = e ? (
      <>
        <b>{q.site}</b>
        {` `}
        <span className={`ui-cac__dot`}>{`·`}</span>
        {` cited in `}
        {e}
        {` `}
        {e === 1 ? `sentence` : `sentences`}
      </>
    ) : (
      <>
        <b>{q.site}</b>
        {` `}
        <span className={`ui-cac__dot`}>{`·`}</span>
        {` read, not cited`}
      </>
    )),
      (X = `src-${q.id}`));
  } else
    J &&
      ((Y = (
        <>
          {`Quote from `}
          <b>{J.site}</b>
        </>
      )),
      (X = `open-${J.id}`));
  let Q = M(x ?? C.current),
    $ = `${v}-preview`,
    te = [
      `${sources.length} ${sources.length === 1 ? `source` : `sources`}`,
      pagesRead === void 0 ? null : `${pagesRead} ${pagesRead === 1 ? `page` : `pages`} read`,
    ].filter(Boolean);
  return (
    <div
      className={[`ui-cac`, className].filter(Boolean).join(` `)}
      role={`group`}
      aria-label={`Answer with sources`}
      data-hot={y ? (y.segment === void 0 ? `source` : `mark`) : void 0}
      onKeyDown={U}
    >
      <style href={`ui-cited-answer-clean`} precedence={`default`}>
        {valueValue8}
      </style>
      <div className={`ui-cac__body`}>
        <div className={`ui-cac__head`}>
          <span className={`ui-cac__stack`} aria-hidden={`true`}>
            {sources.slice(0, 3).map((e) => (
              <Iconp source={e} key={e.id} />
            ))}
          </span>
          <span className={`ui-cac__meta`}>
            {te.map((e, t) => (
              <span key={e}>
                {t > 0 && <span className={`ui-cac__dot`}>{` · `}</span>}
                {e}
              </span>
            ))}
          </span>
        </div>
        <div className={`ui-cac__text`} onPointerLeave={() => b(null)}>
          {I.map((e, t) => (
            <p className={`ui-cac__p`} key={t}>
              {e.map(({ seg: seg, index: index }) => {
                let [, n, i, a] = seg.text.match(/^(\s*)([\s\S]*?)(\s*)$/) ?? [
                    ``,
                    ``,
                    seg.text,
                    ``,
                  ],
                  o = (seg.cite ?? []).filter(N),
                  s = K(seg, index),
                  c = o.length ? Math.max(0, i.search(/\S+$/)) : i.length;
                return (
                  <span key={index}>
                    {n}
                    <span
                      className={`ui-cac__seg`}
                      data-hl={s === `hl` ? `` : void 0}
                      data-dim={s === `dim` ? `` : void 0}
                    >
                      {i.slice(0, c)}
                      <span className={`ui-cac__keep`}>
                        {i.slice(c)}
                        {o.map((e) => {
                          let n = M(e)!,
                            i =
                              (y?.segment === index && y.source === e) ||
                              (y?.segment === void 0 && y?.source === e);
                          return (
                            <button
                              type={`button`}
                              className={`ui-cac__marker`}
                              data-source={e}
                              data-lit={i ? `` : void 0}
                              data-dim={y && !i ? `` : void 0}
                              aria-expanded={x === e}
                              aria-controls={$}
                              aria-label={`Source ${j(e)}: ${n.site} – ${n.title}`}
                              onPointerEnter={(n) =>
                                n.pointerType === `mouse` &&
                                b({
                                  source: e,
                                  segment: index,
                                })
                              }
                              onPointerLeave={(e) => e.pointerType === `mouse` && b(null)}
                              onFocus={() =>
                                b({
                                  source: e,
                                  segment: index,
                                })
                              }
                              onBlur={() => b(null)}
                              onClick={() => B(e)}
                              key={e}
                            >
                              {j(e)}
                            </button>
                          );
                        })}
                      </span>
                    </span>
                    {a}
                  </span>
                );
              })}
            </p>
          ))}
        </div>
        <div
          className={`ui-cac__chips`}
          data-all={k ? `` : void 0}
          ref={E}
          role={`list`}
          aria-label={`Sources`}
          onPointerLeave={() => b(null)}
        >
          {sources.slice(0, P).map((e, t) => {
            let n = G === e.id;
            return (
              <span role={`listitem`} className={`ui-cac__chip-item`} key={e.id}>
                <button
                  type={`button`}
                  className={`ui-cac__chip`}
                  data-source={e.id}
                  data-lit={n ? `` : void 0}
                  data-dim={G && !n ? `` : void 0}
                  aria-expanded={x === e.id}
                  aria-controls={$}
                  aria-label={`Source ${t + 1}: ${e.site} – ${e.title}`}
                  onPointerEnter={(t) =>
                    t.pointerType === `mouse` &&
                    b({
                      source: e.id,
                    })
                  }
                  onFocus={() =>
                    b({
                      source: e.id,
                    })
                  }
                  onBlur={() => b(null)}
                  onKeyDown={W}
                  onClick={() => B(e.id)}
                >
                  <Iconp source={e} />
                  <span className={`ui-cac__chip-name`}>{e.site}</span>
                  <span className={`ui-cac__chip-num`}>{t + 1}</span>
                </button>
              </span>
            );
          })}
          {F > 0 && (
            <span role={`listitem`} className={`ui-cac__chip-item`}>
              <button
                type={`button`}
                className={`ui-cac__more`}
                aria-label={`Show ${F} more ${F === 1 ? `source` : `sources`}`}
                onKeyDown={W}
                onClick={() => A(true)}
              >
                {`+`}
                {F}
              </button>
            </span>
          )}
        </div>
        <div className={`ui-cac__ruler`} ref={D} aria-hidden={`true`}>
          {sources.map((e, t) => (
            <span className={`ui-cac__chip`} data-chip={``} key={e.id}>
              <Iconp source={e} />
              <span className={`ui-cac__chip-name`}>{e.site}</span>
              <span className={`ui-cac__chip-num`}>{t + 1}</span>
            </span>
          ))}
          <span className={`ui-cac__more`} data-more={``}>
            {`+`}
            {sources.length}
          </span>
        </div>
        <div
          id={$}
          className={`ui-cac__fold`}
          data-open={x ? `` : void 0}
          inert={!x}
          role={`region`}
          aria-label={Q ? `Source ${j(Q.id)}: ${Q.site}` : `Source`}
        >
          <div className={`ui-cac__clip`}>
            {Q && (
              <div className={`ui-cac__preview`} key={Q.id}>
                <div className={`ui-cac__pv-head`}>
                  <Iconp source={Q} />
                  <span className={`ui-cac__pv-meta`}>
                    <span className={`ui-cac__pv-domain`}>{valueValue2(Q.url) || Q.site}</span>
                    {Q.date && (
                      <span className={`ui-cac__pv-date`}>
                        <span className={`ui-cac__dot`}>{` · `}</span>
                        {Q.date}
                      </span>
                    )}
                  </span>
                  <span className={`ui-cac__pv-num`}>{j(Q.id)}</span>
                  <button
                    type={`button`}
                    className={`ui-cac__close`}
                    aria-label={`Close source`}
                    onClick={V}
                  >
                    <Icond d={valueValue6.close} />
                  </button>
                </div>
                <div className={`ui-cac__pv-title`}>{Q.title}</div>
                {Q.quote && (
                  <blockquote className={`ui-cac__quote`}>
                    {valueValue5(
                      Q.quote,
                      Q.highlight,
                      z(Q.id)
                        .map((e) => e.text)
                        .join(` `),
                    )}
                  </blockquote>
                )}
                <div className={`ui-cac__pv-actions`}>
                  {Q.url ? (
                    <a
                      className={`ui-cac__btn ui-cac__btn--main`}
                      href={Q.url}
                      target={`_blank`}
                      rel={`noreferrer noopener`}
                      onClick={(e) => {
                        onOpenSource && (e.preventDefault(), onOpenSource(Q));
                      }}
                    >
                      <Icond d={valueValue6.out} />
                      {`Open source`}
                    </a>
                  ) : (
                    onOpenSource && (
                      <button
                        type={`button`}
                        className={`ui-cac__btn ui-cac__btn--main`}
                        onClick={() => onOpenSource(Q)}
                      >
                        <Icond d={valueValue6.out} />
                        {`Open source`}
                      </button>
                    )
                  )}
                  {Q.quote && (
                    <button
                      type={`button`}
                      className={`ui-cac__btn`}
                      data-done={w?.source === Q.id ? `` : void 0}
                      aria-label={`Copy quote`}
                      onClick={() => H(Q)}
                    >
                      <span
                        className={`ui-cac__btn-icon`}
                        key={w?.source === Q.id ? `done` : `idle`}
                      >
                        <Icond d={w?.source === Q.id ? valueValue6.done : valueValue6.copy} />
                      </span>
                      <span className={`ui-cac__btn-text`}>
                        {w?.source === Q.id ? `Copied` : `Copy quote`}
                      </span>
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className={`ui-cac__foot`}>
        <span className={`ui-cac__caption`} aria-live={`polite`}>
          <Iconu id={X} tone={Z}>
            {Y}
          </Iconu>
        </span>
        {action && (
          <button type={`button`} className={`ui-cac__action`} onClick={action.onClick}>
            {action.label}
            <Icond d={valueValue6.arrow} />
          </button>
        )}
      </div>
    </div>
  );
}
var valueValue8 = `
/* Colors and motion as variables – override them on .ui-cac */
.ui-cac {
  --ui-cac-card: #ffffff;
  --ui-cac-ink: rgba(0, 0, 0, 0.88);
  --ui-cac-strong: #000000;
  --ui-cac-text: rgba(0, 0, 0, 0.61);
  --ui-cac-muted: rgba(0, 0, 0, 0.45);
  --ui-cac-faint: rgba(0, 0, 0, 0.27);
  --ui-cac-icon: rgba(0, 0, 0, 0.447);
  --ui-cac-line: rgba(0, 0, 0, 0.06);
  --ui-cac-fill: rgba(0, 0, 0, 0.06);
  --ui-cac-fill-strong: rgba(0, 0, 0, 0.1);
  --ui-cac-wash: rgba(0, 0, 0, 0.03);
  --ui-cac-hl: rgba(0, 96, 226, 0.07);
  --ui-cac-mark: rgba(0, 96, 226, 0.1);
  --ui-cac-ok: #1a9a52;
  --ui-cac-shadow: 0 0 0 0.5px rgba(0, 0, 0, 0.06), 0 1px 1px -1px rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --ui-cac-focus: rgba(0, 96, 226, 0.35);
  --ui-cac-ease: cubic-bezier(0.22, 1, 0.36, 1);
  position: relative;
  box-sizing: border-box;
  width: 100%;
  max-width: 460px;
  min-width: 0;
  container-type: inline-size;
  border-radius: 10px;
  background: var(--ui-cac-card);
  box-shadow: var(--ui-cac-shadow);
  font-family: "Inter", "InterVariable", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  font-size: 13px;
  line-height: 20px;
  font-weight: 400;
  color: var(--ui-cac-ink);
  text-align: left;
  -webkit-font-smoothing: antialiased;
}
.ui-cac *, .ui-cac *::before, .ui-cac *::after { box-sizing: border-box; }
:where(.ui-cac) button { margin: 0; padding: 0; border: 0; background: none; font: inherit; color: inherit; text-align: inherit; cursor: pointer; -webkit-tap-highlight-color: transparent; }
.ui-cac :is(button, a):focus-visible { outline: 2px solid var(--ui-cac-focus); outline-offset: 1px; }
.ui-cac svg { display: block; flex: none; }
.ui-cac b { font-weight: 500; color: var(--ui-cac-ink); }
.ui-cac__dot { color: var(--ui-cac-faint); }
.ui-cac__icon { width: 16px; height: 16px; fill: none; stroke: currentColor; stroke-width: 1.1; stroke-linecap: round; stroke-linejoin: round; }

/* Letter glyphs on a light tint – stand-ins for favicons */
.ui-cac [data-tone="blue"] { --ui-cac-g: #1f5fd1; --ui-cac-g-bg: rgba(0, 96, 226, 0.08); }
.ui-cac [data-tone="violet"] { --ui-cac-g: #6a4fd0; --ui-cac-g-bg: rgba(110, 86, 230, 0.09); }
.ui-cac [data-tone="green"] { --ui-cac-g: #1a8a4a; --ui-cac-g-bg: rgba(26, 154, 82, 0.09); }
.ui-cac [data-tone="amber"] { --ui-cac-g: #a46a06; --ui-cac-g-bg: rgba(232, 162, 12, 0.12); }
.ui-cac [data-tone="gray"] { --ui-cac-g: rgba(0, 0, 0, 0.55); --ui-cac-g-bg: rgba(0, 0, 0, 0.06); }
.ui-cac__glyph { display: grid; flex: none; place-items: center; width: 16px; height: 16px; overflow: hidden; border-radius: 4px; background: var(--ui-cac-g-bg); font-size: 9.5px; font-weight: 500; line-height: 1; color: var(--ui-cac-g); }
.ui-cac__glyph > :is(img, svg) { width: 100%; height: 100%; object-fit: cover; }

/* Everything above the last row */
.ui-cac__body { padding: 16px 20px 16px; }

/* ----- Head ----- */
.ui-cac__head { display: flex; align-items: center; gap: 8px; height: 16px; }
.ui-cac__stack { display: flex; flex: none; }
.ui-cac__stack .ui-cac__glyph { box-shadow: 0 0 0 1.5px var(--ui-cac-card); }
.ui-cac__stack .ui-cac__glyph + .ui-cac__glyph { margin-left: -4px; }
.ui-cac__meta { min-width: 0; overflow: hidden; font-size: 12px; line-height: 16px; color: var(--ui-cac-muted); white-space: nowrap; text-overflow: ellipsis; font-variant-numeric: tabular-nums; }

/* ----- Answer ----- */
.ui-cac__text { margin-top: 12px; color: var(--ui-cac-ink); }
.ui-cac__p { margin: 0; font-size: 13px; line-height: 22px; }
.ui-cac__p + .ui-cac__p { margin-top: 10px; }
.ui-cac__seg { margin: 0 -2px; padding: 2px 2px; border-radius: 4px; -webkit-box-decoration-break: clone; box-decoration-break: clone; transition: background-color 200ms ease, color 200ms ease; }
.ui-cac__seg[data-hl] { background: var(--ui-cac-hl); color: var(--ui-cac-strong); }
.ui-cac__seg[data-dim] { color: var(--ui-cac-faint); }

.ui-cac__keep { white-space: nowrap; }
/* Citation markers: the gray tab look; the linked one gets a touch darker */
.ui-cac__marker { position: relative; display: inline-grid; place-items: center; min-width: 16px; height: 16px; margin-left: 3px; padding: 0 4px; border-radius: 4px; background: var(--ui-cac-fill); box-shadow: inset 0 0 0 0.5px var(--ui-cac-line); font-size: 10px; font-weight: 500; line-height: 16px; color: var(--ui-cac-text); vertical-align: 1px; font-variant-numeric: tabular-nums; transition: background-color 160ms ease, color 160ms ease, opacity 200ms ease; }
.ui-cac__marker + .ui-cac__marker { margin-left: 2px; }
.ui-cac__marker::after { content: ""; position: absolute; inset: -4px -2px; }
.ui-cac__marker:hover, .ui-cac__marker[data-lit], .ui-cac__marker[aria-expanded="true"] { background: var(--ui-cac-fill-strong); color: var(--ui-cac-ink); }
.ui-cac__marker[data-dim]:not([aria-expanded="true"]) { opacity: 0.5; }

/* ----- Sources: one row of tab chips ----- */
.ui-cac__chips { display: flex; gap: ${valueValue7}px; margin-top: 16px; min-width: 0; }
.ui-cac__chips[data-all] { flex-wrap: wrap; }
.ui-cac__chip-item { display: flex; flex: none; min-width: 0; max-width: 100%; }
.ui-cac__chip-item:only-child, .ui-cac__chips:not([data-all]) .ui-cac__chip-item:first-child:nth-last-child(2) { flex: 0 1 auto; }
.ui-cac__chip { display: inline-flex; align-items: center; gap: 6px; min-width: 0; max-width: 100%; height: 28px; padding: 0 8px 0 6px; border-radius: 6px; box-shadow: inset 0 0 0 0.5px var(--ui-cac-line); font-size: 12px; font-weight: 500; line-height: 16px; color: var(--ui-cac-text); white-space: nowrap; transition: background-color 140ms ease, color 140ms ease, opacity 200ms ease; }
.ui-cac__chip:hover, .ui-cac__chip[data-lit] { background: var(--ui-cac-wash); color: var(--ui-cac-ink); }
.ui-cac__chip[aria-expanded="true"] { background: var(--ui-cac-fill); color: var(--ui-cac-ink); }
.ui-cac__chip[data-dim]:not([aria-expanded="true"]) { opacity: 0.5; }
.ui-cac__chip-name { min-width: 0; overflow: hidden; text-overflow: ellipsis; }
.ui-cac__chip-num { flex: none; margin-left: -1px; font-size: 11px; font-weight: 400; color: var(--ui-cac-faint); font-variant-numeric: tabular-nums; }
.ui-cac__more { display: inline-grid; flex: none; place-items: center; height: 28px; padding: 0 8px; border-radius: 6px; box-shadow: inset 0 0 0 0.5px var(--ui-cac-line); font-size: 12px; font-weight: 500; line-height: 16px; color: var(--ui-cac-text); font-variant-numeric: tabular-nums; transition: background-color 140ms ease, color 140ms ease; }
.ui-cac__more:hover { background: var(--ui-cac-wash); color: var(--ui-cac-ink); }
.ui-cac__ruler { position: absolute; top: 0; left: 0; display: flex; gap: ${valueValue7}px; height: 0; overflow: hidden; visibility: hidden; pointer-events: none; }
.ui-cac__ruler > * { flex: none; }

/* ----- Preview: unfolds in place, nothing travels ----- */
.ui-cac__fold { display: grid; grid-template-rows: 0fr; opacity: 0; transition: grid-template-rows 420ms var(--ui-cac-ease), opacity 220ms ease; }
.ui-cac__fold[data-open] { grid-template-rows: 1fr; opacity: 1; transition: grid-template-rows 420ms var(--ui-cac-ease), opacity 320ms ease 80ms; }
/* A few pixels of room so the preview's shadow isn't cut off */
.ui-cac__clip { min-height: 0; overflow: hidden; margin: 0 -4px -4px; padding: 0 4px 4px; }
.ui-cac__preview { margin-top: 12px; padding: 10px 12px 12px; border-radius: 8px; background: var(--ui-cac-card); box-shadow: var(--ui-cac-shadow); animation: ui-cac-swap-in 320ms ease both; }
.ui-cac__pv-head { display: flex; align-items: center; gap: 8px; height: 24px; }
.ui-cac__pv-meta { flex: 1; min-width: 0; overflow: hidden; font-size: 12px; line-height: 16px; color: var(--ui-cac-muted); white-space: nowrap; text-overflow: ellipsis; }
.ui-cac__pv-domain { color: var(--ui-cac-text); }
.ui-cac__pv-num { display: grid; flex: none; place-items: center; min-width: 16px; height: 16px; padding: 0 4px; border-radius: 4px; background: var(--ui-cac-fill); font-size: 10px; font-weight: 500; line-height: 16px; color: var(--ui-cac-text); font-variant-numeric: tabular-nums; }
.ui-cac__close { display: grid; flex: none; place-items: center; width: 24px; height: 24px; margin-right: -6px; border-radius: 6px; color: var(--ui-cac-icon); transition: background-color 140ms ease, color 140ms ease; }
.ui-cac__close:hover { background: var(--ui-cac-wash); color: var(--ui-cac-ink); }
.ui-cac__pv-title { display: -webkit-box; margin-top: 6px; overflow: hidden; font-size: 13px; font-weight: 500; line-height: 20px; color: var(--ui-cac-strong); -webkit-line-clamp: 2; -webkit-box-orient: vertical; }
.ui-cac__quote { margin: 8px 0 0; padding: 0 0 0 10px; border-left: 2px solid var(--ui-cac-fill); font-size: 12px; line-height: 20px; color: var(--ui-cac-text); }
.ui-cac__quote mark { margin: 0 -1px; padding: 1px 1px; border-radius: 3px; background: var(--ui-cac-mark); color: var(--ui-cac-ink); -webkit-box-decoration-break: clone; box-decoration-break: clone; }
.ui-cac__pv-actions { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; margin-top: 12px; }
/* Copy quote: a ghost button; Open source: the white secondary button */
.ui-cac__btn { display: inline-flex; align-items: center; gap: 6px; height: 28px; padding: 0 10px 0 8px; border-radius: 6px; font-size: 13px; font-weight: 500; line-height: 20px; color: var(--ui-cac-text); text-decoration: none; white-space: nowrap; transition: background-color 140ms ease, color 140ms ease; }
.ui-cac__btn .ui-cac__icon { color: var(--ui-cac-icon); transition: color 140ms ease, transform 220ms var(--ui-cac-ease); }
.ui-cac__btn:hover { background: var(--ui-cac-wash); color: var(--ui-cac-ink); }
.ui-cac__btn:hover .ui-cac__icon { color: var(--ui-cac-ink); }
.ui-cac__btn--main { background: var(--ui-cac-card); box-shadow: var(--ui-cac-shadow); color: var(--ui-cac-strong); }
.ui-cac__btn--main:hover { background: #fafafa; color: var(--ui-cac-strong); }
.ui-cac__btn--main:hover .ui-cac__icon { transform: translate(1px, -1px); }
.ui-cac__btn[data-done], .ui-cac__btn[data-done] .ui-cac__icon { color: var(--ui-cac-ok); }
.ui-cac__btn-icon { display: grid; place-items: center; width: 16px; height: 16px; animation: ui-cac-swap-in 280ms ease both; }

/* ----- The last row ----- */
.ui-cac__foot { display: flex; align-items: center; gap: 12px; height: 44px; padding: 0 8px 0 20px; border-top: 0.5px solid var(--ui-cac-line); }
.ui-cac__foot:not(:has(.ui-cac__action)) { padding-right: 20px; }
.ui-cac__caption { flex: 1; min-width: 0; overflow: hidden; font-size: 12px; line-height: 16px; color: var(--ui-cac-muted); white-space: nowrap; text-overflow: ellipsis; font-variant-numeric: tabular-nums; }
.ui-cac__swap { display: grid; min-width: 0; }
.ui-cac__swap-item { grid-area: 1 / 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; animation: ui-cac-swap-in 320ms ease both; }
.ui-cac__swap-item[data-out] { animation: ui-cac-swap-out 220ms ease both; }
.ui-cac__swap-item[data-tone="ok"] { color: var(--ui-cac-ok); }
/* Follow up: the white secondary button */
.ui-cac__action { display: inline-flex; flex: none; align-items: center; gap: 6px; height: 28px; padding: 0 8px 0 10px; border-radius: 6px; background: var(--ui-cac-card); box-shadow: var(--ui-cac-shadow); font-size: 13px; font-weight: 500; line-height: 20px; color: var(--ui-cac-strong); white-space: nowrap; transition: background-color 140ms ease; }
.ui-cac__action .ui-cac__icon { color: var(--ui-cac-icon); transition: transform 220ms var(--ui-cac-ease), color 140ms ease; }
.ui-cac__action:hover { background: #fafafa; }
.ui-cac__action:hover .ui-cac__icon { color: var(--ui-cac-ink); transform: translateX(2px); }

@keyframes ui-cac-swap-in { from { opacity: 0; filter: blur(2px); } }
@keyframes ui-cac-swap-out { from { opacity: 1; } to { opacity: 0; filter: blur(2px); } }

/* Narrow cards: tighter padding, the preview drops its number tag, Copy quote keeps only its icon */
@container (max-width: 400px) {
  .ui-cac__body { padding: 14px 16px 16px; }
  .ui-cac__foot { padding-left: 16px; }
}
@container (max-width: 360px) {
  .ui-cac__pv-num { display: none; }
}
@container (max-width: 280px) {
  .ui-cac__btn-text { display: none; }
}

@media (pointer: coarse) {
  .ui-cac__marker::after { inset: -8px -5px; }
  .ui-cac__chip, .ui-cac__more { height: 34px; }
  .ui-cac__btn { height: 34px; }
  .ui-cac__close { width: 32px; height: 32px; margin-right: -8px; }
  .ui-cac__action { height: 34px; }
  .ui-cac__foot { height: 52px; }
}

@media (prefers-reduced-motion: reduce) {
  .ui-cac *, .ui-cac *::before, .ui-cac *::after { animation: none !important; transition: none !important; }
}

/* Dark mode: follows a .dark class or data-theme="dark" on any ancestor, e.g. <html> */
:where(.dark, [data-theme="dark"]) .ui-cac {
  --ui-cac-card: #1c1c1e;
  --ui-cac-ink: rgba(255, 255, 255, 0.9);
  --ui-cac-strong: #ffffff;
  --ui-cac-text: rgba(255, 255, 255, 0.62);
  --ui-cac-muted: rgba(255, 255, 255, 0.46);
  --ui-cac-faint: rgba(255, 255, 255, 0.3);
  --ui-cac-icon: rgba(255, 255, 255, 0.5);
  --ui-cac-line: rgba(255, 255, 255, 0.08);
  --ui-cac-fill: rgba(255, 255, 255, 0.08);
  --ui-cac-fill-strong: rgba(255, 255, 255, 0.14);
  --ui-cac-wash: rgba(255, 255, 255, 0.04);
  --ui-cac-hl: rgba(77, 141, 255, 0.14);
  --ui-cac-mark: rgba(77, 141, 255, 0.24);
  --ui-cac-ok: #3ec27a;
  --ui-cac-shadow: 0 0 0 0.5px rgba(255, 255, 255, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.4);
  --ui-cac-focus: rgba(77, 141, 255, 0.5);
}
:where(.dark, [data-theme="dark"]) .ui-cac__btn--main:hover,
:where(.dark, [data-theme="dark"]) .ui-cac__action:hover { background: #232326; }
:where(.dark, [data-theme="dark"]) .ui-cac [data-tone="blue"] { --ui-cac-g: #9bbcff; --ui-cac-g-bg: rgba(77, 141, 255, 0.16); }
:where(.dark, [data-theme="dark"]) .ui-cac [data-tone="violet"] { --ui-cac-g: #c3b4ff; --ui-cac-g-bg: rgba(124, 92, 255, 0.18); }
:where(.dark, [data-theme="dark"]) .ui-cac [data-tone="green"] { --ui-cac-g: #6ee7a8; --ui-cac-g-bg: rgba(34, 160, 90, 0.16); }
:where(.dark, [data-theme="dark"]) .ui-cac [data-tone="amber"] { --ui-cac-g: #f5c264; --ui-cac-g-bg: rgba(240, 160, 32, 0.16); }
:where(.dark, [data-theme="dark"]) .ui-cac [data-tone="gray"] { --ui-cac-g: rgba(255, 255, 255, 0.62); --ui-cac-g-bg: rgba(255, 255, 255, 0.08); }
`;
var valueValue9 = [
  {
    id: `caching`,
    site: `Tokenwise`,
    title: `Prompt caching, explained: what gets stored and for how long`,
    url: `https://tokenwise.dev/blog/prompt-caching`,
    date: `Sep 18, 2026`,
    quote: `A cached prefix is read instead of recomputed. On prompts over 10,000 tokens this cut time to first token by up to 80% in our tests, and cached input is billed at a fraction of the normal rate.`,
    highlight: [`read instead of recomputed`, `cut time to first token by up to 80%`],
  },
  {
    id: `prompts`,
    site: `Latency Notes`,
    title: `Designing cache-friendly prompts`,
    url: `https://latencynotes.io/cache-friendly-prompts`,
    date: `Aug 2, 2026`,
    quote: `Keep the stable part – system prompt, tool definitions, long documents – at the very start, and put anything that changes per request after it. A single changed character early on invalidates everything behind it.`,
    highlight: [
      `at the very start`,
      `anything that changes per request after it`,
      `invalidates everything behind it`,
    ],
  },
  {
    id: `semantic`,
    site: `Inference Weekly`,
    title: `Semantic caching for LLM apps in production`,
    url: `https://inferenceweekly.com/semantic-caching`,
    date: `Jul 24, 2026`,
    quote: `For FAQ-style traffic, the semantic cache answered 31% of requests without calling the model at all, at a median of 40 ms. We only serve a stored answer above a similarity of 0.92.`,
    highlight: [`31% of requests`, `median of 40 ms`],
  },
];
var valueValue10 = [
  {
    text: `The biggest win is prompt caching: the provider reuses the processed start of your prompt, so a long system prompt isn't recomputed on every call.`,
    cite: [`caching`],
  },
  {
    text: ` On prompts over 10K tokens that can cut time to first token by up to 80%.`,
    cite: [`caching`],
  },
  {
    text: ` It only works while that start stays identical, so put the system prompt, tools and long documents first and anything that changes per request last.`,
    cite: [`prompts`, `caching`],
  },
  {
    text: `For repeated questions, add a semantic cache in front of the model: close matches get a stored answer in about 40 ms,`,
    cite: [`semantic`],
    paragraph: true,
  },
  {
    text: ` which covered nearly a third of FAQ-style traffic in one production setup.`,
    cite: [`semantic`],
  },
  {
    text: ` Stream the rest, so people see the first words while the answer is still being written.`,
  },
];
function CitedAnswerCleanDemo2() {
  let e = React.useRef<HTMLDivElement | null>(null),
    t = React.useRef(false),
    i = React.useRef(false);
  React.useEffect(() => {
    let n = (t: string) => e.current?.querySelector<HTMLElement>(t),
      r = (t: Element | null | undefined, n: string) => {
        t &&
          ((i.current = true),
          t.dispatchEvent(
            new PointerEvent(n, {
              bubbles: true,
              pointerType: `mouse`,
              relatedTarget: n === `pointerout` ? e.current : null,
            }),
          ),
          (i.current = false));
      },
      a = (e: string) => n(`.ui-cac__marker[data-source="${e}"]`),
      o: [number, () => void][] = [
        [700, () => r(a(`caching`), `pointerover`)],
        [2600, () => r(a(`caching`), `pointerout`)],
        [500, () => a(`prompts`)?.click()],
        [3800, () => n(`.ui-cac__close`)?.click()],
        [1800, () => {}],
      ],
      s = 0,
      c = 0,
      l = () => {
        t.current ||
          (c = window.setTimeout(() => {
            t.current || (o[s][1](), (s = (s + 1) % o.length), l());
          }, o[s][0]));
      };
    return (l(), () => window.clearTimeout(c));
  }, []);
  let a: () => void = () => {
    i.current || (t.current = true);
  };
  return (
    <div
      ref={e}
      className={`ca-demo`}
      onPointerEnter={a}
      onPointerDownCapture={a}
      onKeyDownCapture={a}
      onFocusCapture={a}
    >
      <CitedAnswerClean
        segments={valueValue10}
        sources={valueValue9}
        pagesRead={12}
        onOpenSource={() => {}}
        action={{
          label: `Follow up`,
          onClick: () => {},
        }}
      />
    </div>
  );
}
const demoStyles =
  ".ca-demo{grid-template-columns:min(440px,100%);place-content:start center;width:100%;height:640px;display:grid}.card__preview .ca-demo{grid-template-columns:auto;height:auto;position:absolute;inset:44px 0 0}.card__preview .ca-demo .ui-ca{zoom:.5;width:440px;max-width:none}.stage:has(.ca-demo){height:740px}@media (width<=760px){.ca-demo{height:auto}.stage:has(.ca-demo){align-items:start;height:1040px;padding:120px 16px 24px}}.card__preview .ca-demo .ui-cac{zoom:.5;width:440px;max-width:none}\n";
function CitedAnswerCleanDemo(props: React.JSX.IntrinsicAttributes) {
  return (
    <>
      <style href="plico-demo-cited-answer-clean" precedence="default">
        {demoStyles}
      </style>
      <CitedAnswerCleanDemo2 {...props} />
    </>
  );
}
export { CitedAnswerClean };
export { CitedAnswerCleanDemo };
export { CitedAnswerClean as Component };
export { CitedAnswerCleanDemo as Demo };
export default CitedAnswerClean;

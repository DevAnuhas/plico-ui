"use client";

import * as React from "react";
import * as JSXRuntime from "react/jsx-runtime";
var ys = [];
var bs = new Set();
var xs = [];
var Ss = 0;
var Cs = (e) => {
  ((ys = e), bs.forEach((e) => e()));
};
var ws = (e) => (
  bs.add(e),
  () => {
    bs.delete(e);
  }
);
var Ts = () => ys;
var Es = () => xs;
function Ds(e, t, n = {}, r = false) {
  let { id: i, ...a } = n,
    o = i === void 0 ? void 0 : ys.find((e) => e.id === i && !e.removing);
  if (o)
    return (
      Cs(
        ys.map((n) =>
          n === o
            ? {
                ...n,
                ...a,
                type: e,
                title: t,
                version: n.version + 1,
              }
            : n,
        ),
      ),
      o.id
    );
  let s = i ?? `toast-${++Ss}`;
  return (
    r ||
      Cs([
        ...ys.filter((e) => e.id !== s),
        {
          ...a,
          id: s,
          type: e,
          title: t,
          version: 0,
        },
      ]),
    s
  );
}
var Os = 420;
function ks(e) {
  let t = ys.filter((t) => !t.removing && (e === void 0 || t.id === e));
  t.length &&
    (Cs(
      ys.map((e) =>
        t.includes(e)
          ? {
              ...e,
              removing: true,
            }
          : e,
      ),
    ),
    t.forEach((e) => e.onDismiss?.(e.id)),
    window.setTimeout(
      () => Cs(ys.filter((e) => !(e.removing && t.some((t) => t.id === e.id)))),
      Os,
    ));
}
var As = (e) =>
  typeof e == `object` && !!e && !React.isValidElement(e) && !Array.isArray(e) && `title` in e;
var js = (e) =>
  As(e)
    ? e
    : {
        title: e,
        description: void 0,
      };
function Ms(e, t, n = {}) {
  let r = typeof e == `function` ? e() : e,
    i = js(t.loading),
    a = Ds(`loading`, i.title, {
      ...n,
      description: i.description,
    }),
    o = (e, t) => {
      let r = js(t);
      Ds(
        e,
        r.title,
        {
          ...n,
          id: a,
          description: r.description,
        },
        true,
      );
    };
  return (
    r.then(
      (e) => o(`success`, typeof t.success == `function` ? t.success(e) : t.success),
      (e) => o(`error`, typeof t.error == `function` ? t.error(e) : t.error),
    ),
    r
  );
}
var Ns = Object.assign((e, t) => Ds(`default`, e, t), {
  success: (e, t) => Ds(`success`, e, t),
  error: (e, t) => Ds(`error`, e, t),
  info: (e, t) => Ds(`info`, e, t),
  loading: (e, t) => Ds(`loading`, e, t),
  promise: Ms,
  dismiss: ks,
});
function Ps() {
  return (
    <svg viewBox={`0 0 24 24`} className={`ui-ts__status`} aria-hidden={`true`}>
      <g className={`ui-ts__spin`}>
        <circle className={`ui-ts__ring`} cx={`12`} cy={`12`} r={`9.25`} pathLength={1} />
      </g>
      <path className={`ui-ts__mark ui-ts__check`} d={`M8.3 12.4l2.5 2.5 4.9-5.3`} pathLength={1} />
      <path className={`ui-ts__mark ui-ts__x1`} d={`M9.5 9.5l5 5`} pathLength={1} />
      <path className={`ui-ts__mark ui-ts__x2`} d={`M14.5 9.5l-5 5`} pathLength={1} />
      <path className={`ui-ts__info`} d={`M12 11.2v4.6M12 8.2h.01`} />
    </svg>
  );
}
var Fs = () => (
  <svg viewBox={`0 0 24 24`} className={`ui-ts__glyph`} aria-hidden={`true`}>
    <path d={`M7.5 7.5l9 9M16.5 7.5l-9 9`} />
  </svg>
);
var Is = (e) => String(e.id);
function Ls({
  t: e,
  layout: t,
  edge: n,
  paused: r,
  defaultDuration: i,
  hairline: a,
  closeButton: o,
  onHeight: s,
}) {
  let [c, l] = React.useState(false),
    [u, d] = React.useState(false),
    [f, p] = React.useState(null),
    h = React.useRef(null),
    g = React.useRef(null),
    _ = React.useRef({
      title: e.title,
      description: e.description,
      version: e.version,
    }),
    v = React.useRef(0),
    y = React.useRef({
      version: -1,
      left: 0,
    }),
    b = React.useRef(null),
    x = React.useRef(false),
    S = !!e.removing;
  (React.useEffect(() => {
    let e = requestAnimationFrame(() => requestAnimationFrame(() => l(true)));
    return () => cancelAnimationFrame(e);
  }, []),
    React.useLayoutEffect(() => {
      let t = h.current;
      if (!t) return;
      let n = Is(e),
        r = () => s(n, t.offsetHeight);
      r();
      let i = new ResizeObserver(r);
      return (i.observe(t), () => i.disconnect());
    }, []),
    React.useLayoutEffect(() => {
      let t = _.current;
      t.version !== e.version &&
        ((_.current = {
          title: e.title,
          description: e.description,
          version: e.version,
        }),
        (t.title !== e.title || t.description !== e.description) &&
          (p(t),
          window.clearTimeout(v.current),
          (v.current = window.setTimeout(() => p(null), 320))));
    }, [e.version]),
    React.useEffect(() => () => window.clearTimeout(v.current), []));
  let ee = e.duration ?? i,
    te = e.type !== `loading` && Number.isFinite(ee),
    ne = te && !r && !u && !S;
  React.useEffect(() => {
    if (
      (y.current.version !== e.version &&
        (y.current = {
          version: e.version,
          left: ee,
        }),
      !ne)
    )
      return;
    let t = e.version,
      n = Date.now(),
      r = window.setTimeout(() => ks(e.id), Math.max(0, y.current.left));
    return () => {
      (window.clearTimeout(r), y.current.version === t && (y.current.left -= Date.now() - n));
    };
  }, [ne, e.version, ee, e.id]);
  let re = (e) => {
      e.button !== 0 ||
        S ||
        e.target.closest(`button, a, input, textarea, select`) ||
        ((b.current = {
          pointer: e.pointerId,
          x: e.clientX,
          y: e.clientY,
          axis: null,
          samples: [],
        }),
        (x.current = false));
    },
    C = (e) => {
      let t = b.current,
        r = g.current;
      if (!t || t.pointer !== e.pointerId || !r) return;
      let i = e.clientX - t.x,
        a = e.clientY - t.y;
      if (!t.axis) {
        if (Math.hypot(i, a) < 6) return;
        ((t.axis = Math.abs(i) > Math.abs(a) ? `x` : `y`),
          e.currentTarget.setPointerCapture(e.pointerId),
          (x.current = true),
          d(true),
          (r.style.transition = `none`));
      }
      let o = t.axis === `x` ? i : a,
        s = t.axis === `x` || o * n > 0;
      s || (o = Math.sign(o) * Math.abs(o) ** 0.7 * 0.6);
      let c = t.axis === `x` ? r.offsetWidth : r.offsetHeight * 2;
      ((r.style.transform = t.axis === `x` ? `translateX(${o}px)` : `translateY(${o}px)`),
        (r.style.opacity = s ? String(Math.max(0.25, 1 - Math.abs(o) / (c * 1.1))) : ``),
        t.samples.push({
          v: o,
          at: e.timeStamp,
        }),
        t.samples.length > 6 && t.samples.shift());
    },
    ie = (t) => {
      let r = b.current,
        i = g.current;
      if (!r || r.pointer !== t.pointerId || ((b.current = null), !r.axis || !i)) return;
      d(false);
      let a = r.samples[r.samples.length - 1] ?? {
          v: 0,
          at: 0,
        },
        o = r.samples[0] ?? a,
        s = a.at > o.at ? (a.v - o.v) / (a.at - o.at) : 0,
        c = r.axis === `x` || a.v * n > 0,
        l = Math.abs(s) > 0.45 && Math.sign(s) === Math.sign(a.v);
      if (t.type === `pointerup` && c && (Math.abs(a.v) > 64 || l)) {
        let t = (r.axis === `x` ? i.offsetWidth : i.offsetHeight) + 48;
        ((i.style.transition = `transform 300ms cubic-bezier(0.22, 1, 0.36, 1), opacity 240ms ease`),
          (i.style.transform = `${r.axis === `x` ? `translateX` : `translateY`}(${Math.sign(a.v) * t}px)`),
          (i.style.opacity = `0`),
          ks(e.id));
      } else ((i.style.transition = ``), (i.style.transform = ``), (i.style.opacity = ``));
    },
    ae = -n,
    oe = `translateY(${ae * t.y}px) scale(${t.scale})`;
  (c || (oe = `translateY(${n * 100}%) scale(${t.scale})`),
    S && (oe = `translateY(${ae * t.y + n * 10}px) scale(${t.scale * 0.96})`));
  let se = e.type === `loading` ? <Ps /> : (e.icon ?? (e.type === "default" ? null : <Ps />));
  return (
    <li
      className={`ui-ts__toast`}
      data-toast-id={Is(e)}
      data-type={e.type}
      data-behind={t.behind || void 0}
      data-removing={S || void 0}
      data-swiping={u || void 0}
      tabIndex={0}
      inert={t.hidden || S}
      style={{
        transform: oe,
        opacity: !c || S || t.hidden ? 0 : 1,
        height: t.height ? `${t.height}px` : void 0,
        zIndex: t.z,
      }}
      onPointerDown={re}
      onPointerMove={C}
      onPointerUp={ie}
      onPointerCancel={ie}
      onClickCapture={(e) => {
        x.current && ((x.current = false), e.stopPropagation(), e.preventDefault());
      }}
    >
      <div ref={g} className={`ui-ts__swipe`}>
        <div className={`ui-ts__card`}>
          <div ref={h} className={`ui-ts__content`} data-action={e.action ? `` : void 0}>
            {se && (
              <span
                className={`ui-ts__icon`}
                data-type={e.icon && e.type !== `loading` ? `custom` : e.type}
              >
                {se}
              </span>
            )}
            <div className={`ui-ts__text`}>
              <div className={`ui-ts__copy`} data-changed={e.version > 0 || void 0} key={e.version}>
                <div className={`ui-ts__title`}>{e.title}</div>
                {e.description != null && e.description !== `` && (
                  <div className={`ui-ts__desc`}>{e.description}</div>
                )}
              </div>
              {f && (
                <div
                  className={`ui-ts__copy ui-ts__ghost`}
                  aria-hidden={`true`}
                  key={`ghost-${f.version}`}
                >
                  <div className={`ui-ts__title`}>{f.title}</div>
                  {f.description != null && f.description !== `` && (
                    <div className={`ui-ts__desc`}>{f.description}</div>
                  )}
                </div>
              )}
            </div>
            {e.action && (
              <button
                type={`button`}
                className={`ui-ts__action`}
                onClick={(t) => {
                  (e.action.onClick(t), t.defaultPrevented || ks(e.id));
                }}
              >
                {e.action.label}
              </button>
            )}
          </div>
          {a && te && (
            <span
              className={`ui-ts__timer`}
              aria-hidden={`true`}
              style={{
                animationDuration: `${ee}ms`,
                animationPlayState: ne ? `running` : `paused`,
              }}
              key={e.version}
            />
          )}
        </div>
        {o && (
          <button
            type={`button`}
            className={`ui-ts__close`}
            aria-label={`Dismiss notification`}
            onClick={() => ks(e.id)}
          >
            <Fs />
          </button>
        )}
      </div>
    </li>
  );
}
var Rs = 10;
var zs = 0.05;
var Bs = {
  y: 0,
  scale: 1,
  height: 0,
  z: 0,
  behind: false,
  hidden: true,
};
function Vs({
  position: e = `bottom-right`,
  inline: t = false,
  id: n,
  duration: r = 4e3,
  visibleToasts: i = 3,
  expand: a = false,
  offset: o,
  gap: s = 10,
  hotkey: c = `F8`,
  hairline: l = true,
  closeButton: u = true,
  label: d = `Notifications`,
  className: f,
}) {
  let p = React.useSyncExternalStore(ws, Ts, Es),
    [h, g] = React.useState({}),
    [_, v] = React.useState(false),
    [y, b] = React.useState(false),
    [x, S] = React.useState(false),
    [ee, te] = React.useState(false),
    [ne, re] = React.useState(``),
    [C, ie] = React.useState(``),
    ae = React.useRef(null),
    oe = React.useRef(new Map()),
    se = React.useRef(0),
    ce = React.useRef(null),
    le = React.useRef(`mouse`),
    ue = React.useRef(new Map()),
    [de, fe] = e.split(`-`),
    pe = de === `bottom` ? 1 : -1,
    me = p.filter((e) => (e.toaster ?? null) === (n ?? null)).reverse(),
    w = me.filter((e) => !e.removing),
    he = a || _ || y || x,
    ge = _ || y || x || ee,
    _e = Math.max(1, i),
    ve = React.useCallback((e, t) => {
      g((n) =>
        n[e] === t
          ? n
          : {
              ...n,
              [e]: t,
            },
      );
    }, []),
    ye = (w[0] && h[Is(w[0])]) || se.current;
  ye && (se.current = ye);
  let be = new Map(),
    xe = 0;
  w.forEach((e, t) => {
    let n = h[Is(e)] ?? 0,
      r = Math.min(t, _e - 1),
      i = he
        ? {
            y: xe,
            scale: 1,
            height: n,
            z: w.length - t,
            behind: false,
            hidden: t >= _e,
          }
        : {
            y: r * Rs,
            scale: 1 - r * zs,
            height: t === 0 ? n : ye,
            z: w.length - t,
            behind: t > 0,
            hidden: t >= _e,
          };
    (t < _e && (xe += n + s), be.set(Is(e), i), oe.current.set(Is(e), i));
  });
  let Se = Math.min(w.length, _e),
    Ce = w.length ? (he ? Math.max(0, xe - s) : ye + Rs * (Se - 1)) : 0;
  (React.useEffect(() => {
    let e = new Set(me.map(Is));
    (g((t) => {
      let n = Object.keys(t).filter((t) => !e.has(t));
      if (!n.length) return t;
      let r = {
        ...t,
      };
      return (n.forEach((e) => delete r[e]), r);
    }),
      oe.current.forEach((t, n) => !e.has(n) && oe.current.delete(n)),
      w.length || S(false));
  }, [p]),
    React.useEffect(() => {
      let e = ae.current;
      e &&
        (w.forEach((t) => {
          let n = Is(t);
          if (ue.current.get(n) === t.version) return;
          ue.current.set(n, t.version);
          let r = Array.from(e.querySelectorAll(`[data-toast-id]`))
            .find((e) => e.dataset.toastId === n)
            ?.querySelector(`.ui-ts__copy:not(.ui-ts__ghost)`)
            ?.textContent?.trim();
          r && (t.type === `error` ? ie : re)((e) => (e === r ? `${r} ` : r));
        }),
        ue.current.forEach((e, t) => !me.some((e) => Is(e) === t) && ue.current.delete(t)));
    }, [p]),
    React.useEffect(() => {
      let e = () => te(document.visibilityState === `hidden`);
      return (
        e(),
        document.addEventListener(`visibilitychange`, e),
        () => document.removeEventListener(`visibilitychange`, e)
      );
    }, []),
    React.useEffect(() => {
      if (!x) return;
      let e = (e) => {
        ae.current?.contains(e.target) || S(false);
      };
      return (
        document.addEventListener(`pointerdown`, e),
        () => document.removeEventListener(`pointerdown`, e)
      );
    }, [x]));
  let we = () =>
    Array.from(ae.current?.querySelectorAll(`[data-toast-id]:not([data-removing])`) ?? []);
  React.useEffect(() => {
    if (!c) return;
    let e = (e) => {
      if (e.key !== c && e.code !== c) return;
      let t = we().find((e) => !e.inert);
      t &&
        (e.preventDefault(),
        ae.current?.contains(document.activeElement) || (ce.current = document.activeElement),
        t.focus());
    };
    return (window.addEventListener(`keydown`, e), () => window.removeEventListener(`keydown`, e));
  }, [c]);
  let Te = (e) => {
      if (e.key !== `Escape` || !w.length) return;
      (e.preventDefault(), e.stopPropagation());
      let t = e.target.closest(`[data-toast-id]`),
        n = w.find((e) => Is(e) === t?.dataset.toastId) ?? w[0],
        r = w.indexOf(n);
      ks(n.id);
      let i = w.filter((e) => e !== n)[Math.min(r, w.length - 2)],
        a = i && we().find((e) => e.dataset.toastId === Is(i));
      a ? a.focus() : ce.current?.isConnected ? ce.current.focus() : document.activeElement?.blur();
    },
    T = (e) => {
      e.target.matches(`:focus-visible`) && b(true);
    },
    E = (e) => {
      e.currentTarget.contains(e.relatedTarget) || b(false);
    },
    Ee = {
      "--ui-ts-offset": o === void 0 ? void 0 : `${o}px`,
    };
  return (
    <section
      ref={ae}
      className={[`ui-ts`, f].filter(Boolean).join(` `)}
      data-y={de}
      data-x={fe}
      data-inline={t || void 0}
      data-expanded={he || void 0}
      data-empty={!w.length || void 0}
      aria-label={c ? `${d} (${c})` : d}
      tabIndex={-1}
      style={Ee}
      onKeyDown={Te}
      onFocus={T}
      onBlur={E}
      onPointerDownCapture={(e) => (le.current = e.pointerType)}
      onPointerEnter={(e) => e.pointerType === `mouse` && v(true)}
      onPointerLeave={(e) => e.pointerType === `mouse` && v(false)}
      onClick={() => le.current !== `mouse` && w.length > 1 && S(true)}
    >
      <style href={`ui-toaster`} precedence={`default`}>
        {Hs}
      </style>
      <ol
        className={`ui-ts__list`}
        style={{
          height: `${Ce}px`,
        }}
      >
        {me.map((e) => (
          <Ls
            t={e}
            layout={be.get(Is(e)) ?? oe.current.get(Is(e)) ?? Bs}
            edge={pe}
            paused={ge || (be.get(Is(e))?.hidden ?? false)}
            defaultDuration={r}
            hairline={l}
            closeButton={u}
            onHeight={ve}
            key={Is(e)}
          />
        ))}
      </ol>
      <div className={`ui-ts__sr`} role={`status`} aria-live={`polite`}>
        {ne}
      </div>
      <div className={`ui-ts__sr`} role={`alert`}>
        {C}
      </div>
    </section>
  );
}
var Hs = `
/* Colors and motion as variables – override them on .ui-ts */
.ui-ts {
  --ui-ts-card: #ffffff;
  --ui-ts-line: #ececec;
  --ui-ts-ink: #171717;
  --ui-ts-text: #404040;
  --ui-ts-muted: #8f8f8f;
  --ui-ts-faint: #b5b5b5;
  --ui-ts-button: #f0f0f0;
  --ui-ts-button-hover: #e6e6e7;
  --ui-ts-hairline: rgba(23, 23, 23, 0.14);
  --ui-ts-success: #2f9e5b;
  --ui-ts-danger: #e5484d;
  --ui-ts-shadow: 0 0 0 1px var(--ui-ts-line), 0 1px 2px rgba(0, 0, 0, 0.04), 0 8px 24px -6px rgba(0, 0, 0, 0.1);
  --ui-ts-focus: rgba(23, 23, 23, 0.22);
  --ui-ts-ease: cubic-bezier(0.22, 1, 0.36, 1);
  --ui-ts-width: 356px;
  --ui-ts-offset: 24px;
  position: fixed;
  z-index: 9999;
  box-sizing: border-box;
  width: var(--ui-ts-width);
  max-width: calc(100% - 2 * var(--ui-ts-offset));
  margin: 0;
  padding: 0;
  font-family: "Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  font-size: 13.5px;
  line-height: 1.45;
  color: var(--ui-ts-text);
  -webkit-font-smoothing: antialiased;
  outline: none;
}
.ui-ts[data-inline] { position: absolute; z-index: 20; --ui-ts-offset: 20px; }
.ui-ts[data-empty] { pointer-events: none; }
.ui-ts *, .ui-ts *::before, .ui-ts *::after { box-sizing: border-box; }
:where(.ui-ts) button { margin: 0; padding: 0; border: 0; background: none; font: inherit; color: inherit; cursor: pointer; }
:where(.ui-ts) svg { display: block; flex: none; }
.ui-ts button:focus-visible { outline: 2px solid var(--ui-ts-focus); outline-offset: 2px; }

/* Corners and edge centers */
.ui-ts[data-y="bottom"] { bottom: var(--ui-ts-offset); }
.ui-ts[data-y="top"] { top: var(--ui-ts-offset); }
.ui-ts[data-x="right"] { right: var(--ui-ts-offset); }
.ui-ts[data-x="left"] { left: var(--ui-ts-offset); }
.ui-ts[data-x="center"] { left: 50%; transform: translateX(-50%); }
.ui-ts:not([data-inline])[data-y="bottom"] { bottom: max(var(--ui-ts-offset), env(safe-area-inset-bottom)); }

.ui-ts__list { position: relative; margin: 0; padding: 0; list-style: none; }

/* A toast: positioned by transform, sized by height – both glide */
.ui-ts__toast {
  position: absolute;
  left: 0;
  right: 0;
  outline: none;
  touch-action: none;
  -webkit-user-select: none;
  user-select: none;
  transition: transform 440ms var(--ui-ts-ease), opacity 320ms ease, height 380ms var(--ui-ts-ease);
}
.ui-ts[data-y="bottom"] .ui-ts__toast { bottom: 0; transform-origin: 50% 0; }
.ui-ts[data-y="top"] .ui-ts__toast { top: 0; transform-origin: 50% 100%; }
.ui-ts__toast[data-removing] { pointer-events: none; transition: transform 380ms var(--ui-ts-ease), opacity 260ms ease, height 380ms var(--ui-ts-ease); }

/* The swipe layer moves on its own, so the stack's transform never fights the finger */
.ui-ts__swipe { position: relative; height: 100%; transition: transform 460ms cubic-bezier(0.34, 1.3, 0.64, 1), opacity 260ms ease; }
.ui-ts__toast[data-swiping] { cursor: grabbing; }

.ui-ts__card { position: relative; height: 100%; overflow: hidden; border-radius: 14px; background: var(--ui-ts-card); box-shadow: var(--ui-ts-shadow); }
.ui-ts__toast:focus-visible .ui-ts__card { outline: 2px solid var(--ui-ts-focus); outline-offset: 2px; }

/* Content is measured; the card clips it while it grows or shrinks */
.ui-ts__content { display: flex; align-items: flex-start; gap: 10px; padding: 14px; transition: opacity 260ms ease; }
.ui-ts__content[data-action] { padding-right: 10px; }
/* Toasts behind the front one only show their edge */
.ui-ts__toast[data-behind] .ui-ts__content,
.ui-ts__toast[data-behind] .ui-ts__timer { opacity: 0; }

.ui-ts__text { position: relative; flex: 1; min-width: 0; }
.ui-ts__title { color: var(--ui-ts-ink); font-weight: 500; line-height: 20px; overflow-wrap: anywhere; }
.ui-ts__desc { margin-top: 1px; font-size: 13px; line-height: 18px; color: var(--ui-ts-muted); overflow-wrap: anywhere; }
/* Changed text slides in with a soft blur; the old text fades out on top */
.ui-ts__copy[data-changed] { animation: ui-ts-text-in 300ms var(--ui-ts-ease) both; }
.ui-ts__ghost { position: absolute; top: 0; left: 0; right: 0; pointer-events: none; animation: ui-ts-text-out 220ms ease both; }

/* Status icon: one drawing that morphs from spinner to check or cross */
.ui-ts__icon { display: grid; place-items: center; flex: none; width: 20px; height: 20px; color: var(--ui-ts-muted); transition: color 300ms ease; }
.ui-ts__icon[data-type="success"] { color: var(--ui-ts-success); }
.ui-ts__icon[data-type="error"] { color: var(--ui-ts-danger); }
.ui-ts__icon[data-type="info"] { color: var(--ui-ts-ink); }
.ui-ts__icon[data-type="custom"] > * { width: 18px; height: 18px; }
.ui-ts__status { width: 18px; height: 18px; overflow: visible; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
.ui-ts__icon[data-type="success"] .ui-ts__status,
.ui-ts__icon[data-type="error"] .ui-ts__status { animation: ui-ts-pop 460ms cubic-bezier(0.34, 1.56, 0.64, 1) both; }
.ui-ts__spin { transform-box: fill-box; transform-origin: center; animation: ui-ts-spin 760ms linear infinite; animation-play-state: paused; }
.ui-ts__icon[data-type="loading"] .ui-ts__spin { animation-play-state: running; }
/* The arc closes into a quiet ring; the spin freezes where it is, so nothing jumps */
.ui-ts__ring { stroke-dasharray: 1 0; stroke-opacity: 0.28; transition: stroke-dasharray 560ms var(--ui-ts-ease), stroke-opacity 360ms ease; }
.ui-ts__icon[data-type="loading"] .ui-ts__ring { stroke-dasharray: 0.28 0.72; stroke-opacity: 1; }
.ui-ts__mark { stroke-dasharray: 1; stroke-dashoffset: 1; opacity: 0; }
.ui-ts__info { opacity: 0; transition: opacity 240ms ease; }
.ui-ts__icon[data-type="success"] .ui-ts__check,
.ui-ts__icon[data-type="error"] .ui-ts__x1,
.ui-ts__icon[data-type="error"] .ui-ts__x2 { opacity: 1; stroke-dashoffset: 0; animation: ui-ts-draw 340ms var(--ui-ts-ease) 160ms both; }
.ui-ts__icon[data-type="error"] .ui-ts__x2 { animation-delay: 260ms; }
.ui-ts__icon[data-type="info"] .ui-ts__info { opacity: 1; }

.ui-ts__action {
  flex: none;
  align-self: center;
  height: 28px;
  margin: -4px 0;
  padding: 0 10px;
  border-radius: 8px;
  background: var(--ui-ts-button);
  font-size: 12.5px;
  font-weight: 500;
  color: var(--ui-ts-ink);
  white-space: nowrap;
  transition: background-color 160ms ease;
}
.ui-ts__action:hover { background: var(--ui-ts-button-hover); }

/* Close: a small round button on the corner, shown on hover and focus */
.ui-ts__close {
  position: absolute;
  top: -7px;
  left: -7px;
  z-index: 1;
  display: grid;
  place-items: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--ui-ts-card);
  box-shadow: 0 0 0 1px var(--ui-ts-line), 0 1px 3px rgba(0, 0, 0, 0.08);
  color: var(--ui-ts-muted);
  opacity: 0;
  transform: scale(0.8);
  transition: opacity 160ms ease, transform 200ms var(--ui-ts-ease), color 160ms ease;
}
.ui-ts__close::before { content: ""; position: absolute; inset: -6px; }
.ui-ts__close:hover { color: var(--ui-ts-ink); }
.ui-ts__toast:not([data-behind]):hover .ui-ts__close,
.ui-ts__toast:not([data-behind]):focus-within .ui-ts__close { opacity: 1; transform: none; }
.ui-ts__glyph { width: 12px; height: 12px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; }

/* The timer as a hairline – it stops whenever the timer does */
.ui-ts__timer {
  position: absolute;
  left: 14px;
  right: 14px;
  bottom: 0;
  height: 1px;
  background: var(--ui-ts-hairline);
  transform-origin: left;
  animation-name: ui-ts-timer;
  animation-timing-function: linear;
  animation-fill-mode: both;
  transition: opacity 260ms ease;
}

.ui-ts__sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }

@keyframes ui-ts-spin { to { transform: rotate(360deg); } }
@keyframes ui-ts-draw { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }
@keyframes ui-ts-pop { 0% { transform: scale(0.82); } 55% { transform: scale(1.08); } 100% { transform: scale(1); } }
@keyframes ui-ts-timer { from { transform: scaleX(1); } to { transform: scaleX(0); } }
@keyframes ui-ts-text-in { from { opacity: 0; transform: translateY(4px); filter: blur(3px); } to { opacity: 1; transform: none; filter: none; } }
@keyframes ui-ts-text-out { from { opacity: 1; } to { opacity: 0; transform: translateY(-4px); filter: blur(3px); } }

/* Phones: full width along the edge with 12px gutters */
@media (max-width: 600px) {
  .ui-ts, .ui-ts[data-x] { left: 12px; right: 12px; width: auto; max-width: none; transform: none; }
  .ui-ts[data-y="bottom"] { bottom: 12px; }
  .ui-ts:not([data-inline])[data-y="bottom"] { bottom: max(12px, env(safe-area-inset-bottom)); }
  .ui-ts[data-y="top"] { top: 12px; }
}
/* Touch screens: a visible close button with a big hit area, a taller action button */
@media (hover: none) and (pointer: coarse) {
  .ui-ts__toast:not([data-behind]) .ui-ts__close { opacity: 1; transform: none; }
  .ui-ts__close { width: 24px; height: 24px; top: -8px; left: -8px; }
  .ui-ts__close::before { inset: -8px; }
  .ui-ts__action { height: 36px; margin: -8px -2px -8px 0; padding: 0 14px; border-radius: 10px; font-size: 13px; }
}
@media (prefers-reduced-motion: reduce) {
  .ui-ts *:not(.ui-ts__spin):not(.ui-ts__timer), .ui-ts *::before, .ui-ts *::after { animation: none !important; transition: none !important; }
}

/* Dark mode: follows a .dark class or data-theme="dark" on any ancestor, e.g. <html> */
:where(.dark, [data-theme="dark"]) .ui-ts {
  --ui-ts-card: #19191b;
  --ui-ts-line: #2a2a2e;
  --ui-ts-ink: #ededed;
  --ui-ts-text: #c8c8cc;
  --ui-ts-muted: #8b8b92;
  --ui-ts-faint: #5c5c63;
  --ui-ts-button: #26262a;
  --ui-ts-button-hover: #2e2e33;
  --ui-ts-hairline: rgba(255, 255, 255, 0.16);
  --ui-ts-success: #4cc38a;
  --ui-ts-danger: #ff6369;
  --ui-ts-shadow: 0 0 0 1px var(--ui-ts-line), 0 1px 2px rgba(0, 0, 0, 0.3), 0 10px 28px -6px rgba(0, 0, 0, 0.5);
  --ui-ts-focus: rgba(255, 255, 255, 0.3);
}
`;
var Js = `M38 0H176Q196 0 204 14L218 30Q224 38 246 38H562Q600 38 600 76V462Q600 500 562 500H38Q0 500 0 462V38Q0 0 38 0Z`;
var Ys = [78, 180, 140, 175, 126, 168, 110];
function GlassFolderComponent({
  className: e,
  label: t = `Blue folder holding three documents behind a frosted front pocket`,
}) {
  let n = `ui-fd` + React.useId().replace(/[^a-zA-Z0-9_-]/g, ``);
  return (
    <div className={[`ui-fd`, e].filter(Boolean).join(` `)} role={`img`} aria-label={t}>
      <style href={`ui-glass-folder`} precedence={`default`}>
        {Zs}
      </style>
      <div className={`ui-fd-icon`} aria-hidden={`true`}>
        <svg className={`ui-fd-layer ui-fd-back`} viewBox={`0 0 600 500`}>
          <defs>
            <filter id={`${n}-hl`} x={`-10%`} y={`-10%`} width={`120%`} height={`120%`}>
              <feGaussianBlur in={`SourceAlpha`} stdDeviation={`4`} result={`blur`} />
              <feOffset in={`blur`} dy={`3`} result={`offset`} />
              <feComposite
                in={`blur`}
                in2={`offset`}
                operator={`arithmetic`}
                k2={`1`}
                k3={`-1`}
                result={`diff`}
              />
              <feFlood floodColor={`#fff`} floodOpacity={`0.65`} />
              <feComposite in2={`diff`} operator={`in`} result={`light`} />
              <feComposite in={`light`} in2={`SourceAlpha`} operator={`in`} />
            </filter>
          </defs>
          <path className={`ui-fd-back-fill`} d={Js} fill={`#5bb7ea`} />
          <path d={Js} fill={`#000`} filter={`url(#${n}-hl)`} />
        </svg>
        <svg className={`ui-fd-layer`} viewBox={`0 0 600 500`}>
          <defs>
            <linearGradient id={`${n}-paper`} x1={`0`} y1={`0`} x2={`0`} y2={`1`}>
              <stop className={`ui-fd-paper-top`} offset={`0%`} stopColor={`#fff`} />
              <stop className={`ui-fd-paper-bottom`} offset={`100%`} stopColor={`#eaf2f8`} />
            </linearGradient>
            <symbol id={`${n}-doc`} overflow={`visible`}>
              <rect
                className={`ui-fd-paper`}
                x={`0.6`}
                y={`0.6`}
                width={`278.8`}
                height={`348.8`}
                rx={`19.4`}
                fill={`url(#${n}-paper)`}
                stroke={`rgba(0,0,0,0.12)`}
                strokeWidth={`1.2`}
              />
              {Ys.map((e, t) => (
                <rect
                  className={`ui-fd-line`}
                  x={`30`}
                  y={87 + t * 28}
                  width={e}
                  height={`9`}
                  rx={`4.5`}
                  fill={`rgba(0,0,0,0.12)`}
                  key={t}
                />
              ))}
            </symbol>
          </defs>
          <use className={`ui-fd-doc ui-fd-doc--left`} href={`#${n}-doc`} />
          <use className={`ui-fd-doc ui-fd-doc--right`} href={`#${n}-doc`} />
          <use className={`ui-fd-doc ui-fd-doc--middle`} href={`#${n}-doc`} />
        </svg>
        <div className={`ui-fd-front`} />
      </div>
    </div>
  );
}
var Zs = `
.ui-fd {
  --ui-fd-ease: cubic-bezier(0.2, 0.85, 0.25, 1);
  position: relative;
  width: 100%;
  aspect-ratio: 3 / 2;
  overflow: hidden;
  container-type: inline-size;
  font-family: "Inter", ui-sans-serif, system-ui, -apple-system, sans-serif;
}

/* The folder is drawn on a 600 × 500 grid; cqw keeps every detail in proportion */
.ui-fd-icon {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 40%;
  aspect-ratio: 6 / 5;
  container-type: inline-size;
  perspective: 220cqw;
  perspective-origin: 50% 60%;
  transform: translate(-50%, -48%);
  transition: transform 0.6s var(--ui-fd-ease);
}
.ui-fd-icon:hover { transform: translate(-50%, -48%) scale(1.03); }

.ui-fd-layer { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; }
.ui-fd-back {
  filter:
    drop-shadow(0 4cqw 4.6cqw rgba(60, 130, 180, 0.28))
    drop-shadow(0 1.3cqw 2cqw rgba(60, 130, 180, 0.16))
    drop-shadow(0 0.3cqw 0.7cqw rgba(60, 130, 180, 0.1));
}

.ui-fd-doc {
  transform-box: fill-box;
  transform-origin: center;
  filter: drop-shadow(0 3px 4px rgba(0, 30, 60, 0.18));
  transition: transform 0.55s var(--ui-fd-ease);
}
.ui-fd-doc--left   { transform: translate(40px, 80px) rotate(6deg); }
.ui-fd-doc--right  { transform: translate(280px, 80px) rotate(6deg); }
.ui-fd-doc--middle { transform: translate(160px, 66px) rotate(-4deg); }
.ui-fd-icon:hover .ui-fd-doc--left   { transform: translate(32px, 70px) rotate(9deg); }
.ui-fd-icon:hover .ui-fd-doc--right  { transform: translate(286px, 76px) rotate(5deg); }
.ui-fd-icon:hover .ui-fd-doc--middle { transform: translate(166px, 52px) rotate(-7deg); }

/* Pocket: top edge at 108 of 500, corners 38; on hover it drops to 124 and tips forward */
.ui-fd-front {
  position: absolute;
  inset: 21.6% 0 0;
  border-radius: 6.333cqw;
  background:
    linear-gradient(180deg, rgba(0, 40, 75, 0) 74%, rgba(0, 40, 75, 0.28) 100%),
    linear-gradient(180deg, rgba(132, 214, 248, 0.45) 0%, rgba(69, 170, 220, 0.45) 100%);
  box-shadow: inset 0 0 0 0.67cqw rgba(255, 255, 255, 0.3), inset 0 0.25cqw 0 rgba(255, 255, 255, 0.55);
  -webkit-backdrop-filter: blur(3.3cqw) saturate(1.1);
  backdrop-filter: blur(3.3cqw) saturate(1.1);
  transform-origin: 50% 100%;
  transition: top 0.6s var(--ui-fd-ease), border-radius 0.6s var(--ui-fd-ease), transform 0.6s var(--ui-fd-ease);
}
.ui-fd-icon:hover .ui-fd-front {
  top: 24.8%;
  border-radius: 3cqw 3cqw 6.333cqw 6.333cqw;
  transform: translateZ(2.33cqw) rotateX(-9deg);
}

/* Dark mode: follows a .dark class or data-theme="dark" on any ancestor, e.g. <html>.
   Dark paper with light lines, a deeper blue folder and a pocket that lets less light through. */
:where(.dark, [data-theme="dark"]) .ui-fd-back-fill { fill: #3d8fc6; }
:where(.dark, [data-theme="dark"]) .ui-fd-paper-top { stop-color: #34363c; }
:where(.dark, [data-theme="dark"]) .ui-fd-paper-bottom { stop-color: #26292f; }
:where(.dark, [data-theme="dark"]) .ui-fd-paper { stroke: rgba(255, 255, 255, 0.1); }
:where(.dark, [data-theme="dark"]) .ui-fd-line { fill: rgba(255, 255, 255, 0.16); }
:where(.dark, [data-theme="dark"]) .ui-fd-back {
  filter:
    drop-shadow(0 4cqw 4.6cqw rgba(0, 0, 0, 0.45))
    drop-shadow(0 1.3cqw 2cqw rgba(0, 0, 0, 0.3));
}
:where(.dark, [data-theme="dark"]) .ui-fd-doc { filter: drop-shadow(0 3px 4px rgba(0, 0, 0, 0.45)); }
:where(.dark, [data-theme="dark"]) .ui-fd-front {
  background:
    linear-gradient(180deg, rgba(0, 20, 40, 0) 70%, rgba(0, 20, 40, 0.4) 100%),
    linear-gradient(180deg, rgba(100, 190, 235, 0.42) 0%, rgba(45, 130, 190, 0.5) 100%);
  box-shadow: inset 0 0 0 0.67cqw rgba(255, 255, 255, 0.14), inset 0 0.25cqw 0 rgba(255, 255, 255, 0.3);
}

@media (prefers-reduced-motion: reduce) {
  .ui-fd-icon, .ui-fd-doc, .ui-fd-front { transition: none; }
}
`;
export { GlassFolderComponent as t };
export { Vs as r };
export { Ns as i };
export { GlassFolderComponent as PlicoCore_Xs };

export { Vs as PlicoApi_Toaster };

export { Ns as PlicoApi_toast };

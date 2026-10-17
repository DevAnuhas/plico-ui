"use client";

import * as React from "react";

export type ToastId = string | number;
export interface ToastOptions {
  id?: ToastId;
  toaster?: string;
  duration?: number;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  action?: {
    label: React.ReactNode;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
  };
  onDismiss?: (id: ToastId) => void;
}
type ToastKind = "default" | "success" | "error" | "info" | "loading";
interface ToastRecord extends ToastOptions {
  id: ToastId;
  type: ToastKind;
  title: React.ReactNode;
  version: number;
  removing?: boolean;
}
interface ToastContent {
  title: React.ReactNode;
  description?: React.ReactNode;
}
type ToastMessage = React.ReactNode | ToastContent;
interface ToastLayout {
  y: number;
  scale: number;
  height: number;
  z: number;
  behind: boolean;
  hidden: boolean;
}
interface Swipe {
  pointer: number;
  x: number;
  y: number;
  axis: "x" | "y" | null;
  samples: { v: number; at: number }[];
}

export interface ToasterProps {
  position?:
    | "top-left"
    | "top-center"
    | "top-right"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right";
  inline?: boolean;
  id?: string;
  duration?: number;
  visibleToasts?: number;
  expand?: boolean;
  offset?: number;
  gap?: number;
  hotkey?: string | null;
  hairline?: boolean;
  closeButton?: boolean;
  label?: string;
  className?: string;
}
var valueValue3: ToastRecord[] = [];
var valueValue4 = new Set<() => void>();
var valueValue5: ToastRecord[] = [];
var ValueValue = 0;
var ValueValue2 = (e: ToastRecord[]) => {
  ((valueValue3 = e), valueValue4.forEach((e) => e()));
};
var valueValue6 = (e: () => void) => (
  valueValue4.add(e),
  () => {
    valueValue4.delete(e);
  }
);
var ValueValue3 = () => valueValue3;
var ValueValue4 = () => valueValue5;
function ValueValue5(
  e: ToastKind,
  t: React.ReactNode,
  n: ToastOptions = {},
  r: boolean = false,
) {
  let { id: i, ...a } = n,
    o =
      i === void 0
        ? void 0
        : valueValue3.find((e) => e.id === i && !e.removing);
  if (o)
    return (
      ValueValue2(
        valueValue3.map((n) =>
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
  let s = i ?? `toast-${++ValueValue}`;
  return (
    r ||
      ValueValue2([
        ...valueValue3.filter((e) => e.id !== s),
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
var ValueValue6 = 420;
function valueValue7(e?: ToastId) {
  let t = valueValue3.filter(
    (t) => !t.removing && (e === void 0 || t.id === e),
  );
  t.length &&
    (ValueValue2(
      valueValue3.map((e) =>
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
      () =>
        ValueValue2(
          valueValue3.filter(
            (e) => !(e.removing && t.some((t) => t.id === e.id)),
          ),
        ),
      ValueValue6,
    ));
}
var ValueValue7 = (e: ToastMessage): e is ToastContent =>
  typeof e == `object` &&
  !!e &&
  !React.isValidElement(e) &&
  !Array.isArray(e) &&
  `title` in e;
var valueValue8 = (e: ToastMessage): ToastContent =>
  ValueValue7(e)
    ? e
    : {
        title: e,
        description: void 0,
      };
function ValueValue8<T>(
  e: Promise<T> | (() => Promise<T>),
  t: {
    loading: ToastMessage;
    success: ToastMessage | ((value: T) => ToastMessage);
    error: ToastMessage | ((error: unknown) => ToastMessage);
  },
  n: ToastOptions = {},
) {
  let r = typeof e == `function` ? e() : e,
    i = valueValue8(t.loading),
    a = ValueValue5(`loading`, i.title, {
      ...n,
      description: i.description,
    }),
    o = (e: ToastKind, t: ToastMessage) => {
      let r = valueValue8(t);
      ValueValue5(
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
      (e) =>
        o(`success`, typeof t.success == `function` ? t.success(e) : t.success),
      (e) => o(`error`, typeof t.error == `function` ? t.error(e) : t.error),
    ),
    r
  );
}
var toast = Object.assign(
  (e: React.ReactNode, t?: ToastOptions) => ValueValue5(`default`, e, t),
  {
    success: (e: React.ReactNode, t?: ToastOptions) =>
      ValueValue5(`success`, e, t),
    error: (e: React.ReactNode, t?: ToastOptions) => ValueValue5(`error`, e, t),
    info: (e: React.ReactNode, t?: ToastOptions) => ValueValue5(`info`, e, t),
    loading: (e: React.ReactNode, t?: ToastOptions) =>
      ValueValue5(`loading`, e, t),
    promise: ValueValue8,
    dismiss: valueValue7,
  },
);
function ValueValue9() {
  return (
    <svg viewBox={`0 0 24 24`} className={`ui-ts__status`} aria-hidden={`true`}>
      <g className={`ui-ts__spin`}>
        <circle
          className={`ui-ts__ring`}
          cx={`12`}
          cy={`12`}
          r={`9.25`}
          pathLength={1}
        />
      </g>
      <path
        className={`ui-ts__mark ui-ts__check`}
        d={`M8.3 12.4l2.5 2.5 4.9-5.3`}
        pathLength={1}
      />
      <path
        className={`ui-ts__mark ui-ts__x1`}
        d={`M9.5 9.5l5 5`}
        pathLength={1}
      />
      <path
        className={`ui-ts__mark ui-ts__x2`}
        d={`M14.5 9.5l-5 5`}
        pathLength={1}
      />
      <path className={`ui-ts__info`} d={`M12 11.2v4.6M12 8.2h.01`} />
    </svg>
  );
}
var ValueValue10 = () => (
  <svg viewBox={`0 0 24 24`} className={`ui-ts__glyph`} aria-hidden={`true`}>
    <path d={`M7.5 7.5l9 9M16.5 7.5l-9 9`} />
  </svg>
);
var ValueValue11 = (e: ToastRecord) => String(e.id);
function ValueValue12({
  t: e,
  layout: layout,
  edge: edge,
  paused: paused,
  defaultDuration: defaultDuration,
  hairline: hairline,
  closeButton: closeButton,
  onHeight: onHeight,
}: {
  t: ToastRecord;
  layout: ToastLayout;
  edge: number;
  paused: boolean;
  defaultDuration: number;
  hairline: boolean;
  closeButton: boolean;
  onHeight: (id: string, height: number) => void;
}) {
  let [c, l] = React.useState(false),
    [u, d] = React.useState(false),
    [f, p] = React.useState<(ToastContent & { version: number }) | null>(null),
    h = React.useRef<HTMLDivElement | null>(null),
    g = React.useRef<HTMLDivElement | null>(null),
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
    b = React.useRef<Swipe | null>(null),
    x = React.useRef(false),
    S = !!e.removing;
  (React.useEffect(() => {
    let e = requestAnimationFrame(() => requestAnimationFrame(() => l(true)));
    return () => cancelAnimationFrame(e);
  }, []),
    React.useLayoutEffect(() => {
      let t = h.current;
      if (!t) return;
      let n = ValueValue11(e),
        r = () => onHeight(n, t.offsetHeight);
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
  let ee = e.duration ?? defaultDuration,
    te = e.type !== `loading` && Number.isFinite(ee),
    ne = te && !paused && !u && !S;
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
      r = window.setTimeout(
        () => valueValue7(e.id),
        Math.max(0, y.current.left),
      );
    return () => {
      (window.clearTimeout(r),
        y.current.version === t && (y.current.left -= Date.now() - n));
    };
  }, [ne, e.version, ee, e.id]);
  let re: React.PointerEventHandler<HTMLLIElement> = (e) => {
      e.button !== 0 ||
        S ||
        (e.target as Element).closest(`button, a, input, textarea, select`) ||
        ((b.current = {
          pointer: e.pointerId,
          x: e.clientX,
          y: e.clientY,
          axis: null,
          samples: [],
        }),
        (x.current = false));
    },
    C: React.PointerEventHandler<HTMLLIElement> = (e) => {
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
        s = t.axis === `x` || o * edge > 0;
      s || (o = Math.sign(o) * Math.abs(o) ** 0.7 * 0.6);
      let c = t.axis === `x` ? r.offsetWidth : r.offsetHeight * 2;
      ((r.style.transform =
        t.axis === `x` ? `translateX(${o}px)` : `translateY(${o}px)`),
        (r.style.opacity = s
          ? String(Math.max(0.25, 1 - Math.abs(o) / (c * 1.1)))
          : ``),
        t.samples.push({
          v: o,
          at: e.timeStamp,
        }),
        t.samples.length > 6 && t.samples.shift());
    },
    ie: React.PointerEventHandler<HTMLLIElement> = (t) => {
      let r = b.current,
        i = g.current!;
      if (
        !r ||
        r.pointer !== t.pointerId ||
        ((b.current = null), !r.axis || !i)
      )
        return;
      d(false);
      let a = r.samples[r.samples.length - 1] ?? {
          v: 0,
          at: 0,
        },
        o = r.samples[0] ?? a,
        s = a.at > o.at ? (a.v - o.v) / (a.at - o.at) : 0,
        c = r.axis === `x` || a.v * edge > 0,
        l = Math.abs(s) > 0.45 && Math.sign(s) === Math.sign(a.v);
      if (t.type === `pointerup` && c && (Math.abs(a.v) > 64 || l)) {
        let t = (r.axis === `x` ? i.offsetWidth : i.offsetHeight) + 48;
        ((i.style.transition = `transform 300ms cubic-bezier(0.22, 1, 0.36, 1), opacity 240ms ease`),
          (i.style.transform = `${r.axis === `x` ? `translateX` : `translateY`}(${Math.sign(a.v) * t}px)`),
          (i.style.opacity = `0`),
          valueValue7(e.id));
      } else
        ((i.style.transition = ``),
          (i.style.transform = ``),
          (i.style.opacity = ``));
    },
    ae = -edge,
    oe = `translateY(${ae * layout.y}px) scale(${layout.scale})`;
  (c || (oe = `translateY(${edge * 100}%) scale(${layout.scale})`),
    S &&
      (oe = `translateY(${ae * layout.y + edge * 10}px) scale(${layout.scale * 0.96})`));
  let se =
    e.type === `loading` ? (
      <ValueValue9 />
    ) : (
      (e.icon ?? (e.type === "default" ? null : <ValueValue9 />))
    );
  return (
    <li
      className={`ui-ts__toast`}
      data-toast-id={ValueValue11(e)}
      data-type={e.type}
      data-behind={layout.behind || void 0}
      data-removing={S || void 0}
      data-swiping={u || void 0}
      tabIndex={0}
      inert={layout.hidden || S}
      style={{
        transform: oe,
        opacity: !c || S || layout.hidden ? 0 : 1,
        height: layout.height ? `${layout.height}px` : void 0,
        zIndex: layout.z,
      }}
      onPointerDown={re}
      onPointerMove={C}
      onPointerUp={ie}
      onPointerCancel={ie}
      onClickCapture={(e) => {
        x.current &&
          ((x.current = false), e.stopPropagation(), e.preventDefault());
      }}
    >
      <div ref={g} className={`ui-ts__swipe`}>
        <div className={`ui-ts__card`}>
          <div
            ref={h}
            className={`ui-ts__content`}
            data-action={e.action ? `` : void 0}
          >
            {se && (
              <span
                className={`ui-ts__icon`}
                data-type={e.icon && e.type !== `loading` ? `custom` : e.type}
              >
                {se}
              </span>
            )}
            <div className={`ui-ts__text`}>
              <div
                className={`ui-ts__copy`}
                data-changed={e.version > 0 || void 0}
                key={e.version}
              >
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
                  (e.action!.onClick(t),
                    t.defaultPrevented || valueValue7(e.id));
                }}
              >
                {e.action.label}
              </button>
            )}
          </div>
          {hairline && te && (
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
        {closeButton && (
          <button
            type={`button`}
            className={`ui-ts__close`}
            aria-label={`Dismiss notification`}
            onClick={() => valueValue7(e.id)}
          >
            <ValueValue10 />
          </button>
        )}
      </div>
    </li>
  );
}
var ValueValue13 = 10;
var valueValue9 = 0.05;
var ValueValue14 = {
  y: 0,
  scale: 1,
  height: 0,
  z: 0,
  behind: false,
  hidden: true,
};
function Toaster({
  position = `bottom-right`,
  inline = false,
  id: id,
  duration = 4e3,
  visibleToasts = 3,
  expand = false,
  offset: offset,
  gap = 10,
  hotkey = `F8`,
  hairline = true,
  closeButton = true,
  label = `Notifications`,
  className: className,
}: ToasterProps) {
  let p = React.useSyncExternalStore(valueValue6, ValueValue3, ValueValue4),
    [h, g] = React.useState<Record<string, number>>({}),
    [_, v] = React.useState(false),
    [y, b] = React.useState(false),
    [x, S] = React.useState(false),
    [ee, te] = React.useState(false),
    [ne, re] = React.useState(``),
    [C, ie] = React.useState(``),
    ae = React.useRef<HTMLElement | null>(null),
    oe = React.useRef(new Map<string, ToastLayout>()),
    se = React.useRef(0),
    ce = React.useRef<HTMLElement | null>(null),
    le = React.useRef(`mouse`),
    ue = React.useRef(new Map<string, number>()),
    [de, fe] = position.split(`-`),
    pe = de === `bottom` ? 1 : -1,
    me = p.filter((e) => (e.toaster ?? null) === (id ?? null)).reverse(),
    w = me.filter((e) => !e.removing),
    he = expand || _ || y || x,
    ge = _ || y || x || ee,
    _e = Math.max(1, visibleToasts),
    ve = React.useCallback((e: string, t: number) => {
      g((n) =>
        n[e] === t
          ? n
          : {
              ...n,
              [e]: t,
            },
      );
    }, []),
    ye = (w[0] && h[ValueValue11(w[0])]) || se.current;
  ye && (se.current = ye);
  let be = new Map<string, ToastLayout>(),
    xe = 0;
  w.forEach((e, t) => {
    let n = h[ValueValue11(e)] ?? 0,
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
            y: r * ValueValue13,
            scale: 1 - r * valueValue9,
            height: t === 0 ? n : ye,
            z: w.length - t,
            behind: t > 0,
            hidden: t >= _e,
          };
    (t < _e && (xe += n + gap),
      be.set(ValueValue11(e), i),
      oe.current.set(ValueValue11(e), i));
  });
  let Se = Math.min(w.length, _e),
    Ce = w.length
      ? he
        ? Math.max(0, xe - gap)
        : ye + ValueValue13 * (Se - 1)
      : 0;
  (React.useEffect(() => {
    let e = new Set(me.map(ValueValue11));
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
          let n = ValueValue11(t);
          if (ue.current.get(n) === t.version) return;
          ue.current.set(n, t.version);
          let r = Array.from(e.querySelectorAll<HTMLElement>(`[data-toast-id]`))
            .find((e) => e.dataset.toastId === n)
            ?.querySelector(`.ui-ts__copy:not(.ui-ts__ghost)`)
            ?.textContent?.trim();
          r && (t.type === `error` ? ie : re)((e) => (e === r ? `${r} ` : r));
        }),
        ue.current.forEach(
          (e, t) =>
            !me.some((e) => ValueValue11(e) === t) && ue.current.delete(t),
        ));
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
      let e = (e: PointerEvent) => {
        ae.current?.contains(e.target as Node | null) || S(false);
      };
      return (
        document.addEventListener(`pointerdown`, e),
        () => document.removeEventListener(`pointerdown`, e)
      );
    }, [x]));
  let we = () =>
    Array.from(
      ae.current?.querySelectorAll<HTMLElement>(
        `[data-toast-id]:not([data-removing])`,
      ) ?? [],
    );
  React.useEffect(() => {
    if (!hotkey) return;
    let e = (e: KeyboardEvent) => {
      if (e.key !== hotkey && e.code !== hotkey) return;
      let t = we().find((e) => !e.inert);
      t &&
        (e.preventDefault(),
        ae.current?.contains(document.activeElement) ||
          (ce.current = document.activeElement as HTMLElement | null),
        t.focus());
    };
    return (
      window.addEventListener(`keydown`, e),
      () => window.removeEventListener(`keydown`, e)
    );
  }, [hotkey]);
  let Te: React.KeyboardEventHandler<HTMLElement> = (e) => {
      if (e.key !== `Escape` || !w.length) return;
      (e.preventDefault(), e.stopPropagation());
      let t = (e.target as HTMLElement).closest<HTMLElement>(`[data-toast-id]`),
        n = w.find((e) => ValueValue11(e) === t?.dataset.toastId) ?? w[0],
        r = w.indexOf(n);
      valueValue7(n.id);
      let i = w.filter((e) => e !== n)[Math.min(r, w.length - 2)],
        a = i && we().find((e) => e.dataset.toastId === ValueValue11(i));
      a
        ? a.focus()
        : ce.current?.isConnected
          ? ce.current.focus()
          : (document.activeElement as HTMLElement | null)?.blur();
    },
    T: React.FocusEventHandler<HTMLElement> = (e) => {
      e.target.matches(`:focus-visible`) && b(true);
    },
    E: React.FocusEventHandler<HTMLElement> = (e) => {
      e.currentTarget.contains(e.relatedTarget) || b(false);
    },
    Ee: React.CSSProperties & {
      [key: `--${string}`]: string | number | undefined;
    } = {
      "--ui-ts-offset": offset === void 0 ? void 0 : `${offset}px`,
    };
  return (
    <section
      ref={ae}
      className={[`ui-ts`, className].filter(Boolean).join(` `)}
      data-y={de}
      data-x={fe}
      data-inline={inline || void 0}
      data-expanded={he || void 0}
      data-empty={!w.length || void 0}
      aria-label={hotkey ? `${label} (${hotkey})` : label}
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
        {ValueValue15}
      </style>
      <ol
        className={`ui-ts__list`}
        style={{
          height: `${Ce}px`,
        }}
      >
        {me.map((e) => (
          <ValueValue12
            t={e}
            layout={
              be.get(ValueValue11(e)) ??
              oe.current.get(ValueValue11(e)) ??
              ValueValue14
            }
            edge={pe}
            paused={ge || (be.get(ValueValue11(e))?.hidden ?? false)}
            defaultDuration={duration}
            hairline={hairline}
            closeButton={closeButton}
            onHeight={ve}
            key={ValueValue11(e)}
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
var ValueValue15 = `
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
var valueValue = (e: number | undefined, t: boolean = false) =>
  new Promise<void>((n, r) =>
    window.setTimeout(() => (t ? r(Error(`Timeout`)) : n()), e),
  );
var ToasterComponent = ({ d: d }: { d: string }) => (
  <svg viewBox={`0 0 24 24`} aria-hidden={`true`}>
    <path d={d} />
  </svg>
);
var valueValue2 = {
  save: `M6 4h9.5L20 8.5V18a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zM8 4v4.5h7V4M8 20v-6h8v6`,
  trash: `M4.5 7h15M10 11v5.5M14 11v5.5M6 7l.8 11.2A2 2 0 0 0 8.8 20h6.4a2 2 0 0 0 2-1.8L18 7M9.5 7V5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v2`,
  upload: `M12 15V4M7.5 8.5 12 4l4.5 4.5M5 15v3.5A1.5 1.5 0 0 0 6.5 20h11a1.5 1.5 0 0 0 1.5-1.5V15`,
  sync: `M19.5 12a7.5 7.5 0 0 1-13.3 4.8M4.5 12a7.5 7.5 0 0 1 13.3-4.8M18 3.5v4h-4M6 20.5v-4h4`,
  doc: `M7 3.5h7l4.5 4.5v11a1.5 1.5 0 0 1-1.5 1.5H7A1.5 1.5 0 0 1 5.5 19V5A1.5 1.5 0 0 1 7 3.5zM14 3.5V8h4.5M8.5 12.5h7M8.5 16h5`,
};
function ToasterDemo2() {
  let e = React.useId(),
    t = React.useRef(new Set<ToastId>()),
    l = (t: ToastOptions = {}) => ({
      toaster: e,
      ...t,
    }),
    u = (e: ToastId) => t.current.add(e),
    d = (e?: ToastOptions) =>
      u(
        toast.success(
          `Draft saved`,
          l({
            description: `Q3 Board Report · all changes kept`,
            ...e,
          }),
        ),
      ),
    f = (e?: ToastOptions) =>
      u(
        toast(`File moved to trash`, {
          ...l(e),
          description: `Budget-2027.xlsx`,
          icon: <ToasterComponent d={valueValue2.trash} />,
          action: {
            label: `Undo`,
            onClick: () =>
              u(
                toast.success(
                  `File restored`,
                  l({
                    description: `Budget-2027.xlsx is back in Reports`,
                  }),
                ),
              ),
          },
        }),
      ),
    p = (t?: ToastOptions) => {
      let r = `${e}-upload-${Date.now()}`;
      (u(r),
        toast.promise(
          valueValue(2400),
          {
            loading: {
              title: `Uploading report…`,
              description: `Q3-Board-Report.pdf · 4.2\xA0MB`,
            },
            success: {
              title: `Report uploaded`,
              description: `Shared with 4 people in Finance`,
            },
            error: `Upload failed`,
          },
          {
            ...l(t),
            id: r,
          },
        ));
    };
  return (
    React.useEffect(() => {
      let e = [
          window.setTimeout(
            () =>
              d({
                duration: 9e3,
              }),
            500,
          ),
          window.setTimeout(
            () =>
              f({
                duration: 9e3,
              }),
            1300,
          ),
          window.setTimeout(
            () =>
              p({
                duration: 9e3,
              }),
            2100,
          ),
        ],
        r = t.current;
      return () => {
        (e.forEach(clearTimeout),
          r.forEach((e) => toast.dismiss(e)),
          r.clear());
      };
    }, []),
    (
      <div className={`toaster-demo`}>
        <div className={`toaster-demo__col`}>
          <div className={`toaster-demo__panel`}>
            <div className={`toaster-demo__card`}>
              <div className={`toaster-demo__head`}>
                <span className={`toaster-demo__doc`}>
                  <ToasterComponent d={valueValue2.doc} />
                </span>
                <div className={`toaster-demo__meta`}>
                  <span
                    className={`toaster-demo__name`}
                  >{`Q3 Board Report`}</span>
                  <span
                    className={`toaster-demo__sub`}
                  >{`Finance · edited 2 min ago`}</span>
                </div>
              </div>
              <div className={`toaster-demo__grid`}>
                <button
                  type={`button`}
                  className={`toaster-demo__btn`}
                  onClick={() => d()}
                >
                  <ToasterComponent d={valueValue2.save} />
                  {`Save draft`}
                </button>
                <button
                  type={`button`}
                  className={`toaster-demo__btn`}
                  onClick={() => f()}
                >
                  <ToasterComponent d={valueValue2.trash} />
                  {`Delete file`}
                </button>
                <button
                  type={`button`}
                  className={`toaster-demo__btn`}
                  onClick={() => p()}
                >
                  <ToasterComponent d={valueValue2.upload} />
                  {`Upload report`}
                </button>
                <button
                  type={`button`}
                  className={`toaster-demo__btn`}
                  onClick={() => {
                    let t = `${e}-sync-${Date.now()}`;
                    (u(t),
                      toast.promise(
                        valueValue(2200, true),
                        {
                          loading: `Syncing with Google Drive…`,
                          success: `Synced`,
                          error: {
                            title: `Couldn't sync`,
                            description: `Google Drive didn't respond. Try again in a minute.`,
                          },
                        },
                        l({
                          id: t,
                        }),
                      ));
                  }}
                >
                  <ToasterComponent d={valueValue2.sync} />
                  {`Sync`}
                </button>
              </div>
            </div>
            <p className={`toaster-demo__foot`}>
              {`Press `}
              <kbd>{`F8`}</kbd>
              {` to jump to notifications`}
            </p>
          </div>
          <div className={`toaster-demo__slot`}>
            <Toaster id={e} inline={true} position={`top-center`} />
          </div>
        </div>
      </div>
    )
  );
}
const demoStyles =
  ".toaster-demo{--toaster-demo-tray:#f0f0f0;--toaster-demo-card:#fff;--toaster-demo-line:#ececec;--toaster-demo-ink:#171717;--toaster-demo-muted:#8f8f8f;--toaster-demo-hover:#f5f5f5;--toaster-demo-focus:#17171738;-webkit-font-smoothing:antialiased;place-items:center;padding:24px 16px;font-family:Inter,ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,sans-serif;display:grid;position:absolute;inset:0}:where(.dark,[data-theme=dark]) .toaster-demo{--toaster-demo-tray:#111113;--toaster-demo-card:#19191b;--toaster-demo-line:#2a2a2e;--toaster-demo-ink:#ededed;--toaster-demo-muted:#8b8b92;--toaster-demo-hover:#1f1f22;--toaster-demo-focus:#ffffff4d}.toaster-demo__col{justify-items:center;gap:14px;width:min(100%,356px);display:grid}.toaster-demo__slot{width:100%;height:232px;position:relative}.toaster-demo__slot .ui-ts{--ui-ts-offset:0px;--ui-ts-width:100%}@media (width<=600px){.toaster-demo__slot .ui-ts{top:0;left:0;right:0}}.toaster-demo__panel{background:var(--toaster-demo-tray);border-radius:20px;width:100%;padding:4px}.toaster-demo__card{background:var(--toaster-demo-card);box-shadow:0 0 0 1px var(--toaster-demo-line), 0 1px 2px #0000000a;border-radius:16px;padding:14px}.toaster-demo__head{align-items:center;gap:10px;padding:0 2px 14px;display:flex}.toaster-demo__doc{background:var(--toaster-demo-tray);width:34px;height:34px;color:var(--toaster-demo-ink);border-radius:10px;place-items:center;display:grid}.toaster-demo__meta{min-width:0;display:grid}.toaster-demo__name{color:var(--toaster-demo-ink);font-size:14px;font-weight:500;line-height:20px}.toaster-demo__sub{color:var(--toaster-demo-muted);font-size:12.5px;line-height:18px}.toaster-demo svg{fill:none;stroke:currentColor;stroke-width:1.8px;stroke-linecap:round;stroke-linejoin:round;flex:none;width:16px;height:16px}.toaster-demo__grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:6px;display:grid}.toaster-demo__btn{background:var(--toaster-demo-card);height:38px;box-shadow:0 0 0 1px var(--toaster-demo-line);font:inherit;color:var(--toaster-demo-ink);white-space:nowrap;text-overflow:ellipsis;cursor:pointer;border:0;border-radius:10px;align-items:center;gap:8px;min-width:0;margin:0;padding:0 12px;font-size:13px;font-weight:500;transition:background-color .16s,transform .16s;display:flex;overflow:hidden}.toaster-demo__btn svg{color:var(--toaster-demo-muted)}.toaster-demo__btn:hover{background:var(--toaster-demo-hover)}.toaster-demo__btn:active{transform:scale(.98)}.toaster-demo__btn:focus-visible{outline:2px solid var(--toaster-demo-focus);outline-offset:2px}.toaster-demo__foot{color:var(--toaster-demo-muted);text-align:center;margin:0;padding:10px 12px 8px;font-size:12.5px}.toaster-demo__foot kbd{background:var(--toaster-demo-card);min-width:22px;box-shadow:0 0 0 1px var(--toaster-demo-line);font:inherit;color:var(--toaster-demo-ink);border-radius:5px;padding:0 5px;font-size:11.5px;line-height:18px;display:inline-block}.card__preview .toaster-demo{align-items:start;padding:34px 0 0}.card__preview .toaster-demo__col{zoom:.5;width:356px}.card__preview .toaster-demo__slot{height:150px}.card__preview .toaster-demo .ui-ts__close{display:none}.stage:has(.toaster-demo){height:560px}@media (width<=760px){.stage:has(.toaster-demo){height:580px}.toaster-demo{place-items:start center;padding:56px 12px 16px}}@media (hover:none) and (pointer:coarse){.toaster-demo__btn{height:44px}}@media (width<=360px){.toaster-demo__card{padding:10px}.toaster-demo__btn{gap:6px;padding:0 9px;font-size:12.5px}}.toaster-demo--clean{--toaster-demo-card:#fff;--toaster-demo-strong:#000;--toaster-demo-ink:#000000e0;--toaster-demo-muted:#00000073;--toaster-demo-icon:#00000072;--toaster-demo-shadow:0 0 0 .5px #0000000f, 0 1px 1px -1px #0000001a, 0 1px 2px 0 #0000000d;--toaster-demo-shadow-hover:0 0 0 .5px #0000001a, 0 1px 1px -1px #0000001f, 0 1px 3px 0 #00000012;--toaster-demo-focus:#0060e259;font-family:Inter,InterVariable,ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,sans-serif}:where(.dark,[data-theme=dark]) .toaster-demo--clean{--toaster-demo-card:#1c1c1e;--toaster-demo-strong:#fff;--toaster-demo-ink:#ffffffe6;--toaster-demo-muted:#ffffff73;--toaster-demo-icon:#ffffff75;--toaster-demo-shadow:0 0 0 .5px #ffffff1a, 0 1px 2px 0 #0006;--toaster-demo-shadow-hover:0 0 0 .5px #ffffff29, 0 1px 2px 0 #0006;--toaster-demo-focus:#4d8dff80}.toaster-demo--clean .toaster-demo__col{gap:12px}.toaster-demo--clean .toaster-demo__slot .ui-tsc{--ui-tsc-offset:0px;--ui-tsc-width:100%}@media (width<=600px){.toaster-demo--clean .toaster-demo__slot .ui-tsc{top:0;left:0;right:0}}.toaster-demo--clean .toaster-demo__panel{background:0 0;border-radius:10px;padding:0}.toaster-demo--clean .toaster-demo__card{box-shadow:var(--toaster-demo-shadow);border-radius:10px;padding:12px}.toaster-demo--clean .toaster-demo__head{gap:10px;padding:0 0 12px}.toaster-demo--clean .toaster-demo__doc{background:var(--toaster-demo-card);width:32px;height:32px;box-shadow:var(--toaster-demo-shadow);color:var(--toaster-demo-icon);border-radius:6px}.toaster-demo--clean .toaster-demo__name{color:var(--toaster-demo-strong);font-size:13px;line-height:20px}.toaster-demo--clean .toaster-demo__sub{color:var(--toaster-demo-muted);font-size:12px;line-height:16px}.toaster-demo--clean svg{stroke-width:1.6px}.toaster-demo--clean .toaster-demo__grid{gap:8px}.toaster-demo--clean .toaster-demo__btn{height:28px;box-shadow:var(--toaster-demo-shadow);color:var(--toaster-demo-strong);border-radius:6px;gap:6px;padding:0 10px 0 6px;line-height:20px;transition:box-shadow .14s,transform .16s}.toaster-demo--clean .toaster-demo__btn svg{color:var(--toaster-demo-icon)}.toaster-demo--clean .toaster-demo__btn:hover{background:var(--toaster-demo-card);box-shadow:var(--toaster-demo-shadow-hover)}.toaster-demo--clean .toaster-demo__btn:active{transform:scale(.97)}.toaster-demo--clean .toaster-demo__btn:focus-visible{outline-offset:1px}.toaster-demo--clean .toaster-demo__foot{color:var(--toaster-demo-muted);padding:10px 0 0;font-size:12px;line-height:16px}.toaster-demo--clean .toaster-demo__foot kbd{min-width:20px;box-shadow:var(--toaster-demo-shadow);color:var(--toaster-demo-ink);border-radius:4px;padding:0 5px;font-size:11px;line-height:16px}.card__preview .toaster-demo--clean{padding-top:42px}.card__preview .toaster-demo--clean .toaster-demo__col{zoom:.56}.card__preview .toaster-demo--clean .ui-tsc__close{display:none}@media (width>=761px){.stage .toaster-demo--clean .toaster-demo__col{zoom:1.1;width:min(100%,324px)}}@media (hover:none) and (pointer:coarse){.toaster-demo--clean .toaster-demo__btn{height:36px}}\n";
function ToasterDemo(props: React.JSX.IntrinsicAttributes) {
  return (
    <>
      <style href="plico-demo-toaster" precedence="default">
        {demoStyles}
      </style>
      <ToasterDemo2 {...props} />
    </>
  );
}
export { Toaster as Component };
export { ToasterDemo as Demo };
export { Toaster };
export { ToasterDemo };
export { toast };
export default Toaster;

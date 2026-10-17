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

export interface ToasterCleanProps {
  position?:
    "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right";
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
var toastItems: ToastRecord[] = [];
var toastListeners = new Set<() => void>();
var serverToastItems: ToastRecord[] = [];
var toastCounter = 0;
var publishCleanToasts = (e: ToastRecord[]) => {
  ((toastItems = e), toastListeners.forEach((e) => e()));
};
var subscribeCleanToasts = (e: () => void) => (
  toastListeners.add(e),
  () => {
    toastListeners.delete(e);
  }
);
var getCleanToasts = () => toastItems;
var getCleanServerToasts = () => serverToastItems;
function upsertCleanToast(
  type: ToastKind,
  title: React.ReactNode,
  options: ToastOptions = {},
  skipCreate: boolean = false,
) {
  let { id: a, ...o } = options,
    l = a === void 0 ? void 0 : toastItems.find((e) => e.id === a && !e.removing);
  if (l)
    return (
      publishCleanToasts(
        toastItems.map((n) =>
          n === l
            ? {
                ...n,
                ...o,
                type: type,
                title: title,
                version: n.version + 1,
              }
            : n,
        ),
      ),
      l.id
    );
  let u = a ?? `toast-${++toastCounter}`;
  return (
    skipCreate ||
      publishCleanToasts([
        ...toastItems.filter((e) => e.id !== u),
        {
          ...o,
          id: u,
          type: type,
          title: title,
          version: 0,
        },
      ]),
    u
  );
}
var removalDuration = 420;
function dismissCleanToast(id?: ToastId) {
  let matches = toastItems.filter((t) => !t.removing && (id === void 0 || t.id === id));
  matches.length &&
    (publishCleanToasts(
      toastItems.map((e) =>
        matches.includes(e)
          ? {
              ...e,
              removing: true,
            }
          : e,
      ),
    ),
    matches.forEach((e) => e.onDismiss?.(e.id)),
    window.setTimeout(
      () =>
        publishCleanToasts(
          toastItems.filter((e) => !(e.removing && matches.some((t) => t.id === e.id))),
        ),
      removalDuration,
    ));
}
var isCleanToastMessage = (message: ToastMessage): message is ToastContent =>
  typeof message == `object` &&
  !!message &&
  !React.isValidElement(message) &&
  !Array.isArray(message) &&
  `title` in message;
var normalizeCleanToastMessage = (message: ToastMessage): ToastContent =>
  isCleanToastMessage(message)
    ? message
    : {
        title: message,
        description: void 0,
      };
function promiseCleanToast<T>(
  input: Promise<T> | (() => Promise<T>),
  messages: {
    loading: ToastMessage;
    success: ToastMessage | ((value: T) => ToastMessage);
    error: ToastMessage | ((error: unknown) => ToastMessage);
  },
  options: ToastOptions = {},
) {
  let promise = typeof input == `function` ? input() : input,
    loadingMessage = normalizeCleanToastMessage(messages.loading),
    id = upsertCleanToast(`loading`, loadingMessage.title, {
      ...options,
      description: loadingMessage.description,
    }),
    settle = (e: ToastKind, t: ToastMessage) => {
      let r = normalizeCleanToastMessage(t);
      upsertCleanToast(
        e,
        r.title,
        {
          ...options,
          id: id,
          description: r.description,
        },
        true,
      );
    };
  return (
    promise.then(
      (e) =>
        settle(
          `success`,
          typeof messages.success == `function` ? messages.success(e) : messages.success,
        ),
      (e) =>
        settle(`error`, typeof messages.error == `function` ? messages.error(e) : messages.error),
    ),
    promise
  );
}
var toast = Object.assign(
  (e: React.ReactNode, t?: ToastOptions) => upsertCleanToast(`default`, e, t),
  {
    success: (e: React.ReactNode, t?: ToastOptions) => upsertCleanToast(`success`, e, t),
    error: (e: React.ReactNode, t?: ToastOptions) => upsertCleanToast(`error`, e, t),
    info: (e: React.ReactNode, t?: ToastOptions) => upsertCleanToast(`info`, e, t),
    loading: (e: React.ReactNode, t?: ToastOptions) => upsertCleanToast(`loading`, e, t),
    promise: promiseCleanToast,
    dismiss: dismissCleanToast,
  },
);
function CleanToastStatusIcon() {
  return (
    <svg viewBox={`0 0 24 24`} className={`ui-tsc__status`} aria-hidden={`true`}>
      <g className={`ui-tsc__spin`}>
        <circle className={`ui-tsc__ring`} cx={`12`} cy={`12`} r={`9.25`} pathLength={1} />
      </g>
      <path
        className={`ui-tsc__mark ui-tsc__check`}
        d={`M8.3 12.4l2.5 2.5 4.9-5.3`}
        pathLength={1}
      />
      <path className={`ui-tsc__mark ui-tsc__x1`} d={`M9.5 9.5l5 5`} pathLength={1} />
      <path className={`ui-tsc__mark ui-tsc__x2`} d={`M14.5 9.5l-5 5`} pathLength={1} />
      <path className={`ui-tsc__info`} d={`M12 11.2v4.6M12 8.2h.01`} />
    </svg>
  );
}
var CleanToastCloseIcon = () => (
  <svg viewBox={`0 0 24 24`} className={`ui-tsc__glyph`} aria-hidden={`true`}>
    <path d={`M7.5 7.5l9 9M16.5 7.5l-9 9`} />
  </svg>
);
var cleanToastKey = (toastItem: ToastRecord) => String(toastItem.id);
function CleanToastItem({
  t: toastItem,
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
  let [entered, setEntered] = React.useState(false),
    [swiping, setSwiping] = React.useState(false),
    [previousCopy, setPreviousCopy] = React.useState<(ToastContent & { version: number }) | null>(
      null,
    ),
    contentRef = React.useRef<HTMLDivElement | null>(null),
    swipeRef = React.useRef<HTMLDivElement | null>(null),
    lastCopyRef = React.useRef({
      title: toastItem.title,
      description: toastItem.description,
      version: toastItem.version,
    }),
    copyTimerRef = React.useRef(0),
    countdownRef = React.useRef({
      version: -1,
      left: 0,
    }),
    gestureRef = React.useRef<Swipe | null>(null),
    suppressClickRef = React.useRef(false),
    removing = !!toastItem.removing;
  (React.useEffect(() => {
    let e = requestAnimationFrame(() => requestAnimationFrame(() => setEntered(true)));
    return () => cancelAnimationFrame(e);
  }, []),
    React.useLayoutEffect(() => {
      let t = contentRef.current;
      if (!t) return;
      let n = cleanToastKey(toastItem),
        r = () => onHeight(n, t.offsetHeight);
      r();
      let i = new ResizeObserver(r);
      return (i.observe(t), () => i.disconnect());
    }, []),
    React.useLayoutEffect(() => {
      let t = lastCopyRef.current;
      t.version !== toastItem.version &&
        ((lastCopyRef.current = {
          title: toastItem.title,
          description: toastItem.description,
          version: toastItem.version,
        }),
        (t.title !== toastItem.title || t.description !== toastItem.description) &&
          (setPreviousCopy(t),
          window.clearTimeout(copyTimerRef.current),
          (copyTimerRef.current = window.setTimeout(() => setPreviousCopy(null), 320))));
    }, [toastItem.version]),
    React.useEffect(() => () => window.clearTimeout(copyTimerRef.current), []));
  let duration = toastItem.duration ?? defaultDuration,
    timed = toastItem.type !== `loading` && Number.isFinite(duration),
    countdownActive = timed && !paused && !swiping && !removing;
  React.useEffect(() => {
    if (
      (countdownRef.current.version !== toastItem.version &&
        (countdownRef.current = {
          version: toastItem.version,
          left: duration,
        }),
      !countdownActive)
    )
      return;
    let t = toastItem.version,
      n = Date.now(),
      r = window.setTimeout(
        () => dismissCleanToast(toastItem.id),
        Math.max(0, countdownRef.current.left),
      );
    return () => {
      (window.clearTimeout(r),
        countdownRef.current.version === t && (countdownRef.current.left -= Date.now() - n));
    };
  }, [countdownActive, toastItem.version, duration, toastItem.id]);
  let handlePointerDown: React.PointerEventHandler<HTMLLIElement> = (e) => {
      e.button !== 0 ||
        removing ||
        (e.target as Element).closest(`button, a, input, textarea, select`) ||
        ((gestureRef.current = {
          pointer: e.pointerId,
          x: e.clientX,
          y: e.clientY,
          axis: null,
          samples: [],
        }),
        (suppressClickRef.current = false));
    },
    handlePointerMove: React.PointerEventHandler<HTMLLIElement> = (e) => {
      let t = gestureRef.current,
        n = swipeRef.current;
      if (!t || t.pointer !== e.pointerId || !n) return;
      let r = e.clientX - t.x,
        a = e.clientY - t.y;
      if (!t.axis) {
        if (Math.hypot(r, a) < 6) return;
        ((t.axis = Math.abs(r) > Math.abs(a) ? `x` : `y`),
          e.currentTarget.setPointerCapture(e.pointerId),
          (suppressClickRef.current = true),
          setSwiping(true),
          (n.style.transition = `none`));
      }
      let o = t.axis === `x` ? r : a,
        s = t.axis === `x` || o * edge > 0;
      s || (o = Math.sign(o) * Math.abs(o) ** 0.7 * 0.6);
      let c = t.axis === `x` ? n.offsetWidth : n.offsetHeight * 2;
      ((n.style.transform = t.axis === `x` ? `translateX(${o}px)` : `translateY(${o}px)`),
        (n.style.opacity = s ? String(Math.max(0.25, 1 - Math.abs(o) / (c * 1.1))) : ``),
        t.samples.push({
          v: o,
          at: e.timeStamp,
        }),
        t.samples.length > 6 && t.samples.shift());
    },
    handlePointerEnd: React.PointerEventHandler<HTMLLIElement> = (t) => {
      let n = gestureRef.current,
        r = swipeRef.current!;
      if (!n || n.pointer !== t.pointerId || ((gestureRef.current = null), !n.axis || !r)) return;
      setSwiping(false);
      let a = n.samples[n.samples.length - 1] ?? {
          v: 0,
          at: 0,
        },
        o = n.samples[0] ?? a,
        s = a.at > o.at ? (a.v - o.v) / (a.at - o.at) : 0,
        c = n.axis === `x` || a.v * edge > 0,
        l = Math.abs(s) > 0.45 && Math.sign(s) === Math.sign(a.v);
      if (t.type === `pointerup` && c && (Math.abs(a.v) > 64 || l)) {
        let t = (n.axis === `x` ? r.offsetWidth : r.offsetHeight) + 48;
        ((r.style.transition = `transform 300ms cubic-bezier(0.22, 1, 0.36, 1), opacity 240ms ease`),
          (r.style.transform = `${n.axis === `x` ? `translateX` : `translateY`}(${Math.sign(a.v) * t}px)`),
          (r.style.opacity = `0`),
          dismissCleanToast(toastItem.id));
      } else ((r.style.transition = ``), (r.style.transform = ``), (r.style.opacity = ``));
    },
    stackDirection = -edge,
    transform = `translateY(${stackDirection * layout.y}px) scale(${layout.scale})`;
  (entered || (transform = `translateY(${edge * 100}%) scale(${layout.scale})`),
    removing &&
      (transform = `translateY(${stackDirection * layout.y + edge * 10}px) scale(${layout.scale * 0.96})`));
  let statusIcon =
    toastItem.type === `loading` ? (
      <CleanToastStatusIcon />
    ) : (
      (toastItem.icon ?? (toastItem.type === "default" ? null : <CleanToastStatusIcon />))
    );
  return (
    <li
      className={`ui-tsc__toast`}
      data-toast-id={cleanToastKey(toastItem)}
      data-type={toastItem.type}
      data-behind={layout.behind || void 0}
      data-removing={removing || void 0}
      data-swiping={swiping || void 0}
      tabIndex={0}
      inert={layout.hidden || removing}
      style={{
        transform: transform,
        opacity: !entered || removing || layout.hidden ? 0 : 1,
        height: layout.height ? `${layout.height}px` : void 0,
        zIndex: layout.z,
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerEnd}
      onPointerCancel={handlePointerEnd}
      onClickCapture={(e) => {
        suppressClickRef.current &&
          ((suppressClickRef.current = false), e.stopPropagation(), e.preventDefault());
      }}
    >
      <div ref={swipeRef} className={`ui-tsc__swipe`}>
        <div className={`ui-tsc__card`}>
          <div
            ref={contentRef}
            className={`ui-tsc__content`}
            data-action={toastItem.action ? `` : void 0}
          >
            {statusIcon && (
              <span
                className={`ui-tsc__icon`}
                data-type={
                  toastItem.icon && toastItem.type !== `loading` ? `custom` : toastItem.type
                }
              >
                {statusIcon}
              </span>
            )}
            <div className={`ui-tsc__text`}>
              <div
                className={`ui-tsc__copy`}
                data-changed={toastItem.version > 0 || void 0}
                key={toastItem.version}
              >
                <div className={`ui-tsc__title`}>{toastItem.title}</div>
                {toastItem.description != null && toastItem.description !== `` && (
                  <div className={`ui-tsc__desc`}>{toastItem.description}</div>
                )}
              </div>
              {previousCopy && (
                <div
                  className={`ui-tsc__copy ui-tsc__ghost`}
                  aria-hidden={`true`}
                  key={`ghost-${previousCopy.version}`}
                >
                  <div className={`ui-tsc__title`}>{previousCopy.title}</div>
                  {previousCopy.description != null && previousCopy.description !== `` && (
                    <div className={`ui-tsc__desc`}>{previousCopy.description}</div>
                  )}
                </div>
              )}
            </div>
            {toastItem.action && (
              <button
                type={`button`}
                className={`ui-tsc__action`}
                onClick={(t) => {
                  (toastItem.action!.onClick(t),
                    t.defaultPrevented || dismissCleanToast(toastItem.id));
                }}
              >
                {toastItem.action.label}
              </button>
            )}
          </div>
          {hairline && timed && (
            <span
              className={`ui-tsc__timer`}
              aria-hidden={`true`}
              style={{
                animationDuration: `${duration}ms`,
                animationPlayState: countdownActive ? `running` : `paused`,
              }}
              key={toastItem.version}
            />
          )}
        </div>
        {closeButton && (
          <button
            type={`button`}
            className={`ui-tsc__close`}
            aria-label={`Dismiss notification`}
            onClick={() => dismissCleanToast(toastItem.id)}
          >
            <CleanToastCloseIcon />
          </button>
        )}
      </div>
    </li>
  );
}
var stackOffset = 10;
var stackScale = 0.05;
var hiddenLayout = {
  y: 0,
  scale: 1,
  height: 0,
  z: 0,
  behind: false,
  hidden: true,
};
function ToasterClean({
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
}: ToasterCleanProps) {
  let snapshot = React.useSyncExternalStore(
      subscribeCleanToasts,
      getCleanToasts,
      getCleanServerToasts,
    ),
    [heights, setHeights] = React.useState<Record<string, number>>({}),
    [hovered, setHovered] = React.useState(false),
    [focused, setFocused] = React.useState(false),
    [touchExpanded, setTouchExpanded] = React.useState(false),
    [documentHidden, setDocumentHidden] = React.useState(false),
    [politeMessage, setPoliteMessage] = React.useState(``),
    [errorMessage, setErrorMessage] = React.useState(``),
    regionRef = React.useRef<HTMLElement | null>(null),
    layoutCacheRef = React.useRef(new Map<string, ToastLayout>()),
    frontHeightRef = React.useRef(0),
    returnFocusRef = React.useRef<HTMLElement | null>(null),
    pointerTypeRef = React.useRef(`mouse`),
    announcedVersionsRef = React.useRef(new Map<string, number>()),
    [vertical, horizontal] = position.split(`-`),
    edge = vertical === `bottom` ? 1 : -1,
    scopedToasts = snapshot.filter((e) => (e.toaster ?? null) === (id ?? null)).reverse(),
    liveToasts = scopedToasts.filter((e) => !e.removing),
    expanded = expand || hovered || focused || touchExpanded,
    paused = hovered || focused || touchExpanded || documentHidden,
    maxVisible = Math.max(1, visibleToasts),
    reportHeight = React.useCallback((e: string, t: number) => {
      setHeights((n) =>
        n[e] === t
          ? n
          : {
              ...n,
              [e]: t,
            },
      );
    }, []),
    frontHeight =
      (liveToasts[0] && heights[cleanToastKey(liveToasts[0])]) || frontHeightRef.current;
  frontHeight && (frontHeightRef.current = frontHeight);
  let layouts = new Map<string, ToastLayout>(),
    accumulatedHeight = 0;
  liveToasts.forEach((e, t) => {
    let n = heights[cleanToastKey(e)] ?? 0,
      r = Math.min(t, maxVisible - 1),
      i = expanded
        ? {
            y: accumulatedHeight,
            scale: 1,
            height: n,
            z: liveToasts.length - t,
            behind: false,
            hidden: t >= maxVisible,
          }
        : {
            y: r * stackOffset,
            scale: 1 - r * stackScale,
            height: t === 0 ? n : frontHeight,
            z: liveToasts.length - t,
            behind: t > 0,
            hidden: t >= maxVisible,
          };
    (t < maxVisible && (accumulatedHeight += n + gap),
      layouts.set(cleanToastKey(e), i),
      layoutCacheRef.current.set(cleanToastKey(e), i));
  });
  let visibleCount = Math.min(liveToasts.length, maxVisible),
    listHeight = liveToasts.length
      ? expanded
        ? Math.max(0, accumulatedHeight - gap)
        : frontHeight + stackOffset * (visibleCount - 1)
      : 0;
  (React.useEffect(() => {
    let e = new Set(scopedToasts.map(cleanToastKey));
    (setHeights((t) => {
      let n = Object.keys(t).filter((t) => !e.has(t));
      if (!n.length) return t;
      let r = {
        ...t,
      };
      return (n.forEach((e) => delete r[e]), r);
    }),
      layoutCacheRef.current.forEach((t, n) => !e.has(n) && layoutCacheRef.current.delete(n)),
      liveToasts.length || setTouchExpanded(false));
  }, [snapshot]),
    React.useEffect(() => {
      let e = regionRef.current;
      e &&
        (liveToasts.forEach((t) => {
          let n = cleanToastKey(t);
          if (announcedVersionsRef.current.get(n) === t.version) return;
          announcedVersionsRef.current.set(n, t.version);
          let r = Array.from(e.querySelectorAll<HTMLElement>(`[data-toast-id]`))
            .find((e) => e.dataset.toastId === n)
            ?.querySelector(`.ui-tsc__copy:not(.ui-tsc__ghost)`)
            ?.textContent?.trim();
          r &&
            (t.type === `error` ? setErrorMessage : setPoliteMessage)((e) =>
              e === r ? `${r} ` : r,
            );
        }),
        announcedVersionsRef.current.forEach(
          (e, t) =>
            !scopedToasts.some((e) => cleanToastKey(e) === t) &&
            announcedVersionsRef.current.delete(t),
        ));
    }, [snapshot]),
    React.useEffect(() => {
      let e = () => setDocumentHidden(document.visibilityState === `hidden`);
      return (
        e(),
        document.addEventListener(`visibilitychange`, e),
        () => document.removeEventListener(`visibilitychange`, e)
      );
    }, []),
    React.useEffect(() => {
      if (!touchExpanded) return;
      let e = (e: PointerEvent) => {
        regionRef.current?.contains(e.target as Node | null) || setTouchExpanded(false);
      };
      return (
        document.addEventListener(`pointerdown`, e),
        () => document.removeEventListener(`pointerdown`, e)
      );
    }, [touchExpanded]));
  let getToastElements = () =>
    Array.from(
      regionRef.current?.querySelectorAll<HTMLElement>(`[data-toast-id]:not([data-removing])`) ??
        [],
    );
  React.useEffect(() => {
    if (!hotkey) return;
    let e = (e: KeyboardEvent) => {
      if (e.key !== hotkey && e.code !== hotkey) return;
      let t = getToastElements().find((e) => !e.inert);
      t &&
        (e.preventDefault(),
        regionRef.current?.contains(document.activeElement) ||
          (returnFocusRef.current = document.activeElement as HTMLElement | null),
        t.focus());
    };
    return (window.addEventListener(`keydown`, e), () => window.removeEventListener(`keydown`, e));
  }, [hotkey]);
  let handleKeyDown: React.KeyboardEventHandler<HTMLElement> = (e) => {
      if (e.key !== `Escape` || !liveToasts.length) return;
      (e.preventDefault(), e.stopPropagation());
      let t = (e.target as HTMLElement).closest<HTMLElement>(`[data-toast-id]`),
        n = liveToasts.find((e) => cleanToastKey(e) === t?.dataset.toastId) ?? liveToasts[0],
        r = liveToasts.indexOf(n);
      dismissCleanToast(n.id);
      let i = liveToasts.filter((e) => e !== n)[Math.min(r, liveToasts.length - 2)],
        a = i && getToastElements().find((e) => e.dataset.toastId === cleanToastKey(i));
      a
        ? a.focus()
        : returnFocusRef.current?.isConnected
          ? returnFocusRef.current.focus()
          : (document.activeElement as HTMLElement | null)?.blur();
    },
    handleFocus: React.FocusEventHandler<HTMLElement> = (e) => {
      e.target.matches(`:focus-visible`) && setFocused(true);
    },
    handleBlur: React.FocusEventHandler<HTMLElement> = (e) => {
      e.currentTarget.contains(e.relatedTarget) || setFocused(false);
    },
    regionStyle: React.CSSProperties & {
      [key: `--${string}`]: string | number | undefined;
    } = {
      "--ui-tsc-offset": offset === void 0 ? void 0 : `${offset}px`,
    };
  return (
    <section
      ref={regionRef}
      className={[`ui-tsc`, className].filter(Boolean).join(` `)}
      data-y={vertical}
      data-x={horizontal}
      data-inline={inline || void 0}
      data-expanded={expanded || void 0}
      data-empty={!liveToasts.length || void 0}
      aria-label={hotkey ? `${label} (${hotkey})` : label}
      tabIndex={-1}
      style={regionStyle}
      onKeyDown={handleKeyDown}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onPointerDownCapture={(e) => (pointerTypeRef.current = e.pointerType)}
      onPointerEnter={(e) => e.pointerType === `mouse` && setHovered(true)}
      onPointerLeave={(e) => e.pointerType === `mouse` && setHovered(false)}
      onClick={() =>
        pointerTypeRef.current !== `mouse` && liveToasts.length > 1 && setTouchExpanded(true)
      }
    >
      <style href={`ui-toaster-clean`} precedence={`default`}>
        {toasterCleanStyles}
      </style>
      <ol
        className={`ui-tsc__list`}
        style={{
          height: `${listHeight}px`,
        }}
      >
        {scopedToasts.map((e) => (
          <CleanToastItem
            t={e}
            layout={
              layouts.get(cleanToastKey(e)) ??
              layoutCacheRef.current.get(cleanToastKey(e)) ??
              hiddenLayout
            }
            edge={edge}
            paused={paused || (layouts.get(cleanToastKey(e))?.hidden ?? false)}
            defaultDuration={duration}
            hairline={hairline}
            closeButton={closeButton}
            onHeight={reportHeight}
            key={cleanToastKey(e)}
          />
        ))}
      </ol>
      <div className={`ui-tsc__sr`} role={`status`} aria-live={`polite`}>
        {politeMessage}
      </div>
      <div className={`ui-tsc__sr`} role={`alert`}>
        {errorMessage}
      </div>
    </section>
  );
}
var toasterCleanStyles = `
/* Colors and motion as variables – override them on .ui-tsc */
.ui-tsc {
  --ui-tsc-card: #ffffff;
  --ui-tsc-strong: #000000;
  --ui-tsc-ink: rgba(0, 0, 0, 0.88);
  --ui-tsc-text: rgba(0, 0, 0, 0.61);
  --ui-tsc-icon: rgba(0, 0, 0, 0.447);
  --ui-tsc-faint: rgba(0, 0, 0, 0.27);
  --ui-tsc-hairline: rgba(0, 0, 0, 0.1);
  --ui-tsc-success: #1a9a52;
  --ui-tsc-danger: #e5484d;
  --ui-tsc-accent: rgba(0, 96, 226, 0.765);
  --ui-tsc-focus: rgba(0, 96, 226, 0.35);
  /* Strokes are shadows: a 0.5px hairline plus a soft lift */
  --ui-tsc-shadow: 0 0 0 0.5px rgba(0, 0, 0, 0.06), 0 1px 1px -1px rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --ui-tsc-shadow-hover: 0 0 0 0.5px rgba(0, 0, 0, 0.1), 0 1px 1px -1px rgba(0, 0, 0, 0.12), 0 1px 3px 0 rgba(0, 0, 0, 0.07);
  /* Toasts float above the page: the same hairline with a wider, very soft drop */
  --ui-tsc-shadow-float: 0 0 0 0.5px rgba(0, 0, 0, 0.08), 0 1px 1px -1px rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.05), 0 10px 24px -10px rgba(0, 0, 0, 0.14);
  --ui-tsc-ease: cubic-bezier(0.22, 1, 0.36, 1);
  --ui-tsc-width: 356px;
  --ui-tsc-offset: 24px;
  position: fixed;
  z-index: 9999;
  box-sizing: border-box;
  container-type: inline-size;
  width: var(--ui-tsc-width);
  max-width: calc(100% - 2 * var(--ui-tsc-offset));
  margin: 0;
  padding: 0;
  font-family: "Inter", "InterVariable", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  font-size: 13px;
  font-weight: 400;
  line-height: 20px;
  color: var(--ui-tsc-text);
  text-align: left;
  -webkit-font-smoothing: antialiased;
  outline: none;
}
.ui-tsc[data-inline] { position: absolute; z-index: 20; --ui-tsc-offset: 20px; }
.ui-tsc[data-empty] { pointer-events: none; }
.ui-tsc *, .ui-tsc *::before, .ui-tsc *::after { box-sizing: border-box; }
:where(.ui-tsc) button { margin: 0; padding: 0; border: 0; background: none; font: inherit; color: inherit; cursor: pointer; -webkit-tap-highlight-color: transparent; }
:where(.ui-tsc) svg { display: block; flex: none; }
.ui-tsc button:focus-visible { outline: 2px solid var(--ui-tsc-focus); outline-offset: 1px; }

/* Corners and edge centers */
.ui-tsc[data-y="bottom"] { bottom: var(--ui-tsc-offset); }
.ui-tsc[data-y="top"] { top: var(--ui-tsc-offset); }
.ui-tsc[data-x="right"] { right: var(--ui-tsc-offset); }
.ui-tsc[data-x="left"] { left: var(--ui-tsc-offset); }
.ui-tsc[data-x="center"] { left: 50%; transform: translateX(-50%); }
.ui-tsc:not([data-inline])[data-y="bottom"] { bottom: max(var(--ui-tsc-offset), env(safe-area-inset-bottom)); }

.ui-tsc__list { position: relative; margin: 0; padding: 0; list-style: none; }

/* A toast: positioned by transform, sized by height – both glide */
.ui-tsc__toast {
  position: absolute;
  left: 0;
  right: 0;
  outline: none;
  touch-action: none;
  -webkit-user-select: none;
  user-select: none;
  transition: transform 440ms var(--ui-tsc-ease), opacity 320ms ease, height 380ms var(--ui-tsc-ease);
}
.ui-tsc[data-y="bottom"] .ui-tsc__toast { bottom: 0; transform-origin: 50% 0; }
.ui-tsc[data-y="top"] .ui-tsc__toast { top: 0; transform-origin: 50% 100%; }
.ui-tsc__toast[data-removing] { pointer-events: none; transition: transform 380ms var(--ui-tsc-ease), opacity 260ms ease, height 380ms var(--ui-tsc-ease); }

/* The swipe layer moves on its own, so the stack's transform never fights the finger */
.ui-tsc__swipe { position: relative; height: 100%; transition: transform 460ms cubic-bezier(0.34, 1.3, 0.64, 1), opacity 260ms ease; }
.ui-tsc__toast[data-swiping] { cursor: grabbing; }

/* One white card per toast – the edge is a shadow, not a border */
.ui-tsc__card { position: relative; height: 100%; overflow: hidden; border-radius: 10px; background: var(--ui-tsc-card); box-shadow: var(--ui-tsc-shadow-float); }
.ui-tsc__toast:focus-visible .ui-tsc__card { outline: 2px solid var(--ui-tsc-focus); outline-offset: 2px; }

/* Content is measured; the card clips it while it grows or shrinks */
.ui-tsc__content { display: flex; align-items: flex-start; gap: 8px; padding: 12px 14px 12px 12px; transition: opacity 260ms ease; }
.ui-tsc__content[data-action] { padding-right: 12px; }
/* Toasts behind the front one only show their edge */
.ui-tsc__toast[data-behind] .ui-tsc__content,
.ui-tsc__toast[data-behind] .ui-tsc__timer { opacity: 0; }

.ui-tsc__text { position: relative; flex: 1; min-width: 0; }
.ui-tsc__title { font-weight: 500; line-height: 20px; color: var(--ui-tsc-strong); overflow-wrap: anywhere; }
.ui-tsc__desc { font-size: 13px; line-height: 20px; color: var(--ui-tsc-text); overflow-wrap: anywhere; }
/* Changed text slides in with a soft blur; the old text fades out on top */
.ui-tsc__copy[data-changed] { animation: ui-tsc-text-in 300ms var(--ui-tsc-ease) both; }
.ui-tsc__ghost { position: absolute; top: 0; left: 0; right: 0; pointer-events: none; animation: ui-tsc-text-out 220ms ease both; }

/* Status icon, 16px on the title's line: one drawing that morphs from spinner to check or cross */
.ui-tsc__icon { display: grid; place-items: center; flex: none; width: 16px; height: 20px; color: var(--ui-tsc-icon); transition: color 300ms ease; }
.ui-tsc__icon[data-type="success"] { color: var(--ui-tsc-success); }
.ui-tsc__icon[data-type="error"] { color: var(--ui-tsc-danger); }
.ui-tsc__icon[data-type="info"] { color: var(--ui-tsc-accent); }
.ui-tsc__icon[data-type="custom"] > * { width: 16px; height: 16px; }
.ui-tsc__status { width: 16px; height: 16px; overflow: visible; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
.ui-tsc__icon[data-type="success"] .ui-tsc__status,
.ui-tsc__icon[data-type="error"] .ui-tsc__status { animation: ui-tsc-pop 460ms cubic-bezier(0.34, 1.56, 0.64, 1) both; }
.ui-tsc__spin { transform-box: fill-box; transform-origin: center; animation: ui-tsc-spin 760ms linear infinite; animation-play-state: paused; }
.ui-tsc__icon[data-type="loading"] .ui-tsc__spin { animation-play-state: running; }
/* The arc closes into a quiet ring; the spin freezes where it is, so nothing jumps */
.ui-tsc__ring { stroke-dasharray: 1 0; stroke-opacity: 0.24; transition: stroke-dasharray 560ms var(--ui-tsc-ease), stroke-opacity 360ms ease; }
.ui-tsc__icon[data-type="loading"] .ui-tsc__ring { stroke-dasharray: 0.28 0.72; stroke-opacity: 1; }
.ui-tsc__mark { stroke-dasharray: 1; stroke-dashoffset: 1; opacity: 0; }
.ui-tsc__info { opacity: 0; transition: opacity 240ms ease; }
.ui-tsc__icon[data-type="success"] .ui-tsc__check,
.ui-tsc__icon[data-type="error"] .ui-tsc__x1,
.ui-tsc__icon[data-type="error"] .ui-tsc__x2 { opacity: 1; stroke-dashoffset: 0; animation: ui-tsc-draw 340ms var(--ui-tsc-ease) 160ms both; }
.ui-tsc__icon[data-type="error"] .ui-tsc__x2 { animation-delay: 260ms; }
.ui-tsc__icon[data-type="info"] .ui-tsc__info { opacity: 1; }

/* Secondary button: white with the card's hairline shadow */
.ui-tsc__action {
  flex: none;
  align-self: center;
  height: 28px;
  margin: -4px 0;
  padding: 0 10px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  line-height: 20px;
  white-space: nowrap;
  transition: background-color 140ms ease, box-shadow 140ms ease, transform 160ms var(--ui-tsc-ease);
}
:where(.ui-tsc) .ui-tsc__action { background: var(--ui-tsc-card); box-shadow: var(--ui-tsc-shadow); color: var(--ui-tsc-strong); }
.ui-tsc__action:hover { box-shadow: var(--ui-tsc-shadow-hover); }
.ui-tsc__action:active { transform: scale(0.97); }

/* Close: a small round button on the corner, shown on hover and focus */
.ui-tsc__close {
  position: absolute;
  top: -7px;
  left: -7px;
  z-index: 1;
  display: grid;
  place-items: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  opacity: 0;
  transform: scale(0.8);
  transition: opacity 160ms ease, transform 200ms var(--ui-tsc-ease), color 160ms ease, box-shadow 160ms ease;
}
:where(.ui-tsc) .ui-tsc__close { background: var(--ui-tsc-card); box-shadow: var(--ui-tsc-shadow); color: var(--ui-tsc-icon); }
.ui-tsc__close::before { content: ""; position: absolute; inset: -6px; }
.ui-tsc__close:hover { color: var(--ui-tsc-ink); box-shadow: var(--ui-tsc-shadow-hover); }
.ui-tsc__toast:not([data-behind]):hover .ui-tsc__close,
.ui-tsc__toast:not([data-behind]):focus-within .ui-tsc__close { opacity: 1; transform: none; }
.ui-tsc__glyph { width: 10px; height: 10px; fill: none; stroke: currentColor; stroke-width: 2.2; stroke-linecap: round; }

/* The timer as a hairline – it stops whenever the timer does */
.ui-tsc__timer {
  position: absolute;
  left: 12px;
  right: 12px;
  bottom: 0;
  height: 1px;
  background: var(--ui-tsc-hairline);
  transform-origin: left;
  animation-name: ui-tsc-timer;
  animation-timing-function: linear;
  animation-fill-mode: both;
  transition: opacity 260ms ease;
}

.ui-tsc__sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }

@keyframes ui-tsc-spin { to { transform: rotate(360deg); } }
@keyframes ui-tsc-draw { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }
@keyframes ui-tsc-pop { 0% { transform: scale(0.82); } 55% { transform: scale(1.08); } 100% { transform: scale(1); } }
@keyframes ui-tsc-timer { from { transform: scaleX(1); } to { transform: scaleX(0); } }
@keyframes ui-tsc-text-in { from { opacity: 0; transform: translateY(4px); filter: blur(3px); } to { opacity: 1; transform: none; filter: none; } }
@keyframes ui-tsc-text-out { from { opacity: 1; } to { opacity: 0; transform: translateY(-4px); filter: blur(3px); } }

/* Narrow stacks: a little less padding */
@container (max-width: 300px) {
  .ui-tsc__content { padding: 10px 12px 10px 10px; }
}
/* Phones: full width along the edge with 12px gutters */
@media (max-width: 600px) {
  .ui-tsc, .ui-tsc[data-x] { left: 12px; right: 12px; width: auto; max-width: none; transform: none; }
  .ui-tsc[data-y="bottom"] { bottom: 12px; }
  .ui-tsc:not([data-inline])[data-y="bottom"] { bottom: max(12px, env(safe-area-inset-bottom)); }
  .ui-tsc[data-y="top"] { top: 12px; }
}
/* Touch screens: a visible close button with a big hit area, a taller action button */
@media (hover: none) and (pointer: coarse) {
  .ui-tsc__toast:not([data-behind]) .ui-tsc__close { opacity: 1; transform: none; }
  .ui-tsc__close { width: 24px; height: 24px; top: -8px; left: -8px; }
  .ui-tsc__close::before { inset: -8px; }
  .ui-tsc__action { height: 36px; margin: -8px -2px -8px 0; padding: 0 14px; }
}
@media (prefers-reduced-motion: reduce) {
  .ui-tsc *:not(.ui-tsc__spin):not(.ui-tsc__timer), .ui-tsc *::before, .ui-tsc *::after { animation: none !important; transition: none !important; }
}

/* Dark mode: follows a .dark class or data-theme="dark" on any ancestor, e.g. <html> */
:where(.dark, [data-theme="dark"]) .ui-tsc {
  --ui-tsc-card: #1c1c1e;
  --ui-tsc-strong: #ffffff;
  --ui-tsc-ink: rgba(255, 255, 255, 0.9);
  --ui-tsc-text: rgba(255, 255, 255, 0.62);
  --ui-tsc-icon: rgba(255, 255, 255, 0.46);
  --ui-tsc-faint: rgba(255, 255, 255, 0.3);
  --ui-tsc-hairline: rgba(255, 255, 255, 0.14);
  --ui-tsc-success: #3ec27a;
  --ui-tsc-danger: #ff6369;
  --ui-tsc-accent: #4d8dff;
  --ui-tsc-focus: rgba(77, 141, 255, 0.5);
  --ui-tsc-shadow: 0 0 0 0.5px rgba(255, 255, 255, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.4);
  --ui-tsc-shadow-hover: 0 0 0 0.5px rgba(255, 255, 255, 0.16), 0 1px 2px 0 rgba(0, 0, 0, 0.4);
  --ui-tsc-shadow-float: 0 0 0 0.5px rgba(255, 255, 255, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.4), 0 12px 28px -10px rgba(0, 0, 0, 0.6);
}
:where(.dark, [data-theme="dark"]) .ui-tsc .ui-tsc__action { background: rgba(255, 255, 255, 0.06); }
:where(.dark, [data-theme="dark"]) .ui-tsc .ui-tsc__close { background: #2a2a2d; }
`;
var demoDelay = (e: number | undefined, t: boolean = false) =>
  new Promise<void>((n, r) => window.setTimeout(() => (t ? r(Error(`Timeout`)) : n()), e));
var CleanDemoIcon = ({ d: path }: { d: string }) => (
  <svg viewBox={`0 0 24 24`} aria-hidden={`true`}>
    <path d={path} />
  </svg>
);
var cleanDemoIconPaths = {
  save: `M6 4h9.5L20 8.5V18a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zM8 4v4.5h7V4M8 20v-6h8v6`,
  trash: `M4.5 7h15M10 11v5.5M14 11v5.5M6 7l.8 11.2A2 2 0 0 0 8.8 20h6.4a2 2 0 0 0 2-1.8L18 7M9.5 7V5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v2`,
  upload: `M12 15V4M7.5 8.5 12 4l4.5 4.5M5 15v3.5A1.5 1.5 0 0 0 6.5 20h11a1.5 1.5 0 0 0 1.5-1.5V15`,
  sync: `M19.5 12a7.5 7.5 0 0 1-13.3 4.8M4.5 12a7.5 7.5 0 0 1 13.3-4.8M18 3.5v4h-4M6 20.5v-4h4`,
  doc: `M7 3.5h7l4.5 4.5v11a1.5 1.5 0 0 1-1.5 1.5H7A1.5 1.5 0 0 1 5.5 19V5A1.5 1.5 0 0 1 7 3.5zM14 3.5V8h4.5M8.5 12.5h7M8.5 16h5`,
};
function ToasterCleanDemo2() {
  let toasterId = React.useId(),
    trackedIdsRef = React.useRef(new Set<ToastId>()),
    options = (t: ToastOptions = {}) => ({
      toaster: toasterId,
      ...t,
    }),
    track = (e: ToastId) => trackedIdsRef.current.add(e),
    showSaved = (e?: ToastOptions) =>
      track(
        toast.success(
          `Draft saved`,
          options({
            description: `Q3 Board Report · all changes kept`,
            ...e,
          }),
        ),
      ),
    showDeleted = (e?: ToastOptions) =>
      track(
        toast(`File moved to trash`, {
          ...options(e),
          description: `Budget-2027.xlsx`,
          icon: <CleanDemoIcon d={cleanDemoIconPaths.trash} />,
          action: {
            label: `Undo`,
            onClick: () =>
              track(
                toast.success(
                  `File restored`,
                  options({
                    description: `Budget-2027.xlsx is back in Reports`,
                  }),
                ),
              ),
          },
        }),
      ),
    showUpload = (t?: ToastOptions) => {
      let n = `${toasterId}-upload-${Date.now()}`;
      (track(n),
        toast.promise(
          demoDelay(2400),
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
            ...options(t),
            id: n,
          },
        ));
    };
  return (
    React.useEffect(() => {
      let e = [
          window.setTimeout(
            () =>
              showSaved({
                duration: 9e3,
              }),
            500,
          ),
          window.setTimeout(
            () =>
              showDeleted({
                duration: 9e3,
              }),
            1300,
          ),
          window.setTimeout(
            () =>
              showUpload({
                duration: 9e3,
              }),
            2100,
          ),
        ],
        n = trackedIdsRef.current;
      return () => {
        (e.forEach(clearTimeout), n.forEach((e) => toast.dismiss(e)), n.clear());
      };
    }, []),
    (
      <div className={`toaster-demo toaster-demo--clean`}>
        <div className={`toaster-demo__col`}>
          <div className={`toaster-demo__panel`}>
            <div className={`toaster-demo__card`}>
              <div className={`toaster-demo__head`}>
                <span className={`toaster-demo__doc`}>
                  <CleanDemoIcon d={cleanDemoIconPaths.doc} />
                </span>
                <div className={`toaster-demo__meta`}>
                  <span className={`toaster-demo__name`}>{`Q3 Board Report`}</span>
                  <span className={`toaster-demo__sub`}>{`Finance · edited 2 min ago`}</span>
                </div>
              </div>
              <div className={`toaster-demo__grid`}>
                <button type={`button`} className={`toaster-demo__btn`} onClick={() => showSaved()}>
                  <CleanDemoIcon d={cleanDemoIconPaths.save} />
                  {`Save draft`}
                </button>
                <button
                  type={`button`}
                  className={`toaster-demo__btn`}
                  onClick={() => showDeleted()}
                >
                  <CleanDemoIcon d={cleanDemoIconPaths.trash} />
                  {`Delete file`}
                </button>
                <button
                  type={`button`}
                  className={`toaster-demo__btn`}
                  onClick={() => showUpload()}
                >
                  <CleanDemoIcon d={cleanDemoIconPaths.upload} />
                  {`Upload report`}
                </button>
                <button
                  type={`button`}
                  className={`toaster-demo__btn`}
                  onClick={() => {
                    let t = `${toasterId}-sync-${Date.now()}`;
                    (track(t),
                      toast.promise(
                        demoDelay(2200, true),
                        {
                          loading: `Syncing with Google Drive…`,
                          success: `Synced`,
                          error: {
                            title: `Couldn't sync`,
                            description: `Google Drive didn't respond. Try again in a minute.`,
                          },
                        },
                        options({
                          id: t,
                        }),
                      ));
                  }}
                >
                  <CleanDemoIcon d={cleanDemoIconPaths.sync} />
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
            <ToasterClean id={toasterId} inline={true} position={`top-center`} />
          </div>
        </div>
      </div>
    )
  );
}
const demoStyles =
  ".toaster-demo{--toaster-demo-tray:#f0f0f0;--toaster-demo-card:#fff;--toaster-demo-line:#ececec;--toaster-demo-ink:#171717;--toaster-demo-muted:#8f8f8f;--toaster-demo-hover:#f5f5f5;--toaster-demo-focus:#17171738;-webkit-font-smoothing:antialiased;place-items:center;padding:24px 16px;font-family:Inter,ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,sans-serif;display:grid;position:absolute;inset:0}:where(.dark,[data-theme=dark]) .toaster-demo{--toaster-demo-tray:#111113;--toaster-demo-card:#19191b;--toaster-demo-line:#2a2a2e;--toaster-demo-ink:#ededed;--toaster-demo-muted:#8b8b92;--toaster-demo-hover:#1f1f22;--toaster-demo-focus:#ffffff4d}.toaster-demo__col{justify-items:center;gap:14px;width:min(100%,356px);display:grid}.toaster-demo__slot{width:100%;height:232px;position:relative}.toaster-demo__slot .ui-ts{--ui-ts-offset:0px;--ui-ts-width:100%}@media (width<=600px){.toaster-demo__slot .ui-ts{top:0;left:0;right:0}}.toaster-demo__panel{background:var(--toaster-demo-tray);border-radius:20px;width:100%;padding:4px}.toaster-demo__card{background:var(--toaster-demo-card);box-shadow:0 0 0 1px var(--toaster-demo-line), 0 1px 2px #0000000a;border-radius:16px;padding:14px}.toaster-demo__head{align-items:center;gap:10px;padding:0 2px 14px;display:flex}.toaster-demo__doc{background:var(--toaster-demo-tray);width:34px;height:34px;color:var(--toaster-demo-ink);border-radius:10px;place-items:center;display:grid}.toaster-demo__meta{min-width:0;display:grid}.toaster-demo__name{color:var(--toaster-demo-ink);font-size:14px;font-weight:500;line-height:20px}.toaster-demo__sub{color:var(--toaster-demo-muted);font-size:12.5px;line-height:18px}.toaster-demo svg{fill:none;stroke:currentColor;stroke-width:1.8px;stroke-linecap:round;stroke-linejoin:round;flex:none;width:16px;height:16px}.toaster-demo__grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:6px;display:grid}.toaster-demo__btn{background:var(--toaster-demo-card);height:38px;box-shadow:0 0 0 1px var(--toaster-demo-line);font:inherit;color:var(--toaster-demo-ink);white-space:nowrap;text-overflow:ellipsis;cursor:pointer;border:0;border-radius:10px;align-items:center;gap:8px;min-width:0;margin:0;padding:0 12px;font-size:13px;font-weight:500;transition:background-color .16s,transform .16s;display:flex;overflow:hidden}.toaster-demo__btn svg{color:var(--toaster-demo-muted)}.toaster-demo__btn:hover{background:var(--toaster-demo-hover)}.toaster-demo__btn:active{transform:scale(.98)}.toaster-demo__btn:focus-visible{outline:2px solid var(--toaster-demo-focus);outline-offset:2px}.toaster-demo__foot{color:var(--toaster-demo-muted);text-align:center;margin:0;padding:10px 12px 8px;font-size:12.5px}.toaster-demo__foot kbd{background:var(--toaster-demo-card);min-width:22px;box-shadow:0 0 0 1px var(--toaster-demo-line);font:inherit;color:var(--toaster-demo-ink);border-radius:5px;padding:0 5px;font-size:11.5px;line-height:18px;display:inline-block}.card__preview .toaster-demo{align-items:start;padding:34px 0 0}.card__preview .toaster-demo__col{zoom:.5;width:356px}.card__preview .toaster-demo__slot{height:150px}.card__preview .toaster-demo .ui-ts__close{display:none}.stage:has(.toaster-demo){height:560px}@media (width<=760px){.stage:has(.toaster-demo){height:580px}.toaster-demo{place-items:start center;padding:56px 12px 16px}}@media (hover:none) and (pointer:coarse){.toaster-demo__btn{height:44px}}@media (width<=360px){.toaster-demo__card{padding:10px}.toaster-demo__btn{gap:6px;padding:0 9px;font-size:12.5px}}.toaster-demo--clean{--toaster-demo-card:#fff;--toaster-demo-strong:#000;--toaster-demo-ink:#000000e0;--toaster-demo-muted:#00000073;--toaster-demo-icon:#00000072;--toaster-demo-shadow:0 0 0 .5px #0000000f, 0 1px 1px -1px #0000001a, 0 1px 2px 0 #0000000d;--toaster-demo-shadow-hover:0 0 0 .5px #0000001a, 0 1px 1px -1px #0000001f, 0 1px 3px 0 #00000012;--toaster-demo-focus:#0060e259;font-family:Inter,InterVariable,ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,sans-serif}:where(.dark,[data-theme=dark]) .toaster-demo--clean{--toaster-demo-card:#1c1c1e;--toaster-demo-strong:#fff;--toaster-demo-ink:#ffffffe6;--toaster-demo-muted:#ffffff73;--toaster-demo-icon:#ffffff75;--toaster-demo-shadow:0 0 0 .5px #ffffff1a, 0 1px 2px 0 #0006;--toaster-demo-shadow-hover:0 0 0 .5px #ffffff29, 0 1px 2px 0 #0006;--toaster-demo-focus:#4d8dff80}.toaster-demo--clean .toaster-demo__col{gap:12px}.toaster-demo--clean .toaster-demo__slot .ui-tsc{--ui-tsc-offset:0px;--ui-tsc-width:100%}@media (width<=600px){.toaster-demo--clean .toaster-demo__slot .ui-tsc{top:0;left:0;right:0}}.toaster-demo--clean .toaster-demo__panel{background:0 0;border-radius:10px;padding:0}.toaster-demo--clean .toaster-demo__card{box-shadow:var(--toaster-demo-shadow);border-radius:10px;padding:12px}.toaster-demo--clean .toaster-demo__head{gap:10px;padding:0 0 12px}.toaster-demo--clean .toaster-demo__doc{background:var(--toaster-demo-card);width:32px;height:32px;box-shadow:var(--toaster-demo-shadow);color:var(--toaster-demo-icon);border-radius:6px}.toaster-demo--clean .toaster-demo__name{color:var(--toaster-demo-strong);font-size:13px;line-height:20px}.toaster-demo--clean .toaster-demo__sub{color:var(--toaster-demo-muted);font-size:12px;line-height:16px}.toaster-demo--clean svg{stroke-width:1.6px}.toaster-demo--clean .toaster-demo__grid{gap:8px}.toaster-demo--clean .toaster-demo__btn{height:28px;box-shadow:var(--toaster-demo-shadow);color:var(--toaster-demo-strong);border-radius:6px;gap:6px;padding:0 10px 0 6px;line-height:20px;transition:box-shadow .14s,transform .16s}.toaster-demo--clean .toaster-demo__btn svg{color:var(--toaster-demo-icon)}.toaster-demo--clean .toaster-demo__btn:hover{background:var(--toaster-demo-card);box-shadow:var(--toaster-demo-shadow-hover)}.toaster-demo--clean .toaster-demo__btn:active{transform:scale(.97)}.toaster-demo--clean .toaster-demo__btn:focus-visible{outline-offset:1px}.toaster-demo--clean .toaster-demo__foot{color:var(--toaster-demo-muted);padding:10px 0 0;font-size:12px;line-height:16px}.toaster-demo--clean .toaster-demo__foot kbd{min-width:20px;box-shadow:var(--toaster-demo-shadow);color:var(--toaster-demo-ink);border-radius:4px;padding:0 5px;font-size:11px;line-height:16px}.card__preview .toaster-demo--clean{padding-top:42px}.card__preview .toaster-demo--clean .toaster-demo__col{zoom:.56}.card__preview .toaster-demo--clean .ui-tsc__close{display:none}@media (width>=761px){.stage .toaster-demo--clean .toaster-demo__col{zoom:1.1;width:min(100%,324px)}}@media (hover:none) and (pointer:coarse){.toaster-demo--clean .toaster-demo__btn{height:36px}}\n";
function ToasterCleanDemo(props: React.JSX.IntrinsicAttributes) {
  return (
    <>
      <style href="plico-demo-toaster-clean" precedence="default">
        {demoStyles}
      </style>
      <ToasterCleanDemo2 {...props} />
    </>
  );
}
export { ToasterClean as Component };
export { ToasterCleanDemo as Demo };
export { ToasterClean };
export { ToasterCleanDemo };
export { toast };
export default ToasterClean;

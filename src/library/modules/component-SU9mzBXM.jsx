"use client";

import * as React from "react";
import * as JSXRuntime from "react/jsx-runtime";
var riskLabels = {
  low: `Low`,
  medium: `Medium`,
  high: `High`,
};
function ApprovalCard({
  title: title,
  description: description,
  risk: risk,
  icon: icon,
  details: details,
  preview: preview,
  children: children,
  status: status,
  defaultStatus = `pending`,
  onApprove: onApprove,
  onDeny: onDeny,
  onEdit: onEdit,
  expiresIn: expiresIn,
  onExpire: onExpire,
  allowAlways = true,
  alwaysLabel = `Always allow this action`,
  approveLabel = `Approve`,
  denyLabel = `Deny`,
  editLabel = `Edit`,
  shortcuts = true,
  label: label,
  actions = `tray`,
  className: className,
}) {
  let instanceId = React.useId(),
    [internalStatus, setInternalStatus] = React.useState(defaultStatus),
    currentStatus = status ?? internalStatus,
    isResolved = currentStatus !== `pending`,
    [always, setAlways] = React.useState(false),
    [busy, setBusy] = React.useState(false),
    [resolutionReason, setResolutionReason] = React.useState(`user`),
    [resolvedAt, setResolvedAt] = React.useState(() => (isResolved ? Date.now() : null)),
    [announcement, setAnnouncement] = React.useState(``),
    [hovered, setHovered] = React.useState(false),
    [focused, setFocused] = React.useState(false),
    [modifierKey, setModifierKey] = React.useState(`⌘`),
    [previousStatus, setPreviousStatus] = React.useState(currentStatus),
    [pendingLeaving, setPendingLeaving] = React.useState(false),
    [pendingEntering, setPendingEntering] = React.useState(false);
  previousStatus !== currentStatus &&
    (setPreviousStatus(currentStatus),
    currentStatus === `pending`
      ? (setPendingLeaving(false),
        setPendingEntering(true),
        setAlways(false),
        setBusy(false),
        setResolutionReason(`user`),
        setResolvedAt(null),
        setAnnouncement(``))
      : (setPendingLeaving(previousStatus === `pending`),
        setPendingEntering(false),
        setResolvedAt(Date.now()),
        setAnnouncement(
          `${currentStatus === `approved` ? `Approved` : resolutionReason === `timeout` ? `Expired` : `Denied`}: ${title}`,
        )));
  let rootRef = React.useRef(null),
    resolvedRef = React.useRef(null),
    approveRef = React.useRef(null),
    restoreFocusRef = React.useRef(false);
  React.useEffect(() => {
    let e = navigator.userAgentData?.platform ?? navigator.platform ?? ``;
    /mac|iphone|ipad|ipod/i.test(e || navigator.userAgent) || setModifierKey(`Ctrl`);
  }, []);
  let approve = async () => {
      if (isResolved || busy) return;
      let e = onApprove?.({
        always: always,
      });
      if (e && typeof e.then == `function`) {
        setBusy(true);
        try {
          await e;
        } catch {
          setBusy(false);
          return;
        }
        setBusy(false);
      }
      status === void 0 && setInternalStatus(`approved`);
    },
    deny = (e = `user`) => {
      isResolved ||
        (busy && e === `user`) ||
        (setResolutionReason(e),
        e === `timeout` && onExpire?.(),
        onDeny?.({
          reason: e,
        }),
        status === void 0 && setInternalStatus(`denied`));
    },
    onKeyDown = (e) => {
      isResolved ||
        busy ||
        e.defaultPrevented ||
        (e.key === `Enter` && (e.metaKey || e.ctrlKey)
          ? (e.preventDefault(), approve())
          : e.key === `Escape` && (e.preventDefault(), deny(`user`)));
    },
    expiresMs = expiresIn && expiresIn > 0 ? expiresIn * 1e3 : 0,
    remainingMsRef = React.useRef(expiresMs),
    [remainingSeconds, setRemainingSeconds] = React.useState(Math.ceil(expiresMs / 1e3)),
    expireRef = React.useRef(() => {});
  (React.useLayoutEffect(() => {
    expireRef.current = () => deny(`timeout`);
  }),
    React.useEffect(() => {
      currentStatus === `pending` &&
        ((remainingMsRef.current = expiresMs), setRemainingSeconds(Math.ceil(expiresMs / 1e3)));
    }, [currentStatus, expiresMs]));
  let timerPaused = hovered || focused || busy;
  React.useEffect(() => {
    if (!expiresMs || isResolved || timerPaused) return;
    let e = performance.now(),
      t = 0,
      n = (r) => {
        if (
          ((remainingMsRef.current -= r - e),
          (e = r),
          setRemainingSeconds(Math.max(0, Math.ceil(remainingMsRef.current / 1e3))),
          remainingMsRef.current <= 0)
        ) {
          expireRef.current();
          return;
        }
        t = requestAnimationFrame(n);
      };
    return ((t = requestAnimationFrame(n)), () => cancelAnimationFrame(t));
  }, [expiresMs, isResolved, timerPaused]);
  let previousHeightRef = React.useRef(0),
    animatingHeightRef = React.useRef(false),
    mountedRef = React.useRef(false);
  (React.useEffect(() => {
    let e = rootRef.current;
    if (!e || typeof ResizeObserver > `u`) return;
    let t = new ResizeObserver(() => {
      animatingHeightRef.current || (previousHeightRef.current = e.offsetHeight);
    });
    return (t.observe(e), () => t.disconnect());
  }, []),
    React.useLayoutEffect(() => {
      let e = rootRef.current;
      if (!e) return;
      if (!mountedRef.current) {
        ((mountedRef.current = true), (previousHeightRef.current = e.offsetHeight));
        return;
      }
      let t = document.activeElement;
      (isResolved &&
        t &&
        e.contains(t) &&
        resolvedRef.current?.focus({
          preventScroll: true,
        }),
        !isResolved &&
          restoreFocusRef.current &&
          approveRef.current?.focus({
            preventScroll: true,
          }),
        (restoreFocusRef.current = false));
      let n = previousHeightRef.current;
      e.style.height = ``;
      let r = e.offsetHeight;
      if (!n || n === r) return;
      ((animatingHeightRef.current = true),
        (e.style.height = `${n}px`),
        e.offsetHeight,
        (e.style.height = `${r}px`));
      let i = window.setTimeout(() => {
        ((e.style.height = ``),
          (animatingHeightRef.current = false),
          (previousHeightRef.current = e.offsetHeight));
      }, 560);
      return () => {
        (window.clearTimeout(i), (e.style.height = ``), (animatingHeightRef.current = false));
      };
    }, [isResolved]));
  let [, forceTick] = React.useState(0);
  React.useEffect(() => {
    if (!isResolved) return;
    let e = window.setInterval(() => forceTick((e) => e + 1), 3e4);
    return () => window.clearInterval(e);
  }, [isResolved]);
  let titleId = `${instanceId}-title`,
    rowId = `${instanceId}-row`,
    descriptionId = `${instanceId}-desc`,
    timerId = `${instanceId}-timer`,
    previewContent = preview ?? children,
    resolvedLabel =
      currentStatus === `approved`
        ? `Approved`
        : resolutionReason === `timeout`
          ? `Expired`
          : `Denied`,
    describedBy = [description ? descriptionId : null, expiresMs && !isResolved ? timerId : null]
      .filter(Boolean)
      .join(` `),
    actionFooter = (
      <div className={`ui-ap__foot`}>
        {expiresMs > 0 && (
          <span
            className={`ui-ap__expires`}
            data-paused={timerPaused || void 0}
            data-low={remainingSeconds <= 10 || void 0}
            aria-hidden={`true`}
          >
            <svg viewBox={`0 0 16 16`}>
              <circle cx={`8`} cy={`8`} r={`6`} />
              <path d={`M8 5v3.2l2 1.3`} />
            </svg>
            {`Expires in `}
            {formatCountdown(remainingSeconds)}
          </span>
        )}
        <div className={`ui-ap__actions`}>
          {onEdit && (
            <button
              type={`button`}
              className={`ui-ap__btn ui-ap__btn--ghost`}
              aria-disabled={busy || void 0}
              onClick={() => !busy && onEdit()}
            >
              {editLabel}
            </button>
          )}
          <button
            type={`button`}
            className={`ui-ap__btn ui-ap__btn--quiet ui-ap__deny`}
            aria-keyshortcuts={`Escape`}
            aria-disabled={busy || void 0}
            onClick={() => deny(`user`)}
          >
            {denyLabel}
            {shortcuts && <kbd className={`ui-ap__kbd`} aria-hidden={`true`}>{`Esc`}</kbd>}
          </button>
          <button
            ref={approveRef}
            type={`button`}
            className={`ui-ap__btn ui-ap__btn--primary ui-ap__approve`}
            aria-keyshortcuts={`Meta+Enter Control+Enter`}
            aria-disabled={busy || void 0}
            onClick={() => void approve()}
          >
            {approveLabel}
            {busy ? (
              <svg className={`ui-ap__spinner`} viewBox={`0 0 16 16`} aria-hidden={`true`}>
                <circle cx={`8`} cy={`8`} r={`6`} />
              </svg>
            ) : (
              shortcuts && (
                <kbd className={`ui-ap__kbd`} aria-hidden={`true`}>
                  {modifierKey === `⌘` ? `⌘↵` : `Ctrl ↵`}
                </kbd>
              )
            )}
          </button>
        </div>
      </div>
    );
  return (
    <div
      ref={rootRef}
      className={[`ui-ap`, className].filter(Boolean).join(` `)}
      role={`group`}
      aria-labelledby={isResolved ? rowId : titleId}
      aria-describedby={describedBy || void 0}
      aria-busy={busy || void 0}
      data-status={currentStatus}
      data-busy={busy || void 0}
      data-label={label ? `` : void 0}
      data-actions={actions}
      onKeyDown={onKeyDown}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(e) => {
        e.currentTarget.contains(e.relatedTarget) || setFocused(false);
      }}
    >
      <style href={`ui-approval-card`} precedence={`default`}>
        {approvalCardStyles}
      </style>
      {label && <div className={`ui-ap__label`}>{label}</div>}
      {(!isResolved || pendingLeaving) && (
        <div
          className={`ui-ap__pending`}
          data-leaving={pendingLeaving || void 0}
          data-entering={pendingEntering || void 0}
          inert={pendingLeaving}
          aria-hidden={pendingLeaving || void 0}
          onAnimationEnd={(e) => {
            e.target === e.currentTarget &&
              (pendingLeaving && setPendingLeaving(false),
              pendingEntering && setPendingEntering(false));
          }}
        >
          <div className={`ui-ap__card`}>
            <div className={`ui-ap__head`}>
              <span className={`ui-ap__icon`} aria-hidden={`true`}>
                {icon ?? (
                  <svg viewBox={`0 0 24 24`}>
                    <path d={`M12 3 5 5.8v5.4c0 4.3 2.9 8.2 7 9.8 4.1-1.6 7-5.5 7-9.8V5.8L12 3Z`} />
                    <path d={`m9.2 12.2 2 2 3.8-4`} />
                  </svg>
                )}
              </span>
              <div className={`ui-ap__titles`}>
                <h3 className={`ui-ap__title`} id={pendingLeaving ? void 0 : titleId}>
                  {title}
                </h3>
                {description && (
                  <p className={`ui-ap__desc`} id={pendingLeaving ? void 0 : descriptionId}>
                    {description}
                  </p>
                )}
              </div>
              {risk && (
                <span className={`ui-ap__risk`} data-risk={risk}>
                  <span className={`ui-ap__risk-dot`} aria-hidden={`true`} />
                  {riskLabels[risk]}
                  <span className={`ui-ap__risk-word`}>{` risk`}</span>
                </span>
              )}
            </div>
            {(previewContent || details?.length) && (
              <div className={`ui-ap__preview`}>
                {previewContent && <div className={`ui-ap__custom`}>{previewContent}</div>}
                {details?.length ? (
                  <dl className={`ui-ap__details`}>
                    {details.map((e, t) => (
                      <div className={`ui-ap__detail`} key={e.label + t}>
                        <dt>{e.label}</dt>
                        <dd>{e.value}</dd>
                      </div>
                    ))}
                  </dl>
                ) : null}
              </div>
            )}
            {allowAlways && (
              <label className={`ui-ap__always`}>
                <span className={`ui-ap__box`}>
                  <input
                    type={`checkbox`}
                    checked={always}
                    disabled={busy}
                    onChange={(e) => setAlways(e.target.checked)}
                  />
                  <svg viewBox={`0 0 16 16`} aria-hidden={`true`}>
                    <path d={`M4 8.3 6.8 11 12 5.2`} />
                  </svg>
                </span>
                <span className={`ui-ap__always-label`}>{alwaysLabel}</span>
              </label>
            )}
            {actions === `card` && actionFooter}
          </div>
          {actions === `tray` && actionFooter}
          {expiresMs > 0 && (
            <span
              className={`ui-ap__sr`}
              id={pendingLeaving ? void 0 : timerId}
            >{`Expires in ${remainingSeconds} seconds unless approved. The timer pauses while the card is hovered or focused.`}</span>
          )}
        </div>
      )}
      {isResolved && (
        <div
          ref={resolvedRef}
          className={`ui-ap__card ui-ap__resolved`}
          tabIndex={-1}
          data-status={currentStatus}
          onFocus={() => (restoreFocusRef.current = true)}
          onBlur={(e) => {
            (e.relatedTarget || e.currentTarget.isConnected) && (restoreFocusRef.current = false);
          }}
        >
          <span className={`ui-ap__mark`} aria-hidden={`true`}>
            <svg viewBox={`0 0 16 16`}>
              {currentStatus === `approved` ? (
                <path d={`M4.2 8.4 6.9 11 11.8 5.6`} pathLength={1} />
              ) : (
                <path d={`M5.2 5.2 10.8 10.8M10.8 5.2 5.2 10.8`} pathLength={1} />
              )}
            </svg>
          </span>
          <span className={`ui-ap__row-title`} id={rowId}>
            {title}
          </span>
          <span className={`ui-ap__row-status`}>
            {resolvedLabel}
            {currentStatus === `approved` && always && (
              <span className={`ui-ap__row-extra`}>{` · Always`}</span>
            )}
            {resolvedAt !== null && (
              <span className={`ui-ap__row-time`}>
                {` · `}
                {formatRelativeTime(resolvedAt)}
              </span>
            )}
          </span>
        </div>
      )}
      <span className={`ui-ap__sr`} role={`status`} aria-live={`polite`}>
        {announcement}
      </span>
    </div>
  );
}
function formatCountdown(e) {
  return `${Math.floor(e / 60)}:${String(e % 60).padStart(2, `0`)}`;
}
function formatRelativeTime(e) {
  let t = Math.floor((Date.now() - e) / 1e3);
  return t < 60
    ? `just now`
    : t < 3600
      ? `${Math.floor(t / 60)} min ago`
      : `${Math.floor(t / 3600)} h ago`;
}
var approvalCardStyles = `
/* Colors and motion as variables – override them on .ui-ap */
.ui-ap {
  --ui-ap-tray: #f0f0f0;
  --ui-ap-bg: #ffffff;
  --ui-ap-ink: #171717;
  --ui-ap-text: #6b6b6b;
  --ui-ap-muted: #8a8a8a;
  --ui-ap-line: #ececec;
  --ui-ap-soft: #fafafa;
  --ui-ap-tile: #f4f4f4;
  --ui-ap-hover: #e4e4e5;
  --ui-ap-primary: #171717;
  --ui-ap-primary-hover: #2e2e2e;
  --ui-ap-primary-ink: #ffffff;
  --ui-ap-primary-kbd: rgba(255, 255, 255, 0.14);
  --ui-ap-primary-kbd-ink: rgba(255, 255, 255, 0.72);
  --ui-ap-kbd: rgba(0, 0, 0, 0.055);
  --ui-ap-box: #d4d4d4;
  --ui-ap-box-hover: #b5b5b5;
  --ui-ap-ring: rgba(23, 23, 23, 0.32);
  --ui-ap-timer-low: #b7791f;
  --ui-ap-low-bg: #f2f2f2;
  --ui-ap-low-ink: #6b6b6b;
  --ui-ap-med-bg: #fbf3e2;
  --ui-ap-med-ink: #8a5a00;
  --ui-ap-high-bg: #fdeceb;
  --ui-ap-high-ink: #b42318;
  --ui-ap-ok-bg: #e9f6ee;
  --ui-ap-ok-ink: #1a7f45;
  --ui-ap-no-bg: #f2f2f2;
  --ui-ap-no-ink: #6b6b6b;
  --ui-ap-ease: cubic-bezier(0.22, 1, 0.36, 1);
  position: relative;
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
  overflow: hidden;
  container-type: inline-size;
  padding: 4px;
  border-radius: 20px;
  background: var(--ui-ap-tray);
  color: var(--ui-ap-text);
  font-family: "Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  font-size: 13px;
  line-height: 1.45;
  letter-spacing: -0.006em;
  text-align: left;
  -webkit-font-smoothing: antialiased;
  transition: height 520ms var(--ui-ap-ease);
}
.ui-ap *,
.ui-ap *::before,
.ui-ap *::after {
  box-sizing: border-box;
}

/* The white card – the pending request and the resolved row both live in one */
.ui-ap__card {
  position: relative;
  border-radius: 16px;
  background: var(--ui-ap-bg);
  box-shadow: 0 0 0 1px var(--ui-ap-line), 0 1px 2px rgba(0, 0, 0, 0.04);
}

/* ---------- Pending ---------- */
.ui-ap__pending > .ui-ap__card {
  padding: 16px;
}
.ui-ap__pending[data-leaving] {
  position: absolute;
  top: 4px;
  left: 4px;
  right: 4px;
  pointer-events: none;
  animation: ui-ap-out 280ms var(--ui-ap-ease) both;
}
.ui-ap__pending[data-entering] {
  animation: ui-ap-in 420ms var(--ui-ap-ease) 80ms both;
}
.ui-ap[data-busy] .ui-ap__pending {
  pointer-events: none;
}

.ui-ap__head {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: start;
  gap: 12px;
}
.ui-ap__icon {
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  border-radius: 9px;
  background: var(--ui-ap-tile);
  box-shadow: inset 0 0 0 1px var(--ui-ap-line);
  color: var(--ui-ap-ink);
}
.ui-ap__icon svg {
  width: 16px;
  height: 16px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.7;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.ui-ap__titles {
  min-width: 0;
  padding-top: 1px;
}
.ui-ap__title {
  margin: 0;
  overflow: hidden;
  color: var(--ui-ap-ink);
  font-size: 14px;
  font-weight: 550;
  line-height: 20px;
  letter-spacing: -0.011em;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.ui-ap__desc {
  margin: 1px 0 0;
  overflow: hidden;
  font-size: 13px;
  line-height: 18px;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.ui-ap__risk {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 22px;
  margin-top: 1px;
  padding: 0 9px 0 8px;
  border-radius: 999px;
  background: var(--ui-ap-low-bg);
  color: var(--ui-ap-low-ink);
  font-size: 12px;
  font-weight: 500;
  line-height: 1;
  white-space: nowrap;
}
.ui-ap__risk-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: currentColor;
  opacity: 0.8;
}
.ui-ap__risk-word {
  white-space: pre;
}
.ui-ap__risk[data-risk="medium"] {
  background: var(--ui-ap-med-bg);
  color: var(--ui-ap-med-ink);
}
.ui-ap__risk[data-risk="high"] {
  background: var(--ui-ap-high-bg);
  color: var(--ui-ap-high-ink);
}

/* Preview: custom content and key-value rows in one soft panel */
.ui-ap__preview {
  display: grid;
  gap: 12px;
  margin-top: 14px;
  padding: 12px;
  border-radius: 10px;
  background: var(--ui-ap-soft);
  box-shadow: inset 0 0 0 1px var(--ui-ap-line);
}
.ui-ap__custom {
  min-width: 0;
}
.ui-ap__custom + .ui-ap__details {
  padding-top: 12px;
  border-top: 1px solid var(--ui-ap-line);
}
.ui-ap__details {
  display: grid;
  grid-template-columns: max-content minmax(0, 1fr);
  gap: 6px 16px;
  margin: 0;
}
.ui-ap__detail {
  display: contents;
}
.ui-ap__detail dt {
  color: var(--ui-ap-muted);
}
.ui-ap__detail dd {
  min-width: 0;
  margin: 0;
  overflow: hidden;
  color: var(--ui-ap-ink);
  white-space: nowrap;
  text-overflow: ellipsis;
}

/* "Always allow" closes the card */
.ui-ap__always {
  display: flex;
  width: fit-content;
  max-width: 100%;
  margin-top: 14px;
  align-items: center;
  gap: 8px;
  min-width: 0;
  cursor: pointer;
  user-select: none;
}
.ui-ap__always-label {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.ui-ap__box {
  position: relative;
  display: grid;
  flex: none;
  width: 16px;
  height: 16px;
}
.ui-ap__box input {
  appearance: none;
  -webkit-appearance: none;
  width: 16px;
  height: 16px;
  margin: 0;
  border-radius: 5px;
  background: var(--ui-ap-bg);
  box-shadow: inset 0 0 0 1px var(--ui-ap-box);
  cursor: pointer;
  transition: background-color 160ms ease, box-shadow 160ms ease;
}
.ui-ap__box input:hover {
  box-shadow: inset 0 0 0 1px var(--ui-ap-box-hover);
}
.ui-ap__box input:checked {
  background: var(--ui-ap-primary);
  box-shadow: inset 0 0 0 1px var(--ui-ap-primary);
}
.ui-ap__box input:focus-visible {
  outline: none;
  box-shadow: inset 0 0 0 1px var(--ui-ap-primary), 0 0 0 2px var(--ui-ap-bg), 0 0 0 4px var(--ui-ap-ring);
}
.ui-ap__box svg {
  position: absolute;
  inset: 0;
  width: 16px;
  height: 16px;
  fill: none;
  stroke: var(--ui-ap-primary-ink);
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
  opacity: 0;
  transform: scale(0.6);
  transition: opacity 160ms ease, transform 260ms var(--ui-ap-ease);
  pointer-events: none;
}
.ui-ap__box input:checked + svg {
  opacity: 1;
  transform: none;
}

/* Optional label on the gray tray above the card */
.ui-ap__label {
  overflow: hidden;
  padding: 6px 8px 4px;
  color: var(--ui-ap-muted);
  font-size: 12.5px;
  line-height: 16px;
  white-space: nowrap;
  text-overflow: ellipsis;
}
/* The leaving request is laid over the resolved row – below the label when there is one */
.ui-ap[data-label] .ui-ap__pending[data-leaving] { top: 30px; }

/* actions="card": the buttons close the white card instead of sitting on the tray */
.ui-ap__card > .ui-ap__foot { min-height: 0; margin-top: 14px; padding: 0; }

/* The tray below the card: countdown on the left, buttons on the right */
.ui-ap__foot {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px 12px;
  min-height: 44px;
  padding: 6px 2px 2px 10px;
}
.ui-ap__expires {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-width: 0;
  color: var(--ui-ap-muted);
  font-size: 12.5px;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
  transition: color 300ms ease;
}
.ui-ap__expires svg {
  width: 14px;
  height: 14px;
  flex: none;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.ui-ap__expires[data-low] {
  color: var(--ui-ap-timer-low);
}
.ui-ap__actions {
  display: flex;
  flex: 0 0 auto;
  gap: 4px;
  margin-left: auto;
}
.ui-ap__btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 34px;
  padding: 0 12px;
  border: 0;
  border-radius: 10px;
  font: inherit;
  font-size: 13px;
  font-weight: 500;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition: background-color 160ms ease, box-shadow 160ms ease, transform 160ms var(--ui-ap-ease), opacity 160ms ease;
}
.ui-ap__btn:active,
.ui-ap__btn[data-pressed] {
  transform: scale(0.97);
}
.ui-ap__btn:focus-visible {
  outline: none;
}
.ui-ap__btn--primary {
  padding-right: 8px;
  background: var(--ui-ap-primary);
  color: var(--ui-ap-primary-ink);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.12);
}
.ui-ap__btn--primary:hover,
.ui-ap__btn--primary[data-pressed] {
  background: var(--ui-ap-primary-hover);
}
.ui-ap__btn--primary:focus-visible {
  box-shadow: 0 0 0 2px var(--ui-ap-tray), 0 0 0 4px var(--ui-ap-ring);
}
/* Quiet: transparent on the tray, a soft fill on hover */
.ui-ap__btn--quiet {
  padding-right: 8px;
  background: transparent;
  color: var(--ui-ap-ink);
}
.ui-ap__btn--quiet:hover,
.ui-ap__btn--quiet[data-pressed] {
  background: var(--ui-ap-hover);
}
.ui-ap__btn--quiet:focus-visible {
  box-shadow: 0 0 0 2px var(--ui-ap-ring);
}
.ui-ap__btn--ghost {
  background: transparent;
  color: var(--ui-ap-text);
}
.ui-ap__btn--ghost:hover {
  background: var(--ui-ap-hover);
  color: var(--ui-ap-ink);
}
.ui-ap__btn--ghost:focus-visible {
  box-shadow: 0 0 0 2px var(--ui-ap-ring);
}
.ui-ap[data-busy] .ui-ap__btn:not(.ui-ap__approve),
.ui-ap[data-busy] .ui-ap__always {
  opacity: 0.5;
}
.ui-ap[data-busy] .ui-ap__approve {
  cursor: progress;
}

.ui-ap__kbd {
  display: inline-grid;
  place-items: center;
  min-width: 20px;
  height: 20px;
  padding: 0 5px;
  border-radius: 6px;
  background: var(--ui-ap-kbd);
  color: var(--ui-ap-muted);
  font: inherit;
  font-size: 11px;
  font-weight: 500;
  line-height: 1;
}
.ui-ap__btn--primary .ui-ap__kbd {
  background: var(--ui-ap-primary-kbd);
  color: var(--ui-ap-primary-kbd-ink);
}
.ui-ap__spinner {
  width: 20px;
  height: 14px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-dasharray: 26 38;
  transform-origin: 50% 50%;
  animation: ui-ap-spin 800ms linear infinite;
}

/* ---------- Resolved row ---------- */
.ui-ap__resolved {
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 48px;
  padding: 12px 14px;
  outline: none;
  animation: ui-ap-in 420ms var(--ui-ap-ease) 120ms both;
}
.ui-ap__resolved:focus-visible {
  box-shadow: 0 0 0 1px var(--ui-ap-line), inset 0 0 0 2px var(--ui-ap-ring);
}
.ui-ap__mark {
  display: grid;
  flex: none;
  place-items: center;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: var(--ui-ap-ok-bg);
  color: var(--ui-ap-ok-ink);
  animation: ui-ap-pop 460ms var(--ui-ap-ease) 140ms both;
}
.ui-ap__resolved[data-status="denied"] .ui-ap__mark {
  background: var(--ui-ap-no-bg);
  color: var(--ui-ap-no-ink);
}
.ui-ap__mark svg {
  width: 14px;
  height: 14px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.9;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.ui-ap__mark path {
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
  animation: ui-ap-draw 420ms var(--ui-ap-ease) 300ms forwards;
}
.ui-ap__row-title {
  flex: 1 1 auto;
  min-width: 0;
  overflow: hidden;
  color: var(--ui-ap-ink);
  font-size: 13.5px;
  font-weight: 500;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.ui-ap__row-status {
  flex: none;
  color: var(--ui-ap-muted);
  white-space: nowrap;
}

.ui-ap__sr {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
  border: 0;
}

/* Narrow cards: buttons share the full width, the hints go */
@container (max-width: 400px) {
  .ui-ap__actions {
    flex: 1 1 100%;
    margin-left: 0;
  }
  .ui-ap__foot {
    padding-left: 2px;
  }
  .ui-ap__expires {
    padding-left: 8px;
  }
  .ui-ap__actions .ui-ap__btn {
    flex: 1 1 0;
    min-width: 0;
    padding: 0 10px;
  }
  .ui-ap__kbd {
    display: none;
  }
}
@container (max-width: 340px) {
  .ui-ap__pending > .ui-ap__card { padding: 14px; }
  .ui-ap__head { gap: 10px; }
  .ui-ap__risk-word { display: none; }
  .ui-ap__row-time { display: none; }
  .ui-ap__details { column-gap: 12px; }
}
/* Touch screens have no shortcuts */
@media (hover: none) {
  .ui-ap__kbd { display: none; }
}

@keyframes ui-ap-out {
  to { opacity: 0; transform: translateY(-6px) scale(0.985); filter: blur(2px); }
}
@keyframes ui-ap-in {
  from { opacity: 0; transform: translateY(4px); filter: blur(2px); }
  to { opacity: 1; transform: none; filter: none; }
}
@keyframes ui-ap-pop {
  from { opacity: 0; transform: scale(0.5); }
  to { opacity: 1; transform: none; }
}
@keyframes ui-ap-draw {
  to { stroke-dashoffset: 0; }
}
@keyframes ui-ap-spin {
  to { transform: rotate(360deg); }
}

@media (prefers-reduced-motion: reduce) {
  .ui-ap,
  .ui-ap *,
  .ui-ap *::before,
  .ui-ap *::after {
    animation-duration: 1ms !important;
    animation-delay: 0ms !important;
    transition-duration: 1ms !important;
  }
  .ui-ap__spinner { animation: ui-ap-spin 1.6s linear infinite !important; }
  .ui-ap__mark path { stroke-dashoffset: 0; }
}

/* Dark mode: follows a .dark class or data-theme="dark" on any ancestor, e.g. <html> */
:where(.dark, [data-theme="dark"]) .ui-ap {
  --ui-ap-tray: #111113;
  --ui-ap-bg: #19191b;
  --ui-ap-ink: #ededed;
  --ui-ap-text: #a1a1a1;
  --ui-ap-muted: #8b8b92;
  --ui-ap-line: #2a2a2e;
  --ui-ap-soft: #1f1f22;
  --ui-ap-tile: #1f1f22;
  --ui-ap-hover: #222225;
  --ui-ap-primary: #ededed;
  --ui-ap-primary-hover: #ffffff;
  --ui-ap-primary-ink: #19191b;
  --ui-ap-primary-kbd: rgba(0, 0, 0, 0.08);
  --ui-ap-primary-kbd-ink: rgba(25, 25, 27, 0.6);
  --ui-ap-kbd: rgba(255, 255, 255, 0.07);
  --ui-ap-box: rgba(255, 255, 255, 0.2);
  --ui-ap-box-hover: rgba(255, 255, 255, 0.32);
  --ui-ap-ring: rgba(255, 255, 255, 0.4);
  --ui-ap-timer-low: #e0a84a;
  --ui-ap-low-bg: rgba(255, 255, 255, 0.07);
  --ui-ap-low-ink: #a1a1a1;
  --ui-ap-med-bg: rgba(232, 183, 92, 0.12);
  --ui-ap-med-ink: #e8b75c;
  --ui-ap-high-bg: rgba(240, 138, 128, 0.12);
  --ui-ap-high-ink: #f08a80;
  --ui-ap-ok-bg: rgba(92, 201, 138, 0.13);
  --ui-ap-ok-ink: #5cc98a;
  --ui-ap-no-bg: rgba(255, 255, 255, 0.07);
  --ui-ap-no-ink: #a1a1a1;
}
`;
export { ApprovalCard as t };
export { ApprovalCard as PlicoCore_a };

"use client";

import * as React from "react";
import { useEffect } from "react";
import { useId } from "react";
import { useLayoutEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import type { ClipboardEvent } from "react";
import type { CSSProperties } from "react";
import type { KeyboardEvent } from "react";
import type { ReactNode } from "react";
var valueValue5 = `482913`;
var valueValue6 = `481973`;
var valueValue7 = (e: number) =>
  e > 0
    ? `That code didn't work. ${e} ${e === 1 ? `try` : `tries`} left.`
    : `That code didn't work. Request a new code.`;
function OtpInputCleanDemo2() {
  let [e, t] = React.useState(``),
    [i, a] = React.useState<OtpStatus>(`idle`),
    [o, c] = React.useState(3),
    d = React.useRef<number[]>([]),
    f = React.useRef(true),
    p = (e: number | undefined, t: TimerHandler) => d.current.push(window.setTimeout(t, e)),
    m = () => {
      (d.current.forEach(clearTimeout), (d.current = []));
    },
    h = (e: string) => {
      (a(`verifying`),
        p(1e3, () => {
          e === valueValue5
            ? (a(`success`),
              p(3200, () => {
                (t(``), a(`idle`), c(3));
              }))
            : (c((e) => Math.max(0, e - 1)), a(`error`));
        }));
    };
  React.useEffect(() => {
    let e = 700,
      n = (n: string) => {
        for (let r = 1; r <= n.length; r++) {
          let i = n.slice(0, r);
          (p(e, () => t(i)), (e += 150));
        }
      };
    return (
      n(valueValue6),
      p(e + 150, () => h(valueValue6)),
      (e += 2850),
      p(e, () => a(`idle`)),
      n(valueValue5),
      p(e + 150, () => {
        ((f.current = false), h(valueValue5));
      }),
      m
    );
  }, []);
  let g = () => {
    f.current && ((f.current = false), m(), t(``), a(`idle`));
  };
  return (
    <div className={`otp-demo`} onPointerDownCapture={g} onKeyDownCapture={g} onFocusCapture={g}>
      <div className={`otp-democ`}>
        <div className={`otp-democ__body`}>
          <span className={`otp-democ__icon`} aria-hidden={`true`}>
            <svg viewBox={`0 0 16 16`}>
              <rect x={`1.75`} y={`3.25`} width={`12.5`} height={`9.5`} rx={`2`} />
              <path d={`M2.5 4.75l5.5 4 5.5-4`} />
            </svg>
          </span>
          <h3 className={`otp-democ__title`}>{`Check your email`}</h3>
          <p className={`otp-democ__text`}>
            {`We sent a code to `}
            <strong>{`maya@acme.com`}</strong>
          </p>
          <OtpInput
            className={`otp-demo__otp`}
            separator={true}
            align={`center`}
            value={e}
            status={i}
            errorMessage={valueValue7(o)}
            onChange={(e) => {
              (t(e), i === `error` && e && a(`idle`));
            }}
            onComplete={h}
            onResend={() => c(3)}
            resendIn={30}
          />
        </div>
        <p className={`otp-democ__hint`}>
          {`Demo code: `}
          <span>
            {`482`}
            {`\xA0`}
            {`913`}
          </span>
        </p>
      </div>
    </div>
  );
}
type OtpStatus = "idle" | "verifying" | "error" | "success";
type OtpInputProps = {
  length?: number;
  separator?: boolean | number;
  numeric?: boolean;
  value?: string;
  defaultValue?: string;
  onChange?: (code: string) => void;
  onComplete?: (code: string) => void;
  status?: OtpStatus;
  errorMessage?: ReactNode;
  clearOnError?: boolean;
  successLabel?: string;
  onResend?: () => void;
  resendIn?: number;
  align?: "start" | "center";
  disabled?: boolean;
  autoFocus?: boolean;
  label?: string;
  className?: string;
};
const clock = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
const reduced = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const icons = {
  check: "M5.5 12.5l4 4L18.5 8",
  alert: "M12 8v4.5M12 16h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z",
};
function OtpInput({
  length = 6,
  separator = false,
  numeric = true,
  value,
  defaultValue = "",
  onChange,
  onComplete,
  status = "idle",
  errorMessage = "That code didn't work. Try again.",
  clearOnError = true,
  successLabel = "Verified",
  onResend,
  resendIn = 30,
  align = "start",
  disabled = false,
  autoFocus = false,
  label = "Verification code",
  className,
}: OtpInputProps) {
  const clean = (text: string) => {
    let out = "";
    for (const ch of text) {
      const c = numeric
        ? /[0-9]/.test(ch)
          ? ch
          : ""
        : /[a-z0-9]/i.test(ch)
          ? ch.toUpperCase()
          : "";
      if (c && out.length < length) out += c;
    }
    return out;
  };
  const [inner, setInner] = useState(() => clean(defaultValue));
  const code = clean(value ?? inner);
  const [idx, setIdx] = useState(Math.min(code.length, length - 1));
  const [focused, setFocused] = useState(false);
  const [errorShown, setErrorShown] = useState(false);
  const [clearing, setClearing] = useState(false);
  const [locked, setLocked] = useState(false);
  const [left, setLeft] = useState(resendIn);
  const [announce, setAnnounce] = useState("");
  const input = useRef<HTMLInputElement>(null);
  const slots = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLSpanElement>(null);
  const pill = useRef<HTMLSpanElement>(null);
  const pillInner = useRef<HTMLSpanElement>(null);
  const boxes = useRef<(HTMLSpanElement | null)[]>([]);
  const timers = useRef<number[]>([]);
  const id = useId();
  const prevCode = useRef(code);
  const stamps = useRef<number[]>([]);
  const delays = useRef<number[]>([]);
  const counter = useRef(0);
  if (prevCode.current !== code) {
    const before = prevCode.current;
    const changed = [...code].map((c, i) => c !== before[i]);
    const first = changed.indexOf(true);
    const bulk = changed.filter(Boolean).length > 1;
    changed.forEach((ch, i) => {
      if (!ch) return;
      stamps.current[i] = ++counter.current;
      delays.current[i] = bulk ? (i - first) * 45 : 0;
    });
    prevCode.current = code;
  }
  const active = Math.min(idx, code.length, length - 1);
  const sepAt =
    separator === true ? Math.floor(length / 2) : typeof separator === "number" ? separator : 0;
  const busy = status === "verifying" || status === "success";
  const readOnly = busy || locked || disabled;
  const showError = status === "error" && errorShown;
  const showRing = !busy && !disabled && (focused || (code.length > 0 && code.length < length));
  const commit = (next: string, nextIdx: number, user = true) => {
    if (value === undefined) setInner(next);
    if (next !== code) onChange?.(next);
    setIdx(Math.max(0, Math.min(nextIdx, next.length, length - 1)));
    if (!user) return;
    if (errorShown && next.length) setErrorShown(false);
    if (next.length === length && next !== code) onComplete?.(next);
  };
  const onInput = (el: HTMLInputElement) => {
    if (readOnly) return;
    const raw = el.value;
    const caretRaw = el.selectionStart ?? raw.length;
    const next = clean(raw);
    const caret = clean(raw.slice(0, caretRaw)).length;
    if (next === code) {
      el.value = code;
      syncSelection();
      return;
    }
    commit(next, caret);
  };
  const onPaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (readOnly) return;
    const text = clean(e.clipboardData.getData("text"));
    if (!text) return;
    if (text.length >= length) return commit(text.slice(0, length), length - 1);
    const next = (code.slice(0, active) + text + code.slice(active + text.length)).slice(0, length);
    commit(next, active + text.length);
  };
  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const last = Math.min(code.length, length - 1);
    const moves: Record<string, number> = {
      ArrowLeft: active - 1,
      ArrowRight: active + 1,
      Home: 0,
      End: last,
      ArrowUp: 0,
      ArrowDown: last,
    };
    if (e.key in moves && !e.shiftKey && !e.metaKey) {
      e.preventDefault();
      setIdx(Math.max(0, Math.min(moves[e.key], last)));
    }
  };
  const pick = (x: number) => {
    let i = boxes.current.findIndex((b) => b && x < b.getBoundingClientRect().right + 4);
    if (i < 0) i = length - 1;
    setIdx(Math.min(i, code.length, length - 1));
    requestAnimationFrame(syncSelection);
  };
  const syncSelection = () => {
    const el = input.current;
    if (!el || document.activeElement !== el) return;
    const i = Math.min(idx, code.length, length - 1);
    if (i < code.length) el.setSelectionRange(i, i + 1);
    else el.setSelectionRange(i, i);
  };
  useLayoutEffect(syncSelection);
  useEffect(() => {
    if (autoFocus)
      input.current?.focus({
        preventScroll: true,
      });
  }, [autoFocus]);
  useLayoutEffect(() => {
    const r = ring.current;
    const box = boxes.current[active];
    if (r && box) {
      const first = !r.dataset.ready;
      if (first) r.style.transition = "none";
      r.style.width = `${box.offsetWidth}px`;
      r.style.height = `${box.offsetHeight}px`;
      r.style.transform = `translate(${box.offsetLeft}px, ${box.offsetTop}px)`;
      if (first) {
        r.dataset.ready = "1";
        void r.offsetWidth;
        r.style.transition = "";
      }
    }
    const p = pill.current;
    const s = slots.current;
    if (p && s && pillInner.current)
      p.style.width = `${status === "success" ? pillInner.current.offsetWidth : s.offsetWidth}px`;
  });
  useEffect(() => {
    const s = slots.current;
    if (!s) return;
    const ro = new ResizeObserver(() => {
      const r = ring.current;
      const box = boxes.current[active];
      if (r && box) {
        r.style.width = `${box.offsetWidth}px`;
        r.style.height = `${box.offsetHeight}px`;
        r.style.transform = `translate(${box.offsetLeft}px, ${box.offsetTop}px)`;
      }
      if (pill.current && status !== "success") pill.current.style.width = `${s.offsetWidth}px`;
    });
    ro.observe(s);
    return () => ro.disconnect();
  }, [active, status]);
  const prevStatus = useRef(status);
  useEffect(() => {
    const before = prevStatus.current;
    prevStatus.current = status;
    if (status === before) return;
    if (status === "verifying") setAnnounce("Verifying code");
    if (status === "success") setAnnounce(successLabel);
    if (status !== "error") {
      setErrorShown(false);
      return;
    }
    setErrorShown(true);
    setAnnounce(typeof errorMessage === "string" ? errorMessage : "That code didn't work");
    if (!reduced()) {
      slots.current?.animate(
        [
          {
            transform: "none",
          },
          {
            transform: "translateX(-6px)",
          },
          {
            transform: "translateX(5px)",
          },
          {
            transform: "translateX(-3px)",
          },
          {
            transform: "translateX(2px)",
          },
          {
            transform: "none",
          },
        ],
        {
          duration: 420,
          easing: "ease-out",
        },
      );
    }
    if (!clearOnError) return;
    setLocked(true);
    timers.current.push(
      window.setTimeout(() => setClearing(true), 700),
      window.setTimeout(() => {
        setClearing(false);
        setLocked(false);
        commit("", 0, false);
      }, 980),
    );
  }, [status]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  useEffect(() => {
    if (left <= 0) {
      if (onResend && resendIn > 0) setAnnounce("You can resend the code now");
      return;
    }
    const t = window.setTimeout(() => setLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [left]);
  const resend = () => {
    onResend?.();
    setLeft(resendIn);
    setAnnounce("A new code is on its way");
  };
  const cells: ReactNode[] = [];
  for (let i = 0; i < length; i++) {
    if (sepAt > 0 && sepAt < length && i === sepAt)
      cells.push(<span key="sep" className="ui-otpc__sep" />);
    const ch = code[i];
    cells.push(
      <span
        key={i}
        ref={(el) => {
          boxes.current[i] = el;
        }}
        className="ui-otpc__box"
        data-filled={ch ? "" : undefined}
        style={
          {
            "--i": i,
          } as CSSProperties
        }
      >
        {ch && (
          <span
            key={stamps.current[i]}
            className="ui-otpc__char"
            style={{
              animationDelay: `${delays.current[i] ?? 0}ms`,
            }}
          >
            {ch}
          </span>
        )}
      </span>,
    );
  }
  return (
    <div
      className={["ui-otpc", className].filter(Boolean).join(" ")}
      data-status={status}
      data-error={showError || undefined}
      data-align={align}
      data-disabled={disabled || undefined}
    >
      {}
      <style href="ui-otp-input-clean" precedence="default">
        {css}
      </style>

      <div className="ui-otpc__field">
        <div
          ref={slots}
          className="ui-otpc__slots"
          data-clearing={clearing || undefined}
          style={
            {
              "--n": length,
              "--sep-w": sepAt > 0 && sepAt < length ? "calc(var(--ui-otpc-gap) + 8px)" : "0px",
            } as CSSProperties
          }
        >
          {cells}
          <span
            ref={ring}
            className="ui-otpc__ring"
            data-show={showRing || undefined}
            aria-hidden="true"
          >
            <span
              className="ui-otpc__caret"
              data-show={(focused && !code[active] && !readOnly) || undefined}
            />
          </span>
          <span ref={pill} className="ui-otpc__pill" aria-hidden="true">
            <span ref={pillInner} className="ui-otpc__pill-inner">
              <svg viewBox="0 0 24 24" className="ui-otpc__check" aria-hidden="true">
                <path d={icons.check} pathLength={1} />
              </svg>
              {successLabel}
            </span>
          </span>
          <input
            ref={input}
            className="ui-otpc__input"
            type="text"
            value={code}
            inputMode={numeric ? "numeric" : "text"}
            pattern={numeric ? "[0-9]*" : undefined}
            autoComplete="one-time-code"
            autoCapitalize={numeric ? "off" : "characters"}
            autoCorrect="off"
            spellCheck={false}
            enterKeyHint="done"
            aria-label={`${label}, ${length} ${numeric ? "digits" : "characters"}`}
            aria-invalid={showError || undefined}
            aria-describedby={showError ? `${id}-msg` : undefined}
            disabled={disabled}
            readOnly={busy || locked}
            onChange={(e) => onInput(e.currentTarget)}
            onPaste={onPaste}
            onKeyDown={onKeyDown}
            onFocus={() => {
              setFocused(true);
              requestAnimationFrame(syncSelection);
            }}
            onBlur={() => setFocused(false)}
            onPointerUp={(e) => pick(e.clientX)}
            onSelect={(e) => {
              const el = e.currentTarget;
              const want = active < code.length ? [active, active + 1] : [active, active];
              if (el.selectionStart !== want[0] || el.selectionEnd !== want[1]) syncSelection();
            }}
          />
        </div>
      </div>

      {}
      <div className="ui-otpc__msg" data-show={showError || undefined}>
        <div className="ui-otpc__msg-inner">
          <p id={`${id}-msg`} className="ui-otpc__msg-text">
            <svg viewBox="0 0 24 24" className="ui-otpc__alert" aria-hidden="true">
              <path d={icons.alert} />
            </svg>
            <span>{errorMessage}</span>
          </p>
        </div>
      </div>

      {onResend && (
        <div className="ui-otpc__resend" data-hidden={status === "success" || undefined}>
          <span className="ui-otpc__resend-q">Didn't get a code?</span>{" "}
          {left > 0 ? (
            <span key="wait" className="ui-otpc__swap ui-otpc__wait">
              Resend in{"\u00a0"}
              <span className="ui-otpc__time">{clock(left)}</span>
            </span>
          ) : (
            <button
              key="go"
              type="button"
              className="ui-otpc__swap ui-otpc__resend-btn"
              onClick={resend}
              disabled={disabled || busy}
            >
              Resend code
            </button>
          )}
        </div>
      )}

      <span className="ui-otpc__live" aria-live="polite">
        {announce}
      </span>
    </div>
  );
}
const css = `
/* Colors, size and motion as variables – override them on .ui-otpc */
.ui-otpc {
  --ui-otpc-box: 40px;
  --ui-otpc-gap: 8px;
  --ui-otpc-card: #ffffff;
  --ui-otpc-ink: rgba(0, 0, 0, 0.88);
  --ui-otpc-strong: #000000;
  --ui-otpc-text: rgba(0, 0, 0, 0.61);
  --ui-otpc-muted: rgba(0, 0, 0, 0.45);
  --ui-otpc-faint: rgba(0, 0, 0, 0.27);
  --ui-otpc-icon: rgba(0, 0, 0, 0.447);
  --ui-otpc-line: rgba(0, 0, 0, 0.06);
  --ui-otpc-fill: rgba(0, 0, 0, 0.06);
  --ui-otpc-wash: rgba(0, 0, 0, 0.03);
  --ui-otpc-shine: rgba(255, 255, 255, 0.82);
  --ui-otpc-accent: rgba(0, 96, 226, 0.765);
  --ui-otpc-focus: rgba(0, 96, 226, 0.35);
  --ui-otpc-danger: #e5484d;
  --ui-otpc-success: #1a9a52;
  --ui-otpc-danger-tint: rgba(229, 72, 77, 0.08);
  --ui-otpc-success-tint: rgba(26, 154, 82, 0.08);
  /* Strokes are shadows: a 0.5px hairline plus a soft lift */
  --ui-otpc-lift: 0 1px 1px -1px rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --ui-otpc-shadow: 0 0 0 0.5px var(--ui-otpc-line), var(--ui-otpc-lift);
  --ui-otpc-ease: cubic-bezier(0.22, 1, 0.36, 1);
  box-sizing: border-box;
  container-type: inline-size;
  display: grid;
  justify-self: stretch; /* it sizes the boxes from its own width, so it must never shrink to fit them */
  width: 100%;
  font-family: "Inter", "InterVariable", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  font-size: 13px;
  line-height: 20px;
  font-weight: 400;
  color: var(--ui-otpc-ink);
  -webkit-font-smoothing: antialiased;
}
.ui-otpc *, .ui-otpc *::before, .ui-otpc *::after { box-sizing: border-box; }
:where(.ui-otpc) button { margin: 0; padding: 0; border: 0; background: none; font: inherit; color: inherit; cursor: pointer; }
.ui-otpc[data-align="center"] { justify-items: center; text-align: center; }
.ui-otpc[data-disabled] { opacity: 0.55; }

.ui-otpc__field { display: flex; min-width: 0; padding: 3px 0; }
.ui-otpc[data-align="center"] .ui-otpc__field { justify-content: center; }

/* The cells scale down to fit their container (phones at 320px), up to --ui-otpc-box */
.ui-otpc__slots {
  --size: min(var(--ui-otpc-box), calc((100cqi - 6px - (var(--n) - 1) * var(--ui-otpc-gap) - var(--sep-w)) / var(--n)));
  position: relative;
  display: flex;
  align-items: center;
  gap: var(--ui-otpc-gap);
}
/* White cells with the card's hairline shadow */
.ui-otpc__box {
  position: relative;
  display: grid;
  place-items: center;
  flex: none;
  width: var(--size);
  height: calc(var(--size) * 1.1);
  overflow: hidden;
  border-radius: calc(var(--size) * 0.2);
  background: var(--ui-otpc-card);
  box-shadow: var(--ui-otpc-shadow);
  font-size: min(15px, calc(var(--size) * 0.375));
  line-height: 24px;
  font-weight: 500;
  font-variant-numeric: tabular-nums;
  color: var(--ui-otpc-ink);
  transition: box-shadow 220ms ease, background-color 220ms ease, color 220ms ease, transform 380ms var(--ui-otpc-ease), opacity 260ms ease;
}
.ui-otpc__sep { flex: none; width: 8px; height: 1px; border-radius: 1px; background: var(--ui-otpc-faint); transition: opacity 200ms ease; }

/* Digits pop in – a small lift out of a blur, no bounce */
.ui-otpc__char { display: block; animation: ui-otpc-pop 280ms var(--ui-otpc-ease) both; }
.ui-otpc__slots[data-clearing] .ui-otpc__char { animation: ui-otpc-out 240ms ease both; animation-delay: calc((var(--n) - var(--i)) * 22ms) !important; }

/* One blue outline glides from cell to cell; its thin caret blinks softly in an empty cell */
.ui-otpc__ring {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  display: grid;
  place-items: center;
  border-radius: calc(var(--size) * 0.2);
  box-shadow: 0 0 0 0.5px var(--ui-otpc-accent), 0 0 0 2px var(--ui-otpc-focus);
  opacity: 0;
  pointer-events: none;
  transition: transform 260ms var(--ui-otpc-ease), width 260ms var(--ui-otpc-ease), opacity 180ms ease, box-shadow 220ms ease;
}
.ui-otpc__ring[data-show] { opacity: 1; }
.ui-otpc__caret { width: 1px; height: 18px; max-height: 42%; border-radius: 1px; background: var(--ui-otpc-accent); opacity: 0; }
.ui-otpc__caret[data-show] { animation: ui-otpc-blink 1.1s ease-in-out infinite; }

/* The real input lies over the cells, invisible – it takes taps, keys, paste and SMS autofill */
.ui-otpc__input {
  position: absolute;
  inset: 0;
  z-index: 2;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  border: 0;
  outline: none;
  background: transparent;
  color: transparent;
  -webkit-text-fill-color: transparent;
  caret-color: transparent;
  font-size: 16px; /* iOS doesn't zoom into inputs of 16px and up */
  letter-spacing: -1em;
  cursor: text;
  appearance: none;
}
.ui-otpc__input::selection { background: transparent; }
.ui-otpc__input:-webkit-autofill { -webkit-box-shadow: 0 0 0 100px transparent inset; transition: background-color 9999s; }
.ui-otpc__input[readonly], .ui-otpc__input:disabled { cursor: default; }

/* Verifying: the digits turn gray and a lighter band passes over the cells, one after another */
.ui-otpc__box::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(100deg, transparent 20%, var(--ui-otpc-shine) 50%, transparent 80%);
  transform: translateX(-120%);
  opacity: 0;
  pointer-events: none;
}
.ui-otpc[data-status="verifying"] .ui-otpc__box::after { opacity: 1; animation: ui-otpc-shimmer 1.3s ease-in-out infinite; animation-delay: calc(var(--i) * 70ms); }
.ui-otpc[data-status="verifying"] .ui-otpc__box { background: var(--ui-otpc-wash); box-shadow: 0 0 0 0.5px var(--ui-otpc-line); color: var(--ui-otpc-text); }

/* Error: no red strokes – the cells get a faint red fill and the digits turn red */
.ui-otpc[data-error] .ui-otpc__box { background: var(--ui-otpc-danger-tint); color: var(--ui-otpc-danger); }

/* Success: the cells slide together and fade while one frame morphs into the "Verified" chip */
.ui-otpc__pill {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 1;
  display: grid;
  place-items: center;
  height: calc(var(--size) * 1.1);
  overflow: hidden;
  border-radius: calc(var(--size) * 0.2);
  background: var(--ui-otpc-card);
  box-shadow: var(--ui-otpc-shadow);
  opacity: 0;
  transform: translate(-50%, -50%);
  pointer-events: none;
  transition: width 300ms var(--ui-otpc-ease), background-color 300ms ease, opacity 160ms ease 140ms;
}
.ui-otpc__pill-inner {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 0 14px 0 12px;
  font-size: 13px;
  line-height: 20px;
  font-weight: 500;
  white-space: nowrap;
  color: var(--ui-otpc-ink);
  opacity: 0;
  transition: opacity 160ms ease;
}
.ui-otpc__check { width: 16px; height: 16px; flex: none; fill: none; stroke: var(--ui-otpc-success); stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
.ui-otpc__check path { stroke-dasharray: 1; stroke-dashoffset: 1; transition: stroke-dashoffset 120ms ease; }
.ui-otpc[data-status="success"] .ui-otpc__box {
  transform: translateX(calc(((var(--n) - 1) / 2 - var(--i)) * (var(--size) + var(--ui-otpc-gap)))) scale(0.7);
  opacity: 0;
  transition: transform 340ms var(--ui-otpc-ease), opacity 220ms ease 120ms;
}
.ui-otpc[data-status="success"] .ui-otpc__sep { opacity: 0; }
.ui-otpc[data-status="success"] .ui-otpc__pill {
  background: var(--ui-otpc-success-tint);
  opacity: 1;
  transition: width 460ms var(--ui-otpc-ease) 220ms, background-color 300ms ease 300ms, opacity 160ms ease 120ms;
}
.ui-otpc[data-status="success"] .ui-otpc__pill-inner { opacity: 1; transition: opacity 240ms ease 460ms; }
.ui-otpc[data-status="success"] .ui-otpc__check path { stroke-dashoffset: 0; transition: stroke-dashoffset 380ms var(--ui-otpc-ease) 560ms; }

/* The error message grows in below, then folds away */
.ui-otpc__msg { display: grid; grid-template-rows: 0fr; width: 100%; transition: grid-template-rows 300ms var(--ui-otpc-ease); }
.ui-otpc__msg[data-show] { grid-template-rows: 1fr; }
.ui-otpc__msg-inner { min-height: 0; overflow: hidden; }
.ui-otpc__msg-text {
  margin: 0;
  padding-top: 8px;
  font-size: 12px;
  line-height: 16px;
  text-wrap: balance;
  color: var(--ui-otpc-text);
  opacity: 0;
  transform: translateY(-4px);
  transition: opacity 200ms ease, transform 300ms var(--ui-otpc-ease);
}
.ui-otpc__msg[data-show] .ui-otpc__msg-text { opacity: 1; transform: none; transition-delay: 60ms; }
/* The icon sits inline, so a wrapped message stays centered with it */
.ui-otpc__alert { display: inline-block; width: 14px; height: 14px; margin-right: 6px; vertical-align: -3px; fill: none; stroke: var(--ui-otpc-danger); stroke-width: 1.7; stroke-linecap: round; }

/* Resend: a countdown that turns into a tab-style button */
.ui-otpc__resend {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px 8px;
  min-height: 28px;
  margin-top: 12px;
  font-size: 12px;
  line-height: 16px;
  font-variant-numeric: tabular-nums;
  color: var(--ui-otpc-muted);
  transition: opacity 220ms ease;
}
.ui-otpc[data-align="center"] .ui-otpc__resend { justify-content: center; }
.ui-otpc__resend[data-hidden] { opacity: 0; visibility: hidden; transition: opacity 220ms ease, visibility 0s 220ms; }
.ui-otpc__swap { display: inline-block; animation: ui-otpc-in 260ms var(--ui-otpc-ease) both; }
.ui-otpc__wait { color: var(--ui-otpc-text); }
.ui-otpc__time { display: inline-block; min-width: 3.4ch; text-align: left; color: var(--ui-otpc-ink); }
.ui-otpc__resend-btn {
  position: relative;
  padding: 4px 10px;
  border-radius: 6px;
  box-shadow: inset 0 0 0 0.5px var(--ui-otpc-line);
  font-size: 13px;
  line-height: 20px;
  font-weight: 500;
  color: var(--ui-otpc-text);
  transition: background-color 160ms ease, color 160ms ease;
}
.ui-otpc__resend-btn:hover { background: var(--ui-otpc-wash); color: var(--ui-otpc-ink); }
.ui-otpc__resend-btn:active { background: var(--ui-otpc-fill); }
.ui-otpc__resend-btn:focus-visible { outline: 2px solid var(--ui-otpc-focus); outline-offset: 1px; }
.ui-otpc__resend-btn:disabled { color: var(--ui-otpc-faint); background: none; cursor: default; }
.ui-otpc__live { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }

@keyframes ui-otpc-pop { from { opacity: 0; transform: translateY(4px) scale(0.7); filter: blur(3px); } to { opacity: 1; transform: none; filter: none; } }
@keyframes ui-otpc-out { to { opacity: 0; transform: translateY(-4px) scale(0.8); filter: blur(2px); } }
@keyframes ui-otpc-blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
@keyframes ui-otpc-shimmer { 0% { transform: translateX(-120%); } 55%, 100% { transform: translateX(120%); } }
@keyframes ui-otpc-in { from { opacity: 0; transform: translateY(3px); filter: blur(2px); } to { opacity: 1; transform: none; filter: none; } }

/* Narrow containers (phones): tighter gaps, the question before "Resend" drops first */
@container (max-width: 340px) {
  .ui-otpc__slots { --ui-otpc-gap: 6px; }
  .ui-otpc__sep { width: 6px; }
}
@container (max-width: 250px) {
  .ui-otpc__resend-q { display: none; }
}
/* Touch screens: a taller Resend button */
@media (hover: none) and (pointer: coarse) {
  .ui-otpc__resend-btn { padding: 7px 12px; }
}
@media (prefers-reduced-motion: reduce) {
  .ui-otpc *, .ui-otpc *::before, .ui-otpc *::after { animation: none !important; transition: none !important; }
  .ui-otpc__caret[data-show] { opacity: 1; }
}

/* Dark mode: follows a .dark class or data-theme="dark" on any ancestor, e.g. <html> */
:where(.dark, [data-theme="dark"]) .ui-otpc {
  --ui-otpc-card: #1c1c1e;
  --ui-otpc-ink: rgba(255, 255, 255, 0.9);
  --ui-otpc-strong: #ffffff;
  --ui-otpc-text: rgba(255, 255, 255, 0.62);
  --ui-otpc-muted: rgba(255, 255, 255, 0.46);
  --ui-otpc-faint: rgba(255, 255, 255, 0.3);
  --ui-otpc-icon: rgba(255, 255, 255, 0.5);
  --ui-otpc-line: rgba(255, 255, 255, 0.1);
  --ui-otpc-fill: rgba(255, 255, 255, 0.08);
  --ui-otpc-wash: rgba(255, 255, 255, 0.03);
  --ui-otpc-shine: rgba(255, 255, 255, 0.1);
  --ui-otpc-accent: #4d8dff;
  --ui-otpc-focus: rgba(77, 141, 255, 0.5);
  --ui-otpc-danger: #ff6369;
  --ui-otpc-success: #3ec27a;
  --ui-otpc-danger-tint: rgba(255, 99, 105, 0.14);
  --ui-otpc-success-tint: rgba(62, 194, 122, 0.14);
  --ui-otpc-lift: 0 1px 2px 0 rgba(0, 0, 0, 0.4);
}
`;
const demoStyles =
  ".otp-demo{grid-template-columns:minmax(0,400px);place-content:center;width:100%;display:grid}.otp-demo__tray{box-sizing:border-box;-webkit-font-smoothing:antialiased;background:#f0f0f0;border-radius:20px;min-width:0;padding:4px;font-family:Inter,ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,sans-serif}.otp-demo__card{text-align:center;background:#fff;border-radius:16px;justify-items:center;padding:28px 24px 22px;display:grid;box-shadow:0 0 0 1px #ececec,0 1px 2px #0000000a}.otp-demo__icon{color:#8f8f8f;background:#f4f4f5;border-radius:12px;place-items:center;width:44px;height:44px;margin-bottom:14px;display:grid;box-shadow:inset 0 0 0 1px #ececec}.otp-demo__icon svg{fill:none;stroke:currentColor;stroke-width:1.7px;stroke-linecap:round;stroke-linejoin:round;width:22px;height:22px}.otp-demo__title{letter-spacing:-.01em;color:#171717;margin:0;font-size:16px;font-weight:600}.otp-demo__text{color:#8f8f8f;overflow-wrap:anywhere;margin:4px 0 20px;font-size:13.5px}.otp-demo__text strong{color:#404040;font-weight:500}.otp-demo__hint{text-align:center;color:#8f8f8f;margin:0;padding:10px 12px 8px;font-size:12.5px}.otp-demo__hint span{font-variant-numeric:tabular-nums;color:#404040}:where(.dark,[data-theme=dark]) .otp-demo__tray{background:#111113}:where(.dark,[data-theme=dark]) .otp-demo__card{background:#19191b;box-shadow:0 0 0 1px #2a2a2e,0 1px 2px #0003}:where(.dark,[data-theme=dark]) .otp-demo__icon{color:#8b8b92;background:#222225;box-shadow:inset 0 0 0 1px #2a2a2e}:where(.dark,[data-theme=dark]) .otp-demo__title{color:#ededed}:where(.dark,[data-theme=dark]) .otp-demo__text,:where(.dark,[data-theme=dark]) .otp-demo__hint{color:#8b8b92}:where(.dark,[data-theme=dark]) .otp-demo__text strong,:where(.dark,[data-theme=dark]) .otp-demo__hint span{color:#c8c8cc}@media (width<=420px){.otp-demo__card{padding:24px 12px 20px}}.card__preview .otp-demo{grid-template-columns:auto;padding:40px 0 6px;position:absolute;inset:0}.card__preview .otp-demo__tray{zoom:.54;width:400px}.stage:has(.otp-demo){height:480px;padding:48px 32px}@media (width<=760px){.stage:has(.otp-demo){height:460px;padding:52px 12px 16px}}@media (width<=560px){.stage:has(.otp-demo){align-items:start;height:450px;padding-top:126px}}.otp-democ{box-sizing:border-box;-webkit-font-smoothing:antialiased;background:#fff;border-radius:10px;min-width:0;font-family:Inter,InterVariable,ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,sans-serif;overflow:hidden;box-shadow:0 0 0 .5px #0000000f,0 1px 1px -1px #0000001a,0 1px 2px #0000000d}.otp-democ__body{text-align:center;justify-items:center;padding:28px 24px 20px;display:grid}.otp-democ__icon{color:#00000072;background:#fff;border-radius:8px;place-items:center;width:36px;height:36px;margin-bottom:12px;display:grid;box-shadow:0 0 0 .5px #0000000f,0 1px 1px -1px #0000001a,0 1px 2px #0000000d}.otp-democ__icon svg{fill:none;stroke:currentColor;stroke-width:1.1px;stroke-linecap:round;stroke-linejoin:round;width:16px;height:16px}.otp-democ__title{color:#000;margin:0;font-size:15px;font-weight:500;line-height:24px}.otp-democ__text{color:#0000009c;overflow-wrap:anywhere;margin:2px 0 20px;font-size:13px;line-height:20px}.otp-democ__text strong{color:#000000e0;font-weight:500}.otp-democ__hint{text-align:center;color:#00000073;border-top:.5px solid #0000000f;margin:0;padding:10px 16px;font-size:12px;line-height:16px}.otp-democ__hint span{font-variant-numeric:tabular-nums;color:#000000e0}:where(.dark,[data-theme=dark]) .otp-democ,:where(.dark,[data-theme=dark]) .otp-democ__icon{background:#1c1c1e;box-shadow:0 0 0 .5px #ffffff1a,0 1px 2px #0006}:where(.dark,[data-theme=dark]) .otp-democ__icon{color:#ffffff80}:where(.dark,[data-theme=dark]) .otp-democ__title{color:#fff}:where(.dark,[data-theme=dark]) .otp-democ__text{color:#ffffff9e}:where(.dark,[data-theme=dark]) .otp-democ__text strong,:where(.dark,[data-theme=dark]) .otp-democ__hint span{color:#ffffffe6}:where(.dark,[data-theme=dark]) .otp-democ__hint{color:#ffffff75;border-top-color:#ffffff14}@media (width<=420px){.otp-democ__body{padding:24px 12px 20px}}.card__preview .otp-democ{zoom:.56;width:400px}\n";
function OtpInputCleanDemo(props: Record<string, never>) {
  return (
    <>
      <style href="plico-demo-otp-input-clean" precedence="default">
        {demoStyles}
      </style>
      <OtpInputCleanDemo2 {...props} />
    </>
  );
}
export { OtpInput as Component };
export { OtpInputCleanDemo as Demo };
export { OtpInput };
export { OtpInput as OtpInputClean };
export { OtpInputCleanDemo };
export type { OtpInputProps };
export type { OtpStatus };
export default OtpInput;

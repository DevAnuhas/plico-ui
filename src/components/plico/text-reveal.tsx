"use client";

import * as React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import type { CSSProperties } from "react";
function TextRevealDemo2() {
  let [e, t] = React.useState(0);
  return (
    <div className={`text-reveal-demo`}>
      <div className={`text-reveal-demo__copy`} key={e}>
        <TextReveal
          as={`h2`}
          className={`text-reveal-demo__title`}
          text={`Words that arrive one at a time.`}
        />
        <TextReveal
          className={`text-reveal-demo__body`}
          text={`Each word fades in out of a soft blur and rises into place, so a sentence reads like it is being spoken.`}
          delay={260}
          stagger={22}
        />
      </div>
      <button
        type={`button`}
        className={`text-reveal-demo__replay`}
        onClick={() => t((e) => e + 1)}
      >{`Replay`}</button>
    </div>
  );
}
type TextRevealProps = {
  text: string;
  by?: "word" | "char";
  stagger?: number;
  delay?: number;
  duration?: number;
  as?: "p" | "h1" | "h2" | "h3" | "span";
  once?: boolean;
  className?: string;
};
function TextReveal({
  text,
  by = "word",
  stagger = 40,
  delay = 0,
  duration = 700,
  as: Tag = "p",
  once = true,
  className,
}: TextRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return setShown(true);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setShown(true);
            if (once) io.disconnect();
          } else if (!once) {
            setShown(false);
          }
        }
      },
      {
        threshold: 0.3,
      },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once]);
  let i = 0;
  const parts = text.split(/(\s+)/).map((part, k) => {
    if (part === "") return null;
    if (/^\s+$/.test(part)) return part;
    if (by === "word") {
      return (
        <span
          key={k}
          className="ui-trv__p"
          style={
            {
              "--ui-trv-i": i++,
            } as CSSProperties
          }
        >
          {part}
        </span>
      );
    }
    return (
      <span key={k} className="ui-trv__w">
        {Array.from(part).map((ch, c) => (
          <span
            key={c}
            className="ui-trv__p"
            style={
              {
                "--ui-trv-i": i++,
              } as CSSProperties
            }
          >
            {ch}
          </span>
        ))}
      </span>
    );
  });
  return (
    <Tag
      ref={ref as never}
      className={["ui-trv", className].filter(Boolean).join(" ")}
      data-shown={shown ? "" : undefined}
      style={
        {
          "--ui-trv-stagger": `${stagger}ms`,
          "--ui-trv-delay": `${delay}ms`,
          "--ui-trv-duration": `${duration}ms`,
        } as CSSProperties
      }
    >
      {}
      <style href="ui-text-reveal" precedence="default">
        {css}
      </style>
      <span className="ui-trv__sr">{text}</span>
      <span aria-hidden="true">{parts}</span>
    </Tag>
  );
}
const css = `
.ui-trv {
  --ui-trv-blur: 8px;
  --ui-trv-rise: 0.35em;
  --ui-trv-ease: cubic-bezier(0.2, 0.7, 0.2, 1);
}
.ui-trv__sr {
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
.ui-trv__w {
  display: inline-block;
  white-space: nowrap;
}
.ui-trv__p {
  display: inline-block;
  opacity: 0;
  filter: blur(var(--ui-trv-blur));
  transform: translateY(var(--ui-trv-rise));
  will-change: opacity, filter, transform;
}
.ui-trv[data-shown] .ui-trv__p {
  animation: ui-trv-in var(--ui-trv-duration) var(--ui-trv-ease) both;
  animation-delay: calc(var(--ui-trv-delay) + var(--ui-trv-i) * var(--ui-trv-stagger));
}
@keyframes ui-trv-in {
  from {
    opacity: 0;
    filter: blur(var(--ui-trv-blur));
    transform: translateY(var(--ui-trv-rise));
  }
  to {
    opacity: 1;
    filter: blur(0);
    transform: none;
  }
}

/* Reduced motion: the text is simply there */
@media (prefers-reduced-motion: reduce) {
  .ui-trv .ui-trv__p,
  .ui-trv[data-shown] .ui-trv__p {
    opacity: 1;
    filter: none;
    transform: none;
    animation: none;
  }
}

/* Dark mode: follows a .dark class or data-theme="dark" on any ancestor, e.g. <html>.
   The text takes its color from the parent, so only the blur softens a touch on dark backgrounds */
:where(.dark, [data-theme="dark"]) .ui-trv {
  --ui-trv-blur: 6px;
}
`;
const demoStyles =
  ".text-reveal-demo{text-align:center;justify-items:center;gap:28px;width:100%;font-family:Inter,system-ui,sans-serif;display:grid}.text-reveal-demo__copy{gap:14px;max-width:460px;display:grid}.text-reveal-demo__title{letter-spacing:-.03em;color:#171717;text-wrap:balance;margin:0;font-size:clamp(30px,5vw,44px);font-weight:600;line-height:1.1}.text-reveal-demo__body{color:#8f8f8f;text-wrap:pretty;margin:0;font-size:16px;line-height:1.55}.text-reveal-demo__replay{color:#171717;cursor:pointer;background:#fff;border:0;border-radius:9px;height:30px;padding:0 12px;font:500 12.5px/1 Inter,system-ui,sans-serif;box-shadow:0 0 0 1px #e5e5e5}.text-reveal-demo__replay:hover{background:#fafafa}.card__preview .text-reveal-demo{place-content:center;padding:0 28px;position:absolute;inset:0}.card__preview .text-reveal-demo__copy{gap:8px;max-width:280px}.card__preview .text-reveal-demo__title{font-size:24px}.card__preview .text-reveal-demo__body{font-size:12.5px}.card__preview .text-reveal-demo__replay{display:none}:where(.dark,[data-theme=dark]) .text-reveal-demo__title{color:#ededed}:where(.dark,[data-theme=dark]) .text-reveal-demo__replay{color:#ededed;background:#232326;box-shadow:0 0 0 1px #ffffff14}:where(.dark,[data-theme=dark]) .text-reveal-demo__replay:hover{background:#2a2a2e}\n";
function TextRevealDemo(props: Record<string, never>) {
  return (
    <>
      <style href="plico-demo-text-reveal" precedence="default">
        {demoStyles}
      </style>
      <TextRevealDemo2 {...props} />
    </>
  );
}
export { TextReveal as Component };
export { TextRevealDemo as Demo };
export { TextReveal };
export { TextRevealDemo };
export type { TextRevealProps };
export default TextReveal;

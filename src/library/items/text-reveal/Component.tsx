/*
MIT License

Copyright (c) 2026 Florian Höller (adfects)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
export type TextRevealProps = {
  text: string;
  by?: "word" | "char";
  stagger?: number;
  delay?: number;
  duration?: number;
  as?: "p" | "h1" | "h2" | "h3" | "span";
  once?: boolean;
  className?: string;
};
export function TextReveal({
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

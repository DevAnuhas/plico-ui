"use client";
import * as React from "react";
import { PlicoDemo_s as PublicDemo } from "../../modules/demo-S1hMjDCH.jsx";
export { GridBackground as Component } from "./Component";
export { GridBackground as GridBackground } from "./Component";
const demoStyles =
  ".grid-background-demo{-webkit-font-smoothing:antialiased;width:100%;font-family:Inter,ui-sans-serif,system-ui,-apple-system,sans-serif}.grid-background-demo__panel{background:#fff;border-radius:20px;height:360px;box-shadow:inset 0 0 0 1px #e5e5e5,0 1px 2px #0000000a}.grid-background-demo__inner{text-align:center;flex-direction:column;justify-content:center;align-items:center;height:100%;padding:24px;display:flex}.grid-background-demo__pill{color:#171717;background:#fff;border-radius:999px;padding:4px 11px;font-size:12px;font-weight:500;line-height:16px;box-shadow:inset 0 0 0 1px #e5e5e5,0 1px 2px #0000000a}.grid-background-demo__title{letter-spacing:-.03em;color:#171717;text-wrap:balance;margin:16px 0 0;font-size:32px;font-weight:600;line-height:1.15}.grid-background-demo__sub{color:#8f8f8f;text-wrap:balance;max-width:340px;margin:10px 0 0;font-size:15px;line-height:1.5}@media (width<=520px){.grid-background-demo__title{font-size:26px}}.card__preview .grid-background-demo{position:absolute;inset:0}.card__preview .grid-background-demo__panel{height:100%;box-shadow:none;background:0 0;border-radius:0}.card__preview .grid-background-demo__inner{zoom:.78}:where(.dark,[data-theme=dark]) .grid-background-demo__panel{background:#1a1a1c;box-shadow:inset 0 0 0 1px #ffffff14}:where(.dark,[data-theme=dark]) .card__preview .grid-background-demo__panel{box-shadow:none;background:0 0}:where(.dark,[data-theme=dark]) .grid-background-demo__pill{color:#ededed;background:#232326;box-shadow:inset 0 0 0 1px #ffffff14}:where(.dark,[data-theme=dark]) .grid-background-demo__title{color:#ededed}\n";
export function Demo(props) {
  return (
    <>
      <style href="plico-demo-grid-background" precedence="default">
        {demoStyles}
      </style>
      <PublicDemo {...props} />
    </>
  );
}
export { Demo as GridBackgroundDemo };
export default Demo;

export * from "./Component";

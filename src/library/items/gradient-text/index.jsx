"use client";
import * as React from "react";
import { PlicoDemo_o as PublicDemo } from "../../modules/demo-BZms21rB.jsx";
export { PlicoCore_i as Component } from "../../modules/demo-BZms21rB.jsx";
export { PlicoCore_i as GradientText } from "../../modules/demo-BZms21rB.jsx";
const demoStyles =
  ".gradient-text-demo{text-align:center;justify-items:center;gap:28px;width:100%;font-family:Inter,system-ui,sans-serif;display:grid}.gradient-text-demo__title{letter-spacing:-.035em;color:#171717;text-wrap:balance;max-width:12em;margin:0;font-size:clamp(34px,6vw,56px);font-weight:600;line-height:1.08}.gradient-text-demo__replay{color:#171717;cursor:pointer;background:#fff;border:0;border-radius:9px;height:30px;padding:0 12px;font:500 12.5px/1 Inter,system-ui,sans-serif;box-shadow:0 0 0 1px #e5e5e5}.gradient-text-demo__replay:hover{background:#fafafa}.card__preview .gradient-text-demo{place-content:center;padding:0 24px;position:absolute;inset:0}.card__preview .gradient-text-demo__title{font-size:30px}.card__preview .gradient-text-demo__replay{display:none}:where(.dark,[data-theme=dark]) .gradient-text-demo__title{color:#ededed}:where(.dark,[data-theme=dark]) .gradient-text-demo__replay{color:#ededed;background:#232326;box-shadow:0 0 0 1px #ffffff14}:where(.dark,[data-theme=dark]) .gradient-text-demo__replay:hover{background:#2a2a2e}\n";
export function Demo(props) {
  return (
    <>
      <style href="plico-demo-gradient-text" precedence="default">
        {demoStyles}
      </style>
      <PublicDemo {...props} />
    </>
  );
}
export { Demo as GradientTextDemo };
export default Demo;

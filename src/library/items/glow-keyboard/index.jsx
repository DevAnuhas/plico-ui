"use client";
import * as React from "react";
import { PlicoDemo_S as PublicDemo } from "../../modules/demo-BrYW73Cf.jsx";
export { PlicoCore_y as Component } from "../../modules/demo-BrYW73Cf.jsx";
export { PlicoCore_y as GlowKeyboard } from "../../modules/demo-BrYW73Cf.jsx";
const demoStyles =
  ".glow-keyboard-demo{width:100%}.stage .glow-keyboard-demo,.card__preview .glow-keyboard-demo{position:absolute;inset:0;overflow:hidden;container-type:size}.stage .glow-keyboard-demo .ui-gk,.card__preview .glow-keyboard-demo .ui-gk{width:max(100cqw,183.333cqh);position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)}@media (width<=640px){.stage:has(.glow-keyboard-demo){height:280px;min-height:0}}\n";
export function Demo(props) {
  return (
    <>
      <style href="plico-demo-glow-keyboard" precedence="default">
        {demoStyles}
      </style>
      <PublicDemo {...props} />
    </>
  );
}
export { Demo as GlowKeyboardDemo };
export default Demo;

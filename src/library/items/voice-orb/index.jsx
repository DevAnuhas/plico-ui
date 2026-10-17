"use client";
import * as React from "react";
import { PlicoDemo_p as PublicDemo } from "../../modules/demo-C5SE4pL3.jsx";
export { PlicoCore_u as Component } from "../../modules/demo-C5SE4pL3.jsx";
export { PlicoCore_u as VoiceOrb } from "../../modules/demo-C5SE4pL3.jsx";
const demoStyles =
  ".vo-demo{justify-items:center;gap:22px;width:100%;display:grid}.card__preview .vo-demo{align-content:center;position:absolute;inset:34px 0 0}.card__preview .vo-demo__states{display:none}.card__preview .vo-demo .ui-vo{zoom:.72}.stage:has(.vo-demo){height:480px}@media (width<=760px){.vo-demo__states button{height:28px;padding:0 8px;font-size:12px}.stage:has(.vo-demo){height:520px;padding:120px 16px 24px}}\n";
export function Demo(props) {
  return (
    <>
      <style href="plico-demo-voice-orb" precedence="default">
        {demoStyles}
      </style>
      <PublicDemo {...props} />
    </>
  );
}
export { Demo as VoiceOrbDemo };
export default Demo;

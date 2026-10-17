"use client";
import * as React from "react";
import { PlicoDemo_fe as PublicDemo } from "../../modules/demo-DZle1gG8.jsx";
export { PlicoCore_le as Component } from "../../modules/demo-DZle1gG8.jsx";
export { PlicoCore_le as MemoryPanel } from "../../modules/demo-DZle1gG8.jsx";
const demoStyles =
  ".mp-demo{grid-template-columns:min(380px,100%);place-content:start center;width:100%;height:560px;display:grid}.card__preview .mp-demo{grid-template-columns:auto;height:auto;position:absolute;inset:44px 0 0}.card__preview .mp-demo .ui-mp{zoom:.5;width:380px;max-width:none}.stage:has(.mp-demo){height:660px}@media (width<=760px){.mp-demo{height:auto}.mp-demo .ui-mp{--ui-mp-max:260px!important}.stage:has(.mp-demo){align-items:start;height:780px;padding:120px 16px 24px}}.mp-demo:has(.ui-mpc){grid-template-columns:min(400px,100%);height:590px}.stage .mp-demo .ui-mpc{--ui-mpc-max:300px!important}.card__preview .mp-demo:has(.ui-mpc){grid-template-columns:auto;height:auto}.card__preview .mp-demo .ui-mpc{zoom:.5;width:400px;max-width:none}@media (width<=760px){.mp-demo:has(.ui-mpc){height:auto}.stage .mp-demo .ui-mpc{--ui-mpc-max:260px!important}}\n";
export function Demo(props) {
  return (
    <>
      <style href="plico-demo-memory-panel" precedence="default">
        {demoStyles}
      </style>
      <PublicDemo {...props} />
    </>
  );
}
export { Demo as MemoryPanelDemo };
export default Demo;

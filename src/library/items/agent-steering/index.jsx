"use client";
import * as React from "react";
import { PlicoDemo_O as PublicDemo } from "../../modules/demo-BIClVWrb.jsx";
export { PlicoCore_x as Component } from "../../modules/demo-BIClVWrb.jsx";
export { PlicoCore_x as AgentSteering } from "../../modules/demo-BIClVWrb.jsx";
const demoStyles =
  ".steer-demo{grid-template-columns:minmax(0,460px);justify-content:center;width:100%;display:grid}.card__preview .steer-demo{grid-template-columns:auto;align-content:start;padding:42px 16px 0;position:absolute;inset:0}.card__preview .steer-demo :is(.ui-st,.ui-stc){zoom:.47;width:460px;max-width:none}.card__preview .steer-demo .ui-st{zoom:.44}.card__preview .steer-demo :is(.ui-st__hint,.ui-stc__hint){display:none}.stage:has(.steer-demo){height:600px}.stage .steer-demo{align-self:start;margin-top:64px}.stage .steer-demo .ui-stc{zoom:1.1}@media (width<=760px){.stage:has(.steer-demo){height:680px;padding-left:12px;padding-right:12px}.stage .steer-demo{margin-top:72px}.stage .steer-demo .ui-stc{zoom:1}}\n";
export function Demo(props) {
  return (
    <>
      <style href="plico-demo-agent-steering" precedence="default">
        {demoStyles}
      </style>
      <PublicDemo {...props} />
    </>
  );
}
export { Demo as AgentSteeringDemo };
export default Demo;

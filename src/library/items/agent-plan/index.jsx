"use client";
import * as React from "react";
import { PlicoDemo_c as PublicDemo } from "../../modules/demo-Dhxw29y6.jsx";
export { PlicoCore_d as Component } from "../../modules/component-XY52GlKn.jsx";
export { PlicoCore_d as AgentPlan } from "../../modules/component-XY52GlKn.jsx";
const demoStyles =
  ".pl-demo{grid-template-columns:minmax(0,440px);justify-content:center;width:100%;display:grid}.card__preview .pl-demo{grid-template-columns:auto;align-content:start;padding:38px 16px 0;position:absolute;inset:0}.card__preview .pl-demo .ui-pl{zoom:.6;width:440px;max-width:none}.card__preview .pl-demo .ui-pl__add,.card__preview .pl-demo .ui-pl__hint,.card__preview .pl-demo .ui-pl__sub{display:none}.stage:has(.pl-demo){height:620px}.stage .pl-demo{align-self:start;margin-top:56px}@media (width<=760px){.stage:has(.pl-demo){height:770px;padding-left:12px;padding-right:12px}.stage .pl-demo{margin-top:70px}}.card__preview .pl-demo .ui-plc{zoom:.6;width:440px;max-width:none}.card__preview .pl-demo .ui-plc__add,.card__preview .pl-demo .ui-plc__hint,.card__preview .pl-demo .ui-plc__sub{display:none}\n";
export function Demo(props) {
  return (
    <>
      <style href="plico-demo-agent-plan" precedence="default">
        {demoStyles}
      </style>
      <PublicDemo {...props} />
    </>
  );
}
export { Demo as AgentPlanDemo };
export default Demo;

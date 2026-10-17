"use client";
import * as React from "react";
import { PlicoDemo_p as PublicDemo } from "../../modules/demo.clean-Ca5XH5pf.jsx";
export { PlicoCore_i as Component } from "../../modules/demo.clean-Ca5XH5pf.jsx";
export { PlicoCore_i as SetupGuideClean } from "../../modules/demo.clean-Ca5XH5pf.jsx";
const demoStyles =
  ".setup-demo{grid-template-columns:minmax(0,1fr);place-items:center;width:100%;display:grid}.card__preview .setup-demo{position:absolute;inset:0}.card__preview .setup-demo .ui-sg{zoom:.56}.stage .setup-demo{align-self:start;margin-top:40px}@media (width<=760px){.stage .setup-demo{margin-top:8px}}.card__preview .setup-demo .ui-sgc{zoom:.56}\n";
export function Demo(props) {
  return (
    <>
      <style href="plico-demo-setup-guide-clean" precedence="default">
        {demoStyles}
      </style>
      <PublicDemo {...props} />
    </>
  );
}
export { Demo as SetupGuideCleanDemo };
export default Demo;

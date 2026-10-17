"use client";
import * as React from "react";
import { PlicoDemo_m as PublicDemo } from "../../modules/demo.clean-BdfQ2LZR.jsx";
export { PlicoCore_o as Component } from "../../modules/demo.clean-BdfQ2LZR.jsx";
export { PlicoCore_o as KpiChartClean } from "../../modules/demo.clean-BdfQ2LZR.jsx";
const demoStyles =
  ".kpi-demo{grid-template-columns:minmax(0,1fr);place-items:center;width:100%;display:grid}.kpi-demo .ui-kpi{width:440px;max-width:100%}.card__preview .kpi-demo{position:absolute;inset:0}.card__preview .kpi-demo .ui-kpi{zoom:.62;max-width:none}.kpi-demo .ui-kpic{width:440px;max-width:100%}.card__preview .kpi-demo:has(.ui-kpic){inset:40px 0 0}.card__preview .kpi-demo .ui-kpic{zoom:.54;max-width:none}\n";
export function Demo(props) {
  return (
    <>
      <style href="plico-demo-kpi-chart-clean" precedence="default">
        {demoStyles}
      </style>
      <PublicDemo {...props} />
    </>
  );
}
export { Demo as KpiChartCleanDemo };
export default Demo;

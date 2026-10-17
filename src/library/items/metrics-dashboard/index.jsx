"use client";
import * as React from "react";
import { PlicoDemo_x as PublicDemo } from "../../modules/demo-2EA4yYHc.jsx";
export { PlicoCore__ as Component } from "../../modules/demo-2EA4yYHc.jsx";
export { PlicoCore__ as MetricsDashboard } from "../../modules/demo-2EA4yYHc.jsx";
const demoStyles =
  ".metrics-demo{align-self:stretch;width:100%;min-width:0;padding:20px 16px}.metrics-demo[data-fit=stage]{justify-items:center;padding:32px 0;display:grid}.card__preview .metrics-demo{padding:0;position:absolute;inset:0;overflow:hidden;-webkit-mask-image:linear-gradient(#000 72%,#0000);mask-image:linear-gradient(#000 72%,#0000)}.metrics-demo[data-fit=card] .metrics-demo__frame{transform-origin:0 0;position:absolute;top:40px;left:24px}.metrics-demo__frame{min-width:0}\n";
export function Demo(props) {
  return (
    <>
      <style href="plico-demo-metrics-dashboard" precedence="default">
        {demoStyles}
      </style>
      <PublicDemo {...props} />
    </>
  );
}
export { Demo as MetricsDashboardDemo };
export default Demo;

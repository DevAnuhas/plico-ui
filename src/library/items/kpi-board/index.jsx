"use client";
import * as React from "react";
import { PlicoDemo_E as PublicDemo } from "../../modules/demo-CawsKXt1.jsx";
export { PlicoCore_re as Component } from "../../modules/demo-CawsKXt1.jsx";
export { PlicoCore_re as KpiBoard } from "../../modules/demo-CawsKXt1.jsx";
const demoStyles =
  ".kb-demo{align-self:stretch;width:100%;min-width:0;padding:20px 16px}.kb-demo[data-fit=stage]{justify-items:center;padding:36px 0;display:grid}.card__preview .kb-demo{padding:0;position:absolute;inset:0;overflow:hidden;-webkit-mask-image:linear-gradient(#000 72%,#0000);mask-image:linear-gradient(#000 72%,#0000)}.kb-demo[data-fit=card] .kb-demo__frame{transform-origin:0 0;position:absolute;top:40px;left:24px}.kb-demo__frame{min-width:0}@media (width<=760px){.kb-demo{padding-top:96px}}\n";
export function Demo(props) {
  return (
    <>
      <style href="plico-demo-kpi-board" precedence="default">
        {demoStyles}
      </style>
      <PublicDemo {...props} />
    </>
  );
}
export { Demo as KpiBoardDemo };
export default Demo;

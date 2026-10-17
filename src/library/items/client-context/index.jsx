"use client";
import * as React from "react";
import { PlicoDemo_ve as PublicDemo } from "../../modules/demo-D9Vw9aDF.jsx";
export { PlicoCore_u as Component } from "../../modules/demo-D9Vw9aDF.jsx";
export { PlicoCore_u as ClientContext } from "../../modules/demo-D9Vw9aDF.jsx";
const demoStyles =
  ".context-demo{align-self:stretch;width:100%;min-width:0;padding:20px 16px}.context-demo[data-fit=stage]{justify-items:center;padding:32px 0;display:grid}.card__preview .context-demo{padding:0;position:absolute;inset:0;overflow:hidden;-webkit-mask-image:linear-gradient(#000 72%,#0000);mask-image:linear-gradient(#000 72%,#0000)}.context-demo[data-fit=card] .context-demo__frame{transform-origin:0 0;position:absolute;top:40px;left:24px}.context-demo__frame{min-width:0}\n";
export function Demo(props) {
  return (
    <>
      <style href="plico-demo-client-context" precedence="default">
        {demoStyles}
      </style>
      <PublicDemo {...props} />
    </>
  );
}
export { Demo as ClientContextDemo };
export default Demo;

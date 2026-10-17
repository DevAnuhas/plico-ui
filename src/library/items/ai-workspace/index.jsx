"use client";
import * as React from "react";
import { PlicoDemo_m as PublicDemo } from "../../modules/demo-158Rlrkj.jsx";
export { PlicoCore_s as Component } from "../../modules/demo-158Rlrkj.jsx";
export { PlicoCore_s as AiWorkspace } from "../../modules/demo-158Rlrkj.jsx";
const demoStyles =
  ".workspace-demo{align-self:stretch;width:100%;min-width:0;padding:20px 16px}.workspace-demo__frame{min-width:0}.workspace-demo[data-fit=stage]{justify-items:center;padding:32px 0;display:grid}.card__preview .workspace-demo{padding:0;position:absolute;inset:0;overflow:hidden;-webkit-mask-image:linear-gradient(#000 74%,#0000);mask-image:linear-gradient(#000 74%,#0000)}.workspace-demo[data-fit=card] .workspace-demo__frame{transform-origin:0 0;position:absolute;top:44px;left:24px}\n";
export function Demo(props) {
  return (
    <>
      <style href="plico-demo-ai-workspace" precedence="default">
        {demoStyles}
      </style>
      <PublicDemo {...props} />
    </>
  );
}
export { Demo as AiWorkspaceDemo };
export default Demo;

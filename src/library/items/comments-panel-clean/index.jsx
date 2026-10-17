"use client";
import * as React from "react";
import { PlicoDemo_h as PublicDemo } from "../../modules/demo.clean-kKXDAKEK.jsx";
export { PlicoCore_s as Component } from "../../modules/demo.clean-kKXDAKEK.jsx";
export { PlicoCore_s as CommentsPanelClean } from "../../modules/demo.clean-kKXDAKEK.jsx";
const demoStyles =
  ".comments-demo{grid-template-columns:minmax(0,400px);place-content:center;width:100%;display:grid}.stage .comments-demo .ui-cp{--ui-cp-max-height:260px}@media (width<=760px){.stage .comments-demo .ui-cp{--ui-cp-max-height:170px}}.card__preview .comments-demo{grid-template-columns:auto;position:absolute;inset:0}.card__preview .comments-demo .ui-cp{--ui-cp-max-height:220px;zoom:.5;width:400px;max-width:none}.stage .comments-demo .ui-cpc{--ui-cpc-max-height:260px}@media (width<=760px){.stage .comments-demo .ui-cpc{--ui-cpc-max-height:170px}}.card__preview .comments-demo:has(.ui-cpc){inset:40px 0 0}.card__preview .comments-demo .ui-cpc{--ui-cpc-max-height:220px;zoom:.46;width:400px;max-width:none}\n";
export function Demo(props) {
  return (
    <>
      <style href="plico-demo-comments-panel-clean" precedence="default">
        {demoStyles}
      </style>
      <PublicDemo {...props} />
    </>
  );
}
export { Demo as CommentsPanelCleanDemo };
export default Demo;

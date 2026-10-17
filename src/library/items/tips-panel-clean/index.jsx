"use client";
import * as React from "react";
import { PlicoDemo_u as PublicDemo } from "../../modules/demo.clean-Bfu_rP8L.jsx";
export { TipsPanel as Component } from "./Component";
export { TipsPanel as TipsPanelClean } from "./Component";
const demoStyles =
  ".tips-demo{grid-template-columns:minmax(0,720px);place-content:center;width:100%;display:grid}.tips-demo .ui-tp{transition:opacity .26s,transform .32s cubic-bezier(.22,1,.36,1)}.stage .tips-demo .ui-tp{--ui-tp-max-height:310px}@media (width<=760px){.stage .tips-demo .ui-tp{--ui-tp-max-height:236px}}.tips-demo[data-closing] .ui-tp{opacity:0;transform:scale(.98)}.card__preview .tips-demo{grid-template-columns:auto;position:absolute;inset:0}.card__preview .tips-demo .ui-tp{--ui-tp-max-height:270px;zoom:var(--fit,.4);width:720px;max-width:none}.tips-demo .ui-tpc{transition:opacity .26s,transform .32s cubic-bezier(.22,1,.36,1)}.stage .tips-demo .ui-tpc{--ui-tpc-max-height:330px}@media (width<=760px){.stage .tips-demo .ui-tpc{--ui-tpc-max-height:256px}}.tips-demo[data-closing] .ui-tpc{opacity:0;transform:scale(.98)}.card__preview .tips-demo .ui-tpc{--ui-tpc-max-height:290px;zoom:var(--fit,.4);width:720px;max-width:none}\n";
export function Demo(props) {
  return (
    <>
      <style href="plico-demo-tips-panel-clean" precedence="default">
        {demoStyles}
      </style>
      <PublicDemo {...props} />
    </>
  );
}
export { Demo as TipsPanelCleanDemo };
export default Demo;

export * from "./Component";

"use client";
import * as React from "react";
import { PlicoDemo_S as PublicDemo } from "../../modules/demo-B8j58gGW.jsx";
export { PlicoCore_v as Component } from "../../modules/demo-B8j58gGW.jsx";
export { PlicoCore_v as PromptLibrary } from "../../modules/demo-B8j58gGW.jsx";
const demoStyles =
  ".pli-demo{grid-template-columns:min(620px,100%);place-content:start center;width:100%;height:340px;display:grid}.card__preview .pli-demo{grid-template-columns:auto;height:auto;position:absolute;inset:44px 0 0}.card__preview .pli-demo .ui-pli{zoom:.56;width:620px;max-width:none}.stage:has(.pli-demo){height:480px}@media (width<=760px){.pli-demo{height:auto}.stage:has(.pli-demo){align-items:start;height:820px;padding:120px 16px 24px}}.card__preview .pli-demo .ui-plic{zoom:.56;width:556px;max-width:none}\n";
export function Demo(props) {
  return (
    <>
      <style href="plico-demo-prompt-library" precedence="default">
        {demoStyles}
      </style>
      <PublicDemo {...props} />
    </>
  );
}
export { Demo as PromptLibraryDemo };
export default Demo;

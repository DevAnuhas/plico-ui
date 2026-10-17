"use client";
import * as React from "react";
import { PlicoDemo_h as PublicDemo } from "../../modules/demo-D4OBH9QL.jsx";
export { PlicoCore_f as Component } from "../../modules/demo-D4OBH9QL.jsx";
export { PlicoCore_f as ProjectCard } from "../../modules/demo-D4OBH9QL.jsx";
const demoStyles =
  ".pc-demo{grid-template-columns:min(320px,100%);place-content:start center;width:100%;height:300px;display:grid}.card__preview .pc-demo{grid-template-columns:auto;height:auto;position:absolute;inset:50px 0 0}.card__preview .pc-demo .ui-pc{zoom:.55;width:320px;max-width:none}.stage:has(.pc-demo){height:480px}@media (width<=760px){.pc-demo{height:auto}.stage:has(.pc-demo){align-items:start;height:560px;padding:120px 16px 24px}}.card__preview .pc-demo .ui-pcc{zoom:.55;width:320px;max-width:none}\n";
export function Demo(props) {
  return (
    <>
      <style href="plico-demo-project-card" precedence="default">
        {demoStyles}
      </style>
      <PublicDemo {...props} />
    </>
  );
}
export { Demo as ProjectCardDemo };
export default Demo;

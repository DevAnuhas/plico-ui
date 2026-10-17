"use client";
import * as React from "react";
import { PlicoDemo_v as PublicDemo } from "../../modules/demo.clean--VSPSi3o.jsx";
export { PlicoCore_u as Component } from "../../modules/demo.clean--VSPSi3o.jsx";
export { PlicoCore_u as InlineDiffClean } from "../../modules/demo.clean--VSPSi3o.jsx";
const demoStyles =
  ".df-demo{grid-template-columns:minmax(0,520px);place-content:center;width:100%;font-family:Inter,ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,sans-serif;display:grid}.card__preview .df-demo{grid-template-columns:auto;place-content:start center;padding:42px 0 0;position:absolute;inset:0}.card__preview .df-demo .ui-df{zoom:.7;width:500px;max-width:none}.stage:has(.df-demo){height:440px}.stage .df-demo{align-self:start;margin-top:96px}@media (width<=760px){.stage:has(.df-demo){height:500px;padding-left:16px;padding-right:16px}.stage .df-demo{margin-top:70px}}:where(.dark,[data-theme=dark]) .df-demo{--lightningcss-light: ;--lightningcss-dark:initial;color-scheme:dark}.stage .df-demo .ui-dfc{zoom:1.15}.card__preview .df-demo .ui-dfc{zoom:.68;width:460px;max-width:none}\n";
export function Demo(props) {
  return (
    <>
      <style href="plico-demo-inline-diff-clean" precedence="default">
        {demoStyles}
      </style>
      <PublicDemo {...props} />
    </>
  );
}
export { Demo as InlineDiffCleanDemo };
export default Demo;

export { PlicoApi_diffWords as diffWords } from "../../modules/demo.clean--VSPSi3o.jsx";

"use client";
import * as React from "react";
import { PlicoDemo_l as PublicDemo } from "../../modules/demo.clean-Djfm83dS.jsx";
export { FilterMenu as Component } from "./Component";
export { FilterMenu as FilterMenuClean } from "./Component";
const demoStyles =
  ".filter-menu-demo{grid-template-columns:minmax(0,1fr);place-items:center;width:100%;display:grid}.card__preview .filter-menu-demo{align-items:start;padding-top:40px;position:absolute;inset:0;overflow:hidden;-webkit-mask-image:linear-gradient(#000 70%,#0000);mask-image:linear-gradient(#000 70%,#0000)}.card__preview .filter-menu-demo .ui-fm{zoom:.6}.card__preview .filter-menu-demo .ui-fmc{zoom:.7}.stage .filter-menu-demo .ui-fmc{zoom:1.1;width:400px;max-width:100%}\n";
export function Demo(props) {
  return (
    <>
      <style href="plico-demo-filter-menu-clean" precedence="default">
        {demoStyles}
      </style>
      <PublicDemo {...props} />
    </>
  );
}
export { Demo as FilterMenuCleanDemo };
export default Demo;

export * from "./Component";

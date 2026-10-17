"use client";
import * as React from "react";
import { PlicoDemo_l as PublicDemo } from "../../modules/demo-ClUxDNiT.jsx";
export { SideFolder as Component } from "./Component";
export { SideFolder as SideFolder } from "./Component";
const demoStyles =
  ".side-folder-demo{width:100%}.stage .side-folder-demo{width:min(100%,560px)}.card__preview .side-folder-demo{place-items:center;width:auto;display:grid;position:absolute;inset:0}.card__preview .side-folder-demo .ui-sf{width:auto;height:100%}\n";
export function Demo(props) {
  return (
    <>
      <style href="plico-demo-side-folder" precedence="default">
        {demoStyles}
      </style>
      <PublicDemo {...props} />
    </>
  );
}
export { Demo as SideFolderDemo };
export default Demo;

export * from "./Component";

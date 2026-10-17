"use client";
import * as React from "react";
import { PlicoDemo_T as PublicDemo } from "../../modules/demo-CmYYw1tl.jsx";
export { RegionDach as Component } from "./Component";
export { RegionDach as RegionDach } from "./Component";
const demoStyles =
  ".region-dach-demo{width:100%}.stage .region-dach-demo{width:min(100%,560px)}.card__preview .region-dach-demo{place-items:center;width:auto;display:grid;position:absolute;inset:0}.card__preview .region-dach-demo .ui-rd{width:auto;height:92%}.card__preview .region-dach-demo .ui-rd-switch{top:26px}\n";
export function Demo(props) {
  return (
    <>
      <style href="plico-demo-region-dach" precedence="default">
        {demoStyles}
      </style>
      <PublicDemo {...props} />
    </>
  );
}
export { Demo as RegionDachDemo };
export default Demo;

export * from "./Component";

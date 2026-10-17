"use client";
import * as React from "react";
import { PlicoDemo_m as PublicDemo } from "../../modules/demo-KQRMxKWn.jsx";
export { LayerStack as Component } from "./Component";
export { LayerStack as LayerStack } from "./Component";
const demoStyles =
  ".layer-stack-demo{width:100%}.stage .layer-stack-demo{width:min(100%,560px)}.card__preview .layer-stack-demo{place-items:center;width:auto;display:grid;position:absolute;inset:0}.card__preview .layer-stack-demo .ui-lyr{width:auto;height:100%}\n";
export function Demo(props) {
  return (
    <>
      <style href="plico-demo-layer-stack" precedence="default">
        {demoStyles}
      </style>
      <PublicDemo {...props} />
    </>
  );
}
export { Demo as LayerStackDemo };
export default Demo;

export * from "./Component";

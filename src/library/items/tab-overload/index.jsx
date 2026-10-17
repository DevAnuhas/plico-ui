"use client";
import * as React from "react";
import { PlicoDemo_s as PublicDemo } from "../../modules/demo-CVKU8Uzh.jsx";
export { TabOverload as Component } from "./Component";
export { TabOverload as TabOverload } from "./Component";
const demoStyles =
  ".tab-overload-demo{width:100%}.stage .tab-overload-demo{width:min(100%,560px)}.card__preview .tab-overload-demo{place-items:center;width:auto;display:grid;position:absolute;inset:0}.card__preview .tab-overload-demo .ui-to{width:auto;height:100%}\n";
export function Demo(props) {
  return (
    <>
      <style href="plico-demo-tab-overload" precedence="default">
        {demoStyles}
      </style>
      <PublicDemo {...props} />
    </>
  );
}
export { Demo as TabOverloadDemo };
export default Demo;

export * from "./Component";

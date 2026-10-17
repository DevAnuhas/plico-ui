"use client";
import * as React from "react";
import { PlicoDemo_d as PublicDemo } from "../../modules/demo-OZULToi6.jsx";
export { ModelWheel as Component } from "./Component";
export { ModelWheel as ModelWheel } from "./Component";
const demoStyles =
  ".model-wheel-demo{width:min(100%,360px)}.card__preview .model-wheel-demo{place-items:center;width:auto;display:grid;position:absolute;inset:0}.card__preview .model-wheel-demo .ui-mw{zoom:.8}\n";
export function Demo(props) {
  return (
    <>
      <style href="plico-demo-model-wheel" precedence="default">
        {demoStyles}
      </style>
      <PublicDemo {...props} />
    </>
  );
}
export { Demo as ModelWheelDemo };
export default Demo;

export * from "./Component";

"use client";
import * as React from "react";
import { PlicoDemo_r as PublicDemo } from "../../modules/demo-BABw5NIJ.jsx";
export { IntegrationGrid as Component } from "./Component";
export { IntegrationGrid as IntegrationGrid } from "./Component";
const demoStyles =
  ".integration-grid-demo{width:100%}.stage .integration-grid-demo{width:min(100%,760px)}.card__preview .integration-grid-demo{place-items:center;width:auto;display:grid;position:absolute;inset:0}.card__preview .integration-grid-demo .ui-ig{width:100%}\n";
export function Demo(props) {
  return (
    <>
      <style href="plico-demo-integration-grid" precedence="default">
        {demoStyles}
      </style>
      <PublicDemo {...props} />
    </>
  );
}
export { Demo as IntegrationGridDemo };
export default Demo;

export * from "./Component";

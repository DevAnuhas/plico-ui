"use client";
import * as React from "react";
import { PlicoDemo_f as PublicDemo } from "../../modules/demo-BTBcqeeL.jsx";
export { LeadSourcing as Component } from "./Component";
export { LeadSourcing as LeadSourcing } from "./Component";
const demoStyles =
  ".lead-sourcing-demo{width:100%}.stage .lead-sourcing-demo{width:min(100%,560px)}.card__preview .lead-sourcing-demo{place-items:center;width:auto;display:grid;position:absolute;inset:0}.card__preview .lead-sourcing-demo .ui-ls{width:auto;height:100%}\n";
export function Demo(props) {
  return (
    <>
      <style href="plico-demo-lead-sourcing" precedence="default">
        {demoStyles}
      </style>
      <PublicDemo {...props} />
    </>
  );
}
export { Demo as LeadSourcingDemo };
export default Demo;

export * from "./Component";

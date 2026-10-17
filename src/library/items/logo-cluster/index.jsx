"use client";
import * as React from "react";
import { PlicoDemo_u as PublicDemo } from "../../modules/demo-CkkSZhS9.jsx";
export { LogoCluster as Component } from "./Component";
export { LogoCluster as LogoCluster } from "./Component";
const demoStyles =
  ".logo-cluster-demo{place-items:center;width:min(100%,380px);display:grid}.card__preview .logo-cluster-demo{width:auto;position:absolute;inset:0}.card__preview .logo-cluster-demo .ui-lc{width:auto;height:92%}\n";
export function Demo(props) {
  return (
    <>
      <style href="plico-demo-logo-cluster" precedence="default">
        {demoStyles}
      </style>
      <PublicDemo {...props} />
    </>
  );
}
export { Demo as LogoClusterDemo };
export default Demo;

export * from "./Component";

"use client";
import * as React from "react";
import { PlicoDemo_p as PublicDemo } from "../../modules/demo-DOm8gFae.jsx";
export { PlicoCore_a as Component } from "../../modules/demo-DOm8gFae.jsx";
export { PlicoCore_a as WorldMap } from "../../modules/demo-DOm8gFae.jsx";
const demoStyles =
  ".world-map-demo{width:100%}.stage .world-map-demo{width:min(100%,560px)}.card__preview .world-map-demo{place-items:center;width:auto;display:grid;position:absolute;inset:0}.card__preview .world-map-demo .ui-wm{width:94%}.card__preview .world-map-demo .ui-wm-switch{top:16px}\n";
export function Demo(props) {
  return (
    <>
      <style href="plico-demo-world-map" precedence="default">
        {demoStyles}
      </style>
      <PublicDemo {...props} />
    </>
  );
}
export { Demo as WorldMapDemo };
export default Demo;

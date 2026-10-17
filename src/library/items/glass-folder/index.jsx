"use client";
import * as React from "react";
import { PlicoDemo_r as PublicDemo } from "../../modules/demo-ljSEPvt1.jsx";
export { PlicoCore_Xs as Component } from "../../modules/index-CA7yMmEL.jsx";
export { PlicoCore_Xs as GlassFolder } from "../../modules/index-CA7yMmEL.jsx";
const demoStyles =
  ".glass-folder-demo{width:100%}.stage .glass-folder-demo{width:min(100%,560px)}.card__preview .glass-folder-demo{place-items:center;width:auto;display:grid;position:absolute;inset:0}.card__preview .glass-folder-demo .ui-fd{width:auto;height:100%}\n";
export function Demo(props) {
  return (
    <>
      <style href="plico-demo-glass-folder" precedence="default">
        {demoStyles}
      </style>
      <PublicDemo {...props} />
    </>
  );
}
export { Demo as GlassFolderDemo };
export default Demo;

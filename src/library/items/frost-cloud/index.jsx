"use client";
import * as React from "react";
import { PlicoDemo_h as PublicDemo } from "../../modules/demo-DrDu-VuE.jsx";
export { FrostCloud as Component } from "./Component";
export { FrostCloud as FrostCloud } from "./Component";
const demoStyles =
  ".frost-cloud-demo{width:min(100%,360px);display:grid}.stage .frost-cloud-demo,.card__preview .frost-cloud-demo{width:auto;position:absolute;inset:0;overflow:hidden}.stage .frost-cloud-demo>*,.card__preview .frost-cloud-demo>*{aspect-ratio:auto;height:100%}.stage .frost-cloud-demo svg{max-width:min(380px,78%)}.card__preview .frost-cloud-demo svg{width:175px;max-width:175px}\n";
export function Demo(props) {
  return (
    <>
      <style href="plico-demo-frost-cloud" precedence="default">
        {demoStyles}
      </style>
      <PublicDemo {...props} />
    </>
  );
}
export { Demo as FrostCloudDemo };
export default Demo;

export * from "./Component";

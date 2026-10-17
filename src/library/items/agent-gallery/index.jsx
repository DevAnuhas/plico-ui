"use client";
import * as React from "react";
import { PlicoDemo_m as PublicDemo } from "../../modules/demo-qWgXlPG0.jsx";
export { PlicoCore_a as Component } from "../../modules/demo-qWgXlPG0.jsx";
export { PlicoCore_a as AgentGallery } from "../../modules/demo-qWgXlPG0.jsx";
const demoStyles =
  ".gallery-demo{align-self:stretch;width:100%;min-width:0;padding:20px 16px}.gallery-demo[data-fit=stage]{justify-items:center;padding:32px 0;display:grid}.gallery-demo{padding-left:0;padding-right:0}.card__preview .gallery-demo{padding:0;position:absolute;inset:0;overflow:hidden;-webkit-mask-image:linear-gradient(#000 72%,#0000);mask-image:linear-gradient(#000 72%,#0000)}.gallery-demo[data-fit=card] .gallery-demo__frame{transform-origin:0 0;position:absolute;top:40px;left:0}.gallery-demo__frame{min-width:0}\n";
export function Demo(props) {
  return (
    <>
      <style href="plico-demo-agent-gallery" precedence="default">
        {demoStyles}
      </style>
      <PublicDemo {...props} />
    </>
  );
}
export { Demo as AgentGalleryDemo };
export default Demo;

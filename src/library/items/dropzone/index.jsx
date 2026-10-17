"use client";
import * as React from "react";
import { PlicoDemo_y as PublicDemo } from "../../modules/demo-CQyRPKqn.jsx";
export { PlicoCore_v as Component } from "../../modules/demo-CQyRPKqn.jsx";
export { PlicoCore_v as Dropzone } from "../../modules/demo-CQyRPKqn.jsx";
const demoStyles =
  ".dropzone-demo{grid-template-columns:minmax(0,520px);place-content:center;width:100%;display:grid}.card__preview .dropzone-demo{grid-template-columns:auto;place-content:center;position:absolute;inset:0}.card__preview .dropzone-demo .ui-dz{zoom:.4;width:520px;max-width:none}.stage:has(.dropzone-demo){align-items:start;height:640px;padding:48px 32px}@media (width<=760px){.stage:has(.dropzone-demo){height:580px;padding:52px 12px 16px}}.card__preview .dropzone-demo:has(.ui-dzc){inset:40px 0 0}.card__preview .dropzone-demo .ui-dzc{zoom:.38;width:520px;max-width:none}\n";
export function Demo(props) {
  return (
    <>
      <style href="plico-demo-dropzone" precedence="default">
        {demoStyles}
      </style>
      <PublicDemo {...props} />
    </>
  );
}
export { Demo as DropzoneDemo };
export default Demo;

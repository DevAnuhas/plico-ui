"use client";
import * as React from "react";
import { PlicoDemo_h as PublicDemo } from "../../modules/demo-CGtzgHa8.jsx";
export { PlicoCore_p as Component } from "../../modules/demo-CGtzgHa8.jsx";
export { PlicoCore_p as IntegrationPicker } from "../../modules/demo-CGtzgHa8.jsx";
const demoStyles =
  ".picker-demo{grid-template-columns:minmax(0,660px);place-content:center;width:100%;display:grid}.card__preview .picker-demo{grid-template-columns:auto;position:absolute;inset:0}.card__preview .picker-demo .ui-ip{zoom:.36;width:660px;max-width:none}:is(.stage:has(>.picker-demo),.stage:has(.picker-demo)){height:auto;min-height:520px;padding:48px 32px}@media (width<=760px){.stage:has(.picker-demo){padding:52px 12px 16px}}.card__preview .picker-demo .ui-ipc{zoom:.36;width:660px;max-width:none}\n";
export function Demo(props) {
  return (
    <>
      <style href="plico-demo-integration-picker" precedence="default">
        {demoStyles}
      </style>
      <PublicDemo {...props} />
    </>
  );
}
export { Demo as IntegrationPickerDemo };
export default Demo;

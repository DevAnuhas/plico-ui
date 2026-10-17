"use client";
import * as React from "react";
import { PlicoDemo_D as PublicDemo } from "../../modules/demo.clean-7tCw9u4A.jsx";
export { PlicoCore_m as Component } from "../../modules/demo.clean-7tCw9u4A.jsx";
export { PlicoCore_m as StepperFormClean } from "../../modules/demo.clean-7tCw9u4A.jsx";
const demoStyles =
  ".stepper-form-demo{grid-template-columns:minmax(0,480px);place-content:center;width:100%;display:grid}.sf-demo__muted{color:var(--ui-sf-muted)}.sf-demo__sub{color:var(--ui-sf-muted);white-space:nowrap;text-overflow:ellipsis;font-size:12.5px;display:block;overflow:hidden}.card__preview .stepper-form-demo{grid-template-columns:auto;place-content:center;position:absolute;inset:0}.card__preview .stepper-form-demo .ui-sf{zoom:.42;width:480px;max-width:none}.stage:has(.stepper-form-demo){align-items:start;height:560px;padding:56px 32px}@media (width<=760px){.stage:has(.stepper-form-demo){height:640px;padding:120px 12px 16px}}.sfc-demo__muted{color:var(--ui-sfc-muted)}.sfc-demo__sub{color:var(--ui-sfc-muted);white-space:nowrap;text-overflow:ellipsis;font-size:12px;line-height:16px;display:block;overflow:hidden}.card__preview .stepper-form-demo .ui-sfc{zoom:.44;width:460px;max-width:none}\n";
export function Demo(props) {
  return (
    <>
      <style href="plico-demo-stepper-form-clean" precedence="default">
        {demoStyles}
      </style>
      <PublicDemo {...props} />
    </>
  );
}
export { Demo as StepperFormCleanDemo };
export default Demo;

export { PlicoApi_StepperField as StepperField, PlicoApi_StepperInput as StepperInput, PlicoApi_StepperTags as StepperTags, PlicoApi_StepperChoices as StepperChoices, PlicoApi_StepperReview as StepperReview } from "../../modules/demo.clean-7tCw9u4A.jsx";

"use client";
import * as React from "react";
import { PlicoDemo_d as PublicDemo } from "../../modules/demo-CQRf-Cg5.jsx";
export { EmailDraft as Component } from "./Component";
export { EmailDraft as EmailDraft } from "./Component";
const demoStyles =
  ".email-draft-demo{grid-template-columns:minmax(0,1fr);place-items:center;width:100%;display:grid}.card__preview .email-draft-demo{position:absolute;inset:0}.card__preview .email-draft-demo .ui-ed{zoom:.5}.card__preview .email-draft-demo .ui-edc{zoom:.54}@media (width>=700px){.stage .email-draft-demo .ui-edc{zoom:1.0834}}\n";
export function Demo(props) {
  return (
    <>
      <style href="plico-demo-email-draft" precedence="default">
        {demoStyles}
      </style>
      <PublicDemo {...props} />
    </>
  );
}
export { Demo as EmailDraftDemo };
export default Demo;

export * from "./Component";

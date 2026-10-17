"use client";
import * as React from "react";
import { PlicoDemo_ne as PublicDemo } from "../../modules/demo-Dh1VwBQQ.jsx";
export { PlicoCore_f as Component } from "../../modules/demo-Dh1VwBQQ.jsx";
export { PlicoCore_f as Combobox } from "../../modules/demo-Dh1VwBQQ.jsx";
const demoStyles =
  ".combobox-demo{grid-template-columns:minmax(0,420px);place-content:center;width:100%;display:grid}.card__preview .combobox-demo{grid-template-columns:auto;place-content:start center;padding-top:42px;position:absolute;inset:0}.card__preview .combobox-demo .ui-cbx{zoom:.48;width:420px;max-width:none}.card__preview .combobox-demo .ui-cbx__list{max-height:210px}.stage:has(.combobox-demo){align-items:start;height:560px;padding:56px 32px}@media (width<=760px){.stage:has(.combobox-demo){height:600px;padding:56px 12px 16px}}.card__preview .combobox-demo .ui-cbxc{zoom:.48;width:420px;max-width:none}.card__preview .combobox-demo .ui-cbxc__list{max-height:210px}\n";
export function Demo(props) {
  return (
    <>
      <style href="plico-demo-combobox" precedence="default">
        {demoStyles}
      </style>
      <PublicDemo {...props} />
    </>
  );
}
export { Demo as ComboboxDemo };
export default Demo;

"use client";
import * as React from "react";
import { PlicoDemo_v as PublicDemo } from "../../modules/demo-BiF59Z3j.jsx";
export { PlicoCore_c as Component } from "../../modules/component-OCVPe01Z.jsx";
export { PlicoCore_c as DataTable } from "../../modules/component-OCVPe01Z.jsx";
const demoStyles =
  ".data-table-demo{grid-template-columns:minmax(0,720px);place-content:center;width:100%;display:grid}.card__preview .data-table-demo{grid-template-columns:auto;place-content:center;position:absolute;inset:0}.card__preview .data-table-demo .ui-dt{zoom:var(--fit,.5);width:720px;max-width:none}:where(.dark,[data-theme=dark]) .data-table-demo__mono{fill:#ededed}.card__preview .data-table-demo .ui-dtc{zoom:var(--fit,.5);width:720px;max-width:none}\n";
export function Demo(props) {
  return (
    <>
      <style href="plico-demo-data-table" precedence="default">
        {demoStyles}
      </style>
      <PublicDemo {...props} />
    </>
  );
}
export { Demo as DataTableDemo };
export default Demo;

export { PlicoApi_TextColumnIcon as TextColumnIcon, PlicoApi_TagColumnIcon as TagColumnIcon } from "../../modules/component-OCVPe01Z.jsx";

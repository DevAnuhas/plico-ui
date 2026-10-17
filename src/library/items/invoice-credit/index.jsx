"use client";
import * as React from "react";
import { PlicoDemo_g as PublicDemo } from "../../modules/demo-BRSx7pv5.jsx";
export { PlicoCore_a as Component } from "../../modules/demo-BRSx7pv5.jsx";
export { PlicoCore_a as InvoiceCredit } from "../../modules/demo-BRSx7pv5.jsx";
const demoStyles =
  ".invoice-demo{align-self:stretch;width:100%;min-width:0;padding:20px 16px}.invoice-demo[data-fit=stage]{justify-items:center;padding:32px 0;display:grid}.card__preview .invoice-demo{padding:0;position:absolute;inset:0;overflow:hidden;-webkit-mask-image:linear-gradient(#000 72%,#0000);mask-image:linear-gradient(#000 72%,#0000)}.invoice-demo[data-fit=card] .invoice-demo__frame{transform-origin:0 0;position:absolute;top:40px;left:24px}.invoice-demo__frame{min-width:0}\n";
export function Demo(props) {
  return (
    <>
      <style href="plico-demo-invoice-credit" precedence="default">
        {demoStyles}
      </style>
      <PublicDemo {...props} />
    </>
  );
}
export { Demo as InvoiceCreditDemo };
export default Demo;

"use client";
import * as React from "react";
import { PlicoDemo_u as PublicDemo } from "../../modules/demo.clean-CnpU6JZL.jsx";
export { SmartRecommendation as Component } from "./Component";
export { SmartRecommendation as SmartRecommendationClean } from "./Component";
const demoStyles =
  ".recommendation-demo{grid-template-columns:minmax(0,440px);place-content:center;width:100%;display:grid}.card__preview .recommendation-demo{grid-template-columns:auto;position:absolute;inset:0}.card__preview .recommendation-demo .ui-sr,.card__preview .recommendation-demo .ui-src{zoom:.7;width:440px;max-width:none}\n";
export function Demo(props) {
  return (
    <>
      <style href="plico-demo-smart-recommendation-clean" precedence="default">
        {demoStyles}
      </style>
      <PublicDemo {...props} />
    </>
  );
}
export { Demo as SmartRecommendationCleanDemo };
export default Demo;

export * from "./Component";

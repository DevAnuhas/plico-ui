"use client";
import * as React from "react";
import { PlicoDemo_m as PublicDemo } from "../../modules/demo.clean-BMo3zBgx.jsx";
export { PlicoCore_s as Component } from "../../modules/demo.clean-BMo3zBgx.jsx";
export { PlicoCore_s as IntegrationSettingsClean } from "../../modules/demo.clean-BMo3zBgx.jsx";
const demoStyles =
  ".integration-demo{grid-template-columns:minmax(0,560px);place-content:center;width:100%;display:grid}.card__preview .integration-demo{grid-template-columns:auto;position:absolute;inset:0}.card__preview .integration-demo .ui-is{zoom:.5;width:520px;max-width:none}@media (width<=760px){.stage .integration-demo .ui-is{zoom:.84}}.stage .integration-demo .ui-isc{zoom:1.12;width:500px;max-width:100%}.card__preview .integration-demo .ui-isc{zoom:.47;width:520px;max-width:none}@media (width<=760px){.stage .integration-demo .ui-isc{zoom:1}}\n";
export function Demo(props) {
  return (
    <>
      <style href="plico-demo-integration-settings-clean" precedence="default">
        {demoStyles}
      </style>
      <PublicDemo {...props} />
    </>
  );
}
export { Demo as IntegrationSettingsCleanDemo };
export default Demo;

"use client";
import * as React from "react";
import { PlicoDemo_E as PublicDemo } from "../../modules/demo-HbaZwPph.jsx";
export { PlicoCore_S as Component } from "../../modules/demo-HbaZwPph.jsx";
import { PlicoCore_S as ScreenCore } from "../../modules/demo-HbaZwPph.jsx";
import { ScreenFrameModeContext } from "../../screen-bridge.jsx";
export function FullScreen(props) {
  return (
    <ScreenFrameModeContext.Provider value={true}>
      <PublicDemo {...props} />
    </ScreenFrameModeContext.Provider>
  );
}
export { PlicoCore_S as Integrations } from "../../modules/demo-HbaZwPph.jsx";
const demoStyles = "";
export function Demo(props) {
  return (
    <>
      <style href="plico-demo-integrations" precedence="default">
        {demoStyles}
      </style>
      <PublicDemo {...props} />
    </>
  );
}
export { Demo as IntegrationsDemo };
export default Demo;

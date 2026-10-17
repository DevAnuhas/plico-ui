"use client";
import * as React from "react";
import { PlicoDemo_H as PublicDemo } from "../../modules/demo-BpIKiAtr.jsx";
export { PlicoCore_B as Component } from "../../modules/demo-BpIKiAtr.jsx";
import { PlicoCore_B as ScreenCore } from "../../modules/demo-BpIKiAtr.jsx";
import { ScreenFrameModeContext } from "../../screen-bridge.jsx";
export function FullScreen(props) {
  return (
    <ScreenFrameModeContext.Provider value={true}>
      <PublicDemo {...props} />
    </ScreenFrameModeContext.Provider>
  );
}
export { PlicoCore_B as Analytics } from "../../modules/demo-BpIKiAtr.jsx";
const demoStyles = "";
export function Demo(props) {
  return (
    <>
      <style href="plico-demo-analytics" precedence="default">
        {demoStyles}
      </style>
      <PublicDemo {...props} />
    </>
  );
}
export { Demo as AnalyticsDemo };
export default Demo;

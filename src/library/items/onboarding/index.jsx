"use client";
import * as React from "react";
import { PlicoDemo_M as PublicDemo } from "../../modules/demo-BgLxDeeC.jsx";
export { PlicoCore_j as Component } from "../../modules/demo-BgLxDeeC.jsx";
import { PlicoCore_j as ScreenCore } from "../../modules/demo-BgLxDeeC.jsx";
import { ScreenFrameModeContext } from "../../screen-bridge.jsx";
export function FullScreen(props) {
  return (
    <ScreenFrameModeContext.Provider value={true}>
      <PublicDemo {...props} />
    </ScreenFrameModeContext.Provider>
  );
}
export { PlicoCore_j as Onboarding } from "../../modules/demo-BgLxDeeC.jsx";
const demoStyles = "";
export function Demo(props) {
  return (
    <>
      <style href="plico-demo-onboarding" precedence="default">
        {demoStyles}
      </style>
      <PublicDemo {...props} />
    </>
  );
}
export { Demo as OnboardingDemo };
export default Demo;

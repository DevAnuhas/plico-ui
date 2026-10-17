"use client";
import * as React from "react";
import { PlicoDemo_ee as PublicDemo } from "../../modules/demo-BGahYM4K.jsx";
export { PlicoCore_J as Component } from "../../modules/demo-BGahYM4K.jsx";
import { PlicoCore_J as ScreenCore } from "../../modules/demo-BGahYM4K.jsx";
import { ScreenFrameModeContext } from "../../screen-bridge.jsx";
export function FullScreen(props) {
  return (
    <ScreenFrameModeContext.Provider value={true}>
      <PublicDemo {...props} />
    </ScreenFrameModeContext.Provider>
  );
}
export { PlicoCore_J as SettingsBilling } from "../../modules/demo-BGahYM4K.jsx";
const demoStyles = "";
export function Demo(props) {
  return (
    <>
      <style href="plico-demo-settings-billing" precedence="default">
        {demoStyles}
      </style>
      <PublicDemo {...props} />
    </>
  );
}
export { Demo as SettingsBillingDemo };
export default Demo;

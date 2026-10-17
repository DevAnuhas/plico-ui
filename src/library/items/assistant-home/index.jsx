"use client";
import * as React from "react";
import { PlicoDemo_a as PublicDemo } from "../../modules/demo-CHSa66dF.jsx";
export { PlicoCore_N as Component } from "../../modules/component-BtHQvHKg.jsx";
import { PlicoCore_N as ScreenCore } from "../../modules/component-BtHQvHKg.jsx";
import { ScreenFrameModeContext } from "../../screen-bridge.jsx";
export function FullScreen(props) {
  return (
    <ScreenFrameModeContext.Provider value={true}>
      <PublicDemo {...props} />
    </ScreenFrameModeContext.Provider>
  );
}
export { PlicoCore_N as AssistantHome } from "../../modules/component-BtHQvHKg.jsx";
const demoStyles = "";
export function Demo(props) {
  return (
    <>
      <style href="plico-demo-assistant-home" precedence="default">
        {demoStyles}
      </style>
      <PublicDemo {...props} />
    </>
  );
}
export { Demo as AssistantHomeDemo };
export default Demo;

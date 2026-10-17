"use client";
import * as React from "react";
import { PlicoDemo_o as PublicDemo } from "../../modules/demo-BeOo5q8C.jsx";
export { PlicoCore_M as Component } from "../../modules/component-B0ZYbJEt.jsx";
import { PlicoCore_M as ScreenCore } from "../../modules/component-B0ZYbJEt.jsx";
import { ScreenFrameModeContext } from "../../screen-bridge.jsx";
export function FullScreen(props) {
  return (
    <ScreenFrameModeContext.Provider value={true}>
      <PublicDemo {...props} />
    </ScreenFrameModeContext.Provider>
  );
}
export { PlicoCore_M as AppShell } from "../../modules/component-B0ZYbJEt.jsx";
const demoStyles = "";
export function Demo(props) {
  return (
    <>
      <style href="plico-demo-app-shell" precedence="default">
        {demoStyles}
      </style>
      <PublicDemo {...props} />
    </>
  );
}
export { Demo as AppShellDemo };
export default Demo;

"use client";
import * as React from "react";
import { PlicoDemo_Z as PublicDemo } from "../../modules/demo-vftwgdm_.jsx";
export { PlicoCore_Y as Component } from "../../modules/demo-vftwgdm_.jsx";
import { PlicoCore_Y as ScreenCore } from "../../modules/demo-vftwgdm_.jsx";
import { ScreenFrameModeContext } from "../../screen-bridge.jsx";
export function FullScreen(props) {
  return (
    <ScreenFrameModeContext.Provider value={true}>
      <PublicDemo {...props} />
    </ScreenFrameModeContext.Provider>
  );
}
export { PlicoCore_Y as Crm } from "../../modules/demo-vftwgdm_.jsx";
const demoStyles = "";
export function Demo(props) {
  return (
    <>
      <style href="plico-demo-crm" precedence="default">
        {demoStyles}
      </style>
      <PublicDemo {...props} />
    </>
  );
}
export { Demo as CrmDemo };
export default Demo;

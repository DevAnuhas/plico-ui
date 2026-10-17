"use client";
import * as React from "react";
import { PlicoDemo_k as PublicDemo } from "../../modules/demo-DXkqoFJb.jsx";
export { PlicoCore_D as Component } from "../../modules/demo-DXkqoFJb.jsx";
import { PlicoCore_D as ScreenCore } from "../../modules/demo-DXkqoFJb.jsx";
import { ScreenFrameModeContext } from "../../screen-bridge.jsx";
export function FullScreen(props) {
  return (
    <ScreenFrameModeContext.Provider value={true}>
      <PublicDemo {...props} />
    </ScreenFrameModeContext.Provider>
  );
}
export { PlicoCore_D as Files } from "../../modules/demo-DXkqoFJb.jsx";
const demoStyles = "";
export function Demo(props) {
  return (
    <>
      <style href="plico-demo-files" precedence="default">
        {demoStyles}
      </style>
      <PublicDemo {...props} />
    </>
  );
}
export { Demo as FilesDemo };
export default Demo;

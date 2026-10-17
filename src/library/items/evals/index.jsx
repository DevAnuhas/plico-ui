"use client";
import * as React from "react";
import { PlicoDemo_U as PublicDemo } from "../../modules/demo-9TUmGUMi.jsx";
export { PlicoCore_B as Component } from "../../modules/demo-9TUmGUMi.jsx";
import { PlicoCore_B as ScreenCore } from "../../modules/demo-9TUmGUMi.jsx";
import { ScreenFrameModeContext } from "../../screen-bridge.jsx";
export function FullScreen(props) {
  return (
    <ScreenFrameModeContext.Provider value={true}>
      <PublicDemo {...props} />
    </ScreenFrameModeContext.Provider>
  );
}
export { PlicoCore_B as Evals } from "../../modules/demo-9TUmGUMi.jsx";
const demoStyles = "";
export function Demo(props) {
  return (
    <>
      <style href="plico-demo-evals" precedence="default">
        {demoStyles}
      </style>
      <PublicDemo {...props} />
    </>
  );
}
export { Demo as EvalsDemo };
export default Demo;

"use client";
import * as React from "react";
import { PlicoDemo_O as PublicDemo } from "../../modules/demo-DhakOwR1.jsx";
export { PlicoCore_E as Component } from "../../modules/demo-DhakOwR1.jsx";
import { PlicoCore_E as ScreenCore } from "../../modules/demo-DhakOwR1.jsx";
import { ScreenFrameModeContext } from "../../screen-bridge.jsx";
export function FullScreen(props) {
  return (
    <ScreenFrameModeContext.Provider value={true}>
      <PublicDemo {...props} />
    </ScreenFrameModeContext.Provider>
  );
}
export { PlicoCore_E as AgentRun } from "../../modules/demo-DhakOwR1.jsx";
const demoStyles = "";
export function Demo(props) {
  return (
    <>
      <style href="plico-demo-agent-run" precedence="default">
        {demoStyles}
      </style>
      <PublicDemo {...props} />
    </>
  );
}
export { Demo as AgentRunDemo };
export default Demo;

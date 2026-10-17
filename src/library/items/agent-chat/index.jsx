"use client";
import * as React from "react";
import { PlicoDemo_ie as PublicDemo } from "../../modules/demo-CeLmzXST.jsx";
export { PlicoCore_ne as Component } from "../../modules/demo-CeLmzXST.jsx";
import { PlicoCore_ne as ScreenCore } from "../../modules/demo-CeLmzXST.jsx";
import { ScreenFrameModeContext } from "../../screen-bridge.jsx";
export function FullScreen(props) {
  return (
    <ScreenFrameModeContext.Provider value={true}>
      <PublicDemo {...props} />
    </ScreenFrameModeContext.Provider>
  );
}
export { PlicoCore_ne as AgentChat } from "../../modules/demo-CeLmzXST.jsx";
const demoStyles = "";
export function Demo(props) {
  return (
    <>
      <style href="plico-demo-agent-chat" precedence="default">
        {demoStyles}
      </style>
      <PublicDemo {...props} />
    </>
  );
}
export { Demo as AgentChatDemo };
export default Demo;

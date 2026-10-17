"use client";
import * as React from "react";
import { PlicoDemo_D as PublicDemo } from "../../modules/demo-DM_UqYSi.jsx";
export { PlicoCore_T as Component } from "../../modules/demo-DM_UqYSi.jsx";
import { PlicoCore_T as ScreenCore } from "../../modules/demo-DM_UqYSi.jsx";
import { ScreenFrameModeContext } from "../../screen-bridge.jsx";
export function FullScreen(props) {
  return (
    <ScreenFrameModeContext.Provider value={true}>
      <PublicDemo {...props} />
    </ScreenFrameModeContext.Provider>
  );
}
export { PlicoCore_T as Folder } from "../../modules/demo-DM_UqYSi.jsx";
const demoStyles = "";
export function Demo(props) {
  return (
    <>
      <style href="plico-demo-folder" precedence="default">
        {demoStyles}
      </style>
      <PublicDemo {...props} />
    </>
  );
}
export { Demo as FolderDemo };
export default Demo;

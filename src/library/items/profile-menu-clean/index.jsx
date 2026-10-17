"use client";
import * as React from "react";
import { PlicoDemo_h as PublicDemo } from "../../modules/demo.clean-Du4BhTGQ.jsx";
export { ProfileMenu as Component } from "./Component";
export { ProfileMenu as ProfileMenuClean } from "./Component";
const demoStyles =
  ".profile-demo{grid-template-columns:minmax(0,1fr);place-items:center;width:100%;display:grid}.card__preview .profile-demo{position:absolute;inset:0}.card__preview .profile-demo .ui-pm{zoom:.58}.stage .profile-demo .ui-pmc{zoom:1.15}.card__preview .profile-demo .ui-pmc{zoom:.62}\n";
export function Demo(props) {
  return (
    <>
      <style href="plico-demo-profile-menu-clean" precedence="default">
        {demoStyles}
      </style>
      <PublicDemo {...props} />
    </>
  );
}
export { Demo as ProfileMenuCleanDemo };
export default Demo;

export * from "./Component";

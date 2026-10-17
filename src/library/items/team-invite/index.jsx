"use client";
import * as React from "react";
import { PlicoDemo_s as PublicDemo } from "../../modules/demo-cWsVSmbI.jsx";
export { TeamInvite as Component } from "./Component";
export { TeamInvite as TeamInvite } from "./Component";
const demoStyles =
  ".team-invite-demo{width:100%}.stage .team-invite-demo{width:min(100%,560px)}.card__preview .team-invite-demo{place-items:center;width:auto;display:grid;position:absolute;inset:0}.card__preview .team-invite-demo .ui-ti{width:auto;height:100%}\n";
export function Demo(props) {
  return (
    <>
      <style href="plico-demo-team-invite" precedence="default">
        {demoStyles}
      </style>
      <PublicDemo {...props} />
    </>
  );
}
export { Demo as TeamInviteDemo };
export default Demo;

export * from "./Component";

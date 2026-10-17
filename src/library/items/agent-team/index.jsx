"use client";
import * as React from "react";
import { PlicoDemo_p as PublicDemo } from "../../modules/demo-BtlH6dH8.jsx";
export { AgentTeam as Component } from "./Component";
export { AgentTeam as AgentTeam } from "./Component";
const demoStyles =
  ".agent-team-demo{width:100%}.stage .agent-team-demo{width:min(100%,560px)}.card__preview .agent-team-demo{place-items:center;width:auto;display:grid;position:absolute;inset:0}.card__preview .agent-team-demo .ui-at{width:auto;height:100%}\n";
export function Demo(props) {
  return (
    <>
      <style href="plico-demo-agent-team" precedence="default">
        {demoStyles}
      </style>
      <PublicDemo {...props} />
    </>
  );
}
export { Demo as AgentTeamDemo };
export default Demo;

export * from "./Component";

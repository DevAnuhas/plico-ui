"use client";

import { t as _View_n } from "./component-Dd3X9r8k.jsx";
import * as React from "react";
import * as JSXRuntime from "react/jsx-runtime";
var a = [
  {
    id: `workspace`,
    title: `Set up your workspace`,
    tasks: [
      {
        id: `name`,
        label: `Choose a workspace name`,
      },
      {
        id: `invite`,
        label: `Invite your teammates to collaborate`,
      },
      {
        id: `calendar`,
        label: `Connect your calendar`,
      },
    ],
  },
  {
    id: `billing`,
    title: `Set up billing`,
    tasks: [
      {
        id: `card`,
        label: `Add a payment method`,
      },
      {
        id: `plan`,
        label: `Choose a plan`,
      },
    ],
  },
  {
    id: `verify`,
    title: `Verify your account`,
    tasks: [
      {
        id: `email`,
        label: `Confirm your email address`,
        done: true,
      },
    ],
  },
];
function SetupGuideDemo() {
  let [e, t] = React.useState(0);
  return (
    <div className={`setup-demo`}>
      <_View_n groups={a} onEdit={() => {}} onClose={() => t((e) => e + 1)} key={e} />
    </div>
  );
}
export default SetupGuideDemo;
export { SetupGuideDemo as PlicoDemo_o };

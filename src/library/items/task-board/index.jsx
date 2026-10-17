"use client";
import * as React from "react";
import { PlicoDemo_y as PublicDemo } from "../../modules/demo-BfsFftdy.jsx";
export { PlicoCore_o as Component } from "../../modules/demo-BfsFftdy.jsx";
export { PlicoCore_o as TaskBoard } from "../../modules/demo-BfsFftdy.jsx";
const demoStyles =
  ".board-demo{align-self:stretch;width:100%;min-width:0;padding:20px 16px}.board-demo[data-fit=stage]{justify-items:center;padding:32px 0;display:grid}.card__preview .board-demo{padding:0;position:absolute;inset:0;overflow:hidden;-webkit-mask-image:linear-gradient(#000 72%,#0000);mask-image:linear-gradient(#000 72%,#0000)}.board-demo[data-fit=card] .board-demo__frame{transform-origin:0 0;position:absolute;top:44px;left:24px}.board-demo__frame{min-width:0}\n";
export function Demo(props) {
  return (
    <>
      <style href="plico-demo-task-board" precedence="default">
        {demoStyles}
      </style>
      <PublicDemo {...props} />
    </>
  );
}
export { Demo as TaskBoardDemo };
export default Demo;

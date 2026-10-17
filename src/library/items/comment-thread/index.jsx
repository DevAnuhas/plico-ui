"use client";
import * as React from "react";
import { PlicoDemo_g as PublicDemo } from "../../modules/demo-TTVz3U3f.jsx";
export { CommentThread as Component } from "./Component";
export { CommentThread as CommentThread } from "./Component";
const demoStyles =
  ".thread-demo{grid-template-columns:minmax(0,420px);place-content:center;width:100%;display:grid}.stage .thread-demo .ui-ct{--ui-ct-min-height:290px;--ui-ct-max-height:340px}@media (width<=760px){.stage .thread-demo .ui-ct{--ui-ct-min-height:250px;--ui-ct-max-height:280px}}.card__preview .thread-demo{grid-template-columns:auto;position:absolute;inset:0}.card__preview .thread-demo .ui-ct{zoom:.55;width:420px;max-width:none}.stage .thread-demo .ui-ctc{--ui-ctc-min-height:290px;--ui-ctc-max-height:340px}@media (width<=760px){.stage .thread-demo .ui-ctc{--ui-ctc-min-height:250px;--ui-ctc-max-height:280px}}.card__preview .thread-demo .ui-ctc{zoom:.6;width:420px;max-width:none}\n";
export function Demo(props) {
  return (
    <>
      <style href="plico-demo-comment-thread" precedence="default">
        {demoStyles}
      </style>
      <PublicDemo {...props} />
    </>
  );
}
export { Demo as CommentThreadDemo };
export default Demo;

export * from "./Component";

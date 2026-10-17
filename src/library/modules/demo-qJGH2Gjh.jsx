"use client";

import { t as _View_n } from "./component-jpqc9dJC.jsx";
import * as React from "react";
import * as JSXRuntime from "react/jsx-runtime";
var a = [
  `Thinking`,
  `Searching the web`,
  `Reading 12 sources`,
  `Comparing pricing`,
  `Writing response`,
];
var o = 2e3;
var s = 2600;
function ThinkingLoaderDemo() {
  let [e, t] = React.useState(0),
    [c, l] = React.useState(false);
  return (
    React.useEffect(() => {
      let e = window.setTimeout(() => l(true), a.length * o),
        n = window.setTimeout(
          () => {
            (l(false), t((e) => e + 1));
          },
          a.length * o + s,
        );
      return () => {
        (window.clearTimeout(e), window.clearTimeout(n));
      };
    }, [e]),
    (
      <div className={`tl-demo`}>
        <div className={`tl-demo__chat`}>
          <p className={`tl-demo__you`}>{`Which CRM fits a 10-person sales team best?`}</p>
          <_View_n phases={a} interval={o} done={c} key={e} />
        </div>
      </div>
    )
  );
}
export default ThinkingLoaderDemo;
export { ThinkingLoaderDemo as PlicoDemo_c };

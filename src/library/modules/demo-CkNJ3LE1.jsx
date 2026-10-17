"use client";

import { t as _View_n } from "./component-CADGuG8q.jsx";
import * as React from "react";
import * as JSXRuntime from "react/jsx-runtime";
var demoOriginal = `Hi everyone, we are very excited to announce that the new dashboard is now available for all users. It loads a lot faster than before, and you can now export any report to CSV with just a single click. Let us know what you think!`;
var demoSuggested = `Hi everyone, the new dashboard is now live for all users. It loads twice as fast, and you can now export any report to CSV in one click. Let us know what you think!`;
var demoDecisions = [`accept`, `reject`, `accept`, `accept`];
var highlightDuration = 1200;
var decisionGap = 450;
var resetHold = 2800;
function InlineDiffDemo() {
  let diffRef = React.useRef(null),
    [playing, setPlaying] = React.useState(true);
  React.useEffect(() => {
    if (!playing) return;
    let n = [],
      r = 900,
      i = (e, t) => n.push(window.setTimeout(t, e)),
      a = () => {
        (demoDecisions.forEach((t, n) => {
          (i(r, () => diffRef.current?.highlight(n)),
            (r += highlightDuration),
            i(r, () => (t === `accept` ? diffRef.current?.accept(n) : diffRef.current?.reject(n))),
            (r += decisionGap));
        }),
          (r += resetHold),
          i(r, () => diffRef.current?.reset()),
          (r += 900),
          i(r, () => {
            ((r = 0), (n.length = 0), a());
          }));
      };
    return (a(), () => n.forEach((e) => window.clearTimeout(e)));
  }, [playing]);
  let stopAutoplay = () => {
    playing && (setPlaying(false), diffRef.current?.highlight(null));
  };
  return (
    <div
      className={`df-demo`}
      onPointerDown={stopAutoplay}
      onKeyDown={stopAutoplay}
      onFocus={stopAutoplay}
      onPointerOver={(e) => {
        e.target.closest?.(`.ui-df__chg, .ui-df__pop, button`) && stopAutoplay();
      }}
    >
      <_View_n
        ref={diffRef}
        label={`Suggested by AI · Make it shorter`}
        original={demoOriginal}
        suggested={demoSuggested}
      />
    </div>
  );
}
export default InlineDiffDemo;
export { InlineDiffDemo as PlicoDemo_d };

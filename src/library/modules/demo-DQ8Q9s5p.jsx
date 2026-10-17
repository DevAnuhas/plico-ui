"use client";

import { t as _View_n } from "./component-SU9mzBXM.jsx";
import * as React from "react";
import * as JSXRuntime from "react/jsx-runtime";
var a = [`M`, `J`, `S`, `A`];
function ApprovalCardDemo() {
  let [e, t] = React.useState(`pending`),
    [o, s] = React.useState(false),
    [c, l] = React.useState(false),
    u = React.useRef(null);
  React.useEffect(() => {
    if (o) return;
    let n = [];
    if (e === `pending`) {
      if (c) return;
      let e = () => u.current?.querySelector(`.ui-ap__approve`);
      (n.push(window.setTimeout(() => e()?.setAttribute(`data-pressed`, ``), 2800)),
        n.push(
          window.setTimeout(() => {
            (e()?.removeAttribute(`data-pressed`), e()?.click());
          }, 3e3),
        ));
    } else n.push(window.setTimeout(() => t(`pending`), 3200));
    return () => {
      (n.forEach(clearTimeout),
        u.current?.querySelector(`.ui-ap__approve`)?.removeAttribute(`data-pressed`));
    };
  }, [e, o, c]);
  let d = () => s(true);
  return (
    <div className={`ap-demo`}>
      <div
        ref={u}
        className={`ap-demo__chat`}
        onPointerDown={d}
        onKeyDown={d}
        onPointerEnter={() => l(true)}
        onPointerLeave={() => l(false)}
      >
        <div className={`ap-demo__agent`}>
          <span className={`ap-demo__bot`} aria-hidden={`true`}>
            <svg viewBox={`0 0 24 24`}>
              <path d={`M12 3.5 13.9 9l5.6 1.9-5.6 1.9L12 18.5l-1.9-5.7-5.6-1.9L10.1 9 12 3.5Z`} />
            </svg>
          </span>
          <p className={`ap-demo__msg`}>{`I drafted the October newsletter. Ready to send?`}</p>
        </div>
        <_View_n
          title={`Send campaign email`}
          description={`October product update · Newsletter`}
          risk={`medium`}
          icon={
            <svg viewBox={`0 0 24 24`}>
              <path d={`M4 6.5h16v11H4z`} />
              <path d={`m4.5 7 7.5 6 7.5-6`} />
            </svg>
          }
          status={e}
          onApprove={() => new Promise((e) => window.setTimeout(e, 700)).then(() => t(`approved`))}
          onDeny={() => t(`denied`)}
          details={[
            {
              label: `Subject`,
              value: `What's new in October`,
            },
            {
              label: `Send`,
              value: `Today, 9:00 AM`,
            },
          ]}
        >
          <div className={`ap-demo__people`}>
            <span className={`ap-demo__avatars`} aria-hidden={`true`}>
              {a.map((e, t) => (
                <span className={`ap-demo__avatar`} data-i={t} key={e}>
                  {e}
                </span>
              ))}
            </span>
            <span className={`ap-demo__to`}>
              <span className={`ap-demo__names`}>{`Mia, Jonas, Sara, Alex`}</span>
              <span className={`ap-demo__more`}>{`+38 more`}</span>
            </span>
          </div>
        </_View_n>
        {o && e !== `pending` && (
          <button
            type={`button`}
            className={`ap-demo__replay`}
            onClick={() => t(`pending`)}
          >{`Replay`}</button>
        )}
      </div>
    </div>
  );
}
export default ApprovalCardDemo;
export { ApprovalCardDemo as PlicoDemo_o };

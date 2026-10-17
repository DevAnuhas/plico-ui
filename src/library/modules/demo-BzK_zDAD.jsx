"use client";

import { t as _View_n } from "./component-BDo0fvGw.jsx";
import * as React from "react";
import * as JSXRuntime from "react/jsx-runtime";
var _View_a = ({ d: e }) => (
  <svg
    viewBox={`0 0 24 24`}
    fill={`none`}
    stroke={`currentColor`}
    strokeWidth={`1.8`}
    strokeLinecap={`round`}
    strokeLinejoin={`round`}
    aria-hidden={`true`}
  >
    <path d={e} />
  </svg>
);
var o = [
  {
    value: `overview`,
    label: `Overview`,
  },
  {
    value: `analytics`,
    label: `Analytics`,
  },
  {
    value: `reports`,
    label: `Reports`,
  },
  {
    value: `notifications`,
    label: `Notifications`,
    count: 3,
  },
];
var s = [
  {
    value: `list`,
    label: `List`,
    icon: <_View_a d={`M9 6h11M9 12h11M9 18h11M4.5 6h.01M4.5 12h.01M4.5 18h.01`} />,
  },
  {
    value: `board`,
    label: `Board`,
    icon: (
      <_View_a
        d={`M5 4h4a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1zM15 4h4a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z`}
      />
    ),
  },
  {
    value: `calendar`,
    label: `Calendar`,
    icon: (
      <_View_a
        d={`M8 3v3M16 3v3M4 9.5h16M6 5h12a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z`}
      />
    ),
  },
];
var c = [
  {
    value: `monthly`,
    label: `Monthly`,
  },
  {
    value: `yearly`,
    label: `Yearly`,
    badge: `Save 20%`,
  },
];
var l = [`analytics`, `reports`, `notifications`, `overview`];
function SegmentedControlDemo() {
  let [e, t] = React.useState(`overview`),
    [a, u] = React.useState(`board`),
    [d, f] = React.useState(`yearly`),
    p = React.useRef([]),
    m = React.useId(),
    h = () => {
      (p.current.forEach(clearTimeout), (p.current = []));
    };
  return (
    React.useEffect(
      () => ((p.current = l.map((e, n) => window.setTimeout(() => t(e), 1e3 + n * 1400))), h),
      [],
    ),
    (
      <div className={`seg-demo`} onPointerDownCapture={h} onKeyDownCapture={h}>
        <div className={`seg-demo__card`}>
          <div className={`seg-demo__row`}>
            <span className={`seg-demo__label`} id={`${m}-section`}>{`Dashboard`}</span>
            <_View_n options={o} value={e} onChange={t} aria-labelledby={`${m}-section`} />
          </div>
          <div className={`seg-demo__row`}>
            <span className={`seg-demo__label`} id={`${m}-view`}>{`Layout`}</span>
            <_View_n options={s} value={a} onChange={u} size={`sm`} aria-labelledby={`${m}-view`} />
          </div>
          <div className={`seg-demo__row`}>
            <span className={`seg-demo__label`} id={`${m}-billing`}>{`Billing`}</span>
            <_View_n
              options={c}
              value={d}
              onChange={f}
              variant={`underline`}
              aria-labelledby={`${m}-billing`}
            />
          </div>
        </div>
      </div>
    )
  );
}
export default SegmentedControlDemo;
export { SegmentedControlDemo as PlicoDemo_u };

"use client";

import { t as _View_n } from "./component-x-U6EJWL.jsx";
import * as React from "react";
import * as JSXRuntime from "react/jsx-runtime";
var a = {
  fill: `none`,
  stroke: `currentColor`,
  strokeWidth: 1.75,
  strokeLinecap: `round`,
  strokeLinejoin: `round`,
};
var _View_o = () => (
  <svg viewBox={`0 0 24 24`} {...a}>
    <path d={`M12 5.5V19`} />
    <path d={`M18 11s-4.42-6-6-6-6 6-6 6`} />
  </svg>
);
var _View_s = () => (
  <svg viewBox={`0 0 24 24`} {...a}>
    <path d={`M18.5 12H5`} />
    <path d={`M13 18s6-4.42 6-6-6-6-6-6`} />
  </svg>
);
var _View_c = () => (
  <svg viewBox={`0 0 24 24`} {...a}>
    <path d={`M12 4v16M20 12H4`} />
  </svg>
);
var _View_l = () => (
  <svg viewBox={`0 0 24 24`} {...a} strokeWidth={2.5}>
    <path d={`M6 12h.01M12 12h.01M18 12h.01`} />
  </svg>
);
var _View_u = () => (
  <svg viewBox={`0 0 24 24`} {...a}>
    <path
      d={`M7.5 14.5c0-3.3 0-4.95 1.03-5.97C9.55 7.5 11.2 7.5 14.5 7.5s4.95 0 5.97 1.03c1.03 1.02 1.03 2.67 1.03 5.97s0 4.95-1.03 5.97c-1.02 1.03-2.67 1.03-5.97 1.03s-4.95 0-5.97-1.03C7.5 19.45 7.5 17.8 7.5 14.5Z`}
    />
    <path
      d={`M7.5 16.5c-1.4 0-2.1 0-2.66-.2a3 3 0 0 1-2.14-2.14c-.2-.57-.2-1.27-.2-2.66v-2c0-3.3 0-4.95 1.03-5.97C4.55 2.5 6.2 2.5 9.5 2.5h2c1.4 0 2.1 0 2.66.2a3 3 0 0 1 2.14 2.14c.2.57.2 1.27.2 2.66`}
    />
  </svg>
);
var _View_d = () => (
  <svg viewBox={`0 0 24 24`} {...a}>
    <path d={`M16.5 7.5S13.19 3 12 3 7.5 7.5 7.5 7.5M12 4v11`} />
    <path d={`M3 16.5v1.5A3 3 0 0 0 6 21h12a3 3 0 0 0 3-3v-1.5`} />
  </svg>
);
var _View_f = () => (
  <svg viewBox={`0 0 24 24`} {...a}>
    <path
      d={`m19.5 5.5-.62 10.03c-.16 2.56-.24 3.84-.88 4.76a4 4 0 0 1-1.2 1.13C15.84 22 14.56 22 12 22s-3.86 0-4.82-.59a4 4 0 0 1-1.2-1.13c-.64-.92-.72-2.2-.88-4.76L4.5 5.5`}
    />
    <path
      d={`M3 5.5h18M16.06 5.5l-.69-1.41c-.45-.94-.68-1.4-1.07-1.7a2 2 0 0 0-.27-.17C13.6 2 13.07 2 12.03 2c-1.06 0-1.6 0-2.04.23a2 2 0 0 0-.27.18c-.4.3-.62.79-1.06 1.76L8.05 5.5M9.5 16.5v-6M14.5 16.5v-6`}
    />
  </svg>
);
var _View_p = () => (
  <svg viewBox={`0 0 24 24`} {...a}>
    <path d={`M5 14l3.5 3.5L19 6.5`} />
  </svg>
);
function m(e = 1600) {
  let [t, n] = React.useState(false),
    i = React.useRef(void 0);
  return (
    React.useEffect(() => () => clearTimeout(i.current), []),
    [
      t,
      () => {
        (clearTimeout(i.current), n(true), (i.current = window.setTimeout(() => n(false), e)));
      },
    ]
  );
}
function _View_h({ children: e }) {
  let t = React.useRef(null),
    [n, a] = React.useState(0);
  return (
    React.useLayoutEffect(() => {
      let e = t.current?.firstElementChild;
      if (!e) return;
      let r = e.getBoundingClientRect().width;
      r > n && a(r);
    }),
    (
      <span
        ref={t}
        className={`button-demo__slot`}
        style={{
          minWidth: n || void 0,
        }}
      >
        {e}
      </span>
    )
  );
}
function ButtonComponent() {
  let [e, t] = React.useState(`idle`);
  return (
    React.useEffect(() => {
      if (e !== `loading`) return;
      let n = window.setTimeout(() => t(`done`), 1600);
      return () => clearTimeout(n);
    }, [e]),
    (
      <div className={`button-demo__row button-demo__compact`}>
        <_View_h>
          <_View_n variant={`ghost`} onClick={() => t(`idle`)}>{`Cancel`}</_View_n>
        </_View_h>
        <_View_h>
          <_View_n
            variant={`secondary`}
            icon={e === `done` ? <_View_p /> : <_View_d />}
            loading={e === `loading`}
            onClick={() => t((e) => (e === `idle` ? `loading` : e))}
          >
            {e === `done` ? `Done` : `Upload`}
          </_View_n>
        </_View_h>
        <_View_h>
          <_View_n iconRight={<_View_o />}>{`Send`}</_View_n>
        </_View_h>
      </div>
    )
  );
}
function _() {
  let [e, t] = m(),
    [a, o] = m(),
    [g, _] = React.useState(`idle`);
  return (
    React.useEffect(() => {
      if (g !== `loading`) return;
      let e = window.setTimeout(() => _(`done`), 1800);
      return () => clearTimeout(e);
    }, [g]),
    (
      <div className={`button-demo__showcase`}>
        <section>
          <h4>{`Styles`}</h4>
          <div className={`button-demo__row`}>
            <_View_h>
              <_View_n>{`Save changes`}</_View_n>
            </_View_h>
            <_View_h>
              <_View_n variant={`secondary`}>{`Secondary`}</_View_n>
            </_View_h>
            <_View_h>
              <_View_n variant={`ghost`}>{`Ghost`}</_View_n>
            </_View_h>
            <_View_h>
              <_View_n variant={`destructive`} icon={<_View_f />}>{`Delete`}</_View_n>
            </_View_h>
          </div>
        </section>
        <section>
          <h4>{`Icons and sizes`}</h4>
          <div className={`button-demo__row`}>
            <_View_h>
              <_View_n variant={`secondary`} size={`sm`} icon={<_View_c />}>{`Add item`}</_View_n>
            </_View_h>
            <_View_h>
              <_View_n iconRight={<_View_s />}>{`Continue`}</_View_n>
            </_View_h>
            <_View_h>
              <_View_n variant={`ghost`} icon={<_View_l />} aria-label={`More options`} />
            </_View_h>
            <_View_h>
              <_View_n variant={`secondary`} size={`lg`}>{`Large`}</_View_n>
            </_View_h>
          </div>
        </section>
        <section>
          <h4>{`Feedback and states`}</h4>
          <div className={`button-demo__row`}>
            <_View_h>
              <_View_n variant={`secondary`} icon={e ? <_View_p /> : <_View_u />} onClick={t}>
                {e ? `Copied` : `Copy link`}
              </_View_n>
            </_View_h>
            <_View_h>
              <_View_n
                variant={`secondary`}
                icon={a ? <_View_p /> : <_View_u />}
                aria-label={a ? `Copied` : `Copy`}
                onClick={o}
              />
            </_View_h>
            <_View_h>
              <_View_n
                variant={`secondary`}
                icon={g === `done` ? <_View_p /> : <_View_d />}
                loading={g === `loading`}
                onClick={() => _((e) => (e === `loading` ? e : `loading`))}
              >{`Upload file`}</_View_n>
            </_View_h>
            <_View_h>
              <_View_n variant={`secondary`} disabled={true}>{`Disabled`}</_View_n>
            </_View_h>
          </div>
          <p className={`button-demo__status`} aria-live={`polite`}>
            {g === `loading` ? `Uploading…` : g === `done` ? `Upload complete` : ` `}
          </p>
        </section>
      </div>
    )
  );
}
function ButtonDemo() {
  return (
    <div className={`button-demo`}>
      <ButtonComponent />
      <_ />
    </div>
  );
}
export default ButtonDemo;
export { ButtonComponent as PlicoCore_g };
export { ButtonDemo as PlicoDemo_v };

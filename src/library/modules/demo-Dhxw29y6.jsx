"use client";

import { t as _View_n } from "./component-XY52GlKn.jsx";
import * as React from "react";
import * as JSXRuntime from "react/jsx-runtime";
var a = [
  {
    id: `revenue`,
    title: `Pull Q3 revenue and ARR`,
    detail: `Monthly revenue, ARR and net retention`,
    tool: `stripe.query`,
  },
  {
    id: `launches`,
    title: `Summarize product launches`,
    detail: `Shipped projects and adoption`,
    tool: `linear.search`,
  },
  {
    id: `slides`,
    title: `Build the KPI slides`,
    detail: `Six charts in the board template`,
    tool: `slides.create`,
  },
  {
    id: `memo`,
    title: `Draft the board memo`,
    detail: `One page, wins, risks and asks`,
    tool: `docs.write`,
  },
  {
    id: `email`,
    title: `Send the draft to Maya for review`,
    tool: `gmail.draft`,
  },
];
var o = {
  revenue: 1300,
  launches: 1100,
  slides: 1400,
  memo: 1250,
  email: 900,
};
var s = `slides`;
function AgentPlanDemo() {
  let [e, t] = React.useState(a),
    [c, l] = React.useState(`draft`),
    u = React.useRef(null),
    d = React.useRef(true),
    f = React.useRef([]),
    p = React.useRef([]),
    m = React.useRef(c);
  m.current = c;
  let h = React.useRef(true),
    g = (e, t, n) => {
      e.current.push(window.setTimeout(t, n));
    },
    _ = (e) => {
      (e.current.forEach((e) => window.clearTimeout(e)), (e.current = []));
    },
    v = (e) => u.current?.querySelector(e)?.click(),
    y = (e, n) =>
      t((t) =>
        t.map((t) =>
          t.id === e
            ? {
                ...t,
                ...n,
              }
            : t,
        ),
      ),
    b = (e, t) => {
      if (t >= e.length) {
        (l(`done`), d.current ? g(f, w, 3600) : g(p, C, 3200));
        return;
      }
      let n = e[t];
      y(n.id, {
        status: `active`,
        error: void 0,
      });
      let r = o[n.id] ?? 1200;
      g(
        p,
        () => {
          if (n.id === s && h.current) {
            ((h.current = false),
              y(n.id, {
                status: `failed`,
                error: `Slides API timed out after 30s`,
              }),
              d.current && g(f, () => v(`.ui-pl__retry`), 1700));
            return;
          }
          (y(n.id, {
            status: `done`,
          }),
            b(e, t + 1));
        },
        r,
      );
    },
    x = (e) => {
      (_(p), (h.current = true));
      let n = e.map(({ status: e, error: t, duration: n, ...r }) => r);
      (t(n), l(`running`), g(p, () => b(n, 0), 350));
    },
    S = (e) => {
      _(p);
      let n = [];
      (t((t) => {
        let r = t.findIndex((t) => t.id === e);
        return (
          (n = t.map((e, t) =>
            t >= r
              ? {
                  ...e,
                  status: `pending`,
                  error: void 0,
                }
              : e,
          )),
          n
        );
      }),
        g(
          p,
          () =>
            b(
              n,
              n.findIndex((t) => t.id === e),
            ),
          250,
        ));
    },
    C = () => {
      (t((e) => e.map(({ status: e, error: t, duration: n, ...r }) => r)), l(`draft`));
    },
    w = () => {
      (_(p),
        t(a),
        l(`draft`),
        g(
          f,
          () =>
            t((e) => {
              let t = e.findIndex((e) => e.id === `memo`);
              if (t < 1) return e;
              let n = e.slice(),
                [r] = n.splice(t, 1);
              return (n.splice(t - 1, 0, r), n);
            }),
          1500,
        ),
        g(f, () => v(`.ui-pl__run`), 3e3));
    };
  React.useEffect(
    () => (
      w(),
      () => {
        (_(f), _(p));
      }
    ),
    [],
  );
  let T = (e) => {
    e && d.current && ((d.current = false), _(f), m.current === `done` && g(p, C, 1200));
  };
  return (
    <div
      ref={u}
      className={`pl-demo`}
      onPointerDownCapture={(e) => T(e.nativeEvent.isTrusted)}
      onKeyDownCapture={(e) => T(e.nativeEvent.isTrusted)}
    >
      <_View_n
        title={`Prepare the Q3 board update`}
        estimate={`~2 min`}
        steps={e}
        status={c}
        onChange={t}
        onRun={x}
        onCancel={() => {
          (_(p), t(a), l(`draft`));
        }}
        onRetry={S}
      />
    </div>
  );
}
export default AgentPlanDemo;
export { AgentPlanDemo as PlicoDemo_c };

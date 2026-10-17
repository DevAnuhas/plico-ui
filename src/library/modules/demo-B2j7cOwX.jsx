"use client";

import { n as _View_t, t as _View_n } from "./component-C_OhOiCe.jsx";
import * as JSXRuntime from "react/jsx-runtime";
var i = {
  Backlog: `#a3a3a3`,
  Todo: `#8f8f8f`,
  "In progress": `#7aa2ff`,
  "In review": `#8b5cf6`,
  Done: `#2f6bff`,
  Canceled: `#c4c4c4`,
};
var a = [
  {
    key: `status`,
    label: `Status`,
    values: [`Backlog`, `Todo`, `In progress`, `In review`, `Done`, `Canceled`],
    icons: {
      Backlog: <_View_t kind={`backlog`} color={i.Backlog} />,
      Todo: <_View_t kind={`todo`} color={i.Todo} />,
      "In progress": <_View_t kind={`progress`} color={i[`In progress`]} />,
      "In review": <_View_t kind={`review`} color={i[`In review`]} />,
      Done: <_View_t kind={`done`} color={i.Done} />,
      Canceled: <_View_t kind={`canceled`} color={i.Canceled} />,
    },
  },
  {
    key: `priority`,
    label: `Priority`,
    values: [`Urgent`, `High`, `Medium`, `Low`, `None`],
    colors: {
      Urgent: `#ec4899`,
      High: `#8b5cf6`,
      Medium: `#2f6bff`,
      Low: `#a9c1ff`,
      None: `#dedede`,
    },
  },
  {
    key: `team`,
    label: `Team`,
    values: [`Design`, `Web`, `Mobile`, `Platform`],
    colors: {
      Design: `#ec4899`,
      Web: `#2f6bff`,
      Mobile: `#8b5cf6`,
      Platform: `#a9c1ff`,
    },
  },
  {
    key: `type`,
    label: `Type`,
    values: [`Feature`, `Bug`, `Chore`],
    colors: {
      Feature: `#2f6bff`,
      Bug: `#ec4899`,
      Chore: `#d4d4d4`,
    },
  },
];
var o = [
  {
    key: `count`,
    label: `Task count`,
    unit: `tasks`,
  },
  {
    key: `points`,
    label: `Story points`,
    unit: `points`,
    field: `points`,
  },
];
var s = (() => {
  let e = 7,
    t = () => ((e = (e * 16807) % 2147483647) - 1) / 2147483646,
    n = (e, n) => {
      let r = t() * n.reduce((e, t) => e + t, 0);
      for (let t = 0; t < e.length; t++) if ((r -= n[t]) < 0) return e[t];
      return e[e.length - 1];
    };
  return Array.from(
    {
      length: 212,
    },
    () => ({
      status: n(a[0].values, [16, 30, 22, 12, 48, 6]),
      priority: n(a[1].values, [6, 18, 34, 22, 20]),
      team: n(a[2].values, [18, 34, 22, 26]),
      type: n(a[3].values, [52, 30, 18]),
      points: n([1, 2, 3, 5, 8], [18, 30, 26, 18, 8]),
    }),
  );
})();
function BreakdownChartDemo() {
  return (
    <div className={`breakdown-demo`}>
      <_View_n title={`Sprint 24`} records={s} dimensions={a} measures={o} />
    </div>
  );
}
export default BreakdownChartDemo;
export { BreakdownChartDemo as PlicoDemo_c };

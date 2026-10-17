"use client";

import { t as _View_n } from "./component-gYCRsgrh.jsx";
import * as React from "react";
import * as JSXRuntime from "react/jsx-runtime";
var periods = [
  {
    id: `month`,
    label: `This month`,
  },
  {
    id: `last`,
    label: `Last month`,
  },
  {
    id: `7d`,
    label: `7 days`,
  },
];
var dailyDateFormatter = new Intl.DateTimeFormat(`en-US`, {
  month: `short`,
  day: `numeric`,
});
var addDays = (date, days) => new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
function generateDaily(date, count, total, seed, length = count) {
  let state = seed,
    random = () => ((state = (state * 16807) % 2147483647) - 1) / 2147483646,
    weights = Array.from(
      {
        length: count,
      },
      (n, r) => {
        let i = addDays(date, r).getDay();
        return (i === 0 || i === 6 ? 0.45 : 1) * (0.7 + random() * 0.6) * (1 + r / count / 3);
      },
    ),
    weightSum = weights.reduce((e, t) => e + t, 0),
    allocations = weights.map((e) => Math.round((e / weightSum) * total));
  return (
    (allocations[allocations.length - 1] += total - allocations.reduce((e, t) => e + t, 0)),
    Array.from(
      {
        length: length,
      },
      (n, r) => ({
        label: dailyDateFormatter.format(addDays(date, r)),
        value: r < count ? allocations[r] : null,
      }),
    )
  );
}
var demoData = {
  month: {
    used: [
      {
        label: `Chat`,
        value: 3980,
      },
      {
        label: `Search`,
        value: 1640,
      },
      {
        label: `Image`,
        value: 1120,
      },
      {
        label: `API`,
        value: 680,
      },
    ],
    limits: [
      {
        label: `Seats`,
        used: 8,
        total: 10,
      },
      {
        label: `Storage`,
        used: 3.2,
        total: 5,
        unit: `GB`,
      },
      {
        label: `Projects`,
        used: 12,
        total: null,
      },
    ],
    days: (e) => generateDaily(addDays(e, -21), 22, 7420, 11, 30),
  },
  last: {
    used: [
      {
        label: `Chat`,
        value: 5210,
      },
      {
        label: `Search`,
        value: 2140,
      },
      {
        label: `Image`,
        value: 1690,
      },
      {
        label: `API`,
        value: 960,
      },
    ],
    limits: [
      {
        label: `Seats`,
        used: 10,
        total: 10,
      },
      {
        label: `Storage`,
        used: 2.9,
        total: 5,
        unit: `GB`,
      },
      {
        label: `Projects`,
        used: 11,
        total: null,
      },
    ],
    days: (e) => generateDaily(addDays(e, -51), 30, 1e4, 29),
  },
  "7d": {
    used: [
      {
        label: `Chat`,
        value: 1260,
      },
      {
        label: `Search`,
        value: 540,
      },
      {
        label: `API`,
        value: 340,
      },
    ],
    limits: [
      {
        label: `Seats`,
        used: 8,
        total: 10,
      },
      {
        label: `Storage`,
        used: 3.2,
        total: 5,
        unit: `GB`,
      },
      {
        label: `Projects`,
        used: 12,
        total: null,
      },
    ],
    days: (e) => generateDaily(addDays(e, -6), 7, 2140, 5),
  },
};
function UsageMeterDemo() {
  let [period, setPeriod] = React.useState(`month`),
    pausedRef = React.useRef(false),
    baseDate = React.useMemo(() => {
      let e = new Date();
      return new Date(e.getFullYear(), e.getMonth(), e.getDate());
    }, []),
    dailyData = React.useMemo(() => demoData[period].days(baseDate), [period, baseDate]);
  return (
    React.useEffect(() => {
      let e = [`last`, `7d`, `month`].map((e, n) =>
        window.setTimeout(() => !pausedRef.current && setPeriod(e), 3600 + n * 3200),
      );
      return () => e.forEach(clearTimeout);
    }, []),
    (
      <div
        className={`usage-demo`}
        onPointerDown={() => (pausedRef.current = true)}
        onKeyDown={() => (pausedRef.current = true)}
      >
        <_View_n
          title={`Acme AI`}
          plan={`Pro plan`}
          total={1e4}
          used={demoData[period].used}
          limits={demoData[period].limits}
          daily={dailyData}
          periods={periods}
          period={period}
          onPeriodChange={setPeriod}
          resetAt={addDays(baseDate, 9)}
          onUpgrade={() => {}}
        />
      </div>
    )
  );
}
export default UsageMeterDemo;
export { UsageMeterDemo as PlicoDemo_u };

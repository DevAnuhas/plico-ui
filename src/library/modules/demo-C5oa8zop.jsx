"use client";

import { t as _View_t } from "./component-cuEFw_I6.jsx";
import * as JSXRuntime from "react/jsx-runtime";
var demoLabels = [`Mar 3`, `Mar 4`, `Mar 5`, `Mar 6`, `Mar 7`, `Mar 8`, `Mar 9`];
var demoTooltipLabels = [
  `Mon, Mar 3`,
  `Tue, Mar 4`,
  `Wed, Mar 5`,
  `Thu, Mar 6`,
  `Fri, Mar 7`,
  `Sat, Mar 8`,
  `Sun, Mar 9`,
];
var demoColors = [`#2f6bff`, `#ec4899`, `#8b5cf6`, `#14b8a6`, `#a3a3a3`];
var demoChannels = [`Organic`, `Paid ads`, `Referral`, `Email`, `Direct`];
var demoSeries = ((e) =>
  e.map((e, t) => ({
    label: demoChannels[t],
    color: demoColors[t],
    values: e,
  })))([
  [4200, 4700, 3900, 4600, 5400, 5100, 5900],
  [3600, 3300, 4400, 4800, 4e3, 4500, 4200],
  [1800, 2300, 2e3, 1500, 2400, 2200, 2700],
  [1200, 1100, 1700, 2100, 1600, 1300, 1500],
  [600, 900, 700, 800, 1e3, 1400, 1100],
]);
var formatDemoCurrency = (value) =>
  value >= 1e3 ? `$${+(value / 1e3).toFixed(1)}k` : `$${Math.round(value)}`;
function KPIChartDemo() {
  return (
    <div className={`kpi-demo`}>
      <_View_t
        title={`Revenue`}
        value={`$96.4k`}
        delta={7900}
        format={formatDemoCurrency}
        labels={demoLabels}
        tooltipLabels={demoTooltipLabels}
        series={demoSeries}
        footer={`Top 5 channels`}
      />
    </div>
  );
}
export default KPIChartDemo;
export { KPIChartDemo as PlicoDemo_l };

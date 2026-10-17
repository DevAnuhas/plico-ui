"use client";

import { t as _View_t } from "./component-LyBMd15F.jsx";
import * as JSXRuntime from "react/jsx-runtime";
var r = [
  {
    id: `stage`,
    label: `Stage`,
    options: [
      {
        id: `new`,
        label: `New lead`,
      },
      {
        id: `qualified`,
        label: `Qualified`,
      },
      {
        id: `proposal`,
        label: `Proposal sent`,
      },
      {
        id: `negotiation`,
        label: `Negotiation`,
      },
    ],
  },
  {
    id: `value`,
    label: `Deal size`,
    chipPrefix: `Deal: `,
    options: [
      {
        id: `s`,
        label: `Under $5k`,
      },
      {
        id: `m`,
        label: `$5k–20k`,
      },
      {
        id: `l`,
        label: `$20k–50k`,
      },
      {
        id: `xl`,
        label: `Over $50k`,
      },
    ],
  },
  {
    id: `region`,
    label: `Region`,
    options: [
      {
        id: `dach`,
        label: `DACH`,
      },
      {
        id: `nordics`,
        label: `Nordics`,
      },
      {
        id: `uk`,
        label: `UK & Ireland`,
      },
      {
        id: `na`,
        label: `North America`,
      },
      {
        id: `apac`,
        label: `APAC`,
      },
    ],
  },
];
function FilterMenuDemo() {
  return (
    <div className={`filter-menu-demo`}>
      <_View_t
        groups={r}
        defaultValue={{
          stage: [`qualified`],
          value: [`m`],
          region: [`dach`],
        }}
      />
    </div>
  );
}
export default FilterMenuDemo;
export { FilterMenuDemo as PlicoDemo_i };

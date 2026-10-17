"use client";

import { n as _View_n, t as _View_r } from "./component-CA_4LgO0.jsx";
import * as React from "react";
import * as JSXRuntime from "react/jsx-runtime";
var o = [0, 1500, 2700, 4300, 5400, 6700, 8e3];
var s = 11500;
var c = {
  results: [
    {
      title: `HubSpot Sales Hub pricing`,
      url: `https://www.hubspot.com/pricing/sales`,
      price_per_seat: 90,
    },
    {
      title: `Pipedrive plans and pricing`,
      url: `https://www.pipedrive.com/en/pricing`,
      price_per_seat: 49,
    },
    {
      title: `Attio pricing`,
      url: `https://attio.com/pricing`,
      price_per_seat: 59,
    },
    {
      title: `Salesforce Starter Suite`,
      url: `https://www.salesforce.com/sales/pricing`,
      price_per_seat: 25,
    },
    {
      title: `Close CRM pricing`,
      url: `https://www.close.com/pricing`,
      price_per_seat: 49,
    },
  ],
  total: 5,
  cached: false,
};
function ToolCallCardDemo() {
  let [e, t] = React.useState(0),
    [l, p] = React.useState(0),
    [m, h] = React.useState(true),
    g = React.useRef(false);
  React.useEffect(() => {
    ((g.current = false), p(0), h(true));
    let e = o.slice(1).map((e, t) => window.setTimeout(() => p((e) => Math.max(e, t + 1)), e));
    return (
      e.push(window.setTimeout(() => !g.current && h(false), o[6])),
      e.push(window.setTimeout(() => !g.current && t((e) => e + 1), s)),
      () => e.forEach(clearTimeout)
    );
  }, [e]);
  let _ = l === 2 ? `error` : l >= 4 ? `success` : `running`;
  return (
    <div className={`tc-demo`}>
      <div className={`tc-demo__chat`}>
        <p
          className={`tc-demo__you`}
        >{`Compare CRM pricing for our 10-person team and check open deals.`}</p>
        <_View_n
          open={m}
          onOpenChange={(e) => {
            ((g.current = true), h(e));
          }}
          key={e}
        >
          <_View_r
            name={`search_web`}
            icon={<_View_u />}
            status={l >= 1 ? `success` : `running`}
            summary={
              l >= 1
                ? `Searched the web for 'CRM pricing 2026'`
                : `Searching the web for 'CRM pricing 2026'`
            }
            args={{
              query: `CRM pricing 2026 small sales team`,
              max_results: 5,
            }}
            result={l >= 1 ? c : void 0}
          />
          {l >= 1 && (
            <_View_r
              name={`fetch_page`}
              icon={<_View_d />}
              status={_}
              summary={_ === `success` ? `Read hubspot.com/pricing` : `Reading hubspot.com/pricing`}
              args={{
                url: `https://www.hubspot.com/pricing/sales`,
                timeout_ms: 8e3,
              }}
              result={
                _ === `success`
                  ? {
                      status: 200,
                      title: `Sales Hub Pricing`,
                      words: 2140,
                    }
                  : void 0
              }
              error={`Request timed out after 8s – hubspot.com didn't respond.`}
              onRetry={() => p((e) => Math.max(e, 3))}
            />
          )}
          {l >= 4 && (
            <_View_r
              name={`crm.list_deals`}
              icon={<_View_f />}
              status={l >= 5 ? `success` : `running`}
              summary={l >= 5 ? `Found 4 open deals in negotiation` : `Looking up open deals`}
              args={{
                stage: `negotiation`,
                owner: `me`,
                limit: 10,
              }}
              result={
                l >= 5
                  ? {
                      count: 4,
                      deals: [
                        {
                          name: `Northwind`,
                          value: 18400,
                        },
                        {
                          name: `Globex`,
                          value: 9600,
                        },
                      ],
                    }
                  : void 0
              }
            />
          )}
        </_View_n>
      </div>
    </div>
  );
}
function _View_u() {
  return (
    <svg viewBox={`0 0 16 16`}>
      <circle cx={`7`} cy={`7`} r={`4.25`} />
      <path d={`m10.25 10.25 3 3`} />
    </svg>
  );
}
function _View_d() {
  return (
    <svg viewBox={`0 0 16 16`}>
      <path d={`M4 2.75h5l3 3v7.5H4z`} />
      <path d={`M9 2.75v3h3M6 9h4M6 11h3`} />
    </svg>
  );
}
function _View_f() {
  return (
    <svg viewBox={`0 0 16 16`}>
      <ellipse cx={`8`} cy={`4`} rx={`4.75`} ry={`1.75`} />
      <path
        d={`M3.25 4v8c0 .97 2.13 1.75 4.75 1.75s4.75-.78 4.75-1.75V4M3.25 8c0 .97 2.13 1.75 4.75 1.75S12.75 8.97 12.75 8`}
      />
    </svg>
  );
}
export default ToolCallCardDemo;
export { ToolCallCardDemo as PlicoDemo_l };

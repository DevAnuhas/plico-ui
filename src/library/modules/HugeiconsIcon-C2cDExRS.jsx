"use client";

import * as React from "react";
var svgDefaults = {
  xmlns: `http://www.w3.org/2000/svg`,
  width: 24,
  height: 24,
  viewBox: `0 0 24 24`,
  fill: `none`,
};
var HugeiconsIcon = React.forwardRef(
  (
    {
      color: e = `currentColor`,
      size: r = 24,
      strokeWidth: i,
      absoluteStrokeWidth: a = false,
      className: o = ``,
      altIcon: s,
      showAlt: c = false,
      icon: l,
      primaryColor: u,
      secondaryColor: d,
      disableSecondaryOpacity: f = false,
      ...p
    },
    m,
  ) => {
    let h = i === void 0 ? void 0 : a ? (Number(i) * 24) / Number(r) : i,
      g =
        h === void 0
          ? {}
          : {
              strokeWidth: h,
              stroke: `currentColor`,
            },
      _ = {
        ref: m,
        ...svgDefaults,
        width: r,
        height: r,
        color: u || e,
        className: o,
        ...g,
        ...p,
      },
      v = [...(c && s ? s : l)]
        .sort(([, e], [, t]) => {
          let n = e.opacity !== void 0;
          return t.opacity === void 0 ? (n ? -1 : 0) : 1;
        })
        .map(([n, r]) => {
          let i = r.opacity !== void 0,
            a = i && !f ? r.opacity : void 0,
            o = d
              ? {
                  ...(r.stroke === void 0
                    ? {
                        fill: i ? d : u || e,
                      }
                    : {
                        stroke: i ? d : u || e,
                      }),
                }
              : {};
          return React.createElement(n, {
            ...r,
            ...g,
            ...o,
            opacity: a,
            key: r.key,
          });
        });
    return React.createElement(`svg`, _, v);
  },
);
export { HugeiconsIcon as t };

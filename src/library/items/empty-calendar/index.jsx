"use client";
import * as React from "react";
import { PlicoDemo_s as PublicDemo } from "../../modules/demo-MXjIQshC.jsx";
export { EmptyCalendar as Component } from "./Component";
export { EmptyCalendar as EmptyCalendar } from "./Component";
const demoStyles =
  ".empty-calendar-demo{width:100%}.stage .empty-calendar-demo{width:min(100%,560px)}.card__preview .empty-calendar-demo{place-items:center;width:auto;display:grid;position:absolute;inset:0}.card__preview .empty-calendar-demo .ui-ec{width:auto;height:100%}\n";
export function Demo(props) {
  return (
    <>
      <style href="plico-demo-empty-calendar" precedence="default">
        {demoStyles}
      </style>
      <PublicDemo {...props} />
    </>
  );
}
export { Demo as EmptyCalendarDemo };
export default Demo;

export * from "./Component";

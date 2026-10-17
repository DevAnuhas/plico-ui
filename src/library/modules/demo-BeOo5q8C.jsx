"use client";

import { PreviewFrame as _View_t, navigateScreen as n } from "../screen-bridge.jsx";
import { r as _View_r, t as _View_i } from "./component-B0ZYbJEt.jsx";
import * as JSXRuntime from "react/jsx-runtime";
function AppShellDemo() {
  return (
    <_View_t>
      <_View_i active={`New chat`} onNavigate={n}>
        <div className={`ui-as-page`}>
          <h1 className={`ui-as-page-title`}>{`Overview`}</h1>
          <p className={`ui-as-page-sub`}>{`Everything in your workspace at a glance.`}</p>
          <div
            style={{
              marginTop: 28,
            }}
          >
            <_View_r
              tall={true}
              title={`Your page goes here`}
              text={`The shell brings the sidebar and the scroll container – put any screen inside.`}
            />
          </div>
        </div>
      </_View_i>
    </_View_t>
  );
}
export default AppShellDemo;
export { AppShellDemo as PlicoDemo_o };

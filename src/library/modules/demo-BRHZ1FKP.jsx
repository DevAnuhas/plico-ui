"use client";

import { i as n, r as _View_r } from "./index-CA7yMmEL.jsx";
import * as React from "react";
import * as JSXRuntime from "react/jsx-runtime";
var o = (e, t = false) =>
  new Promise((n, r) => window.setTimeout(() => (t ? r(Error(`Timeout`)) : n()), e));
var ToasterComponent = ({ d: e }) => (
  <svg viewBox={`0 0 24 24`} aria-hidden={`true`}>
    <path d={e} />
  </svg>
);
var c = {
  save: `M6 4h9.5L20 8.5V18a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zM8 4v4.5h7V4M8 20v-6h8v6`,
  trash: `M4.5 7h15M10 11v5.5M14 11v5.5M6 7l.8 11.2A2 2 0 0 0 8.8 20h6.4a2 2 0 0 0 2-1.8L18 7M9.5 7V5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v2`,
  upload: `M12 15V4M7.5 8.5 12 4l4.5 4.5M5 15v3.5A1.5 1.5 0 0 0 6.5 20h11a1.5 1.5 0 0 0 1.5-1.5V15`,
  sync: `M19.5 12a7.5 7.5 0 0 1-13.3 4.8M4.5 12a7.5 7.5 0 0 1 13.3-4.8M18 3.5v4h-4M6 20.5v-4h4`,
  doc: `M7 3.5h7l4.5 4.5v11a1.5 1.5 0 0 1-1.5 1.5H7A1.5 1.5 0 0 1 5.5 19V5A1.5 1.5 0 0 1 7 3.5zM14 3.5V8h4.5M8.5 12.5h7M8.5 16h5`,
};
function ToasterDemo() {
  let e = React.useId(),
    t = React.useRef(new Set()),
    l = (t = {}) => ({
      toaster: e,
      ...t,
    }),
    u = (e) => t.current.add(e),
    d = (e) =>
      u(
        n.success(
          `Draft saved`,
          l({
            description: `Q3 Board Report · all changes kept`,
            ...e,
          }),
        ),
      ),
    f = (e) =>
      u(
        n(`File moved to trash`, {
          ...l(e),
          description: `Budget-2027.xlsx`,
          icon: <ToasterComponent d={c.trash} />,
          action: {
            label: `Undo`,
            onClick: () =>
              u(
                n.success(
                  `File restored`,
                  l({
                    description: `Budget-2027.xlsx is back in Reports`,
                  }),
                ),
              ),
          },
        }),
      ),
    p = (t) => {
      let r = `${e}-upload-${Date.now()}`;
      (u(r),
        n.promise(
          o(2400),
          {
            loading: {
              title: `Uploading report…`,
              description: `Q3-Board-Report.pdf · 4.2\xA0MB`,
            },
            success: {
              title: `Report uploaded`,
              description: `Shared with 4 people in Finance`,
            },
            error: `Upload failed`,
          },
          {
            ...l(t),
            id: r,
          },
        ));
    };
  return (
    React.useEffect(() => {
      let e = [
          window.setTimeout(
            () =>
              d({
                duration: 9e3,
              }),
            500,
          ),
          window.setTimeout(
            () =>
              f({
                duration: 9e3,
              }),
            1300,
          ),
          window.setTimeout(
            () =>
              p({
                duration: 9e3,
              }),
            2100,
          ),
        ],
        r = t.current;
      return () => {
        (e.forEach(clearTimeout), r.forEach((e) => n.dismiss(e)), r.clear());
      };
    }, []),
    (
      <div className={`toaster-demo`}>
        <div className={`toaster-demo__col`}>
          <div className={`toaster-demo__panel`}>
            <div className={`toaster-demo__card`}>
              <div className={`toaster-demo__head`}>
                <span className={`toaster-demo__doc`}>
                  <ToasterComponent d={c.doc} />
                </span>
                <div className={`toaster-demo__meta`}>
                  <span className={`toaster-demo__name`}>{`Q3 Board Report`}</span>
                  <span className={`toaster-demo__sub`}>{`Finance · edited 2 min ago`}</span>
                </div>
              </div>
              <div className={`toaster-demo__grid`}>
                <button type={`button`} className={`toaster-demo__btn`} onClick={() => d()}>
                  <ToasterComponent d={c.save} />
                  {`Save draft`}
                </button>
                <button type={`button`} className={`toaster-demo__btn`} onClick={() => f()}>
                  <ToasterComponent d={c.trash} />
                  {`Delete file`}
                </button>
                <button type={`button`} className={`toaster-demo__btn`} onClick={() => p()}>
                  <ToasterComponent d={c.upload} />
                  {`Upload report`}
                </button>
                <button
                  type={`button`}
                  className={`toaster-demo__btn`}
                  onClick={() => {
                    let t = `${e}-sync-${Date.now()}`;
                    (u(t),
                      n.promise(
                        o(2200, true),
                        {
                          loading: `Syncing with Google Drive…`,
                          success: `Synced`,
                          error: {
                            title: `Couldn't sync`,
                            description: `Google Drive didn't respond. Try again in a minute.`,
                          },
                        },
                        l({
                          id: t,
                        }),
                      ));
                  }}
                >
                  <ToasterComponent d={c.sync} />
                  {`Sync`}
                </button>
              </div>
            </div>
            <p className={`toaster-demo__foot`}>
              {`Press `}
              <kbd>{`F8`}</kbd>
              {` to jump to notifications`}
            </p>
          </div>
          <div className={`toaster-demo__slot`}>
            <_View_r id={e} inline={true} position={`top-center`} />
          </div>
        </div>
      </div>
    )
  );
}
export default ToasterDemo;
export { ToasterComponent as PlicoCore_s };
export { ToasterDemo as PlicoDemo_l };

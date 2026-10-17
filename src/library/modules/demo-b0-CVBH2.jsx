"use client";

import * as React from "react";
import * as JSXRuntime from "react/jsx-runtime";
var prefersReducedMotion = () =>
  typeof window < `u` && window.matchMedia?.(`(prefers-reduced-motion: reduce)`).matches;
function BlurCrossfade({
  id: id,
  children: children,
  duration = 420,
  blur = 10,
  morph = `height`,
  as: Tag = `div`,
  className: className,
  style: style,
}) {
  let outerRef = React.useRef(null),
    incomingRef = React.useRef(null),
    [outgoing, setOutgoing] = React.useState(null),
    previousIdRef = React.useRef(id),
    previousChildrenRef = React.useRef(children),
    sizeRef = React.useRef({
      w: 0,
      h: 0,
    }),
    busyRef = React.useRef(false),
    cleanupTimerRef = React.useRef(0),
    transitionCountRef = React.useRef(0);
  (React.useLayoutEffect(() => {
    let n = outerRef.current,
      r = incomingRef.current;
    if (id === previousIdRef.current || !n || !r) {
      previousChildrenRef.current = children;
      return;
    }
    previousIdRef.current = id;
    let o = previousChildrenRef.current;
    ((previousChildrenRef.current = children), window.clearTimeout(cleanupTimerRef.current));
    let s = {
      w: r.offsetWidth,
      h: r.offsetHeight,
    };
    if (prefersReducedMotion() || duration <= 0) {
      (setOutgoing(null),
        (n.style.height = n.style.width = n.style.transition = ``),
        n.removeAttribute(`data-busy`),
        (busyRef.current = false),
        (sizeRef.current = s));
      return;
    }
    let l = n.getBoundingClientRect(),
      u = busyRef.current
        ? {
            w: l.width,
            h: l.height,
          }
        : sizeRef.current;
    if (
      (setOutgoing({
        id: previousIdRef.current,
        node: o,
        n: ++transitionCountRef.current,
        w: sizeRef.current.w,
        h: sizeRef.current.h,
      }),
      (sizeRef.current = s),
      (busyRef.current = true),
      n.setAttribute(`data-busy`, ``),
      morph !== `none`)
    ) {
      ((n.style.transition = `none`),
        (n.style.height = `${u.h}px`),
        morph === `both` && (n.style.width = `${u.w}px`),
        n.offsetHeight);
      let e = `${duration}ms cubic-bezier(0.22, 1, 0.36, 1)`;
      ((n.style.transition = morph === `both` ? `height ${e}, width ${e}` : `height ${e}`),
        (n.style.height = `${s.h}px`),
        morph === `both` && (n.style.width = `${s.w}px`));
    }
    cleanupTimerRef.current = window.setTimeout(() => {
      ((n.style.height = n.style.width = n.style.transition = ``),
        n.removeAttribute(`data-busy`),
        (busyRef.current = false),
        setOutgoing(null));
    }, duration + 30);
  }),
    React.useEffect(() => {
      let e = incomingRef.current;
      if (!e || typeof ResizeObserver > `u`) return;
      let t = new ResizeObserver(() => {
        busyRef.current ||
          (sizeRef.current = {
            w: e.offsetWidth,
            h: e.offsetHeight,
          });
      });
      return (
        t.observe(e),
        (sizeRef.current = {
          w: e.offsetWidth,
          h: e.offsetHeight,
        }),
        () => t.disconnect()
      );
    }, [id]),
    React.useEffect(() => () => window.clearTimeout(cleanupTimerRef.current), []));
  let mergedStyle = {
      "--ui-bx-duration": `${duration}ms`,
      "--ui-bx-blur": `${blur}px`,
      ...style,
    },
    LayerTag = Tag;
  return (
    <>
      <style href={`ui-blur-crossfade`} precedence={`default`}>
        {blurCrossfadeStyles}
      </style>
      <Tag
        ref={outerRef}
        className={[`ui-bx`, `ui-bx--${morph}`, className].filter(Boolean).join(` `)}
        style={mergedStyle}
      >
        <LayerTag
          ref={incomingRef}
          className={`ui-bx__layer${outgoing ? ` ui-bx__layer--in` : ``}`}
          key={`c-${id}`}
        >
          {children}
        </LayerTag>
        {outgoing && (
          <LayerTag
            className={`ui-bx__layer ui-bx__layer--out`}
            aria-hidden={`true`}
            inert={true}
            style={{
              width: outgoing.w || void 0,
            }}
            key={`x-${outgoing.id}-${outgoing.n}`}
          >
            {outgoing.node}
          </LayerTag>
        )}
      </Tag>
    </>
  );
}
var blurCrossfadeStyles = `
.ui-bx {
  --ui-bx-duration: 420ms;
  --ui-bx-blur: 10px;
  --ui-bx-ease: cubic-bezier(0.22, 1, 0.36, 1);
  position: relative;
  display: block;
}
.ui-bx--both {
  display: inline-block;
  vertical-align: top;
}
/* Clip only while swapping, so shadows and focus rings show the rest of the time */
.ui-bx[data-busy] { overflow: hidden; }

.ui-bx__layer { display: block; }
.ui-bx--both > .ui-bx__layer { width: max-content; }
.ui-bx__layer--out {
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
}
.ui-bx--height > .ui-bx__layer--out,
.ui-bx--none > .ui-bx__layer--out { right: 0; }
/* With width morph both layers stay centered in the gliding box */
.ui-bx--both > .ui-bx__layer--out { left: 50%; translate: -50% 0; }
.ui-bx--both > .ui-bx__layer--in { margin-left: 50%; translate: -50% 0; }

.ui-bx__layer--in {
  animation: ui-bx-in var(--ui-bx-duration) var(--ui-bx-ease) both;
}
.ui-bx__layer--out {
  animation: ui-bx-out calc(var(--ui-bx-duration) * 0.8) ease-in both;
}
@keyframes ui-bx-in {
  from { opacity: 0; filter: blur(var(--ui-bx-blur)); transform: scale(0.98); }
  to { opacity: 1; filter: blur(0); transform: scale(1); }
}
@keyframes ui-bx-out {
  from { opacity: 1; filter: blur(0); transform: scale(1); }
  to { opacity: 0; filter: blur(var(--ui-bx-blur)); transform: scale(1.02); }
}

@media (prefers-reduced-motion: reduce) {
  .ui-bx__layer--in, .ui-bx__layer--out { animation: none; }
  .ui-bx__layer--out { display: none; }
}

/* Dark mode: follows a .dark class or data-theme="dark" on any ancestor, e.g. <html>.
   The crossfade has no colors of its own – the content inside brings them. */
:where(.dark, [data-theme="dark"]) .ui-bx { color: inherit; }
`;
var demoNotes = [
  {
    tag: `Shipped`,
    text: `Dark mode is live for everyone.`,
  },
  {
    tag: `Improved`,
    text: `Search now looks through comments and attachments too, and results show up while you type – no more waiting for the full page.`,
  },
  {
    tag: `Fixed`,
    text: `Exports keep their column order, even with hidden fields in between.`,
  },
];
function BlurCrossfadeDemo() {
  let rootRef = React.useRef(null),
    [publishState, setPublishState] = React.useState(`idle`),
    [noteIndex, setNoteIndex] = React.useState(0),
    timersRef = React.useRef([]),
    publish = () => {
      publishState === `idle` &&
        (setPublishState(`busy`),
        timersRef.current.push(
          window.setTimeout(() => setPublishState(`done`), 1500),
          window.setTimeout(() => setPublishState(`idle`), 3600),
        ));
    },
    nextNote = () => setNoteIndex((e) => (e + 1) % demoNotes.length);
  (React.useEffect(() => () => timersRef.current.forEach((e) => window.clearTimeout(e)), []),
    React.useEffect(() => {
      if (!rootRef.current?.closest(`.card__preview`)) return;
      let t = 0,
        n = window.setInterval(() => {
          (t++,
            t % 2
              ? setNoteIndex((e) => (e + 1) % demoNotes.length)
              : setPublishState((e) => (e === `idle` ? `busy` : e === `busy` ? `done` : `idle`)));
        }, 1300);
      return () => window.clearInterval(n);
    }, []));
  let note = demoNotes[noteIndex];
  return (
    <div className={`blur-crossfade-demo`} ref={rootRef}>
      <div className={`bxd-card`}>
        <div className={`bxd-head`}>
          <div className={`bxd-meta`}>
            <span className={`bxd-title`}>{`Release 2.4`}</span>
            <span className={`bxd-sub`}>{`3 changes · draft`}</span>
          </div>
          <button
            type={`button`}
            className={`bxd-primary`}
            data-status={publishState}
            onClick={publish}
            aria-live={`polite`}
          >
            <BlurCrossfade id={publishState} morph={`both`} as={`span`} blur={6} duration={380}>
              {publishState === `idle` && <span className={`bxd-btn`}>{`Publish`}</span>}
              {publishState === `busy` && (
                <span className={`bxd-btn`}>
                  <span className={`bxd-spin`} aria-hidden={`true`} />
                  {`Publishing…`}
                </span>
              )}
              {publishState === `done` && (
                <span className={`bxd-btn`}>
                  <svg
                    viewBox={`0 0 16 16`}
                    width={`14`}
                    height={`14`}
                    fill={`none`}
                    stroke={`currentColor`}
                    strokeWidth={`1.8`}
                    strokeLinecap={`round`}
                    strokeLinejoin={`round`}
                    aria-hidden={`true`}
                  >
                    <path d={`M3.5 8.5l3 3 6-7`} />
                  </svg>
                  {`Published`}
                </span>
              )}
            </BlurCrossfade>
          </button>
        </div>
        <div className={`bxd-panel`}>
          <BlurCrossfade id={noteIndex}>
            <div className={`bxd-note`}>
              <span className={`bxd-tag`} data-kind={note.tag}>
                {note.tag}
              </span>
              <p>{note.text}</p>
            </div>
          </BlurCrossfade>
        </div>
        <div className={`bxd-foot`}>
          <span className={`bxd-dots`} aria-hidden={`true`}>
            {demoNotes.map((e, t) => (
              <i data-on={t === noteIndex || void 0} key={t} />
            ))}
          </span>
          <button type={`button`} className={`bxd-chip`} onClick={nextNote}>{`Next`}</button>
        </div>
      </div>
    </div>
  );
}
export default BlurCrossfadeDemo;
export { BlurCrossfade as PlicoCore_a };
export { BlurCrossfadeDemo as PlicoDemo_c };

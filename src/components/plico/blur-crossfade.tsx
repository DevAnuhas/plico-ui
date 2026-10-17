"use client";

import * as React from "react";
type CSSVariables = React.CSSProperties & {
  [key: `--${string}`]: string | number;
};
interface BlurCrossfadeProps {
  id: string | number;
  children?: React.ReactNode;
  duration?: number;
  blur?: number;
  morph?: "height" | "both" | "none";
  as?: "div" | "span";
  className?: string;
  style?: React.CSSProperties;
}
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
}: BlurCrossfadeProps) {
  let outerRef = React.useRef<HTMLDivElement | null>(null),
    incomingRef = React.useRef<HTMLDivElement | null>(null),
    [outgoing, setOutgoing] = React.useState<{
      id: string | number;
      node: React.ReactNode;
      n: number;
      w: number;
      h: number;
    } | null>(null),
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
    } as CSSVariables,
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
function BlurCrossfadeDemo2() {
  let rootRef = React.useRef<HTMLDivElement | null>(null),
    [publishState, setPublishState] = React.useState(`idle`),
    [noteIndex, setNoteIndex] = React.useState(0),
    timersRef = React.useRef<number[]>([]),
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
const demoStyles =
  ".blur-crossfade-demo{-webkit-font-smoothing:antialiased;color:#171717;grid-template-columns:minmax(0,1fr);place-items:center;width:100%;font-family:Inter,ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,sans-serif;display:grid}.bxd-card{background:#fff;border:1px solid #e5e5e5;border-radius:16px;width:min(100%,360px);padding:16px;box-shadow:0 1px 2px #0000000f}.bxd-head{justify-content:space-between;align-items:center;gap:12px;min-height:32px;display:flex}.bxd-meta{gap:2px;min-width:0;display:grid}.bxd-title{letter-spacing:-.01em;font-size:14px;font-weight:600}.bxd-sub{color:#8f8f8f;font-size:12px}.bxd-primary{color:#fff;height:30px;font:inherit;cursor:pointer;background:linear-gradient(#323137,#201e25);border:0;border-radius:9px;flex:none;padding:0 12px;font-size:12.5px;font-weight:500;transition:background .3s;box-shadow:0 1px 2px #0000002e,inset 0 1px #ffffff1a}.bxd-primary[data-status=busy]{cursor:progress}.bxd-primary[data-status=done]{background:linear-gradient(#1aa774,#0f8a5f)}.bxd-primary:focus-visible{outline-offset:2px;outline:2px solid #2f6bff}.bxd-btn{white-space:nowrap;align-items:center;gap:6px;height:30px;display:inline-flex}.bxd-spin{border:1.5px solid #ffffff4d;border-top-color:#fff;border-radius:999px;width:12px;height:12px;animation:.7s linear infinite bxd-spin}@keyframes bxd-spin{to{transform:rotate(360deg)}}.bxd-panel{background:#f7f7f8;border-radius:12px;margin-top:14px;padding:12px 14px}.bxd-note{justify-items:start;gap:6px;display:grid}.bxd-note p{color:#404040;text-wrap:pretty;margin:0;font-size:13px;line-height:1.5}.bxd-tag{border-radius:999px;padding:2px 7px;font-size:11px;font-weight:600}.bxd-tag[data-kind=Shipped]{color:#0f9f6e;background:#10b9811f}.bxd-tag[data-kind=Improved]{color:#2f6bff;background:#2f6bff1a}.bxd-tag[data-kind=Fixed]{color:#b86e00;background:#f59e0b24}.bxd-foot{justify-content:space-between;align-items:center;margin-top:12px;display:flex}.bxd-dots{gap:5px;display:inline-flex}.bxd-dots i{background:#e0e0e2;border-radius:999px;width:6px;height:6px;transition:background .3s,width .3s}.bxd-dots i[data-on]{background:#171717;width:16px}.bxd-chip{color:#171717;height:30px;font:inherit;cursor:pointer;background:#fff;border:0;border-radius:9px;padding:0 12px;font-size:12.5px;font-weight:500;box-shadow:0 0 0 1px #e5e5e5,0 1px 2px #0000000a}.bxd-chip:hover{background:#fafafa}.bxd-chip:focus-visible{outline-offset:2px;outline:2px solid #2f6bff}@media (prefers-reduced-motion:reduce){.bxd-spin{animation-duration:2s}}:where(.dark,[data-theme=dark]) .blur-crossfade-demo{color:#ededed}:where(.dark,[data-theme=dark]) .bxd-card{background:#232326;border-color:#ffffff14}:where(.dark,[data-theme=dark]) .bxd-panel{background:#ffffff0a}:where(.dark,[data-theme=dark]) .bxd-note p{color:#c8c8cc}:where(.dark,[data-theme=dark]) .bxd-tag[data-kind=Fixed]{color:#f5b544}:where(.dark,[data-theme=dark]) .bxd-tag[data-kind=Improved]{color:#7aa2ff}:where(.dark,[data-theme=dark]) .bxd-tag[data-kind=Shipped]{color:#34d399}:where(.dark,[data-theme=dark]) .bxd-dots i{background:#ffffff1f}:where(.dark,[data-theme=dark]) .bxd-dots i[data-on]{background:#ededed}:where(.dark,[data-theme=dark]) .bxd-primary{color:#171717;background:linear-gradient(#f4f4f5,#dcdce0)}:where(.dark,[data-theme=dark]) .bxd-primary[data-status=done]{color:#fff;background:linear-gradient(#1aa774,#0f8a5f)}:where(.dark,[data-theme=dark]) .bxd-spin{border-color:#171717 #0003 #0003}:where(.dark,[data-theme=dark]) .bxd-chip{color:#ededed;background:#2c2c30;box-shadow:0 0 0 1px #ffffff14}:where(.dark,[data-theme=dark]) .bxd-chip:hover{background:#333338}.card__preview .blur-crossfade-demo{position:absolute;inset:0}.card__preview .blur-crossfade-demo .bxd-card{zoom:.64}\n";
function BlurCrossfadeDemo() {
  return (
    <>
      <style href="plico-demo-blur-crossfade" precedence="default">
        {demoStyles}
      </style>
      <BlurCrossfadeDemo2 />
    </>
  );
}
export { BlurCrossfade };
export { BlurCrossfadeDemo };
export { BlurCrossfade as Component };
export { BlurCrossfadeDemo as Demo };
export default BlurCrossfade;

"use client";

import * as React from "react";
import * as JSXRuntime from "react/jsx-runtime";
var MiB = 1048576;
var fileExtension = (name) => (name.includes(`.`) ? name.split(`.`).pop().toLowerCase() : ``);
var formatBytes = (bytes) =>
  bytes < MiB
    ? `${Math.max(1, Math.round(bytes / 1024))}\u00a0KB`
    : `${(bytes / MiB).toFixed(+(bytes < 10 * MiB))}\u00a0MB`;
var formatUploadProgress = (uploaded, total) =>
  total < MiB
    ? `${Math.round(uploaded / 1024)} of ${formatBytes(total)}`
    : `${(uploaded / MiB).toFixed(1)} of ${formatBytes(total)}`;
var formatRemainingTime = (seconds) =>
  seconds < 1
    ? `almost done`
    : seconds < 60
      ? `${Math.ceil(seconds)}s left`
      : `${Math.ceil(seconds / 60)} min left`;
var fileColorGroups = [
  {
    exts: [`pdf`],
    color: `#e5484d`,
  },
  {
    exts: [`xls`, `xlsx`, `csv`, `numbers`],
    color: `#2f9e5b`,
  },
  {
    exts: [`doc`, `docx`, `txt`, `md`, `pages`, `rtf`],
    color: `#2f6bff`,
  },
  {
    exts: [`png`, `jpg`, `jpeg`, `gif`, `webp`, `svg`, `heic`, `avif`],
    color: `#8b5cf6`,
  },
  {
    exts: [`mp4`, `mov`, `webm`, `mp3`, `wav`],
    color: `#f08c00`,
  },
  {
    exts: [`ppt`, `pptx`, `key`],
    color: `#e8590c`,
  },
];
var fileColor = (name) =>
  fileColorGroups.find((t) => t.exts.includes(fileExtension(name)))?.color ?? `#8f8f8f`;
var simulatedDuration = (bytes) => Math.min(9e3, Math.max(2600, (bytes / (1.2 * MiB)) * 1e3));
var fileIdCounter = 0;
var createFileId = () => `f${Date.now().toString(36)}${(fileIdCounter++).toString(36)}`;
var DropzoneIcon = ({ d: path, className: className }) => (
  <svg
    viewBox={`0 0 24 24`}
    className={[`ui-dz__glyph`, className].filter(Boolean).join(` `)}
    aria-hidden={`true`}
  >
    <path d={path} />
  </svg>
);
var iconPaths = {
  upload: `M12 15V4M7.5 8.5 12 4l4.5 4.5M5 15v3.5A1.5 1.5 0 0 0 6.5 20h11a1.5 1.5 0 0 0 1.5-1.5V15`,
  close: `M7 7l10 10M17 7 7 17`,
  check: `M5.5 12.5l4 4L18.5 8`,
  retry: `M20 12a8 8 0 1 1-2.34-5.66L20 8.5M20 4v4.5h-4.5`,
  alert: `M12 8v5M12 16.5h.01M10.3 3.9 2.6 17.5A2 2 0 0 0 4.3 20.5h15.4a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z`,
};
function FileBadge({ name: name, end: end }) {
  let extensionLabel = (fileExtension(name) || `file`).slice(0, 4).toUpperCase(),
    labelWidth = Math.max(18, extensionLabel.length * 5.4 + 8),
    labelX = end ? 30 - labelWidth : 0;
  return (
    <svg viewBox={`0 0 30 36`} className={`ui-dz__badge`} aria-hidden={`true`}>
      <path
        d={`M5 1h14l10 10v20a4 4 0 0 1-4 4H5a4 4 0 0 1-4-4V5a4 4 0 0 1 4-4z`}
        className={`ui-dz__badge-sheet`}
      />
      <path d={`M19 1v6a4 4 0 0 0 4 4h6`} className={`ui-dz__badge-fold`} />
      <rect
        x={labelX}
        y={`19`}
        width={labelWidth}
        height={`11`}
        rx={`3`}
        fill={fileColor(name)}
        fillOpacity={`0.14`}
      />
      <text x={labelX + 4} y={`27.2`} className={`ui-dz__badge-text`} fill={fileColor(name)}>
        {extensionLabel}
      </text>
    </svg>
  );
}
function DropStack() {
  return (
    <span className={`ui-dz__stack`} aria-hidden={`true`}>
      <span className={`ui-dz__sheet ui-dz__sheet-l`}>
        <FileBadge name={`file.pdf`} />
      </span>
      <span className={`ui-dz__sheet ui-dz__sheet-r`}>
        <FileBadge name={`file.png`} end={true} />
      </span>
      <span className={`ui-dz__sheet ui-dz__sheet-m`}>
        <DropzoneIcon d={iconPaths.upload} />
      </span>
    </span>
  );
}
var demoFiles = [
  {
    name: `Q3-Board-Report.pdf`,
    size: 4.2 * MiB,
  },
  {
    name: `Hero-Shot.png`,
    size: 2.6 * MiB,
  },
  {
    name: `Budget-2027.xlsx`,
    size: 1.3 * MiB,
    failAt: 0.62,
  },
  {
    name: `Product-Demo.mp4`,
    size: 48 * MiB,
  },
];
function Dropzone({
  accept: accept,
  maxSize = 25 * MiB,
  onUpload: onUpload,
  onChange: onChange,
  hint: hint,
  autoplay = false,
  className: className,
}) {
  let [items, setItems] = React.useState([]),
    [dragCount, setDragCount] = React.useState(0),
    [announcement, setAnnouncement] = React.useState(``),
    [, forceRender] = React.useState(0),
    inputRef = React.useRef(null),
    cardRef = React.useRef(null),
    innerRef = React.useRef(null),
    dragDepthRef = React.useRef(0),
    itemsRef = React.useRef(items);
  itemsRef.current = items;
  let instanceId = React.useId(),
    extensions = accept?.map((e) => e.replace(/^\./, ``).toLowerCase()),
    typeLabel = extensions?.length
      ? extensions.length <= 3
        ? extensions.map((e) => e.toUpperCase()).join(`, `)
        : `${extensions
            .slice(0, 3)
            .map((e) => e.toUpperCase())
            .join(`, `)} and more`
      : `Any file`,
    hintText = hint ?? `${typeLabel} · up to ${formatBytes(maxSize)} each`;
  (React.useEffect(() => {
    onChange?.(
      items
        .filter((e) => !e.removing)
        .map(({ id: e, name: t, size: n, status: r, progress: i, error: a, file: o }) => ({
          id: e,
          name: t,
          size: n,
          status: r,
          progress: i,
          error: a,
          file: o,
        })),
    );
  }, [items]),
    React.useLayoutEffect(() => {
      let e = cardRef.current,
        t = innerRef.current;
      if (!e || !t) return;
      let n = () => (e.style.height = `${t.offsetHeight}px`);
      n();
      let r = new ResizeObserver(n);
      return (r.observe(t), () => r.disconnect());
    }, []));
  let updateItem = (id, patch) =>
      setItems((n) =>
        n.map((n) =>
          n.id === id
            ? {
                ...n,
                ...patch,
              }
            : n,
        ),
      ),
    addItem = (entry) => {
      let id = createFileId(),
        error;
      extensions?.length && !extensions.includes(fileExtension(entry.name))
        ? (error = fileExtension(entry.name)
            ? `.${fileExtension(entry.name)} files aren't supported`
            : `This file type isn't supported`)
        : entry.size > maxSize && (error = `Too large – max ${formatBytes(maxSize)}`);
      let item = {
        id: id,
        name: entry.name,
        size: entry.size,
        file: entry.file,
        status: error ? `error` : `uploading`,
        progress: 0,
        error: error,
        failAt: entry.failAt,
        startedAt: performance.now(),
        duration: simulatedDuration(entry.size),
      };
      (setItems((e) => [...e, item]),
        error
          ? setAnnouncement(`${entry.name}: ${error}`)
          : onUpload && entry.file && runUpload(item));
    },
    runUpload = (item) => {
      onUpload(item.file, (t) =>
        updateItem(item.id, {
          progress: Math.max(0, Math.min(1, t)),
        }),
      )
        .then(() => {
          (updateItem(item.id, {
            status: `done`,
            progress: 1,
          }),
            setAnnouncement(`${item.name} uploaded`));
        })
        .catch((t) => {
          let n = t instanceof Error && t.message ? t.message : `Upload failed`;
          (updateItem(item.id, {
            status: `error`,
            error: n,
            retryable: true,
          }),
            setAnnouncement(`${item.name}: ${n}`));
        });
    },
    addFiles = (fileList) =>
      Array.from(fileList).forEach((e) =>
        addItem({
          name: e.name,
          size: e.size,
          file: e,
        }),
      ),
    hasSimulatedUploads = items.some((e) => e.status === `uploading` && (!onUpload || !e.file));
  (React.useEffect(() => {
    if (!hasSimulatedUploads) return;
    let e = window.setInterval(() => {
      let e = performance.now();
      setItems((t) =>
        t.map((t) => {
          if (t.status !== `uploading` || (onUpload && t.file)) return t;
          let n = Math.min(1, (e - t.startedAt) / t.duration),
            r = Math.max(t.progress, n < 1 ? n * (0.92 + Math.random() * 0.08) : 1);
          return t.failAt !== void 0 && r >= t.failAt
            ? (setAnnouncement(`${t.name}: upload failed`),
              {
                ...t,
                progress: t.failAt,
                status: `error`,
                error: `Connection lost`,
                retryable: true,
              })
            : r >= 1
              ? (setAnnouncement(`${t.name} uploaded`),
                {
                  ...t,
                  progress: 1,
                  status: `done`,
                })
              : {
                  ...t,
                  progress: r,
                };
        }),
      );
    }, 90);
    return () => clearInterval(e);
  }, [hasSimulatedUploads, onUpload]),
    React.useEffect(() => {
      if (!items.some((e) => e.status === `uploading`)) return;
      let e = window.setInterval(() => forceRender((e) => e + 1), 500);
      return () => clearInterval(e);
    }, [items]),
    React.useEffect(() => {
      if (!autoplay) return;
      let e = [
        window.setTimeout(() => setDragCount(demoFiles.length), 700),
        window.setTimeout(() => {
          (setDragCount(0),
            demoFiles.forEach((e, t) => window.setTimeout(() => addItem(e), t * 140)));
        }, 1900),
      ];
      return () => e.forEach(clearTimeout);
    }, [autoplay]));
  let retryItem = (item) => {
      (updateItem(item.id, {
        status: `uploading`,
        progress: 0,
        error: void 0,
        retryable: false,
        failAt: void 0,
        startedAt: performance.now(),
      }),
        onUpload &&
          item.file &&
          runUpload({
            ...item,
            progress: 0,
          }));
    },
    removeItem = (id) => {
      (updateItem(id, {
        removing: true,
      }),
        window.setTimeout(() => setItems((t) => t.filter((t) => t.id !== id)), 480));
    },
    clearFinished = () =>
      itemsRef.current.filter((e) => e.status !== `uploading`).forEach((e) => removeItem(e.id)),
    isFileDrag = (event) => Array.from(event.dataTransfer.types).includes(`Files`),
    handleDragEnter = (event) => {
      isFileDrag(event) &&
        (event.preventDefault(),
        (dragDepthRef.current += 1),
        setDragCount(Math.max(1, event.dataTransfer.items.length)));
    },
    handleDragOver = (event) => {
      isFileDrag(event) && (event.preventDefault(), (event.dataTransfer.dropEffect = `copy`));
    },
    handleDragLeave = () => {
      ((dragDepthRef.current = Math.max(0, dragDepthRef.current - 1)),
        dragDepthRef.current || setDragCount(0));
    },
    handleDrop = (event) => {
      isFileDrag(event) &&
        (event.preventDefault(),
        (dragDepthRef.current = 0),
        setDragCount(0),
        addFiles(event.dataTransfer.files));
    },
    visibleItems = items.filter((e) => !e.removing),
    uploadingItems = visibleItems.filter((e) => e.status === `uploading`),
    doneItems = visibleItems.filter((e) => e.status === `done`),
    errorItems = visibleItems.filter((e) => e.status === `error`),
    now = performance.now(),
    summary = null;
  if (visibleItems.length) {
    if (uploadingItems.length) {
      let e = uploadingItems.reduce((e, t) => e + t.size, 0),
        t = uploadingItems.reduce((e, t) => e + t.size * t.progress, 0);
      summary = (
        <span>
          {`Uploading `}
          {uploadingItems.length}
          {` of `}
          {visibleItems.length}
          {` · `}
          {formatUploadProgress(t, e)}
        </span>
      );
    } else
      summary = (
        <span className={`ui-dz__summary-done`}>
          {errorItems.length ? (
            <DropzoneIcon d={iconPaths.alert} className={`ui-dz__warn`} />
          ) : (
            <DropzoneIcon d={iconPaths.check} className={`ui-dz__ok`} />
          )}
          {errorItems.length
            ? `${doneItems.length} of ${visibleItems.length} uploaded`
            : `${doneItems.length} ${doneItems.length === 1 ? `file` : `files`} uploaded`}
        </span>
      );
  }
  return (
    <div className={[`ui-dz`, className].filter(Boolean).join(` `)}>
      <style href={`ui-dropzone`} precedence={`default`}>
        {dropzoneStyles}
      </style>
      <div ref={cardRef} className={`ui-dz__card`}>
        <div ref={innerRef} className={`ui-dz__inner`}>
          <input
            ref={inputRef}
            id={instanceId}
            type={`file`}
            multiple={true}
            accept={accept?.join(`,`)}
            className={`ui-dz__input`}
            tabIndex={-1}
            onChange={(e) => {
              (e.target.files && addFiles(e.target.files), (e.target.value = ``));
            }}
          />
          <button
            type={`button`}
            className={`ui-dz__area`}
            data-dragging={dragCount > 0 || void 0}
            aria-describedby={`${instanceId}-hint`}
            onClick={() => inputRef.current?.click()}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <DropStack />
            <span className={`ui-dz__title`} key={dragCount ? `drop` : `idle`}>
              {dragCount ? (
                `Release to upload ${dragCount === 1 ? `1 file` : `${dragCount} files`}`
              ) : (
                <>
                  <span className={`ui-dz__for-mouse`}>
                    {`Drop files here or `}
                    <span className={`ui-dz__browse`}>{`browse`}</span>
                  </span>
                  <span className={`ui-dz__for-touch`}>
                    {`Tap to `}
                    <span className={`ui-dz__browse`}>{`choose files`}</span>
                  </span>
                </>
              )}
            </span>
            <span className={`ui-dz__hint`} id={`${instanceId}-hint`}>
              {hintText}
            </span>
          </button>
          <ul className={`ui-dz__list`} aria-label={`Uploads`}>
            {items.map((e) => {
              let t =
                e.status === `uploading`
                  ? ((1 - e.progress) * (now - e.startedAt)) / Math.max(0.05, e.progress) / 1e3
                  : 0;
              return (
                <li
                  className={`ui-dz__row`}
                  data-status={e.status}
                  data-removing={e.removing || void 0}
                  key={e.id}
                >
                  <div className={`ui-dz__row-inner`}>
                    <FileBadge name={e.name} />
                    <div className={`ui-dz__info`}>
                      <div className={`ui-dz__line`}>
                        <span className={`ui-dz__name`} title={e.name}>
                          {e.name}
                        </span>
                        {e.status === `done` && (
                          <span className={`ui-dz__done`} aria-label={`Uploaded`}>
                            <DropzoneIcon d={iconPaths.check} />
                          </span>
                        )}
                      </div>
                      <div className={`ui-dz__meta`} key={e.status}>
                        {e.status === `uploading` && (
                          <>
                            {formatUploadProgress(e.size * e.progress, e.size)}
                            <span className={`ui-dz__dot`}>{`·`}</span>
                            {e.progress < 0.04 ? `starting` : formatRemainingTime(t)}
                          </>
                        )}
                        {e.status === `done` && formatBytes(e.size)}
                        {e.status === `error` && <span className={`ui-dz__error`}>{e.error}</span>}
                      </div>
                      {(e.status !== `error` || e.retryable) && (
                        <div
                          className={`ui-dz__bar`}
                          data-hidden={e.status === `done` || void 0}
                          role={`progressbar`}
                          aria-label={`${e.name} upload`}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          aria-valuenow={Math.round(e.progress * 100)}
                        >
                          <span
                            style={{
                              transform: `scaleX(${e.progress})`,
                            }}
                          />
                        </div>
                      )}
                    </div>
                    <div className={`ui-dz__actions`}>
                      {e.status === `error` && e.retryable && (
                        <button
                          type={`button`}
                          className={`ui-dz__icon-btn`}
                          aria-label={`Retry ${e.name}`}
                          onClick={() => retryItem(e)}
                        >
                          <DropzoneIcon d={iconPaths.retry} />
                        </button>
                      )}
                      <button
                        type={`button`}
                        className={`ui-dz__icon-btn`}
                        aria-label={`Remove ${e.name}`}
                        onClick={() => removeItem(e.id)}
                      >
                        <DropzoneIcon d={iconPaths.close} />
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className={`ui-dz__foot`}>
        {summary ?? <span className={`ui-dz__foot-idle`}>{`No files yet`}</span>}
        {(doneItems.length > 0 || errorItems.length > 0) && !uploadingItems.length && (
          <button
            type={`button`}
            className={`ui-dz__clear`}
            onClick={clearFinished}
          >{`Clear`}</button>
        )}
      </div>
      <span className={`ui-dz__live`} aria-live={`polite`}>
        {announcement}
      </span>
    </div>
  );
}
var dropzoneStyles = `
/* Colors and motion as variables – override them on .ui-dz */
.ui-dz {
  --ui-dz-tray: #f0f0f0;
  --ui-dz-card: #ffffff;
  --ui-dz-line: #ececec;
  --ui-dz-ink: #171717;
  --ui-dz-text: #404040;
  --ui-dz-muted: #8f8f8f;
  --ui-dz-faint: #b5b5b5;
  --ui-dz-area: #fafafa;
  --ui-dz-dash: #d9d9dc;
  --ui-dz-hover: #e6e6e7;
  --ui-dz-track: #efeff1;
  --ui-dz-flash: #e9e9ec;
  --ui-dz-accent: #2f6bff;
  --ui-dz-accent-soft: rgba(47, 107, 255, 0.06);
  --ui-dz-danger: #e5484d;
  --ui-dz-sheet: #ffffff;
  --ui-dz-focus: rgba(23, 23, 23, 0.22);
  --ui-dz-ease: cubic-bezier(0.22, 1, 0.36, 1);
  box-sizing: border-box;
  container-type: inline-size;
  display: grid;
  width: 100%;
  max-width: 520px;
  padding: 4px;
  border-radius: 20px;
  background: var(--ui-dz-tray);
  font-family: "Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  font-size: 13.5px;
  line-height: 1.45;
  color: var(--ui-dz-text);
  -webkit-font-smoothing: antialiased;
}
.ui-dz *, .ui-dz *::before, .ui-dz *::after { box-sizing: border-box; }
:where(.ui-dz) button { margin: 0; padding: 0; border: 0; background: none; font: inherit; color: inherit; cursor: pointer; }
:where(.ui-dz) svg { display: block; flex: none; }
.ui-dz button:focus-visible { outline: 2px solid var(--ui-dz-focus); outline-offset: 2px; }
.ui-dz__glyph { width: 16px; height: 16px; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }

/* The white card */
.ui-dz__card { overflow: hidden; border-radius: 16px; transition: height 360ms var(--ui-dz-ease); background: var(--ui-dz-card); box-shadow: 0 0 0 1px var(--ui-dz-line), 0 1px 2px rgba(0, 0, 0, 0.04); }
.ui-dz__inner { display: flow-root; padding: 6px; }
.ui-dz__input { position: absolute; width: 1px; height: 1px; opacity: 0; pointer-events: none; }

/* The drop area */
.ui-dz__area {
  position: relative;
  display: grid;
  justify-items: center;
  width: 100%;
  padding: 26px 20px 22px;
  border-radius: 12px;
  background: var(--ui-dz-area);
  text-align: center;
  transition: background-color 220ms ease, box-shadow 220ms ease;
}
/* The dashed outline turns solid and blue while files are dragged over */
.ui-dz__area::before {
  content: "";
  position: absolute;
  inset: 0;
  border: 1.5px dashed var(--ui-dz-dash);
  border-radius: inherit;
  transition: border-color 220ms ease;
  pointer-events: none;
}
.ui-dz__area:hover::before { border-color: var(--ui-dz-faint); }
.ui-dz__area[data-dragging] { background: var(--ui-dz-accent-soft); }
.ui-dz__area[data-dragging]::before { border-style: solid; border-color: var(--ui-dz-accent); }
.ui-dz__area:focus-visible { outline-offset: 3px; }

/* Three little documents that fan out while files are dragged over */
.ui-dz__stack { position: relative; width: 64px; height: 50px; margin-bottom: 12px; }
.ui-dz__sheet {
  position: absolute;
  left: 50%;
  bottom: 0;
  width: 34px;
  height: 42px;
  margin-left: -17px;
  border-radius: 7px;
  background: var(--ui-dz-sheet);
  box-shadow: 0 0 0 1px var(--ui-dz-line), 0 2px 6px rgba(0, 0, 0, 0.06);
  transition: transform 420ms var(--ui-dz-ease);
}
/* The PDF and PNG behind: the same file badges as in the rows */
.ui-dz__sheet-l, .ui-dz__sheet-r { background: none; box-shadow: none; filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.06)); }
.ui-dz__sheet .ui-dz__badge { width: 100%; height: 100%; }
.ui-dz__sheet-l { transform: translate(-9px, 2px) rotate(-10deg); }
.ui-dz__sheet-r { transform: translate(9px, 2px) rotate(10deg); }
.ui-dz__sheet-m { display: grid; place-items: center; transform: translateY(-2px); }
.ui-dz__sheet-m .ui-dz__glyph { width: 18px; height: 18px; color: var(--ui-dz-ink); transition: transform 420ms var(--ui-dz-ease), color 220ms ease; }
.ui-dz__area:hover .ui-dz__sheet-m { transform: translateY(-4px); }
.ui-dz__area[data-dragging] .ui-dz__sheet-l { transform: translate(-30px, 0) rotate(-16deg); }
.ui-dz__area[data-dragging] .ui-dz__sheet-r { transform: translate(30px, 0) rotate(16deg); }
.ui-dz__area[data-dragging] .ui-dz__sheet-m { transform: translateY(-9px) scale(1.06); }
.ui-dz__area[data-dragging] .ui-dz__sheet-m .ui-dz__glyph { color: var(--ui-dz-accent); animation: ui-dz-bob 900ms ease-in-out infinite; }

.ui-dz__title { font-size: 14.5px; font-weight: 500; color: var(--ui-dz-ink); animation: ui-dz-in 260ms var(--ui-dz-ease) both; }
.ui-dz__browse { color: var(--ui-dz-accent); }
.ui-dz__hint { margin-top: 3px; font-size: 12.5px; color: var(--ui-dz-muted); }

/* File rows: each one grows in and folds away when removed */
.ui-dz__list { display: grid; margin: 0; padding: 0; list-style: none; }
.ui-dz__row { display: grid; grid-template-rows: 1fr; animation: ui-dz-grow 420ms var(--ui-dz-ease) both; transition: grid-template-rows 260ms var(--ui-dz-ease), opacity 200ms ease; }
/* Removing: the row flashes briefly, like closing a window on a Mac, then folds away */
.ui-dz__row[data-removing] { grid-template-rows: 0fr; opacity: 0; transition: grid-template-rows 260ms var(--ui-dz-ease) 200ms, opacity 220ms ease 180ms; }
.ui-dz__row-inner { position: relative; isolation: isolate; display: flex; align-items: center; gap: 12px; min-height: 0; overflow: hidden; padding: 10px 6px 10px 10px; }
.ui-dz__row-inner::before { content: ""; position: absolute; inset: 3px 0; border-radius: 10px; background: var(--ui-dz-flash); opacity: 0; pointer-events: none; z-index: -1; }
.ui-dz__row[data-removing] .ui-dz__row-inner::before { animation: ui-dz-flash 280ms ease-out both; }
/* A row on its way out no longer reacts – its buttons lose their hover fill right away */
.ui-dz__row[data-removing] { pointer-events: none; }
.ui-dz__row[data-removing] .ui-dz__icon-btn { background: none; }
.ui-dz__row:first-child .ui-dz__row-inner { margin-top: 6px; }
.ui-dz__row + .ui-dz__row .ui-dz__row-inner { border-top: 1px solid var(--ui-dz-line); }

.ui-dz__badge { width: 28px; height: 34px; }
.ui-dz__badge-sheet { fill: var(--ui-dz-sheet); stroke: var(--ui-dz-dash); stroke-width: 1.2; }
.ui-dz__badge-fold { fill: none; stroke: var(--ui-dz-dash); stroke-width: 1.2; stroke-linejoin: round; }
.ui-dz__badge-text { font-family: inherit; font-size: 7px; font-weight: 700; letter-spacing: 0.03em; }

.ui-dz__info { flex: 1; min-width: 0; }
.ui-dz__line { display: flex; align-items: center; gap: 6px; min-width: 0; }
.ui-dz__name { overflow: hidden; color: var(--ui-dz-ink); font-weight: 500; white-space: nowrap; text-overflow: ellipsis; }
.ui-dz__done { display: grid; place-items: center; flex: none; color: var(--ui-dz-muted); animation: ui-dz-pop 420ms cubic-bezier(0.34, 1.56, 0.64, 1) both; }
.ui-dz__done .ui-dz__glyph { width: 14px; height: 14px; stroke-width: 2.2; }
.ui-dz__meta { margin-top: 1px; font-size: 12.5px; font-variant-numeric: tabular-nums; color: var(--ui-dz-muted); animation: ui-dz-in 240ms var(--ui-dz-ease) both; }
.ui-dz__dot { margin: 0 5px; color: var(--ui-dz-faint); }
.ui-dz__error { color: var(--ui-dz-danger); }
.ui-dz__row[data-status="error"] .ui-dz__row-inner { animation: ui-dz-shake 380ms ease both; }

.ui-dz__bar {
  position: relative;
  height: 4px;
  margin-top: 7px;
  overflow: hidden;
  border-radius: 2px;
  background: var(--ui-dz-track);
  transition: height 320ms var(--ui-dz-ease) 250ms, margin-top 320ms var(--ui-dz-ease) 250ms, opacity 200ms ease 200ms;
}
.ui-dz__bar[data-hidden] { height: 0; margin-top: 0; opacity: 0; }
.ui-dz__bar > span {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: var(--ui-dz-ink);
  transform-origin: left;
  transition: transform 200ms linear, background-color 200ms ease;
}
.ui-dz__row[data-status="error"] .ui-dz__bar > span { background: var(--ui-dz-danger); }
.ui-dz__actions { display: flex; flex: none; gap: 2px; }
.ui-dz__icon-btn { display: grid; place-items: center; width: 30px; height: 30px; border-radius: 8px; color: var(--ui-dz-muted); transition: background-color 160ms ease, color 160ms ease; }
.ui-dz__icon-btn:hover { background: var(--ui-dz-track); color: var(--ui-dz-ink); }

/* The tray below the card */
.ui-dz__foot { display: flex; align-items: center; justify-content: space-between; gap: 12px; min-height: 40px; padding: 0 8px 0 12px; font-size: 12.5px; font-variant-numeric: tabular-nums; color: var(--ui-dz-muted); }
.ui-dz__foot > span { animation: ui-dz-in 240ms var(--ui-dz-ease) both; }
.ui-dz__summary-done { display: inline-flex; align-items: center; gap: 6px; color: var(--ui-dz-ink); }
.ui-dz__ok { width: 14px; height: 14px; stroke: var(--ui-dz-muted); stroke-width: 2.2; }
.ui-dz__warn { width: 14px; height: 14px; stroke: var(--ui-dz-muted); }
.ui-dz__clear { height: 28px; padding: 0 10px; border-radius: 8px; font-size: 12.5px; color: var(--ui-dz-text); transition: background-color 160ms ease; animation: ui-dz-in 240ms var(--ui-dz-ease) both; }
.ui-dz__clear:hover { background: var(--ui-dz-hover); }
.ui-dz__live { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }

@keyframes ui-dz-in { from { opacity: 0; transform: translateY(3px); } to { opacity: 1; transform: none; } }
@keyframes ui-dz-grow { from { grid-template-rows: 0fr; opacity: 0; } to { grid-template-rows: 1fr; opacity: 1; } }
@keyframes ui-dz-pop { 0% { transform: scale(0.4); } 60% { transform: scale(1.15); } 100% { transform: scale(1); } }
@keyframes ui-dz-bob { 50% { transform: translateY(-3px); } }
@keyframes ui-dz-flash { 0% { opacity: 0; } 35% { opacity: 1; } 100% { opacity: 0; } }
@keyframes ui-dz-shake { 20%, 60% { transform: translateX(-3px); } 40%, 80% { transform: translateX(3px); } }

/* Narrow (phones) */
@container (max-width: 420px) {
  .ui-dz__area { padding: 22px 16px 18px; }
  .ui-dz__title { font-size: 14px; }
}
.ui-dz__for-touch { display: none; }
/* Touch screens: bigger buttons, and a title that fits tapping */
@media (hover: none) and (pointer: coarse) {
  .ui-dz__for-mouse { display: none; }
  .ui-dz__for-touch { display: inline; }
  .ui-dz__icon-btn { width: 40px; height: 40px; border-radius: 10px; }
  .ui-dz__actions { margin-right: -4px; }
  .ui-dz__clear { height: 36px; padding: 0 12px; }
}
@media (prefers-reduced-motion: reduce) {
  .ui-dz *, .ui-dz *::before, .ui-dz *::after { animation: none !important; transition: none !important; }
}

/* Dark mode: follows a .dark class or data-theme="dark" on any ancestor, e.g. <html> */
:where(.dark, [data-theme="dark"]) .ui-dz {
  --ui-dz-tray: #111113;
  --ui-dz-card: #19191b;
  --ui-dz-line: #2a2a2e;
  --ui-dz-ink: #ededed;
  --ui-dz-text: #c8c8cc;
  --ui-dz-muted: #8b8b92;
  --ui-dz-faint: #5c5c63;
  --ui-dz-area: #1d1d20;
  --ui-dz-dash: #38383d;
  --ui-dz-hover: #222225;
  --ui-dz-track: #2a2a2e;
  --ui-dz-flash: #2e2e33;
  --ui-dz-accent: #6d8bff;
  --ui-dz-accent-soft: rgba(109, 139, 255, 0.08);
  --ui-dz-danger: #ff6369;
  --ui-dz-sheet: #26262a;
  --ui-dz-focus: rgba(255, 255, 255, 0.3);
}
`;
function DropzoneDemo() {
  return (
    <div className={`dropzone-demo`}>
      <Dropzone accept={[`.pdf`, `.png`, `.jpg`, `.xlsx`, `.docx`, `.mp4`]} autoplay={true} />
    </div>
  );
}
export default DropzoneDemo;
export { Dropzone as PlicoCore_v };
export { DropzoneDemo as PlicoDemo_y };

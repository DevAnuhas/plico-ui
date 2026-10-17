"use client";

import * as React from "react";
interface DropdownMenuProps {
  trigger: (state: { open: boolean; toggle: () => void }) => React.ReactNode;
  items: MenuItem[];
  align?: PopoverAlign;
  side?: PopoverSide;
  title?: string;
  className?: string;
}
interface MenuItem {
  label: string;
  icon?: IconNode;
  description?: string;
  checked?: boolean;
  danger?: boolean;
  onSelect?: () => void;
}
interface PopoverProps {
  open: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  align?: PopoverAlign;
  side?: PopoverSide;
  className?: string;
}
type PopoverAlign = "start" | "end";
type PopoverSide = "top" | "bottom";
interface NavigationGroup {
  label: string;
  items: NavigationItem[];
  empty?: string;
}
interface NavigationItem {
  label: string;
  icon: IconNode;
  count?: number;
}
type DataColumn = {
  key: string;
  label: string;
  icon?: React.ReactNode;
  type?: string;
  width?: string | number;
  editable?: boolean;
  options?: string[];
};
type DataRow = {
  id: string;
  [column: string]: React.ReactNode;
};
type TagTone = string;
interface SetupTask {
  id: string;
  label: string;
  done?: boolean;
}
interface SetupGroup {
  id: string;
  title: string;
  tasks: SetupTask[];
}
type ShellNavItem = {
  id?: string;
  label: string;
  icon?: React.ReactNode;
  badge?: string | number;
  active?: boolean;
  items?: ShellNavItem[];
};
interface DataTableProps {
  title?: string;
  icon?: React.ReactNode;
  columns: DataColumn[];
  rows: DataRow[];
  tagTones?: Record<string, TagTone>;
  editable?: boolean;
  onRowsChange?: (rows: DataRow[]) => void;
  onSelectionChange?: (ids: string[]) => void;
  className?: string;
}
interface SetupGuideProps {
  title?: string;
  groups: SetupGroup[];
  onEdit?: () => void;
  onClose?: () => void;
  onChange?: (done: string[]) => void;
  className?: string;
}
interface AppShellProps {
  children?: React.ReactNode;
  active?: string;
  onNavigate?: (label: string) => void;
  workspace?: string;
  user?: {
    name: string;
    avatar?: string;
  };
  nav?: NavigationItem[];
  projects?: string[];
  groups?: NavigationGroup[];
  setup?: SetupGroup[];
  className?: string;
}
type IconNode = Array<[string, Record<string, string | number | undefined>]>;
interface HugeiconsProps extends Omit<React.SVGProps<SVGSVGElement>, "strokeWidth"> {
  icon: IconNode;
  altIcon?: IconNode;
  size?: string | number;
  strokeWidth?: string | number;
  absoluteStrokeWidth?: boolean;
  showAlt?: boolean;
  primaryColor?: string;
  secondaryColor?: string;
  disableSecondaryOpacity?: boolean;
}
const ScreenFrameModeContext = React.createContext<boolean | null>(null);
function PreviewFrame({ children }: { children?: React.ReactNode }) {
  const mode = React.useContext(ScreenFrameModeContext);
  const full =
    mode ?? (typeof window !== "undefined" && /\/full\/?$/.test(window.location.pathname));
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = React.useState(0);
  React.useLayoutEffect(() => {
    const element = ref.current;
    if (!element || full) return;
    const resize = () => setScale(element.clientWidth / 1440);
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(element);
    return () => observer.disconnect();
  }, [full]);
  return (
    <>
      <style
        href="plico-screen-frame"
        precedence="default"
      >{`.screen-stage{position:relative;width:100%;overflow:hidden;isolation:isolate}.screen-stage__canvas{position:absolute;inset:0 auto auto 0;transform-origin:top left}.screen-full{width:100%;height:100dvh;overflow:hidden}.screen-full>.ui-as-app{height:100%;min-height:0;border-radius:0}.screen-full>.screen-full{height:100%}`}</style>
      {full ? (
        <div className="screen-full">{children}</div>
      ) : (
        <div
          ref={ref}
          className="screen-stage"
          style={{
            aspectRatio: "1440 / 900",
          }}
        >
          {scale > 0 && (
            <div
              className="screen-stage__canvas"
              style={{
                width: 1440,
                height: 900,
                transform: `scale(${scale})`,
              }}
            >
              {children}
            </div>
          )}
        </div>
      )}
    </>
  );
}
const projects = ["Q3 Campaign", "Brand assets", "Hiring", "Research"];
const routes: Record<string, string> = {
  "New chat": "assistant-home",
  Folders: "files",
  Integrations: "integrations",
  Chat: "agent-chat",
  Companies: "crm",
  Revenue: "analytics",
  Analytics: "analytics",
  Runs: "agent-run",
  Evals: "evals",
  Settings: "settings-billing",
};
function navigateScreen(label: string) {
  const project = projects.includes(label),
    slug = routes[label] ?? (project ? "folder" : null);
  if (!slug) return;
  const full = /\/full\/?$/.test(window.location.pathname);
  const url = `/screens/${slug}${full ? "/full" : ""}${project ? `?folder=${encodeURIComponent(label)}` : ""}`;
  window.history.pushState(null, "", url);
  window.dispatchEvent(new PopStateEvent("popstate"));
  window.dispatchEvent(new Event("screen-query"));
}
type CellCoordinate = { r: number; c: number };
type EditDone = (commit: boolean, direction?: string, overrideValue?: string) => void;
interface FileRecord {
  name: string;
  type: "DOC" | "PDF" | "XLS";
  edited?: string;
  owner?: string;
}
var cellText = (value: unknown) =>
  typeof value == `string` || typeof value == `number` ? String(value) : ``;
var columnLetter = (index: number) => String.fromCharCode(65 + (index % 26));
var isApplePlatform = () => typeof navigator < `u` && /Mac|iPhone|iPad/.test(navigator.platform);
function parseCellInput(text: string, column: DataColumn) {
  let trimmed = text.trim();
  if (column.type !== `number`) return trimmed;
  if (trimmed === ``) return ``;
  let numericValue = Number(trimmed.replace(/[^\d.,-]/g, ``).replace(/,/g, ``));
  return Number.isFinite(numericValue) ? numericValue : trimmed;
}
function DataTable({
  title: title,
  icon: icon,
  columns: columns,
  rows: rows,
  tagTones = {},
  editable = true,
  onRowsChange: onRowsChange,
  onSelectionChange: onSelectionChange,
  className: className,
}: DataTableProps) {
  let [localRows, setLocalRows] = React.useState(rows),
    historyRef = React.useRef<{ past: DataRow[][]; future: DataRow[][] }>({
      past: [],
      future: [],
    }),
    [selectedIds, setSelectedIds] = React.useState(new Set<string>()),
    [sort, setSort] = React.useState<{ key: string; dir: "asc" | "desc" } | null>(null),
    [activeCell, setActiveCellState] = React.useState<CellCoordinate | null>(null),
    [anchorCell, setAnchorCellState] = React.useState<CellCoordinate | null>(null),
    cellStateRef = React.useRef<{ active: CellCoordinate | null; anchor: CellCoordinate | null }>({
      active: null,
      anchor: null,
    }),
    setActiveCell = (cell: CellCoordinate | null) => {
      ((cellStateRef.current.active = cell), setActiveCellState(cell));
    },
    setAnchorCell = (cell: CellCoordinate | null) => {
      ((cellStateRef.current.anchor = cell), setAnchorCellState(cell));
    },
    [editing, setEditing] = React.useState<{ cell: CellCoordinate; value: string } | null>(null),
    [dragging, setDragging] = React.useState(false),
    [, forceRender] = React.useState(0),
    scrollRef = React.useRef<HTMLDivElement | null>(null),
    morphRef = useMorphHeight(scrollRef),
    newRowIdRef = React.useRef(0),
    sortedRows = React.useMemo(() => {
      if (!sort) return localRows;
      let e = columns.find((e) => e.key === sort.key),
        t = sort.dir === `asc` ? 1 : -1;
      return [...localRows].sort((n, r) => {
        let a = n[sort.key],
          o = r[sort.key];
        return cellText(a) === ``
          ? 1
          : cellText(o) === ``
            ? -1
            : e?.type === `number`
              ? (Number(a) - Number(o)) * t
              : cellText(a).localeCompare(cellText(o), void 0, {
                  numeric: true,
                }) * t;
      });
    }, [localRows, sort, columns]),
    canEditColumn = (columnIndex: number) => editable && columns[columnIndex]?.editable !== false,
    commitRows = (nextRows: DataRow[]) => {
      (historyRef.current.past.push(localRows),
        historyRef.current.past.length > 100 && historyRef.current.past.shift(),
        (historyRef.current.future = []),
        setLocalRows(nextRows),
        onRowsChange?.(nextRows));
    },
    undo = () => {
      let e = historyRef.current.past.pop();
      e && (historyRef.current.future.push(localRows), setLocalRows(e), onRowsChange?.(e));
    },
    redo = () => {
      let e = historyRef.current.future.pop();
      e && (historyRef.current.past.push(localRows), setLocalRows(e), onRowsChange?.(e));
    },
    selection = React.useMemo(() => {
      if (!activeCell) return null;
      let e = anchorCell ?? activeCell;
      return {
        r1: Math.min(e.r, activeCell.r),
        r2: Math.max(e.r, activeCell.r),
        c1: Math.min(e.c, activeCell.c),
        c2: Math.max(e.c, activeCell.c),
      };
    }, [activeCell, anchorCell]),
    isInSelection = (rowIndex: number, columnIndex: number) =>
      !!selection &&
      rowIndex >= selection.r1 &&
      rowIndex <= selection.r2 &&
      columnIndex >= selection.c1 &&
      columnIndex <= selection.c2,
    applyMatrix = (cell: CellCoordinate, matrix: string[][]) => {
      let patches = new Map<string, Partial<DataRow>>();
      (matrix.forEach((t, r) =>
        t.forEach((t, i) => {
          let a = sortedRows[cell.r + r],
            o = cell.c + i,
            l = columns[o];
          a &&
            l &&
            canEditColumn(o) &&
            patches.set(a.id, {
              ...patches.get(a.id),
              [l.key]: parseCellInput(t, l),
            });
        }),
      ),
        patches.size &&
          commitRows(
            localRows.map((e) =>
              patches.has(e.id)
                ? {
                    ...e,
                    ...patches.get(e.id),
                  }
                : e,
            ),
          ));
    },
    moveActiveCell = (cell: CellCoordinate, extend = false) => {
      let rowIndex = Math.max(0, Math.min(sortedRows.length - 1, cell.r)),
        columnIndex = Math.max(0, Math.min(columns.length - 1, cell.c));
      (extend
        ? cellStateRef.current.anchor ||
          setAnchorCell(
            cellStateRef.current.active ?? {
              r: rowIndex,
              c: columnIndex,
            },
          )
        : setAnchorCell(null),
        setActiveCell({
          r: rowIndex,
          c: columnIndex,
        }));
    },
    startEditing = (cell: CellCoordinate, initialValue?: string) => {
      canEditColumn(cell.c) &&
        sortedRows[cell.r] &&
        setEditing({
          cell: cell,
          value: initialValue ?? cellText(sortedRows[cell.r][columns[cell.c].key]),
        });
    },
    finishEditing = (commit: boolean, nextCell?: CellCoordinate, overrideValue?: string) => {
      if (editing && commit) {
        let e = overrideValue ?? editing.value;
        e !== cellText(sortedRows[editing.cell.r]?.[columns[editing.cell.c].key]) &&
          applyMatrix(editing.cell, [[e]]);
      }
      (setEditing(null),
        nextCell && moveActiveCell(nextCell),
        requestAnimationFrame(() =>
          scrollRef.current?.focus({
            preventScroll: true,
          }),
        ));
    };
  (React.useEffect(() => {
    activeCell &&
      scrollRef.current
        ?.querySelector(`[data-cell="${activeCell.r}-${activeCell.c}"]`)
        ?.scrollIntoView({
          block: `nearest`,
          inline: `nearest`,
        });
  }, [activeCell]),
    React.useEffect(() => {
      if (!dragging) return;
      let e = () => setDragging(false);
      return (
        window.addEventListener(`pointerup`, e),
        () => window.removeEventListener(`pointerup`, e)
      );
    }, [dragging]));
  let handleGridKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (editing) return;
      let modifier = isApplePlatform() ? event.metaKey : event.ctrlKey;
      if (modifier && event.key.toLowerCase() === `z`)
        return (event.preventDefault(), event.shiftKey ? redo() : undo());
      if (modifier && event.key.toLowerCase() === `y`) return (event.preventDefault(), redo());
      if (modifier && event.key.toLowerCase() === `a`) {
        (event.preventDefault(),
          setAnchorCell({
            r: 0,
            c: 0,
          }),
          setActiveCell({
            r: sortedRows.length - 1,
            c: columns.length - 1,
          }));
        return;
      }
      let active = cellStateRef.current.active;
      if (!active) {
        (event.key.startsWith(`Arrow`) || event.key === `Enter`) &&
          (event.preventDefault(),
          moveActiveCell({
            r: 0,
            c: 0,
          }));
        return;
      }
      let { r, c: i } = active,
        a = modifier,
        s: Partial<Record<string, CellCoordinate>> = {
          ArrowUp: {
            r: a ? 0 : r - 1,
            c: i,
          },
          ArrowDown: {
            r: a ? sortedRows.length - 1 : r + 1,
            c: i,
          },
          ArrowLeft: {
            r,
            c: a ? 0 : i - 1,
          },
          ArrowRight: {
            r,
            c: a ? columns.length - 1 : i + 1,
          },
          Home: {
            r: modifier ? 0 : r,
            c: 0,
          },
          End: {
            r: modifier ? sortedRows.length - 1 : r,
            c: columns.length - 1,
          },
        };
      if (s[event.key])
        return (event.preventDefault(), moveActiveCell(s[event.key]!, event.shiftKey));
      if (event.key === `Tab`)
        return (
          event.preventDefault(),
          moveActiveCell({
            r,
            c: i + (event.shiftKey ? -1 : 1),
          })
        );
      if (event.key === `Enter` || event.key === `F2`)
        return (event.preventDefault(), startEditing(active));
      if (event.key === `Escape`) return setAnchorCell(null);
      if ((event.key === `Delete` || event.key === `Backspace`) && selection) {
        event.preventDefault();
        let t = Array.from(
          {
            length: selection.r2 - selection.r1 + 1,
          },
          () =>
            Array.from(
              {
                length: selection.c2 - selection.c1 + 1,
              },
              () => ``,
            ),
        );
        return applyMatrix(
          {
            r: selection.r1,
            c: selection.c1,
          },
          t,
        );
      }
      event.key.length === 1 &&
        !modifier &&
        !event.altKey &&
        columns[i].type !== `tag` &&
        (event.preventDefault(), startEditing(active, event.key));
    },
    selectionText = () =>
      selection
        ? sortedRows.slice(selection.r1, selection.r2 + 1).map((e) =>
            columns
              .slice(selection.c1, selection.c2 + 1)
              .map((t: { key: string | number }) => cellText(e[t.key]).replace(/[\t\n]/g, ` `))
              .join(`	`),
          ).join(`
`)
        : ``,
    handleCopy = (event: React.ClipboardEvent<HTMLDivElement>) => {
      !editing &&
        selection &&
        (event.preventDefault(), event.clipboardData.setData(`text/plain`, selectionText()));
    },
    handleCut = (event: React.ClipboardEvent<HTMLDivElement>) => {
      if (editing || !selection) return;
      handleCopy(event);
      let emptyMatrix = Array.from(
        {
          length: selection.r2 - selection.r1 + 1,
        },
        () =>
          Array.from(
            {
              length: selection.c2 - selection.c1 + 1,
            },
            () => ``,
          ),
      );
      applyMatrix(
        {
          r: selection.r1,
          c: selection.c1,
        },
        emptyMatrix,
      );
    },
    handlePaste = (event: {
      preventDefault: () => void;
      clipboardData: {
        getData: (arg0: string) => string;
      };
    }) => {
      if (editing || !activeCell) return;
      event.preventDefault();
      let text = event.clipboardData.getData(`text/plain`).replace(/\r/g, ``).replace(/\n$/, ``);
      if (!text) return;
      let matrix = text
        .split(
          `
`,
        )
        .map((e: string) => e.split(`	`));
      if (matrix.length === 1 && matrix[0].length === 1 && selection) {
        let e = Array.from(
          {
            length: selection.r2 - selection.r1 + 1,
          },
          () =>
            Array.from(
              {
                length: selection.c2 - selection.c1 + 1,
              },
              () => matrix[0][0],
            ),
        );
        return applyMatrix(
          {
            r: selection.r1,
            c: selection.c1,
          },
          e,
        );
      }
      applyMatrix(
        selection
          ? {
              r: selection.r1,
              c: selection.c1,
            }
          : activeCell,
        matrix,
      );
    },
    toggleSort = (key: string) =>
      setSort((t) =>
        t?.key === key
          ? t.dir === `asc`
            ? {
                key: key,
                dir: `desc`,
              }
            : null
          : {
              key: key,
              dir: `asc`,
            },
      ),
    updateSelection = (ids: Set<string>) => {
      (setSelectedIds(ids),
        onSelectionChange?.(localRows.filter((t) => ids.has(t.id)).map((e) => e.id)));
    },
    allSelected = sortedRows.length > 0 && selectedIds.size === sortedRows.length,
    mixedSelected = selectedIds.size > 0 && !allSelected,
    addRow = () => {
      newRowIdRef.current += 1;
      let e = columns.find((e: DataColumn) => e.type === `title`)?.key ?? columns[0].key,
        t = {
          id: `new-${newRowIdRef.current}`,
          [e]: ``,
        };
      (commitRows([...localRows, t]), setSort(null));
      let n = {
        r: localRows.length,
        c: Math.max(
          0,
          columns.findIndex((t) => t.key === e),
        ),
      };
      (setActiveCell(n),
        setAnchorCell(null),
        setEditing({
          cell: n,
          value: ``,
        }));
    },
    deleteSelectedRows = () => {
      (commitRows(localRows.filter((e: DataRow) => !selectedIds.has(e.id))),
        updateSelection(new Set()),
        setActiveCell(null),
        setAnchorCell(null));
    },
    columnOptions = (column: DataColumn) =>
      column.options ?? [...new Set(localRows.map((t) => cellText(t[column.key])).filter(Boolean))],
    selectionSummary = (() => {
      if (!selection || !activeCell) return null;
      if ((selection.r2 - selection.r1 + 1) * (selection.c2 - selection.c1 + 1) === 1)
        return `${columnLetter(activeCell.c)}${activeCell.r + 1}`;
      let e = 0,
        t = 0,
        n = false;
      for (let r = selection.r1; r <= selection.r2; r++)
        for (let a = selection.c1; a <= selection.c2; a++) {
          let o = sortedRows[r]?.[columns[a].key];
          (cellText(o) !== `` && e++,
            columns[a].type === `number` && typeof o == `number` && ((n = true), (t += o)));
        }
      return `${e} ${e === 1 ? `value` : `values`}${n ? ` · Sum ${t.toLocaleString(`en-US`)}` : ``}`;
    })(),
    modifierKey = isApplePlatform() ? `⌘` : `Ctrl`;
  return (
    <>
      <style href={`ui-data-table`} precedence={`default`}>
        {dataTableStyles}
      </style>
      <section className={[`ui-dt`, className].filter(Boolean).join(` `)} aria-label={title}>
        <header className={`ui-dt__head`}>
          {icon && <span className={`ui-dt__title-icon`}>{icon}</span>}
          <h3 className={`ui-dt__title`}>{title}</h3>
          {editable && (
            <div className={`ui-dt__tools`}>
              <button
                type={`button`}
                className={`ui-dt__tool`}
                aria-label={`Undo (${modifierKey} Z)`}
                title={`Undo · ${modifierKey} Z`}
                disabled={!historyRef.current.past.length}
                onClick={() => {
                  (undo(), forceRender((e) => e + 1));
                }}
              >
                <UndoIcon />
              </button>
              <button
                type={`button`}
                className={`ui-dt__tool`}
                aria-label={`Redo (${modifierKey} Shift Z)`}
                title={`Redo · ${modifierKey} ⇧ Z`}
                disabled={!historyRef.current.future.length}
                onClick={() => {
                  (redo(), forceRender((e) => e + 1));
                }}
              >
                <RedoIcon />
              </button>
            </div>
          )}
        </header>
        <div className={`ui-dt__card`}>
          <div className={`ui-dt__morph`} ref={morphRef}>
            <div
              ref={scrollRef}
              className={`ui-dt__scroll`}
              role={`grid`}
              aria-label={title}
              aria-rowcount={sortedRows.length + 1}
              aria-multiselectable={`true`}
              tabIndex={0}
              onKeyDown={handleGridKeyDown}
              onCopy={handleCopy}
              onCut={handleCut}
              onPaste={handlePaste}
              data-dragging={dragging || void 0}
            >
              <table className={`ui-dt__table`} role={`presentation`}>
                <colgroup>
                  <col
                    style={{
                      width: 44,
                    }}
                  />
                  {columns.map((e) => (
                    <col
                      style={
                        e.width
                          ? {
                              width: e.width,
                            }
                          : void 0
                      }
                      key={e.key}
                    />
                  ))}
                </colgroup>
                <thead>
                  <tr role={`row`}>
                    <th className={`ui-dt__select`} role={`columnheader`}>
                      <SelectionCheckbox
                        checked={allSelected}
                        mixed={mixedSelected}
                        label={`Select all rows`}
                        onChange={() =>
                          updateSelection(
                            allSelected ? new Set() : new Set(sortedRows.map((e) => e.id)),
                          )
                        }
                      />
                    </th>
                    {columns.map((e, t) => {
                      let n = sort?.key === e.key ? sort.dir : null;
                      return (
                        <th
                          role={`columnheader`}
                          aria-sort={
                            n === `asc` ? `ascending` : n === `desc` ? `descending` : `none`
                          }
                          data-type={e.type}
                          data-col-active={
                            (selection && t >= selection.c1 && t <= selection.c2) || void 0
                          }
                          key={e.key}
                        >
                          <button
                            type={`button`}
                            className={`ui-dt__th`}
                            onClick={() => toggleSort(e.key)}
                          >
                            {e.icon && <span className={`ui-dt__col-icon`}>{e.icon}</span>}
                            <span className={`ui-dt__th-label`}>{e.label}</span>
                            <span
                              className={`ui-dt__sort`}
                              data-dir={n ?? void 0}
                              aria-hidden={`true`}
                            >
                              <SortDirectionIcon />
                            </span>
                          </button>
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {sortedRows.map((e: DataRow, t: number) => {
                    let n = selectedIds.has(e.id);
                    return (
                      <tr role={`row`} data-selected={n || void 0} key={e.id}>
                        <td className={`ui-dt__select`} role={`gridcell`}>
                          <SelectionCheckbox
                            checked={n}
                            label={`Select ${
                              cellText(
                                e[
                                  columns.find((e: DataColumn) => e.type === `title`)?.key ??
                                    columns[0].key
                                ],
                              ) || `row`
                            }`}
                            onChange={() => {
                              let t = new Set(selectedIds);
                              (t.has(e.id) ? t.delete(e.id) : t.add(e.id), updateSelection(t));
                            }}
                          />
                        </td>
                        {columns.map((n: DataColumn, i: number) => {
                          let a = activeCell?.r === t && activeCell?.c === i,
                            o = editing?.cell.r === t && editing?.cell.c === i;
                          return (
                            <td
                              role={`gridcell`}
                              data-cell={`${t}-${i}`}
                              data-type={n.type}
                              data-active={a || void 0}
                              data-in-range={(isInSelection(t, i) && !a) || void 0}
                              data-editing={o || void 0}
                              aria-selected={isInSelection(t, i)}
                              aria-readonly={!canEditColumn(i) || void 0}
                              onPointerDown={(e) => {
                                o ||
                                  e.button !== 0 ||
                                  (e.target as HTMLElement).closest(`a`) ||
                                  (e.preventDefault(),
                                  scrollRef.current?.focus({
                                    preventScroll: true,
                                  }),
                                  editing && finishEditing(true),
                                  moveActiveCell(
                                    {
                                      r: t,
                                      c: i,
                                    },
                                    e.shiftKey,
                                  ),
                                  setDragging(true));
                              }}
                              onPointerEnter={() => {
                                dragging &&
                                  (cellStateRef.current.anchor ||
                                    setAnchorCell(cellStateRef.current.active),
                                  setActiveCell({
                                    r: t,
                                    c: i,
                                  }));
                              }}
                              onDoubleClick={() =>
                                startEditing({
                                  r: t,
                                  c: i,
                                })
                              }
                              key={n.key}
                            >
                              {o && editing ? (
                                <CellEditor
                                  column={n}
                                  value={editing.value}
                                  options={n.type === `tag` ? columnOptions(n) : void 0}
                                  onChange={(e) =>
                                    setEditing({
                                      cell: editing.cell,
                                      value: e,
                                    })
                                  }
                                  onDone={(e: boolean, n?: string, r?: string) =>
                                    finishEditing(
                                      e,
                                      n
                                        ? {
                                            r: t + +(n === `down`),
                                            c: i + +(n === `right`),
                                          }
                                        : void 0,
                                      r,
                                    )
                                  }
                                />
                              ) : (
                                <CellValue column={n} row={e} tone={tagTones} />
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {sortedRows.length === 0 && <p className={`ui-dt__empty`}>{`No rows yet`}</p>}
            </div>
          </div>
        </div>
        <footer className={`ui-dt__foot`}>
          {selectedIds.size > 0 ? (
            <div className={`ui-dt__bulk`} role={`status`}>
              <span>
                {selectedIds.size}
                {` selected`}
              </span>
              {editable && (
                <button
                  type={`button`}
                  className={`ui-dt__add ui-dt__add--danger`}
                  onClick={deleteSelectedRows}
                >
                  <DeleteRowsIcon />
                  {`Delete`}
                </button>
              )}
              <button
                type={`button`}
                className={`ui-dt__add`}
                onClick={() => updateSelection(new Set())}
              >{`Clear`}</button>
            </div>
          ) : editable ? (
            <button type={`button`} className={`ui-dt__add`} onClick={addRow}>
              <AddRowIcon />
              {`Add row`}
            </button>
          ) : (
            <span />
          )}
          <span className={`ui-dt__summary`} aria-live={`polite`}>
            {selectionSummary ?? (editable ? `Double-click a cell to edit` : ``)}
          </span>
        </footer>
      </section>
    </>
  );
}
function CellValue({
  column: column,
  row: row,
  tone: tone,
}: {
  column: DataColumn;
  row: DataRow;
  tone: Record<string, string>;
}) {
  let value = row[column.key];
  if (column.type === `title`)
    return (
      <span className={`ui-dt__name`}>
        {row.logo ? (
          <span className={`ui-dt__logo`}>{row.logo}</span>
        ) : (
          <span className={`ui-dt__logo ui-dt__logo--empty`} />
        )}
        <span className={`ui-dt__name-text`} data-empty={cellText(value) === `` || void 0}>
          {cellText(value) || `Untitled`}
        </span>
      </span>
    );
  if (cellText(value) === ``) return null;
  if (column.type === `tag`)
    return (
      <span className={`ui-dt__tag`} data-tone={tone[cellText(value)] ?? `blue`}>
        {value}
      </span>
    );
  if (column.type === `link`) {
    let e = /^https?:\/\//.test(cellText(value)) ? cellText(value) : `https://${cellText(value)}`;
    return (
      <a className={`ui-dt__link`} href={e} target={`_blank`} rel={`noreferrer`} tabIndex={-1}>
        {cellText(value).replace(/^https?:\/\//, ``)}
      </a>
    );
  }
  return column.type === `number` && typeof value == `number` ? (
    <span className={`ui-dt__text`}>{value.toLocaleString(`en-US`)}</span>
  ) : (
    <span className={`ui-dt__text`}>{value}</span>
  );
}
function CellEditor({
  column: column,
  value: value,
  options: options,
  onChange: onChange,
  onDone: onDone,
}: {
  column: DataColumn;
  value: string;
  options?: string[];
  onChange: (value: string) => void;
  onDone: EditDone;
}) {
  let inputRef = React.useRef<HTMLInputElement | null>(null);
  return (
    React.useEffect(() => {
      let e = inputRef.current;
      if (!e) return;
      e.focus();
      let t = e.value.length;
      e.setSelectionRange(t, t);
    }, []),
    options ? (
      <SelectCellEditor
        label={column.label}
        value={value}
        options={options}
        onChange={onChange}
        onDone={onDone}
      />
    ) : (
      <input
        ref={inputRef}
        className={`ui-dt__input`}
        value={value}
        inputMode={column.type === `number` ? `decimal` : void 0}
        aria-label={column.label}
        onChange={(e) => onChange(e.target.value)}
        onBlur={() => onDone(true)}
        onKeyDown={(e) => {
          e.key === `Enter`
            ? (e.preventDefault(), onDone(true, `down`))
            : e.key === `Tab`
              ? (e.preventDefault(), onDone(true, `right`))
              : e.key === `Escape` && (e.preventDefault(), onDone(false));
        }}
      />
    )
  );
}
function SelectCellEditor({
  label: label,
  value: value,
  options: options,
  onChange: onChange,
  onDone: onDone,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  onDone: EditDone;
}) {
  let anchorRef = React.useRef<HTMLSpanElement | null>(null),
    pickerRef = React.useRef<HTMLDivElement | null>(null),
    [position, setPosition] = React.useState<{ left: number; top: number; width: number } | null>(
      null,
    );
  return (
    React.useLayoutEffect(() => {
      let e = () => {
        let e = anchorRef.current?.closest(`td`),
          t = pickerRef.current;
        if (!e || !t) return;
        let n = e.getBoundingClientRect(),
          r = t.offsetHeight,
          i = window.innerHeight - n.top - 4 >= r + 8 ? n.top + 4 : Math.max(8, n.bottom - 4 - r);
        setPosition({
          left: n.left + 6,
          top: i,
          width: Math.max(n.width - 12, 160),
        });
      };
      return (
        e(),
        window.addEventListener(`scroll`, e, true),
        window.addEventListener(`resize`, e),
        () => {
          (window.removeEventListener(`scroll`, e, true), window.removeEventListener(`resize`, e));
        }
      );
    }, []),
    React.useEffect(() => {
      let e = (e: PointerEvent) => {
        pickerRef.current?.contains(e.target as Node) || onDone(false);
      };
      return (
        window.addEventListener(`pointerdown`, e, true),
        () => window.removeEventListener(`pointerdown`, e, true)
      );
    }, [onDone]),
    (
      <span ref={anchorRef} className={`ui-dt__picker-anchor`}>
        <div
          ref={pickerRef}
          className={`ui-dt__picker`}
          role={`listbox`}
          aria-label={label}
          style={
            position
              ? {
                  left: position.left,
                  top: position.top,
                  minWidth: position.width,
                }
              : {
                  visibility: `hidden`,
                }
          }
        >
          {options.map((e) => (
            <button
              type={`button`}
              role={`option`}
              aria-selected={e === value}
              className={`ui-dt__option`}
              autoFocus={e === value || (!value && e === options[0])}
              onPointerDown={(e) => e.stopPropagation()}
              onClick={() => {
                (onChange(e), onDone(true, void 0, e));
              }}
              onKeyDown={(e) => {
                e.key === `Escape` && onDone(false);
                let t = [...(e.currentTarget.parentElement?.querySelectorAll(`button`) ?? [])],
                  n = t.indexOf(e.currentTarget);
                (e.key === `ArrowDown` && t[Math.min(t.length - 1, n + 1)]?.focus(),
                  e.key === `ArrowUp` && t[Math.max(0, n - 1)]?.focus(),
                  e.key.startsWith(`Arrow`) && e.preventDefault());
              }}
              key={e}
            >
              {e}
            </button>
          ))}
        </div>
      </span>
    )
  );
}
function SelectionCheckbox({
  checked: checked,
  mixed: mixed,
  label: label,
  onChange: onChange,
}: {
  checked: boolean;
  mixed?: boolean;
  label: string;
  onChange: () => void;
}) {
  return (
    <button
      type={`button`}
      role={`checkbox`}
      aria-checked={mixed ? `mixed` : checked}
      aria-label={label}
      className={`ui-dt__check`}
      onPointerDown={(e) => e.stopPropagation()}
      onClick={onChange}
    >
      <svg viewBox={`0 0 16 16`} aria-hidden={`true`}>
        {mixed ? <path d={`M4.5 8h7`} /> : <path d={`m4.25 8.25 2.5 2.5 5-5.5`} />}
      </svg>
    </button>
  );
}
var AddRowIcon = () => (
  <svg
    viewBox={`0 0 16 16`}
    width={`14`}
    height={`14`}
    fill={`none`}
    stroke={`currentColor`}
    strokeWidth={`1.5`}
    strokeLinecap={`round`}
    aria-hidden={`true`}
  >
    <path d={`M8 3v10M3 8h10`} />
  </svg>
);
var DeleteRowsIcon = () => (
  <svg
    viewBox={`0 0 16 16`}
    width={`14`}
    height={`14`}
    fill={`none`}
    stroke={`currentColor`}
    strokeWidth={`1.4`}
    strokeLinecap={`round`}
    strokeLinejoin={`round`}
    aria-hidden={`true`}
  >
    <path d={`M3 4.5h10M6.5 4.5V3h3v1.5M4.5 4.5l.6 8.5h5.8l.6-8.5`} />
  </svg>
);
var UndoIcon = () => (
  <svg
    viewBox={`0 0 16 16`}
    width={`15`}
    height={`15`}
    fill={`none`}
    stroke={`currentColor`}
    strokeWidth={`1.4`}
    strokeLinecap={`round`}
    strokeLinejoin={`round`}
    aria-hidden={`true`}
  >
    <path d={`M5.5 3.5 2.5 6.5l3 3M2.5 6.5h7a4 4 0 0 1 0 8H7`} />
  </svg>
);
var RedoIcon = () => (
  <svg
    viewBox={`0 0 16 16`}
    width={`15`}
    height={`15`}
    fill={`none`}
    stroke={`currentColor`}
    strokeWidth={`1.4`}
    strokeLinecap={`round`}
    strokeLinejoin={`round`}
    aria-hidden={`true`}
  >
    <path d={`m10.5 3.5 3 3-3 3M13.5 6.5h-7a4 4 0 0 0 0 8H9`} />
  </svg>
);
var SortDirectionIcon = () => (
  <svg
    viewBox={`0 0 12 12`}
    width={`11`}
    height={`11`}
    fill={`none`}
    stroke={`currentColor`}
    strokeWidth={`1.4`}
    strokeLinecap={`round`}
    strokeLinejoin={`round`}
    aria-hidden={`true`}
  >
    <path d={`M6 2.5v7M3.5 7l2.5 2.5L8.5 7`} />
  </svg>
);
function useMorphHeight(contentRef: React.RefObject<HTMLElement | null>) {
  let wrapperRef = React.useRef<HTMLDivElement | null>(null);
  return (
    React.useLayoutEffect(() => {
      let n = wrapperRef.current,
        r = contentRef.current;
      if (!n || !r) return;
      let i = () => {
        n.style.height = `${r.offsetHeight}px`;
      };
      i();
      let a = new ResizeObserver(i);
      a.observe(r);
      let o = requestAnimationFrame(() => n.setAttribute(`data-smooth`, ``));
      return () => {
        (a.disconnect(), cancelAnimationFrame(o));
      };
    }, [contentRef]),
    wrapperRef
  );
}
var dataTableStyles = `
.ui-dt {
  --ui-dt-card: #ffffff;
  --ui-dt-line: #ececec;
  --ui-dt-grid: #f0f0f0;
  --ui-dt-ink: #171717;
  --ui-dt-text: #404040;
  --ui-dt-muted: #8f8f8f;
  --ui-dt-faint: #b5b5b5;
  --ui-dt-hover: #fafafa;
  --ui-dt-selected: #f5f8ff;
  --ui-dt-accent: #2f6bff;
  --ui-dt-range: rgba(47, 107, 255, 0.07);
  --ui-dt-tray: #f0f0f0;
  --ui-dt-accent-ink: #2f6bff;
  --ui-dt-border: #e5e5e5;
  --ui-dt-col-active: #fafbff;
  --ui-dt-th-hover: #f6f6f6;
  --ui-dt-active-blur: #a9c1ff;
  --ui-dt-edit: #fff;
  --ui-dt-pop: #fff;
  --ui-dt-pop-ring: #e5e5e5;
  --ui-dt-option-hover: #f5f5f5;
  --ui-dt-check-bg: #fff;
  --ui-dt-check-border: #d4d4d4;
  --ui-dt-check-border-hover: #a3a3a3;
  --ui-dt-check-mark: #fff;
  --ui-dt-underline: #d4d4d4;
  --ui-dt-wash: rgba(0, 0, 0, 0.05);
  --ui-dt-wash-soft: rgba(0, 0, 0, 0.04);
  --ui-dt-danger: #e5484d;
  --ui-dt-danger-hover: #d13438;
  --ui-dt-danger-wash: rgba(229, 72, 77, 0.08);
  --ui-dt-card-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);
  --ui-dt-pop-shadow: 0 10px 28px -8px rgba(0, 0, 0, 0.18);
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
  /* Like the Chat Composer: a gray tray with the title, the white table card sits on top of it */
  background: var(--ui-dt-tray);
  /* The gray tray frames the white card on every side */
  padding: 6px;
  border-radius: 22px;
  font-family: "Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  color: var(--ui-dt-ink);
  -webkit-font-smoothing: antialiased;
}
.ui-dt *, .ui-dt *::before, .ui-dt *::after { box-sizing: border-box; }
.ui-dt button { margin: 0; font: inherit; color: inherit; cursor: pointer; }

.ui-dt__head {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 10px 8px 18px;
  min-height: 46px;
}
.ui-dt__title {
  margin: 0;
  font-size: 15px;
  font-weight: 500;
  line-height: 22px;
  letter-spacing: -0.01em;
}
.ui-dt__title-icon { display: grid; }
.ui-dt__title-icon svg { width: 18px; height: 18px; }
.ui-dt__tools {
  display: flex;
  gap: 2px;
  margin-left: auto;
}
.ui-dt__tool {
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
  padding: 0;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: var(--ui-dt-text) !important;
  transition: background-color 140ms ease, opacity 140ms ease;
}
.ui-dt__tool:hover:not(:disabled) { background: var(--ui-dt-wash); }
.ui-dt__tool:disabled { opacity: 0.35; cursor: default; }
.ui-dt__tool:focus-visible { outline: 2px solid var(--ui-dt-accent); outline-offset: 1px; }

.ui-dt__card {
  overflow: hidden;
  background: var(--ui-dt-card);
  border: 1px solid var(--ui-dt-border);
  border-radius: 16px;
  box-shadow: var(--ui-dt-card-shadow);
}
.ui-dt__scroll {
  overflow-x: auto;
  scrollbar-width: thin;
  outline: none;
}
.ui-dt__scroll[data-dragging] { cursor: cell; user-select: none; }

.ui-dt__table {
  width: 100%;
  min-width: 640px;
  border-collapse: collapse;
  table-layout: fixed;
  font-size: 14px;
  line-height: 20px;
}
/* Every row is 44px high and the selection column 44px wide, so its cells are squares */
.ui-dt__table th,
.ui-dt__table td {
  position: relative;
  height: 44px;
  padding: 0 14px;
  border-top: 1px solid var(--ui-dt-grid);
  border-left: 1px solid var(--ui-dt-grid);
  text-align: left;
  vertical-align: middle;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.ui-dt__table th:first-child,
.ui-dt__table td:first-child { border-left: 0; }
.ui-dt__table th {
  padding: 0 6px;
  font-weight: 450;
  color: var(--ui-dt-muted);
  border-top: 0;
  transition: background-color 140ms ease;
}
.ui-dt__table th[data-col-active] { background: var(--ui-dt-col-active); }
.ui-dt__th {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  height: 32px;
  padding: 0 8px;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: inherit !important;
  text-align: left;
  transition: background-color 140ms ease, color 140ms ease;
}
.ui-dt__th:hover { background: var(--ui-dt-th-hover); color: var(--ui-dt-text) !important; }
.ui-dt__th:focus-visible { outline: 2px solid var(--ui-dt-accent); outline-offset: -2px; }
.ui-dt__th-label { overflow: hidden; text-overflow: ellipsis; }
.ui-dt__col-icon { display: grid; color: var(--ui-dt-faint); }
.ui-dt__sort {
  display: grid;
  margin-left: auto;
  color: var(--ui-dt-faint);
  opacity: 0;
  transition: opacity 140ms ease, transform 220ms cubic-bezier(0.22, 1, 0.36, 1);
}
.ui-dt__th:hover .ui-dt__sort { opacity: 1; }
.ui-dt__sort[data-dir] { opacity: 1; color: var(--ui-dt-accent-ink); }
.ui-dt__sort[data-dir="asc"] { transform: rotate(180deg); }

/* Selection column: one checkbox per row, centered */
.ui-dt__table .ui-dt__select { padding: 0; text-align: center; }
.ui-dt__select .ui-dt__check { margin: 0 auto; }

.ui-dt__table tbody tr { transition: background-color 140ms ease; }
.ui-dt__table tbody tr:hover { background: var(--ui-dt-hover); }
.ui-dt__table tbody tr[data-selected] { background: var(--ui-dt-selected); }

/* Cell selection: a blue frame on the active cell, a soft tint on the rest of the range */
.ui-dt__table td[data-cell] { cursor: cell; }
.ui-dt__table td[data-in-range] { background: var(--ui-dt-range); }
.ui-dt__table td[data-active]::after {
  content: "";
  position: absolute;
  inset: 0;
  border: 2px solid var(--ui-dt-accent);
  border-radius: 3px;
  pointer-events: none;
}
.ui-dt__scroll:not(:focus-within) td[data-active]::after { border-color: var(--ui-dt-active-blur); }
.ui-dt__table td[data-editing] {
  padding: 0;
  overflow: visible;
  background: var(--ui-dt-edit);
}

.ui-dt__input {
  width: 100%;
  height: 100%;
  padding: 0 14px;
  border: 0;
  outline: none;
  background: transparent;
  font: inherit;
  color: var(--ui-dt-ink);
}
.ui-dt__table td[data-type="number"] .ui-dt__input { font-variant-numeric: tabular-nums; }

/* Tag picker: a fixed layer lined up with the cell, above the card and the gray footer */
.ui-dt__picker-anchor { display: block; }
.ui-dt__picker {
  position: fixed;
  z-index: 50;
  display: grid;
  gap: 2px;
  padding: 4px;
  border-radius: 12px;
  background: var(--ui-dt-pop);
  box-shadow: 0 0 0 1px var(--ui-dt-pop-ring), var(--ui-dt-pop-shadow);
  animation: ui-dt-drop 180ms cubic-bezier(0.22, 1, 0.36, 1);
}
.ui-dt__option {
  height: 30px;
  padding: 0 10px;
  border: 0;
  border-radius: 8px;
  background: transparent;
  font-size: 13px !important;
  text-align: left;
  color: var(--ui-dt-text) !important;
}
.ui-dt__option:hover,
.ui-dt__option:focus-visible { background: var(--ui-dt-option-hover); outline: none; }
.ui-dt__option[aria-selected="true"] { color: var(--ui-dt-accent-ink) !important; font-weight: 500; }

.ui-dt__name {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
}
.ui-dt__name-text { overflow: hidden; text-overflow: ellipsis; color: var(--ui-dt-ink); }
.ui-dt__name-text[data-empty] { color: var(--ui-dt-faint); }
.ui-dt__logo {
  display: grid;
  place-items: center;
  flex: none;
  width: 18px;
  height: 18px;
}
.ui-dt__logo svg { width: 100%; height: 100%; }
.ui-dt__logo--empty { border-radius: 5px; background: var(--ui-dt-grid); }

.ui-dt__check {
  display: grid;
  place-items: center;
  flex: none;
  width: 16px;
  height: 16px;
  padding: 0;
  border: 1px solid var(--ui-dt-check-border);
  border-radius: 5px;
  background: var(--ui-dt-check-bg);
  transition: background-color 140ms ease, border-color 140ms ease;
}
.ui-dt__check:hover { border-color: var(--ui-dt-check-border-hover); }
.ui-dt__check:focus-visible { outline: 2px solid var(--ui-dt-accent); outline-offset: 2px; }
.ui-dt__check svg {
  width: 12px;
  height: 12px;
  fill: none;
  stroke: var(--ui-dt-check-mark);
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
  opacity: 0;
  transform: scale(0.6);
  transition: opacity 140ms ease, transform 220ms cubic-bezier(0.34, 1.56, 0.64, 1);
}
.ui-dt__check[aria-checked="true"],
.ui-dt__check[aria-checked="mixed"] { background: var(--ui-dt-ink); border-color: var(--ui-dt-ink); }
.ui-dt__check[aria-checked="true"] svg,
.ui-dt__check[aria-checked="mixed"] svg { opacity: 1; transform: none; }

/* Tags: soft fill with a hairline in the same hue */
.ui-dt__tag {
  display: inline-block;
  max-width: 100%;
  padding: 2px 9px;
  border-radius: 7px;
  font-size: 13px;
  font-weight: 450;
  line-height: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  vertical-align: middle;
}
.ui-dt__tag[data-tone="blue"] { background: #eef3ff; color: #2f6bff; box-shadow: inset 0 0 0 1px #dce6ff; }
.ui-dt__tag[data-tone="violet"] { background: #f4f0ff; color: #7c4dff; box-shadow: inset 0 0 0 1px #e7dfff; }
.ui-dt__tag[data-tone="pink"] { background: #fff0f6; color: #db2777; box-shadow: inset 0 0 0 1px #fde0ec; }
.ui-dt__tag[data-tone="green"] { background: #edfaf3; color: #15803d; box-shadow: inset 0 0 0 1px #d5f2e2; }
.ui-dt__tag[data-tone="amber"] { background: #fff6e8; color: #b45309; box-shadow: inset 0 0 0 1px #fde9c8; }
.ui-dt__tag[data-tone="gray"] { background: #f5f5f5; color: #525252; box-shadow: inset 0 0 0 1px #ebebeb; }

.ui-dt__link {
  color: var(--ui-dt-text);
  text-decoration: underline;
  text-decoration-color: var(--ui-dt-underline);
  text-underline-offset: 3px;
  transition: text-decoration-color 140ms ease, color 140ms ease;
}
.ui-dt__link:hover { color: var(--ui-dt-ink); text-decoration-color: currentColor; }
.ui-dt__text { color: var(--ui-dt-text); font-variant-numeric: tabular-nums; }
.ui-dt__empty {
  margin: 0;
  padding: 24px;
  font-size: 14px;
  text-align: center;
  color: var(--ui-dt-muted);
}

/* Gray extension under the card: add row or bulk actions on the left, the selection summary on the right */
.ui-dt__foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  min-height: 44px;
  padding: 6px 16px 7px 8px;
}
.ui-dt__bulk {
  display: flex;
  align-items: center;
  gap: 4px;
  padding-left: 10px;
  font-size: 14px;
  font-weight: 500;
}
.ui-dt__bulk > span { margin-right: 6px; }
.ui-dt__add {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 30px;
  padding: 0 10px;
  border: 0;
  border-radius: 8px;
  background: none;
  font-size: 14px;
  color: var(--ui-dt-muted) !important;
  transition: background-color 140ms ease, color 140ms ease;
}
.ui-dt__add:hover { background: var(--ui-dt-wash-soft); color: var(--ui-dt-ink) !important; }
.ui-dt__add--danger { color: var(--ui-dt-danger) !important; }
.ui-dt__add--danger:hover { background: var(--ui-dt-danger-wash); color: var(--ui-dt-danger-hover) !important; }
.ui-dt__add:focus-visible { outline: 2px solid var(--ui-dt-accent); outline-offset: 2px; }
.ui-dt__summary {
  overflow: hidden;
  font-size: 13px;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: var(--ui-dt-muted);
}

@keyframes ui-dt-drop {
  from { opacity: 0; transform: translateY(-4px) scale(0.98); }
}

@media (prefers-reduced-motion: reduce) {
  .ui-dt__table tbody tr, .ui-dt__check, .ui-dt__check svg, .ui-dt__sort { transition: none; }
  .ui-dt__picker { animation: none; }
}

/* Height changes glide instead of jumping */
.ui-dt__morph { overflow: hidden; }
.ui-dt__morph[data-smooth] { transition: height 380ms cubic-bezier(0.22, 1, 0.36, 1); }
@media (prefers-reduced-motion: reduce) { .ui-dt__morph[data-smooth] { transition: none; } }

/* Dark mode: follows a .dark class or data-theme="dark" on any ancestor, e.g. <html>.
   The fixed tag picker stays inside .ui-dt in the DOM, so it inherits these values too. */

/* Text fields: no focus box while typing – also against global :focus-visible rules of the host page */
.ui-dt input:not([type="checkbox"]):not([type="radio"]):focus-visible,
.ui-dt textarea:focus-visible,
.ui-dt [contenteditable]:focus-visible { outline: none; }
:where(.dark, [data-theme="dark"]) .ui-dt {
  --ui-dt-card: #232326;
  --ui-dt-line: rgba(255, 255, 255, 0.08);
  --ui-dt-grid: rgba(255, 255, 255, 0.07);
  --ui-dt-ink: #ededed;
  --ui-dt-text: #c4c4c4;
  --ui-dt-muted: #8f8f8f;
  --ui-dt-faint: #6b6b70;
  --ui-dt-hover: rgba(255, 255, 255, 0.03);
  --ui-dt-selected: rgba(47, 107, 255, 0.12);
  --ui-dt-range: rgba(47, 107, 255, 0.16);
  --ui-dt-tray: #161618;
  --ui-dt-accent-ink: #6b95ff;
  --ui-dt-border: rgba(255, 255, 255, 0.08);
  --ui-dt-col-active: rgba(47, 107, 255, 0.08);
  --ui-dt-th-hover: rgba(255, 255, 255, 0.06);
  --ui-dt-active-blur: rgba(107, 149, 255, 0.55);
  --ui-dt-edit: #2a2a2d;
  --ui-dt-pop: #2a2a2d;
  --ui-dt-pop-ring: rgba(255, 255, 255, 0.1);
  --ui-dt-option-hover: #313135;
  --ui-dt-check-bg: #2a2a2d;
  --ui-dt-check-border: rgba(255, 255, 255, 0.2);
  --ui-dt-check-border-hover: rgba(255, 255, 255, 0.36);
  --ui-dt-check-mark: #121213;
  --ui-dt-underline: rgba(255, 255, 255, 0.22);
  --ui-dt-wash: rgba(255, 255, 255, 0.06);
  --ui-dt-wash-soft: rgba(255, 255, 255, 0.06);
  --ui-dt-danger: #ff6369;
  --ui-dt-danger-hover: #ff8589;
  --ui-dt-danger-wash: rgba(229, 72, 77, 0.14);
  --ui-dt-card-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
  --ui-dt-pop-shadow: 0 12px 30px -8px rgba(0, 0, 0, 0.55);
}
:where(.dark, [data-theme="dark"]) .ui-dt__tag[data-tone="blue"] { background: rgba(47, 107, 255, 0.16); color: #8aabff; box-shadow: inset 0 0 0 1px rgba(47, 107, 255, 0.28); }
:where(.dark, [data-theme="dark"]) .ui-dt__tag[data-tone="violet"] { background: rgba(124, 77, 255, 0.18); color: #b49cff; box-shadow: inset 0 0 0 1px rgba(124, 77, 255, 0.3); }
:where(.dark, [data-theme="dark"]) .ui-dt__tag[data-tone="pink"] { background: rgba(236, 72, 153, 0.16); color: #f472b6; box-shadow: inset 0 0 0 1px rgba(236, 72, 153, 0.28); }
:where(.dark, [data-theme="dark"]) .ui-dt__tag[data-tone="green"] { background: rgba(34, 197, 94, 0.14); color: #4ade80; box-shadow: inset 0 0 0 1px rgba(34, 197, 94, 0.26); }
:where(.dark, [data-theme="dark"]) .ui-dt__tag[data-tone="amber"] { background: rgba(245, 158, 11, 0.14); color: #fbbf24; box-shadow: inset 0 0 0 1px rgba(245, 158, 11, 0.26); }
:where(.dark, [data-theme="dark"]) .ui-dt__tag[data-tone="gray"] { background: #2a2a2d; color: #c4c4c4; box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.08); }
`;
var valueValue4: IconNode = [
  [
    `path`,
    {
      d: `M7 17L7 13`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeWidth: `1.5`,
      key: `0`,
    },
  ],
  [
    `path`,
    {
      d: `M12 17L12 7`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeWidth: `1.5`,
      key: `1`,
    },
  ],
  [
    `path`,
    {
      d: `M17 17L17 11`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeWidth: `1.5`,
      key: `2`,
    },
  ],
  [
    `path`,
    {
      d: `M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z`,
      stroke: `currentColor`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `3`,
    },
  ],
];
var svgDefaults = {
  xmlns: `http://www.w3.org/2000/svg`,
  width: 24,
  height: 24,
  viewBox: `0 0 24 24`,
  fill: `none`,
};
var HugeiconsIcon = React.forwardRef<SVGSVGElement, HugeiconsProps>(
  (
    {
      color = `currentColor`,
      size = 24,
      strokeWidth: strokeWidth,
      absoluteStrokeWidth = false,
      className = ``,
      altIcon: altIcon,
      showAlt = false,
      icon: icon,
      primaryColor: primaryColor,
      secondaryColor: secondaryColor,
      disableSecondaryOpacity = false,
      ...p
    },
    m,
  ) => {
    let h =
        strokeWidth === void 0
          ? void 0
          : absoluteStrokeWidth
            ? (Number(strokeWidth) * 24) / Number(size)
            : strokeWidth,
      g =
        h === void 0
          ? {}
          : {
              strokeWidth: h,
              stroke: `currentColor`,
            },
      _: React.SVGProps<SVGSVGElement> = {
        ref: m,
        ...svgDefaults,
        width: size,
        height: size,
        color: primaryColor || color,
        className: className,
        ...g,
        ...p,
      },
      v = [...(showAlt && altIcon ? altIcon : icon)]
        .sort(([, e], [, t]) => {
          let n = e.opacity !== void 0;
          return t.opacity === void 0 ? (n ? -1 : 0) : 1;
        })
        .map(([n, r]) => {
          let i = r.opacity !== void 0,
            a = i && !disableSecondaryOpacity ? r.opacity : void 0,
            o = secondaryColor
              ? {
                  ...(r.stroke === void 0
                    ? {
                        fill: i ? secondaryColor : primaryColor || color,
                      }
                    : {
                        stroke: i ? secondaryColor : primaryColor || color,
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
function SetupGuide({
  title = `Setup guide`,
  groups: groups,
  onEdit: onEdit,
  onClose: onClose,
  onChange: onChange,
  className: className,
}: SetupGuideProps) {
  let [completedTaskIds, setCompletedTaskIds] = React.useState(
      () => new Set(groups.flatMap((e) => e.tasks.filter((e) => e.done).map((e) => e.id))),
    ),
    firstIncompleteGroup = groups.find((e) => e.tasks.some((e) => !completedTaskIds.has(e.id))),
    [expandedGroup, setExpandedGroup] = React.useState(firstIncompleteGroup?.id ?? null),
    [minimized, setMinimized] = React.useState(false),
    totalTasks = groups.reduce((e, t) => e + t.tasks.length, 0),
    progress = totalTasks ? completedTaskIds.size / totalTasks : 0,
    toggleTask = (e: SetupGroup, n: string) => {
      let r = new Set(completedTaskIds);
      if (
        (r.has(n) ? r.delete(n) : r.add(n),
        setCompletedTaskIds(r),
        onChange?.([...r]),
        e.tasks.every((e) => r.has(e.id)))
      ) {
        let e = groups.find((e) => e.tasks.some((e) => !r.has(e.id)));
        window.setTimeout(() => setExpandedGroup(e?.id ?? null), 420);
      }
    };
  return (
    <>
      <style href={`ui-setup-guide`} precedence={`default`}>
        {setupGuideStyles}
      </style>
      <section className={[`ui-sg`, className].filter(Boolean).join(` `)} aria-label={title}>
        <header className={`ui-sg__head`}>
          <h3 className={`ui-sg__title`}>{title}</h3>
          <div className={`ui-sg__actions`}>
            {onEdit && (
              <button type={`button`} className={`ui-sg__edit`} onClick={onEdit}>{`Edit`}</button>
            )}
            <button
              type={`button`}
              className={`ui-sg__icon-btn`}
              aria-label={minimized ? `Expand setup guide` : `Minimize setup guide`}
              aria-expanded={!minimized}
              onClick={() => setMinimized((e) => !e)}
            >
              {minimized ? <ChevronDownIcon2 /> : <ChevronUpIcon />}
            </button>
            {onClose && (
              <button
                type={`button`}
                className={`ui-sg__icon-btn`}
                aria-label={`Close setup guide`}
                onClick={onClose}
              >
                <CloseIcon2 />
              </button>
            )}
          </div>
        </header>
        <span
          className={`ui-sg__track`}
          role={`progressbar`}
          aria-label={`${title} progress`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress * 100)}
        >
          <span
            className={`ui-sg__fill`}
            style={{
              transform: `scaleX(${progress})`,
            }}
          />
        </span>
        <div className={`ui-sg__body`} data-hidden={minimized || void 0}>
          <div className={`ui-sg__groups`}>
            {groups.map((e) => {
              let t = expandedGroup === e.id,
                n = e.tasks.every((e) => completedTaskIds.has(e.id)),
                i = e.tasks.find((e) => !completedTaskIds.has(e.id))?.id,
                o = e.tasks.findIndex((e) => e.id === i),
                s = `ui-sg-${e.id}`;
              return (
                <div className={`ui-sg__group`} data-open={t || void 0} key={e.id}>
                  <button
                    type={`button`}
                    className={`ui-sg__group-head`}
                    aria-expanded={t}
                    aria-controls={s}
                    onClick={() => setExpandedGroup(t ? null : e.id)}
                  >
                    <span className={`ui-sg__group-title`} data-done={n || void 0}>
                      {e.title}
                    </span>
                    <TaskMark />
                  </button>
                  <div className={`ui-sg__panel`} id={s} inert={!t}>
                    <ul className={`ui-sg__tasks`}>
                      {e.tasks.map((t, n) => {
                        let i = completedTaskIds.has(t.id),
                          a = !i && o !== -1 && n > o,
                          s = i ? `done` : a ? `locked` : `current`;
                        return (
                          <li key={t.id}>
                            <button
                              type={`button`}
                              className={`ui-sg__task`}
                              data-state={s}
                              disabled={a}
                              aria-pressed={i}
                              onClick={() => toggleTask(e, t.id)}
                            >
                              <span className={`ui-sg__mark`} aria-hidden={`true`}>
                                {s === `done` ? (
                                  <SetupProgressIcon />
                                ) : s === `locked` ? (
                                  <CheckIcon2 />
                                ) : null}
                              </span>
                              <span className={`ui-sg__task-label`}>{t.label}</span>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
var TaskMark = () => (
  <svg
    className={`ui-sg__chevron`}
    viewBox={`0 0 16 16`}
    fill={`none`}
    stroke={`currentColor`}
    strokeWidth={`1.6`}
    strokeLinecap={`round`}
    strokeLinejoin={`round`}
    aria-hidden={`true`}
  >
    <path d={`m4.5 6.25 3.5 3.5 3.5-3.5`} />
  </svg>
);
var ChevronUpIcon = () => (
  <svg
    viewBox={`0 0 16 16`}
    fill={`none`}
    stroke={`currentColor`}
    strokeWidth={`1.5`}
    strokeLinecap={`round`}
    strokeLinejoin={`round`}
    aria-hidden={`true`}
  >
    <path d={`M9.5 2.5v4h4M9.5 6.5l4.5-4.5M6.5 13.5v-4h-4M6.5 9.5 2 14`} />
  </svg>
);
var ChevronDownIcon2 = () => (
  <svg
    viewBox={`0 0 16 16`}
    fill={`none`}
    stroke={`currentColor`}
    strokeWidth={`1.5`}
    strokeLinecap={`round`}
    strokeLinejoin={`round`}
    aria-hidden={`true`}
  >
    <path d={`M10 2h4v4M14 2 9.5 6.5M6 14H2v-4M2 14l4.5-4.5`} />
  </svg>
);
var CloseIcon2 = () => (
  <svg
    viewBox={`0 0 16 16`}
    fill={`none`}
    stroke={`currentColor`}
    strokeWidth={`1.5`}
    strokeLinecap={`round`}
    aria-hidden={`true`}
  >
    <path d={`m3.5 3.5 9 9M12.5 3.5l-9 9`} />
  </svg>
);
var SetupProgressIcon = () => (
  <svg viewBox={`0 0 16 16`} aria-hidden={`true`}>
    <circle cx={`8`} cy={`8`} r={`7`} fill={`currentColor`} />
    <path
      d={`m5 8.2 2 2 4-4.2`}
      fill={`none`}
      stroke={`#fff`}
      strokeWidth={`1.6`}
      strokeLinecap={`round`}
      strokeLinejoin={`round`}
    />
  </svg>
);
var CheckIcon2 = () => (
  <svg
    viewBox={`0 0 16 16`}
    fill={`none`}
    stroke={`currentColor`}
    strokeWidth={`1.5`}
    aria-hidden={`true`}
  >
    <circle cx={`8`} cy={`8`} r={`6`} />
    <path d={`m4 12 8-8`} />
  </svg>
);
var setupGuideStyles = `
.ui-sg {
  --ui-sg-card: #ffffff;
  --ui-sg-line: #ececec;
  --ui-sg-ink: #171717;
  --ui-sg-text: #262626;
  --ui-sg-muted: #a3a3a3;
  --ui-sg-icon: #737373;
  --ui-sg-track: #ececec;
  --ui-sg-accent: #2f6bff;
  --ui-sg-open: #f6f6f7;
  --ui-sg-dot: #e1e3e8;
  --ui-sg-ease: cubic-bezier(0.22, 1, 0.36, 1);
  box-sizing: border-box;
  width: 100%;
  max-width: 320px;
  padding: 16px 8px 8px;
  background: var(--ui-sg-card);
  border: 1px solid var(--ui-sg-line);
  border-radius: 20px;
  box-shadow:
    0 1px 2px rgba(0, 0, 0, 0.03),
    0 8px 24px rgba(0, 0, 0, 0.035);
  font-family: "Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  color: var(--ui-sg-ink);
  -webkit-font-smoothing: antialiased;
}
.ui-sg *, .ui-sg *::before, .ui-sg *::after { box-sizing: border-box; }
.ui-sg button {
  margin: 0;
  border: 0;
  background: none;
  font: inherit;
  color: inherit;
  cursor: pointer;
}
.ui-sg button:focus-visible {
  outline: 2px solid var(--ui-sg-accent);
  outline-offset: 2px;
}

.ui-sg__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 0 8px;
}
.ui-sg__title {
  margin: 0;
  font-size: 15px;
  font-weight: 600;
  line-height: 22px;
}
.ui-sg__actions {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-right: -4px;
}
.ui-sg__edit {
  padding: 2px 6px;
  border-radius: 6px;
  font-size: 14px;
  line-height: 20px;
  color: var(--ui-sg-accent) !important;
  transition: opacity 160ms ease;
}
.ui-sg__edit:hover { opacity: 0.75; }
.ui-sg__icon-btn {
  display: grid;
  place-items: center;
  width: 26px;
  height: 26px;
  border-radius: 7px;
  color: var(--ui-sg-icon) !important;
  transition: background-color 160ms ease, color 160ms ease;
}
.ui-sg__icon-btn:hover { background: #f2f2f2 !important; color: var(--ui-sg-ink) !important; }
.ui-sg__icon-btn svg { width: 16px; height: 16px; }

/* One continuous bar for all tasks */
.ui-sg__track {
  display: block;
  height: 5px;
  margin: 10px 8px 8px;
  overflow: hidden;
  border-radius: 3px;
  background: var(--ui-sg-track);
}
.ui-sg__fill {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: var(--ui-sg-accent);
  transform-origin: left center;
  transition: transform 700ms var(--ui-sg-ease);
}

/* Minimize folds the whole list away */
.ui-sg__body {
  display: grid;
  grid-template-rows: 1fr;
  transition: grid-template-rows 420ms var(--ui-sg-ease), opacity 260ms ease;
}
.ui-sg__body[data-hidden] { grid-template-rows: 0fr; opacity: 0; }
.ui-sg__groups { min-height: 0; overflow: hidden; }

.ui-sg__group {
  border-radius: 12px;
  transition: background-color 260ms ease;
}
.ui-sg__group[data-open] { background: var(--ui-sg-open); }
.ui-sg__group-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  width: 100%;
  padding: 11px 12px;
  border-radius: 12px;
  text-align: left;
}
.ui-sg__group-title {
  position: relative;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  transition: color 300ms ease;
}
/* Finished: a line draws through the title */
.ui-sg__group-title::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: 52%;
  height: 1.5px;
  border-radius: 1px;
  background: currentColor;
  transform: scaleX(0);
  transform-origin: left center;
  transition: transform 420ms var(--ui-sg-ease);
}
.ui-sg__group-title[data-done]::after { transform: scaleX(1); }
.ui-sg__chevron {
  flex: none;
  width: 16px;
  height: 16px;
  color: var(--ui-sg-icon);
  transition: transform 320ms var(--ui-sg-ease);
}
.ui-sg__group[data-open] .ui-sg__chevron { transform: rotate(180deg); }

/* Each group is a dropdown */
.ui-sg__panel {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 380ms var(--ui-sg-ease);
}
.ui-sg__group[data-open] .ui-sg__panel { grid-template-rows: 1fr; }
.ui-sg__tasks {
  min-height: 0;
  overflow: hidden;
  margin: 0;
  padding: 0;
  list-style: none;
}
.ui-sg__tasks li:last-child { padding-bottom: 8px; }
.ui-sg__task {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  width: 100%;
  padding: 7px 12px;
  border-radius: 10px;
  text-align: left;
  opacity: 0;
  transform: translateY(-4px);
  transition: opacity 260ms ease, transform 320ms var(--ui-sg-ease), color 260ms ease;
}
.ui-sg__group[data-open] .ui-sg__task { opacity: 1; transform: none; transition-delay: 80ms; }
.ui-sg__task[data-state="current"] { color: var(--ui-sg-text); }
.ui-sg__task[data-state="current"]:hover .ui-sg__mark { background: #d3d7de; }
.ui-sg__task[data-state="locked"] { color: var(--ui-sg-muted); cursor: default; }
.ui-sg__task[data-state="done"] { color: var(--ui-sg-muted); }
.ui-sg__mark {
  display: grid;
  place-items: center;
  flex: none;
  width: 16px;
  height: 16px;
  margin-top: 2px;
  border-radius: 50%;
  transition: background-color 200ms ease;
}
.ui-sg__task[data-state="current"] .ui-sg__mark { background: var(--ui-sg-dot); }
.ui-sg__task[data-state="locked"] .ui-sg__mark { color: #d4d4d4; }
.ui-sg__task[data-state="done"] .ui-sg__mark { color: var(--ui-sg-accent); }
.ui-sg__mark svg { width: 16px; height: 16px; }
.ui-sg__task[data-state="done"] .ui-sg__mark svg { animation: ui-sg-pop 420ms var(--ui-sg-ease); }
.ui-sg__task-label {
  font-size: 14px;
  line-height: 20px;
  text-decoration-line: line-through;
  text-decoration-color: transparent;
  text-decoration-thickness: 1.5px;
  transition: text-decoration-color 260ms ease;
}
.ui-sg__task[data-state="done"] .ui-sg__task-label { text-decoration-color: currentColor; }

@keyframes ui-sg-pop {
  from { transform: scale(0.5); opacity: 0; }
}

@media (prefers-reduced-motion: reduce) {
  .ui-sg__fill, .ui-sg__body, .ui-sg__panel, .ui-sg__task, .ui-sg__chevron, .ui-sg__group-title::after { transition: none; }
  .ui-sg__mark svg { animation: none !important; }
}

/* Dark mode: follows a .dark class or data-theme="dark" on any ancestor, e.g. <html> */
:where(.dark, [data-theme="dark"]) .ui-sg {
  --ui-sg-card: #232326;
  --ui-sg-line: rgba(255, 255, 255, 0.08);
  --ui-sg-ink: #ededed;
  --ui-sg-text: #dcdcdc;
  --ui-sg-muted: #8f8f8f;
  --ui-sg-icon: #8f8f8f;
  --ui-sg-track: rgba(255, 255, 255, 0.1);
  --ui-sg-open: #2a2a2d;
  --ui-sg-dot: #3a3a3f;
  box-shadow:
    0 1px 2px rgba(0, 0, 0, 0.4),
    0 8px 24px rgba(0, 0, 0, 0.35);
}
:where(.dark, [data-theme="dark"]) .ui-sg__edit { color: #6b95ff !important; }
:where(.dark, [data-theme="dark"]) .ui-sg__icon-btn:hover { background: rgba(255, 255, 255, 0.06) !important; }
:where(.dark, [data-theme="dark"]) .ui-sg__task[data-state="current"]:hover .ui-sg__mark { background: #4a4a50; }
:where(.dark, [data-theme="dark"]) .ui-sg__task[data-state="locked"] .ui-sg__mark { color: #4a4a50; }
`;
var ChevronDownIcon: IconNode = [
  [
    `path`,
    {
      d: `M18 9.00005C18 9.00005 13.5811 15 12 15C10.4188 15 6 9 6 9`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `0`,
    },
  ],
];
var ChevronRightIcon: IconNode = [
  [
    `path`,
    {
      d: `M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `0`,
    },
  ],
];
var CloseIcon: IconNode = [
  [
    `path`,
    {
      d: `M18 6L6.00081 17.9992M17.9992 18L6 6.00085`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `0`,
    },
  ],
];
var GridIcon: IconNode = [
  [
    `path`,
    {
      d: `M10.5 8.75V6.75C10.5 5.10626 10.5 4.28439 10.046 3.73121C9.96291 3.62995 9.87005 3.53709 9.76879 3.45398C9.21561 3 8.39374 3 6.75 3C5.10626 3 4.28439 3 3.73121 3.45398C3.62995 3.53709 3.53709 3.62995 3.45398 3.73121C3 4.28439 3 5.10626 3 6.75V8.75C3 10.3937 3 11.2156 3.45398 11.7688C3.53709 11.8701 3.62995 11.9629 3.73121 12.046C4.28439 12.5 5.10626 12.5 6.75 12.5C8.39374 12.5 9.21561 12.5 9.76879 12.046C9.87005 11.9629 9.96291 11.8701 10.046 11.7688C10.5 11.2156 10.5 10.3937 10.5 8.75Z`,
      stroke: `currentColor`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `0`,
    },
  ],
  [
    `path`,
    {
      d: `M7.75 15.5H5.75C5.05222 15.5 4.70333 15.5 4.41943 15.5861C3.78023 15.78 3.28002 16.2802 3.08612 16.9194C3 17.2033 3 17.5522 3 18.25C3 18.9478 3 19.2967 3.08612 19.5806C3.28002 20.2198 3.78023 20.72 4.41943 20.9139C4.70333 21 5.05222 21 5.75 21H7.75C8.44778 21 8.79667 21 9.08057 20.9139C9.71977 20.72 10.22 20.2198 10.4139 19.5806C10.5 19.2967 10.5 18.9478 10.5 18.25C10.5 17.5522 10.5 17.2033 10.4139 16.9194C10.22 16.2802 9.71977 15.78 9.08057 15.5861C8.79667 15.5 8.44778 15.5 7.75 15.5Z`,
      stroke: `currentColor`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `1`,
    },
  ],
  [
    `path`,
    {
      d: `M21 17.25V15.25C21 13.6063 21 12.7844 20.546 12.2312C20.4629 12.1299 20.3701 12.0371 20.2688 11.954C19.7156 11.5 18.8937 11.5 17.25 11.5C15.6063 11.5 14.7844 11.5 14.2312 11.954C14.1299 12.0371 14.0371 12.1299 13.954 12.2312C13.5 12.7844 13.5 13.6063 13.5 15.25V17.25C13.5 18.8937 13.5 19.7156 13.954 20.2688C14.0371 20.3701 14.1299 20.4629 14.2312 20.546C14.7844 21 15.6063 21 17.25 21C18.8937 21 19.7156 21 20.2688 20.546C20.3701 20.4629 20.4629 20.3701 20.546 20.2688C21 19.7156 21 18.8937 21 17.25Z`,
      stroke: `currentColor`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `2`,
    },
  ],
  [
    `path`,
    {
      d: `M18.25 3H16.25C15.5522 3 15.2033 3 14.9194 3.08612C14.2802 3.28002 13.78 3.78023 13.5861 4.41943C13.5 4.70333 13.5 5.05222 13.5 5.75C13.5 6.44778 13.5 6.79667 13.5861 7.08057C13.78 7.71977 14.2802 8.21998 14.9194 8.41388C15.2033 8.5 15.5522 8.5 16.25 8.5H18.25C18.9478 8.5 19.2967 8.5 19.5806 8.41388C20.2198 8.21998 20.72 7.71977 20.9139 7.08057C21 6.79667 21 6.44778 21 5.75C21 5.05222 21 4.70333 20.9139 4.41943C20.72 3.78023 20.2198 3.28002 19.5806 3.08612C19.2967 3 18.9478 3 18.25 3Z`,
      stroke: `currentColor`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `3`,
    },
  ],
];
var FilesIcon: IconNode = [
  [
    `path`,
    {
      d: `M8 7H16.75C18.8567 7 19.91 7 20.6667 7.50559C20.9943 7.72447 21.2755 8.00572 21.4944 8.33329C22 9.08996 22 10.1433 22 12.25C22 15.7612 22 17.5167 21.1573 18.7779C20.7926 19.3238 20.3238 19.7926 19.7779 20.1573C18.5167 21 16.7612 21 13.25 21H12C7.28595 21 4.92893 21 3.46447 19.5355C2 18.0711 2 15.714 2 11V7.94427C2 6.1278 2 5.21956 2.38032 4.53806C2.65142 4.05227 3.05227 3.65142 3.53806 3.38032C4.21956 3 5.1278 3 6.94427 3C8.10802 3 8.6899 3 9.19926 3.19101C10.3622 3.62712 10.8418 4.68358 11.3666 5.73313L12 7`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeWidth: `1.5`,
      key: `0`,
    },
  ],
];
var FolderIcon: IconNode = [
  [
    `path`,
    {
      d: `M2.5 20V8.87695C2.5 7.58945 2.5 6.9457 2.78533 6.47048C2.9541 6.18939 3.18939 5.9541 3.47048 5.78533C3.9457 5.5 4.59449 5.5 5.89206 5.5C6.52339 5.5 6.83906 5.5 7.12612 5.58819C7.31759 5.64702 7.49914 5.73428 7.66469 5.84705C7.91289 6.01611 8.10859 6.26074 8.5 6.75C8.89141 7.23926 9.08711 7.48389 9.33531 7.65295C9.50086 7.76572 9.68241 7.85298 9.87388 7.91181C10.1609 8 10.4742 8 11.1008 8H15C16.4045 8 17.1067 8 17.6111 8.33706C17.8295 8.48298 18.017 8.67048 18.1629 8.88886C18.5 9.39331 18.5 10.0955 18.5 11.5`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `0`,
    },
  ],
  [
    `path`,
    {
      d: `M4.42028 14.0144L3.63368 16.0144C2.65618 18.4998 2.16743 19.7425 2.7524 20.6213C3.33737 21.5 4.65337 21.5 7.28537 21.5H15.1903C16.4249 21.5 17.0422 21.5 17.5295 21.1795C18.0169 20.859 18.2702 20.2865 18.7769 19.1415L19.6618 17.1415C20.7866 14.5992 21.349 13.3281 20.7679 12.4141C20.1868 11.5 18.8163 11.5 16.0752 11.5H8.07196C6.78232 11.5 6.1375 11.5 5.63811 11.8439C5.13872 12.1877 4.89924 12.7966 4.42028 14.0144Z`,
      stroke: `currentColor`,
      strokeWidth: `1.5`,
      key: `1`,
    },
  ],
  [
    `path`,
    {
      d: `M11.5 4.51456C12.4151 3.28409 13.6662 2.55594 15.5125 2.50161C16.1155 2.48386 16.7152 2.61395 17.2682 2.85544C18.5748 3.42601 19.4185 4.15644 20 5.5L21.5 3`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `2`,
    },
  ],
];
var MoreIcon: IconNode = [
  [
    `path`,
    {
      d: `M3.88884 9.66294C4.39329 10 5.09552 10 6.49998 10C7.90445 10 8.60668 10 9.11113 9.66294C9.32951 9.51702 9.51701 9.32952 9.66292 9.11114C9.99998 8.60669 9.99998 7.90446 9.99998 6.5C9.99998 5.09554 9.99998 4.39331 9.66292 3.88886C9.51701 3.67048 9.32951 3.48298 9.11113 3.33706C8.60668 3 7.90445 3 6.49998 3C5.09552 3 4.39329 3 3.88884 3.33706C3.67046 3.48298 3.48296 3.67048 3.33705 3.88886C2.99998 4.39331 2.99998 5.09554 2.99998 6.5C2.99998 7.90446 2.99998 8.60669 3.33705 9.11114C3.48296 9.32952 3.67046 9.51702 3.88884 9.66294Z`,
      stroke: `currentColor`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `0`,
    },
  ],
  [
    `path`,
    {
      d: `M14.8888 9.66294C15.3933 10 16.0955 10 17.5 10C18.9044 10 19.6067 10 20.1111 9.66294C20.3295 9.51702 20.517 9.32952 20.6629 9.11114C21 8.60669 21 7.90446 21 6.5C21 5.09554 21 4.39331 20.6629 3.88886C20.517 3.67048 20.3295 3.48298 20.1111 3.33706C19.6067 3 18.9044 3 17.5 3C16.0955 3 15.3933 3 14.8888 3.33706C14.6705 3.48298 14.483 3.67048 14.337 3.88886C14 4.39331 14 5.09554 14 6.5C14 7.90446 14 8.60669 14.337 9.11114C14.483 9.32952 14.6705 9.51702 14.8888 9.66294Z`,
      stroke: `currentColor`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `1`,
    },
  ],
  [
    `path`,
    {
      d: `M3.88884 20.6629C4.39329 21 5.09552 21 6.49998 21C7.90445 21 8.60668 21 9.11113 20.6629C9.32951 20.517 9.51701 20.3295 9.66292 20.1111C9.99998 19.6067 9.99998 18.9045 9.99998 17.5C9.99998 16.0955 9.99998 15.3933 9.66292 14.8889C9.51701 14.6705 9.32951 14.483 9.11113 14.3371C8.60668 14 7.90445 14 6.49998 14C5.09552 14 4.39329 14 3.88884 14.3371C3.67046 14.483 3.48296 14.6705 3.33705 14.8889C2.99998 15.3933 2.99998 16.0955 2.99998 17.5C2.99998 18.9045 2.99998 19.6067 3.33705 20.1111C3.48296 20.3295 3.67046 20.517 3.88884 20.6629Z`,
      stroke: `currentColor`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `2`,
    },
  ],
  [
    `path`,
    {
      d: `M14.8888 20.6629C15.3933 21 16.0955 21 17.5 21C18.9044 21 19.6067 21 20.1111 20.6629C20.3295 20.517 20.517 20.3295 20.6629 20.1111C21 19.6067 21 18.9045 21 17.5C21 16.0955 21 15.3933 20.6629 14.8889C20.517 14.6705 20.3295 14.483 20.1111 14.3371C19.6067 14 18.9044 14 17.5 14C16.0955 14 15.3933 14 14.8888 14.3371C14.6705 14.483 14.483 14.6705 14.337 14.8889C14 15.3933 14 16.0955 14 17.5C14 18.9045 14 19.6067 14.337 20.1111C14.483 20.3295 14.6705 20.517 14.8888 20.6629Z`,
      stroke: `currentColor`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `3`,
    },
  ],
];
var NotificationIcon: IconNode = [
  [
    `circle`,
    {
      cx: `12`,
      cy: `12`,
      r: `10`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `0`,
    },
  ],
  [
    `path`,
    {
      d: `M9.5 9.5C9.5 8.11929 10.6193 7 12 7C13.3807 7 14.5 8.11929 14.5 9.5C14.5 10.3569 14.0689 11.1131 13.4117 11.5636C12.7283 12.0319 12 12.6716 12 13.5`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `1`,
    },
  ],
  [
    `path`,
    {
      d: `M12.125 16.75H12M12.25 16.75C12.25 16.8881 12.1381 17 12 17C11.8619 17 11.75 16.8881 11.75 16.75C11.75 16.6119 11.8619 16.5 12 16.5C12.1381 16.5 12.25 16.6119 12.25 16.75Z`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `2`,
    },
  ],
];
var MailIcon: IconNode = [
  [
    `path`,
    {
      d: `M15.5 8.04045C15.4588 6.87972 15.3216 6.15451 14.8645 5.58671C14.2114 4.77536 13.0944 4.52064 10.8605 4.01121L9.85915 3.78286C6.4649 3.00882 4.76777 2.6218 3.63388 3.51317C2.5 4.40454 2.5 6.1257 2.5 9.56803V14.432C2.5 17.8743 2.5 19.5955 3.63388 20.4868C4.76777 21.3782 6.4649 20.9912 9.85915 20.2171L10.8605 19.9888C13.0944 19.4794 14.2114 19.2246 14.8645 18.4133C15.3216 17.8455 15.4588 17.1203 15.5 15.9595`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `0`,
    },
  ],
  [
    `path`,
    {
      d: `M18.5 9.01172C18.5 9.01172 21.5 11.2212 21.5 12.0117C21.5 12.8023 18.5 15.0117 18.5 15.0117M21 12.0117H8.49998`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `1`,
    },
  ],
];
var EditIcon: IconNode = [
  [
    `path`,
    {
      d: `M16.4249 4.60509L17.4149 3.6151C18.2351 2.79497 19.5648 2.79497 20.3849 3.6151C21.205 4.43524 21.205 5.76493 20.3849 6.58507L19.3949 7.57506M16.4249 4.60509L9.76558 11.2644C9.25807 11.772 8.89804 12.4078 8.72397 13.1041L8 16L10.8959 15.276C11.5922 15.102 12.228 14.7419 12.7356 14.2344L19.3949 7.57506M16.4249 4.60509L19.3949 7.57506`,
      stroke: `currentColor`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `0`,
    },
  ],
  [
    `path`,
    {
      d: `M18.9999 13.5C18.9999 16.7875 18.9999 18.4312 18.092 19.5376C17.9258 19.7401 17.7401 19.9258 17.5375 20.092C16.4312 21 14.7874 21 11.4999 21H11C7.22876 21 5.34316 21 4.17159 19.8284C3.00003 18.6569 3 16.7712 3 13V12.5C3 9.21252 3 7.56879 3.90794 6.46244C4.07417 6.2599 4.2599 6.07417 4.46244 5.90794C5.56879 5 7.21252 5 10.5 5`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `1`,
    },
  ],
];
var PlusIcon: IconNode = [
  [
    `path`,
    {
      d: `M12 4V20M20 12H4`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `0`,
    },
  ],
];
var SearchIcon: IconNode = [
  [
    `path`,
    {
      d: `M17 17L21 21`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `0`,
    },
  ],
  [
    `path`,
    {
      d: `M19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C15.4183 19 19 15.4183 19 11Z`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `1`,
    },
  ],
];
var SettingsIcon: IconNode = [
  [
    `path`,
    {
      d: `M21.3175 7.14139L20.8239 6.28479C20.4506 5.63696 20.264 5.31305 19.9464 5.18388C19.6288 5.05472 19.2696 5.15664 18.5513 5.36048L17.3311 5.70418C16.8725 5.80994 16.3913 5.74994 15.9726 5.53479L15.6357 5.34042C15.2766 5.11043 15.0004 4.77133 14.8475 4.37274L14.5136 3.37536C14.294 2.71534 14.1842 2.38533 13.9228 2.19657C13.6615 2.00781 13.3143 2.00781 12.6199 2.00781H11.5051C10.8108 2.00781 10.4636 2.00781 10.2022 2.19657C9.94085 2.38533 9.83106 2.71534 9.61149 3.37536L9.27753 4.37274C9.12465 4.77133 8.84845 5.11043 8.48937 5.34042L8.15249 5.53479C7.73374 5.74994 7.25259 5.80994 6.79398 5.70418L5.57375 5.36048C4.85541 5.15664 4.49625 5.05472 4.17867 5.18388C3.86109 5.31305 3.67445 5.63696 3.30115 6.28479L2.80757 7.14139C2.45766 7.74864 2.2827 8.05227 2.31666 8.37549C2.35061 8.69871 2.58483 8.95918 3.05326 9.48012L4.0843 10.6328C4.3363 10.9518 4.51521 11.5078 4.51521 12.0077C4.51521 12.5078 4.33636 13.0636 4.08433 13.3827L3.05326 14.5354C2.58483 15.0564 2.35062 15.3168 2.31666 15.6401C2.2827 15.9633 2.45766 16.2669 2.80757 16.8741L3.30114 17.7307C3.67443 18.3785 3.86109 18.7025 4.17867 18.8316C4.49625 18.9608 4.85542 18.8589 5.57377 18.655L6.79394 18.3113C7.25263 18.2055 7.73387 18.2656 8.15267 18.4808L8.4895 18.6752C8.84851 18.9052 9.12464 19.2442 9.2775 19.6428L9.61149 20.6403C9.83106 21.3003 9.94085 21.6303 10.2022 21.8191C10.4636 22.0078 10.8108 22.0078 11.5051 22.0078H12.6199C13.3143 22.0078 13.6615 22.0078 13.9228 21.8191C14.1842 21.6303 14.294 21.3003 14.5136 20.6403L14.8476 19.6428C15.0004 19.2442 15.2765 18.9052 15.6356 18.6752L15.9724 18.4808C16.3912 18.2656 16.8724 18.2055 17.3311 18.3113L18.5513 18.655C19.2696 18.8589 19.6288 18.9608 19.9464 18.8316C20.264 18.7025 20.4506 18.3785 20.8239 17.7307L21.3175 16.8741C21.6674 16.2669 21.8423 15.9633 21.8084 15.6401C21.7744 15.3168 21.5402 15.0564 21.0718 14.5354L20.0407 13.3827C19.7887 13.0636 19.6098 12.5078 19.6098 12.0077C19.6098 11.5078 19.7888 10.9518 20.0407 10.6328L21.0718 9.48012C21.5402 8.95918 21.7744 8.69871 21.8084 8.37549C21.8423 8.05227 21.6674 7.74864 21.3175 7.14139Z`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeWidth: `1.5`,
      key: `0`,
    },
  ],
  [
    `path`,
    {
      d: `M15.5195 12C15.5195 13.933 13.9525 15.5 12.0195 15.5C10.0865 15.5 8.51953 13.933 8.51953 12C8.51953 10.067 10.0865 8.5 12.0195 8.5C13.9525 8.5 15.5195 10.067 15.5195 12Z`,
      stroke: `currentColor`,
      strokeWidth: `1.5`,
      key: `1`,
    },
  ],
];
var SidebarIcon: IconNode = [
  [
    `path`,
    {
      d: `M2 12C2 8.31087 2 6.4663 2.81382 5.15877C3.1149 4.67502 3.48891 4.25427 3.91891 3.91554C5.08116 3 6.72077 3 10 3H14C17.2792 3 18.9188 3 20.0811 3.91554C20.5111 4.25427 20.8851 4.67502 21.1862 5.15877C22 6.4663 22 8.31087 22 12C22 15.6891 22 17.5337 21.1862 18.8412C20.8851 19.325 20.5111 19.7457 20.0811 20.0845C18.9188 21 17.2792 21 14 21H10C6.72077 21 5.08116 21 3.91891 20.0845C3.48891 19.7457 3.1149 19.325 2.81382 18.8412C2 17.5337 2 15.6891 2 12Z`,
      stroke: `currentColor`,
      strokeWidth: `1.5`,
      key: `0`,
    },
  ],
  [
    `path`,
    {
      d: `M9.5 3L9.5 21`,
      stroke: `currentColor`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `1`,
    },
  ],
  [
    `path`,
    {
      d: `M5 7H6M5 10H6`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `2`,
    },
  ],
];
var CheckIcon: IconNode = [
  [
    `path`,
    {
      d: `M5 14L8.5 17.5L19 6.5`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `0`,
    },
  ],
];
var UserIcon: IconNode = [
  [
    `path`,
    {
      d: `M20 21.0001C19.713 17.269 16.7289 14.3151 12.995 14.0662L12 13.9999C11.6446 14.0096 11.3134 14.0225 11.0008 14.0378C7.3 14.2192 4.28417 17.3057 4 21.0001`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `0`,
    },
  ],
  [
    `circle`,
    {
      cx: `12`,
      cy: `6.99988`,
      r: `4`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `1`,
    },
  ],
];
var Icon = ({
  icon: icon,
  size = 16,
  stroke = 1.9,
  color = `currentColor`,
}: {
  icon: IconNode;
  size?: number;
  stroke?: number;
  color?: string;
}) => (
  <HugeiconsIcon icon={icon} size={size} strokeWidth={stroke} color={color} aria-hidden={true} />
);
var defaultNavigation = [
  {
    label: `New chat`,
    icon: EditIcon,
  },
  {
    label: `Folders`,
    icon: FilesIcon,
  },
  {
    label: `Integrations`,
    icon: GridIcon,
  },
];
var defaultProjects = [`Q3 Campaign`, `Brand assets`, `Hiring`, `Research`];
var defaultSetup = [
  {
    id: `workspace`,
    title: `Set up your workspace`,
    tasks: [
      {
        id: `name`,
        label: `Name your workspace`,
        done: true,
      },
      {
        id: `invite`,
        label: `Invite your teammates`,
      },
      {
        id: `connect`,
        label: `Connect your first app`,
      },
    ],
  },
  {
    id: `work`,
    title: `Start working`,
    tasks: [
      {
        id: `folder`,
        label: `Create a folder`,
      },
      {
        id: `chat`,
        label: `Start your first chat`,
      },
      {
        id: `upload`,
        label: `Upload a file`,
      },
    ],
  },
  {
    id: `profile`,
    title: `Make it yours`,
    tasks: [
      {
        id: `avatar`,
        label: `Add a profile picture`,
      },
      {
        id: `notify`,
        label: `Choose your notifications`,
      },
    ],
  },
];
var sidebarBreakpoint = 900;
var setupProgressLabel = (e: number) =>
  e >= 100 ? `All done!` : e >= 60 ? `Almost there!` : e > 0 ? `Great start!` : `Let's go!`;
function AppShell({
  children: children,
  active: active,
  onNavigate: onNavigate,
  workspace = `Acme`,
  user = {
    name: `Alex Morgan`,
  },
  nav = defaultNavigation,
  projects = defaultProjects,
  groups: groups,
  setup = defaultSetup,
  className: className,
}: AppShellProps) {
  let [newsCount, setNewsCount] = React.useState(2),
    [collapsed, setCollapsed] = React.useState(false),
    shellRef = React.useRef<HTMLDivElement | null>(null),
    [isCompact, setIsCompact] = React.useState(false),
    [drawerOpen, setDrawerOpen] = React.useState(false);
  (React.useLayoutEffect(() => {
    let e = shellRef.current;
    if (!e) return;
    let t = () => setIsCompact(e.offsetWidth <= sidebarBreakpoint);
    t();
    let n = new ResizeObserver(t);
    return (n.observe(e), () => n.disconnect());
  }, []),
    React.useEffect(() => {
      isCompact || setDrawerOpen(false);
    }, [isCompact]));
  let sidebarInert = isCompact ? !drawerOpen : collapsed,
    navigate = (e: string) => {
      (setDrawerOpen(false), onNavigate?.(e));
    },
    [setupPanelState, setSetupPanelState] = React.useState(`closed`),
    setupOpen = setupPanelState === `open`,
    setSetupOpen = (e: boolean) => {
      if (e) return setSetupPanelState(`open`);
      setSetupPanelState((e) => (e === `open` ? `closing` : e));
    };
  React.useEffect(() => {
    if (setupPanelState !== `closing`) return;
    let e = window.setTimeout(() => setSetupPanelState(`closed`), 420);
    return () => window.clearTimeout(e);
  }, [setupPanelState]);
  let setupHeaderRef = React.useRef<HTMLDivElement | null>(null),
    [setupHeaderHeight, setSetupHeaderHeight] = React.useState(0),
    [closedSetupHeight, setClosedSetupHeight] = React.useState(0);
  (React.useLayoutEffect(() => {
    let e = setupHeaderRef.current;
    e &&
      (setSetupHeaderHeight(e.offsetHeight),
      setupPanelState === `closed` && setClosedSetupHeight(e.offsetHeight));
  }, [setupPanelState]),
    React.useLayoutEffect(() => {
      let e = setupHeaderRef.current;
      if (!e) return;
      let t = () => setSetupHeaderHeight(e.offsetHeight);
      t();
      let n = new ResizeObserver(t);
      return (n.observe(e), () => n.disconnect());
    }, []),
    React.useEffect(() => {
      if (!setupOpen) return;
      let e = (e: { key: string }) => e.key === `Escape` && setSetupOpen(false);
      return (
        document.addEventListener(`keydown`, e),
        () => document.removeEventListener(`keydown`, e)
      );
    }, [setupOpen]),
    React.useEffect(() => {
      if (!drawerOpen || setupPanelState !== `closed`) return;
      let e = (e: { key: string }) => e.key === `Escape` && setDrawerOpen(false);
      return (
        document.addEventListener(`keydown`, e),
        () => document.removeEventListener(`keydown`, e)
      );
    }, [drawerOpen, setupPanelState]));
  let [completedTaskIds, setCompletedTaskIds] = React.useState(() =>
      setup.flatMap((e) => e.tasks.filter((e) => e.done).map((e) => e.id)),
    ),
    totalTasks = setup.reduce((e, t) => e + t.tasks.length, 0),
    progress = totalTasks ? Math.round((completedTaskIds.length / totalTasks) * 100) : 0,
    initials = user.name
      .split(` `)
      .map((e) => e[0])
      .slice(0, 2)
      .join(``);
  return (
    <div
      ref={shellRef}
      className={[`ui-as`, `ui-as-app`, className].filter(Boolean).join(` `)}
      data-collapsed={(collapsed && !isCompact) || void 0}
      data-drawer={(isCompact && drawerOpen) || void 0}
    >
      <style href={`ui-app-shell`} precedence={`default`}>
        {appShellStyles}
      </style>
      <button
        className={`ui-as-icon-btn ui-as-side-open`}
        type={`button`}
        aria-label={`Open sidebar`}
        tabIndex={sidebarInert ? 0 : -1}
        onClick={() => (isCompact ? setDrawerOpen(true) : setCollapsed(false))}
      >
        <Icon icon={SidebarIcon} size={16} />
      </button>
      <div className={`ui-as-scrim`} aria-hidden={`true`} onClick={() => setDrawerOpen(false)} />
      <aside className={`ui-as-side`} inert={sidebarInert}>
        <header className={`ui-as-side__head`}>
          <DropdownMenu
            title={`Workspaces`}
            items={[
              {
                label: workspace,
                description: `Pro · 8 members`,
                checked: true,
              },
              {
                label: `Personal`,
                description: `Free`,
                checked: false,
              },
              {
                label: `Create workspace`,
                icon: PlusIcon,
              },
            ]}
            trigger={({ open: open, toggle: toggle }) => (
              <button
                className={`ui-as-side__workspace`}
                type={`button`}
                aria-expanded={open}
                onClick={toggle}
              >
                <span className={`ui-as-side__logo`}>{workspace[0]}</span>
                {workspace}
                <Icon icon={ChevronDownIcon} size={13} />
              </button>
            )}
          />
          <span className={`ui-as-side__tools`}>
            <button className={`ui-as-icon-btn`} type={`button`} aria-label={`Search`}>
              <Icon icon={SearchIcon} size={16} />
            </button>
            <button
              className={`ui-as-icon-btn`}
              type={`button`}
              aria-label={isCompact ? `Close sidebar` : `Collapse sidebar`}
              onClick={() => (isCompact ? setDrawerOpen(false) : setCollapsed(true))}
            >
              <Icon icon={SidebarIcon} size={16} />
            </button>
          </span>
        </header>
        <nav className={`ui-as-side__nav`} aria-label={`Main menu`}>
          <div className={`ui-as-side__group`}>
            {nav.map((e) => (
              <button
                type={`button`}
                className={`ui-as-side__item`}
                aria-current={active === e.label ? `page` : void 0}
                onClick={() => navigate(e.label)}
                key={e.label}
              >
                <Icon icon={e.icon} size={16} />
                {e.label}
                {e.count !== void 0 && <span className={`ui-as-side__count`}>{e.count}</span>}
              </button>
            ))}
          </div>
          {groups ? (
            groups.map((e) => (
              <div className={`ui-as-side__group`} key={e.label}>
                <span className={`ui-as-side__label`}>{e.label}</span>
                {e.items.length === 0 && e.empty && (
                  <span className={`ui-as-side__empty`}>{e.empty}</span>
                )}
                {e.items.map((e) => (
                  <button
                    type={`button`}
                    className={`ui-as-side__item`}
                    aria-current={active === e.label ? `page` : void 0}
                    onClick={() => navigate(e.label)}
                    key={e.label}
                  >
                    <Icon icon={e.icon} size={16} />
                    {e.label}
                    {e.count !== void 0 && <span className={`ui-as-side__count`}>{e.count}</span>}
                  </button>
                ))}
              </div>
            ))
          ) : (
            <>
              <span className={`ui-as-side__label`}>{`Projects`}</span>
              {projects.map((e) => (
                <button
                  type={`button`}
                  className={`ui-as-side__item`}
                  aria-current={active === e ? `page` : void 0}
                  onClick={() => navigate(e)}
                  key={e}
                >
                  <Icon icon={FolderIcon} size={16} />
                  {e}
                </button>
              ))}
            </>
          )}
        </nav>
        <div className={`ui-as-side__foot`}>
          {newsCount > 0 && (
            <div className={`ui-as-news`} data-count={newsCount}>
              <div className={`ui-as-news__card ui-as-news__card--back`} aria-hidden={`true`}>
                <span className={`ui-as-news__kicker`}>
                  {`New in `}
                  {workspace}
                </span>
                <Icon icon={CloseIcon} size={13} />
              </div>
              <div className={`ui-as-news__card`}>
                <div className={`ui-as-news__top`}>
                  <span className={`ui-as-news__kicker`}>
                    {`New in `}
                    {workspace}
                  </span>
                  <button
                    type={`button`}
                    className={`ui-as-news__close`}
                    aria-label={`Dismiss`}
                    onClick={() => setNewsCount((e) => e - 1)}
                  >
                    <Icon icon={CloseIcon} size={13} />
                  </button>
                </div>
                <b className={`ui-as-news__title`}>
                  {newsCount > 1 ? `Shared folders` : `Scheduled chats`}
                </b>
                <button type={`button`} className={`ui-as-news__more`}>
                  {`Full changelog`}
                  <Icon icon={ChevronRightIcon} size={13} />
                </button>
              </div>
            </div>
          )}
          <div
            className={`ui-as-guide-slot`}
            style={
              closedSetupHeight
                ? {
                    height: closedSetupHeight,
                  }
                : void 0
            }
          >
            <div
              className={`ui-as-guide`}
              data-open={setupPanelState !== `closed` || void 0}
              data-state={setupPanelState}
              style={{
                height:
                  (setupPanelState === `open` ? setupHeaderHeight : closedSetupHeight) || void 0,
              }}
            >
              <div ref={setupHeaderRef} className={`ui-as-guide__inner`}>
                {setupPanelState === `closed` ? (
                  <button
                    type={`button`}
                    className={`ui-as-steps ui-as-guide__content`}
                    aria-expanded={false}
                    onClick={() => setSetupOpen(true)}
                    key={`summary`}
                  >
                    <span className={`ui-as-steps__title`}>
                      {`Getting started`}
                      <Icon icon={ChevronRightIcon} size={13} />
                    </span>
                    <span className={`ui-as-steps__sub`}>
                      {progress}
                      {`% done · `}
                      <span className={`ui-as-steps__cheer`}>{setupProgressLabel(progress)}</span>
                    </span>
                    <span className={`ui-as-steps__bar`}>
                      <i
                        style={{
                          width: `${Math.max(progress, 4)}%`,
                        }}
                      />
                    </span>
                  </button>
                ) : (
                  <div className={`ui-as-guide__content`} key={`guide`}>
                    <SetupGuide
                      title={`Getting started`}
                      groups={setup.map((e) => ({
                        ...e,
                        tasks: e.tasks.map((e) => ({
                          ...e,
                          done: completedTaskIds.includes(e.id),
                        })),
                      }))}
                      onChange={setCompletedTaskIds}
                      onClose={() => setSetupOpen(false)}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          <DropdownMenu
            side={`top`}
            className={`ui-as-user-menu`}
            items={[
              {
                label: `Profile`,
                icon: UserIcon,
              },
              {
                label: `Settings`,
                icon: SettingsIcon,
              },
              {
                label: `Help & feedback`,
                icon: NotificationIcon,
              },
              {
                label: `Log out`,
                icon: MailIcon,
                danger: true,
              },
            ]}
            trigger={({ open: open, toggle: toggle }) => (
              <button
                type={`button`}
                className={`ui-as-user`}
                aria-expanded={open}
                onClick={toggle}
              >
                {user.avatar ? (
                  <img src={user.avatar} alt={``} width={21} height={21} />
                ) : (
                  <span className={`ui-as-user__initials`}>{initials}</span>
                )}
                {user.name}
                <Icon icon={ChevronDownIcon} size={13} />
              </button>
            )}
          />
        </div>
      </aside>
      <main className={`ui-as-main`}>{children}</main>
    </div>
  );
}
function getClippingBoundary(element: HTMLDivElement) {
  for (let t = element.parentElement; t; t = t.parentElement) {
    let e = getComputedStyle(t);
    if (
      /(auto|scroll|hidden|clip)/.test(e.overflow + e.overflowY + e.overflowX) ||
      t.classList.contains(`ui-as`)
    )
      return t.getBoundingClientRect();
  }
  return new DOMRect(0, 0, window.innerWidth, window.innerHeight);
}
function Popover({
  open: open,
  onClose: onClose,
  children: children,
  align = `start`,
  side = `bottom`,
  className: className,
}: PopoverProps) {
  let popoverRef = React.useRef<HTMLDivElement | null>(null),
    [placement, setPlacement] = React.useState({
      side: side,
      align: align,
    });
  return (
    React.useLayoutEffect(() => {
      let t = popoverRef.current;
      if (!open || !t) return;
      let n: {
        side: PopoverSide;
        align: PopoverAlign;
      } = {
        side: side,
        align: align,
      };
      ((t.dataset.side = side), (t.dataset.align = align));
      let a = getClippingBoundary(t),
        s = t.getBoundingClientRect();
      (side === `bottom` &&
        s.bottom > a.bottom - 6 &&
        (n = {
          ...n,
          side: `top`,
        }),
        side === `top` &&
          s.top < a.top + 6 &&
          (n = {
            ...n,
            side: `bottom`,
          }),
        align === `start` &&
          s.right > a.right - 6 &&
          (n = {
            ...n,
            align: `end`,
          }),
        align === `end` &&
          s.left < a.left + 6 &&
          (n = {
            ...n,
            align: `start`,
          }),
        (t.dataset.side = n.side),
        (t.dataset.align = n.align),
        (t.style.translate = ``));
      let l = t.getBoundingClientRect(),
        u = l.width / t.offsetWidth || 1,
        d = 0;
      (l.right > a.right - 6 && (d = a.right - 6 - l.right),
        l.left + d < a.left + 6 && (d = a.left + 6 - l.left),
        d && (t.style.translate = `${d / u}px 0`),
        setPlacement(n));
    }, [open, side, align]),
    React.useEffect(() => {
      if (!open) return;
      let n = (e: PointerEvent) => {
          let n = popoverRef.current?.parentElement;
          n && !n.contains(e.target as Node | null) && onClose();
        },
        r = (e: { key: string }) => e.key === `Escape` && onClose();
      return (
        document.addEventListener(`pointerdown`, n),
        document.addEventListener(`keydown`, r),
        () => {
          (document.removeEventListener(`pointerdown`, n),
            document.removeEventListener(`keydown`, r));
        }
      );
    }, [open, onClose]),
    open ? (
      <div
        ref={popoverRef}
        className={[`ui-as-popover`, className].filter(Boolean).join(` `)}
        data-align={placement.align}
        data-side={placement.side}
        role={`dialog`}
      >
        {children}
      </div>
    ) : null
  );
}
function MenuItems({ items: items, onPick: onPick }: { items: MenuItem[]; onPick: () => void }) {
  return (
    <div role={`menu`} className={`ui-as-menu__list`}>
      {items.map((e) => (
        <button
          type={`button`}
          role={e.checked === void 0 ? `menuitem` : `menuitemradio`}
          aria-checked={e.checked}
          className={`ui-as-menu__item`}
          data-danger={e.danger || void 0}
          data-rich={e.description ? true : void 0}
          onClick={() => {
            (e.onSelect?.(), onPick());
          }}
          key={e.label}
        >
          {e.icon && <Icon icon={e.icon} size={15} />}
          <span className={`ui-as-menu__label`}>
            {e.label}
            {e.description && <small>{e.description}</small>}
          </span>
          {e.checked && <Icon icon={CheckIcon} size={14} />}
        </button>
      ))}
    </div>
  );
}
function DropdownMenu({
  trigger: trigger,
  items: items,
  align = `start`,
  side = `bottom`,
  title: title,
  className: className,
}: DropdownMenuProps) {
  let [open, setOpen] = React.useState(false);
  return (
    <span className={[`ui-as-anchor`, className].filter(Boolean).join(` `)}>
      {trigger({
        open: open,
        toggle: () => setOpen((e) => !e),
      })}
      <Popover
        open={open}
        onClose={() => setOpen(false)}
        align={align}
        side={side}
        className={`ui-as-menu`}
      >
        {title && <span className={`ui-as-menu__title`}>{title}</span>}
        <MenuItems items={items} onPick={() => setOpen(false)} />
      </Popover>
    </span>
  );
}
function useToast(): [React.ReactNode, (message: string) => void] {
  let [message, setMessage] = React.useState<{ id: number; text: string } | null>(null);
  return (
    React.useEffect(() => {
      if (!message) return;
      let n = window.setTimeout(() => setMessage(null), 2200);
      return () => window.clearTimeout(n);
    }, [message]),
    [
      message ? (
        <div className={`ui-as-toast`} role={`status`} key={message.id}>
          <Icon icon={CheckIcon} size={14} />
          {message.text}
        </div>
      ) : null,
      (e: string) =>
        setMessage({
          id: Date.now(),
          text: e,
        }),
    ]
  );
}
var documentColors = {
  DOC: `blue`,
  PDF: `rose`,
  XLS: `emerald`,
};
var documentNames = {
  DOC: `Document`,
  PDF: `PDF`,
  XLS: `Spreadsheet`,
};
function FileTemplate({ file: file, meta: meta }: { file: FileRecord; meta?: React.ReactNode }) {
  return (
    <button type={`button`} className={`ui-as-template`}>
      <span className={`ui-as-template__preview`}>
        <DocumentIcon type={file.type} color={documentColors[file.type]} />
      </span>
      <b className={`ui-as-template__name`}>{file.name}</b>
      <span className={`ui-as-meta`}>{meta}</span>
    </button>
  );
}
function DocumentIcon({ type: type, color: color }: { type: FileRecord["type"]; color?: string }) {
  return (
    <span className={`ui-as-doc`} data-color={color} aria-hidden={`true`}>
      <span className={`ui-as-doc__art`}>
        <span className={`ui-as-doc__back`} />
        <span className={`ui-as-doc__page`} data-type={type}>
          {type === `XLS` ? (
            <span className={`ui-as-sheet`}>
              {Array.from(
                {
                  length: 18,
                },
                (e, t) => (
                  <i key={t} />
                ),
              )}
            </span>
          ) : (
            <>
              {type === `PDF` ? (
                <span className={`ui-as-doc__image`} />
              ) : (
                <i className={`ui-as-doc__title`} />
              )}
              {(type === `PDF` ? [100, 82, 92] : [100, 86, 94, 70, 88]).map((e, t) => (
                <i
                  className={`ui-as-doc__line`}
                  style={{
                    width: `${e}%`,
                  }}
                  key={t}
                />
              ))}
            </>
          )}
        </span>
        <span className={`ui-as-doc__type`}>{type}</span>
      </span>
    </span>
  );
}
var appShellStyles = `
/* Design tokens – same values as the Plico UI library components */
.ui-as {
  --tray: #f4f4f4;
  --card: #ffffff;
  /* Like the Plico UI library: gray page, the main area is a rounded panel on it */
  --page: #f8f8f8;
  --panel: #ffffff;
  --radius-panel: 18px;
  --frame-gap: 8px;
  --line: #ebebeb;
  --line-soft: #f0f0f0;
  --ink: #171717;
  --text: #404040;
  --muted: #737373;
  --faint: #a3a3a3;
  --placeholder: #a3a3a3;
  --chip: #f5f5f5;
  --chip-hover: #eeeeee;
  --hover: rgba(0, 0, 0, 0.035);
  --accent: #4469fc;
  --button: #262626;
  --button-hover: #333333;
  --accent-soft: #eef3ff;
  --shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  --line-strong: #dedede;
  --subtle: #fafafa;
  --disabled: #dcdcdc;
  --on-ink: #ffffff;
  --ink-hover: #3a3a3a;
  --select: rgba(0, 0, 0, 0.055);
  --toggle-off: #e2e2e2;
  --switch-on: #171717;
  --logo-bg: #ffffff;
  --ease: cubic-bezier(0.22, 1, 0.36, 1);
  --font: "Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
}

/* Library components inside a screen follow the shell's scale: 13–13.5px text, 30px buttons, compact rows */
.ui-as .ui-pl { font-size: 13.5px; line-height: 19px; }
.ui-as .ui-pl__title { font-size: 14px; line-height: 20px; }
.ui-as .ui-df__text { font-size: 13.5px; line-height: 1.6; }
.ui-as .ui-df__body { padding: 14px 16px 16px; }
.ui-as .ui-ap__title { font-size: 13.5px; }
.ui-as .ui-ap__btn { height: 30px; }
.ui-as .ui-tc { font-size: 13px; }
.ui-as .ui-tc__head { min-height: 40px; padding-top: 6px; padding-bottom: 6px; }
/* Actions look the same in every card: 30px, radius 10, quiet = white with a hairline, primary = ink; never stretched */
.ui-as .ui-ap__foot .ui-ap__actions { flex: 0 0 auto; margin-left: auto; }
.ui-as .ui-ap__actions .ui-ap__btn { flex: none; padding: 0 12px; border-radius: 10px; }
.ui-as .ui-ap__actions .ui-ap__btn--quiet { background: var(--card); box-shadow: inset 0 0 0 1px var(--line); }
.ui-as .ui-ap__actions .ui-ap__btn--quiet:hover { background: var(--subtle); }
.ui-as .ui-df__head .ui-df__btn, .ui-as .ui-df__head .ui-df__icon { border-radius: 10px; }
.ui-as .ui-ap__actions .ui-ap__btn--primary, .ui-as .ui-df__head .ui-df__btn--primary { background: var(--button); }
.ui-as .ui-um__action { border-radius: 10px; }
/* …and the screens' lighter grays: trays and their hovers a step lighter than the components' own defaults */
.ui-as .ui-ap { --ui-ap-tray: var(--tray); --ui-ap-hover: #ebebeb; }
.ui-as .ui-pl { --ui-pl-tray: var(--tray); --ui-pl-quiet-hover: #ebebeb; --ui-pl-marker: var(--chip); }
.ui-as .ui-df { --ui-df-tray: var(--tray); }
.ui-as .ui-um { --ui-um-tray: var(--tray); }
.ui-as .ui-cb { --ui-cb-tray: var(--tray); }
:where(.dark, [data-theme="dark"]) .ui-as .ui-ap { --ui-ap-tray: #111113; --ui-ap-hover: #222225; }
:where(.dark, [data-theme="dark"]) .ui-as .ui-pl { --ui-pl-tray: #111113; --ui-pl-quiet-hover: #222225; --ui-pl-marker: #26262a; }
:where(.dark, [data-theme="dark"]) .ui-as :is(.ui-df, .ui-um, .ui-cb) { --ui-df-tray: #111113; --ui-um-tray: #111113; --ui-cb-tray: #111113; }

/* Dark mode: follows a .dark class or data-theme="dark" on any ancestor, e.g. <html>.
   Every screen draws from these tokens, and the library parts inside switch on their own. */
:where(.dark, [data-theme="dark"]) .ui-as {
  --tray: #1d1d20;
  --card: #1b1b1e;
  --page: #0e0e10;
  --panel: #141416;
  --line: #29292d;
  --line-soft: #222225;
  --ink: #f4f4f5;
  --text: #d4d4d8;
  --muted: #a1a1aa;
  --faint: #71717a;
  --placeholder: #71717a;
  --chip: #232326;
  --chip-hover: #2c2c30;
  --hover: rgba(255, 255, 255, 0.05);
  --accent: #6d8bff;
  --button: #f4f4f5;
  --button-hover: #ffffff;
  --accent-soft: rgba(109, 139, 255, 0.14);
  --shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
  --line-strong: #3a3a3f;
  --subtle: #18181b;
  --disabled: #3a3a3f;
  --on-ink: #111113;
  --ink-hover: #d4d4d8;
  --select: rgba(255, 255, 255, 0.08);
  --toggle-off: #3a3a3f;
  --switch-on: #6d8bff;
  --logo-bg: #2a2a2e;
  color-scheme: dark;
}

.ui-as, .ui-as *, .ui-as *::before, .ui-as *::after { box-sizing: border-box; }
.ui-as {
  font-family: var(--font);
  font-size: 13px;
  color: var(--text);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
:where(.ui-as) button {
  appearance: none;
  margin: 0;
  padding: 0;
  border: 0;
  background: none;
  font: inherit;
  color: inherit;
  cursor: pointer;
}
:where(.ui-as) svg { display: block; flex: none; }
.ui-as :focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
.ui-as textarea:focus-visible, .ui-as input:focus-visible { outline: none; }

/* Primary buttons: one flat dark gray, with the soft light edge on top and faint one below from the Figma button 590:4159 */
.ui-as-app .ui-button[data-variant="primary"] {
  border-color: transparent;
  background: var(--button);
  color: var(--on-ink);
  box-shadow:
    inset 0 1px 0.5px rgba(255, 255, 255, 0.16),
    inset 0 -1px 0.5px rgba(19, 20, 27, 0.1),
    0 1px 2px rgba(19, 20, 27, 0.1);
}
.ui-as-app .ui-button[data-variant="primary"]:hover:not(:disabled) { background: var(--button-hover); }

/* App frame shared by all screens: sidebar on the gray page, main area as a rounded white panel */

.ui-as-app {
  /* The layout answers to the app's own width (container queries), not the window – see the end of this file */
  container: ui-as / inline-size;
  position: relative;
  display: grid;
  grid-template-columns: 220px minmax(0, 1fr);
  height: 100%;
  min-height: 560px;
  background: var(--page);
  transition: grid-template-columns 420ms var(--ease);
}
/* Collapsed: the sidebar is gone completely, the main area keeps the same gap on all sides */
.ui-as-app[data-collapsed] { grid-template-columns: 0 minmax(0, 1fr); }
.ui-as-app[data-collapsed] .ui-as-main { margin-left: var(--frame-gap); }

/* ---------- Sidebar ---------- */

.ui-as-side {
  display: flex;
  flex-direction: column;
  width: 220px;
  min-height: 0;
  padding: 10px 8px 8px 10px;
  transition: opacity 260ms ease, translate 420ms var(--ease), visibility 0s;
}
.ui-as-app[data-collapsed] .ui-as-side {
  visibility: hidden;
  opacity: 0;
  translate: -16px 0;
  transition: opacity 200ms ease, translate 420ms var(--ease), visibility 0s 420ms;
}

/* The icon to bring the sidebar back, in the top left corner of the main area */
.ui-as-side-open {
  position: fixed;
  z-index: 20;
  top: calc(var(--frame-gap) + 9px);
  left: calc(var(--frame-gap) + 9px);
  visibility: hidden;
  opacity: 0;
  transition: opacity 200ms ease, visibility 0s 200ms;
}
.ui-as-app[data-collapsed] .ui-as-side-open {
  visibility: visible;
  opacity: 1;
  transition: opacity 260ms ease 160ms, visibility 0s;
}

.ui-as-side__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 28px;
}
.ui-as-side__workspace {
  display: flex;
  align-items: center;
  gap: 6px;
  height: 30px;
  padding: 0 6px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  color: var(--ink);
}
.ui-as-side__workspace svg { color: var(--faint); }
.ui-as-side__workspace:hover { background: var(--hover); }
.ui-as-user-menu { display: flex; }
.ui-as-user-menu > .ui-as-user { flex: 1; }
.ui-as-user-menu .ui-as-menu { width: 100%; }
/* Workspace logo on a white tile with a small, tight shadow below */
.ui-as-side__logo {
  display: grid;
  place-items: center;
  width: 18px;
  height: 18px;
  margin-right: 1px;
  border-radius: 5px;
  background: var(--logo-bg);
  box-shadow: 0 0 0 0.5px rgba(0, 0, 0, 0.08), 0 1px 1px rgba(0, 0, 0, 0.12);
}
.ui-as-side__logo svg { width: 11px; height: auto; }
.ui-as-side__tools { display: flex; gap: 2px; }

.ui-as-icon-btn {
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
  border-radius: 8px;
  color: var(--muted);
  transition: background-color 140ms ease, color 140ms ease;
}
.ui-as-icon-btn:hover { background: var(--hover); color: var(--ink); }

.ui-as-side__nav {
  display: flex;
  flex-direction: column;
  margin-top: 16px;
}
.ui-as-side__group { display: flex; flex-direction: column; }
.ui-as-side__group + .ui-as-side__group { margin-top: 10px; }
.ui-as-side__group + .ui-as-side__group > .ui-as-side__label:first-child { margin-top: 6px; }
.ui-as-side__count { margin-left: auto; font-size: 12px; color: var(--faint); font-variant-numeric: tabular-nums; }
.ui-as-side__empty { padding: 4px 6px; font-size: 13px; color: var(--faint); }
.ui-as-side__item {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  height: 30px;
  padding: 0 6px;
  border-radius: 8px;
  font-size: 13.5px;
  color: var(--text);
  text-align: left;
  transition: background-color 140ms ease, color 140ms ease;
}
.ui-as-side__item svg { color: var(--muted); }
.ui-as-side__item:hover { background: var(--hover); color: var(--ink); }
.ui-as-side__item[aria-current="page"] { background: var(--select); color: var(--ink); font-weight: 500; }
.ui-as-side__item[aria-current="page"] svg { color: var(--ink); }
a.ui-as-side__item { text-decoration: none; cursor: pointer; }
.ui-as-side__label {
  margin: 16px 0 4px;
  padding: 0 6px;
  font-size: 12.5px;
  line-height: 16px;
  color: var(--faint);
}

.ui-as-side__foot {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: auto;
}

/* "What's new" – two cards stacked, the second one peeks out above */
.ui-as-news { position: relative; padding-top: 30px; }
.ui-as-news__card {
  position: relative;
  z-index: 1;
  padding: 10px 10px 0;
  border-radius: 12px;
  background: var(--card);
  box-shadow: 0 0 0 1px var(--line), 0 2px 6px rgba(0, 0, 0, 0.04);
}
.ui-as-news__card--back {
  position: absolute;
  z-index: 0;
  top: 0;
  left: 10px;
  right: 10px;
  height: 48px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 9px 9px 0;
  background: var(--card);
  color: var(--faint);
}
.ui-as-news[data-count="1"] { padding-top: 0; }
.ui-as-news[data-count="1"] .ui-as-news__card--back { display: none; }
.ui-as-news__top { display: flex; align-items: center; justify-content: space-between; }
.ui-as-news__kicker { font-size: 11.5px; line-height: 15px; font-weight: 500; color: var(--accent); }
.ui-as-news__close {
  display: grid;
  place-items: center;
  width: 18px;
  height: 18px;
  margin: -2px -2px 0 0;
  border-radius: 6px;
  color: var(--faint);
}
.ui-as-news__close:hover { background: var(--hover); color: var(--ink); }
.ui-as-news__title { display: block; margin-top: 4px; font-size: 13.5px; line-height: 18px; font-weight: 600; color: var(--ink); }
.ui-as-news__more {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: calc(100% + 20px);
  height: 34px;
  margin: 10px -10px 0;
  padding: 0 10px;
  border-top: 1px solid var(--line-soft);
  border-radius: 0 0 12px 12px;
  font-size: 12.5px;
  color: var(--muted);
}
.ui-as-news__more:hover { background: var(--subtle); color: var(--ink); }

/* Onboarding progress */
/* Getting started: one card that morphs between the short summary and the full Setup Guide */
.ui-as-guide-slot { position: relative; flex: none; }
.ui-as-guide {
  position: absolute;
  z-index: 6;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
  border-radius: 12px;
  background: var(--card);
  box-shadow: 0 0 0 1px var(--line), 0 2px 6px rgba(0, 0, 0, 0.04);
  transition: height 480ms var(--ease), border-radius 480ms var(--ease), box-shadow 200ms ease;
}
.ui-as-guide:not([data-open]):hover { box-shadow: 0 0 0 1px var(--line-strong), 0 2px 6px rgba(0, 0, 0, 0.05); }
.ui-as-guide[data-open] { border-radius: 14px; box-shadow: 0 0 0 1px var(--line), 0 8px 24px -10px rgba(0, 0, 0, 0.14); }
.ui-as-guide__content { animation: ui-as-guide-in 360ms var(--ease) both; }
/* Closing: the guide fades out while the card shrinks back to the summary's height */
.ui-as-guide[data-state="closing"] .ui-as-guide__content { animation: ui-as-guide-out 260ms ease both; }
.ui-as-guide[data-state="closing"] { border-radius: 12px; box-shadow: 0 0 0 1px var(--line), 0 2px 6px rgba(0, 0, 0, 0.04); }
@keyframes ui-as-guide-out { to { opacity: 0; } }
@keyframes ui-as-guide-in { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
.ui-as-steps {
  display: grid;
  gap: 3px;
  width: 100%;
  padding: 10px 10px 9px;
  text-align: left;
}
/* The library's Setup Guide inside the card: its own frame drops away, the card is the frame */
/* Opening and closing belong to the card, so the guide's own minimize button is left out */
.ui-as-guide .ui-sg__icon-btn[aria-expanded] { display: none; }
.ui-as-guide .ui-sg { zoom: 0.86; max-width: none; padding: 12px 4px 4px; border: 0; border-radius: 0; background: transparent; box-shadow: none; }
.ui-as-steps__title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 13.5px;
  line-height: 18px;
  font-weight: 600;
  color: var(--ink);
}
.ui-as-steps__title svg { color: var(--faint); }
.ui-as-steps__sub { font-size: 12.5px; line-height: 17px; color: var(--muted); }
.ui-as-steps__cheer { color: var(--accent); }
.ui-as-steps__bar {
  height: 4px;
  margin-top: 6px;
  overflow: hidden;
  border-radius: 2px;
  background: var(--tray);
}
.ui-as-steps__bar i { display: block; min-width: 6px; height: 100%; border-radius: inherit; background: var(--accent); transition: width 600ms var(--ease); }

.ui-as-user {
  display: flex;
  align-items: center;
  gap: 7px;
  height: 34px;
  padding: 0 6px;
  border-radius: 8px;
  font-size: 13.5px;
  font-weight: 500;
  color: var(--ink);
}
.ui-as-user img { width: 21px; height: 21px; border-radius: 50%; object-fit: cover; box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.06); }
.ui-as-user svg { margin-left: auto; color: var(--faint); }
.ui-as-user:hover { background: var(--hover); }

/* ---------- Main ---------- */

/* Main area as a rounded panel, like the Plico UI library */
.ui-as-main {
  /* Screens reflow their content by the width of this panel */
  container: ui-as-main / inline-size;
  position: relative;
  min-width: 0;
  margin: var(--frame-gap) var(--frame-gap) var(--frame-gap) 0;
  overflow-y: auto;
  /* No rubber-band bounce at the ends – sticky headers stay put */
  overscroll-behavior: none;
  transition: margin-left 420ms var(--ease);
  border: 1px solid var(--line);
  border-radius: var(--radius-panel);
  background: var(--panel);
}


/* Shared page parts: headings, toolbars, tabs, search, empty states – Plico UI tokens */

.ui-as-page {
  padding: 46px 32px 56px;
}
.ui-as-page-title {
  margin: 0;
  font-size: 22px;
  line-height: 28px;
  font-weight: 600;
  letter-spacing: -0.02em;
  color: var(--ink);
}
.ui-as-page-sub {
  margin: 6px 0 0;
  font-size: 13.5px;
  line-height: 20px;
  color: var(--muted);
}
.ui-as-page-sub a { color: var(--text); text-decoration: underline; text-decoration-color: var(--line-strong); text-underline-offset: 3px; }
.ui-as-page-sub a:hover { color: var(--ink); text-decoration-color: currentColor; }

.ui-as-section-head { margin-top: 38px; }
/* Without tabs the tools sit on the same line as the title */
.ui-as-section-head[data-inline] { display: flex; align-items: center; justify-content: space-between; gap: 16px; }
.ui-as-section-head[data-inline] .ui-as-toolbar { margin-top: 0; }
.ui-as-section-head__title {
  margin: 0;
  font-size: 16px;
  line-height: 22px;
  font-weight: 600;
  letter-spacing: -0.01em;
  color: var(--ink);
}
.ui-as-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-top: 16px;
}
.ui-as-toolbar__left, .ui-as-toolbar__right { display: flex; align-items: center; gap: 6px; }

/* Segmented tabs: the active one gets a soft gray fill */
.ui-as-tabs { position: relative; display: flex; gap: 2px; }
/* The gray pill glides under the active tab */
.ui-as-tabs__pill {
  position: absolute;
  top: 0;
  left: 0;
  height: 32px;
  border-radius: 9px;
  background: var(--chip);
  transition: transform 340ms var(--ease), width 340ms var(--ease);
}
.ui-as-tabs__tab {
  position: relative;
  height: 32px;
  padding: 0 10px;
  border-radius: 9px;
  font-size: 13.5px;
  color: var(--muted);
  transition: background-color 140ms ease, color 140ms ease;
}
.ui-as-tabs__tab:hover { color: var(--ink); }
.ui-as-tabs__tab[aria-selected="true"] { color: var(--ink); }

/* Small outlined tools */
.ui-as-tool {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  min-width: 32px;
  height: 32px;
  border-radius: 9px;
  background: var(--card);
  box-shadow: 0 0 0 1px var(--line), var(--shadow);
  color: var(--text);
  transition: box-shadow 140ms ease, color 140ms ease;
}
.ui-as-tool svg { color: var(--muted); }
.ui-as-tool:hover { box-shadow: 0 0 0 1px var(--line-strong), var(--shadow); color: var(--ink); }
.ui-as-tool--label { padding: 0 10px; font-size: 13px; }

.ui-as-view {
  position: relative;
  display: flex;
  gap: 2px;
  height: 32px;
  padding: 2px;
  border-radius: 9px;
  background: var(--chip);
}
.ui-as-view__btn {
  display: grid;
  place-items: center;
  width: 30px;
  border-radius: 7px;
  color: var(--faint);
}
.ui-as-view__btn:hover { color: var(--ink); }
.ui-as-view__btn { position: relative; transition: color 160ms ease; }
.ui-as-view__btn[aria-checked="true"] { color: var(--ink); }
/* White pill that slides between grid and list */
.ui-as-view__pill {
  position: absolute;
  top: 2px;
  bottom: 2px;
  left: 2px;
  width: 30px;
  border-radius: 7px;
  background: var(--card);
  box-shadow: 0 0 0 1px var(--line), var(--shadow);
  transition: transform 320ms var(--ease);
}
.ui-as-view[data-view="list"] .ui-as-view__pill { transform: translateX(32px); }

.ui-as-search {
  display: flex;
  align-items: center;
  gap: 7px;
  height: 32px;
  padding: 0 10px;
  border-radius: 9px;
  background: var(--card);
  box-shadow: 0 0 0 1px var(--line), var(--shadow);
  color: var(--faint);
  cursor: text;
  transition: box-shadow 140ms ease;
}
.ui-as-search:focus-within { box-shadow: 0 0 0 1px var(--line-strong), 0 0 0 3px rgba(0, 0, 0, 0.04); }
.ui-as-search input {
  flex: 1;
  min-width: 0;
  padding: 0;
  border: 0;
  background: transparent;
  font: inherit;
  font-size: 13px;
  color: var(--ink);
}
.ui-as-search input::placeholder { color: var(--placeholder); }
.ui-as-search__clear {
  display: grid;
  flex: none;
  place-items: center;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: var(--chip);
  color: var(--muted);
  animation: ui-as-pop 220ms var(--ease);
}
.ui-as-search__clear:hover { color: var(--ink); }

/* Sort: the arrows turn half a circle for Z–A */
.ui-as-sort svg { transition: transform 360ms var(--ease); }
.ui-as-sort[data-dir="desc"] svg { transform: rotate(180deg); }
.ui-as-tool[data-active] { box-shadow: 0 0 0 1px var(--line-strong), var(--shadow); color: var(--ink); }
.ui-as-tool__count {
  display: grid;
  place-items: center;
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  border-radius: 999px;
  background: var(--ink);
  font-size: 11px;
  font-weight: 600;
  color: var(--on-ink);
  animation: ui-as-pop 220ms var(--ease);
}

/* Popovers: attached to their trigger, they fade and scale in from that side */
.ui-as-anchor { position: relative; display: inline-flex; }
.ui-as-popover {
  position: absolute;
  z-index: 30;
  top: calc(100% + 6px);
  left: 0;
  transform-origin: top left;
  animation: ui-as-popover 220ms var(--ease);
}
.ui-as-popover[data-align="end"] { right: 0; left: auto; transform-origin: top right; }
.ui-as-popover[data-side="top"] { top: auto; bottom: calc(100% + 6px); transform-origin: bottom left; animation-name: ui-as-popover-up; }
.ui-as-popover[data-side="top"][data-align="end"] { transform-origin: bottom right; }
.ui-as-popover[data-side="right"] { top: auto; bottom: 0; left: calc(100% + 12px); transform-origin: bottom left; }
@keyframes ui-as-popover-up { from { opacity: 0; transform: scale(0.96) translateY(4px); } to { opacity: 1; transform: none; } }
.ui-as-popover--filter .ui-fm { zoom: 0.9; width: 340px; }

.ui-as-menu {
  min-width: 168px;
  padding: 4px;
  border-radius: 12px;
  background: var(--card);
  box-shadow: 0 0 0 1px var(--line), 0 12px 32px -8px rgba(0, 0, 0, 0.16);
}
.ui-as-menu__title { display: block; padding: 6px 10px 4px; font-size: 12px; font-weight: 500; color: var(--faint); }
.ui-as-menu__list { display: grid; gap: 1px; }
.ui-as-menu__item {
  display: flex;
  align-items: center;
  gap: 9px;
  width: 100%;
  min-height: 32px;
  padding: 0 10px;
  border-radius: 8px;
  font-size: 13px;
  color: var(--text);
  text-align: left;
  white-space: nowrap;
  transition: background-color 120ms ease, color 120ms ease;
}
.ui-as-menu__item[data-rich] { min-height: 44px; padding: 6px 10px; }
.ui-as-menu__item > svg { flex: none; color: var(--muted); }
.ui-as-menu__item > svg:last-child:not(:first-child) { margin-left: auto; color: var(--ink); }
.ui-as-menu__label { display: grid; flex: 1; gap: 1px; min-width: 0; }
.ui-as-menu__label small { font-size: 12px; line-height: 16px; color: var(--faint); }
.ui-as-menu__item:hover { background: var(--hover); color: var(--ink); }
.ui-as-menu__item[aria-checked="true"] { color: var(--ink); font-weight: 500; }
.ui-as-menu__item[aria-checked="true"] small { font-weight: 400; }
.ui-as-menu__item[data-danger] { color: #dc2626; }
.ui-as-menu__item[data-danger] > svg { color: #dc2626; }

.ui-as-toast {
  position: absolute;
  z-index: 40;
  left: 50%;
  bottom: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  height: 36px;
  padding: 0 14px 0 12px;
  border-radius: 999px;
  background: var(--ink);
  font-size: 13px;
  color: var(--on-ink);
  box-shadow: 0 10px 24px -8px rgba(0, 0, 0, 0.35);
  translate: -50% 0;
  animation: ui-as-toast 2200ms var(--ease) both;
}

/* Shared motion: content that changes (tabs, filters, new messages) rises in; --i staggers a list */
.ui-as-rise { animation: ui-as-rise 420ms var(--ease) both; animation-delay: calc(var(--i, 0) * 35ms); }
@keyframes ui-as-rise { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
@keyframes ui-as-pop { from { opacity: 0; transform: scale(0.6); } to { opacity: 1; transform: none; } }
@keyframes ui-as-popover { from { opacity: 0; transform: scale(0.96) translateY(-4px); } to { opacity: 1; transform: none; } }
@keyframes ui-as-toast {
  0% { opacity: 0; transform: translateY(12px) scale(0.96); }
  12%, 85% { opacity: 1; transform: none; }
  100% { opacity: 0; transform: translateY(6px); }
}
@media (prefers-reduced-motion: reduce) {
  .ui-as *, .ui-as *::before, .ui-as *::after { animation-duration: 1ms !important; transition-duration: 1ms !important; }
}
.ui-as-search input::-webkit-search-cancel-button { display: none; }

/* Empty state in a dashed drop area */
.ui-as-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 16px;
  padding: 48px 24px 52px;
  border: 1px dashed var(--line-strong);
  border-radius: 14px;
  text-align: center;
}
.ui-as-empty[data-tall] { padding: 48px 24px 48px; }
.ui-as-empty__icon {
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  border-radius: 11px;
  background: var(--chip);
  color: var(--muted);
}
.ui-as-empty__title { margin-top: 16px; font-size: 14px; line-height: 20px; font-weight: 500; color: var(--ink); }
.ui-as-empty__text { max-width: 430px; margin: 6px 0 0; font-size: 13px; line-height: 19px; color: var(--muted); text-wrap: balance; }
.ui-as-empty > .ui-button { margin-top: 18px; }

/* Glass Folder from the library at icon size; hovering the whole card or row opens it like hovering the folder itself */
.ui-as-folder-card__icon, .ui-as-folder-head__icon {
  position: relative;
  flex: none;
  width: 30px;
  height: 25px;
}
.ui-as-folder-card__icon .ui-fd, .ui-as-folder-head__icon .ui-fd {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 75px;
  translate: -50% -50%;
}
:is(.ui-as-folder-card, .ui-as-folder-head):hover .ui-fd-icon { transform: translate(-50%, -48%) scale(1.03); }
:is(.ui-as-folder-card, .ui-as-folder-head):hover .ui-fd-doc--left { transform: translate(32px, 70px) rotate(9deg); }
:is(.ui-as-folder-card, .ui-as-folder-head):hover .ui-fd-doc--right { transform: translate(286px, 76px) rotate(5deg); }
:is(.ui-as-folder-card, .ui-as-folder-head):hover .ui-fd-doc--middle { transform: translate(166px, 52px) rotate(-7deg); }
:is(.ui-as-folder-card, .ui-as-folder-head):hover .ui-fd-front {
  top: 24.8%;
  border-radius: 3cqw 3cqw 6.333cqw 6.333cqw;
  transform: translateZ(2.33cqw) rotateX(-9deg);
}

.ui-as-meta { display: inline-flex; align-items: center; gap: 4px; font-size: 12.5px; line-height: 17px; color: var(--muted); }
.ui-as-meta svg { color: var(--faint); }


/* File card – used for templates and for the files inside a folder */
.ui-as-template { display: grid; width: 239px; text-align: left; }
.ui-as-template__preview {
  display: block;
  height: 158px;
  padding: 7px;
  border-radius: 14px;
  background: var(--card);
  box-shadow: 0 0 0 1px var(--line), var(--shadow);
  transition: box-shadow 160ms ease;
}
.ui-as-template:hover .ui-as-template__preview { box-shadow: 0 0 0 1px var(--line-strong), 0 2px 8px rgba(0, 0, 0, 0.05); }
.ui-as-template__name { margin-top: 10px; font-size: 13.5px; line-height: 18px; font-weight: 500; color: var(--ink); }
.ui-as-template .ui-as-meta { margin-top: 2px; }

/* File illustration in the Glass Folder style: tinted back sheet, paper page, frosted type badge */
.ui-as-doc {
  --doc-back: #5bb7ea;
  --doc-glass-1: rgba(120, 200, 245, 0.72);
  --doc-glass-2: rgba(52, 150, 212, 0.78);
  --doc-shade: 60, 130, 180;
  --doc-paper: #eaf2f8;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  border-radius: 10px;
  background: var(--card);
}
.ui-as-doc[data-color="rose"] {
  --doc-back: #f27b90;
  --doc-glass-1: rgba(250, 150, 170, 0.74);
  --doc-glass-2: rgba(222, 70, 100, 0.8);
  --doc-shade: 190, 60, 88;
  --doc-paper: #f9eef1;
}
.ui-as-doc[data-color="emerald"] {
  --doc-back: #4cc591;
  --doc-glass-1: rgba(110, 215, 165, 0.74);
  --doc-glass-2: rgba(30, 160, 102, 0.8);
  --doc-shade: 40, 140, 96;
  --doc-paper: #edf7f2;
}
.ui-as-doc__art { position: relative; display: block; width: 72px; height: 92px; }

/* Tinted sheet peeking out behind the page, like the back of the folder */
.ui-as-doc__back {
  position: absolute;
  inset: 0;
  border-radius: 11px;
  background: var(--doc-back);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.45), 0 10px 18px -8px rgba(var(--doc-shade), 0.45);
  transform: translate(10px, -4px) rotate(8deg);
  transition: transform 420ms var(--ease);
}

/* The page: white fading into a hint of the file's colour, like the documents in the folder */
.ui-as-doc__page {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 13px 11px;
  border-radius: 11px;
  background: linear-gradient(180deg, var(--doc-page, #fff) 0%, var(--doc-paper) 100%);
  box-shadow: 0 0 0 1px var(--doc-edge, rgba(0, 0, 0, 0.1)), 0 3px 5px rgba(var(--doc-shade), 0.16);
  transform: rotate(-3deg);
  transition: transform 420ms var(--ease);
}
.ui-as-doc__title { display: block; width: 58%; height: 5px; margin-bottom: 3px; border-radius: 3px; background: var(--doc-ink-strong, rgba(0, 0, 0, 0.2)); }
.ui-as-doc__line { display: block; height: 4px; border-radius: 2px; background: var(--doc-ink, rgba(0, 0, 0, 0.1)); }
.ui-as-doc__image {
  display: block;
  height: 26px;
  margin-bottom: 2px;
  border-radius: 5px;
  background: linear-gradient(160deg, var(--doc-glass-1), var(--doc-glass-2));
  opacity: 0.55;
}

/* Spreadsheet: a 3 × 6 grid with a darker header row */
.ui-as-sheet { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; }
.ui-as-sheet i { height: 8px; border-radius: 2px; background: var(--doc-cell, rgba(0, 0, 0, 0.07)); }
.ui-as-sheet i:nth-child(-n + 3) { background: rgba(var(--doc-shade), 0.35); }

/* Small frosted glass tag at the lower right corner, the same recipe as the folder's front pocket */
.ui-as-doc__type {
  position: absolute;
  right: -12px;
  bottom: 10px;
  z-index: 2;
  padding: 3px 6px;
  border-radius: 5px;
  background:
    linear-gradient(180deg, rgba(0, 0, 0, 0) 55%, rgba(var(--doc-shade), 0.25) 100%),
    linear-gradient(180deg, var(--doc-glass-1), var(--doc-glass-2));
  box-shadow:
    inset 0 0 0 1px rgba(255, 255, 255, 0.35),
    inset 0 1px 0 rgba(255, 255, 255, 0.6),
    0 6px 12px -4px rgba(var(--doc-shade), 0.45);
  -webkit-backdrop-filter: blur(4px) saturate(1.15);
  backdrop-filter: blur(4px) saturate(1.15);
  font-size: 10px;
  line-height: 13px;
  font-weight: 600;
  color: #fff;
  text-shadow: 0 1px 2px rgba(var(--doc-shade), 0.45);
  transition: transform 420ms var(--ease);
}
.ui-as-template:hover .ui-as-doc__back { transform: translate(14px, -7px) rotate(12deg); }
.ui-as-template:hover .ui-as-doc__page { transform: translateY(-4px) rotate(-5deg); }
.ui-as-template:hover .ui-as-doc__type { transform: translate(2px, -2px); }

/* Workspace initial and user initials */
.ui-as-side__logo { font-size: 10.5px; font-weight: 600; color: var(--ink); }
.ui-as-user__initials {
  display: grid;
  place-items: center;
  width: 21px;
  height: 21px;
  border-radius: 50%;
  background: var(--accent-soft);
  font-size: 9.5px;
  font-weight: 600;
  color: var(--accent);
}

/* File illustrations in dark mode: dark paper tinted by the file's color, light lines */
:where(.dark, [data-theme="dark"]) .ui-as-doc {
  --doc-page: #303238;
  --doc-edge: rgba(255, 255, 255, 0.1);
  --doc-ink: rgba(255, 255, 255, 0.14);
  --doc-ink-strong: rgba(255, 255, 255, 0.3);
  --doc-cell: rgba(255, 255, 255, 0.08);
}
:where(.dark, [data-theme="dark"]) .ui-as-doc { --doc-paper: #263039; }
:where(.dark, [data-theme="dark"]) .ui-as-doc[data-color="rose"] { --doc-paper: #36282d; }
:where(.dark, [data-theme="dark"]) .ui-as-doc[data-color="emerald"] { --doc-paper: #243530; }

/* Scrim behind the drawer – only used on narrow screens */
.ui-as-scrim { display: none; }

/* ---------- Narrow: tablet and phone ---------- */
/* Container queries on the app itself, so a scaled 1440 px preview keeps the desktop layout */

@container ui-as (max-width: 900px) {
  /* The main panel takes the whole width; the sidebar slides in over it as a drawer */
  .ui-as-app > .ui-as-main { grid-row: 1; grid-column: 1 / -1; margin-left: var(--frame-gap); }
  .ui-as-app > .ui-as-side {
    position: absolute;
    z-index: 50;
    top: 0;
    bottom: 0;
    left: 0;
    width: min(264px, calc(100% - 56px));
    padding: 10px 10px 10px 12px;
    border-radius: 0 18px 18px 0;
    background: var(--page);
    box-shadow: 0 0 0 1px var(--line), 0 24px 48px -12px rgba(0, 0, 0, 0.28);
  }
  .ui-as-app:not([data-drawer]) > .ui-as-side {
    visibility: hidden;
    translate: calc(-100% - 24px) 0;
    transition: translate 380ms var(--ease), visibility 0s 380ms;
  }
  .ui-as-app[data-drawer] > .ui-as-side {
    visibility: visible;
    opacity: 1;
    translate: 0 0;
    transition: translate 420ms var(--ease), visibility 0s;
  }
  .ui-as-app > .ui-as-scrim {
    display: block;
    position: absolute;
    z-index: 45;
    inset: 0;
    background: rgba(0, 0, 0, 0.28);
    visibility: hidden;
    opacity: 0;
    transition: opacity 300ms ease, visibility 0s 300ms;
  }
  .ui-as-app[data-drawer] > .ui-as-scrim { visibility: visible; opacity: 1; transition: opacity 300ms ease, visibility 0s; }
  :where(.dark, [data-theme="dark"]) .ui-as-app > .ui-as-scrim { background: rgba(0, 0, 0, 0.55); }
  /* The icon to open it always waits in the top left corner of the panel */
  .ui-as-app:not([data-drawer]) > .ui-as-side-open {
    visibility: visible;
    opacity: 1;
    transition: opacity 260ms ease 160ms, visibility 0s;
  }
  /* It stays put while the panel scrolls, so it gets the panel's color behind it */
  .ui-as-app > .ui-as-side-open { left: calc(var(--frame-gap) + 9px); background: var(--panel); }
  .ui-as-app > .ui-as-side-open:hover { background: var(--chip); }

  /* Page parts: less padding, toolbars wrap */
  .ui-as-page { padding: 46px 24px 48px; }
  /* File cards fill the cells of the grids the screens switch to */
  .ui-as-main .ui-as-file-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); }
  .ui-as-main .ui-as-file-grid .ui-as-template { width: 100%; }
  .ui-as-main .ui-as-file-grid .ui-as-template__name { overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }
  .ui-as-main .ui-as-file-grid .ui-as-meta { display: block; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }
  .ui-as-main .ui-as-file-grid .ui-as-meta svg { display: inline-block; vertical-align: -2px; }
  .ui-as-toolbar { flex-wrap: wrap; row-gap: 10px; }
  .ui-as-toolbar__right { flex-wrap: wrap; }
  .ui-as-section-head[data-inline] { flex-wrap: wrap; row-gap: 12px; }
}

@container ui-as (max-width: 600px) {
  .ui-as-app > * { --frame-gap: 6px; }
  .ui-as-app > .ui-as-main { border-radius: 16px; }
  .ui-as-page { padding: 52px 16px 40px; }
  .ui-as-page-title { font-size: 20px; line-height: 26px; }
  .ui-as-section-head { margin-top: 32px; }
  /* Toolbars: tabs on their own line, the tools below; search takes what is left */
  .ui-as-toolbar__left, .ui-as-toolbar__right { width: 100%; }
  .ui-as-toolbar__right .ui-as-search { order: 9; flex: 1 1 100%; width: auto !important; }
  .ui-as-toolbar__right > .ui-button:last-child { margin-left: auto; }
  .ui-as-tabs { max-width: 100%; overflow-x: auto; scrollbar-width: none; }
  .ui-as-tabs__tab { flex: none; }
  .ui-as-empty { padding: 36px 18px 40px; }
  .ui-as-popover--filter .ui-fm { width: 300px; }
  .ui-as-main .ui-as-file-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px 10px; }
  .ui-as-main .ui-as-file-grid .ui-as-template__preview { height: 128px; }
}
`;
var valueValue5: IconNode = [
  [
    `path`,
    {
      d: `M16 2V6M8 2V6`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `0`,
    },
  ],
  [
    `path`,
    {
      d: `M13 4H11C7.22876 4 5.34315 4 4.17157 5.17157C3 6.34315 3 8.22876 3 12V14C3 17.7712 3 19.6569 4.17157 20.8284C5.34315 22 7.22876 22 11 22H13C16.7712 22 18.6569 22 19.8284 20.8284C21 19.6569 21 17.7712 21 14V12C21 8.22876 21 6.34315 19.8284 5.17157C18.6569 4 16.7712 4 13 4Z`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `1`,
    },
  ],
  [
    `path`,
    {
      d: `M3 10H21`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `2`,
    },
  ],
  [
    `path`,
    {
      d: `M12.1258 14H12.0008M12.1258 18H12.0008M7.625 14H7.5M7.625 18H7.5M16.625 14H16.5M12.2508 14C12.2508 14.1381 12.1389 14.25 12.0008 14.25C11.8628 14.25 11.7508 14.1381 11.7508 14C11.7508 13.8619 11.8628 13.75 12.0008 13.75C12.1389 13.75 12.2508 13.8619 12.2508 14ZM12.2508 18C12.2508 18.1381 12.1389 18.25 12.0008 18.25C11.8628 18.25 11.7508 18.1381 11.7508 18C11.7508 17.8619 11.8628 17.75 12.0008 17.75C12.1389 17.75 12.2508 17.8619 12.2508 18ZM7.75 14C7.75 14.1381 7.63807 14.25 7.5 14.25C7.36193 14.25 7.25 14.1381 7.25 14C7.25 13.8619 7.36193 13.75 7.5 13.75C7.63807 13.75 7.75 13.8619 7.75 14ZM7.75 18C7.75 18.1381 7.63807 18.25 7.5 18.25C7.36193 18.25 7.25 18.1381 7.25 18C7.25 17.8619 7.36193 17.75 7.5 17.75C7.63807 17.75 7.75 17.8619 7.75 18ZM16.75 14C16.75 14.1381 16.6381 14.25 16.5 14.25C16.3619 14.25 16.25 14.1381 16.25 14C16.25 13.8619 16.3619 13.75 16.5 13.75C16.6381 13.75 16.75 13.8619 16.75 14Z`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `3`,
    },
  ],
];
var valueValue6: IconNode = [
  [
    `path`,
    {
      d: `M7.5 14.5C7.5 11.2002 7.5 9.55025 8.52513 8.52513C9.55025 7.5 11.2002 7.5 14.5 7.5C17.7998 7.5 19.4497 7.5 20.4749 8.52513C21.5 9.55025 21.5 11.2002 21.5 14.5C21.5 17.7998 21.5 19.4497 20.4749 20.4749C19.4497 21.5 17.7998 21.5 14.5 21.5C11.2002 21.5 9.55025 21.5 8.52513 20.4749C7.5 19.4497 7.5 17.7998 7.5 14.5Z`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `0`,
    },
  ],
  [
    `path`,
    {
      d: `M7.5 16.5C6.10355 16.5 5.40533 16.5 4.84402 16.3036C3.83866 15.9518 3.0482 15.1613 2.69641 14.156C2.5 13.5947 2.5 12.8964 2.5 11.5V9.5C2.5 6.20017 2.5 4.55025 3.52513 3.52513C4.55025 2.5 6.20017 2.5 9.5 2.5H11.5C12.8964 2.5 13.5947 2.5 14.156 2.69641C15.1613 3.0482 15.9518 3.83866 16.3036 4.84402C16.5 5.40533 16.5 6.10355 16.5 7.5`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `1`,
    },
  ],
];
var valueValue7: IconNode = [
  [
    `path`,
    {
      d: `M17.9583 8.38889C17.9583 6.24111 15.2907 4.5 12 4.5C8.7093 4.5 6.04167 6.24111 6.04167 8.38889C6.04167 10.5367 7.66667 11.7222 12 11.7222C16.3333 11.7222 18.5 12.8333 18.5 15.6111C18.5 18.3889 15.5899 19.5 12 19.5C8.41015 19.5 5.5 17.7589 5.5 15.6111`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeWidth: `1.5`,
      key: `0`,
    },
  ],
  [
    `path`,
    {
      d: `M12.5 2.5V4.21M12.5 21.5V19.79`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `1`,
    },
  ],
];
var valueValue8: IconNode = [
  [
    `path`,
    {
      d: `M3 11.9896V14.5C3 17.7998 3 19.4497 4.02513 20.4749C5.05025 21.5 6.70017 21.5 10 21.5H14C17.2998 21.5 18.9497 21.5 19.9749 20.4749C21 19.4497 21 17.7998 21 14.5V11.9896C21 10.3083 21 9.46773 20.6441 8.74005C20.2882 8.01237 19.6247 7.49628 18.2976 6.46411L16.2976 4.90855C14.2331 3.30285 13.2009 2.5 12 2.5C10.7991 2.5 9.76689 3.30285 7.70242 4.90855L5.70241 6.46411C4.37533 7.49628 3.71179 8.01237 3.3559 8.74005C3 9.46773 3 10.3083 3 11.9896Z`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `0`,
    },
  ],
];
var valueValue9: IconNode = [
  [
    `path`,
    {
      d: `M9.14339 10.691L9.35031 10.4841C11.329 8.50532 14.5372 8.50532 16.5159 10.4841C18.4947 12.4628 18.4947 15.671 16.5159 17.6497L13.6497 20.5159C11.671 22.4947 8.46279 22.4947 6.48405 20.5159C4.50532 18.5372 4.50532 15.329 6.48405 13.3503L6.9484 12.886`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeWidth: `1.5`,
      key: `0`,
    },
  ],
  [
    `path`,
    {
      d: `M17.0516 11.114L17.5159 10.6497C19.4947 8.67095 19.4947 5.46279 17.5159 3.48405C15.5372 1.50532 12.329 1.50532 10.3503 3.48405L7.48405 6.35031C5.50532 8.32904 5.50532 11.5372 7.48405 13.5159C9.46279 15.4947 12.671 15.4947 14.6497 13.5159L14.8566 13.309`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeWidth: `1.5`,
      key: `1`,
    },
  ],
];
var valueValue10: IconNode = [
  [
    `path`,
    {
      d: `M20 10C20 10 22.375 11.8222 21.375 14.6667C20.375 17.5111 21.375 19.4074 22 20M20 10H4M20 10V4M4 10C4 10 1.625 11.8222 2.625 14.6667C3.625 17.5111 2.625 19.4074 2 20M4 10V4M22 4H20.75H20M2 4H3.25H4M4 4H20`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `0`,
    },
  ],
  [
    `path`,
    {
      d: `M11 7H13`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `1`,
    },
  ],
];
var valueValue11: IconNode = [
  [
    `path`,
    {
      d: `M17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeWidth: `1.5`,
      key: `0`,
    },
  ],
  [
    `path`,
    {
      d: `M14 2.20004C13.3538 2.06886 12.6849 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 11.3151 21.9311 10.6462 21.8 10`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeWidth: `1.5`,
      key: `1`,
    },
  ],
  [
    `path`,
    {
      d: `M12.0303 11.9625L16.5832 7.4096M19.7404 4.34462L19.1872 2.35748C19.0853 2.03011 18.6914 1.89965 18.4259 2.11662C16.9898 3.29018 15.4254 4.87091 16.703 7.36419C19.2771 8.56455 20.7466 6.94584 21.8733 5.5853C22.0975 5.3146 21.9623 4.90767 21.6247 4.81005L19.7404 4.34462Z`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `2`,
    },
  ],
];
var valueValue12: IconNode = [
  [
    `path`,
    {
      d: `M16 21C15.7668 18.0685 13.3422 15.7477 10.3085 15.5521L9.49999 15.5C9.21121 15.5076 8.94209 15.5178 8.68816 15.5298C5.68124 15.6723 3.23089 18.0974 3 21`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `0`,
    },
  ],
  [
    `path`,
    {
      d: `M12.75 9.75C12.75 11.5449 11.2949 13 9.5 13C7.70508 13 6.25 11.5449 6.25 9.75C6.25 7.95507 7.70508 6.5 9.5 6.5C11.2949 6.5 12.75 7.95507 12.75 9.75Z`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `1`,
    },
  ],
  [
    `path`,
    {
      d: `M21 17.501C20.7709 14.6314 18.4541 12.2748 15.5 11.9961`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `2`,
    },
  ],
  [
    `path`,
    {
      d: `M15.9877 9C16.8965 8.42434 17.5001 7.40788 17.5001 6.25C17.5001 4.45507 16.0496 3 14.2602 3C13.3811 3 12.5838 3.35121 12.0001 3.92139`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `3`,
    },
  ],
];
var ValueValue: IconNode = [
  [
    `path`,
    {
      d: `M16 10L18.1494 10.6448C19.5226 11.0568 20.2092 11.2628 20.6046 11.7942C21 12.3256 21 13.0425 21 14.4761V22`,
      stroke: `currentColor`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `0`,
    },
  ],
  [
    `path`,
    {
      d: `M8 9L11 9M8 13L11 13`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `1`,
    },
  ],
  [
    `path`,
    {
      d: `M12 22V19C12 18.0572 12 17.5858 11.7071 17.2929C11.4142 17 10.9428 17 10 17H9C8.05719 17 7.58579 17 7.29289 17.2929C7 17.5858 7 18.0572 7 19V22`,
      stroke: `currentColor`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `2`,
    },
  ],
  [
    `path`,
    {
      d: `M2 22L22 22`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeWidth: `1.5`,
      key: `3`,
    },
  ],
  [
    `path`,
    {
      d: `M3 22V6.71724C3 4.20649 3 2.95111 3.79118 2.32824C4.58237 1.70537 5.74742 2.04355 8.07752 2.7199L13.0775 4.17122C14.4836 4.57937 15.1867 4.78344 15.5933 5.33965C16 5.89587 16 6.65344 16 8.16857V22`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `4`,
    },
  ],
];
var ValueValue2: IconNode = [
  [
    `path`,
    {
      d: `M4 12.0005L4 14.5446C4 17.7896 4 19.4122 4.88607 20.5111C5.06508 20.7331 5.26731 20.9354 5.48933 21.1144C6.58831 22.0005 8.21082 22.0005 11.4558 22.0005C12.1614 22.0005 12.5141 22.0005 12.8372 21.8865C12.9044 21.8627 12.9702 21.8355 13.0345 21.8047C13.3436 21.6569 13.593 21.4075 14.0919 20.9086L18.8284 16.172C19.4065 15.594 19.6955 15.3049 19.8478 14.9374C20 14.5699 20 14.1611 20 13.3436V10.0005C20 6.22922 20 4.34361 18.8284 3.17203C17.7693 2.11287 16.1265 2.01125 13.0345 2.0015M13 21.5005V21.0005C13 18.172 13 16.7578 13.8787 15.8791C14.7574 15.0005 16.1716 15.0005 19 15.0005H19.5`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `0`,
    },
  ],
  [
    `path`,
    {
      d: `M12 5.99954H4M8 1.99954V9.99954`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `1`,
    },
  ],
];
var ValueValue3: IconNode = [
  [
    `path`,
    {
      d: `M12 21C15.7497 21 17.6246 21 18.9389 20.0451C19.3634 19.7367 19.7367 19.3634 20.0451 18.9389C21 17.6246 21 15.7497 21 12C21 8.25027 21 6.3754 20.0451 5.06107C19.7367 4.6366 19.3634 4.26331 18.9389 3.95491C17.6246 3 15.7497 3 12 3C8.25027 3 6.3754 3 5.06107 3.95491C4.6366 4.26331 4.26331 4.6366 3.95491 5.06107C3 6.3754 3 8.25027 3 12C3 15.7497 3 17.6246 3.95491 18.9389C4.26331 19.3634 4.6366 19.7367 5.06107 20.0451C6.3754 21 8.25027 21 12 21Z`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `0`,
    },
  ],
  [
    `path`,
    {
      d: `M12 7V11M17 7V17M7 7V14`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `1`,
    },
  ],
];
var ValueValue4: IconNode = [
  [
    `path`,
    {
      d: `M20.0092 2V5.13219C20.0092 5.42605 19.6418 5.55908 19.4537 5.33333C17.6226 3.2875 14.9617 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `0`,
    },
  ],
];
var valueValue: IconNode = [
  [
    `path`,
    {
      d: `M13.7276 3.44418L15.4874 6.99288C15.7274 7.48687 16.3673 7.9607 16.9073 8.05143L20.0969 8.58575C22.1367 8.92853 22.6167 10.4206 21.1468 11.8925L18.6671 14.3927C18.2471 14.8161 18.0172 15.6327 18.1471 16.2175L18.8571 19.3125C19.417 21.7623 18.1271 22.71 15.9774 21.4296L12.9877 19.6452C12.4478 19.3226 11.5579 19.3226 11.0079 19.6452L8.01827 21.4296C5.8785 22.71 4.57865 21.7522 5.13859 19.3125L5.84851 16.2175C5.97849 15.6327 5.74852 14.8161 5.32856 14.3927L2.84884 11.8925C1.389 10.4206 1.85895 8.92853 3.89872 8.58575L7.08837 8.05143C7.61831 7.9607 8.25824 7.48687 8.49821 6.99288L10.258 3.44418C11.2179 1.51861 12.7777 1.51861 13.7276 3.44418Z`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `0`,
    },
  ],
];
var ValueValue5: IconNode = [
  [
    `circle`,
    {
      cx: `1.5`,
      cy: `1.5`,
      r: `1.5`,
      transform: `matrix(1 0 0 -1 16 8.00024)`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `0`,
    },
  ],
  [
    `path`,
    {
      d: `M2.77423 11.1439C1.77108 12.2643 1.7495 13.9546 2.67016 15.1437C4.49711 17.5033 6.49674 19.5029 8.85633 21.3298C10.0454 22.2505 11.7357 22.2289 12.8561 21.2258C15.8979 18.5022 18.6835 15.6559 21.3719 12.5279C21.6377 12.2187 21.8039 11.8397 21.8412 11.4336C22.0062 9.63798 22.3452 4.46467 20.9403 3.05974C19.5353 1.65481 14.362 1.99377 12.5664 2.15876C12.1603 2.19608 11.7813 2.36233 11.472 2.62811C8.34412 5.31646 5.49781 8.10211 2.77423 11.1439Z`,
      stroke: `currentColor`,
      strokeWidth: `1.5`,
      key: `1`,
    },
  ],
  [
    `path`,
    {
      d: `M7.00002 14.0002L10 17.0002`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `2`,
    },
  ],
];
var valueValue2: IconNode = [
  [
    `path`,
    {
      d: `M3 3H21`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `0`,
    },
  ],
  [
    `path`,
    {
      d: `M3 9H11`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `1`,
    },
  ],
  [
    `path`,
    {
      d: `M3 15H21`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `2`,
    },
  ],
  [
    `path`,
    {
      d: `M3 21H11`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `3`,
    },
  ],
];
var ValueValue6 = [
  {
    label: `Home`,
    icon: valueValue8,
  },
  {
    label: `Companies`,
    icon: ValueValue,
    count: 284,
  },
  {
    label: `Contacts`,
    icon: valueValue12,
  },
  {
    label: `Deals`,
    icon: valueValue7,
  },
  {
    label: `Reports`,
    icon: valueValue4,
  },
];
var ValueValue7 = [
  {
    label: `Pipelines`,
    items: [
      {
        label: `New business`,
        icon: valueValue11,
      },
      {
        label: `Renewals`,
        icon: ValueValue4,
      },
      {
        label: `Partnerships`,
        icon: valueValue12,
      },
    ],
  },
];
var ValueValue8: Record<string, [string, string]> = {
  notion: [
    `#171717`,
    `M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.139c-.093-.514.28-.887.747-.933zM1.936 1.035l13.31-.98c1.634-.14 2.055-.047 3.082.7l4.249 2.986c.7.513.934.653.934 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.047-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.667c0-.839.374-1.54 1.447-1.632z`,
  ],
  linear: [
    `#5E6AD2`,
    `M2.886 4.18A11.982 11.982 0 0 1 11.99 0C18.624 0 24 5.376 24 12.009c0 3.64-1.62 6.903-4.18 9.105L2.887 4.18ZM1.817 5.626l16.556 16.556c-.524.33-1.075.62-1.65.866L.951 7.277c.247-.575.537-1.126.866-1.65ZM.322 9.163l14.515 14.515c-.71.172-1.443.282-2.195.322L0 11.358a12 12 0 0 1 .322-2.195Zm-.17 4.862 9.823 9.824a12.02 12.02 0 0 1-9.824-9.824Z`,
  ],
  figma: [
    `#F24E1E`,
    `M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.014-4.49-4.49S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.02 3.019 3.02h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM8.148 8.981c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117V8.981H8.148zM8.172 24c-2.489 0-4.515-2.014-4.515-4.49s2.014-4.49 4.49-4.49h4.588v4.441c0 2.503-2.047 4.539-4.563 4.539zm-.024-7.51a3.023 3.023 0 0 0-3.019 3.019c0 1.665 1.365 3.019 3.044 3.019 1.705 0 3.093-1.376 3.093-3.068v-2.97H8.148zm7.704 0h-.098c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h.098c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.49-4.49 4.49zm-.097-7.509c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h.098c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-.098z`,
  ],
  stripe: [
    `#635BFF`,
    `M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.594-7.305h.003z`,
  ],
  shopify: [
    `#7AB55C`,
    `M15.337 23.979l7.216-1.561s-2.604-17.613-2.625-17.73c-.018-.116-.114-.192-.211-.192s-1.929-.136-1.929-.136-1.275-1.274-1.439-1.411c-.045-.037-.075-.057-.121-.074l-.914 21.104h.023zM11.71 11.305s-.81-.424-1.774-.424c-1.447 0-1.504.906-1.504 1.141 0 1.232 3.24 1.715 3.24 4.629 0 2.295-1.44 3.76-3.406 3.76-2.354 0-3.54-1.465-3.54-1.465l.646-2.086s1.245 1.066 2.28 1.066c.675 0 .975-.545.975-.932 0-1.619-2.654-1.694-2.654-4.359-.034-2.237 1.571-4.416 4.827-4.416 1.257 0 1.875.361 1.875.361l-.945 2.715-.02.01zM11.17.83c.136 0 .271.038.405.135-.984.465-2.064 1.639-2.508 3.992-.656.213-1.293.405-1.889.578C7.697 3.75 8.951.84 11.17.84V.83zm1.235 2.949v.135c-.754.232-1.583.484-2.394.736.466-1.777 1.333-2.645 2.085-2.971.193.501.309 1.176.309 2.1zm.539-2.234c.694.074 1.141.867 1.429 1.755-.349.114-.735.231-1.158.366v-.252c0-.752-.096-1.371-.271-1.871v.002zm2.992 1.289c-.02 0-.06.021-.078.021s-.289.075-.714.21c-.423-1.233-1.176-2.37-2.508-2.37h-.115C12.135.209 11.669 0 11.265 0 8.159 0 6.675 3.877 6.21 5.846c-1.194.365-2.063.636-2.16.674-.675.213-.694.232-.772.87-.075.462-1.83 14.063-1.83 14.063L15.009 24l.927-21.166z`,
  ],
  airtable: [
    `#18BFFF`,
    `M11.992 1.966c-.434 0-.87.086-1.28.257L1.779 5.917c-.503.208-.49.908.012 1.116l8.982 3.558a3.266 3.266 0 0 0 2.454 0l8.982-3.558c.503-.196.503-.908.012-1.116l-8.957-3.694a3.255 3.255 0 0 0-1.272-.257zM23.4 8.056a.589.589 0 0 0-.222.045l-10.012 3.877a.612.612 0 0 0-.38.564v8.896a.6.6 0 0 0 .821.552L23.62 18.1a.583.583 0 0 0 .38-.551V8.653a.6.6 0 0 0-.6-.596zM.676 8.095a.644.644 0 0 0-.48.19C.086 8.396 0 8.53 0 8.69v8.355c0 .442.515.737.908.54l6.27-3.006.307-.147 2.969-1.436c.466-.22.43-.908-.061-1.092L.883 8.138a.57.57 0 0 0-.207-.044z`,
  ],
  hubspot: [
    `#FF7A59`,
    `M18.164 7.93V5.084a2.198 2.198 0 001.267-1.978v-.067A2.2 2.2 0 0017.238.845h-.067a2.2 2.2 0 00-2.193 2.193v.067a2.196 2.196 0 001.252 1.973l.013.006v2.852a6.22 6.22 0 00-2.969 1.31l.012-.01-7.828-6.095A2.497 2.497 0 104.3 4.656l-.012.006 7.697 5.991a6.176 6.176 0 00-1.038 3.446c0 1.343.425 2.588 1.147 3.607l-.013-.02-2.342 2.343a1.968 1.968 0 00-.58-.095h-.002a2.033 2.033 0 102.033 2.033 1.978 1.978 0 00-.1-.595l.005.014 2.317-2.317a6.247 6.247 0 104.782-11.134l-.036-.005zm-.964 9.378a3.206 3.206 0 113.215-3.207v.002a3.206 3.206 0 01-3.207 3.207z`,
  ],
  webflow: [
    `#146EF5`,
    `m24 4.515-7.658 14.97H9.149l3.205-6.204h-.144C9.566 16.713 5.621 18.973 0 19.485v-6.118s3.596-.213 5.71-2.435H0V4.515h6.417v5.278l.144-.001 2.622-5.277h4.854v5.244h.144l2.72-5.244H24Z`,
  ],
  vercel: [`#171717`, `m12 1.608 12 20.784H0Z`],
  clickup: [
    `#7B68EE`,
    `M2 18.439l3.69-2.828c1.961 2.56 4.044 3.739 6.363 3.739 2.307 0 4.33-1.166 6.203-3.704L22 18.405C19.298 22.065 15.941 24 12.053 24 8.178 24 4.788 22.078 2 18.439zM12.04 6.15l-6.568 5.66-3.036-3.52L12.055 0l9.543 8.296-3.05 3.509z`,
  ],
};
var ValueValue9 = ({ id: id }: { id: keyof typeof ValueValue8 }) => (
  <span className={`ui-as-crm__logo`}>
    <svg viewBox={`0 0 24 24`} fill={ValueValue8[id][0]} aria-hidden={`true`}>
      <path d={ValueValue8[id][1]} />
    </svg>
  </span>
);
var ValueValue10 = () => (
  <svg viewBox={`0 0 38 57`} aria-hidden={`true`}>
    <path d={`M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0Z`} fill={`#1ABCFE`} />
    <path d={`M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0Z`} fill={`#0ACF83`} />
    <path d={`M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19Z`} fill={`#FF7262`} />
    <path d={`M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5Z`} fill={`#F24E1E`} />
    <path d={`M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5Z`} fill={`#A259FF`} />
  </svg>
);
var Iconz = ({ id: id }: { id: keyof typeof ValueValue8 }) =>
  id === `figma` ? (
    <span
      className={`ui-as-crm__tab-logo`}
      style={{
        background: `#1e1e1e`,
      }}
    >
      <ValueValue10 />
    </span>
  ) : (
    <span
      className={`ui-as-crm__tab-logo`}
      style={{
        background: id === `notion` ? `#171717` : ValueValue8[id][0],
      }}
    >
      <svg viewBox={`0 0 24 24`} fill={`#ffffff`} aria-hidden={`true`}>
        <path d={ValueValue8[id][1]} />
      </svg>
    </span>
  );
var ValueValue11 = [
  {
    id: `notion`,
    name: `Notion`,
    category: `Productivity`,
    domain: `notion.so`,
    owner: `Mara Klein`,
    value: 48e3,
    stage: `Negotiation`,
    contact: `Today`,
  },
  {
    id: `linear`,
    name: `Linear`,
    category: `Planning`,
    domain: `linear.app`,
    owner: `Jonas Weber`,
    value: 12500,
    stage: `Proposal`,
    contact: `Yesterday`,
  },
  {
    id: `figma`,
    name: `Figma`,
    category: `Design`,
    domain: `figma.com`,
    owner: `Mara Klein`,
    value: 86e3,
    stage: `Won`,
    contact: `Mar 6`,
  },
  {
    id: `stripe`,
    name: `Stripe`,
    category: `Payments`,
    domain: `stripe.com`,
    owner: `Lea Braun`,
    value: 124e3,
    stage: `Qualified`,
    contact: `Mar 5`,
  },
  {
    id: `shopify`,
    name: `Shopify`,
    category: `E-commerce`,
    domain: `shopify.com`,
    owner: `Jonas Weber`,
    value: 9800,
    stage: `New`,
    contact: `Mar 4`,
  },
  {
    id: `vercel`,
    name: `Vercel`,
    category: `Developer Tools`,
    domain: `vercel.com`,
    owner: `Lea Braun`,
    value: 62e3,
    stage: `Proposal`,
    contact: `Mar 3`,
  },
  {
    id: `airtable`,
    name: `Airtable`,
    category: `Productivity`,
    domain: `airtable.com`,
    owner: `Mara Klein`,
    value: 37500,
    stage: `Qualified`,
    contact: `Mar 1`,
  },
  {
    id: `hubspot`,
    name: `HubSpot`,
    category: `CRM`,
    domain: `hubspot.com`,
    owner: `Tom Fischer`,
    value: 21e3,
    stage: `New`,
    contact: `Feb 27`,
  },
  {
    id: `clickup`,
    name: `ClickUp`,
    category: `Planning`,
    domain: `clickup.com`,
    owner: `Tom Fischer`,
    value: 6400,
    stage: `Lost`,
    contact: `Feb 25`,
  },
  {
    id: `webflow`,
    name: `Webflow`,
    category: `Design`,
    domain: `webflow.com`,
    owner: `Lea Braun`,
    value: 18900,
    stage: `Negotiation`,
    contact: `Feb 24`,
  },
];
var ValueValue12 = [
  {
    key: `company`,
    label: `Company`,
    icon: <Icon icon={valueValue2} size={15} />,
    type: `title`,
    width: `16%`,
  },
  {
    key: `category`,
    label: `Category`,
    icon: <Icon icon={ValueValue5} size={15} />,
    type: `tag`,
    width: `14%`,
  },
  {
    key: `domain`,
    label: `Domain`,
    icon: <Icon icon={valueValue9} size={15} />,
    type: `link`,
    width: `14%`,
  },
  {
    key: `owner`,
    label: `Owner`,
    icon: <Icon icon={UserIcon} size={15} />,
    type: `text`,
    width: `12%`,
  },
  {
    key: `value`,
    label: `Value`,
    icon: <Icon icon={valueValue7} size={15} />,
    type: `number`,
    width: `12%`,
  },
  {
    key: `stage`,
    label: `Stage`,
    icon: <Icon icon={ValueValue3} size={15} />,
    type: `tag`,
    width: `12%`,
  },
  {
    key: `contact`,
    label: `Last contact`,
    icon: <Icon icon={valueValue5} size={15} />,
    type: `text`,
  },
];
var ValueValue13 = ValueValue11.map((e) => ({
  id: e.id,
  company: e.name,
  logo: <ValueValue9 id={e.id} />,
  category: e.category,
  domain: `https://${e.domain}`,
  owner: e.owner,
  value: e.value,
  stage: e.stage,
  contact: e.contact,
}));
var ValueValue14: Record<string, string> = {
  Productivity: `gray`,
  Planning: `blue`,
  Design: `pink`,
  Payments: `violet`,
  "E-commerce": `amber`,
  "Developer Tools": `gray`,
  CRM: `blue`,
  New: `gray`,
  Qualified: `blue`,
  Proposal: `violet`,
  Negotiation: `amber`,
  Won: `green`,
  Lost: `pink`,
};
var ValueValue15 = [
  {
    label: `Company CRM`,
    logo: `hubspot`,
  },
  {
    label: `Team strategy`,
    logo: `linear`,
  },
  {
    label: `Pixel integration`,
    logo: `figma`,
  },
  {
    label: `Sales docs`,
    logo: `notion`,
  },
];
var ValueValue16 = [`New`, `Qualified`, `Proposal`, `Negotiation`, `Won`];
var ValueValue17 = (e: number) => `$${e.toLocaleString(`en-US`)}`;
var valueValue3: FileRecord[] = [
  {
    name: `Sales-Playbook`,
    type: `DOC`,
    edited: `Today`,
    owner: `Mara Klein`,
  },
  {
    name: `Pricing-2025`,
    type: `PDF`,
    edited: `Yesterday`,
    owner: `Lea Braun`,
  },
  {
    name: `Pipeline-Forecast`,
    type: `XLS`,
    edited: `3 days ago`,
    owner: `Jonas Weber`,
  },
  {
    name: `Objection-Handling`,
    type: `DOC`,
    edited: `Last week`,
    owner: `Tom Fischer`,
  },
];
var ValueValue18 = `<script async src="https://cdn.acme.com/pixel.js"><\/script>
<script>
  window.acme = window.acme || [];
  acme.push(["init", "px_4f9a21"]);
  acme.push(["track", "page_view"]);
<\/script>`;
function Crm(e: AppShellProps) {
  let [t, n] = React.useState(ValueValue15[0].label),
    [r, a] = React.useState(false),
    [m, _] = React.useState(`Head of Sales`),
    [y, b] = React.useState(false),
    [x, C] = React.useState(`idle`),
    [w, T] = useToast(),
    D = () => {
      (navigator.clipboard?.writeText(ValueValue18).catch(() => {}),
        b(true),
        window.setTimeout(() => b(false), 1600));
    },
    O = () => {
      (C(`busy`), window.setTimeout(() => C(`ok`), 1400));
    };
  return (
    <AppShell active={`Companies`} nav={ValueValue6} groups={ValueValue7} {...e}>
      <style href={`ui-screen-crm`} precedence={`default`}>
        {ValueValue19}
      </style>
      <div className={`ui-as-crm`}>
        <header className={`ui-as-crm__top`}>
          <span className={`ui-as-crm__path`}>
            <Icon icon={FilesIcon} size={15} />
            <span>{`Sales`}</span>
            <i>{`/`}</i>
            <DropdownMenu
              title={`Views`}
              items={[`Head of Sales`, `Account executive`, `Partner manager`].map((e) => ({
                label: e,
                checked: e === m,
                onSelect: () => _(e),
              }))}
              trigger={({ open: open, toggle: toggle }) => (
                <button
                  type={`button`}
                  className={`ui-as-crm__view`}
                  aria-expanded={open}
                  onClick={toggle}
                >
                  {m}
                  <Icon icon={ChevronDownIcon} size={13} />
                </button>
              )}
            />
          </span>
          <button
            type={`button`}
            className={`ui-as-icon-btn ui-as-crm__star`}
            aria-label={r ? `Remove from favorites` : `Add to favorites`}
            aria-pressed={r}
            onClick={() => {
              (a((e) => !e), T(r ? `Removed from favorites` : `Added to favorites`));
            }}
          >
            <Icon icon={valueValue} size={15} />
          </button>
        </header>
        <nav className={`ui-as-crm__tabs`} aria-label={`Open views`}>
          <button type={`button`} className={`ui-as-icon-btn`} aria-label={`New view`}>
            <Icon icon={ValueValue2} size={16} />
          </button>
          <button type={`button`} className={`ui-as-icon-btn`} aria-label={`All views`}>
            <Icon icon={MoreIcon} size={16} />
          </button>
          <span className={`ui-as-crm__sep`} />
          {ValueValue15.map((e) => (
            <button
              type={`button`}
              className={`ui-as-crm__tab`}
              aria-current={t === e.label ? `page` : void 0}
              onClick={(t) => {
                n(e.label);
                let r = t.currentTarget,
                  i = r.parentElement;
                if (!i || i.scrollWidth <= i.clientWidth) return;
                let a = Math.min(
                  r.offsetLeft - 14,
                  Math.max(i.scrollLeft, r.offsetLeft + r.offsetWidth + 14 - i.clientWidth),
                );
                i.scrollTo({
                  left: a,
                  behavior: `smooth`,
                });
              }}
              key={e.label}
            >
              <Iconz id={e.logo} />
              {e.label}
            </button>
          ))}
        </nav>
        <div className={`ui-as-crm__table`} key={t}>
          {t === `Company CRM` && (
            <DataTable
              title={`Company CRM`}
              icon={<Icon icon={valueValue10} size={16} />}
              columns={ValueValue12}
              rows={ValueValue13}
              tagTones={ValueValue14}
            />
          )}
          {t === `Team strategy` && (
            <div className={`ui-as-board`}>
              {ValueValue16.map((e, t) => {
                let n = ValueValue11.filter((t) => t.stage === e);
                return (
                  <section
                    className={`ui-as-board__col ui-as-rise`}
                    style={
                      {
                        "--i": t,
                      } as React.CSSProperties
                    }
                    key={e}
                  >
                    <header>
                      <span className={`ui-as-board__dot`} data-tone={ValueValue14[e]} />
                      {e}
                      <span className={`ui-as-board__count`}>{n.length}</span>
                      <span className={`ui-as-board__sum`}>
                        {ValueValue17(n.reduce((e, t) => e + t.value, 0))}
                      </span>
                    </header>
                    {n.map((e) => (
                      <article className={`ui-as-board__card`} key={e.id}>
                        <span className={`ui-as-board__name`}>
                          <span className={`ui-as-board__logo`}>
                            <ValueValue9 id={e.id} />
                          </span>
                          {e.name}
                        </span>
                        <b>{ValueValue17(e.value)}</b>
                        <span className={`ui-as-board__meta`}>
                          {e.owner}
                          {` · `}
                          {e.contact}
                        </span>
                      </article>
                    ))}
                  </section>
                );
              })}
            </div>
          )}
          {t === `Pixel integration` && (
            <div className={`ui-as-pixel`}>
              <h2 className={`ui-as-rise`}>{`Install the tracking pixel`}</h2>
              <p
                className={`ui-as-rise`}
                style={
                  {
                    "--i": 1,
                  } as React.CSSProperties
                }
              >{`Add this snippet to every page, right before the closing </head> tag. Visits and sign-ups then show up on each company.`}</p>
              <div
                className={`ui-as-pixel__code ui-as-rise`}
                style={
                  {
                    "--i": 2,
                  } as React.CSSProperties
                }
              >
                <button type={`button`} className={`ui-as-tool ui-as-tool--label`} onClick={D}>
                  <Icon icon={y ? CheckIcon : valueValue6} size={14} />
                  {y ? `Copied` : `Copy`}
                </button>
                <pre>{ValueValue18}</pre>
              </div>
              <div
                className={`ui-as-pixel__status ui-as-rise`}
                style={
                  {
                    "--i": 3,
                  } as React.CSSProperties
                }
                data-state={x}
              >
                <span className={`ui-as-pixel__light`} />
                <span>
                  <b>
                    {x === `ok`
                      ? `Pixel is live`
                      : x === `busy`
                        ? `Checking…`
                        : `Waiting for the first event`}
                  </b>
                  {x === `ok`
                    ? `Last event: page_view on acme.com, just now`
                    : `Install the snippet, then check the connection.`}
                </span>
                <button
                  type={`button`}
                  className={`ui-as-tool ui-as-tool--label`}
                  onClick={O}
                  disabled={x === `busy`}
                >
                  {x === `ok` ? `Check again` : `Check connection`}
                </button>
              </div>
            </div>
          )}
          {t === `Sales docs` && (
            <div className={`ui-as-crm-docs ui-as-file-grid`}>
              {valueValue3.map((e, t) => (
                <div
                  className={`ui-as-rise`}
                  style={
                    {
                      "--i": t,
                    } as React.CSSProperties
                  }
                  key={e.name}
                >
                  <FileTemplate
                    file={e}
                    meta={
                      <>
                        {documentNames[e.type]}
                        {` · `}
                        {e.owner}
                        {` · `}
                        {e.edited}
                      </>
                    }
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {w}
    </AppShell>
  );
}
var ValueValue19 = `
/* CRM: path and tabs on the panel, the table as its own white layer below */
.ui-as-crm { display: flex; flex-direction: column; height: 100%; min-height: 0; padding: 0 0 12px; }
.ui-as-crm__top { display: flex; flex: none; align-items: center; gap: 6px; height: 52px; padding: 0 16px 0 20px; }
.ui-as-crm__path { display: flex; align-items: center; gap: 8px; font-size: 13.5px; color: var(--muted); }
.ui-as-crm__path i { font-style: normal; color: var(--faint); }
.ui-as-crm__view {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  height: 26px;
  margin-left: -6px;
  padding: 0 6px;
  border-radius: 7px;
  font-weight: 500;
  color: var(--ink);
  transition: background-color 140ms ease;
}
.ui-as-crm__view:hover { background: var(--hover); }
.ui-as-crm__star { width: 26px; height: 26px; }
.ui-as-crm__star[aria-pressed="true"] { color: #f59e0b; }
.ui-as-crm__star[aria-pressed="true"] path { fill: currentColor; }

.ui-as-crm__tabs { display: flex; flex: none; align-items: center; gap: 4px; padding: 0 14px 12px; }
.ui-as-crm__sep { width: 1px; height: 18px; margin: 0 6px; background: var(--line); }
.ui-as-crm__tab {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 32px;
  padding: 0 12px 0 10px;
  border-radius: 9px;
  font-size: 13.5px;
  color: var(--muted);
  transition: background-color 140ms ease, color 140ms ease;
}
.ui-as-crm__tab:hover { color: var(--ink); background: var(--hover); }
.ui-as-crm__tab[aria-current="page"] { background: var(--chip); color: var(--ink); font-weight: 500; }

/* The table as a white layer with a thin edge, inset from the panel */
.ui-as-crm__table {
  flex: 1;
  min-height: 0;
  margin: 0 12px;
  overflow: auto;
  border-radius: 14px;
  background: var(--card);
  box-shadow: 0 0 0 1px var(--line), var(--shadow);
}
.ui-as .ui-as-crm__table .ui-dt { --ui-dt-card-shadow: none; padding: 0; border-radius: 0; background: transparent; }
.ui-as-crm__table .ui-dt__head { padding: 14px 18px 12px; }
/* A line above the head and one under the last row, so the table ends cleanly before "Add row" */
.ui-as-crm__table .ui-dt__card { border: 0; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); border-radius: 0; }

.ui-as-crm__table > * { animation: ui-as-rise 380ms var(--ease) both; }

/* Team strategy: deals as a board by stage */
.ui-as-board { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 12px; padding: 16px; }
.ui-as-board__col { display: flex; flex-direction: column; gap: 8px; min-width: 0; padding: 10px; border-radius: 12px; background: var(--chip); }
.ui-as-board__col header { display: flex; align-items: center; gap: 7px; padding: 2px 4px 4px; font-size: 13px; font-weight: 500; color: var(--ink); }
.ui-as-board__dot { width: 7px; height: 7px; border-radius: 50%; background: #a3a3a3; }
.ui-as-board__dot[data-tone="blue"] { background: #2f6bff; }
.ui-as-board__dot[data-tone="violet"] { background: #7c4dff; }
.ui-as-board__dot[data-tone="amber"] { background: #f59e0b; }
.ui-as-board__dot[data-tone="green"] { background: #16a34a; }
.ui-as-board__count { font-weight: 400; color: var(--faint); }
.ui-as-board__sum { margin-left: auto; font-size: 12px; font-weight: 400; color: var(--muted); font-variant-numeric: tabular-nums; }
.ui-as-board__card {
  display: grid;
  gap: 4px;
  padding: 10px 12px;
  border-radius: 10px;
  background: var(--card);
  box-shadow: 0 0 0 1px var(--line), var(--shadow);
  transition: box-shadow 160ms ease, transform 200ms var(--ease);
}
.ui-as-board__card:hover { transform: translateY(-1px); box-shadow: 0 0 0 1px var(--line-strong), 0 4px 12px rgba(0, 0, 0, 0.06); }
.ui-as-board__name { display: flex; align-items: center; gap: 8px; font-size: 13.5px; font-weight: 500; color: var(--ink); }
.ui-as-board__logo { display: block; width: 20px; height: 20px; }
.ui-as-board__card b { font-size: 14px; font-weight: 500; color: var(--ink); font-variant-numeric: tabular-nums; }
.ui-as-board__meta { font-size: 12px; color: var(--muted); }

/* Pixel integration: setup steps with a code snippet and a live status */
.ui-as-pixel { padding: 28px 28px 32px; }
/* Text keeps a readable line length; code block and status run the full width */
.ui-as-pixel p { max-width: 640px; }
.ui-as-pixel h2 { margin: 0; font-size: 16px; font-weight: 500; color: var(--ink); }
.ui-as-pixel p { margin: 6px 0 0; font-size: 13.5px; line-height: 20px; color: var(--muted); }
.ui-as-pixel__code { position: relative; margin-top: 18px; border-radius: 12px; background: var(--subtle); box-shadow: inset 0 0 0 1px var(--line); }
.ui-as-pixel__code pre { margin: 0; padding: 16px 18px; overflow-x: auto; font-family: ui-monospace, "SF Mono", Menlo, monospace; font-size: 12.5px; line-height: 20px; color: var(--ink); }
.ui-as-pixel__code .ui-as-tool { position: absolute; top: 10px; right: 10px; background: var(--card); }
.ui-as-pixel__status {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 14px;
  padding: 12px 14px;
  border-radius: 12px;
  box-shadow: inset 0 0 0 1px var(--line);
  font-size: 13px;
  color: var(--muted);
}
.ui-as-pixel__status > span:nth-child(2) { display: grid; flex: 1; gap: 1px; }
.ui-as-pixel__status b { font-weight: 500; color: var(--ink); }
.ui-as-pixel__light { width: 9px; height: 9px; border-radius: 50%; background: #f59e0b; box-shadow: 0 0 0 4px rgba(245, 158, 11, 0.15); }
.ui-as-pixel__status[data-state="busy"] .ui-as-pixel__light { animation: ui-as-blink 700ms ease-in-out infinite alternate; }
.ui-as-pixel__status[data-state="ok"] .ui-as-pixel__light { background: #16a34a; box-shadow: 0 0 0 4px rgba(22, 163, 74, 0.15); }
@keyframes ui-as-blink { to { opacity: 0.3; } }

/* Sales docs */
.ui-as-crm-docs { display: flex; flex-wrap: wrap; gap: 12px; padding: 18px; }

/* Company mark on a small white tile */
.ui-as-crm__logo {
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  background: #ffffff;
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.08);
}
.ui-as-crm__logo svg { width: 64%; height: 64%; }
.ui-as-crm__tab-logo { display: grid; flex: none; place-items: center; width: 18px; height: 18px; border-radius: 5px; }
.ui-as-crm__tab-logo svg { width: 11px; height: 11px; }

/* Room for the sidebar icon while the sidebar is collapsed */
.ui-as-crm__top { transition: padding-left 420ms var(--ease); }
.ui-as-app[data-collapsed] .ui-as-crm__top { padding-left: 52px; }

/* Narrow: the views scroll sideways, the table and the board scroll inside their layer */
@container ui-as (max-width: 900px) {
  .ui-as-crm__top { padding-left: 52px; }
  .ui-as-crm__tabs { position: relative; overflow-x: auto; scrollbar-width: none; }
  .ui-as-crm__tabs::-webkit-scrollbar { display: none; }
  .ui-as-crm__tabs > * { flex: none; }
  .ui-as-crm__table .ui-dt__table { min-width: 880px; }
  .ui-as-board { grid-template-columns: repeat(5, 232px); width: max-content; }
}
@container ui-as (max-width: 600px) {
  .ui-as-crm { padding-bottom: 6px; }
  .ui-as-crm__top { padding-right: 8px; }
  .ui-as-crm__tabs { padding: 0 8px 10px; }
  .ui-as-crm__table { margin: 0 6px; border-radius: 12px; }
  .ui-as-crm__table .ui-dt__head { padding: 12px 14px 10px; }
  .ui-as-board { grid-template-columns: repeat(5, 216px); padding: 12px; }
  .ui-as-pixel { padding: 20px 16px 24px; }
  .ui-as-pixel__code pre { padding-top: 52px; }
  .ui-as-pixel__status { flex-wrap: wrap; }
  .ui-as-pixel__status > span:nth-child(2) { flex-basis: calc(100% - 30px); }
  .ui-as-crm-docs { padding: 14px; }
}
`;
function CrmDemo2() {
  return (
    <PreviewFrame>
      <Crm onNavigate={navigateScreen} />
    </PreviewFrame>
  );
}
function FullScreen(props: {}) {
  return (
    <ScreenFrameModeContext.Provider value={true}>
      <CrmDemo2 {...props} />
    </ScreenFrameModeContext.Provider>
  );
}
const demoStyles = "";
function CrmDemo(props: {}) {
  return (
    <>
      <style href="plico-demo-crm" precedence="default">
        {demoStyles}
      </style>
      <CrmDemo2 {...props} />
    </>
  );
}
export { Crm as Component };
export { Crm };
export { CrmDemo };
export { CrmDemo as Demo };
export { FullScreen };
export default Crm;

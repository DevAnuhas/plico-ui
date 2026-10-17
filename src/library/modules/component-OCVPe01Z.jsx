"use client";

import * as React from "react";
import * as JSXRuntime from "react/jsx-runtime";
var cellText = (value) =>
  typeof value == `string` || typeof value == `number` ? String(value) : ``;
var columnLetter = (index) => String.fromCharCode(65 + (index % 26));
var isApplePlatform = () => typeof navigator < `u` && /Mac|iPhone|iPad/.test(navigator.platform);
function parseCellInput(text, column) {
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
}) {
  let [localRows, setLocalRows] = React.useState(rows),
    historyRef = React.useRef({
      past: [],
      future: [],
    }),
    [selectedIds, setSelectedIds] = React.useState(new Set()),
    [sort, setSort] = React.useState(null),
    [activeCell, setActiveCellState] = React.useState(null),
    [anchorCell, setAnchorCellState] = React.useState(null),
    cellStateRef = React.useRef({
      active: null,
      anchor: null,
    }),
    setActiveCell = (cell) => {
      ((cellStateRef.current.active = cell), setActiveCellState(cell));
    },
    setAnchorCell = (cell) => {
      ((cellStateRef.current.anchor = cell), setAnchorCellState(cell));
    },
    [editing, setEditing] = React.useState(null),
    [dragging, setDragging] = React.useState(false),
    [, forceRender] = React.useState(0),
    scrollRef = React.useRef(null),
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
    canEditColumn = (columnIndex) => editable && columns[columnIndex]?.editable !== false,
    commitRows = (nextRows) => {
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
    isInSelection = (rowIndex, columnIndex) =>
      !!selection &&
      rowIndex >= selection.r1 &&
      rowIndex <= selection.r2 &&
      columnIndex >= selection.c1 &&
      columnIndex <= selection.c2,
    applyMatrix = (cell, matrix) => {
      let patches = new Map();
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
    moveActiveCell = (cell, extend = false) => {
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
    startEditing = (cell, initialValue) => {
      canEditColumn(cell.c) &&
        sortedRows[cell.r] &&
        setEditing({
          cell: cell,
          value: initialValue ?? cellText(sortedRows[cell.r][columns[cell.c].key]),
        });
    },
    finishEditing = (commit, nextCell, overrideValue) => {
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
  let handleGridKeyDown = (event) => {
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
        s = {
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
        return (event.preventDefault(), moveActiveCell(s[event.key], event.shiftKey));
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
              .map((t) => cellText(e[t.key]).replace(/[\t\n]/g, ` `))
              .join(`	`),
          ).join(`
`)
        : ``,
    handleCopy = (event) => {
      !editing &&
        selection &&
        (event.preventDefault(), event.clipboardData.setData(`text/plain`, selectionText()));
    },
    handleCut = (event) => {
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
    handlePaste = (event) => {
      if (editing || !activeCell) return;
      event.preventDefault();
      let text = event.clipboardData.getData(`text/plain`).replace(/\r/g, ``).replace(/\n$/, ``);
      if (!text) return;
      let matrix = text
        .split(
          `
`,
        )
        .map((e) => e.split(`	`));
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
    toggleSort = (key) =>
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
    updateSelection = (ids) => {
      (setSelectedIds(ids),
        onSelectionChange?.(localRows.filter((t) => ids.has(t.id)).map((e) => e.id)));
    },
    allSelected = sortedRows.length > 0 && selectedIds.size === sortedRows.length,
    mixedSelected = selectedIds.size > 0 && !allSelected,
    addRow = () => {
      newRowIdRef.current += 1;
      let e = columns.find((e) => e.type === `title`)?.key ?? columns[0].key,
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
      (commitRows(localRows.filter((e) => !selectedIds.has(e.id))),
        updateSelection(new Set()),
        setActiveCell(null),
        setAnchorCell(null));
    },
    columnOptions = (column) =>
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
                  {sortedRows.map((e, t) => {
                    let n = selectedIds.has(e.id);
                    return (
                      <tr role={`row`} data-selected={n || void 0} key={e.id}>
                        <td className={`ui-dt__select`} role={`gridcell`}>
                          <SelectionCheckbox
                            checked={n}
                            label={`Select ${cellText(e[columns.find((e) => e.type === `title`)?.key ?? columns[0].key]) || `row`}`}
                            onChange={() => {
                              let t = new Set(selectedIds);
                              (t.has(e.id) ? t.delete(e.id) : t.add(e.id), updateSelection(t));
                            }}
                          />
                        </td>
                        {columns.map((n, i) => {
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
                                  e.target.closest(`a`) ||
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
                                  onDone={(e, n, r) =>
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
function CellValue({ column: column, row: row, tone: tone }) {
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
}) {
  let inputRef = React.useRef(null);
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
}) {
  let anchorRef = React.useRef(null),
    pickerRef = React.useRef(null),
    [position, setPosition] = React.useState(null);
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
      let e = (e) => {
        pickerRef.current?.contains(e.target) || onDone(false);
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
function SelectionCheckbox({ checked: checked, mixed: mixed, label: label, onChange: onChange }) {
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
var TableColumnIcon = (path) => (
  <svg
    viewBox={`0 0 16 16`}
    width={`15`}
    height={`15`}
    fill={`none`}
    stroke={`currentColor`}
    strokeWidth={`1.3`}
    strokeLinecap={`round`}
    strokeLinejoin={`round`}
    aria-hidden={`true`}
  >
    <path d={path} />
  </svg>
);
var TextColumnIcon = () => TableColumnIcon(`M3 4h10M3 7h10M3 10h10M3 13h6`);
var GridColumnIcon = () => TableColumnIcon(`M3 3h4v4H3zM9 3h4v4H9zM3 9h4v4H3zM9 9h4v4H9z`);
var LinkColumnIcon = () =>
  TableColumnIcon(
    `M6.5 9.5l3-3M7.25 4.75l1-1a2.5 2.5 0 0 1 3.5 3.5l-1 1M8.75 11.25l-1 1a2.5 2.5 0 0 1-3.5-3.5l1-1`,
  );
var DateColumnIcon = () => TableColumnIcon(`M3 4.5h10v9H3zM3 7.5h10M6 2.5v3M10 2.5v3`);
function useMorphHeight(contentRef) {
  let wrapperRef = React.useRef(null);
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
export { DataTable as t };
export { DateColumnIcon as n };
export { LinkColumnIcon as r };
export { GridColumnIcon as i };
export { TextColumnIcon as a };
export { DataTable as PlicoCore_c };

export { TextColumnIcon as PlicoApi_TextColumnIcon };

export { GridColumnIcon as PlicoApi_TagColumnIcon };

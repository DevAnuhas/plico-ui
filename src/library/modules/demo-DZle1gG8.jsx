"use client";

import * as React from "react";
import * as JSXRuntime from "react/jsx-runtime";
var easeOutQuart = (progress) => 1 - (1 - progress) ** 4;
var prefersReducedMotion = () =>
  typeof window < `u` && window.matchMedia(`(prefers-reduced-motion: reduce)`).matches;
var delay = (e) => new Promise((t) => window.setTimeout(t, e));
var todayLabel = () =>
  new Date().toLocaleDateString(`en-US`, {
    month: `short`,
    day: `numeric`,
  });
var createMemoryId = () => `m-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
var autosizeTextarea = (textarea) => {
  textarea &&
    ((textarea.style.height = `auto`), (textarea.style.height = `${textarea.scrollHeight}px`));
};
function useAnimatedCounts(targets, duration) {
  let [values, setValues] = React.useState(targets),
    currentRef = React.useRef(targets),
    signature = JSON.stringify(targets);
  return (
    React.useEffect(() => {
      let e = JSON.parse(signature),
        n = {
          ...currentRef.current,
        };
      if (prefersReducedMotion() || Object.keys(e).every((t) => n[t] === e[t])) {
        ((currentRef.current = e), setValues(e));
        return;
      }
      let r = performance.now(),
        l = 0,
        u = (a) => {
          let c = Math.min(1, (a - r) / duration),
            d = easeOutQuart(c),
            f = {};
          for (let t in e) f[t] = (n[t] ?? e[t]) + (e[t] - (n[t] ?? e[t])) * d;
          ((currentRef.current = f), setValues(f), c < 1 && (l = requestAnimationFrame(u)));
        };
      return ((l = requestAnimationFrame(u)), () => cancelAnimationFrame(l));
    }, [signature, duration]),
    values
  );
}
function SwapText({ id: id, children: children }) {
  let previousRef = React.useRef({
      id: id,
      node: children,
    }),
    [currentId, setCurrentId] = React.useState(id),
    [leaving, setLeaving] = React.useState(null);
  return (
    currentId !== id && (setCurrentId(id), setLeaving(previousRef.current)),
    (previousRef.current = {
      id: id,
      node: children,
    }),
    React.useEffect(() => {
      if (!leaving) return;
      let e = window.setTimeout(() => setLeaving(null), 260);
      return () => window.clearTimeout(e);
    }, [leaving]),
    (
      <span className={`ui-mp__swap`}>
        {leaving && (
          <span
            className={`ui-mp__swap-item`}
            data-out={``}
            aria-hidden={`true`}
            key={`out-${leaving.id}`}
          >
            {leaving.node}
          </span>
        )}
        <span className={`ui-mp__swap-item`} key={id}>
          {children}
        </span>
      </span>
    )
  );
}
var strokeProps = {
  stroke: `currentColor`,
  strokeWidth: 1.4,
  strokeLinecap: `round`,
  strokeLinejoin: `round`,
};
var Icon = ({ children: children, size = 14 }) => (
  <svg width={size} height={size} viewBox={`0 0 14 14`} fill={`none`} aria-hidden={`true`}>
    {children}
  </svg>
);
var EditIcon = () => (
  <Icon>
    <path
      d={`M8.6 3.1 10.9 5.4M2.8 11.2l.5-2.6 6-6a1.2 1.2 0 0 1 1.7 0l.6.6a1.2 1.2 0 0 1 0 1.7l-6 6-2.8.3Z`}
      {...strokeProps}
    />
  </Icon>
);
var PauseIcon = () => (
  <Icon>
    <path d={`M5.3 3.8v6.4M8.7 3.8v6.4`} {...strokeProps} strokeWidth={1.6} />
  </Icon>
);
var PlayIcon = () => (
  <Icon>
    <path
      d={`M4.8 3.6v6.8a.4.4 0 0 0 .6.3l5.2-3.4a.4.4 0 0 0 0-.6L5.4 3.3a.4.4 0 0 0-.6.3Z`}
      {...strokeProps}
    />
  </Icon>
);
var ForgetIcon = () => (
  <Icon>
    <path
      d={`M2.8 4.2h8.4M5.6 4.2V3a.8.8 0 0 1 .8-.8h1.2a.8.8 0 0 1 .8.8v1.2M3.9 4.2l.5 6.6a1 1 0 0 0 1 .9h3.2a1 1 0 0 0 1-.9l.5-6.6`}
      {...strokeProps}
    />
  </Icon>
);
var UndoIcon = () => (
  <Icon size={12}>
    <path d={`M4.6 2.8 2.4 5l2.2 2.2M2.6 5h5.6a3.2 3.2 0 0 1 0 6.4H6`} {...strokeProps} />
  </Icon>
);
var AddIcon = () => (
  <Icon>
    <path d={`M7 3v8M3 7h8`} {...strokeProps} />
  </Icon>
);
var SearchIcon = () => (
  <Icon>
    <circle cx={`6.2`} cy={`6.2`} r={`3.6`} {...strokeProps} />
    <path d={`m8.9 8.9 2.4 2.4`} {...strokeProps} />
  </Icon>
);
var CloseIcon = () => (
  <Icon size={12}>
    <path d={`m4 4 6 6m0-6-6 6`} {...strokeProps} />
  </Icon>
);
var InfoIcon = () => (
  <Icon>
    <circle cx={`7`} cy={`7`} r={`5.2`} {...strokeProps} />
    <path d={`M7 6.4v3M7 4.6v.01`} {...strokeProps} strokeWidth={1.6} />
  </Icon>
);
var ArrowIcon = () => (
  <Icon size={12}>
    <path d={`M2.5 7h8M7.5 4l3 3-3 3`} {...strokeProps} />
  </Icon>
);
function MemoryPanel({
  memories: memories,
  onChange: onChange,
  onAdd: onAdd,
  onEdit: onEdit,
  onPause: onPause,
  onForget: onForget,
  onRestore: onRestore,
  enabled: enabled,
  defaultEnabled = true,
  onEnabledChange: onEnabledChange,
  categories: categories,
  title = `Memory`,
  maxHeight = 360,
  undoFor = 5e3,
  addedSource = `You added`,
  action: action,
  className: className,
}) {
  let instanceId = React.useId(),
    rootRef = React.useRef(null),
    listRef = React.useRef(null),
    [localMemories, setLocalMemories] = React.useState(memories),
    items = onChange ? memories : localMemories,
    itemsRef = React.useRef(items);
  itemsRef.current = items;
  let commitMemories = (next) => {
      ((itemsRef.current = next), onChange || setLocalMemories(next), onChange?.(next));
    },
    [localEnabled, setLocalEnabled] = React.useState(defaultEnabled),
    isEnabled = enabled ?? localEnabled,
    setEnabled = (value) => {
      (setLocalEnabled(value), onEnabledChange?.(value));
    },
    [leavingMap, setLeavingMap] = React.useState({}),
    [enteringMap, setEnteringMap] = React.useState({}),
    [category, setCategory] = React.useState(null),
    [searchOpen, setSearchOpen] = React.useState(false),
    [query, setQuery] = React.useState(``),
    [hotId, setHotId] = React.useState(null),
    [editingId, setEditingId] = React.useState(null),
    [editText, setEditText] = React.useState(``),
    [adding, setAdding] = React.useState(false),
    [addText, setAddText] = React.useState(``),
    [addCategory, setAddCategory] = React.useState(null),
    [undo, setUndo] = React.useState(null),
    scrollToRef = React.useRef(null),
    mountedRef = React.useRef(true);
  (React.useEffect(
    () => (
      (mountedRef.current = true),
      () => {
        mountedRef.current = false;
      }
    ),
    [],
  ),
    React.useEffect(() => {
      if (!Object.keys(enteringMap).length) return;
      let e = 0,
        t = requestAnimationFrame(() => {
          e = requestAnimationFrame(() => setEnteringMap({}));
        });
      return () => {
        (cancelAnimationFrame(t), cancelAnimationFrame(e));
      };
    }, [enteringMap]),
    React.useEffect(() => {
      if (Object.keys(enteringMap).length || !scrollToRef.current) return;
      let e = scrollToRef.current;
      scrollToRef.current = null;
      let t = window.setTimeout(() => {
        let t = listRef.current,
          n = t?.querySelector(`[data-memory="${CSS.escape(e)}"]`);
        if (!t || !n) return;
        let r = n.offsetTop - t.offsetTop;
        (r < t.scrollTop || r + n.offsetHeight > t.scrollTop + t.clientHeight) &&
          t.scrollTo({
            top: r - 8,
            behavior: prefersReducedMotion() ? `auto` : `smooth`,
          });
      }, 120);
      return () => window.clearTimeout(t);
    }, [enteringMap]),
    React.useEffect(() => {
      if (!undo) return;
      let e = window.setTimeout(() => setUndo(null), undoFor);
      return () => window.clearTimeout(e);
    }, [undo, undoFor]));
  let allCategories = [...(categories ?? [])];
  for (let e of items) allCategories.includes(e.category) || allCategories.push(e.category);
  let visibleItems = items.filter((e) => !leavingMap[e.id]),
    pausedCount = visibleItems.filter((e) => e.paused).length,
    normalizedQuery = query.trim().toLowerCase(),
    matches = (memory) =>
      (!category || memory.category === category) &&
      (!normalizedQuery ||
        memory.text.toLowerCase().includes(normalizedQuery) ||
        memory.category.toLowerCase().includes(normalizedQuery)),
    isVisible = (memory) => matches(memory) && !leavingMap[memory.id] && !enteringMap[memory.id],
    hasMatches = items.some((e) => matches(e) && !leavingMap[e.id]),
    hotMemory = items.find((e) => e.id === hotId) ?? null,
    animatedCounts = useAnimatedCounts(
      {
        total: visibleItems.length,
        paused: pausedCount,
      },
      520,
    ),
    totalCount = Math.round(animatedCounts.total ?? visibleItems.length),
    displayedPausedCount = Math.round(animatedCounts.paused ?? pausedCount),
    forgetMemory = async (memory) => {
      if (
        leavingMap[memory.id] ||
        (editingId === memory.id && setEditingId(null),
        setHotId(null),
        setLeavingMap((t) => ({
          ...t,
          [memory.id]: true,
        })),
        prefersReducedMotion() || (await delay(320)),
        !mountedRef.current)
      )
        return;
      let index = itemsRef.current.findIndex((t) => t.id === memory.id);
      (commitMemories(itemsRef.current.filter((t) => t.id !== memory.id)),
        onForget?.(memory.id),
        setLeavingMap(({ [memory.id]: t, ...n }) => n),
        setUndo({
          memory: memory,
          index: index,
          key: Date.now(),
        }));
    },
    restoreMemory = () => {
      if (!undo) return;
      let { memory: memory, index: index } = undo,
        next = [...itemsRef.current];
      (next.splice(Math.max(0, Math.min(index, next.length)), 0, memory),
        setEnteringMap({
          [memory.id]: true,
        }),
        (scrollToRef.current = memory.id),
        category && category !== memory.category && setCategory(null),
        commitMemories(next),
        onRestore?.(memory),
        setUndo(null));
    },
    togglePaused = (memory) => {
      (commitMemories(
        itemsRef.current.map((t) =>
          t.id === memory.id
            ? {
                ...t,
                paused: !t.paused,
              }
            : t,
        ),
      ),
        onPause?.(memory.id, !memory.paused));
    },
    startEdit = (memory) => {
      (setAdding(false), setEditText(memory.text), setEditingId(memory.id));
    },
    saveEdit = () => {
      let id = editingId,
        text = editText.trim().replace(/\s+/g, ` `);
      if ((setEditingId(null), !id)) return;
      let memory = itemsRef.current.find((t) => t.id === id);
      memory &&
        text &&
        text !== memory.text &&
        (commitMemories(
          itemsRef.current.map((n) =>
            n.id === id
              ? {
                  ...n,
                  text: text,
                }
              : n,
          ),
        ),
        onEdit?.(id, text),
        window.requestAnimationFrame(() =>
          rootRef.current
            ?.querySelector(`[data-memory="${CSS.escape(id)}"] [data-act="edit"]`)
            ?.focus({
              preventScroll: true,
            }),
        ));
    },
    cancelEdit = () => {
      let id = editingId;
      (setEditingId(null),
        id &&
          window.requestAnimationFrame(() =>
            rootRef.current
              ?.querySelector(`[data-memory="${CSS.escape(id)}"] [data-act="edit"]`)
              ?.focus({
                preventScroll: true,
              }),
          ));
    },
    newCategory = addCategory ?? category ?? allCategories[0] ?? `General`,
    startAdd = () => {
      (setEditingId(null),
        setAddText(``),
        setAddCategory(category ?? allCategories[0] ?? `General`),
        setAdding(true));
    },
    cancelAdd = () => {
      (setAdding(false),
        window.requestAnimationFrame(() =>
          rootRef.current?.querySelector(`.ui-mp__add`)?.focus({
            preventScroll: true,
          }),
        ));
    },
    saveAdd = () => {
      let text = addText.trim().replace(/\s+/g, ` `);
      if (!text) return;
      let memory = {
        id: createMemoryId(),
        text: text,
        category: newCategory,
        source: addedSource,
        date: todayLabel(),
      };
      (setEnteringMap({
        [memory.id]: true,
      }),
        (scrollToRef.current = memory.id),
        category && category !== memory.category && setCategory(null),
        normalizedQuery && setQuery(``),
        commitMemories([...itemsRef.current, memory]),
        onAdd?.(memory),
        setAddText(``),
        cancelAdd());
    },
    closeSearch = () => {
      (setSearchOpen(false),
        setQuery(``),
        window.requestAnimationFrame(() =>
          rootRef.current?.querySelector(`.ui-mp__search-open`)?.focus({
            preventScroll: true,
          }),
        ));
    },
    filterTabs = [null, ...allCategories.filter((e) => items.some((t) => t.category === e))],
    handleCategoryKeyDown = (event) => {
      if (![`ArrowRight`, `ArrowLeft`, `ArrowDown`, `ArrowUp`, `Home`, `End`].includes(event.key))
        return;
      event.preventDefault();
      let index = filterTabs.indexOf(category),
        nextIndex =
          event.key === `Home`
            ? 0
            : event.key === `End`
              ? filterTabs.length - 1
              : (index +
                  (event.key === `ArrowRight` || event.key === `ArrowDown` ? 1 : -1) +
                  filterTabs.length) %
                filterTabs.length;
      setCategory(filterTabs[nextIndex]);
      let buttons = event.currentTarget.querySelectorAll(`[role='radio']`);
      (buttons[nextIndex]?.focus(),
        buttons[nextIndex]?.scrollIntoView({
          block: `nearest`,
          inline: `nearest`,
        }));
    },
    footerContent = (
      <>
        <b>{totalCount}</b>
        {` `}
        {totalCount === 1 ? `memory` : `memories`}
        {(displayedPausedCount > 0 || pausedCount > 0) && (
          <>
            {` · `}
            {displayedPausedCount}
            {` paused`}
          </>
        )}
      </>
    ),
    footerId = `rest`;
  return (
    undo
      ? ((footerContent = (
          <>
            <span className={`ui-mp__forgot`}>
              <span className={`ui-mp__flat`}>{`Forgot “`}</span>
              <b className={`ui-mp__quote`}>{undo.memory.text}</b>
              <span className={`ui-mp__flat`}>{`”`}</span>
            </span>
          </>
        )),
        (footerId = `forgot-${undo.key}`))
      : editingId
        ? ((footerContent = `Enter to save · Esc to cancel`), (footerId = `editing`))
        : adding
          ? ((footerContent = `Pick a category · Enter to save`), (footerId = `adding`))
          : hotMemory
            ? ((footerContent = (
                <>
                  <b>{hotMemory.category}</b>
                  {` ·`}
                  {` `}
                  {isEnabled
                    ? hotMemory.paused
                      ? `paused, not used in answers`
                      : `used in answers`
                    : `memory is off`}
                </>
              )),
              (footerId = `hot-${hotMemory.id}-${+!!hotMemory.paused}-${+!!isEnabled}`))
            : isEnabled || ((footerContent = `Memory is off`), (footerId = `off`)),
    (
      <div
        ref={rootRef}
        className={[`ui-mp`, className].filter(Boolean).join(` `)}
        role={`group`}
        aria-labelledby={`${instanceId}-title`}
        data-off={isEnabled ? void 0 : ``}
        style={{
          "--ui-mp-max": `${maxHeight}px`,
        }}
      >
        <style href={`ui-memory-panel`} precedence={`default`}>
          {memoryPanelStyles}
        </style>
        <div className={`ui-mp__card`}>
          <div className={`ui-mp__head`}>
            <span id={`${instanceId}-title`} className={`ui-mp__title`}>
              {title}
            </span>
            <span className={`ui-mp__count`} aria-hidden={`true`}>
              {totalCount}
            </span>
            <button
              type={`button`}
              role={`switch`}
              aria-checked={isEnabled}
              aria-controls={`${instanceId}-note`}
              className={`ui-mp__switch`}
              onClick={() => setEnabled(!isEnabled)}
            >
              <span className={`ui-mp__switch-label`}>{`Use memory`}</span>
              <span className={`ui-mp__track`} aria-hidden={`true`}>
                <span className={`ui-mp__knob`} />
              </span>
            </button>
          </div>
          <div
            id={`${instanceId}-note`}
            className={`ui-mp__fold`}
            data-open={isEnabled ? void 0 : ``}
            inert={isEnabled}
          >
            <div className={`ui-mp__clip`}>
              <p className={`ui-mp__note`}>
                <InfoIcon />
                <span>{`The assistant won't use or save memories in new chats. Nothing here is deleted.`}</span>
              </p>
            </div>
          </div>
          <div className={`ui-mp__filters`} data-searching={searchOpen ? `` : void 0}>
            <div
              className={`ui-mp__chips`}
              role={`radiogroup`}
              aria-label={`Category`}
              inert={searchOpen}
              onKeyDown={handleCategoryKeyDown}
            >
              {filterTabs.map((e) => {
                let t = visibleItems.filter((t) => !e || t.category === e).length,
                  n = category === e;
                return (
                  <button
                    type={`button`}
                    role={`radio`}
                    aria-checked={n}
                    tabIndex={n ? 0 : -1}
                    className={`ui-mp__chip`}
                    data-linked={e && hotMemory?.category === e ? `` : void 0}
                    onClick={() => setCategory(e)}
                    key={e ?? `#all`}
                  >
                    {e ?? `All`}
                    <span className={`ui-mp__chip-count`}>{t}</span>
                  </button>
                );
              })}
            </div>
            <div className={`ui-mp__search`} inert={!searchOpen}>
              <SearchIcon />
              <input
                className={`ui-mp__input`}
                type={`text`}
                value={query}
                placeholder={`Search memories`}
                aria-label={`Search memories`}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  e.key === `Escape` && (e.stopPropagation(), closeSearch());
                }}
                ref={(e) => {
                  (e &&
                    searchOpen &&
                    document.activeElement !== e &&
                    !e.dataset.focused &&
                    ((e.dataset.focused = `1`),
                    e.focus({
                      preventScroll: true,
                    })),
                    e && !searchOpen && delete e.dataset.focused);
                }}
              />
              <button
                type={`button`}
                className={`ui-mp__icon`}
                aria-label={`Close search`}
                onClick={closeSearch}
              >
                <CloseIcon />
              </button>
            </div>
            <button
              type={`button`}
              className={`ui-mp__icon ui-mp__search-open`}
              aria-label={`Search memories`}
              aria-expanded={searchOpen}
              inert={searchOpen}
              onClick={() => {
                (setCategory(null), setSearchOpen(true));
              }}
            >
              <SearchIcon />
            </button>
          </div>
          <div ref={listRef} className={`ui-mp__list`} onPointerLeave={() => setHotId(null)}>
            {allCategories.map((e) => {
              let t = items.filter((t) => t.category === e);
              if (!t.length) return null;
              let n = t.some((e) => matches(e) && !leavingMap[e.id]);
              return (
                <section
                  className={`ui-mp__fold`}
                  data-open={n ? `` : void 0}
                  inert={!n}
                  aria-label={e}
                  key={e}
                >
                  <div className={`ui-mp__clip`}>
                    <h3 className={`ui-mp__group`}>{e}</h3>
                    <ul className={`ui-mp__items`}>
                      {t.map((e) => {
                        let t = editingId === e.id,
                          n = isVisible(e);
                        return (
                          <li
                            className={`ui-mp__fold ui-mp__fold--row`}
                            data-open={n ? `` : void 0}
                            data-leaving={leavingMap[e.id] ? `` : void 0}
                            inert={!n}
                            key={e.id}
                          >
                            <div className={`ui-mp__clip`}>
                              <div
                                className={`ui-mp__item`}
                                data-memory={e.id}
                                data-paused={e.paused ? `` : void 0}
                                data-hot={hotId === e.id ? `` : void 0}
                                data-editing={t ? `` : void 0}
                                onPointerEnter={(t) => t.pointerType === `mouse` && setHotId(e.id)}
                                onFocus={() => setHotId(e.id)}
                                onBlur={(e) => {
                                  e.currentTarget.contains(e.relatedTarget) || setHotId(null);
                                }}
                              >
                                {t ? (
                                  <textarea
                                    className={`ui-mp__edit`}
                                    value={editText}
                                    rows={1}
                                    aria-label={`Edit memory`}
                                    ref={(e) => {
                                      (autosizeTextarea(e),
                                        e &&
                                          !e.dataset.focused &&
                                          ((e.dataset.focused = `1`),
                                          e.focus({
                                            preventScroll: true,
                                          }),
                                          e.setSelectionRange(e.value.length, e.value.length)));
                                    }}
                                    onChange={(e) => {
                                      (setEditText(e.target.value), autosizeTextarea(e.target));
                                    }}
                                    onKeyDown={(e) => {
                                      e.key === `Enter` && !e.shiftKey
                                        ? (e.preventDefault(), saveEdit())
                                        : e.key === `Escape` && (e.stopPropagation(), cancelEdit());
                                    }}
                                  />
                                ) : (
                                  <p className={`ui-mp__text`}>{e.text}</p>
                                )}
                                <div className={`ui-mp__meta`}>
                                  <span className={`ui-mp__source`}>
                                    {[e.source, e.date].filter(Boolean).join(` · `)}
                                  </span>
                                  <span
                                    className={`ui-mp__tag`}
                                    data-on={e.paused ? `` : void 0}
                                    aria-hidden={!e.paused}
                                  >{`Paused`}</span>
                                  {t ? (
                                    <span className={`ui-mp__acts ui-mp__acts--edit`}>
                                      <button
                                        type={`button`}
                                        className={`ui-mp__text-btn`}
                                        onClick={cancelEdit}
                                      >{`Cancel`}</button>
                                      <button
                                        type={`button`}
                                        className={`ui-mp__text-btn ui-mp__text-btn--main`}
                                        onClick={saveEdit}
                                      >{`Save`}</button>
                                    </span>
                                  ) : (
                                    <span className={`ui-mp__acts`}>
                                      <button
                                        type={`button`}
                                        className={`ui-mp__icon`}
                                        data-act={`edit`}
                                        aria-label={`Edit “${e.text}”`}
                                        title={`Edit`}
                                        onClick={() => startEdit(e)}
                                      >
                                        <EditIcon />
                                      </button>
                                      <button
                                        type={`button`}
                                        className={`ui-mp__icon`}
                                        data-act={`pause`}
                                        aria-label={`${e.paused ? `Resume` : `Pause`} “${e.text}”`}
                                        title={e.paused ? `Resume` : `Pause`}
                                        onClick={() => togglePaused(e)}
                                      >
                                        <span
                                          className={`ui-mp__icon-swap`}
                                          key={e.paused ? `play` : `pause`}
                                        >
                                          {e.paused ? <PlayIcon /> : <PauseIcon />}
                                        </span>
                                      </button>
                                      <button
                                        type={`button`}
                                        className={`ui-mp__icon ui-mp__icon--forget`}
                                        data-act={`forget`}
                                        aria-label={`Forget “${e.text}”`}
                                        title={`Forget`}
                                        onClick={() => forgetMemory(e)}
                                      >
                                        <ForgetIcon />
                                      </button>
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </section>
              );
            })}
            <div className={`ui-mp__fold`} data-open={hasMatches ? void 0 : ``} inert={hasMatches}>
              <div className={`ui-mp__clip`}>
                <p className={`ui-mp__empty`}>
                  {items.length === 0
                    ? `Nothing remembered yet`
                    : normalizedQuery
                      ? `No memory mentions “${query.trim()}”`
                      : `No memories here`}
                </p>
              </div>
            </div>
          </div>
          <div className={`ui-mp__bottom`}>
            <div className={`ui-mp__fold`} data-open={adding ? void 0 : ``} inert={adding}>
              <div className={`ui-mp__clip`}>
                <button
                  type={`button`}
                  className={`ui-mp__add`}
                  aria-expanded={adding}
                  aria-controls={`${instanceId}-new`}
                  onClick={startAdd}
                >
                  <AddIcon />
                  {`New memory`}
                </button>
              </div>
            </div>
            <div
              id={`${instanceId}-new`}
              className={`ui-mp__fold`}
              data-open={adding ? `` : void 0}
              inert={!adding}
            >
              <div className={`ui-mp__clip`}>
                <div className={`ui-mp__new`}>
                  <textarea
                    className={`ui-mp__edit ui-mp__edit--new`}
                    value={addText}
                    rows={1}
                    placeholder={`Something the assistant should remember…`}
                    aria-label={`New memory`}
                    ref={(e) => {
                      (autosizeTextarea(e),
                        e &&
                          adding &&
                          !e.dataset.focused &&
                          ((e.dataset.focused = `1`),
                          e.focus({
                            preventScroll: true,
                          })),
                        e && !adding && delete e.dataset.focused);
                    }}
                    onChange={(e) => {
                      (setAddText(e.target.value), autosizeTextarea(e.target));
                    }}
                    onKeyDown={(e) => {
                      e.key === `Enter` && !e.shiftKey
                        ? (e.preventDefault(), saveAdd())
                        : e.key === `Escape` && (e.stopPropagation(), cancelAdd());
                    }}
                  />
                  <div className={`ui-mp__new-row`}>
                    <div
                      className={`ui-mp__cats`}
                      role={`radiogroup`}
                      aria-label={`Category of the new memory`}
                      onKeyDown={(e) => {
                        let t = allCategories.length ? allCategories : [`General`];
                        if (![`ArrowRight`, `ArrowLeft`, `ArrowDown`, `ArrowUp`].includes(e.key))
                          return;
                        e.preventDefault();
                        let n =
                          (t.indexOf(newCategory) +
                            (e.key === `ArrowRight` || e.key === `ArrowDown` ? 1 : -1) +
                            t.length) %
                          t.length;
                        (setAddCategory(t[n]),
                          e.currentTarget.querySelectorAll(`[role='radio']`)[n]?.focus());
                      }}
                    >
                      {(allCategories.length ? allCategories : [`General`]).map((e) => (
                        <button
                          type={`button`}
                          role={`radio`}
                          aria-checked={newCategory === e}
                          tabIndex={newCategory === e ? 0 : -1}
                          className={`ui-mp__cat`}
                          onClick={() => setAddCategory(e)}
                          key={e}
                        >
                          {e}
                        </button>
                      ))}
                    </div>
                    <span className={`ui-mp__acts ui-mp__acts--edit`}>
                      <button
                        type={`button`}
                        className={`ui-mp__text-btn`}
                        onClick={cancelAdd}
                      >{`Cancel`}</button>
                      <button
                        type={`button`}
                        className={`ui-mp__text-btn ui-mp__text-btn--main`}
                        disabled={!addText.trim()}
                        onClick={saveAdd}
                      >{`Save`}</button>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={`ui-mp__foot`}>
          <span className={`ui-mp__caption`} aria-live={`polite`}>
            <SwapText id={footerId}>{footerContent}</SwapText>
          </span>
          {undo ? (
            <button
              type={`button`}
              className={`ui-mp__action ui-mp__action--undo`}
              onClick={restoreMemory}
              key={`undo-${undo.key}`}
            >
              <UndoIcon />
              {`Undo`}
            </button>
          ) : (
            action && (
              <button
                type={`button`}
                className={`ui-mp__action`}
                onClick={action.onClick}
                key={`action`}
              >
                {action.label}
                <ArrowIcon />
              </button>
            )
          )}
        </div>
      </div>
    )
  );
}
var memoryPanelStyles = `
.ui-mp {
  --ui-mp-tray: #f0f0f0;
  --ui-mp-card: #ffffff;
  --ui-mp-line: #ececec;
  --ui-mp-ink: #171717;
  --ui-mp-text: #404040;
  --ui-mp-muted: #8f8f8f;
  --ui-mp-well: #f4f4f5;
  --ui-mp-hover: #ececee;
  --ui-mp-track: #dcdce0;
  --ui-mp-accent: #2f6bff;
  --ui-mp-red: #b42318;
  --ui-mp-red-bg: rgba(229, 72, 77, 0.1);
  --ui-mp-tag: #5f5f66;
  --ui-mp-tag-bg: rgba(110, 110, 120, 0.1);
  --ui-mp-focus: rgba(23, 23, 23, 0.22);
  --ui-mp-ease: cubic-bezier(0.32, 0.72, 0.24, 1);
  box-sizing: border-box;
  width: 100%;
  max-width: 380px;
  min-width: 0;
  container-type: inline-size;
  padding: 4px;
  border-radius: 20px;
  background: var(--ui-mp-tray);
  font-family: "Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  font-size: 13px;
  line-height: 20px;
  color: var(--ui-mp-text);
  text-align: left;
  -webkit-font-smoothing: antialiased;
}
.ui-mp *, .ui-mp *::before, .ui-mp *::after { box-sizing: border-box; }
:where(.ui-mp) button { margin: 0; padding: 0; border: 0; background: none; font: inherit; color: inherit; text-align: inherit; cursor: pointer; -webkit-tap-highlight-color: transparent; }
:where(.ui-mp) :is(p, h3, ul) { margin: 0; padding: 0; list-style: none; font: inherit; }
.ui-mp :is(button, input, textarea):focus-visible { outline: 2px solid var(--ui-mp-focus); outline-offset: 2px; }
.ui-mp svg { display: block; flex: none; }
.ui-mp b { font-weight: 500; color: var(--ui-mp-ink); }

.ui-mp__card { border-radius: 16px; background: var(--ui-mp-card); box-shadow: 0 0 0 1px var(--ui-mp-line), 0 1px 2px rgba(0, 0, 0, 0.04); }

/* Everything that opens or goes does it the same quiet way: it unfolds or folds and fades, nothing travels */
.ui-mp__fold { display: grid; grid-template-rows: 0fr; opacity: 0; transition: grid-template-rows 420ms var(--ui-mp-ease), opacity 220ms ease; }
.ui-mp__fold[data-open] { grid-template-rows: 1fr; opacity: 1; transition: grid-template-rows 420ms var(--ui-mp-ease), opacity 320ms ease 80ms; }
.ui-mp__fold--row[data-leaving] { transition: grid-template-rows 320ms var(--ui-mp-ease), opacity 200ms ease, filter 200ms ease; filter: blur(2px); }
.ui-mp__clip { min-height: 0; overflow: hidden; }

/* ----- Head ----- */
.ui-mp__head { display: flex; align-items: center; gap: 8px; height: 48px; padding: 0 12px 0 14px; }
.ui-mp__title { min-width: 0; overflow: hidden; font-size: 13.5px; font-weight: 600; color: var(--ui-mp-ink); white-space: nowrap; text-overflow: ellipsis; }
.ui-mp__count { flex: none; min-width: 20px; height: 20px; padding: 0 6px; border-radius: 5px; background: var(--ui-mp-well); font-size: 12px; font-weight: 500; line-height: 20px; text-align: center; color: var(--ui-mp-muted); font-variant-numeric: tabular-nums; }
.ui-mp__switch { display: inline-flex; flex: none; align-items: center; gap: 8px; height: 28px; margin-left: auto; padding: 0 2px 0 8px; border-radius: 8px; font-size: 12.5px; color: var(--ui-mp-text); transition: background-color 160ms ease; }
.ui-mp__switch:hover { background: var(--ui-mp-well); }
.ui-mp__track { position: relative; width: 28px; height: 16px; border-radius: 8px; background: var(--ui-mp-track); transition: background-color 240ms ease; }
.ui-mp__knob { position: absolute; top: 2px; left: 2px; width: 12px; height: 12px; border-radius: 50%; background: #fff; box-shadow: 0 1px 2px rgba(0, 0, 0, 0.18); transition: transform 280ms var(--ui-mp-ease); }
.ui-mp__switch[aria-checked="true"] .ui-mp__track { background: var(--ui-mp-ink); }
.ui-mp__switch[aria-checked="true"] .ui-mp__knob { transform: translateX(12px); }

.ui-mp__note { display: flex; gap: 8px; margin: 0 12px 10px !important; padding: 8px 10px; border-radius: 10px; background: var(--ui-mp-well); font-size: 12.5px; line-height: 18px; color: var(--ui-mp-text); }
.ui-mp__note svg { margin-top: 2px; color: var(--ui-mp-muted); }

/* ----- Filters ----- */
.ui-mp__filters { position: relative; display: grid; grid-template-columns: minmax(0, 1fr) auto; align-items: center; gap: 4px; padding: 0 10px 10px 12px; }
.ui-mp__chips, .ui-mp__search { grid-area: 1 / 1; transition: opacity 220ms ease, filter 220ms ease; }
.ui-mp__chips { display: flex; gap: 4px; min-width: 0; margin: -2px -4px; padding: 2px 4px; overflow-x: auto; scrollbar-width: none; mask-image: linear-gradient(90deg, #000 calc(100% - 14px), transparent); }
.ui-mp__chips::-webkit-scrollbar { display: none; }
.ui-mp__chip { display: inline-flex; flex: none; align-items: center; gap: 5px; height: 26px; padding: 0 8px; border-radius: 8px; font-size: 12.5px; color: var(--ui-mp-text); white-space: nowrap; transition: background-color 160ms ease, color 160ms ease, box-shadow 160ms ease; }
.ui-mp__chip:hover { background: var(--ui-mp-well); }
.ui-mp__chip[data-linked] { color: var(--ui-mp-ink); }
.ui-mp__chip[data-linked]:not([aria-checked="true"]) { background: var(--ui-mp-well); }
.ui-mp__chip[aria-checked="true"] { background: var(--ui-mp-well); color: var(--ui-mp-ink); box-shadow: inset 0 0 0 1px var(--ui-mp-line); }
.ui-mp__chip-count { font-size: 11.5px; color: var(--ui-mp-muted); font-variant-numeric: tabular-nums; }
.ui-mp__search { display: flex; align-items: center; gap: 6px; height: 28px; padding: 0 2px 0 8px; border-radius: 8px; background: var(--ui-mp-well); color: var(--ui-mp-muted); opacity: 0; visibility: hidden; }
.ui-mp__input { flex: 1; min-width: 0; height: 28px; margin: 0; padding: 0; border: 0; background: none; font: inherit; font-size: 12.5px; color: var(--ui-mp-ink); outline: none; }
.ui-mp__input::placeholder { color: var(--ui-mp-muted); }
.ui-mp__search .ui-mp__icon { width: 24px; height: 24px; }
.ui-mp__filters[data-searching] .ui-mp__chips { opacity: 0; filter: blur(2px); }
.ui-mp__filters[data-searching] .ui-mp__search { grid-area: 1 / 1 / 2 / 3; opacity: 1; visibility: visible; }
.ui-mp__filters[data-searching] .ui-mp__search-open { opacity: 0; visibility: hidden; }
.ui-mp__search-open { grid-area: 1 / 2; transition: opacity 200ms ease, background-color 160ms ease, color 160ms ease; }

/* ----- List ----- */
.ui-mp__list { max-height: var(--ui-mp-max); padding: 2px 6px 6px; overflow-y: auto; overscroll-behavior: contain; scrollbar-width: thin; scrollbar-color: var(--ui-mp-track) transparent; border-top: 1px solid var(--ui-mp-line); transition: opacity 300ms ease; }
.ui-mp[data-off] .ui-mp__list, .ui-mp[data-off] .ui-mp__filters { opacity: 0.5; }
.ui-mp[data-off] .ui-mp__list:hover, .ui-mp[data-off] .ui-mp__list:focus-within { opacity: 0.85; }
.ui-mp__filters { transition: opacity 300ms ease; }
.ui-mp__group { padding: 10px 8px 2px; font-size: 12px !important; font-weight: 500 !important; line-height: 18px !important; color: var(--ui-mp-muted); }
.ui-mp__item { padding: 6px 8px 5px; border-radius: 10px; transition: background-color 160ms ease, opacity 220ms ease; }
.ui-mp__item[data-hot], .ui-mp__item[data-editing] { background: var(--ui-mp-well); }
.ui-mp__text { color: var(--ui-mp-ink); overflow-wrap: anywhere; transition: color 240ms ease; }
.ui-mp__item[data-paused] .ui-mp__text { color: var(--ui-mp-muted); }
.ui-mp__meta { display: flex; align-items: center; gap: 6px; min-height: 24px; font-size: 12px; color: var(--ui-mp-muted); }
.ui-mp__source { min-width: 0; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }
.ui-mp__tag { display: inline-flex; flex: none; align-items: center; height: 18px; padding: 0 6px; border-radius: 5px; background: var(--ui-mp-tag-bg); font-size: 11.5px; font-weight: 500; color: var(--ui-mp-tag); opacity: 0; transform: scale(0.9); transition: opacity 220ms ease, transform 280ms var(--ui-mp-ease); }
.ui-mp__tag:not([data-on]) { position: absolute; visibility: hidden; }
.ui-mp__tag[data-on] { opacity: 1; transform: none; animation: ui-mp-in 280ms var(--ui-mp-ease) both; }
.ui-mp__acts { display: inline-flex; flex: none; align-items: center; gap: 2px; margin: -1px -4px -1px auto; opacity: 0; transition: opacity 180ms ease; }
.ui-mp__item:is([data-hot], :focus-within) .ui-mp__acts, .ui-mp__acts--edit { opacity: 1; }
.ui-mp__icon { display: grid; flex: none; place-items: center; width: 26px; height: 26px; border-radius: 8px; color: var(--ui-mp-muted); transition: background-color 160ms ease, color 160ms ease, opacity 200ms ease; }
.ui-mp__icon:hover { background: var(--ui-mp-hover); color: var(--ui-mp-ink); }
.ui-mp__icon--forget:hover { background: var(--ui-mp-red-bg); color: var(--ui-mp-red); }
.ui-mp__icon-swap { display: grid; animation: ui-mp-in 260ms ease both; }
.ui-mp__text-btn { display: inline-flex; align-items: center; height: 26px; padding: 0 9px; border-radius: 8px; font-size: 12.5px; font-weight: 500; color: var(--ui-mp-text); transition: background-color 160ms ease, color 160ms ease, opacity 160ms ease; }
.ui-mp__text-btn:hover { background: var(--ui-mp-hover); color: var(--ui-mp-ink); }
.ui-mp__text-btn--main { background: var(--ui-mp-ink); color: var(--ui-mp-card); }
.ui-mp__text-btn--main:hover { background: var(--ui-mp-ink); color: var(--ui-mp-card); opacity: 0.86; }
.ui-mp__text-btn:disabled { cursor: default; opacity: 0.35; }
.ui-mp__edit { display: block; width: 100%; min-height: 20px; margin: 0; padding: 0; border: 0; background: none; font: inherit; color: var(--ui-mp-ink); resize: none; overflow: hidden; outline: none; }
.ui-mp__edit::placeholder { color: var(--ui-mp-muted); }
.ui-mp__item .ui-mp__edit:focus-visible { outline: none; }
.ui-mp__empty { padding: 18px 8px 12px; font-size: 12.5px; text-align: center; color: var(--ui-mp-muted); }

/* ----- New memory ----- */
.ui-mp__bottom { padding: 4px 6px 6px; border-top: 1px solid var(--ui-mp-line); }
.ui-mp__add { display: flex; align-items: center; gap: 8px; width: 100%; height: 32px; padding: 0 8px; border-radius: 10px; font-size: 13px; color: var(--ui-mp-muted); transition: background-color 160ms ease, color 160ms ease; }
.ui-mp__add:hover { background: var(--ui-mp-well); color: var(--ui-mp-ink); }
.ui-mp__new { margin: 2px 0 0; padding: 8px 8px 6px; border-radius: 10px; background: var(--ui-mp-well); }
.ui-mp__new-row { display: flex; flex-wrap: wrap; align-items: center; justify-content: flex-end; gap: 6px; margin-top: 8px; }
.ui-mp__cats { display: flex; flex: 1 1 auto; flex-wrap: wrap; gap: 4px; min-width: 0; }
.ui-mp__cat { display: inline-flex; align-items: center; height: 24px; padding: 0 8px; border-radius: 6px; font-size: 12px; color: var(--ui-mp-muted); transition: background-color 160ms ease, color 160ms ease, box-shadow 160ms ease; }
.ui-mp__cat:hover { color: var(--ui-mp-ink); }
.ui-mp__cat[aria-checked="true"] { background: var(--ui-mp-card); color: var(--ui-mp-ink); box-shadow: 0 0 0 1px var(--ui-mp-line), 0 1px 2px rgba(0, 0, 0, 0.04); }

/* ----- Tray ----- */
.ui-mp__foot { display: flex; align-items: center; gap: 8px; min-height: 38px; padding: 4px 4px 0 10px; }
.ui-mp__caption { flex: 1; min-width: 0; overflow: hidden; font-size: 12.5px; color: var(--ui-mp-muted); white-space: nowrap; font-variant-numeric: tabular-nums; }
.ui-mp__swap { display: grid; min-width: 0; }
.ui-mp__swap-item { grid-area: 1 / 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; animation: ui-mp-swap-in 320ms ease both; }
.ui-mp__swap-item[data-out] { animation: ui-mp-swap-out 220ms ease both; }
.ui-mp__forgot { display: flex; min-width: 0; }
.ui-mp__flat { flex: none; white-space: pre; }
.ui-mp__quote { min-width: 0; overflow: hidden; text-overflow: ellipsis; }
.ui-mp__action { display: inline-flex; flex: none; align-items: center; gap: 5px; height: 26px; padding: 0 8px; border-radius: 10px; font-size: 12.5px; font-weight: 500; color: var(--ui-mp-text); white-space: nowrap; animation: ui-mp-swap-in 300ms ease both; transition: background-color 160ms ease, color 160ms ease; }
.ui-mp__action:hover { background: var(--ui-mp-card); color: var(--ui-mp-ink); }
.ui-mp__action--undo { padding: 0 9px 0 7px; background: var(--ui-mp-card); color: var(--ui-mp-ink); box-shadow: 0 0 0 1px var(--ui-mp-line), 0 1px 2px rgba(0, 0, 0, 0.04); }
.ui-mp__action:not(.ui-mp__action--undo) svg { transition: transform 220ms var(--ui-mp-ease); }
.ui-mp__action:not(.ui-mp__action--undo):hover svg { transform: translateX(2px); }

@keyframes ui-mp-in { from { opacity: 0; transform: scale(0.9); } }
@keyframes ui-mp-swap-in { from { opacity: 0; filter: blur(2px); } }
@keyframes ui-mp-swap-out { from { opacity: 1; } to { opacity: 0; filter: blur(2px); } }

/* Narrow panels: chips drop their counts and the switch keeps only its track, so the filters fit */
@container (max-width: 340px) {
  .ui-mp__chip-count { display: none; }
  .ui-mp__chip { padding: 0 7px; }
}
@container (max-width: 320px) {
  .ui-mp__switch-label { display: none; }
  .ui-mp__switch { padding: 0 2px; }
}

@media (pointer: coarse) {
  .ui-mp__acts { opacity: 1; }
  .ui-mp__icon { width: 32px; height: 32px; }
  .ui-mp__meta { min-height: 32px; }
  .ui-mp__chip, .ui-mp__text-btn { height: 32px; }
  .ui-mp__cat { height: 30px; }
  .ui-mp__switch, .ui-mp__add { height: 36px; }
  .ui-mp__action { height: 30px; }
}

@media (prefers-reduced-motion: reduce) {
  .ui-mp *, .ui-mp *::before, .ui-mp *::after { animation: none !important; transition: none !important; }
}

/* Dark mode: follows a .dark class or data-theme="dark" on any ancestor, e.g. <html> */
:where(.dark, [data-theme="dark"]) .ui-mp {
  --ui-mp-tray: #111113;
  --ui-mp-card: #19191b;
  --ui-mp-line: #2a2a2e;
  --ui-mp-ink: #ededed;
  --ui-mp-text: #c8c8cc;
  --ui-mp-muted: #8b8b92;
  --ui-mp-well: #222225;
  --ui-mp-hover: #2c2c30;
  --ui-mp-track: #3a3a40;
  --ui-mp-red: #ff9b93;
  --ui-mp-red-bg: rgba(229, 72, 77, 0.16);
  --ui-mp-tag: #b4b4bb;
  --ui-mp-tag-bg: rgba(160, 160, 170, 0.14);
  --ui-mp-focus: rgba(255, 255, 255, 0.3);
}
:where(.dark, [data-theme="dark"]) .ui-mp__knob { background: #19191b; }
:where(.dark, [data-theme="dark"]) .ui-mp__switch[aria-checked="false"] .ui-mp__knob { background: #8b8b92; }
`;
var demoMemories = [
  {
    id: `ts`,
    text: `Prefers TypeScript examples over plain JavaScript`,
    category: `Preferences`,
    source: `From chat`,
    date: `Oct 12`,
  },
  {
    id: `short`,
    text: `Likes short answers first, details only when asked`,
    category: `Preferences`,
    source: `You added`,
    date: `Oct 2`,
  },
  {
    id: `inter`,
    text: `Designs with Inter and a 4px spacing grid`,
    category: `Preferences`,
    source: `From Figma`,
    date: `Oct 7`,
  },
  {
    id: `role`,
    text: `Product designer and front-end developer at a small studio`,
    category: `Work`,
    source: `From chat`,
    date: `Sep 28`,
  },
  {
    id: `stack`,
    text: `Ships with React, Vite and Tailwind; deploys on Vercel`,
    category: `Work`,
    source: `From chat`,
    date: `Oct 3`,
  },
  {
    id: `notes`,
    text: `Sends release notes to clients every Friday`,
    category: `Work`,
    source: `From chat`,
    date: `Oct 9`,
  },
  {
    id: `fintech`,
    text: `Redesigning the onboarding flow for a fintech client, due Oct 24`,
    category: `Projects`,
    source: `From chat`,
    date: `Oct 11`,
  },
  {
    id: `tokens`,
    text: `Keeps design tokens in one tokens.json shared with the code`,
    category: `Projects`,
    source: `From chat`,
    date: `Oct 5`,
  },
];
function MemoryPanelDemo() {
  let rootRef = React.useRef(null),
    pausedRef = React.useRef(false);
  React.useEffect(() => {
    let n = (t) => () => rootRef.current?.querySelector(t)?.click(),
      r = (e, t) => n(`[data-memory="${e}"] [data-act="${t}"]`),
      i = (e) => n(`.ui-mp__chip:nth-child(${e})`),
      a = [
        [700, r(`short`, `pause`)],
        [2700, r(`ts`, `forget`)],
        [2600, n(`.ui-mp__action--undo`)],
        [2200, i(4)],
        [2400, i(1)],
        [1800, r(`short`, `pause`)],
      ],
      o = 0,
      s = 0,
      c = () => {
        pausedRef.current ||
          (o >= a.length && ((o = 0), (a[0][0] = 1800)),
          (s = window.setTimeout(() => {
            pausedRef.current || (a[o][1](), o++, c());
          }, a[o][0])));
      };
    return (c(), () => window.clearTimeout(s));
  }, []);
  let pause = () => (pausedRef.current = true);
  return (
    <div
      ref={rootRef}
      className={`mp-demo`}
      onPointerEnter={pause}
      onPointerDownCapture={pause}
      onKeyDownCapture={pause}
      onFocusCapture={pause}
    >
      <MemoryPanel memories={demoMemories} maxHeight={330} />
    </div>
  );
}
export default MemoryPanelDemo;
export { MemoryPanel as PlicoCore_le };
export { MemoryPanelDemo as PlicoDemo_fe };

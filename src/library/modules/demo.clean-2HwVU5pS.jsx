"use client";

import * as React from "react";
import * as JSXRuntime from "react/jsx-runtime";
var cleanEaseOutQuart = (progress) => 1 - (1 - progress) ** 4;
var prefersReducedMotion = () =>
  typeof window < `u` && window.matchMedia(`(prefers-reduced-motion: reduce)`).matches;
var delay = (e) => new Promise((t) => window.setTimeout(t, e));
var cleanTodayLabel = () =>
  new Date().toLocaleDateString(`en-US`, {
    month: `short`,
    day: `numeric`,
  });
var createCleanMemoryId = () =>
  `m-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
var autosizeCleanTextarea = (textarea) => {
  textarea &&
    ((textarea.style.height = `auto`), (textarea.style.height = `${textarea.scrollHeight}px`));
};
function useAnimatedCountsClean(targets, duration) {
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
            d = cleanEaseOutQuart(c),
            f = {};
          for (let t in e) f[t] = (n[t] ?? e[t]) + (e[t] - (n[t] ?? e[t])) * d;
          ((currentRef.current = f), setValues(f), c < 1 && (l = requestAnimationFrame(u)));
        };
      return ((l = requestAnimationFrame(u)), () => cancelAnimationFrame(l));
    }, [signature, duration]),
    values
  );
}
function useRightOverflow(scrollRef) {
  let [overflowing, setOverflowing] = React.useState(false);
  return (
    React.useEffect(() => {
      let t = scrollRef.current;
      if (!t) return;
      let n = () => setOverflowing(t.scrollLeft + t.clientWidth < t.scrollWidth - 1);
      n();
      let i = new ResizeObserver(n);
      i.observe(t);
      let a = new MutationObserver(n);
      return (
        a.observe(t, {
          childList: true,
          subtree: true,
          characterData: true,
        }),
        t.addEventListener(`scroll`, n, {
          passive: true,
        }),
        () => {
          (i.disconnect(), a.disconnect(), t.removeEventListener(`scroll`, n));
        }
      );
    }, [scrollRef]),
    overflowing
  );
}
function CleanSwapText({ id: id, children: children }) {
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
      <span className={`ui-mpc__swap`}>
        {leaving && (
          <span
            className={`ui-mpc__swap-item`}
            data-out={``}
            aria-hidden={`true`}
            key={`out-${leaving.id}`}
          >
            {leaving.node}
          </span>
        )}
        <span className={`ui-mpc__swap-item`} key={id}>
          {children}
        </span>
      </span>
    )
  );
}
var CleanIcon = ({ d: path, solid: solid }) => (
  <svg
    viewBox={`0 0 16 16`}
    className={`ui-mpc__glyph`}
    data-solid={solid || void 0}
    aria-hidden={`true`}
  >
    <path d={path} fillRule={`evenodd`} />
  </svg>
);
var CleanEditIcon = () => (
  <CleanIcon
    d={`M9.8 3.7l2.5 2.5M3 13l.6-3 6.9-6.9a1.4 1.4 0 0 1 2 0l.4.4a1.4 1.4 0 0 1 0 2L6 12.4 3 13Z`}
  />
);
var CleanPauseIcon = () => (
  <CleanIcon
    solid={true}
    d={`M4.5 3.5a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-9Zm4 0a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-9Z`}
  />
);
var CleanPlayIcon = () => (
  <CleanIcon
    solid={true}
    d={`M4.5 3.4v9.2a.9.9 0 0 0 1.37.77l7.4-4.6a.9.9 0 0 0 0-1.54l-7.4-4.6a.9.9 0 0 0-1.37.77Z`}
  />
);
var CleanForgetIcon = () => (
  <CleanIcon
    d={`M2.5 4.5h11M6.5 4.5V3.2a.7.7 0 0 1 .7-.7h1.6a.7.7 0 0 1 .7.7v1.3M4 4.5l.6 8a1.1 1.1 0 0 0 1.1 1h4.6a1.1 1.1 0 0 0 1.1-1l.6-8M6.8 7.2v3.6M9.2 7.2v3.6`}
  />
);
var CleanUndoIcon = () => <CleanIcon d={`M5.5 3.5 3 6l2.5 2.5M3.2 6h6.3a3.5 3.5 0 0 1 0 7H7`} />;
var CleanAddIcon = () => <CleanIcon d={`M8 3.5v9M3.5 8h9`} />;
var CleanSearchIcon = () => (
  <CleanIcon d={`M7.2 11.9a4.7 4.7 0 1 0 0-9.4 4.7 4.7 0 0 0 0 9.4ZM10.6 10.6l2.9 2.9`} />
);
var CleanCloseIcon = () => <CleanIcon d={`m4.5 4.5 7 7m0-7-7 7`} />;
var CleanInfoIcon = () => (
  <CleanIcon
    solid={true}
    d={`M8 1.5a6.5 6.5 0 1 1 0 13 6.5 6.5 0 0 1 0-13Zm0 5.4a.6.6 0 0 0-.6.6v3.6a.6.6 0 0 0 1.2 0V7.5a.6.6 0 0 0-.6-.6Zm0-2.3a.8.8 0 1 0 0 1.6.8.8 0 0 0 0-1.6Z`}
  />
);
var CleanArrowIcon = () => <CleanIcon d={`M3.5 8h9M9 4.5 12.5 8 9 11.5`} />;
function MemoryPanelClean({
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
    filterScrollRef = React.useRef(null),
    addScrollRef = React.useRef(null),
    filterOverflow = useRightOverflow(filterScrollRef),
    addOverflow = useRightOverflow(addScrollRef),
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
    animatedCounts = useAnimatedCountsClean(
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
          rootRef.current?.querySelector(`.ui-mpc__add`)?.focus({
            preventScroll: true,
          }),
        ));
    },
    saveAdd = () => {
      let text = addText.trim().replace(/\s+/g, ` `);
      if (!text) return;
      let memory = {
        id: createCleanMemoryId(),
        text: text,
        category: newCategory,
        source: addedSource,
        date: cleanTodayLabel(),
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
          rootRef.current?.querySelector(`.ui-mpc__search-open`)?.focus({
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
            <span className={`ui-mpc__forgot`}>
              <span className={`ui-mpc__flat`}>{`Forgot “`}</span>
              <b className={`ui-mpc__quote`}>{undo.memory.text}</b>
              <span className={`ui-mpc__flat`}>{`”`}</span>
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
        className={[`ui-mpc`, className].filter(Boolean).join(` `)}
        role={`group`}
        aria-labelledby={`${instanceId}-title`}
        data-off={isEnabled ? void 0 : ``}
        style={{
          "--ui-mpc-max": `${maxHeight}px`,
        }}
      >
        <style href={`ui-memory-panel-clean`} precedence={`default`}>
          {memoryPanelCleanStyles}
        </style>
        <div className={`ui-mpc__card`}>
          <div className={`ui-mpc__head`}>
            <span id={`${instanceId}-title`} className={`ui-mpc__title`}>
              {title}
            </span>
            <span className={`ui-mpc__count`} aria-hidden={`true`}>
              {totalCount}
            </span>
            <button
              type={`button`}
              role={`switch`}
              aria-checked={isEnabled}
              aria-controls={`${instanceId}-note`}
              className={`ui-mpc__switch`}
              onClick={() => setEnabled(!isEnabled)}
            >
              <span className={`ui-mpc__switch-label`}>{`Use memory`}</span>
              <span className={`ui-mpc__track`} aria-hidden={`true`}>
                <span className={`ui-mpc__knob`} />
              </span>
            </button>
          </div>
          <div
            id={`${instanceId}-note`}
            className={`ui-mpc__fold`}
            data-open={isEnabled ? void 0 : ``}
            inert={isEnabled}
          >
            <div className={`ui-mpc__clip`}>
              <p className={`ui-mpc__note`}>
                <CleanInfoIcon />
                <span>{`The assistant won't use or save memories in new chats. Nothing here is deleted.`}</span>
              </p>
            </div>
          </div>
          <div className={`ui-mpc__filters`} data-searching={searchOpen ? `` : void 0}>
            <div
              ref={filterScrollRef}
              className={`ui-mpc__chips`}
              data-more={filterOverflow ? `` : void 0}
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
                    className={`ui-mpc__chip`}
                    data-linked={e && hotMemory?.category === e ? `` : void 0}
                    onClick={() => setCategory(e)}
                    key={e ?? `#all`}
                  >
                    {e ?? `All`}
                    <span className={`ui-mpc__chip-count`}>{t}</span>
                  </button>
                );
              })}
            </div>
            <div className={`ui-mpc__search`} inert={!searchOpen}>
              <CleanSearchIcon />
              <input
                className={`ui-mpc__input`}
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
                className={`ui-mpc__icon`}
                aria-label={`Close search`}
                onClick={closeSearch}
              >
                <CleanCloseIcon />
              </button>
            </div>
            <button
              type={`button`}
              className={`ui-mpc__icon ui-mpc__search-open`}
              aria-label={`Search memories`}
              aria-expanded={searchOpen}
              inert={searchOpen}
              onClick={() => {
                (setCategory(null), setSearchOpen(true));
              }}
            >
              <CleanSearchIcon />
            </button>
          </div>
          <div ref={listRef} className={`ui-mpc__list`} onPointerLeave={() => setHotId(null)}>
            {allCategories.map((e) => {
              let t = items.filter((t) => t.category === e);
              if (!t.length) return null;
              let n = t.some((e) => matches(e) && !leavingMap[e.id]);
              return (
                <section
                  className={`ui-mpc__fold`}
                  data-open={n ? `` : void 0}
                  inert={!n}
                  aria-label={e}
                  key={e}
                >
                  <div className={`ui-mpc__clip`}>
                    <h3 className={`ui-mpc__group`}>{e}</h3>
                    <ul className={`ui-mpc__items`}>
                      {t.map((e) => {
                        let t = editingId === e.id,
                          n = isVisible(e);
                        return (
                          <li
                            className={`ui-mpc__fold ui-mpc__fold--row`}
                            data-open={n ? `` : void 0}
                            data-leaving={leavingMap[e.id] ? `` : void 0}
                            inert={!n}
                            key={e.id}
                          >
                            <div className={`ui-mpc__clip`}>
                              <div
                                className={`ui-mpc__item`}
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
                                    className={`ui-mpc__edit`}
                                    value={editText}
                                    rows={1}
                                    aria-label={`Edit memory`}
                                    ref={(e) => {
                                      (autosizeCleanTextarea(e),
                                        e &&
                                          !e.dataset.focused &&
                                          ((e.dataset.focused = `1`),
                                          e.focus({
                                            preventScroll: true,
                                          }),
                                          e.setSelectionRange(e.value.length, e.value.length)));
                                    }}
                                    onChange={(e) => {
                                      (setEditText(e.target.value),
                                        autosizeCleanTextarea(e.target));
                                    }}
                                    onKeyDown={(e) => {
                                      e.key === `Enter` && !e.shiftKey
                                        ? (e.preventDefault(), saveEdit())
                                        : e.key === `Escape` && (e.stopPropagation(), cancelEdit());
                                    }}
                                  />
                                ) : (
                                  <p className={`ui-mpc__text`}>{e.text}</p>
                                )}
                                <div className={`ui-mpc__meta`}>
                                  <span className={`ui-mpc__source`}>
                                    {e.source}
                                    {e.source && e.date && (
                                      <span className={`ui-mpc__dot`}>{` · `}</span>
                                    )}
                                    {e.date}
                                  </span>
                                  <span
                                    className={`ui-mpc__tag`}
                                    data-on={e.paused ? `` : void 0}
                                    aria-hidden={!e.paused}
                                  >{`Paused`}</span>
                                  {t ? (
                                    <span className={`ui-mpc__acts ui-mpc__acts--edit`}>
                                      <button
                                        type={`button`}
                                        className={`ui-mpc__text-btn`}
                                        onClick={cancelEdit}
                                      >{`Cancel`}</button>
                                      <button
                                        type={`button`}
                                        className={`ui-mpc__text-btn ui-mpc__text-btn--main`}
                                        onClick={saveEdit}
                                      >{`Save`}</button>
                                    </span>
                                  ) : (
                                    <span className={`ui-mpc__acts`}>
                                      <button
                                        type={`button`}
                                        className={`ui-mpc__icon`}
                                        data-act={`edit`}
                                        aria-label={`Edit “${e.text}”`}
                                        title={`Edit`}
                                        onClick={() => startEdit(e)}
                                      >
                                        <CleanEditIcon />
                                      </button>
                                      <button
                                        type={`button`}
                                        className={`ui-mpc__icon`}
                                        data-act={`pause`}
                                        aria-label={`${e.paused ? `Resume` : `Pause`} “${e.text}”`}
                                        title={e.paused ? `Resume` : `Pause`}
                                        onClick={() => togglePaused(e)}
                                      >
                                        <span
                                          className={`ui-mpc__icon-swap`}
                                          key={e.paused ? `play` : `pause`}
                                        >
                                          {e.paused ? <CleanPlayIcon /> : <CleanPauseIcon />}
                                        </span>
                                      </button>
                                      <button
                                        type={`button`}
                                        className={`ui-mpc__icon ui-mpc__icon--forget`}
                                        data-act={`forget`}
                                        aria-label={`Forget “${e.text}”`}
                                        title={`Forget`}
                                        onClick={() => forgetMemory(e)}
                                      >
                                        <CleanForgetIcon />
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
            <div className={`ui-mpc__fold`} data-open={hasMatches ? void 0 : ``} inert={hasMatches}>
              <div className={`ui-mpc__clip`}>
                <p className={`ui-mpc__empty`}>
                  {items.length === 0
                    ? `Nothing remembered yet`
                    : normalizedQuery
                      ? `No memory mentions “${query.trim()}”`
                      : `No memories here`}
                </p>
              </div>
            </div>
          </div>
          <div className={`ui-mpc__bottom`}>
            <div className={`ui-mpc__fold`} data-open={adding ? void 0 : ``} inert={adding}>
              <div className={`ui-mpc__clip`}>
                <button
                  type={`button`}
                  className={`ui-mpc__add`}
                  aria-expanded={adding}
                  aria-controls={`${instanceId}-new`}
                  onClick={startAdd}
                >
                  <CleanAddIcon />
                  {`New memory`}
                </button>
              </div>
            </div>
            <div
              id={`${instanceId}-new`}
              className={`ui-mpc__fold`}
              data-open={adding ? `` : void 0}
              inert={!adding}
            >
              <div className={`ui-mpc__clip`}>
                <div className={`ui-mpc__new`}>
                  <textarea
                    className={`ui-mpc__edit ui-mpc__edit--new`}
                    value={addText}
                    rows={1}
                    placeholder={`Something the assistant should remember…`}
                    aria-label={`New memory`}
                    ref={(e) => {
                      (autosizeCleanTextarea(e),
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
                      (setAddText(e.target.value), autosizeCleanTextarea(e.target));
                    }}
                    onKeyDown={(e) => {
                      e.key === `Enter` && !e.shiftKey
                        ? (e.preventDefault(), saveAdd())
                        : e.key === `Escape` && (e.stopPropagation(), cancelAdd());
                    }}
                  />
                  <div className={`ui-mpc__new-row`}>
                    <div
                      ref={addScrollRef}
                      className={`ui-mpc__cats`}
                      data-more={addOverflow ? `` : void 0}
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
                          className={`ui-mpc__cat`}
                          onClick={() => setAddCategory(e)}
                          key={e}
                        >
                          {e}
                        </button>
                      ))}
                    </div>
                    <span className={`ui-mpc__acts ui-mpc__acts--edit`}>
                      <button
                        type={`button`}
                        className={`ui-mpc__text-btn`}
                        onClick={cancelAdd}
                      >{`Cancel`}</button>
                      <button
                        type={`button`}
                        className={`ui-mpc__text-btn ui-mpc__text-btn--main`}
                        disabled={!addText.trim()}
                        onClick={saveAdd}
                      >{`Save`}</button>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={`ui-mpc__foot`}>
            <span className={`ui-mpc__caption`} aria-live={`polite`}>
              <CleanSwapText id={footerId}>{footerContent}</CleanSwapText>
            </span>
            {undo ? (
              <button
                type={`button`}
                className={`ui-mpc__action ui-mpc__action--undo`}
                onClick={restoreMemory}
                key={`undo-${undo.key}`}
              >
                <CleanUndoIcon />
                {`Undo`}
              </button>
            ) : (
              action && (
                <button
                  type={`button`}
                  className={`ui-mpc__action`}
                  onClick={action.onClick}
                  key={`action`}
                >
                  {action.label}
                  <CleanArrowIcon />
                </button>
              )
            )}
          </div>
        </div>
      </div>
    )
  );
}
var memoryPanelCleanStyles = `
/* Colors and motion as variables – override them on .ui-mpc */
.ui-mpc {
  --ui-mpc-card: #ffffff;
  --ui-mpc-ink: rgba(0, 0, 0, 0.88);
  --ui-mpc-strong: #000000;
  --ui-mpc-text: rgba(0, 0, 0, 0.61);
  --ui-mpc-muted: rgba(0, 0, 0, 0.45);
  --ui-mpc-faint: rgba(0, 0, 0, 0.27);
  --ui-mpc-icon: rgba(0, 0, 0, 0.447);
  --ui-mpc-line: rgba(0, 0, 0, 0.06);
  --ui-mpc-wash: rgba(0, 0, 0, 0.03);
  --ui-mpc-fill: rgba(0, 0, 0, 0.06);
  --ui-mpc-fill-strong: rgba(0, 0, 0, 0.1);
  --ui-mpc-accent: rgba(0, 96, 226, 0.765);
  --ui-mpc-focus: rgba(0, 96, 226, 0.35);
  --ui-mpc-red: #e5484d;
  --ui-mpc-red-soft: rgba(229, 72, 77, 0.08);
  --ui-mpc-amber: #9a6a00;
  --ui-mpc-amber-soft: rgba(232, 162, 12, 0.12);
  --ui-mpc-solid: rgba(0, 0, 0, 0.88);
  --ui-mpc-on-solid: #fcfcfc;
  --ui-mpc-knob: #ffffff;
  /* Strokes are shadows: a 0.5px hairline plus a soft lift */
  --ui-mpc-shadow: 0 0 0 0.5px rgba(0, 0, 0, 0.06), 0 1px 1px -1px rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --ui-mpc-ease: cubic-bezier(0.22, 1, 0.36, 1);
  box-sizing: border-box;
  width: 100%;
  max-width: 400px;
  min-width: 0;
  container-type: inline-size;
  font-family: "Inter", "InterVariable", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  font-size: 13px;
  line-height: 20px;
  font-weight: 400;
  color: var(--ui-mpc-ink);
  text-align: left;
  -webkit-font-smoothing: antialiased;
}
.ui-mpc *, .ui-mpc *::before, .ui-mpc *::after { box-sizing: border-box; }
:where(.ui-mpc) button { margin: 0; padding: 0; border: 0; background: none; font: inherit; color: inherit; text-align: inherit; cursor: pointer; -webkit-tap-highlight-color: transparent; }
:where(.ui-mpc) :is(p, h3, ul) { margin: 0; padding: 0; list-style: none; font: inherit; }
.ui-mpc button:focus-visible { outline: 2px solid var(--ui-mpc-focus); outline-offset: 1px; }
/* Text fields: no focus box while typing – also against global :focus-visible rules of the host page */
.ui-mpc :is(input, textarea):focus-visible { outline: none; }
:where(.ui-mpc) svg { display: block; flex: none; }
.ui-mpc b { font-weight: 500; color: var(--ui-mpc-ink); }

.ui-mpc__glyph { width: 16px; height: 16px; fill: none; stroke: currentColor; stroke-width: 1.1; stroke-linecap: round; stroke-linejoin: round; }
.ui-mpc__glyph[data-solid] { fill: currentColor; stroke: none; }

/* One white card – the edge is a shadow, not a border */
.ui-mpc__card { border-radius: 10px; background: var(--ui-mpc-card); box-shadow: var(--ui-mpc-shadow); }

/* Everything that opens or goes does it the same quiet way: it unfolds or folds and fades, nothing travels */
.ui-mpc__fold { display: grid; grid-template-rows: 0fr; opacity: 0; transition: grid-template-rows 420ms var(--ui-mpc-ease), opacity 220ms ease; }
.ui-mpc__fold[data-open] { grid-template-rows: 1fr; opacity: 1; transition: grid-template-rows 420ms var(--ui-mpc-ease), opacity 320ms ease 80ms; }
.ui-mpc__fold--row[data-leaving] { transition: grid-template-rows 320ms var(--ui-mpc-ease), opacity 200ms ease, filter 200ms ease; filter: blur(2px); }
.ui-mpc__clip { min-height: 0; overflow: hidden; }

/* ----- Head ----- */
.ui-mpc__head { display: flex; align-items: center; gap: 8px; padding: 12px 10px 0 16px; }
.ui-mpc__title { min-width: 0; overflow: hidden; font-size: 15px; font-weight: 500; line-height: 24px; color: var(--ui-mpc-strong); white-space: nowrap; text-overflow: ellipsis; }
.ui-mpc__count { flex: none; min-width: 20px; height: 18px; padding: 0 5px; border-radius: 5px; background: var(--ui-mpc-fill); font-size: 11px; font-weight: 500; line-height: 18px; text-align: center; color: var(--ui-mpc-text); font-variant-numeric: tabular-nums; }
.ui-mpc__switch { display: inline-flex; flex: none; align-items: center; gap: 8px; height: 28px; margin-left: auto; padding: 0 6px 0 8px; border-radius: 6px; color: var(--ui-mpc-text); transition: background-color 90ms ease, color 90ms ease; }
.ui-mpc__switch:hover { background: var(--ui-mpc-wash); color: var(--ui-mpc-ink); }
.ui-mpc__track { position: relative; width: 26px; height: 16px; border-radius: 5px; background: var(--ui-mpc-fill-strong); transition: background-color 220ms ease; }
.ui-mpc__knob { position: absolute; top: 2px; left: 2px; width: 12px; height: 12px; border-radius: 3.5px; background: var(--ui-mpc-knob); box-shadow: 0 0 0 0.5px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.16); transition: transform 260ms var(--ui-mpc-ease); }
.ui-mpc__switch[aria-checked="true"] .ui-mpc__track { background: var(--ui-mpc-accent); }
.ui-mpc__switch[aria-checked="true"] .ui-mpc__knob { transform: translateX(10px); }

/* The note while memory is off: a soft gray fill, no stroke */
.ui-mpc__note { display: flex; gap: 8px; margin: 10px 12px 0 16px !important; padding: 8px 10px; border-radius: 8px; background: var(--ui-mpc-wash); font-size: 12px !important; line-height: 16px !important; color: var(--ui-mpc-text); }
.ui-mpc__note .ui-mpc__glyph { color: var(--ui-mpc-icon); }

/* ----- Filters: the button-switch look ----- */
.ui-mpc__filters { position: relative; display: grid; grid-template-columns: minmax(0, 1fr) auto; align-items: center; gap: 8px; padding: 12px 10px 12px 16px; border-bottom: 0.5px solid var(--ui-mpc-line); transition: opacity 300ms ease; }
.ui-mpc__chips, .ui-mpc__search { grid-area: 1 / 1; transition: opacity 220ms ease, filter 220ms ease; }
.ui-mpc__chips { display: flex; gap: 4px; min-width: 0; margin: -3px; padding: 3px; overflow-x: auto; scrollbar-width: none; }
.ui-mpc__chips[data-more], .ui-mpc__cats[data-more] { -webkit-mask-image: linear-gradient(90deg, #000 calc(100% - 24px), transparent); mask-image: linear-gradient(90deg, #000 calc(100% - 24px), transparent); }
.ui-mpc__chips::-webkit-scrollbar { display: none; }
.ui-mpc__chip { display: inline-flex; flex: none; align-items: center; gap: 6px; padding: 4px 10px; border-radius: 6px; box-shadow: inset 0 0 0 0.5px var(--ui-mpc-line); font-size: 13px; font-weight: 500; line-height: 20px; color: var(--ui-mpc-text); white-space: nowrap; transition: background-color 90ms ease, color 90ms ease; }
.ui-mpc__chip:hover { background: var(--ui-mpc-wash); }
.ui-mpc__chip[data-linked] { color: var(--ui-mpc-ink); }
.ui-mpc__chip[aria-checked="true"] { background: var(--ui-mpc-fill); color: var(--ui-mpc-ink); }
.ui-mpc__chip-count { font-size: 12px; font-weight: 400; color: var(--ui-mpc-muted); font-variant-numeric: tabular-nums; }
.ui-mpc__chip[aria-checked="true"] .ui-mpc__chip-count { color: var(--ui-mpc-text); }
.ui-mpc__search { display: flex; align-items: center; gap: 6px; height: 28px; padding: 0 2px 0 8px; border-radius: 6px; box-shadow: inset 0 0 0 0.5px var(--ui-mpc-line); background: var(--ui-mpc-wash); color: var(--ui-mpc-icon); opacity: 0; visibility: hidden; }
.ui-mpc__input { flex: 1; min-width: 0; height: 28px; margin: 0; padding: 0; border: 0; background: none; font: inherit; font-size: 13px; color: var(--ui-mpc-strong); caret-color: var(--ui-mpc-accent); outline: none; }
.ui-mpc__input::placeholder { color: var(--ui-mpc-faint); opacity: 1; }
.ui-mpc__search .ui-mpc__icon { width: 24px; height: 24px; }
.ui-mpc__filters[data-searching] .ui-mpc__chips { opacity: 0; filter: blur(2px); }
.ui-mpc__filters[data-searching] .ui-mpc__search { grid-area: 1 / 1 / 2 / 3; opacity: 1; visibility: visible; }
.ui-mpc__filters[data-searching] .ui-mpc__search-open { opacity: 0; visibility: hidden; }
.ui-mpc__search-open { grid-area: 1 / 2; transition: opacity 200ms ease, background-color 90ms ease, color 90ms ease; }

/* ----- List ----- */
.ui-mpc__list { max-height: var(--ui-mpc-max); padding: 2px 6px 6px; overflow-y: auto; overscroll-behavior: contain; scrollbar-width: thin; scrollbar-color: var(--ui-mpc-fill-strong) transparent; transition: opacity 300ms ease; }
.ui-mpc[data-off] .ui-mpc__list, .ui-mpc[data-off] .ui-mpc__filters { opacity: 0.5; }
.ui-mpc[data-off] .ui-mpc__list:hover, .ui-mpc[data-off] .ui-mpc__list:focus-within { opacity: 0.85; }
.ui-mpc__group { padding: 12px 10px 4px; font-size: 10px !important; font-weight: 500 !important; line-height: 16px !important; letter-spacing: 0.5px; text-transform: uppercase; color: var(--ui-mpc-muted); }
/* The hovered row gets a soft wash – short and crisp, and gone when the pointer leaves */
.ui-mpc__item { padding: 8px 10px 7px; border-radius: 8px; transition: background-color 90ms ease-out, opacity 220ms ease; }
.ui-mpc__item[data-hot], .ui-mpc__item[data-editing] { background: var(--ui-mpc-wash); }
.ui-mpc__text { color: var(--ui-mpc-ink); overflow-wrap: anywhere; transition: color 240ms ease; }
.ui-mpc__item[data-paused] .ui-mpc__text { color: var(--ui-mpc-muted); }
.ui-mpc__meta { display: flex; align-items: center; gap: 6px; min-height: 20px; margin-top: 2px; font-size: 12px; line-height: 16px; color: var(--ui-mpc-muted); }
.ui-mpc__source { min-width: 0; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }
.ui-mpc__dot { color: var(--ui-mpc-faint); }
.ui-mpc__tag { display: inline-flex; flex: none; align-items: center; height: 18px; padding: 0 6px; border-radius: 5px; background: var(--ui-mpc-amber-soft); font-size: 11px; font-weight: 500; line-height: 16px; color: var(--ui-mpc-amber); opacity: 0; transform: scale(0.9); transition: opacity 220ms ease, transform 280ms var(--ui-mpc-ease); }
.ui-mpc__tag:not([data-on]) { position: absolute; visibility: hidden; }
.ui-mpc__tag[data-on] { opacity: 1; transform: none; animation: ui-mpc-in 280ms var(--ui-mpc-ease) both; }
.ui-mpc__acts { display: inline-flex; flex: none; align-items: center; gap: 2px; margin: -4px -6px -4px auto; opacity: 0; transition: opacity 120ms ease; }
.ui-mpc__item:is([data-hot], :focus-within) .ui-mpc__acts, .ui-mpc__acts--edit { opacity: 1; }
.ui-mpc__acts--edit { gap: 4px; margin-top: 4px; margin-right: -2px; margin-bottom: 0; }
.ui-mpc__item[data-editing] { padding-bottom: 8px; }
/* Ghost icon button */
.ui-mpc__icon { display: grid; flex: none; place-items: center; width: 28px; height: 28px; border-radius: 6px; color: var(--ui-mpc-icon); transition: background-color 90ms ease, color 90ms ease, opacity 200ms ease; }
.ui-mpc__icon:hover { background: var(--ui-mpc-wash); color: var(--ui-mpc-ink); }
.ui-mpc__item .ui-mpc__icon:hover { background: var(--ui-mpc-fill); }
.ui-mpc__item .ui-mpc__icon--forget:hover { background: var(--ui-mpc-red-soft); color: var(--ui-mpc-red); }
.ui-mpc__icon-swap { display: grid; animation: ui-mpc-in 260ms ease both; }
/* Cancel: ghost text; Save: the dark chip */
.ui-mpc__text-btn { display: inline-flex; flex: none; align-items: center; height: 28px; padding: 0 10px; border-radius: 6px; font-size: 13px; font-weight: 500; line-height: 20px; color: var(--ui-mpc-text); white-space: nowrap; transition: background-color 90ms ease, color 90ms ease, opacity 160ms ease; }
.ui-mpc__text-btn:hover { background: var(--ui-mpc-fill); color: var(--ui-mpc-ink); }
.ui-mpc__text-btn--main, .ui-mpc__text-btn--main:hover { background: var(--ui-mpc-solid); color: var(--ui-mpc-on-solid); }
.ui-mpc__text-btn--main:hover { opacity: 0.88; }
.ui-mpc__text-btn:disabled { cursor: default; opacity: 0.3; }
.ui-mpc__edit { display: block; width: 100%; min-height: 20px; margin: 0; padding: 0; border: 0; background: none; font: inherit; color: var(--ui-mpc-strong); caret-color: var(--ui-mpc-accent); resize: none; overflow: hidden; outline: none; }
.ui-mpc__edit::placeholder { color: var(--ui-mpc-faint); opacity: 1; }
.ui-mpc__empty { padding: 20px 8px 14px; font-size: 13px; text-align: center; color: var(--ui-mpc-muted); }

/* ----- New memory ----- */
.ui-mpc__bottom { padding: 6px; border-top: 0.5px solid var(--ui-mpc-line); }
.ui-mpc__add { display: flex; align-items: center; gap: 8px; width: 100%; height: 32px; padding: 0 10px; border-radius: 6px; color: var(--ui-mpc-text); transition: background-color 90ms ease, color 90ms ease; }
.ui-mpc__add .ui-mpc__glyph { color: var(--ui-mpc-icon); transition: color 90ms ease; }
.ui-mpc__add:hover { background: var(--ui-mpc-wash); color: var(--ui-mpc-ink); }
.ui-mpc__add:hover .ui-mpc__glyph { color: var(--ui-mpc-ink); }
.ui-mpc__new { padding: 6px 4px 2px 10px; }
.ui-mpc__new-row { display: flex; align-items: center; gap: 8px; margin-top: 10px; }
.ui-mpc__cats { display: flex; flex: 1 1 auto; gap: 4px; min-width: 0; margin: -3px; padding: 3px; overflow-x: auto; scrollbar-width: none; }
.ui-mpc__cats::-webkit-scrollbar { display: none; }
.ui-mpc__cat { display: inline-flex; flex: none; align-items: center; padding: 4px 8px; border-radius: 6px; box-shadow: inset 0 0 0 0.5px var(--ui-mpc-line); font-size: 12px; font-weight: 500; line-height: 20px; color: var(--ui-mpc-text); white-space: nowrap; transition: background-color 90ms ease, color 90ms ease; }
.ui-mpc__cat:hover { background: var(--ui-mpc-wash); }
.ui-mpc__cat[aria-checked="true"] { background: var(--ui-mpc-fill); color: var(--ui-mpc-ink); }
.ui-mpc__new .ui-mpc__acts--edit { margin: 0; }

/* ----- The last row of the card ----- */
.ui-mpc__foot { display: flex; align-items: center; gap: 8px; min-height: 44px; padding: 0 8px 0 16px; border-top: 0.5px solid var(--ui-mpc-line); }
.ui-mpc__caption { flex: 1; min-width: 0; overflow: hidden; font-size: 12px; line-height: 16px; color: var(--ui-mpc-muted); white-space: nowrap; font-variant-numeric: tabular-nums; }
.ui-mpc__swap { display: grid; min-width: 0; }
.ui-mpc__swap-item { grid-area: 1 / 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; animation: ui-mpc-swap-in 320ms ease both; }
.ui-mpc__swap-item[data-out] { animation: ui-mpc-swap-out 220ms ease both; }
.ui-mpc__forgot { display: flex; min-width: 0; }
.ui-mpc__flat { flex: none; white-space: pre; }
.ui-mpc__quote { min-width: 0; overflow: hidden; text-overflow: ellipsis; }
/* The action button: ghost text with an arrow */
.ui-mpc__action { display: inline-flex; flex: none; align-items: center; gap: 4px; height: 28px; padding: 0 6px 0 10px; border-radius: 6px; font-size: 13px; font-weight: 500; line-height: 20px; color: var(--ui-mpc-text); white-space: nowrap; animation: ui-mpc-swap-in 300ms ease both; transition: background-color 90ms ease, color 90ms ease; }
.ui-mpc__action .ui-mpc__glyph { color: var(--ui-mpc-icon); transition: transform 220ms var(--ui-mpc-ease), color 90ms ease; }
.ui-mpc__action:hover { background: var(--ui-mpc-wash); color: var(--ui-mpc-ink); }
.ui-mpc__action:not(.ui-mpc__action--undo):hover .ui-mpc__glyph { transform: translateX(2px); color: var(--ui-mpc-ink); }
/* Undo: the white button with the hairline shadow */
.ui-mpc__action--undo { gap: 6px; padding: 0 10px 0 8px; background: var(--ui-mpc-card); box-shadow: var(--ui-mpc-shadow); color: var(--ui-mpc-strong); }
.ui-mpc__action--undo:hover { background: #fafafa; color: var(--ui-mpc-strong); }

@keyframes ui-mpc-in { from { opacity: 0; transform: scale(0.9); } }
@keyframes ui-mpc-swap-in { from { opacity: 0; filter: blur(2px); } }
@keyframes ui-mpc-swap-out { from { opacity: 1; } to { opacity: 0; filter: blur(2px); } }

/* Narrow panels: chips drop their counts and the switch keeps only its track, so the filters fit */
@container (max-width: 360px) {
  .ui-mpc__chip-count { display: none; }
  .ui-mpc__head { padding-left: 14px; }
  .ui-mpc__filters { padding-left: 14px; }
  .ui-mpc__foot { padding-left: 14px; }
  .ui-mpc__note { margin-left: 14px !important; }
}
@container (max-width: 320px) {
  .ui-mpc__switch-label { display: none; }
  .ui-mpc__switch { padding: 0 6px; }
  .ui-mpc__chip { padding: 4px 8px; }
}

/* Touch screens: actions always visible, taller targets */
@media (pointer: coarse) {
  .ui-mpc__acts { opacity: 1; }
  .ui-mpc__icon { width: 34px; height: 34px; }
  .ui-mpc__acts { margin-top: -7px; margin-bottom: -7px; }
  .ui-mpc__acts--edit { margin-top: 4px; margin-bottom: 0; }
  .ui-mpc__chip { padding: 6px 12px; }
  .ui-mpc__cat { padding: 5px 10px; }
  .ui-mpc__text-btn, .ui-mpc__action { height: 34px; }
  .ui-mpc__switch, .ui-mpc__add { height: 36px; }
  .ui-mpc__search, .ui-mpc__input { height: 34px; }
  .ui-mpc__foot { min-height: 52px; }
}

@media (prefers-reduced-motion: reduce) {
  .ui-mpc *, .ui-mpc *::before, .ui-mpc *::after { animation: none !important; transition: none !important; }
}

/* Dark mode: follows a .dark class or data-theme="dark" on any ancestor, e.g. <html> */
:where(.dark, [data-theme="dark"]) .ui-mpc {
  --ui-mpc-card: #1c1c1e;
  --ui-mpc-ink: rgba(255, 255, 255, 0.9);
  --ui-mpc-strong: #ffffff;
  --ui-mpc-text: rgba(255, 255, 255, 0.62);
  --ui-mpc-muted: rgba(255, 255, 255, 0.46);
  --ui-mpc-faint: rgba(255, 255, 255, 0.3);
  --ui-mpc-icon: rgba(255, 255, 255, 0.5);
  --ui-mpc-line: rgba(255, 255, 255, 0.08);
  --ui-mpc-wash: rgba(255, 255, 255, 0.04);
  --ui-mpc-fill: rgba(255, 255, 255, 0.08);
  --ui-mpc-fill-strong: rgba(255, 255, 255, 0.14);
  --ui-mpc-accent: #4d8dff;
  --ui-mpc-focus: rgba(77, 141, 255, 0.5);
  --ui-mpc-red: #ff8589;
  --ui-mpc-red-soft: rgba(229, 72, 77, 0.14);
  --ui-mpc-amber: #f0b93a;
  --ui-mpc-amber-soft: rgba(232, 162, 12, 0.14);
  --ui-mpc-solid: rgba(255, 255, 255, 0.9);
  --ui-mpc-on-solid: #1c1c1e;
  --ui-mpc-knob: #ffffff;
  --ui-mpc-shadow: 0 0 0 0.5px rgba(255, 255, 255, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.4);
}
:where(.dark, [data-theme="dark"]) .ui-mpc__action--undo:hover { background: #232326; }
:where(.dark, [data-theme="dark"]) .ui-mpc__switch[aria-checked="false"] .ui-mpc__knob { background: rgba(255, 255, 255, 0.55); }
`;
var cleanDemoMemories = [
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
function MemoryPanelCleanDemo() {
  let rootRef = React.useRef(null),
    pausedRef = React.useRef(false);
  React.useEffect(() => {
    let n = (t) => () => rootRef.current?.querySelector(t)?.click(),
      r = (e, t) => n(`[data-memory="${e}"] [data-act="${t}"]`),
      i = (e) => n(`.ui-mpc__chip:nth-child(${e})`),
      a = [
        [700, r(`short`, `pause`)],
        [2700, r(`ts`, `forget`)],
        [2600, n(`.ui-mpc__action--undo`)],
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
      <MemoryPanelClean memories={cleanDemoMemories} maxHeight={330} />
    </div>
  );
}
export default MemoryPanelCleanDemo;
export { MemoryPanelClean as PlicoCore_ue };
export { MemoryPanelCleanDemo as PlicoDemo_pe };

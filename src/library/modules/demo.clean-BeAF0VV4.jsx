"use client";

import * as React from "react";
import * as JSXRuntime from "react/jsx-runtime";
var createSentinel = `\0create`;
var motionEase = `cubic-bezier(0.22, 1, 0.36, 1)`;
var prefersReducedMotion = () =>
  typeof window < `u` && window.matchMedia?.(`(prefers-reduced-motion: reduce)`).matches;
var cleanInitials = (name) => {
  let parts = name.trim().split(/\s+/);
  return (
    (parts[0]?.[0] ?? ``) + (parts.length > 1 ? parts[parts.length - 1][0] : ``)
  ).toUpperCase();
};
function CleanHighlightMatch({ text: text, query: query }) {
  let matchIndex = query ? text.toLowerCase().indexOf(query.toLowerCase()) : -1;
  return matchIndex < 0 ? (
    <>{text}</>
  ) : (
    <>
      {text.slice(0, matchIndex)}
      <mark>{text.slice(matchIndex, matchIndex + query.length)}</mark>
      {text.slice(matchIndex + query.length)}
    </>
  );
}
var inputReserve = 72;
function CleanOptionLeading({ option: option }) {
  return option.icon ? (
    <span className={`ui-cbxc__icon`}>{option.icon}</span>
  ) : typeof option.avatar == `string` ? (
    <img className={`ui-cbxc__avatar`} src={option.avatar} alt={``} />
  ) : option.avatar ? (
    <span className={`ui-cbxc__avatar`} aria-hidden={`true`}>
      {cleanInitials(option.label)}
    </span>
  ) : option.color ? (
    <span
      className={`ui-cbxc__dot`}
      style={{
        background: option.color,
      }}
      aria-hidden={`true`}
    />
  ) : null;
}
var CleanComboboxIcon = ({ d: path, className: className }) => (
  <svg
    viewBox={`0 0 24 24`}
    className={[`ui-cbxc__glyph`, className].filter(Boolean).join(` `)}
    aria-hidden={`true`}
  >
    <path d={path} />
  </svg>
);
var iconPaths = {
  close: `M7 7l10 10M17 7 7 17`,
  check: `M5.5 12.5l4 4L18.5 8`,
  chevron: `M8 10l4 4 4-4`,
  plus: `M12 6v12M6 12h12`,
};
function CleanComboboxChip({
  animate: animate,
  leaving: leaving,
  armed: armed,
  plain: plain,
  children: children,
}) {
  let chipRef = React.useRef(null);
  return (
    React.useLayoutEffect(() => {
      let t = chipRef.current;
      animate &&
        t &&
        !prefersReducedMotion() &&
        (t.animate(
          [
            {
              gridTemplateColumns: `0fr`,
              marginRight: `0px`,
            },
            {
              gridTemplateColumns: `1fr`,
              marginRight: `4px`,
            },
          ],
          {
            duration: 260,
            easing: motionEase,
          },
        ),
        t.firstElementChild?.animate(
          [
            {
              opacity: 0,
              transform: `scale(0.6)`,
            },
            {
              opacity: 1,
              transform: `scale(1.05)`,
              offset: 0.6,
            },
            {
              opacity: 1,
              transform: `none`,
            },
          ],
          {
            duration: 340,
            easing: motionEase,
          },
        ));
    }, []),
    (
      <li
        ref={chipRef}
        className={`ui-cbxc__chip`}
        data-leaving={leaving || void 0}
        data-armed={armed || void 0}
        data-plain={plain || void 0}
      >
        {children}
      </li>
    )
  );
}
function ComboboxClean({
  options: options,
  multiple = true,
  value: value,
  defaultValue: defaultValue,
  onChange: onChange,
  placeholder = `Search…`,
  creatable = false,
  onCreate: onCreate,
  createLabel = (e) => `Create “${e}”`,
  maxVisibleTags: maxVisibleTags,
  label: label,
  defaultOpen = false,
  emptyText = `No results`,
  className: className,
}) {
  let instanceId = `ui-cbxc` + React.useId().replace(/[^a-zA-Z0-9_-]/g, ``),
    [localValue, setLocalValue] = React.useState(defaultValue ?? []),
    selectedValue = value ?? localValue,
    [createdOptions, setCreatedOptions] = React.useState([]),
    [open, setOpen] = React.useState(defaultOpen),
    [query, setQuery] = React.useState(``),
    [activeValue, setActiveValue] = React.useState(null),
    [highlightVisible, setHighlightVisible] = React.useState(true),
    [armedValue, setArmedValue] = React.useState(null),
    [announcement, setAnnouncement] = React.useState(``),
    rootRef = React.useRef(null),
    fieldRef = React.useRef(null),
    fieldInnerRef = React.useRef(null),
    inputRef = React.useRef(null),
    listRef = React.useRef(null),
    listInnerRef = React.useRef(null),
    activePillRef = React.useRef(null),
    scrollActiveRef = React.useRef(false),
    allOptions = React.useMemo(
      () => [
        ...options,
        ...createdOptions.filter((t) => !options.some((e) => e.value === t.value)),
      ],
      [options, createdOptions],
    ),
    optionMap = React.useMemo(() => new Map(allOptions.map((e) => [e.value, e])), [allOptions]),
    resolveOption = (value) =>
      optionMap.get(value) ?? {
        value: value,
        label: value,
      },
    trimmedQuery = query.trim(),
    normalizedQuery = trimmedQuery.toLowerCase(),
    groups = React.useMemo(() => {
      let e = [];
      for (let t of allOptions) {
        if (
          normalizedQuery &&
          !`${t.label} ${t.hint ?? ``} ${t.keywords ?? ``}`.toLowerCase().includes(normalizedQuery)
        )
          continue;
        let n = t.group ?? ``,
          r = e.find((e) => e.name === n);
        (r ||
          e.push(
            (r = {
              name: n,
              options: [],
            }),
          ),
          r.options.push(t));
      }
      return e;
    }, [allOptions, normalizedQuery]),
    canCreate =
      creatable &&
      !!trimmedQuery &&
      !allOptions.some((e) => e.label.toLowerCase() === normalizedQuery),
    navigationValues = [
      ...groups.flatMap((e) => e.options.map((e) => e.value)),
      ...(canCreate ? [createSentinel] : []),
    ],
    activeOption =
      activeValue !== null && navigationValues.includes(activeValue)
        ? activeValue
        : navigationValues[0],
    optionId = (value) => `${instanceId}-o${navigationValues.indexOf(value)}`,
    [chipEntries, setChipEntries] = React.useState(() =>
      selectedValue.map((e) => ({
        value: e,
      })),
    ),
    chipEntriesRef = React.useRef(chipEntries);
  chipEntriesRef.current = chipEntries;
  let removalTimersRef = React.useRef(new Map()),
    hasMountedRef = React.useRef(false),
    selectionKey = selectedValue.join(``);
  (React.useEffect(() => {
    let e = chipEntriesRef.current,
      t = false,
      n = e.map((e) => {
        let n = selectedValue.includes(e.value);
        return n && e.leaving
          ? ((t = true),
            window.clearTimeout(removalTimersRef.current.get(e.value)),
            removalTimersRef.current.delete(e.value),
            {
              value: e.value,
            })
          : !n && !e.leaving
            ? ((t = true),
              removalTimersRef.current.set(
                e.value,
                window.setTimeout(() => {
                  (removalTimersRef.current.delete(e.value),
                    setChipEntries((t) => t.filter((t) => !(t.value === e.value && t.leaving))));
                }, 420),
              ),
              {
                value: e.value,
                leaving: true,
              })
            : e;
      });
    for (let e of selectedValue)
      n.some((t) => t.value === e) ||
        (n.push({
          value: e,
        }),
        (t = true));
    t && setChipEntries(n);
  }, [selectionKey]),
    React.useEffect(() => {
      hasMountedRef.current = true;
      let e = removalTimersRef.current;
      return () => e.forEach((e) => window.clearTimeout(e));
    }, []));
  let measureRef = React.useRef(null),
    [fitCount, setFitCount] = React.useState(1 / 0),
    measurementKey = chipEntries
      .filter((e) => !e.leaving)
      .map((e) => e.value)
      .join(`|`);
  React.useLayoutEffect(() => {
    let e = fieldInnerRef.current,
      t = measureRef.current;
    if (!e || !t) return;
    let n = () => {
      let n = [...t.children].map((e) => e.offsetWidth + 4),
        r = n.pop() ?? 0,
        i = getComputedStyle(e),
        a = e.clientWidth - parseFloat(i.paddingLeft) - parseFloat(i.paddingRight) - inputReserve,
        o = 0,
        s = 0;
      for (; s < n.length; s++) {
        let e = s + 1 < n.length ? r : 0;
        if (o + n[s] + e > a) break;
        o += n[s];
      }
      setFitCount(s);
    };
    n();
    let r = new ResizeObserver(n);
    return (r.observe(e), () => r.disconnect());
  }, [measurementKey]);
  let maxTags = Math.min(maxVisibleTags ?? 1 / 0, fitCount),
    tagCount = 0,
    visibleChips = chipEntries.filter((e) =>
      e.leaving ? tagCount < maxTags : tagCount++ < maxTags,
    ),
    overflowCount = Math.max(0, chipEntries.filter((e) => !e.leaving).length - maxTags),
    previousOverflowRef = React.useRef(overflowCount),
    overflowDirectionRef = React.useRef(`up`);
  (overflowCount !== previousOverflowRef.current &&
    overflowCount > 0 &&
    (overflowDirectionRef.current = overflowCount > previousOverflowRef.current ? `up` : `down`),
    overflowCount > 0 && (previousOverflowRef.current = overflowCount));
  let renderedOverflow = overflowCount || previousOverflowRef.current,
    armedOverflow =
      !!armedValue && overflowCount > 0 && !visibleChips.some((e) => e.value === armedValue),
    previousCountRef = React.useRef(selectedValue.length),
    selectionDirectionRef = React.useRef(`up`);
  selectedValue.length !== previousCountRef.current &&
    ((selectionDirectionRef.current =
      selectedValue.length > previousCountRef.current ? `up` : `down`),
    (previousCountRef.current = selectedValue.length));
  let commitValue = (values, option) => {
      (value === void 0 && setLocalValue(values),
        onChange?.(
          values,
          values.map((e) => (option?.value === e ? option : resolveOption(e))),
        ));
    },
    announce = (message, count) =>
      setAnnouncement(multiple ? `${message}. ${count} selected` : message),
    toggleOption = (option) => {
      let selected = selectedValue.includes(option.value),
        nextValues = multiple
          ? selected
            ? selectedValue.filter((t) => t !== option.value)
            : [...selectedValue, option.value]
          : [option.value];
      (commitValue(nextValues, option),
        announce(
          `${option.label} ${selected && multiple ? `removed` : `selected`}`,
          nextValues.length,
        ),
        setArmedValue(null),
        query && setQuery(``),
        multiple || setOpen(false));
    },
    createOption = () => {
      let option = onCreate?.(trimmedQuery) || {
        value: trimmedQuery,
        label: trimmedQuery,
      };
      (setCreatedOptions((t) => [...t.filter((t) => t.value !== option.value), option]),
        setActiveValue(option.value),
        toggleOption(option));
    },
    removeValue = (value) => {
      let nextValues = selectedValue.filter((t) => t !== value);
      (commitValue(nextValues),
        announce(`${resolveOption(value).label} removed`, nextValues.length),
        setArmedValue(null));
    },
    selectValue = (value) => {
      value === createSentinel ? createOption() : toggleOption(resolveOption(value));
    };
  (React.useLayoutEffect(() => {
    let e = fieldRef.current,
      t = fieldInnerRef.current;
    if (!e || !t) return;
    let n = () => (e.style.height = `${t.offsetHeight}px`);
    n();
    let r = new ResizeObserver(n);
    return (r.observe(t), () => r.disconnect());
  }, []),
    React.useLayoutEffect(() => {
      let e = listRef.current,
        t = listInnerRef.current;
      if (!open || !e || !t) return;
      let n = () => {
        let n = getComputedStyle(e),
          r = parseFloat(n.paddingTop) + parseFloat(n.paddingBottom),
          i = parseFloat(n.maxHeight) || 1 / 0;
        e.style.height = `${Math.min(t.offsetHeight + r, i)}px`;
      };
      n();
      let r = new ResizeObserver(n);
      return (r.observe(t), () => r.disconnect());
    }, [open]),
    React.useLayoutEffect(() => {
      let e = listRef.current,
        t = activePillRef.current;
      if (!open || !e || !t) return;
      let n = e.querySelector(`[data-active]`);
      if (!n) {
        t.style.opacity = `0`;
        return;
      }
      let r = !t.dataset.ready;
      if (
        (r && (t.style.transition = `none`),
        (t.style.opacity = highlightVisible ? `1` : `0`),
        (t.style.height = `${n.offsetHeight}px`),
        (t.style.transform = `translateY(${n.offsetTop}px)`),
        r && ((t.dataset.ready = `1`), t.offsetWidth, (t.style.transition = ``)),
        !scrollActiveRef.current)
      )
        return;
      scrollActiveRef.current = false;
      let i = n.previousElementSibling,
        a = i?.classList.contains(`ui-cbxc__group-label`) ? i.offsetHeight : 0,
        o = n.offsetTop - 6 - a,
        s = n.offsetTop + n.offsetHeight + 6;
      o < e.scrollTop
        ? (e.scrollTop = o)
        : s > e.scrollTop + e.clientHeight && (e.scrollTop = s - e.clientHeight);
    }),
    React.useEffect(() => {
      if (!open) return;
      let e = (e) => {
        rootRef.current &&
          !rootRef.current.contains(e.target) &&
          (setOpen(false), setArmedValue(null));
      };
      return (
        document.addEventListener(`pointerdown`, e),
        () => document.removeEventListener(`pointerdown`, e)
      );
    }, [open]));
  let moveActive = (direction) => {
      if (!navigationValues.length) return;
      ((scrollActiveRef.current = true), setHighlightVisible(true));
      let index = Math.max(0, navigationValues.indexOf(activeOption));
      setActiveValue(
        navigationValues[(index + direction + navigationValues.length) % navigationValues.length],
      );
    },
    handleKeyDown = (event) => {
      if (
        (event.key !== `Backspace` && setArmedValue(null),
        event.key === `ArrowDown` || event.key === `ArrowUp`)
      ) {
        if ((event.preventDefault(), !open)) {
          setOpen(true);
          return;
        }
        moveActive(event.key === `ArrowDown` ? 1 : -1);
      } else if (event.key === `Enter`) {
        if (!open || !activeOption) return;
        (event.preventDefault(), selectValue(activeOption));
      } else if (event.key === `Escape`)
        open
          ? (event.preventDefault(), event.stopPropagation(), setOpen(false))
          : query && setQuery(``);
      else if (event.key === `Tab`) setOpen(false);
      else if (event.key === `Backspace` && !query && selectedValue.length) {
        event.preventDefault();
        let t = selectedValue[selectedValue.length - 1];
        armedValue === t
          ? removeValue(t)
          : (setArmedValue(t),
            setAnnouncement(`${resolveOption(t).label} – press Backspace again to remove`));
      }
    },
    handleFieldMouseDown = (event) => {
      event.target.closest(`button`) ||
        (event.target !== inputRef.current && event.preventDefault(),
        inputRef.current?.focus(),
        setArmedValue(null),
        setOpen(true));
    },
    handleBlur = (event) => {
      rootRef.current?.contains(event.relatedTarget) || (setOpen(false), setArmedValue(null));
    },
    preventMouseDown = (event) => event.preventDefault();
  return (
    <div
      ref={rootRef}
      className={[`ui-cbxc`, className].filter(Boolean).join(` `)}
      data-open={open || void 0}
      onBlur={handleBlur}
    >
      <style href={`ui-combobox-clean`} precedence={`default`}>
        {comboboxCleanStyles}
      </style>
      {label && (
        <label
          className={`ui-cbxc__label`}
          id={`${instanceId}-label`}
          htmlFor={`${instanceId}-input`}
        >
          {label}
        </label>
      )}
      <div ref={fieldRef} className={`ui-cbxc__field`} onMouseDown={handleFieldMouseDown}>
        <div ref={fieldInnerRef} className={`ui-cbxc__field-inner`}>
          <ul ref={measureRef} className={`ui-cbxc__measure`} aria-hidden={`true`}>
            {chipEntries
              .filter((e) => !e.leaving)
              .map((e) => {
                let t = resolveOption(e.value),
                  n = !t.icon && !t.avatar && !t.color;
                return (
                  <li className={`ui-cbxc__chip`} data-plain={n || void 0} key={e.value}>
                    <span className={`ui-cbxc__chip-body`}>
                      <CleanOptionLeading option={t} />
                      <span className={`ui-cbxc__chip-label`}>{t.label}</span>
                      <span className={`ui-cbxc__chip-x`} />
                    </span>
                  </li>
                );
              })}
            <li className={`ui-cbxc__chip ui-cbxc__more`}>
              <span className={`ui-cbxc__chip-body`}>{`+99`}</span>
            </li>
          </ul>
          {chipEntries.length > 0 && (
            <ul className={`ui-cbxc__chips`} role={`list`} aria-label={`Selected`}>
              {visibleChips.map((e) => {
                let t = resolveOption(e.value),
                  n = !t.icon && !t.avatar && !t.color;
                return (
                  <CleanComboboxChip
                    animate={hasMountedRef.current}
                    leaving={e.leaving}
                    armed={armedValue === e.value}
                    plain={n}
                    key={e.value}
                  >
                    <span className={`ui-cbxc__chip-body`}>
                      <CleanOptionLeading option={t} />
                      <span className={`ui-cbxc__chip-label`}>{t.label}</span>
                      <button
                        type={`button`}
                        className={`ui-cbxc__chip-x`}
                        tabIndex={-1}
                        aria-label={`Remove ${t.label}`}
                        onMouseDown={preventMouseDown}
                        onClick={() => removeValue(e.value)}
                      >
                        <CleanComboboxIcon d={iconPaths.close} />
                      </button>
                    </span>
                  </CleanComboboxChip>
                );
              })}
              <li
                className={`ui-cbxc__chip ui-cbxc__more`}
                data-hidden={!overflowCount || void 0}
                data-armed={armedOverflow || void 0}
                aria-hidden={!overflowCount || void 0}
              >
                <span className={`ui-cbxc__chip-body`}>
                  {`+`}
                  <span className={`ui-cbxc__roll`}>
                    <span data-dir={overflowDirectionRef.current} key={renderedOverflow}>
                      {renderedOverflow}
                    </span>
                  </span>
                </span>
              </li>
            </ul>
          )}
          <input
            ref={inputRef}
            id={`${instanceId}-input`}
            className={`ui-cbxc__input`}
            value={query}
            placeholder={selectedValue.length ? void 0 : placeholder}
            autoComplete={`off`}
            spellCheck={false}
            role={`combobox`}
            aria-expanded={open}
            aria-controls={`${instanceId}-list`}
            aria-autocomplete={`list`}
            aria-activedescendant={open && activeOption ? optionId(activeOption) : void 0}
            aria-label={label ? void 0 : placeholder}
            onChange={(e) => {
              (setQuery(e.target.value), setActiveValue(null), setArmedValue(null), setOpen(true));
            }}
            onKeyDown={handleKeyDown}
          />
        </div>
        <button
          type={`button`}
          className={`ui-cbxc__toggle`}
          tabIndex={-1}
          aria-label={open ? `Close list` : `Open list`}
          onMouseDown={preventMouseDown}
          onClick={() => {
            (inputRef.current?.focus(), setOpen((e) => !e));
          }}
        >
          <CleanComboboxIcon d={iconPaths.chevron} />
        </button>
      </div>
      {open && (
        <div className={`ui-cbxc__pop`} onMouseDown={preventMouseDown}>
          <div
            ref={listRef}
            id={`${instanceId}-list`}
            className={`ui-cbxc__list`}
            role={`listbox`}
            aria-multiselectable={multiple || void 0}
            aria-labelledby={label ? `${instanceId}-label` : void 0}
            aria-label={label ? void 0 : `Options`}
            onMouseLeave={() => setHighlightVisible(false)}
          >
            <span ref={activePillRef} className={`ui-cbxc__pill`} aria-hidden={`true`} />
            <div ref={listInnerRef} className={`ui-cbxc__list-inner`}>
              {groups.map((e, t) => (
                <div
                  role={`group`}
                  aria-labelledby={e.name ? `${instanceId}-g${t}` : void 0}
                  className={`ui-cbxc__group`}
                  key={e.name || `_`}
                >
                  {e.name && (
                    <div className={`ui-cbxc__group-label`} id={`${instanceId}-g${t}`}>
                      {e.name}
                    </div>
                  )}
                  {e.options.map((e) => {
                    let t = selectedValue.includes(e.value);
                    return (
                      <div
                        id={optionId(e.value)}
                        role={`option`}
                        aria-selected={t}
                        data-active={activeOption === e.value || void 0}
                        className={`ui-cbxc__option`}
                        onMouseDown={preventMouseDown}
                        onMouseMove={() => {
                          (setHighlightVisible(true),
                            activeOption !== e.value && setActiveValue(e.value));
                        }}
                        onClick={() => {
                          (setActiveValue(e.value), toggleOption(e));
                        }}
                        key={e.value}
                      >
                        <CleanOptionLeading option={e} />
                        <span className={`ui-cbxc__text`}>
                          <span className={`ui-cbxc__name`}>
                            <CleanHighlightMatch text={e.label} query={trimmedQuery} />
                          </span>
                          {e.hint && (
                            <span className={`ui-cbxc__hint`}>
                              <CleanHighlightMatch text={e.hint} query={trimmedQuery} />
                            </span>
                          )}
                        </span>
                        <CleanComboboxIcon d={iconPaths.check} className={`ui-cbxc__check`} />
                      </div>
                    );
                  })}
                </div>
              ))}
              {!groups.length && (
                <div className={`ui-cbxc__empty`} key={trimmedQuery}>
                  {emptyText}
                  {trimmedQuery && (
                    <>
                      {` for “`}
                      {trimmedQuery}
                      {`”`}
                    </>
                  )}
                </div>
              )}
              {canCreate && (
                <div
                  id={optionId(createSentinel)}
                  role={`option`}
                  aria-selected={false}
                  data-active={activeOption === createSentinel || void 0}
                  className={`ui-cbxc__option ui-cbxc__create`}
                  onMouseDown={preventMouseDown}
                  onMouseMove={() => {
                    (setHighlightVisible(true),
                      activeOption !== createSentinel && setActiveValue(createSentinel));
                  }}
                  onClick={createOption}
                >
                  <span className={`ui-cbxc__plus`} aria-hidden={`true`}>
                    <CleanComboboxIcon d={iconPaths.plus} />
                  </span>
                  <span className={`ui-cbxc__name`}>{createLabel(trimmedQuery)}</span>
                </div>
              )}
            </div>
          </div>
          <div className={`ui-cbxc__foot`} aria-hidden={`true`}>
            <span className={`ui-cbxc__count`}>
              <span className={`ui-cbxc__roll`}>
                <span data-dir={selectionDirectionRef.current} key={selectedValue.length}>
                  {selectedValue.length}
                </span>
              </span>
              {(multiple || selectedValue.length, `\xA0selected`)}
            </span>
            <span className={`ui-cbxc__keys`}>
              <kbd>{`↑`}</kbd>
              <kbd>{`↓`}</kbd>
              <span>{`to move`}</span>
              <kbd>{`↵`}</kbd>
              <span>
                {`to `}
                {multiple ? `toggle` : `pick`}
              </span>
            </span>
          </div>
        </div>
      )}
      <span className={`ui-cbxc__live`} aria-live={`polite`}>
        {announcement}
      </span>
    </div>
  );
}
var comboboxCleanStyles = `
/* Colors and motion as variables – override them on .ui-cbxc */
.ui-cbxc {
  --ui-cbxc-card: #ffffff;
  --ui-cbxc-ink: rgba(0, 0, 0, 0.88);
  --ui-cbxc-strong: #000000;
  --ui-cbxc-text: rgba(0, 0, 0, 0.61);
  --ui-cbxc-muted: rgba(0, 0, 0, 0.45);
  --ui-cbxc-faint: rgba(0, 0, 0, 0.27);
  --ui-cbxc-icon: rgba(0, 0, 0, 0.447);
  --ui-cbxc-line: rgba(0, 0, 0, 0.06);
  --ui-cbxc-fill: rgba(0, 0, 0, 0.06);
  --ui-cbxc-fill-strong: rgba(0, 0, 0, 0.1);
  --ui-cbxc-wash: rgba(0, 0, 0, 0.03);
  --ui-cbxc-flash: rgba(0, 0, 0, 0.14);
  --ui-cbxc-avatar: rgba(0, 0, 0, 0.06);
  --ui-cbxc-mark: rgba(0, 96, 226, 0.12);
  --ui-cbxc-accent: rgba(0, 96, 226, 0.765);
  --ui-cbxc-focus: rgba(0, 96, 226, 0.35);
  /* Strokes are shadows: a 0.5px hairline plus a soft lift */
  --ui-cbxc-shadow: 0 0 0 0.5px rgba(0, 0, 0, 0.06), 0 1px 1px -1px rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --ui-cbxc-shadow-hover: 0 0 0 0.5px rgba(0, 0, 0, 0.12), 0 1px 1px -1px rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --ui-cbxc-shadow-pop: 0 0 0 0.5px rgba(0, 0, 0, 0.08), 0 12px 28px -10px rgba(0, 0, 0, 0.16), 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --ui-cbxc-ease: cubic-bezier(0.22, 1, 0.36, 1);
  --ui-cbxc-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
  position: relative;
  display: block;
  width: 100%;
  max-width: 440px;
  container-type: inline-size;
  font-family: "Inter", "InterVariable", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  font-size: 13px;
  line-height: 20px;
  font-weight: 400;
  color: var(--ui-cbxc-ink);
  -webkit-font-smoothing: antialiased;
}
.ui-cbxc *, .ui-cbxc *::before, .ui-cbxc *::after { box-sizing: border-box; }
:where(.ui-cbxc) button { margin: 0; padding: 0; border: 0; background: none; font: inherit; color: inherit; cursor: pointer; }
:where(.ui-cbxc) svg { display: block; flex: none; }
/* 16px icons with thin ~1.1px lines */
.ui-cbxc__glyph { width: 16px; height: 16px; fill: none; stroke: currentColor; stroke-width: 1.65; stroke-linecap: round; stroke-linejoin: round; }
.ui-cbxc__label { display: block; margin: 0 0 6px 2px; font-size: 12px; line-height: 16px; font-weight: 500; color: var(--ui-cbxc-text); }

/* The field: white with the hairline shadow; its height glides when chips wrap */
.ui-cbxc__field {
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  background: var(--ui-cbxc-card);
  box-shadow: var(--ui-cbxc-shadow);
  cursor: text;
  transition: height 300ms var(--ui-cbxc-ease), box-shadow 160ms ease;
}
.ui-cbxc__field:hover { box-shadow: var(--ui-cbxc-shadow-hover); }
.ui-cbxc__field:focus-within { outline: 2px solid var(--ui-cbxc-focus); outline-offset: 1px; }
/* Always one line: chips that don't fit go into "+N" */
.ui-cbxc__field-inner { position: relative; display: flex; flex-wrap: nowrap; align-items: center; min-height: 32px; padding: 4px 32px 4px 4px; overflow: hidden; }
.ui-cbxc__measure { position: absolute; top: 0; left: 0; display: flex; width: max-content; margin: 0; padding: 0; list-style: none; visibility: hidden; pointer-events: none; white-space: nowrap; }
.ui-cbxc__chips > .ui-cbxc__chip { flex: none; }
.ui-cbxc__measure > .ui-cbxc__chip { flex: none; max-width: none; }
.ui-cbxc__chips { display: contents; margin: 0; padding: 0; list-style: none; }

/* Chips: the gray tab-chip look – the outer grid folds the width, the body flashes and pops */
.ui-cbxc__chip {
  display: grid;
  grid-template-columns: 1fr;
  min-width: 0;
  max-width: 100%;
  overflow: hidden;
  margin-right: 4px;
  transition: grid-template-columns 260ms var(--ui-cbxc-ease) 160ms, margin-right 260ms var(--ui-cbxc-ease) 160ms, opacity 200ms ease 140ms;
}
.ui-cbxc__chip[data-leaving] { grid-template-columns: 0fr; margin-right: 0; opacity: 0; pointer-events: none; }
.ui-cbxc__chip-body {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-width: 0;
  height: 24px;
  overflow: hidden;
  padding: 0 2px 0 4px;
  border-radius: 6px;
  background: var(--ui-cbxc-fill);
  white-space: nowrap;
  font-size: 12px;
  line-height: 16px;
  font-weight: 500;
  color: var(--ui-cbxc-ink);
  transition: background-color 160ms ease, box-shadow 160ms ease;
}
.ui-cbxc__chip[data-plain] .ui-cbxc__chip-body { padding-left: 8px; }
.ui-cbxc__chip[data-armed] .ui-cbxc__chip-body { background: var(--ui-cbxc-fill-strong); box-shadow: inset 0 0 0 0.5px var(--ui-cbxc-faint); }
.ui-cbxc__chip[data-leaving] .ui-cbxc__chip-body { animation: ui-cbxc-flash 300ms ease-out both; }
.ui-cbxc__chip-label { min-width: 0; max-width: 168px; overflow: hidden; text-overflow: ellipsis; }
.ui-cbxc__chip-x { display: grid; place-items: center; flex: none; width: 18px; height: 18px; border-radius: 4px; color: var(--ui-cbxc-icon); transition: background-color 140ms ease, color 140ms ease; }
.ui-cbxc__chip-x:hover { background: var(--ui-cbxc-fill); color: var(--ui-cbxc-ink); }
.ui-cbxc__chip-x .ui-cbxc__glyph { width: 12px; height: 12px; stroke-width: 1.9; }
.ui-cbxc__chip .ui-cbxc__avatar { width: 16px; height: 16px; font-size: 7px; background: var(--ui-cbxc-card); box-shadow: 0 0 0 0.5px var(--ui-cbxc-line); }
.ui-cbxc__chip .ui-cbxc__dot { margin: 0 1px 0 2px; }
.ui-cbxc__chip .ui-cbxc__icon { width: 16px; height: 16px; }

/* "+3": folds open and closed like a chip, the number rolls */
.ui-cbxc__more .ui-cbxc__chip-body { padding: 0 8px; gap: 0; color: var(--ui-cbxc-text); font-variant-numeric: tabular-nums; }
.ui-cbxc__more { transition-delay: 0ms; }
.ui-cbxc__more[data-hidden] { grid-template-columns: 0fr; margin-right: 0; opacity: 0; }
.ui-cbxc__roll { display: inline-grid; overflow: hidden; }
.ui-cbxc__roll > span { animation: ui-cbxc-roll-up 300ms var(--ui-cbxc-ease) both; }
.ui-cbxc__roll > span[data-dir="down"] { animation-name: ui-cbxc-roll-down; }

.ui-cbxc__input {
  flex: 1 0 72px;
  min-width: 72px;
  height: 24px;
  margin: 0;
  padding: 0 4px 0 6px;
  border: 0;
  background: transparent;
  font: inherit;
  color: var(--ui-cbxc-ink);
  outline: none;
}
.ui-cbxc__input::placeholder { color: var(--ui-cbxc-faint); }
/* The chevron: a small ghost button */
.ui-cbxc__toggle { position: absolute; top: 4px; right: 4px; display: grid; place-items: center; width: 24px; height: 24px; border-radius: 6px; color: var(--ui-cbxc-icon); transition: background-color 140ms ease, color 140ms ease; }
.ui-cbxc__toggle:hover { background: var(--ui-cbxc-wash); color: var(--ui-cbxc-ink); }
.ui-cbxc__toggle .ui-cbxc__glyph { transition: transform 260ms var(--ui-cbxc-ease); }
.ui-cbxc[data-open] .ui-cbxc__toggle .ui-cbxc__glyph { transform: rotate(180deg); }

/* Avatars, dots, icons */
.ui-cbxc__avatar {
  display: grid;
  place-items: center;
  flex: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  object-fit: cover;
  background: var(--ui-cbxc-avatar);
  color: var(--ui-cbxc-text);
  font-size: 8px;
  line-height: 1;
  font-weight: 500;
  letter-spacing: 0.02em;
}
.ui-cbxc__dot { flex: none; width: 8px; height: 8px; margin: 0 4px; border-radius: 50%; }
.ui-cbxc__icon { display: grid; place-items: center; flex: none; width: 20px; height: 20px; color: var(--ui-cbxc-icon); }
.ui-cbxc__icon svg { width: 16px; height: 16px; }

/* The list: one white popover with the count and keys as its last row */
.ui-cbxc__pop {
  position: absolute;
  z-index: 30;
  top: calc(100% + 6px);
  left: 0;
  right: 0;
  overflow: hidden;
  border-radius: 10px;
  background: var(--ui-cbxc-card);
  box-shadow: var(--ui-cbxc-shadow-pop);
  transform-origin: top center;
  animation: ui-cbxc-open 240ms var(--ui-cbxc-ease) both;
}
.ui-cbxc__list { position: relative; max-height: 300px; padding: 4px; overflow-y: auto; overscroll-behavior: contain; scrollbar-width: thin; transition: height 300ms var(--ui-cbxc-ease); }
.ui-cbxc__pill {
  position: absolute;
  top: 0;
  left: 4px;
  right: 4px;
  border-radius: 6px;
  background: var(--ui-cbxc-fill);
  opacity: 0;
  pointer-events: none;
  /* A short, crisp move between rows – no long glide; it fades out when the pointer leaves the list */
  transition: transform 90ms ease-out, height 90ms ease-out, opacity 140ms ease;
}
.ui-cbxc__group-label { padding: 8px 8px 4px; font-size: 10px; line-height: 16px; font-weight: 500; letter-spacing: 0.5px; text-transform: uppercase; color: var(--ui-cbxc-muted); }
.ui-cbxc__group:first-child .ui-cbxc__group-label { padding-top: 4px; }
.ui-cbxc__option { position: relative; display: flex; align-items: center; gap: 8px; height: 32px; padding: 0 8px; border-radius: 6px; cursor: pointer; user-select: none; -webkit-tap-highlight-color: transparent; }
.ui-cbxc__text { display: flex; flex: 1; align-items: baseline; gap: 8px; min-width: 0; }
/* The name wins over the hint when space runs out */
.ui-cbxc__name { flex: 0 0 auto; max-width: 100%; min-width: 0; overflow: hidden; color: var(--ui-cbxc-ink); white-space: nowrap; text-overflow: ellipsis; }
.ui-cbxc__hint { flex: 0 100 auto; min-width: 0; overflow: hidden; font-size: 12px; line-height: 16px; color: var(--ui-cbxc-muted); white-space: nowrap; text-overflow: ellipsis; }
.ui-cbxc mark { border-radius: 3px; background: var(--ui-cbxc-mark); color: inherit; }
/* The blue check pops in with a small spring and fades out quickly */
.ui-cbxc__check { width: 16px; height: 16px; margin-left: auto; color: var(--ui-cbxc-accent); stroke-width: 1.8; opacity: 0; transform: scale(0.4); transition: opacity 120ms ease, transform 160ms ease; }
.ui-cbxc__option[aria-selected="true"] .ui-cbxc__check { opacity: 1; transform: none; transition: opacity 160ms ease, transform 380ms var(--ui-cbxc-spring); }
.ui-cbxc__empty { padding: 12px 8px 10px; text-align: center; color: var(--ui-cbxc-muted); animation: ui-cbxc-in 240ms var(--ui-cbxc-ease) both; }
.ui-cbxc__create { animation: ui-cbxc-in 240ms var(--ui-cbxc-ease) both; }
.ui-cbxc__plus { display: grid; place-items: center; flex: none; width: 20px; height: 20px; border-radius: 6px; color: var(--ui-cbxc-icon); box-shadow: inset 0 0 0 0.5px var(--ui-cbxc-fill-strong); }
.ui-cbxc__plus .ui-cbxc__glyph { width: 12px; height: 12px; stroke-width: 1.9; }

/* The last row of the popover, under a hairline */
.ui-cbxc__foot { display: flex; align-items: center; justify-content: space-between; gap: 12px; height: 32px; padding: 0 12px; border-top: 0.5px solid var(--ui-cbxc-line); font-size: 12px; line-height: 16px; color: var(--ui-cbxc-muted); }
.ui-cbxc__count { display: inline-flex; font-variant-numeric: tabular-nums; }
.ui-cbxc__keys { display: inline-flex; align-items: center; gap: 2px; white-space: nowrap; }
.ui-cbxc kbd {
  display: inline-grid;
  place-items: center;
  min-width: 16px;
  height: 16px;
  padding: 0 4px;
  border-radius: 4px;
  background: var(--ui-cbxc-card);
  box-shadow: var(--ui-cbxc-shadow);
  font-family: inherit;
  font-size: 10px;
  line-height: 16px;
  font-weight: 500;
  color: var(--ui-cbxc-text);
}
.ui-cbxc__keys > span { margin: 0 6px 0 2px; }
.ui-cbxc__keys > span:last-child { margin-right: 0; }
.ui-cbxc__live { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }

@keyframes ui-cbxc-open { from { opacity: 0; transform: translateY(-4px) scale(0.98); } to { opacity: 1; transform: none; } }
@keyframes ui-cbxc-in { from { opacity: 0; transform: translateY(3px); } to { opacity: 1; transform: none; } }
@keyframes ui-cbxc-flash { 0% { background-color: var(--ui-cbxc-fill); } 35% { background-color: var(--ui-cbxc-flash); } 100% { background-color: var(--ui-cbxc-flash); transform: scale(0.92); } }
@keyframes ui-cbxc-roll-up { from { opacity: 0; transform: translateY(70%); } to { opacity: 1; transform: none; } }
@keyframes ui-cbxc-roll-down { from { opacity: 0; transform: translateY(-70%); } to { opacity: 1; transform: none; } }

/* Narrow (phones): no key hints, chips may use the full width */
@container (max-width: 380px) {
  .ui-cbxc__keys { display: none; }
  .ui-cbxc__chip-label { max-width: 132px; }
  /* The text field fits next to a chip instead of taking a line of its own */
  .ui-cbxc__input { flex-basis: 44px; min-width: 44px; }
}
/* Touch screens: bigger rows, chips and buttons; 16px text so iOS doesn't zoom in */
@media (hover: none) and (pointer: coarse) {
  .ui-cbxc__field-inner { min-height: 40px; padding: 4px 40px 4px 4px; }
  .ui-cbxc__chip-body { height: 32px; }
  .ui-cbxc__chip-x { width: 26px; height: 26px; }
  .ui-cbxc__input { height: 32px; font-size: 16px; }
  .ui-cbxc__toggle { width: 32px; height: 32px; }
  .ui-cbxc__option { height: 44px; }
  .ui-cbxc__list { max-height: 340px; }
  .ui-cbxc__keys { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .ui-cbxc *, .ui-cbxc *::before, .ui-cbxc *::after { animation: none !important; transition: none !important; }
}

/* Dark mode: follows a .dark class or data-theme="dark" on any ancestor, e.g. <html> */
:where(.dark, [data-theme="dark"]) .ui-cbxc {
  --ui-cbxc-card: #1c1c1e;
  --ui-cbxc-ink: rgba(255, 255, 255, 0.9);
  --ui-cbxc-strong: #ffffff;
  --ui-cbxc-text: rgba(255, 255, 255, 0.62);
  --ui-cbxc-muted: rgba(255, 255, 255, 0.46);
  --ui-cbxc-faint: rgba(255, 255, 255, 0.3);
  --ui-cbxc-icon: rgba(255, 255, 255, 0.5);
  --ui-cbxc-line: rgba(255, 255, 255, 0.08);
  --ui-cbxc-fill: rgba(255, 255, 255, 0.08);
  --ui-cbxc-fill-strong: rgba(255, 255, 255, 0.13);
  --ui-cbxc-wash: rgba(255, 255, 255, 0.04);
  --ui-cbxc-flash: rgba(255, 255, 255, 0.18);
  --ui-cbxc-avatar: rgba(255, 255, 255, 0.08);
  --ui-cbxc-mark: rgba(77, 141, 255, 0.24);
  --ui-cbxc-accent: #4d8dff;
  --ui-cbxc-focus: rgba(77, 141, 255, 0.5);
  --ui-cbxc-shadow: 0 0 0 0.5px rgba(255, 255, 255, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.4);
  --ui-cbxc-shadow-hover: 0 0 0 0.5px rgba(255, 255, 255, 0.16), 0 1px 2px 0 rgba(0, 0, 0, 0.4);
  --ui-cbxc-shadow-pop: 0 0 0 0.5px rgba(255, 255, 255, 0.12), 0 12px 28px -10px rgba(0, 0, 0, 0.6);
}
`;
var cleanReviewerOptions = [
  {
    value: `maya`,
    label: `Maya Chen`,
    hint: `Product Designer`,
    avatar: true,
    group: `Design`,
  },
  {
    value: `jonas`,
    label: `Jonas Weber`,
    hint: `Design Lead`,
    avatar: true,
    group: `Design`,
  },
  {
    value: `priya`,
    label: `Priya Raman`,
    hint: `Brand Designer`,
    avatar: true,
    group: `Design`,
  },
  {
    value: `sara`,
    label: `Sara Okafor`,
    hint: `Staff Engineer`,
    avatar: true,
    group: `Engineering`,
  },
  {
    value: `leo`,
    label: `Leo Martins`,
    hint: `Frontend`,
    avatar: true,
    group: `Engineering`,
  },
  {
    value: `nina`,
    label: `Nina Petrova`,
    hint: `Backend`,
    avatar: true,
    group: `Engineering`,
  },
  {
    value: `tom`,
    label: `Tom Becker`,
    hint: `iOS`,
    avatar: true,
    group: `Engineering`,
  },
  {
    value: `elif`,
    label: `Elif Yilmaz`,
    hint: `Head of Product`,
    avatar: true,
    group: `Product`,
  },
  {
    value: `daniel`,
    label: `Daniel Kim`,
    hint: `Product Manager`,
    avatar: true,
    group: `Product`,
  },
  {
    value: `lucas`,
    label: `Lucas Moreau`,
    hint: `Product Analyst`,
    avatar: true,
    group: `Product`,
  },
];
function ComboboxCleanDemo() {
  return (
    <div className={`combobox-demo`}>
      <ComboboxClean
        label={`Reviewers`}
        options={cleanReviewerOptions}
        placeholder={`Add reviewers…`}
        creatable={true}
        createLabel={(e) => `Invite “${e}”`}
        defaultOpen={true}
      />
    </div>
  );
}
export default ComboboxCleanDemo;
export { ComboboxClean as PlicoCore_p };
export { ComboboxCleanDemo as PlicoDemo_m };

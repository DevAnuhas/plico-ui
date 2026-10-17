"use client";

import * as React from "react";
type ComboboxOption = {
  value: string;
  label: string;
  hint?: string;
  avatar?: string | boolean;
  color?: string;
  icon?: React.ReactNode;
  group?: string;
  keywords?: string[];
};
interface ComboboxProps {
  options: ComboboxOption[];
  multiple?: boolean;
  value?: string[];
  defaultValue?: string[];
  onChange?: (value: string[], options: ComboboxOption[]) => void;
  placeholder?: string;
  creatable?: boolean;
  onCreate?: (text: string) => ComboboxOption | void;
  createLabel?: (text: string) => string;
  maxVisibleTags?: number;
  label?: string;
  defaultOpen?: boolean;
  emptyText?: string;
  className?: string;
}
var createSentinel = `\0create`;
var motionEase = `cubic-bezier(0.22, 1, 0.36, 1)`;
var prefersReducedMotion = () =>
  typeof window < `u` && window.matchMedia?.(`(prefers-reduced-motion: reduce)`).matches;
var initials = (name: string) => {
  let parts = name.trim().split(/\s+/);
  return (
    (parts[0]?.[0] ?? ``) + (parts.length > 1 ? parts[parts.length - 1][0] : ``)
  ).toUpperCase();
};
function HighlightMatch({ text: text, query: query }: { text: string; query: string }) {
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
function OptionLeading({ option: option }: { option: ComboboxOption }) {
  return option.icon ? (
    <span className={`ui-cbx__icon`}>{option.icon}</span>
  ) : typeof option.avatar == `string` ? (
    <img className={`ui-cbx__avatar`} src={option.avatar} alt={``} />
  ) : option.avatar ? (
    <span className={`ui-cbx__avatar`} aria-hidden={`true`}>
      {initials(option.label)}
    </span>
  ) : option.color ? (
    <span
      className={`ui-cbx__dot`}
      style={{
        background: option.color,
      }}
      aria-hidden={`true`}
    />
  ) : null;
}
var ComboboxIcon = ({ d: path, className: className }: { d: string; className?: string }) => (
  <svg
    viewBox={`0 0 24 24`}
    className={[`ui-cbx__glyph`, className].filter(Boolean).join(` `)}
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
function ComboboxChip({
  animate: animate,
  leaving: leaving,
  armed: armed,
  plain: plain,
  children: children,
}: {
  animate?: boolean;
  leaving?: boolean;
  armed?: boolean;
  plain?: boolean;
  children?: React.ReactNode;
}) {
  let chipRef = React.useRef<HTMLLIElement | null>(null);
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
        className={`ui-cbx__chip`}
        data-leaving={leaving || void 0}
        data-armed={armed || void 0}
        data-plain={plain || void 0}
      >
        {children}
      </li>
    )
  );
}
function Combobox({
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
}: ComboboxProps) {
  let instanceId = `ui-cbx` + React.useId().replace(/[^a-zA-Z0-9_-]/g, ``),
    [localValue, setLocalValue] = React.useState(defaultValue ?? []),
    selectedValue = value ?? localValue,
    [createdOptions, setCreatedOptions] = React.useState<ComboboxOption[]>([]),
    [open, setOpen] = React.useState<boolean | "true" | "false">(defaultOpen),
    [query, setQuery] = React.useState<string>(``),
    [activeValue, setActiveValue] = React.useState<string | null>(null),
    [armedValue, setArmedValue] = React.useState<string | null>(null),
    [announcement, setAnnouncement] = React.useState(``),
    rootRef = React.useRef<HTMLDivElement | null>(null),
    fieldRef = React.useRef<HTMLDivElement | null>(null),
    fieldInnerRef = React.useRef<HTMLDivElement | null>(null),
    inputRef = React.useRef<HTMLInputElement | null>(null),
    listRef = React.useRef<HTMLDivElement | null>(null),
    listInnerRef = React.useRef<HTMLDivElement | null>(null),
    activePillRef = React.useRef<HTMLSpanElement | null>(null),
    scrollActiveRef = React.useRef(false),
    allOptions = React.useMemo(
      () => [
        ...options,
        ...createdOptions.filter((t) => !options.some((e) => e.value === t.value)),
      ],
      [options, createdOptions],
    ),
    optionMap = React.useMemo(() => new Map(allOptions.map((e) => [e.value, e])), [allOptions]),
    resolveOption = (value: string): ComboboxOption =>
      optionMap.get(value) ?? {
        value: value,
        label: value,
      },
    trimmedQuery = query.trim(),
    normalizedQuery = trimmedQuery.toLowerCase(),
    groups = React.useMemo(() => {
      let e: {
        name: string;
        options: ComboboxOption[];
      }[] = [];
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
    optionId = (value: string) => `${instanceId}-o${navigationValues.indexOf(value)}`,
    [chipEntries, setChipEntries] = React.useState<{ value: string; leaving?: boolean }[]>(() =>
      selectedValue.map((e) => ({
        value: e,
      })),
    ),
    chipEntriesRef = React.useRef(chipEntries);
  chipEntriesRef.current = chipEntries;
  let removalTimersRef = React.useRef(new Map<string, number>()),
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
  let maxTags = maxVisibleTags ?? 1 / 0,
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
  let commitValue = (values: string[], option?: ComboboxOption) => {
      (value === void 0 && setLocalValue(values),
        onChange?.(
          values,
          values.map((e: string) => (option?.value === e ? option : resolveOption(e))),
        ));
    },
    announce = (message: string, count: number) =>
      setAnnouncement(multiple ? `${message}. ${count} selected` : message),
    toggleOption = (option: ComboboxOption) => {
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
    removeValue = (value: string) => {
      let nextValues = selectedValue.filter((t) => t !== value);
      (commitValue(nextValues),
        announce(`${resolveOption(value).label} removed`, nextValues.length),
        setArmedValue(null));
    },
    selectValue = (value: string) => {
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
      let n = e.querySelector<HTMLElement>(`[data-active]`);
      if (!n) {
        t.style.opacity = `0`;
        return;
      }
      let r = !t.dataset.ready;
      if (
        (r && (t.style.transition = `none`),
        (t.style.opacity = `1`),
        (t.style.height = `${n.offsetHeight}px`),
        (t.style.transform = `translateY(${n.offsetTop}px)`),
        r && ((t.dataset.ready = `1`), t.offsetWidth, (t.style.transition = ``)),
        !scrollActiveRef.current)
      )
        return;
      scrollActiveRef.current = false;
      let i = n.previousElementSibling,
        a = i?.classList.contains(`ui-cbx__group-label`) ? (i as HTMLElement).offsetHeight : 0,
        o = n.offsetTop - 6 - a,
        s = n.offsetTop + n.offsetHeight + 6;
      o < e.scrollTop
        ? (e.scrollTop = o)
        : s > e.scrollTop + e.clientHeight && (e.scrollTop = s - e.clientHeight);
    }),
    React.useEffect(() => {
      if (!open) return;
      let e = (e: PointerEvent) => {
        rootRef.current &&
          !rootRef.current.contains(e.target as Node | null) &&
          (setOpen(false), setArmedValue(null));
      };
      return (
        document.addEventListener(`pointerdown`, e),
        () => document.removeEventListener(`pointerdown`, e)
      );
    }, [open]));
  let moveActive = (direction: number) => {
      if (!navigationValues.length) return;
      scrollActiveRef.current = true;
      let index = Math.max(0, navigationValues.indexOf(activeOption));
      setActiveValue(
        navigationValues[(index + direction + navigationValues.length) % navigationValues.length],
      );
    },
    handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
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
    handleFieldMouseDown: React.MouseEventHandler<HTMLElement> = (event) => {
      (event.target as HTMLElement).closest(`button`) ||
        (event.target !== inputRef.current && event.preventDefault(),
        inputRef.current?.focus(),
        setArmedValue(null),
        setOpen(true));
    },
    handleBlur: React.FocusEventHandler<HTMLDivElement> = (event) => {
      rootRef.current?.contains(event.relatedTarget) || (setOpen(false), setArmedValue(null));
    },
    preventMouseDown: React.MouseEventHandler<HTMLElement> = (event) => event.preventDefault();
  return (
    <div
      ref={rootRef}
      className={[`ui-cbx`, className].filter(Boolean).join(` `)}
      data-open={open || void 0}
      onBlur={handleBlur}
    >
      <style href={`ui-combobox`} precedence={`default`}>
        {comboboxStyles}
      </style>
      {label && (
        <label
          className={`ui-cbx__label`}
          id={`${instanceId}-label`}
          htmlFor={`${instanceId}-input`}
        >
          {label}
        </label>
      )}
      <div ref={fieldRef} className={`ui-cbx__field`} onMouseDown={handleFieldMouseDown}>
        <div ref={fieldInnerRef} className={`ui-cbx__field-inner`}>
          {(visibleChips.length > 0 || maxVisibleTags !== void 0) && (
            <ul className={`ui-cbx__chips`} role={`list`} aria-label={`Selected`}>
              {visibleChips.map((e) => {
                let t = resolveOption(e.value),
                  n = !t.icon && !t.avatar && !t.color;
                return (
                  <ComboboxChip
                    animate={hasMountedRef.current}
                    leaving={e.leaving}
                    armed={armedValue === e.value}
                    plain={n}
                    key={e.value}
                  >
                    <span className={`ui-cbx__chip-body`}>
                      <OptionLeading option={t} />
                      <span className={`ui-cbx__chip-label`}>{t.label}</span>
                      <button
                        type={`button`}
                        className={`ui-cbx__chip-x`}
                        tabIndex={-1}
                        aria-label={`Remove ${t.label}`}
                        onMouseDown={preventMouseDown}
                        onClick={() => removeValue(e.value)}
                      >
                        <ComboboxIcon d={iconPaths.close} />
                      </button>
                    </span>
                  </ComboboxChip>
                );
              })}
              {maxVisibleTags !== void 0 && (
                <li
                  className={`ui-cbx__chip ui-cbx__more`}
                  data-hidden={!overflowCount || void 0}
                  data-armed={armedOverflow || void 0}
                  aria-hidden={!overflowCount || void 0}
                >
                  <span className={`ui-cbx__chip-body`}>
                    {`+`}
                    <span className={`ui-cbx__roll`}>
                      <span data-dir={overflowDirectionRef.current} key={renderedOverflow}>
                        {renderedOverflow}
                      </span>
                    </span>
                  </span>
                </li>
              )}
            </ul>
          )}
          <input
            ref={inputRef}
            id={`${instanceId}-input`}
            className={`ui-cbx__input`}
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
          className={`ui-cbx__toggle`}
          tabIndex={-1}
          aria-label={open ? `Close list` : `Open list`}
          onMouseDown={preventMouseDown}
          onClick={() => {
            (inputRef.current?.focus(), setOpen((e) => !e));
          }}
        >
          <ComboboxIcon d={iconPaths.chevron} />
        </button>
      </div>
      {open && (
        <div className={`ui-cbx__pop`} onMouseDown={preventMouseDown}>
          <div className={`ui-cbx__card`}>
            <div
              ref={listRef}
              id={`${instanceId}-list`}
              className={`ui-cbx__list`}
              role={`listbox`}
              aria-multiselectable={multiple || void 0}
              aria-labelledby={label ? `${instanceId}-label` : void 0}
              aria-label={label ? void 0 : `Options`}
            >
              <span ref={activePillRef} className={`ui-cbx__pill`} aria-hidden={`true`} />
              <div ref={listInnerRef} className={`ui-cbx__list-inner`}>
                {groups.map((e, t) => (
                  <div
                    role={`group`}
                    aria-labelledby={e.name ? `${instanceId}-g${t}` : void 0}
                    className={`ui-cbx__group`}
                    key={e.name || `_`}
                  >
                    {e.name && (
                      <div className={`ui-cbx__group-label`} id={`${instanceId}-g${t}`}>
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
                          className={`ui-cbx__option`}
                          onMouseDown={preventMouseDown}
                          onMouseMove={() => activeOption !== e.value && setActiveValue(e.value)}
                          onClick={() => {
                            (setActiveValue(e.value), toggleOption(e));
                          }}
                          key={e.value}
                        >
                          <OptionLeading option={e} />
                          <span className={`ui-cbx__text`}>
                            <span className={`ui-cbx__name`}>
                              <HighlightMatch text={e.label} query={trimmedQuery} />
                            </span>
                            {e.hint && (
                              <span className={`ui-cbx__hint`}>
                                <HighlightMatch text={e.hint} query={trimmedQuery} />
                              </span>
                            )}
                          </span>
                          <ComboboxIcon d={iconPaths.check} className={`ui-cbx__check`} />
                        </div>
                      );
                    })}
                  </div>
                ))}
                {!groups.length && (
                  <div className={`ui-cbx__empty`} key={trimmedQuery}>
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
                    className={`ui-cbx__option ui-cbx__create`}
                    onMouseDown={preventMouseDown}
                    onMouseMove={() =>
                      activeOption !== createSentinel && setActiveValue(createSentinel)
                    }
                    onClick={createOption}
                  >
                    <span className={`ui-cbx__plus`} aria-hidden={`true`}>
                      <ComboboxIcon d={iconPaths.plus} />
                    </span>
                    <span className={`ui-cbx__name`}>{createLabel(trimmedQuery)}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className={`ui-cbx__foot`} aria-hidden={`true`}>
            <span className={`ui-cbx__count`}>
              <span className={`ui-cbx__roll`}>
                <span data-dir={selectionDirectionRef.current} key={selectedValue.length}>
                  {selectedValue.length}
                </span>
              </span>
              {(multiple || selectedValue.length, `\xA0selected`)}
            </span>
            <span className={`ui-cbx__keys`}>
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
      <span className={`ui-cbx__live`} aria-live={`polite`}>
        {announcement}
      </span>
    </div>
  );
}
var comboboxStyles = `
/* Colors and motion as variables – override them on .ui-cbx */
.ui-cbx {
  --ui-cbx-tray: #f0f0f0;
  --ui-cbx-card: #ffffff;
  --ui-cbx-line: #ececec;
  --ui-cbx-ink: #171717;
  --ui-cbx-text: #404040;
  --ui-cbx-muted: #8f8f8f;
  --ui-cbx-faint: #b5b5b5;
  --ui-cbx-edge: #d4d4d8;
  --ui-cbx-active: #f0f0f1;
  --ui-cbx-chip: #f4f4f5;
  --ui-cbx-chip-line: #e6e6e8;
  --ui-cbx-armed: #e4e4e7;
  --ui-cbx-flash: #d9d9dd;
  --ui-cbx-avatar: #e9e9ec;
  --ui-cbx-avatar-ink: #5b5b62;
  --ui-cbx-mark: rgba(47, 107, 255, 0.14);
  --ui-cbx-accent: #2f6bff;
  --ui-cbx-ring: rgba(23, 23, 23, 0.08);
  --ui-cbx-focus: rgba(23, 23, 23, 0.22);
  --ui-cbx-shadow: 0 0 0 1px rgba(0, 0, 0, 0.06), 0 18px 40px -12px rgba(0, 0, 0, 0.18), 0 4px 12px -4px rgba(0, 0, 0, 0.06);
  --ui-cbx-ease: cubic-bezier(0.22, 1, 0.36, 1);
  --ui-cbx-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
  position: relative;
  display: block;
  width: 100%;
  max-width: 440px;
  container-type: inline-size;
  font-family: "Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  font-size: 13.5px;
  line-height: 1.4;
  color: var(--ui-cbx-text);
  -webkit-font-smoothing: antialiased;
}
.ui-cbx *, .ui-cbx *::before, .ui-cbx *::after { box-sizing: border-box; }
:where(.ui-cbx) button { margin: 0; padding: 0; border: 0; background: none; font: inherit; color: inherit; cursor: pointer; }
:where(.ui-cbx) svg { display: block; flex: none; }
.ui-cbx__glyph { width: 16px; height: 16px; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
.ui-cbx__label { display: block; margin: 0 0 7px 2px; font-size: 13px; font-weight: 500; color: var(--ui-cbx-ink); }

/* The field: a white box whose height glides when chips wrap */
.ui-cbx__field {
  position: relative;
  overflow: hidden;
  border-radius: 12px;
  background: var(--ui-cbx-card);
  box-shadow: 0 0 0 1px var(--ui-cbx-line), 0 1px 2px rgba(0, 0, 0, 0.04);
  cursor: text;
  transition: height 300ms var(--ui-cbx-ease), box-shadow 160ms ease;
}
.ui-cbx__field:hover { box-shadow: 0 0 0 1px var(--ui-cbx-edge), 0 1px 2px rgba(0, 0, 0, 0.04); }
.ui-cbx__field:focus-within { box-shadow: 0 0 0 1px var(--ui-cbx-edge), 0 0 0 4px var(--ui-cbx-ring); }
.ui-cbx__field-inner { display: flex; flex-wrap: wrap; align-items: center; row-gap: 4px; min-height: 40px; padding: 6px 40px 6px 6px; }
.ui-cbx__chips { display: contents; margin: 0; padding: 0; list-style: none; }

/* Chips: the outer grid folds the width, the body flashes and pops */
.ui-cbx__chip {
  display: grid;
  grid-template-columns: 1fr;
  min-width: 0;
  max-width: 100%;
  overflow: hidden;
  margin-right: 4px;
  transition: grid-template-columns 260ms var(--ui-cbx-ease) 160ms, margin-right 260ms var(--ui-cbx-ease) 160ms, opacity 200ms ease 140ms;
}
.ui-cbx__chip[data-leaving] { grid-template-columns: 0fr; margin-right: 0; opacity: 0; pointer-events: none; }
.ui-cbx__chip-body {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-width: 0;
  height: 28px;
  overflow: hidden;
  padding: 0 3px 0 5px;
  border-radius: 8px;
  background: var(--ui-cbx-chip);
  box-shadow: inset 0 0 0 1px var(--ui-cbx-chip-line);
  white-space: nowrap;
  color: var(--ui-cbx-ink);
  font-size: 13px;
  transition: background-color 160ms ease, box-shadow 160ms ease;
}
.ui-cbx__chip[data-plain] .ui-cbx__chip-body { padding-left: 9px; }
.ui-cbx__chip[data-armed] .ui-cbx__chip-body { background: var(--ui-cbx-armed); box-shadow: inset 0 0 0 1px var(--ui-cbx-faint); }
.ui-cbx__chip[data-leaving] .ui-cbx__chip-body { animation: ui-cbx-flash 300ms ease-out both; }
.ui-cbx__chip-label { min-width: 0; max-width: 168px; overflow: hidden; text-overflow: ellipsis; }
.ui-cbx__chip-x { display: grid; place-items: center; flex: none; width: 20px; height: 20px; border-radius: 6px; color: var(--ui-cbx-muted); transition: background-color 140ms ease, color 140ms ease; }
.ui-cbx__chip-x:hover { background: var(--ui-cbx-armed); color: var(--ui-cbx-ink); }
.ui-cbx__chip-x .ui-cbx__glyph { width: 13px; height: 13px; stroke-width: 2; }
.ui-cbx__chip .ui-cbx__avatar { width: 18px; height: 18px; font-size: 8.5px; }
.ui-cbx__chip .ui-cbx__dot { margin: 0 2px; }

/* "+3": folds open and closed like a chip, the number rolls */
.ui-cbx__more .ui-cbx__chip-body { padding: 0 9px; color: var(--ui-cbx-text); font-variant-numeric: tabular-nums; }
.ui-cbx__more { transition-delay: 0ms; }
.ui-cbx__more[data-hidden] { grid-template-columns: 0fr; margin-right: 0; opacity: 0; }
.ui-cbx__roll { display: inline-grid; overflow: hidden; }
.ui-cbx__roll > span { animation: ui-cbx-roll-up 300ms var(--ui-cbx-ease) both; }
.ui-cbx__roll > span[data-dir="down"] { animation-name: ui-cbx-roll-down; }

.ui-cbx__input {
  flex: 1 0 72px;
  min-width: 72px;
  height: 28px;
  margin: 0;
  padding: 0 4px 0 6px;
  border: 0;
  background: transparent;
  font: inherit;
  color: var(--ui-cbx-ink);
  outline: none;
}
.ui-cbx__input::placeholder { color: var(--ui-cbx-faint); }
.ui-cbx__toggle { position: absolute; top: 6px; right: 6px; display: grid; place-items: center; width: 28px; height: 28px; border-radius: 8px; color: var(--ui-cbx-muted); transition: background-color 140ms ease, color 140ms ease; }
.ui-cbx__toggle:hover { background: var(--ui-cbx-active); color: var(--ui-cbx-ink); }
.ui-cbx__toggle .ui-cbx__glyph { transition: transform 260ms var(--ui-cbx-ease); }
.ui-cbx[data-open] .ui-cbx__toggle .ui-cbx__glyph { transform: rotate(180deg); }

/* Avatars, dots, icons */
.ui-cbx__avatar {
  display: grid;
  place-items: center;
  flex: none;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  object-fit: cover;
  background: var(--ui-cbx-avatar);
  color: var(--ui-cbx-avatar-ink);
  font-size: 9.5px;
  font-weight: 600;
  letter-spacing: 0.02em;
}
.ui-cbx__dot { flex: none; width: 8px; height: 8px; margin: 0 4px; border-radius: 50%; }
.ui-cbx__icon { display: grid; place-items: center; flex: none; width: 18px; height: 18px; color: var(--ui-cbx-muted); }
.ui-cbx__icon svg { width: 16px; height: 16px; }

/* The list: a gray tray around a white card, like the other Plico UI menus */
.ui-cbx__pop {
  position: absolute;
  z-index: 30;
  top: calc(100% + 6px);
  left: 0;
  right: 0;
  padding: 4px;
  border-radius: 18px;
  background: var(--ui-cbx-tray);
  box-shadow: var(--ui-cbx-shadow);
  transform-origin: top center;
  animation: ui-cbx-open 240ms var(--ui-cbx-ease) both;
}
.ui-cbx__card { overflow: hidden; border-radius: 14px; background: var(--ui-cbx-card); box-shadow: 0 0 0 1px var(--ui-cbx-line); }
.ui-cbx__list { position: relative; max-height: 300px; padding: 4px; overflow-y: auto; overscroll-behavior: contain; scrollbar-width: thin; transition: height 300ms var(--ui-cbx-ease); }
.ui-cbx__pill {
  position: absolute;
  top: 0;
  left: 4px;
  right: 4px;
  border-radius: 9px;
  background: var(--ui-cbx-active);
  opacity: 0;
  pointer-events: none;
  transition: transform 220ms var(--ui-cbx-ease), height 220ms var(--ui-cbx-ease), opacity 160ms ease;
}
.ui-cbx__group-label { padding: 9px 8px 4px; font-size: 11.5px; font-weight: 500; color: var(--ui-cbx-faint); }
.ui-cbx__group:first-child .ui-cbx__group-label { padding-top: 5px; }
.ui-cbx__option { position: relative; display: flex; align-items: center; gap: 10px; height: 36px; padding: 0 8px; border-radius: 9px; cursor: pointer; user-select: none; -webkit-tap-highlight-color: transparent; }
.ui-cbx__text { display: flex; flex: 1; align-items: baseline; gap: 8px; min-width: 0; }
/* The name wins over the hint when space runs out */
.ui-cbx__name { flex: 0 0 auto; max-width: 100%; min-width: 0; overflow: hidden; color: var(--ui-cbx-ink); white-space: nowrap; text-overflow: ellipsis; }
.ui-cbx__hint { flex: 0 100 auto; min-width: 0; overflow: hidden; font-size: 12.5px; color: var(--ui-cbx-muted); white-space: nowrap; text-overflow: ellipsis; }
.ui-cbx mark { border-radius: 3px; background: var(--ui-cbx-mark); color: inherit; }
/* The check pops in with a small spring and fades out quickly */
.ui-cbx__check { width: 16px; height: 16px; margin-left: auto; color: var(--ui-cbx-ink); stroke-width: 2.2; opacity: 0; transform: scale(0.4); transition: opacity 120ms ease, transform 160ms ease; }
.ui-cbx__option[aria-selected="true"] .ui-cbx__check { opacity: 1; transform: none; transition: opacity 160ms ease, transform 380ms var(--ui-cbx-spring); }
.ui-cbx__empty { padding: 14px 10px 10px; text-align: center; color: var(--ui-cbx-muted); animation: ui-cbx-in 240ms var(--ui-cbx-ease) both; }
.ui-cbx__create { animation: ui-cbx-in 240ms var(--ui-cbx-ease) both; }
.ui-cbx__plus { display: grid; place-items: center; flex: none; width: 24px; height: 24px; border-radius: 50%; color: var(--ui-cbx-muted); box-shadow: inset 0 0 0 1px var(--ui-cbx-edge); }
.ui-cbx__plus .ui-cbx__glyph { width: 13px; height: 13px; stroke-width: 2; }

/* The tray below the card */
.ui-cbx__foot { display: flex; align-items: center; justify-content: space-between; gap: 12px; height: 32px; padding: 0 10px; font-size: 12px; color: var(--ui-cbx-muted); }
.ui-cbx__count { display: inline-flex; font-variant-numeric: tabular-nums; }
.ui-cbx__keys { display: inline-flex; align-items: center; gap: 3px; white-space: nowrap; }
.ui-cbx kbd {
  display: inline-grid;
  place-items: center;
  min-width: 18px;
  height: 18px;
  padding: 0 4px;
  border-radius: 5px;
  background: var(--ui-cbx-card);
  box-shadow: inset 0 0 0 1px var(--ui-cbx-line), 0 1px 0 var(--ui-cbx-line);
  font-family: inherit;
  font-size: 10.5px;
  font-weight: 500;
  color: var(--ui-cbx-muted);
}
.ui-cbx__keys > span { margin: 0 6px 0 2px; }
.ui-cbx__keys > span:last-child { margin-right: 0; }
.ui-cbx__live { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }

@keyframes ui-cbx-open { from { opacity: 0; transform: translateY(-4px) scale(0.98); } to { opacity: 1; transform: none; } }
@keyframes ui-cbx-in { from { opacity: 0; transform: translateY(3px); } to { opacity: 1; transform: none; } }
@keyframes ui-cbx-flash { 0% { background-color: var(--ui-cbx-chip); } 35% { background-color: var(--ui-cbx-flash); } 100% { background-color: var(--ui-cbx-flash); transform: scale(0.92); } }
@keyframes ui-cbx-roll-up { from { opacity: 0; transform: translateY(70%); } to { opacity: 1; transform: none; } }
@keyframes ui-cbx-roll-down { from { opacity: 0; transform: translateY(-70%); } to { opacity: 1; transform: none; } }

/* Narrow (phones): no key hints, chips may use the full width */
@container (max-width: 380px) {
  .ui-cbx__keys { display: none; }
  .ui-cbx__chip-label { max-width: 132px; }
  .ui-cbx__hint { font-size: 12px; }
  /* The text field fits next to a chip instead of taking a line of its own */
  .ui-cbx__input { flex-basis: 44px; min-width: 44px; }
}
/* Touch screens: bigger rows, chips and buttons; 16px text so iOS doesn't zoom in */
@media (hover: none) and (pointer: coarse) {
  .ui-cbx__field-inner { min-height: 44px; padding-right: 44px; }
  .ui-cbx__chip-body { height: 32px; }
  .ui-cbx__chip-x { width: 26px; height: 26px; }
  .ui-cbx__input { height: 32px; font-size: 16px; }
  .ui-cbx__toggle { width: 32px; height: 32px; }
  .ui-cbx__option { height: 44px; }
  .ui-cbx__list { max-height: 340px; }
  .ui-cbx__keys { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .ui-cbx *, .ui-cbx *::before, .ui-cbx *::after { animation: none !important; transition: none !important; }
}

/* Dark mode: follows a .dark class or data-theme="dark" on any ancestor, e.g. <html> */
:where(.dark, [data-theme="dark"]) .ui-cbx {
  --ui-cbx-tray: #111113;
  --ui-cbx-card: #19191b;
  --ui-cbx-line: #2a2a2e;
  --ui-cbx-ink: #ededed;
  --ui-cbx-text: #c8c8cc;
  --ui-cbx-muted: #8b8b92;
  --ui-cbx-faint: #5c5c63;
  --ui-cbx-edge: #3a3a40;
  --ui-cbx-active: #26262a;
  --ui-cbx-chip: #232326;
  --ui-cbx-chip-line: #2f2f34;
  --ui-cbx-armed: #303035;
  --ui-cbx-flash: #3a3a40;
  --ui-cbx-avatar: #2c2c31;
  --ui-cbx-avatar-ink: #b4b4bb;
  --ui-cbx-mark: rgba(109, 139, 255, 0.24);
  --ui-cbx-accent: #6d8bff;
  --ui-cbx-ring: rgba(255, 255, 255, 0.07);
  --ui-cbx-focus: rgba(255, 255, 255, 0.3);
  --ui-cbx-shadow: 0 0 0 1px rgba(255, 255, 255, 0.06), 0 18px 40px -12px rgba(0, 0, 0, 0.6);
}
`;
var reviewerOptions = [
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
function ComboboxDemo2() {
  return (
    <div className={`combobox-demo`}>
      <Combobox
        label={`Reviewers`}
        options={reviewerOptions}
        defaultValue={[`maya`, `sara`]}
        placeholder={`Add reviewers…`}
        maxVisibleTags={4}
        creatable={true}
        createLabel={(e) => `Invite “${e}”`}
        defaultOpen={true}
      />
    </div>
  );
}
const demoStyles =
  ".combobox-demo{grid-template-columns:minmax(0,420px);place-content:center;width:100%;display:grid}.card__preview .combobox-demo{grid-template-columns:auto;place-content:start center;padding-top:42px;position:absolute;inset:0}.card__preview .combobox-demo .ui-cbx{zoom:.48;width:420px;max-width:none}.card__preview .combobox-demo .ui-cbx__list{max-height:210px}.stage:has(.combobox-demo){align-items:start;height:560px;padding:56px 32px}@media (width<=760px){.stage:has(.combobox-demo){height:600px;padding:56px 12px 16px}}.card__preview .combobox-demo .ui-cbxc{zoom:.48;width:420px;max-width:none}.card__preview .combobox-demo .ui-cbxc__list{max-height:210px}\n";
function ComboboxDemo(props: React.JSX.IntrinsicAttributes) {
  return (
    <>
      <style href="plico-demo-combobox" precedence="default">
        {demoStyles}
      </style>
      <ComboboxDemo2 {...props} />
    </>
  );
}
export { Combobox };
export { ComboboxDemo };
export { Combobox as Component };
export { ComboboxDemo as Demo };
export default Combobox;

"use client";

import * as React from "react";
import * as JSXRuntime from "react/jsx-runtime";
var cleanClassNames = (...e) => e.filter(Boolean).join(` `);
var cleanHasErrors = (errors) => !!errors && Object.values(errors).some(Boolean);
var cleanPrefersReducedMotion = () =>
  typeof window < `u` && window.matchMedia(`(prefers-reduced-motion: reduce)`).matches;
function cleanShakeElement(element) {
  element &&
    !cleanPrefersReducedMotion() &&
    element.animate &&
    element.animate(
      [
        {
          transform: `none`,
        },
        {
          transform: `translateX(-4px)`,
        },
        {
          transform: `translateX(4px)`,
        },
        {
          transform: `translateX(-2px)`,
        },
        {
          transform: `none`,
        },
      ],
      {
        duration: 340,
        easing: `ease-out`,
      },
    );
}
function cleanPositionSelectionRing(container, ring, selector) {
  if (!container || !ring) return;
  let selected = container.querySelector(selector);
  if (!selected || !selected.offsetWidth) {
    ring.style.opacity = `0`;
    return;
  }
  let first = !ring.dataset.ready;
  (first && (ring.style.transition = `none`),
    (ring.style.opacity = `1`),
    (ring.style.width = `${selected.offsetWidth}px`),
    (ring.style.height = `${selected.offsetHeight}px`),
    (ring.style.transform = `translate(${selected.offsetLeft}px, ${selected.offsetTop}px)`),
    first && ((ring.dataset.ready = `1`), ring.offsetWidth, (ring.style.transition = ``)));
}
var CleanStepperIcon = ({ d: path, className: className }) => (
  <svg
    viewBox={`0 0 24 24`}
    className={cleanClassNames(`ui-sfc__glyph`, className)}
    aria-hidden={`true`}
  >
    <path d={path} />
  </svg>
);
var cleanIconPaths = {
  check: `M5.5 12.5l4 4L18.5 8`,
  close: `M7 7l10 10M17 7 7 17`,
  back: `M14.5 6l-6 6 6 6`,
};
var CleanDrawnCheck = ({ className: className }) => (
  <svg
    viewBox={`0 0 24 24`}
    className={cleanClassNames(`ui-sfc__draw`, className)}
    aria-hidden={`true`}
  >
    <path d={cleanIconPaths.check} pathLength={1} />
  </svg>
);
var CleanFormContext = React.createContext({
  errors: {},
  shake: 0,
  report: () => {},
});
var CleanFieldContext = React.createContext(null);
function StepperFormClean({
  steps: steps,
  initialValues: initialValues,
  onComplete: onComplete,
  initialStep = 0,
  step: step,
  onStepChange: onStepChange,
  submitLabel = `Finish`,
  submittingLabel = `Creating…`,
  success: success,
  className: className,
}) {
  let stepCount = steps.length,
    [localStep, setLocalStep] = React.useState(initialStep),
    activeStep = Math.max(0, Math.min(stepCount - 1, step ?? localStep)),
    [values, setValuesState] = React.useState(initialValues),
    valuesRef = React.useRef(values),
    [furthestStep, setFurthestStep] = React.useState(activeStep),
    maxVisited = Math.max(furthestStep, activeStep),
    [attemptedSteps, setAttemptedSteps] = React.useState({}),
    [shake, setShake] = React.useState(0),
    [returnTo, setReturnTo] = React.useState(null),
    [submitting, setSubmitting] = React.useState(false),
    [submitError, setSubmitError] = React.useState(``),
    [completed, setCompleted] = React.useState(false),
    [announcement, setAnnouncement] = React.useState(``),
    formRef = React.useRef(null),
    viewportRef = React.useRef(null),
    submitButtonRef = React.useRef(null),
    submitLabelRef = React.useRef(null),
    focusNextRef = React.useRef(false),
    hasNavigatedRef = React.useRef(false),
    reportedErrorsRef = React.useRef({}),
    reportError = React.useCallback((e, t) => {
      reportedErrorsRef.current = {
        ...reportedErrorsRef.current,
        [e]: t ?? void 0,
      };
    }, []),
    instanceId = React.useId(),
    pageIndex = completed ? stepCount : activeStep,
    [transition, setTransition] = React.useState({
      index: pageIndex,
      from: null,
      dir: 1,
    });
  (transition.index !== pageIndex &&
    setTransition({
      index: pageIndex,
      from: transition.index,
      dir: pageIndex > transition.index ? 1 : -1,
    }),
    React.useEffect(() => {
      if (transition.from === null) return;
      let e = window.setTimeout(
        () =>
          setTransition((e) => ({
            ...e,
            from: null,
          })),
        420,
      );
      return () => clearTimeout(e);
    }, [transition.index, transition.from]));
  let patchValues = React.useCallback((e) => {
      ((valuesRef.current = {
        ...valuesRef.current,
        ...e,
      }),
        setValuesState(valuesRef.current));
    }, []),
    navigate = (index) => {
      let target = Math.max(0, Math.min(stepCount - 1, index));
      target !== activeStep &&
        ((focusNextRef.current = true),
        (hasNavigatedRef.current = true),
        (reportedErrorsRef.current = {}),
        step === void 0 && setLocalStep(target),
        onStepChange?.(target),
        setFurthestStep((e) => Math.max(e, target)),
        setSubmitError(``),
        setAnnouncement(`Step ${target + 1} of ${stepCount}: ${steps[target].title}`));
    },
    validateCurrent = () => {
      let t = {
        ...reportedErrorsRef.current,
        ...steps[activeStep].validate?.(valuesRef.current),
      };
      return cleanHasErrors(t)
        ? (setAttemptedSteps((e) => ({
            ...e,
            [activeStep]: true,
          })),
          setShake((e) => e + 1),
          setAnnouncement(Object.values(t).find(Boolean) ?? `Check this step`),
          false)
        : (setAttemptedSteps((e) => ({
            ...e,
            [activeStep]: false,
          })),
          true);
    },
    handleSubmit = async (e) => {
      if ((e?.preventDefault(), !(submitting || completed || !validateCurrent()))) {
        if (activeStep < stepCount - 1) {
          returnTo !== null && returnTo > activeStep
            ? (setReturnTo(null), navigate(returnTo))
            : navigate(activeStep + 1);
          return;
        }
        (setSubmitting(true), setSubmitError(``));
        try {
          (await onComplete?.(valuesRef.current),
            (focusNextRef.current = true),
            (hasNavigatedRef.current = true),
            setCompleted(true),
            setAnnouncement(`All done`));
        } catch (e) {
          let t = e instanceof Error && e.message ? e.message : `Something went wrong – try again`;
          (setSubmitError(t), setAnnouncement(t));
        } finally {
          setSubmitting(false);
        }
      }
    },
    handleBack = () => {
      (setReturnTo(null), navigate(activeStep - 1));
    },
    goTo = (id) => {
      let index = steps.findIndex((e) => e.id === id);
      index < 0 ||
        index === activeStep ||
        (index > activeStep && !validateCurrent()) ||
        (setReturnTo(index < activeStep ? activeStep : null), navigate(index));
    },
    reset = () => {
      ((valuesRef.current = initialValues),
        setValuesState(initialValues),
        setAttemptedSteps({}),
        setReturnTo(null),
        setFurthestStep(initialStep),
        setCompleted(false),
        setSubmitError(``),
        (focusNextRef.current = true),
        (hasNavigatedRef.current = true),
        (reportedErrorsRef.current = {}),
        step === void 0 && setLocalStep(initialStep),
        onStepChange?.(initialStep));
    };
  (React.useEffect(() => {
    if (!focusNextRef.current) return;
    focusNextRef.current = false;
    let e = viewportRef.current?.querySelector(`[data-pane="current"]`);
    (
      e?.querySelector(`input:not([type="hidden"]):not(:disabled), textarea, select`) ??
      e?.querySelector(`.ui-sfc__heading`)
    )?.focus({
      preventScroll: true,
    });
  }, [pageIndex]),
    React.useEffect(() => {
      shake &&
        viewportRef.current?.querySelector(`[data-pane="current"] [aria-invalid="true"]`)?.focus({
          preventScroll: true,
        });
    }, [shake]),
    React.useLayoutEffect(() => {
      let e = viewportRef.current,
        t = e?.querySelector(`[data-pane="current"]`);
      if (!e || !t) return;
      let n = !e.dataset.ready,
        r = () => (e.style.height = `${t.offsetHeight}px`);
      (n && (e.style.transition = `none`),
        r(),
        n && ((e.dataset.ready = `1`), e.offsetWidth, (e.style.transition = ``)));
      let i = new ResizeObserver(r);
      return (i.observe(t), () => i.disconnect());
    }, [pageIndex]),
    React.useLayoutEffect(() => {
      let e = submitButtonRef.current,
        t = submitLabelRef.current;
      if (!e || !t) return;
      let n = () => (e.style.width = `${t.offsetWidth}px`);
      n();
      let r = new ResizeObserver(n);
      return (r.observe(t), () => r.disconnect());
    }, []));
  let activeDefinition = steps[activeStep],
    errors = attemptedSteps[activeStep] ? (activeDefinition.validate?.(values) ?? {}) : {},
    ready = !cleanHasErrors(activeDefinition.validate?.(values)),
    finalStep = activeStep === stepCount - 1,
    buttonLabel = submitting
      ? submittingLabel
      : finalStep
        ? submitLabel
        : returnTo !== null && returnTo > activeStep
          ? `Back to ${steps[returnTo].title.toLowerCase()}`
          : `Continue`,
    renderContext = {
      values: values,
      setValues: patchValues,
      errors: errors,
      goTo: goTo,
      next: () => formRef.current?.requestSubmit(),
    },
    renderStep = (index) => {
      if (index >= stepCount)
        return success ? (
          success(values, reset)
        ) : (
          <CleanSuccess
            title={`All set`}
            description={`Everything is saved. You can change it any time.`}
          />
        );
      let definition = steps[index],
        context =
          index === activeStep
            ? renderContext
            : {
                ...renderContext,
                errors: {},
              };
      return (
        <>
          <h2 className={`ui-sfc__heading`} tabIndex={-1} id={`${instanceId}-h${index}`}>
            {definition.heading ?? definition.title}
          </h2>
          {definition.description && <p className={`ui-sfc__desc`}>{definition.description}</p>}
          <div className={`ui-sfc__body`}>{definition.render(context)}</div>
        </>
      );
    },
    panes =
      transition.from !== null && transition.from !== transition.index
        ? [transition.from, transition.index]
        : [transition.index];
  return (
    <div
      className={cleanClassNames(`ui-sfc`, className)}
      style={{
        "--ui-sfc-n": stepCount,
      }}
    >
      <style href={`ui-stepper-form-clean`} precedence={`default`}>
        {cleanStepperFormStyles}
      </style>
      <div className={`ui-sfc__head`}>
        <div className={`ui-sfc__steps`}>
          <ol className={`ui-sfc__list`} aria-label={`Progress`}>
            {steps.map((e, t) => {
              let n =
                  completed || (t < maxVisited && t !== activeStep)
                    ? `done`
                    : t === activeStep
                      ? `current`
                      : `upcoming`,
                i = !completed && !submitting && t !== activeStep && t <= maxVisited,
                a = (
                  <>
                    <span className={`ui-sfc__bar`} aria-hidden={`true`} />
                    <span className={`ui-sfc__mark`}>
                      {n === `done` ? (
                        <CleanDrawnCheck key={`check`} />
                      ) : (
                        <span key={`num`}>{t + 1}</span>
                      )}
                    </span>
                    <span className={`ui-sfc__step-label`}>{e.title}</span>
                    <span className={`ui-sfc__sr`}>
                      {n === `done` ? ` (done)` : n === `current` ? ` (current)` : ``}
                    </span>
                  </>
                );
              return (
                <li
                  className={`ui-sfc__step`}
                  data-state={n}
                  aria-current={!completed && t === activeStep ? `step` : void 0}
                  key={e.id}
                >
                  {i ? (
                    <button
                      type={`button`}
                      className={`ui-sfc__step-btn`}
                      onClick={() => goTo(e.id)}
                    >
                      {a}
                    </button>
                  ) : (
                    <span className={`ui-sfc__step-btn`}>{a}</span>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
        <div className={`ui-sfc__compact`} aria-hidden={`true`}>
          <span className={`ui-sfc__compact-text`} key={completed ? `done` : activeStep}>
            {completed ? (
              <>
                {`All `}
                {stepCount}
                {` steps done`}
              </>
            ) : (
              <>
                {`Step `}
                {activeStep + 1}
                {` of `}
                {stepCount}
                <span className={`ui-sfc__compact-dot`}>{`·`}</span>
                <span className={`ui-sfc__compact-title`}>{activeDefinition.title}</span>
              </>
            )}
          </span>
        </div>
      </div>
      <form
        ref={formRef}
        className={`ui-sfc__card`}
        noValidate={true}
        onSubmit={handleSubmit}
        aria-labelledby={completed ? void 0 : `${instanceId}-h${activeStep}`}
      >
        <div ref={viewportRef} className={`ui-sfc__viewport`}>
          {panes.map((e) => {
            let t = e === transition.index;
            return (
              <div
                className={`ui-sfc__pane`}
                data-pane={t ? `current` : `leaving`}
                data-dir={transition.dir}
                data-first={!hasNavigatedRef.current || void 0}
                inert={!t}
                aria-hidden={!t || void 0}
                key={e}
              >
                <CleanFormContext.Provider
                  value={{
                    errors: t && e === activeStep ? errors : {},
                    shake: t ? shake : 0,
                    report: reportError,
                  }}
                >
                  {renderStep(e)}
                </CleanFormContext.Provider>
              </div>
            );
          })}
        </div>
        <div className={`ui-sfc__foot-fold`} data-hidden={completed || void 0}>
          <div className={`ui-sfc__foot`} inert={completed}>
            <button
              type={`button`}
              className={`ui-sfc__btn ui-sfc__btn-ghost`}
              data-hidden={activeStep === 0 || void 0}
              disabled={activeStep === 0 || submitting}
              onClick={handleBack}
            >
              <CleanStepperIcon d={cleanIconPaths.back} />
              {`Back`}
            </button>
            {submitError && (
              <span className={`ui-sfc__submit-error`} role={`alert`}>
                {submitError}
              </span>
            )}
            <button
              ref={submitButtonRef}
              type={`submit`}
              className={`ui-sfc__btn ui-sfc__btn-primary`}
              aria-disabled={!ready || submitting || void 0}
              data-busy={submitting || void 0}
            >
              <span ref={submitLabelRef} className={`ui-sfc__btn-inner`}>
                {submitting && <span className={`ui-sfc__spinner`} aria-hidden={`true`} />}
                <span className={`ui-sfc__btn-label`} key={buttonLabel}>
                  {buttonLabel}
                </span>
              </span>
            </button>
          </div>
        </div>
      </form>
      <span className={`ui-sfc__sr`} aria-live={`polite`}>
        {announcement}
      </span>
    </div>
  );
}
function CleanField({
  name: name,
  label: label,
  hint: hint,
  optional: optional,
  children: children,
}) {
  let { errors: errors, shake: shake, report: report } = React.useContext(CleanFormContext),
    [localError, setLocalError] = React.useState(null),
    [localShake, setLocalShake] = React.useState(0),
    instanceId = React.useId(),
    controlRef = React.useRef(null),
    error = errors[name] ?? localError ?? ``,
    previousErrorRef = React.useRef(error);
  error && (previousErrorRef.current = error);
  let invalid = !!error;
  (React.useEffect(() => {
    shake && (errors[name] || localError) && cleanShakeElement(controlRef.current);
  }, [shake]),
    React.useEffect(() => {
      localShake && cleanShakeElement(controlRef.current);
    }, [localShake]));
  let flag = React.useCallback(
    (t) => {
      (setLocalError(t), report(name, t), t && setLocalShake((e) => e + 1));
    },
    [name, report],
  );
  return (
    <div className={`ui-sfc__field`} data-invalid={invalid || void 0}>
      <label className={`ui-sfc__label`} htmlFor={instanceId}>
        {label}
        {optional && <span className={`ui-sfc__optional`}>{`Optional`}</span>}
      </label>
      <div ref={controlRef} className={`ui-sfc__control`}>
        <CleanFieldContext.Provider
          value={{
            id: instanceId,
            invalid: invalid,
            describedBy: invalid ? `${instanceId}-msg` : hint ? `${instanceId}-hint` : void 0,
            flag: flag,
          }}
        >
          {children}
        </CleanFieldContext.Provider>
      </div>
      <div className={`ui-sfc__fold`} data-open={invalid || void 0}>
        <div>
          <p className={`ui-sfc__msg`} id={`${instanceId}-msg`} key={previousErrorRef.current}>
            {previousErrorRef.current}
          </p>
        </div>
      </div>
      {hint && (
        <div className={`ui-sfc__fold`} data-open={!invalid || void 0}>
          <div>
            <p className={`ui-sfc__hint`} id={`${instanceId}-hint`}>
              {hint}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
function CleanInput({ prefix: prefix, className: className, ...inputProps }) {
  let field = React.useContext(CleanFieldContext);
  return (
    <div
      className={cleanClassNames(`ui-sfc__input`, className)}
      data-invalid={field?.invalid || void 0}
    >
      {prefix && (
        <span className={`ui-sfc__prefix`} aria-hidden={`true`}>
          {prefix}
        </span>
      )}
      <input
        id={field?.id}
        aria-invalid={field?.invalid || void 0}
        aria-describedby={field?.describedBy}
        autoComplete={`off`}
        spellCheck={false}
        {...inputProps}
      />
    </div>
  );
}
var cleanEmailPattern = /^[^\s@,;]+@[^\s@,;]+\.[^\s@,;]{2,}$/;
function CleanEmailTags({
  value: value,
  onChange: onChange,
  placeholder = `name@company.com`,
  validate = (e, t) =>
    cleanEmailPattern.test(e)
      ? t.includes(e)
        ? `Already on the list`
        : null
      : `That doesn't look like an email address`,
  max: max,
}) {
  let field = React.useContext(CleanFieldContext),
    [draft, setDraft] = React.useState(``),
    [removing, setRemoving] = React.useState([]),
    inputRef = React.useRef(null),
    chipsRef = React.useRef(null),
    valueRef = React.useRef(value);
  valueRef.current = value;
  let commit = React.useRef(null),
    remove = React.useRef(value.length);
  React.useLayoutEffect(() => {
    let t = commit.current;
    (t &&
      value.length > remove.current &&
      t.scrollTo({
        left: t.scrollWidth,
        behavior: cleanPrefersReducedMotion() ? `auto` : `smooth`,
      }),
      (remove.current = value.length));
  }, [value.length]);
  let S = (e) => {
      let n = e
        .split(/[\s,;]+/)
        .map((e) => e.trim().toLowerCase())
        .filter(Boolean);
      if (!n.length) return true;
      let r = [...valueRef.current],
        i = [],
        o = null;
      for (let e of n) {
        let t = max !== void 0 && r.length >= max ? `Up to ${max}` : validate(e, r);
        t ? ((o ??= t), i.push(e)) : r.push(e);
      }
      return (
        r.length !== valueRef.current.length && ((valueRef.current = r), onChange(r)),
        setDraft(i.join(`, `)),
        field?.flag(o),
        !o
      );
    },
    C = (e) => {
      if (removing.includes(e)) return;
      setRemoving((t) => [...t, e]);
      let n = chipsRef.current?.querySelector(`[data-entry="${CSS.escape(e)}"]`),
        r = () => {
          (setRemoving((t) => t.filter((t) => t !== e)),
            onChange(valueRef.current.filter((t) => t !== e)));
        };
      n && n.animate && !cleanPrefersReducedMotion()
        ? (n.animate(
            [
              {
                width: `${n.offsetWidth}px`,
                marginRight: `0px`,
                opacity: 1,
                transform: `none`,
              },
              {
                width: `0px`,
                marginRight: `-6px`,
                opacity: 0,
                transform: `scale(0.85)`,
              },
            ],
            {
              duration: 240,
              easing: `cubic-bezier(0.22, 1, 0.36, 1)`,
              fill: `forwards`,
            },
          ).onfinish = r)
        : r();
    };
  return (
    <div
      ref={commit}
      className={`ui-sfc__tags`}
      data-invalid={field?.invalid || void 0}
      onClick={(e) => e.target === e.currentTarget && inputRef.current?.focus()}
    >
      {value.length > 0 && (
        <ul ref={chipsRef} className={`ui-sfc__chips`} aria-label={`Added`}>
          {value.map((e) => (
            <li
              className={`ui-sfc__chip`}
              data-entry={e}
              data-leaving={removing.includes(e) || void 0}
              key={e}
            >
              <span className={`ui-sfc__chip-text`} title={e}>
                {e}
              </span>
              <button
                type={`button`}
                className={`ui-sfc__chip-x`}
                aria-label={`Remove ${e}`}
                onClick={() => C(e)}
              >
                <CleanStepperIcon d={cleanIconPaths.close} />
              </button>
            </li>
          ))}
        </ul>
      )}
      <input
        ref={inputRef}
        id={field?.id}
        type={`email`}
        inputMode={`email`}
        autoComplete={`off`}
        spellCheck={false}
        className={`ui-sfc__tags-input`}
        placeholder={value.length ? `Add another` : placeholder}
        value={draft}
        aria-invalid={field?.invalid || void 0}
        aria-describedby={field?.describedBy}
        onChange={(e) => {
          (setDraft(e.target.value), field?.flag(null));
        }}
        onKeyDown={(t) => {
          (t.key === `Enter` && draft.trim()) || t.key === `,` || t.key === `;`
            ? (t.preventDefault(), S(draft))
            : t.key === `Backspace` &&
              !draft &&
              value.length &&
              (t.preventDefault(), C(value[value.length - 1]));
        }}
        onPaste={(e) => {
          let t = e.clipboardData.getData(`text`);
          /[\s,;]/.test(t.trim()) && (e.preventDefault(), S(`${draft} ${t}`));
        }}
        onBlur={() => draft.trim() && S(draft)}
      />
    </div>
  );
}
function CleanChoiceCards({ value: value, onChange: onChange, options: options, label: label }) {
  let choicesRef = React.useRef(null),
    ringRef = React.useRef(null);
  return (
    React.useLayoutEffect(() => {
      cleanPositionSelectionRing(choicesRef.current, ringRef.current, `[aria-checked="true"]`);
    }),
    React.useEffect(() => {
      let e = choicesRef.current;
      if (!e) return;
      let t = new ResizeObserver(() =>
        cleanPositionSelectionRing(e, ringRef.current, `[aria-checked="true"]`),
      );
      return (t.observe(e), () => t.disconnect());
    }, []),
    (
      <div
        ref={choicesRef}
        className={`ui-sfc__choices`}
        role={`radiogroup`}
        aria-label={label}
        onKeyDown={(n) => {
          let r = options.findIndex((t) => t.value === value),
            a =
              n.key === `ArrowRight` || n.key === `ArrowDown`
                ? 1
                : n.key === `ArrowLeft` || n.key === `ArrowUp`
                  ? -1
                  : 0;
          if (a) {
            n.preventDefault();
            let e = options[(r + a + options.length) % options.length];
            (onChange(e.value),
              choicesRef.current?.querySelector(`[data-value="${CSS.escape(e.value)}"]`)?.focus());
          } else
            n.key === `Enter` &&
              (n.preventDefault(), n.currentTarget.closest(`form`)?.requestSubmit());
        }}
      >
        <span ref={ringRef} className={`ui-sfc__ring`} aria-hidden={`true`} />
        {options.map((n) => {
          let i = n.value === value;
          return (
            <button
              type={`button`}
              role={`radio`}
              aria-checked={i}
              tabIndex={i ? 0 : -1}
              data-value={n.value}
              className={`ui-sfc__choice`}
              onClick={() => onChange(n.value)}
              key={n.value}
            >
              <span className={`ui-sfc__choice-top`}>
                <span className={`ui-sfc__choice-title`}>{n.title}</span>
                {n.badge && <span className={`ui-sfc__badge`}>{n.badge}</span>}
                <span className={`ui-sfc__radio`} aria-hidden={`true`} />
              </span>
              {n.aside && <span className={`ui-sfc__choice-aside`}>{n.aside}</span>}
              {n.description && <span className={`ui-sfc__choice-desc`}>{n.description}</span>}
            </button>
          );
        })}
      </div>
    )
  );
}
function CleanReview({ rows: rows, onEdit: onEdit }) {
  return (
    <dl className={`ui-sfc__review`}>
      {rows.map((e) => (
        <div className={`ui-sfc__review-row`} key={e.label}>
          <dt>{e.label}</dt>
          <dd>{e.value}</dd>
          {e.step && onEdit && (
            <button
              type={`button`}
              className={`ui-sfc__edit`}
              aria-label={`Edit ${e.label.toLowerCase()}`}
              onClick={() => onEdit(e.step)}
            >{`Edit`}</button>
          )}
        </div>
      ))}
    </dl>
  );
}
function CleanSuccess({ title: title, description: description, children: children }) {
  return (
    <div className={`ui-sfc__success`}>
      <span className={`ui-sfc__success-check`}>
        <CleanDrawnCheck />
      </span>
      <h2 className={`ui-sfc__heading`} tabIndex={-1}>
        {title}
      </h2>
      {description && <p className={`ui-sfc__desc`}>{description}</p>}
      {children && <div className={`ui-sfc__success-actions`}>{children}</div>}
    </div>
  );
}
var cleanStepperFormStyles = `
/* Colors and motion as variables – override them on .ui-sfc */
.ui-sfc {
  --ui-sfc-card: #ffffff;
  --ui-sfc-ink: rgba(0, 0, 0, 0.88);
  --ui-sfc-strong: #000000;
  --ui-sfc-text: rgba(0, 0, 0, 0.61);
  --ui-sfc-muted: rgba(0, 0, 0, 0.45);
  --ui-sfc-faint: rgba(0, 0, 0, 0.27);
  --ui-sfc-icon: rgba(0, 0, 0, 0.447);
  --ui-sfc-line: rgba(0, 0, 0, 0.06);
  --ui-sfc-fill: rgba(0, 0, 0, 0.06);
  --ui-sfc-fill-strong: rgba(0, 0, 0, 0.1);
  --ui-sfc-wash: rgba(0, 0, 0, 0.03);
  --ui-sfc-wash-soft: rgba(0, 0, 0, 0.015);
  --ui-sfc-accent: rgba(0, 96, 226, 0.765);
  --ui-sfc-accent-soft: rgba(0, 96, 226, 0.08);
  --ui-sfc-accent-fill: rgba(0, 96, 226, 0.05);
  --ui-sfc-accent-line: rgba(0, 96, 226, 0.35);
  --ui-sfc-ok: #1a9a52;
  --ui-sfc-ok-soft: rgba(26, 154, 82, 0.1);
  --ui-sfc-danger: #e5484d;
  --ui-sfc-danger-soft: rgba(229, 72, 77, 0.55);
  --ui-sfc-chip: rgba(0, 0, 0, 0.88);
  --ui-sfc-chip-hover: rgba(0, 0, 0, 0.8);
  --ui-sfc-on-chip: #fcfcfc;
  --ui-sfc-white-hover: #fafafa;
  --ui-sfc-focus: rgba(0, 96, 226, 0.35);
  /* Strokes are shadows: a 0.5px hairline plus a soft lift */
  --ui-sfc-shadow: 0 0 0 0.5px rgba(0, 0, 0, 0.06), 0 1px 1px -1px rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --ui-sfc-shadow-hover: 0 0 0 0.5px rgba(0, 0, 0, 0.12), 0 1px 1px -1px rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --ui-sfc-ease: cubic-bezier(0.22, 1, 0.36, 1);
  position: relative;
  box-sizing: border-box;
  container-type: inline-size;
  display: grid;
  width: 100%;
  max-width: 520px;
  border-radius: 10px;
  background: var(--ui-sfc-card);
  box-shadow: var(--ui-sfc-shadow);
  font-family: "Inter", "InterVariable", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  font-size: 13px;
  line-height: 20px;
  font-weight: 400;
  color: var(--ui-sfc-ink);
  -webkit-font-smoothing: antialiased;
}
.ui-sfc *, .ui-sfc *::before, .ui-sfc *::after { box-sizing: border-box; }
:where(.ui-sfc) button { margin: 0; padding: 0; border: 0; background: none; font: inherit; color: inherit; cursor: pointer; }
:where(.ui-sfc) svg { display: block; flex: none; }
:where(.ui-sfc) :is(h2, p, dl, dd, ul, ol) { margin: 0; }
.ui-sfc button:focus-visible { outline: 2px solid var(--ui-sfc-focus); outline-offset: 1px; }
/* 16px icons with thin ~1.1px lines */
.ui-sfc__glyph { width: 16px; height: 16px; fill: none; stroke: currentColor; stroke-width: 1.65; stroke-linecap: round; stroke-linejoin: round; }
.ui-sfc__sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }

/* A check that draws in */
.ui-sfc__draw { width: 14px; height: 14px; fill: none; stroke: currentColor; stroke-width: 2.2; stroke-linecap: round; stroke-linejoin: round; }
.ui-sfc__draw path { stroke-dasharray: 1; stroke-dashoffset: 1; animation: ui-sfc-draw 360ms var(--ui-sfc-ease) 80ms forwards; }

/* ---- The steps on top: a thin bar per step, a small uppercase label under it ---- */
.ui-sfc__head { padding: 16px 20px 0; }
.ui-sfc__steps { position: relative; }
.ui-sfc__list { display: grid; grid-template-columns: repeat(var(--ui-sfc-n), minmax(0, 1fr)); gap: 8px; padding: 0; list-style: none; }
.ui-sfc__step { position: relative; display: grid; min-width: 0; }
.ui-sfc__step-btn {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  align-items: center;
  column-gap: 6px;
  row-gap: 6px;
  min-width: 0;
  margin: -4px;
  padding: 4px 4px 2px;
  border-radius: 6px;
  text-align: left;
  cursor: default;
  transition: background-color 100ms ease;
}
button.ui-sfc__step-btn { cursor: pointer; }
button.ui-sfc__step-btn:hover { background: var(--ui-sfc-wash); }
/* The bar fills from the left once the step is reached */
.ui-sfc__bar { position: relative; grid-column: 1 / -1; height: 2px; overflow: hidden; border-radius: 1px; background: var(--ui-sfc-line); }
.ui-sfc__bar::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: var(--ui-sfc-accent);
  transform: scaleX(0);
  transform-origin: left center;
  transition: transform 360ms var(--ui-sfc-ease);
}
.ui-sfc__step:not([data-state="upcoming"]) .ui-sfc__bar::after { transform: none; }
/* The number, or the check once the step is done – same small slot, so the label never moves */
.ui-sfc__mark {
  display: inline-flex;
  flex: none;
  align-items: center;
  justify-content: flex-start;
  min-width: 12px;
  height: 16px;
  font-size: 10px;
  font-weight: 500;
  line-height: 16px;
  font-variant-numeric: tabular-nums;
  color: var(--ui-sfc-faint);
  transition: color 200ms ease;
}
.ui-sfc__mark > span { animation: ui-sfc-in 260ms var(--ui-sfc-ease) both; }
.ui-sfc__mark .ui-sfc__draw { width: 12px; height: 12px; stroke-width: 2.4; }
.ui-sfc__step[data-state="current"] .ui-sfc__mark { color: var(--ui-sfc-accent); }
.ui-sfc__step[data-state="done"] .ui-sfc__mark { color: var(--ui-sfc-accent); }
.ui-sfc__step-label {
  overflow: hidden;
  min-width: 0;
  font-size: 10px;
  font-weight: 500;
  line-height: 16px;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: var(--ui-sfc-muted);
  transition: color 200ms ease;
}
.ui-sfc__step[data-state="done"] .ui-sfc__step-label { color: var(--ui-sfc-text); }
.ui-sfc__step[data-state="current"] .ui-sfc__step-label { color: var(--ui-sfc-strong); }
button.ui-sfc__step-btn:hover .ui-sfc__step-label { color: var(--ui-sfc-ink); }

/* Compact line for narrow screens: "STEP 2 OF 4 · TEAM" above the bars */
.ui-sfc__compact { display: none; }
.ui-sfc__compact-text {
  display: flex;
  min-width: 0;
  font-size: 10px;
  font-weight: 500;
  line-height: 16px;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  font-variant-numeric: tabular-nums;
  color: var(--ui-sfc-muted);
  white-space: nowrap;
  animation: ui-sfc-in 280ms var(--ui-sfc-ease) both;
}
.ui-sfc__compact-dot { margin: 0 6px; color: var(--ui-sfc-faint); }
.ui-sfc__compact-title { overflow: hidden; text-overflow: ellipsis; color: var(--ui-sfc-strong); }

/* ---- The step content: only this part clips and glides to each step's height ---- */
.ui-sfc__card { display: grid; min-width: 0; }
/* The panes carry a little padding so focus rings aren't cut */
.ui-sfc__viewport { position: relative; overflow: hidden; transition: height 360ms var(--ui-sfc-ease); }
.ui-sfc__pane { padding: 20px 20px 20px; animation: ui-sfc-enter 360ms var(--ui-sfc-ease) both; }
.ui-sfc__pane[data-dir="-1"] { animation-name: ui-sfc-enter-back; }
.ui-sfc__pane[data-first] { animation: none; }
.ui-sfc__pane[data-pane="leaving"] { position: absolute; top: 0; left: 0; right: 0; pointer-events: none; animation: ui-sfc-leave 280ms var(--ui-sfc-ease) both; }
.ui-sfc__pane[data-pane="leaving"][data-dir="-1"] { animation-name: ui-sfc-leave-back; }
.ui-sfc__heading { font-size: 15px; font-weight: 500; line-height: 24px; color: var(--ui-sfc-strong); outline: none; }
.ui-sfc__desc { color: var(--ui-sfc-text); text-wrap: pretty; }
.ui-sfc__body { display: grid; gap: 16px; margin-top: 16px; }

/* Fields */
.ui-sfc__field { display: grid; min-width: 0; }
.ui-sfc__label { display: flex; align-items: baseline; justify-content: space-between; gap: 8px; margin: 0 0 6px 2px; font-size: 12px; font-weight: 500; line-height: 16px; color: var(--ui-sfc-text); }
.ui-sfc__optional { font-weight: 400; color: var(--ui-sfc-muted); }
.ui-sfc__control { min-width: 0; }
.ui-sfc__input, .ui-sfc__tags {
  display: flex;
  align-items: center;
  min-width: 0;
  height: 32px;
  border-radius: 8px;
  background: var(--ui-sfc-card);
  box-shadow: var(--ui-sfc-shadow);
  transition: box-shadow 120ms ease;
  cursor: text;
}
.ui-sfc__input:hover, .ui-sfc__tags:hover { box-shadow: var(--ui-sfc-shadow-hover); }
.ui-sfc__input:focus-within, .ui-sfc__tags:focus-within { outline: 2px solid var(--ui-sfc-focus); outline-offset: 1px; }
.ui-sfc__input[data-invalid], .ui-sfc__tags[data-invalid] { box-shadow: 0 0 0 0.5px var(--ui-sfc-danger), 0 1px 2px 0 rgba(229, 72, 77, 0.08); }
.ui-sfc__input[data-invalid]:focus-within, .ui-sfc__tags[data-invalid]:focus-within { outline-color: rgba(229, 72, 77, 0.3); }
.ui-sfc__input input, .ui-sfc__tags-input {
  flex: 1;
  min-width: 0;
  height: 32px;
  margin: 0;
  padding: 0 10px;
  border: 0;
  outline: none;
  background: none;
  font: inherit;
  color: var(--ui-sfc-ink);
}
.ui-sfc__input input::placeholder, .ui-sfc__tags-input::placeholder { color: var(--ui-sfc-faint); }
.ui-sfc__prefix { flex: none; padding-left: 10px; color: var(--ui-sfc-muted); white-space: nowrap; user-select: none; }
.ui-sfc__prefix + input { padding-left: 0; }

/* Message and hint fold open and closed */
.ui-sfc__fold { display: grid; grid-template-rows: 0fr; opacity: 0; transition: grid-template-rows 260ms var(--ui-sfc-ease), opacity 200ms ease; }
.ui-sfc__fold[data-open] { grid-template-rows: 1fr; opacity: 1; }
.ui-sfc__fold > div { min-height: 0; overflow: hidden; }
.ui-sfc__msg, .ui-sfc__hint { padding: 6px 0 0 2px; font-size: 12px; line-height: 16px; text-wrap: pretty; }
.ui-sfc__msg { color: var(--ui-sfc-danger); animation: ui-sfc-in 240ms var(--ui-sfc-ease) both; }
.ui-sfc__hint { color: var(--ui-sfc-muted); }

/* Email chips: one line – the chips scroll sideways, the text field stays at the end */
.ui-sfc__tags { gap: 4px; padding: 0 4px; overflow-x: auto; overflow-y: hidden; scrollbar-width: none; overscroll-behavior-x: contain; }
.ui-sfc__tags::-webkit-scrollbar { display: none; }
.ui-sfc__chips { display: contents; padding: 0; list-style: none; }
.ui-sfc__chip {
  display: inline-flex;
  flex: none;
  align-items: center;
  gap: 2px;
  max-width: 220px;
  height: 24px;
  padding: 0 3px 0 8px;
  overflow: hidden;
  border-radius: 6px;
  background: var(--ui-sfc-fill);
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
  color: var(--ui-sfc-ink);
  white-space: nowrap;
  animation: ui-sfc-chip 260ms var(--ui-sfc-ease) both;
}
.ui-sfc__chip[data-leaving] { pointer-events: none; }
.ui-sfc__chip-text { overflow: hidden; text-overflow: ellipsis; }
.ui-sfc__chip-x { display: grid; place-items: center; flex: none; width: 18px; height: 18px; border-radius: 4px; color: var(--ui-sfc-icon); transition: background-color 100ms ease, color 100ms ease; }
.ui-sfc__chip-x .ui-sfc__glyph { width: 12px; height: 12px; stroke-width: 1.9; }
.ui-sfc__chip-x:hover { background: var(--ui-sfc-fill); color: var(--ui-sfc-ink); }
.ui-sfc__chip[data-leaving] .ui-sfc__chip-x { background: none; }
.ui-sfc__tags-input { flex: 1 0 140px; height: 24px; padding: 0 6px; }
.ui-sfc__tags-input:first-child { padding-left: 6px; }

/* Selectable cards: white with the hairline shadow; the chosen one gets a faint blue fill and a light blue hairline that moves to it */
.ui-sfc__choices { position: relative; display: grid; grid-auto-columns: minmax(0, 1fr); grid-auto-flow: column; gap: 8px; }
.ui-sfc__ring {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  border-radius: 8px;
  box-shadow: 0 0 0 0.5px var(--ui-sfc-accent-line);
  opacity: 0;
  pointer-events: none;
  transition: transform 260ms var(--ui-sfc-ease), width 260ms var(--ui-sfc-ease), height 260ms var(--ui-sfc-ease), opacity 160ms ease;
}
.ui-sfc__choice {
  position: relative;
  display: grid;
  align-content: start;
  gap: 2px;
  min-width: 0;
  padding: 10px 12px 12px;
  border-radius: 8px;
  background: var(--ui-sfc-card);
  box-shadow: var(--ui-sfc-shadow);
  text-align: left;
  transition: background-color 100ms ease;
}
.ui-sfc__choice:hover { background: var(--ui-sfc-wash-soft); }
.ui-sfc__choice[aria-checked="true"] { background: var(--ui-sfc-accent-fill); }
.ui-sfc__choice:focus-visible { outline-offset: 3px; }
.ui-sfc__choice-top { display: flex; align-items: center; gap: 6px; min-width: 0; }
.ui-sfc__choice-title { overflow: hidden; font-weight: 500; color: var(--ui-sfc-strong); white-space: nowrap; text-overflow: ellipsis; }
.ui-sfc__badge { flex: none; padding: 0 5px; border-radius: 5px; background: var(--ui-sfc-accent-soft); font-size: 11px; font-weight: 500; line-height: 16px; color: var(--ui-sfc-accent); }
.ui-sfc__radio { position: relative; flex: none; width: 14px; height: 14px; margin-left: auto; border-radius: 50%; box-shadow: inset 0 0 0 1px var(--ui-sfc-fill-strong); transition: box-shadow 200ms ease; }
.ui-sfc__radio::after { content: ""; position: absolute; inset: 3.5px; border-radius: 50%; background: var(--ui-sfc-accent); transform: scale(0); transition: transform 280ms cubic-bezier(0.34, 1.56, 0.64, 1); }
.ui-sfc__choice[aria-checked="true"] .ui-sfc__radio { box-shadow: inset 0 0 0 1px var(--ui-sfc-accent); }
.ui-sfc__choice[aria-checked="true"] .ui-sfc__radio::after { transform: scale(1); }
.ui-sfc__choice-aside { font-variant-numeric: tabular-nums; color: var(--ui-sfc-ink); }
.ui-sfc__choice-desc { margin-top: 2px; font-size: 12px; line-height: 16px; color: var(--ui-sfc-text); text-wrap: pretty; }

/* Review: rows under hairlines */
.ui-sfc__review { display: grid; border-radius: 8px; box-shadow: var(--ui-sfc-shadow); }
.ui-sfc__review-row { display: grid; grid-template-columns: 96px minmax(0, 1fr) auto; align-items: baseline; gap: 12px; padding: 10px 8px 10px 12px; }
.ui-sfc__review-row + .ui-sfc__review-row { border-top: 0.5px solid var(--ui-sfc-line); }
.ui-sfc__review dt { font-size: 12px; line-height: 20px; color: var(--ui-sfc-muted); }
.ui-sfc__review dd { min-width: 0; color: var(--ui-sfc-ink); overflow-wrap: break-word; }
.ui-sfc__edit { height: 24px; margin: -2px 0; padding: 0 8px; border-radius: 6px; font-size: 12px; font-weight: 500; line-height: 16px; color: var(--ui-sfc-text); transition: background-color 100ms ease, color 100ms ease; }
.ui-sfc__edit:hover { background: var(--ui-sfc-wash); color: var(--ui-sfc-ink); }

/* Success */
.ui-sfc__success { display: grid; justify-items: center; padding: 16px 0 8px; text-align: center; }
.ui-sfc__success-check {
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  margin-bottom: 12px;
  border-radius: 50%;
  background: var(--ui-sfc-ok-soft);
  color: var(--ui-sfc-ok);
  animation: ui-sfc-pop 520ms cubic-bezier(0.34, 1.56, 0.64, 1) 120ms both;
}
.ui-sfc__success-check .ui-sfc__draw { width: 18px; height: 18px; stroke-width: 2; }
.ui-sfc__success-check .ui-sfc__draw path { animation-delay: 320ms; }
.ui-sfc__success .ui-sfc__heading { animation: ui-sfc-in 340ms var(--ui-sfc-ease) 220ms both; }
.ui-sfc__success .ui-sfc__desc { max-width: 40ch; text-wrap: balance; animation: ui-sfc-in 340ms var(--ui-sfc-ease) 290ms both; }
.ui-sfc__success-actions { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px; margin-top: 16px; animation: ui-sfc-in 340ms var(--ui-sfc-ease) 360ms both; }

/* ---- The last row of the card: Back and Continue under a hairline; sticks to the bottom in long pages ---- */
.ui-sfc__foot-fold { position: sticky; bottom: 0; z-index: 3; display: grid; grid-template-rows: 1fr; border-radius: 0 0 10px 10px; background: var(--ui-sfc-card); transition: grid-template-rows 340ms var(--ui-sfc-ease), opacity 200ms ease; }
.ui-sfc__foot-fold[data-hidden] { grid-template-rows: 0fr; opacity: 0; }
.ui-sfc__foot { display: flex; align-items: center; gap: 12px; min-height: 0; overflow: hidden; padding: 0 12px; border-top: 0.5px solid var(--ui-sfc-line); }
/* The row's height lives on a pseudo spacer so the fold can still close it to 0 */
.ui-sfc__foot::before { content: ""; flex: none; width: 0; height: 48px; margin-right: -12px; }
.ui-sfc__btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: none;
  height: 28px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  line-height: 20px;
  white-space: nowrap;
  transition: background-color 100ms ease, opacity 200ms ease, transform 120ms ease, width 300ms var(--ui-sfc-ease), visibility 200ms;
}
/* Secondary: white with the hairline shadow */
.ui-sfc__btn-ghost, .ui-sfc__btn-secondary { gap: 6px; padding: 0 10px 0 8px; background: var(--ui-sfc-card); box-shadow: var(--ui-sfc-shadow); color: var(--ui-sfc-strong); }
.ui-sfc__btn-secondary { padding: 0 10px; }
.ui-sfc__btn-ghost .ui-sfc__glyph { color: var(--ui-sfc-icon); }
.ui-sfc__btn-ghost:hover, .ui-sfc__btn-secondary:hover { background: var(--ui-sfc-white-hover); }
.ui-sfc__btn-ghost[data-hidden] { opacity: 0; visibility: hidden; }
/* Primary: the dark chip */
.ui-sfc__btn-primary { margin-left: auto; overflow: hidden; background: var(--ui-sfc-chip); color: var(--ui-sfc-on-chip); }
.ui-sfc__btn-primary:hover { background: var(--ui-sfc-chip-hover); }
.ui-sfc__btn:active { transform: scale(0.97); }
/* Not ready yet: dimmed, but still answers a press with the messages */
.ui-sfc__btn-primary[aria-disabled="true"] { opacity: 0.35; }
.ui-sfc__btn-primary[data-busy] { opacity: 0.7; cursor: progress; }
.ui-sfc__btn-inner { display: inline-flex; flex: none; align-items: center; gap: 6px; padding: 0 10px; }
.ui-sfc__btn-label { animation: ui-sfc-in 240ms var(--ui-sfc-ease) both; }
.ui-sfc__spinner { width: 12px; height: 12px; border-radius: 50%; border: 1.5px solid currentColor; border-right-color: transparent; animation: ui-sfc-spin 700ms linear infinite; }
.ui-sfc__submit-error { min-width: 0; font-size: 12px; line-height: 16px; color: var(--ui-sfc-danger); animation: ui-sfc-in 240ms var(--ui-sfc-ease) both; }

@keyframes ui-sfc-in { from { opacity: 0; transform: translateY(3px); filter: blur(2px); } to { opacity: 1; transform: none; filter: none; } }
@keyframes ui-sfc-enter { from { opacity: 0; transform: translateX(24px); } to { opacity: 1; transform: none; } }
@keyframes ui-sfc-enter-back { from { opacity: 0; transform: translateX(-24px); } to { opacity: 1; transform: none; } }
@keyframes ui-sfc-leave { to { opacity: 0; transform: translateX(-24px); } }
@keyframes ui-sfc-leave-back { to { opacity: 0; transform: translateX(24px); } }
@keyframes ui-sfc-draw { to { stroke-dashoffset: 0; } }
@keyframes ui-sfc-pop { 0% { opacity: 0; transform: scale(0.4); } 60% { opacity: 1; transform: scale(1.08); } 100% { opacity: 1; transform: scale(1); } }
@keyframes ui-sfc-chip { from { opacity: 0; transform: scale(0.85); } to { opacity: 1; transform: none; } }
@keyframes ui-sfc-spin { to { transform: rotate(360deg); } }

/* Narrow (phones): the compact line over the bars, cards as rows, stacked review rows */
@container (max-width: 420px) {
  .ui-sfc__head { padding: 14px 16px 0; }
  .ui-sfc__compact { display: flex; margin-bottom: 8px; }
  .ui-sfc__step-btn { row-gap: 0; padding-bottom: 4px; }
  .ui-sfc__mark, .ui-sfc__step-label { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
  .ui-sfc__pane { padding: 16px 16px 16px; }
  .ui-sfc__foot { padding: 0 12px; }
  .ui-sfc__choices { grid-template-columns: minmax(0, 1fr); grid-auto-flow: row; }
  .ui-sfc__choice { grid-template-columns: minmax(0, 1fr) auto; column-gap: 10px; padding: 10px 12px; }
  .ui-sfc__choice-top { grid-column: 1; }
  .ui-sfc__choice-aside { grid-column: 2; grid-row: 1; align-self: center; }
  .ui-sfc__choice-desc { grid-column: 1 / -1; margin-top: 0; }
  .ui-sfc__radio { order: -1; margin-left: 0; margin-right: 2px; }
  .ui-sfc__review-row { grid-template-columns: minmax(0, 1fr) auto; row-gap: 0; }
  .ui-sfc__review dt { grid-column: 1; }
  .ui-sfc__review dd { grid-column: 1; grid-row: 2; }
  .ui-sfc__edit { grid-column: 2; grid-row: 1 / span 2; align-self: center; margin: 0; }
}
/* Touch screens: 16px fields (no zoom on iOS) and taller targets */
@media (hover: none) and (pointer: coarse) {
  .ui-sfc__input input, .ui-sfc__tags-input, .ui-sfc__prefix { font-size: 16px; }
  .ui-sfc__input, .ui-sfc__tags, .ui-sfc__input input { height: 40px; }
  .ui-sfc__chip { height: 30px; }
  .ui-sfc__chip-x { width: 26px; height: 26px; }
  .ui-sfc__tags-input { height: 30px; }
  .ui-sfc__btn { height: 36px; }
  .ui-sfc__foot::before { height: 56px; }
  .ui-sfc__edit { height: 34px; padding: 0 12px; }
  .ui-sfc__step-btn { padding-top: 10px; padding-bottom: 8px; margin: -10px -4px -8px; }
}
@media (prefers-reduced-motion: reduce) {
  .ui-sfc *, .ui-sfc *::before, .ui-sfc *::after { animation-duration: 1ms !important; animation-delay: 0ms !important; transition: none !important; }
}

/* Dark mode: follows a .dark class or data-theme="dark" on any ancestor, e.g. <html> */
:where(.dark, [data-theme="dark"]) .ui-sfc {
  --ui-sfc-card: #1c1c1e;
  --ui-sfc-ink: rgba(255, 255, 255, 0.9);
  --ui-sfc-strong: #ffffff;
  --ui-sfc-text: rgba(255, 255, 255, 0.62);
  --ui-sfc-muted: rgba(255, 255, 255, 0.46);
  --ui-sfc-faint: rgba(255, 255, 255, 0.3);
  --ui-sfc-icon: rgba(255, 255, 255, 0.5);
  --ui-sfc-line: rgba(255, 255, 255, 0.08);
  --ui-sfc-fill: rgba(255, 255, 255, 0.08);
  --ui-sfc-fill-strong: rgba(255, 255, 255, 0.16);
  --ui-sfc-wash: rgba(255, 255, 255, 0.04);
  --ui-sfc-wash-soft: rgba(255, 255, 255, 0.025);
  --ui-sfc-accent: #4d8dff;
  --ui-sfc-accent-soft: rgba(77, 141, 255, 0.14);
  --ui-sfc-accent-fill: rgba(77, 141, 255, 0.09);
  --ui-sfc-accent-line: rgba(77, 141, 255, 0.5);
  --ui-sfc-ok: #3ec27a;
  --ui-sfc-ok-soft: rgba(62, 194, 122, 0.14);
  --ui-sfc-danger: #ff6369;
  --ui-sfc-chip: rgba(255, 255, 255, 0.9);
  --ui-sfc-chip-hover: rgba(255, 255, 255, 0.8);
  --ui-sfc-on-chip: #111113;
  --ui-sfc-white-hover: #232326;
  --ui-sfc-focus: rgba(77, 141, 255, 0.5);
  --ui-sfc-shadow: 0 0 0 0.5px rgba(255, 255, 255, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.4);
  --ui-sfc-shadow-hover: 0 0 0 0.5px rgba(255, 255, 255, 0.16), 0 1px 2px 0 rgba(0, 0, 0, 0.4);
}
`;
var cleanSlugify = (value) =>
  value
    .toLowerCase()
    .normalize(`NFKD`)
    .replace(/[̀-ͯ]/g, ``)
    .replace(/[^a-z0-9]+/g, `-`)
    .replace(/^-+|-+$/g, ``)
    .slice(0, 32);
var cleanPlanOptions = [
  {
    value: `free`,
    title: `Free`,
    aside: `$0`,
    description: `Up to 3 members and 5 projects`,
  },
  {
    value: `pro`,
    title: `Pro`,
    aside: `$12\xA0/\xA0seat`,
    description: `Unlimited projects, guests and history`,
    badge: `Popular`,
  },
  {
    value: `business`,
    title: `Business`,
    aside: `$24\xA0/\xA0seat`,
    description: `SSO, audit log and priority support`,
  },
];
var cleanDemoWorkspaceName = `Northwind Studio`;
function CleanWorkspaceFields({ ctx: context, autoplay: autoplay }) {
  let { values: values, setValues: setValues } = context,
    timeoutRef = React.useRef(0),
    stopAutoplay = () => {
      (clearTimeout(timeoutRef.current), (autoplay.current = false));
    },
    setName = (e) =>
      setValues({
        name: e,
        ...(values.slugEdited
          ? {}
          : {
              slug: cleanSlugify(e),
            }),
      });
  return (
    React.useEffect(() => {
      if (!autoplay.current) return;
      let e = 0,
        n = () => {
          ((e += 1),
            setValues({
              name: cleanDemoWorkspaceName.slice(0, e),
              slug: cleanSlugify(cleanDemoWorkspaceName.slice(0, e)),
            }),
            e < 16
              ? (timeoutRef.current = window.setTimeout(n, 55 + Math.random() * 45))
              : (autoplay.current = false));
        };
      return (
        (timeoutRef.current = window.setTimeout(n, 650)),
        () => clearTimeout(timeoutRef.current)
      );
    }, []),
    (
      <>
        <CleanField name={`name`} label={`Workspace name`}>
          <CleanInput
            value={values.name}
            placeholder={`Acme Inc.`}
            maxLength={48}
            onFocus={stopAutoplay}
            onChange={(e) => setName(e.target.value)}
          />
        </CleanField>
        <CleanField
          name={`slug`}
          label={`Workspace URL`}
          hint={`Lowercase letters, numbers and dashes`}
        >
          <CleanInput
            prefix={`affect.app/`}
            value={values.slug}
            placeholder={`acme`}
            maxLength={32}
            onFocus={stopAutoplay}
            onChange={(e) =>
              setValues({
                slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ``),
                slugEdited: true,
              })
            }
          />
        </CleanField>
      </>
    )
  );
}
function StepperFormCleanDemo() {
  let autoplayRef = React.useRef(true);
  return (
    <div className={`stepper-form-demo`}>
      <StepperFormClean
        steps={[
          {
            id: `workspace`,
            title: `Workspace`,
            heading: `Name your workspace`,
            description: `This is where your team's projects live.`,
            render: (t) => <CleanWorkspaceFields ctx={t} autoplay={autoplayRef} />,
            validate: (e) => ({
              name: e.name.trim().length < 2 ? `Give your workspace a name` : void 0,
              slug: e.slug.length < 3 ? `Use at least 3 characters` : void 0,
            }),
          },
          {
            id: `team`,
            title: `Team`,
            heading: `Invite your teammates`,
            description: `They'll get an email with a link to join.`,
            render: ({ values: e, setValues: t }) => (
              <CleanField
                name={`invites`}
                label={`Email addresses`}
                hint={`Press Enter or comma to add`}
                optional={true}
              >
                <CleanEmailTags
                  value={e.invites}
                  max={20}
                  onChange={(e) =>
                    t({
                      invites: e,
                    })
                  }
                />
              </CleanField>
            ),
          },
          {
            id: `plan`,
            title: `Plan`,
            heading: `Pick a plan`,
            description: `Every plan starts with a 14‑day trial.`,
            render: ({ values: e, setValues: t }) => (
              <CleanChoiceCards
                label={`Plan`}
                value={e.plan}
                options={cleanPlanOptions}
                onChange={(e) =>
                  t({
                    plan: e,
                  })
                }
              />
            ),
          },
          {
            id: `review`,
            title: `Review`,
            heading: `Review and create`,
            description: `Everything can be changed later in settings.`,
            render: ({ values: e, goTo: t }) => {
              let n = cleanPlanOptions.find((t) => t.value === e.plan),
                i = e.invites.length;
              return (
                <CleanReview
                  onEdit={t}
                  rows={[
                    {
                      label: `Workspace`,
                      value: (
                        <>
                          {e.name}
                          <span className={`sfc-demo__sub`}>
                            {`affect.app/`}
                            {e.slug}
                          </span>
                        </>
                      ),
                      step: `workspace`,
                    },
                    {
                      label: `Teammates`,
                      value: i ? (
                        <>
                          {i}
                          {` `}
                          {i === 1 ? `invite` : `invites`}
                          <span className={`sfc-demo__sub`}>{e.invites.join(`, `)}</span>
                        </>
                      ) : (
                        `Just you for now`
                      ),
                      step: `team`,
                    },
                    {
                      label: `Plan`,
                      value: (
                        <>
                          {n.title}
                          <span className={`sfc-demo__muted`}>
                            {` · `}
                            {n.aside}
                          </span>
                        </>
                      ),
                      step: `plan`,
                    },
                  ]}
                />
              );
            },
          },
        ]}
        initialValues={{
          name: ``,
          slug: ``,
          slugEdited: false,
          invites: [],
          plan: `pro`,
        }}
        submitLabel={`Create workspace`}
        onComplete={() => new Promise((e) => setTimeout(e, 1100))}
        success={(t, n) => (
          <CleanSuccess
            title={`${t.name} is ready`}
            description={
              t.invites.length
                ? `${t.invites.length} ${t.invites.length === 1 ? `invite is` : `invites are`} on the way. Your trial runs for 14\u00a0days.`
                : `Your trial runs for 14\xA0days.`
            }
          >
            <button
              type={`button`}
              className={`ui-sfc__btn ui-sfc__btn-secondary`}
              onClick={() => {
                ((autoplayRef.current = true), n());
              }}
            >{`Start over`}</button>
          </CleanSuccess>
        )}
      />
    </div>
  );
}
export default StepperFormCleanDemo;
export { StepperFormClean as PlicoCore_m };
export { StepperFormCleanDemo as PlicoDemo_D };

export { CleanField as PlicoApi_StepperField };

export { CleanInput as PlicoApi_StepperInput };

export { CleanEmailTags as PlicoApi_StepperTags };

export { CleanChoiceCards as PlicoApi_StepperChoices };

export { CleanReview as PlicoApi_StepperReview };

"use client";

import * as React from "react";
export type FormValues = Record<string, unknown>;
export type FormErrors = Record<string, string | undefined>;
export interface StepContext<T extends object = FormValues> {
  values: T;
  setValues: (patch: Partial<T>) => void;
  errors: FormErrors;
  goTo: (id: string) => void;
  next: () => void;
}
export interface Step<T extends object = FormValues> {
  id: string;
  title: string;
  heading?: string;
  description?: string;
  validate?: (values: T) => FormErrors;
  render: (context: StepContext<T>) => React.ReactNode;
}
interface FormContextValue {
  errors: FormErrors;
  shake: number;
  report: (name: string, error: string | null | undefined) => void;
}
interface FieldContextValue {
  id: string;
  invalid: boolean;
  describedBy?: string;
  flag: (error: string | null) => void;
}
interface StepperFieldProps {
  name: string;
  label: React.ReactNode;
  hint?: React.ReactNode;
  optional?: boolean;
  children?: React.ReactNode;
}
interface StepperInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "prefix"> {
  prefix?: React.ReactNode;
}
interface StepperTagsProps {
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  validate?: (value: string, values: string[]) => string | null;
  max?: number;
}
interface StepperChoicesProps {
  value: string;
  onChange: (value: string) => void;
  options: {
    value: string;
    title: string;
    badge?: string;
    aside?: React.ReactNode;
    description?: string;
  }[];
  label?: string;
}
interface WorkspaceValues {
  name: string;
  slug: string;
  slugEdited: boolean;
  invites: string[];
  plan: string;
}
export interface StepperFormProps<T extends object = FormValues> {
  steps: Step<T>[];
  initialValues: T;
  onComplete?: (values: T) => void | Promise<void>;
  initialStep?: number;
  step?: number;
  onStepChange?: (step: number) => void;
  submitLabel?: string;
  submittingLabel?: string;
  success?: (values: T, reset: () => void) => React.ReactNode;
  className?: string;
}
var classNames = (...e: (string | false | null | undefined)[]) => e.filter(Boolean).join(` `);
var hasErrors = (
  errors:
    | {
        [s: string]: unknown;
      }
    | ArrayLike<unknown>
    | undefined,
) => !!errors && Object.values(errors).some(Boolean);
var prefersReducedMotion = () =>
  typeof window < `u` && window.matchMedia(`(prefers-reduced-motion: reduce)`).matches;
function shakeElement(element: HTMLDivElement | null) {
  element &&
    !prefersReducedMotion() &&
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
function positionSelectionRing(
  container: HTMLDivElement | null,
  ring: HTMLSpanElement | null,
  selector: string,
) {
  if (!container || !ring) return;
  let selected = container.querySelector<HTMLElement>(selector);
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
var StepperIcon = ({ d: path, className: className }: { d: string; className?: string }) => (
  <svg viewBox={`0 0 24 24`} className={classNames(`ui-sf__glyph`, className)} aria-hidden={`true`}>
    <path d={path} />
  </svg>
);
var iconPaths = {
  check: `M5.5 12.5l4 4L18.5 8`,
  close: `M7 7l10 10M17 7 7 17`,
  back: `M14.5 6l-6 6 6 6`,
};
var DrawnCheck = ({ className: className }: { className?: string }) => (
  <svg viewBox={`0 0 24 24`} className={classNames(`ui-sf__draw`, className)} aria-hidden={`true`}>
    <path d={iconPaths.check} pathLength={1} />
  </svg>
);
var FormContext = React.createContext<FormContextValue>({
  errors: {},
  shake: 0,
  report: () => {},
});
var FieldContext = React.createContext<FieldContextValue | null>(null);
function StepperForm<T extends object>({
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
}: StepperFormProps<T>) {
  let stepCount = steps.length,
    [localStep, setLocalStep] = React.useState(initialStep),
    activeStep = Math.max(0, Math.min(stepCount - 1, step ?? localStep)),
    [values, setValuesState] = React.useState(initialValues),
    valuesRef = React.useRef(values),
    [furthestStep, setFurthestStep] = React.useState(activeStep),
    maxVisited = Math.max(furthestStep, activeStep),
    [attemptedSteps, setAttemptedSteps] = React.useState<Record<number, boolean>>({}),
    [shake, setShake] = React.useState(0),
    [returnTo, setReturnTo] = React.useState<number | null>(null),
    [submitting, setSubmitting] = React.useState(false),
    [submitError, setSubmitError] = React.useState(``),
    [completed, setCompleted] = React.useState<boolean>(false),
    [announcement, setAnnouncement] = React.useState(``),
    formRef = React.useRef<HTMLFormElement | null>(null),
    viewportRef = React.useRef<HTMLDivElement | null>(null),
    submitButtonRef = React.useRef<HTMLButtonElement | null>(null),
    submitLabelRef = React.useRef<HTMLSpanElement | null>(null),
    focusNextRef = React.useRef(false),
    hasNavigatedRef = React.useRef(false),
    reportedErrorsRef = React.useRef<FormErrors>({}),
    reportError = React.useCallback((e: string, t: string | null | undefined) => {
      reportedErrorsRef.current = {
        ...reportedErrorsRef.current,
        [e]: t ?? void 0,
      };
    }, []),
    instanceId = React.useId(),
    pageIndex = completed ? stepCount : activeStep,
    [transition, setTransition] = React.useState<{
      index: number;
      from: number | null;
      dir: number;
    }>({
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
  let patchValues = React.useCallback((e: Partial<T>) => {
      ((valuesRef.current = {
        ...valuesRef.current,
        ...e,
      }),
        setValuesState(valuesRef.current));
    }, []),
    navigate = (index: number) => {
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
      return hasErrors(t)
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
    handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
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
    handleBack: React.MouseEventHandler<HTMLButtonElement> = () => {
      (setReturnTo(null), navigate(activeStep - 1));
    },
    goTo = (id: string) => {
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
    let e = viewportRef.current?.querySelector<HTMLElement>(`[data-pane="current"]`);
    (
      e?.querySelector<HTMLElement>(
        `input:not([type="hidden"]):not(:disabled), textarea, select`,
      ) ?? e?.querySelector<HTMLElement>(`.ui-sf__heading`)
    )?.focus({
      preventScroll: true,
    });
  }, [pageIndex]),
    React.useEffect(() => {
      shake &&
        viewportRef.current
          ?.querySelector<HTMLElement>(`[data-pane="current"] [aria-invalid="true"]`)
          ?.focus({
            preventScroll: true,
          });
    }, [shake]),
    React.useLayoutEffect(() => {
      let e = viewportRef.current,
        t = e?.querySelector<HTMLElement>(`[data-pane="current"]`);
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
    ready = !hasErrors(activeDefinition.validate?.(values)),
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
    renderStep = (index: number) => {
      if (index >= stepCount)
        return success ? (
          success(values, reset)
        ) : (
          <Success
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
          <h2 className={`ui-sf__heading`} tabIndex={-1} id={`${instanceId}-h${index}`}>
            {definition.heading ?? definition.title}
          </h2>
          {definition.description && <p className={`ui-sf__desc`}>{definition.description}</p>}
          <div className={`ui-sf__body`}>{definition.render(context)}</div>
        </>
      );
    },
    panes =
      transition.from !== null && transition.from !== transition.index
        ? [transition.from, transition.index]
        : [transition.index];
  return (
    <div
      className={classNames(`ui-sf`, className)}
      style={
        {
          "--ui-sf-n": stepCount,
        } as React.CSSProperties
      }
    >
      <style href={`ui-stepper-form`} precedence={`default`}>
        {stepperFormStyles}
      </style>
      <div className={`ui-sf__head`}>
        <div className={`ui-sf__steps`}>
          <ol className={`ui-sf__list`} aria-label={`Progress`}>
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
                    <span className={`ui-sf__mark`}>
                      {n === `done` ? (
                        <DrawnCheck key={`check`} />
                      ) : (
                        <span key={`num`}>
                          {t + 1}
                          {`.`}
                        </span>
                      )}
                    </span>
                    <span className={`ui-sf__step-label`}>{e.title}</span>
                    <span className={`ui-sf__sr`}>
                      {n === `done` ? ` (done)` : n === `current` ? ` (current)` : ``}
                    </span>
                  </>
                );
              return (
                <li
                  className={`ui-sf__step`}
                  data-state={n}
                  aria-current={!completed && t === activeStep ? `step` : void 0}
                  key={e.id}
                >
                  {i ? (
                    <button
                      type={`button`}
                      className={`ui-sf__step-btn`}
                      onClick={() => goTo(e.id)}
                    >
                      {a}
                    </button>
                  ) : (
                    <span className={`ui-sf__step-btn`}>{a}</span>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
        <div className={`ui-sf__compact`} aria-hidden={`true`}>
          <span className={`ui-sf__compact-text`} key={completed ? `done` : activeStep}>
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
                <span className={`ui-sf__compact-dot`}>{`·`}</span>
                <span className={`ui-sf__compact-title`}>{activeDefinition.title}</span>
              </>
            )}
          </span>
        </div>
      </div>
      <form
        ref={formRef}
        className={`ui-sf__card`}
        noValidate={true}
        onSubmit={handleSubmit}
        aria-labelledby={completed ? void 0 : `${instanceId}-h${activeStep}`}
      >
        <div ref={viewportRef} className={`ui-sf__viewport`}>
          {panes.map((e) => {
            let t = e === transition.index;
            return (
              <div
                className={`ui-sf__pane`}
                data-pane={t ? `current` : `leaving`}
                data-dir={transition.dir}
                data-first={!hasNavigatedRef.current || void 0}
                inert={!t}
                aria-hidden={!t || void 0}
                key={e}
              >
                <FormContext.Provider
                  value={{
                    errors: t && e === activeStep ? errors : {},
                    shake: t ? shake : 0,
                    report: reportError,
                  }}
                >
                  {renderStep(e)}
                </FormContext.Provider>
              </div>
            );
          })}
        </div>
        <div className={`ui-sf__foot-fold`} data-hidden={completed || void 0}>
          <div className={`ui-sf__foot`} inert={completed}>
            <button
              type={`button`}
              className={`ui-sf__btn ui-sf__btn-ghost`}
              data-hidden={activeStep === 0 || void 0}
              disabled={activeStep === 0 || submitting}
              onClick={handleBack}
            >
              <StepperIcon d={iconPaths.back} />
              {`Back`}
            </button>
            {submitError && (
              <span className={`ui-sf__submit-error`} role={`alert`}>
                {submitError}
              </span>
            )}
            <button
              ref={submitButtonRef}
              type={`submit`}
              className={`ui-sf__btn ui-sf__btn-primary`}
              aria-disabled={!ready || submitting || void 0}
              data-busy={submitting || void 0}
            >
              <span ref={submitLabelRef} className={`ui-sf__btn-inner`}>
                {submitting && <span className={`ui-sf__spinner`} aria-hidden={`true`} />}
                <span className={`ui-sf__btn-label`} key={buttonLabel}>
                  {buttonLabel}
                </span>
              </span>
            </button>
          </div>
        </div>
      </form>
      <span className={`ui-sf__sr`} aria-live={`polite`}>
        {announcement}
      </span>
    </div>
  );
}
function StepperField({
  name: name,
  label: label,
  hint: hint,
  optional: optional,
  children: children,
}: StepperFieldProps) {
  let { errors: errors, shake: shake, report: report } = React.useContext(FormContext),
    [localError, setLocalError] = React.useState<string | null>(null),
    [localShake, setLocalShake] = React.useState(0),
    instanceId = React.useId(),
    controlRef = React.useRef<HTMLDivElement | null>(null),
    error = errors[name] ?? localError ?? ``,
    previousErrorRef = React.useRef(error);
  error && (previousErrorRef.current = error);
  let invalid = !!error;
  (React.useEffect(() => {
    shake && (errors[name] || localError) && shakeElement(controlRef.current);
  }, [shake]),
    React.useEffect(() => {
      localShake && shakeElement(controlRef.current);
    }, [localShake]));
  let flag = React.useCallback(
    (t: string | null) => {
      (setLocalError(t), report(name, t), t && setLocalShake((e) => e + 1));
    },
    [name, report],
  );
  return (
    <div className={`ui-sf__field`} data-invalid={invalid || void 0}>
      <label className={`ui-sf__label`} htmlFor={instanceId}>
        {label}
        {optional && <span className={`ui-sf__optional`}>{`Optional`}</span>}
      </label>
      <div ref={controlRef} className={`ui-sf__control`}>
        <FieldContext.Provider
          value={{
            id: instanceId,
            invalid: invalid,
            describedBy: invalid ? `${instanceId}-msg` : hint ? `${instanceId}-hint` : void 0,
            flag: flag,
          }}
        >
          {children}
        </FieldContext.Provider>
      </div>
      <div className={`ui-sf__fold`} data-open={invalid || void 0}>
        <div>
          <p className={`ui-sf__msg`} id={`${instanceId}-msg`} key={previousErrorRef.current}>
            {previousErrorRef.current}
          </p>
        </div>
      </div>
      {hint && (
        <div className={`ui-sf__fold`} data-open={!invalid || void 0}>
          <div>
            <p className={`ui-sf__hint`} id={`${instanceId}-hint`}>
              {hint}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
function StepperInput({ prefix: prefix, className: className, ...inputProps }: StepperInputProps) {
  let field = React.useContext(FieldContext);
  return (
    <div className={classNames(`ui-sf__input`, className)} data-invalid={field?.invalid || void 0}>
      {prefix && (
        <span className={`ui-sf__prefix`} aria-hidden={`true`}>
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
var emailPattern = /^[^\s@,;]+@[^\s@,;]+\.[^\s@,;]{2,}$/;
function StepperTags({
  value: value,
  onChange: onChange,
  placeholder = `name@company.com`,
  validate = (e, t) =>
    emailPattern.test(e)
      ? t.includes(e)
        ? `Already on the list`
        : null
      : `That doesn't look like an email address`,
  max: max,
}: StepperTagsProps) {
  let field = React.useContext(FieldContext),
    [draft, setDraft] = React.useState<string>(``),
    [removing, setRemoving] = React.useState<string[]>([]),
    inputRef = React.useRef<HTMLInputElement | null>(null),
    chipsRef = React.useRef<HTMLUListElement | null>(null),
    valueRef = React.useRef(value);
  valueRef.current = value;
  let commit = (e: string) => {
      let n = e
        .split(/[\s,;]+/)
        .map((e) => e.trim().toLowerCase())
        .filter(Boolean);
      if (!n.length) return true;
      let r = [...valueRef.current],
        i = [],
        o: string | null = null;
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
    remove = (e: string) => {
      if (removing.includes(e)) return;
      setRemoving((t) => [...t, e]);
      let n = chipsRef.current?.querySelector<HTMLElement>(`[data-entry="${CSS.escape(e)}"]`),
        r = () => {
          (setRemoving((t) => t.filter((t) => t !== e)),
            onChange(valueRef.current.filter((t: string) => t !== e)));
        };
      n && typeof n.animate === "function" && !prefersReducedMotion()
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
      className={`ui-sf__tags`}
      data-invalid={field?.invalid || void 0}
      onClick={(e) => e.target === e.currentTarget && inputRef.current?.focus()}
    >
      {value.length > 0 && (
        <ul ref={chipsRef} className={`ui-sf__chips`} aria-label={`Added`}>
          {value.map((e) => (
            <li
              className={`ui-sf__chip`}
              data-entry={e}
              data-leaving={removing.includes(e) || void 0}
              key={e}
            >
              <span className={`ui-sf__chip-text`} title={e}>
                {e}
              </span>
              <button
                type={`button`}
                className={`ui-sf__chip-x`}
                aria-label={`Remove ${e}`}
                onClick={() => remove(e)}
              >
                <StepperIcon d={iconPaths.close} />
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
        className={`ui-sf__tags-input`}
        placeholder={value.length ? `Add another` : placeholder}
        value={draft}
        aria-invalid={field?.invalid || void 0}
        aria-describedby={field?.describedBy}
        onChange={(e) => {
          (setDraft(e.target.value), field?.flag(null));
        }}
        onKeyDown={(t) => {
          (t.key === `Enter` && draft.trim()) || t.key === `,` || t.key === `;`
            ? (t.preventDefault(), commit(draft))
            : t.key === `Backspace` &&
              !draft &&
              value.length &&
              (t.preventDefault(), remove(value[value.length - 1]));
        }}
        onPaste={(e) => {
          let t = e.clipboardData.getData(`text`);
          /[\s,;]/.test(t.trim()) && (e.preventDefault(), commit(`${draft} ${t}`));
        }}
        onBlur={() => draft.trim() && commit(draft)}
      />
    </div>
  );
}
function StepperChoices({
  value: value,
  onChange: onChange,
  options: options,
  label: label,
}: StepperChoicesProps) {
  let choicesRef = React.useRef<HTMLDivElement | null>(null),
    ringRef = React.useRef<HTMLSpanElement | null>(null);
  return (
    React.useLayoutEffect(() => {
      positionSelectionRing(choicesRef.current, ringRef.current, `[aria-checked="true"]`);
    }),
    React.useEffect(() => {
      let e = choicesRef.current;
      if (!e) return;
      let t = new ResizeObserver(() =>
        positionSelectionRing(e, ringRef.current, `[aria-checked="true"]`),
      );
      return (t.observe(e), () => t.disconnect());
    }, []),
    (
      <div
        ref={choicesRef}
        className={`ui-sf__choices`}
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
              choicesRef.current
                ?.querySelector<HTMLElement>(`[data-value="${CSS.escape(e.value)}"]`)
                ?.focus());
          } else
            n.key === `Enter` &&
              (n.preventDefault(), n.currentTarget.closest(`form`)?.requestSubmit());
        }}
      >
        <span ref={ringRef} className={`ui-sf__ring`} aria-hidden={`true`} />
        {options.map((n) => {
          let i = n.value === value;
          return (
            <button
              type={`button`}
              role={`radio`}
              aria-checked={i}
              tabIndex={i ? 0 : -1}
              data-value={n.value}
              className={`ui-sf__choice`}
              onClick={() => onChange(n.value)}
              key={n.value}
            >
              <span className={`ui-sf__choice-top`}>
                <span className={`ui-sf__choice-title`}>{n.title}</span>
                {n.badge && <span className={`ui-sf__badge`}>{n.badge}</span>}
                <span className={`ui-sf__radio`} aria-hidden={`true`} />
              </span>
              {n.aside && <span className={`ui-sf__choice-aside`}>{n.aside}</span>}
              {n.description && <span className={`ui-sf__choice-desc`}>{n.description}</span>}
            </button>
          );
        })}
      </div>
    )
  );
}
function StepperReview({
  rows: rows,
  onEdit: onEdit,
}: {
  rows: { label: string; value: React.ReactNode; step?: string }[];
  onEdit?: (id: string) => void;
}) {
  return (
    <dl className={`ui-sf__review`}>
      {rows.map((e) => (
        <div className={`ui-sf__review-row`} key={e.label}>
          <dt>{e.label}</dt>
          <dd>{e.value}</dd>
          {e.step && onEdit && (
            <button
              type={`button`}
              className={`ui-sf__edit`}
              aria-label={`Edit ${e.label.toLowerCase()}`}
              onClick={() => onEdit(e.step!)}
            >{`Edit`}</button>
          )}
        </div>
      ))}
    </dl>
  );
}
function Success({
  title: title,
  description: description,
  children: children,
}: {
  title: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <div className={`ui-sf__success`}>
      <span className={`ui-sf__success-check`}>
        <DrawnCheck />
      </span>
      <h2 className={`ui-sf__heading`} tabIndex={-1}>
        {title}
      </h2>
      {description && <p className={`ui-sf__desc`}>{description}</p>}
      {children && <div className={`ui-sf__success-actions`}>{children}</div>}
    </div>
  );
}
var stepperFormStyles = `
/* Colors and motion as variables – override them on .ui-sf */
.ui-sf {
  --ui-sf-tray: #f0f0f0;
  --ui-sf-card: #ffffff;
  --ui-sf-line: #ececec;
  --ui-sf-ink: #171717;
  --ui-sf-text: #404040;
  --ui-sf-muted: #8f8f8f;
  --ui-sf-faint: #b5b5b5;
  --ui-sf-edge: #dcdcdf;
  --ui-sf-field: #ffffff;
  --ui-sf-hover: #f2f2f3;
  --ui-sf-chip: #f2f2f3;
  --ui-sf-track: #e2e2e5;
  --ui-sf-accent: #2f6bff;
  --ui-sf-accent-soft: rgba(47, 107, 255, 0.05);
  --ui-sf-danger: #e5484d;
  --ui-sf-on-ink: #ffffff;
  --ui-sf-focus: rgba(23, 23, 23, 0.22);
  --ui-sf-ring: rgba(23, 23, 23, 0.08);
  --ui-sf-ease: cubic-bezier(0.22, 1, 0.36, 1);
  position: relative;
  box-sizing: border-box;
  container-type: inline-size;
  display: grid;
  width: 100%;
  max-width: 520px;
  padding: 4px;
  border-radius: 20px;
  background: var(--ui-sf-tray);
  font-family: "Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  font-size: 13.5px;
  line-height: 1.45;
  color: var(--ui-sf-text);
  -webkit-font-smoothing: antialiased;
}
.ui-sf *, .ui-sf *::before, .ui-sf *::after { box-sizing: border-box; }
:where(.ui-sf) button { margin: 0; padding: 0; border: 0; background: none; font: inherit; color: inherit; cursor: pointer; }
:where(.ui-sf) svg { display: block; flex: none; }
:where(.ui-sf) :is(h2, p, dl, dd, ul, ol) { margin: 0; }
.ui-sf button:focus-visible { outline: 2px solid var(--ui-sf-focus); outline-offset: 2px; }
.ui-sf__glyph { width: 16px; height: 16px; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
.ui-sf__sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }

/* A check that draws in */
.ui-sf__draw { width: 14px; height: 14px; fill: none; stroke: currentColor; stroke-width: 2.6; stroke-linecap: round; stroke-linejoin: round; }
.ui-sf__draw path { stroke-dasharray: 1; stroke-dashoffset: 1; animation: ui-sf-draw 360ms var(--ui-sf-ease) 80ms forwards; }

/* ---- The steps on the tray: "1. Account" in a row, the current one in ink ---- */
.ui-sf__head { padding: 6px 6px 4px; }
.ui-sf__steps { position: relative; }
.ui-sf__list { display: grid; grid-template-columns: repeat(var(--ui-sf-n), minmax(0, 1fr)); padding: 0; list-style: none; }
.ui-sf__step { position: relative; display: grid; justify-items: center; min-width: 0; }
.ui-sf__step-btn {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  min-width: 0;
  max-width: 100%;
  height: 26px;
  padding: 0 6px;
  border-radius: 8px;
  line-height: 1;
  cursor: default;
  transition: background-color 200ms ease;
}
button.ui-sf__step-btn { cursor: pointer; }
button.ui-sf__step-btn:hover { background: var(--ui-sf-ring); }
/* The number, or the check once the step is done – same small slot, so the label never moves */
.ui-sf__mark {
  display: inline-flex;
  flex: none;
  align-items: center;
  justify-content: center;
  min-width: 14px;
  font-size: 12.5px;
  line-height: 1;
  font-variant-numeric: tabular-nums;
  color: var(--ui-sf-faint);
  transition: color 260ms ease;
}
.ui-sf__mark > span { line-height: 1; animation: ui-sf-in 260ms var(--ui-sf-ease) both; }
.ui-sf__mark .ui-sf__draw { width: 13px; height: 13px; stroke-width: 2.4; }
.ui-sf__step[data-state="current"] .ui-sf__mark { color: var(--ui-sf-ink); }
.ui-sf__step[data-state="done"] .ui-sf__mark { color: var(--ui-sf-ink); }
.ui-sf__step-label {
  overflow: hidden;
  max-width: 100%;
  font-size: 12.5px;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: var(--ui-sf-muted);
  transition: color 260ms ease;
}
.ui-sf__step[data-state="done"] .ui-sf__step-label { color: var(--ui-sf-text); }
.ui-sf__step[data-state="current"] .ui-sf__step-label { color: var(--ui-sf-ink); font-weight: 500; }
button.ui-sf__step-btn:hover .ui-sf__step-label { color: var(--ui-sf-ink); }

/* Compact header for narrow screens */
.ui-sf__compact { display: none; gap: 8px; padding: 0 6px; }
.ui-sf__compact-text { display: flex; align-items: baseline; min-width: 0; font-size: 12.5px; font-variant-numeric: tabular-nums; color: var(--ui-sf-muted); white-space: nowrap; animation: ui-sf-in 280ms var(--ui-sf-ease) both; }
.ui-sf__compact-dot { margin: 0 6px; color: var(--ui-sf-faint); }
.ui-sf__compact-title { overflow: hidden; text-overflow: ellipsis; color: var(--ui-sf-ink); font-weight: 500; }

/* ---- The white card ---- */
.ui-sf__card { display: grid; border-radius: 16px; background: var(--ui-sf-card); box-shadow: 0 0 0 1px var(--ui-sf-line), 0 1px 2px rgba(0, 0, 0, 0.04); }
/* Clips the sliding panes; the panes carry a little padding so focus rings aren't cut */
.ui-sf__viewport { position: relative; overflow: hidden; transition: height 380ms var(--ui-sf-ease); }
.ui-sf__pane { padding: 20px 20px 8px; animation: ui-sf-enter 380ms var(--ui-sf-ease) both; }
.ui-sf__pane[data-dir="-1"] { animation-name: ui-sf-enter-back; }
.ui-sf__pane[data-first] { animation: none; }
.ui-sf__pane[data-pane="leaving"] { position: absolute; top: 0; left: 0; right: 0; pointer-events: none; animation: ui-sf-leave 300ms var(--ui-sf-ease) both; }
.ui-sf__pane[data-pane="leaving"][data-dir="-1"] { animation-name: ui-sf-leave-back; }
.ui-sf__heading { font-size: 16px; font-weight: 600; line-height: 1.3; letter-spacing: -0.01em; color: var(--ui-sf-ink); outline: none; }
.ui-sf__desc { margin-top: 4px; color: var(--ui-sf-muted); text-wrap: pretty; }
.ui-sf__body { display: grid; gap: 14px; margin-top: 18px; }

/* Fields */
.ui-sf__field { display: grid; min-width: 0; }
.ui-sf__label { display: flex; align-items: baseline; justify-content: space-between; gap: 8px; margin-bottom: 6px; font-size: 12.5px; font-weight: 500; color: var(--ui-sf-ink); }
.ui-sf__optional { font-weight: 400; color: var(--ui-sf-muted); }
.ui-sf__control { min-width: 0; }
.ui-sf__input, .ui-sf__tags {
  display: flex;
  align-items: center;
  min-width: 0;
  min-height: 38px;
  border-radius: 10px;
  background: var(--ui-sf-field);
  box-shadow: inset 0 0 0 1px var(--ui-sf-edge), 0 1px 2px rgba(0, 0, 0, 0.03);
  transition: box-shadow 180ms ease;
  cursor: text;
}
.ui-sf__input:hover, .ui-sf__tags:hover { box-shadow: inset 0 0 0 1px var(--ui-sf-faint), 0 1px 2px rgba(0, 0, 0, 0.03); }
.ui-sf__input:focus-within, .ui-sf__tags:focus-within { box-shadow: inset 0 0 0 1px var(--ui-sf-ink), 0 0 0 3px var(--ui-sf-ring); }
.ui-sf__input[data-invalid], .ui-sf__tags[data-invalid] { box-shadow: inset 0 0 0 1px var(--ui-sf-danger); }
.ui-sf__input[data-invalid]:focus-within, .ui-sf__tags[data-invalid]:focus-within { box-shadow: inset 0 0 0 1px var(--ui-sf-danger), 0 0 0 3px rgba(229, 72, 77, 0.12); }
.ui-sf__input input, .ui-sf__tags-input {
  flex: 1;
  min-width: 0;
  height: 36px;
  padding: 0 12px;
  border: 0;
  outline: none;
  background: none;
  font: inherit;
  font-size: 14px;
  color: var(--ui-sf-ink);
}
.ui-sf__input input::placeholder, .ui-sf__tags-input::placeholder { color: var(--ui-sf-faint); }
.ui-sf__prefix { flex: none; padding-left: 12px; font-size: 14px; color: var(--ui-sf-muted); white-space: nowrap; user-select: none; }
.ui-sf__prefix + input { padding-left: 1px; }

/* Message and hint fold open and closed */
.ui-sf__fold { display: grid; grid-template-rows: 0fr; opacity: 0; transition: grid-template-rows 260ms var(--ui-sf-ease), opacity 200ms ease; }
.ui-sf__fold[data-open] { grid-template-rows: 1fr; opacity: 1; }
.ui-sf__fold > div { min-height: 0; overflow: hidden; }
.ui-sf__msg, .ui-sf__hint { padding-top: 6px; font-size: 12.5px; text-wrap: pretty; }
.ui-sf__msg { color: var(--ui-sf-danger); animation: ui-sf-in 240ms var(--ui-sf-ease) both; }
.ui-sf__hint { color: var(--ui-sf-muted); }

/* Email chips */
.ui-sf__tags { flex-wrap: wrap; gap: 6px; padding: 5px; }
.ui-sf__chips { display: contents; padding: 0; list-style: none; }
.ui-sf__chip {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  min-width: 0;
  max-width: 100%;
  height: 28px;
  padding: 0 2px 0 10px;
  overflow: hidden;
  border-radius: 8px;
  background: var(--ui-sf-chip);
  font-size: 13px;
  color: var(--ui-sf-ink);
  white-space: nowrap;
  animation: ui-sf-chip 300ms var(--ui-sf-ease) both;
}
.ui-sf__chip[data-leaving] { pointer-events: none; }
.ui-sf__chip-text { overflow: hidden; text-overflow: ellipsis; }
.ui-sf__chip-x { display: grid; place-items: center; flex: none; width: 24px; height: 24px; border-radius: 6px; color: var(--ui-sf-muted); transition: background-color 140ms ease, color 140ms ease; }
.ui-sf__chip-x .ui-sf__glyph { width: 13px; height: 13px; }
.ui-sf__chip-x:hover { background: var(--ui-sf-track); color: var(--ui-sf-ink); }
.ui-sf__chip[data-leaving] .ui-sf__chip-x { background: none; }
.ui-sf__tags-input { flex: 1 1 140px; height: 28px; padding: 0 7px; }

/* Selectable cards with a ring that glides */
.ui-sf__choices { position: relative; display: grid; grid-auto-columns: minmax(0, 1fr); grid-auto-flow: column; gap: 8px; }
.ui-sf__ring {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  border-radius: 12px;
  box-shadow: inset 0 0 0 1.5px var(--ui-sf-accent), 0 0 0 3px rgba(47, 107, 255, 0.1);
  opacity: 0;
  pointer-events: none;
  transition: transform 380ms var(--ui-sf-ease), width 380ms var(--ui-sf-ease), height 380ms var(--ui-sf-ease), opacity 200ms ease;
}
.ui-sf__choice {
  position: relative;
  display: grid;
  align-content: start;
  gap: 2px;
  min-width: 0;
  padding: 12px;
  border-radius: 12px;
  background: var(--ui-sf-field);
  box-shadow: inset 0 0 0 1px var(--ui-sf-edge);
  text-align: left;
  transition: background-color 200ms ease, box-shadow 200ms ease;
}
.ui-sf__choice:hover { box-shadow: inset 0 0 0 1px var(--ui-sf-faint); }
.ui-sf__choice[aria-checked="true"] { background: var(--ui-sf-accent-soft); box-shadow: inset 0 0 0 1px transparent; }
.ui-sf__choice:focus-visible { outline-offset: 3px; }
.ui-sf__choice-top { display: flex; align-items: center; gap: 6px; min-width: 0; }
.ui-sf__choice-title { overflow: hidden; font-weight: 600; color: var(--ui-sf-ink); white-space: nowrap; text-overflow: ellipsis; }
.ui-sf__badge { flex: none; padding: 1px 6px; border-radius: 6px; background: var(--ui-sf-chip); font-size: 11px; font-weight: 500; color: var(--ui-sf-text); }
.ui-sf__radio { position: relative; flex: none; width: 16px; height: 16px; margin-left: auto; border-radius: 50%; box-shadow: inset 0 0 0 1.5px var(--ui-sf-edge); transition: box-shadow 220ms ease; }
.ui-sf__radio::after { content: ""; position: absolute; inset: 4px; border-radius: 50%; background: var(--ui-sf-accent); transform: scale(0); transition: transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1); }
.ui-sf__choice[aria-checked="true"] .ui-sf__radio { box-shadow: inset 0 0 0 1.5px var(--ui-sf-accent); }
.ui-sf__choice[aria-checked="true"] .ui-sf__radio::after { transform: scale(1); }
.ui-sf__choice-aside { font-size: 13px; font-variant-numeric: tabular-nums; color: var(--ui-sf-ink); }
.ui-sf__choice-desc { margin-top: 4px; font-size: 12px; line-height: 1.4; color: var(--ui-sf-muted); text-wrap: pretty; }

/* Review */
.ui-sf__review { display: grid; border-radius: 12px; box-shadow: inset 0 0 0 1px var(--ui-sf-line); }
.ui-sf__review-row { display: grid; grid-template-columns: 96px minmax(0, 1fr) auto; align-items: baseline; gap: 12px; padding: 11px 8px 11px 14px; }
.ui-sf__review-row + .ui-sf__review-row { border-top: 1px solid var(--ui-sf-line); }
.ui-sf__review dt { font-size: 12.5px; color: var(--ui-sf-muted); }
.ui-sf__review dd { min-width: 0; color: var(--ui-sf-ink); overflow-wrap: break-word; }
.ui-sf__edit { height: 26px; margin: -4px 0; padding: 0 8px; border-radius: 7px; font-size: 12.5px; font-weight: 500; color: var(--ui-sf-text); transition: background-color 140ms ease, color 140ms ease; }
.ui-sf__edit:hover { background: var(--ui-sf-hover); color: var(--ui-sf-ink); }

/* Success */
.ui-sf__success { display: grid; justify-items: center; padding: 20px 0 14px; text-align: center; }
.ui-sf__success-check {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  margin-bottom: 14px;
  border-radius: 50%;
  background: var(--ui-sf-ink);
  color: var(--ui-sf-on-ink);
  box-shadow: 0 0 0 6px var(--ui-sf-ring);
  animation: ui-sf-pop 520ms cubic-bezier(0.34, 1.56, 0.64, 1) 120ms both;
}
.ui-sf__success-check .ui-sf__draw { width: 20px; height: 20px; }
.ui-sf__success-check .ui-sf__draw path { animation-delay: 320ms; }
.ui-sf__success .ui-sf__heading { animation: ui-sf-in 340ms var(--ui-sf-ease) 220ms both; }
.ui-sf__success .ui-sf__desc { max-width: 40ch; text-wrap: balance; animation: ui-sf-in 340ms var(--ui-sf-ease) 290ms both; }
.ui-sf__success-actions { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px; margin-top: 16px; animation: ui-sf-in 340ms var(--ui-sf-ease) 360ms both; }

/* ---- Footer: sticks to the bottom of the screen in long pages ---- */
.ui-sf__foot-fold { position: sticky; bottom: 0; z-index: 3; display: grid; grid-template-rows: 1fr; border-radius: 0 0 16px 16px; background: var(--ui-sf-card); transition: grid-template-rows 360ms var(--ui-sf-ease), opacity 220ms ease; }
.ui-sf__foot-fold[data-hidden] { grid-template-rows: 0fr; opacity: 0; }
.ui-sf__foot { display: flex; align-items: center; gap: 10px; min-height: 0; overflow: hidden; padding: 12px 16px 16px; }
.ui-sf__btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: none;
  height: 36px;
  border-radius: 10px;
  font-weight: 500;
  white-space: nowrap;
  transition: background-color 140ms ease, opacity 200ms ease, transform 140ms ease, width 320ms var(--ui-sf-ease), visibility 200ms;
}
.ui-sf__btn-ghost { gap: 4px; padding: 0 12px 0 8px; color: var(--ui-sf-text); }
.ui-sf__btn-ghost:hover { background: var(--ui-sf-hover); color: var(--ui-sf-ink); }
.ui-sf__btn-ghost[data-hidden] { opacity: 0; visibility: hidden; }
.ui-sf__btn-primary { margin-left: auto; overflow: hidden; background: var(--ui-sf-ink); color: var(--ui-sf-on-ink); }
.ui-sf__btn-primary:hover { opacity: 0.88; }
.ui-sf__btn-primary:active { transform: scale(0.97); }
/* Not ready yet: dimmed, but still answers a press with the messages */
.ui-sf__btn-primary[aria-disabled="true"] { opacity: 0.4; }
.ui-sf__btn-primary[data-busy] { opacity: 0.75; cursor: progress; }
.ui-sf__btn-inner { display: inline-flex; flex: none; align-items: center; gap: 8px; padding: 0 15px; }
.ui-sf__btn-label { animation: ui-sf-in 260ms var(--ui-sf-ease) both; }
.ui-sf__btn-secondary { padding: 0 14px; color: var(--ui-sf-text); box-shadow: inset 0 0 0 1px var(--ui-sf-edge); }
.ui-sf__btn-secondary:hover { background: var(--ui-sf-hover); color: var(--ui-sf-ink); }
.ui-sf__spinner { width: 13px; height: 13px; border-radius: 50%; border: 1.8px solid currentColor; border-right-color: transparent; animation: ui-sf-spin 700ms linear infinite; }
.ui-sf__submit-error { min-width: 0; font-size: 12.5px; color: var(--ui-sf-danger); animation: ui-sf-in 240ms var(--ui-sf-ease) both; }

@keyframes ui-sf-in { from { opacity: 0; transform: translateY(4px); filter: blur(2px); } to { opacity: 1; transform: none; filter: none; } }
@keyframes ui-sf-enter { from { opacity: 0; transform: translateX(28px); } to { opacity: 1; transform: none; } }
@keyframes ui-sf-enter-back { from { opacity: 0; transform: translateX(-28px); } to { opacity: 1; transform: none; } }
@keyframes ui-sf-leave { to { opacity: 0; transform: translateX(-28px); } }
@keyframes ui-sf-leave-back { to { opacity: 0; transform: translateX(28px); } }
@keyframes ui-sf-draw { to { stroke-dashoffset: 0; } }
@keyframes ui-sf-pop { 0% { opacity: 0; transform: scale(0.4); } 60% { opacity: 1; transform: scale(1.08); } 100% { opacity: 1; transform: scale(1); } }
@keyframes ui-sf-chip { from { opacity: 0; transform: scale(0.85); } to { opacity: 1; transform: none; } }
@keyframes ui-sf-spin { to { transform: rotate(360deg); } }

/* Narrow (phones): the compact header, cards as rows, stacked review rows, bigger buttons */
@container (max-width: 420px) {
  .ui-sf__head { padding: 12px 8px 12px; }
  .ui-sf__steps { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); }
  .ui-sf__compact { display: grid; }
  .ui-sf__pane { padding: 18px 16px 6px; }
  .ui-sf__foot { padding: 12px 12px 12px; }
  .ui-sf__btn { height: 40px; }
  .ui-sf__choices { grid-template-columns: minmax(0, 1fr); grid-auto-flow: row; }
  .ui-sf__choice { grid-template-columns: minmax(0, 1fr) auto; column-gap: 10px; }
  .ui-sf__choice-top { grid-column: 1; }
  .ui-sf__choice-aside { grid-column: 2; grid-row: 1; align-self: center; }
  .ui-sf__choice-desc { grid-column: 1 / -1; margin-top: 2px; }
  .ui-sf__radio { order: -1; margin-left: 0; margin-right: 2px; }
  .ui-sf__review-row { grid-template-columns: minmax(0, 1fr) auto; row-gap: 2px; padding-left: 12px; }
  .ui-sf__review dt { grid-column: 1; }
  .ui-sf__review dd { grid-column: 1; grid-row: 2; }
  .ui-sf__edit { grid-column: 2; grid-row: 1 / span 2; align-self: center; margin: 0; }
}
/* Touch screens: 16px fields (no zoom on iOS) and 40px targets */
@media (hover: none) and (pointer: coarse) {
  .ui-sf__input input, .ui-sf__tags-input, .ui-sf__prefix { font-size: 16px; }
  .ui-sf__input, .ui-sf__tags { min-height: 44px; }
  .ui-sf__input input { height: 42px; }
  .ui-sf__chip { height: 32px; }
  .ui-sf__chip-x { width: 30px; height: 30px; }
  .ui-sf__btn { height: 42px; }
  .ui-sf__edit { height: 36px; padding: 0 12px; }
  .ui-sf__step-btn { padding: 4px; margin: -4px 0; }
}
@media (prefers-reduced-motion: reduce) {
  .ui-sf *, .ui-sf *::before, .ui-sf *::after { animation-duration: 1ms !important; animation-delay: 0ms !important; transition: none !important; }
}

/* Dark mode: follows a .dark class or data-theme="dark" on any ancestor, e.g. <html> */
:where(.dark, [data-theme="dark"]) .ui-sf {
  --ui-sf-tray: #111113;
  --ui-sf-card: #19191b;
  --ui-sf-line: #2a2a2e;
  --ui-sf-ink: #ededed;
  --ui-sf-text: #c8c8cc;
  --ui-sf-muted: #8b8b92;
  --ui-sf-faint: #5c5c63;
  --ui-sf-edge: #34343a;
  --ui-sf-field: #1d1d20;
  --ui-sf-hover: #232326;
  --ui-sf-chip: #2a2a2e;
  --ui-sf-track: #2e2e33;
  --ui-sf-accent: #6d8bff;
  --ui-sf-accent-soft: rgba(109, 139, 255, 0.08);
  --ui-sf-danger: #ff6369;
  --ui-sf-on-ink: #111113;
  --ui-sf-focus: rgba(255, 255, 255, 0.3);
  --ui-sf-ring: rgba(255, 255, 255, 0.08);
}
`;
var slugify = (value: string) =>
  value
    .toLowerCase()
    .normalize(`NFKD`)
    .replace(/[̀-ͯ]/g, ``)
    .replace(/[^a-z0-9]+/g, `-`)
    .replace(/^-+|-+$/g, ``)
    .slice(0, 32);
var planOptions = [
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
var demoWorkspaceName = `Northwind Studio`;
function WorkspaceFields({
  ctx: context,
  autoplay: autoplay,
}: {
  ctx: StepContext<WorkspaceValues>;
  autoplay: React.RefObject<boolean>;
}) {
  let { values: values, setValues: setValues } = context,
    timeoutRef = React.useRef(0),
    stopAutoplay = () => {
      (clearTimeout(timeoutRef.current), (autoplay.current = false));
    },
    setName = (e: string) =>
      setValues({
        name: e,
        ...(values.slugEdited
          ? {}
          : {
              slug: slugify(e),
            }),
      });
  return (
    React.useEffect(() => {
      if (!autoplay.current) return;
      let e = 0,
        n = () => {
          ((e += 1),
            setValues({
              name: demoWorkspaceName.slice(0, e),
              slug: slugify(demoWorkspaceName.slice(0, e)),
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
        <StepperField name={`name`} label={`Workspace name`}>
          <StepperInput
            value={values.name}
            placeholder={`Acme Inc.`}
            maxLength={48}
            onFocus={stopAutoplay}
            onChange={(e: {
              target: {
                value: string;
              };
            }) => setName(e.target.value)}
          />
        </StepperField>
        <StepperField
          name={`slug`}
          label={`Workspace URL`}
          hint={`Lowercase letters, numbers and dashes`}
        >
          <StepperInput
            prefix={`plico.app/`}
            value={values.slug}
            placeholder={`acme`}
            maxLength={32}
            onFocus={stopAutoplay}
            onChange={(e: {
              target: {
                value: string;
              };
            }) =>
              setValues({
                slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ``),
                slugEdited: true,
              })
            }
          />
        </StepperField>
      </>
    )
  );
}
function StepperFormDemo2() {
  let autoplayRef = React.useRef(true);
  return (
    <div className={`stepper-form-demo`}>
      <StepperForm<WorkspaceValues>
        steps={[
          {
            id: `workspace`,
            title: `Workspace`,
            heading: `Name your workspace`,
            description: `This is where your team's projects live.`,
            render: (t) => <WorkspaceFields ctx={t} autoplay={autoplayRef} />,
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
            render: ({ values: values, setValues: setValues }) => (
              <StepperField
                name={`invites`}
                label={`Email addresses`}
                hint={`Press Enter or comma to add`}
                optional={true}
              >
                <StepperTags
                  value={values.invites}
                  max={20}
                  onChange={(e) =>
                    setValues({
                      invites: e,
                    })
                  }
                />
              </StepperField>
            ),
          },
          {
            id: `plan`,
            title: `Plan`,
            heading: `Pick a plan`,
            description: `Every plan starts with a 14‑day trial.`,
            render: ({ values: values, setValues: setValues }) => (
              <StepperChoices
                label={`Plan`}
                value={values.plan}
                options={planOptions}
                onChange={(e) =>
                  setValues({
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
            render: ({ values: values, goTo: goTo }) => {
              let n = planOptions.find((t) => t.value === values.plan)!,
                i = values.invites.length;
              return (
                <StepperReview
                  onEdit={goTo}
                  rows={[
                    {
                      label: `Workspace`,
                      value: (
                        <>
                          {values.name}
                          <span className={`sf-demo__sub`}>
                            {`plico.app/`}
                            {values.slug}
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
                          <span className={`sf-demo__sub`}>{values.invites.join(`, `)}</span>
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
                          <span className={`sf-demo__muted`}>
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
          invites: [`maya@northwind.studio`, `leo@northwind.studio`],
          plan: `pro`,
        }}
        submitLabel={`Create workspace`}
        onComplete={() => new Promise((e) => setTimeout(e, 1100))}
        success={(t, n) => (
          <Success
            title={`${t.name} is ready`}
            description={
              t.invites.length
                ? `${t.invites.length} ${t.invites.length === 1 ? `invite is` : `invites are`} on the way. Your trial runs for 14\u00a0days.`
                : `Your trial runs for 14\xA0days.`
            }
          >
            <button
              type={`button`}
              className={`ui-sf__btn ui-sf__btn-secondary`}
              onClick={() => {
                ((autoplayRef.current = true), n());
              }}
            >{`Start over`}</button>
          </Success>
        )}
      />
    </div>
  );
}
const demoStyles =
  ".stepper-form-demo{grid-template-columns:minmax(0,480px);place-content:center;width:100%;display:grid}.sf-demo__muted{color:var(--ui-sf-muted)}.sf-demo__sub{color:var(--ui-sf-muted);white-space:nowrap;text-overflow:ellipsis;font-size:12.5px;display:block;overflow:hidden}.card__preview .stepper-form-demo{grid-template-columns:auto;place-content:center;position:absolute;inset:0}.card__preview .stepper-form-demo .ui-sf{zoom:.42;width:480px;max-width:none}.stage:has(.stepper-form-demo){align-items:start;height:560px;padding:56px 32px}@media (width<=760px){.stage:has(.stepper-form-demo){height:640px;padding:120px 12px 16px}}.sfc-demo__muted{color:var(--ui-sfc-muted)}.sfc-demo__sub{color:var(--ui-sfc-muted);white-space:nowrap;text-overflow:ellipsis;font-size:12px;line-height:16px;display:block;overflow:hidden}.card__preview .stepper-form-demo .ui-sfc{zoom:.44;width:460px;max-width:none}\n";
function StepperFormDemo(props: React.JSX.IntrinsicAttributes) {
  return (
    <>
      <style href="plico-demo-stepper-form" precedence="default">
        {demoStyles}
      </style>
      <StepperFormDemo2 {...props} />
    </>
  );
}
export { StepperForm as Component };
export { StepperFormDemo as Demo };
export { StepperChoices };
export { StepperField };
export { StepperForm };
export { StepperFormDemo };
export { StepperInput };
export { StepperReview };
export { StepperTags };
export default StepperForm;

"use client";

import * as React from "react";
type ThinkingLoaderProps = {
  phases?: string[];
  interval?: number;
  phase?: number;
  loop?: boolean;
  done?: boolean;
  doneLabel?: string | ((seconds: number) => string);
  size?: "sm" | "md";
  variant?: "pill" | "plain";
  className?: string;
};
type RunPhase = "done" | "stopped" | "waiting" | "running";
type RunEvent = {
  kind: "step" | "ask" | "call" | "end" | "finish";
  s: number;
  c?: number;
  delay?: number;
};
type ToolCallGroupProps = {
  children: React.ReactNode;
  label?: string;
  runningLabel?: string;
  duration?: number;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
};
type ToolCallCardProps = {
  name: string;
  summary?: React.ReactNode;
  icon?: React.ReactNode;
  status: ToolCallStatus;
  args?: unknown;
  result?: unknown;
  error?: string;
  startedAt?: number;
  duration?: number;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  openOnError?: boolean;
  onRetry?: () => void;
  maxCodeHeight?: number;
  className?: string;
};
type ToolCallStatus = "running" | "success" | "error";
interface InlineDiffProps {
  original?: string;
  suggested?: string;
  changes?: DiffSegment[];
  onChange?: (text: string) => void;
  onDone?: (text: string) => void;
  label?: string;
  ref?: React.Ref<InlineDiffHandle>;
  className?: string;
}
type InlineDiffHandle = {
  highlight: (index: number | null) => void;
  accept: (index: number) => void;
  reject: (index: number) => void;
  acceptAll: () => void;
  rejectAll: () => void;
  undo: () => void;
  reset: () => void;
};
type DiffSegment =
  | {
      type: "equal";
      text: string;
    }
  | DiffChange;
interface DiffChangeEntry {
  seg: number;
  remove: string;
  insert: string;
}
type DiffDecision = "accepted" | "rejected";
type DiffChange = {
  type: "change";
  remove: string;
  insert: string;
};
interface PlanDragState {
  id: string;
  pointer: number;
  ids: string[];
  from: number;
  to: number;
  startY: number;
  scale: number;
  dy: number;
  tops: number[];
  heights: number[];
}
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
type PlanStep = {
  id: string;
  title: string;
  detail?: string;
  tool?: string;
  status?: "pending" | "active" | "done" | "failed" | "skipped";
  duration?: number;
  error?: string;
};
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
type RunToolCall = {
  id?: string;
  name: string;
  summary?: React.ReactNode;
  icon?: IconNode;
  args?: unknown;
  result?: unknown;
  duration?: number;
};
type RunStep = {
  id: string;
  title: string;
  detail?: string;
  tool?: string;
  calls: RunToolCall[];
  approval?: Pick<ApprovalCardProps, "title" | "description" | "risk" | "details">;
};
interface AgentPlanProps {
  steps?: PlanStep[];
  defaultSteps?: PlanStep[];
  status?: "draft" | "running" | "done";
  onChange?: (steps: PlanStep[]) => void;
  onRun?: (steps: PlanStep[]) => void;
  onCancel?: () => void;
  onRetry?: (stepId: string) => void;
  title?: string;
  estimate?: string;
  className?: string;
}
interface ApprovalCardProps {
  title?: string;
  description?: React.ReactNode;
  risk?: "low" | "medium" | "high";
  icon?: React.ReactNode;
  details?: {
    label: string;
    value: React.ReactNode;
  }[];
  preview?: React.ReactNode;
  children?: React.ReactNode;
  status?: "pending" | "approved" | "denied";
  defaultStatus?: "pending" | "approved" | "denied";
  onApprove?: (options: { always: boolean }) => void | Promise<void>;
  onEdit?: () => void;
  expiresIn?: number;
  onExpire?: () => void;
  allowAlways?: boolean;
  alwaysLabel?: string;
  approveLabel?: string;
  denyLabel?: string;
  editLabel?: string;
  shortcuts?: boolean;
  label?: React.ReactNode;
  actions?: "tray" | "card";
  className?: string;
  onDeny?: (options: { reason: "user" | "timeout" }) => void;
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
interface AgentRunProps extends AppShellProps {
  title?: string;
  steps?: RunStep[];
  draft?: {
    original: string;
    suggested: string;
    label?: string;
  };
  agent?: string;
  autoRun?: boolean;
  onApprove?: (stepId: string) => void | Promise<void>;
  onDeny?: (stepId: string) => void;
  onStop?: () => void;
  onDone?: () => void;
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
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: string;
  size?: string;
  loading?: boolean;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  ref?: React.Ref<HTMLButtonElement>;
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
var nextStepId = 0;
var createStepId = () => `step-${Date.now().toString(36)}-${(nextStepId++).toString(36)}`;
var spinnerRays = Array.from(
  {
    length: 8,
  },
  (e, t) => t,
);
var moveStep = (e: PlanStep[], t: number, n: number) => {
  let r = e.slice(),
    [i] = r.splice(t, 1);
  return (r.splice(n, 0, i), r);
};
var prefersReducedMotion = () =>
  typeof window < `u` && !!window.matchMedia?.(`(prefers-reduced-motion: reduce)`).matches;
var readTranslateY = (e: Element) => {
  let t = getComputedStyle(e).transform;
  if (!t || t === `none`) return 0;
  try {
    return new DOMMatrixReadOnly(t).m42;
  } catch {
    return 0;
  }
};
var formatStepDuration = (e: number) => {
  let t = Math.max(0, e) / 1e3;
  if (t < 10) return `${t.toFixed(1)}s`;
  if (t < 60) return `${Math.round(t)}s`;
  let n = Math.round(t);
  return `${Math.floor(n / 60)}m ${String(n % 60).padStart(2, `0`)}s`;
};
var formatPlanDuration = (e: number) => {
  let t = Math.max(1, Math.round(e / 1e3));
  return t < 60 ? `${t}s` : `${Math.floor(t / 60)}m ${String(t % 60).padStart(2, `0`)}s`;
};
var stepStatusLabels = {
  pending: `Pending`,
  active: `In progress`,
  done: `Done`,
  failed: `Failed`,
  skipped: `Skipped`,
};
function AgentPlan({
  steps: steps,
  defaultSteps = [],
  status = `draft`,
  onChange: onChange,
  onRun: onRun,
  onCancel: onCancel,
  onRetry: onRetry,
  title: title,
  estimate: estimate,
  className: className,
}: AgentPlanProps) {
  let [internalSteps, setInternalSteps] = React.useState(defaultSteps),
    currentSteps = steps ?? internalSteps,
    isDraft = status === `draft`,
    stepsRef = React.useRef(currentSteps);
  stepsRef.current = currentSteps;
  let [editing, setEditing] = React.useState<{
      id: string;
      value: string;
    } | null>(null),
    editingRef = React.useRef(editing);
  editingRef.current = editing;
  let [newTitle, setNewTitle] = React.useState<string>(``),
    [removingIds, setRemovingIds] = React.useState<(string | null)[]>([]),
    [draggingId, setDraggingId] = React.useState<string | null>(null),
    [announcement, setAnnouncement] = React.useState(``),
    [, forceTick] = React.useState(0),
    [elapsedMs, setElapsedMs] = React.useState<number | null>(null),
    rootRef = React.useRef<HTMLDivElement | null>(null),
    addInputRef = React.useRef<HTMLInputElement | null>(null),
    rowRefs = React.useRef<Map<string, HTMLLIElement>>(new Map()),
    rowTopsRef = React.useRef<Map<string, number>>(new Map()),
    dragRef = React.useRef<PlanDragState | null>(null),
    focusAfterRenderRef = React.useRef<string | null>(null),
    enteringIdsRef = React.useRef<Set<string>>(new Set()),
    timeoutsRef = React.useRef<Set<number>>(new Set()),
    stepStartedAtRef = React.useRef<Map<string, number>>(new Map()),
    stepDurationsRef = React.useRef<Map<string, number>>(new Map()),
    planStartedAtRef = React.useRef<number | null>(null),
    previousStepStatusesRef = React.useRef<Map<string, NonNullable<PlanStep["status"]>>>(new Map()),
    instructionsId = React.useId(),
    schedule = (e: () => void, t: number) => {
      let n = window.setTimeout(() => {
        (timeoutsRef.current.delete(n), e());
      }, t);
      timeoutsRef.current.add(n);
    };
  React.useEffect(() => {
    let e = timeoutsRef.current;
    return () => e.forEach((e) => window.clearTimeout(e));
  }, []);
  let updateSteps = (t: PlanStep[]) => {
      (steps === void 0 && setInternalSteps(t), onChange?.(t));
    },
    announce = (e: string) => setAnnouncement((t) => (t === e ? `${e} ` : e)),
    stepIdsKey = currentSteps.map((e) => e.id).join(`
`),
    previousStepIdsKeyRef = React.useRef(stepIdsKey);
  React.useLayoutEffect(() => {
    let e = previousStepIdsKeyRef.current !== stepIdsKey;
    previousStepIdsKeyRef.current = stepIdsKey;
    let t = new Map(),
      n = e && !prefersReducedMotion();
    if (
      (rowRefs.current.forEach((r, i) => {
        let a = r.offsetTop;
        if ((t.set(i, a), !e)) return;
        let o = rowTopsRef.current.get(i);
        (n &&
          o !== void 0 &&
          o !== a &&
          ((r.style.transition = `none`),
          (r.style.transform = `translateY(${o - a}px)`),
          r.getBoundingClientRect()),
          (r.style.transition = ``),
          (r.style.transform = ``));
      }),
      (rowTopsRef.current = t),
      focusAfterRenderRef.current)
    ) {
      let e = rowRefs.current.get(focusAfterRenderRef.current);
      ((focusAfterRenderRef.current = null), e && document.activeElement !== e && e.focus());
    }
  });
  let previousPlanStatusRef = React.useRef(status);
  (React.useLayoutEffect(() => {
    let e = previousPlanStatusRef.current;
    if (
      ((previousPlanStatusRef.current = status),
      status === `running` &&
        (planStartedAtRef.current === null || e === `done`) &&
        (planStartedAtRef.current = Date.now()),
      status === `draft` && ((planStartedAtRef.current = null), setElapsedMs(null)),
      status === `done`)
    ) {
      let e = stepsRef.current.reduce(
        (e, t) => e + (t.duration ?? stepDurationsRef.current.get(t.id) ?? 0),
        0,
      );
      setElapsedMs(planStartedAtRef.current === null ? e : Date.now() - planStartedAtRef.current);
    }
  }, [status]),
    React.useLayoutEffect(() => {
      currentSteps.forEach((e) => {
        let t = e.status ?? `pending`;
        (t === `active`
          ? stepStartedAtRef.current.has(e.id) || stepStartedAtRef.current.set(e.id, Date.now())
          : stepStartedAtRef.current.has(e.id) &&
            (t === `done` &&
              stepDurationsRef.current.set(e.id, Date.now() - stepStartedAtRef.current.get(e.id)!),
            stepStartedAtRef.current.delete(e.id)),
          t === `pending` && stepDurationsRef.current.delete(e.id));
      });
    }),
    React.useEffect(() => {
      if (status !== `running`) return;
      let e = window.setInterval(() => forceTick((e) => e + 1), 100);
      return () => window.clearInterval(e);
    }, [status]),
    React.useEffect(() => {
      let e: string[] = [];
      (currentSteps.forEach((t, n) => {
        let r = t.status ?? `pending`,
          i = previousStepStatusesRef.current.get(t.id);
        (!isDraft &&
          i !== void 0 &&
          i !== r &&
          (r === `done` && e.push(`Step ${n + 1} done: ${t.title}`),
          r === `failed` &&
            e.push(`Step ${n + 1} failed: ${t.title}${t.error ? `. ${t.error}` : ``}`),
          r === `skipped` && e.push(`Step ${n + 1} skipped`)),
          previousStepStatusesRef.current.set(t.id, r));
      }),
        e.length && announce(e.join(`. `)));
    }),
    React.useEffect(() => {
      (status === `running` && announce(`Running plan`),
        status === `done` &&
          elapsedMs !== null &&
          announce(`Plan done in ${formatPlanDuration(elapsedMs)}`));
    }, [status, elapsedMs]),
    React.useEffect(() => {
      isDraft || (setEditing(null), setNewTitle(``));
    }, [isDraft]));
  let focusRow = (e: string | undefined) => {
      e ? rowRefs.current.get(e)?.focus() : addInputRef.current?.focus();
    },
    reorderStep = (e: string, t: number) => {
      let n = stepsRef.current,
        r = n.findIndex((t) => t.id === e),
        i = r + t;
      r < 0 ||
        i < 0 ||
        i >= n.length ||
        ((focusAfterRenderRef.current = e),
        updateSteps(moveStep(n, r, i)),
        announce(`Moved “${n[r].title}” to position ${i + 1} of ${n.length}`));
    },
    removeStep = (e: string) => {
      if (!isDraft || removingIds.includes(e)) return;
      let t = stepsRef.current,
        n = t.findIndex((t) => t.id === e);
      if (n < 0) return;
      let r = rowRefs.current.get(e);
      if (
        (r?.contains(document.activeElement) && focusRow((t[n + 1] ?? t[n - 1])?.id),
        announce(`Removed “${t[n].title}”`),
        !r || prefersReducedMotion())
      ) {
        updateSteps(t.filter((t) => t.id !== e));
        return;
      }
      ((r!.style.height = `${r!.offsetHeight}px`),
        r!.getBoundingClientRect(),
        setRemovingIds((t) => [...t, e]),
        schedule(() => {
          ((r!.style.height = ``),
            setRemovingIds((t) => t.filter((t) => t !== e)),
            updateSteps(stepsRef.current.filter((t) => t.id !== e)));
        }, 260));
    },
    startRename = (e: string) => {
      if (!isDraft) return;
      let t = stepsRef.current.find((t) => t.id === e);
      t &&
        setEditing({
          id: e,
          value: t.title,
        });
    },
    finishRename = (e: boolean, t: boolean = false) => {
      let n = editingRef.current;
      if (!n) return;
      ((editingRef.current = null), setEditing(null), t && (focusAfterRenderRef.current = n.id));
      let r = n.value.trim(),
        i = stepsRef.current.find((e) => e.id === n.id);
      e &&
        i &&
        r &&
        r !== i.title &&
        (updateSteps(
          stepsRef.current.map((e) =>
            e.id === n.id
              ? {
                  ...e,
                  title: r,
                }
              : e,
          ),
        ),
        announce(`Renamed to “${r}”`));
    },
    addStep = () => {
      let e = newTitle.trim();
      if (!e) return;
      let t = createStepId();
      (enteringIdsRef.current.add(t),
        updateSteps([
          ...stepsRef.current,
          {
            id: t,
            title: e,
          },
        ]),
        setNewTitle(``),
        announce(`Added “${e}” as step ${stepsRef.current.length + 1}`));
    },
    onRowKeyDown = (e: React.KeyboardEvent<HTMLLIElement>, t: string) => {
      if (!isDraft || e.target !== e.currentTarget) return;
      let n = stepsRef.current,
        r = n.findIndex((e) => e.id === t);
      if (e.altKey && (e.key === `ArrowUp` || e.key === `ArrowDown`))
        (e.preventDefault(), reorderStep(t, e.key === `ArrowUp` ? -1 : 1));
      else if (e.key === `ArrowUp` || e.key === `ArrowDown`) {
        e.preventDefault();
        let t = n[r + (e.key === `ArrowUp` ? -1 : 1)];
        t ? focusRow(t.id) : e.key === `ArrowDown` && addInputRef.current?.focus();
      } else
        e.key === `Enter` || e.key === `F2`
          ? (e.preventDefault(), startRename(t))
          : (e.key === `Delete` || e.key === `Backspace`) && (e.preventDefault(), removeStep(t));
    },
    onDragStart = (e: React.PointerEvent<HTMLSpanElement>, t: string) => {
      if (!isDraft || e.button !== 0 || editingRef.current || removingIds.length) return;
      let n = stepsRef.current.map((e) => e.id),
        r = n.map((e) => rowRefs.current.get(e));
      if (r.some((e) => !e)) return;
      let i = r as HTMLLIElement[],
        a = n.indexOf(t),
        o = i[a],
        s = o.offsetHeight ? o.getBoundingClientRect().height / o.offsetHeight : 1;
      e.preventDefault();
      try {
        e.currentTarget.setPointerCapture(e.pointerId);
      } catch {}
      ((dragRef.current = {
        id: t,
        pointer: e.pointerId,
        ids: n,
        from: a,
        to: a,
        startY: e.clientY,
        scale: s || 1,
        dy: 0,
        tops: i.map((e) => e.offsetTop),
        heights: i.map((e) => e.offsetHeight),
      }),
        setDraggingId(t));
    },
    onDragMove: React.PointerEventHandler<HTMLSpanElement> = (e) => {
      let t = dragRef.current;
      if (!t || t.pointer !== e.pointerId) return;
      let n = t.ids.length - 1,
        r = t.tops[0] - t.tops[t.from],
        i = t.tops[n] + t.heights[n] - (t.tops[t.from] + t.heights[t.from]);
      ((t.dy = Math.min(i, Math.max(r, (e.clientY - t.startY) / t.scale))),
        rowRefs.current.get(t.id)?.style.setProperty(`transform`, `translateY(${t.dy}px)`));
      let a = t.tops[t.from] + t.dy + t.heights[t.from] / 2,
        o = 0;
      if (
        (t.ids.forEach((e, n) => {
          n !== t.from && t.tops[n] + t.heights[n] / 2 < a && o++;
        }),
        o === t.to)
      )
        return;
      t.to = o;
      let s = t.heights[t.from];
      t.ids.forEach((e, n) => {
        if (n === t.from) return;
        let r =
            t.from < o && n > t.from && n <= o ? -s : o < t.from && n >= o && n < t.from ? s : 0,
          i = rowRefs.current.get(e);
        i && (i.style.transform = r ? `translateY(${r}px)` : ``);
      });
    },
    onDragEnd: React.PointerEventHandler<HTMLSpanElement> = (e) => {
      let t = dragRef.current;
      if (!t || t.pointer !== e.pointerId) return;
      if (((dragRef.current = null), setDraggingId(null), t.to === t.from)) {
        let e = rowRefs.current.get(t.id);
        e && (e.style.transform = ``);
        return;
      }
      rowRefs.current.forEach((e, t) => {
        (rowTopsRef.current.set(t, e.offsetTop + readTranslateY(e)),
          (e.style.transition = `none`),
          (e.style.transform = ``));
      });
      let n = stepsRef.current,
        r = n.find((e) => e.id === t.id);
      (updateSteps(moveStep(n, t.from, t.to)),
        requestAnimationFrame(() => rowRefs.current.forEach((e) => (e.style.transition = ``))),
        r && announce(`Moved “${r.title}” to position ${t.to + 1} of ${n.length}`));
    },
    stepCount = currentSteps.length,
    getStepStatus = (e: PlanStep) => e.status ?? `pending`,
    activeIndex = currentSteps.findIndex((e) => getStepStatus(e) === `active`),
    failedIndex = currentSteps.findIndex((e) => getStepStatus(e) === `failed`),
    completeCount = currentSteps.filter(
      (e) => getStepStatus(e) === `done` || getStepStatus(e) === `skipped`,
    ).length,
    now = Date.now(),
    phase = `draft`,
    statusLabel = ``;
  status === `done`
    ? ((phase = `done`), (statusLabel = `Done in ${formatPlanDuration(elapsedMs ?? 0)}`))
    : status === `running` &&
      (failedIndex >= 0 && activeIndex < 0
        ? ((phase = `failed`), (statusLabel = `Stopped · step ${failedIndex + 1} failed`))
        : ((phase = `running`),
          (statusLabel = `Running · ${activeIndex >= 0 ? activeIndex + 1 : Math.min(completeCount + 1, stepCount)} of ${stepCount}`)));
  let runningElapsedMs = planStartedAtRef.current === null ? 0 : now - planStartedAtRef.current;
  return (
    <div
      ref={rootRef}
      className={[`ui-pl`, className].filter(Boolean).join(` `)}
      data-status={status}
      data-dragging={draggingId ? `` : void 0}
    >
      <style href={`ui-agent-plan`} precedence={`default`}>
        {agentPlanStyles}
      </style>
      <div className={`ui-pl__card`}>
        <div className={`ui-pl__head`}>
          <div className={`ui-pl__meta`}>
            <span className={`ui-pl__state`}>
              <span className={`ui-pl__state-icon`} aria-hidden={`true`}>
                <svg viewBox={`0 0 16 16`}>
                  <path d={`M6.5 4.5h7M6.5 8h7M6.5 11.5h7`} />
                  <circle cx={`3.25`} cy={`4.5`} r={`.6`} />
                  <circle cx={`3.25`} cy={`8`} r={`.6`} />
                  <circle cx={`3.25`} cy={`11.5`} r={`.6`} />
                </svg>
              </span>
              <span className={`ui-pl__state-label`}>
                {`Plan · `}
                {stepCount}
                {` `}
                {stepCount === 1 ? `step` : `steps`}
              </span>
            </span>
            {isDraft && estimate ? (
              <span className={`ui-pl__estimate`}>
                <svg viewBox={`0 0 16 16`} aria-hidden={`true`}>
                  <circle cx={`8`} cy={`8`} r={`6`} />
                  <path d={`M8 5v3.2l2 1.3`} />
                </svg>
                <span>
                  <span className={`ui-pl__sr`}>{`Estimated time `}</span>
                  {estimate}
                </span>
              </span>
            ) : null}
          </div>
          {title && <h3 className={`ui-pl__title`}>{title}</h3>}
        </div>
        <p
          id={instructionsId}
          className={`ui-pl__sr`}
        >{`Press Enter to rename, Alt plus arrow keys to move, Delete to remove.`}</p>
        <ol className={`ui-pl__list`} aria-label={title ? `Plan: ${title}` : `Plan`}>
          {currentSteps.map((e, t) => {
            let n = getStepStatus(e),
              i = isDraft && editing?.id === e.id,
              a = e.duration ?? stepDurationsRef.current.get(e.id),
              o = stepStartedAtRef.current.get(e.id)!;
            return (
              <li
                ref={(t) => (
                  t && rowRefs.current.set(e.id, t),
                  () => {
                    rowRefs.current.delete(e.id);
                  }
                )}
                className={`ui-pl__step`}
                data-step={isDraft ? void 0 : n}
                data-dragging={draggingId === e.id ? `` : void 0}
                data-removing={removingIds.includes(e.id) ? `` : void 0}
                data-enter={enteringIdsRef.current.has(e.id) ? `` : void 0}
                onAnimationEnd={(t) => {
                  t.target === t.currentTarget && enteringIdsRef.current.delete(e.id);
                }}
                tabIndex={isDraft && !i ? 0 : void 0}
                aria-describedby={isDraft ? instructionsId : void 0}
                aria-current={n === `active` && !isDraft ? `step` : void 0}
                onKeyDown={(t) => onRowKeyDown(t, e.id)}
                key={e.id}
              >
                {isDraft && (
                  <span
                    className={`ui-pl__grip`}
                    aria-hidden={`true`}
                    title={`Drag to reorder`}
                    onPointerDown={(t) => onDragStart(t, e.id)}
                    onPointerMove={onDragMove}
                    onPointerUp={onDragEnd}
                    onPointerCancel={onDragEnd}
                  >
                    <svg viewBox={`0 0 16 16`}>
                      <circle cx={`6`} cy={`4`} r={`1.1`} />
                      <circle cx={`10`} cy={`4`} r={`1.1`} />
                      <circle cx={`6`} cy={`8`} r={`1.1`} />
                      <circle cx={`10`} cy={`8`} r={`1.1`} />
                      <circle cx={`6`} cy={`12`} r={`1.1`} />
                      <circle cx={`10`} cy={`12`} r={`1.1`} />
                    </svg>
                  </span>
                )}
                <span className={`ui-pl__marker`} aria-hidden={`true`}>
                  {isDraft || n === `pending` ? (
                    <span className={`ui-pl__num`}>{t + 1}</span>
                  ) : n === `active` ? (
                    <PlanSpinner />
                  ) : n === `done` ? (
                    <svg viewBox={`0 0 16 16`} className={`ui-pl__mark`}>
                      <path d={`M4.2 8.4 6.8 11l5-5.6`} pathLength={1} className={`ui-pl__draw`} />
                    </svg>
                  ) : n === `failed` ? (
                    <svg viewBox={`0 0 16 16`} className={`ui-pl__mark`}>
                      <path d={`M8 4.2v4.4M8 11.6h.01`} />
                    </svg>
                  ) : (
                    <svg viewBox={`0 0 16 16`} className={`ui-pl__mark`}>
                      <path d={`M5 8h6`} />
                    </svg>
                  )}
                </span>
                <div className={`ui-pl__main`}>
                  {i ? (
                    <input
                      className={`ui-pl__edit`}
                      value={editing!.value}
                      aria-label={`Rename step ${t + 1}`}
                      autoFocus={true}
                      onFocus={(e) => e.currentTarget.select()}
                      onChange={(t) =>
                        setEditing({
                          id: e.id,
                          value: t.target.value,
                        })
                      }
                      onBlur={() => finishRename(true)}
                      onKeyDown={(e) => {
                        e.key === `Enter`
                          ? (e.preventDefault(), finishRename(true, true))
                          : e.key === `Escape` &&
                            (e.preventDefault(), e.stopPropagation(), finishRename(false, true));
                      }}
                    />
                  ) : (
                    <span className={`ui-pl__name`} onDoubleClick={() => startRename(e.id)}>
                      {e.title}
                    </span>
                  )}
                  {(e.detail || e.tool) && (
                    <span className={`ui-pl__sub`}>
                      {e.detail && <span className={`ui-pl__detail`}>{e.detail}</span>}
                      {e.tool && <code className={`ui-pl__tool`}>{e.tool}</code>}
                    </span>
                  )}
                  {!isDraft && (
                    <span className={`ui-pl__sr`}>
                      {`, `}
                      {stepStatusLabels[n]}
                    </span>
                  )}
                  {!isDraft && n === `failed` && (
                    <span className={`ui-pl__fail`}>
                      <span className={`ui-pl__error`}>{e.error ?? `This step failed`}</span>
                      {onRetry && (
                        <button
                          type={`button`}
                          className={`ui-pl__retry`}
                          onClick={() => onRetry(e.id)}
                        >
                          <svg viewBox={`0 0 16 16`} aria-hidden={`true`}>
                            <path d={`M13 8a5 5 0 1 1-1.6-3.7`} />
                            <path d={`M13 3v2.6h-2.6`} />
                          </svg>
                          {`Retry from here`}
                        </button>
                      )}
                    </span>
                  )}
                </div>
                <span className={`ui-pl__aside`}>
                  {isDraft ? (
                    <button
                      type={`button`}
                      className={`ui-pl__remove`}
                      aria-label={`Remove step ${t + 1}: ${e.title}`}
                      onClick={() => removeStep(e.id)}
                    >
                      <svg viewBox={`0 0 16 16`} aria-hidden={`true`}>
                        <path d={`M4.5 4.5l7 7M11.5 4.5l-7 7`} />
                      </svg>
                    </button>
                  ) : n === `active` ? (
                    <span className={`ui-pl__time`} aria-hidden={`true`}>
                      {formatStepDuration(o === void 0 ? 0 : now - o)}
                    </span>
                  ) : n === `done` && a !== void 0 ? (
                    <span className={`ui-pl__time ui-pl__time--done`}>
                      <span className={`ui-pl__sr`}>{`took `}</span>
                      {formatStepDuration(a)}
                    </span>
                  ) : n === `skipped` ? (
                    <span className={`ui-pl__time`} aria-hidden={`true`}>{`Skipped`}</span>
                  ) : null}
                </span>
                {t < stepCount - 1 && <span className={`ui-pl__rail`} aria-hidden={`true`} />}
              </li>
            );
          })}
        </ol>
        <div className={`ui-pl__tail`} inert={!isDraft}>
          <div className={`ui-pl__tail-inner`}>
            <label className={`ui-pl__add`}>
              <span className={`ui-pl__add-icon`} aria-hidden={`true`}>
                <svg viewBox={`0 0 16 16`}>
                  <path d={`M8 4.5v7M4.5 8h7`} />
                </svg>
              </span>
              <input
                ref={addInputRef}
                value={newTitle}
                placeholder={`Add step`}
                aria-label={`Add a step at the end`}
                enterKeyHint={`done`}
                onChange={(e) => setNewTitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === `Enter`) (e.preventDefault(), addStep());
                  else if (e.key === `Escape`) setNewTitle(``);
                  else if (e.key === `ArrowUp` && !newTitle) {
                    let t = stepsRef.current[stepsRef.current.length - 1];
                    t && (e.preventDefault(), focusRow(t.id));
                  }
                }}
              />
            </label>
          </div>
        </div>
      </div>
      <div className={`ui-pl__foot`} data-phase={phase} key={phase}>
        {phase === `draft` ? (
          <>
            <span
              className={`ui-pl__hint`}
              aria-hidden={`true`}
            >{`Drag to reorder · double-click to rename`}</span>
            <span className={`ui-pl__actions`}>
              {onCancel && (
                <button
                  type={`button`}
                  className={`ui-pl__btn ui-pl__btn--quiet`}
                  onClick={onCancel}
                >{`Cancel`}</button>
              )}
              <button
                type={`button`}
                className={`ui-pl__btn ui-pl__btn--primary ui-pl__run`}
                disabled={!stepCount}
                onClick={() => onRun?.(stepsRef.current)}
              >
                {`Run plan`}
                <svg viewBox={`0 0 16 16`} aria-hidden={`true`}>
                  <path d={`M5.5 3.8v8.4L12 8z`} />
                </svg>
              </button>
            </span>
          </>
        ) : (
          <>
            <span className={`ui-pl__status`}>
              <span className={`ui-pl__status-icon`} aria-hidden={`true`}>
                {phase === `running` ? (
                  <PlanSpinner />
                ) : phase === `done` ? (
                  <svg viewBox={`0 0 16 16`}>
                    <circle cx={`8`} cy={`8`} r={`6.5`} />
                    <path d={`M5.4 8.2 7.2 10l3.4-3.8`} pathLength={1} className={`ui-pl__draw`} />
                  </svg>
                ) : (
                  <svg viewBox={`0 0 16 16`}>
                    <circle cx={`8`} cy={`8`} r={`6.5`} />
                    <path d={`M8 4.9v3.6M8 11h.01`} />
                  </svg>
                )}
              </span>
              <span className={`ui-pl__status-label`}>{statusLabel}</span>
            </span>
            {phase === `running` ? (
              <span className={`ui-pl__elapsed`} aria-hidden={`true`}>
                {formatPlanDuration(runningElapsedMs)}
              </span>
            ) : phase === `done` && onRun ? (
              <span className={`ui-pl__actions`}>
                <button
                  type={`button`}
                  className={`ui-pl__btn ui-pl__btn--quiet ui-pl__again`}
                  onClick={() => onRun(stepsRef.current)}
                >
                  <svg viewBox={`0 0 16 16`} aria-hidden={`true`}>
                    <path d={`M13 8a5 5 0 1 1-1.6-3.7`} />
                    <path d={`M13 3v2.6h-2.6`} />
                  </svg>
                  {`Run again`}
                </button>
              </span>
            ) : null}
          </>
        )}
      </div>
      <p className={`ui-pl__sr`} role={`status`} aria-live={`polite`}>
        {announcement}
      </p>
    </div>
  );
}
function PlanSpinner() {
  return (
    <svg className={`ui-pl__spinner`} viewBox={`0 0 16 16`}>
      {spinnerRays.map((e) => (
        <line
          x1={`8`}
          y1={`1.75`}
          x2={`8`}
          y2={`4.75`}
          transform={`rotate(${e * 45} 8 8)`}
          style={{
            animationDelay: `${(e - 8) * 100}ms`,
          }}
          key={e}
        />
      ))}
    </svg>
  );
}
var agentPlanStyles = `
/* Colors and motion as variables – override them on .ui-pl */
.ui-pl {
  --ui-pl-tray: #f0f0f0;
  --ui-pl-card: #ffffff;
  --ui-pl-ink: #171717;
  --ui-pl-text: #6b6b6b;
  --ui-pl-muted: #8a8a8a;
  --ui-pl-faint: #b8b8b8;
  --ui-pl-line: #ececec;
  --ui-pl-raise: #ffffff;
  --ui-pl-hover: #f6f6f6;
  --ui-pl-quiet-hover: #e4e4e5;
  --ui-pl-press: rgba(23, 23, 23, 0.05);
  --ui-pl-chip: #f3f3f3;
  --ui-pl-chip-text: #555555;
  --ui-pl-marker: #f0f0f0;
  --ui-pl-rail: #c4c4c8;
  --ui-pl-on-ink: #ffffff;
  --ui-pl-red: #c2331f;
  --ui-pl-red-bg: #fdf3f1;
  --ui-pl-red-ring: rgba(194, 51, 31, 0.32);
  --ui-pl-ring: rgba(23, 23, 23, 0.22);
  --ui-pl-lift: 0 1px 2px rgba(0, 0, 0, 0.06), 0 12px 28px -10px rgba(0, 0, 0, 0.2);
  --ui-pl-ease: cubic-bezier(0.22, 1, 0.36, 1);
  --ui-pl-inset: 30px;

  container-type: inline-size;
  position: relative;
  box-sizing: border-box;
  display: grid;
  width: 100%;
  max-width: 460px;
  padding: 4px;
  border-radius: 20px;
  background: var(--ui-pl-tray);
  color: var(--ui-pl-text);
  font-family: "Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.006em;
  text-align: left;
  -webkit-font-smoothing: antialiased;
}
/* The white card holds the goal and the steps */
.ui-pl__card {
  position: relative;
  border-radius: 16px;
  background: var(--ui-pl-card);
  box-shadow: 0 0 0 1px var(--ui-pl-line), 0 1px 2px rgba(0, 0, 0, 0.04);
}
.ui-pl:not([data-status="draft"]) {
  --ui-pl-inset: 14px;
}
.ui-pl[data-dragging] {
  cursor: grabbing;
  user-select: none;
  -webkit-user-select: none;
}
.ui-pl *,
.ui-pl *::before,
.ui-pl *::after {
  box-sizing: border-box;
}
.ui-pl svg {
  display: block;
  width: 100%;
  height: 100%;
  overflow: visible;
}
:where(.ui-pl) button {
  margin: 0;
  padding: 0;
  border: 0;
  background: none;
  font: inherit;
  letter-spacing: inherit;
  color: inherit;
  cursor: pointer;
}
.ui-pl__sr {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
  border: 0;
}

/* Header: a quiet status line, then the goal */
.ui-pl__head {
  display: grid;
  gap: 4px;
  padding: 16px 18px 8px;
}
.ui-pl__meta {
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 18px;
  font-size: 12.5px;
  line-height: 18px;
  color: var(--ui-pl-muted);
}
.ui-pl__state {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  min-width: 0;
}
.ui-pl__state-label {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-variant-numeric: tabular-nums;
}
.ui-pl__state-icon,
.ui-pl__status-icon {
  flex: none;
  width: 13px;
  height: 13px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.ui-pl__state-icon circle[r=".6"] {
  fill: currentColor;
}
.ui-pl__estimate {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  margin-left: auto;
  white-space: nowrap;
  font-variant-numeric: tabular-nums;
}
.ui-pl__estimate svg {
  width: 13px;
  height: 13px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.4;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.ui-pl__title {
  margin: 0;
  color: var(--ui-pl-ink);
  font-size: 15px;
  font-weight: 600;
  line-height: 22px;
  letter-spacing: -0.012em;
  text-wrap: balance;
}

/* Steps */
.ui-pl__list {
  position: relative;
  margin: 0;
  padding: 2px 6px 6px;
  list-style: none;
}
.ui-pl__step {
  position: relative;
  display: grid;
  grid-template-columns: 22px minmax(0, 1fr) auto;
  column-gap: 12px;
  align-items: start;
  padding: 10px 10px 10px var(--ui-pl-inset);
  border-radius: 10px;
  outline: none;
  transition:
    transform 420ms var(--ui-pl-ease),
    padding 420ms var(--ui-pl-ease),
    height 260ms var(--ui-pl-ease),
    opacity 180ms ease,
    background-color 160ms ease,
    box-shadow 200ms ease;
}
.ui-pl[data-status="draft"] .ui-pl__step:hover {
  background: var(--ui-pl-hover);
}
.ui-pl__step:focus-visible {
  outline: 2px solid var(--ui-pl-ring);
  outline-offset: 0;
}
.ui-pl__step[data-dragging] {
  z-index: 2;
  background: var(--ui-pl-raise) !important;
  box-shadow: inset 0 0 0 1px var(--ui-pl-line), var(--ui-pl-lift);
  transition: background-color 160ms ease, box-shadow 200ms ease;
}
.ui-pl__step[data-removing] {
  height: 0 !important;
  padding-top: 0;
  padding-bottom: 0;
  overflow: hidden;
  opacity: 0;
  pointer-events: none;
}
.ui-pl__step[data-enter] {
  animation: ui-pl-enter 380ms var(--ui-pl-ease) both;
}

/* Grip: in the left gutter, shows on hover and focus */
.ui-pl__grip {
  position: absolute;
  top: 10px;
  left: 6px;
  display: grid;
  place-items: center;
  width: 18px;
  height: 22px;
  margin-top: -1px;
  border-radius: 5px;
  color: var(--ui-pl-faint);
  fill: currentColor;
  cursor: grab;
  touch-action: none;
  opacity: 0;
  transition: opacity 160ms ease, color 160ms ease, background-color 160ms ease;
}
.ui-pl__grip svg {
  width: 14px;
  height: 14px;
}
.ui-pl__step:hover .ui-pl__grip,
.ui-pl__step:focus-visible .ui-pl__grip,
.ui-pl__step[data-dragging] .ui-pl__grip {
  opacity: 1;
}
.ui-pl__grip:hover,
.ui-pl__step[data-dragging] .ui-pl__grip {
  color: var(--ui-pl-text);
  background: var(--ui-pl-press);
}
.ui-pl__step[data-dragging] .ui-pl__grip {
  cursor: grabbing;
}

/* Marker: a quiet ring with the number → spinner → check */
.ui-pl__marker {
  position: relative;
  z-index: 1;
  display: grid;
  place-items: center;
  justify-self: center;
  width: 20px;
  height: 20px;
  border-radius: 999px;
  background: var(--ui-pl-card);
  box-shadow: inset 0 0 0 1px var(--ui-pl-line);
  color: var(--ui-pl-muted);
  font-size: 11px;
  font-weight: 500;
  line-height: 1;
  font-variant-numeric: tabular-nums;
  transition: background-color 320ms ease, color 320ms ease, box-shadow 320ms ease;
}
.ui-pl__marker > * {
  grid-area: 1 / 1;
  animation: ui-pl-pop 360ms var(--ui-pl-ease) both;
}
.ui-pl__num {
  animation: none !important;
}
.ui-pl__marker .ui-pl__spinner {
  width: 13px;
  height: 13px;
}
.ui-pl__mark {
  width: 11px !important;
  height: 11px !important;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.9;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.ui-pl__step[data-step="active"] .ui-pl__marker {
  box-shadow: none;
  color: var(--ui-pl-ink);
}
.ui-pl__step[data-step="done"] .ui-pl__marker {
  background: var(--ui-pl-marker);
  box-shadow: none;
  color: var(--ui-pl-ink);
}
.ui-pl__step[data-step="failed"] .ui-pl__marker {
  background: var(--ui-pl-red-bg);
  box-shadow: inset 0 0 0 1px var(--ui-pl-red-ring);
  color: var(--ui-pl-red);
}
.ui-pl__step[data-step="skipped"] .ui-pl__marker {
  box-shadow: none;
  outline: 1px dashed var(--ui-pl-faint);
  outline-offset: -1px;
}

/* The check draws itself */
.ui-pl__draw {
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
  animation: ui-pl-draw 420ms var(--ui-pl-ease) 80ms forwards;
}

.ui-pl__spinner line {
  stroke: currentColor;
  stroke-width: 1.7;
  stroke-linecap: round;
  opacity: 0.18;
  animation: ui-pl-ray 800ms linear infinite;
}

/* Text */
.ui-pl__main {
  display: grid;
  gap: 2px;
  min-width: 0;
}
.ui-pl__name {
  color: var(--ui-pl-ink);
  font-weight: 500;
  overflow-wrap: anywhere;
  transition: color 300ms ease;
}
.ui-pl[data-status="draft"] .ui-pl__name {
  cursor: text;
}
.ui-pl__step[data-step="pending"] .ui-pl__name {
  color: var(--ui-pl-text);
}
.ui-pl__step[data-step="skipped"] .ui-pl__name {
  color: var(--ui-pl-muted);
  text-decoration: line-through;
  text-decoration-color: var(--ui-pl-faint);
}
.ui-pl__sub {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 3px 8px;
  min-width: 0;
  color: var(--ui-pl-muted);
  font-size: 12.5px;
  line-height: 18px;
}
.ui-pl__detail {
  min-width: 0;
  overflow-wrap: anywhere;
}
.ui-pl__tool {
  padding: 1px 6px;
  border-radius: 6px;
  background: var(--ui-pl-chip);
  color: var(--ui-pl-chip-text);
  font-family: ui-monospace, "SF Mono", Menlo, monospace;
  font-size: 11px;
  line-height: 16px;
  letter-spacing: 0;
  white-space: nowrap;
}
.ui-pl__edit {
  width: calc(100% + 14px);
  height: 26px;
  margin: -3px -7px;
  padding: 0 6px;
  border: 0;
  border-radius: 7px;
  background: var(--ui-pl-raise);
  box-shadow: inset 0 0 0 1px var(--ui-pl-line), 0 0 0 3px var(--ui-pl-press);
  color: var(--ui-pl-ink);
  font: inherit;
  font-weight: 500;
  letter-spacing: inherit;
  outline: none;
}

/* Failed: an error line and a way back in */
.ui-pl__fail {
  display: grid;
  justify-items: start;
  gap: 8px;
  margin-top: 4px;
  animation: ui-pl-fade 360ms var(--ui-pl-ease) both;
}
.ui-pl__error {
  color: var(--ui-pl-red);
  font-size: 12.5px;
  line-height: 18px;
  overflow-wrap: anywhere;
}
.ui-pl__retry {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 28px;
  padding: 0 10px 0 9px;
  border-radius: 8px;
  background: var(--ui-pl-raise);
  box-shadow: inset 0 0 0 1px var(--ui-pl-line), 0 1px 2px rgba(0, 0, 0, 0.04);
  color: var(--ui-pl-ink);
  font-size: 12.5px;
  font-weight: 500;
  transition: background-color 160ms ease, transform 160ms var(--ui-pl-ease);
}
.ui-pl__retry svg {
  width: 13px;
  height: 13px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.6;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.ui-pl__retry:hover {
  background: var(--ui-pl-hover);
}
.ui-pl__retry:active {
  transform: scale(0.97);
}

/* Right column: remove, live timer, duration */
.ui-pl__aside {
  display: flex;
  align-items: center;
  min-height: 20px;
  color: var(--ui-pl-muted);
  font-size: 12.5px;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}
.ui-pl__time {
  animation: ui-pl-fade 300ms ease both;
}
.ui-pl__step[data-step="active"] .ui-pl__time {
  color: var(--ui-pl-ink);
}
.ui-pl__remove {
  display: grid;
  place-items: center;
  width: 24px;
  height: 24px;
  margin: -2px -4px 0 0;
  border-radius: 7px;
  color: var(--ui-pl-faint);
  fill: none;
  stroke: currentColor;
  stroke-width: 1.6;
  stroke-linecap: round;
  opacity: 0;
  transition: opacity 160ms ease, color 160ms ease, background-color 160ms ease;
}
.ui-pl__remove svg {
  width: 14px;
  height: 14px;
}
.ui-pl__step:hover .ui-pl__remove,
.ui-pl__step:focus-visible .ui-pl__remove,
.ui-pl__remove:focus-visible {
  opacity: 1;
}
.ui-pl__remove:hover {
  color: var(--ui-pl-ink);
  background: var(--ui-pl-press);
}
.ui-pl__remove:focus-visible,
.ui-pl__retry:focus-visible,
.ui-pl__btn:focus-visible {
  outline: 2px solid var(--ui-pl-ring);
  outline-offset: 1px;
}

/* Progress line: a segment under each marker that fills when the step finishes */
.ui-pl__rail {
  position: absolute;
  top: 35px;
  bottom: -5px;
  left: calc(var(--ui-pl-inset) + 10.5px);
  width: 1px;
  overflow: hidden;
  background: var(--ui-pl-line);
  opacity: 0;
  pointer-events: none;
  transition: opacity 300ms ease;
}
.ui-pl:not([data-status="draft"]) .ui-pl__rail {
  opacity: 1;
  transition-delay: 240ms;
}
.ui-pl__rail::after {
  content: "";
  position: absolute;
  inset: 0;
  background: var(--ui-pl-rail);
  transform: scaleY(0);
  transform-origin: top;
  transition: transform 560ms var(--ui-pl-ease);
}
.ui-pl__step[data-step="done"] .ui-pl__rail::after,
.ui-pl__step[data-step="skipped"] .ui-pl__rail::after {
  transform: scaleY(1);
}

/* Add step folds away once running */
.ui-pl__tail {
  display: grid;
  grid-template-rows: 1fr;
  transition: grid-template-rows 420ms var(--ui-pl-ease), opacity 260ms ease;
}
.ui-pl:not([data-status="draft"]) .ui-pl__tail {
  grid-template-rows: 0fr;
  opacity: 0;
}
.ui-pl__tail-inner {
  min-height: 0;
  overflow: hidden;
}
.ui-pl__add {
  display: grid;
  grid-template-columns: 22px minmax(0, 1fr);
  column-gap: 12px;
  align-items: center;
  margin: 0 6px 8px;
  padding: 7px 10px 7px var(--ui-pl-inset);
  border-radius: 10px;
  cursor: text;
  transition: background-color 160ms ease;
}
.ui-pl__add:hover,
.ui-pl__add:focus-within {
  background: var(--ui-pl-hover);
}
.ui-pl__add-icon {
  display: grid;
  place-items: center;
  width: 22px;
  height: 22px;
  border-radius: 999px;
  outline: 1px dashed var(--ui-pl-faint);
  outline-offset: -1px;
  color: var(--ui-pl-muted);
  fill: none;
  stroke: currentColor;
  stroke-width: 1.6;
  stroke-linecap: round;
}
.ui-pl__add-icon svg {
  width: 12px;
  height: 12px;
}
.ui-pl__add input {
  width: 100%;
  min-width: 0;
  height: 22px;
  padding: 0;
  border: 0;
  background: none;
  color: var(--ui-pl-ink);
  font: inherit;
  letter-spacing: inherit;
  outline: none;
}
.ui-pl__add input::placeholder {
  color: var(--ui-pl-muted);
  opacity: 1;
}
/* The tray below the card */
.ui-pl__foot {
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 46px;
  padding: 0 6px 0 12px;
  font-size: 12.5px;
  color: var(--ui-pl-muted);
  animation: ui-pl-fade 320ms var(--ui-pl-ease) both;
}
.ui-pl__hint {
  min-width: 0;
  overflow: hidden;
  color: var(--ui-pl-muted);
  font-size: 12px;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.ui-pl__actions {
  display: flex;
  flex: none;
  gap: 8px;
  margin-left: auto;
}
.ui-pl__btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 32px;
  padding: 0 13px;
  border-radius: 9px;
  font-size: 13px;
  font-weight: 500;
  white-space: nowrap;
  transition: background-color 160ms ease, opacity 160ms ease, transform 160ms var(--ui-pl-ease);
}
.ui-pl__btn:active {
  transform: scale(0.97);
}
.ui-pl__btn--primary {
  padding-right: 11px;
  background: var(--ui-pl-ink);
  color: var(--ui-pl-on-ink);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.12);
}
.ui-pl__btn--primary:hover {
  opacity: 0.88;
}
.ui-pl__btn--primary:disabled {
  opacity: 0.4;
  cursor: default;
  transform: none;
}
.ui-pl__btn--primary svg {
  width: 12px;
  height: 12px;
  fill: currentColor;
}
.ui-pl__btn--quiet {
  padding: 0 11px;
  color: var(--ui-pl-text);
}
.ui-pl__btn--quiet:hover {
  background: var(--ui-pl-quiet-hover);
  color: var(--ui-pl-ink);
}
.ui-pl__btn--quiet svg {
  width: 13px;
  height: 13px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.6;
  stroke-linecap: round;
  stroke-linejoin: round;
}

/* Status on the tray while running and after */
.ui-pl__status {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
  color: var(--ui-pl-ink);
}
.ui-pl__foot[data-phase="failed"] .ui-pl__status {
  color: var(--ui-pl-red);
}
.ui-pl__status-label {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-variant-numeric: tabular-nums;
}
.ui-pl__elapsed {
  margin-left: auto;
  padding-right: 6px;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}
/* Touch screens have no hover: keep the grip and remove button visible */
@media (hover: none) {
  .ui-pl__grip,
  .ui-pl__remove {
    opacity: 1;
  }
}

/* Narrow: drop the hint, tighten the gutters */
@container (max-width: 400px) {
  .ui-pl__hint {
    display: none;
  }
}
@container (max-width: 340px) {
  .ui-pl__head {
    padding: 14px 14px 8px;
  }
  .ui-pl__list {
    padding-inline: 4px;
  }
  .ui-pl__step,
  .ui-pl__add {
    column-gap: 10px;
    padding-right: 8px;
  }
  .ui-pl__add {
    margin-inline: 4px;
  }
  .ui-pl__foot {
    padding-left: 10px;
  }
  .ui-pl__btn {
    padding: 0 11px;
  }
}

@keyframes ui-pl-fade {
  from { opacity: 0; transform: translateY(3px); }
  to { opacity: 1; transform: none; }
}
@keyframes ui-pl-enter {
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: none; }
}
@keyframes ui-pl-pop {
  from { opacity: 0; transform: scale(0.5); }
  to { opacity: 1; transform: none; }
}
@keyframes ui-pl-draw {
  to { stroke-dashoffset: 0; }
}
@keyframes ui-pl-ray {
  0% { opacity: 1; }
  100% { opacity: 0.18; }
}

@media (prefers-reduced-motion: reduce) {
  .ui-pl *,
  .ui-pl *::before,
  .ui-pl *::after {
    animation-duration: 1ms !important;
    animation-delay: 0ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 1ms !important;
    transition-delay: 0ms !important;
  }
  .ui-pl__spinner line { opacity: 0.6; }
  .ui-pl__draw { stroke-dashoffset: 0; }
}

/* Dark mode: follows a .dark class or data-theme="dark" on any ancestor, e.g. <html> */
:where(.dark, [data-theme="dark"]) .ui-pl {
  --ui-pl-tray: #111113;
  --ui-pl-card: #19191b;
  --ui-pl-ink: #ededed;
  --ui-pl-text: #a1a1a1;
  --ui-pl-muted: #8b8b92;
  --ui-pl-faint: #5c5c63;
  --ui-pl-line: #2a2a2e;
  --ui-pl-raise: #1f1f22;
  --ui-pl-hover: #1f1f22;
  --ui-pl-quiet-hover: #222225;
  --ui-pl-press: rgba(255, 255, 255, 0.07);
  --ui-pl-chip: #232326;
  --ui-pl-chip-text: #b4b4b4;
  --ui-pl-marker: #26262a;
  --ui-pl-rail: #4a4a50;
  --ui-pl-on-ink: #19191b;
  --ui-pl-red: #f2786b;
  --ui-pl-red-bg: rgba(242, 120, 107, 0.08);
  --ui-pl-red-ring: rgba(242, 120, 107, 0.4);
  --ui-pl-ring: rgba(237, 237, 237, 0.3);
  --ui-pl-lift: 0 1px 2px rgba(0, 0, 0, 0.4), 0 14px 32px -10px rgba(0, 0, 0, 0.7);
}
`;
var riskLabels = {
  low: `Low`,
  medium: `Medium`,
  high: `High`,
};
function ApprovalCard({
  title: title,
  description: description,
  risk: risk,
  icon: icon,
  details: details,
  preview: preview,
  children: children,
  status: status,
  defaultStatus = `pending`,
  onApprove: onApprove,
  onDeny: onDeny,
  onEdit: onEdit,
  expiresIn: expiresIn,
  onExpire: onExpire,
  allowAlways = true,
  alwaysLabel = `Always allow this action`,
  approveLabel = `Approve`,
  denyLabel = `Deny`,
  editLabel = `Edit`,
  shortcuts = true,
  label: label,
  actions = `tray`,
  className: className,
}: ApprovalCardProps) {
  let instanceId = React.useId(),
    [internalStatus, setInternalStatus] = React.useState(defaultStatus),
    currentStatus = status ?? internalStatus,
    isResolved = currentStatus !== `pending`,
    [always, setAlways] = React.useState<boolean>(false),
    [busy, setBusy] = React.useState<boolean>(false),
    [resolutionReason, setResolutionReason] = React.useState(`user`),
    [resolvedAt, setResolvedAt] = React.useState(() => (isResolved ? Date.now() : null)),
    [announcement, setAnnouncement] = React.useState(``),
    [hovered, setHovered] = React.useState(false),
    [focused, setFocused] = React.useState(false),
    [modifierKey, setModifierKey] = React.useState(`⌘`),
    [previousStatus, setPreviousStatus] = React.useState(currentStatus),
    [pendingLeaving, setPendingLeaving] = React.useState<boolean>(false),
    [pendingEntering, setPendingEntering] = React.useState(false);
  previousStatus !== currentStatus &&
    (setPreviousStatus(currentStatus),
    currentStatus === `pending`
      ? (setPendingLeaving(false),
        setPendingEntering(true),
        setAlways(false),
        setBusy(false),
        setResolutionReason(`user`),
        setResolvedAt(null),
        setAnnouncement(``))
      : (setPendingLeaving(previousStatus === `pending`),
        setPendingEntering(false),
        setResolvedAt(Date.now()),
        setAnnouncement(
          `${currentStatus === `approved` ? `Approved` : resolutionReason === `timeout` ? `Expired` : `Denied`}: ${title}`,
        )));
  let rootRef = React.useRef<HTMLDivElement | null>(null),
    resolvedRef = React.useRef<HTMLDivElement | null>(null),
    approveRef = React.useRef<HTMLButtonElement | null>(null),
    restoreFocusRef = React.useRef(false);
  React.useEffect(() => {
    let e =
      (
        navigator as Navigator & {
          userAgentData?: {
            platform: string;
          };
        }
      ).userAgentData?.platform ??
      navigator.platform ??
      ``;
    /mac|iphone|ipad|ipod/i.test(e || navigator.userAgent) || setModifierKey(`Ctrl`);
  }, []);
  let approve = async () => {
      if (isResolved || busy) return;
      let e = onApprove?.({
        always: always,
      });
      if (e && typeof e.then == `function`) {
        setBusy(true);
        try {
          await e;
        } catch {
          setBusy(false);
          return;
        }
        setBusy(false);
      }
      status === void 0 && setInternalStatus(`approved`);
    },
    deny = (e: "user" | "timeout" = `user`) => {
      isResolved ||
        (busy && e === `user`) ||
        (setResolutionReason(e),
        e === `timeout` && onExpire?.(),
        onDeny?.({
          reason: e,
        }),
        status === void 0 && setInternalStatus(`denied`));
    },
    onKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
      isResolved ||
        busy ||
        e.defaultPrevented ||
        (e.key === `Enter` && (e.metaKey || e.ctrlKey)
          ? (e.preventDefault(), approve())
          : e.key === `Escape` && (e.preventDefault(), deny(`user`)));
    },
    expiresMs = expiresIn && expiresIn > 0 ? expiresIn * 1e3 : 0,
    remainingMsRef = React.useRef(expiresMs),
    [remainingSeconds, setRemainingSeconds] = React.useState(Math.ceil(expiresMs / 1e3)),
    expireRef = React.useRef(() => {});
  (React.useLayoutEffect(() => {
    expireRef.current = () => deny(`timeout`);
  }),
    React.useEffect(() => {
      currentStatus === `pending` &&
        ((remainingMsRef.current = expiresMs), setRemainingSeconds(Math.ceil(expiresMs / 1e3)));
    }, [currentStatus, expiresMs]));
  let timerPaused = hovered || focused || busy;
  React.useEffect(() => {
    if (!expiresMs || isResolved || timerPaused) return;
    let e = performance.now(),
      t = 0,
      n = (r: number) => {
        if (
          ((remainingMsRef.current -= r - e),
          (e = r),
          setRemainingSeconds(Math.max(0, Math.ceil(remainingMsRef.current / 1e3))),
          remainingMsRef.current <= 0)
        ) {
          expireRef.current();
          return;
        }
        t = requestAnimationFrame(n);
      };
    return ((t = requestAnimationFrame(n)), () => cancelAnimationFrame(t));
  }, [expiresMs, isResolved, timerPaused]);
  let previousHeightRef = React.useRef(0),
    animatingHeightRef = React.useRef(false),
    mountedRef = React.useRef(false);
  (React.useEffect(() => {
    let e = rootRef.current;
    if (!e || typeof ResizeObserver > `u`) return;
    let t = new ResizeObserver(() => {
      animatingHeightRef.current || (previousHeightRef.current = e.offsetHeight);
    });
    return (t.observe(e), () => t.disconnect());
  }, []),
    React.useLayoutEffect(() => {
      let e = rootRef.current;
      if (!e) return;
      if (!mountedRef.current) {
        ((mountedRef.current = true), (previousHeightRef.current = e.offsetHeight));
        return;
      }
      let t = document.activeElement;
      (isResolved &&
        t &&
        e.contains(t) &&
        resolvedRef.current?.focus({
          preventScroll: true,
        }),
        !isResolved &&
          restoreFocusRef.current &&
          approveRef.current?.focus({
            preventScroll: true,
          }),
        (restoreFocusRef.current = false));
      let n = previousHeightRef.current;
      e.style.height = ``;
      let r = e.offsetHeight;
      if (!n || n === r) return;
      ((animatingHeightRef.current = true),
        (e.style.height = `${n}px`),
        e.offsetHeight,
        (e.style.height = `${r}px`));
      let i = window.setTimeout(() => {
        ((e.style.height = ``),
          (animatingHeightRef.current = false),
          (previousHeightRef.current = e.offsetHeight));
      }, 560);
      return () => {
        (window.clearTimeout(i), (e.style.height = ``), (animatingHeightRef.current = false));
      };
    }, [isResolved]));
  let [, forceTick] = React.useState(0);
  React.useEffect(() => {
    if (!isResolved) return;
    let e = window.setInterval(() => forceTick((e) => e + 1), 3e4);
    return () => window.clearInterval(e);
  }, [isResolved]);
  let titleId = `${instanceId}-title`,
    rowId = `${instanceId}-row`,
    descriptionId = `${instanceId}-desc`,
    timerId = `${instanceId}-timer`,
    previewContent = preview ?? children,
    resolvedLabel =
      currentStatus === `approved`
        ? `Approved`
        : resolutionReason === `timeout`
          ? `Expired`
          : `Denied`,
    describedBy = [description ? descriptionId : null, expiresMs && !isResolved ? timerId : null]
      .filter(Boolean)
      .join(` `),
    actionFooter = (
      <div className={`ui-ap__foot`}>
        {expiresMs > 0 && (
          <span
            className={`ui-ap__expires`}
            data-paused={timerPaused || void 0}
            data-low={remainingSeconds <= 10 || void 0}
            aria-hidden={`true`}
          >
            <svg viewBox={`0 0 16 16`}>
              <circle cx={`8`} cy={`8`} r={`6`} />
              <path d={`M8 5v3.2l2 1.3`} />
            </svg>
            {`Expires in `}
            {formatCountdown(remainingSeconds)}
          </span>
        )}
        <div className={`ui-ap__actions`}>
          {onEdit && (
            <button
              type={`button`}
              className={`ui-ap__btn ui-ap__btn--ghost`}
              aria-disabled={busy || void 0}
              onClick={() => !busy && onEdit()}
            >
              {editLabel}
            </button>
          )}
          <button
            type={`button`}
            className={`ui-ap__btn ui-ap__btn--quiet ui-ap__deny`}
            aria-keyshortcuts={`Escape`}
            aria-disabled={busy || void 0}
            onClick={() => deny(`user`)}
          >
            {denyLabel}
            {shortcuts && <kbd className={`ui-ap__kbd`} aria-hidden={`true`}>{`Esc`}</kbd>}
          </button>
          <button
            ref={approveRef}
            type={`button`}
            className={`ui-ap__btn ui-ap__btn--primary ui-ap__approve`}
            aria-keyshortcuts={`Meta+Enter Control+Enter`}
            aria-disabled={busy || void 0}
            onClick={() => void approve()}
          >
            {approveLabel}
            {busy ? (
              <svg className={`ui-ap__spinner`} viewBox={`0 0 16 16`} aria-hidden={`true`}>
                <circle cx={`8`} cy={`8`} r={`6`} />
              </svg>
            ) : (
              shortcuts && (
                <kbd className={`ui-ap__kbd`} aria-hidden={`true`}>
                  {modifierKey === `⌘` ? `⌘↵` : `Ctrl ↵`}
                </kbd>
              )
            )}
          </button>
        </div>
      </div>
    );
  return (
    <div
      ref={rootRef}
      className={[`ui-ap`, className].filter(Boolean).join(` `)}
      role={`group`}
      aria-labelledby={isResolved ? rowId : titleId}
      aria-describedby={describedBy || void 0}
      aria-busy={busy || void 0}
      data-status={currentStatus}
      data-busy={busy || void 0}
      data-label={label ? `` : void 0}
      data-actions={actions}
      onKeyDown={onKeyDown}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(e) => {
        e.currentTarget.contains(e.relatedTarget) || setFocused(false);
      }}
    >
      <style href={`ui-approval-card`} precedence={`default`}>
        {approvalCardStyles}
      </style>
      {label && <div className={`ui-ap__label`}>{label}</div>}
      {(!isResolved || pendingLeaving) && (
        <div
          className={`ui-ap__pending`}
          data-leaving={pendingLeaving || void 0}
          data-entering={pendingEntering || void 0}
          inert={pendingLeaving}
          aria-hidden={pendingLeaving || void 0}
          onAnimationEnd={(e) => {
            e.target === e.currentTarget &&
              (pendingLeaving && setPendingLeaving(false),
              pendingEntering && setPendingEntering(false));
          }}
        >
          <div className={`ui-ap__card`}>
            <div className={`ui-ap__head`}>
              <span className={`ui-ap__icon`} aria-hidden={`true`}>
                {icon ?? (
                  <svg viewBox={`0 0 24 24`}>
                    <path d={`M12 3 5 5.8v5.4c0 4.3 2.9 8.2 7 9.8 4.1-1.6 7-5.5 7-9.8V5.8L12 3Z`} />
                    <path d={`m9.2 12.2 2 2 3.8-4`} />
                  </svg>
                )}
              </span>
              <div className={`ui-ap__titles`}>
                <h3 className={`ui-ap__title`} id={pendingLeaving ? void 0 : titleId}>
                  {title}
                </h3>
                {description && (
                  <p className={`ui-ap__desc`} id={pendingLeaving ? void 0 : descriptionId}>
                    {description}
                  </p>
                )}
              </div>
              {risk && (
                <span className={`ui-ap__risk`} data-risk={risk}>
                  <span className={`ui-ap__risk-dot`} aria-hidden={`true`} />
                  {riskLabels[risk]}
                  <span className={`ui-ap__risk-word`}>{` risk`}</span>
                </span>
              )}
            </div>
            {(previewContent || details?.length) && (
              <div className={`ui-ap__preview`}>
                {previewContent && <div className={`ui-ap__custom`}>{previewContent}</div>}
                {details?.length ? (
                  <dl className={`ui-ap__details`}>
                    {details.map((e, t) => (
                      <div className={`ui-ap__detail`} key={e.label + t}>
                        <dt>{e.label}</dt>
                        <dd>{e.value}</dd>
                      </div>
                    ))}
                  </dl>
                ) : null}
              </div>
            )}
            {allowAlways && (
              <label className={`ui-ap__always`}>
                <span className={`ui-ap__box`}>
                  <input
                    type={`checkbox`}
                    checked={always}
                    disabled={busy}
                    onChange={(e) => setAlways(e.target.checked)}
                  />
                  <svg viewBox={`0 0 16 16`} aria-hidden={`true`}>
                    <path d={`M4 8.3 6.8 11 12 5.2`} />
                  </svg>
                </span>
                <span className={`ui-ap__always-label`}>{alwaysLabel}</span>
              </label>
            )}
            {actions === `card` && actionFooter}
          </div>
          {actions === `tray` && actionFooter}
          {expiresMs > 0 && (
            <span
              className={`ui-ap__sr`}
              id={pendingLeaving ? void 0 : timerId}
            >{`Expires in ${remainingSeconds} seconds unless approved. The timer pauses while the card is hovered or focused.`}</span>
          )}
        </div>
      )}
      {isResolved && (
        <div
          ref={resolvedRef}
          className={`ui-ap__card ui-ap__resolved`}
          tabIndex={-1}
          data-status={currentStatus}
          onFocus={() => (restoreFocusRef.current = true)}
          onBlur={(e) => {
            (e.relatedTarget || e.currentTarget.isConnected) && (restoreFocusRef.current = false);
          }}
        >
          <span className={`ui-ap__mark`} aria-hidden={`true`}>
            <svg viewBox={`0 0 16 16`}>
              {currentStatus === `approved` ? (
                <path d={`M4.2 8.4 6.9 11 11.8 5.6`} pathLength={1} />
              ) : (
                <path d={`M5.2 5.2 10.8 10.8M10.8 5.2 5.2 10.8`} pathLength={1} />
              )}
            </svg>
          </span>
          <span className={`ui-ap__row-title`} id={rowId}>
            {title}
          </span>
          <span className={`ui-ap__row-status`}>
            {resolvedLabel}
            {currentStatus === `approved` && always && (
              <span className={`ui-ap__row-extra`}>{` · Always`}</span>
            )}
            {resolvedAt !== null && (
              <span className={`ui-ap__row-time`}>
                {` · `}
                {formatRelativeTime(resolvedAt)}
              </span>
            )}
          </span>
        </div>
      )}
      <span className={`ui-ap__sr`} role={`status`} aria-live={`polite`}>
        {announcement}
      </span>
    </div>
  );
}
function formatCountdown(e: number) {
  return `${Math.floor(e / 60)}:${String(e % 60).padStart(2, `0`)}`;
}
function formatRelativeTime(e: number) {
  let t = Math.floor((Date.now() - e) / 1e3);
  return t < 60
    ? `just now`
    : t < 3600
      ? `${Math.floor(t / 60)} min ago`
      : `${Math.floor(t / 3600)} h ago`;
}
var approvalCardStyles = `
/* Colors and motion as variables – override them on .ui-ap */
.ui-ap {
  --ui-ap-tray: #f0f0f0;
  --ui-ap-bg: #ffffff;
  --ui-ap-ink: #171717;
  --ui-ap-text: #6b6b6b;
  --ui-ap-muted: #8a8a8a;
  --ui-ap-line: #ececec;
  --ui-ap-soft: #fafafa;
  --ui-ap-tile: #f4f4f4;
  --ui-ap-hover: #e4e4e5;
  --ui-ap-primary: #171717;
  --ui-ap-primary-hover: #2e2e2e;
  --ui-ap-primary-ink: #ffffff;
  --ui-ap-primary-kbd: rgba(255, 255, 255, 0.14);
  --ui-ap-primary-kbd-ink: rgba(255, 255, 255, 0.72);
  --ui-ap-kbd: rgba(0, 0, 0, 0.055);
  --ui-ap-box: #d4d4d4;
  --ui-ap-box-hover: #b5b5b5;
  --ui-ap-ring: rgba(23, 23, 23, 0.32);
  --ui-ap-timer-low: #b7791f;
  --ui-ap-low-bg: #f2f2f2;
  --ui-ap-low-ink: #6b6b6b;
  --ui-ap-med-bg: #fbf3e2;
  --ui-ap-med-ink: #8a5a00;
  --ui-ap-high-bg: #fdeceb;
  --ui-ap-high-ink: #b42318;
  --ui-ap-ok-bg: #e9f6ee;
  --ui-ap-ok-ink: #1a7f45;
  --ui-ap-no-bg: #f2f2f2;
  --ui-ap-no-ink: #6b6b6b;
  --ui-ap-ease: cubic-bezier(0.22, 1, 0.36, 1);
  position: relative;
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
  overflow: hidden;
  container-type: inline-size;
  padding: 4px;
  border-radius: 20px;
  background: var(--ui-ap-tray);
  color: var(--ui-ap-text);
  font-family: "Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  font-size: 13px;
  line-height: 1.45;
  letter-spacing: -0.006em;
  text-align: left;
  -webkit-font-smoothing: antialiased;
  transition: height 520ms var(--ui-ap-ease);
}
.ui-ap *,
.ui-ap *::before,
.ui-ap *::after {
  box-sizing: border-box;
}

/* The white card – the pending request and the resolved row both live in one */
.ui-ap__card {
  position: relative;
  border-radius: 16px;
  background: var(--ui-ap-bg);
  box-shadow: 0 0 0 1px var(--ui-ap-line), 0 1px 2px rgba(0, 0, 0, 0.04);
}

/* ---------- Pending ---------- */
.ui-ap__pending > .ui-ap__card {
  padding: 16px;
}
.ui-ap__pending[data-leaving] {
  position: absolute;
  top: 4px;
  left: 4px;
  right: 4px;
  pointer-events: none;
  animation: ui-ap-out 280ms var(--ui-ap-ease) both;
}
.ui-ap__pending[data-entering] {
  animation: ui-ap-in 420ms var(--ui-ap-ease) 80ms both;
}
.ui-ap[data-busy] .ui-ap__pending {
  pointer-events: none;
}

.ui-ap__head {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: start;
  gap: 12px;
}
.ui-ap__icon {
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  border-radius: 9px;
  background: var(--ui-ap-tile);
  box-shadow: inset 0 0 0 1px var(--ui-ap-line);
  color: var(--ui-ap-ink);
}
.ui-ap__icon svg {
  width: 16px;
  height: 16px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.7;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.ui-ap__titles {
  min-width: 0;
  padding-top: 1px;
}
.ui-ap__title {
  margin: 0;
  overflow: hidden;
  color: var(--ui-ap-ink);
  font-size: 14px;
  font-weight: 550;
  line-height: 20px;
  letter-spacing: -0.011em;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.ui-ap__desc {
  margin: 1px 0 0;
  overflow: hidden;
  font-size: 13px;
  line-height: 18px;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.ui-ap__risk {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 22px;
  margin-top: 1px;
  padding: 0 9px 0 8px;
  border-radius: 999px;
  background: var(--ui-ap-low-bg);
  color: var(--ui-ap-low-ink);
  font-size: 12px;
  font-weight: 500;
  line-height: 1;
  white-space: nowrap;
}
.ui-ap__risk-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: currentColor;
  opacity: 0.8;
}
.ui-ap__risk-word {
  white-space: pre;
}
.ui-ap__risk[data-risk="medium"] {
  background: var(--ui-ap-med-bg);
  color: var(--ui-ap-med-ink);
}
.ui-ap__risk[data-risk="high"] {
  background: var(--ui-ap-high-bg);
  color: var(--ui-ap-high-ink);
}

/* Preview: custom content and key-value rows in one soft panel */
.ui-ap__preview {
  display: grid;
  gap: 12px;
  margin-top: 14px;
  padding: 12px;
  border-radius: 10px;
  background: var(--ui-ap-soft);
  box-shadow: inset 0 0 0 1px var(--ui-ap-line);
}
.ui-ap__custom {
  min-width: 0;
}
.ui-ap__custom + .ui-ap__details {
  padding-top: 12px;
  border-top: 1px solid var(--ui-ap-line);
}
.ui-ap__details {
  display: grid;
  grid-template-columns: max-content minmax(0, 1fr);
  gap: 6px 16px;
  margin: 0;
}
.ui-ap__detail {
  display: contents;
}
.ui-ap__detail dt {
  color: var(--ui-ap-muted);
}
.ui-ap__detail dd {
  min-width: 0;
  margin: 0;
  overflow: hidden;
  color: var(--ui-ap-ink);
  white-space: nowrap;
  text-overflow: ellipsis;
}

/* "Always allow" closes the card */
.ui-ap__always {
  display: flex;
  width: fit-content;
  max-width: 100%;
  margin-top: 14px;
  align-items: center;
  gap: 8px;
  min-width: 0;
  cursor: pointer;
  user-select: none;
}
.ui-ap__always-label {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.ui-ap__box {
  position: relative;
  display: grid;
  flex: none;
  width: 16px;
  height: 16px;
}
.ui-ap__box input {
  appearance: none;
  -webkit-appearance: none;
  width: 16px;
  height: 16px;
  margin: 0;
  border-radius: 5px;
  background: var(--ui-ap-bg);
  box-shadow: inset 0 0 0 1px var(--ui-ap-box);
  cursor: pointer;
  transition: background-color 160ms ease, box-shadow 160ms ease;
}
.ui-ap__box input:hover {
  box-shadow: inset 0 0 0 1px var(--ui-ap-box-hover);
}
.ui-ap__box input:checked {
  background: var(--ui-ap-primary);
  box-shadow: inset 0 0 0 1px var(--ui-ap-primary);
}
.ui-ap__box input:focus-visible {
  outline: none;
  box-shadow: inset 0 0 0 1px var(--ui-ap-primary), 0 0 0 2px var(--ui-ap-bg), 0 0 0 4px var(--ui-ap-ring);
}
.ui-ap__box svg {
  position: absolute;
  inset: 0;
  width: 16px;
  height: 16px;
  fill: none;
  stroke: var(--ui-ap-primary-ink);
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
  opacity: 0;
  transform: scale(0.6);
  transition: opacity 160ms ease, transform 260ms var(--ui-ap-ease);
  pointer-events: none;
}
.ui-ap__box input:checked + svg {
  opacity: 1;
  transform: none;
}

/* Optional label on the gray tray above the card */
.ui-ap__label {
  overflow: hidden;
  padding: 6px 8px 4px;
  color: var(--ui-ap-muted);
  font-size: 12.5px;
  line-height: 16px;
  white-space: nowrap;
  text-overflow: ellipsis;
}
/* The leaving request is laid over the resolved row – below the label when there is one */
.ui-ap[data-label] .ui-ap__pending[data-leaving] { top: 30px; }

/* actions="card": the buttons close the white card instead of sitting on the tray */
.ui-ap__card > .ui-ap__foot { min-height: 0; margin-top: 14px; padding: 0; }

/* The tray below the card: countdown on the left, buttons on the right */
.ui-ap__foot {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px 12px;
  min-height: 44px;
  padding: 6px 2px 2px 10px;
}
.ui-ap__expires {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-width: 0;
  color: var(--ui-ap-muted);
  font-size: 12.5px;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
  transition: color 300ms ease;
}
.ui-ap__expires svg {
  width: 14px;
  height: 14px;
  flex: none;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.ui-ap__expires[data-low] {
  color: var(--ui-ap-timer-low);
}
.ui-ap__actions {
  display: flex;
  flex: 0 0 auto;
  gap: 4px;
  margin-left: auto;
}
.ui-ap__btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 34px;
  padding: 0 12px;
  border: 0;
  border-radius: 10px;
  font: inherit;
  font-size: 13px;
  font-weight: 500;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition: background-color 160ms ease, box-shadow 160ms ease, transform 160ms var(--ui-ap-ease), opacity 160ms ease;
}
.ui-ap__btn:active,
.ui-ap__btn[data-pressed] {
  transform: scale(0.97);
}
.ui-ap__btn:focus-visible {
  outline: none;
}
.ui-ap__btn--primary {
  padding-right: 8px;
  background: var(--ui-ap-primary);
  color: var(--ui-ap-primary-ink);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.12);
}
.ui-ap__btn--primary:hover,
.ui-ap__btn--primary[data-pressed] {
  background: var(--ui-ap-primary-hover);
}
.ui-ap__btn--primary:focus-visible {
  box-shadow: 0 0 0 2px var(--ui-ap-tray), 0 0 0 4px var(--ui-ap-ring);
}
/* Quiet: transparent on the tray, a soft fill on hover */
.ui-ap__btn--quiet {
  padding-right: 8px;
  background: transparent;
  color: var(--ui-ap-ink);
}
.ui-ap__btn--quiet:hover,
.ui-ap__btn--quiet[data-pressed] {
  background: var(--ui-ap-hover);
}
.ui-ap__btn--quiet:focus-visible {
  box-shadow: 0 0 0 2px var(--ui-ap-ring);
}
.ui-ap__btn--ghost {
  background: transparent;
  color: var(--ui-ap-text);
}
.ui-ap__btn--ghost:hover {
  background: var(--ui-ap-hover);
  color: var(--ui-ap-ink);
}
.ui-ap__btn--ghost:focus-visible {
  box-shadow: 0 0 0 2px var(--ui-ap-ring);
}
.ui-ap[data-busy] .ui-ap__btn:not(.ui-ap__approve),
.ui-ap[data-busy] .ui-ap__always {
  opacity: 0.5;
}
.ui-ap[data-busy] .ui-ap__approve {
  cursor: progress;
}

.ui-ap__kbd {
  display: inline-grid;
  place-items: center;
  min-width: 20px;
  height: 20px;
  padding: 0 5px;
  border-radius: 6px;
  background: var(--ui-ap-kbd);
  color: var(--ui-ap-muted);
  font: inherit;
  font-size: 11px;
  font-weight: 500;
  line-height: 1;
}
.ui-ap__btn--primary .ui-ap__kbd {
  background: var(--ui-ap-primary-kbd);
  color: var(--ui-ap-primary-kbd-ink);
}
.ui-ap__spinner {
  width: 20px;
  height: 14px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-dasharray: 26 38;
  transform-origin: 50% 50%;
  animation: ui-ap-spin 800ms linear infinite;
}

/* ---------- Resolved row ---------- */
.ui-ap__resolved {
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 48px;
  padding: 12px 14px;
  outline: none;
  animation: ui-ap-in 420ms var(--ui-ap-ease) 120ms both;
}
.ui-ap__resolved:focus-visible {
  box-shadow: 0 0 0 1px var(--ui-ap-line), inset 0 0 0 2px var(--ui-ap-ring);
}
.ui-ap__mark {
  display: grid;
  flex: none;
  place-items: center;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: var(--ui-ap-ok-bg);
  color: var(--ui-ap-ok-ink);
  animation: ui-ap-pop 460ms var(--ui-ap-ease) 140ms both;
}
.ui-ap__resolved[data-status="denied"] .ui-ap__mark {
  background: var(--ui-ap-no-bg);
  color: var(--ui-ap-no-ink);
}
.ui-ap__mark svg {
  width: 14px;
  height: 14px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.9;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.ui-ap__mark path {
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
  animation: ui-ap-draw 420ms var(--ui-ap-ease) 300ms forwards;
}
.ui-ap__row-title {
  flex: 1 1 auto;
  min-width: 0;
  overflow: hidden;
  color: var(--ui-ap-ink);
  font-size: 13.5px;
  font-weight: 500;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.ui-ap__row-status {
  flex: none;
  color: var(--ui-ap-muted);
  white-space: nowrap;
}

.ui-ap__sr {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
  border: 0;
}

/* Narrow cards: buttons share the full width, the hints go */
@container (max-width: 400px) {
  .ui-ap__actions {
    flex: 1 1 100%;
    margin-left: 0;
  }
  .ui-ap__foot {
    padding-left: 2px;
  }
  .ui-ap__expires {
    padding-left: 8px;
  }
  .ui-ap__actions .ui-ap__btn {
    flex: 1 1 0;
    min-width: 0;
    padding: 0 10px;
  }
  .ui-ap__kbd {
    display: none;
  }
}
@container (max-width: 340px) {
  .ui-ap__pending > .ui-ap__card { padding: 14px; }
  .ui-ap__head { gap: 10px; }
  .ui-ap__risk-word { display: none; }
  .ui-ap__row-time { display: none; }
  .ui-ap__details { column-gap: 12px; }
}
/* Touch screens have no shortcuts */
@media (hover: none) {
  .ui-ap__kbd { display: none; }
}

@keyframes ui-ap-out {
  to { opacity: 0; transform: translateY(-6px) scale(0.985); filter: blur(2px); }
}
@keyframes ui-ap-in {
  from { opacity: 0; transform: translateY(4px); filter: blur(2px); }
  to { opacity: 1; transform: none; filter: none; }
}
@keyframes ui-ap-pop {
  from { opacity: 0; transform: scale(0.5); }
  to { opacity: 1; transform: none; }
}
@keyframes ui-ap-draw {
  to { stroke-dashoffset: 0; }
}
@keyframes ui-ap-spin {
  to { transform: rotate(360deg); }
}

@media (prefers-reduced-motion: reduce) {
  .ui-ap,
  .ui-ap *,
  .ui-ap *::before,
  .ui-ap *::after {
    animation-duration: 1ms !important;
    animation-delay: 0ms !important;
    transition-duration: 1ms !important;
  }
  .ui-ap__spinner { animation: ui-ap-spin 1.6s linear infinite !important; }
  .ui-ap__mark path { stroke-dashoffset: 0; }
}

/* Dark mode: follows a .dark class or data-theme="dark" on any ancestor, e.g. <html> */
:where(.dark, [data-theme="dark"]) .ui-ap {
  --ui-ap-tray: #111113;
  --ui-ap-bg: #19191b;
  --ui-ap-ink: #ededed;
  --ui-ap-text: #a1a1a1;
  --ui-ap-muted: #8b8b92;
  --ui-ap-line: #2a2a2e;
  --ui-ap-soft: #1f1f22;
  --ui-ap-tile: #1f1f22;
  --ui-ap-hover: #222225;
  --ui-ap-primary: #ededed;
  --ui-ap-primary-hover: #ffffff;
  --ui-ap-primary-ink: #19191b;
  --ui-ap-primary-kbd: rgba(0, 0, 0, 0.08);
  --ui-ap-primary-kbd-ink: rgba(25, 25, 27, 0.6);
  --ui-ap-kbd: rgba(255, 255, 255, 0.07);
  --ui-ap-box: rgba(255, 255, 255, 0.2);
  --ui-ap-box-hover: rgba(255, 255, 255, 0.32);
  --ui-ap-ring: rgba(255, 255, 255, 0.4);
  --ui-ap-timer-low: #e0a84a;
  --ui-ap-low-bg: rgba(255, 255, 255, 0.07);
  --ui-ap-low-ink: #a1a1a1;
  --ui-ap-med-bg: rgba(232, 183, 92, 0.12);
  --ui-ap-med-ink: #e8b75c;
  --ui-ap-high-bg: rgba(240, 138, 128, 0.12);
  --ui-ap-high-ink: #f08a80;
  --ui-ap-ok-bg: rgba(92, 201, 138, 0.13);
  --ui-ap-ok-ink: #5cc98a;
  --ui-ap-no-bg: rgba(255, 255, 255, 0.07);
  --ui-ap-no-ink: #a1a1a1;
}
`;
function Button({
  variant = `primary`,
  size = `md`,
  loading = false,
  icon: icon,
  iconRight: iconRight,
  children: children,
  className: className,
  disabled: disabled,
  onClick: onClick,
  type = `button`,
  ref: ref,
  ...g
}: ButtonProps) {
  let _ = typeof children == `string` ? children : void 0,
    v = !children && !!(icon || iconRight),
    y = React.useRef<HTMLButtonElement | null>(null),
    b = React.useRef(0),
    [x, S] = React.useState(false);
  React.useEffect(() => S(true), []);
  let C = _ ?? `label`,
    w = loading && icon ? `spinner` : getIconKey(icon),
    T = getIconKey(iconRight),
    E = `${C}|${w}|${T}`,
    D = React.useRef(E);
  return (
    React.useLayoutEffect(() => {
      let e = y.current;
      if (!e) return;
      let t = e.getBoundingClientRect().width,
        n = b.current,
        r = D.current !== E;
      ((b.current = t),
        (D.current = E),
        !(!r || !n || Math.abs(n - t) < 0.5) &&
          (window.matchMedia(`(prefers-reduced-motion: reduce)`).matches ||
            e.animate(
              [
                {
                  width: `${n}px`,
                },
                {
                  width: `${t}px`,
                },
              ],
              {
                duration: 480,
                easing: `cubic-bezier(0.25, 1, 0.5, 1)`,
              },
            )));
    }),
    (
      <>
        <style href={`ui-button`} precedence={`default`}>
          {buttonStyles}
        </style>
        <button
          type={type}
          className={[`ui-button`, className].filter(Boolean).join(` `)}
          data-variant={variant}
          data-size={size}
          data-loading={loading || void 0}
          data-icon-only={v || void 0}
          data-ready={x || void 0}
          ref={(e) => {
            ((y.current = e), typeof ref == `function` ? ref(e) : ref && (ref.current = e));
          }}
          disabled={disabled}
          aria-busy={loading || void 0}
          aria-disabled={loading || void 0}
          onClick={(e) => {
            if (loading) {
              e.preventDefault();
              return;
            }
            onClick?.(e);
          }}
          {...g}
        >
          {icon && (
            <span className={`ui-button__icon`} aria-hidden={`true`} key={`icon-${w}`}>
              {loading ? <ButtonSpinner /> : icon}
            </span>
          )}
          {children != null && (
            <span className={`ui-button__label`} data-text={_} key={`label-${C}`}>
              {children}
            </span>
          )}
          {iconRight && (
            <span className={`ui-button__icon`} aria-hidden={`true`} key={`icon-right-${T}`}>
              {iconRight}
            </span>
          )}
        </button>
      </>
    )
  );
}
var ButtonSpinner = () => (
  <svg
    className={`ui-button__spinner`}
    viewBox={`0 0 24 24`}
    fill={`none`}
    stroke={`currentColor`}
    strokeWidth={2}
    strokeLinecap={`round`}
  >
    <circle cx={`12`} cy={`12`} r={`8.5`} opacity={0.2} />
    <path d={`M12 3.5a8.5 8.5 0 0 1 8.5 8.5`} />
  </svg>
);
var iconIdentity = new WeakMap();
var buttonSpinnerStyles = 1;
function getIconKey(e: {} | null | undefined) {
  if (!React.isValidElement(e) || typeof e.type == `string`) return 0;
  let t = e.type;
  return (iconIdentity.has(t) || iconIdentity.set(t, buttonSpinnerStyles++), iconIdentity.get(t));
}
var buttonStyles = `
/* Colors and motion as variables – override them on .ui-button (see Theming in the docs) */
.ui-button {
  --ui-btn-ink: #171717;
  --ui-btn-on-ink: #fafafa;
  --ui-btn-dark-top: #323137;
  --ui-btn-dark-bottom: #201e25;
  --ui-btn-dark-hover-top: #3c3b42;
  --ui-btn-dark-hover-bottom: #29272f;
  --ui-btn-edge-top: #4b4951;
  --ui-btn-edge-mid: #31303a;
  --ui-btn-edge-bottom: #18171b;
  --ui-btn-ring: #0d0d0d;
  --ui-btn-dark-shadow: rgba(0, 0, 0, 0.1);
  --ui-btn-surface: #ffffff;
  --ui-btn-surface-hover: #fafafa;
  --ui-btn-surface-shadow: rgba(0, 0, 0, 0.06);
  --ui-btn-line: #e5e5e5;
  --ui-btn-muted: #737373;
  --ui-btn-hover: #404040;
  --ui-btn-fill: #f0f0f0;
  --ui-btn-shine: rgba(255, 255, 255, 0.82);
  --ui-btn-shine-on-ink: rgba(255, 255, 255, 0.95);
  --ui-btn-danger: #ff0000;
  --ui-btn-danger-bg: #ffe6e9;
  --ui-btn-focus: rgba(23, 23, 23, 0.22);
  --ui-btn-ease: cubic-bezier(0.22, 1, 0.36, 1);
  --ui-btn-load: 650ms;

  --h: 40px;
  --px: 16px;
  --gap: 8px;
  --fs: 14px;
  --icon: 18px;
  --radius: 12px;

  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--gap);
  height: var(--h);
  padding: 0 var(--px);
  margin: 0;
  border: 1px solid transparent;
  border-radius: var(--radius);
  font-family: "Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  font-size: var(--fs);
  font-weight: 500;
  line-height: 1;
  letter-spacing: -0.01em;
  white-space: nowrap;
  text-decoration: none;
  cursor: pointer;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  -webkit-font-smoothing: antialiased;
  transition:
    background-color 160ms ease,
    border-color 160ms ease,
    color 160ms ease,
    box-shadow 160ms ease,
    transform 160ms var(--ui-btn-ease),
    opacity 160ms ease;
}

.ui-button[data-size="sm"] {
  --h: 32px;
  --px: 12px;
  --gap: 6px;
  --fs: 13px;
  --icon: 16px;
  --radius: 10px;
}
.ui-button[data-size="lg"] {
  --h: 48px;
  --px: 20px;
  --gap: 10px;
  --fs: 15px;
  --icon: 20px;
  --radius: 14px;
}
.ui-button[data-icon-only] {
  width: var(--h);
  padding: 0;
}

/* primary: like the send button */
/* primary: a dark gradient with a light edge running down the border and a 1px ring */
.ui-button[data-variant="primary"] {
  background:
    linear-gradient(var(--ui-btn-dark-top), var(--ui-btn-dark-bottom)) padding-box,
    linear-gradient(var(--ui-btn-edge-top), var(--ui-btn-edge-mid), var(--ui-btn-edge-bottom)) border-box;
  color: var(--ui-btn-on-ink);
  box-shadow:
    0 0 0 1px var(--ui-btn-ring),
    0 2px 4px var(--ui-btn-dark-shadow);
}
.ui-button[data-variant="primary"]:hover:not(:disabled) {
  background:
    linear-gradient(var(--ui-btn-dark-hover-top), var(--ui-btn-dark-hover-bottom)) padding-box,
    linear-gradient(var(--ui-btn-edge-top), var(--ui-btn-edge-mid), var(--ui-btn-edge-bottom)) border-box;
}

/* secondary: white with the card outline */
.ui-button[data-variant="secondary"] {
  background: var(--ui-btn-surface);
  border-color: var(--ui-btn-line);
  color: var(--ui-btn-ink);
  box-shadow: 0 1px 2px var(--ui-btn-surface-shadow);
}
.ui-button[data-variant="secondary"]:hover:not(:disabled) {
  background: var(--ui-btn-surface-hover);
}

/* ghost: a muted label, the gray layer appears on hover */
.ui-button[data-variant="ghost"] {
  background: transparent;
  color: var(--ui-btn-muted);
}
.ui-button[data-variant="ghost"]:hover:not(:disabled) {
  background: var(--ui-btn-fill);
  color: var(--ui-btn-hover);
}

/* destructive: red label on a light red fill */
.ui-button[data-variant="destructive"] {
  background: var(--ui-btn-danger-bg);
  color: var(--ui-btn-danger);
}
.ui-button[data-variant="destructive"]:hover:not(:disabled) {
  background: color-mix(in srgb, var(--ui-btn-danger-bg) 88%, var(--ui-btn-danger));
}
.ui-button[data-variant="destructive"] .ui-button__label::after {
  --ui-btn-shine: rgba(255, 255, 255, 0.82);
}

.ui-button:active:not(:disabled):not([data-loading]) {
  transform: scale(0.97);
}
.ui-button:focus-visible {
  outline: 2px solid var(--ui-btn-focus);
  outline-offset: 2px;
}
.ui-button:disabled {
  opacity: 0.4;
  cursor: default;
}
.ui-button[data-loading] {
  cursor: default;
}

.ui-button__icon {
  display: grid;
  place-items: center;
  flex: none;
  width: var(--icon);
  height: var(--icon);
}
.ui-button__icon > svg {
  width: 100%;
  height: 100%;
}

/* Morph: the button clips while its width glides; changed parts blur in */
.ui-button {
  overflow: clip;
}
.ui-button[data-ready] .ui-button__label {
  animation: ui-button-label-in 480ms cubic-bezier(0.25, 1, 0.5, 1) both;
}
.ui-button[data-ready] .ui-button__icon {
  animation: ui-button-icon-in 520ms cubic-bezier(0.25, 1, 0.5, 1) both;
}

/* Loading: a band sweeps across a copy of the label, like "Request approval" in the Chat Composer */
.ui-button__label {
  position: relative;
}
.ui-button__label::after {
  content: attr(data-text);
  content: attr(data-text) / "";
  position: absolute;
  inset: 0;
  white-space: nowrap;
  color: transparent;
  background: linear-gradient(90deg, transparent 38%, var(--ui-btn-shine) 50%, transparent 62%) 100% 0 / 300% 100%
    no-repeat;
  -webkit-background-clip: text;
  background-clip: text;
  opacity: 0;
  pointer-events: none;
}
.ui-button[data-variant="primary"] .ui-button__label::after {
  --ui-btn-shine: var(--ui-btn-shine-on-ink);
}
.ui-button[data-loading] .ui-button__label {
  color: color-mix(in srgb, currentColor 55%, transparent);
}
.ui-button[data-loading] .ui-button__label::after {
  opacity: 1;
  animation: ui-button-sweep calc(var(--ui-btn-load) * 1.6) linear infinite;
}
.ui-button__spinner {
  animation: ui-button-spin 900ms linear infinite;
}

@keyframes ui-button-label-in {
  from {
    opacity: 0;
    filter: blur(3px);
    transform: translateY(25%);
  }
}
@keyframes ui-button-icon-in {
  from {
    opacity: 0;
    filter: blur(2px);
    transform: scale(0.7);
  }
}

@keyframes ui-button-spin {
  to {
    transform: rotate(1turn);
  }
}

@keyframes ui-button-sweep {
  from {
    background-position: 100% 0;
  }
  to {
    background-position: 0% 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .ui-button[data-ready] .ui-button__label,
  .ui-button[data-ready] .ui-button__icon {
    animation: none;
  }
  .ui-button {
    transition-duration: 1ms;
  }
  .ui-button[data-loading] .ui-button__label::after {
    animation: none;
    opacity: 0;
  }
}

/* Dark mode: follows a .dark class or data-theme="dark" on any ancestor, e.g. <html> */
:where(.dark, [data-theme="dark"]) .ui-button {
  /* primary inverts: a light gradient with dark text */
  --ui-btn-on-ink: #121213;
  --ui-btn-dark-top: #f4f4f5;
  --ui-btn-dark-bottom: #e4e4e7;
  --ui-btn-dark-hover-top: #ffffff;
  --ui-btn-dark-hover-bottom: #ececef;
  --ui-btn-edge-top: #ffffff;
  --ui-btn-edge-mid: #ececef;
  --ui-btn-edge-bottom: #d4d4d8;
  --ui-btn-ring: rgba(0, 0, 0, 0.6);
  --ui-btn-dark-shadow: rgba(0, 0, 0, 0.4);
  --ui-btn-shine-on-ink: rgba(255, 255, 255, 0.9);

  --ui-btn-ink: #ededed;
  --ui-btn-surface: #232326;
  --ui-btn-surface-hover: #2a2a2d;
  --ui-btn-surface-shadow: rgba(0, 0, 0, 0.4);
  --ui-btn-line: rgba(255, 255, 255, 0.1);
  --ui-btn-muted: #8f8f8f;
  --ui-btn-hover: #ededed;
  --ui-btn-fill: rgba(255, 255, 255, 0.06);
  --ui-btn-shine: rgba(237, 237, 237, 0.95);
  --ui-btn-danger: #ff6b6b;
  --ui-btn-danger-bg: rgba(255, 64, 64, 0.16);
  --ui-btn-focus: rgba(237, 237, 237, 0.3);
}
`;
var diffTokenPattern = /\s+|[\p{L}\p{N}_'’]+|[^\s\p{L}\p{N}_]/gu;
var isWhitespace = (text: string) => /^\s+$/.test(text);
function diffText(original: string, suggested: string): DiffSegment[] {
  let beforeTokens = original.match(diffTokenPattern) ?? [],
    afterTokens = suggested.match(diffTokenPattern) ?? [],
    prefixCount = 0;
  for (
    ;
    prefixCount < beforeTokens.length &&
    prefixCount < afterTokens.length &&
    beforeTokens[prefixCount] === afterTokens[prefixCount];
  )
    prefixCount++;
  let suffixCount = 0;
  for (
    ;
    suffixCount < beforeTokens.length - prefixCount &&
    suffixCount < afterTokens.length - prefixCount &&
    beforeTokens[beforeTokens.length - 1 - suffixCount] ===
      afterTokens[afterTokens.length - 1 - suffixCount];
  )
    suffixCount++;
  let beforeMiddle = beforeTokens.slice(prefixCount, beforeTokens.length - suffixCount),
    afterMiddle = afterTokens.slice(prefixCount, afterTokens.length - suffixCount),
    beforeCount = beforeMiddle.length,
    afterCount = afterMiddle.length,
    operations = beforeTokens.slice(0, prefixCount).map((e) => ({
      t: 0,
      s: e,
    }));
  if (beforeCount * afterCount > 4e6)
    (beforeMiddle.forEach((e) =>
      operations.push({
        t: 1,
        s: e,
      }),
    ),
      afterMiddle.forEach((e) =>
        operations.push({
          t: 2,
          s: e,
        }),
      ));
  else {
    let e = afterCount + 1,
      t = new Uint16Array((beforeCount + 1) * e);
    for (let n = beforeCount - 1; n >= 0; n--)
      for (let r = afterCount - 1; r >= 0; r--)
        t[n * e + r] =
          beforeMiddle[n] === afterMiddle[r]
            ? t[(n + 1) * e + r + 1] + 1
            : Math.max(t[(n + 1) * e + r], t[n * e + r + 1]);
    let n = 0,
      r = 0;
    for (; n < beforeCount && r < afterCount;)
      beforeMiddle[n] === afterMiddle[r]
        ? (operations.push({
            t: 0,
            s: beforeMiddle[n],
          }),
          n++,
          r++)
        : t[(n + 1) * e + r] >= t[n * e + r + 1]
          ? operations.push({
              t: 1,
              s: beforeMiddle[n++],
            })
          : operations.push({
              t: 2,
              s: afterMiddle[r++],
            });
    for (; n < beforeCount;)
      operations.push({
        t: 1,
        s: beforeMiddle[n++],
      });
    for (; r < afterCount;)
      operations.push({
        t: 2,
        s: afterMiddle[r++],
      });
  }
  beforeTokens.slice(beforeTokens.length - suffixCount).forEach((e) =>
    operations.push({
      t: 0,
      s: e,
    }),
  );
  for (let e = 0; e < operations.length; e++) {
    if (operations[e].t === 0 || (e > 0 && operations[e - 1].t !== 0)) continue;
    let t = operations[e].t,
      n = e;
    for (; n < operations.length && operations[n].t === t;) n++;
    if (!(n < operations.length && operations[n].t !== 0)) {
      for (
        ;
        n < operations.length &&
        operations[n].t === 0 &&
        operations[n].s === operations[e].s &&
        isWhitespace(operations[e].s);
      )
        ((operations[n] = {
          t,
          s: operations[n].s,
        }),
          (operations[e] = {
            t: 0,
            s: operations[e].s,
          }),
          e++,
          n++);
      e = n - 1;
    }
  }
  let grouped: DiffSegment[] = [];
  for (let e of operations) {
    let t = grouped[grouped.length - 1];
    if (e.t === 0)
      t?.type === `equal`
        ? (t.text += e.s)
        : grouped.push({
            type: `equal`,
            text: e.s,
          });
    else {
      t?.type !== `change` &&
        grouped.push({
          type: `change`,
          remove: ``,
          insert: ``,
        });
      let n = grouped[grouped.length - 1] as DiffChange;
      e.t === 1 ? (n.remove += e.s) : (n.insert += e.s);
    }
  }
  let merged: DiffSegment[] = [];
  for (let e = 0; e < grouped.length; e++) {
    let t = grouped[e],
      n = merged[merged.length - 1],
      r = grouped[e + 1];
    if (
      t.type === `equal` &&
      isWhitespace(t.text) &&
      n?.type === `change` &&
      r?.type === `change`
    ) {
      ((n.remove += t.text + r.remove), (n.insert += t.text + r.insert), e++);
      continue;
    }
    merged.push({
      ...t,
    });
  }
  let output: DiffSegment[] = [],
    pushEqual = (e: string) => {
      if (!e) return;
      let t = output[output.length - 1];
      t?.type === `equal`
        ? (t.text += e)
        : output.push({
            type: `equal`,
            text: e,
          });
    };
  for (let e of merged) {
    if (e.type === `equal`) {
      pushEqual(e.text);
      continue;
    }
    let { remove: t, insert: n } = e,
      r = ``,
      i = ``;
    if (t && n) {
      let e = t.match(/^\s+/)?.[0] ?? ``;
      e &&
        n.startsWith(e) &&
        e.length < t.length &&
        e.length < n.length &&
        ((r = e), (t = t.slice(e.length)), (n = n.slice(e.length)));
      let a = t.match(/\s+$/)?.[0] ?? ``;
      a &&
        n.endsWith(a) &&
        a.length < t.length &&
        a.length < n.length &&
        ((i = a), (t = t.slice(0, -a.length)), (n = n.slice(0, -a.length)));
    }
    (pushEqual(r),
      output.push({
        type: `change`,
        remove: t,
        insert: n,
      }),
      pushEqual(i));
  }
  return output;
}
var suggestionCount = (count: number) => `${count} suggestion${count === 1 ? `` : `s`}`;
var quoteText = (text: string) => `“${text.trim()}”`;
var describeChange = (change: { remove: string; insert: string }) =>
  change.remove.trim() && change.insert.trim()
    ? `replace ${quoteText(change.remove)} with ${quoteText(change.insert)}`
    : change.insert.trim()
      ? `add ${quoteText(change.insert)}`
      : `remove ${quoteText(change.remove)}`;
function DocumentDiff({
  original = ``,
  suggested = ``,
  changes: changes,
  onChange: onChange,
  onDone: onDone,
  label: label,
  ref: forwardedRef,
  className: className,
}: InlineDiffProps) {
  let segments = React.useMemo(
      () => changes ?? diffText(original, suggested),
      [changes, original, suggested],
    ),
    signature = React.useMemo(() => JSON.stringify(segments), [segments]),
    changeList = React.useMemo(() => {
      let e: DiffChangeEntry[] = [];
      return (
        segments.forEach((t, n) => {
          t.type === `change` &&
            e.push({
              seg: n,
              remove: t.remove,
              insert: t.insert,
            });
        }),
        e
      );
    }, [segments]),
    [decisions, setDecisions] = React.useState<Partial<Record<number, DiffDecision>>>({}),
    [history, setHistory] = React.useState<number[][]>([]),
    [hovered, setHovered] = React.useState<number | null>(null),
    [focused, setFocused] = React.useState<number | null>(null),
    [highlighted, setHighlighted] = React.useState<number | null>(null),
    [announcement, setAnnouncement] = React.useState(``),
    [previousSignature, setPreviousSignature] = React.useState(signature);
  previousSignature !== signature &&
    (setPreviousSignature(signature),
    setDecisions({}),
    setHistory([]),
    setHovered(null),
    setFocused(null),
    setHighlighted(null));
  let rootRef = React.useRef<HTMLDivElement | null>(null),
    changeRefs = React.useRef<HTMLDivElement | null>(null),
    toolbarRef = React.useRef<HTMLDivElement | null>(null),
    undoRef = React.useRef<HTMLButtonElement | null>(null),
    registeredRefs = React.useRef<Array<HTMLSpanElement | null>>([]),
    activeRef = React.useRef(0),
    pendingFocusRef = React.useRef<number | "undo" | number | null>(null),
    latestDecisionRef = React.useRef<number | null>(null),
    callbacksRef = React.useRef({
      onChange: onChange,
      onDone: onDone,
    });
  callbacksRef.current = {
    onChange: onChange,
    onDone: onDone,
  };
  let pendingIndices = changeList.map((e, t) => t).filter((e) => !decisions[e]),
    allReviewed = changeList.length > 0 && pendingIndices.length === 0,
    composeText = (e: Partial<Record<number, DiffDecision>>) =>
      segments
        .map((t, n) =>
          t.type === `equal`
            ? t.text
            : e[changeList.findIndex((e) => e.seg === n)] === `accepted`
              ? t.insert
              : t.remove,
        )
        .join(``),
    currentRef = React.useRef({
      decisions: decisions,
      history: history,
      list: changeList,
      pending: pendingIndices,
    });
  currentRef.current = {
    decisions: decisions,
    history: history,
    list: changeList,
    pending: pendingIndices,
  };
  let applyDecision = (e: number[], t: DiffDecision, n: boolean = false) => {
      let { decisions: r, list: i } = currentRef.current,
        a = e.filter((e) => e >= 0 && e < i.length && !r[e]);
      if (!a.length) return;
      let o = {
        ...r,
      };
      a.forEach((e) => (o[e] = t));
      let c = i.length - Object.keys(o).length;
      (setDecisions(o),
        setHistory((e) => [...e, a]),
        setHighlighted(null),
        (latestDecisionRef.current = Math.max(...a)));
      let u = t === `accepted` ? `Accepted` : `Rejected`,
        d =
          a.length === 1
            ? describeChange(i[a[0]]).replace(/^./, (e) => e.toUpperCase())
            : `${a.length} suggestions`;
      if (
        (setAnnouncement(
          `${u}: ${d}. ${c ? `${suggestionCount(c)} left.` : `All changes reviewed.`}`,
        ),
        n)
      ) {
        let e = Math.max(...a),
          t = i.map((e, t) => t).filter((e) => !o[e]);
        pendingFocusRef.current = c ? (t.find((t) => t > e) ?? t[0]) : `undo`;
      }
      let f = composeText(o);
      (callbacksRef.current.onChange?.(f), c || callbacksRef.current.onDone?.(f));
    },
    undo = (e: boolean = false) => {
      let { decisions: t, history: n } = currentRef.current,
        r = n[n.length - 1];
      if (!r) return;
      let i = {
        ...t,
      };
      (r.forEach((e) => delete i[e]),
        setDecisions(i),
        setHistory(n.slice(0, -1)),
        setAnnouncement(
          `Undone. ${suggestionCount(currentRef.current.list.length - Object.keys(i).length)} left.`,
        ),
        e && (pendingFocusRef.current = Math.min(...r)),
        callbacksRef.current.onChange?.(composeText(i)));
    },
    reset = () => {
      (setDecisions({}),
        setHistory([]),
        setHighlighted(null),
        setHovered(null),
        setAnnouncement(``),
        (latestDecisionRef.current = null));
    };
  (React.useImperativeHandle(forwardedRef, () => ({
    highlight: (e: number | null) => setHighlighted(e),
    accept: (e) => applyDecision([e], `accepted`),
    reject: (e) => applyDecision([e], `rejected`),
    acceptAll: () => applyDecision(currentRef.current.pending, `accepted`),
    rejectAll: () => applyDecision(currentRef.current.pending, `rejected`),
    undo: () => undo(),
    reset: reset,
  })),
    React.useLayoutEffect(() => {
      let e = pendingFocusRef.current;
      e !== null &&
        ((pendingFocusRef.current = null),
        e === `undo` ? undoRef.current?.focus() : registeredRefs.current[e]?.focus());
    }, [decisions]));
  let q =
    [hovered, focused, highlighted].find(
      (e) => e !== null && !decisions[e] && e < changeList.length,
    ) ?? null;
  React.useEffect(() => {
    q !== null && (latestDecisionRef.current = q);
  }, [q]);
  let J = (e: number) => {
    let t = currentRef.current.pending;
    if (!t.length) return;
    let n = q ?? latestDecisionRef.current ?? (e === 1 ? -1 : 1 / 0),
      r =
        e === 1
          ? (t.find((e) => e > n) ?? t[0])
          : ([...t].reverse().find((e) => e < n) ?? t[t.length - 1]);
    (window.clearTimeout(activeRef.current),
      setHovered(null),
      setHighlighted(r),
      (latestDecisionRef.current = r));
    let i = registeredRefs.current[r];
    if (!i) return;
    focused !== null &&
      i.focus({
        preventScroll: true,
      });
    let a = window.matchMedia?.(`(prefers-reduced-motion: reduce)`).matches;
    i.scrollIntoView({
      block: `nearest`,
      inline: `nearest`,
      behavior: a ? `auto` : `smooth`,
    });
  };
  React.useEffect(() => {
    if (highlighted === null) return;
    let e = (e: PointerEvent) => {
      rootRef.current?.contains(e.target as Node | null) || setHighlighted(null);
    };
    return (
      document.addEventListener(`pointerdown`, e),
      () => document.removeEventListener(`pointerdown`, e)
    );
  }, [highlighted]);
  let [Y, ee] = React.useState<{
      left: number;
      top: number;
      snap: boolean;
    } | null>(null),
    X = React.useRef(false);
  React.useLayoutEffect(() => {
    let e = () => {
      let e = changeRefs.current,
        t = toolbarRef.current,
        n = q === null ? null : registeredRefs.current[q];
      if (!e || !t || !n) return;
      let r = e.getBoundingClientRect(),
        i = r.width ? e.offsetWidth / r.width : 1,
        a = n.getClientRects()[0] ?? n.getBoundingClientRect(),
        o = t.offsetWidth,
        s = t.offsetHeight,
        c = (a.left - r.left + a.width / 2) * i,
        l = Math.min(Math.max(c - o / 2, 8), Math.max(8, e.offsetWidth - o - 8)),
        u = (a.top - r.top) * i - s - 6;
      (ee({
        left: l,
        top: u,
        snap: !X.current,
      }),
        (X.current = true));
    };
    if (q === null) {
      X.current = false;
      return;
    }
    e();
    let t = new ResizeObserver(e);
    return (changeRefs.current && t.observe(changeRefs.current), () => t.disconnect());
  }, [q, decisions]);
  let Z = (e: number | null) => {
      (window.clearTimeout(activeRef.current), setHovered(e));
    },
    Q: React.MouseEventHandler<HTMLDivElement> = () => {
      (window.clearTimeout(activeRef.current),
        (activeRef.current = window.setTimeout(() => setHovered(null), 140)));
    };
  React.useEffect(() => () => window.clearTimeout(activeRef.current), []);
  let te = (e: React.KeyboardEvent<HTMLSpanElement>, t: number) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      let n = e.key.toLowerCase();
      n === `y` || n === `enter`
        ? (e.preventDefault(), applyDecision([t], `accepted`, true))
        : n === `n` || n === `backspace` || n === `delete`
          ? (e.preventDefault(), applyDecision([t], `rejected`, true))
          : n === `escape` && e.currentTarget.blur();
    },
    ne = changeList.length,
    $ = -1;
  return (
    <div
      ref={rootRef}
      className={[`ui-df`, className].filter(Boolean).join(` `)}
      data-done={allReviewed || void 0}
      onKeyDown={(e) => {
        e.key === `Escape` && highlighted !== null && setHighlighted(null);
      }}
    >
      <style href={`ui-inline-diff`} precedence={`default`}>
        {documentDiffStyles}
      </style>
      {label && (
        <div className={`ui-df__label`}>
          <svg viewBox={`0 0 16 16`} aria-hidden={`true`}>
            <path
              d={`M8 1.75c.3 2.9 1.35 3.95 4.25 4.25-2.9.3-3.95 1.35-4.25 4.25C7.7 7.35 6.65 6.3 3.75 6 6.65 5.7 7.7 4.65 8 1.75Z`}
            />
            <path
              d={`M12.5 10.25c.15 1.25.6 1.7 1.75 1.75-1.15.15-1.6.6-1.75 1.75-.15-1.15-.6-1.6-1.75-1.75 1.15-.05 1.6-.5 1.75-1.75Z`}
            />
          </svg>
          <span>{label}</span>
        </div>
      )}
      <div ref={changeRefs} className={`ui-df__card`}>
        <div className={`ui-df__head`}>
          <div className={`ui-df__bar`}>
            <div
              className={`ui-df__layer`}
              data-show={!allReviewed || void 0}
              inert={allReviewed}
              aria-hidden={allReviewed || void 0}
            >
              <span className={`ui-df__count`}>
                <span className={`ui-df__num`}>{pendingIndices.length}</span>
                <span className={`ui-df__word`}>
                  {pendingIndices.length === 1 ? `suggestion` : `suggestions`}
                </span>
              </span>
              <span className={`ui-df__actions`}>
                <span className={`ui-df__nav`} onMouseDown={(e) => e.preventDefault()}>
                  <button
                    type={`button`}
                    className={`ui-df__icon`}
                    onClick={() => J(-1)}
                    disabled={!pendingIndices.length}
                    aria-label={`Previous suggestion`}
                  >
                    <svg viewBox={`0 0 16 16`} aria-hidden={`true`}>
                      <path d={`M10 12.5 5.5 8 10 3.5`} />
                    </svg>
                  </button>
                  <button
                    type={`button`}
                    className={`ui-df__icon`}
                    onClick={() => J(1)}
                    disabled={!pendingIndices.length}
                    aria-label={`Next suggestion`}
                  >
                    <svg viewBox={`0 0 16 16`} aria-hidden={`true`}>
                      <path d={`M6 3.5 10.5 8 6 12.5`} />
                    </svg>
                  </button>
                </span>
                <button
                  type={`button`}
                  className={`ui-df__btn`}
                  onClick={() => applyDecision(pendingIndices, `rejected`)}
                  disabled={!pendingIndices.length}
                >{`Reject all`}</button>
                <button
                  type={`button`}
                  className={`ui-df__btn ui-df__btn--primary`}
                  onClick={() => applyDecision(pendingIndices, `accepted`)}
                  disabled={!pendingIndices.length}
                >{`Accept all`}</button>
              </span>
            </div>
            <div
              className={`ui-df__layer`}
              data-show={allReviewed || void 0}
              inert={!allReviewed}
              aria-hidden={!allReviewed || void 0}
            >
              <span className={`ui-df__count ui-df__count--done`}>
                <svg className={`ui-df__ok`} viewBox={`0 0 16 16`} aria-hidden={`true`}>
                  <path d={`M3.75 8.4 6.6 11.1 12.25 5`} pathLength={1} />
                </svg>
                {`All changes reviewed`}
              </span>
              <button
                ref={undoRef}
                type={`button`}
                className={`ui-df__btn`}
                onClick={() => undo(true)}
                disabled={!history.length}
              >
                <svg viewBox={`0 0 16 16`} aria-hidden={`true`}>
                  <path d={`M5.5 4 2.75 6.75 5.5 9.5`} />
                  <path d={`M3 6.75h6.5a3.75 3.75 0 0 1 0 7.5H7.5`} />
                </svg>
                {`Undo`}
              </button>
            </div>
          </div>
        </div>
        <div className={`ui-df__body`}>
          <p className={`ui-df__text`}>
            {segments.map((e, t) => {
              if (e.type === `equal`) return <span key={t}>{e.text}</span>;
              $++;
              let n = $,
                i = decisions[n] ?? `pending`,
                a = i === `pending`;
              return (
                <span
                  ref={(e) => {
                    registeredRefs.current[n] = e;
                  }}
                  className={`ui-df__chg`}
                  data-state={i}
                  data-active={q === n || void 0}
                  tabIndex={a ? 0 : void 0}
                  role={a ? `button` : void 0}
                  aria-label={
                    a
                      ? `Suggestion ${n + 1} of ${ne}: ${describeChange(e)}. Press Y to accept, N to reject`
                      : void 0
                  }
                  onKeyDown={a ? (e) => te(e, n) : void 0}
                  onFocus={() => setFocused(n)}
                  onBlur={() => setFocused((e) => (e === n ? null : e))}
                  onMouseEnter={() => Z(n)}
                  onMouseLeave={Q}
                  key={t}
                >
                  {e.remove && (
                    <del className={`ui-df__del`} aria-hidden={i === `accepted` || void 0}>
                      {e.remove}
                    </del>
                  )}
                  {e.insert && (
                    <ins className={`ui-df__ins`} aria-hidden={i === `rejected` || void 0}>
                      {e.insert}
                    </ins>
                  )}
                </span>
              );
            })}
          </p>
        </div>
        <div
          ref={toolbarRef}
          className={`ui-df__pop`}
          data-open={q !== null || void 0}
          data-snap={Y?.snap || void 0}
          style={
            Y
              ? {
                  left: Y.left,
                  top: Y.top,
                }
              : void 0
          }
          role={`group`}
          aria-label={`Review suggestion`}
          aria-hidden={q === null || void 0}
          onMouseEnter={() => q !== null && Z(q)}
          onMouseLeave={Q}
          onMouseDown={(e) => e.preventDefault()}
        >
          <button
            type={`button`}
            tabIndex={-1}
            className={`ui-df__pbtn`}
            aria-label={`Accept suggestion`}
            onClick={() => q !== null && applyDecision([q], `accepted`, focused === q)}
          >
            <svg viewBox={`0 0 16 16`} aria-hidden={`true`}>
              <path d={`M3.75 8.4 6.6 11.1 12.25 5`} />
            </svg>
            {`Accept`}
            <kbd>{`Y`}</kbd>
          </button>
          <span className={`ui-df__sep`} aria-hidden={`true`} />
          <button
            type={`button`}
            tabIndex={-1}
            className={`ui-df__pbtn`}
            aria-label={`Reject suggestion`}
            onClick={() => q !== null && applyDecision([q], `rejected`, focused === q)}
          >
            <svg viewBox={`0 0 16 16`} aria-hidden={`true`}>
              <path d={`M4.5 4.5l7 7M11.5 4.5l-7 7`} />
            </svg>
            {`Reject`}
            <kbd>{`N`}</kbd>
          </button>
        </div>
      </div>
      <span className={`ui-df__sr`} role={`status`} aria-live={`polite`}>
        {announcement}
      </span>
    </div>
  );
}
var documentDiffStyles = `
.ui-df {
  --ui-df-ink: #171717;
  --ui-df-text: #525252;
  --ui-df-muted: #8a8a8a;
  --ui-df-tray: #f0f0f0;
  --ui-df-line: #ececec;
  --ui-df-bg: #ffffff;
  --ui-df-soft: #f5f5f5;
  --ui-df-add: rgba(34, 160, 90, 0.1);
  --ui-df-add-strong: rgba(34, 160, 90, 0.18);
  --ui-df-add-ink: #18794e;
  --ui-df-del: rgba(220, 60, 60, 0.08);
  --ui-df-del-strong: rgba(220, 60, 60, 0.15);
  --ui-df-del-ink: #b42318;
  --ui-df-strike: rgba(180, 35, 24, 0.55);
  --ui-df-ok: #1f8a4c;
  --ui-df-pop: #171717;
  --ui-df-pop-ink: #ffffff;
  --ui-df-pop-soft: rgba(255, 255, 255, 0.14);
  --ui-df-pop-kbd: rgba(255, 255, 255, 0.55);
  --ui-df-primary: #171717;
  --ui-df-primary-ink: #ffffff;
  --ui-df-focus: rgba(23, 23, 23, 0.35);
  --ui-df-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
  --ui-df-ease: cubic-bezier(0.22, 1, 0.36, 1);
  position: relative;
  box-sizing: border-box;
  display: grid;
  width: 100%;
  min-width: 0;
  padding: 4px;
  border-radius: 20px;
  background: var(--ui-df-tray);
  color: var(--ui-df-text);
  font-family: "Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
  text-align: left;
}
.ui-df *, .ui-df *::before, .ui-df *::after { box-sizing: border-box; }

/* The optional label sits on the gray tray, above the card */
.ui-df__label {
  display: flex;
  align-items: center;
  gap: 6px;
  min-width: 0;
  padding: 6px 8px 4px;
  color: var(--ui-df-muted);
  font-size: 12.5px;
  line-height: 1.3;
  letter-spacing: -0.003em;
}
.ui-df__label span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.ui-df__label svg { flex: none; width: 13px; height: 13px; fill: currentColor; }

/* The white card: toolbar, paragraph and the popover (positioned relative to it) */
.ui-df__card {
  position: relative;
  min-width: 0;
  border-radius: 16px;
  background: var(--ui-df-bg);
  box-shadow: 0 0 0 1px var(--ui-df-line), var(--ui-df-shadow);
}
.ui-df__head {
  padding: 10px 10px 10px 16px;
  border-bottom: 1px solid var(--ui-df-line);
}

/* The two toolbars share one cell and cross-fade */
.ui-df__bar { display: grid; }
.ui-df__layer {
  grid-area: 1 / 1;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  min-width: 0;
  opacity: 0;
  visibility: hidden;
  transform: translateY(4px);
  filter: blur(2px);
  transition: opacity 260ms ease, transform 420ms var(--ui-df-ease), filter 260ms ease, visibility 0s 420ms;
}
.ui-df__layer[data-show] {
  opacity: 1;
  visibility: visible;
  transform: none;
  filter: none;
  transition: opacity 320ms ease 80ms, transform 460ms var(--ui-df-ease) 80ms, filter 320ms ease 80ms, visibility 0s;
}
/* Narrow cards (e.g. a side panel): the count keeps only its number, so the toolbar stays on one line */
.ui-df__card { container: ui-df-card / inline-size; }
@container ui-df-card (max-width: 400px) {
  .ui-df__word { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
}
.ui-df__count {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  color: var(--ui-df-ink);
  font-size: 13px;
  font-weight: 500;
  line-height: 1;
  letter-spacing: -0.006em;
  white-space: nowrap;
}
.ui-df__num {
  display: inline-grid;
  place-items: center;
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  border-radius: 999px;
  background: var(--ui-df-add);
  color: var(--ui-df-add-ink);
  font-size: 11.5px;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
}
.ui-df__ok {
  width: 16px;
  height: 16px;
  fill: none;
  stroke: var(--ui-df-ok);
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
}
.ui-df[data-done] .ui-df__ok { animation: ui-df-draw 420ms var(--ui-df-ease) 220ms forwards; }
.ui-df__actions { display: inline-flex; align-items: center; gap: 6px; margin-left: auto; }
.ui-df__nav { display: inline-flex; gap: 2px; margin-right: 2px; }

.ui-df__btn,
.ui-df__icon {
  appearance: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: 30px;
  margin: 0;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: var(--ui-df-ink);
  font: inherit;
  font-size: 13px;
  font-weight: 500;
  line-height: 1;
  letter-spacing: -0.006em;
  white-space: nowrap;
  cursor: pointer;
  transition: background-color 160ms ease, color 160ms ease, opacity 160ms ease, transform 160ms var(--ui-df-ease);
  -webkit-tap-highlight-color: transparent;
}
.ui-df__btn { padding: 0 11px; box-shadow: inset 0 0 0 1px var(--ui-df-line); }
.ui-df__icon { width: 28px; color: var(--ui-df-muted); }
.ui-df__btn svg,
.ui-df__icon svg {
  width: 14px;
  height: 14px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.6;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.ui-df__btn:hover:not(:disabled) { background: var(--ui-df-soft); }
.ui-df__icon:hover:not(:disabled) { background: var(--ui-df-soft); color: var(--ui-df-ink); }
.ui-df__btn--primary { background: var(--ui-df-primary); color: var(--ui-df-primary-ink); box-shadow: none; }
.ui-df__btn--primary:hover:not(:disabled) { background: var(--ui-df-primary); opacity: 0.88; }
.ui-df__btn:active:not(:disabled),
.ui-df__icon:active:not(:disabled) { transform: scale(0.97); }
.ui-df__btn:disabled,
.ui-df__icon:disabled { opacity: 0.4; cursor: default; }
.ui-df__btn:focus-visible,
.ui-df__icon:focus-visible { outline: 2px solid var(--ui-df-focus); outline-offset: 2px; }

/* The prose */
.ui-df__body { padding: 16px 18px 18px; }
.ui-df__text {
  margin: 0;
  color: var(--ui-df-text);
  font-size: 15px;
  line-height: 1.65;
  letter-spacing: -0.006em;
  white-space: pre-line; /* line breaks stay, doubled spaces around a settled change collapse */
  overflow-wrap: anywhere;
}

.ui-df__chg { border-radius: 4px; cursor: pointer; scroll-margin: 64px 0 24px; }
.ui-df__chg:not([data-state="pending"]) { cursor: auto; }
.ui-df__chg:focus { outline: none; }
.ui-df__chg:focus-visible { outline: 2px solid var(--ui-df-focus); outline-offset: 2px; }

.ui-df__del,
.ui-df__ins {
  padding: 1px 2px;
  border-radius: 4px;
  -webkit-box-decoration-break: clone;
  box-decoration-break: clone;
  font-size: 1em;
  transition:
    background-color 360ms ease,
    color 360ms ease,
    text-decoration-color 300ms ease,
    font-size 460ms var(--ui-df-ease),
    padding 460ms var(--ui-df-ease),
    margin 460ms var(--ui-df-ease),
    opacity 300ms ease;
}
.ui-df__del {
  background: var(--ui-df-del);
  color: var(--ui-df-del-ink);
  text-decoration: line-through;
  text-decoration-color: var(--ui-df-strike);
  text-decoration-thickness: 1.2px;
}
.ui-df__ins {
  background: var(--ui-df-add);
  color: var(--ui-df-add-ink);
  text-decoration: none;
}
.ui-df__del + .ui-df__ins { margin-left: 3px; }
.ui-df__chg[data-active] .ui-df__del { background: var(--ui-df-del-strong); }
.ui-df__chg[data-active] .ui-df__ins { background: var(--ui-df-add-strong); }

/* Accepted: the old words shrink away, the new ones settle into the text */
.ui-df__chg[data-state="accepted"] .ui-df__del,
.ui-df__chg[data-state="rejected"] .ui-df__ins {
  font-size: 0;
  padding: 0;
  margin: 0;
  opacity: 0;
}
.ui-df__chg[data-state="accepted"] .ui-df__ins,
.ui-df__chg[data-state="rejected"] .ui-df__del {
  padding: 0;
  margin: 0;
  background: transparent;
  color: inherit;
  text-decoration-color: transparent;
}

/* Popover */
.ui-df__pop {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 2px;
  padding: 3px;
  border-radius: 10px;
  background: var(--ui-df-pop);
  color: var(--ui-df-pop-ink);
  box-shadow: 0 6px 20px -6px rgba(0, 0, 0, 0.35), 0 1px 2px rgba(0, 0, 0, 0.2);
  opacity: 0;
  visibility: hidden;
  transform: translateY(4px) scale(0.96);
  transform-origin: 50% 100%;
  pointer-events: none;
  transition:
    opacity 180ms ease,
    transform 260ms var(--ui-df-ease),
    left 320ms var(--ui-df-ease),
    top 320ms var(--ui-df-ease),
    visibility 0s 260ms;
}
.ui-df__pop[data-open] {
  opacity: 1;
  visibility: visible;
  transform: none;
  pointer-events: auto;
  transition:
    opacity 180ms ease,
    transform 300ms var(--ui-df-ease),
    left 320ms var(--ui-df-ease),
    top 320ms var(--ui-df-ease),
    visibility 0s;
}
.ui-df__pop[data-snap] { transition-property: opacity, transform, visibility; }
.ui-df__pbtn {
  appearance: none;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 28px;
  margin: 0;
  padding: 0 8px 0 7px;
  border: 0;
  border-radius: 7px;
  background: transparent;
  color: inherit;
  font: inherit;
  font-size: 12.5px;
  font-weight: 500;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  transition: background-color 140ms ease;
}
.ui-df__pbtn:hover { background: var(--ui-df-pop-soft); }
.ui-df__pbtn svg {
  width: 14px;
  height: 14px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.ui-df__pbtn kbd {
  display: inline-grid;
  place-items: center;
  min-width: 17px;
  height: 17px;
  padding: 0 4px;
  border-radius: 4px;
  background: var(--ui-df-pop-soft);
  color: var(--ui-df-pop-kbd);
  font: inherit;
  font-size: 10.5px;
  font-weight: 500;
}
.ui-df__sep { width: 1px; height: 16px; background: var(--ui-df-pop-soft); }

.ui-df__sr {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
  border: 0;
}

@keyframes ui-df-draw { to { stroke-dashoffset: 0; } }

/* Narrow screens: the arrows step aside (Tab still moves between changes) */
@media (max-width: 400px) {
  .ui-df__nav { display: none; }
  .ui-df__head { padding-left: 14px; }
  .ui-df__label { padding-left: 6px; }
  .ui-df__body { padding: 14px 14px 16px; }
}
@media (hover: none) and (pointer: coarse) {
  .ui-df__pbtn kbd { display: none; }
  .ui-df__pbtn { height: 34px; padding: 0 11px 0 9px; }
}

@media (prefers-reduced-motion: reduce) {
  .ui-df *, .ui-df *::before, .ui-df *::after {
    animation-duration: 1ms !important;
    animation-delay: 0ms !important;
    transition-duration: 1ms !important;
    transition-delay: 0ms !important;
  }
  .ui-df__layer { filter: none; transform: none; }
}

/* Dark mode: follows a .dark class or data-theme="dark" on any ancestor, e.g. <html> */
:where(.dark, [data-theme="dark"]) .ui-df {
  --ui-df-ink: #ededed;
  --ui-df-text: #b4b4b8;
  --ui-df-muted: #8b8b92;
  --ui-df-tray: #111113;
  --ui-df-line: #2a2a2e;
  --ui-df-bg: #19191b;
  --ui-df-soft: #232326;
  --ui-df-add: rgba(60, 200, 120, 0.13);
  --ui-df-add-strong: rgba(60, 200, 120, 0.22);
  --ui-df-add-ink: #6ee7a8;
  --ui-df-del: rgba(240, 90, 90, 0.12);
  --ui-df-del-strong: rgba(240, 90, 90, 0.2);
  --ui-df-del-ink: #ff8a80;
  --ui-df-strike: rgba(255, 138, 128, 0.6);
  --ui-df-ok: #5fd68f;
  --ui-df-pop: #f4f4f5;
  --ui-df-pop-ink: #171717;
  --ui-df-pop-soft: rgba(0, 0, 0, 0.08);
  --ui-df-pop-kbd: rgba(0, 0, 0, 0.5);
  --ui-df-primary: #ededed;
  --ui-df-primary-ink: #19191b;
  --ui-df-focus: rgba(255, 255, 255, 0.35);
  --ui-df-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}
`;
var defaultThinkingPhases = [
  `Thinking`,
  `Searching the web`,
  `Reading sources`,
  `Writing response`,
];
var loaderRays = Array.from(
  {
    length: 8,
  },
  (e, t) => t,
);
function ThinkingLoader({
  phases = defaultThinkingPhases,
  interval = 2200,
  phase: phase,
  loop = false,
  done = false,
  doneLabel = (e) => `Thought for ${e}s`,
  size = `md`,
  variant = `pill`,
  className: className,
}: ThinkingLoaderProps) {
  let [currentPhase, setCurrentPhase] = React.useState(0),
    [startedAt, setStartedAt] = React.useState(() => Date.now()),
    [doneSeconds, setDoneSeconds] = React.useState<number | null>(null),
    seconds = doneSeconds ?? Math.max(1, Math.round((Date.now() - startedAt) / 1e3));
  (done && doneSeconds === null && setDoneSeconds(seconds),
    !done &&
      doneSeconds !== null &&
      (setDoneSeconds(null), setStartedAt(Date.now()), setCurrentPhase(0)),
    React.useEffect(() => {
      if (done || phase !== void 0 || phases.length < 2) return;
      let n = window.setInterval(() => {
        setCurrentPhase((t) => (t + 1 < phases.length ? t + 1 : loop ? 0 : t));
      }, interval);
      return () => window.clearInterval(n);
    }, [done, phase, phases.length, interval, loop]));
  let index = Math.min(Math.max(phase ?? currentPhase, 0), Math.max(phases.length - 1, 0)),
    label = done
      ? typeof doneLabel == `function`
        ? doneLabel(seconds)
        : doneLabel
      : (phases[index] ?? ``),
    [currentLabel, setCurrentLabel] = React.useState({
      key: 0,
      text: label,
    }),
    [leavingLabel, setLeavingLabel] = React.useState<{
      key: number;
      text: string;
    } | null>(null);
  label !== currentLabel.text &&
    (setLeavingLabel(currentLabel),
    setCurrentLabel({
      key: currentLabel.key + 1,
      text: label,
    }));
  let outerRef = React.useRef<HTMLSpanElement | null>(null),
    labelRef = React.useRef<HTMLSpanElement | null>(null),
    measuredRef = React.useRef(false);
  return (
    React.useLayoutEffect(() => {
      let e = outerRef.current,
        t = labelRef.current;
      e &&
        t &&
        (measuredRef.current || (e.style.transition = `none`),
        (e.style.width = `${t.offsetWidth + 1}px`),
        (measuredRef.current ||= (e.getBoundingClientRect(), (e.style.transition = ``), true)));
    }, [currentLabel.key]),
    (
      <span
        className={[`ui-tl`, className].filter(Boolean).join(` `)}
        data-size={size}
        data-variant={variant}
        data-done={done || void 0}
        role={`status`}
        aria-live={`polite`}
      >
        <style href={`ui-thinking-loader`} precedence={`default`}>
          {thinkingLoaderStyles}
        </style>
        <span className={`ui-tl__icon`} aria-hidden={`true`}>
          <svg className={`ui-tl__spinner`} viewBox={`0 0 16 16`}>
            {loaderRays.map((e) => (
              <line
                x1={`8`}
                y1={`1.75`}
                x2={`8`}
                y2={`4.75`}
                transform={`rotate(${e * 45} 8 8)`}
                style={{
                  animationDelay: `${(e - 8) * 100}ms`,
                }}
                key={e}
              />
            ))}
          </svg>
          <svg className={`ui-tl__check`} viewBox={`0 0 16 16`}>
            <path d={`M3.5 8.4 6.6 11.3 12.5 4.9`} pathLength={1} />
          </svg>
        </span>
        <span ref={outerRef} className={`ui-tl__text`}>
          {leavingLabel && (
            <span
              className={`ui-tl__label ui-tl__label--out`}
              aria-hidden={`true`}
              onAnimationEnd={() => setLeavingLabel(null)}
              key={leavingLabel.key}
            >
              {leavingLabel.text}
            </span>
          )}
          <span
            ref={labelRef}
            className={[
              `ui-tl__label`,
              currentLabel.key > 0 && `ui-tl__label--in`,
              !done && `ui-tl__shine`,
            ]
              .filter(Boolean)
              .join(` `)}
            data-text={currentLabel.text}
            key={currentLabel.key}
          >
            {currentLabel.text}
          </span>
        </span>
      </span>
    )
  );
}
var thinkingLoaderStyles = `
.ui-tl {
  --ui-tl-ink: #171717;
  --ui-tl-text: #6b6b6b;
  --ui-tl-ray: #171717;
  --ui-tl-bg: #ffffff;
  --ui-tl-line: #e7e7e7;
  --ui-tl-shine: rgba(255, 255, 255, 0.82);
  --ui-tl-done: #171717;
  --ui-tl-ease: cubic-bezier(0.22, 1, 0.36, 1);
  --ui-tl-h: 34px;
  --ui-tl-font: 14px;
  --ui-tl-icon: 15px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  box-sizing: border-box;
  height: var(--ui-tl-h);
  padding: 0 15px 0 12px;
  border-radius: 999px;
  background: var(--ui-tl-bg);
  box-shadow: inset 0 0 0 1px var(--ui-tl-line), 0 1px 2px rgba(0, 0, 0, 0.04);
  color: var(--ui-tl-text);
  font-family: "Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  font-size: var(--ui-tl-font);
  font-weight: 450;
  line-height: 1;
  letter-spacing: -0.006em;
  vertical-align: middle;
  -webkit-font-smoothing: antialiased;
}
.ui-tl[data-size="sm"] {
  --ui-tl-h: 28px;
  --ui-tl-font: 13px;
  --ui-tl-icon: 13px;
  gap: 7px;
  padding: 0 12px 0 10px;
}
.ui-tl[data-variant="plain"] {
  padding: 0;
  background: none;
  box-shadow: none;
}

/* Spinner and check share one square and swap with a little scale */
.ui-tl__icon {
  position: relative;
  flex: none;
  width: var(--ui-tl-icon);
  height: var(--ui-tl-icon);
}
.ui-tl__icon svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: visible;
  transition: opacity 240ms ease, transform 420ms var(--ui-tl-ease);
}
.ui-tl__spinner line {
  stroke: var(--ui-tl-ray);
  stroke-width: 1.6;
  stroke-linecap: round;
  opacity: 0.18;
  animation: ui-tl-ray 800ms linear infinite;
}
.ui-tl__check {
  opacity: 0;
  transform: scale(0.6);
  fill: none;
  stroke: var(--ui-tl-done);
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.ui-tl__check path {
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
}
.ui-tl[data-done] .ui-tl__spinner {
  opacity: 0;
  transform: scale(0.6) rotate(-45deg);
}
.ui-tl[data-done] .ui-tl__check {
  opacity: 1;
  transform: none;
}
.ui-tl[data-done] .ui-tl__check path {
  animation: ui-tl-draw 360ms var(--ui-tl-ease) 120ms forwards;
}

/* The text box glides to the width of the incoming label; labels roll through it */
.ui-tl__text {
  position: relative;
  display: block;
  height: 1.3em;
  overflow: hidden;
  transition: width 460ms var(--ui-tl-ease);
}
.ui-tl__label {
  position: absolute;
  top: 0;
  left: 0;
  line-height: 1.3em;
  white-space: nowrap;
}
.ui-tl[data-done] .ui-tl__label {
  color: var(--ui-tl-ink);
}
.ui-tl__label--in {
  animation: ui-tl-in 460ms var(--ui-tl-ease) both;
}
.ui-tl__label--out {
  animation: ui-tl-out 320ms var(--ui-tl-ease) both;
}

/* A soft light sweeping over the label while it works */
.ui-tl__shine::after {
  content: attr(data-text);
  content: attr(data-text) / "";
  position: absolute;
  inset: 0;
  white-space: nowrap;
  color: transparent;
  background: linear-gradient(90deg, transparent 38%, var(--ui-tl-shine) 50%, transparent 62%) 100% 0 / 300% 100% no-repeat;
  -webkit-background-clip: text;
  background-clip: text;
  animation: ui-tl-sweep 1.8s linear infinite;
  pointer-events: none;
}

@keyframes ui-tl-ray {
  0% { opacity: 1; }
  100% { opacity: 0.18; }
}
@keyframes ui-tl-in {
  from { opacity: 0; transform: translateY(70%); filter: blur(3px); }
  to { opacity: 1; transform: none; filter: none; }
}
@keyframes ui-tl-out {
  from { opacity: 1; transform: none; filter: none; }
  to { opacity: 0; transform: translateY(-70%); filter: blur(3px); }
}
@keyframes ui-tl-draw {
  to { stroke-dashoffset: 0; }
}
@keyframes ui-tl-sweep {
  from { background-position: 100% 0; }
  to { background-position: 0% 0; }
}

@media (prefers-reduced-motion: reduce) {
  .ui-tl *,
  .ui-tl *::after {
    animation-duration: 1ms !important;
    animation-delay: 0ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 1ms !important;
  }
  .ui-tl__spinner line { opacity: 0.6; }
  .ui-tl__shine::after { display: none; }
  .ui-tl__check path { stroke-dashoffset: 0; }
}

/* Dark mode: follows a .dark class or data-theme="dark" on any ancestor, e.g. <html> */
:where(.dark, [data-theme="dark"]) .ui-tl {
  --ui-tl-ink: #ededed;
  --ui-tl-text: #8f8f8f;
  --ui-tl-ray: #ededed;
  --ui-tl-bg: #161618;
  --ui-tl-line: rgba(255, 255, 255, 0.1);
  --ui-tl-shine: rgba(255, 255, 255, 0.95);
  --ui-tl-done: #ededed;
}
`;
function ToolCall({
  name: name,
  summary: summary,
  icon: icon,
  status: status,
  args: args,
  result: result,
  error: error,
  startedAt: startedAt,
  duration: duration,
  defaultOpen = false,
  open: open,
  onOpenChange: onOpenChange,
  openOnError = true,
  onRetry: onRetry,
  maxCodeHeight = 220,
  className: className,
}: Omit<ToolCallCardProps, "status"> & {
  status: "running" | "success" | "error" | null;
}) {
  let instanceId = React.useId(),
    [localOpen, setLocalOpen] = React.useState(defaultOpen),
    isOpen = open ?? localOpen,
    setOpen = (e: boolean) => {
      (open === void 0 && setLocalOpen(e), onOpenChange?.(e));
    },
    [previousStatus, setPreviousStatus] = React.useState(status),
    [autoOpened, setAutoOpened] = React.useState(false);
  status !== previousStatus &&
    (setPreviousStatus(status),
    open === void 0 &&
      openOnError &&
      (status === `error` && !localOpen
        ? (setLocalOpen(true), setAutoOpened(true))
        : previousStatus === `error` && autoOpened && (setLocalOpen(false), setAutoOpened(false))));
  let elapsedMs = useElapsedToolTime(status === `running`, startedAt, false),
    displayDuration = status === `running` ? (elapsedMs ?? 0) : (duration ?? elapsedMs),
    statusLabel =
      status === `running`
        ? `${name} running`
        : status === `success`
          ? `${name} finished`
          : `${name} failed${error ? `: ${error}` : ``}`;
  return (
    <div
      className={[`ui-tc`, className].filter(Boolean).join(` `)}
      data-status={status}
      data-open={isOpen || void 0}
    >
      <style href={`ui-tool-call`} precedence={`default`}>
        {toolCallStyles}
      </style>
      <span className={`ui-tc-sr`} role={`status`} aria-live={`polite`}>
        {statusLabel}
      </span>
      <button
        type={`button`}
        className={`ui-tc__head`}
        aria-expanded={isOpen}
        aria-controls={`${instanceId}-body`}
        onClick={() => {
          (setAutoOpened(false), setOpen(!isOpen));
        }}
      >
        <span className={`ui-tc__icon`} aria-hidden={`true`}>
          {icon ?? <ToolWrenchIcon />}
        </span>
        <span className={`ui-tc__main`}>
          <code className={`ui-tc__name`}>{name}</code>
          {summary != null && (
            <span
              className={`ui-tc__summary`}
              title={typeof summary == `string` ? summary : void 0}
            >
              {summary}
            </span>
          )}
        </span>
        <span className={`ui-tc__status`} key={status}>
          {status === `running` && <ToolSpinner />}
          {status === `success` && (
            <svg className={`ui-tc__ok`} viewBox={`0 0 16 16`} aria-hidden={`true`}>
              <path d={`M3.5 8.4 6.6 11.3 12.5 4.9`} pathLength={1} />
            </svg>
          )}
          {status === `error` && <ToolErrorIcon />}
          <span className={`ui-tc__time`}>
            {status === `error`
              ? `Failed`
              : displayDuration == null
                ? null
                : formatToolDuration(displayDuration, status === `running`)}
          </span>
        </span>
        <ToolChevronIcon />
      </button>
      <div className={`ui-tc__body`} id={`${instanceId}-body`} inert={!isOpen}>
        <div className={`ui-tc__clip`}>
          <div className={`ui-tc__sections`}>
            {status === `error` && (
              <div className={`ui-tc__error`}>
                <ToolErrorIcon />
                <p className={`ui-tc__error-text`}>{error ?? `The tool call failed.`}</p>
                {onRetry && (
                  <button type={`button`} className={`ui-tc__retry`} onClick={onRetry}>
                    <svg viewBox={`0 0 16 16`} aria-hidden={`true`}>
                      <path d={`M2.75 8a5.25 5.25 0 1 0 1.6-3.77`} />
                      <path d={`M2.5 2.5v2.75h2.75`} />
                    </svg>
                    {`Retry`}
                  </button>
                )}
              </div>
            )}
            {args !== void 0 && <CodePanel label={`Arguments`} value={args} cap={maxCodeHeight} />}
            {result === void 0 ? (
              status === `running` ? (
                <div className={`ui-tc__section`}>
                  <div className={`ui-tc__section-head`}>
                    <span className={`ui-tc__label`}>{`Result`}</span>
                  </div>
                  <p className={`ui-tc__pending`}>{`Waiting for result…`}</p>
                </div>
              ) : null
            ) : (
              <CodePanel label={`Result`} value={result} cap={maxCodeHeight} />
            )}
            {args === void 0 && result === void 0 && status === `success` && (
              <p className={`ui-tc__pending`}>{`No arguments or result.`}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
function ToolCallGroup({
  children: children,
  label: label,
  runningLabel = `Using tools…`,
  duration: duration,
  defaultOpen = false,
  open: open,
  onOpenChange: onOpenChange,
  className: className,
}: ToolCallGroupProps) {
  let instanceId = React.useId(),
    [localOpen, setLocalOpen] = React.useState(defaultOpen),
    isOpen = open ?? localOpen,
    childProps = React.Children.toArray(children)
      .filter(React.isValidElement)
      .map((e) => e.props as Partial<ToolCallCardProps>),
    running = childProps.some((e) => e.status === `running`),
    errorCount = childProps.filter((e) => e.status === `error`).length,
    elapsedMs = useElapsedToolTime(running, void 0, true),
    totalDuration =
      childProps.length && childProps.every((e) => e.duration != null)
        ? childProps.reduce((e, t) => e + (t.duration ?? 0), 0)
        : null,
    displayDuration = running ? elapsedMs : (duration ?? totalDuration ?? elapsedMs),
    defaultLabel = `Used ${childProps.length} ${childProps.length === 1 ? `tool` : `tools`}`,
    displayLabel = running ? runningLabel : (label ?? defaultLabel),
    lastChildren = childProps.slice(-3);
  return (
    <div
      className={[`ui-tc-group`, className].filter(Boolean).join(` `)}
      data-running={running || void 0}
      data-open={isOpen || void 0}
    >
      <style href={`ui-tool-call`} precedence={`default`}>
        {toolCallStyles}
      </style>
      <span className={`ui-tc-sr`} role={`status`} aria-live={`polite`}>
        {running ? runningLabel : `${defaultLabel}${errorCount ? `, ${errorCount} failed` : ``}`}
      </span>
      <button
        type={`button`}
        className={`ui-tc-group__head`}
        aria-expanded={isOpen}
        aria-controls={`${instanceId}-list`}
        onClick={() => {
          (open === void 0 && setLocalOpen(!isOpen), onOpenChange?.(!isOpen));
        }}
      >
        <span className={`ui-tc-group__stack`} aria-hidden={`true`}>
          {lastChildren.map((e, t) => (
            <span className={`ui-tc__icon`} key={childProps.length - lastChildren.length + t}>
              {e.icon ?? <ToolWrenchIcon />}
            </span>
          ))}
        </span>
        <span className={`ui-tc-group__title`} key={running ? `busy` : `done`}>
          <span
            className={running ? `ui-tc-group__label ui-tc__shine` : `ui-tc-group__label`}
            data-text={displayLabel}
          >
            {displayLabel}
          </span>
          {!running && errorCount > 0 && (
            <span className={`ui-tc-group__failed`}>
              {`· `}
              {errorCount}
              {` failed`}
            </span>
          )}
          {displayDuration != null && (
            <span className={`ui-tc-group__time`}>
              {`· `}
              {formatToolDuration(displayDuration, running)}
            </span>
          )}
        </span>
        <ToolChevronIcon />
      </button>
      <div className={`ui-tc__body`} id={`${instanceId}-list`} inert={!isOpen}>
        <div className={`ui-tc__clip`}>
          <div className={`ui-tc-group__list`}>{children}</div>
        </div>
      </div>
    </div>
  );
}
function CodePanel({
  label: label,
  value: value,
  cap: cap,
}: {
  label: string;
  value: unknown;
  cap: number;
}) {
  let { text: a, json: o } = formatCodeValue(value),
    c = React.useRef<HTMLPreElement | null>(null),
    [l, u] = React.useState<boolean>(false),
    [d, f] = React.useState(0);
  React.useLayoutEffect(() => {
    let e = c.current,
      t = e?.firstElementChild;
    if (!e || !t) return;
    let n = () => f(e.scrollHeight);
    n();
    let r = new ResizeObserver(n);
    return (r.observe(t), () => r.disconnect());
  }, [a]);
  let p = d > cap + 24;
  return (
    <div className={`ui-tc__section`}>
      <div className={`ui-tc__section-head`}>
        <span className={`ui-tc__label`}>{label}</span>
        <CopyCodeButton text={a} label={label.toLowerCase()} />
      </div>
      <pre
        ref={c}
        className={`ui-tc__code`}
        data-capped={(p && !l) || void 0}
        style={
          p
            ? {
                maxHeight: l ? d : cap,
              }
            : void 0
        }
      >
        <code>{o ? highlightJson(a) : a}</code>
      </pre>
      {p && (
        <button type={`button`} className={`ui-tc__more`} aria-expanded={l} onClick={() => u(!l)}>
          {l ? `Show less` : `Show all`}
        </button>
      )}
    </div>
  );
}
function CopyCodeButton({ text: text, label: label }: { text: string; label: string }) {
  let [i, a] = React.useState(false);
  return (
    React.useEffect(() => {
      if (!i) return;
      let e = window.setTimeout(() => a(false), 1400);
      return () => window.clearTimeout(e);
    }, [i]),
    (
      <button
        type={`button`}
        className={`ui-tc__copy`}
        data-copied={i || void 0}
        aria-label={i ? `Copied` : `Copy ${label}`}
        title={i ? `Copied` : `Copy ${label}`}
        onClick={() => copyText(text).then((e) => e && a(true))}
      >
        <svg className={`ui-tc__copy-icon`} viewBox={`0 0 16 16`} aria-hidden={`true`}>
          <rect x={`5.25`} y={`5.25`} width={`8`} height={`8`} rx={`2`} />
          <path
            d={`M10.75 5.25v-1a1.5 1.5 0 0 0-1.5-1.5h-4.5a2 2 0 0 0-2 2v4.5a1.5 1.5 0 0 0 1.5 1.5h1`}
          />
        </svg>
        <svg className={`ui-tc__copy-done`} viewBox={`0 0 16 16`} aria-hidden={`true`}>
          <path d={`M3.5 8.4 6.6 11.3 12.5 4.9`} pathLength={1} />
        </svg>
      </button>
    )
  );
}
function ToolSpinner() {
  return (
    <svg className={`ui-tc__spinner`} viewBox={`0 0 16 16`} aria-hidden={`true`}>
      <circle cx={`8`} cy={`8`} r={`5.75`} />
      <path d={`M8 2.25a5.75 5.75 0 0 1 5.75 5.75`} />
    </svg>
  );
}
function ToolErrorIcon() {
  return (
    <svg className={`ui-tc__err`} viewBox={`0 0 16 16`} aria-hidden={`true`}>
      <circle cx={`8`} cy={`8`} r={`6`} />
      <path d={`M8 5v3.4M8 10.9v.1`} />
    </svg>
  );
}
function ToolChevronIcon() {
  return (
    <svg className={`ui-tc__chevron`} viewBox={`0 0 16 16`} aria-hidden={`true`}>
      <path d={`M4.5 6.25 8 9.75l3.5-3.5`} />
    </svg>
  );
}
function ToolWrenchIcon() {
  return (
    <svg viewBox={`0 0 16 16`}>
      <path
        d={`M10.2 2.4a3.5 3.5 0 0 0-4.3 4.6L2.6 10.3a1.4 1.4 0 0 0 2 2L7.9 9a3.5 3.5 0 0 0 4.6-4.3l-2 2-1.6-.4-.4-1.6 1.7-2.3Z`}
      />
    </svg>
  );
}
function useElapsedToolTime(e: boolean, t: number | undefined, r: boolean) {
  let i = React.useRef<number | null>(null),
    a = React.useRef(0),
    [o, s] = React.useState<number | null>(null);
  return (
    React.useEffect(() => {
      if (!e) {
        i.current !== null &&
          ((a.current += Date.now() - i.current), (i.current = null), s(a.current));
        return;
      }
      (r || (a.current = 0), (i.current = t ?? Date.now()));
      let n = () => s(a.current + Date.now() - (i.current ?? Date.now()));
      n();
      let o = window.setInterval(n, 100);
      return () => window.clearInterval(o);
    }, [e, t, r]),
    o
  );
}
function formatToolDuration(milliseconds: number, running: boolean) {
  if (!running && milliseconds < 1e3) return `${Math.max(1, Math.round(milliseconds))}ms`;
  if (milliseconds < 6e4) return `${(Math.floor(milliseconds / 100) / 10).toFixed(1)}s`;
  let seconds = Math.floor(milliseconds / 1e3);
  return `${Math.floor(seconds / 60)}m ${String(seconds % 60).padStart(2, `0`)}s`;
}
function formatCodeValue(value: unknown) {
  if (typeof value == `string`) {
    let t = value.trim();
    if (t.startsWith(`{`) || t.startsWith(`[`))
      try {
        return {
          text: JSON.stringify(JSON.parse(t), null, 2),
          json: true,
        };
      } catch {}
    return {
      text: value,
      json: false,
    };
  }
  try {
    let t = JSON.stringify(value, null, 2);
    return t === void 0
      ? {
          text: String(value),
          json: false,
        }
      : {
          text: t,
          json: true,
        };
  } catch {
    return {
      text: String(value),
      json: false,
    };
  }
}
var jsonTokenPattern =
  /("(?:[^"\\]|\\.)*")(\s*:)?|\b(?:true|false|null)\b|-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/g;
function highlightJson(e: string) {
  let t: React.ReactNode[] = [],
    n = new RegExp(jsonTokenPattern.source, `g`),
    i = 0,
    a;
  for (; (a = n.exec(e));) {
    if ((a.index > i && t.push(e.slice(i, a.index)), a[1] && a[2]))
      t.push(
        <span className={`ui-tc__t-key`} key={a.index}>
          {a[1]}
        </span>,
        a[2],
      );
    else {
      let e = a[1] ? `str` : /^[tfn]/.test(a[0]) ? `lit` : `num`;
      t.push(
        <span className={`ui-tc__t-${e}`} key={a.index}>
          {a[0]}
        </span>,
      );
    }
    i = a.index + a[0].length;
  }
  return (i < e.length && t.push(e.slice(i)), t);
}
async function copyText(e: string) {
  try {
    return (await navigator.clipboard.writeText(e), true);
  } catch {
    let t = document.createElement(`textarea`);
    ((t.value = e),
      (t.style.cssText = `position:fixed;opacity:0`),
      document.body.appendChild(t),
      t.select());
    let n = document.execCommand(`copy`);
    return (t.remove(), n);
  }
}
var toolCallStyles = `
.ui-tc,
.ui-tc-group {
  --ui-tc-ink: #171717;
  --ui-tc-text: #6b6b6b;
  --ui-tc-muted: #8a8a8a;
  --ui-tc-bg: #ffffff;
  --ui-tc-line: #e7e7e7;
  --ui-tc-hover: #fafafa;
  --ui-tc-tile: #f5f5f5;
  --ui-tc-code: #fafafa;
  --ui-tc-ring: #ffffff;
  --ui-tc-red: #c8372d;
  --ui-tc-red-bg: rgba(200, 55, 45, 0.06);
  --ui-tc-red-line: rgba(200, 55, 45, 0.16);
  --ui-tc-key: #171717;
  --ui-tc-str: #0f7b6c;
  --ui-tc-num: #b25b0c;
  --ui-tc-lit: #6e56cf;
  --ui-tc-shine: rgba(255, 255, 255, 0.82);
  --ui-tc-focus: rgba(23, 23, 23, 0.22);
  --ui-tc-ease: cubic-bezier(0.22, 1, 0.36, 1);
  --ui-tc-mono: ui-monospace, "SF Mono", Menlo, monospace;
  box-sizing: border-box;
  min-width: 0;
  color: var(--ui-tc-text);
  font-family: "Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  font-size: 13.5px;
  line-height: 1.4;
  letter-spacing: -0.006em;
  -webkit-font-smoothing: antialiased;
}
.ui-tc *,
.ui-tc-group * { box-sizing: border-box; }

.ui-tc {
  position: relative;
  border-radius: 12px;
  background: var(--ui-tc-bg);
  box-shadow: inset 0 0 0 1px var(--ui-tc-line), 0 1px 2px rgba(0, 0, 0, 0.04);
}
.ui-tc-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}

/* Header: icon, name + summary, status, chevron – everything truncates before it overflows */
.ui-tc__head {
  all: unset;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  min-height: 44px;
  padding: 8px 10px 8px 9px;
  border-radius: 12px;
  cursor: pointer;
  transition: background-color 160ms ease;
}
.ui-tc[data-open] .ui-tc__head { border-radius: 12px 12px 0 0; }
.ui-tc__head:focus-visible,
.ui-tc-group__head:focus-visible,
.ui-tc__copy:focus-visible,
.ui-tc__more:focus-visible,
.ui-tc__retry:focus-visible {
  outline: 2px solid var(--ui-tc-focus);
  outline-offset: 2px;
}
@media (hover: hover) {
  .ui-tc__head:hover { background: var(--ui-tc-hover); }
  .ui-tc-group__head:hover { background: var(--ui-tc-hover); color: var(--ui-tc-ink); }
  .ui-tc__copy:hover { background: var(--ui-tc-hover); color: var(--ui-tc-ink); }
  .ui-tc__more:hover { color: var(--ui-tc-ink); }
  .ui-tc__retry:hover { background: var(--ui-tc-hover); }
}

.ui-tc__icon {
  display: grid;
  place-items: center;
  flex: none;
  width: 26px;
  height: 26px;
  border-radius: 7px;
  background: var(--ui-tc-tile);
  box-shadow: inset 0 0 0 1px var(--ui-tc-line);
  color: var(--ui-tc-ink);
}
.ui-tc__icon > svg { width: 14px; height: 14px; fill: none; stroke: currentColor; stroke-width: 1.4; stroke-linecap: round; stroke-linejoin: round; }

.ui-tc__main {
  display: flex;
  align-items: baseline;
  gap: 8px;
  flex: 1;
  min-width: 0;
}
.ui-tc__name {
  flex: 0 1 auto;
  max-width: 55%;
  overflow: hidden;
  color: var(--ui-tc-ink);
  font-family: var(--ui-tc-mono);
  font-size: 12.5px;
  font-weight: 500;
  letter-spacing: 0;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.ui-tc__summary {
  flex: 1 1 0;
  min-width: 0;
  overflow: hidden;
  color: var(--ui-tc-text);
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ui-tc__status {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  flex: none;
  color: var(--ui-tc-muted);
  font-size: 12.5px;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
  animation: ui-tc-in 360ms var(--ui-tc-ease) both;
}
.ui-tc[data-status="error"] .ui-tc__status { color: var(--ui-tc-red); }
.ui-tc__status > svg { width: 14px; height: 14px; flex: none; fill: none; stroke-linecap: round; stroke-linejoin: round; }
.ui-tc__spinner circle { stroke: currentColor; stroke-width: 1.6; opacity: 0.22; }
.ui-tc__spinner path { stroke: var(--ui-tc-ink); stroke-width: 1.6; }
.ui-tc__spinner { animation: ui-tc-spin 800ms linear infinite; }
.ui-tc__ok { stroke: var(--ui-tc-ink); stroke-width: 1.8; }
.ui-tc__ok path { stroke-dasharray: 1; stroke-dashoffset: 1; animation: ui-tc-draw 360ms var(--ui-tc-ease) 80ms forwards; }
.ui-tc__err { stroke: var(--ui-tc-red); stroke-width: 1.5; }

.ui-tc__chevron {
  flex: none;
  width: 14px;
  height: 14px;
  fill: none;
  stroke: var(--ui-tc-muted);
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-linejoin: round;
  transition: transform 360ms var(--ui-tc-ease);
}
.ui-tc[data-open] > .ui-tc__head .ui-tc__chevron,
.ui-tc-group[data-open] > .ui-tc-group__head .ui-tc__chevron { transform: rotate(180deg); }

/* Body: grows from 0fr to 1fr, so the height animates without measuring */
.ui-tc__body {
  display: grid;
  grid-template-rows: 0fr;
  opacity: 0;
  transition: grid-template-rows 380ms var(--ui-tc-ease), opacity 240ms ease;
}
.ui-tc[data-open] > .ui-tc__body,
.ui-tc-group[data-open] > .ui-tc__body {
  grid-template-rows: 1fr;
  opacity: 1;
}
.ui-tc__clip { min-height: 0; overflow: hidden; }
.ui-tc__sections {
  display: grid;
  gap: 12px;
  padding: 12px;
  border-top: 1px solid var(--ui-tc-line);
}

.ui-tc__section { display: grid; gap: 6px; min-width: 0; }
.ui-tc__section-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  min-height: 24px;
}
.ui-tc__label { color: var(--ui-tc-muted); font-size: 12px; font-weight: 500; }
.ui-tc__pending { margin: 0; color: var(--ui-tc-muted); font-size: 12.5px; }

.ui-tc__copy {
  all: unset;
  position: relative;
  display: grid;
  place-items: center;
  width: 24px;
  height: 24px;
  border-radius: 6px;
  color: var(--ui-tc-muted);
  cursor: pointer;
  transition: background-color 160ms ease, color 160ms ease;
}
.ui-tc__copy svg {
  position: absolute;
  width: 14px;
  height: 14px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.4;
  stroke-linecap: round;
  stroke-linejoin: round;
  transition: opacity 200ms ease, transform 320ms var(--ui-tc-ease), filter 200ms ease;
}
.ui-tc__copy-done { opacity: 0; transform: scale(0.6); filter: blur(2px); stroke-width: 1.7; }
.ui-tc__copy[data-copied] { color: var(--ui-tc-ink); }
.ui-tc__copy[data-copied] .ui-tc__copy-icon { opacity: 0; transform: scale(0.6); filter: blur(2px); }
.ui-tc__copy[data-copied] .ui-tc__copy-done { opacity: 1; transform: none; filter: none; }

/* Code: wraps instead of scrolling sideways; capped blocks fade out at the bottom */
.ui-tc__code {
  position: relative;
  margin: 0;
  padding: 10px 12px;
  overflow: hidden;
  border-radius: 8px;
  background: var(--ui-tc-code);
  box-shadow: inset 0 0 0 1px var(--ui-tc-line);
  color: var(--ui-tc-muted);
  font-family: var(--ui-tc-mono);
  font-size: 12px;
  line-height: 1.6;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
  tab-size: 2;
  transition: max-height 420ms var(--ui-tc-ease);
}
.ui-tc__code code { display: block; font: inherit; }
.ui-tc__code::after {
  content: "";
  position: absolute;
  left: 1px;
  right: 1px;
  bottom: 1px;
  height: 56px;
  border-radius: 0 0 7px 7px;
  background: linear-gradient(to bottom, transparent, var(--ui-tc-code));
  opacity: 0;
  transition: opacity 240ms ease;
  pointer-events: none;
}
.ui-tc__code[data-capped]::after { opacity: 1; }
.ui-tc__t-key { color: var(--ui-tc-key); }
.ui-tc__t-str { color: var(--ui-tc-str); }
.ui-tc__t-num { color: var(--ui-tc-num); }
.ui-tc__t-lit { color: var(--ui-tc-lit); }

.ui-tc__more {
  all: unset;
  justify-self: start;
  padding: 2px 4px;
  margin-left: -4px;
  border-radius: 5px;
  color: var(--ui-tc-text);
  font-size: 12.5px;
  font-weight: 500;
  cursor: pointer;
  transition: color 160ms ease;
}

/* Error: the message and an optional retry */
.ui-tc__error {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 9px 10px 9px 11px;
  border-radius: 8px;
  background: var(--ui-tc-red-bg);
  box-shadow: inset 0 0 0 1px var(--ui-tc-red-line);
}
.ui-tc__error > .ui-tc__err { flex: none; width: 14px; height: 14px; margin-top: 2px; fill: none; stroke-linecap: round; }
.ui-tc__error-text {
  flex: 1;
  min-width: 0;
  margin: 0;
  color: var(--ui-tc-red);
  font-size: 13px;
  line-height: 1.45;
  overflow-wrap: anywhere;
}
.ui-tc__retry {
  all: unset;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  flex: none;
  height: 26px;
  margin: -3px 0;
  padding: 0 10px 0 8px;
  border-radius: 7px;
  background: var(--ui-tc-bg);
  box-shadow: inset 0 0 0 1px var(--ui-tc-line), 0 1px 2px rgba(0, 0, 0, 0.04);
  color: var(--ui-tc-ink);
  font-size: 12.5px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 160ms ease;
}
.ui-tc__retry svg { width: 13px; height: 13px; fill: none; stroke: currentColor; stroke-width: 1.5; stroke-linecap: round; stroke-linejoin: round; }
.ui-tc__retry:active svg { transform: rotate(-60deg); transition: transform 200ms var(--ui-tc-ease); }

/* Group: one quiet line with the tool icons stacked, the cards below */
.ui-tc-group { display: grid; }
.ui-tc-group__head {
  all: unset;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: 9px;
  justify-self: start;
  max-width: 100%;
  min-height: 36px;
  padding: 4px 10px 4px 5px;
  border-radius: 10px;
  color: var(--ui-tc-text);
  cursor: pointer;
  transition: background-color 160ms ease, color 160ms ease;
}
.ui-tc-group__stack { display: flex; flex: none; }
.ui-tc-group__stack .ui-tc__icon {
  width: 24px;
  height: 24px;
  border-radius: 7px;
  box-shadow: inset 0 0 0 1px var(--ui-tc-line), 0 0 0 2px var(--ui-tc-ring);
  animation: ui-tc-pop 420ms var(--ui-tc-ease) both;
}
.ui-tc-group__stack .ui-tc__icon + .ui-tc__icon { margin-left: -5px; }
.ui-tc-group__stack .ui-tc__icon > svg { width: 13px; height: 13px; }
.ui-tc-group__title {
  display: flex;
  align-items: baseline;
  gap: 5px;
  min-width: 0;
  white-space: nowrap;
  animation: ui-tc-in 360ms var(--ui-tc-ease) both;
}
.ui-tc-group__label {
  position: relative;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  color: inherit;
  font-weight: 500;
}
.ui-tc-group__failed { flex: none; color: var(--ui-tc-red); }
.ui-tc-group__time { flex: none; color: var(--ui-tc-muted); font-variant-numeric: tabular-nums; }
.ui-tc-group__list { display: grid; gap: 8px; padding-top: 8px; }

/* A soft light sweeping over "Using tools…" */
.ui-tc__shine::after {
  content: attr(data-text);
  content: attr(data-text) / "";
  position: absolute;
  inset: 0;
  white-space: nowrap;
  color: transparent;
  background: linear-gradient(90deg, transparent 38%, var(--ui-tc-shine) 50%, transparent 62%) 100% 0 / 300% 100% no-repeat;
  -webkit-background-clip: text;
  background-clip: text;
  animation: ui-tc-sweep 1.8s linear infinite;
  pointer-events: none;
}

@keyframes ui-tc-in {
  from { opacity: 0; transform: translateY(3px); filter: blur(2px); }
  to { opacity: 1; transform: none; filter: none; }
}
@keyframes ui-tc-pop {
  from { opacity: 0; transform: scale(0.6); }
  to { opacity: 1; transform: none; }
}
@keyframes ui-tc-spin { to { transform: rotate(360deg); } }
@keyframes ui-tc-draw { to { stroke-dashoffset: 0; } }
@keyframes ui-tc-sweep {
  from { background-position: 100% 0; }
  to { background-position: 0% 0; }
}

@media (prefers-reduced-motion: reduce) {
  .ui-tc *,
  .ui-tc-group *,
  .ui-tc *::after,
  .ui-tc-group *::after {
    animation-duration: 1ms !important;
    animation-delay: 0ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 1ms !important;
  }
  .ui-tc__shine::after { display: none; }
  .ui-tc__ok path { stroke-dashoffset: 0; }
}

/* Dark mode: follows a .dark class or data-theme="dark" on any ancestor, e.g. <html> */
:where(.dark, [data-theme="dark"]) .ui-tc,
:where(.dark, [data-theme="dark"]) .ui-tc-group {
  --ui-tc-ink: #ededed;
  --ui-tc-text: #a1a1a1;
  --ui-tc-muted: #7c7c7c;
  --ui-tc-bg: #161618;
  --ui-tc-line: rgba(255, 255, 255, 0.1);
  --ui-tc-hover: rgba(255, 255, 255, 0.035);
  --ui-tc-tile: #1d1d20;
  --ui-tc-code: #1d1d20;
  --ui-tc-ring: #161618;
  --ui-tc-red: #ff7b72;
  --ui-tc-red-bg: rgba(255, 110, 100, 0.08);
  --ui-tc-red-line: rgba(255, 110, 100, 0.2);
  --ui-tc-key: #ededed;
  --ui-tc-str: #5fd4b8;
  --ui-tc-num: #f2a65a;
  --ui-tc-lit: #b5a4ff;
  --ui-tc-shine: rgba(255, 255, 255, 0.95);
  --ui-tc-focus: rgba(255, 255, 255, 0.3);
}
:where(.dark, [data-theme="dark"]) .ui-tc { box-shadow: inset 0 0 0 1px var(--ui-tc-line); }
`;
var ClaudeIcon: IconNode = [
  [
    `path`,
    {
      d: `M7 4.5C5.34315 4.5 4 5.84315 4 7.5C4 8.06866 4.15822 8.60037 4.43304 9.0535C3.04727 9.31855 2 10.537 2 12C2 13.463 3.04727 14.6814 4.43304 14.9465M7 4.5C7 3.11929 8.11929 2 9.5 2C10.8807 2 12 3.11929 12 4.5V19.5C12 20.8807 10.8807 22 9.5 22C8.11929 22 7 20.8807 7 19.5C5.34315 19.5 4 18.1569 4 16.5C4 15.9313 4.15822 15.3996 4.43304 14.9465M7 4.5C7 5.31791 7.39278 6.04408 8 6.50018M4.43304 14.9465C4.78948 14.3588 5.34207 13.9032 6 13.6707`,
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
      d: `M17 19.4999C18.6569 19.4999 20 18.1567 20 16.4999C20 15.9312 19.8418 15.3995 19.567 14.9464C20.9527 14.6813 22 13.4629 22 11.9999C22 10.5369 20.9527 9.31843 19.567 9.05338M17 19.4999C17 20.8806 15.8807 21.9999 14.5 21.9999C13.1193 21.9999 12 20.8806 12 19.4999L12 4.49988C12 3.11917 13.1193 1.99988 14.5 1.99988C15.8807 1.99988 17 3.11917 17 4.49988C18.6569 4.49988 20 5.84302 20 7.49988C20 8.06854 19.8418 8.60024 19.567 9.05338M17 19.4999C17 18.682 16.6072 17.9558 16 17.4997M19.567 9.05338C19.2105 9.64109 18.6579 10.0966 18 10.3292`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `1`,
    },
  ],
];
var PresentationBarChart01Icon: IconNode = [
  [
    `path`,
    {
      d: `M12 18V22`,
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
      d: `M10 18L5 22`,
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
      d: `M14 18L19 22`,
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
      d: `M2.5 12C2.5 14.8284 2.5 16.2426 3.37868 17.1213C4.25736 18 5.67157 18 8.5 18H15.5C18.3284 18 19.7426 18 20.6213 17.1213C21.5 16.2426 21.5 14.8284 21.5 12V8C21.5 5.17157 21.5 3.75736 20.6213 2.87868C19.7426 2 18.3284 2 15.5 2H8.5C5.67157 2 4.25736 2 3.37868 2.87868C2.5 3.75736 2.5 5.17157 2.5 8V12Z`,
      stroke: `currentColor`,
      strokeWidth: `1.5`,
      key: `3`,
    },
  ],
  [
    `path`,
    {
      d: `M8 13V10M12 13V7M16 13V11`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeWidth: `1.5`,
      key: `4`,
    },
  ],
];
var valueValue12: IconNode = [
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
  let [open, setOpen] = React.useState<boolean>(false);
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
var valueValue13: IconNode = [
  [
    `path`,
    {
      d: `M21.5 12C21.5 17.2467 17.2467 21.5 12 21.5C10.3719 21.5 8.8394 21.0904 7.5 20.3687C5.63177 19.362 4.37462 20.2979 3.26592 20.4658C3.09774 20.4913 2.93024 20.4302 2.80997 20.31C2.62741 20.1274 2.59266 19.8451 2.6935 19.6074C3.12865 18.5818 3.5282 16.6382 2.98341 15C2.6698 14.057 2.5 13.0483 2.5 12C2.5 6.75329 6.75329 2.5 12 2.5C17.2467 2.5 21.5 6.75329 21.5 12Z`,
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
      d: `M12.1257 12H12.0007M8.125 12H8M16.125 12H16M12.2507 12C12.2507 12.1381 12.1388 12.25 12.0007 12.25C11.8627 12.25 11.7507 12.1381 11.7507 12C11.7507 11.8619 11.8627 11.75 12.0007 11.75C12.1388 11.75 12.2507 11.8619 12.2507 12ZM8.25 12C8.25 12.1381 8.13807 12.25 8 12.25C7.86193 12.25 7.75 12.1381 7.75 12C7.75 11.8619 7.86193 11.75 8 11.75C8.13807 11.75 8.25 11.8619 8.25 12ZM16.25 12C16.25 12.1381 16.1381 12.25 16 12.25C15.8619 12.25 15.75 12.1381 15.75 12C15.75 11.8619 15.8619 11.75 16 11.75C16.1381 11.75 16.25 11.8619 16.25 12Z`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `1`,
    },
  ],
];
var valueValue14: IconNode = [
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
var valueValue15: IconNode = [
  [
    `path`,
    {
      d: `M11 6L21 6`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeWidth: `1.5`,
      key: `0`,
    },
  ],
  [
    `path`,
    {
      d: `M11 12L21 12`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeWidth: `1.5`,
      key: `1`,
    },
  ],
  [
    `path`,
    {
      d: `M11 18L21 18`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeWidth: `1.5`,
      key: `2`,
    },
  ],
  [
    `path`,
    {
      d: `M3 7.39286C3 7.39286 4 8.04466 4.5 9C4.5 9 6 5.25 8 4`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `3`,
    },
  ],
  [
    `path`,
    {
      d: `M3 18.3929C3 18.3929 4 19.0447 4.5 20C4.5 20 6 16.25 8 15`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `4`,
    },
  ],
];
var valueValue16: IconNode = [
  [
    `path`,
    {
      d: `M21 6.5C21 8.15685 19.6569 9.5 18 9.5C16.3431 9.5 15 8.15685 15 6.5C15 4.84315 16.3431 3.5 18 3.5C19.6569 3.5 21 4.84315 21 6.5Z`,
      stroke: `currentColor`,
      strokeWidth: `1.5`,
      key: `0`,
    },
  ],
  [
    `path`,
    {
      d: `M9 12C9 13.6569 7.65685 15 6 15C4.34315 15 3 13.6569 3 12C3 10.3431 4.34315 9 6 9C7.65685 9 9 10.3431 9 12Z`,
      stroke: `currentColor`,
      strokeWidth: `1.5`,
      key: `1`,
    },
  ],
  [
    `path`,
    {
      d: `M21 17.5C21 19.1569 19.6569 20.5 18 20.5C16.3431 20.5 15 19.1569 15 17.5C15 15.8431 16.3431 14.5 18 14.5C19.6569 14.5 21 15.8431 21 17.5Z`,
      stroke: `currentColor`,
      strokeWidth: `1.5`,
      key: `2`,
    },
  ],
  [
    `path`,
    {
      d: `M8.72852 10.7495L15.2285 7.75M8.72852 13.25L15.2285 16.2495`,
      stroke: `currentColor`,
      strokeWidth: `1.5`,
      key: `3`,
    },
  ],
];
var valueValue17: IconNode = [
  [
    `path`,
    {
      d: `M2 12C2 8.3109 2 6.46633 2.81382 5.1588C3.1149 4.67505 3.48891 4.2543 3.91891 3.91557C5.08116 3.00003 6.72077 3.00003 10 3.00003H14C17.2792 3.00003 18.9188 3.00003 20.0811 3.91557C20.5111 4.2543 20.8851 4.67505 21.1862 5.1588C22 6.46633 22 8.3109 22 12C22 15.6892 22 17.5337 21.1862 18.8413C20.8851 19.325 20.5111 19.7458 20.0811 20.0845C18.9188 21 17.2792 21 14 21H10C6.72077 21 5.08116 21 3.91891 20.0845C3.48891 19.7458 3.1149 19.325 2.81382 18.8413C2 17.5337 2 15.6892 2 12Z`,
      stroke: `currentColor`,
      strokeWidth: `1.5`,
      key: `0`,
    },
  ],
  [
    `path`,
    {
      d: `M14.5 3.00003L14.5 21`,
      stroke: `currentColor`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `1`,
    },
  ],
  [
    `path`,
    {
      d: `M18 7.00006H19M18 10.0001H19`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `2`,
    },
  ],
];
var valueValue18: IconNode = [
  [
    `path`,
    {
      d: `M18.4995 20.5C18.2663 17.5685 15.8417 15.2477 12.808 15.0521L11.9995 15C11.7107 15.0076 11.4416 15.0178 11.1877 15.0298C8.18075 15.1723 5.7304 17.5974 5.49951 20.5`,
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
      d: `M15.2495 9.25C15.2495 11.0449 13.7944 12.5 11.9995 12.5C10.2046 12.5 8.74952 11.0449 8.74952 9.25C8.74952 7.45507 10.2046 6 11.9995 6C13.7944 6 15.2495 7.45507 15.2495 9.25Z`,
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
      d: `M5.50249 8.5C5.17908 7.99485 4.99158 7.39432 4.99158 6.75C4.99158 4.95507 6.44665 3.5 8.24157 3.5C8.68752 3.5 9.1125 3.58982 9.49939 3.75235`,
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
      d: `M18.4963 8.5C18.8197 7.99485 19.0072 7.39432 19.0072 6.75C19.0072 4.95507 17.5521 3.5 15.7572 3.5C15.3113 3.5 14.8863 3.58982 14.4994 3.75235`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `3`,
    },
  ],
  [
    `path`,
    {
      d: `M22.0007 17.9996C21.8208 15.7374 19.9995 13.5 17.9995 13`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `4`,
    },
  ],
  [
    `path`,
    {
      d: `M1.99927 17.9996C2.17923 15.7374 4.00049 13.5 6.00049 13`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `5`,
    },
  ],
];
var valueValue19: IconNode = [
  [
    `path`,
    {
      d: `M3 4C3 2.34533 3.34533 2 5 2H9C10.6547 2 11 2.34533 11 4C11 5.65467 10.6547 6 9 6H5C3.34533 6 3 5.65467 3 4Z`,
      stroke: `currentColor`,
      strokeWidth: `1.5`,
      key: `0`,
    },
  ],
  [
    `path`,
    {
      d: `M13 13C13 11.3453 13.3453 11 15 11H19C20.6547 11 21 11.3453 21 13C21 14.6547 20.6547 15 19 15H15C13.3453 15 13 14.6547 13 13Z`,
      stroke: `currentColor`,
      strokeWidth: `1.5`,
      key: `1`,
    },
  ],
  [
    `path`,
    {
      d: `M4 20C4 18.3453 4.34533 18 6 18H10C11.6547 18 12 18.3453 12 20C12 21.6547 11.6547 22 10 22H6C4.34533 22 4 21.6547 4 20Z`,
      stroke: `currentColor`,
      strokeWidth: `1.5`,
      key: `2`,
    },
  ],
  [
    `path`,
    {
      d: `M17 11C17 10.5353 17 10.303 16.9616 10.1098C16.8038 9.31644 16.1836 8.69624 15.3902 8.53843C15.197 8.5 14.9647 8.5 14.5 8.5H9.5C9.03534 8.5 8.80302 8.5 8.60982 8.46157C7.81644 8.30376 7.19624 7.68356 7.03843 6.89018C7 6.69698 7 6.46466 7 6`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `3`,
    },
  ],
  [
    `path`,
    {
      d: `M17 15V16C17 17.8856 17 18.8284 16.4142 19.4142C15.8284 20 14.8856 20 13 20H12`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `4`,
    },
  ],
];
var valueValue20: IconNode = [
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
var valueValue21: IconNode = [
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
var valueValue22: IconNode = [
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
var valueValue23: IconNode = [
  [
    `path`,
    {
      d: `M2 6L8.91302 9.91697C11.4616 11.361 12.5384 11.361 15.087 9.91697L22 6`,
      stroke: `currentColor`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `0`,
    },
  ],
  [
    `path`,
    {
      d: `M2.01577 13.4756C2.08114 16.5412 2.11383 18.0739 3.24496 19.2094C4.37608 20.3448 5.95033 20.3843 9.09883 20.4634C11.0393 20.5122 12.9607 20.5122 14.9012 20.4634C18.0497 20.3843 19.6239 20.3448 20.7551 19.2094C21.8862 18.0739 21.9189 16.5412 21.9842 13.4756C22.0053 12.4899 22.0053 11.5101 21.9842 10.5244C21.9189 7.45886 21.8862 5.92609 20.7551 4.79066C19.6239 3.65523 18.0497 3.61568 14.9012 3.53657C12.9607 3.48781 11.0393 3.48781 9.09882 3.53656C5.95033 3.61566 4.37608 3.65521 3.24495 4.79065C2.11382 5.92608 2.08114 7.45885 2.01576 10.5244C1.99474 11.5101 1.99475 12.4899 2.01577 13.4756Z`,
      stroke: `currentColor`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `1`,
    },
  ],
];
var valueValue24: IconNode = [
  [
    `path`,
    {
      d: `M6.00449 12.5V12M18.0045 12.5V12M12.0045 12.5V12M7.00449 12.5C7.00449 11.9477 6.55677 11.5 6.00449 11.5C5.4522 11.5 5.00449 11.9477 5.00449 12.5C5.00449 13.0523 5.4522 13.5 6.00449 13.5C6.55677 13.5 7.00449 13.0523 7.00449 12.5ZM19.0045 12.5C19.0045 11.9477 18.5568 11.5 18.0045 11.5C17.4522 11.5 17.0045 11.9477 17.0045 12.5C17.0045 13.0523 17.4522 13.5 18.0045 13.5C18.5568 13.5 19.0045 13.0523 19.0045 12.5ZM13.0045 12.5C13.0045 11.9477 12.5568 11.5 12.0045 11.5C11.4522 11.5 11.0045 11.9477 11.0045 12.5C11.0045 13.0523 11.4522 13.5 12.0045 13.5C12.5568 13.5 13.0045 13.0523 13.0045 12.5Z`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `0`,
    },
  ],
];
var valueValue25: IconNode = [
  [
    `path`,
    {
      d: `M16.3884 3L17.3913 3.97574C17.8393 4.41165 18.0633 4.62961 17.9844 4.81481C17.9056 5 17.5888 5 16.9552 5H9.19422C5.22096 5 2 8.13401 2 12C2 13.4872 2.47668 14.8662 3.2895 16`,
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
      d: `M7.61156 21L6.60875 20.0243C6.16074 19.5883 5.93673 19.3704 6.01557 19.1852C6.09441 19 6.4112 19 7.04478 19H14.8058C18.779 19 22 15.866 22 12C22 10.5128 21.5233 9.13383 20.7105 8`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `1`,
    },
  ],
];
var valueValue: IconNode = [
  [
    `circle`,
    {
      cx: `12`,
      cy: `12`,
      r: `10`,
      stroke: `currentColor`,
      strokeWidth: `1.5`,
      key: `0`,
    },
  ],
  [
    `path`,
    {
      d: `M12 8V12L14 14`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `1`,
    },
  ],
];
var valueValue2: IconNode = [
  [
    `ellipse`,
    {
      cx: `15.5`,
      cy: `11`,
      rx: `6.5`,
      ry: `2`,
      stroke: `currentColor`,
      strokeWidth: `1.5`,
      key: `0`,
    },
  ],
  [
    `path`,
    {
      d: `M22 15.5C22 16.6046 19.0899 17.5 15.5 17.5C11.9101 17.5 9 16.6046 9 15.5`,
      stroke: `currentColor`,
      strokeWidth: `1.5`,
      key: `1`,
    },
  ],
  [
    `path`,
    {
      d: `M22 11V19.8C22 21.015 19.0899 22 15.5 22C11.9101 22 9 21.015 9 19.8V11`,
      stroke: `currentColor`,
      strokeWidth: `1.5`,
      key: `2`,
    },
  ],
  [
    `ellipse`,
    {
      cx: `8.5`,
      cy: `4`,
      rx: `6.5`,
      ry: `2`,
      stroke: `currentColor`,
      strokeWidth: `1.5`,
      key: `3`,
    },
  ],
  [
    `path`,
    {
      d: `M6 11C4.10819 10.7698 2.36991 10.1745 2 9M6 16C4.10819 15.7698 2.36991 15.1745 2 14`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeWidth: `1.5`,
      key: `4`,
    },
  ],
  [
    `path`,
    {
      d: `M6 21C4.10819 20.7698 2.36991 20.1745 2 19L2 4`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeWidth: `1.5`,
      key: `5`,
    },
  ],
  [
    `path`,
    {
      d: `M15 6V4`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeWidth: `1.5`,
      key: `6`,
    },
  ],
];
var ViewB: IconNode = [
  [
    `path`,
    {
      d: `M13 20.8268V22H14.1734C14.5827 22 14.7874 22 14.9715 21.9238C15.1555 21.8475 15.3003 21.7028 15.5897 21.4134L20.4133 16.5894C20.6864 16.3164 20.8229 16.1799 20.8959 16.0327C21.0347 15.7525 21.0347 15.4236 20.8959 15.1434C20.8229 14.9961 20.6864 14.8596 20.4133 14.5866C20.1403 14.3136 20.0038 14.1771 19.8565 14.1041C19.5763 13.9653 19.2473 13.9653 18.9671 14.1041C18.8198 14.1771 18.6833 14.3136 18.4103 14.5866L18.4103 14.5866L13.5867 19.4106C13.2972 19.7 13.1525 19.8447 13.0762 20.0287C13 20.2128 13 20.4174 13 20.8268Z`,
      stroke: `currentColor`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `0`,
    },
  ],
  [
    `path`,
    {
      d: `M19 11C19 11 19 9.4306 18.8478 9.06306C18.6955 8.69552 18.4065 8.40649 17.8284 7.82843L13.0919 3.09188C12.593 2.593 12.3436 2.34355 12.0345 2.19575C11.9702 2.165 11.9044 2.13772 11.8372 2.11401C11.5141 2 11.1614 2 10.4558 2C7.21082 2 5.58831 2 4.48933 2.88607C4.26731 3.06508 4.06508 3.26731 3.88607 3.48933C3 4.58831 3 6.21082 3 9.45584V14C3 17.7712 3 19.6569 4.17157 20.8284C5.23467 21.8915 6.8857 21.99 10 21.9991M12 2.5V3C12 5.82843 12 7.24264 12.8787 8.12132C13.7574 9 15.1716 9 18 9H18.5`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `1`,
    },
  ],
];
var valueValue3: IconNode = [
  [
    `circle`,
    {
      cx: `12`,
      cy: `12`,
      r: `10`,
      stroke: `currentColor`,
      strokeWidth: `1.5`,
      key: `0`,
    },
  ],
  [
    `path`,
    {
      d: `M15.9453 12.3948C15.7686 13.0215 14.9333 13.4644 13.2629 14.3502C11.648 15.2064 10.8406 15.6346 10.1899 15.4625C9.9209 15.3913 9.6758 15.2562 9.47812 15.0701C9 14.6198 9 13.7465 9 12C9 10.2535 9 9.38018 9.47812 8.92995C9.6758 8.74381 9.9209 8.60868 10.1899 8.53753C10.8406 8.36544 11.648 8.79357 13.2629 9.64983C14.9333 10.5356 15.7686 10.9785 15.9453 11.6052C16.0182 11.8639 16.0182 12.1361 15.9453 12.3948Z`,
      stroke: `currentColor`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `1`,
    },
  ],
];
var valueValue4: IconNode = [
  [
    `circle`,
    {
      cx: `12`,
      cy: `12`,
      r: `10`,
      stroke: `currentColor`,
      strokeWidth: `1.5`,
      key: `0`,
    },
  ],
  [
    `path`,
    {
      d: `M9.38886 15.1629C9.89331 15.5 10.5955 15.5 12 15.5C13.4045 15.5 14.1067 15.5 14.6111 15.1629C14.8295 15.017 15.017 14.8295 15.1629 14.6111C15.5 14.1067 15.5 13.4045 15.5 12C15.5 10.5955 15.5 9.89331 15.1629 9.38886C15.017 9.17048 14.8295 8.98298 14.6111 8.83706C14.1067 8.5 13.4045 8.5 12 8.5C10.5955 8.5 9.89331 8.5 9.38886 8.83706C9.17048 8.98298 8.98298 9.17048 8.83706 9.38886C8.5 9.89331 8.5 10.5955 8.5 12C8.5 13.4045 8.5 14.1067 8.83706 14.6111C8.98298 14.8295 9.17048 15.017 9.38886 15.1629Z`,
      stroke: `currentColor`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      strokeWidth: `1.5`,
      key: `1`,
    },
  ],
];
var valueValue5 = [
  {
    label: `Home`,
    icon: valueValue22,
  },
  {
    label: `Chat`,
    icon: valueValue13,
  },
  {
    label: `Runs`,
    icon: valueValue3,
    count: 3,
  },
  {
    label: `Analytics`,
    icon: valueValue12,
  },
  {
    label: `Deliverables`,
    icon: FilesIcon,
  },
];
var valueValue6 = [
  {
    label: `Agents`,
    items: [
      {
        label: `Board prep`,
        icon: PresentationBarChart01Icon,
      },
      {
        label: `Revenue ops`,
        icon: valueValue21,
      },
      {
        label: `Inbox triage`,
        icon: valueValue23,
      },
      {
        label: `Workflows`,
        icon: valueValue19,
      },
    ],
  },
];
var valueValue7: RunStep[] = [
  {
    id: `revenue`,
    title: `Pull Q3 revenue and churn`,
    detail: `From Stripe, July to September`,
    tool: `stripe.query`,
    calls: [
      {
        name: `stripe.query`,
        summary: `Revenue by month, Q3`,
        args: {
          metric: `revenue`,
          from: `2026-07-01`,
          to: `2026-09-30`,
          group_by: `month`,
        },
        result: {
          total: 431e4,
          months: [138e4, 142e4, 151e4],
          growth: 0.21,
        },
        duration: 700,
      },
      {
        name: `stripe.query`,
        summary: `Customer churn, Q3`,
        args: {
          metric: `churn_rate`,
          period: `quarter`,
        },
        result: {
          churn_rate: 0.018,
          previous: 0.021,
        },
        duration: 500,
      },
    ],
  },
  {
    id: `memo`,
    title: `Read last quarter's board memo`,
    detail: `Keeps the structure the board knows`,
    tool: `search`,
    calls: [
      {
        name: `search`,
        summary: `Drive: “board memo Q2”`,
        args: {
          query: `board memo Q2`,
          source: `drive`,
          limit: 5,
        },
        result: [
          {
            title: `Board memo – Q2 2026`,
            owner: `Maya Chen`,
            edited: `Jul 9`,
          },
        ],
        duration: 900,
      },
      {
        name: `docs.read`,
        summary: `Board memo – Q2 2026`,
        args: {
          doc: `Board memo – Q2 2026`,
        },
        result: `6 sections · 1,240 words`,
        duration: 700,
      },
    ],
  },
  {
    id: `draft`,
    title: `Update the memo draft`,
    detail: `Revenue, churn and the Q4 outlook`,
    tool: `docs.write`,
    calls: [
      {
        name: `docs.write`,
        summary: `Rewrote the revenue paragraph`,
        args: {
          doc: `Board memo – Q3 2026`,
          section: `Revenue`,
        },
        result: {
          changed_words: 21,
        },
        duration: 1100,
      },
      {
        name: `docs.write`,
        summary: `Added the churn chart`,
        args: {
          doc: `Board memo – Q3 2026`,
          insert: `chart`,
          data: `churn_rate`,
        },
        result: {
          ok: true,
        },
        duration: 600,
      },
    ],
  },
  {
    id: `send`,
    title: `Send the draft to Maya`,
    detail: `Needs your approval first`,
    tool: `gmail.send`,
    approval: {
      title: `Send the draft to Maya`,
      description: `Emails the Q3 board memo draft for review before Friday.`,
      risk: `medium`,
      details: [
        {
          label: `To`,
          value: `Maya Chen (CFO)`,
        },
        {
          label: `Subject`,
          value: `Q3 board update – draft`,
        },
        {
          label: `Attachment`,
          value: `Board memo – Q3 2026`,
        },
      ],
    },
    calls: [
      {
        name: `gmail.send`,
        summary: `Sent to maya@acme.com`,
        args: {
          to: `maya@acme.com`,
          subject: `Q3 board update – draft`,
          attach: `Board memo – Q3 2026`,
        },
        result: {
          id: `msg_8f2c`,
          status: `sent`,
        },
        duration: 600,
      },
    ],
  },
  {
    id: `review`,
    title: `Book a review with Maya`,
    detail: `30 minutes before the board meeting`,
    tool: `calendar.create`,
    calls: [
      {
        name: `calendar.create`,
        summary: `Thu, Oct 15 · 10:00`,
        args: {
          title: `Q3 board memo review`,
          with: [`maya@acme.com`],
          duration: 30,
        },
        result: {
          event: `evt_31a`,
          time: `2026-10-15T10:00`,
        },
        duration: 700,
      },
    ],
  },
];
var valueValue8 = {
  label: `Board memo – Q3 · Revenue`,
  original: `Revenue grew 18% in Q3 to $4.2M, mostly driven by new enterprise customers. Churn stayed flat at 2.1%, and we expect the pipeline to carry into Q4 without changes to the plan.`,
  suggested: `Revenue grew 21% in Q3 to $4.3M, driven by six new enterprise customers. Churn fell to 1.8%, and the pipeline supports raising the Q4 target by 5%.`,
};
var valueValue9 = (e: string) =>
  e.startsWith(`stripe`)
    ? valueValue21
    : e.startsWith(`search`)
      ? SearchIcon
      : e.startsWith(`docs`)
        ? ViewB
        : e.startsWith(`gmail`) || e.startsWith(`mail`)
          ? valueValue23
          : e.startsWith(`calendar`)
            ? valueValue14
            : valueValue19;
function valueValue10(e: RunStep[]) {
  let t: RunEvent[] = [];
  return (
    e.forEach((e, n) => {
      (t.push({
        kind: `step`,
        s: n,
        delay: n === 0 ? 150 : 300,
      }),
        e.approval &&
          t.push({
            kind: `ask`,
            s: n,
            delay: 450,
          }),
        e.calls.forEach((e, r) => {
          (t.push({
            kind: `call`,
            s: n,
            c: r,
            delay: 200,
          }),
            t.push({
              kind: `end`,
              s: n,
              c: r,
              delay: e.duration,
            }));
        }),
        t.push({
          kind: `finish`,
          s: n,
          delay: 250,
        }));
    }),
    t
  );
}
var valueValue11 = (e: number) => {
  let t = Math.max(0, Math.round(e / 1e3));
  return `${Math.floor(t / 60)}:${String(t % 60).padStart(2, `0`)}`;
};
var ValueValue = (e: number) => {
  let t = Math.max(1, Math.round(e / 1e3));
  return t < 60 ? `${t}s` : `${Math.floor(t / 60)}m ${String(t % 60).padStart(2, `0`)}s`;
};
function AgentRun({
  title = `Prepare the Q3 board update`,
  steps = valueValue7,
  draft = valueValue8,
  agent = `Board prep`,
  autoRun = true,
  onApprove: onApprove,
  onDeny: onDeny,
  onStop: onStop,
  onDone: onDone,
  ..._
}: AgentRunProps) {
  let v = React.useMemo(() => valueValue10(steps), [steps]),
    [b, E] = React.useState(0),
    [O, k] = React.useState<number>(0),
    [A, j] = React.useState(() => Date.now()),
    [M, N] = React.useState<number | null>(null),
    [P, F] = React.useState<"user" | "denied" | null>(null),
    [I, L] = React.useState<Partial<Record<number, "approved" | "denied">>>({}),
    [Se, R] = React.useState<Partial<Record<number, boolean>>>({}),
    [z, B] = React.useState<boolean>(true),
    [, Ce] = React.useState(0),
    V = React.useRef<HTMLDivElement | null>(null);
  React.useLayoutEffect(() => {
    (V.current?.offsetWidth ?? 1 / 0) <= 1e3 && B(false);
  }, []);
  let H = v.slice(0, b),
    U = new Set(H.filter((e) => e.kind === `step`).map((e) => e.s)),
    W = new Set(H.filter((e) => e.kind === `finish`).map((e) => e.s)),
    G = new Set(H.filter((e) => e.kind === `ask`).map((e) => e.s)),
    we = (e: number, t: number): "running" | "success" | null =>
      H.some((n) => n.kind === `end` && n.s === e && n.c === t)
        ? `success`
        : H.some((n) => n.kind === `call` && n.s === e && n.c === t)
          ? `running`
          : null,
    K = steps.findIndex((e, t) => U.has(t) && !W.has(t)),
    q = H[H.length - 1],
    J = q?.kind === `ask` && I[q.s] !== `approved` && !P ? q.s : -1,
    Y = b >= v.length,
    X: RunPhase = Y ? `done` : P ? `stopped` : J >= 0 ? `waiting` : `running`;
  (React.useEffect(() => {
    if (!autoRun || P || b >= v.length || (q?.kind === `ask` && I[q.s] !== `approved`)) return;
    let e = window.setTimeout(() => E((e) => e + 1), v[b].delay);
    return () => window.clearTimeout(e);
  }, [autoRun, b, P, I, v, O]),
    React.useEffect(() => {
      Y && M === null && (N(Date.now()), onDone?.());
    }, [Y]),
    React.useEffect(() => {
      if (X === `done` || X === `stopped`) return;
      let e = window.setInterval(() => Ce((e) => e + 1), 1e3);
      return () => window.clearInterval(e);
    }, [X]));
  let Te: PlanStep[] = steps.map((e, t) => {
      let n = P && t === K;
      return {
        id: e.id,
        title: e.title,
        detail: e.detail,
        tool: e.tool,
        status: W.has(t) ? `done` : n ? `failed` : U.has(t) ? `active` : `pending`,
        error: n ? (P === `denied` ? `You denied this step` : `Stopped by you`) : void 0,
      };
    }),
    Ee = () => {
      (E(0), F(null), L({}), R({}), N(null), j(Date.now()), k((e) => e + 1));
    },
    De = () => {
      (F(`user`), N(Date.now()), onStop?.());
    },
    Oe = (e: string) => {
      let n = steps.findIndex((t) => t.id === e),
        r = v.findIndex((e) => e.kind === `step` && e.s === n);
      r < 0 ||
        (L((e) => {
          let t = {
            ...e,
          };
          return (delete t[n], t);
        }),
        F(null),
        N(null),
        E(r));
    },
    Z = (e: number, n: "approved" | "denied") => {
      (L((t) => ({
        ...t,
        [e]: n,
      })),
        n === `approved` && (F(null), N(null), onApprove?.(steps[e].id)),
        n === `denied` && (F(`denied`), N(Date.now()), onDeny?.(steps[e].id)));
    },
    Q = (M ?? Date.now()) - A,
    ke = new Date(A).toLocaleTimeString(`en-US`, {
      hour: `numeric`,
      minute: `2-digit`,
    }),
    Ae = {
      running: `Running`,
      waiting: `Needs input`,
      done: `Done`,
      stopped: `Stopped`,
    },
    $ = steps
      .map((e, t) => t)
      .filter((e) => G.has(e))
      .reverse(),
    je = X === `running` || X === `waiting`,
    Me = steps.reduce((e, t) => e + t.calls.length, 0);
  return (
    <AppShell active={`Runs`} nav={valueValue5} groups={valueValue6} {..._}>
      <style href={`ui-agent-run`} precedence={`default`}>
        {ValueValue2}
      </style>
      <div ref={V} className={`ui-ar`} data-panel={z || void 0}>
        <section className={`ui-ar__main`}>
          <header className={`ui-ar__bar`}>
            <span className={`ui-ar__crumbs`}>
              <Icon icon={valueValue3} size={15} />
              {`Runs `}
              <i>{`/`}</i>
              {` `}
              <b>{title}</b>
              <span className={`ui-ar__pill`} data-phase={X}>
                <span aria-hidden={`true`} />
                {Ae[X]}
              </span>
            </span>
            <span className={`ui-ar__tools`}>
              <span className={`ui-ar__time`}>
                <Icon icon={valueValue} size={14} />
                {X === `done` ? `Done in ${ValueValue(Q)}` : `Started ${ke} · ${valueValue11(Q)}`}
              </span>
              {je ? (
                <Button
                  size={`sm`}
                  variant={`secondary`}
                  icon={<Icon icon={valueValue4} size={14} />}
                  onClick={De}
                >{`Stop run`}</Button>
              ) : (
                <Button
                  size={`sm`}
                  icon={<Icon icon={valueValue25} size={14} />}
                  onClick={Ee}
                >{`Run again`}</Button>
              )}
              <DropdownMenu
                align={`end`}
                items={[
                  {
                    label: `Copy run link`,
                    icon: valueValue20,
                  },
                  {
                    label: `Share`,
                    icon: valueValue16,
                  },
                  {
                    label: `View in Chat`,
                    icon: valueValue13,
                    onSelect: () => _.onNavigate?.(`Chat`),
                  },
                ]}
                trigger={({ open: open, toggle: toggle }) => (
                  <button
                    type={`button`}
                    className={`ui-as-icon-btn`}
                    aria-label={`Run options`}
                    aria-expanded={open}
                    onClick={toggle}
                  >
                    <Icon icon={valueValue24} size={15} />
                  </button>
                )}
              />
              <button
                type={`button`}
                className={`ui-as-icon-btn`}
                aria-label={z ? `Hide side panel` : `Show side panel`}
                aria-pressed={z}
                onClick={() => B((e) => !e)}
              >
                <Icon icon={valueValue17} size={16} />
              </button>
            </span>
          </header>
          <div className={`ui-ar__scroll`}>
            <div className={`ui-ar__column`}>
              <AgentPlan
                title={title}
                steps={Te}
                status={Y ? `done` : `running`}
                onRetry={Oe}
                key={O}
              />
              <div className={`ui-ar__feed`}>
                <span className={`ui-ar__label`}>{`Activity`}</span>
                {steps.map((e, t) => {
                  if (!U.has(t)) return null;
                  let n = e.calls
                      .map((e, n) => ({
                        call: e,
                        c: n,
                        state: we(t, n),
                      }))
                      .filter((e) => e.state),
                    r = t === K;
                  return (
                    <div className={`ui-ar__entry ui-as-rise`} key={`${O}-${e.id}`}>
                      <span className={`ui-ar__entry-head`}>
                        <span className={`ui-ar__num`} data-done={W.has(t) || void 0}>
                          {t + 1}
                        </span>
                        {e.title}
                      </span>
                      {G.has(t) && (
                        <span className={`ui-ar__note`} data-state={I[t] ?? `pending`}>
                          <Icon icon={valueValue15} size={14} />
                          {I[t] === `approved`
                            ? `You approved this step`
                            : I[t] === `denied`
                              ? `You denied this step`
                              : `Waiting for your approval`}
                          {J === t && !z && (
                            <button type={`button`} onClick={() => B(true)}>{`Review`}</button>
                          )}
                        </span>
                      )}
                      {n.length > 0 && (
                        <ToolCallGroup
                          open={Se[t] ?? r}
                          onOpenChange={(e) =>
                            R((n) => ({
                              ...n,
                              [t]: e,
                            }))
                          }
                          runningLabel={`Using tools…`}
                        >
                          {n.map(({ call: call, c: c, state: state }) => (
                            <ToolCall
                              name={call.name}
                              summary={call.summary}
                              icon={<Icon icon={call.icon ?? valueValue9(call.name)} size={14} />}
                              status={state === `running` && P ? `error` : state}
                              error={P ? `Stopped before it finished` : void 0}
                              openOnError={false}
                              args={call.args}
                              result={state === `success` ? call.result : void 0}
                              duration={state === `success` ? call.duration : void 0}
                              key={c}
                            />
                          ))}
                        </ToolCallGroup>
                      )}
                    </div>
                  );
                })}
                {X !== `stopped` && (
                  <ThinkingLoader
                    className={`ui-ar__loader`}
                    size={`sm`}
                    phases={[...steps.map((e) => e.title), `Waiting for your approval`]}
                    phase={J >= 0 ? steps.length : Math.max(0, K)}
                    done={Y}
                    doneLabel={`Done in ${ValueValue(Q)}`}
                    key={O}
                  />
                )}
              </div>
            </div>
          </div>
        </section>
        {z && <div className={`ui-ar__scrim`} aria-hidden={`true`} onClick={() => B(false)} />}
        {z && (
          <aside className={`ui-ar__panel`} aria-label={`Run details`}>
            <header className={`ui-ar__bar`}>
              <span className={`ui-ar__crumbs`}>
                <b>{`Needs your input`}</b>
                {J >= 0 && <span className={`ui-ar__count`}>{`1`}</span>}
              </span>
            </header>
            <div className={`ui-ar__panel-body`}>
              <section className={`ui-ar__section`}>
                {$.length ? (
                  $.map((e) => {
                    let n = steps[e].approval!;
                    return (
                      <ApprovalCard
                        className={`ui-as-rise`}
                        title={n.title}
                        description={n.description}
                        risk={n.risk}
                        icon={<Icon icon={valueValue23} size={15} />}
                        details={n.details}
                        status={I[e] ?? `pending`}
                        allowAlways={false}
                        label={`Step ${e + 1}${steps[e].tool ? ` · ${steps[e].tool}` : ``}`}
                        actions={`card`}
                        onApprove={() => Z(e, `approved`)}
                        onDeny={() => Z(e, `denied`)}
                        key={`${O}-${e}`}
                      />
                    );
                  })
                ) : (
                  <Iconxe
                    icon={<Icon icon={ClaudeIcon} size={16} />}
                    title={`Nothing needs you yet`}
                  >{`The agent asks here before it sends or books anything.`}</Iconxe>
                )}
              </section>
              <section className={`ui-ar__section`}>
                <span className={`ui-ar__label`}>{`Draft`}</span>
                <DocumentDiff
                  label={draft.label}
                  original={draft.original}
                  suggested={draft.suggested}
                  key={O}
                />
              </section>
              <section className={`ui-ar__section`}>
                <span className={`ui-ar__label`}>{`Details`}</span>
                <dl className={`ui-ar__details`}>
                  {[
                    {
                      label: `Agent`,
                      value: agent,
                      icon: ClaudeIcon,
                    },
                    {
                      label: `Triggered by`,
                      value: _.user?.name ?? `Alex Morgan`,
                      icon: valueValue18,
                    },
                    {
                      label: `Tool calls`,
                      value: String(Me),
                      icon: valueValue19,
                    },
                    {
                      label: `Cost`,
                      value: `$0.14`,
                      icon: valueValue2,
                    },
                  ].map((e) => (
                    <div key={e.label}>
                      <dt>
                        <Icon icon={e.icon} size={14} />
                        {e.label}
                      </dt>
                      <dd>{e.value}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            </div>
          </aside>
        )}
      </div>
    </AppShell>
  );
}
function Iconxe({
  icon: icon,
  title: title,
  children: children,
}: {
  icon: React.ReactNode;
  title: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <div className={`ui-ar__quiet`}>
      <span>{icon}</span>
      <b>{title}</b>
      <p>{children}</p>
    </div>
  );
}
var ValueValue2 = `
/* Agent run: the plan and its activity in the middle, what needs you on the right – each scrolls on its own */
.ui-ar { display: flex; height: 100%; min-height: 0; }
.ui-ar__main { display: flex; flex: 1; flex-direction: column; min-width: 0; }

.ui-ar__bar {
  display: flex;
  flex: none;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  height: 52px;
  padding: 0 12px 0 20px;
  border-bottom: 1px solid var(--line-soft);
  color: var(--muted);
}
.ui-ar__crumbs { display: flex; align-items: center; gap: 8px; min-width: 0; font-size: 13.5px; white-space: nowrap; }
.ui-ar__crumbs i { font-style: normal; color: var(--faint); }
.ui-ar__crumbs b { overflow: hidden; font-weight: 500; color: var(--ink); text-overflow: ellipsis; }
.ui-ar__tools { display: flex; flex: none; align-items: center; gap: 6px; }
.ui-ar__tools .ui-as-icon-btn[aria-pressed="true"] { background: var(--chip); color: var(--ink); }
.ui-ar__time { display: flex; align-items: center; gap: 6px; margin-right: 6px; font-size: 13px; color: var(--muted); font-variant-numeric: tabular-nums; }

/* Status pill: a soft dot that breathes while the run is live */
.ui-ar__pill {
  display: inline-flex;
  flex: none;
  align-items: center;
  gap: 6px;
  height: 22px;
  margin-left: 4px;
  padding: 0 9px 0 8px;
  border-radius: 999px;
  background: var(--accent-soft);
  font-size: 12px;
  font-weight: 500;
  color: var(--accent);
}
.ui-ar__pill span { width: 6px; height: 6px; border-radius: 50%; background: currentColor; }
.ui-ar__pill[data-phase="running"] span { animation: ui-ar-breathe 1.4s ease-in-out infinite; }
.ui-ar__pill[data-phase="waiting"] { background: rgba(217, 119, 6, 0.1); color: #b45309; }
.ui-ar__pill[data-phase="waiting"] span { animation: ui-ar-breathe 1.4s ease-in-out infinite; }
.ui-ar__pill[data-phase="done"] { background: rgba(22, 163, 74, 0.1); color: #15803d; }
.ui-ar__pill[data-phase="stopped"] { background: var(--chip); color: var(--muted); }
@keyframes ui-ar-breathe { 50% { opacity: 0.35; } }

.ui-ar__scroll { flex: 1; min-height: 0; overflow-y: auto; padding: 32px 32px 40px; }
.ui-ar__column { display: flex; flex-direction: column; gap: 28px; max-width: 680px; margin: 0 auto; }
/* The plan fills the column instead of its own 460px default */
.ui-ar__column .ui-pl { max-width: none; }

.ui-ar__label { display: block; padding-bottom: 12px; font-size: 12.5px; font-weight: 500; line-height: 16px; color: var(--faint); }
.ui-ar__feed { display: flex; flex-direction: column; }
.ui-ar__feed > .ui-ar__label { padding-bottom: 14px; }
.ui-ar__entry { position: relative; display: flex; flex-direction: column; gap: 10px; padding: 0 0 20px 34px; }
/* A fine line joins the step numbers into a timeline */
.ui-ar__entry::before { content: ""; position: absolute; top: 26px; bottom: 4px; left: 11px; width: 1px; background: var(--line); }
.ui-ar__entry-head { display: flex; align-items: center; min-height: 22px; font-size: 13.5px; font-weight: 500; color: var(--ink); }
.ui-ar__num {
  position: absolute;
  top: 0;
  left: 0;
  display: grid;
  place-items: center;
  width: 23px;
  height: 23px;
  border-radius: 50%;
  box-shadow: inset 0 0 0 1px var(--line);
  font-size: 11.5px;
  font-weight: 500;
  color: var(--muted);
  font-variant-numeric: tabular-nums;
  transition: background-color 200ms ease, color 200ms ease;
}
.ui-ar__num[data-done] { background: var(--chip); box-shadow: none; color: var(--ink); }
.ui-ar__note { display: flex; align-items: center; gap: 7px; font-size: 13px; color: var(--muted); }
.ui-ar__note[data-state="pending"] { color: #b45309; }
.ui-ar__note[data-state="approved"] { color: #15803d; }
.ui-ar__note button { margin-left: 4px; font-weight: 500; color: var(--ink); text-decoration: underline; text-underline-offset: 2px; }
.ui-ar__loader { align-self: flex-start; margin-left: 34px; }

/* Side panel: flat sections divided by fine lines */
.ui-ar__panel { display: flex; flex: none; flex-direction: column; width: 360px; min-height: 0; border-left: 1px solid var(--line-soft); }
.ui-ar__panel-body { flex: 1; min-height: 0; overflow-y: auto; }
.ui-ar__section { display: flex; flex-direction: column; padding: 20px; }
.ui-ar__section + .ui-ar__section { border-top: 1px solid var(--line-soft); }
.ui-ar__section > .ui-ap + .ui-ap { margin-top: 12px; }
.ui-ar__count {
  display: grid;
  place-items: center;
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  border-radius: 999px;
  background: #d97706;
  font-size: 11px;
  font-weight: 600;
  color: #fff;
  animation: ui-as-pop 320ms var(--ease) both;
}
.ui-ar__quiet { display: flex; flex-direction: column; align-items: center; gap: 4px; padding: 14px 12px 16px; border-radius: 14px; background: var(--subtle); box-shadow: inset 0 0 0 1px var(--line-soft); text-align: center; }
.ui-ar__quiet > span { display: grid; place-items: center; width: 34px; height: 34px; margin-bottom: 6px; border-radius: 10px; background: var(--chip); color: var(--muted); }
.ui-ar__quiet b { font-size: 13.5px; font-weight: 500; color: var(--ink); }
.ui-ar__quiet p { max-width: 240px; margin: 0; font-size: 12.5px; line-height: 18px; color: var(--muted); }

.ui-ar__details { display: grid; gap: 12px; margin: 0; }
.ui-ar__details div { display: flex; align-items: center; justify-content: space-between; font-size: 13px; }
.ui-ar__details dt { display: flex; align-items: center; gap: 8px; color: var(--muted); }
.ui-ar__details dd { margin: 0; font-weight: 500; color: var(--ink); font-variant-numeric: tabular-nums; }

:where(.dark, [data-theme="dark"]) .ui-ar__pill[data-phase="waiting"], :where(.dark, [data-theme="dark"]) .ui-ar__note[data-state="pending"] { color: #fbbf24; }
:where(.dark, [data-theme="dark"]) .ui-ar__pill[data-phase="waiting"] { background: rgba(251, 191, 36, 0.12); }
:where(.dark, [data-theme="dark"]) .ui-ar__pill[data-phase="done"], :where(.dark, [data-theme="dark"]) .ui-ar__note[data-state="approved"] { color: #4ade80; }
:where(.dark, [data-theme="dark"]) .ui-ar__pill[data-phase="done"] { background: rgba(74, 222, 128, 0.12); }

/* Room for the sidebar icon while the sidebar is collapsed */
.ui-ar__main > .ui-ar__bar { transition: padding-left 420ms var(--ease); }
.ui-as-app[data-collapsed] .ui-ar__main > .ui-ar__bar { padding-left: 52px; }
.ui-ar__scrim { display: none; }

/* Narrow panels: the side panel becomes a layer that slides in from the right */
@container ui-as-main (max-width: 1000px) {
  .ui-ar__time { display: none; }
  .ui-ar__panel {
    position: absolute;
    z-index: 12;
    top: 0;
    right: 0;
    bottom: 0;
    width: min(360px, calc(100% - 32px));
    border-left: 0;
    border-radius: 0 var(--radius-panel) var(--radius-panel) 0;
    background: var(--panel);
    box-shadow: -1px 0 0 var(--line), -20px 0 40px -16px rgba(0, 0, 0, 0.2);
    animation: ui-ar-panel-in 420ms var(--ease) both;
  }
  .ui-ar__scrim {
    display: block;
    position: absolute;
    z-index: 11;
    inset: 0;
    border-radius: inherit;
    background: rgba(0, 0, 0, 0.18);
    animation: ui-ar-fade 300ms ease both;
  }
}
@keyframes ui-ar-panel-in { from { transform: translateX(40px); opacity: 0; } to { transform: none; opacity: 1; } }
@keyframes ui-ar-fade { from { opacity: 0; } }
@container ui-as (max-width: 900px) {
  .ui-ar__main > .ui-ar__bar { padding-left: 52px; }
}
@container ui-as (max-width: 600px) {
  .ui-ar__main .ui-ar__crumbs > svg, .ui-ar__main .ui-ar__crumbs > i { display: none; }
  .ui-ar__main .ui-ar__crumbs { font-size: 0; }
  .ui-ar__main .ui-ar__crumbs > b { font-size: 13.5px; }
  .ui-ar__bar { padding-right: 8px; }
  .ui-ar__panel .ui-ar__bar { padding-left: 20px; }
  .ui-ar__scroll { padding: 20px 16px 24px; }
  .ui-ar__panel { width: 100%; border-radius: var(--radius-panel); }
  .ui-ar__section { padding: 16px; }
}
`;
function AgentRunDemo2() {
  return (
    <PreviewFrame>
      <AgentRun onNavigate={navigateScreen} />
    </PreviewFrame>
  );
}
function FullScreen(props: Record<string, never>) {
  return (
    <ScreenFrameModeContext.Provider value={true}>
      <AgentRunDemo2 {...props} />
    </ScreenFrameModeContext.Provider>
  );
}
const demoStyles = "";
function AgentRunDemo(props: Record<string, never>) {
  return (
    <>
      <style href="plico-demo-agent-run" precedence="default">
        {demoStyles}
      </style>
      <AgentRunDemo2 {...props} />
    </>
  );
}
export { AgentRun };
export { AgentRunDemo };
export { AgentRun as Component };
export { AgentRunDemo as Demo };
export { FullScreen };
export default AgentRun;

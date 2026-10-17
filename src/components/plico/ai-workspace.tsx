"use client";

import * as React from "react";
type CSSVariables = React.CSSProperties & {
  [key: `--${string}`]: string | number;
};
export interface WorkspaceMessage {
  id: string;
  role: string;
  text: string;
}
export interface Conversation {
  id: string;
  title: string;
  messages: WorkspaceMessage[];
}
export interface Project {
  id: string;
  name: string;
  description: string;
  updatedDaysAgo: number;
  pinned?: boolean;
}
interface ChatModel {
  id: string;
  name: string;
  description: string;
  Logo: () => React.ReactNode;
}
interface ChatComposerProps {
  placeholder?: string;
  models?: ChatModel[];
  loadMs?: number;
  dictation?: string;
  onSend?: (message: string, details: { model: string }) => void;
  onModelChange?: (model: ChatModel) => void;
  onAttach?: () => void;
  onConnectApps?: () => void;
  onRequestApproval?: () => void;
  onSelectProject?: () => void;
}
interface AiWorkspaceProps {
  userName?: string;
  userAvatar?: string;
  workspace?: React.ReactNode;
  pinned?: string[];
  conversations?: Conversation[];
  projects?: Project[];
  respond?: (message: string, history: WorkspaceMessage[]) => Promise<string>;
  className?: string;
}
var valueValue8 = [
  {
    id: `auto`,
    name: `Auto`,
    description: `Picks the best model for each task`,
    Logo: () => <ValueValue />,
  },
  {
    id: `claude`,
    name: `Claude`,
    description: `Thoughtful writing and code`,
    Logo: () => <ValueValue3 />,
  },
  {
    id: `chatgpt`,
    name: `ChatGPT`,
    description: `Quick answers for everyday tasks`,
    Logo: () => <ValueValue4 />,
  },
];
var valueValue9 = 16;
var valueValue10 = () =>
  Array.from(
    {
      length: valueValue9,
    },
    () => 0,
  );
function ChatComposerComponent({
  placeholder = `Start by typing...`,
  models = valueValue8,
  loadMs = 1300,
  dictation = `Draft a short update for the team about this week's progress`,
  onSend: onSend,
  onModelChange: onModelChange,
  onAttach: onAttach,
  onConnectApps: onConnectApps,
  onRequestApproval: onRequestApproval,
  onSelectProject: onSelectProject,
}: ChatComposerProps) {
  let [O, k] = React.useState(`idle`),
    [A, j] = React.useState(`idle`),
    [M, N] = React.useState(``),
    [P, ee] = React.useState(models[0]),
    [F, I] = React.useState(false),
    [L, R] = React.useState(false),
    [z, B] = React.useState(``),
    [V, H] = React.useState(valueValue10),
    [te, U] = React.useState(``),
    W = React.useRef<HTMLElement | null>(null),
    G = React.useRef<HTMLTextAreaElement | null>(null),
    [ne, re] = React.useState(1);
  React.useLayoutEffect(() => {
    let e = G.current;
    if (!e) return;
    let t = e.style.height;
    e.style.height = `0px`;
    let n = e.scrollHeight;
    e.style.height = t;
    let r = parseFloat(getComputedStyle(e).lineHeight) || 1;
    re(Math.min(2, Math.max(1, Math.round(n / r))));
  }, [M]);
  let K = React.useRef<HTMLButtonElement | null>(null),
    q = React.useRef(0),
    [J, ie] = React.useState(false),
    Y = React.useRef<number[]>([]);
  React.useEffect(() => () => Y.current.forEach(clearTimeout), []);
  let X = (e: TimerHandler) => Y.current.push(window.setTimeout(e, loadMs)),
    ae = () => {
      O === `idle` &&
        (k(`loading`),
        U(`Connecting apps…`),
        onConnectApps?.(),
        X(() => {
          (k(`done`), U(`Apps connected. Select a project.`));
        }));
    },
    oe = () => {
      A === `idle` &&
        (j(`loading`),
        U(`Requesting approval…`),
        onRequestApproval?.(),
        X(() => {
          (j(`done`), U(`Unrestricted access granted.`));
        }));
    },
    se = (e: ChatModel) => {
      (e.id !== P.id && ie(true),
        ee(e),
        I(false),
        U(`${e.name} selected.`),
        onModelChange?.(e),
        K.current?.focus());
    };
  (React.useLayoutEffect(() => {
    let e = K.current;
    if (!e) return;
    let t = e.getBoundingClientRect().width,
      n = q.current;
    ((q.current = t),
      !(!J || !n || Math.abs(n - t) < 0.5) &&
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
              duration: 460,
              easing: `cubic-bezier(0.25, 1, 0.5, 1)`,
            },
          )));
  }, [P.id]),
    React.useEffect(() => {
      if (!L) return;
      let e = dictation.split(/\s+/).filter(Boolean),
        t = 0,
        n = window.setInterval(() => {
          ((t = Math.min(e.length, t + 1)), B(e.slice(0, t).join(` `)));
        }, 320),
        r = window.setInterval(() => {
          let n = t < e.length && Math.random() > 0.3 ? 0.3 + Math.random() * 0.7 : 0;
          H((e) => [...e.slice(1), n]);
        }, 120);
      return () => {
        (clearInterval(n), clearInterval(r));
      };
    }, [L, dictation]));
  let ce = () => {
      (I(false), B(``), H(valueValue10()), R(true), U(`Recording. Press Escape to discard.`));
    },
    Z = (e: boolean) => {
      (R(false),
        e && z
          ? (N((e) => (e.trim() ? `${e.trimEnd()} ${z}` : z)),
            U(`Recording added to your message.`))
          : U(`Recording discarded.`),
        B(``),
        G.current?.focus());
    },
    Q = M.trim().length > 0,
    $ = () => {
      Q &&
        (onSend?.(M.trim(), {
          model: P.id,
        }),
        N(``),
        U(`Message sent.`),
        G.current?.focus());
    };
  return (
    <div className={`ui-chat-composer`}>
      <style href={`ui-chat-composer`} precedence={`default`}>
        {ValueValue5}
      </style>
      <section
        ref={W}
        className={`ui-chat-composer__body`}
        data-apps={O}
        data-approval={A}
        data-recording={L}
        style={
          {
            "--ui-cc-grow": (ne - 1) * 106.424,
          } as CSSVariables
        }
        aria-label={`Message composer`}
        onKeyDown={(e) => {
          e.key === `Escape` && L && (e.preventDefault(), Z(false));
        }}
      >
        <div className={`ui-chat-composer__tray`}>
          <button
            type={`button`}
            className={`ui-chat-composer__row ui-chat-composer__project`}
            onClick={onSelectProject}
            inert={O !== `done`}
            aria-hidden={O !== `done`}
          >
            <span className={`ui-chat-composer__icon ui-chat-composer__icon--folder`}>
              <Icong />
            </span>
            <span className={`ui-chat-composer__label`}>{`Select a project`}</span>
          </button>
          <button
            type={`button`}
            className={`ui-chat-composer__row ui-chat-composer__connect`}
            onClick={ae}
            inert={O === `done`}
            aria-busy={O === `loading`}
          >
            <span className={`ui-chat-composer__logos`} aria-hidden={`true`}>
              <span className={`ui-chat-composer__logo ui-chat-composer__logo--gmail`}>
                <Iconv />
              </span>
              <span className={`ui-chat-composer__logo ui-chat-composer__logo--slack`}>
                <Icony />
              </span>
              <span className={`ui-chat-composer__logo ui-chat-composer__logo--clickup`}>
                <Iconb />
              </span>
            </span>
            <span
              className={`ui-chat-composer__label ui-chat-composer__shimmer`}
              data-text={`Connect apps`}
            >{`Connect apps`}</span>
          </button>
        </div>
        <div
          className={`ui-chat-composer__card`}
          onPointerDown={(e) => {
            (e.target as Element).closest(`button, textarea, input`) ||
              (e.preventDefault(), G.current?.focus());
          }}
        >
          <textarea
            ref={G}
            className={`ui-chat-composer__message`}
            value={M}
            onChange={(e) => N(e.target.value)}
            onKeyDown={(e) => {
              e.key === `Enter` &&
                !e.shiftKey &&
                !e.nativeEvent.isComposing &&
                (e.preventDefault(), $());
            }}
            placeholder={placeholder}
            aria-label={`Message`}
            spellCheck={false}
            readOnly={L}
          />
          <div className={`ui-chat-composer__draft`} aria-hidden={`true`}>
            {M}
            {M && z && !/\s$/.test(M) ? ` ` : ``}
            <span className={`ui-chat-composer__heard`}>{z}</span>
          </div>
          <div className={`ui-chat-composer__toolbar`}>
            <button
              type={`button`}
              className={`ui-chat-composer__icon-btn`}
              aria-label={`Add attachment`}
              onClick={onAttach}
            >
              <span className={`ui-chat-composer__icon`}>
                <Iconu2 />
              </span>
            </button>
            <button
              type={`button`}
              className={`ui-chat-composer__approval`}
              onClick={oe}
              aria-busy={A === `loading`}
              aria-disabled={A !== `idle`}
            >
              <span className={`ui-chat-composer__wash`} aria-hidden={`true`} />
              <span className={`ui-chat-composer__icon`} aria-hidden={`true`}>
                <Icond2 />
                <Iconf2 />
              </span>
              <span className={`ui-chat-composer__approval-text`}>
                <span
                  className={`ui-chat-composer__request ui-chat-composer__shimmer`}
                  data-text={`Request approval`}
                  aria-hidden={A === `done`}
                >{`Request approval`}</span>
                <span
                  className={`ui-chat-composer__granted`}
                  aria-hidden={A !== `done`}
                >{`Unrestricted access`}</span>
              </span>
            </button>
          </div>
          <div className={`ui-chat-composer__toolbar ui-chat-composer__toolbar--end`} inert={L}>
            <button
              ref={K}
              type={`button`}
              className={`ui-chat-composer__model`}
              aria-haspopup={`listbox`}
              aria-expanded={F}
              onClick={() => I((e) => !e)}
              onKeyDown={(e) => {
                (e.key === `ArrowDown` || e.key === `ArrowUp`) && (e.preventDefault(), I(true));
              }}
            >
              <span className={`ui-chat-composer__model-face`} data-morph={J || void 0} key={P.id}>
                {P.Logo && P.id !== `auto` && (
                  <span className={`ui-chat-composer__model-logo`} aria-hidden={`true`}>
                    <P.Logo />
                  </span>
                )}
                <span className={`ui-chat-composer__label`}>{P.name}</span>
              </span>
              <span
                className={`ui-chat-composer__icon ui-chat-composer__icon--chevron`}
                aria-hidden={`true`}
              >
                <Iconm />
              </span>
            </button>
            <button
              type={`button`}
              className={`ui-chat-composer__icon-btn`}
              aria-label={`Voice input`}
              onClick={ce}
            >
              <span className={`ui-chat-composer__icon`}>
                <Iconp />
              </span>
            </button>
            <button
              type={`button`}
              className={`ui-chat-composer__send`}
              aria-label={`Send message`}
              disabled={!Q}
              onClick={$}
            >
              <Iconh />
            </button>
          </div>
          <div
            className={`ui-chat-composer__toolbar ui-chat-composer__toolbar--end ui-chat-composer__toolbar--voice`}
            inert={!L}
          >
            <span className={`ui-chat-composer__trace`} aria-hidden={`true`}>
              {V.map((e, t) => (
                <span
                  style={{
                    height: `calc(${Math.max(8, e * 64)} * var(--u))`,
                  }}
                  key={t}
                />
              ))}
            </span>
            <button
              type={`button`}
              className={`ui-chat-composer__square`}
              aria-label={`Discard recording`}
              onClick={() => Z(false)}
            >
              <Iconw />
            </button>
            <button
              type={`button`}
              className={`ui-chat-composer__square`}
              aria-label={`Use recording`}
              onClick={() => Z(true)}
            >
              <ValueValue2 />
            </button>
          </div>
        </div>
        <Iconl
          open={F}
          models={models}
          selected={P}
          anchor={K}
          container={W}
          onPick={se}
          onClose={(e) => {
            (I(false), e && K.current?.focus());
          }}
        />
      </section>
      <p className={`ui-chat-composer__sr-only`} aria-live={`polite`}>
        {te}
      </p>
    </div>
  );
}
function valueValue11(e: HTMLElement) {
  for (let t = e.parentElement; t && t !== document.body; t = t.parentElement) {
    let { overflowX: e, overflowY: n } = getComputedStyle(t);
    if (e !== `visible` || n !== `visible`) return t.getBoundingClientRect();
  }
  return {
    top: 0,
    left: 0,
    right: window.innerWidth,
    bottom: window.innerHeight,
  };
}
function Iconl({
  open: open,
  models: models,
  selected: selected,
  anchor: anchor,
  container: container,
  onPick: onPick,
  onClose: onClose,
}: {
  open: boolean;
  models: ChatModel[];
  selected: ChatModel;
  anchor: React.RefObject<HTMLButtonElement | null>;
  container: React.RefObject<HTMLElement | null>;
  onPick: (model: ChatModel) => void;
  onClose: (focus: boolean) => void;
}) {
  let u = React.useId(),
    d = React.useRef<HTMLDivElement | null>(null),
    f = React.useRef<(HTMLDivElement | null)[]>([]),
    [p, m] = React.useState(0),
    [h, g] = React.useState({
      top: 0,
      left: 0,
      up: true,
      fromTop: 0,
      fromLeft: 0,
      fromRadius: 0,
    }),
    [_, v] = React.useState({
      y: 0,
      h: 0,
      glide: false,
    }),
    [y, b] = React.useState(false),
    x = React.useRef(false),
    [S, w] = React.useState(false),
    [T, E] = React.useState(false);
  return (
    React.useLayoutEffect(() => {
      if (!open) {
        w(false);
        return;
      }
      if (!anchor.current || !container.current || !d.current) return;
      let n = anchor.current.getBoundingClientRect(),
        r = container.current.getBoundingClientRect(),
        s = valueValue11(container.current),
        l = d.current.offsetWidth,
        u = d.current.offsetHeight,
        f = n.top - 8 - (s.top + 8),
        p = s.bottom - 8 - (n.bottom + 8),
        h = f >= u || f >= p,
        _ = (e: number, t: number, n: number) => Math.max(t, Math.min(e, n)),
        v = _(h ? n.top - 8 - u : n.bottom + 8, s.top + 8, s.bottom - 8 - u),
        y = _(n.right - l, s.left + 8, s.right - 8 - l),
        x = _(n.left - y, 0, l - 1),
        S = h ? _(u - n.height, 0, u - 1) : 0;
      (g({
        top: v - r.top,
        left: y - r.left,
        up: h,
        fromTop: S,
        fromLeft: x,
        fromRadius: n.height / 2,
      }),
        m(
          Math.max(
            0,
            models.findIndex((e) => e.id === selected.id),
          ),
        ),
        b(false),
        E(true));
    }, [open]),
    React.useLayoutEffect(() => {
      open && !S && d.current && (getComputedStyle(d.current).clipPath, E(false), w(true));
    }, [h]),
    React.useEffect(() => {
      S &&
        d.current?.focus({
          preventScroll: true,
        });
    }, [S]),
    React.useLayoutEffect(() => {
      let e = f.current[p];
      (e &&
        v({
          y: e.offsetTop,
          h: e.offsetHeight,
          glide: x.current && y,
        }),
        (x.current = y));
    }, [p, open, y]),
    React.useEffect(() => {
      if (!open) return;
      let t = (e: PointerEvent) => {
        let t = e.target as Node | null;
        d.current?.contains(t) || anchor.current?.contains(t) || onClose(false);
      };
      return (
        document.addEventListener(`pointerdown`, t),
        () => document.removeEventListener(`pointerdown`, t)
      );
    }, [open, onClose, anchor]),
    (
      <div
        className={`ui-chat-composer__menu`}
        data-open={S}
        data-placing={T}
        data-up={h.up}
        style={
          {
            top: h.top,
            left: h.left,
            "--from-top": `${h.fromTop}px`,
            "--from-left": `${h.fromLeft}px`,
            "--from-bottom": h.up ? `0px` : `calc(100% - ${h.fromRadius * 2}px)`,
            "--from-radius": `${h.fromRadius}px`,
          } as CSSVariables
        }
        inert={!S}
      >
        <div
          ref={d}
          className={`ui-chat-composer__menu-panel`}
          role={`listbox`}
          tabIndex={-1}
          aria-label={`Select a model`}
          aria-activedescendant={`${u}-${p}`}
          onKeyDown={(e) => {
            let n = models.length - 1,
              r: Partial<Record<string, number>> = {
                ArrowDown: Math.min(n, p + 1),
                ArrowUp: Math.max(0, p - 1),
                Home: 0,
                End: n,
              };
            e.key in r
              ? (e.preventDefault(), m(r[e.key]!), b(true))
              : e.key === `Enter` || e.key === ` `
                ? (e.preventDefault(), onPick(models[p]))
                : e.key === `Escape`
                  ? (e.preventDefault(), e.stopPropagation(), onClose(true))
                  : e.key === `Tab` && onClose(false);
          }}
          onPointerLeave={() => b(false)}
        >
          <span
            className={`ui-chat-composer__menu-fill`}
            aria-hidden={`true`}
            data-glide={_.glide}
            style={{
              transform: `translateY(${_.y}px)`,
              height: _.h,
              opacity: +!!y,
            }}
          />
          {models.map((e, t) => (
            <div
              ref={(e) => {
                f.current[t] = e;
              }}
              id={`${u}-${t}`}
              role={`option`}
              aria-selected={e.id === selected.id}
              className={`ui-chat-composer__option`}
              onPointerEnter={() => {
                (m(t), b(true));
              }}
              onClick={() => onPick(e)}
              key={e.id}
            >
              <span className={`ui-chat-composer__option-logo`} aria-hidden={`true`}>
                {e.Logo && <e.Logo />}
              </span>
              <span className={`ui-chat-composer__option-text`}>
                <span className={`ui-chat-composer__option-name`}>{e.name}</span>
                <span className={`ui-chat-composer__option-desc`}>{e.description}</span>
              </span>
              <span className={`ui-chat-composer__option-check`} aria-hidden={`true`}>
                <ValueValue2 />
              </span>
            </div>
          ))}
        </div>
      </div>
    )
  );
}
var Iconu2 = () => (
  <svg viewBox={`0 0 68.155 68.155`} fill={`none`} aria-hidden={`true`}>
    <path
      d={`M34.0812 11.3588V56.7954M56.7995 34.0771H11.3629`}
      stroke={`currentColor`}
      strokeWidth={`4.25969`}
      strokeLinecap={`round`}
      strokeLinejoin={`round`}
    />
  </svg>
);
var Icond2 = () => (
  <svg
    viewBox={`0 0 68.155 68.155`}
    fill={`none`}
    className={`ui-chat-composer__hand`}
    aria-hidden={`true`}
  >
    <path
      d={`M52.5305 32.6557V24.8463C52.5305 22.1016 54.7555 19.8766 57.5001 19.8766C60.2448 19.8766 62.4698 22.1016 62.4698 24.8463V42.027C62.4698 53.3194 53.3154 62.4735 42.0233 62.4735H34.2388M22.7127 39.7552L15.94 31.8537C14.8314 30.5602 13.2129 29.8159 11.5094 29.8159H11.1235C8.11379 29.8159 5.67395 32.2558 5.67395 35.2655C5.67395 36.3412 5.99241 37.393 6.58919 38.2881L16.4118 53.0221C20.3482 58.9269 26.9753 62.4735 34.0719 62.4735`}
      stroke={`currentColor`}
      strokeWidth={`4.25969`}
      strokeLinecap={`round`}
      strokeLinejoin={`round`}
    />
    <path
      d={`M52.534 24.1378V16.3284C52.534 13.5837 50.3091 11.3588 47.5644 11.3588C44.8197 11.3588 42.5948 13.5837 42.5948 16.3284V29.8174`}
      stroke={`currentColor`}
      strokeWidth={`4.25969`}
      strokeLinecap={`round`}
      strokeLinejoin={`round`}
    />
    <path
      d={`M42.5958 29.8198V10.6513C42.5958 7.90661 40.3708 5.68163 37.6262 5.68163C34.8815 5.68163 32.6565 7.90661 32.6565 10.6513V28.4`}
      stroke={`currentColor`}
      strokeWidth={`4.25969`}
      strokeLinecap={`round`}
      strokeLinejoin={`round`}
    />
    <path
      d={`M32.6576 28.3975V16.3284C32.6576 13.5837 30.4326 11.3588 27.6879 11.3588C24.9433 11.3588 22.7183 13.5837 22.7183 16.3284V39.7567`}
      stroke={`currentColor`}
      strokeWidth={`4.25969`}
      strokeLinecap={`round`}
      strokeLinejoin={`round`}
    />
  </svg>
);
var Iconf2 = () => (
  <svg
    viewBox={`0 0 66.543 66.543`}
    fill={`none`}
    className={`ui-chat-composer__shield`}
    aria-hidden={`true`}
  >
    <path
      d={`M33.2482 22.1795V33.27`}
      stroke={`#F44900`}
      strokeWidth={`4.15894`}
      strokeLinecap={`round`}
      strokeLinejoin={`round`}
    />
    <path
      d={`M33.5966 43.67H33.2501M33.9432 43.67C33.9432 44.0529 33.633 44.3631 33.2501 44.3631C32.8672 44.3631 32.5569 44.0529 32.5569 43.67C32.5569 43.2871 32.8672 42.9768 33.2501 42.9768C33.633 42.9768 33.9432 43.2871 33.9432 43.67Z`}
      stroke={`#F44900`}
      strokeWidth={`4.15894`}
      strokeLinecap={`round`}
      strokeLinejoin={`round`}
    />
    <path
      d={`M58.202 31.0087V22.9595C58.202 18.4124 58.202 16.1389 57.0816 14.6555C55.9612 13.1722 53.4278 12.452 48.3612 11.0118C44.8995 10.0278 41.848 8.84228 39.41 7.76002C36.0859 6.28445 34.4237 5.54666 33.2484 5.54666C32.0728 5.54666 30.4109 6.28445 27.0868 7.76002C24.6487 8.84228 21.5973 10.0278 18.1357 11.0118C13.069 12.452 10.5356 13.1722 9.4152 14.6555C8.29475 16.1389 8.29475 18.4124 8.29475 22.9595V31.0087C8.29475 46.605 22.3319 55.9626 29.3498 59.6666C31.0331 60.5549 31.8748 60.9991 33.2484 60.9991C34.622 60.9991 35.4635 60.5549 37.1467 59.6666C44.1648 55.9626 58.202 46.605 58.202 31.0087Z`}
      stroke={`#F44900`}
      strokeWidth={`4.15894`}
      strokeLinecap={`round`}
    />
  </svg>
);
var Iconp = () => (
  <svg viewBox={`0 0 24 24`} fill={`none`} aria-hidden={`true`}>
    <path
      d={`M7 6.5C7 4.01472 9.01472 2 11.5 2C13.9853 2 16 4.01472 16 6.5V11.5C16 13.9853 13.9853 16 11.5 16C9.01472 16 7 13.9853 7 11.5V6.5Z`}
      stroke={`currentColor`}
      strokeWidth={`1.5`}
      strokeLinecap={`round`}
      strokeLinejoin={`round`}
    />
    <path
      d={`M11.5 19H11.0828C7.57267 19 4.57706 16.4623 4 13M11.5 19H11.9172C15.4273 19 18.4229 16.4623 19 13M11.5 19V22`}
      stroke={`currentColor`}
      strokeWidth={`1.5`}
      strokeLinecap={`round`}
      strokeLinejoin={`round`}
    />
  </svg>
);
var Iconm = () => (
  <svg viewBox={`0 0 24 24`} fill={`none`} aria-hidden={`true`}>
    <path
      d={`M18 9.00005C18 9.00005 13.5811 15 12 15C10.4188 15 6 9 6 9`}
      stroke={`currentColor`}
      strokeWidth={`1.5`}
      strokeLinecap={`round`}
      strokeLinejoin={`round`}
    />
  </svg>
);
var Iconh = () => (
  <svg viewBox={`0 0 24 24`} fill={`none`} aria-hidden={`true`}>
    <path
      d={`M12 5.5V19`}
      stroke={`currentColor`}
      strokeWidth={`1.75`}
      strokeLinecap={`round`}
      strokeLinejoin={`round`}
    />
    <path
      d={`M18 11C18 11 13.5811 5.00001 12 5C10.4188 4.99999 6 11 6 11`}
      stroke={`currentColor`}
      strokeWidth={`1.75`}
      strokeLinecap={`round`}
      strokeLinejoin={`round`}
    />
  </svg>
);
var Icong = () => (
  <svg viewBox={`0 0 67 67`} fill={`none`} aria-hidden={`true`}>
    <path
      d={`M11.1704 15.3527V30.7069H55.837V23.7277C55.837 19.8732 52.7123 16.7485 48.8578 16.7485H33.5037L29.5778 10.8598C28.5423 9.30649 26.799 8.37352 24.9322 8.37352H18.1495C14.295 8.37352 11.1704 11.4982 11.1704 15.3527Z`}
      fill={`#00A1FF`}
    />
    <path
      d={`M33.5037 16.7485L29.5778 10.8598C28.5423 9.30649 26.799 8.37352 24.9322 8.37352H18.1495C14.295 8.37352 11.1704 11.4982 11.1704 15.3527V30.7068H55.837V23.7277C55.837 19.8732 52.7123 16.7485 48.8578 16.7485H33.5037ZM33.5037 16.7485H23.7328`}
      stroke={`#00A1FF`}
      strokeWidth={`4.1875`}
      strokeLinecap={`round`}
      strokeLinejoin={`round`}
    />
    <path
      opacity={`0.4`}
      d={`M6.59197 42.3758C5.54336 37.1185 5.01906 34.4899 6.50878 32.7085C6.6081 32.5899 6.71315 32.4751 6.82359 32.3646C8.47975 30.71 11.4107 30.71 17.2725 30.71H49.7312C55.5931 30.71 58.5238 30.71 60.1801 32.3646C60.2904 32.4751 60.3957 32.5899 60.495 32.7085C61.9847 34.4899 61.4604 37.1185 60.4118 42.3758C58.9041 49.9348 58.15 53.7144 55.3073 56.0363C55.1133 56.1945 54.9134 56.3467 54.7076 56.4921C51.6932 58.6266 47.4792 58.6266 39.0506 58.6266H27.9531C19.5246 58.6266 15.3104 58.6266 12.296 56.4921C12.0904 56.3467 11.8904 56.1945 11.6965 56.0363C8.85353 53.7144 8.09969 49.9348 6.59197 42.3758Z`}
      fill={`#929292`}
    />
    <path
      d={`M6.59197 42.3758C5.54336 37.1185 5.01906 34.4899 6.50878 32.7085C6.6081 32.5899 6.71315 32.4751 6.82359 32.3646C8.47975 30.71 11.4107 30.71 17.2725 30.71H49.7312C55.5931 30.71 58.5238 30.71 60.1801 32.3646C60.2904 32.4751 60.3957 32.5899 60.495 32.7085C61.9847 34.4899 61.4604 37.1185 60.4118 42.3758C58.9041 49.9348 58.15 53.7144 55.3073 56.0363C55.1133 56.1945 54.9134 56.3467 54.7076 56.4921C51.6932 58.6266 47.4792 58.6266 39.0506 58.6266H27.9531C19.5246 58.6266 15.3104 58.6266 12.296 56.4921C12.0904 56.3467 11.8904 56.1945 11.6965 56.0363C8.85353 53.7144 8.09969 49.9348 6.59197 42.3758Z`}
      fill={`#3CC7FF`}
      stroke={`#3CC7FF`}
      strokeWidth={`4.1875`}
    />
  </svg>
);
var valueValue12 = () => `ui-cc` + React.useId().replace(/[^a-zA-Z0-9_-]/g, ``);
var Iconv = () => {
  let e = valueValue12();
  return (
    <svg viewBox={`0 0 56.4108 44.8722`} fill={`none`} aria-hidden={`true`}>
      <path
        d={`M44.2255 5.76727H56.4051V41.0239C56.4051 43.148 54.683 44.8701 52.5589 44.8701H46.1486C45.8961 44.8701 45.646 44.8204 45.4127 44.7237C45.1794 44.6271 44.9674 44.4854 44.7888 44.3069C44.6102 44.1283 44.4686 43.9163 44.3719 43.683C44.2753 43.4497 44.2255 43.1996 44.2255 42.947V5.76727Z`}
        fill={`url(#${e}-0)`}
      />
      <path
        d={`M12.1796 5.76727H0V41.0239C0 43.148 1.72213 44.8701 3.84618 44.8701H10.2565C10.509 44.8701 10.7591 44.8204 10.9924 44.7237C11.2257 44.6271 11.4377 44.4854 11.6163 44.3069C11.7949 44.1283 11.9365 43.9163 12.0332 43.683C12.1298 43.4497 12.1796 43.1996 12.1796 42.947V5.76727Z`}
        fill={`#FC413D`}
      />
      <path
        d={`M10.0085 1.42778C7.43377 -0.736342 3.5924 -0.403647 1.42828 2.17105C-0.735843 4.74543 -0.403148 8.58681 2.17155 10.7512L26.5557 31.2479C27.0178 31.6362 27.602 31.8492 28.2056 31.8492C28.8091 31.8492 29.3934 31.6362 29.8554 31.2479L54.2396 10.7509C56.814 8.58681 57.1467 4.74543 54.9825 2.17073C52.8184 -0.403648 48.977 -0.736342 46.4027 1.42778L28.2054 16.724L10.0085 1.42778Z`}
        fill={`url(#${e}-1)`}
      />
      <defs>
        <linearGradient
          id={`${e}-0`}
          x1={`50.3153`}
          y1={`5.76727`}
          x2={`50.3153`}
          y2={`44.8701`}
          gradientUnits={`userSpaceOnUse`}
        >
          <stop stopColor={`#60D673`} />
          <stop offset={`0.17`} stopColor={`#42C868`} />
          <stop offset={`0.39`} stopColor={`#0EBC5F`} />
          <stop offset={`0.62`} stopColor={`#00A9BB`} />
          <stop offset={`0.86`} stopColor={`#3C90FF`} />
          <stop offset={`1`} stopColor={`#3186FF`} />
        </linearGradient>
        <linearGradient
          id={`${e}-1`}
          x1={`6.04194e-05`}
          y1={`6.45153`}
          x2={`56.4107`}
          y2={`6.45153`}
          gradientUnits={`userSpaceOnUse`}
        >
          <stop offset={`0.08`} stopColor={`#FF63A0`} />
          <stop offset={`0.3`} stopColor={`#FC413D`} />
          <stop offset={`0.5`} stopColor={`#FC413D`} />
          <stop offset={`0.65`} stopColor={`#FC413D`} />
          <stop offset={`0.72`} stopColor={`#FC5C30`} />
          <stop offset={`0.86`} stopColor={`#FEB10C`} />
          <stop offset={`0.91`} stopColor={`#FEC700`} />
          <stop offset={`0.96`} stopColor={`#FFDB0F`} />
        </linearGradient>
      </defs>
    </svg>
  );
};
var Icony = () => (
  <svg viewBox={`0 0 49.883 49.877`} fill={`none`} aria-hidden={`true`}>
    <g transform={`translate(0 0)`}>
      <path
        d={`M18.3549 10.4784C15.4713 10.4784 13.1157 8.12279 13.1157 5.2392C13.1157 2.35561 15.4713 0 18.3549 0C21.2385 0 23.5941 2.35561 23.5941 5.2392V10.4784H18.3549Z`}
        fill={`#36C5F0`}
      />
      <path
        d={`M18.3575 13.12C21.2411 13.12 23.5967 15.4756 23.5967 18.3592C23.5967 21.2428 21.2411 23.5984 18.3575 23.5984H5.2392C2.35561 23.5984 0 21.2428 0 18.3592C0 15.4756 2.35561 13.12 5.2392 13.12H18.3575Z`}
        fill={`#36C5F0`}
      />
    </g>
    <g transform={`translate(26.28 0)`}>
      <path
        d={`M13.1244 18.3592C13.1244 15.4756 15.48 13.12 18.3636 13.12C21.2472 13.12 23.6028 15.4756 23.6028 18.3592C23.6028 21.2428 21.2472 23.5984 18.3636 23.5984H13.1244V18.3592Z`}
        fill={`#2EB67D`}
      />
      <path
        d={`M10.4785 18.3575C10.4785 21.2411 8.12286 23.5967 5.23927 23.5967C2.35568 23.5967 7.4362e-05 21.2411 7.4362e-05 18.3575V5.2392C7.4362e-05 2.35561 2.35568 0 5.23927 0C8.12286 0 10.4785 2.35561 10.4785 5.2392V18.3575Z`}
        fill={`#2EB67D`}
      />
    </g>
    <g transform={`translate(0 26.28)`}>
      <path
        d={`M10.4784 5.2392C10.4784 8.12279 8.12279 10.4784 5.2392 10.4784C2.35561 10.4784 0 8.12279 0 5.2392C0 2.35561 2.35561 0 5.2392 0H10.4784V5.2392Z`}
        fill={`#E01E5A`}
      />
      <path
        d={`M13.1157 5.2392C13.1157 2.35561 15.4713 0 18.3549 0C21.2385 0 23.5941 2.35561 23.5941 5.2392V18.3575C23.5941 21.2411 21.2385 23.5967 18.3549 23.5967C15.4713 23.5967 13.1157 21.2411 13.1157 18.3575V5.2392Z`}
        fill={`#E01E5A`}
      />
    </g>
    <g transform={`translate(26.28 26.28)`}>
      <path
        d={`M5.23927 13.1157C8.12286 13.1157 10.4785 15.4713 10.4785 18.3549C10.4785 21.2385 8.12286 23.5941 5.23927 23.5941C2.35568 23.5941 7.4362e-05 21.2385 7.4362e-05 18.3549V13.1157H5.23927Z`}
        fill={`#ECB22E`}
      />
      <path
        d={`M5.23927 10.4784C2.35568 10.4784 7.4362e-05 8.12279 7.4362e-05 5.2392C7.4362e-05 2.35561 2.35568 0 5.23927 0H18.3576C21.2412 0 23.5968 2.35561 23.5968 5.2392C23.5968 8.12279 21.2412 10.4784 18.3576 10.4784H5.23927Z`}
        fill={`#ECB22E`}
      />
    </g>
  </svg>
);
var Iconb = () => {
  let e = valueValue12();
  return (
    <svg viewBox={`0 0 49.7096 59.6884`} fill={`none`} aria-hidden={`true`}>
      <path
        fillRule={`evenodd`}
        clipRule={`evenodd`}
        d={`M0 45.9002L9.1618 38.8247C14.0602 45.1745 19.2307 48.1679 24.9455 48.1679C30.6603 48.1679 35.7401 45.2652 40.3663 38.9154L49.7096 45.8094C42.997 54.8805 34.6516 59.6882 24.9455 59.6882C15.3301 59.6882 6.89403 54.8805 0 45.9002Z`}
        fill={`url(#${e}-0)`}
      />
      <path
        fillRule={`evenodd`}
        clipRule={`evenodd`}
        d={`M24.9535 15.3301L8.62558 29.3903L1.09657 20.5914L25.0442 0L48.8105 20.5914L41.1908 29.2996L24.9535 15.3301Z`}
        fill={`url(#${e}-1)`}
      />
      <defs>
        <linearGradient
          id={`${e}-0`}
          x1={`0`}
          y1={`49.2666`}
          x2={`49.75`}
          y2={`49.2666`}
          gradientUnits={`userSpaceOnUse`}
        >
          <stop stopColor={`#8930FD`} />
          <stop offset={`1`} stopColor={`#49CCF9`} />
        </linearGradient>
        <linearGradient
          id={`${e}-1`}
          x1={`1.09231`}
          y1={`14.6901`}
          x2={`48.7603`}
          y2={`14.6901`}
          gradientUnits={`userSpaceOnUse`}
        >
          <stop stopColor={`#FF02F0`} />
          <stop offset={`1`} stopColor={`#FFC800`} />
        </linearGradient>
      </defs>
    </svg>
  );
};
var valueValue13: React.SVGProps<SVGSVGElement> = {
  fill: `none`,
  stroke: `currentColor`,
  strokeWidth: 1.5,
  strokeLinecap: `round`,
  strokeLinejoin: `round`,
};
var ValueValue = () => (
  <svg viewBox={`0 0 24 24`} {...valueValue13} aria-hidden={`true`}>
    <path
      d={`M15 2L15.5387 4.39157C15.9957 6.42015 17.5798 8.00431 19.6084 8.46127L22 9L19.6084 9.53873C17.5798 9.99569 15.9957 11.5798 15.5387 13.6084L15 16L14.4613 13.6084C14.0043 11.5798 12.4202 9.99569 10.3916 9.53873L8 9L10.3916 8.46127C12.4201 8.00431 14.0043 6.42015 14.4613 4.39158L15 2Z`}
    />
    <path
      d={`M7 12L7.38481 13.7083C7.71121 15.1572 8.84275 16.2888 10.2917 16.6152L12 17L10.2917 17.3848C8.84275 17.7112 7.71121 18.8427 7.38481 20.2917L7 22L6.61519 20.2917C6.28879 18.8427 5.15725 17.7112 3.70827 17.3848L2 17L3.70827 16.6152C5.15725 16.2888 6.28879 15.1573 6.61519 13.7083L7 12Z`}
    />
  </svg>
);
var ValueValue2 = () => (
  <svg viewBox={`0 0 24 24`} {...valueValue13} strokeWidth={1.75} aria-hidden={`true`}>
    <path d={`M5 14L8.5 17.5L19 6.5`} />
  </svg>
);
var Iconw = () => (
  <svg viewBox={`0 0 24 24`} {...valueValue13} color={`#737373`} aria-hidden={`true`}>
    <path d={`M18 6L6.00081 17.9992M17.9992 18L6 6.00085`} />
  </svg>
);
var ValueValue3 = () => (
  <svg viewBox={`0 0 1200 1200`} aria-hidden={`true`}>
    <path
      fill={`#D97757`}
      d={`M 233.959793 800.214905 L 468.644287 668.536987 L 472.590637 657.100647 L 468.644287 650.738403 L 457.208069 650.738403 L 417.986633 648.322144 L 283.892639 644.69812 L 167.597321 639.865845 L 54.926208 633.825623 L 26.577238 627.785339 L 3.3e-05 592.751709 L 2.73832 575.27533 L 26.577238 559.248352 L 60.724873 562.228149 L 136.187973 567.382629 L 249.422867 575.194763 L 331.570496 580.026978 L 453.261841 592.671082 L 472.590637 592.671082 L 475.328857 584.859009 L 468.724915 580.026978 L 463.570557 575.194763 L 346.389313 495.785217 L 219.543671 411.865906 L 153.100723 363.543762 L 117.181267 339.060425 L 99.060455 316.107361 L 91.248367 266.01355 L 123.865784 230.093994 L 167.677887 233.073853 L 178.872513 236.053772 L 223.248367 270.201477 L 318.040283 343.570496 L 441.825592 434.738342 L 459.946411 449.798706 L 467.194672 444.64447 L 468.080597 441.020203 L 459.946411 427.409485 L 392.617493 305.718323 L 320.778564 181.932983 L 288.80542 130.630859 L 280.348999 99.865845 C 277.369171 87.221436 275.194641 76.590698 275.194641 63.624268 L 312.322174 13.20813 L 332.8591 6.604126 L 382.389313 13.20813 L 403.248352 31.328979 L 434.013519 101.71814 L 483.865753 212.537048 L 561.181274 363.221497 L 583.812134 407.919434 L 595.892639 449.315491 L 600.40271 461.959839 L 608.214783 461.959839 L 608.214783 454.711609 L 614.577271 369.825623 L 626.335632 265.61084 L 637.771851 131.516846 L 641.718201 93.745117 L 660.402832 48.483276 L 697.530334 24.000122 L 726.52356 37.852417 L 750.362549 72 L 747.060486 94.067139 L 732.886047 186.201416 L 705.100708 330.52356 L 686.979919 427.167847 L 697.530334 427.167847 L 709.61084 415.087341 L 758.496704 350.174561 L 840.644348 247.490051 L 876.885925 206.738342 L 919.167847 161.71814 L 946.308838 140.29541 L 997.61084 140.29541 L 1035.38269 196.429626 L 1018.469849 254.416199 L 965.637634 321.422852 L 921.825562 378.201538 L 859.006714 462.765259 L 819.785278 530.41626 L 823.409424 535.812073 L 832.75177 534.92627 L 974.657776 504.724915 L 1051.328979 490.872559 L 1142.818848 475.167786 L 1184.214844 494.496582 L 1188.724854 514.147644 L 1172.456421 554.335693 L 1074.604126 578.496765 L 959.838989 601.449829 L 788.939636 641.879272 L 786.845764 643.409485 L 789.261841 646.389343 L 866.255127 653.637634 L 899.194702 655.409424 L 979.812134 655.409424 L 1129.932861 666.604187 L 1169.154419 692.537109 L 1192.671265 724.268677 L 1188.724854 748.429688 L 1128.322144 779.194641 L 1046.818848 759.865845 L 856.590759 714.604126 L 791.355774 698.335754 L 782.335693 698.335754 L 782.335693 703.731567 L 836.69812 756.885986 L 936.322205 846.845581 L 1061.073975 962.81897 L 1067.436279 991.490112 L 1051.409424 1014.120911 L 1034.496704 1011.704712 L 924.885986 929.234924 L 882.604126 892.107544 L 786.845764 811.48999 L 780.483276 811.48999 L 780.483276 819.946289 L 802.550415 852.241699 L 919.087341 1027.409424 L 925.127625 1081.127686 L 916.671204 1098.604126 L 886.469849 1109.154419 L 853.288696 1103.114136 L 785.073914 1007.355835 L 714.684631 899.516785 L 657.906067 802.872498 L 650.979858 806.81897 L 617.476624 1167.704834 L 601.771851 1186.147705 L 565.530212 1200 L 535.328857 1177.046997 L 519.302124 1139.919556 L 535.328857 1066.550537 L 554.657776 970.792053 L 570.362488 894.68457 L 584.536926 800.134277 L 592.993347 768.724976 L 592.429626 766.630859 L 585.503479 767.516968 L 514.22821 865.369263 L 405.825531 1011.865906 L 320.053711 1103.677979 L 299.516815 1111.812256 L 263.919525 1093.369263 L 267.221497 1060.429688 L 287.114136 1031.114136 L 405.825531 880.107361 L 477.422913 786.52356 L 523.651062 732.483276 L 523.328918 724.671265 L 520.590698 724.671265 L 205.288605 929.395935 L 149.154434 936.644409 L 124.993355 914.01355 L 127.973183 876.885986 L 139.409409 864.80542 L 234.201385 799.570435 L 233.879227 799.8927 Z`}
    />
  </svg>
);
var ValueValue4 = () => (
  <svg viewBox={`0 0 68.614 68.002`} aria-hidden={`true`}>
    <path
      fill={`currentColor`}
      d={`M26.3166 24.7525V18.2923C26.3166 17.7482 26.5208 17.3401 26.9966 17.0684L39.9853 9.5882C41.7533 8.56821 43.8615 8.09244 46.0372 8.09244C54.1973 8.09244 59.3658 14.4167 59.3658 21.1486C59.3658 21.6245 59.3658 22.1686 59.2976 22.7127L45.8331 14.8243C45.0172 14.3486 44.2009 14.3486 43.385 14.8243L26.3166 24.7525ZM56.6454 49.9134V34.4766C56.6454 33.5244 56.2371 32.8444 55.4213 32.3685L38.3529 22.4403L43.9291 19.244C44.405 18.9723 44.8131 18.9723 45.289 19.244L58.2776 26.7242C62.018 28.9005 64.5338 33.5244 64.5338 38.0122C64.5338 43.1802 61.4739 47.9406 56.6454 49.9128V49.9134ZM22.3045 36.3131L16.7284 33.0492C16.2526 32.7775 16.0484 32.3692 16.0484 31.8251V16.8649C16.0484 9.58891 21.6245 4.08038 29.1729 4.08038C32.0293 4.08038 34.6809 5.03262 36.9255 6.7326L23.5292 14.485C22.7134 14.9608 22.3052 15.6408 22.3052 16.5932V36.3137L22.3045 36.3131ZM34.307 43.2491L26.3166 38.7611V29.2412L34.307 24.7532L42.2968 29.2412V38.7611L34.307 43.2491ZM39.4411 63.9219C36.5848 63.9219 33.9333 62.9697 31.6886 61.2699L45.0848 53.5173C45.9007 53.0415 46.3089 52.3615 46.3089 51.4091V31.6886L51.9533 34.9525C52.4291 35.2242 52.6333 35.6324 52.6333 36.1766V51.1369C52.6333 58.4128 46.9889 63.9214 39.4411 63.9214V63.9219ZM23.3245 48.7576L10.3358 41.2775C6.59541 39.1011 4.07967 34.4773 4.07967 29.9894C4.07967 24.7532 7.2078 20.0612 12.0356 18.0889V33.5933C12.0356 34.5455 12.4439 35.2255 13.2597 35.7014L30.2605 45.5613L24.6844 48.7576C24.2086 49.0293 23.8003 49.0293 23.3245 48.7576ZM22.5769 59.9099C14.8926 59.9099 9.24834 54.1297 9.24834 46.9895C9.24834 46.4454 9.31651 45.9013 9.38411 45.3572L22.7804 53.1097C23.5962 53.5856 24.4127 53.5856 25.2284 53.1097L42.2968 43.2498V49.71C42.2968 50.2541 42.0927 50.6622 41.6168 50.9339L28.6283 58.4141C26.8601 59.4341 24.752 59.9099 22.5762 59.9099H22.5769ZM39.4411 68.0017C47.6694 68.0017 54.5372 62.1538 56.1019 54.4013C63.718 52.4291 68.6141 45.2889 68.6141 38.0129C68.6141 33.2526 66.5743 28.6288 62.9021 25.2966C63.2421 23.8685 63.4462 22.4403 63.4462 21.0129C63.4462 11.2887 55.5578 4.01207 46.4454 4.01207C44.6098 4.01207 42.8416 4.28375 41.0735 4.89614C38.0129 1.90392 33.7968 0 29.1729 0C20.9447 0 14.0769 5.84782 12.5122 13.6003C4.89614 15.5725 0 22.7127 0 29.9887C0 34.749 2.03983 39.3728 5.71204 42.705C5.37205 44.1331 5.16797 45.5613 5.16797 46.9889C5.16797 56.713 13.0563 63.9895 22.1686 63.9895C24.0044 63.9895 25.7725 63.7179 27.5407 63.1055C30.6005 66.0977 34.8166 68.0017 39.4411 68.0017Z`}
    />
  </svg>
);
var ValueValue5 = `
/* Chat Composer – authored in design units (--u), so it scales with the composer width */
.ui-chat-composer {
  --ui-cc-tray: #f0f0f0;
  --ui-cc-card: #ffffff;
  --ui-cc-line: #e5e5e5;
  --ui-cc-ink: #171717;
  --ui-cc-ink-muted: #737373;
  --ui-cc-ink-hover: #404040;
  --ui-cc-ink-faint: #a3a3a3;
  --ui-cc-placeholder: #c4c4c4;
  --ui-cc-ink-shine: rgba(255, 255, 255, 0.82);
  --ui-cc-alert: #f44900;
  --ui-cc-alert-wash: rgba(244, 73, 0, 0.1);
  --ui-cc-on-ink: #fff; /* arrow on the send button */
  --ui-cc-menu-fill: #f5f5f5;
  --ui-cc-square-hover: #fafafa;
  --ui-cc-shadow: rgba(0, 0, 0, 0.06);
  --ui-cc-focus: rgba(23, 23, 23, 0.22);
  --ui-cc-hover-filter: brightness(0.6);

  --ui-cc-load: 650ms; /* one shimmer sweep; loading runs two */
  --ui-cc-swap: 620ms; /* gray layer switch; the label fades scale with it */
  --ui-cc-ease-swap: cubic-bezier(0.72, 0, 0.1, 1);
  --ui-cc-ease-out: cubic-bezier(0.22, 1, 0.36, 1);
  --ui-cc-ease-pop: cubic-bezier(0.34, 1.5, 0.64, 1);

  container-type: inline-size;
  position: relative;
  width: 100%;
  max-width: 680px;
}

.ui-chat-composer__body {
  /* 1 unit grows with the width up to 0.27px, so a wider composer keeps compact controls */
  --u: min(calc(100cqw / var(--ui-cc-span, 1900)), 0.27px);
  /* The gray tray frames the white card on every side, like the other components */
  --ui-cc-frame: 20;
  --ui-cc-inset: calc(var(--ui-cc-frame) * var(--u));
  /* The card starts with one text line and grows by one more while typing (set from the script) */
  --ui-cc-card-h: calc(453.576 + var(--ui-cc-grow, 0));
  position: relative;
  /* card + 169 strip + the frame above and below */
  height: calc((var(--ui-cc-card-h) + 169 + 2 * var(--ui-cc-frame)) * var(--u));
  transition: height var(--ui-cc-swap) var(--ui-cc-ease-swap);
  font-family: "Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  font-weight: 400;
  font-synthesis: none;
  color: var(--ui-cc-ink-muted);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-tap-highlight-color: transparent;
}

.ui-chat-composer__body button {
  appearance: none;
  margin: 0;
  padding: 0;
  border: 0;
  background: none;
  font: inherit;
  color: inherit;
  letter-spacing: inherit;
  text-align: left;
  cursor: pointer;
}

.ui-chat-composer__body svg {
  display: block;
  max-width: none;
}

/* ---------- Gray layer ---------- */
.ui-chat-composer__tray {
  position: absolute;
  inset: 0;
  background: var(--ui-cc-tray);
  border-radius: calc(92.758 * var(--u));
}

.ui-chat-composer__row {
  position: absolute;
  /* Shifted by the frame, so the rows keep lining up with the card's content */
  left: calc(84 * var(--u) + var(--ui-cc-inset));
  display: flex;
  align-items: center;
  white-space: nowrap;
}

/* The strip next to the card is 169 units plus the frame, so the rows sit half a frame lower to stay centered */
.ui-chat-composer__project {
  top: calc(50.4 * var(--u) + var(--ui-cc-inset) / 2); /* text optically centered in the strip */
  left: calc(78.5 * var(--u) + var(--ui-cc-inset)); /* the folder glyph has 5.5 units of air on the left */
  height: calc(67 * var(--u));
  gap: calc(26.752 * var(--u));
}

.ui-chat-composer__connect {
  top: calc((var(--ui-cc-card-h) + 50.4) * var(--u) + var(--ui-cc-inset) * 1.5);
  transition: top var(--ui-cc-swap) var(--ui-cc-ease-swap);
  height: calc(68.155 * var(--u));
  gap: calc(27.213 * var(--u));
  border-radius: calc(24 * var(--u));
}

.ui-chat-composer__label {
  position: relative;
  display: block;
  font-size: calc(60.453 * var(--u));
  line-height: calc(60.453 * var(--u));
  letter-spacing: calc(-0.5634 * var(--u));
  transition: color 160ms ease;
}

.ui-chat-composer__project .ui-chat-composer__label {
  font-size: calc(59.428 * var(--u));
  line-height: calc(59.428 * var(--u));
  letter-spacing: calc(-0.5539 * var(--u));
}

.ui-chat-composer__icon {
  position: relative;
  flex: none;
  width: calc(68.155 * var(--u));
  height: calc(68.155 * var(--u));
}

.ui-chat-composer__icon--folder {
  width: calc(67 * var(--u));
  height: calc(67 * var(--u));
}

.ui-chat-composer__icon--chevron {
  width: calc(52 * var(--u));
  height: calc(52 * var(--u));
}

.ui-chat-composer__icon > svg,
.ui-chat-composer__logo > svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

/* Line icons draw with currentColor */
.ui-chat-composer__icon > svg {
  color: var(--ui-cc-ink-muted);
}

.ui-chat-composer__logos {
  display: flex;
  align-items: center;
  gap: calc(27.213 * var(--u));
  height: calc(59.688 * var(--u));
}

.ui-chat-composer__logo {
  position: relative;
  flex: none;
}

.ui-chat-composer__logo--gmail {
  width: calc(56.411 * var(--u));
  height: calc(44.872 * var(--u));
}

.ui-chat-composer__logo--slack {
  width: calc(49.883 * var(--u));
  height: calc(49.877 * var(--u));
}

.ui-chat-composer__logo--clickup {
  width: calc(49.71 * var(--u));
  height: calc(59.688 * var(--u));
}


/* ---------- White text area ---------- */
.ui-chat-composer__card {
  position: absolute;
  left: var(--ui-cc-inset);
  top: var(--ui-cc-inset);
  box-sizing: border-box;
  width: calc(100% - 2 * var(--ui-cc-inset));
  height: calc(var(--ui-cc-card-h) * var(--u));
  background: var(--ui-cc-card);
  border: calc(4 * var(--u)) solid var(--ui-cc-line);
  border-radius: calc(66 * var(--u));
  box-shadow: 0 calc(3.092 * var(--u)) calc(6.184 * var(--u)) var(--ui-cc-shadow);
  overflow: clip;
  cursor: text;
  transition:
    transform var(--ui-cc-swap) var(--ui-cc-ease-swap),
    height var(--ui-cc-swap) var(--ui-cc-ease-swap);
}

.ui-chat-composer__message {
  position: absolute;
  left: calc(66 * var(--u)) /* text starts 73 units from the card edge, like the reference */;
  right: calc(69 * var(--u));
  top: calc(83.2 * var(--u)); /* cap height sits 113 units below the card edge */
  box-sizing: border-box;
  height: calc((106.424 + var(--ui-cc-grow, 0)) * var(--u));
  transition: height var(--ui-cc-swap) var(--ui-cc-ease-swap);
  margin: 0;
  padding: 0;
  border: 0;
  outline: 0;
  background: transparent;
  resize: none;
  overflow-y: auto;
  scrollbar-width: none;
  font: inherit;
  font-size: calc(73.396 * var(--u));
  line-height: calc(106.424 * var(--u));
  letter-spacing: calc(-1.4679 * var(--u));
  color: var(--ui-cc-ink);
  caret-color: var(--ui-cc-ink);
}
.ui-chat-composer__message:focus-visible {
  outline: none;
}
.ui-chat-composer__message::-webkit-scrollbar {
  display: none;
}
.ui-chat-composer__message::placeholder {
  color: var(--ui-cc-placeholder);
  opacity: 1;
}

.ui-chat-composer__toolbar {
  position: absolute;
  left: calc(95.2 * var(--u)); /* bottom row centers sit 133 units from the edges */
  top: calc((282.476 + var(--ui-cc-grow, 0)) * var(--u));
  height: calc(68.155 * var(--u));
  display: flex;
  align-items: center;
  gap: calc(46.678 * var(--u));
  transform-origin: 0 50%;
  transition:
    transform var(--ui-cc-swap) var(--ui-cc-ease-swap),
    top var(--ui-cc-swap) var(--ui-cc-ease-swap);
}

/* Right side: model picker, voice and send */
.ui-chat-composer__toolbar--end {
  left: auto;
  right: calc(73 * var(--u));
  gap: calc(40 * var(--u));
  transform-origin: 100% 50%;
}

.ui-chat-composer__icon-btn,
.ui-chat-composer__model {
  display: flex;
  align-items: center;
  border-radius: calc(24 * var(--u));
}

.ui-chat-composer__model {
  gap: calc(10 * var(--u));
  white-space: nowrap;
}

.ui-chat-composer__icon-btn svg,
.ui-chat-composer__model svg {
  transition: filter 160ms ease;
}

.ui-chat-composer__send {
  position: relative;
  flex: none;
  display: grid;
  place-items: center;
  width: calc(112 * var(--u));
  height: calc(112 * var(--u));
  border-radius: 50%;
  background: var(--ui-cc-ink) !important;
  transition:
    opacity 200ms ease-out,
    transform 200ms var(--ui-cc-ease-out);
}
.ui-chat-composer__send svg {
  width: calc(60 * var(--u));
  height: calc(60 * var(--u));
}
.ui-chat-composer__send:disabled {
  opacity: 0.18;
  cursor: default;
}
.ui-chat-composer__send:not(:disabled):active {
  transform: scale(0.94);
}

.ui-chat-composer__approval {
  position: relative;
  display: flex;
  align-items: center;
  gap: calc(21.783 * var(--u));
  border-radius: calc(33.156 * var(--u));
  white-space: nowrap;
  transition: padding 480ms var(--ui-cc-ease-out);
}

.ui-chat-composer__wash {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: var(--ui-cc-alert-wash);
  opacity: 0;
  transition: opacity 200ms ease-out;
}

.ui-chat-composer__approval .ui-chat-composer__icon > svg {
  transition:
    opacity 200ms ease-out,
    transform 360ms var(--ui-cc-ease-out),
    filter 160ms ease;
}
.ui-chat-composer__hand {
  transform-origin: 50% 90%;
}
.ui-chat-composer__shield {
  opacity: 0;
  transform: scale(0.4);
}

.ui-chat-composer__approval-text {
  position: relative;
  display: grid;
}
.ui-chat-composer__approval-text > span {
  grid-area: 1 / 1;
  font-size: calc(60.453 * var(--u));
  line-height: calc(60.453 * var(--u));
  letter-spacing: calc(-0.5634 * var(--u));
}
.ui-chat-composer__request {
  transition:
    color 160ms ease,
    opacity 200ms ease-out,
    filter 200ms ease-out;
}
.ui-chat-composer__granted {
  color: var(--ui-cc-alert);
  opacity: 0;
  filter: blur(8px);
  transition:
    opacity 200ms ease-out,
    filter 200ms ease-out;
}

/* Loading shimmer: a dark band sweeps once per --load across a copy of the label */
.ui-chat-composer__shimmer {
  position: relative;
}
.ui-chat-composer__shimmer::after {
  content: attr(data-text);
  content: attr(data-text) / "";
  position: absolute;
  inset: 0;
  white-space: nowrap;
  color: transparent;
  background: linear-gradient(90deg, transparent 38%, var(--ui-cc-ink-shine) 50%, transparent 62%) 100% 0 / 300% 100%
    no-repeat;
  -webkit-background-clip: text;
  background-clip: text;
  opacity: 0;
  pointer-events: none;
}

.ui-chat-composer__body button:focus-visible {
  outline: 2px solid var(--ui-cc-focus);
  outline-offset: 3px;
}

/* ---------- States ---------- */

/* Hover, only while actionable */
.ui-chat-composer__body[data-apps="idle"] .ui-chat-composer__connect:hover .ui-chat-composer__label,
.ui-chat-composer__body[data-approval="idle"] .ui-chat-composer__approval:hover .ui-chat-composer__request,
.ui-chat-composer__body[data-apps="done"] .ui-chat-composer__project:hover .ui-chat-composer__label,
.ui-chat-composer__model:hover .ui-chat-composer__label {
  color: var(--ui-cc-ink-hover);
}
.ui-chat-composer__body[data-approval="idle"] .ui-chat-composer__approval:hover .ui-chat-composer__hand,
.ui-chat-composer__icon-btn:hover svg,
.ui-chat-composer__model:hover svg {
  filter: var(--ui-cc-hover-filter);
}

/* Loading */
.ui-chat-composer__body[data-apps="loading"] .ui-chat-composer__connect .ui-chat-composer__shimmer::after,
.ui-chat-composer__body[data-approval="loading"] .ui-chat-composer__request::after {
  opacity: 1;
  animation: ui-chat-composer-sweep var(--ui-cc-load) linear 2 both;
}
.ui-chat-composer__body[data-apps="loading"] .ui-chat-composer__logo {
  animation: ui-chat-composer-hop var(--ui-cc-load) cubic-bezier(0.45, 0, 0.55, 1) 2;
}
.ui-chat-composer__body[data-apps="loading"] .ui-chat-composer__logo--slack {
  animation-delay: 90ms;
}
.ui-chat-composer__body[data-apps="loading"] .ui-chat-composer__logo--clickup {
  animation-delay: 180ms;
}
.ui-chat-composer__body[data-approval="loading"] .ui-chat-composer__hand {
  animation: ui-chat-composer-wave var(--ui-cc-load) ease-in-out 2;
}

@keyframes ui-chat-composer-sweep {
  from {
    background-position: 100% 0;
  }
  to {
    background-position: 0% 0;
  }
}
@keyframes ui-chat-composer-hop {
  0%,
  70%,
  100% {
    transform: translateY(0);
  }
  32% {
    transform: translateY(calc(-13 * var(--u)));
  }
}
@keyframes ui-chat-composer-wave {
  0%,
  76%,
  100% {
    transform: rotate(0deg);
  }
  18% {
    transform: rotate(16deg);
  }
  38% {
    transform: rotate(-10deg);
  }
  58% {
    transform: rotate(7deg);
  }
}

/* Apps connected: the card slides down, the gray layer switches from bottom to top.
   Label timings are fractions of --swap, so the whole switch speeds up or slows down together. */
.ui-chat-composer__connect {
  transition:
    opacity calc(var(--ui-cc-swap) * 0.55) ease-out calc(var(--ui-cc-swap) * 0.38),
    transform calc(var(--ui-cc-swap) * 0.75) var(--ui-cc-ease-out) calc(var(--ui-cc-swap) * 0.33);
}
.ui-chat-composer__project {
  opacity: 0;
  transform: translateY(calc(-18 * var(--u)));
  transition:
    opacity calc(var(--ui-cc-swap) * 0.23) ease-out,
    transform calc(var(--ui-cc-swap) * 0.55) var(--ui-cc-ease-swap);
}
.ui-chat-composer__body[data-apps="done"] .ui-chat-composer__connect {
  opacity: 0;
  transform: translateY(calc(18 * var(--u)));
  pointer-events: none;
  transition:
    opacity calc(var(--ui-cc-swap) / 3) ease-out,
    transform calc(var(--ui-cc-swap) * 2 / 3) var(--ui-cc-ease-swap);
}
.ui-chat-composer__body[data-apps="done"] .ui-chat-composer__project {
  opacity: 1;
  transform: none;
  transition:
    opacity calc(var(--ui-cc-swap) / 2) ease-out calc(var(--ui-cc-swap) * 0.15),
    transform calc(var(--ui-cc-swap) * 0.8) var(--ui-cc-ease-out) calc(var(--ui-cc-swap) * 0.14);
}
.ui-chat-composer__body[data-apps="done"] .ui-chat-composer__card {
  transform: translateY(calc(169 * var(--u)));
}

/* Approval granted: pill "Unrestricted access" */
.ui-chat-composer__body[data-approval="done"] .ui-chat-composer__approval {
  padding: calc(22.104 * var(--u));
  cursor: default;
}
.ui-chat-composer__body[data-approval="done"] .ui-chat-composer__wash {
  opacity: 1;
  transition: opacity 300ms ease-out;
}
.ui-chat-composer__body[data-approval="done"] .ui-chat-composer__hand {
  opacity: 0;
  transform: scale(0.4) rotate(-14deg);
}
.ui-chat-composer__body[data-approval="done"] .ui-chat-composer__shield {
  opacity: 1;
  transform: none;
  transition:
    opacity 220ms ease-out 90ms,
    transform 520ms var(--ui-cc-ease-pop) 90ms;
}
.ui-chat-composer__body[data-approval="done"] .ui-chat-composer__request {
  opacity: 0;
  filter: blur(8px);
}
.ui-chat-composer__body[data-approval="done"] .ui-chat-composer__granted {
  opacity: 1;
  filter: blur(0);
  transition:
    opacity 320ms ease-out 90ms,
    filter 320ms ease-out 90ms;
}

.ui-chat-composer__sr-only {
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

@media (prefers-reduced-motion: reduce) {
  .ui-chat-composer *,
  .ui-chat-composer *::after {
    transition-duration: 1ms !important;
    transition-delay: 0ms !important;
  }
  .ui-chat-composer__logo,
  .ui-chat-composer__hand {
    animation: none !important;
  }
}

/* ---------- Pressed feedback for every button ---------- */
.ui-chat-composer__icon-btn,
.ui-chat-composer__model {
  transition: transform 160ms var(--ui-cc-ease-out);
}
.ui-chat-composer__body[data-apps="done"] .ui-chat-composer__project:active,
.ui-chat-composer__icon-btn:active,
.ui-chat-composer__model:active {
  transform: scale(0.96);
}

/* ---------- Model button ---------- */
.ui-chat-composer__model {
  overflow: clip;
}
.ui-chat-composer__model-face {
  display: inline-flex;
  align-items: center;
}
.ui-chat-composer__model-face[data-morph] {
  animation: ui-chat-composer-model-in 460ms cubic-bezier(0.25, 1, 0.5, 1) both;
}
.ui-chat-composer__model-face[data-morph] .ui-chat-composer__model-logo {
  animation: ui-chat-composer-logo-in 520ms cubic-bezier(0.25, 1, 0.5, 1) both;
}
@keyframes ui-chat-composer-model-in {
  from {
    opacity: 0;
    filter: blur(3px);
    transform: translateY(30%);
  }
}
@keyframes ui-chat-composer-logo-in {
  from {
    opacity: 0;
    transform: scale(0.6) rotate(-12deg);
  }
}

.ui-chat-composer__model-logo {
  display: grid;
  place-items: center;
  width: calc(50 * var(--u));
  height: calc(50 * var(--u));
  margin-right: calc(6 * var(--u));
  color: var(--ui-cc-ink);
}
.ui-chat-composer__model-logo svg,
.ui-chat-composer__option-logo svg {
  width: 100%;
  height: 100%;
}
.ui-chat-composer__model[aria-expanded="true"] .ui-chat-composer__label {
  color: var(--ui-cc-ink-hover);
}
.ui-chat-composer__model[aria-expanded="true"] .ui-chat-composer__icon--chevron svg {
  transform: rotate(180deg);
}
.ui-chat-composer__icon--chevron svg {
  transition:
    transform 220ms var(--ui-cc-ease-out),
    filter 160ms ease;
}

/* ---------- Model menu ----------
   Opening morphs the panel out of the corner next to the model button:
   a clip-path grows from a button-sized piece to the full panel. */
.ui-chat-composer__menu {
  --morph: 420ms cubic-bezier(0.32, 0.72, 0, 1);
  position: absolute;
  z-index: 5;
  width: calc(1100 * var(--u));
  /* the shadow sits on the wrapper, so it follows the morphing shape */
  filter: drop-shadow(0 calc(24 * var(--u)) calc(48 * var(--u)) rgba(0, 0, 0, 0.08))
    drop-shadow(0 calc(4 * var(--u)) calc(10 * var(--u)) rgba(0, 0, 0, 0.05));
  transition: visibility 0s linear 0s;
}
.ui-chat-composer__menu[data-open="false"] {
  visibility: hidden;
  pointer-events: none;
  transition: visibility 0s linear 300ms;
}

.ui-chat-composer__menu-panel {
  position: relative;
  box-sizing: border-box;
  padding: calc(20 * var(--u));
  display: flex;
  flex-direction: column;
  background: var(--ui-cc-card);
  border: calc(4 * var(--u)) solid var(--ui-cc-line);
  border-radius: calc(92.758 * var(--u)); /* same as the white card */
  outline: none;
  font-family: inherit;
  clip-path: inset(0 0 0 0 round calc(92.758 * var(--u)));
  transition: clip-path var(--morph);
}
/* Moving the closed shape to the button happens instantly, otherwise the opening would start mid-way */
.ui-chat-composer__menu[data-placing="true"] .ui-chat-composer__menu-panel {
  transition: none !important;
}
.ui-chat-composer__menu[data-open="false"] .ui-chat-composer__menu-panel {
  clip-path: inset(var(--from-top) 0 var(--from-bottom) var(--from-left) round var(--from-radius));
  transition: clip-path 300ms cubic-bezier(0.4, 0, 0.2, 1);
}

/* The rows fade in once the shape has opened up, and out first when closing */
.ui-chat-composer__menu-panel > * {
  transition:
    opacity 220ms ease-out 110ms,
    transform 380ms var(--ui-cc-ease-out) 60ms;
}
.ui-chat-composer__menu[data-open="false"] .ui-chat-composer__menu-panel > * {
  opacity: 0;
  transition: opacity 120ms ease-in;
}
.ui-chat-composer__menu[data-open="false"] .ui-chat-composer__option {
  transform: translateY(calc(12 * var(--u)));
}
.ui-chat-composer__menu[data-open="false"][data-up="false"] .ui-chat-composer__option {
  transform: translateY(calc(-12 * var(--u)));
}

.ui-chat-composer__menu-panel:focus-visible {
  outline: none;
}

.ui-chat-composer__menu-fill {
  position: absolute;
  left: calc(20 * var(--u));
  right: calc(20 * var(--u));
  top: 0;
  border-radius: calc(68.758 * var(--u)); /* 92.758 − 4 border − 20 padding */
  background: var(--ui-cc-menu-fill);
  pointer-events: none;
  transition:
    transform 190ms cubic-bezier(0.25, 1, 0.3, 1),
    height 190ms cubic-bezier(0.25, 1, 0.3, 1),
    opacity 160ms ease-out;
}
.ui-chat-composer__menu-fill[data-glide="false"] {
  transition: opacity 160ms ease-out;
}

.ui-chat-composer__option {
  position: relative;
  display: flex;
  align-items: center;
  gap: calc(34 * var(--u));
  padding: calc(32 * var(--u)) calc(48 * var(--u));
  border-radius: calc(68.758 * var(--u));
  cursor: pointer;
}

.ui-chat-composer__option-logo {
  display: grid;
  place-items: center;
  flex: none;
  width: calc(64 * var(--u));
  height: calc(64 * var(--u));
  color: var(--ui-cc-ink);
}

.ui-chat-composer__option-text {
  display: flex;
  flex-direction: column;
  gap: calc(8 * var(--u));
  min-width: 0;
  flex: 1;
}
.ui-chat-composer__option-name {
  font-size: calc(58 * var(--u));
  line-height: 1.2;
  font-weight: 500;
  letter-spacing: calc(-0.5 * var(--u));
  color: var(--ui-cc-ink);
}
.ui-chat-composer__option-desc {
  font-size: calc(44 * var(--u));
  line-height: 1.25;
  color: var(--ui-cc-ink-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.ui-chat-composer__option-check {
  flex: none;
  width: calc(56 * var(--u));
  height: calc(56 * var(--u));
  color: var(--ui-cc-ink);
  opacity: 0;
  transform: scale(0.6);
  transition:
    opacity 160ms ease-out,
    transform 260ms var(--ui-cc-ease-pop);
}
.ui-chat-composer__option-check svg {
  width: 100%;
  height: 100%;
}
.ui-chat-composer__option[aria-selected="true"] .ui-chat-composer__option-check {
  opacity: 1;
  transform: none;
}

/* ---------- Voice recording ---------- */
.ui-chat-composer__send svg {
  color: var(--ui-cc-on-ink);
}

.ui-chat-composer__toolbar--end {
  transition:
    opacity 220ms ease-out,
    transform 320ms var(--ui-cc-ease-out);
}

/* Heard words: the draft sits exactly on top of the text area */
.ui-chat-composer__draft {
  position: absolute;
  left: calc(66 * var(--u));
  right: calc(69 * var(--u));
  top: calc(83.2 * var(--u));
  height: calc((106.424 + var(--ui-cc-grow, 0)) * var(--u));
  overflow: hidden;
  white-space: pre-wrap;
  overflow-wrap: break-word;
  font-size: calc(73.396 * var(--u));
  line-height: calc(106.424 * var(--u));
  letter-spacing: calc(-1.4679 * var(--u));
  color: var(--ui-cc-ink);
  pointer-events: none;
  visibility: hidden;
}
.ui-chat-composer__heard {
  color: var(--ui-cc-ink-faint);
}
.ui-chat-composer__body[data-recording="true"] .ui-chat-composer__draft {
  visibility: visible;
}
.ui-chat-composer__body[data-recording="true"] .ui-chat-composer__message {
  color: transparent;
  caret-color: transparent;
}
.ui-chat-composer__body[data-recording="true"] .ui-chat-composer__message::placeholder {
  color: transparent;
}

/* Audio trace: silence is a dot, sound a bar – it scrolls in from the right */
.ui-chat-composer__trace {
  display: flex;
  align-items: center;
  gap: calc(14 * var(--u));
  height: calc(68 * var(--u));
  margin-right: calc(10 * var(--u));
}
.ui-chat-composer__trace > span {
  flex: none;
  width: calc(8 * var(--u));
  border-radius: 999px;
  background: var(--ui-cc-ink-hover);
  transition: height 110ms ease-out;
}

/* Discard and confirm: white squares with the card's line, like the send button in size */
.ui-chat-composer__square {
  flex: none;
  display: grid !important;
  place-items: center;
  box-sizing: border-box;
  width: calc(112 * var(--u));
  height: calc(112 * var(--u));
  border: calc(4 * var(--u)) solid var(--ui-cc-line) !important;
  border-radius: calc(32 * var(--u)) !important;
  background: var(--ui-cc-card) !important;
  box-shadow: 0 calc(3.092 * var(--u)) calc(6.184 * var(--u)) var(--ui-cc-shadow);
  color: var(--ui-cc-ink) !important;
  transition:
    background-color 160ms ease,
    transform 160ms var(--ui-cc-ease-out);
}
.ui-chat-composer__square:hover {
  background: var(--ui-cc-square-hover) !important;
}
.ui-chat-composer__square:active {
  transform: scale(0.95);
}
.ui-chat-composer__square svg {
  width: calc(56 * var(--u));
  height: calc(56 * var(--u));
  color: var(--ui-cc-ink);
}

.ui-chat-composer__toolbar--voice {
  gap: calc(24 * var(--u));
  opacity: 0;
  transform: translateY(calc(16 * var(--u)));
  pointer-events: none;
}
.ui-chat-composer__body[data-recording="true"] .ui-chat-composer__toolbar--end:not(.ui-chat-composer__toolbar--voice) {
  opacity: 0;
  transform: translateY(calc(-16 * var(--u)));
  pointer-events: none;
}
.ui-chat-composer__body[data-recording="true"] .ui-chat-composer__toolbar--voice {
  opacity: 1;
  transform: none;
  pointer-events: auto;
}


@media (prefers-reduced-motion: reduce) {
  .ui-chat-composer__model-face[data-morph],
  .ui-chat-composer__model-face[data-morph] .ui-chat-composer__model-logo {
    animation: none;
  }
}


/* Text fields: no focus box while typing – also against global :focus-visible rules of the host page */
.ui-chat-composer input:not([type="checkbox"]):not([type="radio"]):focus-visible,
.ui-chat-composer textarea:focus-visible,
.ui-chat-composer [contenteditable]:focus-visible { outline: none; }
/* Dark mode: follows a .dark class or data-theme="dark" on any ancestor, e.g. <html> */
:where(.dark, [data-theme="dark"]) .ui-chat-composer {
  --ui-cc-tray: #161618;
  /* a hair above #232326, so the card still reads when the composer sits on a dark card surface */
  --ui-cc-card: #262629;
  --ui-cc-line: rgba(255, 255, 255, 0.08);
  --ui-cc-ink: #ededed;
  --ui-cc-ink-muted: #8f8f8f;
  --ui-cc-ink-hover: #c4c4c4;
  --ui-cc-ink-faint: #6b6b70;
  --ui-cc-placeholder: #5f5f64;
  --ui-cc-ink-shine: rgba(255, 255, 255, 0.95);
  --ui-cc-alert: #ff6a2b;
  --ui-cc-alert-wash: rgba(244, 73, 0, 0.16);
  --ui-cc-on-ink: #121213;
  --ui-cc-menu-fill: #313135;
  --ui-cc-square-hover: #2e2e32;
  --ui-cc-shadow: rgba(0, 0, 0, 0.4);
  --ui-cc-focus: rgba(255, 255, 255, 0.3);
  --ui-cc-hover-filter: brightness(1.5);
}
:where(.dark, [data-theme="dark"]) .ui-chat-composer__menu {
  filter: drop-shadow(0 calc(24 * var(--u)) calc(48 * var(--u)) rgba(0, 0, 0, 0.45))
    drop-shadow(0 calc(4 * var(--u)) calc(10 * var(--u)) rgba(0, 0, 0, 0.35));
}
`;
var valueValue = 0;
var valueValue2 = (e: string) => `${e}-${Date.now().toString(36)}-${(valueValue++).toString(36)}`;
async function valueValue3(e: string) {
  let t = e.toLowerCase();
  return (
    await new Promise((e) => setTimeout(e, 900)),
    /email|mail|announce/.test(t)
      ? `Here's a short draft:

Subject: Pricing is live

Hi everyone – our new plans are out today. Individual stays at $199 once, and teams now pay per seat. Existing customers keep their price. Reply here with any questions.`
      : /summar|notes|interview/.test(t)
        ? `Three themes stood out:

1. People compare plans in a table before they read anything else.
2. Seat pricing feels fair once the per-seat price is visible.
3. Two interviewees asked for an annual invoice for their finance team.`
        : /price|pricing|tier/.test(t)
          ? `Keep three tiers. Free for discovery, Individual as a one-time purchase, Team priced per seat. Show the per-seat price right under the total – that's what people check first.`
          : `Good question. I'd start by writing down the outcome you want, then list the two or three steps that get you there. Want me to turn this into a checklist?`
  );
}
function AiWorkspace({
  userName = `Lena`,
  userAvatar: userAvatar,
  workspace = `N`,
  pinned = [`Writing assistant`, `Data analyst`, `Knowledge base`],
  conversations = valueValue4,
  projects = valueValue5,
  respond: respond,
  className: className,
}: AiWorkspaceProps) {
  let [g, _] = React.useState(conversations),
    [v, y] = React.useState(projects),
    [b, x] = React.useState<{ kind: "welcome" | "projects" } | { kind: "chat"; id: string }>({
      kind: `welcome`,
    }),
    [S, C] = React.useState(false),
    [w, T] = React.useState(``),
    [E, D] = React.useState<string | null>(null),
    [O, k] = React.useState<{
      chat: string | undefined;
      msg: string;
      shown: number;
    } | null>(null),
    [A, j] = React.useState<string | null>(null),
    [M, N] = React.useState(false),
    [P, F] = React.useState(``),
    [I, L] = React.useState<string | null>(null),
    [R, z] = React.useState(``),
    [B, V] = React.useState(`recent`),
    [H, U] = React.useState(projects[0]?.id ?? ``),
    W = React.useRef<HTMLDivElement | null>(null),
    G = React.useRef<HTMLDivElement | null>(null),
    K = React.useRef<number | undefined>(void 0);
  (React.useEffect(() => {
    (G.current?.offsetWidth ?? 1e3) <= 720 && C(true);
  }, []),
    React.useEffect(() => () => window.clearInterval(K.current), []),
    React.useEffect(() => {
      if (!A && !M) return;
      let e = (e: PointerEvent) => {
          (e.target as Element).closest(`[data-popover]`) || j(null);
        },
        t = (e: { key: string }) => {
          e.key === `Escape` && (j(null), N(false));
        };
      return (
        window.addEventListener(`pointerdown`, e),
        window.addEventListener(`keydown`, t),
        () => {
          (window.removeEventListener(`pointerdown`, e), window.removeEventListener(`keydown`, t));
        }
      );
    }, [A, M]));
  let q = b.kind === `chat` ? g.find((e) => e.id === b.id) : void 0;
  React.useEffect(() => {
    W.current?.scrollTo({
      top: W.current.scrollHeight,
      behavior: `smooth`,
    });
  }, [q?.messages.length, O?.shown, E]);
  let J = async (e: string) => {
      let t = e.trim();
      if (!t || E) return;
      let n = q?.id,
        r = {
          id: valueValue2(`m`),
          role: `user`,
          text: t,
        };
      if (n)
        _((e) =>
          e.map((e) =>
            e.id === n
              ? {
                  ...e,
                  messages: [...e.messages, r],
                }
              : e,
          ),
        );
      else {
        n = valueValue2(`c`);
        let e = t.length > 38 ? `${t.slice(0, 36)}…` : t;
        (_((t) => [
          {
            id: n!,
            title: e,
            messages: [r],
          },
          ...t,
        ]),
          x({
            kind: `chat`,
            id: n,
          }));
      }
      D(n);
      let i = [...(q?.messages ?? []), r],
        a = await (respond ? respond(t, i) : valueValue3(t)),
        s = valueValue2(`m`);
      (_((e) =>
        e.map((e) =>
          e.id === n
            ? {
                ...e,
                messages: [
                  ...e.messages,
                  {
                    id: s,
                    role: `assistant`,
                    text: a,
                  },
                ],
              }
            : e,
        ),
      ),
        D(null));
      let c = a.split(/(\s+)/).length;
      (k({
        chat: n,
        msg: s,
        shown: 0,
      }),
        window.clearInterval(K.current),
        (K.current = window.setInterval(() => {
          k(
            (e) =>
              e &&
              (e.shown >= c
                ? (window.clearInterval(K.current), null)
                : {
                    ...e,
                    shown: e.shown + 3,
                  }),
          );
        }, 40)));
    },
    Y = w.trim().toLowerCase(),
    X = g.filter((e) => !Y || e.title.toLowerCase().includes(Y)),
    Z = [...pinned, ...v.filter((e) => e.pinned).map((e) => e.name)].filter(
      (e) => !Y || e.toLowerCase().includes(Y),
    ),
    Q = React.useMemo(() => {
      let e = R.trim().toLowerCase();
      return v
        .filter((t) => !e || `${t.name} ${t.description}`.toLowerCase().includes(e))
        .sort((e, t) =>
          B === `name` ? e.name.localeCompare(t.name) : e.updatedDaysAgo - t.updatedDaysAgo,
        );
    }, [v, R, B]),
    ie = v.find((e) => e.id === H),
    ae = b.kind === `projects` ? `All projects` : (q?.title ?? `New chat`),
    $ = () => {
      let e = P.trim();
      if (!e) return;
      let t = {
        id: valueValue2(`p`),
        name: e,
        description: `New project – add files and chats to it`,
        updatedDaysAgo: 0,
      };
      (y((e) => [t, ...e]), F(``), N(false), V(`recent`));
    },
    oe = (e: WorkspaceMessage) =>
      O?.msg === e.id ? e.text.split(/(\s+)/).slice(0, O.shown).join(``) : e.text;
  return (
    <>
      <style href={`ui-ai-workspace`} precedence={`default`}>
        {valueValue7}
      </style>
      <div
        ref={G}
        className={[`ui-aw`, className].filter(Boolean).join(` `)}
        data-collapsed={S || void 0}
      >
        <aside className={`ui-aw__side`} aria-label={`Workspace`} inert={S}>
          <div className={`ui-aw__side-head`}>
            <span className={`ui-aw__ws`}>{workspace}</span>
            <button
              type={`button`}
              className={`ui-aw__icon`}
              aria-label={`Collapse sidebar`}
              onClick={() => C(true)}
            >
              <Iconu name={`chevronLeft`} />
            </button>
          </div>
          <label className={`ui-aw__search`}>
            <Iconu name={`search`} size={15} />
            <input
              type={`search`}
              value={w}
              onChange={(e) => T(e.target.value)}
              placeholder={`Search chats…`}
              aria-label={`Search chats`}
            />
          </label>
          <nav className={`ui-aw__nav`}>
            <button
              type={`button`}
              className={`ui-aw__item`}
              aria-current={b.kind === `welcome` || void 0}
              onClick={() =>
                x({
                  kind: `welcome`,
                })
              }
            >
              <Iconu name={`plus`} />
              {`New chat`}
            </button>
            <button
              type={`button`}
              className={`ui-aw__item`}
              aria-current={b.kind === `projects` || void 0}
              onClick={() =>
                x({
                  kind: `projects`,
                })
              }
            >
              <Icond />
              {`Projects`}
            </button>
          </nav>
          {Z.length > 0 && (
            <>
              <p className={`ui-aw__group`}>{`Pinned`}</p>
              <div className={`ui-aw__nav`}>
                {Z.map((e) => (
                  <button
                    type={`button`}
                    className={`ui-aw__item`}
                    onClick={() =>
                      x({
                        kind: `welcome`,
                      })
                    }
                    key={e}
                  >
                    <Iconf />
                    <span className={`ui-aw__ellipsis`}>{e}</span>
                  </button>
                ))}
              </div>
            </>
          )}
          <p className={`ui-aw__group`}>{`Recents`}</p>
          <div className={`ui-aw__nav ui-aw__recents`}>
            {X.length === 0 && <p className={`ui-aw__none`}>{`No chats match.`}</p>}
            {X.map((e) => (
              <button
                type={`button`}
                className={`ui-aw__item ui-aw__item--plain`}
                aria-current={(b.kind === `chat` && b.id === e.id) || void 0}
                onClick={() =>
                  x({
                    kind: `chat`,
                    id: e.id,
                  })
                }
                key={e.id}
              >
                <span className={`ui-aw__ellipsis`}>{e.title}</span>
              </button>
            ))}
          </div>
          <div className={`ui-aw__user`}>
            {userAvatar ? (
              <img src={userAvatar} alt={``} width={24} height={24} />
            ) : (
              <span className={`ui-aw__user-dot`}>{userName[0]}</span>
            )}
            <span>{userName}</span>
            <button type={`button`} className={`ui-aw__icon`} aria-label={`Settings`}>
              <Iconu name={`settings`} />
            </button>
          </div>
        </aside>
        <main className={`ui-aw__main`}>
          <header className={`ui-aw__bar`}>
            {S && (
              <button
                type={`button`}
                className={`ui-aw__icon`}
                aria-label={`Open sidebar`}
                onClick={() => C(false)}
              >
                <Iconu name={`panel`} />
              </button>
            )}
            <div className={`ui-aw__crumbs`} data-popover={true}>
              <button
                type={`button`}
                className={`ui-aw__crumb-btn`}
                aria-haspopup={`menu`}
                aria-expanded={A === `project`}
                onClick={() => j(A === `project` ? null : `project`)}
              >
                <span className={`ui-aw__muted`}>{ie?.name ?? `Workspace`}</span>
                <span className={`ui-aw__slash`}>{`/`}</span>
                <span className={`ui-aw__ellipsis`}>{ae}</span>
                <Iconu name={`chevronDown`} size={14} />
              </button>
              {A === `project` && (
                <div className={`ui-aw__menu`} role={`menu`}>
                  <p className={`ui-aw__menu-title`}>{`Switch project`}</p>
                  {v.slice(0, 6).map((e) => (
                    <button
                      type={`button`}
                      role={`menuitemradio`}
                      aria-checked={e.id === H}
                      className={`ui-aw__menu-item`}
                      onClick={() => {
                        (U(e.id), j(null));
                      }}
                      key={e.id}
                    >
                      {e.name}
                      {e.id === H && <Iconu name={`check`} size={14} />}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className={`ui-aw__more`} data-popover={true}>
              <button
                type={`button`}
                className={`ui-aw__icon`}
                aria-label={`More`}
                aria-haspopup={`menu`}
                aria-expanded={A === `more`}
                onClick={() => j(A === `more` ? null : `more`)}
              >
                <Iconu name={`moreH`} />
              </button>
              {A === `more` && (
                <div className={`ui-aw__menu ui-aw__menu--right`} role={`menu`}>
                  <button
                    type={`button`}
                    role={`menuitem`}
                    className={`ui-aw__menu-item`}
                    onClick={() => j(null)}
                  >{`Share chat`}</button>
                  <button
                    type={`button`}
                    role={`menuitem`}
                    className={`ui-aw__menu-item ui-aw__danger`}
                    disabled={!q}
                    onClick={() => {
                      (q && _((e) => e.filter((e) => e.id !== q.id)),
                        x({
                          kind: `welcome`,
                        }),
                        j(null));
                    }}
                  >{`Delete chat`}</button>
                </div>
              )}
            </div>
          </header>
          {b.kind === `welcome` && (
            <section className={`ui-aw__welcome`} key={`welcome`}>
              <h2 className={`ui-aw__hello`}>
                {`Hello `}
                {userName}
              </h2>
              <p className={`ui-aw__sub`}>{`What can I help you with today?`}</p>
              <div className={`ui-aw__composer`}>
                <ChatComposerComponent
                  placeholder={`How can I help you today?`}
                  onSend={(e: string) => J(e)}
                />
              </div>
              <div className={`ui-aw__starters`}>
                {[
                  `Summarize my interview notes`,
                  `Draft the pricing announcement email`,
                  `Compare our pricing tiers`,
                ].map((e) => (
                  <button type={`button`} className={`ui-aw__starter`} onClick={() => J(e)} key={e}>
                    {e}
                  </button>
                ))}
              </div>
              <p
                className={`ui-aw__disclaimer`}
              >{`AI can make mistakes – please double-check important answers.`}</p>
            </section>
          )}
          {b.kind === `chat` && q && (
            <section className={`ui-aw__chat`} key={q.id}>
              <div className={`ui-aw__messages`} ref={W} aria-live={`polite`}>
                {q.messages.map((e) =>
                  e.role === `user` ? (
                    <div className={`ui-aw__msg ui-aw__msg--user`} key={e.id}>
                      <p>{e.text}</p>
                    </div>
                  ) : (
                    <div className={`ui-aw__msg ui-aw__msg--ai`} key={e.id}>
                      <span className={`ui-aw__mark`} aria-hidden={`true`} />
                      <div className={`ui-aw__ai-body`}>
                        <p>{oe(e)}</p>
                        {O?.msg !== e.id && (
                          <Iconc
                            text={e.text}
                            onRetry={() =>
                              J(q.messages.filter((e) => e.role === `user`).at(-1)?.text ?? ``)
                            }
                          />
                        )}
                      </div>
                    </div>
                  ),
                )}
                {E === q.id && (
                  <div className={`ui-aw__msg ui-aw__msg--ai`}>
                    <span className={`ui-aw__mark ui-aw__mark--busy`} aria-hidden={`true`} />
                    <p className={`ui-aw__thinking`}>{`Thinking…`}</p>
                  </div>
                )}
              </div>
              <div className={`ui-aw__composer ui-aw__composer--dock`}>
                <ChatComposerComponent placeholder={`Reply…`} onSend={(e: string) => J(e)} />
                <p
                  className={`ui-aw__disclaimer`}
                >{`AI can make mistakes – please double-check important answers.`}</p>
              </div>
            </section>
          )}
          {b.kind === `projects` && (
            <section className={`ui-aw__projects`} key={`projects`}>
              <div className={`ui-aw__projects-head`}>
                <span className={`ui-aw__tile`}>
                  <Icond />
                </span>
                <div>
                  <h2 className={`ui-aw__title`}>{`Projects`}</h2>
                  <p
                    className={`ui-aw__sub ui-aw__sub--left`}
                  >{`Keep chats, files and notes for each piece of work together.`}</p>
                </div>
                <button type={`button`} className={`ui-aw__primary`} onClick={() => N(true)}>
                  <Iconu name={`plus`} size={14} />
                  {`Create project`}
                </button>
              </div>
              <label className={`ui-aw__search ui-aw__search--wide`}>
                <Iconu name={`search`} size={15} />
                <input
                  type={`search`}
                  value={R}
                  onChange={(e) => z(e.target.value)}
                  placeholder={`Search projects…`}
                  aria-label={`Search projects`}
                />
              </label>
              <div className={`ui-aw__list-head`}>
                <span>
                  {`All projects (`}
                  {Q.length}
                  {`)`}
                </span>
                <div className={`ui-aw__sort`} data-popover={true}>
                  <button
                    type={`button`}
                    className={`ui-aw__sort-btn`}
                    aria-haspopup={`menu`}
                    aria-expanded={A === `sort`}
                    onClick={() => j(A === `sort` ? null : `sort`)}
                  >
                    {`Sort by `}
                    <strong>{B === `recent` ? `Recent activity` : `Name`}</strong>
                    <Iconu name={`chevronDown`} size={14} />
                  </button>
                  {A === `sort` && (
                    <div className={`ui-aw__menu ui-aw__menu--right`} role={`menu`}>
                      {[`recent`, `name`].map((e) => (
                        <button
                          type={`button`}
                          role={`menuitemradio`}
                          aria-checked={B === e}
                          className={`ui-aw__menu-item`}
                          onClick={() => {
                            (V(e), j(null));
                          }}
                          key={e}
                        >
                          {e === `recent` ? `Recent activity` : `Name`}
                          {B === e && <Iconu name={`check`} size={14} />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <ul className={`ui-aw__grid`}>
                {Q.map((e) => (
                  <li className={`ui-aw__project`} key={e.id}>
                    <div className={`ui-aw__project-card`}>
                      <div className={`ui-aw__project-top`}>
                        <Icond />
                        {I === e.id ? (
                          <input
                            className={`ui-aw__rename`}
                            autoFocus={true}
                            defaultValue={e.name}
                            aria-label={`Project name`}
                            onBlur={(t) => {
                              let n = t.target.value.trim();
                              (n &&
                                y((t) =>
                                  t.map((t) =>
                                    t.id === e.id
                                      ? {
                                          ...t,
                                          name: n,
                                        }
                                      : t,
                                  ),
                                ),
                                L(null));
                            }}
                            onKeyDown={(e) => {
                              (e.key === `Enter` && e.currentTarget.blur(),
                                e.key === `Escape` && L(null));
                            }}
                          />
                        ) : (
                          <span className={`ui-aw__project-name`}>{e.name}</span>
                        )}
                        {e.pinned && (
                          <span className={`ui-aw__pinned`}>
                            <Iconf />
                          </span>
                        )}
                        <div className={`ui-aw__card-menu`} data-popover={true}>
                          <button
                            type={`button`}
                            className={`ui-aw__icon ui-aw__dots`}
                            aria-label={`${e.name} options`}
                            aria-haspopup={`menu`}
                            aria-expanded={A === e.id}
                            onClick={() => j(A === e.id ? null : e.id)}
                          >
                            <Iconu name={`moreV`} />
                          </button>
                          {A === e.id && (
                            <div className={`ui-aw__menu ui-aw__menu--right`} role={`menu`}>
                              <button
                                type={`button`}
                                role={`menuitem`}
                                className={`ui-aw__menu-item`}
                                onClick={() => {
                                  (L(e.id), j(null));
                                }}
                              >
                                <Iconu name={`pencil`} size={14} />
                                {`Rename`}
                              </button>
                              <button
                                type={`button`}
                                role={`menuitem`}
                                className={`ui-aw__menu-item`}
                                onClick={() => {
                                  (y((t) =>
                                    t.map((t) =>
                                      t.id === e.id
                                        ? {
                                            ...t,
                                            pinned: !t.pinned,
                                          }
                                        : t,
                                    ),
                                  ),
                                    j(null));
                                }}
                              >
                                <Iconf />
                                {e.pinned ? `Unpin` : `Pin`}
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                      <p className={`ui-aw__project-desc`}>{e.description}</p>
                    </div>
                    <p className={`ui-aw__project-foot`}>
                      {e.updatedDaysAgo === 0
                        ? `Updated just now`
                        : `Updated ${e.updatedDaysAgo} day${e.updatedDaysAgo === 1 ? `` : `s`} ago`}
                    </p>
                  </li>
                ))}
              </ul>
              {Q.length === 0 && (
                <p
                  className={`ui-aw__none ui-aw__none--center`}
                >{`No projects match your search.`}</p>
              )}
            </section>
          )}
          <div
            className={`ui-aw__backdrop`}
            data-open={M || void 0}
            onClick={() => N(false)}
            aria-hidden={`true`}
          />
          <div
            className={`ui-aw__dialog`}
            data-open={M || void 0}
            role={`dialog`}
            aria-modal={`true`}
            aria-labelledby={`ui-aw-create`}
            inert={!M}
          >
            <div className={`ui-aw__dialog-card`}>
              <h3 id={`ui-aw-create`} className={`ui-aw__dialog-title`}>{`Create project`}</h3>
              <input
                className={`ui-aw__field`}
                value={P}
                onChange={(e) => F(e.target.value)}
                onKeyDown={(e) => e.key === `Enter` && $()}
                placeholder={`Project name`}
                aria-label={`Project name`}
                autoFocus={M}
              />
            </div>
            <div className={`ui-aw__dialog-foot`}>
              <button
                type={`button`}
                className={`ui-aw__btn`}
                onClick={() => N(false)}
              >{`Cancel`}</button>
              <button
                type={`button`}
                className={`ui-aw__primary`}
                disabled={!P.trim()}
                onClick={$}
              >{`Create`}</button>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
function Iconc({ text: text, onRetry: onRetry }: { text: string; onRetry: () => void }) {
  let [n, a] = React.useState(false);
  return (
    <div className={`ui-aw__actions`}>
      <button
        type={`button`}
        className={`ui-aw__icon`}
        aria-label={`Copy answer`}
        onClick={async () => {
          try {
            (await navigator.clipboard.writeText(text), a(true), setTimeout(() => a(false), 1400));
          } catch {}
        }}
      >
        <Iconu name={n ? `check` : `copy`} size={15} />
      </button>
      <button type={`button`} className={`ui-aw__icon`} aria-label={`Ask again`} onClick={onRetry}>
        <Iconu name={`retry`} size={15} />
      </button>
    </div>
  );
}
var valueValue4 = [
  {
    id: `c1`,
    title: `Summarize interview notes`,
    messages: [
      {
        id: `m1`,
        role: `user`,
        text: `Summarize the notes from this week's customer interviews.`,
      },
      {
        id: `m2`,
        role: `assistant`,
        text: `Three themes stood out:

1. People compare plans in a table before they read anything else.
2. Seat pricing feels fair once the per-seat price is visible.
3. Two interviewees asked for an annual invoice for their finance team.`,
      },
    ],
  },
  {
    id: `c2`,
    title: `Draft launch email`,
    messages: [
      {
        id: `m3`,
        role: `user`,
        text: `Draft a launch email for the new pricing.`,
      },
      {
        id: `m4`,
        role: `assistant`,
        text: `Subject: Pricing is live

Hi everyone – our new plans are out today. Existing customers keep their price.`,
      },
    ],
  },
  {
    id: `c3`,
    title: `Rewrite onboarding copy`,
    messages: [
      {
        id: `m5`,
        role: `user`,
        text: `Make the onboarding copy shorter.`,
      },
      {
        id: `m6`,
        role: `assistant`,
        text: `Here's a tighter version: “Create your first project – it takes a minute.”`,
      },
    ],
  },
  {
    id: `c4`,
    title: `Plan sprint goals`,
    messages: [
      {
        id: `m7`,
        role: `user`,
        text: `Help me plan goals for the next sprint.`,
      },
      {
        id: `m8`,
        role: `assistant`,
        text: `Pick one outcome per team and two stretch goals. Want a template?`,
      },
    ],
  },
];
var valueValue5 = [
  {
    id: `p1`,
    name: `Brand Refresh`,
    description: `Logo, colors and type for the new identity`,
    updatedDaysAgo: 2,
  },
  {
    id: `p2`,
    name: `Customer Research`,
    description: `Interview notes and survey results`,
    updatedDaysAgo: 5,
  },
  {
    id: `p3`,
    name: `Pricing Page`,
    description: `Plans, copy and the comparison table`,
    updatedDaysAgo: 7,
  },
  {
    id: `p4`,
    name: `Mobile App`,
    description: `Navigation patterns and offline mode`,
    updatedDaysAgo: 10,
  },
  {
    id: `p5`,
    name: `Help Center`,
    description: `Guides, FAQs and release notes`,
    updatedDaysAgo: 12,
  },
  {
    id: `p6`,
    name: `Q4 Planning`,
    description: `Goals, budgets and the launch calendar`,
    updatedDaysAgo: 14,
  },
];
var valueValue6: Record<string, string[]> = {
  plus: [`M12 5v14`, `M5 12h14`],
  search: [`M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14Z`, `m20 20-4-4`],
  chevronLeft: [`m15 18-6-6 6-6`],
  chevronDown: [`m6 9 6 6 6-6`],
  check: [`M20 6 9 17l-5-5`],
  panel: [`M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z`, `M9 3v18`],
  folder: [
    `M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z`,
  ],
  pin: [
    `M12 17v5`,
    `M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1Z`,
  ],
  pencil: [
    `M21.17 6.81a1 1 0 0 0-3.99-3.99L3.84 16.17a2 2 0 0 0-.5.83l-1.32 4.35a.5.5 0 0 0 .62.62l4.35-1.32a2 2 0 0 0 .83-.5Z`,
    `m15 5 4 4`,
  ],
  settings: [
    `M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2Z`,
    `M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z`,
  ],
  moreH: [
    `M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z`,
    `M19 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z`,
    `M5 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z`,
  ],
  moreV: [
    `M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z`,
    `M12 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z`,
    `M12 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z`,
  ],
  copy: [
    `M10 8h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2Z`,
    `M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2`,
  ],
  retry: [`M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8`, `M3 3v5h5`],
};
var Iconu = ({ name: name, size = 16 }: { name: string; size?: number }) => (
  <svg
    viewBox={`0 0 24 24`}
    width={size}
    height={size}
    fill={`none`}
    stroke={`currentColor`}
    strokeWidth={`1.75`}
    strokeLinecap={`round`}
    strokeLinejoin={`round`}
    aria-hidden={`true`}
  >
    {valueValue6[name].map((e: string) => (
      <path d={e} key={e} />
    ))}
  </svg>
);
var Icond = () => <Iconu name={`folder`} />;
var Iconf = () => <Iconu name={`pin`} size={15} />;
var valueValue7 = `
.ui-aw {
  --ui-aw-side: #f5f5f5;
  --ui-aw-card: #ffffff;
  --ui-aw-line: #ececec;
  --ui-aw-ink: #171717;
  --ui-aw-text: #404040;
  --ui-aw-muted: #8f8f8f;
  --ui-aw-accent: #2f6bff;
  --ui-aw-ease: cubic-bezier(0.22, 1, 0.36, 1);
  position: relative;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
  width: 100%;
  height: 640px;
  padding: 8px 8px 8px 0;
  overflow: hidden;
  container-type: inline-size;
  background: var(--ui-aw-side);
  border-radius: 20px;
  box-shadow: 0 0 0 1px #e8e8e8;
  font-family: "Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  color: var(--ui-aw-ink);
  -webkit-font-smoothing: antialiased;
  transition: grid-template-columns 380ms var(--ui-aw-ease), padding 380ms var(--ui-aw-ease);
}
.ui-aw[data-collapsed] { grid-template-columns: 0px minmax(0, 1fr); padding-left: 8px; }
.ui-aw *, .ui-aw *::before, .ui-aw *::after { box-sizing: border-box; }
.ui-aw button { margin: 0; font: inherit; color: inherit; cursor: pointer; }
.ui-aw button:focus-visible, .ui-aw input:focus-visible { outline: 2px solid var(--ui-aw-accent); outline-offset: 2px; }
.ui-aw__ellipsis { overflow: hidden; white-space: nowrap; text-overflow: ellipsis; min-width: 0; }
.ui-aw__muted { color: var(--ui-aw-muted); }

/* Sidebar */
.ui-aw__side {
  display: flex;
  flex-direction: column;
  min-width: 0;
  padding: 6px 8px 4px;
  overflow: hidden;
  transition: opacity 240ms ease;
}
.ui-aw[data-collapsed] .ui-aw__side { opacity: 0; }
.ui-aw__side-head { display: flex; align-items: center; justify-content: space-between; height: 40px; padding: 0 2px 0 6px; }
.ui-aw__ws {
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
  border-radius: 8px;
  background: linear-gradient(#323137, #201e25);
  box-shadow: 0 0 0 1px #0d0d0d, inset 0 1px 0 rgba(255, 255, 255, 0.14);
  font-size: 13px;
  font-weight: 600;
  color: #fff;
}
.ui-aw__icon {
  display: grid;
  place-items: center;
  flex: none;
  width: 28px;
  height: 28px;
  padding: 0;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: var(--ui-aw-muted) !important;
  transition: background-color 140ms ease, color 140ms ease;
}
.ui-aw__icon:hover { background: rgba(0, 0, 0, 0.05); color: var(--ui-aw-ink) !important; }
.ui-aw__search {
  display: flex;
  align-items: center;
  gap: 8px;
  height: 34px;
  margin: 6px 0 8px;
  padding: 0 10px;
  border-radius: 10px;
  background: #ebebeb;
  color: var(--ui-aw-muted);
  transition: box-shadow 160ms ease, background-color 160ms ease;
}
.ui-aw__search:focus-within { background: #fff; box-shadow: 0 0 0 1px var(--ui-aw-accent), 0 0 0 3px rgba(47, 107, 255, 0.12); }
.ui-aw__search input { flex: 1; min-width: 0; border: 0; outline: none; background: transparent; font: inherit; font-size: 13.5px; color: var(--ui-aw-ink); }
.ui-aw__search input:focus-visible { outline: none; }
.ui-aw__search input::-webkit-search-cancel-button { display: none; }
.ui-aw__nav { display: grid; gap: 1px; }
.ui-aw__item {
  display: flex;
  align-items: center;
  gap: 10px;
  height: 32px;
  padding: 0 10px;
  border: 0;
  border-radius: 9px;
  background: transparent;
  font-size: 13.5px !important;
  text-align: left;
  color: var(--ui-aw-text) !important;
  transition: background-color 140ms ease, color 140ms ease;
}
.ui-aw__item svg { flex: none; color: var(--ui-aw-muted); }
.ui-aw__item:hover { background: rgba(0, 0, 0, 0.04); color: var(--ui-aw-ink) !important; }
.ui-aw__item[aria-current] { background: #e9e9e9; color: var(--ui-aw-ink) !important; font-weight: 500; }
.ui-aw__item--plain { padding-left: 10px; }
.ui-aw__group { margin: 16px 10px 4px; font-size: 12px; color: var(--ui-aw-muted); }
.ui-aw__recents { overflow-y: auto; min-height: 0; flex: 1; align-content: start; scrollbar-width: none; }
.ui-aw__none { margin: 4px 10px; font-size: 12.5px; color: var(--ui-aw-muted); }
.ui-aw__none--center { text-align: center; margin-top: 24px; }
.ui-aw__user { display: flex; align-items: center; gap: 10px; height: 44px; padding: 0 2px 0 8px; font-size: 13.5px; }
.ui-aw__user img, .ui-aw__user-dot { width: 24px; height: 24px; border-radius: 50%; object-fit: cover; }
.ui-aw__user-dot { display: grid; place-items: center; background: #eef3ff; font-size: 11px; font-weight: 600; color: var(--ui-aw-accent); }
.ui-aw__user span:not(.ui-aw__user-dot) { flex: 1; }

/* Main panel */
.ui-aw__main {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  background: var(--ui-aw-card);
  border: 1px solid #e5e5e5;
  border-radius: 16px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}
.ui-aw__bar {
  display: flex;
  align-items: center;
  gap: 8px;
  height: 48px;
  padding: 0 10px 0 12px;
  border-bottom: 1px solid var(--ui-aw-line);
}
.ui-aw__crumbs, .ui-aw__more, .ui-aw__sort, .ui-aw__card-menu { position: relative; }
.ui-aw__crumbs { min-width: 0; }
.ui-aw__crumb-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  max-width: 100%;
  height: 30px;
  padding: 0 8px;
  border: 0;
  border-radius: 8px;
  background: transparent;
  font-size: 14px !important;
  font-weight: 500;
}
.ui-aw__crumb-btn:hover { background: #f5f5f5; }
.ui-aw__crumb-btn svg { flex: none; color: var(--ui-aw-muted); }
.ui-aw__slash { color: #c4c4c4; font-weight: 400; }
/* Project and chat name stay on one line each and shorten together when the bar gets narrow */
.ui-aw__crumb-btn > .ui-aw__muted { min-width: 0; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }
.ui-aw__more { margin-left: auto; }

.ui-aw__menu {
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  z-index: 20;
  display: grid;
  gap: 2px;
  min-width: 190px;
  padding: 5px;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 0 0 1px #e5e5e5, 0 12px 30px -8px rgba(0, 0, 0, 0.2);
  animation: ui-aw-drop 180ms var(--ui-aw-ease);
}
.ui-aw__menu--right { left: auto; right: 0; }
.ui-aw__menu-title { margin: 2px 8px 4px; font-size: 11.5px; color: var(--ui-aw-muted); }
.ui-aw__menu-item {
  display: flex;
  align-items: center;
  gap: 8px;
  min-height: 32px;
  padding: 0 10px;
  border: 0;
  border-radius: 8px;
  background: transparent;
  font-size: 13px !important;
  text-align: left;
  white-space: nowrap;
}
.ui-aw__menu-item:hover:not(:disabled) { background: #f5f5f5; }
.ui-aw__menu-item:disabled { opacity: 0.4; cursor: default; }
.ui-aw__menu-item svg:last-child:not(:first-child) { margin-left: auto; color: var(--ui-aw-accent); }
.ui-aw__menu-item[aria-checked="true"] { color: var(--ui-aw-accent) !important; font-weight: 500; }
.ui-aw__danger { color: #e5484d !important; }

/* Welcome */
.ui-aw__welcome {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
  animation: ui-aw-in 420ms var(--ui-aw-ease);
}
.ui-aw__hello { margin: 0; font-size: 28px; font-weight: 600; letter-spacing: -0.02em; }
.ui-aw__sub { margin: 6px 0 0; font-size: 15px; color: var(--ui-aw-muted); text-align: center; }
.ui-aw__sub--left { text-align: left; font-size: 14px; }
.ui-aw__composer { width: min(640px, 100%); margin-top: 26px; }
/* The Chat Composer scales with its width – a larger span makes it wider and smaller,
   so its text lands at about 14–15px like the rest of the workspace */
.ui-aw__composer .ui-chat-composer { --ui-cc-span: 3100; max-width: none; }
.ui-aw__starters { display: flex; flex-wrap: wrap; justify-content: center; gap: 6px; max-width: 640px; margin-top: 14px; }
.ui-aw__starter {
  height: 30px;
  padding: 0 12px;
  border: 0;
  border-radius: 999px;
  background: #fff;
  box-shadow: 0 0 0 1px #e8e8e8;
  font-size: 12.5px !important;
  color: var(--ui-aw-text) !important;
  /* One line, like a chip – a long starter shortens instead of turning into a two-line pill */
  max-width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  transition: background-color 140ms ease, box-shadow 140ms ease;
}
.ui-aw__starter:hover { background: #f7f7f7; box-shadow: 0 0 0 1px #dcdcdc; }
.ui-aw__disclaimer { margin: 14px 0 0; font-size: 11.5px; text-align: center; color: #a3a3a3; }

/* Chat */
.ui-aw__chat { display: flex; flex: 1; flex-direction: column; min-height: 0; animation: ui-aw-in 360ms var(--ui-aw-ease); }
.ui-aw__messages {
  display: grid;
  align-content: start;
  gap: 22px;
  flex: 1;
  min-height: 0;
  padding: 28px max(24px, calc((100% - 620px) / 2)) 16px;
  overflow-y: auto;
  scrollbar-width: thin;
}
.ui-aw__msg { animation: ui-aw-in 320ms var(--ui-aw-ease) both; }
.ui-aw__msg p { margin: 0; white-space: pre-wrap; font-size: 14.5px; line-height: 23px; }
.ui-aw__msg--user { justify-self: end; max-width: 78%; padding: 10px 14px; border-radius: 16px 16px 4px 16px; background: #f3f3f3; }
.ui-aw__msg--ai { display: flex; gap: 12px; color: var(--ui-aw-text); }
.ui-aw__mark {
  flex: none;
  width: 16px;
  height: 16px;
  margin-top: 3.5px;
  border-radius: 50%;
  /* A filled orb: soft light top left, deep blue bottom right */
  background:
    radial-gradient(circle at 30% 26%, rgba(255, 255, 255, 0.85) 0, rgba(255, 255, 255, 0) 42%),
    linear-gradient(140deg, #8ec5ff 0%, #2f6bff 48%, #1e3fd6 100%);
  background-size: 100% 100%, 200% 200%;
  background-position: 0 0, 0% 0%;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.25), 0 1px 3px rgba(47, 107, 255, 0.35);
}
.ui-aw__mark--busy { animation: ui-aw-orb 1.6s ease-in-out infinite; }
.ui-aw__ai-body { min-width: 0; }
.ui-aw__thinking {
  background: linear-gradient(90deg, #a3a3a3 0%, #a3a3a3 35%, rgba(255, 255, 255, 0.9) 50%, #a3a3a3 65%, #a3a3a3 100%);
  background-size: 300% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ui-aw-shine 1.6s linear infinite;
}
.ui-aw__actions { display: flex; gap: 2px; margin: 6px 0 0 -6px; opacity: 0.8; }
.ui-aw__composer--dock { align-self: center; margin: 0; padding: 4px 0 14px; }
.ui-aw__composer--dock .ui-aw__disclaimer { margin-top: 8px; }

/* Projects */
.ui-aw__projects { flex: 1; min-height: 0; padding: 28px max(24px, calc((100% - 640px) / 2)) 24px; overflow-y: auto; animation: ui-aw-in 360ms var(--ui-aw-ease); scrollbar-width: thin; }
.ui-aw__projects-head { display: grid; grid-template-columns: auto 1fr auto; align-items: center; gap: 14px; }
.ui-aw__tile {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 0 0 1px #e5e5e5, 0 1px 2px rgba(0, 0, 0, 0.04);
}
.ui-aw__title { margin: 0; font-size: 22px; font-weight: 600; letter-spacing: -0.02em; }
.ui-aw__primary {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  height: 34px;
  padding: 0 14px;
  border: 0;
  border-radius: 10px;
  background: linear-gradient(#323137, #201e25);
  box-shadow: 0 0 0 1px #0d0d0d, 0 2px 4px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.12);
  font-size: 13px !important;
  font-weight: 500;
  white-space: nowrap;
  color: #fff !important;
}
.ui-aw__primary:hover:not(:disabled) { background: linear-gradient(#3b3a41, #26242b); }
.ui-aw__primary:disabled { opacity: 0.45; cursor: default; }
.ui-aw__search--wide { margin: 22px 0 16px; height: 38px; background: #f5f5f5; }
.ui-aw__list-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; font-size: 13.5px; font-weight: 500; }
.ui-aw__sort-btn { display: inline-flex; align-items: center; gap: 4px; height: 28px; padding: 0 6px; border: 0; border-radius: 8px; background: transparent; font-size: 13px !important; color: var(--ui-aw-muted) !important; }
.ui-aw__sort-btn strong { font-weight: 500; color: var(--ui-aw-ink); }
.ui-aw__sort-btn:hover { background: #f5f5f5; }
.ui-aw__grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; margin: 0; padding: 0; list-style: none; }
/* Project cards: white top on a gray footer – the same tray as our other components */
.ui-aw__project { border-radius: 16px; background: var(--ui-aw-side); animation: ui-aw-in 360ms var(--ui-aw-ease) both; }
.ui-aw__project-card { padding: 14px 14px 14px 16px; border-radius: 16px; background: #fff; box-shadow: 0 0 0 1px #e5e5e5, 0 1px 2px rgba(0, 0, 0, 0.04); }
.ui-aw__project-top { display: flex; align-items: center; gap: 10px; min-height: 28px; }
.ui-aw__project-top > svg { flex: none; color: var(--ui-aw-text); }
.ui-aw__project-name { flex: 1; min-width: 0; overflow: hidden; font-size: 14.5px; font-weight: 500; white-space: nowrap; text-overflow: ellipsis; }
.ui-aw__pinned { display: grid; color: var(--ui-aw-accent); }
.ui-aw__dots { opacity: 0; }
.ui-aw__project:hover .ui-aw__dots, .ui-aw__dots[aria-expanded="true"], .ui-aw__dots:focus-visible { opacity: 1; }
.ui-aw__rename { flex: 1; min-width: 0; height: 28px; padding: 0 8px; border: 0; border-radius: 7px; outline: none; background: #f5f5f5; box-shadow: 0 0 0 1px var(--ui-aw-accent); font: inherit; font-size: 14px; }
.ui-aw__project-desc { margin: 4px 0 0 26px; font-size: 13px; line-height: 19px; color: var(--ui-aw-muted); }
.ui-aw__project-foot { margin: 0; padding: 9px 16px 10px; font-size: 12px; color: var(--ui-aw-muted); }

/* Dialog */
.ui-aw__backdrop { position: absolute; inset: 0; z-index: 30; background: rgba(23, 23, 23, 0.12); opacity: 0; pointer-events: none; transition: opacity 220ms ease; }
.ui-aw__backdrop[data-open] { opacity: 1; pointer-events: auto; }
.ui-aw__dialog {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 31;
  width: min(380px, calc(100% - 32px));
  border-radius: 20px;
  background: var(--ui-aw-side);
  box-shadow: 0 0 0 1px #e5e5e5, 0 24px 60px -16px rgba(0, 0, 0, 0.3);
  opacity: 0;
  pointer-events: none;
  transform: translate(-50%, -46%) scale(0.98);
  transition: opacity 220ms ease, transform 320ms var(--ui-aw-ease);
}
.ui-aw__dialog[data-open] { opacity: 1; pointer-events: auto; transform: translate(-50%, -50%); }
.ui-aw__dialog-card { padding: 18px; border-radius: 20px; background: #fff; box-shadow: 0 0 0 1px #e5e5e5; }
.ui-aw__dialog-title { margin: 0 0 14px; font-size: 16px; font-weight: 600; }
.ui-aw__field { width: 100%; height: 40px; padding: 0 12px; border: 0; border-radius: 11px; outline: none; background: #fff; box-shadow: 0 0 0 1px #e2e2e2; font: inherit; font-size: 14px; }
.ui-aw__field:focus { box-shadow: 0 0 0 1px var(--ui-aw-accent), 0 0 0 4px rgba(47, 107, 255, 0.12); }
.ui-aw__dialog-foot { display: flex; justify-content: flex-end; gap: 6px; padding: 10px; }
.ui-aw__btn { height: 34px; padding: 0 14px; border: 0; border-radius: 10px; background: #fff; box-shadow: 0 0 0 1px #e5e5e5; font-size: 13px !important; font-weight: 500; }
.ui-aw__btn:hover { background: #f7f7f7; }

/* Narrow containers: the sidebar becomes an overlay that starts closed */
@container (max-width: 720px) {
  .ui-aw { grid-template-columns: 0px minmax(0, 1fr); padding-left: 8px; }
  .ui-aw:not([data-collapsed]) .ui-aw__side {
    position: absolute;
    inset: 8px auto 8px 8px;
    z-index: 25;
    width: 240px;
    border-radius: 14px;
    background: var(--ui-aw-side);
    box-shadow: 0 0 0 1px #e5e5e5, 0 16px 40px -12px rgba(0, 0, 0, 0.25);
  }
  .ui-aw__grid { grid-template-columns: minmax(0, 1fr); }
  .ui-aw__projects-head { grid-template-columns: auto 1fr; }
  .ui-aw__projects-head .ui-aw__primary { grid-column: 1 / -1; justify-self: start; }
}

/* Phone width: the composer gets a smaller span, so its text stays readable instead of shrinking with the width */
@container (max-width: 560px) {
  .ui-aw__composer .ui-chat-composer { --ui-cc-span: 1500; }
  .ui-aw__welcome { padding: 24px 16px; }
}

@keyframes ui-aw-in { from { opacity: 0; transform: translateY(4px); } }
@keyframes ui-aw-drop { from { opacity: 0; transform: translateY(-4px) scale(0.98); } }
@keyframes ui-aw-orb {
  0%, 100% { background-position: 0 0, 0% 0%; transform: scale(1); }
  50% { background-position: 0 0, 100% 100%; transform: scale(0.82); }
}
@keyframes ui-aw-shine { from { background-position: 100% 0; } to { background-position: 0% 0; } }
@media (prefers-reduced-motion: reduce) {
  .ui-aw, .ui-aw__side, .ui-aw__dialog, .ui-aw__backdrop { transition: none; }
  .ui-aw__welcome, .ui-aw__chat, .ui-aw__projects, .ui-aw__msg, .ui-aw__project, .ui-aw__menu, .ui-aw__mark--busy, .ui-aw__thinking { animation: none; }
}

/* Text fields: no focus box while typing – also against global :focus-visible rules of the host page */
.ui-aw input:not([type="checkbox"]):not([type="radio"]):focus-visible,
.ui-aw textarea:focus-visible,
.ui-aw [contenteditable]:focus-visible { outline: none; }
/* Dark mode: follows a .dark class or data-theme="dark" on any ancestor, e.g. <html> */
:where(.dark, [data-theme="dark"]) .ui-aw {
  --ui-aw-side: #161618;
  --ui-aw-card: #232326;
  --ui-aw-line: rgba(255, 255, 255, 0.08);
  --ui-aw-ink: #ededed;
  --ui-aw-text: #c4c4c4;
  --ui-aw-muted: #8f8f8f;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.08);
}
/* Dark buttons invert, like the site */
:where(.dark, [data-theme="dark"]) .ui-aw__ws,
:where(.dark, [data-theme="dark"]) .ui-aw__primary {
  background: linear-gradient(#f4f4f5, #e4e4e7);
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.6), inset 0 1px 0 #ffffff;
  color: #121213 !important;
}
:where(.dark, [data-theme="dark"]) .ui-aw__primary { box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.6), 0 2px 4px rgba(0, 0, 0, 0.35), inset 0 1px 0 #ffffff; }
:where(.dark, [data-theme="dark"]) .ui-aw__primary:hover:not(:disabled) { background: linear-gradient(#ffffff, #ececef); }
:where(.dark, [data-theme="dark"]) .ui-aw__icon:hover,
:where(.dark, [data-theme="dark"]) .ui-aw__item:hover { background: rgba(255, 255, 255, 0.06); }
:where(.dark, [data-theme="dark"]) .ui-aw__search { background: #232326; }
:where(.dark, [data-theme="dark"]) .ui-aw__search--wide { background: #2a2a2d; }
:where(.dark, [data-theme="dark"]) .ui-aw__search:focus-within { background: #2a2a2d; box-shadow: 0 0 0 1px var(--ui-aw-accent), 0 0 0 3px rgba(47, 107, 255, 0.24); }
:where(.dark, [data-theme="dark"]) .ui-aw__item[aria-current] { background: #2a2a2d; }
:where(.dark, [data-theme="dark"]) .ui-aw__user-dot { background: rgba(47, 107, 255, 0.16); color: #6b95ff; }
:where(.dark, [data-theme="dark"]) .ui-aw__main { border-color: rgba(255, 255, 255, 0.08); box-shadow: 0 1px 2px rgba(0, 0, 0, 0.4); }
:where(.dark, [data-theme="dark"]) .ui-aw__crumb-btn:hover,
:where(.dark, [data-theme="dark"]) .ui-aw__sort-btn:hover { background: rgba(255, 255, 255, 0.06); }
:where(.dark, [data-theme="dark"]) .ui-aw__slash { color: #6b6b70; }
:where(.dark, [data-theme="dark"]) .ui-aw__menu { background: #2a2a2d; box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1), 0 12px 30px -8px rgba(0, 0, 0, 0.5); }
:where(.dark, [data-theme="dark"]) .ui-aw__menu-item:hover:not(:disabled) { background: rgba(255, 255, 255, 0.06); }
:where(.dark, [data-theme="dark"]) .ui-aw__menu-item svg:last-child:not(:first-child),
:where(.dark, [data-theme="dark"]) .ui-aw__menu-item[aria-checked="true"],
:where(.dark, [data-theme="dark"]) .ui-aw__pinned { color: #6b95ff !important; }
:where(.dark, [data-theme="dark"]) .ui-aw__danger { color: #ff6b70 !important; }
:where(.dark, [data-theme="dark"]) .ui-aw__starter { background: #232326; box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1); }
:where(.dark, [data-theme="dark"]) .ui-aw__starter:hover { background: #2a2a2d; box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.16); }
:where(.dark, [data-theme="dark"]) .ui-aw__disclaimer { color: #6b6b70; }
:where(.dark, [data-theme="dark"]) .ui-aw__msg--user { background: #2a2a2d; }
:where(.dark, [data-theme="dark"]) .ui-aw__thinking { background-image: linear-gradient(90deg, #6b6b70 0%, #6b6b70 35%, #ededed 50%, #6b6b70 65%, #6b6b70 100%); }
:where(.dark, [data-theme="dark"]) .ui-aw__tile,
:where(.dark, [data-theme="dark"]) .ui-aw__project-card { background: #232326; box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.08), 0 1px 2px rgba(0, 0, 0, 0.4); }
:where(.dark, [data-theme="dark"]) .ui-aw__rename { background: #2a2a2d; color: var(--ui-aw-ink); }
:where(.dark, [data-theme="dark"]) .ui-aw__backdrop { background: rgba(0, 0, 0, 0.45); }
:where(.dark, [data-theme="dark"]) .ui-aw__dialog { box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.08), 0 24px 60px -16px rgba(0, 0, 0, 0.6); }
:where(.dark, [data-theme="dark"]) .ui-aw__dialog-card { background: #232326; box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.08); }
:where(.dark, [data-theme="dark"]) .ui-aw__field { background: #2a2a2d; box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1); color: var(--ui-aw-ink); }
:where(.dark, [data-theme="dark"]) .ui-aw__field::placeholder { color: #8f8f8f; }
:where(.dark, [data-theme="dark"]) .ui-aw__field:focus { box-shadow: 0 0 0 1px var(--ui-aw-accent), 0 0 0 4px rgba(47, 107, 255, 0.24); }
:where(.dark, [data-theme="dark"]) .ui-aw__btn { background: #2a2a2d; box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1); }
:where(.dark, [data-theme="dark"]) .ui-aw__btn:hover { background: #313135; }
@container (max-width: 720px) {
  :where(.dark, [data-theme="dark"]) .ui-aw:not([data-collapsed]) .ui-aw__side { box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.08), 0 16px 40px -12px rgba(0, 0, 0, 0.6); }
}
`;
var ViewP = 1180;
function AiWorkspaceDemo2() {
  let e = React.useRef<HTMLDivElement | null>(null),
    [t, n] = React.useState<{ scale: number; card: boolean } | null>(null);
  return (
    React.useLayoutEffect(() => {
      let t = e.current,
        r = t?.closest(`.card__preview`),
        i = r ?? t?.closest(`.stage`);
      if (!t || !i) return;
      let a = () => {
        let e = i.clientWidth;
        if (r)
          return n({
            scale: (e - 48) / ViewP,
            card: true,
          });
        if (e < 760) return n(null);
        n({
          scale: Math.min(0.8, (e - 120) / ViewP),
          card: false,
        });
      };
      a();
      let o = new ResizeObserver(a);
      return (o.observe(i), () => o.disconnect());
    }, []),
    (
      <div ref={e} className={`workspace-demo`} data-fit={t ? (t.card ? `card` : `stage`) : void 0}>
        <div
          className={`workspace-demo__frame`}
          style={
            t
              ? t.card
                ? {
                    width: ViewP,
                    transform: `scale(${t.scale})`,
                  }
                : {
                    width: ViewP,
                    zoom: t.scale,
                  }
              : void 0
          }
        >
          <AiWorkspace
            userName={`Lena`}
            userAvatar={`data:image/jpeg;base64,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`}
          />
        </div>
      </div>
    )
  );
}
const demoStyles =
  ".workspace-demo{align-self:stretch;width:100%;min-width:0;padding:20px 16px}.workspace-demo__frame{min-width:0}.workspace-demo[data-fit=stage]{justify-items:center;padding:32px 0;display:grid}.card__preview .workspace-demo{padding:0;position:absolute;inset:0;overflow:hidden;-webkit-mask-image:linear-gradient(#000 74%,#0000);mask-image:linear-gradient(#000 74%,#0000)}.workspace-demo[data-fit=card] .workspace-demo__frame{transform-origin:0 0;position:absolute;top:44px;left:24px}\n";
function AiWorkspaceDemo() {
  return (
    <>
      <style href="plico-demo-ai-workspace" precedence="default">
        {demoStyles}
      </style>
      <AiWorkspaceDemo2 />
    </>
  );
}
export { AiWorkspace };
export { AiWorkspaceDemo };
export { AiWorkspace as Component };
export { AiWorkspaceDemo as Demo };
export default AiWorkspace;

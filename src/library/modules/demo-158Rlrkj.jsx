"use client";

import { t as _View_n } from "./component-DwKackPh.jsx";
import * as React from "react";
import * as JSXRuntime from "react/jsx-runtime";
var a = 0;
var o = (e) => `${e}-${Date.now().toString(36)}-${(a++).toString(36)}`;
async function ee(e) {
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
function AiWorkspaceComponent({
  userName: e = `Lena`,
  userAvatar: t,
  workspace: a = `N`,
  pinned: s = [`Writing assistant`, `Data analyst`, `Knowledge base`],
  conversations: l = te,
  projects: p = ne,
  respond: m,
  className: h,
}) {
  let [g, _] = React.useState(l),
    [v, y] = React.useState(p),
    [b, x] = React.useState({
      kind: `welcome`,
    }),
    [S, C] = React.useState(false),
    [w, T] = React.useState(``),
    [E, D] = React.useState(null),
    [O, k] = React.useState(null),
    [A, j] = React.useState(null),
    [M, N] = React.useState(false),
    [P, F] = React.useState(``),
    [I, L] = React.useState(null),
    [R, z] = React.useState(``),
    [B, V] = React.useState(`recent`),
    [H, U] = React.useState(p[0]?.id ?? ``),
    W = React.useRef(null),
    G = React.useRef(null),
    K = React.useRef(void 0);
  (React.useEffect(() => {
    (G.current?.offsetWidth ?? 1e3) <= 720 && C(true);
  }, []),
    React.useEffect(() => () => window.clearInterval(K.current), []),
    React.useEffect(() => {
      if (!A && !M) return;
      let e = (e) => {
          e.target.closest(`[data-popover]`) || j(null);
        },
        t = (e) => {
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
  let J = async (e) => {
      let t = e.trim();
      if (!t || E) return;
      let n = q?.id,
        r = {
          id: o(`m`),
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
        n = o(`c`);
        let e = t.length > 38 ? `${t.slice(0, 36)}…` : t;
        (_((t) => [
          {
            id: n,
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
        a = await (m ? m(t, i) : ee(t)),
        s = o(`m`);
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
    Z = [...s, ...v.filter((e) => e.pinned).map((e) => e.name)].filter(
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
        id: o(`p`),
        name: e,
        description: `New project – add files and chats to it`,
        updatedDaysAgo: 0,
      };
      (y((e) => [t, ...e]), F(``), N(false), V(`recent`));
    },
    oe = (e) => (O?.msg === e.id ? e.text.split(/(\s+)/).slice(0, O.shown).join(``) : e.text);
  return (
    <>
      <style href={`ui-ai-workspace`} precedence={`default`}>
        {re}
      </style>
      <div ref={G} className={[`ui-aw`, h].filter(Boolean).join(` `)} data-collapsed={S || void 0}>
        <aside className={`ui-aw__side`} aria-label={`Workspace`} inert={S}>
          <div className={`ui-aw__side-head`}>
            <span className={`ui-aw__ws`}>{a}</span>
            <button
              type={`button`}
              className={`ui-aw__icon`}
              aria-label={`Collapse sidebar`}
              onClick={() => C(true)}
            >
              <_View_u name={`chevronLeft`} />
            </button>
          </div>
          <label className={`ui-aw__search`}>
            <_View_u name={`search`} size={15} />
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
              <_View_u name={`plus`} />
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
              <_View_d />
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
                    <_View_f />
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
            {t ? (
              <img src={t} alt={``} width={24} height={24} />
            ) : (
              <span className={`ui-aw__user-dot`}>{e[0]}</span>
            )}
            <span>{e}</span>
            <button type={`button`} className={`ui-aw__icon`} aria-label={`Settings`}>
              <_View_u name={`settings`} />
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
                <_View_u name={`panel`} />
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
                <_View_u name={`chevronDown`} size={14} />
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
                      {e.id === H && <_View_u name={`check`} size={14} />}
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
                <_View_u name={`moreH`} />
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
                {e}
              </h2>
              <p className={`ui-aw__sub`}>{`What can I help you with today?`}</p>
              <div className={`ui-aw__composer`}>
                <_View_n placeholder={`How can I help you today?`} onSend={(e) => J(e)} />
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
                          <_View_c
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
                <_View_n placeholder={`Reply…`} onSend={(e) => J(e)} />
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
                  <_View_d />
                </span>
                <div>
                  <h2 className={`ui-aw__title`}>{`Projects`}</h2>
                  <p
                    className={`ui-aw__sub ui-aw__sub--left`}
                  >{`Keep chats, files and notes for each piece of work together.`}</p>
                </div>
                <button type={`button`} className={`ui-aw__primary`} onClick={() => N(true)}>
                  <_View_u name={`plus`} size={14} />
                  {`Create project`}
                </button>
              </div>
              <label className={`ui-aw__search ui-aw__search--wide`}>
                <_View_u name={`search`} size={15} />
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
                    <_View_u name={`chevronDown`} size={14} />
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
                          {B === e && <_View_u name={`check`} size={14} />}
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
                        <_View_d />
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
                              (e.key === `Enter` && e.target.blur(), e.key === `Escape` && L(null));
                            }}
                          />
                        ) : (
                          <span className={`ui-aw__project-name`}>{e.name}</span>
                        )}
                        {e.pinned && (
                          <span className={`ui-aw__pinned`}>
                            <_View_f />
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
                            <_View_u name={`moreV`} />
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
                                <_View_u name={`pencil`} size={14} />
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
                                <_View_f />
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
function _View_c({ text: e, onRetry: t }) {
  let [n, a] = React.useState(false);
  return (
    <div className={`ui-aw__actions`}>
      <button
        type={`button`}
        className={`ui-aw__icon`}
        aria-label={`Copy answer`}
        onClick={async () => {
          try {
            (await navigator.clipboard.writeText(e), a(true), setTimeout(() => a(false), 1400));
          } catch {}
        }}
      >
        <_View_u name={n ? `check` : `copy`} size={15} />
      </button>
      <button type={`button`} className={`ui-aw__icon`} aria-label={`Ask again`} onClick={t}>
        <_View_u name={`retry`} size={15} />
      </button>
    </div>
  );
}
var te = [
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
var ne = [
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
var l = {
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
var _View_u = ({ name: e, size: t = 16 }) => (
  <svg
    viewBox={`0 0 24 24`}
    width={t}
    height={t}
    fill={`none`}
    stroke={`currentColor`}
    strokeWidth={`1.75`}
    strokeLinecap={`round`}
    strokeLinejoin={`round`}
    aria-hidden={`true`}
  >
    {l[e].map((e) => (
      <path d={e} key={e} />
    ))}
  </svg>
);
var _View_d = () => <_View_u name={`folder`} />;
var _View_f = () => <_View_u name={`pin`} size={15} />;
var re = `
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
var p = 1180;
function AiWorkspaceDemo() {
  let e = React.useRef(null),
    [t, n] = React.useState(null);
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
            scale: (e - 48) / p,
            card: true,
          });
        if (e < 760) return n(null);
        n({
          scale: Math.min(0.8, (e - 120) / p),
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
                    width: p,
                    transform: `scale(${t.scale})`,
                  }
                : {
                    width: p,
                    zoom: t.scale,
                  }
              : void 0
          }
        >
          <AiWorkspaceComponent
            userName={`Lena`}
            userAvatar={`data:image/jpeg;base64,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`}
          />
        </div>
      </div>
    )
  );
}
export default AiWorkspaceDemo;
export { AiWorkspaceComponent as PlicoCore_s };
export { AiWorkspaceDemo as PlicoDemo_m };

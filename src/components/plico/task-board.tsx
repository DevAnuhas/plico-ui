"use client";

import * as React from "react";
export interface Task {
  id: string;
  key: string;
  title: string;
  status: string;
  priority: number;
  labels: string[];
  assignee?: string;
  estimate?: string;
  dueIn?: number;
  subtasks?: number[];
  pullRequest?: number;
  created: string;
  description?: string;
}
type TaskStatus = {
  id: string;
  label: string;
  color?: string;
  icon?: React.ReactNode;
};
type TaskLabel = {
  id: string;
  label: string;
  color?: string;
};
type TaskPerson = {
  id: string;
  name: string;
  avatar?: string;
  initials?: string;
  color?: string;
};
interface TaskBoardProps {
  tasks: Task[];
  statuses: TaskStatus[];
  labels: TaskLabel[];
  people: TaskPerson[];
  path?: string[];
  onChange?: (tasks: Task[]) => void;
  className?: string;
}
var StatusIcon = ({
  kind: kind,
  color = `currentColor`,
}: {
  kind: string;
  color?: string;
}) => (
  <svg
    viewBox={`0 0 16 16`}
    width={`15`}
    height={`15`}
    fill={`none`}
    stroke={color}
    strokeWidth={`1.4`}
    strokeLinecap={`round`}
    strokeLinejoin={`round`}
    aria-hidden={`true`}
  >
    {kind === `backlog` && (
      <path
        d={`M2.5 9.5 4 3.5h8l1.5 6M2.5 9.5v3h11v-3M2.5 9.5H6l.8 1.5h2.4l.8-1.5h3.5`}
      />
    )}
    {kind === `todo` && (
      <rect x={`3`} y={`3`} width={`10`} height={`10`} rx={`2.5`} />
    )}
    {kind === `progress` && (
      <>
        <circle cx={`8`} cy={`8`} r={`5.5`} />
        <path d={`M8 5v3l2 1.5`} />
      </>
    )}
    {kind === `review` && (
      <>
        <path
          d={`M1.8 8S4 3.8 8 3.8 14.2 8 14.2 8 12 12.2 8 12.2 1.8 8 1.8 8Z`}
        />
        <circle cx={`8`} cy={`8`} r={`1.8`} />
      </>
    )}
    {kind === `done` && (
      <>
        <rect
          x={`2.5`}
          y={`2.5`}
          width={`11`}
          height={`11`}
          rx={`3`}
          fill={color}
          stroke={`none`}
        />
        <path
          d={`m5.5 8.2 1.8 1.8 3.3-3.6`}
          stroke={`#fff`}
          strokeWidth={`1.5`}
        />
      </>
    )}
    {kind === `canceled` && (
      <>
        <circle cx={`8`} cy={`8`} r={`5.5`} />
        <path d={`m4.2 11.8 7.6-7.6`} />
      </>
    )}
  </svg>
);
var priorityLabels = [`No priority`, `Low`, `Medium`, `High`, `Urgent`];
function TaskBoard({
  tasks: tasks,
  statuses: statuses,
  labels: labels,
  people: people,
  path = [`Northwind`, `Launch`, `Sprint 12`],
  onChange: onChange,
  className: className,
}: TaskBoardProps) {
  let [localTasks, setLocalTasks] = React.useState(tasks),
    [search, setSearch] = React.useState(``),
    [selectedLabels, setSelectedLabels] = React.useState(new Set<string>()),
    [compact, setCompact] = React.useState(false),
    [openMenu, setOpenMenu] = React.useState<string | null>(null),
    [favorite, setFavorite] = React.useState(false),
    [selectedTaskId, setSelectedTaskId] = React.useState<string | null>(null),
    [addingStatus, setAddingStatus] = React.useState<string | null>(null),
    [newTitle, setNewTitle] = React.useState(``),
    [dragState, setDragState] = React.useState<{
      id: string;
      over?: string;
      index?: number;
    } | null>(null),
    nextTaskIdRef = React.useRef(tasks.length + 300),
    menuRef = React.useRef<HTMLDivElement | null>(null),
    commitTasks = (nextTasks: Task[]) => {
      (setLocalTasks(nextTasks), onChange?.(nextTasks));
    },
    updateTask = (id: string, patch: Partial<Task>) =>
      commitTasks(
        localTasks.map((n) =>
          n.id === id
            ? {
                ...n,
                ...patch,
              }
            : n,
        ),
      );
  (React.useEffect(() => {
    if (!openMenu) return;
    let e = (e: PointerEvent) =>
      !menuRef.current?.contains(e.target as Node | null) && setOpenMenu(null);
    return (
      window.addEventListener(`pointerdown`, e),
      () => window.removeEventListener(`pointerdown`, e)
    );
  }, [openMenu]),
    React.useEffect(() => {
      if (!selectedTaskId) return;
      let e = (e: { key: string }) =>
        e.key === `Escape` && setSelectedTaskId(null);
      return (
        window.addEventListener(`keydown`, e),
        () => window.removeEventListener(`keydown`, e)
      );
    }, [selectedTaskId]));
  let normalizedSearch = search.trim().toLowerCase(),
    visibleTasks = React.useMemo(
      () =>
        localTasks.filter(
          (e) =>
            (!normalizedSearch ||
              `${e.key} ${e.title}`.toLowerCase().includes(normalizedSearch)) &&
            (selectedLabels.size === 0 ||
              e.labels.some((e) => selectedLabels.has(e))),
        ),
      [localTasks, normalizedSearch, selectedLabels],
    ),
    findPerson = (id: string | undefined) => people.find((t) => t.id === id),
    findLabel = (id: React.Key | null | undefined) =>
      labels.find((t) => t.id === id),
    selectedTask = localTasks.find((e) => e.id === selectedTaskId) ?? null,
    handleDragOver = (
      event: React.DragEvent<HTMLDivElement>,
      statusId: string,
    ) => {
      if (!dragState) return;
      (event.preventDefault(), (event.dataTransfer.dropEffect = `move`));
      let cards = [
          ...event.currentTarget.querySelectorAll<HTMLElement>(`[data-card]`),
        ].filter((e) => e.dataset.card !== dragState.id),
        insertionIndex = cards.length;
      for (let t = 0; t < cards.length; t++) {
        let i = cards[t].getBoundingClientRect();
        if (event.clientY < i.top + i.height / 2) {
          insertionIndex = t;
          break;
        }
      }
      (dragState.over !== statusId || dragState.index !== insertionIndex) &&
        setDragState({
          ...dragState,
          over: statusId,
          index: insertionIndex,
        });
    },
    dropTask = (statusId: string) => {
      if (!dragState) return;
      let task = localTasks.find((e) => e.id === dragState.id);
      if (!task) return setDragState(null);
      let remainingTasks = localTasks.filter((e) => e.id !== dragState.id),
        visibleInColumn = remainingTasks.filter(
          (t) =>
            t.status === statusId && visibleTasks.some((e) => e.id === t.id),
        ),
        beforeTask = visibleInColumn[dragState.index ?? visibleInColumn.length],
        movedTask = {
          ...task,
          status: statusId,
        },
        insertionIndex = beforeTask
          ? remainingTasks.indexOf(beforeTask)
          : remainingTasks.length;
      (commitTasks([
        ...remainingTasks.slice(0, insertionIndex),
        movedTask,
        ...remainingTasks.slice(insertionIndex),
      ]),
        setDragState(null));
    },
    addTask = (statusId: string) => {
      let title = newTitle.trim();
      if ((setAddingStatus(null), setNewTitle(``), !title)) return;
      nextTaskIdRef.current += 1;
      let task = {
        id: `t-${nextTaskIdRef.current}`,
        key: `NW-${nextTaskIdRef.current}`,
        title: title,
        status: statusId,
        priority: 0,
        labels: [],
        created: new Date().toLocaleDateString(`en-US`, {
          month: `short`,
          day: `numeric`,
        }),
      };
      commitTasks([task, ...localTasks]);
    };
  return (
    <>
      <style href={`ui-task-board`} precedence={`default`}>
        {taskBoardStyles}
      </style>
      <section
        className={[`ui-tb`, className].filter(Boolean).join(` `)}
        aria-label={path.join(` / `)}
        data-compact={compact || void 0}
      >
        <header className={`ui-tb__top`}>
          <nav className={`ui-tb__crumbs`} aria-label={`Breadcrumb`}>
            <span className={`ui-tb__logo`} aria-hidden={`true`}>
              <i />
              <i />
              <i />
            </span>
            {path.map((e, t) => (
              <span
                className={`ui-tb__crumb`}
                aria-current={t === path.length - 1 ? `page` : void 0}
                key={e}
              >
                {t > 0 && <ChevronIcon />}
                {e}
              </span>
            ))}
            <button
              type={`button`}
              className={`ui-tb__icon`}
              aria-pressed={favorite}
              aria-label={
                favorite ? `Remove from favorites` : `Add to favorites`
              }
              onClick={() => setFavorite((e) => !e)}
            >
              <FavoriteIcon filled={favorite} />
            </button>
          </nav>
        </header>
        <div className={`ui-tb__bar`}>
          <span className={`ui-tb__count`}>
            {visibleTasks.length}
            {` `}
            {visibleTasks.length === 1 ? `task` : `tasks`}
            {visibleTasks.length !== localTasks.length && (
              <span>
                {` of `}
                {localTasks.length}
              </span>
            )}
          </span>
          <div className={`ui-tb__tools`}>
            <label className={`ui-tb__search`}>
              <BoardIcon
                d={`M7 12.5a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11ZM11 11l3.5 3.5`}
                size={14}
              />
              <input
                type={`search`}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={`Search`}
                aria-label={`Search tasks`}
              />
            </label>
            <div className={`ui-tb__menu-wrap`} ref={menuRef}>
              <button
                type={`button`}
                className={`ui-tb__icon`}
                aria-label={`Filter by label`}
                aria-haspopup={`menu`}
                aria-expanded={openMenu === `filter`}
                data-active={selectedLabels.size > 0 || void 0}
                onClick={() => setOpenMenu(openMenu ? null : `filter`)}
              >
                <BoardIcon d={`M2.5 4.5h11M4.5 8h7M6.5 11.5h3`} />
                {selectedLabels.size > 0 && <span className={`ui-tb__dot`} />}
              </button>
              {openMenu === `filter` && (
                <div className={`ui-tb__menu`} role={`menu`}>
                  <p className={`ui-tb__menu-title`}>{`Labels`}</p>
                  {labels.map((e) => (
                    <button
                      type={`button`}
                      role={`menuitemcheckbox`}
                      aria-checked={selectedLabels.has(e.id)}
                      className={`ui-tb__menu-item`}
                      onClick={() =>
                        setSelectedLabels((t) => {
                          let n = new Set(t);
                          return (
                            n.has(e.id) ? n.delete(e.id) : n.add(e.id),
                            n
                          );
                        })
                      }
                      key={e.id}
                    >
                      <span
                        className={`ui-tb__swatch`}
                        style={{
                          background: e.color,
                        }}
                      />
                      {e.label}
                      {selectedLabels.has(e.id) && (
                        <BoardIcon d={`m3.5 8.5 3 3 6-7`} size={14} />
                      )}
                    </button>
                  ))}
                  {selectedLabels.size > 0 && (
                    <button
                      type={`button`}
                      className={`ui-tb__menu-item ui-tb__menu-clear`}
                      onClick={() => setSelectedLabels(new Set())}
                    >{`Clear filter`}</button>
                  )}
                </div>
              )}
            </div>
            <button
              type={`button`}
              className={`ui-tb__icon`}
              aria-pressed={compact}
              aria-label={`Compact cards`}
              title={`Compact cards`}
              onClick={() => setCompact((e) => !e)}
            >
              <BoardIcon d={`M2.5 3.5h11v3h-11zM2.5 9.5h11v3h-11z`} />
            </button>
          </div>
        </div>
        <div className={`ui-tb__columns`}>
          {statuses.map((e) => {
            let t = visibleTasks.filter((t) => t.status === e.id),
              n = dragState?.over === e.id;
            return (
              <div
                className={`ui-tb__column`}
                data-over={n || void 0}
                onDragOver={(t) => handleDragOver(t, e.id)}
                onDragLeave={(e) => {
                  !e.currentTarget.contains(e.relatedTarget as Node | null) &&
                    dragState &&
                    setDragState({
                      id: dragState.id,
                    });
                }}
                onDrop={(t) => {
                  (t.preventDefault(), dropTask(e.id));
                }}
                key={e.id}
              >
                <div className={`ui-tb__col-head`}>
                  <span className={`ui-tb__status`}>{e.icon}</span>
                  <span className={`ui-tb__col-title`}>{e.label}</span>
                  <span className={`ui-tb__col-count`}>{t.length}</span>
                  <button
                    type={`button`}
                    className={`ui-tb__icon ui-tb__add`}
                    aria-label={`Add task to ${e.label}`}
                    onClick={() => {
                      (setAddingStatus(e.id), setNewTitle(``));
                    }}
                  >
                    <BoardIcon d={`M8 3v10M3 8h10`} size={14} />
                  </button>
                </div>
                <div className={`ui-tb__cards`}>
                  {addingStatus === e.id && (
                    <form
                      className={`ui-tb__new`}
                      onSubmit={(t) => {
                        (t.preventDefault(), addTask(e.id));
                      }}
                    >
                      <input
                        autoFocus={true}
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        onBlur={() => addTask(e.id)}
                        onKeyDown={(e) =>
                          e.key === `Escape` &&
                          (setAddingStatus(null), setNewTitle(``))
                        }
                        placeholder={`Task title, then Enter`}
                        aria-label={`New task in ${e.label}`}
                      />
                    </form>
                  )}
                  {t.map((t, r) => {
                    let o = findPerson(t.assignee);
                    return (
                      <div className={`ui-tb__slot`} key={t.id}>
                        {n && dragState?.index === r && (
                          <span className={`ui-tb__drop`} />
                        )}
                        <article
                          className={`ui-tb__card`}
                          data-card={t.id}
                          data-dragging={dragState?.id === t.id || void 0}
                          draggable={true}
                          tabIndex={0}
                          aria-label={`${t.key} ${t.title}`}
                          onDragStart={(e) => {
                            (e.dataTransfer.setData(`text/plain`, t.id),
                              (e.dataTransfer.effectAllowed = `move`),
                              setDragState({
                                id: t.id,
                              }));
                          }}
                          onDragEnd={() => setDragState(null)}
                          onClick={() => setSelectedTaskId(t.id)}
                          onKeyDown={(e) => {
                            (e.key === `Enter` || e.key === ` `) &&
                              (e.preventDefault(), setSelectedTaskId(t.id));
                          }}
                        >
                          <div className={`ui-tb__card-top`}>
                            <span className={`ui-tb__key`}>{t.key}</span>
                            {o && <Avatar person={o} size={18} />}
                          </div>
                          <p className={`ui-tb__card-title`}>
                            <span className={`ui-tb__status`}>{e.icon}</span>
                            <span>{t.title}</span>
                          </p>
                          <div className={`ui-tb__props`}>
                            <span
                              className={`ui-tb__prop`}
                              title={priorityLabels[t.priority]}
                            >
                              <PriorityIcon level={t.priority} />
                            </span>
                            {t.estimate && (
                              <span
                                className={`ui-tb__prop`}
                                title={`Estimate`}
                              >
                                <BoardIcon
                                  d={`M8 2.5 13.5 12h-11Z`}
                                  size={12}
                                />
                                {t.estimate}
                              </span>
                            )}
                            {t.dueIn !== void 0 && (
                              <span
                                className={`ui-tb__prop`}
                                data-tone={
                                  t.dueIn < 0
                                    ? `late`
                                    : t.dueIn <= 2
                                      ? `soon`
                                      : void 0
                                }
                              >
                                <BoardIcon
                                  d={`M8 14.5a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11ZM8 6v3l2 1.2M6.5 1.5h3`}
                                  size={12}
                                />
                                {t.dueIn < 0
                                  ? `${-t.dueIn}d late`
                                  : t.dueIn === 0
                                    ? `Today`
                                    : `${t.dueIn}d`}
                              </span>
                            )}
                            {t.subtasks && (
                              <span className={`ui-tb__prop`}>
                                <SubtaskProgress
                                  done={t.subtasks[0]}
                                  total={t.subtasks[1]}
                                />
                                {t.subtasks[0]}
                                {`/`}
                                {t.subtasks[1]}
                              </span>
                            )}
                            {t.pullRequest && (
                              <span className={`ui-tb__prop`}>
                                <BoardIcon
                                  d={`M4.5 4v8M4.5 4a1.5 1.5 0 1 0 0-.01M11.5 12a1.5 1.5 0 1 0 0 .01M11.5 10.5V6.5a2 2 0 0 0-2-2H7.5M8.5 3.5l-1 1 1 1`}
                                  size={12}
                                />
                                {`#`}
                                {t.pullRequest}
                              </span>
                            )}
                            {t.labels.map((e: React.Key | null | undefined) => {
                              let t = findLabel(e);
                              return t ? (
                                <span className={`ui-tb__prop`} key={e}>
                                  <span
                                    className={`ui-tb__swatch ui-tb__swatch--dot`}
                                    style={{
                                      background: t.color,
                                    }}
                                  />
                                  {t.label}
                                </span>
                              ) : null;
                            })}
                          </div>
                          <p className={`ui-tb__created`}>
                            {`Created `}
                            {t.created}
                          </p>
                        </article>
                      </div>
                    );
                  })}
                  {n && dragState?.index === t.length && (
                    <span className={`ui-tb__drop`} />
                  )}
                  {t.length === 0 && addingStatus !== e.id && (
                    <p className={`ui-tb__empty`}>{`Drop tasks here`}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <div
          className={`ui-tb__scrim`}
          data-open={selectedTask ? true : void 0}
          onClick={() => setSelectedTaskId(null)}
          aria-hidden={`true`}
        />
        <aside
          className={`ui-tb__panel`}
          data-open={selectedTask ? true : void 0}
          aria-label={`Task details`}
          inert={!selectedTask}
        >
          {selectedTask && (
            <>
              <div className={`ui-tb__panel-head`}>
                <span className={`ui-tb__key`}>{selectedTask.key}</span>
                <button
                  type={`button`}
                  className={`ui-tb__icon`}
                  aria-label={`Close details`}
                  onClick={() => setSelectedTaskId(null)}
                >
                  <BoardIcon d={`m4 4 8 8M12 4l-8 8`} />
                </button>
              </div>
              <textarea
                className={`ui-tb__title-input`}
                value={selectedTask.title}
                rows={2}
                onChange={(e) =>
                  updateTask(selectedTask.id, {
                    title: e.target.value,
                  })
                }
                aria-label={`Title`}
              />
              <dl className={`ui-tb__fields`}>
                <dt>{`Status`}</dt>
                <dd className={`ui-tb__choices`}>
                  {statuses.map((e) => (
                    <button
                      type={`button`}
                      className={`ui-tb__choice`}
                      aria-pressed={selectedTask.status === e.id}
                      onClick={() =>
                        updateTask(selectedTask.id, {
                          status: e.id,
                        })
                      }
                      key={e.id}
                    >
                      <span className={`ui-tb__status`}>{e.icon}</span>
                      {e.label}
                    </button>
                  ))}
                </dd>
                <dt>{`Priority`}</dt>
                <dd className={`ui-tb__choices`}>
                  {[4, 3, 2, 1, 0].map((e) => (
                    <button
                      type={`button`}
                      className={`ui-tb__choice`}
                      aria-pressed={selectedTask.priority === e}
                      onClick={() =>
                        updateTask(selectedTask.id, {
                          priority: e,
                        })
                      }
                      key={e}
                    >
                      <PriorityIcon level={e} />
                      {priorityLabels[e]}
                    </button>
                  ))}
                </dd>
                <dt>{`Labels`}</dt>
                <dd className={`ui-tb__choices`}>
                  {labels.map((e) => {
                    let t = selectedTask.labels.includes(e.id);
                    return (
                      <button
                        type={`button`}
                        className={`ui-tb__choice`}
                        aria-pressed={t}
                        onClick={() =>
                          updateTask(selectedTask.id, {
                            labels: t
                              ? selectedTask.labels.filter((t) => t !== e.id)
                              : [...selectedTask.labels, e.id],
                          })
                        }
                        key={e.id}
                      >
                        <span
                          className={`ui-tb__swatch ui-tb__swatch--dot`}
                          style={{
                            background: e.color,
                          }}
                        />
                        {e.label}
                      </button>
                    );
                  })}
                </dd>
                <dt>{`Assignee`}</dt>
                <dd className={`ui-tb__choices`}>
                  {people.map((e) => (
                    <button
                      type={`button`}
                      className={`ui-tb__choice`}
                      aria-pressed={selectedTask.assignee === e.id}
                      onClick={() =>
                        updateTask(selectedTask.id, {
                          assignee:
                            selectedTask.assignee === e.id ? void 0 : e.id,
                        })
                      }
                      key={e.id}
                    >
                      <Avatar person={e} size={16} />
                      {e.name.split(` `)[0]}
                    </button>
                  ))}
                </dd>
              </dl>
              <div className={`ui-tb__panel-foot`}>
                <span>
                  {`Created `}
                  {selectedTask.created}
                </span>
                <button
                  type={`button`}
                  className={`ui-tb__delete`}
                  onClick={() => {
                    (commitTasks(
                      localTasks.filter((e) => e.id !== selectedTask.id),
                    ),
                      setSelectedTaskId(null));
                  }}
                >{`Delete task`}</button>
              </div>
            </>
          )}
        </aside>
      </section>
    </>
  );
}
function Avatar({
  person: person,
  size: size,
}: {
  person: TaskPerson;
  size: number;
}) {
  return person.avatar ? (
    <img
      className={`ui-tb__avatar`}
      src={person.avatar}
      alt={person.name}
      title={person.name}
      width={size}
      height={size}
      loading={`lazy`}
    />
  ) : (
    <span
      className={`ui-tb__avatar ui-tb__avatar--initials`}
      style={{
        width: size,
        height: size,
      }}
      title={person.name}
    >
      {person.name[0]}
    </span>
  );
}
function PriorityIcon({ level: level }: { level: number }) {
  return level === 4 ? (
    <svg
      className={`ui-tb__prio`}
      viewBox={`0 0 14 14`}
      width={`14`}
      height={`14`}
      aria-hidden={`true`}
    >
      <rect
        x={`1`}
        y={`1`}
        width={`12`}
        height={`12`}
        rx={`3`}
        fill={`#ec4899`}
      />
      <path
        d={`M7 3.8v4M7 9.9v.3`}
        stroke={`#fff`}
        strokeWidth={`1.6`}
        strokeLinecap={`round`}
      />
    </svg>
  ) : (
    <svg
      className={`ui-tb__prio`}
      viewBox={`0 0 14 14`}
      width={`14`}
      height={`14`}
      aria-hidden={`true`}
    >
      {[0, 1, 2].map((t) => (
        <rect
          x={2 + t * 4}
          y={9 - t * 3}
          width={`2.4`}
          height={3 + t * 3}
          rx={`0.8`}
          className={level > t ? `ui-tb__prio-on` : `ui-tb__prio-off`}
          key={t}
        />
      ))}
    </svg>
  );
}
function SubtaskProgress({
  done: done,
  total: total,
}: {
  done: number;
  total: number;
}) {
  let circumference = 2 * Math.PI * 5;
  return (
    <svg viewBox={`0 0 14 14`} width={`12`} height={`12`} aria-hidden={`true`}>
      <circle
        className={`ui-tb__ring-track`}
        cx={`7`}
        cy={`7`}
        r={`5`}
        fill={`none`}
        strokeWidth={`2`}
      />
      <circle
        cx={`7`}
        cy={`7`}
        r={`5`}
        fill={`none`}
        stroke={`#2f6bff`}
        strokeWidth={`2`}
        strokeDasharray={`${(done / Math.max(1, total)) * circumference} ${circumference}`}
        transform={`rotate(-90 7 7)`}
      />
    </svg>
  );
}
var ChevronIcon = () => <BoardIcon d={`m6 4 4 4-4 4`} size={12} />;
var FavoriteIcon = ({ filled: filled }: { filled: boolean }) => (
  <svg viewBox={`0 0 16 16`} width={`15`} height={`15`} aria-hidden={`true`}>
    <path
      d={`m8 1.8 1.9 3.9 4.3.6-3.1 3 .7 4.3L8 11.6l-3.8 2 .7-4.3-3.1-3 4.3-.6Z`}
      fill={filled ? `#f5b400` : `none`}
      stroke={filled ? `#f5b400` : `currentColor`}
      strokeWidth={`1.3`}
      strokeLinejoin={`round`}
    />
  </svg>
);
var BoardIcon = ({ d: path, size = 16 }: { d: string; size?: number }) => (
  <svg
    viewBox={`0 0 16 16`}
    width={size}
    height={size}
    fill={`none`}
    stroke={`currentColor`}
    strokeWidth={`1.4`}
    strokeLinecap={`round`}
    strokeLinejoin={`round`}
    aria-hidden={`true`}
  >
    <path d={path} />
  </svg>
);
var taskBoardStyles = `
.ui-tb {
  --ui-tb-tray: #f6f6f6;
  --ui-tb-card: #ffffff;
  --ui-tb-line: #ececec;
  --ui-tb-ink: #171717;
  --ui-tb-text: #404040;
  --ui-tb-muted: #8f8f8f;
  --ui-tb-accent: #2f6bff;
  --ui-tb-ease: cubic-bezier(0.22, 1, 0.36, 1);
  position: relative;
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
  overflow: hidden;
  container-type: inline-size;
  background: #fff;
  border: 1px solid #e5e5e5;
  border-radius: 20px;
  font-family: "Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  color: var(--ui-tb-ink);
  -webkit-font-smoothing: antialiased;
}
.ui-tb *, .ui-tb *::before, .ui-tb *::after { box-sizing: border-box; }
.ui-tb button { margin: 0; font: inherit; color: inherit; cursor: pointer; }
.ui-tb button:focus-visible, .ui-tb [tabindex]:focus-visible { outline: 2px solid var(--ui-tb-accent); outline-offset: 2px; }

.ui-tb__top {
  display: flex;
  align-items: center;
  min-height: 48px;
  padding: 0 14px 0 18px;
  border-bottom: 1px solid var(--ui-tb-line);
}
.ui-tb__crumbs { display: flex; align-items: center; gap: 6px; font-size: 14px; }
.ui-tb__logo { display: inline-flex; align-items: flex-end; gap: 2px; height: 14px; margin-right: 4px; }
.ui-tb__logo i { width: 3px; border-radius: 1px; background: var(--ui-tb-accent); }
.ui-tb__logo i:nth-child(1) { height: 6px; opacity: 0.45; }
.ui-tb__logo i:nth-child(2) { height: 10px; opacity: 0.7; }
.ui-tb__logo i:nth-child(3) { height: 14px; }
.ui-tb__crumb { display: inline-flex; align-items: center; gap: 6px; white-space: nowrap; color: var(--ui-tb-muted); }
/* Phone width: only the last two steps of the path, so the breadcrumb stays on one line */
@container (max-width: 420px) {
  .ui-tb__crumb:not(:nth-last-of-type(-n + 2)) { display: none; }
}
.ui-tb__crumb svg { color: #c4c4c4; }
.ui-tb__crumb[aria-current] { color: var(--ui-tb-ink); font-weight: 500; }

.ui-tb__icon {
  position: relative;
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
  padding: 0;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: var(--ui-tb-muted) !important;
  transition: background-color 140ms ease, color 140ms ease;
}
.ui-tb__icon:hover { background: #f3f3f3; color: var(--ui-tb-ink) !important; }
.ui-tb__icon[aria-pressed="true"], .ui-tb__icon[data-active] { background: #eef3ff; color: var(--ui-tb-accent) !important; }
.ui-tb__dot { position: absolute; top: 4px; right: 4px; width: 6px; height: 6px; border-radius: 50%; background: var(--ui-tb-accent); }

.ui-tb__bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  min-height: 46px;
  padding: 0 12px 0 18px;
}
.ui-tb__count { font-size: 13px; font-variant-numeric: tabular-nums; white-space: nowrap; color: var(--ui-tb-text); }
.ui-tb__count span { color: var(--ui-tb-muted); }
.ui-tb__tools { display: flex; align-items: center; gap: 4px; }
.ui-tb__search {
  display: flex;
  align-items: center;
  gap: 6px;
  width: clamp(110px, 30vw, 170px);
  height: 30px;
  margin-right: 4px;
  padding: 0 10px;
  border-radius: 9px;
  background: #f5f5f5;
  color: var(--ui-tb-muted);
  transition: box-shadow 160ms ease, background-color 160ms ease;
}
.ui-tb__search:focus-within { background: #fff; box-shadow: 0 0 0 1px var(--ui-tb-accent), 0 0 0 3px rgba(47, 107, 255, 0.12); }
.ui-tb__search input { flex: 1; min-width: 0; border: 0; outline: none; background: transparent; font: inherit; font-size: 13px; color: var(--ui-tb-ink); }
.ui-tb__search input::-webkit-search-cancel-button { display: none; }
.ui-tb__menu-wrap { position: relative; }
.ui-tb__menu {
  position: absolute;
  top: calc(100% + 6px);
  right: 0;
  z-index: 8;
  display: grid;
  gap: 2px;
  min-width: 180px;
  padding: 6px 4px 4px;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 0 0 1px #e5e5e5, 0 12px 30px -8px rgba(0, 0, 0, 0.2);
  animation: ui-tb-drop 180ms var(--ui-tb-ease);
}
.ui-tb__menu-title { margin: 0 0 2px; padding: 0 10px; font-size: 11.5px; color: var(--ui-tb-muted); }
.ui-tb__menu-item {
  display: flex;
  align-items: center;
  gap: 8px;
  height: 30px;
  padding: 0 10px;
  border: 0;
  border-radius: 8px;
  background: transparent;
  font-size: 13px !important;
  text-align: left;
}
.ui-tb__menu-item svg { margin-left: auto; color: var(--ui-tb-accent); }
.ui-tb__menu-item:hover { background: #f5f5f5; }
.ui-tb__menu-clear { color: var(--ui-tb-muted) !important; }
.ui-tb__swatch { flex: none; width: 8px; height: 8px; border-radius: 2px; }
.ui-tb__swatch--dot { border-radius: 50%; }
.ui-tb__prio-on { fill: #525252; }
.ui-tb__prio-off { fill: #d4d4d4; }
.ui-tb__ring-track { stroke: #e0e0e0; }

/* Columns: gray lanes like our trays, white cards on top */
.ui-tb__columns {
  display: grid;
  grid-auto-columns: minmax(224px, 1fr);
  grid-auto-flow: column;
  gap: 10px;
  padding: 0 12px 12px;
  overflow-x: auto;
  scrollbar-width: thin;
}
.ui-tb__column {
  display: flex;
  flex-direction: column;
  min-height: 300px;
  padding: 4px 6px 6px;
  border-radius: 16px;
  background: var(--ui-tb-tray);
  transition: background-color 160ms ease, box-shadow 160ms ease;
}
.ui-tb__column[data-over] { background: #eaeffc; box-shadow: inset 0 0 0 1px #cddbff; }
.ui-tb__col-head { display: flex; align-items: center; gap: 8px; height: 38px; padding: 0 4px 0 8px; }
.ui-tb__col-title { font-size: 13.5px; font-weight: 500; }
.ui-tb__col-count { font-size: 12.5px; font-variant-numeric: tabular-nums; color: var(--ui-tb-muted); }
.ui-tb__add { margin-left: auto; }
.ui-tb__status { display: grid; place-items: center; flex: none; width: 15px; height: 15px; }
.ui-tb__status svg { width: 15px; height: 15px; }
.ui-tb__cards { display: grid; align-content: start; gap: 6px; flex: 1; }
.ui-tb__slot { display: grid; gap: 6px; }

.ui-tb__card {
  padding: 10px 12px 11px;
  border-radius: 12px;
  background: var(--ui-tb-card);
  box-shadow: 0 0 0 1px #e8e8e8, 0 1px 2px rgba(0, 0, 0, 0.04);
  cursor: grab;
  animation: ui-tb-in 320ms var(--ui-tb-ease) both;
  transition: box-shadow 160ms ease, opacity 160ms ease, transform 200ms var(--ui-tb-ease);
}
.ui-tb__card:hover { box-shadow: 0 0 0 1px #dcdcdc, 0 6px 16px -8px rgba(0, 0, 0, 0.14); }
.ui-tb__card:active { cursor: grabbing; }
.ui-tb__card[data-dragging] { opacity: 0.35; transform: scale(0.98); }
.ui-tb__card-top { display: flex; align-items: center; justify-content: space-between; min-height: 18px; }
.ui-tb__key { font-size: 12px; font-variant-numeric: tabular-nums; color: var(--ui-tb-muted); }
.ui-tb__avatar { flex: none; border-radius: 50%; object-fit: cover; box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.06); }
.ui-tb__avatar--initials { display: grid; place-items: center; background: #eef3ff; font-size: 9px; font-weight: 600; color: var(--ui-tb-accent); }
.ui-tb__card-title { display: flex; gap: 8px; margin: 4px 0 0; font-size: 13.5px; font-weight: 450; line-height: 19px; }
.ui-tb__card-title .ui-tb__status { margin-top: 2px; }
.ui-tb__props { display: flex; flex-wrap: wrap; gap: 5px; margin-top: 9px; }
.ui-tb__prop {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  height: 22px;
  padding: 0 7px;
  border-radius: 7px;
  box-shadow: inset 0 0 0 1px #ebebeb;
  font-size: 11.5px;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
  color: var(--ui-tb-text);
}
.ui-tb__prop svg { flex: none; color: var(--ui-tb-muted); }
.ui-tb__prop[data-tone="soon"] { color: #b45309; }
.ui-tb__prop[data-tone="soon"] svg { color: #f59e0b; }
.ui-tb__prop[data-tone="late"] { color: #db2777; background: #fff5f9; box-shadow: inset 0 0 0 1px #fde0ec; }
.ui-tb__prop[data-tone="late"] svg { color: #ec4899; }
.ui-tb__created { margin: 9px 0 0; font-size: 11.5px; color: var(--ui-tb-muted); }
.ui-tb[data-compact] .ui-tb__props, .ui-tb[data-compact] .ui-tb__created { display: none; }

.ui-tb__drop { display: block; height: 3px; margin: -1px 4px; border-radius: 2px; background: var(--ui-tb-accent); animation: ui-tb-grow 160ms var(--ui-tb-ease); }
.ui-tb__empty {
  display: grid;
  place-items: center;
  height: 80px;
  margin: 0;
  border: 1px dashed #d9d9d9;
  border-radius: 12px;
  font-size: 12.5px;
  color: var(--ui-tb-muted);
}
.ui-tb__new input {
  width: 100%;
  height: 40px;
  padding: 0 12px;
  border: 0;
  border-radius: 12px;
  outline: none;
  background: #fff;
  box-shadow: 0 0 0 1px var(--ui-tb-accent), 0 0 0 3px rgba(47, 107, 255, 0.12);
  font: inherit;
  font-size: 13.5px;
}

/* Detail panel */
.ui-tb__scrim {
  position: absolute;
  inset: 0;
  z-index: 9;
  background: rgba(23, 23, 23, 0.08);
  opacity: 0;
  pointer-events: none;
  transition: opacity 240ms ease;
}
.ui-tb__scrim[data-open] { opacity: 1; pointer-events: auto; }
.ui-tb__panel {
  position: absolute;
  top: 8px;
  right: 8px;
  bottom: 8px;
  z-index: 10;
  display: flex;
  flex-direction: column;
  width: min(360px, calc(100% - 16px));
  padding: 14px 16px 14px;
  overflow-y: auto;
  border-radius: 16px;
  background: #fff;
  box-shadow: 0 0 0 1px #e5e5e5, 0 20px 50px -12px rgba(0, 0, 0, 0.25);
  transform: translateX(calc(100% + 24px));
  transition: transform 380ms var(--ui-tb-ease);
}
.ui-tb__panel[data-open] { transform: none; }
.ui-tb__panel-head { display: flex; align-items: center; justify-content: space-between; }
.ui-tb__title-input {
  margin: 8px -6px 0;
  padding: 4px 6px;
  border: 0;
  border-radius: 8px;
  outline: none;
  resize: none;
  font: inherit;
  font-size: 17px;
  font-weight: 600;
  line-height: 23px;
  color: var(--ui-tb-ink);
}
.ui-tb__title-input:focus { background: #f7f7f7; }
.ui-tb__fields { display: grid; gap: 6px; margin: 14px 0 0; }
.ui-tb__fields dt { margin-top: 8px; font-size: 12px; color: var(--ui-tb-muted); }
.ui-tb__fields dd { margin: 0; }
.ui-tb__choices { display: flex; flex-wrap: wrap; gap: 5px; }
.ui-tb__choice {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 28px;
  padding: 0 9px;
  border: 0;
  border-radius: 8px;
  background: #fff;
  box-shadow: inset 0 0 0 1px #e8e8e8;
  font-size: 12.5px !important;
  color: var(--ui-tb-text) !important;
  transition: background-color 140ms ease, box-shadow 140ms ease;
}
.ui-tb__choice:hover { background: #f7f7f7; }
.ui-tb__choice[aria-pressed="true"] { background: #eef3ff; box-shadow: inset 0 0 0 1px #cddbff; color: var(--ui-tb-ink) !important; }
.ui-tb__panel-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
  padding-top: 16px;
  font-size: 12px;
  color: var(--ui-tb-muted);
}
.ui-tb__delete { height: 28px; padding: 0 10px; border: 0; border-radius: 8px; background: transparent; font-size: 12.5px !important; color: #e5484d !important; }
.ui-tb__delete:hover { background: #fff1f1; }

@keyframes ui-tb-in { from { opacity: 0; transform: translateY(3px); } }
@keyframes ui-tb-drop { from { opacity: 0; transform: translateY(-4px) scale(0.98); } }
@keyframes ui-tb-grow { from { transform: scaleX(0.6); opacity: 0; } }
@media (prefers-reduced-motion: reduce) {
  .ui-tb__card, .ui-tb__menu, .ui-tb__drop { animation: none; }
  .ui-tb__panel, .ui-tb__scrim, .ui-tb__card { transition: none; }
}


/* Text fields: no focus box while typing – also against global :focus-visible rules of the host page */
.ui-tb input:not([type="checkbox"]):not([type="radio"]):focus-visible,
.ui-tb textarea:focus-visible,
.ui-tb [contenteditable]:focus-visible { outline: none; }
/* Dark mode: follows a .dark class or data-theme="dark" on any ancestor, e.g. <html> */
:where(.dark, [data-theme="dark"]) .ui-tb {
  --ui-tb-tray: #161618;
  --ui-tb-card: #232326;
  --ui-tb-line: rgba(255, 255, 255, 0.08);
  --ui-tb-ink: #ededed;
  --ui-tb-text: #c4c4c4;
  --ui-tb-muted: #8f8f8f;
  background: #232326;
  border-color: rgba(255, 255, 255, 0.08);
}
:where(.dark, [data-theme="dark"]) .ui-tb__crumb svg { color: #6b6b70; }
:where(.dark, [data-theme="dark"]) .ui-tb__icon:hover { background: rgba(255, 255, 255, 0.06); }
:where(.dark, [data-theme="dark"]) .ui-tb__icon[aria-pressed="true"],
:where(.dark, [data-theme="dark"]) .ui-tb__icon[data-active] { background: rgba(47, 107, 255, 0.16); color: #6b95ff !important; }
:where(.dark, [data-theme="dark"]) .ui-tb__search { background: #2a2a2d; }
:where(.dark, [data-theme="dark"]) .ui-tb__search:focus-within { background: #2a2a2d; box-shadow: 0 0 0 1px var(--ui-tb-accent), 0 0 0 3px rgba(47, 107, 255, 0.24); }
:where(.dark, [data-theme="dark"]) .ui-tb__menu { background: #2a2a2d; box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1), 0 12px 30px -8px rgba(0, 0, 0, 0.5); }
:where(.dark, [data-theme="dark"]) .ui-tb__menu-item:hover { background: rgba(255, 255, 255, 0.06); }
:where(.dark, [data-theme="dark"]) .ui-tb__menu-item svg { color: #6b95ff; }
:where(.dark, [data-theme="dark"]) .ui-tb__column[data-over] { background: rgba(47, 107, 255, 0.12); box-shadow: inset 0 0 0 1px rgba(47, 107, 255, 0.4); }
:where(.dark, [data-theme="dark"]) .ui-tb__card { box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.08), 0 1px 2px rgba(0, 0, 0, 0.4); }
:where(.dark, [data-theme="dark"]) .ui-tb__card:hover { box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.14), 0 6px 16px -8px rgba(0, 0, 0, 0.5); }
:where(.dark, [data-theme="dark"]) .ui-tb__avatar { box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.08); }
:where(.dark, [data-theme="dark"]) .ui-tb__avatar--initials { background: rgba(47, 107, 255, 0.16); color: #6b95ff; }
:where(.dark, [data-theme="dark"]) .ui-tb__prop { box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.1); }
:where(.dark, [data-theme="dark"]) .ui-tb__prop[data-tone="soon"] { color: #fbbf24; }
:where(.dark, [data-theme="dark"]) .ui-tb__prop[data-tone="late"] { color: #f472b6; background: rgba(236, 72, 153, 0.14); box-shadow: inset 0 0 0 1px rgba(236, 72, 153, 0.28); }
:where(.dark, [data-theme="dark"]) .ui-tb__prio-on { fill: #c4c4c4; }
:where(.dark, [data-theme="dark"]) .ui-tb__prio-off { fill: #4a4a4f; }
:where(.dark, [data-theme="dark"]) .ui-tb__ring-track { stroke: rgba(255, 255, 255, 0.14); }
:where(.dark, [data-theme="dark"]) .ui-tb__empty { border-color: rgba(255, 255, 255, 0.14); }
:where(.dark, [data-theme="dark"]) .ui-tb__new input { background: #2a2a2d; color: var(--ui-tb-ink); box-shadow: 0 0 0 1px var(--ui-tb-accent), 0 0 0 3px rgba(47, 107, 255, 0.24); }
:where(.dark, [data-theme="dark"]) .ui-tb__scrim { background: rgba(0, 0, 0, 0.4); }
:where(.dark, [data-theme="dark"]) .ui-tb__panel { background: #232326; box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1), 0 20px 50px -12px rgba(0, 0, 0, 0.6); }
:where(.dark, [data-theme="dark"]) .ui-tb__title-input { background: transparent; }
:where(.dark, [data-theme="dark"]) .ui-tb__title-input:focus { background: #2a2a2d; }
:where(.dark, [data-theme="dark"]) .ui-tb__choice { background: #2a2a2d; box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.08); }
:where(.dark, [data-theme="dark"]) .ui-tb__choice:hover { background: #313135; }
:where(.dark, [data-theme="dark"]) .ui-tb__choice[aria-pressed="true"] { background: rgba(47, 107, 255, 0.16); box-shadow: inset 0 0 0 1px rgba(47, 107, 255, 0.45); }
:where(.dark, [data-theme="dark"]) .ui-tb__delete { color: #ff6b70 !important; }
:where(.dark, [data-theme="dark"]) .ui-tb__delete:hover { background: rgba(229, 72, 77, 0.14); }
`;
var demoStatuses = [
  {
    id: `todo`,
    label: `Todo`,
    icon: <StatusIcon kind={`todo`} color={`#8f8f8f`} />,
  },
  {
    id: `review`,
    label: `In review`,
    icon: <StatusIcon kind={`review`} color={`#8b5cf6`} />,
  },
  {
    id: `next`,
    label: `Up next`,
    icon: <StatusIcon kind={`backlog`} color={`#7aa2ff`} />,
  },
  {
    id: `progress`,
    label: `In progress`,
    icon: <StatusIcon kind={`progress`} color={`#f59e0b`} />,
  },
  {
    id: `done`,
    label: `Done`,
    icon: <StatusIcon kind={`done`} color={`#2f6bff`} />,
  },
];
var demoLabels = [
  {
    id: `web`,
    label: `Website`,
    color: `#2f6bff`,
  },
  {
    id: `billing`,
    label: `Billing`,
    color: `#8b5cf6`,
  },
  {
    id: `mobile`,
    label: `Mobile`,
    color: `#14b8a6`,
  },
  {
    id: `bug`,
    label: `Bug`,
    color: `#ec4899`,
  },
  {
    id: `feature`,
    label: `Feature`,
    color: `#a9c1ff`,
  },
];
var demoPeople = [
  {
    id: `mara`,
    name: `Mara Lindqvist`,
    avatar: `data:image/jpeg;base64,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`,
  },
  {
    id: `jonas`,
    name: `Jonas Weber`,
    avatar: `data:image/jpeg;base64,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`,
  },
  {
    id: `lena`,
    name: `Lena Hart`,
    avatar: `data:image/jpeg;base64,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`,
  },
  {
    id: `theo`,
    name: `Theo Brandt`,
    avatar: `data:image/jpeg;base64,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`,
  },
  {
    id: `sofia`,
    name: `Sofia Marin`,
    avatar: `data:image/jpeg;base64,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`,
  },
];
var demoTasks = [
  {
    id: `1`,
    key: `NW-214`,
    title: `Add the launch banner to the marketing site`,
    status: `todo`,
    priority: 2,
    estimate: `M`,
    labels: [`web`, `feature`],
    assignee: `mara`,
    created: `Oct 2`,
  },
  {
    id: `2`,
    key: `NW-209`,
    title: `Currency rounding in annual invoices`,
    status: `todo`,
    priority: 3,
    labels: [`billing`, `bug`],
    assignee: `theo`,
    dueIn: 2,
    created: `Sep 28`,
  },
  {
    id: `3`,
    key: `NW-197`,
    title: `Follow up with the beta customers about pricing`,
    status: `todo`,
    priority: 1,
    labels: [],
    assignee: `sofia`,
    subtasks: [2, 4],
    created: `Sep 24`,
  },
  {
    id: `4`,
    key: `NW-221`,
    title: `Review the onboarding copy for the new plans`,
    status: `review`,
    priority: 2,
    labels: [`web`],
    assignee: `lena`,
    dueIn: 1,
    created: `Oct 2`,
  },
  {
    id: `5`,
    key: `NW-205`,
    title: `Add usage limits to the plan comparison table`,
    status: `review`,
    priority: 3,
    estimate: `L`,
    labels: [`web`, `feature`],
    assignee: `jonas`,
    created: `Sep 27`,
  },
  {
    id: `6`,
    key: `NW-188`,
    title: `Push notification opt-in on iOS`,
    status: `review`,
    priority: 2,
    labels: [`mobile`],
    assignee: `mara`,
    pullRequest: 412,
    created: `Sep 21`,
  },
  {
    id: `7`,
    key: `NW-226`,
    title: `Record the launch walkthrough video`,
    status: `next`,
    priority: 4,
    labels: [`feature`],
    assignee: `sofia`,
    dueIn: -1,
    created: `Oct 1`,
  },
  {
    id: `8`,
    key: `NW-217`,
    title: `Plan the press outreach for launch week`,
    status: `next`,
    priority: 2,
    estimate: `S`,
    labels: [],
    assignee: `lena`,
    created: `Sep 30`,
  },
  {
    id: `9`,
    key: `NW-199`,
    title: `Summarize the beta feedback into one doc`,
    status: `next`,
    priority: 1,
    labels: [],
    assignee: `theo`,
    subtasks: [1, 3],
    created: `Sep 25`,
  },
  {
    id: `10`,
    key: `NW-230`,
    title: `Export guide for the help center`,
    status: `progress`,
    priority: 2,
    labels: [`web`],
    assignee: `jonas`,
    created: `Sep 30`,
  },
  {
    id: `11`,
    key: `NW-201`,
    title: `Proration when teams add seats mid-month`,
    status: `progress`,
    priority: 3,
    labels: [`billing`],
    assignee: `theo`,
    dueIn: 4,
    created: `Sep 23`,
  },
  {
    id: `12`,
    key: `NW-176`,
    title: `Offline mode for the task list`,
    status: `progress`,
    priority: 2,
    estimate: `XL`,
    labels: [`mobile`, `feature`],
    assignee: `mara`,
    pullRequest: 398,
    created: `Sep 16`,
  },
  {
    id: `13`,
    key: `NW-160`,
    title: `Dark mode for the dashboard`,
    status: `done`,
    priority: 2,
    labels: [`web`, `feature`],
    assignee: `lena`,
    created: `Sep 12`,
  },
  {
    id: `14`,
    key: `NW-171`,
    title: `Fix crash when uploading large avatars`,
    status: `done`,
    priority: 3,
    labels: [`mobile`, `bug`],
    assignee: `jonas`,
    created: `Sep 15`,
  },
];
var demoBoardWidth = 1240;
function TaskBoardDemo2() {
  let rootRef = React.useRef<HTMLDivElement | null>(null),
    [fit, setFit] = React.useState<{ scale: number; card: boolean } | null>(
      null,
    );
  return (
    React.useLayoutEffect(() => {
      let t = rootRef.current,
        r = t?.closest(`.card__preview`),
        i = r ?? t?.closest(`.stage`);
      if (!t || !i) return;
      let a = () => {
        let e = i.clientWidth;
        if (r)
          return setFit({
            scale: (e - 48) / demoBoardWidth,
            card: true,
          });
        if (e < 760) return setFit(null);
        setFit({
          scale: Math.min(0.8, (e - 120) / demoBoardWidth),
          card: false,
        });
      };
      a();
      let o = new ResizeObserver(a);
      return (o.observe(i), () => o.disconnect());
    }, []),
    (
      <div
        ref={rootRef}
        className={`board-demo`}
        data-fit={fit ? (fit.card ? `card` : `stage`) : void 0}
      >
        <div
          className={`board-demo__frame`}
          style={
            fit
              ? fit.card
                ? {
                    width: demoBoardWidth,
                    transform: `scale(${fit.scale})`,
                  }
                : {
                    width: demoBoardWidth,
                    zoom: fit.scale,
                  }
              : void 0
          }
        >
          <TaskBoard
            tasks={demoTasks}
            statuses={demoStatuses}
            labels={demoLabels}
            people={demoPeople}
          />
        </div>
      </div>
    )
  );
}
const demoStyles =
  ".board-demo{align-self:stretch;width:100%;min-width:0;padding:20px 16px}.board-demo[data-fit=stage]{justify-items:center;padding:32px 0;display:grid}.card__preview .board-demo{padding:0;position:absolute;inset:0;overflow:hidden;-webkit-mask-image:linear-gradient(#000 72%,#0000);mask-image:linear-gradient(#000 72%,#0000)}.board-demo[data-fit=card] .board-demo__frame{transform-origin:0 0;position:absolute;top:44px;left:24px}.board-demo__frame{min-width:0}\n";
function TaskBoardDemo() {
  return (
    <>
      <style href="plico-demo-task-board" precedence="default">
        {demoStyles}
      </style>
      <TaskBoardDemo2 />
    </>
  );
}
export { TaskBoard as Component };
export { TaskBoardDemo as Demo };
export { TaskBoard };
export { TaskBoardDemo };
export default TaskBoard;

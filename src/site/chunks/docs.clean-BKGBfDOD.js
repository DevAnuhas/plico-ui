import {brand} from '../../lib/brand.js';
function localText(value){return value.replaceAll('__PLICO_ORIGIN__',brand.url).replaceAll('__PLICO_REPO__',brand.repoUrl)}
var e = {
  requirements: [`React 19`],
  whenToUse: [`Agent products where several tasks run in the background and people come back to see what finished, what failed and what waits for them`, `A home screen or dashboard that collects approvals from many runs in one calm board, instead of one modal per agent`, `Job queues in general – imports, syncs, evaluations – where each job has a short description, a short history and one next step`],
  whenNotToUse: [`One single approval in the flow of a chat – use Approval Card`, `The plan of one run, step by step – use Agent Plan; for a single tool call use Tool Call Card`, `Hundreds of jobs – the board is for a few dozen at most; page or search a bigger queue in a table`],
  usage: "import AgentInbox from \"@/components/plico/agent-inbox-clean\";\nfunction Tasks() {\n  return <AgentInbox tasks={[{\n    id: \"migrate\",\n    title: \"Migrate users table\",\n    description: \"Split users into accounts and profiles. The dry run on staging passed.\",\n    agent: \"Opus 5.5\",\n    status: \"waiting\",\n    startedAt: Date.now() - 6 * 6e4,\n    tools: 14,\n    sources: 9,\n    steps: [{\n      label: \"Dry run on staging \\u2013 no errors\",\n      time: \"2m ago\"\n    }, {\n      label: \"Wants to run it on production\",\n      time: \"1m ago\"\n    }]\n  }, {\n    id: \"notes\",\n    title: \"Release notes v2.4\",\n    agent: \"Sonnet 5.5\",\n    status: \"running\",\n    startedAt: Date.now() - 8e4\n  }, {\n    id: \"digest\",\n    title: \"Weekly metrics digest\",\n    agent: \"Haiku 5.5\",\n    status: \"done\",\n    elapsed: 252e3\n  }]} />;\n}\nexport { Tasks };",
  examples: [{
    title: `Wired to your task queue`,
    code: "const {\n  tasks,\n  approve,\n  reject,\n  retry\n} = useAgentTasks();\n<AgentInbox\n  tasks={tasks}\n  onApprove={(task) => approve(task.id)}\n  onReject={(task) => reject(task.id)}\n  onRetry={(task) => retry(task.id)}\n  onOpen={(task) => router.push(`/tasks/${task.id}`)}\n  title=\"Background tasks\"\n/>;"
  }, {
    title: `As a list in a side panel`,
    code: "<AgentInbox tasks={initialTasks} defaultView=\"list\" />;"
  }],
  props: [{
    name: `tasks`,
    type: `AgentTask[]`,
    description: `{ id, title, description?, agent, status, startedAt?, elapsed?, tools?, sources?, steps? } – status is "running", "waiting", "done" or "failed"; steps are { label, time? }, oldest first`
  }, {
    name: `onApprove`,
    type: `(task: AgentTask) => void`,
    description: `Approve on a waiting task. Without it the task turns running inside the board`
  }, {
    name: `onReject`,
    type: `(task: AgentTask) => void`,
    description: `Reject on a waiting task. Without it the task turns failed`
  }, {
    name: `onRetry`,
    type: `(task: AgentTask) => void`,
    description: `Retry on a failed task. Without it the task runs again and its clock starts over`
  }, {
    name: `onOpen`,
    type: `(task: AgentTask) => void`,
    description: `Shows an Open button on running and done tasks`
  }, {
    name: `title`,
    type: `string`,
    default: `"Agent inbox"`,
    description: `Heading on the left of the bar, after "Agents /"`
  }, {
    name: `view`,
    type: `"board" | "list"`,
    description: `Controlled layout`
  }, {
    name: `defaultView`,
    type: `"board" | "list"`,
    default: `"board"`,
    description: `Starting layout when uncontrolled`
  }, {
    name: `onViewChange`,
    type: `(view: AgentInboxView) => void`,
    description: `Called when Board or List is picked`
  }, {
    name: `className`,
    type: `string`,
    description: `Extra class on the root`
  }],
  keyboard: [{
    keys: [`Tab`],
    description: `Through the layout switch, the cards and the buttons inside an open card`
  }, {
    keys: [`Enter`, `Space`],
    description: `Opens or closes a card, presses Approve, Reject, Retry or Open`
  }, {
    keys: [`Esc`],
    description: `Closes the open card and puts focus back on it`
  }],
  accessibility: [`Each column is a labeled section; each card is a button with aria-expanded, and a closed card's details are inert`, `Board / List is a radio group`, `A polite live region says how many tasks need you and how many run`],
  motion: [`Running tasks spin a small ring and their clock ticks every second`, `When a status changes, the card shows its new state in place first, then glides over to its new column (FLIP)`, `Cards open in place to the last steps as a tiny timeline and the buttons for what you can do now`, `With prefers-reduced-motion everything switches without movement`],
  responsive: [`Three columns from about 620px; narrower containers always get the list and hide the switch – it works down to 300px`, `Touch screens: taller cards and buttons`, `Dark mode built in: switches when an ancestor (usually <html>) has the class dark or data-theme="dark"`],
  aiNotes: [`Pass startedAt for running and waiting tasks so the clock ticks; pass elapsed for finished ones`, `Columns: Needs you holds waiting and failed tasks, then Running and Done; inside a column the cards keep your order`, `Keep the description to one or two sentences on what the task is about or where it stands – it is clamped to two lines`, `With a handler the board never changes a status by itself – update the task in your state and the card follows`],
  related: [`approval-card`, `agent-plan`, `tool-call-card`, `decision-inbox`]
};
export { e as docs };

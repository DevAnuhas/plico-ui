import { brand } from "../../lib/brand.js";
function localText(value) {
  return value
    .replaceAll("__PLICO_ORIGIN__", brand.url)
    .replaceAll("__PLICO_REPO__", brand.repoUrl);
}
var e = {
  requirements: [
    `React 19`,
    `App Shell, Assistant Home (for its composer) and Button (installed with it)`,
  ],
  whenToUse: [
    `The main view of an AI agent or copilot product`,
    `Chats that end in a concrete task – a brief, a draft, a report`,
  ],
  whenNotToUse: [`Plain support chat – a lighter chat layout is enough`],
  usage:
    'import AgentChatScreen from "@/components/plico/agent-chat";\nfunction Page() {\n  return <AgentChatScreen workspace="Acme" user={{\n    name: "Alex Morgan"\n  }} onNavigate={label => router.push(routes[label])} />;\n}\nexport { Page as default };',
  props: [
    {
      name: `onNavigate`,
      type: `(label: string) => void`,
      description: `Called with the label of a sidebar item`,
    },
    {
      name: `workspace`,
      type: `string`,
      default: `"Acme"`,
      description: `Workspace name in the sidebar`,
    },
    {
      name: `user`,
      type: `{ name: string; avatar?: string }`,
      default: `{ name: "Alex Morgan" }`,
      description: `Account at the bottom of the sidebar`,
    },
    {
      name: `className`,
      type: `string`,
      description: `Extra class on the root`,
    },
  ],
  accessibility: [
    `Sidebar items, tabs and toolbar actions are real buttons with labels`,
    `Icons are decorative and hidden from screen readers`,
  ],
  responsive: [
    `Fills its container – give it the full viewport height in your app`,
    `Dark mode built in: switches when an ancestor (usually <html>) has the class dark or data-theme="dark"; colors are CSS variables on .ui-as`,
  ],
};
export { e as docs };

import { brand } from "../../lib/brand.js";
function localText(value) {
  return value
    .replaceAll("__PLICO_ORIGIN__", brand.url)
    .replaceAll("__PLICO_REPO__", brand.repoUrl);
}
var e = {
  requirements: [`React 19`],
  whenToUse: [
    `Agency, accounting and CRM tools where a team keeps goals, files and decisions per client`,
    `Product pages for AI tools – show the context that makes every answer fit the client`,
  ],
  whenNotToUse: [
    `A full activity log with hundreds of events – page or virtualise it instead`,
    `Real-time collaboration – the timeline adds entries locally and leaves syncing to you`,
  ],
  usage:
    'import ClientContext from "@/components/plico/client-context";\nfunction ClientPage() {\n  return <ClientContext me={{\n    name: "Lena Hart",\n    avatar: "/avatars/lena.jpg"\n  }} onAddContext={(clientId, text, files) => api.addContext(clientId, {\n    text,\n    files\n  })} onCreateClient={name => api.createClient(name)} />;\n}\nexport { ClientPage };',
  props: [
    {
      name: `clients`,
      type: `ContextClient[]`,
      description: `Each { id, name, meta, mark, kpis, reports, context } – the switcher lists them all`,
    },
    {
      name: `context entries`,
      type: `ContextEntry[]`,
      description: `note ("@Report name" becomes a mention), report, files (type pdf · xlsx · csv · doc) or integration { app, connected }`,
    },
    {
      name: `me`,
      type: `{ name, avatar? }`,
      description: `Author of new context`,
    },
    {
      name: `onAddContext`,
      type: `(clientId, text, files) => void`,
      description: `Called when context is added`,
    },
    {
      name: `onCreateClient`,
      type: `(name) => void`,
      description: `Called when a client is created from the switcher`,
    },
    {
      name: `className`,
      type: `string`,
      description: `Extra class on the root`,
    },
  ],
  keyboard: [
    {
      keys: [`⌘`, `Enter`],
      description: `Adds the context you typed`,
    },
    {
      keys: [`@`],
      description: `Suggests the client's reports – Enter or Tab inserts the first`,
    },
    {
      keys: [`Esc`],
      description: `Closes the switcher, the filter and the mention suggestions`,
    },
    {
      keys: [`Tab`],
      description: `Moves through the switcher, tabs, search, filter and composer`,
    },
  ],
  accessibility: [
    `Tabs are a tablist with a labelled panel; the client switcher, filter and mention suggestions are listboxes`,
    `KPI cards and financial rows are toggle buttons; reports are disclosure buttons with aria-expanded`,
    `Search, composer and attachment buttons are labelled; settings are switches`,
  ],
  motion: [
    `KPI cards rise in one after another and their sparklines draw in; new context slides in at the top`,
    `The tab thumb glides with a little spring, reports fold open, menus pop from their button, sync icons spin while working`,
    `With prefers-reduced-motion everything switches instantly`,
  ],
  responsive: [
    `Follows its own width: below 680px the KPIs wrap into two rows, the tabs stretch and search moves below them`,
    `Dark mode built in: switches when an ancestor (usually <html>) has the class dark or data-theme="dark"`,
  ],
};
export { e as docs };

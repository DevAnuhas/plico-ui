import { brand } from "../../lib/brand.js";
function localText(value) {
  return value
    .replaceAll("__PLICO_ORIGIN__", brand.url)
    .replaceAll("__PLICO_REPO__", brand.repoUrl);
}
var e = {
  requirements: [`React 19`, `App Shell (installed with it)`],
  whenToUse: [
    `File, knowledge or document areas in an app`,
    `Overviews of projects or workspaces as cards`,
  ],
  whenNotToUse: [`Thousands of files – use a virtualised table`],
  usage:
    'import FilesScreen from "@/components/plico/files";\nfunction Page() {\n  return <FilesScreen workspace="Acme" user={{\n    name: "Alex Morgan"\n  }} onNavigate={label => router.push(routes[label])} />;\n}\nexport { Page as default };',
  props: [
    {
      name: `onNavigate`,
      type: `(label: string) => void`,
      description: `Called with the label of a sidebar item or project`,
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
    `Sidebar items, projects and the collapse toggle are real buttons with labels`,
    `Icons are decorative and hidden from screen readers`,
  ],
  responsive: [
    `Fills its container – give it the full viewport height in your app`,
    `Dark mode built in: switches when an ancestor (usually <html>) has the class dark or data-theme="dark"; colors are CSS variables on .ui-as`,
  ],
};
export { e as docs };

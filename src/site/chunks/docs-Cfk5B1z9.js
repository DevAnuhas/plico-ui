import {brand} from '../../lib/brand.js';
function localText(value){return value.replaceAll('__PLICO_ORIGIN__',brand.url).replaceAll('__PLICO_REPO__',brand.repoUrl)}
var e = {
  requirements: [`React 19`],
  whenToUse: [`The base of an AI assistant, internal tool or SaaS dashboard`, `Building your own screens on the same frame as the other Plico UI screens`],
  whenNotToUse: [`Marketing pages – use a block or a plain layout`, `Apps with deep, multi-level navigation trees`],
  usage: "import AppShell from \"@/components/plico/app-shell\";\nfunction Layout({\n  children\n}) {\n  return <AppShell active=\"New chat\" workspace=\"Acme\" user={{\n    name: \"Alex Morgan\"\n  }} onNavigate={label => router.push(routes[label])}>\n      <div className=\"ui-as-page\">{children}</div>\n    </AppShell>;\n}\nexport { Layout };",
  props: [{
    name: `children`,
    type: `ReactNode`,
    description: `The page shown next to the sidebar`
  }, {
    name: `active`,
    type: `string`,
    description: `Label of the menu item or project that is open`
  }, {
    name: `onNavigate`,
    type: `(label: string) => void`,
    description: `Called with the label of a menu item or project when it is clicked`
  }, {
    name: `workspace`,
    type: `string`,
    default: `"Acme"`,
    description: `Workspace name; its first letter becomes the logo`
  }, {
    name: `user`,
    type: `{ name: string; avatar?: string }`,
    default: `{ name: "Alex Morgan" }`,
    description: `Account at the bottom; without an avatar it shows initials`
  }, {
    name: `nav`,
    type: `ShellNavItem[]`,
    default: `New chat, Folders, Integrations`,
    description: `Menu items, each { label, icon }`
  }, {
    name: `projects`,
    type: `string[]`,
    description: `Project list under the menu`
  }, {
    name: `className`,
    type: `string`,
    description: `Extra class on the root`
  }],
  accessibility: [`Sidebar items, projects and the collapse toggle are real buttons with labels`, `Icons are decorative and hidden from screen readers`],
  responsive: [`Fills its container – give it the full viewport height in your app`, `Dark mode built in: switches when an ancestor (usually <html>) has the class dark or data-theme="dark"; colors are CSS variables on .ui-as`]
};
export { e as docs };

import {brand} from '../../lib/brand.js';
function localText(value){return value.replaceAll('__PLICO_ORIGIN__',brand.url).replaceAll('__PLICO_REPO__',brand.repoUrl)}
var e = {
  requirements: [`React 19`, `App Shell, Usage Meter, Segmented Control and Button (installed with it)`],
  whenToUse: [`The settings area of a SaaS or AI product – workspace, team, billing and API access in one place`, `A billing page that shows plan, usage, payment method and invoices together`],
  whenNotToUse: [`A public pricing page – use a dedicated pricing layout`, `Checkout or entering card details – hand that off to your payment provider`],
  usage: "import { Component as SettingsBillingScreen } from \"@/components/plico/settings-billing\";\nfunction Page() {\n  return <SettingsBillingScreen defaultTab=\"Billing\" workspace=\"Acme\" user={{\n    name: \"Alex Morgan\"\n  }} onNavigate={(label) => router.push(routes[label])} />;\n}\nexport {\n  Page as default\n};",
  props: [{
    name: `defaultTab`,
    type: `"General" | "Members" | "Billing" | "API keys"`,
    default: `"Billing"`,
    description: `Tab that is open first`
  }, {
    name: `onNavigate`,
    type: `(label: string) => void`,
    description: `Called with the label of a sidebar item`
  }, {
    name: `workspace`,
    type: `string`,
    default: `"Acme"`,
    description: `Workspace name in the sidebar and the General tab`
  }, {
    name: `user`,
    type: `{ name: string; avatar?: string }`,
    default: `{ name: "Alex Morgan" }`,
    description: `Account at the bottom of the sidebar`
  }, {
    name: `className`,
    type: `string`,
    description: `Extra class on the root`
  }],
  accessibility: [`Tabs, the monthly/yearly switch, menus and every row action are real buttons with labels`, `Invoices are a real table with column headers; download buttons name the invoice they download`, `Toasts are announced as a status; icons are decorative and hidden from screen readers`],
  responsive: [`Fills its container – give it the full viewport height in your app`, `Overview and plan cards stack on narrow panels; the invoice table scrolls sideways on phones`, `Dark mode built in: switches when an ancestor (usually <html>) has the class dark or data-theme="dark"; colors are CSS variables on .ui-as`]
};
export { e as docs };

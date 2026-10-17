import {brand} from '../../lib/brand.js';
function localText(value){return value.replaceAll('__PLICO_ORIGIN__',brand.url).replaceAll('__PLICO_REPO__',brand.repoUrl)}
var e = {
  requirements: [`React 19`],
  whenToUse: [`Switching between two to six views of the same content – sections of a dashboard, list / board / calendar, monthly / yearly`, `A choice that applies right away and where every option should stay visible`],
  whenNotToUse: [`More than six options or long labels – use a select or a menu`, `Choices that are confirmed with a Save button inside a form – radio buttons read clearer there`, `Turning one thing on or off – that's a switch`],
  usage: "import { SegmentedControl } from \"@/components/plico/segmented-control\";\nexport function DashboardTabs() {\n  const [section, setSection] = useState(\"overview\");\n  return <SegmentedControl aria-label=\"Dashboard section\" kind=\"tabs\" value={section} onChange={setSection} options={[{\n    value: \"overview\",\n    label: \"Overview\",\n    controls: \"panel-overview\"\n  }, {\n    value: \"analytics\",\n    label: \"Analytics\",\n    controls: \"panel-analytics\"\n  }, {\n    value: \"reports\",\n    label: \"Reports\",\n    controls: \"panel-reports\"\n  }, {\n    value: \"notifications\",\n    label: \"Notifications\",\n    count: unread,\n    controls: \"panel-notifications\"\n  }]} />;\n}",
  examples: [{
    title: `View switch with icons`,
    code: "<SegmentedControl size=\"sm\" aria-label=\"Layout\" defaultValue=\"board\" options={[{\n  value: \"list\",\n  label: \"List\",\n  icon: <ListIcon />\n}, {\n  value: \"board\",\n  label: \"Board\",\n  icon: <BoardIcon />\n}, {\n  value: \"calendar\",\n  label: \"Calendar\",\n  icon: <CalendarIcon />\n}]} />;"
  }, {
    title: `Underline with a badge`,
    code: "<SegmentedControl variant=\"underline\" aria-label=\"Billing period\" value={period} onChange={setPeriod} options={[{\n  value: \"monthly\",\n  label: \"Monthly\"\n}, {\n  value: \"yearly\",\n  label: \"Yearly\",\n  badge: \"Save 20%\"\n}]} />;"
  }],
  props: [{
    name: `options`,
    type: `SegmentOption[]`,
    description: `{ value, label?, icon?, count?, badge?, disabled?, ariaLabel?, controls? } – two to six work best; give icon-only options an ariaLabel`
  }, {
    name: `value`,
    type: `string`,
    description: `Controlled value`
  }, {
    name: `defaultValue`,
    type: `string`,
    default: `first enabled option`,
    description: `Starting value when uncontrolled`
  }, {
    name: `onChange`,
    type: `(value: string) => void`,
    description: `Called with the new value – on click, while dragging the pill and on arrow keys`
  }, {
    name: `size`,
    type: `"sm" | "md" | "lg"`,
    default: `"md"`,
    description: `26, 30 or 36px tall options (40px+ on touch screens)`
  }, {
    name: `variant`,
    type: `"tray" | "underline"`,
    default: `"tray"`,
    description: `A gray track with a raised white pill, or text tabs on a hairline with a sliding line`
  }, {
    name: `fullWidth`,
    type: `boolean`,
    default: `false`,
    description: `Fills its container with equal segments, each as wide as the widest one needs`
  }, {
    name: `kind`,
    type: `"radio" | "tabs"`,
    default: `"radio"`,
    description: `A radiogroup, or a tablist that switches panels (pair with controls on each option)`
  }, {
    name: `disabled`,
    type: `boolean`,
    default: `false`,
    description: `Disables the whole control`
  }, {
    name: `aria-label`,
    type: `string`,
    description: `Names the group – or use aria-labelledby`
  }, {
    name: `className`,
    type: `string`,
    description: `Extra class on the root`
  }],
  keyboard: [{
    keys: [`Tab`],
    description: `Focuses the active option (one tab stop for the whole control)`
  }, {
    keys: [`←`, `→`],
    description: `Moves to and selects the previous or next option, wrapping around; ↑ ↓ too as a radiogroup`
  }, {
    keys: [`Home`, `End`],
    description: `Selects the first or last option`
  }, {
    keys: [`↵`],
    description: `Selects the focused option (Space works too)`
  }],
  accessibility: [`A radiogroup with radios (aria-checked), or a tablist with tabs (aria-selected, aria-controls) with kind="tabs"`, `Roving tabindex: only the active option is in the tab order; disabled options are skipped by the arrow keys`, `The semibold copy of each label is aria-hidden, so names are read once; counts and badges are part of the name`, `Visible focus ring on the focused option`],
  motion: [`The indicator glides to the picked option; the edge facing the target leads, so it stretches a little and settles – calm, no bounce`, `Labels crossfade from regular to semibold while the semibold copy holds the width, so neighbours never shift`, `When a label or count changes, the option and the whole control morph to the new width and the pill follows; a new count blurs in`, `Pressing gives the pill a little (scale 0.97); dragging it across the options selects as you go`, `With prefers-reduced-motion everything switches instantly`],
  responsive: [`If it doesn't fit, it scrolls sideways with soft edges on the sides that hide options and keeps the active one in view`, `Touch screens: options are at least 40px tall; a tap picks on lift, so swiping to scroll never picks by accident`, `Dark mode built in: switches when an ancestor (usually <html>) has the class dark or data-theme="dark"`],
  related: [`date-range-picker`, `filter-menu`, `data-table`]
};
export { e as docs };

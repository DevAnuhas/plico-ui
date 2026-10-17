import {brand} from '../../lib/brand.js';
function localText(value){return value.replaceAll('__PLICO_ORIGIN__',brand.url).replaceAll('__PLICO_REPO__',brand.repoUrl)}
var e = {
  requirements: [`React 19`],
  whenToUse: [`The top of a dashboard: a few headline numbers with their trend, one chart that compares this period with the last, and one product or plan in focus`, `Sales, growth and usage overviews of a SaaS or AI product, above a table or a list`, `When the charts belong together – same range, same filter – and should react as one`],
  whenNotToUse: [`One metric in depth – use KPI Chart or Breakdown Chart`, `Parts of a whole (shares, funnels, rankings) – the board only draws trends over time`, `Reports that are printed or exported – this is built for pointing and switching`],
  usage: "import KpiBoard from \"@/components/plico/kpi-board\";\nconst ranges = [{\n  id: \"7d\",\n  label: \"Last 7 days\"\n}, {\n  id: \"30d\",\n  label: \"Last 30 days\"\n}];\nfunction Overview({\n  data\n}) {\n  return <KpiBoard data={data} ranges={ranges} defaultRange=\"30d\" compareLabel=\"vs. last month\" />;\n}\nexport { Overview };",
  examples: [{
    title: `The shape of one range`,
    code: "const thirtyDays = {\n  stats: [{\n    id: \"revenue\",\n    label: \"Total revenue\",\n    kind: \"money\",\n    labels: [\n      \"13 Sep\",\n      /* … */\n      \"Today\"\n    ],\n    values: [\n      156,\n      171\n      /* … */\n    ],\n    previous: 5128\n  }, {\n    id: \"emails\",\n    label: \"Emails sent\",\n    kind: \"count\",\n    labels,\n    values: [\n      1620\n      /* … */\n    ],\n    previous: 46200\n  }, {\n    id: \"refunds\",\n    label: \"Refunds\",\n    kind: \"count\",\n    labels,\n    values: [\n      1,\n      0\n      /* … */\n    ],\n    previous: 45,\n    lowerIsBetter: true\n  }],\n  overview: {\n    title: \"Sales overview\",\n    labels,\n    current: [\n      122,\n      140\n      /* … */\n    ],\n    previous: [\n      98,\n      101\n      /* … */\n    ],\n    // optional: the lines per filter id – ids without an entry show the two lines above\n    segments: {\n      pro: {\n        current: [\n          80,\n          91\n          /* … */\n        ],\n        previous: [\n          61,\n          66\n          /* … */\n        ]\n      }\n    }\n  },\n  focus: {\n    title: \"Pro license\",\n    note: \"One-time\",\n    metric: \"Licenses sold\",\n    unit: \"licenses\",\n    labels,\n    values: [\n      24,\n      31\n      /* … */\n    ],\n    previous: 742\n  }\n};"
  }, {
    title: `With a second filter and an action`,
    code: "const [range, setRange] = useState(\"30d\");\nconst {\n  data\n} = useOverview(range);\n<KpiBoard data={{\n  [range]: data\n}} ranges={ranges} range={range} onRangeChange={setRange} segments={[{\n  id: \"all\",\n  label: \"All items\"\n}, {\n  id: \"pro\",\n  label: \"Pro\"\n}]} formatMoney={(n) => new Intl.NumberFormat(\"de-DE\", {\n  style: \"currency\",\n  currency: \"EUR\"\n}).format(n)} title=\"Dashboard\" setup={{\n  label: \"Set up\",\n  onClick: () => openProductSettings()\n}} action={{\n  label: \"See full analytics\",\n  onClick: () => router.push(\"/analytics\")\n}} />;"
  }],
  props: [{
    name: `data`,
    type: `Record<string, KpiBoardData>`,
    description: `One data set per range id: { stats, overview, focus }`
  }, {
    name: `ranges`,
    type: `{ id: string; label: string }[]`,
    description: `Options of the date range picker`
  }, {
    name: `range`,
    type: `string`,
    description: `Controlled range id`
  }, {
    name: `defaultRange`,
    type: `string`,
    default: `first range`,
    description: `Starting range when uncontrolled`
  }, {
    name: `onRangeChange`,
    type: `(id: string) => void`,
    description: `Called with the new range`
  }, {
    name: `segments`,
    type: `{ id: string; label: string }[]`,
    description: `A filter inside the overview card, e.g. All items / Pro / Team – it only switches that card's lines; no filter when left out`
  }, {
    name: `segment`,
    type: `string`,
    description: `Controlled segment id`
  }, {
    name: `defaultSegment`,
    type: `string`,
    default: `first segment`,
    description: `Starting segment when uncontrolled`
  }, {
    name: `onSegmentChange`,
    type: `(id: string) => void`,
    description: `Called with the new segment`
  }, {
    name: `compareLabel`,
    type: `string`,
    default: `"vs. last period"`,
    description: `Words after every change`
  }, {
    name: `currentLabel`,
    type: `string`,
    default: `"This period"`,
    description: `Name of the main line in the tooltip and the focus card`
  }, {
    name: `previousLabel`,
    type: `string`,
    default: `"Last period"`,
    description: `Name of the comparison line`
  }, {
    name: `formatMoney`,
    type: `(value: number) => string`,
    default: `$1,234.00`,
    description: `Formats money values`
  }, {
    name: `icon`,
    type: `ReactNode`,
    description: `Icon in the focus card`
  }, {
    name: `title`,
    type: `string`,
    description: `Heading on the left of the bar above the cards`
  }, {
    name: `setup`,
    type: `{ label: string; onClick: () => void }`,
    description: `The small button at the top right of the focus card, e.g. Set up`
  }, {
    name: `action`,
    type: `{ label: string; onClick: () => void }`,
    description: `The button at the bottom of the focus card`
  }, {
    name: `className`,
    type: `string`,
    description: `Extra class on the root`
  }],
  keyboard: [{
    keys: [`Tab`],
    description: `Through the pickers and the action`
  }, {
    keys: [`Enter`, `Space`, `↓`],
    description: `On a picker: opens its menu`
  }, {
    keys: [`↑`, `↓`, `Home`, `End`],
    description: `In an open menu: moves through the choices`
  }, {
    keys: [`Enter`],
    description: `Picks the highlighted choice`
  }, {
    keys: [`Esc`],
    description: `Closes the menu without changing anything`
  }],
  accessibility: [`Every card is a labelled region with its numbers as text; the charts themselves are decorative`, `The pickers are comboboxes with a listbox: the open state, the highlighted and the chosen option are announced`, `Changes carry an arrow or a sign next to the color, and the color follows whether the change is good news (lowerIsBetter)`],
  motion: [`On first view the cards rise in one after another and every line draws itself in from the left`, `Switching the range rolls every number in one shared tween while every line is drawn in again from the left`, `The filter inside the overview does the same for that card only – the other cards stay still`, `Hovering a small card marks the day under the pointer with a dot, its value in a tag and the date on the axis`, `Hovering the overview shows a dark tooltip that compares this period with the last at that day`, `With prefers-reduced-motion everything switches without movement`],
  responsive: [`The date range sits above the cards on the right. Three small cards over a wide overview and the focus card; below 820px of container width the two lower cards take a full row each, below 600px everything stacks`, `It follows its container, not the window`, `Dark mode built in: switches when an ancestor (usually <html>) has the class dark or data-theme="dark"`],
  aiNotes: [`Series may have different numbers of points per range (7 days, 30 days, 13 weeks) – each range is drawn in fresh`, "A stat's value is the sum of its series; `previous` is the total of the period before and drives the change on the right", `The date range sits in the bar above the cards because it changes all of them; the picker inside the overview is the segment and only switches the overview's own lines (overview.segments)`],
  related: [`metrics-dashboard`, `kpi-chart`, `usage-meter`]
};
export { e as docs };

import { brand } from "../../lib/brand.js";
function localText(value) {
  return value
    .replaceAll("__PLICO_ORIGIN__", brand.url)
    .replaceAll("__PLICO_REPO__", brand.repoUrl);
}
var e = {
  requirements: [`React 19`],
  whenToUse: [
    `A/B tests, prompt or model comparisons, pricing experiments – anything with a few variants measured the same way`,
    `Lists of running experiments where the result should be one hover away`,
    `When people should not only read the result but act on it: pick the winner and ship it`,
  ],
  whenNotToUse: [
    `More than about five variants – the head chart and the rows get crowded; use a table`,
    `Results over time – a line chart shows when a variant pulled ahead; this card shows where things stand`,
    `A single number without variants – use KPI Chart or Compact Breakdown`,
  ],
  usage:
    'import ExperimentCard from "@/components/plico/experiment-card-clean";\nfunction SignupCopyTest() {\n  return <ExperimentCard title="Signup button copy" status={{\n    label: "Running",\n    tone: "green"\n  }} note="Day 9 of 14" metrics={[{\n    id: "conversion",\n    label: "Conversion",\n    format: n => `${n.toFixed(1)}%`\n  }, {\n    id: "revenue",\n    label: "Revenue",\n    format: n => `$${n.toFixed(2)}`\n  }]} variants={[{\n    id: "a",\n    key: "A",\n    name: "Start free trial",\n    control: true,\n    visitors: 4790,\n    values: {\n      conversion: 4.2,\n      revenue: 18.4\n    }\n  }, {\n    id: "b",\n    key: "B",\n    name: "Try it free",\n    visitors: 4812,\n    values: {\n      conversion: 4.7,\n      revenue: 19.1\n    },\n    confidence: {\n      conversion: 96,\n      revenue: 81\n    }\n  }]} action={{\n    label: v => `Ship ${v.key}`,\n    onClick: v => ship(v.id)\n  }} />;\n}\nexport { SignupCopyTest };',
  examples: [
    {
      title: `A metric where less is better`,
      code: '<ExperimentCard title="Model for support replies" metrics={[{\n  id: "latency",\n  label: "Latency",\n  format: (n) => `${n.toFixed(0)} ms`,\n  lowerIsBetter: true\n}, {\n  id: "resolved",\n  label: "Resolved",\n  format: (n) => `${n.toFixed(0)}%`\n}]} variants={[{\n  id: "sonnet",\n  key: "S",\n  name: "claude-sonnet-5-5",\n  control: true,\n  values: {\n    latency: 840,\n    resolved: 71\n  }\n}, {\n  id: "haiku",\n  key: "H",\n  name: "claude-haiku-5-5",\n  values: {\n    latency: 310,\n    resolved: 66\n  }\n}]} />;',
    },
    {
      title: `Keeping the picked winner`,
      code: 'const [winner, setWinner] = useState(null);\n<ExperimentCard trigger="click" title="Pricing page layout" metrics={metrics} variants={variants} winner={winner} onWinnerChange={setWinner} action={{\n  label: "Roll out",\n  onClick: (v) => rollOut(v.id)\n}} />;',
    },
  ],
  props: [
    {
      name: `title`,
      type: `string`,
      description: `Name of the experiment`,
    },
    {
      name: `variants`,
      type: `ExperimentVariant[]`,
      description: `{ id, key, name, values, control?, visitors?, confidence?, color? } – values and confidence hold one number per metric id; key is the short letter in the badge`,
    },
    {
      name: `metrics`,
      type: `ExperimentMetric[]`,
      description: `{ id, label, format?, lowerIsBetter? } – the switch above the rows; no switch with a single metric`,
    },
    {
      name: `metric`,
      type: `string`,
      description: `Controlled metric id`,
    },
    {
      name: `defaultMetric`,
      type: `string`,
      default: `first metric`,
      description: `Starting metric when uncontrolled`,
    },
    {
      name: `onMetricChange`,
      type: `(id: string) => void`,
      description: `Called with the new metric`,
    },
    {
      name: `winner`,
      type: `string | null`,
      description: `Controlled id of the picked variant`,
    },
    {
      name: `defaultWinner`,
      type: `string | null`,
      default: `null`,
      description: `Picked variant when uncontrolled`,
    },
    {
      name: `onWinnerChange`,
      type: `(id: string | null) => void`,
      description: `Called when a variant is picked, or null when the pick is taken back`,
    },
    {
      name: `status`,
      type: `{ label: string; tone?: ExperimentTone }`,
      description: `The tag under the title – tone is red, amber, green, blue, violet or gray`,
    },
    {
      name: `note`,
      type: `string`,
      description: `Short text next to the status, e.g. "Day 9 of 14"`,
    },
    {
      name: `action`,
      type: `{ label: string | (variant) => string; onClick: (variant) => void }`,
      description: `The button that appears in the last row of the card once a winner is picked`,
    },
    {
      name: `hint`,
      type: `ReactNode`,
      default: `"Pick a winner"`,
      description: `The line in the last row of the card while nothing is hovered or picked`,
    },
    {
      name: `trigger`,
      type: `"hover" | "click"`,
      default: `"hover"`,
      description: `Hover opens under the mouse; taps and the keyboard always toggle`,
    },
    {
      name: `open`,
      type: `boolean`,
      description: `Controlled open state`,
    },
    {
      name: `defaultOpen`,
      type: `boolean`,
      default: `false`,
      description: `Starts open when uncontrolled`,
    },
    {
      name: `onOpenChange`,
      type: `(open: boolean) => void`,
      description: `Called when the card opens or closes`,
    },
    {
      name: `className`,
      type: `string`,
      description: `Extra class on the root`,
    },
  ],
  keyboard: [
    {
      keys: [`Enter`, `Space`],
      description: `On the card: opens or closes it`,
    },
    {
      keys: [`←`, `→`],
      description: `In the metric switch: previous or next metric (wraps around)`,
    },
    {
      keys: [`Tab`],
      description: `Through the metric switch, the variants and the action`,
    },
    {
      keys: [`Space`],
      description: `On a variant: picks it as the winner, or takes the pick back`,
    },
    {
      keys: [`Esc`],
      description: `Closes the card and returns focus to it`,
    },
  ],
  accessibility: [
    `The head is one button with aria-expanded; its name carries the status and who is ahead`,
    `The metric switch and the variants are radio groups; every variant's name includes its value and its change against the baseline`,
    `The small chart in the head is decorative – everything it shows is in the rows`,
    `While the card is closed, everything inside is inert; the line in the last row is announced politely`,
  ],
  motion: [
    `Nothing travels: the head stays where it is and the comparison unfolds below it while it fades in`,
    `Switching the metric rolls every number in one shared tween while bars and columns glide to their new size; the soft fill of the switch moves along in a short, crisp step`,
    `Hovering a variant widens its column in the head and fades the others – and the other way round`,
    `Picking a winner turns its badge into a check and pops the dark action button into the last row`,
    `With prefers-reduced-motion everything switches without movement`,
  ],
  responsive: [
    `Fills its container up to 340px; below 300px the note next to the status goes and the chips tighten`,
    `Touch screens: a tap opens, a tap outside closes, rows and the metric switch are taller`,
    `Dark mode built in: switches when an ancestor (usually <html>) has the class dark or data-theme="dark"`,
  ],
  aiNotes: [
    `Changes are measured against the control (the variant with control: true, else the first). With lowerIsBetter a drop is shown as it is (−7.5%) but colored green and counted as the lead`,
    `Pass raw numbers and do the formatting in the metric's format, so the rolling values stay smooth`,
    `The card does not compute confidence – pass what your stats engine gives you`,
  ],
  related: [`project-card`, `compact-breakdown`, `kpi-chart`],
};
export { e as docs };

import { brand } from "../../lib/brand.js";
function localText(value) {
  return value
    .replaceAll("__PLICO_ORIGIN__", brand.url)
    .replaceAll("__PLICO_REPO__", brand.repoUrl);
}
var e = {
  requirements: [`React 19`],
  whenToUse: [
    `Showing how a set of records splits up – tasks by status and priority, tickets by team, orders by region`,
    `Reports where people want to switch the view themselves without leaving the page`,
  ],
  whenNotToUse: [
    `Values over time – use the KPI Chart`,
    `More than about twelve bars or eight segments – the bars and the legend get hard to read`,
  ],
  usage:
    'import BreakdownChart from "@/components/plico/breakdown-chart-clean";\nconst dimensions = [{\n  key: "status",\n  label: "Status",\n  values: ["Todo", "In progress", "Done"]\n}, {\n  key: "priority",\n  label: "Priority",\n  values: ["High", "Medium", "Low"],\n  colors: {\n    High: "#e5484d",\n    Medium: "#3c85e9"\n  }\n}];\nconst measures = [{\n  key: "count",\n  label: "Task count",\n  unit: "tasks"\n}, {\n  key: "points",\n  label: "Story points",\n  unit: "points",\n  field: "points"\n}];\nfunction Sprint({\n  tasks\n}) {\n  return <BreakdownChart title="Sprint 24" records={tasks} dimensions={dimensions} measures={measures} />;\n}\nexport { Sprint };',
  props: [
    {
      name: `records`,
      type: `BreakdownRecord[]`,
      description: `Flat records – one per task, ticket or order – with a field per dimension`,
    },
    {
      name: `dimensions`,
      type: `Dimension[]`,
      description: `key, label, values in order, optional colors and icons per value`,
    },
    {
      name: `measures`,
      type: `Measure[]`,
      description: `key, label, unit and the field to sum – without a field records are counted`,
    },
    {
      name: `title`,
      type: `string`,
      default: `"Workload"`,
      description: `Heading at the top of the card`,
    },
    {
      name: `defaultMeasure`,
      type: `string`,
      description: `Measure shown first`,
    },
    {
      name: `defaultSlice`,
      type: `string`,
      description: `Dimension along the bars`,
    },
    {
      name: `defaultSegment`,
      type: `string`,
      description: `Dimension that stacks the bars, or "none"`,
    },
    {
      name: `className`,
      type: `string`,
      description: `Extra class on the card`,
    },
  ],
  keyboard: [
    {
      keys: [`Tab`],
      description: `Move through the pickers, the bars and the legend`,
    },
    {
      keys: [`↑`, `↓`],
      description: `Move through an open picker`,
    },
    {
      keys: [`Escape`],
      description: `Close a picker`,
    },
  ],
  accessibility: [
    `Each bar is a button that reads its slice and total; focusing it shows the breakdown`,
    `The table repeats every number, so nothing depends on color or hover`,
    `Legend entries are toggle buttons with a pressed state`,
  ],
  motion: [
    `Bars grow and re-stack smoothly when the measure, slice or segment changes`,
    `Hovering dims the other bars and highlights the matching table row; reduced motion turns transitions off`,
  ],
  responsive: [
    `Dark mode built in: switches when an ancestor (usually <html>) has the class dark or data-theme="dark"`,
  ],
  related: [`kpi-chart`, `data-table`, `change-summary`],
};
export { e as docs };

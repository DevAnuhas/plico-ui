import { brand } from "../../lib/brand.js";
function localText(value) {
  return value
    .replaceAll("__PLICO_ORIGIN__", brand.url)
    .replaceAll("__PLICO_REPO__", brand.repoUrl);
}
var e = {
  requirements: [`React 19`],
  whenToUse: [
    `The model switch in the toolbar of a chat composer – the place people decide between fast, cheap and smart`,
    `Products with a few models that differ in speed, quality and price, and settings that ride along with the model: thinking, effort, web search`,
    `When people should see what a choice costs them before they send – the last row of the menu shows first-token time and price`,
  ],
  whenNotToUse: [
    `Dozens of models from many providers – use Combobox or Command Menu, where people can type to search`,
    `A setting page that lists every parameter – this menu is for the two or three things people change between messages`,
    `A plain two-way choice – Segmented Control says it with less`,
  ],
  usage:
    'import ModelPicker from "@/components/plico/model-picker-clean";\nconst models = [{\n  id: "opus",\n  name: "Opus 5.5",\n  description: "Hardest problems",\n  speed: 2,\n  quality: 5,\n  cost: 5,\n  latencyMs: 2100,\n  pricePerM: 25\n}, {\n  id: "sonnet",\n  name: "Sonnet 5.5",\n  description: "Everyday work",\n  speed: 4,\n  quality: 4,\n  cost: 3,\n  latencyMs: 900,\n  pricePerM: 15\n}, {\n  id: "haiku",\n  name: "Haiku 5.5",\n  description: "Quick and light",\n  speed: 5,\n  quality: 3,\n  cost: 1,\n  latencyMs: 400,\n  pricePerM: 4\n}];\nfunction ComposerToolbar() {\n  return <div className="toolbar">\n      <ModelPicker models={models} defaultValue="sonnet" />\n      <SendButton />\n    </div>;\n}\nexport { ComposerToolbar };',
  examples: [
    {
      title: `Wired to your chat settings`,
      code: 'const [settings, setSettings] = useState({\n  model: "sonnet",\n  thinking: false,\n  effort: "medium",\n  web: true\n});\n<ModelPicker models={models} value={settings.model} onChange={(model) => setSettings((s) => ({\n  ...s,\n  model\n}))} thinking={settings.thinking} onThinkingChange={(thinking) => setSettings((s) => ({\n  ...s,\n  thinking\n}))} effort={settings.effort} onEffortChange={(effort) => setSettings((s) => ({\n  ...s,\n  effort\n}))} webSearch={settings.web} onWebSearchChange={(web) => setSettings((s) => ({\n  ...s,\n  web\n}))} />;',
    },
    {
      title: `Composer at the bottom, with a router option`,
      code: '<ModelPicker side="top" align="end" models={[{\n  id: "auto",\n  name: "Auto",\n  description: "Picks a model per message",\n  icon: <SparkleIcon />\n}, ...models]} defaultValue="auto" />;',
    },
  ],
  props: [
    {
      name: `models`,
      type: `PickerModel[]`,
      description: `{ id, name, description?, icon?, speed?, quality?, cost?, latencyMs?, pricePerM? } – strengths go from 1 to 5 (cost 5 is the most expensive); leave all three out for a router like Auto and the row says "Varies"`,
    },
    {
      name: `value`,
      type: `string`,
      description: `Id of the chosen model (controlled)`,
    },
    {
      name: `defaultValue`,
      type: `string`,
      default: `first model`,
      description: `Chosen model when uncontrolled`,
    },
    {
      name: `onChange`,
      type: `(id: string) => void`,
      description: `Called with the picked model's id`,
    },
    {
      name: `thinking`,
      type: `boolean`,
      description: `Extended thinking switch (controlled)`,
    },
    {
      name: `defaultThinking`,
      type: `boolean`,
      default: `false`,
      description: `Starting state of the thinking switch`,
    },
    {
      name: `onThinkingChange`,
      type: `(on: boolean) => void`,
      description: `Called when the thinking switch flips`,
    },
    {
      name: `webSearch`,
      type: `boolean`,
      description: `Web search switch (controlled)`,
    },
    {
      name: `defaultWebSearch`,
      type: `boolean`,
      default: `false`,
      description: `Starting state of the web search switch`,
    },
    {
      name: `onWebSearchChange`,
      type: `(on: boolean) => void`,
      description: `Called when the web search switch flips`,
    },
    {
      name: `effort`,
      type: `"low" | "medium" | "high"`,
      description: `Thinking effort (controlled) – the control only shows while thinking is on`,
    },
    {
      name: `defaultEffort`,
      type: `"low" | "medium" | "high"`,
      default: `"medium"`,
      description: `Starting effort`,
    },
    {
      name: `onEffortChange`,
      type: `(effort) => void`,
      description: `Called with the new effort`,
    },
    {
      name: `open`,
      type: `boolean`,
      description: `Controlled open state of the menu`,
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
      description: `Called when the menu opens or closes`,
    },
    {
      name: `align`,
      type: `"start" | "end"`,
      default: `"start"`,
      description: `Which edge of the trigger the menu lines up with`,
    },
    {
      name: `side`,
      type: `"bottom" | "top"`,
      default: `"bottom"`,
      description: `Opens below or above the trigger – use top for a composer at the bottom of the screen`,
    },
    {
      name: `className`,
      type: `string`,
      description: `Extra class on the root`,
    },
  ],
  keyboard: [
    {
      keys: [`Enter`, `Space`, `↓`],
      description: `On the trigger: opens the menu and moves into the model list`,
    },
    {
      keys: [`↑`, `↓`, `Home`, `End`],
      description: `In the list: moves between models – the last row follows`,
    },
    {
      keys: [`Enter`, `Space`],
      description: `In the list: picks the model and closes the menu`,
    },
    {
      keys: [`Tab`],
      description: `From the list to Extended thinking, Effort and Web search`,
    },
    {
      keys: [`←`, `→`],
      description: `In Effort: Low, Medium, High`,
    },
    {
      keys: [`Esc`],
      description: `Closes the menu and returns to the trigger`,
    },
  ],
  accessibility: [
    `The trigger has aria-haspopup, aria-expanded and aria-controls; its name carries the model and whether thinking is on`,
    `Models are a listbox with options and aria-activedescendant, so focus stays on the list while the arrows move`,
    `Thinking and web search are switches, Effort is a radio group with one tab stop`,
    `While closed the menu is inert; the last row's numbers are announced politely once, not while they roll`,
  ],
  motion: [
    `The menu opens with a short fade and a soft scale from the corner of the trigger, and closes the same way`,
    `Pointing at a model fills its bars segment by segment and steps the other rows back`,
    `Effort unfolds under the thinking switch; its soft fill slides to the chosen level, and the lit row's bars fill in blue`,
    `First-token time and price roll to their new values; the model name in the trigger crossfades and a small bulb unfolds next to it while thinking is on`,
    `With prefers-reduced-motion everything switches without movement`,
  ],
  responsive: [
    `The menu is 320px wide and never wider than the screen minus 32px. Below 300px the row glyphs and key hints give way and the bars move closer`,
    `Touch screens: taller trigger, rows, switches and effort buttons; the key hints are hidden`,
    `Dark mode built in: switches when an ancestor (usually <html>) has the class dark or data-theme="dark"`,
  ],
  aiNotes: [
    `The menu is positioned absolutely from the trigger – keep the composer's overflow visible, or the menu gets cut`,
    `Pick side="top" when the composer sits at the bottom of the viewport, and align="end" when the trigger is on the right`,
    `latencyMs is the time without thinking; the last row multiplies it by the effort (×1.6, ×2.5, ×4) while thinking is on`,
    `Keep descriptions to two or three words – the row has room for one short line next to the bars`,
  ],
  related: [`chat-composer`, `combobox`, `segmented-control`, `context-window`],
};
export { e as docs };

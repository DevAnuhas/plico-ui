import { brand } from "../../lib/brand.js";
function localText(value) {
  return value
    .replaceAll("__PLICO_ORIGIN__", brand.url)
    .replaceAll("__PLICO_REPO__", brand.repoUrl);
}
var e = {
  requirements: [`React 19`],
  whenToUse: [
    `Pointing new users to features they haven't tried yet`,
    `A “What's new” or getting-started panel in a dashboard or a dialog`,
  ],
  whenNotToUse: [
    `Steps that build on each other – use the Setup Guide`,
    `A single announcement – a banner or toast is lighter`,
  ],
  usage:
    'import { Kbd, TipsPanel } from "@/components/plico/tips-panel-clean";\nconst tips = [{\n  id: "search",\n  title: "Quick search",\n  description: <>Press <Kbd>⌘K</Kbd> to jump anywhere.</>,\n  action: "Try it"\n}, {\n  id: "pro",\n  title: "Ready for Pro?",\n  description: "Unlimited projects and priority support.",\n  action: "See plans",\n  primary: true\n}];\nexport function Tips() {\n  return <TipsPanel tips={tips} onClose={() => setOpen(false)} />;\n}',
  props: [
    {
      name: `tips`,
      type: `Tip[]`,
      description: `id, title, description, action, doneLabel, primary and onAction`,
    },
    {
      name: `title`,
      type: `string`,
      default: `"Tips"`,
      description: `Heading at the top of the card`,
    },
    {
      name: `onClose`,
      type: `() => void`,
      description: `Shows a Close button in the last row of the card`,
    },
    {
      name: `closeLabel`,
      type: `string`,
      default: `"Close"`,
      description: `Text of the Close button`,
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
      description: `Move between the tip actions and Close`,
    },
    {
      keys: [`Enter`, `Space`],
      description: `Take the focused action`,
    },
  ],
  accessibility: [
    `Each tip is a list item with a real button; the done state is announced as a status`,
    `The counter in the heading is a polite live region`,
  ],
  motion: [
    `Tips fade in one after another; a taken tip pops into its done state`,
    `Reduced motion turns both off`,
  ],
  responsive: [
    `Set --ui-tpc-max-height on the panel to change how tall the list grows before it scrolls (420px by default)`,
    `Three columns, two below 560px panel width, one below 380px – based on the panel's own width`,
    `Dark mode built in: switches when an ancestor (usually <html>) has the class dark or data-theme="dark"`,
  ],
  related: [`setup-guide`, `decision-inbox`],
};
export { e as docs };

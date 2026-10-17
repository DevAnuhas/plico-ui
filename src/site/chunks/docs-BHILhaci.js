import { brand } from "../../lib/brand.js";
function localText(value) {
  return value
    .replaceAll("__PLICO_ORIGIN__", brand.url)
    .replaceAll("__PLICO_REPO__", brand.repoUrl);
}
var e = {
  requirements: [`React 19`],
  whenToUse: [
    `A problem card about cold outreach that gets ignored or messages left on read`,
    `Bento grids and feature cards that need a small illustration above the text`,
  ],
  whenNotToUse: [
    `A real chat UI – the bubbles are a fixed, decorative scene`,
    `Very small sizes below ~220px wide, where the bubble text gets hard to read`,
  ],
  usage:
    'import GhostedChat from "@/components/plico/ghosted-chat";\nexport function FeatureCard() {\n  return <article style={{\n    maxWidth: 360\n  }}>\n      <GhostedChat />\n      <h3>Card title</h3>\n      <p>Short description of the problem or step.</p>\n    </article>;\n}',
  props: [
    {
      name: `label`,
      type: `string`,
      default: `"A chat with three unanswered messages…"`,
      description: `Accessible description of the illustration`,
    },
    {
      name: `className`,
      type: `string`,
      description: `Extra class on the root, e.g. for width or margins`,
    },
  ],
  accessibility: [
    `Exposed as one image with a descriptive label; the messages inside are hidden from screen readers`,
    `The hover reply is purely decorative, nothing needs to be reached with the keyboard`,
  ],
  motion: [
    `A red shine sweeps through the last message every few seconds; the last bubble has a soft colored glow`,
    `On hover the status texts fade out, the messages move up and a blue thumbs-down reply pops in with a small bounce`,
    `With prefers-reduced-motion the shine stops and hover changes happen instantly`,
  ],
  responsive: [
    `Transparent background, so it sits on any light or dark surface`,
    `Laid out on a fixed 360 × 240 artboard and scaled to the width of its container with a ResizeObserver, so the bubbles never reflow`,
    `Dark mode built in: switches when an ancestor (usually <html>) has the class dark or data-theme="dark"`,
  ],
};
export { e as docs };

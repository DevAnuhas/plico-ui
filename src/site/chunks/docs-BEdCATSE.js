import { brand } from "../../lib/brand.js";
function localText(value) {
  return value
    .replaceAll("__PLICO_ORIGIN__", brand.url)
    .replaceAll("__PLICO_REPO__", brand.repoUrl);
}
var e = {
  requirements: [`React 19`],
  whenToUse: [
    `A step or feature card about collecting leads or data from several sources`,
    `Integration sections that show your product connecting a few well-known apps`,
  ],
  whenNotToUse: [
    `Communicating real integrations you don't offer – swap the logos for your own sources`,
  ],
  usage:
    'import LeadSourcing from "@/components/plico/lead-sourcing";\nexport function FeatureCard() {\n  return <article style={{\n    maxWidth: 360\n  }}>\n      <LeadSourcing />\n      <h3>Card title</h3>\n      <p>Short description of the problem or step.</p>\n    </article>;\n}',
  props: [
    {
      name: `label`,
      type: `string`,
      default: `"A ChatGPT tile connected to Gmail and Grok…"`,
      description: `Accessible description of the illustration`,
    },
    {
      name: `className`,
      type: `string`,
      description: `Extra class on the root, e.g. for width or margins`,
    },
  ],
  accessibility: [
    `Exposed as one image with a descriptive label; the logos and tiles inside are hidden from screen readers`,
  ],
  motion: [
    `A colored shine sweeps along the connecting line from left to right, then the line rests for a few seconds before the next pass`,
    `With prefers-reduced-motion the line stays gray and still`,
  ],
  responsive: [
    `Transparent background, so it sits on any light or dark surface`,
    `Keeps a 3 : 2 aspect ratio and scales to the width of its container – set a width or max-width via className`,
    `Drawn on a 320 × 240 viewBox, so logos and tiles scale crisply at any size`,
    `Dark mode built in: switches when an ancestor (usually <html>) has the class dark or data-theme="dark"`,
  ],
};
export { e as docs };

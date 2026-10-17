import { brand } from "../../lib/brand.js";
function localText(value) {
  return value
    .replaceAll("__PLICO_ORIGIN__", brand.url)
    .replaceAll("__PLICO_REPO__", brand.repoUrl);
}
var e = {
  requirements: [`React 19`],
  whenToUse: [
    `Feature cards about files, uploads, storage or a knowledge base; empty states for documents`,
    `Bento grids that need a calm, friendly illustration above the text`,
  ],
  whenNotToUse: [
    `Showing real files – the documents are decorative and contain placeholder lines only`,
    `Dark sections – the folder and documents are drawn for a light theme`,
  ],
  usage:
    'import SideFolder from "@/components/plico/side-folder";\nexport function FeatureCard() {\n  return <article style={{\n    maxWidth: 360\n  }}>\n      <SideFolder />\n      <h3>Card title</h3>\n      <p>Short description of the feature.</p>\n    </article>;\n}',
  props: [
    {
      name: `label`,
      type: `string`,
      default: `"Blue folder on its side…"`,
      description: `Accessible description of the illustration`,
    },
    {
      name: `className`,
      type: `string`,
      description: `Extra class on the root, e.g. for width or margins`,
    },
  ],
  accessibility: [
    `Exposed as one image with a descriptive label; the folder parts inside are hidden from screen readers`,
    `The hover effect is purely decorative, nothing needs to be reached with the keyboard`,
  ],
  motion: [
    `Hover the folder: the frosted pocket swings forward on its hinge and each document slides out to the right on its own`,
    `With prefers-reduced-motion the changes happen instantly`,
  ],
  responsive: [
    `Transparent background, so it sits on any light surface`,
    `Keeps a 3 : 2 aspect ratio and scales to the width of its container – every detail is sized in container units`,
  ],
};
export { e as docs };

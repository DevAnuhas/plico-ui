import { brand } from "../../lib/brand.js";
function localText(value) {
  return value
    .replaceAll("__PLICO_ORIGIN__", brand.url)
    .replaceAll("__PLICO_REPO__", brand.repoUrl);
}
var e = {
  requirements: [`React 19`],
  whenToUse: [
    `Integration sections and feature cards like “Works with the tools you already use”`,
    `Landing pages that show your product at the centre of an ecosystem`,
  ],
  whenNotToUse: [
    `A real, clickable list of integrations – the tiles are decorative and not links`,
    `More than 22 logos – the grid has 22 outer tiles, extra logos are left out`,
  ],
  usage:
    'import IntegrationGrid from "@/components/plico/integration-grid";\nexport function IntegrationsSection() {\n  return <section style={{\n    maxWidth: 760\n  }}>\n      <IntegrationGrid mark={<img src="/logo.svg" alt="" width={40} height={40} />} />\n      <h3>Plays well with your stack</h3>\n      <p>Connect the tools your team already relies on.</p>\n    </section>;\n}',
  props: [
    {
      name: `logos`,
      type: `IntegrationGridLogo[]`,
      default: `22 well-known tools`,
      description: `Logos filled row by row around the centre – each { name, path, color?, darkColor? } with a single 24 × 24 SVG path (e.g. from simple-icons); without color the mark follows the ink color`,
    },
    {
      name: `mark`,
      type: `ReactNode`,
      default: `a neutral flower mark`,
      description: `Content of the larger centre tile – usually your product logo`,
    },
    {
      name: `columns`,
      type: `5 | 7 | 9`,
      default: `9`,
      description: `Tiles in the middle row – the rows above and below get two fewer. Fewer columns make the tiles larger`,
    },
    {
      name: `label`,
      type: `string`,
      description: `Accessible description – by default lists the integrations`,
    },
    {
      name: `className`,
      type: `string`,
      description: `Extra class on the root, e.g. for width or margins`,
    },
  ],
  accessibility: [
    `Exposed as one image whose label lists every integration; tiles and logos are hidden from screen readers`,
    `Nothing in the scene is interactive`,
  ],
  motion: [
    `Still by default; on hover a tile turns fully white and its logo grows a little from the centre`,
    `With prefers-reduced-motion the hover lift is switched off`,
  ],
  responsive: [
    `Transparent background, so it sits on any light or dark surface`,
    `Keeps a 1520 : 560 aspect ratio and scales to the width of its container – every size is in container units`,
    `Tile fills fade toward the edges while the logos keep their full brand colors`,
    `Dark mode built in: switches when an ancestor (usually <html>) has the class dark or data-theme="dark"`,
  ],
};
export { e as docs };

import {brand} from '../../lib/brand.js';
function localText(value){return value.replaceAll('__PLICO_ORIGIN__',brand.url).replaceAll('__PLICO_REPO__',brand.repoUrl)}
var e = {
  requirements: [`React 19`],
  whenToUse: [`A problem or pain-point card about an empty pipeline or no booked meetings`, `Bento grids and feature cards that need a small, friendly illustration above the text`],
  whenNotToUse: [`Showing a real calendar – the cards are decorative and contain placeholder lines only`],
  usage: "import { EmptyCalendar } from \"@/components/plico/empty-calendar\";\nexport function FeatureCard() {\n  return <article style={{\n    maxWidth: 360\n  }}>\n      <EmptyCalendar />\n      <h3>Card title</h3>\n      <p>Short description of the problem or step.</p>\n    </article>;\n}",
  props: [{
    name: `label`,
    type: `string`,
    default: `"Stacked calendar cards marked empty…"`,
    description: `Accessible description of the illustration`
  }, {
    name: `className`,
    type: `string`,
    description: `Extra class on the root, e.g. for width or margins`
  }],
  accessibility: [`Exposed as one image with a descriptive label; the cards and texts inside are hidden from screen readers`, `Hover effects are purely decorative, nothing needs to be reached with the keyboard`],
  motion: [`The placeholder lines shimmer softly and the colored glow under the front card breathes`, `Hover the front card to lift and tilt it; hover a back card to slide it further out`, `With prefers-reduced-motion the shimmer and glow stop and hover changes happen instantly`],
  responsive: [`Transparent background, so it sits on any light or dark surface`, `Keeps a 3 : 2 aspect ratio and scales to the width of its container – set a width or max-width via className`, `Drawn on a 320 × 240 viewBox, so text and cards scale crisply at any size`, `Dark mode built in: switches when an ancestor (usually <html>) has the class dark or data-theme="dark"`]
};
export { e as docs };

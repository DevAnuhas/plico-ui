import {brand} from '../../lib/brand.js';
function localText(value){return value.replaceAll('__PLICO_ORIGIN__',brand.url).replaceAll('__PLICO_REPO__',brand.repoUrl)}
var e = {
  requirements: [`React 19`],
  whenToUse: [`Integration or ecosystem sections – "works with the tools you already use"`, `Feature cards that need a lively, friendly picture around your own brand`],
  whenNotToUse: [`Listing your real integrations – the logos are examples`, `Places where people need to read or click the logos`],
  usage: "import { LogoCluster } from \"@/components/plico/logo-cluster\";\nexport function IntegrationsCard() {\n  return <article style={{\n    maxWidth: 360\n  }}>\n      <LogoCluster />\n      <h3>Connects with everything</h3>\n    </article>;\n}",
  props: [{
    name: `label`,
    type: `string`,
    default: `"The Plico UI mark surrounded by…"`,
    description: `Accessible description of the illustration`
  }, {
    name: `className`,
    type: `string`,
    description: `Extra class on the root, e.g. for width`
  }],
  accessibility: [`Exposed as one image with a descriptive label; the bubbles are hidden from screen readers`],
  motion: [`When the cluster comes into view the middle circle appears, then the logos quickly bounce out of it one after another`, `Once they land, the ring turns slowly clockwise while every logo stays upright – paused while off screen`, `Hovering a bubble grows it slightly with a springy ease and a softer shadow`, `With prefers-reduced-motion everything is in place right away`],
  responsive: [`Square, scales with the width of its container (max 420px) – every size is in container units`, `Light and dark mode via a .dark class or data-theme="dark"`],
  aiNotes: [`Swap the mark in the middle for your own logo: replace the MARK path and its viewBox`, `Company logos belong to their owners – check you may show them before you ship`],
  related: [`integration-grid`, `model-wheel`]
};
export { e as docs };

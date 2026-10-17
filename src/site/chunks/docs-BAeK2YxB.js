import { brand } from "../../lib/brand.js";
function localText(value) {
  return value
    .replaceAll("__PLICO_ORIGIN__", brand.url)
    .replaceAll("__PLICO_REPO__", brand.repoUrl);
}
var e = {
  requirements: [`React 19`],
  whenToUse: [
    `Filtering a list, table or board by a few groups of options – stage, owner, region and the like`,
    `Side panels or popovers where people pick several filters and want to see them all at a glance`,
  ],
  whenNotToUse: [
    `A single choice from a short list – use a select or segmented control`,
    `Free-text search or numeric ranges with a slider – this menu works with predefined options`,
  ],
  usage:
    'import FilterMenu from "@/components/plico/filter-menu";\nconst groups = [{\n  id: "stage",\n  label: "Stage",\n  options: [{\n    id: "new",\n    label: "New lead"\n  }, {\n    id: "won",\n    label: "Won"\n  }]\n}, {\n  id: "size",\n  label: "Deal size",\n  chipPrefix: "Deal: ",\n  options: [{\n    id: "s",\n    label: "Under $5k"\n  }, {\n    id: "l",\n    label: "Over $50k"\n  }]\n}];\nexport function DealFilters() {\n  const [filters, setFilters] = useState({});\n  return <FilterMenu groups={groups} value={filters} onChange={setFilters} />;\n}',
  props: [
    {
      name: `groups`,
      type: `FilterGroup[]`,
      description: `Required. Each { id, label, options: { id, label }[], chipPrefix? }`,
    },
    {
      name: `value`,
      type: `Record<string, string[]>`,
      description: `Picked option ids per group – makes it controlled`,
    },
    {
      name: `defaultValue`,
      type: `Record<string, string[]>`,
      default: `{}`,
      description: `Starting filters when uncontrolled`,
    },
    {
      name: `onChange`,
      type: `(value) => void`,
      description: `Called with the new filters after every change`,
    },
    {
      name: `defaultOpen`,
      type: `string[]`,
      default: `the first group`,
      description: `Groups that start open`,
    },
    {
      name: `title`,
      type: `string`,
      default: `"Filters"`,
      description: `Heading on top`,
    },
    {
      name: `hints`,
      type: `boolean`,
      default: `true`,
      description: `Shows the keyboard hints on the tray`,
    },
    {
      name: `className`,
      type: `string`,
      description: `Extra class on the root`,
    },
  ],
  keyboard: [
    {
      keys: [`↑`, `↓`],
      description: `Moves through group headers and the options of open groups`,
    },
    {
      keys: [`Enter`, `Space`],
      description: `Picks or unpicks an option, or opens and closes a group`,
    },
    {
      keys: [`→`, `←`],
      description: `Opens a group, or closes it and jumps back to its header`,
    },
    {
      keys: [`Home`, `End`],
      description: `Jumps to the first or last row`,
    },
  ],
  accessibility: [
    `Group headers are buttons with aria-expanded; options are role=checkbox with aria-checked`,
    `One roving tab stop for the list, so Tab moves past it in one step`,
    `Each chip has a remove button labelled with the filter; changes to the chips are announced politely`,
  ],
  motion: [
    `Groups open and close by animating their height; the chevron turns along`,
    `Chips pop in, and their box glides to its new height when a row of chips appears or goes`,
    `Checkmarks draw themselves in`,
    `With prefers-reduced-motion everything switches instantly`,
  ],
  responsive: [
    `Fills its container up to 420px wide; chips wrap onto new lines`,
    `Dark mode built in: switches when an ancestor (usually <html>) has the class dark or data-theme="dark"`,
  ],
};
export { e as docs };

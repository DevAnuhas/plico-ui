import { brand } from "../../lib/brand.js";
function localText(value) {
  return value
    .replaceAll("__PLICO_ORIGIN__", brand.url)
    .replaceAll("__PLICO_REPO__", brand.repoUrl);
}
var e = {
  requirements: [`React 19`],
  whenToUse: [
    `Search, research and support answers where people need to check which sentence comes from which source before they trust it`,
    `A finished answer from your RAG pipeline that already knows the passage behind each claim – the preview shows exactly that passage`,
    `Next to AI Answer: use this one once the answer is done and the point is checking it, not watching it stream`,
  ],
  whenNotToUse: [
    `Answers that are still streaming, with follow-ups and feedback – use AI Answer`,
    `Casual chat without sources – a plain message is lighter`,
    `Long reports with dozens of sources – the source row is made for a handful of chips`,
  ],
  usage:
    'import CitedAnswer from "@/components/plico/cited-answer-clean";\nconst sources = [{\n  id: "caching",\n  site: "Tokenwise",\n  title: "Prompt caching, explained",\n  url: "https://tokenwise.dev/blog/prompt-caching",\n  date: "Sep 18, 2026",\n  quote: "A cached prefix is read instead of recomputed \\u2026",\n  highlight: ["read instead of recomputed"]\n}];\nconst segments = [{\n  text: "Prompt caching reuses the processed start of your prompt.",\n  cite: ["caching"]\n}, {\n  text: " Streaming makes the rest feel faster."\n}];\nfunction Answer() {\n  return <CitedAnswer segments={segments} sources={sources} pagesRead={12} />;\n}\nexport { Answer };',
  examples: [
    {
      title: `From your model's citations`,
      code: 'const segments = blocks.map((b) => ({\n  text: b.text,\n  cite: b.citations?.map((c) => c.sourceId)\n}));\n<CitedAnswer segments={segments} sources={sources} pagesRead={searchResults.length} onOpenSource={(s) => openSidePanel(s.url)} action={{\n  label: "Follow up",\n  onClick: focusComposer\n}} />;',
    },
    {
      title: `Start with a source open, track what people check`,
      code: '<CitedAnswer segments={segments} sources={sources} defaultOpen="caching" onPreviewChange={(id) => id && track("source_previewed", {\n  id\n})} />;',
    },
  ],
  props: [
    {
      name: `segments`,
      type: `CitedSegment[]`,
      description: `{ text, cite?, paragraph? } – the answer in order. cite lists source ids (one marker each); paragraph starts a new paragraph. Spaces at the edges of text stay outside the highlight`,
    },
    {
      name: `sources`,
      type: `CitedSource[]`,
      description: `{ id, title, site, url?, date?, quote?, highlight?, icon? } – numbered in this order, one chip each`,
    },
    {
      name: `pagesRead`,
      type: `number`,
      description: `Pages read while searching – shown in the head as "3 sources · 12 pages read"`,
    },
    {
      name: `defaultOpen`,
      type: `string`,
      description: `Id of the source whose preview is open at first`,
    },
    {
      name: `onOpenSource`,
      type: `(source: CitedSource) => void`,
      description: `Called by Open source. With it the link doesn't navigate on its own; without it the url opens in a new tab`,
    },
    {
      name: `onPreviewChange`,
      type: `(id: string | null) => void`,
      description: `Called when a preview opens, switches or closes`,
    },
    {
      name: `action`,
      type: `{ label: string; onClick: () => void }`,
      description: `A button in the last row of the card, e.g. Follow up`,
    },
    {
      name: `className`,
      type: `string`,
      description: `Extra class on the root`,
    },
  ],
  keyboard: [
    {
      keys: [`Tab`],
      description: `Through the citation markers in reading order, the source chips and "+N", the preview's buttons and the action`,
    },
    {
      keys: [`Enter`, `Space`],
      description: `Opens or closes the preview of a marker or chip`,
    },
    {
      keys: [`←`, `→`, `Home`, `End`],
      description: `Move between the source chips and "+N"`,
    },
    {
      keys: [`Esc`],
      description: `Closes the preview and puts focus on its chip`,
    },
  ],
  accessibility: [
    `Markers and chips are buttons named "Source 2: Latency Notes – title", with aria-expanded and aria-controls pointing at the preview`,
    `Focusing a marker or chip lights up the same sentences and chip as hovering does`,
    `The preview is a named region; while closed it is inert`,
    `The last row of the card is announced politely – what you point at, and "Quote copied"`,
  ],
  motion: [
    `Hovering a marker gives its sentence a soft tint and lights up its chip; hovering a chip tints every sentence that cites it and fades the rest of the answer`,
    `The preview unfolds below the source chips and folds away again; switching to another source crossfades its content in place`,
    `The line in the last row crossfades: the old line fades out underneath while the new one fades in`,
    `With prefers-reduced-motion everything switches without movement`,
  ],
  responsive: [
    `Fills its container up to 460px and works from 300px. The source chips stay on one line – whatever doesn't fit goes into "+N", which shows them all. Below 400px the card gets tighter, below 360px the preview drops its number tag, below 280px Copy quote keeps only its icon`,
    `Touch screens: larger hit areas around the markers and taller chips and buttons`,
    `Dark mode built in: switches when an ancestor (usually <html>) has the class dark or data-theme="dark"`,
  ],
  aiNotes: [
    `Numbers come from the order of sources, not from the text – cite by id, and reorder sources to renumber`,
    `The last word of a cited sentence stays on the line with its markers, so a marker never starts a line on its own`,
    `Ids in cite that aren't in sources are skipped, so a hallucinated citation never shows a broken marker`,
    `Without highlight, words of five letters or more (and numbers) that the quote shares with its citing sentences are marked – pass highlight for exact phrases`,
    `The component doesn't fetch pages – quote should be the passage your retrieval step actually used`,
  ],
  related: [`ai-answer`, `tool-call-card`, `thinking-state`],
};
export { e as docs };

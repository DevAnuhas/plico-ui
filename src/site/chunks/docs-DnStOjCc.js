import {brand} from '../../lib/brand.js';
function localText(value){return value.replaceAll('__PLICO_ORIGIN__',brand.url).replaceAll('__PLICO_REPO__',brand.repoUrl)}
var e = {
  requirements: [`React 19`],
  whenToUse: [`Answers from an assistant that searched your docs, the web or connected tools and should show where each claim comes from`, `Research, support or knowledge-base products where people need to check the source before they act`],
  whenNotToUse: [`Casual chat without sources – a plain message bubble is lighter`, `Long documents or code – the answer is made for a few paragraphs and lists`],
  usage: "import { Component as AIAnswer } from \"@/components/plico/ai-answer\";\nconst sources = [{\n  name: \"Notion\",\n  title: \"Offsite plan \\u2013 shortlist and budget\",\n  href: \"https://notion.so/\\u2026\",\n  snippet: \"Budget \\u20AC4,500 for three nights\\u2026\"\n}, {\n  name: \"Slack\",\n  title: \"#team-offsite \\u2013 who can make which dates\",\n  href: \"https://slack.com/\\u2026\"\n}];\nfunction Answer({\n  text,\n  done\n}) {\n  return <AIAnswer\n    question=\"Where should we hold the team offsite?\"\n    sources={sources}\n    answer={text}\n    streaming={!done}\n    onRegenerate={() => regenerate()}\n    onFeedback={(value, reason) => track(\"answer_feedback\", {\n      value,\n      reason\n    })}\n  />;\n}\nexport {\n  Answer\n};",
  props: [{
    name: `question`,
    type: `string`,
    description: `Shown as the title above the sources`
  }, {
    name: `sources`,
    type: `AnswerSource[]`,
    description: `Each { title, name, href?, icon?, snippet? }; name is the short label on the citation chip`
  }, {
    name: `answer`,
    type: `string`,
    description: `Blank lines make paragraphs, lines starting with "- " a list, **bold**, [1] or [1,3] cite sources (1-based). It may grow while streaming; a different text starts over`
  }, {
    name: `streaming`,
    type: `boolean`,
    default: `false`,
    description: `More text is still coming from your model – keeps the cursor going once it has caught up`
  }, {
    name: `animate`,
    type: `boolean`,
    default: `true`,
    description: `Stream the text in; false shows it at once`
  }, {
    name: `speed`,
    type: `number`,
    default: `38`,
    description: `Words per second while streaming in`
  }, {
    name: `followUps`,
    type: `string[]`,
    description: `Related questions shown below the finished answer`
  }, {
    name: `onFollowUp`,
    type: `(question: string) => void`,
    description: `A follow-up was clicked`
  }, {
    name: `onRegenerate`,
    type: `() => void`,
    description: `Regenerate was clicked – the answer streams in again; pass a new answer to replace it`
  }, {
    name: `onStop`,
    type: `() => void`,
    description: `Stop was clicked while writing – cancel your request here`
  }, {
    name: `onFeedback`,
    type: `(value: "up" | "down", reason?: string) => void`,
    description: `Thumbs up, or thumbs down with the reason that was picked`
  }, {
    name: `feedbackReasons`,
    type: `string[]`,
    default: `["Not accurate", "Wrong source", "Too long", "Out of date"]`,
    description: `Reasons offered after a thumbs down`
  }, {
    name: `onCopy`,
    type: `(text: string) => void`,
    description: `Called with the copied text: the answer without markup plus a numbered source list`
  }, {
    name: `className`,
    type: `string`,
    description: `Extra class on the root`
  }],
  keyboard: [{
    keys: [`Tab`],
    description: `Moves through source cards, citation chips, follow-ups and actions`
  }, {
    keys: [`Esc`],
    description: `Closes the source preview of the focused chip`
  }],
  accessibility: [`Citation chips are buttons named after their sources; the preview is a tooltip linked to the chip`, `The answer is marked busy while it streams, so screen readers read it once it's complete`, `Copy, feedback and status changes are announced in a polite live region`],
  motion: [`Source cards pop in one after another while the label reads "Reading 6 sources"`, `Words fade in out of a light blur, citation chips pop in, a pulsing dot marks where the text grows`, `Hovering a chip lights up its source card, hovering a card lights up its chips`, `The card glides to its new height; with prefers-reduced-motion the answer appears at once`],
  responsive: [`Fills its container up to 640px; source cards scroll sideways on narrow screens`, `Tap a citation chip to open its preview on touch screens`, `Dark mode built in: switches when an ancestor (usually <html>) has the class dark or data-theme="dark"`],
  related: [`thinking-state`, `chat-composer`, `comment-thread`]
};
export { e as docs };

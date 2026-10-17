import { brand } from "../../lib/brand.js";
function localText(value) {
  return value
    .replaceAll("__PLICO_ORIGIN__", brand.url)
    .replaceAll("__PLICO_REPO__", brand.repoUrl);
}
var e = {
  requirements: [`React 19`],
  whenToUse: [
    `Reactions under posts, comments or updates in a feed`,
    `Any toggle with a public count, like saves or upvotes`,
  ],
  whenNotToUse: [`Actions that need a confirmation – a toggle gives none`],
  usage:
    'import ReactionBar from "@/components/plico/reaction-bar";\nexport function PostActions({\n  post\n}) {\n  return <ReactionBar reactions={{\n    like: {\n      count: post.likes,\n      active: post.liked\n    },\n    comment: {\n      count: post.comments\n    }\n  }} onReact={(key, state) => api.react(post.id, key, state.active)} />;\n}',
  props: [
    {
      name: `reactions`,
      type: `Partial<Record<ReactionKey, { count; active? }>>`,
      description: `Starting count and pressed state per action`,
    },
    {
      name: `onReact`,
      type: `(key, state) => void`,
      description: `Called after a toggle with the new count and state`,
    },
    {
      name: `actions`,
      type: `ReactionKey[]`,
      default: `["like", "comment", "repost", "share"]`,
      description: `Which actions to show, in order`,
    },
    {
      name: `className`,
      type: `string`,
      description: `Extra class on the pill`,
    },
  ],
  keyboard: [
    {
      keys: [`Tab`],
      description: `Move between the actions`,
    },
    {
      keys: [`Enter`, `Space`],
      description: `Toggle the focused action`,
    },
  ],
  accessibility: [
    `Every action is a toggle button with aria-pressed and a label that includes its count`,
    `The rolling digits are decorative – the label carries the number`,
  ],
  motion: [
    `The icon shrinks, springs and fills with its color; the count glides to its new width and changed digits roll in`,
    `Reduced motion turns this off`,
  ],
  responsive: [
    `Dark mode built in: switches when an ancestor (usually <html>) has the class dark or data-theme="dark"`,
  ],
  related: [`button`, `comments-panel`],
};
export { e as docs };

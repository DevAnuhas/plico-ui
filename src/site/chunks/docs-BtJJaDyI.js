import {brand} from '../../lib/brand.js';
function localText(value){return value.replaceAll('__PLICO_ORIGIN__',brand.url).replaceAll('__PLICO_REPO__',brand.repoUrl)}
var e = {
  requirements: [`React 19`],
  whenToUse: [`Feature cards about inviting teammates, collaboration, sharing or multiplayer`, `Onboarding steps like “Invite your team” where a friendly, moving scene helps`],
  whenNotToUse: [`Showing your real team list – the scene is decorative and loops on its own`, `Places that need to stay completely still – use prefers-reduced-motion or a static image`],
  usage: "import { TeamInvite } from \"@/components/plico/team-invite\";\nexport function FeatureCard() {\n  return <article style={{\n    maxWidth: 420\n  }}>\n      <TeamInvite avatars={[{\n      src: \"/team/maya.png\",\n      name: \"Maya\"\n    }, {\n      src: \"/team/finn.png\",\n      name: \"Finn\"\n    }, {\n      src: \"/team/lea.png\",\n      name: \"Lea\"\n    }]} />\n      <h3>Invite your team</h3>\n      <p>Bring everyone into the same workspace in seconds.</p>\n    </article>;\n}",
  props: [{
    name: `avatars`,
    type: `[TeamInviteAvatar, TeamInviteAvatar, TeamInviteAvatar]`,
    description: `Required. The two connected teammates, then the one being invited – each { src, name? } with a square portrait`
  }, {
    name: `label`,
    type: `string`,
    description: `Accessible description – by default built from the names`
  }, {
    name: `className`,
    type: `string`,
    description: `Extra class on the root, e.g. for width or margins`
  }],
  accessibility: [`Exposed as one image with a descriptive label built from the names; avatars, lines and cursor are hidden from screen readers`, `Nothing in the scene is interactive`],
  motion: [`A 4.4 s loop with soft ease-in-out: the cursor picks up the third avatar, carries it into the dashed slot, the line draws solid and the green status dot pops in`, `Only transforms, opacity and a stroke offset are animated – no layout work`, `With prefers-reduced-motion it stays a still frame of the waiting state`],
  responsive: [`Transparent background, so it sits on any light or dark surface`, `Keeps a 3 : 2 aspect ratio and scales to the width of its container – every size is in container units`, `Avatars are square portraits shown in white-ringed circles; photos, 3D faces or illustrations all work`, `Dark mode built in: switches when an ancestor (usually <html>) has the class dark or data-theme="dark"`]
};
export { e as docs };

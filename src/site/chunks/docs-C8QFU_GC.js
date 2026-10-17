import {brand} from '../../lib/brand.js';
function localText(value){return value.replaceAll('__PLICO_ORIGIN__',brand.url).replaceAll('__PLICO_REPO__',brand.repoUrl)}
var e = {
  requirements: [`React 19`],
  whenToUse: [`The dropdown behind the avatar in an app header`, `Nudging people to finish their profile, right next to the account actions`],
  whenNotToUse: [`Long menus with nested levels – use a full dropdown menu with submenus`, `Long onboarding flows with many steps – use a checklist like the Setup Guide instead`],
  usage: "import ProfileMenu, { SettingsIcon, LogoutIcon } from \"@/components/plico/profile-menu\";\nexport function Account() {\n  return <ProfileMenu name=\"Lena Hartmann\" email=\"lena.hartmann@fastmail.com\" items={[{\n    id: \"settings\",\n    label: \"Settings\",\n    icon: <SettingsIcon />,\n    onSelect: openSettings\n  }, {\n    id: \"logout\",\n    label: \"Logout\",\n    icon: <LogoutIcon />,\n    onSelect: signOut\n  }]} setup={{\n    done: 3,\n    total: 5,\n    next: \"Add a profile photo\",\n    onContinue: openProfile\n  }} />;\n}",
  props: [{
    name: `name`,
    type: `string`,
    description: `Name of the signed-in user`
  }, {
    name: `email`,
    type: `string`,
    description: `Email under the name, cut off with an ellipsis when long`
  }, {
    name: `avatar`,
    type: `ReactNode`,
    description: `Replaces the default avatar, e.g. an <img>`
  }, {
    name: `items`,
    type: `ProfileMenuItem[]`,
    description: `Actions with label, icon, optional badge and onSelect`
  }, {
    name: `setup`,
    type: `ProfileSetup`,
    description: `Profile setup progress: done, total, the next step and onContinue – leave empty to hide`
  }, {
    name: `className`,
    type: `string`,
    description: `Extra class on the card`
  }],
  keyboard: [{
    keys: [`Tab`],
    description: `Move into the menu`
  }, {
    keys: [`↑`, `↓`],
    description: `Move between the actions`
  }, {
    keys: [`Home`, `End`],
    description: `Jump to the first or last action`
  }, {
    keys: [`Enter`, `Space`],
    description: `Run the focused action`
  }],
  accessibility: [`Actions are buttons in a menu role, so screen readers announce them as menu items`, `The setup bar is a progressbar with its percentage as value`],
  motion: [`The setup bar fills up when the card comes into view`, `Reduced motion shows it at once`],
  responsive: [`Dark mode built in: switches when an ancestor (usually <html>) has the class dark or data-theme="dark"`],
  related: [`progress-tracker`]
};
export { e as docs };

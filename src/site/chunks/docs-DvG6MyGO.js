import {brand} from '../../lib/brand.js';
function localText(value){return value.replaceAll('__PLICO_ORIGIN__',brand.url).replaceAll('__PLICO_REPO__',brand.repoUrl)}
var e = {
  requirements: [`React 19`],
  whenToUse: [`Human-in-the-loop flows where an agent drafts an email and someone approves it – renewals, reminders, follow-ups`, `Inboxes or task lists of pending outreach, one card per record`],
  whenNotToUse: [`Writing long emails from scratch – use a full editor`, `Messages that go out without review – then a simple activity row is enough`],
  usage: "import EmailDraft from \"@/components/plico/email-draft\";\nexport function RenewalReview() {\n  return <EmailDraft reference=\"SUB-1182\" account=\"Northwind Logistics\" amount=\"$8,900\" status=\"Renews in 5 days\" agent=\"Renewal agent\" contacts={[{\n    name: \"Jonas Weber\",\n    email: \"jonas@northwind.io\"\n  }]} attachment=\"Renewal-quote.pdf\" link={{\n    label: \"Review quote\",\n    href: \"/quotes/1182\"\n  }} onSend={email => api.send(email)} />;\n}",
  props: [{
    name: `reference`,
    type: `string`,
    default: `"SUB-1182"`,
    description: `Reference of the record the email is about`
  }, {
    name: `account`,
    type: `string`,
    default: `"Northwind Logistics"`,
    description: `Account or company under the reference`
  }, {
    name: `amount`,
    type: `string`,
    default: `"$8,900"`,
    description: `Amount on the right`
  }, {
    name: `status`,
    type: `string`,
    default: `"Renews in 5 days"`,
    description: `Status chip next to the reference`
  }, {
    name: `agent`,
    type: `string`,
    default: `"Renewal agent"`,
    description: `Who wrote the draft, shown in the footer`
  }, {
    name: `contacts`,
    type: `DraftContact[]`,
    description: `People the email can go to – the first is preselected`
  }, {
    name: `attachment`,
    type: `string | null`,
    description: `File name of the attachment; it can be removed and added back`
  }, {
    name: `tones`,
    type: `DraftTone[]`,
    description: `Text variants { id, label, body(contact) } – Friendly, Short and Formal by default`
  }, {
    name: `link`,
    type: `{ label, href }`,
    description: `Link appended to the email text`
  }, {
    name: `onSend`,
    type: `({ to, body, attachment }) => void`,
    description: `Called after Send with the final email`
  }, {
    name: `onDiscard`,
    type: `() => void`,
    description: `Called when the draft is discarded`
  }, {
    name: `className`,
    type: `string`,
    description: `Extra class on the root`
  }],
  keyboard: [{
    keys: [`⌘`, `Enter`],
    description: `Sends the email while editing`
  }, {
    keys: [`Esc`],
    description: `Leaves editing, or closes the recipient menu`
  }],
  accessibility: [`The recipient is a button that opens a listbox; tones are toggle buttons with aria-pressed`, `The text is a plain paragraph; clicking it or the pencil swaps in a labelled text field`, `Sent and discarded states are announced as a status with an Undo button`],
  motion: [`Switching tone fades the new text in; the recipient menu scales in from its corner`, `Sending shows a spinner, then the card folds into a one-line receipt – the height glides between them`, `With prefers-reduced-motion changes happen instantly`],
  responsive: [`Fills its container up to 520px; on narrow screens the email address and the shortcut hint hide`, `Dark mode built in: switches when an ancestor (usually <html>) has the class dark or data-theme="dark"`]
};
export { e as docs };

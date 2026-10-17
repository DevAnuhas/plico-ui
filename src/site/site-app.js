"use client";
import * as React from 'react';import * as ReactDOM from 'react-dom';import * as JSX from 'react/jsx-runtime';import {brand} from '../lib/brand.js';import {previewModules,fullScreenModules} from '../library/preview-map.js';
function localText(value){return value.replaceAll('__PLICO_ORIGIN__',brand.url).replaceAll('__PLICO_REPO__',brand.repoUrl)}
const sourceBundles=new Map(),sourceRequests=new Map(),sourceSelections=new Map(),sourceListeners=new Set();let sourceVersion=0;
function sourceSubscribe(listener){sourceListeners.add(listener);return()=>sourceListeners.delete(listener)}
function sourceSnapshot(){return sourceVersion}
function sourceNotify(){sourceVersion++;for(const listener of sourceListeners)listener()}
function selectedSourceFile(slug){const item=sourceBundles.get(slug),files=item?.files??[],target=sourceSelections.get(slug)??item?.meta?.primaryFile??item?.meta?.main;return files.find(file=>file.target===target||file.path===target)??files[0]}
async function loadLocalSource(slug){if(!sourceBundles.has(slug)){if(!sourceRequests.has(slug))sourceRequests.set(slug,fetch('/r/'+encodeURIComponent(slug)+'.json').then(response=>{if(!response.ok)throw Error('Component source is unavailable.');return response.json()}).then(item=>{sourceBundles.set(slug,item);sourceNotify();return item}).finally(()=>sourceRequests.delete(slug)));await sourceRequests.get(slug)}return selectedSourceFile(slug)?.content??''}
function sourceFilename(slug){const file=selectedSourceFile(slug);return (file?.target??file?.path??slug).split('/').at(-1)}
function SourceFiles({slug}){React.useSyncExternalStore(sourceSubscribe,sourceSnapshot,()=>0);const item=sourceBundles.get(slug),files=item?.files??[],file=selectedSourceFile(slug);return React.createElement('div',{className:'source-browser'},React.createElement('label',null,'Source files ('+files.length+')',React.createElement('select',{value:file?.target??file?.path??'',onChange:event=>{sourceSelections.set(slug,event.target.value);sourceNotify()}},files.map((f,index)=>React.createElement('option',{value:f.target??f.path,key:(f.target??f.path)+index},f.target??f.path)))),React.createElement('code',{className:'source-browser__target'},file?.target??file?.path??'Loading file targets…'),React.createElement('p',null,'Copy shows the selected file. Install the complete item with the CLI, or retain every file and its relative imports when copying manually.'),React.createElement('a',{href:'/r/'+encodeURIComponent(slug)+'.json',download:slug+'.json'},'Download complete registry bundle'))}
function InstallSourcePanel({entry,source}){const slug=entry.sourceSlug??entry.slug;return React.createElement(M,{id:'installation',title:'Installation',lead:'Install the complete source package with the shadcn CLI. Each item includes a local entry point and its required files.'},React.createElement(Zi,{label:'Terminal',code:'npx shadcn@latest add '+brand.url+'/r/'+slug+'.json'}),React.createElement('p',{className:'doc__p'},'For a protected deployment, configure the @plico namespace with the deployment header shown in the installation guide, then install @plico/'+slug+'.'),React.createElement('p',{className:'doc__p'},React.createElement(F,{to:'/docs/installation',className:'doc__link'},'Installation and protected deployment setup')),React.createElement(qi,{filename:'app/page.jsx',code:'import Demo, { Component } from "@/components/plico/'+slug+'";\n\nexport default function Page() {\n  return <Demo />;\n}'}),React.createElement('p',{className:'doc__p'},'Demo renders the configured preview. Component is the reusable primitive; pass the props described below. For manual installation, the bundle lists all target paths and file contents. Keep the complete directory hierarchy, embedded assets and applicable license files.'),React.createElement(SourceFiles,{slug}),React.createElement(qi,{filename:sourceFilename(slug),code:source??'// Loading the selected file…',maxHeight:360}))}
function PlicoIntroduction(){return React.createElement(React.Fragment,null,React.createElement(M,{id:'what-it-is',title:'What '+brand.name+' is'},React.createElement('p',{className:'doc__p'},brand.name+' is a React library with live previews, documentation and local source packages. Browse components, blocks, screens, illustrations and motion, then install the pieces you need into your project.'),React.createElement('p',{className:'doc__p'},'Every item includes an entry point and its required modules, styles and assets. The Code tab lets you inspect or copy each file; the registry bundle contains the complete package.')),React.createElement(M,{id:'reading-a-page',title:'Reading a component page'},React.createElement('p',{className:'doc__p'},'Try the preview, reset it, compare available styles, then read the usage, API, keyboard and motion documentation. The Code tab includes a file selector and target paths. Press ⌘K or Ctrl+K to search the library.')),React.createElement(M,{id:'installing',title:'Install and own the source'},React.createElement('p',{className:'doc__p'},'Use the shadcn CLI to preserve each item’s file hierarchy and imports. Installed items expose a Demo, a reusable Component and a descriptive alias; screens also export FullScreen. Components remain local and editable.'),React.createElement(F,{to:'/docs/installation',className:'doc__link'},'Read installation instructions')),React.createElement(M,{id:'source-and-notices',title:'Source and notices'},React.createElement('p',{className:'doc__p'},'All items in this library are available without an application account or purchase gate. Retain the license and attribution files included with the source. Deployment access protection, when enabled by the host, also applies to registry and agent requests.')))}
function PlicoInstallation(){const namespace=JSON.stringify({registries:{[brand.namespace]:brand.url+'/r/{name}.json'}},null,2),protectedNamespace=JSON.stringify({registries:{[brand.namespace]:{url:brand.url+'/r/{name}.json',headers:{'x-vercel-protection-bypass':'${PLICO_REGISTRY_TOKEN}'}}}},null,2);return React.createElement(React.Fragment,null,React.createElement(M,{id:'requirements',title:'Requirements'},React.createElement('p',{className:'doc__p'},'Use a React project and a configured components.json for the shadcn CLI. Its components alias selects the installation root. The examples below assume @/components; another alias changes the import path to match. These packages retain their local modules and embedded assets.')),React.createElement(M,{id:'install',title:'Install a complete item'},React.createElement(Zi,{label:'Terminal',code:'npx shadcn@latest add '+brand.url+'/r/button.json'}),React.createElement('p',{className:'doc__p'},'This direct URL command works when the deployment is accessible without a protection header. The item installs under the components alias, in plico/button, including its facade and dependencies.'),React.createElement(qi,{filename:'app/page.jsx',code:'import ButtonDemo, { Component as Button } from "@/components/plico/button";\n\nexport default function Page() {\n  return <ButtonDemo />;\n}'}),React.createElement('p',{className:'doc__p'},'The default export is the configured Demo. Use Component with the API documented on its page for your own application. A screen also exposes FullScreen.')),React.createElement(M,{id:'registry',title:'Configure short names'},React.createElement('p',{className:'doc__p'},'Merge this namespace into your existing components.json, then use @plico/item-name.'),React.createElement(qi,{filename:'components.json',code:namespace}),React.createElement(Zi,{label:'Terminal',code:'npx shadcn@latest add @plico/button'})),React.createElement(M,{id:'protected-deployments',title:'Protected deployments'},React.createElement('p',{className:'doc__p'},'When Vercel Deployment Protection is enabled, registry and MCP clients need a host-issued bypass token. Store it in PLICO_REGISTRY_TOKEN and configure the namespace header below. Use the namespace command so the CLI applies that header; a direct URL command does not inherit namespace headers.'),React.createElement(qi,{filename:'components.json',code:protectedNamespace}),React.createElement(Zi,{label:'Terminal',code:'npx shadcn@latest add @plico/button'})),React.createElement(M,{id:'manual',title:'Manual installation'},React.createElement('p',{className:'doc__p'},'Open Code on an item page and select a file to inspect its target and copy its content. Download the complete registry JSON to retrieve all files. Copy every target, preserve relative directories and imports, and retain bundled assets and applicable license files. A single copied source file may not include the item’s dependencies.')))}
function LocalRedirect(){React.useEffect(()=>aa('/components',true),[]);return null}
function LocalLicense(){const route=typeof window==='undefined'?'license':window.location.pathname.split('/').filter(Boolean)[0],title={license:'License and notices',terms:'Terms of this experiment',privacy:'Privacy',imprint:'Project information',refund:'No purchases'}[route]??'Project information',text={license:'This private library experiment includes source files with their applicable license and attribution notices. Consult the repository notices before redistributing an item.',terms:'This is a private UI library experiment for evaluation. The examples are interface demonstrations and do not provide production services, transactions or backend integrations.',privacy:'The site does not include application accounts, payment collection or marketing analytics. Your browser stores theme and style preferences locally. The hosting platform may process request and access logs under its own policies.',imprint:'Plico UI is a private software experiment. Project information and source notices are maintained in the repository; this page does not make a commercial contact or legal-address claim.',refund:'This experiment does not sell products or collect payments.'}[route]??'Project information is maintained in the repository.';return React.createElement('article',{className:'doc__article'},React.createElement('h1',{className:'doc__title'},title),React.createElement('p',{className:'doc__p'},text),React.createElement('a',{href:brand.repoUrl,className:'doc__link'},'View repository'))}

const fullScreenPreviews=Object.fromEntries(Object.entries(fullScreenModules).map(([slug,loader])=>[slug,React.lazy(loader)]));
var m = React;
var A = JSX;
var wa = ReactDOM;
function F({
  to,
  onClick,
  ...props
}) {
  if (/^\/(pricing|login|account|partner|refund)(?:\/|$)/.test(to)) return null;
  return React.createElement("a", {
    href: to,
    onClick: event => {
      onClick?.(event);
      if (!event.defaultPrevented && !event.metaKey && !event.ctrlKey && !event.shiftKey && event.button === 0) {
        event.preventDefault();
        aa(to);
      }
    },
    ...props
  });
}
function e(getters) {
  const out = {};
  for (const [key, get] of Object.entries(getters)) Object.defineProperty(out, key, {
    enumerable: true,
    get
  });
  return out;
}
function i(loader) {
  return loader();
}
var __vite__mapDeps = () => [];
function s({
  icon,
  size = 24,
  color = "currentColor",
  ...props
}) {
  return React.createElement("svg", {
    viewBox: "0 0 24 24",
    width: size,
    height: size,
    fill: "none",
    color,
    ...props
  }, ...(Array.isArray(icon) ? icon : []).map(([tag, attributes], index) => React.createElement(tag, {
    ...attributes,
    key: attributes.key ?? index
  })));
}
var k = {
  name: brand.name,
  registry: brand.namespace,
  url: brand.url,
  tagline: brand.tagline,
  author: {
    name: brand.name,
    url: brand.repoUrl
  },
  contactEmail: "",
  promo: {
    enabled: false
  },
  links: {
    pro: "/components",
    github: brand.repoUrl,
    feedback: brand.repoUrl + "/issues",
    x: brand.repoUrl,
    support: "/contact"
  }
};
function to() {
  return {
    plan: "pro",
    email: "",
    id: "local-library"
  };
}
function no() {
  return false;
}
async function ro(entry) {
  return entry.loadSource();
}
function io(entry) {
  const slug = entry.sourceSlug ?? entry.slug;
  React.useSyncExternalStore(sourceSubscribe, sourceSnapshot, () => 0);
  const [error, setError] = React.useState(null);
  React.useEffect(() => {
    let active = true;
    setError(null);
    loadLocalSource(slug).catch(error => {
      if (active) setError(error.message);
    });
    return () => {
      active = false;
    };
  }, [slug]);
  return error ? "// " + error : selectedSourceFile(slug)?.content ?? null;
}
function ha() {
  return React.createElement(PlicoIntroduction);
}
function ga() {
  return React.createElement(PlicoInstallation);
}
function Ba() {
  return React.createElement("section", {
    className: "hero"
  }, React.createElement("h1", {
    className: "hero__title"
  }, brand.tagline));
}
function vo() {}
var mc = [{
  q: "What is Plico UI?",
  a: "React components, blocks, screens, illustrations and motion, with previews, documentation and editable source packages."
}, {
  q: "How do I install a component?",
  a: "Use the shadcn CLI to install its entry point and required files. The Code tab also exposes each file and a complete registry bundle."
}, {
  q: "What do I import?",
  a: "Installed items expose a default Demo, a named Component and descriptive aliases under your components alias in plico/item-name. Screens also export FullScreen."
}, {
  q: "Can I use a coding assistant?",
  a: "Use the Copy prompt bar, the library index at /llms.txt or the component tools at /mcp. Host deployment protection also applies to agent requests."
}, {
  q: "Does it support themes?",
  a: "The previews include light and dark themes. See each item’s documentation for its CSS variables and motion behavior."
}, {
  q: "How is source access handled?",
  a: "Every item is available without an application purchase or account gate. The host may protect the deployment itself. See the repository notices for source terms and attribution."
}];
function co() {}
function Po() {
  return {
    offer: null,
    loaded: true
  };
}
function Lo() {}
async function Fo() {
  return null;
}
function Ho() {
  aa("/components");
}
async function Ja() {
  return null;
}
async function Ya() {
  return null;
}
async function Xa() {
  return null;
}
async function Za() {
  return [];
}
async function Qa() {}
async function $a() {
  return null;
}
function us() {
  return null;
}
function fs() {
  return null;
}
function vs() {
  return null;
}
function Ko() {
  return null;
}
function Gs() {
  return null;
}
function Us() {
  return React.createElement(Vs);
}
function Qi() {
  return null;
}
function ls({
  className = ""
}) {
  return React.createElement("a", {
    className: "btn btn--secondary btn--icon " + className,
    href: brand.repoUrl,
    target: "_blank",
    rel: "noreferrer",
    "aria-label": brand.name + " on GitHub",
    title: "View source on GitHub"
  }, React.createElement(j, {
    icon: ji,
    size: 15
  }));
}
function Ca({
  size = 15,
  className = ""
}) {
  return React.createElement("svg", {
    className: "logo-mark " + className,
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    "aria-hidden": true
  }, React.createElement("path", {
    d: "M5 21V3h8a6 6 0 0 1 0 12H9v6H5Zm4-10h4a2 2 0 0 0 0-4H9v4Z",
    fill: "currentColor"
  }));
}
function jc() {
  return React.createElement(LocalRedirect);
}
function kc() {
  return React.createElement(LocalRedirect);
}
function Fc() {
  return React.createElement(LocalRedirect);
}
function Ic() {
  return React.createElement(LocalRedirect);
}
function Mc() {
  return React.createElement("div", {
    className: "doc"
  }, React.createElement("h1", {
    className: "doc__title"
  }, "Contact"), React.createElement("p", {
    className: "doc__p"
  }, "Questions, feedback or a bug? Open an issue in the project repository."), React.createElement("a", {
    href: brand.repoUrl + "/issues",
    className: "btn btn--primary"
  }, "Open GitHub issues"));
}
function Pc() {
  return React.createElement(LocalLicense);
}
function Nc() {
  return React.createElement(LocalLicense);
}
function ba() {
  return React.createElement(React.Fragment, null, React.createElement(M, {
    id: "agent-workflow",
    title: "Use with your coding assistant"
  }, React.createElement("p", {
    className: "doc__p"
  }, "Browse a component, copy its prompt or install it from the registry. Every item includes its local source and documentation."), React.createElement(Zi, {
    label: "Terminal",
    code: "npx shadcn@latest add " + brand.url + "/r/button.json"
  })), React.createElement(M, {
    id: "mcp",
    title: "Connect the component tools"
  }, React.createElement("p", {
    className: "doc__p"
  }, "The component tools expose the catalog, documentation and source to your agent. No application account is required. Protected deployments also require the host’s bypass header for remote tools."), React.createElement(Zi, {
    label: "Terminal",
    code: "claude mcp add --transport http plico-ui " + (brand.mcpUrl ?? brand.url + "/mcp")
  }), React.createElement("p", {
    className: "doc__p"
  }, "You can also give your assistant " + brand.url + "/llms.txt for a compact library index.")));
}
var se = e({
    entry: () => ce
  }),
  ce = {
    slug: `agent-inbox`,
    name: `Agent Inbox`,
    description: `All your background agent tasks in one calm list – live clocks and status tags, filter tabs with rolling counts, rows that unfold to the last steps with Approve, Reject, Retry or Open, and glide to their new place`,
    category: `Agents`,
    Preview: (0, m.lazy)(() => i(() => previewModules["demo-D8lqmxyw.js"](), __vite__mapDeps([0, 1, 2, 3, 4]))),
    loadSource: () => loadLocalSource("agent-inbox"),
    loadDocs: () => i(() => import("./chunks/docs-BtXzxmhp.js").then(e => e.docs), []),
    clean: {
      Preview: (0, m.lazy)(() => i(() => previewModules["demo.clean-BBgUsqmk.js"](), __vite__mapDeps([5, 1, 2, 3, 4]))),
      loadSource: () => loadLocalSource("agent-inbox-clean"),
      loadDocs: () => i(() => import("./chunks/docs.clean-BKGBfDOD.js").then(e => e.docs), [])
    },
    added: `2026-10-14T16:00:00+02:00`,
    order: 1,
    pro: false
  },
  le = e({
    entry: () => ue
  }),
  ue = {
    slug: `agent-lanes`,
    name: `Agent Lanes`,
    description: `Where every agent is right now – a live timeline with a lane per agent, tasks growing into “now”, hand-offs drawn between agents and approvals right on the block`,
    category: `Agents`,
    Preview: (0, m.lazy)(() => i(() => previewModules["demo-DjN2XUBS.js"](), __vite__mapDeps([6, 1, 2, 3, 7]))),
    loadSource: () => loadLocalSource("agent-lanes"),
    loadDocs: () => i(() => import("./chunks/docs-Cr8lKUzQ.js").then(e => e.docs), []),
    clean: {
      Preview: (0, m.lazy)(() => i(() => previewModules["demo.clean-1HqvmQFW.js"](), __vite__mapDeps([8, 1, 2, 3, 7]))),
      loadSource: () => loadLocalSource("agent-lanes-clean"),
      loadDocs: () => i(() => import("./chunks/docs.clean-C4vtpNbt.js").then(e => e.docs), [])
    },
    added: `2026-10-17T12:00:00+02:00`,
    order: 1,
    pro: false
  },
  de = e({
    entry: () => fe
  }),
  fe = {
    slug: `agent-plan`,
    name: `Agent Plan`,
    description: `An agent's step-by-step plan to review before it runs – rename, drag to reorder, remove or add steps, then watch each one run with live timers and retry from a failed step`,
    category: `Agents`,
    Preview: (0, m.lazy)(() => i(() => previewModules["demo-Dhxw29y6.js"](), __vite__mapDeps([9, 1, 2, 3, 10, 11]))),
    loadSource: () => loadLocalSource("agent-plan"),
    loadDocs: () => i(() => import("./chunks/docs-D3ABdLPT.js").then(e => e.docs), []),
    clean: {
      Preview: (0, m.lazy)(() => i(() => previewModules["demo.clean-DhEwvoWY.js"](), __vite__mapDeps([12, 1, 2, 3, 11]))),
      loadSource: () => loadLocalSource("agent-plan-clean"),
      loadDocs: () => i(() => import("./chunks/docs.clean-DSswoBJu.js").then(e => e.docs), [])
    },
    added: `2026-10-09T23:29:00+02:00`,
    order: 3,
    pro: false
  },
  pe = e({
    entry: () => me
  }),
  me = {
    slug: `agent-steering`,
    name: `Agent Steering`,
    description: `Steer an agent while it works – queue a note for the next step and watch it glide into the plan when the agent picks it up, or interrupt right away`,
    category: `Agents`,
    Preview: (0, m.lazy)(() => i(() => previewModules["demo-BIClVWrb.js"](), __vite__mapDeps([13, 1, 2, 3, 14]))),
    loadSource: () => loadLocalSource("agent-steering"),
    loadDocs: () => i(() => import("./chunks/docs-CaN0P0XV.js").then(e => e.docs), []),
    clean: {
      Preview: (0, m.lazy)(() => i(() => previewModules["demo.clean-BdEtaf2R.js"](), __vite__mapDeps([15, 1, 2, 3, 14]))),
      loadSource: () => loadLocalSource("agent-steering-clean"),
      loadDocs: () => i(() => import("./chunks/docs.clean-D6WKo64J.js").then(e => e.docs), [])
    },
    added: `2026-10-16T12:00:00+02:00`,
    order: 1,
    pro: false
  },
  w = e({
    entry: () => he
  }),
  he = {
    slug: `ai-answer`,
    name: `AI Answer`,
    description: `Streamed answer with source cards, citation chips that preview their source, copy, regenerate, feedback and follow-ups`,
    category: `Chat`,
    Preview: (0, m.lazy)(() => i(() => previewModules["demo-DRZinwQJ.js"](), __vite__mapDeps([16, 1, 2, 3, 17]))),
    loadSource: () => loadLocalSource("ai-answer"),
    loadDocs: () => i(() => import("./chunks/docs-DnStOjCc.js").then(e => e.docs), []),
    clean: {
      Preview: (0, m.lazy)(() => i(() => previewModules["demo.clean-DRkQ7w4o.js"](), __vite__mapDeps([18, 1, 2, 3, 17]))),
      loadSource: () => loadLocalSource("ai-answer-clean"),
      loadDocs: () => i(() => import("./chunks/docs.clean-q_5UM703.js").then(e => e.docs), [])
    },
    added: `2026-10-08T12:38:00+02:00`,
    order: 0,
    pro: false
  },
  ge = e({
    entry: () => _e
  }),
  _e = {
    slug: `approval-card`,
    name: `Approval Card`,
    description: `An agent asks before it acts – risk badge, preview, Approve and Deny with shortcuts, a pausing countdown, and a smooth morph into a resolved row`,
    category: `Agents`,
    Preview: (0, m.lazy)(() => i(() => previewModules["demo-DQ8Q9s5p.js"](), __vite__mapDeps([19, 1, 2, 3, 20, 21]))),
    loadSource: () => loadLocalSource("approval-card"),
    loadDocs: () => i(() => import("./chunks/docs-BfqH4QUp.js").then(e => e.docs), []),
    clean: {
      Preview: (0, m.lazy)(() => i(() => previewModules["demo.clean-WOdGIyW9.js"](), __vite__mapDeps([22, 1, 2, 3, 21]))),
      loadSource: () => loadLocalSource("approval-card-clean"),
      loadDocs: () => i(() => import("./chunks/docs.clean-BblgJ4cP.js").then(e => e.docs), [])
    },
    added: `2026-10-09T23:33:00+02:00`,
    order: 2,
    pro: false
  },
  ve = e({
    entry: () => ye
  }),
  ye = {
    slug: `autonomy-dial`,
    name: `Autonomy Dial`,
    description: `How much an agent may do on its own – a three-stop dial, and its real actions gliding between “Runs on its own” and “Asks you first”, with a lock for what always asks`,
    category: `Agents`,
    Preview: (0, m.lazy)(() => i(() => previewModules["demo-Dzn4_UqA.js"](), __vite__mapDeps([23, 1, 2, 3, 24]))),
    loadSource: () => loadLocalSource("autonomy-dial"),
    loadDocs: () => i(() => import("./chunks/docs-Bo7zVMZQ.js").then(e => e.docs), []),
    clean: {
      Preview: (0, m.lazy)(() => i(() => previewModules["demo.clean-tD99wK4F.js"](), __vite__mapDeps([25, 1, 2, 3, 24]))),
      loadSource: () => loadLocalSource("autonomy-dial-clean"),
      loadDocs: () => i(() => import("./chunks/docs.clean-Bh2SgH6-.js").then(e => e.docs), [])
    },
    added: `2026-10-16T15:00:00+02:00`,
    order: 1,
    pro: false
  },
  be = e({
    entry: () => xe
  }),
  xe = {
    slug: `billing-schedule`,
    name: `Billing Schedule`,
    description: `Build a billing phase – start date, duration, products with repeats and timing, discount, minimum and live totals`,
    category: `Inputs`,
    Preview: (0, m.lazy)(() => i(() => previewModules["demo-nVEvL_e8.js"](), __vite__mapDeps([26, 1, 2, 3, 27]))),
    loadSource: () => loadLocalSource("billing-schedule"),
    loadDocs: () => i(() => import("./chunks/docs-CWsQ8QN-.js").then(e => e.docs), []),
    clean: {
      Preview: (0, m.lazy)(() => i(() => previewModules["demo.clean-C4OVVYU0.js"](), __vite__mapDeps([28, 1, 2, 3, 27]))),
      loadSource: () => loadLocalSource("billing-schedule-clean"),
      loadDocs: () => i(() => import("./chunks/docs.clean-B5LUm_il.js").then(e => e.docs), [])
    },
    added: `2026-10-04T20:47:00+02:00`,
    order: 3,
    pro: false
  },
  Se = e({
    entry: () => Ce
  }),
  Ce = {
    slug: `breakdown-chart`,
    name: `Breakdown Chart`,
    description: `Stacked bar chart with measure, slice and segment pickers, a hover breakdown and a linked table`,
    category: `Data display`,
    Preview: (0, m.lazy)(() => i(() => previewModules["demo-B2j7cOwX.js"](), __vite__mapDeps([29, 3, 2, 30, 1, 31]))),
    loadSource: () => loadLocalSource("breakdown-chart"),
    loadDocs: () => i(() => import("./chunks/docs-IkEC_JRe.js").then(e => e.docs), []),
    clean: {
      Preview: (0, m.lazy)(() => i(() => previewModules["demo.clean-C0Kuxzg7.js"](), __vite__mapDeps([32, 1, 2, 3, 31]))),
      loadSource: () => loadLocalSource("breakdown-chart-clean"),
      loadDocs: () => i(() => import("./chunks/docs.clean-kzokqAH9.js").then(e => e.docs), [])
    },
    added: `2026-10-03`,
    order: 2,
    pro: false
  },
  we = e({
    entry: () => Te
  }),
  Te = {
    slug: `button`,
    name: `Button`,
    description: `Primary, secondary, ghost and destructive buttons with icons, sizes and a shimmering loading state`,
    category: `Buttons`,
    Preview: (0, m.lazy)(() => i(() => previewModules["demo-Da5-XF-c.js"](), __vite__mapDeps([33, 1, 2, 3, 34, 35]))),
    loadSource: () => loadLocalSource("button"),
    loadDocs: () => i(() => import("./chunks/docs-C9p_9cDP.js").then(e => e.docs), []),
    clean: {
      Preview: (0, m.lazy)(() => i(() => previewModules["demo.clean-DkN_5ZQ5.js"](), __vite__mapDeps([36, 1, 2, 3, 35]))),
      loadSource: () => loadLocalSource("button-clean"),
      loadDocs: () => i(() => import("./chunks/docs.clean-Cj2wJRA7.js").then(e => e.docs), [])
    },
    order: 2,
    pro: false
  },
  T = e({
    entry: () => E
  }),
  E = {
    slug: `change-summary`,
    name: `Change Summary`,
    description: `What moved since last time – one metric per row with a colored trend`,
    category: `Data display`,
    Preview: (0, m.lazy)(() => i(() => previewModules["demo-D_fnjW-9.js"](), __vite__mapDeps([37, 3, 2, 38]))),
    loadSource: () => loadLocalSource("change-summary"),
    loadDocs: () => i(() => import("./chunks/docs-pueYgHNw.js").then(e => e.docs), []),
    clean: {
      Preview: (0, m.lazy)(() => i(() => previewModules["demo.clean-CUpZACNd.js"](), __vite__mapDeps([39, 3, 2, 38]))),
      loadSource: () => loadLocalSource("change-summary-clean"),
      loadDocs: () => i(() => import("./chunks/docs.clean-BJyOolVS.js").then(e => e.docs), [])
    },
    order: 3,
    pro: false
  },
  Ee = e({
    entry: () => De
  }),
  De = {
    slug: `chat-composer`,
    name: `Chat Composer`,
    description: `Prompt composer with model picker, voice input, app connections and approval request`,
    category: `Chat`,
    Preview: (0, m.lazy)(() => i(() => previewModules["demo-BvRPen0m.js"](), __vite__mapDeps([40, 3, 2, 41, 1, 42]))),
    loadSource: () => loadLocalSource("chat-composer"),
    loadDocs: () => i(() => import("./chunks/docs-kKiOVARV.js").then(e => e.docs), []),
    clean: {
      Preview: (0, m.lazy)(() => i(() => previewModules["demo.clean-CA_ipDzE.js"](), __vite__mapDeps([43, 1, 2, 3, 42]))),
      loadSource: () => loadLocalSource("chat-composer-clean"),
      loadDocs: () => i(() => import("./chunks/docs.clean-LcU0OicS.js").then(e => e.docs), [])
    },
    order: 1,
    pro: false
  },
  Oe = e({
    entry: () => ke
  }),
  ke = {
    slug: `cited-answer`,
    name: `Cited Answer`,
    description: `An AI answer wired to its sources – point at a citation to light up its sentence and source, click to unfold the quoted passage with the matching words marked`,
    category: `Chat`,
    Preview: (0, m.lazy)(() => i(() => previewModules["demo-fp335z0j.js"](), __vite__mapDeps([44, 1, 2, 3, 45]))),
    loadSource: () => loadLocalSource("cited-answer"),
    loadDocs: () => i(() => import("./chunks/docs-B05SYv6Z.js").then(e => e.docs), []),
    clean: {
      Preview: (0, m.lazy)(() => i(() => previewModules["demo.clean-Do8sBWBG.js"](), __vite__mapDeps([46, 1, 2, 3, 45]))),
      loadSource: () => loadLocalSource("cited-answer-clean"),
      loadDocs: () => i(() => import("./chunks/docs.clean-Bgc76ydH.js").then(e => e.docs), [])
    },
    added: `2026-10-14T15:00:00+02:00`,
    order: 1,
    pro: false
  },
  Ae = e({
    entry: () => D
  }),
  D = {
    slug: `combobox`,
    name: `Combobox`,
    description: `Pick one or many from a searchable, grouped list – chips with avatars, highlighted matches, create-on-the-fly and full keyboard support`,
    category: `Inputs`,
    Preview: (0, m.lazy)(() => i(() => previewModules["demo-Dh1VwBQQ.js"](), __vite__mapDeps([47, 1, 2, 3, 48]))),
    loadSource: () => loadLocalSource("combobox"),
    loadDocs: () => i(() => import("./chunks/docs-gx2cWf0_.js").then(e => e.docs), []),
    clean: {
      Preview: (0, m.lazy)(() => i(() => previewModules["demo.clean-BeAF0VV4.js"](), __vite__mapDeps([49, 1, 2, 3, 48]))),
      loadSource: () => loadLocalSource("combobox-clean"),
      loadDocs: () => i(() => import("./chunks/docs.clean-C6fAXNCk.js").then(e => e.docs), [])
    },
    added: `2026-10-08T15:41:00+02:00`,
    order: 0,
    pro: false
  },
  je = e({
    entry: () => Me
  }),
  Me = {
    slug: `command-menu`,
    name: `Command Menu`,
    description: `Search and run anything from one field – tool actions with logos and ⌘1–⌘5, everyday commands with icons`,
    category: `Navigation`,
    Preview: (0, m.lazy)(() => i(() => previewModules["demo-ZZIguRMl.js"](), __vite__mapDeps([50, 1, 2, 3, 51]))),
    loadSource: () => loadLocalSource("command-menu"),
    loadDocs: () => i(() => import("./chunks/docs-Ch0zWVGM.js").then(e => e.docs), []),
    clean: {
      Preview: (0, m.lazy)(() => i(() => previewModules["demo.clean-CfccVVbn.js"](), __vite__mapDeps([52, 1, 2, 3, 51]))),
      loadSource: () => loadLocalSource("command-menu-clean"),
      loadDocs: () => i(() => import("./chunks/docs.clean-DPoM2rqj.js").then(e => e.docs), [])
    },
    added: `2026-10-07T22:30:00+02:00`,
    order: 0,
    pro: false
  },
  Ne = e({
    entry: () => Pe
  }),
  Pe = {
    slug: `comment-thread`,
    name: `Comment Thread`,
    description: `One comment with replies – an assistant reports what it did, folds open details and answers @mentions`,
    category: `Chat`,
    Preview: (0, m.lazy)(() => i(() => previewModules["demo-TTVz3U3f.js"](), __vite__mapDeps([53, 1, 2, 3, 54]))),
    loadSource: () => loadLocalSource("comment-thread"),
    loadDocs: () => i(() => import("./chunks/docs-_yznjEBE.js").then(e => e.docs), []),
    clean: {
      Preview: (0, m.lazy)(() => i(() => previewModules["demo.clean-DgcZN_UD.js"](), __vite__mapDeps([55, 1, 2, 3, 54]))),
      loadSource: () => loadLocalSource("comment-thread-clean"),
      loadDocs: () => i(() => import("./chunks/docs.clean-CYmTgIA9.js").then(e => e.docs), [])
    },
    added: `2026-10-03`,
    order: 4,
    pro: false
  },
  Fe = e({
    entry: () => Ie
  }),
  Ie = {
    slug: `comments-panel`,
    name: `Comments Panel`,
    description: `Comment feed with filters, runnable /edit commands, resolve and a composer`,
    category: `Chat`,
    Preview: (0, m.lazy)(() => i(() => previewModules["demo-CPh6u-dx.js"](), __vite__mapDeps([56, 1, 2, 3, 57]))),
    loadSource: () => loadLocalSource("comments-panel"),
    loadDocs: () => i(() => import("./chunks/docs-Ckp_fKFV.js").then(e => e.docs), []),
    clean: {
      Preview: (0, m.lazy)(() => i(() => previewModules["demo.clean-kKXDAKEK.js"](), __vite__mapDeps([58, 1, 2, 3, 57]))),
      loadSource: () => loadLocalSource("comments-panel-clean"),
      loadDocs: () => i(() => import("./chunks/docs.clean-ALKW-pwL.js").then(e => e.docs), [])
    },
    added: `2026-10-03`,
    order: 3,
    pro: false
  },
  Le = e({
    entry: () => Re
  }),
  Re = {
    slug: `compact-breakdown`,
    name: `Compact Breakdown`,
    description: `A total split into its parts in one small card – numbers roll, the bar glides and the ranked rows trade places when the period changes`,
    category: `Data display`,
    Preview: (0, m.lazy)(() => i(() => previewModules["demo-BOiMGMeM.js"](), __vite__mapDeps([59, 1, 2, 3, 60]))),
    loadSource: () => loadLocalSource("compact-breakdown"),
    loadDocs: () => i(() => import("./chunks/docs-DIzwe3nY.js").then(e => e.docs), []),
    clean: {
      Preview: (0, m.lazy)(() => i(() => previewModules["demo.clean-CSd5ZCWu.js"](), __vite__mapDeps([61, 1, 2, 3, 60]))),
      loadSource: () => loadLocalSource("compact-breakdown-clean"),
      loadDocs: () => i(() => import("./chunks/docs.clean-DwdLDQor.js").then(e => e.docs), [])
    },
    added: `2026-10-10T11:42:00+02:00`,
    order: 1,
    pro: false
  },
  ze = e({
    entry: () => Be
  }),
  Be = {
    slug: `context-window`,
    name: `Context Window`,
    description: `What fills the model's context, as a field of cells – hover a part to light it up, remove files, and compact the conversation while its cells shimmer and clear`,
    category: `Agents`,
    Preview: (0, m.lazy)(() => i(() => previewModules["demo-jxSKfjMs.js"](), __vite__mapDeps([62, 1, 2, 3, 63]))),
    loadSource: () => loadLocalSource("context-window"),
    loadDocs: () => i(() => import("./chunks/docs-4sS4mJxe.js").then(e => e.docs), []),
    clean: {
      Preview: (0, m.lazy)(() => i(() => previewModules["demo.clean-BVM0xTTl.js"](), __vite__mapDeps([64, 1, 2, 3, 63]))),
      loadSource: () => loadLocalSource("context-window-clean"),
      loadDocs: () => i(() => import("./chunks/docs.clean--EKmLA6h.js").then(e => e.docs), [])
    },
    added: `2026-10-12T14:00:00+02:00`,
    order: 1,
    pro: false
  },
  Ve = e({
    entry: () => He
  }),
  He = {
    slug: `data-table`,
    name: `Data Table`,
    description: `Spreadsheet-style table: select cells and ranges, edit in place, copy and paste, undo and sort`,
    category: `Data display`,
    Preview: (0, m.lazy)(() => i(() => previewModules["demo-BiF59Z3j.js"](), __vite__mapDeps([65, 1, 2, 3, 66, 67]))),
    loadSource: () => loadLocalSource("data-table"),
    loadDocs: () => i(() => import("./chunks/docs-BF18aJ-j.js").then(e => e.docs), []),
    clean: {
      Preview: (0, m.lazy)(() => i(() => previewModules["demo.clean-DJWKIoS0.js"](), __vite__mapDeps([68, 1, 2, 3, 67]))),
      loadSource: () => loadLocalSource("data-table-clean"),
      loadDocs: () => i(() => import("./chunks/docs.clean-D6zbp80y.js").then(e => e.docs), [])
    },
    order: 2,
    pro: false
  },
  Ue = e({
    entry: () => We
  }),
  We = {
    slug: `date-range-picker`,
    name: `Date Range Picker`,
    description: `Presets and two calendars with a hover preview, comparison with the previous period or year, full keyboard control`,
    category: `Inputs`,
    Preview: (0, m.lazy)(() => i(() => previewModules["demo-sfbKzZ34.js"](), __vite__mapDeps([69, 1, 2, 3, 70]))),
    loadSource: () => loadLocalSource("date-range-picker"),
    loadDocs: () => i(() => import("./chunks/docs-Co7_OGHR.js").then(e => e.docs), []),
    clean: {
      Preview: (0, m.lazy)(() => i(() => previewModules["demo.clean-CFbJ9noA.js"](), __vite__mapDeps([71, 1, 2, 3, 70]))),
      loadSource: () => loadLocalSource("date-range-picker-clean"),
      loadDocs: () => i(() => import("./chunks/docs.clean-B0oHunXD.js").then(e => e.docs), [])
    },
    added: `2026-10-08T15:21:00+02:00`,
    order: 0,
    pro: false
  },
  Ge = e({
    entry: () => Ke
  }),
  Ke = {
    slug: `decision-inbox`,
    name: `Decision Inbox`,
    description: `Open decisions with two quick answers each – answered ones confirm and fold away`,
    category: `Feedback`,
    Preview: (0, m.lazy)(() => i(() => previewModules["demo-CcNPpld_.js"](), __vite__mapDeps([72, 1, 2, 3, 73]))),
    loadSource: () => loadLocalSource("decision-inbox"),
    loadDocs: () => i(() => import("./chunks/docs-Dk9yv4ja.js").then(e => e.docs), []),
    clean: {
      Preview: (0, m.lazy)(() => i(() => previewModules["demo.clean-Cwxrnsci.js"](), __vite__mapDeps([74, 1, 2, 3, 73]))),
      loadSource: () => loadLocalSource("decision-inbox-clean"),
      loadDocs: () => i(() => import("./chunks/docs.clean-F2xvmquK.js").then(e => e.docs), [])
    },
    order: 5,
    pro: false
  },
  qe = e({
    entry: () => Je
  }),
  Je = {
    slug: `dropzone`,
    name: `Dropzone`,
    description: `Drag files in and watch them upload – fanning documents, colored type badges, progress with time left, errors with retry`,
    category: `Inputs`,
    Preview: (0, m.lazy)(() => i(() => previewModules["demo-CQyRPKqn.js"](), __vite__mapDeps([75, 1, 2, 3, 76]))),
    loadSource: () => loadLocalSource("dropzone"),
    loadDocs: () => i(() => import("./chunks/docs-CEAyQswo.js").then(e => e.docs), []),
    clean: {
      Preview: (0, m.lazy)(() => i(() => previewModules["demo.clean-DN2ioSob.js"](), __vite__mapDeps([77, 1, 2, 3, 76]))),
      loadSource: () => loadLocalSource("dropzone-clean"),
      loadDocs: () => i(() => import("./chunks/docs.clean-BnqtWD6T.js").then(e => e.docs), [])
    },
    added: `2026-10-08T14:43:00+02:00`,
    order: 0,
    pro: false
  },
  Ye = e({
    entry: () => Xe
  }),
  Xe = {
    slug: `email-draft`,
    name: `Email Draft`,
    description: `Agent-written email for review – switch recipient and tone, edit inline, remove the attachment, send or discard with undo`,
    category: `Cards`,
    Preview: (0, m.lazy)(() => i(() => previewModules["demo-CQRf-Cg5.js"](), __vite__mapDeps([78, 1, 2, 3, 79]))),
    loadSource: () => loadLocalSource("email-draft"),
    loadDocs: () => i(() => import("./chunks/docs-DvG6MyGO.js").then(e => e.docs), []),
    clean: {
      Preview: (0, m.lazy)(() => i(() => previewModules["demo.clean-CjJwmC-8.js"](), __vite__mapDeps([80, 1, 2, 3, 79]))),
      loadSource: () => loadLocalSource("email-draft-clean"),
      loadDocs: () => i(() => import("./chunks/docs.clean-CSmepD-w.js").then(e => e.docs), [])
    },
    added: `2026-10-04T20:28:00+02:00`,
    order: 3,
    pro: false
  },
  Ze = e({
    entry: () => Qe
  }),
  Qe = {
    slug: `experiment-card`,
    name: `Experiment Card`,
    description: `An A/B test in two lines that quietly unfolds on hover – variants linked to a tiny chart, a metric switch with rolling numbers, and a winner you pick with a click`,
    category: `Data display`,
    Preview: (0, m.lazy)(() => i(() => previewModules["demo-CbW_KPTI.js"](), __vite__mapDeps([81, 1, 2, 3, 82]))),
    loadSource: () => loadLocalSource("experiment-card"),
    loadDocs: () => i(() => import("./chunks/docs-4mTBCgRQ.js").then(e => e.docs), []),
    clean: {
      Preview: (0, m.lazy)(() => i(() => previewModules["demo.clean-BWn0UMw5.js"](), __vite__mapDeps([83, 1, 2, 3, 82]))),
      loadSource: () => loadLocalSource("experiment-card-clean"),
      loadDocs: () => i(() => import("./chunks/docs.clean-BMZW7XW_.js").then(e => e.docs), [])
    },
    added: `2026-10-12T10:30:00+02:00`,
    order: 1,
    pro: false
  },
  $e = e({
    entry: () => et
  }),
  et = {
    slug: `filter-menu`,
    name: `Filter Menu`,
    description: `Grouped filters with removable chips, collapsible checkbox groups, Clear all and full keyboard control`,
    category: `Inputs`,
    Preview: (0, m.lazy)(() => i(() => previewModules["demo-BkxWHDVt.js"](), __vite__mapDeps([84, 3, 2, 85, 1, 86]))),
    loadSource: () => loadLocalSource("filter-menu"),
    loadDocs: () => i(() => import("./chunks/docs-BAeK2YxB.js").then(e => e.docs), []),
    clean: {
      Preview: (0, m.lazy)(() => i(() => previewModules["demo.clean-Djfm83dS.js"](), __vite__mapDeps([87, 1, 2, 3, 86]))),
      loadSource: () => loadLocalSource("filter-menu-clean"),
      loadDocs: () => i(() => import("./chunks/docs.clean-BHAk7JVw.js").then(e => e.docs), [])
    },
    added: `2026-10-04T20:10:00+02:00`,
    order: 2,
    pro: false
  },
  tt = e({
    entry: () => nt
  }),
  nt = {
    slug: `inline-diff`,
    name: `Inline Diff`,
    description: `AI edits to prose shown inline – struck and added words you accept or reject one by one, with keys, a popover and undo`,
    category: `Agents`,
    Preview: (0, m.lazy)(() => i(() => previewModules["demo-CkNJ3LE1.js"](), __vite__mapDeps([88, 1, 2, 3, 89, 90]))),
    loadSource: () => loadLocalSource("inline-diff"),
    loadDocs: () => i(() => import("./chunks/docs-B2DLF_SS.js").then(e => e.docs), []),
    clean: {
      Preview: (0, m.lazy)(() => i(() => previewModules["demo.clean--VSPSi3o.js"](), __vite__mapDeps([91, 1, 2, 3, 90]))),
      loadSource: () => loadLocalSource("inline-diff-clean"),
      loadDocs: () => i(() => import("./chunks/docs.clean-BcLvHkbg.js").then(e => e.docs), [])
    },
    added: `2026-10-09T23:29:00+02:00`,
    order: 4,
    pro: false
  },
  rt = e({
    entry: () => it
  }),
  it = {
    slug: `integration-picker`,
    name: `Integration Picker`,
    description: `Integrations page of a command menu – search, a list of services and the picked one with its connection on two tiles`,
    category: `Navigation`,
    Preview: (0, m.lazy)(() => i(() => previewModules["demo-CGtzgHa8.js"](), __vite__mapDeps([92, 1, 2, 3, 93]))),
    loadSource: () => loadLocalSource("integration-picker"),
    loadDocs: () => i(() => import("./chunks/docs-BF4_1L0x.js").then(e => e.docs), []),
    clean: {
      Preview: (0, m.lazy)(() => i(() => previewModules["demo.clean-Cz5lRox3.js"](), __vite__mapDeps([94, 1, 2, 3, 93]))),
      loadSource: () => loadLocalSource("integration-picker-clean"),
      loadDocs: () => i(() => import("./chunks/docs.clean-tUSra5Eq.js").then(e => e.docs), [])
    },
    added: `2026-10-07T22:20:00+02:00`,
    order: 1,
    pro: false
  },
  at = e({
    entry: () => ot
  }),
  ot = {
    slug: `integration-settings`,
    name: `Integration Settings`,
    description: `Settings card for a connected service – on/off switch, API key, validated site address, time zone and a save bar`,
    category: `Inputs`,
    Preview: (0, m.lazy)(() => i(() => previewModules["demo-gOEEj_G8.js"](), __vite__mapDeps([95, 1, 2, 3, 96]))),
    loadSource: () => loadLocalSource("integration-settings"),
    loadDocs: () => i(() => import("./chunks/docs-subIR2Oi.js").then(e => e.docs), []),
    clean: {
      Preview: (0, m.lazy)(() => i(() => previewModules["demo.clean-BMo3zBgx.js"](), __vite__mapDeps([97, 1, 2, 3, 96]))),
      loadSource: () => loadLocalSource("integration-settings-clean"),
      loadDocs: () => i(() => import("./chunks/docs.clean-Q5m9NBRf.js").then(e => e.docs), [])
    },
    added: `2026-10-03`,
    order: 1,
    pro: false
  },
  st = e({
    entry: () => ct
  }),
  ct = {
    slug: `kpi-chart`,
    name: `KPI Chart`,
    description: `Metric card with a multi-line chart and a tooltip that follows the pointer`,
    category: `Data display`,
    Preview: (0, m.lazy)(() => i(() => previewModules["demo-C5oa8zop.js"](), __vite__mapDeps([98, 3, 2, 99, 1, 100]))),
    loadSource: () => loadLocalSource("kpi-chart"),
    loadDocs: () => i(() => import("./chunks/docs-Dde47EwE.js").then(e => e.docs), []),
    clean: {
      Preview: (0, m.lazy)(() => i(() => previewModules["demo.clean-BdfQ2LZR.js"](), __vite__mapDeps([101, 1, 2, 3, 100]))),
      loadSource: () => loadLocalSource("kpi-chart-clean"),
      loadDocs: () => i(() => import("./chunks/docs.clean-DG9GSNHk.js").then(e => e.docs), [])
    },
    order: 1,
    pro: false
  },
  lt = e({
    entry: () => ut
  }),
  ut = {
    slug: `memory-panel`,
    name: `Memory Panel`,
    description: `What the assistant remembers about you, grouped and editable – a master switch, category filters, and on every memory edit in place, pause or forget with Undo on the tray`,
    category: `Agents`,
    Preview: (0, m.lazy)(() => i(() => previewModules["demo-DZle1gG8.js"](), __vite__mapDeps([102, 1, 2, 3, 103]))),
    loadSource: () => loadLocalSource("memory-panel"),
    loadDocs: () => i(() => import("./chunks/docs-BYw0IeXU.js").then(e => e.docs), []),
    clean: {
      Preview: (0, m.lazy)(() => i(() => previewModules["demo.clean-2HwVU5pS.js"](), __vite__mapDeps([104, 1, 2, 3, 103]))),
      loadSource: () => loadLocalSource("memory-panel-clean"),
      loadDocs: () => i(() => import("./chunks/docs.clean-DIZNujLU.js").then(e => e.docs), [])
    },
    added: `2026-10-14T15:00:00+02:00`,
    order: 1,
    pro: false
  },
  dt = e({
    entry: () => ft
  }),
  ft = {
    slug: `message-actions`,
    name: `Message Actions`,
    description: `The quiet bar under an AI message – copy turns into a check, regenerate spins and unfolds a version switcher, thumbs pop and ask why, read aloud becomes a tiny equalizer`,
    category: `Chat`,
    Preview: (0, m.lazy)(() => i(() => previewModules["demo-CgV2euur.js"](), __vite__mapDeps([105, 1, 2, 3, 106]))),
    loadSource: () => loadLocalSource("message-actions"),
    loadDocs: () => i(() => import("./chunks/docs-DHZEMMUR.js").then(e => e.docs), []),
    clean: {
      Preview: (0, m.lazy)(() => i(() => previewModules["demo.clean-jqs229XM.js"](), __vite__mapDeps([107, 1, 2, 3, 106]))),
      loadSource: () => loadLocalSource("message-actions-clean"),
      loadDocs: () => i(() => import("./chunks/docs.clean-7a_3RgBj.js").then(e => e.docs), [])
    },
    added: `2026-10-14T16:00:00+02:00`,
    order: 1,
    pro: false
  },
  pt = e({
    entry: () => mt
  }),
  mt = {
    slug: `model-picker`,
    name: `Model Picker`,
    description: `The model menu of an AI chat – point at a model and its speed, quality and cost bars fill, switch on extended thinking and its effort unfolds, while the tray rolls the first-token time and price`,
    category: `Chat`,
    Preview: (0, m.lazy)(() => i(() => previewModules["demo-D9-q9LWy.js"](), __vite__mapDeps([108, 1, 2, 3, 109]))),
    loadSource: () => loadLocalSource("model-picker"),
    loadDocs: () => i(() => import("./chunks/docs-B2vZk3kt.js").then(e => e.docs), []),
    clean: {
      Preview: (0, m.lazy)(() => i(() => previewModules["demo.clean-CoifhOe5.js"](), __vite__mapDeps([110, 1, 2, 3, 109]))),
      loadSource: () => loadLocalSource("model-picker-clean"),
      loadDocs: () => i(() => import("./chunks/docs.clean-BaZCBKT8.js").then(e => e.docs), [])
    },
    added: `2026-10-14T15:00:00+02:00`,
    order: 1,
    pro: false
  },
  ht = e({
    entry: () => gt
  }),
  gt = {
    slug: `notification-stack`,
    name: `Notification Stack`,
    description: `Notice cards stacked behind each other – dismiss the front one to reveal the next`,
    category: `Feedback`,
    Preview: (0, m.lazy)(() => i(() => previewModules["demo-RSBM-GoA.js"](), __vite__mapDeps([111, 1, 2, 3, 112]))),
    loadSource: () => loadLocalSource("notification-stack"),
    loadDocs: () => i(() => import("./chunks/docs-Y8kxxKKu.js").then(e => e.docs), []),
    clean: {
      Preview: (0, m.lazy)(() => i(() => previewModules["demo.clean-gBQjVTxc.js"](), __vite__mapDeps([113, 1, 2, 3, 112]))),
      loadSource: () => loadLocalSource("notification-stack-clean"),
      loadDocs: () => i(() => import("./chunks/docs.clean-DzYWfmI1.js").then(e => e.docs), [])
    },
    added: `2026-10-03`,
    order: 6,
    pro: false
  },
  _t = e({
    entry: () => vt
  }),
  vt = {
    slug: `otp-input`,
    name: `OTP Input`,
    description: `The verification code field done right – a gliding focus ring, paste and SMS autofill, a calm shake on errors and a morph into Verified`,
    category: `Inputs`,
    Preview: (0, m.lazy)(() => i(() => previewModules["demo-BKNS7xRz.js"](), __vite__mapDeps([114, 1, 2, 3, 115]))),
    loadSource: () => loadLocalSource("otp-input"),
    loadDocs: () => i(() => import("./chunks/docs-BNtW5zDz.js").then(e => e.docs), []),
    clean: {
      Preview: (0, m.lazy)(() => i(() => previewModules["demo.clean-SPg51xTG.js"](), __vite__mapDeps([116, 1, 2, 3, 115]))),
      loadSource: () => loadLocalSource("otp-input-clean"),
      loadDocs: () => i(() => import("./chunks/docs.clean-Gin_1k8r.js").then(e => e.docs), [])
    },
    added: `2026-10-08T17:53:00+02:00`,
    order: 0,
    pro: false
  },
  yt = e({
    entry: () => bt
  }),
  bt = {
    slug: `profile-menu`,
    name: `Profile Menu`,
    description: `Account card with the signed-in user, menu actions and profile setup progress`,
    category: `Navigation`,
    Preview: (0, m.lazy)(() => i(() => previewModules["demo-d_AV0tPL.js"](), __vite__mapDeps([117, 1, 2, 3, 118]))),
    loadSource: () => loadLocalSource("profile-menu"),
    loadDocs: () => i(() => import("./chunks/docs-C8QFU_GC.js").then(e => e.docs), []),
    clean: {
      Preview: (0, m.lazy)(() => i(() => previewModules["demo.clean-Du4BhTGQ.js"](), __vite__mapDeps([119, 1, 2, 3, 118]))),
      loadSource: () => loadLocalSource("profile-menu-clean"),
      loadDocs: () => i(() => import("./chunks/docs.clean-H8K3PE8_.js").then(e => e.docs), [])
    },
    order: 1,
    pro: false
  },
  xt = e({
    entry: () => St
  }),
  St = {
    slug: `progress-tracker`,
    name: `Progress Tracker`,
    description: `Onboarding checklist with an animated progress bar, ticks that draw themselves and auto play`,
    category: `Feedback`,
    Preview: (0, m.lazy)(() => i(() => previewModules["demo-BKqcXOSN.js"](), __vite__mapDeps([120, 1, 2, 3, 121]))),
    loadSource: () => loadLocalSource("progress-tracker"),
    loadDocs: () => i(() => import("./chunks/docs-CaD1NYxe.js").then(e => e.docs), []),
    clean: {
      Preview: (0, m.lazy)(() => i(() => previewModules["demo.clean-CQ9Mgt2p.js"](), __vite__mapDeps([122, 1, 2, 3, 121]))),
      loadSource: () => loadLocalSource("progress-tracker-clean"),
      loadDocs: () => i(() => import("./chunks/docs.clean-CyqSWI06.js").then(e => e.docs), [])
    },
    order: 3,
    pro: false
  },
  Ct = e({
    entry: () => wt
  }),
  wt = {
    slug: `project-card`,
    name: `Project Card`,
    description: `A two-line project summary that quietly unfolds on hover – a progress ring with one segment per subtask, a people filter and a status picker, all linked by hover`,
    category: `Cards`,
    Preview: (0, m.lazy)(() => i(() => previewModules["demo-D4OBH9QL.js"](), __vite__mapDeps([123, 1, 2, 3, 124]))),
    loadSource: () => loadLocalSource("project-card"),
    loadDocs: () => i(() => import("./chunks/docs-B7LDXgsz.js").then(e => e.docs), []),
    clean: {
      Preview: (0, m.lazy)(() => i(() => previewModules["demo.clean-WHeg8d8a.js"](), __vite__mapDeps([125, 1, 2, 3, 124]))),
      loadSource: () => loadLocalSource("project-card-clean"),
      loadDocs: () => i(() => import("./chunks/docs.clean-BzBRkLoA.js").then(e => e.docs), [])
    },
    added: `2026-10-10T15:20:00+02:00`,
    order: 1,
    pro: false
  },
  Tt = e({
    entry: () => Et
  }),
  Et = {
    slug: `prompt-library`,
    name: `Prompt Library`,
    description: `Saved prompt templates with variables – type straight into the sentence, watch the finished prompt assemble below, and use it once every variable is filled`,
    category: `Inputs`,
    Preview: (0, m.lazy)(() => i(() => previewModules["demo-B8j58gGW.js"](), __vite__mapDeps([126, 1, 2, 3, 127]))),
    loadSource: () => loadLocalSource("prompt-library"),
    loadDocs: () => i(() => import("./chunks/docs-BkEThM39.js").then(e => e.docs), []),
    clean: {
      Preview: (0, m.lazy)(() => i(() => previewModules["demo.clean-DF4dB9bw.js"](), __vite__mapDeps([128, 1, 2, 3, 127]))),
      loadSource: () => loadLocalSource("prompt-library-clean"),
      loadDocs: () => i(() => import("./chunks/docs.clean-pSez6WcC.js").then(e => e.docs), [])
    },
    added: `2026-10-14T15:00:00+02:00`,
    order: 1,
    pro: false
  },
  Dt = e({
    entry: () => Ot
  }),
  Ot = {
    slug: `reaction-bar`,
    name: `Reaction Bar`,
    description: `Like, comment, repost and share in one pill – icons pop and fill, counts roll in digit by digit`,
    category: `Buttons`,
    Preview: (0, m.lazy)(() => i(() => previewModules["demo-DlJqXDIq.js"](), __vite__mapDeps([129, 1, 2, 3, 130]))),
    loadSource: () => loadLocalSource("reaction-bar"),
    loadDocs: () => i(() => import("./chunks/docs-BlXuOLsY.js").then(e => e.docs), []),
    clean: {
      Preview: (0, m.lazy)(() => i(() => previewModules["demo.clean-1KuFFkG8.js"](), __vite__mapDeps([131, 1, 2, 3, 130]))),
      loadSource: () => loadLocalSource("reaction-bar-clean"),
      loadDocs: () => i(() => import("./chunks/docs.clean-BIHx13f2.js").then(e => e.docs), [])
    },
    added: `2026-10-04T10:00:00+02:00`,
    order: 2,
    pro: false
  },
  kt = e({
    entry: () => At
  }),
  At = {
    slug: `segmented-control`,
    name: `Segmented Control`,
    description: `Switch between two to six options – a raised pill or underline that glides, stretches a little and can be dragged across, with icons, counts and badges`,
    category: `Navigation`,
    Preview: (0, m.lazy)(() => i(() => previewModules["demo-BzK_zDAD.js"](), __vite__mapDeps([132, 1, 2, 3, 133, 134]))),
    loadSource: () => loadLocalSource("segmented-control"),
    loadDocs: () => i(() => import("./chunks/docs-DnR5fqUI.js").then(e => e.docs), []),
    clean: {
      Preview: (0, m.lazy)(() => i(() => previewModules["demo.clean-D1uXYCFG.js"](), __vite__mapDeps([135, 1, 2, 3, 134]))),
      loadSource: () => loadLocalSource("segmented-control-clean"),
      loadDocs: () => i(() => import("./chunks/docs.clean-DiUhGaq-.js").then(e => e.docs), [])
    },
    added: `2026-10-08T15:42:00+02:00`,
    order: 0,
    pro: false
  },
  jt = e({
    entry: () => Mt
  }),
  Mt = {
    slug: `setup-guide`,
    name: `Setup Guide`,
    description: `Onboarding panel with a progress bar and collapsible task groups that strike through when done`,
    category: `Feedback`,
    Preview: (0, m.lazy)(() => i(() => previewModules["demo-BA5aHbcY.js"](), __vite__mapDeps([136, 1, 2, 3, 137, 138]))),
    loadSource: () => loadLocalSource("setup-guide"),
    loadDocs: () => i(() => import("./chunks/docs-CiCBMHAb.js").then(e => e.docs), []),
    clean: {
      Preview: (0, m.lazy)(() => i(() => previewModules["demo.clean-Ca5XH5pf.js"](), __vite__mapDeps([139, 1, 2, 3, 138]))),
      loadSource: () => loadLocalSource("setup-guide-clean"),
      loadDocs: () => i(() => import("./chunks/docs.clean-CWU7X6cT.js").then(e => e.docs), [])
    },
    order: 4,
    pro: false
  },
  Nt = e({
    entry: () => Pt
  }),
  Pt = {
    slug: `smart-recommendation`,
    name: `Smart Recommendation`,
    description: `Suggestion card with a confidence signal, alternatives to switch to and accept with undo`,
    category: `Cards`,
    Preview: (0, m.lazy)(() => i(() => previewModules["demo-Ed3S7lvS.js"](), __vite__mapDeps([140, 1, 2, 3, 141]))),
    loadSource: () => loadLocalSource("smart-recommendation"),
    loadDocs: () => i(() => import("./chunks/docs-Bj9wwWM5.js").then(e => e.docs), []),
    clean: {
      Preview: (0, m.lazy)(() => i(() => previewModules["demo.clean-CnpU6JZL.js"](), __vite__mapDeps([142, 1, 2, 3, 141]))),
      loadSource: () => loadLocalSource("smart-recommendation-clean"),
      loadDocs: () => i(() => import("./chunks/docs.clean-DAMwFsKO.js").then(e => e.docs), [])
    },
    added: `2026-10-03`,
    order: 2,
    pro: false
  },
  Ft = e({
    entry: () => It
  }),
  It = {
    slug: `stepper-form`,
    name: `Stepper Form`,
    description: `A multi-step flow for onboarding and setup – steps that fill and check off, sliding steps, a card that morphs to each step, inline validation and a success state`,
    category: `Inputs`,
    Preview: (0, m.lazy)(() => i(() => previewModules["demo-BI6YmM8v.js"](), __vite__mapDeps([143, 1, 2, 3, 144]))),
    loadSource: () => loadLocalSource("stepper-form"),
    loadDocs: () => i(() => import("./chunks/docs-C4pAsv52.js").then(e => e.docs), []),
    clean: {
      Preview: (0, m.lazy)(() => i(() => previewModules["demo.clean-7tCw9u4A.js"](), __vite__mapDeps([145, 1, 2, 3, 144]))),
      loadSource: () => loadLocalSource("stepper-form-clean"),
      loadDocs: () => i(() => import("./chunks/docs.clean-CGankNEa.js").then(e => e.docs), [])
    },
    added: `2026-10-08T17:52:00+02:00`,
    order: 0,
    pro: false
  },
  Lt = e({
    entry: () => Rt
  }),
  Rt = {
    slug: `thinking-loader`,
    name: `Thinking Loader`,
    description: `A small working pill for AI replies – an eight-ray spinner and a shimmering label that rolls through phases and settles on a check`,
    category: `Chat`,
    Preview: (0, m.lazy)(() => i(() => previewModules["demo-qJGH2Gjh.js"](), __vite__mapDeps([146, 1, 2, 3, 147, 148]))),
    loadSource: () => loadLocalSource("thinking-loader"),
    loadDocs: () => i(() => import("./chunks/docs-CqEa36vT.js").then(e => e.docs), []),
    clean: {
      Preview: (0, m.lazy)(() => i(() => previewModules["demo.clean-DWvTXnKE.js"](), __vite__mapDeps([149, 1, 2, 3, 148]))),
      loadSource: () => loadLocalSource("thinking-loader-clean"),
      loadDocs: () => i(() => import("./chunks/docs.clean-O5cvsaD9.js").then(e => e.docs), [])
    },
    added: `2026-10-09T22:55:00+02:00`,
    order: 3,
    pro: false
  },
  zt = e({
    entry: () => Bt
  }),
  Bt = {
    slug: `thinking-state`,
    name: `Thinking State`,
    description: `AI working panel with a live timer, searched sources and thinking steps that appear one by one`,
    category: `Chat`,
    Preview: (0, m.lazy)(() => i(() => previewModules["demo-CnnmXlmZ.js"](), __vite__mapDeps([150, 3, 2, 151, 1, 152]))),
    loadSource: () => loadLocalSource("thinking-state"),
    loadDocs: () => i(() => import("./chunks/docs-DQUTX2jQ.js").then(e => e.docs), []),
    clean: {
      Preview: (0, m.lazy)(() => i(() => previewModules["demo.clean-D9vXyDyZ.js"](), __vite__mapDeps([153, 1, 2, 3, 152]))),
      loadSource: () => loadLocalSource("thinking-state-clean"),
      loadDocs: () => i(() => import("./chunks/docs.clean-6__65Xac.js").then(e => e.docs), [])
    },
    order: 2,
    pro: false
  },
  Vt = e({
    entry: () => Ht
  }),
  Ht = {
    slug: `tips-panel`,
    name: `Tips Panel`,
    description: `Grid of short tips with one action each – taken tips turn into a done state`,
    category: `Cards`,
    Preview: (0, m.lazy)(() => i(() => previewModules["demo-D2Q4vYDw.js"](), __vite__mapDeps([154, 1, 2, 3, 155]))),
    loadSource: () => loadLocalSource("tips-panel"),
    loadDocs: () => i(() => import("./chunks/docs-DiX_OeMs.js").then(e => e.docs), []),
    clean: {
      Preview: (0, m.lazy)(() => i(() => previewModules["demo.clean-Bfu_rP8L.js"](), __vite__mapDeps([156, 1, 2, 3, 155]))),
      loadSource: () => loadLocalSource("tips-panel-clean"),
      loadDocs: () => i(() => import("./chunks/docs.clean-BRNY_KgW.js").then(e => e.docs), [])
    },
    added: `2026-10-03`,
    order: 1,
    pro: false
  },
  Ut = e({
    entry: () => Wt
  }),
  Wt = {
    slug: `toaster`,
    name: `Toaster`,
    description: `Calm toasts from anywhere – a stack that fans out on hover, promise toasts that morph from spinner to check, swipe to dismiss`,
    category: `Feedback`,
    Preview: (0, m.lazy)(() => i(() => previewModules["demo-BRHZ1FKP.js"](), __vite__mapDeps([157, 1, 2, 3, 158]))),
    loadSource: () => loadLocalSource("toaster"),
    loadDocs: () => i(() => import("./chunks/docs-CQfMJLpp.js").then(e => e.docs), []),
    clean: {
      Preview: (0, m.lazy)(() => i(() => previewModules["demo.clean-CWpzS1qi.js"](), __vite__mapDeps([159, 1, 2, 3, 158]))),
      loadSource: () => loadLocalSource("toaster-clean"),
      loadDocs: () => i(() => import("./chunks/docs.clean-CflJ0oKJ.js").then(e => e.docs), [])
    },
    added: `2026-10-08T15:40:00+02:00`,
    order: 0,
    pro: false
  },
  Gt = e({
    entry: () => Kt
  }),
  Kt = {
    slug: `tool-call-card`,
    name: `Tool Call Card`,
    description: `An agent's tool call in one line – live timer, status and summary, folds open to highlighted arguments and result with copy, retry on errors and a group that sums them up`,
    category: `Agents`,
    Preview: (0, m.lazy)(() => i(() => previewModules["demo-C2oxSuna.js"](), __vite__mapDeps([160, 1, 2, 3, 161, 162]))),
    loadSource: () => loadLocalSource("tool-call-card"),
    loadDocs: () => i(() => import("./chunks/docs-I28H9on4.js").then(e => e.docs), []),
    clean: {
      Preview: (0, m.lazy)(() => i(() => previewModules["demo.clean-q2ZwGlZu.js"](), __vite__mapDeps([163, 1, 2, 3, 162]))),
      loadSource: () => loadLocalSource("tool-call-card-clean"),
      loadDocs: () => i(() => import("./chunks/docs.clean-vn8R5wlP.js").then(e => e.docs), [])
    },
    added: `2026-10-09T23:29:00+02:00`,
    order: 1,
    pro: false
  },
  qt = e({
    entry: () => Jt
  }),
  Jt = {
    slug: `usage-meter`,
    name: `Usage Meter`,
    description: `Plan usage and AI credits – a stacked credits meter by category, daily sparkline, limits and a button that speaks up near the limit`,
    category: `Data display`,
    Preview: (0, m.lazy)(() => i(() => previewModules["demo-VZNuxSqd.js"](), __vite__mapDeps([164, 1, 2, 3, 165, 166]))),
    loadSource: () => loadLocalSource("usage-meter"),
    loadDocs: () => i(() => import("./chunks/docs-CeOV3oLU.js").then(e => e.docs), []),
    clean: {
      Preview: (0, m.lazy)(() => i(() => previewModules["demo.clean-Cuu_AdnG.js"](), __vite__mapDeps([167, 1, 2, 3, 166]))),
      loadSource: () => loadLocalSource("usage-meter-clean"),
      loadDocs: () => i(() => import("./chunks/docs.clean-C76Xpqc0.js").then(e => e.docs), [])
    },
    added: `2026-10-08T17:51:00+02:00`,
    order: 0,
    pro: false
  },
  Yt = e({
    entry: () => Xt
  }),
  Xt = {
    slug: `writing-assistant`,
    name: `Writing Assistant`,
    description: `AI chat card with a soft gradient glow, suggestions, streaming replies and live voice dictation`,
    category: `Chat`,
    Preview: (0, m.lazy)(() => i(() => previewModules["demo-DmFQrpJF.js"](), __vite__mapDeps([168, 1, 2, 3, 169]))),
    loadSource: () => loadLocalSource("writing-assistant"),
    loadDocs: () => i(() => import("./chunks/docs-cbxE_Tr5.js").then(e => e.docs), []),
    clean: {
      Preview: (0, m.lazy)(() => i(() => previewModules["demo.clean-DoHFMx8x.js"](), __vite__mapDeps([170, 1, 2, 3, 169]))),
      loadSource: () => loadLocalSource("writing-assistant-clean"),
      loadDocs: () => i(() => import("./chunks/docs.clean-B6YbLikW.js").then(e => e.docs), [])
    },
    added: `2026-10-04T20:14:00+02:00`,
    order: 3,
    pro: false
  },
  Zt = e({
    entry: () => Qt
  }),
  Qt = {
    slug: `agent-gallery`,
    name: `Agent Gallery`,
    description: `Slim gradient panels with one open product screen in the middle – pick a panel and it glides open`,
    category: `Feature sections`,
    Preview: (0, m.lazy)(() => i(() => previewModules["demo-qWgXlPG0.js"](), __vite__mapDeps([171, 1, 2, 3, 172]))),
    loadSource: () => loadLocalSource("agent-gallery"),
    loadDocs: () => i(() => import("./chunks/docs-BpUkSURm.js").then(e => e.docs), []),
    added: `2026-10-04T20:32:00+02:00`,
    order: 2,
    pro: false
  },
  $t = e({
    entry: () => en
  }),
  en = {
    slug: `ai-workspace`,
    name: `AI Workspace`,
    description: `Complete assistant app – sidebar, welcome, streaming chat and projects, built on the Chat Composer`,
    category: `Productivity`,
    Preview: (0, m.lazy)(() => i(() => previewModules["demo-158Rlrkj.js"](), __vite__mapDeps([173, 1, 2, 3, 41, 174]))),
    loadSource: () => loadLocalSource("ai-workspace"),
    loadDocs: () => i(() => import("./chunks/docs-DP4g1Nn7.js").then(e => e.docs), []),
    added: `2026-10-04T11:30:00+02:00`,
    order: 1,
    pro: false
  },
  tn = e({
    entry: () => nn
  }),
  nn = {
    slug: `app-directory`,
    name: `App Directory`,
    description: `Browse, search and connect integrations – categories, filters and app cards with a connect flow`,
    category: `Integrations`,
    Preview: (0, m.lazy)(() => i(() => previewModules["demo-CdNvbDAu.js"](), __vite__mapDeps([175, 1, 2, 3, 176]))),
    loadSource: () => loadLocalSource("app-directory"),
    loadDocs: () => i(() => import("./chunks/docs-Bi_YQg2x.js").then(e => e.docs), []),
    added: `2026-10-03`,
    order: 1,
    pro: false
  },
  O = e({
    entry: () => rn
  }),
  rn = {
    slug: `client-context`,
    name: `Client Context`,
    description: `A client workspace with live numbers and a shared context timeline – switch clients, search, filter and add notes or files`,
    category: `Productivity`,
    Preview: (0, m.lazy)(() => i(() => previewModules["demo-D9Vw9aDF.js"](), __vite__mapDeps([177, 1, 2, 3, 178]))),
    loadSource: () => loadLocalSource("client-context"),
    loadDocs: () => i(() => import("./chunks/docs-D418_9B_.js").then(e => e.docs), []),
    added: `2026-10-05T15:50:00+02:00`,
    order: 0,
    pro: false
  },
  an = e({
    entry: () => on
  }),
  on = {
    slug: `invoice-credit`,
    name: `Invoice & Credit Note`,
    description: `An invoice and its credit note stacked like paper – switch between them, pick lines to credit, adjust amounts and issue`,
    category: `Billing`,
    Preview: (0, m.lazy)(() => i(() => previewModules["demo-BRSx7pv5.js"](), __vite__mapDeps([179, 1, 2, 3, 180]))),
    loadSource: () => loadLocalSource("invoice-credit"),
    loadDocs: () => i(() => import("./chunks/docs-BUxqzOgh.js").then(e => e.docs), []),
    added: `2026-10-04T20:52:00+02:00`,
    order: 0,
    pro: false
  },
  sn = e({
    entry: () => cn
  }),
  cn = {
    slug: `kpi-board`,
    name: `KPI Board`,
    description: `The top of a dashboard – three trend cards, an overview chart that compares this period with the last, and a focus card; hover shows any day's value and every number rolls when the range changes`,
    category: `Analytics`,
    Preview: (0, m.lazy)(() => i(() => previewModules["demo-CawsKXt1.js"](), __vite__mapDeps([181, 1, 2, 3, 182]))),
    loadSource: () => loadLocalSource("kpi-board"),
    loadDocs: () => i(() => import("./chunks/docs-D5diAW3h.js").then(e => e.docs), []),
    added: `2026-10-12T20:00:00+02:00`,
    order: 1,
    pro: false
  },
  ln = e({
    entry: () => un
  }),
  un = {
    slug: `logo-marquee`,
    name: `Logo Marquee`,
    description: `The endless “Trusted by” strip – a seamless loop that eases to a stop on hover, scrubs with inertia and lifts the hovered logo to colour`,
    category: `Social proof`,
    Preview: (0, m.lazy)(() => i(() => previewModules["demo-Bp-um2Aj.js"](), __vite__mapDeps([183, 1, 2, 3, 184]))),
    loadSource: () => loadLocalSource("logo-marquee"),
    loadDocs: () => i(() => import("./chunks/docs-6bqyeHxu.js").then(e => e.docs), []),
    added: `2026-10-08T15:44:00+02:00`,
    order: 0,
    pro: false
  },
  dn = e({
    entry: () => fn
  }),
  fn = {
    slug: `metrics-dashboard`,
    name: `Metrics Dashboard`,
    description: `Sales overview – KPI cards pick the metric, one chart switches between dotted line and bars, with top products and channels`,
    category: `Analytics`,
    Preview: (0, m.lazy)(() => i(() => previewModules["demo-2EA4yYHc.js"](), __vite__mapDeps([185, 1, 2, 3, 186]))),
    loadSource: () => loadLocalSource("metrics-dashboard"),
    loadDocs: () => i(() => import("./chunks/docs-ZdpK_fwc.js").then(e => e.docs), []),
    added: `2026-10-04T18:59:00+02:00`,
    order: 0,
    pro: false
  },
  pn = e({
    entry: () => mn
  }),
  mn = {
    slug: `pricing-plans`,
    name: `Pricing Plans`,
    description: `Pricing section with a monthly / yearly switch, three plan cards and collapsible details`,
    category: `Pricing`,
    Preview: (0, m.lazy)(() => i(() => previewModules["demo-D7hRHGEh.js"](), __vite__mapDeps([187, 1, 2, 3, 188]))),
    loadSource: () => loadLocalSource("pricing-plans"),
    loadDocs: () => i(() => import("./chunks/docs-KUHWR962.js").then(e => e.docs), []),
    order: 0,
    pro: false
  },
  hn = e({
    entry: () => gn
  }),
  gn = {
    slug: `task-board`,
    name: `Task Board`,
    description: `Kanban board with drag and drop, quick add, a detail panel, search, label filters and a compact view`,
    category: `Productivity`,
    Preview: (0, m.lazy)(() => i(() => previewModules["demo-BfsFftdy.js"](), __vite__mapDeps([189, 1, 2, 3, 30, 190]))),
    loadSource: () => loadLocalSource("task-board"),
    loadDocs: () => i(() => import("./chunks/docs-BQ4CPEZB.js").then(e => e.docs), []),
    added: `2026-10-03`,
    order: 0,
    pro: false
  },
  _n = e({
    entry: () => vn
  }),
  vn = {
    slug: `testimonial-wall`,
    name: `Testimonial Wall`,
    description: `The landing-page wall of quotes – columns that scroll endlessly in opposite directions, ease to a stop on hover and scrub with inertia`,
    category: `Social proof`,
    Preview: (0, m.lazy)(() => i(() => previewModules["demo-DrrNKEd7.js"](), __vite__mapDeps([191, 1, 2, 3, 192]))),
    loadSource: () => loadLocalSource("testimonial-wall"),
    loadDocs: () => i(() => import("./chunks/docs-DNt7L4gM.js").then(e => e.docs), []),
    added: `2026-10-08T17:54:00+02:00`,
    order: 0,
    pro: false
  },
  yn = e({
    entry: () => bn
  }),
  bn = {
    slug: `agent-team`,
    name: `Agent Team`,
    description: `A prompt types itself and branches out into three agents, each with a role and overlapping tool logos`,
    category: `Card illustrations`,
    Preview: (0, m.lazy)(() => i(() => previewModules["demo-BtlH6dH8.js"](), __vite__mapDeps([193, 1, 2, 3, 194]))),
    loadSource: () => loadLocalSource("agent-team"),
    loadDocs: () => i(() => import("./chunks/docs-BNtHN1ia.js").then(e => e.docs), []),
    order: 10,
    added: `2026-10-04T18:21:00+02:00`,
    pro: false
  },
  xn = e({
    entry: () => Sn
  }),
  Sn = {
    slug: `cover-flow`,
    name: `Cover Flow`,
    description: `Browse covers in 3D – drag, flick or scrub the row, it springs to the nearest cover; images drift in their frames over a soft reflection`,
    category: `Card illustrations`,
    Preview: (0, m.lazy)(() => i(() => previewModules["demo-C2jfF4UB.js"](), __vite__mapDeps([195, 1, 2, 3, 196]))),
    loadSource: () => loadLocalSource("cover-flow"),
    loadDocs: () => i(() => import("./chunks/docs-YCamylwB.js").then(e => e.docs), []),
    added: `2026-10-09T23:05:00+02:00`,
    order: 0,
    pro: false
  },
  Cn = e({
    entry: () => wn
  }),
  wn = {
    slug: `empty-calendar`,
    name: `Empty Calendar`,
    description: `Stack of calendar cards marked empty, fanning out on hover`,
    category: `Card illustrations`,
    Preview: (0, m.lazy)(() => i(() => previewModules["demo-MXjIQshC.js"](), __vite__mapDeps([197, 1, 2, 3, 198]))),
    loadSource: () => loadLocalSource("empty-calendar"),
    loadDocs: () => i(() => import("./chunks/docs-BwxiOt3k.js").then(e => e.docs), []),
    order: 1,
    pro: false
  },
  Tn = e({
    entry: () => En
  }),
  En = {
    slug: `enrichment-orbit`,
    name: `Enrichment Orbit`,
    description: `Grok tile inside two rings with comets and data nodes orbiting around it`,
    category: `Card illustrations`,
    Preview: (0, m.lazy)(() => i(() => previewModules["demo-CU49Fdlm.js"](), __vite__mapDeps([199, 1, 2, 3, 200]))),
    loadSource: () => loadLocalSource("enrichment-orbit"),
    loadDocs: () => i(() => import("./chunks/docs-B44eJjOH.js").then(e => e.docs), []),
    order: 5,
    pro: false
  },
  Dn = e({
    entry: () => On
  }),
  On = {
    slug: `frost-cloud`,
    name: `Frost Cloud`,
    description: `A frosted white cloud with eyes cut out of it, on a red-orange or blue sky – it floats, turns to look around, blinks, follows the pointer and bounces with a wink when clicked`,
    category: `Card illustrations`,
    Preview: (0, m.lazy)(() => i(() => previewModules["demo-DrDu-VuE.js"](), __vite__mapDeps([201, 1, 2, 3, 202]))),
    loadSource: () => loadLocalSource("frost-cloud"),
    loadDocs: () => i(() => import("./chunks/docs-BkosQpJv.js").then(e => e.docs), []),
    order: 0,
    added: `2026-10-08T12:40:00+02:00`,
    pro: false
  },
  kn = e({
    entry: () => An
  }),
  An = {
    slug: `ghosted-chat`,
    name: `Ghosted Chat`,
    description: `Unanswered chat messages marked as read, with a thumbs-down reply on hover`,
    category: `Card illustrations`,
    Preview: (0, m.lazy)(() => i(() => previewModules["demo-Cm2FVMWj.js"](), __vite__mapDeps([203, 1, 2, 3, 204]))),
    loadSource: () => loadLocalSource("ghosted-chat"),
    loadDocs: () => i(() => import("./chunks/docs-BHILhaci.js").then(e => e.docs), []),
    order: 3,
    pro: false
  },
  jn = e({
    entry: () => Mn
  }),
  Mn = {
    slug: `glass-folder`,
    name: `Glass Folder`,
    description: `Glassy blue folder with documents behind a frosted pocket that tips open on hover`,
    category: `Card illustrations`,
    Preview: (0, m.lazy)(() => i(() => previewModules["demo-ljSEPvt1.js"](), __vite__mapDeps([205, 3, 2, 206]))),
    loadSource: () => loadLocalSource("glass-folder"),
    loadDocs: () => i(() => import("./chunks/docs-DSLhnq5S.js").then(e => e.docs), []),
    order: 7,
    pro: false,
    added: `2026-10-04T14:30:00+02:00`
  },
  Nn = e({
    entry: () => Pn
  }),
  Pn = {
    slug: `glow-cloud`,
    name: `Glow Cloud`,
    description: `A glowing cloud with eyes in blue or red-orange – it floats, turns to look around, blinks, follows the pointer and bounces with a wink when clicked`,
    category: `Card illustrations`,
    Preview: (0, m.lazy)(() => i(() => previewModules["demo-Cm8kSHcX.js"](), __vite__mapDeps([207, 1, 2, 3, 208]))),
    loadSource: () => loadLocalSource("glow-cloud"),
    loadDocs: () => i(() => import("./chunks/docs-B3la3x8y.js").then(e => e.docs), []),
    order: 0,
    added: `2026-10-08T12:39:00+02:00`,
    pro: false
  },
  Fn = e({
    entry: () => In
  }),
  In = {
    slug: `glow-keyboard`,
    name: `Glow Keyboard`,
    description: `AI chat input that types itself over a glass keyboard – every key press sends a wave up the gradient floor`,
    category: `Product scenes`,
    Preview: (0, m.lazy)(() => i(() => previewModules["demo-BrYW73Cf.js"](), __vite__mapDeps([209, 1, 2, 3, 210]))),
    loadSource: () => loadLocalSource("glow-keyboard"),
    loadDocs: () => i(() => import("./chunks/docs-BnO3I4vF.js").then(e => e.docs), []),
    order: 0,
    pro: false,
    added: `2026-10-06T19:00:00+02:00`
  },
  Ln = e({
    entry: () => Rn
  }),
  Rn = {
    slug: `integration-beam`,
    name: `Integration Beam`,
    description: `Your product between the tools it connects – light pulses flow along curved beams, hover to focus a tool, click to pause it`,
    category: `Product scenes`,
    Preview: (0, m.lazy)(() => i(() => previewModules["demo-B_Bc7Zla.js"](), __vite__mapDeps([211, 1, 2, 3, 212]))),
    loadSource: () => loadLocalSource("integration-beam"),
    loadDocs: () => i(() => import("./chunks/docs-DrI7Fr6r.js").then(e => e.docs), []),
    order: 0,
    added: `2026-10-08T15:43:00+02:00`,
    pro: false
  },
  zn = e({
    entry: () => Bn
  }),
  Bn = {
    slug: `integration-flow`,
    name: `Integration Flow`,
    description: `Integration pills rotating along a dashed arc, each beaming its data into a central analysis hub`,
    category: `Product scenes`,
    Preview: (0, m.lazy)(() => i(() => previewModules["demo-CBQvHgq1.js"](), __vite__mapDeps([213, 1, 2, 3, 214]))),
    loadSource: () => loadLocalSource("integration-flow"),
    loadDocs: () => i(() => import("./chunks/docs-DVNki4xQ.js").then(e => e.docs), []),
    order: 1,
    pro: false,
    added: `2026-10-04T15:41:00+02:00`
  },
  Vn = e({
    entry: () => Hn
  }),
  Hn = {
    slug: `integration-grid`,
    name: `Integration Grid`,
    description: `Honeycomb-like wall of integration logos around a bright centre tile with your product mark, fading out toward the edges`,
    category: `Card illustrations`,
    Preview: (0, m.lazy)(() => i(() => previewModules["demo-BABw5NIJ.js"](), __vite__mapDeps([215, 3, 2, 216, 217]))),
    loadSource: () => loadLocalSource("integration-grid"),
    loadDocs: () => i(() => import("./chunks/docs-1TxNi_aU.js").then(e => e.docs), []),
    order: 11,
    added: `2026-10-04T20:31:00+02:00`,
    pro: false
  },
  Un = e({
    entry: () => Wn
  }),
  Wn = {
    slug: `layer-stack`,
    name: `Layer Stack`,
    description: `Isometric stack of five layers with a list beside it – the chosen entry lifts its layer out in color`,
    category: `Card illustrations`,
    Preview: (0, m.lazy)(() => i(() => previewModules["demo-KQRMxKWn.js"](), __vite__mapDeps([218, 1, 2, 3, 219]))),
    loadSource: () => loadLocalSource("layer-stack"),
    loadDocs: () => i(() => import("./chunks/docs-BWUGRuON.js").then(e => e.docs), []),
    order: 9,
    added: `2026-10-04T18:03:00+02:00`,
    pro: false
  },
  Gn = e({
    entry: () => Kn
  }),
  Kn = {
    slug: `lead-sourcing`,
    name: `Lead Sourcing`,
    description: `ChatGPT tile linked to Gmail and Grok, with a shine running along the connection`,
    category: `Card illustrations`,
    Preview: (0, m.lazy)(() => i(() => previewModules["demo-BTBcqeeL.js"](), __vite__mapDeps([220, 1, 2, 3, 221]))),
    loadSource: () => loadLocalSource("lead-sourcing"),
    loadDocs: () => i(() => import("./chunks/docs-BEdCATSE.js").then(e => e.docs), []),
    order: 4,
    pro: false
  },
  qn = e({
    entry: () => Jn
  }),
  Jn = {
    slug: `logo-cluster`,
    name: `Logo Cluster`,
    description: `Your mark on a white disc in the middle – company logos bounce out of it and settle around it`,
    category: `Card illustrations`,
    Preview: (0, m.lazy)(() => i(() => previewModules["demo-CkkSZhS9.js"](), __vite__mapDeps([222, 1, 2, 3, 223]))),
    loadSource: () => loadLocalSource("logo-cluster"),
    loadDocs: () => i(() => import("./chunks/docs-C_UZC7kN.js").then(e => e.docs), []),
    order: 0,
    added: `2026-10-07T15:00:00+02:00`,
    pro: false
  },
  Yn = e({
    entry: () => Xn
  }),
  Xn = {
    slug: `model-wheel`,
    name: `Model Wheel`,
    description: `AI model names on a turning drum – the rows bend away at the edges and each model lands on a soft gray fill`,
    category: `Card illustrations`,
    Preview: (0, m.lazy)(() => i(() => previewModules["demo-OZULToi6.js"](), __vite__mapDeps([224, 1, 2, 3, 225]))),
    loadSource: () => loadLocalSource("model-wheel"),
    loadDocs: () => i(() => import("./chunks/docs-ubQm_MNq.js").then(e => e.docs), []),
    order: 0,
    added: `2026-10-07T12:00:00+02:00`,
    pro: false
  },
  Zn = e({
    entry: () => Qn
  }),
  Qn = {
    slug: `outreach-branches`,
    name: `Outreach Branches`,
    description: `Lines branching out to Gmail, Slack and Notion with colored pulses flowing down`,
    category: `Card illustrations`,
    Preview: (0, m.lazy)(() => i(() => previewModules["demo-DE0jF2h1.js"](), __vite__mapDeps([226, 1, 2, 3, 227]))),
    loadSource: () => loadLocalSource("outreach-branches"),
    loadDocs: () => i(() => import("./chunks/docs-CgriwkwB.js").then(e => e.docs), []),
    order: 6,
    pro: false
  },
  $n = e({
    entry: () => er
  }),
  er = {
    slug: `project-flow`,
    name: `Project Flow`,
    description: `Animated scene of a client task branching into subtasks, notes and assigned roles`,
    category: `Product scenes`,
    Preview: (0, m.lazy)(() => i(() => previewModules["demo-D34v7Pjy.js"](), __vite__mapDeps([228, 1, 2, 3, 229]))),
    loadSource: () => loadLocalSource("project-flow"),
    loadDocs: () => i(() => import("./chunks/docs-DF3ihqsX.js").then(e => e.docs), []),
    order: 0,
    pro: false
  },
  tr = e({
    entry: () => nr
  }),
  nr = {
    slug: `region-dach`,
    name: `DACH Region`,
    description: `DACH map with fading neighbours and a pastel band along the border, switchable to the US, China, India, Brazil or Japan`,
    category: `Maps`,
    Preview: (0, m.lazy)(() => i(() => previewModules["demo-CmYYw1tl.js"](), __vite__mapDeps([230, 1, 2, 3, 231]))),
    loadSource: () => loadLocalSource("region-dach"),
    loadDocs: () => i(() => import("./chunks/docs-B_OI8PyY.js").then(e => e.docs), []),
    order: 1,
    pro: false
  },
  rr = e({
    entry: () => ir
  }),
  ir = {
    slug: `side-folder`,
    name: `Side Folder`,
    description: `Glassy blue folder on its side, documents sliding out to the right as the pocket swings open on hover`,
    category: `Card illustrations`,
    Preview: (0, m.lazy)(() => i(() => previewModules["demo-ClUxDNiT.js"](), __vite__mapDeps([232, 1, 2, 3, 233]))),
    loadSource: () => loadLocalSource("side-folder"),
    loadDocs: () => i(() => import("./chunks/docs-BG1aWD2h.js").then(e => e.docs), []),
    order: 8,
    added: `2026-10-04T15:00:00+02:00`,
    pro: false
  },
  ar = e({
    entry: () => or
  }),
  or = {
    slug: `tab-overload`,
    name: `Tab Overload`,
    description: `Overlapping browser windows where the highlight follows the hovered tab`,
    category: `Card illustrations`,
    Preview: (0, m.lazy)(() => i(() => previewModules["demo-CVKU8Uzh.js"](), __vite__mapDeps([234, 1, 2, 3, 235]))),
    loadSource: () => loadLocalSource("tab-overload"),
    loadDocs: () => i(() => import("./chunks/docs-Cf87NU-O.js").then(e => e.docs), []),
    order: 2,
    pro: false
  },
  sr = e({
    entry: () => cr
  }),
  cr = {
    slug: `team-invite`,
    name: `Team Invite`,
    description: `Connected teammates – a cursor drags a new one into the empty slot, the line turns solid and they go online`,
    category: `Card illustrations`,
    Preview: (0, m.lazy)(() => i(() => previewModules["demo-cWsVSmbI.js"](), __vite__mapDeps([236, 1, 2, 3, 237]))),
    loadSource: () => loadLocalSource("team-invite"),
    loadDocs: () => i(() => import("./chunks/docs-BtJJaDyI.js").then(e => e.docs), []),
    order: 8,
    added: `2026-10-04T17:49:00+02:00`,
    pro: false
  },
  lr = e({
    entry: () => ur
  }),
  ur = {
    slug: `voice-orb`,
    name: `Voice Orb`,
    description: `The face of a voice assistant – a sphere of dots that breathes, catches sound, collapses into a spinning ring while thinking and ripples when it speaks`,
    category: `Product scenes`,
    Preview: (0, m.lazy)(() => i(() => previewModules["demo-C5SE4pL3.js"](), __vite__mapDeps([238, 1, 2, 3, 239]))),
    loadSource: () => loadLocalSource("voice-orb"),
    loadDocs: () => i(() => import("./chunks/docs-B_2rjjD8.js").then(e => e.docs), []),
    added: `2026-10-12T12:00:00+02:00`,
    order: 1,
    pro: false
  },
  dr = e({
    entry: () => fr
  }),
  fr = {
    slug: `world-map`,
    name: `World Map Continental`,
    description: `World map with one highlighted continent and a pastel band along its coastline, switchable between all six`,
    category: `Maps`,
    Preview: (0, m.lazy)(() => i(() => previewModules["demo-DOm8gFae.js"](), __vite__mapDeps([240, 1, 2, 3, 241]))),
    loadSource: () => loadLocalSource("world-map"),
    loadDocs: () => i(() => import("./chunks/docs-B-pCOumb.js").then(e => e.docs), []),
    order: 2,
    pro: false
  },
  pr = e({
    entry: () => mr
  }),
  mr = {
    slug: `agent-chat`,
    name: `Agent Chat`,
    description: `Chat with an orchestrating agent, the agents at work, and a brief to fill in beside it`,
    category: `App screens`,
    Preview: (0, m.lazy)(() => i(() => previewModules["demo-CeLmzXST.js"](), __vite__mapDeps([242, 1, 2, 3, 34, 243, 244, 151, 245, 246, 85, 137, 247, 248, 249, 250, 251, 252, 253, 254, 255, 256, 257, 258, 259, 260, 261]))),
    loadSource: () => loadLocalSource("agent-chat"),
    loadDocs: () => i(() => import("./chunks/docs-BxLsAAJw.js").then(e => e.docs), []),
    added: `2026-10-07T21:00:00+02:00`,
    order: 6,
    pro: false
  },
  hr = e({
    entry: () => gr
  }),
  gr = {
    slug: `agent-run`,
    name: `Agent Run`,
    description: `One autonomous agent run: the plan ticking through its steps, the tool calls, an approval it waits on and the draft it wrote`,
    category: `App screens`,
    Preview: (0, m.lazy)(() => i(() => previewModules["demo-DhakOwR1.js"](), __vite__mapDeps([262, 1, 2, 3, 10, 20, 34, 89, 147, 161, 243, 252, 245, 246, 85, 137, 253, 254, 255, 263, 257, 258, 264, 259, 265]))),
    loadSource: () => loadLocalSource("agent-run"),
    loadDocs: () => i(() => import("./chunks/docs-c4uWglQd.js").then(e => e.docs), []),
    added: `2026-10-10T00:00:00+02:00`,
    order: 9,
    pro: false
  },
  _r = e({
    entry: () => vr
  }),
  vr = {
    slug: `analytics`,
    name: `Analytics`,
    description: `Revenue dashboard: key figures, revenue by channel, breakdown, top products and weekly trends`,
    category: `App screens`,
    Preview: (0, m.lazy)(() => i(() => previewModules["demo-BpIKiAtr.js"](), __vite__mapDeps([266, 1, 2, 3, 34, 99, 252, 245, 246, 85, 137, 254, 267, 258, 265, 260, 268]))),
    loadSource: () => loadLocalSource("analytics"),
    loadDocs: () => i(() => import("./chunks/docs-BLrJfzvH.js").then(e => e.docs), []),
    added: `2026-10-07T21:00:00+02:00`,
    order: 8,
    pro: false
  },
  yr = e({
    entry: () => br
  }),
  br = {
    slug: `app-shell`,
    name: `App Shell`,
    description: `Collapsible sidebar with workspace, menu, projects and account – the frame every screen sits in`,
    category: `App screens`,
    Preview: (0, m.lazy)(() => i(() => previewModules["demo-BeOo5q8C.js"](), __vite__mapDeps([269, 3, 2, 245, 1, 246, 85, 137]))),
    loadSource: () => loadLocalSource("app-shell"),
    loadDocs: () => i(() => import("./chunks/docs-Cfk5B1z9.js").then(e => e.docs), []),
    added: `2026-10-07T18:00:00+02:00`,
    order: 1,
    pro: false
  },
  xr = e({
    entry: () => Sr
  }),
  Sr = {
    slug: `assistant-home`,
    name: `Assistant Home`,
    description: `AI assistant start page: greeting, prompt box with tools, connected apps and suggestions`,
    category: `App screens`,
    Preview: (0, m.lazy)(() => i(() => previewModules["demo-CHSa66dF.js"](), __vite__mapDeps([270, 3, 2, 244, 1, 151, 243, 245, 246, 85, 137, 247, 248, 249, 250, 251]))),
    loadSource: () => loadLocalSource("assistant-home"),
    loadDocs: () => i(() => import("./chunks/docs-Cdva6Ahi.js").then(e => e.docs), []),
    added: `2026-10-07T18:00:00+02:00`,
    order: 2,
    pro: false
  },
  Cr = e({
    entry: () => wr
  }),
  wr = {
    slug: `crm`,
    name: `CRM`,
    description: `Company list with pipelines, open views as tabs and an editable data table`,
    category: `App screens`,
    Preview: (0, m.lazy)(() => i(() => previewModules["demo-vftwgdm_.js"](), __vite__mapDeps([271, 1, 2, 3, 66, 252, 245, 246, 85, 137, 254, 263, 257, 258, 272, 250, 261, 268]))),
    loadSource: () => loadLocalSource("crm"),
    loadDocs: () => i(() => import("./chunks/docs-sV6Exspv.js").then(e => e.docs), []),
    added: `2026-10-07T21:00:00+02:00`,
    order: 7,
    pro: false
  },
  Tr = e({
    entry: () => Er
  }),
  Er = {
    slug: `evals`,
    name: `Evals`,
    description: `Prompt evaluation dashboard: pass rate by version, reviewable prompt changes and test cases you can re-run`,
    category: `App screens`,
    Preview: (0, m.lazy)(() => i(() => previewModules["demo-9TUmGUMi.js"](), __vite__mapDeps([273, 1, 2, 3, 34, 89, 99, 133, 252, 245, 246, 85, 137, 253, 248, 258, 264, 251]))),
    loadSource: () => loadLocalSource("evals"),
    loadDocs: () => i(() => import("./chunks/docs-DhuyX2a3.js").then(e => e.docs), []),
    added: `2026-10-10T00:00:00+02:00`,
    order: 12,
    pro: false
  },
  Dr = e({
    entry: () => Or
  }),
  Or = {
    slug: `files`,
    name: `Folders`,
    description: `Folder overview with tabs, search, sort, grid/list toggle and file templates`,
    category: `App screens`,
    Preview: (0, m.lazy)(() => i(() => previewModules["demo-DXkqoFJb.js"](), __vite__mapDeps([274, 1, 2, 3, 34, 245, 246, 85, 137, 275]))),
    loadSource: () => loadLocalSource("files"),
    loadDocs: () => i(() => import("./chunks/docs-Bg0MHHdB.js").then(e => e.docs), []),
    added: `2026-10-07T18:00:00+02:00`,
    order: 3,
    pro: false
  },
  kr = e({
    entry: () => Ar
  }),
  Ar = {
    slug: `folder`,
    name: `Folder`,
    description: `Inside one folder: breadcrumbs, file cards with previews, and an empty state`,
    category: `App screens`,
    Preview: (0, m.lazy)(() => i(() => previewModules["demo-DM_UqYSi.js"](), __vite__mapDeps([276, 1, 2, 3, 34, 245, 246, 85, 137, 256, 272, 259, 275]))),
    loadSource: () => loadLocalSource("folder"),
    loadDocs: () => i(() => import("./chunks/docs-BTX9ROl5.js").then(e => e.docs), []),
    added: `2026-10-07T18:00:00+02:00`,
    order: 4,
    pro: false
  },
  jr = e({
    entry: () => Mr
  }),
  Mr = {
    slug: `integrations`,
    name: `Integrations`,
    description: `App directory with a sticky header, categories, search and connect states`,
    category: `App screens`,
    Preview: (0, m.lazy)(() => i(() => previewModules["demo-HbaZwPph.js"](), __vite__mapDeps([277, 1, 2, 3, 34, 245, 246, 85, 137]))),
    loadSource: () => loadLocalSource("integrations"),
    loadDocs: () => i(() => import("./chunks/docs-CqGta5k3.js").then(e => e.docs), []),
    added: `2026-10-07T18:00:00+02:00`,
    order: 5,
    pro: false
  },
  Nr = e({
    entry: () => Pr
  }),
  Pr = {
    slug: `onboarding`,
    name: `Onboarding`,
    description: `First-run flow of an AI workspace: workspace setup, tool connections, team invites and a first agent, with a getting-started checklist`,
    category: `App screens`,
    Preview: (0, m.lazy)(() => i(() => previewModules["demo-BgLxDeeC.js"](), __vite__mapDeps([278, 1, 2, 3, 34, 133, 252, 245, 246, 85, 137, 253, 247, 263, 258, 272]))),
    loadSource: () => loadLocalSource("onboarding"),
    loadDocs: () => i(() => import("./chunks/docs-DKnQ9DNv.js").then(e => e.docs), []),
    added: `2026-10-10T00:00:00+02:00`,
    order: 11,
    pro: false
  },
  Fr = e({
    entry: () => Ir
  }),
  Ir = {
    slug: `settings-billing`,
    name: `Settings & Billing`,
    description: `Settings page with tabs: workspace, members, API keys and billing with plan, usage, payment method, plan comparison and invoices`,
    category: `App screens`,
    Preview: (0, m.lazy)(() => i(() => previewModules["demo-BGahYM4K.js"](), __vite__mapDeps([279, 1, 2, 3, 34, 133, 165, 252, 245, 246, 85, 137, 253, 263, 256, 267, 249, 264, 259, 251]))),
    loadSource: () => loadLocalSource("settings-billing"),
    loadDocs: () => i(() => import("./chunks/docs-DR5BTgCD.js").then(e => e.docs), []),
    added: `2026-10-10T00:00:00+02:00`,
    order: 10,
    pro: false
  },
  Lr = e({
    entry: () => Rr
  }),
  Rr = {
    slug: `blur-crossfade`,
    name: `Blur Crossfade`,
    description: `Swaps content with a soft blur while the box glides smoothly to the size of what comes next`,
    category: `Transitions`,
    Preview: (0, m.lazy)(() => i(() => previewModules["demo-b0-CVBH2.js"](), __vite__mapDeps([280, 1, 2, 3, 281]))),
    loadSource: () => loadLocalSource("blur-crossfade"),
    loadDocs: () => i(() => import("./chunks/docs-Datr-mCn.js").then(e => e.docs), []),
    added: `2026-10-05T17:30:00+02:00`,
    order: 0,
    pro: false
  },
  zr = e({
    entry: () => Br
  }),
  Br = {
    slug: `gradient-floor`,
    name: `Gradient Floor`,
    description: `A blurred colour gradient that glows up from the bottom edge – two layers that drift and morph`,
    category: `Backgrounds`,
    Preview: (0, m.lazy)(() => i(() => previewModules["demo-CROkL7VF.js"](), __vite__mapDeps([282, 1, 2, 3, 283]))),
    loadSource: () => loadLocalSource("gradient-floor"),
    loadDocs: () => i(() => import("./chunks/docs-DdQN5WXt.js").then(e => e.docs), []),
    added: `2026-10-06T18:30:00+02:00`,
    order: 0,
    pro: false
  },
  Vr = e({
    entry: () => Hr
  }),
  Hr = {
    slug: `gradient-text`,
    name: `Gradient Text`,
    description: `Letters cut from a liquid, ever-flowing gradient – the color sweeps across the word the first time it's seen`,
    category: `Text`,
    Preview: (0, m.lazy)(() => i(() => previewModules["demo-BZms21rB.js"](), __vite__mapDeps([284, 1, 2, 3, 285]))),
    loadSource: () => loadLocalSource("gradient-text"),
    loadDocs: () => i(() => import("./chunks/docs-JecR3ZCs.js").then(e => e.docs), []),
    added: `2026-10-05T17:30:00+02:00`,
    order: 0,
    pro: false
  },
  Ur = e({
    entry: () => Wr
  }),
  Wr = {
    slug: `grid-background`,
    name: `Grid Background`,
    description: `A fine line grid that drifts slowly behind your content and fades out towards the edges`,
    category: `Backgrounds`,
    Preview: (0, m.lazy)(() => i(() => previewModules["demo-S1hMjDCH.js"](), __vite__mapDeps([286, 1, 2, 3, 287]))),
    loadSource: () => loadLocalSource("grid-background"),
    loadDocs: () => i(() => import("./chunks/docs-BaC6K2ad.js").then(e => e.docs), []),
    added: `2026-10-05T17:30:00+02:00`,
    order: 0,
    pro: false
  },
  Gr = e({
    entry: () => Kr
  }),
  Kr = {
    slug: `number-ticker`,
    name: `Number Ticker`,
    description: `Odometer-style numbers – every digit rolls to its new value and counts in from zero when it scrolls into view`,
    category: `Numbers`,
    Preview: (0, m.lazy)(() => i(() => previewModules["demo-0IZOAjVo.js"](), __vite__mapDeps([288, 1, 2, 3, 289]))),
    loadSource: () => loadLocalSource("number-ticker"),
    loadDocs: () => i(() => import("./chunks/docs-BzUQTIno.js").then(e => e.docs), []),
    added: `2026-10-05T17:30:00+02:00`,
    order: 0,
    pro: false
  },
  qr = e({
    entry: () => Jr
  }),
  Jr = {
    slug: `shimmer-loader`,
    name: `Shimmer Loader`,
    description: `Skeleton blocks that share one soft light sweep, plus shimmering text for “Thinking…” states`,
    category: `Loaders`,
    Preview: (0, m.lazy)(() => i(() => previewModules["demo-Cc3_N5Az.js"](), __vite__mapDeps([290, 1, 2, 3, 291]))),
    loadSource: () => loadLocalSource("shimmer-loader"),
    loadDocs: () => i(() => import("./chunks/docs-jUzYsO8s.js").then(e => e.docs), []),
    added: `2026-10-05T17:30:00+02:00`,
    order: 0,
    pro: false
  },
  Yr = e({
    entry: () => Xr
  }),
  Xr = {
    slug: `text-reveal`,
    name: `Text Reveal`,
    description: `Text that arrives word by word or letter by letter – each piece rises out of a soft blur as it scrolls into view`,
    category: `Text`,
    Preview: (0, m.lazy)(() => i(() => previewModules["demo-BEzbCisV.js"](), __vite__mapDeps([292, 1, 2, 3, 293]))),
    loadSource: () => loadLocalSource("text-reveal"),
    loadDocs: () => i(() => import("./chunks/docs-DX5lHDck.js").then(e => e.docs), []),
    added: `2026-10-05T17:30:00+02:00`,
    order: 0,
    pro: false
  },
  Zr = e({
    entry: () => Qr
  }),
  Qr = {
    slug: `tilt-card`,
    name: `Tilt Card`,
    description: `A card that tilts in 3D towards the pointer, with a soft glare that follows it and a smooth spring back`,
    category: `Hover`,
    Preview: (0, m.lazy)(() => i(() => previewModules["demo-DC242hdM.js"](), __vite__mapDeps([294, 1, 2, 3, 295]))),
    loadSource: () => loadLocalSource("tilt-card"),
    loadDocs: () => i(() => import("./chunks/docs-Bbarn97a.js").then(e => e.docs), []),
    added: `2026-10-05T17:30:00+02:00`,
    order: 0,
    pro: false
  },
  $r = Object.assign({
    "./agent-inbox/index.ts": se,
    "./agent-lanes/index.ts": le,
    "./agent-plan/index.ts": de,
    "./agent-steering/index.ts": pe,
    "./ai-answer/index.ts": w,
    "./approval-card/index.ts": ge,
    "./autonomy-dial/index.ts": ve,
    "./billing-schedule/index.ts": be,
    "./breakdown-chart/index.ts": Se,
    "./button/index.ts": we,
    "./change-summary/index.ts": T,
    "./chat-composer/index.ts": Ee,
    "./cited-answer/index.ts": Oe,
    "./combobox/index.ts": Ae,
    "./command-menu/index.ts": je,
    "./comment-thread/index.ts": Ne,
    "./comments-panel/index.ts": Fe,
    "./compact-breakdown/index.ts": Le,
    "./context-window/index.ts": ze,
    "./data-table/index.ts": Ve,
    "./date-range-picker/index.ts": Ue,
    "./decision-inbox/index.ts": Ge,
    "./dropzone/index.ts": qe,
    "./email-draft/index.ts": Ye,
    "./experiment-card/index.ts": Ze,
    "./filter-menu/index.ts": $e,
    "./inline-diff/index.ts": tt,
    "./integration-picker/index.ts": rt,
    "./integration-settings/index.ts": at,
    "./kpi-chart/index.ts": st,
    "./memory-panel/index.ts": lt,
    "./message-actions/index.ts": dt,
    "./model-picker/index.ts": pt,
    "./notification-stack/index.ts": ht,
    "./otp-input/index.ts": _t,
    "./profile-menu/index.ts": yt,
    "./progress-tracker/index.ts": xt,
    "./project-card/index.ts": Ct,
    "./prompt-library/index.ts": Tt,
    "./reaction-bar/index.ts": Dt,
    "./segmented-control/index.ts": kt,
    "./setup-guide/index.ts": jt,
    "./smart-recommendation/index.ts": Nt,
    "./stepper-form/index.ts": Ft,
    "./thinking-loader/index.ts": Lt,
    "./thinking-state/index.ts": zt,
    "./tips-panel/index.ts": Vt,
    "./toaster/index.ts": Ut,
    "./tool-call-card/index.ts": Gt,
    "./usage-meter/index.ts": qt,
    "./writing-assistant/index.ts": Yt
  }),
  ei = Object.assign({
    "../blocks/agent-gallery/index.ts": Zt,
    "../blocks/ai-workspace/index.ts": $t,
    "../blocks/app-directory/index.ts": tn,
    "../blocks/client-context/index.ts": O,
    "../blocks/invoice-credit/index.ts": an,
    "../blocks/kpi-board/index.ts": sn,
    "../blocks/logo-marquee/index.ts": ln,
    "../blocks/metrics-dashboard/index.ts": dn,
    "../blocks/pricing-plans/index.ts": pn,
    "../blocks/task-board/index.ts": hn,
    "../blocks/testimonial-wall/index.ts": _n
  }),
  ti = Object.assign({
    "../illustrations/agent-team/index.ts": yn,
    "../illustrations/cover-flow/index.ts": xn,
    "../illustrations/empty-calendar/index.ts": Cn,
    "../illustrations/enrichment-orbit/index.ts": Tn,
    "../illustrations/frost-cloud/index.ts": Dn,
    "../illustrations/ghosted-chat/index.ts": kn,
    "../illustrations/glass-folder/index.ts": jn,
    "../illustrations/glow-cloud/index.ts": Nn,
    "../illustrations/glow-keyboard/index.ts": Fn,
    "../illustrations/integration-beam/index.ts": Ln,
    "../illustrations/integration-flow/index.ts": zn,
    "../illustrations/integration-grid/index.ts": Vn,
    "../illustrations/layer-stack/index.ts": Un,
    "../illustrations/lead-sourcing/index.ts": Gn,
    "../illustrations/logo-cluster/index.ts": qn,
    "../illustrations/model-wheel/index.ts": Yn,
    "../illustrations/outreach-branches/index.ts": Zn,
    "../illustrations/project-flow/index.ts": $n,
    "../illustrations/region-dach/index.ts": tr,
    "../illustrations/side-folder/index.ts": rr,
    "../illustrations/tab-overload/index.ts": ar,
    "../illustrations/team-invite/index.ts": sr,
    "../illustrations/voice-orb/index.ts": lr,
    "../illustrations/world-map/index.ts": dr
  }),
  ni = Object.assign({
    "../screens/agent-chat/index.ts": pr,
    "../screens/agent-run/index.ts": hr,
    "../screens/analytics/index.ts": _r,
    "../screens/app-shell/index.ts": yr,
    "../screens/assistant-home/index.ts": xr,
    "../screens/crm/index.ts": Cr,
    "../screens/evals/index.ts": Tr,
    "../screens/files/index.ts": Dr,
    "../screens/folder/index.ts": kr,
    "../screens/integrations/index.ts": jr,
    "../screens/onboarding/index.ts": Nr,
    "../screens/settings-billing/index.ts": Fr
  }),
  ri = Object.assign({
    "../motion/blur-crossfade/index.ts": Lr,
    "../motion/gradient-floor/index.ts": zr,
    "../motion/gradient-text/index.ts": Vr,
    "../motion/grid-background/index.ts": Ur,
    "../motion/number-ticker/index.ts": Gr,
    "../motion/shimmer-loader/index.ts": qr,
    "../motion/text-reveal/index.ts": Yr,
    "../motion/tilt-card/index.ts": Zr
  }),
  ii = e => Object.values(e).map(e => e.entry).sort((e, t) => (e.order ?? 999) - (t.order ?? 999) || e.name.localeCompare(t.name)),
  ai = [`ai-answer`, `chat-composer`, `thinking-state`, `writing-assistant`, `thinking-loader`],
  oi = (e => {
    let t = e => ai.includes(e.slug) ? ai.indexOf(e.slug) : ai.length;
    return [...e].sort((e, n) => t(e) - t(n));
  })(ii($r)),
  si = ii(ei).map(e => ({
    ...e,
    kind: `block`
  })),
  ci = ii(ti).map(e => ({
    ...e,
    kind: `illustration`
  })),
  li = ii(ni).map(e => ({
    ...e,
    kind: `screen`
  })),
  ui = ii(ri).map(e => ({
    ...e,
    kind: `motion`
  })),
  di = [...oi, ...li, ...si, ...ci, ...ui],
  fi = {
    pnpm: `pnpm dlx`,
    npm: `npx`,
    yarn: `yarn dlx`,
    bun: `bunx --bun`
  },
  pi = (e, t = `pnpm`) => `${fi[t]} shadcn@latest add ${k.url}/r/${e}.json`,
  mi = {
    currency: `USD`,
    individual: 199,
    team: 499,
    teamSeats: 10
  },
  hi = [{
    id: `founder`,
    name: `Founding offer`,
    badge: `Founder price`,
    price: 99,
    until: 25
  }, {
    id: `early`,
    name: `Early access`,
    badge: `Early access price`,
    price: 149,
    until: 50
  }];
var _i = [`Chat`, `Agents`, `Cards`, `Text`, `Data display`, `Navigation`, `Buttons`, `Inputs`, `Feedback`],
  vi = [`Feature sections`, `Hero`, `Pricing`, `Billing`, `Analytics`, `Integrations`, `Productivity`, `Social proof`, `Call to action`],
  yi = [`Product scenes`, `Card illustrations`, `Maps`],
  bi = [`App screens`],
  xi = [`Text`, `Numbers`, `Transitions`, `Backgrounds`, `Hover`, `Loaders`],
  Si = e => e.toLowerCase().replace(/\s+/g, `-`),
  Ci = [[`path`, {
    d: `M18.593 8.19486C19.0376 8.52237 19.1326 9.14837 18.8051 9.59306C18.5507 9.93847 18.2963 10.2668 18.0731 10.5528C17.6276 11.1236 17.0143 11.8882 16.3479 12.6556C15.6859 13.4181 14.9518 14.2064 14.2666 14.8119C13.9251 15.1136 13.5721 15.3911 13.2279 15.5986C12.9112 15.7895 12.476 16 11.9999 16C11.5238 16 11.0885 15.7895 10.7718 15.5986C10.4276 15.3911 10.0747 15.1136 9.7332 14.8119C9.04791 14.2064 8.31387 13.4181 7.65183 12.6556C6.98548 11.8882 6.37216 11.1236 5.92664 10.5528C5.70347 10.2668 5.44902 9.93847 5.19463 9.59307C4.86712 9.14837 4.96211 8.52237 5.4068 8.19486C5.58556 8.0632 5.79362 7.99983 5.99982 8L11.9999 8L17.9999 8C18.2061 7.99983 18.4142 8.0632 18.593 8.19486Z`,
    fill: `currentColor`,
    key: `0`
  }]],
  wi = [[`path`, {
    d: `M8.19486 5.40705C8.52237 4.96235 9.14837 4.86736 9.59306 5.19488C9.93847 5.44927 10.2668 5.70372 10.5528 5.92689C11.1236 6.3724 11.8882 6.98573 12.6556 7.65208C13.4181 8.31412 14.2064 9.04815 14.8119 9.73344C15.1136 10.0749 15.3911 10.4279 15.5986 10.7721C15.7895 11.0888 16 11.524 16 12.0001C16 12.4762 15.7895 12.9115 15.5986 13.2282C15.3911 13.5724 15.1136 13.9253 14.8119 14.2668C14.2064 14.9521 13.4181 15.6861 12.6556 16.3482C11.8882 17.0145 11.1236 17.6278 10.5528 18.0734C10.2668 18.2965 9.93847 18.551 9.59307 18.8054C9.14837 19.1329 8.52237 19.0379 8.19486 18.5932C8.0632 18.4144 7.99983 18.2064 8.00001 18.0002L8 12.0001L8 6.00007C7.99983 5.79387 8.0632 5.58581 8.19486 5.40705Z`,
    fill: `currentColor`,
    key: `0`
  }]],
  Ti = [[`path`, {
    d: `M17.293 5.29295C17.6835 4.90243 18.3165 4.90243 18.707 5.29295C19.0976 5.68348 19.0976 6.31649 18.707 6.70702L13.4131 12L18.7061 17.293L18.7754 17.3691C19.0954 17.7619 19.0721 18.341 18.7061 18.707C18.3399 19.0731 17.7609 19.0958 17.3682 18.7754L17.292 18.707L11.999 13.414L6.70802 18.706C6.3175 19.0966 5.68449 19.0965 5.29396 18.706C4.90344 18.3155 4.90344 17.6825 5.29396 17.292L10.585 12L5.29298 6.70799L5.22462 6.63182C4.90423 6.23907 4.92691 5.66007 5.29298 5.29393C5.65897 4.92794 6.23811 4.9046 6.63087 5.22459L6.70705 5.29393L11.999 10.5859L17.293 5.29295Z`,
    fill: `currentColor`,
    key: `0`
  }]],
  Ei = [[`path`, {
    d: `M16.0549 2.25C17.4225 2.24998 18.5248 2.24996 19.3918 2.36652C20.2919 2.48754 21.0497 2.74643 21.6517 3.34835C22.2536 3.95027 22.5125 4.70814 22.6335 5.60825C22.75 6.47522 22.75 7.57754 22.75 8.94513V11.0549C22.75 12.4225 22.75 13.5248 22.6335 14.3918C22.5125 15.2919 22.2536 16.0497 21.6517 16.6517C21.0497 17.2536 20.2919 17.5125 19.3918 17.6335C18.5248 17.75 17.4225 17.75 16.0549 17.75H16.0549H7.94513H7.94512C6.57754 17.75 5.47522 17.75 4.60825 17.6335C3.70814 17.5125 2.95027 17.2536 2.34835 16.6517C1.74643 16.0497 1.48754 15.2919 1.36652 14.3918C1.24996 13.5248 1.24998 12.4225 1.25 11.0549V11.0549V8.94513V8.94511C1.24998 7.57753 1.24996 6.47521 1.36652 5.60825C1.48754 4.70814 1.74643 3.95027 2.34835 3.34835C2.95027 2.74643 3.70814 2.48754 4.60825 2.36652C5.47521 2.24996 6.57753 2.24998 7.94511 2.25H7.94513H16.0549H16.0549Z`,
    fill: `currentColor`,
    key: `0`
  }], [`path`, {
    d: `M10.5 16.75C10.5 16.1977 10.9477 15.75 11.5 15.75H12.5C13.0523 15.75 13.5 16.1977 13.5 16.75V19.25C13.5 19.5261 13.7239 19.75 14 19.75H16C16.5523 19.75 17 20.1977 17 20.75C17 21.3023 16.5523 21.75 16 21.75H8C7.44772 21.75 7 21.3023 7 20.75C7 20.1977 7.44772 19.75 8 19.75H10C10.2761 19.75 10.5 19.5261 10.5 19.25V16.75Z`,
    fill: `currentColor`,
    fillRule: `evenodd`,
    clipRule: `evenodd`,
    key: `1`
  }]],
  Di = [[`path`, {
    d: `M22.25 14.5C22.25 16.1287 22.2517 17.4257 22.1152 18.4404C21.9759 19.4767 21.68 20.3298 21.0049 21.0049C20.3298 21.68 19.4767 21.9759 18.4404 22.1152C17.4257 22.2517 16.1287 22.25 14.5 22.25C12.8713 22.25 11.5743 22.2517 10.5596 22.1152C9.52332 21.9759 8.67025 21.68 7.99512 21.0049C7.31999 20.3298 7.02409 19.4767 6.88477 18.4404C6.74835 17.4257 6.75 16.1287 6.75 14.5C6.75 12.8713 6.74835 11.5743 6.88477 10.5596C7.02409 9.52332 7.31999 8.67025 7.99512 7.99512C8.67025 7.31999 9.52332 7.02409 10.5596 6.88477C11.5743 6.74835 12.8713 6.75 14.5 6.75C16.1287 6.75 17.4257 6.74835 18.4404 6.88477C19.4767 7.02409 20.3298 7.31999 21.0049 7.99512C21.68 8.67025 21.9759 9.52332 22.1152 10.5596C22.2517 11.5743 22.25 12.8713 22.25 14.5Z`,
    fill: `currentColor`,
    key: `0`
  }], [`path`, {
    d: `M9.5 1.75C11.1287 1.75 12.4257 1.74835 13.4404 1.88477C14.4767 2.02409 15.3298 2.31999 16.0049 2.99512C16.6176 3.60786 16.9159 4.36754 17.0703 5.27734C16.2852 5.24868 15.4214 5.25 14.5 5.25C12.9131 5.25 11.4971 5.24547 10.3594 5.39844C9.15677 5.56017 7.93469 5.93445 6.93457 6.93457C5.93445 7.93469 5.56017 9.15677 5.39844 10.3594C5.24547 11.4971 5.25 12.9131 5.25 14.5C5.25 15.4214 5.24868 16.2852 5.27734 17.0703C4.36754 16.9159 3.60786 16.6176 2.99512 16.0049C2.31999 15.3298 2.02409 14.4767 1.88477 13.4404C1.74835 12.4257 1.75 11.1287 1.75 9.5C1.75 7.87129 1.74835 6.57426 1.88477 5.55957C2.02409 4.52332 2.31999 3.67025 2.99512 2.99512C3.67025 2.31999 4.52332 2.02409 5.55957 1.88477C6.57426 1.74835 7.87129 1.75 9.5 1.75Z`,
    fill: `currentColor`,
    key: `1`
  }]],
  Oi = [[`path`, {
    d: `M17.2239 12.75H17.2761C17.8364 12.75 18.2946 12.75 18.6689 12.7755C19.0558 12.8019 19.4074 12.8581 19.7437 12.9974C20.5401 13.3272 21.1728 13.9599 21.5026 14.7563C21.6419 15.0926 21.6981 15.4442 21.7245 15.8311C21.75 16.2054 21.75 16.6636 21.75 17.2239V17.2761C21.75 17.8364 21.75 18.2946 21.7245 18.6689C21.6981 19.0558 21.6419 19.4074 21.5026 19.7437C21.1728 20.5401 20.5401 21.1728 19.7437 21.5026C19.4074 21.6419 19.0558 21.6981 18.6689 21.7245C18.2946 21.75 17.8364 21.75 17.2761 21.75H17.2239C16.6636 21.75 16.2054 21.75 15.8311 21.7245C15.4442 21.6981 15.0926 21.6419 14.7563 21.5026C13.9599 21.1728 13.3272 20.5401 12.9974 19.7437C12.8581 19.4074 12.8019 19.0558 12.7755 18.6689C12.75 18.2946 12.75 17.8364 12.75 17.2761V17.2239C12.75 16.6636 12.75 16.2054 12.7755 15.8311C12.8019 15.4442 12.8581 15.0926 12.9974 14.7563C13.3272 13.9599 13.9599 13.3272 14.7563 12.9974C15.0926 12.8581 15.4442 12.8019 15.8311 12.7755C16.2054 12.75 16.6636 12.75 17.2239 12.75ZM15.9332 14.272C15.6227 14.2932 15.4534 14.3322 15.3303 14.3832C14.9015 14.5608 14.5608 14.9015 14.3832 15.3303C14.3322 15.4534 14.2932 15.6227 14.272 15.9332C14.2504 16.2504 14.25 16.6573 14.25 17.25C14.25 17.8427 14.2504 18.2496 14.272 18.5668C14.2932 18.8773 14.3322 19.0466 14.3832 19.1697C14.5608 19.5985 14.9015 19.9392 15.3303 20.1168C15.4534 20.1678 15.6227 20.2068 15.9332 20.228C16.2504 20.2496 16.6573 20.25 17.25 20.25C17.8427 20.25 18.2496 20.2496 18.5668 20.228C18.8773 20.2068 19.0466 20.1678 19.1697 20.1168C19.5985 19.9392 19.9392 19.5985 20.1168 19.1697C20.1678 19.0466 20.2068 18.8773 20.228 18.5668C20.2496 18.2496 20.25 17.8427 20.25 17.25C20.25 16.6573 20.2496 16.2504 20.228 15.9332C20.2068 15.6227 20.1678 15.4534 20.1168 15.3303C19.9392 14.9015 19.5985 14.5608 19.1697 14.3832C19.0466 14.3322 18.8773 14.2932 18.5668 14.272C18.2496 14.2504 17.8427 14.25 17.25 14.25C16.6573 14.25 16.2504 14.2504 15.9332 14.272Z`,
    fill: `currentColor`,
    fillRule: `evenodd`,
    clipRule: `evenodd`,
    key: `0`
  }], [`path`, {
    d: `M17.2761 2.25C17.8364 2.24999 18.2946 2.24999 18.6689 2.27553C19.0558 2.30192 19.4074 2.35808 19.7437 2.49739C20.5401 2.82725 21.1728 3.45994 21.5026 4.25628C21.6419 4.59261 21.6981 4.94423 21.7245 5.33106C21.75 5.70535 21.75 6.21576 21.75 6.77604V6.77607V6.77614C21.75 7.3364 21.75 7.79466 21.7245 8.16894C21.6981 8.55577 21.6419 8.90739 21.5026 9.24372C21.1728 10.0401 20.5401 10.6728 19.7437 11.0026C19.4074 11.1419 19.0558 11.1981 18.6689 11.2245C18.2947 11.25 17.8364 11.25 17.2761 11.25H17.2761H17.276C16.7158 11.25 16.2054 11.25 15.8311 11.2245C15.4442 11.1981 15.0926 11.1419 14.7563 11.0026C13.9599 10.6728 13.3272 10.0401 12.9974 9.24372C12.8581 8.90739 12.8019 8.55577 12.7755 8.16894C12.75 7.79464 12.75 7.33637 12.75 6.77608V6.77607C12.75 6.21577 12.75 5.70536 12.7755 5.33106C12.8019 4.94423 12.8581 4.59261 12.9974 4.25628C13.3272 3.45994 13.9599 2.82725 14.7563 2.49739C15.0926 2.35808 15.4442 2.30192 15.8311 2.27553C16.2054 2.24999 16.7158 2.24999 17.2761 2.25H17.2761Z`,
    fill: `currentColor`,
    key: `1`
  }], [`path`, {
    d: `M17.2761 12.75C17.8364 12.75 18.2946 12.75 18.6689 12.7755C19.0558 12.8019 19.4074 12.8581 19.7437 12.9974C20.5401 13.3272 21.1728 13.9599 21.5026 14.7563C21.6419 15.0926 21.6981 15.4442 21.7245 15.8311C21.75 16.2054 21.75 16.7158 21.75 17.276V17.2761V17.2761C21.75 17.8364 21.75 18.2947 21.7245 18.6689C21.6981 19.0558 21.6419 19.4074 21.5026 19.7437C21.1728 20.5401 20.5401 21.1728 19.7437 21.5026C19.4074 21.6419 19.0558 21.6981 18.6689 21.7245C18.2947 21.75 17.8364 21.75 17.2761 21.75H17.2761H17.276C16.7158 21.75 16.2054 21.75 15.8311 21.7245C15.4442 21.6981 15.0926 21.6419 14.7563 21.5026C13.9599 21.1728 13.3272 20.5401 12.9974 19.7437C12.8581 19.4074 12.8019 19.0558 12.7755 18.6689C12.75 18.2946 12.75 17.8364 12.75 17.2761V17.2761C12.75 16.7158 12.75 16.2054 12.7755 15.8311C12.8019 15.4442 12.8581 15.0926 12.9974 14.7563C13.3272 13.9599 13.9599 13.3272 14.7563 12.9974C15.0926 12.8581 15.4442 12.8019 15.8311 12.7755C16.2054 12.75 16.7158 12.75 17.2761 12.75H17.2761Z`,
    fill: `currentColor`,
    key: `2`
  }], [`path`, {
    d: `M6.77608 2.25C7.33637 2.24999 7.79464 2.24999 8.16894 2.27553C8.55577 2.30192 8.90739 2.35808 9.24372 2.49739C10.0401 2.82725 10.6728 3.45994 11.0026 4.25628C11.1419 4.59261 11.1981 4.94423 11.2245 5.33106C11.25 5.70535 11.25 6.21576 11.25 6.77604V6.77607V6.77614C11.25 7.3364 11.25 7.79466 11.2245 8.16894C11.1981 8.55577 11.1419 8.90739 11.0026 9.24372C10.6728 10.0401 10.0401 10.6728 9.24372 11.0026C8.90739 11.1419 8.55577 11.1981 8.16894 11.2245C7.79466 11.25 7.3364 11.25 6.77614 11.25H6.77607H6.77604C6.21576 11.25 5.70535 11.25 5.33106 11.2245C4.94423 11.1981 4.59261 11.1419 4.25628 11.0026C3.45994 10.6728 2.82725 10.0401 2.49739 9.24372C2.35808 8.90739 2.30192 8.55577 2.27553 8.16894C2.24999 7.79464 2.24999 7.33637 2.25 6.77608V6.77607C2.24999 6.21577 2.24999 5.70536 2.27553 5.33106C2.30192 4.94423 2.35808 4.59261 2.49739 4.25628C2.82725 3.45994 3.45994 2.82725 4.25628 2.49739C4.59261 2.35808 4.94423 2.30192 5.33106 2.27553C5.70536 2.24999 6.21577 2.24999 6.77607 2.25H6.77608Z`,
    fill: `currentColor`,
    key: `3`
  }], [`path`, {
    d: `M6.77608 12.75C7.33637 12.75 7.79464 12.75 8.16894 12.7755C8.55577 12.8019 8.90739 12.8581 9.24372 12.9974C10.0401 13.3272 10.6728 13.9599 11.0026 14.7563C11.1419 15.0926 11.1981 15.4442 11.2245 15.8311C11.25 16.2054 11.25 16.7158 11.25 17.276V17.2761V17.2761C11.25 17.8364 11.25 18.2947 11.2245 18.6689C11.1981 19.0558 11.1419 19.4074 11.0026 19.7437C10.6728 20.5401 10.0401 21.1728 9.24372 21.5026C8.90739 21.6419 8.55577 21.6981 8.16894 21.7245C7.79466 21.75 7.3364 21.75 6.77614 21.75H6.77607H6.77604C6.21576 21.75 5.70535 21.75 5.33106 21.7245C4.94423 21.6981 4.59261 21.6419 4.25628 21.5026C3.45994 21.1728 2.82725 20.5401 2.49739 19.7437C2.35808 19.4074 2.30192 19.0558 2.27553 18.6689C2.24999 18.2946 2.24999 17.8364 2.25 17.2761V17.2761C2.24999 16.7158 2.24999 16.2054 2.27553 15.8311C2.30192 15.4442 2.35808 15.0926 2.49739 14.7563C2.82725 13.9599 3.45994 13.3272 4.25628 12.9974C4.59261 12.8581 4.94423 12.8019 5.33106 12.7755C5.70536 12.75 6.21577 12.75 6.77607 12.75H6.77608Z`,
    fill: `currentColor`,
    key: `4`
  }]],
  ki = [[`path`, {
    d: `M11.5875 22.75C12.1575 22.7507 12.662 22.7514 13.1374 22.5827C13.2354 22.548 13.3314 22.508 13.4252 22.4629C13.88 22.2442 14.2363 21.8852 14.6387 21.4795L19.4216 16.6719C19.8889 16.2035 20.3037 15.7879 20.5278 15.2441C20.7518 14.7004 20.7509 14.1116 20.7499 13.4482L20.7498 9.97396C20.7498 8.19195 20.7498 6.7556 20.5987 5.62592C20.4419 4.45306 20.1063 3.46554 19.326 2.68123C18.5458 1.89693 17.5634 1.55958 16.3966 1.40189C15.2727 1.25002 13.8438 1.25004 12.071 1.25006C10.2982 1.25004 8.72712 1.25002 7.60328 1.4019C6.43649 1.55958 5.45408 1.89693 4.67383 2.68123C3.89358 3.46554 3.55798 4.45307 3.40111 5.62592C3.25002 6.75558 3.25004 8.19193 3.25006 9.97389V9.9739V9.97392V9.97394V14.5475V14.5475V14.5475V14.5476C3.25005 16.0812 3.25003 17.3177 3.36431 18.3015C3.48255 19.3195 3.73424 20.1917 4.32688 20.9305C4.54441 21.2017 4.79018 21.4488 5.05999 21.6674C5.79501 22.2632 6.66272 22.5162 7.67541 22.635C8.65417 22.7499 10.0618 22.75 11.5875 22.75ZM18.7314 14.4962C18.6746 14.634 18.5693 14.7644 17.9512 15.3857L13.3463 20.0145C12.8133 20.5502 12.6719 20.6837 12.4903 20.7383C12.4903 19.3765 12.4903 18.7204 12.6066 17.8552C12.7276 16.9551 12.9865 16.1972 13.5884 15.5953C14.1903 14.9934 14.9482 14.7345 15.8483 14.6135C16.7153 14.4969 17.3638 14.4961 18.7314 14.4962ZM16.7501 7.00006C16.7501 7.41428 16.4143 7.75006 16.0001 7.75006L8.00006 7.75006C7.58585 7.75006 7.25006 7.41428 7.25006 7.00006C7.25006 6.58585 7.58585 6.25006 8.00006 6.25006L16.0001 6.25006C16.4143 6.25006 16.7501 6.58585 16.7501 7.00006ZM12.0001 11.7501C12.4143 11.7501 12.7501 11.4143 12.7501 11.0001C12.7501 10.5858 12.4143 10.2501 12.0001 10.2501H8.00006C7.58585 10.2501 7.25006 10.5858 7.25006 11.0001C7.25006 11.4143 7.58585 11.7501 8.00006 11.7501H12.0001Z`,
    fill: `currentColor`,
    fillRule: `evenodd`,
    clipRule: `evenodd`,
    key: `0`
  }]],
  ji = [[`path`, {
    d: `M9.94118 17.8804C9.94118 17.5169 10.0494 17.2011 10.2238 16.9157C10.3434 16.7199 10.2615 16.4422 10.0453 16.3808C8.25526 15.8726 7 15.0555 7 12.3451C7 11.6404 7.22356 10.9779 7.61654 10.4013C7.71414 10.2581 7.76181 10.193 7.77491 10.1215C7.78806 10.0497 7.76638 9.97161 7.72543 9.80167C7.58167 9.20515 7.57017 8.57672 7.73081 7.99051C7.78361 7.79782 7.8968 7.68543 8.10166 7.70713C8.3674 7.73528 8.82753 7.86109 9.50999 8.30139C9.77813 8.47438 9.9122 8.56088 10.0303 8.58023C10.1484 8.59958 10.3062 8.55906 10.622 8.478C11.0537 8.36716 11.4986 8.30765 12 8.30765C12.5014 8.30765 12.9463 8.36715 13.378 8.478C13.6938 8.55905 13.8516 8.59958 13.9697 8.58023C14.0878 8.56088 14.2219 8.47439 14.49 8.3014C15.1725 7.8611 15.6326 7.73528 15.8983 7.70713C16.1032 7.68543 16.2164 7.79782 16.2692 7.99051C16.4298 8.57672 16.4183 9.20514 16.2746 9.80166C16.2336 9.9716 16.2119 10.0497 16.2251 10.1215C16.2382 10.1929 16.2859 10.2581 16.3834 10.4013C16.7764 10.9779 17 11.6404 17 12.3451C17 15.0555 15.7447 15.8726 13.9547 16.3808C13.7385 16.4422 13.6566 16.7199 13.7762 16.9157C13.9506 17.2011 14.0588 17.5169 14.0588 17.8804V22.6514C19.011 21.6909 22.75 17.3313 22.75 12.0984C22.75 6.16133 17.9371 1.34839 12 1.34839C6.06294 1.34839 1.25 6.16133 1.25 12.0984C1.25 17.3313 4.98901 21.6909 9.94118 22.6514V19.8518C9.88484 19.8452 9.81816 19.8354 9.74225 19.821C9.52615 19.7799 9.23571 19.7012 8.89714 19.5511C8.21489 19.2485 7.36263 18.6669 6.53685 17.5663C6.28826 17.2349 6.35533 16.7648 6.68665 16.5162C7.01798 16.2676 7.48809 16.3347 7.73668 16.666C8.4109 17.5647 9.06058 17.9827 9.50527 18.1799C9.6822 18.2583 9.83089 18.3037 9.94118 18.3299V17.8804Z`,
    fill: `currentColor`,
    key: `0`
  }]],
  Mi = [[`path`, {
    d: `M12.0652 1.75C14.0744 1.74998 15.6717 1.74997 16.934 1.90331C18.2327 2.06106 19.3071 2.39345 20.1968 3.15334C20.4301 3.35261 20.6474 3.56991 20.8467 3.80323C21.6065 4.69294 21.9389 5.76729 22.0967 7.06598C22.25 8.32829 22.25 10.0561 22.25 12.0653C22.25 14.0744 22.25 15.6717 22.0967 16.934C21.9389 18.2327 21.6065 19.3071 20.8467 20.1968C20.6474 20.4301 20.4301 20.6474 20.1968 20.8467C19.3071 21.6065 18.2327 21.9389 16.934 22.0967C15.6717 22.25 13.9439 22.25 11.9347 22.25C9.92558 22.25 8.32829 22.25 7.06598 22.0967C5.76729 21.9389 4.69294 21.6065 3.80323 20.8467C3.56991 20.6474 3.35261 20.4301 3.15334 20.1968C2.39345 19.3071 2.06106 18.2327 1.90331 16.934C1.74997 15.6717 1.74998 14.0744 1.75 12.0652V12.0652C1.74998 10.0561 1.74997 8.3283 1.90331 7.06598C2.06106 5.76729 2.39345 4.69294 3.15334 3.80323C3.35261 3.56991 3.56991 3.35261 3.80323 3.15334C4.69294 2.39345 5.76729 2.06106 7.06598 1.90331C8.3283 1.74997 10.0561 1.74998 12.0652 1.75H12.0652ZM3.84153 16.6986C3.97614 17.8067 4.22847 18.4493 4.63803 18.9288C4.77088 19.0843 4.91575 19.2292 5.0713 19.3621C5.55084 19.7716 6.19337 20.024 7.3015 20.1586C8.43237 20.2959 9.91094 20.2976 12.0001 20.2976C14.0892 20.2976 15.5678 20.2959 16.6987 20.1586C17.8068 20.024 18.4493 19.7716 18.9289 19.3621C19.0844 19.2292 19.2293 19.0843 19.3622 18.9288C19.7717 18.4493 20.024 17.8067 20.1587 16.6986C20.2103 16.2738 20.2427 15.7999 20.2631 15.263L18.5304 13.5303C18.1909 13.1908 17.7303 13 17.2501 13C16.7699 13 16.3093 13.1908 15.9698 13.5303L14.0001 15.5L10.0304 11.5303C9.69086 11.1908 9.23031 11 8.75009 11C8.26988 11 7.80933 11.1908 7.46976 11.5303L3.73706 15.263C3.75747 15.7999 3.78993 16.2738 3.84153 16.6986ZM15.5 6.25C14.8096 6.25 14.25 6.80964 14.25 7.5C14.25 8.19036 14.8096 8.75 15.5 8.75C16.1904 8.75 16.75 8.19036 16.75 7.5C16.75 6.80964 16.1904 6.25 15.5 6.25Z`,
    fill: `currentColor`,
    fillRule: `evenodd`,
    clipRule: `evenodd`,
    key: `0`
  }]],
  Ni = [[`path`, {
    d: `M8.48709 2.39137C9.98525 1.69829 10.9543 1.25 12 1.25C13.0457 1.25 14.0147 1.69829 15.5129 2.39137L15.6717 2.4648L17.4361 3.28038L17.4362 3.28039C18.6983 3.86376 19.7228 4.33731 20.425 4.7951C21.1276 5.25313 21.75 5.84942 21.75 6.75C21.75 7.65058 21.1276 8.24687 20.425 8.7049C19.7228 9.16269 18.6983 9.63625 17.4361 10.2196L15.6717 11.0352L15.5129 11.1086C14.0147 11.8017 13.0457 12.25 12 12.25C10.9543 12.25 9.98524 11.8017 8.48707 11.1086L8.3283 11.0352L6.56388 10.2196C5.30174 9.63625 4.27718 9.16269 3.57495 8.7049C2.87237 8.24687 2.25 7.65058 2.25 6.75C2.25 5.84942 2.87237 5.25313 3.57495 4.7951C4.27718 4.33731 5.30174 3.86375 6.56388 3.28038L8.3283 2.4648L8.48709 2.39137Z`,
    fill: `currentColor`,
    key: `0`
  }], [`path`, {
    d: `M4.59541 15.3926C4.93089 15.8246 4.8614 16.4538 4.4402 16.7979C4.29438 16.917 4.23479 16.9964 4.21238 17.0346C4.19921 17.0571 4.19963 17.0622 4.19992 17.0657C4.19996 17.0662 4.2 17.0667 4.2 17.0672C4.2 17.0742 4.20055 17.0756 4.20099 17.0767C4.20094 17.0766 4.20105 17.0769 4.20099 17.0767C4.20207 17.0798 4.20941 17.0995 4.23715 17.1364C4.29989 17.2199 4.43529 17.3512 4.71204 17.5336C5.27828 17.9069 6.15898 18.3213 7.46898 18.9335L9.13118 19.7103C10.8225 20.5007 11.4045 20.7495 12 20.7495C12.5955 20.7495 13.1775 20.5007 14.8688 19.7103L16.531 18.9335C17.841 18.3213 18.7217 17.9068 19.288 17.5336C19.5647 17.3512 19.7001 17.2199 19.7629 17.1364C19.7906 17.0995 19.7978 17.0802 19.7989 17.0771C19.7988 17.0773 19.7989 17.077 19.7989 17.0771C19.7993 17.076 19.8 17.0742 19.8 17.0672C19.8 17.0667 19.8 17.0662 19.8001 17.0657C19.8004 17.0622 19.8008 17.0571 19.7876 17.0346C19.7652 16.9964 19.7056 16.917 19.5598 16.7979C19.1386 16.4538 19.0691 15.8246 19.4046 15.3926C19.7401 14.9606 20.3535 14.8894 20.7747 15.2335C21.2978 15.6608 21.75 16.2484 21.75 17.0672C21.75 18.1017 21.0384 18.7572 20.3422 19.2162C19.6427 19.6772 18.6305 20.1502 17.4138 20.7188L15.6774 21.5302C15.6143 21.5597 15.5522 21.5888 15.4908 21.6175C14.0619 22.2862 13.0718 22.7495 12 22.7495C10.9282 22.7495 9.93809 22.2862 8.50921 21.6175C8.44785 21.5888 8.38567 21.5597 8.32264 21.5302L6.58625 20.7188C5.3695 20.1502 4.35731 19.6772 3.65782 19.2162C2.96157 18.7572 2.25 18.1017 2.25 17.0672C2.25 16.2484 2.70221 15.6608 3.22531 15.2335C3.64651 14.8894 4.25992 14.9606 4.59541 15.3926Z`,
    fill: `currentColor`,
    fillRule: `evenodd`,
    clipRule: `evenodd`,
    key: `1`
  }], [`path`, {
    d: `M4.59541 10.2637C4.93089 10.6957 4.8614 11.3249 4.4402 11.669C4.29438 11.7881 4.23479 11.8675 4.21238 11.9057C4.19921 11.9281 4.19963 11.9332 4.19992 11.9368C4.19996 11.9373 4.2 11.9378 4.2 11.9383C4.2 11.9453 4.20055 11.9467 4.20099 11.9478C4.20094 11.9477 4.20105 11.948 4.20099 11.9478C4.20207 11.9509 4.20941 11.9706 4.23715 12.0075C4.29989 12.091 4.43529 12.2223 4.71204 12.4047C5.27828 12.7779 6.15898 13.1923 7.46898 13.8046L9.13118 14.5814C10.8225 15.3718 11.4045 15.6206 12 15.6206C12.5955 15.6206 13.1775 15.3718 14.8688 14.5814L16.531 13.8046C17.841 13.1923 18.7217 12.7779 19.288 12.4047C19.5647 12.2223 19.7001 12.091 19.7629 12.0075C19.7906 11.9706 19.7978 11.9513 19.7989 11.9482C19.7988 11.9484 19.7989 11.9481 19.7989 11.9482C19.7993 11.9471 19.8 11.9453 19.8 11.9383C19.8 11.9378 19.8 11.9373 19.8001 11.9368C19.8004 11.9332 19.8008 11.9281 19.7876 11.9057C19.7652 11.8675 19.7056 11.7881 19.5598 11.669C19.1386 11.3249 19.0691 10.6957 19.4046 10.2637C19.7401 9.83174 20.3535 9.76047 20.7747 10.1045C21.2978 10.5319 21.75 11.1195 21.75 11.9383C21.75 12.9728 21.0384 13.6283 20.3422 14.0872C19.6427 14.5483 18.6305 15.0213 17.4138 15.5899L15.6774 16.4013C15.6143 16.4308 15.5522 16.4599 15.4908 16.4886C14.0619 17.1573 13.0718 17.6206 12 17.6206C10.9282 17.6206 9.93809 17.1573 8.50921 16.4886C8.44785 16.4599 8.38567 16.4308 8.32264 16.4013L6.58625 15.5899C5.3695 15.0213 4.35731 14.5483 3.65782 14.0872C2.96157 13.6283 2.25 12.9728 2.25 11.9383C2.25 11.1195 2.70221 10.5319 3.22531 10.1045C3.64651 9.76047 4.25992 9.83174 4.59541 10.2637Z`,
    fill: `currentColor`,
    fillRule: `evenodd`,
    clipRule: `evenodd`,
    key: `2`
  }]],
  Pi = [[`path`, {
    d: `M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM9.5 10.75C9.5 9.36929 10.6193 8.25 12 8.25C13.3807 8.25 14.5 9.36929 14.5 10.75C14.5 11.7752 13.883 12.6562 13 13.042V15.75C13 16.3023 12.5523 16.75 12 16.75C11.4477 16.75 11 16.3023 11 15.75V13.042C10.117 12.6562 9.5 11.7752 9.5 10.75Z`,
    fill: `currentColor`,
    fillRule: `evenodd`,
    clipRule: `evenodd`,
    key: `0`
  }]],
  Fi = [[`path`, {
    d: `M3 5C3 4.44772 3.44772 4 4 4L20 4C20.5523 4 21 4.44772 21 5C21 5.55229 20.5523 6 20 6L4 6C3.44772 6 3 5.55228 3 5Z`,
    fill: `currentColor`,
    fillRule: `evenodd`,
    clipRule: `evenodd`,
    key: `0`
  }], [`path`, {
    d: `M3 12C3 11.4477 3.44772 11 4 11L20 11C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13L4 13C3.44772 13 3 12.5523 3 12Z`,
    fill: `currentColor`,
    fillRule: `evenodd`,
    clipRule: `evenodd`,
    key: `1`
  }], [`path`, {
    d: `M3 19C3 18.4477 3.44772 18 4 18L20 18C20.5523 18 21 18.4477 21 19C21 19.5523 20.5523 20 20 20L4 20C3.44772 20 3 19.5523 3 19Z`,
    fill: `currentColor`,
    fillRule: `evenodd`,
    clipRule: `evenodd`,
    key: `2`
  }]],
  Ii = [[`path`, {
    d: `M10.5163 2.04296C10.6958 2.27649 10.722 2.59345 10.5832 2.85326C9.99927 3.9469 9.66792 5.19607 9.66792 6.52485C9.66792 10.8367 13.1633 14.3321 17.4751 14.3321C18.8039 14.3321 20.0531 14.0007 21.1467 13.4168C21.4065 13.278 21.7235 13.3042 21.957 13.4837C22.1906 13.6632 22.2974 13.9627 22.2302 14.2495C21.1556 18.8349 17.0409 22.25 12.1269 22.25C6.39589 22.25 1.75 17.6041 1.75 11.8731C1.75 6.95906 5.16505 2.84445 9.7505 1.76979C10.0373 1.70258 10.3368 1.80944 10.5163 2.04296Z`,
    fill: `currentColor`,
    key: `0`
  }]],
  Li = [[`path`, {
    d: `M6.99793 1H7.09013C7.99378 0.999985 8.73891 0.999972 9.34348 1.05477C9.97205 1.11174 10.5461 1.23419 11.0748 1.53944C11.6869 1.89283 12.1952 2.40112 12.5486 3.01321C12.8248 3.4915 12.6609 4.10309 12.1826 4.37923C11.7043 4.65538 11.0927 4.4915 10.8166 4.01321C10.6387 3.70515 10.3829 3.44934 10.0748 3.27149C9.90127 3.17128 9.6528 3.091 9.16295 3.0466C8.65935 3.00096 8.00528 3 7.04403 3C6.08278 3 5.4287 3.00096 4.9251 3.0466C4.43525 3.091 4.18678 3.17128 4.01321 3.27149C3.70515 3.44934 3.44934 3.70515 3.27149 4.01321C3.17128 4.18678 3.091 4.43525 3.0466 4.9251C3.00096 5.4287 3 6.08278 3 7.04403C3 8.00528 3.00096 8.65935 3.0466 9.16295C3.091 9.6528 3.17128 9.90127 3.27149 10.0748C3.44934 10.3829 3.70515 10.6387 4.01321 10.8166C4.4915 11.0927 4.65538 11.7043 4.37923 12.1826C4.10309 12.6609 3.4915 12.8248 3.01321 12.5486C2.40112 12.1952 1.89283 11.6869 1.53944 11.0748C1.23419 10.5461 1.11174 9.97205 1.05477 9.34348C0.999972 8.73891 0.999985 7.99378 1 7.09013V6.99793C0.999985 6.09428 0.999972 5.34915 1.05477 4.74458C1.11173 4.11601 1.23419 3.54192 1.53944 3.01321C1.89283 2.40112 2.40112 1.89283 3.01321 1.53944C3.54192 1.23419 4.11601 1.11173 4.74458 1.05477C5.34915 0.999972 6.09428 0.999985 6.99793 1Z`,
    fill: `currentColor`,
    fillRule: `evenodd`,
    clipRule: `evenodd`,
    key: `0`
  }], [`path`, {
    d: `M11.9973 6H12.0895C12.993 5.99998 13.738 5.99997 14.3425 6.05476C14.971 6.11172 15.5451 6.23416 16.0737 6.53939C16.6858 6.89274 17.194 7.40098 17.5474 8.01301C17.8235 8.49131 17.6596 9.1029 17.1813 9.37904C16.7031 9.65518 16.0915 9.49131 15.8153 9.01301C15.6375 8.70502 15.3817 8.44926 15.0737 8.27144C14.9002 8.17125 14.6518 8.09099 14.162 8.0466C13.6585 8.00096 13.0045 8 12.0434 8C11.0823 8 10.4283 8.00096 9.92474 8.0466C9.43496 8.09099 9.18654 8.17125 9.01301 8.27144C8.70502 8.44926 8.44926 8.70502 8.27144 9.01301C8.17125 9.18654 8.09099 9.43496 8.0466 9.92474C8.00096 10.4283 8 11.0823 8 12.0434C8 13.0045 8.00096 13.6585 8.0466 14.162C8.09099 14.6518 8.17125 14.9002 8.27144 15.0737C8.44926 15.3817 8.70502 15.6375 9.01301 15.8153C9.49131 16.0915 9.65518 16.7031 9.37904 17.1813C9.1029 17.6596 8.49131 17.8235 8.01301 17.5474C7.40098 17.194 6.89274 16.6858 6.53939 16.0737C6.23416 15.5451 6.11172 14.971 6.05476 14.3425C5.99997 13.738 5.99998 12.993 6 12.0895V11.9973C5.99998 11.0938 5.99997 10.3487 6.05476 9.74421C6.11172 9.11572 6.23416 8.54168 6.53939 8.01301C6.89274 7.40098 7.40098 6.89274 8.01301 6.53939C8.54168 6.23416 9.11572 6.11172 9.74421 6.05476C10.3487 5.99997 11.0938 5.99998 11.9973 6Z`,
    fill: `currentColor`,
    fillRule: `evenodd`,
    clipRule: `evenodd`,
    key: `1`
  }], [`path`, {
    d: `M17.0461 11C17.9415 11 18.6805 11 19.2802 11.0543C19.9039 11.1109 20.4744 11.2324 21 11.5359C21.6081 11.887 22.113 12.3919 22.4641 13C22.7676 13.5256 22.8892 14.0961 22.9457 14.7198C23 15.3195 23 16.0585 23 16.9539V17.0461C23 17.9415 23 18.6805 22.9457 19.2802C22.8892 19.9039 22.7676 20.4744 22.4641 21C22.113 21.6081 21.6081 22.113 21 22.4641C20.4744 22.7676 19.9039 22.8892 19.2802 22.9457C18.6805 23 17.9415 23 17.0461 23H16.9539C16.0585 23 15.3195 23 14.7198 22.9457C14.0961 22.8892 13.5256 22.7676 13 22.4641C12.3919 22.113 11.887 21.6081 11.5359 21C11.2324 20.4744 11.1109 19.9039 11.0543 19.2802C11 18.6805 11 17.9415 11 17.0461V17.046V16.954V16.9539C11 16.0585 11 15.3195 11.0543 14.7198C11.1109 14.0961 11.2324 13.5256 11.5359 13C11.887 12.3919 12.3919 11.887 13 11.5359C13.5256 11.2324 14.0961 11.1109 14.7198 11.0543C15.3195 11 16.0585 11 16.9539 11H16.954H17.046H17.0461Z`,
    fill: `currentColor`,
    key: `2`
  }]],
  Ri = [[`path`, {
    d: `M11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20C13.125 20 15.078 19.2635 16.6177 18.0319L20.2929 21.7071C20.6834 22.0976 21.3166 22.0976 21.7071 21.7071C22.0976 21.3166 22.0976 20.6834 21.7071 20.2929L18.0319 16.6177C19.2635 15.078 20 13.125 20 11C20 6.02944 15.9706 2 11 2ZM4 11C4 7.13401 7.13401 4 11 4C14.866 4 18 7.13401 18 11C18 14.866 14.866 18 11 18C7.13401 18 4 14.866 4 11Z`,
    fill: `currentColor`,
    fillRule: `evenodd`,
    clipRule: `evenodd`,
    key: `0`
  }]],
  zi = [[`path`, {
    d: `M17.5 12C17.5 15.0376 15.0376 17.5 12 17.5C8.96243 17.5 6.5 15.0376 6.5 12C6.5 8.96243 8.96243 6.5 12 6.5C15.0376 6.5 17.5 8.96243 17.5 12Z`,
    fill: `currentColor`,
    key: `0`
  }], [`path`, {
    d: `M12 1C12.5523 1 13 1.44772 13 2V3.5C13 4.05228 12.5523 4.5 12 4.5C11.4477 4.5 11 4.05228 11 3.5V2C11 1.44772 11.4477 1 12 1ZM4.22149 4.22149C4.61202 3.83097 5.24518 3.83097 5.6357 4.22149L6.69636 5.28215C7.08689 5.67268 7.08689 6.30584 6.69636 6.69636C6.30584 7.08689 5.67268 7.08689 5.28215 6.69636L4.22149 5.6357C3.83097 5.24518 3.83097 4.61201 4.22149 4.22149ZM19.7784 4.2216C20.1689 4.61213 20.1689 5.24529 19.7784 5.63582L18.7177 6.69648C18.3272 7.087 17.694 7.087 17.3035 6.69648C16.913 6.30595 16.913 5.67279 17.3035 5.28226L18.3642 4.2216C18.7547 3.83108 19.3879 3.83108 19.7784 4.2216ZM1 12C1 11.4477 1.44772 11 2 11H3.5C4.05228 11 4.5 11.4477 4.5 12C4.5 12.5523 4.05228 13 3.5 13H2C1.44772 13 1 12.5523 1 12ZM19.5 12C19.5 11.4477 19.9477 11 20.5 11H22C22.5523 11 23 11.4477 23 12C23 12.5523 22.5523 13 22 13H20.5C19.9477 13 19.5 12.5523 19.5 12ZM17.303 17.3035C17.6936 16.913 18.3267 16.913 18.7172 17.3035L19.7779 18.3642C20.1684 18.7547 20.1684 19.3879 19.7779 19.7784C19.3874 20.1689 18.7542 20.1689 18.3637 19.7784L17.303 18.7177C16.9125 18.3272 16.9125 17.694 17.303 17.3035ZM6.69685 17.3036C7.08738 17.6942 7.08738 18.3273 6.69685 18.7178L5.63619 19.7785C5.24567 20.169 4.6125 20.169 4.22198 19.7785C3.83145 19.388 3.83145 18.7548 4.22198 18.3643L5.28264 17.3036C5.67316 16.9131 6.30633 16.9131 6.69685 17.3036ZM12 19.5C12.5523 19.5 13 19.9477 13 20.5V22C13 22.5523 12.5523 23 12 23C11.4477 23 11 22.5523 11 22V20.5C11 19.9477 11.4477 19.5 12 19.5Z`,
    fill: `currentColor`,
    fillRule: `evenodd`,
    clipRule: `evenodd`,
    key: `1`
  }]],
  Bi = [[`path`, {
    d: `M19.6905 5.77665C20.09 6.15799 20.1047 6.79098 19.7234 7.19048L9.22336 18.1905C9.03745 18.3852 8.78086 18.4968 8.51163 18.4999C8.2424 18.5031 7.98328 18.3975 7.79289 18.2071L4.29289 14.7071C3.90237 14.3166 3.90237 13.6834 4.29289 13.2929C4.68342 12.9024 5.31658 12.9024 5.70711 13.2929L8.48336 16.0692L18.2766 5.80953C18.658 5.41003 19.291 5.39531 19.6905 5.77665Z`,
    fill: `currentColor`,
    fillRule: `evenodd`,
    clipRule: `evenodd`,
    key: `0`
  }]];
function j({
  icon: e,
  size: t = 16
}) {
  return (0, A.jsx)(s, {
    icon: e,
    size: t,
    color: `currentColor`,
    "aria-hidden": !0
  });
}
function Vi({
  value: e,
  label: t,
  className: n = ``,
  onCopied: r
}) {
  let [i, a] = (0, m.useState)(!1),
    o = async () => {
      try {
        if (typeof e == `string`) await navigator.clipboard.writeText(e);else if (typeof ClipboardItem < `u`) {
          let t = e().then(e => new Blob([e], {
            type: `text/plain`
          }));
          await navigator.clipboard.write([new ClipboardItem({
            "text/plain": t
          })]);
        } else await navigator.clipboard.writeText(await e());
        a(!0), r?.(), setTimeout(() => a(!1), 1400);
      } catch {}
    },
    s = (0, A.jsx)(j, {
      icon: i ? Bi : Di,
      size: 14
    });
  return t ? (0, A.jsxs)(`button`, {
    className: `btn btn--ghost btn--xs ${n}`,
    onClick: o,
    children: [s, i ? `Copied` : t]
  }) : (0, A.jsx)(`button`, {
    className: `icon-btn ${n}`,
    onClick: o,
    "aria-label": `Copy to clipboard`,
    children: s
  });
}
var Hi = null,
  Ui = null,
  Wi = () => Ui ??= i(() => import("./chunks/lib-D_jy-Mlc.js").then(e => Hi = e.highlight), __vite__mapDeps([296, 2])),
  Gi = e => e.replace(/[&<>]/g, e => ({
    "&": `&amp;`,
    "<": `&lt;`,
    ">": `&gt;`
  })[e]),
  Ki = e => e.split(`
`).map(e => `<span class="sh__line">${Gi(e)}</span>`).join(`
`);
function qi({
  code: e,
  filename: t,
  lineNumbers: n = !0,
  maxHeight: r,
  onCopied: i
}) {
  let [a, o] = (0, m.useState)(!!Hi);
  (0, m.useEffect)(() => {
    a || Wi().then(() => o(!0));
  }, [a]);
  let s = (0, m.useMemo)(() => Hi ? Hi(e.trimEnd()) : Ki(e.trimEnd()), [e, a]);
  return (0, A.jsxs)(`div`, {
    className: `code`,
    children: [t ? (0, A.jsxs)(`div`, {
      className: `code__head`,
      children: [(0, A.jsxs)(`span`, {
        className: `code__file`,
        children: [(0, A.jsx)(j, {
          icon: ki,
          size: 14
        }), t]
      }), (0, A.jsx)(Vi, {
        value: e,
        label: `Copy`,
        onCopied: i
      })]
    }) : (0, A.jsx)(Vi, {
      value: e,
      className: `code__copy`,
      onCopied: i
    }), (0, A.jsx)(`pre`, {
      className: `code__body`,
      "data-lines": n,
      style: {
        maxHeight: r
      },
      children: (0, A.jsx)(`code`, {
        dangerouslySetInnerHTML: {
          __html: s
        }
      })
    })]
  });
}
function Ji({
  command: e,
  onCopied: t
}) {
  return (0, A.jsxs)(`div`, {
    className: `command`,
    children: [(0, A.jsxs)(`code`, {
      children: [(0, A.jsx)(`span`, {
        className: `command__prompt`,
        children: `$`
      }), ` `, e]
    }), (0, A.jsx)(Vi, {
      value: e,
      onCopied: t
    })]
  });
}
function M({
  id: e,
  title: t,
  lead: n,
  children: r
}) {
  return (0, A.jsxs)(`section`, {
    id: e,
    className: `doc__section`,
    children: [(0, A.jsx)(`h2`, {
      className: `doc__h2`,
      children: t
    }), n && (0, A.jsx)(`p`, {
      className: `doc__p`,
      children: n
    }), r]
  });
}
function Yi({
  id: e,
  title: t,
  lead: n,
  items: r
}) {
  return r?.length ? (0, A.jsx)(M, {
    id: e,
    title: t,
    lead: n,
    children: (0, A.jsx)(`ul`, {
      className: `doc__list`,
      children: r.map(e => (0, A.jsx)(`li`, {
        children: e
      }, e))
    })
  }) : null;
}
function Xi({
  command: e,
  onCopied: t
}) {
  let [n, r] = (0, m.useState)(`pnpm`);
  return (0, A.jsxs)(`div`, {
    className: `install`,
    children: [(0, A.jsxs)(`div`, {
      className: `install__head`,
      children: [(0, A.jsx)(`div`, {
        className: `pm-tabs`,
        role: `tablist`,
        "aria-label": `Package manager`,
        children: Object.keys(fi).map(e => (0, A.jsx)(`button`, {
          role: `tab`,
          "aria-selected": n === e,
          onClick: () => r(e),
          children: e
        }, e))
      }), (0, A.jsx)(Vi, {
        value: e(n),
        label: `Copy`,
        onCopied: t
      })]
    }), (0, A.jsx)(`pre`, {
      className: `install__cmd`,
      children: (0, A.jsx)(`code`, {
        children: e(n)
      })
    })]
  });
}
function Zi({
  label: e,
  code: t
}) {
  return (0, A.jsxs)(`div`, {
    className: `install`,
    children: [(0, A.jsxs)(`div`, {
      className: `install__head`,
      children: [(0, A.jsx)(`span`, {
        className: `install__label`,
        children: e
      }), (0, A.jsx)(Vi, {
        value: t,
        label: `Copy`
      })]
    }), (0, A.jsx)(`pre`, {
      className: `install__cmd`,
      children: (0, A.jsx)(`code`, {
        children: t
      })
    })]
  });
}
var $i = new Set(),
  ea = e => e.match(/^\/(components|screens|blocks|illustrations|motion)\/?$/)?.[1],
  ta = !1,
  na = () => {
    ta = !0;
  };
function ra(e, t) {
  let n = ta;
  ta = !1;
  let r = () => e === `components` ? n ? document.getElementById(`components`) : null : document.querySelector(`#${e} .library__title`) ?? document.getElementById(e),
    i = e => {
      let t = r();
      t ? t.scrollIntoView({
        block: `start`,
        behavior: e
      }) : window.scrollTo({
        top: 0,
        behavior: e
      });
    },
    a = !1,
    o = () => a = !0,
    s = [`wheel`, `touchstart`, `keydown`, `pointerdown`];
  s.forEach(e => window.addEventListener(e, o, {
    passive: !0,
    once: !0
  })), i(t ? `smooth` : `auto`), [t ? 900 : 200, 1300, 2200].forEach((e, t, n) => window.setTimeout(() => {
    let e = r(),
      c = e ? Math.abs(e.getBoundingClientRect().top - parseFloat(getComputedStyle(e).scrollMarginTop || `0`)) : window.scrollY;
    !a && c > 4 && i(`auto`), t === n.length - 1 && s.forEach(e => window.removeEventListener(e, o));
  }, e));
}
var ia = null;
function aa(e, t = !1) {
  let n = window.location.pathname;
  if (!t && e.split(`?`)[0] !== n && (ia = n), e === n + window.location.search) {
    let t = ea(e);
    t && ra(t, !1);
    return;
  }
  window.history[t ? `replaceState` : `pushState`](null, ``, e), $i.forEach(e => e()), !(ea(n) && ea(e)) && (document.querySelector(`.panel`)?.scrollTo({
    top: 0
  }), window.scrollTo({
    top: 0
  }));
}
function oa() {
  let [e, t] = (0, m.useState)(window.location.pathname);
  return (0, m.useEffect)(() => {
    let e = () => t(window.location.pathname);
    return $i.add(e), window.addEventListener(`popstate`, e), () => {
      $i.delete(e), window.removeEventListener(`popstate`, e);
    };
  }, []), e;
}
var sa = e => `/components/${e}`,
  ca = e => `/blocks/${e}`,
  la = e => `/illustrations/${e}`,
  ua = e => `/motion/${e}`,
  N = e => `/screens/${e}`,
  P = e => e.kind === `block` ? ca(e.slug) : e.kind === `illustration` ? la(e.slug) : e.kind === `motion` ? ua(e.slug) : e.kind === `screen` ? N(e.slug) : sa(e.slug);
var _a = [[`--ui-cc-card`, `White text area`], [`--ui-cc-tray`, `Gray layer behind it`], [`--ui-cc-line`, `Outlines`], [`--ui-cc-ink`, `Text and the send button`], [`--ui-cc-ink-muted`, `Labels such as “Request approval”`], [`--ui-cc-placeholder`, `Placeholder text`], [`--ui-cc-alert`, `“Unrestricted access” and the recording dot`]];
function va() {
  return (0, A.jsxs)(A.Fragment, {
    children: [(0, A.jsxs)(M, {
      id: `variables`,
      title: `CSS variables`,
      children: [(0, A.jsxs)(`p`, {
        className: `doc__p`,
        children: [`Every component brings its own colors and timings as CSS variables on its root class. They share a short prefix, so they never clash with your own variables – the Chat Composer uses`, ` `, (0, A.jsx)(`code`, {
          className: `token`,
          children: `--ui-cc-`
        }), ` on `, (0, A.jsx)(`code`, {
          className: `token`,
          children: `.ui-chat-composer`
        }), `.`]
      }), (0, A.jsx)(`div`, {
        className: `table-wrap`,
        children: (0, A.jsxs)(`table`, {
          className: `table`,
          children: [(0, A.jsx)(`thead`, {
            children: (0, A.jsxs)(`tr`, {
              children: [(0, A.jsx)(`th`, {
                children: `Chat Composer variable`
              }), (0, A.jsx)(`th`, {
                children: `Used for`
              })]
            })
          }), (0, A.jsx)(`tbody`, {
            children: _a.map(([e, t]) => (0, A.jsxs)(`tr`, {
              children: [(0, A.jsx)(`td`, {
                children: (0, A.jsx)(`code`, {
                  className: `token`,
                  children: e
                })
              }), (0, A.jsx)(`td`, {
                children: t
              })]
            }, e))
          })]
        })
      }), (0, A.jsx)(`p`, {
        className: `doc__p`,
        children: `The full list sits at the top of the styles inside the component file.`
      })]
    }), (0, A.jsxs)(M, {
      id: `brand`,
      title: `Bring your own brand`,
      children: [(0, A.jsx)(`p`, {
        className: `doc__p`,
        children: `Override the variables in your global CSS. Put one class in front of the component class, so your values win no matter which stylesheet loads first:`
      }), (0, A.jsx)(qi, {
        filename: `globals.css`,
        code: `body .ui-chat-composer {
  --ui-cc-ink: #1e1b4b;
  --ui-cc-alert: #4f46e5;
  --ui-cc-alert-wash: rgba(79, 70, 229, 0.1);
}`
      })]
    }), (0, A.jsxs)(M, {
      id: `dark-mode`,
      title: `Dark mode`,
      children: [(0, A.jsx)(`p`, {
        className: `doc__p`,
        children: `Components ship in light colors and don't switch on their own. Set the variables under the selector your app uses for dark mode:`
      }), (0, A.jsx)(qi, {
        filename: `globals.css`,
        code: `.dark .ui-chat-composer {
  --ui-cc-card: #19191b;
  --ui-cc-tray: #232326;
  --ui-cc-line: #2e2e31;
  --ui-cc-ink: #ededed;
  --ui-cc-placeholder: #5c5c60;
}`
      })]
    })]
  });
}
function ya() {
  return (0, A.jsxs)(A.Fragment, {
    children: [(0, A.jsx)(M, {
      id: `principles`,
      title: `Principles`,
      children: (0, A.jsxs)(`ul`, {
        className: `doc__list`,
        children: [(0, A.jsx)(`li`, {
          children: `Native elements first – buttons are buttons, inputs are inputs, so focus and keyboard work out of the box.`
        }), (0, A.jsx)(`li`, {
          children: `Visible focus rings for keyboard users only, via :focus-visible.`
        }), (0, A.jsx)(`li`, {
          children: `Every control has an accessible name; icon-only buttons ship with an aria-label.`
        }), (0, A.jsx)(`li`, {
          children: `Status changes, like a finished loading state, are announced politely with aria-live.`
        })]
      })
    }), (0, A.jsx)(M, {
      id: `keyboard`,
      title: `Keyboard`,
      children: (0, A.jsx)(`p`, {
        className: `doc__p`,
        children: `Each component page lists its keyboard interactions. As a rule, Tab moves focus, Enter and Space activate, and Escape closes or clears.`
      })
    }), (0, A.jsx)(M, {
      id: `reduced-motion`,
      title: `Reduced motion`,
      children: (0, A.jsxs)(`p`, {
        className: `doc__p`,
        children: [`All motion respects `, (0, A.jsx)(`code`, {
          className: `token`,
          children: `prefers-reduced-motion`
        }), `. Transitions become instant and looping animations stop, without losing any state change.`]
      })
    })]
  });
}
var Sa = [{
  slug: `introduction`,
  title: `Introduction`,
  description: `What ${k.name} is, how it is organized and how to read a component page.`,
  Content: ha
}, {
  slug: `installation`,
  title: `Installation`,
  description: `Install complete component source packages with the shadcn CLI.`,
  Content: ga
}, {
  slug: `theming`,
  title: `Theming`,
  description: `Change a component's colors with CSS variables, including dark mode.`,
  Content: va
}, {
  slug: `accessibility`,
  title: `Accessibility`,
  description: `Keyboard support, focus handling and reduced motion.`,
  Content: ya
}, {
  slug: `ai`,
  title: `Using with AI`,
  description: `MCP server, llms.txt and prompts – let your coding assistant find and add components.`,
  Content: ba
}];
var Ta = e => `/assets/previews/${e}.webp`,
  Ea = e => {
    e.currentTarget.style.visibility = `hidden`;
  };
function Da({
  onNavigate: e
}) {
  let [t, n] = (0, m.useState)(``),
    [r, i] = (0, m.useState)(0),
    [a, o] = (0, m.useState)(!1),
    s = (0, m.useRef)(null),
    c = (0, m.useRef)(null),
    [l, u] = (0, m.useState)(null),
    d = (0, m.useMemo)(() => {
      let e = t.trim().toLowerCase();
      return e ? di.filter(t => `${t.name} ${t.description} ${t.category}`.toLowerCase().includes(e)).slice(0, 8) : [];
    }, [t]);
  (0, m.useEffect)(() => i(0), [t]), (0, m.useLayoutEffect)(() => {
    let e = c.current?.children[r],
      t = c.current?.closest(`.sidebar`)?.getBoundingClientRect();
    if (!a || !e || !t || !d.length) return u(null);
    let n = e.getBoundingClientRect();
    u({
      left: t.right + 12,
      top: Math.max(12, Math.min(n.top - 8, window.innerHeight - 290))
    });
  }, [r, d, a]), (0, m.useEffect)(() => {
    let e = e => {
      (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === `k` && (e.preventDefault(), s.current?.focus(), s.current?.select());
    };
    return window.addEventListener(`keydown`, e), () => window.removeEventListener(`keydown`, e);
  }, []);
  let f = t => {
    aa(P(t)), n(``), s.current?.blur(), e();
  };
  return (0, A.jsxs)(`div`, {
    className: `sidebar-search`,
    children: [(0, A.jsxs)(`label`, {
      className: `sidebar-search__field`,
      children: [(0, A.jsx)(j, {
        icon: Ri,
        size: 14
      }), (0, A.jsx)(`input`, {
        ref: s,
        value: t,
        onChange: e => n(e.target.value),
        onFocus: () => o(!0),
        onBlur: () => o(!1),
        onKeyDown: e => {
          e.key === `ArrowDown` ? (e.preventDefault(), i(e => Math.min(e + 1, d.length - 1))) : e.key === `ArrowUp` ? (e.preventDefault(), i(e => Math.max(e - 1, 0))) : e.key === `Enter` && d[r] ? f(d[r]) : e.key === `Escape` && (n(``), s.current?.blur());
        },
        placeholder: `Search…`,
        "aria-label": `Search components`,
        role: `combobox`,
        "aria-expanded": a && d.length > 0,
        "aria-controls": `sidebar-search-results`
      }), !t && (0, A.jsxs)(`span`, {
        className: `sidebar-search__keys`,
        "aria-hidden": !0,
        children: [(0, A.jsx)(`kbd`, {
          children: `⌘`
        }), (0, A.jsx)(`kbd`, {
          children: `K`
        })]
      })]
    }), a && t.trim() && (0, A.jsx)(`div`, {
      ref: c,
      className: `sidebar-search__results`,
      id: `sidebar-search-results`,
      role: `listbox`,
      children: d.length ? d.map((e, t) => (0, A.jsxs)(`button`, {
        role: `option`,
        "aria-selected": t === r,
        className: `sidebar-search__result`,
        onMouseEnter: () => i(t),
        onMouseDown: e => e.preventDefault(),
        onClick: () => f(e),
        children: [(0, A.jsx)(`span`, {
          className: `sidebar-search__thumb`,
          children: (0, A.jsx)(`img`, {
            src: Ta(e.slug),
            alt: ``,
            loading: `lazy`,
            onError: Ea
          })
        }), (0, A.jsxs)(`span`, {
          className: `sidebar-search__text`,
          children: [e.name, (0, A.jsx)(`small`, {
            children: e.category
          })]
        }), e.pro && (0, A.jsx)(Qi, {
          className: `nav-link__pro`
        })]
      }, e.slug)) : (0, A.jsx)(`p`, {
        className: `sidebar-search__empty`,
        children: `No components found`
      })
    }), l && d[r] && (0, wa.createPortal)((0, A.jsxs)(`div`, {
      className: `search-peek`,
      style: {
        left: l.left,
        top: l.top
      },
      "aria-hidden": !0,
      children: [(0, A.jsx)(`img`, {
        src: Ta(d[r].slug),
        alt: ``,
        onError: Ea
      }, d[r].slug), (0, A.jsxs)(`p`, {
        children: [(0, A.jsx)(`b`, {
          children: d[r].name
        }), d[r].description]
      })]
    }), document.body)]
  });
}
var Oa = `plico-ui-style`,
  ka = new Set();
function Aa() {
  if (typeof window > `u`) return `classic`;
  let e = new URLSearchParams(window.location.search).get(`style`);
  if (e === `clean` || e === `classic`) {
    try {
      localStorage.setItem(Oa, e);
    } catch {}
    return e;
  }
  try {
    return localStorage.getItem(Oa) === `clean` ? `clean` : `classic`;
  } catch {
    return `classic`;
  }
}
var ja = Aa();
function Ma(e) {
  if (e === ja) return;
  ja = e;
  try {
    localStorage.setItem(Oa, e);
  } catch {}
  let t = new URL(window.location.href);
  e === `clean` ? t.searchParams.set(`style`, `clean`) : t.searchParams.delete(`style`), window.history.replaceState(window.history.state, ``, t), ka.forEach(e => e());
}
function Na() {
  let [e, t] = (0, m.useState)(ja);
  return (0, m.useEffect)(() => {
    let e = () => t(ja);
    return ka.add(e), e(), () => {
      ka.delete(e);
    };
  }, []), e;
}
function Pa(e, t) {
  if (t !== `clean` || !e.clean) return e;
  let {
    Preview: n,
    loadSource: r,
    loadDocs: i
  } = e.clean;
  return {
    ...e,
    Preview: n,
    loadSource: r,
    loadDocs: i ?? e.loadDocs,
    sourceSlug: `${e.slug}-clean`
  };
}
var Fa = () => (0, A.jsxs)(`svg`, {
    width: `16`,
    height: `14`,
    viewBox: `0 0 16 14`,
    "aria-hidden": `true`,
    children: [(0, A.jsx)(`rect`, {
      x: `0.5`,
      y: `0.5`,
      width: `15`,
      height: `13`,
      rx: `3.5`,
      fill: `currentColor`,
      opacity: `0.18`
    }), (0, A.jsx)(`rect`, {
      x: `2.5`,
      y: `2.5`,
      width: `11`,
      height: `6.5`,
      rx: `2`,
      fill: `var(--switch-card, #fff)`,
      stroke: `currentColor`,
      strokeOpacity: `0.35`
    }), (0, A.jsx)(`rect`, {
      x: `9`,
      y: `10.4`,
      width: `4.5`,
      height: `1.6`,
      rx: `0.8`,
      fill: `currentColor`,
      opacity: `0.55`
    })]
  }),
  Ia = () => (0, A.jsxs)(`svg`, {
    width: `16`,
    height: `14`,
    viewBox: `0 0 16 14`,
    "aria-hidden": `true`,
    children: [(0, A.jsx)(`rect`, {
      x: `1.5`,
      y: `1.5`,
      width: `13`,
      height: `11`,
      rx: `2.5`,
      fill: `var(--switch-card, #fff)`,
      stroke: `currentColor`,
      strokeOpacity: `0.55`
    }), (0, A.jsx)(`path`, {
      d: `M4 5h6M4 7.6h4`,
      stroke: `currentColor`,
      strokeOpacity: `0.55`,
      strokeLinecap: `round`
    })]
  });
function La({
  className: e,
  compact: t,
  wide: n,
  iconsOnly: r
}) {
  let i = Na(),
    a = (e, t, n, a) => (0, A.jsxs)(`button`, {
      type: `button`,
      role: `radio`,
      "aria-checked": i === e,
      onClick: () => Ma(e),
      title: `${t} style`,
      "aria-label": r ? `${t} style` : void 0,
      children: [n, !r && t, a && (0, A.jsx)(`span`, {
        className: `style-switch__new`,
        children: `New`
      })]
    });
  return (0, A.jsxs)(`div`, {
    className: [`segmented style-switch`, t && `style-switch--compact`, n && `style-switch--wide`, r && `style-switch--icons`, e].filter(Boolean).join(` `),
    role: `radiogroup`,
    "aria-label": `Component style`,
    children: [a(`classic`, `Classic`, (0, A.jsx)(Fa, {})), a(`clean`, `Clean`, (0, A.jsx)(Ia, {}), !0)]
  });
}
function Ra() {
  let e = Na();
  return (0, A.jsx)(`div`, {
    className: `stage__theme stage__style`,
    role: `radiogroup`,
    "aria-label": `Component style`,
    children: [[`classic`, `Classic`, (0, A.jsx)(Fa, {}, `c`)], [`clean`, `Clean`, (0, A.jsx)(Ia, {}, `n`)]].map(([t, n, r]) => (0, A.jsx)(`button`, {
      type: `button`,
      role: `radio`,
      "aria-checked": e === t,
      "aria-label": `${n} style`,
      title: `${n} style`,
      className: `stage__theme-btn`,
      onClick: () => Ma(t),
      children: r
    }, t))
  });
}
function za({
  open: e,
  path: t,
  onClose: n
}) {
  let [r, i] = (0, m.useState)(() => new Set()),
    a = e => !r.has(e),
    o = e => i(t => {
      let n = new Set(t);
      return n.has(e) ? n.delete(e) : n.add(e), n;
    }),
    s = e => t === e ? `page` : void 0,
    c = e => (0, A.jsx)(`div`, {
      className: `tree__items tree__items--flat`,
      children: e.map(e => {
        let t = P(e);
        return (0, A.jsxs)(F, {
          to: t,
          className: `nav-link`,
          "aria-current": s(t),
          onClick: n,
          children: [e.name, e.pro && (0, A.jsx)(Qi, {
            className: `nav-link__pro`
          })]
        }, e.slug);
      })
    }),
    l = (e, t, r, i, s, c) => {
      let l = a(e);
      return (0, A.jsxs)(`div`, {
        className: `section`,
        children: [(0, A.jsxs)(`div`, {
          className: `section__head`,
          children: [(0, A.jsxs)(F, {
            to: i,
            className: `section__label`,
            onClick: n,
            children: [(0, A.jsx)(j, {
              icon: t
            }), r]
          }), s !== null && (0, A.jsx)(`span`, {
            className: `section__count`,
            children: s
          }), (0, A.jsx)(`button`, {
            className: `section__toggle`,
            "aria-expanded": l,
            "aria-label": `${l ? `Collapse` : `Expand`} ${r}`,
            onClick: () => o(e),
            children: (0, A.jsx)(j, {
              icon: l ? Ci : wi,
              size: 12
            })
          })]
        }), l && (0, A.jsx)(`div`, {
          className: `section__body`,
          children: c
        })]
      });
    };
  return (0, A.jsxs)(`aside`, {
    className: `sidebar`,
    "data-open": e,
    children: [(0, A.jsx)(`div`, {
      className: `sidebar__head`,
      children: (0, A.jsxs)(F, {
        to: `/`,
        className: `logo`,
        "aria-label": `${k.name} home`,
        onClick: n,
        children: [(0, A.jsx)(Ca, {}), (0, A.jsx)(`span`, {
          className: `logo__name`,
          children: k.name
        })]
      })
    }), (0, A.jsxs)(`div`, {
      className: `sidebar__scroll`,
      children: [(0, A.jsx)(Da, {
        onNavigate: n
      }), (0, A.jsxs)(`nav`, {
        className: `sidebar__nav`,
        "aria-label": `Primary`,
        children: [(0, A.jsx)(F, {
          to: `/components`,
          className: `nav-link`,
          "aria-current": /^\/(components|screens|blocks|illustrations|motion)\/?$/.test(t) ? `page` : void 0,
          onClick: n,
          children: `Library`
        }), (0, A.jsx)(F, {
          to: `/docs`,
          className: `nav-link`,
          "aria-current": t.startsWith(`/docs`) ? `page` : void 0,
          onClick: n,
          children: `Docs`
        }), t.startsWith(`/docs`) && (0, A.jsx)(`div`, {
          className: `tree__items tree__items--flat`,
          children: Sa.map((e, r) => {
            let i = `/docs/${e.slug}`;
            return (0, A.jsx)(F, {
              to: i,
              className: `nav-link`,
              "aria-current": t === i || t === `/docs` && r === 0 ? `page` : void 0,
              onClick: n,
              children: e.title
            }, e.slug);
          })
        }), null]
      }), (0, A.jsxs)(`nav`, {
        className: `sections`,
        "aria-label": `Library`,
        children: [(0, A.jsx)(`div`, {
          className: `sidebar__style`,
          children: (0, A.jsx)(La, {
            compact: !0,
            wide: !0
          })
        }), l(`components`, Oi, `Components`, `/components`, oi.length, c(oi)), li.length > 0 && l(`screens`, Ei, `Screens`, `/screens`, li.length, c(li)), l(`blocks`, Ni, `Blocks`, `/blocks`, si.length, c(si)), l(`illustrations`, Mi, `Illustrations`, `/illustrations`, ci.length, c(ci)), ui.length > 0 && l(`motion`, Li, `Motion`, `/motion`, ui.length, c(ui))]
      })]
    })]
  });
}
var yo = e => e.added ? Date.parse(e.added) : NaN;
function bo(e, t = Date.now()) {
  let n = yo(e);
  return t - n >= 0 && t - n <= 864e5;
}
var xo = [],
  So = !1,
  Co = e => {
    typeof window.requestIdleCallback == `function` ? window.requestIdleCallback(e, {
      timeout: 120
    }) : setTimeout(e, 16);
  };
function wo() {
  let e = xo.shift();
  if (!e) {
    So = !1;
    return;
  }
  So = !0, Co(() => {
    (0, m.startTransition)(e), wo();
  });
}
function To(e) {
  xo.push(e), So || wo();
}
function Eo({
  Preview: e,
  eager: t = !1
}) {
  let n = (0, m.useRef)(null),
    r = (0, m.useRef)(null),
    [i, a] = (0, m.useState)(t);
  return (0, m.useEffect)(() => {
    if (!(`IntersectionObserver` in window)) return a(!0);
    if (!i) {
      let e = n.current;
      if (!e) return;
      r.current = e.parentElement;
      let t = new IntersectionObserver(e => {
        e.some(e => e.isIntersecting) && (t.disconnect(), To(() => a(!0)));
      }, {
        rootMargin: `400px 0px`
      });
      return t.observe(e), () => t.disconnect();
    }
    let e = r.current;
    if (!e || t) return;
    let o = new IntersectionObserver(e => e.every(e => !e.isIntersecting) && a(!1), {
      rootMargin: `1800px 0px`
    });
    return o.observe(e), () => o.disconnect();
  }, [i, t]), i ? (0, A.jsx)(m.Suspense, {
    fallback: (0, A.jsx)(`div`, {
      className: `lazy-preview`,
      "aria-hidden": !0
    }),
    children: (0, A.jsx)(e, {})
  }) : (0, A.jsx)(`div`, {
    ref: n,
    className: `lazy-preview`,
    "aria-hidden": !0
  });
}
function Do({
  children: e,
  minHeight: t
}) {
  let n = (0, m.useRef)(null),
    [r, i] = (0, m.useState)(!1);
  return (0, m.useEffect)(() => {
    let e = n.current;
    if (!e || !(`IntersectionObserver` in window)) return i(!0);
    let t = new IntersectionObserver(e => {
      e.some(e => e.isIntersecting) && (t.disconnect(), To(() => i(!0)));
    }, {
      rootMargin: `600px 0px`
    });
    return t.observe(e), () => t.disconnect();
  }, []), r ? (0, A.jsx)(m.Suspense, {
    fallback: (0, A.jsx)(`div`, {
      style: {
        minHeight: t
      },
      "aria-hidden": !0
    }),
    children: e
  }) : (0, A.jsx)(`div`, {
    ref: n,
    style: {
      minHeight: t
    },
    "aria-hidden": !0
  });
}
function qo({
  entry: e,
  look: t
}) {
  let n = Na(),
    r = t ?? n,
    i = () => {
      t && t !== n && Ma(t);
    },
    a = Pa(e, r),
    o = a === e ? `classic` : `clean`,
    {
      Preview: s
    } = a,
    c = to();
  return (0, A.jsxs)(`article`, {
    className: `card`,
    id: a.slug,
    onClick: e => {
      e.target.closest(`a, button, input, label, select, textarea, [role='switch']`) || window.getSelection()?.toString() || (i(), aa(P(a)));
    },
    children: [(0, A.jsxs)(`div`, {
      className: `card__stage`,
      children: [(0, A.jsx)(`div`, {
        className: `card__preview`,
        "data-look": o,
        children: (0, A.jsx)(Eo, {
          Preview: s
        }),
        inert: true
      }, o), (0, A.jsx)(`span`, {
        className: `card__tag`,
        children: a.category
      }), (e.clean || a.pro) && (0, A.jsxs)(`div`, {
        className: `card__badges`,
        children: [e.clean && (0, A.jsx)(`span`, {
          className: `card__styles`,
          title: `Comes in Classic and Clean`,
          children: `2 styles`
        }), a.pro && (0, A.jsx)(Qi, {
          className: `card__pro`
        })]
      })]
    }), (0, A.jsxs)(`div`, {
      className: `card__footer`,
      children: [(0, A.jsxs)(F, {
        to: P(a),
        className: `card__info`,
        onClick: i,
        children: [(0, A.jsxs)(`h3`, {
          className: `card__title`,
          children: [a.name, bo(a) && (0, A.jsx)(`span`, {
            className: `card__new`,
            children: `New`
          })]
        }), (0, A.jsx)(`p`, {
          className: `card__desc`,
          children: a.description
        })]
      }), (0, A.jsx)(`div`, {
        className: `card__actions`,
        children: a.pro && c?.plan !== `pro` ? (0, A.jsx)(`button`, {
          className: `icon-btn icon-btn--card`,
          "aria-label": `${a.name} is part of Pro – see pricing`,
          title: `Part of Pro – get Pro to copy`,
          onClick: () => {
            co(`Get Pro`, {
              from: `card copy`,
              item: a.slug
            }), Ho({
              entry: a,
              from: `card copy`
            });
          },
          children: (0, A.jsx)(j, {
            icon: Di,
            size: 14
          })
        }) : (0, A.jsx)(Vi, {
          value: () => ro(a),
          className: `icon-btn--card`,
          onCopied: () => vo(a.slug, `copy_code`)
        })
      })]
    })]
  });
}
var I = (0, m.createContext)(!1),
  L = 1440,
  R = 900;
function Jo({
  children: e
}) {
  let t = (0, m.useContext)(I),
    n = (0, m.useRef)(null),
    [r, i] = (0, m.useState)(0);
  return (0, m.useLayoutEffect)(() => {
    let e = n.current;
    if (!e || t) return;
    let r = () => i(e.clientWidth / L);
    r();
    let a = new ResizeObserver(r);
    return a.observe(e), () => a.disconnect();
  }, [t]), t ? (0, A.jsx)(`div`, {
    className: `screen-full`,
    children: e
  }) : (0, A.jsx)(`div`, {
    ref: n,
    className: `screen-stage`,
    style: {
      aspectRatio: `${L} / ${R}`
    },
    children: r > 0 && (0, A.jsx)(`div`, {
      className: `screen-stage__canvas`,
      style: {
        width: L,
        height: R,
        transform: `scale(${r})`
      },
      children: e
    })
  });
}
var Yo = [`Q3 Campaign`, `Brand assets`, `Hiring`, `Research`],
  Xo = {
    "New chat": `assistant-home`,
    Folders: `files`,
    Integrations: `integrations`,
    Chat: `agent-chat`,
    Companies: `crm`,
    Revenue: `analytics`,
    Analytics: `analytics`,
    Runs: `agent-run`,
    Evals: `evals`,
    Settings: `settings-billing`
  };
function Zo(e) {
  let t = /\/full\/?$/.test(window.location.pathname),
    n = Yo.includes(e),
    r = Xo[e] ?? (n ? `folder` : null);
  if (!r) return;
  let i = n ? `?folder=${encodeURIComponent(e)}` : ``;
  aa(`/screens/${r}${t ? `/full` : ``}${i}`), window.dispatchEvent(new Event(`screen-query`));
}
function Qo() {
  let e = () => new URLSearchParams(window.location.search).get(`folder`) ?? void 0,
    [t, n] = (0, m.useState)(e);
  return (0, m.useEffect)(() => {
    let t = () => n(e());
    return window.addEventListener(`screen-query`, t), window.addEventListener(`popstate`, t), () => {
      window.removeEventListener(`screen-query`, t), window.removeEventListener(`popstate`, t);
    };
  }, []), t;
}
var $o = [{
  title: `Site`,
  links: [{
    label: `Home`,
    to: `/`
  }, {
    label: `Components`,
    to: `/components`
  }, {
    label: `Screens`,
    to: `/screens`
  }, {
    label: `Blocks`,
    to: `/blocks`
  }, {
    label: `Illustrations`,
    to: `/illustrations`
  }, {
    label: `Motion`,
    to: `/motion`
  }, {
    label: `Pricing`,
    to: `/pricing`
  }]
}, {
  title: `Docs`,
  links: [{
    label: `Introduction`,
    to: `/docs`
  }, {
    label: `Installation`,
    to: `/docs/installation`
  }, {
    label: `Accessibility`,
    to: `/docs/accessibility`
  }]
}, {
  title: `Legal`,
  links: [{
    label: `Account`,
    to: `/account`
  }, {
    label: `License`,
    to: `/license`
  }, {
    label: `Terms`,
    to: `/terms`
  }, {
    label: `Privacy`,
    to: `/privacy`
  }, {
    label: `Refund`,
    to: `/refund`
  }, {
    label: `Imprint`,
    to: `/imprint`
  }, {
    label: `Contact`,
    to: `/contact`
  }]
}];
function es() {
  return (0, A.jsxs)(`footer`, {
    className: `footer`,
    children: [(0, A.jsxs)(`div`, {
      className: `footer__top`,
      children: [(0, A.jsxs)(`div`, {
        className: `footer__brand`,
        children: [(0, A.jsxs)(F, {
          to: `/`,
          className: `logo footer__logo`,
          children: [(0, A.jsx)(Ca, {}), (0, A.jsx)(`span`, {
            className: `logo__name`,
            children: k.name
          })]
        }), (0, A.jsx)(`p`, {
          children: k.tagline
        })]
      }), (0, A.jsx)(`nav`, {
        className: `footer__cols`,
        "aria-label": `Footer`,
        children: $o.map(e => (0, A.jsxs)(`div`, {
          className: `footer__col`,
          children: [(0, A.jsx)(`span`, {
            className: `footer__heading`,
            children: e.title
          }), e.links.map(e => e.to ? (0, A.jsx)(F, {
            to: e.to,
            children: e.label
          }, e.label) : (0, A.jsx)(`a`, {
            href: e.href,
            children: e.label
          }, e.label))]
        }, e.title))
      })]
    }), (0, A.jsxs)(`p`, {
      className: `footer__credit`,
      children: [`Created by`, ` `, (0, A.jsx)(`a`, {
        href: k.author.url,
        target: `_blank`,
        rel: `noreferrer`,
        children: k.author.name
      })]
    })]
  });
}
var z = () => {
    try {
      let e = localStorage.getItem(`theme`);
      return e === `light` || e === `dark` ? e : `system`;
    } catch {
      return `system`;
    }
  },
  ts = new Set(),
  ns = null;
function rs() {
  let [e, t] = (0, m.useState)(() => ns ??= z());
  return (0, m.useEffect)(() => (ts.add(t), () => {
    ts.delete(t);
  }), []), (0, m.useEffect)(() => {
    let t = document.documentElement;
    try {
      e === `system` ? (delete t.dataset.theme, localStorage.removeItem(`theme`)) : (t.dataset.theme = e, localStorage.setItem(`theme`, e));
    } catch {}
  }, [e]), (0, m.useEffect)(() => {
    let e = document.documentElement,
      t = matchMedia(`(prefers-color-scheme: dark)`),
      n = () => {
        let n = e.dataset.theme;
        e.classList.toggle(`dark`, n ? n === `dark` : t.matches);
      };
    return n(), t.addEventListener(`change`, n), () => t.removeEventListener(`change`, n);
  }, [e]), {
    theme: e,
    setTheme: e => {
      ns = e, ts.forEach(t => t(e));
    }
  };
}
var is = [{
  value: `light`,
  label: `Light theme`,
  icon: zi
}, {
  value: `dark`,
  label: `Dark theme`,
  icon: Ii
}];
function as() {
  let {
      theme: e,
      setTheme: t
    } = rs(),
    n = e === `system` ? window.matchMedia(`(prefers-color-scheme: dark)`).matches ? `dark` : `light` : e;
  return (0, A.jsx)(`div`, {
    className: `theme-switch theme-switch--top`,
    role: `radiogroup`,
    "aria-label": `Theme`,
    children: is.map(({
      value: e,
      label: r,
      icon: i
    }) => (0, A.jsx)(`button`, {
      role: `radio`,
      "aria-checked": n === e,
      "aria-label": r,
      className: `icon-btn`,
      onClick: () => t(e),
      children: (0, A.jsx)(j, {
        icon: i,
        size: 14
      })
    }, e))
  });
}
function B({
  tabs: e,
  after: t
}) {
  let n = (0, m.useRef)(null),
    [r, i] = (0, m.useState)(e[0]?.id);
  (0, m.useEffect)(() => {
    let t = 0,
      r = () => {
        t = 0;
        let r = n.current;
        if (!r) return;
        let a = r.getBoundingClientRect().bottom,
          o = e[0]?.id;
        for (let t of e) {
          let e = document.querySelector(`#${t.id} .library__title`) ?? document.getElementById(t.id);
          e && e.getBoundingClientRect().top <= a + 48 && (o = t.id);
        }
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4 && (o = e[e.length - 1]?.id), i(o);
      },
      a = () => {
        t ||= requestAnimationFrame(r);
      };
    return r(), window.addEventListener(`scroll`, a, {
      passive: !0
    }), window.addEventListener(`resize`, a), () => {
      window.removeEventListener(`scroll`, a), window.removeEventListener(`resize`, a), cancelAnimationFrame(t);
    };
  }, [e]);
  let a = (0, m.useRef)(null);
  (0, m.useLayoutEffect)(() => {
    let e = () => {
      let e = n.current?.querySelector(`[data-id="${r}"]`);
      e && a.current && (a.current.style.transform = `translateX(${e.offsetLeft}px)`, a.current.style.width = `${e.offsetWidth}px`);
    };
    e();
    let t = requestAnimationFrame(() => a.current?.setAttribute(`data-ready`, ``));
    return window.addEventListener(`resize`, e), document.fonts?.ready.then(e), () => {
      cancelAnimationFrame(t), window.removeEventListener(`resize`, e);
    };
  }, [r]);
  let o = e => {
    let t = n.current;
    t && window.scrollY > 0 && t.getBoundingClientRect().top <= parseFloat(getComputedStyle(t).top) + .5 && na(), i(e);
  };
  return (0, m.useEffect)(() => {
    let e = n.current?.querySelector(`.lib-tabs__list`),
      t = e?.querySelector(`[data-id="${r}"]`);
    !e || !t || e.scrollWidth <= e.clientWidth || e.scrollTo({
      left: t.offsetLeft - (e.clientWidth - t.offsetWidth) / 2,
      behavior: `smooth`
    });
  }, [r]), (0, A.jsx)(`nav`, {
    ref: n,
    className: `lib-tabs`,
    "aria-label": `Library sections`,
    children: (0, A.jsx)(`div`, {
      className: `lib-tabs__row`,
      children: (0, A.jsxs)(`div`, {
        className: `lib-tabs__list`,
        children: [e.map(e => (0, A.jsxs)(m.Fragment, {
          children: [(0, A.jsxs)(F, {
            to: `/${e.id}`,
            "data-id": e.id,
            className: `lib-tabs__tab`,
            "aria-current": r === e.id ? `true` : void 0,
            onClick: () => o(e.id),
            children: [e.label, (0, A.jsx)(`span`, {
              children: e.count
            })]
          }), t?.id === e.id && (0, A.jsx)(`div`, {
            className: `lib-tabs__after`,
            children: t.node
          })]
        }, e.id)), (0, A.jsx)(`span`, {
          ref: a,
          className: `lib-tabs__ink`,
          "aria-hidden": `true`
        })]
      })
    })
  });
}
function ds({
  compact: e = !1,
  label: t = `Source code`
}) {
  return (0, A.jsxs)(`div`, {
    className: `locked`,
    "data-compact": e || void 0,
    children: [(0, A.jsx)(`div`, {
      className: `locked__lines`,
      "aria-hidden": !0,
      children: (e ? [62, 48, 70] : [38, 64, 52, 80, 44, 70, 58, 34, 66, 48]).map((e, t) => (0, A.jsx)(`span`, {
        style: {
          width: `${e}%`,
          marginLeft: t % 3 == 1 ? 24 : t % 3 == 2 ? 48 : 0
        }
      }, t))
    }), (0, A.jsxs)(`div`, {
      className: `locked__body`,
      children: [(0, A.jsx)(`span`, {
        className: `locked__icon`,
        children: (0, A.jsx)(j, {
          icon: Pi,
          size: e ? 14 : 16
        })
      }), (0, A.jsxs)(`div`, {
        className: `locked__text`,
        children: [(0, A.jsxs)(`strong`, {
          children: [t, ` is part of Pro`]
        }), !e && (0, A.jsx)(`span`, {
          children: `Get Pro to copy the code, install it with the CLI and use it in your projects.`
        })]
      }), (0, A.jsx)(us, {
        label: e ? `Get Pro` : `Unlock with Pro`
      })]
    })]
  });
}
var ys = [],
  bs = new Set(),
  xs = [],
  Ss = 0,
  Cs = e => {
    ys = e, bs.forEach(e => e());
  },
  ws = e => (bs.add(e), () => {
    bs.delete(e);
  }),
  Ts = () => ys,
  Es = () => xs;
function Ds(e, t, n = {}, r = !1) {
  let {
      id: i,
      ...a
    } = n,
    o = i === void 0 ? void 0 : ys.find(e => e.id === i && !e.removing);
  if (o) return Cs(ys.map(n => n === o ? {
    ...n,
    ...a,
    type: e,
    title: t,
    version: n.version + 1
  } : n)), o.id;
  let s = i ?? `toast-${++Ss}`;
  return r || Cs([...ys.filter(e => e.id !== s), {
    ...a,
    id: s,
    type: e,
    title: t,
    version: 0
  }]), s;
}
var Os = 420;
function ks(e) {
  let t = ys.filter(t => !t.removing && (e === void 0 || t.id === e));
  t.length && (Cs(ys.map(e => t.includes(e) ? {
    ...e,
    removing: !0
  } : e)), t.forEach(e => e.onDismiss?.(e.id)), window.setTimeout(() => Cs(ys.filter(e => !(e.removing && t.some(t => t.id === e.id)))), Os));
}
var As = e => typeof e == `object` && !!e && !(0, m.isValidElement)(e) && !Array.isArray(e) && `title` in e,
  js = e => As(e) ? e : {
    title: e,
    description: void 0
  };
function Ms(e, t, n = {}) {
  let r = typeof e == `function` ? e() : e,
    i = js(t.loading),
    a = Ds(`loading`, i.title, {
      ...n,
      description: i.description
    }),
    o = (e, t) => {
      let r = js(t);
      Ds(e, r.title, {
        ...n,
        id: a,
        description: r.description
      }, !0);
    };
  return r.then(e => o(`success`, typeof t.success == `function` ? t.success(e) : t.success), e => o(`error`, typeof t.error == `function` ? t.error(e) : t.error)), r;
}
var Ns = Object.assign((e, t) => Ds(`default`, e, t), {
  success: (e, t) => Ds(`success`, e, t),
  error: (e, t) => Ds(`error`, e, t),
  info: (e, t) => Ds(`info`, e, t),
  loading: (e, t) => Ds(`loading`, e, t),
  promise: Ms,
  dismiss: ks
});
function Ps() {
  return (0, A.jsxs)(`svg`, {
    viewBox: `0 0 24 24`,
    className: `ui-ts__status`,
    "aria-hidden": `true`,
    children: [(0, A.jsx)(`g`, {
      className: `ui-ts__spin`,
      children: (0, A.jsx)(`circle`, {
        className: `ui-ts__ring`,
        cx: `12`,
        cy: `12`,
        r: `9.25`,
        pathLength: 1
      })
    }), (0, A.jsx)(`path`, {
      className: `ui-ts__mark ui-ts__check`,
      d: `M8.3 12.4l2.5 2.5 4.9-5.3`,
      pathLength: 1
    }), (0, A.jsx)(`path`, {
      className: `ui-ts__mark ui-ts__x1`,
      d: `M9.5 9.5l5 5`,
      pathLength: 1
    }), (0, A.jsx)(`path`, {
      className: `ui-ts__mark ui-ts__x2`,
      d: `M14.5 9.5l-5 5`,
      pathLength: 1
    }), (0, A.jsx)(`path`, {
      className: `ui-ts__info`,
      d: `M12 11.2v4.6M12 8.2h.01`
    })]
  });
}
var Fs = () => (0, A.jsx)(`svg`, {
    viewBox: `0 0 24 24`,
    className: `ui-ts__glyph`,
    "aria-hidden": `true`,
    children: (0, A.jsx)(`path`, {
      d: `M7.5 7.5l9 9M16.5 7.5l-9 9`
    })
  }),
  Is = e => String(e.id);
function Ls({
  t: e,
  layout: t,
  edge: n,
  paused: r,
  defaultDuration: i,
  hairline: a,
  closeButton: o,
  onHeight: s
}) {
  let [c, l] = (0, m.useState)(!1),
    [u, d] = (0, m.useState)(!1),
    [f, p] = (0, m.useState)(null),
    h = (0, m.useRef)(null),
    g = (0, m.useRef)(null),
    _ = (0, m.useRef)({
      title: e.title,
      description: e.description,
      version: e.version
    }),
    v = (0, m.useRef)(0),
    y = (0, m.useRef)({
      version: -1,
      left: 0
    }),
    b = (0, m.useRef)(null),
    x = (0, m.useRef)(!1),
    S = !!e.removing;
  (0, m.useEffect)(() => {
    let e = requestAnimationFrame(() => requestAnimationFrame(() => l(!0)));
    return () => cancelAnimationFrame(e);
  }, []), (0, m.useLayoutEffect)(() => {
    let t = h.current;
    if (!t) return;
    let n = Is(e),
      r = () => s(n, t.offsetHeight);
    r();
    let i = new ResizeObserver(r);
    return i.observe(t), () => i.disconnect();
  }, []), (0, m.useLayoutEffect)(() => {
    let t = _.current;
    t.version !== e.version && (_.current = {
      title: e.title,
      description: e.description,
      version: e.version
    }, (t.title !== e.title || t.description !== e.description) && (p(t), window.clearTimeout(v.current), v.current = window.setTimeout(() => p(null), 320)));
  }, [e.version]), (0, m.useEffect)(() => () => window.clearTimeout(v.current), []);
  let ee = e.duration ?? i,
    te = e.type !== `loading` && Number.isFinite(ee),
    ne = te && !r && !u && !S;
  (0, m.useEffect)(() => {
    if (y.current.version !== e.version && (y.current = {
      version: e.version,
      left: ee
    }), !ne) return;
    let t = e.version,
      n = Date.now(),
      r = window.setTimeout(() => ks(e.id), Math.max(0, y.current.left));
    return () => {
      window.clearTimeout(r), y.current.version === t && (y.current.left -= Date.now() - n);
    };
  }, [ne, e.version, ee, e.id]);
  let re = e => {
      e.button !== 0 || S || e.target.closest(`button, a, input, textarea, select`) || (b.current = {
        pointer: e.pointerId,
        x: e.clientX,
        y: e.clientY,
        axis: null,
        samples: []
      }, x.current = !1);
    },
    C = e => {
      let t = b.current,
        r = g.current;
      if (!t || t.pointer !== e.pointerId || !r) return;
      let i = e.clientX - t.x,
        a = e.clientY - t.y;
      if (!t.axis) {
        if (Math.hypot(i, a) < 6) return;
        t.axis = Math.abs(i) > Math.abs(a) ? `x` : `y`, e.currentTarget.setPointerCapture(e.pointerId), x.current = !0, d(!0), r.style.transition = `none`;
      }
      let o = t.axis === `x` ? i : a,
        s = t.axis === `x` || o * n > 0;
      s || (o = Math.sign(o) * Math.abs(o) ** .7 * .6);
      let c = t.axis === `x` ? r.offsetWidth : r.offsetHeight * 2;
      r.style.transform = t.axis === `x` ? `translateX(${o}px)` : `translateY(${o}px)`, r.style.opacity = s ? String(Math.max(.25, 1 - Math.abs(o) / (c * 1.1))) : ``, t.samples.push({
        v: o,
        at: e.timeStamp
      }), t.samples.length > 6 && t.samples.shift();
    },
    ie = t => {
      let r = b.current,
        i = g.current;
      if (!r || r.pointer !== t.pointerId || (b.current = null, !r.axis || !i)) return;
      d(!1);
      let a = r.samples[r.samples.length - 1] ?? {
          v: 0,
          at: 0
        },
        o = r.samples[0] ?? a,
        s = a.at > o.at ? (a.v - o.v) / (a.at - o.at) : 0,
        c = r.axis === `x` || a.v * n > 0,
        l = Math.abs(s) > .45 && Math.sign(s) === Math.sign(a.v);
      if (t.type === `pointerup` && c && (Math.abs(a.v) > 64 || l)) {
        let t = (r.axis === `x` ? i.offsetWidth : i.offsetHeight) + 48;
        i.style.transition = `transform 300ms cubic-bezier(0.22, 1, 0.36, 1), opacity 240ms ease`, i.style.transform = `${r.axis === `x` ? `translateX` : `translateY`}(${Math.sign(a.v) * t}px)`, i.style.opacity = `0`, ks(e.id);
      } else i.style.transition = ``, i.style.transform = ``, i.style.opacity = ``;
    },
    ae = -n,
    oe = `translateY(${ae * t.y}px) scale(${t.scale})`;
  c || (oe = `translateY(${n * 100}%) scale(${t.scale})`), S && (oe = `translateY(${ae * t.y + n * 10}px) scale(${t.scale * .96})`);
  let se = e.type === `loading` ? (0, A.jsx)(Ps, {}) : e.icon ?? (e.type === "default" ? null : (0, A.jsx)(Ps, {}));
  return (0, A.jsx)(`li`, {
    className: `ui-ts__toast`,
    "data-toast-id": Is(e),
    "data-type": e.type,
    "data-behind": t.behind || void 0,
    "data-removing": S || void 0,
    "data-swiping": u || void 0,
    tabIndex: 0,
    inert: t.hidden || S,
    style: {
      transform: oe,
      opacity: !c || S || t.hidden ? 0 : 1,
      height: t.height ? `${t.height}px` : void 0,
      zIndex: t.z
    },
    onPointerDown: re,
    onPointerMove: C,
    onPointerUp: ie,
    onPointerCancel: ie,
    onClickCapture: e => {
      x.current && (x.current = !1, e.stopPropagation(), e.preventDefault());
    },
    children: (0, A.jsxs)(`div`, {
      ref: g,
      className: `ui-ts__swipe`,
      children: [(0, A.jsxs)(`div`, {
        className: `ui-ts__card`,
        children: [(0, A.jsxs)(`div`, {
          ref: h,
          className: `ui-ts__content`,
          "data-action": e.action ? `` : void 0,
          children: [se && (0, A.jsx)(`span`, {
            className: `ui-ts__icon`,
            "data-type": e.icon && e.type !== `loading` ? `custom` : e.type,
            children: se
          }), (0, A.jsxs)(`div`, {
            className: `ui-ts__text`,
            children: [(0, A.jsxs)(`div`, {
              className: `ui-ts__copy`,
              "data-changed": e.version > 0 || void 0,
              children: [(0, A.jsx)(`div`, {
                className: `ui-ts__title`,
                children: e.title
              }), e.description != null && e.description !== `` && (0, A.jsx)(`div`, {
                className: `ui-ts__desc`,
                children: e.description
              })]
            }, e.version), f && (0, A.jsxs)(`div`, {
              className: `ui-ts__copy ui-ts__ghost`,
              "aria-hidden": `true`,
              children: [(0, A.jsx)(`div`, {
                className: `ui-ts__title`,
                children: f.title
              }), f.description != null && f.description !== `` && (0, A.jsx)(`div`, {
                className: `ui-ts__desc`,
                children: f.description
              })]
            }, `ghost-${f.version}`)]
          }), e.action && (0, A.jsx)(`button`, {
            type: `button`,
            className: `ui-ts__action`,
            onClick: t => {
              e.action.onClick(t), t.defaultPrevented || ks(e.id);
            },
            children: e.action.label
          })]
        }), a && te && (0, A.jsx)(`span`, {
          className: `ui-ts__timer`,
          "aria-hidden": `true`,
          style: {
            animationDuration: `${ee}ms`,
            animationPlayState: ne ? `running` : `paused`
          }
        }, e.version)]
      }), o && (0, A.jsx)(`button`, {
        type: `button`,
        className: `ui-ts__close`,
        "aria-label": `Dismiss notification`,
        onClick: () => ks(e.id),
        children: (0, A.jsx)(Fs, {})
      })]
    })
  });
}
var Rs = 10,
  zs = .05,
  Bs = {
    y: 0,
    scale: 1,
    height: 0,
    z: 0,
    behind: !1,
    hidden: !0
  };
function Vs({
  position: e = `bottom-right`,
  inline: t = !1,
  id: n,
  duration: r = 4e3,
  visibleToasts: i = 3,
  expand: a = !1,
  offset: o,
  gap: s = 10,
  hotkey: c = `F8`,
  hairline: l = !0,
  closeButton: u = !0,
  label: d = `Notifications`,
  className: f
}) {
  let p = (0, m.useSyncExternalStore)(ws, Ts, Es),
    [h, g] = (0, m.useState)({}),
    [_, v] = (0, m.useState)(!1),
    [y, b] = (0, m.useState)(!1),
    [x, S] = (0, m.useState)(!1),
    [ee, te] = (0, m.useState)(!1),
    [ne, re] = (0, m.useState)(``),
    [C, ie] = (0, m.useState)(``),
    ae = (0, m.useRef)(null),
    oe = (0, m.useRef)(new Map()),
    se = (0, m.useRef)(0),
    ce = (0, m.useRef)(null),
    le = (0, m.useRef)(`mouse`),
    ue = (0, m.useRef)(new Map()),
    [de, fe] = e.split(`-`),
    pe = de === `bottom` ? 1 : -1,
    me = p.filter(e => (e.toaster ?? null) === (n ?? null)).reverse(),
    w = me.filter(e => !e.removing),
    he = a || _ || y || x,
    ge = _ || y || x || ee,
    _e = Math.max(1, i),
    ve = (0, m.useCallback)((e, t) => {
      g(n => n[e] === t ? n : {
        ...n,
        [e]: t
      });
    }, []),
    ye = w[0] && h[Is(w[0])] || se.current;
  ye && (se.current = ye);
  let be = new Map(),
    xe = 0;
  w.forEach((e, t) => {
    let n = h[Is(e)] ?? 0,
      r = Math.min(t, _e - 1),
      i = he ? {
        y: xe,
        scale: 1,
        height: n,
        z: w.length - t,
        behind: !1,
        hidden: t >= _e
      } : {
        y: r * Rs,
        scale: 1 - r * zs,
        height: t === 0 ? n : ye,
        z: w.length - t,
        behind: t > 0,
        hidden: t >= _e
      };
    t < _e && (xe += n + s), be.set(Is(e), i), oe.current.set(Is(e), i);
  });
  let Se = Math.min(w.length, _e),
    Ce = w.length ? he ? Math.max(0, xe - s) : ye + Rs * (Se - 1) : 0;
  (0, m.useEffect)(() => {
    let e = new Set(me.map(Is));
    g(t => {
      let n = Object.keys(t).filter(t => !e.has(t));
      if (!n.length) return t;
      let r = {
        ...t
      };
      return n.forEach(e => delete r[e]), r;
    }), oe.current.forEach((t, n) => !e.has(n) && oe.current.delete(n)), w.length || S(!1);
  }, [p]), (0, m.useEffect)(() => {
    let e = ae.current;
    e && (w.forEach(t => {
      let n = Is(t);
      if (ue.current.get(n) === t.version) return;
      ue.current.set(n, t.version);
      let r = Array.from(e.querySelectorAll(`[data-toast-id]`)).find(e => e.dataset.toastId === n)?.querySelector(`.ui-ts__copy:not(.ui-ts__ghost)`)?.textContent?.trim();
      r && (t.type === `error` ? ie : re)(e => e === r ? `${r} ` : r);
    }), ue.current.forEach((e, t) => !me.some(e => Is(e) === t) && ue.current.delete(t)));
  }, [p]), (0, m.useEffect)(() => {
    let e = () => te(document.visibilityState === `hidden`);
    return e(), document.addEventListener(`visibilitychange`, e), () => document.removeEventListener(`visibilitychange`, e);
  }, []), (0, m.useEffect)(() => {
    if (!x) return;
    let e = e => {
      ae.current?.contains(e.target) || S(!1);
    };
    return document.addEventListener(`pointerdown`, e), () => document.removeEventListener(`pointerdown`, e);
  }, [x]);
  let we = () => Array.from(ae.current?.querySelectorAll(`[data-toast-id]:not([data-removing])`) ?? []);
  (0, m.useEffect)(() => {
    if (!c) return;
    let e = e => {
      if (e.key !== c && e.code !== c) return;
      let t = we().find(e => !e.inert);
      t && (e.preventDefault(), ae.current?.contains(document.activeElement) || (ce.current = document.activeElement), t.focus());
    };
    return window.addEventListener(`keydown`, e), () => window.removeEventListener(`keydown`, e);
  }, [c]);
  let Te = e => {
      if (e.key !== `Escape` || !w.length) return;
      e.preventDefault(), e.stopPropagation();
      let t = e.target.closest(`[data-toast-id]`),
        n = w.find(e => Is(e) === t?.dataset.toastId) ?? w[0],
        r = w.indexOf(n);
      ks(n.id);
      let i = w.filter(e => e !== n)[Math.min(r, w.length - 2)],
        a = i && we().find(e => e.dataset.toastId === Is(i));
      a ? a.focus() : ce.current?.isConnected ? ce.current.focus() : document.activeElement?.blur();
    },
    T = e => {
      e.target.matches(`:focus-visible`) && b(!0);
    },
    E = e => {
      e.currentTarget.contains(e.relatedTarget) || b(!1);
    },
    Ee = {
      "--ui-ts-offset": o === void 0 ? void 0 : `${o}px`
    };
  return (0, A.jsxs)(`section`, {
    ref: ae,
    className: [`ui-ts`, f].filter(Boolean).join(` `),
    "data-y": de,
    "data-x": fe,
    "data-inline": t || void 0,
    "data-expanded": he || void 0,
    "data-empty": !w.length || void 0,
    "aria-label": c ? `${d} (${c})` : d,
    tabIndex: -1,
    style: Ee,
    onKeyDown: Te,
    onFocus: T,
    onBlur: E,
    onPointerDownCapture: e => le.current = e.pointerType,
    onPointerEnter: e => e.pointerType === `mouse` && v(!0),
    onPointerLeave: e => e.pointerType === `mouse` && v(!1),
    onClick: () => le.current !== `mouse` && w.length > 1 && S(!0),
    children: [(0, A.jsx)(`style`, {
      href: `ui-toaster`,
      precedence: `default`,
      children: Hs
    }), (0, A.jsx)(`ol`, {
      className: `ui-ts__list`,
      style: {
        height: `${Ce}px`
      },
      children: me.map(e => (0, A.jsx)(Ls, {
        t: e,
        layout: be.get(Is(e)) ?? oe.current.get(Is(e)) ?? Bs,
        edge: pe,
        paused: ge || (be.get(Is(e))?.hidden ?? !1),
        defaultDuration: r,
        hairline: l,
        closeButton: u,
        onHeight: ve
      }, Is(e)))
    }), (0, A.jsx)(`div`, {
      className: `ui-ts__sr`,
      role: `status`,
      "aria-live": `polite`,
      children: ne
    }), (0, A.jsx)(`div`, {
      className: `ui-ts__sr`,
      role: `alert`,
      children: C
    })]
  });
}
var Hs = `
/* Colors and motion as variables – override them on .ui-ts */
.ui-ts {
  --ui-ts-card: #ffffff;
  --ui-ts-line: #ececec;
  --ui-ts-ink: #171717;
  --ui-ts-text: #404040;
  --ui-ts-muted: #8f8f8f;
  --ui-ts-faint: #b5b5b5;
  --ui-ts-button: #f0f0f0;
  --ui-ts-button-hover: #e6e6e7;
  --ui-ts-hairline: rgba(23, 23, 23, 0.14);
  --ui-ts-success: #2f9e5b;
  --ui-ts-danger: #e5484d;
  --ui-ts-shadow: 0 0 0 1px var(--ui-ts-line), 0 1px 2px rgba(0, 0, 0, 0.04), 0 8px 24px -6px rgba(0, 0, 0, 0.1);
  --ui-ts-focus: rgba(23, 23, 23, 0.22);
  --ui-ts-ease: cubic-bezier(0.22, 1, 0.36, 1);
  --ui-ts-width: 356px;
  --ui-ts-offset: 24px;
  position: fixed;
  z-index: 9999;
  box-sizing: border-box;
  width: var(--ui-ts-width);
  max-width: calc(100% - 2 * var(--ui-ts-offset));
  margin: 0;
  padding: 0;
  font-family: "Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  font-size: 13.5px;
  line-height: 1.45;
  color: var(--ui-ts-text);
  -webkit-font-smoothing: antialiased;
  outline: none;
}
.ui-ts[data-inline] { position: absolute; z-index: 20; --ui-ts-offset: 20px; }
.ui-ts[data-empty] { pointer-events: none; }
.ui-ts *, .ui-ts *::before, .ui-ts *::after { box-sizing: border-box; }
:where(.ui-ts) button { margin: 0; padding: 0; border: 0; background: none; font: inherit; color: inherit; cursor: pointer; }
:where(.ui-ts) svg { display: block; flex: none; }
.ui-ts button:focus-visible { outline: 2px solid var(--ui-ts-focus); outline-offset: 2px; }

/* Corners and edge centers */
.ui-ts[data-y="bottom"] { bottom: var(--ui-ts-offset); }
.ui-ts[data-y="top"] { top: var(--ui-ts-offset); }
.ui-ts[data-x="right"] { right: var(--ui-ts-offset); }
.ui-ts[data-x="left"] { left: var(--ui-ts-offset); }
.ui-ts[data-x="center"] { left: 50%; transform: translateX(-50%); }
.ui-ts:not([data-inline])[data-y="bottom"] { bottom: max(var(--ui-ts-offset), env(safe-area-inset-bottom)); }

.ui-ts__list { position: relative; margin: 0; padding: 0; list-style: none; }

/* A toast: positioned by transform, sized by height – both glide */
.ui-ts__toast {
  position: absolute;
  left: 0;
  right: 0;
  outline: none;
  touch-action: none;
  -webkit-user-select: none;
  user-select: none;
  transition: transform 440ms var(--ui-ts-ease), opacity 320ms ease, height 380ms var(--ui-ts-ease);
}
.ui-ts[data-y="bottom"] .ui-ts__toast { bottom: 0; transform-origin: 50% 0; }
.ui-ts[data-y="top"] .ui-ts__toast { top: 0; transform-origin: 50% 100%; }
.ui-ts__toast[data-removing] { pointer-events: none; transition: transform 380ms var(--ui-ts-ease), opacity 260ms ease, height 380ms var(--ui-ts-ease); }

/* The swipe layer moves on its own, so the stack's transform never fights the finger */
.ui-ts__swipe { position: relative; height: 100%; transition: transform 460ms cubic-bezier(0.34, 1.3, 0.64, 1), opacity 260ms ease; }
.ui-ts__toast[data-swiping] { cursor: grabbing; }

.ui-ts__card { position: relative; height: 100%; overflow: hidden; border-radius: 14px; background: var(--ui-ts-card); box-shadow: var(--ui-ts-shadow); }
.ui-ts__toast:focus-visible .ui-ts__card { outline: 2px solid var(--ui-ts-focus); outline-offset: 2px; }

/* Content is measured; the card clips it while it grows or shrinks */
.ui-ts__content { display: flex; align-items: flex-start; gap: 10px; padding: 14px; transition: opacity 260ms ease; }
.ui-ts__content[data-action] { padding-right: 10px; }
/* Toasts behind the front one only show their edge */
.ui-ts__toast[data-behind] .ui-ts__content,
.ui-ts__toast[data-behind] .ui-ts__timer { opacity: 0; }

.ui-ts__text { position: relative; flex: 1; min-width: 0; }
.ui-ts__title { color: var(--ui-ts-ink); font-weight: 500; line-height: 20px; overflow-wrap: anywhere; }
.ui-ts__desc { margin-top: 1px; font-size: 13px; line-height: 18px; color: var(--ui-ts-muted); overflow-wrap: anywhere; }
/* Changed text slides in with a soft blur; the old text fades out on top */
.ui-ts__copy[data-changed] { animation: ui-ts-text-in 300ms var(--ui-ts-ease) both; }
.ui-ts__ghost { position: absolute; top: 0; left: 0; right: 0; pointer-events: none; animation: ui-ts-text-out 220ms ease both; }

/* Status icon: one drawing that morphs from spinner to check or cross */
.ui-ts__icon { display: grid; place-items: center; flex: none; width: 20px; height: 20px; color: var(--ui-ts-muted); transition: color 300ms ease; }
.ui-ts__icon[data-type="success"] { color: var(--ui-ts-success); }
.ui-ts__icon[data-type="error"] { color: var(--ui-ts-danger); }
.ui-ts__icon[data-type="info"] { color: var(--ui-ts-ink); }
.ui-ts__icon[data-type="custom"] > * { width: 18px; height: 18px; }
.ui-ts__status { width: 18px; height: 18px; overflow: visible; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
.ui-ts__icon[data-type="success"] .ui-ts__status,
.ui-ts__icon[data-type="error"] .ui-ts__status { animation: ui-ts-pop 460ms cubic-bezier(0.34, 1.56, 0.64, 1) both; }
.ui-ts__spin { transform-box: fill-box; transform-origin: center; animation: ui-ts-spin 760ms linear infinite; animation-play-state: paused; }
.ui-ts__icon[data-type="loading"] .ui-ts__spin { animation-play-state: running; }
/* The arc closes into a quiet ring; the spin freezes where it is, so nothing jumps */
.ui-ts__ring { stroke-dasharray: 1 0; stroke-opacity: 0.28; transition: stroke-dasharray 560ms var(--ui-ts-ease), stroke-opacity 360ms ease; }
.ui-ts__icon[data-type="loading"] .ui-ts__ring { stroke-dasharray: 0.28 0.72; stroke-opacity: 1; }
.ui-ts__mark { stroke-dasharray: 1; stroke-dashoffset: 1; opacity: 0; }
.ui-ts__info { opacity: 0; transition: opacity 240ms ease; }
.ui-ts__icon[data-type="success"] .ui-ts__check,
.ui-ts__icon[data-type="error"] .ui-ts__x1,
.ui-ts__icon[data-type="error"] .ui-ts__x2 { opacity: 1; stroke-dashoffset: 0; animation: ui-ts-draw 340ms var(--ui-ts-ease) 160ms both; }
.ui-ts__icon[data-type="error"] .ui-ts__x2 { animation-delay: 260ms; }
.ui-ts__icon[data-type="info"] .ui-ts__info { opacity: 1; }

.ui-ts__action {
  flex: none;
  align-self: center;
  height: 28px;
  margin: -4px 0;
  padding: 0 10px;
  border-radius: 8px;
  background: var(--ui-ts-button);
  font-size: 12.5px;
  font-weight: 500;
  color: var(--ui-ts-ink);
  white-space: nowrap;
  transition: background-color 160ms ease;
}
.ui-ts__action:hover { background: var(--ui-ts-button-hover); }

/* Close: a small round button on the corner, shown on hover and focus */
.ui-ts__close {
  position: absolute;
  top: -7px;
  left: -7px;
  z-index: 1;
  display: grid;
  place-items: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--ui-ts-card);
  box-shadow: 0 0 0 1px var(--ui-ts-line), 0 1px 3px rgba(0, 0, 0, 0.08);
  color: var(--ui-ts-muted);
  opacity: 0;
  transform: scale(0.8);
  transition: opacity 160ms ease, transform 200ms var(--ui-ts-ease), color 160ms ease;
}
.ui-ts__close::before { content: ""; position: absolute; inset: -6px; }
.ui-ts__close:hover { color: var(--ui-ts-ink); }
.ui-ts__toast:not([data-behind]):hover .ui-ts__close,
.ui-ts__toast:not([data-behind]):focus-within .ui-ts__close { opacity: 1; transform: none; }
.ui-ts__glyph { width: 12px; height: 12px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; }

/* The timer as a hairline – it stops whenever the timer does */
.ui-ts__timer {
  position: absolute;
  left: 14px;
  right: 14px;
  bottom: 0;
  height: 1px;
  background: var(--ui-ts-hairline);
  transform-origin: left;
  animation-name: ui-ts-timer;
  animation-timing-function: linear;
  animation-fill-mode: both;
  transition: opacity 260ms ease;
}

.ui-ts__sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }

@keyframes ui-ts-spin { to { transform: rotate(360deg); } }
@keyframes ui-ts-draw { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }
@keyframes ui-ts-pop { 0% { transform: scale(0.82); } 55% { transform: scale(1.08); } 100% { transform: scale(1); } }
@keyframes ui-ts-timer { from { transform: scaleX(1); } to { transform: scaleX(0); } }
@keyframes ui-ts-text-in { from { opacity: 0; transform: translateY(4px); filter: blur(3px); } to { opacity: 1; transform: none; filter: none; } }
@keyframes ui-ts-text-out { from { opacity: 1; } to { opacity: 0; transform: translateY(-4px); filter: blur(3px); } }

/* Phones: full width along the edge with 12px gutters */
@media (max-width: 600px) {
  .ui-ts, .ui-ts[data-x] { left: 12px; right: 12px; width: auto; max-width: none; transform: none; }
  .ui-ts[data-y="bottom"] { bottom: 12px; }
  .ui-ts:not([data-inline])[data-y="bottom"] { bottom: max(12px, env(safe-area-inset-bottom)); }
  .ui-ts[data-y="top"] { top: 12px; }
}
/* Touch screens: a visible close button with a big hit area, a taller action button */
@media (hover: none) and (pointer: coarse) {
  .ui-ts__toast:not([data-behind]) .ui-ts__close { opacity: 1; transform: none; }
  .ui-ts__close { width: 24px; height: 24px; top: -8px; left: -8px; }
  .ui-ts__close::before { inset: -8px; }
  .ui-ts__action { height: 36px; margin: -8px -2px -8px 0; padding: 0 14px; border-radius: 10px; font-size: 13px; }
}
@media (prefers-reduced-motion: reduce) {
  .ui-ts *:not(.ui-ts__spin):not(.ui-ts__timer), .ui-ts *::before, .ui-ts *::after { animation: none !important; transition: none !important; }
}

/* Dark mode: follows a .dark class or data-theme="dark" on any ancestor, e.g. <html> */
:where(.dark, [data-theme="dark"]) .ui-ts {
  --ui-ts-card: #19191b;
  --ui-ts-line: #2a2a2e;
  --ui-ts-ink: #ededed;
  --ui-ts-text: #c8c8cc;
  --ui-ts-muted: #8b8b92;
  --ui-ts-faint: #5c5c63;
  --ui-ts-button: #26262a;
  --ui-ts-button-hover: #2e2e33;
  --ui-ts-hairline: rgba(255, 255, 255, 0.16);
  --ui-ts-success: #4cc38a;
  --ui-ts-danger: #ff6369;
  --ui-ts-shadow: 0 0 0 1px var(--ui-ts-line), 0 1px 2px rgba(0, 0, 0, 0.3), 0 10px 28px -6px rgba(0, 0, 0, 0.5);
  --ui-ts-focus: rgba(255, 255, 255, 0.3);
}
`;
function Ks() {
  return (0, A.jsxs)(`section`, {
    className: `not-found`,
    children: [(0, A.jsx)(`span`, {
      className: `not-found__code`,
      children: `404`
    }), (0, A.jsx)(`h1`, {
      className: `not-found__title`,
      children: `Page not found`
    }), (0, A.jsx)(`p`, {
      className: `not-found__text`,
      children: `The page you're looking for doesn't exist or has moved. Try the search in the sidebar or head back home.`
    }), (0, A.jsxs)(`div`, {
      className: `not-found__actions`,
      children: [(0, A.jsx)(F, {
        to: `/`,
        className: `tier__cta tier__cta--primary`,
        children: `Back to home`
      }), (0, A.jsx)(F, {
        to: `/docs`,
        className: `tier__cta tier__cta--secondary`,
        children: `Read the docs`
      })]
    })]
  });
}
function qs({
  faqs: e,
  defaultOpen: t = 0
}) {
  let [n, r] = (0, m.useState)(t);
  return (0, A.jsx)(`div`, {
    className: `faq__list`,
    children: e.map((e, t) => {
      let i = n === t,
        a = `faq-a-${t}`;
      return (0, A.jsxs)(`div`, {
        className: `faq__item`,
        "data-open": i || void 0,
        children: [(0, A.jsxs)(`button`, {
          className: `faq__q`,
          "aria-expanded": i,
          "aria-controls": a,
          onClick: () => r(i ? null : t),
          children: [e.q, (0, A.jsx)(j, {
            icon: Ci,
            size: 16
          })]
        }), (0, A.jsx)(`div`, {
          className: `faq__panel`,
          id: a,
          inert: !i,
          children: (0, A.jsx)(`div`, {
            children: (0, A.jsx)(`p`, {
              className: `faq__a`,
              children: e.a
            })
          })
        })]
      }, e.q);
    })
  });
}
var Js = `M38 0H176Q196 0 204 14L218 30Q224 38 246 38H562Q600 38 600 76V462Q600 500 562 500H38Q0 500 0 462V38Q0 0 38 0Z`,
  Ys = [78, 180, 140, 175, 126, 168, 110];
function Xs({
  className: e,
  label: t = `Blue folder holding three documents behind a frosted front pocket`
}) {
  let n = `ui-fd` + (0, m.useId)().replace(/[^a-zA-Z0-9_-]/g, ``);
  return (0, A.jsxs)(`div`, {
    className: [`ui-fd`, e].filter(Boolean).join(` `),
    role: `img`,
    "aria-label": t,
    children: [(0, A.jsx)(`style`, {
      href: `ui-glass-folder`,
      precedence: `default`,
      children: Zs
    }), (0, A.jsxs)(`div`, {
      className: `ui-fd-icon`,
      "aria-hidden": `true`,
      children: [(0, A.jsxs)(`svg`, {
        className: `ui-fd-layer ui-fd-back`,
        viewBox: `0 0 600 500`,
        children: [(0, A.jsx)(`defs`, {
          children: (0, A.jsxs)(`filter`, {
            id: `${n}-hl`,
            x: `-10%`,
            y: `-10%`,
            width: `120%`,
            height: `120%`,
            children: [(0, A.jsx)(`feGaussianBlur`, {
              in: `SourceAlpha`,
              stdDeviation: `4`,
              result: `blur`
            }), (0, A.jsx)(`feOffset`, {
              in: `blur`,
              dy: `3`,
              result: `offset`
            }), (0, A.jsx)(`feComposite`, {
              in: `blur`,
              in2: `offset`,
              operator: `arithmetic`,
              k2: `1`,
              k3: `-1`,
              result: `diff`
            }), (0, A.jsx)(`feFlood`, {
              floodColor: `#fff`,
              floodOpacity: `0.65`
            }), (0, A.jsx)(`feComposite`, {
              in2: `diff`,
              operator: `in`,
              result: `light`
            }), (0, A.jsx)(`feComposite`, {
              in: `light`,
              in2: `SourceAlpha`,
              operator: `in`
            })]
          })
        }), (0, A.jsx)(`path`, {
          className: `ui-fd-back-fill`,
          d: Js,
          fill: `#5bb7ea`
        }), (0, A.jsx)(`path`, {
          d: Js,
          fill: `#000`,
          filter: `url(#${n}-hl)`
        })]
      }), (0, A.jsxs)(`svg`, {
        className: `ui-fd-layer`,
        viewBox: `0 0 600 500`,
        children: [(0, A.jsxs)(`defs`, {
          children: [(0, A.jsxs)(`linearGradient`, {
            id: `${n}-paper`,
            x1: `0`,
            y1: `0`,
            x2: `0`,
            y2: `1`,
            children: [(0, A.jsx)(`stop`, {
              className: `ui-fd-paper-top`,
              offset: `0%`,
              stopColor: `#fff`
            }), (0, A.jsx)(`stop`, {
              className: `ui-fd-paper-bottom`,
              offset: `100%`,
              stopColor: `#eaf2f8`
            })]
          }), (0, A.jsxs)(`symbol`, {
            id: `${n}-doc`,
            overflow: `visible`,
            children: [(0, A.jsx)(`rect`, {
              className: `ui-fd-paper`,
              x: `0.6`,
              y: `0.6`,
              width: `278.8`,
              height: `348.8`,
              rx: `19.4`,
              fill: `url(#${n}-paper)`,
              stroke: `rgba(0,0,0,0.12)`,
              strokeWidth: `1.2`
            }), Ys.map((e, t) => (0, A.jsx)(`rect`, {
              className: `ui-fd-line`,
              x: `30`,
              y: 87 + t * 28,
              width: e,
              height: `9`,
              rx: `4.5`,
              fill: `rgba(0,0,0,0.12)`
            }, t))]
          })]
        }), (0, A.jsx)(`use`, {
          className: `ui-fd-doc ui-fd-doc--left`,
          href: `#${n}-doc`
        }), (0, A.jsx)(`use`, {
          className: `ui-fd-doc ui-fd-doc--right`,
          href: `#${n}-doc`
        }), (0, A.jsx)(`use`, {
          className: `ui-fd-doc ui-fd-doc--middle`,
          href: `#${n}-doc`
        })]
      }), (0, A.jsx)(`div`, {
        className: `ui-fd-front`
      })]
    })]
  });
}
var Zs = `
.ui-fd {
  --ui-fd-ease: cubic-bezier(0.2, 0.85, 0.25, 1);
  position: relative;
  width: 100%;
  aspect-ratio: 3 / 2;
  overflow: hidden;
  container-type: inline-size;
  font-family: "Inter", ui-sans-serif, system-ui, -apple-system, sans-serif;
}

/* The folder is drawn on a 600 × 500 grid; cqw keeps every detail in proportion */
.ui-fd-icon {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 40%;
  aspect-ratio: 6 / 5;
  container-type: inline-size;
  perspective: 220cqw;
  perspective-origin: 50% 60%;
  transform: translate(-50%, -48%);
  transition: transform 0.6s var(--ui-fd-ease);
}
.ui-fd-icon:hover { transform: translate(-50%, -48%) scale(1.03); }

.ui-fd-layer { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; }
.ui-fd-back {
  filter:
    drop-shadow(0 4cqw 4.6cqw rgba(60, 130, 180, 0.28))
    drop-shadow(0 1.3cqw 2cqw rgba(60, 130, 180, 0.16))
    drop-shadow(0 0.3cqw 0.7cqw rgba(60, 130, 180, 0.1));
}

.ui-fd-doc {
  transform-box: fill-box;
  transform-origin: center;
  filter: drop-shadow(0 3px 4px rgba(0, 30, 60, 0.18));
  transition: transform 0.55s var(--ui-fd-ease);
}
.ui-fd-doc--left   { transform: translate(40px, 80px) rotate(6deg); }
.ui-fd-doc--right  { transform: translate(280px, 80px) rotate(6deg); }
.ui-fd-doc--middle { transform: translate(160px, 66px) rotate(-4deg); }
.ui-fd-icon:hover .ui-fd-doc--left   { transform: translate(32px, 70px) rotate(9deg); }
.ui-fd-icon:hover .ui-fd-doc--right  { transform: translate(286px, 76px) rotate(5deg); }
.ui-fd-icon:hover .ui-fd-doc--middle { transform: translate(166px, 52px) rotate(-7deg); }

/* Pocket: top edge at 108 of 500, corners 38; on hover it drops to 124 and tips forward */
.ui-fd-front {
  position: absolute;
  inset: 21.6% 0 0;
  border-radius: 6.333cqw;
  background:
    linear-gradient(180deg, rgba(0, 40, 75, 0) 74%, rgba(0, 40, 75, 0.28) 100%),
    linear-gradient(180deg, rgba(132, 214, 248, 0.45) 0%, rgba(69, 170, 220, 0.45) 100%);
  box-shadow: inset 0 0 0 0.67cqw rgba(255, 255, 255, 0.3), inset 0 0.25cqw 0 rgba(255, 255, 255, 0.55);
  -webkit-backdrop-filter: blur(3.3cqw) saturate(1.1);
  backdrop-filter: blur(3.3cqw) saturate(1.1);
  transform-origin: 50% 100%;
  transition: top 0.6s var(--ui-fd-ease), border-radius 0.6s var(--ui-fd-ease), transform 0.6s var(--ui-fd-ease);
}
.ui-fd-icon:hover .ui-fd-front {
  top: 24.8%;
  border-radius: 3cqw 3cqw 6.333cqw 6.333cqw;
  transform: translateZ(2.33cqw) rotateX(-9deg);
}

/* Dark mode: follows a .dark class or data-theme="dark" on any ancestor, e.g. <html>.
   Dark paper with light lines, a deeper blue folder and a pocket that lets less light through. */
:where(.dark, [data-theme="dark"]) .ui-fd-back-fill { fill: #3d8fc6; }
:where(.dark, [data-theme="dark"]) .ui-fd-paper-top { stop-color: #34363c; }
:where(.dark, [data-theme="dark"]) .ui-fd-paper-bottom { stop-color: #26292f; }
:where(.dark, [data-theme="dark"]) .ui-fd-paper { stroke: rgba(255, 255, 255, 0.1); }
:where(.dark, [data-theme="dark"]) .ui-fd-line { fill: rgba(255, 255, 255, 0.16); }
:where(.dark, [data-theme="dark"]) .ui-fd-back {
  filter:
    drop-shadow(0 4cqw 4.6cqw rgba(0, 0, 0, 0.45))
    drop-shadow(0 1.3cqw 2cqw rgba(0, 0, 0, 0.3));
}
:where(.dark, [data-theme="dark"]) .ui-fd-doc { filter: drop-shadow(0 3px 4px rgba(0, 0, 0, 0.45)); }
:where(.dark, [data-theme="dark"]) .ui-fd-front {
  background:
    linear-gradient(180deg, rgba(0, 20, 40, 0) 70%, rgba(0, 20, 40, 0.4) 100%),
    linear-gradient(180deg, rgba(100, 190, 235, 0.42) 0%, rgba(45, 130, 190, 0.5) 100%);
  box-shadow: inset 0 0 0 0.67cqw rgba(255, 255, 255, 0.14), inset 0 0.25cqw 0 rgba(255, 255, 255, 0.3);
}

@media (prefers-reduced-motion: reduce) {
  .ui-fd-icon, .ui-fd-doc, .ui-fd-front { transition: none; }
}
`,
  Qs = (0, m.lazy)(() => i(() => import("./chunks/component-WEwHkvy1.js").then(e => ({
    default: e.IntegrationGrid
  })), __vite__mapDeps([216, 3, 2]))),
  $s = () => (0, A.jsx)(`svg`, {
    className: `ba-cursor`,
    viewBox: `-2.186 -0.256 18.514 22.277`,
    "aria-hidden": !0,
    children: (0, A.jsx)(`path`, {
      transform: `rotate(21.37)`,
      d: `M13.92 4.07c1.69.66 3.03 1.18 3.94 1.68.46.25.87.53 1.16.86.31.35.51.79.48 1.29-.03.51-.27.92-.62 1.23-.33.3-.77.53-1.25.74-.96.4-2.36.78-4.12 1.26-.56.15-.98.27-1.26.37-.26.1-.38.18-.47.27-.09.09-.17.21-.27.47-.1.28-.22.7-.37 1.26-.48 1.76-.86 3.16-1.26 4.12-.2.49-.44.93-.74 1.25-.32.35-.72.6-1.23.62-.51.03-.94-.17-1.29-.48-.33-.29-.61-.7-.86-1.16-.5-.91-1.02-2.25-1.68-3.94L1.66 7.76C.96 5.99.41 4.59.16 3.51-.09 2.44-.12 1.39.63.63 1.39-.12 2.44-.09 3.51.16c1.08.25 2.48.8 4.25 1.5l6.16 2.41Z`
    })
  });
function ec({
  slug: e
}) {
  let t = `npx shadcn add ${e}`;
  return (0, A.jsxs)(`div`, {
    className: `ba-install`,
    children: [(0, A.jsxs)(`div`, {
      className: `ba-tray`,
      children: [(0, A.jsxs)(`span`, {
        className: `ba-tray__head`,
        children: [(0, A.jsx)(`span`, {
          className: `ba-tray__icon`,
          children: `>_`
        }), `Terminal`, (0, A.jsx)(`span`, {
          className: `ba-tray__meta`,
          children: `zsh`
        })]
      }), (0, A.jsxs)(`div`, {
        className: `ba-tray__card ba-install__term`,
        children: [(0, A.jsxs)(`span`, {
          className: `ba-install__line`,
          children: [(0, A.jsx)(`b`, {
            children: `$`
          }), (0, A.jsx)(`span`, {
            className: `ba-install__type`,
            style: {
              "--n": t.length
            },
            children: t
          })]
        }), (0, A.jsx)(`span`, {
          className: `ba-install__done`,
          children: `✓ Created 1 file`
        })]
      })]
    }), (0, A.jsxs)(`div`, {
      className: `ba-tray`,
      children: [(0, A.jsxs)(`span`, {
        className: `ba-tray__head`,
        children: [(0, A.jsx)(`span`, {
          className: `ba-install__folder`,
          "aria-hidden": !0,
          children: (0, A.jsx)(Xs, {
            label: ``
          })
        }), `components/ui`, (0, A.jsx)(`span`, {
          className: `ba-tray__meta`,
          children: `2 files`
        })]
      }), (0, A.jsxs)(`div`, {
        className: `ba-tray__card ba-install__files`,
        children: [(0, A.jsxs)(`span`, {
          className: `ba-install__file`,
          children: [(0, A.jsx)(`i`, {
            className: `ba-install__ext`,
            children: `TSX`
          }), `button.tsx`]
        }), (0, A.jsxs)(`span`, {
          className: `ba-install__file ba-install__file--new`,
          children: [(0, A.jsx)(`i`, {
            className: `ba-install__ext ba-install__ext--new`,
            children: `TSX`
          }), e, `.tsx`, (0, A.jsx)(`em`, {
            children: `New`
          })]
        })]
      })]
    })]
  });
}
function tc() {
  return (0, A.jsx)(`div`, {
    className: `ba-tweak`,
    children: (0, A.jsxs)(`div`, {
      className: `ba-tweak__box`,
      children: [(0, A.jsxs)(`div`, {
        className: `ba-tray ba-tweak__preview`,
        children: [(0, A.jsxs)(`span`, {
          className: `ba-tray__head`,
          children: [`Preview`, (0, A.jsxs)(`span`, {
            className: `ba-tray__meta ba-tweak__live`,
            children: [(0, A.jsx)(`i`, {}), `Live`]
          })]
        }), (0, A.jsxs)(`div`, {
          className: `ba-tray__card ba-tweak__profile`,
          children: [(0, A.jsx)(`span`, {
            className: `ba-tweak__avatar`,
            children: (0, A.jsx)(`img`, {
              src: `/assets/landing/memoji.png`,
              alt: ``,
              width: 28,
              height: 28
            })
          }), (0, A.jsx)(`b`, {
            children: `Jonas Weber`
          }), (0, A.jsx)(`small`, {
            children: `Design lead`
          }), (0, A.jsxs)(`span`, {
            className: `ba-tweak__stats`,
            children: [(0, A.jsxs)(`span`, {
              children: [(0, A.jsx)(`b`, {
                children: `128`
              }), ` posts`]
            }), (0, A.jsxs)(`span`, {
              children: [(0, A.jsx)(`b`, {
                children: `2.4k`
              }), ` fans`]
            })]
          }), (0, A.jsx)(`span`, {
            className: `ba-tweak__button`,
            children: `Follow`
          })]
        })]
      }), (0, A.jsxs)(`div`, {
        className: `ba-tray ba-tweak__accent`,
        children: [(0, A.jsxs)(`span`, {
          className: `ba-tray__head`,
          children: [`Accent`, (0, A.jsxs)(`span`, {
            className: `ba-tray__meta ba-tweak__hex`,
            children: [(0, A.jsx)(`span`, {
              className: `ba-tweak__hex--a`,
              children: `#2F6BFF`
            }), (0, A.jsx)(`span`, {
              className: `ba-tweak__hex--b`,
              children: `#5E3EE0`
            })]
          })]
        }), (0, A.jsxs)(`div`, {
          className: `ba-tray__card ba-tweak__swatches`,
          children: [(0, A.jsx)(`i`, {
            style: {
              background: `#2f6bff`
            }
          }), (0, A.jsx)(`i`, {
            style: {
              background: `#5e3ee0`
            }
          }), (0, A.jsx)(`i`, {
            style: {
              background: `#dd0674`
            }
          }), (0, A.jsx)(`i`, {
            style: {
              background: `#14b8a6`
            }
          }), (0, A.jsx)(`i`, {
            style: {
              background: `#f97316`
            }
          }), (0, A.jsx)(`b`, {
            className: `ba-tweak__ring`
          })]
        })]
      }), (0, A.jsxs)(`div`, {
        className: `ba-tray ba-tweak__radius`,
        children: [(0, A.jsxs)(`span`, {
          className: `ba-tray__head`,
          children: [`Radius`, (0, A.jsx)(`span`, {
            className: `ba-tray__meta ba-tweak__value`
          })]
        }), (0, A.jsx)(`div`, {
          className: `ba-tray__card ba-tweak__trackcard`,
          children: (0, A.jsxs)(`span`, {
            className: `ba-tweak__track`,
            children: [(0, A.jsx)(`span`, {
              className: `ba-tweak__fill`
            }), (0, A.jsx)(`i`, {})]
          })
        })]
      }), (0, A.jsxs)(`div`, {
        className: `ba-tray ba-tweak__shadow`,
        children: [(0, A.jsxs)(`span`, {
          className: `ba-tray__head`,
          children: [`Shadow`, (0, A.jsx)(`span`, {
            className: `ba-tray__meta`,
            children: `Elevation`
          })]
        }), (0, A.jsxs)(`div`, {
          className: `ba-tray__card ba-tweak__shadowcard`,
          children: [(0, A.jsx)(`span`, {
            children: `Soft lift`
          }), (0, A.jsx)(`span`, {
            className: `ba-tweak__switch`,
            children: (0, A.jsx)(`i`, {})
          })]
        })]
      }), (0, A.jsxs)(`span`, {
        className: `ba-tweak__cursor`,
        children: [(0, A.jsx)($s, {}), (0, A.jsx)(`span`, {
          className: `ba-tweak__tip ba-tweak__tip--radius`,
          children: `radius`
        }), (0, A.jsx)(`span`, {
          className: `ba-tweak__tip ba-tweak__tip--accent`,
          children: `accent`
        }), (0, A.jsx)(`span`, {
          className: `ba-tweak__tip ba-tweak__tip--shadow`,
          children: `shadow`
        })]
      })]
    })
  });
}
function nc() {
  return (0, A.jsxs)(`div`, {
    className: `ba-theme`,
    children: [(0, A.jsx)(`div`, {
      className: `ba-theme__layer ba-theme__layer--light`,
      children: (0, A.jsx)(m.Suspense, {
        fallback: null,
        children: (0, A.jsx)(Qs, {
          columns: 7
        })
      })
    }), (0, A.jsx)(`div`, {
      className: `ba-theme__layer ba-theme__layer--dark dark`,
      children: (0, A.jsx)(m.Suspense, {
        fallback: null,
        children: (0, A.jsx)(Qs, {
          columns: 7
        })
      })
    }), (0, A.jsx)(`span`, {
      className: `ba-theme__edge`
    }), (0, A.jsx)(`span`, {
      className: `ba-theme__toggle`,
      children: (0, A.jsx)(`i`, {})
    })]
  });
}
var rc = `claude mcp add --transport http plico-ui ${`${k.url}/mcp`}`,
  ic = [{
    tool: `search_components`,
    detail: `“onboarding checklist”`,
    result: `Progress Tracker`
  }, {
    tool: `get_component`,
    detail: `progress-tracker`,
    result: `usage, props, install`
  }, {
    tool: `shadcn add`,
    detail: `@plico/progress-tracker`,
    result: `components/plico/progress-tracker/index.jsx`
  }];
function ac() {
  return (0, A.jsxs)(`section`, {
    className: `lp-section lp-agent`,
    "aria-labelledby": `lp-agent-title`,
    children: [(0, A.jsxs)(`h2`, {
      id: `lp-agent-title`,
      className: `lp-lead`,
      children: [`Built for agents,`, (0, A.jsx)(`br`, {}), `not just for copy and paste`]
    }), (0, A.jsx)(`p`, {
      className: `lp-sub`,
      children: `Connect the Plico UI MCP server once. Claude Code, Cursor, VS Code or Codex then find the right piece, read its docs and add it – you just describe what you need.`
    }), (0, A.jsxs)(`div`, {
      className: `lp-agent__frame`,
      children: [(0, A.jsx)(Do, {
        minHeight: 260,
        children: (0, A.jsxs)(`div`, {
          className: `lp-agent__chat`,
          "aria-label": `Example agent session`,
          children: [(0, A.jsx)(`p`, {
            className: `lp-agent__you`,
            children: `Add an onboarding checklist to the dashboard`
          }), (0, A.jsx)(`ol`, {
            className: `lp-agent__steps`,
            children: ic.map((e, t) => (0, A.jsxs)(`li`, {
              style: {
                animationDelay: `${200 + t * 260}ms`
              },
              children: [(0, A.jsx)(`span`, {
                className: `lp-agent__check`,
                children: (0, A.jsx)(j, {
                  icon: Bi,
                  size: 10
                })
              }), (0, A.jsx)(`code`, {
                children: e.tool
              }), (0, A.jsx)(`span`, {
                className: `lp-agent__detail`,
                children: e.detail
              }), (0, A.jsxs)(`span`, {
                className: `lp-agent__result`,
                children: [`→ `, e.result]
              })]
            }, e.tool))
          }), (0, A.jsx)(`p`, {
            className: `lp-agent__reply`,
            style: {
              animationDelay: `1100ms`
            },
            children: `Added the Progress Tracker above your stats – five steps, ticks that draw in, and it follows your dark mode.`
          })]
        })
      }), (0, A.jsxs)(`div`, {
        className: `lp-agent__setup`,
        children: [(0, A.jsx)(`span`, {
          className: `lp-agent__label`,
          children: `Connect in one line`
        }), (0, A.jsxs)(`div`, {
          className: `lp-agent__cmd`,
          children: [(0, A.jsx)(`code`, {
            children: rc
          }), (0, A.jsx)(Vi, {
            value: rc,
            className: `lp-agent__copy`
          })]
        }), (0, A.jsxs)(`p`, {
          className: `lp-agent__note`,
          children: [`Use a compatible HTTP MCP client to browse documentation and source. A protected host requires its deployment bypass header. Prefer plain text? `, (0, A.jsx)(`a`, {
            href: `${k.url}/llms.txt`,
            children: `llms.txt`
          })]
        }), (0, A.jsx)(F, {
          to: `/docs/ai`,
          className: `btn btn--secondary lp-btn`,
          children: `Set up your editor`
        })]
      })]
    })]
  });
}
var oc = [`agent-run`, `agent-chat`, `evals`, `analytics`, `crm`, `settings-billing`].map(e => li.find(t => t.slug === e)).filter(e => e !== void 0);
function sc(e) {
  let t = (0, m.useRef)(null),
    [n, r] = (0, m.useState)(!1);
  return (0, m.useEffect)(() => {
    let n = t.current;
    if (!n || !(`IntersectionObserver` in window)) return r(!0);
    let i = new IntersectionObserver(e => r(e.some(e => e.isIntersecting)), {
      rootMargin: e
    });
    return i.observe(n), () => i.disconnect();
  }, [e]), [t, n];
}
function cc() {
  let [e, t] = (0, m.useState)(() => typeof window < `u` && window.matchMedia(`(min-width: 761px)`).matches);
  return (0, m.useEffect)(() => {
    let e = window.matchMedia(`(min-width: 761px)`),
      n = () => t(e.matches);
    return e.addEventListener(`change`, n), () => e.removeEventListener(`change`, n);
  }, []), e;
}
function lc({
  slug: e,
  name: t
}) {
  return (0, A.jsxs)(`span`, {
    className: `lp-screens__poster`,
    children: [(0, A.jsx)(`img`, {
      className: `lp-screens__shot lp-screens__shot--light`,
      src: `/assets/previews/${e}.webp`,
      alt: `${t} screen`,
      loading: `lazy`,
      decoding: `async`
    }), (0, A.jsx)(`img`, {
      className: `lp-screens__shot lp-screens__shot--dark`,
      src: `/assets/previews/dark/${e}.webp`,
      alt: ``,
      loading: `lazy`,
      decoding: `async`
    })]
  });
}
function uc() {
  let [e, t] = (0, m.useState)(oc[0]?.slug),
    {
      offer: n
    } = Po(),
    [r, i] = sc(`0px`),
    a = cc(),
    [o, s] = (0, m.useState)(!1);
  (0, m.useEffect)(() => {
    if (i && a) {
      s(!0);
      return;
    }
    let e = window.setTimeout(() => s(!1), 4e3);
    return () => window.clearTimeout(e);
  }, [i, a]);
  let c = oc.find(t => t.slug === e) ?? oc[0];
  if (!c) return null;
  let {
      Preview: l
    } = c,
    u = (0, A.jsx)(lc, {
      slug: c.slug,
      name: c.name
    });
  return (0, A.jsxs)(`section`, {
    className: `lp-section lp-screens`,
    "aria-labelledby": `lp-screens-title`,
    children: [(0, A.jsxs)(`h2`, {
      id: `lp-screens-title`,
      className: `lp-lead`,
      children: [`Complete screens,`, (0, A.jsx)(`br`, {}), `not just parts`]
    }), (0, A.jsx)(`p`, {
      className: `lp-sub`,
      children: `Whole app views for AI products – plug in your data and ship.`
    }), (0, A.jsx)(`div`, {
      className: `lp-tabs`,
      role: `tablist`,
      "aria-label": `Pick a screen`,
      children: oc.map(e => (0, A.jsx)(`button`, {
        role: `tab`,
        "aria-selected": e.slug === c.slug,
        className: `lp-tab`,
        onClick: () => t(e.slug),
        children: e.name
      }, e.slug))
    }), (0, A.jsxs)(`div`, {
      ref: r,
      className: `lp-screens__window`,
      children: [(0, A.jsxs)(`div`, {
        className: `lp-screens__bar`,
        "aria-hidden": `true`,
        children: [(0, A.jsxs)(`span`, {
          className: `lp-screens__dots`,
          children: [(0, A.jsx)(`i`, {}), (0, A.jsx)(`i`, {}), (0, A.jsx)(`i`, {})]
        }), (0, A.jsxs)(`span`, {
          className: `lp-screens__url`,
          children: [`app.yourproduct.com/`, c.slug]
        })]
      }), (0, A.jsx)(`div`, {
        className: `lp-screens__view`,
        role: `tabpanel`,
        "aria-label": c.name,
        children: o ? (0, A.jsx)(m.Suspense, {
          fallback: u,
          children: (0, A.jsx)(l, {})
        }) : a ? u : (0, A.jsx)(F, {
          to: P(c),
          "aria-label": `Open the ${c.name} screen`,
          children: u
        }),
        inert: o || undefined
      }, c.slug)]
    }), (0, A.jsxs)(`div`, {
      className: `lp-more lp-screens__ctas`,
      children: [(0, A.jsxs)(F, {
        to: `/screens`,
        className: `btn btn--secondary lp-btn`,
        children: [`Browse all `, li.length, ` screens`]
      }), null]
    })]
  });
}
var dc = (0, m.lazy)(() => i(() => import("./chunks/BeforeAfter-DqU3tuG_.js").then(e => ({
    default: e.BeforeAfter
  })), __vite__mapDeps([297, 1, 2, 3, 246, 298, 41, 34, 66, 99]))),
  fc = [{
    label: `Components`,
    to: `/components`,
    icon: Oi,
    count: oi.length,
    text: `Buttons, inputs, cards, chat`
  }, {
    label: `Screens`,
    to: `/screens`,
    icon: Ei,
    count: li.length,
    text: `Complete app pages, ready to wire up`
  }, {
    label: `Blocks`,
    to: `/blocks`,
    icon: Ni,
    count: si.length,
    text: `Whole sections for real products`
  }, {
    label: `Illustrations`,
    to: `/illustrations`,
    icon: Mi,
    count: ci.length,
    text: `Animated scenes for landing pages`
  }, {
    label: `Motion`,
    to: `/motion`,
    icon: Li,
    count: ui.length,
    text: `Text, numbers, transitions, loaders`
  }],
  pc = e => [...e].sort((e, t) => Date.parse(t.added ?? ``) - Date.parse(e.added ?? ``)),
  hc = [{
    key: `components`,
    label: `Components`,
    to: `/components`,
    items: [`agent-inbox`, `agent-steering`, `autonomy-dial`, `approval-card`, `agent-plan`, `tool-call-card`, `thinking-state`, `ai-answer`, `chat-composer`, `model-picker`, `context-window`, `memory-panel`].map(e => oi.find(t => t.slug === e)).filter(e => e !== void 0).slice(0, 6)
  }, {
    key: `screens`,
    label: `Screens`,
    to: `/screens`,
    items: pc(li).slice(0, 4)
  }, {
    key: `blocks`,
    label: `Blocks`,
    to: `/blocks`,
    items: pc(si).slice(0, 4)
  }, {
    key: `illustrations`,
    label: `Illustrations`,
    to: `/illustrations`,
    items: pc(ci).slice(0, 4)
  }, {
    key: `motion`,
    label: `Motion`,
    to: `/motion`,
    items: pc(ui).slice(0, 6)
  }].filter(e => e.items.length > 0);
function gc() {
  let e = to(),
    [t, n] = (0, m.useState)(hc[0].key),
    r = hc.find(e => e.key === t) ?? hc[0],
    i = r.key === `blocks` || r.key === `illustrations`,
    a = di.length,
    o = oi.find(e => !e.pro) ?? oi[0];
  return (0, A.jsxs)(`div`, {
    className: `lp`,
    children: [(0, A.jsxs)(`header`, {
      className: `lp-nav`,
      children: [(0, A.jsxs)(`div`, {
        className: `lp-nav__left`,
        children: [(0, A.jsxs)(F, {
          to: `/`,
          className: `logo lp-nav__logo`,
          "aria-label": `${k.name} home`,
          children: [(0, A.jsx)(Ca, {
            size: 17
          }), (0, A.jsx)(`span`, {
            className: `logo__name`,
            children: k.name
          })]
        }), (0, A.jsxs)(`nav`, {
          className: `lp-nav__links`,
          "aria-label": `Primary`,
          children: [(0, A.jsx)(Ec, {}), (0, A.jsx)(F, {
            to: `/docs`,
            className: `lp-nav__link`,
            children: `Docs`
          }), null]
        })]
      }), (0, A.jsxs)(`div`, {
        className: `lp-nav__right`,
        children: [(0, A.jsx)(as, {}), (0, A.jsx)(ls, {
          className: `lp-nav__desktop`
        }), e ? (0, A.jsx)(Gs, {
          user: e
        }) : null, (0, A.jsx)(F, {
          to: `/components`,
          className: `btn btn--primary`,
          onClick: () => co(`Browse library`, {
            from: `nav`
          }),
          children: `Browse library`
        }), (0, A.jsx)(Tc, {
          loggedIn: !!e
        })]
      })]
    }), (0, A.jsxs)(`main`, {
      children: [(0, A.jsxs)(`section`, {
        className: `lp-hero`,
        children: [(0, A.jsx)(wc, {}), (0, A.jsxs)(`div`, {
          className: `lp-hero__copy`,
          children: [(0, A.jsxs)(`h1`, {
            className: `lp-hero__title`,
            children: [`Agent-ready UI`, (0, A.jsx)(`br`, {}), `for AI products`]
          }), (0, A.jsxs)(`p`, {
            className: `lp-hero__sub`,
            children: [a, `+ React components, screens and blocks. No dependencies.`, ` `, (0, A.jsx)(`br`, {
              className: `lp-hero__sub-break`
            }), `Add them yourself, or let Claude, Cursor or v0 do it.`]
          }), (0, A.jsxs)(`div`, {
            className: `lp-hero__ctas`,
            children: [(0, A.jsx)(F, {
              to: `/components`,
              className: `btn btn--primary lp-btn lp-btn--lg`,
              onClick: () => co(`Browse library`, {
                from: `hero`
              }),
              children: `Browse library`
            }), (0, A.jsx)(F, {
              to: `/docs`,
              className: `btn btn--secondary lp-btn lp-btn--lg`,
              children: `Get started`
            })]
          })]
        })]
      }), (0, A.jsxs)(`section`, {
        className: `lp-section`,
        children: [(0, A.jsxs)(`h2`, {
          className: `lp-lead`,
          children: [a, `+ pieces,`, (0, A.jsx)(`br`, {}), `none of them generic`]
        }), (0, A.jsx)(`div`, {
          className: `lp-tabs`,
          role: `tablist`,
          "aria-label": `Filter the library`,
          children: hc.map(e => (0, A.jsx)(`button`, {
            role: `tab`,
            "aria-selected": e.key === r.key,
            className: `lp-tab`,
            onClick: () => n(e.key),
            children: e.label
          }, e.key))
        }), (0, A.jsx)(`div`, {
          className: `grid lp-grid${r.key === `screens` ? ` grid--screens` : i ? ` lp-grid--wide` : ``}`,
          role: `tabpanel`,
          children: r.items.map(e => (0, A.jsx)(qo, {
            entry: e,
            look: r.key === `components` ? `clean` : void 0
          }, e.slug))
        }, r.key), (0, A.jsx)(`div`, {
          className: `lp-more`,
          children: (0, A.jsxs)(F, {
            to: r.to,
            className: `btn btn--secondary lp-btn`,
            children: [`Browse all `, r.label.toLowerCase()]
          })
        })]
      }), (0, A.jsx)(uc, {}), (0, A.jsxs)(`section`, {
        className: `lp-section lp-section--compare`,
        children: [(0, A.jsxs)(`h2`, {
          className: `lp-lead`,
          children: [`Same screen,`, (0, A.jsx)(`br`, {}), `with the details done`]
        }), (0, A.jsx)(`p`, {
          className: `lp-sub`,
          children: `The details you never think to prompt for – hover states, motion, calm hierarchy – make a product easier to understand and nicer to come back to.`
        }), (0, A.jsx)(Do, {
          minHeight: 720,
          children: (0, A.jsx)(dc, {})
        })]
      }), (0, A.jsx)(ac, {}), (0, A.jsxs)(`section`, {
        className: `lp-section`,
        children: [(0, A.jsx)(`div`, {
          className: `lp-intro`,
          children: (0, A.jsxs)(`h2`, {
            className: `lp-lead`,
            children: [`Source for every piece,`, (0, A.jsx)(`br`, {}), `code you own`]
          })
        }), (0, A.jsxs)(`div`, {
          className: `lp-bento`,
          children: [(0, A.jsxs)(`article`, {
            className: `lp-tile`,
            children: [(0, A.jsx)(`div`, {
              className: `lp-tile__stage`,
              "aria-hidden": !0,
              children: (0, A.jsx)(ec, {
                slug: o.slug
              })
            }), (0, A.jsx)(`h3`, {
              className: `lp-tile__title`,
              children: `One command, complete source`
            }), (0, A.jsx)(`p`, {
              className: `lp-tile__text`,
              children: `Install with the shadcn CLI or copy it. It installs a local entry point with its required source files, styles and assets.`
            })]
          }), (0, A.jsxs)(`article`, {
            className: `lp-tile`,
            children: [(0, A.jsx)(`div`, {
              className: `lp-tile__stage`,
              "aria-hidden": !0,
              children: (0, A.jsx)(tc, {})
            }), (0, A.jsx)(`h3`, {
              className: `lp-tile__title`,
              children: `Yours to change`
            }), (0, A.jsx)(`p`, {
              className: `lp-tile__text`,
              children: `Plain React and CSS variables. Change a radius or a color, keep the rest.`
            })]
          }), (0, A.jsxs)(`article`, {
            className: `lp-tile`,
            children: [(0, A.jsx)(`div`, {
              className: `lp-tile__stage`,
              "aria-hidden": !0,
              children: (0, A.jsx)(nc, {})
            }), (0, A.jsx)(`h3`, {
              className: `lp-tile__title`,
              children: `Light and dark, built in`
            }), (0, A.jsx)(`p`, {
              className: `lp-tile__text`,
              children: `Every piece follows your theme, and motion respects reduced-motion settings.`
            })]
          })]
        }), (0, A.jsx)(`div`, {
          className: `lp-more`,
          children: (0, A.jsx)(F, {
            to: `/docs/installation`,
            className: `btn btn--secondary lp-btn`,
            children: `Learn more`
          })
        })]
      }), (0, A.jsxs)(`section`, {
        className: `lp-section lp-faq`,
        "aria-labelledby": `lp-faq-title`,
        children: [(0, A.jsxs)(`h2`, {
          id: `lp-faq-title`,
          className: `lp-lead`,
          children: [`Questions,`, (0, A.jsx)(`br`, {}), `answered`]
        }), (0, A.jsx)(qs, {
          faqs: mc
        })]
      })]
    }), (0, A.jsx)(es, {})]
  });
}
var _c = [`kpi-chart`, `notification-stack`, `chat-composer`, `profile-menu`, `thinking-state`, `setup-guide`, `integration-settings`, `smart-recommendation`, `filter-menu`],
  vc = [`glass-folder`, `integration-grid`, `empty-calendar`, `layer-stack`, `team-invite`, `enrichment-orbit`, `side-folder`, `ghosted-chat`, `world-map`],
  yc = (e, t) => t.map(t => e.find(e => e.slug === t)).filter(e => !!e),
  bc = yc(oi, _c),
  xc = yc(ci, vc),
  Sc = bc.flatMap((e, t) => xc[t] ? [e, xc[t]] : [e]),
  Cc = Array.from({
    length: 21
  }, (e, t) => Sc[t % Sc.length]);
function wc() {
  return (0, A.jsxs)(`div`, {
    className: `lp-iso`,
    "aria-hidden": !0,
    inert: !0,
    children: [(0, A.jsx)(`div`, {
      className: `lp-iso__plane`,
      children: (0, A.jsx)(`div`, {
        className: `lp-iso__track`,
        children: [0, 1, 2].map(e => (0, A.jsx)(`div`, {
          className: `lp-iso__grid`,
          children: Cc.map(({
            slug: e
          }, t) => (0, A.jsxs)(`div`, {
            className: `lp-iso__tile`,
            children: [(0, A.jsx)(`img`, {
              className: `lp-iso__img lp-iso__img--light`,
              src: `/assets/landing/iso/${e}-light.webp`,
              alt: ``,
              loading: `lazy`,
              decoding: `async`
            }), (0, A.jsx)(`img`, {
              className: `lp-iso__img lp-iso__img--dark`,
              src: `/assets/landing/iso/${e}-dark.webp`,
              alt: ``,
              loading: `lazy`,
              decoding: `async`
            })]
          }, `${e}-${t}`))
        }, e))
      })
    }), (0, A.jsx)(`div`, {
      className: `lp-iso__blur lp-iso__blur--soft`
    }), (0, A.jsx)(`div`, {
      className: `lp-iso__blur lp-iso__blur--strong`
    }), (0, A.jsx)(`div`, {
      className: `lp-iso__blur lp-iso__blur--bottom`
    })]
  });
}
function Tc({
  loggedIn: e
}) {
  let [t, n] = (0, m.useState)(!1),
    r = (0, m.useRef)(null);
  (0, m.useEffect)(() => {
    if (!t) return;
    let e = e => !r.current?.contains(e.target) && n(!1),
      i = e => e.key === `Escape` && n(!1);
    return document.addEventListener(`mousedown`, e), document.addEventListener(`keydown`, i), () => {
      document.removeEventListener(`mousedown`, e), document.removeEventListener(`keydown`, i);
    };
  }, [t]);
  let i = () => n(!1);
  return (0, A.jsxs)(`div`, {
    className: `lp-mmenu`,
    ref: r,
    children: [(0, A.jsx)(`button`, {
      className: `btn btn--secondary btn--icon lp-mmenu__trigger`,
      "aria-label": t ? `Close menu` : `Open menu`,
      "aria-expanded": t,
      onClick: () => n(e => !e),
      children: (0, A.jsx)(j, {
        icon: t ? Ti : Fi,
        size: 16
      })
    }), t && (0, A.jsxs)(`nav`, {
      className: `lp-mmenu__panel`,
      "aria-label": `Menu`,
      children: [(0, A.jsx)(`span`, {
        className: `lp-mmenu__label`,
        children: `Library`
      }), fc.map(e => (0, A.jsxs)(F, {
        to: e.to,
        className: `lp-mmenu__item`,
        onClick: i,
        children: [(0, A.jsx)(`span`, {
          className: `lp-menu__icon`,
          children: (0, A.jsx)(j, {
            icon: e.icon,
            size: 15
          })
        }), e.label, (0, A.jsx)(`span`, {
          className: `lp-menu__count`,
          children: e.count
        })]
      }, e.to)), (0, A.jsx)(`span`, {
        className: `lp-mmenu__sep`
      }), (0, A.jsx)(F, {
        to: `/docs`,
        className: `lp-mmenu__item lp-mmenu__item--plain`,
        onClick: i,
        children: `Docs`
      }), null, (0, A.jsx)(`a`, {
        className: `lp-mmenu__item lp-mmenu__item--plain`,
        href: k.links.github,
        target: `_blank`,
        rel: `noreferrer`,
        children: `GitHub`
      }), !e && null]
    })]
  });
}
function Ec() {
  let [e, t] = (0, m.useState)(!1),
    n = (0, m.useRef)(null),
    r = (0, m.useRef)(void 0);
  (0, m.useEffect)(() => {
    if (!e) return;
    let r = e => !n.current?.contains(e.target) && t(!1),
      i = e => e.key === `Escape` && t(!1);
    return document.addEventListener(`mousedown`, r), document.addEventListener(`keydown`, i), () => {
      document.removeEventListener(`mousedown`, r), document.removeEventListener(`keydown`, i);
    };
  }, [e]);
  let i = (0, m.useRef)(!1);
  return (0, A.jsxs)(`div`, {
    className: `lp-menu`,
    ref: n,
    onPointerEnter: e => {
      e.pointerType === `mouse` && (window.clearTimeout(r.current), i.current = !0, t(!0));
    },
    onPointerLeave: e => {
      e.pointerType === `mouse` && (i.current = !1, r.current = window.setTimeout(() => t(!1), 120));
    },
    children: [(0, A.jsxs)(`button`, {
      className: `lp-nav__link lp-menu__trigger`,
      "aria-expanded": e,
      "aria-haspopup": `true`,
      onClick: () => t(e => i.current ? !0 : !e),
      children: [`Library`, (0, A.jsx)(j, {
        icon: Ci,
        size: 12
      })]
    }), e && (0, A.jsx)(`div`, {
      className: `lp-menu__panel`,
      children: fc.map(e => (0, A.jsxs)(F, {
        to: e.to,
        className: `lp-menu__item`,
        onClick: () => t(!1),
        children: [(0, A.jsx)(`span`, {
          className: `lp-menu__icon`,
          children: (0, A.jsx)(j, {
            icon: e.icon,
            size: 16
          })
        }), (0, A.jsxs)(`span`, {
          className: `lp-menu__text`,
          children: [(0, A.jsxs)(`strong`, {
            children: [e.label, (0, A.jsx)(`span`, {
              className: `lp-menu__count`,
              children: e.count
            })]
          }), (0, A.jsx)(`span`, {
            children: e.text
          })]
        })]
      }, e.to))
    })]
  });
}
var Dc = (e, t) => (0, m.lazy)(() => e().then(e => ({
    default: e[t]
  }))),
  Oc = Dc(() => i(() => import("./chunks/ComponentPage-BJ-xknJM.js"), __vite__mapDeps([299, 1, 2, 3, 298])), `ComponentPage`),
  Ac = Dc(() => i(() => import("./chunks/DocsPage-BmqCB3xF.js"), __vite__mapDeps([301, 3, 2])), `DocsPage`),
  Lc = [{
    id: `components`,
    label: `Components`,
    count: oi.length
  }, {
    id: `screens`,
    label: `Screens`,
    count: li.length
  }, {
    id: `blocks`,
    label: `Blocks`,
    count: si.length
  }, {
    id: `illustrations`,
    label: `Illustrations`,
    count: ci.length
  }, {
    id: `motion`,
    label: `Motion`,
    count: ui.length
  }].filter(e => e.count > 0);
function Rc() {
  let e = oa(),
    [t, n] = (0, m.useState)(!1),
    r = to(),
    i = no() && r?.plan !== `pro`,
    a = /^\/login\/?$/.test(e),
    o = /^\/contact\/?$/.test(e),
    s = a || o,
    c = zc(e, /^\/account(\/downloads|\/team)?\/?$/),
    l = t => e.match(t)?.[1],
    u = l(/^\/components\/([^/]+)\/?$/),
    d = l(/^\/blocks\/(?!category\/)([^/]+)\/?$/),
    f = l(/^\/illustrations\/(?!category\/)([^/]+)\/?$/),
    p = l(/^\/motion\/(?!category\/)([^/]+)\/?$/),
    h = l(/^\/screens\/(?!category\/)([^/]+)(?:\/full)?\/?$/),
    g = !!h && /\/full\/?$/.test(e),
    _ = u ? oi.find(e => e.slug === u) : d ? si.find(e => e.slug === d) : f ? ci.find(e => e.slug === f) : p ? ui.find(e => e.slug === p) : h ? li.find(e => e.slug === h) : void 0,
    v = e.startsWith(`/blocks`),
    y = e.startsWith(`/illustrations`),
    b = e.startsWith(`/motion`),
    x = e.startsWith(`/screens`),
    S = l(/^\/category\/([^/]+)\/?$/) ?? l(/^\/blocks\/category\/([^/]+)\/?$/) ?? l(/^\/illustrations\/category\/([^/]+)\/?$/) ?? l(/^\/motion\/category\/([^/]+)\/?$/) ?? l(/^\/screens\/category\/([^/]+)\/?$/),
    ee = S ? (v ? vi : y ? yi : b ? xi : x ? bi : _i).find(e => Si(e) === S) : void 0,
    te = v ? si : y ? ci : b ? ui : x ? li : oi,
    ne = e => (v ? `block` : y ? `illustration` : b ? `motion effect` : x ? `screen` : `component`) + (e === 1 ? `` : `s`),
    re = ee ? te.filter(e => e.category === ee) : te,
    C = /^\/pricing\/?$/.test(e),
    ie = /^\/license\/?$/.test(e),
    ae = l(/^\/(terms|privacy|refund|imprint)\/?$/),
    oe = e === `/docs` || e === `/docs/` ? Sa[0].slug : l(/^\/docs\/([^/]+)\/?$/),
    se = oe ? Sa.find(e => e.slug === oe) : void 0,
    ce = e === `/`,
    le = l(/^\/(components|screens|blocks|illustrations|motion)\/?$/),
    ue = !!le,
    de = ue || /^\/(screens|blocks|illustrations|motion)\/?$/.test(e) || !!ee,
    fe = !_ && u ? di.find(e => e.slug === u && e.kind !== `component`) : void 0,
    pe = /^\/pro\/?$/.test(e) || !!fe,
    me = l(/^\/partner\/([a-z0-9_-]{2,32})\/?$/),
    w = !ce && !s && c === null && !_ && !se && !C && !ie && !ae && !de && !pe && !me;
  if ((0, m.useEffect)(() => {
    /^\/pro\/?$/.test(e) ? aa(`/pricing`, !0) : fe && aa(P(fe), !0);
  }, [e, fe]), (0, m.useEffect)(() => {
    let e = e => {
      e.key === `Escape` && n(!1);
    };
    return window.addEventListener(`keydown`, e), () => window.removeEventListener(`keydown`, e);
  }, []), (0, m.useEffect)(() => {
    if (t) return document.documentElement.style.overflow = `hidden`, () => {
      document.documentElement.style.overflow = ``;
    };
  }, [t]), (0, m.useEffect)(() => {
    if (me) return;
    let e = w ? `Page not found` : _?.name ?? ee ?? se?.title ?? (C ? `Pricing` : ie ? `License` : ue ? le[0].toUpperCase() + le.slice(1) : x ? `Screens` : v ? `Blocks` : y ? `Illustrations` : b ? `Motion` : void 0);
    document.title = e ? `${e} · ${k.name}` : ce ? `${k.name} · Agent-ready React UI for AI products` : k.name;
  }, [ce, _, ee, C, ie, ue, le, v, y, b, x, se, w, me]), (0, m.useEffect)(() => {
    let t = document.querySelector(`link[rel="canonical"]`);
    t && (t.href = localText(`__PLICO_ORIGIN__${e === `/` ? `/` : e.replace(/\/$/, ``)}`));
  }, [e]), (0, m.useEffect)(() => {
    le && requestAnimationFrame(() => ra(le, !1));
  }, [le]), g && _) {
    let e = fullScreenPreviews[_.slug] ?? _.Preview;
    return (0, A.jsx)(I.Provider, {
      value: !0,
      children: (0, A.jsx)(m.Suspense, {
        fallback: null,
        children: (0, A.jsx)(e, {})
      })
    });
  }
  return me ? (0, A.jsx)(m.Suspense, {
    fallback: null,
    children: (0, A.jsx)(Ic, {
      code: me
    })
  }) : ce ? (0, A.jsxs)(A.Fragment, {
    children: [i && (0, A.jsx)(fs, {}), (0, A.jsx)(gc, {}), (0, A.jsx)(Ko, {})]
  }) : (0, A.jsxs)(A.Fragment, {
    children: [!s && i && (0, A.jsx)(fs, {}), !s && (0, A.jsx)(vs, {}), (0, A.jsx)(Ko, {}), (0, A.jsx)(Us, {}), (0, A.jsxs)(`div`, {
      className: `shell`,
      "data-focus": s || void 0,
      children: [(0, A.jsx)(za, {
        open: t,
        path: e,
        onClose: () => n(!1)
      }), t && (0, A.jsx)(`div`, {
        className: `scrim`,
        onClick: () => n(!1)
      }), (0, A.jsxs)(`div`, {
        className: `main-col`,
        children: [(0, A.jsxs)(`main`, {
          className: `panel`,
          children: [(0, A.jsxs)(`header`, {
            className: `topbar`,
            children: [(0, A.jsx)(`button`, {
              className: `icon-btn topbar__menu`,
              "aria-label": `Open sidebar`,
              onClick: () => n(!0),
              children: (0, A.jsx)(j, {
                icon: Fi
              })
            }), (0, A.jsx)(`span`, {
              className: `topbar__name`,
              children: k.name
            }), (0, A.jsxs)(`div`, {
              className: `topbar__links`,
              children: [(0, A.jsx)(as, {}), (0, A.jsx)(ls, {}), r?.plan !== `pro` && (0, A.jsx)(us, {}), r ? (0, A.jsx)(Gs, {
                user: r
              }) : null]
            })]
          }), (0, A.jsx)(m.Suspense, {
            fallback: (0, A.jsx)(`div`, {
              className: `content`,
              "aria-busy": `true`
            }),
            children: w ? (0, A.jsx)(`div`, {
              className: `content`,
              children: (0, A.jsx)(Ks, {})
            }) : a ? (0, A.jsx)(`div`, {
              className: `content`,
              children: (0, A.jsx)(jc, {})
            }) : o ? (0, A.jsx)(`div`, {
              className: `content`,
              children: (0, A.jsx)(Mc, {})
            }) : c === null ? _ ? (0, A.jsx)(`div`, {
              className: `content content--doc`,
              children: (0, A.jsx)(Oc, {
                entry: _
              }, _.slug)
            }) : se ? (0, A.jsx)(`div`, {
              className: `content content--doc`,
              children: (0, A.jsx)(Ac, {
                page: se
              }, se.slug)
            }) : C ? (0, A.jsx)(`div`, {
              className: `content`,
              children: (0, A.jsx)(kc, {})
            }) : ie ? (0, A.jsx)(`div`, {
              className: `content`,
              children: (0, A.jsx)(Pc, {})
            }) : ae ? (0, A.jsx)(`div`, {
              className: `content`,
              children: (0, A.jsx)(Nc, {
                slug: ae
              }, ae)
            }) : (0, A.jsxs)(`div`, {
              className: `content`,
              children: [!ue && (ee || x || v || y || b) ? (0, A.jsxs)(`header`, {
                className: `page-head`,
                children: [(0, A.jsx)(`h1`, {
                  className: `page-head__title`,
                  children: ee ?? (x ? `Screens` : v ? `Blocks` : y ? `Illustrations` : `Motion`)
                }), (0, A.jsxs)(`span`, {
                  className: `page-head__count`,
                  children: [re.length, ` `, ne(re.length)]
                })]
              }) : (0, A.jsx)(Ba, {}), ue ? (0, A.jsxs)(A.Fragment, {
                children: [(0, A.jsx)(B, {
                  tabs: Lc,
                  after: {
                    id: `components`,
                    node: (0, A.jsx)(La, {
                      compact: !0,
                      iconsOnly: !0
                    })
                  }
                }), (0, A.jsxs)(`section`, {
                  id: `components`,
                  className: `library`,
                  children: [(0, A.jsxs)(`h2`, {
                    className: `library__title`,
                    children: [(0, A.jsx)(F, {
                      to: `/components`,
                      children: `Components`
                    }), (0, A.jsx)(`span`, {
                      children: oi.length
                    })]
                  }), (0, A.jsx)(`div`, {
                    className: `grid`,
                    children: oi.map(e => (0, A.jsx)(qo, {
                      entry: e
                    }, e.slug))
                  })]
                }), (0, A.jsxs)(`section`, {
                  id: `screens`,
                  className: `library library--next`,
                  children: [(0, A.jsxs)(`h2`, {
                    className: `library__title`,
                    children: [(0, A.jsx)(F, {
                      to: `/screens`,
                      children: `Screens`
                    }), (0, A.jsx)(`span`, {
                      children: li.length
                    })]
                  }), (0, A.jsx)(`div`, {
                    className: `grid grid--screens`,
                    children: li.map(e => (0, A.jsx)(qo, {
                      entry: e
                    }, e.slug))
                  })]
                }), (0, A.jsxs)(`section`, {
                  id: `blocks`,
                  className: `library library--next`,
                  children: [(0, A.jsxs)(`h2`, {
                    className: `library__title`,
                    children: [(0, A.jsx)(F, {
                      to: `/blocks`,
                      children: `Blocks`
                    }), (0, A.jsx)(`span`, {
                      children: si.length
                    })]
                  }), (0, A.jsx)(`div`, {
                    className: `grid grid--blocks`,
                    children: si.map(e => (0, A.jsx)(qo, {
                      entry: e
                    }, e.slug))
                  })]
                }), (0, A.jsxs)(`section`, {
                  id: `illustrations`,
                  className: `library library--next`,
                  children: [(0, A.jsxs)(`h2`, {
                    className: `library__title`,
                    children: [(0, A.jsx)(F, {
                      to: `/illustrations`,
                      children: `Illustrations`
                    }), (0, A.jsx)(`span`, {
                      children: ci.length
                    })]
                  }), (0, A.jsx)(`div`, {
                    className: `grid grid--blocks`,
                    children: ci.map(e => (0, A.jsx)(qo, {
                      entry: e
                    }, e.slug))
                  })]
                }), ui.length > 0 && (0, A.jsxs)(`section`, {
                  id: `motion`,
                  className: `library library--next`,
                  children: [(0, A.jsxs)(`h2`, {
                    className: `library__title`,
                    children: [(0, A.jsx)(F, {
                      to: `/motion`,
                      children: `Motion`
                    }), (0, A.jsx)(`span`, {
                      children: ui.length
                    })]
                  }), (0, A.jsx)(`div`, {
                    className: `grid`,
                    children: ui.map(e => (0, A.jsx)(qo, {
                      entry: e
                    }, e.slug))
                  })]
                })]
              }) : (0, A.jsxs)(`section`, {
                id: `components`,
                className: `library`,
                children: [!(x || v || y || b) && (0, A.jsx)(`div`, {
                  className: `library__bar`,
                  children: (0, A.jsx)(La, {})
                }), (0, A.jsx)(`div`, {
                  className: x ? `grid grid--screens` : v || y ? `grid grid--blocks` : `grid`,
                  children: re.map(e => (0, A.jsx)(qo, {
                    entry: e
                  }, e.slug))
                })]
              })]
            }) : (0, A.jsx)(`div`, {
              className: `content`,
              children: r ? (0, A.jsx)(Fc, {
                user: r,
                tab: c === `/downloads` ? `downloads` : c === `/team` ? `team` : `account`
              }) : (0, A.jsx)(jc, {})
            })
          })]
        }), !s && (0, A.jsx)(es, {})]
      })]
    })]
  });
}
function zc(e, t) {
  let n = e.match(t);
  return n ? n[1] ?? `` : null;
}
export {di as $,F as A,j as B,Qa as C,Pa as D,Ra as E,Yi as F,Di as G,zi as H,Xi as I,Ci as J,Ti as K,qi as L,aa as M,ia as N,Na as O,M as P,k as Q,Ji as R,Xa as S,Ya as T,Ri as U,Bi as V,Ii as W,hi as X,pi as Y,mi as Z,co as _,us as a,$a as b,rs as c,Qo as d,si as et,Ho as f,vo as g,Po as h,Ns as i,li as it,P as j,Ca as k,Jo as l,Lo as m,qs as n,ui as nt,ds as o,Fo as p,wi as q,Vs as r,oi as rt,as as s,Xs as t,ci as tt,Zo as u,io as v,to as w,Ja as x,Za as y,Vi as z};
export {SourceFiles,sourceFilename,InstallSourcePanel};
export default Rc;

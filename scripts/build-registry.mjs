/** Build portable source registry payloads from the checked-in library. */
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
import {createRequire} from 'node:module';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..'),require=createRequire(path.join(root,'package.json'));
const parser=await import(require.resolve('@babel/parser'));
const manifest=JSON.parse(fs.readFileSync(path.join(root,'registry/library-manifest.json'),'utf8'));
const out=path.join(root,'public/r');fs.mkdirSync(out,{recursive:true});
function resolveImport(from,specifier){const base=path.resolve(path.dirname(from),specifier);for(const file of [base,...['.jsx','.js','.tsx','.ts'].map(ext=>base+ext),...['index.jsx','index.tsx','index.js','index.ts'].map(name=>path.join(base,name))])if(fs.existsSync(file)&&fs.statSync(file).isFile())return file;throw new Error(`Missing local import ${specifier} from ${from}`);}
function closure(entry){const found=new Set(),external=new Set();function visit(file){if(found.has(file))return;found.add(file);const source=fs.readFileSync(file,'utf8'),ast=parser.parse(source,{sourceType:'module',plugins:['jsx',...(file.endsWith('.tsx')||file.endsWith('.ts')?['typescript']:[])]});for(const node of ast.program.body){if(!['ImportDeclaration','ExportNamedDeclaration','ExportAllDeclaration'].includes(node.type)||!node.source)continue;const specifier=node.source.value;if(specifier.startsWith('.'))visit(resolveImport(file,specifier));else external.add(specifier.split('/').slice(0,specifier.startsWith('@')?2:1).join('/'));}}visit(entry);return {files:[...found].sort(),external:[...external].filter(name=>!['react','react-dom'].includes(name)).sort()};}
function exportedAPI(file,seen=new Set()){
  if(seen.has(file))return {runtime:new Set(),types:new Set()};seen.add(file);
  const ast=parser.parse(fs.readFileSync(file,'utf8'),{sourceType:'module',plugins:['jsx',...(file.endsWith('.tsx')||file.endsWith('.ts')?['typescript']:[])]}),runtime=new Set(),types=new Set();
  for(const node of ast.program.body){
    if(node.type==='ExportDefaultDeclaration')runtime.add('default');
    if(node.type==='ExportAllDeclaration'&&node.source.value.startsWith('.')){const nested=exportedAPI(resolveImport(file,node.source.value),seen);for(const name of nested.runtime)if(name!=='default')runtime.add(name);for(const name of nested.types)types.add(name);}
    if(node.type!=='ExportNamedDeclaration')continue;
    if(node.declaration){const d=node.declaration,target=node.exportKind==='type'||/^TS(?:TypeAlias|Interface)/.test(d.type)?types:runtime;if(d.id)target.add(d.id.name);for(const variable of d.declarations||[])if(variable.id.type==='Identifier')target.add(variable.id.name);}
    for(const spec of node.specifiers||[]){const name=spec.exported.name||spec.exported.value;(node.exportKind==='type'||spec.exportKind==='type'?types:runtime).add(name);}
  }
  return {runtime,types};
}
const items=[];
for(const entry of manifest.entries){const graph=closure(path.join(root,entry.publicEntry||entry.entry)),api=exportedAPI(path.join(root,entry.publicEntry||entry.entry));entry.exports=[...api.runtime].sort();entry.typeExports=[...api.types].sort();if(entry.license==='MIT')graph.files.push(path.join(root,path.dirname(entry.entry),'LICENSE'));const name=entry.sourceSlug,type=['blocks','screens'].includes(entry.section)?'registry:block':'registry:component';const files=graph.files.map(file=>{const relative=path.relative(path.join(root,'src/library'),file).replaceAll(path.sep,'/'),content=fs.readFileSync(file,'utf8');return {path:'src/library/'+relative,type:path.basename(file)==='LICENSE'?'registry:file':'registry:component',target:`@components/plico/${name}/${relative===name+'.jsx'?'index.jsx':relative}`,content};});const item={$schema:'https://ui.shadcn.com/schema/registry-item.json',name,type,title:entry.title+(entry.variant==='clean'?' · Clean':''),description:`${entry.title} for React. Includes a client component and interactive demo.`,dependencies:graph.external,registryDependencies:[],files,meta:{namespace:'@plico',section:entry.section,slug:entry.slug,variant:entry.variant,entrypoint:`@components/plico/${name}/index.jsx`,main:`@components/plico/${name}/index.jsx`,primaryFile:`@components/plico/${name}/${path.relative(path.join(root,'src/library'),path.join(root,entry.primaryEntry)).replaceAll(path.sep,'/')}`,exports:entry.exports,...(entry.typeExports.length?{typeExports:entry.typeExports}:{}),react:'>=19',...(entry.license?{license:entry.license}:{})}};fs.writeFileSync(path.join(out,name+'.json'),JSON.stringify(item,null,2)+'\n');items.push({...item,files:files.map(({content,...file})=>file)});}
function siteHomepage(){
  const candidates=[{value:process.env.NEXT_PUBLIC_SITE_URL,production:false},{value:process.env.VERCEL_PROJECT_PRODUCTION_URL,production:true}];
  for(const {value,production} of candidates){
    if(!value?.trim())continue;
    try{
      const raw=value.trim(),url=new URL(production&&!/^https?:\/\//i.test(raw)?'https://'+raw:raw);
      if(!['http:','https:'].includes(url.protocol)||!url.hostname||url.username||url.password)continue;
      if(production)url.protocol='https:';
      url.search='';url.hash='';
      return url.toString().replace(/\/$/,'');
    }catch{}
  }
  return 'http://127.0.0.1:4210';
}
fs.writeFileSync(path.join(root,'registry/library-manifest.json'),JSON.stringify(manifest,null,2)+'\n');
const registry={$schema:'https://ui.shadcn.com/schema/registry.json',name:'@plico',homepage:siteHomepage(),items};
fs.writeFileSync(path.join(root,'registry/registry.json'),JSON.stringify(registry,null,2)+'\n');
fs.writeFileSync(path.join(out,'registry.json'),JSON.stringify(registry,null,2)+'\n');
const coverage={entries:new Set(manifest.entries.map(item=>item.section+'/'+item.slug)).size,variants:manifest.entries.length,fullScreenMappings:manifest.entries.filter(item=>item.section==='screens').map(item=>({slug:item.slug,entry:item.publicEntry,export:'FullScreen'})),registryFiles:items.reduce((sum,item)=>sum+item.files.length,0),items:items.map(item=>({name:item.name,files:item.files.length,sha256:createHash('sha256').update(fs.readFileSync(path.join(out,item.name+'.json'))).digest('hex')}))};fs.writeFileSync(path.join(root,'registry/coverage.json'),JSON.stringify(coverage,null,2)+'\n');console.log(JSON.stringify({entries:coverage.entries,variants:coverage.variants,fullScreenMappings:coverage.fullScreenMappings.length,registryFiles:coverage.registryFiles},null,2));

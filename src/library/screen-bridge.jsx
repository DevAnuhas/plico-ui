"use client";
import * as React from "react";
export const ScreenFrameModeContext = React.createContext(null);
export function PreviewFrame({ children }) {
  const mode = React.useContext(ScreenFrameModeContext);
  const full = mode ?? (typeof window !== "undefined" && /\/full\/?$/.test(window.location.pathname));
  const ref = React.useRef(null);
  const [scale, setScale] = React.useState(0);
  React.useLayoutEffect(() => {
    const element = ref.current;
    if (!element || full) return;
    const resize = () => setScale(element.clientWidth / 1440);
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(element);
    return () => observer.disconnect();
  }, [full]);
  return <><style href="plico-screen-frame" precedence="default">{`.screen-stage{position:relative;width:100%;overflow:hidden;isolation:isolate}.screen-stage__canvas{position:absolute;inset:0 auto auto 0;transform-origin:top left}.screen-full{width:100%;height:100dvh;overflow:hidden}.screen-full>.ui-as-app{height:100%;min-height:0;border-radius:0}.screen-full>.screen-full{height:100%}`}</style>{full ? <div className="screen-full">{children}</div> : <div ref={ref} className="screen-stage" style={{aspectRatio:"1440 / 900"}}>{scale>0&&<div className="screen-stage__canvas" style={{width:1440,height:900,transform:`scale(${scale})`}}>{children}</div>}</div>}</>;
}
const projects=["Q3 Campaign","Brand assets","Hiring","Research"];
const routes={"New chat":"assistant-home",Folders:"files",Integrations:"integrations",Chat:"agent-chat",Companies:"crm",Revenue:"analytics",Analytics:"analytics",Runs:"agent-run",Evals:"evals",Settings:"settings-billing"};
export function navigateScreen(label){
  const project=projects.includes(label),slug=routes[label]??(project?"folder":null);
  if(!slug)return;
  const full=/\/full\/?$/.test(window.location.pathname);
  const url=`/screens/${slug}${full?"/full":""}${project?`?folder=${encodeURIComponent(label)}`:""}`;
  window.history.pushState(null,"",url);
  window.dispatchEvent(new PopStateEvent("popstate"));
  window.dispatchEvent(new Event("screen-query"));
}
export function useFolderQuery(){
  const read=()=>typeof window==="undefined"?undefined:new URLSearchParams(window.location.search).get("folder")??undefined;
  const [folder,setFolder]=React.useState(read);
  React.useEffect(()=>{const changed=()=>setFolder(read());window.addEventListener("screen-query",changed);window.addEventListener("popstate",changed);return()=>{window.removeEventListener("screen-query",changed);window.removeEventListener("popstate",changed);};},[]);
  return folder;
}

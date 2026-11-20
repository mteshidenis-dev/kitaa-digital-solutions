import{j as e}from"./vendor-motion-BiCCMODA.js";import{r as p,L as u}from"./vendor-react-CqhOsFqI.js";import{e as c,q as l}from"./index-CKxOJSwN.js";/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const f=c("ChevronRight",[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g=c("House",[["path",{d:"M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8",key:"5wwlr5"}],["path",{d:"M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",key:"1d0kgt"}]]),j="https://kitaadigitalsolutions.tech",y=({items:r,variant:n="dark",className:i})=>{p.useEffect(()=>{const s={"@context":"https://schema.org","@type":"BreadcrumbList",itemListElement:r.map((o,x)=>({"@type":"ListItem",position:x+1,name:o.label,...o.href?{item:`${j}${o.href}`}:{}}))},t="breadcrumb-jsonld";let a=document.getElementById(t);return a||(a=document.createElement("script"),a.id=t,a.type="application/ld+json",document.head.appendChild(a)),a.textContent=JSON.stringify(s),()=>{document.getElementById(t)?.remove()}},[r]);const d=n==="dark"?"text-white/50 hover:text-white/85 transition-colors":"text-muted-foreground hover:text-foreground transition-colors",m=n==="dark"?"text-white/80 font-medium":"font-medium text-foreground",h=n==="dark"?"text-white/25":"text-muted-foreground/40";return e.jsx("nav",{"aria-label":"breadcrumb",className:l("text-left",i),children:e.jsx("ol",{className:"flex flex-wrap items-center gap-1.5 text-xs",children:r.map((s,t)=>e.jsxs("li",{className:"inline-flex items-center gap-1.5",children:[t>0&&e.jsx(f,{className:l("h-3 w-3 flex-shrink-0",h)}),s.href?e.jsx(u,{to:s.href,className:d,children:t===0?e.jsxs("span",{className:"flex items-center gap-1",children:[e.jsx(g,{className:"h-3 w-3"}),e.jsx("span",{className:"sr-only",children:"Home"})]}):s.label}):e.jsx("span",{className:m,children:s.label})]},t))})})};export{y as P};

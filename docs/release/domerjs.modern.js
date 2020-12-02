import{nanoid as t}from"nanoid";const e=[];let n="";const o=(t,e)=>Array.isArray(t)?-1!==t.indexOf(e):t===e;function r(){return window.location.pathname.replace(n,"")}function s(){const t=r(),n=e.every(({path:e})=>!o(e,t));e.forEach(e=>{const{path:r,element:s,parent:i=window.document.body}=e;o(r,t)||n&&o(r,"")?i.append(s):i.contains(s)&&s.remove()})}function i(t){const e=`${n}${t}`;window.history.pushState({path:e},"",e),s();const o=t.indexOf("#");if(-1!==o){const e=t.substring(o+1),n=window.document.getElementById(e);n&&window.scrollTo(0,n.offsetTop)}}window.addEventListener("popstate",()=>s());var a={__proto__:null,set:function(t,n,o){e.push({path:t,element:n,parent:o})},setBaseUrl:function(t){n=t},currentPath:r,apply:s,setRouteEl:function(t,e){return"A"===t.tagName&&(t.href=e),t.addEventListener("click",t=>{t.preventDefault(),i(e)}),t},push:i};const c=window.__cache||[],p=[];let l=1e5;function u(t,e,n=l){return new Promise(o=>{const r=c.find(e=>e.url===t);r&&Date.now()-n<r.time?o(e(r.data)):fetch(t).then(n=>{n.json().then(n=>{r?(r.data=n,r.time=Date.now()):c.push({url:t,data:n,time:Date.now()}),o(e(n))})})})}var d={__proto__:null,cache:c,setOptions:function(t){"number"==typeof t.refresh&&(l=t.refresh)},attach:function(t,e,n=l){p.push({url:t,func:e,refresh:n})},detach:function(t){const e=p.findIndex(e=>e.url===t);-1!==e&&p.splice(e,1)},apply:function(){const t=p.map(({url:t,func:e,refresh:n})=>u(t,e,n));return Promise.all(t)},get:u};function f(){return(f=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(t[o]=n[o])}return t}).apply(this,arguments)}function h(t){for(;t.hasChildNodes();)t.removeChild(t.lastChild)}var y={__proto__:null,replaceStringArgs:function(t,e){let n=t;return Object.keys(e).forEach(t=>{let o="";o="function"==typeof e[t]?e[t]():e[t],n=n.replace(`{{${t}}}`,e[t])}),n},applyValue:function t(e,...n){return"function"==typeof e?t(e(),...n):e},emptyChilds:h};let _=window.__ssr||[];const w=[];let m=0;function v(e,n={}){const{attrs:o={},events:r={},dataset:s={},classList:i=[],updateOn:a}=n;let c=null;if(window.isServer)c=window.document.createElement(e),c.__id=t(6),c.dataset.ssrId=c.__id,_.push({id:c.__id,i:m});else{const n=_.find(({i:t})=>t===m);n&&(c=window.document.querySelector(`[data-ssr-id="${n.id}"]`),c&&(c.__id=n.id)),c||(c=window.document.createElement(e),c.__id=t(6))}return w.push({el:c,options:n}),m++,A(c),Object.keys(o).forEach(t=>c.setAttribute(t,o[t])),"string"==typeof i?c.classList.add(i):Array.isArray(i)&&i.forEach(t=>c.classList.add(t)),Object.keys(s).forEach(t=>c.dataset[t]=s[t]),Object.keys(r).forEach(t=>c.addEventListener(t,r[t])),a&&j(a,c),c}function E(t,e,n="div"){return v(n,{classList:t,value:e})}function S(t,e=!1){const n=(t,e)=>t.__id===e.__id;if(e)return w.findIndex(e=>n(e.el,t));{const e=w.find(e=>n(e.el,t));if(e)return e.options}}const g=["INPUT","TEXTAREA"];function A(t,e){e&&function(t,e){const n=S(t,!0);-1!==n&&(w[n].options=f({},w[n].options,e))}(t,e);const{value:n,html:o}=S(t);!function t(e,n,o){if(n)if("function"!=typeof n){if("object"==typeof n)return h(e),void(Array.isArray(n)?n.forEach(t=>e.append(t)):e.append(n));-1===g.indexOf(e.tagName)?o?e.innerHTML=n:e.textContent=n:e.value=n}else{const r=n(e);r&&t(e,r,o)}}(t,n,o)}const O=[],b={};function j(t,e){Array.isArray(t)?t.forEach(t=>j(t,e)):Array.isArray(e)?e.forEach(e=>j(t,e)):O.push({key:t,el:e})}var x={__proto__:null,assign:j,set:function(t,e){b[t]={updateFunc:e}},apply:function(t,e){let n=e;const o=b[t];o&&(n=o.updateFunc),O.filter(e=>e.key===t).forEach(({el:t})=>{"function"==typeof n?n(t):A(t)})}};const{Element:L}=window,k=L.prototype.append;L.prototype.append=function(){k.apply(this,[...arguments].filter(t=>!t.parentElement))};const C=L.prototype.appendChild;L.prototype.appendChild=function(){arguments.parentElement||C.apply(this,arguments)};var T=t=>{const{src:e,stylesheet:n,baseUrl:o="http://localhost"}=t,r=v("link",{attrs:{rel:"stylesheet",href:n},useSSR:!1}),s=v("script",{attrs:{src:e},useSSR:!1}),i=v("script",{attrs:{type:"text/javascript"},value:"window.__ssr = "+JSON.stringify(_),useSSR:!1}),a=v("script",{attrs:{type:"text/javascript"},useSSR:!1});return{setUrl:t=>jsdom.reconfigure({url:"http://localhost"+t}),toHtml(){const{document:t}=window;return A(a,"window.__cache = "+JSON.stringify(c)),console.log(i.parentElement),t.head.append(r),t.body.append(i,a,s),"<!DOCTYPE html>"+t.documentElement.outerHTML}}};export{T as SSR,d as fetcher,y as helpers,v as newEl,E as newElClass,a as router,A as updateEl,x as updater};
//# sourceMappingURL=domerjs.modern.js.map

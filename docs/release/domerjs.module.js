import{nanoid as t}from"nanoid";var e=[],n="",r=function(t,e){return Array.isArray(t)?-1!==t.indexOf(e):t===e};function o(){var t=window.location.pathname.replace(n,""),o=e.every(function(e){return!r(e.path,t)});e.forEach(function(e){var n=e.path,i=e.element,a=e.parent,u=void 0===a?window.document.body:a;r(n,t)||o&&r(n,"")?u.append(i):u.contains(i)&&i.remove()})}function i(t){var e=""+n+t;window.history.pushState({path:e},"",e),o();var r=t.indexOf("#");if(-1!==r){var i=t.substring(r+1),a=window.document.getElementById(i);a&&window.scrollTo(0,a.offsetTop)}}window.addEventListener("popstate",function(){return o()});var a={__proto__:null,set:function(t,n,r){e.push({path:t,element:n,parent:r})},setBaseUrl:function(t){n=t},apply:o,setRouteEl:function(t,e){return"A"===t.tagName&&(t.href=e),t.addEventListener("click",function(t){t.preventDefault(),i(e)}),t},push:i},u=window.__cache||[],c=[],s=1e5;function f(t,e,n){return void 0===n&&(n=s),new Promise(function(r){var o=u.find(function(e){return e.url===t});o&&Date.now()-n<o.time?r(e(o.data)):fetch(t).then(function(n){n.json().then(function(n){o?(o.data=n,o.time=Date.now()):u.push({url:t,data:n,time:Date.now()}),r(e(n))})})})}var d={__proto__:null,cache:u,setOptions:function(t){"number"==typeof t.refresh&&(s=t.refresh)},attach:function(t,e,n){void 0===n&&(n=s),c.push({url:t,func:e,refresh:n})},detach:function(t){var e=c.findIndex(function(e){return e.url===t});-1!==e&&c.splice(e,1)},apply:function(){var t=c.map(function(t){return f(t.url,t.func,t.refresh)});return Promise.all(t)},get:f},l=window.__ssr||[],p=0;function v(e,n){void 0===n&&(n={});var r=null,o=n.attrs,i=void 0===o?{}:o,a=n.events,u=void 0===a?{}:a,c=n.dataset,s=void 0===c?{}:c,f=n.classList,d=void 0===f?[]:f,v=n.value,h=n.html,y=n.updateOn,w=n.useSSR,E=void 0===w||w,S={};if(E&&window.isServer)(r=window.document.createElement(e)).id=t(5),l.push({id:r.id,i:p});else{var g=l.find(function(t){return t.i===p});g&&(r=window.document.getElementById(g.id)),r||(r=window.document.createElement(e))}return window.isServer&&!E&&(S.append=!1),p++,S.render={value:v,html:h},r.data=S,m(r),Object.keys(i).forEach(function(t){return r.setAttribute(t,i[t])}),"string"==typeof d?r.classList.add(d):Array.isArray(d)&&d.forEach(function(t){return r.classList.add(t)}),Object.keys(s).forEach(function(t){return r.dataset[t]=s[t]}),Object.keys(u).forEach(function(t){return r.addEventListener(t,u[t])}),y&&_(y,r),r}function h(t,e,n){return void 0===n&&(n="div"),v(n,{classList:t,value:e})}var y=["INPUT","TEXTAREA"];function m(t,e){var n=t.data.render,r=n.value,o=n.html;if(e&&(r=e),r)if("function"!=typeof r)-1===y.indexOf(t.tagName)?o?t.innerHTML=r:t.textContent=r:t.value=r;else{var i=r(t);i&&m(t,i)}}var w=[],E={};function _(t,e){Array.isArray(t)?t.forEach(function(t){return _(t,e)}):Array.isArray(e)?e.forEach(function(e){return _(t,e)}):w.push({key:t,el:e})}var S={__proto__:null,assign:_,set:function(t,e){E[t]={updateFunc:e}},apply:function(t,e){var n=e,r=E[t];r&&(n=r.updateFunc),w.filter(function(e){return e.key===t}).forEach(function(t){var e=t.el;"function"==typeof n?n(e):m(e)})}},g={__proto__:null,replaceStringArgs:function(t,e){var n=t;return Object.keys(e).forEach(function(t){"function"==typeof e[t]&&e[t](),n=n.replace("{{"+t+"}}",e[t])}),n},applyValue:function t(e){if("function"==typeof e){var n=e();return t.apply(void 0,[n].concat([].slice.call(arguments,1)))}return e},emptyChilds:function(t){for(;t.hasChildNodes();)t.removeChild(t.lastChild)}},A=window.Element,O=A.prototype.append;A.prototype.append=function(){O.apply(this,Array.prototype.slice.call(arguments).filter(function(t){return!t.parentElement}))};var b=A.prototype.appendChild;A.prototype.appendChild=function(){arguments.parentElement||b.apply(this,arguments)};var L=function(t){var e=t.src,n=v("link",{attrs:{rel:"stylesheet",href:t.stylesheet},useSSR:!1}),r=v("script",{attrs:{src:e},useSSR:!1}),o=v("script",{attrs:{type:"text/javascript"},value:"window.__ssr = "+JSON.stringify(l),useSSR:!1}),i=v("script",{attrs:{type:"text/javascript"},useSSR:!1});return{setUrl:function(t){return jsdom.reconfigure({url:"http://localhost"+t})},toHtml:function(){var t=window.document;return m(i,"window.__cache = "+JSON.stringify(u)),console.log(o.parentElement),t.head.append(n),t.body.append(o,i,r),"<!DOCTYPE html>"+t.documentElement.outerHTML}}};export{L as SSR,d as fetcher,g as helpers,v as newEl,h as newElClass,a as router,m as updateEl,S as updater};
//# sourceMappingURL=domerjs.module.js.map

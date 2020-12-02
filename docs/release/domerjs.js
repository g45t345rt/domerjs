var t=require("nanoid"),e=[],n="",r=function(t,e){return Array.isArray(t)?-1!==t.indexOf(e):t===e};function o(){return window.location.pathname.replace(n,"")}function i(){var t=o(),n=e.every(function(e){return!r(e.path,t)});e.forEach(function(e){var o=e.path,i=e.element,a=e.parent,u=void 0===a?window.document.body:a;r(o,t)||n&&r(o,"")?u.append(i):u.contains(i)&&i.remove()})}function a(t){var e=""+n+t;window.history.pushState({path:e},"",e),i();var r=t.indexOf("#");if(-1!==r){var o=t.substring(r+1),a=window.document.getElementById(o);a&&window.scrollTo(0,a.offsetTop)}}window.addEventListener("popstate",function(){return i()});var u={__proto__:null,set:function(t,n,r){e.push({path:t,element:n,parent:r})},setBaseUrl:function(t){n=t},currentPath:o,apply:i,setRouteEl:function(t,e){return"A"===t.tagName&&(t.href=e),t.addEventListener("click",function(t){t.preventDefault(),a(e)}),t},push:a},c=window.__cache||[],s=[],p=1e5;function d(t,e,n){return void 0===n&&(n=p),new Promise(function(r){var o=c.find(function(e){return e.url===t});o&&Date.now()-n<o.time?r(e(o.data)):fetch(t).then(function(n){n.json().then(function(n){o?(o.data=n,o.time=Date.now()):c.push({url:t,data:n,time:Date.now()}),r(e(n))})})})}var f={__proto__:null,cache:c,setOptions:function(t){"number"==typeof t.refresh&&(p=t.refresh)},attach:function(t,e,n){void 0===n&&(n=p),s.push({url:t,func:e,refresh:n})},detach:function(t){var e=s.findIndex(function(e){return e.url===t});-1!==e&&s.splice(e,1)},apply:function(){var t=s.map(function(t){return d(t.url,t.func,t.refresh)});return Promise.all(t)},get:d};function l(t){for(;t.hasChildNodes();)t.removeChild(t.lastChild)}var h={__proto__:null,replaceStringArgs:function(t,e){var n=t;return Object.keys(e).forEach(function(t){"function"==typeof e[t]&&e[t](),n=n.replace("{{"+t+"}}",e[t])}),n},applyValue:function t(e){if("function"==typeof e){var n=e();return t.apply(void 0,[n].concat([].slice.call(arguments,1)))}return e},emptyChilds:l},v=window.__ssr||[],y=[],w=0;function m(e,n){void 0===n&&(n={});var r=n.attrs,o=void 0===r?{}:r,i=n.events,a=void 0===i?{}:i,u=n.dataset,c=void 0===u?{}:u,s=n.classList,p=void 0===s?[]:s,d=n.value,f=n.html,l=n.updateKeys,h=null;if(window.isServer)(h=window.document.createElement(e)).__id=t.nanoid(6),h.dataset.ssrId=h.__id,v.push({id:h.__id,i:w});else{var m=v.find(function(t){return t.i===w});m&&(h=window.document.querySelector('[data-ssr-id="'+m.id+'"]'))&&(h.__id=m.id),h||((h=window.document.createElement(e)).__id=t.nanoid(6))}return Object.keys(o).forEach(function(t){return h.setAttribute(t,o[t])}),"string"==typeof p?h.classList.add(p):Array.isArray(p)&&p.forEach(function(t){return h.classList.add(t)}),Object.keys(c).forEach(function(t){return h.dataset[t]=c[t]}),Object.keys(a).forEach(function(t){return h.addEventListener(t,a[t])}),l&&A(l,h),y.push({el:h,value:d,html:f}),w++,E(h),h}var _=["INPUT","TEXTAREA"];function E(t,e,n){var r=y.find(function(e){return e.el.__id===t.__id});e&&(r.value=e,e&&(r.html=n)),function t(e,n,r){if(n)if("function"!=typeof n){if("object"==typeof n)return l(e),void(Array.isArray(n)?n.forEach(function(t){return e.append(t)}):e.append(n));-1===_.indexOf(e.tagName)?r?e.innerHTML=n:e.textContent=n:e.value=n}else{var o=n(e);o&&t(e,o,r)}}(t,r.value,r.html)}var x=[],S={};function A(t,e){Array.isArray(t)?t.forEach(function(t){return A(t,e)}):Array.isArray(e)?e.forEach(function(e){return A(t,e)}):x.push({key:t,el:e})}var g=window.Element,O=g.prototype.append;g.prototype.append=function(){O.apply(this,Array.prototype.slice.call(arguments).filter(function(t){return!t.parentElement}))};var b=g.prototype.appendChild;g.prototype.appendChild=function(){arguments.parentElement||b.apply(this,arguments)},exports.SSR=function(t){var e=t.src,n=m("link",{attrs:{rel:"stylesheet",href:t.stylesheet},useSSR:!1}),r=m("script",{attrs:{src:e},useSSR:!1}),o=m("script",{attrs:{type:"text/javascript"},value:"window.__ssr = "+JSON.stringify(v),useSSR:!1}),i=m("script",{attrs:{type:"text/javascript"},useSSR:!1});return{setUrl:function(t){return jsdom.reconfigure({url:"http://localhost"+t})},toHtml:function(){var t=window.document;return E(i,"window.__cache = "+JSON.stringify(c)),console.log(o.parentElement),t.head.append(n),t.body.append(o,i,r),"<!DOCTYPE html>"+t.documentElement.outerHTML}}},exports.fetcher=f,exports.helpers=h,exports.newEl=m,exports.newElClass=function(t,e,n){return void 0===n&&(n="div"),m(n,{classList:t,value:e})},exports.router=u,exports.setElKey=A,exports.update=function(t,e){var n=e,r=S[t];r&&(n=r.updateFunc),x.filter(function(e){return e.key===t}).forEach(function(t){var e=t.el;"function"==typeof n?n(e):E(e)})},exports.updateEl=E,exports.updateSet=function(t,e){S[t]={updateFunc:e}};
//# sourceMappingURL=domerjs.js.map

!function(e,n){"object"==typeof exports&&"undefined"!=typeof module?n(exports):"function"==typeof define&&define.amd?define(["exports"],n):n((e=e||self).domerjs={})}(this,function(e){function n(){return(n=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e}).apply(this,arguments)}var t="";function r(e){var n=""+t+e;window.history.pushState({path:n},"",n),window.dispatchEvent(new Event("popstate"));var r=e.indexOf("#");if(-1!==r){var o=e.substring(r+1),i=document.getElementById(o);i&&window.scrollTo(0,i.offsetTop)}}function o(e,n){var t=e.props,r=void 0===t?{}:t;return"function"==typeof r[n]?r[n].bind(e).call():r[n]}function i(e){var n=[];return Array.isArray(e)?n=e:e&&"object"==typeof e&&(e.tag?n.push(e):n=Object.values(e)),n}function a(e){e.appended&&("function"==typeof e.onDetach&&e.onDetach(),e.parent.element.removeChild(e.element),e.appended=!1,i(e.children).forEach(function(e){return a(e)}))}var c=["string","number"],u=["area","base","br","col","embed","hr","img","input","link","meta","param","source","track","wbr"];e.cl=function(e){return[].slice.call(arguments,1).map(function(n){return e[n]}).join(" ")},e.createApp=function(e,n,t){void 0===t&&(t={}),function e(n,t,r){(function(n,t,r){n.mounted||(t&&(n.parent=t),n.context||(n.context=r),n.state||(n.state={}),n.element=document.createElement(n.tag),n.mounted=!0,function(e){e.listeners=[],Object.keys(e).forEach(function(n){var t=null;if("events"===n&&(t=e.element),"windowEvents"===n&&(t=window),"documentEvents"===n&&(t=document),t){var r=e[n];Object.keys(r).forEach(function(n){var o=r[n].bind(e);e.listeners.push({element:t,eventKey:n,eventFunc:o}),t.addEventListener(n,o)})}})}(n),function(n,t){n.update=function(){this.mounted&&(e(this,null,t),"function"==typeof n.onUpdate&&n.onUpdate())}}(n,r),function(e){e.setState=function(e){var n=this;Object.keys(e).forEach(function(t){n.state[t]=e[t]}),this.update()}}(n),function(e){e.getFirstParent=function(e){return this.parent&&this.parent.getFirstParent?e(this.parent)?this.parent:this.parent.getFirstParent(e):null}}(n),"function"==typeof n.onMount&&n.onMount())})(n,t,r),function(e){var n=e.props,t=e.element;Object.keys(void 0===n?{}:n).forEach(function(n){var r=o(e,n);!1===r?t.removeAttribute(n):t.setAttribute(n,r)})}(n);var u=n.children,f=function e(n,t){if("function"==typeof t){var r=n.render();return e(n,r)}return t}(n,n.render);f&&(n.children=f);var p=i(u),s=i(n.children);p.forEach(function(e){a(e),s.find(function(n){return n.element&&e.element.isEqualNode(n.element)})||function e(n){n.mounted&&("function"==typeof n.onUnMount&&n.onUnMount(),function(e){e.listeners.forEach(function(e){e.element.removeEventListener(e.eventKey,e.eventFunc)}),e.listeners=[]}(n),n.parent=null,n.element=null,n.mounted=!1,i(n.children).forEach(function(n){return e(n)}))}(e)}),-1!==c.indexOf(typeof u)&&-1===c.indexOf(typeof n.children)&&(n.html?n.element.innerHTML="":n.element.textContent=""),-1===c.indexOf(typeof n.children)||n.children===u&&n.appended||(n.html?n.element.innerHTML=n.children:n.element.textContent=n.children),s.forEach(function(t){e(t,n,r)}),!1===f?a(n):function(e){e.appended||(e.parent.element.appendChild(e.element),e.appended=!0,"function"==typeof e.onAppend&&e.onAppend())}(n)}(e,{element:n},t)},e.createHtml=function e(n,t){t&&!n.parent&&(n.parent=t);var r=function(e){var n="",t=e.props;return Object.keys(void 0===t?{}:t).forEach(function(t){var r=t;"className"===r&&(r="class"),n+=" "+r+'="'+o(e,t)+'"'}),n}(n),a=n.tag,c=n.render;if(-1!==u.indexOf(a))return"<"+a+r+"/>";var f="";"string"==typeof c&&(f+=c);var p=n.children;if("function"==typeof c){var s=n.render();"string"==typeof s?f+=s:p=s}return i(p).forEach(function(t){return f+=e(t,n)}),"<"+a+r+">"+f+"</"+a+">"},e.link=function(e,t,o){return{tag:"a",props:n({href:e},o),render:t,events:{click:function(n){n.preventDefault(),r(e)}}}},e.pushRoute=r,e.routeMatch=function e(n){if("string"==typeof n)return e({path:n});if(Array.isArray(n))return n.some(function(n){return e(n)});var r=n.path,o=n.exact,i=void 0===o||o,a=window.location.pathname;if(!a.startsWith(t))return!1;var c=a.replace(t,"");return i?c===r:c.startsWith(r)},e.setBaseroute=function(e){return t=e},e.st=function(e){var n="";return Object.keys(e).forEach(function(t){n+=function(e){return e.replace(/\W+/g,"-").replace(/([a-z\d])([A-Z])/g,"$1-$2").toLowerCase()}(t)+":"+e[t]+";"}),n}});
//# sourceMappingURL=domerjs.umd.js.map

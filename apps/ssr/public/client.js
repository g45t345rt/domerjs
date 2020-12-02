// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../../../src/router.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.set = set;
exports.setBaseUrl = setBaseUrl;
exports.currentPath = currentPath;
exports.apply = apply;
exports.setRouteEl = setRouteEl;
exports.push = push;
var routes = [];
var baseUrl = '';

function set(path, element, parent) {
  routes.push({
    path: path,
    element: element,
    parent: parent
  });
}

function setBaseUrl(newBaseUrl) {
  baseUrl = newBaseUrl;
}

var matchPath = function matchPath(p1, p2) {
  if (Array.isArray(p1)) return p1.indexOf(p2) !== -1;
  return p1 === p2;
};

function currentPath() {
  return window.location.pathname.replace(baseUrl, '');
}

function apply() {
  var cPath = currentPath();
  var notFound = routes.every(function (_ref) {
    var path = _ref.path;
    return !matchPath(path, cPath);
  });
  routes.forEach(function (route) {
    var path = route.path,
        element = route.element,
        _route$parent = route.parent,
        parent = _route$parent === void 0 ? window.document.body : _route$parent;

    if (matchPath(path, cPath) || notFound && matchPath(path, '')) {
      parent.append(element);
    } else if (parent.contains(element)) element.remove();
  });
}

function setRouteEl(el, path) {
  if (el.tagName === 'A') el.href = path;
  el.addEventListener('click', function (e) {
    e.preventDefault();
    push(path);
  });
  return el;
}

function push(path) {
  var newPath = "".concat(baseUrl).concat(path);
  window.history.pushState({
    path: newPath
  }, '', newPath); // Trigger popstate event to update routes
  //window.dispatchEvent(new Event('popstate'))

  apply(); // Scroll to tag if any 

  var hashIndex = path.indexOf('#');

  if (hashIndex !== -1) {
    var hash = path.substring(hashIndex + 1);
    var element = window.document.getElementById(hash);
    if (element) window.scrollTo(0, element.offsetTop);
  }
}

window.addEventListener('popstate', function () {
  return apply();
});
},{}],"../../../src/fetcher.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setOptions = setOptions;
exports.attach = attach;
exports.detach = detach;
exports.apply = apply;
exports.get = get;
exports.cache = void 0;
var cache = window.__cache || [];
exports.cache = cache;
var attachedFetch = [];
var defaultRefresh = 100000;

function setOptions(options) {
  if (typeof options.refresh === 'number') defaultRefresh = options.refresh;
}

function attach(url, func) {
  var refresh = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultRefresh;
  attachedFetch.push({
    url: url,
    func: func,
    refresh: refresh
  });
}

function detach(url) {
  var index = attachedFetch.findIndex(function (x) {
    return x.url === url;
  });
  if (index !== -1) attachedFetch.splice(index, 1);
}

function apply() {
  var fetches = attachedFetch.map(function (_ref) {
    var url = _ref.url,
        func = _ref.func,
        refresh = _ref.refresh;
    return get(url, func, refresh);
  });
  return Promise.all(fetches);
}

function get(url, func) {
  var refresh = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultRefresh;
  return new Promise(function (resolve) {
    var cacheItem = cache.find(function (c) {
      return c.url === url;
    });

    if (cacheItem && Date.now() - refresh < cacheItem.time) {
      resolve(func(cacheItem.data));
      return;
    }

    fetch(url).then(function (res) {
      res.json().then(function (data) {
        if (!cacheItem) cache.push({
          url: url,
          data: data,
          time: Date.now()
        });else {
          cacheItem.data = data;
          cacheItem.time = Date.now();
        }
        resolve(func(data));
      });
    });
  });
}
},{}],"../../../node_modules/nanoid/url-alphabet/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.urlAlphabet = void 0;
// This alphabet uses `A-Za-z0-9_-` symbols. The genetic algorithm helped
// optimize the gzip compression for this alphabet.
let urlAlphabet = 'ModuleSymbhasOwnPr-0123456789ABCDEFGHNRVfgctiUvz_KqYTJkLxpZXIjQW';
exports.urlAlphabet = urlAlphabet;
},{}],"../../../node_modules/nanoid/index.browser.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "urlAlphabet", {
  enumerable: true,
  get: function () {
    return _index.urlAlphabet;
  }
});
exports.random = exports.customRandom = exports.customAlphabet = exports.nanoid = void 0;

var _index = require("./url-alphabet/index.js");

// This file replaces `index.js` in bundlers like webpack or Rollup,
// according to `browser` config in `package.json`.
if ("development" !== 'production') {
  // All bundlers will remove this block in the production bundle.
  if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative' && typeof crypto === 'undefined') {
    throw new Error('React Native does not have a built-in secure random generator. ' + 'If you don’t need unpredictable IDs use `nanoid/non-secure`. ' + 'For secure IDs, import `react-native-get-random-values` ' + 'before Nano ID. If you use Expo, install `expo-random` ' + 'and use `nanoid/async`.');
  }

  if (typeof msCrypto !== 'undefined' && typeof crypto === 'undefined') {
    throw new Error('Import file with `if (!window.crypto) window.crypto = window.msCrypto`' + ' before importing Nano ID to fix IE 11 support');
  }

  if (typeof crypto === 'undefined') {
    throw new Error('Your browser does not have secure random generator. ' + 'If you don’t need unpredictable IDs, you can use nanoid/non-secure.');
  }
}

var random = function random(bytes) {
  return crypto.getRandomValues(new Uint8Array(bytes));
};

exports.random = random;

var customRandom = function customRandom(alphabet, size, getRandom) {
  // First, a bitmask is necessary to generate the ID. The bitmask makes bytes
  // values closer to the alphabet size. The bitmask calculates the closest
  // `2^31 - 1` number, which exceeds the alphabet size.
  // For example, the bitmask for the alphabet size 30 is 31 (00011111).
  // `Math.clz32` is not used, because it is not available in browsers.
  var mask = (2 << Math.log(alphabet.length - 1) / Math.LN2) - 1; // Though, the bitmask solution is not perfect since the bytes exceeding
  // the alphabet size are refused. Therefore, to reliably generate the ID,
  // the random bytes redundancy has to be satisfied.
  // Note: every hardware random generator call is performance expensive,
  // because the system call for entropy collection takes a lot of time.
  // So, to avoid additional system calls, extra bytes are requested in advance.
  // Next, a step determines how many random bytes to generate.
  // The number of random bytes gets decided upon the ID size, mask,
  // alphabet size, and magic number 1.6 (using 1.6 peaks at performance
  // according to benchmarks).
  // `-~f => Math.ceil(f)` if f is a float
  // `-~i => i + 1` if i is an integer

  var step = -~(1.6 * mask * size / alphabet.length);
  return function () {
    var id = '';

    while (true) {
      var bytes = getRandom(step); // A compact alternative for `for (var i = 0; i < step; i++)`.

      var j = step;

      while (j--) {
        // Adding `|| ''` refuses a random byte that exceeds the alphabet size.
        id += alphabet[bytes[j] & mask] || ''; // `id.length + 1 === size` is a more compact option.

        if (id.length === +size) return id;
      }
    }
  };
};

exports.customRandom = customRandom;

var customAlphabet = function customAlphabet(alphabet, size) {
  return customRandom(alphabet, size, random);
};

exports.customAlphabet = customAlphabet;

var nanoid = function nanoid() {
  var size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 21;
  var id = '';
  var bytes = crypto.getRandomValues(new Uint8Array(size)); // A compact alternative for `for (var i = 0; i < step; i++)`.

  while (size--) {
    // It is incorrect to use bytes exceeding the alphabet size.
    // The following mask reduces the random byte in the 0-255 value
    // range to the 0-63 value range. Therefore, adding hacks, such
    // as empty string fallback or magic numbers, is unneccessary because
    // the bitmask trims bytes down to the alphabet size.
    var byte = bytes[size] & 63;

    if (byte < 36) {
      // `0-9a-z`
      id += byte.toString(36);
    } else if (byte < 62) {
      // `A-Z`
      id += (byte - 26).toString(36).toUpperCase();
    } else if (byte < 63) {
      id += '_';
    } else {
      id += '-';
    }
  }

  return id;
};

exports.nanoid = nanoid;
},{"./url-alphabet/index.js":"../../../node_modules/nanoid/url-alphabet/index.js"}],"../../../src/helpers.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.replaceStringArgs = replaceStringArgs;
exports.applyValue = applyValue;
exports.emptyChilds = emptyChilds;

function replaceStringArgs(str, args) {
  var newStr = str;
  Object.keys(args).forEach(function (key) {
    var value = '';
    if (typeof args[key] === 'function') value = args[key]();else value = args[key];
    newStr = newStr.replace("{{".concat(key, "}}"), args[key]);
  });
  return newStr;
}

function applyValue(value) {
  if (typeof value === 'function') {
    var result = value();

    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return applyValue.apply(void 0, [result].concat(args));
  }

  return value;
}

function emptyChilds(el) {
  while (el.hasChildNodes()) {
    el.removeChild(el.lastChild);
  }
}
},{}],"../../../src/element.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.newEl = newEl;
exports.newElClass = newElClass;
exports.updateEl = updateEl;
exports.ids = void 0;

var _nanoid = require("nanoid");

var _helpers = require("./helpers");

var updater = _interopRequireWildcard(require("./updater"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ID_SIZE = 6;
var ids = window.__ssr || [];
exports.ids = ids;
var elements = [];
var elIndex = 0;

function newEl(tagName) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  // value, html
  var _options$attrs = options.attrs,
      attrs = _options$attrs === void 0 ? {} : _options$attrs,
      _options$events = options.events,
      events = _options$events === void 0 ? {} : _options$events,
      _options$dataset = options.dataset,
      dataset = _options$dataset === void 0 ? {} : _options$dataset,
      _options$classList = options.classList,
      classList = _options$classList === void 0 ? [] : _options$classList,
      updateOn = options.updateOn;
  var el = null;

  if (window.isServer) {
    el = window.document.createElement(tagName);
    el.__id = (0, _nanoid.nanoid)(ID_SIZE); // Store id definition for client side

    el.dataset.ssrId = el.__id;
    ids.push({
      id: el.__id,
      i: elIndex
    });
  } else {
    var item = ids.find(function (_ref) {
      var i = _ref.i;
      return i === elIndex;
    });

    if (item) {
      el = window.document.querySelector("[data-ssr-id=\"".concat(item.id, "\"]"));
      if (el) el.__id = item.id;
    }

    if (!el) {
      el = window.document.createElement(tagName);
      el.__id = (0, _nanoid.nanoid)(ID_SIZE);
    }
  }

  elements.push({
    el: el,
    options: options
  });
  elIndex++; // Render value to element

  updateEl(el); // Attributes

  Object.keys(attrs).forEach(function (key) {
    return el.setAttribute(key, attrs[key]);
  }); // Classlist

  if (typeof classList === 'string') el.classList.add(classList);else if (Array.isArray(classList)) classList.forEach(function (key) {
    return el.classList.add(key);
  }); // Dataset

  Object.keys(dataset).forEach(function (key) {
    return el.dataset[key] = dataset[key];
  }); // Events

  Object.keys(events).forEach(function (key) {
    return el.addEventListener(key, events[key]);
  }); // Attach update keys

  if (updateOn) updater.assign(updateOn, el);
  return el;
}

function newElClass(classList, value) {
  var tagName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'div';
  return newEl(tagName, {
    classList: classList,
    value: value
  });
}

function getElementOptions(el) {
  var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  var elMatch = function elMatch(el1, el2) {
    return el1.__id === el2.__id;
  };

  if (index) return elements.findIndex(function (item) {
    return elMatch(item.el, el);
  });else {
    var data = elements.find(function (item) {
      return elMatch(item.el, el);
    });
    if (data) return data.options;
  }
}

function setElementOptions(el, newOptions) {
  var index = getElementOptions(el, true);

  if (index !== -1) {
    elements[index].options = _objectSpread(_objectSpread({}, elements[index].options), newOptions);
  }
}

function renderEl(el, value, html) {
  if (!value) return;

  if (typeof value === 'function') {
    var funcValue = value(el);
    if (funcValue) renderEl(el, funcValue, html);
    return;
  } // Array or object = element


  if (_typeof(value) === 'object') {
    (0, _helpers.emptyChilds)(el);
    if (Array.isArray(value)) value.forEach(function (v) {
      return el.append(v);
    });else el.append(value);
    return;
  }

  if (valueTags.indexOf(el.tagName) !== -1) {
    el.value = value;
    return;
  }

  if (html) {
    el.innerHTML = value;
    return;
  }

  el.textContent = value;
}

var valueTags = ['INPUT', 'TEXTAREA'];

function updateEl(el, newOptions) {
  if (newOptions) setElementOptions(el, newOptions);

  var _getElementOptions = getElementOptions(el),
      value = _getElementOptions.value,
      html = _getElementOptions.html;

  renderEl(el, value, html);
}
},{"nanoid":"../../../node_modules/nanoid/index.browser.js","./helpers":"../../../src/helpers.js","./updater":"../../../src/updater.js"}],"../../../src/updater.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.assign = assign;
exports.set = set;
exports.apply = apply;

var _element = require("./element");

var updates = [];
var keys = {};

function assign(key, el) {
  if (Array.isArray(key)) key.forEach(function (k) {
    return assign(k, el);
  });else if (Array.isArray(el)) el.forEach(function (e) {
    return assign(key, e);
  });else updates.push({
    key: key,
    el: el
  });
}

function set(key, updateFunc) {
  keys[key] = {
    updateFunc: updateFunc
  };
}

function apply(key, updateFunc) {
  var func = updateFunc;
  var update = keys[key];
  if (update) func = update.updateFunc;
  updates.filter(function (update) {
    return update.key === key;
  }).forEach(function (_ref) {
    var el = _ref.el;
    if (typeof func === 'function') func(el); // custom update
    else (0, _element.updateEl)(el); // or use element update
  });
}
},{"./element":"../../../src/element.js"}],"../../../src/ssr.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fetcher = require("./fetcher");

var _element = require("./element");

var _window = window,
    Element = _window.Element;
var append = Element.prototype.append;

Element.prototype.append = function () {
  append.apply(this, Array.prototype.slice.call(arguments).filter(function (a) {
    return !a.parentElement;
  }));
};

var appendChilds = Element.prototype.appendChild;

Element.prototype.appendChild = function () {
  if (arguments.parentElement) return;
  appendChilds.apply(this, arguments);
};

var _default = function _default(options) {
  var src = options.src,
      stylesheet = options.stylesheet,
      _options$baseUrl = options.baseUrl,
      baseUrl = _options$baseUrl === void 0 ? 'http://localhost' : _options$baseUrl;
  var elStyle = (0, _element.newEl)('link', {
    attrs: {
      rel: 'stylesheet',
      href: stylesheet
    },
    useSSR: false
  });
  var elScript = (0, _element.newEl)('script', {
    attrs: {
      src: src
    },
    useSSR: false
  });
  var elSSR = (0, _element.newEl)('script', {
    attrs: {
      type: 'text/javascript'
    },
    value: "window.__ssr = ".concat(JSON.stringify(_element.ids)),
    useSSR: false
  });
  var elCache = (0, _element.newEl)('script', {
    attrs: {
      type: 'text/javascript'
    },
    useSSR: false
  });
  return {
    setUrl: function setUrl(newUrl) {
      return jsdom.reconfigure({
        url: "http://localhost".concat(newUrl)
      });
    },
    toHtml: function toHtml() {
      var _window2 = window,
          document = _window2.document;
      (0, _element.updateEl)(elCache, "window.__cache = ".concat(JSON.stringify(_fetcher.cache)));
      console.log(elSSR.parentElement);
      document.head.append(elStyle);
      document.body.append(elSSR, elCache, elScript);
      return "<!DOCTYPE html>".concat(document.documentElement.outerHTML);
    }
  };
};

exports.default = _default;
},{"./fetcher":"../../../src/fetcher.js","./element":"../../../src/element.js"}],"../../../src/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "newEl", {
  enumerable: true,
  get: function () {
    return _element.newEl;
  }
});
Object.defineProperty(exports, "updateEl", {
  enumerable: true,
  get: function () {
    return _element.updateEl;
  }
});
Object.defineProperty(exports, "newElClass", {
  enumerable: true,
  get: function () {
    return _element.newElClass;
  }
});
Object.defineProperty(exports, "elements", {
  enumerable: true,
  get: function () {
    return _element.elements;
  }
});
Object.defineProperty(exports, "SSR", {
  enumerable: true,
  get: function () {
    return _ssr.default;
  }
});
exports.helpers = exports.updater = exports.fetcher = exports.router = void 0;

var router = _interopRequireWildcard(require("./router"));

exports.router = router;

var fetcher = _interopRequireWildcard(require("./fetcher"));

exports.fetcher = fetcher;

var updater = _interopRequireWildcard(require("./updater"));

exports.updater = updater;

var helpers = _interopRequireWildcard(require("./helpers"));

exports.helpers = helpers;

var _element = require("./element");

var _ssr = _interopRequireDefault(require("./ssr"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
},{"./router":"../../../src/router.js","./fetcher":"../../../src/fetcher.js","./updater":"../../../src/updater.js","./helpers":"../../../src/helpers.js","./element":"../../../src/element.js","./ssr":"../../../src/ssr.js"}],"../../../node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../../../node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"../../../node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"styles.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
module.exports = {
  "modal": "_modal_1d347",
  "modalShadow": "_modalShadow_1d347",
  "title": "_title_1d347",
  "post": "_post_1d347",
  "postTitle": "_postTitle_1d347"
};
},{"_css_loader":"../../../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"page1.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _src = require("../../../src");

var elPage = (0, _src.newEl)('div');
var elTitle = (0, _src.newEl)('h1', {
  value: 'Page 1 title'
});
var elDescription = (0, _src.newEl)('p', {
  value: 'page1page1page1',
  events: {
    click: function click() {
      alert('page1');
    }
  }
});
elPage.append(elTitle, elDescription);
var _default = elPage;
exports.default = _default;
},{"../../../src":"../../../src/index.js"}],"page2.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _src = require("../../../src");

var _styles = _interopRequireDefault(require("./styles.css"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var emptyChilds = _src.helpers.emptyChilds;
var elPage = (0, _src.newEl)('div');
var elTitle = (0, _src.newEl)('h1', {
  value: 'Page 2 title'
});
var elDescription = (0, _src.newEl)('p', {
  value: 'page2page2page',
  events: {
    click: function click() {
      alert('page2');
    }
  }
});
var modals = (0, _src.newEl)('div');

var modal = function modal(item) {
  if (modals.children.length > 0) return;

  var closeModal = function closeModal() {
    shadow.remove();
    modal.remove();
  };

  var shadow = (0, _src.newEl)('div', {
    attrs: {
      class: _styles.default.modalShadow
    },
    events: {
      click: closeModal
    }
  });
  var modal = (0, _src.newEl)('div', {
    attrs: {
      class: _styles.default.modal
    }
  });
  var close = (0, _src.newEl)('input', {
    attrs: {
      type: 'button'
    },
    value: 'Close',
    events: {
      click: closeModal
    }
  });
  var title = (0, _src.newEl)('h2', {
    value: item.title
  });
  var description = (0, _src.newEl)('div', {
    value: item.body
  });
  var comments = (0, _src.newEl)('div');
  var loading = (0, _src.newEl)('div', {
    value: 'loading...'
  });
  comments.append(loading);

  _src.fetcher.get("https://jsonplaceholder.typicode.com/posts/".concat(item.id, "/comments"), function (data) {
    loading.remove();
    data.forEach(function (_ref) {
      var email = _ref.email;
      var elComment = (0, _src.newEl)('div', {
        value: email
      });
      comments.append(elComment);
    });
  });

  modal.append(close, title, description, comments);
  modals.append(shadow, modal);
};

var elPosts = (0, _src.newEl)('div'); //if (window.isServer) {

_src.fetcher.attach("https://jsonplaceholder.typicode.com/posts", function (data) {
  emptyChilds(elPosts);
  data.forEach(function (item) {
    var elPost = (0, _src.newEl)('div', {
      useSSR: false,
      value: "<div class=\"".concat(_styles.default.post, "\">\n          <div class=\"").concat(_styles.default.postTitle, "\">").concat(item.title, "</div>\n          <div>").concat(item.body, "</div>\n        </div>"),
      html: true,
      events: {
        click: function click(e) {
          modal(item);
        }
      }
    });
    elPosts.append(elPost);
  });
}); //}


elPage.append(elTitle, elDescription, elPosts, modals);
var _default = elPage;
exports.default = _default;
},{"../../../src":"../../../src/index.js","./styles.css":"styles.css"}],"notfound.js":[function(require,module,exports) {
var global = arguments[3];
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _src = require("../../../src");

var setRouteEl = _src.router.setRouteEl;
var notFound = (0, _src.newEl)('div', {
  events: {
    routeAttach: function routeAttach() {
      if (window.isServer) {
        global.status = 404;
      }
    }
  }
});
var title = (0, _src.newEl)('h1', {
  value: '404 - Page not found'
});
var description = (0, _src.newEl)('div', {
  value: 'The page you are looking for does not exists.'
});
var goBack = (0, _src.newEl)('input', {
  attrs: {
    type: 'button'
  },
  value: 'Go home'
});
setRouteEl(goBack, '/');
notFound.append(title, description, goBack);
var _default = notFound;
exports.default = _default;
},{"../../../src":"../../../src/index.js"}],"master.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _nanoid = require("nanoid");

var _src = require("../../../src");

var master = (0, _src.newEl)('div');
var setRouteEl = _src.router.setRouteEl;
var linkPage1 = (0, _src.newEl)('a', {
  value: 'Page 1'
});
setRouteEl(linkPage1, '/page1');
var linkPage2 = (0, _src.newEl)('a', {
  value: 'Page 2'
});
setRouteEl(linkPage2, '/page2');
var linkPage3 = (0, _src.newEl)('a', {
  value: 'Not found'
});
setRouteEl(linkPage3, "/".concat((0, _nanoid.nanoid)()));
master.append(linkPage1, linkPage2, linkPage3);
var _default = master;
exports.default = _default;
},{"nanoid":"../../../node_modules/nanoid/index.browser.js","../../../src":"../../../src/index.js"}],"index.js":[function(require,module,exports) {
"use strict";

var _src = require("../../../src");

var _styles = _interopRequireDefault(require("./styles.css"));

var _page = _interopRequireDefault(require("./page1"));

var _page2 = _interopRequireDefault(require("./page2"));

var _notfound = _interopRequireDefault(require("./notfound"));

var _master = _interopRequireDefault(require("./master"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import 'regenerator-runtime/runtime'
var pages = ['/', '/page1', '/page2'];

_src.router.set(pages, _master.default);

_src.router.set(['/', '/page1'], _page.default, _master.default);

_src.router.set('/page2', _page2.default, _master.default);

_src.router.set('', _notfound.default);

_src.fetcher.apply();
},{"../../../src":"../../../src/index.js","./styles.css":"styles.css","./page1":"page1.js","./page2":"page2.js","./notfound":"notfound.js","./master":"master.js"}],"../../../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "51277" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/client.js.map
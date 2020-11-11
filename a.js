(function (ms, tty, util, supportsColor, onFinished, contentDisposition, mimeTypes, escapeHtml, typeIs, statuses, destroy, assert, path, vary, only, encodeurl, stream, koaCompose, httpErrors, httpAssert, delegates, cookies, url, net, accepts, contentType, parseurl, querystring, fresh, events, http, co, depd) {
	'use strict';

	function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

	var ms__default = /*#__PURE__*/_interopDefaultLegacy(ms);
	var tty__default = /*#__PURE__*/_interopDefaultLegacy(tty);
	var util__default = /*#__PURE__*/_interopDefaultLegacy(util);
	var supportsColor__default = /*#__PURE__*/_interopDefaultLegacy(supportsColor);
	var onFinished__default = /*#__PURE__*/_interopDefaultLegacy(onFinished);
	var contentDisposition__default = /*#__PURE__*/_interopDefaultLegacy(contentDisposition);
	var mimeTypes__default = /*#__PURE__*/_interopDefaultLegacy(mimeTypes);
	var escapeHtml__default = /*#__PURE__*/_interopDefaultLegacy(escapeHtml);
	var typeIs__default = /*#__PURE__*/_interopDefaultLegacy(typeIs);
	var statuses__default = /*#__PURE__*/_interopDefaultLegacy(statuses);
	var destroy__default = /*#__PURE__*/_interopDefaultLegacy(destroy);
	var assert__default = /*#__PURE__*/_interopDefaultLegacy(assert);
	var path__default = /*#__PURE__*/_interopDefaultLegacy(path);
	var vary__default = /*#__PURE__*/_interopDefaultLegacy(vary);
	var only__default = /*#__PURE__*/_interopDefaultLegacy(only);
	var encodeurl__default = /*#__PURE__*/_interopDefaultLegacy(encodeurl);
	var stream__default = /*#__PURE__*/_interopDefaultLegacy(stream);
	var koaCompose__default = /*#__PURE__*/_interopDefaultLegacy(koaCompose);
	var httpErrors__default = /*#__PURE__*/_interopDefaultLegacy(httpErrors);
	var httpAssert__default = /*#__PURE__*/_interopDefaultLegacy(httpAssert);
	var delegates__default = /*#__PURE__*/_interopDefaultLegacy(delegates);
	var cookies__default = /*#__PURE__*/_interopDefaultLegacy(cookies);
	var url__default = /*#__PURE__*/_interopDefaultLegacy(url);
	var net__default = /*#__PURE__*/_interopDefaultLegacy(net);
	var accepts__default = /*#__PURE__*/_interopDefaultLegacy(accepts);
	var contentType__default = /*#__PURE__*/_interopDefaultLegacy(contentType);
	var parseurl__default = /*#__PURE__*/_interopDefaultLegacy(parseurl);
	var querystring__default = /*#__PURE__*/_interopDefaultLegacy(querystring);
	var fresh__default = /*#__PURE__*/_interopDefaultLegacy(fresh);
	var events__default = /*#__PURE__*/_interopDefaultLegacy(events);
	var http__default = /*#__PURE__*/_interopDefaultLegacy(http);
	var co__default = /*#__PURE__*/_interopDefaultLegacy(co);
	var depd__default = /*#__PURE__*/_interopDefaultLegacy(depd);

	var toStr = Object.prototype.toString;
	var fnToStr = Function.prototype.toString;
	var isFnRegex = /^\s*(?:function)?\*/;
	var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';
	var getProto = Object.getPrototypeOf;
	var getGeneratorFunc = function () { // eslint-disable-line consistent-return
		if (!hasToStringTag) {
			return false;
		}
		try {
			return Function('return function*() {}')();
		} catch (e) {
		}
	};
	var generatorFunc = getGeneratorFunc();
	var GeneratorFunction = generatorFunc ? getProto(generatorFunc) : {};

	var isGeneratorFunction = function isGeneratorFunction(fn) {
		if (typeof fn !== 'function') {
			return false;
		}
		if (isFnRegex.test(fnToStr.call(fn))) {
			return true;
		}
		if (!hasToStringTag) {
			var str = toStr.call(fn);
			return str === '[object GeneratorFunction]';
		}
		return getProto(fn) === GeneratorFunction;
	};

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var debug = createCommonjsModule(function (module, exports) {
	/**
	 * This is the common logic for both the Node.js and web browser
	 * implementations of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */

	exports = module.exports = createDebug.debug = createDebug['default'] = createDebug;
	exports.coerce = coerce;
	exports.disable = disable;
	exports.enable = enable;
	exports.enabled = enabled;
	exports.humanize = ms__default['default'];

	/**
	 * Active `debug` instances.
	 */
	exports.instances = [];

	/**
	 * The currently active debug mode names, and names to skip.
	 */

	exports.names = [];
	exports.skips = [];

	/**
	 * Map of special "%n" handling functions, for the debug "format" argument.
	 *
	 * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
	 */

	exports.formatters = {};

	/**
	 * Select a color.
	 * @param {String} namespace
	 * @return {Number}
	 * @api private
	 */

	function selectColor(namespace) {
	  var hash = 0, i;

	  for (i in namespace) {
	    hash  = ((hash << 5) - hash) + namespace.charCodeAt(i);
	    hash |= 0; // Convert to 32bit integer
	  }

	  return exports.colors[Math.abs(hash) % exports.colors.length];
	}

	/**
	 * Create a debugger with the given `namespace`.
	 *
	 * @param {String} namespace
	 * @return {Function}
	 * @api public
	 */

	function createDebug(namespace) {

	  var prevTime;

	  function debug() {
	    // disabled?
	    if (!debug.enabled) return;

	    var self = debug;

	    // set `diff` timestamp
	    var curr = +new Date();
	    var ms = curr - (prevTime || curr);
	    self.diff = ms;
	    self.prev = prevTime;
	    self.curr = curr;
	    prevTime = curr;

	    // turn the `arguments` into a proper Array
	    var args = new Array(arguments.length);
	    for (var i = 0; i < args.length; i++) {
	      args[i] = arguments[i];
	    }

	    args[0] = exports.coerce(args[0]);

	    if ('string' !== typeof args[0]) {
	      // anything else let's inspect with %O
	      args.unshift('%O');
	    }

	    // apply any `formatters` transformations
	    var index = 0;
	    args[0] = args[0].replace(/%([a-zA-Z%])/g, function(match, format) {
	      // if we encounter an escaped % then don't increase the array index
	      if (match === '%%') return match;
	      index++;
	      var formatter = exports.formatters[format];
	      if ('function' === typeof formatter) {
	        var val = args[index];
	        match = formatter.call(self, val);

	        // now we need to remove `args[index]` since it's inlined in the `format`
	        args.splice(index, 1);
	        index--;
	      }
	      return match;
	    });

	    // apply env-specific formatting (colors, etc.)
	    exports.formatArgs.call(self, args);

	    var logFn = debug.log || exports.log || console.log.bind(console);
	    logFn.apply(self, args);
	  }

	  debug.namespace = namespace;
	  debug.enabled = exports.enabled(namespace);
	  debug.useColors = exports.useColors();
	  debug.color = selectColor(namespace);
	  debug.destroy = destroy;

	  // env-specific initialization logic for debug instances
	  if ('function' === typeof exports.init) {
	    exports.init(debug);
	  }

	  exports.instances.push(debug);

	  return debug;
	}

	function destroy () {
	  var index = exports.instances.indexOf(this);
	  if (index !== -1) {
	    exports.instances.splice(index, 1);
	    return true;
	  } else {
	    return false;
	  }
	}

	/**
	 * Enables a debug mode by namespaces. This can include modes
	 * separated by a colon and wildcards.
	 *
	 * @param {String} namespaces
	 * @api public
	 */

	function enable(namespaces) {
	  exports.save(namespaces);

	  exports.names = [];
	  exports.skips = [];

	  var i;
	  var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
	  var len = split.length;

	  for (i = 0; i < len; i++) {
	    if (!split[i]) continue; // ignore empty strings
	    namespaces = split[i].replace(/\*/g, '.*?');
	    if (namespaces[0] === '-') {
	      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
	    } else {
	      exports.names.push(new RegExp('^' + namespaces + '$'));
	    }
	  }

	  for (i = 0; i < exports.instances.length; i++) {
	    var instance = exports.instances[i];
	    instance.enabled = exports.enabled(instance.namespace);
	  }
	}

	/**
	 * Disable debug output.
	 *
	 * @api public
	 */

	function disable() {
	  exports.enable('');
	}

	/**
	 * Returns true if the given mode name is enabled, false otherwise.
	 *
	 * @param {String} name
	 * @return {Boolean}
	 * @api public
	 */

	function enabled(name) {
	  if (name[name.length - 1] === '*') {
	    return true;
	  }
	  var i, len;
	  for (i = 0, len = exports.skips.length; i < len; i++) {
	    if (exports.skips[i].test(name)) {
	      return false;
	    }
	  }
	  for (i = 0, len = exports.names.length; i < len; i++) {
	    if (exports.names[i].test(name)) {
	      return true;
	    }
	  }
	  return false;
	}

	/**
	 * Coerce `val`.
	 *
	 * @param {Mixed} val
	 * @return {Mixed}
	 * @api private
	 */

	function coerce(val) {
	  if (val instanceof Error) return val.stack || val.message;
	  return val;
	}
	});
	var debug_1 = debug.coerce;
	var debug_2 = debug.disable;
	var debug_3 = debug.enable;
	var debug_4 = debug.enabled;
	var debug_5 = debug.humanize;
	var debug_6 = debug.instances;
	var debug_7 = debug.names;
	var debug_8 = debug.skips;
	var debug_9 = debug.formatters;

	var browser = createCommonjsModule(function (module, exports) {
	/**
	 * This is the web browser implementation of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */

	exports = module.exports = debug;
	exports.log = log;
	exports.formatArgs = formatArgs;
	exports.save = save;
	exports.load = load;
	exports.useColors = useColors;
	exports.storage = 'undefined' != typeof chrome
	               && 'undefined' != typeof chrome.storage
	                  ? chrome.storage.local
	                  : localstorage();

	/**
	 * Colors.
	 */

	exports.colors = [
	  '#0000CC', '#0000FF', '#0033CC', '#0033FF', '#0066CC', '#0066FF', '#0099CC',
	  '#0099FF', '#00CC00', '#00CC33', '#00CC66', '#00CC99', '#00CCCC', '#00CCFF',
	  '#3300CC', '#3300FF', '#3333CC', '#3333FF', '#3366CC', '#3366FF', '#3399CC',
	  '#3399FF', '#33CC00', '#33CC33', '#33CC66', '#33CC99', '#33CCCC', '#33CCFF',
	  '#6600CC', '#6600FF', '#6633CC', '#6633FF', '#66CC00', '#66CC33', '#9900CC',
	  '#9900FF', '#9933CC', '#9933FF', '#99CC00', '#99CC33', '#CC0000', '#CC0033',
	  '#CC0066', '#CC0099', '#CC00CC', '#CC00FF', '#CC3300', '#CC3333', '#CC3366',
	  '#CC3399', '#CC33CC', '#CC33FF', '#CC6600', '#CC6633', '#CC9900', '#CC9933',
	  '#CCCC00', '#CCCC33', '#FF0000', '#FF0033', '#FF0066', '#FF0099', '#FF00CC',
	  '#FF00FF', '#FF3300', '#FF3333', '#FF3366', '#FF3399', '#FF33CC', '#FF33FF',
	  '#FF6600', '#FF6633', '#FF9900', '#FF9933', '#FFCC00', '#FFCC33'
	];

	/**
	 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
	 * and the Firebug extension (any Firefox version) are known
	 * to support "%c" CSS customizations.
	 *
	 * TODO: add a `localStorage` variable to explicitly enable/disable colors
	 */

	function useColors() {
	  // NB: In an Electron preload script, document will be defined but not fully
	  // initialized. Since we know we're in Chrome, we'll just detect this case
	  // explicitly
	  if (typeof window !== 'undefined' && window.process && window.process.type === 'renderer') {
	    return true;
	  }

	  // Internet Explorer and Edge do not support colors.
	  if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
	    return false;
	  }

	  // is webkit? http://stackoverflow.com/a/16459606/376773
	  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
	  return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
	    // is firebug? http://stackoverflow.com/a/398120/376773
	    (typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
	    // is firefox >= v31?
	    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
	    (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
	    // double check webkit in userAgent just in case we are in a worker
	    (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
	}

	/**
	 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
	 */

	exports.formatters.j = function(v) {
	  try {
	    return JSON.stringify(v);
	  } catch (err) {
	    return '[UnexpectedJSONParseError]: ' + err.message;
	  }
	};


	/**
	 * Colorize log arguments if enabled.
	 *
	 * @api public
	 */

	function formatArgs(args) {
	  var useColors = this.useColors;

	  args[0] = (useColors ? '%c' : '')
	    + this.namespace
	    + (useColors ? ' %c' : ' ')
	    + args[0]
	    + (useColors ? '%c ' : ' ')
	    + '+' + exports.humanize(this.diff);

	  if (!useColors) return;

	  var c = 'color: ' + this.color;
	  args.splice(1, 0, c, 'color: inherit');

	  // the final "%c" is somewhat tricky, because there could be other
	  // arguments passed either before or after the %c, so we need to
	  // figure out the correct index to insert the CSS into
	  var index = 0;
	  var lastC = 0;
	  args[0].replace(/%[a-zA-Z%]/g, function(match) {
	    if ('%%' === match) return;
	    index++;
	    if ('%c' === match) {
	      // we only are interested in the *last* %c
	      // (the user may have provided their own)
	      lastC = index;
	    }
	  });

	  args.splice(lastC, 0, c);
	}

	/**
	 * Invokes `console.log()` when available.
	 * No-op when `console.log` is not a "function".
	 *
	 * @api public
	 */

	function log() {
	  // this hackery is required for IE8/9, where
	  // the `console.log` function doesn't have 'apply'
	  return 'object' === typeof console
	    && console.log
	    && Function.prototype.apply.call(console.log, console, arguments);
	}

	/**
	 * Save `namespaces`.
	 *
	 * @param {String} namespaces
	 * @api private
	 */

	function save(namespaces) {
	  try {
	    if (null == namespaces) {
	      exports.storage.removeItem('debug');
	    } else {
	      exports.storage.debug = namespaces;
	    }
	  } catch(e) {}
	}

	/**
	 * Load `namespaces`.
	 *
	 * @return {String} returns the previously persisted debug modes
	 * @api private
	 */

	function load() {
	  var r;
	  try {
	    r = exports.storage.debug;
	  } catch(e) {}

	  // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
	  if (!r && typeof process !== 'undefined' && 'env' in process) {
	    r = process.env.DEBUG;
	  }

	  return r;
	}

	/**
	 * Enable namespaces listed in `localStorage.debug` initially.
	 */

	exports.enable(load());

	/**
	 * Localstorage attempts to return the localstorage.
	 *
	 * This is necessary because safari throws
	 * when a user disables cookies/localstorage
	 * and you attempt to access it.
	 *
	 * @return {LocalStorage}
	 * @api private
	 */

	function localstorage() {
	  try {
	    return window.localStorage;
	  } catch (e) {}
	}
	});
	var browser_1 = browser.log;
	var browser_2 = browser.formatArgs;
	var browser_3 = browser.save;
	var browser_4 = browser.load;
	var browser_5 = browser.useColors;
	var browser_6 = browser.storage;
	var browser_7 = browser.colors;

	var node = createCommonjsModule(function (module, exports) {
	/**
	 * Module dependencies.
	 */




	/**
	 * This is the Node.js implementation of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */

	exports = module.exports = debug;
	exports.init = init;
	exports.log = log;
	exports.formatArgs = formatArgs;
	exports.save = save;
	exports.load = load;
	exports.useColors = useColors;

	/**
	 * Colors.
	 */

	exports.colors = [ 6, 2, 3, 4, 5, 1 ];

	try {
	  var supportsColor = supportsColor__default['default'];
	  if (supportsColor && supportsColor.level >= 2) {
	    exports.colors = [
	      20, 21, 26, 27, 32, 33, 38, 39, 40, 41, 42, 43, 44, 45, 56, 57, 62, 63, 68,
	      69, 74, 75, 76, 77, 78, 79, 80, 81, 92, 93, 98, 99, 112, 113, 128, 129, 134,
	      135, 148, 149, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171,
	      172, 173, 178, 179, 184, 185, 196, 197, 198, 199, 200, 201, 202, 203, 204,
	      205, 206, 207, 208, 209, 214, 215, 220, 221
	    ];
	  }
	} catch (err) {
	  // swallow - we only care if `supports-color` is available; it doesn't have to be.
	}

	/**
	 * Build up the default `inspectOpts` object from the environment variables.
	 *
	 *   $ DEBUG_COLORS=no DEBUG_DEPTH=10 DEBUG_SHOW_HIDDEN=enabled node script.js
	 */

	exports.inspectOpts = Object.keys(process.env).filter(function (key) {
	  return /^debug_/i.test(key);
	}).reduce(function (obj, key) {
	  // camel-case
	  var prop = key
	    .substring(6)
	    .toLowerCase()
	    .replace(/_([a-z])/g, function (_, k) { return k.toUpperCase() });

	  // coerce string value into JS value
	  var val = process.env[key];
	  if (/^(yes|on|true|enabled)$/i.test(val)) val = true;
	  else if (/^(no|off|false|disabled)$/i.test(val)) val = false;
	  else if (val === 'null') val = null;
	  else val = Number(val);

	  obj[prop] = val;
	  return obj;
	}, {});

	/**
	 * Is stdout a TTY? Colored output is enabled when `true`.
	 */

	function useColors() {
	  return 'colors' in exports.inspectOpts
	    ? Boolean(exports.inspectOpts.colors)
	    : tty__default['default'].isatty(process.stderr.fd);
	}

	/**
	 * Map %o to `util.inspect()`, all on a single line.
	 */

	exports.formatters.o = function(v) {
	  this.inspectOpts.colors = this.useColors;
	  return util__default['default'].inspect(v, this.inspectOpts)
	    .split('\n').map(function(str) {
	      return str.trim()
	    }).join(' ');
	};

	/**
	 * Map %o to `util.inspect()`, allowing multiple lines if needed.
	 */

	exports.formatters.O = function(v) {
	  this.inspectOpts.colors = this.useColors;
	  return util__default['default'].inspect(v, this.inspectOpts);
	};

	/**
	 * Adds ANSI color escape codes if enabled.
	 *
	 * @api public
	 */

	function formatArgs(args) {
	  var name = this.namespace;
	  var useColors = this.useColors;

	  if (useColors) {
	    var c = this.color;
	    var colorCode = '\u001b[3' + (c < 8 ? c : '8;5;' + c);
	    var prefix = '  ' + colorCode + ';1m' + name + ' ' + '\u001b[0m';

	    args[0] = prefix + args[0].split('\n').join('\n' + prefix);
	    args.push(colorCode + 'm+' + exports.humanize(this.diff) + '\u001b[0m');
	  } else {
	    args[0] = getDate() + name + ' ' + args[0];
	  }
	}

	function getDate() {
	  if (exports.inspectOpts.hideDate) {
	    return '';
	  } else {
	    return new Date().toISOString() + ' ';
	  }
	}

	/**
	 * Invokes `util.format()` with the specified arguments and writes to stderr.
	 */

	function log() {
	  return process.stderr.write(util__default['default'].format.apply(util__default['default'], arguments) + '\n');
	}

	/**
	 * Save `namespaces`.
	 *
	 * @param {String} namespaces
	 * @api private
	 */

	function save(namespaces) {
	  if (null == namespaces) {
	    // If you set a process.env field to null or undefined, it gets cast to the
	    // string 'null' or 'undefined'. Just delete instead.
	    delete process.env.DEBUG;
	  } else {
	    process.env.DEBUG = namespaces;
	  }
	}

	/**
	 * Load `namespaces`.
	 *
	 * @return {String} returns the previously persisted debug modes
	 * @api private
	 */

	function load() {
	  return process.env.DEBUG;
	}

	/**
	 * Init logic for `debug` instances.
	 *
	 * Create a new `inspectOpts` object in case `useColors` is set
	 * differently for a particular `debug` instance.
	 */

	function init (debug) {
	  debug.inspectOpts = {};

	  var keys = Object.keys(exports.inspectOpts);
	  for (var i = 0; i < keys.length; i++) {
	    debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
	  }
	}

	/**
	 * Enable namespaces listed in `process.env.DEBUG` initially.
	 */

	exports.enable(load());
	});
	var node_1 = node.init;
	var node_2 = node.log;
	var node_3 = node.formatArgs;
	var node_4 = node.save;
	var node_5 = node.load;
	var node_6 = node.useColors;
	var node_7 = node.colors;
	var node_8 = node.inspectOpts;

	var src = createCommonjsModule(function (module) {
	/**
	 * Detect Electron renderer process, which is node, but we should
	 * treat as a browser.
	 */

	if (typeof process === 'undefined' || process.type === 'renderer') {
	  module.exports = browser;
	} else {
	  module.exports = node;
	}
	});

	class LRU {
	  constructor(max) {
	    this.max = max;
	    this.size = 0;
	    this.cache = new Map();
	    this._cache = new Map();
	  }

	  get(key, options) {
	    let item = this.cache.get(key);
	    const maxAge = options && options.maxAge;
	    // only call Date.now() when necessary
	    let now;
	    function getNow() {
	      now = now || Date.now();
	      return now;
	    }
	    if (item) {
	      // check expired
	      if (item.expired && getNow() > item.expired) {
	        item.expired = 0;
	        item.value = undefined;
	      } else {
	        // update expired in get
	        if (maxAge !== undefined) {
	          const expired = maxAge ? getNow() + maxAge : 0;
	          item.expired = expired;
	        }
	      }
	      return item.value;
	    }

	    // try to read from _cache
	    item = this._cache.get(key);
	    if (item) {
	      // check expired
	      if (item.expired && getNow() > item.expired) {
	        item.expired = 0;
	        item.value = undefined;
	      } else {
	        // not expired, save to cache
	        this._update(key, item);
	        // update expired in get
	        if (maxAge !== undefined) {
	          const expired = maxAge ? getNow() + maxAge : 0;
	          item.expired = expired;
	        }
	      }
	      return item.value;
	    }
	  }

	  set(key, value, options) {
	    const maxAge = options && options.maxAge;
	    const expired = maxAge ? Date.now() + maxAge : 0;
	    let item = this.cache.get(key);
	    if (item) {
	      item.expired = expired;
	      item.value = value;
	    } else {
	      item = {
	        value,
	        expired,
	      };
	      this._update(key, item);
	    }
	  }

	  keys() {
	    const cacheKeys = new Set();
	    const now = Date.now();

	    for (const entry of this.cache.entries()) {
	      checkEntry(entry);
	    }

	    for (const entry of this._cache.entries()) {
	      checkEntry(entry);
	    }

	    function checkEntry(entry) {
	      const key = entry[0];
	      const item = entry[1];
	      if (entry[1].value && (!entry[1].expired) || item.expired >= now) {
	        cacheKeys.add(key);
	      }
	    }

	    return Array.from(cacheKeys.keys());
	  }

	  _update(key, item) {
	    this.cache.set(key, item);
	    this.size++;
	    if (this.size >= this.max) {
	      this.size = 0;
	      this._cache = this.cache;
	      this.cache = new Map();
	    }
	  }
	}

	var ylru = LRU;

	const typeLRUCache = new ylru(100);

	var cacheContentType = type => {
	  let mimeType = typeLRUCache.get(type);
	  if (!mimeType) {
	    mimeType = mimeTypes__default['default'].contentType(type);
	    typeLRUCache.set(type, mimeType);
	  }
	  return mimeType;
	};

	var response = createCommonjsModule(function (module) {

	/**
	 * Module dependencies.
	 */





	const typeis = typeIs__default['default'].is;



	const extname = path__default['default'].extname;






	/**
	 * Prototype.
	 */

	module.exports = {

	  /**
	   * Return the request socket.
	   *
	   * @return {Connection}
	   * @api public
	   */

	  get socket() {
	    return this.res.socket;
	  },

	  /**
	   * Return response header.
	   *
	   * @return {Object}
	   * @api public
	   */

	  get header() {
	    const { res } = this;
	    return typeof res.getHeaders === 'function'
	      ? res.getHeaders()
	      : res._headers || {}; // Node < 7.7
	  },

	  /**
	   * Return response header, alias as response.header
	   *
	   * @return {Object}
	   * @api public
	   */

	  get headers() {
	    return this.header;
	  },

	  /**
	   * Get response status code.
	   *
	   * @return {Number}
	   * @api public
	   */

	  get status() {
	    return this.res.statusCode;
	  },

	  /**
	   * Set response status code.
	   *
	   * @param {Number} code
	   * @api public
	   */

	  set status(code) {
	    if (this.headerSent) return;

	    assert__default['default'](Number.isInteger(code), 'status code must be a number');
	    assert__default['default'](code >= 100 && code <= 999, `invalid status code: ${code}`);
	    this._explicitStatus = true;
	    this.res.statusCode = code;
	    if (this.req.httpVersionMajor < 2) this.res.statusMessage = statuses__default['default'][code];
	    if (this.body && statuses__default['default'].empty[code]) this.body = null;
	  },

	  /**
	   * Get response status message
	   *
	   * @return {String}
	   * @api public
	   */

	  get message() {
	    return this.res.statusMessage || statuses__default['default'][this.status];
	  },

	  /**
	   * Set response status message
	   *
	   * @param {String} msg
	   * @api public
	   */

	  set message(msg) {
	    this.res.statusMessage = msg;
	  },

	  /**
	   * Get response body.
	   *
	   * @return {Mixed}
	   * @api public
	   */

	  get body() {
	    return this._body;
	  },

	  /**
	   * Set response body.
	   *
	   * @param {String|Buffer|Object|Stream} val
	   * @api public
	   */

	  set body(val) {
	    const original = this._body;
	    this._body = val;

	    // no content
	    if (null == val) {
	      if (!statuses__default['default'].empty[this.status]) this.status = 204;
	      if (val === null) this._explicitNullBody = true;
	      this.remove('Content-Type');
	      this.remove('Content-Length');
	      this.remove('Transfer-Encoding');
	      return;
	    }

	    // set the status
	    if (!this._explicitStatus) this.status = 200;

	    // set the content-type only if not yet set
	    const setType = !this.has('Content-Type');

	    // string
	    if ('string' === typeof val) {
	      if (setType) this.type = /^\s*</.test(val) ? 'html' : 'text';
	      this.length = Buffer.byteLength(val);
	      return;
	    }

	    // buffer
	    if (Buffer.isBuffer(val)) {
	      if (setType) this.type = 'bin';
	      this.length = val.length;
	      return;
	    }

	    // stream
	    if (val instanceof stream__default['default']) {
	      onFinished__default['default'](this.res, destroy__default['default'].bind(null, val));
	      if (original != val) {
	        val.once('error', err => this.ctx.onerror(err));
	        // overwriting
	        if (null != original) this.remove('Content-Length');
	      }

	      if (setType) this.type = 'bin';
	      return;
	    }

	    // json
	    this.remove('Content-Length');
	    this.type = 'json';
	  },

	  /**
	   * Set Content-Length field to `n`.
	   *
	   * @param {Number} n
	   * @api public
	   */

	  set length(n) {
	    this.set('Content-Length', n);
	  },

	  /**
	   * Return parsed response Content-Length when present.
	   *
	   * @return {Number}
	   * @api public
	   */

	  get length() {
	    if (this.has('Content-Length')) {
	      return parseInt(this.get('Content-Length'), 10) || 0;
	    }

	    const { body } = this;
	    if (!body || body instanceof stream__default['default']) return undefined;
	    if ('string' === typeof body) return Buffer.byteLength(body);
	    if (Buffer.isBuffer(body)) return body.length;
	    return Buffer.byteLength(JSON.stringify(body));
	  },

	  /**
	   * Check if a header has been written to the socket.
	   *
	   * @return {Boolean}
	   * @api public
	   */

	  get headerSent() {
	    return this.res.headersSent;
	  },

	  /**
	   * Vary on `field`.
	   *
	   * @param {String} field
	   * @api public
	   */

	  vary(field) {
	    if (this.headerSent) return;

	    vary__default['default'](this.res, field);
	  },

	  /**
	   * Perform a 302 redirect to `url`.
	   *
	   * The string "back" is special-cased
	   * to provide Referrer support, when Referrer
	   * is not present `alt` or "/" is used.
	   *
	   * Examples:
	   *
	   *    this.redirect('back');
	   *    this.redirect('back', '/index.html');
	   *    this.redirect('/login');
	   *    this.redirect('http://google.com');
	   *
	   * @param {String} url
	   * @param {String} [alt]
	   * @api public
	   */

	  redirect(url, alt) {
	    // location
	    if ('back' === url) url = this.ctx.get('Referrer') || alt || '/';
	    this.set('Location', encodeurl__default['default'](url));

	    // status
	    if (!statuses__default['default'].redirect[this.status]) this.status = 302;

	    // html
	    if (this.ctx.accepts('html')) {
	      url = escapeHtml__default['default'](url);
	      this.type = 'text/html; charset=utf-8';
	      this.body = `Redirecting to <a href="${url}">${url}</a>.`;
	      return;
	    }

	    // text
	    this.type = 'text/plain; charset=utf-8';
	    this.body = `Redirecting to ${url}.`;
	  },

	  /**
	   * Set Content-Disposition header to "attachment" with optional `filename`.
	   *
	   * @param {String} filename
	   * @api public
	   */

	  attachment(filename, options) {
	    if (filename) this.type = extname(filename);
	    this.set('Content-Disposition', contentDisposition__default['default'](filename, options));
	  },

	  /**
	   * Set Content-Type response header with `type` through `mime.lookup()`
	   * when it does not contain a charset.
	   *
	   * Examples:
	   *
	   *     this.type = '.html';
	   *     this.type = 'html';
	   *     this.type = 'json';
	   *     this.type = 'application/json';
	   *     this.type = 'png';
	   *
	   * @param {String} type
	   * @api public
	   */

	  set type(type) {
	    type = cacheContentType(type);
	    if (type) {
	      this.set('Content-Type', type);
	    } else {
	      this.remove('Content-Type');
	    }
	  },

	  /**
	   * Set the Last-Modified date using a string or a Date.
	   *
	   *     this.response.lastModified = new Date();
	   *     this.response.lastModified = '2013-09-13';
	   *
	   * @param {String|Date} type
	   * @api public
	   */

	  set lastModified(val) {
	    if ('string' === typeof val) val = new Date(val);
	    this.set('Last-Modified', val.toUTCString());
	  },

	  /**
	   * Get the Last-Modified date in Date form, if it exists.
	   *
	   * @return {Date}
	   * @api public
	   */

	  get lastModified() {
	    const date = this.get('last-modified');
	    if (date) return new Date(date);
	  },

	  /**
	   * Set the ETag of a response.
	   * This will normalize the quotes if necessary.
	   *
	   *     this.response.etag = 'md5hashsum';
	   *     this.response.etag = '"md5hashsum"';
	   *     this.response.etag = 'W/"123456789"';
	   *
	   * @param {String} etag
	   * @api public
	   */

	  set etag(val) {
	    if (!/^(W\/)?"/.test(val)) val = `"${val}"`;
	    this.set('ETag', val);
	  },

	  /**
	   * Get the ETag of a response.
	   *
	   * @return {String}
	   * @api public
	   */

	  get etag() {
	    return this.get('ETag');
	  },

	  /**
	   * Return the response mime type void of
	   * parameters such as "charset".
	   *
	   * @return {String}
	   * @api public
	   */

	  get type() {
	    const type = this.get('Content-Type');
	    if (!type) return '';
	    return type.split(';', 1)[0];
	  },

	  /**
	   * Check whether the response is one of the listed types.
	   * Pretty much the same as `this.request.is()`.
	   *
	   * @param {String|String[]} [type]
	   * @param {String[]} [types]
	   * @return {String|false}
	   * @api public
	   */

	  is(type, ...types) {
	    return typeis(this.type, type, ...types);
	  },

	  /**
	   * Return response header.
	   *
	   * Examples:
	   *
	   *     this.get('Content-Type');
	   *     // => "text/plain"
	   *
	   *     this.get('content-type');
	   *     // => "text/plain"
	   *
	   * @param {String} field
	   * @return {String}
	   * @api public
	   */

	  get(field) {
	    return this.header[field.toLowerCase()] || '';
	  },

	  /**
	   * Returns true if the header identified by name is currently set in the outgoing headers.
	   * The header name matching is case-insensitive.
	   *
	   * Examples:
	   *
	   *     this.has('Content-Type');
	   *     // => true
	   *
	   *     this.get('content-type');
	   *     // => true
	   *
	   * @param {String} field
	   * @return {boolean}
	   * @api public
	   */
	  has(field) {
	    return typeof this.res.hasHeader === 'function'
	      ? this.res.hasHeader(field)
	      // Node < 7.7
	      : field.toLowerCase() in this.headers;
	  },

	  /**
	   * Set header `field` to `val`, or pass
	   * an object of header fields.
	   *
	   * Examples:
	   *
	   *    this.set('Foo', ['bar', 'baz']);
	   *    this.set('Accept', 'application/json');
	   *    this.set({ Accept: 'text/plain', 'X-API-Key': 'tobi' });
	   *
	   * @param {String|Object|Array} field
	   * @param {String} val
	   * @api public
	   */

	  set(field, val) {
	    if (this.headerSent) return;

	    if (2 === arguments.length) {
	      if (Array.isArray(val)) val = val.map(v => typeof v === 'string' ? v : String(v));
	      else if (typeof val !== 'string') val = String(val);
	      this.res.setHeader(field, val);
	    } else {
	      for (const key in field) {
	        this.set(key, field[key]);
	      }
	    }
	  },

	  /**
	   * Append additional header `field` with value `val`.
	   *
	   * Examples:
	   *
	   * ```
	   * this.append('Link', ['<http://localhost/>', '<http://localhost:3000/>']);
	   * this.append('Set-Cookie', 'foo=bar; Path=/; HttpOnly');
	   * this.append('Warning', '199 Miscellaneous warning');
	   * ```
	   *
	   * @param {String} field
	   * @param {String|Array} val
	   * @api public
	   */

	  append(field, val) {
	    const prev = this.get(field);

	    if (prev) {
	      val = Array.isArray(prev)
	        ? prev.concat(val)
	        : [prev].concat(val);
	    }

	    return this.set(field, val);
	  },

	  /**
	   * Remove header `field`.
	   *
	   * @param {String} name
	   * @api public
	   */

	  remove(field) {
	    if (this.headerSent) return;

	    this.res.removeHeader(field);
	  },

	  /**
	   * Checks if the request is writable.
	   * Tests for the existence of the socket
	   * as node sometimes does not set it.
	   *
	   * @return {Boolean}
	   * @api private
	   */

	  get writable() {
	    // can't write any more after response finished
	    // response.writableEnded is available since Node > 12.9
	    // https://nodejs.org/api/http.html#http_response_writableended
	    // response.finished is undocumented feature of previous Node versions
	    // https://stackoverflow.com/questions/16254385/undocumented-response-finished-in-node-js
	    if (this.res.writableEnded || this.res.finished) return false;

	    const socket = this.res.socket;
	    // There are already pending outgoing res, but still writable
	    // https://github.com/nodejs/node/blob/v4.4.7/lib/_http_server.js#L486
	    if (!socket) return true;
	    return socket.writable;
	  },

	  /**
	   * Inspect implementation.
	   *
	   * @return {Object}
	   * @api public
	   */

	  inspect() {
	    if (!this.res) return;
	    const o = this.toJSON();
	    o.body = this.body;
	    return o;
	  },

	  /**
	   * Return JSON representation.
	   *
	   * @return {Object}
	   * @api public
	   */

	  toJSON() {
	    return only__default['default'](this, [
	      'status',
	      'message',
	      'header'
	    ]);
	  },

	  /**
	   * Flush any set headers, and begin the body
	   */
	  flushHeaders() {
	    this.res.flushHeaders();
	  }
	};

	/**
	 * Custom inspection implementation for node 6+.
	 *
	 * @return {Object}
	 * @api public
	 */
	/* istanbul ignore else */
	if (util__default['default'].inspect.custom) {
	  module.exports[util__default['default'].inspect.custom] = module.exports.inspect;
	}
	});
	var response_1 = response.socket;
	var response_2 = response.header;
	var response_3 = response.headers;
	var response_4 = response.status;
	var response_5 = response.message;
	var response_6 = response.body;
	var response_7 = response.length;
	var response_8 = response.headerSent;
	var response_9 = response.vary;
	var response_10 = response.redirect;
	var response_11 = response.attachment;
	var response_12 = response.type;
	var response_13 = response.lastModified;
	var response_14 = response.etag;
	var response_15 = response.is;
	var response_16 = response.get;
	var response_17 = response.has;
	var response_18 = response.set;
	var response_19 = response.append;
	var response_20 = response.remove;
	var response_21 = response.writable;
	var response_22 = response.inspect;
	var response_23 = response.toJSON;
	var response_24 = response.flushHeaders;

	var context = createCommonjsModule(function (module) {

	/**
	 * Module dependencies.
	 */








	const COOKIES = Symbol('context#cookies');

	/**
	 * Context prototype.
	 */

	const proto = module.exports = {

	  /**
	   * util.inspect() implementation, which
	   * just returns the JSON output.
	   *
	   * @return {Object}
	   * @api public
	   */

	  inspect() {
	    if (this === proto) return this;
	    return this.toJSON();
	  },

	  /**
	   * Return JSON representation.
	   *
	   * Here we explicitly invoke .toJSON() on each
	   * object, as iteration will otherwise fail due
	   * to the getters and cause utilities such as
	   * clone() to fail.
	   *
	   * @return {Object}
	   * @api public
	   */

	  toJSON() {
	    return {
	      request: this.request.toJSON(),
	      response: this.response.toJSON(),
	      app: this.app.toJSON(),
	      originalUrl: this.originalUrl,
	      req: '<original node req>',
	      res: '<original node res>',
	      socket: '<original node socket>'
	    };
	  },

	  /**
	   * Similar to .throw(), adds assertion.
	   *
	   *    this.assert(this.user, 401, 'Please login!');
	   *
	   * See: https://github.com/jshttp/http-assert
	   *
	   * @param {Mixed} test
	   * @param {Number} status
	   * @param {String} message
	   * @api public
	   */

	  assert: httpAssert__default['default'],

	  /**
	   * Throw an error with `status` (default 500) and
	   * `msg`. Note that these are user-level
	   * errors, and the message may be exposed to the client.
	   *
	   *    this.throw(403)
	   *    this.throw(400, 'name required')
	   *    this.throw('something exploded')
	   *    this.throw(new Error('invalid'))
	   *    this.throw(400, new Error('invalid'))
	   *
	   * See: https://github.com/jshttp/http-errors
	   *
	   * Note: `status` should only be passed as the first parameter.
	   *
	   * @param {String|Number|Error} err, msg or status
	   * @param {String|Number|Error} [err, msg or status]
	   * @param {Object} [props]
	   * @api public
	   */

	  throw(...args) {
	    throw httpErrors__default['default'](...args);
	  },

	  /**
	   * Default error handling.
	   *
	   * @param {Error} err
	   * @api private
	   */

	  onerror(err) {
	    // don't do anything if there is no error.
	    // this allows you to pass `this.onerror`
	    // to node-style callbacks.
	    if (null == err) return;

	    // When dealing with cross-globals a normal `instanceof` check doesn't work properly.
	    // See https://github.com/koajs/koa/issues/1466
	    // We can probably remove it once jest fixes https://github.com/facebook/jest/issues/2549.
	    const isNativeError =
	      Object.prototype.toString.call(err) === '[object Error]' ||
	      err instanceof Error;
	    if (!isNativeError) err = new Error(util__default['default'].format('non-error thrown: %j', err));

	    let headerSent = false;
	    if (this.headerSent || !this.writable) {
	      headerSent = err.headerSent = true;
	    }

	    // delegate
	    this.app.emit('error', err, this);

	    // nothing we can do here other
	    // than delegate to the app-level
	    // handler and log.
	    if (headerSent) {
	      return;
	    }

	    const { res } = this;

	    // first unset all headers
	    /* istanbul ignore else */
	    if (typeof res.getHeaderNames === 'function') {
	      res.getHeaderNames().forEach(name => res.removeHeader(name));
	    } else {
	      res._headers = {}; // Node < 7.7
	    }

	    // then set those specified
	    this.set(err.headers);

	    // force text/plain
	    this.type = 'text';

	    let statusCode = err.status || err.statusCode;

	    // ENOENT support
	    if ('ENOENT' === err.code) statusCode = 404;

	    // default to 500
	    if ('number' !== typeof statusCode || !statuses__default['default'][statusCode]) statusCode = 500;

	    // respond
	    const code = statuses__default['default'][statusCode];
	    const msg = err.expose ? err.message : code;
	    this.status = err.status = statusCode;
	    this.length = Buffer.byteLength(msg);
	    res.end(msg);
	  },

	  get cookies() {
	    if (!this[COOKIES]) {
	      this[COOKIES] = new cookies__default['default'](this.req, this.res, {
	        keys: this.app.keys,
	        secure: this.request.secure
	      });
	    }
	    return this[COOKIES];
	  },

	  set cookies(_cookies) {
	    this[COOKIES] = _cookies;
	  }
	};

	/**
	 * Custom inspection implementation for newer Node.js versions.
	 *
	 * @return {Object}
	 * @api public
	 */

	/* istanbul ignore else */
	if (util__default['default'].inspect.custom) {
	  module.exports[util__default['default'].inspect.custom] = module.exports.inspect;
	}

	/**
	 * Response delegation.
	 */

	delegates__default['default'](proto, 'response')
	  .method('attachment')
	  .method('redirect')
	  .method('remove')
	  .method('vary')
	  .method('has')
	  .method('set')
	  .method('append')
	  .method('flushHeaders')
	  .access('status')
	  .access('message')
	  .access('body')
	  .access('length')
	  .access('type')
	  .access('lastModified')
	  .access('etag')
	  .getter('headerSent')
	  .getter('writable');

	/**
	 * Request delegation.
	 */

	delegates__default['default'](proto, 'request')
	  .method('acceptsLanguages')
	  .method('acceptsEncodings')
	  .method('acceptsCharsets')
	  .method('accepts')
	  .method('get')
	  .method('is')
	  .access('querystring')
	  .access('idempotent')
	  .access('socket')
	  .access('search')
	  .access('method')
	  .access('query')
	  .access('path')
	  .access('url')
	  .access('accept')
	  .getter('origin')
	  .getter('href')
	  .getter('subdomains')
	  .getter('protocol')
	  .getter('host')
	  .getter('hostname')
	  .getter('URL')
	  .getter('header')
	  .getter('headers')
	  .getter('secure')
	  .getter('stale')
	  .getter('fresh')
	  .getter('ips')
	  .getter('ip');
	});
	var context_1 = context.inspect;
	var context_2 = context.toJSON;
	var context_3 = context.assert;
	var context_4 = context.onerror;
	var context_5 = context.cookies;

	var request = createCommonjsModule(function (module) {

	/**
	 * Module dependencies.
	 */

	const URL = url__default['default'].URL;



	const stringify = url__default['default'].format;







	const IP = Symbol('context#ip');

	/**
	 * Prototype.
	 */

	module.exports = {

	  /**
	   * Return request header.
	   *
	   * @return {Object}
	   * @api public
	   */

	  get header() {
	    return this.req.headers;
	  },

	  /**
	   * Set request header.
	   *
	   * @api public
	   */

	  set header(val) {
	    this.req.headers = val;
	  },

	  /**
	   * Return request header, alias as request.header
	   *
	   * @return {Object}
	   * @api public
	   */

	  get headers() {
	    return this.req.headers;
	  },

	  /**
	   * Set request header, alias as request.header
	   *
	   * @api public
	   */

	  set headers(val) {
	    this.req.headers = val;
	  },

	  /**
	   * Get request URL.
	   *
	   * @return {String}
	   * @api public
	   */

	  get url() {
	    return this.req.url;
	  },

	  /**
	   * Set request URL.
	   *
	   * @api public
	   */

	  set url(val) {
	    this.req.url = val;
	  },

	  /**
	   * Get origin of URL.
	   *
	   * @return {String}
	   * @api public
	   */

	  get origin() {
	    return `${this.protocol}://${this.host}`;
	  },

	  /**
	   * Get full request URL.
	   *
	   * @return {String}
	   * @api public
	   */

	  get href() {
	    // support: `GET http://example.com/foo`
	    if (/^https?:\/\//i.test(this.originalUrl)) return this.originalUrl;
	    return this.origin + this.originalUrl;
	  },

	  /**
	   * Get request method.
	   *
	   * @return {String}
	   * @api public
	   */

	  get method() {
	    return this.req.method;
	  },

	  /**
	   * Set request method.
	   *
	   * @param {String} val
	   * @api public
	   */

	  set method(val) {
	    this.req.method = val;
	  },

	  /**
	   * Get request pathname.
	   *
	   * @return {String}
	   * @api public
	   */

	  get path() {
	    return parseurl__default['default'](this.req).pathname;
	  },

	  /**
	   * Set pathname, retaining the query-string when present.
	   *
	   * @param {String} path
	   * @api public
	   */

	  set path(path) {
	    const url = parseurl__default['default'](this.req);
	    if (url.pathname === path) return;

	    url.pathname = path;
	    url.path = null;

	    this.url = stringify(url);
	  },

	  /**
	   * Get parsed query-string.
	   *
	   * @return {Object}
	   * @api public
	   */

	  get query() {
	    const str = this.querystring;
	    const c = this._querycache = this._querycache || {};
	    return c[str] || (c[str] = querystring__default['default'].parse(str));
	  },

	  /**
	   * Set query-string as an object.
	   *
	   * @param {Object} obj
	   * @api public
	   */

	  set query(obj) {
	    this.querystring = querystring__default['default'].stringify(obj);
	  },

	  /**
	   * Get query string.
	   *
	   * @return {String}
	   * @api public
	   */

	  get querystring() {
	    if (!this.req) return '';
	    return parseurl__default['default'](this.req).query || '';
	  },

	  /**
	   * Set querystring.
	   *
	   * @param {String} str
	   * @api public
	   */

	  set querystring(str) {
	    const url = parseurl__default['default'](this.req);
	    if (url.search === `?${str}`) return;

	    url.search = str;
	    url.path = null;

	    this.url = stringify(url);
	  },

	  /**
	   * Get the search string. Same as the querystring
	   * except it includes the leading ?.
	   *
	   * @return {String}
	   * @api public
	   */

	  get search() {
	    if (!this.querystring) return '';
	    return `?${this.querystring}`;
	  },

	  /**
	   * Set the search string. Same as
	   * request.querystring= but included for ubiquity.
	   *
	   * @param {String} str
	   * @api public
	   */

	  set search(str) {
	    this.querystring = str;
	  },

	  /**
	   * Parse the "Host" header field host
	   * and support X-Forwarded-Host when a
	   * proxy is enabled.
	   *
	   * @return {String} hostname:port
	   * @api public
	   */

	  get host() {
	    const proxy = this.app.proxy;
	    let host = proxy && this.get('X-Forwarded-Host');
	    if (!host) {
	      if (this.req.httpVersionMajor >= 2) host = this.get(':authority');
	      if (!host) host = this.get('Host');
	    }
	    if (!host) return '';
	    return host.split(/\s*,\s*/, 1)[0];
	  },

	  /**
	   * Parse the "Host" header field hostname
	   * and support X-Forwarded-Host when a
	   * proxy is enabled.
	   *
	   * @return {String} hostname
	   * @api public
	   */

	  get hostname() {
	    const host = this.host;
	    if (!host) return '';
	    if ('[' === host[0]) return this.URL.hostname || ''; // IPv6
	    return host.split(':', 1)[0];
	  },

	  /**
	   * Get WHATWG parsed URL.
	   * Lazily memoized.
	   *
	   * @return {URL|Object}
	   * @api public
	   */

	  get URL() {
	    /* istanbul ignore else */
	    if (!this.memoizedURL) {
	      const originalUrl = this.originalUrl || ''; // avoid undefined in template string
	      try {
	        this.memoizedURL = new URL(`${this.origin}${originalUrl}`);
	      } catch (err) {
	        this.memoizedURL = Object.create(null);
	      }
	    }
	    return this.memoizedURL;
	  },

	  /**
	   * Check if the request is fresh, aka
	   * Last-Modified and/or the ETag
	   * still match.
	   *
	   * @return {Boolean}
	   * @api public
	   */

	  get fresh() {
	    const method = this.method;
	    const s = this.ctx.status;

	    // GET or HEAD for weak freshness validation only
	    if ('GET' !== method && 'HEAD' !== method) return false;

	    // 2xx or 304 as per rfc2616 14.26
	    if ((s >= 200 && s < 300) || 304 === s) {
	      return fresh__default['default'](this.header, this.response.header);
	    }

	    return false;
	  },

	  /**
	   * Check if the request is stale, aka
	   * "Last-Modified" and / or the "ETag" for the
	   * resource has changed.
	   *
	   * @return {Boolean}
	   * @api public
	   */

	  get stale() {
	    return !this.fresh;
	  },

	  /**
	   * Check if the request is idempotent.
	   *
	   * @return {Boolean}
	   * @api public
	   */

	  get idempotent() {
	    const methods = ['GET', 'HEAD', 'PUT', 'DELETE', 'OPTIONS', 'TRACE'];
	    return !!~methods.indexOf(this.method);
	  },

	  /**
	   * Return the request socket.
	   *
	   * @return {Connection}
	   * @api public
	   */

	  get socket() {
	    return this.req.socket;
	  },

	  /**
	   * Get the charset when present or undefined.
	   *
	   * @return {String}
	   * @api public
	   */

	  get charset() {
	    try {
	      const { parameters } = contentType__default['default'].parse(this.req);
	      return parameters.charset || '';
	    } catch (e) {
	      return '';
	    }
	  },

	  /**
	   * Return parsed Content-Length when present.
	   *
	   * @return {Number}
	   * @api public
	   */

	  get length() {
	    const len = this.get('Content-Length');
	    if (len === '') return;
	    return ~~len;
	  },

	  /**
	   * Return the protocol string "http" or "https"
	   * when requested with TLS. When the proxy setting
	   * is enabled the "X-Forwarded-Proto" header
	   * field will be trusted. If you're running behind
	   * a reverse proxy that supplies https for you this
	   * may be enabled.
	   *
	   * @return {String}
	   * @api public
	   */

	  get protocol() {
	    if (this.socket.encrypted) return 'https';
	    if (!this.app.proxy) return 'http';
	    const proto = this.get('X-Forwarded-Proto');
	    return proto ? proto.split(/\s*,\s*/, 1)[0] : 'http';
	  },

	  /**
	   * Short-hand for:
	   *
	   *    this.protocol == 'https'
	   *
	   * @return {Boolean}
	   * @api public
	   */

	  get secure() {
	    return 'https' === this.protocol;
	  },

	  /**
	   * When `app.proxy` is `true`, parse
	   * the "X-Forwarded-For" ip address list.
	   *
	   * For example if the value were "client, proxy1, proxy2"
	   * you would receive the array `["client", "proxy1", "proxy2"]`
	   * where "proxy2" is the furthest down-stream.
	   *
	   * @return {Array}
	   * @api public
	   */

	  get ips() {
	    const proxy = this.app.proxy;
	    const val = this.get(this.app.proxyIpHeader);
	    let ips = proxy && val
	      ? val.split(/\s*,\s*/)
	      : [];
	    if (this.app.maxIpsCount > 0) {
	      ips = ips.slice(-this.app.maxIpsCount);
	    }
	    return ips;
	  },

	  /**
	   * Return request's remote address
	   * When `app.proxy` is `true`, parse
	   * the "X-Forwarded-For" ip address list and return the first one
	   *
	   * @return {String}
	   * @api public
	   */

	  get ip() {
	    if (!this[IP]) {
	      this[IP] = this.ips[0] || this.socket.remoteAddress || '';
	    }
	    return this[IP];
	  },

	  set ip(_ip) {
	    this[IP] = _ip;
	  },

	  /**
	   * Return subdomains as an array.
	   *
	   * Subdomains are the dot-separated parts of the host before the main domain
	   * of the app. By default, the domain of the app is assumed to be the last two
	   * parts of the host. This can be changed by setting `app.subdomainOffset`.
	   *
	   * For example, if the domain is "tobi.ferrets.example.com":
	   * If `app.subdomainOffset` is not set, this.subdomains is
	   * `["ferrets", "tobi"]`.
	   * If `app.subdomainOffset` is 3, this.subdomains is `["tobi"]`.
	   *
	   * @return {Array}
	   * @api public
	   */

	  get subdomains() {
	    const offset = this.app.subdomainOffset;
	    const hostname = this.hostname;
	    if (net__default['default'].isIP(hostname)) return [];
	    return hostname
	      .split('.')
	      .reverse()
	      .slice(offset);
	  },

	  /**
	   * Get accept object.
	   * Lazily memoized.
	   *
	   * @return {Object}
	   * @api private
	   */
	  get accept() {
	    return this._accept || (this._accept = accepts__default['default'](this.req));
	  },

	  /**
	   * Set accept object.
	   *
	   * @param {Object}
	   * @api private
	   */
	  set accept(obj) {
	    this._accept = obj;
	  },

	  /**
	   * Check if the given `type(s)` is acceptable, returning
	   * the best match when true, otherwise `false`, in which
	   * case you should respond with 406 "Not Acceptable".
	   *
	   * The `type` value may be a single mime type string
	   * such as "application/json", the extension name
	   * such as "json" or an array `["json", "html", "text/plain"]`. When a list
	   * or array is given the _best_ match, if any is returned.
	   *
	   * Examples:
	   *
	   *     // Accept: text/html
	   *     this.accepts('html');
	   *     // => "html"
	   *
	   *     // Accept: text/*, application/json
	   *     this.accepts('html');
	   *     // => "html"
	   *     this.accepts('text/html');
	   *     // => "text/html"
	   *     this.accepts('json', 'text');
	   *     // => "json"
	   *     this.accepts('application/json');
	   *     // => "application/json"
	   *
	   *     // Accept: text/*, application/json
	   *     this.accepts('image/png');
	   *     this.accepts('png');
	   *     // => false
	   *
	   *     // Accept: text/*;q=.5, application/json
	   *     this.accepts(['html', 'json']);
	   *     this.accepts('html', 'json');
	   *     // => "json"
	   *
	   * @param {String|Array} type(s)...
	   * @return {String|Array|false}
	   * @api public
	   */

	  accepts(...args) {
	    return this.accept.types(...args);
	  },

	  /**
	   * Return accepted encodings or best fit based on `encodings`.
	   *
	   * Given `Accept-Encoding: gzip, deflate`
	   * an array sorted by quality is returned:
	   *
	   *     ['gzip', 'deflate']
	   *
	   * @param {String|Array} encoding(s)...
	   * @return {String|Array}
	   * @api public
	   */

	  acceptsEncodings(...args) {
	    return this.accept.encodings(...args);
	  },

	  /**
	   * Return accepted charsets or best fit based on `charsets`.
	   *
	   * Given `Accept-Charset: utf-8, iso-8859-1;q=0.2, utf-7;q=0.5`
	   * an array sorted by quality is returned:
	   *
	   *     ['utf-8', 'utf-7', 'iso-8859-1']
	   *
	   * @param {String|Array} charset(s)...
	   * @return {String|Array}
	   * @api public
	   */

	  acceptsCharsets(...args) {
	    return this.accept.charsets(...args);
	  },

	  /**
	   * Return accepted languages or best fit based on `langs`.
	   *
	   * Given `Accept-Language: en;q=0.8, es, pt`
	   * an array sorted by quality is returned:
	   *
	   *     ['es', 'pt', 'en']
	   *
	   * @param {String|Array} lang(s)...
	   * @return {Array|String}
	   * @api public
	   */

	  acceptsLanguages(...args) {
	    return this.accept.languages(...args);
	  },

	  /**
	   * Check if the incoming request contains the "Content-Type"
	   * header field, and it contains any of the give mime `type`s.
	   * If there is no request body, `null` is returned.
	   * If there is no content type, `false` is returned.
	   * Otherwise, it returns the first `type` that matches.
	   *
	   * Examples:
	   *
	   *     // With Content-Type: text/html; charset=utf-8
	   *     this.is('html'); // => 'html'
	   *     this.is('text/html'); // => 'text/html'
	   *     this.is('text/*', 'application/json'); // => 'text/html'
	   *
	   *     // When Content-Type is application/json
	   *     this.is('json', 'urlencoded'); // => 'json'
	   *     this.is('application/json'); // => 'application/json'
	   *     this.is('html', 'application/*'); // => 'application/json'
	   *
	   *     this.is('html'); // => false
	   *
	   * @param {String|String[]} [type]
	   * @param {String[]} [types]
	   * @return {String|false|null}
	   * @api public
	   */

	  is(type, ...types) {
	    return typeIs__default['default'](this.req, type, ...types);
	  },

	  /**
	   * Return the request mime type void of
	   * parameters such as "charset".
	   *
	   * @return {String}
	   * @api public
	   */

	  get type() {
	    const type = this.get('Content-Type');
	    if (!type) return '';
	    return type.split(';')[0];
	  },

	  /**
	   * Return request header.
	   *
	   * The `Referrer` header field is special-cased,
	   * both `Referrer` and `Referer` are interchangeable.
	   *
	   * Examples:
	   *
	   *     this.get('Content-Type');
	   *     // => "text/plain"
	   *
	   *     this.get('content-type');
	   *     // => "text/plain"
	   *
	   *     this.get('Something');
	   *     // => ''
	   *
	   * @param {String} field
	   * @return {String}
	   * @api public
	   */

	  get(field) {
	    const req = this.req;
	    switch (field = field.toLowerCase()) {
	      case 'referer':
	      case 'referrer':
	        return req.headers.referrer || req.headers.referer || '';
	      default:
	        return req.headers[field] || '';
	    }
	  },

	  /**
	   * Inspect implementation.
	   *
	   * @return {Object}
	   * @api public
	   */

	  inspect() {
	    if (!this.req) return;
	    return this.toJSON();
	  },

	  /**
	   * Return JSON representation.
	   *
	   * @return {Object}
	   * @api public
	   */

	  toJSON() {
	    return only__default['default'](this, [
	      'method',
	      'url',
	      'header'
	    ]);
	  }
	};

	/**
	 * Custom inspection implementation for newer Node.js versions.
	 *
	 * @return {Object}
	 * @api public
	 */

	/* istanbul ignore else */
	if (util__default['default'].inspect.custom) {
	  module.exports[util__default['default'].inspect.custom] = module.exports.inspect;
	}
	});
	var request_1 = request.header;
	var request_2 = request.headers;
	var request_3 = request.url;
	var request_4 = request.origin;
	var request_5 = request.href;
	var request_6 = request.method;
	var request_7 = request.path;
	var request_8 = request.query;
	var request_9 = request.querystring;
	var request_10 = request.search;
	var request_11 = request.host;
	var request_12 = request.hostname;
	var request_13 = request.URL;
	var request_14 = request.fresh;
	var request_15 = request.stale;
	var request_16 = request.idempotent;
	var request_17 = request.socket;
	var request_18 = request.charset;
	var request_19 = request.length;
	var request_20 = request.protocol;
	var request_21 = request.secure;
	var request_22 = request.ips;
	var request_23 = request.ip;
	var request_24 = request.subdomains;
	var request_25 = request.accept;
	var request_26 = request.accepts;
	var request_27 = request.acceptsEncodings;
	var request_28 = request.acceptsCharsets;
	var request_29 = request.acceptsLanguages;
	var request_30 = request.is;
	var request_31 = request.type;
	var request_32 = request.get;
	var request_33 = request.inspect;
	var request_34 = request.toJSON;

	var koaConvert = convert;

	function convert (mw) {
	  if (typeof mw !== 'function') {
	    throw new TypeError('middleware must be a function')
	  }
	  if (mw.constructor.name !== 'GeneratorFunction') {
	    // assume it's Promise-based middleware
	    return mw
	  }
	  const converted = function (ctx, next) {
	    return co__default['default'].call(ctx, mw.call(ctx, createGenerator(next)))
	  };
	  converted._name = mw._name || mw.name;
	  return converted
	}

	function * createGenerator (next) {
	  return yield next()
	}

	// convert.compose(mw, mw, mw)
	// convert.compose([mw, mw, mw])
	convert.compose = function (arr) {
	  if (!Array.isArray(arr)) {
	    arr = Array.from(arguments);
	  }
	  return koaCompose__default['default'](arr.map(convert))
	};

	convert.back = function (mw) {
	  if (typeof mw !== 'function') {
	    throw new TypeError('middleware must be a function')
	  }
	  if (mw.constructor.name === 'GeneratorFunction') {
	    // assume it's generator middleware
	    return mw
	  }
	  const converted = function * (next) {
	    let ctx = this;
	    let called = false;
	    // no need try...catch here, it's ok even `mw()` throw exception
	    yield Promise.resolve(mw(ctx, function () {
	      if (called) {
	        // guard against multiple next() calls
	        // https://github.com/koajs/compose/blob/4e3e96baf58b817d71bd44a8c0d78bb42623aa95/index.js#L36
	        return Promise.reject(new Error('next() called multiple times'))
	      }
	      called = true;
	      return co__default['default'].call(ctx, next)
	    }));
	  };
	  converted._name = mw._name || mw.name;
	  return converted
	};

	/**
	 * Module dependencies.
	 */


	const debug$1 = src('koa:application');












	const deprecate = depd__default['default']('koa');
	const { HttpError } = httpErrors__default['default'];

	/**
	 * Expose `Application` class.
	 * Inherits from `Emitter.prototype`.
	 */

	var application = class Application extends events__default['default'] {
	  /**
	   * Initialize a new `Application`.
	   *
	   * @api public
	   */

	  /**
	    *
	    * @param {object} [options] Application options
	    * @param {string} [options.env='development'] Environment
	    * @param {string[]} [options.keys] Signed cookie keys
	    * @param {boolean} [options.proxy] Trust proxy headers
	    * @param {number} [options.subdomainOffset] Subdomain offset
	    * @param {boolean} [options.proxyIpHeader] proxy ip header, default to X-Forwarded-For
	    * @param {boolean} [options.maxIpsCount] max ips read from proxy ip header, default to 0 (means infinity)
	    *
	    */

	  constructor(options) {
	    super();
	    options = options || {};
	    this.proxy = options.proxy || false;
	    this.subdomainOffset = options.subdomainOffset || 2;
	    this.proxyIpHeader = options.proxyIpHeader || 'X-Forwarded-For';
	    this.maxIpsCount = options.maxIpsCount || 0;
	    this.env = options.env || process.env.NODE_ENV || 'development';
	    if (options.keys) this.keys = options.keys;
	    this.middleware = [];
	    this.context = Object.create(context);
	    this.request = Object.create(request);
	    this.response = Object.create(response);
	    // util.inspect.custom support for node 6+
	    /* istanbul ignore else */
	    if (util__default['default'].inspect.custom) {
	      this[util__default['default'].inspect.custom] = this.inspect;
	    }
	  }

	  /**
	   * Shorthand for:
	   *
	   *    http.createServer(app.callback()).listen(...)
	   *
	   * @param {Mixed} ...
	   * @return {Server}
	   * @api public
	   */

	  listen(...args) {
	    debug$1('listen');
	    const server = http__default['default'].createServer(this.callback());
	    return server.listen(...args);
	  }

	  /**
	   * Return JSON representation.
	   * We only bother showing settings.
	   *
	   * @return {Object}
	   * @api public
	   */

	  toJSON() {
	    return only__default['default'](this, [
	      'subdomainOffset',
	      'proxy',
	      'env'
	    ]);
	  }

	  /**
	   * Inspect implementation.
	   *
	   * @return {Object}
	   * @api public
	   */

	  inspect() {
	    return this.toJSON();
	  }

	  /**
	   * Use the given middleware `fn`.
	   *
	   * Old-style middleware will be converted.
	   *
	   * @param {Function} fn
	   * @return {Application} self
	   * @api public
	   */

	  use(fn) {
	    if (typeof fn !== 'function') throw new TypeError('middleware must be a function!');
	    if (isGeneratorFunction(fn)) {
	      deprecate('Support for generators will be removed in v3. ' +
	                'See the documentation for examples of how to convert old middleware ' +
	                'https://github.com/koajs/koa/blob/master/docs/migration.md');
	      fn = koaConvert(fn);
	    }
	    debug$1('use %s', fn._name || fn.name || '-');
	    this.middleware.push(fn);
	    return this;
	  }

	  /**
	   * Return a request handler callback
	   * for node's native http server.
	   *
	   * @return {Function}
	   * @api public
	   */

	  callback() {
	    const fn = koaCompose__default['default'](this.middleware);

	    if (!this.listenerCount('error')) this.on('error', this.onerror);

	    const handleRequest = (req, res) => {
	      const ctx = this.createContext(req, res);
	      return this.handleRequest(ctx, fn);
	    };

	    return handleRequest;
	  }

	  /**
	   * Handle request in callback.
	   *
	   * @api private
	   */

	  handleRequest(ctx, fnMiddleware) {
	    const res = ctx.res;
	    res.statusCode = 404;
	    const onerror = err => ctx.onerror(err);
	    const handleResponse = () => respond(ctx);
	    onFinished__default['default'](res, onerror);
	    return fnMiddleware(ctx).then(handleResponse).catch(onerror);
	  }

	  /**
	   * Initialize a new context.
	   *
	   * @api private
	   */

	  createContext(req, res) {
	    const context = Object.create(this.context);
	    const request = context.request = Object.create(this.request);
	    const response = context.response = Object.create(this.response);
	    context.app = request.app = response.app = this;
	    context.req = request.req = response.req = req;
	    context.res = request.res = response.res = res;
	    request.ctx = response.ctx = context;
	    request.response = response;
	    response.request = request;
	    context.originalUrl = request.originalUrl = req.url;
	    context.state = {};
	    return context;
	  }

	  /**
	   * Default error handler.
	   *
	   * @param {Error} err
	   * @api private
	   */

	  onerror(err) {
	    // When dealing with cross-globals a normal `instanceof` check doesn't work properly.
	    // See https://github.com/koajs/koa/issues/1466
	    // We can probably remove it once jest fixes https://github.com/facebook/jest/issues/2549.
	    const isNativeError =
	      Object.prototype.toString.call(err) === '[object Error]' ||
	      err instanceof Error;
	    if (!isNativeError) throw new TypeError(util__default['default'].format('non-error thrown: %j', err));

	    if (404 === err.status || err.expose) return;
	    if (this.silent) return;

	    const msg = err.stack || err.toString();
	    console.error(`\n${msg.replace(/^/gm, '  ')}\n`);
	  }
	};

	/**
	 * Response helper.
	 */

	function respond(ctx) {
	  // allow bypassing koa
	  if (false === ctx.respond) return;

	  if (!ctx.writable) return;

	  const res = ctx.res;
	  let body = ctx.body;
	  const code = ctx.status;

	  // ignore body
	  if (statuses__default['default'].empty[code]) {
	    // strip headers
	    ctx.body = null;
	    return res.end();
	  }

	  if ('HEAD' === ctx.method) {
	    if (!res.headersSent && !ctx.response.has('Content-Length')) {
	      const { length } = ctx.response;
	      if (Number.isInteger(length)) ctx.length = length;
	    }
	    return res.end();
	  }

	  // status body
	  if (null == body) {
	    if (ctx.response._explicitNullBody) {
	      ctx.response.remove('Content-Type');
	      ctx.response.remove('Transfer-Encoding');
	      return res.end();
	    }
	    if (ctx.req.httpVersionMajor >= 2) {
	      body = String(code);
	    } else {
	      body = ctx.message || String(code);
	    }
	    if (!res.headersSent) {
	      ctx.type = 'text';
	      ctx.length = Buffer.byteLength(body);
	    }
	    return res.end(body);
	  }

	  // responses
	  if (Buffer.isBuffer(body)) return res.end(body);
	  if ('string' === typeof body) return res.end(body);
	  if (body instanceof stream__default['default']) return body.pipe(res);

	  // body: json
	  body = JSON.stringify(body);
	  if (!res.headersSent) {
	    ctx.length = Buffer.byteLength(body);
	  }
	  res.end(body);
	}

	/**
	 * Make HttpError available to consumers of the library so that consumers don't
	 * have a direct dependency upon `http-errors`
	 */
	var HttpError_1 = HttpError;
	application.HttpError = HttpError_1;

	var Koa = /*#__PURE__*/Object.freeze({
		__proto__: null,
		'default': application,
		__moduleExports: application,
		HttpError: HttpError_1
	});

	// const Koa = require('koa')
	const app = new Koa();
	class A {
	    constructor() { }
	    eat() {
	        console.log('eat');
	    }
	}
	const a = new A();
	a.eat();
	// console.log('2..')
	// app.use((ctx: any) => {
	//   ctx.body = 'hello koa'
	// })
	// app.listen(9001, () => {
	//   console.log('服务端口 9001 启动成功')
	// })
	// console.log('1231234')

}(ms, tty, util, supportsColor, onFinished, contentDisposition, mimeTypes, escapeHtml, typeIs, statuses, destroy, assert, path, vary, only, encodeurl, stream, koaCompose, httpErrors, httpAssert, delegates, cookies, url, net, accepts, contentType, parseurl, querystring, fresh, events, http, co, depd));

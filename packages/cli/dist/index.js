import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { stripVTControlCharacters } from "node:util";
import y, { stdin, stdout } from "node:process";
import * as g from "node:readline";
import O from "node:readline";
import { Writable } from "node:stream";

//#region rolldown:runtime
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function() {
	return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
		key = keys[i];
		if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
			get: ((k$2) => from[k$2]).bind(null, key),
			enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
		});
	}
	return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
	value: mod,
	enumerable: true
}) : target, mod));

//#endregion
//#region ../../node_modules/.pnpm/sisteransi@1.0.5/node_modules/sisteransi/src/index.js
var require_src = /* @__PURE__ */ __commonJS({ "../../node_modules/.pnpm/sisteransi@1.0.5/node_modules/sisteransi/src/index.js": ((exports, module) => {
	const ESC = "\x1B";
	const CSI = `${ESC}[`;
	const beep = "\x07";
	const cursor = {
		to(x$2, y$2) {
			if (!y$2) return `${CSI}${x$2 + 1}G`;
			return `${CSI}${y$2 + 1};${x$2 + 1}H`;
		},
		move(x$2, y$2) {
			let ret = "";
			if (x$2 < 0) ret += `${CSI}${-x$2}D`;
			else if (x$2 > 0) ret += `${CSI}${x$2}C`;
			if (y$2 < 0) ret += `${CSI}${-y$2}A`;
			else if (y$2 > 0) ret += `${CSI}${y$2}B`;
			return ret;
		},
		up: (count = 1) => `${CSI}${count}A`,
		down: (count = 1) => `${CSI}${count}B`,
		forward: (count = 1) => `${CSI}${count}C`,
		backward: (count = 1) => `${CSI}${count}D`,
		nextLine: (count = 1) => `${CSI}E`.repeat(count),
		prevLine: (count = 1) => `${CSI}F`.repeat(count),
		left: `${CSI}G`,
		hide: `${CSI}?25l`,
		show: `${CSI}?25h`,
		save: `${ESC}7`,
		restore: `${ESC}8`
	};
	const scroll = {
		up: (count = 1) => `${CSI}S`.repeat(count),
		down: (count = 1) => `${CSI}T`.repeat(count)
	};
	const erase = {
		screen: `${CSI}2J`,
		up: (count = 1) => `${CSI}1J`.repeat(count),
		down: (count = 1) => `${CSI}J`.repeat(count),
		line: `${CSI}2K`,
		lineEnd: `${CSI}K`,
		lineStart: `${CSI}1K`,
		lines(count) {
			let clear = "";
			for (let i = 0; i < count; i++) clear += this.line + (i < count - 1 ? cursor.up() : "");
			if (count) clear += cursor.left;
			return clear;
		}
	};
	module.exports = {
		cursor,
		scroll,
		erase,
		beep
	};
}) });

//#endregion
//#region ../../node_modules/.pnpm/picocolors@1.1.1/node_modules/picocolors/picocolors.js
var require_picocolors = /* @__PURE__ */ __commonJS({ "../../node_modules/.pnpm/picocolors@1.1.1/node_modules/picocolors/picocolors.js": ((exports, module) => {
	let p$1 = process || {}, argv = p$1.argv || [], env = p$1.env || {};
	let isColorSupported = !(!!env.NO_COLOR || argv.includes("--no-color")) && (!!env.FORCE_COLOR || argv.includes("--color") || p$1.platform === "win32" || (p$1.stdout || {}).isTTY && env.TERM !== "dumb" || !!env.CI);
	let formatter = (open, close, replace = open) => (input) => {
		let string = "" + input, index = string.indexOf(close, open.length);
		return ~index ? open + replaceClose(string, close, replace, index) + close : open + string + close;
	};
	let replaceClose = (string, close, replace, index) => {
		let result = "", cursor$1 = 0;
		do {
			result += string.substring(cursor$1, index) + replace;
			cursor$1 = index + close.length;
			index = string.indexOf(close, cursor$1);
		} while (~index);
		return result + string.substring(cursor$1);
	};
	let createColors = (enabled = isColorSupported) => {
		let f = enabled ? formatter : () => String;
		return {
			isColorSupported: enabled,
			reset: f("\x1B[0m", "\x1B[0m"),
			bold: f("\x1B[1m", "\x1B[22m", "\x1B[22m\x1B[1m"),
			dim: f("\x1B[2m", "\x1B[22m", "\x1B[22m\x1B[2m"),
			italic: f("\x1B[3m", "\x1B[23m"),
			underline: f("\x1B[4m", "\x1B[24m"),
			inverse: f("\x1B[7m", "\x1B[27m"),
			hidden: f("\x1B[8m", "\x1B[28m"),
			strikethrough: f("\x1B[9m", "\x1B[29m"),
			black: f("\x1B[30m", "\x1B[39m"),
			red: f("\x1B[31m", "\x1B[39m"),
			green: f("\x1B[32m", "\x1B[39m"),
			yellow: f("\x1B[33m", "\x1B[39m"),
			blue: f("\x1B[34m", "\x1B[39m"),
			magenta: f("\x1B[35m", "\x1B[39m"),
			cyan: f("\x1B[36m", "\x1B[39m"),
			white: f("\x1B[37m", "\x1B[39m"),
			gray: f("\x1B[90m", "\x1B[39m"),
			bgBlack: f("\x1B[40m", "\x1B[49m"),
			bgRed: f("\x1B[41m", "\x1B[49m"),
			bgGreen: f("\x1B[42m", "\x1B[49m"),
			bgYellow: f("\x1B[43m", "\x1B[49m"),
			bgBlue: f("\x1B[44m", "\x1B[49m"),
			bgMagenta: f("\x1B[45m", "\x1B[49m"),
			bgCyan: f("\x1B[46m", "\x1B[49m"),
			bgWhite: f("\x1B[47m", "\x1B[49m"),
			blackBright: f("\x1B[90m", "\x1B[39m"),
			redBright: f("\x1B[91m", "\x1B[39m"),
			greenBright: f("\x1B[92m", "\x1B[39m"),
			yellowBright: f("\x1B[93m", "\x1B[39m"),
			blueBright: f("\x1B[94m", "\x1B[39m"),
			magentaBright: f("\x1B[95m", "\x1B[39m"),
			cyanBright: f("\x1B[96m", "\x1B[39m"),
			whiteBright: f("\x1B[97m", "\x1B[39m"),
			bgBlackBright: f("\x1B[100m", "\x1B[49m"),
			bgRedBright: f("\x1B[101m", "\x1B[49m"),
			bgGreenBright: f("\x1B[102m", "\x1B[49m"),
			bgYellowBright: f("\x1B[103m", "\x1B[49m"),
			bgBlueBright: f("\x1B[104m", "\x1B[49m"),
			bgMagentaBright: f("\x1B[105m", "\x1B[49m"),
			bgCyanBright: f("\x1B[106m", "\x1B[49m"),
			bgWhiteBright: f("\x1B[107m", "\x1B[49m")
		};
	};
	module.exports = createColors();
	module.exports.createColors = createColors;
}) });

//#endregion
//#region ../../node_modules/.pnpm/@clack+core@0.5.0/node_modules/@clack/core/dist/index.mjs
var import_src$1 = /* @__PURE__ */ __toESM(require_src(), 1);
var import_picocolors$1 = /* @__PURE__ */ __toESM(require_picocolors(), 1);
function DD({ onlyFirst: e$1 = !1 } = {}) {
	const t = ["[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?(?:\\u0007|\\u001B\\u005C|\\u009C))", "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-nq-uy=><~]))"].join("|");
	return new RegExp(t, e$1 ? void 0 : "g");
}
const uD = DD();
function P$1(e$1) {
	if (typeof e$1 != "string") throw new TypeError(`Expected a \`string\`, got \`${typeof e$1}\``);
	return e$1.replace(uD, "");
}
function L$1(e$1) {
	return e$1 && e$1.__esModule && Object.prototype.hasOwnProperty.call(e$1, "default") ? e$1.default : e$1;
}
var W$1 = { exports: {} };
(function(e$1) {
	var u$1 = {};
	e$1.exports = u$1, u$1.eastAsianWidth = function(F$1) {
		var s = F$1.charCodeAt(0), i = F$1.length == 2 ? F$1.charCodeAt(1) : 0, D$1 = s;
		return 55296 <= s && s <= 56319 && 56320 <= i && i <= 57343 && (s &= 1023, i &= 1023, D$1 = s << 10 | i, D$1 += 65536), D$1 == 12288 || 65281 <= D$1 && D$1 <= 65376 || 65504 <= D$1 && D$1 <= 65510 ? "F" : D$1 == 8361 || 65377 <= D$1 && D$1 <= 65470 || 65474 <= D$1 && D$1 <= 65479 || 65482 <= D$1 && D$1 <= 65487 || 65490 <= D$1 && D$1 <= 65495 || 65498 <= D$1 && D$1 <= 65500 || 65512 <= D$1 && D$1 <= 65518 ? "H" : 4352 <= D$1 && D$1 <= 4447 || 4515 <= D$1 && D$1 <= 4519 || 4602 <= D$1 && D$1 <= 4607 || 9001 <= D$1 && D$1 <= 9002 || 11904 <= D$1 && D$1 <= 11929 || 11931 <= D$1 && D$1 <= 12019 || 12032 <= D$1 && D$1 <= 12245 || 12272 <= D$1 && D$1 <= 12283 || 12289 <= D$1 && D$1 <= 12350 || 12353 <= D$1 && D$1 <= 12438 || 12441 <= D$1 && D$1 <= 12543 || 12549 <= D$1 && D$1 <= 12589 || 12593 <= D$1 && D$1 <= 12686 || 12688 <= D$1 && D$1 <= 12730 || 12736 <= D$1 && D$1 <= 12771 || 12784 <= D$1 && D$1 <= 12830 || 12832 <= D$1 && D$1 <= 12871 || 12880 <= D$1 && D$1 <= 13054 || 13056 <= D$1 && D$1 <= 19903 || 19968 <= D$1 && D$1 <= 42124 || 42128 <= D$1 && D$1 <= 42182 || 43360 <= D$1 && D$1 <= 43388 || 44032 <= D$1 && D$1 <= 55203 || 55216 <= D$1 && D$1 <= 55238 || 55243 <= D$1 && D$1 <= 55291 || 63744 <= D$1 && D$1 <= 64255 || 65040 <= D$1 && D$1 <= 65049 || 65072 <= D$1 && D$1 <= 65106 || 65108 <= D$1 && D$1 <= 65126 || 65128 <= D$1 && D$1 <= 65131 || 110592 <= D$1 && D$1 <= 110593 || 127488 <= D$1 && D$1 <= 127490 || 127504 <= D$1 && D$1 <= 127546 || 127552 <= D$1 && D$1 <= 127560 || 127568 <= D$1 && D$1 <= 127569 || 131072 <= D$1 && D$1 <= 194367 || 177984 <= D$1 && D$1 <= 196605 || 196608 <= D$1 && D$1 <= 262141 ? "W" : 32 <= D$1 && D$1 <= 126 || 162 <= D$1 && D$1 <= 163 || 165 <= D$1 && D$1 <= 166 || D$1 == 172 || D$1 == 175 || 10214 <= D$1 && D$1 <= 10221 || 10629 <= D$1 && D$1 <= 10630 ? "Na" : D$1 == 161 || D$1 == 164 || 167 <= D$1 && D$1 <= 168 || D$1 == 170 || 173 <= D$1 && D$1 <= 174 || 176 <= D$1 && D$1 <= 180 || 182 <= D$1 && D$1 <= 186 || 188 <= D$1 && D$1 <= 191 || D$1 == 198 || D$1 == 208 || 215 <= D$1 && D$1 <= 216 || 222 <= D$1 && D$1 <= 225 || D$1 == 230 || 232 <= D$1 && D$1 <= 234 || 236 <= D$1 && D$1 <= 237 || D$1 == 240 || 242 <= D$1 && D$1 <= 243 || 247 <= D$1 && D$1 <= 250 || D$1 == 252 || D$1 == 254 || D$1 == 257 || D$1 == 273 || D$1 == 275 || D$1 == 283 || 294 <= D$1 && D$1 <= 295 || D$1 == 299 || 305 <= D$1 && D$1 <= 307 || D$1 == 312 || 319 <= D$1 && D$1 <= 322 || D$1 == 324 || 328 <= D$1 && D$1 <= 331 || D$1 == 333 || 338 <= D$1 && D$1 <= 339 || 358 <= D$1 && D$1 <= 359 || D$1 == 363 || D$1 == 462 || D$1 == 464 || D$1 == 466 || D$1 == 468 || D$1 == 470 || D$1 == 472 || D$1 == 474 || D$1 == 476 || D$1 == 593 || D$1 == 609 || D$1 == 708 || D$1 == 711 || 713 <= D$1 && D$1 <= 715 || D$1 == 717 || D$1 == 720 || 728 <= D$1 && D$1 <= 731 || D$1 == 733 || D$1 == 735 || 768 <= D$1 && D$1 <= 879 || 913 <= D$1 && D$1 <= 929 || 931 <= D$1 && D$1 <= 937 || 945 <= D$1 && D$1 <= 961 || 963 <= D$1 && D$1 <= 969 || D$1 == 1025 || 1040 <= D$1 && D$1 <= 1103 || D$1 == 1105 || D$1 == 8208 || 8211 <= D$1 && D$1 <= 8214 || 8216 <= D$1 && D$1 <= 8217 || 8220 <= D$1 && D$1 <= 8221 || 8224 <= D$1 && D$1 <= 8226 || 8228 <= D$1 && D$1 <= 8231 || D$1 == 8240 || 8242 <= D$1 && D$1 <= 8243 || D$1 == 8245 || D$1 == 8251 || D$1 == 8254 || D$1 == 8308 || D$1 == 8319 || 8321 <= D$1 && D$1 <= 8324 || D$1 == 8364 || D$1 == 8451 || D$1 == 8453 || D$1 == 8457 || D$1 == 8467 || D$1 == 8470 || 8481 <= D$1 && D$1 <= 8482 || D$1 == 8486 || D$1 == 8491 || 8531 <= D$1 && D$1 <= 8532 || 8539 <= D$1 && D$1 <= 8542 || 8544 <= D$1 && D$1 <= 8555 || 8560 <= D$1 && D$1 <= 8569 || D$1 == 8585 || 8592 <= D$1 && D$1 <= 8601 || 8632 <= D$1 && D$1 <= 8633 || D$1 == 8658 || D$1 == 8660 || D$1 == 8679 || D$1 == 8704 || 8706 <= D$1 && D$1 <= 8707 || 8711 <= D$1 && D$1 <= 8712 || D$1 == 8715 || D$1 == 8719 || D$1 == 8721 || D$1 == 8725 || D$1 == 8730 || 8733 <= D$1 && D$1 <= 8736 || D$1 == 8739 || D$1 == 8741 || 8743 <= D$1 && D$1 <= 8748 || D$1 == 8750 || 8756 <= D$1 && D$1 <= 8759 || 8764 <= D$1 && D$1 <= 8765 || D$1 == 8776 || D$1 == 8780 || D$1 == 8786 || 8800 <= D$1 && D$1 <= 8801 || 8804 <= D$1 && D$1 <= 8807 || 8810 <= D$1 && D$1 <= 8811 || 8814 <= D$1 && D$1 <= 8815 || 8834 <= D$1 && D$1 <= 8835 || 8838 <= D$1 && D$1 <= 8839 || D$1 == 8853 || D$1 == 8857 || D$1 == 8869 || D$1 == 8895 || D$1 == 8978 || 9312 <= D$1 && D$1 <= 9449 || 9451 <= D$1 && D$1 <= 9547 || 9552 <= D$1 && D$1 <= 9587 || 9600 <= D$1 && D$1 <= 9615 || 9618 <= D$1 && D$1 <= 9621 || 9632 <= D$1 && D$1 <= 9633 || 9635 <= D$1 && D$1 <= 9641 || 9650 <= D$1 && D$1 <= 9651 || 9654 <= D$1 && D$1 <= 9655 || 9660 <= D$1 && D$1 <= 9661 || 9664 <= D$1 && D$1 <= 9665 || 9670 <= D$1 && D$1 <= 9672 || D$1 == 9675 || 9678 <= D$1 && D$1 <= 9681 || 9698 <= D$1 && D$1 <= 9701 || D$1 == 9711 || 9733 <= D$1 && D$1 <= 9734 || D$1 == 9737 || 9742 <= D$1 && D$1 <= 9743 || 9748 <= D$1 && D$1 <= 9749 || D$1 == 9756 || D$1 == 9758 || D$1 == 9792 || D$1 == 9794 || 9824 <= D$1 && D$1 <= 9825 || 9827 <= D$1 && D$1 <= 9829 || 9831 <= D$1 && D$1 <= 9834 || 9836 <= D$1 && D$1 <= 9837 || D$1 == 9839 || 9886 <= D$1 && D$1 <= 9887 || 9918 <= D$1 && D$1 <= 9919 || 9924 <= D$1 && D$1 <= 9933 || 9935 <= D$1 && D$1 <= 9953 || D$1 == 9955 || 9960 <= D$1 && D$1 <= 9983 || D$1 == 10045 || D$1 == 10071 || 10102 <= D$1 && D$1 <= 10111 || 11093 <= D$1 && D$1 <= 11097 || 12872 <= D$1 && D$1 <= 12879 || 57344 <= D$1 && D$1 <= 63743 || 65024 <= D$1 && D$1 <= 65039 || D$1 == 65533 || 127232 <= D$1 && D$1 <= 127242 || 127248 <= D$1 && D$1 <= 127277 || 127280 <= D$1 && D$1 <= 127337 || 127344 <= D$1 && D$1 <= 127386 || 917760 <= D$1 && D$1 <= 917999 || 983040 <= D$1 && D$1 <= 1048573 || 1048576 <= D$1 && D$1 <= 1114109 ? "A" : "N";
	}, u$1.characterLength = function(F$1) {
		var s = this.eastAsianWidth(F$1);
		return s == "F" || s == "W" || s == "A" ? 2 : 1;
	};
	function t(F$1) {
		return F$1.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]|[^\uD800-\uDFFF]/g) || [];
	}
	u$1.length = function(F$1) {
		for (var s = t(F$1), i = 0, D$1 = 0; D$1 < s.length; D$1++) i = i + this.characterLength(s[D$1]);
		return i;
	}, u$1.slice = function(F$1, s, i) {
		textLen = u$1.length(F$1), s = s || 0, i = i || 1, s < 0 && (s = textLen + s), i < 0 && (i = textLen + i);
		for (var D$1 = "", C$1 = 0, n = t(F$1), E = 0; E < n.length; E++) {
			var a = n[E], o$1 = u$1.length(a);
			if (C$1 >= s - (o$1 == 2 ? 1 : 0)) if (C$1 + o$1 <= i) D$1 += a;
			else break;
			C$1 += o$1;
		}
		return D$1;
	};
})(W$1);
var tD = W$1.exports;
const eD = L$1(tD);
var FD = function() {
	return /\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62(?:\uDB40\uDC77\uDB40\uDC6C\uDB40\uDC73|\uDB40\uDC73\uDB40\uDC63\uDB40\uDC74|\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67)\uDB40\uDC7F|(?:\uD83E\uDDD1\uD83C\uDFFF\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFF\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB-\uDFFE])|(?:\uD83E\uDDD1\uD83C\uDFFE\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFE\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB-\uDFFD\uDFFF])|(?:\uD83E\uDDD1\uD83C\uDFFD\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFD\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|(?:\uD83E\uDDD1\uD83C\uDFFC\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFC\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB\uDFFD-\uDFFF])|(?:\uD83E\uDDD1\uD83C\uDFFB\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFB\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFC-\uDFFF])|\uD83D\uDC68(?:\uD83C\uDFFB(?:\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFF]))|\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFC-\uDFFF])|[\u2695\u2696\u2708]\uFE0F|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD]))?|(?:\uD83C[\uDFFC-\uDFFF])\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFF]))|\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83D\uDC68|(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFE])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFE\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFD\uDFFF])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFC\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFD-\uDFFF])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|(?:\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])\uFE0F|\u200D(?:(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D[\uDC66\uDC67])|\uD83D[\uDC66\uDC67])|\uD83C\uDFFF|\uD83C\uDFFE|\uD83C\uDFFD|\uD83C\uDFFC)?|(?:\uD83D\uDC69(?:\uD83C\uDFFB\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69])|(?:\uD83C[\uDFFC-\uDFFF])\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69]))|\uD83E\uDDD1(?:\uD83C[\uDFFB-\uDFFF])\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1)(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC69(?:\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFE\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFC\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFB\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD]))|\uD83E\uDDD1(?:\u200D(?:\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFE\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFC\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFB\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD]))|\uD83D\uDC69\u200D\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D[\uDC66\uDC67])|\uD83D\uDC69\u200D\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|(?:\uD83D\uDC41\uFE0F\u200D\uD83D\uDDE8|\uD83E\uDDD1(?:\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708]|\uD83C\uDFFB\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])|\uD83D\uDC69(?:\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708]|\uD83C\uDFFB\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])|\uD83D\uDE36\u200D\uD83C\uDF2B|\uD83C\uDFF3\uFE0F\u200D\u26A7|\uD83D\uDC3B\u200D\u2744|(?:(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD4\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC6F|\uD83E[\uDD3C\uDDDE\uDDDF])\u200D[\u2640\u2642]|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|\uD83C\uDFF4\u200D\u2620|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD4\uDDD6-\uDDDD])\u200D[\u2640\u2642]|[\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u2328\u23CF\u23ED-\u23EF\u23F1\u23F2\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB\u25FC\u2600-\u2604\u260E\u2611\u2618\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u2692\u2694-\u2697\u2699\u269B\u269C\u26A0\u26A7\u26B0\u26B1\u26C8\u26CF\u26D1\u26D3\u26E9\u26F0\u26F1\u26F4\u26F7\u26F8\u2702\u2708\u2709\u270F\u2712\u2714\u2716\u271D\u2721\u2733\u2734\u2744\u2747\u2763\u27A1\u2934\u2935\u2B05-\u2B07\u3030\u303D\u3297\u3299]|\uD83C[\uDD70\uDD71\uDD7E\uDD7F\uDE02\uDE37\uDF21\uDF24-\uDF2C\uDF36\uDF7D\uDF96\uDF97\uDF99-\uDF9B\uDF9E\uDF9F\uDFCD\uDFCE\uDFD4-\uDFDF\uDFF5\uDFF7]|\uD83D[\uDC3F\uDCFD\uDD49\uDD4A\uDD6F\uDD70\uDD73\uDD76-\uDD79\uDD87\uDD8A-\uDD8D\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA\uDECB\uDECD-\uDECF\uDEE0-\uDEE5\uDEE9\uDEF0\uDEF3])\uFE0F|\uD83C\uDFF3\uFE0F\u200D\uD83C\uDF08|\uD83D\uDC69\u200D\uD83D\uDC67|\uD83D\uDC69\u200D\uD83D\uDC66|\uD83D\uDE35\u200D\uD83D\uDCAB|\uD83D\uDE2E\u200D\uD83D\uDCA8|\uD83D\uDC15\u200D\uD83E\uDDBA|\uD83E\uDDD1(?:\uD83C\uDFFF|\uD83C\uDFFE|\uD83C\uDFFD|\uD83C\uDFFC|\uD83C\uDFFB)?|\uD83D\uDC69(?:\uD83C\uDFFF|\uD83C\uDFFE|\uD83C\uDFFD|\uD83C\uDFFC|\uD83C\uDFFB)?|\uD83C\uDDFD\uD83C\uDDF0|\uD83C\uDDF6\uD83C\uDDE6|\uD83C\uDDF4\uD83C\uDDF2|\uD83D\uDC08\u200D\u2B1B|\u2764\uFE0F\u200D(?:\uD83D\uDD25|\uD83E\uDE79)|\uD83D\uDC41\uFE0F|\uD83C\uDFF3\uFE0F|\uD83C\uDDFF(?:\uD83C[\uDDE6\uDDF2\uDDFC])|\uD83C\uDDFE(?:\uD83C[\uDDEA\uDDF9])|\uD83C\uDDFC(?:\uD83C[\uDDEB\uDDF8])|\uD83C\uDDFB(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA])|\uD83C\uDDFA(?:\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF])|\uD83C\uDDF9(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF])|\uD83C\uDDF8(?:\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF])|\uD83C\uDDF7(?:\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC])|\uD83C\uDDF5(?:\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE])|\uD83C\uDDF3(?:\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF])|\uD83C\uDDF2(?:\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF])|\uD83C\uDDF1(?:\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE])|\uD83C\uDDF0(?:\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF])|\uD83C\uDDEF(?:\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5])|\uD83C\uDDEE(?:\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9])|\uD83C\uDDED(?:\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA])|\uD83C\uDDEC(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE])|\uD83C\uDDEB(?:\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7])|\uD83C\uDDEA(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA])|\uD83C\uDDE9(?:\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF])|\uD83C\uDDE8(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF])|\uD83C\uDDE7(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF])|\uD83C\uDDE6(?:\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF])|[#\*0-9]\uFE0F\u20E3|\u2764\uFE0F|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD4\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])|\uD83C\uDFF4|(?:[\u270A\u270B]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDC8F\uDC91\uDCAA\uDD7A\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD0C\uDD0F\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD34\uDD36\uDD77\uDDB5\uDDB6\uDDBB\uDDD2\uDDD3\uDDD5])(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u270C\u270D]|\uD83D[\uDD74\uDD90])(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])|[\u270A\u270B]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC08\uDC15\uDC3B\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDC8F\uDC91\uDCAA\uDD7A\uDD95\uDD96\uDE2E\uDE35\uDE36\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD0C\uDD0F\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD34\uDD36\uDD77\uDDB5\uDDB6\uDDBB\uDDD2\uDDD3\uDDD5]|\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD4\uDDD6-\uDDDD]|\uD83D\uDC6F|\uD83E[\uDD3C\uDDDE\uDDDF]|[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF84\uDF86-\uDF93\uDFA0-\uDFC1\uDFC5\uDFC6\uDFC8\uDFC9\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC07\uDC09-\uDC14\uDC16-\uDC3A\uDC3C-\uDC3E\uDC40\uDC44\uDC45\uDC51-\uDC65\uDC6A\uDC79-\uDC7B\uDC7D-\uDC80\uDC84\uDC88-\uDC8E\uDC90\uDC92-\uDCA9\uDCAB-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDDA4\uDDFB-\uDE2D\uDE2F-\uDE34\uDE37-\uDE44\uDE48-\uDE4A\uDE80-\uDEA2\uDEA4-\uDEB3\uDEB7-\uDEBF\uDEC1-\uDEC5\uDED0-\uDED2\uDED5-\uDED7\uDEEB\uDEEC\uDEF4-\uDEFC\uDFE0-\uDFEB]|\uD83E[\uDD0D\uDD0E\uDD10-\uDD17\uDD1D\uDD20-\uDD25\uDD27-\uDD2F\uDD3A\uDD3F-\uDD45\uDD47-\uDD76\uDD78\uDD7A-\uDDB4\uDDB7\uDDBA\uDDBC-\uDDCB\uDDD0\uDDE0-\uDDFF\uDE70-\uDE74\uDE78-\uDE7A\uDE80-\uDE86\uDE90-\uDEA8\uDEB0-\uDEB6\uDEC0-\uDEC2\uDED0-\uDED6]|(?:[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u270A\u270B\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF93\uDFA0-\uDFCA\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF4\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC3E\uDC40\uDC42-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDD7A\uDD95\uDD96\uDDA4\uDDFB-\uDE4F\uDE80-\uDEC5\uDECC\uDED0-\uDED2\uDED5-\uDED7\uDEEB\uDEEC\uDEF4-\uDEFC\uDFE0-\uDFEB]|\uD83E[\uDD0C-\uDD3A\uDD3C-\uDD45\uDD47-\uDD78\uDD7A-\uDDCB\uDDCD-\uDDFF\uDE70-\uDE74\uDE78-\uDE7A\uDE80-\uDE86\uDE90-\uDEA8\uDEB0-\uDEB6\uDEC0-\uDEC2\uDED0-\uDED6])|(?:[#\*0-9\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692-\u2697\u2699\u269B\u269C\u26A0\u26A1\u26A7\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA4\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDED5-\uDED7\uDEE0-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3-\uDEFC\uDFE0-\uDFEB]|\uD83E[\uDD0C-\uDD3A\uDD3C-\uDD45\uDD47-\uDD78\uDD7A-\uDDCB\uDDCD-\uDDFF\uDE70-\uDE74\uDE78-\uDE7A\uDE80-\uDE86\uDE90-\uDEA8\uDEB0-\uDEB6\uDEC0-\uDEC2\uDED0-\uDED6])\uFE0F|(?:[\u261D\u26F9\u270A-\u270D]|\uD83C[\uDF85\uDFC2-\uDFC4\uDFC7\uDFCA-\uDFCC]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66-\uDC78\uDC7C\uDC81-\uDC83\uDC85-\uDC87\uDC8F\uDC91\uDCAA\uDD74\uDD75\uDD7A\uDD90\uDD95\uDD96\uDE45-\uDE47\uDE4B-\uDE4F\uDEA3\uDEB4-\uDEB6\uDEC0\uDECC]|\uD83E[\uDD0C\uDD0F\uDD18-\uDD1F\uDD26\uDD30-\uDD39\uDD3C-\uDD3E\uDD77\uDDB5\uDDB6\uDDB8\uDDB9\uDDBB\uDDCD-\uDDCF\uDDD1-\uDDDD])/g;
};
const sD = L$1(FD);
function p(e$1, u$1 = {}) {
	if (typeof e$1 != "string" || e$1.length === 0 || (u$1 = {
		ambiguousIsNarrow: !0,
		...u$1
	}, e$1 = P$1(e$1), e$1.length === 0)) return 0;
	e$1 = e$1.replace(sD(), "  ");
	const t = u$1.ambiguousIsNarrow ? 1 : 2;
	let F$1 = 0;
	for (const s of e$1) {
		const i = s.codePointAt(0);
		if (i <= 31 || i >= 127 && i <= 159 || i >= 768 && i <= 879) continue;
		switch (eD.eastAsianWidth(s)) {
			case "F":
			case "W":
				F$1 += 2;
				break;
			case "A":
				F$1 += t;
				break;
			default: F$1 += 1;
		}
	}
	return F$1;
}
const w = 10, N = (e$1 = 0) => (u$1) => `\x1B[${u$1 + e$1}m`, I = (e$1 = 0) => (u$1) => `\x1B[${38 + e$1};5;${u$1}m`, R = (e$1 = 0) => (u$1, t, F$1) => `\x1B[${38 + e$1};2;${u$1};${t};${F$1}m`, r = {
	modifier: {
		reset: [0, 0],
		bold: [1, 22],
		dim: [2, 22],
		italic: [3, 23],
		underline: [4, 24],
		overline: [53, 55],
		inverse: [7, 27],
		hidden: [8, 28],
		strikethrough: [9, 29]
	},
	color: {
		black: [30, 39],
		red: [31, 39],
		green: [32, 39],
		yellow: [33, 39],
		blue: [34, 39],
		magenta: [35, 39],
		cyan: [36, 39],
		white: [37, 39],
		blackBright: [90, 39],
		gray: [90, 39],
		grey: [90, 39],
		redBright: [91, 39],
		greenBright: [92, 39],
		yellowBright: [93, 39],
		blueBright: [94, 39],
		magentaBright: [95, 39],
		cyanBright: [96, 39],
		whiteBright: [97, 39]
	},
	bgColor: {
		bgBlack: [40, 49],
		bgRed: [41, 49],
		bgGreen: [42, 49],
		bgYellow: [43, 49],
		bgBlue: [44, 49],
		bgMagenta: [45, 49],
		bgCyan: [46, 49],
		bgWhite: [47, 49],
		bgBlackBright: [100, 49],
		bgGray: [100, 49],
		bgGrey: [100, 49],
		bgRedBright: [101, 49],
		bgGreenBright: [102, 49],
		bgYellowBright: [103, 49],
		bgBlueBright: [104, 49],
		bgMagentaBright: [105, 49],
		bgCyanBright: [106, 49],
		bgWhiteBright: [107, 49]
	}
};
Object.keys(r.modifier);
const iD = Object.keys(r.color), CD = Object.keys(r.bgColor);
[...iD, ...CD];
function rD() {
	const e$1 = /* @__PURE__ */ new Map();
	for (const [u$1, t] of Object.entries(r)) {
		for (const [F$1, s] of Object.entries(t)) r[F$1] = {
			open: `\x1B[${s[0]}m`,
			close: `\x1B[${s[1]}m`
		}, t[F$1] = r[F$1], e$1.set(s[0], s[1]);
		Object.defineProperty(r, u$1, {
			value: t,
			enumerable: !1
		});
	}
	return Object.defineProperty(r, "codes", {
		value: e$1,
		enumerable: !1
	}), r.color.close = "\x1B[39m", r.bgColor.close = "\x1B[49m", r.color.ansi = N(), r.color.ansi256 = I(), r.color.ansi16m = R(), r.bgColor.ansi = N(w), r.bgColor.ansi256 = I(w), r.bgColor.ansi16m = R(w), Object.defineProperties(r, {
		rgbToAnsi256: {
			value: (u$1, t, F$1) => u$1 === t && t === F$1 ? u$1 < 8 ? 16 : u$1 > 248 ? 231 : Math.round((u$1 - 8) / 247 * 24) + 232 : 16 + 36 * Math.round(u$1 / 255 * 5) + 6 * Math.round(t / 255 * 5) + Math.round(F$1 / 255 * 5),
			enumerable: !1
		},
		hexToRgb: {
			value: (u$1) => {
				const t = /[a-f\d]{6}|[a-f\d]{3}/i.exec(u$1.toString(16));
				if (!t) return [
					0,
					0,
					0
				];
				let [F$1] = t;
				F$1.length === 3 && (F$1 = [...F$1].map((i) => i + i).join(""));
				const s = Number.parseInt(F$1, 16);
				return [
					s >> 16 & 255,
					s >> 8 & 255,
					s & 255
				];
			},
			enumerable: !1
		},
		hexToAnsi256: {
			value: (u$1) => r.rgbToAnsi256(...r.hexToRgb(u$1)),
			enumerable: !1
		},
		ansi256ToAnsi: {
			value: (u$1) => {
				if (u$1 < 8) return 30 + u$1;
				if (u$1 < 16) return 90 + (u$1 - 8);
				let t, F$1, s;
				if (u$1 >= 232) t = ((u$1 - 232) * 10 + 8) / 255, F$1 = t, s = t;
				else {
					u$1 -= 16;
					const C$1 = u$1 % 36;
					t = Math.floor(u$1 / 36) / 5, F$1 = Math.floor(C$1 / 6) / 5, s = C$1 % 6 / 5;
				}
				const i = Math.max(t, F$1, s) * 2;
				if (i === 0) return 30;
				let D$1 = 30 + (Math.round(s) << 2 | Math.round(F$1) << 1 | Math.round(t));
				return i === 2 && (D$1 += 60), D$1;
			},
			enumerable: !1
		},
		rgbToAnsi: {
			value: (u$1, t, F$1) => r.ansi256ToAnsi(r.rgbToAnsi256(u$1, t, F$1)),
			enumerable: !1
		},
		hexToAnsi: {
			value: (u$1) => r.ansi256ToAnsi(r.hexToAnsi256(u$1)),
			enumerable: !1
		}
	}), r;
}
const ED = rD(), d$1 = new Set(["\x1B", ""]), oD = 39, y$1 = "\x07", V$1 = "[", nD = "]", G$1 = "m", _$1 = `${nD}8;;`, z = (e$1) => `${d$1.values().next().value}${V$1}${e$1}${G$1}`, K$1 = (e$1) => `${d$1.values().next().value}${_$1}${e$1}${y$1}`, aD = (e$1) => e$1.split(" ").map((u$1) => p(u$1)), k$1 = (e$1, u$1, t) => {
	const F$1 = [...u$1];
	let s = !1, i = !1, D$1 = p(P$1(e$1[e$1.length - 1]));
	for (const [C$1, n] of F$1.entries()) {
		const E = p(n);
		if (D$1 + E <= t ? e$1[e$1.length - 1] += n : (e$1.push(n), D$1 = 0), d$1.has(n) && (s = !0, i = F$1.slice(C$1 + 1).join("").startsWith(_$1)), s) {
			i ? n === y$1 && (s = !1, i = !1) : n === G$1 && (s = !1);
			continue;
		}
		D$1 += E, D$1 === t && C$1 < F$1.length - 1 && (e$1.push(""), D$1 = 0);
	}
	!D$1 && e$1[e$1.length - 1].length > 0 && e$1.length > 1 && (e$1[e$1.length - 2] += e$1.pop());
}, hD = (e$1) => {
	const u$1 = e$1.split(" ");
	let t = u$1.length;
	for (; t > 0 && !(p(u$1[t - 1]) > 0);) t--;
	return t === u$1.length ? e$1 : u$1.slice(0, t).join(" ") + u$1.slice(t).join("");
}, lD = (e$1, u$1, t = {}) => {
	if (t.trim !== !1 && e$1.trim() === "") return "";
	let F$1 = "", s, i;
	const D$1 = aD(e$1);
	let C$1 = [""];
	for (const [E, a] of e$1.split(" ").entries()) {
		t.trim !== !1 && (C$1[C$1.length - 1] = C$1[C$1.length - 1].trimStart());
		let o$1 = p(C$1[C$1.length - 1]);
		if (E !== 0 && (o$1 >= u$1 && (t.wordWrap === !1 || t.trim === !1) && (C$1.push(""), o$1 = 0), (o$1 > 0 || t.trim === !1) && (C$1[C$1.length - 1] += " ", o$1++)), t.hard && D$1[E] > u$1) {
			const c = u$1 - o$1, f = 1 + Math.floor((D$1[E] - c - 1) / u$1);
			Math.floor((D$1[E] - 1) / u$1) < f && C$1.push(""), k$1(C$1, a, u$1);
			continue;
		}
		if (o$1 + D$1[E] > u$1 && o$1 > 0 && D$1[E] > 0) {
			if (t.wordWrap === !1 && o$1 < u$1) {
				k$1(C$1, a, u$1);
				continue;
			}
			C$1.push("");
		}
		if (o$1 + D$1[E] > u$1 && t.wordWrap === !1) {
			k$1(C$1, a, u$1);
			continue;
		}
		C$1[C$1.length - 1] += a;
	}
	t.trim !== !1 && (C$1 = C$1.map((E) => hD(E)));
	const n = [...C$1.join(`
`)];
	for (const [E, a] of n.entries()) {
		if (F$1 += a, d$1.has(a)) {
			const { groups: c } = (/* @__PURE__ */ new RegExp(`(?:\\${V$1}(?<code>\\d+)m|\\${_$1}(?<uri>.*)${y$1})`)).exec(n.slice(E).join("")) || { groups: {} };
			if (c.code !== void 0) {
				const f = Number.parseFloat(c.code);
				s = f === oD ? void 0 : f;
			} else c.uri !== void 0 && (i = c.uri.length === 0 ? void 0 : c.uri);
		}
		const o$1 = ED.codes.get(Number(s));
		n[E + 1] === `
` ? (i && (F$1 += K$1("")), s && o$1 && (F$1 += z(o$1))) : a === `
` && (s && o$1 && (F$1 += z(s)), i && (F$1 += K$1(i)));
	}
	return F$1;
};
function Y$1(e$1, u$1, t) {
	return String(e$1).normalize().replace(/\r\n/g, `
`).split(`
`).map((F$1) => lD(F$1, u$1, t)).join(`
`);
}
const xD = [
	"up",
	"down",
	"left",
	"right",
	"space",
	"enter",
	"cancel"
], B = {
	actions: new Set(xD),
	aliases: new Map([
		["k", "up"],
		["j", "down"],
		["h", "left"],
		["l", "right"],
		["", "cancel"],
		["escape", "cancel"]
	])
};
function $(e$1, u$1) {
	if (typeof e$1 == "string") return B.aliases.get(e$1) === u$1;
	for (const t of e$1) if (t !== void 0 && $(t, u$1)) return !0;
	return !1;
}
function BD(e$1, u$1) {
	if (e$1 === u$1) return;
	const t = e$1.split(`
`), F$1 = u$1.split(`
`), s = [];
	for (let i = 0; i < Math.max(t.length, F$1.length); i++) t[i] !== F$1[i] && s.push(i);
	return s;
}
const AD = globalThis.process.platform.startsWith("win"), S = Symbol("clack:cancel");
function pD(e$1) {
	return e$1 === S;
}
function m(e$1, u$1) {
	const t = e$1;
	t.isTTY && t.setRawMode(u$1);
}
function fD({ input: e$1 = stdin, output: u$1 = stdout, overwrite: t = !0, hideCursor: F$1 = !0 } = {}) {
	const s = g.createInterface({
		input: e$1,
		output: u$1,
		prompt: "",
		tabSize: 1
	});
	g.emitKeypressEvents(e$1, s), e$1.isTTY && e$1.setRawMode(!0);
	const i = (D$1, { name: C$1, sequence: n }) => {
		const E = String(D$1);
		if ($([
			E,
			C$1,
			n
		], "cancel")) {
			F$1 && u$1.write(import_src$1.cursor.show), process.exit(0);
			return;
		}
		if (!t) return;
		const a = C$1 === "return" ? 0 : -1, o$1 = C$1 === "return" ? -1 : 0;
		g.moveCursor(u$1, a, o$1, () => {
			g.clearLine(u$1, 1, () => {
				e$1.once("keypress", i);
			});
		});
	};
	return F$1 && u$1.write(import_src$1.cursor.hide), e$1.once("keypress", i), () => {
		e$1.off("keypress", i), F$1 && u$1.write(import_src$1.cursor.show), e$1.isTTY && !AD && e$1.setRawMode(!1), s.terminal = !1, s.close();
	};
}
var gD = Object.defineProperty, vD = (e$1, u$1, t) => u$1 in e$1 ? gD(e$1, u$1, {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: t
}) : e$1[u$1] = t, h = (e$1, u$1, t) => (vD(e$1, typeof u$1 != "symbol" ? u$1 + "" : u$1, t), t);
var x$1 = class {
	constructor(u$1, t = !0) {
		h(this, "input"), h(this, "output"), h(this, "_abortSignal"), h(this, "rl"), h(this, "opts"), h(this, "_render"), h(this, "_track", !1), h(this, "_prevFrame", ""), h(this, "_subscribers", /* @__PURE__ */ new Map()), h(this, "_cursor", 0), h(this, "state", "initial"), h(this, "error", ""), h(this, "value");
		const { input: F$1 = stdin, output: s = stdout, render: i, signal: D$1,...C$1 } = u$1;
		this.opts = C$1, this.onKeypress = this.onKeypress.bind(this), this.close = this.close.bind(this), this.render = this.render.bind(this), this._render = i.bind(this), this._track = t, this._abortSignal = D$1, this.input = F$1, this.output = s;
	}
	unsubscribe() {
		this._subscribers.clear();
	}
	setSubscriber(u$1, t) {
		const F$1 = this._subscribers.get(u$1) ?? [];
		F$1.push(t), this._subscribers.set(u$1, F$1);
	}
	on(u$1, t) {
		this.setSubscriber(u$1, { cb: t });
	}
	once(u$1, t) {
		this.setSubscriber(u$1, {
			cb: t,
			once: !0
		});
	}
	emit(u$1, ...t) {
		const F$1 = this._subscribers.get(u$1) ?? [], s = [];
		for (const i of F$1) i.cb(...t), i.once && s.push(() => F$1.splice(F$1.indexOf(i), 1));
		for (const i of s) i();
	}
	prompt() {
		return new Promise((u$1, t) => {
			if (this._abortSignal) {
				if (this._abortSignal.aborted) return this.state = "cancel", this.close(), u$1(S);
				this._abortSignal.addEventListener("abort", () => {
					this.state = "cancel", this.close();
				}, { once: !0 });
			}
			const F$1 = new Writable();
			F$1._write = (s, i, D$1) => {
				this._track && (this.value = this.rl?.line.replace(/\t/g, ""), this._cursor = this.rl?.cursor ?? 0, this.emit("value", this.value)), D$1();
			}, this.input.pipe(F$1), this.rl = O.createInterface({
				input: this.input,
				output: F$1,
				tabSize: 2,
				prompt: "",
				escapeCodeTimeout: 50,
				terminal: !0
			}), O.emitKeypressEvents(this.input, this.rl), this.rl.prompt(), this.opts.initialValue !== void 0 && this._track && this.rl.write(this.opts.initialValue), this.input.on("keypress", this.onKeypress), m(this.input, !0), this.output.on("resize", this.render), this.render(), this.once("submit", () => {
				this.output.write(import_src$1.cursor.show), this.output.off("resize", this.render), m(this.input, !1), u$1(this.value);
			}), this.once("cancel", () => {
				this.output.write(import_src$1.cursor.show), this.output.off("resize", this.render), m(this.input, !1), u$1(S);
			});
		});
	}
	onKeypress(u$1, t) {
		if (this.state === "error" && (this.state = "active"), t?.name && (!this._track && B.aliases.has(t.name) && this.emit("cursor", B.aliases.get(t.name)), B.actions.has(t.name) && this.emit("cursor", t.name)), u$1 && (u$1.toLowerCase() === "y" || u$1.toLowerCase() === "n") && this.emit("confirm", u$1.toLowerCase() === "y"), u$1 === "	" && this.opts.placeholder && (this.value || (this.rl?.write(this.opts.placeholder), this.emit("value", this.opts.placeholder))), u$1 && this.emit("key", u$1.toLowerCase()), t?.name === "return") {
			if (this.opts.validate) {
				const F$1 = this.opts.validate(this.value);
				F$1 && (this.error = F$1 instanceof Error ? F$1.message : F$1, this.state = "error", this.rl?.write(this.value));
			}
			this.state !== "error" && (this.state = "submit");
		}
		$([
			u$1,
			t?.name,
			t?.sequence
		], "cancel") && (this.state = "cancel"), (this.state === "submit" || this.state === "cancel") && this.emit("finalize"), this.render(), (this.state === "submit" || this.state === "cancel") && this.close();
	}
	close() {
		this.input.unpipe(), this.input.removeListener("keypress", this.onKeypress), this.output.write(`
`), m(this.input, !1), this.rl?.close(), this.rl = void 0, this.emit(`${this.state}`, this.value), this.unsubscribe();
	}
	restoreCursor() {
		const u$1 = Y$1(this._prevFrame, process.stdout.columns, { hard: !0 }).split(`
`).length - 1;
		this.output.write(import_src$1.cursor.move(-999, u$1 * -1));
	}
	render() {
		const u$1 = Y$1(this._render(this) ?? "", process.stdout.columns, { hard: !0 });
		if (u$1 !== this._prevFrame) {
			if (this.state === "initial") this.output.write(import_src$1.cursor.hide);
			else {
				const t = BD(this._prevFrame, u$1);
				if (this.restoreCursor(), t && t?.length === 1) {
					const F$1 = t[0];
					this.output.write(import_src$1.cursor.move(0, F$1)), this.output.write(import_src$1.erase.lines(1));
					const s = u$1.split(`
`);
					this.output.write(s[F$1]), this._prevFrame = u$1, this.output.write(import_src$1.cursor.move(0, s.length - F$1 - 1));
					return;
				}
				if (t && t?.length > 1) {
					const F$1 = t[0];
					this.output.write(import_src$1.cursor.move(0, F$1)), this.output.write(import_src$1.erase.down());
					const s = u$1.split(`
`).slice(F$1);
					this.output.write(s.join(`
`)), this._prevFrame = u$1;
					return;
				}
				this.output.write(import_src$1.erase.down());
			}
			this.output.write(u$1), this.state === "initial" && (this.state = "active"), this._prevFrame = u$1;
		}
	}
};
var dD = class extends x$1 {
	get cursor() {
		return this.value ? 0 : 1;
	}
	get _value() {
		return this.cursor === 0;
	}
	constructor(u$1) {
		super(u$1, !1), this.value = !!u$1.initialValue, this.on("value", () => {
			this.value = this._value;
		}), this.on("confirm", (t) => {
			this.output.write(import_src$1.cursor.move(0, -1)), this.value = t, this.state = "submit", this.close();
		}), this.on("cursor", () => {
			this.value = !this.value;
		});
	}
};
var mD = Object.defineProperty, bD = (e$1, u$1, t) => u$1 in e$1 ? mD(e$1, u$1, {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: t
}) : e$1[u$1] = t, Z = (e$1, u$1, t) => (bD(e$1, typeof u$1 != "symbol" ? u$1 + "" : u$1, t), t), q$1 = (e$1, u$1, t) => {
	if (!u$1.has(e$1)) throw TypeError("Cannot " + t);
}, T$1 = (e$1, u$1, t) => (q$1(e$1, u$1, "read from private field"), t ? t.call(e$1) : u$1.get(e$1)), wD = (e$1, u$1, t) => {
	if (u$1.has(e$1)) throw TypeError("Cannot add the same private member more than once");
	u$1 instanceof WeakSet ? u$1.add(e$1) : u$1.set(e$1, t);
}, yD = (e$1, u$1, t, F$1) => (q$1(e$1, u$1, "write to private field"), F$1 ? F$1.call(e$1, t) : u$1.set(e$1, t), t), A$1;
let _D = class extends x$1 {
	constructor(u$1) {
		super(u$1, !1), Z(this, "options"), Z(this, "cursor", 0), wD(this, A$1, void 0);
		const { options: t } = u$1;
		yD(this, A$1, u$1.selectableGroups !== !1), this.options = Object.entries(t).flatMap(([F$1, s]) => [{
			value: F$1,
			group: !0,
			label: F$1
		}, ...s.map((i) => ({
			...i,
			group: F$1
		}))]), this.value = [...u$1.initialValues ?? []], this.cursor = Math.max(this.options.findIndex(({ value: F$1 }) => F$1 === u$1.cursorAt), T$1(this, A$1) ? 0 : 1), this.on("cursor", (F$1) => {
			switch (F$1) {
				case "left":
				case "up": {
					this.cursor = this.cursor === 0 ? this.options.length - 1 : this.cursor - 1;
					const s = this.options[this.cursor]?.group === !0;
					!T$1(this, A$1) && s && (this.cursor = this.cursor === 0 ? this.options.length - 1 : this.cursor - 1);
					break;
				}
				case "down":
				case "right": {
					this.cursor = this.cursor === this.options.length - 1 ? 0 : this.cursor + 1;
					const s = this.options[this.cursor]?.group === !0;
					!T$1(this, A$1) && s && (this.cursor = this.cursor === this.options.length - 1 ? 0 : this.cursor + 1);
					break;
				}
				case "space":
					this.toggleValue();
					break;
			}
		});
	}
	getGroupItems(u$1) {
		return this.options.filter((t) => t.group === u$1);
	}
	isGroupSelected(u$1) {
		return this.getGroupItems(u$1).every((t) => this.value.includes(t.value));
	}
	toggleValue() {
		const u$1 = this.options[this.cursor];
		if (u$1.group === !0) {
			const t = u$1.value, F$1 = this.getGroupItems(t);
			this.isGroupSelected(t) ? this.value = this.value.filter((s) => F$1.findIndex((i) => i.value === s) === -1) : this.value = [...this.value, ...F$1.map((s) => s.value)], this.value = Array.from(new Set(this.value));
		} else {
			const t = this.value.includes(u$1.value);
			this.value = t ? this.value.filter((F$1) => F$1 !== u$1.value) : [...this.value, u$1.value];
		}
	}
};
A$1 = /* @__PURE__ */ new WeakMap();
var kD = Object.defineProperty, $D = (e$1, u$1, t) => u$1 in e$1 ? kD(e$1, u$1, {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: t
}) : e$1[u$1] = t, H = (e$1, u$1, t) => ($D(e$1, typeof u$1 != "symbol" ? u$1 + "" : u$1, t), t);
let SD = class extends x$1 {
	constructor(u$1) {
		super(u$1, !1), H(this, "options"), H(this, "cursor", 0), this.options = u$1.options, this.value = [...u$1.initialValues ?? []], this.cursor = Math.max(this.options.findIndex(({ value: t }) => t === u$1.cursorAt), 0), this.on("key", (t) => {
			t === "a" && this.toggleAll();
		}), this.on("cursor", (t) => {
			switch (t) {
				case "left":
				case "up":
					this.cursor = this.cursor === 0 ? this.options.length - 1 : this.cursor - 1;
					break;
				case "down":
				case "right":
					this.cursor = this.cursor === this.options.length - 1 ? 0 : this.cursor + 1;
					break;
				case "space":
					this.toggleValue();
					break;
			}
		});
	}
	get _value() {
		return this.options[this.cursor].value;
	}
	toggleAll() {
		const u$1 = this.value.length === this.options.length;
		this.value = u$1 ? [] : this.options.map((t) => t.value);
	}
	toggleValue() {
		const u$1 = this.value.includes(this._value);
		this.value = u$1 ? this.value.filter((t) => t !== this._value) : [...this.value, this._value];
	}
};
var TD = Object.defineProperty, jD = (e$1, u$1, t) => u$1 in e$1 ? TD(e$1, u$1, {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: t
}) : e$1[u$1] = t, U$1 = (e$1, u$1, t) => (jD(e$1, typeof u$1 != "symbol" ? u$1 + "" : u$1, t), t);
var MD = class extends x$1 {
	constructor({ mask: u$1,...t }) {
		super(t), U$1(this, "valueWithCursor", ""), U$1(this, "_mask", "•"), this._mask = u$1 ?? "•", this.on("finalize", () => {
			this.valueWithCursor = this.masked;
		}), this.on("value", () => {
			if (this.cursor >= this.value.length) this.valueWithCursor = `${this.masked}${import_picocolors$1.default.inverse(import_picocolors$1.default.hidden("_"))}`;
			else {
				const F$1 = this.masked.slice(0, this.cursor), s = this.masked.slice(this.cursor);
				this.valueWithCursor = `${F$1}${import_picocolors$1.default.inverse(s[0])}${s.slice(1)}`;
			}
		});
	}
	get cursor() {
		return this._cursor;
	}
	get masked() {
		return this.value.replaceAll(/./g, this._mask);
	}
};
var OD = Object.defineProperty, PD = (e$1, u$1, t) => u$1 in e$1 ? OD(e$1, u$1, {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: t
}) : e$1[u$1] = t, J$1 = (e$1, u$1, t) => (PD(e$1, typeof u$1 != "symbol" ? u$1 + "" : u$1, t), t);
var LD = class extends x$1 {
	constructor(u$1) {
		super(u$1, !1), J$1(this, "options"), J$1(this, "cursor", 0), this.options = u$1.options, this.cursor = this.options.findIndex(({ value: t }) => t === u$1.initialValue), this.cursor === -1 && (this.cursor = 0), this.changeValue(), this.on("cursor", (t) => {
			switch (t) {
				case "left":
				case "up":
					this.cursor = this.cursor === 0 ? this.options.length - 1 : this.cursor - 1;
					break;
				case "down":
				case "right":
					this.cursor = this.cursor === this.options.length - 1 ? 0 : this.cursor + 1;
					break;
			}
			this.changeValue();
		});
	}
	get _value() {
		return this.options[this.cursor];
	}
	changeValue() {
		this.value = this._value.value;
	}
};
var WD = Object.defineProperty, ND = (e$1, u$1, t) => u$1 in e$1 ? WD(e$1, u$1, {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: t
}) : e$1[u$1] = t, Q = (e$1, u$1, t) => (ND(e$1, typeof u$1 != "symbol" ? u$1 + "" : u$1, t), t);
var ID = class extends x$1 {
	constructor(u$1) {
		super(u$1, !1), Q(this, "options"), Q(this, "cursor", 0), this.options = u$1.options;
		const t = this.options.map(({ value: [F$1] }) => F$1?.toLowerCase());
		this.cursor = Math.max(t.indexOf(u$1.initialValue), 0), this.on("key", (F$1) => {
			if (!t.includes(F$1)) return;
			const s = this.options.find(({ value: [i] }) => i?.toLowerCase() === F$1);
			s && (this.value = s.value, this.state = "submit", this.emit("submit"));
		});
	}
};
var RD = class extends x$1 {
	get valueWithCursor() {
		if (this.state === "submit") return this.value;
		if (this.cursor >= this.value.length) return `${this.value}\u2588`;
		const u$1 = this.value.slice(0, this.cursor), [t, ...F$1] = this.value.slice(this.cursor);
		return `${u$1}${import_picocolors$1.default.inverse(t)}${F$1.join("")}`;
	}
	get cursor() {
		return this._cursor;
	}
	constructor(u$1) {
		super(u$1), this.on("finalize", () => {
			this.value || (this.value = u$1.defaultValue);
		});
	}
};

//#endregion
//#region ../../node_modules/.pnpm/@clack+prompts@0.11.0/node_modules/@clack/prompts/dist/index.mjs
var import_picocolors = /* @__PURE__ */ __toESM(require_picocolors(), 1);
var import_src = /* @__PURE__ */ __toESM(require_src(), 1);
function ce() {
	return y.platform !== "win32" ? y.env.TERM !== "linux" : !!y.env.CI || !!y.env.WT_SESSION || !!y.env.TERMINUS_SUBLIME || y.env.ConEmuTask === "{cmd::Cmder}" || y.env.TERM_PROGRAM === "Terminus-Sublime" || y.env.TERM_PROGRAM === "vscode" || y.env.TERM === "xterm-256color" || y.env.TERM === "alacritty" || y.env.TERMINAL_EMULATOR === "JetBrains-JediTerm";
}
const V = ce(), u = (t, n) => V ? t : n, le = u("◆", "*"), L = u("■", "x"), W = u("▲", "x"), C = u("◇", "o"), ue = u("┌", "T"), o = u("│", "|"), d = u("└", "—"), k = u("●", ">"), P = u("○", " "), A = u("◻", "[•]"), T = u("◼", "[+]"), F = u("◻", "[ ]"), $e = u("▪", "•"), _ = u("─", "-"), me = u("╮", "+"), de = u("├", "+"), pe = u("╯", "+"), q = u("●", "•"), D = u("◆", "*"), U = u("▲", "!"), K = u("■", "x"), b = (t) => {
	switch (t) {
		case "initial":
		case "active": return import_picocolors.default.cyan(le);
		case "cancel": return import_picocolors.default.red(L);
		case "error": return import_picocolors.default.yellow(W);
		case "submit": return import_picocolors.default.green(C);
	}
}, G = (t) => {
	const { cursor: n, options: r$1, style: i } = t, s = t.maxItems ?? Number.POSITIVE_INFINITY, c = Math.max(process.stdout.rows - 4, 0), a = Math.min(c, Math.max(s, 5));
	let l$1 = 0;
	n >= l$1 + a - 3 ? l$1 = Math.max(Math.min(n - a + 3, r$1.length - a), 0) : n < l$1 + 2 && (l$1 = Math.max(n - 2, 0));
	const $$1 = a < r$1.length && l$1 > 0, g$1 = a < r$1.length && l$1 + a < r$1.length;
	return r$1.slice(l$1, l$1 + a).map((p$2, v$1, f) => {
		const j = v$1 === 0 && $$1, E = v$1 === f.length - 1 && g$1;
		return j || E ? import_picocolors.default.dim("...") : i(p$2, v$1 + l$1 === n);
	});
}, he = (t) => new RD({
	validate: t.validate,
	placeholder: t.placeholder,
	defaultValue: t.defaultValue,
	initialValue: t.initialValue,
	render() {
		const n = `${import_picocolors.default.gray(o)}
${b(this.state)}  ${t.message}
`, r$1 = t.placeholder ? import_picocolors.default.inverse(t.placeholder[0]) + import_picocolors.default.dim(t.placeholder.slice(1)) : import_picocolors.default.inverse(import_picocolors.default.hidden("_")), i = this.value ? this.valueWithCursor : r$1;
		switch (this.state) {
			case "error": return `${n.trim()}
${import_picocolors.default.yellow(o)}  ${i}
${import_picocolors.default.yellow(d)}  ${import_picocolors.default.yellow(this.error)}
`;
			case "submit": return `${n}${import_picocolors.default.gray(o)}  ${import_picocolors.default.dim(this.value || t.placeholder)}`;
			case "cancel": return `${n}${import_picocolors.default.gray(o)}  ${import_picocolors.default.strikethrough(import_picocolors.default.dim(this.value ?? ""))}${this.value?.trim() ? `
${import_picocolors.default.gray(o)}` : ""}`;
			default: return `${n}${import_picocolors.default.cyan(o)}  ${i}
${import_picocolors.default.cyan(d)}
`;
		}
	}
}).prompt(), ge = (t) => new MD({
	validate: t.validate,
	mask: t.mask ?? $e,
	render() {
		const n = `${import_picocolors.default.gray(o)}
${b(this.state)}  ${t.message}
`, r$1 = this.valueWithCursor, i = this.masked;
		switch (this.state) {
			case "error": return `${n.trim()}
${import_picocolors.default.yellow(o)}  ${i}
${import_picocolors.default.yellow(d)}  ${import_picocolors.default.yellow(this.error)}
`;
			case "submit": return `${n}${import_picocolors.default.gray(o)}  ${import_picocolors.default.dim(i)}`;
			case "cancel": return `${n}${import_picocolors.default.gray(o)}  ${import_picocolors.default.strikethrough(import_picocolors.default.dim(i ?? ""))}${i ? `
${import_picocolors.default.gray(o)}` : ""}`;
			default: return `${n}${import_picocolors.default.cyan(o)}  ${r$1}
${import_picocolors.default.cyan(d)}
`;
		}
	}
}).prompt(), ye = (t) => {
	const n = t.active ?? "Yes", r$1 = t.inactive ?? "No";
	return new dD({
		active: n,
		inactive: r$1,
		initialValue: t.initialValue ?? !0,
		render() {
			const i = `${import_picocolors.default.gray(o)}
${b(this.state)}  ${t.message}
`, s = this.value ? n : r$1;
			switch (this.state) {
				case "submit": return `${i}${import_picocolors.default.gray(o)}  ${import_picocolors.default.dim(s)}`;
				case "cancel": return `${i}${import_picocolors.default.gray(o)}  ${import_picocolors.default.strikethrough(import_picocolors.default.dim(s))}
${import_picocolors.default.gray(o)}`;
				default: return `${i}${import_picocolors.default.cyan(o)}  ${this.value ? `${import_picocolors.default.green(k)} ${n}` : `${import_picocolors.default.dim(P)} ${import_picocolors.default.dim(n)}`} ${import_picocolors.default.dim("/")} ${this.value ? `${import_picocolors.default.dim(P)} ${import_picocolors.default.dim(r$1)}` : `${import_picocolors.default.green(k)} ${r$1}`}
${import_picocolors.default.cyan(d)}
`;
			}
		}
	}).prompt();
}, ve = (t) => {
	const n = (r$1, i) => {
		const s = r$1.label ?? String(r$1.value);
		switch (i) {
			case "selected": return `${import_picocolors.default.dim(s)}`;
			case "active": return `${import_picocolors.default.green(k)} ${s} ${r$1.hint ? import_picocolors.default.dim(`(${r$1.hint})`) : ""}`;
			case "cancelled": return `${import_picocolors.default.strikethrough(import_picocolors.default.dim(s))}`;
			default: return `${import_picocolors.default.dim(P)} ${import_picocolors.default.dim(s)}`;
		}
	};
	return new LD({
		options: t.options,
		initialValue: t.initialValue,
		render() {
			const r$1 = `${import_picocolors.default.gray(o)}
${b(this.state)}  ${t.message}
`;
			switch (this.state) {
				case "submit": return `${r$1}${import_picocolors.default.gray(o)}  ${n(this.options[this.cursor], "selected")}`;
				case "cancel": return `${r$1}${import_picocolors.default.gray(o)}  ${n(this.options[this.cursor], "cancelled")}
${import_picocolors.default.gray(o)}`;
				default: return `${r$1}${import_picocolors.default.cyan(o)}  ${G({
					cursor: this.cursor,
					options: this.options,
					maxItems: t.maxItems,
					style: (i, s) => n(i, s ? "active" : "inactive")
				}).join(`
${import_picocolors.default.cyan(o)}  `)}
${import_picocolors.default.cyan(d)}
`;
			}
		}
	}).prompt();
}, we = (t) => {
	const n = (r$1, i = "inactive") => {
		const s = r$1.label ?? String(r$1.value);
		return i === "selected" ? `${import_picocolors.default.dim(s)}` : i === "cancelled" ? `${import_picocolors.default.strikethrough(import_picocolors.default.dim(s))}` : i === "active" ? `${import_picocolors.default.bgCyan(import_picocolors.default.gray(` ${r$1.value} `))} ${s} ${r$1.hint ? import_picocolors.default.dim(`(${r$1.hint})`) : ""}` : `${import_picocolors.default.gray(import_picocolors.default.bgWhite(import_picocolors.default.inverse(` ${r$1.value} `)))} ${s} ${r$1.hint ? import_picocolors.default.dim(`(${r$1.hint})`) : ""}`;
	};
	return new ID({
		options: t.options,
		initialValue: t.initialValue,
		render() {
			const r$1 = `${import_picocolors.default.gray(o)}
${b(this.state)}  ${t.message}
`;
			switch (this.state) {
				case "submit": return `${r$1}${import_picocolors.default.gray(o)}  ${n(this.options.find((i) => i.value === this.value) ?? t.options[0], "selected")}`;
				case "cancel": return `${r$1}${import_picocolors.default.gray(o)}  ${n(this.options[0], "cancelled")}
${import_picocolors.default.gray(o)}`;
				default: return `${r$1}${import_picocolors.default.cyan(o)}  ${this.options.map((i, s) => n(i, s === this.cursor ? "active" : "inactive")).join(`
${import_picocolors.default.cyan(o)}  `)}
${import_picocolors.default.cyan(d)}
`;
			}
		}
	}).prompt();
}, fe = (t) => {
	const n = (r$1, i) => {
		const s = r$1.label ?? String(r$1.value);
		return i === "active" ? `${import_picocolors.default.cyan(A)} ${s} ${r$1.hint ? import_picocolors.default.dim(`(${r$1.hint})`) : ""}` : i === "selected" ? `${import_picocolors.default.green(T)} ${import_picocolors.default.dim(s)} ${r$1.hint ? import_picocolors.default.dim(`(${r$1.hint})`) : ""}` : i === "cancelled" ? `${import_picocolors.default.strikethrough(import_picocolors.default.dim(s))}` : i === "active-selected" ? `${import_picocolors.default.green(T)} ${s} ${r$1.hint ? import_picocolors.default.dim(`(${r$1.hint})`) : ""}` : i === "submitted" ? `${import_picocolors.default.dim(s)}` : `${import_picocolors.default.dim(F)} ${import_picocolors.default.dim(s)}`;
	};
	return new SD({
		options: t.options,
		initialValues: t.initialValues,
		required: t.required ?? !0,
		cursorAt: t.cursorAt,
		validate(r$1) {
			if (this.required && r$1.length === 0) return `Please select at least one option.
${import_picocolors.default.reset(import_picocolors.default.dim(`Press ${import_picocolors.default.gray(import_picocolors.default.bgWhite(import_picocolors.default.inverse(" space ")))} to select, ${import_picocolors.default.gray(import_picocolors.default.bgWhite(import_picocolors.default.inverse(" enter ")))} to submit`))}`;
		},
		render() {
			const r$1 = `${import_picocolors.default.gray(o)}
${b(this.state)}  ${t.message}
`, i = (s, c) => {
				const a = this.value.includes(s.value);
				return c && a ? n(s, "active-selected") : a ? n(s, "selected") : n(s, c ? "active" : "inactive");
			};
			switch (this.state) {
				case "submit": return `${r$1}${import_picocolors.default.gray(o)}  ${this.options.filter(({ value: s }) => this.value.includes(s)).map((s) => n(s, "submitted")).join(import_picocolors.default.dim(", ")) || import_picocolors.default.dim("none")}`;
				case "cancel": {
					const s = this.options.filter(({ value: c }) => this.value.includes(c)).map((c) => n(c, "cancelled")).join(import_picocolors.default.dim(", "));
					return `${r$1}${import_picocolors.default.gray(o)}  ${s.trim() ? `${s}
${import_picocolors.default.gray(o)}` : ""}`;
				}
				case "error": {
					const s = this.error.split(`
`).map((c, a) => a === 0 ? `${import_picocolors.default.yellow(d)}  ${import_picocolors.default.yellow(c)}` : `   ${c}`).join(`
`);
					return `${r$1 + import_picocolors.default.yellow(o)}  ${G({
						options: this.options,
						cursor: this.cursor,
						maxItems: t.maxItems,
						style: i
					}).join(`
${import_picocolors.default.yellow(o)}  `)}
${s}
`;
				}
				default: return `${r$1}${import_picocolors.default.cyan(o)}  ${G({
					options: this.options,
					cursor: this.cursor,
					maxItems: t.maxItems,
					style: i
				}).join(`
${import_picocolors.default.cyan(o)}  `)}
${import_picocolors.default.cyan(d)}
`;
			}
		}
	}).prompt();
}, be = (t) => {
	const { selectableGroups: n = !0 } = t, r$1 = (i, s, c = []) => {
		const a = i.label ?? String(i.value), l$1 = typeof i.group == "string", $$1 = l$1 && (c[c.indexOf(i) + 1] ?? { group: !0 }), g$1 = l$1 && $$1.group === !0, p$2 = l$1 ? n ? `${g$1 ? d : o} ` : "  " : "";
		if (s === "active") return `${import_picocolors.default.dim(p$2)}${import_picocolors.default.cyan(A)} ${a} ${i.hint ? import_picocolors.default.dim(`(${i.hint})`) : ""}`;
		if (s === "group-active") return `${p$2}${import_picocolors.default.cyan(A)} ${import_picocolors.default.dim(a)}`;
		if (s === "group-active-selected") return `${p$2}${import_picocolors.default.green(T)} ${import_picocolors.default.dim(a)}`;
		if (s === "selected") {
			const f = l$1 || n ? import_picocolors.default.green(T) : "";
			return `${import_picocolors.default.dim(p$2)}${f} ${import_picocolors.default.dim(a)} ${i.hint ? import_picocolors.default.dim(`(${i.hint})`) : ""}`;
		}
		if (s === "cancelled") return `${import_picocolors.default.strikethrough(import_picocolors.default.dim(a))}`;
		if (s === "active-selected") return `${import_picocolors.default.dim(p$2)}${import_picocolors.default.green(T)} ${a} ${i.hint ? import_picocolors.default.dim(`(${i.hint})`) : ""}`;
		if (s === "submitted") return `${import_picocolors.default.dim(a)}`;
		const v$1 = l$1 || n ? import_picocolors.default.dim(F) : "";
		return `${import_picocolors.default.dim(p$2)}${v$1} ${import_picocolors.default.dim(a)}`;
	};
	return new _D({
		options: t.options,
		initialValues: t.initialValues,
		required: t.required ?? !0,
		cursorAt: t.cursorAt,
		selectableGroups: n,
		validate(i) {
			if (this.required && i.length === 0) return `Please select at least one option.
${import_picocolors.default.reset(import_picocolors.default.dim(`Press ${import_picocolors.default.gray(import_picocolors.default.bgWhite(import_picocolors.default.inverse(" space ")))} to select, ${import_picocolors.default.gray(import_picocolors.default.bgWhite(import_picocolors.default.inverse(" enter ")))} to submit`))}`;
		},
		render() {
			const i = `${import_picocolors.default.gray(o)}
${b(this.state)}  ${t.message}
`;
			switch (this.state) {
				case "submit": return `${i}${import_picocolors.default.gray(o)}  ${this.options.filter(({ value: s }) => this.value.includes(s)).map((s) => r$1(s, "submitted")).join(import_picocolors.default.dim(", "))}`;
				case "cancel": {
					const s = this.options.filter(({ value: c }) => this.value.includes(c)).map((c) => r$1(c, "cancelled")).join(import_picocolors.default.dim(", "));
					return `${i}${import_picocolors.default.gray(o)}  ${s.trim() ? `${s}
${import_picocolors.default.gray(o)}` : ""}`;
				}
				case "error": {
					const s = this.error.split(`
`).map((c, a) => a === 0 ? `${import_picocolors.default.yellow(d)}  ${import_picocolors.default.yellow(c)}` : `   ${c}`).join(`
`);
					return `${i}${import_picocolors.default.yellow(o)}  ${this.options.map((c, a, l$1) => {
						const $$1 = this.value.includes(c.value) || c.group === !0 && this.isGroupSelected(`${c.value}`), g$1 = a === this.cursor;
						return !g$1 && typeof c.group == "string" && this.options[this.cursor].value === c.group ? r$1(c, $$1 ? "group-active-selected" : "group-active", l$1) : g$1 && $$1 ? r$1(c, "active-selected", l$1) : $$1 ? r$1(c, "selected", l$1) : r$1(c, g$1 ? "active" : "inactive", l$1);
					}).join(`
${import_picocolors.default.yellow(o)}  `)}
${s}
`;
				}
				default: return `${i}${import_picocolors.default.cyan(o)}  ${this.options.map((s, c, a) => {
					const l$1 = this.value.includes(s.value) || s.group === !0 && this.isGroupSelected(`${s.value}`), $$1 = c === this.cursor;
					return !$$1 && typeof s.group == "string" && this.options[this.cursor].value === s.group ? r$1(s, l$1 ? "group-active-selected" : "group-active", a) : $$1 && l$1 ? r$1(s, "active-selected", a) : l$1 ? r$1(s, "selected", a) : r$1(s, $$1 ? "active" : "inactive", a);
				}).join(`
${import_picocolors.default.cyan(o)}  `)}
${import_picocolors.default.cyan(d)}
`;
			}
		}
	}).prompt();
}, Me = (t = "", n = "") => {
	const r$1 = `
${t}
`.split(`
`), i = stripVTControlCharacters(n).length, s = Math.max(r$1.reduce((a, l$1) => {
		const $$1 = stripVTControlCharacters(l$1);
		return $$1.length > a ? $$1.length : a;
	}, 0), i) + 2, c = r$1.map((a) => `${import_picocolors.default.gray(o)}  ${import_picocolors.default.dim(a)}${" ".repeat(s - stripVTControlCharacters(a).length)}${import_picocolors.default.gray(o)}`).join(`
`);
	process.stdout.write(`${import_picocolors.default.gray(o)}
${import_picocolors.default.green(C)}  ${import_picocolors.default.reset(n)} ${import_picocolors.default.gray(_.repeat(Math.max(s - i - 1, 1)) + me)}
${c}
${import_picocolors.default.gray(de + _.repeat(s + 2) + pe)}
`);
}, xe = (t = "") => {
	process.stdout.write(`${import_picocolors.default.gray(d)}  ${import_picocolors.default.red(t)}

`);
}, Ie = (t = "") => {
	process.stdout.write(`${import_picocolors.default.gray(ue)}  ${t}
`);
}, Se = (t = "") => {
	process.stdout.write(`${import_picocolors.default.gray(o)}
${import_picocolors.default.gray(d)}  ${t}

`);
}, M = {
	message: (t = "", { symbol: n = import_picocolors.default.gray(o) } = {}) => {
		const r$1 = [`${import_picocolors.default.gray(o)}`];
		if (t) {
			const [i, ...s] = t.split(`
`);
			r$1.push(`${n}  ${i}`, ...s.map((c) => `${import_picocolors.default.gray(o)}  ${c}`));
		}
		process.stdout.write(`${r$1.join(`
`)}
`);
	},
	info: (t) => {
		M.message(t, { symbol: import_picocolors.default.blue(q) });
	},
	success: (t) => {
		M.message(t, { symbol: import_picocolors.default.green(D) });
	},
	step: (t) => {
		M.message(t, { symbol: import_picocolors.default.green(C) });
	},
	warn: (t) => {
		M.message(t, { symbol: import_picocolors.default.yellow(U) });
	},
	warning: (t) => {
		M.warn(t);
	},
	error: (t) => {
		M.message(t, { symbol: import_picocolors.default.red(K) });
	}
}, J = `${import_picocolors.default.gray(o)}  `, x = {
	message: async (t, { symbol: n = import_picocolors.default.gray(o) } = {}) => {
		process.stdout.write(`${import_picocolors.default.gray(o)}
${n}  `);
		let r$1 = 3;
		for await (let i of t) {
			i = i.replace(/\n/g, `
${J}`), i.includes(`
`) && (r$1 = 3 + stripVTControlCharacters(i.slice(i.lastIndexOf(`
`))).length);
			const s = stripVTControlCharacters(i).length;
			r$1 + s < process.stdout.columns ? (r$1 += s, process.stdout.write(i)) : (process.stdout.write(`
${J}${i.trimStart()}`), r$1 = 3 + stripVTControlCharacters(i.trimStart()).length);
		}
		process.stdout.write(`
`);
	},
	info: (t) => x.message(t, { symbol: import_picocolors.default.blue(q) }),
	success: (t) => x.message(t, { symbol: import_picocolors.default.green(D) }),
	step: (t) => x.message(t, { symbol: import_picocolors.default.green(C) }),
	warn: (t) => x.message(t, { symbol: import_picocolors.default.yellow(U) }),
	warning: (t) => x.warn(t),
	error: (t) => x.message(t, { symbol: import_picocolors.default.red(K) })
}, Y = ({ indicator: t = "dots" } = {}) => {
	const n = V ? [
		"◒",
		"◐",
		"◓",
		"◑"
	] : [
		"•",
		"o",
		"O",
		"0"
	], r$1 = V ? 80 : 120, i = process.env.CI === "true";
	let s, c, a = !1, l$1 = "", $$1, g$1 = performance.now();
	const p$2 = (m$1) => {
		const h$1 = m$1 > 1 ? "Something went wrong" : "Canceled";
		a && N$1(h$1, m$1);
	}, v$1 = () => p$2(2), f = () => p$2(1), j = () => {
		process.on("uncaughtExceptionMonitor", v$1), process.on("unhandledRejection", v$1), process.on("SIGINT", f), process.on("SIGTERM", f), process.on("exit", p$2);
	}, E = () => {
		process.removeListener("uncaughtExceptionMonitor", v$1), process.removeListener("unhandledRejection", v$1), process.removeListener("SIGINT", f), process.removeListener("SIGTERM", f), process.removeListener("exit", p$2);
	}, B$1 = () => {
		if ($$1 === void 0) return;
		i && process.stdout.write(`
`);
		const m$1 = $$1.split(`
`);
		process.stdout.write(import_src.cursor.move(-999, m$1.length - 1)), process.stdout.write(import_src.erase.down(m$1.length));
	}, R$1 = (m$1) => m$1.replace(/\.+$/, ""), O$1 = (m$1) => {
		const h$1 = (performance.now() - m$1) / 1e3, w$1 = Math.floor(h$1 / 60), I$1 = Math.floor(h$1 % 60);
		return w$1 > 0 ? `[${w$1}m ${I$1}s]` : `[${I$1}s]`;
	}, H$1 = (m$1 = "") => {
		a = !0, s = fD(), l$1 = R$1(m$1), g$1 = performance.now(), process.stdout.write(`${import_picocolors.default.gray(o)}
`);
		let h$1 = 0, w$1 = 0;
		j(), c = setInterval(() => {
			if (i && l$1 === $$1) return;
			B$1(), $$1 = l$1;
			const I$1 = import_picocolors.default.magenta(n[h$1]);
			if (i) process.stdout.write(`${I$1}  ${l$1}...`);
			else if (t === "timer") process.stdout.write(`${I$1}  ${l$1} ${O$1(g$1)}`);
			else {
				const z$1 = ".".repeat(Math.floor(w$1)).slice(0, 3);
				process.stdout.write(`${I$1}  ${l$1}${z$1}`);
			}
			h$1 = h$1 + 1 < n.length ? h$1 + 1 : 0, w$1 = w$1 < n.length ? w$1 + .125 : 0;
		}, r$1);
	}, N$1 = (m$1 = "", h$1 = 0) => {
		a = !1, clearInterval(c), B$1();
		const w$1 = h$1 === 0 ? import_picocolors.default.green(C) : h$1 === 1 ? import_picocolors.default.red(L) : import_picocolors.default.red(W);
		l$1 = R$1(m$1 ?? l$1), t === "timer" ? process.stdout.write(`${w$1}  ${l$1} ${O$1(g$1)}
`) : process.stdout.write(`${w$1}  ${l$1}
`), E(), s();
	};
	return {
		start: H$1,
		stop: N$1,
		message: (m$1 = "") => {
			l$1 = R$1(m$1 ?? l$1);
		}
	};
}, Ce = async (t, n) => {
	const r$1 = {}, i = Object.keys(t);
	for (const s of i) {
		const c = t[s], a = await c({ results: r$1 })?.catch((l$1) => {
			throw l$1;
		});
		if (typeof n?.onCancel == "function" && pD(a)) {
			r$1[s] = "canceled", n.onCancel({ results: r$1 });
			continue;
		}
		r$1[s] = a;
	}
	return r$1;
}, Te = async (t) => {
	for (const n of t) {
		if (n.enabled === !1) continue;
		const r$1 = Y();
		r$1.start(n.title);
		const i = await n.task(r$1.message);
		r$1.stop(i || n.title);
	}
};

//#endregion
//#region src/utils/console-colors.ts
const colors = {
	reset: "\x1B[0m",
	bold: "\x1B[1m",
	red: "\x1B[31m",
	green: "\x1B[32m",
	yellow: "\x1B[33m",
	blue: "\x1B[34m",
	magenta: "\x1B[35m",
	cyan: "\x1B[36m",
	dimGray: "\x1B[2m"
};
function red(text) {
	return `${colors.red}${text}${colors.reset}`;
}
function green(text) {
	return `${colors.green}${text}${colors.reset}`;
}

//#endregion
//#region ../../node_modules/.pnpm/mri@1.2.0/node_modules/mri/lib/index.js
var require_lib = /* @__PURE__ */ __commonJS({ "../../node_modules/.pnpm/mri@1.2.0/node_modules/mri/lib/index.js": ((exports, module) => {
	function toArr(any) {
		return any == null ? [] : Array.isArray(any) ? any : [any];
	}
	function toVal(out, key, val, opts) {
		var x$2, old = out[key], nxt = !!~opts.string.indexOf(key) ? val == null || val === true ? "" : String(val) : typeof val === "boolean" ? val : !!~opts.boolean.indexOf(key) ? val === "false" ? false : val === "true" || (out._.push((x$2 = +val, x$2 * 0 === 0) ? x$2 : val), !!val) : (x$2 = +val, x$2 * 0 === 0) ? x$2 : val;
		out[key] = old == null ? nxt : Array.isArray(old) ? old.concat(nxt) : [old, nxt];
	}
	module.exports = function(args, opts) {
		args = args || [];
		opts = opts || {};
		var k$2, arr, arg, name, val, out = { _: [] };
		var i = 0, j = 0, idx = 0, len = args.length;
		const alibi = opts.alias !== void 0;
		const strict = opts.unknown !== void 0;
		const defaults = opts.default !== void 0;
		opts.alias = opts.alias || {};
		opts.string = toArr(opts.string);
		opts.boolean = toArr(opts.boolean);
		if (alibi) for (k$2 in opts.alias) {
			arr = opts.alias[k$2] = toArr(opts.alias[k$2]);
			for (i = 0; i < arr.length; i++) (opts.alias[arr[i]] = arr.concat(k$2)).splice(i, 1);
		}
		for (i = opts.boolean.length; i-- > 0;) {
			arr = opts.alias[opts.boolean[i]] || [];
			for (j = arr.length; j-- > 0;) opts.boolean.push(arr[j]);
		}
		for (i = opts.string.length; i-- > 0;) {
			arr = opts.alias[opts.string[i]] || [];
			for (j = arr.length; j-- > 0;) opts.string.push(arr[j]);
		}
		if (defaults) for (k$2 in opts.default) {
			name = typeof opts.default[k$2];
			arr = opts.alias[k$2] = opts.alias[k$2] || [];
			if (opts[name] !== void 0) {
				opts[name].push(k$2);
				for (i = 0; i < arr.length; i++) opts[name].push(arr[i]);
			}
		}
		const keys = strict ? Object.keys(opts.alias) : [];
		for (i = 0; i < len; i++) {
			arg = args[i];
			if (arg === "--") {
				out._ = out._.concat(args.slice(++i));
				break;
			}
			for (j = 0; j < arg.length; j++) if (arg.charCodeAt(j) !== 45) break;
			if (j === 0) out._.push(arg);
			else if (arg.substring(j, j + 3) === "no-") {
				name = arg.substring(j + 3);
				if (strict && !~keys.indexOf(name)) return opts.unknown(arg);
				out[name] = false;
			} else {
				for (idx = j + 1; idx < arg.length; idx++) if (arg.charCodeAt(idx) === 61) break;
				name = arg.substring(j, idx);
				val = arg.substring(++idx) || i + 1 === len || ("" + args[i + 1]).charCodeAt(0) === 45 || args[++i];
				arr = j === 2 ? [name] : name;
				for (idx = 0; idx < arr.length; idx++) {
					name = arr[idx];
					if (strict && !~keys.indexOf(name)) return opts.unknown("-".repeat(j) + name);
					toVal(out, name, idx + 1 < arr.length || val, opts);
				}
			}
		}
		if (defaults) {
			for (k$2 in opts.default) if (out[k$2] === void 0) out[k$2] = opts.default[k$2];
		}
		if (alibi) for (k$2 in out) {
			arr = opts.alias[k$2] || [];
			while (arr.length > 0) out[arr.shift()] = out[k$2];
		}
		return out;
	};
}) });

//#endregion
//#region src/index.ts
var import_lib = /* @__PURE__ */ __toESM(require_lib(), 1);
const variantMap = {
	express: [
		{
			value: "js-basic",
			label: "JavaScript – Basic"
		},
		{
			value: "ts-basic",
			label: "TypeScript – Basic"
		},
		{
			value: "js-mvc",
			label: "JavaScript – MVC"
		},
		{
			value: "ts-mvc",
			label: "TypeScript – MVC"
		}
	],
	django: [{
		value: "py-basic",
		label: "Python – Basic"
	}, {
		value: "py-api",
		label: "Python – API Only"
	}],
	laravel: [{
		value: "php-basic",
		label: "PHP – Basic"
	}, {
		value: "php-api",
		label: "PHP – API Only"
	}]
};
function copyRecursiveSync(src, dest) {
	const stat = fs.statSync(src);
	if (stat.isDirectory()) {
		fs.mkdirSync(dest, { recursive: true });
		for (const file of fs.readdirSync(src)) {
			const curSrc = path.join(src, file);
			const curDest = path.join(dest, file);
			copyRecursiveSync(curSrc, curDest);
		}
	} else fs.copyFileSync(src, dest);
}
async function main() {
	Ie("Servest – Backend project generator");
	const args = (0, import_lib.default)(process.argv.slice(2), {
		alias: {
			t: "type",
			v: "variant",
			n: "name"
		},
		string: [
			"type",
			"variant",
			"name"
		]
	});
	let projectType = args.type;
	let variant = args.variant;
	let folderName = args.name;
	if (!projectType || !Object.keys(variantMap).includes(projectType)) {
		const selected = await ve({
			message: "Choose a backend framework:",
			options: Object.entries(variantMap).map(([key, _$2]) => ({
				label: key.charAt(0).toUpperCase() + key.slice(1),
				value: key
			}))
		});
		if (pD(selected)) {
			console.error(red("❌ Operation cancelled."));
			process.exit(1);
		}
		projectType = selected;
	}
	if (!variant || !variantMap[projectType].some((v$1) => v$1.value === variant)) {
		const selected = await ve({
			message: "Choose a variant:",
			options: variantMap[projectType]
		});
		if (pD(selected)) {
			console.error(red("❌ Operation cancelled."));
			process.exit(1);
		}
		variant = selected;
	}
	if (!folderName) {
		const input = await he({
			message: "Project folder name:",
			placeholder: "my-backend-app"
		});
		if (pD(input)) {
			console.error(red("❌ Operation cancelled."));
			process.exit(1);
		}
		folderName = input;
	}
	if (typeof folderName !== "string" || folderName.trim() === "") {
		console.error(red("❌ Invalid folder name"));
		process.exit(1);
	}
	const __filename = fileURLToPath(import.meta.url);
	const __dirname = path.dirname(__filename);
	const src = path.resolve(__dirname, `../../templates/${projectType}-${variant}`);
	const dest = path.resolve(process.cwd(), folderName);
	if (fs.existsSync(dest)) {
		console.error(red(`❌ Folder "${folderName}" already exists.`));
		process.exit(1);
	}
	console.log(`\n🛠️  Generating project "${folderName}" using ${projectType} (${variant})...`);
	try {
		copyRecursiveSync(src, dest);
	} catch (err) {
		console.error(red(`❌ Failed to copy template files: ${err.message}`));
		process.exit(1);
	}
	Se(green(`🎉 Done! Project created at ./${folderName}`));
}
main().catch((err) => {
	console.error(red("❌ Unexpected error:"), err);
	process.exit(1);
});

//#endregion
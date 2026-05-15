/******/ (() => { // webpackBootstrap
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var runtimeEnv = typeof process !== "undefined" ? process.env : {};
var SUPABASE_URL = "https://ouahckygrynsrziyolcx.supabase.co";
var SUPABASE_ANON_KEY = "sb_publishable_YGq3p7zpM59V8HOirmZNoQ_ALy8Ud-L";
var SUPABASE_TABLE = "works";
function isAddingPage() {
  return Boolean(document.getElementById("submitWorkButton"));
}
function getStatusNode() {
  return document.getElementById("addingStatus");
}
function setStatus(text) {
  var isError = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var status = getStatusNode();
  if (!status) return;
  status.textContent = text;
  status.style.color = isError ? "#ff4d4f" : "inherit";
}
function readFormValues() {
  var _document$getElementB, _document$getElementB2, _document$getElementB3, _document$getElementB4;
  var author = ((_document$getElementB = document.getElementById("addingAuthor")) === null || _document$getElementB === void 0 ? void 0 : _document$getElementB.value.trim()) || "";
  var title = ((_document$getElementB2 = document.getElementById("addingTitle")) === null || _document$getElementB2 === void 0 ? void 0 : _document$getElementB2.value.trim()) || "";
  var link = ((_document$getElementB3 = document.getElementById("addingLink")) === null || _document$getElementB3 === void 0 ? void 0 : _document$getElementB3.value.trim()) || "";
  var description = ((_document$getElementB4 = document.getElementById("addingDescription")) === null || _document$getElementB4 === void 0 ? void 0 : _document$getElementB4.value.trim()) || "";
  return {
    author: author,
    title: title,
    link: link,
    description: description
  };
}
function validatePayload(payload) {
  if (!payload.author || !payload.title || !payload.link || !payload.description) {
    return "Заполните все поля перед отправкой.";
  }
  try {
    var url = new URL(payload.link);
    if (!["http:", "https:"].includes(url.protocol)) {
      return "Ссылка должна начинаться с http:// или https://.";
    }
  } catch (_unused) {
    return "Укажите корректную ссылку на работу.";
  }
  return "";
}
function saveWorkForModeration(_x) {
  return _saveWorkForModeration.apply(this, arguments);
}
function _saveWorkForModeration() {
  _saveWorkForModeration = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(payload) {
    var response, details;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          _context.n = 1;
          return fetch("".concat(SUPABASE_URL, "/rest/v1/").concat(SUPABASE_TABLE), {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              apikey: SUPABASE_ANON_KEY,
              Authorization: "Bearer ".concat(SUPABASE_ANON_KEY),
              Prefer: "return=representation"
            },
            body: JSON.stringify({
              title: payload.title,
              author: payload.author,
              link: payload.link,
              description: payload.description,
              state: false,
              official: null
            })
          });
        case 1:
          response = _context.v;
          if (response.ok) {
            _context.n = 3;
            break;
          }
          _context.n = 2;
          return response.text();
        case 2:
          details = _context.v;
          throw new Error("\u041E\u0448\u0438\u0431\u043A\u0430 \u0437\u0430\u043F\u0438\u0441\u0438 \u0432 Supabase: ".concat(details));
        case 3:
          return _context.a(2);
      }
    }, _callee);
  }));
  return _saveWorkForModeration.apply(this, arguments);
}
function submitWork() {
  return _submitWork.apply(this, arguments);
}
function _submitWork() {
  _submitWork = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
    var payload, validationError, button, _t;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.p = _context2.n) {
        case 0:
          payload = readFormValues();
          validationError = validatePayload(payload);
          if (!validationError) {
            _context2.n = 1;
            break;
          }
          setStatus(validationError, true);
          return _context2.a(2);
        case 1:
          button = document.getElementById("submitWorkButton");
          if (button) {
            button.disabled = true;
            button.textContent = "Отправляем...";
          }
          setStatus("Проверяем и отправляем работу...");
          _context2.p = 2;
          _context2.n = 3;
          return saveWorkForModeration(payload);
        case 3:
          setStatus("Готово! Работа отправлена на модерацию.");
          ["addingAuthor", "addingTitle", "addingLink", "addingDescription"].forEach(function (id) {
            var node = document.getElementById(id);
            if (node) node.value = "";
          });
          _context2.n = 5;
          break;
        case 4:
          _context2.p = 4;
          _t = _context2.v;
          setStatus(_t.message || "Не удалось отправить работу.", true);
        case 5:
          _context2.p = 5;
          if (button) {
            button.disabled = false;
            button.textContent = "Предложить работу";
          }
          return _context2.f(5);
        case 6:
          return _context2.a(2);
      }
    }, _callee2, null, [[2, 4, 5, 6]]);
  }));
  return _submitWork.apply(this, arguments);
}
function printSupabaseSetupHint() {
  if (SUPABASE_URL && SUPABASE_ANON_KEY) return;
  console.info("\n[adding] \u041A\u0430\u043A \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0438\u0442\u044C Supabase:\n1) \u0412 Supabase \u043E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 Settings \u2192 API.\n2) \u0421\u043A\u043E\u043F\u0438\u0440\u0443\u0439\u0442\u0435 Project URL \u0438 anon public key.\n3) \u041F\u0435\u0440\u0435\u0434\u0430\u0439\u0442\u0435 \u0438\u0445 \u0432 window.__SUPABASE_URL__ \u0438 window.__SUPABASE_ANON_KEY__.\n4) \u0421\u043E\u0437\u0434\u0430\u0439\u0442\u0435 \u0442\u0430\u0431\u043B\u0438\u0446\u0443 pending_gallery_works \u0441\u043E \u0441\u0442\u043E\u043B\u0431\u0446\u0430\u043C\u0438: title, author, link, description, status, submitted_at.\n");
}
function initAddingForm() {
  if (!isAddingPage()) return;
  printSupabaseSetupHint();
  var submitButton = document.getElementById("submitWorkButton");
  if (!submitButton) return;
  submitButton.addEventListener("click", submitWork);
}
initAddingForm();
/******/ })()
;
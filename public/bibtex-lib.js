(function() {
  var V = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
  function Ls(P) { return P && P.__esModule && Object.prototype.hasOwnProperty.call(P, "default") ? P.default : P; }
  function te(P, m, R) { 
    R = { path: m, exports: {}, require: function(E, O) { return Ns(E, O !== undefined && O !== null ? O : R.path); } }; 
    P(R, R.exports); 
    return R.exports; 
  }
  function Ns() { throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs"); }
  
  var X = te(function(P, m) {
    Object.defineProperty(m, "__esModule", { value: true });
    m.BtMetatype = m.EXPAND_MACROS = void 0;
    m.EXPAND_MACROS = 2;
    var R;
    (function(E) { E.UNKNOWN = "UNKNOWN"; E.REGULAR = "REGULAR"; E.COMMENT = "COMMENT"; E.PREAMBLE = "PREAMBLE"; E.MACRODEF = "MACRODEF"; })(R || (m.BtMetatype = R = {}));
  });
  
  var Ts = te(function(P, m) {
    Object.defineProperty(m, "__esModule", { value: true });
    m.StartRules = void 0;
    m.SyntaxError = E;
    m.parse = w;
    function R(a, p) { function e() { this.constructor = a; } e.prototype = p.prototype; a.prototype = new e(); }
    function E(a, p, e, h) { var A = Error.call(this, a); if (Object.setPrototypeOf) { Object.setPrototypeOf(A, E.prototype); } A.expected = p; A.found = e; A.location = h; A.name = "SyntaxError"; return A; }
    R(E, Error);
    function O(a, p, e) { e = e || " "; if (a.length > p) return a; p -= a.length; e += e.repeat(p); return a + e.slice(0, p); }
    E.prototype.format = function(a) {
      var p = "Error: " + this.message;
      if (this.location) {
        var e = null, h;
        for (h = 0; h < a.length; h++) if (a[h].source === this.location.source) { e = a[h].text.split(/\r\n|\n|\r/g); break; }
        var A = this.location.start, b = this.location.source && typeof this.location.source.offset == "function" ? this.location.source.offset(A) : A, L = this.location.source + ":" + b.line + ":" + b.column;
        if (e) {
          var B = this.location.end, _ = O("", b.line.toString().length, " "), y = e[A.line - 1], d = A.line === B.line ? B.column : y.length + 1, M = d - A.column || 1;
          p += "\n --> " + L + "\n" + _ + " |\n" + b.line + " | " + y + "\n" + _ + " | " + O("", A.column - 1, " ") + O("", M, "^");
        } else p += "\n at " + L;
      }
      return p;
    };
    E.buildMessage = function(a, p) {
      var e = { literal: function(y) { return '"' + A(y.text) + '"'; }, class: function(y) { var d = y.parts.map(function(M) { return Array.isArray(M) ? b(M[0]) + "-" + b(M[1]) : b(M); }); return "[" + (y.inverted ? "^" : "") + d.join("") + "]"; }, any: function() { return "any character"; }, end: function() { return "end of input"; }, other: function(y) { return y.description; } };
      function h(y) { return y.charCodeAt(0).toString(16).toUpperCase(); }
      function A(y) { return y.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\0/g, "\\0").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/[\x00-\x0F]/g, function(d) { return "\\x0" + h(d); }).replace(/[\x10-\x1F\x7F-\x9F]/g, function(d) { return "\\x" + h(d); }); }
      function b(y) { return y.replace(/\\/g, "\\\\").replace(/\]/g, "\\]").replace(/\^/g, "\\^").replace(/-/g, "\\-").replace(/\0/g, "\\0").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/[\x00-\x0F]/g, function(d) { return "\\x0" + h(d); }).replace(/[\x10-\x1F\x7F-\x9F]/g, function(d) { return "\\x" + h(d); }); }
      function L(y) { return e[y.type](y); }
      function B(y) { var d = y.map(L), M, N; if (d.sort(), d.length > 0) { for (M = 1, N = 1; M < d.length; M++) if (d[M - 1] !== d[M]) { d[N] = d[M]; N++; } d.length = N; } switch (d.length) { case 1: return d[0]; case 2: return d[0] + " or " + d[1]; default: return d.slice(0, -1).join(", ") + ", or " + d[d.length - 1]; } }
      function _(y) { return y ? '"' + A(y) + '"' : "end of input"; }
      return "Expected " + B(a) + " but " + _(p) + " found.";
    };
    function w(a, p) {
      p = p !== undefined ? p : {};
      var e = {}, h = p.grammarSource, A = { BibFile: Ye }, b = Ye, L = "%", B = "\n", _ = "@", y = "{", d = "}", M = "(", N = ")", D = ",", pe = "=", he = "#", ve = '"', $e = '""', de = '\\"', Ae = "-", z = /^[^\n]/, ye = /^[^@%]/, ur = /^[({]/, gr = /^[)}]/, Ce = /^[^ \t\n\r,@{}()]/, me = /^[^ \t\n\r,@{}()0-9]/, pr = /^[sS]/, Ee = /^[tT]/, be = /^[rR]/, hr = /^[iI]/, we = /^[nN]/, vr = /^[gG]/, $r = /^[pP]/, fe = /^[eE]/, dr = /^[aA]/, ie = /^[mM]/, Ar = /^[bB]/, yr = /^[lL]/, Cr = /^[cC]/, mr = /^[oO]/, Me = /^[^}]/, Oe = /^[^)]/, Re = /^[^})]/, je = /^[^"]/, Er = /^[^{}]/, x = /^[0-9]/, _e = /^[^,}]/, Pe = /^[^ \t\n\r=,@{}()]/, Fe = /^[ \t\n\r]/, Le = j("%", false), J = C(["\n"], true, false), Ne = j("\n", false), br = ms(), Te = C(["@", "%"], true, false), T = j("@", false), q = j("{", false), K = j("}", false), ae = j("(", false), le = j(")", false), k = j(",", false), Se = j("=", false), wr = C(["(", "{"], false, false), Mr = C([")", "}"], false, false), Be = C([" ", "\t", "\n", "\r", ",", "@", "{", "}", "(", ")"], true, false), De = C([" ", "\t", "\n", "\r", ",", "@", "{", "}", "(", ")", ["0", "9"]], true, false), Or = C(["s", "S"], false, false), xe = C(["t", "T"], false, false), ke = C(["r", "R"], false, false), Rr = C(["i", "I"], false, false), Ge = C(["n", "N"], false, false), jr = C(["g", "G"], false, false), _r = C(["p", "P"], false, false), ne = C(["e", "E"], false, false), Pr = C(["a", "A"], false, false), oe = C(["m", "M"], false, false), Fr = C(["b", "B"], false, false), Lr = C(["l", "L"], false, false), Nr = C(["c", "C"], false, false), Tr = C(["o", "O"], false, false), Ue = C(["}"], true, false), Ie = C([")"], true, false), Ve = C(["}", ")"], true, false), Xe = j("#", false), qe = j('"', false), Ke = C(['"'], true, false), Sr = j('""', false), Br = j('\\"', false), Dr = C(["{", "}"], true, false), G = C([["0", "9"]], false, false), We = j("-", false), Qe = C([",", "}"], true, false), ze = C([" ", "\t", "\n", "\r", "=", ",", "@", "{", "}", "(", ")"], true, false), Je = C([" ", "\t", "\n", "\r"], false, false),
      xr = function(r) { return r.filter(function(t) { return t !== null; }); },
      kr = function() { return null; },
      Gr = function() { return null; },
      Ur = function(r, t) { return { type: r.toLowerCase(), key: t || "", metatype: S.REGULAR, fields: {} }; },
      Ir = function(r, t) { return { type: r.toLowerCase(), key: t || "", metatype: S.REGULAR, fields: {} }; },
      Vr = function(r, t, f) { var i = { type: r.toLowerCase(), key: t || "", metatype: S.REGULAR, fields: {} }; for (var o = 0; o < f.length; o++) if (f[o]) { var pair = f[o]; i.fields[pair[0].toLowerCase()] = pair[1]; } return i; },
      Xr = function(r, t, f) { var i = { type: r.toLowerCase(), key: t || "", metatype: S.REGULAR, fields: {} }; for (var o = 0; o < f.length; o++) if (f[o]) { var pair = f[o]; i.fields[pair[0].toLowerCase()] = pair[1]; } return i; },
      qr = function(r, t, f) { var i = t.toLowerCase(), o = { type: "string", key: "", metatype: S.MACRODEF, fields: {} }; o.fields[i] = f; return o; },
      Kr = function(r, t) { var f = { type: "string", key: "", metatype: S.MACRODEF, fields: {} }; for (var i = 0; i < t.length; i++) if (t[i]) { var pair = t[i], v = pair[0].toLowerCase(); f.fields[v] = pair[1]; } return f; },
      Wr = function(r, t) { return { type: "preamble", key: "", metatype: S.PREAMBLE, fields: { content: t } }; },
      Qr = function(r, t) { return { type: "comment", key: "", metatype: S.COMMENT, fields: { content: t } }; },
      zr = function(r) { return r.join(""); },
      Jr = function() { return ""; },
      Zr = function(r) { return r.join("").toLowerCase(); },
      Hr = function() { return "string"; },
      Yr = function() { return "preamble"; },
      es = function() { return "comment"; },
      rs = function(r) { return r.join(""); },
      ss = function(r) { return r.join(""); },
      ts = function(r) { return r.join(""); },
      fs = function(r, t) { var f = r ? [r] : []; for (var i = 0; i < t.length; i++) if (t[i][3]) f.push(t[i][3]); return f; },
      is = function(r, t) { var f = r ? [r] : []; for (var i = 0; i < t.length; i++) if (t[i][3]) f.push(t[i][3]); return f; },
      as = function(r, t) { return [r, t]; },
      ls = function(r, t) { if (t.length === 0) return r; var f = [r]; for (var i = 0; i < t.length; i++) f.push(t[i][3]); return ["concat"].concat(f); },
      ns = function(r) { return ["macro", r]; },
      os = function(r) { return r.join(""); },
      cs = function() { return ""; },
      us = function() { return '"'; },
      gs = function(r) { return r; },
      ps = function(r) { return r.join(""); },
      hs = function(r) { return "{" + r + "}"; },
      vs = function(r) { return r; },
      $s = function(r, t, f, i) { return r.join("") + t.join("") + f.join("") + i.join(""); },
      ds = function(r) { return r.join(""); },
      As = function(r) { return r.join(""); },
      ys = function() { return null; },
      Cs = function() { return null; },
      s = p.peg$currPos | 0, U = [{ line: 1, column: 1 }], F = s, Z = p.peg$maxFailExpected || [], l = p.peg$silentFails | 0, W;
      if (p.startRule) { if (!(p.startRule in A)) throw new Error('Can\'t start parsing from rule "' + p.startRule + '".'); b = A[p.startRule]; }
      function j(r, t) { return { type: "literal", text: r, ignoreCase: t }; }
      function C(r, t, f) { return { type: "class", parts: r, inverted: t, ignoreCase: f }; }
      function ms() { return { type: "any" }; }
      function Es() { return { type: "end" }; }
      function Ze(r) { var t = U[r], f; if (t) return t; if (r >= U.length) f = U.length - 1; else for (f = r; !U[--f];); for (t = U[f], t = { line: t.line, column: t.column }; f < r;) a.charCodeAt(f) === 10 ? (t.line++, t.column = 1) : t.column++, f++; return U[r] = t, t; }
      function He(r, t, f) { var i = Ze(r), o = Ze(t), c = { source: h, start: { offset: r, line: i.line, column: i.column }, end: { offset: t, line: o.line, column: o.column } }; if (f && h && typeof h.offset == "function") { c.start = h.offset(c.start); c.end = h.offset(c.end); } return c; }
      function n(r) { if (s < F) return; if (s > F) { F = s; Z = []; } Z.push(r); }
      function bs(r, t, f) { return new E(E.buildMessage(r, t), r, t, f); }
      function Ye() { var r, t, f; r = s; t = []; f = tr(); if (f === e) f = er(); if (f === e) f = sr(); while (f !== e) { t.push(f); f = tr(); if (f === e) f = er(); if (f === e) f = sr(); } t = xr(t); r = t; return r; }
      function er() { var r, t, f, i; r = s; if (a.charCodeAt(s) === 37) { t = L; s++; } else { t = e; if (l === 0) n(Le); } if (t !== e) { f = []; i = a.charAt(s); if (z.test(i)) { s++; } else { i = e; if (l === 0) n(J); } while (i !== e) { f.push(i); i = a.charAt(s); if (z.test(i)) { s++; } else { i = e; if (l === 0) n(J); } } if (a.charCodeAt(s) === 10) { i = B; s++; } else { i = e; if (l === 0) n(Ne); } if (i === e) i = rr(); if (i !== e) r = kr(); else { s = r; r = e; } } else { s = r; r = e; } return r; }
      function rr() { var r, t; r = s; l++; if (a.length > s) { t = a.charAt(s); s++; } else { t = e; if (l === 0) n(br); } l--; if (t === e) { r = undefined; } else { s = r; r = e; } return r; }
      function sr() { var r, t, f; r = s; t = []; f = a.charAt(s); if (ye.test(f)) { s++; } else { f = e; if (l === 0) n(Te); } if (f !== e) { while (f !== e) { t.push(f); f = a.charAt(s); if (ye.test(f)) { s++; } else { f = e; if (l === 0) n(Te); } } } else t = e; if (t !== e) t = Gr(); r = t; return r; }
      function tr() { var r, t, f, i, o, c, v, $; r = s; g(); if (a.charCodeAt(s) === 64) { t = _; s++; } else { t = e; if (l === 0) n(T); } if (t !== e) { f = re(); if (f !== e) { g(); if (a.charCodeAt(s) === 123) { i = y; s++; } else { i = e; if (l === 0) n(q); } if (i !== e) { g(); o = ee(); if (o === e) o = null; g(); if (a.charCodeAt(s) === 125) { c = d; s++; } else { c = e; if (l === 0) n(K); } if (c !== e) { g(); r = Ur(f, o); } else { s = r; r = e; } } else { s = r; r = e; } } else { s = r; r = e; } } else { s = r; r = e; }
        if (r === e) { r = s; g(); if (a.charCodeAt(s) === 64) { t = _; s++; } else { t = e; if (l === 0) n(T); } if (t !== e) { f = re(); if (f !== e) { g(); if (a.charCodeAt(s) === 40) { i = M; s++; } else { i = e; if (l === 0) n(ae); } if (i !== e) { g(); o = ee(); if (o === e) o = null; g(); if (a.charCodeAt(s) === 41) { c = N; s++; } else { c = e; if (l === 0) n(le); } if (c !== e) { g(); r = Ir(f, o); } else { s = r; r = e; } } else { s = r; r = e; } } else { s = r; r = e; } } else { s = r; r = e; } }
        if (r === e) { r = s; g(); if (a.charCodeAt(s) === 64) { t = _; s++; } else { t = e; if (l === 0) n(T); } if (t !== e) { f = re(); if (f !== e) { g(); if (a.charCodeAt(s) === 123) { i = y; s++; } else { i = e; if (l === 0) n(q); } if (i !== e) { g(); o = ee(); if (o === e) o = null; g(); if (a.charCodeAt(s) === 44) { c = D; s++; } else { c = e; if (l === 0) n(k); } if (c !== e) { g(); v = ir(); g(); if (a.charCodeAt(s) === 125) { $ = d; s++; } else { $ = e; if (l === 0) n(K); } if ($ !== e) { g(); r = Vr(f, o, v); } else { s = r; r = e; } } else { s = r; r = e; } } else { s = r; r = e; } } else { s = r; r = e; } } else { s = r; r = e; } }
        if (r === e) { r = s; g(); if (a.charCodeAt(s) === 64) { t = _; s++; } else { t = e; if (l === 0) n(T); } if (t !== e) { f = re(); if (f !== e) { g(); if (a.charCodeAt(s) === 40) { i = M; s++; } else { i = e; if (l === 0) n(ae); } if (i !== e) { g(); o = ee(); if (o === e) o = null; g(); if (a.charCodeAt(s) === 44) { c = D; s++; } else { c = e; if (l === 0) n(k); } if (c !== e) { g(); v = ir(); g(); if (a.charCodeAt(s) === 41) { $ = N; s++; } else { $ = e; if (l === 0) n(le); } if ($ !== e) { g(); r = Xr(f, o, v); } else { s = r; r = e; } } else { s = r; r = e; } } else { s = r; r = e; } } else { s = r; r = e; } } else { s = r; r = e; } }
        if (r === e) { r = s; g(); if (a.charCodeAt(s) === 64) { t = _; s++; } else { t = e; if (l === 0) n(T); } if (t !== e) { f = fr(); if (f !== e) { g(); i = H(); if (i !== e) { g(); o = ge(); if (o !== e) { g(); if (a.charCodeAt(s) === 61) { c = pe; s++; } else { c = e; if (l === 0) n(Se); } if (c !== e) { g(); v = ce(); if (v !== e) { g(); $ = Y(); if ($ !== e) { g(); r = qr(f, o, v); } else { s = r; r = e; } } else { s = r; r = e; } } else { s = r; r = e; } } else { s = r; r = e; } } else { s = r; r = e; } } else { s = r; r = e; } } else { s = r; r = e; } }
        if (r === e) { r = s; g(); if (a.charCodeAt(s) === 64) { t = _; s++; } else { t = e; if (l === 0) n(T); } if (t !== e) { f = fr(); if (f !== e) { g(); i = H(); if (i !== e) { g(); o = Rs(); g(); c = Y(); if (c !== e) { g(); r = Kr(f, o); } else { s = r; r = e; } } else { s = r; r = e; } } else { s = r; r = e; } } else { s = r; r = e; } }
        if (r === e) { r = s; g(); if (a.charCodeAt(s) === 64) { t = _; s++; } else { t = e; if (l === 0) n(T); } if (t !== e) { f = ws(); if (f !== e) { g(); i = H(); if (i !== e) { g(); o = ce(); if (o !== e) { g(); c = Y(); if (c !== e) { g(); r = Wr(f, o); } else { s = r; r = e; } } else { s = r; r = e; } } else { s = r; r = e; } } else { s = r; r = e; } } else { s = r; r = e; } }
        if (r === e) { r = s; g(); if (a.charCodeAt(s) === 64) { t = _; s++; } else { t = e; if (l === 0) n(T); } if (t !== e) { f = Ms(); if (f !== e) { g(); i = H(); if (i !== e) { g(); o = Os(); if (o !== e) { g(); c = Y(); if (c !== e) { g(); r = Qr(f, o); } else { s = r; r = e; } } else { s = r; r = e; } } else { s = r; r = e; } } else { s = r; r = e; } } else { s = r; r = e; } }
        return r;
      }
      function H() { var r; r = a.charAt(s); if (ur.test(r)) { s++; } else { r = e; if (l === 0) n(wr); } return r; }
      function Y() { var r; r = a.charAt(s); if (gr.test(r)) { s++; } else { r = e; if (l === 0) n(Mr); } return r; }
      function ee() { var r, t, f; r = s; t = []; f = a.charAt(s); if (Ce.test(f)) { s++; } else { f = e; if (l === 0) n(Be); } if (f !== e) { while (f !== e) { t.push(f); f = a.charAt(s); if (Ce.test(f)) { s++; } else { f = e; if (l === 0) n(Be); } } } else t = e; if (t !== e) t = zr(t); r = t; if (r === e) { r = s; t = ""; t = Jr(); r = t; } return r; }
      function re() { var r, t, f; r = s; t = []; f = a.charAt(s); if (me.test(f)) { s++; } else { f = e; if (l === 0) n(De); } if (f !== e) { while (f !== e) { t.push(f); f = a.charAt(s); if (me.test(f)) { s++; } else { f = e; if (l === 0) n(De); } } } else t = e; if (t !== e) t = Zr(t); r = t; return r; }
      function fr() { var r, t, f, i, o, c, v; r = s; t = a.charAt(s); if (pr.test(t)) { s++; } else { t = e; if (l === 0) n(Or); } if (t !== e) { f = a.charAt(s); if (Ee.test(f)) { s++; } else { f = e; if (l === 0) n(xe); } if (f !== e) { i = a.charAt(s); if (be.test(i)) { s++; } else { i = e; if (l === 0) n(ke); } if (i !== e) { o = a.charAt(s); if (hr.test(o)) { s++; } else { o = e; if (l === 0) n(Rr); } if (o !== e) { c = a.charAt(s); if (we.test(c)) { s++; } else { c = e; if (l === 0) n(Ge); } if (c !== e) { v = a.charAt(s); if (vr.test(v)) { s++; } else { v = e; if (l === 0) n(jr); } if (v !== e) r = Hr(); else { s = r; r = e; } } else { s = r; r = e; } } else { s = r; r = e; } } else { s = r; r = e; } } else { s = r; r = e; } } else { s = r; r = e; } return r; }
      function ws() { var r, t, f, i, o, c, v, $, se; r = s; t = a.charAt(s); if ($r.test(t)) { s++; } else { t = e; if (l === 0) n(_r); } if (t !== e) { f = a.charAt(s); if (be.test(f)) { s++; } else { f = e; if (l === 0) n(ke); } if (f !== e) { i = a.charAt(s); if (fe.test(i)) { s++; } else { i = e; if (l === 0) n(ne); } if (i !== e) { o = a.charAt(s); if (dr.test(o)) { s++; } else { o = e; if (l === 0) n(Pr); } if (o !== e) { c = a.charAt(s); if (ie.test(c)) { s++; } else { c = e; if (l === 0) n(oe); } if (c !== e) { v = a.charAt(s); if (Ar.test(v)) { s++; } else { v = e; if (l === 0) n(Fr); } if (v !== e) { $ = a.charAt(s); if (yr.test($)) { s++; } else { $ = e; if (l === 0) n(Lr); } if ($ !== e) { se = a.charAt(s); if (fe.test(se)) { s++; } else { se = e; if (l === 0) n(ne); } if (se !== e) r = Yr(); else { s = r; r = e; } } else { s = r; r = e; } } else { s = r; r = e; } } else { s = r; r = e; } } else { s = r; r = e; } } else { s = r; r = e; } } else { s = r; r = e; } } else { s = r; r = e; } return r; }
      function Ms() { var r, t, f, i, o, c, v, $; r = s; t = a.charAt(s); if (Cr.test(t)) { s++; } else { t = e; if (l === 0) n(Nr); } if (t !== e) { f = a.charAt(s); if (mr.test(f)) { s++; } else { f = e; if (l === 0) n(Tr); } if (f !== e) { i = a.charAt(s); if (ie.test(i)) { s++; } else { i = e; if (l === 0) n(oe); } if (i !== e) { o = a.charAt(s); if (ie.test(o)) { s++; } else { o = e; if (l === 0) n(oe); } if (o !== e) { c = a.charAt(s); if (fe.test(c)) { s++; } else { c = e; if (l === 0) n(ne); } if (c !== e) { v = a.charAt(s); if (we.test(v)) { s++; } else { v = e; if (l === 0) n(Ge); } if (v !== e) { $ = a.charAt(s); if (Ee.test($)) { s++; } else { $ = e; if (l === 0) n(xe); } if ($ !== e) r = es(); else { s = r; r = e; } } else { s = r; r = e; } } else { s = r; r = e; } } else { s = r; r = e; } } else { s = r; r = e; } } else { s = r; r = e; } } else { s = r; r = e; } return r; }
      function Os() { var r, t, f, i; r = s; if (a.charCodeAt(s) === 123) { t = y; s++; } else { t = e; if (l === 0) n(q); } if (t !== e) { f = []; i = a.charAt(s); if (Me.test(i)) { s++; } else { i = e; if (l === 0) n(Ue); } while (i !== e) { f.push(i); i = a.charAt(s); if (Me.test(i)) { s++; } else { i = e; if (l === 0) n(Ue); } } if (a.charCodeAt(s) === 125) { i = d; s++; } else { i = e; if (l === 0) n(K); } if (i !== e) r = rs(f); else { s = r; r = e; } } else { s = r; r = e; }
        if (r === e) { r = s; if (a.charCodeAt(s) === 40) { t = M; s++; } else { t = e; if (l === 0) n(ae); } if (t !== e) { f = []; i = a.charAt(s); if (Oe.test(i)) { s++; } else { i = e; if (l === 0) n(Ie); } while (i !== e) { f.push(i); i = a.charAt(s); if (Oe.test(i)) { s++; } else { i = e; if (l === 0) n(Ie); } } if (a.charCodeAt(s) === 41) { i = N; s++; } else { i = e; if (l === 0) n(le); } if (i !== e) r = ss(f); else { s = r; r = e; } } else { s = r; r = e; } }
        if (r === e) { r = s; t = []; f = a.charAt(s); if (Re.test(f)) { s++; } else { f = e; if (l === 0) n(Ve); } while (f !== e) { t.push(f); f = a.charAt(s); if (Re.test(f)) { s++; } else { f = e; if (l === 0) n(Ve); } } t = ts(t); r = t; } return r; }
      function Rs() { var r, t, f, i, o, c, v, $; r = s; t = I(); if (t === e) t = null; f = []; i = s; o = g(); if (a.charCodeAt(s) === 44) { c = D; s++; } else { c = e; if (l === 0) n(k); } if (c !== e) { v = g(); $ = I(); if ($ === e) $ = null; o = [o, c, v, $]; i = o; } else { s = i; i = e; } while (i !== e) { f.push(i); i = s; o = g(); if (a.charCodeAt(s) === 44) { c = D; s++; } else { c = e; if (l === 0) n(k); } if (c !== e) { v = g(); $ = I(); if ($ === e) $ = null; o = [o, c, v, $]; i = o; } else { s = i; i = e; } } r = fs(t, f); return r; }
      function ir() { var r, t, f, i, o, c, v, $; r = s; t = I(); if (t === e) t = null; f = []; i = s; o = g(); if (a.charCodeAt(s) === 44) { c = D; s++; } else { c = e; if (l === 0) n(k); } if (c !== e) { v = g(); $ = I(); if ($ === e) $ = null; o = [o, c, v, $]; i = o; } else { s = i; i = e; } while (i !== e) { f.push(i); i = s; o = g(); if (a.charCodeAt(s) === 44) { c = D; s++; } else { c = e; if (l === 0) n(k); } if (c !== e) { v = g(); $ = I(); if ($ === e) $ = null; o = [o, c, v, $]; i = o; } else { s = i; i = e; } } r = is(t, f); return r; }
      function I() { var r, t, f, i; r = s; t = ge(); if (t !== e) { g(); if (a.charCodeAt(s) === 61) { f = pe; s++; } else { f = e; if (l === 0) n(Se); } if (f !== e) { g(); i = ce(); if (i !== e) r = as(t, i); else { s = r; r = e; } } else { s = r; r = e; } } else { s = r; r = e; } return r; }
      function ce() { var r, t, f, i, o, c, v, $; r = s; t = ue(); if (t !== e) { f = []; i = s; o = g(); if (a.charCodeAt(s) === 35) { c = he; s++; } else { c = e; if (l === 0) n(Xe); } if (c !== e) { v = g(); $ = ue(); if ($ !== e) { o = [o, c, v, $]; i = o; } else { s = i; i = e; } } else { s = i; i = e; } while (i !== e) { f.push(i); i = s; o = g(); if (a.charCodeAt(s) === 35) { c = he; s++; } else { c = e; if (l === 0) n(Xe); } if (c !== e) { v = g(); $ = ue(); if ($ !== e) { o = [o, c, v, $]; i = o; } else { s = i; i = e; } } else { s = i; i = e; } } r = ls(t, f); } else { s = r; r = e; } return r; }
      function ue() { var r, t; r = js(); if (r === e) r = _s(); if (r === e) r = Ps(); if (r === e) r = Fs(); if (r === e) { r = s; t = ge(); if (t !== e) t = ns(t); r = t; } return r; }
      function js() { var r, t, f, i; r = s; if (a.charCodeAt(s) === 34) { t = ve; s++; } else { t = e; if (l === 0) n(qe); } if (t !== e) { f = []; i = ar(); if (i === e) { i = a.charAt(s); if (je.test(i)) { s++; } else { i = e; if (l === 0) n(Ke); } } while (i !== e) { f.push(i); i = ar(); if (i === e) { i = a.charAt(s); if (je.test(i)) { s++; } else { i = e; if (l === 0) n(Ke); } } } if (a.charCodeAt(s) === 34) { i = ve; s++; } else { i = e; if (l === 0) n(qe); } if (i !== e) r = os(f); else { s = r; r = e; } } else { s = r; r = e; } if (r === e) { r = s; if (a.substr(s, 2) === $e) { t = $e; s += 2; } else { t = e; if (l === 0) n(Sr); } if (t !== e) t = cs(); r = t; } return r; }
      function ar() { var r, t; r = s; if (a.substr(s, 2) === de) { t = de; s += 2; } else { t = e; if (l === 0) n(Br); } if (t !== e) t = us(); r = t; return r; }
      function _s() { var r, t, f, i; r = s; if (a.charCodeAt(s) === 123) { t = y; s++; } else { t = e; if (l === 0) n(q); } if (t !== e) { f = lr(); if (a.charCodeAt(s) === 125) { i = d; s++; } else { i = e; if (l === 0) n(K); } if (i !== e) r = gs(f); else { s = r; r = e; } } else { s = r; r = e; } return r; }
      function lr() { var r, t, f; r = s; t = []; f = nr(); if (f === e) f = or(); while (f !== e) { t.push(f); f = nr(); if (f === e) f = or(); } t = ps(t); r = t; return r; }
      function nr() { var r, t, f, i; r = s; if (a.charCodeAt(s) === 123) { t = y; s++; } else { t = e; if (l === 0) n(q); } if (t !== e) { f = lr(); if (f !== e) { if (a.charCodeAt(s) === 125) { i = d; s++; } else { i = e; if (l === 0) n(K); } if (i !== e) r = hs(f); else { s = r; r = e; } } else { s = r; r = e; } } else { s = r; r = e; } return r; }
      function or() { var r, t; r = s; t = a.charAt(s); if (Er.test(t)) { s++; } else { t = e; if (l === 0) n(Dr); } if (t !== e) t = vs(t); r = t; return r; }
      function Ps() { var r, t, f, i, o, c; r = s; t = []; f = a.charAt(s); if (x.test(f)) { s++; } else { f = e; if (l === 0) n(G); } if (f !== e) { while (f !== e) { t.push(f); f = a.charAt(s); if (x.test(f)) { s++; } else { f = e; if (l === 0) n(G); } } } else t = e; if (t !== e) { f = []; if (a.charCodeAt(s) === 45) { i = Ae; s++; } else { i = e; if (l === 0) n(We); } if (i !== e) { while (i !== e) { f.push(i); if (a.charCodeAt(s) === 45) { i = Ae; s++; } else { i = e; if (l === 0) n(We); } } } else f = e; if (f !== e) { i = []; o = a.charAt(s); if (x.test(o)) { s++; } else { o = e; if (l === 0) n(G); } if (o !== e) { while (o !== e) { i.push(o); o = a.charAt(s); if (x.test(o)) { s++; } else { o = e; if (l === 0) n(G); } } } else i = e; if (i !== e) { o = []; c = a.charAt(s); if (_e.test(c)) { s++; } else { c = e; if (l === 0) n(Qe); } while (c !== e) { o.push(c); c = a.charAt(s); if (_e.test(c)) { s++; } else { c = e; if (l === 0) n(Qe); } } r = $s(t, f, i, o); } else { s = r; r = e; } } else { s = r; r = e; } } else { s = r; r = e; } return r; }
      function Fs() { var r, t, f; r = s; t = []; f = a.charAt(s); if (x.test(f)) { s++; } else { f = e; if (l === 0) n(G); } if (f !== e) { while (f !== e) { t.push(f); f = a.charAt(s); if (x.test(f)) { s++; } else { f = e; if (l === 0) n(G); } } } else t = e; if (t !== e) t = ds(t); r = t; return r; }
      function ge() { var r, t, f; r = s; t = []; f = a.charAt(s); if (Pe.test(f)) { s++; } else { f = e; if (l === 0) n(ze); } if (f !== e) { while (f !== e) { t.push(f); f = a.charAt(s); if (Pe.test(f)) { s++; } else { f = e; if (l === 0) n(ze); } } } else t = e; if (t !== e) t = As(t); r = t; return r; }
      function g() { var r, t, f; r = s; t = []; f = a.charAt(s); if (Fe.test(f)) { s++; } else { f = e; if (l === 0) n(Je); } if (f === e) f = cr(); while (f !== e) { t.push(f); f = a.charAt(s); if (Fe.test(f)) { s++; } else { f = e; if (l === 0) n(Je); } if (f === e) f = cr(); } t = ys(); r = t; return r; }
      function cr() { var r, t, f, i; r = s; if (a.charCodeAt(s) === 37) { t = L; s++; } else { t = e; if (l === 0) n(Le); } if (t !== e) { f = []; i = a.charAt(s); if (z.test(i)) { s++; } else { i = e; if (l === 0) n(J); } while (i !== e) { f.push(i); i = a.charAt(s); if (z.test(i)) { s++; } else { i = e; if (l === 0) n(J); } } if (a.charCodeAt(s) === 10) { i = B; s++; } else { i = e; if (l === 0) n(Ne); } if (i === e) i = rr(); if (i !== e) r = Cs(); else { s = r; r = e; } } else { s = r; r = e; } return r; }
      var S = { COMMENT: "COMMENT", PREAMBLE: "PREAMBLE", MACRODEF: "MACRODEF", REGULAR: "REGULAR" };
      W = b();
      if (p.peg$library) return { peg$result: W, peg$currPos: s, peg$FAILED: e, peg$maxFailExpected: Z, peg$maxFailPos: F };
      if (W !== e && s === a.length) return W;
      if (W !== e && s < a.length) n(Es());
      throw bs(Z, F < a.length ? a.charAt(F) : null, F < a.length ? He(F, F + 1) : He(F, F));
    }
    const u = ["BibFile"]; m.StartRules = u; m.default = w;
  });
  
  var Ss = te(function(P, m) {
    var R = V && V.__importDefault || function(w) { return w && w.__esModule ? w : { default: w }; };
    Object.defineProperty(m, "__esModule", { value: true });
    m.Parser = void 0;
    const E = R(Ts);
    class O {
      constructor() { this.macroTable = {}; }
      defineMacro(u, a, p, e) { e = e || 0; if (!u) throw new Error("Attempt to define macro with empty/null name " + p + ", " + e); this.macroTable[u] = a || ""; return true; }
      lookupMacro(u) { return u ? this.macroTable[u.toLowerCase()] : undefined; }
      clearMacros() { this.macroTable = Object.create(null); }
      deleteMacro(u) { if (!u) return false; var a = u.toLowerCase(); if (this.macroTable[a] === undefined) return false; delete this.macroTable[a]; return true; }
      getMacroNames() { return Object.keys(this.macroTable); }
      macroExists(u) { return this.macroTable[u.toLowerCase()] !== undefined; }
      expandMacrosInValue(u, a, p) { 
        p = p || 0; if (!u) return ""; 
        if (Array.isArray(u) && u[0] === "concat") { var e = u.slice(1).map(function(h) { return this.expandMacrosInValue(h, a, p); }.bind(this)); return e.join(""); } 
        if (Array.isArray(u) && u[0] === "macro") { var e = u[1].toLowerCase(), h = this.macroTable[e]; return h !== undefined ? h : e; } 
        if (typeof u == "string" && /^[a-zA-Z0-9!$&*+\-./:<>?[\]^_`|]+$/.test(u)) { var e = u.toLowerCase(); if (this.macroTable[e] !== undefined) return this.macroTable[e]; } 
        return String(u); 
      }
      parseString(u, a, p) { a = a || "string input"; p = p || 0; const e = (0, E.default)(u, { startRule: "BibFile" }), h = this.processAst(e); if (p & X.EXPAND_MACROS) for (var A = 0; A < h.length; A++) for (var key in h[A].fields) h[A].fields[key] = this.expandMacrosInValue(h[A].fields[key]); return h; }
      processAst(u) { 
        if (!u || !Array.isArray(u)) return []; 
        return u.map(function(a) { 
          if (!a) return null; 
          if (a.metatype === "MACRODEF" && a.fields) { for (var p in a.fields) { var e = a.fields[p]; if (typeof e == "string") this.defineMacro(p, e); else if (Array.isArray(e) && e[0] === "macro") this.defineMacro(p, e[1]); else if (Array.isArray(e) && e[0] === "concat") { var h = this.expandMacrosInValue(e); this.defineMacro(p, h); } } }
          if (a.fields) { var p = {}; for (var e in a.fields) { var h = a.fields[e]; if (typeof h == "string") p[e.toLowerCase()] = h; else if (Array.isArray(h) && h[0] === "concat") { var A = h.slice(1).map(function(b) { if (typeof b == "string") return b; if (b[0] === "macro") return this.lookupMacro(b[1]) || b[1]; return b; }.bind(this)); p[e.toLowerCase()] = A.join(""); } else if (Array.isArray(h) && h[0] === "macro") p[e.toLowerCase()] = this.lookupMacro(h[1]) || h[1]; } a.fields = p; }
          return a; 
        }.bind(this)).filter(function(a) { return a !== null; }); 
      }
      stringifyEntry(u) { 
        if (!u) return ""; var a = ""; 
        switch (u.metatype) { 
          case X.BtMetatype.REGULAR: a = "@" + u.type + "{" + u.key; if (u.fields && Object.keys(u.fields).length > 0) { a += ",\n"; var p = Object.entries(u.fields); p.forEach(function(pair, A) { a += "  " + pair[0] + " = {" + pair[1] + "}"; if (A < p.length - 1) a += ","; a += "\n"; }); } a += "}"; break; 
          case X.BtMetatype.COMMENT: a = "@comment{" + (u.fields && u.fields.content || "") + "}"; break; 
          case X.BtMetatype.PREAMBLE: a = "@preamble{{" + (u.fields && u.fields.content || "") + "}}"; break; 
          case X.BtMetatype.MACRODEF: a = "@string{"; if (u.fields && Object.keys(u.fields).length > 0) { var p = Object.entries(u.fields); p.forEach(function(pair, A) { a += pair[0] + ' = "' + pair[1] + '"'; if (A < p.length - 1) a += ",\n  "; }); } a += "}"; break; 
          default: a = "@" + (u.type || "unknown") + "{" + (u.key || ""); if (u.fields && Object.keys(u.fields).length > 0) { a += ",\n"; var p = Object.entries(u.fields); p.forEach(function(pair, A) { a += "  " + pair[0] + " = {" + pair[1] + "}"; if (A < p.length - 1) a += ","; a += "\n"; }); } a += "}"; 
        } 
        return a; 
      }
      stringifyEntries(u) { if (!u || u.length === 0) return ""; return u.map(function(a) { return this.stringifyEntry(a); }.bind(this)).join("\n\n"); }
    }
    m.Parser = O;
  });
  
  var Q = te(function(P, m) {
    var R = V && V.__createBinding || (Object.create ? function(O, w, u, a) { if (a === undefined) a = u; var p = Object.getOwnPropertyDescriptor(w, u); if (!p || ("get" in p ? !w.__esModule : p.writable || p.configurable)) { p = { enumerable: true, get: function() { return w[u]; } }; } Object.defineProperty(O, a, p); } : function(O, w, u, a) { if (a === undefined) a = u; O[a] = w[u]; });
    var E = V && V.__exportStar || function(O, w) { for (var u in O) if (u !== "default" && !Object.prototype.hasOwnProperty.call(w, u)) R(w, O, u); };
    Object.defineProperty(m, "__esModule", { value: true });
    E(Ss, m);
    E(X, m);
  });
  
  window.bibtexParser = { 
    Parser: Q.Parser, 
    BtMetatype: Q.BtMetatype, 
    EXPAND_MACROS: Q.EXPAND_MACROS, 
    __moduleExports: Q 
  };
})();

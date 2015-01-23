function mdMediaFactory(e, t, n, o) {
    function a(e) {
        var t = d.get(e);
        angular.isUndefined(t) && (t = d.put(e, r(e)));
        var n = s.get(t);
        return angular.isUndefined(n) && (n = i(t)), n
    }
    function r(t) {
        return e.MEDIA[t] || ("(" !== t.charAt(0) ? "(" + t + ")" : t)
    }
    function i(e) {
        return s.put(e, !!o.matchMedia(e).matches)
    }
    function l() {
        var e = s.keys(), t = e.length;
        if (t) {
            for (var o = 0; t > o; o++)
                i(e[o]);
            n.$evalAsync()
        }
    }
    var d = t.cacheFactory("$mdMedia:queries", {capacity: 15}), s = t.cacheFactory("$mdMedia:results", {capacity: 15});
    return angular.element(o).on("resize", l), a
}
!function() {
    angular.module("angularytics", []).provider("Angularytics", function() {
        var e = ["Google"];
        this.setEventHandlers = function(n) {
            angular.isString(n) && (n = [n]), e = [], angular.forEach(n, function(n) {
                e.push(t(n))
            })
        };
        var t = function(e) {
            return e.charAt(0).toUpperCase() + e.substring(1)
        }, n = "$locationChangeSuccess";
        this.setPageChangeEvent = function(e) {
            n = e
        }, this.$get = ["$injector", "$rootScope", "$location", function(t, o, a) {
                var r = [];
                angular.forEach(e, function(e) {
                    r.push(t.get("Angularytics" + e + "Handler"))
                });
                var i = function(e) {
                    angular.forEach(r, function(t) {
                        e(t)
                    })
                }, l = {};
                return l.init = function() {
                }, l.trackEvent = function(e, t, n, o, a) {
                    i(function(r) {
                        e && t && r.trackEvent(e, t, n, o, a)
                    })
                }, l.trackPageView = function(e) {
                    i(function(t) {
                        e && t.trackPageView(e)
                    })
                }, o.$on(n, function() {
                    l.trackPageView(a.url())
                }), l
            }]
    })
}(), function() {
    angular.module("angularytics").factory("AngularyticsConsoleHandler", ["$log", function(e) {
            var t = {};
            return t.trackPageView = function(t) {
                e.log("URL visited", t)
            }, t.trackEvent = function(t, n, o, a, r) {
                e.log("Event tracked", t, n, o, a, r)
            }, t
        }])
}(), function() {
    angular.module("angularytics").factory("AngularyticsGoogleHandler", ["$log", function() {
            var e = {};
            return e.trackPageView = function(e) {
                _gaq.push(["_set", "page", e]), _gaq.push(["_trackPageview", e])
            }, e.trackEvent = function(e, t, n, o, a) {
                _gaq.push(["_trackEvent", e, t, n, o, a])
            }, e
        }]).factory("AngularyticsGoogleUniversalHandler", function() {
        var e = {};
        return e.trackPageView = function(e) {
            ga("set", "page", e), ga("send", "pageview", e)
        }, e.trackEvent = function(e, t, n, o, a) {
            ga("send", "event", e, t, n, o, {nonInteraction: a})
        }, e
    })
}(), function() {
    angular.module("angularytics").filter("trackEvent", ["Angularytics", function(e) {
            return function(t, n, o, a, r, i) {
                return e.trackEvent(n, o, a, r, i), t
            }
        }])
}(), function(e, t, n, o) {
    "use strict";
    function a(e, t, n) {
        return setTimeout(c(e, n), t)
    }
    function r(e, t, n) {
        return Array.isArray(e) ? (i(e, n[t], n), !0) : !1
    }
    function i(e, t, n) {
        var a;
        if (e)
            if (e.forEach)
                e.forEach(t, n);
            else if (e.length !== o)
                for (a = 0; a < e.length; )
                    t.call(n, e[a], a, e), a++;
            else
                for (a in e)
                    e.hasOwnProperty(a) && t.call(n, e[a], a, e)
    }
    function l(e, t, n) {
        for (var a = Object.keys(t), r = 0; r < a.length; )
            (!n || n && e[a[r]] === o) && (e[a[r]] = t[a[r]]), r++;
        return e
    }
    function d(e, t) {
        return l(e, t, !0)
    }
    function s(e, t, n) {
        var o, a = t.prototype;
        o = e.prototype = Object.create(a), o.constructor = e, o._super = a, n && l(o, n)
    }
    function c(e, t) {
        return function() {
            return e.apply(t, arguments)
        }
    }
    function m(e, t) {
        return typeof e == ct ? e.apply(t ? t[0] || o : o, t) : e
    }
    function u(e, t) {
        return e === o ? t : e
    }
    function p(e, t, n) {
        i(b(t), function(t) {
            e.addEventListener(t, n, !1)
        })
    }
    function h(e, t, n) {
        i(b(t), function(t) {
            e.removeEventListener(t, n, !1)
        })
    }
    function f(e, t) {
        for (; e; ) {
            if (e == t)
                return !0;
            e = e.parentNode
        }
        return !1
    }
    function g(e, t) {
        return e.indexOf(t) > -1
    }
    function b(e) {
        return e.trim().split(/\s+/g)
    }
    function v(e, t, n) {
        if (e.indexOf && !n)
            return e.indexOf(t);
        for (var o = 0; o < e.length; ) {
            if (n && e[o][n] == t || !n && e[o] === t)
                return o;
            o++
        }
        return -1
    }
    function E(e) {
        return Array.prototype.slice.call(e, 0)
    }
    function y(e, t, n) {
        for (var o = [], a = [], r = 0; r < e.length; ) {
            var i = t ? e[r][t] : e[r];
            v(a, i) < 0 && o.push(e[r]), a[r] = i, r++
        }
        return n && (o = t ? o.sort(function(e, n) {
            return e[t] > n[t]
        }) : o.sort()), o
    }
    function T(e, t) {
        for (var n, a, r = t[0].toUpperCase() + t.slice(1), i = 0; i < dt.length; ) {
            if (n = dt[i], a = n ? n + r : t, a in e)
                return a;
            i++
        }
        return o
    }
    function $() {
        return ht++
    }
    function M(e) {
        var t = e.ownerDocument;
        return t.defaultView || t.parentWindow
    }
    function x(e, t) {
        var n = this;
        this.manager = e, this.callback = t, this.element = e.element, this.target = e.options.inputTarget, this.domHandler = function(t) {
            m(e.options.enable, [e]) && n.handler(t)
        }, this.init()
    }
    function A(e) {
        var t, n = e.options.inputClass;
        return t = n ? n : bt ? O : vt ? F : gt ? z : R, new t(e, w)
    }
    function w(e, t, n) {
        var o = n.pointers.length, a = n.changedPointers.length, r = t & xt && o - a === 0, i = t & (wt | Ct) && o - a === 0;
        n.isFirst = !!r, n.isFinal = !!i, r && (e.session = {}), n.eventType = t, C(e, n), e.emit("hammer.input", n), e.recognize(n), e.session.prevInput = n
    }
    function C(e, t) {
        var n = e.session, o = t.pointers, a = o.length;
        n.firstInput || (n.firstInput = N(t)), a > 1 && !n.firstMultiple ? n.firstMultiple = N(t) : 1 === a && (n.firstMultiple = !1);
        var r = n.firstInput, i = n.firstMultiple, l = i ? i.center : r.center, d = t.center = _(o);
        t.timeStamp = pt(), t.deltaTime = t.timeStamp - r.timeStamp, t.angle = I(l, d), t.distance = P(l, d), k(n, t), t.offsetDirection = D(t.deltaX, t.deltaY), t.scale = i ? B(i.pointers, o) : 1, t.rotation = i ? j(i.pointers, o) : 0, S(n, t);
        var s = e.element;
        f(t.srcEvent.target, s) && (s = t.srcEvent.target), t.target = s
    }
    function k(e, t) {
        var n = t.center, o = e.offsetDelta || {}, a = e.prevDelta || {}, r = e.prevInput || {};
        (t.eventType === xt || r.eventType === wt) && (a = e.prevDelta = {x: r.deltaX || 0,y: r.deltaY || 0}, o = e.offsetDelta = {x: n.x,y: n.y}), t.deltaX = a.x + (n.x - o.x), t.deltaY = a.y + (n.y - o.y)
    }
    function S(e, t) {
        var n, a, r, i, l = e.lastInterval || t, d = t.timeStamp - l.timeStamp;
        if (t.eventType != Ct && (d > Mt || l.velocity === o)) {
            var s = l.deltaX - t.deltaX, c = l.deltaY - t.deltaY, m = H(d, s, c);
            a = m.x, r = m.y, n = ut(m.x) > ut(m.y) ? m.x : m.y, i = D(s, c), e.lastInterval = t
        } else
            n = l.velocity, a = l.velocityX, r = l.velocityY, i = l.direction;
        t.velocity = n, t.velocityX = a, t.velocityY = r, t.direction = i
    }
    function N(e) {
        for (var t = [], n = 0; n < e.pointers.length; )
            t[n] = {clientX: mt(e.pointers[n].clientX),clientY: mt(e.pointers[n].clientY)}, n++;
        return {timeStamp: pt(),pointers: t,center: _(t),deltaX: e.deltaX,deltaY: e.deltaY}
    }
    function _(e) {
        var t = e.length;
        if (1 === t)
            return {x: mt(e[0].clientX),y: mt(e[0].clientY)};
        for (var n = 0, o = 0, a = 0; t > a; )
            n += e[a].clientX, o += e[a].clientY, a++;
        return {x: mt(n / t),y: mt(o / t)}
    }
    function H(e, t, n) {
        return {x: t / e || 0,y: n / e || 0}
    }
    function D(e, t) {
        return e === t ? kt : ut(e) >= ut(t) ? e > 0 ? St : Nt : t > 0 ? _t : Ht
    }
    function P(e, t, n) {
        n || (n = jt);
        var o = t[n[0]] - e[n[0]], a = t[n[1]] - e[n[1]];
        return Math.sqrt(o * o + a * a)
    }
    function I(e, t, n) {
        n || (n = jt);
        var o = t[n[0]] - e[n[0]], a = t[n[1]] - e[n[1]];
        return 180 * Math.atan2(a, o) / Math.PI
    }
    function j(e, t) {
        return I(t[1], t[0], Bt) - I(e[1], e[0], Bt)
    }
    function B(e, t) {
        return P(t[0], t[1], Bt) / P(e[0], e[1], Bt)
    }
    function R() {
        this.evEl = Ot, this.evWin = Ut, this.allow = !0, this.pressed = !1, x.apply(this, arguments)
    }
    function O() {
        this.evEl = qt, this.evWin = zt, x.apply(this, arguments), this.store = this.manager.session.pointerEvents = []
    }
    function U() {
        this.evTarget = Wt, this.evWin = Yt, this.started = !1, x.apply(this, arguments)
    }
    function L(e, t) {
        var n = E(e.touches), o = E(e.changedTouches);
        return t & (wt | Ct) && (n = y(n.concat(o), "identifier", !0)), [n, o]
    }
    function F() {
        this.evTarget = Kt, this.targetIds = {}, x.apply(this, arguments)
    }
    function q(e, t) {
        var n = E(e.touches), o = this.targetIds;
        if (t & (xt | At) && 1 === n.length)
            return o[n[0].identifier] = !0, [n, n];
        var a, r, i = E(e.changedTouches), l = [], d = this.target;
        if (r = n.filter(function(e) {
            return f(e.target, d)
        }), t === xt)
            for (a = 0; a < r.length; )
                o[r[a].identifier] = !0, a++;
        for (a = 0; a < i.length; )
            o[i[a].identifier] && l.push(i[a]), t & (wt | Ct) && delete o[i[a].identifier], a++;
        return l.length ? [y(r.concat(l), "identifier", !0), l] : void 0
    }
    function z() {
        x.apply(this, arguments);
        var e = c(this.handler, this);
        this.touch = new F(this.manager, e), this.mouse = new R(this.manager, e)
    }
    function V(e, t) {
        this.manager = e, this.set(t)
    }
    function W(e) {
        if (g(e, tn))
            return tn;
        var t = g(e, nn), n = g(e, on);
        return t && n ? nn + " " + on : t || n ? t ? nn : on : g(e, en) ? en : Jt
    }
    function Y(e) {
        this.id = $(), this.manager = null, this.options = d(e || {}, this.defaults), this.options.enable = u(this.options.enable, !0), this.state = an, this.simultaneous = {}, this.requireFail = []
    }
    function G(e) {
        return e & cn ? "cancel" : e & dn ? "end" : e & ln ? "move" : e & rn ? "start" : ""
    }
    function K(e) {
        return e == Ht ? "down" : e == _t ? "up" : e == St ? "left" : e == Nt ? "right" : ""
    }
    function X(e, t) {
        var n = t.manager;
        return n ? n.get(e) : e
    }
    function Z() {
        Y.apply(this, arguments)
    }
    function Q() {
        Z.apply(this, arguments), this.pX = null, this.pY = null
    }
    function J() {
        Z.apply(this, arguments)
    }
    function et() {
        Y.apply(this, arguments), this._timer = null, this._input = null
    }
    function tt() {
        Z.apply(this, arguments)
    }
    function nt() {
        Z.apply(this, arguments)
    }
    function ot() {
        Y.apply(this, arguments), this.pTime = !1, this.pCenter = !1, this._timer = null, this._input = null, this.count = 0
    }
    function at(e, t) {
        return t = t || {}, t.recognizers = u(t.recognizers, at.defaults.preset), new rt(e, t)
    }
    function rt(e, t) {
        t = t || {}, this.options = d(t, at.defaults), this.options.inputTarget = this.options.inputTarget || e, this.handlers = {}, this.session = {}, this.recognizers = [], this.element = e, this.input = A(this), this.touchAction = new V(this, this.options.touchAction), it(this, !0), i(t.recognizers, function(e) {
            var t = this.add(new e[0](e[1]));
            e[2] && t.recognizeWith(e[2]), e[3] && t.requireFailure(e[3])
        }, this)
    }
    function it(e, t) {
        var n = e.element;
        i(e.options.cssProps, function(e, o) {
            n.style[T(n.style, o)] = t ? e : ""
        })
    }
    function lt(e, n) {
        var o = t.createEvent("Event");
        o.initEvent(e, !0, !0), o.gesture = n, n.target.dispatchEvent(o)
    }
    var dt = ["", "webkit", "moz", "MS", "ms", "o"], st = t.createElement("div"), ct = "function", mt = Math.round, ut = Math.abs, pt = Date.now, ht = 1, ft = /mobile|tablet|ip(ad|hone|od)|android/i, gt = "ontouchstart" in e, bt = T(e, "PointerEvent") !== o, vt = gt && ft.test(navigator.userAgent), Et = "touch", yt = "pen", Tt = "mouse", $t = "kinect", Mt = 25, xt = 1, At = 2, wt = 4, Ct = 8, kt = 1, St = 2, Nt = 4, _t = 8, Ht = 16, Dt = St | Nt, Pt = _t | Ht, It = Dt | Pt, jt = ["x", "y"], Bt = ["clientX", "clientY"];
    x.prototype = {handler: function() {
        },init: function() {
            this.evEl && p(this.element, this.evEl, this.domHandler), this.evTarget && p(this.target, this.evTarget, this.domHandler), this.evWin && p(M(this.element), this.evWin, this.domHandler)
        },destroy: function() {
            this.evEl && h(this.element, this.evEl, this.domHandler), this.evTarget && h(this.target, this.evTarget, this.domHandler), this.evWin && h(M(this.element), this.evWin, this.domHandler)
        }};
    var Rt = {mousedown: xt,mousemove: At,mouseup: wt}, Ot = "mousedown", Ut = "mousemove mouseup";
    s(R, x, {handler: function(e) {
            var t = Rt[e.type];
            t & xt && 0 === e.button && (this.pressed = !0), t & At && 1 !== e.which && (t = wt), this.pressed && this.allow && (t & wt && (this.pressed = !1), this.callback(this.manager, t, {pointers: [e],changedPointers: [e],pointerType: Tt,srcEvent: e}))
        }});
    var Lt = {pointerdown: xt,pointermove: At,pointerup: wt,pointercancel: Ct,pointerout: Ct}, Ft = {2: Et,3: yt,4: Tt,5: $t}, qt = "pointerdown", zt = "pointermove pointerup pointercancel";
    e.MSPointerEvent && (qt = "MSPointerDown", zt = "MSPointerMove MSPointerUp MSPointerCancel"), s(O, x, {handler: function(e) {
            var t = this.store, n = !1, o = e.type.toLowerCase().replace("ms", ""), a = Lt[o], r = Ft[e.pointerType] || e.pointerType, i = r == Et, l = v(t, e.pointerId, "pointerId");
            a & xt && (0 === e.button || i) ? 0 > l && (t.push(e), l = t.length - 1) : a & (wt | Ct) && (n = !0), 0 > l || (t[l] = e, this.callback(this.manager, a, {pointers: t,changedPointers: [e],pointerType: r,srcEvent: e}), n && t.splice(l, 1))
        }});
    var Vt = {touchstart: xt,touchmove: At,touchend: wt,touchcancel: Ct}, Wt = "touchstart", Yt = "touchstart touchmove touchend touchcancel";
    s(U, x, {handler: function(e) {
            var t = Vt[e.type];
            if (t === xt && (this.started = !0), this.started) {
                var n = L.call(this, e, t);
                t & (wt | Ct) && n[0].length - n[1].length === 0 && (this.started = !1), this.callback(this.manager, t, {pointers: n[0],changedPointers: n[1],pointerType: Et,srcEvent: e})
            }
        }});
    var Gt = {touchstart: xt,touchmove: At,touchend: wt,touchcancel: Ct}, Kt = "touchstart touchmove touchend touchcancel";
    s(F, x, {handler: function(e) {
            var t = Gt[e.type], n = q.call(this, e, t);
            n && this.callback(this.manager, t, {pointers: n[0],changedPointers: n[1],pointerType: Et,srcEvent: e})
        }}), s(z, x, {handler: function(e, t, n) {
            var o = n.pointerType == Et, a = n.pointerType == Tt;
            if (o)
                this.mouse.allow = !1;
            else if (a && !this.mouse.allow)
                return;
            t & (wt | Ct) && (this.mouse.allow = !0), this.callback(e, t, n)
        },destroy: function() {
            this.touch.destroy(), this.mouse.destroy()
        }});
    var Xt = T(st.style, "touchAction"), Zt = Xt !== o, Qt = "compute", Jt = "auto", en = "manipulation", tn = "none", nn = "pan-x", on = "pan-y";
    V.prototype = {set: function(e) {
            e == Qt && (e = this.compute()), Zt && (this.manager.element.style[Xt] = e), this.actions = e.toLowerCase().trim()
        },update: function() {
            this.set(this.manager.options.touchAction)
        },compute: function() {
            var e = [];
            return i(this.manager.recognizers, function(t) {
                m(t.options.enable, [t]) && (e = e.concat(t.getTouchAction()))
            }), W(e.join(" "))
        },preventDefaults: function(e) {
            if (!Zt) {
                var t = e.srcEvent, n = e.offsetDirection;
                if (this.manager.session.prevented)
                    return t.preventDefault(), void 0;
                var o = this.actions, a = g(o, tn), r = g(o, on), i = g(o, nn);
                return a || r && n & Dt || i && n & Pt ? this.preventSrc(t) : void 0
            }
        },preventSrc: function(e) {
            this.manager.session.prevented = !0, e.preventDefault()
        }};
    var an = 1, rn = 2, ln = 4, dn = 8, sn = dn, cn = 16, mn = 32;
    Y.prototype = {defaults: {},set: function(e) {
            return l(this.options, e), this.manager && this.manager.touchAction.update(), this
        },recognizeWith: function(e) {
            if (r(e, "recognizeWith", this))
                return this;
            var t = this.simultaneous;
            return e = X(e, this), t[e.id] || (t[e.id] = e, e.recognizeWith(this)), this
        },dropRecognizeWith: function(e) {
            return r(e, "dropRecognizeWith", this) ? this : (e = X(e, this), delete this.simultaneous[e.id], this)
        },requireFailure: function(e) {
            if (r(e, "requireFailure", this))
                return this;
            var t = this.requireFail;
            return e = X(e, this), -1 === v(t, e) && (t.push(e), e.requireFailure(this)), this
        },dropRequireFailure: function(e) {
            if (r(e, "dropRequireFailure", this))
                return this;
            e = X(e, this);
            var t = v(this.requireFail, e);
            return t > -1 && this.requireFail.splice(t, 1), this
        },hasRequireFailures: function() {
            return this.requireFail.length > 0
        },canRecognizeWith: function(e) {
            return !!this.simultaneous[e.id]
        },emit: function(e) {
            function t(t) {
                n.manager.emit(n.options.event + (t ? G(o) : ""), e)
            }
            var n = this, o = this.state;
            dn > o && t(!0), t(), o >= dn && t(!0)
        },tryEmit: function(e) {
            return this.canEmit() ? this.emit(e) : (this.state = mn, void 0)
        },canEmit: function() {
            for (var e = 0; e < this.requireFail.length; ) {
                if (!(this.requireFail[e].state & (mn | an)))
                    return !1;
                e++
            }
            return !0
        },recognize: function(e) {
            var t = l({}, e);
            return m(this.options.enable, [this, t]) ? (this.state & (sn | cn | mn) && (this.state = an), this.state = this.process(t), this.state & (rn | ln | dn | cn) && this.tryEmit(t), void 0) : (this.reset(), this.state = mn, void 0)
        },process: function() {
        },getTouchAction: function() {
        },reset: function() {
        }}, s(Z, Y, {defaults: {pointers: 1},attrTest: function(e) {
            var t = this.options.pointers;
            return 0 === t || e.pointers.length === t
        },process: function(e) {
            var t = this.state, n = e.eventType, o = t & (rn | ln), a = this.attrTest(e);
            return o && (n & Ct || !a) ? t | cn : o || a ? n & wt ? t | dn : t & rn ? t | ln : rn : mn
        }}), s(Q, Z, {defaults: {event: "pan",threshold: 10,pointers: 1,direction: It},getTouchAction: function() {
            var e = this.options.direction, t = [];
            return e & Dt && t.push(on), e & Pt && t.push(nn), t
        },directionTest: function(e) {
            var t = this.options, n = !0, o = e.distance, a = e.direction, r = e.deltaX, i = e.deltaY;
            return a & t.direction || (t.direction & Dt ? (a = 0 === r ? kt : 0 > r ? St : Nt, n = r != this.pX, o = Math.abs(e.deltaX)) : (a = 0 === i ? kt : 0 > i ? _t : Ht, n = i != this.pY, o = Math.abs(e.deltaY))), e.direction = a, n && o > t.threshold && a & t.direction
        },attrTest: function(e) {
            return Z.prototype.attrTest.call(this, e) && (this.state & rn || !(this.state & rn) && this.directionTest(e))
        },emit: function(e) {
            this.pX = e.deltaX, this.pY = e.deltaY;
            var t = K(e.direction);
            t && this.manager.emit(this.options.event + t, e), this._super.emit.call(this, e)
        }}), s(J, Z, {defaults: {event: "pinch",threshold: 0,pointers: 2},getTouchAction: function() {
            return [tn]
        },attrTest: function(e) {
            return this._super.attrTest.call(this, e) && (Math.abs(e.scale - 1) > this.options.threshold || this.state & rn)
        },emit: function(e) {
            if (this._super.emit.call(this, e), 1 !== e.scale) {
                var t = e.scale < 1 ? "in" : "out";
                this.manager.emit(this.options.event + t, e)
            }
        }}), s(et, Y, {defaults: {event: "press",pointers: 1,time: 500,threshold: 5},getTouchAction: function() {
            return [Jt]
        },process: function(e) {
            var t = this.options, n = e.pointers.length === t.pointers, o = e.distance < t.threshold, r = e.deltaTime > t.time;
            if (this._input = e, !o || !n || e.eventType & (wt | Ct) && !r)
                this.reset();
            else if (e.eventType & xt)
                this.reset(), this._timer = a(function() {
                    this.state = sn, this.tryEmit()
                }, t.time, this);
            else if (e.eventType & wt)
                return sn;
            return mn
        },reset: function() {
            clearTimeout(this._timer)
        },emit: function(e) {
            this.state === sn && (e && e.eventType & wt ? this.manager.emit(this.options.event + "up", e) : (this._input.timeStamp = pt(), this.manager.emit(this.options.event, this._input)))
        }}), s(tt, Z, {defaults: {event: "rotate",threshold: 0,pointers: 2},getTouchAction: function() {
            return [tn]
        },attrTest: function(e) {
            return this._super.attrTest.call(this, e) && (Math.abs(e.rotation) > this.options.threshold || this.state & rn)
        }}), s(nt, Z, {defaults: {event: "swipe",threshold: 10,velocity: .65,direction: Dt | Pt,pointers: 1},getTouchAction: function() {
            return Q.prototype.getTouchAction.call(this)
        },attrTest: function(e) {
            var t, n = this.options.direction;
            return n & (Dt | Pt) ? t = e.velocity : n & Dt ? t = e.velocityX : n & Pt && (t = e.velocityY), this._super.attrTest.call(this, e) && n & e.direction && e.distance > this.options.threshold && ut(t) > this.options.velocity && e.eventType & wt
        },emit: function(e) {
            var t = K(e.direction);
            t && this.manager.emit(this.options.event + t, e), this.manager.emit(this.options.event, e)
        }}), s(ot, Y, {defaults: {event: "tap",pointers: 1,taps: 1,interval: 300,time: 250,threshold: 2,posThreshold: 10},getTouchAction: function() {
            return [en]
        },process: function(e) {
            var t = this.options, n = e.pointers.length === t.pointers, o = e.distance < t.threshold, r = e.deltaTime < t.time;
            if (this.reset(), e.eventType & xt && 0 === this.count)
                return this.failTimeout();
            if (o && r && n) {
                if (e.eventType != wt)
                    return this.failTimeout();
                var i = this.pTime ? e.timeStamp - this.pTime < t.interval : !0, l = !this.pCenter || P(this.pCenter, e.center) < t.posThreshold;
                this.pTime = e.timeStamp, this.pCenter = e.center, l && i ? this.count += 1 : this.count = 1, this._input = e;
                var d = this.count % t.taps;
                if (0 === d)
                    return this.hasRequireFailures() ? (this._timer = a(function() {
                        this.state = sn, this.tryEmit()
                    }, t.interval, this), rn) : sn
            }
            return mn
        },failTimeout: function() {
            return this._timer = a(function() {
                this.state = mn
            }, this.options.interval, this), mn
        },reset: function() {
            clearTimeout(this._timer)
        },emit: function() {
            this.state == sn && (this._input.tapCount = this.count, this.manager.emit(this.options.event, this._input))
        }}), at.VERSION = "2.0.4", at.defaults = {domEvents: !1,touchAction: Qt,enable: !0,inputTarget: null,inputClass: null,preset: [[tt, {enable: !1}], [J, {enable: !1}, ["rotate"]], [nt, {direction: Dt}], [Q, {direction: Dt}, ["swipe"]], [ot], [ot, {event: "doubletap",taps: 2}, ["tap"]], [et]],cssProps: {userSelect: "none",touchSelect: "none",touchCallout: "none",contentZooming: "none",userDrag: "none",tapHighlightColor: "rgba(0,0,0,0)"}};
    var un = 1, pn = 2;
    rt.prototype = {set: function(e) {
            return l(this.options, e), e.touchAction && this.touchAction.update(), e.inputTarget && (this.input.destroy(), this.input.target = e.inputTarget, this.input.init()), this
        },stop: function(e) {
            this.session.stopped = e ? pn : un
        },recognize: function(e) {
            var t = this.session;
            if (!t.stopped) {
                this.touchAction.preventDefaults(e);
                var n, o = this.recognizers, a = t.curRecognizer;
                (!a || a && a.state & sn) && (a = t.curRecognizer = null);
                for (var r = 0; r < o.length; )
                    n = o[r], t.stopped === pn || a && n != a && !n.canRecognizeWith(a) ? n.reset() : n.recognize(e), !a && n.state & (rn | ln | dn) && (a = t.curRecognizer = n), r++
            }
        },get: function(e) {
            if (e instanceof Y)
                return e;
            for (var t = this.recognizers, n = 0; n < t.length; n++)
                if (t[n].options.event == e)
                    return t[n];
            return null
        },add: function(e) {
            if (r(e, "add", this))
                return this;
            var t = this.get(e.options.event);
            return t && this.remove(t), this.recognizers.push(e), e.manager = this, this.touchAction.update(), e
        },remove: function(e) {
            if (r(e, "remove", this))
                return this;
            var t = this.recognizers;
            return e = this.get(e), t.splice(v(t, e), 1), this.touchAction.update(), this
        },on: function(e, t) {
            var n = this.handlers;
            return i(b(e), function(e) {
                n[e] = n[e] || [], n[e].push(t)
            }), this
        },off: function(e, t) {
            var n = this.handlers;
            return i(b(e), function(e) {
                t ? n[e].splice(v(n[e], t), 1) : delete n[e]
            }), this
        },emit: function(e, t) {
            this.options.domEvents && lt(e, t);
            var n = this.handlers[e] && this.handlers[e].slice();
            if (n && n.length) {
                t.type = e, t.preventDefault = function() {
                    t.srcEvent.preventDefault()
                };
                for (var o = 0; o < n.length; )
                    n[o](t), o++
            }
        },destroy: function() {
            this.element && it(this, !1), this.handlers = {}, this.session = {}, this.input.destroy(), this.element = null
        }}, l(at, {INPUT_START: xt,INPUT_MOVE: At,INPUT_END: wt,INPUT_CANCEL: Ct,STATE_POSSIBLE: an,STATE_BEGAN: rn,STATE_CHANGED: ln,STATE_ENDED: dn,STATE_RECOGNIZED: sn,STATE_CANCELLED: cn,STATE_FAILED: mn,DIRECTION_NONE: kt,DIRECTION_LEFT: St,DIRECTION_RIGHT: Nt,DIRECTION_UP: _t,DIRECTION_DOWN: Ht,DIRECTION_HORIZONTAL: Dt,DIRECTION_VERTICAL: Pt,DIRECTION_ALL: It,Manager: rt,Input: x,TouchAction: V,TouchInput: F,MouseInput: R,PointerEventInput: O,TouchMouseInput: z,SingleTouchInput: U,Recognizer: Y,AttrRecognizer: Z,Tap: ot,Pan: Q,Swipe: nt,Pinch: J,Rotate: tt,Press: et,on: p,off: h,each: i,merge: d,extend: l,inherit: s,bindFn: c,prefixed: T}), typeof define == ct && define.amd ? define(function() {
        return at
    }) : "undefined" != typeof module && module.exports ? module.exports = at : e[n] = at
}(window, document, "Hammer"), angular.module("ngMaterial", ["ng", "ngAnimate", "ngAria", "material.core", "material.core.theming.palette", "material.core.theming", "material.components.backdrop", "material.components.bottomSheet", "material.components.button", "material.components.card", "material.components.checkbox", "material.components.content", "material.components.dialog", "material.components.divider", "material.components.icon", "material.components.input", "material.components.list", "material.components.progressCircular", "material.components.progressLinear", "material.components.radioButton", "material.components.sidenav", "material.components.slider", "material.components.sticky", "material.components.subheader", "material.components.swipe", "material.components.switch", "material.components.tabs", "material.components.textField", "material.components.toast", "material.components.toolbar", "material.components.tooltip", "material.components.whiteframe"]), function() {
    "use strict";
    function e() {
        if ("undefined" == typeof Hammer)
            throw new Error("ngMaterial requires HammerJS to be preloaded.");
        Hammer.defaults.cssProps.userSelect = ""
    }
    function t(e, t) {
        function n(e) {
            return e.debounce = function(t) {
                var n, o, a, r;
                return function() {
                    n = arguments, r = this, a = t, o || (o = !0, e(function() {
                        a.apply(r, n), o = !1
                    }))
                }
            }, e
        }
        e.decorator("$$rAF", ["$delegate", "$rootScope", n]), t.theme("default").primaryPalette("indigo").accentPalette("pink").warnPalette("red").backgroundPalette("grey")
    }
    angular.module("material.core", ["material.core.theming"]).run(e).config(t), t.$inject = ["$provide", "$mdThemingProvider"]
}(), function() {
    "use strict";
    function e(e, t) {
        function n(e) {
            return o ? "webkit" + e.charAt(0).toUpperCase() + e.substring(1) : e
        }
        var o = /webkit/i.test(t.vendorPrefix);
        return {KEY_CODE: {ENTER: 13,ESCAPE: 27,SPACE: 32,LEFT_ARROW: 37,UP_ARROW: 38,RIGHT_ARROW: 39,DOWN_ARROW: 40},CSS: {TRANSITIONEND: "transitionend" + (o ? " webkitTransitionEnd" : ""),ANIMATIONEND: "animationend" + (o ? " webkitAnimationEnd" : ""),TRANSFORM: n("transform"),TRANSITION: n("transition"),TRANSITION_DURATION: n("transitionDuration"),ANIMATION_PLAY_STATE: n("animationPlayState"),ANIMATION_DURATION: n("animationDuration"),ANIMATION_NAME: n("animationName"),ANIMATION_TIMING: n("animationTimingFunction"),ANIMATION_DIRECTION: n("animationDirection")},MEDIA: {sm: "(max-width: 600px)","gt-sm": "(min-width: 600px)",md: "(min-width: 600px) and (max-width: 960px)","gt-md": "(min-width: 960px)",lg: "(min-width: 960px) and (max-width: 1200px)","gt-lg": "(min-width: 1200px)"}}
    }
    angular.module("material.core").factory("$mdConstant", e), e.$inject = ["$$rAF", "$sniffer"]
}(), function() {
    function e(e, t) {
        function n() {
            return [].concat(b)
        }
        function o() {
            return b.length
        }
        function a(e) {
            return b.length && e > -1 && e < b.length
        }
        function r(e) {
            return e ? a(m(e) + 1) : !1
        }
        function i(e) {
            return e ? a(m(e) - 1) : !1
        }
        function l(e) {
            return a(e) ? b[e] : null
        }
        function d(e, t) {
            return b.filter(function(n) {
                return n[e] === t
            })
        }
        function s(e, t) {
            return e ? (angular.isNumber(t) || (t = b.length), b.splice(t, 0, e), m(e)) : -1
        }
        function c(e) {
            u(e) && b.splice(m(e), 1)
        }
        function m(e) {
            return b.indexOf(e)
        }
        function u(e) {
            return e && m(e) > -1
        }
        function p() {
            return b.length ? b[0] : null
        }
        function h() {
            return b.length ? b[b.length - 1] : null
        }
        function f(e, n, o, r) {
            o = o || g;
            var i = m(n);
            if (!a(i))
                return null;
            var l = i + (e ? -1 : 1), d = null;
            return a(l) ? d = b[l] : t && (d = e ? h() : p(), l = m(d)), null === d || l === r ? null : (angular.isUndefined(r) && (r = l), o(d) ? d : f(e, d, o, r))
        }
        var g = function() {
            return !0
        };
        t = !!t;
        var b = e || [];
        return {items: n,count: o,inRange: a,contains: u,indexOf: m,itemAt: l,findBy: d,add: s,remove: c,first: p,last: h,next: angular.bind(null, f, !1),previous: angular.bind(null, f, !0),hasPrevious: i,hasNext: r}
    }
    angular.module("material.core").config(["$provide", function(t) {
            t.decorator("$mdUtil", ["$delegate", function(t) {
                    return t.iterator = e, t
                }])
        }])
}(), angular.module("material.core").factory("$mdMedia", mdMediaFactory), mdMediaFactory.$inject = ["$mdConstant", "$mdUtil", "$rootScope", "$window"], function() {
    "use strict";
    var e = ["0", "0", "0"];
    angular.module("material.core").factory("$mdUtil", ["$cacheFactory", "$document", "$timeout", function(t, n, o) {
            function a(e, t) {
                function o() {
                    o.called || (o.called = !0, t.off(h, a), n.off(f, r).off(g, l), m = p = !1)
                }
                function a(e) {
                    var n = e.type.charAt(0), o = i.now();
                    u && u.pointerType !== n && o - u.endTime < 400 || p || (p = !0, m = {pointerType: n,startX: s(e),startTime: o}, t.one("$md.dragstart", function(e) {
                        e.defaultPrevented && (m = null)
                    }), t.triggerHandler("$md.dragstart", m))
                }
                function r(e) {
                    m && c(e, m) && (("t" === m.pointerType || "p" === m.pointerType) && e.preventDefault(), d(e), t.triggerHandler("$md.drag", m))
                }
                function l(e) {
                    p = !1, m && c(e, m) && (m.endTime = i.now(), d(e), t.triggerHandler("$md.dragend", m), u = m, m = null)
                }
                function d(e) {
                    var t = s(e);
                    m.distance = m.startX - t, m.direction = m.distance > 0 ? "left" : m.distance < 0 ? "right" : "", m.duration = m.startTime - i.now(), m.velocity = Math.abs(m.duration) / m.time
                }
                function s(e) {
                    e = e.originalEvent || e;
                    var t = e.touches && e.touches[0] || e.changedTouches && e.changedTouches[0] || e;
                    return t.pageX
                }
                function c(e, t) {
                    return t && e && (e.type || "").charAt(0) === t.pointerType
                }
                var m, u, p, h = "mousedown touchstart pointerdown", f = "mousemove touchmove pointermove", g = "mouseup mouseleave touchend touchcancel pointerup pointercancel";
                return t.on(h, a), n.on(f, r).on(g, l), e.$on("$destroy", o), o
            }
            function r(e, n) {
                var o = t(e, n), a = {};
                return o._put = o.put, o.put = function(e, t) {
                    return a[e] = !0, o._put(e, t)
                }, o._remove = o.remove, o.remove = function(e) {
                    return delete a[e], o._remove(e)
                }, o._removeAll = o.removeAll, o.removeAll = function() {
                    return a = {}, o._removeAll()
                }, o._destroy = o.destroy, o.destroy = function() {
                    return a = {}, o._destroy()
                }, o.keys = function() {
                    return Object.keys(a)
                }, o
            }
            var i;
            return i = {now: window.performance ? angular.bind(window.performance, window.performance.now) : Date.now,attachDragBehavior: a,elementRect: function(e, t) {
                    var n = e[0];
                    t = t || n.offsetParent || document.body, t = t[0] || t;
                    var o = n.getBoundingClientRect(), a = t.getBoundingClientRect();
                    return {left: o.left - a.left + t.scrollLeft,top: o.top - a.top + t.scrollTop,width: o.width,height: o.height}
                },fakeNgModel: function() {
                    return {$fake: !0,$setViewValue: function(e) {
                            this.$viewValue = e, this.$render(e), this.$viewChangeListeners.forEach(function(e) {
                                e()
                            })
                        },$isEmpty: function(e) {
                            return 0 === ("" + e).length
                        },$parsers: [],$formatters: [],$viewChangeListeners: [],$render: angular.noop}
                },cacheFactory: r,debounce: function(e, t, n, a) {
                    var r;
                    return function() {
                        var i = n, l = Array.prototype.slice.call(arguments);
                        o.cancel(r), r = o(function() {
                            r = void 0, e.apply(i, l)
                        }, t || 10, a)
                    }
                },throttle: function(e, t) {
                    var n;
                    return function() {
                        var o = this, a = arguments, r = i.now();
                        (!n || r - n > t) && (e.apply(o, a), n = r)
                    }
                },nextUid: function() {
                    for (var t, n = e.length; n; ) {
                        if (n--, t = e[n].charCodeAt(0), 57 == t)
                            return e[n] = "A", e.join("");
                        if (90 != t)
                            return e[n] = String.fromCharCode(t + 1), e.join("");
                        e[n] = "0"
                    }
                    return e.unshift("0"), e.join("")
                },disconnectScope: function(e) {
                    if (e && e.$root !== e && !e.$$destroyed) {
                        var t = e.$parent;
                        e.$$disconnected = !0, t.$$childHead === e && (t.$$childHead = e.$$nextSibling), t.$$childTail === e && (t.$$childTail = e.$$prevSibling), e.$$prevSibling && (e.$$prevSibling.$$nextSibling = e.$$nextSibling), e.$$nextSibling && (e.$$nextSibling.$$prevSibling = e.$$prevSibling), e.$$nextSibling = e.$$prevSibling = null
                    }
                },reconnectScope: function(e) {
                    if (e && e.$root !== e && e.$$disconnected) {
                        var t = e, n = t.$parent;
                        t.$$disconnected = !1, t.$$prevSibling = n.$$childTail, n.$$childHead ? (n.$$childTail.$$nextSibling = t, n.$$childTail = t) : n.$$childHead = n.$$childTail = t
                    }
                },getClosest: function(e, t) {
                    t = t.toUpperCase();
                    do
                        if (e.nodeName === t)
                            return e;
                    while (e = e.parentNode);
                    return null
                }}
        }]), angular.element.prototype.focus = angular.element.prototype.focus || function() {
        return this.length && this[0].focus(), this
    }, angular.element.prototype.blur = angular.element.prototype.blur || function() {
        return this.length && this[0].blur(), this
    }
}(), function() {
    "use strict";
    function e(e, t, n) {
        function o(e, n, o) {
            var a = e[0];
            a.hasAttribute(n) || i(a, n) || (o = angular.isString(o) && o.trim() || "", o.length ? e.attr(n, o) : t.warn('ARIA: Attribute "', n, '", required for accessibility, is missing on node:', a))
        }
        function a(t, n, a) {
            e(function() {
                o(t, n, a())
            })
        }
        function r(e, t) {
            a(e, t, function() {
                return e.text().trim()
            })
        }
        function i(e, t) {
            function o(e) {
                var t = e.currentStyle ? e.currentStyle : n.getComputedStyle(e);
                return "none" === t.display
            }
            var a = e.hasChildNodes(), r = !1;
            if (a)
                for (var i = e.childNodes, l = 0; l < i.length; l++) {
                    var d = i[l];
                    1 === d.nodeType && d.hasAttribute(t) && (o(d) || (r = !0))
                }
            return r
        }
        return {expect: o,expectAsync: a,expectWithText: r}
    }
    angular.module("material.core").service("$mdAria", e), e.$inject = ["$$rAF", "$log", "$window"]
}(), function() {
    "use strict";
    function e(e, t, n, o, a, r) {
        this.compile = function(i) {
            var l = i.templateUrl, d = i.template || "", s = i.controller, c = i.controllerAs, m = i.resolve || {}, u = i.locals || {}, p = i.transformTemplate || angular.identity, h = i.bindToController;
            return angular.forEach(m, function(e, t) {
                m[t] = angular.isString(e) ? n.get(e) : n.invoke(e)
            }), angular.extend(m, u), m.$template = l ? t.get(l, {cache: r}).then(function(e) {
                return e.data
            }) : e.when(d), e.all(m).then(function(e) {
                var t = p(e.$template), n = angular.element("<div>").html(t.trim()).contents(), r = o(n);
                return {locals: e,element: n,link: function(t) {
                        if (e.$scope = t, s) {
                            var o = a(s, e);
                            h && angular.extend(o, e), n.data("$ngControllerController", o), n.children().data("$ngControllerController", o), c && (t[c] = o)
                        }
                        return r(t)
                    }}
            })
        }
    }
    angular.module("material.core").service("$mdCompiler", e), e.$inject = ["$q", "$http", "$injector", "$compile", "$controller", "$templateCache"]
}(), function() {
    "use strict";
    function e() {
        function e(e) {
            function t(e) {
                return r.optionsFactory = e.options, r.methods = (e.methods || []).concat(a), i
            }
            function n(t, n) {
                if (n = n || {}, n.methods = n.methods || [], n.options = n.options || function() {
                    return {}
                }, /^cancel|hide|show$/.test(t))
                    throw new Error("Preset '" + t + "' in " + e + " is reserved!");
                if (n.methods.indexOf("_options") > -1)
                    throw new Error("Method '_options' in " + e + " is reserved!");
                return r.presets[t] = {methods: n.methods.concat(a),optionsFactory: n.options,argOption: n.argOption}, i
            }
            function o(t, n, o) {
                function a(e) {
                    return e && e._options && (e = e._options), s.show(angular.extend({}, d, e))
                }
                function i(t, n) {
                    var a = {};
                    return a[e] = c, o.invoke(t || function() {
                        return n
                    }, {}, a)
                }
                var l, d, s = t(), c = {hide: s.hide,cancel: s.cancel,show: a};
                return l = r.methods || [], d = i(r.optionsFactory, {}), angular.forEach(r.presets, function(e, t) {
                    function n(e) {
                        this._options = angular.extend({}, o, e)
                    }
                    var o = i(e.optionsFactory, {}), a = (e.methods || []).concat(l);
                    if (angular.extend(o, {$type: t}), angular.forEach(a, function(e) {
                        n.prototype[e] = function(t) {
                            return this._options[e] = t, this
                        }
                    }), e.argOption) {
                        var r = "show" + t.charAt(0).toUpperCase() + t.slice(1);
                        c[r] = function(e) {
                            var n = c[t](e);
                            return c.show(n)
                        }
                    }
                    c[t] = function(t) {
                        return arguments.length && e.argOption && !angular.isObject(t) && !angular.isArray(t) ? (new n)[e.argOption](t) : new n(t)
                    }
                }), c
            }
            var a = ["onHide", "onShow", "onRemove"], r = {presets: {}}, i = {setDefaults: t,addPreset: n,$get: o};
            return i.addPreset("build", {methods: ["controller", "controllerAs", "resolve", "template", "templateUrl", "themable", "transformTemplate", "parent"]}), o.$inject = ["$$interimElement", "$animate", "$injector"], i
        }
        function t(e, t, n, o, a, r, i, l, d) {
            function s(e) {
                return e && angular.isString(e) ? e.replace(/\{\{/g, c).replace(/}}/g, m) : e
            }
            var c = i.startSymbol(), m = i.endSymbol(), u = "{{" === c && "}}" === m, p = u ? angular.identity : s;
            return function() {
                function i(e) {
                    h.length && u.cancel();
                    var t = new m(e);
                    return h.push(t), t.show().then(function() {
                        return t.deferred.promise
                    })
                }
                function s(e) {
                    var n = h.shift();
                    return n && n.remove().then(function() {
                        n.deferred.resolve(e)
                    }), n ? n.deferred.promise : t.when(e)
                }
                function c(e) {
                    var n = h.shift();
                    return n && n.remove().then(function() {
                        n.deferred.reject(e)
                    }), n ? n.deferred.promise : t.reject(e)
                }
                function m(i) {
                    var s, c, m;
                    return i = i || {}, i = angular.extend({scope: i.scope || n.$new(i.isolateScope),onShow: function(e, t, n) {
                            return r.enter(t, n.parent)
                        },onRemove: function(e, n) {
                            return n && r.leave(n) || t.when()
                        }}, i), i.template && (i.template = p(i.template)), s = {options: i,deferred: t.defer(),show: function() {
                            return l.compile(i).then(function(n) {
                                function r() {
                                    i.hideDelay && (c = o(u.cancel, i.hideDelay))
                                }
                                angular.extend(n.locals, s.options), angular.isString(i.parent) ? i.parent = angular.element(e[0].querySelector(i.parent)) : i.parent || (i.parent = a.find("body"), i.parent.length || (i.parent = a)), m = n.link(i.scope), i.themable && d(m);
                                var l = i.onShow(i.scope, m, i);
                                return t.when(l).then(function() {
                                    (i.onComplete || angular.noop)(i.scope, m, i), r()
                                })
                            })
                        },cancelTimeout: function() {
                            c && (o.cancel(c), c = void 0)
                        },remove: function() {
                            s.cancelTimeout();
                            var e = i.onRemove(i.scope, m, i);
                            return t.when(e).then(function() {
                                i.scope.$destroy()
                            })
                        }}
                }
                var u, h = [];
                return u = {show: i,hide: s,cancel: c}
            }
        }
        return e.$get = t, t.$inject = ["$document", "$q", "$rootScope", "$timeout", "$rootElement", "$animate", "$interpolate", "$mdCompiler", "$mdTheming"], e
    }
    angular.module("material.core").provider("$$interimElement", e)
}(), function() {
    "use strict";
    function e(e, t) {
        function n(e) {
            return e && "" !== e
        }
        var o, a = [], r = {};
        return o = {notFoundError: function(t) {
                e.error("No instance found for handle", t)
            },getInstances: function() {
                return a
            },get: function(e) {
                if (!n(e))
                    return null;
                var t, o, r;
                for (t = 0, o = a.length; o > t; t++)
                    if (r = a[t], r.$$mdHandle === e)
                        return r;
                return null
            },register: function(e, t) {
                function n() {
                    var t = a.indexOf(e);
                    -1 !== t && a.splice(t, 1)
                }
                function o() {
                    var n = r[t];
                    n && (n.resolve(e), delete r[t])
                }
                return t ? (e.$$mdHandle = t, a.push(e), o(), n) : angular.noop
            },when: function(e) {
                if (n(e)) {
                    var a = t.defer(), i = o.get(e);
                    return i ? a.resolve(i) : r[e] = a, a.promise
                }
                return t.reject("Invalid `md-component-id` value.")
            }}
    }
    angular.module("material.core").factory("$mdComponentRegistry", e), e.$inject = ["$log", "$q"]
}(), function() {
    "use strict";
    function e(e) {
        return {controller: angular.noop,link: function(t, n, o) {
                o.hasOwnProperty("mdInkRippleCheckbox") ? e.attachCheckboxBehavior(t, n) : e.attachButtonBehavior(t, n)
            }}
    }
    function t(e, t) {
        function n(e, t, n) {
            return r(e, t, angular.extend({isFAB: t.hasClass("md-fab"),isMenuItem: t.hasClass("md-menu-item"),center: !1,dimBackground: !0}, n))
        }
        function o(e, t, n) {
            return r(e, t, angular.extend({center: !0,dimBackground: !1}, n))
        }
        function a(e, t, n) {
            return r(e, t, angular.extend({center: !1,dimBackground: !0,outline: !0}, n))
        }
        function r(n, o, a) {
            function r(e) {
                function t(e) {
                    var t = "#" === e.charAt(0) ? e.substr(1) : e, n = t.length / 3, o = t.substr(0, n), a = t.substr(n, n), r = t.substr(2 * n);
                    return 1 === n && (o += o, a += a, r += r), "rgba(" + parseInt(o, 16) + "," + parseInt(a, 16) + "," + parseInt(r, 16) + ",0.1)"
                }
                function n(e) {
                    return e.replace(")", ", 0.1)").replace("(", "a(")
                }
                if (e)
                    return 0 === e.indexOf("rgba") ? e.replace(/\d?\.?\d*\s*\)\s*$/, "0.1)") : 0 === e.indexOf("rgb") ? n(e) : 0 === e.indexOf("#") ? t(e) : void 0
            }
            function i(e, n) {
                h.splice(h.indexOf(e), 1), 0 === h.length && c && c.css({backgroundColor: ""}), t(function() {
                    e.remove()
                }, n, !1)
            }
            function l(e) {
                var t = h.indexOf(e), n = f[t] || {}, o = h.length > 1 ? !1 : b, r = h.length > 1 ? !1 : v;
                o || n.animating || r ? e.addClass("md-ripple-visible") : e && (e.removeClass("md-ripple-visible"), a.outline && e.css({width: m + "px",height: m + "px",marginLeft: -1 * m + "px",marginTop: -1 * m + "px"}), i(e, a.outline ? 450 : 650))
            }
            function d(n, i) {
                function d(e) {
                    var t = angular.element('<div class="md-ripple" data-counter="' + p++ + '">');
                    return h.unshift(t), f.unshift({animating: !0}), b.append(t), e && t.css(e), t
                }
                function s(e, t) {
                    var n, o, r, i = b.prop("offsetWidth"), l = b.prop("offsetHeight");
                    return a.isMenuItem ? o = Math.sqrt(Math.pow(i, 2) + Math.pow(l, 2)) : a.outline ? (r = E.getBoundingClientRect(), e -= r.left, t -= r.top, i = Math.max(e, i - e), l = Math.max(t, l - t), o = 2 * Math.sqrt(Math.pow(i, 2) + Math.pow(l, 2))) : (n = a.isFAB ? 1.1 : .8, o = Math.max(i, l) * n), o
                }
                function u(e, t, n) {
                    function o(e) {
                        return e.replace("rgba", "rgb").replace(/,[^\)\,]+\)/, ")")
                    }
                    var r, i = {backgroundColor: o(T),borderColor: o(T),width: e + "px",height: e + "px"};
                    return a.outline ? (i.width = 0, i.height = 0) : i.marginLeft = i.marginTop = e * -.5 + "px", a.center ? i.left = i.top = "50%" : (r = E.getBoundingClientRect(), i.left = Math.round((t - r.left) / b.prop("offsetWidth") * 100) + "%", i.top = Math.round((n - r.top) / b.prop("offsetHeight") * 100) + "%"), i
                }
                function g() {
                    if (c)
                        return c;
                    var e = angular.element('<div class="md-ripple-container"></div>');
                    return c = e, o.append(e), e
                }
                T = r(o.attr("md-ink-ripple")) || r(e.getComputedStyle(a.colorElement[0]).color || "rgb(0, 0, 0)");
                var b = g(), v = s(n, i), y = u(v, n, i), $ = d(y), M = h.indexOf($), x = f[M] || {};
                return m = v, x.animating = !0, t(function() {
                    a.dimBackground && b.css({backgroundColor: T}), $.addClass("md-ripple-placed md-ripple-scaled"), a.outline ? $.css({borderWidth: .5 * v + "px",marginLeft: v * -.5 + "px",marginTop: v * -.5 + "px"}) : $.css({left: "50%",top: "50%"}), l($), t(function() {
                        x.animating = !1, l($)
                    }, a.outline ? 450 : 225, !1)
                }, 0, !1), $
            }
            function s(e) {
                function n() {
                    function e(e) {
                        return e && e.hasAttribute && e.hasAttribute("disabled")
                    }
                    var t = E.parentNode, n = t && t.parentNode, o = n && n.parentNode;
                    return !(e(E) || e(t) || e(n) || e(o))
                }
                var o, a;
                e.eventType === Hammer.INPUT_START && e.isFirst && n() ? (o = d(e.center.x, e.center.y), v = !0) : e.eventType === Hammer.INPUT_END && e.isFinal && (v = !1, a = h.length - 1, o = h[a], t(function() {
                    l(o)
                }, 0, !1))
            }
            if (o.controller("mdNoInk"))
                return angular.noop;
            a = angular.extend({colorElement: o,mousedown: !0,hover: !0,focus: !0,center: !1,mousedownPauseTime: 150,dimBackground: !1,outline: !1,isFAB: !1,isMenuItem: !1}, a);
            var c, m, u = o.controller("mdInkRipple") || {}, p = 0, h = [], f = [], g = o.attr("md-highlight"), b = !1, v = !1, E = o[0], y = new Hammer(E), T = r(o.attr("md-ink-ripple")) || r(e.getComputedStyle(a.colorElement[0]).color || "rgb(0, 0, 0)");
            return n._onInput = s, a.mousedown && y.on("hammer.input", s), u.createRipple = d, g && n.$watch(g, function(e) {
                b = e, b && !h.length && t(function() {
                    d(0, 0)
                }, 0, !1), angular.forEach(h, l)
            }), function() {
                y.destroy(), c && c.remove()
            }
        }
        return {attachButtonBehavior: n,attachCheckboxBehavior: o,attachTabBehavior: a,attach: r}
    }
    function n() {
        return function() {
            return {controller: angular.noop}
        }
    }
    angular.module("material.core").factory("$mdInkRipple", t).directive("mdInkRipple", e).directive("mdNoInk", n()).directive("mdNoBar", n()).directive("mdNoStretch", n()), e.$inject = ["$mdInkRipple"], t.$inject = ["$window", "$timeout"]
}(), function() {
    "use strict";
    angular.module("material.core.theming.palette", []).constant("$mdColorPalette", {red: {50: "#ffebee",100: "#ffcdd2",200: "#ef9a9a",300: "#e57373",400: "#ef5350",500: "#f44336",600: "#e53935",700: "#d32f2f",800: "#c62828",900: "#b71c1c",A100: "#ff8a80",A200: "#ff5252",A400: "#ff1744",A700: "#d50000",contrastDefaultColor: "light",contrastDarkColors: "50 100 200 300 400 A100",contrastStrongLightColors: "500 600 700 A200 A400 A700"},pink: {50: "#fce4ec",100: "#f8bbd0",200: "#f48fb1",300: "#f06292",400: "#ec407a",500: "#e91e63",600: "#d81b60",700: "#c2185b",800: "#ad1457",900: "#880e4f",A100: "#ff80ab",A200: "#ff4081",A400: "#f50057",A700: "#c51162",contrastDefaultColor: "light",contrastDarkColors: "50 100 200 300 400 A100",contrastStrongLightColors: "500 600 A200 A400 A700"},purple: {50: "#f3e5f5",100: "#e1bee7",200: "#ce93d8",300: "#ba68c8",400: "#ab47bc",500: "#9c27b0",600: "#8e24aa",700: "#7b1fa2",800: "#6a1b9a",900: "#4a148c",A100: "#ea80fc",A200: "#e040fb",A400: "#d500f9",A700: "#aa00ff",contrastDefaultColor: "light",contrastDarkColors: "50 100 200 A100",contrastStrongLightColors: "300 400 A200 A400 A700"},"deep-purple": {50: "#ede7f6",100: "#d1c4e9",200: "#b39ddb",300: "#9575cd",400: "#7e57c2",500: "#673ab7",600: "#5e35b1",700: "#512da8",800: "#4527a0",900: "#311b92",A100: "#b388ff",A200: "#7c4dff",A400: "#651fff",A700: "#6200ea",contrastDefaultColor: "light",contrastDarkColors: "50 100 200 A100",contrastStrongLightColors: "300 400 A200"},indigo: {50: "#e8eaf6",100: "#c5cae9",200: "#9fa8da",300: "#7986cb",400: "#5c6bc0",500: "#3f51b5",600: "#3949ab",700: "#303f9f",800: "#283593",900: "#1a237e",A100: "#8c9eff",A200: "#536dfe",A400: "#3d5afe",A700: "#304ffe",contrastDefaultColor: "light",contrastDarkColors: "50 100 200 A100",contrastStrongLightColors: "300 400 A200 A400"},blue: {50: "#e3f2fd",100: "#bbdefb",200: "#90caf9",300: "#64b5f6",400: "#42a5f5",500: "#2196f3",600: "#1e88e5",700: "#1976d2",800: "#1565c0",900: "#0d47a1",A100: "#82b1ff",A200: "#448aff",A400: "#2979ff",A700: "#2962ff",contrastDefaultColor: "light",contrastDarkColors: "100 200 300 400 A100",contrastStrongLightColors: "500 600 700 A200 A400 A700"},"light-blue": {50: "#e1f5fe",100: "#b3e5fc",200: "#81d4fa",300: "#4fc3f7",400: "#29b6f6",500: "#03a9f4",600: "#039be5",700: "#0288d1",800: "#0277bd",900: "#01579b",A100: "#80d8ff",A200: "#40c4ff",A400: "#00b0ff",A700: "#0091ea",contrastDefaultColor: "dark",contrastLightColors: "500 600 700 800 900 A700",contrastStrongLightColors: "500 600 700 800 A700"},cyan: {50: "#e0f7fa",100: "#b2ebf2",200: "#80deea",300: "#4dd0e1",400: "#26c6da",500: "#00bcd4",600: "#00acc1",700: "#0097a7",800: "#00838f",900: "#006064",A100: "#84ffff",A200: "#18ffff",A400: "#00e5ff",A700: "#00b8d4",contrastDefaultColor: "dark",contrastLightColors: "500 600 700 800 900",contrastStrongLightColors: "500 600 700 800"},teal: {50: "#e0f2f1",100: "#b2dfdb",200: "#80cbc4",300: "#4db6ac",400: "#26a69a",500: "#009688",600: "#00897b",700: "#00796b",800: "#00695c",900: "#004d40",A100: "#a7ffeb",A200: "#64ffda",A400: "#1de9b6",A700: "#00bfa5",contrastDefaultColor: "dark",contrastLightColors: "500 600 700 800 900",contrastStrongLightColors: "500 600 700"},green: {50: "#e8f5e9",100: "#c8e6c9",200: "#a5d6a7",300: "#81c784",400: "#66bb6a",500: "#4caf50",600: "#43a047",700: "#388e3c",800: "#2e7d32",900: "#1b5e20",A100: "#b9f6ca",A200: "#69f0ae",A400: "#00e676",A700: "#00c853",contrastDefaultColor: "dark",contrastLightColors: "500 600 700 800 900",contrastStrongLightColors: "500 600 700"},"light-green": {50: "#f1f8e9",100: "#dcedc8",200: "#c5e1a5",300: "#aed581",400: "#9ccc65",500: "#8bc34a",600: "#7cb342",700: "#689f38",800: "#558b2f",900: "#33691e",A100: "#ccff90",A200: "#b2ff59",A400: "#76ff03",A700: "#64dd17",contrastDefaultColor: "dark",contrastLightColors: "800 900",contrastStrongLightColors: "800 900"},lime: {50: "#f9fbe7",100: "#f0f4c3",200: "#e6ee9c",300: "#dce775",400: "#d4e157",500: "#cddc39",600: "#c0ca33",700: "#afb42b",800: "#9e9d24",900: "#827717",A100: "#f4ff81",A200: "#eeff41",A400: "#c6ff00",A700: "#aeea00",contrastDefaultColor: "dark",contrastLightColors: "900",contrastStrongLightColors: "900"},yellow: {50: "#fffde7",100: "#fff9c4",200: "#fff59d",300: "#fff176",400: "#ffee58",500: "#ffeb3b",600: "#fdd835",700: "#fbc02d",800: "#f9a825",900: "#f57f17",A100: "#ffff8d",A200: "#ffff00",A400: "#ffea00",A700: "#ffd600",contrastDefaultColor: "dark"},amber: {50: "#fff8e1",100: "#ffecb3",200: "#ffe082",300: "#ffd54f",400: "#ffca28",500: "#ffc107",600: "#ffb300",700: "#ffa000",800: "#ff8f00",900: "#ff6f00",A100: "#ffe57f",A200: "#ffd740",A400: "#ffc400",A700: "#ffab00",contrastDefaultColor: "dark"},orange: {50: "#fff3e0",100: "#ffe0b2",200: "#ffcc80",300: "#ffb74d",400: "#ffa726",500: "#ff9800",600: "#fb8c00",700: "#f57c00",800: "#ef6c00",900: "#e65100",A100: "#ffd180",A200: "#ffab40",A400: "#ff9100",A700: "#ff6d00",contrastDefaultColor: "dark",contrastLightColors: "800 900",contrastStrongLightColors: "800 900"},"deep-orange": {50: "#fbe9e7",100: "#ffccbc",200: "#ffab91",300: "#ff8a65",400: "#ff7043",500: "#ff5722",600: "#f4511e",700: "#e64a19",800: "#d84315",900: "#bf360c",A100: "#ff9e80",A200: "#ff6e40",A400: "#ff3d00",A700: "#dd2c00",contrastDefaultColor: "light",contrastDarkColors: "50 100 200 300 400 A100 A200",contrastStrongLightColors: "500 600 700 800 900 A400 A700"},brown: {50: "#efebe9",100: "#d7ccc8",200: "#bcaaa4",300: "#a1887f",400: "#8d6e63",500: "#795548",600: "#6d4c41",700: "#5d4037",800: "#4e342e",900: "#3e2723",A100: "#d7ccc8",A200: "#bcaaa4",A400: "#8d6e63",A700: "#5d4037",contrastDefaultColor: "light",contrastDarkColors: "50 100 200",contrastStrongLightColors: "300 400"},grey: {0: "#ffffff",50: "#fafafa",100: "#f5f5f5",200: "#eeeeee",300: "#e0e0e0",400: "#bdbdbd",500: "#9e9e9e",600: "#757575",700: "#616161",800: "#424242",900: "#212121",1000: "#000000",A100: "#ffffff",A200: "#eeeeee",A400: "#bdbdbd",A700: "#616161",contrastDefaultColor: "dark",contrastLightColors: "600 700 800 900"},"blue-grey": {50: "#eceff1",100: "#cfd8dc",200: "#b0bec5",300: "#90a4ae",400: "#78909c",500: "#607d8b",600: "#546e7a",700: "#455a64",800: "#37474f",900: "#263238",A100: "#cfd8dc",A200: "#b0bec5",A400: "#78909c",A700: "#455a64",contrastDefaultColor: "light",contrastDarkColors: "50 100 200 300",contrastStrongLightColors: "400 500"}})
}(), function() {
    "use strict";
    function e(e) {
        function t(e, t) {
            return t = t || {}, d[e] = a(e, t), c
        }
        function n(e, t) {
            return a(e, angular.extend({}, d[e] || {}, t))
        }
        function a(e, t) {
            var n = M.filter(function(e) {
                return !t[e]
            });
            if (n.length)
                throw new Error("Missing colors %1 in palette %2!".replace("%1", n.join(", ")).replace("%2", e));
            return t
        }
        function r(e, t) {
            if (t = t || "default", s[e])
                return s[e];
            var n = "string" == typeof t ? s[t] : t, o = new i(e);
            return n && angular.forEach(n.colors, function(e, t) {
                o.colors[t] = {name: e.name,hues: angular.extend({}, e.hues)}
            }), s[e] = o, o
        }
        function i(e) {
            function t(e) {
                if (e = 0 === arguments.length ? !0 : !!e, e !== n.isDark) {
                    n.isDark = e, n.foregroundPalette = n.isDark ? p : u, n.foregroundShadow = n.isDark ? h : f;
                    var t = n.isDark ? $ : T, o = n.isDark ? T : $;
                    return angular.forEach(t, function(e, t) {
                        var a = n.colors[t], r = o[t];
                        if (a)
                            for (var i in a.hues)
                                a.hues[i] === r[i] && (a.hues[i] = e[i])
                    }), n
                }
            }
            var n = this;
            n.name = e, n.colors = {}, n.dark = t, t(!1), E.forEach(function(e) {
                var t = (n.isDark ? $ : T)[e];
                n[e + "Palette"] = function(o, a) {
                    var r = n.colors[e] = {name: o,hues: angular.extend({}, t, a)};
                    return Object.keys(r.hues).forEach(function(e) {
                        if (!t[e])
                            throw new Error("Invalid hue name '%1' in theme %2's %3 color %4. Available hue names: %4".replace("%1", e).replace("%2", n.name).replace("%3", o).replace("%4", Object.keys(t).join(", ")))
                    }), Object.keys(r.hues).map(function(e) {
                        return r.hues[e]
                    }).forEach(function(t) {
                        if (-1 == M.indexOf(t))
                            throw new Error("Invalid hue value '%1' in theme %2's %3 color %4. Available hue values: %5".replace("%1", t).replace("%2", n.name).replace("%3", e).replace("%4", o).replace("%5", M.join(", ")))
                    }), n
                }, n[e + "Color"] = function() {
                    var t = Array.prototype.slice.call(arguments);
                    return console.warn("$mdThemingProviderTheme." + e + "Color() has been depricated. Use $mdThemingProviderTheme." + e + "Palette() instead."), n[e + "Palette"].apply(n, t)
                }
            })
        }
        function m(e) {
            function t(n, o) {
                void 0 === o && (o = n, n = void 0), void 0 === n && (n = e), t.inherit(o, o)
            }
            return t.inherit = function(t, n) {
                function o(e) {
                    var n = t.data("$mdThemeName");
                    n && t.removeClass("md-" + n + "-theme"), t.addClass("md-" + e + "-theme"), t.data("$mdThemeName", e)
                }
                var a = n.controller("mdTheme"), r = t.attr("md-theme-watch");
                if ((b || angular.isDefined(r)) && "false" != r) {
                    var i = e.$watch(function() {
                        return a && a.$mdTheme || g
                    }, o);
                    t.on("$destroy", i)
                } else {
                    var l = a && a.$mdTheme || g;
                    o(l)
                }
            }, t
        }
        d = {}, s = {};
        var g = "default", b = !1;
        return angular.extend(d, e), m.$inject = ["$rootScope"], c = {definePalette: t,extendPalette: n,theme: r,setDefaultTheme: function(e) {
                g = e
            },alwaysWatchTheme: function(e) {
                b = e
            },$get: m,_LIGHT_DEFAULT_HUES: T,_DARK_DEFAULT_HUES: $,_PALETTES: d,_THEMES: s,_parseRules: o,_rgba: l}
    }
    function t(e) {
        return {priority: 100,link: {pre: function(t, n, o) {
                    var a = {$setTheme: function(e) {
                            a.$mdTheme = e
                        }};
                    n.data("$mdThemeController", a), a.$setTheme(e(o.mdTheme)(t)), o.$observe("mdTheme", a.$setTheme)
                }}}
    }
    function n(e) {
        return e
    }
    function o(e, t, n) {
        r(e, t), n = n.replace(/THEME_NAME/g, e.name);
        var o = [], a = e.colors[t], i = new RegExp(".md-" + e.name + "-theme", "g"), s = new RegExp("('|\")?{{\\s*(" + t + ")-(color|contrast)-?(\\d\\.?\\d*)?\\s*}}(\"|')?", "g"), c = /'?"?\{\{\s*([a-zA-Z]+)-(A?\d+|hue\-[0-3]|shadow)-?(\d\.?\d*)?\s*\}\}'?"?/g, m = d[a.name];
        return n = n.replace(c, function(t, n, o, a) {
            return "foreground" === n ? "shadow" == o ? e.foregroundShadow : e.foregroundPalette[o] || e.foregroundPalette["1"] : (0 === o.indexOf("hue") && (o = e.colors[n].hues[o]), l((d[e.colors[n].name][o] || "").value, a))
        }), angular.forEach(a.hues, function(t, a) {
            var r = n.replace(s, function(e, n, o, a, r) {
                return l(m[t]["color" === a ? "value" : "contrast"], r)
            });
            "default" !== a && (r = r.replace(i, ".md-" + e.name + "-theme.md-" + a)), o.push(r)
        }), o.join("")
    }
    function a(e) {
        function t(e) {
            var t = e.contrastDefaultColor, n = e.contrastLightColors || [], o = e.contrastStrongLightColors || [], a = e.contrastDarkColors || [];
            "string" == typeof n && (n = n.split(" ")), "string" == typeof strongLongColors && (o = o.split(" ")), "string" == typeof a && (a = a.split(" ")), delete e.contrastDefaultColor, delete e.contrastLightColors, delete e.contrastStrongLightColors, delete e.contrastDarkColors, angular.forEach(e, function(r, l) {
                function d() {
                    return "light" === t ? a.indexOf(l) > -1 ? g : o.indexOf(l) > -1 ? v : b : n.indexOf(l) > -1 ? o.indexOf(l) > -1 ? v : b : g
                }
                if (!angular.isObject(r)) {
                    var s = i(r);
                    if (!s)
                        throw new Error("Color %1, in palette %2's hue %3, is invalid. Hex or rgb(a) color expected.".replace("%1", r).replace("%2", e.name).replace("%3", l));
                    e[l] = {value: s,contrast: d()}
                }
            })
        }
        var n = e.has("$MD_THEME_CSS") ? e.get("$MD_THEME_CSS") : "";
        angular.forEach(d, t);
        var a = n.split(/\}(?!(\}|'|"|;))/).filter(function(e) {
            return e && e.length
        }).map(function(e) {
            return e.trim() + "}"
        }), r = {};
        E.forEach(function(e) {
            r[e] = ""
        });
        var l = new RegExp("md-(" + E.join("|") + ")", "g");
        a.forEach(function(e) {
            for (var t, n = (e.match(l), 0); t = E[n]; n++)
                if (e.indexOf(".md-" + t) > -1)
                    return r[t] += e;
            for (n = 0; t = E[n]; n++)
                if (e.indexOf(t) > -1)
                    return r[t] += e;
            return r[y] += e
        });
        var c = "";
        if (angular.forEach(s, function(e) {
            E.forEach(function(t) {
                c += o(e, t, r[t] + "")
            }), e.colors.primary.name == e.colors.accent.name && console.warn("$mdThemingProvider: Using the same palette for primary andaccent. This violates the material design spec.")
        }), !m) {
            var u = document.createElement("style");
            u.innerHTML = c;
            var p = document.getElementsByTagName("head")[0];
            p.insertBefore(u, p.firstElementChild), m = !0
        }
    }
    function r(e, t) {
        if (!d[(e.colors[t] || {}).name])
            throw new Error("You supplied an invalid color palette for theme %1's %2 palette. Available palettes: %3".replace("%1", e.name).replace("%2", t).replace("%3", Object.keys(d).join(", ")))
    }
    function i(e) {
        if (angular.isArray(e) && 3 == e.length)
            return e;
        if (/^rgb/.test(e))
            return e.replace(/(^\s*rgba?\(|\)\s*$)/g, "").split(",").map(function(e, t) {
                return 3 == t ? parseFloat(e, 10) : parseInt(e, 10)
            });
        if ("#" == e.charAt(0) && (e = e.substring(1)), /^([a-fA-F0-9]{3}){1,2}$/g.test(e)) {
            var t = e.length / 3, n = e.substr(0, t), o = e.substr(t, t), a = e.substr(2 * t);
            return 1 === t && (n += n, o += o, a += a), [parseInt(n, 16), parseInt(o, 16), parseInt(a, 16)]
        }
    }
    function l(e, t) {
        return 4 == e.length && (e = angular.copy(e), t = e.pop()), t && ("number" == typeof t || "string" == typeof t && t.length) ? "rgba(" + e.join(",") + "," + t + ")" : "rgb(" + e.join(",") + ")"
    }
    angular.module("material.core.theming", ["material.core.theming.palette"]).directive("mdTheme", t).directive("mdThemable", n).provider("$mdTheming", e).run(a);
    var d, s, c, m, u = {name: "dark",1: "rgba(0,0,0,0.87)",2: "rgba(0,0,0,0.54)",3: "rgba(0,0,0,0.26)",4: "rgba(0,0,0,0.12)"}, p = {name: "light",1: "rgba(255,255,255,1.0)",2: "rgba(255,255,255,0.7)",3: "rgba(255,255,255,0.3)",4: "rgba(255,255,255,0.12)"}, h = "1px 1px 0px rgba(0,0,0,0.4), -1px -1px 0px rgba(0,0,0,0.4)", f = "", g = i("rgba(0,0,0,0.87)"), b = i("rgba(255,255,255,0.87"), v = i("rgb(255,255,255)"), E = ["primary", "accent", "warn", "background"], y = "primary", T = {accent: {"default": "A200","hue-1": "A100","hue-2": "A400","hue-3": "A700"}}, $ = {background: {"default": "500","hue-1": "300","hue-2": "600","hue-3": "800"}};
    E.forEach(function(e) {
        var t = {"default": "500","hue-1": "300","hue-2": "800","hue-3": "A100"};
        T[e] || (T[e] = t), $[e] || ($[e] = t)
    });
    var M = ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900", "A100", "A200", "A400", "A700"];
    e.$inject = ["$mdColorPalette"], t.$inject = ["$interpolate"], n.$inject = ["$mdTheming"], a.$inject = ["$injector"]
}(), function() {
    "use strict";
    function e(e) {
        return e
    }
    angular.module("material.components.backdrop", ["material.core"]).directive("mdBackdrop", e), e.$inject = ["$mdTheming"]
}(), function() {
    "use strict";
    function e() {
        return {restrict: "E"}
    }
    function t(e) {
        function t(e, t, n, o, a, r, i, l) {
            function d(o, d, s) {
                m = a('<md-backdrop class="md-opaque md-bottom-sheet-backdrop">')(o), m.on("click touchstart", function() {
                    n(i.cancel)
                }), r.inherit(m, s.parent), e.enter(m, s.parent, null);
                var u = new c(d);
                return s.bottomSheet = u, s.targetEvent && angular.element(s.targetEvent.target).blur(), r.inherit(u.element, s.parent), e.enter(u.element, s.parent).then(function() {
                    var e = angular.element(d[0].querySelector("button") || d[0].querySelector("a") || d[0].querySelector("[ng-click]"));
                    e.focus(), s.escapeToClose && (s.rootElementKeyupCallback = function(e) {
                        e.keyCode === t.KEY_CODE.ESCAPE && n(i.cancel)
                    }, l.on("keyup", s.rootElementKeyupCallback))
                })
            }
            function s(t, n, o) {
                var a = o.bottomSheet;
                return e.leave(m), e.leave(a.element).then(function() {
                    a.cleanup(), o.targetEvent && angular.element(o.targetEvent.target).focus()
                })
            }
            function c(e) {
                function o(n) {
                    n.preventDefault(), h = n.target, c = l(n), p = e.css(t.CSS.TRANSITION_DURATION), e.css(t.CSS.TRANSITION_DURATION, "0s")
                }
                function a(o) {
                    e.css(t.CSS.TRANSITION_DURATION, p);
                    var a = l(o);
                    Math.abs(a - c) < 5 && o.target == h ? angular.element(o.target).triggerHandler("click") : u > b ? n(i.cancel) : d(void 0)
                }
                function r(e) {
                    var t = l(e), n = t - c;
                    u = t - m, m = t, n = s(n), d(n + f)
                }
                function l(e) {
                    var t = e.touches && e.touches.length ? e.touches[0] : e.changedTouches[0];
                    return t.clientY
                }
                function d(n) {
                    null === n || void 0 === n ? e.css(t.CSS.TRANSFORM, "") : e.css(t.CSS.TRANSFORM, "translate3d(0, " + n + "px, 0)")
                }
                function s(e) {
                    if (0 > e && -f + g > e) {
                        e = -e;
                        var t = f - g;
                        e = Math.max(-f, -Math.min(f - 5, t + g * (e - t) / f) - e / 50)
                    }
                    return e
                }
                var c, m, u, p, h, f = 80, g = 20, b = 10;
                return e = e.eq(0), e.on("touchstart", o).on("touchmove", r).on("touchend", a), {element: e,cleanup: function() {
                        e.off("touchstart", o).off("touchmove", r).off("touchend", a)
                    }}
            }
            var m;
            return {themable: !0,targetEvent: null,onShow: d,onRemove: s,escapeToClose: !0}
        }
        return t.$inject = ["$animate", "$mdConstant", "$timeout", "$$rAF", "$compile", "$mdTheming", "$mdBottomSheet", "$rootElement"], e("$mdBottomSheet").setDefaults({options: t})
    }
    angular.module("material.components.bottomSheet", ["material.core", "material.components.backdrop"]).directive("mdBottomSheet", e).provider("$mdBottomSheet", t), t.$inject = ["$$interimElementProvider"]
}(), function() {
    "use strict";
    function e(e, t, n) {
        function o(e) {
            return angular.isDefined(e.href) || angular.isDefined(e.ngHref)
        }
        function a(e, t) {
            return o(t) ? '<a class="md-button" ng-transclude></a>' : '<button class="md-button" ng-transclude></button>'
        }
        function r(a, r, i) {
            var l = r[0];
            t(r), e.attachButtonBehavior(a, r);
            var d = l.textContent.trim();
            d || n.expect(r, "aria-label"), o(i) && angular.isDefined(i.ngDisabled) && a.$watch(i.ngDisabled, function(e) {
                r.attr("tabindex", e ? -1 : 0)
            })
        }
        return {restrict: "E",replace: !0,transclude: !0,template: a,link: r}
    }
    angular.module("material.components.button", ["material.core"]).directive("mdButton", e), e.$inject = ["$mdInkRipple", "$mdTheming", "$mdAria"]
}(), function() {
    "use strict";
    function e(e) {
        return {restrict: "E",link: function(t, n) {
                e(n)
            }}
    }
    angular.module("material.components.card", ["material.core"]).directive("mdCard", e), e.$inject = ["$mdTheming"]
}(), function() {
    "use strict";
    function e(e, t, n, o, a, r) {
        function i(t, i) {
            return i.type = "checkbox", i.tabIndex = 0, t.attr("role", i.type), function(i, d, s, c) {
                function m(e) {
                    e.which === o.KEY_CODE.SPACE && (e.preventDefault(), u(e))
                }
                function u(e) {
                    d[0].hasAttribute("disabled") || i.$apply(function() {
                        h = !h, c.$setViewValue(h, e && e.type), c.$render()
                    })
                }
                function p() {
                    h = c.$viewValue, h ? d.addClass(l) : d.removeClass(l)
                }
                c = c || r.fakeNgModel();
                var h = !1;
                a(d), n.expectWithText(t, "aria-label"), e.link.pre(i, {on: angular.noop,0: {}}, s, [c]), s.mdNoClick || d.on("click", u), d.on("keypress", m), c.$render = p
            }
        }
        e = e[0];
        var l = "md-checked";
        return {restrict: "E",transclude: !0,require: "?ngModel",template: '<div class="md-container" md-ink-ripple md-ink-ripple-checkbox><div class="md-icon"></div></div><div ng-transclude class="md-label"></div>',compile: i}
    }
    angular.module("material.components.checkbox", ["material.core"]).directive("mdCheckbox", e), e.$inject = ["inputDirective", "$mdInkRipple", "$mdAria", "$mdConstant", "$mdTheming", "$mdUtil"]
}(), function() {
    "use strict";
    function e(e) {
        function t(e, t) {
            this.$scope = e, this.$element = t
        }
        return {restrict: "E",controller: ["$scope", "$element", t],link: function(t, n) {
                e(n), t.$broadcast("$mdContentLoaded", n)
            }}
    }
    angular.module("material.components.content", ["material.core"]).directive("mdContent", e), e.$inject = ["$mdTheming"]
}(), function() {
    "use strict";
    function e(e, t) {
        return {restrict: "E",link: function(n, o) {
                t(o), e(function() {
                    var e = o[0].querySelector("md-content");
                    e && e.scrollHeight > e.clientHeight && o.addClass("md-content-overflow")
                })
            }}
    }
    function t(e) {
        function t(e) {
            return {template: ['<md-dialog aria-label="{{ dialog.ariaLabel }}">', "<md-content>", "<h2>{{ dialog.title }}</h2>", "<p>{{ dialog.content }}</p>", "</md-content>", '<div class="md-actions">', '<md-button ng-if="dialog.$type == \'confirm\'" ng-click="dialog.abort()">', "{{ dialog.cancel }}", "</md-button>", '<md-button ng-click="dialog.hide()" class="md-primary">', "{{ dialog.ok }}", "</md-button>", "</div>", "</md-dialog>"].join(""),controller: function() {
                    this.hide = function() {
                        e.hide(!0)
                    }, this.abort = function() {
                        e.cancel()
                    }
                },controllerAs: "dialog",bindToController: !0}
        }
        function n(e, t, n, o, a, r, i, l, d, s, c, m) {
            function u(n, a, r) {
                function i() {
                    var e = a[0].querySelector(".dialog-close");
                    if (!e) {
                        var t = a[0].querySelectorAll(".md-actions button");
                        e = t[t.length - 1]
                    }
                    return angular.element(e)
                }
                r.parent = angular.element(r.parent), r.popInTarget = angular.element((r.targetEvent || {}).target);
                var s = i();
                return h(a.find("md-dialog")), r.hasBackdrop && (r.backdrop = angular.element('<md-backdrop class="md-dialog-backdrop md-opaque">'), d.inherit(r.backdrop, r.parent), o.enter(r.backdrop, r.parent)), r.disableParentScroll && (r.oldOverflowStyle = r.parent.css("overflow"), r.parent.css("overflow", "hidden")), f(a, r.parent, r.popInTarget && r.popInTarget.length && r.popInTarget).then(function() {
                    r.escapeToClose && (r.rootElementKeyupCallback = function(t) {
                        t.keyCode === l.KEY_CODE.ESCAPE && e(m.cancel)
                    }, t.on("keyup", r.rootElementKeyupCallback)), r.clickOutsideToClose && (r.dialogClickOutsideCallback = function(t) {
                        t.target === a[0] && e(m.cancel)
                    }, a.on("click", r.dialogClickOutsideCallback)), s.focus()
                })
            }
            function p(e, n, a) {
                return a.backdrop && o.leave(a.backdrop), a.disableParentScroll && (a.parent.css("overflow", a.oldOverflowStyle), r[0].removeEventListener("scroll", a.captureScroll, !0)), a.escapeToClose && t.off("keyup", a.rootElementKeyupCallback), a.clickOutsideToClose && n.off("click", a.dialogClickOutsideCallback), g(n, a.parent, a.popInTarget && a.popInTarget.length && a.popInTarget).then(function() {
                    a.scope.$destroy(), n.remove(), a.popInTarget && a.popInTarget.focus()
                })
            }
            function h(e) {
                e.attr({role: "dialog"});
                var t = e.find("md-content");
                0 === t.length && (t = e), a.expectAsync(e, "aria-label", function() {
                    var e = t.text().split(/\s+/);
                    return e.length > 3 && (e = e.slice(0, 3).concat("...")), e.join(" ")
                })
            }
            function f(e, t, n) {
                var o = e.find("md-dialog");
                return t.append(e), b(o, n), s(function() {
                    o.addClass("transition-in").css(l.CSS.TRANSFORM, "")
                }), v(o)
            }
            function g(e, t, n) {
                var o = e.find("md-dialog");
                return o.addClass("transition-out").removeClass("transition-in"), b(o, n), v(o)
            }
            function b(e, t) {
                if (t) {
                    var n = t[0].getBoundingClientRect(), o = e[0].getBoundingClientRect(), a = Math.min(.5, n.width / o.width), r = Math.min(.5, n.height / o.height);
                    e.css(l.CSS.TRANSFORM, "translate3d(" + (-o.left + n.left + n.width / 2 - o.width / 2) + "px," + (-o.top + n.top + n.height / 2 - o.height / 2) + "px,0) scale(" + a + "," + r + ")")
                }
            }
            function v(e) {
                function t(o) {
                    o.target === e[0] && (e.off(l.CSS.TRANSITIONEND, t), n.resolve())
                }
                var n = c.defer();
                return e.on(l.CSS.TRANSITIONEND, t), n.promise
            }
            return {hasBackdrop: !0,isolateScope: !0,onShow: u,onRemove: p,clickOutsideToClose: !0,escapeToClose: !0,targetEvent: null,disableParentScroll: !0,transformTemplate: function(e) {
                    return '<div class="md-dialog-container">' + e + "</div>"
                }}
        }
        return t.$inject = ["$mdDialog"], n.$inject = ["$timeout", "$rootElement", "$compile", "$animate", "$mdAria", "$document", "$mdUtil", "$mdConstant", "$mdTheming", "$$rAF", "$q", "$mdDialog"], e("$mdDialog").setDefaults({methods: ["disableParentScroll", "hasBackdrop", "clickOutsideToClose", "escapeToClose", "targetEvent"],options: n}).addPreset("alert", {methods: ["title", "content", "ariaLabel", "ok"],options: t}).addPreset("confirm", {methods: ["title", "content", "ariaLabel", "ok", "cancel"],options: t})
    }
    angular.module("material.components.dialog", ["material.core", "material.components.backdrop"]).directive("mdDialog", e).provider("$mdDialog", t), e.$inject = ["$$rAF", "$mdTheming"], t.$inject = ["$$interimElementProvider"]
}(), function() {
    "use strict";
    function e() {
    }
    function t(t) {
        return {restrict: "E",link: t,controller: [e]}
    }
    angular.module("material.components.divider", ["material.core"]).directive("mdDivider", t), t.$inject = ["$mdTheming"]
}(), function() {
    "use strict";
    function e() {
        return {restrict: "E",template: '<object class="md-icon"></object>',compile: function(e, t) {
                var n = angular.element(e[0].children[0]);
                angular.isDefined(t.icon) && n.attr("data", t.icon)
            }}
    }
    angular.module("material.components.icon", ["material.core"]).directive("mdIcon", e)
}(), function() {
    function e(e) {
        function t(t, n) {
            e(n)
        }
        function n(e, t) {
            var n = this;
            n.element = t, n.setFocused = function(e) {
                t.toggleClass("md-input-focused", !!e)
            }, n.setHasValue = function(e) {
                t.toggleClass("md-input-has-value", !!e)
            }, n.setInvalid = function(e) {
                t.toggleClass("md-input-invalid", !!e)
            }, e.$watch(function() {
                return n.label && n.input
            }, function(e) {
                e && !n.label.attr("for") && n.label.attr("for", n.input.attr("id"))
            })
        }
        return n.$inject = ["$scope", "$element", "$mdUtil"], {restrict: "E",link: t,controller: n}
    }
    function t() {
        return {restrict: "E",require: "^?mdInputContainer",link: function(e, t, n, o) {
                o && (o.label = t, e.$on("$destroy", function() {
                    o.label = null
                }))
            }}
    }
    function n(e, t) {
        function n(n, o, a, r) {
            function i(e) {
                return s.setHasValue(!c.$isEmpty(e)), e
            }
            function l() {
                s.setHasValue(o.val().length > 0 || (o[0].validity || {}).badInput)
            }
            function d() {
                function a(e) {
                    return d(), e
                }
                function r() {
                    l.style.height = "auto";
                    var e = l.scrollHeight - l.offsetHeight;
                    l.scrollTop = 0;
                    var t = l.offsetHeight + (e > 0 ? e : 0);
                    l.style.height = t + "px"
                }
                function i() {
                    l.scrollTop = 0;
                    var e = l.scrollHeight - l.offsetHeight, t = l.offsetHeight + e;
                    l.style.height = t + "px"
                }
                var l = o[0], d = e.debounce(r, 1);
                c ? (c.$formatters.push(a), c.$viewChangeListeners.push(a)) : d(), o.on("keydown input", d), o.on("scroll", i), angular.element(t).on("resize", d), n.$on("$destroy", function() {
                    angular.element(t).off("resize", d)
                })
            }
            var s = r[0], c = r[1] || e.fakeNgModel();
            if (s) {
                if (s.input)
                    throw new Error("<md-input-container> can only have *one* <input> or <textarea> child element!");
                s.input = o, o.addClass("md-input"), o.attr("id") || o.attr("id", "input_" + e.nextUid()), "textarea" === o[0].tagName.toLowerCase() && d(), n.$watch(function() {
                    return c.$dirty && c.$invalid
                }, s.setInvalid), c.$parsers.push(i), c.$formatters.push(i), o.on("input", l).on("focus", function() {
                    s.setFocused(!0)
                }).on("blur", function() {
                    s.setFocused(!1), l()
                }), n.$on("$destroy", function() {
                    s.setFocused(!1), s.setHasValue(!1), s.input = null
                })
            }
        }
        return {restrict: "E",require: ["^?mdInputContainer", "?ngModel"],link: n}
    }
    function o(e) {
        function t(t, n, o, a) {
            function r(e) {
                return s.text((n.val() || e || "").length + "/" + i), e
            }
            var i, l = a[0], d = a[1], s = angular.element('<div class="md-char-counter">');
            o.$set("ngTrim", "false"), d.element.append(s), l.$formatters.push(r), l.$viewChangeListeners.push(r), n.on("input keydown", function() {
                r()
            }), t.$watch(o.mdMaxlength, function(t) {
                i = t, angular.isNumber(t) && t > 0 ? (s.parent().length || e.enter(s, d.element, angular.element(d.element[0].lastElementChild)), r()) : e.leave(s)
            }), l.$validators["md-maxlength"] = function(e, t) {
                return !angular.isNumber(i) || 0 > i ? !0 : (e || n.val() || t || "").length <= i
            }
        }
        return {restrict: "A",require: ["ngModel", "^mdInputContainer"],link: t}
    }
    angular.module("material.components.input", ["material.core"]).directive("mdInputContainer", e).directive("label", t).directive("input", n).directive("textarea", n).directive("mdMaxlength", o), e.$inject = ["$mdTheming"], n.$inject = ["$mdUtil", "$window", "$compile", "$animate"], o.$inject = ["$animate"]
}(), function() {
    "use strict";
    function e() {
        return {restrict: "E",link: function(e, t) {
                t.attr({role: "list"})
            }}
    }
    function t() {
        return {restrict: "E",link: function(e, t) {
                t.attr({role: "listitem"})
            }}
    }
    angular.module("material.components.list", ["material.core"]).directive("mdList", e).directive("mdItem", t)
}(), function() {
    "use strict";
    function e(e, t, n) {
        function o(e) {
            return e.attr("aria-valuemin", 0), e.attr("aria-valuemax", 100), e.attr("role", "progressbar"), a
        }
        function a(e, o, a) {
            n(o);
            var d, s, c, m, u = o[0], p = u.querySelectorAll(".md-fill, .md-mask.md-full"), h = u.querySelectorAll(".md-fill.md-fix"), f = a.mdDiameter || 48, g = f / 48;
            u.style[t.CSS.TRANSFORM] = "scale(" + g.toString() + ")", a.$observe("value", function(e) {
                for (s = r(e), c = i[s], m = l[s], o.attr("aria-valuenow", s), d = 0; d < p.length; d++)
                    p[d].style[t.CSS.TRANSFORM] = c;
                for (d = 0; d < h.length; d++)
                    h[d].style[t.CSS.TRANSFORM] = m
            })
        }
        function r(e) {
            return e > 100 ? 100 : 0 > e ? 0 : Math.ceil(e || 0)
        }
        for (var i = new Array(101), l = new Array(101), d = 0; 101 > d; d++) {
            var s = d / 100, c = Math.floor(180 * s);
            i[d] = "rotate(" + c.toString() + "deg)", l[d] = "rotate(" + (2 * c).toString() + "deg)"
        }
        return {restrict: "E",template: '<div class="md-spinner-wrapper"><div class="md-inner"><div class="md-gap"></div><div class="md-left"><div class="md-half-circle"></div></div><div class="md-right"><div class="md-half-circle"></div></div></div></div>',compile: o}
    }
    angular.module("material.components.progressCircular", ["material.core"]).directive("mdProgressCircular", e), e.$inject = ["$$rAF", "$mdConstant", "$mdTheming"]
}(), function() {
    "use strict";
    function e(e, n, o) {
        function a(e) {
            return e.attr("aria-valuemin", 0), e.attr("aria-valuemax", 100), e.attr("role", "progressbar"), r
        }
        function r(a, r, l) {
            o(r);
            var d = r[0].querySelector(".md-bar1").style, s = r[0].querySelector(".md-bar2").style, c = angular.element(r[0].querySelector(".md-container"));
            l.$observe("value", function(e) {
                if ("query" != l.mdMode) {
                    var o = i(e);
                    r.attr("aria-valuenow", o), s[n.CSS.TRANSFORM] = t[o]
                }
            }), l.$observe("mdBufferValue", function(e) {
                d[n.CSS.TRANSFORM] = t[i(e)]
            }), e(function() {
                c.addClass("md-ready")
            })
        }
        function i(e) {
            return e > 100 ? 100 : 0 > e ? 0 : Math.ceil(e || 0)
        }
        return {restrict: "E",template: '<div class="md-container"><div class="md-dashed"></div><div class="md-bar md-bar1"></div><div class="md-bar md-bar2"></div></div>',compile: a}
    }
    angular.module("material.components.progressLinear", ["material.core"]).directive("mdProgressLinear", e), e.$inject = ["$$rAF", "$mdConstant", "$mdTheming"];
    var t = function() {
        function e(e) {
            var t = e / 100, n = (e - 100) / 2;
            return "translateX(" + n.toString() + "%) scale(" + t.toString() + ", 1)"
        }
        for (var t = new Array(101), n = 0; 101 > n; n++)
            t[n] = e(n);
        return t
    }()
}(), function() {
    "use strict";
    function e(e, t, n) {
        function o(o, a, r, i) {
            function l(n) {
                switch (n.keyCode) {
                    case t.KEY_CODE.LEFT_ARROW:
                    case t.KEY_CODE.UP_ARROW:
                        n.preventDefault(), d.selectPrevious();
                        break;
                    case t.KEY_CODE.RIGHT_ARROW:
                    case t.KEY_CODE.DOWN_ARROW:
                        n.preventDefault(), d.selectNext();
                        break;
                    case t.KEY_CODE.ENTER:
                        var o = angular.element(e.getClosest(a[0], "form"));
                        o.length > 0 && o.triggerHandler("submit")
                }
            }
            n(a);
            var d = i[0], s = i[1] || e.fakeNgModel();
            d.init(s), a.attr({role: "radiogroup",tabIndex: a.attr("tabindex") || "0"}).on("keydown", l)
        }
        function a(e) {
            this._radioButtonRenderFns = [], this.$element = e
        }
        function r() {
            return {init: function(e) {
                    this._ngModelCtrl = e, this._ngModelCtrl.$render = angular.bind(this, this.render)
                },add: function(e) {
                    this._radioButtonRenderFns.push(e)
                },remove: function(e) {
                    var t = this._radioButtonRenderFns.indexOf(e);
                    -1 !== t && this._radioButtonRenderFns.splice(t, 1)
                },render: function() {
                    this._radioButtonRenderFns.forEach(function(e) {
                        e()
                    })
                },setViewValue: function(e, t) {
                    this._ngModelCtrl.$setViewValue(e, t), this.render()
                },getViewValue: function() {
                    return this._ngModelCtrl.$viewValue
                },selectNext: function() {
                    return i(this.$element, 1)
                },selectPrevious: function() {
                    return i(this.$element, -1)
                },setActiveDescendant: function(e) {
                    this.$element.attr("aria-activedescendant", e)
                }}
        }
        function i(t, n) {
            var o = e.iterator(Array.prototype.slice.call(t[0].querySelectorAll("md-radio-button")), !0);
            if (o.count()) {
                var a = function(e) {
                    return !angular.element(e).attr("disabled")
                }, r = t[0].querySelector("md-radio-button.md-checked"), i = o[0 > n ? "previous" : "next"](r, a) || o.first();
                angular.element(i).triggerHandler("click")
            }
        }
        return a.prototype = r(), {restrict: "E",controller: ["$element", a],require: ["mdRadioGroup", "?ngModel"],link: {pre: o}}
    }
    function t(e, t, n) {
        function o(o, r, i, l) {
            function d(e) {
                r[0].hasAttribute("disabled") || o.$apply(function() {
                    l.setViewValue(i.value, e && e.type)
                })
            }
            function s() {
                var e = l.getViewValue() == i.value;
                e !== m && (m = e, r.attr("aria-checked", e), e ? (r.addClass(a), l.setActiveDescendant(r.attr("id"))) : r.removeClass(a))
            }
            function c(n, o) {
                function a() {
                    return i.id || "radio_" + t.nextUid()
                }
                o.ariaId = a(), n.attr({id: o.ariaId,role: "radio","aria-checked": "false"}), e.expectWithText(n, "aria-label")
            }
            var m;
            n(r), c(r, o), l.add(s), i.$observe("value", s), r.on("click", d).on("$destroy", function() {
                l.remove(s)
            })
        }
        var a = "md-checked";
        return {restrict: "E",require: "^mdRadioGroup",transclude: !0,template: '<div class="md-container" md-ink-ripple md-ink-ripple-checkbox><div class="md-off"></div><div class="md-on"></div></div><div ng-transclude class="md-label"></div>',link: o}
    }
    angular.module("material.components.radioButton", ["material.core"]).directive("mdRadioGroup", e).directive("mdRadioButton", t), e.$inject = ["$mdUtil", "$mdConstant", "$mdTheming"], t.$inject = ["$mdAria", "$mdUtil", "$mdTheming"]
}(), function() {
    "use strict";
    function e(e, t) {
        return function(n) {
            var o = "SideNav '" + n + "' is not available!", a = e.get(n);
            return a || e.notFoundError(n), {isOpen: function() {
                    return a && a.isOpen()
                },isLockedOpen: function() {
                    return a && a.isLockedOpen()
                },toggle: function() {
                    return a ? a.toggle() : t.reject(o)
                },open: function() {
                    return a ? a.open() : t.reject(o)
                },close: function() {
                    return a ? a.close() : t.reject(o)
                }}
        }
    }
    function t(e, t, n, o, a, r, i, l, d) {
        function s(s, c, m, u) {
            function p(e, n) {
                s.isLockedOpen = e, e === n ? c.toggleClass("md-locked-open", !!e) : t[e ? "addClass" : "removeClass"](c, "md-locked-open"), $.toggleClass("md-locked-open", !!e)
            }
            function h(e) {
                var n = c.parent();
                return n[e ? "on" : "off"]("keydown", g), $[e ? "on" : "off"]("click", b), e && (v = d[0].activeElement), E = l.all([t[e ? "enter" : "leave"]($, n), t[e ? "removeClass" : "addClass"](c, "md-closed").then(function() {
                        s.isOpen && c.focus()
                    })])
            }
            function f(t) {
                if (s.isOpen == t)
                    return l.when(!0);
                var n = l.defer();
                return s.isOpen = t, e(function() {
                    E.then(function(e) {
                        s.isOpen || (v && v.focus(), v = null), n.resolve(e)
                    })
                }, 0, !1), n.promise
            }
            function g(e) {
                var t = e.keyCode === a.KEY_CODE.ESCAPE;
                return t ? b(e) : l.when(!0)
            }
            function b(e) {
                return e.preventDefault(), e.stopPropagation(), u.close()
            }
            var v = null, E = l.when(!0), y = n(m.mdIsLockedOpen), T = function() {
                return y(s.$parent, {$media: o})
            }, $ = r('<md-backdrop class="md-sidenav-backdrop md-opaque ng-enter">')(s);
            c.on("$destroy", u.destroy), i.inherit($, c), s.$watch(T, p), s.$watch("isOpen", h), u.$toggleOpen = f
        }
        return {restrict: "E",scope: {isOpen: "=?mdIsOpen"},controller: "$mdSidenavController",compile: function(e) {
                return e.addClass("md-closed"), e.attr("tabIndex", "-1"), s
            }}
    }
    function n(e, t, n, o, a) {
        var r = this;
        r.$toggleOpen = function() {
            return a.when(e.isOpen)
        }, r.isOpen = function() {
            return !!e.isOpen
        }, r.isLockedOpen = function() {
            return !!e.isLockedOpen
        }, r.open = function() {
            return r.$toggleOpen(!0)
        }, r.close = function() {
            return r.$toggleOpen(!1)
        }, r.toggle = function() {
            return r.$toggleOpen(!e.isOpen)
        }, r.destroy = o.register(r, n.mdComponentId)
    }
    angular.module("material.components.sidenav", ["material.core", "material.components.backdrop"]).factory("$mdSidenav", e).directive("mdSidenav", t).controller("$mdSidenavController", n), e.$inject = ["$mdComponentRegistry", "$q"], t.$inject = ["$timeout", "$animate", "$parse", "$mdMedia", "$mdConstant", "$compile", "$mdTheming", "$q", "$document"], n.$inject = ["$scope", "$element", "$attrs", "$mdComponentRegistry", "$q"]
}(), function() {
    "use strict";
    function e(e) {
        function n(t, n, o, a) {
            e(n);
            var r = a[0] || {$setViewValue: function(e) {
                    this.$viewValue = e, this.$viewChangeListeners.forEach(function(e) {
                        e()
                    })
                },$parsers: [],$formatters: [],$viewChangeListeners: []}, i = a[1];
            i.init(r)
        }
        return {scope: {},require: ["?ngModel", "mdSlider"],controller: t,template: '<div class="md-track-container"><div class="md-track"></div><div class="md-track md-track-fill"></div><div class="md-track-ticks"></div></div><div class="md-thumb-container"><div class="md-thumb"></div><div class="md-focus-thumb"></div><div class="md-focus-ring"></div><div class="md-sign"><span class="md-thumb-text"></span></div><div class="md-disabled-thumb"></div></div>',link: n}
    }
    function t(e, t, n, o, a, r, i, l) {
        this.init = function(d) {
            function s() {
                f(), E(), h()
            }
            function c(e) {
                F = parseFloat(e), t.attr("aria-valuemin", e), s()
            }
            function m(e) {
                q = parseFloat(e), t.attr("aria-valuemax", e), s()
            }
            function u(e) {
                z = parseFloat(e), h()
            }
            function p(e) {
                t.attr("aria-disabled", !!e)
            }
            function h() {
                if (angular.isDefined(n.mdDiscrete)) {
                    var e = Math.floor((q - F) / z);
                    if (!V) {
                        var t = a.getComputedStyle(B[0]);
                        V = angular.element('<canvas style="position:absolute;">'), W = V[0].getContext("2d"), W.fillStyle = t.backgroundColor || "black", B.append(V)
                    }
                    var o = g();
                    V[0].width = o.width, V[0].height = o.height;
                    for (var r, i = 0; e >= i; i++)
                        r = Math.floor(o.width * (i / e)), W.fillRect(r - 1, 0, 2, o.height)
                }
            }
            function f() {
                Y = I[0].getBoundingClientRect()
            }
            function g() {
                return R(), Y
            }
            function b(n) {
                if (!t[0].hasAttribute("disabled")) {
                    var o;
                    n.keyCode === l.KEY_CODE.LEFT_ARROW ? o = -z : n.keyCode === l.KEY_CODE.RIGHT_ARROW && (o = z), o && ((n.metaKey || n.ctrlKey || n.altKey) && (o *= 4), n.preventDefault(), n.stopPropagation(), e.$evalAsync(function() {
                        v(d.$viewValue + o)
                    }))
                }
            }
            function v(e) {
                d.$setViewValue(y(T(e)))
            }
            function E() {
                isNaN(d.$viewValue) && (d.$viewValue = d.$modelValue);
                var n = (d.$viewValue - F) / (q - F);
                e.modelValue = d.$viewValue, t.attr("aria-valuenow", d.$viewValue), $(n), D.text(d.$viewValue)
            }
            function y(e) {
                return angular.isNumber(e) ? Math.max(F, Math.min(q, e)) : void 0
            }
            function T(e) {
                return angular.isNumber(e) ? Math.round(e / z) * z : void 0
            }
            function $(e) {
                j.css("width", 100 * e + "%"), P.css(l.CSS.TRANSFORM, "translate3d(" + g().width * e + "px,0,0)"), t.toggleClass("md-min", 0 === e)
            }
            function M(e) {
                G || e.eventType !== Hammer.INPUT_START || t[0].hasAttribute("disabled") ? G && e.eventType === Hammer.INPUT_END && (G && K && w(e), G = !1, t.removeClass("panning active")) : (G = !0, t.addClass("active"), t[0].focus(), f(), A(e), e.srcEvent.stopPropagation())
            }
            function x() {
                G && t.addClass("panning")
            }
            function A(e) {
                G && (K ? k(e.center.x) : C(e.center.x), e.preventDefault(), e.srcEvent.stopPropagation())
            }
            function w(e) {
                if (K && !t[0].hasAttribute("disabled")) {
                    var n = N(S(e.center.x)), a = y(T(n));
                    $(_(a)), o(function() {
                        v(a)
                    }), e.preventDefault(), e.srcEvent.stopPropagation()
                }
            }
            function C(t) {
                e.$evalAsync(function() {
                    v(N(S(t)))
                })
            }
            function k(e) {
                var t = N(S(e)), n = y(T(t));
                $(S(e)), D.text(n)
            }
            function S(e) {
                return Math.max(0, Math.min(1, (e - Y.left) / Y.width))
            }
            function N(e) {
                return F + e * (q - F)
            }
            function _(e) {
                return (e - F) / (q - F)
            }
            var H = angular.element(t[0].querySelector(".md-thumb")), D = angular.element(t[0].querySelector(".md-thumb-text")), P = H.parent(), I = angular.element(t[0].querySelector(".md-track-container")), j = angular.element(t[0].querySelector(".md-track-fill")), B = angular.element(t[0].querySelector(".md-track-ticks")), R = i.throttle(f, 5e3);
            n.min ? n.$observe("min", c) : c(0), n.max ? n.$observe("max", m) : m(100), n.step ? n.$observe("step", u) : u(1);
            var O = angular.noop;
            n.ngDisabled && (O = e.$parent.$watch(n.ngDisabled, p)), r.expect(t, "aria-label"), t.attr("tabIndex", 0), t.attr("role", "slider"), t.on("keydown", b);
            var U = new Hammer(t[0], {recognizers: [[Hammer.Pan, {direction: Hammer.DIRECTION_HORIZONTAL}]]});
            U.on("hammer.input", M), U.on("panstart", x), U.on("pan", A), U.on("panend", w), setTimeout(s);
            var L = o.debounce(s);
            angular.element(a).on("resize", L), e.$on("$destroy", function() {
                angular.element(a).off("resize", L), U.destroy(), O()
            }), d.$render = E, d.$viewChangeListeners.push(E), d.$formatters.push(y), d.$formatters.push(T);
            var F, q, z, V, W, Y = {};
            f();
            var G = !1, K = angular.isDefined(n.mdDiscrete);
            this._onInput = M, this._onPanStart = x, this._onPan = A
        }
    }
    angular.module("material.components.slider", ["material.core"]).directive("mdSlider", e), e.$inject = ["$mdTheming"], t.$inject = ["$scope", "$element", "$attrs", "$$rAF", "$window", "$mdAria", "$mdUtil", "$mdConstant"]
}(), function() {
    "use strict";
    function e(e, t, n, o, a) {
        function r(e) {
            function n(e, t) {
                t.addClass("md-sticky-clone"), t.css("top", h + "px");
                var n = {element: e,clone: t};
                return p.items.push(n), m.parent().prepend(n.clone), u(), function() {
                    p.items.forEach(function(t, n) {
                        t.element[0] === e[0] && (p.items.splice(n, 1), t.clone.remove())
                    }), u()
                }
            }
            function a() {
                p.items.forEach(r), p.items = p.items.sort(function(e, t) {
                    return e.top < t.top ? -1 : 1
                });
                for (var e, t = m.prop("scrollTop"), n = p.items.length - 1; n >= 0; n--)
                    if (t > p.items[n].top) {
                        e = p.items[n];
                        break
                    }
                d(e)
            }
            function r(e) {
                var t = e.element[0];
                for (e.top = 0, e.left = 0; t && t !== m[0]; )
                    e.top += t.offsetTop, e.left += t.offsetLeft, t = t.offsetParent;
                e.height = e.element.prop("offsetHeight"), e.clone.css("margin-left", e.left + "px")
            }
            function i() {
                var e = m.prop("scrollTop"), t = e > (i.prevScrollTop || 0);
                i.prevScrollTop = e, 0 === e ? d(null) : t && p.next ? p.next.top - e <= 0 ? d(p.next) : p.current && (p.next.top - e <= p.next.height ? c(p.current, p.next.top - p.next.height - e) : c(p.current, null)) : !t && p.current && (e < p.current.top && d(p.prev), p.current && p.next && (e >= p.next.top - p.current.height ? c(p.current, p.next.top - e - p.current.height) : c(p.current, null)))
            }
            function d(e) {
                if (p.current !== e) {
                    p.current && (c(p.current, null), s(p.current, null)), e && s(e, "active"), p.current = e;
                    var t = p.items.indexOf(e);
                    p.next = p.items[t + 1], p.prev = p.items[t - 1], s(p.next, "next"), s(p.prev, "prev")
                }
            }
            function s(e, t) {
                e && e.state !== t && (e.state && (e.clone.attr("sticky-prev-state", e.state), e.element.attr("sticky-prev-state", e.state)), e.clone.attr("sticky-state", t), e.element.attr("sticky-state", t), e.state = t)
            }
            function c(e, n) {
                e && (null === n || void 0 === n ? e.translateY && (e.translateY = null, e.clone.css(t.CSS.TRANSFORM, "")) : (e.translateY = n, e.clone.css(t.CSS.TRANSFORM, "translate3d(" + e.left + "px," + n + "px,0)")))
            }
            var m = e.$element, u = o.debounce(a);
            l(m), m.on("$scrollstart", u), m.on("$scroll", i);
            var p, h = m.prop("offsetTop");
            return p = {prev: null,current: null,next: null,items: [],add: n,refreshElements: a}
        }
        function i() {
            var t, n = angular.element("<div>");
            e[0].body.appendChild(n[0]);
            for (var o = ["sticky", "-webkit-sticky"], a = 0; a < o.length; ++a)
                if (n.css({position: o[a],top: 0,"z-index": 2}), n.css("position") == o[a]) {
                    t = o[a];
                    break
                }
            return n.remove(), t
        }
        function l(e) {
            function t() {
                +a.now() - r > i ? (n = !1, e.triggerHandler("$scrollend")) : (e.triggerHandler("$scroll"), o(t))
            }
            var n, r, i = 200;
            e.on("scroll touchmove", function() {
                n || (n = !0, o(t), e.triggerHandler("$scrollstart")), e.triggerHandler("$scroll"), r = +a.now()
            })
        }
        var d = i();
        return function(e, t, n) {
            var o = t.controller("mdContent");
            if (o)
                if (d)
                    t.css({position: d,top: 0,"z-index": 2});
                else {
                    var a = o.$element.data("$$sticky");
                    a || (a = r(o), o.$element.data("$$sticky", a));
                    var i = a.add(t, n || t.clone());
                    e.$on("$destroy", i)
                }
        }
    }
    angular.module("material.components.sticky", ["material.core", "material.components.content"]).factory("$mdSticky", e), e.$inject = ["$document", "$mdConstant", "$compile", "$$rAF", "$mdUtil"]
}(), function() {
    "use strict";
    function e(e, t, n) {
        return {restrict: "E",replace: !0,transclude: !0,template: '<h2 class="md-subheader"><span class="md-subheader-content"></span></h2>',compile: function(o, a, r) {
                var i = o[0].outerHTML;
                return function(o, a) {
                    function l(e) {
                        return angular.element(e[0].querySelector(".md-subheader-content"))
                    }
                    n(a), r(o, function(e) {
                        l(a).append(e)
                    }), r(o, function(r) {
                        var d = t(angular.element(i))(o);
                        n(d), l(d).append(r), e(o, a, d)
                    })
                }
            }}
    }
    angular.module("material.components.subheader", ["material.core", "material.components.sticky"]).directive("mdSubheader", e), e.$inject = ["$mdSticky", "$compile", "$mdTheming"]
}(), function() {
    "use strict";
    function e() {
        return function(e, t) {
            return t || (t = "swipeleft swiperight"), function(n, o, a) {
                function r(t) {
                    t.srcEvent.stopPropagation(), angular.isFunction(o) && e.$apply(function() {
                        o(t)
                    })
                }
                function i() {
                    return d.on(t, r), function() {
                        d.off(t)
                    }
                }
                function l(e, t) {
                    var n = t.indexOf("pan") > -1, o = t.indexOf("swipe") > -1;
                    return n && e.push([Hammer.Pan, {direction: Hammer.DIRECTION_HORIZONTAL}]), o && e.push([Hammer.Swipe, {direction: Hammer.DIRECTION_HORIZONTAL}]), e
                }
                var d = new Hammer(n[0], {recognizers: l([], t)});
                return a || i(), e.$on("$destroy", function() {
                    d.destroy()
                }), i
            }
        }
    }
    function t(e, t) {
        return {restrict: "A",link: o(e, t, "SwipeLeft")}
    }
    function n(e, t) {
        return {restrict: "A",link: o(e, t, "SwipeRight")}
    }
    function o(e, t, n) {
        return function(o, a, r) {
            var i = n.toLowerCase(), l = "md" + n, d = e(r[l]) || angular.noop, s = t(o, i), c = function(e) {
                d(o, e)
            };
            s(a, function(e) {
                e.type == i && c()
            })
        }
    }
    angular.module("material.components.swipe", []).factory("$mdSwipe", e).directive("mdSwipeLeft", t).directive("mdSwipeRight", n), t.$inject = ["$parse", "$mdSwipe"], n.$inject = ["$parse", "$mdSwipe"]
}(), function() {
    "use strict";
    function e(e, t, n, o, a, r, i) {
        function l(e, t) {
            var o = d.compile(e, t);
            return e.addClass("md-dragging"), function(e, t, l, d) {
                function s(n, o) {
                    return u(e) ? n.preventDefault() : (o.width = p.prop("offsetWidth"), t.addClass("md-dragging"), void 0)
                }
                function c(e, t) {
                    var n = t.distance / t.width, o = d.$viewValue ? 1 - n : -n;
                    o = Math.max(0, Math.min(1, o)), p.css(a.CSS.TRANSFORM, "translate3d(" + 100 * o + "%,0,0)"), t.translate = o
                }
                function m(n, o) {
                    if (u(e))
                        return !1;
                    t.removeClass("md-dragging"), p.css(a.CSS.TRANSFORM, "");
                    var r = Math.abs(o.distance || 0) < 2 || (d.$viewValue ? o.translate < .5 : o.translate > .5);
                    r && e.$apply(function() {
                        d.$setViewValue(!d.$viewValue), d.$render()
                    })
                }
                d = d || n.fakeNgModel();
                var u = r(l.ngDisabled), p = angular.element(t[0].querySelector(".md-thumb-container")), h = angular.element(t[0].querySelector(".md-container"));
                i(function() {
                    t.removeClass("md-dragging")
                }), l.mdNoClick = !0, o(e, t, l, d), n.attachDragBehavior(e, h), h.on("$md.dragstart", s).on("$md.drag", c).on("$md.dragend", m)
            }
        }
        var d = e[0];
        return {restrict: "E",transclude: !0,template: '<div class="md-container"><div class="md-bar"></div><div class="md-thumb-container"><div class="md-thumb" md-ink-ripple md-ink-ripple-checkbox></div></div></div><div ng-transclude class="md-label"></div>',require: "?ngModel",compile: l}
    }
    angular.module("material.components.switch", ["material.core", "material.components.checkbox"]).directive("mdSwitch", e), e.$inject = ["mdCheckboxDirective", "$mdTheming", "$mdUtil", "$document", "$mdConstant", "$parse", "$$rAF"]
}(), function() {
    "use strict";
    angular.module("material.components.tabs", ["material.core"])
}(), function() {
    "use strict";
    function e(e, t, n, o) {
        return {restrict: "E",replace: !0,scope: {fid: "@?mdFid",label: "@?",value: "=ngModel"},compile: function(a, r) {
                return o.warn("<md-text-float> is deprecated. Please use `<md-input-container>` and `<input>`.More information at http://material.angularjs.org/#/api/material.components.input/directive/mdInputContainer"), angular.isUndefined(r.mdFid) && (r.mdFid = t.nextUid()), {pre: function(e, t, o) {
                        var a = n(o.ngDisabled);
                        e.isDisabled = function() {
                            return a(e.$parent)
                        }, e.inputType = o.type || "text"
                    },post: e}
            },template: '<md-input-group tabindex="-1"> <label for="{{fid}}" >{{label}}</label> <md-input id="{{fid}}" ng-disabled="isDisabled()" ng-model="value" type="{{inputType}}"></md-input></md-input-group>'}
    }
    function t(e) {
        return {restrict: "CE",controller: ["$element", function(t) {
                    e.warn("<md-input-group> is deprecated. Please use `<md-input-container>` and `<input>`.More information at http://material.angularjs.org/#/api/material.components.input/directive/mdInputContainer"), this.setFocused = function(e) {
                        t.toggleClass("md-input-focused", !!e)
                    }, this.setHasValue = function(e) {
                        t.toggleClass("md-input-has-value", e)
                    }
                }]}
    }
    function n(e, t) {
        return {restrict: "E",replace: !0,template: "<input >",require: ["^?mdInputGroup", "?ngModel"],link: function(e, n, o, a) {
                function r(e) {
                    return e = angular.isUndefined(e) ? n.val() : e, angular.isDefined(e) && null !== e && "" !== e.toString().trim()
                }
                if (a[0]) {
                    t.warn("<md-input> is deprecated. Please use `<md-input-container>` and `<input>`.More information at http://material.angularjs.org/#/api/material.components.input/directive/mdInputContainer");
                    var i = a[0], l = a[1];
                    e.$watch(e.isDisabled, function(e) {
                        n.attr("aria-disabled", !!e), n.attr("tabindex", !!e)
                    }), n.attr("type", o.type || n.parent().attr("type") || "text"), l && l.$formatters.push(function(e) {
                        return i.setHasValue(r(e)), e
                    }), n.on("input", function() {
                        i.setHasValue(r())
                    }).on("focus", function() {
                        i.setFocused(!0)
                    }).on("blur", function() {
                        i.setFocused(!1), i.setHasValue(r())
                    }), e.$on("$destroy", function() {
                        i.setFocused(!1), i.setHasValue(!1)
                    })
                }
            }}
    }
    angular.module("material.components.textField", ["material.core"]).directive("mdInputGroup", t).directive("mdInput", n).directive("mdTextFloat", e), e.$inject = ["$mdTheming", "$mdUtil", "$parse", "$log"], t.$inject = ["$log"], n.$inject = ["$mdUtil", "$log"]
}(), function() {
    "use strict";
    function e() {
        return {restrict: "E"}
    }
    function t(e) {
        function t(e, t, n, o, a) {
            function r(o, r, i) {
                r.addClass(i.position.split(" ").map(function(e) {
                    return "md-" + e
                }).join(" ")), i.parent.addClass(l(i.position));
                var d = n(o, "swipeleft swiperight");
                return i.detachSwipe = d(r, function(t) {
                    r.addClass("md-" + t.type), e(a.cancel)
                }), t.enter(r, i.parent)
            }
            function i(e, n, o) {
                return o.detachSwipe(), o.parent.removeClass(l(o.position)), t.leave(n)
            }
            function l(e) {
                return "md-toast-open-" + (e.indexOf("top") > -1 ? "top" : "bottom")
            }
            return {onShow: r,onRemove: i,position: "bottom left",themable: !0,hideDelay: 3e3}
        }
        return t.$inject = ["$timeout", "$animate", "$mdSwipe", "$mdTheming", "$mdToast"], e("$mdToast").setDefaults({methods: ["position", "hideDelay", "capsule"],options: t}).addPreset("simple", {argOption: "content",methods: ["content", "action", "highlightAction"],options: ["$mdToast", function(e) {
                    return {template: ["<md-toast ng-class=\"{'md-capsule': toast.capsule}\">", "<span flex>{{ toast.content }}</span>", '<md-button class="md-action" ng-if="toast.action" ng-click="toast.resolve()" ng-class="{\'md-highlight\': toast.highlightAction}">', "{{ toast.action }}", "</md-button>", "</md-toast>"].join(""),controller: function() {
                            this.resolve = function() {
                                e.hide()
                            }
                        },controllerAs: "toast",bindToController: !0}
                }]})
    }
    angular.module("material.components.toast", ["material.core", "material.components.swipe", "material.components.button"]).directive("mdToast", e).provider("$mdToast", t), t.$inject = ["$$interimElementProvider"]
}(), function() {
    "use strict";
    function e(e, t, n, o) {
        return {restrict: "E",controller: angular.noop,link: function(a, r, i) {
                function l() {
                    function o(t, n) {
                        r.parent()[0] === n.parent()[0] && (c && c.off("scroll", h), n.on("scroll", h), n.attr("scroll-shrink", "true"), c = n, e(l))
                    }
                    function l() {
                        s = r.prop("offsetHeight"), c.css("margin-top", -s * p + "px"), d()
                    }
                    function d(e) {
                        var n = e ? e.target.scrollTop : u;
                        f(), m = Math.min(s / p, Math.max(0, m + n - u)), r.css(t.CSS.TRANSFORM, "translate3d(0," + -m * p + "px,0)"), c.css(t.CSS.TRANSFORM, "translate3d(0," + (s - m) * p + "px,0)"), u = n
                    }
                    var s, c, m = 0, u = 0, p = i.mdShrinkSpeedFactor || .5, h = e.debounce(d), f = n.debounce(l, 5e3);
                    a.$on("$mdContentLoaded", o)
                }
                o(r), angular.isDefined(i.mdScrollShrink) && l()
            }}
    }
    angular.module("material.components.toolbar", ["material.core", "material.components.content"]).directive("mdToolbar", e), e.$inject = ["$$rAF", "$mdConstant", "$mdUtil", "$mdTheming"]
}(), function() {
    "use strict";
    function e(e, t, n, o, a, r, i) {
        function l(l, c, m) {
            function u(t) {
                u.value = !!t, u.queued || (t ? (u.queued = !0, e(function() {
                    l.visible = u.value, u.queued = !1
                }, l.delay)) : e(function() {
                    l.visible = !1
                }))
            }
            function p() {
                c.removeClass("md-hide"), g.attr("aria-describedby", c.attr("id")), v.append(c), f(), n(function() {
                    n(function() {
                        f(), l.visible && c.addClass("md-show")
                    })
                })
            }
            function h() {
                c.removeClass("md-show").addClass("md-hide"), g.removeAttr("aria-describedby"), e(function() {
                    l.visible || c.detach()
                }, 200, !1)
            }
            function f() {
                var e = a.elementRect(c, v), t = a.elementRect(g, v), n = "bottom", o = {left: t.left + t.width / 2 - e.width / 2,top: t.top + t.height};
                o.left = Math.min(o.left, v.prop("scrollWidth") - e.width - s), o.left = Math.max(o.left, s), o.top + e.height > v.prop("scrollHeight") && (o.top = t.top - e.height, n = "top"), c.css({top: o.top + "px",left: o.left + "px"}), c.attr("width-32", Math.ceil(e.width / 32)), c.attr("md-direction", n)
            }
            r(c);
            for (var g = c.parent(), b = c.parent()[0]; b && b !== i[0] && b !== document.body && (!b.tagName || "md-content" != b.tagName.toLowerCase()); )
                b = b.parentNode;
            var v = angular.element(b || document.body);
            angular.isDefined(m.mdDelay) || (l.delay = d), c.detach(), c.attr("role", "tooltip"), c.attr("id", m.id || "tooltip_" + a.nextUid()), g.on("focus mouseenter touchstart", function() {
                u(!0)
            }), g.on("blur mouseleave touchend touchcancel", function() {
                o[0].activeElement !== g[0] && u(!1)
            }), l.$watch("visible", function(e) {
                e ? p() : h()
            });
            var E = n.debounce(function() {
                l.visible && f()
            });
            angular.element(t).on("resize", E), l.$on("$destroy", function() {
                l.visible = !1, c.remove(), angular.element(t).off("resize", E)
            })
        }
        var d = 400, s = 8;
        return {restrict: "E",transclude: !0,template: '<div class="md-background"></div><div class="md-content" ng-transclude></div>',scope: {visible: "=?mdVisible",delay: "=?mdDelay"},link: l}
    }
    angular.module("material.components.tooltip", ["material.core"]).directive("mdTooltip", e), e.$inject = ["$timeout", "$window", "$$rAF", "$document", "$mdUtil", "$mdTheming", "$rootElement"]
}(), function() {
    "use strict";
    angular.module("material.components.whiteframe", [])
}(), function() {
    "use strict";
    function e(e) {
        function t(t, o, a, r) {
            function i() {
                var e = l.getSelectedItem(), a = !e || l.count() < 2;
                if (o.css("display", a ? "none" : "block"), !a && t.pagination && t.pagination.tabData) {
                    var r = l.getSelectedIndex(), i = t.pagination.tabData.tabs[r] || {left: 0,right: 0,width: 0}, d = o.parent().prop("offsetWidth") - i.right, s = ["md-transition-left", "md-transition-right", "md-no-transition"], c = n > r ? 0 : r > n ? 1 : 2;
                    o.removeClass(s.join(" ")).addClass(s[c]).css({left: i.left + 1 + "px",right: d + "px"}), n = r
                }
            }
            if (!r[0]) {
                var l = r[1], d = e.debounce(i);
                l.inkBarElement = o, t.$on("$mdTabsPaginationChanged", d)
            }
        }
        var n = 0;
        return {restrict: "E",require: ["^?mdNoBar", "^mdTabs"],link: t}
    }
    angular.module("material.components.tabs").directive("mdTabsInkBar", e), e.$inject = ["$$rAF"]
}(), function() {
    "use strict";
    function e(e, t, n, o, a, r) {
        function i(i, d, s, c) {
            function m(e, t) {
                if (e) {
                    var n = b(e);
                    $.active && n !== $.page ? (t && t.element.blur(), v(n).then(function() {
                        e.element.focus()
                    })) : e.element.focus()
                }
            }
            function u(e) {
                var t = $.tabData, n = Math.max(0, Math.min(t.pages.length - 1, $.page + e)), o = t.pages[n][e > 0 ? "firstTabIndex" : "lastTabIndex"], a = c.itemAt(o);
                m(a)
            }
            function p() {
                function e() {
                    T.css("width", "9999px"), angular.forEach(r.tabs, function(e) {
                        angular.element(e.element).css("margin-left", e.filler + "px")
                    }), v(b(c.getSelectedItem()))
                }
                function t() {
                    h(0), T.css("width", ""), o.css("width", ""), o.css("margin-left", ""), $.page = null, $.active = !1
                }
                function n() {
                    return s || i.$watch(function() {
                        a(function() {
                            d[0].offsetParent && (angular.isFunction(s) && s(), y(), s = null)
                        }, 0, !1)
                    })
                }
                if (d.prop("offsetParent")) {
                    var o = d.find("md-tab");
                    t();
                    var r = $.tabData = g(), l = $.active = r.pages.length > 1;
                    l && e(), i.$evalAsync(function() {
                        i.$broadcast("$mdTabsPaginationChanged")
                    })
                } else
                    var s = n()
            }
            function h(t) {
                function n(t) {
                    t.target === T[0] && (T.off(e.CSS.TRANSITIONEND, n), a.resolve())
                }
                if (c.pagingOffset === t)
                    return o.when();
                var a = o.defer();
                return c.$$pagingOffset = t, T.css(e.CSS.TRANSFORM, "translate3d(" + t + "px,0,0)"), T.on(e.CSS.TRANSITIONEND, n), a.promise
            }
            function f() {
                switch (i.stretchTabs) {
                    case "never":
                        return !1;
                    case "always":
                        return !0;
                    default:
                        return r("sm")
                }
            }
            function g(e) {
                function t() {
                    var e = 1 === m.length ? o : a, t = Math.min(Math.floor(e / s), E.length), n = Math.floor(e / t);
                    return r.css("width", n + "px"), g(!0)
                }
                var n, o = d.parent().prop("offsetWidth"), a = o - l - 1, r = angular.element(E), i = 0, s = 0, c = [], m = [];
                return r.css("max-width", ""), angular.forEach(E, function(e, t) {
                    var r = Math.min(a, e.offsetWidth), l = {element: e,left: i,width: r,right: i + r,filler: 0};
                    l.page = Math.ceil(l.right / (1 === m.length && t === E.length - 1 ? o : a)) - 1, l.page >= m.length ? (l.filler = a * l.page - l.left, l.right += l.filler, l.left += l.filler, n = {left: l.left,firstTabIndex: t,lastTabIndex: t,tabs: [l]}, m.push(n)) : (n.lastTabIndex = t, n.tabs.push(l)), i = l.right, s = Math.max(s, r), c.push(l)
                }), r.css("max-width", a + "px"), !e && f() ? t() : {width: i,max: s,tabs: c,pages: m,tabElements: E}
            }
            function b(e) {
                var t = c.indexOf(e);
                if (-1 === t)
                    return 0;
                var n = $.tabData;
                return n ? n.tabs[t].page : 0
            }
            function v(e) {
                if (e !== $.page) {
                    var t = $.tabData.pages.length - 1;
                    return 0 > e && (e = 0), e > t && (e = t), $.hasPrev = e > 0, $.hasNext = t > e, $.page = e, i.$broadcast("$mdTabsPaginationChanged"), h(-$.tabData.pages[e].left)
                }
            }
            var E = d[0].getElementsByTagName("md-tab"), y = n.debounce(p), T = d.children(), $ = i.pagination = {page: -1,active: !1,clickNext: function() {
                    u(1)
                },clickPrevious: function() {
                    u(-1)
                }};
            i.$on("$mdTabsChanged", y), angular.element(t).on("resize", y), i.$on("$destroy", function() {
                angular.element(t).off("resize", y)
            }), i.$watch(function() {
                return c.tabToFocus
            }, m)
        }
        var l = 64;
        return {restrict: "A",require: "^mdTabs",link: i}
    }
    angular.module("material.components.tabs").directive("mdTabsPagination", e), e.$inject = ["$mdConstant", "$window", "$$rAF", "$$q", "$timeout", "$mdMedia"]
}(), function() {
    "use strict";
    function e(e, t, n, o, a, r, i, l) {
        function d() {
            return f(e.$parent)
        }
        function s(t, n) {
            h.content.length && (h.contentContainer.append(h.content), h.contentScope = e.$parent.$new(), t.append(h.contentContainer), o(h.contentContainer)(h.contentScope), n === !0 && l(function() {
                r.disconnectScope(h.contentScope)
            }, 0, !1))
        }
        function c() {
            h.hammertime.destroy(), a.leave(h.contentContainer).then(function() {
                h.contentScope && h.contentScope.$destroy(), h.contentScope = null
            })
        }
        function m(e) {
            h.contentContainer[e ? "addClass" : "removeClass"]("md-transition-rtl")
        }
        function u(n) {
            r.reconnectScope(h.contentScope), h.hammertime.on("swipeleft swiperight", e.onSwipe), t.addClass("active"), t.attr("aria-selected", !0), t.attr("tabIndex", 0), m(n), a.removeClass(h.contentContainer, "ng-hide"), e.onSelect()
        }
        function p(n) {
            r.disconnectScope(h.contentScope), h.hammertime.off("swipeleft swiperight", e.onSwipe), t.removeClass("active"), t.attr("aria-selected", !1), t.attr("tabIndex", -1), m(n), a.addClass(h.contentContainer, "ng-hide"), e.onDeselect()
        }
        var h = this;
        h.contentContainer = angular.element('<div class="md-tab-content ng-hide">'), h.hammertime = new Hammer(h.contentContainer[0]), h.element = t, h.isDisabled = d, h.onAdd = s, h.onRemove = c, h.onSelect = u, h.onDeselect = p;
        var f = i(n.ngDisabled)
    }
    angular.module("material.components.tabs").controller("$mdTab", e), e.$inject = ["$scope", "$element", "$attrs", "$compile", "$animate", "$mdUtil", "$parse", "$timeout"]
}(), function() {
    "use strict";
    function e(e, t, n, o, a) {
        function r(r, i) {
            var l = r.find("md-tab-label");
            l.length ? l.remove() : l = angular.isDefined(i.label) ? angular.element("<md-tab-label>").html(i.label) : angular.element("<md-tab-label>").append(r.contents().remove());
            var d = r.contents().remove();
            return function(r, i, s, c) {
                function m() {
                    var e = l.clone();
                    i.append(e), t(e)(r.$parent), E.content = d.clone()
                }
                function u() {
                    r.$apply(function() {
                        y.select(E), y.focus(E)
                    })
                }
                function p(e) {
                    e.keyCode == o.KEY_CODE.SPACE || e.keyCode == o.KEY_CODE.ENTER ? (i.triggerHandler("click"), e.preventDefault()) : e.keyCode === o.KEY_CODE.LEFT_ARROW ? r.$evalAsync(function() {
                        y.focus(y.previous(E))
                    }) : e.keyCode === o.KEY_CODE.RIGHT_ARROW && r.$evalAsync(function() {
                        y.focus(y.next(E))
                    })
                }
                function h(e) {
                    r.$apply(function() {
                        "swipeleft" === e.type ? y.select(y.next()) : y.select(y.previous())
                    })
                }
                function f() {
                    r.$watch("$parent.$index", function(e) {
                        y.move(E, e)
                    })
                }
                function g() {
                    function e(e) {
                        var t = y.getSelectedItem() === E;
                        e && !t ? y.select(E) : !e && t && y.deselect(E)
                    }
                    var t = r.$parent.$watch("!!(" + s.mdActive + ")", e);
                    r.$on("$destroy", t)
                }
                function b() {
                    function e(e) {
                        i.attr("aria-disabled", e);
                        var t = y.getSelectedItem() === E;
                        t && e && y.select(y.next() || y.previous())
                    }
                    r.$watch(E.isDisabled, e)
                }
                function v() {
                    var e = s.id || "tab_" + n.nextUid();
                    if (i.attr({id: e,role: "tab",tabIndex: -1}), d.length) {
                        var t = "content_" + e;
                        i.attr("aria-controls") || i.attr("aria-controls", t), E.contentContainer.attr({id: t,role: "tabpanel","aria-labelledby": e})
                    }
                }
                var E = c[0], y = c[1];
                r.$watch(function() {
                    return s.label
                }, function() {
                    a(function() {
                        y.scope.$broadcast("$mdTabsChanged")
                    }, 0, !1)
                }), m(), v();
                var T = e.attachTabBehavior(r, i, {colorElement: y.inkBarElement});
                y.add(E), r.$on("$destroy", function() {
                    T(), y.remove(E)
                }), i.on("$destroy", function() {
                    a(function() {
                        y.scope.$broadcast("$mdTabsChanged")
                    }, 0, !1)
                }), angular.isDefined(s.ngClick) || i.on("click", u), i.on("keydown", p), r.onSwipe = h, angular.isNumber(r.$parent.$index) && f(), angular.isDefined(s.mdActive) && g(), b()
            }
        }
        return {restrict: "E",require: ["mdTab", "^mdTabs"],controller: "$mdTab",scope: {onSelect: "&mdOnSelect",onDeselect: "&mdOnDeselect",label: "@"},compile: r}
    }
    angular.module("material.components.tabs").directive("mdTab", e), e.$inject = ["$mdInkRipple", "$compile", "$mdUtil", "$mdConstant", "$timeout"]
}(), function() {
    "use strict";
    function e(e, t, n) {
        function o() {
            return b(e.selectedIndex)
        }
        function a() {
            return e.selectedIndex
        }
        function r(t, n) {
            h.add(t, n), angular.isDefined(t.element.attr("md-active")) || -1 !== e.selectedIndex && angular.isNumber(e.selectedIndex) && e.selectedIndex !== f.indexOf(t) ? t.onAdd(f.contentArea, !0) : (t.onAdd(f.contentArea, !1), f.select(t)), e.$broadcast("$mdTabsChanged")
        }
        function i(t, n) {
            if (h.contains(t) && !n) {
                var a = o() === t, r = u() || m();
                c(t), h.remove(t), t.onRemove(), e.$broadcast("$mdTabsChanged"), a && d(r)
            }
        }
        function l(t, n) {
            var a = o() === t;
            h.remove(t), h.add(t, n), a && d(t), e.$broadcast("$mdTabsChanged")
        }
        function d(t, n) {
            !t || t.isSelected || t.isDisabled() || h.contains(t) && (angular.isDefined(n) || (n = g(t) < e.selectedIndex), c(o(), n), e.selectedIndex = g(t), t.isSelected = !0, t.onSelect(n), e.$broadcast("$mdTabsChanged"))
        }
        function s(e) {
            f.tabToFocus = e
        }
        function c(t, n) {
            t && t.isSelected && h.contains(t) && (e.selectedIndex = -1, t.isSelected = !1, t.onDeselect(n))
        }
        function m(e, t) {
            return h.next(e || o(), t || p)
        }
        function u(e, t) {
            return h.previous(e || o(), t || p)
        }
        function p(e) {
            return e && !e.isDisabled()
        }
        var h = n.iterator([], !1), f = this;
        f.$element = t, f.scope = e;
        var g = (f.contentArea = angular.element(t[0].querySelector(".md-tabs-content")), f.inRange = h.inRange, f.indexOf = h.indexOf), b = f.itemAt = h.itemAt;
        f.count = h.count, f.getSelectedItem = o, f.getSelectedIndex = a, f.add = r, f.remove = i, f.move = l, f.select = d, f.focus = s, f.deselect = c, f.next = m, f.previous = u, e.$on("$destroy", function() {
            c(o());
            for (var e = h.count() - 1; e >= 0; e--)
                i(h[e], !0)
        })
    }
    angular.module("material.components.tabs").controller("$mdTabs", e), e.$inject = ["$scope", "$element", "$mdUtil", "$timeout"]
}(), function() {
    "use strict";
    function e(e) {
        function t(t, n, o, a, r) {
            function i() {
                n.attr("role", "tablist")
            }
            function l() {
                t.$watch("selectedIndex", function(e, t) {
                    if (t != e) {
                        var n = t > e;
                        if (a.deselect(a.itemAt(t), n), a.inRange(e)) {
                            for (var o = a.itemAt(e); o && o.isDisabled(); )
                                o = e > t ? a.next(o) : a.previous(o);
                            a.select(o, n)
                        }
                    }
                })
            }
            t.stretchTabs = o.hasOwnProperty("mdStretchTabs") ? o.mdStretchTabs || "always" : "auto", e(n), i(), l(), r(t.$parent, function(e) {
                angular.element(n[0].querySelector(".md-header-items")).append(e)
            })
        }
        return {restrict: "E",controller: "$mdTabs",require: "mdTabs",transclude: !0,scope: {selectedIndex: "=?mdSelected"},template: '<section class="md-header" ng-class="{\'md-paginating\': pagination.active}"><button class="md-paginator md-prev" ng-if="pagination.active && pagination.hasPrev" ng-click="pagination.clickPrevious()" aria-hidden="true"></button><div class="md-header-items-container" md-tabs-pagination><div class="md-header-items"><md-tabs-ink-bar></md-tabs-ink-bar></div></div><button class="md-paginator md-next" ng-if="pagination.active && pagination.hasNext" ng-click="pagination.clickNext()" aria-hidden="true"></button></section><section class="md-tabs-content"></section>',link: t}
    }
    angular.module("material.components.tabs").directive("mdTabs", e), e.$inject = ["$mdTheming"]
}(), angular.module("material.core").constant("$MD_THEME_CSS", "md-backdrop.md-opaque.md-THEME_NAME-theme {  background-color: '{{foreground-4-0.5}}';  position: absolute; }md-bottom-sheet.md-THEME_NAME-theme {  background-color: '{{background-50}}';  border-top-color: '{{background-300}}'; }  md-bottom-sheet.md-THEME_NAME-theme.md-list md-item {    color: '{{foreground-1}}'; }  md-bottom-sheet.md-THEME_NAME-theme .md-subheader {    background-color: '{{background-50}}'; }  md-bottom-sheet.md-THEME_NAME-theme .md-subheader {    color: '{{foreground-1}}'; }md-toolbar .md-button.md-THEME_NAME-theme.md-fab {  background-color: white; }.md-button.md-THEME_NAME-theme {  border-radius: 3px; }  .md-button.md-THEME_NAME-theme:not([disabled]):hover, .md-button.md-THEME_NAME-theme:not([disabled]):focus {    background-color: '{{background-500-0.2}}'; }  .md-button.md-THEME_NAME-theme.md-primary {    color: '{{primary-color}}'; }    .md-button.md-THEME_NAME-theme.md-primary.md-raised, .md-button.md-THEME_NAME-theme.md-primary.md-fab {      color: '{{primary-contrast}}';      background-color: '{{primary-color}}'; }      .md-button.md-THEME_NAME-theme.md-primary.md-raised:not([disabled]):hover, .md-button.md-THEME_NAME-theme.md-primary.md-raised:not([disabled]):focus, .md-button.md-THEME_NAME-theme.md-primary.md-fab:not([disabled]):hover, .md-button.md-THEME_NAME-theme.md-primary.md-fab:not([disabled]):focus {        background-color: '{{primary-600}}'; }  .md-button.md-THEME_NAME-theme.md-fab {    border-radius: 50%;    background-color: '{{accent-color}}';    color: '{{accent-contrast}}'; }    .md-button.md-THEME_NAME-theme.md-fab:not([disabled]):hover, .md-button.md-THEME_NAME-theme.md-fab:not([disabled]):focus {      background-color: '{{accent-A700}}'; }  .md-button.md-THEME_NAME-theme.md-raised {    color: '{{background-contrast}}';    background-color: '{{background-500-0.185}}'; }    .md-button.md-THEME_NAME-theme.md-raised:not([disabled]):hover, .md-button.md-THEME_NAME-theme.md-raised:not([disabled]):focus {      background-color: '{{background-500-0.3}}'; }  .md-button.md-THEME_NAME-theme.md-warn {    color: '{{warn-color}}'; }    .md-button.md-THEME_NAME-theme.md-warn.md-raised, .md-button.md-THEME_NAME-theme.md-warn.md-fab {      color: '{{warn-contrast}}';      background-color: '{{warn-color}}'; }      .md-button.md-THEME_NAME-theme.md-warn.md-raised:not([disabled]):hover, .md-button.md-THEME_NAME-theme.md-warn.md-raised:not([disabled]):focus, .md-button.md-THEME_NAME-theme.md-warn.md-fab:not([disabled]):hover, .md-button.md-THEME_NAME-theme.md-warn.md-fab:not([disabled]):focus {        background-color: '{{warn-700}}'; }  .md-button.md-THEME_NAME-theme.md-accent {    color: '{{accent-color}}'; }    .md-button.md-THEME_NAME-theme.md-accent.md-raised, .md-button.md-THEME_NAME-theme.md-accent.md-fab {      color: '{{accent-contrast}}';      background-color: '{{accent-color}}'; }      .md-button.md-THEME_NAME-theme.md-accent.md-raised:not([disabled]):hover, .md-button.md-THEME_NAME-theme.md-accent.md-raised:not([disabled]):focus, .md-button.md-THEME_NAME-theme.md-accent.md-fab:not([disabled]):hover, .md-button.md-THEME_NAME-theme.md-accent.md-fab:not([disabled]):focus {        background-color: '{{accent-700}}'; }  .md-button.md-THEME_NAME-theme[disabled], .md-button.md-THEME_NAME-theme.md-raised[disabled], .md-button.md-THEME_NAME-theme.md-fab[disabled] {    color: '{{foreground-3}}';    background-color: transparent;    cursor: not-allowed; }md-card.md-THEME_NAME-theme {  border-radius: 2px; }  md-card.md-THEME_NAME-theme .md-card-image {    border-radius: 2px 2px 0 0; }md-checkbox.md-THEME_NAME-theme .md-ripple {  color: '{{accent-600}}'; }md-checkbox.md-THEME_NAME-theme.md-checked .md-ripple {  color: '{{background-600}}'; }md-checkbox.md-THEME_NAME-theme .md-icon {  border-color: '{{foreground-2}}'; }md-checkbox.md-THEME_NAME-theme.md-checked .md-icon {  background-color: '{{accent-color-0.87}}'; }md-checkbox.md-THEME_NAME-theme.md-checked .md-icon:after {  border-color: '{{background-200}}'; }md-checkbox.md-THEME_NAME-theme:not([disabled]).md-primary .md-ripple {  color: '{{primary-600}}'; }md-checkbox.md-THEME_NAME-theme:not([disabled]).md-primary.md-checked .md-ripple {  color: '{{background-600}}'; }md-checkbox.md-THEME_NAME-theme:not([disabled]).md-primary .md-icon {  border-color: '{{foreground-2}}'; }md-checkbox.md-THEME_NAME-theme:not([disabled]).md-primary.md-checked .md-icon {  background-color: '{{primary-color-0.87}}'; }md-checkbox.md-THEME_NAME-theme:not([disabled]).md-primary.md-checked .md-icon:after {  border-color: '{{background-200}}'; }md-checkbox.md-THEME_NAME-theme:not([disabled]).md-warn .md-ripple {  color: '{{warn-600}}'; }md-checkbox.md-THEME_NAME-theme:not([disabled]).md-warn .md-icon {  border-color: '{{foreground-2}}'; }md-checkbox.md-THEME_NAME-theme:not([disabled]).md-warn.md-checked .md-icon {  background-color: '{{warn-color-0.87}}'; }md-checkbox.md-THEME_NAME-theme:not([disabled]).md-warn.md-checked .md-icon:after {  border-color: '{{background-200}}'; }md-checkbox.md-THEME_NAME-theme[disabled] .md-icon {  border-color: '{{foreground-3}}'; }md-checkbox.md-THEME_NAME-theme[disabled].md-checked .md-icon {  background-color: '{{foreground-3}}'; }md-content.md-THEME_NAME-theme {  background-color: '{{background-hue-3}}'; }md-dialog.md-THEME_NAME-theme {  border-radius: 4px;  background-color: '{{background-hue-3}}'; }  md-dialog.md-THEME_NAME-theme.md-content-overflow .md-actions {    border-top-color: '{{foreground-4}}'; }md-divider.md-THEME_NAME-theme {  border-top-color: '{{foreground-4}}'; }md-input-container.md-THEME_NAME-theme .md-input {  color: '{{foreground-1}}';  border-color: '{{foreground-4}}';  text-shadow: '{{foreground-shadow}}'; }  md-input-container.md-THEME_NAME-theme .md-input::-webkit-input-placeholder, md-input-container.md-THEME_NAME-theme .md-input::-moz-placeholder, md-input-container.md-THEME_NAME-theme .md-input:-moz-placeholder, md-input-container.md-THEME_NAME-theme .md-input:-ms-input-placeholder {    color: '{{foreground-3}}'; }md-input-container.md-THEME_NAME-theme label {  text-shadow: '{{foreground-shadow}}';  color: '{{foreground-3}}'; }md-input-container.md-THEME_NAME-theme:not(.md-input-invalid).md-input-has-value label {  color: '{{foreground-2}}'; }md-input-container.md-THEME_NAME-theme:not(.md-input-invalid).md-input-focused .md-input {  border-color: '{{primary-500}}'; }md-input-container.md-THEME_NAME-theme:not(.md-input-invalid).md-input-focused label {  color: '{{primary-500}}'; }md-input-container.md-THEME_NAME-theme:not(.md-input-invalid).md-input-focused.md-accent .md-input {  border-color: '{{accent-500}}'; }md-input-container.md-THEME_NAME-theme:not(.md-input-invalid).md-input-focused.md-accent label {  color: '{{accent-500}}'; }md-input-container.md-THEME_NAME-theme:not(.md-input-invalid).md-input-focused.md-warn .md-input {  border-color: '{{warn-500}}'; }md-input-container.md-THEME_NAME-theme:not(.md-input-invalid).md-input-focused.md-warn label {  color: '{{warn-500}}'; }md-input-container.md-THEME_NAME-theme.md-input-invalid .md-input {  border-color: '{{warn-500}}'; }md-input-container.md-THEME_NAME-theme.md-input-invalid label {  color: '{{warn-500}}'; }md-input-container.md-THEME_NAME-theme.md-input-invalid ng-message, md-input-container.md-THEME_NAME-theme.md-input-invalid data-ng-message, md-input-container.md-THEME_NAME-theme.md-input-invalid x-ng-message, md-input-container.md-THEME_NAME-theme.md-input-invalid [ng-message], md-input-container.md-THEME_NAME-theme.md-input-invalid [data-ng-message], md-input-container.md-THEME_NAME-theme.md-input-invalid [x-ng-message], md-input-container.md-THEME_NAME-theme.md-input-invalid .md-char-counter {  color: '{{warn-500}}'; }md-input-container.md-THEME_NAME-theme .md-input[disabled] {  border-bottom-color: transparent;  color: '{{foreground-3}}';  background-image: linear-gradient(to right, '{{foreground-4}}' 0%, '{{foreground-4}}' 33%, transparent 0%); }md-progress-circular.md-THEME_NAME-theme {  background-color: transparent; }  md-progress-circular.md-THEME_NAME-theme .md-inner .md-gap {    border-top-color: '{{primary-color}}';    border-bottom-color: '{{primary-color}}'; }  md-progress-circular.md-THEME_NAME-theme .md-inner .md-left .md-half-circle, md-progress-circular.md-THEME_NAME-theme .md-inner .md-right .md-half-circle {    border-top-color: '{{primary-color}}'; }  md-progress-circular.md-THEME_NAME-theme .md-inner .md-right .md-half-circle {    border-right-color: '{{primary-color}}'; }  md-progress-circular.md-THEME_NAME-theme .md-inner .md-left .md-half-circle {    border-left-color: '{{primary-color}}'; }  md-progress-circular.md-THEME_NAME-theme.md-warn .md-inner .md-gap {    border-top-color: '{{warn-color}}';    border-bottom-color: '{{warn-color}}'; }  md-progress-circular.md-THEME_NAME-theme.md-warn .md-inner .md-left .md-half-circle, md-progress-circular.md-THEME_NAME-theme.md-warn .md-inner .md-right .md-half-circle {    border-top-color: '{{warn-color}}'; }  md-progress-circular.md-THEME_NAME-theme.md-warn .md-inner .md-right .md-half-circle {    border-right-color: '{{warn-color}}'; }  md-progress-circular.md-THEME_NAME-theme.md-warn .md-inner .md-left .md-half-circle {    border-left-color: '{{warn-color}}'; }  md-progress-circular.md-THEME_NAME-theme.md-accent .md-inner .md-gap {    border-top-color: '{{accent-color}}';    border-bottom-color: '{{accent-color}}'; }  md-progress-circular.md-THEME_NAME-theme.md-accent .md-inner .md-left .md-half-circle, md-progress-circular.md-THEME_NAME-theme.md-accent .md-inner .md-right .md-half-circle {    border-top-color: '{{accent-color}}'; }  md-progress-circular.md-THEME_NAME-theme.md-accent .md-inner .md-right .md-half-circle {    border-right-color: '{{accent-color}}'; }  md-progress-circular.md-THEME_NAME-theme.md-accent .md-inner .md-left .md-half-circle {    border-left-color: '{{accent-color}}'; }md-progress-linear.md-THEME_NAME-theme .md-container {  background-color: '{{primary-100}}'; }md-progress-linear.md-THEME_NAME-theme .md-bar {  background-color: '{{primary-color}}'; }md-progress-linear.md-THEME_NAME-theme.md-warn .md-container {  background-color: '{{warn-100}}'; }md-progress-linear.md-THEME_NAME-theme.md-warn .md-bar {  background-color: '{{warn-color}}'; }md-progress-linear.md-THEME_NAME-theme.md-accent .md-container {  background-color: '{{accent-100}}'; }md-progress-linear.md-THEME_NAME-theme.md-accent .md-bar {  background-color: '{{accent-color}}'; }md-progress-linear.md-THEME_NAME-theme[md-mode=buffer].md-warn .md-bar1 {  background-color: '{{warn-100}}'; }md-progress-linear.md-THEME_NAME-theme[md-mode=buffer].md-warn .md-dashed:before {  background: radial-gradient('{{warn-100}}' 0%, '{{warn-100}}' 16%, transparent 42%); }md-progress-linear.md-THEME_NAME-theme[md-mode=buffer].md-accent .md-bar1 {  background-color: '{{accent-100}}'; }md-progress-linear.md-THEME_NAME-theme[md-mode=buffer].md-accent .md-dashed:before {  background: radial-gradient('{{accent-100}}' 0%, '{{accent-100}}' 16%, transparent 42%); }md-radio-button.md-THEME_NAME-theme .md-off {  border-color: '{{foreground-2}}'; }md-radio-button.md-THEME_NAME-theme .md-on {  background-color: '{{accent-color-0.87}}'; }md-radio-button.md-THEME_NAME-theme.md-checked .md-off {  border-color: '{{accent-color-0.87}}'; }md-radio-button.md-THEME_NAME-theme.md-checked .md-ink-ripple {  color: '{{accent-color-0.87}}'; }md-radio-button.md-THEME_NAME-theme .md-container .md-ripple {  color: '{{accent-600}}'; }md-radio-button.md-THEME_NAME-theme:not([disabled]).md-primary .md-on {  background-color: '{{primary-color-0.87}}'; }md-radio-button.md-THEME_NAME-theme:not([disabled]).md-primary.md-checked .md-off {  border-color: '{{primary-color-0.87}}'; }md-radio-button.md-THEME_NAME-theme:not([disabled]).md-primary.md-checked .md-ink-ripple {  color: '{{primary-color-0.87}}'; }md-radio-button.md-THEME_NAME-theme:not([disabled]).md-primary .md-container .md-ripple {  color: '{{primary-600}}'; }md-radio-button.md-THEME_NAME-theme:not([disabled]).md-warn .md-on {  background-color: '{{warn-color-0.87}}'; }md-radio-button.md-THEME_NAME-theme:not([disabled]).md-warn.md-checked .md-off {  border-color: '{{warn-color-0.87}}'; }md-radio-button.md-THEME_NAME-theme:not([disabled]).md-warn.md-checked .md-ink-ripple {  color: '{{warn-color-0.87}}'; }md-radio-button.md-THEME_NAME-theme:not([disabled]).md-warn .md-container .md-ripple {  color: '{{warn-600}}'; }md-radio-button.md-THEME_NAME-theme[disabled] .md-container .md-off {  border-color: '{{foreground-3}}'; }md-radio-button.md-THEME_NAME-theme[disabled] .md-container .md-on {  border-color: '{{foreground-3}}'; }md-radio-group.md-THEME_NAME-theme:focus:not(:empty) {  border-color: '{{foreground-1}}'; }md-sidenav.md-THEME_NAME-theme {  background-color: '{{background-hue-3}}'; }md-slider.md-THEME_NAME-theme .md-track {  background-color: '{{foreground-3}}'; }md-slider.md-THEME_NAME-theme .md-track-ticks {  background-color: '{{foreground-4}}'; }md-slider.md-THEME_NAME-theme .md-focus-thumb {  background-color: '{{foreground-2}}'; }md-slider.md-THEME_NAME-theme .md-focus-ring {  border-color: '{{foreground-4}}'; }md-slider.md-THEME_NAME-theme .md-disabled-thumb {  border-color: '{{background-hue-3}}'; }md-slider.md-THEME_NAME-theme.md-min .md-thumb:after {  background-color: '{{background-hue-3}}'; }md-slider.md-THEME_NAME-theme .md-track.md-track-fill {  background-color: '{{primary-color}}'; }md-slider.md-THEME_NAME-theme .md-thumb:after {  border-color: '{{primary-color}}';  background-color: '{{primary-color}}'; }md-slider.md-THEME_NAME-theme .md-sign {  background-color: '{{primary-color}}'; }  md-slider.md-THEME_NAME-theme .md-sign:after {    border-top-color: '{{primary-color}}'; }md-slider.md-THEME_NAME-theme .md-thumb-text {  color: '{{primary-contrast}}'; }md-slider.md-THEME_NAME-theme.md-warn .md-track-fill {  background-color: '{{warn-color}}'; }md-slider.md-THEME_NAME-theme.md-warn .md-thumb:after {  border-color: '{{warn-color}}';  background-color: '{{warn-color}}'; }md-slider.md-THEME_NAME-theme.md-warn .md-sign {  background-color: '{{warn-color}}'; }  md-slider.md-THEME_NAME-theme.md-warn .md-sign:after {    border-top-color: '{{warn-color}}'; }md-slider.md-THEME_NAME-theme.md-warn .md-thumb-text {  color: '{{warn-contrast}}'; }md-slider.md-THEME_NAME-theme.md-primary .md-track-fill {  background-color: '{{primary-color}}'; }md-slider.md-THEME_NAME-theme.md-primary .md-thumb:after {  border-color: '{{primary-color}}';  background-color: '{{primary-color}}'; }md-slider.md-THEME_NAME-theme.md-primary .md-sign {  background-color: '{{primary-color}}'; }  md-slider.md-THEME_NAME-theme.md-primary .md-sign:after {    border-top-color: '{{primary-color}}'; }md-slider.md-THEME_NAME-theme.md-primary .md-thumb-text {  color: '{{primary-contrast}}'; }md-slider.md-THEME_NAME-theme[disabled] .md-thumb:after {  border-color: '{{foreground-3}}'; }md-slider.md-THEME_NAME-theme[disabled]:not(.md-min) .md-thumb:after {  background-color: '{{foreground-3}}'; }.md-subheader.md-THEME_NAME-theme {  color: '{{ foreground-2-0.23 }}';  background-color: '{{background-hue-3}}'; }  .md-subheader.md-THEME_NAME-theme.md-primary {    color: '{{primary-color}}'; }  .md-subheader.md-THEME_NAME-theme.md-accent {    color: '{{accent-color}}'; }  .md-subheader.md-THEME_NAME-theme.md-warn {    color: '{{warn-color}}'; }md-switch.md-THEME_NAME-theme .md-thumb {  background-color: '{{background-50}}'; }md-switch.md-THEME_NAME-theme .md-bar {  background-color: '{{background-500}}'; }md-switch.md-THEME_NAME-theme.md-checked .md-thumb {  background-color: '{{accent-color}}'; }md-switch.md-THEME_NAME-theme.md-checked .md-bar {  background-color: '{{accent-color-0.5}}'; }md-switch.md-THEME_NAME-theme.md-checked.md-primary .md-thumb {  background-color: '{{primary-color}}'; }md-switch.md-THEME_NAME-theme.md-checked.md-primary .md-bar {  background-color: '{{primary-color-0.5}}'; }md-switch.md-THEME_NAME-theme.md-checked.md-warn .md-thumb {  background-color: '{{warn-color}}'; }md-switch.md-THEME_NAME-theme.md-checked.md-warn .md-bar {  background-color: '{{warn-color-0.5}}'; }md-switch.md-THEME_NAME-theme[disabled] .md-thumb {  background-color: '{{background-400}}'; }md-switch.md-THEME_NAME-theme[disabled] .md-bar {  background-color: '{{foreground-4}}'; }md-switch.md-THEME_NAME-theme:focus .md-label:not(:empty) {  border-color: '{{foreground-1}}';  border-style: dotted; }md-tabs.md-THEME_NAME-theme .md-header {  background-color: '{{primary-color}}'; }md-tabs.md-THEME_NAME-theme.md-accent .md-header {  background-color: '{{accent-color}}'; }md-tabs.md-THEME_NAME-theme.md-accent md-tab:not([disabled]) {  color: '{{accent-100}}'; }  md-tabs.md-THEME_NAME-theme.md-accent md-tab:not([disabled]).active {    color: '{{accent-contrast}}'; }md-tabs.md-THEME_NAME-theme.md-warn .md-header {  background-color: '{{warn-color}}'; }md-tabs.md-THEME_NAME-theme.md-warn md-tab:not([disabled]) {  color: '{{warn-100}}'; }  md-tabs.md-THEME_NAME-theme.md-warn md-tab:not([disabled]).active {    color: '{{warn-contrast}}'; }md-tabs.md-THEME_NAME-theme md-tabs-ink-bar {  color: '{{primary-contrast}}';  background: '{{primary-contrast}}'; }md-tabs.md-THEME_NAME-theme md-tab {  color: '{{primary-100}}'; }  md-tabs.md-THEME_NAME-theme md-tab.active {    color: '{{primary-contrast}}'; }  md-tabs.md-THEME_NAME-theme md-tab[disabled] {    color: '{{foreground-4}}'; }  md-tabs.md-THEME_NAME-theme md-tab:focus {    color: '{{primary-contrast}}';    background-color: '{{primary-contrast-0.1}}'; }  md-tabs.md-THEME_NAME-theme md-tab .md-ripple-container {    color: '{{primary-contrast}}'; }md-input-group.md-THEME_NAME-theme input, md-input-group.md-THEME_NAME-theme textarea {  text-shadow: '{{foreground-shadow}}'; }  md-input-group.md-THEME_NAME-theme input::-webkit-input-placeholder, md-input-group.md-THEME_NAME-theme input::-moz-placeholder, md-input-group.md-THEME_NAME-theme input:-moz-placeholder, md-input-group.md-THEME_NAME-theme input:-ms-input-placeholder, md-input-group.md-THEME_NAME-theme textarea::-webkit-input-placeholder, md-input-group.md-THEME_NAME-theme textarea::-moz-placeholder, md-input-group.md-THEME_NAME-theme textarea:-moz-placeholder, md-input-group.md-THEME_NAME-theme textarea:-ms-input-placeholder {    color: '{{foreground-3}}'; }md-input-group.md-THEME_NAME-theme label {  text-shadow: '{{foreground-shadow}}';  color: '{{foreground-3}}'; }md-input-group.md-THEME_NAME-theme input, md-input-group.md-THEME_NAME-theme textarea {  color: '{{foreground-1}}';  border-color: '{{foreground-4}}'; }md-input-group.md-THEME_NAME-theme.md-input-focused input, md-input-group.md-THEME_NAME-theme.md-input-focused textarea {  border-color: '{{primary-500}}'; }md-input-group.md-THEME_NAME-theme.md-input-focused label {  color: '{{primary-500}}'; }md-input-group.md-THEME_NAME-theme.md-input-focused.md-accent input, md-input-group.md-THEME_NAME-theme.md-input-focused.md-accent textarea {  border-color: '{{accent-500}}'; }md-input-group.md-THEME_NAME-theme.md-input-focused.md-accent label {  color: '{{accent-500}}'; }md-input-group.md-THEME_NAME-theme.md-input-has-value:not(.md-input-focused) label {  color: '{{foreground-2}}'; }md-input-group.md-THEME_NAME-theme .md-input[disabled] {  border-bottom-color: '{{foreground-4}}';  color: '{{foreground-3}}'; }md-toast.md-THEME_NAME-theme {  background-color: '{{foreground-1}}';  color: '{{background-50}}'; }  md-toast.md-THEME_NAME-theme .md-button {    color: '{{background-50}}'; }    md-toast.md-THEME_NAME-theme .md-button.md-highlight {      color: '{{primary-A200}}'; }      md-toast.md-THEME_NAME-theme .md-button.md-highlight.md-accent {        color: '{{accent-A200}}'; }      md-toast.md-THEME_NAME-theme .md-button.md-highlight.md-warn {        color: '{{warn-A200}}'; }md-toolbar.md-THEME_NAME-theme {  background-color: '{{primary-color}}';  color: '{{primary-contrast}}'; }  md-toolbar.md-THEME_NAME-theme .md-button {    color: '{{primary-contrast}}'; }  md-toolbar.md-THEME_NAME-theme.md-accent {    background-color: '{{accent-color}}';    color: '{{accent-contrast}}'; }  md-toolbar.md-THEME_NAME-theme.md-warn {    background-color: '{{warn-color}}';    color: '{{warn-contrast}}'; }md-tooltip.md-THEME_NAME-theme {  color: '{{background-A100}}'; }  md-tooltip.md-THEME_NAME-theme .md-background {    background-color: '{{foreground-2}}'; }");
var DocsApp = angular.module("docsApp", ["ngMaterial", "ngRoute", "angularytics", "ngMessages"]).config(["COMPONENTS", "DEMOS", "PAGES", "$routeProvider", "$mdThemingProvider", function(e, t, n, o, a) {
        o.when("/", {templateUrl: "partials/home.tmpl.html"}).when("/layout/:tmpl", {templateUrl: function(e) {
                return "partials/layout-" + e.tmpl + ".tmpl.html"
            }}), a.theme("docs-dark", "default").dark(), angular.forEach(n, function(e) {
            angular.forEach(e, function(e) {
                o.when(e.url, {templateUrl: e.outputPath,controller: "GuideCtrl"})
            })
        }), angular.forEach(e, function(e) {
            angular.forEach(e.docs, function(t) {
                t.url = "/" + t.url, o.when(t.url, {templateUrl: t.outputPath,resolve: {component: function() {
                            return e
                        },doc: function() {
                            return t
                        }},controller: "ComponentDocCtrl"})
            })
        }), angular.forEach(t, function(t) {
            var n;
            angular.forEach(e, function(e) {
                t.name === e.name && (n = e)
            }), n = n || angular.extend({}, t), o.when(t.url, {templateUrl: "partials/demo.tmpl.html",controller: "DemoCtrl",resolve: {component: function() {
                        return n
                    },demos: function() {
                        return t.demos
                    }}})
        }), o.otherwise("/")
    }]).config(["AngularyticsProvider", function(e) {
        e.setEventHandlers(["Console", "GoogleUniversal"])
    }]).run(["Angularytics", "$rootScope", "$timeout", function(e) {
        e.init()
    }]).factory("menu", ["COMPONENTS", "DEMOS", "PAGES", "$location", "$rootScope", function(e, t, n, o, a) {
        function r(e, t) {
            return e.name < t.name ? -1 : 1
        }
        function i() {
            var e = !1, t = o.path();
            l.forEach(function(n) {
                n.pages.forEach(function(o) {
                    t === o.url && (m.selectSection(n), m.selectPage(n, o), e = !0)
                })
            }), e || m.selectSection(l[3])
        }
        var l = [{name: "Layout",pages: [{name: "Container Elements",id: "layoutContainers",url: "/layout/container"}, {name: "Grid System",id: "layoutGrid",url: "/layout/grid"}, {name: "Child Alignment",id: "layoutAlign",url: "/layout/alignment"}, {name: "Options",id: "layoutOptions",url: "/layout/options"}]}], d = {}, s = {};
        e.forEach(function(e) {
            e.docs.forEach(function(e) {
                angular.isDefined(e.private) || (s[e.type] = s[e.type] || [], s[e.type].push(e), d[e.module] = d[e.module] || [], d[e.module].push(e))
            })
        });
        var c = [];
        angular.forEach(t, function(e) {
            c.push({name: e.label,url: e.url}), (d[e.name] || []).forEach(function(e) {
                e.hasDemo = !0
            })
        }), l.unshift({name: "Demos",pages: c.sort(r)}), angular.forEach(n, function(e, t) {
            l.push({name: t,pages: e})
        }), l.push({name: "Services",pages: s.service.sort(r)}), l.push({name: "Directives",pages: s.directive.sort(r)});
        var m;
        return a.$on("$locationChangeSuccess", i), m = {sections: l,selectSection: function(e) {
                m.openedSection = e
            },toggleSelectSection: function(e) {
                m.openedSection = m.openedSection === e ? null : e
            },isSectionSelected: function(e) {
                return m.openedSection === e
            },selectPage: function(e, t) {
                t && t.url && o.path(t.url), m.currentSection = e, m.currentPage = t
            },isPageSelected: function(e, t) {
                return m.currentPage === t
            }}
    }]).controller("DocsCtrl", ["$scope", "COMPONENTS", "BUILDCONFIG", "$mdSidenav", "$timeout", "$mdDialog", "menu", "$location", "$rootScope", function(e, t, n, o, a, r, i, l, d) {
        function s() {
            e.closeMenu(), c.focus()
        }
        e.COMPONENTS = t, e.BUILDCONFIG = n, e.menu = i;
        var c = document.querySelector("[role='main']");
        d.$on("$locationChangeSuccess", s), e.closeMenu = function() {
            a(function() {
                o("left").close()
            })
        }, e.openMenu = function() {
            a(function() {
                o("left").open()
            })
        }, e.path = function() {
            return l.path()
        }, e.goHome = function() {
            i.selectPage(null, null), l.path("/")
        }
    }]).controller("HomeCtrl", ["$scope", "$rootScope", "$http", function(e, t, n) {
        t.currentComponent = t.currentDoc = null, e.version = "", e.versionURL = "";
        Math.round((new Date).getTime() / 1e3);
        n.get("version.json").then(function(t) {
            var n = t.data.sha || "", o = t.data.url;
            n && (e.versionURL = o + n, e.version = n.substr(0, 6))
        })
    }]).controller("GuideCtrl", ["$rootScope", function(e) {
        e.currentComponent = e.currentDoc = null
    }]).controller("LayoutCtrl", ["$scope", "$attrs", "$location", "$rootScope", function(e, t, n, o) {
        o.currentComponent = o.currentDoc = null, e.layoutDemo = {mainAxis: "center",crossAxis: "center",direction: "row"}, e.layoutAlign = function() {
            return e.layoutDemo.mainAxis + " " + e.layoutDemo.crossAxis
        }
    }]).controller("ComponentDocCtrl", ["$scope", "doc", "component", "$rootScope", "$templateCache", "$http", "$q", function(e, t, n, o) {
        o.currentComponent = n, o.currentDoc = t
    }]).controller("DemoCtrl", ["$rootScope", "$scope", "component", "demos", "$http", "$templateCache", "$q", function(e, t, n, o, a, r) {
        e.currentComponent = n, e.currentDoc = null, t.demos = [], angular.forEach(o, function(e) {
            var n = [e.index].concat(e.js || []).concat(e.css || []).concat(e.html || []);
            n.forEach(function(e) {
                e.httpPromise = a.get(e.outputPath, {cache: r}).then(function(t) {
                    return e.contents = t.data.replace("<head/>", ""), e.contents
                })
            }), e.$files = n, t.demos.push(e)
        }), t.demos = t.demos.sort(function(e, t) {
            return e.name > t.name ? 1 : -1
        })
    }]).filter("humanizeDoc", function() {
    return function(e) {
        return e ? "directive" === e.type ? e.name.replace(/([A-Z])/g, function(e) {
            return "-" + e.toLowerCase()
        }) : e.label || e.name : void 0
    }
}).filter("directiveBrackets", function() {
    return function(e) {
        return e.indexOf("-") > -1 ? "<" + e + ">" : e
    }
});
DocsApp.constant("BUILDCONFIG", {ngVersion: "1.3.2",version: "0.7.0-rc3",repository: "https://github.com/angular/material",commit: "1c973330c68e0c653a19f4408a373741107eb0e3",date: "2015-01-21 21:55:45 -0500"}), DocsApp.constant("COMPONENTS", [{name: "material.components.bottomSheet",type: "module",outputPath: "partials/api/material.components.bottomSheet/index.html",url: "api/material.components.bottomSheet",label: "material.components.bottomSheet",module: ".",docs: [{name: "$mdBottomSheet",type: "service",outputPath: "partials/api/material.components.bottomSheet/service/$mdBottomSheet.html",url: "api/material.components.bottomSheet/service/$mdBottomSheet",label: "$mdBottomSheet",module: "material.components.bottomSheet"}]}, {name: "material.components.button",type: "module",outputPath: "partials/api/material.components.button/index.html",url: "api/material.components.button",label: "material.components.button",module: ".",docs: [{name: "mdButton",type: "directive",outputPath: "partials/api/material.components.button/directive/mdButton.html",url: "api/material.components.button/directive/mdButton",label: "mdButton",module: "material.components.button"}]}, {name: "material.components.card",type: "module",outputPath: "partials/api/material.components.card/index.html",url: "api/material.components.card",label: "material.components.card",module: ".",docs: [{name: "mdCard",type: "directive",outputPath: "partials/api/material.components.card/directive/mdCard.html",url: "api/material.components.card/directive/mdCard",label: "mdCard",module: "material.components.card"}]}, {name: "material.components.checkbox",type: "module",outputPath: "partials/api/material.components.checkbox/index.html",url: "api/material.components.checkbox",label: "material.components.checkbox",module: ".",docs: [{name: "mdCheckbox",type: "directive",outputPath: "partials/api/material.components.checkbox/directive/mdCheckbox.html",url: "api/material.components.checkbox/directive/mdCheckbox",label: "mdCheckbox",module: "material.components.checkbox"}]}, {name: "material.components.content",type: "module",outputPath: "partials/api/material.components.content/index.html",url: "api/material.components.content",label: "material.components.content",module: ".",docs: [{name: "mdContent",type: "directive",outputPath: "partials/api/material.components.content/directive/mdContent.html",url: "api/material.components.content/directive/mdContent",label: "mdContent",module: "material.components.content"}]}, {name: "material.components.dialog",type: "module",outputPath: "partials/api/material.components.dialog/index.html",url: "api/material.components.dialog",label: "material.components.dialog",module: ".",docs: [{name: "$mdDialog",type: "service",outputPath: "partials/api/material.components.dialog/service/$mdDialog.html",url: "api/material.components.dialog/service/$mdDialog",label: "$mdDialog",module: "material.components.dialog"}]}, {name: "material.components.divider",type: "module",outputPath: "partials/api/material.components.divider/index.html",url: "api/material.components.divider",label: "material.components.divider",module: ".",docs: [{name: "mdDivider",type: "directive",outputPath: "partials/api/material.components.divider/directive/mdDivider.html",url: "api/material.components.divider/directive/mdDivider",label: "mdDivider",module: "material.components.divider"}]}, {name: "material.components.input",type: "module",outputPath: "partials/api/material.components.input/index.html",url: "api/material.components.input",label: "material.components.input",module: ".",docs: [{name: "mdInputContainer",type: "directive",outputPath: "partials/api/material.components.input/directive/mdInputContainer.html",url: "api/material.components.input/directive/mdInputContainer",label: "mdInputContainer",module: "material.components.input"}, {name: "input",type: "directive",outputPath: "partials/api/material.components.input/directive/input.html",url: "api/material.components.input/directive/input",label: "input",module: "material.components.input"}, {name: "textarea",type: "directive",outputPath: "partials/api/material.components.input/directive/textarea.html",url: "api/material.components.input/directive/textarea",label: "textarea",module: "material.components.input"}]}, {name: "material.components.list",type: "module",outputPath: "partials/api/material.components.list/index.html",url: "api/material.components.list",label: "material.components.list",module: ".",docs: [{name: "mdList",type: "directive",outputPath: "partials/api/material.components.list/directive/mdList.html",url: "api/material.components.list/directive/mdList",label: "mdList",module: "material.components.list"}, {name: "mdItem",type: "directive",outputPath: "partials/api/material.components.list/directive/mdItem.html",url: "api/material.components.list/directive/mdItem",label: "mdItem",module: "material.components.list"}]}, {name: "material.components.progressCircular",type: "module",outputPath: "partials/api/material.components.progressCircular/index.html",url: "api/material.components.progressCircular",label: "material.components.progressCircular",module: ".",docs: [{name: "mdProgressCircular",type: "directive",outputPath: "partials/api/material.components.progressCircular/directive/mdProgressCircular.html",url: "api/material.components.progressCircular/directive/mdProgressCircular",label: "mdProgressCircular",module: "material.components.progressCircular"}]}, {name: "material.components.progressLinear",type: "module",outputPath: "partials/api/material.components.progressLinear/index.html",url: "api/material.components.progressLinear",label: "material.components.progressLinear",module: ".",docs: [{name: "mdProgressLinear",type: "directive",outputPath: "partials/api/material.components.progressLinear/directive/mdProgressLinear.html",url: "api/material.components.progressLinear/directive/mdProgressLinear",label: "mdProgressLinear",module: "material.components.progressLinear"}]}, {name: "material.components.radioButton",type: "module",outputPath: "partials/api/material.components.radioButton/index.html",url: "api/material.components.radioButton",label: "material.components.radioButton",module: ".",docs: [{name: "mdRadioGroup",type: "directive",outputPath: "partials/api/material.components.radioButton/directive/mdRadioGroup.html",url: "api/material.components.radioButton/directive/mdRadioGroup",label: "mdRadioGroup",module: "material.components.radioButton"}, {name: "mdRadioButton",type: "directive",outputPath: "partials/api/material.components.radioButton/directive/mdRadioButton.html",url: "api/material.components.radioButton/directive/mdRadioButton",label: "mdRadioButton",module: "material.components.radioButton"}]}, {name: "material.components.sidenav",type: "module",outputPath: "partials/api/material.components.sidenav/index.html",url: "api/material.components.sidenav",label: "material.components.sidenav",module: ".",docs: [{name: "$mdSidenav",type: "service",outputPath: "partials/api/material.components.sidenav/service/$mdSidenav.html",url: "api/material.components.sidenav/service/$mdSidenav",label: "$mdSidenav",module: "material.components.sidenav"}, {name: "mdSidenav",type: "directive",outputPath: "partials/api/material.components.sidenav/directive/mdSidenav.html",url: "api/material.components.sidenav/directive/mdSidenav",label: "mdSidenav",module: "material.components.sidenav"}]}, {name: "material.components.slider",type: "module",outputPath: "partials/api/material.components.slider/index.html",url: "api/material.components.slider",label: "material.components.slider",module: ".",docs: [{name: "mdSlider",type: "directive",outputPath: "partials/api/material.components.slider/directive/mdSlider.html",url: "api/material.components.slider/directive/mdSlider",label: "mdSlider",module: "material.components.slider"}]}, {name: "material.components.subheader",type: "module",outputPath: "partials/api/material.components.subheader/index.html",url: "api/material.components.subheader",label: "material.components.subheader",module: ".",docs: [{name: "mdSubheader",type: "directive",outputPath: "partials/api/material.components.subheader/directive/mdSubheader.html",url: "api/material.components.subheader/directive/mdSubheader",label: "mdSubheader",module: "material.components.subheader"}]}, {name: "material.components.swipe",type: "module",outputPath: "partials/api/material.components.swipe/index.html",url: "api/material.components.swipe",label: "material.components.swipe",module: ".",docs: [{name: "mdSwipeLeft",type: "directive",outputPath: "partials/api/material.components.swipe/directive/mdSwipeLeft.html",url: "api/material.components.swipe/directive/mdSwipeLeft",label: "mdSwipeLeft",module: "material.components.swipe"}, {name: "mdSwipeRight",type: "directive",outputPath: "partials/api/material.components.swipe/directive/mdSwipeRight.html",url: "api/material.components.swipe/directive/mdSwipeRight",label: "mdSwipeRight",module: "material.components.swipe"}]}, {name: "material.components.switch",type: "module",outputPath: "partials/api/material.components.switch/index.html",url: "api/material.components.switch",label: "material.components.switch",module: ".",docs: [{name: "mdSwitch",type: "directive",outputPath: "partials/api/material.components.switch/directive/mdSwitch.html",url: "api/material.components.switch/directive/mdSwitch",label: "mdSwitch",module: "material.components.switch"}]}, {name: "material.components.toast",type: "module",outputPath: "partials/api/material.components.toast/index.html",url: "api/material.components.toast",label: "material.components.toast",module: ".",docs: [{name: "$mdToast",type: "service",outputPath: "partials/api/material.components.toast/service/$mdToast.html",url: "api/material.components.toast/service/$mdToast",label: "$mdToast",module: "material.components.toast"}]}, {name: "material.components.toolbar",type: "module",outputPath: "partials/api/material.components.toolbar/index.html",url: "api/material.components.toolbar",label: "material.components.toolbar",module: ".",docs: [{name: "mdToolbar",type: "directive",outputPath: "partials/api/material.components.toolbar/directive/mdToolbar.html",url: "api/material.components.toolbar/directive/mdToolbar",label: "mdToolbar",module: "material.components.toolbar"}]}, {name: "material.components.tooltip",type: "module",outputPath: "partials/api/material.components.tooltip/index.html",url: "api/material.components.tooltip",label: "material.components.tooltip",module: ".",docs: [{name: "mdTooltip",type: "directive",outputPath: "partials/api/material.components.tooltip/directive/mdTooltip.html",url: "api/material.components.tooltip/directive/mdTooltip",label: "mdTooltip",module: "material.components.tooltip"}]}, {name: "material.components.tabs",type: "module",outputPath: "partials/api/material.components.tabs/index.html",url: "api/material.components.tabs",label: "material.components.tabs",module: ".",docs: [{name: "mdTab",type: "directive",outputPath: "partials/api/material.components.tabs/directive/mdTab.html",url: "api/material.components.tabs/directive/mdTab",label: "mdTab",module: "material.components.tabs"}, {name: "mdTabs",type: "directive",outputPath: "partials/api/material.components.tabs/directive/mdTabs.html",url: "api/material.components.tabs/directive/mdTabs",label: "mdTabs",module: "material.components.tabs"}]}]), DocsApp.constant("PAGES", {Theming: [{name: "Introduction and Terms",outputPath: "partials/Theming/01_introduction.html",url: "/Theming/01_introduction",label: "Introduction and Terms"}, {name: "Declarative Syntax",outputPath: "partials/Theming/02_declarative_syntax.html",url: "/Theming/02_declarative_syntax",label: "Declarative Syntax"}, {name: "Configuring a Theme",outputPath: "partials/Theming/03_configuring_a_theme.html",url: "/Theming/03_configuring_a_theme",label: "Configuring a Theme"}, {name: "Multiple Themes",outputPath: "partials/Theming/04_multiple_themes.html",url: "/Theming/04_multiple_themes",label: "Multiple Themes"}]}), angular.module("docsApp").constant("DEMOS", [{name: "material.components.bottomSheet",label: "Bottom Sheet",demos: [{id: "bottomSheetdemoBasicUsage",css: [{name: "style.css",label: "style.css",fileType: "css",outputPath: "demo-partials/bottomSheet/demoBasicUsage/style.css"}],html: [{name: "bottom-sheet-grid-template.html",label: "bottom-sheet-grid-template.html",fileType: "html",outputPath: "demo-partials/bottomSheet/demoBasicUsage/bottom-sheet-grid-template.html"}, {name: "bottom-sheet-list-template.html",label: "bottom-sheet-list-template.html",fileType: "html",outputPath: "demo-partials/bottomSheet/demoBasicUsage/bottom-sheet-list-template.html"}],js: [{name: "script.js",label: "script.js",fileType: "js",outputPath: "demo-partials/bottomSheet/demoBasicUsage/script.js"}],moduleName: "material.components.bottomSheet",name: "demoBasicUsage",label: "Basic Usage",index: {name: "index.html",label: "index.html",fileType: "html",outputPath: "demo-partials/bottomSheet/demoBasicUsage/index.html"},ngModule: {module: "bottomSheetDemo1",dependencies: ["ngMaterial"]}}],url: "/demo/material.components.bottomSheet"}, {name: "material.components.button",label: "Button",demos: [{id: "buttondemoBasicUsage",css: [{name: "style.css",label: "style.css",fileType: "css",outputPath: "demo-partials/button/demoBasicUsage/style.css"}],html: [],js: [{name: "script.js",label: "script.js",fileType: "js",outputPath: "demo-partials/button/demoBasicUsage/script.js"}],moduleName: "material.components.button",name: "demoBasicUsage",label: "Basic Usage",index: {name: "index.html",label: "index.html",fileType: "html",outputPath: "demo-partials/button/demoBasicUsage/index.html"},ngModule: {module: "buttonsDemo1",dependencies: ["ngMaterial"]}}],url: "/demo/material.components.button"}, {name: "material.components.card",label: "Card",demos: [{id: "carddemoBasicUsage",css: [{name: "style.css",label: "style.css",fileType: "css",outputPath: "demo-partials/card/demoBasicUsage/style.css"}],html: [],js: [{name: "script.js",label: "script.js",fileType: "js",outputPath: "demo-partials/card/demoBasicUsage/script.js"}],moduleName: "material.components.card",name: "demoBasicUsage",label: "Basic Usage",index: {name: "index.html",label: "index.html",fileType: "html",outputPath: "demo-partials/card/demoBasicUsage/index.html"},ngModule: {module: "cardDemo1",dependencies: ["ngMaterial"]}}],url: "/demo/material.components.card"}, {name: "material.components.checkbox",label: "Checkbox",demos: [{id: "checkboxdemoBasicUsage",css: [{name: "style.css",label: "style.css",fileType: "css",outputPath: "demo-partials/checkbox/demoBasicUsage/style.css"}],html: [],js: [{name: "script.js",label: "script.js",fileType: "js",outputPath: "demo-partials/checkbox/demoBasicUsage/script.js"}],moduleName: "material.components.checkbox",name: "demoBasicUsage",label: "Basic Usage",index: {name: "index.html",label: "index.html",fileType: "html",outputPath: "demo-partials/checkbox/demoBasicUsage/index.html"},ngModule: {module: "checkboxDemo1",dependencies: ["ngMaterial"]}}],url: "/demo/material.components.checkbox"}, {name: "material.components.content",label: "Content",demos: [{id: "contentdemoBasicUsage",css: [],html: [],js: [{name: "script.js",label: "script.js",fileType: "js",outputPath: "demo-partials/content/demoBasicUsage/script.js"}],moduleName: "material.components.content",name: "demoBasicUsage",label: "Basic Usage",index: {name: "index.html",label: "index.html",fileType: "html",outputPath: "demo-partials/content/demoBasicUsage/index.html"},ngModule: {module: "contentDemo1",dependencies: ["ngMaterial"]}}],url: "/demo/material.components.content"}, {name: "material.components.dialog",label: "Dialog",demos: [{id: "dialogdemoBasicUsage",css: [{name: "style.css",label: "style.css",fileType: "css",outputPath: "demo-partials/dialog/demoBasicUsage/style.css"}],html: [{name: "dialog1.tmpl.html",label: "dialog1.tmpl.html",fileType: "html",outputPath: "demo-partials/dialog/demoBasicUsage/dialog1.tmpl.html"}],js: [{name: "script.js",label: "script.js",fileType: "js",outputPath: "demo-partials/dialog/demoBasicUsage/script.js"}],moduleName: "material.components.dialog",name: "demoBasicUsage",label: "Basic Usage",index: {name: "index.html",label: "index.html",fileType: "html",outputPath: "demo-partials/dialog/demoBasicUsage/index.html"},ngModule: {module: "dialogDemo1",dependencies: ["ngMaterial"]}}],url: "/demo/material.components.dialog"}, {name: "material.components.divider",label: "Divider",demos: [{id: "dividerdemoBasicUsage",css: [{name: "style.css",label: "style.css",fileType: "css",outputPath: "demo-partials/divider/demoBasicUsage/style.css"}],html: [],js: [{name: "script.js",label: "script.js",fileType: "js",outputPath: "demo-partials/divider/demoBasicUsage/script.js"}],moduleName: "material.components.divider",name: "demoBasicUsage",label: "Basic Usage",index: {name: "index.html",label: "index.html",fileType: "html",outputPath: "demo-partials/divider/demoBasicUsage/index.html"},ngModule: {module: "dividerDemo1",dependencies: ["ngMaterial"]}}],url: "/demo/material.components.divider"}, {name: "material.components.input",label: "Input",demos: [{id: "inputdemoBasicUsage",css: [],html: [],js: [{name: "script.js",label: "script.js",fileType: "js",outputPath: "demo-partials/input/demoBasicUsage/script.js"}],moduleName: "material.components.input",name: "demoBasicUsage",label: "Basic Usage",index: {name: "index.html",label: "index.html",fileType: "html",outputPath: "demo-partials/input/demoBasicUsage/index.html"},ngModule: {module: "inputBasicDemo",dependencies: ["ngMaterial", "ngMessages"]}}, {id: "inputdemoErrors",css: [],html: [],js: [{name: "script.js",label: "script.js",fileType: "js",outputPath: "demo-partials/input/demoErrors/script.js"}],moduleName: "material.components.input",name: "demoErrors",label: "Errors",index: {name: "index.html",label: "index.html",fileType: "html",outputPath: "demo-partials/input/demoErrors/index.html"},ngModule: {module: "inputErrorsApp",dependencies: ["ngMaterial", "ngMessages"]}}],url: "/demo/material.components.input"}, {name: "material.components.list",label: "List",demos: [{id: "listdemoBasicUsage",css: [{name: "style.css",label: "style.css",fileType: "css",outputPath: "demo-partials/list/demoBasicUsage/style.css"}],html: [],js: [{name: "script.js",label: "script.js",fileType: "js",outputPath: "demo-partials/list/demoBasicUsage/script.js"}],moduleName: "material.components.list",name: "demoBasicUsage",label: "Basic Usage",index: {name: "index.html",label: "index.html",fileType: "html",outputPath: "demo-partials/list/demoBasicUsage/index.html"},ngModule: {module: "listDemo1",dependencies: ["ngMaterial"]}}],url: "/demo/material.components.list"}, {name: "material.components.progressCircular",label: "Progress Circular",demos: [{id: "progressCirculardemoBasicUsage",css: [{name: "style.css",label: "style.css",fileType: "css",outputPath: "demo-partials/progressCircular/demoBasicUsage/style.css"}],html: [],js: [{name: "script.js",label: "script.js",fileType: "js",outputPath: "demo-partials/progressCircular/demoBasicUsage/script.js"}],moduleName: "material.components.progressCircular",name: "demoBasicUsage",label: "Basic Usage",index: {name: "index.html",label: "index.html",fileType: "html",outputPath: "demo-partials/progressCircular/demoBasicUsage/index.html"},ngModule: {module: "progressCircularDemo1",dependencies: ["ngMaterial"]}}],url: "/demo/material.components.progressCircular"}, {name: "material.components.progressLinear",label: "Progress Linear",demos: [{id: "progressLineardemoBasicUsage",css: [{name: "style.css",label: "style.css",fileType: "css",outputPath: "demo-partials/progressLinear/demoBasicUsage/style.css"}],html: [],js: [{name: "script.js",label: "script.js",fileType: "js",outputPath: "demo-partials/progressLinear/demoBasicUsage/script.js"}],moduleName: "material.components.progressLinear",name: "demoBasicUsage",label: "Basic Usage",index: {name: "index.html",label: "index.html",fileType: "html",outputPath: "demo-partials/progressLinear/demoBasicUsage/index.html"},ngModule: {module: "progressLinearDemo1",dependencies: ["ngMaterial"]}}],url: "/demo/material.components.progressLinear"}, {name: "material.components.radioButton",label: "Radio Button",demos: [{id: "radioButtondemoBasicUsage",css: [{name: "style.css",label: "style.css",fileType: "css",outputPath: "demo-partials/radioButton/demoBasicUsage/style.css"}],html: [],js: [{name: "script.js",label: "script.js",fileType: "js",outputPath: "demo-partials/radioButton/demoBasicUsage/script.js"}],moduleName: "material.components.radioButton",name: "demoBasicUsage",label: "Basic Usage",index: {name: "index.html",label: "index.html",fileType: "html",outputPath: "demo-partials/radioButton/demoBasicUsage/index.html"},ngModule: {module: "radioDemo1",dependencies: ["ngMaterial"]}}],url: "/demo/material.components.radioButton"}, {name: "material.components.sidenav",label: "Sidenav",demos: [{id: "sidenavdemoBasicUsage",css: [],html: [],js: [{name: "script.js",label: "script.js",fileType: "js",outputPath: "demo-partials/sidenav/demoBasicUsage/script.js"}],moduleName: "material.components.sidenav",name: "demoBasicUsage",label: "Basic Usage",index: {name: "index.html",label: "index.html",fileType: "html",outputPath: "demo-partials/sidenav/demoBasicUsage/index.html"},ngModule: {module: "sidenavDemo1",dependencies: ["ngMaterial"]}}],url: "/demo/material.components.sidenav"}, {name: "material.components.slider",label: "Slider",demos: [{id: "sliderdemoBasicUsage",css: [{name: "style.css",label: "style.css",fileType: "css",outputPath: "demo-partials/slider/demoBasicUsage/style.css"}],html: [],js: [{name: "script.js",label: "script.js",fileType: "js",outputPath: "demo-partials/slider/demoBasicUsage/script.js"}],moduleName: "material.components.slider",name: "demoBasicUsage",label: "Basic Usage",index: {name: "index.html",label: "index.html",fileType: "html",outputPath: "demo-partials/slider/demoBasicUsage/index.html"},ngModule: {module: "sliderDemo1",dependencies: ["ngMaterial"]}}],url: "/demo/material.components.slider"}, {name: "material.components.subheader",label: "Subheader",demos: [{id: "subheaderdemoBasicUsage",css: [{name: "style.css",label: "style.css",fileType: "css",outputPath: "demo-partials/subheader/demoBasicUsage/style.css"}],html: [],js: [{name: "script.js",label: "script.js",fileType: "js",outputPath: "demo-partials/subheader/demoBasicUsage/script.js"}],moduleName: "material.components.subheader",name: "demoBasicUsage",label: "Basic Usage",index: {name: "index.html",label: "index.html",fileType: "html",outputPath: "demo-partials/subheader/demoBasicUsage/index.html"},ngModule: {module: "subheaderBasicDemo",dependencies: ["ngMaterial"]}}],url: "/demo/material.components.subheader"}, {name: "material.components.switch",label: "Switch",demos: [{id: "switchdemoBasicUsage",css: [{name: "style.css",label: "style.css",fileType: "css",outputPath: "demo-partials/switch/demoBasicUsage/style.css"}],html: [],js: [{name: "script.js",label: "script.js",fileType: "js",outputPath: "demo-partials/switch/demoBasicUsage/script.js"}],moduleName: "material.components.switch",name: "demoBasicUsage",label: "Basic Usage",index: {name: "index.html",label: "index.html",fileType: "html",outputPath: "demo-partials/switch/demoBasicUsage/index.html"},ngModule: {module: "switchDemo1",dependencies: ["ngMaterial"]}}],url: "/demo/material.components.switch"}, {name: "material.components.tabs",label: "Tabs",demos: [{id: "tabsdemoDynamicTabs",css: [{name: "style.css",label: "style.css",fileType: "css",outputPath: "demo-partials/tabs/demoDynamicTabs/style.css"}],html: [],js: [{name: "script.js",label: "script.js",fileType: "js",outputPath: "demo-partials/tabs/demoDynamicTabs/script.js"}],moduleName: "material.components.tabs",name: "demoDynamicTabs",label: "Dynamic Tabs",index: {name: "index.html",label: "index.html",fileType: "html",outputPath: "demo-partials/tabs/demoDynamicTabs/index.html"},ngModule: {module: "tabsDemo2",dependencies: ["ngMaterial"]}}, {id: "tabsdemoStaticTabs",css: [{name: "style.css",label: "style.css",fileType: "css",outputPath: "demo-partials/tabs/demoStaticTabs/style.css"}],html: [],js: [{name: "script.js",label: "script.js",fileType: "js",outputPath: "demo-partials/tabs/demoStaticTabs/script.js"}],moduleName: "material.components.tabs",name: "demoStaticTabs",label: "Static Tabs",index: {name: "index.html",label: "index.html",fileType: "html",outputPath: "demo-partials/tabs/demoStaticTabs/index.html"},ngModule: {module: "tabsDemo1",dependencies: ["ngMaterial"]}}],url: "/demo/material.components.tabs"}, {name: "material.components.toast",label: "Toast",demos: [{id: "toastdemoBasicUsage",css: [],html: [{name: "toast-template.html",label: "toast-template.html",fileType: "html",outputPath: "demo-partials/toast/demoBasicUsage/toast-template.html"}],js: [{name: "script.js",label: "script.js",fileType: "js",outputPath: "demo-partials/toast/demoBasicUsage/script.js"}],moduleName: "material.components.toast",name: "demoBasicUsage",label: "Basic Usage",index: {name: "index.html",label: "index.html",fileType: "html",outputPath: "demo-partials/toast/demoBasicUsage/index.html"},ngModule: {module: "toastDemo1",dependencies: ["ngMaterial"]}}],url: "/demo/material.components.toast"}, {name: "material.components.toolbar",label: "Toolbar",demos: [{id: "toolbardemoBasicUsage",css: [],html: [],js: [{name: "script.js",label: "script.js",fileType: "js",outputPath: "demo-partials/toolbar/demoBasicUsage/script.js"}],moduleName: "material.components.toolbar",name: "demoBasicUsage",label: "Basic Usage",index: {name: "index.html",label: "index.html",fileType: "html",outputPath: "demo-partials/toolbar/demoBasicUsage/index.html"},ngModule: {module: "toolbarDemo1",dependencies: ["ngMaterial"]}}, {id: "toolbardemoScrollShrink",css: [{name: "style.css",label: "style.css",fileType: "css",outputPath: "demo-partials/toolbar/demoScrollShrink/style.css"}],html: [],js: [{name: "script.js",label: "script.js",fileType: "js",outputPath: "demo-partials/toolbar/demoScrollShrink/script.js"}],moduleName: "material.components.toolbar",name: "demoScrollShrink",label: "Scroll Shrink",index: {name: "index.html",label: "index.html",fileType: "html",outputPath: "demo-partials/toolbar/demoScrollShrink/index.html"},ngModule: {module: "toolbarDemo2",dependencies: ["ngMaterial"]}}],url: "/demo/material.components.toolbar"}, {name: "material.components.tooltip",label: "Tooltip",demos: [{id: "tooltipdemoBasicUsage",css: [{name: "style.css",label: "style.css",fileType: "css",outputPath: "demo-partials/tooltip/demoBasicUsage/style.css"}],html: [],js: [{name: "script.js",label: "script.js",fileType: "js",outputPath: "demo-partials/tooltip/demoBasicUsage/script.js"}],moduleName: "material.components.tooltip",name: "demoBasicUsage",label: "Basic Usage",index: {name: "index.html",label: "index.html",fileType: "html",outputPath: "demo-partials/tooltip/demoBasicUsage/index.html"},ngModule: {module: "tooltipDemo1",dependencies: ["ngMaterial"]}}],url: "/demo/material.components.tooltip"}, {name: "material.components.whiteframe",label: "Whiteframe",demos: [{id: "whiteframedemoBasicUsage",css: [{name: "style.css",label: "style.css",fileType: "css",outputPath: "demo-partials/whiteframe/demoBasicUsage/style.css"}],html: [],js: [{name: "script.js",label: "script.js",fileType: "js",outputPath: "demo-partials/whiteframe/demoBasicUsage/script.js"}],moduleName: "material.components.whiteframe",name: "demoBasicUsage",label: "Basic Usage",index: {name: "index.html",label: "index.html",fileType: "html",outputPath: "demo-partials/whiteframe/demoBasicUsage/index.html"},ngModule: {module: "whiteframeBasicUsage",dependencies: ["ngMaterial"]}}],url: "/demo/material.components.whiteframe"}]), DocsApp.directive("layoutAlign", function() {
    return angular.noop
}).directive("layout", function() {
    return angular.noop
}).directive("docsDemo", ["$mdUtil", function() {
        function e(e, t, n, o) {
            function a(e) {
                switch (e) {
                    case "index.html":
                        return "HTML";
                    case "script.js":
                        return "JS";
                    case "style.css":
                        return "CSS";
                    default:
                        return e
                }
            }
            var r = this;
            r.interpolateCode = angular.isDefined(n.interpolateCode), r.demoId = o(n.demoId || "")(e.$parent), r.demoTitle = o(n.demoTitle || "")(e.$parent), r.demoModule = o(n.demoModule || "")(e.$parent), r.files = {css: [],js: [],html: []}, r.addFile = function(e, t) {
                var n = {name: a(e),contentsPromise: t,fileType: e.split(".").pop()};
                t.then(function(e) {
                    n.contents = e
                }), "index.html" === e ? r.files.index = n : (r.files[n.fileType] = r.files[n.fileType] || [], r.files[n.fileType].push(n)), r.orderedFiles = [].concat(r.files.index || []).concat(r.files.js || []).concat(r.files.css || []).concat(r.files.html || [])
            }
        }
        return {restrict: "E",scope: !0,templateUrl: "partials/docs-demo.tmpl.html",transclude: !0,controller: ["$scope", "$element", "$attrs", "$interpolate", e],controllerAs: "demoCtrl",bindToController: !0}
    }]).directive("demoFile", ["$q", "$interpolate", function(e, t) {
        function n(n, o) {
            var a = o.contents, r = n.html(), i = o.name;
            return n.contents().remove(), function(n, o, l, d) {
                d.addFile(t(i)(n), e.when(n.$eval(a) || r)), o.remove()
            }
        }
        return {restrict: "E",require: "^docsDemo",compile: n}
    }]), DocsApp.directive("demoInclude", ["$q", "$http", "$compile", "$templateCache", "$timeout", function(e, t, n, o, a) {
        function r(t, o, r) {
            function i() {
                c.index.contentsPromise.then(function(a) {
                    s = angular.element('<div class="demo-content ' + m + '">');
                    var r, i, c = !!m;
                    c ? (angular.bootstrap(s[0], [m]), r = s.scope(), i = s.injector().get("$compile"), t.$on("$destroy", function() {
                        r.$destroy()
                    })) : (r = t.$new(), i = n), e.all([l(), d()]).finally(function() {
                        r.$evalAsync(function() {
                            o.append(s), s.html(a), i(s.contents())(r)
                        })
                    })
                })
            }
            function l() {
                return e.all(c.css.map(function(e) {
                    return e.contentsPromise
                })).then(function(e) {
                    e = e.join("\n");
                    var n = angular.element("<style>" + e + "</style>");
                    document.body.appendChild(n[0]), t.$on("$destroy", function() {
                        n.remove()
                    })
                })
            }
            function d() {
                return e.all(c.html.map(function(e) {
                    return e.contentsPromise.then(function(n) {
                        var o = s.injector().get("$templateCache");
                        o.put(e.name, n), t.$on("$destroy", function() {
                            o.remove(e.name)
                        })
                    })
                }))
            }
            var s, c = t.$eval(r.files) || {}, m = t.$eval(r.module) || "";
            a(i)
        }
        return {restrict: "E",link: r}
    }]), angular.module("docsApp").run(["$templateCache", function(e) {
        e.put("partials/demo.tmpl.html", '<docs-demo ng-repeat="demo in demos" \n  demo-id="{{demo.id}}" demo-title="{{demo.label}}" demo-module="{{demo.ngModule.module}}">\n  <demo-file ng-repeat="file in demo.$files"\n             name="{{file.name}}" contents="file.httpPromise">\n  </demo-file>\n</docs-demo>\n')
    }]), angular.module("docsApp").run(["$templateCache", function(e) {
        e.put("partials/docs-demo.tmpl.html", '<div layout="column" layout-fill class="doc-content">\n  <div flex layout="column" style="z-index:1">\n\n    <div ng-transclude></div>\n\n    <section class="demo-container md-whiteframe-z1"\n      ng-class="{\'show-source\': demoCtrl.$showSource}" >\n\n      <md-toolbar class="demo-toolbar" >\n        <div class="md-toolbar-tools">\n          <span>{{demoCtrl.demoTitle}}</span>\n          <span flex></span>\n          <md-button\n            style="min-width: 72px;"\n            layout="row" layout-align="center center"\n            ng-click="demoCtrl.$showSource = !demoCtrl.$showSource">\n            <md-icon icon="/img/icons/ic_visibility_24px.svg"\n               style="margin: 0 4px 0 0;">\n            </md-icon>\n            Source\n          </md-button>\n        </div>\n      </md-toolbar>\n\n      <!-- Source views -->\n      <md-tabs style="border-top: solid 1px #00ADC3;"\n        class="demo-source-tabs" ng-show="demoCtrl.$showSource">\n        <md-tab ng-repeat="file in demoCtrl.orderedFiles" label="{{file.name}}">\n          <md-content md-scroll-y class="demo-source-container">\n            <hljs code="file.contentsPromise" lang="{{file.fileType}}" should-interpolate="demoCtrl.interpolateCode">\n            </hljs>\n          </md-c>\n        </md-tab>\n      </md-tabs>\n\n      <!-- Live Demos -->\n      <demo-include files="demoCtrl.files" module="demoCtrl.demoModule" class="{{demoCtrl.demoId}}">\n      </demo-include>\n    </section>\n\n  </div>\n</div>\n')
    }]), angular.module("docsApp").run(["$templateCache", function(e) {
        e.put("partials/home.tmpl.html", '<div ng-controller="HomeCtrl" layout="column" class="doc-content">\n    <md-content class="extraPad" >\n        <p>\n            <a href="http://www.google.com/design/spec/material-design/">Material Design</a> is a specification for a\n            unified system of visual, motion, and interaction design that adapts across different devices and different\n            screen sizes.\n\n            Below is a brief video that presents the Material Design system:\n        </p>\n\n        <md-content layout="row" layout-align="center center" style="padding-bottom: 25px;" >\n            <iframe width="560" height="315" title="Material Design" src="//www.youtube.com/embed/Q8TXgCzxEnw"\n                    frameborder="0" allowfullscreen></iframe>\n        </md-content>\n\n        <p>\n            The Angular Material Design project is a reference implementation effort similar to that provided in the\n            <a href="http://www.polymer-project.org/">Polymer</a> project\'s\n            <a href="http://www.polymer-project.org/docs/elements/paper-elements.html">Paper elements</a>\n            collection. This project provides a set of AngularJS UI elements that implement the material design system.\n\n        <h3>Useful Links:</h3>\n\n        <ul>\n            <li>To contribute, fork our GitHub <a href="https://github.com/angular/material">repository</a>.</li>\n            <li>For problems,\n                <a href="https://github.com/angular/material/issues?q=is%3Aissue+is%3Aopen" target="_blank">\n                    search the issues\n                </a> and/or\n                <a href="https://github.com/angular/material/issues/new" target="_blank">\n                    create a new issue\n                </a>.\n            </li>\n            <li>For questions,\n                <a href="https://groups.google.com/forum/#!forum/ngmaterial" target="_blank">\n                    search the forum\n                </a> and/or post a new message.\n            </li>\n            <li>These docs were generated from source in the `master` branch:\n                <ul style="padding-top:5px;">\n                    <li>\n                        at commit <a ng-href="{{BUILDCONFIG.repository}}/commit/{{BUILDCONFIG.commit}}" target="_blank">\n                        v{{BUILDCONFIG.version}}  -  SHA {{BUILDCONFIG.commit.substring(0,7)}}\n                    </a>.\n                    </li>\n                    <li>\n                        on {{BUILDCONFIG.date}} GMT.\n                    </li>\n                </ul>\n\n            </li>\n        </ul>\n        <br/>\n        <br/>\n    </md-content>\n</div>\n\n')
    }]), angular.module("docsApp").run(["$templateCache", function(e) {
        e.put("partials/layout-alignment.tmpl.html", '<div ng-controller="LayoutCtrl" layout="column" layout-fill class="layout-content">\n\n  <p>\n    The <code>layout-align</code> attribute takes two words.\n    The first word says how the children will be aligned in the layout\'s direction, and the second word says how the children will be aligned perpindicular to the layout\'s direction.\n    <br/>\n    Only one word is required for the attribute. For example, <code>layout="row" layout-align="center"</code> would make the elements center horizontally and use the default behavior vertically.\n    <br/>\n    <code>layout="column" layout-align="center end"</code> would make\n    children align along the center vertically and along the end (right) horizontally.\n  </p>\n  <table>\n    <tr>\n      <td>layout-align</td>\n      <td>Sets child alignment.</td>\n    </tr>\n    <tr>\n      <td>layout-align-sm</td>\n      <td>Sets child alignment on devices less than 600px wide.</td>\n    </tr>\n    <tr>\n      <td>layout-align-gt-sm</td>\n      <td>Sets child alignment on devices greater than 600px wide.</td>\n    </tr>\n    <tr>\n      <td>layout-align-md</td>\n      <td>Sets child alignment on devices between 600px and 960px wide.</td>\n    </tr>\n    <tr>\n      <td>layout-align-gt-md</td>\n      <td>Sets child alignment on devices greater than 960px wide.\n    </tr>\n    <tr>\n      <td>layout-align-lg</td>\n      <td>Sets child alignment on devices between 960px and 1200px wide.</td>\n    </tr>\n    <tr>\n      <td>layout-align-gt-lg</td>\n      <td>Sets child alignment on devices greater than 1200px wide.</td>\n    </tr>\n  </table>\n  <p>\n   See below for more examples:\n  </p>\n\n  <section class="layout-panel-parent">\n    <div ng-panel="layoutDemo">\n      <docs-demo demo-title=\'layout="{{layoutDemo.direction}}" layout-align="{{layoutAlign()}}"\' class="small-demo" interpolate-code="true">\n        <demo-file name="index.html">\n          <div layout="{{layoutDemo.direction}}" layout-align="{{layoutAlign()}}">\n            <div>one</div>\n            <div>two</div>\n            <div>three</div>\n          </div>\n        </demo-file>\n      </docs-demo>\n    </div>\n  </section>\n\n  <div layout="column" layout-gt-sm="row" layout-align="space-around">\n\n    <div>\n      <md-subheader>Layout Direction</md-subheader>\n      <md-radio-group ng-model="layoutDemo.direction">\n        <md-radio-button value="row">row</md-radio-button>\n        <md-radio-button value="column">column</md-radio-button>\n      </md-radio-group>\n    </div>\n    <div>\n      <md-subheader>Alignment in Layout Direction ({{layoutDemo.direction == \'row\' ? \'horizontal\' : \'vertical\'}})</md-subheader>\n      <md-radio-group ng-model="layoutDemo.mainAxis">\n        <md-radio-button value="start">start</md-radio-button>\n        <md-radio-button value="center">center</md-radio-button>\n        <md-radio-button value="end">end</md-radio-button>\n        <md-radio-button value="space-around">space-around</md-radio-button>\n        <md-radio-button value="space-between">space-between</md-radio-button>\n      </md-radio-group>\n    </div>\n    <div>\n      <md-subheader>Alignment in Perpendicular Direction ({{layoutDemo.direction == \'column\' ? \'horizontal\' : \'vertical\'}})</md-subheader>\n      <md-radio-group ng-model="layoutDemo.crossAxis">\n        <md-radio-button value="start">start</md-radio-button>\n        <md-radio-button value="center">center</md-radio-button>\n        <md-radio-button value="end">end</md-radio-button>\n      </md-radio-group>\n    </div>\n\n  </div>\n</div>\n')
    }]), angular.module("docsApp").run(["$templateCache", function(e) {
        e.put("partials/layout-container.tmpl.html", '<div ng-controller="LayoutCtrl" layout="column" layout-fill class="layout-content">\n\n  <h3 class="layout-title">Overview</h3>\n  <p>\n    Angular Material\'s responsive CSS layout is built on\n    <a href="http://www.w3.org/TR/css3-flexbox/">flexbox</a>.\n  </p>\n\n  <p>\n    The layout system is based upon element attributes rather than CSS classes.\n    Attributes provide an easy way to set a value (eg `layout="row"`), and additionally\n    helps us separate concerns: attributes define layout, and classes define styling.\n  </p>\n\n  <md-divider></md-divider>\n  <h3 class="layout-title">Layout Attribute</h3>\n  <p>\n    Use the <code>layout</code> attribute on an element to arrange its children\n    horizontally in a row (<code>layout="row"</code>), or vertically in\n    a column (<code>layout="column"</code>). \n  </p>\n\n  <hljs lang="html">\n    <div layout="row">\n      <div>I\'m left.</div>\n      <div>I\'m right.</div>\n    </div>\n    <div layout="column">\n      <div>I\'m above.</div>\n      <div>I\'m below.</div>\n    </div>\n  </hljs>\n\n  <p>\n    See <a href="#/layout/options">Layout Options</a> for information on responsive layouts and other options.\n  </p>\n\n  <!--\n  <md-divider>\n  <docs-demo demo-title="Example App Layout" class="small-demo">\n    <demo-file name="index.html">\n      <div layout="column" layout-fill class="layout-demo">\n        <header>\n          Header\n        </header>\n\n        <section flex layout="column" layout-gt-sm="row">\n          <aside flex flex-gt-sm="20">\n            Menu<br />\n            flex flex-gt-sm="20"\n          </aside>\n          <main flex>\n            Main<br />flex\n          </main>\n        </section>\n\n        <footer>\n          Footer\n        </footer>\n      </div>\n    </demo-file>\n  </docs-demo>\n  <p>\n    In this layout, the header and footer are both using their normal height, while the main\n    content area is flexing, or stretching, to fill the remaining area.\n    <br/><gr/>\n    The app container is a vertical layout, while the main area is a responsive row/column\n    layout, depending upon the screen size. \n    The aside menu is above on mobile, and to the left on larger devices.\n  </p>\n  -->\n</div>\n\n</div>\n')
    }]), angular.module("docsApp").run(["$templateCache", function(e) {
        e.put("partials/layout-grid.tmpl.html", '<div ng-controller="LayoutCtrl" layout="column" layout-fill class="layout-content">\n\n  <p>\n    To customize the size and position of elements in a layout, use the\n    <code>flex</code>, <code>offset</code>, and <code>flex-order</code> attributes.\n  </p>\n\n  <md-divider></md-divider>\n\n  <docs-demo demo-title="Flex Attribute" class="small-demo">\n    <demo-file name="index.html">\n      <div layout="row">\n        <div flex>\n          [flex]\n        </div>\n        <div flex>\n          [flex]\n        </div>\n        <div flex hide-sm>\n          [flex]\n        </div>\n      </div>\n    </demo-file>\n  </docs-demo>\n  <p>\n    Add the <code>flex</code> attribute to a layout\'s child element, and it\n    will flex (stretch) to fill the available area.\n  </p>\n\n\n  <md-divider></md-divider>\n\n  <docs-demo demo-title="Flex Percent Values" class="small-demo">\n    <demo-file name="index.html">\n      <div layout="row" layout-wrap>\n        <div flex="33">\n          [flex="33"]\n        </div>\n        <div flex="55">\n          [flex="55"]\n        </div>\n        <div flex>\n          [flex]\n        </div>\n        <div flex="66">\n          [flex]\n        </div>\n        <div flex="33">\n          [flex]\n        </div>\n      </div>\n    </demo-file>\n  </docs-demo>\n  <p>\n    A layout child\'s <code>flex</code> attribute can be given an integer value from 0-100.\n    The element will stretch to the percentage of available space matching the value.\n    <br/><br/>\n    The <code>flex</code> attribute value is restricted to 33, 66, and multiples\n    of five.\n    <br/>\n    For example: <code>flex="5", flex="20", "flex="33", flex="50", flex="66", flex="75", ...</code>.\n  </p>\n  <p>\n  See the <a href="#/layout/options">layout options page</a> for more information on responsive flex attributes.\n  </p>\n\n  <md-divider></md-divider>\n  <docs-demo demo-title="Flex Order Attribute" class="small-demo">\n    <demo-file name="index.html">\n      <div layout="row" layout-margin>\n        <div flex flex-order="3">\n          [flex-order="3"]\n        </div>\n        <div flex flex-order="2">\n          [flex-order="2"]\n        </div>\n        <div flex flex-order="1">\n          [flex-order="1"]\n        </div>\n      </div>\n    </demo-file>\n  </docs-demo>\n  <p>\n    Add the <code>flex-order</code> attribute to a layout child to set its\n    position within the layout. Any value from 0-9 is accepted.\n  </p>\n  <table>\n    <tr>\n      <td>flex-order</td>\n      <td>Sets element order.</td>\n    </tr>\n    <tr>\n      <td>flex-order-sm</td>\n      <td>Sets element order on devices less than 600px wide.</td>\n    </tr>\n    <tr>\n      <td>flex-order-gt-sm</td>\n      <td>Sets element order on devices greater than 600px wide.</td>\n    </tr>\n    <tr>\n      <td>flex-order-md</td>\n      <td>Sets element order on devices between 600px and 960px wide.</td>\n    </tr>\n    <tr>\n      <td>flex-order-gt-md</td>\n      <td>Sets element order on devices greater than 960px wide.\n    </tr>\n    <tr>\n      <td>flex-order-lg</td>\n      <td>Sets element order on devices between 960px and 1200px wide.</td>\n    </tr>\n    <tr>\n      <td>flex-order-gt-lg</td>\n      <td>Sets element order on devices greater than 1200px wide.</td>\n    </tr>\n  </table>\n</div>\n\n')
    }]), angular.module("docsApp").run(["$templateCache", function(e) {
        e.put("partials/layout-options.tmpl.html", '<div ng-controller="LayoutCtrl" layout="column" layout-fill class="layout-content layout-options">\n\n  <docs-demo demo-title="Responsive Layout" class="small-demo">\n    <demo-file name="index.html">\n      <div layout="row" layout-sm="column">\n        <div flex>\n          I\'m above on mobile, and to the left on larger devices.\n        </div>\n        <div flex>\n          I\'m below on mobile, and to the right on larger devices.\n        </div>\n      </div>\n    </demo-file>\n  </docs-demo>\n\n  <p>\n    See the <a href="#/layout/container">Layout Container</a> page for a basic explanation\n    of layout attributes.\n    <br/>\n    To make your layout change depending upon the device size, there are\n    other <code>layout</code> attributes available:\n  </p>\n\n  <table>\n    <tr>\n      <td>layout</td>\n      <td>Sets the default layout on all devices.</td>\n    </tr>\n    <tr>\n      <td>layout-sm</td>\n      <td>Sets the layout on devices less than 600px wide (phones).</td>\n    </tr>\n    <tr>\n      <td>layout-gt-sm</td>\n      <td>Sets the layout on devices greater than 600px wide (bigger than phones).</td>\n    </tr>\n    <tr>\n      <td>layout-md</td>\n      <td>Sets the layout on devices between 600px and 960px wide (tablets in portrait).</td>\n    </tr>\n    <tr>\n      <td>layout-gt-md</td>\n      <td>Sets the layout on devices greater than 960px wide (bigger than tablets in portrait).</td>\n    </tr>\n    <tr>\n      <td>layout-lg</td>\n      <td>Sets the layout on devices between 960 and 1200px wide (tablets in landscape).</td>\n    </tr>\n    <tr>\n      <td>layout-gt-lg</td>\n      <td>Sets the layout on devices greater than 1200px wide (computers and large screens).</td>\n    </tr>\n  </table>\n  <br/>\n\n  <md-divider></md-divider>\n\n  <docs-demo demo-title="Layout Margin, Padding and Fill" class="small-demo">\n    <demo-file name="index.html">\n      <div layout="row" layout-margin layout-fill layout-padding>\n        <div flex>I\'m on the left, and there\'s an empty area around me.</div>\n        <div flex>I\'m on the right, and there\'s an empty area around me.</div>\n      </div>\n    </demo-file>\n  </docs-demo>\n\n  <p>\n    <code>layout-margin</code> adds margin around each <code>flex</code> child. It also adds a margin to the layout container itself.\n    <br/>\n    <code>layout-padding</code> adds padding inside each <code>flex</code> child. It also adds padding to the layout container itself.\n    <br/>\n    <code>layout-fill</code> forces the layout element to fill its parent container.\n  </p>\n\n  <br/>\n\n  <md-divider></md-divider>\n\n  <docs-demo demo-title="Wrap" class="small-demo">\n    <demo-file name="index.html">\n      <div layout="row" layout-wrap>\n        <div flex="33">[flex=33]</div>\n        <div flex="66">[flex=66]</div>\n        <div flex="66">[flex=66]</div>\n        <div flex="33">[flex=33]</div>\n      </div>\n    </demo-file>\n  </docs-demo>\n  <p>\n    <code>layout-wrap</code> allows <code>flex</code> children to wrap within the container if the elements use more than 100%.\n    <br/>\n  </p>\n\n  <br/>\n\n  <md-divider></md-divider>\n\n  <docs-demo demo-title="Responsive Flex & Offset Attributes" class="small-demo">\n    <demo-file name="index.html">\n      <div layout="row">\n        <div flex="66" flex-sm="33">\n          I flex to one-third of the space on mobile, and two-thirds on other devices.\n        </div>\n        <div flex="33" flex-sm="66">\n          I flex to two-thirds of the space on mobile, and one-third on other devices.\n        </div>\n      </div>\n    </demo-file>\n  </docs-demo>\n\n  <p>\n    See the <a href="#/layout/grid">Layout Grid</a> page for a basic explanation\n    of flex and offset attributes.\n  </p>\n\n  <table>\n    <tr>\n      <td>flex</td>\n      <td>Sets flex.</td>\n    </tr>\n    <tr>\n      <td>flex-sm</td>\n      <td>Sets flex on devices less than 600px wide.</td>\n    </tr>\n    <tr>\n      <td>flex-gt-sm</td>\n      <td>Sets flex on devices greater than 600px wide.</td>\n    </tr>\n    <tr>\n      <td>flex-md</td>\n      <td>Sets flex on devices between 600px and 960px wide..</td>\n    </tr>\n    <tr>\n      <td>flex-gt-md</td>\n      <td>Sets flex on devices greater than 960px wide.\n    </tr>\n    <tr>\n      <td>flex-lg</td>\n      <td>Sets flex on devices between 960px and 1200px.</td>\n    </tr>\n    <tr>\n      <td>flex-gt-lg</td>\n      <td>Sets flex on devices greater than 1200px wide.</td>\n    </tr>\n  </table>\n\n  <md-divider></md-divider>\n\n  <docs-demo demo-title="Hide and Show Attributes" class="small-demo">\n    <demo-file name="index.html">\n      <div layout layout-align="center center">\n        <md-subheader hide-sm>\n          I\'m hidden on mobile and shown on larger devices.\n        </md-subheader>\n        <md-subheader hide-gt-sm>\n          I\'m shown on mobile and hidden on larger devices.\n        </md-subheader>\n      </div>\n    </demo-file>\n  </docs-demo>\n  <br/>\n  <table>\n    <tr>\n      <td>hide</td>\n      <td><code>display: none</code></td>\n    </tr>\n    <tr>\n      <td>hide-sm</td>\n      <td><code>display: none</code> on devices less than 600px wide.</td>\n    </tr>\n    <tr>\n      <td>hide-gt-sm</td>\n      <td><code>display: none</code> on devices greater than 600px wide.</td>\n    </tr>\n    <tr>\n      <td>hide-md</td>\n      <td><code>display: none</code> on devices between 600px and 960px wide.</td>\n    </tr>\n    <tr>\n      <td>hide-gt-md</td>\n      <td><code>display: none</code> on devices greater than 960px wide.\n    </tr>\n    <tr>\n      <td>hide-lg</td>\n      <td><code>display: none</code> on devices between 960px and 1200px.</td>\n    </tr>\n    <tr>\n      <td>hide-gt-lg</td>\n      <td><code>display: none</code> on devices greater than 1200px wide.</td>\n    </tr>\n    <tr>\n      <td>show</td>\n      <td>Negates hide.</td>\n    </tr>\n    <tr>\n      <td>show-sm</td>\n      <td>Negates hide on devices less than 600px wide.</td>\n    </tr>\n    <tr>\n      <td>show-gt-sm</td>\n      <td>Negates hide on devices greater than 600px wide.</td>\n    </tr>\n    <tr>\n      <td>show-md</td>\n      <td>Negates hide on devices between 600px and 960px wide..</td>\n    </tr>\n    <tr>\n      <td>show-gt-md</td>\n      <td>Negates hide on devices greater than 960px wide.\n    </tr>\n    <tr>\n      <td>show-lg</td>\n      <td>Negates hide on devices between 960px and 1200px.</td>\n    </tr>\n    <tr>\n      <td>show-gt-lg</td>\n      <td>Negates hide on devices greater than 1200px wide.</td>\n    </tr>\n  </table>\n\n</div>\n')
    }]), angular.module("docsApp").run(["$templateCache", function(e) {
        e.put("partials/view-source.tmpl.html", '<md-dialog class="view-source-dialog">\n\n  <md-tabs>\n    <md-tab ng-repeat="file in files"\n                  active="file === data.selectedFile"\n                  ng-click="data.selectedFile = file" >\n        <span class="window_label">{{file.viewType}}</span>\n    </md-tab>\n  </md-tabs>\n\n  <div class="md-content" md-scroll-y flex>\n    <div ng-repeat="file in files">\n      <hljs code="file.content"\n        lang="{{file.fileType}}"\n        ng-show="file === data.selectedFile" >\n      </hljs>\n    </div>\n  </div>\n\n  <div class="md-actions" layout="horizontal">\n    <md-button class="md-button-light" ng-click="$hideDialog()">\n      Done\n    </md-button>\n  </div>\n</md-dialog>\n')
    }]), DocsApp.directive("hljs", ["$timeout", "$q", "$interpolate", function(e, t, n) {
        return {restrict: "E",compile: function(o, a) {
                var r;
                return a.code || (r = o.html(), o.empty()), function(o, a, i) {
                    function l(e, t) {
                        var n = t.find("code"), o = e.split("\n");
                        o = o.filter(function(e) {
                            return e.trim().length
                        });
                        var a = o[0].match(/^\s*/)[0], r = new RegExp("^" + a);
                        o = o.map(function(e) {
                            return e.replace(r, "").replace(/\s+$/, "")
                        });
                        var l = hljs.highlight(i.language || i.lang, o.join("\n"), !0);
                        l.value = l.value.replace(/=<span class="hljs-value">""<\/span>/gi, "").replace("<head>", "").replace("<head/>", ""), n.append(l.value).addClass("highlight")
                    }
                    i.code && (r = o.$eval(i.code));
                    var d = o.$eval(i.shouldInterpolate);
                    t.when(r).then(function(t) {
                        if (t) {
                            d && (t = n(t)(o));
                            var r = angular.element('<pre><code class="highlight" ng-non-bindable></code></pre>');
                            a.append(r), e(function() {
                                l(t, r)
                            }, 34, !1)
                        }
                    })
                }
            }}
    }]);
var hljs = new function() {
    function e(e) {
        return e.replace(/&/gm, "&amp;").replace(/</gm, "&lt;").replace(/>/gm, "&gt;")
    }
    function t(e) {
        return e.nodeName.toLowerCase()
    }
    function n(e, t) {
        var n = e && e.exec(t);
        return n && 0 == n.index
    }
    function o(e) {
        var t = (e.className + " " + (e.parentNode ? e.parentNode.className : "")).split(/\s+/);
        return t = t.map(function(e) {
            return e.replace(/^lang(uage)?-/, "")
        }), t.filter(function(e) {
            return b(e) || "no-highlight" == e
        })[0]
    }
    function a(e, t) {
        var n = {};
        for (var o in e)
            n[o] = e[o];
        if (t)
            for (var o in t)
                n[o] = t[o];
        return n
    }
    function r(e) {
        var n = [];
        return function o(e, a) {
            for (var r = e.firstChild; r; r = r.nextSibling)
                3 == r.nodeType ? a += r.nodeValue.length : "br" == t(r) ? a += 1 : 1 == r.nodeType && (n.push({event: "start",offset: a,node: r}), a = o(r, a), n.push({event: "stop",offset: a,node: r}));
            return a
        }(e, 0), n
    }
    function i(n, o, a) {
        function r() {
            return n.length && o.length ? n[0].offset != o[0].offset ? n[0].offset < o[0].offset ? n : o : "start" == o[0].event ? n : o : n.length ? n : o
        }
        function i(n) {
            function o(t) {
                return " " + t.nodeName + '="' + e(t.value) + '"'
            }
            c += "<" + t(n) + Array.prototype.map.call(n.attributes, o).join("") + ">"
        }
        function l(e) {
            c += "</" + t(e) + ">"
        }
        function d(e) {
            ("start" == e.event ? i : l)(e.node)
        }
        for (var s = 0, c = "", m = []; n.length || o.length; ) {
            var u = r();
            if (c += e(a.substr(s, u[0].offset - s)), s = u[0].offset, u == n) {
                m.reverse().forEach(l);
                do
                    d(u.splice(0, 1)[0]), u = r();
                while (u == n && u.length && u[0].offset == s);
                m.reverse().forEach(i)
            } else
                "start" == u[0].event ? m.push(u[0].node) : m.pop(), d(u.splice(0, 1)[0])
        }
        return c + e(a.substr(s))
    }
    function l(e) {
        function t(e) {
            return e && e.source || e
        }
        function n(n, o) {
            return RegExp(t(n), "m" + (e.cI ? "i" : "") + (o ? "g" : ""))
        }
        function o(r, i) {
            if (!r.compiled) {
                if (r.compiled = !0, r.k = r.k || r.bK, r.k) {
                    var l = {}, d = function(t, n) {
                        e.cI && (n = n.toLowerCase()), n.split(" ").forEach(function(e) {
                            var n = e.split("|");
                            l[n[0]] = [t, n[1] ? Number(n[1]) : 1]
                        })
                    };
                    "string" == typeof r.k ? d("keyword", r.k) : Object.keys(r.k).forEach(function(e) {
                        d(e, r.k[e])
                    }), r.k = l
                }
                r.lR = n(r.l || /\b[A-Za-z0-9_]+\b/, !0), i && (r.bK && (r.b = "\\b(" + r.bK.split(" ").join("|") + ")\\b"), r.b || (r.b = /\B|\b/), r.bR = n(r.b), r.e || r.eW || (r.e = /\B|\b/), r.e && (r.eR = n(r.e)), r.tE = t(r.e) || "", r.eW && i.tE && (r.tE += (r.e ? "|" : "") + i.tE)), r.i && (r.iR = n(r.i)), void 0 === r.r && (r.r = 1), r.c || (r.c = []);
                var s = [];
                r.c.forEach(function(e) {
                    e.v ? e.v.forEach(function(t) {
                        s.push(a(e, t))
                    }) : s.push("self" == e ? r : e)
                }), r.c = s, r.c.forEach(function(e) {
                    o(e, r)
                }), r.starts && o(r.starts, i);
                var c = r.c.map(function(e) {
                    return e.bK ? "\\.?(" + e.b + ")\\.?" : e.b
                }).concat([r.tE, r.i]).map(t).filter(Boolean);
                r.t = c.length ? n(c.join("|"), !0) : {exec: function() {
                        return null
                    }}, r.continuation = {}
            }
        }
        o(e)
    }
    function d(t, o, a, r) {
        function i(e, t) {
            for (var o = 0; o < t.c.length; o++)
                if (n(t.c[o].bR, e))
                    return t.c[o]
        }
        function c(e, t) {
            return n(e.eR, t) ? e : e.eW ? c(e.parent, t) : void 0
        }
        function m(e, t) {
            return !a && n(t.iR, e)
        }
        function u(e, t) {
            var n = $.cI ? t[0].toLowerCase() : t[0];
            return e.k.hasOwnProperty(n) && e.k[n]
        }
        function p(e, t, n, o) {
            var a = o ? "" : v.classPrefix, r = '<span class="' + a, i = n ? "" : "</span>";
            return r += e + '">', r + t + i
        }
        function h() {
            if (!M.k)
                return e(w);
            var t = "", n = 0;
            M.lR.lastIndex = 0;
            for (var o = M.lR.exec(w); o; ) {
                t += e(w.substr(n, o.index - n));
                var a = u(M, o);
                a ? (C += a[1], t += p(a[0], e(o[0]))) : t += e(o[0]), n = M.lR.lastIndex, o = M.lR.exec(w)
            }
            return t + e(w.substr(n))
        }
        function f() {
            if (M.sL && !E[M.sL])
                return e(w);
            var t = M.sL ? d(M.sL, w, !0, M.continuation.top) : s(w);
            return M.r > 0 && (C += t.r), "continuous" == M.subLanguageMode && (M.continuation.top = t.top), p(t.language, t.value, !1, !0)
        }
        function g() {
            return void 0 !== M.sL ? f() : h()
        }
        function y(t, n) {
            var o = t.cN ? p(t.cN, "", !0) : "";
            t.rB ? (x += o, w = "") : t.eB ? (x += e(n) + o, w = "") : (x += o, w = n), M = Object.create(t, {parent: {value: M}})
        }
        function T(t, n) {
            if (w += t, void 0 === n)
                return x += g(), 0;
            var o = i(n, M);
            if (o)
                return x += g(), y(o, n), o.rB ? 0 : n.length;
            var a = c(M, n);
            if (a) {
                var r = M;
                r.rE || r.eE || (w += n), x += g();
                do
                    M.cN && (x += "</span>"), C += M.r, M = M.parent;
                while (M != a.parent);
                return r.eE && (x += e(n)), w = "", a.starts && y(a.starts, ""), r.rE ? 0 : n.length
            }
            if (m(n, M))
                throw new Error('Illegal lexeme "' + n + '" for mode "' + (M.cN || "<unnamed>") + '"');
            return w += n, n.length || 1
        }
        var $ = b(t);
        if (!$)
            throw new Error('Unknown language: "' + t + '"');
        l($);
        for (var M = r || $, x = "", A = M; A != $; A = A.parent)
            A.cN && (x += p(A.cN, x, !0));
        var w = "", C = 0;
        try {
            for (var k, S, N = 0; ; ) {
                if (M.t.lastIndex = N, k = M.t.exec(o), !k)
                    break;
                S = T(o.substr(N, k.index - N), k[0]), N = k.index + S
            }
            T(o.substr(N));
            for (var A = M; A.parent; A = A.parent)
                A.cN && (x += "</span>");
            return {r: C,value: x,language: t,top: M}
        } catch (_) {
            if (-1 != _.message.indexOf("Illegal"))
                return {r: 0,value: e(o)};
            throw _
        }
    }
    function s(t, n) {
        n = n || v.languages || Object.keys(E);
        var o = {r: 0,value: e(t)}, a = o;
        return n.forEach(function(e) {
            if (b(e)) {
                var n = d(e, t, !1);
                n.language = e, n.r > a.r && (a = n), n.r > o.r && (a = o, o = n)
            }
        }), a.language && (o.second_best = a), o
    }
    function c(e) {
        return v.tabReplace && (e = e.replace(/^((<[^>]+>|\t)+)/gm, function(e, t) {
            return t.replace(/\t/g, v.tabReplace)
        })), v.useBR && (e = e.replace(/\n/g, "<br>")), e
    }
    function m(e) {
        var t = v.useBR ? e.innerHTML.replace(/\n/g, "").replace(/<br>|<br [^>]*>/g, "\n").replace(/<[^>]*>/g, "") : e.textContent, n = o(e);
        if ("no-highlight" != n) {
            var a = n ? d(n, t, !0) : s(t), l = r(e);
            if (l.length) {
                var m = document.createElementNS("http://www.w3.org/1999/xhtml", "pre");
                m.innerHTML = a.value, a.value = i(l, r(m), t)
            }
            a.value = c(a.value), e.innerHTML = a.value, e.className += " hljs " + (!n && a.language || ""), e.result = {language: a.language,re: a.r}, a.second_best && (e.second_best = {language: a.second_best.language,re: a.second_best.r})
        }
    }
    function u(e) {
        v = a(v, e)
    }
    function p() {
        if (!p.called) {
            p.called = !0;
            var e = document.querySelectorAll("pre code");
            Array.prototype.forEach.call(e, m)
        }
    }
    function h() {
        addEventListener("DOMContentLoaded", p, !1), addEventListener("load", p, !1)
    }
    function f(e, t) {
        var n = E[e] = t(this);
        n.aliases && n.aliases.forEach(function(t) {
            y[t] = e
        })
    }
    function g() {
        return Object.keys(E)
    }
    function b(e) {
        return E[e] || E[y[e]]
    }
    var v = {classPrefix: "hljs-",tabReplace: null,useBR: !1,languages: void 0}, E = {}, y = {};
    this.highlight = d, this.highlightAuto = s, this.fixMarkup = c, this.highlightBlock = m, this.configure = u, this.initHighlighting = p, this.initHighlightingOnLoad = h, this.registerLanguage = f, this.listLanguages = g, this.getLanguage = b, this.inherit = a, this.IR = "[a-zA-Z][a-zA-Z0-9_]*", this.UIR = "[a-zA-Z_][a-zA-Z0-9_]*", this.NR = "\\b\\d+(\\.\\d+)?", this.CNR = "(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)", this.BNR = "\\b(0b[01]+)", this.RSR = "!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~", this.BE = {b: "\\\\[\\s\\S]",r: 0}, this.ASM = {cN: "string",b: "'",e: "'",i: "\\n",c: [this.BE]}, this.QSM = {cN: "string",b: '"',e: '"',i: "\\n",c: [this.BE]}, this.PWM = {b: /\b(a|an|the|are|I|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such)\b/}, this.CLCM = {cN: "comment",b: "//",e: "$",c: [this.PWM]}, this.CBCM = {cN: "comment",b: "/\\*",e: "\\*/",c: [this.PWM]}, this.HCM = {cN: "comment",b: "#",e: "$",c: [this.PWM]}, this.NM = {cN: "number",b: this.NR,r: 0}, this.CNM = {cN: "number",b: this.CNR,r: 0}, this.BNM = {cN: "number",b: this.BNR,r: 0}, this.CSSNM = {cN: "number",b: this.NR + "(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?",r: 0}, this.RM = {cN: "regexp",b: /\//,e: /\/[gim]*/,i: /\n/,c: [this.BE, {b: /\[/,e: /\]/,r: 0,c: [this.BE]}]}, this.TM = {cN: "title",b: this.IR,r: 0}, this.UTM = {cN: "title",b: this.UIR,r: 0}
};
hljs.registerLanguage("javascript", function(e) {
    return {aliases: ["js"],k: {keyword: "in if for while finally var new function do return void else break catch instanceof with throw case default try this switch continue typeof delete let yield const class",literal: "true false null undefined NaN Infinity",built_in: "eval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent encodeURI encodeURIComponent escape unescape Object Function Boolean Error EvalError InternalError RangeError ReferenceError StopIteration SyntaxError TypeError URIError Number Math Date String RegExp Array Float32Array Float64Array Int16Array Int32Array Int8Array Uint16Array Uint32Array Uint8Array Uint8ClampedArray ArrayBuffer DataView JSON Intl arguments require module console window document"},c: [{cN: "pi",b: /^\s*('|")use strict('|")/,r: 10}, e.ASM, e.QSM, e.CLCM, e.CBCM, e.CNM, {b: "(" + e.RSR + "|\\b(case|return|throw)\\b)\\s*",k: "return throw case",c: [e.CLCM, e.CBCM, e.RM, {b: /</,e: />;/,r: 0,sL: "xml"}],r: 0}, {cN: "function",bK: "function",e: /\{/,eE: !0,c: [e.inherit(e.TM, {b: /[A-Za-z$_][0-9A-Za-z$_]*/}), {cN: "params",b: /\(/,e: /\)/,c: [e.CLCM, e.CBCM],i: /["'\(]/}],i: /\[|%/}, {b: /\$[(.]/}, {b: "\\." + e.IR,r: 0}]}
}), hljs.registerLanguage("css", function(e) {
    var t = "[a-zA-Z-][a-zA-Z0-9_-]*", n = {cN: "function",b: t + "\\(",rB: !0,eE: !0,e: "\\("};
    return {cI: !0,i: "[=/|']",c: [e.CBCM, {cN: "id",b: "\\#[A-Za-z0-9_-]+"}, {cN: "class",b: "\\.[A-Za-z0-9_-]+",r: 0}, {cN: "attr_selector",b: "\\[",e: "\\]",i: "$"}, {cN: "pseudo",b: ":(:)?[a-zA-Z0-9\\_\\-\\+\\(\\)\\\"\\']+"}, {cN: "at_rule",b: "@(font-face|page)",l: "[a-z-]+",k: "font-face page"}, {cN: "at_rule",b: "@",e: "[{;]",c: [{cN: "keyword",b: /\S+/}, {b: /\s/,eW: !0,eE: !0,r: 0,c: [n, e.ASM, e.QSM, e.CSSNM]}]}, {cN: "tag",b: t,r: 0}, {cN: "rules",b: "{",e: "}",i: "[^\\s]",r: 0,c: [e.CBCM, {cN: "rule",b: "[^\\s]",rB: !0,e: ";",eW: !0,c: [{cN: "attribute",b: "[A-Z\\_\\.\\-]+",e: ":",eE: !0,i: "[^\\s]",starts: {cN: "value",eW: !0,eE: !0,c: [n, e.CSSNM, e.QSM, e.ASM, e.CBCM, {cN: "hexcolor",b: "#[0-9A-Fa-f]+"}, {cN: "important",b: "!important"}]}}]}]}]}
}), hljs.registerLanguage("xml", function() {
    var e = "[A-Za-z0-9\\._:-]+", t = {b: /<\?(php)?(?!\w)/,e: /\?>/,sL: "php",subLanguageMode: "continuous"}, n = {eW: !0,i: /</,r: 0,c: [t, {cN: "attribute",b: e,r: 0}, {b: "=",r: 0,c: [{cN: "value",v: [{b: /"/,e: /"/}, {b: /'/,e: /'/}, {b: /[^\s\/>]+/}]}]}]};
    return {aliases: ["html", "xhtml", "rss", "atom", "xsl", "plist"],cI: !0,c: [{cN: "doctype",b: "<!DOCTYPE",e: ">",r: 10,c: [{b: "\\[",e: "\\]"}]}, {cN: "comment",b: "<!--",e: "-->",r: 10}, {cN: "cdata",b: "<\\!\\[CDATA\\[",e: "\\]\\]>",r: 10}, {cN: "tag",b: "<style(?=\\s|>|$)",e: ">",k: {title: "style"},c: [n],starts: {e: "</style>",rE: !0,sL: "css"}}, {cN: "tag",b: "<script(?=\\s|>|$)",e: ">",k: {title: "script"},c: [n],starts: {e: "</script>",rE: !0,sL: "javascript"}}, {b: "<%",e: "%>",sL: "vbscript"}, t, {cN: "pi",b: /<\?\w+/,e: /\?>/,r: 10}, {cN: "tag",b: "</?",e: "/?>",c: [{cN: "title",b: "[^ /><]+",r: 0}, n]}]}
}), DocsApp.directive("ngPanel", ["$animate", function(e) {
        return {restrict: "EA",transclude: "element",terminal: !0,compile: function(t, n) {
                var o = n.ngPanel || n["for"], a = /^(\S+)(?:\s+track by (.+?))?$/, r = a.exec(o), i = !0, l = r[1], d = r[2];
                return d ? i = !1 : d = r[1], function(t, n, o, a, r) {
                    var s, c;
                    t[i ? "$watchCollection" : "$watch"](d, function(o) {
                        s && e.leave(s), c && (c.$destroy(), c = null);
                        i ? o : t.$eval(l);
                        c = t.$new(), r(c, function(t) {
                            s = t, e.enter(t, null, n)
                        })
                    })
                }
            }}
    }]);

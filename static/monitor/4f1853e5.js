(function() {
    if (typeof window.monitor != "undefined")
        return;
    var e = "V1.2.3(2012.9.3)"
      , t = "360.cn"
      , n = function(r, s) {
        var o = document
          , u = navigator
          , a = r.screen
          , f = document.domain.toLowerCase()
          , l = u.userAgent.toLowerCase()
          , c = {
            trim: function(e) {
                return e.replace(/^[\s\xa0\u3000]+|[\u3000\xa0\s]+$/g, "")
            }
        }
          , h = {
            on: function(e, t, n) {
                e.addEventListener ? e && e.addEventListener(t, n, !1) : e && e.attachEvent("on" + t, n)
            },
            parentNode: function(e, t, n) {
                n = n || 5,
                t = t.toUpperCase();
                while (e && n-- > 0) {
                    if (e.tagName === t)
                        return e;
                    e = e.parentNode
                }
                return null 
            }
        }
          , p = {
            fix: function(e) {
                if (!("target" in e)) {
                    var t = e.srcElement || e.target;
                    t && t.nodeType == 3 && (t = t.parentNode),
                    e.target = t
                }
                return e
            }
        }
          , d = function() {
            function e(e) {
                return e != null  && e.constructor != null  ? Object.prototype.toString.call(e).slice(8, -1) : ""
            }
            return {
                isArray: function(t) {
                    return e(t) == "Array"
                },
                isObject: function(e) {
                    return e !== null  && typeof e == "object"
                },
                mix: function(e, t, n) {
                    for (i in t)
                        if (n || !(e[i] || i in e))
                            e[i] = t[i];
                    return e
                },
                encodeURIJson: function(e) {
                    var t = [];
                    for (var n in e) {
                        if (e[n] == null )
                            continue;t.push(encodeURIComponent(n) + "=" + encodeURIComponent(e[n]))
                    }
                    return t.join("&")
                }
            }
        }()
          , v = {
            get: function(e) {
                var t, n = new RegExp("(^| )" + e + "=([^;]*)(;|$)");
                return (t = o.cookie.match(n)) ? unescape(t[2]) : ""
            },
            set: function(e, t, n) {
                n = n || {};
                var r = n.expires;
                typeof r == "number" && (r = new Date,
                r.setTime(r.getTime() + n.expires)),
                o.cookie = e + "=" + escape(t) + (r ? ";expires=" + r.toGMTString() : "") + (n.path ? ";path=" + n.path : "") + (n.domain ? "; domain=" + n.domain : "")
            }
        }
          , m = {
            getProject: function() {
                return ""
            },
            getReferrer: function() {
                return o.referrer
            },
            getBrowser: function() {
                var e = {
                    "360se-ua": "360se",
                    TT: "tencenttraveler",
                    Maxthon: "maxthon",
                    GreenBrowser: "greenbrowser",
                    Sogou: "se 1.x / se 2.x",
                    TheWorld: "theworld"
                };
                for (i in e)
                    if (l.indexOf(e[i]) > -1)
                        return i;
                var t = !1;
                try {
                    +external.twGetVersion(external.twGetSecurityID(r)).replace(/\./g, "") > 1013 && (t = !0)
                } catch (n) {}
                if (t)
                    return "360se-noua";
                var s = l.match(/(msie|chrome|safari|firefox|opera)/);
                return s = s ? s[0] : "",
                s == "msie" && (s = l.match(/msie[^;]+/)),
                s
            },
            getLocation: function() {
                var e = "";
                try {
                    e = location.href
                } catch (t) {
                    e = o.createElement("a"),
                    e.href = "",
                    e = e.href
                }
                return e = e.replace(/[?#].*$/, ""),
                e = /\.(s?htm|php)/.test(e) ? e : e.replace(/\/$/, "") + "/",
                e
            },
            getGuid: function() {
                function e(e) {
                    var t = 0
                      , n = 0
                      , r = e.length - 1;
                    for (r; r >= 0; r--) {
                        var i = parseInt(e.charCodeAt(r), 10);
                        t = (t << 6 & 268435455) + i + (i << 14),
                        (n = t & 266338304) != 0 && (t ^= n >> 21)
                    }
                    return t
                }
                function n() {
                    var t = [u.appName, u.version, u.language || u.browserLanguage, u.platform, u.userAgent, a.width, "x", a.height, a.colorDepth, o.referrer].join("")
                      , n = t.length
                      , i = r.history.length;
                    while (i)
                        t += i-- ^ n++;
                    return (Math.round(Math.random() * 2147483647) ^ e(t)) * 2147483647
                }
                var i = "__guid"
                  , s = v.get(i);
                if (!s) {
                    s = [e(o.domain), n(), +(new Date) + Math.random() + Math.random()].join(".");
                    var l = {
                        expires: 2592e7,
                        path: "/"
                    };
                    if (t) {
                        var c = "." + t;
                        if (f.indexOf(c) > 0 && f.lastIndexOf(c) == f.length - c.length || f == c)
                            l.domain = c
                    }
                    v.set(i, s, l)
                }
                return function() {
                    return s
                }
            }(),
            getCount: function() {
                var e = "count"
                  , t = v.get(e);
                return t = (parseInt(t) || 0) + 1,
                v.set(e, t, {
                    expires: 864e5,
                    path: "/"
                }),
                function() {
                    return t
                }
            }(),
            getFlashVer: function() {
                var e = -1;
                if (u.plugins && u.mimeTypes.length) {
                    var t = u.plugins["Shockwave Flash"];
                    t && t.description && (e = t.description.replace(/([a-zA-Z]|\s)+/, "").replace(/(\s)+r/, ".") + ".0")
                } else if (r.ActiveXObject && !r.opera)
                    for (var n = 16; n >= 2; n--)
                        try {
                            var i = new ActiveXObject("ShockwaveFlash.ShockwaveFlash." + n);
                            if (i) {
                                var s = i.GetVariable("$version");
                                e = s.replace(/WIN/g, "").replace(/,/g, ".")
                            }
                        } catch (o) {}
                return e = parseInt(e, 10),
                function() {
                    return e
                }
            }(),
            getContainerId: function(e) {
                var t = y.areaIds;
                if (t) {
                    var n, r = new RegExp("^(" + t.join("|") + ")$","ig");
                    while (e) {
                        if (e.id && r.test(e.id))
                            return (e.getAttribute("data-desc") || e.id).substr(0, 100);
                        e = e.parentNode
                    }
                }
                return ""
            },
            getText: function(e) {
                return c.trim((e.getAttribute("text") || e.innerText || e.textContent || e.title || "").substr(0, 100))
            }
        }
          , g = {
            getBase: function() {
                return {
                    p: m.getProject(),
                    u: m.getLocation(),
                    id: m.getGuid(),
                    guid: m.getGuid()
                }
            },
            getTrack: function() {
                return {
                    b: m.getBrowser(),
                    c: m.getCount(),
                    r: m.getReferrer(),
                    fl: m.getFlashVer()
                }
            },
            getClick: function(e) {
                e = p.fix(e || event);
                var t = e.target
                  , n = t.tagName
                  , r = m.getContainerId(t);
                if (t.type != "submit") {
                    if (n == "AREA")
                        return {
                            f: t.href,
                            c: "area:" + t.parentNode.name,
                            cId: r
                        };
                    var f, l;
                    return n == "IMG" && (f = t),
                    t = h.parentNode(t, "A"),
                    t ? (l = m.getText(t),
                    {
                        f: t.href,
                        c: l ? l : f ? f.src.match(/[^\/]+$/) : "",
                        cId: r
                    }) : !1
                }
                var i = h.parentNode(t, "FORM");
                if (i) {
                    var s = i.id || ""
                      , o = t.id
                      , u = {
                        f: i.action,
                        c: "form:" + (i.name || s),
                        cId: r
                    };
                    if ((s == "search-form" || s == "searchForm") && (o == "searchBtn" || o == "search-btn")) {
                        var a = b("kw") || b("search-kw") || b("kw1");
                        u.w = a ? a.value : ""
                    }
                    return u
                }
            },
            getKeydown: function(e) {
                e = p.fix(e || event);
                if (e.keyCode != 13)
                    return !1;
                var t = e.target
                  , n = t.tagName
                  , r = m.getContainerId(t);
                if (n == "INPUT") {
                    var i = h.parentNode(t, "FORM");
                    if (i) {
                        var s = i.id || ""
                          , o = t.id
                          , u = {
                            f: i.action,
                            c: "form:" + (i.name || s),
                            cId: r
                        };
                        if (o == "kw" || o == "search-kw" || o == "kw1")
                            u.w = t.value;
                        return u
                    }
                }
                return !1
            }
        }
          , y = {
            trackUrl: null ,
            clickUrl: null ,
            areaIds: null 
        }
          , b = function(e) {
            return document.getElementById(e)
        }
        ;
        return {
            version: e,
            util: m,
            data: g,
            config: y,
            sendLog: function() {
                return r.__monitor_imgs = {},
                function(e) {
                    var t = "log_" + +(new Date)
                      , n = r.__monitor_imgs[t] = new Image;
                    n.onload = n.onerror = function() {
                        r.__monitor_imgs[t] = null ,
                        delete r.__monitor_imgs[t]
                    }
                    ,
                    n.src = e
                }
            }(),
            buildLog: function() {
                var e = "";
                return function(t, n) {
                    if (t === !1)
                        return;
                    t = t || {};
                    var r = g.getBase();
                    t = d.mix(r, t, !0);
                    var i = n + d.encodeURIJson(t);
                    if (i == e)
                        return;
                    e = i,
                    setTimeout(function() {
                        e = ""
                    }, 500);
                    var s = d.encodeURIJson(t);
                    s += "&t=" + +(new Date),
                    n = n.indexOf("?") > -1 ? n + "&" + s : n + "?" + s,
                    this.sendLog(n)
                }
            }(),
            log: function(e, t) {
                t = t || "click";
                var n = y[t + "Url"];
                n || alert("Error : the " + t + "url does not exist!"),
                this.buildLog(e, n)
            },
            setConf: function(e, t) {
                var n = {};
                return d.isObject(e) ? n = e : n[e] = t,
                this.config = d.mix(this.config, n, !0),
                this
            },
            setUrl: function(e) {
                return e && (this.util.getLocation = function() {
                    return e
                }
                ),
                this
            },
            setProject: function(e) {
                return e && (this.util.getProject = function() {
                    return e
                }
                ),
                this
            },
            setId: function() {
                var e = [], t = 0, n;
                while (n = arguments[t++])
                    d.isArray(n) ? e = e.concat(n) : e.push(n);
                return this.setConf("areaIds", e),
                this
            },
            getTrack: function() {
                var e = this.data.getTrack();
                return this.log(e, "track"),
                this
            },
            getClickAndKeydown: function() {
                var e = this;
                return h.on(o, "click", function(t) {
                    var n = e.data.getClick(t);
                    e.log(n, "click")
                }),
                h.on(o, "keydown", function(t) {
                    var n = e.data.getKeydown(t);
                    e.log(n, "click")
                }),
                n.getClickAndKeydown = function() {
                    return e
                }
                ,
                this
            }
        }
    }(window);
    n.setConf({
        trackUrl: "http://s.360.cn/w360/s.htm",
        clickUrl: "http://s.360.cn/w360/c.htm",
        wpoUrl: "http://s.360.cn/w360/p.htm"
    }),
    window.monitor = n
})();

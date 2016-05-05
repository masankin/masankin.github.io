var Tool = {
    isCN: function(e) {
        var t = new RegExp("[\u4e00-\u9fa5]");
        return t.test(e)
    },
    cookie: {
        get: function(e) {
            var t = []
              , n = {}
              , r = []
              , i = document.cookie;
            t = i.split(";");
            for (var s = 0, o = t.length; s < o; s++) {
                r = t[s].replace(/^\s+/, "").replace(/\s+$/, ""),
                r = r.split("="),
                n[r[0]] = r[1];
                if (r[0] == e)
                    return r[1]
            }
            return e ? null  : n
        },
        set: function(e, t, n, r, i, s) {
            var o = encodeURIComponent(e) + "=" + encodeURIComponent(t);
            n instanceof Date && (o += "; expires=" + n.toGMTString()),
            r && (o += "; path=" + r),
            i && (o += "; domain=" + i),
            s && (o += "; secure"),
            document.cookie = o
        }
    },
    getURI: function(e) {
        var t = Tool.getJsonHref();
        if (typeof e == "string" && e.indexOf(",") < 0)
            return t[e];
        var n = [];
        typeof e == "string" && e.indexOf(",") > 0 ? n = e.split(",") : _keys instanceof Array && (n = e);
        var r = [];
        for (var i = 0; i < n.length; i++)
            t[n[i]] && r.push(t[n[i]]);
        return r.join("&")
    },
    getJsonHref: function() {
        var e = window.location.href
          , t = window.location.search.replace("?", "")
          , n = arguments[0] == "undefined" ? "" : arguments[0]
          , r = t.split("&")
          , i = {};
        for (var s = 0; s < r.length; s++) {
            var o = r[s].split("=");
            Tool.isCN(o[1]) ? i[o[0]] = o[0] + "=" + encodeURIComponent(o[1]) : i[o[0]] = r[s]
        }
        return i
    },
    addCss: function(e) {
        if (document.createStyleSheet) {
            var t = document.createStyleSheet();
            t.cssText = e
        } else {
            var n = document.createElement("style");
            n.type = "text/css",
            n.appendChild(document.createTextNode(e)),
            document.getElementsByTagName("HEAD")[0].appendChild(n)
        }
    }
};
document.getElementById("input").focus();
var Xueshu = {
    pid: "home"
};
Xueshu.log = function(e, t, n) {
    var r = {
        pro: "xueshu",
        pid: this.pid,
        mod: e
    };
    for (var i in t)
        r[i] = t[i];
    monitor.setConf("logUrl", "http://s.360.cn/xueshu/" + (n || "click") + ".gif").log(r, "log")
}
,
Xueshu.log("show"),
function() {
    function e() {
        var e = Tool.cookie.get("__sid");
        if (e)
            return e;
        var t = monitor.util.getGuid()
          , n = t + "." + +(new Date);
        return Tool.cookie.set("__sid", n),
        n
    }
    $(document).scroll(function() {
        $("#page_bg").height(0).height(document.body.scrollHeight)
    }),
    $("body").scroll(function() {
        $("#page_bg").height(0).height(document.documentElement.scrollHeight)
    });
    var t = null 
      , n = null 
      , r = $("#so-nav-more")
      , i = $("#so-nav-tabs-more");
    i.hover(function() {
        clearTimeout(n),
        t = setTimeout(function() {
            r.show()
        }, 200)
    }, function() {
        clearTimeout(t),
        n = setTimeout(function() {
            r.hide()
        }, 200)
    }),
    r.hover(function() {
        clearTimeout(n),
        t = setTimeout(function() {
            r.show()
        }, 200)
    }, function() {
        clearTimeout(t),
        n = setTimeout(function() {
            r.hide()
        }, 200)
    }),
    $("#bd_tabnav a[data-s]").bind("click", function() {
        var e = $(this)
          , t = $.trim($("#input").val())
          , n = e.attr("data-s");
        t && n && (n = n.replace(/%q%/g, encodeURIComponent(t)),
        e.attr("href", n))
    })
}();

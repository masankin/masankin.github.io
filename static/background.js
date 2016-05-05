(function(e, t) {
    var n = t.getElementById("background");
    if (!n.getContext)
        return !1;
    var r = t.getElementById("tmp"), i = {
        create: function(e, t) {
            for (var n in t)
                e.prototype[n] = t[n];
            return e
        },
        extend: function(e, t, n) {
            t.prototype = new e;
            var r = this.create(t, n);
            r.prototype._super = function() {
                e.apply(this, arguments)
            }
            ;
            for (var i in e.prototype)
                r.prototype["_super_" + i] = e.prototype[i];
            return r
        }
    }, s = i.create(function() {}, {
        move: function() {
            B[3] && (this.x = (this.x - a / 2) * Math.cos(B[3] * Math.PI / 180) - this.z * Math.sin(B[3] * Math.PI / 180) + a / 2,
            this.z = this.z * Math.cos(B[3] * Math.PI / 180) + (this.x - a / 2) * Math.sin(B[3] * Math.PI / 180)),
            B[2] ? this.z += B[2] : this.z -= 1,
            this.x += B[0] * .1,
            this.y += B[1] * .1,
            this.render()
        },
        render: function() {},
        reinit: function(e) {
            this.create(e)
        },
        create: function(e) {
            var t, n, r, i = !1;
            if (e === 1)
                this.type === 1 ? r = d : r = m;
            else if (e === 2)
                this.type === 1 ? r = v : r = g;
            else if (e === 3) {
                t = this.x,
                n = this.y,
                r = this.z;
                var s = (p + r) / p;
                t < (1 - k) * a / 2 ? t = a * (s + 1) / 2 + C * Math.random() : t > a + (k - 1) * a / 2 && (t = a * (1 - s) / 2 - C * Math.random()),
                n < (1 - k) * f / 2 ? n = f * (s + 1) / 2 + C * Math.random() : n > f + (k - 1) * f / 2 && (n = f * (1 - s) / 2 - C * Math.random()),
                B[2] > 0 ? r = v : B[2] < 0 && (r = d)
            } else
                this.type === 1 ? r = Math.random() * (d - v) + v : r = Math.random() * (m - g) + g;
            if (e !== 3 || i) {
                var o = p / (p + r);
                this.type === 1 ? (t = -a * (k - 1) / 2 + Math.random() * a * k,
                n = -f * (k - 1) / 2 + Math.random() * f * k) : this.t ? (t = Math.random() * (a - this.width),
                n = Math.random() * f) : (t = -a * (L - 1) / 2 + Math.random() * a * L,
                n = -f * (L - 1) / 2 + Math.random() * f * L)
            }
            this.x = t,
            this.y = n,
            this.z = r
        }
    }), o = i.extend(s, function() {
        this.type = Math.random() < c ? 1 : 2,
        this.create()
    }, {
        render: function() {
            if (this.type === 1 && this.z < v || this.type === 2 && this.z < g) {
                this.reinit(1);
                return
            }
            if (this.type === 1 && this.z > d || this.type === 2 && this.z > m) {
                this.reinit(2);
                return
            }
            var e = p / (p + this.z)
              , t = a / 2 + (this.x - a / 2) * e
              , n = f / 2 + (this.y - f / 2) * e;
            if (t < 0 || t > a || n < 0 || n > f)
                return;
            e = Math.round(e * 100) / 100;
            var r = .8;
            this.type === 1 ? this.z > d - 200 ? r = Math.round(d - this.z) * .8 / 200 : this.z < v + 100 && (r = Math.round(this.z - v) * .8 / 100) : this.z > m - 100 ? r = Math.round(m - this.z) * .8 / 100 : this.z < g + 50 && (r = Math.round(this.z - g) * .8 / 50);
            var i = P.createRadialGradient(t, n, 0, t, n, this.r * e * (.5 + 1 / this.type));
            i.addColorStop(0, "rgba(118,252,255," + r + ")"),
            i.addColorStop(.5, "rgba(118,252,255," + r + ")"),
            i.addColorStop(.501, "rgba(109,252,255," + .75 * r + ")"),
            i.addColorStop(.65, "rgba(109,252,255," + .2 * r + ")"),
            i.addColorStop(.9, "rgba(109,252,255,0)"),
            P.fillStyle = i,
            P.beginPath(),
            P.arc(t, n, this.r * e * (.5 + 1 / this.type), 0, Math.PI * 2, !0),
            P.closePath(),
            P.fill()
        },
        create: function(e) {
            this.imgData || (this._super_create(e),
            this.r = Math.random() * h[1] + h[0])
        }
    }), u = i.extend(s, function(e) {
        this.type = 2,
        this.create()
    }, {
        render: function() {
            if (this.z < g) {
                this.reinit(1);
                return
            }
            if (this.z > m) {
                this.reinit(2);
                return
            }
            var e = p / (p + this.z)
              , n = a / 2 + (this.x - a / 2) * e
              , r = f / 2 + (this.y - f / 2) * e;
            e = Math.round(e * 100) / 100;
            var i = 1
              , s = !1;
            this.z > m - 100 ? i = Math.round(m - this.z) / 200 : this.z < g + 50 && (i = Math.round(this.z - g) / 100);
            var o = Math.round(this.width * e)
              , u = Math.round(this.height * e);
            n + 15 * e < tt.x && n + 15 * e + o > tt.x && r - 18 * e < tt.y && r - 18 * e + u > tt.y && (tt.click ? (t.getElementById("input").value = this.t,
            t.getElementById("input-container").parentNode.submit(),
            U.clear(F)) : !tt.hover && tt.enable && (tt.hover = !0,
            s = !0));
            var l = P.createRadialGradient(n, r, 0, n, r, 12 * e);
            l.addColorStop(0, "rgba(116,252,255," + i + ")"),
            l.addColorStop(.4, "rgba(116,252,255," + i + ")"),
            l.addColorStop(.401, "rgba(109,252,255," + .75 * i + ")"),
            l.addColorStop(.65, "rgba(109,252,255," + .2 * i + ")"),
            l.addColorStop(.9, "rgba(109,252,255,0)"),
            P.fillStyle = l,
            P.beginPath(),
            P.arc(n, r, 12 * e, 0, Math.PI * 2, !0),
            P.closePath(),
            P.fill(),
            s && (P.strokeStyle = "rgba(117,252,255,0.4)",
            P.stroke());
            var c = new Image;
            c.src = this.imgData,
            P.globalAlpha = 1,
            s || (P.globalAlpha = i * .6);
            try {
                P.drawImage(c, 0, 0, c.width, c.height, n + 15 * e, r - 14 * e, Math.round(c.width * e), Math.round(c.height * e))
            } catch (h) {}
            P.globalAlpha = 1
        },
        create: function(e) {
            this._super_create(e),
            this.t = O[Math.floor(Math.random() * D)];
            var t = P.measureText(this.t);
            H.clearRect(0, 0, 400, 400),
            H.fillStyle = "rgba(255,255,255,0.8)",
            H.font = "24px Microsoft Yahei",
            H.textBaseline = "middle",
            H.fillText(this.t, 0, 12),
            H.getImageData(0, 0, t.width, 24),
            this.imgData = r.toDataURL("image/png"),
            this.width = t.width * 20 / 12,
            this.height = 24,
            H.clearRect(0, 0, 400, 400)
        }
    }), a = Math.max(t.documentElement.clientWidth, 960), f = Math.max(t.documentElement.clientHeight, 500), l = 1.3, c = .99, h = [1, 5], p = 500, d = 2500, v = 0, m = 500, g = 0, y = 500, b = 3e3, w = 300, E = 1e5, S = 8, x = .05, T = 20, N = 1, C = 100, k = (p + d) / p, L = (p + m) / p, A = [[.25, .5, 300], [.3, .3, 100], [.18, .6, 100], [.45, .5, 300], [.55, .4, 100], [.5, .75, 200], [.6, .6, 200], [.65, .5, 300], [.7, .3, 200], [.8, .7, 300]], O = ["graphene", "amyloid peptide", "ZnO", "supercapacitor", "big data", "TiO", "Graphene", "MoS", "nature", "thermoelectric", "microRNA", "\u5927\u6570\u636e", "science", "electrospinning", "\u7cd6\u5c3f\u75c5", "autophagy", "chitosan", "social network", "PM2.", "urbanization", "plos one", "innovation", "diabetes", "\u77f3\u58a8\u70ef", "cloud computing", "corporate social responsibility", "biochar", "remanufacturing", "data mining", "graphene oxide", "carbon dots", "social media", "\u7535\u5b50\u5546\u52a1", "H7N", "\u4e91\u8ba1\u7b97", "android", "mycothiol", "HPLC", "internal control", "miRNA", "cancer", "LiFePO", "BiOCl", "SERS", "\u03b2-carboline", "face recognition", "Cu2O", "supply chain", "upconversion", "apoptosis", "\u9057\u4f20\u7b97\u6cd5", "breast cancer", "OLED", "\u4e92\u8054\u7f51\u91d1\u878d", "\u6570\u636e\u6316\u6398", "\u964d\u8840\u8102", "Li4Ti5O", "CZTS", "Nanoparticles", "Co3O", "lncRNA", "schizophrenia", "\u7269\u8054\u7f51", "Fe3O", "meta analysis", "polyaniline", "nano iron particles", "human resource management", "C3N", "laccase", "lung cancer", "perovskite solar cell", "BiVO", "\u7eb3\u7c73\u6750\u6599", "Ag3PO", "\u795e\u7ecf\u7f51\u7edc", "glutathione", "project management", "\u57ce\u9547\u5316", "\u8f6c\u57fa\u56e0", "\u96fe\u973e", "\u5229\u7387\u5e02\u573a\u5316", "metamaterial", "BiFeO", "hydrogel", "mTOR", "beta-Carboline", "deep learning", "ionic liquid", "RNA-seq", "FDI", "Fe2O", "\u79bb\u5b50\u6db2\u4f53", "phosphor", "NaYF", "WO", "depression", "hadoop", "gas sensor", "corporate governance", "social capital", "lignin", "marketing strategy", "microbial fuel cell", "SnO", "NiCo2O", "Drosophila suzukii", "leadership", "In2O", "SNP", "\u98df\u54c1\u5b89\u5168", "DNA methylation", "knowledge sharing", "MnO", "phenology", "cell", "reactive oxygen species", "SVM", "solar cell", "shale gas", "lithium ion battery", "economic growth", "\u58f3\u805a\u7cd6", "\u80c3\u764c", "LED", "\u4e73\u9178\u83cc", "CdS", "CeO", "EST-SSR", "game theory", "communication", "psychology", "hyperspectral", "induced pluripotent stem cells", "mesoporous silica", "photocatalysis", "wavelet", "\u4e73\u817a\u764c", "cancer stem cell", "western blot", "Li2MnO", "LiMn2O", "medium-chain triglycerides", "Glycyrrhiza", "plant DNA methylation", "polysaccharide", "quantum dot", "image segmentation", "iPS cells", "dc motor control", "RFID", "Photocatalytic", "RGD peptide", "\u51a0\u5fc3\u75c5", "carbon nanotube", "Biofuels", "climate change", "nanoparticles", "emotion", "memristor", "DNA", "\u6570\u5b57\u6c34\u5370", "CRISPR", "pm2.5", "PCR", "presupposition", "\u80ba\u764c", "WRKY", "\u9aa8\u8d28\u758f\u677e", "shadow banking", "cyclodextrin", "inventory management", "e-commerce", "\u751f\u6001\u6587\u660e", "biodiesel", "Ta2O", "photocatalytic", "crowdfunding", "java", "food safety", "supply chain finance", "carbon", "nanowire", "\u65e0\u7ebf\u4f20\u611f\u5668\u7f51\u7edc", "drought stress", "online shopping", "\u9ad8\u8840\u538b", "obesity", "ELISA EIAab", "risk management", "carbon nanotubes", "cellulose", "perovskite", "\u5355\u7247\u673a", "stress", "ZnFe2O", "\u77f3\u659b", "\u809d\u764c", "endophytic lichen", "superhydrophobic", "New Fermentation", "\u57ce\u5e02\u5316", "\u94c1\u76ae\u77f3\u659b", "exosome", "FTIR", "finance", "\u4f9b\u5e94\u94fe", "DGGE", "performance management", "TiO", "nanotube", "Bi2MoO", "genetic algorithm", "organizational culture", "Science", "thin film transistor", "\u9502\u79bb\u5b50\u7535\u6c60", "protein", "Corporate Social Responsibility", "\u86cb\u767d\u8d28\u7ec4\u5b66", "DSSC", "globalization", "random lasing", "stem cell", "\u592a\u9633\u80fd\u7535\u6c60", "heavy metal", "drought", "O2O", "entrepreneurship", "venture capital", "BiOBr", "biofilm", "LiCoO", "LiMnPO", "\u8868\u9762\u6d3b\u6027\u5242", "nanopore", "neural network", "supply chain management", "auxin", "biosensor", "\u78b3\u7eb3\u7c73\u7ba1", "multiferroic", "photoacoustic", "\u4f01\u4e1a\u793e\u4f1a\u8d23\u4efb", "digital holography", "\u571f\u58e4\u547c\u5438", "SSR", "critical thinking", "happiness", "biomass", "\u69f2\u76ae\u7d20", "\u91cd\u91d1\u5c5e", "optical limiting", "VEGF", "endophyte", "MoO", "\u4e2d\u5c0f\u4f01\u4e1a\u878d\u8d44", "oxygen reduction reaction", "\u751f\u7269\u591a\u6837\u6027", "macrophage", "\u4ee3\u8c22\u7ec4\u5b66", "network", "photosynthesis", "Xanthoceras sorbifolia", "g-C3N", "soil respiration", "anthocyanin", "BaTiO", "support vector machine", "corporate culture", "mesoporous", "\u4eba\u529b\u8d44\u6e90\u7ba1\u7406", "\u8d85\u7ea7\u7535\u5bb9\u5668", "enzyme", "soybean", "\u5149\u50ac\u5316", "\u5c42\u6b21\u5206\u6790\u6cd5", "Li2FeSiO", "\u538b\u7f29\u611f\u77e5", "\u793e\u4ea4\u7f51\u7edc", "autism", "ethical leadership", "promoter", "GIS", "liver fibrosis", "\u5bab\u9888\u764c", "salt stress", "angiogenesis", "capital structure", "\u9875\u5ca9\u6c14", "logistics", "new media", "\u81ea\u53d1\u6027\u6c14\u80f8\u590d\u53d1", "gas hydrate", "dopamine"], M = [], _ = A.length, D = O.length, P = n.getContext("2d"), H = r.getContext("2d"), B = [0, 0, 0, 0], j = !1, F, I, q, R = e.requestAnimationFrame || e.mozRequestAnimationFrame || e.webkitRequestAnimationFrame || e.msRequestAnimationFrame || e.oRequestAnimationFrame, U = {
        stop: !1,
        reg: function(e) {
            R && !U.stop ? F = R(function() {
                U.stop || (e(),
                F = R(arguments.callee))
            }) : F = setInterval(e, 17)
        },
        clear: function(e) {
            R ? U.stop = !0 : clearInterval(e)
        }
    }, z = function(e) {
        var r = e ? 20 : 0;
        n.setAttribute("width", a - r),
        n.setAttribute("height", f - r),
        I = Math.min(a * f / y, b);
        for (var i = 0; i < I; i++)
            M.push(new o);
        q = Math.min(a * f / E, S);
        for (var s = 0; s < q; s++)
            M.push(new u);
        U.reg(function() {
            P.clearRect(0, 0, a, f),
            j || (B[0] !== 0 && (B[0] = B[0] - Math.abs(B[0]) / B[0]),
            B[1] !== 0 && (B[1] = B[1] - Math.abs(B[1]) / B[1]),
            B[2] !== 0 && (B[2] = B[2] - Math.abs(B[2]) / B[2]),
            B[3] !== 0 && (B[3] = B[3] - .1 * Math.abs(B[3]) / B[3],
            Math.abs(B[3]) < .1 && (B[3] = 0)));
            for (var e = M.length; e--; )
                M[e].r && e > I || M[e].move();
            tt.click = !1,
            tt.hover ? (t.body.style.cursor = "pointer",
            tt.hover = !1) : t.body.style.cursor = "default"
        })
    }
    , W = !1, X = function(e) {
        e === 1 && K.className.indexOf(" up") === -1 ? (K.className = K.className.replace(" down", ""),
        K.className += " up") : e === -1 && K.className.indexOf(" down") === -1 && (K.className = K.className.replace(" up", ""),
        K.className += " down")
    }
    , V = function() {
        K.className = K.className.replace(" down", ""),
        K.className = K.className.replace(" up", "")
    }
    , $ = function(e) {
        var t, n, r = e.keyCode || e.which;
        r == 38 ? (t = 2,
        n = -1) : r == 40 ? (t = 2,
        n = 1) : r == 87 ? (t = 1,
        n = 1) : r == 83 ? (t = 1,
        n = -1) : r == 37 ? (t = 3,
        n = -0.1) : r == 39 ? (t = 3,
        n = .1) : r == 65 ? (t = 0,
        n = 1) : r == 68 && (t = 0,
        n = -1);
        if (t === 0 && Math.abs(B[t]) < x * a || t === 1 && Math.abs(B[t]) < x * f || t === 2 && Math.abs(B[t]) < T || t === 3 && Math.abs(B[t]) < N)
            j = !0,
            B[t] += n;
        t === 2 && X(n)
    }
    , J = function(e) {
        j = !1,
        V()
    }
    ;
    t.addEventListener("keydown", $),
    t.addEventListener("keyup", J);
    var K = t.getElementById("ft_control");
    K.className = "use";
    var Q = {
        up: function(n) {
            t.body.className = t.body.className.replace(" b_move", ""),
            e.removeEventListener("mouseup", Q.up),
            e.removeEventListener("selectstart", Q.unselect),
            clearTimeout(Q.release_timer),
            Q.release_timer = setTimeout(function() {
                clearInterval(Q.move_timer),
                j = !1,
                V()
            }, 500)
        },
        down: function(t) {
            j = !0,
            e.addEventListener("mouseup", Q.up),
            e.addEventListener("selectstart", Q.unselect),
            Q.baseY = t.offsetY || t.layerY,
            Q.baseY < 36 ? move_add = -1 : move_add = 1,
            clearTimeout(Q.release_timer),
            clearInterval(Q.move_timer),
            Q.move_timer = setInterval(function() {
                B[2] += move_add;
                var e = Math.abs(B[2]);
                e > T && (B[2] = T * B[2] / e,
                clearInterval(Q.move_timer))
            }, 50),
            X(move_add),
            t.returnValue = !1
        },
        release_timer: null ,
        move_timer: null ,
        unselect: function(e) {
            e.returnValue = !1
        }
    };
    K.addEventListener("mousedown", Q.down);
    var G = null 
      , Y = function(e) {
        j = !0;
        var t = 0
          , n = e.wheelDelta || e.detail * -1;
        n > 0 ? t = -1 : t = 1,
        B[2] += t;
        var r = Math.abs(B[2]);
        r > T && (B[2] = T * B[2] / r),
        X(t),
        clearTimeout(G),
        G = setTimeout(function() {
            j = !1,
            V()
        }, 500)
    }
    ;
    t.addEventListener("mousewheel", Y),
    t.addEventListener("DOMMouseScroll", Y);
    var Z, et = function() {
        clearTimeout(Z),
        Z = setTimeout(function() {
            U.clear(F);
            for (var e = M.length; e--; )
                M.pop();
            z()
        }, 400)
    }
    ;
    e.addEventListener("resize", et);
    var tt = {
        x: 0,
        y: 0,
        hover: !1,
        click: !1,
        enable: !1
    }
      , nt = t.getElementById("wrap")
      , rt = function(e) {
        if (e.target === nt || e.target === t.getElementById("main") || e.target === t.getElementById("bd_logo"))
            tt.click = !0
    }
      , it = function(e) {
        tt.x = e.pageX,
        tt.y = e.pageY,
        tt.enable = !1;
        if (e.target === nt || e.target === t.getElementById("main") || e.target === t.getElementById("bd_logo"))
            tt.enable = !0
    }
    ;
    nt.addEventListener("click", rt),
    nt.addEventListener("mousemove", it),
    e.addEventListener("load", function() {
        z(!0)
    })
})(window, document);

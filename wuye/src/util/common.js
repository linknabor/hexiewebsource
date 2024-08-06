const common = {

    //获取参数方法
    getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg);  //匹配目标参数
        if (r !== null) {
            return unescape(r[2]);
        }
        return ""; //返回参数值
    },

    //结合微信授权  
    getCallBackParams() {
        var e = location.search,
            o = {};
        if ("" === e || void 0 === e) {
            return o;
        }
        e = e.substr(1).split("&");
        for (var n in e) {
            var t = e[n].split("=");
            o[t[0]] = t[1]
        }
        return o.from && delete o.code,
            o
    },
    removeParamFromUrl(e) {
        return location.pathname + common.buildUrlParamString(common.removeParamObject(e));
    },
    // 添加 定义获取哈希值
    addParamHsah() {
        return location.hash
    },
    removeParamObject(e) {
        var o = this.getCallBackParams()
        for (var n in e) {
            delete o[e[n]]
        }
        return o
    },
    buildUrlParamString(e) {
        var o = "";
        for (var n in e) {o += n + "=" + e[n] + "&";}
        o = o.slice(0, o.length - 1);
        var t = "" === o || void 0 === o
        return t ? "" : "?" + o
    },
    setCookie(e, o, n) {
        var t = e + "=" + o + "; ",
            i = ""
        null !== n && void 0 !== n && (i = "expires=" + new Date(1e3 * n) + "; "),
            document.cookie = t + i + "path=/"
    },
    //支付宝授权取code  
    getCallBackAlipayParams() {
        var e = location.search,
            o = {};
        if ("" === e || void 0 === e) {
            //有路由的情况下，参数在路由后面，需要特殊处理 search取值范围在#之前-?开始
            e = location.hash
            if("" === e || void 0 === e) {
                return o;
            } else {
                if(e.indexOf('?') > -1) {
                    e = e.substr(e.indexOf('?'))
                }
            }
        }
        e = e.substr(1).split("&");
        for (var n in e) {
            var t = e[n].split("=");
            o[t[0]] = t[1]
        }
        return o.from && delete o.auth_code,
        o
    },

}
export default common
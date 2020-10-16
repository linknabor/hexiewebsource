var MasterConfig = function() {
    var t = {
        baseUrl: /127|test/.test(location.origin)?'https://test.e-shequ.cn/wechat/hexie/wechat/':
        /uat/.test(location.origin)?'https://uat.e-shequ.cn/wechat/hexie/wechat/':
        'https://www.e-shequ.cn/wechat/hexie/wechat/',

        basePageUrl:/127|test/.test(location.origin)?'https://test.e-shequ.cn/weixin/':
        /uat/.test(location.origin)?'https://uat.e-shequ.cn/hexie/weixin/':
        'https://www.e-shequ.cn/weixin/',

        appId: /127|test/.test(location.origin)?'wx95f46f41ca5e570e':
        /uat/.test(location.origin)?'wx9ffe0a2b5a64a285':
        'wxbd214f5765f346c1',

        oauthUrl: "https://open.weixin.qq.com/connect/oauth2/authorize?",
        oauthUrlPostFix:"&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect",
        bindAppId: "wxa48ca61b68163483",
        
		//payPageFolder:"https://test.e-shequ.cn/pay/",
        payPageSuffix:"hx",		//hexie

        baidu_map_key:"RUWUgrEEF5VjoaWsstMMZwOD",
        shop_name: "合协",
        
        is_debug:true,
        statistics: {
            baidu_code: "bca1d4564e31c6c46201a8ede08d0fff",
            cnzz_script: '<script src="http://s11.cnzz.com/stat.php?id=1256090623&web_id=1256090623" language="JavaScript"></script>'
        }
    },
    
    e = {};
    return e.C = function(e) {
        return t[e]
    },
    e
} ();


function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}

function getCookie(e) {
    return document.cookie.length > 0 && (c_start = document.cookie.indexOf(e + "="), -1 != c_start) ? (c_start = c_start + e.length + 1, c_end = document.cookie.indexOf(";", c_start), -1 == c_end && (c_end = document.cookie.length), unescape(document.cookie.substring(c_start, c_end))) : ""
}

function dealWithAjaxData(o, e, i, r) {
    if (common.log(o, e), e.success) {
        i(e);
        return;
    }

	r(e);
}

AJAXFlag = !0;
var common = {
    isDebug: !1,
    getApi: function(e) {
        var o = parseInt(getCookie("BackendPort"));
        return MasterConfig.C("baseUrl") + (o ? ":" + o: "") + "/" + e;
    },
    invokeApi: function(e, o, n, t, i, r,c) {
        if (common.alert("url: " + o), AJAXFlag) { (null === t || void 0 === t) && (t = function() {}),
            (null === i || void 0 === i) && (i = function() {}),
            (null === r || void 0 === r) && (r = function() {});
            var a = {
                url: this.getApi(o),
                type: e,
                xhrFields: {
                    withCredentials: !0
                },
                dataType: "json",
                beforeSend: t,
                complete:c,
                success: function(e) {
                    common.alert("success data: " + JSON.stringify(e));
					dealWithAjaxData(o, e, i, r);
                },
                error: function(e) {
                    common.alert("error data: " + JSON.stringify(e)),
                    commonui.hideAjaxLoading();
                }
            };
            null !== n && void 0 !== n && (a.data = JSON.stringify(n), ("PUT" == e || "POST" == e) && (a.contentType = "application/json; charset=UTF-8")),
            $.ajax(a)
        }
    },
    log: function() {
        for (var e = arguments.length,
        o = 0; e > o; o++) console.log(arguments[o])
    },
    alert: function(e) {
        "" === getCookie("DevDebug") ? console.log(e) : alert(e)
    },
    errorTip: function() {
        var e = '<div class="wrapper"></div><div class="box"><p>请重新刷新</p></div>';
        $("body").prepend(e)
    },
	setTitle: function(e) {
        $("title").text(e)
    }
};

var commonui = {
		initPage:function() {
			if ($("#LoadingBar") != null) {
				$("#LoadingBar").css("display","none");
				$("#fade").css("display","none");
			}
		},
		loadingPage:function() {
			if ($("#LoadingBar") != null) {
				$("#LoadingBar").css("display","block");
				$("#fade").css("display","block");
			}
		},
		showMessage:function(msg) {
			commonui.showMsg(msg, 1500);
		},
		showMsg:function(msg, times) {
			commonui.hideAjaxLoading();
			if ($("#phoneErro") != null) {
				$("#phoneErro").html(msg);
				$("#phoneErro").fadeIn("slow");
				setTimeout('$("#phoneErro").fadeOut("slow")', times);
			}
		},
		showAjaxLoading:function() {
			if ($("#phoneAjax") != null) {
				$("#phoneAjax").removeClass("hidden");
			}
		},
		hideAjaxLoading:function() {
			if ($("#phoneAjax") != null) {
				$("#phoneAjax").addClass("hidden");
			}
		}
}



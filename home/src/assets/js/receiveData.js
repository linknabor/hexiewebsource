import xml2js from'xml2js' 
var xmlParser = new xml2js.Parser({explicitArray : false, ignoreAttrs : true})
    //xml转json
import wx from 'weixin-js-sdk';


let receiveData = {



    /*
     * 微信配置提取的公共方法
     * @param  {objec} vm     [Vue实例]
     * @param  {objec} wx     [微信实例]
     * @param  {string} url     [url地址]
     * @param  {array} apilist    [要调用的微信接口]
     */
    wxconfig(vm,wx,apilist,url){
        vm.axios.post('/getUrlJsSign', {url : url })
            .then(function (res) {
                let a = JSON.parse(res.data)
                let wd = a.result  //接口返回的嵌入数据
                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: wd.appId, // 必填，公众号的唯一标识
                    timestamp: wd.timestamp, // 必填，生成签名的时间戳
                    nonceStr: wd.nonceStr, // 必填，生成签名的随机串
                    signature: wd.signature,// 必填，签名，见附录1
                    jsApiList: apilist // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                });
            })
            .catch(function (err) {
                //alert('暂放-微信config失败')
                console.log('fail', err);
        });
    },

    // chooseWXPay:function(vm,wx,backdataname){
    //     wx.chooseWXPay({
    //         timestamp: 0, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
    //         nonceStr: '', // 支付签名随机串，不长于 32 位
    //         package: '', // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
    //         signType: '', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
    //         paySign: '', // 支付签名
    //         success: function (res) {
    //          alert
    //         }
    //     })
    // },

    /*微信拍照或从手机相册中选图接口*/
    chooseImage:function(vm,wx,backdataname){
        wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                    var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
            },
            fail: function (res){
                console.log("网络不稳定 ，请刷新重试！")
            }
        });
    },


    /*
      * 微信扫一扫提取的公共方法
     * @param  {objec} vm     [Vue实例]
     * @param  {objec} wx     [微信实例]
     * @param  {string} backdataname    [接收微信返回的结果]
    */
    scan:function(vm,wx,backdataname){
        wx.scanQRCode({
            needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
            scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
            success: function (res) {
                    //console.log(res.resultStr)
                     var rs = res.resultStr;
                     if(rs.indexOf('CODE')>=0) {
                        rs = rs.split(',')[1];
                     }
                        vm[backdataname] = rs; // 当needResult 为 1 时，扫码返回的结果
                },
            fail: function (res) {
                    //alert('暂放-配置微信扫一扫失败')
                    console.log("网络不稳定 ，请刷新重试！")
                    //alert("网络不稳定 ，请刷新重试！");
                }
        });
    },

    /*
     * 通过axios获取API数据,并将请求回来列表数据，自动装载到Vue实例模板中
     * @param  {objec} vm     [Vue实例]
     * @param  {string} url    [ajax地址]
     * @param  {string} backdataname [存储ajax返回数据的vm节点的key]
     * @params {object} callback  [回调函数]
     * @param  {object} params       [请求参数]
     */
        //请求数据统一的方法
    getData: function (vm, url, backdataname,callback,params) {
        if (typeof (params) == 'undefined' || typeof (params) != 'object') {
            params = {}
        };
        if (backdataname == '' || typeof (backdataname) != 'string') {
            backdataname = 'data';
        };
        vm.axios.get(url, {
                params: params
            })
            .then(function (res){
                let a = JSON.parse(res.data)
                vm[backdataname] = a
                if (typeof (callback) == 'function') {//回调
                    callback()
                    // switch (""+ vm[backdataname].errorCode) {
                    //     case "40001":
                    //         console.log(2)
                    //         common.dealWithAjaxData();
                    //         break;
                    //     case "40002":
                    //         toBindLink();
                    //         break;
                    //     case "42032":
                    //         common.wechatAuthorize();
                    //         break;
                    //     default:
                    //         // r(e)
                    //         console.log(1)
                    //         break;
                       
                    // }
                }
            })
            .catch(function (err) {
                //alert('暂放-接口调用失败')
                console.log(err);
                // alert(err.message);
            })
    },
   /**
     * post方式提交数据（增加）
     * @param  {object} vm           [vue实例]
     * @param  {string} url          [ajax地址]
     * @param  {object} params       [请求参数]
     * @param  {object} callback     [请求成功后的回调函数]
     */
    postData: function (vm, url, params,backdataname,callback,failback) {
        if (typeof (params) == 'undefined' || typeof (params) != 'object') {
            params = {}
        };
        vm.axios.post(url, params)
            .then(function (res) {

                let a = res.data;
                 vm[backdataname] = JSON.parse(a);
                // xmlParser.parseString(a, function (err, result) {
                // //将返回的结果赋值
                //  vm[backdataname] = result.BaseResult
                // });
                if (typeof (callback) == 'function') {//回调
                        callback()
                }

            })
            .catch(function (err) {
                if(vm.loadingShow){
                    vm.loadingShow = false;
                }
                if (typeof (failback) == 'function') {//回调
                        failback()
                }
                // alert(err.message)
                // console.log('fail', err);
            });
    },
    //将字符串转为xml对象
    toxml:function(xmlStr){
        var root = document.createElement('XMLROOT');
        root.innerHTML = xmlStr
        return root
    },

    //字符串转为json对象
    loadxml: function(xmlStr){
        
        var root = document.createElement('XMLROOT');
        root.innerHTML = xmlStr;
        return this.parse(root)
    },
    
    //递归解析 将xml对象转为 json对象
    parse: function(node){
        var result = {};
        for(var i = 0 ; i < node.childNodes.length ; ++i){
            if(node.childNodes[i].nodeType == 1){//元素节点 继续递归解析
                result[node.childNodes[i].nodeName.toLowerCase()] = this.parse(node.childNodes[i]);
            }else if(node.childNodes[i].nodeType==3){//文本节点 返回
                return node.childNodes[i].nodeValue;
            }
        }
        return result;
    } ,



};
// let AJAXFlag = !0;
// let fangfa = {
//     reLogin: function () {
//         console.log(3)
//         fangfa.setCookie("UID", "", 0),
//         fangfa.login(!0)
//     },

//     setCookie: function (e, o, n) {
//         console.log(4)
//         var t = e + "=" + o + "; ",
//         i = "";
//         null !== n && void 0 !== n && (i = "expires=" + new Date(1e3 * n) + "; "),
//         document.cookie = t + i + "path=/"
//     },

//     login: function() {
//         console.log(5)
//         var o = fangfa._GET().code;
//         if (fangfa.alert("code: " + o), void 0 === o) {
//             console.log(9)
//             var n = location.origin + fangfa.removeParamFromUrl(["from","bind", "code", "share_id", "isappinstalled", "state", "m", "c", "a"]),
//             t = "http://open.weixin.qq.com/connect/oauth2/authorize?",
//             end = "&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect";
//             console.log(t)
//             console.log(o)
//             //location.href = t + "appid=" + "wx89c743b2fa762a2c" + "&redirect_uri=" + encodeURIComponent(n) +end+ "#wechat_redirect"
//         } else fangfa.alert("start api login"),
//         console.log(14);
//         $.ajax({
//             url: "login/"+o,
//             type: 'POST',
//             dataType: 'json',
//             data: JSON.stringify({
//                   qaq:1,
//             }),
//             success:function(data){
//                 alert(99999)
//                 location.href = location.origin + fangfa.removeParamFromUrl(["code"])
//             },
//             error:function(err){
//                 console.log(err)
//             }
//         })
//     },
    
//     _GET: function() {
//         console.log(6)
//         var e = location.search,
//         o = {};
//         console.log(e);
//         if ("" === e || void 0 === e) return o;
//         console.log(7)
//         e = e.substr(1).split("&");
//         for (var n in e) {
//             var t = e[n].split("=");
//             o[t[0]] = t[1]
//         }
//         return o.from && delete o.code,
//         o
//     },
//     alert: function(e) {
//         console.log(8)
//         "" === fangfa.getCookie("DevDebug") ? console.log(e) : alert(e)
//     },
//     log: function() {
//         console.log(12)
//         for (var e = arguments.length,
//         o = 0; e > o; o++) console.log(arguments[o])
//     },
//     getCookie: function (e) {
//         let c_start;
//         let c_end;
//         return document.cookie.length > 0 && (c_start = document.cookie.indexOf(e + "="), -1 != c_start) ? (c_start = c_start + e.length + 1, c_end = document.cookie.indexOf(";", c_start), -1 == c_end && (c_end = document.cookie.length), unescape(document.cookie.substring(c_start, c_end))) : ""
//     },
//     removeParamFromUrl: function(e) {
//         console.log(10)
//         console.log(location.pathname);
//         return location.pathname + fangfa.buildUrlParamString(fangfa.removeParamObject(e));
//     },
//     removeParamObject:function(e){
//         console.log(11)
//         var o = fangfa._GET();
//         fangfa.log(o);
//         for (var n in e) delete o[e[n]];
//         return o;
//     },
//     buildUrlParamString: function(e) {
//         var o = "";
//         console.log(13)
//         for (var n in e) o += n + "=" + e[n] + "&";
//         o = o.slice(0, o.length - 1);
//         var t = "" === o || void 0 === o;
//         return t ? "": "?" + o
//     },
//     checkBindAndBind: function (){
//         console.log(1111111)
//         var getData = fangfa._GET();
//         var b = getData.bind;
//         console.log(b)
//         var o = getData.code;
//         console.log(o);
//         console.log(b&&o);
//         if(b&&o) {
//             console.log(55)
//             fangfa.alert("start api bind"),
//             console.log(88888)
//             $.ajax({
//             url: "bindWechat/"+MasterConfig.C("bindAppId")+"/" + o,
//                 type: 'POST',
//                 dataType: 'json',
//                 data: JSON.stringify({
//                       qaq:1,
//                 }),
//                 success:function(data){
//                     alert(99999)
//                     location.href = location.origin +fangfa.removeParamFromUrl(["bind","code"]);
//                 },
//                 error:function(err){
//                     console.log(err)
//                 }
//             })
            
//         }
//     },
//     checkCodeAndLogin: function (){
//         var getData = fangfa._GET();
//         var b = getData.bind;
//         console.log(b)
//         var o = getData.code;
//         console.log(o)
//         if(!b&&o){
//             fangfa.login();
//             return false;
//         } else {
//             return true;
//         }
//     },
//     checkRegisterStatus:function(){
//         if(!getCookie("UID")){
//             fangfa.login();/**不应该出现*/
//             return false;
//         }
//         if(!fangfa.isRegisted()){
//             alert("请先完成注册！");
//             toRegisterAndBack();
//             return false;
//         }
//         return true;
//     },
//     isRegisted: function (){
//         var tel = fangfa.getCookie("tel");
//         return tel&&tel!='null';
//     },
//     toRegisterAndBack: function (){
//         var n = location.origin + fangfa.removeParamFromUrl(["from", "bind", "code", "share_id", "isappinstalled", "state", "m", "c", "a"]);
//         location.href=MasterConfig.C('basePageUrl')+"person/register.html?comeFrom="+encodeURIComponent(n);
//     }
// }
// common.checkBindAndBind();
// common.checkCodeAndLogin();        
export default receiveData;
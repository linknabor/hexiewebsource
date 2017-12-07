//import xml2js from'xml2js' 
//var xmlParser = new xml2js.Parser({explicitArray : false, ignoreAttrs : true})
    //xml转json

let receiveData = {

    /*
     * 微信配置提取的公共方法
     * @param  {objec} vm     [Vue实例]
     * @param  {objec} wx     [微信实例]
     * @param  {string} url     [url地址]
     * @param  {array} apilist    [要调用的微信接口]
     */
    wxconfig(vm,wx,apilist){
        vm.axios.post('/getUrlJsSign', {url : 'https://test.e-shequ.com/weixin/wuye/myhouse.html' })
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
                }
            })
            .catch(function (err) {
                //alert('暂放-接口调用失败')
                console.log(err);
            })
    },
   /**
     * post方式提交数据（增加）
     * @param  {object} vm           [vue实例]
     * @param  {string} url          [ajax地址]
     * @param  {object} params       [请求参数]
     * @param  {object} callback     [请求成功后的回调函数]
     */
    postData: function (vm, url, params,backdataname,callback) {
        if (typeof (params) == 'undefined' || typeof (params) != 'object') {
            params = {}
        };
        vm.axios.post(url, params)
            .then(function (res) {
                alert(234)
                //let a = res.data
                // xmlParser.parseString(a, function (err, result) {
                // //将返回的结果赋值
                //  vm[backdataname] = result.BaseResult
                // });
                console.log(res)
                //vm[backdataname] = result.BaseResult
                if (typeof (callback) == 'function') {//回调
                        callback()
                }
            })
            .catch(function (err) {
                console.log('fail', err);
            });
    },
   /* //将字符串转为xml对象
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
        } */
}

export default receiveData;
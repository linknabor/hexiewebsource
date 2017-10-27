import xml2js from'xml2js'
var xmlParser = new xml2js.Parser({explicitArray : false, ignoreAttrs : true})
//console.log(xml)
let receiveData = {
    /*
     * 通过axios获取API数据,并将请求回来列表数据，自动装载到Vue实例模板中
     * @param  {objec} vm     [Vue实例]
     * @param  {string} url    [ajax地址]
     * @param  {string} backdataname [存储ajax返回数据的vm节点的key]
     */
    getData: function (vm, url, backdataname,callback) {
           let params = {};
        if (backdataname == '' || typeof (backdataname) != 'string') {
            backdataname = 'data';
        };
        vm.axios.get(url, {
                params: params
            })
            .then(function (res) {
                 let a = res.data
                xmlParser.parseString(a, function (err, result) {
                //将返回的结果赋值
                    vm[backdataname] = result.BaseResult
                });
                if (typeof (callback) == 'function') {//回调
                        callback()
                }
            })
            .catch(function (err) {
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
    postData: function (vm, url, params) {
        if (typeof (params) == 'undefined' || typeof (params) != 'object') {
            params = {}
        };
        vm.axios.post(url, params)
            .then(function (res) {
                console.log(res)
                /*res = res.request.response;
                switch (res.code) {
                    case "201":
                        vm.$router.push(backurl);
                        break;
                    default:
                        let message = res.msg;
                        vm.$Notice.warning({
                            title: '提交失败',
                            desc: message
                        });
                        break;
                }*/
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
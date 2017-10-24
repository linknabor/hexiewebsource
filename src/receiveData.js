let receiveData = {
    /*
     * 通过axios获取API数据,并将请求回来列表数据，自动装载到Vue实例模板中
     * @param  {objec} vm     [Vue实例]
     * @param  {string} url    [ajax地址]
     * @param  {object} params [请求参数]
     * @param  {string} backdataname [存储ajax返回数据的vm节点的key]
     */
    getData: function (vm, url, params, backdataname) {
        if (typeof (params) == 'undefined' || typeof (params) != 'object') {
            params = {}
        };
        if (backdataname == '' || typeof (backdataname) != 'string') {
            backdataname = 'data';
        };

        vm.axios.get(url, {
                params: params
            })
            .then(function (res) {
                 var a = vm.loadxml(res.data);
                 if(a.baseresult.message.result == null){
                    vm[backdataname] = {};
                 }else{
                    vm[backdataname] = a.baseresult.message.result
                 }
            })
            .catch(function (err) {
                console.log(err);
            })
    },
    //字符串转为对象
        loadxml: function(xmlStr){
            
            var root = document.createElement('XMLROOT');
            root.innerHTML = xmlStr;
            return vm.parse(root)
        },
        
        //递归解析 将xml 对象转为 json
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
        } 
}

export default receiveData;
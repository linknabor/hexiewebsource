import UserApi from '@/api/api.js'

const weixin = {
    /*
     * 微信配置提取的公共方法
     obj须含有以下属性,apilist跟openTagList必须要有一项
     * @param  {objec} wx     [微信实例]
     * @param  {array} apilist    [要调用的微信接口]
     * @param  {array} openTagList    [微信开放标签]
     * @param  {string} url     [url地址]
     */
    config(data) {
        let wx = data.wx;
        let url = data.url === undefined ? '' : data.url;
        let apilist = data.apilist === undefined ? ['scanQRCode'] : data.apilist;
        let openTagList = data.openTagList === undefined ? [] : data.openTagList;

        UserApi.getUrlJsSign({ url: url }).then((response) => {
            let n = response.data;
            let success = n.success;
            if (success === false) {
                return false;
            }
            let result = n.result  //接口返回的嵌入数据
            wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: result.appId, // 必填，公众号的唯一标识
                timestamp: result.timestamp, // 必填，生成签名的时间戳
                nonceStr: result.nonceStr, // 必填，生成签名的随机串
                signature: result.signature,// 必填，签名，见附录1
                jsApiList: apilist, // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                openTagList: openTagList
            })
            wx.ready(()=>{
                console.log('weixin init ready.')
            });
            wx.error((res)=>{
                console.log('weixin init failed! ' + res)
            });

        }).catch((error) => {
            console.log(error);
        })
    }

};

export default weixin;
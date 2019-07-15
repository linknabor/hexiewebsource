var pay = /127|test/.test(location.origin)?'https://test.e-shequ.com/pay/':
		  /uat/.test(location.origin)?'https://uat.e-shequ.com/pay/':
		  'https://www.e-shequ.com/pay/';

var html= /127|test/.test(location.origin)?'https://test.e-shequ.com/weixin/':
		  /uat/.test(location.origin)?'https://uat.e-shequ.com/weixin/':
          'https://www.e-shequ.com/weixin/';
          
var url = /127|test/.test(location.origin)?'https://test.e-shequ.com/wechat/hexie/wechat/':
          /uat/.test(location.origin)?'https://uat.e-shequ.com/wechat/hexie/wechat/':
          'https://www.e-shequ.com/wechat/hexie/wechat/';

window.config={
    //公共的请求地址
        //  baseurl:url+'/weixin',
        //公共请求路径
        URL:url,
        //支付成功跳转详细
        wuye_detail:{
            url:html+"wuye/index.html?state=123#/paymentquery"
        }
       
}

export default config
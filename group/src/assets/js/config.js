var pay = /127|test/.test(location.origin)?'https://test.e-shequ.com/pay/':
		  /uat/.test(location.origin)?'https://uat.e-shequ.com/weiixn/':
		  'https://www.e-shequ.com/weixin/';

var html= /127|test/.test(location.origin)?'https://test.e-shequ.com/weixin/':
		  /uat/.test(location.origin)?'https://uat.e-shequ.com/weixin/':
          'https://www.e-shequ.com/weixin/';
          
var url = /127|test/.test(location.origin)?'https://test.e-shequ.com/wechat/hexie/wechat/':
          /uat/.test(location.origin)?'https://uat.e-shequ.com/wechat/hexie/wechat/':
          'https://www.e-shequ.com/wechat/hexie/wechat/';

window.config={
    //公共的请求地址
    URL:url,
    //公共的底部跳转
    footer:{
        wuye:html+'/wuye/index.html?v=20162299',
        person:html+'/person/index.html?v=20160229',
        group:html+'/group/onsales.html?v=20160229?trpe=3'
    },
    // 跳转支付
    Buy:{
        url:pay+'grouppay.html#/buy'
    },
    Mulybuy:{
        url:pay+'grouppay.html'
    }
   

   
}

export default config
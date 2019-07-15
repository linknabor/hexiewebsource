var pay = /127|test/.test(location.origin)?'https://test.e-shequ.com/pay/':
		  /uat/.test(location.origin)?'https://uat.e-shequ.com/pay/':
		  'https://www.e-shequ.com/pay/';

var html= /127|test/.test(location.origin)?'https://test.e-shequ.com/weixin/':
		  /uat/.test(location.origin)?'https://uat.e-shequ.com/weixin/':
		  'https://www.e-shequ.com/weixin/';
window.config={
    //
        baseurl:html,
    //公共的请求地址
        baseUrl:/127|test/.test(location.origin)?'https://test.e-shequ.com/wechat/hexie/wechat/':
        /uat/.test(location.origin)?'https://uat.e-shequ.com/wechat/hexie/wechat/':
        'https://www.e-shequ.com/wechat/hexie/wechat/',
    //公共的底部跳转
    footer:{
        wuye:html+'/wuye/index.html?v=20162299',
        person:html+'/person/index.html?v=20160229',
    },
     // 集市首页
    group_onsales:{
        url:html+'/group/onsales.html?type=3'
    },
    //团购
    rgrops_url :{
        url:html+'rgroups.html?v=20160229'
    },
    //分享
    rgroupdetail:{
        url:html+'rgroups.html?v=20160229#/rgroupdetail?ruleId='
    },
    gotoGroupDetail:html+'/hxrgroups.html?v=20160229#/rgroupinvite?',//团购
    // //红包
    // rgroup_coupon:{
    //     url:html+'/hxrgroups.html?v=20160229#/coupon?'
    // }
   
}

export default config
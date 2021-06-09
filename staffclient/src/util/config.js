//环境配置
const config = {

        baseUrl: /127|test|192/.test(location.origin)?'https://test.e-shequ.cn/staffclient/':
        /uat/.test(location.origin)?'https://uat.e-shequ.cn/staffclient/':

        
        basePageUrl:/127|test|192/.test(location.origin)?'https://test.e-shequ.cn/weixin/':
        /uat/.test(location.origin)?'https://uat.e-shequ.cn/hexie/weixin/':
        'https://www.e-shequ.cn/weixin/',
        

        // appId: /127|test|192/.test(location.origin)?'wx95f46f41ca5e570e':
        // /uat/.test(location.origin)?'wx9ffe0a2b5a64a285':
        // 'wxbd214f5765f346c1',
        appId: /127|test|192/.test(location.origin)?'wx315c7cb4080e5fd8':
        /uat/.test(location.origin)?'wx9ffe0a2b5a64a285':
        'wxbd214f5765f346c1',
        
        componentAppId: /127|test|192/.test(location.origin)?'wx4d706a1a7a139d1f':
        /uat/.test(location.origin)?'wxc65085912aca5444':
        'wx0d408844b35d85e2',
        
		oauthUrl: 'https://open.weixin.qq.com/connect/oauth2/authorize?',
        oauthUrlPostFix:'&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect',
		oauthUrlPostSilent:'&response_type=code&scope=snsapi_base&state=123#wechat_redirect'
    }

    export default config;
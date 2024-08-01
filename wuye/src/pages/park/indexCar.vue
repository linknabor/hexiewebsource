<template>
    <div>
        <van-overlay :show="show_overlay">
            <van-loading type="spinner"/>
        </van-overlay>
    </div>
    
</template>

<script>
import {Base64} from 'js-base64'
import {Toast, Overlay, Loading} from 'vant'
import Api from "@/api/api.js"
import Common from "@/util/common.js"
import Config from "@/util/config.js"
export default {
    name: "indexCar",
    components: {
        [Toast.name]: Toast,
        [Overlay.name]: Overlay,
        [Loading.name]: Loading
    },
    data() {
      return {
        show_overlay: true,
        showWeixin: false,
        oriParam: this.$route.query.param,
        parkId: '',
        appid: Config.appId, //默认微信appid
        componentAppId: '',

        scanChannel: '', //0微信扫的 1支付宝扫的
        openid: '', //根据scanChannel的值，这里存在微信的openid或支付宝的userid
      }
    },
    mounted() {
        console.log(1)
        this.getParam()
        console.log(2)
        this.IsWeixinOrAlipay()
    },
    methods: {
        initSession4Test() {
            var data = {
            oriApp: "wx95f46f41ca5e570e",
            };
            Api.login("163275", data)
        },

        getParam() {
            if(this.oriParam) { //从生成的二维码进来的，码上带有参数
                let theRequest = {}
                let param = Base64.decode(this.oriParam)
                let params = param.split("&")
                for (let i = 0; i < params.length; i++) {
                    theRequest[params[i].split("=")[0]] = decodeURI(params[i].split("=")[1])
                }
                if(theRequest.appid) {
                    this.appid = theRequest.appid
                    this.componentAppId = Config.componentAppId
                }
            } else { //从公众号底部菜单进入的，码上没参
                this.appid = Config.appId
            }
        },

        getParkInfo() {
            
        },

        IsWeixinOrAlipay() {
            console.log(location.origin)
            var ua = window.navigator.userAgent.toLowerCase()
            let o = Common.getCallBackParams().code
            let backurl = location.origin + Common.removeParamFromUrl(["code", ])

            //判断是不是微信
            if (ua.match(/MicroMessenger/i) == 'micromessenger') {
                this.weixinAuthorize(o, backurl)
            } else if (ua.match("alipayclient") == 'alipayclient') {
                this.alipayAuthorize(o, backurl)
            } else {
                Toast.fail('二维码错误')
            }
        },

        alipayAuthorize(o, backurl) {
           this.scanChannel = '1' //支付宝
           this.appid = Config.alipayAppId
           if(void 0 === o) {
                let url = Config.oauthAlipayUrl
                url = url.replace("APPID", this.appid).replace("SCOPE", "auth_base").replace("ENCODED_URL", encodeURIComponent(backurl))
                location.href = url
            } else {
                Api.alipayAuthorize(o).then((response) => {
                    if (response.success) {
                        let openid = response.result.userid
                        this.gotoPark(openid)
                    } else {
                         Toast.fail('授权失败，请刷新重试')
                    }
                })
            }
        },

        weixinAuthorize(o, backurl) {
            this.scanChannel = '0' //微信

            if(void 0 === o) {
                let url = Config.oauthUrl + "appid=" + this.appid
                if(this.componentAppId) {
                    url += "&component_appid=" + this.componentAppId
                }
                url += "&redirect_uri=" + encodeURIComponent(backurl) + Config.oauthUrlPostSilent + "#wechat_redirect"
                location.href = url
            } else {
                Api.weixinAuthorize(o, this.appid).then((response) => {
                    if (response.success) {
                        let openid = response.result.openid
                        this.gotoPark(openid)
                    } else {
                         Toast.fail('授权失败，请刷新重试')
                    }
                })
            }
        },

        gotoPark(openid) {
            Toast(this.scanChannel, openid)
            // this.$router.push({
            //     path: '/indexPark',
            //     query: {
            //         scanChannel: this.scanChannel,
            //         openid: openid,
            //         param: this.oriParam
            //     }
            // })
        },
    }
}
</script>

<style>

</style>
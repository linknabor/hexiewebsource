<template>
    <div>
        <van-overlay :show="show_overlay">
            <van-loading type="spinner"/>
        </van-overlay>
         loading...
    </div>
    
</template>

<script>
import {Base64} from 'js-base64'
import {Toast, Overlay, Loading} from 'vant'
import Api from "@/api/api.js"
import Storage from "@/util/storage.js"
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
        oriParam: this.$route.query.param,
        parkId: '',
        appid: Config.appId, //默认微信appid
        componentAppId: Config.componentAppId,
        scanChannel: '3', //3微信公众号扫的 1支付宝扫的
      }
    },
    watch:{
        $route(to, from) {//监听到路由（参数）改变
            // this.getParam()
            // this.IsWeixinOrAlipay()
            window.location.reload();
        }
    },
    mounted() {
        setTimeout(() => {
            this.getParam()
        }, 10);
        
        setTimeout(() => {
            this.IsWeixinOrAlipay()
        }, 10);
    },
    methods: {
        getParam() {
            if(this.oriParam) { //从生成的二维码进来的，码上带有参数
                let theRequest = {}
                let param = Base64.decode(this.oriParam)
                let params = param.split("&")
                for (let i = 0; i < params.length; i++) {
                    theRequest[params[i].split("=")[0]] = decodeURI(params[i].split("=")[1])
                }
                if(theRequest.parkId !== '' && theRequest.parkId !== undefined) {
                    this.parkId = theRequest.parkId
                }
                if(theRequest.appid) {
                    this.appid = theRequest.appid
                }
            } else { //从公众号底部菜单进入的，码上没参
                this.appid = Config.appId
            }
        },

        IsWeixinOrAlipay() {
            let ua = window.navigator.userAgent.toLowerCase()
            //判断是不是微信
            if (ua.match(/MicroMessenger/i) == 'micromessenger') {
                this.weixinAuthorize()
            } else if (ua.match("alipayclient") == 'alipayclient') {
                this.alipayAuthorize()
            } else {
                Toast.fail('二维码错误')
            }
        },

        alipayAuthorize() {
            let o = Common.getCallBackAlipayParams().auth_code
            this.scanChannel = '1' //支付宝
            if(void 0 === o) {
                var backurl = location.origin + Common.removeParamFromUrl(["auth_code"]) + Common.addParamHsah()
                this.appid = Config.alipayAppId
                let url = Config.oauthAlipayUrl + '&state=123'
                url = url.replace("APPID", this.appid).replace("SCOPE", "auth_base").replace("ENCODED_URL", encodeURIComponent(backurl))
                location.href = url
            } else {
                this.authorize(o)
            }
        },

        weixinAuthorize() {
            let o = Common.getCallBackParams().code
            this.scanChannel = '3' //微信公众号
            if(void 0 === o) {
                var backurl = location.origin + Common.removeParamFromUrl(["from", "bind", "code", "share_id", "isappinstalled", "state", "m", "c", "a"]) + Common.addParamHsah()
                let url = Config.oauthUrl + "appid=" + this.appid + "&component_appid=" + this.componentAppId
                url += "&redirect_uri=" + encodeURIComponent(backurl) + Config.oauthUrlPostSilent + "#wechat_redirect"
                location.href = url
            } else {
                this.authorize(o)
            }
        },

        authorize(o) {
            let param = {
                appid: this.appid,
                sourceType: this.scanChannel,
                code: o
            }
            Api.h5Authorize(param).then((response) => {
                let data = response.data
                if (!data.success) {
                    Common.removeParamFromUrl(["code"])
                    Common.removeParamFromUrl(["auth_code"])
                    Toast('请刷新重试')
                } else {
                    Storage.set("userInfo", data.result)
                    this.gotoPark()
                }
            })
        },

        gotoPark() {
            this.$router.push({
                path: '/parkInfo',
                query: {
                    scanChannel: this.scanChannel,
                    parkId: this.parkId
                }
            })
        },
    }
}
</script>

<style>
.van-loading {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>
<template>
  <div>
    <van-overlay :show="showOverlay">
      <div class="overlay-loading">
        <van-loading type="spinner" color="#1989fa" vertical
          >加载中...</van-loading
        >
      </div>
    </van-overlay>
  </div>
</template>
<script>
import Common from "@/util/common.js"
import Config from "@/util/config.js"
import Storage from "@/util/storage.js"
import UserApi from "@/api/UserApi.js"
import { Toast, Overlay, Loading } from "vant"

export default {
  name: "UserLogin",
  data() {
    return {
      showOverlay: false
    };
  },
  mounted() {},
  components: {
    [Overlay.name]: Overlay,
    [Loading.name]: Loading,
  },
  methods: {
    /**
     * 微信授权
     */
    login() {
      var o = Common.getCallBackParams().code;
      var oriApp = Common.getUrlParam("oriApp");
      var mainAppId = Config.appId;
      if (!oriApp) {
        oriApp = mainAppId;
      }
      var param = { oriApp: oriApp };
      if (void 0 === o) {
        var n =
            location.origin +
            Common.removeParamFromUrl([
              "from",
              "bind",
              "code",
              "share_id",
              "isappinstalled",
              "state",
              "m",
              "c",
              "a",
            ]) +
            Common.addParamHsah(),
          t = Config.oauthUrl,
          end = Config.oauthUrlPostFix;
        var url = t + "appid=";
        if (oriApp) {
          url += oriApp + "&component_appid=" + Config.componentAppId;
        } else {
          url += mainAppId;
        }
        url +=
          "&redirect_uri=" + encodeURIComponent(n) + end + "#wechat_redirect";
        location.href = url;
      } else {
        console.log("start user login");
        UserApi.login(o, param).then((response) => {
          console.log('login response:')
          console.log(response)
          let data = response.data;
          if (!data.success) {
            Common.removeParamFromUrl(["code"]);
            console.log('userLogin error, msg : ' + data.message)
            Toast("登陆获取用户信息失败。" + data.message + "请刷新重试。")
            return false
          }
          if (data.success && data.result == null) {
            this.reLogin();
          } else {
            console.log("$emit ....");
            Storage.set("userInfo", data.result)
            this.$emit("getLoginUser", data);
          }
        });
      }
    },
    //没授权在授权登录
    reLogin() {
      this.timer = setTimeout(() => {
        //设置延迟执行
        Common.setCookie("SESSION", "", -1);
      }, 500);
      this.login(!0);
    },
  },
};
</script>
<style scoped>
.overlay-loading {
  margin-top: 20rem;
}
</style>

<template>
  <div></div>
</template>
<script>
import common from "@/util/common.js";
import config from "@/util/config.js";
import api from "@/api/api.js";

export default {
  name: "UserLogin",
  data() {
    return {};
  },
  mounted() {},

  methods: {
    /**
     * 微信授权
     */
    login() {
      var o = common.getCallBackParams().code;
      var oriApp = common.getUrlParam("oriApp");
      var mainAppId = config.appId;
      if (!oriApp) {
        oriApp = mainAppId;
      }
      var param = { oriApp: oriApp };
      if (void 0 === o) {
        var n =
            location.origin +
            common.removeParamFromUrl([
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
            common.addParamHsah(),
          t = config.oauthUrl,
          end = config.oauthUrlPostFix;
        var url = t + "appid=";
        if (oriApp) {
          url += oriApp + "&component_appid=" + config.componentAppId;
        } else {
          url += mainAppId;
        }
        url +=
          "&redirect_uri=" + encodeURIComponent(n) + end + "#wechat_redirect";
        location.href = url;
      } else {
        console.log("start api login");
        api.login(o, param).then((response) => {
          let data = response.data;
          if (data.success && data.result == null) {
            this.reLogin();
          } else {
            console.log("$emit ....")
            this.$emit("getLoginUser", data);
          }
        });
      }
    },
    //没授权在授权登录
    reLogin() {
      this.timer = setTimeout(() => {
        //设置延迟执行
        common.setCookie("SESSION", "", -1);
      }, 500);
      this.login(!0);
    },
  },
};
</script>

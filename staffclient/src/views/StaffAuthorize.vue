<template>
  <div>
    <van-overlay :show="showOverlay">
      <div class="overlay-loading">
        <van-loading type="spinner" color="#1989fa" vertical
          >加载中...</van-loading
        >
      </div>
    </van-overlay>
    <user-info @getUserInfo="getUserInfo"></user-info>
  </div>
</template>
<script>
import UserInfo from "@/components/UserInfo.vue";
import UserApi from "@/api/UserApi.js";
import common from "@/util/common.js";
import { Overlay, Loading, Dialog, Toast } from "vant";

export default {
  name: "staffAuthorize",
  components: {
    "user-info": UserInfo,
    [Overlay.name]: Overlay,
    [Loading.name]: Loading,
  },
  created() {},
  mounted() {},
  methods: {
    getUserInfo(result) {
      this.userInfo = result;
      this.appid = common.getUrlParam("oriApp");
      let param = {
        appid: this.appid,
        sectIds: this.sectIds,
        type: this.type,
        scene: this.scene,
        behavior: this.behavior,
        feeId: this.feeId,
        timestamp: this.timestamp,
        showOverlay: true
      };
      //   let param = '?appid='+this.appid+'&sectIds='+this.sectIds+'&type='+this.type+'&scene='+this.scene+'&behavior='+this.behavior
      //   +'&feeId='+this.feeId+'&timestamp='+this.timestamp

      UserApi
        .operAuthorize(param)
        .then((response) => {
          console.log(response);
          let success = response.data.success;
          if (success) {
            Dialog({
              message: "授权成功。接下来需要您设置所需要接收的消息类型。",
            });
            this.$router.push({
              path: "/subscribeSetting",
              query: {
                subscribeTemplateIds: this.userInfo.subscribeTemplateIds,
              },
            });
          } else {
            Toast(response.data.message)
          }
        })
        .catch((error) => {
          Toast(error);
        });
    },
  },
  data() {
    return {
      showOverlay: true,
      userInfo: [],
      sectIds: this.$route.query.sectIds,
      type: this.$route.query.type,
      scene: this.$route.query.scene,
      behavior: this.$route.query.behavior,
      feeId: this.$route.query.feeId,
      timestamp: this.$route.query.timestamp,
      appid: "",
    };
  },
};
</script>

<style lang="less" scoped>
.overlay-loading {
  margin-top: 20rem;
}
</style>
<template>
  <div>
    <van-overlay :show="showOverlay">
      <div class="overlay-loading">
        <van-loading type="spinner" color="#1989fa" vertical
          >加载中...</van-loading
        >
      </div>
    </van-overlay>
    <user-login ref="userLogin" @getLoginUser="getLoginUser"></user-login>
  </div>
</template>
<script>
import UserApi from "@/api/api.js";
import Storage from "@/util/storage.js"
import UserLogin from "@/components/UserLogin"
import { Overlay, Loading, Toast } from "vant"

export default {
  data() {
    return {
      showOverlay: false
    };
  },
  components: {
    "user-login": UserLogin,
    [Overlay.name]: Overlay,
    [Loading.name]: Loading,
  },
  mounted() {
    this.getUserInfo();
  },
  methods: {
    getUserInfo() {
      alert(5)
      this.showOverlay = true
      UserApi.getUserInfo()
        .then((response) => {
          let data = response.data;
          if (data.success && data.result != null) {
            Storage.set("userInfo", data.result)
            this.$emit("getUserInfo", data.result)
            this.showOverlay = false
            alert(6)
          } else {
            alert(7)
            this.showOverlay = false
            this.$refs.userLogin.login();
          }
        })
        .catch((error) => {
          Toast(error);
        });
    },
    getLoginUser(data) {
      alert(8)
      if (data) {
        this.$emit("getUserInfo", data.result);
      }
    },
  },
};
</script>
<style lang="less" scoped>
.overlay-loading {
  margin-top: 20rem;
}
</style>

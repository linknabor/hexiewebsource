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
import UserApi from "@/api/UserApi.js";
import Storage from "@/util/storage.js"
import UserLogin from "@/components/UserLogin"
import {Overlay, Loading, Toast} from "vant"

export default {
  name: 'UserInfo',
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
      this.showOverlay = true
      UserApi.getUserInfo()
        .then((response) => {
          let data = response.data;
          console.log('getUserInfoResp :' + data.success)
          console.log('getUserInfoResp :' + data.result)
          if (data.success && data.result != null) {
            Storage.set("userInfo", data.result)
            this.$emit("getUserInfo", data.result)
            this.showOverlay = false
          } else {
            this.showOverlay = false
            this.$refs.userLogin.login();
          }
        })
        .catch((error) => {
          Toast(error);
        });
    },
    getLoginUser(data) {
      if (data) {
        this.$emit("getUserInfo", data.result);
      }
    },
  },
};
</script>
<style scoped>
.overlay-loading {
  margin-top: 20rem;
}
</style>

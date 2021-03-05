<template>
  <div>
    <user-login ref="userLogin" @getLoginUser="getLoginUser"></user-login>
  </div>
</template>
<script>
import api from "@/api/api.js";
import UserLogin from "@/components/UserLogin";
import { Toast } from "vant";

export default {
  data() {
    return {};
  },
  components: {
    "user-login": UserLogin,
  },
  mounted() {
    this.getUserInfo();
  },
  methods: {
    getUserInfo() {
      api
        .getUserInfo()
        .then((response) => {
          let data = response.data;
          if (data.success && data.result != null) {
            this.$emit("getUserInfo", data.result);
          } else {
            this.$refs.userLogin.login();
          }
        })
        .catch((error) => {
          Toast(error);
        });
    },
    getLoginUser(data) {
      console.log("$emit2 ...");
      if (data) {
        this.$emit("getUserInfo", data.result);
      }
    },
  },
};
</script>
<style scoped>
</style>
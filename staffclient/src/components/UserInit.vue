<template>
  <div></div>
</template>

<script>
import UserApi from "@/api/UserApi.js";

export default {
  name: "UserInit",
  data() {
    return {
      userInfo: [],
    };
  },
  mounted() {
    if(this.testMode){
      alert("测试模式...");
      alert("将初始化本地调试用的测试用户...");
      this.initSession4Test();
    }
  },
  methods: {
    initSession4Test() {
      // var data = {
      //   oriApp: "wx95f46f41ca5e570e",
      // };
      // UserApi.login("8441", data);
      var data = {
        oriApp: 'wx315c7cb4080e5fd8',
      }
      UserApi.login('8462', data)
    },
  },
};
</script>
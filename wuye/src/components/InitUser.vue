<template>
  <div></div>
</template>

<script>
import api from "@/api/api.js";

export default {
  name: "UserInit",
  data() {
    return {
      userInfo: [],
    };
  },
  mounted() {
    alert("test mode ! initializing user 4 test !");
    this.initSession4Test();
  },
  methods: {
    initSession4Test() {
      var data = {
        oriApp: "wx95f46f41ca5e570e",
      };
      api.login("8441", data);
      //   var data = {
      //     oriApp: 'wx315c7cb4080e5fd8',
      //   }
      //   api.login('8462', data)
    },
  },
};
</script>
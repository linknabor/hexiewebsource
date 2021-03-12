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
    this.initSession4Test();
  },
  methods: {
    initSession4Test() {
      var data = {
        oriApp: "wx95f46f41ca5e570e",
      };
      api.login("8441", data);
    },
  },
};
</script>
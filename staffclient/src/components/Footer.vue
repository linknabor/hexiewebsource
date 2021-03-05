<template>
  <van-tabbar route v-model="active" safe-area-inset-bottom>
    <van-tabbar-item to="/" icon="manager">个人中心</van-tabbar-item>
  </van-tabbar>
</template>

<script>
import { Tabbar, TabbarItem } from "vant";

export default {
  name: "NavFooter",
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
  },
};
</script>
<template>
  <div>
    <div class="user-poster bg-img">
      <van-row>
        <van-col>
          <van-image round class="user-header" :src="userInfo.headimgurl" />
        </van-col>
        <van-col class="user-name">{{ userInfo.name }}</van-col>
      </van-row>
    </div>
    <van-row class="user-links">
      <van-col span="6">
        <van-icon name="setting-o" size="2rem" @click="setSubscribe" />
        订阅设置
      </van-col>
      <van-col span="6">
        <van-icon name="records" size="2rem" />
        维修订单
      </van-col>
      <van-col span="6">
        <van-icon name="todo-list-o" size="2rem" />
        巡更
      </van-col>
      <van-col span="6">
        <van-icon name="cash-back-record" size="2rem" />
        二维码收费
      </van-col>
    </van-row>
    <!-- <user-init></user-init> -->
    <user-info @getUserInfo="getUserInfo"></user-info>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
import {
  Row,
  Col,
  Icon,
  Cell,
  CellGroup,
  Image as VanImage,
  Tabbar,
  TabbarItem,
} from "vant";
// import UserInit from "@/components/UserInit";
import UserInfo from "@/components/UserInfo";
import NavFooter from "@/components/Footer";

export default {
  name: "index",
  data() {
    return {
      userInfo: [],
    };
  },
  mounted() {},
  methods: {
    getUserInfo(result) {
      this.userInfo = result;
    },
    setSubscribe(){
      this.$router.push({path: '/subscribeSetting', query: {subscribeTemplateIds: this.userInfo.subscribeTemplateIds}});
    }
  },
  components: {
    // 'user-init': UserInit,
    "user-info": UserInfo,
    "nav-footer": NavFooter,
    [Row.name]: Row,
    [Col.name]: Col,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [VanImage.name]: VanImage,
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
  },
};
</script>

<style lang="less" scoped>
.user {
  &-poster {
    width: 100%;
    height: 53vw;
    display: block;
  }

  &-header {
    width: 5rem;
    height: 5rem;
    margin-top: 2rem;
    margin-left: 3rem;
  }

  &-name {
    width: 5rem;
    height: 5rem;
    margin-top: 5rem;
    margin-left: 4rem;
    color: #646464;
    font-weight: bolder;
  }

  &-group {
    margin-bottom: 15px;
  }

  &-links {
    margin-top: 5rem;
    padding: 15px 0;
    font-size: 12px;
    text-align: center;
    background-color: #fff;

    .van-icon {
      display: block;
      font-size: 24px;
    }
  }
}

.bg-img {
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-image: url("http://img.e-shequ.cn/FkTC8W9xrXHTLWYmCxWSpmvexdXQ");
}
</style>

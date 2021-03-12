<template>
  <div>
    <div class="user-poster bg-img">
      <van-row>
        <van-col>
          <van-image
            round
            class="user-header"
            :src="userInfo.headimgurl"
            style="border: 2px solid white"
          />
        </van-col>
        <van-col class="user-name">{{ userInfo.name }}</van-col>
        <van-col class="user-title">工作人员</van-col>
      </van-row>
    </div>
    <van-row class="user-links">
      <van-col span="6">
        <van-icon name="setting-o" size="2rem" @click="setSubscribe" />
        订阅设置
      </van-col>
      <van-col span="6">
        <van-icon name="records" size="2rem" @click="getRepairOrder" />
        维修订单
      </van-col>
      <van-col span="6">
        <van-icon name="todo-list-o" size="2rem" @click="patrol" />
        巡更
      </van-col>
      <van-col span="6">
        <van-icon name="cash-back-record" size="2rem" @click="qrcodePay" />
        二维码收费
      </van-col>
    </van-row>
    <user-info @getUserInfo="getUserInfo"></user-info>
    <nav-footer></nav-footer>
    <!-- <user-init></user-init> -->
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
  Toast,
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
    setSubscribe() {
      this.$router.push({
        path: "/subscribeSetting",
        query: { subscribeTemplateIds: this.userInfo.subscribeTemplateIds },
      });
    },
    getRepairOrder() {
      Toast("当前功能尚未开通");
    },
    patrol() {
      Toast("当前功能尚未开通");
    },
    qrcodePay() {
      Toast("当前功能尚未开通");
    },
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
    margin-left: 2rem;
  }
  &-name {
    width: 45vw;
    height: 4vh;
    margin-top: 3.5rem;
    margin-left: 2rem;
    color: #646464;
    // color:blanchedalmond;
    font-weight: bolder;
  }

  &-title {
    margin-top: 0.2rem;
    margin-left: 2rem;
    color: #646464;
    // color:blanchedalmond;
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
  // background-size: 100% 100%;
  // background-repeat: no-repeat;
  // background-image: url("http://img.e-shequ.cn/FkTC8W9xrXHTLWYmCxWSpmvexdXQ");
  background: linear-gradient(#faf0e6, #fdf5e6, #d2b48c);
}
</style>

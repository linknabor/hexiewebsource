<template>
  <div class="msgsub-outer">
    <van-row class="msgsub-title">
      <van-col class="msgsub-align"
        ><van-image round :src="imgHint" /> 授权订阅消息</van-col
      >
    </van-row>
    <van-row class="msgsub-hint1">
      <van-col>点击 [去授权] ，选择</van-col>
    </van-row>
    <van-row class="msgsub-hint2">
      <van-col class="msgsub-align">
        <van-image round :src="imgCheck" />总是保持以上选择，不再询问
      </van-col>
      <van-col class="msgsub-hint3">并[允许]</van-col>
    </van-row>
    <van-row class="msgsub-hint1">
      <van-col>以便有订阅消息时可以第一时间通知到您。</van-col>
    </van-row>
    <van-row class="msgsub-btn">
      <van-col>
        <wx-subscribe ref="wxSubscribe" ></wx-subscribe>
        <van-button
          style="width: 85vw"
          type="primary"
          size="normal"
          color="linear-gradient(to right, #DEB887, #DAA520)">
        </van-button>
      </van-col>
    </van-row>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
import NavFooter from "@/components/Footer.vue";
import WxSubscribe from "@/components/WxSubscribe.vue";
import { Col, Row, Icon, Image as VanImage, Button } from "vant";
import check from "@/assets/check.png";
import hint from "@/assets/hint32.png";
import Bus from "@/util/bus.js"

export default {
  name: "SubscribeSetting",
  data() {
    return {
      imgCheck: check,
      imgHint: hint,
      subscribeTemplateIds: this.$route.query.subscribeTemplateIds,
    };
  },
  mounted() {
    //   this.$refs.wxSubscribe.subTemplateId = this.subscribeTemplateIds
    Bus.$emit("subscribe", this.subscribeTemplateIds)
  },
  components: {
    [Col.name]: Col,
    [Row.name]: Row,
    [Icon.name]: Icon,
    [VanImage.name]: VanImage,
    [Button.name]: Button,
    "nav-footer": NavFooter,
    "wx-subscribe": WxSubscribe,
  },
  methods: {
  },
};
</script>

<style scoped lang="less">
.msgsub {
  &-outer {
    margin: 0 1rem;
  }
  &-title {
    margin: 2rem 1rem 1.5rem 1rem;
    border-bottom-width: 1px;
    font-weight: bold;
    font-size: 1.3rem;
    display: flex;
    align-items: center;
  }
  &-hint1 {
    margin: 0rem 1rem 0.5rem 1rem;
    font-size: 0.9rem;
  }
  &-hint2 {
    margin: 0rem 0.5rem 0.5rem 1rem;
    font-size: 0.9rem;
    color: #c0c0c0;
    display: flex;
    align-items: center;
  }
  &-hint3 {
    font-size: 0.9rem;
    color: black;
    margin-left: 0.8rem;
  }
  &-btn {
    margin: 3rem 0.5rem 0.5rem 1rem;
  }
  &-align {
    display: flex;
    align-items: center;
  }
}
</style>
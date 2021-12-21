<template>
  <div class="main">
    <div class="white-blank" v-show="skeletonLoading==true"></div>
    <van-skeleton title :row="3" :loading="skeletonLoading">
      <van-empty description="还没有申请过电子收据哦" v-if="receiptList&&receiptList.length===0"/>
      <div class="header" v-show="skeletonLoading==false"></div>
      <div class="data-list">
        <van-list v-model="loading" :finished="finished" @load="onLoad">
          <ul v-for="(receipt, index) in receiptList" :key="index">
            <li class="data">
              <div class="data-row">交易日期：{{ receipt.tran_date }}</div>
              <div class="data-row">交易金额：{{ receipt.tran_amt }}</div>
              <div class="data-row">所在小区：{{ receipt.sect_name }}</div>
              <span class="data-check"><a @click="viewDetail(receipt)">查看收据</a></span>
            </li>
          </ul>
        </van-list>
      </div>
    </van-skeleton>
  </div>
</template>

<script>
import ReceiptApi from "@/api/ReceiptApi.js";
import { Toast, Skeleton, Empty, List } from "vant";

export default {
  data() {
    return {
      receiptList: [],
      skeletonLoading: true,
      page: 1,
      loading: false,
      finished: false,
    }
  },
  components: {
    [Skeleton.name]: Skeleton,
    [Empty.name]: Empty,
    [List.name]: List,
  },
  mounted() {
    this.getReceiptList()
  },
  methods: {
    getReceiptList() {
      ReceiptApi.getReceiptByUser(this.page).then((response) => {
          this.skeletonLoading = false;
          if (response.data.success) {
            if(response.data.result.length > 0) {
              this.receiptList = this.receiptList.concat(response.data.result)
              this.page += 1
            } else {
              this.finished = true
              Toast('没有更多了')
            }
          }
          this.loading = false
        }).catch((error) => {
          this.skeletonLoading = false;
          Toast(error);
        });
    },
    viewDetail(receipt) {
      let appid = receipt.appid
      let receiptId = receipt.receipt_id
      this.$router.push({path: '/receipt', query:{appid: appid, receiptId: receiptId}})   
    },
    onLoad() {
      console.log('onload ....')
      this.getReceiptList()
    },
  },
};
</script>

<style scoped>
.main {
  margin: 0;
  padding: 0;
  background-color: #fafafa;
  min-height: 100vh;
  height: auto;
}
.white-blank {
    height: 1rem;
    width: 100%;
}
.header {
  height: 3vh;
  width: 100%;
  background-color: #fafafa;
}
.data-list {
  width: 94%;
  margin: 0 3% 0 3%;
}
.data {
  border-radius: 0.1rem;
  width: 90%;
  padding: 0.3rem 5% 0.3rem 5%;
  margin-bottom: 2vh;
  font-family: "Open Sans", -apple-system, BlinkMacSystemFont, "Helvetica Neue",
    Helvetica, Segoe UI, Arial, Roboto, "PingFang SC", "miui",
    "Hiragino Sans GB", "Microsoft Yahei", sans-serif;
  font-size: 0.3rem;
  color: #34495e;
  background-color: #fff;
}
.data-check {
  padding: 0.1rem 0.1rem;
  border: 1px solid #ff8a00;
  border-radius: 0.2rem;
  margin-left: 75%;
  color: #ff8a00;
}
.data-row {
  margin: 0 0 0.2rem 0;
}
</style>
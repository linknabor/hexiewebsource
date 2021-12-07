<template>
  <div class="main">
    <div class="white-blank" v-show="skeletonLoading==true"></div>
    <van-skeleton title :row="3" :loading="skeletonLoading">
      <van-empty description="还没有申请过电子发票哦" v-if="invoiceList&&invoiceList.length===0"/>
      <div class="header" v-show="skeletonLoading==false"></div>
      <div class="data-list">
        <van-list v-model="loading" :finished="finished" @load="onLoad">
          <ul v-for="(invoice, index) in invoiceList" :key="index">
            <li class="data">
              <div class="data-row">申请日期：{{ invoice.apply_date }}</div>
              <div class="data-row">发票抬头：{{ invoice.invoice_title }}</div>
              <div class="data-row">交易金额：{{ invoice.tran_amt }}</div>
              <span class="data-check"><a @click="viewDetail(index)">查看发票</a></span>
            </li>
          </ul>
        </van-list>
      </div>
    </van-skeleton>
  </div>
</template>

<script>
import InvoiceApi from "@/api/InvoiceApi.js";
import { Toast, Skeleton, Empty, List } from "vant";

export default {
  data() {
    return {
      invoiceList: [],
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
    this.getInvoiceList()
  },
  methods: {
    getInvoiceList() {
      console.log('page:'+this.page)
      InvoiceApi.getInvoice(this.page).then((response) => {
          this.skeletonLoading = false;
          if (response.data.success) {
            if(response.data.result.length > 0) {
              this.invoiceList = this.invoiceList.concat(response.data.result)
              this.page += 1
            } else {
              this.finished = true
            }
          }
          this.loading = false
        }).catch((error) => {
          this.skeletonLoading = false;
          Toast(error);
        });
    },
    viewDetail(index) {
        let pdf_addr = this.invoiceList[index].pdf_addr
        location.href=pdf_addr
    },
    onLoad() {
      console.log('onload ....')
      this.getInvoiceList()
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
<template>
  <div class="main">
    <!-- <van-nav-bar title="我的工单" left-text="个人中心" left-arrow @click-left="onClickNav" /> -->
    <div class="header"></div>
    <van-skeleton title :row="3" :loading="skeletonLoading">
      <van-empty description="还没有维修单哦" v-if="orderList&&orderList.length===0"/>
      <div class="data-list">
        <ul v-for="(order, index) in orderList" :key="index">
          <li class="data">
            {{ order.serve_address }}<br /><br />
            {{ order.createDateStr }}<br />
            <span class="data-check"><a @click="viewDetail(order.order_id)">查看明细</a></span>
          </li>
        </ul>
      </div>
    </van-skeleton>
  </div>
</template>

<script>
import WorkOrderApi from "@/api/WorkOrderApi.js";
import { Toast, Skeleton, Cell, CellGroup, NavBar, Empty } from "vant";

export default {
  data() {
    return {
      orderList: [],
      skeletonLoading: true,
    }
  },
  components: {
    [Skeleton.name]: Skeleton,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [NavBar.name]: NavBar,
    [Empty.name]: Empty
  },
  mounted() {
    setTimeout(() => {
      this.skeletonLoading = false;
    }, 1000);
    this.getOrderList();
  },
  methods: {
    getOrderList() {
      WorkOrderApi.getOrderList()
        .then((response) => {
          if (response.data.success) {
            this.orderList = response.data.result.work_orders;
          }
        })
        .catch((error) => {
          Toast(error);
        });
    },
    viewDetail(orderId) {
        let url = 'workOrderDetail'
        this.$router.push({path: url, query:{orderId: orderId}})
    },
    onClickNav(){

    }
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
.header {
  height: 3vh;
  widows: 100%;
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

</style>
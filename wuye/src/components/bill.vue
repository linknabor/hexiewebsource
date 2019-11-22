<template>
  <!-- 确定选中的状态   点击radio改变状态,emmit一个事件 -->
  <div>
    <!-- 专业版 -->
    <div
      class="bill-item1 ov1"
      v-if="version=='02'"
      v-for="(item,index) in billInfo"
      @click="select(index,version)"
    >
      <div class="select-item1 fl1" :class="{selected:item.selected,'payed':item.pay_status!='02'}"></div>
      <div class="fl1 info1">
			<p class="top1 ov1">
				<span class="title1 fl1">{{item.service_fee_name}}</span>
				<span class="price1 fr1">￥{{item.fee_price}}</span>
			</p>
			<p class="bottom1 ov1">
				<span class="addr1 fl1">{{item.pay_cell_addr}}</span>
				<span class="date1 fr1 data-height1">{{item.service_fee_cycle}}</span>
			</p>
		</div>	
    </div>
    <!-- 标准版 -->
    <div
      class="bill-item ov"
      v-if="version=='01'"
      v-for="(item,index) in otherBillinfo"
      @click="select(index,version)"
    >
      <div class="select-item fl" :class="{selected:item.selected}"></div>
      <div class="fl info">
        <p class="top ov">
          <span class="title fl">{{item.fee_type_show_name}}</span>
          <span class="price fr">￥{{item.fee_price}}</span>
        </p>
        <p class="bottom ov">
          <span
            class="addr fl"
          >{{item.start_date | moment("YYYY年MM月DD日")}}-{{item.end_date | moment("YYYY年MM月DD日")}}</span>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import moment from "../pages/filter/datafromat";
export default {
  data() {
    return {
      aa: "xianshi"
    };
  },
  filters: {
    moment
  },
  props: ["billInfo", "otherBillinfo", "version"],
  //  {
  //   billInfo: {
  //     type: Array,
  //     required: true,
  //   },
  //   otherBillinfo:{
  //     type:Array,

  //   },
  //   version:String,

  // },
  mounted() {},
  methods: {
    select(index, version) {
      this.$emit(
        "itemClick",
        index,
        version,
        this.billInfo,
        this.otherBillinfo
      );
    }
  }
};
</script>
<style>
.bill-item {
  margin-top: 0.4rem;
  overflow: hidden;
  color: #666;
  border-radius: 3px;
  border: 1px solid #cdcdcb;
  background: white;
  height: 1.6rem;
}
.select-item {
  background: url("../assets/images/common/icon_unselect.png") no-repeat;
  background-size: 0.32rem;
  background-position: center;
  width: 0.7rem;
  height: 1.6rem;
  border-right: 1px solid #cdcdcb;
}
.selected {
  background: url("../assets/images/common/icon_selected.png") no-repeat;
  background-size: 0.32rem;
  background-position: center;
}
.payed {
  background: url("../assets/images/common/icon_cancel.png") no-repeat;
  background-size: 0.32rem;
  background-position: center;
}
.info {
  color: #000;
  width: 5rem;
  left: 0.5rem;
  position: relative;
  top: 0.4rem;
}

.top .price {
  color: #ff8a00;
}

.bottom {
  line-height: 0.3rem;
  padding: 0;
  margin: 0;
  top: 0.3rem;
  position: relative;
}

.bottom .addr {
  width: 100%;
  -background-color: #000;
  margin-right: 0.5rem;
  overflow: hidden;
}

.bottom .date {
  padding-left: 0.35rem;
  background: url("../assets/images/common/icon_time_gray.png") no-repeat left
    center;
  background-size: 0.3rem;
}
.data-height {
}
.bill-item1{
	margin-top: 0.3rem;
	overflow: hidden;
	color: #666;
	border-radius: 3px;
	border:1px solid #cdcdcb;
  background: white;
}
.select-item1 {
    background: url('../assets/images/common/icon_unselect.png') no-repeat ;
    background-size: 0.32rem;
    background-position: center;
    width:0.7rem;
    height: 2.6rem;
    border-right: 1px solid #cdcdcb;
}
.selected {
	background: url('../assets/images/common/icon_selected.png') no-repeat ;
	background-size: 0.32rem;
   background-position: center;
}
.payed {
  background: url("../assets/images/common/icon_cancel.png") no-repeat;
  background-size: 0.32rem;
  background-position: center;
}

.info1{
padding: 0.2rem 0.3rem 0.1rem;
    width: calc(100% - 1.4rem);
}
.fl1{
  float: left;
}

.top1{
	padding: 0;
	margin: 0;
	line-height:1.12rem;
	height: 1.12rem;
	font-size: 0.3rem;
}
.ov1{
  overflow:hidden;
}

.top1 .title1{
	color: #000;
}

.top1 .price1{
	color:#ff8a00;
}

.bottom1{
	line-height: 0.4rem;
	padding: 0;
	margin: 0;
}

.bottom1 .addr1{
	width: 3rem;
	-background-color: #000;
	margin-right:0.5rem;
	overflow: hidden;
}

.bottom1 .date1{
	padding-left: 0.35rem;
	background: url('../assets/images/common/icon_time_gray.png') no-repeat left center;
	background-size: 0.3rem;
}
.data-height1{}
.fr1{
  float:right;
}
</style>
</style>
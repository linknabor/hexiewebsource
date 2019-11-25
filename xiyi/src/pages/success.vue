<template>
   <div class="suc">
        <div class="title_area">
            <div class="brand-tip-1">支付成功</div>
            <div class="brand-tip-2">请等待小哥上门取件</div>
        </div>
        <div class="bg_ffffff bb_gray items-area">
            <div v-for="order in bill.items" class="orderitem">
                <p class="fl w60">{{order.title}}</p>
                <p class="fl w20 fontr">￥{{order.price}}</p>
                <p class="fl w20 fontr">×{{order.count}}</p>
            </div>
	    </div>

    <div class="bg_ffffff desc_area">
    	<div class="grade">
    		<span class="desc_title">联系地址:</span>
    		<span class="desc_info">&nbsp;{{bill.address}}</span>
    	</div>
    	<div class="grade">
    		<span class="desc_title">预约时间:</span>
    		<span class="desc_info">&nbsp;{{bill.serviceDateStr}}</span>
    	</div>
    	<div class="grade">
    		<span class="desc_title">联系人:</span>
    		<span class="desc_info">&nbsp;{{bill.receiverName}}</span>
    	</div>
    	<div class="grade">
    		<span class="desc_title">手机号：</span>
    		<span class="desc_info">&nbsp;{{bill.tel}}</span>
    	</div>
  	</div>

    <div style="width: 100%;height: 80px;">&nbsp;</div>
  	<div class="btn-fixed">
		<div class="btn" @click="gotoBack">返回</div>
	</div>

   </div>
</template>

<script>
let vm;
export default {
   data () {
       return {
           bill:{},
           orderId:this.$route.query.oId,
       };
   },
   created() {vm=this},
   mounted() {
    //    vm.common.checkRegisterStatus()
      vm.query();
      vm.notifyPayed();
   },

   components: {},

   methods: {
       query(){
            vm.receiveData.postData(vm,"/yunxiyi/bill/"+vm.orderId,null,'res',function() {
                if(vm.res.success) {
                    vm.bill=vm.res.result;
                }else {
                    alert("订单数据获取失败，请稍后重试！");
                }
            })
       },
       notifyPayed() {
           vm.receiveData.postData(vm,"/yunxiyi/notifyPayed/"+vm.orderId,null,'res',function() {
                
            })
       },
       gotoBack() {
           location.href=vm.basePageUrl+'home/index.html';
       }
   },

   computed: {},
}
</script>

<style  scoped>
.suc {
    font-family: "微软雅黑";
    background: #ffffff
}
.title_area {
    padding: 45px 0;
    background: #f7f7f1;
}
.brand-tip-1 {
    text-align: center;
    font-size: 30px;
    background: url(../assets/images/index/icon_successful.png) no-repeat #f7f7f1;
    background-position: 25% center;
    background-size: 28px;
    color: #FF8A00;
}
.brand-tip-2 {
    text-align: center;
    background: #f7f7f1;
    margin-top: 25px;
    font-size: 20px;
    color: #FF8A00;
}
.items-area {
    padding: 10px 0;
}
.fontr{
    text-align: right;
    float:right;
}
.w20{
    width:60px;
}
.orderitem{
    color:#cccccc;
    font-size:16px;
    clear: both;
    margin:8px 10px;
    height:26px;
}
.orderitem:last-child{
    border-bottom: 1px solid #cccccc;
}
.desc_area {
    font-size: 15px;
    margin-top: 18px;
}
.grade{
    width: 100%;
    box-sizing: border-box;
    padding: 8px 10px;
    margin-top :15px;
    overflow: hidden;

}
.desc_title{
    float: left;
    display: inline-block;
    width: 30%;
}
.desc_info{
    float: left;
    display: inline-block;
    color:gray;
    width: 70%;
}
.btn-fixed {
    position: fixed;
    bottom: -15px;
    left: -15px;
    right: -15px;
}
.btn {
    display: block;
    margin: 15px;
    height: 44px;
    line-height: 44px;
    color: #fff!important;
    font-size: 15px;
    text-align: center;
    background-color: #ff8a00;
    border-radius: 3px;
    outline: none;
    border: none;
    text-decoration: none;
}
</style>
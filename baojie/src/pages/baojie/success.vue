<template>
   <div>
       <img src="../../assets/img/img_yuyue_succeed_02.png" class="icon1"/>
        <div class="success_point">
            <img src="../../assets/img/img_wenzi_05.png" class="icon2"/>
        </div>  
        <div class="order_detail1">
			<div class="div1">预约单号：{{bill.orderNo}}</div>
			<div class="div1">地址：{{bill.address}}</div>
			<div class="div1">联系人：{{bill.receiverName}}</div>
			<div class="div1">联系电话：{{bill.tel}}</div>
		</div>
		<div class="order_detail2">
			<div class="div1">项目：{{bill.typeName}}</div>
			<div class="div1">时间：{{bill.requireDateStr}}</div>
			<div class="div1">保洁时长：{{bill.itemCount}}</div>
			<div class="div1">实际支付金额：￥{{bill.realAmount}}</div>
		</div>
        <div class="btn" @click="btn">返回首页</div>
   </div>
</template>

<script>
let vm;
export default {
   data () {
       return {
           bill:{},
           billId:this.$route.query.oid,
       };
   },
   created() {
       vm=this;
   },
   mounted() {
    //    this.common.checkRegisterStatus();
       vm.query();
   },

   components: {},

   methods: {
       query() {
           let url="/baojie/get/"+vm.billId;
            vm.receiveData.getData(vm,url,'res',function(){
                if(vm.res.success) {
                    vm.bill=vm.res.result;
                }else {
                      alert('获取订单信息失败，返回首页！');
                }   
             })
       },
       btn() {
           location.href=this.basePageUrl+'home/index.html?state=123#/'
       }
   },

   computed: {},
}
</script>

<style  scoped>
.icon1{
    width: 100%;
}
.icon2{
    width: 65%;
}
.success_point{
    width: 100%;
    padding: 24px 0px;
    text-align: center;
    background-color: #FFFFFF;
    border-bottom: 1px solid #CCCCCC;
    margin-top: -2px;
}
.order_detail1{
    padding: 14px;
    background-color: #FFFFFF;
    border-bottom: 1px solid #CCCCCC;
}
.div1{
    margin: 10px 0;
    font-family: "微软雅黑";
    font-size: 14;
    color: #838383;
}
.order_detail2{
    padding: 14px 14px 26px 14px;
    background-color: #FFFFFF;
    /*border-bottom: 1px solid #CCCCCC;*/
}
.btn {
    display: block;
    width: 100%;
    height: 48px;
    line-height: 48px;
    color: #fff;
    font-family: "微软雅黑";
    font-size: 24px;
    text-align: center;
    padding-bottom: 4px;
    background-color: #ff8a00;
    outline: none;
    border: none;
    text-decoration: none;
    }
</style>
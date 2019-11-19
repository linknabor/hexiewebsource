<template>
   <div class="orderdetail">
       <div class="product">
			<img src="../../assets/img/icon_richangbaojie_03.png" class="icon1"/>
			<p class="item">项目：{{bill.typeName}}</p>
			<p class="time_long">时长：{{bill.itemCount}}小时</p>
			<p class="state">{{bill.statusStr}}</p>
		</div>
        <div class="address">
            <div class="addr_area">
                <div class="addrtop">&nbsp;</div>
                <div class="custom-menu-link">
                    <span>{{bill.receiverName}}</span>
                    <span style="margin-left:15px;">{{bill.tel}}</span>
                    <div class="addr_location">{{bill.address}}</div>
                </div>
                <div class="addrbottom">&nbsp;</div>
            </div>
        </div>
        <div class="order_detail">
			<div class="div1">订单编号：{{bill.orderNo}}</div>
			<div class="div1">下单时间：{{bill.createDateStr}}</div>
			<div class="div1">预约时间：{{bill.requireDateStr}}</div>
			<div class="div2">备注：{{bill.memo}}</div>
		</div>
        <div class="money">
			<p style="margin: 0px;"><span>总额</span><span class="money_pay">￥{{bill.totalAmount}}</span></p>
			<p style="margin: 14px 0px 0px 0px;" v-show="bill.discountAmount">
                <span>优惠</span><span class="money_pay">-￥{{bill.discountAmount}}</span>
            </p>
		</div>
        <div class="total_pay">
			<span>合计：￥{{bill.realAmount}}</span>
			<span style="color: #CCCCCC;display: block;">({{bill.statusStr}})</span>
		</div>
        <div style="height:56px; width:100%; background-color: #FFFFFF;" ></div>
        <div class="get_help">
			<a href="tel:021-50876295" >
                <span class="connect"  @click="contact($event)">联系客服</span>
            </a>
		</div>
   </div>
</template>

<script>
let vm;
export default {
   data () {
       return {
           bill:{
                // billLogo:"http://img.e-shequ.com/FndH5ftmymD3IxRRnF5OXml__lwg",
                // createDateStr:"2018-11-08 11:26",
                // id:16,
                // itemCount:"2.0",
                // orderNo:"201811081126O73027",
                // projectName:"日常保洁",
                // requireDateStr:"2018-11-08 13:00",
                // status:1 ,
                // statusStr:"待支付",
                // typeName:"日常保洁",
                // address:"北京市海淀区  百度大厦上地十街百度大厦1号楼",
                // tel:"15072228766",
                // receiverName:"这你你的",
                // discountAmount:0,
                // totalAmount:70,
                // realAmount:70,
           },
           billId:this.$route.query.billId,

       };
   },
   created() {
       vm=this;
   },
   mounted() {
       vm.query();
   },

   components: {},

   methods: {
       query() {
            let url="/baojie/get/"+vm.billId;
            vm.receiveData.getData(vm,url,'res',function(){
                     vm.bill=vm.res.result;
         })
       },
       contact(event){
            localtion.href="tel:021-50876295";
            event.stopPropagation();
        },
   },

   computed: {},
}
</script>

<style  scoped>
.orderdetail {
    margin: 0;
    background-color: #f4f5f6
}
.product{
    padding: 14px;
    background-color: #FFFFFF;
}
.icon1{
    float: left;
    width: 86px;
    height: 86px;
    margin-right: 14px;
    margin-top: -1px;
}
.item,.time_long{
    font-family: "微软雅黑";
    font-size: 14px;
    color: #000000;
    margin-top:0 ;
    margin-bottom: 14px;
}
.state{
    font-family: "微软雅黑";
    font-size: 14px;
    color: #ff8a00;
    margin-bottom: 0;
    margin-top: 0;   
}
.address{
    margin-top: 15px;
    background: #F7F7F1;
}
.addr_area{
    background: #F7F7F1;
}
.custom-menu-link {
    font-size:16px;
    padding:6px 15px;
    color: #3b3937;
    background-position-y: 15px;
}
.addr_location{
    color: #888;
    line-height: 20px;
    margin-top: 6px;
}
.addrtop {
    background:url(../../assets/img/icon_address_top_02.png) repeat-x;height:5px;background-size: 100% 5px;
}
.addrbottom {
    background:url(../../assets/img/icon_address_bottom_04.png) repeat-x;height:5px;background-size: 100% 5px;
}
.order_detail{
    padding: 0 14px;
    background-color: #FFFFFF;
}
.div1{
    padding: 14px 0;
    font-family: "微软雅黑";
    font-size: 14px;
    color: #666666;
    border-bottom: 1px solid #EEEEEE;
}
.div2{
    padding: 14px 0;
    font-family: "微软雅黑";
    font-size: 14px;
    color: #666666;
}
.money{
    margin-top: 10px;
    padding: 14px;
    background-color: #FFFFFF;
    border-bottom:1px solid #EEEEEE;
}
.money p{
    font-family: "微软雅黑";
    font-size: 12px;
    color: #666666;
}
.money_pay{
    float: right;
}
.total_pay{
    padding: 14px;
    background-color: #FFFFFF;
    font-family: "微软雅黑";
    font-size: 14px;
    color: #666666;
    text-align: right;
}
.get_help{
    padding: 14px;
    width: 100%;
    background-color: #FFFFFF;
    border-top: 1px solid #EEEEEE;
    position: fixed;
    bottom: 0;
    /* text-align: right; */
}
.connect{
    border: 1px solid #ff8a00;
    border-radius: 3px;
    display: block;
    font-family: "微软雅黑";
    font-size: 13px;
    color: #ffffff;
    background-color: #ff8a00;
    width: 70px;
    height: 15px;
    line-height: 15px;
    text-align: center;
    margin-right: 30px;
    margin-top: -2px;
    padding: 4px 6px;
    float: right;
}
</style>
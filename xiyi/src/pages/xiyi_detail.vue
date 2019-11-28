<template>
   <div class="xiyidetail">
       <div class="head_line block_area">
			<img class="product_img" :src="bill.billLogo" alt=""/>
			<div class="order_desc">
				<div class="product_info">订单编号: {{bill.orderNo}}</div>
				<div class="product_info">取件日期: {{bill.serviceDateStr}}</div>
				<div class="product_info">下单日期: {{bill.createDateStr}}</div>
			</div>
		</div>
        <div class="step_area">
			<p class="title_line">订单状态:</p>
			<div class="step">
				<i class="step-icon step-pay-gray" :class="{'step-pay':bill.status>=1}"></i>
				<div class="step_text">支付</div>
			</div>
			<div class="step">
				<i class="step-icon step-get-gray" :class="{'step-get':bill.status>=2}"></i>
				<div class="step_text">取件</div>
			</div>
			<div class="step">
				<i class="step-icon step-wash-gray" :class="{'step-wash':bill.status>=4}"></i>
				<div class="step_text">洗衣</div>
			</div>
			<div class="step">
				<i class="step-icon step-send-gray" :class="{'step-send':bill.status>=5}"></i>
				<div class="step_text">派送</div>
			</div>
			<div class="step">
				<i class="step-icon step-finish-gray" :class="{'step-finish':bill.status>=6}"></i>
				<div class="step_text">完成</div>
			</div>
		</div>

        <div class="operator_area"  v-if="bill.receiveOperator&&!bill.sendOperatorName">
			<div class="operator_name">
				<div>配送人员: {{bill.receiveOperator}}</div>
				<div>联系方式: {{bill.receiveOperatorTel}}</div>
			</div>
			<div class="phone" >
                <a :href="'tel:'+bill.receiveOperatorTel">
                    <i class="phone_icon"></i>
                </a>
            </div>
		</div>

        <div class="operator_area"  v-if="bill.sendOperatorName">
			<div class="operator_name">
				<div>配送人员: {{bill.sendOperatorName}}</div>
				<div>联系方式: {{bill.sendOperatorTel}}</div>
			</div>
			<div class="phone" >
                <a :href="'tel:'+bill.sendOperatorTel">
                    <i class="phone_icon"></i>
                </a>
            </div>
		</div>

        <div class="address_area">
			<div class="batop">&nbsp;</div>
			<div class="address_info">
				<span style="color:#3b3937;" >{{bill.receiverName}}</span>
				<span style="margin-left:20px;color:#3b3937;">{{bill.tel}}</span>
				<div style="color:#666666;margin-top:15px">{{bill.address}}</div>
			</div>
			<div class="babot" >&nbsp;</div>
		</div> 

        <div class="memo_area">
			<span class="memo_title">备注:</span>
			<span class="memo_content">
				{{bill.memo}}
			</span>
		</div>   

        <div class="order_area">
			<div v-for="order in bill.items"  class="order_item">
				<p class="fl w60">{{order.title}}</p>
				<p class="fl w20 fontr">×{{order.count}}</p>
				<p class="fl w20 fontr">￥{{order.price}}</p>
			</div>
			<div class="order_item" v-if="bill.shipFee">运费:<span class="fr w20">￥{{bill.shipFee}}</span></div>
			<div class="order_item" v-if="bill.discountAmount">优惠:<span class="fr w20">￥{{bill.discountAmount}}</span></div>
			<div class="payinfo">实际支付: ￥{{bill.realAmount}} </div>
		</div> 

        <div id="foot" ms-visible="bill.status==5||bill.status==6||bill.status==1">
			<span @click="cancelOrder()" v-if="bill.status==1">取消订单</span>
			<span @click="sign()" v-if="bill.status==5||bill.status==6">确认完成</span>
			<span @click="pay()" v-if="bill.status==1">支付</span>
		</div>   
   </div>
</template>

<script>
let vm;
import wx from 'weixin-js-sdk';
export default {
   data () {
       return {
           oId:this.$route.query.oId,
           bill:{},
       };
   },
    created() {vm=this},
   mounted() {
    // vm.initSession4Test();
    vm.querydetail();
    
   },
   methods: {
          //模仿线上用户信息
            // 105/747/384
        initSession4Test(){
            let url ='/initSession4Test/105';
                    vm.receiveData.getData(vm,url,'Data',function(){
            });
        },
       querydetail() {
            vm.receiveData.postData(vm,"/yunxiyi/bill/"+vm.oId,null,'res',function() {
                if(vm.res.success) {
                    vm.bill=vm.res.result;
                }
            })
       },
       //取消订单
       cancelOrder() {
            vm.receiveData.postData(vm,"/yunxiyi/bill/"+vm.oId+'/cancel',null,'res',function() {
                if(vm.res.success) {
                    vm.bill.status=8;
                }else {
                    alert("订单取消失败，请稍后重试！");
                }
            })
       },
       //确定完成
       sign() {
           vm.receiveData.postData(vm,"/yunxiyi/bill/"+vm.oId+'/signed',null,'res',function() {
                if(vm.res.success) {
                    vm.bill.status=7;
                }else {
                    alert("订单签收失败，请稍后重试！");
                }
            })
       },
       //支付
       pay() {
            vm.receiveData.postData(vm,"/yunxiyi/pay/"+vm.oId,null,'res',function() {
                if(vm.res.success) {
                    wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: vm.res.result.appId, // 必填，公众号的唯一标识
                    timestamp: vm.res.result.timestamp, // 必填，生成签名的时间戳
                    nonceStr: vm.res.result.nonceStr, // 必填，生成签名的随机串
                    signature: vm.res.result.signature,// 必填，签名，见附录1
                    jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                 });
                    wx.chooseWXPay({
                        "timestamp":vm.res.result.timestamp,
                        "nonceStr":vm.res.result.nonceStr,
                        "package":vm.res.result.pkgStr,
                        "signType":vm.res.result.signType,
                        "paySign":vm.res.result.signature,
                        success: function (res) {
                           vm.notifyPayed()
                        }
        	        });
                }else {
                    	alert(vm.res.message==null?"支付请求失败，请稍后重试！":vm.res.message);
                }
            })
       },
       notifyPayed() {
           let url="/yunxiyi/notifyPayed/"+vm.oId;
            vm.receiveData.getData(vm,url,'Data',function(){
                    alert("支付成功！");
                    vm.bill.status=2;  
                  });
       }

   },
   components: {},
   computed: {},
}
</script>

<style  scoped>
.xiyidetail {
    box-sizing: border-box;
    background-color: #f4f5f7;
    font-size: 1em;
}
.head_line{
    border-bottom: 10px #f4f5f7 solid ;
    height:84px;
}
.block_area {
   	background-color: #fff;
    overflow: hidden;
    padding:15px; 
}
.product_img{
    float: left;
    width:84px;
    height:84px;
    margin-right: 15px;
}
.product_info {
    height: 26px;
    line-height: 26px;
    font-size: 15px;
}

.step_area{
    height:130px;
    padding: 0 10px;
    background: white;
}
.title_line{
    font:15px black;
    padding: 15px 0;
    border-bottom: 1px solid #f4f5f7;
}
.step{
    width:20%;
    float:left;
    text-align: center;
    padding: 15px 0;
}
.step-icon {
    width: 30px;
    height: 30px;
    display: inline-block;
    background-size: 100%;
    background-position: 50%;
}
.step-pay-gray{background-image: url("../assets/images/wash/pay_gray.png");}
.step-get-gray{background-image: url("../assets/images/wash/get_gray.png");}
.step-wash-gray{background-image: url("../assets/images/wash/wash_gray.png");}
.step-send-gray{background-image: url("../assets/images/wash/send_gray.png");}
.step-finish-gray{background-image: url("../assets/images/wash/finish_gray.png");}

.step-pay{background-image: url("../assets/images/wash/pay.png");}
.step-get{background-image: url("../assets/images/wash/get.png");}
.step-wash{background-image: url("../assets/images/wash/wash.png");}
.step-send{background-image: url("../assets/images/wash/send.png");}
.step-finish{background-image: url("../assets/images/wash/finish.png");}

.operator_area{
    padding: 0 15px;
    background: white;
    height:76px;
}
.operator_name{
    border-top:1px solid #cccccc;
    float: left;
    width: 70%;
    font-size: 16px;
    line-height:36px;
}
.phone {
    border-top: 1px solid #cccccc;
    float: left;
    width: 30%;
}
.phone a {
    text-decoration: none;
    display: inline-block;
    color: black;
    width:100%;
}
.phone_icon {
    display: inline-block;
    height: 69px;
    width: 100%;
    background-image: url(../assets/images/wash/phone_icon.png);
    background-size: 50px 50px;
    background-position: 50%;
    background-repeat: no-repeat;
}

.address_area{
    margin-top: 15px;
}
.address_info{
    padding: 15px;
    font-size: 16px;
}
.batop {
    background:url(../assets/images/index/bg_line_location_top.png) repeat-x;
    height:5px;
    background-size: 100% 5px;
}
.babot {
    background:url(../assets/images/index/bg_line_location_bottom.png) repeat-x;
    height:5px;
    background-size: 100% 5px;
}

.memo_area{
    background: #ffffff;
    padding: 15px;
    font-size:15px;
}
.memo_title{
    float:left;
    display:inline-block;
    color:#3b3937;
    width:20%;
}
.memo_content{
    width:80%;
    color:#3b3937;
    display:inline-block;
}

.order_area{
    margin: 15px 0 70px 0;
    background: white;
}
.order_item{
    width: 100%;
    margin:15px 0 ;
    font-size:13px;
    height:30px;
    line-height:30px;
    color:#666666;
    padding-left: 15px;
    box-sizing: border-box;
}
.w60{
    width: 60%;
}
.w20{
    width: 20%;
}
.payinfo{
    color:#ff8a00;
    font-size:15px;
    text-align: right;
    padding-right: 15px;
    height:50px;
    line-height:50px;
    border-top: 1px solid #cccccc;
}

#foot {
    padding: 12px 0px;
    width: 100%;
    position: fixed;
    bottom: 0px;
    background: white;
    border-top: 1px solid #dcdde2;
}
#foot span {
    display: inline-block;
    border: 1px solid #dcdde2;
    padding: 5px 15px;
    border-radius: 5px;
    color: #aaa;
    float: right;
    margin-right: 12px;
}
</style>
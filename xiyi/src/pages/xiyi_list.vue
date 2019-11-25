<template>
   <div class="xiyi_list">
       <div class="nopage" v-if="orderList.length==0&&inited">
				<img class="nopage_img" src="../assets/images/index/noorder.png"/>
				<div class="nopage_desc">您还没有订单哦！</div>
				<div class="btn_desc">点击下方按钮立即预约</div>
				<div class="order_btn" @click="gotoPage()">立即预约</div>
		</div>

        <div v-if="orderList.length>0">
            <div class="list_body" v-for="(order,index) in orderList" :key="order.id" @click="gotoDetail(index)">
				<p class="borderline"></p>
				<div class="time_desc">下单时间: {{order.createDateStr}}</div>
				<div class="list_main">
					<img class="item_logo" :src="order.billLogo" alt="" />
					<div class="item_desc">订单编号: </div><div class="item_desc">{{order.orderNo}}</div>
					<div class="item_desc">取件时间: {{order.serviceDateStr}}</div>
					<div  class="item_desc highlight">{{order.statusStr}}</div>
				</div>
				<div class="status_bar">
					<span>实际支付: <span style="color: #ff8a00;">{{order.realAmount}}元</span></span>
					<p class="fr btns">
						<span class="cancel" @click.stop="cancel(index)" v-if="order.status==1">取消订单</span>
						<span class="pay" @click.stop="pay(index)" v-if="order.status==1">付款</span>
					</p>
				</div>
			</div>
        </div>
   </div>
</template>

<script>
let vm;
import wx from 'weixin-js-sdk';
export default {
   data () {
       return {
          orderList:[
            //  {
            //     id:'4',
            //     createDateStr:'2019-4-19',
            //     orderNo:'333',
            //     serviceDateStr:'2019-3324',
            //     statusStr:'432',
            //     status:'1',
            //     realAmount:'100',
            //     billLogo:'http://img.e-shequ.com/Fu3XAhDbMYqnQiyyicsZfgQIGNdR',
            //  }
          ],
		  inited:false,
       };
   },
   created() {vm=this},
   mounted() {
        //   vm.common.checkRegisterStatus();
 
        vm.query();//获取订单
   },
   methods: {
       query() {
            vm.receiveData.postData(vm,'/yunxiyi/bills/0',null,'res',function() {
                if(vm.res.success) {
                    vm.orderList=vm.res.result;
		            vm.inited = true;
                }else {
                    vm.inited = true;
                    alert("订单数据获取失败，请稍后重试！");    
                }
            })
       },
       //立即预约
       gotoPage() {
            vm.$router.push({path:'/'});
       },
       //点击订单
       gotoDetail(idx) {
           if(vm.orderList[idx].status<8){
                vm.$router.push({path:'/xiyi_detail',query:{'oId':vm.orderList[idx].id}})
           }
       },
       //取消订单
       cancel(idx){
            vm.receiveData.postData(vm,"/yunxiyi/bill/"+vm.orderList[idx].id+"/cancel",null,'res',function() {
                if(vm.res.success) {
                    vm.orderList[idx].status=8;
				    vm.orderList[idx].statusStr="已取消";
                }else {
                    alert(vm.res.message?"订单取消失败，请稍后重试！":vm.res.message);
                }
            })
       },
       //付款
       pay(idx) {
            vm.receiveData.postData(vm,'/yunxiyi/pay/'+vm.orderList[idx].id,null,'res',function() {
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
                            vm.notifyPayed(idx);
                         }
                        });
                }else {
                      alert(vm.res.message?"支付请求失败，请稍后重试！":vm.res.message);
                }
            })
       },
       //通知 
       notifyPayed(idx) {
           let url ="/yunxiyi/notifyPayed/"+vm.orderList[idx].id;
                 vm.receiveData.getData(vm,url,'Data',function(){
                    vm.orderList[idx].statusStr="已支付";
        		    vm.orderList[idx].status=2;  
                  });
       }
       
   },
   components: {},
   computed: {},
}
</script>

<style  scoped>
.xiyi_list {
    font-size: 1em;
    background-color: #f4f5f7;
}
.nopage {
    position: fixed;
    height: 100%;
    width: 100%;
    background-color: #eeeeee;
    text-align: center;
}
.nopage_img {
    margin-top: 30%;
    width: 50%;
}
.nopage_desc {
    margin-top: 15px;
    font-size: 16px;
}
.btn_desc {
    position: fixed;
    bottom: 50px;
    font-size: 16px;
    width: 100%;
}
.order_btn {
    position: fixed;
    bottom: 0px;
    font-size: 22px;
    width: 100%;
    background-color: #ff8a00;
    color: white;
    padding: 8px;
}
.list_body{
    margin-bottom: 15px;
    box-sizing: border-box;
    clear: both;
    background-color: #fff;
    font-size:15px;
    border-bottom: 10px solid #f4f5f7;
}
.borderline{
    height:1px;
    background-image: url("../assets/images/index/line3.png");
}
.time_desc{
    color:#666666;
    padding:15px 0 0 15px;
}
.list_main{
    padding:15px;
    height:90px;
    clear:right;
}       
.item_logo{
    width:84px;
    height:84px;
    float:left;
    margin-right: 15px;
}
.item_desc{
    height:26px;
    line-height: 26px;
}
.highlight{
    color:#ff8a00;
}
.status_bar{
    height: 40px;
    line-height: 40px;
    padding: 0px 15px;
    border-top:1px solid #f4f5f7;
} 
.btns>span{
    display: inline-block;
    height: 28px;
    width:70px;
    line-height: 28px;
    text-align: center;
    border-radius: 5px;
    margin-left: 10px;
}
.cancel{
    border:1px solid #aaa;
}
.pay,.ems{
    background-color: #ff8a00;
    color:#fff;
}  
</style>
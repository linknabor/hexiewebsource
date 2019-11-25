<template>
   <div class="success">
        <div class="brand-tip highlight" style="font-size: 24px;">恭喜你！交易成功</div>
	    <div class="highlight fs16 divider p15" style="text-align:center; padding-top:0px;position: relative;" >
            <div class="highpos">
                <div>点击右上角将链接分享给您的邻居吧!</div>
                <div style="color:red">推荐2位邻居下单享首单五折优惠;</div>
                <div style="color:red">推荐4位邻居下单享首单免费优惠。</div>
            </div>
        </div>
        <div class="top-info lite-divider">
            <div class="item">
                <label>订单编号</label><span class="value">{{order.orderNo}}</span>
            </div>
            <div class="item">
                <label>商品信息</label><span class="value">{{order.productName}}（{{order.count}}件）</span>
            </div>
            <div class="item">
                <label>支付金额</label><span class="value">¥&nbsp;{{order.price}}</span>
            </div>
	    </div>
        <div class="bottom-info divider">
            <div class="item">
                <label>收货地址</label><span class="value">{{order.address}}</span>
            </div>
            <div class="item">
                <label>联系人</label><span class="value">{{order.receiverName}}</span>
            </div>
            <div class="item">
                <label>手机号</label><span class="value">{{order.tel}}</span>
            </div>
	    </div>
        <div class="bottom-info divider pb30" style="text-align: center;">
            <div class="divider highlight" style="text-align: center;width:100%;font-size:16px">长按关注合协社区，尊享更多特卖产品</div>
            <!-- 公众号二维码 -->
            <img style="width: 200px;" src="http://img.e-shequ.com/FrNERaxTnTNFrFO-iYMY6vx2kRe6">
            
	    </div>
        <div style="height:80px;"></div>
        <div class="btn-fixed">
            <div class="btn" @click="goback">返回选择更多商品</div>
        </div>

        <div class="coupon-overlay" v-if="order.seedStr!=null&&order.seedStr!=''">
        </div>
        <div class="coupon_arrow" v-if="order.seedStr!=null&&order.seedStr!=''">
            <img src="../../assets/images/img/coupon_arrow.png" style="height:110px;width: 70px;"/>
        </div>
        <div class="coupon_detail" v-if="order.seedStr!=null&&order.seedStr!=''">
            <img src="../../assets/images/img/coupon_success.png" />
        </div>

   </div>
   
</template>

<script>
let vm;
import { MessageBox } from 'mint-ui';
import wx from 'weixin-js-sdk';
export default {
   data () {
       return {
           order:{seedStr:""},
           orderId:this.$route.query.orderId,
           type:this.$route.query.type,
           marketBuy:0 || this.$route.query.marketBuy,

       };
   },
   created() {
       vm=this;
   },
   mounted() {
        // vm.common.checkRegisterStatus()
       vm.query();
       vm.notifyPaySuccess();
        let url = location.href.split('#')[0];
        vm.receiveData.wxconfig(vm,wx,['onMenuShareTimeline','onMenuShareAppMessage'],url);

   },
   methods: {
       query() {
            vm.receiveData.getData(vm,"/getOrder/"+vm.orderId,'n',function() {
                if(vm.n.success) {
                    vm.order=vm.n.result;
                    if(vm.order == null || vm.order.id == null){
                        MessageBox.confirm('获取订单信息失败').then(action => {
                                if(action == 'confirm') {
                                    if(vm.type==4){
                                        location.href=vm.basePageUrlpay+"hxrgroups.html?state=123";        		
                                    }else if(vm.type==3){   
                                        location.href=vm.basePageUrl+'/group/onsales.html';
                                    }else if(vm.type==5){
                                        location.href=vm.basePageUrl+"/home/index.html";
                                    }else{
                                        location.href=vm.basePageUrlpay+'hxrgroups.html?state=123';     		
                                    } 
                                }
                        }).catch(err => {
                                if(err == 'cancel') {

                                }
                        })
                    }else {
                        vm.initShareSetting(vm.order);
                    }
                }else {
                        MessageBox.confirm('获取订单信息失败').then(action => {
                            if(action == 'confirm') {
                                 if(vm.type==4){
                                        location.href=vm.basePageUrlpay+"hxrgroups.html?state=123";        		
                                    }else if(vm.type==3){
                                        location.href=vm.basePageUrl+'/group/onsales.html';
                                    }else if(vm.type==5){
                                        location.href=vm.basePageUrl+"/home/index.html";
                                    }else{
                                        location.href=vm.basePageUrlpay+'hxrgroups.html?state=123';     		
                                    }     
                            }
                        }).catch(err => {
                            if(err == 'cancel') {

                            }
                        })
                }
            })
       },
        //分享
       initShareSetting(order) {
            var title = order.productName;;
           var link;
           link=vm.basePageUrlpay+"hxrgroups.html?state=123#/rgroupdetail?ruleId="+order.groupRuleId;
            var desc=order.productPic;
            var img=order.productPic;
            if(order.orderType==4){
			    link=vm.basePageUrlpay+"hxrgroups.html?state=123#/rgroupdetail?ruleId="+order.groupRuleId;
            }else if(order.orderType==0&&order.groupId!=0){
                // link=MasterConfig.C('basePageUrl')+"group.html?groupId="+order.groupId;
            }

            if(order.seedStr!=null&&order.seedStr!=''){
                title = vm.common.newname+"专享现金券";
                desc="分享给小伙伴们一个超赞的购物现金券！";
                // img="../assets/images/coupon_share_icon.jpg"
                // link=baseurl+"coupon.html?o="+order.seedStr;
            }
            vm.receiveData.initShareConfig(title,link,img,desc,wx);
       },
        //通知
       notifyPaySuccess() {
           let url="notifyPayed/"+vm.orderId;
           if(vm.marketBuy) {
               url="/collocation/notifyPayed/"+vm.orderId;
           }
            vm.receiveData.getData(vm,url,'res',function() {
            })
       },
       //更多商品
       goback() {
             if(vm.type==4){
                    location.href=vm.basePageUrlpay+"hxrgroups.html?state=123";        		
                }else if(vm.type==3){
                    location.href=vm.basePageUrl+'/group/onsales.html';
                }else if(vm.type==5){
                    location.href=vm.basePageUrl+"/home/index.html";
                }else{
                    location.href=vm.basePageUrlpay+'hxrgroups.html?state=123';     		
                }     
       }
   },
   components: {},
   computed: {

   },
}
</script>

<style  scoped>
.success {
    font-family: "微软雅黑";
    background: #ffffff;
}
.brand-tip {
    margin-top: 30px ;
    padding-bottom: 10px;
    padding-left: 20px;
    font-size: 30px;
    padding-top:10px;
    background: url("../../assets/images/group/icon_successful.png") no-repeat;
    background-position: 35px center;
    background-size: 35px;
    text-align:center;

}
.highpos {
			text-align: left;
			width: auto;
			margin: 0px auto;
			display: inline-block;
		}
.highlight {
    color: #ff8a00;
}   
.fs16 {
    font-size: 16px;
}
.p15 {
    padding: 15px;
}
.divider {
    border-bottom: 10px solid #f7f7f2;
}    
.top-info {
    padding-top: 20px;
    padding-bottom: 5px;
    margin: 0 15px;
}
.lite-divider {
    border-bottom: 1px solid #d4cfc8;
    padding-left: 15px;
}
.item {
    overflow: hidden;
    margin-bottom: 15px;
    font-size: 13px;
    color: #666;
}
label {
    display: inline-block;
    width: 60px;
}
label:after {
    content: " :";
}
.value {
    float: right;
    display: block;
    margin-left: 15px;
    color: #a6937c;
    width: 70%;
}
.bottom-info {
    padding: 20px 15px 5px 15px;
    margin:0px 15px;
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
.coupon-overlay{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #333333;
    z-index: 1001;
    -moz-opacity: .6;
    opacity: .60;
    filter: alpha(opacity=60)
}
.coupon_detail{
    position: fixed;
    top: 120px;
    left: 20px;
    right: 20px;
    z-index: 1002;
    border-radius: 5px;
}
.coupon_arrow{
    position: fixed;
    top: 6px;
    right: 10px;
    z-index: 1002;
}
</style>
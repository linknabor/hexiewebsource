<template>
   <div >
       <div class="adorder">
           <div class="order-number fs13 plr15">订单编号&nbsp;{{order.orderNo}}</div>

         <div class="p15">
                <img class="fl order-picture" :src="order.productThumbPic"/>
                <div class="ov pb15 fs14">{{order.productName}}</div>
                <div class="ov pb15 lite-divider" style="color:#3b3937">
                    <span class="fl fs13">
                        总计&nbsp;¥{{order.price}}
                    </span>
                    <span class="fr fs13 highlight">共{{order.count}}个商品</span>
                </div>
         </div>

        <div class="plr15 divider">
                <div class="section-title" style="padding-left: 0px;">收货信息</div>
                <div class="item pt15">
                    <label>收货地址</label>
                    <span class="value">{{order.address}}</span>
                </div>
                <div class="item">
                    <label>收货时间</label>
                    <span class="value">{{timeStr}}</span>
                </div>
                <div class="item">
                    <label>备注</label>
                    <span class="value">{{order.memo}}</span>
                </div>
                <div class="item">
                    <label>联系人</label>
                    <span class="value">{{order.receiverName}}</span>
                </div>
                <div class="item">
                    <label>手机号</label>
                    <span class="value">{{order.tel}}</span>
                </div>
         </div>

        <div class="p15 order-item divider">
                <div class="section-title" style="padding-left: 0px;">订单状态</div>
                <div class="pt15 fs13" style="line-height:23px">
                    <span class="highlight fs14">{{order.statusStr}}</span>
                    <!--unpaid-->
                    <div  class="lite-btn fs13 fr" v-show="order.status==0" @click="orderPay(order)">付款</div>
                    <div class="btn-plain fr" v-show="order.status==0" @click="orderCancel(order)">取消订单</div>
                    <!--unrecieved-->
                    <div class="lite-btn fs13 fr" v-show="order.status==5" @click="orderConfirm(order)">确认收货</div>
                    <!--  -->
                    <div  class="lite-btn fs13 fr" style="margin-right: 5px;" v-show="order.status==5"   @click="checkLogisics(order)">查看物流</div> 
                    <!--recieved-->
                    <span v-show="order.status==6&&order.pingjiaStatus!=1">
                        <div  class="lite-btn fs13 fr" @click="comment(order)">评价商品</div>
                    </span>
                </div>
        </div>

        <div class="p15 order-item" v-if="order.logisticName!=null&&order.logisticName!=''">
                <div class="section-title">物流信息</div>
                <div class="ov fs14 ptb15">
                <div class="ov fs14"> 快递公司：{{order.logisticName}}</div>
                <div class="ov fs14"> 快递单号：{{order.logisticNo}}</div>
                </div>
        </div>

        <div class="p15 order-item divider" style="height: 60px;" v-if="order.orderType==4">
                <div class="section-title" style="padding-left: 0px; padding-top: 0px;">团购详情</div>
                <div class="pt15 fs13" style="line-height:23px; padding-top: 5px;">
                    <div class="lite-btn fs13 fr" @click="gotoGroupDetail(order)">团购详情</div>
                </div>
            </div>
        <div style="margin-bottom: 2rem;"></div>
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
           order:{},
           orderId:'',
        //    orderId:7651,
           timeStr:'',//收货时间
       };
   },
   created() {
       vm=this;
       let url = location.href.split('#')[0];
        vm.receiveData.wxconfig(vm,wx,['chooseWXPay'],url);
   },
   mounted() {
        if(vm.$route.query.orderId) {
            vm.orderId=vm.$route.query.orderId
        }
        if(vm.getUrlParam("orderId")) {
             vm.orderId=vm.getUrlParam("orderId")
        }
        let url = location.href.split('#')[0];
        vm.receiveData.wxconfig(vm,wx,['onMenuShareTimeline','onMenuShareAppMessage'],url);
        vm.orders();
   },

   components: {},

   methods: {
       getUrlParam(name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
                var r = window.location.search.substr(1).match(reg);  //匹配目标参数
                if (r != null) return unescape(r[2]); return null; //返回参数值
            },
       orders() {
             vm.receiveData.getData(vm,'/getOrder/'+vm.orderId,'n',function() {
                 if(vm.n.success) {
                       vm.order=vm.n.result;
                        vm.timeStr=vm.getTimeStr();
                        vm.common.initShareConfig('代扔垃圾服务报名，限时优惠中！',vm.basePageUrl+"rgroups.html?state=123#/rgroupdetail?ruleId="+vm.order.groupRuleId,vm.order.productThumbPic,"小区报名满50人开通",wx);
                 }else {
                     alert('获取订单信息失败')
                    vm.$router.push({path:'/orders'})
                 }
               
             })
       },
       getTimeStr(){
            if(vm.order.receiveTimeType == 0){
                return "工作日";
            }else if(vm.order.receiveTimeType == 1){
                return "节假日";
            }else if(vm.order.receiveTimeType == 2){
                return "任何时间";
            }
        },
        // 付款
        orderPay(order){
             vm.receiveData.getData(vm,'requestPay/'+order.id,'n',function() {
                  if(vm.n.success) {
                    wx.chooseWXPay({
                        "timestamp":vm.n.result.timestamp,
                        "nonceStr":vm.n.result.nonceStr,
                        "package":vm.n.result.pkgStr,
                        "signType":vm.n.result.signType,
                        "paySign":vm.n.result.signature,
                            success: function (res) {
                                vm.notifyPaySuccess(order);
                                order.status=1;
                            }
                    });
               }else {
                    alert("支付请求失败，请稍后重试！");
               }
            })
        },
         //通知
        notifyPaySuccess(order) {
             vm.receiveData.getData(vm,'/notifyPayed/'+order.id,'n',function() {})
        },
        // 取消订单
        orderCancel(order) {    
                 MessageBox.confirm('确定要取消订单?').then(action => {
                    if (action == 'confirm') {     //确认的回调
                         vm.receiveData.getData(vm,'/cancelOrder/'+order.id,'res',function(){
                              if(vm.res.success) {
                                       order.status=2;
                                        order.statusStr="已取消";
                                        alert("订单已取消");
                              }else {
                                    alert("支付取消失败，请稍后重试！");
                              }
                                  
                                });
                        }
                    }).catch(err => { 
                        if (err == 'cancel') {     //取消的回调
                        //  vm.$router.push({path:'/orderdetail',query:{orderId:order.id}})
                        } 
                   })
        },
        // 确定收货
        orderConfirm(order){
           MessageBox.confirm('确定要已收货?').then(action => {
                  if(action == 'confirm') {
                        vm.receiveData.getData(vm,'/signOrder/'+order.id,'n',function() {
                            if(vm.n.success) {
                             order.status=6;
                             order.statusStr="已签收";
                            }else {
                                alert("支付签收失败，请稍后重试！");
                            }
                        })
                  }
              }).catch(err => {
                  if(err == 'cancel') {

                  }
              })
        },
        // 查看物流
        checkLogisics(order) {
            var  logisticName = escape(order.logisticName);
            vm.$router.push({path:'/logistice',query:{com:logisticName,nu:order.logisticNo}})
        },
        //评论
        comment(order){
            vm.$router.push({path:'/comment',query:{orderId:order.id}})
        },
        //团购详情
        gotoGroupDetail(order){
            window.location.href = vm.basePageUrl+"rgroups.html?#/rgroupinvite?ruleId="+ order.groupRuleId + "&share=1";
        }

   },

   computed: {},
}
</script>

<style  scoped>
.adorder {
    width:100%;
    height:100%;
    background-color:#fff;
}
/* 头部 */
.fs13 {
    font-size: 13px;
}
.plr15 {
    padding: 0 15px;
}
.order-number {
    display: inline-block;
    margin-top: 15px;
    height: 24px;
    line-height: 24px;
    border: 1px solid #d4cfc8;
    color: #a6937c;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
}
/* 商品 */
.p15 {
    padding: 15px;
}
.order-picture {
    width: 75px;
    height: 75px;
    margin-right: 15px;
    border: 1px solid #d4cfc8;
}
.fs14 {
    font-size: 14px;
}
.pb15 {
    padding-bottom: 15px;
}
.ov {
    overflow: hidden;
    /* padding: 1px; */
}
.section-title, .lite-divider {
    border-bottom: 1px solid #d4cfc8;
}
.fs13 {
    font-size: 13px;
}
.highlight {
    color: #ff8a00;
}
/* 收货地址 */
.divider {
    border-bottom: 10px solid #f7f7f2;
}
 .section-title {
    display: block;
    font-size: 13px;
    color: #a6937c;;
    padding-top: 15px;
    padding-bottom: 7px;
    border-bottom: 1px solid #d4cfc8;
}
.item {
    overflow: hidden;
    margin-bottom: 15px;
    font-size: 14px;
    margin-top: 4px;
}
label {
    display: inline-block;
    width: 75px;
    color: #3b3937;
}
.value {
    float: right;
    display: block;
    margin-left: 15px;
    color: #666;
    width: 200px;
}
/* 订单状态 */
.order-item .btn-plain, .order-item .lite-btn {
    height: 23px;
    line-height: 23px;
}
.lite-btn {
    display: inline-block;
    padding: 0 15px;
    color: #fff;
    font-size: 12px;
    height: 24px;
    line-height: 24px;
    background-color: #ff8a00;
    border-radius: 3px;
}
.order-item .btn-plain {
    margin-right: 10px;
    padding: 0 15px;
    color: #888;
}
.order-item .btn-plain, .order-item .lite-btn {
    height: 23px;
    line-height: 23px;
}

.btn-plain {
    display: inline-block;
    padding: 0 20px;
    height: 27px;
    line-height: 27px;
    color: #3b3937;
    border-radius: 3px;
    border: 1px solid #bfbfbf;
}

/* 物流信息 */
.section-title, .lite-divider {
    border-bottom: 1px solid #d4cfc8;
    padding-left: 15px;
}
.fs14 {
    font-size: 14px;
}

</style>
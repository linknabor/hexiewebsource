<template>
  <div class="buy">
    <div class="load6" id="LoadingBar" v-show="false">
        <div class="bounce1"></div>
        <div class="bounce2"></div>
        <div class="bounce3"></div>
    </div>
    <div id="fade" class="black_overlay" v-show="false">
    </div>

    <!-- 主页面 -->
    <div class="zhi" >
        <div style="background: white;height: 15px;width:100%;">&nbsp;</div>
        <!-- 新增地址 -->
        <div class="addr_area">
            <div class="addr-top">&nbsp;</div>
            <div class="menu-link fs14 addr_detail" v-if="checkedAddress.receiveName" >
                <span style="color:#3b3937;" id="infoname">{{checkedAddress.receiveName}}</span>
                <span style="margin-left:15px;color:#3b3937;" id="infotel">{{checkedAddress.tel}}</span>
                <div class="addr_location" id="infoaddr">{{checkedAddress.province}}{{checkedAddress.city}}{{checkedAddress.county}}（{{checkedAddress.xiaoquName}}）{{checkedAddress.detailAddress}}</div>
            </div>
            <div class="addr-f">&nbsp;</div>
        </div>

        <div class="product_detail" >
            <img class="product_picture" :src="product.smallPicture"/>
            <div class="product_content">
                <div class="product_name">{{product.name}}</div>
                <div class="product_pri_area">
                    <div class="fl fs16 highlight pt5"> ¥{{rule.price}} </div>
                    <div class="fl fs13" style="margin-left: 10px;padding-top: 7px;color:#888888"> <del>¥{{product.oriPrice}}</del> </div>
                </div>
            </div>
        </div>
        <div class="p15 " @click="showCoupons">
                <span class="fl fs15">优惠券</span> 
                <span class="fl fs15 baoyou_desc">{{couponNum}}张可用</span>
                <span class="fr fs15 mlr10">{{couponDesc}}</span>
        </div>
        <div class="p15  highlight">
                <span class="fl fs15">支付金额</span> 
                <span class="fr fs15 mlr10"> ¥&nbsp;{{totalAmount}}  </span>
        </div>
        <div class="btn-fixed">
            <div class="btn" @click="pay" >立即微信支付</div>
        </div>
    </div>
    <div id="zzmb" v-show="zzshow" class="zzmb" style="display:none;position:fixed;"></div>
  </div>
</template>

<script>
let vm;
import wx from 'weixin-js-sdk';
import cookie from 'js-cookie';
export default {
   data () {
       return {
            zzshow:false,
            ruleId:this.$route.query.ruleId,
            type:this.$route.query.type,
            product:{},
            rule:{limitNumOnce:10,price:0},
            address:{},
            checkedAddress:{},
            count:1,//数量
            totalAmount:0,
            order:{},
            couponNum: 0,
            coupon:null,
            couponDesc: '不使用',
            coupons:[],//优惠券
            couponid:this.$route.query.couponid,
       };
   },
   watch: {},
   created() {
       vm=this;
   },
   mounted() {
        vm.roady();
   },
   components: {
       
   },
   methods: {
        initSession4Test() {
            let url = "/initSession4Test/8427";
            vm.receiveData.getData(vm, url, "Data", function() {});
        },
        roady() {
           if(vm.ruleId&&vm.type){
                vm.queryBuyInfo();
           }
        },
        queryBuyInfo() {
             vm.receiveData.getData(vm,'/queryBuyInfo/'+vm.type+'/'+vm.ruleId,'res',function() {
                 if(vm.res.success) {
                    vm.product=vm.res.result.product;
                    vm.rule=vm.res.result.rule;
                    if(vm.res.result.address) {
                        vm.checkedAddress=vm.res.result.address
                    }
                    vm.queryCoupon();
                    vm.computeAmount();
                 }else {
                      alert("订单处理中，请稍后再试！")
                 }
                   
                })
        },
         // 优惠券
        queryCoupon() {
            var data = {
                salePlanType:vm.type,
                itemList: [
                    {
                        ruleId:vm.ruleId,
                        count:vm.count
                    }
                ]
            }
            vm.receiveData.postData(vm,'/coupon/valid',data,'res',function() {
                if(vm.res.success) {
                    if(vm.res.result!=null){
                        vm.coupons=vm.res.result;
                        vm.couponNum=vm.coupons.length;//可有优惠券数量
                        vm.computeAmount();
                    }    
                }else {
                    alert(vm.res.message);
                }
            
            })
            }, 
       //计算价格
       computeAmount() {
            var  pa,ta;
            pa=vm.rule.price*vm.count;
        //使用优惠券计算金额
            if(vm.couponid != undefined) {
                for(var i=0;i<vm.coupons.length;i++){
                    if(vm.couponid == vm.coupons[i].id) {
                        vm.coupon = vm.coupons[i];
                    }
                }
            }
            if(vm.couponid == undefined) {
                vm.coupon = vm.coupons[0];
                if(vm.coupon !=undefined){
                    vm.couponid = vm.coupon.id;
                }
            }
            if (vm.coupon != null) {
                // console.log(vm.coupon.usageCondition > vm.amounts,vm.coupon.usageCondition,pa);
                if(vm.coupon.usageCondition ==null || vm.coupon.usageCondition > pa) {
                    alert('当前优惠券不可用');
                    vm.coupon = null;
                }else {
                    vm.couponDesc = '¥ '+vm.coupon.amount;
                }
            }

            if (vm.coupon == null) {
                ta = pa;
            }else if (vm.coupon.amount > 0) {
                ta = pa - vm.coupon.amount;
            }
            if(ta>0) {
                vm.totalAmount = ta.toFixed(2);
            } else {
                vm.totalAmount = "0.01";
            }
        },
        showCoupons() {
            if(vm.coupons.length != 0 && vm.coupons != null) {    
                vm.$router.push({
                    path: "/coupon",
                    name:'coupon',
                    query: {
                        type: vm.type,
                        ruleId: vm.ruleId,
                        count: vm.count,
                        couponid:vm.couponid,
                    },
                })
            }  
        },
        pay() {
            var order = {
                    ruleId: vm.ruleId,
                    count: vm.count,
                    orderType: '12',
                    serviceAddressId: vm.checkedAddress.id,
                    payType:"2"
                }
            if (vm.coupon != null) {
                order.couponId = vm.coupon.id;
            }    
            let sectId = cookie.get('sectId');
            if(sectId == "" || sectId == 'null' || sectId == 0 || sectId == null) {
                alert('您暂未绑定房屋，请前往“我是业主”进行操作，感谢！')
                location.href=vm.basePageUrl+'wuye/index.html?'+vm.common.getoriApp()+'#/myhouse'
                return false;
            }
            vm.zzshow=true;
            vm.receiveData.postData(vm,'/createOrder',order,'n',function(){
                if(vm.n.success) {
                    vm.order = vm.n.result;
                    vm.requestPay();
                }else {
                    vm.zzshow=false;
                    alert(vm.n.message==null?"订单创建失败，请稍后重试！":vm.n.message);
                }
            }) 
        },
  
      requestPay() {
          vm.receiveData.postData(vm, "/requestPay/"+vm.order.id,null,'n',function(){
            if(vm.n.success) {
                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: vm.n.result.appId, // 必填，公众号的唯一标识
                    timestamp: vm.n.result.timestamp, // 必填，生成签名的时间戳
                    nonceStr: vm.n.result.nonceStr, // 必填，生成签名的随机串
                    signature: vm.n.result.signature,// 必填，签名，见附录1
                    jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                });
                 wx.chooseWXPay({
                    "timestamp":vm.n.result.timestamp,
                    "nonceStr":vm.n.result.nonceStr,
                    "package":vm.n.result.pkgStr,
                    "signType":vm.n.result.signType,
                    "paySign":vm.n.result.signature,
                    success: function (res) {
                        vm.notifyPaySuccess();                     
                    },
                    cancel:function(res){
                         alert('支付取消');
                        vm.zzshow=false;
                        // vm.cancelPay()
                     }
                  });
            }else {
                 alert(vm.n.message==null?"支付请求失败，请稍后重试！":vm.n.message);
                    vm.zzshow=false;
            }           
        });
      },  
    //通知
    notifyPaySuccess() {
        let url="notifyPayed/"+vm.order.id;
        vm.receiveData.getData(vm,url,'res',function() {
            if(vm.res.success){
                // 支付成功后的回调函数
                alert("下单成功！");
                vm.$router.push({path:'/cardrollsuccess',query:{'orderId':vm.order.id,'type':vm.type}})
            }else {
                vm.zzshow=false;
                alert(vm.res.message);
            }
        })
    }, 
     //通知
    cancelPay() {
      vm.receiveData.getData(vm,"/order/cancelRequestPay/" + vm.order.id,"res",function() {
        if(vm.res.success) {
            
        }else {
            alert(vm.res.message)
        }
      });
    },
   },

   computed: {},
}
</script>

<style  scoped>
.zzmb {
  z-index: 100000;
  position: absolute;
  top: 0;
  left: 0;
  -moz-opacity: 0.65;
  opacity: 0.65;
  filter: alpha(opacity=65);
  background: #000;
  width: 100%;
  height: 100%;
  display: block;
}
.zhi {
    background: #F7F7F1;
}
.rule_intro {
    position: fixed;
    top: 0;
    z-index: 10;
    width: 100%;
}
img {
    max-width: 100%;
    height: auto;
}
.addr_area {
    background: #F7F7F1;
}
.addr-top {
     background: url(../../assets/images/bg_line_location_top.png) repeat-x;
    height: 2px;
    background-size: 100% 2px;
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
.add_btn_style {
    margin: 20px 0;
    color: #cfa972;
    background-color: white;
    padding: 4px 30px;
    border-color: #cfa972;
}
.addr_detail {
    padding: 17px;
    margin-right: 15px;
}
.menu-link {
    display: block;
    background: url(../../assets/images/icon_arrow.png) no-repeat;
    background-size: 7px 12px;
    background-position: right center;
    padding-right: 15px;
}
.fs14 {
    font-size: 14px;
}
.addr_location {
    color: #888;
    line-height: 20px;
    margin-top: 6px;
}
.addr-f {
    background: url(../../assets/images/bg_line_location_bottom.png) repeat-x;
    height: 2px;
    background-size: 100% 2px;
}
.product_detail {
    height: 110px;
    background-color: white;
}
.product_picture {
    margin: 15px;
    width: 80px;
    height: 80px;
    float: left;
    border: 1px solid #cecece;
}
.product_content {
  	margin-right: 10px;
	margin-left: 110px;
	padding-top: 25px;
}
.product_name {
   	font-size:16px;
    color:#3b3937;
    line-height: 20px;
    height:40px;
    overflow: hidden;
}
.product_pri_area {
    border-bottom: 2px solid #f7f7f1;
    width: 100%;
    height: 35px;
}
.highlight {
    color: #ff8a00;
}
.fl {
    float: left;
}
.fs16 {
    font-size: 16px;
}
.pt5 {
    padding-top: 5px;
}
.fs13 {
    font-size: 13px;
}
.fs13 {
    font-size: 13px;
}
.line {
    padding: 15px 15px;
    background: #f7f7f1;
    border-bottom: 1px solid #c2c2c2;
    margin-left: 10px;
}
.fs15 {
    font-size: 15px;
}

.sbtn.btn-minus {
    background-image: url(../../assets/images/btn_reduce_disable.png);
}
.minus-btn-size {
    width: 30px;
    height: 30px;
    background-size: 30px;
    margin-top: 10px;
}
.sbtn {
    position: relative;
    display: inline-block;
    /* width: 20px; */
    /* height: 20px; */
    border: 1px solid #bfbfbf;
    border-radius: 2px;
    background-repeat: no-repeat;
    /* background-size: 22px; */
}
.number {
    padding: 0 20px;
    vertical-align: super;
}
.fs16 {
    font-size: 16px;
}
.sbtn.active {
    border-color: #ff8a00;
    color: #ff8a00;
}
.sbtn.btn-add {
    background-image: url(../../assets/images/btn_add.png) ;
}
.sbtn.btn-minus.active {
    background-image: url(../../assets/images/btn_reduce.png);
}
.fs10 {
    font-size: 10px;
}
.fs20 {
    font-size: 20px;
}

.p15 {
    padding: 15px;
    overflow: hidden;
    margin-top: 5px;
}
.baoyou_desc {
    padding: 2px 13px;
    border: 1px solid #ff8a00;
    border-radius: 2px;
    margin-left: 10px;
    margin-top: -2px;
    font-size: 13px;
    color: #ff8a00;
}
.mlr10 {
    margin-left: 10px;
    margin-right: 10px;
}

.section-title, .lite-divider {
    border-bottom: 1px solid #d4cfc8;
    padding-left: 15px;
}
.title, .section-title {
    display: block;
    font-size: 13px;
    color: #7e6b5a;
    padding-top: 15px;
    padding-bottom: 7px;
}
.custom-menu-link {
    padding-top: 15px;
    padding-left: 15px;
    color: #3b3937;
    background-position-y: 15px;
}
.menu-link {
    display: block;
    background: url(../../assets/images/icon_arrow.png) no-repeat;
    background-size: 7px 12px;
    background-position: right center;
    padding-right: 15px;
}
.fs14 {
    font-size: 14px;
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
.section-title, .lite-divider {
    border-bottom: 1px solid #d4cfc8;
    padding-left: 15px;
}
</style>
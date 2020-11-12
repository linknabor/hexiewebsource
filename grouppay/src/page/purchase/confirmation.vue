<template>
<div>
<div class="confirmation">
        <div class="addr">
            <div class="ov heig37 ">
                <span class="fl"><i class="iconfont icon-loc-s"></i>收货人：{{address.receiveName}}</span>
                <span class="fr">{{address.tel}}</span>
            </div>
            <div>
                <span class="cor99">收货地址   {{address.province}}{{address.city}}{{address.county}}{{address.xiaoquName}}{{address.detailAddress}}</span>
            </div>
        </div>

        <div class="cart-contents" v-for="(item,index) in cartlist" :key="index">   
            <!-- <div class="cart-title">
                水果铺
            </div> -->
            <div style="height:2.23rem;">
                <div class="ov">
                    <div class="fl ">
                        <div class="cart-imgs">
                            <img :src="item.productThumbPic" alt="">
                        </div>
                    </div>
                    <div class="ov cart-content ">
                        <span class="f14 marb4 namecolor">{{item.ruleName}}</span><br>
                        <span class="marb4 free color">满{{item.freeShippingNum}}件免运费</span><br>
                        <del class="marb4">¥{{item.oriPrice}}</del><br>
                        <span class="color1">¥{{item.price}}</span><span></span>
                        <div class="choose-num">
                                <span>×{{item.count}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
        <div class="mian ov fs14">
            <div class="p15"><span class="fl ">商品金额</span><span class="fr">¥{{totalAmount}}</span></div>
            <div class="p15"><span class="fl ">运费</span><span class="fr">¥{{totalShipFee}}</span></div>
            <div class="p15" @click="showCoupons">
                <span class="fl">优惠券</span> 
                <span class="fl baoyou_desc">{{couponNum}}张可用</span>
                <span class="fr">{{couponDesc}}</span>
            </div>
        </div>
        <div style="width:100%;height:70px"></div>
        <div class="foter fs14">
            <div class="fl foter-left">
                <span>合计：</span><span class="color fs18">¥ {{totalPrice}}</span>
            </div>
            <div class="fr foter-right"  @click="pay">
                <span>立即支付</span>
            </div>
        </div>
        <div class="box-bg" v-show="Mask"></div>
</div>
</div>
</template>

<script>
let vm;
import wx from 'weixin-js-sdk';
import cookie from 'js-cookie';
export default {
    data() {
        return {
            address:{},
            cartlist:[],
            totalShipFee:0,
            totalPrice:0, //合计
            totalAmount:0, 
            Mask:false,//遮罩
            orderId:'',
            itemList:JSON.parse(window.localStorage.getItem('itemList')),
            couponNum: 0,
            coupon: null,
            couponDesc: '不使用',
            coupons:[],//优惠券
            couponid:this.$route.query.couponid,
            salePlanId : '',

        };
    },
    created() {
        vm = this;
    },
    components: {

    },
    computed: {
        
    },
    mounted() {
        vm.getaddr();
        vm.ordercheck();
    },
    methods: {
        getaddr() {
            let url = 'repair/project/1';
            vm.receiveData.getData(vm, url, "res", function() {
            if (vm.res.success) {
                if (vm.res.result.address) {
                   vm.address = vm.res.result.address;
                }
            } else {
                alert(vm.res.message == null ? "请稍后重试！" : vm.res.message);
            }
            });
        },
        //获取商品
        ordercheck() {
            let url = '/order/check';
            let data = {
                rderType:'3',
                payType:'2',
                itemList:vm.itemList
            }
            vm.receiveData.postData(vm,url,data,'res',function(){
                if(vm.res.success) {
                    vm.cartlist = vm.res.result.orderItems;
                    vm.totalAmount = vm.res.result.totalAmount;
                    vm.totalShipFee = vm.res.result.shipFee;
                    vm.totalPrice=vm.res.result.price;
                    vm.queryCoupon();
                    vm.computeAmount();
                }else {
                    alert(vm.res.message);
                }
            });
        },
        // 优惠券
        queryCoupon() {
            var data = {
                salePlanType:'3',
                itemList: vm.itemList
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
            var ta;
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
                vm.couponid = vm.coupon.id;
            }
            // console.log(111,vm.coupon);
            if (vm.coupon != null) {
                // console.log(vm.coupon.usageCondition > vm.amounts,vm.coupon.usageCondition,vm.amounts);
                if(vm.coupon.usageCondition ==null || vm.coupon.usageCondition > vm.totalPrice) {
                    alert('当前优惠券不可用');
                    vm.coupon = null;
                }else {
                    vm.couponDesc = '-¥ '+vm.coupon.amount;
                }
            }
          
            if (vm.coupon == null) {
                ta = vm.totalPrice;
            }else if (vm.coupon.amount > 0) {
                ta = vm.totalPrice - vm.coupon.amount;
            }

            if(ta>0) {
                vm.totalPrice = ta.toFixed(2);
            } else {
                vm.totalPrice = "0.01";
            }
       },
        //优惠券
        showCoupons() {
         if(vm.coupons.length != 0 && vm.coupons != null) {    
            vm.$router.push({
                path: "/coupon",
                name:'coupon',
                query: {
                    type: '3',
                    couponid:vm.couponid,
                },
            })
        }
        },
        //支付
        pay() {
            let sectId = cookie.get('sectId');
            if(sectId == "" || sectId == 'null' || sectId == 0 || sectId == null) {
                alert('您暂未绑定房屋，请前往“我是业主”进行操作，感谢！')
                location.href=vm.basePageUrl+'wuye/index.html?'+vm.common.getoriApp()+'#/myhouse'
                return false;
            }
            vm.Mask = true;
            let url ="/createOrderFromCart";
            var data = {
                serviceAddressId:vm.address.id,
                payType:2,
                orderType:3,   //特卖3，团购4
                itemList:[]
            }
            if (vm.coupon != null) {
                data.couponId = vm.coupon.id;
            }  
            for(var i=0;i<vm.cartlist.length;i++) {
                data.itemList.push({
                    ruleId:vm.cartlist[i].ruleId,
                    count:vm.cartlist[i].count,
                    orderType:vm.cartlist[i].orderType,
                    productId:vm.cartlist[i].productId,
                })
            }
            vm.receiveData.postData(vm,url,data,'res',function(){
                if(vm.res.success) {
                    vm.orderId = vm.res.result.id;
                    vm.requestPay();
                }else {
                    alert(vm.res.message);
                    vm.Mask =false;
                }
            });
        },
        requestPay() {           
            let url='/requestPay/'+vm.orderId;
            vm.receiveData.postData(vm,url,{},'n',function(){
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
                            // 支付成功后的回调函数
                            alert("下单成功！");
                            vm.Mask =false;
                        },
                        fail:function(res) {
                            vm.Mask =false;
                            console.log(JSON.stringify(res))
                        },
                        cancel:function(res){
                            alert('支付取消');
                           vm.Mask =false;
                        }
                     });
                }else {
                    vm.Mask =false;
                    alert(vm.n.message==null?"下单失败，请稍后重试！":vm.n.message);
                }
            }) 
        }   
    }
};
</script>

<style scoped>
.confirmation {
    position:absolute;
    left:0;
    right: 0;
    top:0;
    bottom:0;
    /* background-color:#fff; */
    background-color:#F4F8F9;
    overflow: auto;
}
.addr {
    background-color: #fff;
    padding: 0.4rem 0.73rem 0 0.37rem;
    box-sizing: border-box;
    margin:0.2rem;
    border-radius: 0.2rem;
}
.addr div {
    padding-bottom: 0.2rem;
    padding-left: 0.35rem;
    position: relative;
}
.addr .heig37 {
    line-height: 0.37rem;
}
.addr i {
    font-size: 20px;
    vertical-align: bottom;
    color: #999999;
    position:absolute;
    left:0;
}
.addr .cor99 {
    color:#999999;
    display: inline-block;
    line-height: 0.4rem;
}
.cart-contents {
    background-color:#fff;
    /* border-bottom: 5px solid #E4E4E4; */

    border-radius: 0.2rem;
    margin:0.2rem;
}
.cart-title {
    height: 0.66rem;
    line-height: 0.66rem;
    border-bottom: 1px solid #BBBBBB;
    font-size: 0.36rem;
    padding-left: 0.38rem;
}
.cart-imgs {
    width: 1.6rem;
    height: 1.6rem;
    margin-top: 0.38rem;
    margin-right: 0.2rem;
    margin-left: 0.5rem;
}
.cart-content {
    padding-top:0.34rem;
    position:relative;
}
.cart-content:last-child {
    margin-bottom: 0;
}
.f14 {
    font-size:0.3rem;
}
.marb4 {
    margin-bottom: 4px;
    display: inline-block;
}   
.namecolor {
    color:#000;
}
.free {
    font-size: 12px;
    padding:3px 2px;
    border:1px solid #F08500;
    color:#F08500;
    border-radius: 5px;
} 
del {
    font-size: 12px;;
    color:#9D9E9D;
}
.color1 {
    color: #CE5F41;
}
.choose-num {
    position: absolute;
    right: 0.5rem;
    bottom: 0.5rem;
}
.mian {
    padding-left: 12px;
    padding-right:0.5rem;
    margin:0 0.2rem;
    border-radius: 0.2rem;
    background-color:#fff;
}
.mian div{
    width:100%;
    /* height: 40px; */
    /* line-height: 40px; */

}
/* 现金卷 */
.p15 {
    padding: 15px 0px;
    overflow: hidden;
}
.mian .baoyou_desc {
    padding:1px 5px;
    border: 1px solid #ff8a00;
    border-radius: 2px;
    margin-left: 10px;
    margin-top: -2px;
    font-size: 13px;
    color: #ff8a00;
}
/* 现金卷 */
.foter {
    position: fixed;
    bottom:0;
    width:100%;
    height: 50px;
    line-height: 50px;
    background-color:#fff;
}
.foter .color {
    color:#F08500;
    display: inline-block;
    font-size: 0.33rem;
}
.foter-left {
    width:60%;
    padding-left: 12px;
}
.foter-right {
    width:35%;
    height:50px;
    line-height: 50px;
    text-align: center;
    color:#fff;
    background-color:#F08500;
}
.box-bg {width: 100%;opacity: .5;height: 100%;position: fixed;
	    background-color: #666;top: 0;left: 0;z-index: 100;}
</style>

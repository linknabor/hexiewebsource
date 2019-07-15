<template>
   <div class="coupons">
       <div class="addconpons">
        <div class="title-line" v-if="summary.validCount>0">
            <div class="title_text">可用现金券</div>
            <div class="title_count">共{{summary.validCount}}个</div>
        </div>

        <div>
            <div class="coupon_item" v-for="(conpon,i) in summary.validCoupons" @click="showDetailCoupon(i)">
                <div class="outter_bg">
                    <div class="coupon_desc">
                        <div class="coupon_line_1">
                            <span class="coupon-name">{{conpon.title}}</span>
                            <span class="coupon-time">{{conpon.leftDayDes}}</span>
                        </div>
                        <div class="coupon-limit">使用期限{{conpon.useStartDateStr}}至{{conpon.useEndDateStr}}</div>
                    </div>
                    <div class="coupon_value">
                        <div class="coupon-amount">{{conpon.amount}}元</div>
                        <div class="coupon-dyq">现金券</div>
                    </div>
                </div>
                <!-- <div>&nbsp;</div> -->
            </div>
    </div>

         <div class="title-line"  v-if="summary.invalidCount>0">
            <div class="title_text">历史现金券</div>
            <div class="title_count">共{{summary.invalidCount}}个</div>
        </div>

    <div>
            <div class="coupon_item disabled" v-for="conpon in summary.invalidCoupons" >
                <div class="outter_bg">
                    <div class="coupon_desc">
                        <div class="coupon_line_1">
                            <span class="coupon-name">{{conpon.title}}</span>
                            <span class="coupon-time">{{conpon.leftDayDes}}</span>
                        </div>
                        <div class="coupon-limit">使用期限{{conpon.useStartDateStr}}至{{conpon.useEndDateStr}}</div>
                    </div>
                    <div class="coupon_value">
                        <div class="coupon-amount">{{conpon.amount}}元</div>
                        <div class="coupon-dyq">现金券</div>
                    </div>
                </div>
                <div>&nbsp;</div>
            </div>
    </div>

       <!-- 大优惠券  -->
    <div class="coupon-overlay" v-if="showdetail" @click="hideDetail">
	
     </div>

    <div class="coupon_detail" v-if="showdetail">
            <div class="coupon_detail_title">
                <div class="coupon_detail_name">{{coupon.title}}</div>
                <div class="coupon_detail_amount">￥{{coupon.amount}}<span style="margin-left: 15px;">现金券</span></div>
            </div>
            <div class="coupon_detail_timeout"><span class="coupon_detail_timeout_title">{{coupon.leftDayDes}}</span></div>
            <div class="coupon_detail_limit">使用期限<span style="margin-left:19px">{{coupon.useStartDateStr}}-{{coupon.useEndDateStr}}</span></div>
            <div class="coupon_detail_rule">
                使用规则
                <div class="coupon_detail_rule_detail" v-html="coupon.couponDesc"></div>
            </div>	
            <div class="coupon_detail_btn_area">
                <div class="coupon_detail_btn_1" @click="hideDetail">下次使用</div>
                <div class="coupon_detail_btn_2" @click="gotoSales">现在使用</div>
            </div>
    </div>

      <div class="btn_area" style="margin: 45px 0;">
        <span class="more_btn" @click="moreCoupon" v-if="moreInvalid">查看全部历史现金券</span>
     </div>
   </div>
</div>   
</template>

<script>
let vm;
export default {
   data () {
       return {
           summary:{validCount:0,
           validCoupons:[],//获取现金券
           invalidCoupons:[],
           invalidCount:0
           },
           coupon:{},//大优惠券
            invalidPage:0,
            moreInvalid:true,//查看历史
            showdetail:false,//显示大优惠券
       };
   },
   created() {
       vm=this;
   },
   mounted() {
       this.validCoupons();
   },

   components: {},

   methods: {
    //    获取优惠券信息
       validCoupons() {
        vm.receiveData.getData(vm,'/couponSummary','Data',function(){
            if(vm.Data.success) {
                 if(vm.Data.success) {
                      vm.summary=vm.Data.result;
                }else {
                      alert("获取现金券信息失败！");
                }
            }else {
                   alert("获取现金券信息失败！");  
            }
               
        });
       },
       
       hideDetail() {
            vm.showdetail=false;
       },
       //点击优惠券
       showDetailCoupon(i) {
           vm.coupon=vm.summary.validCoupons[i];
           vm.showdetail=true;
       },
       //现在使用
       gotoSales() {
           if(vm.coupon.suggestUrl!=null && vm.coupon.suggestUrl!="") {
               window.location=vm.coupon.suggestUrl;
           }else {
               //跳转集市
               location.href=vm.basePageUrl+'group/onsales.html?v=20160229?type=3';
           }
       },
       //查看历史
       moreCoupon() {
           vm.receiveData.getData(vm,'/invalidCoupons/'+vm.invalidPage,'data',function(){
               if(vm.data.success) {
                    if(vm.data.result && vm.data.result.length>0) {
                        vm.summary.invalidCoupons=vm.data.result;
                        vm.invalidPage++;                  
                    }else {
                        vm.moreInvalid=false;
                            alert("已显示全部现金券！");
                    }
               }else {
                   alert("获取现金券信息失败！");
               } 
			});
       }
   },

   computed: {},
}
</script>

<style  scoped>
.coupons {
    position:absolute;
    left: 0;
    right: 0;
    top:0;
    bottom:0;
    background-color:#fff;
}
.addconpons {
    background-color:#fff;
}
.title-line {
    margin: 15px;
    border-bottom: 1px solid #888888;
    height: 35px;
}
.title_text {
    float: left;
    font-size: 13px;
    color: #666666;
}
.title_count {
    float: right;
    font-size: 13px;
    color: #666666;
}
/* 优惠劵 */
.coupon_item {
    padding: 0px 15px 5px 15px;
}
.outter_bg {
    background: url(../assets/images/img/bg_courtesy_card.png) no-repeat;
    background-size: 100% 110px;
    height: 115px;
}
.coupon_desc {
    float: left;
    width: 74%;
    font-size: 20px;
    height: 100px;
}
.coupon_line_1 {
    width: 100%;
    padding: 20px 20px 0 20px;
}
.coupon-name {
    font-size: 20px;
    color: #ff8a00;
    display: block;
}
.coupon-time {
    border: 1px #b28850 solid;
    color: #b28850;
    border-radius: 20px;
    padding: 0px 10px;
    font-size: 12px;
}
.coupon-limit {
    position: absolute;
    font-size: 11px;
    color: #666666;
    padding: 10px 0 0px 20px;
    width: 60%;
}
.coupon_value {
    float: right;
    width: 26%;
    height: 100px;
    font-size: 20px;
}
.coupon-amount {
    color: white;
    text-align: center;
    padding: 20px 0 0 0;
    font-size: 24px;
}
.coupon-dyq {
    color: white;
    text-align: center;
    padding: 10px 0 0 0;
    font-size: 13px;
}
.coupon_detail_rule_detail {
    margin-top: 7px;
}
/* 大优惠券 */
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
.coupon_detail {
    position: fixed;
    top: 10%;
    left: 20px;
    right: 20px;
    z-index: 1002;
    background: white;
    border-radius: 5px;
}
.coupon_detail_title {
    border-radius: 5px 5px 0 0;
    background: #FF8A00;
    height: 140px;
}
.coupon_detail_name {
    color: white;
    font-size: 18px;
    text-align: center;
    width: 100%;
    padding-top: 30px;
}
.coupon_detail_amount {
    color: white;
    font-size: 22px;
    text-align: center;
    padding-top: 15px;
}
.coupon_detail_timeout {
    position: relative;
    z-index: 2000;
    top: -10px;
    text-align: center;
}
.coupon_detail_timeout_title {
    padding: 1px 15px;
    background: #ffc000;
    color: white;
    font-size: 14px;
    border-radius: 10px;
}
.coupon_detail_limit {
    padding: 20px;
    font-size: 14px;
    color: #3b3937;
    border-bottom: 1px solid #d4cfc8;
}
.coupon_detail_rule {
    padding: 20px;
    font-size: 13px;
    color: #666666;
}
.coupon_detail_btn_area {
    margin: 5px 20px 20px 20px;
    height: 44px;
}
.coupon_detail_btn_1 {
    font-size: 15px;
    color: #996c33;
    border: 1px solid #cfa972;
    height: 39px;
    line-height: 39px;
    width: 40%;
    text-align: center;
    border-radius: 3px;
    float: left;
}
.coupon_detail_btn_2 {
    font-size: 15px;
    color: #fff;
    border: 1px solid #cfa972;
    height: 39px;
    line-height: 39px;
    background: #ff8a00;
    width: 40%;
    text-align: center;
    border-radius: 3px;
    float: right;
}

.btn_area {
    text-align: center;
    width: 100%;
    height: 100px;
}
.more_btn {
    color: #996c33;
    border: #cfa972 solid 1px;
    padding: 8px 30px;
    font-size: 14px;
    margin-top: 25px;
    margin-bottom: 25px;
    border-radius: 6px;
}
</style>
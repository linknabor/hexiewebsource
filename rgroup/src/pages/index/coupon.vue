<template>
   <div>
        <!-- load -->
		<div class="load6" id="LoadingBar" v-show="load">
			<div class="bounce1"></div>
			<div class="bounce2"></div>
			<div class="bounce3"></div>
		</div>

		<div id="fade" class="black_overlay" v-show="load"></div>
	    <!-- load -->
        <div class="outter_container">
            <div class="top_area">
				<div class="header_line">
					<span class="header_line_title">我来发福利啦</span>
				</div>
				<div class="header_icon_line">
					<div class="avatar bolda center-bg"  >
                        <img class="bolda center-bg"  :src="seed.userImgUrl" alt="">
                    </div>
				</div>
			</div>
            <div class="chai_area" v-show="covered" @click="fetchCoupon">
				<div class="chai_layout">
						<img  class="chai_header_img" src="../../assets/images/img/coupon_chai.png" />
						<img  class="chai_bottom_img" src="../../assets/images/img/coupon_pin.png" />
				</div>
			</div>
            <!-- v-show="!covered" -->
            <div class="content_area" v-show="!covered">
                <div class="product_pic" 
                 style="width: 100%;border-radius: 10px;">
                 <img style="width: 100%;border-radius: 10px;" :src="seed.seedImg" alt="">
                 </div>
				<div class="coupon_item " :class="{'received':fetched}">
					<div class="outter_bg">
						<div class="coupon_desc">
							<div class="coupon_line_1">
								<span class="coupon-name">{{coupon.title}}</span>
								<span class="coupon-time" v-show="!coupon.empty">{{coupon.leftDayDes}}</span>
						    </div>
						    <div class="coupon-limit" v-show="coupon.empty">使用期限（7天）</div>
							<div class="coupon-limit" v-show="!coupon.empty">使用期限{{coupon.useStartDateStr}}至{{coupon.useEndDateStr}}</div>
						</div>
						<div class="coupon_value">
							<div class="coupon-msg" v-show="coupon.empty">{{couponMsg}}</div>
							<div class="coupon-amount" v-show="!coupon.empty">{{coupon.amount}}元</div>
							<div class="coupon-dyq">现金券</div>
						</div>
					</div>
				</div>
                <div class="coupon_detail_btn_area">
					<span class="coupon_detail_btn_2" @click="gotoSales">立即使用</span>
				</div>
				&nbsp;
				<div class="psq">拼手气</div>
                <div class="inviter" v-for="item in coupons" >
					<div class="avatar" 
                     style="float:left;margin: 6px 6px;">
                     <img class="avatar" :src="item.userHeadImg" alt="">

                    </div>
					<div class="inviter_desc">
						<div class="inviter_txt">{{item.userName}}</div>
						<div class="inviter_txt">{{item.createDateStr}}</div>
					</div>
					
					<div class="inviter_amount">￥{{item.amount}}</div>
					&nbsp;
				</div>
                <div class="rule_area">
					<div class="rule_title">使用规则</div>
					<div class="rule_desc" ms-html="seed.description">
					</div>
				</div>
                <div>
                <img src="../../assets/images/img/hexie_ewm.png" style="width:100%"/>
				</div>
				<div style="text-align: center;margin-top: 30px;"><span class="bottom_title">微信公众号:e-shequ</span></div>
            </div>
            &nbsp;
        </div>  
          
   </div>
</template>

<script>
import img1 from '../../assets/images/img/logo.jpg'
import img2 from '../../assets/images/img/banner_market_shuiguo.jpg'
import wx from 'weixin-js-sdk';
let vm;
export default {
   data () {
       return {
            load:true,
            seedStr:this.$route.query.o,
            seed:{},
            coupon:{
                //  id:1,
                //    title:'滴滴滴',
                //    leftDayDes:'11',
                //    useStartDateStr:'22',
                //    useEndDateStr:'33',
                //    amount:100
            },
            coupons:[],
            fetched:false,
            couponMsg:"",
            covered:true,
            avatar:img1,
            seedImg:img2,
           
       };
   },
   created() {
       vm=this;
   },
   mounted() {
    //    vm.initSession4Test();
       vm.fetchSeed();

       let url = location.href.split('#')[0];
        vm.receiveData.wxconfig(vm,wx,['onMenuShareTimeline','onMenuShareAppMessage'],url);
   },

   methods: {
        //模仿线上用户信息
            // 105/747/384
     initSession4Test(){
                let url ='/initSession4Test/105';
                    vm.receiveData.getData(vm,url,'Data',function(){
                });
        },
     fetchSeed() {  
        vm.common.invokeApi("GET", "couponSeed/"+vm.seedStr, null, null,  function(n) {
        	if(n.result!=null) {
        		vm.seed = n.result.seed;
                vm.coupons = n.result.coupons;
                vm.load=false;
        		if(vm.seed.canUse) {
        			if(n.result.coupon != null){
	            		vm.coupon = n.result.coupon;
	            		vm.fetched = true;
	            		vm.covered = false;
        			} else {
	            		vm.fetched = false;
	            		vm.covered = true;
        			}
        		} else {
        			var c = {};
        			c.title = n.result.seed.title;
        			c.empty = true;
        			c.amount = '';
        			vm.couponMsg = "已抢完";
            		vm.coupon = c;
            		vm.fetched = true;
	            	vm.covered = false;
        		}
        		if(vm.seed.userImgUrl == null){
        			vm.seed.userImgUrl = vm.avatar;
        		}
        		if(vm.seed.seedImg == null || vm.seed.seedImg =='') {
        			vm.seed.seedImg = vm.seedImg;
        		}
        	} else {
            	alert("该现金券不存在或已领完！");
            	// location.href=vm.config.group_onsales.url;
        	}
        }, function(){
            vm.load=false;
        	alert("获取现金券信息失败！");
            // location.href=vm.config.group_onsales.url;
        });
     },
     //红包
     fetchCoupon() {
        if(!this.common.checkRegisterStatus()) {
            return;
        }
        this.common.invokeApi("GET", "coupon/draw/"+vm.seedStr, null, null,  function(n) {
	    		if(n.result != null) {
	        		vm.coupon = n.result;
	    		} else {
	    			var c = {};
	    			c.title = vm.seed.title;
	    			c.empty = true;
	    			c.amount = '';
	    			vm.couponMsg = "已抢完";
	        		vm.coupon = c;
	        		vm.fetched = true;
	    		}
	            vm.covered = false;
	        }, function(){
	        	alert("领取现金券失败，请稍后重试！");
	            vm.covered = false;
	        });
            
     },
     //立即使用
     gotoSales() {
        if(vm.coupon.suggestUrl!=null&&vm.coupon.suggestUrl!="") {
                        location.href=vm.coupon.suggestUrl;
                    } else {
                        location.href=vm.config.group_onsales.url;
                    }
     }
   },
   components: {},

   

   computed: {},
}
</script>

<style  scoped>
 /* load */
.load6 {
    margin: 100px auto 0;
    width: 150px;
    top: 25%;
    left: 25%;
    width: 50%;
    text-align: center;
    position: fixed;
    z-index: 1002;
    /* overflow: auto; */
}

.load6>div {
    width: 30px;
    height: 30px;
    background-color: #FF8A00;
    border-radius: 100%;
    display: inline-block;
    -webkit-animation: bouncedelay 1.4s infinite ease-in-out;
    animation: bouncedelay 1.4s infinite ease-in-out;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
}
.load6 .bounce1 {
    -webkit-animation-delay: -0.32s;
    animation-delay: -0.32s;
}
.load6 .bounce2 {
    -webkit-animation-delay: -0.16s;
    animation-delay: -0.16s;
}
@-webkit-keyframes bouncedelay{
    0%,80%,100%{-webkit-transform:scale(0.0)}
    40%{-webkit-transform:scale(1.0)}}
@keyframes bouncedelay{
    0%,80%,100%{transform:scale(0.0);-webkit-transform:scale(0.0)}
    40%{transform:scale(1.0);-webkit-transform:scale(1.0)}}

.black_overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #f5f5f5;
    z-index: 1001;
    -moz-opacity: .8;
    opacity: .80;
    filter: alpha(opacity=80);
} 
.outter_container {
    background: -webkit-gradient(linear, 0 0, 0 100%, from(#d7363a), to(#fb5737));
    padding: 0px;
    height: 100%;
}
.top_area {
    background: url('../../assets/images/img/bg_share_courtesy.png') no-repeat;
    background-size: 100% 110px;
    text-align: center;
}
.header_line {
    padding-top: 20px;
}
.header_line_title{
    background: url("../../assets/images/img/bg_user.png") no-repeat;
    background-size: 100% 100%;
    padding: 12px 30px 18px 30px;
    color:#c3272b;
    font-style: bold;
    font-size:18px bold;
}
.header_icon_line {
    width: 100%;
    height: 100px;
    margin-top: 20px;
    text-align: center;
}
.avatar.bolda {
    height: 70px;
    width: 70px;
    border: 3px #fff661 solid;
}

.avatar {
    height: 50px;
    width: 50px;
    border-radius: 50%;
    border: 1px #ffffff solid;
    background-size: 100%;
}
.center-bg {
    margin: 0 auto;
    background-size: cover;
    background-position: center;
}
.chai_area {
    text-align: center;
}
.chai_layout {
    background: #e13737;
    margin: 10px 30px 0 30px;
    border-radius: 10px;
    -webkit-box-shadow: -3px 3px 3px;
    -moz-box-shadow: -3px 3px 3px;
    box-shadow: -3px 3px 3px;
}
.chai_header_img {
    width: 100%;
}
.chai_bottom_img {
    width: 100%;
    margin-top: 40px;
}
.content_area {
    margin: 10px 25px 0px 25px;
}
.coupon_item {
    margin-top: 10px;
}
.outter_bg {
    background: url('../../assets/images/img/bg_courtesy_card.png') no-repeat;
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
    white-space: nowrap;
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
.coupon-msg {
    color: white;
    text-align: center;
    padding: 20px 0 0 0;
    font-size: 18px;
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
.received coupon-limit{
	color:#999999;
}
.received .coupon-name{
	color:#aaaaaa;
}
.received .outter_bg{
    background:url("../../assets/images/img/bg_courtesy_card_gray.png") no-repeat;
    background-size: 100% 110px;
}
.coupon_detail_btn_area{
    clear:both;
    height:44px;
    text-align: center;
}
.coupon_detail_btn_2 {
    font-size: 15px;
    color: #fff;
    border: 1px solid #cfa972;
    padding: 6px 20px;
    background: #ff8a00;
    border-radius: 3px;
    display: inline-block;
    margin-top: 10px;
}
.psq {
    color: #ffff00;
    font-size: 17px;
    width: 100%;
    text-align: center;
    padding-top: 15px;
    font-weight: bold;
    background: url(../../assets/images/img/bg_line.png) no-repeat;
    background-size: 28px;
    background-position: center 54px;
    padding-bottom: 12px;
    border-bottom: 1px solid #ffff00;
}
	
.inviter{
    width: 100%;
    margin: 15px 0 0 0;
    height:64px;
}
.inviter_desc{
    margin: 6px 0 0 0;
    float:left;
    height:50px
}
.inviter_txt{
    font-size:13px;
    color:white;
    margin-left: 10px;
    height:25px;
    line-height: 25px;
}
.inviter_amount{
    margin: 6px;
    float:right;
    color:#ffff00;
    font-size:21px;
    height:50px;
    line-height: 50px;
}
.rule_area {
    border: 1px solid white;
    margin: 30px 0;
    border-radius: 4px;
    padding: 15px;
    color: white;
}
.rule_title {
    text-align: center;
    padding: 5px 0 15px 0;
    border-bottom: 1px solid white;
}
.rule_desc {
    padding: 15px 0 5px 0;
}
.bottom_title {
    border-radius: 15px;
    border: 1px solid #FFFF00;
    padding: 4px 15px;
    color: #ffff00;
    font-size: 12px;
}
</style>
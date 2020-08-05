<template>
   <div class="controller">
        <!-- 轮播图 -->
        <div>
            <swiper v-if="product.pictureList.length>0" :options="swiperOption" ref="mySwiper">
                <swiper-slide  v-for="(picture,index) in  product.pictureList" :key="index">
                    <div class="ban1" >
                            <img :src="picture" alt="">
                    </div> 
                </swiper-slide>
                <div class="swiper-pagination" slot="pagination"></div>       
            </swiper>
        </div> 
        <div class="product-info p15">
                <div class="product-detail-name fs16">{{rule.name}}</div>
                <div style="width: 100%;height:30px;">
                    <div class="highlight fs22 fl three_div">¥&nbsp;{{rule.price}}&nbsp;</div>
                <!-- </div> -->
                    <div class="ori-posi"> 
                        <div class=" highlight fl fs20 three_div">{{rule.discount}}&nbsp;</div>
                        <div class=" fs20 ori-price2 fl  three_div">库存<span class="highlight" >{{product.canSaleNum}}</span>份</div>
                    </div>
                </div>
                <div style="width: 100%;height:20px">
                    <div class="ori-price2 fl three_div ori-padd">市场价<del>¥&nbsp;{{product.oriPrice}}</del></div>
                </div>
                <div style="width:100%;height:1px">&nbsp;</div>
	    </div>
        <!-- //剩余时间 -->
        <!--只有活动的分类才显示倒计时-->
        <div  v-if="rule.productType==6">
            <div class="mt2 time-wrap bb3" v-if="!finished">
                    <span class="time-text">剩余</span>
                    <span v-if="left.days!='00'"><span class="time-number">{{left.days}}</span>天</span>
                    <span class="time-number">{{left.hours}}</span><span>时</span>
                    <span class="time-number">{{left.minitus}}</span><span >分</span>
                    <span ><span class="time-number" >{{left.seconds}}</span>秒</span>
                    <span class="time-text">结束</span>
            </div>
            <div class="mt2 time-wrap bb3  fs18" v-if="finished">
                已结束
            </div>
        </div>
        <div class="p15 mb15">
            <div class="section-title" style="padding-left:0px;padding-top:0px;"  @click="toggleDetail">
                商品详情
                <i class="icon more-icon align-right fr" :class="{topIcon:showDetail}"></i>
            </div>
            <ul class="" style="padding-top: 3px;">
                <li class="detail-item" v-html="serviceDesc1"></li>
            </ul>
            <ul class=""  v-if="showDetail" style="padding-top: 3px">
                <li class="detail-item" v-html="serviceDescMore1"></li>
            </ul>
	    </div> 

        <div class="activityTitleLine" style="margin-bottom: 85px;display: block;" >
             <span class="more_btn" @click="goclassify()">点击查看更多商品</span>
        </div>

        <div class="btn-home-fixed" style="color: white; position: fixed;z-index:10000;width: 100%;bottom: 0px;">
            <span  class="fl" 
                style="height:40px;line-height:40px;width:36%;background-color:#444;text-align:center;font-size:15px;" @click="goclassify()">
                更多优惠
            </span>
            <span  class="fl" 
                style="height:40px;line-height:40px;width:64%;background-color:#ff8a00;text-align: center;font-size:15px;"  @click="buy" ms-class-useless="rule.leftSeconds < 0">
                立即购买
            </span>
    	</div>

   </div>
</template>

<script>
let vm;
import wx from 'weixin-js-sdk';
import {swiper,swiperSlide} from 'vue-awesome-swiper';
let Base64 = require('js-base64').Base64;
export default {
   data () {
       return {
           finished:false,
           showDetail: false,
            left:{ //剩余时间
                days:"0",
                hours:"0",
                minitus:"0",
                seconds:"0"
             },
           product: {
                pictureList:[],
            },
            rule:{
                currentNum:0,
            },
            serviceDesc1:'',
            serviceDescMore1:'',
            ruleId:this.$route.query.ruleId,//参数
            swiperOption:{//轮播图
                notNextTick:true,
                autoplay: {
                    disableOnInteraction:false,
                    delay:6000
                },
                loop: true,
                pagination: {
                el: '.swiper-pagination'
                },
            },
       };
   },
   created(){
       vm=this;
        vm.query();
   },
   mounted() {
        // this.common.checkRegisterStatus()
        let url = location.href.split('#')[0];
        vm.receiveData.wxconfig(vm,wx,['onMenuShareTimeline','onMenuShareAppMessage'],url);
   },
   updated(){
       
   },

   methods: {
        query() {
            let url ="getOnSaleRule/"+vm.ruleId;
                vm.receiveData.getData(vm,url,'Data',function(){
                    if(vm.Data.success) {
                         if(vm.Data.result) {
                            vm.rule=vm.Data.result;                          
                            vm.productss(vm.rule.productId)
                           setInterval(vm.updateLeftTime,1000);//倒计时 
                         }
                    }else {    
                        alert(vm.Data.message==null?"获取产品信息失败！":vm.Data.message);
                    }
            });
        },
         productss(productId) {
            let url ="getProduct/"+productId;
                vm.receiveData.getData(vm,url,'res',function(){
                    if(vm.res.success) {
                            vm.product = vm.res.result;  
                            vm.serviceDesc1 = Base64.decode(vm.product.serviceDesc);
                            vm.serviceDescMore1 = Base64.decode(vm.product.serviceDescMore)
                            vm.common.initShareConfig(vm.rule.name,vm.basePageUrl+"group/onsales.html?"+vm.common.getoriApp()+"#/onsaledetail?ruleId="+vm.ruleId,vm.product.smallPicture,"快来参加"+vm.common.newname+"的优惠商品抢购吧",wx);   
                    }else {
                        alert(vm.res.message==null ?"获取产品信息失败！":vm.res.message);
                    }
            });
        },
        //剩余时间
        updateLeftTime() {
            if(vm.rule.leftSeconds > 0){
                vm.finished = false;
                vm.rule.leftSeconds=vm.rule.leftSeconds-1;
                var iRemain = vm.rule.leftSeconds;
                var days=parseInt(iRemain/86400);
                vm.left.days = days<10?"0"+days:days;
                iRemain%=86400;

                var hours=parseInt(iRemain/3600);
                vm.left.hours = hours<10?"0"+hours:hours;
                iRemain%=3600;

                var minitus = parseInt(iRemain/60);
                vm.left.minitus = minitus<10?"0"+minitus:minitus;
                iRemain%=60;

                vm.left.seconds=iRemain<10?"0"+iRemain:iRemain;
            }else{
                vm.finished = true;
            }
        },
        toggleDetail() {
            vm.showDetail = !vm.showDetail;
        },
        //更多商品
        goclassify() {
            vm.$router.push({path:'/cardrollindex',query:{'flush':1}})
        },
        //立即购买
        buy() {
             if(vm.ruleId) {
                location.href=vm.basePageUrlpay+'hxgrouppay.html?'+vm.common.getoriApp()+'#/cardrollbuy?type=12&ruleId='+vm.ruleId;
             }   
        }
   },
    components: {
        swiper,
        swiperSlide
   },
   computed: {},
}
</script>
<style>
.controller .swiper-pagination-bullet-active {
    opacity: 1;
    background: #fff;
}
</style>

<style  scoped>
.controller {
     background-color: #fffff8;
    padding-bottom: 1px;
}

      
.ban1{width: 100%;}
.ban1 img{width: 100%; }
.ban2{ height: 121px;position: relative; margin-right:20px}
.ban2 img{height: 100%; }
.product-info {
    clear: both;
    background-color: #E2E2E2;
}
.p15 {
    padding: 15px;
}
.fs16 {
    font-size: 16px;
}
.product-detail-name {
    font-size: 0.33rem;
    height: 30px;
    color: #000000;
    line-height: 30px;
    text-overflow: ellipsis;
    overflow: hidden;
}
.three_div {
    width: 33%;
    float: left;
}
.highlight {
    color: #ff8a00;
}

.fs14 {
    font-size: 14px;
}
.ori-price2 {
    font-size: 0.25rem;
    color: #999999;
}
.fs22 {
    font-size: 0.35rem;
}
.fs20 {
    font-size: 0.28rem;
}
.ori-posi {
    position: relative;
    top: 0.2rem;
}
/* 剩余时间 */
.time-wrap {
    text-align: center;
    /* widht: 100%; */
    height: 48px;
    /* inline-height: 48px; */
}
.bb3 {
    border-bottom: 5px solid #f7f7f1;
}
.mt2 {
    margin-top: .5rem;
}
.time-text {
    font-size: 18px;
    color: #996c33;
    margin-left: 5px;
    margin-right: 5px;
}
.time-number {
    font-size: 20px;
    padding: 4px 6px;
    color: white;
    background: url(../../assets/images/index/img_time.png) no-repeat;
    background-size: 100% 100%;
}
.fs18 {
    font-size:18px;
}
/* 剩余时间 */
.rgroup-info {
    /* widht: 100%; */
    height: 70px;
}
.plr10 {
    padding: 0 10px;
}
.collocation_desc {
    padding: 2px 15px;
    border: 1px solid #ff8a00;
    border-radius: 2px;
    margin-left: 10px;
    color: #ff8a00;
}
.menu-link {
    display: block;
    background: url(../../assets/images/index/icon_arrow.png) no-repeat;
    background-size: 7px 12px;
    background-position: right center;
    padding-right: 15px;
}
/* 商品详情 */
 .section-title {
    display: block;
    font-size: 13px;
    color: #7e6b5a;
    padding-bottom: 7px;
    border-bottom: 1px solid #d4cfc8;
}
.more-icon {
    background-image: url(../../assets/images/index/icon_more.png);
    background-size: 18px 3px;
    background-position-y: 8px;
}
.icon {
    display: inline-block;
    width: 25px;
    height: 25px;
    background-repeat: no-repeat;
}
.topIcon {
    background-image: url(../../assets/images/index/icon_top.png);
    background-size: 12px 7px;
}
.detail-item {
    width: 100%;
    margin-top: 12px;
    font-size: 12px;
    color: #323937;
}
.activityTitleLine {
    text-align: center;
    font-size: 16px;
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
.title {
    opacity: 0.7;
    bottom: 0px;
    width: 29%;
    font-size: 14px;
    padding-top: 5px;
    margin-bottom: 0px;
    text-align: center;
    background-color: #ff8a00;
    color: white;
    padding-bottom: 7px;
    position: absolute;
    width: 100%;
}
</style>
<template>
   <div class="controller">
       
        <!-- 轮播图 -->
        <div>
            <swiper v-if="product.pictureList.length>0" :options="swiperOption" ref="mySwiper">
                <swiper-slide  v-for="(picture,index) in  product.pictureList" :key="index">
                    <div class="ban1" >
                            <img :src="picture" alt="">
                            <!-- <img src="../../assets/images/index/bg_index.png" alt=""> -->
                    </div> 
                </swiper-slide>
                <div class="swiper-pagination" slot="pagination"></div>       
            </swiper>
        </div> 
        <div class="product-info p15">
                <div class="product-detail-name fs16">{{rule.name}}</div>
                <div style="width: 100%;height:30px;">
                    <div class="highlight fs22 fl three_div">¥&nbsp;{{rule.price}}&nbsp;</div>
                    <div class="highlight fl fs14 three_div" style="padding-top:8px">{{rule.discount}}&nbsp;</div>
                    <div class="ori-price2 three_div"  style="padding-top:8px">运费&nbsp;&nbsp;<span class="highlight">¥{{rule.postageFee}}</span></div>
                </div>
                <div style="width: 100%;height:20px">
                    <div class="ori-price2 fl three_div">市场价<del>¥&nbsp;{{product.oriPrice}}</del></div>
                    <div class="ori-price2 fl three_div">库存<span class="highlight" >{{product.canSaleNum}}</span>份</div>
                    <div class="ori-price2 three_div" v-if="rule.freeShippingNum<999"><span class="highlight">{{rule.freeShippingNum}}</span>件包邮</div>
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

        <!-- 优惠搭配 -->
        <div class="p15 bb3 fs18 coll" v-show="collocation.id!=undefined||collocation.id!=null" >
            <div class="section-title" style="padding-left:0px;padding-top:0px;" @click="gotoCollocation()">
            优惠搭配<span class="collocation_desc">{{collocation.title}}</span>
            <i class="icon menu-link align-right fr" style="margin-top: -3px;"></i>
            <span class="fr">点击这里</span>
            </div>    

            <div >
                <swiper  :options="swiperOption1" ref="mySwiper" v-if="collproducts.length>0" >
                <swiper-slide  v-for="(picture,index) in  collproducts" :key="index">
                    <div class="ban2" @click="gotoDetail(picture.salePlanId)">
                            <img :src="picture.productPic" alt="">
                            <!-- <img src="../../assets/images/index/bg_index.png" alt=""> -->
                            <div class="title" >￥{{picture.price}}元</div>
                    </div> 
                </swiper-slide>
                <!-- <div class="swiper-pagination" slot="pagination"></div>        -->
            </swiper>
            </div>
        </div>


        <div class="p15 mb15">
            <div class="section-title" style="padding-left:0px;padding-top:0px;"  @click="toggleDetail">
                商品详情
                <i class="icon more-icon align-right fr" :class="{topIcon:showDetail}"></i>
            </div>
            <ul class="" style="padding-top: 3px;">
                <li class="detail-item" v-html="product.serviceDesc"></li>
            </ul>
            <ul class=""  v-if="showDetail" style="padding-top: 3px">
                <li class="detail-item" v-html="product.serviceDescMore"></li>
            </ul>
	    </div> 

        <div class="activityTitleLine" style="margin-bottom: 85px;display: block;" >
             <span class="more_btn" @click="goclassify()">点击查看更多商品</span>
        </div>

        <div class="btn-home-fixed" style="color: white; position: fixed;z-index:10000;width: 100%;bottom: 0px;">
            <span  class="fl" 
                style="height:40px;line-height:40px;width:36%;background-color:#444;text-align:center;font-size:15px;" @click="goclassify()">
                更多商品
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
            collocation:{},
            collproducts:[],
           ruleId:this.$route.query.ruleId,//参数
            swiperOption:{//轮播图
                notNextTick:true,
                // autoplay:false,
                autoplay: {
                    disableOnInteraction:false,
                    delay:6000
                },
                loop: true,
                pagination: {
                el: '.swiper-pagination'
                },
            },
            swiperOption1:{//轮播图
                slidesPerView:3,
                // spaceBetween:30,
                notNextTick:true,
                // autoplay:false,
                loop: true,
                // loopFillGroupWithBlank: true,
                autoplay: {
                    disableOnInteraction:false,
                    delay:8000
                },
                pagination: {
                el: '.swiper-pagination'
                },
                
            },

       };
   },
   created(){
       vm=this;
        vm.query();
         vm.collocations();
   },
   mounted() {
        this.common.checkRegisterStatus()
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
                        alert(vm.Data.message==null?"获取团购信息失败！":vm.Data.message);
                    }
            });
        },
         productss(productId) {
            let url ="getProduct/"+productId;
                vm.receiveData.getData(vm,url,'res',function(){
                    if(vm.res.success) {
                            vm.product = vm.res.result;  
                            vm.common.initShareConfig(vm.rule.name,vm.basePageUrl+"group/onsales.html?trpe=3#/onsaledetail?ruleId="+vm.ruleId,vm.product.smallPicture,"快来参加合协社区的优惠商品抢购吧",wx);   
                    }else {
                        alert(vm.res.message==null ?"获取产品信息失败！":vm.res.message);
                    }
            });
        },
        collocations() {
            let url ="collocation/3/" + vm.ruleId;
             vm.receiveData.getData(vm,url,'res',function(){
                    if(vm.res.success && vm.res.result!=null) {
                        vm.collocation=vm.res.result;
                        vm.collproducts=vm.res.result.products;
                    }
             })
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
        // 优惠搭配
        gotoCollocation() {
            vm.$router.push({path:'/collocation',query:{'collId':vm.collocation.id,'ruleId':vm.ruleId}})
        },
        //点击轮播
        gotoDetail(ruleId) {
             vm.$router.push({path:'/onsaledetail',query:{'ruleId':ruleId}})
             location.reload()
        },
        //更多商品
        goclassify() {
            // vm.$router.push({path:'/',query:{'type':vm.rule.productType}})
            window.location.href=vm.basePageUrl+'group/onsales.html?state=123';
        },
        //立即购买
        buy() {
             if(vm.rule.id) {
                //  vm.$router.push({path:'/buy',query:{type:'3',ruleId:vm.rule.id}})
                location.href=vm.basePageUrlpay+'grouppay.html#/buy?type=3&ruleId='+vm.rule.id
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
    font-size: 16px;
    height: 40px;
    color: #000000;
    line-height: 20px;
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
.fs22 {
    font-size: 22px;
}
.fs14 {
    font-size: 14px;
}
.ori-price2 {
    font-size: 14px;
    color: #999999;
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
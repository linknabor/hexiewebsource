<template>
<div>
   <div class="controller">
        <!-- 轮播图 -->
        <div>
            <div class="ban1" >
                    <img :src="product.pictures" alt="">
            </div> 
        </div> 
        <div class="product-info p15">
                <div class="product-detail-name fs16">{{rule.name}}</div>
                <div style="width: 100%;height:30px;line-height: 30px;">
                    <div class="highlight fs22 fl three_div1">¥&nbsp;{{rule.price}}&nbsp;</div>
                <!-- </div> -->
                    <div class="ori-posi"> 
                        <div class=" fs20 ori-price2 fl  three_div2">市场价<del>¥&nbsp;{{product.oriPrice}}</del></div>
                        <div class=" highlight fs22 fl three_div3">{{rule.discount}}&nbsp;</div>
                    </div>
                </div>
                <div style="width:100%;height:1px">&nbsp;</div>
	    </div>
        <div class="p15 mb15">
            <ul class="" style="padding-top: 3px;">
                <li class="detail-item" v-html="serviceDesc1"></li>
            </ul>
            <ul class=""  style="padding-top: 3px">
                <li class="detail-item" v-html="serviceDescMore1"></li>
            </ul>
	    </div> 
        <div style="height:80px;"></div>
   </div>
    <div class="btn-fixed">
        <div class="fl btn-lt">
            <span class="price fl">¥{{rule.price}}</span>
            <div class="fl btn-txt">
                <span class="highlight tehui">限时特惠</span>
                <br>
                <span class="dels shic">市场价: <del>¥&nbsp;{{product.oriPrice}}</del></span>
            </div>
        </div>  
            <div class="fr btn-rg" >
            <span  
                @click="buy" ms-class-useless="rule.leftSeconds < 0">
                立即购买
            </span>
        </div>          
    </div>
    <!-- <agreement></agreement> -->
</div>   
</template>

<script>
let vm;
import wx from 'weixin-js-sdk';
import {swiper,swiperSlide} from 'vue-awesome-swiper';
let Base64 = require('js-base64').Base64;
import agreement from './agreement'
export default {
   data () {
       return {
           product: {
                pictureList:[],
            },
            rule:{
                currentNum:0,
            },
            serviceDesc1:'',
            serviceDescMore1:'',
            ruleId:this.$route.query.ruleId,//参数
            productType:this.$route.query.productType,
            shareCode:this.$route.query.shareCode,
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
         vm.initShareSetting();
   },
   updated(){
       
   },
   methods: {
        initShareSetting(){
            var title = "招募社区合伙人";
            var link=location.href;
            var img='http://img.e-shequ.cn/FgHbz_5ettUPTBr3ts3zSXHb3tBu';
            var desc="加入社区合伙人，挑战副业月入过万";
            vm.common.initShareConfig(title,link,img,desc,wx);
        },
        query() {
            let url ="getOnSaleRule/"+vm.ruleId;
                vm.receiveData.getData(vm,url,'Data',function(){
                    if(vm.Data.success) {
                         if(vm.Data.result) {
                            vm.rule=vm.Data.result;                          
                            vm.productss(vm.rule.productId)
                         }
                    }else {
                        if(vm.Data.errorCode != '40001') {
                            alert(vm.Data.message)
                        }
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
        //更多商品
        goclassify() {
            vm.$router.push({path:'/cardrollindex',query:{'flush':1}})
        },
        //立即购买
        buy() {
             if(vm.ruleId) {
                location.href=vm.basePageUrlpay+'hxgrouppay.html?'+vm.common.getoriApp()+'#/salespage?ruleId='+vm.ruleId+'&productType='+vm.productType+'&shareCode='+vm.shareCode;
             }   
        }
   },
    components: {
        swiper,
        swiperSlide,
        agreement
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
    margin-bottom: 0.2rem;
}
.three_div1 {
    margin-right: 0.4rem;
}
.three_div2 {
    margin-right: 1rem;
}
.three_div3 {
    width: 30%;
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
.detail-item {
    width: 100%;
    margin-top: 12px;
    font-size: 12px;
    color: #323937;
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

.btn-fixed {
    color: white;
    position: fixed;
    z-index:10000;
    width: 100%;
    height:70px;
    bottom: 0px;
    border-top:1px solid #BBBBBB;
    box-shadow: 1px 2px 12px #EEEEEE;
}
.btn-lt {
    width: 70%;
    box-sizing: border-box;
    padding-left: 15px;
    background-color:#fff;
}
.btn-lt .price {
    width:30%;
    display: inline-block;
    line-height:70px;
    font-size: 24px;
    display: inline-block;
    color:#F08500;
    margin-right: 20px;
}
.btn-txt {
    width:60%;
    height:70px;
    font-size: 14px;
    text-align:center;
}
.btn-lt .dels {
    color:#C8C4C4;
}
.tehui {
     color: #fff;
    display: inline-block;
    margin-top:0.14rem;
    padding: 3px 0;
    width: 2rem;
    background-color: #ff8a00;
    padding: 3px 0;
}
.shic {
    display: inline-block;
    margin-top:0.1rem;
}

.btn-rg {
    width: 30%;
    line-height:70px;
    background-color:#ff8a00;
    text-align: center;
    font-size:16px;
    color:#fff;
}

</style>
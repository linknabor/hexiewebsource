<template>
   <div class="controller">
        <!-- 轮播图 -->
        <div>
        <div>
            <swiper  :options="swiperOption" ref="mySwiper">
                <swiper-slide  v-for="(picture,index) in  productadd.pictureList" :key="index">
                    <div class="ban1" >
                            <img :src="picture" alt="">
                    </div> 
                </swiper-slide>
                <div class="swiper-pagination" slot="pagination"></div>       
            </swiper>
        </div> 
        <div class="product-info p15">
                <div class="product-detail-name fs16">{{product.name}}</div>
                <div style="width: 100%;height:30px;line-height: 30px;">
                    <div class="highlight fs22 fl three_div">¥&nbsp;{{product.price}}&nbsp;</div>
                <!-- </div> -->
                    <div class="ori-posi"> 
                        <div class=" highlight fl fs20 three_div">{{product.discount}}&nbsp;</div>
                        <div class=" fs20 ori-price2 fl  three_div">运费<span class="highlight" >¥{{productadd.postageFee}}</span></div>
                    </div>
                </div>
                <div style="width: 100%;height:20px;line-height:20px;">
                    <div class="ori-price2 fl three_div ori-padd">市场价<del>¥&nbsp;{{productadd.oriPrice}}</del></div>
                    <div class=" fs20 ori-price2 fl  three_div">库存<span class="highlight" >{{productadd.totalCount}}</span>份</div>
                    <div class="ori-price2 three_div" v-if="product.freeShippingNum<99999"><span class="highlight">{{product.freeShippingNum}}</span>件包邮</div>
                </div>
                <div style="width:100%;height:1px">&nbsp;</div>
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
        <div style="height:50px;"></div>
        <div class="btn" @click="btn">
            <span>
                加入购物车
            </span>
    	</div>
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
            showDetail: false,
            product:{},
            productadd:{},
            serviceDesc1:'',
            serviceDescMore1:'',
            ruleId:this.$route.query.ruleId,
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
   },
   mounted() {
       vm.query();
   },
   updated(){
       
   },

   methods: {
        query(){
            let url ="/getOnSaleRule/"+vm.ruleId;
                vm.receiveData.getData(vm,url,'res',function(){
                    if(vm.res.success) {
                        vm.product = vm.res.result;
                         vm.productss(vm.product.productId)
                    }else {    
                        alert(vm.res.message);
                    }
            });
        },
        productss(productId) {
            let url ="getProduct/"+productId;
            vm.receiveData.getData(vm,url,'res',function(){
                if(vm.res.success) {
                        vm.productadd = vm.res.result;  
                        vm.serviceDesc1 = Base64.decode(vm.productadd.serviceDesc);
                        vm.serviceDescMore1 = Base64.decode(vm.productadd.serviceDescMore1);
                }else {
                    alert(vm.res.message);
                }
            });
        },
        toggleDetail() {
            vm.showDetail = !vm.showDetail;
        },
        //加入购物车
        btn() {
            let url ="/cart/add";
            vm.receiveData.postData(vm,url,{ruleId:vm.ruleId},'res',function(){
            if(vm.res.success) {
                vm.$router.push({path:'/cart',query:{'ruleId':vm.ruleId}}); 
            }else {    
                alert(vm.res.message);
            }
            });
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
    background-color: #ffffff;
    height: 100vh;
    /* position: absolute;
    top:0;
    left:0;
    right: 0;
    bottom: 0; */
}      
.ban1{width: 100%;}
.ban1 img{width: 100%; }
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
    /* position: relative;
    top: 0.2rem; */
}
/* ------ */
.f12 {
    font-size: 12px;
}

.color {
    color:#F08500;
}
del {
    color:#9D9E9D;
}
/* .lines {
    text-align: center;
    position: relative;
}
.p10 {
    padding: 15px;
}
.line {
    display: inline-block;
    width:60%;
    border:1px solid #E6E6E6;
}
.line-name {
    position: absolute;
    width:2.2rem;
    left: 50%;
    margin-left:-1.1rem;
    background-color:#fff;
    top: 0.05rem;
    font-size: 12px;
} */
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
.btn {
    position: fixed;
    width:100%;
    height: 50px;
    line-height: 50px;
    text-align:center;
    font-size: 14px;
    bottom: 0;
    background-color:#F08500;
    color:#fff;
}
</style>
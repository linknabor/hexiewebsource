<template>
  <div >
    <!-- load -->
    <div class="load6" id="LoadingBar" v-show="load">
      <div class="bounce1"></div>
      <div class="bounce2"></div>
      <div class="bounce3"></div>
    </div>
    <div id="fade" class="black_overlay" v-show="load"></div>
    <div id="phoneErro" v-show="phoneErro">
      <span>没有更多</span>
    </div>

    <div id="phoneAjax" class="hidden" v-show="hidden">
      <img
        src="../../assets/images/index/c3d7f369-4a5e-4c4a-9fb9-a4b9d274c7e1.gif"
        style="width:40px;height40px;vertical-align: middle;"
      >
    </div>
    <!-- load -->
    <div>
         <swiper v-if="banners.length>0" :options="swiperOption" ref="mySwiper">
            <swiper-slide v-for="banner in banners" :key="banner.id">
                <div class="ban1" >
                    <a :href="banner.bannerUrl" >
                        <img :src="banner.picture" alt="">
                    </a>                  
                </div> 
            </swiper-slide>
            <!-- <div class="swiper-pagination" slot="pagination"></div>        -->
        </swiper>
    </div>
    <div class="onsale_nav">
        <ul>
            <li><router-link :to="{path:'/onsales',query:{type:'1'}}"><i class="nav_logo nav_life" ></i>土特产</router-link></li>
            <li><router-link :to="{path:'/onsales',query:{type:'2'}}"><i class="nav_logo nav_food" ></i>美食店</router-link></li>
            <li><router-link :to="{path:'/onsales',query:{type:'4'}}"><i class="nav_logo nav_apple" ></i>水果摊</router-link></li>
            <li><router-link :to="{path:'/onsales',query:{type:'3'}}"><i class="nav_logo nav_fruit" ></i>进口馆</router-link></li>
            <li><router-link :to="{path:'/onsales',query:{type:'5'}}" class="last"><i class="nav_logo nav_carstact"></i>粮食铺</router-link></li>
        </ul>
    </div>
    <div style="padding: 10px 16px;">
        <div v-for="banner in activebanner" :key="banner.id">
            <a :href="banner.bannerUrl">
                <img :src="banner.picture">
            </a>
        </div>
    </div>
    <div style="width: 100%;overflow: hidden;">
			<div style="width:33.3%;float:left;display: inline-block;text-align:center" v-for="(pic,index) in productbanner" :key="pic.id" @click="gotoPage(index)">
				<img style="border: 1px solid #d6d6d6;border-radius: 4px;width:96%;margin-top:1px" class="pic_circle" :src="pic.picture">
			</div>
	</div>
    <div class="store-div">
        <div style="text-align: center;"><span class="fs22">品牌旗舰&nbsp;为您推荐</span></div>
        <div v-for="good in brand_icon" :key="good.id" v-show="good.onSaleType >=21" style="width: 100%; clear: both; ">
            <router-link :to="{path:'/onsalesitem',query:{type:good.onSaleType}}" style="width: 100%;display: inline-block;">
				 	<div class="product-l"></div>
				    <div class="product-d">
				 	    <div class="product-d-d">
				 	    	<span class="product-d-d-s">
				 	    		<img :src="good.picture" class="store-icon" />
							    <span class="fs17" style="color: #FF8A00;">{{good.brandName}}</span>
				 	    	</span>
				 	    	<span class="fs13 menu-onsalse-link" style=" color: #6F6E6B; float: right; padding-right:15px ; padding-top: 4px">更多</span>
				 	    </div>
				    </div>
			</router-link>
            <div style="margin: 0 5px 0 5px;overflow:hidden;">
					<div class="nav_good" v-for="product in good.icons" :key="product.id" style="margin-bottom:5px;">
						<router-link  :to="{path:'/onsaledetail',query:{ruleId:product.ruleId}}"  class="products-item" >
							<div class="pic_container">
								<img alt="" class="product-image pic_content product_circle" :src="product.productPic" />
								<img v-show="product.tagUrl!=null&&product.tagUrl!=''" class="product-tag" :src="product.tagUrl"/>
							</div>

							<div style="float: left; padding: 5px 0 0px 5px;" class="pic_container">
									<div class="products-name" style="width: 90%; font-size: 12px;">{{product.ruleName}}</div>
									<span class="highlight fs17" style="margin-top: 10px ;">
                                    <span style="font-size: 12px">¥</span>&nbsp;{{product.price}}&nbsp;</span>
									<span class="ori-price fs12"><del>¥&nbsp;{{product.oriPrice}}&nbsp;</del></span>
							</div>
						</router-link>
					</div>
			</div>
        </div>    
    </div>   
    <div style="height:60px;clear:both">&nbsp;</div>
    <Footer></Footer>
  </div>
</template>

<script>
let vm;
import {swiper,swiperSlide} from 'vue-awesome-swiper';
import wx from 'weixin-js-sdk';
import Footer from '../index.vue'
export default {
  data() {
    return {
        load:true,
        hidden:false,
        phoneErro:false,
        //swiper参数配置
        swiperOption:{
            notNextTick:true,
            autoplay:false,
            autoplay:{
                disableOnInteraction:false,
                delay:3000
            },
            pagination: {
            el: '.swiper-pagination'
            },
            loop: true,
        },
        productbanner:[],
        brand_icon:[],
        banners:[],
        activebanner:[]
    };
  },
  created(){
    vm=this;
   
  },
  mounted() {
     let url = location.href.split('#')[0];
      vm.receiveData.wxconfig(vm,wx,['onMenuShareTimeline','onMenuShareAppMessage'],url);
    vm.getBannerType();
    
    vm.initShareSetting();

    // vm.initSession4Test();

  },

  components: {
      swiper,
      swiperSlide,
      Footer
  },

  methods: {
    //模仿线上用户信息/105/747/384/
    initSession4Test(){
        let url = '/initSession4Test/79187';
            vm.receiveData.getData(vm,url,'Data',function(){
        });
    },
    getBannerType() {
        vm.receiveData.getData(vm,'banners','res',function(){
           if(vm.res.success) {
             vm.banners = vm.res.result.titles;
			 vm.activebanner = vm.res.result.activities;
			 vm.brand_icon = vm.res.result.brands;
             vm.productbanner = vm.res.result.product;
             vm.load=false;
           }else {
            //    alert("获取banner异常");
           } 
        });
    },
    gotoPage(index) {
        location.href=vm.productbanner[index].bannerUrl;
    },
    initShareSetting(){
            var title = "生鲜、水果、美食、零食、红酒、蛋糕...每周惊喜，尽在"+vm.common.newname+"社区集市！";
            var link=vm.basePageUrl+"group/onsales.html?"+vm.common.getoriApp()+"#/?state=123";
            var img=vm.basePageUrl+"group/static/share_logo2.png";
            var desc="原产地直供，订单采摘，享更多优惠，体验品质生活";
            vm.common.initShareConfig(title,link,img,desc,wx);
    }
  },

  computed: {},
  
};
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
  
#phoneErro {
    margin: 100px auto 0;
    top: 25%;
    left: 25%;
    width: 50%;
    text-align: center;
    height: 60px;
    line-height: 60px;
    background-color: black;
    -moz-opacity: .8;
    opacity: .80;
    filter: alpha(opacity=80);
    position: fixed;
    z-index: 1999;
    overflow: auto;
    color: white;
    -moz-border-radius: 15px;
    -webkit-border-radius: 15px;
    font-size: 14px;
}
#phoneAjax {
    position: fixed;
    top: 20%;
    left: 50%;
    width: 60px;
    height: 60px;
    line-height: 60px;
    margin-left: -30px;
    text-align: center;
    background-color: black;
    -moz-opacity: .8;
    opacity: .80;
    filter: alpha(opacity=80);
    z-index: 1998;
    overflow: auto;
    -moz-border-radius: 15px;
    -webkit-border-radius: 15px;
}
.ban1{width: 100%;}
.ban1 img{width: 100%;}
 /* load */
 /* 分类 */
 .onsale_nav {
    height: 100px;
    margin: -4px 5px 0px 5px;
}
.onsale_nav li {
    float: left;
    height: 70%;
    width: 20%;
    text-align: center;
}
.onsale_nav a {
    width: 98%;
    color: #6F6E6B;
    font-size: 12px;
    margin: 5px 0px 1px 1px;
}
.onsale_nav li i {
    display: block;
    margin-bottom: 0px;
    height: 55px;
    margin: 10px 0px 10px 0px;
}
.nav_logo {
    background-position: 50% 0;
    background-size: 55px;
    background-repeat: no-repeat;
}
    .nav_featured{
		background-image: url('../../assets/images/onsales/icon_tutechan_03.png');
	}
	.nav_carstact{
		background-image: url('../../assets/images/onsales/icon_lingshipu_03.png');
	}
	.nav_life{
		background-image: url('../../assets/images/onsales/icon_tutechan_03.png');
	}
	.nav_food{
		background-image: url('../../assets/images/onsales/icon_meishidian_03.png');
	}
	.nav_fruit{
		background-image: url('../../assets/images/onsales/icon_shengxianguan_03.png');
	}
	.nav_apple{
		background-image: url('../../assets/images/onsales/icon_shuiguotan_03.png');
	}
 /* 分类 */
 /* 品牌旗舰 */
 .store-div {
    background-color: #f7f3eb;
    width: 100%;
    padding-top: 15px;
    color: #905f13;
    clear: both;
}
.fs22 {
    font-size: 22px;
}
.store-icon {
    height: 15px;
    width: 15px;
    /* padding-right: 10px; */
}
.product-l {
    height: 1px;
    background-color: #d3d3d3;
    bottom: -26px;
    position: relative;
    width: 80%;
    margin-left: 10px;
}
.product-d {
    padding-right: 10px;
    /* margin-left: 5rem; */
    text-align: center;
}
.product-d-d {
    position: relative;
    text-align: center;
    width: 100%;
    padding: 15px 0;
}
.product-d-d-s {
    background-color: #f7f3eb;
    padding: 0 10px;
}
.menu-onsalse-link {
    display: block;
    padding-right: 1rem;
    background: url('../../assets/images/index/left_arrow.png') no-repeat;
    background-size: 12px 12px;
    background-position: right center;
}
.fs17 {
    font-size: 17px;
}
.nav_good {
    width: 32%;
    border-left: 2px solid #F7F3EB;
    border-right: 2px solid #F7F3EB;
    float: left;
    border-radius: 4px;
    background-color: white;
}
.products-item {
    display: block;
    position: relative;
    color: #ffffff;
}
.pic_container {
    width: 100%;
    position: relative;
    display: inline-block;
}

.product_circle {
    border-radius: 4px 4px 0 0;
}
.pic_content {
    position: relative;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
}
.product-image {
    height: auto;
}
.product-tag {
    position: absolute;
    left: 0;
    top: 0;
    width: 40px;
    height: 40px;
}
.products-name {
    font-size: 13px;
    height: 20px;
    color: #000000;
    line-height: 20px;
    text-overflow: ellipsis;
    overflow: hidden;
}
.highlight {
    color: #ff8a00;
}
.fs17 {
    font-size: 17px;
}
.ori-price {
    font-size: 11px;
    color: #999999;
}
</style>
<template>
   <div >
    <!-- load -->
    <div class="load6" id="LoadingBar" v-show="load">
        <div class="bounce1"></div>
        <div class="bounce2"></div>
        <div class="bounce3"></div>
    </div>
    <div id="fade" class="black_overlay" v-show="load">
    </div>
    <div id="phoneErro" v-show="phoneErro">
        <span>没有更多</span>
    </div>

    <div id="phoneAjax" class="hidden" v-show="hidden">
        <img src="../../assets/images/index/c3d7f369-4a5e-4c4a-9fb9-a4b9d274c7e1.gif" style="width:40px;height40px;vertical-align: middle;">
    </div>
     <!-- load -->

    <!-- @scroll="getscroll" -->
     <div id="indexdivs" @scroll="getscroll">
        <div id="indexDiv"> 
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
            <div class="banner">
                <router-link :to="{path:'/'}" >
                    <img alt="" src="../../assets/images/onsales/img_shopping_banner.png" style="width:100%">
                </router-link>
            </div>
            <div class="onsale_nav">
                <ul>
                    <li><router-link :to="{path:'/onsales',query:{type:'1'}}" ><i class="nav_logo nav_life" ></i>土特产</router-link></li>
                    <li><router-link :to="{path:'/onsales',query:{type:'2'}}"><i class="nav_logo nav_food" ></i>美食店</router-link></li>
                    <li><router-link :to="{path:'/onsales',query:{type:'4'}}"><i class="nav_logo nav_apple" ></i>水果摊</router-link></li>
                    <li><router-link :to="{path:'/onsales',query:{type:'3'}}"><i class="nav_logo nav_fruit" ></i>进口馆</router-link></li>
                    <li><router-link :to="{path:'/onsales',query:{type:'5'}}" class="last"><i class="nav_logo nav_carstact"></i>粮食铺</router-link></li>
                </ul>
            </div>
        <div class="mlr5 " >
            <div style="width: 50%;float:left;" v-for="(product,index) in temais" :key="product.id">
                <div class="product-item" :class="{pleft:index%2==1,pright:index%2==0}" @click="Href(product.ruleId)">
                    <div class="pic_container">
						<div class="pic_dummy"></div>
						<img alt="" class="product-image pic_content" :src="product.productPic"/>
						<img v-if="product.tagUrl!=null&&product.tagUrl!=''" class="product-tag" :src="product.tagUrl"/>
					</div>
					<div class="product-name pl05">{{product.ruleName}}</div>
					<div class="mt1 pl05">
						<span class="highlight fs20">¥&nbsp;{{product.price}}&nbsp;</span>
						<span class="ori-price"><del>¥&nbsp;{{product.oriPrice}}&nbsp;</del></span>
						<span  class="product-discount">{{product.discount}}</span>
					</div>
                </div>
            </div>
                <div style="clear:both;"></div>
        </div>
    </div>
    <div style="height:60px;clear:both"> </div>
    </div>
    <Footer></Footer>
   </div>
</template>

<script>
let vm;
let hasNext=true,isloadPage=false,loadheight;
import {swiper,swiperSlide} from 'vue-awesome-swiper';
import Footer from '../index.vue'
export default {
   data () {
       return {
           load:true,
           hidden:false,
           phoneErro:false,
           temais:[],
           currentType:100, 
           type:this.$route.query.type,
           page:0,
           banners:[],
           bannerType:1,
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

           
       };
   },
   created() {
       vm=this;
   },
   mounted() {
    // vm.initSession4Test();   
    vm.getBannerType();  
    vm.queryProducts();
    // window.addEventListener('scroll',vm.getscroll())
   },

    watch:{
        //解决路由变页面不刷新
        '$route':function(newtype,oldtype){
            // console.log(newtype.query.type,oldtype.query.type)
            if(newtype.query.type!=oldtype.query.type) {
                vm.currentType=newtype.query.type;
                hasNext=true;
                isloadPage=false;
            }
            vm.query();
        }
    },
   components: {
      swiper,
      swiperSlide,
      Footer
   },

   methods: {
            // 105/747/384
        initSession4Test(){
            // let url ='/initSession4Test/79187';
            // let url="noticePayed?billId=190227800097291019&stmtId=191028316868034408&tradeWaterId=191031113434921074&packageId=wx3111343691718166032d55bc1116467100&feePrice=0.01&bind_switch=1";
            vm.receiveData.getData(vm,url,'Data',function(){
            });
        },
        getBannerType() {
            vm.receiveData.getData(vm,'banner/'+vm.bannerType,'res',function(){
                if(vm.res.success) {
                    vm.banners=vm.res.result;
                }else {
                    alert("获取banner异常");
                } 
            });
            },
        queryProducts() {
            if(vm.currentType == vm.type) {
                return
            }
            vm.currentType = vm.type;
            vm.query();
        },
       query() {
            if(vm.currentType == null) {
    	    	vm.currentType = 100;
            }
            vm.page=0;
            var n = "GET",
            a = "onsales/"+vm.currentType+"/"+vm.page,
            i = null,
            e = function(n) {
                console.log(JSON.stringify(n));
                vm.temais = n.result;
                vm.load=false;
                vm.page++;
            },
            r = function() {
                vm.load=false;
                vm.temais = [];
            };
            this.common.invokeApi(n, a, i, null, e, r)
       },
       Href(id) {
           vm.$router.push({path:'/onsaledetail',query:{'ruleId':id,'type':vm.currentType}})
       },
        getscroll(e) {
            var st = e.srcElement.scrollTop;
            loadheight = $("#indexDiv").height();
            var hook=loadheight-st;
            if(hook<800&&hasNext&&!isloadPage){
                isloadPage=true;
                vm.hidden=true;
                vm.loadNextPage();             
            }     
        },
        loadNextPage() {
            let url ="onsales/"+vm.currentType+"/"+vm.page;
                vm.receiveData.getData(vm,url,'Data',function(){
                    if(vm.Data.success){
                        if(vm.Data.result==null||vm.Data.result.length==0) {
                                vm.hidden=false;
                                hasNext=false;
                                isloadPage = false;
                                vm.phoneErro=true;
                                 setTimeout(() => {
                                    vm.phoneErro=false;
                                }, 1000);
                            } else {
                                isloadPage = false;
                                 vm.hidden=false;
                                vm.temais = vm.temais.concat(vm.Data.result);
                                vm.page++;  
                            }
                    }else {
                        isloadPage = false;
                        alert('加载特卖信息失败')
                    }
            });
        }
   },

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
#indexdivs {
    position:absolute;
    left: 0;
    top:0;
    right: 0;
    bottom: 0;
    overflow:auto; 
}

 /* load */
.banner {
    /* padding: 8px 5px 0 5px; */
    text-align: center;
}
 /* --- */
 /* 分类 */
 .onsale_nav {
    height: 65px;
    margin: -4px 0px 15px 0px;
    background-color: #ffdfb9;
}
.onsale_nav a.last {
    margin: 1px 1px 1px 1px;
    width: 96%;
}
.onsale_nav li {
    float: left;
    height: 70%;
    width: 20%;
    text-align: center;
    background-color: #ffdfb9;
}
.onsale_nav a {
    width: 98%;
    color: #6F6E6B;
    font-size: 12px;
    margin: 1px 0px 1px 1px;
    background-color: #fff8ee;
    padding-bottom: 8px;
    display: inline-block;
}
.onsale_nav li i {
    display: block;
    margin-bottom: 0px;
    height: 30px;
    margin: 15px 0px 4px 0px;
}
.nav_logo {
    background-position: 50% 0;
    background-size: 30px;
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
.mlr5 {
    margin-left: 5px;
    margin-right: 5px;
}
.product-item {
    position: relative;
    border: 1px solid #f4eff8;
}
.pic_container {
    width: 100%;
    position: relative;
    display: inline-block;
}
.pic_dummy {
    margin-top: 100%;
}
.pic_content {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
}
.product-image {
    height: auto;
}

img {
    width: 100%;
    max-width: 100%;
    
}
.product-name {
    font-size: 12px;
    height: 30px;
    color: #000000;
    line-height: 15px;
    text-overflow: ellipsis;
    overflow: hidden;
}
.pl05 {
    padding-left: 0.5rem;
}
.pright {
    margin-right: 1px;
}
.pleft {
    margin-left: 1px;
}
.fs20 {
    font-size: 20px;
}
.highlight {
    color: #ff8a00;
}
.pl05 {
    padding-left: 0.1rem;
}
.mt1 {
    margin-top: .05em;
}
.ori-price {
    font-size: 11px;
    color: #999999;
}
.product-discount {
    background-color: #ff8a00;
    padding-right: 4px;
    margin-right: 4px;
    height: 16px;
    font-size: 12px;
    line-height: 16px;
    display: block;
    color: white;
    border: #ff8a00 1px solid;
    border-radius: 4px;
    padding-left: 4px;
    float: right;
}
</style>
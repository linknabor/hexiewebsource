<template>
   <div class="xiyi">
       <!--轮播动画模块-->
       <div v-if="currentPage=='list'">
            <swiper v-if="banners.length>0" :options="swiperOption" ref="mySwiper">
                <swiper-slide  v-for="(banner,index) in banners" :key="index">
                    <a :herf="banner.bannerUrl"  class="ban1" >
                            <img :src="banner.picture" alt="">
                            <!-- <img src="../assets/images/index/bg_index.png" alt=""> -->
                    </a> 
                </swiper-slide>
                <div class="swiper-pagination" slot="pagination"></div>       
            </swiper>
       </div>
        <!--主体跳转连接模块-->
		<div v-if="currentPage=='list'">
			<ul>
				<li class="fl adimg" v-for="type in washindex" :key="type.id">
					<img :src="type.typeIcon" @click="showXiyiItem(type.id)"/>
				</li>
			</ul>
		</div>
        <div class="mb70 clear">
			&nbsp;
		</div>
        <!--底部功能栏模块-->
		<div id="foot">
			<ul class="foot_bar">
				<li>
                    <a :href="this.basePageUrl+'/home/index.html'">
                    <span style="font-size:16px">首页</span>
                    </a>
                </li>
                <!-- <li>
                    <router-link to="/introduce">
                        <img src="../assets/images/index/wash_index_order.png"/>
                        <span>服务介绍</span>
                    </router-link>
                </li> -->
				<li>
                    <router-link to="/xiyi_list">
                        <img src="../assets/images/index/wash_index_order.png"/>
                        <span>订单</span>
                    </router-link>
                </li>
			</ul>
		</div>
   </div>
</template>

<script>
let vm;
import {swiper,swiperSlide} from 'vue-awesome-swiper';
import '../../node_modules/swiper/dist/css/swiper.css'
import cookie from 'js-cookie'
export default {
   data () {
       return {
             swiperOption:{//轮播图
                notNextTick:true,
                // autoplay:false,
                autoplay: {
                    disableOnInteraction:false,
                    delay:3000
                },
                pagination: {
                el: '.swiper-pagination'
                },
                loop: true,
            },
            currentPage:"list",
            banners:[],
            washindex:[],
            maincity:{},
            cities:[
                // {id:1,name:'全国'},
                {id:19,name:"上海"},
                {id:2,name:"北京"}
		    ],
       };
   },
   created() {
       vm=this;
   },
   mounted() {
        // vm.initSession4Test();
        vm.queryBanner();//获取轮播图
        vm.getMianCity();
        vm.getInfo();
   },

   methods: {
        //模仿线上用户信息
            // 105/747/384
        initSession4Test(){
            let url ='/initSession4Test/79187';
                    vm.receiveData.getData(vm,url,'Data',function(){
            });
        },
       queryBanner() {
            vm.receiveData.getData(vm,'pageconfig/xiyi','Data',function(){
                if(vm.Data.success) {
                    vm.banners=vm.Data.result;
                }
            });
       },
       getInfo() {
           vm.receiveData.getData(vm,"/yunxiyi/serviceTypes/"+vm.maincity.id,'res',function(){
                if(vm.res.success) {
                    vm.washindex=vm.res.result;
                }
            });
       },
    //点击商品
       showXiyiItem(idx){
        //    location.href="bags.html?type="+idx;
        vm.$router.push({path:'/bags',query:{'type':idx}})
       },
       getMianCity() {
        vm.maincity=vm.cities[0];
		var duration = new Date().getTime()/1000 + 3600*24*30;
		cookie.set("regionId", vm.cities[0].id, duration);
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
.xiyi .swiper-pagination-bullet-active {
    opacity: 1;
    background: #fff;
}
</style>

<style  scoped>
.xiyi {
    font-family: "微软雅黑";
    background: #ffffff;
    box-sizing: border-box;
}
.ban1{width: 100%;}
.ban1 img {
    width:100%;
}
.adimg {
    width: 50%;
}
.adimg img {
    max-width: 100%;
}
.mb70 {
    margin-bottom: 70px;
}
.clear {
    clear: both;
}
/* 底部 */
#foot {
    height: 64px;
    width: 100%;
    border: 1px solid #dadde2;
    position: fixed;
    bottom: 0px;
    background-color: #fff;
}
.foot_bar li {
    float: left;
    width: 50%;
}
.foot_bar li a {
    display: inline-block;
    width: 100%;
    font-size: 14px;
    color: #3e4862;
    text-align: center;
    line-height: 64px;
}
.foot_bar img {
    width: 30px;
    vertical-align: middle;
    margin-right: 10px;
}
</style>
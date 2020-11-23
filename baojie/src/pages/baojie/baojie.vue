<template>
   <div>
       <div class="banner">
            <swiper  :options="swiperOption" ref="mySwiper">
                <swiper-slide v-for="(banner,index) in banners"  :key="index">
                    <div class="ban1">
                        <a :href="banner.bannerUrl">
                            <img :src="banner.picture" alt="tt">
                        </a>                    
                    </div> 
                </swiper-slide>
            <!-- <div class="swiper-pagination" slot="pagination"></div> -->
            </swiper>
       </div>
       <div class="contain">
           <router-link to="/rchang" >
               <img src="../../assets/img/ri.png" class="icon"/>
            </router-link>
			    <img src="../../assets/img/shen.png" class="icon" @click="prompts"/>
			    <img src="../../assets/img/xing.png" class="icon" @click="prompts"/>
             <!-- 支付订单单独提出    -->
			<router-link to="/border" >
                <img src="../../assets/img/order.png" class="icon"/>
             </router-link>
       </div>
       	<div class="notice" v-show="prompt">
			<div class="notice_text">
				该服务暂未开通，敬请期待！
			</div>
			<div class="notice_btn" @click="prompth">我知道了</div>
		</div>
   </div>
</template>

<script>
let vm;
import {swiper,swiperSlide} from 'vue-awesome-swiper';
import '../../../node_modules/swiper/dist/css/swiper.css'
export default {
   data () {
       return {
            swiperOption:{
                notNextTick:true,
                autoplay:true,
                autoplay:false,
                // autoplay:{
                // disableOnInteraction:false,
                // delay:2000
                // },
                pagination: {
                el: '.swiper-pagination'
                },
                loop: false,
            },
            banners:[],
            prompt:false,
       };
   },
   created() {
       vm=this;
   },
   mounted() {
    vm.initSession4Test();
    vm.query();
   },
   methods: {
    initSession4Test() {
        var url ='login/8427?code=8427';
        var data = {
            "oriApp": "wx95f46f41ca5e570e"
        }
        vm.receiveData.postData(vm,url,data,'res',function(){
        });
    },   
    query() {
        let url="/banner/12";
        vm.receiveData.getData(vm,url,'res',function(){
            vm.banners=vm.res.result;
        })
    },
    prompts() {
        vm.prompt=true;
    },
    prompth() {
        vm.prompt=false;
    }
   },
    components: {
        swiper,
        swiperSlide
   },
   computed: {
        swiper(){
               return this.$refs.mySwiper.SWIPER
            }
   },
}
</script>

<style  scoped>
.ban1{width:100%;}
.ban1 img{width: 100%;}
.banner{
    width: 100%;
    margin: 0px auto;
    position: relative;
}
.contain{
    box-sizing: border-box;
    overflow: hidden;
    margin-top: -4px;
}
.icon{
    width: 50%;
    box-sizing: border-box;
    float:left;
}
.notice{
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0,0.3);
    z-index: 1;
}
.notice_text{
    text-align: center;
    margin-top: 50%;
    background-color: #EEEEEE;
    width: 60%;
    margin-left: 20%;
    border-radius: 6px 6px 0 0;
    font-family: "微软雅黑";
    font-size: 14px;
    line-height: 40px;
}
.notice_btn{
    text-align: center;
    background-color: #D7D7D7;
    width: 60%;
    margin-left: 20%;
    border-radius: 0 0 6px 6px;
    font-family: "微软雅黑";
    font-size: 14px;
    line-height: 40px;
}
</style>
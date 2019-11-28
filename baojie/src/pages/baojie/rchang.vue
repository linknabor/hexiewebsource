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
        <div class="reserve">
    		<span class="s1">￥</span>
    		<span class="s2">{{item.price}}</span>
    		<span class="s1">/小时</span>
    		<span class="s3">（2小时起）</span>
    		<span @click="gotoPay" class="btn">立即预约</span>
    	</div>
        <div class="suggest">
    		<span class="span1">建议时长：</span>
    		<div class="example">
    			<img src="../../assets/img/xiyidesc.png" />
    		</div>
    	</div>
        <div class="service">
    		<div class="title1">服务内容</div>
    		<div class="introduce" v-html="item.extraDesc1"></div>
        </div>   
        <div class="remind">
			<div class="title2">
				<span>
                    <img src="../../assets/img/icon_wenxintishi_07.png" />
                    温馨提示
                </span>
			</div>
            <div class="detail" v-html="item.extraDesc2"></div>
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
            item:{price:0},
       };
   },
   created() {
       vm=this;
   },
   mounted() {
        //   this.common.checkRegisterStatus();
       vm.query();
       vm.queryProduct();
   },

   components: {
        swiper,
        swiperSlide
   },

   methods: {
        query() {
            let url="/banner/10";
            vm.receiveData.getData(vm,url,'res',function(){
                vm.banners=vm.res.result;
               
            })
        },
        queryProduct() {
            let url="/serviceItem/6";
            vm.receiveData.getData(vm,url,'res',function(){
                if(vm.res.success) {
                    if(!(vm.res.result == null)) {
                            vm.item=vm.res.result;
                    }
                }
            })
        },
        //立即预约
        gotoPay() {
            // if(this.common.checkRegisterStatus()&&vm.item.id){
                this.$router.push({path:'/baojiepay',query:{'item':vm.item.id}})
            // }
        },
  
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
.reserve{
    background-color: #FFFFFF;
    padding: 15px;
    border-bottom:1px solid #d7d7d7;
    overflow: hidden;
}
.s1{
    font-family: "微软雅黑";
    font-size: 17px;
    color: #ff8a00;
}
.s2{
    font-family: "微软雅黑";
    font-size: 28px;
    color: #ff8a00;
}
.s3{
    font-family: "微软雅黑";
    font-size: 17px;
    color: #AAAAAA;
}
.btn {
    float: right;
    width: 26%;
    height: 40px;
    line-height: 40px;
    color: #fff!important;
    font-family: "微软雅黑";
    font-size: 17px;
    text-align: center;
    background-color: #ff8a00;
    border-radius: 6px;
    outline: none;
    border: none;
    text-decoration: none;
}
.suggest{
    background-color: #FFFFFF;
    padding: 15px;
    border-bottom:1px solid #D7D7D7;
}
.span1{
    width: 50%;
    font-family: "微软雅黑";
    font-size: 16px;
    color: #272727;
}
.example{
    width: 100%;
    padding: 15px 0;
    box-sizing: border-box;
    overflow: hidden;
}
.example>img{
    width: 100%;
}
.service{
    margin-top: 10px;
    padding: 15px;
    background-color: #FFFFFF;
    border-bottom:1px solid #D7D7D7;
    border-top:1px solid #D7D7D7;
}
.title1{
    margin-bottom: 15px;
    padding-bottom: 15px;
    border-bottom:1px solid #D7D7D7;
    font-family: "微软雅黑";
    font-size: 15px;
    color: #272727;
}
.introduce{
    font-family: "微软雅黑";
    font-size: 14px;
    color: #666666;
    margin: 5px;
}
.introduce>img{
    width: 10px;
    height: 10px;
    margin-right: 10px;
}
.remind{
    margin-top: 15px;
    padding: 15px;
}
.title2{
    margin-bottom: 15px!important;
    border-bottom:1px solid #D7D7D7;
    padding-bottom: 15px;
}
.title2>span>img{
    width: 15px;
    height: 15px;
    padding-right: 6px;
}
.title2>span{
    font-family: '微软雅黑';
    font-size: 15px;
    color: #666666;
    }
.detail{
    font-family: "微软雅黑";
    font-size: 13PX;
    color: #AAAAAA;
    margin: 5px;
}
</style>
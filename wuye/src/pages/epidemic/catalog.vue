<template>
   <div class="catalog">
       <div class="catatop">
        <swiper :options="swiperOption" ref="mySwiper" v-if="banners.length>0">
            <swiper-slide v-for="item in banners" :key="item.id">
                <div class="ban1">
                    <a :href="item.bannerUrl" >
                        <img :src="item.picture" alt="">
                    </a>                  
                </div> 
            </swiper-slide>
        </swiper>
        <div style="margin:2%; overflow: hidden;">
            <div
                @click="gotoPage(item.checkBind,item.url)"
                v-for="(item,index) in catalogs"
                :key="index"
                class="featured"
            >
                 <img :src="item.picture">
            </div>
        </div>
       </div>
       <Footers></Footers>
   </div>
</template>

<script>
let vm;
import {swiper,swiperSlide} from 'vue-awesome-swiper';
import Footers from '../../components/footer.vue';
import { MessageBox } from 'mint-ui';
import cookie  from 'js-cookie';
export default {
   data () {
       return {
            swiperOption: {
                notNextTick: true,
                autoplay: true,
                autoplay: {
                disableOnInteraction: false,
                delay: 3000
                },
                // speed: 1000,
                pagination: {
                el: ".swiper-pagination",
                clickable: true
                },
                loop: false
            },
            banners:[],
            catalogs:[],
            sectId:cookie.get('sectId')
       };
   },
   created(){
        vm = this;  

   },
   mounted() {
       vm.initData();
   },

   components: {
        Footers,
        swiper,
        swiperSlide
   },

   methods: {
        initData() {
            let url ="/pageconfig/shequ";
            vm.receiveData.getData(vm, url, "res", function() {
                let res = vm.res;
                if (res.success) {
                     vm.banners = res.result.banners;
                     vm.catalogs = res.result.modules;
                } else {
                    alert("页面获取信息错误，请稍后重试！");
                }
            });
        },
       gotoPage(checkBind,url){
        //    checkBind  0不需要判断房屋   1判断房屋
        if(checkBind==1) {
            if(vm.sectId==0||vm.sectId==""||vm.sectId==null||vm.sectId=='undefined'||vm.sectId=='null') {
                MessageBox.alert('您暂未绑定房屋，请前往“我是业主”\r\n进行操作，感谢！').then(action =>{
                    vm.$router.push({path:'/myhouse'});
                })
            }else {
                location.href=url;
            }
        }else {
                location.href=url;
        }
       }
   },

   computed: {},
}
</script>

<style  scoped>
.catalog {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background:#F2F2F2;
    overflow:auto;
}
.catatop {
    font-family: PingFangSC-Regular;
    width: 100%;
    margin-bottom: 60px;
    font-size: 14px;
}
.ban1{width: 100%;}
.ban1 img{width: 100%;}
.featured {
  width: 45%;
  float: left;
  margin-right: 10%;
  margin-bottom:5%;
}
.featured:nth-child(even) {
    margin-right:0;
}
.featured > img {
  border-radius: 6px;
  width: 100%;
}
</style>
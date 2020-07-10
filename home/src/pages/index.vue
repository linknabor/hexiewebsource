<style scoped>
.home {
  font-family: PingFangSC-Regular;
  width: 100%;
  height: 100%;
  font-size: 14px;
  text-align: center;
  margin-bottom: 60px;
  overflow: hidden;
}
.swiper {
  width: 100%;
}
.swiper img {
  width: 100%;
}
.line {
  height: 5px;
  width: 100%;
  clear: both;
  background: #eeeeee;
}
.featured {
  width: 48%;
  float: left;
  margin: 1%;
  border-radius: 0.1rem;
  background-color:#fff;
  padding: 0.3rem 0;
  text-align: center;
  font-size: 0.3rem;;
}
.fd-img {
  margin: 0.2rem 0;
}
.featured img {
  width: 1.4rem;
  height: 1.4rem;
  border-radius: 0.7rem
}
.contain_weixiu {
  margin: 5px;
  box-sizing: border-box;
  overflow: hidden;
}
.icon_weixiu {
  box-sizing: border-box;
  padding: 5px;
  width: 33%;
  float: left;
}
.w40{box-sizing: border-box; -webkit-box-sizing: border-box; 
    -moz-box-sizing: border-box;}
.w60{width: 55%;box-sizing: border-box; -webkit-box-sizing: border-box; 
    -moz-box-sizing: border-box;}
.week_sugg_img{width: 42%;padding-bottom: 39%;border-right: #eeeeee 1px solid;
 	background-size: 100%;background-repeat: none;margin: 0 0 0 3%;
 	background-image: url('../assets/images/index/grid.png');}
.week_sugg_img2{width: 94%;padding-bottom: 35.2%;background-size: 100%;
 	background-repeat: none;margin: 0 6% 0 0;} 
.week_sugg_img3{width: 94%;border-top: #eeeeee 1px solid;padding-bottom: 35.2%;
 	background-size: 100%;background-repeat: none;margin: 0 6% 0 0;}        
</style>
<template>
<div>
  <div class="home">
    <swiper :options="swiperOption">
      <swiper-slide v-for="(item,index) in swiperData" :key="index">
        <div class="swiper">
          <a :href="item.bannerUrl">
            <img :src="item.picture" alt>
          </a>
        </div>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <div class="line">&nbsp;</div>
    <div v-if="donghu">
      <div style="overflow: hidden;">
        <div class=" fl w40 week_sugg_img" @click="gotoPaged(data1.url)"
        v-bind:style="{backgroundImage:'url(' + data1.img + ')'}"
        ></div>	
        <div class="fl w60">
          <div class="week_sugg_img2 fr" @click="gotoPaged(data2.url)"
          v-bind:style="{backgroundImage:'url(' + data2.img + ')'}">
          </div>
          <div class="week_sugg_img3 fr" @click="gotoPaged(data3.url)" 
          v-bind:style="{backgroundImage:'url(' + data3.img + ')'}">
          </div>
        </div>
      </div>
      <div class="line">&nbsp;</div>
      <div class="contain_weixiu">
        <img @click="gotoProject(1)" src="../assets/images/index/finance.png" class="icon_weixiu"/>
        <img @click="gotoProject(2)" src="../assets/images/index/hotel.png" class="icon_weixiu"/>
        <img @click="gotoProject(3)" src="../assets/images/index/travel.png" class="icon_weixiu"/>
      </div>
    </div>

    <div v-else style="margin:5px;overflow: hidden;" >
      <div v-for="(item,index) in serviceContent" :key="item.service_id" class="featured" @click="gotoPages(index,item.price,item.context)">
          <div class="fd-img"> 
              <img :src="item.image" alt="">
          </div>
          <div>
             <span>{{item.service_title}}</span>
          </div>
      </div>
    </div>
  </div>
  <Footer></Footer>
</div>
</template>
<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "../assets/css/swiper.min.css";
import Footer from '../components/footer.vue';
import Bus from '../api/bus.js';
let vm;
export default {
  components: {
    swiper,
    swiperSlide,
    Footer
  },
  data() {
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
        loop: true
      },
      swiperData: [],
      // jingxuans:[],
      data1:'',
			data2:'',
      data3:'',
      donghu:false,//是否是东湖
      cfgParam:{},//用户绑定的小区是否有服务功能
      sectId:0, //是否绑定房子
      serviceContent:[],//首页数据
    };
  },
  beforeCreate() {
    //刷新页面
  },
  created() {
    vm = this;
  },
  watch: {},
  mounted() {
      Bus.$on("sends",this.getMsgFromZha);
  },
  beforeDestroy() {
      Bus.$off();
　},
  methods: {
    initData() {
      let _this = this;
      let url ="/pageconfig/shequ";
      _this.receiveData.getData(_this, url, "res", function() {
        let res = _this.res;
        if (res.success) {
          _this.swiperData = res.result.banners;
          // _this.jingxuans = res.result.modules;
          _this.data1 = res.result.jingxuan1;
					_this.data2 = res.result.jingxuan2;
					_this.data3 = res.result.jingxuan3;
        } else {
          if (res.message !== null) {
            alert(res.message);
          } else {
            alert("页面获取信息错误，请稍后重试！");
          }
        }
      });
    },
    getMsgFromZha(result) {
      vm.donghu=result.donghu;//东湖标识
      vm.cfgParam=result.cfgParam;
      vm.sectId=result.sectId;
      vm.IsectId();
      vm.initData();
    },
    IsectId(){//判断是否绑定房子
      if(!vm.donghu) {
        if(vm.sectId == 0 || vm.sectId == null) {
          alert("您暂未绑定房屋，请前往“我是业主”进行操作，感谢！");
          window.location.href = vm.basePageUrl+'wuye/index.html?'+vm.common.getoriApp()+'#/myhouse'
          return
        }else {
          vm.query();
        } 
      }
    },
    query(){
      let url="/customService/service";
      vm.receiveData.getData(vm,url,'res',function(){
        if(vm.res.success) {
            if(vm.res.result.length == 0) {
              alert("您所在小区暂未开通该功能，敬请期待");
              window.location.href = vm.basePageUrl+'wuye/index.html?'+vm.common.getoriApp()+'#/';
              return 
            }else {
              vm.serviceContent = vm.res.result;
            }
        }else {
          alert(vm.res.message)
        }
      })
    },
    gotoPages(index,Price,details) { // Price一口价 details 详情页 
           window.localStorage.setItem('service_order',JSON.stringify(vm.serviceContent[index]));
         if(Price == 0  && details == '') { //无一口价 无详情 
            window.location.href = vm.basePageUrlpay+'orderpay.html?'+vm.common.getoriApp()+'#/singlepage';
         }else if(Price != 0  && details == '') { //有一口价 无详情
            window.location.href = vm.basePageUrlpay+'orderpay.html?'+vm.common.getoriApp()+'#/singlepage';
         }else if (Price == 0  && details != '') {  // 无一口价  有详情页
            window.location.href = vm.basePageUrlpay+'orderpay.html?'+vm.common.getoriApp()+'#/detailspage';
         }else if (Price != 0  && details != '') { //有一口价 有详情页
            window.location.href = vm.basePageUrlpay+'orderpay.html?'+vm.common.getoriApp()+'#/detailspage'
         }
    },
    //东湖点击调整
    gotoPaged(ele){
      if(ele == ''){
        vm.$router.push({path:'/build'})
      }else{
        location.href = ele;
      }
    },
    gotoProject(type){
				if(type=="2"){
	        		vm.$router.push({path:'hotel'})
          }else if(type=="3"){
            location.href=vm.basePageUrl+'wuye/index.html?'+vm.common.getoriApp()+'#/message';
            // console.log(this.basePageUrl+'wuye/index.html?'+this.common.getoriApp()+'#/message')
          }else{
            vm.$router.push({path:'/build'})
          }
		}
  }
  
};
</script>
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
}
.featured > img {
  border-radius: 6px;
  width: 100%;
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
      <div
        @click="gotoPage(item.url)"
        v-for="(item,index) in jingxuans"
        :key="index"
        class="featured"
      >
        <img :src="item.picture">
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
import Bus from '../api/bus.js'
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
      jingxuans:[],
      data1:'',
			data2:'',
      data3:'',
      donghu:false,
    };
  },
  beforeCreate() {
    //刷新页面
  },
  created() {},
  watch: {},
  mounted() {
       Bus.$on("sends",this.getMsgFromZha);
       this.initData();
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
          _this.jingxuans = res.result.modules;
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
      this.donghu=result.donghu;
    },
    gotoPage(ele) {
      location.href = ele;
    },
    gotoPaged(ele){
      if(ele == ''){
        this.$router.push({path:'/build'})
      }else{
        location.href = ele;
      }
    },
    gotoProject(type){
				if(type=="2"){
	        		this.$router.push({path:'hotel'})
          }else if(type=="3"){
            location.href=this.basePageUrl+'wuye/index.html?'+this.common.getoriApp()+'#/message';
            // console.log(this.basePageUrl+'wuye/index.html?'+this.common.getoriApp()+'#/message')
          }else{
            this.$router.push({path:'/build'})
          }
		}
  }
  
};
</script>
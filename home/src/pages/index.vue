<style scoped>
.home {
  font-family: PingFangSC-Regular;
  width: 100%;
  height: 100%;
  font-size: 14px;
  text-align: center;
  padding-bottom: 60px;
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
</style>
<template>
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
    <div style="margin:5px;">
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
</template>
<script>
import Bus from "../api/bus.js";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "../assets/css/swiper.min.css";
import cookie from 'js-cookie';
export default {
  components: {
    swiper,
    swiperSlide
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
      jingxuans:[
      	// {
      	// 	image:'http://img.e-shequ.com/FsOWvRxK9mycwl86xYkETif2X346',
      	// 	url:''
      	// },
      	// {
      	// 	image:'http://img.e-shequ.com/Ftq1wei9rTCcnsnvgkGf0NIEWvp-',
      	// 	url:''
      	// }
      ]
    };
  },
  beforeCreate() {
    //刷新页面
  },
  created() {},
  watch: {},
  mounted() {
    // this.initSession4Test();
    this.initUserInfo();
  },
  methods: {
    //模仿线上用户信息
    //105/747/384
    initSession4Test() {
      let _this = this;
      let url = "/initSession4Test/79187";
      _this.receiveData.getData(_this, url, "Data", function() {
        
      });
    },
    initUserInfo() {
      let _this = this;
      let n = "GET",
        a = "userInfo?oriApp=" + _this.getUrlParam("oriApp"),
        i = null,
        e = function(n) {
          Bus.$emit("sends", n.result.iconList);
         _this.initData(); 

         if (n.success && n.result == null) {
            reLogin();
         }
         var duration = new Date().getTime()/1000 + 3600*24*30;
         for(var j=0;j<n.result.bgImageList.length;j++){
              cookie.set(n.result.bgImageList[j].type,n.result.bgImageList[j].imgUrl,duration)
          }
        },
        r = function() {};
      _this.common.invokeApi(n, a, i, null, e, r);
    },
    initData() {
      let _this = this;
      let url ="/pageconfig/shequ";
      _this.receiveData.getData(_this, url, "res", function() {
        let res = _this.res;
        if (res.success) {
          _this.swiperData = res.result.banners;
          _this.jingxuans = res.result.modules;
        } else {
          if (res.message !== null) {
            alert(res.message);
          } else {
            alert("页面获取信息错误，请稍后重试！");
          }
        }
      });
    },
    gotoPage(ele) {
      location.href = ele;
    }
  }
};
</script>
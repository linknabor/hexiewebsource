<style>
.font {
  background: #eee;
  width: 100%;
  height: 100vh;
}
.font-head {
  width: 100%;
  height: 1.1rem;
  background-color: var(--primary-color);
}
.font-head-sousuo {
  width: 86%;
  height: 0.6rem;
  top: 0.25rem;
  position: absolute;
  left: 7%;
  line-height: 1rem;
  background: white;
}
.classinput {
  text-indent: 5px;
}
.sousuo-l {
  width: 1.4rem;
  height: 100%;
}
.select {
  background: #fff;
  position: relative;
  width: 1.4rem;
  height: 100%;
  /* text-align: center; */
  border: none;
  border-right: 1px solid #999;
  max-height: 70%;
  line-height: 165%;
  top: 0.1rem;
  text-indent: 1px;
}
.sousuo-r {
  width: 84%;
  height: 100%;
  left: 1.4rem;
  position: relative;
  top: -0.6rem;
}
.unitinput {
  position: relative;
  width: 93%;
  float: left;
  height: 100%;
  border: none;
  outline: none;
}
.font-body-t {
  width: 84%;
  height: 1rem;
  border-bottom: 1px solid #eee;
  margin: auto;
  line-height: 1rem;
}
.body-t {
  font-size: 0.3rem;
  margin: 0.2rem;
  top: 0.3rem;
  position: relative;
}
.body-b {
  /* top: 0.3rem; */
  position: relative;
  left: 0.2rem;
}
.font-body {
  background: white;
  width: 100%;
  margin: auto;
  margin-top: 0;
  position: absolute;
}
.pic-sousuo {
  width: 16%;
  height: 100%;
  float: right;
  top: 0;
  position: absolute;
  text-align: right;
  right: 14px;
}
.pic-sousuo img {
  width: 47%;
  height: 69%;
  margin: 0.1rem 0.2rem;
}
.iconspan {
  font-size: 20px;
  font-weight: 700;
  vertical-align: middle;
  position: relative;
  left: 0.05rem;
  bottom: 0.01rem;
}
</style>


<template>
  <div class="font">
    <div class="font-head">
      <!-- <img src="../../assets/images/house/font-bg.png" /> -->
      <div class="font-head-sousuo">
        <div class="sousuo-l" @click="location()">
          <div class="select" id="city">
            <span class="iconfont icon-dingwei iconspan"></span>
            {{ regionname }}
          </div>
        </div>
        <div class="sousuo-r">
          <!-- 查询小区 -->
          <input
            id="btnd"
            type="text"
            placeholder="查询小区"
            class="virtual-input classinput unitinput"
            value
            v-on:input="shousuo(query.sect)"
            v-model.trim="query.sect"
            v-focus="true"
          />

          <!-- 搜索 -->
          <div class="pic-sousuo" @click="fondsousuo()">
            <img src="../../assets/images/house/sousuo.png" />
          </div>
        </div>
      </div>
    </div>

    <div class="font-body" v-show="shows">
      <div class="font-body-t" v-for="item in sectList" :key="item.id">
        <div
          class="body-b"
          :data-idd="item.id"
          v-tap="{ fn: alertFN, name: item.name, id: item.id }"
          style="font-size: 0.26rem; color: #5a5a5a"
        >
          {{ item.name }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
let vm;
let timer;
import wx from "weixin-js-sdk";
import "../../tap.js";
import UserApi from '@/api/api.js'
import {Dialog} from 'vant'

export default {
  data() {
    return {
      sectList: [], //小区列表
      regionname: "上海",//显示值
      address:'上海市',//传值
      shows: false,
      query: {
        //查询缴费数据
        sect: "", //小区
      },
      jsApiList: ['getLocation']
    }
  },
  components: {
  },
  created() {
    vm = this;
  },
  mounted() {
    // vm.locationcitys();
    // let url2 = location.href.split("#")[0];
    // var data = {
    //     vm:vm,
    //     wx:wx,
    //     apiList:['getLocation'],
    //     url:url2
    // }
    // vm.receiveData.wxconfig(data);
    this.replacecity()
    this.initWxConfig()

    // vm.city();
    // vm.initSession4Test();
  },
  directives:{
      focus:{
        inserted(el,{value}) {
          if(value) {
            el.focus();
          }
        }
      }
  },
  methods: {
    initWxConfig(){
      let currPageUrl = location.href.split("#")[0];
      UserApi.getUrlJsSign({ url: currPageUrl }).then((response) => {
            let n = response.data
            let success = n.success
            if (!success) {
                return false
            }
            let result = n.result  //接口返回的嵌入数据
            let jsApiList = this.jsApiList
            wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: result.appId, // 必填，公众号的唯一标识
                timestamp: result.timestamp, // 必填，生成签名的时间戳
                nonceStr: result.nonceStr, // 必填，生成签名的随机串
                signature: result.signature,// 必填，签名，见附录1
                jsApiList, // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                openTagList: [],
            })
            wx.ready(() => {
                console.log('begin exec wx.ready.')
                wx.checkJsApi({
                  jsApiList,
                  success: function(res) {
                    console.log(res)
                    if (!res.checkResult.getLocation) {
                      Dialog.alert({
                        message: '您的微信版本太低，请升级到最新的微信版本！',
                      }).then(() => {
                        return false
                      })
                    }
                  }
                })
                wx.getLocation({
                  type: "wgs84",
                  success: function(res) {
                    let latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                    let longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                    vm.getRegionurl(longitude, latitude);
                    return;
                  },
                  fail: function(res) {
                    console.log(res)
                  },
                  cancel: function(res) {
                    console.log(res)
                    console.log("用户取消");
                  }
                });
            })

        }).catch((error) => {
            console.log(error)
        })
    },
    initSession4Test() {
      let url = "/initSession4Test/105";
      vm.receiveData.getData(vm, url, "Data", function() {});
    },
    // 选择城市
    locationcitys() {
      vm.receiveData.getData(
        vm,
        "/getRegionUrl?regionname=" + vm.regionname,
        "locationcity",
        function() {
          if (vm.locationcity.success) {
          }
        }
      );
    },
    //选择城市
    location() {
      vm.$router.push({ path: "/location" });
    },
    //定位城市
    city() {
      wx.ready(function() {
        wx.checkJsApi({
          jsApiList: ["getLocation"],
          success: function(res) {
            if (res.checkResult.getLocation == false) {
              alert(
                "你的微信版本太低，不支持微信JS接口，请升级到最新的微信版本！"
              );
              return;
            }
          }
        });
        wx.getLocation({
          type: "wgs84",
          success: function(res) {
            let latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
            let longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
            vm.getRegionurl(longitude, latitude);
            return;
          },
          cancel: function(res) {
            console.log("用户取消");
          }
        });
        wx.error(function(res) {
          alert("获取位置失败");
        });
      });
    },
    getRegionurl(longitude, latitude) {
      vm.receiveData.getData(
        vm,
        "/getRegionUrl?coordinate=" + longitude + "," + latitude,
        "res",
        function() {
          if (vm.res.success) {
            vm.regionname = vm.res.result.showAddress;
            vm.address = vm.res.result.address;
            vm.replacecity();
          } else {
            alert("获取数据失败");
          }
        }
      );
    },
    // 替换城市
    replacecity() {
      if (this.$route.query.citydata1) {
        vm.regionname = this.$route.query.citydata1;
        vm.address = this.$route.query.address;
      }
    },

    shousuo(name) {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        if (name != "") {
           this.getHousin(name); 
        }else {
          vm.shows=false;
        }
      }, 400);
    },
    //获取小区
    getHousin(name) {
      let url =
        "/getVagueSectByName?sect_name=" +
        name +
        "&regionname=" +
        vm.address;
      vm.receiveData.getData(vm, url, "Datas", function() {
        let link = null;
        link = vm.Datas.result.sect_info;
        if (link && link.length > 0) {
          vm.sectList = vm.Datas.result.sect_info;
          vm.shows = true;
        } else {
          vm.shows = false;
        }
      });
    },

    // 替换搜索内容
    alertFN(s) {
      vm.$nextTick(function() {
        var add = document.getElementById("btnd");
        add.value = s.name;
        vm.query.sect = s.name;
        vm.shows = false;
        
        var unitdata = s.name;
        var ID = s.id;
        var CityL = vm.address;
        vm.$router.push({
          path: "/Pay",
          query: { selected: "d", userunit: unitdata, queryID: ID, City: CityL }
        });
      });
    },

    // 搜索
    fondsousuo() {
      vm.shows = true;
    }
  }
};
</script>
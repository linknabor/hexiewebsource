<template>

  <div class="main">
    <van-overlay :show="show_overlay">
      <van-loading type="spinner" />
    </van-overlay>
    <van-skeleton title :row="3" :loading="loading">
      <div v-if="showFlag">
        <div class="data-top">
          <img src="../../assets/img/park.png">
        </div>
        <div class="data-head">
          <div>
            <div class="data-park-left">停车场:</div>
            <div class="data-park-right" @click="goMap">
              <van-icon name="location"/>
              <span class="data-park-txt">{{selectParkName}}</span>
              <van-icon name="arrow"/>
            </div>
            <div style="clear:both"></div>
          </div>

            <plateNumber @getPlateLicense="getPlateLicense" :mat="formData" :butName="butName" :isShowCheck="0"></plateNumber>

          <div>
            <div class="carList" v-for="(item, index) in carList" :key="index" @click="clickCar(item.car_no)">
              {{item.car_no}} >
            </div>
          </div>

        </div>
        <div style="clear:both"></div>
        <div class="data-mid">
          <van-grid direction="horizontal" :column-num="2">
            <van-grid-item :icon="addCarImg" text="添加车辆" @click="addCar"/>
            <van-grid-item :icon="queryCarImg" text="停车记录" @click="queryPay"/>
          </van-grid>
        </div>

        <div class="data-bottom">
          <div class="data-bottom-title">计费规则：</div>
          <div class="data-bottom-text" v-for="(item, index) in ruleList" :key="index">
            <span>. {{item.ruleName}}</span>
          </div>
        </div>
      </div>

      <div id="mapList" v-if="!showFlag">
        <van-nav-bar title="停车场列表" left-text="返回" left-arrow @click-left="goBack"
        />
        <div>
          <van-search v-model="searchValue" @search="onSearch" show-action placeholder="请输入停车场名称">
            <template name="action" slot="action">
              <div @click="onSearch">搜索</div>
            </template>
          </van-search>
        </div>
        <van-list v-model="listLoading" :finished="finished"
                  finished-text="没有更多了"
                  @load="onLoad"
        >
          <div v-for="(item, index) in parkList" :key="index">
            <van-cell :title="item.park_name" icon="location-o" :label="item.park_addr" center is-link @click="checkCell(item)"/>
          </div>
        </van-list>
      </div>
    </van-skeleton>
    <user-login ref="userLogin" @getLoginUser="getLoginUser"></user-login>
  </div>
</template>

<script>
  import {
    Skeleton,
    Icon,
    Grid,
    GridItem,
    Cell,
    Search,
    List,
    NavBar,
    Dialog,
    Switch,
    Toast,
    Overlay,
    Loading
  } from 'vant';
  import plateNumber from '@/components/plateNumber'
  import UserLogin from "@/components/UserLogin"
  import UserApi from "@/api/api.js"
  import ParkApi from "@/api/Park.js"
  import Storage from "@/util/storage.js"

  export default {
    name: "indexCar",
    data() {
      return {
        show_overlay: true,
        loading: true,
        showFlag: true,
        searchValue: '',
        listLoading: false,
        finished: false,
        butName:'查询缴费',

        addCarImg:require('../../assets/img/addcar.png'),
        queryCarImg:require('../../assets/img/querycar.png'),

        formData:{
          commonCard: '1',
          num0: '',
          num1: '',
          num2: '',
          num3: '',
          num4: '',
          num5: '',
          num6: '',
          num7: ''
        },

        selectCarNo:'',

        selectParkId:'',
        selectParkName:'',

        carList:[],

        parkInfo:'',

        parkList:[],

        ruleList:[],
      }
    },
    components: {
      "user-login": UserLogin,
      [Skeleton.name]: Skeleton,
      [Icon.name]: Icon,
      [Grid.name]: Grid,
      [GridItem.name]: GridItem,
      [Cell.name]: Cell,
      [Search.name]: Search,
      [List.name]: List,
      [NavBar.name]: NavBar,
      [Dialog.Component.name]: Dialog.Component,
      [Switch.name]: Switch,
      [Overlay.name]: Overlay,
      [Loading.name]: Loading,
      [Toast.name]: Toast,
      plateNumber
    },
    created() {
      setTimeout(() => {
        this.loading = false
      }, 1000) //延迟时间 这里是1秒
    },
    mounted() {
      this.show_overlay = true
      this.loading = true
      //this.initSession4Test()
      this.getUserInfo()
      this.initCar()
      this.loading = false
      this.show_overlay = false
    },
    methods: {
      initSession4Test() {
        var data = {
          oriApp: "wx95f46f41ca5e570e",
        };
        UserApi.login("8456", data)
      },

      getUserInfo() {
        UserApi.getUserInfo().then((response) => {
            let data = response.data;
            if (data.success && data.result != null) {
              Storage.set("userInfo", data.result)
              this.$emit("getUserInfo", data.result)
            } else {
              this.$refs.userLogin.login();
            }
          })
          .catch((error) => {
            Toast(error);
          });
      },

      initCar() {
        ParkApi.getIndexCar().then((response) => {
          let data = response.data
          if(data && data.success) {
            this.carList = data.result.carList
            this.parkInfo = data.result.parkInfo
            this.selectParkName = this.parkInfo.park_name;
            this.selectParkId = this.parkInfo.park_id;
            this.ruleList = this.parkInfo.ruleList
            if(this.carList.length > 0) {
              let car_no = this.carList[0].car_no
              this.clickCar(car_no)
            }
          }
        })
      },
      onLoad() {
        this.finished = true
      },
      getPlateLicense(data, checked) {
        this.$router.push({
          path: '/carPay',
          query: {
            carNo: data,
            parkId: this.selectParkId
          }
        })
      },

      goMap() {
        this.show_overlay = true
        this.showFlag = false
        let param = {
          parkName: this.searchValue
        }
        ParkApi.getParkList(param).then((response) => {
          let data = response.data
          if(data && data.success) {
            this.parkList = data.result
          }
          this.show_overlay = false
        })
      },

      onSearch() {
        this.goMap()
      },

      checkCell(item) {
        this.selectParkId = item.park_id
        this.selectParkName = item.park_name
        this.showFlag = true
        this.searchValue = ""
        this.ruleList = item.ruleList
      },

      goBack() {
        this.showFlag = true
      },

      clickCar(car_no) {
        this.selectCarNo = car_no
        var strs = car_no.split("")
        if(strs.length === 7) {
          this.formData.commonCard ='1'
        } else {
          this.formData.commonCard ='2'
        }
        for(var i=0; i<strs.length; i++) {
          this.formData['num'+i] = strs[i]
        }
      },

      addCar() {
        this.$router.push('/addCar');
      },

      queryPay() {
        this.$router.push('/queryCarPay');
      },

      getLoginUser(data) {
        if (data) {
          this.$emit("getUserInfo", data.result);
        }
      },
    },
  }
</script>

<style scoped>
  .main {
    width: 100%;
    background-color: #F5F6F7;
    height: 100%;
    min-height: 100vh;
    overflow: hidden
  }

  .data-top {
    height: 3.5rem;
  }

  .data-top img {
    width: 100%;
    height: 3.5rem;
  }

  .data-head {
    position: relative;
    top: -1.5rem;
    background-color: white;
    margin: 0.1rem 0.1rem;
    border-radius: 0.5rem;
    height: auto !important;
    min-height: 5.5rem;

  }

  .data-mid {
    position: relative;
    top: -1.5rem;
    background-color: white;
    margin: 0.2rem 0.1rem;
    border-radius: 0.2rem;
  }

  .data-bottom {
    position: relative;
    top: -1.5rem;
    background-color: white;
    margin: 0.1rem 0.1rem;
    height: 3rem;
    border-radius: 0.2rem;
  }

  .data-bottom-title {
    font-size: 0.3rem;
    padding: 0.2rem 0.3rem;
  }

  .data-bottom-text {
    font-size: 0.26rem;
    padding: 0.1rem 0.4rem;
  }

  .data-park-left {
    font-size: 0.3rem;
    padding-top: 0.4rem;
    padding-left: 0.5rem;
    width: 40%;
    float: left;
  }

  .data-park-right {
    font-size: 0.3rem;
    padding-top: 0.4rem;
    padding-right: 0.4rem;
    width: 47%;
    text-align: right;
    float: left;
  }

  .data-park-txt {
    position: relative;
    top: -0.05rem;
  }

  .carList {
    background-color: #F5F5F5;
    margin-left: 0.4rem;
    width: 25%;
    height: 0.6rem;
    line-height: 0.6rem;
    text-align: center;
    float: left;
    margin-bottom: 0.3rem;
  }

  .van-loading {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>

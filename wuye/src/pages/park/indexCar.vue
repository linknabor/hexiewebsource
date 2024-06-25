<template>
  <div class="main">
    <van-overlay :show="show_overlay">
      <van-loading type="spinner"/>
    </van-overlay>
    <van-skeleton title :row="3" :loading="loading">
      <div v-if="showFlag">
        <div class="data-top">
          <img src="../../assets/img/park.png">
        </div>
        <div class="data-head">
          <van-cell-group>
            <van-cell title="" :value="selectParkName" value-class="text-val" @click="goMap" is-link>
              <template #right-icon>
                <van-icon name="location" size="0.3rem" style="position: relative;top: 0.03rem"/>
                <span style="font-size: 0.3rem">{{selectParkName}}</span>
              </template>
            </van-cell>
          </van-cell-group>

          <plateNumber @getPlateLicense="getPlateLicense" :carNumber="carArray" :styleType="1" :butName="butName"
                       :isShowCheck="0"></plateNumber>
          <div style="margin: 0.2rem 0.6rem">
            <van-row type="flex">
              <van-col span="8" v-for="(item, index) in carList" :key="index" @click="clickCar(item.car_no)">
                <van-tag type="primary" size="medium" :color="item.car_no.length===8?'#07C180':''">{{ item.car_no }}</van-tag>
              </van-col>
            </van-row>
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
          <van-cell-group title="计费规则">
            <van-cell style="padding: 0.1rem 0.3rem" icon="info-o" :title="item.ruleName" v-for="(item, index) in ruleList"/>
          </van-cell-group>
        </div>

        <div style="margin-top: -1.2rem;text-align: center;font-size: 0.3rem;color: blue;">
          <van-icon name="info-o" style="position: relative;top: 0.05rem" /><span @click="queryBillCar">交包月停车费？</span>
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
            <van-cell :title="item.park_name" icon="location-o" :label="item.park_addr" center is-link
                      @click="checkCell(item)"/>
          </div>
        </van-list>
      </div>
    </van-skeleton>
    <user-login ref="userLogin" @getLoginUser="getLoginUser"></user-login>
  </div>
</template>

<script>
  import {
    Cell, CellGroup, Overlay, Loading,Col,Row,Tag,
    Skeleton,Icon,Grid,GridItem,Search,List,NavBar,Dialog,Switch,Toast,
  } from 'vant';
  import plateNumber from '@/components/plateNumber'
  import UserLogin from "@/components/UserLogin"
  import UserApi from "@/api/api.js"
  import ParkApi from "@/api/Park.js"
  import Storage from "@/util/storage.js"
  import {Base64} from 'js-base64'

  export default {
    name: "indexCar",
    components: {
      "user-login": UserLogin,
      plateNumber,
      [Overlay.name]: Overlay,
      [Loading.name]: Loading,
      [Skeleton.name]: Skeleton,
      [CellGroup.name]: CellGroup,
      [Cell.name]: Cell,
      [Col.name]: Col,
      [Row.name]: Row,
      [Tag.name]: Tag,
      [Grid.name]: Grid,
      [GridItem.name]: GridItem,
      [Icon.name]: Icon,
      [Search.name]: Search,
      [List.name]: List,
      [NavBar.name]: NavBar,
      [Dialog.Component.name]: Dialog.Component,
      [Switch.name]: Switch,
      [Toast.name]: Toast,
    },
    data() {
      return {
        oriParam: this.$route.query.param,
        oriParkId: '',
        show_overlay: true,
        loading: true,
        showFlag: true,
        searchValue: '',
        listLoading: false,
        finished: false,

        butName: '查询缴费',
        carArray:[],

        addCarImg: require('../../assets/img/addcar.png'),
        queryCarImg: require('../../assets/img/querycar.png'),

        selectCarNo: '',

        selectParkId: '',
        selectParkName: '',

        carList: [],

        parkInfo: '',

        parkList: [],

        ruleList: [],
      }
    },
    created() {
      setTimeout(() => {
        this.loading = false
      }, 1000) //延迟时间 这里是1秒
    },
    mounted() {
      this.show_overlay = true
      this.loading = true
      this.getParam()
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
        UserApi.login("163275", data)
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

      getParam() {
        if(this.oriParam === undefined) {
          return;
        }
        let theRequest = {};
        let param = Base64.decode(this.oriParam);
        let params = param.split("&");
        for (let i = 0; i < params.length; i++) {
          theRequest[params[i].split("=")[0]] = decodeURI(params[i].split("=")[1]);
        }
        if(theRequest.parkId !== '' && theRequest.parkId !== undefined) {
          this.oriParkId = theRequest.parkId;
        }
      },

      initCar() {
        if (this.oriParkId === undefined) {
          this.oriParkId = "";
        }
        let param = {
          parkId: this.oriParkId
        }
        ParkApi.getIndexCar(param).then((response) => {
          let data = response.data
          if (data && data.success) {
            this.carList = data.result.carList
            this.parkInfo = data.result.parkInfo
            this.selectParkName = this.parkInfo.park_name;
            this.selectParkId = this.parkInfo.park_id;
            this.ruleList = this.parkInfo.ruleList
          }
        })
      },
      onLoad() {
        this.finished = true
      },
      getPlateLicense(oper, data, checked) {
        if('clear' === oper) {
          this.carArray.splice(0)
        } else {
          window.location.href = this.basePageUrl + "parkPay.html?carNo=" + data + "&parkId=" + this.selectParkId
        }
      },

      goMap() {
        this.show_overlay = true
        this.showFlag = false
        let param = {
          parkName: this.searchValue
        }
        ParkApi.getParkList(param).then((response) => {
          let data = response.data
          if (data && data.success) {
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
      goClear() {
        this.carArray.splice(0)
      },
      clickCar(carNo) {
        this.goClear()
        var strs = carNo.split("")
        for (let i = 0; i < strs.length; i++) {
          this.$set(this.carArray, i, strs[i])
        }
      },

      addCar() {
        this.$router.push('/addCar');
      },

      queryPay() {
        this.$router.push('/queryCarPay');
      },

      queryBillCar() {
        this.$router.push({
          path: '/queryBillCar',
          query: {
            parkId: this.selectParkId,
            carList: JSON.stringify(this.carList),
            allow_car_pay_type: this.parkInfo.allow_car_pay_type,
          }
        })
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
    margin: 0 0.05rem;
    border-radius: 0.5rem;
    height: auto !important;
    min-height: 4.5rem;
    padding: 0.1rem 0.1rem;

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

  .van-loading {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .text-val {
    color: #323233;
  }
</style>

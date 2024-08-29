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
          <van-cell-group style="margin-top: 0.1rem">
            <van-cell title="" :value="selectParkName" value-class="text-val" @click="goMap" is-link>
              <template #right-icon>
                <van-icon name="location" size="0.3rem" style="position: relative;top: 0.03rem"/>
                <span style="font-size: 0.3rem">{{selectParkName}}</span>
              </template>
            </van-cell>
          </van-cell-group>

          <plateNumber @getPlateLicense="getPlateLicense" :carObj="carObj"></plateNumber>

          <div style="margin: 0px 0.6rem;line-height: 0.8rem;">
            <van-row type="flex">
              <van-col span="8" v-for="(item, index) in carList" :key="index" @click="clickCar(item.car_no)">
                <van-tag type="primary" size="large" :color="item.car_no.length===8?'#07C180':''">{{ item.car_no }}</van-tag>
              </van-col>
            </van-row>
          </div>
        </div>
        <div style="clear:both"></div>
        <div class="data-mid">
          <van-grid direction="horizontal" :column-num="2">
            <van-grid-item @click="addCar">
              <template #icon>
                <van-icon :name="addCarImg" size="0.6rem"/>
              </template>
              <template #text>
                <span style="margin-left: 0.1rem;">添加车辆</span>
              </template>
            </van-grid-item>
            <van-grid-item @click="queryPay">
              <template #icon>
                <van-icon :name="queryCarImg" size="0.6rem"/>
              </template>
              <template #text>
                <span style="margin-left: 0.1rem;">停车记录</span>
              </template>
            </van-grid-item>
          </van-grid>
        </div>

        <div class="data-bottom">
          <van-cell-group title="计费规则">
            <van-cell style="padding: 0.1rem 0.3rem" icon="info-o" :title="item.ruleName" v-for="(item, index) in ruleList" :key="index"/>
          </van-cell-group>
        </div>

        <div style="margin-top: -1.2rem;text-align: center;font-size: 0.3rem;color: blue;">
          <van-icon name="info-o" style="position: relative;top: 0.05rem" /><span @click="queryBillCar">交包月停车费？</span>
        </div>
      </div>

      <div id="mapList" v-if="!showFlag">
        <van-nav-bar title="停车场列表" left-text="返回" left-arrow @click-left="goBack"/>
        <div>
          <van-search style="padding-right:0.2rem" v-model="searchValue" @search="onSearch" show-action placeholder="请输入停车场名称">
            <template slot="action">
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
  </div>
</template>

<script>
  import {
    Cell, CellGroup, Overlay, Loading,Col,Row,Tag,
    Skeleton,Icon,Grid,GridItem,Search,List,NavBar,Dialog,Switch,Toast,
  } from 'vant';
  import plateNumber from '@/components/plateNumber'
  import ParkApi from "@/api/Park.js"
  import Storage from "@/util/storage.js"
  export default {
    name: "parkInfo",
    components: {
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
        show_overlay: true,
        loading: true,
        parkId: this.$route.query.parkId, //停车场ID
        scanChannel: this.$route.query.scanChannel, //3微信公众号扫的 1支付宝扫的
        userInfo:{},
        
        showFlag: true,
        searchValue: '',
        listLoading: false,
        finished: false,
        carObj:{
          carNums:[],
          isDefault: false,
          showBtnType: 0,
        },
        addCarImg: require('../../assets/img/addcar.png'),
        queryCarImg: require('../../assets/img/querycar.png'),
        selectParkId: '',
        selectParkName: '',
        carList: [],
        parkInfo: '',
        parkList: [],
        ruleList: [],
        allow_car_pay_type:'1',
      }
    },
    created() {
      this.userInfo = Storage.get('userInfo')
      setTimeout(() => {
        this.loading = false
      }, 1000) //延迟时间 这里是1秒
    },
    mounted() {
      this.show_overlay = true
      this.loading = true
      this.initCar()
      this.loading = false
      this.show_overlay = false
    },
    methods: {
      initCar() {
        if(!this.userInfo) {
          Toast.fail('登录失败，请刷新重试')
          return
        }
        if (this.parkId === undefined) {
          this.parkId = ''
        }
        let param = {
          parkId: this.parkId,
          scanChannel: this.scanChannel,
        }

        ParkApi.getIndexCar(param).then((response) => {
          let data = response.data
          if (data && data.success) {
            this.carList = data.result.carList
            this.parkInfo = data.result.parkInfo
            if(!this.parkInfo.park_id) {
                this.selectParkName = '请选择停车场'
            } else {
              this.selectParkName = this.parkInfo.park_name
              this.selectParkId = this.parkInfo.park_id
              this.ruleList = this.parkInfo.ruleList
              this.allow_car_pay_type = this.parkInfo.allow_car_pay_type
            }
          }
        })
      },
      onLoad() {
        this.finished = true
      },
      getPlateLicense(oper, data) {
        if('clear' === oper) {
          this.goClear()
        } else if('query' === oper) {
          if(!this.selectParkId) {
              Toast.fail('请选择停车场')
              return
          }

          this.$router.push({
          path: '/parkPayingDetail',
            query: {
              dataType: '1', //临停
              carNo: data,
              parkId: this.selectParkId,
              scanChannel: this.scanChannel,
              channelId: '', //默认给空
            }
          })
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
        this.allow_car_pay_type = item.allow_car_pay_type
      },

      goBack() {
        this.showFlag = true
      },
      goClear() {
        this.carObj.carNums.splice(0)
      },
      clickCar(carNo) {
        this.goClear()
        var strs = carNo.split("")
        for (let i = 0; i < strs.length; i++) {
          this.$set(this.carObj.carNums, i, strs[i])
        }
      },

      //新增车辆
      addCar() {
        this.$router.push('/addCar');
      },

      //停车缴费记录
      queryPay() {
        this.$router.push('/queryParkPayDetail');
      },

      //包月车缴费
      queryBillCar() {
        this.$router.push({
          path: '/queryParkFixBill',
          query: {
            parkId: this.selectParkId,
            parkName: this.selectParkName,
            carList: JSON.stringify(this.carList),
            allow_car_pay_type: this.allow_car_pay_type,
            scanChannel: this.scanChannel
          }
        })
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

  .van-cell-group__title {
    font-size: 0.28rem;
  }
</style>

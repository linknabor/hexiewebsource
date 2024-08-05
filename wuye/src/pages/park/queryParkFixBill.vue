<template>
  <div class="main">
    <van-overlay :show="showOverlay">
      <van-loading type="spinner"/>
    </van-overlay>

    <van-skeleton title :row="3" :loading="loading">
      <van-cell-group title="缴费方式">
        <div class="data-head">
          <van-radio-group v-model="queryType" direction="horizontal" @change="changeQueryType">
            <li v-for="(item, index) in allow_car_pay_type" :key="index">
              <van-radio v-if="item!==','" :name="item" checked-color="var(--primary-color)">{{item==='1'?'按账单缴费':'按月缴费'}}</van-radio>
            </li>
            
          </van-radio-group>
        </div>
      </van-cell-group>

      <van-cell-group title="缴费月数" v-if="queryType==='2'">
        <div class="data-head">
          <van-stepper v-model="months" max="12" disable-input @change="onChangeStepper"/>
        </div>
      </van-cell-group>

      <van-cell-group v-if="carList.length > 0">
        <template #title>
          <div class="mycar">
            <span>我的车</span>
            <span style="color: red;font-weight: bold">(点击车牌快速填充)</span>
          </div>
        </template>
        <div style="margin: 0px 0.6rem;line-height: 0.8rem;">
          <van-row type="flex">
            <van-col span="8" v-for="(item, index) in carList" :key="index" @click="clickCar(item.car_no)">
              <van-tag type="primary" size="medium" :color="item.car_no.length===8?'#07C180':''">{{ item.car_no }}</van-tag>
            </van-col>
          </van-row>
        </div>
      </van-cell-group>

      <div style="margin: 0.1rem">
        <plateNumber @getPlateLicense="getPlateLicense" :carObj="carObj"></plateNumber>
      </div>

      <van-cell-group title="账单详情" v-if="billInfos.length > 0">
        <div v-if="queryType==='1'">
          <BillList ref="parentBillComponent" :bill-info="billInfos" @itemClick="itemClick"></BillList>
        </div>
        <div class="data-head" v-if="queryType === '2'">
          <div v-for="(item,index) in billInfos" :key="index">
            <van-cell title="缴费周期" :value="''.concat(months).concat('个月')" value-class="text-val" style="padding: 0.1rem"/>
            <van-cell :title="item.service_fee_name" :label="item.pay_cell_addr" :value="'￥'.concat(item.fee_price)" value-class="text-val" style="padding: 0.1rem"/>
            <van-cell :title="item.service_fee_cycle" style="padding: 0.1rem"/>
          </div>
        </div>
      </van-cell-group>

      <div style="height: 1rem;width: 100%"></div>

      <div class="btn-fixed" v-if="billInfos.length > 0" >
        <div class="checkRadio" v-if="queryType !== '2'">
          <van-checkbox class="checkboxStyle" checked-color="var(--primary-color)" v-model="allChecked" @click="checkAll">
            <template #default>
              <span style="color: white">全选</span>
            </template>
          </van-checkbox>
        </div>
        <div class="btn" :style="queryType==='2'?'width: 100%;':''">
          <van-button type="primary" block color="var(--primary-color)"
                      @click="pays">我要缴费 ￥{{
              allPrice
            }}
          </van-button>
        </div>
      </div>
    </van-skeleton>

  </div>
</template>

<script>
  import {
    Overlay,
    Loading,
    Skeleton,
    Col,
    Row,
    Tag,
    Cell,
    CellGroup,
    Button,
    Checkbox,
    CheckboxGroup,
    Stepper,
    RadioGroup,
    Radio,
    Dialog, Toast
  } from 'vant';
  import BillList from '../../components/BillListV2.vue';
  import plateNumber from '../../components/plateNumber';
  import ParkApi from "@/api/Park.js"

  export default {
    name: "queryParkFixBill",
    components: {
      BillList,
      plateNumber,
      [Overlay.name]: Overlay,
      [Loading.name]: Loading,
      [Skeleton.name]: Skeleton,
      [Col.name]: Col,
      [Row.name]: Row,
      [Tag.name]: Tag,
      [Stepper.name]: Stepper,
      [Cell.name]: Cell,
      [CellGroup.name]: CellGroup,
      [Button.name]: Button,
      [CheckboxGroup.name]: CheckboxGroup,
      [Checkbox.name]: Checkbox,
      [RadioGroup.name]: RadioGroup,
      [Radio.name]: Radio
    },
    data() {
      return {
        showOverlay: true,
        loading: true,
        parkId: this.$route.query.parkId,
        parkName: this.$route.query.parkName,
        allow_car_pay_type: this.$route.query.allow_car_pay_type,
        scanChannel: this.$route.query.scanChannel, //3微信公众号扫的 1支付宝扫的
        allow_car_pay_list :[],
        queryType: '1', //缴费方式
        carObj:{
          carNums:[],
          isDefault: false,
          showBtnType: 2,
        },

        carList: JSON.parse(this.$route.query.carList),

        months: 1, //缴费月数
        permit_skip_car_pay: '1', //是否允许跳帐，默认不允许
        billInfos: [],

        allChecked: false,
        reduceMode: '', //减免模式

        
      }
    },
    computed: {
      allPrice: function () {
        let ap = 0
        for (let i in this.billInfos) {
          if (this.billInfos[i].selected == true) {
            ap += Number(this.billInfos[i].fee_price)
          }
        }
        return parseFloat(ap).toFixed(2)
      },
    },
    mounted() {
      setTimeout(() => {
        if(this.allow_car_pay_type !== undefined) {
          const arr = this.allow_car_pay_type.split(",")
          this.queryType = arr[0]
        }
        this.loading = false
        this.showOverlay = false
      }, 1000) //延迟时间 这里是1秒
    },
    methods: {
      changeQueryType() {
        this.billInfos = []
      },
      onChangeStepper() {
        this.billInfos = []
      },
      getPlateLicense(oper, carNo) {
        if('clear' === oper) {
          this.goClear()
        } else if('query' === oper) {
          this.showOverlay = true
          let param = {
            park_id: this.parkId,
            car_no: carNo,
            query_type: this.queryType,
            pay_months: this.months,
          }
          ParkApi.getCarBillList(param).then((response) => {
            let data = response.data
            if (data.success) {
              if (data.result == null || data.result.length === 0) {
                Dialog({message: '车牌输入有误或没有可缴的账单'})
              } else {
                this.billInfos = data.result.bills
                this.permit_skip_car_pay = data.result.permit_skip_car_pay
                this.reduceMode = data.result.reduce_mode

                if(this.queryType === '2') {
                  for (let i in this.billInfos) {
                    if (this.$set(this.billInfos[i], "selected", true)) {
                      this.$set(this.billInfos[i], "selected", true)
                    }
                  }
                }
              }
            } else {
              Toast.fail(data.message)
            }
            this.showOverlay = false
          })
        }
      },
      clickCar(carNo) {
        this.goClear()
        var strs = carNo.split("")
        for (let i = 0; i < strs.length; i++) {
          this.$set(this.carObj.carNums, i, strs[i])
        }
      },

      goClear() {
        this.carObj.carNums.splice(0)
        this.billInfos = []
      },
      itemClick(index) {
        let len = this.billInfos.length
        if (this.permit_skip_car_pay === "1") {
          if(this.billInfos[index].selected) { //选中->取消
            this.$refs.parentBillComponent.checkedObj.splice(index)
            for (let i = index; i < len; i++) {
              //后面的全部取消选中
              this.$set(this.billInfos[i], "selected", false)
            }
          } else {
            this.$refs.parentBillComponent.checkedObj.splice(0)
            for (let i = 0; i <= index; i++) {
              this.$refs.parentBillComponent.checkedObj.push(i)
              this.$set(this.billInfos[i], "selected", true)
            }
          }
        } else {
          if (this.billInfos[index].selected) {
            //选中状态下
            this.$set(this.billInfos[index], "selected", false)
            //某一个点击了取消后全选消失
            this.allChecked = false
          } else {
            //未选中状态下，前面全部选中
            this.$set(this.billInfos[index], "selected", true)
          }
        }
      },
      checkAll() {
        this.$refs.parentBillComponent.$refs.checkboxGroup.toggleAll(this.allChecked)
        if(this.allChecked) { //全选
          for (let i in this.billInfos) {
            if (this.$set(this.billInfos[i], "selected", true)) {
              this.$set(this.billInfos[i], "selected", true)
            }
          }
        } else {
          for (let i in this.billInfos) {
            this.$set(this.billInfos[i], "selected", false)
          }
        }
      },
      pays() {
        if (this.allPrice < 0.01) {
          Dialog({message: '请选择账单后支付'})
          return
        }
        let bills = ''
        if(this.queryType === '1') {
          let arr = this.$refs.parentBillComponent.checkedObj
          for (let i in arr) {
            bills += this.billInfos[i].bill_id + ","
          }
          if(bills.length > 0) {
            bills = bills.substring(0, bills.length -1)
          }
        } else {
          bills = this.billInfos[0].bill_id
        }

        this.$router.push({
          path: '/parkPayingDetail',
          query: {
            billIds: bills,
            totalPrice: this.allPrice,
            reduceMode: this.reduceMode,
            parkName: this.parkName,
            dataType: '2', //包月
            scanChannel: this.scanChannel
          }
        })
      }
    }
  }
</script>

<style>
  .van-loading {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .data-head {
    margin: 0 0.3rem;
    padding: 0.1rem 0.4rem;
  }

  .van-cell-group__title {
    font-size: 0.28rem;
  }

  .mycar {
    padding: 16px 16px 8px;
    color: #969799;
    font-size: 0.28rem;
    line-height: 16px;
  }

  .van-radio__label {
    width: 100% !important;
  }

  .btn-fixed {
    position: fixed;
    left: 10px;
    right: 10px;
    bottom: .3rem;
    text-align: center;
  }

  .checkRadio {
    width: 1.5rem;
    float: left;
    background-color: rgba(0, 0, 0, 0.6);
    margin-left: 0.3rem;
    border-radius: 0.1rem 0 0 0.1rem;
  }

  .checkboxStyle {
    height: 0.83rem;
    margin-left: 0.2rem
  }

  .btn {
    width: 70%;
    float: left
  }
</style>

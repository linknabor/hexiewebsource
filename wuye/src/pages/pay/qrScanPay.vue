<template>
  <div class="main">
    <van-overlay v-show="showOverlay" class="sect-laoding" z-index="99">
    </van-overlay>
    <van-loading type="spinner" v-show="pageLoading" class="page-laoding"></van-loading>
    <div class="sect-location">
      <van-icon name="location-o" size="1.75em" />
      <div class="sect-info">
        <div class="sect-name">{{ sectName }}</div>
        <div class="sect-addr">{{ sectAddr }}</div>
      </div>
    </div>
    <div class="cell-select">
      <van-cell-group :border="false" inset title="缴费房屋">
        <van-field :value="showAddr" placeholder="请选择缴费房屋" @click="selectAddr" :border="false" is-link readonly />
      </van-cell-group>
    </div>
    <div v-if="bills && bills.length > 0">
      <van-cell-group :border="false" inset title="缴费账单"></van-cell-group>
      <van-list v-model="billLoading" direction="up" :finished="billFinished" finished-text="" @load="onBillLoad">
        <van-checkbox-group v-model="checkedBills" @change="onChangeBill">
          <van-cell-group inset v-for="(item, index) in bills" :key="item.bill_id" @click="toggle(index)">
            <div class="bill-selection">
              <div class="select-box">
                <van-checkbox :value="item.selected" checked-color="var(--primary-color)" :name="item.bill_id"
                  ref="checkboxes" @click="noToggle"></van-checkbox>
              </div>
              <div class="cell-bills">
                <van-cell>
                  <div class="bill-price">￥{{ item.fee_price }}</div>
                  <div slot="label">{{ item.pay_cell_addr }}</div>
                  <div slot="title">{{ item.service_fee_name }} {{ item.service_fee_cycle }}</div>
                </van-cell>
              </div>
            </div>
          </van-cell-group>
        </van-checkbox-group>
      </van-list>
      <div class="no-more" v-if="billFinished">没有更多了</div>
      <div style="width: 100%; height: 5.5vh;"></div>
      <van-submit-bar :price="totalPrice" button-text="去支付" safe-area-inset-bottom @submit="onSubmit"
        v-if="bills && bills.length > 0">
        <van-checkbox v-model="allChecked" @click="onChangeCheckAll" v-if="billFinished">全选</van-checkbox>
      </van-submit-bar>

    </div>
    <van-popup v-model="showPickerPopup" @close="onPopupClose" position="bottom" :style="{ height: '45%' }"
      :overlay-style="{ zIndex: 98 }" safe-area-inset-bottom round closeable>
      <div class="pop-header">请选择要缴费的房屋地址</div>
      <van-cell v-if="buildViewVisible" title="选择楼幢" @click="selectBuild" :value="buildAddr" is-link />
      <van-cell v-if="unitViewVisible" title="选择门牌" @click="selectUnit" :value="unitAddr" is-link />
      <van-cell v-if="cellViewVisible" title="选择房屋单元" @click="selectCell" :value="cellAddr" is-link />

      <div v-if="cellId" class="confirm-btn">
        <van-button type="info" block @click="confirmCell">确定</van-button>
      </div>
    </van-popup>
    <div class="picker-layer">
      <van-picker v-if="showBuildPicker" title="请选择楼幢" show-toolbar :columns="builds" @confirm="onBuildConfirm"
        @cancel="onBuildCancel" @change="onBuildChange" />

      <van-picker v-if="showUnitPicker" title="请选择门牌" show-toolbar :columns="units" @confirm="onUnitConfirm"
        @cancel="onUnitCancel" @change="onUnitChange" />

      <van-picker v-if="showCellPicker" title="请选择房屋单元" show-toolbar :columns="cells" @confirm="onCellConfirm"
        @cancel="onCellCancel" @change="onCellChange" />
    </div>
    <user-info @getUserInfo="getUserInfo"></user-info>
  </div>
</template>

<script>
import {
  Overlay, Dialog, Loading, Icon, Field, Popup, CellGroup,
  Cell, Picker, Button, List, Checkbox, CheckboxGroup, PullRefresh, SubmitBar
} from "vant"
import BaseInfoApi from '@/api/BaseInfoApi.js'
import UserInfo from "../../components/UserInfo.vue"
import baseInfoApi from "../../api/BaseInfoApi"
import WuyepayApi from "../../api/WuyepayApi"

export default {
  data() {
    return {
      userInfo: {},
      showOverlay: true,
      oriApp: '',
      sectId: '',
      sectName: '',
      sectAddr: '',
      province: '',
      clientType: '0',

      pageLoading: false,
      showPickerPopup: false,
      showBuildPicker: false,
      showUnitPicker: false,
      showCellPicker: false,
      builds: [],
      buildMap: {},
      units: [],
      unitMap: {},
      cells: [],
      cellMap: {},
      buildId: '',
      unitId: '',
      cellId: '',
      buildAddr: '',
      unitAddr: '',
      cellAddr: '',
      showAddr: '',
      buildViewVisible: false,
      unitViewVisible: false,
      cellViewVisible: false,

      billLoading: false,
      billFinished: false,

      bills: [],
      checkedBills: [],
      totalPrice: 0,
      currentPage: 1,
      permit_skip_pay: '',
      pay_least_month: '',
      reduceMode: '',
      allChecked: false
    }
  },
  components: {
    "user-info": UserInfo,
    [Overlay.name]: Overlay,
    [Loading.name]: Loading,
    [Icon.name]: Icon,
    [Field.name]: Field,
    [Popup.name]: Popup,
    [CellGroup.name]: CellGroup,
    [Cell.name]: Cell,
    [Picker.name]: Picker,
    [Button.name]: Button,
    [List.name]: List,
    [Checkbox.name]: Checkbox,
    [CheckboxGroup.name]: CheckboxGroup,
    [PullRefresh.name]: PullRefresh,
    [SubmitBar.name]: SubmitBar

  },
  mounted() {

    // const uncheckedMinFeeDate = '20251211'
    // let year = uncheckedMinFeeDate.substring(0, 4) + '年'
    // let month = uncheckedMinFeeDate.substring(4, 6)
    // let monthNum = parseInt(month)
    // month = monthNum + '月'
    // let day = ''
    // if (uncheckedMinFeeDate.length > 6) {
    //   day = uncheckedMinFeeDate.substring(6, 8)
    //   let dayNum = parseInt(day)
    //   day = dayNum + '日'
    // }
    // let uncheckedDate = year + month + day
    // console.log('uncheckedDate : ' + uncheckedDate)

    // let feeDateStr = '2025年2月'
    // let year = feeDateStr.substring(0, 4)
    // let month = feeDateStr.substring(feeDateStr.indexOf('年') + 1, feeDateStr.indexOf('月'))
    // if (month.length == 1) {
    //   month = '0' + month
    // }
    // let day = ''
    // if (feeDateStr.indexOf('日') > -1) {
    //   day = feeDateStr.substring(feeDateStr.indexOf('月') + 1, feeDateStr.indexOf('日'))
    //   if (day.length == 1) {
    //     day = '0' + day
    //   }
    // }
    // feeDateStr = year + month + day
    // console.log('1feeDateStr : ' + feeDateStr)

    //初始化参数
    const oriApp = this.getUrlParam("oriApp")
    const sectId = this.getUrlParam("id")
    this.oriApp = oriApp
    this.sectId = sectId
  },
  watch: {
    userInfo: {
      handler(newVal) {
        if (newVal && newVal.id) {
          this.getSect()
        }
      }
    },
    sectName: {
      handler(newVal) {
        if (newVal) {
          this.getBaseInfo(this.sectId, '', '', '03')
        }
      }
    },
    units: {
      handler(val) {
        if (val && val.length > 0) {
          this.pageLoading = true
          setTimeout(() => {
            this.pageLoading = false
            this.showUnitPicker = true
            this.showPickerPopup = false
          }, 200);
        }
      }
    },
    cells: {
      handler(val) {
        if (val && val.length > 0) {
          this.pageLoading = true
          setTimeout(() => {
            this.pageLoading = false
            this.showCellPicker = true
            this.showPickerPopup = false
          }, 200);
        }
      }
    }
  },
  methods: {
    getUserInfo(result) {
      this.userInfo = result;
    },
    getSect() {
      if (!this.sectId) {
        Dialog({
          message: '未获取到项目信息！'
        })
        return false
      }
      BaseInfoApi.mySect(this.sectId, this.clientType).then(response => {
        const data = response.data
        this.showOverlay = false
        if (data.success) {
          this.province = data.result.province_name
          this.sectId = data.result.sect_id
          this.sectName = data.result.sect_name
          this.sectAddr = data.result.sect_addr
          // this.checkSect()
        } else {
          Dialog({ message: data.message })
          this.province = '上海市'
        }
      }).catch(err => {
        Dialog({ message: err })
        this.province = '上海市'
      })
    },
    checkSect() {
      this.$router.push({
        path: "/Pay",
        query: { selected: "d", userunit: this.sectName, queryID: this.sectId, City: this.province }
      })
    },
    selectAddr() {
      this.showPickerPopup = true
      let buildViewVisible = this.buildViewVisible
      let unitViewVisible = this.unitViewVisible
      let cellViewVisible = this.cellViewVisible
      if (this.builds.length > 0) {
        buildViewVisible = true
      }
      unitViewVisible = true
      cellViewVisible = true
      this.buildViewVisible = buildViewVisible
      this.unitViewVisible = unitViewVisible
      this.cellViewVisible = cellViewVisible
    },
    selectBuild() {
      this.showOverlay = true
      this.showBuildPicker = true
      this.showPickerPopup = false
    },
    selectUnit() {
      if (this.builds.length > 0 && !this.buildId) {
        Dialog.alert({
          message: '请先选择楼幢',
        })
        return false
      }
      this.showOverlay = true
      if (!this.showUnitPicker) {
        this.getBaseInfo(this.sectId, this.buildId, '', '02')
      }
    },
    selectCell() {
      if (!this.buildId && !this.unitId) {
        Dialog.alert({
          message: '请先选择楼栋或者门牌',
        })
        return false
      }
      this.showOverlay = true
      if (!this.showCellPicker) {
        this.getBaseInfo(this.sectId, this.buildId, this.unitId, '01')
      }
    },
    getBaseInfo(sectId, buildId, unitId, dataType) {
      const param = {
        sect_id: sectId,
        build_id: buildId,
        unit_id: unitId,
        data_type: dataType
      }
      if (dataType == '01') {
        this.pageLoading = true
      }
      baseInfoApi.getBaseInfo(param).then((response) => {
        this.pageLoading = false
        if (response.data.success) {
          const result = response.data.result
          const build_info = result.build_info
          const unit_info = result.unit_info
          const cell_info = result.house_info
          if (dataType == '03') {
            if (build_info && build_info.length > 0) {
              let builds = []
              let buildMap = new Map()
              build_info.forEach(element => {
                // const build = {
                //   label: element.name,
                //   value: element.id
                // }
                // buildMap.set(element.id, element.name)
                // builds.push(build)
                buildMap.set(element.name, element.id)
                builds.push(element.name)
              })
              this.builds = builds
              this.buildMap = buildMap
            } else {
              // this.getBaseInfo(this.data.sectId, '', '', '02') // 03门牌
            }
          } else if (dataType == '02') {
            if (unit_info && unit_info.length > 0) {
              let units = []
              let unitMap = new Map()
              unit_info.forEach(element => {
                // const unit = {
                //   label: element.name,
                //   value: element.id
                // }
                // unitMap.set(element.id, element.name)
                // units.push(unit)
                unitMap.set(element.name, element.id)
                units.push(element.name)
              })
              if (units.length > 0) {
                this.units = units
                this.unitMap = unitMap
              }
            } else {
              this.unitAddr = '无门牌'
              Dialog.alert({
                message: '楼幢下无门牌，请直接选择房屋单元'
              })
              return false
            }
          } else if (dataType == '01') {
            if (cell_info && cell_info.length > 0) {
              let cells = []
              let cellMap = new Map()
              cell_info.forEach(element => {
                const cell = {
                  label: element.name,
                  value: element.id
                }
                // cellMap.set(element.id, element.name)
                // cells.push(cell)
                cellMap.set(element.name, element.id)
                cells.push(element.name)
              })
              if (cells.length > 0) {
                this.cells = cells
                this.cellMap = cellMap
              }
            }
          }
        } else {
          this.pageLoading = false
          Dialog.alert({
            title: '错误',
            message: response.data.message,
          }).then(() => {
            return false
          })
        }
      }).catch((error) => {
        this.pageLoading = false
        Dialog.alert({
          title: '错误',
          message: error,
        }).then(() => {
          return false
        })
      })
    },
    onBuildCancel() {
      this.showBuildPicker = false
      this.showOverlay = false
      this.showPickerPopup = true
    },
    onBuildConfirm(e) {
      const buildId = this.buildMap.get(e)
      const oriBuildId = this.buildId
      if (buildId != oriBuildId) {
        this.unitId = ''
        this.unitAddr = ''
        this.cellId = ''
        this.cellAddr = ''
        this.showAddr = ''
      }
      this.buildId = buildId
      this.buildAddr = e
      this.showBuildPicker = false
      this.showPickerPopup = true
    },
    onBuildChange() {
    },

    onUnitCancel() {
      this.showUnitPicker = false
      this.showOverlay = false
      this.showPickerPopup = true
    },
    onUnitConfirm(e) {
      const unitId = this.unitMap.get(e)
      const oriUnitId = this.unitId
      this.unitId = unitId
      this.unitAddr = e
      this.showUnitPicker = false
      this.showPickerPopup = true
      if (oriUnitId != unitId) {
        this.cellId = ''
        this.cellAddr = ''
        this.showAddr = ''
      }
    },
    onUnitChange() {
    },

    onCellCancel() {
      this.showCellPicker = false
      this.showOverlay = false
      this.showPickerPopup = true
    },
    onCellConfirm(e) {
      const cellId = this.cellMap.get(e)
      this.cellId = cellId
      this.cellAddr = e
      this.showCellPicker = false
      this.showPickerPopup = true
    },
    onCellChange() {
    },
    confirmCell() {
      let buildAddr = ''
      let unitAddr = ''
      if (this.unitId) {
        unitAddr = this.unitAddr
      }
      if (this.buildId) {
        buildAddr = this.buildAddr
      }
      const cellAddr = this.cellAddr
      let showAddr = buildAddr + unitAddr + cellAddr
      this.showAddr = showAddr
      this.closeAddrPop()
      this.onCheckCellLoad()
    },
    onPopupClose() {
      // console.log('onPopupClose')
      if(!this.showBuildPicker && !this.showUnitPicker && !this.showCellPicker) {
        this.showOverlay = false
      }
    },
    closeAddrPop() {
      this.buildViewVisible = false
      this.unitViewVisible = false
      this.cellViewVisible = false
      this.showBuildPicker = false
      this.showUnitPicker = false
      this.showCellPicker = false
      this.showPickerPopup = false
      this.showOverlay = false
    },
    onBillLoad() {
      if (this.cellId) {
        this.queryBillList()
      } else {
        this.billLoading = false
      }
    },
    onCheckCellLoad() {
      this.bills = []
      this.checkedBills = []
      this.totalPrice = 0.00
      this.currentPage = 1
      this.billFinished = false
      this.billLoading = false

      if (this.cellId) {
        this.queryBillList()
      }
    },
    queryBillList() {
      this.pageLoading = true
      const reqParam = {
        regionname: this.province,
        sect_id: this.sectId,
        house_id: this.cellId,
        startDate: "",
        endDate: "",
        payStatus: "02",
        totalCount: 0,
        currentPage: this.currentPage,
      }
      WuyepayApi.getBill(reqParam).then((response) => {
        this.billLoading = false
        this.pageLoading = false
        const result = response.data.result
        if (response.data.success) {
          if (result && result.bill_info && result.bill_info.length > 0) {
            this.currentPage += 1
            this.permit_skip_pay = result.permit_skip_pay
            // this.permit_skip_pay = '0' for test
            this.pay_least_month = result.pay_least_month
            this.reduceMode = result.reduce_mode
            const queryBills = result.bill_info
            this.bills = this.bills.concat(queryBills)
          } else {
            this.billFinished = true
            if (this.currentPage == 1) {
              Dialog.alert({
                message: '没有可以缴费的账单。'
              })
            } else {

            }
          }
        } else {
          Dialog.alert({
            title: '错误',
            message: response.data.message,
          }).then(() => {
            return false
          })
        }
      }).catch((error) => {
        this.billLoading = false
        this.pageLoading = false
        Dialog.alert({
          title: '错误',
          message: error,
        }).then(() => {
          return false
        })
      })
    },
    onChangeCheckAll() {
      if (this.allChecked) {
        const checkedBills = []
        this.bills.forEach(bill => {
          checkedBills.push(bill.bill_id)
        })
        this.checkedBills = checkedBills
      } else {
        this.checkedBills = []
      }
    },
    noToggle() {
    },
    toggle(index) {
      if (this.permit_skip_pay == '1') {
        // 选中操作
        const totalSize = this.bills.length
        if (!this.$refs.checkboxes[index].checked) {
          for (var i = 0; i <= totalSize; i++) {
            if (i <= index) {
              if (!this.$refs.checkboxes[i].checked) {
                this.$refs.checkboxes[i].toggle()
              }
            } else {
              //这一段else是不成立的，因为不允许跳帐，选不到下面的
              // if(this.$refs.checkboxes[i] && this.$refs.checkboxes[i].checked) {
              //   this.$refs.checkboxes[i].toggle()
              // }
            }
          }
        }
        //取消选中 
        else {
          for (var i = 0; i <= totalSize; i++) {
            if (i >= index) {
              if (this.$refs.checkboxes[i] && this.$refs.checkboxes[i].checked) {
                this.$refs.checkboxes[i].toggle()
              }
            }
          }
        }
      } else {
        this.$refs.checkboxes[index].toggle()
      }
    },
    onChangeBill() {
      let billMap = new Map()
      let indexMap = new Map()
      this.bills.forEach((bill, index) => {
        billMap.set(bill.bill_id, bill.fee_price)
        indexMap.set(bill.bill_id, index)
      })
      let totalPrice = 0.00
      let maxIndex = 0
      this.checkedBills.forEach(billId => {
        let priceStr = billMap.get(billId)
        let unitPrice = parseFloat(priceStr)
        totalPrice += unitPrice

        const index = indexMap.get(billId)
        if (index > maxIndex) {
          maxIndex = index
        }
      })
      totalPrice = totalPrice.toFixed(2)
      totalPrice *= 100
      this.totalPrice = totalPrice
      // 反选
      if (this.checkedBills.length == this.bills.length) {
        this.allChecked = true
      } else {
        this.allChecked = false
      }
      // console.log(maxIndex)
      // if (this.permit_skip_pay == '1' && this.checkedBills.length > 0) {
      //   let checkedBills = []
      //   for(let i = 0; i < this.bills.length; i++) {
      //     console.log('i:' +i)
      //     if(i < maxIndex) {
      //         console.log(this.bills[i])
      //         checkedBills.push(this.bills[i].bill_id)
      //     } else {
      //       break
      //     }
      //   }
      //   console.log(checkedBills)
      //   this.checkedBills = checkedBills
      // }
    },
    onSubmit() {
      if (!this.checkedBills || this.checkedBills.length == 0) {
        Dialog.alert({ message: '请选择账单后支付' })
        return false
      }
      let billMap = new Map()
      let uncheckedMinFeeDate = '0'
      this.bills.forEach(bill => {
        billMap.set(bill.bill_id, bill)
        if (this.checkedBills.indexOf(bill.bill_id) == -1) {
          let feeDateStr = bill.service_fee_cycle
          let year = feeDateStr.substring(0, 4)
          let month = feeDateStr.substring(feeDateStr.indexOf('年') + 1, feeDateStr.indexOf('月'))
          if (month.length == 1) {
            month = '0' + month
          }
          let day = ''
          if (feeDateStr.indexOf('日') > -1) {
            day = feeDateStr.substring(feeDateStr.indexOf('月') + 1, feeDateStr.indexOf('日'))
            if (day.length == 1) {
              day = '0' + day
            }
          }
          let billDate = year + month + day
          if (uncheckedMinFeeDate == '0') {
            uncheckedMinFeeDate = billDate
          } else {
            if (billDate < uncheckedMinFeeDate) {
              uncheckedMinFeeDate = billDate
            }
          }
        }
      })
      let checkedMaxFeeDate = '0'
      let checkedBillSet = new Set()
      this.checkedBills.forEach(element => {
        const checkedBill = billMap.get(element)
        let feeDateStr = checkedBill.service_fee_cycle
        let year = feeDateStr.substring(0, 4)
        let month = feeDateStr.substring(feeDateStr.indexOf('年') + 1, feeDateStr.indexOf('月'))
        if (month.length == 1) {
          month = '0' + month
        }
        let day = ''
        if (feeDateStr.indexOf('日') > -1) {
          day = feeDateStr.substring(feeDateStr.indexOf('月') + 1, feeDateStr.indexOf('日'))
          if (day.length == 1) {
            day = '0' + day
          }
        }
        let billDate = year + month + day
        checkedBillSet.add(billDate)
        if (checkedMaxFeeDate == '0') {
          checkedMaxFeeDate = billDate
        } else {
          if (billDate > checkedMaxFeeDate) {
            checkedMaxFeeDate = billDate
          }
        }
      })
      if (this.pay_least_month > 0) {
        if (this.pay_least_month > checkedBillSet.size) {
          Dialog.alert({ message: '请至少选择' + this.pay_least_month + '个月的账单进行支付。' })
          return false
        }
      }
      if (this.permit_skip_pay == '1') {
        if (this.checkedBills.length != this.bills.length && uncheckedMinFeeDate <= checkedMaxFeeDate) {
          let year = uncheckedMinFeeDate.substring(0, 4) + '年'
          let month = uncheckedMinFeeDate.substring(4, 6)
          let monthNum = parseInt(month)
          month = monthNum  + '月'
          let day = ''
          if (uncheckedMinFeeDate.length > 6) {
            day = uncheckedMinFeeDate.substring(6, 8)
            let dayNum = parseInt(day)
            day = dayNum + '日'
          }
          let uncheckedDate = year + month + day
          Dialog.alert({
            message: '仍有' + uncheckedDate + '的账单未勾选。'
          })
          return false
        }
      }
      let totalYuan = this.totalPrice / 100
      totalYuan = totalYuan.toFixed(2)
      let bills = this.checkedBills.join(',')
      let payUrl = this.basePageUrl + "wuyepay.html?" + this.oriApp + "#/?billIds=" + bills + "&stmtId=" +
        "&totalPrice=" + totalYuan + "&reduceMode=" + this.reduceMode + "&regionname=" + this.province + "&getversion=" + "02" + "&cardPayService=&payFeeType=01" + "&selected=d";
      window.location.href = payUrl
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../assets/less/mixin.less";

.main {
  background-color: #f7f8fa;
  width: 100%;
  min-height: 100vh;
  overflow-x: hidden;
}

.sect-laoding {
  display: flex;
  justify-content: center;
  align-items: center;
}

.page-laoding {
  position: fixed;
  top: 25vh;
  margin: 0 47%;
}

.sect-location {
  padding-top: 2vh;
  margin: 0 4%;
  display: flex;
  align-items: center;
}

.sect-info {
  display: flex;
  flex-direction: column;
}

.sect-name {
  font-size: 0.32rem;
  color: var(--primary-color);
  margin: 0 10px;
  font-weight: 600;
}

.sect-addr {
  font-size: 0.25rem;
  color: #969799;
  margin: 5px 10px;
}

.van-cell-group__title {
  color: #323233 !important;
  font-weight: 600;
}

.pop-header {
  display: flex;
  font-weight: 600;
  justify-content: center;
  padding: 3vh 0;
  font-size: 0.35rem;
}

.picker-layer {
  width: 100%;
  position: fixed;
  bottom: 0;
  z-index: 999;
}

.confirm-btn {
  width: 96%;
  margin: 0 2%;
  position: fixed;
  bottom: 3.5vh;
}

.cell-select {
  margin: 1vh 0;
}

.bill-selection {
  display: flex;
  align-items: center;
  width: 96%;
  margin: 0 0% 0 4%;
}

.cell-bills {
  width: 94%;
}

.cell-bills .van-cell__title {
  min-width: 75% !important;
}

.cell-bills .van-cell__label {
  min-width: 100%;
}

.cell-bills .van-cell__extra {
  min-width: 0%;
}

.cell-bills .van-cell__righticon {
  min-width: 0%;
}

.bill-price {
  font-weight: 500;
  color: var(--primary-color);
}

.no-more {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 2vh 0;
  color: grey;
}
</style>

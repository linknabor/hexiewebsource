<template>
  <div class="main">
    <van-overlay :show="show_overlay">
      <van-loading type="spinner"/>
    </van-overlay>

    <div class="title">
      <van-cell-group title="车主信息">
        <van-cell title-style="width: 4.5rem;flex: none;" v-for="(item,index) in respObj.pay_cell" :key="index" :title="item.cell_addr" :label="item.car_no" :value="item.cnst_area + ' m²'"/>
      </van-cell-group>
    </div>

    <div class="fee">
      <van-cell-group title="费用信息">
        <van-collapse v-model="activeName" accordion>
          <van-collapse-item v-for="(item,index) in feeList" :key="index" :title="item.service_fee_name" :label="'¥' + item.totalFee" :name="item.service_fee_name">
            <van-cell title-style="width: 4.5rem;flex: none;" v-for="(sub,idx) in item.fee_detail" :key="idx" :title="sub.service_fee_cycle" :value="'¥' + sub.fee_price"/>
          </van-collapse-item>
        </van-collapse>
      </van-cell-group>
    </div>

    <div class="payCount">
      <van-cell-group title="费用合计">
        <van-cell title="账单金额" :value="'¥' + respObj.total_fee_price"/>
      </van-cell-group>
    </div>

    <div class="invoice" v-show="respObj.show_invoice === '1' ">
      <van-cell-group title="开票信息">
        <van-cell title="是否需要发票">
          <template #value>
            <van-radio-group v-model="needInvoice" direction="horizontal" @change="onNeedInvoice">
              <van-radio name="1">是</van-radio>
              <van-radio name="0" v-show="respObj.is_default_invoice !== '1'">否</van-radio>
            </van-radio-group>
          </template>
        </van-cell>

        <van-cell title="申请发票类型" v-show="needInvoice === '1'">
          <template #value>
            <van-radio-group v-model="invoiceTitleType" direction="horizontal" @change="onInvoiceTitleType">
              <van-radio name="01">个人</van-radio>
              <van-radio name="02" v-show="respObj.show_com_flag !== '0'">公司</van-radio>
            </van-radio-group>
          </template>
        </van-cell>
        <div style="padding-left: 0.5rem;" v-show="invoiceTitleType === '02'">
          <van-field required v-model="invoiceTitle" label="发票抬头" placeholder="请输入公司全称" :error-message="errorTitle"/>
          <van-field required v-model="creditCode" label="公司税号" placeholder="请输入公司税号" :error-message="errorCredit"/>
        </div>

        <div style="color: red;margin: 0.3rem;line-height: 0.4rem">
          <h4 v-show="respObj.show_invoice_flag === '0'">支付后请前往物业管理处领取发票</h4>
          <h4 v-show="respObj.show_invoice_flag === '1'">申请的电子发票预计在3个工作日内通过短信/微信公众号发送至您手机上,请注意查收</h4>
        </div>
      </van-cell-group>
    </div>

    <div class="btn-fixed">
      <van-button type="primary" block color="var(--primary-color)" @click="btnPay">
        确认支付
      </van-button>
    </div>

  </div>
</template>

<script>
  import {Toast, Overlay, Loading, Button, Field, RadioGroup, Radio, Cell, CellGroup, Collapse, CollapseItem} from 'vant';
  import ParkApi from "@/api/Park.js"

  export default {
    name: "carBillPayDetail",
    data() {
      return {
        show_overlay: false,
        billIds: this.$route.query.billIds,
        reduceMode: this.$route.query.reduceMode,
        respObj:{},
        feeList:[],
        activeName:'',
        totalFeePrice: 0.00,
        needInvoice:'1',
        invoiceTitleType:'01',
        invoiceTitle:'',
        creditCode:'',

        errorTitle:'',
        errorCredit:'',
      }
    },
    components: {
      [Overlay.name]: Overlay,
      [Loading.name]: Loading,
      [Button.name]: Button,
      [Cell.name]: Cell,
      [CellGroup.name]: CellGroup,
      [Collapse.name]: Collapse,
      [CollapseItem.name]: CollapseItem,
      [Field.name]: Field,
      [RadioGroup.name]: RadioGroup,
      [Radio.name]: Radio,
    },
    mounted(){
      this.getBillDetail();
    },
    methods: {
      getBillDetail() {
        this.show_overlay = true
        let param = {
          billId: this.billIds,
        }
        ParkApi.getPayCarBillDetail(param).then((response) => {
          let data = response.data;
          if (data.success) {
            this.respObj = data.result;
            //停车费不存在跨小区情况，这里直接取第一条
            if(data.result.fee_data != null) {
              this.feeList = data.result.fee_data[0].fee_name;
            }
          } else {
            Toast.fail(data.message);
          }
          this.show_overlay = false;
        })
      },

      onNeedInvoice() {
        if(this.needInvoice === '0') {
          this.invoiceTitleType = '';
        } else {
          this.invoiceTitleType = '01';
        }
        this.invoiceTitle = '';
        this.creditCode ='';
        this.errorTitle = '';
        this.errorCredit = '';
      },
      onInvoiceTitleType() {
        this.invoiceTitle = '';
        this.creditCode ='';
        this.errorTitle = '';
        this.errorCredit = '';
      },

      btnPay() {
        this.errorTitle = '';
        this.errorCredit = '';
        if(this.invoiceTitleType === "02") {
          if(this.invoiceTitle === "") {
            this.errorTitle = "请输入发票抬头";
            return;
          }

          if(this.creditCode === ""){
            this.errorCredit = "请输入司税号";
            return;
          }
        }

        window.location.href = this.basePageUrl + "parkBillPay.html?invoiceTitleType=" + this.invoiceTitleType + "&creditCode=" + this.creditCode
          + "&invoiceTitle=" + this.invoiceTitle + "&billIds=" + this.billIds + "&reduceMode=" + this.reduceMode + "&payScenarioss=03"

        // this.$router.push({
        //   path: '/carBillPaying',
        //   query: {
        //     invoiceTitleType : this.invoiceTitleType,
        //     creditCode : this.creditCode,
        //     invoiceTitle : this.invoiceTitle,
        //     billIds : this.billIds,
        //     reduceMode: this.reduceMode,
        //   }
        // })
      }
    }
  }
</script>

<style scoped>
  .main {
    background-color: #F5F6F7;
    height: 100%;
    min-height: 100vh;
    overflow: hidden;
  }

  .van-loading {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .btn-fixed {
    position: fixed;
    color: #fff !important;
    left: 0;
    right: 0;
    bottom: .3rem;
    height: 0.92rem;
    line-height: 0.92rem;
    text-align: center;
  }
</style>

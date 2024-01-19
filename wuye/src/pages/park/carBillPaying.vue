<template>
  <div class="main">
    <van-overlay :show="show_overlay">
      <van-loading type="spinner"/>
    </van-overlay>
    <div class="detail">
      <van-cell-group>
        <van-cell title="账单金额" :value="respObj.total_fee_price"/>

        <div v-show="respObj.is_integral !== '1' && respObj.reduction !== null">
          <van-cell  v-for="(item,index) in respObj.reduction" :key="index" :title="item.reduction_msg" :value="'-¥' + item.reduction_amt"/>
        </div>

        <van-cell title="优惠总金额" :value="reduceAmt"/>
        <van-cell title="支付金额" :value="payAmt"/>
      </van-cell-group>
    </div>

    <div class="btn-fixed">
      <van-button type="primary" block color="var(--primary-color)" @click="btnPay">
        立即支付
      </van-button>
    </div>

  </div>
</template>

<script>
  import { Toast, Overlay, Loading, Button, Cell, CellGroup } from 'vant';
  import ParkApi from "@/api/Park.js";
  import wx from "weixin-js-sdk";
  export default {
    name: "carBillPaying",
    data() {
      return {
        show_overlay: false,
        invoiceTitleType: this.$route.query.invoiceTitleType,
        creditcode: this.$route.query.creditcode,
        invoiceTitle: this.$route.query.invoiceTitle,
        billIds: this.$route.query.billIds,
        reduceMode: this.$route.query.reduceMode,
        respObj:{},
        payAmt: 0.00, //剔除掉优惠和精度后的实际支付金额
        reduceAmt:0.00, //优惠减免金额
        reduceMoney:0.00, //精度损失的金额

        ruleType:'',
      }
    },
    components: {
      [Overlay.name]: Overlay,
      [Loading.name]: Loading,
      [Button.name]: Button,
      [Cell.name]: Cell,
      [CellGroup.name]: CellGroup,
    },
    mounted() {
      this.getDiscount()
    },
    methods: {
      getDiscount() {
        this.show_overlay = true
        let param = {
          billId: this.billIds,
          payType: '0',  //0微信
          payFeeType: '02', //01管理费，02停车费
        }
        ParkApi.getDiscounts(param).then((response) => {
          let data = response.data;
          if (data.success) {
            this.respObj = data.result;
            if(this.respObj.is_enable_integral === '0'){
              this.cullDiscount(); //优惠减免
            } else {
              this.formatPay(this.respObj.total_fee_price)
            }
          } else {
            Toast.fail(data.message);
          }
          this.show_overlay = false;
        })
      },

      cullDiscount() {
        let reduction = this.respObj.reduction;
        for(let i=0; i< reduction.length; i++){
          this.reduceAmt += parseFloat(reduction[i].reduction_amt) //优惠金额累加

          if(reduction.length > 1){
            this.ruleType += reduction[i].rule_type + ',';//规则
          } else {
            this.ruleType = reduction[i].rule_type;
          }
        }

        this.payAmt = (parseFloat(this.respObj.total_fee_price) - parseFloat(this.reduceAmt)).toFixed(2);//减去优惠的值
        this.formatPay(this.payAmt)//四舍五入
      },

      formatPay(amt) {
        let reduce_rate = 0;
        let reduced_amt = 0;
        if(!this.reduceMode || "0" === this.reduceMode){
          return false;
        } else if ("1" === this.reduceMode) { //四舍五入至元
          reduce_rate = "1";
          reduced_amt = Math.round(amt * reduce_rate) / reduce_rate;
        } else if ("2" === this.reduceMode) { //表示四舍五入至角
          reduce_rate = "10";
          reduced_amt = Math.round(amt * reduce_rate) / reduce_rate;
        } else if ("4" === this.reduceMode) { //表示保留至角去分
          reduce_rate = "10";
          reduced_amt = Math.floor(amt * reduce_rate) / reduce_rate;
        } else if ("5" === this.reduceMode) { //表示保留至角入分
          reduce_rate = "10";
          reduced_amt = Math.ceil(amt * reduce_rate) / reduce_rate;
        } else if ("6" === this.reduceMode) { //保留至元去角
          reduce_rate = "1";
          reduced_amt = Math.floor(amt * reduce_rate) / reduce_rate;
        } else if ("7" === this.reduceMode) { // 保留至元入角
          reduce_rate = "1";
          reduced_amt = Math.ceil(amt * reduce_rate) / reduce_rate;
        } else {
          return false;
        }

        this.reduceMoney = parseFloat(amt) - parseFloat(reduced_amt.toFixed(2));//四舍五入的钱传给后端
        this.reduceMoney = vm.reduceMoney.toFixed(2); //减少的钱
        this.payAmt = reduced_amt.toFixed(2); //合计

      },

      btnPay() {
        this.show_overlay = true
        let param = {
          reduceAmt: this.reduceMoney,
          ruleType: this.ruleType,
          reductionAmt: this.reduceAmt, //减免金额
          payFeeType: '02', //01管理费，02停车费
          invoice_title_type : this.invoiceTitleType,
          credit_code : this.creditCode,
          invoice_title : this.invoiceTitle,
          billId : this.billIds,
        }
        ParkApi.getPrePayInfo(param).then((response) => {
          let data = response.data;
          if (data.success) {
            wx.config({
              debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
              appId: data.result.appid, // 必填，公众号的唯一标识
              timestamp: data.result.timestamp, // 必填，生成签名的时间戳
              nonceStr: data.result.noncestr, // 必填，生成签名的随机串
              signature: data.result.paysign,// 必填，签名，见附录1
              jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });

            wx.chooseWXPay({
              "appId":data.result.appid,
              "timestamp":data.result.timestamp,
              "nonceStr":data.result.noncestr,
              "package":data.result.package,
              "signType":data.result.signtype,
              "paySign":data.result.paysign,

              success: function () {
                //支付成功跳转详情
                this.$router.push({
                  path: '/carPaySuccess',
                  query: {
                    out_park_prompt: this.obj.out_park_prompt,
                    amt: this.payAmt,
                    tel: '',
                    order_id: data.result.trade_water_id
                  }
                })
              },
              fail:function(res) {
                console.log(JSON.stringify(res))
              },
              cancel:function(res) {
                alert('支付取消');
              }
            })
          } else {
            Toast.fail(data.message);
          }
          this.show_overlay = false
        })
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

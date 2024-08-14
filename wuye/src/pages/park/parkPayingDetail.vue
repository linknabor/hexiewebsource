<template>
  <div class="main">
    <van-overlay :show="show_overlay">
      <van-loading type="spinner"/>
    </van-overlay>
    <van-skeleton title :row="3" :loading="show_overlay">
    <div v-if="dataType==='1'" style="margin: 0.2rem;">
        <div style="position: relative;top: 0px;left: 0px;height: 4.8rem;">
            <img class="bg-park" src="../../assets/img/bg_parkpay.png" >

            <div class="data-text1">应付费用(￥)</div>
            <div class="data-text2">{{respObj.fee_amt}}</div>

            <div class="data-text3">停车时长</div>
            <div class="data-text4">{{respObj.park_time}}</div>
        </div>
        <van-cell>
            <template slot="title">
                <div class="data-font-size3" style="width: 30%;float: left;color:#969799">车牌号</div>
                <div class="data-font-size3" style="width:70%;float: left;">{{respObj.car_no}}</div>
            </template>
        </van-cell>
        <van-cell>
            <template slot="title">
                <div class="data-font-size3" style="width: 30%;float: left;color:#969799">车辆类型</div>
                <div class="data-font-size3" style="width:70%;float: left;">临时车</div>
            </template>
        </van-cell>
        <van-cell>
            <template slot="title">
                <div class="data-font-size3" style="width: 30%;float: left;color:#969799">入场时间</div>
                <div class="data-font-size3" style="width:70%;float: left;">{{respObj.in_time}}</div>
            </template>
        </van-cell>
        <van-cell>
            <template slot="title">
                <div class="data-font-size3" style="width: 30%;float: left;color:#969799">总金额</div>
                <div class="data-font-size3" style="width:70%;float: left;">{{respObj.tot_amt}}</div>
            </template>
        </van-cell>
        <van-cell>
            <template slot="title">
                <div class="data-font-size3" style="width: 30%;float: left;color:#969799">已付金额</div>
                <div class="data-font-size3" style="width:70%;float: left;">{{respObj.already_amt}}</div>
            </template>
        </van-cell>
        <div style="text-align: center;margin-top: 0.6rem;">
            <van-button type="warning" size="small" style="width:3rem;height:0.8rem" round @click="toPay">
                <template slot="default">
                    <span style="font-size:0.28rem">立即支付</span>
                </template>
            </van-button>
        </div>
    </div>
    <!-- <div v-if="dataType==='0'" style="margin: 0.2rem">
        <div class="data-head">
            <div class="data-title">
                {{ respObj.park_name }}
            </div>
            <div>应付金额</div>
            <div><span class="data-amt">{{ respObj.fee_amt }}</span> 元</div>
        </div>

        <van-cell-group title="停车信息">
            <van-cell title="车牌号" :value="respObj.car_no"></van-cell>
            <van-cell title="入场时间" :value="respObj.in_time"></van-cell>
            <van-cell title="停车时长" :value="parkTime"></van-cell>
            <van-cell title="总金额" :value="respObj.tot_amt"></van-cell>
            <van-cell title="已付金额" :value="respObj.already_amt"></van-cell>
        </van-cell-group>

        <div class="data-desc">
            <div class="data-desc-att">{{ respObj.pay_prompt }}</div>
            <div class="data-desc-att">
                <van-icon name="phone-o" color="blue"/>
                <a style="color: blue" :href="'tel:'+respObj.cust_tel">客服电话</a></div>
        </div>

        <div class="data-bottom">
            <van-notice-bar v-if="respObj.out_park_prompt !== ''" left-icon="info-o" :scrollable="false" :text="respObj.out_park_prompt" />
            <div v-show="showBtnPay">
                <div class="data-bottom-amt">
                    应收金额：<span>{{ respObj.fee_amt }}</span> 元
                </div>
                <div class="data-bottom-bt">
                    <van-button type="warning" size="small" round @click="toPay">立即支付</van-button>
                </div>
            </div>
            <div v-show="!showBtnPay">
                <div style="text-align: right;padding-right: 0.9rem;padding-top: 0.3rem;">
                    <van-button type="warning" size="small" round @click="toReplayTime">刷新</van-button>
                </div>
            </div>
        </div>
    </div> -->
    <div v-else-if="dataType === '2'" style="margin: 0.2rem">
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
            <h4 v-show="respObj.show_invoice_flag === '1'">申请的电子发票预计在3个工作日内通过短信发送至您手机上,请注意查收</h4>
            </div>
        </van-cell-group>
        </div>

        <div class="btn-fixed">
        <van-button type="primary" block color="var(--primary-color)" @click="toPay">
            确认支付
        </van-button>
        </div>
    </div>
    </van-skeleton>
  </div>
</template>

<script>
import {Overlay, Loading,CellGroup, Cell, Icon, Button, Toast, NoticeBar, Field, RadioGroup, Radio, Collapse, CollapseItem, Skeleton} from 'vant';
import ParkApi from "@/api/Park.js"
export default {
    name: 'parkPayingDetail',
    components: {
      [Overlay.name]: Overlay,
      [Loading.name]: Loading,
      [CellGroup.name]: CellGroup,
      [Cell.name]: Cell,
      [Icon.name]: Icon,
      [Button.name]: Button,
      [Toast.name]: Toast,
      [NoticeBar.name]: NoticeBar,
      [Collapse.name]: Collapse,
      [CollapseItem.name]: CollapseItem,
      [Field.name]: Field,
      [RadioGroup.name]: RadioGroup,
      [Radio.name]: Radio,
      [Skeleton.name]: Skeleton,
    },
    data() {
      return {
        show_overlay: true,
        dataType: this.$route.query.dataType, //1从临停来 2从包月停车费来
        carNo: this.$route.query.carNo,
        parkId: this.$route.query.parkId,
        scanChannel: this.$route.query.scanChannel, //3微信公众号扫的 1支付宝扫的
        billIds: this.$route.query.billIds,
        reduceMode: this.$route.query.reduceMode,
        parkName: this.$route.query.parkName,
        feeList:[],
        respObj: {},
        currRefreshTime: 0,

        showBtnPay: true,
        activeName: '',
        needInvoice:'1',
        invoiceTitleType:'01',
        invoiceTitle:'',
        creditCode:'',
        errorTitle:'',
        errorCredit:'',
      }
    },
    mounted() {
        if('1' === this.dataType) {
            this.getTempCarAmt()
        } else if('2' === this.dataType) {
            this.getBillDetail()
        }
    },
    methods: {
        getTempCarAmt() {
            let param = {
                parkId: this.parkId,
                carNo: this.carNo
            }
            ParkApi.getPayingDetail(param).then((response) => {
                let data = response.data
                if (data && data.success) {
                    this.respObj = data.result
                    this.show_overlay = false
                } else {
                    Toast.fail(data.message)
                }
            }).catch((error) => {
				Toast.fail(error)
			})
        },

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
                    this.show_overlay = false;
                } else {
                    Toast.fail(data.message);
                }
            }).catch((error) => {
				Toast.fail(error)
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

        toPay() {
            let param = {}
            if('1' === this.dataType) {
                param = {
                    dataType: this.dataType,
                    park_id: this.parkId,
                    car_no: this.carNo,
                    record_id: this.respObj.record_id,
                    pay_scenarios: '03',
                    scanChannel: this.scanChannel,
                    device_order_id: this.respObj.device_order_id
                }
            } else if('2' === this.dataType) {
                param = {
                    dataType: this.dataType,
                    invoice_title_type: this.invoiceTitleType,
                    credit_code: this.creditCode,
                    invoice_title: this.invoiceTitle,
                    billId: this.billIds,
                    reduceMode: this.reduceMode,
                    park_name: this.parkName,
                    pay_scenarios: '03',
                    scanChannel: this.scanChannel
                }
            } else {
                Toast.fail('暂不支持')
                return
            }
            let str = JSON.stringify(param)
            window.location.href = this.basePageUrl + "h5pay.html?param=" + str
        },
    }
}
</script>

<style scoped>
    .main {
        width: 100%;
        height: 100%;
        min-height: 100vh;
        overflow: hidden;
    }
    .data-head {
        height: 2.5rem;
        background-color: white;
        text-align: center;
    }
    .data-title {
        text-align: left;
        padding: 0.3rem;
        font-size: 0.3rem;
    }
    .data-amt {
        font-size: 0.6rem;
        font-weight: bold;
    }
    .data-desc {
        text-align: center;
    }
    .data-desc-att {
        padding-top: 0.1rem
    }
    .data-bottom {
        height: 100px;
        position: fixed;
        bottom: 0.3rem;
        width: 100%;
        background-color: white;
    }
    .data-bottom-amt {
        width: 40%;
        margin-left: 2rem;
        float: left;
        margin-top: 0.3rem;
    }
    .data-bottom-amt span {
        color: #CD853F;
        font-size: 0.4rem;
    }
    .data-bottom-bt {
        width: 30%;
        float: left;
        margin-top: 0.2rem;
    }
    .van-button--round {
        width: 90px;
    }  
    .van-icon {
        position: relative;
        top: 2px;
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


  .bg-park {
    width: 100%;
  }
  .data-text1 {
    position: relative;
    top: -4rem;
    left: 0.5rem;
    font-size: 0.3rem;
    color: white;
  }
  .data-text2 {
        position: relative;
        top: -3.7rem;
        left: 0.5rem;
        font-size: 0.6rem;
        color: white;
        font-weight: bold;
  }
  .data-text3 {
    position: relative;
    top: -2.8rem;
    left: 0.5rem;
    font-size: 0.3rem;
    color: white;
  }
  .data-text4 {
    position: relative;
    top: -2.6rem;
    left: 0.5rem;
    font-size: 0.5rem;
    color: white;
    font-weight: bold;
  }
  .data-font-size3 {
    font-size: 0.3rem;
  }
</style>
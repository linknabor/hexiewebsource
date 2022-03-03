<template>
    <div class="main">
        <div class="white-blank" v-show="showSkeleton==true"></div>
        <van-skeleton title :row="3" :loading="showSkeleton">
            <div class="top"></div>
            <div class="inner">
                <div class="title-image"></div>
                <div class="title">
                    <span class="title-text">电子收据</span>
                </div>
                <div class="csp"><span class="csp-text">{{receipt.csp_name}}</span></div>
                <div class="sect">
                    <span class="sect-text">{{receipt.sect_name}}</span>
                </div>
                <!-- <div class="sectaddr">
                    <span class="sectaddr-text">{{receipt.cell_addr}}</span>
                </div> -->
                <div class="mid-space"></div>
                <div class="divide-line"></div>
                <div class="paymethod">
                    <div class="paymethod-left">
                        <span class="paymethod-text">支付方式</span>
                    </div>
                    <div class="paymethod-right">
                        <span class="paymethod-value">{{receipt.pay_method}}</span>
                    </div>
                </div>
               <div class="trandetail">
                    <div class="trandetail-left">
                        <span class="trandetail-text">交易时间</span>
                    </div>
                    <div class="trandetail-right">
                        <span class="trandetail-value">{{receipt.tran_date}}</span>
                    </div>
                </div>
                <div class="trandetail">
                    <div class="trandetail-left">
                        <span class="trandetail-text">交易金额</span>
                    </div>
                    <div class="trandetail-right">
                        <span class="trandetail-value">{{receipt.tran_amt}}</span>
                    </div>
                </div>
                <div class="stamp">
                    <div class="stamp-logo" v-show="receipt.receipt_status=='0'"></div>
                    <div class="stamp-logo4del" v-show="receipt.receipt_status=='1'"></div>
                </div>
                <div class="mid-space2"></div>
                <div class="divide-line"></div>
                <div class="details">
                    <div class="details-top"></div>
                    <div class="details-contents" v-for="(details, key) in receiptDetail" :key="key">
                        <div class="content">
                            <div class="content-title" v-if="key">
                                <span class="content-title-text">{{key}}</span>
                            </div>
                            <div v-for="(detail, detailKey) in details" :key="detailKey">
                                <div class="content-detail" v-if="detail.fee_description">
                                    <span class="content-text">{{detail.fee_description}}</span>
                                </div>
                                <div class="content-detail">
                                    <div class="content-detail-left">
                                    <span class="content-text">{{detail.fee_name}}</span>
                                </div>
                                <div class="content-detail-right">
                                    <span class="content-value">{{detail.tran_amt}}</span>
                                </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div class="details-bottom"></div>
                </div>

              <div class="trandetail-tips" v-if="receipt.tips_desc">
                <div class="tips-left"><van-icon size="16px" name="volume-o"></van-icon></div>
                <div class="tips-right"><span>{{receipt.tips_desc}}</span></div>
              </div>
            </div>
            <div class="hint">
              <span class="hint-text">可在个人中心-><a href="#" style="color: #1E90FF" @click="myReceipt">我的收据</a>中查看所有申请过的收据</span>
            </div>
        </van-skeleton>
    </div>
</template>

<script>
import ReceiptApi from "@/api/ReceiptApi.js";
import { Dialog, Toast, Skeleton, Empty, Icon } from "vant";

export default ({
    data() {
        return {
            showOverlay: false,
            showSkeleton: true,
            appid: '',
            receiptId: '',
            receipt: {},
            receiptDetail: [],
        }
    },
    components: {
        [Toast.name]: Toast,
        [Skeleton.name]: Skeleton,
        [Empty.name]: Empty,
        [Icon.name]: Icon,
    },
    created() {
        this.appid = this.getUrlParam("oriApp")
        this.receiptId = this.$route.query.receiptId
    },
    mounted() {
    },
    watch: {
        receiptId: {
            handler(val){
                if(val){
                    this.getReceipt()
                }
            },
            deep: true
        },
    },
    methods: {
        getReceipt() {
            let params = {
                appid: this.appid,
                receiptId: this.receiptId,
            }
            ReceiptApi.getReceipt(params).then((response)=>{
                this.showSkeleton = false
                if(response.data.success) {
                    this.receipt = response.data.result.receipt
                    this.receiptDetail = response.data.result.details
                } else {
                    Dialog.alert({
                        message: response.data.message
                    })
                }

            }).catch((error)=>{
                console.log(error)
            })
        },
        myReceipt() {
            this.$router.push({path: '/myReceipt', query:{}})
        }
    }
})
</script>

<style lang="less" scoped>
@import "../../assets/less/mixin.less";

.main {
    min-height: 100vh;
    width: 100%;
    background-color: #CEEEFF;
}
.top {
    width: 100%;
    height: 0.8rem;
}
.inner {
    margin: 0% 5% 0% 5%;
    padding-bottom: 0.6rem;
    background-size: cover;
    background-repeat: no-repeat;
    min-height: 9.5rem;
    .bg-image('../../assets/images/receipt/bg1');
}

.title-image {
    margin: 0 2.13rem;
    background-size: cover;
    background-repeat: no-repeat;
    height: 1.2rem;
    .bg-image('../../assets/images/receipt/img');
}
.title {
    margin: 0.16rem 2.71rem 0.04rem 2.71rem;
    &-text {
        color: #2D2D2D;
        font-size: 0.32rem;
        font-weight: 600;
        font-family: "PingFang SC";
        text-align: center;
        line-height: 0.44rem;
        letter-spacing: 100;
        // text-indent: 100;

    }
}
.csp {
    margin: 0.25rem 0 0 0.6rem;
    height: 0.34rem;
    &-text {
        color: #989898;
        text-align: left;
        font-family: "PingFang SC";
        font-size: 0.24rem;
        line-height: 0.34rem;
    }
}
.sect {
    margin: 0.08rem 0.6rem 0 0.6rem;
    height: 0.34rem;
    &-text {
        color: #989898;
        text-align: left;
        font-family: "PingFang SC";
        font-size: 0.24rem;
        line-height: 0.34rem;
    }
}
.sectaddr {
    margin: 0.08rem 0.6rem 0 0.6rem;
    height: 0.34rem;
    &-text {
        color: #989898;
        text-align: left;
        font-family: "PingFang SC";
        font-size: 0.24rem;
        line-height: 0.34rem;
    }
}
.divide-line {
    margin: 0rem 0.44rem 0 0.44rem;
    border-bottom:1px dotted #C9C9C9;
}
.divide-line:after{
    height:1px;content:'';
    display:block;
    border-top:1px dotted #C9C9C9;
}
.paymethod {
    margin: 0.36rem 0.6rem 0 0.6rem;
    height: 0.4rem;
    &-text {
        width: 50%;
        color: #888888;
        font-family: "PingFang SC";
        font-size: 0.28rem;
        line-height: 0.4rem;
    }
    &-value {
        width: 50%;
        color: #888888;
        font-family: "PingFang SC";
        font-size: 0.28rem;
        line-height: 0.4rem;
    }
    &-left {
        width:50%;
        float: left;
    }
    &-right {
        width:50%;
        float: right;
        text-align: right;
    }
}
.trandetail {
    margin: 0.24rem 0.6rem 0 0.6rem;
    height: 0.4rem;
    &-text {
        width: 50%;
        color: #888888;
        font-family: "PingFang SC";
        font-size: 0.28rem;
        line-height: 0.4rem;
    }
    &-value {
        width: 50%;
        color: #888888;
        font-family: "PingFang SC";
        font-size: 0.28rem;
        line-height: 0.4rem;
    }
    &-left {
        width:50%;
        float: left;
    }
    &-right {
        width:50%;
        float: right;
        text-align: right;
    }
  &-tips {
    margin: 0.15rem 0.5rem;
    color: darkblue;
    font-size: 0.24rem;
  }
}
.mid-space {
    width: 100%;
    height: 0.1rem;
}
.mid-space2 {
    width: 100%;
    height: 0.32rem;
}
.stamp {
    position: absolute;
    margin: -0.6rem 2.3rem 0rem 2.3rem;
    &-logo {
        width: 2.4rem;
        height: 1.7rem;
        background-size: cover;
        background-repeat: no-repeat;
        .bg-image('../../assets/images/receipt/shouqi');
    }
    &-logo4del {
        width: 2.4rem;
        height: 1.7rem;
        background-size: cover;
        background-repeat: no-repeat;
        .bg-image('../../assets/images/receipt/zuofei');
    }
}
.details {
    margin: 0rem 0.44rem 0 0.44rem;
    background-color: #FAFAFA;
    border-radius: 0 0 0.16rem 0.16rem;
    min-height: 2.56rem;
    border-bottom: 1px dotted #C9C9C9;
    border-left: 1px dotted #C9C9C9;
    border-right: 1px dotted #C9C9C9;
    &-top {
        width: 100%;
        height: 0.02rem;
    }
    &-bottom {
        width: 100%;
        height: 0.2rem;
    }
    &-contents {
        margin-top: 0.2rem;
    }
}
.content {
    margin: 0.06rem 0.16rem 0 0.16rem;
    &-text {
        color: #888888;
        font-family: "PingFang SC";
        font-size: 0.24rem;
        line-height: 0.34rem;
    }
    &-value {
        color: #888888;
        font-family: "PingFang SC";
        font-size: 0.24rem;
        line-height: 0.34rem;
    }
    &-title {
        width: 100%;
        height: 0.36rem;
        &-text {
            color: black;
            font-weight: bold;
            font-family: "PingFang SC";
            font-size: 0.24rem;
            line-height: 0.34rem;
        }
    }
    &-detail {
        width: 100%;
        height: 0.34rem;
        margin-top: 0.12rem;
        &-left {
            width:80%;
            float: left;
        }
        &-right {
            width:20%;
            float: right;
            text-align: right;
        }
    }

}
.hint {
    width: 90%;
    margin: 0.1rem 2% 0.2rem 8%;
    &-text {
        color: red;
        font-size: 0.22rem;
    }
}
.white-blank {
    height: 1rem;
    width: 100%;
}

.tips {
  &-left {
    float: left;
    width: 7%
  }
  &-right {
    float: left;
    width: 90%;
    font-size: 0.25rem;
  }
}
</style>

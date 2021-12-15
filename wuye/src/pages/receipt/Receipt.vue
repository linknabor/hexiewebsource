<template>
    <div class="main">
        <div class="top"></div>
        <div class="inner">
            <div class="title-image"></div>
            <div class="title">
                <span class="title-text">电子收据</span>
            </div>
            <div class="csp"><span class="csp-text">上海很长名字的演示物业公司</span></div>
            <div class="sect">
                <span class="sect-text">很长名字小区得试一试啊哈哈哈哈</span>
            </div>
            <div class="sectaddr">
                <span class="sectaddr-text">上海市浦东新区学林路xxxx弄11号</span>
            </div>
            <div class="mid-space"></div>
            <div class="divide-line"></div>
            <div class="paymethod">
                <div class="paymethod-left">
                    <span class="paymethod-text">支付方式</span>
                </div>
                <div class="paymethod-right">
                    <span class="paymethod-value">微信公众号</span>
                </div>
            </div>
            <div class="trandetail">
                <div class="trandetail-left">
                    <span class="trandetail-text">交易时间</span>
                </div>
                <div class="trandetail-right">
                    <span class="trandetail-value">2021-12-14 18:54:01</span>
                </div>
            </div>
            <div class="trandetail">
                <div class="trandetail-left">
                    <span class="trandetail-text">交易金额</span>
                </div>
                <div class="trandetail-right">
                    <span class="trandetail-value">255.00</span>
                </div>
            </div>
            <div class="stamp"></div>
            <div class="mid-space2"></div>
            <div class="divide-line"></div>
            <div class="details">
                <div class="details-top"></div>
                <div class="details-contents">
                    <div class="content">
                        <div class="content-left">
                            <span class="content-text">收费内容</span>
                        </div>
                        <div class="content-right">
                            <span class="content-value">2021年1月-2021年12月</span>
                        </div>
                    </div>
                    <div class="content">
                        <div class="content-left">
                            <span class="content-text">物业管理费</span>
                        </div>
                        <div class="content-right">
                            <span class="content-value">￥1567.00</span>
                        </div>
                    </div>
                    <div class="content">
                        <div class="content-left">
                            <span class="content-text">电梯水泵运行费</span>
                        </div>
                        <div class="content-right">
                            <span class="content-value">￥2856.50</span>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ReceiptApi from "@/api/ReceiptApi.js";
import { Toast, Skeleton, Empty, List } from "vant";

export default ({
    data() {
        return {
            
        }
    },
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
    margin: 0 0 0 0.6rem;
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
}
.mid-space {
    width: 100%;
    height: 0.1rem;
}
.mid-space2 {
    width: 100%;
    height: 0.48rem;
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
        height: 0.12rem;
    }
}
.content {
    margin: 0.24rem 0.16rem 0 0.16rem;
    height: 0.34rem;
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
    &-left {
        width:42%; 
        float: left;
    }
    &-right {
        width:58%; 
        float: right; 
        text-align: right;
    }
}
</style>

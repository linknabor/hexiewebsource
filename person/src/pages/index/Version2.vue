<template>
    <div class="outer">
        <div class="white-blank" v-show="showSkeleton==true"></div>
        <van-skeleton title avatar :row="3" :loading="showSkeleton">
        <div>
            <van-popup v-model="showQrCode">
                <vue-qr :text="qrCodeStr" :margin="20" :size="400"></vue-qr>
            </van-popup>
            <van-overlay :show="showOverlay" />
        </div>
        <div class="infos">
            <div class="base-info" @click="queryMemberCard">
                <div class="user-name">{{user.name}}
                    <div class="chevron">
                        <van-image :src="require('../../assets/images/index/chevron@2x.png')" width="0.18rem" height="0.3rem"></van-image>
                    </div>
                </div>
                <div class="user-head">
                    <van-image :src="user.headimgurl" width="1.78rem" height="1.78rem" round></van-image>
                </div>
                <div class="user-sect">{{user.xiaoquName}}</div>
            </div>
            <div class="other-info">
                <div class="points">
                    <div class="point-value">{{user.point}}</div>
                    <div class="point-text">积分</div>
                </div>
                <div class="points">
                    <div class="point-value">{{user.couponCount}}</div>
                    <div class="point-text">我的优惠券</div>
                </div>
                <div class="points" @click="showQrcode">
                    <div class="point-value"><van-image :src="require('../../assets/images/ownerScan.png')" height="0.26rem" width="0.26rem"></van-image></div>
                    <div class="point-text">业主码</div>
                </div>
            </div>
        </div>
        <div class="orders">
            <div class="orders-title">
                全部订单
            </div>
            <div class="orders-images">
                <van-grid :column-num="3" :border="false" >
                    <van-grid-item @click="shopOrder">
                        <div slot="icon">
                            <van-image :src="require('../../assets/images/index/shop@3x.png')" width="0.84rem" height="0.84rem"/>
                        </div>
                        <div slot="text" class="order-text" >商城订单</div>
                    </van-grid-item>
                    <van-grid-item @click="serviceOrder">
                        <div slot="icon">
                            <van-image :src="require('../../assets/images/index/service@3x.png')" width="0.84rem" height="0.84rem"/>
                        </div>
                        <div slot="text" class="order-text" >服务订单</div>
                    </van-grid-item>
                    <van-grid-item @click="repairOrder">
                        <div slot="icon">
                            <van-image :src="require('../../assets/images/index/repair@3x.png')" width="0.84rem" height="0.84rem"/>
                        </div>
                        <div slot="text" class="order-text">维修订单</div>
                    </van-grid-item>
                </van-grid>
            </div>
        </div>
        <div class="options">
            <div class="option-item">
                <div class="option-icon icon-houses"></div>
                <div class="option-text">我是业主</div>
                <div class="option-link" @click="queryHouses">绑定房屋<div class="link-chevron"></div></div>
            </div>
            <div class="option-item">
                <div class="option-icon icon-invoices"></div>
                <div class="option-text">我的发票</div>
                <div class="option-link" @click="queryInvoice">查看发票<div class="link-chevron"></div></div>
            </div>
            <div class="option-item">
                <div class="option-icon icon-receipts"></div>
                <div class="option-text">我的收据</div>
                <div class="option-link" @click="queryReceipt">查看收据<div class="link-chevron"></div></div>
            </div>
            <div class="option-item">
                <div class="option-icon icon-pubs"></div>
                <div class="option-text">我的发布</div>
                <div class="option-link" @click="queryPubs">查看发布<div class="link-chevron"></div></div>
            </div>
            <div class="option-item">
                <div class="option-icon icon-messages"></div>
                <div class="option-text">我的消息</div>
                <div class="option-link" @click="queryMessages">查看消息<div class="link-chevron"></div></div>
            </div>
            <div class="option-item">
                <div class="option-icon icon-coupons"></div>
                <div class="option-text">领券中心</div>
                <div class="option-link" @click="getCoupons">点击领取<div class="link-chevron"></div></div>
            </div>
            <div class="option-item">
                <div class="option-icon icon-addresses"></div>
                <div class="option-text">常用地址</div>
                <div class="option-link" @click="queryAddresses">收货地址<div class="link-chevron"></div></div>
            </div>

            <div class="option-item" v-show="user.officeTel">
                <div class="option-icon icon-tel"></div>
                <div class="option-text">物业电话</div>
                <div class="option-link"><a :href="'tel:'+user.officeTel" class="a-hotline">{{user.officeTel}}</a></div>

            </div>
        </div>
        </van-skeleton>
        <foot @userInfo="setUser"></foot>
        <init-user v-if="testMode"></init-user>
    </div>
</template>

<script>
import Foot from '@/components/footer.vue'
import InitUser from '@/components/InitUser.vue'
import UserApi from "@/api/UserApi"
import VueQr from 'vue-qr'
import { Overlay, Grid, GridItem, Image, Image as VanImage, Popup, Dialog, Skeleton } from 'vant'

export default ({

    components: {
        VueQr,
        'foot': Foot,
        'init-user': InitUser,
        [Grid.name]: Grid,
        [GridItem.name]: GridItem,
        [Image.name]: VanImage,
        [Popup.name]: Popup,
        [Overlay.name]: Overlay,
        [Skeleton.name]: Skeleton,
    },
    data() {
        return {
            user: {},
            showSkeleton: true,
            showOverlay: false,
            showQrCode: false,
            qrCodeStr: '',
        }
    },
    created() {
        // let user = {
        //     name: 'davidhardson',
        //     xiaoquName: '森兰明轩（演示）',
        //     point: 30,
        //     couponCount: 0,
        //     headimgurl: 'http://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83epiafq07ibRSxpeP3wXvHK9Jauc4WGBjFWfkjCj4xNw3kMS5Sia2FicVSyUicO6DsgXbV5z7H6MSLuRpRA/132',
        //     tel: '18116410486',
        //     cardService: true,
        //     cardStatus: '2',
        // }
        // this.user = user
    },
    mounted() {
    },
    beforeDestroy() {
　　},
    methods: {
        setUser(user){
            this.user = user
            if(this.user && this.user.id) {
                this.showSkeleton = false
            }
        },
        shopOrder() {
            location.href=this.basePageUrlpay+'orderpay.html?'+this.common.getoriApp()+'#/special?type=1'
        },
        serviceOrder () {
            this.$router.push({path:'/myservice'})
        },
        repairOrder() {
            if(this.user.repairService) {
                let url = this.basePageUrl+'wuye/index.html?'+this.common.getoriApp()+'#/workOrderList'
                location.href = url
            } else {
                this.$router.push({path:'/myrepair'})
            }
        },
        getCoupons() {
            this.$router.push({path:'/getcoupons'})
        },
        queryMessages() {
            this.$router.push({path:'/notices'})
        },
        queryPubs() {
          location.href = this.basePageUrl+'wuye/index.html?'+this.common.getoriApp()+'#/opinionList'
        },
        queryHouses() {
            location.href = this.basePageUrl+'wuye/index.html?'+this.common.getoriApp()+'#/Myhouse'
        },
        queryAddresses() {
            this.$router.push({path:"/addresses"})
        },
        queryInvoice() {
            location.href = this.basePageUrl+'wuye/index.html?'+this.common.getoriApp()+'#/invoice'
        },
        queryReceipt() {
            location.href = this.basePageUrl+'wuye/index.html?'+this.common.getoriApp()+'#/myReceipt'
        },
        queryOrders() {

        },
        showQrcode() {
            let user = this.user
            // console.log(user)
            if(!user.wuyeId) {
                this.showOverlay = true
                UserApi.getWuyeId().then((response)=>{
                    this.showOverlay = false
                    if(response.data.success) {
                        console.log(response)
                        let wuyeId = response.data.result
                        let str = "?appid=" + this.user.appId + "&userid=" + wuyeId + "&tel=" + this.user.tel + "&openid=" + this.user.openid
                        this.showQrCode = true
                        this.qrCodeStr = str
                    } else {
                        Dialog({ message: response.data.message })
                        return false
                    }
                }).catch((error)=>{
                    this.showOverlay = false
                    Dialog({ message: error })
                    return false
                })
            } else {
                let str = "?appid=" + this.user.appId + "&userid=" + this.user.wuyeId + "&tel=" + this.user.tel + "&openid=" + this.user.openid
                this.showQrCode = true
                this.qrCodeStr = str
            }
        },
        activate() {
            this.showOverlay = true
            UserApi.activateMemberCard(this.user.appId).then((response)=>{
                this.showOverlay = false
                if(response.data.success) {
                    location.href = response.data.result
                } else {
                    Dialog({ message: response.data.message })
                    return false
                }
            }).catch((error)=>{
                this.showOverlay = false
                Dialog({ message: error })
                return false
            })
        },
        queryMemberCard() {
            console.log('queryMemberCard')
            if(this.user.cardService){
                //1新用户未领卡未激活
                if(!this.user.tel && (this.user.cardStatus=='1'||this.user.cardStatus==null || this.user.cardStatus=='0')){
                    this.$router.push({ path: "/welfare" })
                }else if(!this.user.tel && this.user.cardStatus=='2'){ //2新用户领卡未激活
                    this.$router.push({ path: "/register" });
                }else if(this.user.tel && (this.user.cardStatus=='3' || this.user.cardStatus=='4')){ //3新用户或老用户领卡已激活
                    this.activate()
                }else if(this.user.tel && (this.user.cardStatus=='1'||this.user.cardStatus==null || this.user.cardStatus=='0')){ //1老用户未领卡未激活
                    this.$router.push({ path: "/welfare" })
                }else if(this.user.tel && this.user.cardStatus=='2') { //2 老用户领卡未激活
                    this.activate()
                } else if (!this.user.tel) {
                    this.$router.push({ path: "/bindphone" })
                }
            }else {
                this.$router.push({ path: "/bindphone" })
            }
        },
    }
})
</script>

<style scoped lang="less">

@import "../../assets/less/mixin.less";

.outer {
    margin: 0;
    padding: 0;
    min-height: 16.5rem;
    width: 100%;
    background-color: #fff;
}
.white-blank {
    height: 1rem;
    width: 100%;
}
.infos {
    width: 100%;
    height: 5.45rem;
    background-size: cover;
    background-repeat: no-repeat;
    .bg-image('../../assets/images/index/index_bg');
}
.base-info {
    margin: 0 0.4rem;
    height: 2.43rem;
}
.user-name {
    position: relative;
    height: 0.56rem;
    padding-top: 0.92rem;
    text-align: left;
    vertical-align: text-top;
    color: #fff;
    font-size: 0.4rem;
    font-family: PingFangSC-Semibold, sans-serif;
    font-weight: 600;
    float: left;
}
.user-head {
    position: relative;
    padding-top: 0.65rem;
    height: 1.78rem;
    width: 1.78rem;
    margin: 0 0.2rem 0 74%;
}
.user-sect {
    position: relative;
    top: -0.75rem;
    height: 0.28rem;
    font-size: 0.3rem;
    font-family: PingFangSC-Medium, sans-serif;
    font-weight: 500;
    color: #FFF0D0;
}
.chevron {
    position: relative;
    margin-left: 0.1rem;
    height: 0.18rem;
    display: inline-flex;
}
.other-info {
    position: relative;
    margin: 0.26rem 0.49rem 0 0.49rem;
    text-align: center;
}
.points {
    float: left;
    margin: 0 0.77rem 0 0;
    color: #FFFFFF;
}
.point-value {
    font-size: 0.32rem;
    font-weight: bold;
}
.point-text {
    font-size: 0.28rem;
    font-family: PingFangSC-Medium, sans-serif;
    font-weight: 500;
}
.qrcodelogo {
    background: url(../../assets/images/ownerScan.png) no-repeat;
    width: 100%;
    position: absolute;
    left: 50%;
  }
.orders {
    position: absolute;
    top: 4.08rem;
    width: 92%;
    height: 2.94rem;
    margin: 0 0.3rem;
    background-color: #fff;
    border: 0.5px solid #F1F1F1;
    border-radius: 0.16rem;
    opacity: 100%;
    box-sizing: border-box;
    box-shadow: 0px 2.5px 7px 0px #D5D5D5;
}
.orders-title {
    margin: 0.5rem 0 0 0.4rem;
    // width: 1.36rem;
    color: #292929;
    font-weight: 600;
    font-family: PingFangSC-Medium, sans-serif;
    font-size: 0.34rem;
    text-align: left;
    vertical-align: text-top;
    opacity: 100%;
}
.orders-images {
    width: 100%;
}
.order-text {
    margin-top: 0.12rem;
    height: 0.24rem;
    font-weight: 600;
    font-family: PingFangSC-Medium, sans-serif;
    font-size: 0.26rem;
    color: #292929;
}
.options {
    position: relative;
    top: 2.26rem;
    width: 100%;
}
.option-item {
    margin-left: 0.69rem;
    width: 90%;
    height: 1rem;
}
.option-icon {
    width: 0.44rem;
    height: 0.44rem;
    background-size: cover;
    background-repeat: no-repeat;
    float: left;
}
.icon-coupons {
    .bg-image('../../assets/images/index/lingquan');
}
.icon-messages {
    .bg-image('../../assets/images/index/xiaoxi');
}
.icon-pubs {
    .bg-image('../../assets/images/index/fabu');
}
.icon-houses {
    .bg-image('../../assets/images/index/yezhu');
}
.icon-addresses {
    .bg-image('../../assets/images/index/dizhi');
}
.icon-invoices {
    .bg-image('../../assets/images/index/fapiao');
}
.icon-receipts {
    .bg-image('../../assets/images/index/shouju');
}
.icon-tel {
    .bg-image('../../assets/images/index/tel');
}
.option-text {
    margin: 0.05rem 0 0 0.19rem;
    color: #262626;
    font-size: 0.34rem;
    font-weight: 500;
    font-family: PingFangSC-Medium, sans-serif;
    opacity: 100%;
    float: left;
}
.option-link {
    margin: 0.09rem 0 0 2.56rem;
    color: #666666;
    font-size: 0.28rem;
    font-weight: 400;
    font-family: PingFangSC-Regular, sans-serif;
    opacity: 100%;
    float: left;
}
.link-chevron {
    margin: 0.06rem 0 0 0.3rem;
    width: 0.14rem;
    height: 0.24rem;
    background-size: cover;
    background-repeat: no-repeat;
    .bg-image('../../assets/images/index/chevron2');
    float: right;
}
.a-hotline {
  color: #4994df;
}
</style>



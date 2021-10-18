<template>
    <div class="outer">
        <div class="infos">

        </div>
        <div class="orders">
            <div class="orders-title">
                全部订单
            </div>
            <div coass="orders-images">
                <van-grid :column-num="3" :border="false" >
                    <van-grid-item>
                        <div slot="icon">
                            <van-image :src="require('../../assets/images/index/repair@3x.png')" width="0.84rem" height="0.84rem"/>
                        </div>
                        <div slot="text" class="order-text">维修订单</div>
                    </van-grid-item>
                    <van-grid-item>
                        <div slot="icon">
                            <van-image :src="require('../../assets/images/index/service@3x.png')" width="0.84rem" height="0.84rem"/>
                        </div>
                        <div slot="text" class="order-text">服务订单</div>
                    </van-grid-item>
                    <van-grid-item>
                        <div slot="icon">
                            <van-image :src="require('../../assets/images/index/shop@3x.png')" width="0.84rem" height="0.84rem"/>
                        </div>
                        <div slot="text" class="order-text">商品订单</div>
                    </van-grid-item>
                </van-grid>
            </div>
        </div>
        <div class="options">
            <div class="">

            </div>
        </div>
        <user-info ref="userLogin" @getUserInfo="getUserInfo"></user-info>
    </div>
</template>

<script>
import UserInfo from '@/components/UserInfo'
import { Grid, GridItem, Image, Image as VanImage } from 'vant'

export default ({

    components: {
        "user-info": UserInfo,
        [Grid.name]: Grid,
        [GridItem.name]: GridItem,
        [Image.name]: VanImage,
    },
    data() {
        return {
            userInfo: {},
            showOverlay: false
        }
    },
    methods: {
        created() {
            console.log("init version2 ...")
        },
        mounted() {

        },
        getUserInfo(user){
            this.userInfo = user
        },
    }
})
</script>

<style scoped lang="less">

@import "../../assets/less/mixin.less";

.outer {
    margin: 0;
    padding: 0;
    min-height: 18.75rem;
    width: 100%;
    background-color: #fff;
}
.infos {
    width: 100%;
    height: 5.45rem;
    background-size: cover;
    background-repeat: no-repeat;
    .bg-image('../../assets/images/index/index_bg');
}
.orders {
    position: absolute;
    top: 4.08rem;
    width: 92%;
    height: 2.94rem;
    margin: 0 0.3rem;
    box-sizing: border-box;
    background-color: #fff;
    border: 0.5px solid #F1F1F1;
    border-radius: 0.16rem;
    opacity: 100%;
    box-shadow:0 2.5px 25% #D5D5D5;
}
.orders-title {
    margin: 0.5rem 0 0 0.4rem;
    width: 1.36rem;
    height: 0.64rem;
    color: #292929;
    font-weight: bold;
    font-family: PingFangSC-Medium, sans-serif;
    font-size: 0.34rem;
    text-align: left;
    vertical-align: text-top;
    opacity: 100%;
}
.orders-title {
    margin: 0.37rem 0 0 0.74rem;
    width: 100%;
    height: 0.32rem;
    color: #292929;
    font-weight: bold;
    font-family: PingFangSC-Medium, sans-serif;
    font-size: 0.26rem;
    text-align: left;
    vertical-align: text-top;
    opacity: 100%;
}
.order-text {
    width: 1.04rem;
    height: 0.24rem;
}
</style>



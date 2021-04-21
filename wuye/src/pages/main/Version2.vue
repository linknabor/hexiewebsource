<template>
    <div class="main">
        <van-skeleton title :row="3" :loading="skeletonLoading" style="padding-top:2rem">
        <div>
            <van-popup v-model="qrShow">
                <vue-qr :text="qrImage" :margin="20" :size="275"></vue-qr>
            </van-popup>
        </div>
        <div class="header">
            <div class="location">
                <div class="location-image"></div>
                <div class="location-text">{{this.sectName}}</div>
                <div class="owner-text" @click="showQrcode">业主码</div>
                <div class="owner-image" @click="showQrcode"></div>
            </div>
        </div>
        <div :class="activeIconClass">
            <ul>
                <li v-for="(menu, index) in menuList" :key="index"
                    :class="[{'icon-layer-upon-first':index%4===0 && index < 4 }, 
                    {'icon-layer-upon-other': index%4!==0 && index < 4}, 
                    {'icon-layer-down-first': index%4===0 && index >= 4}, 
                    {'icon-layer-down-other': index%4!==0 && index >= 4}
                    ]"
                    @click="gotoPage(menu.url, menu.status, menu.code)">
                    <div class="icon" :style="{'background-image': 'url('+menu.image+')'}"></div>
                    <span class="icon-text">{{menu.name}}</span>
                </li>
            </ul>
        </div>
        <div :class="activeMomHeaderclass">
            <span class="moments-header-text">我的圈子</span>
        </div>
        <div class="moments">
            <div class="moment-title">
                <div class="head-image"></div>
                <span class="head-sect">三林苑</span>
            </div>
            <div class="moment-content">
                <div class="content-text">升级了！小区物业清扫用上清扫机器人</div>
                <div class="content-image"></div>
            </div>
            <div class="pub-date">30分钟前</div>
        </div>
        
        <div class="moments">
            <div class="moment-title">
                <div class="head-image"></div>
                <span class="head-sect">三林苑</span>
            </div>
            <div class="moment-content">
                <div class="content-text">升级了！小区物业清扫用上清扫机器人</div>
                <div class="content-image"></div>
            </div>
            <div class="pub-date">30分钟前</div>
        </div>
        <div class="main-end"></div>
        </van-skeleton>
        <foot @userInfo="setUser"></foot>
    </div>
    
</template>

<script>
import Foot from '@/components/footer.vue'
import { Skeleton, Popup, Toast, Dialog } from "vant"
import VueQr from 'vue-qr'

export default ({
    data (){
        return {
            sectName: '',
            userInfo: {},
            menuList: [],
            activeIconClass: 'icons',
            activeMomHeaderclass: 'moments-header',
            skeletonLoading: true,
            qrShow:false, //二维码显示开关
            qrImage:'',
        }
    },
    components: {
        'foot': Foot,
        VueQr,
        [Skeleton.name]: Skeleton,
        [Popup.name]: Popup,
        [Toast.name]: Toast
    },
    mounted(){
        this.timer = setTimeout(()=>{   //设置延迟执行
            this.skeletonLoading = false  
        },1000);
    },
    methods: {
        setUser(data){
            this.userInfo = data
            this.sectName = this.userInfo.xiaoquName
            if(!this.sectName){
                this.sectName = "游客"
            }
            this.menuList = data.menuList
            if(this.menuList.length <= 4 && this.menuList.length > 0){
                this.activeIconClass = 'icons-single'
                this.activeMomHeaderclass = 'moments-header-single'
            }
        },
        showQrcode() {
            let image = "?appid=" + this.userInfo.appId + "&userid=" + this.userInfo.wuyeId;
            this.qrShow = true
            this.qrImage = image
        },
        gotoPage(url, status, code){
            console.log(url)
            console.log(status)
            if(status!==1){
                Toast("当前功能尚未开通。")
                return 
            }
            if(!code){
                Toast("当前功能尚未开通。")
                return
            }
            if('repair'===code) {
                this.gotoRepair(url)
            } else if ('onsale'===code) {
                this.gotoEshop(url)
            } else if ('rgroup'===code) {
                this.gotoHref(url)
            } else if ('service'===code) {
                this.gotoHref(url)
            } else if ('evoucher'===code){
                this.gotoEvoucher(url)
            } else {
                this.$router.push({path: url, query:{}})
            }
            
        },
        gotoRepair(url) {
            let user = this.userInfo
            if(!user.sectId || user.sectId===0 || user.sectName === null){
                Dialog({message: '您暂未绑定房屋，请前往“我是业主”\r\n进行操作！'})
                return
            }else  if(user.cfgParam==null || user.cfgParam.ONLINE_REPAIR == undefined||user.cfgParam.ONLINE_REPAIR==0) {
                Dialog({message: '当前所在的小区未开启当前业务'})
                return
            }else {
                this.$router.push({path: url,query:{'projectId':'1'}})
            }
        },
        gotoEshop(url){
            location.href = this.basePageUrl + url + this.common.getoriApp() + '#/classification'
        },
        gotoHref(url){
            location.href = this.basePageUrlpay + url + this.common.getoriApp()
            location.href = this.basePageUrl + url + this.common.getoriApp()
        },
        gotoEvoucher(url){
            location.href = this.basePageUrl + url + this.common.getoriApp()+'#/cardrollindex'
        }
    },

})
</script>

<style scoped lang='less'>
@import "../../assets/less/mixin.less";

.main{
    min-height: 100vh;
    width: 100%;
    background-color: #F7F7F8;
}

.location{
    padding: 0.67rem 0 0 4.17%;
    &-image{
        float: left;
        width: 0.25rem;
        height: 0.32rem;
        background-size: cover;
        background-repeat: no-repeat;
        .bg-image('../../assets/images/index/location')
    }
    &-text{
        margin-left: 0.15rem;
        margin-top: 0.04rem;
        float: left;
        text-align: left;
        font-size: 0.26rem;
        color: #FFFFFF;
    }
}
.owner-text{
    position: absolute;
    margin-left: 5.57rem;
    margin-top: 0.04rem;
    float: left;
    text-align: left;
    font-size: 0.26rem;
    color: #FFFFFF;
}
.owner-image{
    position: absolute;
    margin-left: 6.55rem;
    float: left;
    width: 0.32rem;
    height: 0.32rem;
    background-size: cover;
    background-repeat: no-repeat;
    .bg-image('../../assets/images/index/qrcode');
}

.header{
    width: 100%;
    height: 2.71rem;
    background-size: cover;
    background-repeat: no-repeat;
    .bg-image('../../assets/images/index/index_bg');
}

.icons {
    top: 1.25rem;
    margin: 0 4%;
    background-color: #fff;
    position: absolute;
    width: 92%;
    // height: 3.77rem;
    height: auto;
    border-radius: 0.16rem;
}

.icons-single {
    top: 1.25rem;
    margin: 0 4%;
    background-color: #fff;
    position: absolute;
    width: 92%;
    // height: 1.88rem;
    height: auto;
    border-radius: 0.16rem;
}

.icon-layer-upon-first{
    // margin: 0.23rem 0.42rem;
    margin: 0.23rem 0.24rem 0.34rem 0.34rem;
    float: left;
    width: 1.04rem;
}

.icon-layer-upon-other{
    margin: 0.23rem 0.24rem 0.34rem 0.48rem;
    float: left;
    width: 1.04rem;
}

.icon-layer-down-first{
    margin: 0.08rem 0.24rem 0.44rem 0.34rem;
    float: left;
    width: 1.04rem;
}
.icon-layer-down-other{
    margin: 0.08rem 0.24rem 0.44rem 0.48rem;
    float: left;
    width: 1.04rem;
}

.icon {
    width: 0.84rem;
    height: 0.84rem;
    background-size: cover;
    background-repeat: no-repeat;
}

.icon-text{
    margin-left: -0.1rem;
    font-size: 0.26rem;
    text-align: left;
}

.icon-layer-down{
    width: 0.84rem;
    height: 0.84rem;
    background-size: cover;
    background-repeat: no-repeat;
}
.moments-header {
    color: #292929;
    text-align: left;
    font-weight: bolder;
    font-size: 0.38rem;
    margin: 2.4rem 0 0.41rem 0.4rem;
}

.moments-header-single {
    color: #292929;
    text-align: left;
    font-weight: bolder;
    font-size: 0.38rem;
    margin: 0.75rem 0 0.41rem 0.4rem;
}

.moments{
    width: 92%;
    // height: 6.28rem;
    margin: 0rem 4% 0rem 4%;
    background-color: #FFFFFF;
    border-radius: 0.16rem;
}

.moment-title{
    padding: 0.4rem 0 0 0.3rem;
    width: 100%;
    position: relative;
}

.head-image{
    width: 0.86rem;
    height: 0.86rem;
    background-size: cover;
    background-repeat: no-repeat;
    .bg-image('../../assets/images/index/momentsDefHead');
    display: inline-block;
}

.head-sect{
    margin-top: 0.22rem;
    margin-left: 0.2rem;
    color: #C793F7;
    text-align: left;
    font-size: 0.3rem;
    vertical-align: top;
    display: inline-block;
}

.moment-content{
    margin: 0.3rem 0 0 0.3rem;
    width: 100%;
}

.content-text{
    text-align: left;
    color: #292929;
    font-size: 0.32rem;
}
.content-image{
    margin-top: 0.3rem;
    width: 4.38rem;
    height: 2.5rem;
    border-radius: 0.16rem;
    background-size: cover;
    background-repeat: no-repeat;
    background-image: url('../../assets/images/index/sample1.png');
}
.pub-date{
    margin: 0.26rem 0 0.3rem 0.32rem;
    color: #BFBEB9;
    text-align: left;
    font-size: 0.26rem;
    padding-bottom: 0.4rem;
    width: 1.3rem;
    height: 0.24rem;
}
.main-end{
    width: 100%;
    height: 1.2rem;
}

</style>

<style scoped>
    [v-cloak]{
        display: none;
    }
</style>
<template>
    <div class="main" v-cloak>
        <div class="white-blank" v-show="skeletonLoading==true"></div>
        <van-skeleton title :row="3" :loading="skeletonLoading">
        <div>
            <van-popup v-model="qrShow">
                <vue-qr :text="qrImage" :margin="20" :size="275"></vue-qr>
            </van-popup>
        </div>
        <div class="header">
            <div class="location">
                <div class="location-image"></div>
                <div class="location-text">{{this.sectName}}</div>
                <div class="owner-text" @click="showQrcode" v-show="registered">业主码</div>
                <div class="owner-image" @click="showQrcode" v-show="registered"></div>
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
        <van-pull-refresh v-model="pageRefreshing" @refresh="onRefresh" loosing-text="加载中">
            <van-list v-model="pageLoading" :finished="pageLoadingFinished" @load="getNotice" error-text="请求失败，点击重新加载" :error.sync="pageLoadError" >
                <div class="moments" v-for="(notice, index) in noticeList" :key="index">
                    <div class="moment-title">
                        <div :class="[{'sys-notice-image': notice.noticeType===9||notice.noticeType===10},
                            {'wuye-notice-image': notice.noticeType===0||notice.noticeType===1
                            || notice.noticeType===2||notice.noticeType===3},
                            {'moment-notice-image': notice.noticeType===11},
                            {'option-notice-image': notice.noticeType=== 12 || notice.noticeType===13
                            ||notice.noticeType===14||notice.noticeType=== 15||notice.noticeType=== 16 }]" >
                        </div>
                        <span class="head-sect">{{notice.creator}}</span>
                    </div>
                    <div class="moment-content" @click="notice.noticeType!==11&&noticeDetail(notice.url)">
                        <div class="content-text" v-for="(msg, key) in notice.showMsg" :key="key">{{msg}}</div>
                        <div class="content-image"
                                v-for="(image, key) in notice.thumbnailImgList" :key="key">
                                    <div :class="[{'content-image-view': notice.thumbnailImgList.length===1},
                                {'content-image-view-multi': notice.thumbnailImgList.length>=2&&key!==2},
                                {'content-image-view-triple': notice.thumbnailImgList.length>2&&key===2}]"
                                :style="{'background-image': 'url('+image+')'}" @click="notice.noticeType===11&&showImage(notice.imgList, key)"></div>
                            </div>
                            <div style="clear: both"></div>
                    </div>
                    <div class="pub-date">{{notice.noticeDate}}</div>
                </div>
            </van-list>
            <van-empty description="还没有消息哦" image="search" image-size="1.8rem" v-if="noticeList.length==0"/>
        </van-pull-refresh>

        <div class="main-end"></div>
        </van-skeleton>
        <foot @userInfo="setUser"></foot>
    </div>

</template>

<script>
import Foot from '@/components/footer.vue'
import VueQr from 'vue-qr'
import { Skeleton, Popup, Toast, Dialog, Empty, List, PullRefresh, ImagePreview } from 'vant'
import NoticeApi from '@/api/NoticeApi.js'

export default ({
    data (){
        return {
            registered: false,
            sectName: '',
            userInfo: {},
            menuList: [],
            noticeList: [],
            activeIconClass: 'icons',
            activeMomHeaderclass: 'moments-header',
            skeletonLoading: true,
            qrShow:false, //二维码显示开关
            qrImage:'',
            currPage: 0, //当前页
            pageLoading: false,
            pageLoadingFinished: false,
            pageLoadError: false,
            pageRefreshing: false
        }
    },
    watch: {
        menuList: {
            handler(val){
                if(val.length > 0){
                    // this.getNotice()
                }
            },
            deep: true
        }
    },
    components: {
        'foot': Foot,
        VueQr,
        [Skeleton.name]: Skeleton,
        [Popup.name]: Popup,
        [Toast.name]: Toast,
        [Empty.name]: Empty,
        [List.name]: List,
        [PullRefresh.name]: PullRefresh,
        [ImagePreview.name]: ImagePreview,
    },
    created(){
        if(this.getUrlParam("code") && this.getUrlParam("appid") && this.getUrlParam("state")){
            let oriApp = this.getUrlParam("oriApp")
            let param = {}
            if(oriApp) {
                param = {
                    oriApp: oriApp
                }
                
            }
            this.$router.push({path:this.$route.path, query: param})
        }
    },
    mounted(){
    },
    methods: {
        setUser(data){
            this.userInfo = data
            if(this.userInfo && this.userInfo.id){
                this.skeletonLoading = false
            }
            if(this.userInfo.sectId && this.userInfo.sectId !== '0'){
                this.sectName = this.userInfo.xiaoquName
            }
            if(!this.sectName){
                this.sectName = "游客"
            }
            if(this.userInfo.tel){
                 this.registered = true
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
            }else  if(!user.repairService) {
                Dialog({message: '当前所在小区未开启当前业务'})
                return
            } else {
                url = '/workorder' //TODO 应该取菜单里的
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
        },
        getNotice(){
            setTimeout(() => {
                NoticeApi.getNotice(this.currPage).then((response)=>{
                    this.pageLoading = false
                    this.pageRefreshing = false
                    let data = response.data
                    console.log(data)
                    if(data && data.errorCode === 0){
                        if(data.result && data.result.length ===0){
                            this.pageLoadingFinished = true
                        }else {
                            this.noticeList = this.noticeList.concat(data.result)
                            this.currPage++
                        }
                    }else {
                        console.log(data.error)
                        this.pageLoadError = true
                    }
                }).catch((err)=>{
                    console.log(err)
                    this.pageLoadError = true
                })
            }, 1000)
        },
        onRefresh(){
            this.pageLoadingFinished = false;
            this.pageLoading = true;
            this.getNotice();
        },
        noticeDetail(url){
            console.log(url)
            if(!url){
                Toast("未配置跳转链接")
                return
            }
            location.href = url
        },
        showImage(imageArr, index){
            ImagePreview({
                images: imageArr,
                startPosition: index,
            });
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
.white-blank {
    height: 1rem;
    width: 100%;
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
    margin: 2.1rem 0 0.2rem 0.4rem;
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
    padding: 0.2rem 0 0 0.3rem;
    width: 100%;
    position: relative;
}

.sys-notice-image{
    width: 0.7rem;
    height: 0.7rem;
    background-size: cover;
    background-repeat: no-repeat;
    .bg-image('../../assets/images/index/syshead_logo');
    display: inline-block;
}

.wuye-notice-image{
    width: 0.7rem;
    height: 0.7rem;
    background-size: cover;
    background-repeat: no-repeat;
    .bg-image('../../assets/images/index/xiaoxi');
    display: inline-block;
}

.option-notice-image {
  width: 0.7rem;
  height: 0.6rem;
  background-size: cover;
  background-repeat: no-repeat;
  .bg-image('../../assets/images/index/option');
  display: inline-block;
}

.moment-notice-image{
    width: 0.7rem;
    height: 0.7rem;
    background-size: cover;
    background-repeat: no-repeat;
    .bg-image('../../assets/images/index/moments_logo');
    display: inline-block;
}

.head-sect{
    margin-top: 0.15rem;
    margin-left: 0.1rem;
    color: #C793F7;
    text-align: left;
    font-size: 0.3rem;
    vertical-align: top;
    display: inline-block;
}

.moment-content{
    margin: 0.1rem 0 0 0.3rem;
    width: 100%;
}

.content-text{
    text-align: left;
    color: #292929;
    font-size: 0.25rem;
    width: 90%;
    padding-top: 0.05rem;
}
.content-image{
    margin-top: 0.15rem;
    height: auto;
}
.content-image-view {
    width: 3rem;
    height: 1.5rem;
    border-radius: 0.16rem;
    background-size: cover;
    background-repeat: no-repeat;
}
.content-image-view-multi {
    width: 1.58rem;
    height: 1.58rem;
    margin-left: 0.1rem;
    margin-bottom: 0.1rem;
    border-radius: 0.16rem;
    background-size: cover;
    background-repeat: no-repeat;
    float: left;
}
.content-image-view-triple {
    width: 1.58rem;
    height: 1.58rem;
    margin-left: 0.1rem;
    border-radius: 0.16rem;
    background-size: cover;
    background-repeat: no-repeat;
    float: left;
    clear:both;
}
.pub-date{
    margin: 0.15rem 0 0.15rem 0.32rem;
    color: #BFBEB9;
    text-align: left;
    font-size: 0.24rem;
    padding-bottom: 0.2rem;
    width: 1.3rem;
    height: 0.24rem;
}
.main-end{
    width: 100%;
    height: 1.8rem;
}

</style>

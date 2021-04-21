<template>
    <div class="main">
        <div class="header">
            <div class="location">
                <div class="location-image"></div>
                <div class="location-text">三林苑</div>
                <div class="owner-text">业主码</div>
                <div class="owner-image"></div>
            </div>
        </div>
        <div :class="activeIconClass">
            <ul>
                <li v-for="(menu, index) in menuList" :key="index"
                    :class="[{'icon-layer-upon-first':index%4===0 }, 
                    {'icon-layer-upon-other': index%4!==0}]"
                >
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
        <foot @userInfo="setUser"></foot>
    </div>
    
</template>

<script>
import Foot from '@/components/footer.vue'


export default ({
    data (){
        return {
            userInfo: {},
            menuList: [],
            activeIconClass: 'icons',
            activeMomHeaderclass: 'moments-header',
        }
    },
    components: {
        'foot': Foot,
    },
    mounted(){
        
    },
    methods: {
        setUser(data){
            this.userInfo = data
            this.menuList = data.menuList
            if(this.menuList.length <= 4 && this.menuList.length > 0){
                this.activeIconClass = 'icons-single'
                this.activeMomHeaderclass = 'moments-header-single'
            }
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
    margin-left: 4.39rem;
    margin-top: 0.04rem;
    float: left;
    text-align: left;
    font-size: 0.26rem;
    color: #FFFFFF;
}
.owner-image{
    margin-left: 0.2rem;
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
    height: 3.77rem;
    border-radius: 0.16rem;
}

.icons-single {
    top: 1.25rem;
    margin: 0 4%;
    background-color: #fff;
    position: absolute;
    width: 92%;
    height: 1.88rem;
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
    top: 2.31rem;
    color: #292929;
    text-align: left;
    vertical-align: top;
    font-weight: bolder;
    font-size: 0.38rem;
    margin: 0.5rem 0 0.41rem 0.4rem;
}

.moments-header-single {
    color: #292929;
    text-align: left;
    font-weight: bolder;
    font-size: 0.38rem;
    margin: 1rem 0 0.41rem 0.4rem;
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
    width: 1.1rem;
    height: 0.24rem;
}
.main-end{
    width: 100%;
    height: 1.2rem;
}

</style>

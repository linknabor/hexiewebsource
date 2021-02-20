<template>
    <van-popup v-model="show" position="bottom" duration='0.3' :style="{ height: '30%'}"  overlay>
        <wx-open-subscribe style="width: 100vw; height:300px;"  :template="subTemplateId" id="subscribe-btn" @success="success" @error="subError">
            <script type="text/wxtag-template" >
                <style>
                    .subscribe-btn {
                        width: 80%;
                        height: 100px;
                        margin: 30% 20% 0 20%;
                        padding:5px;
                        color: #fff;
                        background-color: #07c160;
                        border-radius:25px;
                        border-style: none;
                    }
                </style>
                <button class="subscribe-btn">用户通知订阅授权</button>
            </script>
        </wx-open-subscribe>
        <!-- <div style="width: 100vw; height:10vh;">
            <button class="subscribe-btn">用户通知订阅授权设置</button>
        </div> -->
    </van-popup>
</template>
<script>
import WxSDK from 'weixin-js-sdk'
let wx = WxSDK;
wx.ready(function () {
    console.log("btn is ready.")
    
});
wx.error(function (res) {
    console.log("btn load failed! ")
    console.log(res);
});

export default {

    data(){
        return{
            subTemplateId: ["KUjDXVF_BuNrDMPQvPYW1iH1w494684wX4leETDa_30"],
            show: false
        }
    },
    created(){

    },
    mounted(){
        console.log("init wxopen component");
        this.initSubscButton();
        this.showSubsribeSetting();
    },
    methods: {
        initSubscButton() {
            var url = location.href.split("#")[0];
            var data = {
                vm:this,
                wx:wx,
                apiList:[],
                openTagList:['wx-open-subscribe'],
                url:url
            }
            this.receiveData.wxconfig(data);
        },
        showSubsribeSetting(){
            this.timer = setTimeout(()=>{   //设置延迟执行
                this.show = true;
            },1500);
            
            // let tel = this.common.getUserCookie("tel");
            // if(tel){
            //     console.log("user not registered !");
            // }else {
            //     this.timer = setTimeout(()=>{   //设置延迟执行
            //         this.show = true;
            //     },1500);
            // }
        },
        // 错误提示
        subError(e) {
            console.log(e)
        },
        // 我这里判断是必须把复数模板全部订阅
        success(e) {
            let attend = false;
            let subscribeDetails = JSON.parse(e.detail.subscribeDetails); // 全部的模板
            for(let i in this.subTemplateId) {
                let subKey = subscribeDetails[this.subTemplateId[i]]; // 获取每个模板的状态
                let status = JSON.parse(subKey);
                let type = false;
                switch(status.status){
                    case "reject":
                        this.$toast(`用户拒绝订阅全部消息`);
                        type = false;
                        break;
                    case "cancel":
                        this.$toast(`用户取消订阅全部消息`);
                        type = false;
                        break;
                    case "filter":
                        this.$toast(`第${i}条消息应该标题同名被后台过滤`);
                        type = false;
                        break;
                    default:
                        type = true;
                        break;
                };
                if(!type) { // 如果其中有一个模板没有订阅，则全部不通过过
                    attend = false;
                    break;
                } else {
                    attend = true;
                };
            };
            if(!attend) {
                this.$toast("订阅消息才能参与")
                console.log("订阅消息才能参与")
                return
            };
            console.log("参与成功")
        }

    }
}
</script>
<style scoped>
    .subscribe-btn {
        width: 70%;
        height: 80%;
        margin: 1rem 1rem 0rem 1rem;
        color: #fff;
        background-color: #07c160;
        border-radius:25px;
        border-style: none;
    }
</style>

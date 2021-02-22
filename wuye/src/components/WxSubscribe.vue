<template>
    <van-popup v-model="show" position="bottom" duration='0.3' :style="{ height: '20%'}"  overlay round>
        <wx-open-subscribe style="width:100vw"  :template="subTemplateId" id="subscribe-btn" @success="success" @error="subError">
            <script type="text/wxtag-template" >
                <style>
                    .subscribe-btn {
                        width: 80%;
                        height: 200%;
                        margin: 20% 10% 0 10%;
                        padding:5px;
                        color: #fff;
                        background-color: #07c160;
                        border-radius:25px;
                        border-style: none;
                        font-size: 100%;
                    }
                </style>
                <button class="subscribe-btn">授权订阅通知</button>
            </script>
        </wx-open-subscribe>
        <!-- <div style="width:100vw; height:19.2px;">
            <button class="subscribe-btn">用户通知授权设置</button>
        </div> -->
    </van-popup>
</template>
<script>
import WxSDK from 'weixin-js-sdk'
import { Toast } from 'vant'

export default {

    data(){
        return{
            subTemplateId: ["nFQNN0gCejjQBGG8ZyB5uF5zcG8Bu7wd2_QPrAY0FA4"],
            show: false,
            wx:{}
        }
    },
    created(){
        this.wx = WxSDK;
    },
    mounted(){
        console.log(this.wx);
        console.log("init wxopen component");
        this.initSubscButton();
        this.wxInitReady();
        // this.wxInitFailed();
        // this.test();
    },
    methods: {
        test(){
                         
            let templateId = 'TenvU22BA1jCp4YHfYEpRuESXYReQyDuhs4vbdWA99I';                         
            let errorMsg = "{\"subscribeDetails\":{\"nFQNN0gCejjQBGG8ZyB5uF5zcG8Bu7wd2_QPrAY0FA4\":{\"status\":\"accept\"}, \"TenvU22BA1jCp4YHfYEpRuESXYReQyDuhs4vbdWA99I\":{}}}";
            let details = JSON.parse(errorMsg);
            let subscribeDetails = details.subscribeDetails;
            let subKey = subscribeDetails[templateId];
            console.log(subKey)
        },
        initSubscButton() {
            var url = location.href.split("#")[0];
            var data = {
                vm:this,
                wx:this.wx,
                apiList:[],
                openTagList:['wx-open-subscribe'],
                url:url
            }
            this.receiveData.wxconfig(data);
        },
        showSubscribeSetting(){
            let subscribed = this.common.getUserCookie("msgSubscribe"); //accept, reject,以及off，无论什么结果，什么操作过了，都不弹窗
            if(!subscribed){
                return false;
            }
            this.timer = setTimeout(()=>{   //设置延迟执行
                this.show = true;
            },1000);
            
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
            console.log(e);
            let attend = false;
            let subscribeDetails = JSON.parse(e.detail.subscribeDetails); // 全部的模板
            console.log(subscribeDetails);
            for(let i in this.subTemplateId) {
                let subKey = subscribeDetails[this.subTemplateId[i]]; // 获取每个模板的状态
                // let status = JSON.parse(subKey);
                let status = subKey.status;
                console.log(subKey);
                console.log("status:" + status);
                let flag = false;
                if(status){
                    switch(status){
                        case "accept":
                            flag = true;
                            break;
                        case "reject":
                            flag = false;
                            break;
                        case "cancel":
                            flag = false;
                            break;
                        case "filter":
                            // this.$toast(`第${i}条消息应该标题同名被后台过滤`);
                            flag = false;
                            break;
                        default:
                            flag = false;
                            break;
                    };
                    if(!flag) { // 如果其中有一个模板没有订阅，则全部不通过过
                        attend = false;
                    } else {
                        attend = true;
                    };
                }
            };
            if(!attend) {
                Toast("未进行任何消息订阅");
            } else {
                this.common.updateCookieByKey("msgSubscribe", "accept");
                Toast("订阅成功");
            }
            
        },
        //wx的初始化成功回调
        wxInitReady(){
            this.wx.ready(()=>{
                console.log("btn is ready.")
                this.showSubscribeSetting();
            });
        },
        //wx初始化失败回调
        wxInitFailed(){
            this.wx.error((res)=>{
                console.log("btn load failed! ")
            });
        }

    }
}
</script>
<style scoped>
    .subscribe-btn {
        width: 80%;
        height: 200%;
        margin: 20% 10% 0 10%;
        padding:5px;
        color: #fff;
        background-color: #07c160;
        border-radius:25px;
        border-style: none;
        font-size: 100%;
    }
</style>

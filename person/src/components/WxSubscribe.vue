<template>
    <van-popup v-model="show" position="bottom" duration='0.3' :style="{ height: '20%'}"  overlay round>
        <wx-open-subscribe style="width:100vw"  :template="subTemplateId" id="subscribe-btn" @success="success" @error="subError">
            <script type="text/wxtag-template" >
                <style>
                    .subscribe-btn {
                        width: 80%;
                        height: 200%;
                        margin: 12% 10% 0 10%;
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
import Bus from '../api/bus.js';
import { Toast } from 'vant';

export default {

    data(){
        return{
            subTemplateId: [],
            show: false,
            wx:{}
        }
    },
    created(){
        this.wx = WxSDK;
    },
    mounted(){
        this.initSubscButton();
        Bus.$on("wxSubscribe",this.wxInitReady);
        // Bus.$on("wxSubscribe",this.showSubscribeSetting);
        this.wxInitFailed();
        // this.test();
    },
    beforeDestroy() {
        Bus.$off();
　　},
    methods: {
        
        test(){
                         
            let templateId = 'nFQNN0gCejjQBGG8ZyB5uF5zcG8Bu7wd2_QPrAY0FA4';                         
            let errorMsg = "{\"subscribeDetails\":{\"nFQNN0gCejjQBGG8ZyB5uF5zcG8Bu7wd2_QPrAY0FA4\":{\"status\":\"accept\"}, \"TenvU22BA1jCp4YHfYEpRuESXYReQyDuhs4vbdWA99I\":{}}}";
            // let details = JSON.parse(errorMsg);
            // let subscribeDetails = details.subscribeDetails;
            // let subKey = subscribeDetails[templateId];
            // console.log(subKey)
            // let json = JSON.parse(subKey);
            // console.log(json.status);

            console.log(errorMsg.indexOf(templateId));
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
        showSubscribeSetting(data){
            console.log(data);
            if(!data){
                return false;
            }
            this.subTemplateId = data;
            this.timer = setTimeout(()=>{   //设置延迟执行
                this.show = true;
            },1000);
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
                let statusJson = JSON.parse(subKey);
                console.log(statusJson.status);
                let flag = false;
                if(statusJson.status){
                    switch(statusJson.status){
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
                    if(flag) {
                        attend = true;
                    };
                }
            };
            if(!attend) {
                Toast("未进行任何消息订阅");
            } else {
                Toast("已成功订阅");
            }
            
        },
        //wx的初始化成功回调
        wxInitReady(result){
            this.wx.ready(()=>{
                console.log("btn is ready.");
                console.log(result);
                this.showSubscribeSetting(result);
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
        margin: 12% 10% 0 10%;
        padding:5px;
        color: #fff;
        background-color: #07c160;
        border-radius:25px;
        border-style: none;
        font-size: 100%;
    }
</style>

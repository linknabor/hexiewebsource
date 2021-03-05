<template>
    <div>
        <wx-open-subscribe style="width:85vw; height:44px;"  :template="subTemplateId" id="subscribe-btn" @success="success" @error="subError">
            <script type="text/wxtag-template" >
                <style>
                    .subscribe-btn {
                        <!-- background-color:transparent;
                        border-style:none; -->
                        width: 100vw
                    }
                </style>
                <button class="subscribe-btn">去授权</button>
            </script>
        </wx-open-subscribe>
    </div>
    <!-- <button class="subscribe-btn"></button> -->
</template>
<script>
import WxSDK from 'weixin-js-sdk'
import weixin from '@/util/weixin.js'
import Bus from "@/util/bus.js"
import { Toast, Popup, Button } from 'vant'

export default {
    name: 'wxSubscribe',
    data(){
        return{
            subTemplateId: [],
            wx:{}
        }
    },
    components:{
        [Popup.name]: Popup,
        [Button.name]: Button
    },
    created(){
        this.wx = WxSDK;
    },
    mounted(){
        Bus.$on("subscribe", this.initSubscButton)
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
        initSubscButton(templateIds) {
            this.subTemplateId = templateIds
            console.log(this.subTemplateId)
            var url = location.href.split("#")[0];
            var data = {
                wx:this.wx,
                apiList:[],
                openTagList:['wx-open-subscribe'],
                url:url
            }
            weixin.config(data)
            this.wxInitReady()
            this.wxInitFailed()
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
                    }
                    if(flag) {
                        attend = true;
                    }
                }
            }
            if(!attend) {
                Toast("未进行任何消息订阅");
            } else {
                Toast("操作成功");
            }
            
        },
        //wx的初始化成功回调
        wxInitReady(){
            this.wx.ready(()=>{
                console.log("btn is ready.");
            });
        },
        //wx初始化失败回调
        wxInitFailed(){
            this.wx.error((res)=>{
                console.log("btn load failed! " + res)
            });
        }

    }
}
</script>
<style scoped>
    .subscribe-btn {
        /* background-color:transparent; */
        border-style:none;
    }
</style>

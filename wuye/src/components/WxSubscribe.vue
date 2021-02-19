<template>
    <wx-open-subscribe style="width: 100%; height:100px;"  :template="subTemplateId" id="subscribe-btn" >
        <script type="text/wxtag-template" @success="success" @error="subError">
            <style>
                .subscribe-btn {
                    color: #fff;
                    background-color: #07c160;
                    /* opacity: 0; */
                    width: 100%;
                    height: 40px;
                    overflow: hidden;
                    text-overflow:ellipsis;
                    white-space: nowrap;
                }
            </style>
            <button class="subscribe-btn">授权</button>
        </script>
    </wx-open-subscribe>
    <!-- <div style="width: 100%; height:100px;" >
        <button class="subscribe-btn">授权</button>
    </div> -->
</template>
<script>
import WxSDK from 'weixin-js-sdk'
export default {

    data(){
        return{
            subTemplateId: ["i99T0JABYLqtca0h4P0d2qzRmoRyAeWPnSnwizpxlp4"]
        }
    },
    created(){

    },
    mounted(){
        console.log("init wxopen component");
        this.initSubscButton();
    },
    methods: {
        initSubscButton() {
            var url = location.href.split("#")[0];
            var data = {
                vm:this,
                wx:WxSDK,
                apiList:[],
                openTagList:['wx-open-subscribe'],
                url:url
            }
            this.receiveData.wxconfig(data);
        },
        // 错误提示
        subError(e) {
            console.log(e.errMsg)
        },
        // 我这里判断是必须把复数模板全部订阅
        success(e) {
            console.log(e)
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
        color: #fff;
        background-color: #07c160;
        /* opacity: 0; */
        width: 100%;
        height: 40px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
</style>

<template>
    <li name="lauch" class="van-icon" style="font-size:0.98rem">
        <!-- <wx-open-launch-weapp id="launch-btn" :username="menu.oriId" :path="menu.url" @launch="success" @error="launchError" ref="launch-btn">
        </wx-open-launch-weapp> -->
        <!-- <div id="launch-btn" :username="menu.oriId" :path="menu.url" @launch="success" @error="launchError" ref="launchBtn"></div> -->
    </li>
</template>
<script>
import WxSDK from 'weixin-js-sdk'
import Weixin from '@/util/weixin.js'
import {Popup, Button, Icon } from 'vant'

export default {
    name: 'wxLaunchWeapp',
    data(){
        return{
        }
    },
    components:{
        [Popup.name]: Popup,
        [Button.name]: Button,
        [Icon.name]: Icon
    },
    created(){
        this.initWxConfig()
    },
    mounted(){
        this.$nextTick(() => {
            this.initBtn()
        })     
    },
    beforeDestroy(){
    },
    methods: {
        
        initWxConfig(){
            var url = location.href.split("#")[0];
            var data = {
                wx:WxSDK,
                apiList:[],
                openTagList:['wx-open-launch-weapp'],
                url:url
            }
            Weixin.config(data)
        },
        // 错误提示
        launchError(e) {
            console.log(e)
            // location.reload()
        },
        // 我这里判断是必须把复数模板全部订阅
        success(e) {
            console.log(e);
        },
        initBtn(){
            let screenWidth = document.documentElement.clientWidth  //取出屏幕宽度
            let realSize = screenWidth/10*0.98  //屏宽除以10*0.98
            let realMarginLeft = screenWidth/10*0.25
            let btnImage = this.menu.image
            let btnText = `<button class="mini-btn-`+this.menu.code+`"></button>
            <style>
                .mini-btn-`+this.menu.code+` {
                    border: 0;
                    padding: 0;
                    width: `+realSize+`px;
                    height: `+realSize+`px;
                    background-size: cover;
                    background-repeat: no-repeat;
                    background-color: transparent;
                    margin-left: `+realMarginLeft+`px;
                    background-image: url('` + btnImage + `');
                }
            </style>`
            let lauchBtn = '';
            let btns = document.getElementsByName("lauch")
            for(let i = btns.length-1; i>=0; i--){
                let element = btns[i]
                if(!element.getAttribute("loaded")){
                    lauchBtn = element
                }
            }
            
            let script = document.createElement("script")
            script.type = "text/wxtag-template"
            script.text = btnText

            let wxopenHtml = `<wx-open-launch-weapp id="launch-btn-`+this.menu.code+`" username="`+this.menu.oriId+`" path="`+this.menu.url+`" >
            `+script.outerHTML+`</wx-open-launch-weapp>`
            lauchBtn.innerHTML = wxopenHtml

            lauchBtn.addEventListener("launch", this.success)
            lauchBtn.addEventListener("error", this.launchError)

            lauchBtn.setAttribute("loaded", true)
            
        }
    },
    props:['menu']
}
</script>
<style scoped>
    /* .mini-btn {
        border: 0;
        width: 0.98rem;
        height: 0.98rem;
        background-size: cover;
        object-fit: cover;
        background-color: transparent;
        font-size: 0.98rem;
        margin-left: 0.25rem;
    } */
</style>

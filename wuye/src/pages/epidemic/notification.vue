<template>
<div class="not">
        <div v-if="falg" class="ov">
            <div class="fl namelogo" >
                <img src="../../assets/images/index/logo.jpg" alt="">
            </div>
            <div class="fl content">
                <span>{{thread.sect_name}}小区业主：</span>
                <div class="adds">
                    <div>
                         <span>{{thread.content}}</span>
                    </div>
                    <img v-if="thread.img_urls != null" :src="thread.img_urls" alt="" @click="getSignatureInfo1()">
                </div>
                <div class="datetime">
                    <img  src="../../assets/images/common/icon_time_gray.png" />
                    &nbsp;{{thread.date_time}}
                </div>
            </div>
        </div>
        <div v-else> 
           <img :src="bgImage" alt="" class="adimg">
        </div>
</div>
</template>

<script>
let vm;
import wx from 'weixin-js-sdk';
export default {
   data () {
       return {
           thread :{},
           messageId:this.$route.query.messageId,//获取id
           falg:false,
           bgImage:this.common.GetImages('7')
       };
   },
   created(){
       vm=this;
   },
   mounted() {
       this.getThread();
   },

   components: {},

   methods: {
        getThread() {
           let url= "servplat/hexiemessage/get?messageId="+vm.messageId;
           vm.receiveData.postData( vm, url,
            {
                
            },
            'data',
            function(){
                if(vm.data.success) {
                    if(vm.data.result){
                         vm.thread = vm.data.result;
                         vm.falg=true;
                    } 
                }else {
                       alert(vm.data.message==null?"获取信息失败，请重试！":vm.data.message);
                }
            })
       },
       getSignatureInfo1() {
            let url = location.href.split('#')[0];
            vm.receiveData.wxconfig(vm,wx,['chooseImage','uploadImage','previewImage'],url);
            wx.ready(function(){ //调用拍照
                wx.previewImage({
                    current: vm.thread.img_urls, // 当前显示图片的http链接
                    urls: [vm.thread.img_urls], // 所有图片
                    success: function (res) {
                    },
                    fail: function(res){
                       
                    }
                });
            });
       }
   },

   computed: {},
}
</script>

<style  scoped>
.not {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #EEEEEE;;
    padding:0.6rem 0.3rem 0;
    overflow:auto;
}
.ov {
    overflow: hidden;
    padding: 1px;
}
.namelogo img{
    width:1rem;
    height: 1rem;
    border-radius: 50%;
    margin-right: 0.2rem;
}
.content {
    background-color: #fff;
    border-radius: 0.3rem;
    width:73%;
    padding:0.3rem;
    margin-top:0.4rem;
    font-size: 0.3rem;
}
.content .adds img{
    width:2rem;
    margin-top:0.15rem;
}
.fl {
    float: left;
}
.adds {
    color: #3b3937;
    word-wrap:break-word;
    overflow:hidden;
    text-indent: 2em;
    letter-spacing: 0.04rem;
    margin-top: 0.12rem;
}
.datetime {
    text-align: right;
    color: #a6937c;
    margin-top: 0.05rem;
}
.datetime img{
    width: 0.32rem;
    height: 0.32rem;
    position: relative;
    top: 0.02rem;
}
.adimg {
        width: 100%;
        height: auto;
} 
</style>
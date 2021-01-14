<template>
<div class="not">
        <div v-if="falg" class="ov">
            <div class="fl namelogo">
                <img src="../../assets/images/index/hxlogo.png" alt="">
            </div>
            <div class="fl content">
                <div class="adds">{{thread.content}}</div>
                <div class="datetime">
                    <img  src="../../assets/images/common/icon_time_gray.png"/>
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
export default {
   data () {
       return {
           thread :{},
           messageId:this.$route.query.messageId,
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
                messageId:vm.messageId,
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
       delThread(){
           
       },
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
    border-radius: 50%;
    margin-right: 0.2rem;
}
.content {
    background-color: #fff;
    border-radius: 0.3rem;
    width:73%;
    padding:0.3rem;
    margin-top:0.4rem;
    font-size: 0.41rem;
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
    margin-bottom: 0.17rem;
}
.datetime {
    font-size: 0.35rem;
    text-align: right;
    color: #a6937c;
}
.datetime img{
    width: 0.35rem;
    height: 0.35rem;
    position: relative;
    top: 0.02rem;
}
.adimg {
        width: 100%;
        height: auto;
} 
</style>
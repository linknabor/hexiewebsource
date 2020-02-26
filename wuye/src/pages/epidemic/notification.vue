<template>
<div class="not">
    <div>
        <div>
            <div style="padding:0.3rem 0 0; overflow: hidden;">
                <div class="ov pl15 pb15 fs13 adds">{{thread.content}}</div>
                <div class="ov pl17 pb15 fs13 fl" style="color: #a6937c;">
                    <img style="width: 0.35rem; height: 0.35rem; position: relative;top: 0.02rem;" src="../../assets/images/common/icon_time_gray.png"/>&nbsp;{{thread.date_time}}
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
let vm;
export default {
   data () {
       return {
           thread :{},
           messageId:this.$route.query.messageId

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
                    vm.thread = vm.data.result;
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
    background: #ffffff;;
    overflow:auto;
}

.ov {
    overflow: hidden;
    padding: 1px;
}
.pb15 {
    padding-bottom: 0.17rem;
}
.pl15 {
    padding-left: 0.24rem;
}
.pl17 {
    padding-left: 0.31rem;
}
.fs14 {
    font-size: 0.22rem;
}

.fl {
    float: left;
}

.fs13 {
    font-size: 0.41rem;
}
.pt15 {
    padding-top: 0.24rem;
}
.pr15 {
    padding-right: 0.4rem;
}
.adds {
    color: #3b3937;
    word-wrap:break-word;
    overflow:hidden;
    text-indent: 2em;
    letter-spacing: 0.03rem;
}
</style>
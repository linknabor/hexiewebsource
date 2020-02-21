<template>
<div class="not">
    <div >
        <div >
            <div style="padding-top: 15px" class="ov pl15 pb15 fs14">
            <div class="fl">
                <img class="fl comment-post-picture" :src="thread.userHead" />
            </div>
            <div class="thread_user_head">{{thread.userName}}</div>
            </div>
            <div class="ov pl15 pb15 fs13" style="color: #3b3937; word-wrap:break-word;overflow:hidden;">{{thread.threadContent}}</div>
            <div class="ov pl15 pb15 fs13 fl" style="color: #a6937c; line-height: 23px">
                <img style="width: 13px; height: 13px;" src="../../assets/images/common/icon_time_gray.png"/>&nbsp;{{thread.formattedDateTime}}
            </div>
            <div class="avatar-wrap rel ov fr" v-show="thread.isThreadOwner == 'true'">
                <div class="fs13 pr15" style="color: #a6937c; text-align: right; line-height: 23px" @click="delThread">删除</div>
            </div>
            <div class="pt15 divider">&nbsp;</div>
        </div>
    </div>
</div>
</template>

<script>
let vm;
export default {
   data () {
       return {
           threadId:"581",
           thread : {},
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
           let url= "thread/getThreadByThreadId";
           vm.receiveData.postData( vm, url,
            {
                threadId:vm.threadId,
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
    padding-bottom: 15px;
}
.pl15 {
    padding-left: 15px;
}
.fs14 {
    font-size: 14px;
}

.fl {
    float: left;
}
.comment-post-picture {
    width: 42px;
    height: 42px;
    margin-right: 15px;
    border: 1px solid #d4cfc8;
    border-radius: 42px;
}
.thread_user_head {
    float: left;
    margin-top: 10.5px;
    font-size: 14px;
    color: #393b37;
}
.fs13 {
    font-size: 13px;
}
.divider {
    border-bottom: 5px solid #f9f9e9;
}
.pt15 {
    padding-top: 15px;
}
.pr15 {
    padding-right: 25px;
}
</style>
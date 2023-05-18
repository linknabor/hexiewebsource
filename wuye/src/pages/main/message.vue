<template>
   <div>
        <div class="ov" style="color:#3b3937;">
            <div class="comment ov p15 fs20">{{message.title}}</div>
             <div class="ov pb15 lite-divider" style="  margin-left: 15px;margin-right:15px">
	            <span class="fl fs12" style="color:#888">
                <i class="icon time-icon"></i>{{message.publishDate}}
                </span>
	            <span class="fr fs12">
                <i class="icon" ></i>
                {{message.fromSite}}
                </span>
	        </div>

             <div class="msg_content" ref='my-element' v-html="message.content"></div>
        </div>
   </div>
</template>

<script>
let vm;
import { ImagePreview } from 'vant'
export default {
   data () {
       return {
           messageID:this.$route.query.messageId,
           message:{},
           htmls: {},
           image: '',
           // title:'资讯信息'
       };
   },
   created() {
       vm=this;
   },
   mounted() {
        vm.query();
   },
   beforeDestroy() {
        const myElement = this.$refs['my-element'];
        myElement.removeEventListener('click', this.showImage);
  },
  watch: {
    htmls: {
        handler(val){
            if(val.length > 0){
                const myElement = this.$refs['my-element'];
                if(this.image){
                    myElement.addEventListener('click', this.showImage.bind(this, this.image));
                }
                
            }
        },
        deep: true
    }
   },
   methods: {
      query() {
           if(vm.messageID ==null || vm.messageID == "") {
               vm.queryMessage();
           }else {
               vm.showMessage();
           }
       },
       queryMessage() {
           let url="/messages/3";
            vm.receiveData.getData(vm,url,'data',function(){
                if(vm.data.result !=null) {
                    vm.message=vm.data.result
                }else {
                    alert('信息未发布');
                    location.href=vm.basePageUrl+"/home/index.html?"+vm.common.getoriApp();
                }
                if(!vm.data.success) {
                    alert("页面获取信息错误，请稍后重试！");
                }
            })
       },
       showMessage() {
           let url="/messageDetail/"+vm.messageID;
             vm.receiveData.getData(vm,url,'data',function(){
                 if(vm.data.success) {
                      if(vm.data.result !=null) {
                         vm.message=vm.data.result
                         vm.htmls = vm.message.content
                         vm.image = vm.message.image
                      }
                 }else {
                      alert("加载消息失败！");
                 }
                
            })
       },
       showImage(image){
            var imgs = [];
            imgs.push(image)
            ImagePreview({
                images: imgs,
                startPosition: 0,
            })
        },
   },
   components: {},
   computed: {},
}
</script>

<style  scoped>
.ov {
    overflow: hidden;
    padding: 1px;
}
.comment {
            margin-top: 5px;
            line-height: 20px;
        }
.p15 {
    padding:15px;
}      
.fs20 {
    font-size:20px;
} 
 .pb15 {
     padding-bottom: 15px;
 }
 .lite-divider {
 	border-bottom: 1px solid #d4cfc8;
 	padding-left: 15px;
}
.fs12 {
    font-size:12px;
}
.ov .icon {
    background-size: 13px;
    display:inline-block;
    width: 13px;
    height: 13px;
    margin-right: 5px;
    vertical-align: bottom;
}
.time-icon {
	background: url("../../assets/images/common/icon_time_gray.png") no-repeat;
}
.msg_content{
    /* margin-left:5%; */
    width: 100%;
    clear: both;
    font-size: 14px;
    overflow: auto;
}
</style>
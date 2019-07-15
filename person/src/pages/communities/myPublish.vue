<template>
   <div>
        <div v-if="threads_count==0">
		        <img src="../../assets/images/img/bg_publish.jpg"/>
	    </div>
        
         <div id="zzmb" class="zzmb" style="display:none;position:fixed;" @click="hideImg"></div>
        <div id="divconf" class="divconf" style="display:block; position:fixed; z-index: 2147483647;" @click="hideImg"></div>

        <div class="thread-item lite-divider pb15" style="padding-left: 0" v-for="thread in threads" >
            <div class="thread_head">
                <div class="category_img" ><img class="fl" :src="'static/community/'+thread.categoryImgName+'.png'" /></div>
                <div class="thread_category">{{thread.categoryCnName}}</div>
                <div  class="img_delete" @click="deleteThread(thread.threadId)">
                    <!-- ../static/images/community/btn_delete.png -->
                    <img style="height: 25px; width: 25px;  float: right" src="../../assets/images/community/btn_delete.png"/>
                </div>
            </div>
            <div class="p15">
                <div class="ov pb15 fs13 " style="color: #3b3937; word-break:break-all;word-wrap:break-word; " :class="{unread:thread.hasUnreadComment=='true'}" @click="gotoDetail(thread.threadId)">{{thread.threadContent}}</div>
                <div class="preview_img_layer" >
                    <div v-for="(previewurl,i) in thread.previewLink">
                        <!-- 如果有图片 -->
                        <div class="ov pb15 fl" @click="viewSrcImg(thread.threadId, i);" >
                            <img class="preview_img" :src="previewurl" /></div>
                    </div>
                </div>
                <div class="fs13" style="color: #a6937c; line-height: 23px; width: 100%;">
                    <img style="width: 13px; height: 13px;" src="../../../static/community/icon_time_gray.png"/>&nbsp;{{thread.formattedDateTime}}
                    <div class="fr pr15" style="text-align: right;" @click="gotoDetail(thread.threadId)"><img style="width: 13px; height: 13px;" src="../../../static/community/icon_comment_gray.png">&nbsp;{{thread.commentsCount}}</div>
                </div>
		    </div>
		
	    </div>
   </div>
</template>

<script>
let vm;
import { MessageBox } from 'mint-ui';
export default {
   data () {
       return {
           threads:[],
           threads_count:1,
       };
   },
   created() {
       vm=this;
   },
   mounted() {
    //    vm.initSession4Test();
       vm.getThreadsList();

   },

   components: {},

   methods: {
         // 105/747/384
        initSession4Test(){
            let url = '/initSession4Test/105';
                vm.receiveData.getData(vm,url,'Data',function(){
            });
        },
       getThreadsList() {
            vm.receiveData.postData(vm,'thread/getMyPublish',null,'res',function() {
                if(vm.res.success) {
                    vm.threads=vm.res.result;
                    vm.threads_count=vm.res.result.length;  
                }
            })  
       },
       //点击垃圾桶
       deleteThread(id) {
           var ida={
               threadId:id
           };
           MessageBox.confirm('确认删除该条发布内容吗').then(action => {
                   if(action== 'confirm') {
                        vm.receiveData.postData(vm,"/thread/deleteThread/",ida,'res',function(){
                           if(vm.res.success) {
                               alert("删除成功。");
                                location.reload();
                           }else {
                                 alert("删除失败，帖子可能已删除，请重新刷新。");
                           }
                        })
                   }
               }).catch(err => {
                  if(err == 'cancel') {

                  }
              })
       },
       gotoDetail(id) {
        //    "threadDetail.html?threadId="+threadId
        vm.$router.push({path:'/threadDetail',query:{threadId:id}})
       },

       viewSrcImg (threadId, index) {
           vm.refreshImages(threadId, index);
       },
         refreshImages(threadId, index) {
            let url="thread/getImgDetail/"+threadId+"/"+index;
            vm.receiveData.getData(vm,url,'data',function(){
         if(vm.data.success) {    
                var map = vm.data.result;
                var url = map.imgUrl;
                var width = map.width;
                var height = map.height;
                
                var srcWidth = 0;
                var srcHeight = 0;

                if(""!=width&&"undefined"!=width){
				    srcWidth = parseInt(width);
                }else{
                    alert("请检查图片是否上传成功。");
                }
                if(""!=height&&"undefined"!=height){
				    srcHeight = parseInt(height);
                }else{
                    alert("请检查图片是否上传成功。");
                }
                var html = "<div id=\"imgDetail\" style=\"align:center\"><img src=\""+url+"\"/></div>";
                $("#zzmb").show("slow");
                
                $("#divconf").html(html);
                $("#divconf").show("slow");
                
                if($(window).height()>$(document).height()){
        		    $(".zzmb").height($(window).height());
                }else{
                    $(".zzmb").height($(document).height());
                }

                var screenHeight = $(window).height();
                var screenWidth = $(window).width();
                
                var adjHeight = 0;	//缩放调整后图片高度
                var adjWidth = 0;	//缩放调整后图片宽度
                
                var top = 0;
                var hasLeft = false;

                /*
        	 * 图片展示一共三种情况
        	 * 1.横图，即图片宽度>图片高度，则宽度取100%，高度等比缩放
        	 * 2.纵图，即图片宽度<=图片高度，这其中又分2种情况
        	 * 1)图片横向宽度撑满后（即宽取屏幕宽度），高度等比缩放后>屏幕高度的
        	 * 2)图片横向宽度撑满后，高度等比缩放后<=屏幕高度的
        	 */

              //情况1，横图
        	if(srcWidth>srcHeight){
        		if(srcWidth>screenWidth){
        			adjHeight = screenWidth/srcWidth*srcHeight;
        			adjWidth = screenWidth;
        		}else{
        			hasLeft = true;
        			adjHeight = srcHeight;
        			adjWidth = srcWidth;
        		}
        	}else if(srcWidth<=srcHeight){
        		if(srcWidth>screenWidth){
        			adjHeight = screenWidth/srcWidth*srcHeight;
        			if(adjHeight>screenHeight){
        				adjWidth = screenHeight/srcHeight*srcWidth;
        				adjHeight = screenHeight
        			}else{
        				adjWidth = screenWidth;
        			}
        		}else{
        			if(srcHeight>screenHeight){
        				adjWidth = screenHeight/srcHeight*srcWidth;
        				adjHeight = screenHeight
        			}
        		}
            }
            
            var top = screenHeight/2 - adjHeight/2;
        	var left = 0;
        	if(hasLeft){
        		left = screenWidth/2 - adjWidth/2;
        	}

        	$("#divconf").css("top", top);
        	$("#divconf").css("left", left);
        } 
            
			})
        },
       //隐藏图片
       hideImg() {
             $("#zzmb").hide("slow");
        	 $("#divconf").hide("slow");
       },
   },

   computed: {},
}
</script>

<style  scoped>
.lite-divider {
    border-bottom: 1px solid #d4cfc8;
}
.pb15 {
    padding-bottom: 15px;
}
.thread_head {
    height: 44px;
    background-color: #f7f7f1;
    width: 100%;
}
.category_img {
    padding: 7px 0px 10px 4%;
    float: left;
}
.category_img {
    width: 30px;
    height: 30px;
}
.thread_category {
    padding: 12px 0px 10px 3%;
    color: #3b3937;
    font-size: 14px;
    float: left;
}
.img_delete {
    float: right;
    padding-top: 10px;
    margin-right: 6%;
}
.p15 {
    padding: 15px;
    font-size: 13px;
}.fs13 {
    font-size: 13px;
}
.pb15 {
    padding-bottom: 15px;
}
.preview_img_layer {
    float: left;
    width: 100%;
}
.ov {
    overflow: hidden;
    padding: 1px;
}
.unread{
		
		font-weight: bolder;
	}
.zzmb {
    z-index: 100000;
    position: absolute;
    top: 0;
    left: 0;
    -moz-opacity: 0.65;
    opacity: 0.65;
    filter: alpha(opacity=65);
    background: #000;
    width: 100%;
    height: 100%;
    display: block;
}    
</style>
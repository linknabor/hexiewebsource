<template>
    <div class="addt">
        <div v-show="showmain" style=" background: rgba(0,0,0,0.5);width: 100%;height: 100%;position: fixed;z-index: 9999;"></div>
        <div  class="category lite-divider" v-show="category=='2'||category=='3'|| category=='0'||category=='1'">
          <div class="category_main">
              <div  class="category_sub_main fl">
                <router-link :to="{path:'/maintain',query:{n:'2'}}" class="categorya">
                <img class="category_img" src="../../assets/images/butler/img_repair_60x60.png" v-show="category!=2"/>
                <img class="category_img_hide" src="../../assets/images/butler/img_repair_60x60_selected.png" v-show="category==2"/> 
                <div class="category_txt">家庭维修</div>
                </router-link>
              </div>

              <div  class="category_sub_main fl">
                  <router-link :to="{path:'/maintain',query:{n:'3'}}" class="categorya">
                  <img class="category_img" src="../../assets/images/butler/img_education_60x60.png" v-show="category!=3"/>
                  <img class="category_img_hide" src="../../assets/images/butler/img_education_60x60_selected.png" v-show="category==3"/>
                  <div class="category_txt">公共部位维修</div>
                  </router-link>
              </div>
          </div>       
       </div>
        <div>
            <div class="content_main">
                    <div class="inner-input-wrap content_info">
                        <textarea class="inner-input content_input" placeholder="填写发布信息..." v-model="threadContent"></textarea>
                    </div>
                    <div>
                        <div class="content_limmit" >（限200字）</div>
                    </div>    
            </div>

            <div id="pic" class="pic_frame">
                
            </div>
            <div class="pl15 pr15">
                <div id="add" v-on:click="addPic"  class="add-pic-bg fl pl5"></div>
            </div>
            <div class="btn-fabu" v-show="isOriginHei" v-on:click="addThread">
                 <h2>提交</h2>
            </div>  
        </div>
    </div>
</template>

<script>
let vm;
import { MessageBox } from 'mint-ui';
import wx from 'weixin-js-sdk';
export default {
   data () {
       return {
            threadContent:'',
            threadTitle:"",
            uploadPicId:"",
            localIdsid:'',
            category:this.$route.query.n,
            showmain:false,
            isOriginHei: true,//底部按钮顶起问题
            screenHeight: document.documentElement.clientHeight,//当前屏幕高度      
            originHeight: document.documentElement.clientHeight,//当前屏幕高度 
       };
   },
   created() {
       vm=this;

   },
   watch:{
        '$route' () {
         this.category=this.$route.query.n
        },
        screenHeight (val) {//底部按钮顶起问题
            if(this.originHeight > val + 100) {        //加100为了兼容华为的返回键
                this.isOriginHei = false;
            }else{
                this.isOriginHei = true;
            }
        }
   },
   mounted() {
        this.wxdata();
        let self = this;
        window.onresize = function() {//底部按钮顶起问题
            return (function(){
                self.screenHeight = document.documentElement.clientHeight;
            })()
        }
   },

   components: {},

   methods: {
       //微信初始化
       wxdata() {
         let url1 = "getUrlJsSign";
         vm.receiveData.postData(
            vm,
            url1,
            {url:window.location.href.split('#')[0]},
            'heheData',
            function(){
                let wd = vm.heheData.result;
                wx.config({ 
                    debug:false,
                    appId:wd.appId,
                    timestamp:wd.timestamp,
                    nonceStr:wd.nonceStr,
                    signature:wd.signature,
                    jsApiList:['chooseImage','previewImage','uploadImage','downloadImage','getLocalImgData']
                });
            }
        );
       },
        //上传图片
       addPic() {
            wx.chooseImage({
                count: 6, // 默认9
                sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
                sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                success: function (res) {
                    var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                     vm.localIdsid=res.localIds;
                    // console.log(localIds);
                    alert('已选择'+localIds.length+'张图片');
                   var html = "";
                   var pic_length = $("[name='pics']").length;
                   if(pic_length+localIds.length>6){
                       alert("所选图片超过6张。")
                       return false;
                   }
                      var i=0;
                    if(window.__wxjs_is_wkwebview) {//ios 环境
                         function addimage(i) {
                            //  setTimeout(function(){
                                wx.getLocalImgData({
                                    localId: localIds[i],
                                    success: function (res) {                                          
                                        var localData = res.localData;
                                        // var addds=res.localData;
                                        localData = localData.replace('jgp', 'jpeg');
                                            html = "<div name='pics' class=\"fl\" style=\"margin-right:5px;\"><img src=\""+localData+"\" id=\""+vm.localIdsid[i]+"\"  style=\"height:100px;width:90px;\"/></div>"
                                            $("#pic").append(html);
                                        i++;  
                                        if(i<localIds.length) {
                                            // alert(i)
                                            addimage(i)
                                        }   
                                    },
                                    fail:function(res){
                                        alert(res);
                                    }
                                }) 
                            //  },100)  
                         }  
                         addimage(i); 
                           
                        }else {   
                                for(var i=0;i<localIds.length;i++){
                                    html = "<div name='pics' class=\"fl\" style=\"margin-right:5px;\"><img src=\""+localIds[i]+"\"  id=\""+localIds[i]+"\"  style=\"height:100px;width:90px;\"/></div>"
                                    $("#pic").append(html);
                                }
                        }
                    if(pic_length+localIds.length >= 6){
                        $("#add").hide();
                    }
                },
                fail:function(err){
                    alert(err)
                }
            }); 
       },
       //上传图片到微信
       uploadToWechat (){
            var i = 0;
            var pics = $("[name='pics']");
            function upload(){
                var img = pics.eq(i).find("img");
                var id = img.attr("id");
                setTimeout(function(){
                    wx.uploadImage({
                        localId:id, // 需要上传的图片的本地ID，由chooseImage接口获得
                        isShowProgressTips: 1, // 默认为1，显示进度提示
                        success: function (res) {
                            var serverId = res.serverId; // 返回图片的服务器端ID
                            vm.uploadPicId+=serverId+",";
                            i++;
                            if(i<pics.length){
                                upload();
                            }else if(i==pics.length){
                                vm.saveThread();
                            }
                            
                        }
                    })
                    
                },50);
            }
            upload();
        },
        saveThread:function(){
                 let text;
                 if(vm.category==12) {
                     text="确定要提交吗？"
                 }else {
                     text="您的意见将会被提交到所在物业，确定要提交吗？";
                 }
                  MessageBox.confirm(text).then(action => {
                  if(action == 'confirm') {
                      let url2;
                      if(vm.category=='12'){
                          url2 = "/health/serviceResv";
                      }else {
                          url2 = "thread/addThread";
                      }
                      vm.showmain=true;
                        vm.receiveData.postData(
                            vm,
                            url2,
                            {
                                threadCategory:vm.category,    
                                threadTitle:vm.threadTitle,
                                threadContent:vm.threadContent,
                                uploadPicId:vm.uploadPicId
                            },
                            'postData',
                            function(){
                                if(vm.postData.success) {
                                    if(vm.category=='12'){
                                         alert("预约成功");
                                         vm.$router.push({path:'/mysteward',query:{n:12}});
                                    }else {
                                        alert("发布成功");
                                        vm.$router.push({path:'/mysteward',query:{n:vm.category}});
                                    }
                                    
                                }else {
                                    alert(vm.postData.message);
                                }
                            }
                        )
                  }
              }).catch(err => {
                  if(err == 'cancel') {
                  }
              })
        },
         //提交
       addThread() {
           if(vm.threadContent==""){
                alert("请填写内容！");
                return false;
            }
             if(vm.threadContent.length>200){
                alert("发布字数不能超过200字节!");
                return false;
            }
            var pic_length = $("[name='pics']").length;
            if(pic_length>0){
                vm.uploadToWechat();
            }else{
                vm.saveThread();
            }
       }

   },

   computed: {},
}
</script>

<style  scoped>
.addt {
    background-color: #fffff8;
    height:100%;
    width: 100%;
    position: absolute;
}
.category{
	 		background-color: #f7f7f1;
	 		height: 90px;
	 		overflow-x: hidden;
 		}
.lite-divider {
    border-bottom: 1px solid #d4cfc8;
}
.category_main{
	     	width: 92%;
	     	margin: 0px 0% 0px 4%;
	     	overflow-x: hidden;
    	}
       
.category_sub_main{
	    	margin: 15px 0% 15px 15%;
	    	text-align: center;
	    	width: 25%
   	 	}
.category_img{
	     	width: 50%;
	     	height: 30px;
    	}
.category_img_hide{
	     	width: 50%;
	     	height: 30px;
    	}
.category_txt{
			padding: 7px 0px 0px 0px;
			font-size: 12px;
			color: #999;
		}
.content_main{
			width: 94%;
			margin: 5% 0% 5% 6%;
		}

.content_info {
    width: 98%;
    margin: 30px 0% 0px 0%;
}

.inner-input-wrap {
    padding: 6px 0;
}

.inner-input {
    display: block;
    height: 120px;
    width: 90%;
    outline: none;
    border: 1px solid #d4cfc8;
    border-radius: 4px;
    padding: 0 10px;
    vertical-align: middle;
    font-size: 15px;
    padding-top: 10px;
}
.content_limmit{
			width: 89%;
			margin: 0px 0% 0px 5%;
			text-align: right;
			color: gray;
		}
.pic_frame {
    width: 94%;
    margin: 0px 0% 0px 6%;
}
.pl15 {padding-left: 15px;}
.pr15 {padding-right: 15px;}
.add-pic-bg {
    background-image: url('../../assets/images/suggest/bg.png');
    height: 100px;
    width: 95px;
}
.btn-fabu{
    position: absolute;
    width: 90%;
    height: 50px;
    bottom: 0;
    left: 5%;
    right: 5%;
    background-color:#ff8a00;
    line-height: 50px; color: white;}
    h2{text-align: center;letter-spacing: 0.05rem;font-size: 15px;}

.categorya {
     text-decoration: none;
    color: #333;
    font-size: 14px;
    display: inline-block
} 
</style>1
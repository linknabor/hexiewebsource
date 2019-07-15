<style scoped>
.suggest{font-family: PingFangSC-Regular;width: 100%;height: 600px;
      background-color:#fffff8;font-size: 14px;text-align: center;}
.icon {background-size: 13px;width: 13px;height: 13px;
       margin-right: 5px;vertical-align: bottom;}
.input-btn-wrap {position: fixed;left: 0;right: 0;bottom: 0;}
.inner-input-wrap { position: relative;width: 100%;
    padding: 6px 0;}
.inner-input {display: block;height: 35px;width: 94%;
    outline: none;border: 1px solid #d4cfc8;border-radius: 4px;
    padding: 5px 10px;vertical-align: middle;font-size: 15px;}
.btn-fixed {color: #fff;left: 3%;right: 3%;bottom: 10px;}
.submit-btn {height: 44px;line-height: 44px;
            background: #ff8a00;text-align: center;}
.content_main{width: 94%;margin: 5% 3% 5% 3%;}
.content_title{width: 98%;margin: 0px 0% 0px 0%;}
.content_info{width: 98%;margin: 30px 1% 0px 1%;}
.content_input{height: 120px;}
.content_limmit{width: 89%;margin: 5px 0% 0px 5%;
            text-align: right;color: gray;}
.fl{float: left;}
.pic_frame {width: 94%;margin: 0px 0% 0px 6%;}
.zzmb{z-index:100000; position: absolute; top:0; left:0; -moz-opacity:0.65; opacity:0.65; filter: alpha(opacity=65); background:#000; width:100%; height:100%;}
.pl15 {padding-left: 15px;}
.pr15 {padding-right: 15px;}
.add-pic-bg {background-image: url('../../assets/images/suggest/bg.png');height: 100px;width: 95px;}
.btn-fabu{position: fixed;width: 90%;height: 50px;bottom: 0;left: 5%;right: 5%;background-color:#ff8a00;line-height: 50px; color: white;}
h2{text-align: center;letter-spacing: 0.05rem;font-size: 15px;}
</style>
<template>
    <div class="suggest">
        
        
        <div class="content_main">        
            <div id="zzmb" class="zzmb" style="position:fixed;" v-show="ok"></div>
            <div class="inner-input-wrap content_info">
                <textarea v-model="textarea" id="textarea" class="inner-input content_input" placeholder="填写发布信息..." >    
                </textarea>
            </div>
            <div>
                <div class="content_limmit" >（限200字）</div>
            </div>
        </div>
        <div>
            <div id="pic" class="pic_frame">
                
            </div>
            <div class="pl15 pr15">
                <div id="add" v-on:click="addPic"  class="add-pic-bg fl pl5"></div>
            </div>
        </div>
        <div class="btn-fabu" v-on:click="addThread">
            <h2>发布</h2>
        </div>
        
    </div>
</template>

<script>
let vm
import wx from 'weixin-js-sdk';
export default {
    created(){
        vm = this;
        // 请求接口获取 后台返回的 微信配置项
        let url = location.href.split('#')[0];
        vm.receiveData.wxconfig(vm,wx,['chooseImage'],url);
    },  
    data () { 
        return {
            ok:false,
            routeParams:{
                category : this.$route.query.category,
            },
            threadCategory:"",
            threadTitle:"",
            threadContent:"",
            uploadPicId:"",
            textarea:"",
        };
    },

    components: {},

    computed: {},

    mounted(){
        
        // this.common.checkRegisterStatus();
        
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
        // this.upload();

    },

    methods: {
        addThread:function(){
            // var area = document.getElementById("textarea");
            // console.log(area);

            if(textarea.value==""){
                alert("请填写内容！");
                return false;
            }
            if(textarea.value.length>200){
                alert("发布字数不能超过200字节!");
                return false;
            }
            var pic_length = $("[name='pics']").length;
            $("#zzmb").show();
            if($(window).height()>$(document).height()){
                $(".zzmb").height($(window).height());
            }else{
                $(".zzmb").height($(document).height());
            }
            if(pic_length>0){
                this.uploadToWechat();
            }else{
                this.saveThread();
            }
        },


        //点击发布
        addPic:function(){
            wx.chooseImage({
                count: 6, // 默认9
                sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
                sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                success: function (res) {
                    var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                    console.log(localIds);
                    alert('已选择'+localIds.length+'张图片');
                   var html = "";
                   var pic_length = $("[name='pics']").length;
                   if(pic_length+localIds.length>6){
                       alert("所选图片超过6张。")
                       return false;
                   }
                    for(var i=0;i<localIds.length;i++){
                        html = "<div name='pics' class=\"fl\" style=\"margin-right:5px;\"><img src=\""+localIds[i]+"\" style=\"height:100px;width:90px;\"/></div>"
                        $("#pic").append(html);
                    }
                    if(pic_length+localIds.length >= 6){
                        $("#add").hide();
                    }
                },
                error:function(err){
                    console.log(err)
                }
            });            
        },
        //上传图片到微信
        uploadToWechat:function(){
            var i = 0;
            var pics = $("[name='pics']");
            function upload(){
                var img = pics.eq(i).find("img");
                var id = img.attr("src");
                setTimeout(function(){
                    wx.uploadImage({
                        localId: id, // 需要上传的图片的本地ID，由chooseImage接口获得
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
            let url2 = "thread/addThread";
            vm.receiveData.postData(
                vm,
                url2,
                {
                    threadCategory:vm.routeParams.category,
                    threadTitle:this.threadTitle,
                    threadContent:textarea.value,
                    uploadPicId:vm.uploadPicId
                },
                'postData',
                function(res){
                    console.log("success:"+JSON.stringify(res));
                    alert("发布成功");
                    window.location.href = vm.basePageUrl+"wuye/index.html?v=20162299";
                }
            )
        }
    }
}

</script>
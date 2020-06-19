<template>
   <div>
            <div class="title_area">
                <div class="brand-tip-1">支付成功</div>
                <div class="brand-tip-2">对本次服务进行评价</div>
            </div>

            <div style="line-height: 35px;">
                    <span class="grade fs15">服务质量：</span>
                    <span style="float: right; margin-right: 10px;">
                        <div  v-for="(itemClass,index) in itemClasses" :key="index" :class="itemClass" class="star" @click="serverClick(index)"></div>
                    </span>
	        </div>

            <div style="line-height: 35px;">
                    <span class="grade fs15">服务态度：</span>
                    <span style="float: right; margin-right: 10px;">
                        <div  v-for="(itemClass,index) in itemClasses1" :key="index" :class="itemClass" class="star" @click="serverClick1(index)"></div>
                    </span>
	        </div>

            <div style="line-height: 35px;">
                    <span class="grade fs15">服务效率：</span>
                    <span style="float: right; margin-right: 10px;">
                        <div  v-for="(itemClass,index) in itemClasses2" :key="index" :class="itemClass" class="star" @click="serverClick2(index)"></div>
                    </span>
	        </div>

            <div contenteditable class="content p15 fs15" style="line-height: 20px;" :class="{hasvalue:comment}" @click="focus" @blur="storeComment"></div>

            <div class="photo_area">
                        <div style="margin-top:15px;width:100%;height:35px">
                            <div style="float: left;padding-left: 5px;">上传照片</div>
                            <div style="float: right;padding-right: 15px;color: #999">{{photos.length}}/6</div>
                        </div>

                        <div v-for="(item,index) in photos" class="photo_wrap a_third_m20_height"  :key="index">
                            <img :src="item.imgUrl" class="photo a_third_m22_height"/>
                            <!-- <img class="photo a_third_m22_height" src="../../assets/images/7f1b3b58-c5b6-4022-b1ed-dc4188c43a3a.gif" alt=""> -->
                        </div>
                        
                        <div class="photo_wrap a_third_m20_height"  @click="addPic" v-show="photos.length<6">
                            <div class="photo addicon a_third_m22_height" style="margin-left:4px;margin-right:2px;outline: #e5e2dd solid 1px;"></div>
                        </div>
  	        </div>
            <div style="clear:both;"></div>
            <div style="width: 100%;height: 60px;">&nbsp;</div>
            <div class="btn-fixed">
                <div class="btn" @click="submit">发表评论</div>
            </div>

   </div>
</template>

<script>
let vm;
import wx from 'weixin-js-sdk';
export default {
   data () {
       return {
            commentQuality:5,
		    commentAttitude:5,
            commentService:5,
            comment:'',
            photos:[],
            uploadImgMap:{},
       };
   },
   created() {
        vm=this;
        let url = location.href.split('#')[0];
        vm.receiveData.wxconfig(vm,wx,['chooseImage','previewImage','uploadImage','downloadImage'],url);
   },
   mounted() {

   },

   computed: {
            itemClasses() {
                    let result = []; // 返回的是一个数组,用来遍历输出星星
                    let commentQuality = Math.floor(this.commentQuality * 2 ) / 2; // 计算所有星星的数量
                    let integer = Math.floor(commentQuality); // 整数星星判断
                    for(let i=0;i<integer;i++){ // 整数星星使用on
                        result.push("on"); // 一个整数星星就push一个CLS_ON到数组
                    }
                    while(result.length < 5){// 余下的用无星星补全,使用off
                        result.push("off");
                    }
                    return result;
            },
             itemClasses1() {
                    let result = []; // 返回的是一个数组,用来遍历输出星星
                    let commentAttitude = Math.floor(this.commentAttitude * 2 ) / 2; // 计算所有星星的数量
                    let integer = Math.floor(commentAttitude); // 整数星星判断
                    for(let i=0;i<integer;i++){ // 整数星星使用on
                        result.push("on"); // 一个整数星星就push一个CLS_ON到数组
                    }
                    while(result.length < 5){// 余下的用无星星补全,使用off
                        result.push("off");
                    }
                    return result;
            },
             itemClasses2() {
                    let result = []; // 返回的是一个数组,用来遍历输出星星
                    let commentService = Math.floor(this.commentService * 2 ) / 2; // 计算所有星星的数量
                    let integer = Math.floor(commentService); // 整数星星判断
                    for(let i=0;i<integer;i++){ // 整数星星使用on
                        result.push("on"); // 一个整数星星就push一个CLS_ON到数组
                    }
                    while(result.length < 5){// 余下的用无星星补全,使用off
                        result.push("off");
                    }
                    return result;
            },
   },

   methods: {
       getUrlParam(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
            var r = window.location.search.substr(1).match(reg);  //匹配目标参数
            if (r != null) return unescape(r[2]); return null; //返回参数值
        },
       serverClick(index) {
           vm.commentQuality=index+1;
       },
        serverClick1(index) {
           vm.commentAttitude=index+1;
       },
        serverClick2(index) {
           vm.commentService=index+1;
       },
        focus() {
            
	    },
        storeComment(e) {
           vm.comment=e.srcElement.innerText
            let u = navigator.userAgent;
            let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
            if (isiOS) {
                window.scrollTo(0, 0);
            }
        },
        //点击添加图片
        addPic() {
                wx.chooseImage({
			    count: 6, // 默认9
			    // sizeType: ['original', 'compressed']
			    sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有 original, compressed
			    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
			    success: function (res) {
                    var localIds=res.localIds;
                    if(localIds.length==0) {
                        alert("未获取图片，请刷新后重新选择图片。");
                        return false;
                    }
                    for(var i=0;i<localIds.length;i++) {
                        if(vm.photos.length==6) {
                            alert("最多只能上传6张图片");
                            break;
                            }
                        var ig={imgUrl:localIds[i]}
                            vm.photos.push(ig);
                            vm.uploadImg(localIds[i]);
                        }
                     }
                })
        },
        uploadImg(localId) {
            wx.uploadImage({
			    localId: localId, // 需要上传的图片的本地ID，由chooseImage接口获得
			    isShowProgressTips: 1, // 默认为1，显示进度提示
			    success: function (res) {
			        vm.uploadImgMap[localId] = res.serverId; // 返回图片的服务器端ID
			    }
         })
        },
        // 发表
        submit() {
            if(vm.comment=='' || vm.comment.length<5) {
                alert("评论字数不能小于5个！");
                return;
            }
            if(vm.comment.length>400) {
                alert("评论字数不能大于400！");
                return
            }
            vm.sendComment();
        },
        sendComment() {
            var imgurl="";
            for(var k in vm.uploadImgMap) {
                imgurl+=vm.uploadImgMap[k]+",";
            }

            var add={
                orderId:vm.$route.query.ordersID,
                commentQuality:vm.commentQuality,
                commentAttitude:vm.commentAttitude,
                commentService:vm.commentService,
                comment:vm.comment,
                commentImgUrls:imgurl
            }
            vm.receiveData.postData(vm,'/customService/order/comment',add,'res',function(){
                if(vm.res.success) {
                    window.location.href=vm.basePageUrl+"person/index.html?"+vm.common.getoriApp()+"#/myserviceDetail?orderId="+vm.$route.query.ordersID; 
                }else {
                    alert(vm.res.message == null ?"评论失败，请稍后重试":vm.res.message);
                }
                  
            });
        }

 
    }
}
</script>

<style  scoped>

.title_area {
    padding: 45px 0;
    background: #f7f7f1;
}
.brand-tip-1 {
    text-align: center;
    font-size: 30px;
    background: url(../../assets/images/icon_successful.png) no-repeat #f7f7f1;
    background-position: 25% bottom;
    background-size: 28px;
    color: #FF8A00;
}
.brand-tip-2 {
    text-align: center;
    background: #f7f7f1;
    margin-top: 25px;
    font-size: 20px;
    color: #FF8A00;
}
/* 评论 */
.grade {
    padding-left: 15px;
    padding-right: 15px;
}
.fs15 {
    font-size: 15px;
}
.star {
    width: 20px;
    height: 20px;
    float: left;
    margin: 6px 6px 2px 6px;
    background-size: 100%;
    background-repeat: no-repeat;    
}
.star.on{
    background-image: url(../../assets/images/icon_xingxing_xuanzhong_03.png) ;
}
.star.off {
    background-image: url(../../assets/images/icon_xingxing_weixuanzhong_03.png);
}

.p15 {
    padding: 15px;
}
.content {
    position: relative;
    height: 100px;
    margin: 0 15px;
    background-color: #fffff8;
    border: 1px solid #d4cfc8;
    outline: none;
}
.content:before {
    content: "分享您对本次服务的具体评价";
    position: absolute;
    top: 50%;
    margin-top: -10px;
    left: 50%;
    margin-left: -80px;
}
.content:before {
    font-size: 13px;
    color: #bfbfbf;
}
.content:focus:before, 
.content.hasvalue:before {
	display: none;
}

/* 上传图片 */
.photo_area {
    font-size: 15px;
    color: #7e6b5a;
    padding-left: 10px;
}
.photo_wrap {
    width: 33%;
    text-align: center;
    display: inline-block;
    height: 100px;
    float:left;
}
.addicon {
    background: url('../../assets/images/add_photo.png') no-repeat;
    background-size: 40px;
    background-position: 50%;
}
.photo {
    margin: 3px;
    width: 93%;
    height: 96px;
    /* outline: #e5e2dd solid 1px; */
}

.btn-fixed {
    position: fixed;
    bottom: -15px;
    left: -15px;
    right: -15px;
}
.btn {
    display: block;
    margin: 0.2rem;
    height: 0.8rem;
    line-height: 0.8rem;
    color: #fff!important;
    font-size: 0.35rem;
    text-align: center;
    background-color: #ff8a00;
    border-radius: 3px;
    outline: none;
    border: none;
    text-decoration: none;
}
</style>
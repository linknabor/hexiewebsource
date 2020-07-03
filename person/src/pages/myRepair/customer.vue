<template>
   <div class="operorder">
    <div class="opers">
            <div class="ov top-title pr15" style=" padding-left:15px;">
                <div class="ov ptb15" >
                    <span class="fl fs15" style="color:  #FF8A00;">快递详情</span>
                    <!-- <span class="fr fs12 status-font">{{item.statusStr}}</span>    -->
                </div>
            </div>

             <div style="background: white;">
                  <!-- 如果用户上传了维修图片   -->
                <!-- <div class="photo_area" v-show="imgUrlList.length>0">
                    <div v-for="(photo,i) in imgUrlList" class="photo_wrap a_third_m20_height" @click="showPhoto(i)">
                        <img :src="photo" class="photo a_third_m22_height"/>
                    </div>
                </div>
                
                <div class="top-info" v-show="item.memo!=''">
                    <div class="item" style="padding-left: 15px;">
                        <span class="value" v-html="item.memo"></span>
                    </div>
	            </div> -->
                <div class="top-info" >
                    <div class="item" style="padding-left: 15px;">
                        <span class="value" >的萨芬撒大打算</span>
                    </div>
	            </div>
            </div>

            <div style="background: white;padding: 0 15px;margin:15px 0">
                    <div class="lite-divider detail-title fs14">
                        客户信息
                    </div>
                     <div class="bottomLine" style="color:#3b3937">
                            <span class="custom-menu-link lite-dividers">
                                <p class="value2">朱彬
                                    <a style="float: right;padding-right: 10px;color:#3b3937;" :href="'tel:'+item.tel">{{150722287666}}</a>
                                </p>
                            </span>
                     </div>
                    <div class="bottomLine" style="color:#3b3937">
                            <span class="custom-menu-link lite-dividers">
                                <p class="value2">所在小区<span style="float: right;padding-right: 10px;">森兰明轩（演示）</span></p>
                            </span>
                     </div>

                    <div class="top-info">
                        <div class="item lite-divider pl0" style="padding-bottom: 15px;">
                            <p class="value" style="padding-top: 5px;">上海市浦东新区森兰名轩（演示）浦东新区三林路800号2号601室</p>
                        </div>
                    </div>
            </div>

            <div style="width: 100%;height: 15px;"></div>
        </div>    
   </div>
</template>

<script>
let vm;
import wx from 'weixin-js-sdk';
import { MessageBox } from 'mint-ui';
export default {
   data () {
       return {
           item:{},
           imgUrlList:[],
           commentImgUrlList:[],
       };
   },
   created() {
       vm=this;
   },
   mounted() {
    //    let url = location.href.split('#')[0];
    //    vm.receiveData.wxconfig(vm,wx,['previewImage'],url);
    //    vm.queryOrder(); 
   },

   methods: {
       queryOrder() {
           vm.receiveData.getData(vm,'operator/repair/query/repairId/'+vm.$route.query.ordersID,'res',function(){
             if(vm.res.success) {  
                var order=vm.res.result
                vm.imgUrlList = order.imgUrlList;
                vm.commentImgUrlList = order.commentImgUrlList;
                vm.item=order;
             }else {

             }   
            })
       },
       //预览图片
       showPhoto(idx) {
           wx.previewImage({
        	    current: vm.imgUrlList[idx], // 当前显示图片的http链接
        	    urls: vm.imgUrlList // 需要预览的图片http链接列表
        	});
       },
   },

}
</script>

<style  scoped>
.operorder {
    margin: 0;
    height: 100%;
    width:100%;
    position:absolute;
    background: #F9F9E9;
    padding-bottom: 50px;
}

.ov {
    overflow: hidden;
    padding: 1px;
}
.top-title {
    color: #3b3937;
    background: #F7F7F1;
    margin: 15px auto;
    border-top: 1px solid #d4cfc8;
    border-bottom: 1px solid #d4cfc8;
}
 .pr15 {
    padding-right: 15px;
}
.icon-repair {
    height: 60px;
    width: 60px;
    margin: 15px 15px;
    padding: 3%;
    border: 1px solid #31a8e6;
    border-radius: 3px;
    background: #fff;
}
.ptb15 {
    padding: 15px 0;
}
.fs15 {
    font-size: 15px;
}
.fs12 {
    font-size: 12px;
}
.icon {
    background-size: 13px;
    width: 13px;
    height: 13px;
    margin-right: 5px;
    vertical-align: bottom;
}
.time-icon {
    background-image: url(../../assets/images/img/icon_time_gray.png);
}
.icon {
    display: inline-block;
    /* width: 25px;
    height: 25px; */
    background-repeat: no-repeat;
}
.comment {
    margin-top: 5%;
    line-height: 20px;
}
.pb15 {
    padding-bottom: 15px;
}
.status-font {
    color: #FF8A00;
    background: #eee;
    padding: 5px 10px;
    border-radius: 3px;
}
/* 预览图片评论 */
.photo_area {
    font-size: 15px;
    color: #7e6b5a;
    padding-left: 10px;
    overflow: hidden;
}
.photo_wrap{
		    width: 33%;
		    text-align: center;
    		display: inline-block;
             height: 100px;
            float: left;
 }
.photo{
        margin: 3px;
        width: 90%;
        outline: #F7F7F1 solid 1px;
        height: 96px;
}
.top-info {
    padding: 10px 0px;
}
.item {
    overflow: hidden;
    font-size: 12px;
    color: #666;
}
.value {
    display: block;
    color: #666;
    width: 100%;
    line-height: 25px;
    font-size: 15px;
    word-wrap: break-word;
}
/* 报修人信息 */
.detail-title {
    padding: 15px 10px 10px 0px;
    font-size: 15px;
    color: #7e6b5a;
     border-bottom: 1px solid #d4cfc8;
}
.fs14 {
    font-size: 14px;
}
.custom-menu-link {
    display: block;
    color: #3b3937;
    line-height: 30px;
    padding: 15px 0px;
    overflow: hidden;
}
 .lite-dividers {
    border-bottom: 1px solid #d4cfc8;
}
.value2 {
    display: block;
    color: #3b3937;
    width: 100%;
    line-height: 25px;
    font-size: 15px;
}
</style>
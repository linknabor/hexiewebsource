<template>
<div class="whd">
   <div class="myrepair" >
            <div class="ov top-title pr15" style=" padding-left:15px;">
                <div class="ov ptb15">
                    <span class="fl fs15" style="color: #FF8A00;">{{item.productName}}</span>
                    <span class="fr fs12 status-font">{{item.statusStr}}</span>
                </div>
            </div>

            <div class="lite-divider fs14" v-show="item.operatorUserId&&item.operatorUserId>0">
                    <div class="lite-divider detail-title ">
                        服务人员信息
                    </div>
                    <div class="lite-divider top-info " style="min-height: 60px;width: 100%">
                        <div class="item fl" style="padding-bottom: 15px;">
                            <p class="value2" style="font-size: 16px;">{{item.operatorCompanyName}}</p>
                            <p class="value2" style="font-size: 16px;padding-top: 5px;">{{item.operatorName}}<span style="padding-left: 20px;">{{item.operatorTel}}</span></p>
                        </div>
                        <div class="fr">
                            <a :href="oTel" class="weia">
                                <img src="../../assets/images/img/btn_phone_03.png" class="phone_icon">
                            </a>
                        </div>
                    </div>
                    <div class="detail-title" style="height:20px" v-show="item.payDate != null">
                        <div class="fl">服务费用</div>
                        <div class="fr highlight">￥{{item.price}}</div>
                        <div class="fr highlight mr10">{{payTypeName}}&nbsp;●&nbsp;</div>
                    </div>
            </div>
          
            <div style="background: white;">
                  <!-- 如果用户上传了维修图片  -->
                <div class="photo_area"  v-show="imgUrlList.length>0">
                    <div v-for="(photo,i) in imgUrlList" class="photo_wrap a_third_m20_height" @click="showPhoto(i)" :key="i">
                        <img :src="photo" class="photo a_third_m22_height"/>
                    </div>
                </div>
                <div class="top-info" v-show="item.memo!=''">
                    <div class="item" style="padding-left: 15px;">
                        <span class="value" v-html="item.memo"></span>
                    </div>
	            </div>
            </div>

            <div style="background: white;padding: 0 15px;margin:15px 0">
                <div class="lite-divider detail-title fs14">
                    客户信息
                </div>
                <div class="top-info">
                    <div class="item lite-divider pl0" style="padding-bottom: 15px;">
                        <p class="value2" style="font-size: 16px;">{{item.receiverName}}<span style="padding-left: 20px;">{{item.tel}}</span></p>
                        <p class="value" style="padding-top: 5px;">{{item.address}}</p>
                    </div>
                    <div class="bottomLine" style="color:#3b3937">
                        <div class="menu-link lite-divider">
                            <p class="value2">所在小区<span style="float: right;padding-right: 10px;">{{item.xiaoquName}}</span></p>
                        </div>
                    </div>
                </div>
            </div>
            <!-- <div style="background: white;padding: 0 15px ;margin:15px 0" v-show="item.pingjiaStatus == 1">
                <div class="lite-divider detail-title fs14">
                    服务费用
                </div>
                <div class="top-info">
                    <div class="bottomLine" style="color:#3b3937">
                        <p class="value2">费用<span style="float: right;padding-right: 10px;">{{payTypeName}}</span></p>
                    </div>
                </div>
            </div> -->
            <div style="background: white;padding: 0 15px ;margin-top:15px" v-show="1 == item.pingjiaStatus">
                    <div class="lite-divider detail-title fs14">
                        我的评价
                    </div>
                    <div style="line-height: 35px;">
                        <span class="grade fs15">服务质量：</span>
                        <span style="float: right; margin-right: 10px;" class="margint">
                            <div class="star" :class="{checked:item.commentQuality>0}"></div>
                            <div class="star" :class="{checked:item.commentQuality>1}"></div>
                            <div class="star" :class="{checked:item.commentQuality>2}"></div>
                            <div class="star" :class="{checked:item.commentQuality>3}"></div>
                            <div class="star" :class="{checked:item.commentQuality>4}"></div>
                        </span>
                    </div>
                    <div style="line-height: 35px;">
                        <span class="grade fs15">服务态度：</span>
                        <span style="float: right; margin-right: 10px;" class="margint">
                            <div class="star" :class="{checked:item.commentAttitude>0}"></div>
                            <div class="star" :class="{checked:item.commentAttitude>1}"></div>
                            <div class="star" :class="{checked:item.commentAttitude>2}"></div>
                            <div class="star" :class="{checked:item.commentAttitude>3}"></div>
                            <div class="star" :class="{checked:item.commentAttitude>4}"></div>
                        </span>
                    </div>
                    <div style="line-height: 35px;">
                        <span class="grade fs15">服务效率：</span>
                        <span style="float: right; margin-right: 10px;" class="margint">
                            <div class="star" :class="{checked:item.commentService>0}"></div>
                            <div class="star" :class="{checked:item.commentService>1}"></div>
                            <div class="star" :class="{checked:item.commentService>2}"></div>
                            <div class="star" :class="{checked:item.commentService>3}"></div>
                            <div class="star" :class="{checked:item.commentService>4}"></div>
                        </span>
                    </div>
                    <div class="top-info" v-show="item.comment!=''">
                        <div class="item">
                            <span class="value" v-html="item.comment"></span>
                        </div>
                    </div>
                    <div class="photo_area" v-show="commentImgUrlList.length>0">
                        <div v-for="(photo,i) in commentImgUrlList" class="photo_wrap a_third_m20_height" @click="showCommentPhoto(i)" :key="i">
                            <img :src="photo" class="photo a_third_m22_height"/>
                        </div>
                    </div>
            </div>
            <div style="width: 100%;height: 15px;"></div>
            <div class="cbtn-fixed">
                <div class="cbtn" @click="cancel" v-show="item.showStatus==1">取消订单</div>
                <div class="tow_btn"  v-show="item.showStatus == 2 && item.payDate == null">
                    <span  class="fl tow_btn_l" @click="cancel">
                        取消
                    </span>
                    <span  class="fl tow_btn_r"  @click="finish">
                        完成并支付
                    </span>
                </div>
                <div class="cbtn" @click="finish"  v-show="item.showStatus == 2 && item.payDate != null">完成</div>
                <div class="cbtn" @click="finish" v-show="item.showStatus == 3 ">完成并支付</div>
                <div class="cbtn" @click="comment" v-show="item.showStatus == 4">去评价</div>

                <!-- <div class="cbtn" @click="deleteOrder" v-show="item.showStatus==4">删除</div> -->
                <!-- <div class="cbtn" @click="back" v-show="item.showStatus==6">返回</div> -->
            </div>

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
           payTypeName:"微信支付",
           oTel:'#',
       };
   },
   created() {
       vm=this;
   },
   mounted() {
       let url = location.href.split('#')[0];
        vm.receiveData.wxconfig(vm,wx,['previewImage'],url);

       vm.querys();
   },
   methods: {
       querys() {
            vm.receiveData.getData(vm,'customService/order?orderId='+vm.$route.query.orderId,'res',function(){
            if(vm.res.success) {
                var order=vm.res.result
                if(order.imgUrls){
                    vm.imgUrlList = order.imgUrls.split(',');
                }
                if(order.commentImgUrls) {
                    vm.commentImgUrlList = order.commentImgUrls.split(',');
                }
                if(order.operatorTel!=null&&order.operatorTel!=""){
	    		    vm.oTel="tel:"+order.operatorTel;
	        	}
                vm.item=order;
            }else {
                alert(vm.res.message == null ? "获取服务信息失败，请去服务记录中查看！" : vm.res.message);
            }
            })
       },
       //预览图片
       showPhoto(i){
           wx.previewImage({
        	    current: vm.imgUrlList[i], // 当前显示图片的http链接
        	    urls: vm.imgUrlList // 需要预览的图片http链接列表
        	});
       },
        //预览图片
       showCommentPhoto(i) {
           wx.previewImage({
        		current: vm.commentImgUrlList[i], // 当前显示图片的http链接
        		urls: vm.commentImgUrlList // 需要预览的图片http链接列表
        	});
       },
        //    取消维修 跳转页面
        cancel() {
            vm.$router.push({path:'/cancelservice',query:{orderId:vm.$route.query.orderId}})
        },
        // 完成并支付
        finish() {
            if(vm.item.payDate == null){ //没支付以被接单
               MessageBox.confirm('确认完工后，进入付费操作').then(action => {
                if(action== 'confirm') {
                    window.location.href=vm.basePageUrlpay+'orderpay.html?'+vm.common.getoriApp()+'#/payment?orderId='+vm.item.id+'&status='+vm.item.status
                }
                }).catch(err => {
                    if(err == 'cancel') {

                    }
                })
            }else {//已经支付
                if(vm.item.status == 15){
                    vm.receiveData.postData(vm,"customService/order/confirm?orderId="+vm.item.id,null,'res',function(){
                        if(vm.res.success) { 
                            window.location.href=vm.basePageUrlpay+"orderpay.html?"+vm.common.getoriApp()+"#/appraise?ordersID="+vm.item.id
                        }else {
                            alert(vm.res.message==null?"系统异常，请稍后重试！":vm.res.message);
                        }
                     })
                }else {
                    window.location.href=vm.basePageUrlpay+"orderpay.html?"+vm.common.getoriApp()+"#/appraise?ordersID="+vm.item.id
                }
                
            }
        },
        // //删除
            // deleteOrder() {
            //      MessageBox.confirm('确认删除该订单？').then(action => {
            //            if(action== 'confirm') {
            //                 vm.receiveData.getData(vm,"repair/delete/"+vm.item.id,'res',function(){
            //                     if(vm.res.success) {
            //                     //确定跳转myservice
            //                     vm.$router.push({path:'/myservice'})
            //                     }else {
            //                          alert("系统异常，请稍后重试！");
            //                     } 
            //                 })
            //            }
            //        }).catch(err => {
            //           if(err == 'cancel') {

            //           }
            //       })
        // },
        //评价
        comment() {
            window.location.href=vm.basePageUrlpay+"orderpay.html?"+vm.common.getoriApp()+"#/appraise?ordersID="+vm.item.id
        },
        //返回
        back() {
             vm.$router.push({path:'/myservice'})
        }

   },

}
</script>

<style  scoped>
.whd {
    background: #F9F9E9;
    margin: 0;
    position:absolute;
    width:100%;
    height: 100%;
}
.myrepair {
    padding-bottom: 50px;
  
}
.weia {
    display:inline-block;
}
.ov {
    overflow: hidden;
    padding: 1px;
}
.top-title {
    color: #3b3937;
    background: #F7F7F1;
    margin-top: 15px;
    border-top: 1px solid #d4cfc8;
    border-bottom: 1px solid #d4cfc8;
}
.myrepair .pr15 {
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

.fs14 {
    font-size: 14px;
}
.section-title, .lite-divider {
    border-bottom: 1px solid #d4cfc8;
    padding-left: 15px;
}
.detail-title {
    padding: 15px 10px 10px 0px;
    font-size: 15px;
    color: #7e6b5a;
}
.top-info {
    padding: 10px 0px;
}
.item {
    overflow: hidden;
    font-size: 12px;
    color: #666;
}
.value2 {
    display: block;
    color: #3b3937;
    width: 100%;
    line-height: 25px;
    font-size: 15px;
}
.phone_icon {
    width: 40px;
    margin: 10px;
}
.highlight {
    color: #ff8a00;
}
.photo_area {
    font-size: 15px;
    color: #7e6b5a;
    padding: 10px;
    overflow: hidden;
}
.photo_wrap {
    width: 33%;
    text-align: center;
    display: inline-block;
    height: 100px;
    float: left;
        }
.photo{
        margin: 3px;
        width: 90%;
        /* outline: #e5e2dd solid 1px; */
        height: 96px;
		}        
.value {
    display: block;
    color: #666;
    width: 100%;
    line-height: 25px;
    font-size: 15px;
    word-wrap: break-word;word-wrap: break-word;
}
/* 报修人 */
.menu-link {
    display: block;
    background: url(../../assets/images/person/icon_arrow.png) no-repeat;
    background-size: 8px 12px;
    background-position: right center;
    color: #3b3937;
    line-height: 30px;
    padding: 15px 4px;
    overflow: hidden;
}

/* 评价 */
.star {
    background: url(../../assets/images/img/icon_xingxing_weixuanzhong_03.png) no-repeat;
    background-size: 100%;
    width: 20px;
    height: 20px;
    float: left;
    margin: 6px 6px 2px 6px;
}
 .star.checked{
        	background: url(../../assets/images/img/icon_xingxing_xuanzhong_03.png) no-repeat;
        	background-size: 100%;
        }

.margint {
    /* margin-top: 15px */
}      

/* 底部   */
.cbtn-fixed {
    position: fixed;
    bottom: -15px;
    left: 0px;
    right: 0px;
}
.cbtn {
    display: block;
    margin: 15px 0px;
    height: 44px;
    line-height: 44px;
    color: #fff!important;
    font-size: 15px;
    text-align: center;
    background-color: #ff8a00;
    outline: none;
    border: none;
    text-decoration: none;
}

.tow_btn {
    color: white;
    position: fixed;
    width: 100%;
    bottom: 0px;
}
.tow_btn_l {
    height: 40px;
    line-height: 40px;
    width: 36%;
    background-color: #444;
    text-align: center;
    font-size: 15px;
}
.tow_btn_r {
    height: 40px;
    line-height: 40px;
    width: 64%;
    background-color: #ff8a00;
    text-align: center;
    font-size: 15px;
}
</style>
<template>
<!-- <div class="whd"> -->
   <div class="myrepair" >
            <div class="ov top-title pr15">
                <img class="icon-repair fl" :src="typeImg"/>
                <div class="ov ptb15">
                    <span class="fl fs15" style="color: #000">{{typeName}}</span>
                    <span class="fr fs12" style="color: #999;"><i class="icon time-icon"></i>{{item.time}}</span>
                </div>
                <div class="comment ov pb15">
                    <span class="fl fs15" style="font-size: 16px;color: #666">{{item.projectName}}</span>
                    <span class="fr fs12 status-font">{{item.statusStr}}</span>
                </div>
            </div>

            <div class="lite-divider fs14" v-show="item.operatorId&&item.operatorId>0">
                    <div class="lite-divider detail-title ">
                        维修人员信息
                    </div>
                    <div class="lite-divider top-info " style="min-height: 60px;width: 100%">
                        <div class="item fl" style="padding-bottom: 15px;">
                            <p class="value2" style="font-size: 16px;">{{item.operatorCompanyName}}</p>
                            <p class="value2" style="font-size: 16px;padding-top: 5px;">{{item.operatorName}}<span style="padding-left: 20px;">{{item.operatorTel}}</span></p>
                        </div>
                        <!-- 图片待替换 -->
                        <div class="fr">
                            <a :href="oTel" class="weia">
                                <img src="../../assets/images/img/btn_phone_03.png" class="phone_icon">
                            </a>
                        </div>
                    </div>
                    <div class="detail-title" style="height:20px" v-show="item.amount>0">
                        <div class="fl">维修费用</div>
                        <div class="fr highlight">￥{{item.amount}}</div>
                        <div class="fr highlight mr10">{{payTypeName}}&nbsp;●&nbsp;</div>
                    </div>
            </div>
          
            <div style="background: white;">
                  <!-- 如果用户上传了维修图片  -->
                <div class="photo_area"  v-show="imgUrlList.length>0">
                    <div v-for="(photo,i) in imgUrlList" class="photo_wrap a_third_m20_height" @click="showPhoto(i)">
                        <img :src="photo" class="photo a_third_m22_height"/>
                        <!-- <img class="photo a_third_m22_height" src="../../assets/images/community/img_beautifulgirl_60x60_selected.png" alt=""> -->
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
                    报修人信息
                </div>
                <div class="top-info">
                    <div class="item lite-divider pl0" style="padding-bottom: 15px;">
                        <p class="value2" style="font-size: 16px;">{{item.receiverName}}<span style="padding-left: 20px;">{{item.tel}}</span></p>
                        <p class="value" style="padding-top: 5px;">{{item.address}}</p>
                    </div>
                    <div class="bottomLine" style="color:#3b3937">
                        <a href="#" class="menu-link lite-divider">
                            <p class="value2">所在小区<span style="float: right;padding-right: 10px;">{{item.xiaoquName}}</span></p>
                        </a>
                        <a href="#" class="menu-link">
                            <p class="value2">预约上门时间<span style="float: right;padding-right: 10px;color: #ff8a00;">{{item.requireDateStr}}</span></p>
                        </a>
                    </div>
                </div>
            </div>

            <div style="background: white;padding: 0 15px ;margin:15px 0" v-show="5==item.showStatus">
                <div class="lite-divider detail-title fs14">
                    维修费用
                </div>
                <div class="top-info">
                    <div class="bottomLine" style="color:#3b3937">
                        <p class="value2">费用<span style="float: right;padding-right: 10px;">{{payTypeName}}</span></p>
                    </div>
                </div>
            </div>
            <div style="background: white;padding: 0 15px ;margin:15px 0 " v-show="1==item.commentStatus">
                    <div class="lite-divider detail-title fs14">
                        我的评价
                    </div>
                    <div style="line-height: 35px;">
                        <span class="grade fs15">维修质量：</span>
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
                        <div v-for="(photo,i) in commentImgUrlList" class="photo_wrap a_third_m20_height" @click="showCommentPhoto(i)">
                            <img :src="photo" class="photo a_third_m22_height"/>
                            <!-- <img src="../../assets/images/common/icon_property_selected.png" alt=""> -->
                        </div>
                    </div>
            </div>
            <div style="width: 100%;height: 15px;"></div>

            <div class="cbtn-fixed">
                <div class="cbtn" @click="cancel" v-show="item.showStatus==1">取消维修</div>
                <div class="tow_btn"  v-show="item.showStatus==2">
                    <span  class="fl tow_btn_l" @click="cancel">
                        取消
                    </span>
                    <span  class="fl tow_btn_r"  @click="finish">
                        完成并支付
                    </span>
                </div>
                <div class="cbtn" @click="finish" v-show="item.showStatus==3">完成并支付</div>
                <div class="cbtn" @click="deleteOrder" v-show="item.showStatus==4">删除</div>
                <div class="cbtn" @click="comment" v-show="item.showStatus==5">去评价</div>
                <div class="cbtn" @click="back" v-show="item.showStatus==6">返回</div>
            </div>

   </div>
<!-- </div> -->

</template>

<script>
let vm;
import btn1 from '../../assets/images/img/btn1.png';
import btn2 from '../../assets/images/img/btn2.png';
import btn3 from '../../assets/images/img/btn3.png';
import btn4 from '../../assets/images/img/btn4.png';
import btn5 from '../../assets/images/img/btn5.png';
import btn6 from '../../assets/images/img/btn6.png';
import btn7 from '../../assets/images/img/icon_btn_jiadian.png';
import wx from 'weixin-js-sdk';
import { MessageBox } from 'mint-ui';
export default {
   data () {
       return {
           item:{},
           typeName:"",
           typeImg:"",
           imgUrlList:[],
           commentImgUrlList:[],
           payTypeName:"现金支付",
           oTel:'#',
           typeConfig:{
                1:["浴室维修",btn1],
                2:["厨房维修",btn2],
                3:["客厅卧室维修",btn3],
                4:["强弱电维修",btn4],
                5:["门窗维修",btn5],
                6:["其它维修",btn6],
                7:["家电",btn7]
                    },
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
            vm.receiveData.getData(vm,'repair/query/'+vm.$route.query.orderId,'res',function(){
            if(vm.res.success) {
                var order=vm.res.result
                vm.typeName=vm.typeConfig[order.repairType][0]
                vm.typeImg=vm.typeConfig[order.repairType][1]
                vm.imgUrlList = order.imgUrlList;
                vm.commentImgUrlList = order.commentImgUrlList;
                if(order.payType==1){
        		vm.payTypeName="微信支付";
                }
                if(order.operatorTel!=null&&order.operatorTel!=""){
	    		vm.oTel="tel:"+order.operatorTel;
	        	}
                vm.item=order;
            }else {
                alert("获取维修信息失败，请去维修记录中查看！");
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
       showCommentPhoto(i) {
           wx.previewImage({
        		current: vm.commentImgUrlList[i], // 当前显示图片的http链接
        		urls: vm.commentImgUrlList // 需要预览的图片http链接列表
        	});
       },
        //    取消维修 跳转页面
        cancel() {
            //取消跳转"cancelOrders.html?oId="+getUrlParam('oId')
            vm.$router.push({path:'/cancelOrders',query:{orderId:vm.$route.query.orderId}})
        },
        // 完成并支付
        finish() {
               MessageBox.confirm('确认完工后，进入付费操作').then(action => {
                   if(action== 'confirm') {
                        vm.receiveData.getData(vm,"repair/finish/"+vm.item.id,'res',function(){
                           if(vm.res.success) { 
                            //确定跳转repairPay.html?oId="+o.item.id
                            //  vm.$router.push({path:'/repairPay',query:{ordersID:vm.item.id}})
                            //   location.href="https://www.e-shequ.com/shijiazhuang/weixin/orderpays.html?state=123#/repairPay?orderId="+vm.item.id+'&status=123'
                            window.location.href=vm.basePageUrl+'orderpay.html?state=123#/repairPay?orderId='+vm.item.id
                           }else {
                             alert("系统异常，请稍后重试！");
                           }  
                        })
                   }
               }).catch(err => {
                  if(err == 'cancel') {

                  }
              })
        },
        //删除
        deleteOrder() {
             MessageBox.confirm('确认删除该维修单？').then(action => {
                   if(action== 'confirm') {
                        vm.receiveData.getData(vm,"repair/delete/"+vm.item.id,'res',function(){
                            if(vm.res.success) {
                            //确定跳转myRepair
                            vm.$router.push({path:'/myrepair'})
                            }else {
                                 alert("系统异常，请稍后重试！");
                            } 
                        })
                   }
               }).catch(err => {
                  if(err == 'cancel') {

                  }
              })
        },
        //评价
        comment() {
            //跳转 comment.html?oId="+o.item.id
            // vm.$router.push({path:'/commentxiu',query:{orderId:vm.item.id}})
            //  location.href="https://www.e-shequ.com/shijiazhuang/weixin/orderpays.html?state=123#/commentxiu?ordersID="+vm.item.id
            window.location.href=vm.basePageUrl+"orderpay.html?state=123#/commentxiu?ordersID="+vm.item.id
        },
        //返回
        back() {
             vm.$router.push({path:'/myrepair'})
        }

   },

}
</script>

<style  scoped>
.whd {
    width:100%;
    height:100%;
}
.myrepair {
    background: #F9F9E9;
    margin: 0;
    height: auto;
    padding-bottom: 50px;
    overflow: hidden;
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
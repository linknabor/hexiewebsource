<template>
   <div class="operorder">
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

             <div style="background: white;">
                  <!-- 如果用户上传了维修图片   -->
                <div class="photo_area" v-show="imgUrlList.length>0">
                    <div v-for="(photo,i) in imgUrlList" class="photo_wrap a_third_m20_height" @click="showPhoto(i)">
                        <img :src="photo" class="photo a_third_m22_height"/>
                        <!-- <img class="photo a_third_m22_height" src="../../assets/images/community/img_education_60x60_selected.png" alt=""> -->
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
                            <span class="custom-menu-link lite-dividers">
                                <p class="value2">所在小区<span style="float: right;padding-right: 10px;">{{item.xiaoquName}}</span></p>
                            </span>
                            <span class="custom-menu-link">
                                <p class="value2">预约上门时间<span style="float: right;padding-right: 10px;color: #ff8a00;">{{item.requireDateStr}}</span></p>
                            </span>
                        </div>
                    </div>
            </div>

            <div style="width: 100%;height: 15px;"></div>
            <div class="btn-fixed">
                <a href="#" class="btn" @click="accept" v-show="item.opStatus==1">我要抢单</a>
                <a href="#" class="btn" @click="finish" v-show="item.opStatus==2">我已完工</a>
                <a href="#" class="btn" @click="deleteOrder" v-show="item.opStatus==3">删除</a>
            </div>
   </div>
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
       vm.queryOrder(); 
   },

   methods: {
       queryOrder() {
           vm.receiveData.getData(vm,'operator/repair/query/repairId/'+vm.$route.query.ordersID,'res',function(){
             if(vm.res.success) {  
                var order=vm.res.result
                vm.typeName=vm.typeConfig[order.repairType][0]
                vm.typeImg=vm.typeConfig[order.repairType][1]
                vm.imgUrlList = order.imgUrlList;
                vm.commentImgUrlList = order.commentImgUrlList;
                vm.item=order;
             }else {
                 if(vm.res.errorCode==9999){
                    alert(vm.res.message);
                    vm.$router.push({path:'/operatorOrders'})
                } else {
                    alert("获取维修信息失败，请去维修记录中查看！");
                }
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
       //抢单
       accept() {
            MessageBox.confirm('确定要抢下该单吗？').then(action => {
                   if(action== 'confirm') {
                        vm.receiveData.getData(vm,"operator/accept/"+vm.item.id,'res',function(){
                            if(vm.res.success) {
                                 //确定跳转operatorRepairSuccess.html?oId=
                              vm.$router.push({path:'/operatorRepairSuccess',query:{ordersID:vm.$route.query.ordersID}})
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
       //完成
       finish() {
            vm.receiveData.getData(vm,"operator/repair/finish/"+vm.item.id,'res',function(){
                      if(vm.res.success) {
                             //确定跳转operatorRepairSuccess.html?oId=
                                vm.$router.push({path:'/operatorRepairSuccess',query:{ordersID:vm.$route.query.ordersID}})      
                        }else {
                            alert("系统异常，请稍后重试！");
                        }
                    },function() {
                        alert("系统异常，请稍后重试！");
                    })
       },
       //删除
        deleteOrder() {
            MessageBox.confirm('确定要删除该订单吗？').then(action => {
                   if(action== 'confirm') {
                        vm.receiveData.getData(vm,"operator/repair/delete/"+vm.item.id,'res',function(){
                            if(vm.res.success) {
                                   vm.$router.push({path:'/operatorOrders'})
                            }else {
                                 alert("系统异常，请稍后重试！");
                            }
                        })
                   }
               }).catch(err => {
                  if(err == 'cancel') {

                  }
              })
        }
   },

}
</script>

<style  scoped>
.operorder {
    background: #F9F9E9;
    margin: 0;
    height: auto;
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
/* //按钮 */
.btn-fixed {
    position: fixed;
    bottom: -15px;
    left: -15px;
    right: -15px;
}
.btn {
    display: block;
    margin: 10px;
    height: 44px;
    line-height: 44px;
    color: #fff!important;
    font-size: 15px;
    text-align: center;
    background-color: #ff8a00;
    border-radius: 3px;
    outline: none;
    border: none;
    text-decoration: none;
}
</style>
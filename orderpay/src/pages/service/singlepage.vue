<template>
  <div class="singlepage">
  <div id="zzmb"  class="zzmb" ></div>
  <div v-show="page =='main'">  
    <div class="topLine">
      <div class="fl single-img">
        <img src="../../assets/images/fu.png" alt />
      </div>
      <div class="fl">
        <span>{{service_order.service_title}}</span>
      </div>
      <div class="fr" v-show="!(service_order.price == 0)">
        <span>¥{{service_order.price}}</span>
      </div>
    </div>
     <!-- @click="choseAddress" -->
    <div class="addr_area">
        <div class="addrtop">&nbsp;</div>
        <div class="custom-menu-link" v-show="address.receiveName">
          <div class="sustoma">
            <span>{{address.receiveName}}</span>
            <span style="margin-left:15px;">{{address.tel}}</span>
            <div
              class="addr_location"
            >{{address.province}}{{address.city}}{{address.county}}{{address.xiaoquName}}{{address.detailAddress}}</div>
          </div>
        </div>
        <div class="addrbottom">&nbsp;</div>
    </div>
    <div>
      <div class="single-wt">请具体描述服务需求</div>
      <div class="single-content">
        <textarea class="single-text" @blur="fixScroll" placeholder="输入具体内容..." v-model="memo"></textarea>
      </div>
    </div>
    <div class="single-wt">上传图片</div>
    <div class="pdr2">
      <div id="pic" class="pic_frame"></div>
      <div class="pl15 pr15">
        <div id="add" @click="addPic" class="add-pic-bg fl"></div>
      </div>
      <div class="clear"></div>
    </div>
    <div style="width: 100%;height: 80px;"></div>
    <div class="btn-fixed">
            <div class="btn" @click="determine()">立即下单</div>
    </div>
  </div>
        <!-- 选择地址 -->
  <div  class="addrlist" v-show ="page == 'list'">
    <div
      class="plr15s arrow-margins menu-links mt1s fs14s address-wraps lite-dividers"
      v-for="(item,index) in addresses"
      @click="checks(item)"
      :key="index"
    >
      <i class="checkboxs" :class="{checkeds:address&&address.id===item.id}"></i>
      <div>
        <span style="margin-left:20px">{{item.receiveName}}</span>
        <span style="margin-left:15px">{{item.tel}}</span>
        <span class="mainlian" style="margin-left:15px" v-if="item.main">默认</span>
      </div>
      <div
        class="locations"
        style="margin-left:35px"
      >{{item.province}}{{item.city}}{{item.county}}{{item.xiaoquName}}){{item.detailAddress}}</div>
    </div>
  </div>  

  <div class="vue-popup">
    <div class="mask" v-show="Mask"></div>
    <transition name="slide">
        <div class="popup-content" v-show="Mask" >
              <span class="close" @click="showclose()">×</span>
              <div class="proup" >
                  <div>
                    <span class="fs3">¥ </span><span class="fs4 fs4w">{{totalAmount}}</span>
                  </div>
                  <div class="couponitem">
                        <span class="fl">订单金额</span>
                        <span class="fr">¥{{service_order.price}}</span>
                  </div>
                  <div class="couponitem" @click="showCoupons()">
                      <div class="fl">
                          <span>优惠券</span>
                          <span class=" baoyou_desc">&nbsp;&nbsp;{{ couponNum }}张可用</span>
                      </div>
                      <div class="fr">
                          <span>{{couponDesc}}</span>
                      </div>
                  </div>
                  <div class="btn1 btn2" @click="onlinePay" >立即支付</div>
              </div>
        </div>
    </transition>
  </div>
  </div>
</template>

<script>
let vm;
import wx from "weixin-js-sdk";
import cookie  from 'js-cookie';
export default {
  data() {
    return {
      Mask:this.$route.query.Mask||false,//显示支付
      memo:'',//具体内容
      localIdsid:"",
      uploadPicId:"",
      pic_length:0,
      service_order:JSON.parse(window.localStorage.getItem('service_order')),
      address: {}, //报修地址
      addrd:'',
      addresses: [],
      page:'main',
      couponNum: 0,
      coupon: null,
      couponDesc: '不使用',
      coupons:[],//优惠券
      totalAmount:0,//价格
      couponid:this.$route.query.couponid,
    };
  },
  created() {
    vm = this;
    // let url = location.href.split('#')[0];
    // vm.receiveData.wxconfig(vm,wx,['chooseImage','previewImage','uploadImage','downloadImage'],url);
  },
  components: {},
  computed: {},
  mounted() {
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
    vm.initInfo();
    vm.getcoupons();
  },
  methods: {
    //获取优惠券
    getcoupons() {
      vm.receiveData.getData(vm,'/coupon/valid4service/'+vm.service_order.service_id +'/'+vm.service_order.org_id,'res',function() {
               if(vm.res.success) {
                    if(vm.res.result!=null){
                      var addcoupons = [];
                      addcoupons=vm.res.result;
                      for(var i=0;i<addcoupons.length;i++) {
                          if(addcoupons[i].usageCondition <= vm.service_order.price) {
                            vm.coupons.push(addcoupons[i]);
                          }
                      }
                      vm.couponNum=vm.coupons.length;//可有优惠券数量
                      vm.computeAmount();
                    }
               }else {
                   alert(vm.res.message);
               }
           
           })
    },
    computeAmount() {
      var ta;
      //使用优惠券计算金额
       if(vm.couponid != undefined) {
          for(var i=0;i<vm.coupons.length;i++){
              if(vm.couponid == vm.coupons[i].id) {
                  vm.coupon = vm.coupons[i];
              }
          }
       }
        // console.log(111,vm.coupon);
      
      if (vm.coupon != null) {
        // console.log(vm.coupon.usageCondition > vm.service_order.price,vm.coupon.usageCondition,vm.service_order.price);
          if(vm.coupon.usageCondition ==null || vm.coupon.usageCondition > vm.service_order.price) {
              alert('当前优惠券不可用');
              vm.coupon = null;
          }else {
              vm.couponDesc = '-¥ '+vm.coupon.amount;
          }
      }

      if (vm.coupon == null) {
          ta = vm.service_order.price;
      } else if (vm.coupon.amount > 0) {
          ta = vm.service_order.price - vm.coupon.amount;
      }
      if (ta > 0) {
          vm.totalAmount = Number(ta).toFixed(2);
      } else {
          vm.totalAmount = 0.01;
      }
    },
    //关闭弹出层
    showclose(){
      vm.Mask = false;
        setTimeout(()=>{
                vm.$router.push({
                    path: "/singlepage",
                });
        this.$router.go(0);
      },150)
    },
    //优惠券
    showCoupons(){
      if(vm.coupons.length != 0 && vm.coupons != null) { 
        vm.$router.push({
            path: "/coupon",
            name:'coupon',
            query:{
              single:1,
              service_id:vm.service_order.service_id,
              org_id:vm.service_order.org_id,
              couponid:vm.couponid,
              amounts :vm.service_order.price,
            },
        });
      }  
    },
    //初始地址
    initInfo() {
      let url = 'repair/project/1';
      vm.receiveData.getData(vm, url, "res", function() {
      if (vm.res.success) {
        if (vm.res.result.address) {
          vm.address = vm.res.result.address;
        }
      } else {
        alert(vm.res.message == null ? "请稍后重试！" : vm.res.message);
      }
     });
    },
    //地址切换
    choseAddress(){
      vm.page = 'list';
      vm.dataAddress();
    },
    //获取地址
    dataAddress() {
      var repair='repair';
      vm.receiveData.getData(vm, "/addresses?module="+repair, "data", function() {
        if (vm.data.success) {
          vm.addresses = vm.data.result;
        } else {
          vm.addresses = [];
        }
      });
    },
    //选择地址
    checks(item) {
      vm.address = item;
      vm.page = "main";
    },
    //ios中留白问题
    fixScroll() {
      let u = navigator.userAgent;
      let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if (isiOS) {
        window.scrollTo(0, 0);
      }
    },
 

    //点击添加上传图片
    addPic:function(){
        wx.chooseImage({
            count: 6, // 默认9
            sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                 vm.localIdsid=res.localIds;
                // alert('已选择'+localIds.length+'张图片');
               var html = "";
               var pic_length = $("[name='pics']").length;
               if(pic_length+localIds.length>6){
                   alert("所选图片超过6张。")
                   return false;
               }
               vm.pic_length+=localIds.length;
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
                      html = "<div name='pics' class=\"fl\" style=\"margin-right:5px;\"><img src=\""+localIds[i]+"\"  id=\""+localIds[i]+"\" style=\"height:100px;width:90px;\"/></div>"
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
  // //上传图片到微信
    uploadToWechat() { 
        var i = 0;
        var pics = $("[name='pics']");
        function upload(){
            var img = pics.eq(i).find("img");
            var id = img.attr("id");
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
                           vm.payMent();
                        }
                        
                    }
                })
            },50);
        }
        upload();
    },
    determine() {
      if(vm.service_order.price == 0) {
        vm.onlinePay();
      }else {
        if(!(Array.isArray(vm.coupons) && vm.coupons.length === 0)) {
          vm.coupon=vm.coupons[0];
          vm.couponid=vm.coupon.id;
        }
        vm.computeAmount();
        vm.Mask = true;
      }
      
    },
    //立即下单
    onlinePay() {
      var pic_length = $("[name='pics']").length;
      $("#zzmb").show();
      let sectId = cookie.get('sectId');
      if(sectId == "" || sectId == 'null' || sectId == 0 || sectId == null) {
        alert('您暂未绑定房屋，请前往“我是业主”进行操作，感谢！')
        location.href=vm.basePageUrl+'wuye/index.html?'+vm.common.getoriApp()+'#/myhouse'
        return false;
      }
      if(pic_length>0){
          vm.uploadToWechat();
      }else {
          vm.payMent();
      }
    },
    //支付
    payMent(){
      //拼接地址 
      vm.addrd = vm.address.province+''+vm.address.city+''+vm.address.county+''+vm.address.xiaoquName+''+vm.address.detailAddress;
      var data = {
        service_id :vm.service_order.service_id,
        service_title :vm.service_order.service_title,
        image :vm.service_order.image,
        link_man :vm.address.receiveName,
        link_tel :vm.address.tel,
        service_addr :vm.addrd,
        tran_amt:vm.service_order.price,
        memo:vm.memo,
        sect_name:vm.address.xiaoquName,
        sect_id:vm.address.xiaoquId,
        imgUrls:vm.uploadPicId,
        //优惠券参数
        org_id:vm.service_order.org_id,
        org_name:vm.service_order.org_name,
      }
      if (vm.coupon != null) {
         data.couponId = vm.coupon.id;
      }
      vm.receiveData.postData(vm, "/customService/order", data, "res", function() {
        if (vm.res.success) {
          if(vm.res.result.package == null){
              vm.$router.push({path:'/checkoutsuccess',query:{'address':vm.addrd,orderId:vm.res.result.orderId}})
          }else {
              wx.config({
                  debug: false,//开启调试模式，调用的所有api的返回值会在客户端alert出来，若要查看查出出入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端是才会打印
                  appId:vm.res.result.appid, //必填，公众号的唯一标识
                  timestamp:vm.res.result.timestamp, //必填，生成签名的时间戳
                  nonceStr:vm.res.result.noncestr, // 必填，生成签名的随机串，
                  signature:vm.res.result.paysign, //必填签名，见附录1
                  jsApiList:["chooseWXPay"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
              });
              wx.chooseWXPay({
                timestamp:vm.res.result.timestamp,
                nonceStr:vm.res.result.noncestr,
                package:vm.res.result.package,
                signType:vm.res.result.signtype,
                paySign:vm.res.result.paysign,
                success:function(res) {
                  alert('支付成功！')
                  vm.ChangeState(vm.res.result.orderId)
                },
                fail() {
                  $("#zzmb").hide();
                },
                cancel(){
                  vm.paycancel(vm.res.result.orderId);
                },
              })
          } 
        }else {
            alert(vm.res.message == null ?"支付请求失败，请稍后重试!":vm.res.message);
            $("#zzmb").hide();
        }
      });
    },
    paycancel(orderId){
      vm.receiveData.postData(vm, "customService/order/cancelPay?orderId="+orderId, null, "res", function() {
          if(vm.res.success) {
              alert('支付取消');
              $("#zzmb").hide();
          }else {
              alert(vm.res.message)
              $("#zzmb").hide();
          }
      })
    },
    // 改变状态
    ChangeState(orderId){
      vm.receiveData.postData(vm,"customService/order/notifyPay?orderId="+orderId,null,'res',function(){
          if(vm.res.success) { 
               $("#zzmb").hide();
               vm.$router.push({path:'/checkoutsuccess',query:{'address':vm.addrd,'orderId':orderId}});  
          }else {
              alert(vm.res.message==null?"系统异常，请稍后重试！":vm.res.message);
              $("#zzmb").hide();
          }
      })
    }
  }
};
</script>
<style scoped>
.singlepage {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color:#fff;  
}
.zzmb {
  z-index: 100000;
  position: fixed;top: 0;left: 0;
  -moz-opacity: 0.65;opacity: 0.65;
  filter: alpha(opacity=65);
  background: #000;width: 100%;
  height: 100%;
  display: none;
}
/* ------------ */
.addr_area {
  background: #f7f7f1;
}
.addrtop {
  height: 5px;
  background-size: 100% 5px;
  background: url("../../assets/images/icon_address_top_02.png") repeat-x;}
.addrbottom {
  background: url("../../assets/images/icon_address_bottom_04.png") repeat-x;
  height: 5px;
  background-size: 100% 5px;
}
.custom-menu-link {
  background: url("../../assets/images/icon_arrow.png") no-repeat;
  background-size: 8px 12px;
  background-position: right center;
  margin: 0 15px;
  color: #3b3937;
  line-height: 30px;
  padding: 5px 4px;
  display: block;
  overflow: hidden;
  padding-right: 14px;
}
.addr_location {
  color: #888;
  line-height: 20px;
  margin-top: 6px;
}
.sustoma {
  color: #3b3937;
  display: inline-block;
}  

/* -- */
.topLine {
  margin-top: 0.3rem;
  margin-bottom: 0.2rem;
  padding: 0.2rem 0.3rem;
  background: #fff8ee;
  line-height: 19px;
  border-top: 1px solid #e5e2dd;
  border-bottom: 1px solid #e5e2dd;
  height: 19px;
  font-size: 0.3rem;
  color: #ff8000
}
.baoyou_desc {
    padding: 2px 13px;
    border: 1px solid #ff8a00;
    border-radius: 2px;
    margin-left: 10px;
    margin-top: -2px;
    font-size: 13px;
    color: #ff8a00;
}
.right_menu {
  display: block;
  background: url(../../assets/images/icon_arrow11.png) no-repeat;
  background-size: 7px 12px;
  background-position: right center;
}
.single-img {
  width: 0.4rem;
  margin-right: 0.3rem;
}
.single-img img {
  width: 100%;
  vertical-align: bottom;
}
/* ------------------ */
/* 优惠券 */
.getcoupon {
  background: #fff8ee;
  padding: 10px;
}
.couponitem {
  padding:20px 10px;
  background-color:#fff;
  overflow: hidden;
  border-radius: 6px;
}
/* 优惠券 */
.single-wt {
  padding: 0.25rem 0.2rem;
  font-size: 0.3rem;
}
.single-content {
  margin: 0 0.5rem;
}
.single-text {
  width: 94%;
  height: 100px;
  background: #f9f9f9;
  padding: 3%;
  border: 1px solid #dad7d2;
  outline: none;
  resize: none;
}
/* 选择地址 */
.addrlist {
  padding: 10px;
  font-size: 14px;
  background: white;
}
.fs14s[data-v-6193e9a6] {
  font-size: 14px;
}
.mt1s {
  margin-top: 30px;
}
.menu-links {
  background: url(../../assets/images/icon_arrow.png) no-repeat;
  background-size: 8px 12px;
  background-position: right center;
  margin: 0 15px;
  color: #3b3937;
  padding: 5px 4px;
  display: block;
  overflow: hidden;
  padding-right: 12px;
}
.arrow-margins {
  background-position: 100% center;
}
.address-wraps {
  padding-bottom: 15px;
}
.section-titles,.lite-dividers {
  border-bottom: 1px solid #d4cfc8;
  padding-left: 15px;
}
.checkboxs.checkeds {
  background-image: url(../../assets/images/icon_selected.png);
}
.checkboxs {
  float: left;display: inline-block;width: 16px;
  height: 16px;
  background:url(../../assets/images/icon_unselect.png) no-repeat;
  background-size: 16px;
  margin-top: 12px;
}
.mainlian {
  padding: 4px 8px;
  border-radius: 2px;
}
.locations {
  line-height: 20px;
  margin-top: 6px;
  }
/* 上传图片 */
.pdr2 {
  margin: 0 0.2rem;
}
.pic_frame {
  width: 94%;
  margin: 0 0 0 6%;
}
.pl15 {
  padding-left: 15px;
}
.pr15 {
  padding-right: 15px;
}
.add-pic-bg {
  background-image: url("../../assets/images/bg.png");
  height: 100px;
  width: 95px;
}
.clear{
    clear: both;
}
.btn-fixed {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
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
/* 优惠券 */
.couponitem {
  padding:10px 0;
  background-color:#fff;
  overflow: hidden;
}
.baoyou_desc {
    padding: 2px 13px;
    border: 1px solid #ff8a00;
    border-radius: 2px;
    margin-left: 10px;
    margin-top: -2px;
    font-size: 13px;
    color: #ff8a00;
}
.proup {
    position: absolute;
    top: 0;
    width: 100%;
    bottom: 0;
    opacity: 1;
    background-color: #fff;
    padding: 7%;
    padding-bottom:0;
    box-sizing: border-box;
    z-index: 9999;
    text-align: center;
}
.fs3 {
  font-size: 0.3rem;
}
.fs4 {
  font-size: 0.4rem;
}
.fs4w {
  font-weight: 600;
}
/* 按钮 */
.btn2 {
  display: block;
  margin: 10px;
  height: 44px;
  line-height: 44px;
  color: #fff !important;
  font-size: 15px;
  text-align: center;
  background-color: #ff8a00;
  border-radius: 3px;
}
.btn1 {
  margin: 0;
  position: absolute;
  width: 88%;
  bottom: 2px;
}
/* 动画 */
.popup-content {
    position: fixed;
    top:40%;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: white;
    -webkit-transition: all 0.2s ease-in;
    transition: all 0.2s ease-in;
}
.close {
    position: absolute;
    top: 0.07rem;
    right: 0.2rem;
    font-size: 0.5rem;
    z-index: 99999;
}
.mask {
    position: fixed;
    width: 100%;
    left: 0;
    top: 0;
    height: 100%;
    background-color:#F3F3F3;
    opacity: 0.55;
    transition: all 0.2s ease-in;
}
.slide-enter-active {
    animation-name: slideInUp;
    animation-duration: 0.2s;
    animation-fill-mode: both;
}
.slide-leave-active {
    animation-name: slideOutDown;
    animation-duration: 0.2s;
    animation-fill-mode: both;
}
@keyframes slideInUp {
    0% {
        transform: translate3d(0, 100%, 0);
        visibility: visible;
    }

    to {
        transform: translateZ(0);
    }
}
@keyframes slideOutDown {
    0% {
        transform: translateZ(0);
    }

    to {
        visibility: hidden;
        transform: translate3d(0, 100%, 0);
    }
}
.delay-leave-active {
    -webkit-animation-delay: 0.2s;
    -moz-animation-delay: 0.2s;
    -o-animation-delay: 0.2s;
    animation-delay: 0.2s;
}
</style>

<template>
  <div class="ind">
    <div class="qrDiv">
      <van-popup v-model="qrshow">
        <vue-qr :text="image" :margin="20" :size="400"></vue-qr>
      </van-popup>
    </div>

    <div class="avatar-wrap rel ov">
      <div class="menu-person-link-white" @click="gotoEdit">
        <img
          class="avatar center-bg"
          :src="user.headimgurl"
          style="border: 2px solid white; float: left;"
        />
        <span
          class="avatar-info"
          style="float: left;overflow: hidden;
                        width: 60%;"
        >
          <div class="name fs16">{{user.name}}</div>
          <div class="fs14">常住小区&nbsp;{{user.city}}&nbsp;{{user.xiaoquName}}</div>
        </span>
      </div>
      <!--  -->
      <div id="point-list" style="border-bottom: none;" class="div_bottom" v-show="cardService==false">
        <div class="point-item-wrap">
          <div class="point-item">
            <div class="point-info fs16">{{user.zhima}}</div>
            <div class="point-title fs14">我的芝麻</div>
          </div>
        </div>
        <div class="point-item-wrap">
          <div class="point-item">
            <div class="point-info fs16">{{user.lvdou}}</div>
            <div class="point-title fs14">我的绿豆</div>
          </div>
        </div>
        <div class="point-item-wrap">
          <div class="point-item" @click="mycoupons">
            <div class="point-info fs16">{{user.couponCount}}</div>
            <div class="point-title fs14">我的现金劵</div>
          </div>
        </div>
      </div>
      <div id="point-list" style="border-bottom: none;" class="div_bottom" v-show="cardService==true">
        <div class="point-item-wrap item-wraps">
          <div class="point-item " >
            <div class="point-info fs16">{{point}}</div>
            <div class="point-title fs14">积分</div>
          </div>
        </div>

        <div class="point-item-wrap item-wraps">
          <div class="point-item" @click="mycoupons">
            <div class="point-info fs16">{{user.couponCount}}</div>
            <div class="point-title fs14">我的优惠券</div>
          </div>
        </div>

        <div class="point-item-wrap item-wraps">
          <div class="point-item" @click="showQrcode">
            <div class="point-info fs16 qrcodelogo" ><img src=""></div>
			<div class="point-title fs14 qrcodeowner">业主码</div>
          </div>
        </div>
      </div>
    </div>

    <div class="info-wrap" style="overflow:hidden; clear: both; border-bottom:none ;">
      <!-- 链接地址要换 -->
      <!-- :href="this.basePageUrlpay+'orderpay.html?'+this.common.getoriApp()+'#/orders'" -->
      <a
        href="javascript:void(0);"
        class="input-wrap  lite-divider disb"
      >
        <span class="input-info lf30 fs16">全部订单</span>
      </a>
    </div>

    <div id="module-list">
      <div class="module-item-wrap module-newwidth" >
        <a class="module-item" :href="this.basePageUrlpay+'orderpay.html?'+this.common.getoriApp()+'#/special?type=1'">
          <div class="module-logo logo6"></div>
          <div class="module-title fs14">商城订单</div>
        </a>
      </div>
      <div class="module-item-wrap module-newwidth">
        <!-- <a v-if="donghu" class="module-itemdh" :href="this.basePageUrlpay+'orderpay.html?'+this.common.getoriApp()+'#/homeorders'">
            <div class="module-logodh logo5" >
                <div class="module-titledh fs14">服务订单</div>
            </div>
        </a>  -->
        <router-link  class="module-item" :to="{path:'/myservice'}">
          <div class="module-logo logo3"></div>
          <div class="module-title fs14">服务订单</div>
        </router-link>
      </div>

      <div  class="module-item-wrap module-newwidth" >
        <router-link class="module-item" :to="{path:'/myrepair'}">
          <div class="module-logo logo7"></div>
          <div class="module-title fs14">维修订单</div>
        </router-link>
      </div>
    </div>

    <!-- <div class="info-wrap" v-if="donghu">
        <a :href="this.basePageUrl+'wuye/index.html?'+this.common.getoriApp()+'#/mysteward?n=2'" class="input-wrap menu-person-link lite-divider">
          <span class="input-info lf30 fs16">报修</span>
          <span class="fr fs14 left_color">
            <span id="mypublic"></span>查看消息&nbsp;&nbsp;&nbsp;&nbsp;
          </span>
        </a>
        <a :href="this.basePageUrl+'wuye/index.html?'+this.common.getoriApp()+'#/mysteward?n=0'" class="input-wrap menu-person-link lite-divider">
          <span class="input-info lf30 fs16">服务需求</span>
          <span class="fr fs14 left_color">
            <span id="mypublic"></span>查看消息&nbsp;&nbsp;&nbsp;&nbsp;
          </span>
        </a>
        <a :href="this.basePageUrl+'wuye/index.html?'+this.common.getoriApp()+'#/mysteward?n=1'" class="input-wrap menu-person-link lite-divider">
          <span class="input-info lf30 fs16">意见建议</span>
          <span class="fr fs14 left_color">
            <span id="mypublic"></span>查看消息&nbsp;&nbsp;&nbsp;&nbsp;
          </span>
        </a>
    </div> -->
    <div>
      <div class="info-wrap" style="overflow:hidden; clear: both;">
        <div @click="business" v-show="merchant"  class="input-wrap menu-person-link lite-divider">
          <span class="input-info lf30 fs16">我是商家</span>
          <span class="fr fs14 left_color">查看记录&nbsp;&nbsp;&nbsp;&nbsp;</span>
        </div>
        <router-link
          :to="{path:'/getcoupons'}"
          class="input-wrap menu-person-link lite-divider"
        >
          <span class="input-info lf30 fs16">领券中心</span>
          <span class="fr fs14 left_color">点击领取&nbsp;&nbsp;&nbsp;&nbsp;</span>
        </router-link>

        <router-link
          :to="{path:'/service', query:{subscribeTemplateIds:this.subscribeTemplateIds}}"
          class="input-wrap menu-person-link lite-divider"
          v-show="serviceOperator || service_list.length > 0"
        >
          <span class="input-info lf30 fs16">我是服务人员</span>
          <span class="fr fs14 left_color">查看订单&nbsp;&nbsp;&nbsp;&nbsp;</span>
        </router-link>
        <router-link
          :to="{path:'/operatorOrders', query:{subscribeTemplateIds:this.subscribeTemplateIds}}"
          class="input-wrap menu-person-link lite-divider"
          v-show="repairOperator"
        >
          <span class="input-info lf30 fs16">我是维修工</span>
          <span class="fr fs14 left_color">查看维修单&nbsp;&nbsp;&nbsp;&nbsp;</span>
        </router-link>

        <router-link
          :to="{path:'/mass-notice'}"
          class="input-wrap menu-person-link lite-divider"
          v-show="msgSender"
        >
          <span class="input-info lf30 fs16">消息推送</span>
          <span class="fr fs14 left_color">消息推送&nbsp;&nbsp;&nbsp;&nbsp;</span>
        </router-link>

        <div class="input-wrap menu-person-link lite-divider" @click="Notice">
          <span class="input-info lf30 fs16">我的消息</span>
          <span class="fr fs14 left_color">查看消息&nbsp;&nbsp;&nbsp;&nbsp;</span>
        </div>
        <router-link :to="{path:'/myPublish'}" class="input-wrap menu-person-link lite-divider">
          <span class="input-info lf30 fs16">我的发布</span>
          <span class="fr fs14 left_color">
            <span id="mypublic"></span>查看发布&nbsp;&nbsp;&nbsp;&nbsp;
          </span>
        </router-link>
      </div>

      <div class="info-wrap">
        <a
          :href="this.basePageUrl+'wuye/index.html?'+this.common.getoriApp()+'#/Myhouse'"
          class="input-wrap menu-person-link lite-divider"
        >
          <span class="input-info lf30 fs16">我是业主</span>
          <span class="fr fs14 left_color">绑定房屋&nbsp;&nbsp;&nbsp;&nbsp;</span>
        </a>
        <a @click="gotoAddress" class="input-wrap menu-person-link lite-divider">
          <span class="input-info lf30 fs16">常用地址</span>
          <span class="fr fs14 left_color">收货地址&nbsp;&nbsp;&nbsp;&nbsp;</span>
        </a>
      </div>
    </div>

    <div class="info-wrap" style="border-bottom: none;">
      <a
        :href="'tel:'+user.officeTel"
        v-show="user.officeTel!=null && user.officeTel!=''"
        class="input-wrap menu-person-link lite-divider special-link"
      >
        <span class="input-info lf30 fs16">小区电话</span>
        <span class="fr fs14 left_color">{{user.officeTel}}</span>
      </a>

      <a href="tel:021-50876295" v-show="user.csHotline!=null && user.csHotline!=''"  class="input-wrap menu-person-link lite-divider special-link">
        <span class="input-info lf30 fs16">客服电话</span>
        <span class="fr fs14 left_color">{{user.csHotline}}</span>
      </a>
    </div>

    <div class="bottom-info divider" style="text-align: center; display: block;">
      <div
        class="divider highlight"
        style="text-align: center;width:100%;font-size:16px"
      >长按关注公众号，尊享更多服务和商品</div>
      <img style="width: 200px;" :src="qrCode" />
    </div>
    <div  v-show="login"
          style=" background: rgba(0,0,0,0.5);display: none;width: 100%;height: 100%;top: 0rem; position: fixed;z-index: 999;">
    </div>
    <div id="login" v-show="login">
      <img
        src="../../assets/images/img/7f1b3b58-c5b6-4022-b1ed-dc4188c43a3a.gif"
        style="width:100%;vertical-align: middle;"
      />
    </div >
  </div>
</template>

<script>
  let vm;
  import Vue from 'vue';
  import img from "../../assets/images/common/logo.jpg";
  import Bus from '../../api/bus.js'
  import cookie from 'js-cookie';
  import { Popup } from 'vant';
  import vueQr from 'vue-qr';
  Vue.use(Popup);
  export default {
    data() {
      return {
        user: {
          headimgurl: "" /**默认头像*/,
          nam: "",
          level: "",
          zhima: "0",
          lvdou: "0",
          couponCount: 0,
        },
        service_list:[],
        login:false,
        cardService:'',
        qrCode:'',//二维码
        point:0,//积分
        cardStatus:'',//是否领卡激活的标记
        // donghu:false,//标识判断是不是东湖
        serviceOperator:false, //我是服务人员
        evoucherOperator:'',//核销卡卷
        merchant:false,//我是商家
        repairOperator:false,//我是维修工
        msgSender:false,//消息推送
        user_info: {
          avatar: img,
          nickname: "游客",
          levelname: "普通会员"
        },
        qrshow:false, //二维码显示开关
        image:'',
        subscribeTemplateIds:[] //工作人远用的订阅消息模板id列表

      };
    },
    created() {
      vm = this;
    },
    mounted() {
      // this.initSession4Test();
      this.User();
    },
    methods: {
      //模仿线上用户信息
      // 105/747/384
      initSession4Test() {

        var url ='login/8441?code=8441';
        var data = {
          "oriApp": "wx95f46f41ca5e570e"
        }
        vm.receiveData.postData(vm,url,data,'res',function(){
        });
      },
      User() {
        //获取页面数据
        let n = "GET",
          a = "userInfo?oriApp="+vm.getUrlParam('oriApp'),
          i = null,
          d = function() {},
          e = function(n) {
            if(n.success&&n.result==null) {
              reLogin();
              return
            }else {
              // vm.donghu=n.result.donghu;//东湖标识
              vm.user = n.result;
              vm.user.headimgurl = "" != n.result.name || n.result? n.result.headimgurl: vm.user_info.avatar;
              vm.user.name ="" != n.result.name ? n.result.name : vm.user_info.nickname;
              vm.qrCode=n.result.qrCode;
              vm.cardService=n.result.cardService;
              vm.repairOperator =  n.result.serveRole.repairOperator;
              vm.serviceOperator = n.result.serveRole.serviceOperator;//我是服务人员
              vm.evoucherOperator = n.result.serveRole.evoucherOperator;//核销卡卷
              vm.merchant = n.result.serveRole.merchant;//我是商家
              vm.msgSender = n.result.serveRole.msgSender;//消息推送
              vm.subscribeTemplateIds = n.result.subscribeTemplateIds;

              if(vm.user.point<0){//小于0等于0
                vm.point=0;
              }else {
                vm.point=vm.user.point;
              }
              vm.login=false;
              Bus.$emit('sends',n.result.iconList);
              //是否配置服务人员
              vm.qrCodePayService();
              //保存
              vm.common.updatecookie(n.result.cardStatus,n.result.cardService,n.result.id,n.result.appid,n.result.cspId,n.result.sectId,n.result.cardPayService,n.result.bgImageList,n.result.wuyeTabsList,n.result.qrCode,n.result);
            }
          },
          r = function() {
            vm.login=false;
            vm.user = {};
            (vm.user.headimgurl = vm.user_info.avatar),
              (vm.user.name = vm.user_info.nickname);
          };
        this.common.invokeApi(n, a, i, d, e, r);
      },
      //是否配置服务人员
      qrCodePayService() {
        vm.receiveData.getData(vm, "/qrCodePayService", "res", function() {
          if (vm.res.success) {
            if(vm.res.result.service_list != null) {
              vm.service_list = vm.res.result.service_list;
            }
          } else {
            if(vm.res.message != null && vm.res.errorCode !=40001) {
              alert(vm.res.message);
            }
          }
        });
      },
      //点击头像
      gotoEdit() {
        if(vm.cardService){
          //1新用户未领卡未激活
          if(!vm.user.tel && (vm.user.cardStatus=='1'||vm.user.cardStatus==null || vm.user.cardStatus=='0')){
            vm.$router.push({ path: "/welfare" });
          }else if(!vm.user.tel && vm.user.cardStatus=='2'){ //2新用户领卡未激活
            vm.$router.push({ path: "/register" });
          }else if(vm.user.tel && (vm.user.cardStatus=='3' || vm.user.cardStatus=='4')){ //3新用户或老用户领卡已激活
            vm.receiveData.getData(vm,"/card/activateUrlOnMenu?oriApp="+vm.getUrlParam('oriApp'),'res',function(){
              if(vm.res.success) {
                location.href=vm.res.result;
              }else {
                alert(vm.res.message);
              }
            });
          }else if(vm.user.tel && (vm.user.cardStatus=='1'||vm.user.cardStatus==null || vm.user.cardStatus=='0')){ //1老用户未领卡未激活
            vm.$router.push({ path: "/welfare" });
          }else if(vm.user.tel && vm.user.cardStatus=='2') { //2 老用户领卡未激活
            vm.receiveData.getData(vm,"/card/activateUrlOnMenu?oriApp="+vm.getUrlParam('oriApp'),'res',function(){
              if(vm.res.success) {
                location.href=vm.res.result;
              }else {
                alert(vm.res.message);
              }
            });
          }
        }else {
          vm.$router.push({ path: "/bindphone" });
        }
      },
      //我的优惠券
      mycoupons() {
        vm.$router.push({ path: "/coupon" });
      },
      gotoAddress() {
        vm.$router.push({ path: "/addresses" });
      },
      Notice() {
        vm.$router.push({path:'/notices'})
      },
      //我是商家
      business() {
        var evoucherOperator = '';
        if(this.evoucherOperator) {
          evoucherOperator = 'true';
        }else {
          evoucherOperator = 'false';
        }
        vm.$router.push({path:'/specialorders',query:{'evoucherOperator':evoucherOperator,type:'1'}});
      },
      showQrcode() {
        let str = "?appid=" + vm.user.appId + "&userid=" + vm.user.wuyeId;
        vm.qrshow = true
        vm.image = str
      }
    },
    computed: {},
    components: {
      vueQr
    }
  };
</script>

<style  scoped>
  #login {
    position: fixed;
    top: 35%;
    left: 50%;
    width: 60px;
    height: 60px;
    line-height: 60px;
    margin-left: -30px;
    text-align: center;
    z-index: 1998;
    -moz-border-radius: 15px;
    -webkit-border-radius: 15px;
  }
  .ind {
    background-color: #fffff8;
    /* overflow-x: hidden; */
  }
  .avatar-wrap {
    background-color: #ff8a00;
  }
  .qrcodelogo {
    background: url(../../assets/images/ownerScan.png) no-repeat;
    width: 100%;
    position: absolute;
    left: 50%;
  }

  .qrcodeowner {
    position: absolute;
    top: 19px;
    left: 50px;
  }
  .rel {
    position: relative;
  }
  .ov {
    overflow: hidden;
    width: 100%;
    /* height: 3.7rem; */
    height: 2.9rem;
  }
  /* 头部 */
  .menu-person-link-white {
    display: block;
    background: url(../../assets/images/person/icon_person_arrow.png) no-repeat;
    background-size: 7px 14px;
    height: 1.5rem;
    margin-right: 10px;
    background-position: right 36px;
  }
  .avatar-wrap span {
    display: inline-block;
    vertical-align: middle;
  }
  .avatar {
    margin: 15px;
  }
  .center-bg {
    background-size: cover;
    background-position: center;
  }
  .avatar {
    height: 60px;
    width: 60px;
    /* margin: 15px 20px; */
    border-radius: 50%;
  }
  .avatar-info {
    color: #fff;
  }
  .name {
    margin-top: 25px;
    margin-bottom: 10px;
  }
  .fs16 {
    font-size: 16px;
  }
  .fs14 {
    font-size: 14px;
  }
  #point-list {
    width: 100%;
    top: 1.4rem;
  }

  .div_bottom {
    position: absolute;
    /* bottom: 0; */
  }
  .left_color {
    color: #999999;
  }
  #point-list .point-item-wrap {
    margin-top: 0.5rem;
    width: 33%;
    float: left;
    position: relative;
  }
  #point-list .item-wraps {
    width: 33%;
  }
  #point-list .point-item-wrap .point-item {
    border-radius: 2px;
    -webkit-border-radius: 2px;
    height: 40px;
    margin: 0 4px 4px 0;
    display: block;
  }
  #point-list .point-item-wrap .point-item .point-info {
    color: white;
    text-align: center;
  }
  #point-list .point-item-wrap .point-item .point-title {
    margin-top: 5px;
    margin-bottom: 20px;
    text-align: center;
    position: relative;
    color: white;
  }
  /* 全部订单 */
  .info-wrap {
    color: #3b3937;
    padding-bottom: 0;
    font-size: 12px;

  }
  .mrg5 {
    margin-right: 0.5rem;
  }
  .section-title,
  .lite-divider {
    border-bottom: 1px solid #d4cfc8;
  }
  .menu-person-link {
    padding-right: 1rem;
    color: #3b3937;
  }
  .input-wrap {
    overflow: hidden;
    line-height: 1rem;
  }
  .section-title,
  .lite-divider {
    /* border-bottom: 1px solid #d4cfc8; */
    padding-left: 15px;
  }
  .menu-person-link {
    display: block;
    background: url(../../assets/images/person/icon_arrow.png) no-repeat;
    background-size: 7px 14px;
    background-position: 98% center;
    padding-right: 15px;
  }
  .disb {
    display:block;
    color: #3b3937;
  }
  /* 订单服务 */
  #module-list {
    width: 100%;
    overflow: hidden;
    border-bottom: 1px solid #d4cfc8;
  }
  #module-list .module-item-wrap {
    margin-top: 8px;
    width: 50%;
    float: left;
    /* border-bottom: 10px solid #d4cfc8; */
    position: relative;
  }
  #module-list .module-newwidth {
    width: 33%;
  }
  #module-list .module-item-wrap .module-item {
    margin-top: 10px;
    display: block;
    width: 100%;
    /* height: 1.5rem; */
    padding: 0.2rem;
    background-position: 50% 0;
    background-size: 42px;
    background-repeat: no-repeat;
  }
  #module-list .module-item-wrap .module-item {
    font-size: 16px;
    color: #3b3937;
  }
  #module-list .module-item-wrap .module-item {
    -webkit-border-radius: 2px;
    margin: 0 4px 4px 0;
  }
  .module-logo {
    margin-top: 4px;
    display: block;
    /* height: 43px; */
    height: 0.7rem;
    background-position: 50% 0;
    background-size: 0.6rem;
    background-repeat: no-repeat;
  }
  .module-title {
    text-align: center;
    /* margin-top: 10px; */
    color: #3b3937;
  }
  .logo1 {
    background-image: url("../../assets/images/person/icon_person_tehui.png");
  }
  .logo2 {
    background-image: url("../../assets/images/person/icon_person_tuangou.png");
  }
  .logo3 {
    background-image: url("../../assets/images/person/icon_person_yuyue.png");
  }
  .logo6 {
    background-image: url(http://img.e-shequ.cn/Ftfh6I1VTTeiMW-Cj8TUe8o5ONc5);
  }
  .logo7 {
    background-image: url(http://img.e-shequ.cn/FlyfitH09IfIP9RiTgUddHa25auM);
  }
  .logo4 {
    background-image: url("../../assets/images/person/icon_person_tuangoudh.png");
  }
  .logo5 {
    background-image: url("../../assets/images/person/icon_person_yuyuedh.png");
  }
  .bottom-info {
    padding: 20px 15px 5px 15px;
  }

  .highlight {
    color: #ff8a00;
  }
  .divider {
    border-bottom: 10px solid #f7f7f2;
  }
  .special-link {
    padding-right:15px;
    background: none;
  }

  #module-list .moduledh {
    width: 50%;
  }
  .module-itemdh {
    margin-top: 10px;
    display: block;
    width: 100%;
    background-position: 50% 0;
    background-size: 42px;
    background-repeat: no-repeat;
    font-size: 16px;
    color: #3b3937;
    -webkit-border-radius: 2px;
  }
  .module-logodh{
    margin-top: -5px;
    display: block;
    height: 1.2rem;
    background-position: 25% 0;
    background-size: .7rem;
    background-repeat: no-repeat;
  }
  .module-titledh {
    text-align: center;
    margin-top: 10px;
    margin-left: 27%;
    padding-top: 7%;
    color: #3b3937;
  }
  #module-list .moduledh {
    width: 50%;
  }
  .module-itemdh {
    margin-top: 10px;
    display: block;
    width: 100%;
    background-position: 50% 0;
    background-size: 42px;
    background-repeat: no-repeat;
    font-size: 16px;
    color: #3b3937;
    -webkit-border-radius: 2px;
  }
  .module-logodh{
    margin-top: -5px;
    display: block;
    height: 1.2rem;
    background-position: 25% 0;
    background-size: .7rem;
    background-repeat: no-repeat;
  }
  .module-titledh {
    text-align: center;
    margin-top: 10px;
    margin-left: 27%;
    padding-top: 7%;
    color: #3b3937;
  }
</style>

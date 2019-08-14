<template>
  <div class="ind">
    <div class="avatar-wrap rel ov">
      <!-- <div class=" menu-person-link-white" @click="gotoEdit"> -->
      <div class="menu-person-link-white">
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
        </span>
      </div>

      <div id="point-list" style="border-bottom: none;" class="div_bottom">
        <div class="point-item-wrap">
          <div class="point-item">
            <!-- <div class="point-info fs16">您的VIP会员将在2020年6月6日到期</div> -->
            <div class="point-info fs16" v-if="ispanduan=='gettime'">您尚未开通合协社区VIP会员</div>
            <div
              class="point-info fs16"
              v-if="ispanduan=='time'"
            >您的VIP会员将在{{shijian | moment("YYYY年MM月DD日")}}到期</div>
          </div>
        </div>

        <!-- <div class="kaitonghuiyuan-r">VIP会员服务协议&nbsp;&gt;</div> -->
      </div>
    </div>
    <!-- 合协社区VIP会员 -->
    <div class="kaitong-1">
      <div class="kaitong-2">
        <div
          class="kaitong-hexie"
          style="font-size: 17px;color: black; margin-top: -12px;position: absolute;letter-spacing: 3px;left:-12px;"
        >合协社区VIP会员</div>
        <span>享受更多福利优惠</span>
      </div>
    </div>
    <div id="huiyuanka">
      <div class="huiyuanka">
        <!-- <span class="huiyuan-left">合协社区VIP会员</span><br>
                    <span class="huiyuan-left1">98.00元/年</span>
        <span class="huiyuan-right">98￥</span>-->
        <img src="../assets/images/home/image/hygm.png" />
      </div>
      <div class="kaitonghuiyuan-r">VIP会员服务协议&nbsp;&gt;</div>
    </div>
    <div
      class="fengetiao"
      style="width: 100%; height: .1rem;;background: rgb(242, 242, 242);position: relative;top: 0.4rem;"
    ></div>
    <div class="tupian">
      <div
        class="tequan"
        style="font-size: 17px;color: black;top: -44px; position: absolute; letter-spacing: 3px;  left: 28px;position: relative;"
      >VIP会员特权</div>
      <div class="tupian1">
        <ul>
          <li class="jgg_li">
            <div class="jgg_img">
              <img src="../assets/images/home/image/sgdl.png" alt="tt" />
            </div>
            <span class="jgg-span">首购礼包</span>
          </li>
          <li class="jgg_li">
            <div class="jgg_img">
              <img src="../assets/images/home/image/wyjf.png" alt="tt" />
            </div>
            <span class="jgg-span">物业费立减</span>
          </li>
          <li class="jgg_li">
            <div class="jgg_img">
              <img src="../assets/images/home/image/yhq.png" alt="tt" />
            </div>
            <span class="jgg-span">优惠劵</span>
          </li>
          <li class="jgg_li">
            <div class="jgg_img">
              <img src="../assets/images/home/image/wx.png" alt="tt" />
            </div>
            <span class="jgg-span">优先服务</span>
          </li>
          <li class="jgg_li">
            <div class="jgg_img">
              <img src="../assets/images/home/image/shop.png" alt="tt" />
            </div>
            <span class="jgg-span">超值购物</span>
          </li>
          <li class="jgg_li">
            <div class="jgg_img">
              <img src="../assets/images/home/image/zskf.png" alt="tt" />
            </div>
            <span class="jgg-span">专属客服</span>
          </li>
          <li class="jgg_li">
            <div class="jgg_img">
              <img src="../assets/images/home/image/jqqd.png" alt="tt" />
            </div>
            <span class="jgg-span">敬请期待</span>
          </li>
        </ul>
      </div>
    </div>

    <!-- <Success v-show="succ" :time="shijian" @succs="getsucces"></Success> -->
    <Success v-show="succ"  @succs="getsucces"></Success>

    <!-- 购买会员 -->
    <div class="footer">
      <input
        type="button"
        class="ljgm"
        style="outline:none"
        v-if="input1"
        value="立即续费"
        @click="goumai()"
      />
      <input type="button" class="ljgm" style="outline:none" v-else value="立即购买" @click="goumai()" />
    </div>
    <div
      v-show="isshow"
      style=" background: rgba(0,0,0,0.5);display: none;width: 100%;height: 100%;top: 0; position: absolute;"
    ></div>
  </div>
</template>

<script>
let vm;
import img from "../assets/images/home/image/logo.jpg";
import wx from "weixin-js-sdk";
import moment from "./filters/datafromat";
import Success from "../component/success";
export default {
  components: {
    Success
  },
  data() {
    return {
      input1: false,
      isshow: false,
      succ:false,
      user: {
        headimgurl: "" /**默认头像*/,
        name: "",
        level: ""
      },
      ispanduan: "gettime",
      shijian: "",

      user_info: {
        avatar: img,
        nickname: "游客",
        levelname: "普通会员"
      },
      user_level: {
        0: "普通会员",
        1: "钻石会员",
        2: "大楼VIP"
      }
    };
  },
  //时间戳转换成日期
  filters: {
    moment
  },

  created() {
    vm = this;
    // this.aa()
  },
  mounted() {
    // this.initSession4Test();
    this.User();
    // vm.aa();
    this.jkpd(); //通过接口判断
  },
  components: {
    Success
  },
  methods: {
    //判断是不是会员
    jkpd() {
      vm.receiveData.getData(vm, "/getMember", "res", function(res) {
        if (vm.res[0].status == "0") {
          vm.ispanduan = "time";
          // vm.isMember = true;
          vm.shijian = vm.res[0].enddate;
          vm.input1 = true;
        }
        
      });
    },
    //模仿线上用户信息
    // 105/747/384
    initSession4Test() {
      let url = "/initSession4Test/15184";
      vm.receiveData.getData(vm, url, "Data", function() {});
    },
    User() {
      //获取页面数据
      let n = "GET",
        a = "userInfo",
        i = null,
        d = function() {},
        e = function(n) {
          if (n.result) {
            vm.user = n.result;
            vm.user.headimgurl =
              "" != n.result.name || n.result
                ? n.result.headimgurl
                : vm.user_info.avatar;
            vm.user.name =
              "" != n.result.name ? n.result.name : vm.user_info.nickname;
          }
        },
        r = function() {
          vm.user = {};
          (vm.user.headimgurl = vm.user_info.avatar),
            (vm.user.name = vm.user_info.nickname);
        };
      this.common.invokeApi(n, a, i, d, e, r);
    },

    // 点击跳转到购买成功页面
    goumai() {
      vm.receiveData.getData(vm, "/getMemberPayinfo/", "n", function() {
        // console.log(vm.n)
        wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: vm.n.appid, // 必填，公众号的唯一标识
          timestamp: vm.n.timestamp, // 必填，生成签名的时间戳
          nonceStr: vm.n.noncestr, // 必填，生成签名的随机串
          signature: vm.n.paysign, // 必填，签名，见附录1
          jsApiList: ["chooseWXPay"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        });
        wx.chooseWXPay({
          appId: vm.n.appid,
          timestamp: vm.n.timestamp,
          nonceStr: vm.n.noncestr,
          package: vm.n.packageValue,
          signType: vm.n.signtype,
          paySign: vm.n.paysign,
          success: function(res) {
            // vm.aa();
            vm.succ = true;
            vm.isshow = false;
            // })

            // vm.succ=true;
            // vm.isshow=false;
          },
          fail: function(res) {
            vm.isshow = false;
            alert("支付失败");
          },
          cancel: function(res) {
            vm.isshow = false;
            alert("支付取消");
          }
        });
      });
      vm.isshow = true;
    },
    
    getsucces(shijian1) {
      vm.succ=false;
      vm.shijian = shijian1;
      // vm.jkpd();
      // vm.ispanduan="time"
    }
  },
  computed: {}
};
</script>

<style  scoped>
.ind {
  background-color: white;
  /* width:100%; */
  /* height: 15rem; */
  overflow-x: hidden;
  overflow-y: auto;
  height: 100vh;
}
.avatar-wrap {
  height: 2.1rem;
  background-color: white;
}
.rel {
  position: relative;
}
.ov {
  overflow: hidden;
  padding: 1px;
}
/* 头部 */
.menu-person-link-white {
  display: block;
  /* background: url(../../assets/images/person/icon_person_arrow.png) no-repeat; */
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
  color: white;
}
.name {
  font-size: 18px;
  margin-top: 25px;
  margin-bottom: 10px;
  color: black;
}
.point-info {
  margin-left: 90px;
  position: absolute;
  margin-top: -13px;
}
.fs14 {
  font-size: 14px;
}
.kaitonghuiyuan-r {
  float: right;
  margin-top: 11px;
  margin-right: 10px;
}
.kaitong-2 {
  position: relative;
  position: relative;
  top: 0.5rem;
  margin-left: 40px;
}
/* h6{margin-top:-10px;position:absolute;} */
.kaitong-1 {
  width: 100%;
  height: 1.22rem;
  background: white;
}
.kaitong-2 span {
  top: 14px;
  position: absolute;
  letter-spacing: 3px;
}
#huiyuanka {
  width: 100%;
  height: 2.5rem;
  background: white;
  top: 0.4rem;
  position: relative;
  margin-top: -11px;
}
.huiyuanka {
  border: 1px solid #ffd600;
  width: 80%;
  height: 1.8rem;
  background: #fde95494;
  vertical-align: middle;
  margin: 0 10%;
  top: 278px;
}
.huiyuan-left {
  margin: 10px 10px;
  left: 56px;
  margin-top: 20px;
  position: absolute;
  margin-bottom: 10px;
  letter-spacing: 2px;
}
.huiyuan-left1 {
  margin: 10px 10px;
  left: 57px;
  margin-top: 26px;
  position: absolute;
  letter-spacing: 2px;
}
span .huiyuan-left {
  margin-bottom: 10px;
}
.huiyuan-right {
  float: right;
  position: relative;
  line-height: 50px;
  margin-right: 20px;
  font-size: 20px;
}
.footer {
  bottom: 0.4rem;
  width: 100%;
  height: 1rem;
  background: white;
  position: fixed;
}
input {
  border: none;
  width: 80%;
  height: 0.6rem;
  background: #f0d763;
  border-radius: 5px;
  margin: 0 10%;
  position: relative;
  top: 0.3rem;
}
/* 点击立即购买出现遮罩层防止重复点击 */
/* .footer{width: 100%;background: rgba(0,0,0,0.5);display: block;top: 0rem; height: 14rem; position: absolute;z-index:100000} */

.jgg_img img {
  width: 40px;
  height: 43px;
}
/* 图片 */
.tupian1 {
  width: 100%;
  height: 250px;
  background-color: white;
}
.jgg_li {
  float: left;
  width: calc((100% / 3) - 2px);
  height: 88px;
  text-align: center;
  letter-spacing: 1.31px;
  font-size: 12px;
  font-family: PingFangSC-Regular;
}
.jgg_li:nth-child(1) {
  border-left: none;
}
.jgg_li:nth-child(3) {
  border-right: none;
}
.jgg_li:nth-child(4) {
  border-left: none;
}
.jgg_li:nth-child(6) {
  border-right: none;
}
.jgg_img {
  margin: -25px auto 3px;
}

.jgg-span {
  color: black;
}
.tupian {
  width: 100%;
  /* height: 1149px; */
  top: 2.1rem;
  position: relative;
  height: 7.2rem;
}
</style>
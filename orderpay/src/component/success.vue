<style>
.header {
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: block;
  top: 0rem;
  height: 14rem;
  position: absolute;
  z-index: 100000;
}
/* .success_1{width:55%;height:5%;background:wheat;} */
.success {
  width: 5rem;
  height: 6rem;
  background: #f5e47d;
  top: 160px;
  position: absolute;
  margin: 0 16%;
}
.success_1 {
  margin-top: 50px;
  vertical-align: middle;
  letter-spacing: 2px;
  text-align: center;
  margin: 0;
  font-size: 15px;
  width: 100%;
  height: 22%;
  background: #f5e47d;
}
.success_2 {
  width: 100%;
  height: 33%;
  background: #f5e47d;
  position: relative;
  top: -29px;
  text-align: center;
}
.top {
  margin: 0.5rem;
  position: relative;
  top: 18px;
  letter-spacing: 1.4px;
  font-size: 14px;
}
.tob {
  margin: 0.5rem;
  position: relative;
  top: 9px;
  font-size: 12px;
  letter-spacing: 1px;
}
b {
  position: absolute;
  margin-left: -55px;
  margin-top: 24px;
}
.success_3 {
  width: 100%;
  height: 33%;
  background: #f5e47d;
  position: absolute;
  top: 3rem;
}
.back {
  border: none;
  width: 55%;
  height: 25px;
  background: #f0d763;
  margin-top: 20px;
  margin: 20px 23%;
  border-radius: 5px;
}
.center {
  border: none;
  width: 55%;
  height: 25px;
  background: #f0d763;
  margin: 7px 22%;
  margin-top: -9px;
  border-radius: 5px;
  text-align: center;
}
</style>

<template>
  <div class="header">
    <div class="success">
      <div class="success_1" style="color:red;">
        <b>恭喜您购买成功</b>
      </div>
      <div class="success_2">
        <!-- <span class="top">您已成为合协社区VIP会员</span>
        <span class="tob">会员有效期至{{this.time | moment("YYYY年MM月DD日")}}</span>-->
        <div class="top">您已成为合协社区VIP会员</div>

        <!-- <div class="tob">会员有效期至{{newtime | moment("YYYY年MM月DD日")}}</div> -->
        <div class="tob">会员有效期至{{shijian1 | moment("YYYY年MM月DD日")}}</div>
      </div>
      <div class="success_3">
        <a :href="this.basePageUrl+'wuye/index.html?v=20162299'">
          <input type="button" value="返回首页" class="back" style="outline:none;" />
        </a>
        <input type="button" value="会员中心" class="center" style="outline:none;" @click="fanhui" />
      </div>
    </div>
  </div>
</template>
<script>
let vm;
// import kaitong from './index/kaitong'
import moment from "../pages/filters/datafromat";
export default {
  // props: ["newtime"],
  data() {
    return {
      shijian1: ""
    };
  },
  created() {
    vm = this;
  },
  methods: {
    fanhui() {
      // vm.$emit("succs", false);
      vm.$emit("succs", this.shijian1);
    },
    //接口判断是不是会员若是显示会员到期时间
    // jkpd() {
    //   vm.receiveData.getData(vm, "/getMember", "res", function(res) {
    //     if (vm.res[0].status == "0") {
    //       vm.ispanduan = "time";
    //       // vm.isMember = true;
    //       vm.shijian = vm.res[0].enddate;
    //     }
    //   });
    // }
    jkpd() {
      vm.receiveData.getData(vm, "/getMemberBillS", "res", function(res) {
        // vm.isMember = true;
        vm.shijian1 = vm.res[0].enddate;
      });
    }
  },
  mounted() {
    this.jkpd(); //通过接口判断
  },
  filters: {
    moment
  }
  //点击跳转到会员页面，返回会员信息
};
</script>
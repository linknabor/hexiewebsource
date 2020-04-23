<template>
  <div class="blank">
    {{tiem}}秒后页面跳转
  </div>
</template>

<script>
let vm;
export default {
  data() {
    return {
      tiem: 5,
      flay: 0
    };
  },
  created() {
    vm = this;
  },
  mounted() {
    vm.countDown();
  },
  watch: {
    tiem(na, nw) {
      if (na == 0 && vm.flay == 1) {
        //   alert("交易成功");
        vm.hrefp();
      }
      if (na == 0 && vm.flay == 2) {
        alert("交易失败");
        vm.hrefind();
      }
      if (na == 0 && vm.flay == 0) {
        alert("交易处理中");
        vm.hrefind();
      }
    }
  },
  components: {},

  methods: {
    countDown() {
      var tt = setInterval(() => {
        vm.tiem--;
      }, 1000);
      vm.query();
      var ss = setTimeout(() => {
        clearInterval(tt);
      }, 5000);
    },
    query() {
      let url = "/getCouponsPayWuYe";
      vm.receiveData.getData(vm, url, "res", function() {
        if (vm.res.success) {
          vm.flay = 1;
        } else {
          vm.flay = 2;
        }
      });
    },
    hrefind() {
      var oriapp = vm.common.getoriApp();
      window.location.href =
        vm.basePageUrl + "wuye/index.html?" + oriapp + "#/";
    },
    hrefp() {
      var oriapp = vm.common.getoriApp();
      window.location.href =
        vm.basePageUrl + "wuye/index.html?" + oriapp + "#/paymentquery";
    }
  },

  computed: {}
};
</script>

<style  scoped>
.blank {
  background: #fff;
  position: absolute;
  width: 3rem;
  height: 3rem;
  line-height: 3rem;
  text-align: center;
  border-radius: 3px;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
}

</style>
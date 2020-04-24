<template>
  <div class="addbk">
    <div id="js-alert-box">
      <svg class="alert-circle" width="234" height="234">
        <circle cx="117" cy="117" r="108" fill="#FFF" stroke="#43AEFA" stroke-width="17"></circle>
        <circle
          id="js-sec-circle"
          class="alert-sec-circle"
          cx="117"
          cy="117"
          r="108"
          fill="transparent"
          stroke="#F4F1F1"
          stroke-width="18"
          transform="rotate(-90 117 117)"
        ></circle>
        <!-- <text class="alert-sec-unit " x="82" y="172" fill="#BDBDBD">secs</text> -->
      </svg>
      <div id="js-sec-text" class="alert-sec-text">{{time}}</div>
    </div>
  </div>
</template>

<script>
let vm;
export default {
  data() {
    return {
      time: 5,
      flay: 0,
      tradeWaterId: this.$route.query.tradeWaterId
    };
  },
  created() {
    vm = this;
  },
  mounted() {
    vm.alertSet();
  },
    watch: {
    time(na, nw) {
 
    }
  },  
  components: {},

  methods: {
    alertSet() {
      vm.query();
      document.getElementById("js-alert-box").style.display = "block";
     var n = document.getElementById("js-sec-circle");
       var tt= setInterval(function() {
            if(vm.time  == 0){
                  if (vm.flay == 1) {
                    //   alert("交易成功");
                    // vm.hrefp();
                  }
                  if (vm.flay == 2) {
                    alert("交易失败");
                    // vm.hrefind();
                  }
                  if (vm.flay == 0) {
                    alert("交易处理中");
                    // vm.hrefind();
                  }
                return;
            }
            vm.time--;
            var e = Math.round((vm.time / 5) * 735);
            n.style.strokeDashoffset = e - 735;
        }, 970);
        var ss = setTimeout(function(){clearInterval(tt);}, 6000);
    },
    query() {
      if (!vm.tradeWaterId) {
        return;
      }
      let tw = decodeURI(vm.tradeWaterId);
      let ind = tw.indexOf("?");
      let twid = tw.substring(0, ind);
      let url = "/queryOrder/" + twid;
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
.addbk {
  position: absolute;
  width: 100%;
  height: 100%;
  background: #e6eaeb;
  font-family: Arial, "微软雅黑", "宋体", sans-serif;
}
.alert-circle {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.alert-sec-circle {
  stroke-dashoffset: 0;
  stroke-dasharray: 735;
  transition: stroke-dashoffset 1s linear;
}
.alert-sec-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  width: 76px;
  color: #000;
  font-size: 68px;
}
.alert-sec-unit {
  font-size: 34px;
}
</style>
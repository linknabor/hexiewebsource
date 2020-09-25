<template>
  <div class="manual">
    <div class="content">
      <div class="hander">视频课件</div>
      <ul>
        <li>
          <a
            href="https://work.weixin.qq.com/wework_admin/liveroom/v2/replay?ref=app&roomid=6870373428010123509&version=3.0.26.2604&platform=win" @click="goods($event)"
          >2020.9.10周边优惠卡券核销后台设置</a>
        </li>
        <li>
          <a
            href="https://work.weixin.qq.com/wework_admin/liveroom/v2/replay?ref=app&roomid=6860650472517894365" @click="goods($event)"
          >2020.8.14客户线索的获取和功能大全解析</a>
        </li>
        <li>
          <a
            href="https://work.weixin.qq.com/wework_admin/liveroom/v2/replay?ref=app&roomid=6857690723600629999" @click="goods($event)"
          >2020.8.6签约后进场及POS进件</a>
        </li>
        <li>
          <a
            href="https://work.weixin.qq.com/wework_admin/liveroom/v2/replay?ref=playend&roomid=6857319704323522761" @click="goods($event)"
          >2020.8.5合协社区平台特点</a>
        </li>
        <li>
          <a
            href="https://work.weixin.qq.com/wework_admin/liveroom/v2/replay?ref=app&roomid=6852849373340205276" @click="goods($event)"
          >2020.7.24 收银端产品、社区互动增收</a>
        </li>
        <li>
          <a
            href="https://work.weixin.qq.com/wework_admin/liveroom/v2/replay?ref=playend&roomid=6850361319135477968" @click="goods($event)"
          >2020.7.20 物业费二维码收款</a>
        </li>
        <li>
          <a
            href="https://work.weixin.qq.com/wework_admin/liveroom/v2/replay?ref=playend&roomid=6850361036258410713" @click="goods($event)"
          >2020.7.20 即时到家服务</a>
        </li>
      </ul>
      <div class="hander">物业saas操作视频</div>
      <ul>
        <li class="title">
          <a href="http://v.qq.com/x/page/d3005dhu3al.html" @click="goods($event)">一、账号登录</a>
        </li>
        <li class="title">二、小区楼盘信息初始化</li>
        <li>
          <a href="http://v.qq.com/x/page/s300572ialq.html" @click="goods($event)">1、创建小区登陆账号（限公司账号）</a>
        </li>
        <li>
          <a href="http://v.qq.com/x/page/v30059q0c3h.html" @click="goods($event)">2、新增小区项目信息（限公司账号）</a>
        </li>
        <li>
          <a href="http://v.qq.com/x/page/q30059r0wyb.html" @click="goods($event)">3、维护小区项目信息（限公司账号）</a>
        </li>
        <li>
          <a href="http://v.qq.com/x/page/i30059mqcf8.html" @click="goods($event)">4、楼盘数据初始化导入</a>
        </li>
        <li>
          <a href="http://v.qq.com/x/page/f3005o9oibx.html" @click="goods($event)">5、楼盘数据导入批量撤销（限公司账号）</a>
        </li>

        <li class="title">三、楼盘信息日常维护</li>
        <li>
          <a href="http://v.qq.com/x/page/h3005ayckj8.html" @click="goods($event)">1、新增住户（限小区账号）</a>
        </li>
        <li>
          <a href="http://v.qq.com/x/page/p3005rh7z1u.html" @click="goods($event)">2、编辑修改业主信息（限小区账号）</a>
        </li>
        <li>
          <a href="http://v.qq.com/x/page/l3005pw0fba.html" @click="goods($event)">3、编辑修改房屋信息（限小区账号）</a>
        </li>
        <li>
          <a href="http://v.qq.com/x/page/h3005um218k.html" @click="goods($event)">4、房屋过户（限小区账号）</a>
        </li>

        <li class="title">四、收费规则初始化</li>
        <li>
          <a href="http://v.qq.com/x/page/m3005ungedz.html" @click="goods($event)">1、标准收费规则设置（限公司账号）</a>
        </li>
        <li>
          <a href="http://v.qq.com/x/page/y3005t5nmb1.html" @click="goods($event)">2、单户月单价修改（限小区账号）</a>
        </li>
        <li class="title">五、税控开票信息初始化</li>
        <li>
          <a href="http://v.qq.com/x/page/e30051bm23e.html" @click="goods($event)">1、开票信息管理（限小区账号）</a>
        </li>
        <li>
          <a href="http://v.qq.com/x/page/e30051wncbn.html" @click="goods($event)">2、其他收费项名称配置（限小区账号）</a>
        </li>

        <li class="title">六、日常收款交易操作</li>
        <li>
          1、POS端收费
          <ul>
            <li class="posadd">
              <a href="https://v.qq.com/x/page/c301068bijl.html" @click="goods($event)">1.1物业费收费</a>
            </li>
            <li class="posadd">
              <a href="https://v.qq.com/x/page/y3010emfzmd.html" @click="goods($event)">1.2其他收入</a>
            </li>
            <li class="posadd">
              <a href="https://v.qq.com/x/page/z30104ea8af.html" @click="goods($event)">1.3凭据补打</a>
            </li>
          </ul>
        </li>
        <li>
          <a href="https://v.qq.com/x/page/g3010uxe22u.html" @click="goods($event)">2、PC端收费</a>
        </li>
        <li>
          <a href="https://v.qq.com/x/page/u3010dxczym.html" @click="goods($event)">3、收据打印</a>
        </li>
        <li>4、纸质发票联机打印</li>
        <li>
          <a href="http://v.qq.com/x/page/m3005ev5p9j.html" @click="goods($event)">5、脱机发票信息记录（公司账号）</a>
        </li>
        <li>
          <a href="http://v.qq.com/x/page/w3005kd1e9g.html" @click="goods($event)">6、脱机发票信息记录（小区账号）</a>
        </li>
        <li>7、退款</li>

        <li class="title">七、日常联机交易对账查询及现金管理</li>
        <li>
          <a href="http://v.qq.com/x/page/j3005lcennr.html" @click="goods($event)">1、财务对账（限公司账号）</a>
        </li>
        <li>
          <a href="http://v.qq.com/x/page/e3005tpgq1b.html" @click="goods($event)">2、支付交易明细查询（公司账号）</a>
        </li>
        <li>
          <a href="http://v.qq.com/x/page/o3005gxr2zi.html" @click="goods($event)">3、支付交易明细查询（小区账号）</a>
        </li>
        <li>
          <a href="http://v.qq.com/x/page/v3005253fxa.html" @click="goods($event)">4、现金解款（公司账号）</a>
        </li>
        <li>
          <a href="http://v.qq.com/x/page/v3005ln5hgq.html" @click="goods($event)">5、现金解款（小区账号）</a>
        </li>

        <li class="title">八、财务管理</li>
        <li>
          <a href="http://v.qq.com/x/page/v3005pvkfvb.html" @click="goods($event)">1、收费明细查询及导出（公司账号）</a>
        </li>
        <li>
          <a href="http://v.qq.com/x/page/b300567ky2q.html" @click="goods($event)">2、收费明细查询及导出（小区账号）</a>
        </li>
        <li>
          <a href="http://v.qq.com/x/page/e3005a1w3n1.html" @click="goods($event)">3、脱机交易撤销（公司账号）</a>
        </li>

        <li class="title">九、报表</li>
        <li>
          <a href="http://v.qq.com/x/page/n300579vmqu.html" @click="goods($event)">1、收费汇总统计（公司）</a>
        </li>
        <li>
          <a href="http://v.qq.com/x/page/q3005yu4cym.html" @click="goods($event)">2、收费汇总统计（小区）</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
var vm;
import { MessageBox } from "mint-ui";
export default {
  data() {
    return {
      ruleId: "",
      productType: "",
      coverup: true,
    };
  },
  created() {
    vm = this;
  },
  components: {},
  computed: {},
  mounted() {
    vm.query();
  },
  methods: {
    query() {
        vm.receiveData.getData(vm, "/promotion/partner/checkValidation","res",function () {
            if (vm.res.success) {
                if(vm.res.result == 'success') {
                  vm.coverup = false;
                }
            }else {
              if (vm.res.errorCode != 40001) {
                   vm.getdetail();
              }
            }
          }
        );
    },

    //获取规则id
    getdetail() {
      vm.receiveData.getData(
        vm,
        "/onsales/getPromotion?prodcutType=1003",
        "res",
        function () {
          if (vm.res.success) {
            vm.ruleId = vm.res.result[0].ruleId;
            vm.productType = vm.res.result[0].productType;
          } else {
            if (vm.res.message != null) {
              alert(vm.res.message);
            }
          }
        }
      );
    },
    goods(event) {
      if(vm.coverup) {
        event.preventDefault();
         //判断是否是合伙人或是否到期
        MessageBox.alert('请先成为社区合伙人').then( action =>{
          window.location.href = vm.basePageUrl+'group/onsales.html?'+vm.common.getoriApp()+'#/salesdetail?ruleId='+vm.ruleId+'&productType='+vm.productType;
        })
      }
    }
  },
};
</script>

<style scoped>
.manual {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #fff;
}
.title {
  font-size: 0.4rem;
  padding-left: 0;
  font-weight: 600;
}
a:link {
  color: blue;
}
ul .first {
  font-size: 0.34rem;
  padding-left: 0;
  font-weight: 600;
}
.content {
  padding-top: 0.3rem;
  padding-left: 0.5rem;
}
ul {
  font-size: 0.3rem;
  line-height: 0.7rem;
}

ul li {
  padding-left: 0.3rem;
}
.hander {
  text-align: center;
  font-size: 0.45rem;
  font-weight: 600;
  padding: 0.3rem 0;
}
.posadd {
  padding-left: 0.5rem;
}
</style>

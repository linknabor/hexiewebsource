<template>
  <div class="manual">
    <div class="content">
      <div class="hander">项目流程</div>
      <ul>
        <li class="first">1、营销</li>
        <li>
          <a href="https://www.e-shequ.cn/servplat/flow/1.0营销阶段说明.pdf" @click="goods($event)">1.0营销阶段说明</a>
        </li>
        <li>
          <a
            href="https://www.e-shequ.cn/servplat/flow/1.1产品介绍PPT-收银产品（播放用）.pdf" @click="goods($event)"
          >1.1产品介绍PPT-收银产品（播放用）</a>
        </li>
        <li>
          <a
            href="https://www.e-shequ.cn/servplat/flow/1.2产品介绍PPT-互动产品（播放用）.pdf" @click="goods($event)"
          >1.2产品介绍PPT-互动产品（播放用）</a>
        </li>
        <li>
          <a href="https://www.e-shequ.cn/servplat/flow/1.3营销话术（内部学习）.pdf" @click="goods($event)">1.3营销话术（内部学习）</a>
        </li>
        <li>
          <a href="https://www.e-shequ.cn/servplat/flow/1.4产品演示视频及话术（内部学习）.pdf" @click="goods($event)">1.4产品演示视频及话术（内部学习）</a>
        </li>

        <li class="first">2、签约报备</li>
        <li>
          <a href="https://www.e-shequ.cn/servplat/flow/2.0签约阶段说明（内部学习）.pdf" @click="goods($event)">2.0签约阶段说明（内部学习）</a>
        </li>
        <li>
          <a href="https://www.e-shequ.cn/servplat/flow/2.1客户签约告知书（交客户）.pdf" @click="goods($event)">2.1客户签约告知书（交客户）</a>
        </li>
        <li>
          <a href="https://www.e-shequ.cn/servplat/flow/2.2.1授权许可协议（模板）.pdf" @click="goods($event)">2.2.1授权许可协议（模板）</a>
          <a href="https://pan.baidu.com/s/1lBzGrlKLIVmGs2_S4QpaWg" class="download" @click="goods($event)">下载</a>
        </li>
        <li>
          <a
            href="https://www.e-shequ.cn/servplat/flow/2.2.2POS机具购买补充协议（模板）.pdf" @click="goods($event)"
          >2.2.2POS机具购买补充协议（模板）</a>
          <a href="https://pan.baidu.com/s/1J3YMkpU5-PXDkeXEjCGCpA" class="download" @click="goods($event)">下载</a>
        </li>
        <li>
          <a href="https://www.e-shequ.cn/servplat/flow/2.2.3POS进件材料（模板）.pdf" @click="goods($event)">2.2.3 POS进件材料（模板）</a>
        </li>
        <li>
          <a href="https://www.e-shequ.cn/servplat/flow/2.2.4进场确认表（模板）.pdf" @click="goods($event)">2.2.4进场确认表（模板）</a>
          <a href="https://pan.baidu.com/s/1USjizAcFYoakQiB5OJBABA" class="download" @click="goods($event)">下载</a>
        </li>
        <li>
          <a href="https://www.e-shequ.cn/servplat/flow/2.3.1小区初始化设置确认表（模板）.pdf" @click="goods($event)">2.3.1小区初始化设置确认表（模板）</a>
          <a href="https://pan.baidu.com/s/1MDFwPphy_e3OsP3oG_HnIA" class="download" @click="goods($event)">下载</a>
        </li>
        <li>
          <a href="https://www.e-shequ.cn/servplat/flow/2.3.2小区房屋数据初始化表（模板）.pdf" @click="goods($event)">2.3.2小区房屋数据初始化表（模板）</a>
          <a href="https://pan.baidu.com/s/1e3maC7twMoCm-Ist4iwh2A" class="download" @click="goods($event)">下载</a>
        </li>
        <li>
          <a href="https://www.e-shequ.cn/servplat/flow/2.4用户数据初始化说明手册（交客户）.pdf" @click="goods($event)">2.4用户数据初始化说明手册（交客户）</a>
        </li>

        <li class="first">3、上线</li>
        <li>
          <a href="https://www.e-shequ.cn/servplat/flow/3.0日常客户服务说明.pdf" @click="goods($event)">3.0日常客户服务说明</a>
        </li>
        <li>
          <a href="https://www.e-shequ.cn/servplat/flow/3.1现场部署安装.pdf" @click="goods($event)">3.1现场部署安装</a>
        </li>
        <li>
          <a href="https://www.e-shequ.cn/servplat/flow/3.2账户开通回执单（模板）.pdf" @click="goods($event)">3.2账户开通回执单（模板）</a>
          <a href="https://pan.baidu.com/s/1strdoNKHd_RrY7daKGarRA" class="download" @click="goods($event)">下载</a>
        </li>
        <li>
          <a href="https://www.e-shequ.cn/servplat/flow/3.3交付确认书（模板）.pdf" @click="goods($event)">3.3交付确认书（模板）</a>
          <a href="https://pan.baidu.com/s/1NQK_8ulzCPyhqQBTcopC2Q" class="download" @click="goods($event)">下载</a>
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
.download {
  font-weight: 600;
}
</style>

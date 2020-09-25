<template>
  <div>
    <div class="manual">
      <div class="content">
        <div class="hander">教程</div>
        <ul>
          <li class="title">一、物业SAAS</li>
          <li class="first">物业saas项目介绍</li>
          <li>
            <a href="https://www.e-shequ.cn/servplat/course/物业saas软件产品介绍-收银产品.pdf" @click="goods($event)">物业saas软件产品介绍-收银产品</a>
          </li>
          <li>
            <a href="https://www.e-shequ.cn/servplat/course/物业saas软件产品介绍-互动产品.pdf" @click="goods($event)">物业saas软件产品介绍-互动产品</a>
          </li>

          <li class="first">物业saas销售</li>
          <li>
            <a href="https://www.e-shequ.cn/servplat/course/现场销售基本过程.pdf" @click="goods($event)">现场销售基本过程</a>
          </li>
          <li>
            <a href="https://www.e-shequ.cn/servplat/course/现场销售注意事项.pdf" @click="goods($event)">现场销售注意事项</a>
          </li>
          <li>
            <a href="https://www.e-shequ.cn/servplat/course/不同客户类型及产品应对策略.pdf" @click="goods($event)">不同客户类型及产品应对策略</a>
          </li>
          <li>
            <a href="https://www.e-shequ.cn/servplat/course/产品报价说明及策略.pdf" @click="goods($event)">产品报价说明及策略</a>
          </li>
          <li>
            <a href="https://www.e-shequ.cn/servplat/course/现场销售常见问题解答.pdf" @click="goods($event)">现场销售常见问题解答</a>
          </li>
          <li>
            <a href="https://www.e-shequ.cn/servplat/course/合协社区产品特色.pdf" @click="goods($event)">合协社区产品特色</a>
          </li>

          <li class="first">操作指南</li>
          <li>
            <a
              href="https://www.e-shequ.cn/servplat/course/产品使用手册-商户系统端 （交客户）.pdf" @click="goods($event)"
            >产品使用手册-商户系统端 （交客户）</a>
          </li>
          <li>
            <a href="https://www.e-shequ.cn/servplat/course/产品使用手册-POS端（交客户）.pdf" @click="goods($event)">产品使用手册-POS端（交客户）</a>
          </li>
          <li>
            <a href="https://www.e-shequ.cn/servplat/course/产品使用手册-公众号端（交客户）.pdf" @click="goods($event)">产品使用手册-公众号端（交客户）</a>
          </li>
          <li>
            <a href="https://www.e-shequ.cn/servplat/course/二维码收款操作手册.pdf" @click="goods($event)">二维码收款操作手册</a>
          </li>
          <li>
            <a href="https://www.e-shequ.cn/servplat/course/物业费二维码收款操作手册.pdf" @click="goods($event)">物业费二维码收款操作手册</a>
          </li>
          <li>
            <a href="https://www.e-shequ.cn/servplat/course/产品使用常见问题FAQ.pdf" @click="goods($event)">产品使用常见问题FAQ</a>
          </li>
        </ul>

        <ul>
          <li class="title">二、社区服务</li>
          <li class="first">社区合伙人落地运营</li>
          <li class="first">商户（供应商）</li>
          <li>
            <a href="https://www.e-shequ.cn/servplat/course/如何获客.pdf" @click="goods($event)">如何获客</a>
          </li>
          <li>
            <a href="https://www.e-shequ.cn/servplat/course/如何谈判.pdf" @click="goods($event)">如何谈判</a>
          </li>
          <li>如何上架</li>
          <li class="first">用户</li>
          <li>
            <a href="https://www.e-shequ.cn/servplat/course/如何拉新.pdf" @click="goods($event)">如何拉新</a>
          </li>
          <li>
            <a href="https://www.e-shequ.cn/servplat/course/如何运营.pdf" @click="goods($event)">如何运营</a>
          </li>
          <li>售后服务</li>
          <li class="first">操作指南</li>
          <li class="first">
            <a href="https://www.e-shequ.cn/servplat/course/周边优惠操作手册.pdf" @click="goods($event)">周边优惠操作手册</a>
          </li>
          <li class="first">
            <a href="https://www.e-shequ.cn/servplat/course/周边服务操作手册.pdf" @click="goods($event)">周边服务操作手册</a>
          </li>
        </ul>
      </div>
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
    // vm.initSession4Test();
    vm.query();
  },
  methods: {
    initSession4Test(){
          let url = '/initSession4Test/46';
              vm.receiveData.getData(vm,url,'Data',function(){
          });
    },
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
  z-index: 999;
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
</style>

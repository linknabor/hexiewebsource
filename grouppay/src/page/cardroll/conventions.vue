<template>
    <div class="agess">
      <div class="header">
      <div class="title">
        <span>用户服务须知</span>
      </div>
      <div>
        <div>
          <p class="tits">
            欢迎您阅读上海奈博信息科技有限公司发布的“用户服务须知”，本须知是关于您（下称“用户”、“您”）在使用“合协社区”平台时，
            约定您与上海奈博信息科技有限公司之间的权利义务关系的说明。自您完成注册开通时成立并生效。
          </p>
        </div>
      </div>
      <div>
        <div>
          <p class="tit">一．服务内容</p>
        </div>
        <div class="text">
          <p>1.“合协社区”是上海奈博信息科技有限公司旗下的一款网络电商平台，用户可以在平台上发布商品进行销售。</p>
          <p>2.用户按照开通页面填写信息并完成所有开通程序后，即可获得“合协社区”后台账户，用户可以在账户中上架销售商品等各项功能。</p>
          <p>
            3.用户理解并同意“合协社区”及上海奈博信息科技有限公司提供的各项服务，用户在开通后即可通过相应的后台账户直接使用“合协社区”及上海奈博信息科技有限公司提供的各项服务。
            确切不可撤销的同意：
          </p>
          <p>(1)用户以任何方式使用“合协社区”的相关服务，即表示用户已充分阅读、理解并同意接受相应的服务；</p>
          <p>(2)用户以任何方式使用“合协社区”的相关服务，即表示用户已授权将用户相关信息披露给上海奈博信息科技有限公司授权使用；</p>
        </div>
      </div>

      <div>
        <div>
          <p class="tit">二．知识产权</p>
        </div>
        <div class="text">
          <p>1.上海奈博信息科技有限公司对“合协社区”拥有的著作权、商标权、商业秘密以及其他相关的知识产权，包括但不限于各种文档资料、软件、商标、FLASH、设计、图案、音像、摄影、动画、美术等，及其它未经提及的知识产权均由上海奈博信息科技有限公司享有。</p>
          <p>2.未经上海奈博信息科技有限公司书面同意，用户不得以任何营利性或非营利性的目的自行实施、利用、转让或许可任何第三方实施、利用转让上述知识产权。</p>
        </div>
      </div>

      <div>
        <div>
          <p class="tit">三．免责声明</p>
        </div>
        <div class="text">
          <p>合协社区”是基于互联网为用户提供服务的，互联网的不稳定性与第三方行为的不可控性给互联网服务埋下了各种隐患，故在下述情况发生时，上海奈博信息科技有限公司应免除相应的责任：</p>
          <p>1.鉴于目前的技术条件上海奈博信息科技有限公司不保证用户在使用“合协社区”时在操作上不会中断或没有错误，不保证会纠正“合协社区”所有缺陷，亦不保证“合协社区”能满足用户的所有要求。</p>
          <p>2.“合协社区”不担保其所提供的服务一定能满足用户的要求，对网络服务的及时性、安全性、准确性也都不作担保。</p>
          <p>3.用户明确同意其使用“合协社区”所存在的风险将安全由其自己承担；因其使用本服务而产生的一切后果也由其自己承担，上海奈博信息科技有限公司不对用户承担任何责任。</p>
          <p>4.用户在此同意上海奈博信息科技有限公司在任何情况下都无需向用户或任何第三方在使用“合协社区”时在传输或联络中的延迟、不准确性、错误或疏漏及因此而致使的损害负责。</p>
          <p>5.用户了解并确认“合协社区”中可能包含由第三方提供的服务，“合协社区”只是为了用户的便利而提供功能模块，上海奈博信息科技有限公司对第三方的服务不提供任何形式的保证。包括：上海奈博信息科技有限公司不担保服务一定能满足用户的要求，不担保服务不会中断，及对服务的及时性、安全性、出错或文件丢失的发生，不承担任何赔偿责任；用户自行承担全部风险。</p>
        </div>
      </div>
    </div>
      <div class="fonter">
        <span class="fl spleft" @click="disagree">不同意</span>
        <span class="fr" @click="addagree">同意</span>
     </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      
    };
  },
  created() {},
  components: {},
  computed: {},
  mounted() {},
  methods: {
    disagree() {
      var dis = { name:'sale', agr:false, }
      this.$emit('fromChild', dis)
    },
    addagree() {
      var add = { name:'sale', agr:true, }
      this.$emit('fromChild', add)
    }
  },
};
</script>

<style scoped>
.agess {
  width: 90%;
  height: 70%;
  margin-top: 19%;
  position: absolute;
  overflow: scroll;
  background-color: #fff;
  border-radius: 0.3rem;
}
.header {
    overflow: scroll;
    width: 100%;
    height: 90%;
    padding-top: 5%;
    padding-bottom: 2%;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}
.title {
  text-align: center;
  font-size: 0.5rem;
  font-weight: 600;
}
.tits {
    font-size: 0.42rem;
    margin: 0.4rem 0.15rem;
}
.tit {
  font-size: 0.42rem;
  margin: 0.1rem 0;
}
.number {
  margin-left: 0.3rem;
}
.text {
  line-height: 0.6rem;
  font-size: 0.35rem;
  padding-right: 3%;
}
.text p {
  padding-left: 0.4rem;
  text-indent: 2em;
}
.fonter {
    overflow: hidden;
    border: 1px solid #F08500;
    border-radius: 0.3rem;
    position: absolute;
    bottom: 0;
    width: 100%;
    box-sizing: border-box;
}
.fonter span{
    display: inline-block;
    width:50%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    letter-spacing: 2px;
    background-color: #F08500;
    color: #fff;
}
.fonter .spleft {
   background-color: #fff;
   color:#000;
}
</style>

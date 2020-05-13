<template>
  <div>
    <div class="top">
      <div >
        <img src="../assets/images/qie/hui.png" alt>
      </div>
       <div class="mint">
          <span>会员特权</span>
       </div>
       <div >
           <ul>
               <li style="margin-bottom:0.15rem;">业主缴费送积分，在线支付物业费1元
                   <i class="mint-i1 mint-i"></i>
               </li>
               <li>即可获得1积分
               </li>
               <li>积分获取仅支持公众号内缴费
                   <i class="mint-i"></i>
               </li>
               <li>现金缴费暂不支持
                   <i class="mint-i"></i>
               </li>
           </ul>
       </div>
    </div>
        <div class="btn-fixed">
            <div class="pay" @click="pays()">
                立即领取
            </div>
        </div>
  </div>
</template>

<script>
let vm;
export default {
  data() {
    return {};
  },
  beforeCreate(){window.document.body.style.background="#fff"},
  created() {
    vm = this;
  },
  mounted() {

  },
  beforeDestroy(){window.document.body.style.background="#fffff8"},

  methods: {
    pays(){
        vm.receiveData.getData(vm,"/card/activateUrlOnMenu?oriApp="+vm.getUrlParam('oriApp'),'res',function(){
            if(vm.res.success) {                
                    location.href=vm.res.result;
            }else {
                   alert(vm.res.message);  
            }
               
        });     
    }
  },

  computed: {}
};
</script>

<style  scoped>
.top {
  padding: 0.2rem 0.3rem 0 0.3rem;
  margin-bottom: 1.5rem;
}
.mint {
  width: 100%;
  height: 0.03rem;
  margin: 0.6rem 0;
  text-align: center;
  background-color: #ffb040;
}
.mint span {
  position: relative;
  bottom: 0.2rem;
  padding: 0 0.5rem;
  font-size: 0.35rem;
  color: #000;
  background-color: #fff;
  letter-spacing: 0.05rem;
  font-weight: 500;
}
li {
    font-size:0.28rem;
    font-family: '微软雅黑';
    padding-left:0.35rem;
    margin-bottom: 0.6rem;
    letter-spacing: 0.01rem;
    position: relative;
    font-weight: lighter; 
    color:#0f0f0f;
}
li:last-child {
    margin-bottom:0;
}
.mint-i {
    width: 0.1rem;
    height: 0.1rem;
    border-radius: 0.05rem;;
    background-color:#949494;
    position: absolute;
    left: 0;
    top:0.1rem;
}
.mint-i1 {
    top:0.34rem;
}
.btn-fixed {
 /* margin-bottom:1rem; */
}
.pay {
  text-align: center;
  position: fixed;
  bottom:0.5rem;
  font-size: 0.35rem;
  width: 80%;
  overflow:hidden;
  background-size: 310px;
  background:url("../assets/images/common/paymoney.png") no-repeat;
  background-position: -11px center;
    line-height: 0.8rem;
    border-radius: 0.4rem;
    margin-top: .05rem;
    margin:0;
    margin-left: 10%;
    color:#fff;
    letter-spacing: 0.05rem;  
}
</style>
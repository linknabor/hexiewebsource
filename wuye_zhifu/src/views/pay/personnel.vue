<template>
   <div>
       <div class="title">三林宛</div>
       <div class="contemt">
           <img src="../../assets/image/qrcode_for_gh_6892dbdf5ffc_258.jpg" alt="">
       </div>
       <div class="contant">
           <span>商品房物业管理费</span><br>
           <span>2020年1月-2020年3月</span>
       </div>
       <div class="fonter">
           <span>支付金额:1000</span>
       </div>
   </div>
</template>

<script>
let vm;
export default {
   data () {
       return {
       };
   },
   created() {
       vm = this;
   },
   mounted() {},

   components: {},

   methods: {},

   computed: {},
}
</script>

<style  scoped>
.title {
    margin-top: 1rem;
    margin-bottom: 0.4rem;
    text-align: center;
    font-size: 0.5rem;
    letter-spacing: 2px;
}
.contemt {
    margin:0 20% 0.3rem 20%;
}
img {
    width: 100%;
}
.contant {
    margin:0 20% 0.4rem 20%;
}
.contant span {
    display: inline-block;
    font-size: 0.3rem;
    line-height: 0.45rem;
}
.fonter {
    text-align: center;
    font-size: 0.35rem;
}
</style>
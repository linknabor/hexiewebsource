<template>
   <div>
       <div class="content">
           <div class="fl order-left">
               <img src="../../assets/images/img/btn1.png" alt="">
           </div>
           <div class="fl order-main">
               <span>演示小区-停车费</span><br>
               <span>2019-2-19 15:30: 46</span><br>
               <span class="last">备注：沪A88688</span>
           </div>
           <div class="fr order-right">
               <span class="r-top">10.00</span><br>
               <span class="r-bot">微信公众号</span>
           </div>
       </div>
   </div>
</template>

<script>
export default {
   data () {
       return {
       };
   },
   mounted() {},

   components: {},

   methods: {},

   computed: {},
}
</script>

<style  scoped>
.content {
 overflow: hidden;
 border-bottom:1px solid #ccc;
 padding:0.25rem 0.2rem 0.25rem 0.25rem;
}
.order-left {
    width: 60px;
    height: 60px;
    margin-right: 0.2rem;
    padding: 3%;
}
.order-left img {
    width: 100%;
}
.order-main {
    text-align: left;
    font-size: 0.3rem;
}
.order-main span {
    display: inline-block;
    margin-bottom: 0.2rem;
}
.order-main .last {
    margin-bottom: 0;
}
.order-right .r-top{
    display:inline-block;
    font-size:0.5rem;
    margin-top:0.2rem;
    margin-bottom: 0.31rem;
}
.order-right .r-bot {
    font-size: 0.3rem;
}
</style>
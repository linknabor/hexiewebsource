<template>
   <div class="delivery">
       <div class="cent">
           <div class="hands" v-for="item in content" :key="item.id">
               <div class="top">
                   <span  class="toptest">{{item.date_time}}</span >
               </div>
               <div class="bott">
                   <div class="btext1" v-show="item.type=='0'">
                       快递
                   </div>
                   <div class="btext1" v-show="item.type=='1'">
                       外卖
                   </div>
                   <div class="btext2">
                       <span>{{item.sect_name}}</span>
                       <span>{{item.cell_addr}}</span>
                   </div>
               </div>
           </div>
       </div>
   </div>
</template>

<script>
let vm;
import cookie  from 'js-cookie';
export default {
   data () {
       return {
           content:[],
       };
   },
   created(){
       vm=this;
   },
   mounted() {
       vm.query();
   },

   components: {},

   methods: {
       query(){         
            let userId=vm.$route.query.userId || cookie.get('userId')
            let url="/servplat/express/getExpress?userId="+userId;
            vm.receiveData.postData(vm,url,null,'res',function(){
                if(vm.res.success) {
                    vm.content=vm.res.result;
                }else {
                        alert(vm.res.messages==null?'获取数据失败':vm.res.messages);
                }
            })
       }
   },

   computed: {},
}
</script>

<style  scoped>
.delivery {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #F5F5F5;;
    overflow:auto;
}
.cent {
    padding:0.3rem 0.5rem  0 0.5rem;
}
.hands {
    background: #fff;
    border-radius: 0.16rem;
    padding:0.2rem 0.4rem;
    box-shadow: 2px 2px 7px -3px #675eb2;
    margin-bottom:0.4rem;
}
.top {
    margin-bottom: 0.3rem;
    text-align: center
}
.toptest {
    font-size:0.3rem;
    color:#979797;
}

.bott {
    /* height: 0.8rem; */
}
.btext1 {
    /* height:0.4rem; */
    line-height: 0.4rem; 
    font-size: 0.3rem;
    font-family: PingFangSC-Semibold, sans-serif;
    font-weight: 600;
    color:#ff7e00;
}
.btext2 {
    /* height:0.4rem; */
    line-height: 0.4rem; 
    font-size: 0.26rem;
    font-family: PingFangSC-Thin, sans-serif;
    color:#202020;
}
</style>
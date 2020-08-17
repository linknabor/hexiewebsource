<template>
   <div>
       <div id="divwuye" @scroll="getscroll">

            <div class="content" v-for="(item,index) in orders" :key="index">
                <div class="fl order-left">
                    <img src="../../assets/images/common/money.png" alt="">
                </div>
                <div class="fl order-main">
                    <span>{{item.sect_name+'-'+item.fee_name}}</span><br>
                    <span>{{item.acct_date}}</span><br>
                    <span class="last">备注: {{item.remark}}</span>
                </div>
                <div class="fl order-right">
                    <span class="r-top">{{item.tran_amt}}</span><br>
                    <span class="r-bot">{{item.pay_method}}</span>
                </div>
            </div>
        </div>
        <div id="phoneAjax" class="hidden" v-show="hidden">
			<img src="../../assets/images/common/c3d7f369-4a5e-4c4a-9fb9-a4b9d274c7e1.gif" style="width:40px;height40px;vertical-align: middle;">
		</div>
   </div>
</template>

<script>
let vm;
let isloadPage=false;
export default {
   data () {
       return {
           orders:[],
           params:{
                sectId:this.$route.query.sectId,
                feeId:this.$route.query.feeId,
                currentPage: 1, //页码
                totalCount: 0 //第几条开始
           },
           page:1,//分页
           hidden:false,
       };
   },
   created(){
       vm = this;
   },
   mounted() {
       vm.query();
   },

   components: {},

   methods: {
       query(){
            vm.receiveData.postData(vm, "/customService/order/queryByFeeType",vm.params, "res", function() {
                if (vm.res.success) {
                  vm.orders = vm.res.result.orders;
                  vm.page+=1;
                } else {
                  alert(vm.res.message);
                }
            })
       },
       getscroll(e) {
           var st = e.srcElement.scrollTop;
           var ad = window.innerHeight;
           if(st + ad > 800 && !isloadPage) {
            isloadPage = true;
            vm.hidden=true;
            vm.params.currentPage = vm.page;
            vm.receiveData.postData(vm, "/customService/order/queryByFeeType",vm.params, "res", function() {
                if (vm.res.success) {
                    if(vm.res.result.orders == null ||vm.res.result.orders.length == 0) {
                        vm.hidden = false;
                    }else {
                        vm.orders =vm.orders.concat(vm.res.result.orders);
                        vm.hidden = false;
                        isloadPage = false;
                        vm.page+=1;
                    }
                } else {
                    vm.hidden=false;
                    alert(vm.res.message);
                }
                })
           }
       }
   },

   computed: {},
}
</script>

<style  scoped>
#divwuye {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: auto;
}
#phoneAjax {
    position: fixed;
    top: 20%;
    left: 50%;
    width: 60px;
    height: 60px;
    line-height: 60px;
    margin-left: -30px;
    text-align: center;
    background-color: black;
    -moz-opacity: .8;
    opacity: .80;
    filter: alpha(opacity=80);
    z-index: 1998;
    overflow: auto;
    -moz-border-radius: 15px;
    -webkit-border-radius: 15px;
}
.content {
 overflow: hidden;
 border-bottom:1px solid #ccc;
 padding:0.25rem 0.2rem 0.25rem 0.25rem;
}
.order-left {
    width: 20%;
    height: 20%;
    margin-right: 0.1rem;
    padding: 1.5%;
}
.order-right {
    padding-top: 1.5%;
    width: 21%;
    text-align: center;
}
.order-left img {
    width: 60px;
}
.order-main {
    text-align: left;
    font-size: 0.28rem;
    padding-top: 1.5%;
    width: 52%;
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
    font-size:0.48rem;
    margin-top:0.2rem;
    margin-bottom: 0.31rem;
    /* padding-left: 0.2rem; */
}
.order-right .r-bot {
    font-size: 0.3rem;
}
</style>
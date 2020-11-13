<template>
    <div class="coupons" @scroll="getscroll">
        <div class="content">
            <div class="head">
                失效优惠券
            </div>
            <div class="coupon ov"  v-for="item in coupons" :key="item.id" > 
                <div class="fl coupon-left ">
                    <div class="tSemicircle"></div>
                    <div class="fl number ">
                        <span class="rmb">¥</span>
                        <span class="f48">{{item.amount}}</span><br>
                        <div class="text2">
                            <span class="text3 mg1">满</span><span class="text3 mg1" v-show="item.usageCondition ==0">任意金额可用</span><span class="text3 mg1" v-show="item.usageCondition !=0">{{item.usageCondition}}可用</span>   
                        </div>
                    </div>
                    <div class="ov describe">
                        <span class="text1 ">{{item.title}}</span>
                        <span class="text3 describe-h ellipsis2">{{item.couponDesc}}</span>
                        <span class="text3">{{item.useStartDateStr}}-{{item.useEndDateStr}}</span>
                    </div>
                    <div class="bSemicircle"></div>
                </div>
                <div class="fl coupon-right" v-show="item.status == 3">
                   <div class="iconimg">
                       <span>{{item.leftDayDes}}</span>
                   </div>
                </div> 
                <div class="fl coupon-right" v-show="item.status == 2">
                   <div class="iconimg">
                       <span>{{item.leftDayDes}}</span>
                   </div>
                </div> 
               </div>
               	<div id="phoneAjax" class="hidden" v-show="loing">
                    <img src="../../assets/images/img/c3d7f369-4a5e-4c4a-9fb9-a4b9d274c7e1.gif" style="width:40px;height40px;vertical-align: middle;">
                </div>
        </div>
    </div>    
</template>

<script>
let vm;
let hasNext=true,isloadPage=false;
export default {
    name:'invalid',
    data() {
        return {
            coupons:[],
            page:0,
            loing:false,
        };
    },
  
    created() {      
        vm = this;
    },
    components: {

    },
    computed: {

    },
    mounted() {
      vm.invalidcoupon();
    },
    methods: {
        invalidcoupon(){
           vm.receiveData.getData(vm,'/invalidCoupons/'+vm.page,'res',function(){
                if(vm.res.success){
                    vm.coupons = vm.res.result;
                    vm.page++;
                }else {
                    alert(vm.res.message)
                }
           })     
        },
        //分页
        getscroll(e) {
            var st = e.srcElement.scrollTop;
            let loadheight = $(".content").height();
            var hook=loadheight-st;
            if(hook<800&&hasNext&&!isloadPage){
                isloadPage = true;
                vm.loing = true;
             vm.loadNextPage();
            }         
        },
        loadNextPage(){
             vm.receiveData.getData(vm,'/invalidCoupons/'+vm.page,'res',function(){
                if(vm.res.success){
                     if(vm.res.result==null||vm.res.result.length==0) {
                        vm.loing=false;
                        hasNext=false;
                     }else {
                        vm.coupons = vm.coupons.concat(vm.res.result);
                        vm.page++;
                        isloadPage = false;
                        vm.loing=false;
                     }
                }else {
                    alert(vm.res.message)
                }
           }) 
        }
    }
};
</script>

<style scoped>
.coupons {
    position:absolute;
    top:0;
    left:0;
    right: 0;
    bottom:0;
    background-color:#F5F5F5;
    overflow: auto;
}
.content {
    padding:2%;
    background-color:#F5F5F5;
}
.head {
    font-size:0.26rem;
    text-align: left;
    font-family: 'PingFangSC-bold';
    margin-bottom: 0.2rem;
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
.coupon {
    width:100%;
    height:1.6rem;
    background-color:#fff;
    margin-bottom:4%;
    border-radius: 0.1rem;
}
.coupon-left {
    width:75%;
    height: 100%;
    position: relative;
    padding-right: 0.2rem;
    border-right: 1px dashed #BBBBBB;
    box-sizing: border-box;
}
.coupon-right {
    width:25%;
    height: 100%;
    position: relative;
}

.number {
    width: 45%;
    height: 1.6rem;
    padding-top: 0.4rem;
    text-align: center;
    color:#C8C4C4;
    box-sizing: border-box;
}
.rmb {
    font-size:0.24rem;
}
.f48 {
    font-size:0.6rem;
    font-weight: 600;
}
.tSemicircle {
    width: 0.4rem;
    height: 0.4rem;
    background-color: #F5F5F5;
    border-radius: 50%;
    position: absolute;
    top: -0.2rem;
    right: -0.2rem;
    z-index: 999;
}
.bSemicircle {
    width: 0.4rem;
    height: 0.4rem;
    background-color: #F5F5F5;
    border-radius: 50%;
    position: absolute;
    bottom: -0.2rem;
    right: -0.2rem;
    z-index: 999;
}
.describe {
    height: 100%;
    color:#C8C4C4;
}
.describe span{
    display:block;
    margin-top:0.16rem;
}
.text1 {
    font-size: 0.33rem;
}
.text2 {
    font-size: 0.22rem;
    margin-top: 0.2rem;
    display: inline-block;
}
.describe .text3 {
    font-size: 0.2rem;
}
.describe .ellipsis2 {
    display: -webkit-box;
    display: -moz-box;
    text-overflow: -o-ellipsis-lastline;
    text-overflow: ellipsis;
    overflow: hidden;
    -webkit-line-clamp: 2; /*控制文本行数，多少行以后开始省略号 */
    line-clamp: 2;
    -webkit-box-orient: vertical;
}
.describe-h {
    height: 0.45rem;
}
.getcoupons .Received-l {
    color:#C8C4C4;
}
.getcoupons .Received-r{
    background-color:#C8C4C4;
}
.iconimg {
    width: 1rem;
    height: 1rem;
    line-height: 1rem;
    border:2px solid #C8C4C4;
    border-radius: 50%;
    position:absolute;
    top:50%;
    left:50%;
    text-align: center;
    transform: translate(-50%,-50%);
    box-sizing: border-box;
}
.iconimg span {
    display: inline-block;
    transform: rotate(45deg);
    color:#C8C4C4;
}
</style>

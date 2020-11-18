<template>
    <div class="coupons">
        <div class="content">
            <div class="head">
                可用优惠券
            </div>
            <div class="coupon ov" v-for="item in coupons" :key="item.id" >
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
                <div class="fl coupon-right" @click="apply(item)">
                    <span>立即</span><br>
                    <span>使用</span>
                </div>
            </div>
            <div class="invalid" @click="invalid()">
                查看失效的优惠券 >
            </div>
        </div>
    </div>
</template>

<script>
let vm;
export default {
    name:'coupon',
    data() {
        return {
           coupons:{},
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
        vm.queryCoupon();
    },
    methods: {
        queryCoupon() {
            var couponList = vm.$route.params.couponList;
            // console.log(1,couponList,couponList!=null);
            vm.receiveData.getData(vm,'/couponSummary','res',function(){
                if(vm.res.success) {
                    if(vm.res.result.validCoupons !=null){
                         vm.coupons = vm.res.result.validCoupons;
                    }
                }else {
                    alert(vm.res.message);  
                }
            });  
        },
        apply(item) {
            window.location.href = item.suggestUrl;
        },
        //查看失效优惠券
        invalid() {
            vm.$router.push({path:'/invalidcoupon'});
        },
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
.coupon {
    width:100%;
    height:1.6rem;
    background-color:#fff;
    margin-bottom: 4%;
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
    background-color:#F08500;
    color:#fff;
    padding-left: 0.2rem;
    box-sizing: border-box;
    font-size: 0.33rem;
    text-align: center;
    letter-spacing: 0.04rem;
}
.coupon-right span {
    display: inline-block;
    margin-top:0.25rem;
}
.number {
    width: 45%;
    height: 1.6rem;
    padding-top: 0.4rem;
    text-align: center;
    color:#F08500;
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
}
.describe span{
    display:block;
    margin-top:0.16rem;
}
.text1 {
    font-size: 0.33rem;
    color: #F08500;
}
.text2  span{
    font-size: 0.22rem;
    color: #101010;
    margin-top: 0.18rem;
    display: inline-block;
}
.describe .text3 {
    font-size: 0.2rem;
}
.describe-h {
    height: 0.45rem;
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
.getcoupons .Received-l {
    color:#E8E8E8;
}
.getcoupons .Received-r{
    background-color:#E8E8E8;
}
.invalid {
    text-align: center;
    margin-top: 0.8rem;
    color: #C8C4C4;
}
</style>

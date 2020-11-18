<template>
    <div class="coupons">
        <div class="content">
            <div class="head">
                可有优惠券
            </div>
            <div class="coupon ov" v-for="item in coupons" :key="item.id"  @click="apply(item)">
                <div class="fl coupon-right">
                    <span class="f48">{{item.amount}}</span><br>
                    <span class="text3 mg1">满{{item.usageCondition}}金额可用</span>
                </div>
                <div class="fl coupon-left ">
                     <i class="icon_se " :class="{icon_seactive:item.id==couponid}"></i>
                    <div class="tSemicircle"></div>
                    <div class="ov describe">
                        <span class="text1">{{item.title}}</span>
                        <span class="text3 describe-h ellipsis2">{{item.couponDesc}}</span>
                        <span class="text3">{{item.useStartDateStr}}-{{item.useEndDateStr}}</span>
                    </div>
                    <div class="bSemicircle"></div>
                </div>
                
            </div>
        </div>
        <div class="btn_area" @click="determine()">
                <div class="more_btn" >确定</div>
        </div>
    </div>
</template>

<script>
let vm;
export default {
    name:'coupon',
    data() {
        return {
          coupons:this.$route.params.coupons,
          type:this.$route.query.type,
          ruleId:this.$route.query.ruleId,
          couponid:this.$route.query.couponid,
          count:this.$route.query.count,
          totalAmount:this.$route.query.totalAmount
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
        // 优惠券
        queryCoupon() {
            var data = {
                salePlanType:vm.type,
                itemList: [
                    {
                        ruleId:vm.ruleId,
                        count:vm.count
                    }
                ]
            }
            vm.receiveData.postData(vm,'/coupon/valid',data,'res',function() {
               if(vm.res.success) {
                  if(vm.res.result != null) {
                      vm.coupons=vm.res.result;
                      vm.couponNum=vm.coupons.length;//可有优惠券数量
                      vm.computeAmount();
                  }
               }else {
                   alert(vm.res.message);
               }
           
            })
            
        },
        //使用优惠券
        apply(item) {
           if(vm.couponid != item.id) {
              vm.couponid = item.id;
           }else {
               vm.couponid = '';
           }     
        },
        //使用优惠券
        determine() {
           vm.$router.push({path:'/buy',name:'buy',query:{type:vm.type,ruleId:vm.ruleId,counts:vm.count,totalprice:vm.totalAmount,couponid:vm.couponid,suspend:1}});
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
    padding-bottom: 65px;
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
    width:70%;
    height: 100%;
    position: relative;
    padding-left: 0.4rem;
    border-left: 1px dashed #BBBBBB;
    box-sizing: border-box;
}
.coupon-right {
    width:30%;
    height: 100%;
    background-color:#F08500;
    color:#fff;
    padding-right: 0.2rem;
    box-sizing: border-box;
    font-size: 0.33rem;
    text-align: center;
    letter-spacing: 0.04rem;
}
.coupon-right span {
    display: inline-block;
    margin-top:0.17rem;
}

.f48 {
    font-size:0.8rem;
}
.tSemicircle {
    width: 0.4rem;
    height: 0.4rem;
    background-color: #F5F5F5;
    border-radius: 50%;
    position: absolute;
    top: -0.2rem;
    left: -0.2rem;
    z-index: 999;
}
.bSemicircle {
    width: 0.4rem;
    height: 0.4rem;
    background-color: #F5F5F5;
    border-radius: 50%;
    position: absolute;
    bottom: -0.2rem;
    left: -0.2rem;
    z-index: 999;
}
.describe {
    height: 100%;
    padding-right: 0.6rem;
}
.describe span{
    display:block;
    margin-top:0.16rem;
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
.coupon-right .mg1 {
    margin-top: 0.19rem;;
}
.text1 {
    font-size: 0.33rem;
    color: #F08500;
}
.text2 {
    font-size: 0.26rem;
    color:#101010;
}
.text3 {
    font-size: 0.2rem;
    /* margin-top: 0.45rem; */
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
.icon_se {
    background: url(../../assets/images/img/icon_select.png) no-repeat;
    background-size: 20px;
    width: 0.5rem;
    height: 0.5rem;
    z-index: 999;
    position: absolute;
    top: 50%;
    right:0.05rem;
    transform: translateY(-50%);
}
.coupon-left .icon_seactive {
    background: url(../../assets/images/img/icon_selectted.png) no-repeat;
    background-size: 20px;
}

.btn_area {
    text-align: center;
    width: 100%;
    position: fixed;
    bottom: 5px;
    z-index:9999;
    margin-bottom: 8px;
}
.more_btn {
    margin: 0 2%;
    height: 44px;
    line-height: 44px;
    color: white;
    background: #ff8a00;
    font-size: 20px;
    border-radius: 6px;
}
</style>

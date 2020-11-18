<template>
    <div class="specialdetail">
        <div>
            <div class="addr">
                <div class="ov heig37">
                    <span class="fl"><i class="iconfont icon-loc-s"></i>收货人：{{order.receiverName}}</span>
                    <span class="fr">{{order.tel}}</span>
                </div>
                <div>
                    <span class="cor99">收货地址   {{order.address}}</span>
                </div>
            </div>
            <div class="content">
                <div class="list">
                    <div ><span>商品列表</span></div>
                </div>
                <div class="wares">
                    <div class="padd15" v-for="(item,i) in cartlist" :key="i">
                        <span>{{item.ruleName}}</span><br>
                        <span class="color">¥ {{item.price}}</span><span class="fs12"></span>
                        <span class="counts fr">×{{item.count}}</span>
                    </div>
                </div>
                <div class="Statistics">
                    <div ><span>共计{{totalCount}}件商品</span></div>
                </div>
                <div class="money">
                    <div class="ov">
                        <span class="fl">商品总价</span><span class="fr">¥{{totalAmount}}</span>
                    </div>
                    <div class="ov">
                        <span class="fl">运费</span><span class="fr">¥{{shipFee}}</span>
                    </div>
                    <div class="ov" v-show="couponAmount!=null">
                        <span class="fl">优惠券</span><span class="fr">-¥{{couponAmount}}</span>
                    </div>
                    <div class="ov fs18">
                        <span class="fl">实付金额</span><span class="fr color2">¥{{price}}</span>
                    </div>
                </div>
                <div class="status">
                    <span class="fl">订单状态</span><span class="fr color2">{{order.statusStr}}</span>
                </div>
                <div class="foter" v-show="order.status == 5">
                    <div class="title">
                        <span>物流信息</span>
                    </div>
                    <div class="express ">
                        <div class="ov">
                            <span class="fl">快递公司</span><span class="fr">{{order.logisticName}}</span>
                        </div>
                        <div class="ov">
                            <span class="fl">快递单号</span><span class="fr">{{order.logisticNo}}</span>
                        </div>
                    </div>    
                </div>
            </div>
        </div>
        <div style="height:2rem"></div>
        <div class="btn" @click="btn" v-show="order.status ==9 || order.status ==12" >
                <span>点击发货</span>
        </div>
    </div>
</template>

<script>
let vm;
export default {
    data() {
        return {
            order:{},
            orderId:this.$route.query.orderId,
            cartlist:[],
            totalCount:0,
            totalAmount:0, //不含运费的货物价格
            price:0, //含运费总价
            shipFee:0, //运费
            couponAmount:0,//优惠金额
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
        vm.getcart();
        vm.orders();
    },
    methods: {
        //获取购物车商品
        getcart() {
            vm.receiveData.getData(vm,'/getOrderDetail/'+vm.orderId,'res',function(){
                if(vm.res.success) {
                    if (vm.res.result) {
                        vm.cartlist = vm.res.result; 
                    }
                }else {
                    if(vm.res.message !=null && vm.res.errorCode !=40001) {
                        //  alert(vm.res.message);
                    }
                }
            });
        },
        orders() {
            vm.receiveData.getData(vm, "/getOrder/" + vm.orderId, "res", function() {
                if (vm.res.success) {
                    vm.order = vm.res.result;
                    vm.totalAmount = vm.res.result.totalAmount;
                    vm.shipFee = vm.res.result.shipFee;
                    vm.price = vm.res.result.price;
                    vm.totalCount = vm.res.result.count;
                    vm.couponAmount = vm.res.result.couponAmount;
                } else {
                    if(vm.res.message !=null && vm.res.errorCode !=40001) {
                         alert(vm.res.message);
                    }
                }
            });
        },
        btn() {
                vm.$router.push({path:'/delivery',query:{'orderId':vm.orderId}})
        }
       
    }
};
</script>

<style scoped>
.specialdetail {
    position:absolute;
    width:100%;
    height: 100%;
    background-color:#E4E4E4;
    overflow: auto;
}
.addr {
    background-color: #fff;
    padding: 0.4rem 0.4rem 0 0.4rem;
    box-sizing: border-box;
    margin-bottom: 0.1rem;

}
.addr .heig37 {
    line-height: 0.37rem;
}
.addr div {
    padding-bottom: 0.2rem;
    padding-left: 0.35rem;
    position: relative;  
}
.addr i {
    font-size: 0.39rem;
    vertical-align: bottom;
    color: #999999;
    position:absolute;
    left:0;
}
.addr .cor99 {
    color:#999999;
    line-height: 0.4rem;
}
.content {
    background-color: #fff;
}
.list {
    border-bottom: 1px solid #BBBBBB;
}
.list div {
    padding-left:0.4rem;
    height: 0.6rem;
    line-height: 0.6rem;
    text-align: left;
    font-size: 0.3rem;
}
.wares {
    padding-left:0.4rem;
    font-size: 14px;
    padding-top:10px;
    position:relative;
    border-bottom: 1px solid #BBBBBB;
    padding-right: 0.4rem;
}
.wares span {
    display: inline-block;
    padding-bottom:0.1rem;
}
.padd15 {
    padding-bottom: 0.15rem;
}
.wares .counts {
    position: relative;
    top: -0.18rem;
}
.wares .color {
    color:#CE5F41;
}
.wares .fs12 {
    font-size: 12px;
}
.Statistics {
    padding-right:0.4rem;
    height: 0.6rem;
    line-height: 0.6rem;
    text-align: right;
    font-size: 0.3rem;
    border-bottom:0.1rem solid #E4E4E4;
}
.money {
    padding-top: 0.3rem;
    padding-left: 0.4rem;
    padding-right:0.4rem;
    border-bottom:0.1rem solid #E4E4E4;
}
.money div {
    padding-bottom: 0.2rem;
}
.fs18 {
    font-size:0.33rem;
}
.color2 {
    color:#F08500;
}
.status {
    padding-left: 0.4rem;
    height: 0.6rem;
    line-height: 0.6rem;
    text-align: left;
    font-size: 0.3rem;
    padding-right: 0.4rem;
    border-bottom:0.1rem solid #E4E4E4;
}

.foter .title {
    height:0.65rem;
    line-height:0.65rem;
    text-align: left;
    border-bottom: 1px solid #BBBBBB;
    padding-left:0.4rem;
}
.express div{
    padding-left:0.4rem;
    padding-right: 0.4rem;
    height:0.65rem;
    line-height:0.65rem; 
}
.btn {
    position:fixed;
    bottom:0;
    left:0;
    right:0;
    text-align:center;
    height: 1rem;
    line-height: 1rem;
    color:#fff;
    background-color: #F08500;
    z-index:9999;
}
</style>

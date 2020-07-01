<template>
   <div class="opensucess">
        <div class="title_area" >
                <div class="brand-tip-1">{{title}}</div>
                <div class="brand-tip-2">{{desc}}</div>
	    </div>
        <div v-show="repairOrder.status == 9">
            <div class="payStatus item" v-show="repairOrder.payDate != null ">
                    <div class="content-bg">
                        <div class="content-top-bg">用户已支付费用</div>
                        <div class="content-bottom-bg">
                            <p>￥<span style="font-size: 60px">{{repairOrder.price}}</span></p>
                            <p class="fs15" style="color: #999">支付方式：{{payTypeName}}</p>
                        </div>
                    </div>
            </div>
            <div class="payStatus item" v-show="repairOrder.payDate == null ">
                <div class="content-bg">
                     <div class="content-top-bg">用户还未支付费用</div>
                </div>
            </div>
        </div>  
        <div v-show="repairOrder.status == 15">
                <div class="top-info bottom-line">
                    <div class="item">
                         <label>服务内容</label><span class="value">{{repairOrder.memo}}</span>
                    </div>
                </div>
                <div class="top-info" style="margin-top:15px">
                    <div class="item">
                        <label>联系地址</label><span class="value">{{repairOrder.address}}</span>
                    </div>
                    <div class="item">
                        <label>联系人</label><span class="value">{{repairOrder.receiverName}}</span>
                    </div>
                    <div class="item">
                        <label>手机号</label>
                        <a  class="value" :href="'tel:'+repairOrder.tel">{{repairOrder.tel}}</a>
                    </div>
                </div>
        </div>

        <div class="main_btn">
            <div class="btn" @click="goDetail">返回详情页</div>
            <div class="btn" @click="goback">进入订单列表</div>
        </div>
   </div>
</template>

<script>
let vm;
export default {
   data () {
       return {
           title:'服务成功',
           desc:'',
           repairOrder:{},
           payTypeName:"微信支付",
       };
   },
   created() {
       vm=this;
   },
   mounted() {
       vm.queryOrder();
   },
   methods: {
       queryOrder() {
            vm.receiveData.getData(vm,'customService/order?orderId='+vm.$route.query.ordersID,'res',function(){
                 if(vm.res.success) {
                     vm.repairOrder=vm.res.result;
                        if(vm.repairOrder.status== 15) {
                            vm.title='抢单成功';
                            vm.desc='恭喜你抢到一份订单';
                        }
                    }else {
                         alert(vm.res.message == null ? '获取成功列表信息失败，请去服务记录中查看！' : vm.res.message);
                    }
                });
       },
        //    返回详情
        goDetail() {
            vm.$router.push({path:'/openServiceDetail',query:{ordersID:vm.$route.query.ordersID}})
        },
       //进入维修列表
       goback() {
            vm.$router.push({path:'/canReceiveorders'})
       }
   },

}
</script>

<style  scoped>
.opensucess {
    background: white;
    margin: 0;
    height: auto;
    position:absolute;
    left:0;
    right:0;
    top:0;
    bottom:0;
}
.title_area {
    padding: 45px 0;
    background: #f7f7f1;
}
.brand-tip-1 {
    text-align: center;
    font-size: 30px;
    background: url(../../assets/images/img/icon_successful.png) no-repeat #f7f7f1;
    background-position: 25% center;
    background-size: 28px;
    color: #FF8A00;
}
.brand-tip-2 {
    text-align: center;
    background: #f7f7f1;
    margin-top: 25px;
    font-size: 20px;
    color: #FF8A00;
}
/* 已支付 */
.item {
    overflow: hidden;
    margin-bottom: 15px;
    font-size: 14px;
    color: #666;
}
.payStatus {
    width: 90%;
    padding: 5% 5%;
    text-align: center;
}
.content-top-bg {
    padding: 10px 20px;
    font-size: 20px;
    color: #FF8A00;
    /* background: #999; */
    border-radius: 12px 12px 0 0;
}
.content-bottom-bg {
    padding: 40px 20px;
    font-size: 30px;
    color: #ff8a00;
    background: #fff;
    border-radius: 0 0 12px 12px;
}
.fs15 {
    font-size: 15px;
}
.bottom-line {
    border-bottom: 1px solid #d4cfc8;
}
.top-info {
    margin: 15px;
}
label {
    display: inline-block;
    width: 70px;
}
.value {
    float: right;
    display: block;
    margin-left: 15px;
    color: #a6937c;
    width: 70%;
}
/* 按钮 */
.main_btn {
    width: 80%;
    height: 60px;
    margin: 0 auto;
}
.btn {
    display: block;
    margin: 10px;
    height: 44px;
    line-height: 44px;
    color: #fff!important;
    font-size: 15px;
    text-align: center;
    background-color: #ff8a00;
    border-radius: 3px;
    outline: none;
    border: none;
    text-decoration: none;
}
</style>
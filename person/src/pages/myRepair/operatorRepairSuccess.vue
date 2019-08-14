<template>
   <div class="opensucess">
        <div class="title_area">
                <div class="brand-tip-1">{{title}}</div>
                <div class="brand-tip-2">{{desc}}</div>
	    </div>
       
        <div class="payStatus item" v-show="repairOrder.status==5">
                <div class="content-bg">
                    <div class="content-top-bg">报修人已支付维修费用</div>
                    <div class="content-bottom-bg">
                        <p>￥<span style="font-size: 60px">{{repairOrder.amount}}</span></p>
                        <p class="fs15" style="color: #999">支付方式：{{payTypeName}}</p>
                    </div>
                </div>
         </div>

        <div class="payStatus item" v-show="repairOrder.status==4">
                <div class="content-bg">
                    <div class="content-top-bg">报修人还未支付维修费用</div>
                    <!-- <div class="content-bottom-bg">?&nbsp;?</div> -->
                </div>
         </div>

        <div v-show="repairOrder.opStatus==2">
                <div class="top-info bottom-line">
                    <!-- <div class="item">
                        <label>维修类型</label><span class="value">{{typeName}}</span>
                    </div> -->
                    <div class="item">
                        <!-- <label>维修项目</label><span class="value">{{repairOrder.projectName}}</span> -->
                         <label>维修项目</label><span class="value">{{repairOrder.memo}}</span>
                    </div>
                </div>
            
                <div class="top-info" style="margin-top:15px">
                    <div class="item">
                        <label>联系地址</label><span class="value">{{repairOrder.address}}</span>
                    </div>
                    <!-- <div class="item">
                        <label>预约时间</label><span class="value">{{repairOrder.requireDateStr}}</span>
                    </div> -->
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
            <div class="btn" @click="goback">进入维修单列表</div>
        </div>
   </div>
</template>

<script>
let vm;
import btn1 from '../../assets/images/img/btn1.png';
import btn2 from '../../assets/images/img/btn2.png';
import btn3 from '../../assets/images/img/btn3.png';
import btn4 from '../../assets/images/img/btn4.png';
import btn5 from '../../assets/images/img/btn5.png';
import btn6 from '../../assets/images/img/btn6.png';
import btn7 from '../../assets/images/img/icon_btn_jiadian.png';
export default {
   data () {
       return {
           title:'维修成功',
           desc:'感谢您让居民生活变得更美好',
           repairOrder:{publicProject:false},
           typeName:'',
           payTypeName:"现金支付",
           typeConfig:{
                1:["浴室维修",btn1],
                2:["厨房维修",btn2],
                3:["客厅卧室维修",btn3],
                4:["强弱电维修",btn4],
                5:["门窗维修",btn5],
                6:["其它维修",btn6],
                7:["家电",btn7]
                    },
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
            vm.receiveData.getData(vm,'operator/repair/query/repairId/'+vm.$route.query.ordersID,'res',function(){
                 if(vm.res.success) {
                     vm.repairOrder=vm.res.result;
                        vm.typeName=vm.typeConfig[vm.repairOrder.repairType][0];
                        if(vm.repairOrder.opStatus== 2) {
                            vm.title='抢单成功';
                            vm.desc='恭喜你抢到一份维修单';
                        }
                        if(vm.repairOrder.payType==1) {
                            vm.payTypeName='微信支付'
                        }   
                    }else {
                         alert('获取成功列表信息失败，请去维修记录中查看！')
                    }
                });
       },
        //    返回详情
        goDetail() {
            vm.$router.push({path:'/operatorOrdersDetail',query:{ordersID:vm.$route.query.ordersID}})
        },
       //进入维修列表
       goback() {
            vm.$router.push({path:'/operatorOrders'})
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
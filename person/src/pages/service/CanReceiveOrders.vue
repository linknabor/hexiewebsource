<template>
   <div class="oper" >
       <div class="emptybg" v-show="orders.length==0">
           <!-- <img src="../../assets/images/img/bg_orders.jpg" alt="" class="adimg"> -->
           <img :src="bgImage" alt="" class="adimg">
       </div>
        <div class="statusBar">
            <div class="statusTitle" :class="{current:status==0}" @click="changeStatus(0)">可接单</div>
            <div class="statusTitle" :class="{current:status==15}" @click="changeStatus(15)">已接单</div>
            <div class="statusTitle" :class="{current:status==9}" @click="changeStatus(9)">已完成</div>
        </div>
        <div style="width:100%;height:40px;">&nbsp;</div>
        <div class="ov pr15 lite-divider" style="color:#3b3937"  v-for="(item,i) in orders" @click="gotoDetail(i)" :key="item.id">
            <img class="icon-repair fl" src="../../assets/images/img/service.png"/>
            <div class="ov ptb-top ">
                <span class="fl fs15" style="color: #666;max-width: 100px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{item.productName}}</span>
                <span class="fr fs12" style="color: #999;"><i class="icon time-icon"></i>{{item.createDateStr}}</span> 
            </div>
            <div class="comment ov  pb15">
                <span class="fl fs15" style="font-size: 16px;color: #666;max-width: 120px;height:30px;line-height:30px; overflow: hidden;text-overflow: ellipsis;white-space: nowrap;   ">{{item.memo}}</span>
                <span class="fr fs12 status-font">{{item.statusStr}}</span>
            </div>
        </div>
   </div>
</template>

<script>
let vm;
import cookie from 'js-cookie';
export default {
   data () {
       return {
           orders:[],
           status:0,
           bgImage:this.common.GetImages('9'),//背景图
           service_id:cookie.get('service_id'),          
       };
   },
   created() {
       vm=this;
       
   },
   mounted() {
       vm.query();
   },

   methods: {
       query() {
            vm.receiveData.getData(vm,'customService/order/queryByStatus?orderStatus='+vm.status+'&service_id='+vm.service_id,'res',function(){
                if(vm.res.success){
                        vm.orders=vm.res.result;
                }else {
                    alert(vm.res.message == null ? "查询服务记录异常，请稍后重试" : vm.res.message);
                }   
            });
       },
       //点击导航
       changeStatus(s) {
           if(vm.status !=s) {
              vm.status=s;
              vm.query();
           }
       },
       gotoDetail(i) {
           vm.$router.push({path:'/openServiceDetail',query:{ordersID:vm.orders[i].id}})
       }
   },

}
</script>

<style  scoped>
  .emptybg {
    height:100%;
    width:100%;
    position: fixed;
}
.oper {
    background: #fffff8;
    margin: 0;
    height: auto;
    padding-bottom:20px;
}

.statusBar {
    width: 100%;
    background: #fff8ee;
    height: 40px;
    position: fixed;
}
.statusTitle {
    height: 40px;
    line-height: 40px;
    float: left;
    width: 33%;
    text-align: center;
    font-size: 15px;
}
.current {
    color: #ff8a00;
    border-bottom: 1px solid #ff8a00;
}

.ov {
    overflow: hidden;
    padding: 1px;
}
.lite-divider {
    border-bottom: 1px solid #d4cfc8;
    padding-right: 15px;
}
.myrepair .pr15 {
    padding-right: 15px;
}
.icon-repair {
    height: 60px;
    width: 60px;
    margin: 15px 15px;
    padding: 3%;
    border: 1px solid #31a8e6;
    border-radius: 3px;
}
.ptb15 {
    padding: 15px 0;
}
.ptb-top {
    padding-top:20px;
}
.fs15 {
    font-size: 15px;
}
.fs12 {
    font-size: 12px;
}
.icon {
    background-size: 13px;
    width: 13px;
    height: 13px;
    margin-right: 5px;
    vertical-align: bottom;
}
.time-icon {
    background-image: url(../../assets/images/img/icon_time_gray.png);
}
.icon {
    display: inline-block;
    /* width: 25px;
    height: 25px; */
    background-repeat: no-repeat;
}
.comment {
    margin-top: 8%;
    line-height: 20px;
}
.pb15 {
    padding-bottom: 15px;
}
.status-font {
    color: #FF8A00;
    background: #eee;
    padding: 5px 10px;
    border-radius: 3px;
}
</style>
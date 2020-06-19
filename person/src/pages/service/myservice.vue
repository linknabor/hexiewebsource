<template>
   <div class="myrepair" >
        <div class="ov pr15 lite-divider" style="color:#3b3937" v-for="(item,i) in orders" @click="gotoDetail(i)" :key="i">
                <img class="icon-repair fl" src="../../assets/images/img/service.png"/>
                <div class="ov ptb15">
                     <span class="fr fs12" style="color: #999;">
                        <i class="icon time-icon"></i>{{item.createDateStr}}</span>
                </div>
                <div class="comment ov  pb15">
                    <span class="fl fs15" style="font-size: 16px;color: #666;max-width: 120px;height:30px;line-height:30px; overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{item.memo}}</span>
                    <span class="fr fs12 status-font">{{item.statusStr}}</span>              
             </div>
        </div>
        <div class="emptybg" v-show="orders.length==0">
            <img :src="bgImage" alt="" class="adimg">
	    </div>
   </div>
</template>

<script>
let vm;
export default {
   data () {
       return {
           orders:[],
            bgImage:this.common.GetImages('3'), //背景图        
       };
   },
   created() {
       vm=this;
   },
   mounted() {
       vm.query();
   },

   components: {},

   methods: {    
       query() {
           vm.receiveData.getData(vm,'/customService/order/queryByUser','res',function(){
                if(vm.res.success) {
                        vm.orders=vm.res.result;
                }
            });
       },
       
       gotoDetail(i) {
           this.$router.push({path:'/myserviceDetail',query:{orderId:vm.orders[i].id}});
       }
   },

   computed: {},
}
</script>

<style  scoped>
.adimg {
        width: 100%;
        height: auto;
}
.myrepair {
    background: #fffff8;
    margin: 0;
    height: auto;
    padding-bottom: 20px;
    position: relative;
}

.ov {
    overflow: hidden;
    padding: 1px;
}
.lite-divider {
    border-bottom: 1px solid #d4cfc8;
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
    background-repeat: no-repeat;
}
.comment {
    margin-top: 5%;
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
.emptybg{
            position:fixed;
            left:0;
            right: 0;
            top: 0;
            bottom: 0;
        }
</style>
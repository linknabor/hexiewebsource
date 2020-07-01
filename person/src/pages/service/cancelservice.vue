<template>
   <div class="cancelo">
        <div class="modal">
            <div class="modal-select ptb15 line-divider" v-for="(item,i) in reasonPicker" 
            :key="i"
            :class="{checked:item.checked}" 
            @click="selectTeam(i)">{{item.name}}</div>
        </div>
        <div class="block-divider"></div>

        <div class="memo_area">
            <div style="padding:15px;">具体原因</div>
            <div contenteditable="true" class="content" :class="{hasValue:cancelReason}" @click="focus" @blur="storeMemo"></div>
         </div>

        <div class="btn-fixed">
            <div class="btn2" style="float: left;" @click="backPage">取消</div>
            <div class="btn" style="float: left;" @click="confirm">确定</div>
        </div>
   </div>
</template>

<script>
let vm;
export default {
   data () {
       return {
           cancelReasonType:1,
           cancelReason:'',
           reasonPicker: [
            {
                name: '我临时有事',
                value: 1,
                checked: true
            },
            {
                name: '师傅无法上门',
                value: 2,
                checked: false
            },
            {
                name: '其他',
                value: 3,
                checked: false
            }
          ],

       };
   },
   created() {
       vm=this;
   },
   mounted() {},

   methods: {
       selectTeam(index) {
           for(var i=0;i<vm.reasonPicker.length;i++) {
               vm.reasonPicker[i].checked=false;
           }
           vm.reasonPicker[index].checked=true;
           vm.cancelReasonType=vm.reasonPicker[index].value;
       },
       focus() {
        //    vm.focus();
       },
       storeMemo(e) {
           vm.cancelReason=e.srcElement.innerText;
       },
        // 取消
        backPage() {
            vm.$router.push({path:'/myserviceDetail',query:{orderId:vm.$route.query.orderId}})
        },
        //确定
        confirm() {
              vm.receiveData.postData(vm,'/customService/order/reverse?orderId='+vm.$route.query.orderId,null,'res',function(){
                if(vm.res.success) {  
                  alert("订单已取消");
                  vm.$router.push({path:'/myserviceDetail',query:{orderId:vm.$route.query.orderId}})
                }else {
                  alert(vm.res.message == null ? "订单取消失败，请稍后重试！" : vm.res.message);  
                }  
              })
        }
   },

}
</script>

<style  scoped>
.cancelo {
    background: white;
    margin: 0;
    position:absolute;
    left: 0;
    right: 0;
    top:0;
    bottom:0;

}
.modal {
    color: #666;
    margin: 0 auto;
    width: 100%;
    background: white;
}
.modal-select {
    line-height: 30px;
    padding: 10px 15px;
    background: url(../../assets/images/common/icon_unselect.png) no-repeat;
    background-position: 98% center;
    background-size: 18px;
}
.checked {
    background: url(../../assets/images/common/icon_selected.png) no-repeat;
    background-position: 98% center;
    background-size: 18px;
}
.line-divider {
    border-bottom: 1px solid #d4cfc8;
    font-size: 16px;
}
.block-divider {
    width: 100%;
    height: 20px;
    background: #F7F7F1;
}
.block-divider {
    width: 100%;
    height: 20px;
    background: #F7F7F1;
}
.memo_area {
    font-size: 15px;
    color: #7e6b5a;
}
.content {
    position: relative;
    height: 100px;
    margin: 0 15px;
    background-color: #F9F9E9;
    border: 1px solid #d4cfc8;
    outline: none;
    padding: 15px;
}
 .content:before {
            content:"输入问题描述内容...";
            font-size: 15px;
            color: #bfbfbf;
        }
.content:focus:before, 
.content.hasValue:before {
			display: none;
		}       
.btn2 {
    display: block;
    margin: 15px auto auto 15px;
    height: 44px;
    line-height: 44px;
    color: #fff!important;
    font-size: 15px;
    text-align: center;
    background-color: #afaaa3;
    border-radius: 3px;
    outline: none;
    border: none;
    text-decoration: none;
    width: 45%;
}
.btn {
    display: block;
    margin: 15px auto auto 15px;
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
    width: 45%;
}
</style>
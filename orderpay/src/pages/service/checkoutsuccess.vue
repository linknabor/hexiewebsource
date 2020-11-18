<style scoped>
	.title_area{
    	padding: 45px 0;
        background:#f7f7f1;
    }
    .brand-tip-1 {
        text-align: center;
        font-size: 30px;
        background: url("../../assets/images/icon_successful.png") no-repeat #f7f7f1;
        background-position: 25% center;
        background-size: 28px;
        color: #FF8A00;
    }
    .brand-tip-2 {
        text-align: center;
        background:#f7f7f1;
        margin-top:25px;
        font-size: 20px;
        color: #FF8A00;
    }
    .top-info {
        margin: 15px;
    }
    .item {
        overflow: hidden;
        margin-bottom: 15px;
        font-size: 14px;
        color: #666;
    }
    label {
        display: inline-block;
        width: 70px;
    }
    label:after {
        content: " :";
    }
    .value {
        float: right;
        display: block;
        margin-left: 15px;
        color: #a6937c;
        width:70%;
    }
	.wbord {
		word-break: break-all;
		word-wrap: break-word;
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
    .main_btn{
        width: 80%;
        height: 60px;
        margin: 30px auto;
    }
    .bottom-line{
    	border-bottom: 1px solid #d4cfc8;
    }

</style>
<template>
	<div>
		<div class="title_area">
		    <div class="brand-tip-1">下单成功</div>
		</div>
	    <div class="top-info bottom-line">
	        <div class="item">
	            <label>服务内容</label><span class="value wbord">{{order.memo}}</span>
	        </div>
	    </div>

	    <div class="top-info" style="margin-top:15px">
	        <div class="item">
	            <label>联系地址</label><span class="value">{{order.address}}</span>
	        </div>
	        <div class="item">
	            <label>联系人</label><span class="value">{{order.receiverName}}</span>
	        </div>
	        <div class="item">
	            <label>手机号</label><span class="value">{{order.tel}}</span>
	        </div>
	    </div>

	    <div class="main_btn">
	        <div class="btn" @click="goback">返回</div>
	    </div>

	</div>
</template>
<script>
import cookie  from 'js-cookie';
	let vm;
	export default {
		data(){
			return {
               orderId:this.$route.query.orderId, 
               order:{}
			}
		},
		beforeCreate(){//刷新页面
			
		},
		created(){
			vm = this;
		},
		watch:{
			
		},
		mounted(){
	  		vm.init();
		},
		methods:{
			init(){
                let url = 'customService/order?orderId='+vm.orderId;
                vm.receiveData.getData(vm, url, "res", function() {
                if (vm.res.success) {
                    vm.order = vm.res.result;
                } else {
                    alert(vm.res.message == null ? "请稍后重试！" : vm.res.message);
                }
                });
			},
			goback(){
				window.location.href = vm.basePageUrl+'home/index.html?'+vm.common.getoriApp()+'#/'
			}
		}
	}
</script>
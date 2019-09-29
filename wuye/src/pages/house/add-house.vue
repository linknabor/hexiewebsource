<style scoped>
	.lite-divider{
		border-bottom: 1px solid #d4cfc8;
		padding-left: 0.15rem;
		overflow: hidden;
		padding: 1px;
	}
	.hidden-input{
		height: 0.4rem;
		margin-top: 0.4rem;
		width: 4rem;
		-background: black;
		border: none;
		outline: none;
		background-color: transparent;
		font-size: 0.28rem;
		padding: 0 0.15rem 0.15rem;
	}

	.scan-icon{
		float: right;
		display: inline-block;
		height: 0.4rem;
		width: 0.4rem;
		background: url('../../assets/images/house/icon_scan.png') no-repeat center ;
		background-size: cover;
		margin-top: 0.38rem;
	}
	.subBtn{
		height: 0.88rem;
		line-height: 0.88rem;
		background-color: #ff8a00;
		font-size: 0.3rem;
		color: white;
		width: 6.9rem;
		margin: 0.6rem auto 0;
	}

</style>

<template>
	<div>
        <div class="lite-divider" style="margin-top:35px;margin-left:15px;margin-right:15px;">
            <input placeholder="请输入账单号" class="hidden-input" style="text-align:left;" v-model="number">
            <div class="scan-icon" @click="show"></div>
        </div>
		<mt-button class="subBtn" size="large" @click.native="submit">提交</mt-button>
	</div>
</template>

<script>
	let vm;
	import wx from 'weixin-js-sdk';
	import { MessageBox } from 'mint-ui';
	export default {
		created(){
			vm = this; 
			// 请求接口获取 后台返回的 微信配置项
			let url = location.href.split('#')[0];
    		vm.receiveData.wxconfig(vm,wx,['scanQRCode'],url);
		},
	  data(){
		  return {
				number:''
		  }
	  },
	  mounted(){
		
	  	// this.common.checkRegisterStatus();
	  },
	  methods:{
	  	 show(){
	  	 	//调用微信扫一扫 成功数据返回到number
	  	 	vm.receiveData.scan(vm,wx,'number')
	  	 },
		submit(){//判断是否为正确账单号
		   let  wuye_myhouse={
				url: /127|test/.test(location.origin)?'test.e-shequ.com':
						/uat/.test(location.origin)?'uat.e-shequ.com':
						'www.e-shequ.com'       //提示框网址
				}
	  	 	var reg = /^\d{18}$/
	  	 	if(reg.test(this.number)){//为数字即通过
	  	 		vm.house();
	  	 	}else{
	  	 		MessageBox.alert('请输入正确账单号',wuye_myhouse.url);
			   }
		},
		house() {
	  	//查询number下的房屋
	  	 let url = '/hexiehouse?stmtId='+ vm.number;
  		this.receiveData.getData(vm,url,'response',function(){
			  if(vm.response.success){
				if(vm.response.result== null) {
					  alert('未查询到该房屋')
				  }else {
					 	vm.$router.push('/bindHouse/' + vm.number);
				  }
			  }else {
				alert(vm.response.message==null?'未查询到该房屋':vm.response.message)
			  }
  			})
		}   
	  }
	}
</script>
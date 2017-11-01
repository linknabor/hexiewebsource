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
		height: 0.8rem;
		width: 0.8rem;
		background: url('../../../static/image/icon_scan.png') ;
		transform:scale(0.5);
		margin: 10px;
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
            <input placeholder="输入账单编号快速缴费" class="hidden-input" style="text-align:left;" v-model="number">
            <div class="scan-icon" @click="show"></div>
        </div>
		<mt-button class="subBtn" size="large" @click.native="submit" >提交</mt-button>
	</div>
</template>

<script>
	import wx from 'weixin-js-sdk';
	let vm;
	import { MessageBox } from 'mint-ui';
	export default {
		created(){
			vm = this;
			// 请求接口获取 后台返回的 微信配置项
			let url = '/getUrlJsSign';
			// vm, url, params 
			//new URL
			vm.receiveData.postData(vm,url,{url:'https://test.e-shequ.com/weixin/wuye/myhouse.html'} )
			// let obj ={"url" : "https://test.e-shequ.com/weixin/wuye/myhouse.html"}
			// this.axios({
			//   method: 'post',
			//   url: 'https://test.e-shequ.com/wechat/hexie/wechat/getUrlJsSign',
			//   //data:{"url" : "https://test.e-shequ.com/weixin/wuye/myhouse.html"}
			//   data: JSON.stringify({"url" : "https://test.e-shequ.com/weixin/wuye/myhouse.html"})
			// }).then(function(res){
			// 	console.log(res)
			// });
			// wx.config({
			//     debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
			//     appId: '', // 必填，公众号的唯一标识
			//     timestamp: , // 必填，生成签名的时间戳
			//     nonceStr: '', // 必填，生成签名的随机串
			//     signature: '',// 必填，签名，见附录1
			//     jsApiList: ['scanQRCode'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
			// });
		},
	  data(){
		  return {
				number:''
		  }
	  },	
	  methods:{
	  	 show(){
	  	 	alert("调js-sdk")
	  	 },
	  	 submit(){//判断是否为正确账单号
	  	 	//  let url = '/hexiehouse/'+ this.number;
	  		// this.receiveData.getOriginData(vm,url,'data',function(){
	  		// 	console.log(this.data)
	  		// })
	  	 	var reg = /^\d{18}$/
	  	 	if(reg.test(this.number)){//为数字即通过
	  	 		this.$router.push('/bindHouse/' + this.number);
	  	 	}else{
	  	 		MessageBox.alert('请输入正确账单号', 'www.e-shequ.com');
	  	 	}
	  	 }
	  }
	}
</script>
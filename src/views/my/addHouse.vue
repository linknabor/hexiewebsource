<style scoped>
	.lite-divider{
		border-bottom: 1px solid #d4cfc8;
		padding-left: 15px;
		overflow: hidden;
		padding: 1px;
	}
	.hidden-input{
		height: 20px;
		margin-top: 20px;
		border: none;
		outline: none;
		background-color: transparent;
		font-size: 15px;
		padding: 0 15px 15px;
	}

	.scan-icon{
		float: right;
		display: inline-block;
		height: 40px;
		width: 40px;
		background-size: 20px;
		background: url('../../../static/image/icon_scan.png') ;
		transform:scale(0.5);
		margin: 10px;
	}
	.subBtn{
		height: 44px;
		line-height: 44px;
		background-color: #ff8a00;
		color: white;
		width: 90%;
		margin: 0 auto;
		margin-top: 60px;
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
	export default {
	  data(){
			return {
				number:11234
			}
	  },
	  methods:{
	  	test(){
	  		alert(1)
	  	},
	  	 show(){
	  	 	alert("调js-sdk")
	  	 },
	  	 submit(){//判断是否为纯数字
	  	 	var reg = /^\d+$/;
	  	 	//var re = new RegExp(reg);
	  	 	if(reg.test(this.number)){//默认通过
	  	 		this.$router.push("/bindHouse")
	  	 	}else{
	  	 		alert("不通过，请输入数字")
	  	 	}
	  	 }
	  }
	}
</script>
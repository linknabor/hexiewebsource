<style scoped>
.wrapper-card{
	width:80%;
	height:auto;
	margin: 0 auto;
	border-radius: 8px;
	background-color: #fff;
	position: absolute;
	left:50%;
	top:50%;
	transform: translate(-50%,-50%);
	-webkit-transform: translate(-50%,-50%);
	
}	
.header-card{
	position: relative;
	text-align: center;
	padding:.2rem 0;
	background-color: #f2f2f2;
	border-radius: 8px 8px 0 0;
	font-size: .28rem;
	color:#141414;
	border-bottom: 1px solid #e2e2e2;
	box-shadow: 0 2px 0 rgba(0,0,0,0.2);
	-webkit-box-shadow: 0 2px 3px -1px rgba(0,0,0,0.2);
	letter-spacing: .02rem;
	padding-left: .02rem;
	
}
.billBtn{
	width: 80%;
	margin: .6rem 10%;
	color: #e2f5ff;
	font-size: .28rem;
	padding: .14rem 0;
	background-color:#ff8138;
	border-radius: 4px;
	letter-spacing: .02rem;
	padding-left: .02rem;
	font-family: "微软雅黑";
}
.nobillBtn{
	width: 80%;
	margin: 0 10% .6rem;
	color: #e2f5ff;
	font-size: .28rem;
	padding: .14rem 0;
	background-color:#ff8138;
	border-radius: 4px;
	letter-spacing: .02rem;
	padding-left: .02rem;
	font-family: "微软雅黑";
}
</style>	

<template>
	<div style="background: #000;width: 100%;height: 100vh;">
		<div class="wrapper-card">
			<div class="header-card">
				<span>用户认证</span>
			<i class="iconfont icon-close" style="font-size: .3rem;float: right;right: .2rem;top:.15rem;color:#acacac;position: absolute;" @click="back"></i>
					
			</div>
			<div>
			<mt-button class="billBtn" size="small" @click.native="billSubmit">使用对账单认证</mt-button>
			<mt-button class="nobillBtn" size="small" @click.native="nobillSubmit">无物业费对账单</mt-button>
		</div>
		</div>
		
		
		
	</div>
	
</template>

<script>
	import '../../assets/iconfont/iconfont.css'
	export default{
		data(){
			return {
				// params:{
				// 	user_id:this.$route.query.user_id
				// }
			}
		},
		methods:{
			billSubmit(){
				this.$router.push('/addHouse');
			},
			
			nobillSubmit(){
				this.$router.push('/checkPay');
			},
			back(){
				this.$router.push('/myhouse');
			}
		}
	}
	
</script>
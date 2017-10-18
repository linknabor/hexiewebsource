<style scoped>
	.bottomBtn{
		position: fixed;
		bottom: 0;
		height: 44px;
		background-color:#ff8a00;
		color:white;
	}
	ul{
		margin: 10px 0 0;
		padding: 0;
	}
	ul li{
		font-size: '微软雅黑';
		color: #000;
		padding: 10px 15px ;
		list-style: none;
	}
	.fr{
		float: right;
		
	}
</style>

<template>
	<div class="bindhouse">
		<ul>
			<li>{{name}}&nbsp;{{city}}</li>
			<li>
				<span class="fl">{{address}}</span>
				<span class="fr">{{size}}平米</span>
			</li>
			<li>
				{{number}}(户号)
			</li>
		</ul>
		<mt-button  size="large" class="bottomBtn" @click.native="addHouse" >添加房子</mt-button>
	</div>
</template>

	
<script>
	import { MessageBox } from 'mint-ui';
	export default {
	  data(){
	  	return{
	  		name:'华川家园',
	  		city:'上海市',
	  		address : '浦东新区秒传路1弄1号1室',
	  		size:'10.0',
	  		number:13456567 //户号

	  	}
	  },
	  methods:{
	  	addHouse(){
	  		MessageBox.alert('添加房屋成功','www.e-she.com');
	  	}
	  }
	}
</script>
<style scoped>
	.bottomBtn{
		position: fixed;
		bottom: 0;
		height: 44px;
		background-color:#ff8a00;
		 color:white;
	}
	.nohouse{
		
		height:500px;
		background: url('../../../static/image/bg_nohouse.jpg') no-repeat center center;
		background-size: cover;
		-moz-background-size:100% 100%;
	}
</style>

<template>
	<div class="myhouse">
		<div class="nohouse"></div>
		<mt-button  size="large" class="bottomBtn" @click.native="addHouse" >添加房子</mt-button>
	</div>
</template>

<script>
	export default {
	  
	  methods:{
	  	
	  	addHouse(){
		  	this.$router.push("/addHouse")

	  	}
	  }
	}
</script>
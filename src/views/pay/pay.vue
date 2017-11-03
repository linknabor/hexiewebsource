<template>
	<div class="main">
		<mt-navbar  v-model="selected">
	    	<mt-tab-item id="1">账单缴费</mt-tab-item>
	    	<mt-tab-item id="2">物业缴费</mt-tab-item>
	    	<mt-tab-item id="3">停车缴费</mt-tab-item>
    	</mt-navbar>
		<!-- tab-container -->
		<mt-tab-container v-model="selected">
		  <mt-tab-container-item id="1">
		    <mt-cell v-for="n in 10" :title="'内容 ' + n" />		  
		  </mt-tab-container-item>
		  <mt-tab-container-item id="2">
		    <mt-cell v-for="n in 4" :title="'测试 ' + n" />
		  </mt-tab-container-item>
		  <mt-tab-container-item id="3">
		    <mt-cell v-for="n in 6" :title="'选项 ' + n" />
		  </mt-tab-container-item>
		</mt-tab-container>
	</div>
</template>
<script>
	export default {
	  data(){
	  	return {
	  		selected:'1'	
	  	}
	  },
	  methods:{
	  }
	}
</script>
<style scoped> 
	.test{
		border-bottom: 2px solid #000;
	}
	.main{
		margin: 0 0.3rem;
		background-color:#000;
	}
</style>
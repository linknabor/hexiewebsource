<style scoped>

	.foot{
    width: 100%;
     height: 72px;
     line-height: 80px;
     text-align: center;
     position: fixed;
     bottom: 0;
   }
   .foot-item{
    display: block;
     width: 25%;
     float: left;
   }
   .foot-item:link,.foot-item:visited{
     background-color: white;
     color: black;
     
   }
   .foot-item:hover,.foot-item:active{
     display: block;
     color: white;
     background-color: #C8C6C6;
   }
	
	.content  {
		padding-bottom: 72px;	
	}

</style>

<template>
	<div class="index">
		<router-view class="contetn"></router-view>			
		<div class="foot">	
			 <router-link class="foot-item" to="/service">服务</router-link>
		     <router-link class="foot-item" to="/market">集市</router-link>
		     <router-link class="foot-item" to="/community">社区</router-link>
		     <router-link class="foot-item" to="/my">我的</router-link>
		</div>	
	</div>
</template>

<script>
	export default{

	}
</script>
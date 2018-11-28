<template>
	<div class="loading" >
		<img src="http://7xnqht.com1.z0.glb.clouddn.com/loading.gif" alt="loading...">
	</div>
</template>
<script>
	export default{
	}
</script>
<style scoped>
	.loading{
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background-color:#000;
		opacity: 0.4;
		z-index: 10;
	}
	.loading img{
		width: 0.8rem;
		height: 0.8rem;
		position: absolute;
		top: 50%;
		left: 50%;
		margin-top: -0.4rem;
		margin-left: -0.4rem;

	}
</style>
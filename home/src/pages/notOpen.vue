<style scoped>
img{
	max-width: 100%;
    height: auto;
    width: 100%;
}	

</style>
<template>
	<div>
		<!-- <img src="../assets/images/img/bg_qidai.jpg"> -->
		<img :src='bgImage' alt="" style="width:100%;height:auto;">
	</div>
</template>
<script>
	let vm;
	export default {
		data(){
			return {
				bgImage:this.common.GetImages('8'),
			}
		},
		beforeCreate(){//刷新页面
			
		},
		created(){

		},
		watch:{
			
		},
		mounted(){
			
	  		
		},
		methods:{
			

		}
	}
</script>
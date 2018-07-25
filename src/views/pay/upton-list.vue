<!-- 显示优惠券的列表 -->
<style scoped>
	


</style>
<template>
	
</template>
<script>
	let vm;
	export default{
		data(){
			return{
				isSelect:false,
				uptonData:[],//优惠券信息
				uptonNumber: 0 ,
			}
		},
		created(){
			vm = this;
		},
		mounted(){
			//获取优惠劵列表
			//请求优惠券数据 第一步 更新优惠券 第二步:获取优惠券
	  		 let url2 = 'updateCouponStatus';
	  		vm.receiveData.getData(vm,url2,'temp',function(){
	  			//更新后 获取优惠劵
	  			let url3 = 'getCouponsPayWuYe';
	  			vm.receiveData.getData(vm,url3,'data',function(){
	  				vm.uptonData = vm.data.result;
	  				console.log(vm.uptonData)
	  				vm.uptonNumber = vm.uptonData.length;
	  			})
	  		})
		},
		methods:{
			showIcon(index){
				//console.log(index)
				//console.log(vm.uptonData[index].selected)
				if(vm.uptonData[index].selected){
					vm.$set(vm.uptonData[index],'selected',false);
				}else{
					vm.$set(vm.uptonData[index],'selected',true);
					for(let i in vm.uptonData){
						if(i != index && vm.uptonData[i].selected == true){
							vm.$set(vm.uptonData[i],'selected',false);
							break;							
						}
					}
				}
			},
			//提交返回优惠劵的id
			selectUpton(){
				let flag = false;
				for(let i in vm.uptonData){
					if(vm.uptonData[i].selected == true){
						flag = true;
						temp = vm.uptonData[i]
					}
				}
				vm.$router.push({ name:'payDetail', params: { id:temp.id}})
			}
		}
	}
</script>
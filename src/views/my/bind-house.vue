<style scoped>
	.bottomBtn{
		font-size: 0.3rem;
		position: fixed;
		bottom: 0;
		height: 0.9rem;
		line-height: 0.9rem;
		background-color:#ff8a00;
		color:white;
	}
	ul{
		margin: 0.1rem 0 0;
		padding: 0;
	}
	ul li{
		line-height: 0.7rem;
		color: #000;
		padding: 0.1rem 0.15rem;
		list-style: none;
		overflow: hidden;
	}
	.fr{
		float: right;
		
	}
</style>

<template>
	<div class="bindhouse">
		<ul>
			<li>{{data.sect_name}}&nbsp;{{data.city_name}}</li>
			<li>
				<span class="fl">{{data.cell_addr}}</span>
				<span class="fr">{{data.cnst_area}}平米</span>
			</li>
			<li>
				{{data.mng_cell_id}}(户号)
			</li>
		</ul>
		<mt-button  size="large" class="bottomBtn" @click.native="addHouse" >绑定房子</mt-button>
	</div>
</template>

	
<script>
	let vm;
	import { MessageBox } from 'mint-ui';
	export default {
	  created(){
	  	vm = this;
	  },
	  data(){
	  	return{
	  		data:{
	  			name:'',
	  		},
	  		axiosParams:{
        		number: this.$route.params.number
        	}

	  	}
	  },
	  mounted(){
	  	//查询number下的房屋
	  	 let url = '/hexiehouse/'+ this.axiosParams.number
	  	//getData: function (vm, url,backdataname) {
	  		this.receiveData.getData(vm,url,'response',function(){
	  			vm.data = vm.response.result
	  		})
	  },
	  methods:{
	  	addHouse(){//添加房子 get 提交两个参数 
	  		//console.log(this.data)
	  		let url = '/addhexiehouse/'+this.axiosParams.number+'/'+this.data.mng_cell_id
	  		vm.receiveData.getData(vm,url,'res',function(){
	  			//返回值的message的为空 而且
	  			if(vm.res.errorCode == 0){
	  				if(vm.res.message){
	  					MessageBox.alert(`${vm.res.message}`,'www.e-she.com').then( action =>{
	  			 			vm.$router.push("/myhouse")	
	  			 		})	
	  				}else{
	  					MessageBox.alert('添加房屋成功','www.e-she.com').then( action =>{
	  			 			vm.$router.push("/myhouse")	
	  			 		})
	  				}
	  			}else{
	  				MessageBox.alert(`${vm.res.message}`,'www.e-she.com').then( action =>{
	  			 		vm.$router.push("/addHouse")	
	  			 	})
	  			}

	  		})
	  	}
	




	  }
	}
</script>
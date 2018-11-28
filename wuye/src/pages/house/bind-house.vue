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
		<ul  v-show="canAddhouse ">
			<li>{{data.sect_name}}&nbsp;{{data.city_name}}</li>
			<li>
				<span class="fl">{{data.cell_addr}}</span>
				<span class="fr">{{data.cnst_area}}平米</span>
			</li>
			<li>
				{{data.mng_cell_id}}(户号)
			</li>
		</ul>
		<!-- <loading v-show="loadingShow"></loading> -->
		<mt-button  size="large" class="bottomBtn" @click.native="addHouse" >绑定房子</mt-button>
	</div>
</template>

	
<script>
	let vm;
	import { MessageBox } from 'mint-ui';
	import loading from '../../components/loading.vue';

	export default {
	  components:{loading},
	  created(){
	  	vm = this;
	  },
	  data(){
	  	return{
	  		loadingShow : true,
	  		data:{
	  			name:'',
	  		},
	  		axiosParams:{
        		number: this.$route.params.number
			},
			canAddhouse:false,

	  	}
	  },
	  mounted(){
	  	//查询number下的房屋
	  	 let url = '/hexiehouse?stmtId='+ this.axiosParams.number;
	  	 // let url = '/hexiehouse/'+this.axiosParams.number;
	  	//getData: function (vm, url,backdataname) {
  		this.receiveData.getData(vm,url,'response',function(){
			  if(vm.response.result== null) {
				  vm.data={}
				  alert('未查询到该房屋')
				  vm.canAddhouse=false;
			  }else {
				  vm.data = vm.response.result
				  vm.canAddhouse=true;
			  }
  		})
	  },
	  methods:{
	  	addHouse(){//添加房子 post 提交两个参数 
	  		let stmtId = this.axiosParams.number;
	  		let url2 = '/addhexiehouse?stmtId='+stmtId+'&houseId='+this.data.mng_cell_id;
	  		vm.receiveData.postData(vm,url2,{},'res',function(){
	  			vm.loadingShow = false;
				if(vm.res.result !== null) {
                    MessageBox.alert('添加房子成功','www.e-shequ.com').then( action =>{
	  						vm.$router.push("/myhouse")
	  					})
				}
				if(vm.res.result == null) {
					 MessageBox.alert('添加房子成功','www.e-shequ.com').then( action =>{
	  						vm.$router.push("/myhouse")
	  					})
				}
				if(!vm.res.success) {
                    MessageBox.alert(vm.res.message).then( action =>{
						vm.$router.push("/addHouse")
	  					})
				}


	  		})

	  	}
	
	  }
	}
</script>
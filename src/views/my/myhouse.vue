<style scoped>     
	.myhouse{         
		font-size: 0.24rem; 
	}

	.bottomBtn{
		font-size: 0.3rem;         
		position: fixed;         
		bottom: 0.02rem;
		height: 0.98rem;         
		background-color:#ff8a00;         
		color:white;     
	}

	.nohouse{         
		height:10rem;         
		background: url('../../assets/bg_nohouse.jpg') no-repeat center center;
		background-size: cover;         
		-moz-background-size:100% 100%;     
	}

	.house-list{
		list-style: none;
		padding: 0;
		margin-top: 0.1rem;
	}
	.house-list li{
		padding:0 0.16rem 0.2rem;
		overflow: hidden;
		border-bottom: 0.2rem solid #f6f7f2;
	}

	.house-list li p{
		height: 0.7rem;
		line-height: 0.7rem;
		margin:0;
		overflow: hidden;
	}

	.del-icon{
		background: url('../../../static/image/icon_cancel.png') no-repeat center;
		background-size: cover;
		width: 20px;
		height: 20px;
		margin-top: 5px;
	}
</style>

<template>
	<div class="myhouse">
		<div class="nohouse" v-if="dataArr.length == 0"></div>
		<ul class="house-list" v-else="dataArr.length == 0">
			<li v-for="(i,index) in dataArr">
				<p>
					<span class="fl">{{i.sect_name}} {{i.city_name}}</span>
					<i  @click="del(i,index)"class="fr del-icon" ></i>
				</p>
				<p>
					<span class="fl">{{i.cell_addr}}</span> 
					<span class="fr">{{i.cnst_area}}平米</span>
				</p>
				<p>{{i.ver_no}}（户号）</p>
				<!-- 城市：{{i.city_name}} <br>
				面积: {{i.cnst_area}}<br>
				地址：{{i.cell_addr}}<br>
				号码1：  {{i.mng_cell_id}}<br>
				小区名字: {{i.sect_name}}<br>
				号码2 ：{{i.ver_no}} -->
			</li>
		</ul>
		<mt-button  size="large" class="bottomBtn" @click.native="addHouse" >添加房子</mt-button>
	</div>
</template>
<script>
	let vm;
	import { MessageBox, Toast } from 'mint-ui';
	export default {
	  created(){
	  	vm = this;
	  },
	  mounted(){//查看房子列表
	  	vm.showList();
	  },
	  data(){
	  	return {
	  		dataArr:[]
	  	}
	  },
	  methods:{
	  	showList(){
	  		let url = '/hexiehouses';
		  	vm.receiveData.getData(vm,url,'data',function(){
		  		//console.log(vm.data.result)
		  		if(vm.data.result != null){
			  		vm.dataArr = vm.data.result		  			
		  		}else{
		  			vm.dataArr = []
		  		}
		  	})
	  	},
	  	addHouse(){
		  	this.$router.push("/addHouse")
	  	},
	  	del(value,index){
	  		MessageBox.confirm('确定要删除吗?').then(action => {
				//删除数组下的改对象
				vm.dataArr.splice(index,1)
		  		let url='/hexiehouse/delete/'+ value.mng_cell_id;
		  		vm.receiveData.getData(vm, url, 'delData',function(){
		  			//回调函数 判断删除成功与否 暂放
		  			//console.log(vm.delData)
		  			Toast({
					  message: '删除成功',
					  position: 'top',
					  duration: 1000
					});
		  		})
			}).catch(reject =>{//点击了取消
				//console.log(reject)
				return
			})
			;
	  		
	  		
	  	}
	  }
	}
</script>
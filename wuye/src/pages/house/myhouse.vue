<style scoped>     
	.myhouse{         
		font-size: 0.26rem; 
	}
	.huzhu{font-size: 0.34rem;font-weight: bold;}
	.bottomBtn{
		font-size: 0.35rem;         
		position: fixed;         
		bottom: 0;
		height: 49px;         
		background-color: var(--primary-color);         
		color:white;letter-spacing: 2px;
		width: 100%;line-height: 49px;text-align: center;
		overflow: hidden;     
	}

	.nohouse{
		position: fixed;
		left: 0;
		top: 0;
		height:100%;
		width: 100%;
		/*background: #ff8a00;         */
		/* height:10rem;         
		background: url('../../assets/images/house/bg_nohouse.jpg') no-repeat center center;
		background-size: cover;         
		-moz-background-size:100% 100%;      */
	}
	.nohouse img{
		height: 100%;
		width: 100%;
	}
	.house-list{
		list-style: none;
		padding: 0;
		margin-top: 0.1rem;
	}
	.house-list li{
		padding:0 0.26rem 0.3rem;
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
		background: url('../../assets/images/house/icon_cancel.png') no-repeat center;
		background-size: cover;
		width: 25px;
		height: 25px;
		margin-top: 5px;
	}
	#login {
		background: rgba(0,0,0,0.5);
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		position: fixed; 
		z-index:10000000;
	}	
</style>

<template>
	<div class="myhouse">
		<div class="nohouse" v-if="dataArr.length == 0">
			<!-- <img src="../../assets/images/house/bg_nohouse.jpg" alt=""> -->
			<img :src='bgImage' alt="">
		</div>
		<ul class="house-list" v-else>
			<li v-for="(i,index) in dataArr" :key="index">
				<p>
					<span class="fl huzhu">{{i.sect_name}} {{i.city_name}}</span>
					<i  @click="del(i,index)" class="fr del-icon" ></i>
				</p>
				<p>
					<span class="fl">{{i.cell_addr}}</span> 
				</p>
				<p><span class="fl">{{i.cnst_area}}平米</span></p>
				<p>{{i.ver_no}}（户号）</p>
				<!-- 城市：{{i.city_name}} <br>
				面积: {{i.cnst_area}}<br>
				地址：{{i.cell_addr}}<br>
				号码1：  {{i.mng_cell_id}}<br>
				小区名字: {{i.sect_name}}<br>
				号码2 ：{{i.ver_no}} -->
			</li>
		</ul>
		<div class="bottomBtn" @click="addHouse">添加房子</div>
		<div id="login" v-show="login"></div> 
	</div>
</template>
<script>
	let vm;
	import { MessageBox, Toast } from 'mint-ui';
	import Storage from '../../assets/js/storage.js'
	export default {
	  data(){
	  	return {
			dataArr:[],
			login:true,
			bgImage:'',
			userInfo: {},
	  	}
	  },
	  created(){
	  	vm = this;
	  },
	  mounted(){//查看房子列表
	  	// this.common.checkRegisterStatus();
		vm.showList();
		let bgImage = this.common.GetImages('5')
		if(bgImage) {
			this.bgImage = bgImage
		}
		let userInfo = Storage.get('userInfo')
		console.log(userInfo)
		if(userInfo) {
			this.userInfo = userInfo
			let wdappids = this.is_config.C('wdappids')
			console.log(wdappids)
			if(wdappids.indexOf(userInfo.appId)>-1) {
				const secondaryColor = getComputedStyle(document.documentElement).getPropertyValue('--secondary-color');
				console.log(secondaryColor)
				document.documentElement.style.setProperty('--primary-color', secondaryColor);
				const secondarySelIcon = getComputedStyle(document.documentElement).getPropertyValue('--secondary-icon-selected');
				document.documentElement.style.setProperty('--primary-icon-selected', secondarySelIcon);
			} else {
				const originColor = getComputedStyle(document.documentElement).getPropertyValue('--origin-color');
				document.documentElement.style.setProperty('--primary-color', originColor);
				const originSelIcon = getComputedStyle(document.documentElement).getPropertyValue('--origin-icon-selected');
				document.documentElement.style.setProperty('--primary-icon-selected', originSelIcon);
			}
			
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
				vm.login=false;  
		  	})
	  	},
	  	addHouse(){
			  this.$router.push('/identHouse');
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
					    message: '删除房子成功',
						iconClass: 'icon icon-success',
					    duration: 1000,
					    position: 'middle'
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
<template>
	<div>
		<div class="main">
		<div class="mint-tab-container-item">
		<div class="query-data">
		  		<div class="input-row">
			  		小区：
					    <!-- v-on:input="shousuo(query.sect)" -->
					  <input type="text" id="btnd" class="virtual-input classinput" value=""  placeholder="请输入小区" v-on:input="sousuo(query.sect)" v-model="query.sect">
					  	<i class="iconfont icon-chacha  classc" @click="clicki" v-show="showi"></i>
			  		<!-- <select class="virtual-input" v-model="query.sect">
						  <option v-for="item in sectList" :value="item.id" >{{item.name}}</option>   v-tap="{fn:alertFN,name:item.name}""
			  		</select> -->
					<ul class="input-uis test" v-show="shows" >
						<li :data-idd="item.id" v-for="item in sectList" :key="item.id"  v-tap="{fn:alertFN,name:item.name,id:item.id}">{{item.name}}</li>
					</ul>
					
			  	</div>
			  	<div class="input-row">
			  		楼宇：
			  		<select class="virtual-input" v-model="query.build"  @change="getCouponSelected">
						<!-- <option value="0">请选择</option> -->
			  			<option v-for="item in buildList" :value="item.id" >{{item.name}}</option>
			  		</select>
			  	</div>
			  	<div class="input-row">
			  		门牌：
			  		<select class="virtual-input" v-model="query.unit" @change="getCoupon">
						<!-- <option value="0">请选择</option> -->
			  			<option v-for="item in unitList" :value="item.id" >{{item.name}}</option>	
			  		</select>
			  	</div>
			  	<div class="input-row">
			  		室号：
			  		<select class="virtual-input" v-model="query.house" @change="getCoupons($event)">
						   <!-- <option value="0">请选择</option> -->
			  			<option v-for="(item,index) in houseList" :value="item.id" :key="index">{{item.name}}</option>	
			  		</select>
			  	</div>	
			  	<div class="input-row last">
			  		建筑面积：
			  		<input type="text" class="virtual-input classinput" value="" v-model="query.area">&nbsp;&nbsp;m²
			  		
			  	</div>
			  	<div class="input-row add">
			  		建筑面积允许误差±1m²以内
			  	</div>
		  	</div>
		  	<!--<mt-loadmore 
			  	:bottomMethod="queryLoadBottom" 
			  	:bottomAllLoaded = "queryisLastPage"
			  	:auto-fill = "false"
				ref="loadmore"
			>
			  	<Bill :bill-info="queryBillInfo" @itemClick="itemClick"></Bill>
			</mt-loadmore>-->
			<div style="width:100%;height:0.92rem;"></div>
			<div class="btn-fixed" id="st">
	    		<!-- <div v-show="quan" class="fl select-btn" :class="{allSelected:queryAllselect }" @click="allSelect(queryBillInfo,'queryAllselect')">全选&nbsp;</div> -->
	    		<button class="pay" @click="addRoom" style="cursor:pointer;">添加房屋</button>
	    		<!-- <div class="pay" @click="addRoom">
	    			添加房屋
	    		</div> -->
       		</div>
       		</div>
       		</div>
       		</div>
</template>

<script>
	let vm;
	let timer;
	import { MessageBox } from 'mint-ui';
	import axios from 'axios';
	import Bill from '../../components/bill.vue';
	import '../../tap.js'
	export default{
		data(){
			return{
				sectList:[],//小区列表
		  		buildList:[],//楼宇列表
		  		unitList:[],//门牌列表
		  		houseList:[],//室号列表
		  		query:{//查询缴费数据
		  			sect:'',//小区
					sectID:'',//小区id
		  			build:'',//楼宇id
		  			unit:'',//门牌id
		  			house:'',//室号id
		  			area:'',//建筑面积id
		  		},
		  		stmtId:'',//快捷缴费 扫描出来的账单号
		  		url : '/billList?regionname=上海市',
		  		params : {
		  			startDate:'',
		  			endDate:'',
		  			payStatus: '02', //写死
		  			currentPage : 1, //页码
		  			totalCount : 0, //第几条开始
		  		},
		  		shows:false,
		  		showi:false,
				showp:false,
				// quan:false,
				quan1:false,
				quan2:false,
				queryisLastPage:false,//查询缴费是否为最后一页
				queryBillInfo : [],//查询缴费数据
				queryAllselect:false,//查询缴费全选
				wuyeId:0,
				choosehouse:0
			}
		},
		created(){
			vm=this;
		},
		mounted(){
			// this.common.checkRegisterStatus();
		},
		components:{Bill},
		
		methods:{
		
			sousuo(name){
				let url = '/getVagueSectByName?sect_name='+name+'&regionname=上海市';
				vm.receiveData.getData(vm,url,'res',function(){
						let data=vm.res.result;
						if(data!=null){
							vm.sectList=vm.res.result.sect_info;
							if(vm.sectList.length>0){
								vm.shows=true;
								var id='';
								for(var i=0;i<vm.sectList.length; i++ ) {
									if(vm.query.sect===vm.sectList[i].name) {
										id=vm.sectList[i].id;
									}
								}
								vm.query.sectID=id;
							}
							vm.showi=true;
							vm.add();
						}else{
							vm.shows=false;
							vm.showi=true;
						}
				});
			},

			addRoom(){
           		if(vm.query.sect==''||vm.query.area==''||vm.query.house==''||vm.query.unit==''){
           			MessageBox.alert('请输入完整信息');
           			return;
           		}else{
           			$('.pay').addClass('disabled');
					$('.pay').text('正在处理...')

				let url='/addhexiehouse2?area='+vm.query.area+'&houseId='+vm.choosehouse;	
				vm.receiveData.postData(vm,url,null,'res',function(){
					if(vm.res.success) {
						if(vm.res.result!=null){
							MessageBox.alert('添加房子成功').then(action =>{
								vm.$router.push("/myhouse")
							})							
						}
					}else {
						MessageBox.alert(vm.res.message).then( action =>{
								$('.pay').removeClass('disabled');
								$('.pay').text('添加房屋')	
								vm.query.sect='';
								vm.query.build='';
								vm.query.unit='';
								vm.query.house='';
								vm.query.area='';
							})
					}
				})	
	
           		}
           		
           },

			//替换搜索内容
		alertFN(s) {
			 vm.$nextTick(function(){
				var add=document.getElementById('btnd')
				add.value=s.name
				vm.query.sect = s.name;
				vm.query.sectID=s.id;
				// console.log(s.id);
					vm.shows=false;
					vm.one='two'
					vm.add();
			  })
		
		},
			


		clicki() {
			if(vm.sectList.length<=0) {
				vm.query.sect='';
				vm.query.build='';
				vm.query.unit='';
				vm.query.house='';
				var add=document.getElementById('btnd')
				add.value=''
			}
			vm.query.sect='';
			vm.query.build='';
			vm.query.unit='';
			vm.query.house='';

			vm.buildList=[];
			vm.unitList=[];
			vm.houseList=[];
			var add=document.getElementById('btnd')
				add.value='';

			vm.shows=false;
			vm.showi=false;
			vm.queryBillInfo  = [];//清空查询账单列表
			// vm.quan=false;
		},
		add() {
			vm.getCellMng(vm.query.sectID,'','','03');
			vm.getCellMng(vm.query.sectID,vm.query.build,'','02');
			vm.getCellMng(vm.query.sectID,vm.query.build,vm.query.unit,'01');
		},
		//楼宇选中
		getCouponSelected() {
			// sectList:[],//小区列表
	  		// buildList:[],//楼宇列表
	  		// unitList:[],//门牌列表
	  		// houseList:[],//室号列表
			  
			vm.getCellMng(vm.query.sectID,vm.query.build,'','02');
				
		},
		//门牌选中
		getCoupon(){
			
			vm.getCellMng(vm.query.sectID,vm.query.build,vm.query.unit,'01');
			
		},
		//室号选中
		getCoupons(event) {
			
				//获取用户数据
			//重置
		  		vm.queryBillInfo= [];//清空查询账单列表
    			vm.queryBillPage = 1;//页码重置
    			vm.queryisLastPage=false;//是否最后一页重置
    			
    			vm.choosehouse=event.target.value;
    			// 请求查询账单数据
//  			vm.queryBillList();
    			
		},
		
		
	  	//请求 楼宇 门牌 室号 数据
	  	// 参数1： 小区id 参数2： 楼宇id 参数3： 室号id 参数4： 数据类型（03：楼宇；02：门牌；01：房屋）
	  	getCellMng(sect_id,build_id,unit_id,data_type){
	  		// if ($("#phoneAjax") != null) {
			// 	$("#phoneAjax").removeClass("hidden");
			// }
			vm.showp=true;
			let url='/getHeXieCellById?regionname=上海市'
			let params = {
				sect_id, 
				build_id,
				unit_id,
				data_type 
			};
			vm.receiveData.getData(vm,url,'queryInfo',function(){
				let InfoList = vm.queryInfo.result;
				vm.queryBillInfo  = [];//清空查询账单列表
				if ("03"==data_type) {
					 vm.buildList = InfoList.build_info;
					 // vm.buildList.unshift({id:'0',name:'请选择'})
					vm.unitList = [];
					vm.houseList = [];
				}else if("02"==data_type){
					vm.unitList= InfoList.unit_info;
					// vm.unitList.unshift({id:'0',name:'请选择'})
					// vm.unitList=[];
					vm.houseList = [];
						if(vm.unitList.length==1) {
							vm.getCellMng(vm.query.sectID,vm.query.build,vm.query.unit,'01');
					}
				}else if("01"==data_type){
					vm.houseList = InfoList.house_info;

				}
				vm.showp=false;
			
			},params)
		},

	  	
		},

	}
	
</script>

<style scoped>
	.disabled{
		pointer-events: none;
	    cursor: default;
	    opacity: 0.6;
	}
	.main{
		margin: 0 .3rem;
	}
	.mint-tab-container-item{
	flex-shrink: 0;
    width: 100%;
	}
	.query-data{
		/* height: 100%; */
		padding: 0.25rem 1rem;
		margin-bottom: 0.2rem;
	}
	.virtual-input{
		width:3.4rem;
		border:1px solid #4c4c4c;
		border-radius: 5px;
		padding-left: 0.2rem;
		display: inline-block;
		height: 0.6rem;
		background-color: #fff;
		font-size:16px;
		box-sizing: border-box;
	}
	.input-row{
		padding-bottom: 0.3rem;
		font: 0.26rem/0.5rem "";
		color: #a6937c;
		height: 0.6rem;
		position:relative;
	}

   .input-row .input-uis {
	width: 3.5rem;
    position: absolute;
    top: 32px;
    left: 39px;
    height: 184px;
    z-index: 666;
    background-color: #F5F4F3;
    overflow: hidden;
    color: #000;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    overflow-y: auto;
	}
	.input-row .input-uis li {
		overflow: hidden;
		font-size: 16px;
		height:30px;
		line-height:30px;
		border-bottom: 1px solid #ccc;
		letter-spacing: 0.08rem;
		color: #707070;
		padding-left:0.2rem;
		background-color:#fff;
	}
.last{
		margin-left: -28px;
	}
	.add{
		color: #ff1a1a;
		margin-left:45px;
	}
	.btn-fixed{
		position: fixed;
		color: #fff;
        left: 0;
        right: 0;
        bottom: 0;
        height: 0.92rem;
        line-height: 0.92rem;
        text-align: center;
	}
	
	.select-btn{
		padding-left: 36px;
        background: url('../../assets/images/pay/icon_unselect_white.png') no-repeat;
        background-color: rgba(0,0,0,0.6);
        background-size: 16px;
        background-position: 15px center;
        height: 0.92rem;
        line-height: 0.92rem;
	}

	.allSelected{
		background: url('../../assets/images/pay/icon_selected_white.png') no-repeat;
		 background-color: rgba(0,0,0,0.6);
        background-size: 16px;
        background-position: 15px center;

	}

	.pay{
		font-size: 0.35rem;         
		position: fixed; 
		display: block;        
		bottom: 0;outline:none;
		height: 49px;    overflow: hidden;     
		background-color:#ff8a00;         
		color:white;letter-spacing: 2px;
		width: 100%;line-height: 49px;text-align: center;
	}
</style>
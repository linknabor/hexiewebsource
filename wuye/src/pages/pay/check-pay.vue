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
						<li :data-idd="item.id" v-for="item in sectList" :key="item.id"  v-tap="{fn:alertFN,name:item.name,id:item.id,params:item.params}">{{item.name}}</li>
					</ul>
			  	</div>

				<div class="input-row" v-show="verSion=='1'">  
					户号： <input type="text" class="virtual-input" value=""  placeholder="请输入户号" @input="toTrim" v-model="huhao" >
				</div>	
				<div v-show="verSion=='0'">
			  	<div class="input-row">
			  		楼宇：
			  		<select class="virtual-input" v-model="query.build"  @change="getCouponSelected">
						<!-- <option value="0">请选择</option> -->
			  			<option v-for="item in buildList" :value="item.id" :key="item.id">{{item.name}}</option>
			  		</select>
			  	</div>
			  	<div class="input-row">
			  		门牌：
			  		<select class="virtual-input" v-model="query.unit" @change="getCoupon">
						<!-- <option value="0">请选择</option> -->
			  			<option v-for="item in unitList" :value="item.id" :key="item.id">{{item.name}}</option>	
			  		</select>
			  	</div>
			  	<div class="input-row">
			  		室号：
			  		<select class="virtual-input" v-model="query.house" @change="getCoupons($event)">
						   <!-- <option value="0">请选择</option> -->
			  			<option v-for="(item,index) in houseList" :value="item.id" :key="index">{{item.name}}</option>	
			  		</select>
			  	</div>	
			  	<!-- <div class="input-row last">
			  		建筑面积：
			  		<input type="text" class="virtual-input classinput" value="" @blur="fixScroll" v-model="query.area">&nbsp;&nbsp;m²
			  	</div>
			  	<div class="input-row add">
			  		建筑面积允许误差±1m²以内
			  	</div> -->
		  	</div>
			</div>  
			<div style="width:100%;height:0.92rem;"></div>
			<div class="btn-fixed" id="st">
	    		<button class="pay" @click="addRoom" style="cursor:pointer;">添加房屋</button>
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
		  			area:'0',//建筑面积id
		  		},
		  		stmtId:'',//快捷缴费 扫描出来的账单号
		  		url : '/billList',
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
				choosehouse:0,
				huhao:'',//户号
				verSion:'',//判断绑定房子方式
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
				if (timer) {
					clearTimeout(timer);
				}
				timer = setTimeout(() => {
					if (name != "") {
					this.getHousin(name); 
					}else {
					vm.shows=false;
					}
				},500);
			},
			getHousin(name){
				let url = '/getVagueSectByName?sect_name='+name;
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
							// if(vm.verSion=='1') {
							// 	vm.add();
							// }
						}else{
							vm.shows=false;
							vm.showi=true;
						}
				});
			},
			//去掉空格
			toTrim(){
				vm.huhao=vm.huhao.replace(/\s/g, "")
			},
			//添加房子
			addRoom(){
				if(vm.verSion=='1') {
					vm.Neea();
				}else if(vm.verSion=='0') {
					vm.house();
				}
		    },
		   Neea(){
			//判断是否为正确户号号
			var reg = /^\d{12}$/
			if(reg.test(vm.huhao)){//为数字即通过
				let url='/hexiehouse/'+vm.huhao;
				vm.receiveData.getData(vm,url,'response',function(){
				if(vm.response.success) {
						if(vm.response.result== null) {
							alert('未查询到该房屋')
						}else {
	  	 					vm.$router.push({path:'/bindHouse/' + vm.huhao,query:{type:'1'}});
						}
				}else {
					alert(vm.response.message==null?'未查询到该房屋':vm.response.message)
				}
				})
			}else{
				MessageBox.alert('请输入正确户号');
			}   
			
		   },
		   house(){
			   	if(vm.query.sect==''||vm.query.house==''){
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
	 
	   //ios留白问题，点击事件无效
		fixScroll() {
        let u = navigator.userAgent;
        let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if (isiOS) {
          window.scrollTo(0,0);
        }
      },
			//替换搜索内容
		alertFN(s) {
			 vm.$nextTick(function(){
				var add=document.getElementById('btnd')
				add.value=s.name
				vm.query.sect = s.name;
				vm.query.sectID=s.id;
				vm.verSion=s.params.WECHAT_HOUSE_SEL_MODE;
					vm.shows=false;
					if(vm.verSion=='0') {
						vm.add();
					}
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
			vm.huhao="";
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
    			
		},
		
		
	  	//请求 楼宇 门牌 室号 数据
	  	// 参数1： 小区id 参数2： 楼宇id 参数3： 室号id 参数4： 数据类型（03：楼宇；02：门牌；01：房屋）
	  	getCellMng(sect_id,build_id,unit_id,data_type){
			vm.showp=true;
			let url='/getHeXieCellById'
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
					// vm.unitList = [];
					// vm.houseList = [];
				}else if("02"==data_type){
					vm.unitList= InfoList.unit_info;
					// vm.unitList.unshift({id:'0',name:'请选择'})
					// vm.unitList=[];
					// vm.houseList = [];
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
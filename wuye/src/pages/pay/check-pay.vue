<template>
	<div>
	<van-overlay :show="showOverlay">
    	<div class="overlay-loading">
			<van-loading type="spinner" color="#ff8a00" vertical>处理中...</van-loading>
    	</div>
    </van-overlay>
		<div class="main">
		<div class="mint-tab-container-item">
		<div class="query-data">
		  		<div class="input-row last">
			  		小区名称：
					    <!-- v-on:input="shousuo(query.sect)" -->
					  <input type="text" id="btnd" class="virtual-input classinput" value=""  placeholder="请输入小区" v-on:input="sousuo(query.sect)" v-model="query.sect">
					  	<i class="iconfont icon-chacha  classc" @click="clicki" v-show="showi"></i>
			  		<!-- <select class="virtual-input" v-model="query.sect">
						  <option v-for="item in sectList" :value="item.id" >{{item.name}}</option>   v-tap="{fn:alertFN,name:item.name}""
			  		</select> -->
					<ul class="input-uis" v-show="shows" >
						<li :data-idd="item.id" v-for="item in sectList" :key="item.id"  v-tap="{fn:alertFN,name:item.name,id:item.id,params:item.params, tel:item.tel}">{{item.name}}</li>
					</ul>
			  	</div>
				<div v-show="verSion=='1'">
					<div class="input-row last" >  
						房屋户号： <input type="text" class="virtual-input" value=""  placeholder="请输入户号" @input="vernoInput" v-model="huhao" >
					</div>
					<div class="input-row hint2">
			  			户号可咨询小区所在物业获得，可拨打以下物业电话
					</div>
					<div class="input-row last" >  
						物业电话：  <a class="link-tel" :href="'tel:'+officeTel">{{officeTel}}</a>
					</div>
			  	</div>
				<div v-show="verSion=='0'">
			  	<div class="input-row last">
			  		房屋地址：
			  		<input type="text" class="virtual-input classinput" value="" placeholder="请输入房屋地址" @input="queryAddr" v-model="cellAddr">
					<i class="iconfont icon-chacha  classc" @click="removeAddr" v-show="selectShow"></i>
					<ul class="input-uis dropdown" v-show="cellShow" >
						<li :data-idd="item.id" v-for="item in houseList" :key="item.id"  v-tap="{fn:selectCell,name:item.name,id:item.id,params:item.params}">{{item.name}}</li>
					</ul>
			  	</div>
				<div class="input-row hint">
			  		如1号101，输入1-101即可
			  	</div>
			  	<div class="input-row last">
			  		建筑面积：
			  		<input type="text" class="virtual-input classinput" value="" @blur="fixScroll" v-model="query.area">&nbsp;&nbsp;m²
			  	</div>
			  	<!-- <div class="input-row add">
			  		建筑面积允许误差±1m²以内
			  	</div> -->
				<div class="input-row selected" >
					<ul><li class="selected-addr" v-show="selectShow">{{this.query.sect}}<br>{{this.cellAddr}}</li></ul>
			  	</div>
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
	import '../../tap.js'
	import Api from '@/api/api.js'
	import {Overlay, Loading, Dialog} from 'vant'

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
		  			area: '',//建筑面积id
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
				cellAddr: '',
				cellShow: false,
				selectShow: false,
				showOverlay: false,	//遮罩
				officeTel: ''	//物业管理处电话
			}
		},
		created(){
			vm=this;
		},
		mounted(){
			// this.common.checkRegisterStatus();
		},
		components:{
			[Overlay.name]: Overlay,
			[Loading.name]: Loading,
		},
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
			vernoInput(){
				vm.huhao=vm.huhao.replace(/\s/g, "")
				if(vm.huhao.length>0){
					this.vernoShow = true
				} else {
					this.vernoShow = false
				}
			},
			//添加房子
			addRoom(){
				if(!vm.verSion){
					Dialog({message: '请选择小区'})
				}
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
				Dialog({message: '请输入正确的户号'})
			}   
			
		   },
		   house(){
			   	if(vm.query.sect==''||vm.query.house==''||vm.query.house=='0'){
					Dialog({message: '请选择小区或者房屋'})
           			return false
           		}
				Dialog.confirm({
					message: this.cellAddr + ', 确认要绑定吗？'
				}).then(()=>{
					this.showOverlay = true
					let url='/addhexiehouse2?area='+vm.query.area+'&houseId='+vm.query.house;	
					vm.receiveData.postData(vm,url,null,'res',function(){
						if(vm.res.success) {
							if(vm.res.result!=null){
								Dialog.alert({
									message: '绑定房屋成功'
								}).then(() => {
									vm.$router.push("/myhouse")
								}).catch((error)=>{
									console.log(error)
								})
							}
						}else {
							Dialog.alert({
								message: vm.res.message
							}).then(() =>{
								vm.showOverlay = false
							})
							
						}
					})
				}).catch(()=>{
					return false
				})
				return false
					
		   },
	 
	   //ios留白问题，点击事件无效
		fixScroll() {
			let u = navigator.userAgent;
			let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
			if (isiOS) {
			window.scrollTo(0,0);
			}
		},
		selectCell(s){
			vm.$nextTick(()=>{
				this.cellAddr = s.name
				this.cellShow = false
				this.selectShow = true
				this.query.house = s.id
			})
		},
		removeAddr(){
			this.cellAddr = ''
			this.selectShow = false
			this.cellShow = false
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
				vm.officeTel = s.tel
			})
		},
		queryAddr(){
			if(!this.query.sectID || !this.cellAddr) {
				return false
			}
			let param = {
				sectId: this.query.sectID,
				cellAddr: this.cellAddr
			}
			Api.getCellAddrList(param).then((response)=>{
				let data = response.data
				if(data.success){
					this.houseList = data.result.house_info
					this.cellShow = true
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

			this.removeAddr()
			this.officeTel = ''
			// vm.quan=false;
		},
		add() {
			vm.getCellMng(vm.query.sectID,'','','03');
			vm.getCellMng(vm.query.sectID,'0','','02');
			vm.getCellMng(vm.query.sectID,'0','0','01');
		},
		//楼宇选中
		getCouponSelected() {
			vm.unitList = [];
     		vm.houseList = [];
			vm.getCellMng(vm.query.sectID,vm.query.build,'','02');
			vm.getCellMng(vm.query.sectID,vm.query.build,'0','01');
		},
		//门牌选中
		getCoupon(){
			vm.houseList = [];
			if(this.query.build=="") {
				this.query.build="0";
			}
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
					 vm.buildList.unshift({id:'0',name:'请选择'})
					// vm.unitList = [];
					// vm.houseList = [];
				}else if("02"==data_type){
					vm.unitList= InfoList.unit_info;
					vm.unitList.unshift({id:'0',name:'请选择'})
					// vm.houseList = [];
				}else if("01"==data_type){
					vm.houseList = InfoList.house_info;
					vm.houseList.unshift({id:'0',name:'请选择'})
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
		margin: 1rem 0 0 0.6rem
	}
	.mint-tab-container-item{
	flex-shrink: 0;
    width: 100%;
	}
	.query-data{
		/* height: 100%; */
		padding: 0.25rem 0.8rem 0.25rem 0.8rem;
		margin-bottom: 0.2rem;
	}
	.virtual-input{
		width:3.5rem;
		border:1px solid #4c4c4c;
		border-radius: 5px;
		padding-left: 0.2rem;
		display: inline-block;
		height: 0.6rem;
		background-color: #fff;
		font-size: 0.3rem;
		box-sizing: border-box;
	}
	.input-row{
		padding-bottom: 0.3rem;
		font-size: 0.35rem;
		color: #a6937c;
		height: 0.6rem;
		position:relative;
	}

   .input-row .input-uis {
	width: 6rem;
    position: absolute;
    top: 0.8rem;
    left: 0rem;
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
		font-size: 0.3rem;
		height:30px;
		line-height:30px;
		border-bottom: 1px solid #ccc;
		/* letter-spacing: 0.08rem; */
		/* color: #707070; */
		padding-left:0.1rem;
		background-color:#fff;
		width: 100vw;
	}

	.selected {
		margin-left: -1.2rem;
		margin-top: 1rem;
		font-size: 0.3rem;
	}
	.selected-addr {
		color: #4c4c4c;
		font-size: 0.3rem;
		font-weight: bold;
	}
	.dropdown {
		width: 100vw;
	}
	.overlay-loading{
		margin-top: 5rem;
	}
	.last{
		margin-left: -0.8rem;
	}
	.add{
		color: #ff1a1a;
		margin:-0.2rem 0 0.2rem 0.8rem;
	}
	.hint{
		color: #ff1a1a;
		margin:-0.2rem 0 0 1.2rem;
		height: 0.2rem;
		font-size: 0.26rem;
	}
	.hint2{
		color: #ff1a1a;
		margin:-0.2rem 0 0.2rem 1.2rem;
		font-size: 0.26rem;
	}
	.link-tel{
		color: #0000EE;	
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
		border:none;
	}
</style>
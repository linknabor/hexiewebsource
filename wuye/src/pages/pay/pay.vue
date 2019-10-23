<template>
	<div class="main">
		<!-- 加载中 -->
		<div id="phoneErro"></div>
		<!-- class="hidden" -->
		<div id="phoneAjax" v-show="showp"> 
			<img src="../../assets/images/house/c3d7f369-4a5e-4c4a-9fb9-a4b9d274c7e1.gif" style="width:40px;height:40px;vertical-align: middle;">
		</div>

		<mt-navbar id="navBar"  v-model="selected">
	    	<mt-tab-item id="a">账单缴费</mt-tab-item>
	    	<!--  -->
	    	<mt-tab-item id="b">物业缴费</mt-tab-item>
	    	<!-- <mt-tab-item id="c">停车缴费</mt-tab-item> -->
	    	<mt-tab-item id="d">查询缴费</mt-tab-item>
	    	
	    </mt-navbar>
		<mt-tab-container v-model="selected">
		  <mt-tab-container-item id="a">
		  	<!-- 账单缴费开始-->
		    <div class="lite-divider">
	            <input placeholder="输入账单号可快速缴费" class="hidden-input" style="text-align:left;" v-model="stmtId">
	            <div class="scan-icon" @click="show"></div>
	        </div>
			<mt-button class="subBtn" size="large" @click.native="submit" >提交</mt-button>
			<mt-loadmore 
			  	:bottomMethod="quickloadBottom" 
			  	:auto-fill = "false"
			  	:bottomAllLoaded = "quickisLastPage"
				ref="loadmore1"
			  	>
			  		<Bill :bill-info="quickBillInfo" @itemClick="itemClick"></Bill>
			</mt-loadmore>
			<div style="width:100%;height:0.92rem;"></div>
			<div class="btn-fixed">
	    		<div class="fl select-btn" v-show="quan1" :class="{allSelected:quickAllselect}" @click="allSelect(quickBillInfo,'quickAllselect')">全选&nbsp;</div>
	    		<div class="pay" @click="pay('quickBillInfo','quickAllPrice','quickAllselect')">
	    			我要缴费
	    			<span>
	    				￥{{quickAllPrice}}
	    			</span>
	    		</div>
    		</div> 	  
			<!-- 账单缴费结束 -->
		  </mt-tab-container-item>
		  <mt-tab-container-item id="b">
			<!-- 物业缴费开始 -->
		    	<mt-loadmore 
			  	:bottomMethod="loadBottom" 
			  	:auto-fill = "false"
			  	:bottomAllLoaded = "bisLastPage"
				ref="loadmore2"
			  	>
			  		<Bill :bill-info="billInfo" @itemClick="itemClick"></Bill>
			 	</mt-loadmore>
			 	<div style="width:100%;height:0.92rem;"></div>
		    	<div class="btn-fixed">
		    		<div class="fl select-btn" v-show="quan2" :class="{allSelected:bAllSelect }" @click="allSelect(billInfo,'bAllSelect')">全选&nbsp;</div>
		    		<div class="pay" @click="pay('billInfo','allPrice','bAllSelect')">
		    			我要缴费
		    			<span>
		    				￥{{allPrice}}
		    			</span>
		    		</div>
        		</div> 
		    <!-- 物业缴费结束 -->
		  </mt-tab-container-item>
		  <mt-tab-container-item id="c">
			<!-- 停车缴费开始 -->
			  <mt-loadmore 
			  	:bottomMethod="carLoadBottom" 
			  	:auto-fill = "false"
			  	:bottomAllLoaded = "carisLastPage"
				ref="loadmore11"
			  >
			  	<Bill :bill-info="carBillInfo" @itemClick="itemClick"></Bill>
			  	<p></p>
			  </mt-loadmore>
			  <div style="widtt:100%;height:0.92rem;"></div>
			  	<div class="btn-fixed">
		    		<div class="fl select-btn" :class="{allSelected:carAllselect }" @click="allSelect(carBillInfo,'carAllselect')">全选&nbsp;</div>
		    		<div class="pay" @click="pay('carBillInfo','carAllPrice','carAllselect')">
		    			我要缴费
		    			<span>
		    				￥{{carAllPrice}}
		    			</span>
		    		</div>
        		</div>
			<!-- 停车缴费结束 -->
		  </mt-tab-container-item>
		  <!-- 查询缴费开始 -->
		  <mt-tab-container-item id="d">
		  	
		  	<div class="query-data">
		  		<div class="input-row">
			  		小区：
					    <!-- v-on:input="shousuo(query.sect)" -->
					  <input type="text" id="btnd" class="virtual-input classinput" value=""  placeholder="请输入小区" v-on:input="shousuo(query.sect)" v-model.trim="query.sect"   @blur="shi" @focus="huo">
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
			  		<select class="virtual-input" v-model="query.house" @change="getCoupons">
						   <!-- <option value="0">请选择</option> -->
			  			<option v-for="item in houseList" :value="item.id">{{item.name}}</option>	
			  		</select>
			  	</div>	
		  	</div>
		  	<mt-loadmore 
			  	:bottomMethod="queryLoadBottom" 
			  	:bottomAllLoaded = "queryisLastPage"
			  	:auto-fill = "false"
				ref="loadmore"
			>
			  	<Bill :bill-info="queryBillInfo" @itemClick="itemClick"></Bill>
			</mt-loadmore>
			<div style="widtt:100%;height:0.92rem;"></div>
			<div class="btn-fixed" id="st" v-show="showt">
	    		<div v-show="quan" class="fl select-btn" :class="{allSelected:queryAllselect }" @click="allSelect(queryBillInfo,'queryAllselect')">全选&nbsp;</div>
	    		<div class="pay" @click="pay('queryBillInfo','queryAllPrice','queryAllselect')">
	    			我要缴费
	    			<span>
	    				￥{{queryAllPrice}}
	    			</span>
	    		</div>
       		</div>
		  	
		  </mt-tab-container-item>
		</mt-tab-container>
	</div>
</template>
<script>
	let vm;
	let timer;
	import wx from 'weixin-js-sdk';
	import '../../tap.js'
	import axios from 'axios';
	import { MessageBox } from 'mint-ui';
	import Bill from '../../components/bill.vue';
	import {Indicator, Loadmore} from 'mint-ui';
	export default {
	  components:{Bill},

	  computed:{
	  	//物业缴费总价
	  	allPrice : function(){
	  		let ap = 0;
	  		for(let i in this.billInfo){
	  			if(this.billInfo[i].selected == true ){
	  				ap+=Number(this.billInfo[i].fee_price)
	  			}
	  		}
	  		return parseFloat(ap).toFixed(2)
	  	},
	  	//停车缴费总价
	  	carAllPrice : function(){
	  		let ap = 0;
	  		for(let i in this.carBillInfo){
	  			if(this.carBillInfo[i].selected == true){
	  				ap+=Number(this.carBillInfo[i].fee_price)
	  			}
	  		}
	  		return parseFloat(ap).toFixed(2)
	    },
	    //快捷缴费总价
	    quickAllPrice : function(){
	    	let ap = 0;
	  		for(let i in this.quickBillInfo){
	  			if(this.quickBillInfo[i].selected == true && this.quickBillInfo[i].pay_status=="02"){
	  				ap+=Number(this.quickBillInfo[i].fee_price)
	  			}
	  		}
	  		return parseFloat(ap).toFixed(2)
	    },
	    //查询缴费总价
	    queryAllPrice :function(){
			let ap = 0;
			for(let i in this.queryBillInfo){
					if(this.queryBillInfo[i].selected == true){
						ap+=Number(this.queryBillInfo[i].fee_price)
					}
			}
			  return parseFloat(ap).toFixed(2)
	    }
	  },
	  data(){
	  	return {
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
	  		bisLastPage:false,//物业缴费是否为最后一页
	  		carisLastPage:false,//停车缴费是否最后一页
	  		quickisLastPage:false,//快捷缴费是否为最后一页
	  		queryisLastPage:false,//查询缴费是否为最后一页
	  		bAllSelect:false,//物业缴费全选
	  		carAllselect:false,//停车缴费全选
	  		quickAllselect:false,//快速缴费全选
	  		queryAllselect:false,//查询缴费全选
	  		billInfo:[],//物业缴费数据
	  		carBillInfo:[],//停车缴费数据
	  		queryBillInfo : [],//查询缴费数据
	  		quickBillInfo:[],//快捷查询数据
	  		selected:'a', //选项卡 默认选中
	  		billPage :1, // 物业缴费页码
	  		carBillPage :1, //停车缴费页码
	  		queryBillPage : 1,//查询缴费页码
			quickBillpage:1,
			pay_least_month:1,
			reduceMode :1,//减免金额的方式
			shows:false,  
			id:'',
			showi:false,
			showp:false,
			showt:true,
			quan:false,
			quan1:false,
			quan2:false,
			one:'one',
			permit_skip_pay:'1',
		
	  	}
	  },
	  watch:{
		//   query:{//查询缴费数据
	  	// 		sect:'',//小区
	  	// 		build:'',//楼宇id
	  	// 		unit:'',//门牌id
	  	// 		house:'',//室号id
	  	// 	},
		//   'query.sect'(name,van) {
			 
		//   }

	  },
	  created(){
	  	vm = this;
	  },
	  mounted(){
		//   this.initSession4Test();
	  	//微信配置
	  	// this.common.checkRegisterStatus();
	  	let url = location.href.split('#')[0]
		vm.receiveData.wxconfig(vm,wx,['scanQRCode'],url);
		  
	  	//请求 停车缴费 和 物业缴费首屏数据
	  	vm.receiveData.getData(vm, vm.url, 'data',function(){
	  		vm.pay_least_month = vm.data.result.pay_least_month;
	  		vm.billInfo = vm.data.result.bill_info;//物业缴费
	  		vm.reduceMode = vm.data.result.reduce_mode;//减免方式
			vm.carBillInfo = vm.data.result.car_bill_info;//停车缴费
			vm.permit_skip_pay=vm.data.result.permit_skip_pay;//判断跳跃付款  
	  	},vm.params) ;
	  	//查询缴费 小区数据
	  	// vm.receiveData.getData(vm,'/getSect','sectList',function(){
	  	// 	vm.sectList = vm.sectList.result
		  // });

		

	  },
	  methods:{
		  //模仿线上用户信息
			//105/747/384
		  initSession4Test(){
				let url = '/initSession4Test/105';
					vm.receiveData.getData(vm,url,'Data',function(){
				});
			},

		  //搜索小区
		  shousuo(name) {
			  if(timer) {
				  clearTimeout(timer);
			  }
			  timer=setTimeout(() => {
				  this.getHousin(name);
				if(name == '') {
					this.shows=false;
				};
				// vm.add();
			  }, 400);
			   
		  },
		//获取小区
		getHousin(name) {
			let url = '/getVagueSectByName?sect_name='+name;
					vm.receiveData.getData(vm,url,'Datas',function(){
							let link=null;
							link=vm.Datas.result.sect_info;
							if(link && link.length >0) {
								vm.sectList=vm.Datas.result.sect_info;
								vm.shows=true;
								vm.showi=true;
							}else {
								vm.shows=false;
								vm.showi=true;
								// alert('没有搜索到该小区');
								// return false;
							}
				});
		},
		//叉叉
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
			vm.quan=false;
		},
		add() {
			vm.getCellMng(vm.query.sectID,'','','03');
			vm.getCellMng(vm.query.sectID,vm.query.build,'','02');
			vm.getCellMng(vm.query.sectID,vm.query.build,vm.query.unit,'01');
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
		//失去焦点
		shi() {
			if(vm.query.sect !='' && vm.sectList.length>=0) {
				
			}
			// 
			if(vm.one!='two' && vm.query.sect!=''&& vm.sectList.length>=0) {
				vm.shows=false;
				vm.showi=true;
				var id='';
				for(var i=0;i<vm.sectList.length; i++ ) {
					if(vm.query.sect===vm.sectList[i].name) {
						id=vm.sectList[i].id;
					}
				}
				this.query.sectID=id;
					vm.add();
			}
			
		},
		//获取焦点
		huo() {
			if(vm.query.sect !='' && vm.sectList.length>0) {
				vm.shows=true;
				vm.showi=true;
			}
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
			
			this.getCellMng(this.query.sectID,this.query.build,this.query.unit,'01');
			
		},
		//室号选中
		getCoupons() {
			
				//获取用户数据
			//重置
		  		vm.queryBillInfo= [];//清空查询账单列表
    			vm.queryBillPage = 1;//页码重置
    			vm.queryisLastPage=false;//是否最后一页重置
    			// 请求查询账单数据
    			vm.queryBillList();
		},
	  	//请求 楼宇 门牌 室号 数据
	  	// 参数1： 小区id 参数2： 楼宇id 参数3： 室号id 参数4： 数据类型（03：楼宇；02：门牌；01：房屋）
	  	getCellMng(sect_id,build_id,unit_id,data_type){
	  		// if ($("#phoneAjax") != null) {
			// 	$("#phoneAjax").removeClass("hidden");
			// }
			vm.showp=true;
			let url='/getHeXieCellById';
			let params = {
				sect_id, 
				build_id,
				unit_id,
				data_type 
			};
			vm.receiveData.getData(vm,url,'queryInfo',function(){
				let InfoList = vm.queryInfo.result;
				if(Array.isArray(InfoList) && InfoList.length<='0') {
					vm.showp=false;
				}else {
					vm.queryBillInfo  = [];//清空查询账单列表
					if ("03"==data_type) {
						vm.buildList = InfoList.build_info;
						vm.buildList.unshift({id:'0',name:'请选择'})
						vm.unitList = [];
						vm.houseList = [];
					}else if("02"==data_type){
						vm.unitList= InfoList.unit_info;
						vm.unitList.unshift({id:'0',name:'请选择'})
						// vm.unitList=[];
						vm.houseList = [];
							if(vm.unitList.length==1) {
								vm.getCellMng(vm.query.sectID,vm.query.build,vm.query.unit,'01');
						}
					}else if("01"==data_type){
						vm.houseList = InfoList.house_info;
						vm.houseList .unshift({id:'0',name:'请选择'})
					}
					vm.showp=false;
					// if ($("#phoneAjax") != null) {
					// 	$("#phoneAjax").addClass("hidden");
					// }
				}

			},params)
		},
		//请求查询缴费 账单列表
		queryBillList(){
			vm.showp=true;
			let url = 'billList';
			vm.params.house_id = vm.query.house;
			vm.params.sect_id = vm.query.sectID;
			vm.params.currentPage = 1;
			vm.receiveData.getData(vm,url,'queryBillInfo',function(){
				if(vm.queryBillInfo.success) {
					if(vm.queryBillInfo.result == null) {
						vm.queryBillInfo=[]
					}else {
						vm.permit_skip_pay = vm.queryBillInfo.result.permit_skip_pay;
						vm.pay_least_month = vm.queryBillInfo.result.pay_least_month;//3月份
						vm.reduceMode=vm.queryBillInfo.result.reduce_mode;  //从新赋值减免方式
						// console.log('我是减免方式:'+vm.queryBillInfo.result.reduce_mode+'我把他赋值给'+vm.reduceMode)
						if(vm.queryBillInfo.result.bill_info && vm.queryBillInfo.result.bill_info.length>0) {
							vm.queryBillInfo = vm.queryBillInfo.result.bill_info;
						}else {
							alert('没有搜索到账单')
							vm.queryBillInfo=[]
						}
					}
				}else {
					alert('没有搜索到账单')
					vm.queryBillInfo=[]
				}
				vm.showp=false;

			},vm.params)
		
		},

	  	submit(){
	  		//请求扫码快速缴费数据
	  		if(vm.stmtId == "" || vm.stmtId.length != 18){
	  			alert('请输入正确账单号');
	  			return ;
	  		}

	  		vm.quickBillpage = 1;
	  		let url = "quickPayBillList/"+vm.stmtId+"/"+vm.quickBillpage+"/"+vm.params.totalCount;
	  		vm.receiveData.getData(
	  			vm,
	  			url,
	  			'quickData',
	  			function(){
	  				if( vm.quickData.result && vm.quickData.result.bill_info.length>0){
						vm.permit_skip_pay = vm.quickData.result.permit_skip_pay;
						vm.quickBillInfo = vm.quickData.result.bill_info;
						vm.reduceMode = vm.quickData.result.reduce_mode;
						vm.pay_least_month = vm.quickData.result.pay_least_month;
	  				}else{
	  					alert('未查询到数据')
	  				}
	  			}
	  		)

	  	},
	  	queryLoadBottom(){//查询缴费上拉加载数据
	  		let tempArr = null;
	  		//页码加1
	  		vm.queryBillPage += 1;
	  		vm.params.currentPage = vm.queryBillPage;
	  		let url = 'billList';
	  		vm.receiveData.getData(vm,url,'pageData4',function(){
	  			tempArr = vm.pageData4.result.bill_info;
	  			if( tempArr && tempArr.length > 0){
  					vm.queryBillInfo =vm.queryBillInfo.concat(tempArr) //快捷缴费
	  			}else{
					  vm.queryisLastPage = true;
					  vm.quan=true;
				  }
			vm.$refs.loadmore.onBottomLoaded();
			},vm.params)
	  	},

	  	quickloadBottom(){//快捷缴费上拉加载数据
	  		//临时接收的数组
	  		let tempArr = null;
	  		//页码加1
	  		vm.quickBillpage +=1;
  			let url = "quickPayBillList/"+vm.stmtId+"/"+vm.quickBillpage+"/"+vm.params.totalCount;
	  		//请求接口数据
	  		vm.receiveData.getData(
	  			vm,
	  			url,
	  			'pageData3',
	  			function(){
	  				tempArr = vm.pageData3.result.bill_info;
	  				if( tempArr && tempArr.length > 0){
	  					vm.quickBillInfo =vm.quickBillInfo.concat(tempArr) //快捷缴费
	  					vm.quickAllselect = false;

	  				}else{
						  vm.quickisLastPage = true;
						  vm.quan1=true;
					  }
				  vm.$refs.loadmore1.onBottomLoaded()		
	  			})
			//   vm.$refs.loadmore1.onBottomLoaded()		
	  	},
	  	loadBottom(){//物业缴费 上拉加载数据
	  		//临时接收的数组
  			let tempArr = null;
	  		//页码自增 
	  		vm.billPage += 1;
			vm.params.currentPage = vm.billPage;
			//请求接口数据
			vm.receiveData.getData(
				vm,
				vm.url,
				'pageData',
				function(){
	  				tempArr = vm.pageData.result.bill_info;//物业缴费
	  				if(tempArr && tempArr.length > 0){
	  					vm.billInfo =vm.billInfo.concat(tempArr) //物业缴费
	  					vm.bAllSelect = false;
	  				}else{
						  vm.bisLastPage = true;
						 vm.quan2=true;
					  }
			 	 vm.$refs.loadmore2.onBottomLoaded()  		
	  		},vm.params)
			//   vm.$refs.loadmore2.onBottomLoaded()  		
	  	},
	  carLoadBottom(){//停车缴费，上拉加载数据
	  			//临时接收的数组
		  		let tempArr = null;
		  		//页码自增 
		  		vm.carBillPage+=1
				vm.params.currentPage = vm.carBillPage;
				//请求接口数据
				vm.receiveData.getData(
					vm,
					vm.url,
					'pageData2',
					function(){
		  				tempArr = vm.pageData2.result.car_bill_info;//停车缴费
		  				if(tempArr && tempArr.length > 0){
		  					vm.carBillInfo =vm.carBillInfo.concat(tempArr) //停车缴费
		  					vm.carAllselect = false;
		  				}else{
		  					vm.carisLastPage = true;
		  					alert("没有更多啦");
						  }
						vm.$refs.loadmore11.onBottomLoaded()  
		  			},vm.params)
	 },
	  	//点击物业缴费按钮
	  	pay(list,allPrice,allselect){//第一个参数 账单数组，第二个参数 总价 第三个参数 是否全选,所有参数 string
	  		if( vm[allPrice] < 0.01){
	  			alert('请选择账单后支付');
	  			return
			  }
	  		let selectedArr = [];//所有数据 
	  		var sel_bill_arr = new Array(); //日期
	  		if(vm[allselect] == true){
	  			//全部选中
	  			for(let i in vm[list]){
	  				var ret = jQuery.inArray(vm[list][i].service_fee_cycle,sel_bill_arr);
		  			if(-1 == ret){
		  				sel_bill_arr.push(vm[list][i].service_fee_cycle);
		  			}	
  					selectedArr.push(vm[list][i])
	  			}

	  		}else{
	  			//只选中一部分
	  			for( let i in vm[list]){
	  				if(vm[list][i].selected){
	  				var ret = jQuery.inArray(vm[list][i].service_fee_cycle,sel_bill_arr);
			  			if(-1 == ret){
			  				sel_bill_arr.push(vm[list][i].service_fee_cycle);
			  			}	
	  					selectedArr.push(vm[list][i])
	  				}
	  			}
	  		}
	  		let bills="";//id
	  		let pay_addr = selectedArr[0].pay_addr;
	  		//let pay_addr = sel_bill_arr[0].pay_addr;
	  		for(let i in selectedArr){
	  			if(selectedArr.length - 1 == i){
	  				bills+=selectedArr[i].bill_id;
	  			}else{
	  				bills+=selectedArr[i].bill_id+',';	
	  			}	  			
	  		}
	  		if(vm.pay_least_month>0){
				if(vm.pay_least_month>sel_bill_arr.length){
					alert("请至少选择"+vm.pay_least_month+"个月的账单进行支付。");
					return false;
				}
			}
	  		
			//跳转支付页
			var oriapp=vm.getUrlParam('oriApp')?'oriApp='+vm.getUrlParam('oriApp'):'';
			window.location.href =vm.basePageUrl+"wuyepay.html?"+oriapp+"#/?billIds="+bills+"&stmtId="+vm.stmtId+"&payAddr="+escape(pay_addr)+"&totalPrice="+vm[allPrice]+"&reduceMode="+vm.reduceMode;
	  		
	  	},

	  	//调用微信扫一扫接口, 成功 数据返回到stmtId,显示在input上
	  	show(){
	  	 	vm.receiveData.scan(vm,wx,'stmtId');
	  	},
	  	//点击某个选中按钮 params1:被点击按钮的下标 params2:被点击按钮所属的数组
	  	itemClick:function(index,b){//3个页面对应不同的三个数组 
	  	
	  		let len = b.length;
	  		if (b[index].pay_status!="02") {
	  			return;
			  }
			 
			 //permit_skip_pay  0允许  1不允许
			if(vm.permit_skip_pay == '1') {
				if(b[index].selected){//选中状态下
					for(let i=index;i< len;i++){
						//后面的全部取消选中
						vm.$set(b[i],'selected',false);	

					}
					//某一个点击了取消后全选消失
					vm.bAllSelect = false;
					vm.queryAllselect=false;
					vm.quickAllselect=false;
					//    console.log(vm.bAllSelect)
				}else{//未选中状态下，前面全部选中
					for(let j=index;j >= 0;j--){//
						vm.$set(b[j],'selected',true);	
						
					}
				}
			}else if(vm.permit_skip_pay == '0'){
				if(b[index].selected){//选中状态下
					vm.$set(b[index],'selected',false);	
					//某一个点击了取消后全选消失
					vm.bAllSelect = false;
					vm.queryAllselect=false;
					vm.quickAllselect=false;
					//    console.log(vm.bAllSelect)
				}else{//未选中状态下，前面全部选中
						vm.$set(b[index],'selected',true);	
					}
			}
	  		
	  	},

	  	//点击全选按钮 params:需要被全部选中的数组
	  	allSelect:function(arr,a){
	  		if(vm[a] ){//取消全选
	  			for(let i in arr){
					  vm.$set(arr[i],'selected',false);
					 
	  			}
	  		}else{//全部选中
	  			for(let i in arr){
			  		if(vm.$set(arr[i],'selected',true)){
						  vm.$set(arr[i],'selected',true);
						  
  					}			  				
	  			}
	  		}
	  		//取反
	  		vm[a] = !vm[a];
	  	}
	}
}
</script>
<style>
	.mint-tab-item-label{
		font-size: 0.3rem;
	}
</style>
<style scoped> 
	a{color:black}
	/*查询缴费*/
	.input-row .classinput {
		 padding-right:0.36rem;
		  /* user-select: none; */
	}

	.query-data{
		/* height: 100%; */
		padding: 0.25rem 1.2rem;
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
	.classc {
		position: absolute;
		right: 14px;
		top:5px;
		color: #ccc;
		font-size: 20px;
	}
	.test::-webkit-scrollbar {
		width:0.2rem;
		height:1px;
	}
	.test::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
        border-radius: 10px;
         -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        background: #fff;
    }
	.test::-webkit-scrollbar-track {/*滚动条里面轨道*/
        /* -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2); */
        border-radius: 10px;
        /* background: #EDEDED; */
    }
	.top2{
		position: relative;
		top: -0.2rem;

	}
	/*footbtn start*/
	.blank{
		padding-bottom: 1rem;
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
		overflow: hidden;
		background: #ff8a00;
		text-align: center;	
	}

	 
	/*footbtn end*/

	.main{
 		margin:0 0.3rem;
 	}

	 .mint-navbar .mint-tab-item{
	 	border-bottom: 1px solid #cdcdcb;
	 }

	 .mint-navbar .mint-tab-item.is-selected{
	 	border-bottom: 1px solid #ff8a00;
	 	margin-bottom: 0;
	 	color:#ff8a00;
	 }

	 .lite-divider{
		border-bottom: 1px solid #d4cfc8;
		-padding-left: 0.15rem;
		overflow: hidden;
		padding: 1px;
		margin-top:35px;
	}
	.hidden-input{
		height: 0.4rem;
		margin-top: 0.4rem;
		width: 4rem;
		-background: black;
		border: none;
		outline: none;
		background-color: transparent;
		font-size: 0.28rem;
		padding: 0 0.15rem 0.15rem;
	}

	.scan-icon{
		float: right;
		display: inline-block;
		height: 0.4rem;
		width: 0.4rem;
		background: url('../../assets/images/house/icon_scan.png') ;
		background-size: cover;
		margin-top: 0.36rem;
	}
	.subBtn{
		height: 0.88rem;
		line-height: 0.88rem;
		background-color: #ff8a00;
		font-size: 0.3rem;
		color: white;
		width: 6rem;
		margin: 0.6rem auto 0;
	}

	/*加载中*/
	#phoneErro {
		margin: 100px auto 0;
		top: 25%;
		left: 25%;
		width: 50%;
		text-align: center;
		height: 60px;
		line-height: 60px;
		background-color: #ccc;
		-moz-opacity: .8;
		opacity: .80;
		filter: alpha(opacity=80);
		position: fixed;
		z-index: 1999;
		overflow: auto;
		color: white;
		-moz-border-radius: 15px;
		-webkit-border-radius: 15px;
		font-size: 14px;
		display: none
	}

	#phoneAjax {
		position: fixed;
		top: 20%;
		left: 50%;
		width: 60px;
		height: 60px;
		line-height: 60px;
		margin-left: -30px;
		text-align: center;
		background-color: #ccc;
		-moz-opacity: .8;
		opacity: .80;
		filter: alpha(opacity=80);
		z-index: 1998;
		overflow: auto;
		-moz-border-radius: 15px;
		-webkit-border-radius: 15px
	}
	.hidden {
		visibility: hidden
	}
	.city {
    background-color: #FFF;
	}
	.city2 {
    background-color: #E0E0E0;
	}
</style>
<template>
	<div class="main">
		<mt-navbar id="navBar"  v-model="selected">
	    	<mt-tab-item id="a">账单缴费</mt-tab-item>
	    	<mt-tab-item id="b">物业缴费</mt-tab-item>
	    	<mt-tab-item id="c">停车缴费</mt-tab-item>
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
			  	>
			  		<Bill :bill-info="quickBillInfo" @itemClick="itemClick"></Bill>
			</mt-loadmore>	
			<div class="btn-fixed">
	    		<div class="fl select-btn" :class="{allSelected:quickAllselect}" @click="allSelect(quickBillInfo,'quickAllselect')">全选&nbsp;</div>
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
			  	>
			  		<Bill :bill-info="billInfo" @itemClick="itemClick"></Bill>
			 	</mt-loadmore>
		    	<div class="btn-fixed">
		    		<div class="fl select-btn" :class="{allSelected:bAllSelect }" @click="allSelect(billInfo,'bAllSelect')">全选&nbsp;</div>
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
			  >
			  	<Bill :bill-info="carBillInfo" @itemClick="itemClick"></Bill>
			  </mt-loadmore>
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
			  		<select class="virtual-input" v-model="query.sect">
			  			<!-- <option value="" disabled>请选择</option> -->
			  			<option v-for="item in sectList" :value="item.id" >{{item.name}}</option>	
			  			
			  		</select>
			  	</div>
			  	<div class="input-row">
			  		楼宇：
			  		<select class="virtual-input" v-model="query.build">
			  			<!-- <option value="" disabled>请选择</option> -->
			  			<option v-for="item in buildList" :value="item.id" >{{item.name}}</option>	
			  		</select>
			  	</div>
			  	<div class="input-row">
			  		门牌：
			  		<select class="virtual-input" v-model="query.unit">
			  			<!-- <option value="" disabled>请选择</option> -->
			  			<option v-for="item in unitList" :value="item.id" >{{item.name}}</option>	
			  		</select>
			  	</div>
			  	<div class="input-row">
			  		室号：
			  		<select class="virtual-input" v-model="query.house">
			  			<!-- <option value="" disabled>请选择</option> -->
			  			<option v-for="item in houseList" :value="item.id">{{item.name}}</option>	
			  		</select>
			  	</div>	
		  	</div>
		  	<mt-loadmore 
			  	:bottomMethod="queryLoadBottom" 
			  	:auto-fill = "false"
			  	:bottomAllLoaded = "queryisLastPage"
			>
			  	<Bill :bill-info="queryBillInfo" @itemClick="itemClick"></Bill>
			</mt-loadmore>
			<div class="btn-fixed">
	    		<div class="fl select-btn" :class="{allSelected:queryAllselect }" @click="allSelect(queryBillInfo,'queryAllselect')">全选&nbsp;</div>
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
	import wx from 'weixin-js-sdk';
	import Bill from '../../components/bill.vue';
	export default {
	  components:{Bill},
	  watch:{
	  	'query.sect':{//小区
	  		deep : true,
		  	handler:(val,oldval) => {
		  		//请求数据 赋新值
		  		vm.getCellMng(val, "", "", '03');//楼宇 
		  		vm.getCellMng(val, "0", "", '02');//门牌
				vm.getCellMng(val, "0", "0", '01');//房屋
		  	}	
	  	},
	  	'query.build':{//楼宇
	  		deep : true,
		  	handler:(val,oldval) => {
		  		//请求数据 赋新值
		  		vm.getCellMng(vm.query.sect, val, "", '02');//门牌
    			vm.getCellMng(vm.query.sect, val, "0", '01');//房屋
		  	}	
	  	},
	  	'query.unit':{//门牌
	  		deep : true,
		  	handler:(val,oldval) => {
		  		//请求数据 赋新值
		  		if (vm.query.build == '') {
    				vm.query.build = '0';
				}
    			vm.getCellMng(vm.query.sect, vm.query.build, val, '01');
		  	}	
	  	},
	  	'query.house':{//室号
	  		deep : true,
		  	handler:(val,oldval) => {
		  		//重置
		  		vm.queryBillInfo= [];//清空查询账单列表
    			vm.queryBillPage = 1;//页码重置
    			vm.queryisLastPage=false;//是否最后一页重置
    			//请求查询账单数据
    			vm.queryBillList();

		  	}	
	  	},
	  },
	  computed:{
	  	//物业缴费总价
	  	allPrice : function(){
	  		let ap = 0;
	  		for(let i in this.billInfo){
	  			if(this.billInfo[i].selected == true){
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
	  			if(this.quickBillInfo[i].selected == true){
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
	  			sect:'',//小区id
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
	  		reduceMode :'',//减免金额的方式
	  	}
	  },
	  created(){
	  	vm = this;
	  },
	  mounted(){
	  	//微信配置
	  	let url = location.href.split('#')[0]
	  	vm.receiveData.wxconfig(vm,wx,['scanQRCode'],url);
	  	
	  	//请求 停车缴费 和 物业缴费首屏数据
	  	vm.receiveData.getData(vm, vm.url, 'data',function(){
	  		vm.billInfo = vm.data.result.bill_info;//物业缴费
	  		vm.reduceMode = vm.data.result.reduce_mode;//减免方式
	  		vm.carBillInfo = vm.data.result.car_bill_info;//停车缴费
	  	},vm.params) ;
	  	//查询缴费 小区数据
	  	vm.receiveData.getData(vm,'getSect','sectList',function(){
	  		vm.sectList = vm.sectList.result
	  	})
	  },
	  methods:{
	  	//请求 楼宇 门牌 室号 数据
	  	// 参数1： 小区id 参数2： 楼宇id 参数3： 室号id 参数4： 数据类型（03：楼宇；02：门牌；01：房屋）
	  	getCellMng(sect_id,build_id,unit_id,data_type){
			let url = 'getcellbyid';
			let params = {
				sect_id, 
				build_id,
				unit_id,
				data_type 
			};
			vm.receiveData.getData(vm,url,'queryInfo',function(){
				//console.log(vm.queryInfo)
				let InfoList = vm.queryInfo.result;
				vm.queryBillInfo  = [];//清空查询账单列表
				if ("03"==data_type) {
				 	vm.buildList = InfoList.build_info;
					vm.unitList = [];
					vm.houseList = [];
				}else if("02"==data_type){
					vm.unitList= InfoList.unit_info;
					vm.houseList = [];
				}else if("01"==data_type){
					vm.houseList = InfoList.house_info;
				}
			},params)
		},
		//请求查询缴费 账单列表
		queryBillList(){
			let url = 'billList';
			vm.params.house_id = vm.house;
			vm.params.currentPage = 1;
			vm.receiveData.getData(vm,url,'queryBillInfo',function(){
				vm.queryBillInfo = vm.queryBillInfo.result.bill_info;
				console.log(vm.queryBillInfo)
			},vm.params)
		},

	  	submit(){
	  		//请求扫码快速缴费数据
	  		if(vm.stmtId == "" || vm.stmtId.length != 18){
	  			alert('请输入正确账单号');
	  			return 
	  		}
	  		 vm.quickBillpage = 1;
	  		let url = "quickPayBillList/"+vm.stmtId+"/"+vm.quickBillpage+"/"+vm.params.totalCount;
	  		vm.receiveData.getData(
	  			vm,
	  			url,
	  			'quickData',
	  			function(){
	  				if( vm.quickData.result && vm.quickData.result.bill_info.length>0){
						vm.quickBillInfo = vm.quickData.result.bill_info;
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
  					vm.queryBillInfo =vm.billInfo.concat(tempArr) //快捷缴费
  					vm.queryAllselect = false;
	  			}else{
  					vm.queryisLastPage = true;
	  			}
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
	  					vm.quickBillInfo =vm.billInfo.concat(tempArr) //快捷缴费
	  					vm.quickAllselect = false;
	  				}else{
	  					vm.quickisLastPage = true;
	  				}
	  			}
	  		)
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
	  				}
	  			},
	  			vm.params
	  		) 
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
	  				}
	  			},
	  			vm.params
	  		)
	  	},
	  	//点击物业缴费按钮
	  	pay(list,allPrice,allselect){//第一个参数 账单数组，第二个参数 总价 第三个参数 是否全选,所有参数 string
	  		if( vm[allPrice] < 0.1){
	  			alert('请选择账单后支付');
	  			return
	  		}
	  		let selectedArr = [];
	  		if(vm[allselect] == true){
	  			//全部选中
	  			selectedArr = vm[list];
	  		}else{
	  			//只选中一部分
	  			for( let i in vm[list]){
	  				if(vm[list][i].selected){
	  					selectedArr.push(vm[list][i])
	  				}
	  			}
	  		}
	  		let bills="";
	  		let pay_addr = selectedArr[0].pay_addr;
	  		for(let i in selectedArr){
	  			if(selectedArr.length - 1 == i){
	  				bills+=selectedArr[i].bill_id;
	  			}else{
	  				bills+=selectedArr[i].bill_id+',';	
	  			}
	  			
	  		}
	  		let url = vm.str + "paymentdetail.html?billIds="+bills+
            	"&stmtId="+vm.stmtId+"&payAddr="+escape(pay_addr)+"&totalPrice="+vm[allPrice]+"&reduceMode="+vm.reduceMode;
            	window.location.href = url;
	  	},

	  	//调用微信扫一扫接口, 成功 数据返回到stmtId,显示在input上
	  	show(){
	  	 	vm.receiveData.scan(vm,wx,'stmtId');
	  	},
	  	//点击某个选中按钮 params1:被点击按钮的下标 params2:被点击按钮所属的数组
	  	itemClick:function(index,b){//3个页面对应不同的三个数组 
	  		if(b[index].selected){
	  			vm.$set(b[index],'selected',false);
	  			//某一个点击了取消后全选消失
 	  			vm.bAllSelect = false;
	  		}else{
	  			vm.$set(b[index],'selected',true);

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
	  				vm.$set(arr[i],'selected',true);
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

	/*查询缴费*/
	
	.query-data{
		height: 100%;
		padding: 0.25rem 1.2rem;
	}
	.virtual-input{
		width:3.4rem;
		border:1px solid #4c4c4c;
		border-radius: 5px;
		padding-left: 0.2rem;
		display: inline-block;
		height: 0.5rem;
	}
	.input-row{
		padding-bottom: 0.3rem;
		font: 0.26rem/0.5rem "";
		color: #a6937c;
		height: 0.5rem;
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
        background: url('../../../static/image/icon_unselect_white.png') no-repeat;
        background-color: rgba(0,0,0,0.6);
        background-size: 16px;
        background-position: 15px center;
        height: 0.92rem;
        line-height: 0.92rem;
	}

	.allSelected{
		background: url('../../../static/image/icon_selected_white.png') no-repeat;
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
		background: url('../../../static/image/icon_scan.png') ;
		background-size: cover;
		margin-top: 10px;
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

</style>
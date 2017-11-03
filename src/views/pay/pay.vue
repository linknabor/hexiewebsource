<template>
	<div class="main">
		<mt-navbar id="navBar"  v-model="selected">
	    	<mt-tab-item id="a">账单缴费</mt-tab-item>
	    	<mt-tab-item id="b">物业缴费</mt-tab-item>
	    	<mt-tab-item id="c">停车缴费</mt-tab-item>
	    	</mt-navbar>
		<mt-tab-container v-model="selected">
		  <mt-tab-container-item id="a">
		  	<!-- 账单缴费开始-->
		    <div class="lite-divider">
	            <input placeholder="输入账单号可快速缴费" class="hidden-input" style="text-align:left;" v-model="number">
	            <div class="scan-icon" @click="show"></div>
	        </div>
			<mt-button class="subBtn" size="large" @click.native="submit" >提交</mt-button>		  
			<!-- 账单缴费结束 -->
		  </mt-tab-container-item>
		  <mt-tab-container-item id="b">
			<!-- 物业缴费开始 -->
		    	<div  class="bill-item ov" v-for="(item,index) in billInfo">
		    		<div class="select-item fl" :class="{selected:item.isSelected }" @click="select(index)">
		    		</div>
		    		<div class="fr info">
		    			<p>服务名:{{item.service_fee_name}}</p>
			    		<p>价格:{{item.fee_price}}</p>
			    		<p>地址：{{item.pay_cell_addr}}</p>
			    		<p>账期：{{item.service_fee_cycle}}</p>	
		    		</div>	
		    	</div>
		    	<div class="blank" ></div>

		    	<div class="btn-fixed">
		            <div class="select-btn fl fs14 plr15">全选</div>
		            <div class="submit-btn ov fs16" >我要缴费
		                <span style="margin-left:10px">¥全部金额</span>
		            </div>
        		</div>
		    <!-- 物业缴费结束 -->

		  </mt-tab-container-item>
		  <mt-tab-container-item id="c">
			<!-- 停车缴费开始 -->
			<!-- 停车缴费结束 -->
		  </mt-tab-container-item>
		</mt-tab-container>
	</div>
</template>
<script>
	let vm;
	export default {
	  data(){
	  	return {
	  		//-isSelected: false,//是否选中 切换样式和加减总价钱
	  		billInfo:[],//物业缴费数据
	  		carBillInfo:[],//停车缴费数据
	  		selected:'a', //选项卡 默认选中
	  		number:'', //账单缴费 账单号
	  		billPage :1, // 物业缴费页码
	  		carBillPage :1 //停车缴费页码
	  	}
	  },
	  created(){
	  	vm = this;
	  	let url = '/billList'/*+'payStatus=02'*/
	  	let params = {
	  		startDate:'',
	  		endDate:'',
	  		payStatus: '02', //写死
	  		currentPage : vm.billPage, //页码
	  		totalCount : 0, //第几条开始
	  	};
	  	alert('321');
	  	vm.receiveData.getData(vm, url, 'data',function(){
	  		//alert(1)
	  		vm.billInfo = vm.data.result.bill_info;//物业缴费
	  		vm.carBillInfo = vm.data.result.car_bill_info;//停车缴费
	  		alert(vm.billInfo)
	  	},params) 
	  	/* a = "billList?"payStatus=02&currentPage="+normalPage+"&totalCount="+o.totalCountNormal,*/
	  },
	  methods:{
	  	show(){
	  		alert(1)
	  	},
	  	select(index){
	  		//vm.billList[index].isSelected = true;
	  		if(vm.billInfo[index].isSelected){
	  			vm.$set(vm.billInfo[index],'isSelected',false)
	  		}else{
	  			vm.$set(vm.billInfo[index],'isSelected',true)
	  		}
	  		
	  		//console.log(vm.billInfo[index].isSelected)
	  		//alert(index)
	  	}
	  }
	}
</script>
<style scoped> 
 	/*item start*/
	.bill-item{
		margin-top: 0.3rem;
		overflow: hidden;
		color: #666;
		border-radius: 3px;
		border:1px solid #cdcdcb;
	}
 	.select-item {
            background: url('../../../static/image/icon_unselect.png') no-repeat ;
            background-size: 16px;
            background-position:10px center;
            width:0.7rem;
            height: 2.44rem;
            border-right: 1px solid #cdcdcb;
    }
    .selected {
    	background: url('../../../static/image/icon_selected.png') no-repeat ;
    	background-size: 16px;
        background-position:10px center;
    }

	/*item end*/

	/*footbtn start*/
	.blank{
		width:100%;
		clear:both;
		height:1rem;
	}
	.btn-fixed{
		position: fixed;
		color: #fff;
        left: 0;
        right: 0;
        bottom: 0;
        background: #000;
        height: 0.92rem;
        line-height: 0.92rem;
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
		height: 0.8rem;
		width: 0.8rem;
		background: url('../../../static/image/icon_scan.png') ;
		transform:scale(0.5);
		margin: 10px;
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
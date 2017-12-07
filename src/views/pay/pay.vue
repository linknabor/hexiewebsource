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
		    	<div class="blank"
					v-infinite-scroll="bLoadMore"
  					infinite-scroll-disabled="bisLastPage"
  					infinite-scroll-distance="0"

		    	>
		    		<Bill :bill-info="billInfo" @itemClick="itemClick"></Bill>
		    	</div>
		    	<div class="btn-fixed">
		    		<div class="fl select-btn" :class="{allSelected:bAllSelect }" @click="allSelect(billInfo)">全选&nbsp;</div>
		    		<div class="pay" @click="pay">
		    			我要缴费
		    			<span>
		    				￥{{allPrice}}
		    			</span>
		    		</div>
		            <!-- <div class="select-btn fl fs14 plr15">全选</div>
		            <div class="submit-btn ov fs16" >我要缴费
		                <span style="margin-left:10px">¥全部金额</span>
		            </div> -->
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
	import wx from 'weixin-js-sdk';
	import Bill from '../../components/bill.vue';
	export default {
	  components:{Bill},
	  computed:{
	  	allPrice : function(){
	  		let ap = 0;
	  		for(let i in this.billInfo){
	  			if(this.billInfo[i].selected == true){
	  				ap+=Number(this.billInfo[i].fee_price)
	  			}
	  		}
	  		return parseFloat(ap).toFixed(2)
	  	}
	  },
	  data(){
	  	return {
	  		index :0,
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
	  		bAllSelect:false,//物业缴费全选
	  		//-isSelected: false,//是否选中 切换样式和加减总价钱
	  		billInfo:[],//物业缴费数据
	  		carBillInfo:[],//停车缴费数据
	  		selected:'a', //选项卡 默认选中
	  		number:'', //账单缴费 账单号
	  		billPage :1, // 物业缴费页码
	  		carBillPage :1, //停车缴费页码
	  		reduceMode :'',//减免金额的方式
	  	}
	  },
	  created(){
	  	vm = this;

	  },
	  mounted(){//creaetd 改为mounted

	  	//微信配置
	  	 vm.receiveData.wxconfig(vm,wx,['scanQRCode']);
	  	
	  	//请求首屏数据
	  /*	vm.receiveData.getData(vm, vm.url, 'data',function(){
	  		vm.billInfo = vm.data.result.bill_info;//物业缴费
	  		alert(1)
	  		//console.log(vm.billInfo)
	  		vm.carBillInfo = vm.data.result.car_bill_info;//停车缴费
	  	},vm.params) */
	  },
	  methods:{
	  	//物业账单 - 上拉加载更多
	  	bLoadMore(){
	  		//临时接收的数组
	  		let tempArr = null;
			//页码自增 从2开始
			vm.params.currentPage = vm.billPage++;
			//请求接口数据
			vm.receiveData.getData(
				vm,
				vm.url,
				'data',
				function(){
	  				vm.reduceMode = vm.data.result.reduce_mode;//减免方式
	  				tempArr = vm.data.result.bill_info;//物业缴费
	  				if(tempArr.length>0){
	  					vm.billInfo =vm.billInfo.concat(tempArr) //物业缴费

	  					vm.bAllSelect = false;
	  				}else{
	  					vm.bisLastPage = true;
	  				}
	  			},
	  			vm.params
	  		) 

	  	},
	  	//点击物业缴费按钮
	  	pay(){
	  		let selectedArr = [];
	  		if(vm.allSelected == true){
	  			//全部选中
	  			selectedArr = vm.billInfo;
	  		}else{
	  			//只选中一部分
	  			for( let i in vm.billInfo){
	  				if(vm.billInfo[i].selected){
	  					selectedArr.push(vm.billInfo[i])
	  				}
	  			}
	  		}
	  		let bills="";
	  		let stmtId ="";
	  		let payAddres=selectedArr[0].pay_cell_addr;
	  		for(let i in selectedArr){
	  			bills+=selectedArr[i].bill_id+',';

	  		}
	  		//vm.$router.push('/payDetail/'+ '123459' +'/'+'65431');
	  		vm.$router.push({ name:'payDetail', params: { bills,stmtId,payAddres,totalPrice : vm.allPrice,reduceMode : vm.reduceMode }})
	  	},

	  	//调用微信扫一扫接口, 成功 数据返回到number,显示在input上
	  	show(){
	  	 	vm.receiveData.scan(vm,wx,'number')
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
	  	allSelect:function(arr){
	  		if(this.bAllSelect){//取消全选
	  			for(let i in arr){
	  				vm.$set(arr[i],'selected',false);
	  			}
	  		}else{//全部选中
	  			for(let i in arr){
	  				vm.$set(arr[i],'selected',true);
	  			}
	  		}
	  		//取反
	  		this.bAllSelect = !this.bAllSelect;
	  	}
	}
}
</script>
<style scoped> 
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
<style scoped>
	/* input:-webkit-input-placeholder {
      
         font-size: 12px;
		 font-weight: 300;
		 letter-spacing: 1px;
    } */
	.pay-detail{
		padding:0.3rem;
	}
	.user-info{
		padding:0.2rem;
		border:1px solid #cecdc9;
		border-radius: 5px;
		height: 1.7rem;
		font-size: 16px;
		line-height: 32px;
	}
	.user-info .number{
		font:0.28rem/0.8rem "";
		color: #000;
	}
	.user-info .addr{
		font:0.26rem/0.6rem "";
		color: #5b5b5b;
	}
	.fee-list{
		border:1px solid #cecdc9;
		border-bottom: none;
		border-radius: 5px;
		margin-top: 0.3rem;
	}
	.fee-list dt,.fee-list dd{
		padding: 0 0.2rem;
		border-bottom:1px solid #cecdc9;
		margin: 0;
		line-height:1.2rem;
		height: 1.2rem;
	}
	.fee-list dt p,.fee-list dd p{
		margin:0;
	}
	.fee-list dt .fee-price{
		color: #ff7200;
	}
	.fee-list dd{
		color: #7d7d7d;
	}

	.discount{
		padding: 0;
		background-color: #f6f7f1;
		border:1px solid #cecdc9;
		border-bottom: none;
		list-style: none;
		margin-top: 0.3rem;
	}
	.discount li{
		padding: 0 0.2rem;
		height: 1rem;
		line-height: 1rem;
		border-bottom:1px solid #cecdc9;
	}
	.discount .can-use{
		/*display: inline-block;*/
		width: 1.35rem;
		height: 0.45rem;
		border:1px solid #ff8a05;
		color:#ff8a05;
		font:0.22rem/0.45rem "";
		text-align: center;
		letter-spacing: 2px;
	}
	.coupon{
		color: #ff8a05;
	}

	.payCount{
		padding: 0 0.2rem;
		height: 1rem;
		line-height: 1rem;
		background-color: #f6f7f1;
		color: #ff8a05;
		border:1px solid #cecdc9;
		margin-top: 0.3rem;
	}
	.bigfont{
		font-size: 0.32rem;
		-font-weight: bold;
	}

	/*优惠劵雷彪*/
	.upton-list{
		padding: 0.3rem 0.3rem;
	}
	.upton-list .can-use{
		font:0.26rem/1rem "";
		font-size: 0.3rem;
		height: 0.6rem;
		border-bottom: 1px solid #878787;
		/*padding: 10px 10px;*/
	}
	.uptonDetail{
		position: relative;
		background:url("../../../static/image/bg_courtesy_card.png") no-repeat;
		background-size: 100% 2.15rem;
		margin:0.3rem 0;
		height: 2.15rem;
		padding:0 0.3rem 0 0.4rem;
	}
	.icon{
		background:url('../../../static/image/icon_select.png');
		background-size: cover;
		position:absolute;
		width: 0.4rem;
		height: 0.4rem;
		top: 50%;
		margin-top: -0.2rem;
		margin-left: -0.6rem;
	}
	.iconShow{
		background:url('../../../static/image/icon_selectted.png');
		background-size: cover;
		z-index: 5;
	}
	.detail-left{
		padding-top: 0.35rem;
	}
	.detail-right{
		padding-top: 0.6rem;
		text-align: center;
	}	
	.detail-left .upton-name{
		/*font:0.34rem/0.78rem "";*/
		color: #ff8a00;
		font-size: 0.4rem;
		font-weight: 600;
		letter-spacing: 0.08rem;
	}
	.detail-left .validity{
		width: 1.7rem;
		height: 0.4rem;
		line-height: 0.4rem;
		text-align: center;
		border:1px solid #8e5209;
		border-radius: 10px;
		color: #8e5209;
		margin-top: .1rem;
		margin-bottom: 0.2rem;
	}
	.detail-left .text{
		width: 4.9rem;
		font-size: .2rem;
	}

	.detail-right .upton-number{
		font:0.466rem/0.8rem "";
		color: #fff;
		font-size: .5rem;
	}
	
	.detail-right .upton-type{
		font: 0.3rem/0.6rem "";
		color: #fff;
		font-size: 0.28rem;
		letter-spacing: 0.04rem;
		margin-top: .1rem;
	}
	.btn{
		background-color:#ff8a00; 
		color:#fff;
		width: 6.7rem;
		height: 0.75rem;
		line-height: 0.75rem;
		text-align: center;
		border-radius: 10px;
		position: fixed;
		bottom: 0.5rem;
		-left: 0.4rem;
		margin: 0 auto;
	}

	.pay-btn{
		background-color: #ff8a00;
		position: fixed;
		left: 0;
		bottom: 0;
		bottom: 0;
		z-index: 3;
		width: 100%;
		height: 0.9rem;
		text-align: center;
		color: #fff;
		line-height: 0.9rem;
	}

/*发票*/
.invoice{
	border:1px solid #cecdc9;
	padding-top: 0.5rem;
	margin-top: 0.6rem;
	padding-left: 1rem;
}
.invoice .ty-label{
	padding: 0 0.2rem;
}
.form-row{
	padding-bottom: 0.4rem;
}
.t-label{padding: 20px;font-size: 14px;}
.t-input{margin-left: 8px;border: none;font-size: 12px;outline: none;}
.mint-cell-wrapper{
	border:none;
}
.qufapiao{color: red;margin-bottom: .2rem;}
.box-bg {width: 100%;opacity: .5;height: 100%;position: fixed;
	    background-color: #666;top: 0;left: 0;z-index: 100;display: none}
</style>
<template>
	<div>
		<div  class="pay-detail" v-if="selectUpton">
			<div class="box-bg"></div>
		<!-- 用户信息 -->
			<div class="user-info">
				<div class="number">户号&nbsp;{{verNumber}}</div>
				<div class="addr ov">
					<p class="fl">{{addr}}</p>
					<p class="fr">{{area}} m<sup style="font-size:0.2rem">2</sup></p>
				</div>
			</div>
			
			<!-- 费用列表 -->
			<dl v-for="item in feeList" class="fee-list ">
				<dt class="ov">
					<p class="fee-name fl" >{{item.service_fee_name}}</p>
					<p class="fee-price fr" >￥{{item.totalFee.toFixed(2)}}</p>
				</dt>
				<dd class="ov" v-for="i in item.fee_detail">
					<p class="detail-date fl">{{i.service_fee_cycle}}</p>
					<p class="detail-price fr">{{i.fee_price}}</p>
				</dd>
			</dl>
			<!-- 优惠选项 -->
			<ul class="discount">
				<li class="ov" @click="uptonList" >
					<div class="fl">现金券 <span class="can-use">&nbsp;<strong>{{uptonNumber}}</strong>&nbsp;张可用&nbsp;</span></div>
					<div class="fr">{{uptonAmount}} &gt;</div> 
				</li>
				<li class="ov coupon">
					<span class="fl" >物业优惠</span>
					<span class="fr bigfont">￥{{reduceAmt}} </span>
				</li>
			</ul>
			
			<!-- 支付金额 -->
			<div class="payCount">
				<p class="fl">支付金额</p>
				<p class="fr bigfont">￥{{count}}</p>
			</div>
			<!-- 发票 -->
			<form class="invoice">
				<div class="form-row">
					是否需要发票:&nbsp;&nbsp;
					 <input  type="radio" id="yes" value="yes" v-model="needInvoice">
  					 <label for="yes" class="ty-label">是</label>
					 <input type="radio" id="no" value="no" v-model="needInvoice">
  					 <label for="no" class="ty-label">否</label>
				</div>
				<div v-if="needInvoice == 'yes'" class="form-row">
					申请发票类型:&nbsp;&nbsp;
					 <input  type="radio" id="person" value="01" v-model="invoice_title_type">
  					 <label for="01" class="ty-label">个人</label>
					 <input type="radio" id="company" value="02" v-model="invoice_title_type">
  					 <label for="02" class="ty-label">公司</label>
				</div>
				<div class="form-row" v-if="invoice_title_type == '02'&&needInvoice=='yes' ">
					<!-- <mt-field label="发票抬头" placeholder="发票抬头" v-model="invoice_title"></mt-field> -->
					<label class="t-label">发票抬头: <input type="text" placeholder="发票抬头" v-model="invoice_title" class="t-input"> </label>
				</div>
				<div class="form-row" v-if="invoice_title_type == '02'&&needInvoice=='yes' ">
					<!-- <mt-field label="公司税号" placeholder="公司税号" v-model="credit_code"></mt-field> -->
					<label class="t-label">公司税号: <input type="text" placeholder="公司税号" v-model="credit_code" class="t-input"> </label>
				</div>
				<h4 class="qufapiao" v-show="show_invoice_flag==0">支付后请前往物业管理处领取发票</h4>
				<h4 class="qufapiao" v-show="show_invoice_flag==1">申请的电子发票预计在3个工作日内通过短信发送至您手机上,请注意查收</h4>
			</form>
			<!-- 支付按钮 -->
			<div style="height:1rem;"></div>
			<div class="pay-btn" @click="wechatPay">立即微信支付</div>
		</div>


		<!-- 优惠券列表 -->
		<div class="upton-list" v-else>
			<!-- 可用券的数量 -->
			<div class="can-use">
				<p class="fl">可用现金券</p>
				<p class="fr">共{{uptonNumber}}个</p>
			</div>
			<!-- 详情 -->
			<div class="uptonDetail" v-for=" (item,index) in uptonData" @click="showIcon(index)">
				<i class="icon" :class="{iconShow:item.selected}" ></i>
				<div class="detail-left fl">
					<div class="upton-name">{{item.title}}</div>
					<p class="validity">{{item.leftDayDes}}</p>
					<span class="text">使用期限 {{item.useStartDateStr}}至{{item.useEndDateStr}}</span>
				</div>
				<div class="detail-right fr">
					<p class="upton-number">￥{{item.amount}}</p>
					<p class="upton-type">现金券</p>
				</div>
			</div>
			<!-- 提交按钮 -->
			<div class="btn" @click="submit">确定</div>
		</div>

	</div>
</template>
<script>
	let vm;
	import wx from 'weixin-js-sdk';
	export default {
		data(){
			return {
				invoice_title:'',//发票抬头
				credit_code:'',//公司税号
				invoiceType:'person',//公司或个人
				invoice_title_type:'01',//公司或个人
				needInvoice:'yes',//是否需要发票
				uptonAmount:'未使用',
				upronAmountNumber:0,////优惠券金额 数量
				uptonData:[],
				selectUpton:true,//显示的是缴费详情页面还是选择优惠劵页面
				// routeParams:{
				// 	bills : this.$route.params.bills,//id 集合
				// 	stmtId:this.$route.params.stmtId,//扫码数据
				// 	totalPrice:this.$route.params.totalPrice,//合计金额
				// 	reduceMode:this.$route.params.reduceMode,//减免方式
				// },
				routeParams:{
					billIds : this.$route.query.billIds,//id 集合
					stmtId:this.$route.query.stmtId,//扫码数据
					totalPrice:this.$route.query.totalPrice,//合计金额
					reduceMode:this.$route.query.reduceMode,//减免方式
				},
				// routeParams:{
				// 	billIds : this.getUrlParams('billIds'),//id 集合
				// 	stmtId:this.getUrlParams('stmtId'),//扫码数据
				// 	totalPrice:this.getUrlParams('totalPrice'),//合计金额
				// 	reduceMode:this.getUrlParams('reduceMode'),//减免方式
				// },
				count:0,//实际支付金额
				hasReduce:'0',//是否有减免
				reduceAmt:'0',//减免合计
				verNumber:'',//户号
				addr:'',//地址
				area:'',//面积
				feeList:'',//费用列表
				uptonNumber:0,//优惠劵数量
				couponId:'',//优惠券id
				mianBill:'0',//优惠的账单id
				mianAmt:0.00,
				show_invoice_flag:'0',
			}
		},
		beforeCreate(){//刷新页面
			
		},
		created(){

			vm = this;		
			// location.href.reload();
			this.directRightUrl();
			if(vm.routeParams.stmtId == " "){
				vm.routeParams.stmtId = ""
			}
			// console.log('----------')
			// console.log(this.getUrlParams('billIds'))
			// let urlIndex = location.href.split('#')[0];
			// vm.receiveData.wxconfig(vm,wx,['chooseWXPay']);
			//得到实际支付金额 和是否减免 和减免了多少钱
			vm.calcReduceAmt()
		},
		watch:{
			needInvoice:function(){
				if(this.needInvoice == 'yes'){
					console.log('yes')
				}else{
					console.log('no')
				}
			}
		},
		mounted(){
			//请求费用数据

	  		console.log(this.$route.query)
	  		console.log(this.$route.query.billIds);
	  		// console.log(this.routeParams)
			let url = "getBillDetail";
			vm.receiveData.getData(
				vm,
				url,
				'data',
				function(){
					vm.show_invoice_flag = vm.data.result.show_invoice_flag
					if(vm.data.result.fee_data  == null){
						
						// var herf1 = "https://www.e-shequ.com/weixin/wuye/index.html";
						// location.href = herf1;
					}
					// console.log(vm.data);
	  				let useDate = vm.data.result.fee_data[0];
	  				let mianBill = vm.data.result.mianBill;
	  				let mianAmt = vm.data.result.mianAmt;
	  				if ( mianBill) {
						vm.mianBill = vm.data.result.mianBill;
					}
					if ( mianAmt) {
						vm.mianAmt = vm.data.result.mianAmt;
					}



	  				//户号
	  				vm.verNumber = useDate.ver_no;
	  				//地址
	  				vm.addr = useDate.cell_addr;
	  				//面积
	  				vm.area = useDate.cnst_area;
	  				//费用列表
	  				vm.feeList = useDate.fee_name;
	  			},

	  			{
	  				billId :vm.routeParams.billIds,
	  				stmtId :vm.routeParams.stmtId
	  			}
	  		);
	  		//请求优惠券数据 第一步 更新优惠券 第二步:获取优惠券
	  		let url2 = 'updateCouponStatus';
	  		vm.receiveData.getData(vm,url2,'temp',function(){	  			
	  		    //更新后 获取优惠劵
	  			let url3 = 'getCouponsPayWuYe';
	  			vm.receiveData.getData(vm,url3,'uptonData',function(){
	  				vm.uptonData = vm.uptonData.result;
	  				vm.uptonNumber = vm.uptonData.length;


	  			})
	  		});
	  		// this.common.initWechat(['onMenuShareTimeline','onMenuShareAppMessage']);
			// this.directRightUrl();
		},
		
		methods:{
			// 重定向到正确的url
			directRightUrl () {
			  let paths = window.location.href.split('#')
			  paths[1] = paths[1] || '/'
			  // 老式的#!分隔跳转
			  if (paths[0].charAt(paths[0].length - 1) !== '?') {
			    paths[0] = `${paths[0]}?`
			  }
			  if (paths[1].charAt(0) === '!') {
			     paths[1] = paths[1].substr(1)
			  }
			  let url = `${paths[0]}#${paths[1]}`
			  if (window.location.href !== url) {
			  	console.log(url);
			    window.location.href = url
			  }
			},

			//切换优惠券选中状态
			showIcon(index){
				if(vm.uptonData[index].selected){
					vm.$set(vm.uptonData[index],'selected',false);
				}else{
					vm.$set(vm.uptonData[index],'selected',true);
					for(let i in vm.uptonData){
						if(i != index && vm.uptonData[i].selected == true){
							vm.$set(vm.uptonData[i],'selected',false);
							break;							
						}
					}
				}
			},
			//根据合计金额和减免方式得到实际支付金额
			calcReduceAmt(){
				//实际支付的钱
				vm.count = vm.routeParams.totalPrice;//传过来的合计金额

				let reduced_amt = 0;//减少的钱
				let reduce_rate = 0;//减少到角还是分
				if ("0" == vm.routeParams.reduceMode) {	//不减免 
					return;
				}else if ("1" == vm.routeParams.reduceMode) {	//四舍五入至元
					reduce_rate = "1";
					reduced_amt=Math.round(vm.count*reduce_rate)/reduce_rate;
					vm.hasReduce = "1";
				}else if ("2" == vm.routeParams.reduceMode) {	//表示四舍五入至角
					reduce_rate = "10";
					reduced_amt=Math.round(vm.count*reduce_rate)/reduce_rate;
					vm.hasReduce = "1";
				}else {
					return;
				}
				vm.count = reduced_amt.toFixed(2);//合计
				vm.reduceAmt = parseFloat(vm.routeParams.totalPrice) - parseFloat(vm.count);
				vm.reduceAmt = vm.reduceAmt.toFixed(2);//减少的钱
			},
			//跳转到优惠券列表
			uptonList(){
				if(vm.uptonNumber == 0){//无优惠券
					return
				}else{
					vm.selectUpton = false;	
				}
				
			},
			submit(){//点击确定选择优惠劵
				let flag = false;
				for(let i in vm.uptonData){
					if(vm.uptonData[i].selected == true){
						flag = true;
						vm.couponId = vm.uptonData[i].id;//优惠券id
						vm.uptonAmount = '￥' + vm.uptonData[i].amount+'元';//优惠券额度
						vm.upronAmountNumber = vm.uptonData[i].amount;
						vm.count = vm.routeParams.totalPrice;//传过来的合计金额
						vm.count -= vm.uptonData[i].amount
						vm.count = vm.count.toFixed(2);//金额
						if(vm.count < 0 ){
							vm.count = 0;
						}
					}
					if(!flag){
						vm.uptonAmount = "未使用";
						vm.upronAmountNumber = 0,
						vm.couponId = '';
						vm.calcReduceAmt();
					}
					vm.selectUpton = true;
					
				};
				
				
			},
			//微信支付 post请求接口，在post成功的回调函数里调用微信支付接口
			wechatPay(){
				//vm, url, params,backdataname,callback
				//let url = 'getPrePayInfo'
				if(this.needInvoice=="yes"){
					if(this.invoice_title_type=="02"){
						if(this.invoice_title==""){
							alert("请填写发票抬头信息");
							return;
						};
						if(this.credit_code==""){
							alert("请填写发票公司税号信息");
							return;
						}
					}
				};
				$('.box-bg').css("display",'block');
				let url = "getPrePayInfo?billId="+vm.routeParams.billIds+"&stmtId="+vm.routeParams.stmtId+"&couponUnit="+vm.upronAmountNumber+"&couponNum=1&couponId="+vm.couponId+"&mianBill="+vm.mianBill+"&mianAmt="+vm.mianAmt+"&reduceAmt="+vm.reduceAmt+"&invoice_title_type="+this.invoice_title_type+"&credit_code="+this.credit_code+"&invoice_title="+this.invoice_title;
				// vm.receiveData.postData(
				// 	vm,
				// 	url,
				// 	{},
				// 	'postResultData',
				// 	function(){
				// 		let wd = vm.postResultData//微信配置数据
				// 		// alert(112233)						
				// 		//微信配置
				// 		wx.config({
		  //                   debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
		  //                   appId: wd.appid, // 必填，公众号的唯一标识
		  //                   timestamp: wd.timestamp, // 必填，生成签名的时间戳
		  //                   nonceStr: wd.noncestr, // 必填，生成签名的随机串
		  //                   signature: wd.paysign,// 必填，签名，见附录1
		  //                   jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
		  //               });
						
				// 		wx.chooseWXPay({
				// 		 	"appId":wd.appid,
			 //                "timestamp":wd.timestamp,
			 //                "nonceStr":wd.noncestr,
			 //                "package":wd.packageValue,
			 //                "signType":wd.signtype,
			 //                "paySign":wd.paysign,
							
			 //          	    success: function (res) {
			 //          	    	// alert("起步走起");
			 //          	    	// window.location.href = "https://www.baidu.com";
				// 				let reqUrl = "noticePayed?billId="+vm.routeParams.billIds+"&stmtId="+vm.routeParams.stmtId+"&tradeWaterId="+wd.trade_water_id+"&packageId="+wd.packageId+"&feePrice="+vm.routeParams.totalPrice;
								
				// 				if(vm.uptonAmount != "未使用"){
				// 					// alert("走到这一步")
				// 					reqUrl += "&couponId="+vm.couponId;
				// 					// alert(reqUrl)
				// 				}
								
				// 				// if()098765z
				// 				vm.receiveData.postData(vm,reqUrl,{},'reqUrlData',function(){
				// 					vm.payInfo = vm.reqUrlData.result;
				// 					// vm.payInfofee_data = vm.reqUrlData.result.fee_data;	  		
				// 	  				var forwardUrl = "https://test.e-shequ.com/weixin/";
				// 	  				// alert("支付成功");
				// 	  				forwardUrl += "wuye/paymentquery.html";
				// 	  				window.location.href = forwardUrl;
				// 	  			})											
			 //          	    },

			 //          	    fail:function(res) {
			 //          	    	console.log(JSON.stringify(res))
			 //          	    },
			 //          	    cancel:function(res){
			 //          	    	alert('支付取消');
				// 				// console.log(JSON.stringify(n));
				// 				// o.isPaying = false;
				// 		  //       commonui.hideAjaxLoading();
				// 		  //       $("#zzmb").hide();
				// 			}
			          	    
			 //          	});
						
		                
				// 	},
				// 	function(){
				// 		alert("单月账单的物业管理费和电梯、水泵运行费不能分开支付");
				// 		alert(err.message);
				// 	}
				// )

				this.axios.post(
					url,
					{},
				).then(
					function(res){
						let wd = JSON.parse(res.data);
						console.log(wd);
						if(wd.success == false){
							alert(wd.message);
							$('.box-bg').css("display",'none');
							return;

						}
						wx.config({
		                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
		                    appId: wd.result.appid, // 必填，公众号的唯一标识
		                    timestamp: wd.result.timestamp, // 必填，生成签名的时间戳
		                    nonceStr: wd.result.noncestr, // 必填，生成签名的随机串
		                    signature: wd.result.paysign,// 必填，签名，见附录1
		                    jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
		                });
		                wx.chooseWXPay({
						 	"appId":wd.result.appid,
			                "timestamp":wd.result.timestamp,
			                "nonceStr":wd.result.noncestr,
			                "package":wd.result.packageValue,
			                "signType":wd.result.signtype,
			                "paySign":wd.result.paysign,
							
			          	    success: function (res) {
			          	    	// alert("起步走起");
			          	    	// window.location.href = "https://www.baidu.com";
								let reqUrl = "noticePayed?billId="+vm.routeParams.billIds+"&stmtId="+vm.routeParams.stmtId+"&tradeWaterId="+wd.result.trade_water_id+"&packageId="+wd.result.packageId+"&feePrice="+vm.routeParams.totalPrice;
								
								if(vm.uptonAmount != "未使用"){
									// alert("走到这一步")
									reqUrl += "&couponId="+vm.couponId;
									// alert(reqUrl)
								}
								
								// if()098765z
								vm.receiveData.postData(vm,reqUrl,{},'reqUrlData',function(){
									vm.payInfo = vm.reqUrlData.result;
									// vm.payInfofee_data = vm.reqUrlData.result.fee_data;	  		
					  				var forwardUrl = "https://www.e-shequ.com/weixin/";
					  				// alert("支付成功");
					  				forwardUrl += "wuye/paymentquery.html";
					  				window.location.href = forwardUrl;
					  			})											
			          	    },

			          	    fail:function(res) {
			          	    	console.log(JSON.stringify(res))
			          	    },
			          	    cancel:function(res){
			          	    	alert('支付取消');
			          	    	$('.box-bg').css("display",'none');
								// console.log(JSON.stringify(n));
								// o.isPaying = false;
						  //       commonui.hideAjaxLoading();
						  //       $("#zzmb").hide();
							}
			          	    
			          	})
					}
				).catch(
					function(err){
						console.log(err);
					}
				)
			},



			notifyPaySuccess (){
				let reqUrl = "noticePayed?billId="+vm.routeParams.billIds+"&stmtId="+vm.routeParams.stmtId;
					vm.receiveData.getData(vm,reqUrl,'reqUrlData',function(){
						vm.payInfo = vm.reqUrlData.result;
						vm.payInfofee_data = vm.reqUrlData.result.fee_data;	  		
		  				//console.log(999)
		  		})
			},
			getUrlParams(){

				var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");    //构造一个含有目标参数（name）的正则表达式。
				var r = window.location.search.substr(1).match(reg);   // 用这则表达式筛选出含有目标参数(name)的 r。
				if (r != null) return unescape(r[2]); return null;     //返回参数值。
			},

		}


	}
</script>
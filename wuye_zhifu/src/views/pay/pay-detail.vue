<style scoped>
	.pay-detail{
		padding:0.3rem;
	}
	.user-info{
		padding:0.2rem;
		border:1px solid #cecdc9;
		border-radius: 5px;
		height: 1.7rem;
		font-size: 14px;
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
		/* font:0.26rem/1rem ""; */
		font-size: 0.3rem;
		height: 0.6rem;
		border-bottom: 1px solid #878787;
		padding: 10px 10px;
	}
	.uptonDetail{
		position: relative;
		background:url("../../assets/image/bg_courtesy_card.png") no-repeat;
		background-size: 100% 2.15rem;
		margin:0.3rem 0;
		height: 2.15rem;
		padding:0 0.3rem 0 0.4rem;
	}
	.icon{
		background:url('../../assets/image/icon_select.png');
		background-size: cover;
		position:absolute;
		width: 0.4rem;
		height: 0.4rem;
		top: 50%;
		margin-top: -0.2rem;
		margin-left: -0.6rem;
	}
	.iconShow{
		background:url('../../assets/image/icon_selectted.png');
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
/* 绑定房子 */
.card {
	margin-bottom: 15px;
	border: 1px solid #d4cfc8;
	border-radius: 3px;
	color: #666;
	margin-top: 20px;
}
.fs15{
	font-size: 15px;
}
.item {
	padding:20px 10px;
	border-top: 1px solid #d4cfc8;
}
.fs13  {
	font-size:13px;
}
.addse:after {
	content: '\2713';
	position: absolute;
	top: 0px;
	left: 0px;
	color: #758794;
	width: 100%;
	text-align: center;
	font-size: 1.4em;
	padding: 1px 0 0 0;
	vertical-align: text-top;
}
.chendad{
	background-color: #FFF;
	border: 1px solid #C1CACA;
	width:20px;
	height: 20px;
	border-radius: 5px;
	display: inline-block;
	position: relative;
	margin-right: 2px;
	top: 5px;
}
.chk_1 {
	display: none;
}		
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
			<dl v-for="item in feeList" class="fee-list" v-if="version=='02'">
				<dt class="ov">
					<p class="fee-name fl" >{{item.service_fee_name}}</p>
					<p class="fee-price fr" >￥{{item.totalFee.toFixed(2)}}</p>
				</dt>
				<dd class="ov" v-for="i in item.fee_detail">
					<p class="detail-date fl">{{i.service_fee_cycle}}</p>
					<p class="detail-price fr">{{i.fee_price}}</p>
				</dd>
			</dl>
			<dl v-for="item in feeList" class="fee-list" v-if="version=='01'">
				<dt class="ov">
					<p class="fee-name fl" >{{item.fee_type_show_name}}</p>
					<p class="fee-price fr" >￥{{item.fee_price}}</p>
				</dt>
				<dd class="ov">
					<p class="detail-date fl">{{item.start_date | moment("YYYY年MM月DD日")}}-{{item.end_date | moment("YYYY年MM月DD日")}}</p>
					<p class="detail-price fr">{{item.fee_price}}</p>
				</dd>
			</dl>
			<!-- 优惠选项 -->
			<ul class="discount">
				<li class="ov" @click="uptonList" >
					<div class="fl">现金券 <span class="can-use">&nbsp;<strong>{{uptonData.length}}</strong>&nbsp;张可用&nbsp;</span></div>
					<div class="fr">{{uptonAmount}} &gt;</div> 
				</li>
				<li class="ov coupon">
					<span class="fl" >物业优惠</span>
					<span class="fr bigfont">￥{{reduceAmt}} </span>
				</li>
				<!-- <li class="ov coupon"  v-show="Member" @click="mebaerherf()">
					<span class="fl" >支付立减50</span>
					<span class="fr bigfont ">立刻开通VIP></span>
				</li> -->
			</ul>
			
			<!-- 支付金额 -->
			<div class="payCount">
				<p class="fl">支付金额</p>
				<p class="fr bigfont">￥{{count}}</p>
			</div>

			<!-- 发票 v-show="yins"-->
			<form class="invoice" v-show="show_invoice=='1'">
				<div class="form-row">
					是否需要发票:&nbsp;&nbsp;
					 <input  type="radio" id="yes" value="1" v-model="needInvoice">
  					 <label for="yes" class="ty-label">是</label>
					 <input type="radio" id="no" value="0" v-model="needInvoice">
  					 <label for="no" class="ty-label">否</label>
				</div>
				<div v-if="needInvoice == '1'" class="form-row">
					申请发票类型:&nbsp;&nbsp;
					 <input  type="radio" id="person" value="01" v-model="invoice_title_type">
  					 <label for="01" class="ty-label">个人</label>
					   <!-- show_com_flag  判断公司是否允许开具公司开票 -->
					 <input v-show="show_com_flag!=='0'" type="radio" id="company" value="02" v-model="invoice_title_type">
  					 <label v-show="show_com_flag!=='0' " for="02" class="ty-label">公司</label>
				</div>
				<div class="form-row" v-show="invoice_title_type == '02'&&needInvoice=='1' ">
					<!-- <mt-field label="发票抬头" placeholder="发票抬头" v-model="invoice_title"></mt-field> -->
					<label class="t-label">发票抬头: <input type="text" placeholder="发票抬头" v-model="invoice_title" class="t-input"> </label>
				</div>
				<div class="form-row" v-show="invoice_title_type == '02'&&needInvoice=='1' ">
					<!-- <mt-field label="公司税号" placeholder="公司税号" v-model="credit_code"></mt-field> -->
					<label class="t-label">公司税号: <input type="text" placeholder="公司税号" v-model="credit_code" class="t-input"> </label>
				</div>
				<h4 class="qufapiao" v-show="show_invoice_flag==0">支付后请前往物业管理处领取发票</h4>
				<h4 class="qufapiao" v-show="show_invoice_flag==1">申请的电子发票预计在3个工作日内通过短信发送至您手机上,请注意查收</h4>
			</form>
			<!-- 支付按钮 -->
			<div class="card fs15 item" >
				<div class="ov fs13 " >
					<span  style="padding:9px 5px 5px 5px; float:left;">是否自动绑定为该房屋的业主：</span>
					<div class="ov" style="padding:0px 5px 5px 0px;">
						<label class="chendad " :class="{addse:bind_switch=='1'}" for="checkbox_a1"></label>
						<span>是&nbsp;&nbsp;</span>
						<input type="radio" id="checkbox_a1" name="flag" value="1" v-model="bind_switch" class="chk_1"  />

						<label for="checkbox_a2" class="chendad" :class="{addse:bind_switch=='0'}" ></label>
						<span>否</span>	
						<input type="radio" id="checkbox_a2" name="flag" value="0"  v-model="bind_switch" class="chk_1"  />
						</div>		
				</div>	
			</div>

			<div style="height:1rem;"></div>
			<div class="pay-btn" @click="wechatPay">立即微信支付</div>
			<!-- <div class="pay-btn" @click="add">价格</div> -->
		</div>


		<!-- 优惠券列表 -->
		<div class="upton-list" v-else>
			<!-- 可用券的数量 -->
			<div class="can-use">
				<p class="fl">可用现金券</p>
				<p class="fr">共{{uptonData.length}}个</p>
			</div>
			<!-- 详情 -->
			<div class="uptonDetail" v-for="(item,index) in uptonData" @click="showIcon(index)">
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
	import moment from "../filter/datafromat";
	export default {
		data(){
			return {
				Member:true,
				yins:false,
				invoice_title:'',//发票抬头
				credit_code:'',//公司税号
				invoice_title_type:'',//个人01或公司02 
				needInvoice:'1',//是否需要发票
				uptonAmount:'未使用',
				upronAmountNumber:0,////优惠券金额 数量
				uptonData:[
					// {
					// 	id:1,
					// 	selected:false,
					// 	title:'滴滴滴',
					// 	leftDayDes:'11',
					// 	useStartDateStr:'22',
					// 	useEndDateStr:'33',
					// 	amount:100,
					// },
				],
				allCoupons:[],
				selectUpton:true,//显示的是缴费详情页面还是选择优惠劵页面
				routeParams:{
					billIds : this.$route.query.billIds,//id 集合
					stmtId:this.$route.query.stmtId,//扫码数据
					totalPrice:this.$route.query.totalPrice,//合计金额
					reduceMode:this.$route.query.reduceMode,//减免方式
				},
				count:0,//实际支付金额
				hasReduce:'0',//是否有减免
				reduceAmt:'0',//减免合计
				verNumber:'',//户号
				addr:'',//地址
				area:'',//面积
				feeList:'',//费用列表
				couponId:'',//优惠券id
				mianBill:'0',//优惠的账单id
				mianAmt:0.00,
				show_invoice_flag:'0',
				show_com_flag:'0',//是否允许开具公司发票
				show_invoice:'',//是否显示发票
				version:'',
				bind_switch:"1",
			}
		},
		filters:{
			moment
		},
		beforeCreate(){//刷新页面
			
		},
		created(){

			vm = this;		
			
			this.directRightUrl();
			if(vm.routeParams.stmtId == " "){
				vm.routeParams.stmtId = ""
			}
			//得到实际支付金额 和是否减免 和减免了多少钱
			vm.calcReduceAmt()
			//无账单缴费
			    this.house_id = this.$route.query.house_id;
                this.sect_id = this.$route.query.sect_id;
                this.start_date=this.$route.query.start_date;
                this.end_date=this.$route.query.end_date;
                this.regionname=this.$route.query.regionname;
                this.getversion=this.$route.query.getversion;
                vm.version=this.$route.query.getversion;
		},

		mounted(){
		
			vm.common.checkRegisterStatus();

			// this.initSession4Test()
			this.getBillDetail();
			this.Coupons();

			// this.getMember(); 判断是否开通会员
			
		},
		watch:{
			invoice_title_type() {
				if(this.invoice_title_type == '01') {
					this.invoice_title='';
					this.credit_code='';
				}
			},
			needInvoice() {
				if(this.needInvoice=='0') {
					this.invoice_title_type =''
					this.invoice_title='';
					this.credit_code='';
				}
			},
			bind_switch(na,nw) {
				this.bind_switch=na;
				
			}
		},
		methods:{
			//创造用户
			initSession4Test(){
				let url = '/initSession4Test/1';
					vm.receiveData.getData(vm,url,'Data',function(){
				});
			},
			getBillDetail() {
			if(vm.version=='01'){
		       let url="getPayListStd?regionname="+this.regionname+"&house_id="+ this.house_id +
		      "&sect_id="+this.sect_id +"&start_date="+this.start_date +"&end_date="+this.end_date; 
             vm.receiveData.getData(
                vm,url,'data',function(){
						  
				    vm.show_com_flag=vm.data.result.other_bill_info[0].show_com_flag;
					vm.show_invoice_flag = vm.data.result.other_bill_info[0].show_invoice_flag;
					vm.show_invoice=vm.data.result.other_bill_info[0].show_invoice;
					if(vm.data.result.fee_data  == null){
						
						
					}
                    let useDate = vm.data.result.other_bill_info[0];
                    vm.verNumber = useDate.ver_no;
                 			//地址
                    vm.addr = useDate.cell_addr;
	
              				//面积
                    vm.area = useDate.cnst_area;
               				//费用列表
                    vm.feeList = vm.data.result.other_bill_info;

                }
             )
            }else{
			let url = "getBillDetail?regionname="+this.regionname;
			vm.receiveData.getData(
				vm,
				url,
				'data',
				function(){
					vm.show_com_flag=vm.data.result.show_com_flag;
					vm.show_invoice_flag = vm.data.result.show_invoice_flag
					vm.show_invoice=vm.data.result.show_invoice;
					if(vm.show_invoice=='1') {
								vm.invoice_title_type='01';
							}
					if(vm.data.result.fee_data  == null){
						
						// var herf1 = "https://www.e-shequ.com/weixin/wuye/index.html";
						// location.href = herf1;
					}
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
}
			},
	  		//优惠券
			Coupons(){
				//请求优惠券数据 第一步 更新优惠券 第二步:获取优惠券
				let url2 = 'updateCouponStatus';
				vm.receiveData.getData(vm,url2,'temp',function(){	  			
					//更新后 获取优惠劵
					let url3 = 'getCouponsPayWuYe';
					vm.receiveData.getData(vm,url3,'uptonDatas',function(){
						vm.uptonData = vm.uptonDatas.result;
						vm.allCoupons=vm.uptonDatas.result;
						vm.filterCouponByAmount();
					})
				});
			},
			//使用filterCouponByAmount进行金额过滤
			filterCouponByAmount() {
				var c=[];
				for(var i=0;i<vm.allCoupons.length;i++) {
					if(vm.allCoupons[i].usageCondition<=vm.count) {
						c.push(vm.allCoupons[i])
					}
				}
				vm.uptonData=c;
			},
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
			//判断是否开通vip
			// getMember() {
				// 	let url = '/getMember';
				// 		vm.receiveData.getData(vm,url,'res',function(){
				// 			if(vm.res.length!=0) {
				// 				if(vm.res[0].status==0) {
				// 					vm.Member=false;
				// 				}
				// 			} 
							
				// 	});
			// },
			// //点击vip跳转
			// mebaerherf() {
				// 	window.location.href=vm.basePageUrlpay+'orderpay.html?start=123#/kaitong'
			// },
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
				let reduce_rate = 0;//减少到角还是分减少到角还是分
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
				if(vm.uptonData.length == 0){//无优惠券
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
				if(this.invoice_title_type=="02"){
						if(this.invoice_title==""){
							alert("请填写发票抬头信息");
							return;
						};
						if(this.credit_code==""){
							alert("请填写发票公司税号信息");
							return;
						}
				};
				$('.box-bg').css("display",'block');
				let url;
				if(vm.version=='01'){
				 url = "getOtherPrePayInfo?houseId="+this.house_id+"&regionname="+this.regionname+"&start_date="+ this.start_date+"&end_date="+this.end_date+"&couponUnit="+vm.upronAmountNumber+"&couponNum=1&couponId="+vm.couponId+"&mianBill="+vm.mianBill+"&mianAmt="+vm.mianAmt+"&reduceAmt="+vm.reduceAmt+"&invoice_title_type="+this.invoice_title_type+"&credit_code="+this.credit_code+"&invoice_title="+this.invoice_title;
				}else{

			    url = "getPrePayInfo?billId="+vm.routeParams.billIds+"&stmtId="+vm.routeParams.stmtId+"&regionname="+this.regionname+"&couponUnit="+vm.upronAmountNumber+"&couponNum=1&couponId="+vm.couponId+"&mianBill="+vm.mianBill+"&mianAmt="+vm.mianAmt+"&reduceAmt="+vm.reduceAmt+"&invoice_title_type="+this.invoice_title_type+"&credit_code="+this.credit_code+"&invoice_title="+this.invoice_title;
				}
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
								let reqUrl = "noticePayed?billId="+vm.routeParams.billIds+"&stmtId="+vm.routeParams.stmtId+"&tradeWaterId="+wd.result.trade_water_id+"&packageId="+wd.result.packageId+"&feePrice="+vm.routeParams.totalPrice+"&bind_switch="+vm.bind_switch;
								if(vm.uptonAmount != "未使用"){
									// alert("走到这一步")
									reqUrl += "&couponId="+vm.couponId;
								}

								vm.receiveData.postData(vm,reqUrl,{},'reqUrlData',function(){
									vm.payInfo = vm.reqUrlData.result;
									//支付成功跳转详情
									var oriapp=vm.getUrlParam('oriApp')?'oriApp='+vm.getUrlParam('oriApp'):'';
									  window.location.href = vm.basePageUrl+'wuye/index.html?'+oriapp+'#/paymentquery';

					  			})											
			          	    },

			          	    fail:function(res) {
			          	    	console.log(JSON.stringify(res))
			          	    },
			          	    cancel:function(res){
			          	    	alert('支付取消');
			          	    	$('.box-bg').css("display",'none');
							}
			          	    
			          	})
					}
				).catch(
					function(err){
						console.log(err);
					}
				)
			},
	


		}


	}
</script>
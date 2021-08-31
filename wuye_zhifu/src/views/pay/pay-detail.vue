
<style scoped>
.pay-detail{
	padding:0.3rem;
	padding-bottom: 0;
}
.user-info{
	padding:0.2rem;
	border:1px solid #cecdc9;
	/* border-radius: 5px; */
	/* height: 1.7rem; */
	font-size: 14px;
	line-height: 32px;
}
.user-info .number{
	font:0.28rem/0.8rem "";
	color: #000;
}
.user-info .addr{
	font:0.26rem/0.6rem "";
	color: #000;
}
.name-color {
	color: #000;
}
.fee-list{
	border:1px solid #cecdc9;
	border-bottom: none;
	/* border-radius: 5px; */
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
	/* color: #ff7200; */
}
.fee-list dd{
	color: #7d7d7d;
}
.coupon{
	color: #ff8a05;
}
.payCount{
	padding: 0 0.2rem;
	height: 1.2rem;
	line-height: 1.2rem;
	/* background-color: #f6f7f1; */
	color: #ff8a05;
	border:1px solid #cecdc9;
	margin-top: 0.3rem;
}
.bigfont{
	font-size: 0.32rem;
	font-weight: bold;
}

.pay-btn{
	position: fixed;
	left: 4%;
	right: 4%;
	bottom: 0;
	z-index: 3;
	width: 92%;
	height: 0.9rem;
	text-align: center;
	color: #fff;
	line-height: 0.9rem;
	background-color: #ccc;
	font-size: 0.3rem;
}
.paycolor {
	background-color: #F69C05;
}
.btn-fix {
	position: fixed;
	left: 4%;
	right: 4%;
	bottom: 0;
	z-index: 3;
	width: 92%;
}
.personnel,.determine {
	height: 0.9rem;
	line-height: 0.9rem;
	text-align: center;
	color: #fff;
	width:3rem;
	border-radius: 5px;
	background-color: #F69C05;
	font-size:0.3rem;
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
/* 绑定房子 */
.card {
	margin-bottom: 0.3rem;
	border: 1px solid #d4cfc8;
	color: #000;
	margin-top:  0.3rem;
	padding:0 0.2rem;
}
.item {
	height: 1.2rem;
    line-height: 1.2rem;
}

.addse:after {
	content: '\2713';
    position: absolute;
    top: 0px;
    left: 0px;
    height: 19px;
    line-height: 19px;
    color: #fff;
    width: 100%;
    text-align: center;
    font-size: 0.4rem;
    border-radius: 5px;
    background-color: #ff8a05;
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
.ml {
	margin-left: 0.25rem;
}
.mr {
	margin-right: 0.25rem
}
.chk_1 {
	display: none;
}
.Manner {
	border: 1px solid #cecdc9;
	margin-bottom:0.3rem;
}
.Manner-title {
	text-align: left;
	padding: 0.2rem;
	font-size: 0.28rem;
}
.Manner-hand {
	padding: 0.3rem 0.2rem;
    border-top: 1px solid #cecdc9;
    text-align: center;
    height: 0.61rem;
    line-height: 0.61rem;
	font-size: 0.36rem;
}
.Manner-img {
	width: 0.7rem;
    height: 0.61rem;
}
.Manner-img img {
	width: 100%;
	vertical-align: middle;
}
.chendadm{
	background-color: #FFF;
	border: 1px solid #C1CACA;
	width: 0.554rem;
    height: 0.554rem;
    border-radius: 0.277rem;
	display: inline-block;
	position: relative;
	margin-right: 2px;
	margin-right: 0.036rem;
}

.Manner-bottom {
	position: relative;
	bottom:8px;
}
.addsem:after {
	content: '\2713';
    position: absolute;
    top: 0px;
    left: 0px;
	height: 0.531rem;
    line-height: 0.531rem;
	border-radius: 0.265rem;
    color: #fff;
    width: 100%;
    text-align: center;
    font-size:0.4rem;
    background-color: #ff8a05;
    padding: 1px 0 0 0;
    vertical-align: text-top;
}
.Manner-handm {
	padding: 0.3rem 0.2rem;
    border-top: 1px solid #cecdc9;
    text-align: center;
}
.Mt15 {
	position: relative;
    top: 0.26rem;
}
.Mt1{
	position: relative;
    top: 0.1rem;
	right: 0.291rem;
}
.fs3 {
	font-size: 0.36rem;
}
.Mtext {
	position: relative;
    top: 0.155rem;
	color:red;
	left: 0.1rem;
}
.Manner-handm .Mtextl {
	left:0;
}
.Manner-bd {
	border-bottom: 1px solid #cecdc9;
}
.Manner-name {
	padding:0.3rem 0.2rem;
	font-size: 0.36rem;
	height: 0.5rem;
    line-height: 0.5rem;
}
.Mannerwl {
	width: 25%;
}
.Mannerwr {
	width: 75%;
}
.Mannerwr input {
	width: 100%;
	border:0;
	text-align: center;
	outline: none;
}
.remember {
	font-size: 0.28rem;
	height: 0.6rem;
    line-height: 0.6rem;
}
.remember .rept {
	top: 4px;
	width: 15px;
	height: 15px;
}
.addseb:after {
	width: 15px;
	height: 14px;
	line-height: 14px;
	font-size: 0.3rem;
}
.Manner-dev {
	text-align: center;
	position: relative;
	color: #747474;
}
.Manner-st {
	position: absolute;
	left: 0px;
  	top: 0px;
	width:100%;
	height: 100%;
	border: none;
	outline: none;
	opacity: 0;
	appearance:none;
	-moz-appearance:none;
	-ms-appearance:none;
	-o-appearance:none;
	-webkit-appearance:none;
}
.Mannercolor {
	color:#000;
}
</style>
<template>
	<div>
		<div  class="pay-detail" v-if = request_siccess>
		<!-- 用户信息 专业版-->
			<div class="user-info" v-if="version=='02' || version=='03'">
				<!-- <div class="number">户号&nbsp;{{verNumber}}</div> -->
				<div class="addr ov" v-for="(item,index) in pay_cell" :key="index">
					<p class="fl">{{item.cell_addr}}</p>
					<p class="fr">{{item.cnst_area}} m<sup style="font-size:0.2rem">2</sup></p>
				</div>
			</div>
			<!-- 用户信息 标准版-->
			<div class="user-info" v-else>
				<div class="number">户号&nbsp;{{verNumber}}</div>
				<div class="addr ov">
					<p class="fl">{{addr}}</p>
					<p class="fr">{{area}} m<sup style="font-size:0.2rem">2</sup></p>
				</div>
			</div>

		<!-- 费用列表 -->
			<div v-if="version=='02' || version=='03'">
				<div v-for="(item,index) in feeList" :key="index">
				<div v-for="(fee_item,index) in item.fee_name" :key="index">
				<dl class="fee-list">
					<dt class="ov name-color">
						<p class="fee-name  fl" >{{fee_item.service_fee_name}}</p>
						<p class="fee-price fr" >￥{{fee_item.totalFee.toFixed(2)}}</p>
					</dt>
					<dd class="ov" v-for="(i,index) in fee_item.fee_detail"  :key="index">
						<p class="detail-date fl">{{i.service_fee_cycle}}</p>
						<p class="detail-price fr">{{i.fee_price}}</p>
					</dd>
				</dl>
				</div>
				</div>
			</div>
			<div v-if="version=='01'">
				<dl v-for="(item,index) in feeList" class="fee-list" :key="index">
					<dt class="ov name-color">
						<p class="fee-name fl" >{{item.fee_type_show_name}}</p>
						<p class="fee-price fr" >￥{{item.fee_price}}</p>
					</dt>
					<dd class="ov">
						<p class="detail-date fl">{{item.start_date | moment("YYYY年MM月DD日")}}-{{item.end_date | moment("YYYY年MM月DD日")}}</p>
						<p class="detail-price fr">{{item.fee_price}}</p>
					</dd>
				</dl>
			</div>

			<!-- 支付金额 -->
			<div class="payCount">
				<p class="fl">账单金额</p>
				<p class="fr bigfont">￥{{routeParams.totalPrice}}</p>
			</div>

			<!-- 发票 -->
			<form class="invoice" v-show="show_invoice=='1' ">
				<div class="form-row">
					是否需要发票:&nbsp;&nbsp;
					 <input  type="radio" id="yes" value="1" v-model="needInvoice">
  					 <label for="yes" class="ty-label">是</label>
          <div v-if="is_default_invoice == '1'">
            <input type="radio" id="no" value="0" v-model="needInvoice">
            <label for="no" class="ty-label">否</label>
          </div>
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
			<div class="card " v-show="bindhouse">
				<div class="ov item" >
					<span  class="fl">是否自动绑定为该房屋的业主：</span>
					<div class="ov fl  ml">
						<label class="chendad " :class="{addse:bind_switch=='1'}" for="checkbox_a1"></label>
						<span class="mr">是</span>
						<input type="radio" id="checkbox_a1" name="flag" value="1" v-model="bind_switch" class="chk_1"  />

						<label for="checkbox_a2" class="chendad" :class="{addse:bind_switch=='0'}" ></label>
						<span>否</span>
						<input type="radio" id="checkbox_a2" name="flag" value="0"  v-model="bind_switch" class="chk_1"  />
					</div>
				</div>
			</div>

			<!-- 贵州银行卡支付 -->
			<div class="Manner" v-show="cardPayService == 'true' && support_card_pay=='1'">
				<div class="Manner-title">选择支付方式</div>
				<div class="Manner-hand ov">
					<div class="Manner-img fl">
						<img src="../../assets/image/wei.png" alt="">
					</div>
					<span>微信支付</span>
					<div class="fr">
						<label class="chendadm" :class="{addsem:payType=='0'}" for="checkbox_a3"></label>
						<input type="radio" id="checkbox_a3" value="0" v-model="payType" class="chk_1"  />
					</div>
				</div>
				<div v-for="(item,i) in bankCards" :key="item.id" >
					<div class="Manner-handm ov   " style= "height: 0.61rem;line-height: 0.61rem;    font-size: 0.36rem;">
						<div class="Manner-img fl">
							<img src="../../assets/image/zhifu.png" alt="">
						</div>
						<span>银行卡 ({{item.acctNo.substring(item.acctNo.length-4)}})</span>

						<div class="fr Manner-bottom" style="bottom:0">
							<label class="chendadm " :class="{addsem:payType == i+2}" :for="'checkbox_a'+(i+7)" @click="btncard(item)"></label>
							<input type="radio" :id="'checkbox_a'+(i+7)" :value="i+2" v-model="payType" class="chk_1"  />
						</div>
					</div>

					<div class="Manner" v-show="payType == i+2">
						<div class="Manner-bd Manner-name ov">
							<div class="fl Mannerwl">姓名</div>
							<div class="fl Mannerwr">
								<input type="text" placeholder="请输入持卡人姓名" :value="item.acctName" @blur="fixScroll">
							</div>
						</div>
						<div class="Manner-bd Manner-name ov">
							<div class="fl Mannerwl">卡号</div>
							<div class="fl Mannerwr">
								<input type="text" placeholder="请输入银行卡号   " :value="item.acctNo" @blur="fixScroll" >
							</div>
						</div>
					</div>
				</div>
				<div class="Manner-hand ov">
					<div class="Manner-img fl">
						<img src="../../assets/image/zhifu.png" alt="">
					</div>
					<span>使用新卡支付</span>
					<div class="fr">
						<label class="chendadm" :class="{addsem:payType=='1'}" for="checkbox_a5"></label>
						<input type="radio" id="checkbox_a5" value="1" v-model="payType" class="chk_1"  />
					</div>
				</div>
			</div>
			<div v-show="payType == '1' ">
			<div class="Manner" >
				<div class="Manner-bd Manner-name ov">
					<div class="fl Mannerwl">姓名</div>
					<div class="fl Mannerwr">
						<input type="text" placeholder="请输入持卡人姓名"  @blur="fixScroll" v-model="customerName">
					</div>
				</div>
				<div class="Manner-bd Manner-name ov">
					<div class="fl Mannerwl">卡号</div>
					<div class="fl Mannerwr">
						<input type="text" placeholder="请输入银行卡号   "  @blur="fixScroll" v-model="acctNo">
					</div>
				</div>
				<div class="Manner-bd Manner-name ov">
					<div class="fl Mannerwl">证件类型</div>
					<div class="fl Mannerwr Manner-dev">
						<span :class="{Mannercolor : certType != ''}">{{certspan}}</span>
						<select class="Manner-st" v-model="certType" @blur="fixScroll">
							<option v-for=" item  in certTypes " :key="item.type" :value="item.type">{{item.name}}</option>
						</select>
					</div>
				</div>
				<div class="Manner-bd Manner-name ov">
					<div class="fl Mannerwl">证件号</div>
					<div class="fl Mannerwr">
						<input type="text" placeholder="请输入证件号      "  @blur="fixScroll" v-model="certId">
					</div>
				</div>
				<div class="Manner-name ov">
					<div class="fl Mannerwl">手机号</div>
					<div class="fl Mannerwr">
						<input type="text" placeholder=" 请输入预留手机号"  @blur="fixScroll" v-model="phoneNo">
					</div>
				</div>
			</div>
				<div class="ov">
					<div class="fr ml remember">
						<label class="chendad rept " :class="{addse:remember == true,addseb:remember == true}" for="checkbox_a6"></label>
						<span>记住卡号</span>
						<input type="checkbox" id="checkbox_a6" name="flag"  v-model="remember" class="chk_1"  />
					</div>
				</div>
			</div>
			<div style="height:1.5rem;"></div>
			<div v-if="selected == 'd' && is_create_qrcode == 1" class="btn-fix">
				<div class="fl personnel" @click="personnel">工作人员收费</div>
				<div class="fr determine" @click="btnPay">确定支付</div>
			</div>
			<div v-else  class="pay-btn" :class="{paycolor : payType!= ''}" @click="btnPay">确定支付</div>
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
				invoice_title:'',//发票抬头
				credit_code:'',//公司税号
				invoice_title_type:'01',//个人01或公司02
				needInvoice:'1',//是否需要发票
        is_default_invoice:'0',
				routeParams:{
					billIds : this.$route.query.billIds,//id 集合
					stmtId:this.$route.query.stmtId,//扫码数据
					totalPrice:this.$route.query.totalPrice,//合计金额
					reduceMode:this.$route.query.reduceMode,//减免方式
					payFeeType:this.$route.query.payFeeType,//01管理费，02停车费
				},
				count:0,//实际支付金额
				verNumber:'',//户号
				addr:'',//地址
				area:'',//面积
				feeList:[],//费用列表
				pay_cell:[],//房屋
				show_invoice_flag:'0',
				show_com_flag:'0',//是否允许开具公司发票
				show_invoice:'',//是否显示发票
				is_create_qrcode:'',//是否开启工作人员收费
				support_card_pay:'',
				version:'',
				bind_switch:'1',
				reduceMoney:'0',

				selected:this.$route.query.selected,//查询缴费显示工作人员收费
				cardPayService:this.$route.query.cardPayService, //控制是否可以 绑卡支付
				payType:'0',//支付方式
				customerName:'',//持卡人姓名
				acctNo:'',//卡号
				acctNNo:'',//卡号
				certType:'',//证件类型
				certId:'',//证件号
				phoneNo:'',//银行卡预留手机号
				remember:true,//记住密码
				remerbernumm:'1',//记住密码
				certTypes: [
					{type:'',name:'请选择'},
					{type:'01',name:'身份证'},
					{type:'02',name:'军官证'},
					{type:'03',name:'护照'},
					{type:'04',name:'回乡'},
					{type:'05',name:'台胞证'},
					{type:'06',name:'警官证'},
					{type:'07',name:'士兵证'},
					{type:'99',name:'其他证件'}
				],
				certspan:'请选择',
				bankCards:[],
				cardId:'',//记录卡的id
				bindhouse:true,
				request_siccess:false,//判断是否请求成功
			}
		},
		filters:{
			moment
		},
		beforeCreate(){//刷新页面

		},
		created(){
			vm = this;
			if(vm.routeParams.stmtId == " "){
				vm.routeParams.stmtId = ""
			}
			//无账单缴费
			    this.house_id = this.$route.query.house_id;
                this.sect_id = this.$route.query.sect_id;
                this.start_date=this.$route.query.start_date;
                this.end_date=this.$route.query.end_date;
                this.regionname=this.$route.query.regionname;
                this.getversion=this.$route.query.getversion;
                vm.version=this.$route.query.getversion;
		},
		mounted(){
			// vm.common.checkRegisterStatus();
			// this.initSession4Test();
			this.getBillDetail();
			if(vm.cardPayService == 'true'){
				this.getBankCard();
			}
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
				}else {
					this.invoice_title_type ='01'
				}
			},
			bind_switch(na,nw) {
				this.bind_switch=na;

			},
			remember(na,nw) { //监控是否记住卡号 0->false 1->true
				if(na == true){
					vm.remerbernumm = '1';
				}else {
					vm.remerbernumm = '0';
				}

			},
			certType(na,nw) { //证件类型
				if(na != nw) {
					for(var i = 0;i < vm.certTypes.length;i++) {
						if(na == vm.certTypes[i].type) {
							vm.certspan = vm.certTypes[i].name;
						}
					}
				}
			},
			payType(na,nw) { //监控银行卡支付类型
				if(na == '1'){
					vm.customerName = '',//姓名
					vm.acctNo = '',//卡号
					vm.certType = '',//证件类型
					vm.certId = '',//证件号
					vm.phoneNo = ''//手机号

				}
			}

		},
		methods:{
			//判断是否显示绑定房子
			bindhouses() {
				if(vm.selected == 'd' && vm.is_create_qrcode == 1) {
					vm.bindhouse = false;
				}else if (vm.selected == 'd' && vm.is_create_qrcode == 0) {
					vm.bindhouse = true;
				}else if(vm.selected != 'd' && vm.is_create_qrcode != 1) {
					vm.bindhouse = true;
				}else if (vm.selected != 'd' && vm.is_create_qrcode == 0) {
					vm.bindhouse = true;
				}
			},
			//判断支付方式
			cardpaySer() {
				if(vm.cardPayService == 'false' || vm.support_card_pay != '1'){
					vm.payType = '0';
				}
			},
			//记住卡号获取姓名 卡号
			getBankCard() {
				let url = '/bankCard';
					vm.receiveData.getData(vm,url,'res',function(){
						if(vm.res.success) {
							if(vm.res.result.length > 0) {
								vm.bankCards = vm.res.result;
							}
						}
					});
			},
			btncard(item){ //使用保存的卡
				vm.acctNNo = item.acctNo;
				vm.cardId = item.cardId;
			},
			//创造用户
			initSession4Test(){
				let url = '/initSession4Test/62';
					vm.receiveData.getData(vm,url,'Data',function(){
				});
			},
			//ios中留白问题
			fixScroll() {
				let u = navigator.userAgent;
				let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
				if (isiOS) {
				setTimeout(() => {
					const  scrollheight = document.documentElement.scrollTop || document.body.scrollTop || 0;
					window.scrollTo(0,Math.max(scrollheight, 0))
				}, 200);
				}
			},
			getBillDetail() {
				if(vm.version=='01'){
					let url="getPayListStd?regionname="+this.regionname+"&house_id="+ this.house_id +
					"&sect_id="+this.sect_id +"&start_date="+this.start_date +"&end_date="+this.end_date;

					vm.receiveData.getData(
						vm,url,'data',function(){
							vm.request_siccess = true;//判断是否请求成功显示
							vm.show_com_flag=vm.data.result.other_bill_info[0].show_com_flag;
              vm.is_default_invoice=vm.data.result.other_bill_info[0].is_default_invoice;
							vm.show_invoice_flag = vm.data.result.other_bill_info[0].show_invoice_flag;
							vm.is_create_qrcode = vm.data.result.other_bill_info[0].is_create_qrcode;
							if(vm.is_create_qrcode == 0 || vm.selected != 'd') {
								vm.show_invoice=vm.data.result.other_bill_info[0].show_invoice;
								if(vm.show_invoice=='1') {
									vm.invoice_title_type='01';
								}
							}
							vm.bindhouses();

							vm.support_card_pay = vm.data.result.other_bill_info[0].support_card_pay;
							let useDate = vm.data.result.other_bill_info[0];
							vm.verNumber = useDate.ver_no;
									//地址
							vm.addr = useDate.cell_addr;
									//面积
							vm.area = useDate.cnst_area;
									//费用列表
							vm.feeList = vm.data.result.other_bill_info;
							vm.cardpaySer();
						}
					)
            	} else {
					let url = "getBillDetail?regionname="+this.regionname;
					vm.receiveData.getData(
						vm,
						url,
						'data',
						function(){
							vm.request_siccess = true;//判断是否请求成功显示
							vm.show_com_flag=vm.data.result.show_com_flag;
              vm.is_default_invoice=vm.data.result.is_default_invoice;
							vm.show_invoice_flag = vm.data.result.show_invoice_flag;
							vm.is_create_qrcode = vm.data.result.is_create_qrcode;
							if(vm.is_create_qrcode == 0 || vm.selected != 'd') {
								vm.show_invoice=vm.data.result.show_invoice;
								if(vm.show_invoice=='1') {
									vm.invoice_title_type='01';
								}
							}
							vm.bindhouses();
							vm.support_card_pay = vm.data.result.support_card_pay;

							// let useDate = vm.data.result.fee_data[0];
							// //户号
							// vm.verNumber = useDate.ver_no;

							// 房屋 地址 面积
							vm.pay_cell = vm.data.result.pay_cell;
							//费用列表
							vm.feeList = vm.data.result.fee_data;
							vm.cardpaySer();
						},
						{
							billId :vm.routeParams.billIds,
							stmtId :vm.routeParams.stmtId
						}
					);
				}
			},
			//工作人员收费
			personnel(){
				vm.$router.push({path:'/personnel',query:{'payFeeType':vm.routeParams.payFeeType,'billId':vm.routeParams.billIds,'stmtId':vm.routeParams.stmtId,'payType':vm.payType,'regionname':vm.regionname}})
			},
			//微信支付 post请求接口，在post成功的回调函数里调用微信支付接口
			btnPay (){
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
				if(vm.payType != '') {
					if(vm.payType == '1') {
						if(vm.customerName == '' || vm.acctNo == '' || vm.certType == '' || vm.certId == ''){
							alert('请填写完整信息');
							return;
						}
						if(!(/^1[3-9][0-9]\d{8}$/.test(vm.phoneNo))) {
							alert("请填写正确的手机号！");
							return;
						}
					}
					vm.wechatPay(); //微信支付
				}
			},
			wechatPay(){
				let urlc= {
					regionname : this.regionname,
					couponNum : 1,
					invoice_title_type : this.invoice_title_type,
					credit_code : this.credit_code,
					invoice_title : this.invoice_title,
					billId : vm.routeParams.billIds,
					stmtId : vm.routeParams.stmtId,
				};
				urlc.payType = vm.payType;//支付方式
				if(vm.payType == 1) {
					urlc.customerName = vm.customerName,//姓名
					urlc.acctNo = vm.acctNo,//卡号
					urlc.certType = vm.certType,//证件类型
					urlc.certId = vm.certId,//证件号
					urlc.phoneNo = vm.phoneNo//手机号
					urlc.remember = vm.remerbernumm//记住卡号
					vm.acctNNo = vm.acctNo;
				}
				window.localStorage.setItem('paylist',JSON.stringify(urlc));
				vm.$router.push({path:'/payzhifu',query:{bind_switch:vm.bind_switch,version:vm.version,reduceMode:vm.routeParams.reduceMode,acctNNo:vm.acctNNo,cardId:vm.cardId,payFeeType:vm.routeParams.payFeeType}})

			},

		}
	}
</script>


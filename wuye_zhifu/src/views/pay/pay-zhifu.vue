<template>
<div>
    <div v-if="selectUpton">
        <div class="box-bg"></div>
       <div class="pay-div">
           <span class="fl">支付方式</span>
           <span class="fr">{{typename}}</span>
       </div>
       <div class="pay-div">
           <span class="fl">账单金额</span>
           <span class="fr padding-r">¥{{totalPrices}}</span>
       </div>
       <!-- <div>
           <div class="pay-div margin-b">
            <span class="fl">{{discounts}}</span>
            <span class="fr Color padding-r">{{property}}</span>
           </div>
            <div class="pd4">
                <div class="ov mb2">
                    <span class="fl wcolor">历年优惠</span>
                    <span class="fr Color">123</span>
                </div>
                <div class="ov">
                    <span class="fl wcolor">当年优惠</span>
                    <span class="fr Color">456</span>
                </div>
            </div>
       </div> -->
       <div class="pay-div"  @click="uptonList">
           <div class="fl">现金券
                <span class="can-use">&nbsp;<strong>{{uptonData.length}}</strong>&nbsp;张可用&nbsp;</span>
           </div>
           <span class="fr padding-r" :class="{Color:uptonAmount!='未使用'}">{{uptonAmount}} &gt;</span>
       </div>
       <div class="pay-div">
           <span class="fl">物业优惠</span>
           <span class="fr padding-r">-¥{{reduceAmt}}</span>
       </div>
       <div class="pay-div Color">
           <span class="fl">优惠总金额</span>
           <span class="fr padding-r">-¥{{tdiscount}}</span>
       </div>
       <div class="pay-div Color">
           <span class="fl">支付金额</span>
           <span class="fr padding-r">¥{{count}}</span>
       </div>
       <div class="pay-div" v-show="showyan">
           <input  class="fl payinp" type="text" placeholder="请输入验证码" v-model="captcha">
           <span class="fr btn-plain" :class="{useless:yzmstr!='获取验证码'&&yzmstr!='重新获取'}"  @click="getCaptcha">{{yzmstr}}</span>
       </div>
       <div style="height:1.5rem;"></div>
	   <div class="pay-btn"  @click="btnPay">立即支付</div>
    </div>
    <div v-else class="upton-list" >
        <!-- 可用券的数量 -->
        <div class="can-use" >
            <p class="fl">可用现金券</p>
            <p class="fr">共{{uptonData.length}}个</p>
        </div>
         <!-- 详情 -->
        <div  class="updt" >
        <div class="uptonDetail" v-for="(item,index) in uptonData" @click="showIcon(index)" :key="item.id">
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
        </div>
        <div style="width:100%;height:1.2rem"></div>
        <!-- 提交按钮 -->
		<div class="btn" @click="submit">确定</div>
    </div>
</div>    
</template>

<script>
var vm;
import wx from 'weixin-js-sdk';
export default {
   data () {
       return {
           typename:'微信支付',//支付方式
        //    bamount:'¥1000',//账单金额
        //    discounts:'物业费优惠',//如物业优惠
           totalPrice:this.$route.query.totalPrice,
           totalPrices:this.$route.query.totalPrices,//账单金额
           bind_switch:this.$route.query.bind_switch,//绑定房子
           reduceAmt:this.$route.query.reduceAmt,//物业减免合计
           version:this.$route.query.version,//版本
           reduceM:this.$route.query.reduceMode,//减免数
           cardId:this.$route.query.cardId,//记录银行卡卡id
           orderNo:'',//订单流水号
           acctNNo:this.$route.query.acctNNo,//卡号
           tdiscount:this.$route.query.reduceAmt,//优惠总金额 
           reduceMoney:0,//四舍五入减免钱
           count:0,//支付金额
           captcha:'',
           yzmtime : 60,
           yzmstr:"获取验证码", 
           showyan:true,
           ulist:{},
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
                    // 	amount:1,
                    // },
                    // {
                    // 	id:2,
                    // 	selected:false,
                    // 	title:'滴滴滴',
                    // 	leftDayDes:'11',
                    // 	useStartDateStr:'22',
                    // 	useEndDateStr:'33',
                    // 	amount:0.01,
                    // },
                    // {
                    // 	id:6,
                    // 	selected:false,
                    // 	title:'滴滴滴',
                    // 	leftDayDes:'11',
                    // 	useStartDateStr:'22',
                    // 	useEndDateStr:'33',
                    // 	amount:0.02,
                    // },
                    // {
                    // 	id:7,
                    // 	selected:false,
                    // 	title:'滴滴滴',
                    // 	leftDayDes:'11',
                    // 	useStartDateStr:'22',
                    // 	useEndDateStr:'33',
                    // 	amount:0.23,
                    // },
                    // {
                    // 	id:3,
                    // 	selected:false,
                    // 	title:'滴滴滴',
                    // 	leftDayDes:'11',
                    // 	useStartDateStr:'22',
                    // 	useEndDateStr:'33',
                    // 	amount:2,
                    // },
                    // {
                    // 	id:4,
                    // 	selected:false,
                    // 	title:'滴滴滴',
                    // 	leftDayDes:'11',
                    // 	useStartDateStr:'22',
                    // 	useEndDateStr:'33',
                    // 	amount:3,
                // },
            ],
            allCoupons:[],
            couponId:'',//优惠券id
            selectUpton:true,//显示的是缴费详情页面还是选择优惠劵页面
       };
   },
   created(){
       vm=this;
   },
   mounted() {
       vm.Carandpay(this.totalPrice)
       vm.geturl();//获取参数
       vm.Coupons();//优惠券
   },

   components: {
       
   },

   methods: {
        geturl(){
            let uls = window.localStorage.getItem('paylist');
            if(uls) {
                vm.ulist = JSON.parse(window.localStorage.getItem("paylist"));
            }
            if(vm.ulist.payType >= 1){
                vm.typename ='银行卡支付('+vm.acctNNo.substring(vm.acctNNo.length-4)+')';
            }
            if(vm.ulist.payType  > 1){
                vm.showyan=true;
            }else {
                vm.showyan=false;
            }
        },
        Carandpay(count){
			vm.count=count;
			let reduced_amt=0;
			let reduce_rate = 0; //减少到角还是分减少到角还是分
			if ("0" == vm.reduceM) {
			//不减免
			return;
			} else if ("1" == vm.reduceM) {
			//四舍五入至元
			reduce_rate = "1";
			reduced_amt = Math.round(vm.count * reduce_rate) / reduce_rate;
			vm.hasReduce = "1";
			} else if ("2" == vm.reduceM) {
			//表示四舍五入至角
			reduce_rate = "10";
			reduced_amt = Math.round(vm.count * reduce_rate) / reduce_rate;
			vm.hasReduce = "1";
			}
			else if ("4" == vm.reduceM) {
			//表示保留至角去分
			reduce_rate = "10";
			reduced_amt = Math.floor(vm.count * reduce_rate) / reduce_rate;
			vm.hasReduce = "1";
			}else if ("5" == vm.reduceM) {
			//表示保留至角入分
			reduce_rate = "10";
			reduced_amt = Math.ceil(vm.count * reduce_rate) / reduce_rate;
			vm.hasReduce = "1";
			//保留至元去角
			} else if("6" == vm.reduceM){
			reduce_rate = "1";
			reduced_amt = Math.floor(vm.count * reduce_rate) / reduce_rate;
			vm.hasReduce = "1";
			}else if("7" == vm.reduceM){
			// 保留至元入角
			reduce_rate = "1";
			reduced_amt = Math.ceil(vm.count * reduce_rate) / reduce_rate;
			vm.hasReduce = "1";
			}else {
			return;
            }
			vm.reduceMoney = parseFloat(vm.count) - parseFloat(reduced_amt.toFixed(2));//四舍五入的钱传给后端
            vm.reduceMoney = vm.reduceMoney.toFixed(2); //减少的钱 
            vm.tdiscount =  (parseFloat(vm.tdiscount) + parseFloat(vm.reduceMoney)).toFixed(2);//优惠总金额加上四舍五入
            vm.count = reduced_amt.toFixed(2); //合计
  		},
        //物业优惠
        getDiscount(){
            let url = "getDiscountDetail";
            vm.receiveData.getData(vm,url,'res',function(){
              
            })
        },
        //优惠券
        Coupons(){
            let payType;
            if(vm.ulist.payType  >= 1){
                payType = 1;
            }else {
                payType = vm.ulist.payType
            }
            //更新后 获取优惠劵
            let url3 = 'getCouponsPayWuYe?payType=' + payType;
            vm.receiveData.getData(vm,url3,'uptonDatas',function(){
                vm.uptonData = vm.uptonDatas.result;
                vm.allCoupons=vm.uptonDatas.result;
                vm.filterCouponByAmount();
            })
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
         //跳转到优惠券列表
        uptonList(){
            if(vm.uptonData.length == 0){//无优惠券
                return
            }else{
                vm.selectUpton = false;	
            }
            
        },
        //切换优惠券选中状态
        showIcon(index){
            if(vm.uptonData[index].selected){
                vm.$set(vm.uptonData[index],'selected',false);
                vm.tdiscount =  (parseFloat(vm.tdiscount) - parseFloat(vm.uptonData[index].amount)).toFixed(2);//优惠总金额
                // console.log(vm.tdiscount,parseFloat(vm.tdiscount),parseFloat(vm.uptonData[index].amount))
            }else{
                vm.$set(vm.uptonData[index],'selected',true);
                 vm.tdiscount =  (parseFloat(vm.tdiscount) + parseFloat(vm.uptonData[index].amount)).toFixed(2);//优惠总金额
                //  console.log(vm.tdiscount,parseFloat(vm.tdiscount),parseFloat(vm.uptonData[index].amount))
                for(let i in vm.uptonData){
                    if(i != index && vm.uptonData[i].selected == true){
                        vm.$set(vm.uptonData[i],'selected',false);
                         vm.tdiscount =  (parseFloat(vm.tdiscount) - parseFloat(vm.uptonData[i].amount)).toFixed(2);//优惠总金额
                        break;							
                    }
                }
            }
        },
        submit(){//点击确定选择优惠劵
            let flag = false;
            for(let i in vm.uptonData){
                if(vm.uptonData[i].selected == true){
                    flag = true;
                    vm.couponId = vm.uptonData[i].id;//优惠券id
                    vm.uptonAmount = '-￥' + vm.uptonData[i].amount+'元';//优惠券额度
                    vm.upronAmountNumber = vm.uptonData[i].amount;
                    vm.count = vm.totalPrice;//传过来的合计金额
                    vm.count -= vm.uptonData[i].amount
                    vm.count = vm.count.toFixed(2);//金额
                    if(vm.count < 0 ){
                        vm.count = 0.01;
                    }
                }
            if(!flag){
                vm.uptonAmount = "未使用";
                vm.upronAmountNumber = 0,
                vm.couponId = '';
                vm.Carandpay(vm.totalPrice)
            }
            vm.selectUpton = true;
        };
        },
        //获取验证码
        getCaptcha() {
            if(vm.yzmstr=="获取验证码"||vm.yzmstr=="重新获取"){
	       		vm.yzmstr="获取中";
	       		vm.yzmreq();
	       	}
        },
        //获取验证码
        yzmreq(){
            let url ="/getPaySmsCode?cardId="+vm.cardId;
            vm.receiveData.getData(vm,url,'res',function(){
                if(vm.res.success){
                    vm.orderNo = vm.res.result.orderNo;//获取流水号
                    vm.yzmtime=60;
                    alert("验证码已下发，请查收短信");
                    var tt=setInterval(function() {
                        vm.yzmtime--;
                        vm.yzmstr=vm.yzmtime+'秒后重新获取';
                        if(vm.yzmtime<=0) {
                            vm.yzmstr='重新获取'
                        }
                    },1000);
                  var ss = setTimeout(function(){clearInterval(tt);}, 61*1000);
                }else {
                    alert(vm.res.message == null ?'获取验证码失败':vm.message)
                }
            })	
        },
       btnPay() {
        let url;
        if(vm.version == "01"){ //标准版
			url = "getOtherPrePayInfo";
        }else {//02专业版
			url = "getPrePayInfo";
        }
        let list = {};
        list = vm.ulist;
        list.couponUnit = vm.upronAmountNumber;
        list.couponId = vm.couponId;
        if(vm.version != '01') {
            list.reduceAmt = vm.reduceMoney
        }
        if(list.payType > 1 && vm.captcha == '') {
            alert("请输入验证码");
            return;
        }
        if(list.payType > 1) {
            list.payType = '1';
            list.cardId = vm.cardId;
            list.orderNo = vm.orderNo;
            list.veriCode = vm.captcha;//验证码
        }
        $('.box-bg').css("display",'block');
        vm.axios.post(
            url,
            list,
        ).then(
        function(res){
            let wd = JSON.parse(res.data);
            console.log(wd);
            if(wd.success == false){
                alert(wd.message == null?'支付失败':wd.message);
                $('.box-bg').css("display",'none');
                return;
            }
        if(list.payType == 0){
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
                "package":wd.result.package,
                "signType":wd.result.signtype,
                "paySign":wd.result.paysign,
                
                success: function (res) {
                    // alert("起步走起");
                    let reqUrl = "noticePayed?billId="+list.billIds+"&feePrice="+vm.totalPrice+"&bind_switch="+vm.bind_switch;
                    if(vm.uptonAmount != "未使用"){
                        // alert("走到这一步")
                        reqUrl += "&couponId="+vm.couponId;
                    }
                    vm.receiveData.postData(vm,reqUrl,{},'reqUrlData',function(){
                        vm.payInfo = vm.reqUrlData.result;
                        //支付成功跳转详情
                        // var oriapp=vm.getUrlParam('oriApp')?'oriApp='+vm.getUrlParam('oriApp'):'';
                        var oriapp=vm.common.getoriApp();
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
        }else {//银行卡调转支付
            let payurl = wd.result.PAYURL;
            let pay_result = wd.result.pay_result;
            if(pay_result == 'SUCCESS'){
                vm.$router.push({path:'/blank',query:{'tradeWaterId':wd.result.trade_water_id+'?'}})
            //    var oriapp=vm.common.getoriApp();
            //    window.location.href = vm.basePageUrl+'wuye/index.html?'+oriapp+'#/paymentquery'; 
            }
            if(payurl) {
                 window.location.href=payurl;
            }
            $('.box-bg').css("display",'none');
        }    
        }).catch(
            function(err){
                console.log(err);
            }
        )
        
       }
   },

   computed: {

   },
}
</script>

<style  scoped>
.box-bg {width: 100%;opacity: .5;height: 100%;position: fixed;
	    background-color: #666;top: 0;left: 0;z-index: 100;display: none}
.pay-div {
    padding: 0 0.3rem;
    height: 1rem;
    line-height: 1rem;
    border-top: 1px solid #D2D2D2;
    border-bottom: 1px solid #D2D2D2;
    overflow:hidden;
    margin-bottom:0.3rem;
    font-weight: 600;
}
.padding-r {
    padding-right: 0.1rem;
}
.margin-b {
    margin-bottom: 0;
    border-bottom: 0.06rem solid #E3E3E3;
}
.Color {
    color:#F39B2E;
}
.wcolor {
    color :#D5D2D2;
}
.pd4 {
    padding: 0.3rem 0.4rem;
    padding-left: 0.6rem;
    border-bottom: 1px solid #E3E3E3;
    font-weight: 600;
}
.ov {
    overflow: hidden;
}
.mb2 {
    margin-bottom: 0.2rem;
}
/* .. */
.pay-div .can-use{
		width: 1.35rem;
		height: 0.45rem;
		border:1px solid #ff8a05;
		color:#ff8a05;
		font:0.22rem/0.45rem "";
		text-align: center;
		margin-left: 0.2rem;
}
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
    width: 0.43rem;
    height: 0.43rem;
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
/* ... */
.payinp {
    height: 0.5rem;
    margin-top: 0.25rem;
    border: none;
    outline: none;
    background-color: transparent;
}
.btn-plain {
    display: inline-block;
    padding: 0 0.25rem;
    height: 0.7rem;
    line-height: 0.7rem;
    color: #3b3937;
    border-radius: 3px;
    border: 1px solid #bfbfbf;
    margin-top: 0.1rem;
}
.useless {
	  background-color: #D7D5D4;
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
    background-color: #F69C05;
}
.posb {
     position: absolute;
}

</style>
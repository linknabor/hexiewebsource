<template>
<div>
    <div v-if="selectUpton">
        <div class="box-bg"></div>
       <div class="pay-div" v-show="!channelOperationInfo">
           <span class="fl">支付方式</span>
           <span class="fr">{{typename}}</span>
       </div>
       <div class="pay-div">
           <span class="fl">账单金额</span>
           <span class="fr padding-r">¥{{totalPrice}}</span>
       </div>
       <!-- 是否开通积分兑换减免 -->
       <div v-show="is_integral != '1'">
        <!-- 是否开通减免优惠    -->
       <div v-show="discounts.length != 0">
           <div class="pay-div margin-b" :class="{'margin-bb' : discounts.length == 1}">
                <span class="fl" v-show="payFeeType == '01'">{{disname}}</span>
                <span class="fl" v-show="payFeeType == '02'">{{distname}}</span>
                <span class="fr Color padding-r" v-show="discounts.length == 1">-¥{{reduceAmt}}</span>
           </div>
            <ul class="pd4" v-show="!(discounts.length == 1)">
                <li class="ov mb2"  v-for="(item,index) in discounts" :key="index">
                    <span class="fl wcolor">{{item.reduction_msg}}</span>
                    <span class="fr Color"><em v-show="item.reduction_amt > 0">-¥</em>{{item.reduction_amt}}</span>
                </li>
            </ul>
       </div>
       </div>
       <div class="pay-div"  @click="uptonList">
           <div class="fl">现金券
                <span class="can-use">&nbsp;<strong>{{uptonData.length}}</strong>&nbsp;张可用&nbsp;</span>
           </div>
           <span class="fr padding-r" :class="{Color:uptonAmount!='未使用'}">{{uptonAmount}} &gt;</span>
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
           <input  class="fl payinp" type="text" placeholder="请输入验证码" v-model="captcha" @blur="fixScroll">
           <span class="fr btn-plain" :class="{useless:yzmstr!='获取验证码'&&yzmstr!='重新获取'}"   @click="getCaptcha">{{yzmstr}}</span>
       </div>
       <div class="Color" v-show="reduceM == '1' || reduceM == '2' || reduceM == '4' || reduceM == '5' || reduceM == '6' || reduceM =='7'" style="padding: 0 0.3rem;letter-spacing: 1px;">本次支付四舍五入{{Math.abs(reduceMoney)}}元</div>
       <div class="Color" v-show="is_integral == '1'" style="padding: 0 0.3rem;letter-spacing: 1px;">本次支付您将获得{{integral}}积分</div>
        <van-overlay :show="showLoading" @click="showLoading = false" z-index="99" class-name="my-loading">
            <van-loading type="spinner" color="var(--primary-color)" :v-show="showLoading"/>
        </van-overlay>
       <div style="height:1.5rem;"></div>
       <!--选择支付方式 start-->
       <div v-show="channelOperationInfo">
        <van-radio-group v-model="payMethod" @change="onRadioChange">
            <van-cell-group>
                <van-cell clickable @click="payMethod = '21'">
                    <template #title>
                        <div class="sel-paymethod">
                            <img class="img-alipay" src="../../assets/image/alipay.png" alt="">
                            <div style="display: flex; flex-direction: column;">
                                <div class="pay-text">支付宝</div>
                                <div style="margin-left: 0.25rem;"><van-tag type="danger" color="#FF0000">{{consultMsg}}</van-tag></div>
                            </div>
                        </div>
                    </template>
                    <template #right-icon>
                        <van-radio name="21" />
                    </template>
                </van-cell>
                <van-cell clickable @click="payMethod = '06'">
                    <template #title>
                        <div class="sel-paymethod">
                            <img src="../../assets/image/wehcatpay.png" alt="">
                            <span class="pay-text">微信支付</span>
                        </div>
                    </template>
                    <template #right-icon>
                        <van-radio name="06" />
                    </template>
                </van-cell>
            </van-cell-group>
        </van-radio-group>
        <!--选择支付方式 start-->
       </div>
       
       <div class="alipay-btn" @click="btnPay" v-show="payMethod=='21'">立即支付</div>
	   <div class="pay-btn" @click="btnPay" v-show="payMethod=='06'">立即支付</div>
       
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
    <van-action-sheet v-model="showPaySheet" title="支付订单已生成" @cancel="onCancelSheet">
        <div class="content">
            <!-- <div class="title-scnd">口令已复制</div> -->
            <div style="display: flex; justify-content: center; margin-top: 0.5rem; ">
                <img class="open-zhi" src="../../assets/image/openzhi.png" alt="">
            </div>
            <div class="alipay-btn" @click="copyToken" >打开支付宝，去支付></div>
        </div>
    </van-action-sheet>
</div>    
</template>

<script>
var vm;
import wx from 'weixin-js-sdk';
import { RadioGroup, Radio, Cell, CellGroup, Loading, Overlay, Dialog, Tag, ActionSheet } from 'vant';
export default {
    data () {
        return {
            userInfo: {},
            typename:'微信支付',//支付方式
            disname:'物业费优惠',//如物业优惠
            distname:'停车费优惠',//停车优惠
            discounts:[
                //    {
                //     reduction_amt: "0.01",
                //     reduction_msg: "综合优惠",
                //     rule_type: "1",
                //    },
                //    {
                //     reduction_amt: "0.32",
                //     reduction_msg: "综合优惠1",
                //     rule_type: "2",
                //    },
            ],//如物业优惠
            ruleType:'', //减免规则类型
            reductionAmt:'',//减免金额
            reducFeePrice:'',//减免金额
            is_integral:1,//是否开通积分兑换减免 0不开通 1开通
            integral:'',//积分
            payFeeType:this.$route.query.payFeeType,//管理费01 停车费02
            totalPrice:0,//账单金额
            bind_switch:this.$route.query.bind_switch,//绑定房子
            reduceAmt:0,//物业减免合计
            version:this.$route.query.version,//版本
            reduceM:this.$route.query.reduceMode,//减免数
            cardId:this.$route.query.cardId,//记录银行卡卡id
            orderNo:'',//订单流水号
            acctNNo:this.$route.query.acctNNo,//卡号
            hasReduce:'0',//是否有减免
            tdiscount:0.00,//优惠总金额 
            reduceMoney:0,//四舍五入减免钱
            count:0,//支付金额
            countmong:0,//记录支付减免后的金额
            counttoll:0,//记录支付减免后的金额
            captcha:'',
            yzmtime : 60,
            yzmstr:"获取验证码", 
            showyan:false,
            ulist:{},
            uptonAmount:'未使用',
            upronAmountNumber:0,////优惠券金额 数量
            uptonData:[],
            allCoupons:[
                //   {
                //     	id:1,
                //     	selected:false,
                //     	title:'滴滴滴',
                //     	leftDayDes:'11',
                //     	useStartDateStr:'22',
                //     	useEndDateStr:'33',
                //         amount:1,
                //         usageCondition:0,
                //     },
            ],
            couponId:'',//优惠券id
            selectUpton:true,//显示的是缴费详情页面还是选择优惠劵页面
            sUptop:'No',//是否锁定优惠券
            payMethod: '06',  //微信支付或者吱口令
            showLoading: false,
            aliuserid: '',
            sectId: '',
            channelOperationInfo: '',    //支付宝吱口令渠道参数
            orderId: '',    //支付宝吱口令支付会提前生成订单号，后面当trade_water_id用
            shareToken: '',  //吱口令
            consultMsg: '', //优惠信息
            showPaySheet: false
        };
    },
    created(){
        vm=this;
    },
    mounted() {
        //vm.initSession4Test()
        var userStr = localStorage.getItem('userInfo');
        if(userStr) {
            const userInfo = JSON.parse(userStr)
            vm.userInfo = userInfo
        }
        vm.geturl();//获取参数
        vm.Coupons();//优惠券
        vm.getDiscount();
    },
    components: {
        [RadioGroup.name]: RadioGroup,
        [Radio.name]: Radio,
        [Cell.name]: Cell,
        [CellGroup.name]: CellGroup,
        [Loading.name]: Loading,
        [Overlay.name]: Overlay,
        [Dialog.name]: Dialog,
        [Tag.name]: Tag,
        [ActionSheet.name]: ActionSheet
    },
    watch: {
        totalPrice: {
            handler (newVal) {
                if (newVal) {
                    this.getAlipayConsult()
                /*
                    const userInfo = vm.userInfo
                    if(userInfo && userInfo.id) {
                        let wdappids = this.masterConfig.C('wdappids')
                        if(wdappids.indexOf(userInfo.appId) > -1) {
                            this.getAlipayConsult()
                        } else {
                            $('.box-bg').css("display",'none');
                        }
                    } else {
                        $('.box-bg').css("display",'none');
                    }
                 */
                }
            },
        },
    },
    methods: {
            initSession4Test(){
				let url = '/login/8441';
					vm.receiveData.postData(vm,url,'Data',function(){
				});
				alert('init usr for test!')
			},
            geturl(){
                let uls = window.localStorage.getItem('paylist');
                if(uls) {
                    vm.ulist = JSON.parse(window.localStorage.getItem("paylist"));
                }
                if(vm.ulist.payType == 1){
                    vm.typename ='银行卡支付('+vm.acctNNo.substring(vm.acctNNo.length-4)+')';
                }
                if(vm.ulist.payType  == '1'){
                    vm.showyan=true;
                }else {
                    vm.showyan=false;
                }
            },
            Carandpay(count){
                vm.count=count;
                let reduced_amt=0;
                let reduce_rate = 0; //减少到角还是分减少到角还是分
                if(!vm.reduceM){
                    return false
                }
                if ("0" == vm.reduceM) {
                    //不减免
                    return false;
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
                    return false;
                }
                vm.reduceMoney = parseFloat(vm.count) - parseFloat(reduced_amt.toFixed(2));//四舍五入的钱传给后端
                vm.reduceMoney = vm.reduceMoney.toFixed(2); //减少的钱 
                // vm.tdiscount =  (parseFloat(vm.reduceAmt) + parseFloat(vm.reduceMoney)).toFixed(2);//优惠总金额加上四舍五入
                vm.count = reduced_amt.toFixed(2); //合计
                vm.countmong = vm.count;//记录
            },
            //物业优惠
            getDiscount(){
                $('.box-bg').css("display",'block');
                let url = "/getDiscounts";
                let pType;
                if(vm.ulist.payType  == '1'){
                    pType = 1;
                }else {
                    pType = vm.ulist.payType
                    if (this.payMethod == '21') {
                        pType = '4'
                    }
                }
                let data = {
                    billId:vm.ulist.billId,
                    stmtId:vm.ulist.stmtId,
                    payType:pType,  //0微信,1卡,2wexinMini,3alipayMini,4.alipayShareToken
                    payFeeType:vm.payFeeType, //01管理费，02停车费
                    regionName:vm.ulist.regionname, //定位地区
                }
                vm.axios.post(
                url,
                data,
                ).then(function(e) {
                    var res = JSON.parse(e.data);
                    if(res.success){
                        vm.discounts = res.result.reduction;//数组
                        vm.sectId = res.result.sect_id
                        vm.totalPrice = res.result.total_fee_price//账单金额
                        vm.is_integral = res.result.is_enable_integral;//是否开通积分兑换减免 0不开通 1开通
                        vm.integral = res.result.integral;//积分
                        if(vm.is_integral == '0'){
                            vm.cullDiscount();//优惠减免
                        }else {
                            vm.Carandpay(vm.totalPrice)
                        }
                    }else {
                        alert(res.message)
                    }
                })
            },
            cullDiscount(){//优惠减免
                var cull_price = 0 ;//历年今年总金额
                for(var i=0;i<vm.discounts.length;i++){
                    cull_price += parseFloat(vm.discounts[i].reduction_amt) //当前，历史优惠总值
                    if(vm.discounts.length > 1){
                        vm.ruleType += vm.discounts[i].rule_type+',';//规则
                        vm.reductionAmt += vm.discounts[i].reduction_amt+',';//金额问号分割
                    }else {
                        vm.ruleType = vm.discounts[i].rule_type;
                        vm.reductionAmt = vm.discounts[i].reduction_amt;
                    }
                    
                }
                // console.log(cull_price,vm.ruleType,vm.reductionAmt);
                if(vm.discounts.length > 1){//数组
                    vm.reduceAmt = cull_price; //当前，历史优惠总值
                }else {
                    if(vm.reductionAmt){
                        vm.reduceAmt = parseFloat(vm.reductionAmt);//物业，停车优惠
                    }
                };
                vm.tdiscount = (vm.reduceAmt).toFixed(2);//没有四舍五入直接赋值
                vm.count = (parseFloat(vm.totalPrice) - parseFloat(vm.reduceAmt)).toFixed(2);//减去优惠的值
                vm.countmong = vm.count;//记录金额
                vm.counttoll = vm.count;//记录金额
                vm.Carandpay(vm.count)//四舍五入
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
                    if(vm.sUptop == 'No'){
                        vm.selectUpton = false;	
                    }
                }
                
            },
            //切换优惠券选中状态
            showIcon(index){
                if(vm.uptonData[index].selected){
                    vm.$set(vm.uptonData[index],'selected',false);
                    vm.tdiscount =  (parseFloat(vm.tdiscount) - parseFloat(vm.uptonData[index].amount)).toFixed(2);//优惠总金额
                }else{
                    vm.$set(vm.uptonData[index],'selected',true);
                    vm.tdiscount =  (parseFloat(vm.tdiscount) + parseFloat(vm.uptonData[index].amount)).toFixed(2);//优惠总金额
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
                        if(vm.is_integral =='0'){
                            vm.count =vm.countmong - vm.uptonData[i].amount;
                        }else {
                            if(vm.reduceM == '1' || vm.reduceM == '2' || vm.reduceM == '4' || vm.reduceM == '5' || vm.reduceM == '6' || vm.reduceM =='7'){
                                vm.count =vm.countmong - vm.uptonData[i].amount;
                            }else {
                                vm.count =vm.totalPrice - vm.uptonData[i].amount;
                            }
                        }
                        // vm.count =vm.countmong - vm.uptonData[i].amount;
                        // console.log(vm.counttoll,vm.countmong,vm.totalPrice,vm.count) 
                        vm.count = vm.count.toFixed(2);//金额
                        if(vm.count < 0 ){
                            vm.count = 0.01;
                        }
                    }
                };
                if(!flag){
                    vm.uptonAmount = "未使用";
                    vm.upronAmountNumber = 0,
                    vm.couponId = '';
                    // console.log(vm.counttoll)
                    if(vm.is_integral == '0'){//判断是否开通积分兑换
                        vm.Carandpay(vm.counttoll)
                    }else {
                        vm.Carandpay(vm.totalPrice)
                    }
                }
                vm.selectUpton = true;
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
            //获取验证码
            getCaptcha() {
                vm.sUptop = 'Locking'; // 锁定优惠券
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
                            vm.yzmstr=vm.yzmtime+'秒后重新获取';
                            vm.yzmtime--;
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
            let url = "getPrePayInfo";
            let list = {};
            list = vm.ulist;
            list.couponUnit = vm.upronAmountNumber;
            list.couponId = vm.couponId;
            list.reduceAmt = vm.reduceMoney;
            list.ruleType = vm.ruleType; //减免规则类型
            list.reductionAmt = vm.reductionAmt;//减免金额
            list.payFeeType = vm.payFeeType; //01管理费，02停车费
            if(list.payType == '1' && vm.captcha == '') {
                alert("请输入验证码");
                return;
            }
            if(vm.showyan) {
                list.veriCode = vm.captcha;//验证码
                list.orderNo = vm.orderNo;
                list.cardId = vm.cardId;
            }
            if(list.payType > 1) {
                list.payType = '1';
            }
            if (this.payMethod == '21') {
                list.payType = '4';
                list.channelInfo = vm.channelOperationInfo
            }
            $('.box-bg').css("display",'block');
            vm.axios.post(
                url,
                list,
            ).then(

            function(res){
                let wd = JSON.parse(res.data);
                if(wd.success == false){
                    alert(wd.message == null?'支付失败':wd.message);
                    $('.box-bg').css("display",'none');
                    return;
                }
                if (wd.result.pay_url) {
                    //光大支付，直接跳转去光大的页面
                    window.location.href = wd.result.pay_url;
                } else {
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
                                    //支付成功跳转详情
                                    var oriapp=vm.common.getoriApp();
                                    window.location.href = vm.basePageUrl+'wuye/index.html?'+oriapp+'#/paymentquery';
                            },
                            fail:function(res) {
                                console.log(JSON.stringify(res))
                            },
                            cancel:function(res){
                                alert('支付取消');
                                $('.box-bg').css("display",'none');
                            }
                            
                        })
                    } else if (list.payType == '1') {//银行卡调转支付
                        let payurl = wd.result.PAYURL;
                        let pay_result = wd.result.pay_result;
                        if(pay_result == 'SUCCESS'){
                            vm.$router.push({path:'/blank',query:{'tradeWaterId':wd.result.trade_water_id+'?'}})
                        }
                        if(payurl) {
                            window.location.href=payurl;
                        }
                        $('.box-bg').css("display",'none');
                    } else if (list.payType == '4') {
                        const shareToken = wd.result.packageId
                        if(shareToken) {
                            vm.shareToken = shareToken
                            vm.showPaySheet = true
                            $('.box-bg').css("display",'none');
                        }
                    }
                }
            }).catch(
                function(err){
                    console.log(err);
                }
            )
        },
        onRadioChange (e) {
        },
        //获取支付宝优惠咨询
        getAlipayConsult () {
            const url = 'alipay/marketingConsult'
            const params = {
                appid: '2021001161682727',
                user_id: '',
                sect_id: this.sectId,
                // sect_id: '180427100113842987',
                tran_amt: this.count
            }
            this.receiveData.postData(vm, url, params, 'data', 
            function () {
                const response = vm.data
                vm.showLoading = false
                if(response.success) {
                    if(response.result) {
                        if(response.result.channel_operation_info) {
                            vm.channelOperationInfo = response.result.channel_operation_info
                            vm.consultMsg = response.result.consult_msg
                            vm.orderId = response.result.order_id
                            if(vm.orderId && vm.channelOperationInfo) {
                                vm.payMethod = '21'
                            }
                        }
                    }
                    
                } else {
                    console.log(response.result.message)
                }
                $('.box-bg').css("display",'none');
            },
            function (err) {
                $('.box-bg').css("display",'none');
                console.log(err)
                vm.showLoading = false
            })
        },
        copyToken () {
            navigator.clipboard.writeText(this.shareToken).then(() =>{
                Dialog.alert({
                    message: '口令已复制'
                }).then(()=>{
                    vm.loopPayResult()
                    const url = 'https://ulink.alipay.com/?scheme=alipays://'
                    window.location.href = url
                })
            }).catch(err => {
                Dialog.alert({
                    title: "口令复制失败",
                    message: err
                })
            })
        },
        loopPayResult(orderNo) {
            setTimeout(() => {
                Dialog.confirm({
                    message: '是否已完成支付?',
                    confirmButtonText: '已完成支付',
                    cancelButtonText: '继续支付'
                }).then(()=>{
                    const basePageUrl = vm.basePageUrl
                    const userInfo = vm.userInfo
                    const queryPage = basePageUrl + 'wuye/index.html?oriAppi=' + userInfo.appId + '#/paymentquery'
                    window.location.href = queryPage
                }).catch(()=>{
                    $('.box-bg').css("display",'none');
                })
            }, 10000);
        },
        onCancelSheet () {
            //do something
        }
    },
    computed: {

    },
}
</script>

<!-- <script src="https://gw.alipayobjects.com/as/g/h5-lib/alipayjsapi/3.1.1/alipayjsapi.min.js"></script>

<button id="test">getAuthCode</button>
<script>document.querySelector('#test').addEventListener('click', function() {
    ap.getAuthCode({
      appId: '${appId}',
      scopes: ['auth_user'],
    }, function(res){
      ap.alert(JSON.stringify(res));
    });
  });
  </script> -->

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
}
.margin-bb {
    margin-bottom:0.3rem;
}
.Color {
    color: var(--primary-color);
}
.wcolor {
    color :#D5D2D2;
}
.pd4 {
    padding: 0.3rem 0.4rem;
    padding-left: 0.6rem;
    border-bottom: 1px solid #E3E3E3;
    font-weight: 600;
    border-top: 0.06rem solid #E3E3E3;
}
.ov {
    overflow: hidden;
}
.mb2 {
    margin-bottom: 0.2rem;
}
ul li:last-of-type {
    margin-bottom: 0;
}
/* .. */
.pay-div .can-use{
		width: 1.35rem;
		height: 0.45rem;
		border:1px solid var(--primary-color);
		color: var(--primary-color);
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
    background: var(--primary-icon-select);
    background-size: cover;
    position:absolute;
    width: 0.43rem;
    height: 0.43rem;
    top: 50%;
    margin-top: -0.2rem;
    margin-left: -0.6rem;
}
.iconShow{
    background: var(--primary-icon-selectted);
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
    color: var(--primary-color);
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
    background-color: var(--primary-color); 
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
    bottom: 2.5vh;
    z-index: 3;
    width: 92%;
    height: 0.9rem;
    text-align: center;
    color: #fff;
    line-height: 0.9rem;
    background-color: var(--primary-color);
}

.alipay-btn{
    position: fixed;
    left: 4%;
    right: 4%;
    bottom: 2.5vh;
    z-index: 3;
    width: 92%;
    height: 0.9rem;
    text-align: center;
    color: #fff;
    line-height: 0.9rem;
    background-color: #1E6FFF;
}

.posb {
     position: absolute;
}

.sel-paymethod {
	display: flex;
    align-items: center;
}
.sel-paymethod img {
	width: 0.7rem;
    height: 0.7rem;
}
.sel-paymethod .img-alipay {
	width: 0.7rem !important;
    height: 0.62rem !important;
}

.sel-paymethod .img-alipay-recommand {
    width: 0.5rem;
    height: auto;
}

.pay-text {
    margin-left: 0.25rem;
}
.my-loading {
    display: flex; 
    justify-content:center; 
    align-items: center;
}

.content {
    min-height: 50vh;
  }

  .title-scnd {
    display: flex;
    justify-content: center;
    color: grey;
  }

  .open-zhi {
    width: auto;
    height: auto;
  }
</style>

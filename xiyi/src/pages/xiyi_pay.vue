<template>
   <div class="xiyipay">
        <div v-show="zzmb" id="zzmb" class="zzmb" style="position:fixed;"></div>
        <div id="phoneAjax" v-show="hidden">
			<img src="../assets/images/index/c3d7f369-4a5e-4c4a-9fb9-a4b9d274c7e1.gif" style="width:40px;height40px;vertical-align: middle;">
		</div>

        <div v-show="currentPage=='main'">
            <div class="bg">
                <div class="addr_area" @click="showAddress()">
					<div class="addrtop">&nbsp;</div>
					<div style="background-color: #f7f7f1;text-align: center;">
						<div class="fs14 add_btn_style" v-show="!address.receiveName" style="">选择收货地址</div>
					</div>
					<div class="custom-menu-link" style="text-align: left;" v-show="address.receiveName">
						<a  href="javascript:void(0)" class="fs16 addr_detail">
							<span style="color:#3b3937;" >{{address.receiveName}}</span>
							<span style="margin-left:15px;color:#3b3937;">{{address.tel}}</span>
							<div class="addr_location">{{address.province}}{{address.city}}{{address.county}}{{address.xiaoquName}}{{address.detailAddress}}</div>
						</a>
					</div>
					<div class="addrbom">&nbsp;</div>
				</div>
            <div class="bg_ffffff fs15">
					<div class="custom-menu-link bb_gray"  id="timetaker">上门取件时间:
                        <!-- readonly 只读 -->
						<input class="date_pppp" id="datetimepicker2" v-model="requireDate" readonly>
						<span class="value2_right c666" v-show="!requireDate">请选择时间</span>
						<span class="value2_right c666">{{requireDate}}</span>
					</div>
					<div class="custom-menu-link " @click="showMemo">备注:<span class="fr pr15 c666">{{memo}}</span></div>
			</div>
            <div class="bg_ffffff mt1 fs15" @click="showCoupons">
					<div class="divpad coupon" v-show="couponNum>0">使用优惠:
                    <span class="fr couponAmount" v-show="coupon.amount">-{{coupon.amount}}元</span>
                    <span class="fr" v-show="!coupon.amount">有{{couponNum}}张可用代金券</span></div>
			</div>

            <div class="bg_ffffff fs13  c666">
					<div v-for="order in orderlist" class="orderitem">
						<p class="fl w60">{{order.title}}</p>
						<p class="fl w20 fontr">×{{order.count}}</p>
						<p class="fl w20 fontr">￥{{order.price}}</p>
					</div>
                    <div class="orderitem" v-show="coupon.amount">优惠:<span class="fr">-￥{{coupon.amount}}</span></div>
                    <div class="orderitem" v-show="shipFeeAmount">运费:<span class="fr">￥{{shipFeeAmount}}</span></div>
					
					<div class="realpay">实付金额: ￥ {{amountStr}}</div>
			</div>
            	<br />
				<br />
				<br />
				<br />
				<br />
			    <div id="foot"><div class="paybtn fs18" @click="pay">立即支付</div></div>
            </div>
        </div>

        <div  v-show="currentPage=='adderss'" style="padding:10px;font-size:14px;background: white;">
            <div v-show="adroot.page== 'list'">
                <div class="addr_item" @click="check(item)" v-for="item in adroot.addresses">
				<i class="checkbox" :class="{'checked':address&&address.id == item.id}"></i>
				<div class="addr_info">
					<span>{{item.receiveName}}</span>
					<span>{{item.tel}}</span>
					<span v-show="item.main" class="default_item">默认</span>
				</div>
				<div class="addr_region_location">{{item.regionStr}}{{item.detailAddress}}</div>
                </div>
                <div class="addr_btn_area">
                    <div class="addr_btn_plain" @click="addNewAddr">新增收货地址</div>
                </div>
            </div>

		<div class="addr_form" v-show="adroot.page=='form'">
            <div class="addr_input">
				<span class="form_title">联系人</span>
				<input placeholder="请输入联系人姓名" v-model="adroot.submitAddress.receiveName"/>
			</div>
			<div class="addr_input">
				<span class="form_title">手机号</span>
				<input type="tel" placeholder="请输入手机号码" v-model="adroot.submitAddress.tel"/>
			</div>
            <div class="addr_input" >
                <span class="fl fs15" style="color: black">所在地区</span>
                <div class="reion-info">
                    <span class="reionspan"  @click="toChoosePro">{{adroot.submitAddress.province}}</span>
                    <span class="reionspan"  @click="toChooseCity(adroot.submitAddress.provinceId)">{{adroot.submitAddress.city}}</span>
                    <span class="reionspan"  @click="toChooseCounty(adroot.submitAddress.cityId)">{{adroot.submitAddress.county}}</span>
                </div>
            </div>
             <!---------------- -->
                <div id="widget" v-show="widgets">
                    <div class="w-modal-mask" @click="adcheck">
                        <div class="w-modal">
                            <div class="w-option w-lite-divider" :class="{WCheckedItem:region.value==checkeditem}" v-for="(region,index) in Addprovince" @click="Addcheck(index)">{{region.name}}</div>
                        </div>
                    </div>
                </div>
            <!---------------- -->
            <div class="addr_input" @click="showpage('xiaoqu')">
                <span class="form_title">小区或大厦</span>
                <span class="fr fs14"  style="color: black" v-if="adroot.submitAddress.xiaoquName==''">请输入小区</span>
                <span class="fr fs14" v-if="adroot.submitAddress.xiaoquName">{{adroot.submitAddress.xiaoquName}}</span>
            </div>
            <div class="addr_input">
                <span class="form_title">小区地址</span>
                <input placeholder="小区所在地址" class="fr fs14 hidden-input" v-model="adroot.submitAddress.amapDetailAddr"/>
            </div>

			<div class="addr_input">
				<span class="form_title">楼栋门牌号</span>
				 <input placeholder="例如：1号楼402室" class="fr fs14 hidden-input" v-model="adroot.submitAddress.homeAddress"/>
			</div>
            <div class="addr_btn" @click="addAddress">保存</div>
            <div class="addr_btn" @click="showpage('list')">返回列表</div>
		</div>
       <!--	使用高德地图搜索-->
           <div style="background-color: #fffff8" v-show="adroot.page=='xiaoqu'">
                    <div class="location-wrap">
                        <div class="location-input-wrap">
                             <div class="location-i">
                                     <input placeholder="请输入小区名称" class="location-input" v-model="suggestLocation" />    
                                </div>
                            <i class="location-btn-cancel" @click="cancelLocation" v-if="suggestion"></i>
                        </div>
                        <span class="location-btn-ensure" @click="submitLocation">确定</span>
                    </div>
                    <div class="location-empty-tip" v-if="!suggestions.length">
                        准确的小区、街道或大厦名称能加快送货速度
                    </div>
                    <div class="location-location" @click="chooseLocation(suggestion)" v-for="suggestion in suggestions" v-if="suggestions.length">
                        <span style="position:relative;font-color:#cccccc">{{suggestion._name}} - {{suggestion._address}}</span>
                    </div>
            </div>   
        </div>

        <!-- 优惠券 -->
        <div v-show="currentPage==''">
            <div class="title-line">
                  <div class="title_text">可用现金券</div>
                <div class="title_count">共{{couponNum}}个</div>
            </div>

             <div>
                <div class="coupon_item " v-for="(item,i) in coupons"  :key="item.id" :class="{selected:i==selectedIndex}" @click="chooseCoupon(i)">
                    <div class="outter_bg ">
                        <i class="icon_se " ></i>
                        <div class="coupon_desc">
                            <div class="coupon_line_1">
                                <span class="coupon-name">{{item.title}}</span>
                                <span class="coupon-time">{{item.leftDayDes}}</span>
                            </div>
                            <div class="coupon-limit">使用期限{{item.useStartDateStr}}至{{item.useEndDateStr}}</div>
                        </div>
                        <div class="coupon_value">
                            <div class="coupon-amount">￥{{item.amount}}</div>
                            <div class="coupon-dyq">现金券</div>
                        </div>
                    </div>
                </div>
            </div>
            <div style="height: 15px;width:100%">&nbsp;
            </div>
            <div class="btn_area" style="margin-bottom: 15px;">
                <div class="more_btn" @click="confirm">确定</div>
            </div>
        </div>

   </div>
</template>

<script>
let vm;
import wx from 'weixin-js-sdk';
import { MessageBox } from 'mint-ui';
import '../../node_modules/jquery/dist/jquery.min.js'
import '../../node_modules/jquery-datetimepicker/build/jquery.datetimepicker.full.js'
import '../../node_modules/jquery-datetimepicker/build/jquery.datetimepicker.min.css'
export default {
   data () {
       return {
           zzmb:true,
           hidden:true,
           paying:false,
           orderId:'',
           currentPage:'main',
           freight:0,
           address:{},
           shipFeeTpl:{},
           orderlist:[],
           amount:0,
           memo:"",
           requireDate:'',
           coupon:{},
           couponNum:0,
        //新增地址
           adroot:{
                page:'list',
                addresses:[],
                submitAddress:{
                province:"选择省",
                city:"选择市",county:"选择区县",
                receiveName:"",
                tel:"",
                provinceId:0,
                cityId:0,
                countyId:0,
                xiaoquName:"",
                amapId:0,
                amapDetailAddr:"",
                homeAddress:""
                },  
                xiaoqus:[],
                
            checkedXiaoqu:{id:0},    
           },
            Addprovince:[],
            Addtype:'',
            widgets:false,
            checkeditem:'',
        //新增地址  
        //小区
        suggestLocation:'',
        suggestion:{},
        suggestions:[], 
        // 优惠券
        coupons:[],
        allCoupons:[],
        couponNum:0,
        coupon:{},
        couponDesc:'',
        selectedIndex:-1,
        // --
        shipFeeAmount:0,
        realamount:0,
        amountStr:0,
       };
   },
   created() {vm=this},
    watch: {
        suggestLocation:{
                 handler(nv, ov){
                        if(vm.suggestLocation.length>=2 && vm.suggestLocation!=vm.suggestion._name) {
                            vm.getSuggestion();
                        }
                 },
                    deep: true,
            },
   },
   mounted() {
        // vm.initSession4Test();
        vm.initOrder();
        vm.queryAddressesWithCache();
        vm.queryCoupon();

        $('#timetaker').click(function(){
        $('#datetimepicker2').datetimepicker('show');
        });
        $.datetimepicker.setLocale('ch')
        $('#datetimepicker2').datetimepicker({
            onChangeDateTime:function(x){
                var dt = vm.formatDate(x,'yyyy-MM-dd hh:mm');
                if(vm.requireDate!=dt){
                    vm.requireDate=dt;
                }
            },
            allowTimes:['9:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00'],
            format:'Y-m-d H:i',
            formatDate:'Y-m-d H:i',                           
        });
   },
   methods: {
         formatDate(date, fmt) {
            var currentDate = new Date(date);
            var o = {
                "M+": currentDate.getMonth() + 1, //月份
                "d+": currentDate.getDate(), //日
                "h+": currentDate.getHours(), //小时
                "m+": currentDate.getMinutes(), //分
                "s+": currentDate.getSeconds(), //秒
                "q+": Math.floor((currentDate.getMonth() + 3) / 3), //季度
                "S": currentDate.getMilliseconds() //毫秒
            };
            if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (currentDate.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o)
                if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
        },
        //模仿线上用户信息
         // 105/747/384
        initSession4Test(){ 
            let url ='/initSession4Test/105';
                    vm.receiveData.getData(vm,url,'Data',function(){
            });
        },
        initOrder() {
            vm.receiveData.getData(vm,'/home/viewCartWithAddr','res',function(){
                if(vm.res.success){
                    if(!vm.res.result.address){
                         vm.address = {};
                    } else {
                        vm.address=vm.res.result.address;
                        vm.freight=vm.res.result.freight;
                    }
                    if(!vm.res.result.shipFee){
                        vm.shipFeeTpl = {};
                    }else {
                        vm.shipFeeTpl = vm.res.result.shipFee;
                    }
                    vm.orderlist=vm.res.result.cart.items;
                    for(var i=0;i<vm.orderlist.length;i++){
                        vm.amount+=vm.orderlist[i].count*vm.orderlist[i].price;
                    }
                    vm.computeAmount();
             }
          })     
        },
        queryCoupon() {
            let url ='/coupon/valid4HomeCart';
                  vm.receiveData.getData(vm,url,'res',function(){
                      if(vm.res.success) {
                          vm.coupons= vm.res.result;
                          vm.allCoupons = vm.res.result;
                          vm.couponNum=vm.coupons.length;
                          vm.zzmb=false;
                          vm.hidden=false;
                      }else {   
                          vm.zzmb=false;
                          vm.hidden=false;
                          alert('获取现金券信息失败！');
                          }
                    })
        },
        //计算
        computeAmount() {
            vm.shipFeeAmount = vm.getShipFee(vm.amount);
            vm.realamount = vm.amount + vm.shipFeeAmount;
            vm.filterCouponByAmount(vm.amount);
            vm.couponNum=vm.coupons.length;
            if(vm.coupon.amount&&!vm.canUse(vm.coupon,vm.amount)){
                 vm.coupon = {};
            }
            vm.realamount = vm.coupon.amount ? vm.realamount - vm.coupon.amount : vm.realamount;
            if(vm.realamount<=0){
                vm.realamount=0.01;
            }
            vm.amountStr = vm.realamount.toFixed(2);
         },
         filterCouponByAmount(amount) {
              var c = [];
                    for(var i=0;i<vm.allCoupons.length;i++){
                        if(vm.canUse(vm.allCoupons[i],amount)){
                            c.push(vm.allCoupons[i]);
                        }
                    }
            vm.coupons= c;
        },
        canUse(coupon,amount) {
             return coupon.usageCondition<=amount;
         },

        getShipFee(amount) {
            if(!vm.shipFeeTpl.fee){
                return 0;
            }
            if(vm.shipFeeTpl.freeLimit<=amount) {
                return 0;
            }
            if(vm.address&&vm.shipFeeTpl.freeRegionIds&&vm.shipFeeTpl.freeRegionIds.size>0){
                if($.inArray(vm.address.provinceId,vm.shipFeeTpl.freeRegionIds)
                    ||$.inArray(vm.address.cityId,vm.shipFeeTpl.freeRegionIds)
                    ||$.inArray(vm.address.countyId,vm.shipFeeTpl.freeRegionIds)
                    ||$.inArray(vm.address.xiaoquId,vm.shipFeeTpl.freeRegionIds)){
                        return 0;
                    }
            }
            return vm.shipFeeTpl.fee;  
        },
        showAddress() {
            vm.currentPage='adderss';
        },
        //备注
        showMemo(){
            MessageBox.prompt('备注','',).then(({ value, action }) => {
                vm.memo=value;
            }).catch(err => { 
                if (err == 'cancel') {     //取消的回调
                    
                }
            });
        },
        //切换优惠券
        showCoupons() {
            vm.currentPage='';
            vm.coupon=vm.coupon ? vm.coupon : {};
            vm.computeAmount();
        },
         //点击优惠券
        chooseCoupon(i) {
            if(this.selectedIndex != i) {
                this.selectedIndex=i
            }else {
                this.selectedIndex=-1;
            }
            // vm.confirm();
        },
        confirm() {
            if( vm.selectedIndex<0 || vm.selectedIndex>= vm.coupons.length) {
               vm.chooseCoupons(null);
            }else {
                vm.chooseCoupons(vm.coupons[vm.selectedIndex]);
                }
             vm.currentPage='main';
        },
        chooseCoupons(coupon) {
            if(coupon== undefined) {
                vm.coupon={};
               
            }else {
                vm.coupon=coupon;
               
            }
         vm.computeAmount()
           
        },
        pay() {
            if(vm.paying){
				alert("提交中，请稍后再试！");
				return;
            }
            if(vm.orderId>0) {
				vm.requestPay();
			} else {
				vm.createOrder();
			}
        },
        requestPay() {
            vm.zzmb=true;
            vm.receiveData.postData(vm,'/yunxiyi/pay/'+vm.orderId,null,'res',function() {
            if(vm.res.success) {
                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: vm.res.result.appId, // 必填，公众号的唯一标识
                    timestamp: vm.res.result.timestamp, // 必填，生成签名的时间戳
                    nonceStr: vm.res.result.nonceStr, // 必填，生成签名的随机串
                    signature: vm.res.result.signature,// 必填，签名，见附录1
                    jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                });
                wx.chooseWXPay({
                    "timestamp":vm.res.result.timestamp,
                    "nonceStr":vm.res.result.nonceStr,
                    "package":vm.res.result.pkgStr,
                    "signType":vm.res.result.signType,
                    "paySign":vm.res.result.signature,
                    success: function (res) {
                        let url ='/yunxiyi/notifyPayed/'+vm.orderId;
                         vm.receiveData.getData(vm,url,'Data',function(){
                            alert("下单成功！");
                            vm.$router.push({path:'/success',query:{'oId':vm.orderId}})
                            // location.href="home/xiyi/success.html?oId="+o.orderId;
                        });
                    },
                    fail:function(res) {
                        vm.paying=false;
                        vm.zzmb=false;
                    },
                    cancel:function(res){
                        console.log(JSON.stringify(n));
                        vm.paying=false;
                        vm.zzmb=false;
                    }
                });
            }else {
                vm.zzmb=false;
                alert(vm.res.message==null?"支付请求失败，请稍后重试！":vn.res.message);
        	    vm.paying=false;  
            }
        })

        },
        createOrder() {
            var order = {};
            order.couponId = vm.coupon.id;
            order.addressId = vm.address.id;
            order.reqTime = vm.requireDate;
            order.memo = vm.memo;
            if(!order.addressId||order.addressId<=0) {
			alert("请选择地址");
			return;
            }
            if(!order.reqTime){
                alert("请选择服务时间！");
                return;
            }
            vm.paying = true;
            vm.receiveData.postData(vm,'/yunxiyi/createOrder',order,'res',function() {
            if(vm.res.success) {
                vm.orderId = vm.res.result.id;
        	    vm.requestPay();
            }else {
                alert(vm.res.message==null?"下单失败，请稍后重试！":vm.res.message);
		    	vm.paying=false;
            }
        })
        },
        // -----新增地址---------
        queryAddressesWithCache(){
            vm.receiveData.getData(vm,'addresses','Data',function(){
                if(vm.Data.success) {
                    vm.adroot.addresses = vm.Data.result;
                }else {
                    alert("获取地址信息失败！");
                     vm.adroot.addresses = [];
                }
                
            });
        },
        Addcheck(index) {
                vm.checkeditem=vm.Addprovince[index].value;
                if(vm.Addtype== '1') {
                     vm.adroot.submitAddress.province=vm.Addprovince[index].name;
                     vm.adroot.submitAddress.provinceId=vm.Addprovince[index].value;
                     vm.toChooseCity(vm.Addprovince[index].value);
                     return;
                }
                if(vm.Addtype== '2') {
                    vm.adroot.submitAddress.city=vm.Addprovince[index].name;
                    vm.adroot.submitAddress.cityId=vm.Addprovince[index].value;
                    vm.toChooseCounty(vm.Addprovince[index].value);
                    return;
                }      
                if(vm.Addtype== '3') {
                    vm.adroot.submitAddress.county=vm.Addprovince[index].name;
                    vm.adroot.submitAddress.countyId=vm.Addprovince[index].value;
                }
                vm.widgets=false;
         },
        adcheck() {
             vm.widgets=false;
        },
        toChoosePro() {
            vm.queryRegion(1,0);
        },
        toChooseCity(value) {
            if(value== 0) {
                alert("请先选择你所在的省！");
                return
            }
            vm.queryRegion(2,value)
        },
        toChooseCounty(value) {
            if(value== 0) {
                alert("请先选择你所在的省！");
                return
            }
            vm.queryRegion(3,value)
        },
        queryRegion(type,pic) {
            var url='regionsv2/'+type+'/'+pic;
            vm.Addtype=type;
            vm.receiveData.getData(vm, url,'data',function(){
                    if(vm.data.success) {
                        vm.Addprovince=vm.data.result;
                        vm.widgets=true;
                    }else {
                        alert(vm.data.message== null ?'获取数据失败,请稍后再试':vm.data.message)
                    }  
            });
        },
        check(address) {
            vm.address = address;
            vm.currentPage="main";
        },
        //切换新增地址
        addNewAddr() {
            vm.adroot.page='form';
            vm.resetCheckedAddr();
        },
        resetCheckedAddr() {
            vm.adroot.submitAddress={
            // xiaoquName:"",province:"选择省",
            // city:"选择市",county:"选择区县",xiaoquAddr:"",receiveName:"",
            // tel:"",detailAddress:"",xiaoquEntId:0,id:0
                province:"选择省",
                city:"选择市",county:"选择区县",
                receiveName:"",
                tel:"",
                provinceId:0,
                cityId:0,
                countyId:0,
                xiaoquName:"",
                amapId:0,
                amapDetailAddr:"",
                homeAddress:""
            };
            vm.suggestLocation='';

        },
        //选择小区
        showpage(page) {
            vm.adroot.page = page;
            if(page=='xiaoqu'){
               if(vm.adroot.submitAddress.city == "选择市"||vm.adroot.submitAddress.county=="选择区县"||vm.adroot.submitAddress.province=="选择省") {
                 alert('请先选择你所在的区域！');
                 vm.adroot.page='form';
                 vm.suggestions=[];
	    		return;
                }
            }
        },
           //点击叉叉
        cancelLocation() {
            vm.suggestLocation = '';
            vm.adroot.page='form';
        },
         submitLocation(){
            vm.adroot.submitAddress.xiaoquName = vm.suggestLocation;
            if(vm.suggestion._id) {
                vm.adroot.submitAddress.amapId=vm.suggestion._id;
            }
        
            vm.adroot.submitAddress.amapDetailAddr=vm.suggestion.detailaddress;
            vm.adroot.page='form';
        },
          //小区数据
        getSuggestion() {
            vm.receiveData.getData(vm, "amap/"+vm.adroot.submitAddress.city+"/"+vm.suggestLocation,'data',function(){
                if(vm.data.success) {
                    vm.suggestions=vm.data.result;
                }else {
                    vm.suggestions=[]
                }
            });
        },
        chooseLocation(suggestion) {
            vm.suggestion = suggestion;
            vm.suggestions=[];
            vm.suggestLocation = suggestion._name;
        },
        //保存
        addAddress() {
           if(vm.adroot.submitAddress.province=="选择省"||vm.adroot.submitAddress.city=="选择市"||vm.adroot.submitAddress.county=="选择区县"){
	    		alert("请选择地址！");
	    		return;
	    	}
            if(vm.adroot.submitAddress.amapDetailAddr==""||vm.adroot.submitAddress.receiveName==""
                ||vm.adroot.submitAddress.tel==""||vm.adroot.submitAddress.homeAddress==""){
                alert("请填写完整相关信息！");
                return;
              }
            if(!(/^1[3-9][0-9]\d{8}$/.test(vm.adroot.submitAddress.tel))) {
             alert("请填写正确的手机号！");
            return;
           }
            vm.saveAddress();
        },
        saveAddress(){
            var addr = {};
            addr.receiveName=vm.adroot.submitAddress.receiveName;
            addr.tel=vm.adroot.submitAddress.tel;

            addr.provinceId=vm.adroot.submitAddress.provinceId;
            addr.province=vm.adroot.submitAddress.province;
            addr.cityId=vm.adroot.submitAddress.cityId;
            addr.city=vm.adroot.submitAddress.city;
            addr.county=vm.adroot.submitAddress.county;
            addr.countyId=vm.adroot.submitAddress.countyId;
            addr.xiaoquName=vm.adroot.submitAddress.xiaoquName;
            // vm.submitAddress.amapDetailAddr+
            addr.detailAddress=vm.adroot.submitAddress.homeAddress;
            addr.amapDetailAddr=vm.adroot.submitAddress.amapDetailAddr;
            addr.amapId=vm.adroot.submitAddress.amapId;
           
            vm.receiveData.postData(vm,'/addAddress',addr,'res',function() {
            if(vm.res.success) {
                vm.adroot.addresses.push(vm.res.result);
                vm.address=vm.res.result;
                vm.adroot.page = "list";
            }else {
                 alert(vm.res.message==null?"地址保存失败，请重试！":vm.res.message);  
            }
        })
        }
         // -----新增地址---------

   },
   components: {},
   computed: {},
}
</script>

<style  scoped>
.xiyipay {
    font-family: "微软雅黑";
    background: #ffffff;
}
/* load */
.zzmb {
    z-index: 100000;
    position: absolute;
    top: 0;
    left: 0;
    -moz-opacity: 0.65;
    opacity: 0.65;
    filter: alpha(opacity=65);
    background: #000;
    width: 100%;
    height: 100%;
    display: block;
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
    background-color: black;
    -moz-opacity: .8;
    opacity: .80;
    filter: alpha(opacity=80);
    z-index: 1998;
    overflow: auto;
    -moz-border-radius: 15px;
    -webkit-border-radius: 15px;
}
/* load */
.bg {
    box-sizing: border-box;
    background-color: #efeeec;
}
.addr_area{
    margin-top:15px;
    background: #F7F7F1;
}
.addrtop {
    background:url(../assets/images/index/bg_line_location_top.png) repeat-x;
    height:5px;
    background-size: 100% 5px;
}
.addrbom {
    background:url(../assets/images/index/bg_line_location_bottom.png) repeat-x;
    height:5px;
    background-size: 100% 5px;
}
.add_btn_style {
    display: inline-block;
    height: 30px;
    line-height: 30px;
    border-radius: 3px;
    border: 1px solid #cfa972;
    padding: 4px 30px;
    margin: 20px 0;
    color: #cfa972;
    background-color: white;
}
.custom-menu-link {
    display: block;
    background: url(../assets/images/index/icon_arrow.png) no-repeat;
    background-size: 8px 12px;
    background-position: right center;
    margin: 0 15px;
    color: #3b3937;
    line-height: 30px;
    padding: 5px 0px;
    overflow: hidden;
}
.addr_detail {
    text-align: left;
    width: 100%;
}
.fs16 {
    font-size: 16px;
}
.fs15 {
font-size: 15px;
}
.fs14 {
font-size: 14px;
}
.addr_location {
    color: #666666;
    line-height: 20px;
    margin-top: 6px;
    font-size: 15px;
}
/* -------------- */
.addr_item {
    overflow: hidden;
    border-bottom: 1px solid #cccccc;
}
.checkbox {
    float:left;
    margin-top:15px;
    display: inline-block;
    width: 23px;
    height: 23px;
    background: url("../assets/images/index/icon_unselect.png") no-repeat;
    background-size: 23px;
}
.checkbox.checked {
    background-image: url("../assets/images/index/icon_successful.png");
}
.addr_info{
    margin: 10px 0 10px 30px;
}
.addr_info>span{
    margin-right:15px;
}
.default_item{
    color:#FF7E00;
    border:1px solid #FF7E00;
    padding: 4px 8px;
    border-radius: 2px;
}
.addr_region_location{
    margin: 10px 0 10px 30px;
}
.addr_btn_area{
    text-align: center;
    margin-top:20px;
    overflow: hidden;
}
.addr_btn_plain{
    padding: 10px 20px;
    border:1px solid #777777;
    border-radius: 4px;
    display: inline-block;
}
.addr_form{
    padding:5px;
}
.addr_input{
    overflow: hidden;
    line-height: 42px;
    border-bottom: 1px solid #777777;
}
.addr_input>input{
    border: none;
    outline: none;
    text-align: right;
    float: right;
    line-height: 36px;
    width: 68%;
    font-size:14px;
    margin:0px;
    padding:2px 10px 0px 0px;
    height:36px;
}
.form_title{
    font-size:16px;
    color:black;
}


.xiaoqu_btn,.addr_btn{
    position: fixed;
    color:white;
    background: #FF7E00;
    bottom: 4px;
    width:93%;
    margin-left: 2%;
    text-align: center;
    padding: 4px 0;
    font-size:18px;
    border-radius: 6px;
}
.addr_btn{
    position: relative;
    margin-top:30px;
}

/* -------------- */
.bg_ffffff{
    background: #ffffff;
}
.fs13 {
    font-size:13px;
}
.c666{
    color: #666666;
}
.custom-menu-link {
    display: block;
    background: url("../assets/images/index/icon_arrow.png") no-repeat;
    background-size: 8px 12px;
    background-position:right center;
    margin:0 15px;
    color: #3b3937;
    line-height: 30px;
    padding: 5px 0px;
    overflow: hidden;
}
.bb_gray{
    border-bottom: 1px #d7d7d7 solid;
}
.date_pppp{
    position: fixed;
    width: 0px;
    height: 0px;
    color: #fccc;
    z-index: -1;
    top: 200px;
    left: 50px;
    border: 0px;
}
.value2_right{
    float: right;padding-right: 10px;
}
.pr15 {
    padding-right: 10px;
}
/* --------- */
.mt1 {
    margin-top: 15px;
}
.coupon {
    margin: 15px 0px;
}

.divpad {
    padding: 15px 40px 15px 15px;
    position: relative;
}
.couponAmount {
    color: #ff8a00;
}
.title-line {
    margin: 15px;
    border-bottom: 1px solid #888888;
    height: 35px;
}
.title_text {
    float: left;
    font-size: 13px;
    color: #666666;
}
.title_count {
    float: right;
    font-size: 13px;
    color: #666666;
}

	.outter_bg{
		background:url("../assets/images/cop/bg_courtesy_card.png") no-repeat;
		background-size: 100% 110px;
		height:115px;
	}
	.coupon_item{
		padding:0px 15px 10px 15px
	}
	.coupon_desc{
		float:left;
		width: 74%;
	    font-size: 20px;
	    height:120px;
	    background-size: 138% 110px;
    	background-position: 0px 0px;
	}
	.coupon_value{
		float:right;
		width:26%;
	    height:110px;
		font-size: 20px;
	}
	.coupon_line_1{
		width: 100%;
	  	padding: 20px 20px 0 20px;
	}
	.coupon-name{
		font-size: 20px;
		color:#FF8A00;
		display: block;
	}
	.coupon-limit{
		position: absolute;
		font-size:11px;
		color:#666666;
		padding:10px 0 10px 20px;
		width: 60%;
	}

.selected .icon_se {
    background: url(../assets/images/cop/icon_selectted.png) no-repeat;
    background-size: 20px;
}
.icon_se {
    background: url(../assets/images/cop/icon_select.png) no-repeat;
    background-size: 20px;
    display: inline-block;
    width: 20px;
    height: 20px;
    z-index: 110;
    margin-left: -10px;
    position: absolute;
    margin-top: 38px;
}

.coupon-time {
    border: 1px #FF8A00 solid;
    color: #FF8A00;
    border-radius: 20px;
    padding: 0px 10px;
    font-size: 12px;
}
.coupon-amount {
    color: white;
    text-align: center;
    padding: 20px 0 0 0;
    font-size: 24px;
}

.coupon-dyq {
    color: white;
    text-align: center;
    padding: 10px 0 0 0;
    font-size: 13px;
}
.btn_area {
    text-align: center;
    width: 100%;
    position: fixed;
    bottom: 10px;
}
.more_btn {
    margin-left: 20px;
    margin-right: 20px;
    color: white;
    background: #FF8A00;
    padding: 8px 30px;
    font-size: 14px;
    border-radius: 6px;
}
.orderitem{
    clear: both;
    padding:8px 15px;
    height:26px;
}
.w60{
    width:60%;
    line-height: 35px;
}
.w20{
    width:20%;
    line-height: 35px;
}
.fontr{
    text-align: right;
}
.realpay{
    border-top: 1px solid #cccccc;
    color: #ff8a00;
    padding: 15px;
    text-align:right;
    height:20px;
    font-size:15px;
}
#foot{
    width:100%;
    height:50px;
    position: fixed;
    bottom:0px;
    background-color: #ff8a00;
}
.fs18 {
    font-size:18px;
}
#foot .paybtn{
    display: block;
    width:100%;
    height:50px;
    color:#fff;
    line-height: 50px;
    text-align: center;
}
.reionspan {
    width: 31%;
    display: inline-block;
    text-align: right;
}
.reion-info {
    width: 70%;
    float: right;
    overflow: hidden;
    font-size: 15px;
}
.w-modal-mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.5);
    z-index: 10;
}
.w-modal {
    position: relative;
    background: #fff;
    border-radius: 5px;
    margin: 20% auto;
    padding: 10px 15px;
    overflow: scroll;
    width: 60%;
    max-height: 80%;
}
.w-lite-divider {
    border-bottom: 1px solid #d4cfc8;
}
.w-option {
    background: url('../assets/images/index/icon_select.png') no-repeat;
    background-position: left center;
    background-size: 16px;
    padding: 15px 0 15px 25px;
}
.WCheckedItem {
    background: url('../assets/images/index/icon_selected.png') no-repeat;
}
.location-wrap {
    position: relative;
    padding: 0 10px;
    height: 49px;
    line-height: 49px;
    border-bottom: 1px solid #d4cfc8;
}

.location-input-wrap {
    position: relative;
    padding: 5px 10px;
    margin-right: 80px;
    left: 0px;
}

.location-input {
    display: block;
    height: 36px;
    width: 100%;
    outline: none;
    border:none;
    vertical-align: middle;
    font-size: 15px;
}
.location-i {
    padding-right: 30px;
    border-radius: 4px;
    border: 1px solid #d4cfc8;
}
.location-btn-cancel {
    position: absolute;
    top: 6px;
    right: 10px;
    display: inline-block;
    height: 36px;
    width: 30px;
    background: url('../assets/images/index/icon_cancel.png') no-repeat;
    background-size: 15px;
    background-position: center;
}
.location-btn-ensure {
    position: absolute;
    display: block;
    top: 0;
    height: 36px;
    line-height: 36px;
    margin-top: 5px;
    right: 15px;
    color: #3b3937;
    border-radius: 4px;
    font-size: 15px;
    width: 65px;
    text-align: center;
    border: 1px solid #d4cfc8;
}
.location-empty-tip {
    margin: 0 auto;
    margin-top: 105px;
    font-size: 12px;
    color: #888;
    width: 165px;
    text-align: center;
    line-height: 18px;
}

.location-location {
    margin: 0 15px;
    padding: 15px 0;
    border-bottom: 1px solid #d4cfc8;
    
}
/* ---------- */
</style>
<template>
   <div>
        <div id="zzmb" v-show="zzshow" class="zzmb" style="display:none;position:fixed;"></div>
        <div v-show="page== 'main'"  class="address">
            <div class="addr_area" @click="choseAddress">
                <div class="addrtop">&nbsp;</div>
                <div style="text-align:center;background-color: #f7f7f1;">
    					<a href="javascript:void(0)" class="add_address" v-show="!address.receiveName">选择收货地址</a>
    			</div>
                <div class="custom-menu-link" v-show="address.receiveName">
    					<a class="sustoma"  href="javascript:void(0)">
    						<span>{{address.receiveName}}</span>
    						<span style="margin-left:15px;">{{address.tel}}</span>
    						<div class="addr_location">{{address.province}}{{address.city}}{{address.county}}{{address.xiaoquName}}{{address.detailAddress}}</div>
    					</a>
    			</div>
                <div class="addrbottom">&nbsp;</div>
            </div>
            <div class="contain">
                <div class="item">
    				<span class="span1">项目：</span>
    				<span class="span2">日常保洁</span>
    			</div>
                <div class="time" style="line-height: 30px;">
    				<span class="span1">时长：</span>
    				<img @click="addhours" src="../../assets/img/btn_plus_03.png" class="icon1" />
    				<span style="float: right; margin-right: 6px; font-size: 14px;">{{hours}}</span>
    				<img  @click="subhours" src="../../assets/img/btn_subtract_03.png" class="icon2"/>
    			</div>
                <div class="total">
    				<span class="span1">小计：</span>
    				<span class="span4">￥<span style="padding-left: 4px;">{{amount}}</span></span>
    			</div>
              
            </div>
            <div class="discount" @click="showCoupons">
                <span class="span1">使用优惠：</span>
    			<img src="../../assets/img/icon_youhuiquan_03.png" class="icon3" />
    			<span class="span1_1">{{couponNum}}张可用</span>
    			<img src="../../assets/img/btn_arrow_05_05.png" class="icon4" />
    			<span class="span1_2" v-show="coupon.amount">-{{coupon.amount}}元</span>
            </div>
            <div class="custom_menu">
                <div class="order_time"  id="timetaker">
    				<span class="span1">预约时间：</span>
    				<img src="../../assets/img/btn_arrow_05_05.png" class="icon4" />
    				<input class="date_pppp" id="datetimepicker2" v-model="requireDate" readonly>
                    <span class="tip" v-show="!requireDate">请选择时间</span>
                    <span class="tip">{{requireDate}}</span>
    			</div>
                <div class="custom_notice" @click="showMemo">备注
    				<span class="custom_notice_span">{{memo}}</span>
    			</div>
                <div class="total_pay">
    			    <div class="money"><span>合计：{{realAmount }}</span></div>
    			<span class="paybtn" @click="submit">立即支付</span>
    	    	</div>
            </div>
        </div>
        <!-- 选择地址 -->
        <div v-show="page=='list'" class="addrlist">
            <div v-show="lian=='chu'">
                <div   class="plr15s arrow-margins menu-links mt1s fs14s address-wraps lite-dividers" v-for="item in addresses" @click="checks(item)">
                    <i class="checkboxs " :class="{checkeds:address&&address.id===item.id}"></i>
                    <div>
                        <span style="margin-left:20px">{{item.receiveName}}</span>
                        <span style="margin-left:15px">{{item.tel}}</span>
                        <span class="mainlian" style="margin-left:15px" v-if="item.main">默认</span>
                    </div>
                    <div class="locations" style="margin-left:35px" >{{item.province}}{{item.city}}{{item.county}}{{item.locationAddr}}({{item.xiaoquName}}){{item.detailAddress}}</div>
                </div>
                <div class="tc mt2"><a href="javascript:void(0)" class="btn-plain" @click="toAddAddress">新增收货地址</a><br/></div>
            </div>

                <div v-show="lian=='xing'">
                    <div style="padding:0 15px"  v-show="zhen=='from'">
                        <div class="input-wrap lite-divider">
                            <span class="fl fs15">联系人</span>
                            <input placeholder="请输入联系人姓名" class="fr fs14 hidden-input" v-model="submitAddress.receiveName"/>
                        </div>
                         <div class="input-wrap lite-divider">
                            <span class="fl fs15">手机号</span>
                            <input type="tel" placeholder="请输入手机号码" class="fr fs14 hidden-input" v-model="submitAddress.tel"/>
                        </div>
                        <!-- @click="showRegion" -->
                        <div  class="input-wrap lite-divider menu-link">
                            <span class="fl fs15" style="color: #3b3937">所在地区</span>
                            <div class="reion-info">
                                <span class="reionspan"  @click="toChoosePro">{{submitAddress.province}}</span>
                                <span class="reionspan"  @click="toChooseCity(submitAddress.provinceId)">{{submitAddress.city}}</span>
                                <span class="reionspan"  @click="toChooseCounty(submitAddress.cityId)">{{submitAddress.county}}</span>
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

                         <div style="clear: both;" v-if="selectRegion==false">
                            <div class="input-wrap lite-divider  menu-link"   @click="showLocation"  >
                                <span class="fl fs15">小区或大厦</span>
                                <span class="fr fs14"  style="color: #aeaeae" v-if="submitAddress.xiaoquName==''">请输入小区或大厦</span>
                                <span class="fr fs14" v-if="submitAddress.xiaoquName">{{submitAddress.xiaoquName}}</span>
                            </div>
                            <div class="input-wrap lite-divider">
                                <span class="fl fs15">小区地址</span>
                                <input placeholder="例如：三林路128弄" class="fr fs14 hidden-input" v-model="submitAddress.amapDetailAddr"/>
                            </div>
                            <div class="input-wrap lite-divider">
                                <span class="fl fs15">楼栋门牌号</span>
                                <input placeholder="例如：1号楼402室" class="fr fs14 hidden-input" v-model="submitAddress.homeAddress"/>
                            </div>
                            <a href="javascript:void(0);" class="btn" @click="addAddressa" >保存</a>
                            <a href="javascript:void(0);" class="btn" @click="addfan" >返回列表</a>
                        </div> 
                    </div>
            </div> 
              	<!--	使用高德地图搜索-->
                <div style="background-color: #fffff8" v-show="lian=='xiaoqu'">
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
        <div v-show="page=='qian'">
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
// import '../../../node_modules/jquery/dist/jquery.min.js';
import '../../../node_modules/jquery-datetimepicker/build/jquery.datetimepicker.full.js'
import '../../../node_modules/jquery-datetimepicker/build/jquery.datetimepicker.min.css'
export default {
   data () {
       return {
           zzshow:true,
           page:'main',
           address:{},
           item:"",
           memo:"",
           serviceItemId:6,
           hours:2,
           amount:0,
           requireDate:'',
           memo:'',
           realAmount:0,
        //    选择地址
            addresses:[],
            checkedAddress:{},
            lian:'chu',
            zhen:'from',
            Addprovince:[],
            Addtype:'',
            widgets:false,
            checkeditem:'',
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
            selectRegion:false,
            currentRegionType:1,
            //小区
                suggestLocation:'',
                suggestion:{},
                suggestions:[],
                showg:false,
                showz:false,
            //优惠券
            coupons:[],
            allCoupons:[],
            couponNum:0,
            coupon:{},
            couponDesc:'',
            selectedIndex:-1,
            realMoney:0,
            billId:'',

       };
   },
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
   created() {
       vm=this;
   },
   mounted() {
        // this.common.checkRegisterStatus();
       
    //    let url1 = '/initSession4Test/105';
    //     vm.receiveData.getData(vm,url1,'data1',function(){
          
    //     })

       this.initInfo();

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

   components: {},

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
        //备注
        showMemo() {
            MessageBox.prompt('备注','',).then(({ value, action }) => {
                    vm.memo=value;
                }).catch(err => { 
                    if (err == 'cancel') {     //取消的回调
                        
                    }
                    });
        },
        initInfo() {
            let url="baojie/normal/payinfo/"+vm.serviceItemId;
            vm.receiveData.getData(vm,url,'res',function(){
                if(vm.res.success) {
                    vm.item=vm.res.result.item;

                    if(vm.res.result.address) {
                        vm.address=vm.res.result.address;
                    }
              
                    vm.coupons=vm.res.result.coupons;
                    vm.allCoupons=vm.res.result.coupons;
                    vm.couponNum=vm.res.result.coupons.length;
                    vm.computeAmount();
                    vm.zzshow=false;
                }else {
                    alert(vm.res.message==null?"请稍后重试！":vm.res.message);
                    vm.zzshow=false;
                }
             })
       },
       //加
       addhours() {
           if(!vm.hours || vm.hours<2) {
               vm.hours=2
           }else {
               vm.hours+=0.5;
           }
          vm.computeAmount();
       },
        //减
        subhours() {
            if(!vm.hours || vm.hours<=2) {
               vm.hours=2
           }else {
               vm.hours-=0.5;
           }
           vm.computeAmount();
        },
        //点击切换地址
        choseAddress() {
            vm.page='list';
            vm.dataAddress();
        },
        //获取地址
        dataAddress() {
            vm.receiveData.getData(vm,'/addresses','data',function() {
                if(vm.data.success) {
                    vm.addresses=vm.data.result;
                }else {
                    vm.addresses=[];
                }
            })
        },
        //选择地址
        checks(item){
             vm.address = item;
             vm.page="main"
        },
        toAddAddress() {
            vm.lian='xing';
            vm.submitAddress={
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
            vm.suggestLocation='';
        },

    //!--------------!
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
    Addcheck(index) {
                vm.checkeditem=vm.Addprovince[index].value;
                if(vm.Addtype== '1') {
                     vm.submitAddress.province=vm.Addprovince[index].name;
                     vm.submitAddress.provinceId=vm.Addprovince[index].value;
                     vm.toChooseCity(vm.Addprovince[index].value);
                     return;
                }
                if(vm.Addtype== '2') {
                    vm.submitAddress.city=vm.Addprovince[index].name;
                    vm.submitAddress.cityId=vm.Addprovince[index].value;
                    vm.toChooseCounty(vm.Addprovince[index].value);
                    return;
                }      
                if(vm.Addtype== '3') {
                    vm.submitAddress.county=vm.Addprovince[index].name;
                    vm.submitAddress.countyId=vm.Addprovince[index].value;
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
        if(value==0){
            alert('请先选择你所在的省！');
            return;
        }
        vm.queryRegion(2,value)
    },
    toChooseCounty(value) {
        if(value==0){
            alert('请先选择你所在的省！');
            return;
        }
        vm.queryRegion(3,value)
    },
    //!-------------!
    
    //
    showLocation() {
        if(vm.submitAddress.city == "选择市"||vm.submitAddress.county=="选择区县"||vm.submitAddress.province=="选择省") {
                alert('请先选择你所在的区域！');
	    		return;
            }
        vm.suggestions=[];
        vm.lian='xiaoqu'

    },
      //点击叉叉
    cancelLocation() {
         vm.suggestLocation = '';
         vm.lian='xing';
    },
    submitLocation(){
        vm.submitAddress.xiaoquName = vm.suggestLocation;
        if(vm.suggestion._id) {
            vm.submitAddress.amapId=vm.suggestion._id;
        }
      
        vm.submitAddress.amapDetailAddr=vm.suggestion.detailaddress;
        vm.lian='xing';
    },
     //小区数据
    getSuggestion() {
         vm.receiveData.getData(vm, "amap/"+vm.submitAddress.city+"/"+vm.suggestLocation,'data',function(){
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
    addAddressa(){
        if(vm.submitAddress.province=="选择省"||vm.submitAddress.city=="选择市"||vm.submitAddress.county=="选择区县"){
	    		alert("请选择地址！");
	    		return;
	    	}
        if(vm.submitAddress.amapDetailAddr==""||vm.submitAddress.receiveName==""
            ||vm.submitAddress.tel==""||vm.submitAddress.homeAddress==""){
            alert("请填写完整相关信息！");
            return;
        }
        
        if(!(/^1[3-9][0-9]\d{8}$/.test(vm.submitAddress.tel))) {
            alert("请填写正确的手机号！");
            return;
        }
            vm.saveAddress();
    },
     /** 保存地址 */
     saveAddress() {
            var addr = {};
            addr.receiveName=vm.submitAddress.receiveName;
            addr.tel=vm.submitAddress.tel;

            addr.provinceId=vm.submitAddress.provinceId;
            addr.province=vm.submitAddress.province;
            addr.cityId=vm.submitAddress.cityId;
            addr.city=vm.submitAddress.city;
            addr.county=vm.submitAddress.county;
            addr.countyId=vm.submitAddress.countyId;
            addr.xiaoquName=vm.submitAddress.xiaoquName;
            // vm.submitAddress.amapDetailAddr+
            addr.detailAddress=vm.submitAddress.homeAddress;
            addr.amapDetailAddr=vm.submitAddress.amapDetailAddr;
            addr.amapId=vm.submitAddress.amapId;
            // console.log(addr)
             $('#zzmb').show();
            vm.receiveData.postData(vm,'/addAddress',addr,'n',function(){
                if(vm.n.success) {
                        vm.addresses.push(vm.n.result);
                        vm.checkedAddress=vm.n.result;
                        vm.page='list'; 
                        // vm.page="main"
                        vm.lian='chu'
                }else {
                    alert(vm.n.message==null?"地址保存失败，请重试！":vm.n.message);
                }
                   $('#zzmb').hide(); 
                })
     },
     //返回列表
     addfan() {
         vm.lian="chu";
     },
     //切换优惠券
     showCoupons() {
        vm.page='qian'
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
    //  优惠券确定
    confirm() {
        if( vm.selectedIndex<0 || vm.selectedIndex>= vm.coupons.length) {
               vm.chooseCoupons(null);
           }else {
               vm.chooseCoupons(vm.coupons[vm.selectedIndex]);
            }
       vm.page='main';     
    },
    chooseCoupons(coupon) {
            if(coupon== undefined) {
                vm.coupon={};
               
            }else {
                vm.coupon=coupon;
               
            }
         vm.computeAmount()
           
        },
    //计算价格
    computeAmount() {
        vm.amount=vm.item.price*vm.hours;
        vm.filterCouponByAmount(vm.amount);
        vm.couponNum=vm.coupons.length;
        if(vm.coupon.amount&&!vm.canUse(vm.coupon,vm.amount)){
            vm.coupon = {};
        }
        vm.realMoney = vm.coupon.amount ? vm.amount - vm.coupon.amount : vm.amount;

        if(vm.realMoney<=0.01) {
        	vm.realAmount=0.01
        }else{
             vm.realAmount = vm.realMoney.toFixed(2);
        }

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
    //立即支付
    submit() {
        vm.createBill();
    },
    createBill() {
         if(vm.billId){
            vm.requestPay();
	         }
            var bill = {};
            bill.serviceItemId=vm.serviceItemId;
            bill.couponId = vm.coupon.id;
            bill.reqTime = vm.requireDate;
            bill.memo = vm.memo; 
            bill.addressId = vm.address.id;
            bill.count = vm.hours;
            bill.itemType = 302;
            if(!bill.addressId||bill.addressId<=0) {
                alert("请选择地址");
                return;
            }
            if(!bill.reqTime){
                alert("请选择服务时间！");
                return;
            }
            let url="/baojie/normal";
             vm.receiveData.postData( vm, url,bill,'res', function(){
                 if(vm.res.success) {
                     vm.billId=vm.res.result;
                     vm.requestPay()
                 }else {
                     alert(vm.res.message==null?"下单失败，请稍后重试！":vm.res.message);
                 }
             })

    },
    requestPay() {
        // vm.zzshow=true;
        $('#zzmb').css('display','block');
        let url="/baojie/pay/"+vm.billId;
      
        this.axios.post(
					url,
					{},
				).then(
                    function(res){
                        let wd = JSON.parse(res.data);
                        // console.log(wd)
                        
                    if(wd.success == false){
							alert(wd.message);
							$('#zzmb').css("display",'none');
							return;

					}    
                     wx.config({
                        debug: false, 
                		appId: wd.result.appId, // 必填，公众号的唯一标识
                		timestamp: wd.result.timestamp , // 必填，生成签名的时间戳
                		nonceStr: wd.result.nonceStr, // 必填，生成签名的随机串
                		signature: wd.result.signature,// 必填，签名，见附录1
                		jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                    });  
                     wx.chooseWXPay({
                    	"timestamp":wd.result.timestamp,
                        "nonceStr":wd.result.nonceStr,
                        "package":wd.result.pkgStr,
                        "signType":wd.result.signType,
                        "paySign":wd.result.signature,
                       success: function (res) {
                           //common.invokeApi("POST", "baojie/notifyPayed/"+o.billId);
                            // 支付成功后的回调函数
                            vm.notifyPayed()
                       },
                       fail:function(res) {
                 	    	alert(JSON.stringify(res));
                            // vm.zzshow=false;
                            $('#zzmb').css('display','none');
                        },
                         cancel:function(res){
                            // vm.zzshow=false;
                              alert('支付取消');
                             $('#zzmb').css('display','none');
                        
                		} 
                    })
                 }
                ).catch(
					function(err){
                        console.log(err);
                     $('#zzmb').css('display','none');
                    }
				)

    },
      notifyPayed() {
         let url="baojie/notifyPayed/"+vm.billId;
          vm.receiveData.postData( vm, url,{},'res', function(){
             if(vm.res.success) {
                 alert("下单成功！");
                vm.$router.push({path:'/success',query:{'oid':vm.billId}})
             }                   
         })
       },

   },

   computed: {},
}
</script>

<style  scoped>
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
}
.address{
    margin-top: 15px;
}
.addr_area{
    background: #F7F7F1;
}
.addrtop {
    background:url('../../assets/img/icon_address_top_02.png') repeat-x;height:5px;background-size: 100% 5px;
}
.addrbottom {
    background:url('../../assets/img/icon_address_bottom_04.png') repeat-x;height:5px;background-size: 100% 5px
}
.add_address{
    display: inline-block;
    font-size: 14px;
    height: 30px;
    line-height: 30px;
    border-radius: 3px;
    border: 1px solid #cfa972;
    padding:4px 30px;
    margin:20px 0;
    color:#cfa972;
    background-color:white;
    text-decoration: none;
}
.custom-menu-link {
    font-size:16px;
    color: #3b3937;
    background: url("../../assets/img/btn_arrow_05_05.png") no-repeat;
    background-size: 10px 12px;
    background-position: 97% center;
}
.fs15 {
font-size: 15px;
}
.fs14 {
font-size: 14px;
}
.sustoma{
    color: #3b3937;
    padding:15px;
    margin-right: 15px;
    display: inline-block;
}
.addr_location{
    color: #888;
    line-height: 20px;
    margin-top: 6px;
}
.contain{
    background-color: #FFFFFF;
    padding: 0 14px;
}
.item,.time,.order_time{
    width: 100%;
    padding: 14px 0;
    border-bottom:1px solid #EEEEEE;
    overflow: hidden;
}
.fl {
    float:left;
}
.fr {
    float: right;
}
.span1{
    width: 50%;
    font-family: "微软雅黑";
    font-size: 14px;
    color: #666666;
}
.span2{
    width: 50%;
    font-family: "微软雅黑";
    font-size: 14px;
    color: #AAAAAA;
    text-align: right;
    float: right;
}
.icon1{
    width: 30px;
    height: 30px;
    float:right;
    margin-top: 1px;
}
.icon2{
    width: 30px;
    height: 30px;
    float:right;
    margin-top: 1px;
    margin-right: 6px;	
}
.total{
	padding: 14px 0;
}
.span4{
    width: 50%;
    font-family: "微软雅黑";
    font-size: 14px;
    color: #FF8A00;
    text-align: right;
    float: right;
}
.discount{
    margin-top: 10px;
    padding: 14px;
    background-color: #FFFFFF;
}
.icon3{
    width: 26px;
    height: 18px;
    position: absolute;
    margin-top: 1px;
}
.icon4{
    width: 10px;
    height: 12px;
    float: right;
    margin-top: 3px;
    padding: 1px 0;
}
.span1_1{
    border: solid #FF8A00 1px;
    font-family: "微软雅黑";
    font-size: 12px;
    color: #FF8A00;
    margin-left: 34px;
    line-height: 20px;
}
.span1_2{
    float: right;
    font-family: "微软雅黑";
    font-size: 14px;
    color: #666666;
    margin-right: 4px;
}
.custom_menu{
    margin-top: 10px;
    padding: 0 14px;
    background-color: #FFFFFF;
}
.tip{
    float: right;
    margin-right: 10px;
    font-family: "微软雅黑";
    font-size: 14px;
    color: #666666;
}
.custom_notice{
    display: block;
    background: url("../../assets/img/btn_arrow_05_05.png") no-repeat;
    background-size: 10px 12px;
    background-position: right center;
    font-family: "微软雅黑";
    font-size: 14px;
    color: #666666;
    padding: 14px 0px;
    overflow: hidden;
}
.custom_notice_span{
    float: right;
    margin-right: 18px;
    font-family: "微软雅黑";
    font-size: 14px;
    color: #AAAAAA;
}
.total_pay{
    width: 100%;
    padding: 4px;
    background-color: #FFFFFF;
    position:fixed;
    bottom: 0px;
    left:0px;
}
.money{
    float: left;
    margin: 14px 0px 14px 18px;
    font-family: "微软雅黑";
    font-size: 18px;
    color: #ff8a00;
    width: 40%;
    text-align: center;
}
.paybtn {
    float: right;
    /*width: 40%;*/
    height: 40px;
    line-height: 40px;
    padding: 0 38px;
    margin-right: 15px;
    margin-top: 6px;
    color: #fff!important;
    font-family: "微软雅黑";
    font-size: 18px;
    text-align: center;
    background-color: #ff8a00;
    border-radius: 6px;
    outline: none;
    border: none;
    text-decoration: none;
}
.date_pppp{
    border: 1px;
    color: #fccc;
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
/* 选择地址 */
.addrlist {
    padding: 10px;
    font-size: 14px;
    background: white
}
.diz {
        background: #F7F7F1;
}
.dividers {
    border-bottom: 10px solid #f7f7f2;
}
.diz .arrow-margins {
    background-position: 98% center;
}
.address-wraps {
    /* background-position-y: center; */
    padding-bottom: 15px;
}

.menu-links {
    display: block;
    background: url('../../assets/adder/icon_arrow.png') no-repeat;
    background-size: 7px 12px;
    background-position: right center;
    padding-right: 15px;
}
.section-titles, .lite-dividers {
    border-bottom: 1px solid #d4cfc8;
    padding-left: 15px;
}
.mt1s {
    margin-top: 30px;
}
.fs14s {
    font-size: 14px;
}

.checkboxs.checkeds {
    background-image: url(../../assets/adder/icon_selected.png);
}
.checkboxs {
    float: left;
    display: inline-block;
    width: 16px;
    height: 16px;
    background: url(../../assets/adder/icon_unselect.png) no-repeat;
    background-size: 16px;
    margin-top: 12px;
}
.locations {
    /* color: #888; */
    line-height: 20px;
    /* margin-left: 18px; */
    margin-top: 6px;
}
.mt2 {
    margin-top: 20px;
}
.tc {
    text-align: center;
}

.section-title, .lite-divider {
    border-bottom: 1px solid #777777;
    padding-left: 15px;
}

.input-wrap {
    overflow: hidden;
    line-height: 46px;
}

.hidden-input {
    height: 20px;
    margin-top: 12px;
    border: none;
    outline: none;
    background-color: transparent;
    text-align: right;
}

.menu-link {
    display: block;
    background: url(../../assets/adder/icon_arrow.png) no-repeat;
    background-size: 7px 12px;
    background-position: right center;
    padding-right: 15px;
}

.tc {
    text-align: center;
}
.check {
    color: #f60;
    border-right: 1px solid #ddd;
    border-left: 1px solid #ddd;
    border-top: 2px solid #f60;
    background: #fff;
}
.region {
    font-size: 14px;
    width: 32%;
    text-align: center;
    height: .8rem;
    line-height: .8rem;
}

btn[data-v-11058882] {
    display: block;
    margin: 15px;
    height: 44px;
    line-height: 44px;
    color: #fff!important;
    font-size: 15px;
    text-align: center;
    background-color: #ff8a00;
    border-radius: 3px;
    outline: none;
    border: none;
    text-decoration: none;
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
    background: url(../../assets/adder/icon_cancel.png) no-repeat;
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
.region {
    font-size: 14px;
    width: 32%;
    text-align: center;
    height: 40px;
    line-height: 40px;
}
.btn {
    display: block;
    margin: 15px;
    height: 44px;
    line-height: 44px;
    color: #fff!important;
    font-size: 15px;
    text-align: center;
    background-color: #FF7E00;
    border-radius: 3px;
    outline: none;
    border: none;
    text-decoration: none;
}
.btn-plain {
    display: inline-block;
    padding: 0 20px;
    height: 27px;
    line-height: 27px;
    color: #3b3937;
    border-radius: 3px;
    border: 1px solid #bfbfbf;
}
.mainlian {
    color: #FF7E00;
    border: 1px solid #FF7E00;
    padding: 4px 8px;
    border-radius: 2px
}
/* 优惠券样式 */
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
		background:url("../../assets/cop/bg_courtesy_card.png") no-repeat;
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
		color:#FF7E00;
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
    background: url(../../assets/cop/icon_selectted.png) no-repeat;
    background-size: 20px;
}
.icon_se {
    background: url(../../assets/cop/icon_select.png) no-repeat;
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
    border: 1px #FF7E00 solid;
    color: #FF7E00;
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
    background: #FF7E00;
    padding: 8px 30px;
    font-size: 14px;
    border-radius: 6px;
}
/* 选择地区2 */
.reion-info {
    width: 70%;
    float: right;
    overflow: hidden;
    font-size: 15px;
}
.reionspan {
    width: 31%;
    display: inline-block;
    text-align: right;
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
    background-image: url(../../assets/img/icon_select.png);
    background-repeat: no-repeat;
    background-position: left center;
    background-size: 16px;
    padding: 15px 0 15px 25px;
}
.WCheckedItem {
    background-image: url(../../assets/img/icon_selectted.png);
}
</style>
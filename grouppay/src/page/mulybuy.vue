<template>
   <div class="mulybuy">
         <!-- load -->
        <div class="load6" id="LoadingBar" v-show="load">
            <div class="bounce1"></div>
            <div class="bounce2"></div>
            <div class="bounce3"></div>
        </div>
        <div id="fade" class="black_overlay" v-show="load">
        </div>
        <div id="phoneErro" v-show="phoneErro">
            <span>没有更多</span>
        </div>

		<div id="phoneAjax" class="hidden" v-show="hidden">
			<img src="../assets/images/c3d7f369-4a5e-4c4a-9fb9-a4b9d274c7e1.gif" style="width:40px;height40px;vertical-align: middle;">
		</div>
        <!-- load -->
        <div v-show="currentPage=='main'">
            <!-- <div class="rule_intro" @click="gotosgrouprulr" >
                 <img alt="" src="../assets/images/img_tuangou_zhifu.png" style="width:100%;">
            </div>
            <div style="width:100%;" >
                <img src="../assets/images/img_tuangou_zhifu.png" style="width: 100%;"/>
            </div>-->
            <div style="background: white;height: 15px;width:100%;">&nbsp;</div> 
            <div class="addr_area" @click="ShowAddress">
                <div class="addr_top">&nbsp;</div>
                <div style="text-align:center; background-color:#f7f7f1;">
                    <div class="btn-plain add_btn_style" v-if="!addr.checkedAddress.receiveName" style="">选择收货地址</div>
                </div>
                <div class="menu-link fs14 addr_detail" v-if="addr.checkedAddress.receiveName">
                        <span style="color:#3b3937;">{{addr.checkedAddress.receiveName}}</span>
                        <span style="margin-left:15px;color:#3b3937;">{{addr.checkedAddress.tel}}</span>
                        <div class="addr_location">{{addr.checkedAddress.province}}{{addr.checkedAddress.city}}{{addr.checkedAddress.county}}（{{addr.checkedAddress.xiaoquName}}）{{addr.checkedAddress.detailAddress}}</div>
                </div>
                <div class="addr_bom">&nbsp;</div>
            </div>

            <div class="product_detail" v-for="item in model.items" >
                <img class="product_picture" :src="item.productThumbPic" />
                <div class="product_content">
                    <div class="product_name">{{item.ruleName}}</div>
                     <div class="product_pri_area">
                        <div class="fl fs16 highlight pt5"> ¥{{item.price}} </div>
                        <div class="fl fs13" style="margin-left: 10px;padding-top: 7px;color:#888888"> <del>¥{{item.oriPrice}}</del> </div>
                        <div class="fr fs13" style="padding-top: 7px;color:#888888">X {{item.count}}</div>
                    </div>   
                </div>
            </div>

            <div class="line p15 fs15" style="height:30px">
               <span class="fl">
                    <span class="total fs15">商品总额</span>
                    <span class="fs10">共{{model.totalCount}}个商品</span>
                </span>
                <span class="fr fs20" style="margin-right: 5px;">¥&nbsp;{{model.totalAmount}}</span>
            </div>

            <!--	当满减底价为0或者为0.0时不显示活动信息-->
            <div class="line p15 fs15" style="height:20px" v-if="model.collocation.discountAmount>0">
                <span class="fl">活动优惠</span> 
                <span class="fl baoyou_desc" >满{{model.collocation.satisfyAmount}}减{{model.collocation.discountAmount}}</span>
                <span class="fr highlight">&nbsp; -¥{{disCountAmount}}  </span>
            </div>
            
            <!--	当满免邮费价为0或者为0.0时不显示包邮信息-->
            <div class="line p15 fs15" style="height:20px">
                <span class="fl">快递费</span> 
                <span class="fl baoyou_desc" v-if="model.collocation.freeShipAmount>0">满{{model.collocation.freeShipAmount}}包邮</span>
                <span class="fr"> ¥&nbsp;{{model.logisticsFee}}  </span>
            </div>

            <div class="line p15 fs15" style="height:20px" @click="showCoupons">
                <span class="fl">现金券</span> 
                <span class="fl baoyou_desc" >{{model.couponNum}}张可用</span>
                <div class="fr right_menu">{{model.couponDesc}}  </div>
            </div>

            <div class="p15  " style="height:36px">
                <span class="fl highlight fs15">支付金额</span> 
                <span class="fr highlight fs20 mlr10"> ¥&nbsp;{{model.realAmount}}  </span>
            </div>

            <div class="info-wrap bgwhite">
                <div class="section-title">收货时间</div>
                <div class="menu-link custom-menu-link fs14" style="height:30px" 
                @click="ShowModal">
                <i class="address_icon time-icon fl"></i>{{datechoooser.time}}</div>
            </div>  
            <!-- 选择时间  -->
            <div class="modal-mask" v-if="datechoooser.modalShown" @click="hideModal">
                <div class="modal">
                    <div class="ptb15 lite-divider" :class="{'checked':item.checked}" @click="selectTime(index)" v-for="(item,index) in datechoooser.timePicker">
                        {{item.name}}
                    </div>
                </div>
            </div>

            <div  class=" bgwhite">
                <div class="fs15" style="height:30px;padding:15px 0 5px 15px;">备注</div>
               <div class="inner-input-wrap ">
                        <textarea class="inner-input "  v-model="model.comment"></textarea>
               </div>
               <div style="height: 80px;position: relative;">&nbsp;</div>
            </div>    
                
            <div class="btn-fixed">
                <div class="btn" @click="pay" >立即微信支付</div>
            </div>    
        </div>

        <div v-show="currentPage=='addrlist'">
            <div class="divdir"></div>
            <div class="plr15 arrow-margin menu-link mt1 fs14 address-wrap lite-divider" @click="check(item)"  v-for="(item,index) in addresses" :key="item.id">
                <i class="checkbox fl mt1 " :class="{checked:item.id==checkid}"></i>
                <div>
                    <span style="margin-left:20px">{{item.receiveName}}</span>
                    <span style="margin-left:15px">{{item.tel}}</span>
                    <span style="margin-left:15px" v-if="item.main">默认</span>
                </div>
                <div class="location" style="margin-left:35px" >{{item.province}}{{item.city}}{{item.county}}{{item.locationAddr}}({{item.xiaoquName}}){{item.detailAddress}}</div>
            </div>   
            <div style="text-align:center;margin-top:.4rem;">
                <div class="btn-plains" @click="toAddAddress">新增收货地址</div>
            </div>
        </div>
        
        <!-- 现金券 -->
        <div v-show="currentPage=='coupons'">
            <div class="title-line">
                <div class="title_text">可用现金券</div>
		    	<div class="title_count">共{{coupons.length}}个</div>
            </div>
            <div>
                <div class="coupon_item" v-for="(coupon,index) in coupons" :class="{selected:index==selectedIndex}" @click="chooseCoupon(index)" >
                    <div class="outter_bg">
                        <i class="icon_se"></i>
                        <div class="coupon_desc">
                            <div class="coupon_line_1">
                                <span class="coupon-name">{{coupon.title}}</span>
                                <span class="coupon-time">{{coupon.leftDayDes}}</span>
                            </div>
                            <div class="coupon-limit">使用期限{{coupon.useStartDateStr}}至{{coupon.useEndDateStr}}</div>
                        </div>
                        <div class="coupon_value">
                            <div class="coupon-amount">￥{{coupon.amount}}</div>
                            <div class="coupon-dyq">现金券</div>
                        </div>
                    </div>
                    <div>&nbsp;</div>
                </div>
                <div style="height: 15px;width:100%">&nbsp;
                </div>
                <div class="btn_area" style="margin-bottom: 15px;">
                    <div class="more_btn" @click="confirm">确定</div>
                </div>
            </div>
        </div>

        <!-- 新增地址 -->
        <div style="padding:0 15px" v-show="currentPage=='addAddressForm'">
            <div class="input-wrap lite-dividers lite-divider">
				<span class="fl fs15">联系人</span>
				<input placeholder="请输入联系人姓名" class="fr fs14 hidden-input" v-model="submitAddress.receiveName"/>
			</div>
            <div class="input-wrap lite-dividers lite-divider">
				<span class="fl fs15">手机号</span>
				<input placeholder="请输入手机号码" class="fr fs14 hidden-input" v-model="submitAddress.tel"/>
			</div>
            <div class="input-wrap lite-dividers lite-divider menu-linkad menu-link" @click="showRegion">
                <span class="fl fs15" style="color: #3b3937">所在地区</span>
				<span class="fr fs14" style="color: #aeaeae" v-if="!distinct" >请选择所在地区</span>
				<span class="fr fs14" v-if="distinct">{{distinct}}</span>
			</div>
            <div v-show="selectRegion=='true'">
                <div class="tc">
                    <div class="region fl" :class="{check:currentRegionType==1}" @click="backRegion(1)">选择省</div>
					<div class="region fl" :class="{check:currentRegionType==2}" @click="backRegion(2)">市</div>
					<div class="region fl" :class="{check:currentRegionType==3}">区县</div>     
                </div>    
                <div  style="width:100%;overflow:hidden;background-color: #e0dede;">
					<div class="fs14 fl" v-for="(region,index) in regions" :key="region.id"
                     :class="{city:Math.floor((index/4)%2)==0,city2:Math.floor((index/4)%2)==1}"
                     @click="updateRegion(region)">{{region.name}}</div>
				</div>
				<div> &nbsp;</div>
            </div>
            <div v-show="selectRegion=='false'">
                <div class="input-wrap lite-dividers lite-divider menu-linkad menu-link"  @click="showLocation" >
					<span class="fl fs15">小区或大厦</span>
					<span class="fr fs14"  style="color: #aeaeae" v-if="submitAddress.xiaoquName==''">请输入小区或大厦</span>
					<span class="fr fs14" v-if="submitAddress.xiaoquName">{{submitAddress.xiaoquName}}</span>
				</div>
                <div class="input-wrap lite-dividers lite-divider menu-linkad menu-link">
					<span class="fl fs15">小区地址</span>
					<input placeholder="例如：三林路128弄" class="fr fs14 hidden-input" v-model="submitAddress.amapDetailAddr"/>
				</div>
				<div class="input-wrap lite-dividers lite-divider menu-linkad menu-link">
					<span class="fl fs15">楼栋门牌号</span>
					<input placeholder="例如：1号楼402室" class="fr fs14 hidden-input" v-model="submitAddress.homeAddress"/>
				</div>
                <div class="btn" @click="addAddress">保存</div>
            </div>
        </div>

        <div style="background-color: #fffff8" v-show="currentPage=='xiaoquForm'">
            <div class="location-wrap">
				<div class="location-input-wrap">
					<input placeholder="请输入小区名称" class="location-input" v-model="suggestLocation" />
					<i class="location-btn-cancel" @click="cancelLocation" v-if="suggestion"></i>
				</div>
				<span class="location-btn-ensure" @click="submitLocation">确定</span>
			</div>
            <div class="location-empty-tip" v-if="!suggestions.length">
				准确的小区、街道或大厦名称能加快送货速度
			</div>

            <div v-if="suggestions.length" class="location-location" @click="chooseLocation(suggestion)"
             v-for="suggestion in suggestions" :key="suggestion.id" >
			<span style="position:relative;font-color:#cccccc">{{suggestion._name}} - {{suggestion._address}}</span>
			</div>
        </div>
   </div>
</template>

<script>
let vm;
import wx from 'weixin-js-sdk';
export default {
   data () {
       return {
           load:false,
           phoneErro:false,
           hidden:false,
           paying:false,
           currentPage:'main',
           disCountAmount:0,
           checkid:'',
           disLogisticsFee:true,
           model:{
               type:3,/**默认特卖*/
               collocation:{},
               items:[],
               totalCount:0,
               totalAmount:0,
               discountAmount:0,
               logisticsFee:0,
               couponNum:0,
               coupon:null,
               couponDesc:'未使用',
               realAmount:0,
               comment:'',
               receiveTimeType:2,
               order:{},
               type:3,/**默认特卖*/

           },
           addr:{
               checkedAddress:{}
           },
           datechoooser:{
            time: '任何时间',
	        comment: '',
	        timePicker: [
	            {
	                name: '工作日',
	                value:0,
	                checked: false,
	            },
	            {
	                name: '节假日',
	                value:1,
	                checked: false
	            },
	            {
	                name: '任何时间',
	                value:2,
	                checked: true
	            }
	        ],
	        modalShown:false, 
           },
           addresses:[],
           coupons:[
            //    {
            //        id:1,
            //        title:'滴滴滴',
            //        leftDayDes:'11',
            //        useStartDateStr:'22',
            //        useEndDateStr:'33',
            //        amount:100
            //    }

           ],
           selectedIndex:-1,
           submitAddress:{
                receiveName:"",
                tel:"",
                provinceId:0,province:"",
                cityId:0,city:"",
                countyId:0,county:"",
                xiaoquName:"",
                amapId:0,
                amapDetailAddr:"",
                homeAddress:""
          },
          distinct:'',
          selectRegion:'false',  
          currentRegionType:1,
          regions:[],
          provinces:[],
          citys:[],
          countys:[],
           /**使用高德推荐*/
            suggestLocation:'',
            suggestion:{},
            suggestions:[],
       };
   },
   created() {
       vm=this;
   },
   mounted() {
        // let url1 ='/initSession4Test/105';
        //     this.receiveData.getData(this,url1,'Data',function(){
        // });

        this.common.checkRegisterStatus()

        vm.queryBuyInfo();
        vm.queryAddress();
        vm.queryCoupon();
     
   },

   components: {},
   watch:{
       suggestLocation(nw,nv) {
           if(vm.suggestLocation.length>=2 && vm.suggestLocation!=vm.suggestion._name) {
               vm.getSuggestion();
           }
       }
   },
   methods: {
       queryBuyInfo() {
        let url ='/collocation/getCartWithAddr';
        vm.receiveData.getData(vm,url,'res',function(){
            if(vm.res.success) {
                vm.model.collocation=vm.res.result.collocation;
                vm.model.items=vm.res.result.cart.items;
                if(vm.res.result.address!=null) {
                    vm.addr.checkedAddress = vm.res.result.address;
                }
                vm.computeAmount();
            }else {
                alert("获取购物车信息失败，请耐心重试！")
            }
        });
       }, 
       queryAddress() {
           let url ='/addresses';
            vm.receiveData.getData(vm,url,'res',function(){
                if(vm.res.success) {
                    vm.addresses = vm.res.result;
                }else {
                    alert("获取地址信息失败！");
		            vm.addresses = [];
                }
            });
       },
       queryCoupon() {
           let url ='/coupon/valid4Cart';
            vm.receiveData.getData(vm,url,'res',function(){
                if(vm.res.success) {
                    vm.coupons = vm.res.result;
                }else {
                    alert("获取现金券信息失败！！");
		            vm.coupons = [];
                }
            });
       },
       getRegions(type,id) {
           let url ="regions/" +type+"/"+id;
            vm.receiveData.getData(vm,url,'res',function(){
                if(vm.res.success) {
                    vm.regions = vm.res.result;
                }else {
                    alert("获取区域信息失败，请稍后重试！");
                }
            });
       },
       getSuggestion() {
            let url ="amap/"+vm.submitAddress.city+"/"+vm.suggestLocation;
            vm.receiveData.getData(vm,url,'res',function(){
                if(vm.res.success) {
                    vm.suggestions = vm.res.result;
                }else {
                    vm.suggestions=[];
                }
            });
       },
       ShowModal() {
           vm.datechoooser.modalShown=true;
       },
       hideModal() {
             vm.datechoooser.modalShown=false;
       },
       toAddAddress() {
           vm.currentPage='addAddressForm';
           vm.submitAddress={
            xiaoquEntId: 0,
            receiveName: "",
            province: "",
            city: "",
            county: "",
            tel: "",
            xiaoquAddr: "",
            xiaoquName: "",
            id: 0,
            detailAddress: ""
            } 
            vm.distinct=''  
       },
       cancelLocation() {
           vm.suggestLocation='';
           vm.currentPage='addAddressForm';
       },
       submitLocation() {
            vm.submitAddress.xiaoquName = vm.suggestLocation;
	    	vm.submitAddress.amapId=vm.suggestion._id;
	    	vm.submitAddress.amapDetailAddr=vm.suggestion.detailaddress;
	    	vm.currentPage = "addAddressForm";
       },
       chooseLocation(suggestion) {
           vm.suggestion = suggestion;
	       vm.suggestions=[];
	       vm.suggestLocation = suggestion._name;
       },
       selectTime(idx){
           for(var i=0;i<vm.datechoooser.timePicker.length;i++) {
               vm.datechoooser.timePicker[i].checked=false;
           }
            vm.datechoooser.timePicker[idx].checked=true;
            vm.datechoooser.time = vm.datechoooser.timePicker[idx].name;
            vm.model.receiveTimeType = vm.datechoooser.timePicker[idx].value;
            vm.datechoooser.modalShown = false;  
       },
       ShowAddress() {
            vm.currentPage="addrlist";
       },
       showLocation() {
           if(vm.submitAddress.city == ""||vm.submitAddress.county==""||vm.submitAddress.province=="") {
	    		alert('请先选择你所在的区域！');
	    		return;
	    	}
	    	vm.suggestions=[];
           vm.currentPage='xiaoquForm';
       },
       chooseCoupon(idx) {
          if(vm.selectedIndex!=idx) {
              vm.selectedIndex=idx;
          }else {
              vm.selectedIndex=-1;
          }
        //   vm.confirm();
           
       },
       chooseCoupons(coupon) {
            if(coupon == null) {
                vm.model.coupon=null;
                vm.model.couponDesc = '未使用';
            } else {
                vm.model.coupon = coupon;
                vm.model.couponDesc = "￥"+coupon.amount+"元";
            }
             vm.computeAmount();
            vm.currentPage="main";
       },
       confirm() {
           if(vm.selectedIndex<0|| vm.selectedIndex>=vm.coupons.length) {
               vm.chooseCoupons(null)
           }else {
               vm.chooseCoupons(vm.coupons[vm.selectedIndex]);
           }
         
       },
       //计算
       computeAmount() {
           var count =0;
           var amount= 0;
           for(var i=0;i<vm.model.items.length;i++) {
               if(vm.model.items[i]!=null&&vm.model.items[i]) {
                   count+=vm.model.items[i].count;
                   amount+=vm.model.items[i].count*vm.model.items[i].price;
               }
           } 
           vm.model.totalCount=count;
           vm.model.totalAmount=amount.toFixed(2);
           var discountTime=Math.floor(vm.model.totalAmount/vm.model.collocation.satisfyAmount);
           vm.model.discountAmount=vm.model.collocation.discountAmount*discountTime;
           if(isNaN(vm.model.discountAmount)) {
               vm.model.discountAmount=0;
           } 
           vm.disCountAmount=vm.model.discountAmount.toFixed(2);
           amount=amount-vm.model.discountAmount;

           if(vm.model.collocation.freeShipAmount <=0 || vm.model.collocation.freeShipAmount > amount) {
               vm.model.logisticsFee=vm.model.collocation.shipAmount;
               amount=amount+vm.model.collocation.shipAmount;
               vm.disLogisticsFee=false;
           }else {
               vm.disLogisticsFee=false;
           }

           if(vm.model.coupon!= null) {
               vm.model.discountAmount +=vm.model.coupon.amount;
               amount= amount -vm.model.coupon.amount;
           }
           if(amount>0) {
               vm.model.realAmount=amount.toFixed(2);
           }else {
               vm.model.realAmount='0.01';
           }
       },
       //跳转规则
    //    gotosgrouprulr() {
    //        vm.$router.push({path:'/sgrouprule'})
    //    },
       check(item) {
           vm.addr.checkedAddress=item;
           vm.checkid=item.id;
           vm.currentPage='main';
       },
       showCoupons() {
           vm.currentPage="coupons";
       },
       //所在小区
       showRegion() {
           if(vm.selectRegion !='true') {
               vm.selectRegion= 'true';
               vm.changeRegionView();
           }else {
               vm.selectRegion='false';
           }

       },
       backRegion(regionType) {
           if(regionType==1) {
               vm.currentRegionType=regionType;
               if(vm.provinces.length<=0) {
                   vm.getRegions(1,1);
               }else {
                   vm.regions=vm.provinces;
               }
           }else if(regionType== 2) {
               vm.currentRegionType=regionType;
               vm.getRegions(2,vm.submitAddress.provinceId);
           }
       },
       updateRegion:function(region){
	    	vm.changeRegionView(region.regionType,region.id,region.name);
	    },
       changeRegionView(regionType,regionId,regionName) {
           if(!regionType) {
               if(vm.provinces.length==0) {
                   vm.getRegions(1,1);
               }else {
                   vm.regions=vm.provinces;
               }
           }else {
               if(regionType==1) {
                   if(vm.submitAddress.provinceId!=regionId || city.length ==0) {
                     vm.getRegions(2,regionId)  
                   }else {
                       vm.regions=vm.citys;
                   }
                    vm.submitAddress.province=regionName;
                    vm.submitAddress.provinceId=regionId;
                    vm.currentRegionType=2;
               }else if(regionType == 2) {
                   if(vm.submitAddress.cityId!=regionId || countys.length==0) {
                       vm.getRegions(3,regionId)
                   }else {
                       vm.region=vm.countys;
                   }
                    vm.submitAddress.city=regionName;
                    vm.submitAddress.cityId=regionId;
                    vm.currentRegionType=3;
               }else if(regionType == 3) {
                    vm.submitAddress.county=regionName;
                    vm.submitAddress.countyId=regionId;
                    vm.distinct=vm.submitAddress.province+vm.submitAddress.city+vm.submitAddress.county;
                    vm.currentRegionType=1;  
                    vm.selectRegion="false";
               }
           }
       },
       //保存地址
       addAddress() {
           if(vm.submitAddress.province==""||vm.submitAddress.city==""||vm.submitAddress.county==""){
	    		alert("请选择地址！");
	    		return;
	    	}
	    	if(vm.submitAddress.amapDetailAddr==""||vm.submitAddress.receiveName==""
	    		||vm.submitAddress.tel==""||vm.submitAddress.homeAddress==""){
	    		alert("请填写完整相关信息！");
	    		return;
	    	}
	    	if(!(/^1[3-9][0-9]\d{4,8}$/.test(vm.submitAddress.tel))) {
	    		alert("请填写正确的手机号！");
	    		return;
            }
            vm.saveAddress();
       },
       saveAddress() {
           var addr = {};
            addr.receiveName=vm.submitAddress.receiveName;
            addr.tel=vm.submitAddress.tel;
            addr.provinceId=vm.submitAddress.provinceId;
            addr.province=vm.submitAddress.province;
            addr.cityId=vm.submitAddress.cityId;
            addr.city=vm.submitAddress.city;
            addr.countyId=vm.submitAddress.countyId;
            addr.county=vm.submitAddress.county;
            addr.xiaoquName=vm.submitAddress.xiaoquName;
            addr.detailAddress=vm.submitAddress.amapDetailAddr+vm.submitAddress.homeAddress;
            addr.amapDetailAddr=vm.submitAddress.amapDetailAddr;
            addr.amapId=vm.submitAddress.amapId;

            let url2 = "addAddress";
            vm.receiveData.postData(vm, url2,addr,'res', function(){
                    if(vm.res.success) {
                        vm.addresses.push(vm.res.result);
                        vm.addr.checkedAddress=vm.res.result;
                        vm.currentPage='addrlist';
                    }else {
                        alert(vm.res.message==null?"地址保存失败，请重试！":vm.res.message);
                    }
                }
            )
       },
        //立即支付
       pay() {
           if(vm.paying) {
               alert("订单处理中，请勿重复提交！")
               return;
           }
           var order = {
               serviceAddressId:vm.addr.checkedAddress.id,
               memo:vm.model.comment,
               receiveTimeType:vm.model.receiveTimeType
           }
           if(vm.model.coupon != null) {
               order.couponId=vm.model.coupon.id;
           }
          console.log()
          if(vm.addr.checkedAddress.id==undefined || vm.addr.checkedAddress.id==0) {
              alert('请选择地址')
              return;
          }
            vm.createOrder(order);
       },
       createOrder(order) {
           vm.paying=true;
           if(vm.model.order!={} && vm.model.order.id>0) {
               vm.requestPay();
               return;
           }
        vm.hidden=true;
        let url = "createOrder4Cart";
        vm.receiveData.postData(vm, url,order,'res', function(){
                if(vm.res.success) {
                   vm.hidden=false;
                    vm.model.order=vm.res.result;
                    vm.requestPay();
                }else {
                    vm.hidden=false;
                    alert(vm.res.message==null?"订单创建失败，请稍后重试！":vm.res.message);
                    vm.paying=false;
                }
            }
        )
       },
       requestPay() {
          let url ="/requestPay/"+vm.model.order.id;
          vm.receiveData.getData(vm,url,'res',function(){
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
                    success:function(res) {
                        alert('下单成功');
                     vm.$router.push({path:'/success',query:{'orderId':vm.model.order.id+"&type=3"}})
                    },
                    fail:function(res) {
                        console.log('支付错误了'+JSON.stringify(res))
                    },
                    cancel:function(res){
                        alert('支付取消');
                        
                    }
                }) 
              }else {
                alert(vm.res.message==null?"支付请求失败，请稍后重试！":vm.res.message);
            	vm.paying=false;
              }
             
         });
       }
   },

   computed: {},
}
</script>

<style  scoped>
/* load */
.load6 {
    margin: 100px auto 0;
    width: 150px;
    top: 25%;
    left: 25%;
    width: 50%;
    text-align: center;
    position: fixed;
    z-index: 1002;
    overflow: auto;
}

.load6>div {
    width: 30px;
    height: 30px;
    background-color: #FF8A00;
    border-radius: 100%;
    display: inline-block;
    -webkit-animation: bouncedelay 1.4s infinite ease-in-out;
    animation: bouncedelay 1.4s infinite ease-in-out;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
}
.load6 .bounce1 {
    -webkit-animation-delay: -0.32s;
    animation-delay: -0.32s;
}
.load6 .bounce2 {
    -webkit-animation-delay: -0.16s;
    animation-delay: -0.16s;
}
@-webkit-keyframes bouncedelay{
    0%,80%,100%{-webkit-transform:scale(0.0)}
    40%{-webkit-transform:scale(1.0)}}
@keyframes bouncedelay{
    0%,80%,100%{transform:scale(0.0);-webkit-transform:scale(0.0)}
    40%{transform:scale(1.0);-webkit-transform:scale(1.0)}}

.black_overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #f5f5f5;
    z-index: 1001;
    -moz-opacity: .8;
    opacity: .80;
    filter: alpha(opacity=80);
}
  
#phoneErro {
    margin: 100px auto 0;
    top: 25%;
    left: 25%;
    width: 50%;
    text-align: center;
    height: 60px;
    line-height: 60px;
    background-color: black;
    -moz-opacity: .8;
    opacity: .80;
    filter: alpha(opacity=80);
    position: fixed;
    z-index: 1999;
    overflow: auto;
    color: white;
    -moz-border-radius: 15px;
    -webkit-border-radius: 15px;
    font-size: 14px;
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
.rule_intro {
    position: absolute;
    width: 100%;
    top:0;
    z-index: 10;
}
.addr_area {
    background-color:#F7F7F1;
}
.addr_top {
    background:url(../assets/images/bg_line_location_top.png) repeat-x;height:2px;background-size: 100% 2px;
}
.addr_bom {
    background:url(../assets/images/bg_line_location_bottom.png) repeat-x;height:2px;background-size: 100% 2px;
}
.btn-plain {
    padding:4px 30px;
    margin:20px 0;
    background-color:white;
    color:#cfa972;
    border:1px solid #ccc;
    border-color:#cfa972;
    display:inline-block;
    height: 27px;
    line-height: 27px;
    border-radius: 3px;
}
.menu-link  {
    background: url('../assets/images/icon_arrow.png') no-repeat;
    background-size: 7px 12px;
    background-position: right center;
}
.fs14 {
    font-size:14px;
}
.addr_detail {
padding:15px;
margin-right: 15px;
}
.addr_location {
    color: #888;
    line-height: 20px;
    margin-top:6px;
}
.product_detail {
    width: 100%;
    height: 80px;
    background-color: #fff;
}
.product_picture {
    margin:10px 15px 0 15px;
    width: 52px;
    height: 52px;
    float: left;
    border:1px solid #cecece;
}
.product_content {
    margin-left: 80px;
    margin-right: 10px;
    padding-top:10px;
}
.product_name {
    height: 32px;
    line-height: 16px;
    color:#3b3937;
    font-size:12px;
}
.product_pri_area {
    width:100%;
    height: 35px;
    border-bottom: 2px solid #f7f7f1;
}
.fs16 {
    font-size:16px;
}
.highlight {
    color: #ff8a00;
}
.pt5 {
    padding-top:5px;
}
.fs13 {
    font-size:13px;
}
.fs15 {
    font-size:15px;
}
.line {
    padding:15px;
    background:#f7f7f1;
    border-bottom:1px solid #c2c2c2;
    margin-left: 10px;
}
.p15 {
    padding: 15px;
}
.fs10 {
    font-size:10px;
}
.fs20 {
    font-size:20px;
}
.baoyou_desc {
    border:1px solid #ff8a00;
    padding:2px 13px;
    border-radius: 2px;
    font-size:13px;
    color:#ff8a00;
    margin-left: 10px;
    margin-top:-2px;
}
.right_menu {
    background:url('../assets/images/icon_arrow.png') no-repeat;
    padding-left:  15px;
    padding-right: 15px;
    display:block;
    background-position: right center;
    background-size:7px 12px;
}
.mlr10 {
    margin-left: 10px;
    margin-right: 10px;
}
.info-wrap {
    padding:4px;
    font-size:12px;
    color:#3b3037;
    border-bottom:4px solid #f9f9e9;
}
.bgwhite {
    background-color:white;
}
.section-title {
    padding:15px 0 7px 15px;
    font-size:13px;
    color:#7e6b5a;
    display: block;
    border-bottom: 1px solid #d4cfc8;
}
.custom-menu-link {
    padding:15px 15px 0 15px;
    color:#3b3937;
}
.menu-link {
    background:url('../assets/images/icon_arrow.png') no-repeat;
     background-position: right center;
    background-size:7px 12px;
}
.modal-mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.5);
}
.modal {
    background-color: #fff;
    border-radius: 5px;
    margin: 200px auto;
    padding:10px 15px;
    width: 60%;
}
.ptb15 {
    padding:15px 0 15px 15px;
}
.lite-divider {
    border-bottom: 1px solid #d4cfc8;
}
.mulybuy  .checked {
    background:url('../assets/images/icon_selected.png') no-repeat;
    background-position: right center;
    background-size:16px;
}
.content {
    height: 100px;
    position: relative;
    margin:0 15px;
    background-color: #fffff8;
    border:1px solid #d4cfc8;
    outline: none;
}
.inner-input-wrap {
    /* position: relative; */
    padding: 6px 0;
}
.inner-input {
    display: block;
    height: 100px;
    width: 85%;
    outline: none;
    border: 1px solid #d4cfc8;
    border-radius: 4px;
    padding: 0 10px;
    vertical-align: middle;
    font-size: 15px;
    padding-top: 10px;
    margin:0 15px;
}
.btn-fixed {
    position:fixed;
    left: -15px;
    right: -15px;
    bottom: -15px;    
}
.btn {
    background-color: #ff8a00;
    height: 44px;
    line-height: 44px;
    margin:15px;
    text-align: center;
    color:#fff !important;
}

/* --------------- */
.divdir {
    border-top:10px solid #f7f7f2;
}
.arrow-margin {
    background-position:98% center;
    padding-left: 15px;
}
.address-wrap {
    padding-bottom: 15px;
}
.mt1 {
    margin-top:.3rem;
}
.checkbox {
    display:inline-block;
    width:16px;
    height: 16px;
    background:url('../assets/images/icon_unselect.png') no-repeat;
    background-size:16px;
}
.location {
    color:#888;
    line-height:20px;
    margin-top:6px;
}
.btn-plains {
    display:inline-block;
    padding:0 20px;
    height:27px;
    line-height:27px;
    color: #3b3937;
    border-radius: 3px;
    border: 1px solid #bfbfbf;
   text-decoration: none;
}
/* ---- */
.title-line {
    margin:15px;
    border-bottom: 1px solid #888888;
    height: 35px;
}
.title_text {
    float: left;
    font-size: 13px;
    color:#666666;
}
.title-count {
    float: left;
    font-size: 13px;
    color:#666666;     
}
.coupon_item {
    padding:0px 15px 30px 15px;
}
.outter_bg{
    background:url("../assets/images/bg_courtesy_card.png") no-repeat;
    background-size: 100% 110px;
    height:115px;
}
.icon_se{
    background:url('../assets/images/icon_select.png') no-repeat;
    background-size: 20px;
    display: inline-block;
    width: 20px;
    height: 20px;
    z-index: 110;
    margin-left: -10px;
    position:absolute;
    margin-top: 38px;
}
.selected .icon_se{
    background:url('../assets/images/icon_selected.png') no-repeat;
    background-size: 20px;
}
.coupon_desc{
    float:left;
    width: 74%;
    background:url("../assets/images/bg_courtesy_card.png") no-repeat;
    font-size: 20px;
    background-size: 138% 100px;
    background-position: 0px 0px;
    height:100px;
}
.coupon_desc{
    float:left;
    width: 74%;
    font-size: 20px;
    height:120px;
    background-size: 138% 110px;
    background-position: 0px 0px;
}
.coupon_line_1{
        width: 100%;
        padding: 20px 20px 0 20px;
}
.coupon-name{
    font-size: 20px;
    color:#ff8a00;
    display: block;
}
.coupon-time{
    border: 1px #b28850 solid;
    color:#b28850;
    border-radius: 20px;
    padding: 0px 10px;
    font-size: 12px;
}
.coupon-limit{
    position: absolute;
    font-size:11px;
    color:#666666;
    padding:10px 0 10px 20px;
    width: 60%;
}
.coupon_value{
    float:right;
    width:26%;
    height:110px;
    background:url("../assets/images/bg_courtesy_card.png") no-repeat;
    font-size: 20px;
    background-size: 358% 100%;
    background-position: 100% 0px;
}
.coupon-amount{
    color:white;
    text-align: center;
    padding: 20px 0 0 0;
    font-size: 24px;
}
.coupon-dyq{
    color:white;
    text-align: center;
    padding: 10px 0 0 0;
    font-size: 13px;
}
.btn_area{
    text-align: center;
    width:100%;
    position: fixed;
    bottom: 10px;
}
.more_btn{
    margin-left: 20px;
    margin-right: 20px;
    color: white;
    background: #ff8a00;
    padding: 8px 30px;
    font-size: 14px;
    border-radius: 6px;
}
/* --------------- */
.input-wrap {
    overflow: hidden;
    line-height: 45px;
}
.lite-dividers {
    padding-left: 15px;
}
.hidden-input {
    border:none;
    outline: none;
    background-color:transparent;
    text-align: right;
    height: 20px;
    margin-top:12px;
}
.menu-linkad  {
    padding-right: 15px;
    display: block;
}
.tc {
    text-align:center;
}
.region {
    width:32%;
    font-size:16px;
    height: 30px;
    line-height: 30px;
}
.check {
    color:#f60;
    border-top:2px solid #f60;
    border-left: 1px solid #ddd;
    border-right:1px solid #ddd;
    background:#fff;
}
.addrheight {
    height: 84px;
}
.city {
    background-color:#fff;
}
.city2 {
    background-color:#E0E0E0;
}
.city,.city2 {
    font-size:14px;
    color:#000;
    width: 25%;
    height: 30px;
    line-height: 30px;
    text-align: center;
}
.location-wrap {
    position: relative;
    height: 49px;
    line-height: 49px;
    padding:0 10px;
    border-bottom:1px solid #d4cfc8;
}
.location-input-wrap {
    position: relative;
    left: 0;
    margin-right: 80px;
    padding:5px 10px;
}
.location-input {
    display:block;
    width:100%;
    height: 36px;
    outline: none;
    border:1px solid #d4cfc8;
    border-radius: 4px;
    vertical-align: middle;
    font-size: 15px;
}
.location-btn-cancel {
    position: absolute;
    top:5px;
    right: 4px;
    display: inline-block;
    width:36px;
    height: 36px;
    background:url('../assets/images/icon_cancel.png') no-repeat;
    background-size:15px;
    background-position: center;
}
.location-btn-ensure {
    position:absolute;
    top:0;
    right: 15px;
    width: 65px;
    height: 36px;
    line-height: 36px;
    text-align: center;
    margin-top:5px;
    border:1px solid #d4cfc8;
    color:#3b3937;
}
.location-empty-tip {
    margin:0 auto;
    margin-top:105px;
    text-align: center;
    font-size:12px;
    width:165px;
    line-height: 18px;
    color:#888;
}
.location-location {
    padding: 15px 0;
    margin:0 15px;
    border-bottom:1px solid #d4cfc8;
}

</style>
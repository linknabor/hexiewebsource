<template>
  <div class="buy">
    <div class="load6" id="LoadingBar" v-show="false">
        <div class="bounce1"></div>
        <div class="bounce2"></div>
        <div class="bounce3"></div>
    </div>
    <div id="fade" class="black_overlay" v-show="false">
    </div>

    <!-- 主页面 -->
    <div class="zhi" v-show="currentPage=='main'" >
        <!-- <div>
            <div class="rule_intro" @click="gotosgrouprulr" >
                <img alt="" src="../assets/images/img_tuangou_zhifu.png" style="100%">
            </div>
            <div style="width:100%;" >
                 <img src="../assets/images/img_tuangou_zhifu.png" style="width: 100%;"/>
            </div>
        </div> -->
            
        <div style="background: white;height: 15px;width:100%;">&nbsp;</div>
        <!-- 新增地址 -->
        <div class="addr_area" @click="aShowAddress">
            <div class="addr-top">&nbsp;</div>
            <div style="text-align:center;background-color: #f7f7f1;">
                <a href="javascript:void(0)" class="btn-plain add_btn_style" v-if="!checkedAddress.receiveName" style="" >选择收货地址</a>
            </div>

            <div class="menu-link fs14 addr_detail" v-if="checkedAddress.receiveName" >
                <span style="color:#3b3937;" id="infoname">{{checkedAddress.receiveName}}</span>
                <span style="margin-left:15px;color:#3b3937;" id="infotel">{{checkedAddress.tel}}</span>
                <div class="addr_location" id="infoaddr">{{checkedAddress.province}}{{checkedAddress.city}}{{checkedAddress.county}}（{{checkedAddress.xiaoquName}}）{{checkedAddress.detailAddress}}</div>
            </div>
            <div class="addr-f">&nbsp;</div>
        </div>

        <div class="product_detail" >
            <img class="product_picture" :src="product.smallPicture"/>
            <div class="product_content">
                <div class="product_name">{{product.name}}</div>
                <div class="product_pri_area">
                    <div class="fl fs16 highlight pt5"> ¥{{rule.price}} </div>
                    <div class="fl fs13" style="margin-left: 10px;padding-top: 7px;color:#888888"> <del>¥{{product.oriPrice}}</del> </div>
                    <div class="fr fs13" style="padding-top: 7px;color:#888888">X {{count}}</div>
                </div>
            </div>
        </div>
    
        <div class="line p15 fs15">
            <span>商品价格</span> <span class="fr highlight">¥&nbsp;{{productAmount}}</span>
        </div>

        <div class="line fs15" style="height:50px;line-height: 50px;">
            <span>购买数量</span> 
            <span class="fr">
                <span class="sbtn btn-minus minus-btn-size" :class="{active:count>1}" @click="minusCount"></span>
                <span class="number fs16">{{count}}</span>
                <span class="sbtn btn-add active minus-btn-size" @click="addCount"></span>
            </span>
        </div>

        <div class="line p15 fs15" style="height:20px">
            <span class="fl">快递费</span> 
            <span class="fl baoyou_desc" v-show="rule.freeShippingNum<999">&nbsp;&nbsp;{{rule.freeShippingNum}}件包邮</span>
            <span class="fr" v-show="postFee!=0"> ¥&nbsp;{{rule.postageFee}}</span>
            <span class="fr" v-show="postFee==0"><del> ¥&nbsp;{{rule.postageFee}}</del></span>
        </div>

        <div class="line" style="height:30px">
            <span class="fl">
                <span class="total fs15">商品总额</span>
                <span class="fs10">共{{count}}个商品</span>
            </span>
            <span class="fs20 fr" style="margin-right: 5px;">¥&nbsp;{{amount}}</span>
        </div>

        <div class="line p15 fs15" style="height:20px" @click="showCoupons">
            <span class="fl">现金券</span> 
            <span class="fl baoyou_desc" >&nbsp;&nbsp;{{coupons.length}}张可用</span>
            <div class="fr right_menu">{{couponDesc}}  </div>
        </div>


        <div class="p15  highlight" style="height:36px">
                <span class="fl fs15">支付金额</span> 
                <span class="fr fs20 mlr10"> ¥&nbsp;{{totalAmount}}  </span>
        </div>

        <div class="info-wrap bgwhite">
            <div class="section-title">收货时间</div>
            <a href="#" class="menu-link custom-menu-link fs14" style="height:30px" @click="showModal">
                <i class="address_icon time-icon fl"></i>{{datechoooser.time}}</a>
        </div>

        <div  class=" bgwhite">
            <div class="fs15" style="height:30px;padding:15px 0 5px 15px;">备注</div>
            <div contenteditable ref="bgbei" class="content p15" @click="focus" @blur="storeMemo" style="font-size: 15px;"></div>
            <div style="height: 80px;position: relative;">&nbsp;</div>
        </div>

        <div class="btn-fixed">
            <div class="btn" @click="pay" :class="{useless:paying}">立即微信支付</div>
        </div>

        <div class="modal-mask" v-show="datechoooser.modalShown" @click="hideModal" >
            <div class="modal">
                <div class="ptb15 lite-divider" v-for="(item,i) in datechoooser.timePicker" 
                :class="{checkedItem:item.checked}" 
                @click="selectTime(i)">{{item.name}}</div>
                </div>
        </div>
    </div>

    <!-- 优惠劵 -->
    <div v-show="currentPage=='coupons'">
        <div class="title-line">
                <div class="title_text">可用现金券</div>
            <div class="title_count">共{{coupons.length}}个</div>
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
                <div>&nbsp;</div>
            </div>
        </div>

        <div style="height: 15px;width:100%">&nbsp;
        </div>
        <div class="btn_area" style="margin-bottom: 15px;">
            <div class="more_btn" @click="confirm">确定</div>
        </div>
    </div>
    <!-- <div id="zzmb" v-show="zzshow" class="zzmb" style="display:none;position:fixed;"></div> -->

    
     <!-- 新增地址 -->
    <div  v-show="currentPage=='addrlists'" class="diz" >
        <div class="dividers"></div>
        <div  class="plr15s arrow-margins menu-links mt1s fs14s address-wraps lite-dividers" @click="checks(item)"  v-for="item in addresses" :key="item.id" >
            <i class="checkboxs fl" :class="{checkeds:checkedAddress&&checkedAddress.id===item.id}"></i>
            <div style="margin: 10px 0 10px 30px;">
                <span >{{item.receiveName}}</span>
                <span style="margin-left:15px">{{item.tel}}</span>
                <span style="margin-left:15px" class="default_item" v-show="item.main">默认</span>
            </div>
            <div class="locations" >{{item.province}}{{item.city}}{{item.county}}{{item.locationAddr}}({{item.xiaoquName}}){{item.detailAddress}}</div>
        </div>
        <div class="tc mt2"><a class="addr_btn_plain" @click="toAddAddress">新增收货地址</a><br/></div>
    </div>

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

        <!-- 小区 -->
    <div v-show="currentPage=='xiaoquForm'">
            <div style="background-color: #fffff8" >
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
        <!-- 小区 -->
  </div>
</template>

<script>
let vm;
import wx from 'weixin-js-sdk';
export default {
   data () {
       return {
            zzshow:false,
            currentPage:'main',
            selectRegion:'false',
            ruleId:this.$route.query.ruleId,
            type:this.$route.query.type,/**3默认特卖*/
            product:{},
            rule:{limitNumOnce:10,price:0},
            address:{},
            checkedAddress:{},
            count:1,//数量
            productAmount:0, //商品价格
            postFee:0,// 是否包邮
            amount:0,//总价格
            coupons:[
            //     {
            //        id:1,
            //        title:'滴滴滴',
            //        leftDayDes:'11',
            //        useStartDateStr:'22',
            //        useEndDateStr:'33',
            //        amount:100
            //    }
            ],
            couponNum:0,
        	coupon:null,
            couponDesc:'未使用',
            selectedIndex:-1,
            totalAmount:0,
            paying:false,
            order:{},
            receiveTimeType:2,
            //备注
            comment:'',

            //送货事件
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
             modalShown: false,
              },
            //地址参数
            addresses:[],
            submitAddress:{
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
              },
              currentRegionType:1,
              regions:[],
              provinces:[],
              citys:[],
              countys:[],
              distinct:'',
            /**使用高德推荐*/
            suggestLocation:'',
            suggestion:{},
            suggestions:[],  
       };
   },
   watch: {},
   created() {
       vm=this;
   },
   mounted() {
       vm.common.checkRegisterStatus()
    
        vm.roady();
        vm.dataAddress();
        // this.initSession4Test();
   },
   components: {
       
   },
    watch:{
      suggestLocation: {
      handler(nv, ov) {
        if (
          vm.suggestLocation.length >= 2 &&
          vm.suggestLocation != vm.suggestion._name
        ) {
          vm.getSuggestion();
        }
      },
      deep: true
    }
    //    suggestLocation(nw,nv) {
    //        if(vm.suggestLocation.length>=2 && vm.suggestLocation!=vm.suggestion._name) {
    //            vm.getSuggestion();
    //        }
    //    }
   },
   methods: {
        roady() {
           if(vm.ruleId&&vm.type){
                vm.queryBuyInfo();
                vm.queryCoupon();
           }
        },
         //团购规则
        // gotosgrouprulr() {
        //     vm.$router.push({path:'/sgrouprule'})
        // },
        //模仿线上用户信息
			//105/747/384
		  initSession4Test(){
                let url = '/initSession4Test/105';
					vm.receiveData.getData(vm,url,'Data',function(){
				});
            },
        queryBuyInfo() {
             vm.receiveData.getData(vm,'/queryBuyInfo/'+vm.type+'/'+vm.ruleId,'res',function() {
                 if(vm.res.success) {
                      vm.product=vm.res.result.product;
                    vm.rule=vm.res.result.rule;
                    if(vm.res.result.address) {
                        vm.checkedAddress=vm.res.result.address
                    }
                    vm.computeAmount();
                 }else {
                      alert("订单处理中，请稍后再试！")
                 }
                   
                })
        }, 
       //请求获取优惠券
       queryCoupon() {
           vm.receiveData.getData(vm,'/coupon/valid/'+vm.type+'/'+vm.ruleId,'res',function() {
               if(vm.res.success) {
                    vm.coupons=vm.res.result;
                     vm.computeAmount();
            //    console.log(vm.couponNum)
               }else {
                   alert('获取现金券信息失败！')
               }
           
           })
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
       showLocation() {
           if(vm.submitAddress.city == ""||vm.submitAddress.county==""||vm.submitAddress.province=="") {
	    		alert('请先选择你所在的区域！');
	    		return;
	    	}
	    	vm.suggestions=[];
           vm.currentPage='xiaoquForm';
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
       //减
       minusCount() {
           vm.count>1 && --vm.count && vm.computeAmount()
       },
       //加
       addCount() {
           if(vm.count<vm.rule.limitNumOnce) {
               vm.count++;
            vm.computeAmount();
           }else {
               alert("最多能购买"+vm.rule.limitNumOnce+"个");
           }
       },
       //计算价格
       computeAmount() {
           var  pa,pf,a,ta;
           pa=vm.rule.price*vm.count;
           pf=vm.count <vm.rule.freeShippingNum ? vm.rule.postageFee :0;
           a=pa+pf;

        if(vm.coupon == null) {
           ta = a;
        } else if(vm.coupon.usageCondition>a){
          vm.coupon = null;
        } else if(vm.coupon.amount>0){
            ta = a - vm.coupon.amount;
        }

        vm.productAmount=pa.toFixed(2);
        vm.postFee=pf.toFixed(2);
        vm.amount=a.toFixed(2);
        if(ta>0) {
                vm.totalAmount = ta.toFixed(2);
            } else {
               vm.totalAmount = "0.01";
            }
        },
       //点击优惠券
       showCoupons() {
           //点击隐藏整个页面 优惠券页面显示
            vm.currentPage="coupons";
       },
       
       //备注
       focus() {
       },
       storeMemo() {
         vm.comment=vm.$refs.bgbei.innerHTML;
       },
        //点击收货时间
        showModal(){
            vm.datechoooser.modalShown=true;
        },
        //选择日期
        hideModal(e) {
            // console.log(e.target.className)
            if('ptb15 lite-divider' ===e.target.className) {
                vm.datechoooser.modalShown=false;
            }
        },
        selectTime(i) {
            for(var d =0; d<vm.datechoooser.timePicker.length;d++) {
                vm.datechoooser.timePicker[d].checked = false;
            }
            vm.datechoooser.timePicker[i].checked=true;
            vm.datechoooser.time = vm.datechoooser.timePicker[i].name;
            vm.receiveTimeType = vm.datechoooser.timePicker[i].value;
            vm.datechoooser.modalShown = false;
        },
        //点击优惠券
        chooseCoupon(i) {
           if(this.selectedIndex != i) {
               this.selectedIndex=i
           }else {
               this.selectedIndex=-1;
           }
       },
       confirm() {
           if( this.selectedIndex<0 || this.selectedIndex>= this.coupons.length) {
               this.chooseCoupons(null);
           }else {
               this.chooseCoupons(this.coupons[this.selectedIndex]);
            // console.log(this.coupons[this.selectedIndex])
            }
       },
         chooseCoupons(coupon) {
            if(coupon== null) {
                vm.coupon=null;
                vm.couponDesc='未使用'
            }else {
                vm.coupon=coupon;
                vm.couponDesc="￥"+coupon.amount+"元";
            }
            vm.computeAmount()
           vm.currentPage="main";;
        },

    //新增地址
            //初始地址
        dataAddress() {
            vm.receiveData.getData(vm,'/addresses','data',function() {
                if(vm.data.success) {
                     vm.addresses=vm.data.result;
                }else {
                    alert("获取地址信息失败！");
                    vm.addresses = [];
                }
               
            })
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
    aShowAddress() {
        //隐藏主页面 
        vm.currentPage="addrlists";
        
    },
    checks(address) {
        vm.checkedAddress = address;
         vm.currentPage='main';
    },
    //点击新增 显示添加地址样式
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



    /** 保存地址 */
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
     saveAddress(){
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
                        vm.checkedAddress=vm.res.result;
                        vm.currentPage='addrlists';
                    }else {
                        alert(vm.res.message==null?"地址保存失败，请重试！":vm.res.message);
                    }
                }
            )
     },

     pay() {
            if(vm.paying){
                    alert("订单处理中，请勿重复提交！");
                    return;
                }
            var order = {
	        			orderType:vm.type,
	        			productId:vm.product.id,
	        			ruleId:vm.rule.id,
	        			count:vm.count,
	        			serviceAddressId:vm.checkedAddress.id,
	        			memo:vm.comment,
	        			receiveTimeType:vm.receiveTimeType
                 }
                 if(vm.coupon != null) {
                    order.couponId=vm.coupon.id;
	        	}
                if(vm.checkedAddress.id== undefined|| vm.checkedAddress.id==0){
	        		alert("请选择地址！");
	        		return;
                }
	        	vm.createOrder(order);
     },
      createOrder(order) {
         vm.paying=true;
    	if(vm.order!={}&&vm.order.id>0) {
            vm.requestPay();
            return;
              }
             vm.receiveData.postData(vm,'/createOrder',order,'n',function(){
                 if(vm.n.success) {
                    vm.order = vm.n.result;
        	        vm.requestPay();
                 }else {
                     alert(vm.n.message==null?"订单创建失败，请稍后重试！":vm.n.message);
                     vm.paying=false
                 }
             }) 

              
        },  
      requestPay() {
          vm.receiveData.getData(vm, "/requestPay/"+vm.order.id,'n',function(){
            if(vm.n.success) {
                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: vm.n.result.appId, // 必填，公众号的唯一标识
                    timestamp: vm.n.result.timestamp, // 必填，生成签名的时间戳
                    nonceStr: vm.n.result.nonceStr, // 必填，生成签名的随机串
                    signature: vm.n.result.signature,// 必填，签名，见附录1
                    jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                });
                 wx.chooseWXPay({
                    "timestamp":vm.n.result.timestamp,
                    "nonceStr":vm.n.result.nonceStr,
                    "package":vm.n.result.pkgStr,
                    "signType":vm.n.result.signType,
                    "paySign":vm.n.result.signature,
                    success: function (res) {
                            // 支付成功后的回调函数
                        alert("下单成功！");
                        //   location.href="https://test.e-shequ.com/weixin/success.html?orderId="+vm.order.id + "&type="+vm.type;
                        vm.$router.push({path:'/success',query:{'orderId':vm.order.id,'type':vm.type}})
                    },
                   
                  });
            }else {
                 alert(vm.n.message==null?"支付请求失败，请稍后重试！":vm.n.message);
                    vm.paying=false;
            }
            
        });
      }  
     

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
  display: block;
}
.zhi {
    background: #F7F7F1;
}
.rule_intro {
    position: fixed;
    top: 0;
    z-index: 10;
    width: 100%;
}
img {
    max-width: 100%;
    height: auto;
}
.addr_area {
    background: #F7F7F1;
}
.addr-top {
     background: url(../assets/images/bg_line_location_top.png) repeat-x;
    height: 2px;
    background-size: 100% 2px;
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
.add_btn_style {
    margin: 20px 0;
    color: #cfa972;
    background-color: white;
    padding: 4px 30px;
    border-color: #cfa972;
}
.addr_detail {
    padding: 17px;
    margin-right: 15px;
}
.menu-link {
    display: block;
    background: url(../assets/images/icon_arrow.png) no-repeat;
    background-size: 7px 12px;
    background-position: right center;
    padding-right: 15px;
}
.fs14 {
    font-size: 14px;
}
.addr_location {
    color: #888;
    line-height: 20px;
    margin-top: 6px;
}
.addr-f {
    background: url(../assets/images/bg_line_location_bottom.png) repeat-x;
    height: 2px;
    background-size: 100% 2px;
}
.product_detail {
    height: 110px;
    background-color: white;
}
.product_picture {
    margin: 15px;
    width: 80px;
    height: 80px;
    float: left;
    border: 1px solid #cecece;
}
.product_content {
  	margin-right: 10px;
	margin-left: 110px;
	padding-top: 25px;
}
.product_name {
   	font-size:16px;
    color:#3b3937;
    line-height: 20px;
    height:40px;
    overflow: hidden;
}
.product_pri_area {
    border-bottom: 2px solid #f7f7f1;
    width: 100%;
    height: 35px;
}
.highlight {
    color: #ff8a00;
}
.fl {
    float: left;
}
.fs16 {
    font-size: 16px;
}
.pt5 {
    padding-top: 5px;
}
.fs13 {
    font-size: 13px;
}
.fs13 {
    font-size: 13px;
}
.line {
    padding: 15px 15px;
    background: #f7f7f1;
    border-bottom: 1px solid #c2c2c2;
    margin-left: 10px;
}
.fs15 {
    font-size: 15px;
}

.sbtn.btn-minus {
    background-image: url(../assets/images/btn_reduce_disable.png);
}
.minus-btn-size {
    width: 30px;
    height: 30px;
    background-size: 30px;
    margin-top: 10px;
}
.sbtn {
    position: relative;
    display: inline-block;
    /* width: 20px; */
    /* height: 20px; */
    border: 1px solid #bfbfbf;
    border-radius: 2px;
    background-repeat: no-repeat;
    /* background-size: 22px; */
}
.number {
    padding: 0 20px;
    vertical-align: super;
}
.fs16 {
    font-size: 16px;
}
.sbtn.active {
    border-color: #ff8a00;
    color: #ff8a00;
}
.sbtn.btn-add {
    background-image: url(../assets/images/btn_add.png) ;
}
.sbtn.btn-minus.active {
    background-image: url(../assets/images/btn_reduce.png);
}
.baoyou_desc {
    padding: 2px 13px;
    border: 1px solid #ff8a00;
    border-radius: 2px;
    margin-left: 10px;
    margin-top: -2px;
    font-size: 13px;
    color: #ff8a00;
}
.fs10 {
    font-size: 10px;
}
.fs20 {
    font-size: 20px;
}

.right_menu {
    padding-left: 15px;
    padding-right: 15px;
    display: block;
    background: url(../assets/images/icon_arrow.png) no-repeat;
    background-size: 7px 12px;
    background-position: right center;
}
.p15 {
    padding: 15px;
}
.mlr10 {
    margin-left: 10px;
    margin-right: 10px;
}
.bgwhite {
    background: #ffffff;
}
.info-wrap {
    padding: 4px;
    border-bottom: 5px solid #f9f9e9;
    font-size: 12px;
    color: #3b3937;
}
.section-title, .lite-divider {
    border-bottom: 1px solid #d4cfc8;
    padding-left: 15px;
}
.title, .section-title {
    display: block;
    font-size: 13px;
    color: #7e6b5a;
    padding-top: 15px;
    padding-bottom: 7px;
}
.custom-menu-link {
    padding-top: 15px;
    padding-left: 15px;
    color: #3b3937;
    background-position-y: 15px;
}
.menu-link {
    display: block;
    background: url(../assets/images/icon_arrow.png) no-repeat;
    background-size: 7px 12px;
    background-position: right center;
    padding-right: 15px;
}
.fs14 {
    font-size: 14px;
}
.time-icon {
    /* background-image: url(../assets/images/icon_time_gray.png); */
}
.bgwhite {
    background: #ffffff;
}
.content {
    position: relative;
    height: 100px;
    margin: 0 15px;
    background-color: #fffff8;
    border: 1px solid #d4cfc8;
    outline: none;
}
.btn-fixed {
    position: fixed;
    bottom: -15px;
    left: -15px;
    right: -15px;
}
.btn {
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
.modal-mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.5);
}
.modal {
    background: #fff;
    border-radius: 5px;
    margin: 200px auto;
    padding: 10px 15px;
    width: 60%;
}
.section-title, .lite-divider {
    border-bottom: 1px solid #d4cfc8;
    padding-left: 15px;
}
.ptb15 {
    padding: 15px 0;
}
.checkedItem {
    background: url(../assets/images/icon_selected.png) no-repeat;
    background-position: right center;
    background-size: 16px;
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
		background:url("../assets/images/bg_courtesy_card.png") no-repeat;
		background-size: 100% 110px;
		height:115px;
	}
	.coupon_item{
		padding:0px 15px 30px 15px
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
		color:#ff8a00;
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
    background: url('../assets/images/icon_selected.png') no-repeat;
    background-size: 20px;
}
.icon_se {
    background: url(../assets/images/icon_select.png) no-repeat;
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
    border: 1px #b28850 solid;
    color: #b28850;
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
    background: #ff8a00;
    padding: 8px 30px;
    font-size: 14px;
    border-radius: 6px;
}

/* 新增地址样式 */
.diz {
    padding: 10px;
    font-size: 14px;
    /* background: white; */
}
.dividers {
    border-bottom: 10px solid #f7f7f2;
}
.diz .arrow-margins {
    background-position: 98% center;
}
.address-wraps {
    /* background-position-y: center; */
    /* padding-bottom: 15px; */
}

.menu-links {
    display: block;
    background: url(../assets/images/icon_arrow.png) no-repeat;
    background-size: 7px 12px;
    background-position: right center;
    padding-right: 15px;
}
.section-titles, .lite-dividers {
    border-bottom: 1px solid #ccc;
    padding-left: 15px;
}
.mt1s {
    margin-top: 30px;
}
.fs14s {
    font-size: 14px;
}

.checkboxs.checkeds {
    background-image: url(../assets/images/icon_selected.png);
}
.checkboxs {
        float: left;
    display: inline-block;
    width: 16px;
    height: 16px;
    background: url(../assets/images/icon_unselect.png) no-repeat;
    background-size: 16px;
    margin-top: 12px;
}
.locations {
    /* color: #888; */
    line-height: 20px;
    margin: 10px 0px 10px 30px;
}
.mt2 {
    margin-top: 20px;
}
.tc {
    text-align: center;
}

.section-title, .lite-divider {
    border-bottom: 1px solid #d4cfc8;
    padding-left: 15px;
}

.input-wrap {
    overflow: hidden;
    line-height: 45px;
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
    background: url(../assets/images/icon_arrow.png) no-repeat;
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
    border: 1px solid #d4cfc8;
    border-radius: 4px;
    vertical-align: middle;
    font-size: 15px;
}

.location-btn-cancel {
    position: absolute;
    top: 5px;
    right: 4px;
    display: inline-block;
    height: 36px;
    width: 36px;
    background: url(../assets/images/icon_cancel.png) no-repeat;
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

.city, .city2 {
    font-size: 14px;
    color: #000;
    width: 25%;
    height: 30px;
    line-height: 30px;
    text-align: center;
    padding: 5px 0;
}
.city {
        background-color: #FFF;
}
.city2 {
    background-color: #E0E0E0;
}
.default_item {
    /* color: #FF7E00; */
    /* border: 1px solid #FF7E00; */
    padding: 4px 8px;
    border-radius: 2px;
}
.addr_btn_plain {
    padding: 10px 20px;
    border: 1px solid #777777;
    border-radius: 4px;
    display: inline-block;
}
/* 小区列表 */

</style>
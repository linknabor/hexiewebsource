<template>
   <div class="addr">
        <div v-show="currentPage=='list'" class="menu-linksa fs14 address-wrap lite-divider" @click="check(item)" v-for="(item,i) in addresses" style="display: block;">
		
                <span style="margin-left:10px">{{item.receiveName}}</span>
                <span style="margin-left:15px">{{item.tel}}</span>
                <span style="margin-left:15px" v-if="item.main">默认</span>
                <div>
                    <i class="checkbox fl" :class="{checked:checkedAddress.id==item.id }"></i>
                    <div class="location">{{item.province}}{{item.city}}{{item.county}}{{item.locationAddr}}{{item.detailAddress}}</div>
                </div>
                <div class="xiaoqu" v-show='item.xiaoquName'>小区或者大厦： {{item.xiaoquName}}</div>
                <div @click="deleteAddress(item,i)" class="btn-edit-mask"></div>
	    </div>

      	<div v-show="currentPage=='list'" style="text-align:center">
            <a class="btn-plain" style="margin-top:30px;color:#3b3937;"  @click="toAddAddress">新建收货地址</a><br/>
            <a class="btn-plain" style="margin-top:10px;color:#3b3937;" v-if="addresses.length>1" @click="setDefaultAddress">设为默认地址</a><br/>
            <!-- <a class="btn-plain" style="margin-top:30px;color:#3b3937;"  ms-click="confirmAndBack" ms-visible="comeFrom!=null&&comeFrom!=''" >返回上一页</a><br/> -->
        </div>

        <!-- 新增地址 -->
         <div   v-show="currentPage=='xinzen'">
                        <div class="input-wrap lite-divider">
                            <span class="fl fs15">联系人</span>
                            <input placeholder="请输入联系人姓名" class="fr fs14 hidden-input" v-model="submitAddress.receiveName"/>
                        </div>
                        <div class="input-wrap lite-divider">
                            <span class="fl fs15">手机号</span>
                            <input type="tel" placeholder="请输入手机号码" class="fr fs14 hidden-input" v-model="submitAddress.tel"/>
                        </div>
                        <div @click="showRegion" class="input-wrap lite-divider menu-link">
                            <span class="fl fs15" style="color: #3b3937">所在地区</span> 
                             <!-- -->
                            <span class="fr fs14"  style="color: #aeaeae" v-if="!distinct" >请选择所在地区</span>
                            <span class="fr fs14" v-if="distinct">{{distinct}}</span>
                        </div>
               
                 <!-- 选择省  市 县-->
                <div v-if="selectRegion==true">
                    <div class="tc">
                        <div class="region  fl" :class="{check:currentRegionType==1}" @click="backRegion(1)">选择省</div>
                        <div class="region fl" :class="{check:currentRegionType==2}" @click="backRegion(2)">市</div>
                        <div class="region fl" :class="{check:currentRegionType==3}">区县</div>
                    </div>
                    <div   style="width:100%;clear:both;background-color: #e0dede; overflow:hidden">
                        <div v-for="(region,i) in regions" :class="{city:Math.floor((i/4)%2)==0,city2:Math.floor((i/4)%2)==1}" class="fs14 fl"  @click="updateRegion(region)">{{region.name}}</div>
                    </div>
                    <div> &nbsp;</div>
                </div>
                 <div style="clear: both;" v-if="selectRegion==false">
                    <div class="input-wrap lite-divider  menu-link"  @click="showLocation" >
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

                    <div class="btn-fixed">
                        <div class="submit-btn ov fs16" @click="addAddress">保存</div>
                    </div>
                </div> 
            </div>
             <!--	使用高德地图搜索-->
                <div style="background-color: #fffff8" v-if="currentPage=='location'">
                        <div class="location-wrap">
                            <div class="location-input-wrap">
                                <input placeholder="请输入小区名称" class="location-input" v-model="suggestLocation" />
                                <i class="location-btn-cancel" @click="cancelLocation" v-if="suggestLocation"></i>
                            </div>
                            <span class="location-btn-ensure" @click="submitLocation">确定</span>
                        </div>
                        <div class="location-empty-tip" v-if="!suggestions.length">
                            准确的小区、街道或大厦名称能加快送货速度
                        </div>
                        <div class="location-location" @click="chooseLocation(suggestion)" v-for="suggestion in suggestions" v-if="suggestions.length">
                            <span style="position:relative;font-color:#cccccc;font-size:16px ">{{suggestion._name}} - {{suggestion._address}}</span>
                        </div>
                </div>
   </div>
</template>

<script>
let vm;
import { MessageBox } from 'mint-ui';
export default {
   data () {
       return {
           addresses:[],
           checkedAddress:{},
           currentPage : "list",

            regions:[],//获取区域
            provinces:[],
            citys:[],
            countys:[],
            distinct:"",//  新增地址的拼接地方
            submitAddress:{//保存地址
                receiveName:"",//联系人
                tel:"",//手机
                provinceId:0,province:"",//省
                cityId:0,city:"",//市
                countyId:0,county:"",//县
                xiaoquName:"",//小区
                amapId:0,
                amapDetailAddr:"",//小区地址 例如：三林路128弄"
                homeAddress:""//例如：1号楼402室
            },
             selectRegion:false,
             currentRegionType:1,// 选择高亮
             paying:false,
             suggestLocation:'',//小区名
             suggestion:{},
             suggestions:[],
             order:[],
             isDefault:false
       };
   },
   watch: {
        suggestLocation(vn,vw) {
            if(vm.suggestLocation!=vm.suggestion._name&& vm.suggestLocation.length>=2  ) {
                vm.getSuggestion();
            }
        }
   },
   created() {
       vm=this;
   },
   mounted() {
      vm.Addresses();
   },

   methods: {
       //初始地址
       Addresses() {
            vm.receiveData.getData(vm,"addresses",'res',function(){
                if(vm.res.success) {
                        vm.addresses=vm.res.result;
                }else {
                    alert('获取地址信息失败')
                }
                    })
       },
    //    初始添加地址选择区域
  
       //选中
       check(address) {
           vm.checkedAddress=address
       },
        //    删除
        deleteAddress(item,index) {
              MessageBox.confirm('确定删除该地址？').then(action => {
                   if(action== 'confirm') {
                         vm.receiveData.postData(vm,"/address/delete/"+item.id,null,'res',function(){
                                if(vm.res.success) {
                                    for(var i=0;i<vm.addresses.length;i++) {
                                        if(index==i) {
                                            vm.addresses.splice(i,1);
                                        }
                                  }
                                }else {
                                    alert(vm.res.message==null?"删除地址失败！":vm.res.message);
                                }
                              })
                   }
               }).catch(err => {
                  if(err == 'cancel') {

                  }
              })
        },
        //设置默认
        setDefaultAddress() {
            if(vm.checkedAddress.id == undefined) {
                alert('请选择一个地址')
                return;
            }
             if(!vm.checkedAddress.main) {
                    MessageBox.confirm('设为默认地址？').then(action => {
                        if(action== 'confirm') {
                                vm.receiveData.postData(vm,"address/default/"+vm.checkedAddress.id,null,'res',function(){
                                    if(vm.res.success) {
                                            for(var idx in vm.addresses) {
                                                if(vm.addresses[idx].id == vm.checkedAddress.id) {
                                                    vm.addresses[idx].main=true;
                                                } else {
                                                    vm.addresses[idx].main=false;
                                                }
                                        }
                                   
                                       
                                    }else {
                                        alert(vm.res.message== null ?'设置默认地址失败！请选择一个地址':vm.res.message);
                                    }
                                    },function(){})
                        }
                    }).catch(err => {
                        if(err == 'cancel') {

                        }
                    })
             }else {
                 alert('已经是默认地址')
             }
        },
        //点击新增地址
        toAddAddress() {
            vm.currentPage='xinzen';
            vm.submitAddress={//保存地址
                receiveName:"",//联系人
                tel:"",//手机
                provinceId:0,province:"",//省
                cityId:0,city:"",//市
                countyId:0,county:"",//县
                xiaoquName:"",//小区
                amapId:0,
                amapDetailAddr:"",//小区地址 例如：三林路128弄"
                homeAddress:""//例如：1号楼402室
            }
            vm.distinct='';
            
        },
        //获取区域
        getRegions(type,id) {
            vm.currentRegionType=type;
            vm.receiveData.getData(vm,'/regions/'+type+'/'+id,'data',function(){
                if(vm.data.success) {
                      vm.regions=vm.data.result;
                 }else {
                     alert("获取区域信息失败，请稍后重试！");
                 }
            });
        },
        //点击所在地区
        showRegion() {
            vm.selectRegion=!vm.selectRegion;
            if(vm.selectRegion) {
                vm.changeRegionView()
            }
        },
        backRegion(a){
            vm.getRegions(a,1)
        },
        backRegion(b){
            vm.getRegions(b,vm.submitAddress.provinceId)
        },
        updateRegion(region){
            vm.changeRegionView(region.regionType,region.id,region.name) 
        },
        changeRegionView(regionType,regionId,regionNam) {
            if(!regionType) {
                if(vm.provinces.length==0) {
                     vm.getRegions(1,1);
                }else {
                vm.regions=vm.provinces
                  }
            }else {
                if(regionType ==1) {
                    if(vm.submitAddress.provinceId != regionId ||vm.citys.length==0) {
                        vm.getRegions(2,regionId);
                    } else {
                        vm.regions = vm.citys;
                    }
                    vm.submitAddress.province = regionNam;//省
                    vm.submitAddress.provinceId = regionId;//ID
                    // console.log(vm.submitAddress.province, vm.submitAddress.provinceId )
                    vm.currentRegionType=2;
                }else if(regionType == 2) {
                    if(vm.submitAddress.cityId != regionId ||vm.countys.length==0) {
                        vm.getRegions(3,regionId);
                    } else {
                        vm.regions = vm.countys;
                    }
                    vm.submitAddress.city = regionNam;//市
                    vm.submitAddress.cityId = regionId;
                    // console.log(vm.submitAddress.city,vm.submitAddress.cityId)
                    vm.currentRegionType=3;
                }else if(regionType == 3) {
                    vm.submitAddress.county = regionNam;
                    vm.submitAddress.countyId = regionId;
                    vm.distinct=vm.submitAddress.province+vm.submitAddress.city+vm.submitAddress.county;
                    vm.selectRegion = false;
                }
            }
        },

        //选择小区
        showLocation() {
            if(vm.submitAddress.city == ""||vm.submitAddress.county==""||vm.submitAddress.province=="") {
                alert('请先选择你所在的区域')
            }else {
                 vm.suggestions=[];
                 vm.currentPage='location'
            }
        },
        //小区数据
        getSuggestion() {
            vm.receiveData.getData(vm, "amap/"+vm.submitAddress.city+"/"+vm.suggestLocation,'data',function(){
              if(vm.data.success) {
                vm.suggestions=vm.data.result;
               }else {
                  vm.suggestions=[];
               } 
            });
        },
        //点击叉叉 
        cancelLocation() {
             vm.suggestLocation = '';
            //   vm.currentPage='xinzen'
        },
        //点击确定
        submitLocation() {
            vm.submitAddress.xiaoquName = vm.suggestLocation;
                        vm.submitAddress.amapId=vm.suggestion._id;
                        vm.submitAddress.amapDetailAddr=vm.suggestion.detailaddress;
                        vm.currentPage='xinzen';
                        // console.log(vm.submitAddress.xiaoquName,vm.submitAddress.amapId,vm.submitAddress.amapDetailAddr)
        },
        //选中小区地址
        chooseLocation(suggestion) {
            console.log(suggestion)
            vm.suggestion = suggestion;
                        vm.suggestLocation = suggestion._name;
                         vm.suggestions=[];
        },
        //点击保存
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
                    addr.main=vm.isDefault;
                    
            vm.receiveData.postData(vm,'/addAddress',addr,'n',function(){
                    if(vm.n.success) {
                        vm.addresses.push(vm.n.result);
                        vm.currentPage = "list";
                    }else {
                        alert(vm.n.message==null?"地址保存失败，请重试！":vm.n.message);
                    }
                                   
                       })  
        }
   },

}
</script>

<style  scoped>
.addr {
    background-color: #fffff8;
    padding-bottom: 1px;
    padding:0 15px;
}

.address-wrap {
    background-position-y: center;
    padding-bottom: 15px;
}
.menu-linksa {
    display: block;
    /* background-size: 7px 12px; */
    background: url(../assets/images/person/icon_arrow.png) no-repeat;
    background-position: right center;
    padding-right: 15px;
}
.menu-linksa {
    position: relative;
    background-image: url(../assets/images/common/icon_cancel.png);
    background-size: 18px;
    padding-top: 20px;
    color: #3b3937;
    margin: 0 15px;
}
.fs14 {
    font-size: 14px;
}
.checkbox.checked {
    background-image: url(../assets/images/common//icon_selected.png);
}

.checkbox {
    display: inline-block;
    width: 16px;
    height: 16px;
    background: url(../assets/images/common/icon_unselect.png) no-repeat;
    background-size: 16px;
}
.location {
    color: #888;
    line-height: 20px;
    margin-left: 18px;
    margin-top: 6px;
}
.xiaoqu {
    margin-left: 25px;
}
.btn-edit-mask {
    position: absolute;
    top: 50%;
    right: 0;
    margin-top: -12px;
    width: 24px;
    height: 24px;
}
.lite-divider {
    border-bottom: 1px solid #d4cfc8;
    padding-left: 15px;
}
.btn-plain {
    display: inline-block;
    padding: 0 20px;
    height: 27px;
    line-height: 27px;
    color: #3b3937;
    border-radius: 3px;
    border: 1px solid #bfbfbf;
    font-size: 16px;
}
/* 新增地址 */
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
    background: url(../assets/images/person/icon_arrow.png) no-repeat;
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
    background-image: url(../assets/images/common/icon_selected.png);
}
.checkboxs {
    display: inline-block;
    width: 16px;
    height: 16px;
    background: url(../assets/images/common/icon_unselect.png) no-repeat;
    background-size: 16px;
    margin-top: 12px;
}
.locations {
    color: #888;
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
    background: url(../assets/images/person/icon_arrow.png) no-repeat;
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
    /* padding: 0 10px; */
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
    text-indent: 10px;
}

.location-btn-cancel {
    position: absolute;
    top: 5px;
    right: 4px;
    display: inline-block;
    height: 36px;
    width: 36px;
    background: url(../assets/images/common/icon_cancel.png) no-repeat;
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
    /* padding: 15px 0; */
    line-height:35px;
    border-bottom: 1px solid #d4cfc8;
    
}
.fs15 {
    font-size: 15px;
}
.fs14 {
    font-size: 14px;
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
.btn-fixed {
    position:fixed;
    color: #fff;
    left: 3%;
    right: 3%;
    bottom: 10px;
}
.submit-btn {
    height: 44px;
    line-height: 44px;
    background: #ff8a00;
    text-align: center;
}
.fs16 {
    font-size: 16px;
}
.ov {
    overflow: hidden;
    padding: 1px;
}
</style>
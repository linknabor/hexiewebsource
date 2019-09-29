<template>
  <div id="repairs">
    <div id="zzmb"  class="zzmb" ></div>
    <div v-show="page== 'main'" class="address">
        <div class="topLine">
          <div class="topLineLeft">所在小区</div>
          <div class="topLineRight">{{address.xiaoquName}}</div>
        </div>
      <div class="addr_area" @click="choseAddress">
        <div class="addrtop">&nbsp;</div>
        <div style="text-align:center;background-color: #f7f7f1;">
          <div class="add_address" v-show="!address.receiveName">选择收货地址</div>
        </div>
        <div class="custom-menu-link" v-show="address.receiveName">
          <div class="sustoma">
            <span>{{address.receiveName}}</span>
            <span style="margin-left:15px;">{{address.tel}}</span>
            <div
              class="addr_location"
            >{{address.province}}{{address.city}}{{address.county}}{{address.xiaoquName}}{{address.detailAddress}}</div>
          </div>
        </div>
        <div class="addrbottom">&nbsp;</div>
      </div>
      
      <div class="custom_menu">
        <div class="wenti">
          问题描述
        </div>
        
        <div>
          <textarea class="text" placeholder="输入问题描述内容..." v-model="memo">
          </textarea>
        </div>
        <div style="margin-top:15px;width:100%;height:40px;font-size: 14px;color: #666">
          <div style="float: left;padding-left: 5px;">上传照片</div>
          <div style="float: right;padding-right: 15px;color: #999">{{pic_length}}/6</div>
        </div>
        <div>
            <div id="pic" class="pic_frame">
                
            </div>
            <div class="pl15 pr15">
                <div id="add" @click="addPic"  class="add-pic-bg fl pl5"></div>
            </div>
            <div class="clear"></div>
        </div>
        <div style="width: 100%;height: 80px;"></div>
        <div class="btn-fixed">
          <div class="btn" @click="submit">提交报修</div>
        </div>
      </div>
    </div>
    <!-- 选择地址 -->
    <div v-show="page=='list'" class="addrlist">
      <div v-show="lian=='chu'">
        <div
          class="plr15s arrow-margins menu-links mt1s fs14s address-wraps lite-dividers"
          v-for="(item,index) in addresses"
          @click="checks(item)"
          :key="index"
        >
          <i class="checkboxs" :class="{checkeds:address&&address.id===item.id}"></i>
          <div>
            <span style="margin-left:20px">{{item.receiveName}}</span>
            <span style="margin-left:15px">{{item.tel}}</span>
            <span class="mainlian" style="margin-left:15px" v-if="item.main">默认</span>
          </div>
          <div
            class="locations"
            style="margin-left:35px"
          >{{item.province}}{{item.city}}{{item.county}}{{item.locationAddr}}({{item.xiaoquName}}){{item.detailAddress}}</div>
        </div>
        <div class="tc mt2">
          <div class="btn-plain" @click="toAddAddress">新增收货地址</div>
          <br>
        </div>
      </div>

      <div v-show="lian=='xing'">
        <div style="padding:0 15px" v-show="zhen=='from'">
          <div class="input-wrap lite-divider">
            <span class="fl fs15">联系人</span>
            <input
              placeholder="请输入联系人姓名"
              class="fr fs14 hidden-input"
              v-model="submitAddress.receiveName"
            >
          </div>
          <div class="input-wrap lite-divider">
            <span class="fl fs15">手机号</span>
            <input
              type="tel"
              placeholder="请输入手机号码"
              class="fr fs14 hidden-input"
              v-model="submitAddress.tel"
            >
          </div>
          <div class="input-wrap lite-divider menu-link" @click="showRegion">
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
          <!---------------- -->
          <div style="clear: both;" v-show="selectRegion=='false'">
            <div class="input-wrap lite-divider menu-link" @click="showLocation">
              <span class="fl fs15">小区或大厦</span>
              <span
                class="fr fs14"
                style="color: #aeaeae"
                v-if="submitAddress.xiaoquName==''"
              >请输入小区或大厦</span>
              <span class="fr fs14" v-if="submitAddress.xiaoquName">{{submitAddress.xiaoquName}}</span>
            </div>
            <div class="input-wrap lite-divider">
              <span class="fl fs15">小区地址</span>
              <input
                placeholder="例如：三林路128弄"
                class="fr fs14 hidden-input"
                v-model="submitAddress.amapDetailAddr"
              >
            </div>
            <div class="input-wrap lite-divider">
              <span class="fl fs15">楼栋门牌号</span>
              <input
                placeholder="例如：1号楼402室"
                class="fr fs14 hidden-input"
                v-model="submitAddress.homeAddress"
              >
            </div>
            <div class="btn" @click="addAddressa">保存</div>
            <!-- <div class="btn" @click="addfan">返回列表</div> -->
          </div>
        </div>
      </div>
      <!--	使用高德地图搜索-->
      <div style="background-color: #fffff8" v-show="lian=='xiaoqu'">
        <div class="location-wrap">
          <div class="location-input-wrap">
            <input placeholder="请输入小区名称" class="location-input" v-model="suggestLocation">
            <i class="location-btn-cancel" @click="cancelLocation" v-if="suggestion"></i>
          </div>
          <span class="location-btn-ensure" @click="submitLocation">确定</span>
        </div>
        <div class="location-empty-tip" v-if="!suggestions.length">准确的小区、街道或大厦名称能加快送货速度</div>
        <div
          class="location-location"
          @click="chooseLocation(suggestion)"
          v-for="suggestion in suggestions"
          v-if="suggestions.length"
        >
          <span
            style="position:relative;font-color:#cccccc"
          >{{suggestion._name}} - {{suggestion._address}}</span>
        </div>
      </div>
    </div>

    
  </div>
</template>

<script>
let vm;
import wx from "weixin-js-sdk";
import { MessageBox } from "mint-ui";
export default {
  data() {
    return {
      page: "main",
      projectId:this.$route.query.projectId,
      // project:'', //报修项目详情
      address: {}, //报修地址
      localIdsid:'',
      memo:'',
      //    选择地址
      addresses: [],
      pic_length:0,
      uploadPicId:"",
      checkedAddress: {},
      lian: "chu",
      zhen: "from",
      regions:[],
      provinces:[],
      citys:[],
      countys:[],
      checkeditem: "",
      submitAddress: {
        province: "",
        city: "",
        county: "",
        receiveName: "",
        tel: "",
        provinceId: 0,
        cityId: 0,
        countyId: 0,
        xiaoquName: "",
        amapId: 0,
        amapDetailAddr: "",
        homeAddress: ""
      },
      assignType:2,
      distinct: "",
      selectRegion: 'false',
      currentRegionType: 1,
      //小区
      suggestLocation: "",
      suggestion: {},
      suggestions: [],
      showg: false,
      showz: false,
    };
  },
  watch: {
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
  },
  created() {
    vm = this;
  },
  mounted() {
    // vm.common.checkRegisterStatus();
    let url1 = "getUrlJsSign";
    vm.receiveData.postData(
        vm,
        url1,
        {url:window.location.href.split('#')[0]},
        'heheData',
        function(){
            let wd = vm.heheData.result;
            wx.config({
                debug:false,
                appId:wd.appId,
                timestamp:wd.timestamp,
                nonceStr:wd.nonceStr,
                signature:wd.signature,
                jsApiList:['chooseImage','previewImage','uploadImage','downloadImage','getLocalImgData']
            });
        }
    );
    this.initInfo()
  },
  components: {},
  methods: {
  
    initInfo() {
        let url = 'repair/project/'+vm.projectId;
        vm.receiveData.getData(vm, url, "res", function() {
        if (vm.res.success) {
          if (vm.res.result.address) {
            vm.address = vm.res.result.address;
          }
          // if(vm.res.result.project){
          //   vm.project = vm.res.result.project;
          // }

        } else {
          alert(vm.res.message == null ? "请稍后重试！" : vm.res.message);
        }
      });
    },
    //点击添加上传图片
    addPic:function(){
        wx.chooseImage({
            count: 6, // 默认9
            sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                 vm.localIdsid=res.localIds;
                console.log(localIds);
                // alert('已选择'+localIds.length+'张图片');
               var html = "";
               var pic_length = $("[name='pics']").length;
               if(pic_length+localIds.length>6){
                   alert("所选图片超过6张。")
                   return false;
               }
               vm.pic_length+=localIds.length;
              var i=0;
                if(window.__wxjs_is_wkwebview) {//ios 环境
                   function addimage(i) {
                            //  setTimeout(function(){
                                wx.getLocalImgData({
                                    localId: localIds[i],
                                    success: function (res) {                                          
                                        var localData = res.localData;
                                        // var addds=res.localData;
                                        localData = localData.replace('jgp', 'jpeg');
                                            html = "<div name='pics' class=\"fl\" style=\"margin-right:5px;\"><img src=\""+localData+"\" id=\""+vm.localIdsid[i]+"\"  style=\"height:100px;width:90px;\"/></div>"
                                            $("#pic").append(html);
                                        i++;  
                                        if(i<localIds.length) {
                                            // alert(i)
                                            addimage(i)
                                        }   
                                    },
                                    fail:function(res){
                                        alert(res);
                                    }
                                }) 
                            //  },100)  
                         }  
                         addimage(i); 
                }else {
                    for(var i=0;i<localIds.length;i++){
                      html = "<div name='pics' class=\"fl\" style=\"margin-right:5px;\"><img src=\""+localIds[i]+"\"  id=\""+localIds[i]+"\" style=\"height:100px;width:90px;\"/></div>"
                      $("#pic").append(html);
                    }
                }

                if(pic_length+localIds.length >= 6){
                        $("#add").hide();
                }
                
               
            },
            fail:function(err){
                    alert(err)
            }
        });            
    },
    //上传图片到微信
    uploadToWechat:function(){
        var i = 0;
        var pics = $("[name='pics']");
        function upload(){
            var img = pics.eq(i).find("img");
            var id = img.attr("id");
            setTimeout(function(){
                wx.uploadImage({
                    localId: id, // 需要上传的图片的本地ID，由chooseImage接口获得
                    isShowProgressTips: 1, // 默认为1，显示进度提示
                    success: function (res) {
                        var serverId = res.serverId; // 返回图片的服务器端ID
                        vm.uploadPicId+=serverId+",";
                        i++;
                        if(i<pics.length){
                            upload();
                        }else if(i==pics.length){
                           vm.saveThread();
                        }
                        
                    }
                })
            },50);
        }
        upload();
    },

    //点击切换地址
    choseAddress() {
      vm.page = "list";
      vm.dataAddress();
    },
    //获取地址
    dataAddress() {
      vm.receiveData.getData(vm, "/addresses", "data", function() {
        if (vm.data.success) {
          vm.addresses = vm.data.result;
        } else {
          vm.addresses = [];
        }
      });
    },
    //选择地址
    checks(item) {
      vm.address = item;
      vm.page = "main";
    },
    toAddAddress() {
      vm.lian = "xing";
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
      vm.distinct='';
      vm.suggestLocation='';
    },
    //!--------------!
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
      if (
        vm.submitAddress.city == "" ||
        vm.submitAddress.county == "" ||
        vm.submitAddress.province == ""
      ) {
        alert("请先选择你所在的区域！");
        return;
      }
      vm.suggestions = [];
      vm.lian = "xiaoqu";
    },
    //点击叉叉
    cancelLocation() {
      vm.suggestLocation = "";
      vm.lian = "xing";
    },
    submitLocation() {
      vm.submitAddress.xiaoquName = vm.suggestLocation;
      if (vm.suggestion._id) {
        vm.submitAddress.amapId = vm.suggestion._id;
      }

      vm.submitAddress.amapDetailAddr = vm.suggestion.detailaddress;
      vm.lian = "xing";
    },
    //小区数据
    getSuggestion() {
      vm.receiveData.getData(
        vm,
        "amap/" + vm.submitAddress.city + "/" + vm.suggestLocation,
        "data",
        function() {
          if (vm.data.success) {
            vm.suggestions = vm.data.result;
          } else {
            vm.suggestions = [];
          }
        }
      );
    },
    chooseLocation(suggestion) {
      vm.suggestion = suggestion;
      vm.suggestions = [];
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
    //保存
    addAddressa() {
      if (
        vm.submitAddress.province == "" ||
        vm.submitAddress.city == "" ||
        vm.submitAddress.county == ""
      ) {
        alert("请填写完整相关信息！");
        return;
      }
      if (
        vm.submitAddress.amapDetailAddr == "" ||
        vm.submitAddress.receiveName == "" ||
        vm.submitAddress.tel == "" ||
        vm.submitAddress.homeAddress == ""
      ) {
        alert("请填写完整相关信息！");
        return;
      }
      if (!/^1[3-9][0-9]\d{8}$/.test(vm.submitAddress.tel)) {
        alert("请填写正确的手机号！");
        return;
      }
      vm.saveAddress();
    },
    /** 保存地址 */
    saveAddress() {
      var addr = {};
      addr.receiveName = vm.submitAddress.receiveName;
      addr.tel = vm.submitAddress.tel;
      addr.provinceId = vm.submitAddress.provinceId;
      addr.province = vm.submitAddress.province;
      addr.cityId = vm.submitAddress.cityId;
      addr.city = vm.submitAddress.city;
      addr.county = vm.submitAddress.county;
      addr.countyId = vm.submitAddress.countyId;
      addr.xiaoquName = vm.submitAddress.xiaoquName;
      // vm.submitAddress.amapDetailAddr+
      addr.detailAddress = vm.submitAddress.homeAddress;
      addr.amapDetailAddr = vm.submitAddress.amapDetailAddr;
      addr.amapId = vm.submitAddress.amapId;
      // console.log(addr)
      $("#zzmb").show();
      vm.receiveData.postData(vm, "/addAddress", addr, "n", function() {
        if(vm.n.success) {
            $("#zzmb").hide();  
            vm.addresses.push(vm.n.result);
            vm.checkedAddress = vm.n.result;

            vm.page = "list";
            // vm.page="main"
            vm.lian = "chu";
        }else {
            alert(vm.n.message==null?"地址保存失败，请重试！":vm.n.message);
        }
       
      });
    },
    //返回列表
    // addfan() {
    //   vm.lian = "chu";
    // },
    submit() {
      if(vm.address.id==undefined){alert("请选择服务的地址");return;}
      if(vm.memo==''){
        alert('描述内容不能为空');return;
      }
      var pic_length = $("[name='pics']").length;
      $("#zzmb").show();
      if(pic_length>0){
        vm.uploadToWechat();
      }else {
        vm.saveThread();
      }

    },
    saveThread() {
      let url = 'repair';
      let data = {};
      data.addressId = vm.address.id;
      data.projectId = vm.projectId;
      data.assignType = vm.assignType;
      data.imgUrls = vm.uploadPicId;
      data.memo = vm.memo;
      vm.receiveData.postData(vm,url,data,'res',function(){
        // console.log(vm.res.result);
        if(vm.res.success) {
            vm.$router.push({
            name:'submitSuccess',
            query:{
              oId:vm.res.result
            }
          })
        }else {
            alert(vm.res.message);
            $("#zzmb").hide();
        }
      })
    }
    
  },
  computed: {}
};
</script>

<style  scoped>
#repairs {
    background-color: #fff;
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1000000;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}

.zzmb {
  z-index: 100000;position: fixed;top: 0;left: 0;
  -moz-opacity: 0.65;opacity: 0.65;filter: alpha(opacity=65);
  background: #000;width: 100%;height: 100%;display: none}
.topLine {margin: 15px auto;background: #fff8ee;line-height: 16px;
  border-top: 1px solid #e5e2dd;border-bottom: 1px solid #e5e2dd;
  padding: 10px 15px;height: 16px;font-size: 16px;}
.topLineLeft {float: left;color: #7e6b5a;}
.topLineRight {text-align: right;float: right;width: 70%;
  overflow: hidden;height: 16px;color: #ff8a00;}
.custom-menu{display: block;margin:0 15px;color: #3b3937;
  line-height: 30px;padding: 5px 4px;overflow: hidden;}
.lite-divider {border-bottom: 1px solid #d4cfc8;}
.liteDivider{border-bottom: 1px solid #d4cfc8;}
.address {margin-top: 15px;}
.addr_area {background: #f7f7f1;}
.addrtop {height: 5px;background-size: 100% 5px;
  background: url("../../assets/images/pay/icon_address_top_02.png") repeat-x;}
.addrbottom {
  background: url("../../assets/images/pay/icon_address_bottom_04.png") repeat-x;height: 5px;background-size: 100% 5px;}
.add_address {display: inline-block;font-size: 14px;height: 30px;
  line-height: 30px;border-radius: 3px;border: 1px solid #cfa972;
  padding: 4px 30px;margin: 20px 0;color: #cfa972;
  background-color: white;text-decoration: none;}
.custom-menu-link {
  background: url("../../assets/images/pay/icon_arrow.png") no-repeat;
  background-size: 8px 12px;
  background-position: right center;
  margin: 0 15px;
  color: #3b3937;
  line-height: 30px;
  padding: 5px 4px;
  display: block;
  overflow: hidden;
  padding-right: 14px;
  }
.fs15 {font-size: 15px;}
.fs14 {font-size: 14px;}
.sustoma {color: #3b3937;
/* padding: 15px;margin-right: 15px; */
display: inline-block;}
.addr_location {color: #888;line-height: 20px;margin-top: 6px;}
.contain {background-color: #ffffff;padding: 0 14px;}
.fl {float: left;}
.fr {float: right;}
.icon4 {width: 10px;height: 12px;float: right;margin-top: 3px;
  padding: 1px 0;}
.custom_menu{margin-top: 10px;padding:0 14px;background-color: #ffffff;}
.tip {float: right;margin-right: 10px;font-family: "微软雅黑";
  font-size: 14px;color: #666666;}
.date_pppp {position: fixed;width: 0px;height: 0px;color: #fccc;
  z-index: -1;top: 200px;left: 50px;border: 0px;}
.modal-mask {position: absolute;top: 0;left: 0;right: 0;
  bottom: 0;background: rgba(0,0,0,0.5);}
.modal{background: #fff;border-radius: 5px;margin: 200px auto;
  padding: 10px 15px;width: 50%;}
.modal-select{line-height: 40px;}
/*.checked-item {background: url("images/icon_selected.png") no-repeat;
  background-position: right center;background-size: 16px;}*/
.ptb15 {padding: 15px 0;}
.wenti{padding: 14px 0;font-size: 14px;color: #666;}
.text{width: 90%;height: 100px;background: #f9f9f9;padding: 15px;
  border:1px solid #d4cfc8;}
.checkedTeam {
    background: url("../../assets/images/common/icon_selected.png") no-repeat;
    background-position: right center;
    background-size: 16px;
  }
.btn-fixed {
      position: fixed;
      bottom: 0;
      left:0;
      right: 0;
    }
.btn {
      display: block;
      height: 40px;
      line-height: 40px;
      color: #fff!important;
      font-size: 15px;
      text-align: center;
      background-color: #ff8a00;
      outline: none;
      border: none;
      text-decoration: none;
    }
    .btn:active {
      background-color: #d07100;
    }
/* 选择地址 */
.addrlist {padding: 10px;font-size: 14px;background: white;}
.diz {background: #f7f7f1;}
.dividers {border-bottom: 10px solid #f7f7f2;}
.diz .arrow-margins {background-position: 98% center;}
.address-wraps {
  /* background-position-y: center; */
  padding-bottom: 15px;
}
.menu-links {
   background: url(../../assets/images/pay/icon_arrow.png) no-repeat;
  background-size: 8px 12px;
  background-position: right center;
  margin: 0 15px;
  color: #3b3937;
  /* line-height: 30px; */
  padding: 5px 4px;
  display: block;
  overflow: hidden;
  padding-right: 12px;
   }
.section-titles,.lite-dividers {
  border-bottom: 1px solid #d4cfc8;padding-left: 15px;}
.mt1s {margin-top: 30px;}
.fs14s {font-size: 14px;}
.checkboxs.checkeds {
  background-image: url(../../assets/images/common/icon_selected.png);
}
.checkboxs {float: left;display: inline-block;width: 16px;height: 16px;
  background:url(../../assets/images/common/icon_unselect.png) no-repeat;
  background-size: 16px;margin-top: 12px;}
.locations {line-height: 20px;margin-top: 6px;}
.mt2 {margin-top: 20px;}
.tc {text-align: center;}
.section-title,.lite-divider {
  border-bottom: 1px solid #777777;padding-left: 15px;}
.input-wrap {overflow: hidden;line-height: 46px;}
.hidden-input {height: 20px;margin-top: 12px;border: none;
  outline: none;background-color: transparent;text-align: right;}
.menu-link {
   background: url("../../assets/images/pay/icon_arrow.png") no-repeat;
  background-size: 8px 12px;
  background-position: right center;
  padding-right: 15px;
  color: #3b3937;
  display: block;
  overflow: hidden
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
  height: 0.8rem;
  line-height: 0.8rem;
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
  background: url(../../assets/images/common/icon_cancel.png) no-repeat;
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
.city,
.city2 {
  font-size: 14px;
  color: #000;
  width: 25%;
  height: 30px;
  line-height: 30px;
  text-align: center;
  padding: 5px 0;
}
.city {
  background-color: #fff;
}
.city2 {
  background-color: #e0e0e0;
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
  color: #fff !important;
  font-size: 15px;
  text-align: center;
  background-color: #ff8a00;
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
  padding: 4px 8px;
  border-radius: 2px;
}

/* 选择地区2 */
.w-modal-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
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
  background-image: url(../../assets/images/common/icon_select.png);
  background-repeat: no-repeat;
  background-position: left center;
  background-size: 16px;
  padding: 15px 0 15px 25px;
}
.WCheckedItem {
  background-image: url(../../assets/images/common/icon_selectted.png);
}
.clear{clear:both;}
.fl{float: left;}
.pic_frame {width: 94%;margin: 0px 0% 0px 6%;}
.pl15 {padding-left: 15px;}
.pr15 {padding-right: 15px;}
.add-pic-bg {background-image: url('../../assets/images/suggest/bg.png');height: 100px;width: 95px;}
</style>
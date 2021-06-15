<template>
  <div id="repairs">
    <van-overlay :show="showOverlay">
      <van-loading type="spinner" vertical color="#1989fa" :show="showOverlay" class="loading">
        处理中...
      </van-loading>
    </van-overlay>
    <div v-show="page== 'main'" class="address">
      <div class="topLine">
        <div class="topLineLeft">所在小区</div>
        <div class="topLineRight">{{address.xiaoquName}}</div>
      </div>
      <div class="radioBox">
        <van-radio-group v-model="distType" direction="horizontal">
          <van-radio name="1" shape="square" icon-size="18px">入室</van-radio>
          <van-radio name="0" shape="square" icon-size="18px">公共</van-radio>
        </van-radio-group>
      </div>
      <div class="addr_area" @click="choseAddress" v-if="distType==='1'">
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
      <div class="custom_menu" v-if="distType==='0'">
        <div>
          <textarea class="address-text" @blur="fixScroll" placeholder="输入公共部位地址" v-model="pubAddress">
          </textarea>
        </div>
      </div>
      
      <div class="custom_menu">
        <div class="wenti">
          问题描述
        </div>
        
        <div>
          <textarea class="text" @blur="fixScroll" placeholder="输入问题描述内容..." v-model="memo">
          </textarea>
        </div>
        <div style="margin-top:15px;width:100%;height:30px;font-size: 14px;color: #666">
          <div style="float: left;padding-left: 5px;">上传照片(单张图片大小不超过5M)</div>
          <div style="float: right;padding-right: 15px;color: #999">{{fileList.length}}/3</div>
        </div>
        <div>
          <van-uploader v-model="fileList" multiple :max-count="3" :max-size="5000 * 1024" @oversize="onOversize" accept="image/*"/>
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
      </div>
    </div>
  </div>
</template>

<script>
let vm
import { Dialog, Toast, RadioGroup, Radio, Uploader, Overlay, Loading } from 'vant'
import WorkOrderApi from '@/api/WorkOrderApi.js'
export default {
  data() {
    return {
      page: "main",
      address: {}, //报修地址
      localIdsid:'',
      memo:'',
      addresses: [],
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
      distType: '1',
      pubAddress: '',
      fileList: [],
      showOverlay: false
    };
  },
  watch: {
    suggestLocation: {
      handler() {
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
    vm = this
  },
  mounted() {
    this.initInfo()
  },
  components: {
    [Toast.name]: Toast,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [Uploader.name]: Uploader,
    [Overlay.name]: Overlay,
    [Loading.name]: Loading
  },
  methods: {
    initInfo() {
        WorkOrderApi.getDefaultAddress().then((response)=>{
          if(response.data.success){
            if(response.data.result){
              this.address = response.data.result
            }
          }
        }).catch((error)=>{
          Toast(error)
        })
    },
    onOversize() {
      Toast('文件大小不能超过 5M');
    },
    //ios中留白问题
    fixScroll() {
      let u = navigator.userAgent;
      let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if (isiOS) {
        window.scrollTo(0,0);
      }
    },
    //点击切换地址
    choseAddress() {
      vm.page = "list";
      vm.dataAddress();
    },
    //获取地址
    dataAddress() {
      var repair='repair';
      vm.receiveData.getData(vm, "/addresses?module="+repair, "data", function() {
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
    submit() {
      if(this.distType==='1' && !this.address.id){
        Dialog({ message: '请选择服务地址' })
        return false
      }
      if(this.distType==='0' && !this.pubAddress){
        Dialog({ message: '请填写服务地址' })
        return false
      }
      if(!this.memo){
        Dialog({ message: '问题描述不能为空' })
        return false
      }
      this.showOverlay = true
      let addressName = this.distType==='0'?this.pubAddress:this.address.regionStr+this.address.detailAddress
      let formData = new FormData()
      formData.append('distType', this.distType)
      formData.append('address', addressName)
      formData.append('addressId', this.address.id)
      formData.append('content', this.memo)
      this.fileList.forEach(item => {
        formData.append('fileList', item.file)
      })
      WorkOrderApi.addWorkOrder(formData).then((response)=>{
        this.showOverlay = false
        if(response.data.success){
          Toast('报修成功')
          // this.$router.push({path: url)
        }else{
          Toast(response.data.message)
        }
      }).catch((error)=>{
        Toast(error)
        this.showOverlay = false
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
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}

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
.address { margin-top: 15px;}
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
.address-text{width: 90%;height: 60px;background: #f9f9f9;padding: 15px;
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

.check {
  color: #f60;
  border-right: 1px solid #ddd;
  border-left: 1px solid #ddd;
  border-top: 2px solid #f60;
  background: #fff;
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

.radioBox {
  margin: 0 0 15px 15px;
}
.fileUploader {
  margin: 0 0 15px 15px;
}
.loading {
  margin-top: 40vh;
}

</style>
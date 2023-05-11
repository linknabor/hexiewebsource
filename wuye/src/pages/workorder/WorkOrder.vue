<template>
  <div id="repairs">
    <van-overlay :show="showOverlay">
      <van-loading type="spinner" vertical color="#1989fa" :show="showOverlay" class="loading">
        处理中...
      </van-loading>
    </van-overlay>
    <div class="header" v-if="skeletonLoading"></div>
    <van-skeleton title :row="3" :loading="skeletonLoading">
    <div v-show="page== 'main'" class="address">
      <div class="topLine">
        <div class="topLineLeft">所在小区</div>
        <div class="topLineRight">{{address.sect_name}}</div>
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
          <div class="add_address" v-show="!address.cell_addr">选择报修地址</div>
        </div>
        <div class="custom-menu-link" v-show="address.cell_addr">
          <div class="sustoma">
            <span>{{userInfo.name}}</span>
            <span style="margin-left:15px;">{{userInfo.tel}}</span>
            <div
              class="addr_location"
            >{{address.cell_addr}}</div>
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
          <div style="float: left;padding-left: 5px;">上传照片(单张图片大小不超过10M)</div>
          <div style="float: right;padding-right: 15px;color: #999">{{fileList.length}}/3</div>
        </div>
        <div>
          <van-uploader v-model="fileList" multiple :max-count="3" :max-size="10000 * 1024" @oversize="onOversize" accept="image/*"/>
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
          <i class="checkboxs" :class="{checkeds:address&&address.mng_cell_id===item.mng_cell_id}"></i>
          <div>
            <!-- <span style="margin-left:20px">{{item.receiveName}}</span>
            <span style="margin-left:15px">{{item.tel}}</span>
            <span class="mainlian" style="margin-left:15px" v-if="item.main">默认</span> -->
          </div>
          <div
            class="locations"
            style="margin-left:35px"
          >{{item.sect_name}} {{item.cell_addr}}</div>
        </div>
      </div>
    </div>
    <van-popup v-model="showHotline" :style="{width: '90%', height: '60%', fontSize: '0.4rem'}" round :close-on-click-overlay="false">
        <div class="hotline-image"></div>
        <div class="hotline">
          请拨打值班报修热线：
          <a :href="'tel:'+hotline" class="a-hotline">{{hotline}}</a>
        </div>
    </van-popup>
    </van-skeleton>
  </div>
</template>

<script>
let vm
import { Dialog, Toast, RadioGroup, Radio, Uploader, Overlay, Loading, Skeleton, Popup, Image as VanImage } from 'vant'
import WorkOrderApi from '@/api/WorkOrderApi.js'
import Storage from '@/util/storage.js'
export default {
  data() {
    return {
      userInfo: {},
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
      suggestLocation: "",
      suggestion: {},
      suggestions: [],
      showg: false,
      showz: false,
      distType: '1',
      pubAddress: '',
      fileList: [],
      showOverlay: false,
      skeletonLoading: true,
      acceptType: '', //工单接单类型
      hotline: '',  //报修电话
      startTime: '',
      endTime: '',
      showHotline: false,
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
    setTimeout(() => {
      this.skeletonLoading = false;
    }, 800);
    this.getUserInfo()
    this.initInfo()
  },
  components: {
    [Toast.name]: Toast,
    [RadioGroup.name]: RadioGroup,
    [Radio.name]: Radio,
    [Uploader.name]: Uploader,
    [Overlay.name]: Overlay,
    [Loading.name]: Loading,
    [Skeleton.name]: Skeleton,
    [Popup.name]: Popup,
    [VanImage.name]: VanImage,
  },
  methods: {
    getUserInfo() {
      let userInfo = Storage.get('userInfo')
      if(userInfo) {
        this.userInfo = userInfo
        let wdappids = this.is_config.C('wdappids')
        console.log(wdappids)
        if(wdappids.indexOf(userInfo.appId)>-1) {
          const secondaryColor = getComputedStyle(document.documentElement).getPropertyValue('--secondary-color');
          console.log(secondaryColor)
          document.documentElement.style.setProperty('--primary-color', secondaryColor);
          const secondarySelIcon = getComputedStyle(document.documentElement).getPropertyValue('--secondary-icon-selected');
          document.documentElement.style.setProperty('--primary-icon-selected', secondarySelIcon);
        } else {
          const originColor = getComputedStyle(document.documentElement).getPropertyValue('--origin-color');
          document.documentElement.style.setProperty('--primary-color', originColor);
          const originSelIcon = getComputedStyle(document.documentElement).getPropertyValue('--origin-icon-selected');
          document.documentElement.style.setProperty('--primary-icon-selected', originSelIcon);
        }
      }
    },
    initInfo() {
        this.showOverlay = true
        WorkOrderApi.getService().then((response)=>{
          if(response.data.success){
            if(response.data.result){
              this.acceptType = response.data.result.accept_type
              this.hotline = response.data.result.repair_hotline
              this.startTime = response.data.result.start_time
              this.endTime = response.data.result.end_time
              this.addresses = response.data.result.hou_info
              if(this.addresses && this.addresses.length>0) {
                this.address = this.addresses[0]
              }
              if(this.acceptType === '4'){
                this.showHotline = true
              }
              this.showOverlay = false
            }
          } else {
              Toast(response.data.message)
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
    },
    //选择地址
    checks(item) {
      vm.address = item;
      vm.page = "main";
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
      if(this.distType==='1' && !this.address.mng_cell_id){
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
      let serveAddr = this.address.cell_addr
      let addressName = this.distType==='0'?this.pubAddress:serveAddr
      let formData = new FormData()
      formData.append("acceptType", this.acceptType)
      formData.append('distType', this.distType)
      formData.append('address', addressName)
      formData.append('addressId', this.address.id)
      formData.append('content', this.memo)
      this.fileList.forEach(item => {
        formData.append('fileList', item.file)
      })
      WorkOrderApi.addWorkOrder(formData).then((response)=>{
        if(response.data.success){
          Toast('报修成功,即将为您跳转...')
          let url = this.basePageUrl+'wuye/index.html?'+this.common.getoriApp()+'#/workOrderList'
          location.href = url
        }else{
          this.showOverlay = false
          if(response.data.message) {
            Dialog({ message: response.data.message})
          } else {
            this.showOverlay = false
            Dialog({message: '报修失败,请重试'})
          }
          
        }
      }).catch(()=>{ 
        this.showOverlay = false
        Dialog({message: '报修失败,请重试'})
      })

    }
  },
  computed: {}
};
</script>

<style scoped lang='less'>
@import "../../assets/less/mixin.less";

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
  overflow: hidden;height: 16px;color: var(--primary-color);}
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
.mt1s {margin-top: 15px;}
.fs14s {font-size: 14px;}
.checkboxs.checkeds {
  background-image: url(../../assets/images/common/icon_selected.png);
}
.checkboxs {float: left;display: inline-block;width: 16px;height: 16px;
  background:url(../../assets/images/common/icon_unselect.png) no-repeat;
  background-size: 16px;margin-top: 12px;}
.locations {line-height: 20px; margin: 10px 10px 10px 0}

.check {
  color: var(--primary-color);
  border-right: 1px solid #ddd;
  border-left: 1px solid #ddd;
  border-top: 2px solid var(--primary-color);
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
  background-color: var(--primary-color);
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
.header {
  height: 4vh;
  width: 100%;
  background-color: #fff;
}
.hotline {
  margin: 4% 0 0 5%;
  font-size: 0.4rem;
}
.a-hotline {
  color: #4994df;
}
.hotline-image {
  margin: 1.2rem 0.8rem;
  width: 5rem;
  height: 4rem;
  background-size: cover;
  background-size: cover;
  background-repeat: no-repeat;
  .bg-image('../../assets/images/repair/outofservice')
}
</style>
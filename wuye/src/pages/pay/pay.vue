<template>
<div id="divwuye"  @scroll="getscroll">
  <div class="main">
    <van-overlay :show="showOverlay">
    	<div class="overlay-loading">
			<van-loading type="spinner" color="#ff8a00" vertical>处理中...</van-loading>
    	</div>
    </van-overlay>
    <mt-navbar id="navBar" v-model="selected">
      <!-- <mt-tab-item id="d">查询缴费</mt-tab-item>
      <mt-tab-item id="b">我的账单</mt-tab-item>
      <mt-tab-item id="a">扫描账单</mt-tab-item> -->
      <mt-tab-item v-for="item in wuyeTabsList" :key="item.id" :id="item.value">{{item.name}}</mt-tab-item>
    </mt-navbar>
    
    <div class="header" v-show="selected==='b'">
        <div class="location">
            <div class="location-image" @click="switchSect"><van-icon name="location-o" size="large"></van-icon></div>
            <div class="location-text" @click="switchSect">{{this.sectName}}<span><a href="#" style="color: #1989fa">[切换]</a></span>
                <van-popover
                    v-model="showSwitchTips"
                    :overlay="true"
                    :offset="[-10, 15]"
                    >
                    <div style="margin: 0.3rem 0.2rem; width: 2.5rem; font-size: 0.3rem">
                        <span>{{switchTips}}</span>
                    </div>
                </van-popover>
            </div>
        </div>
    </div>
    <div style="width:100%; margin-top:10vh;" v-show="billInfo.length==0&&selected=='b'"><van-empty description="没有可以缴费的账单" /></div>
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="a">
        <!-- 账单缴费开始-->
        <div class="lite-divider">
          <input
            placeholder="输入账单号可快速缴费"
            class="hidden-input"
            style="text-align:left;"
            v-model="stmtId"
          />
          <div class="scan-icon" @click="show"></div>
        </div>
        <mt-button class="subBtn" size="large" @click.native="submit">提交</mt-button>
        <div style="width:100%;height:0.92rem;"></div>
        <div id="word">
          <Bill :bill-info="quickBillInfo" :version="version1" @itemClick="itemClick"></Bill>
        </div>
        <div style="width:100%;height:1.2rem;background:#eee;"></div>
        <div class="btn-fixed">
          <div class="fl select-btn" v-show="quan1" :class="{allSelected:quickAllselect}"  @click="allSelect(quickBillInfo,'quickAllselect')">全选&nbsp;</div>
          <div class="pay" @click="pays('quickBillInfo','quickAllPrice','quickAllselect')">
            我要缴费
            <span>￥{{quickAllPrice}}</span>
          </div>
        </div>
        <!-- 账单缴费结束 -->
      </mt-tab-container-item>
      <mt-tab-container-item id="b" >
        <!-- 物业缴费开始 -->
        <div class="btext" v-show="sectId==0 || sectId== null || sectId == 'null'">
          <div >业主未绑定房屋,请点击下方"我是业主"前往绑定</div>
          <div class="bhouse" @click="Myhouse">我是业主</div>
        </div>
        <div id="word">
          <Bill v-show="sectId!=0 && sectId!= null" :bill-info="billInfo" @itemClick="itemClick"  :version="version1" ></Bill>
        </div>
        <div style="width:100%;height:1.2rem;background:#eee;"></div>
        <div class="btn-fixed">
          <div
            class="fl select-btn"
            v-show="quan2"
            :class="{allSelected:bAllSelect }"
            @click="allSelect(billInfo,'bAllSelect')"
          >全选&nbsp;</div>
          <div class="pay" @click="pays('billInfo','allPrice','bAllSelect')">
            我要缴费
            <span>￥{{allPrice}}</span>
          </div>
        </div>
        <!-- 物业缴费结束 -->
      </mt-tab-container-item>
      <!-- 查询缴费开始 -->
      <mt-tab-container-item id="d">
        <div class="query-data">
          <div class="input-row">
            <label>小区：</label>
            <input
              type="text"
              id="btnd"
              class="virtual-input classinput"
              value
              placeholder="请输入小区"
              v-model.trim="query.sect"
              @click="fond()"
            />
            <i class="iconfont icon-chacha classc" @click="clicki" v-show="showi"></i>
          </div>

          <div v-show="wschat_house_sel_mode=='1'&&qrCodeOper!='1'">
              <div class="input-row">
              户号：
              <input
                type="text"
                class="virtual-input classinput"
                value
                placeholder="请输入户号"
                @input="toTrim"
                v-model="huhao"
                @change="huhaoserach()"
              />
              </div>
              <div class="input-row hint2" >户号可咨询所在小区物业，请拨打物业管理处电话<a v-for="(item, key) in telList" :key="key" class="link-tel" :href="'tel:'+item">{{item}}&nbsp;&nbsp;<br></a></div>
          </div>
          <div v-show="wschat_house_sel_mode=='0'||qrCodeOper=='1'">
            <div class="input-row">
              房屋地址：
            <input type="text" class="virtual-input" value="" placeholder="请输入房屋地址" @input="queryAddr" v-model="cellAddr">
            <i class="iconfont icon-chacha  classc" @click="removeAddr" v-show="selectShow"></i>
            <ul class="input-uis" v-show="cellShow" >
              <li :data-idd="item.id" v-for="item in houseList" :key="item.id"  v-tap="{fn:selectCell,name:item.name,id:item.id,params:item.params}">{{item.name|subString}}</li>
            </ul>
            </div>
            <div class="input-row hint">如1号101，输入1-101即可</div>
          </div>

          <!-- 判断是否为无账单显示 -->
          <div class="input-row" v-if="standard1">
            <label>起始日期：</label>
            <input class="virtual-input classinput1" type="date" value="" v-model="startData" >
          </div>

          <div class="input-row" v-if="standard3">
            <label>起始日期：</label>
            <div class="virtual-input classinput1" type="date">{{startData | moment("YYYY/MM/DD")}}</div>

          </div>
          <div class="input-row" v-if="standard2" v-show="andios=='Android'">
            <label>结束日期：</label>
            <input class="virtual-input classinput1" type="date" value="" v-model="endData" @change="Changename()">
          </div>

          <div class="input-row" v-if="standard2" v-show="andios=='ios'">
            <label>结束日期：</label>
            <input class="virtual-input classinput1" type="date" value="" v-model="endData" @blur="Blurname()">
          </div>

        </div>
          <div id="word">
          <Bill
            :bill-info="queryBillInfo"
            :version="version"
            :other-billinfo="otherbillinfo"
            @itemClick="itemClick"
          ></Bill>
        </div>
        <div style="wdith:100%;height:1.2rem;background:#eee;"></div>
        <div class="btn-fixed" id="st" v-show="showt">
          <div
            v-show="quan"
            class="fl select-btn"
            :class="{allSelected:queryAllselect }"
            @click="allSelect(queryBillInfo,'queryAllselect')"
          >全选&nbsp;</div>
          <div
            class="pay"
            @click="pay('queryBillInfo','queryAllPrice','queryAllselect','otherbillinfo','queryAllPrice1')"
          >
            <span >确定</span>
            <span v-if="zhuanpay=='zhuanye'" >￥{{queryAllPrice}}</span>
            <span v-if="zhuanpay=='biaozhun'" >￥{{queryAllPrice1}}</span>
          </div>
        </div>
      </mt-tab-container-item>
    </mt-tab-container>
    <!-- <Foot></Foot> -->
  </div>
   <div>
      <van-popup v-model="showSectList" 
          position="bottom"
          closeable
          :style="{ height: '100%' }"
          :safe-area-inset-bottom="true"
      >
        <div class="sect-select">
            <div class="sect-select-title">选择所在小区</div>
            <div class="sect-select-current-text">当前小区</div>
            <div class="sect-select-current-sect"><van-icon name="location" /><span class="sect-select-current-name">{{sectName}}</span></div>
            <div class="sect-select-divider"></div>
            <van-cell-group>
                <van-cell v-for="(house, index) in bindHouList" :key="index" :title="house.sect_name" :border="true" @click="selectHouse(house)">
                    <template slot="title">
                        <div>
                            <span>{{house.sect_name}}</span>
                            <span>{{house.sect_addr}}</span>
                        </div>
                    </template>
                    <template slot="label">
                        <div>{{house.cell_addr}}</div>
                    </template>
                </van-cell>
            </van-cell-group>
        </div>
    </van-popup>
  </div>
  <div  v-show="isshow"
    style=" background: rgba(0,0,0,0.5);display: none;width: 100%;height: 100%;top: 0rem; position: absolute;"></div>
  </div>

</template>
<script>
let vm;
let startData,endData;
let isloadPage=false;
import wx from "weixin-js-sdk";
import "../../tap.js";
import Bill from "../../components/bill.vue";
// import Foot from "../../components/footer.vue";
import moment from "../filter/datafromat";
import cookie  from 'js-cookie';
import Api from '@/api/api.js'
import TipsApi from '@/api/TipsApi.js'
import BaseInfoApi from '@/api/BaseInfoApi.js'
import Storage from '@/assets/js/storage.js'

import {Overlay, Loading, Dialog, Popover, Toast, Icon, CellGroup, Cell, Empty} from 'vant'

export default {
  filters: {
    subString(value) {
      if(value != "" && value.length > 20){
        let addr = value.substring(value.length-20, value.length)
        addr = '…'+ addr
        return addr
      } else {
        return value
      }
    },
    moment
  },
  components: {
    Bill,
    [Overlay.name]: Overlay,
    [Loading.name]: Loading,
    [Popover.name]: Popover,
    [Toast.name]: Toast,
    [Icon.name]: Icon,
    [CellGroup.name]: CellGroup,
    [Cell.name]: Cell,
    [Empty.name]: Empty,
  },
  computed: {
    //物业缴费总价
    allPrice: function() {
      let ap = 0;
      for (let i in this.billInfo) {
        if (this.billInfo[i].selected == true) {
          ap += Number(this.billInfo[i].fee_price);
        }
      }
      return parseFloat(ap).toFixed(2);
    },

    //快捷缴费总价
    quickAllPrice: function() {
      let ap = 0;
      for (let i in this.quickBillInfo) {
        if (
          this.quickBillInfo[i].selected == true &&
          this.quickBillInfo[i].pay_status == "02"
        ) {
          ap += Number(this.quickBillInfo[i].fee_price);
        }
      }
      return parseFloat(ap).toFixed(2);
    },
    //查询缴费总价
    queryAllPrice: function() {
      let ap = 0;
      for (let i in this.queryBillInfo) {
        if (this.queryBillInfo[i].selected == true) {
          ap += Number(this.queryBillInfo[i].fee_price);
        }
      }
      return parseFloat(ap).toFixed(2);
    },
    //无账单缴费
    queryAllPrice1: function() {
      let ap = 0;
      for (let i in this.otherbillinfo) {
        if (this.otherbillinfo[i].selected == true) {
          ap += Number(this.otherbillinfo[i].fee_price);
        }
      }
      return parseFloat(ap).toFixed(2);
    }
  },
  data() {
    return {
      userInfo: {},
      isshow:false,
      version: "02",
      version1: "02",
      zhuanpay: "zhuanye",
      getversion: "02",
      regionname: "",
       regionname1: "",
      standard1: false,
      standard2: false,
      standard3: false,
      standard4: false,
      startData: "",
      verNumber: "",
      endData: "",
      buildList: [], //楼宇列表
      unitList: [], //门牌列表
      houseList: [], //室号列表
      query: {
        //查询缴费数据
        sect: "", //小区
        sectID: "", //小区id
        build: "", //楼宇id
        unit: "", //门牌id
        house: "" //室号id
      },
      bills:'',
      openunit: false, //搜索小区

      stmtId: "", //快捷缴费 扫描出来的账单号
      url: "/billList",
      params: {
        startDate: "",
        endDate: "",
        payStatus: "02", //写死
        currentPage: 1, //页码
        totalCount: 0 //第几条开始
      },
      bAllSelect: false, //物业缴费全选
      quickAllselect: false, //快速缴费全选
      queryAllselect: false, //查询缴费全选
      billInfo: [], //物业缴费数据
      carBillInfo: [], //停车缴费数据
      queryBillInfo: [], //查询缴费数据
      quickBillInfo: [], //快捷查询数据
      otherbillinfo: [], //无账单缴费
      billPage: 1, // 物业缴费页码
      queryBillPage: 1, //查询缴费页码
      quickBillpage: 1,
      pay_least_month: 1,
      reduceMode: 99, //减免金额的方式
      id: "",
      showi: false,
      showp: false,
      showt: true,
      quan: false,
      quan1: false,
      quan2: false,
      permit_skip_pay: "1",
      is_null:'',
      andios:'',//判断系统类型
      mine:true,
      huhao:'',//户号
      wschat_house_sel_mode:'',//切换户号
      sectId:'',//判断是否绑定房子
      wuyeTabsList:'',//选项卡
      selected: "", //选项卡 默认选中
      cardPayService:'', //控制是否可以 绑卡支付
      qrCodeOper: '0',
      cellAddr: '',
      cellShow: false,
      selectShow: false,
      showOverlay: false,	//遮罩
      officeTel: '',	//物业管理处电话
      telList: [],
      sectName: '',
      showSwitchTips: false,
      switchTips: '',
      showSectList: false,
      bindHouList: [],
    };
  },
  watch: {
    selected(newv,old){
      isloadPage=false;
      if(newv=='b'){
        this.getSwitchSectTips()
        this.billPage = 1  //页码重置
        this.params.currentPage = 1
        this.params.house_id = ''
        if(!this.sectId){
          if(!this.userInfo) {
            this.userInfo = Storage.get("userInfo")
          }
          this.sectId = this.userInfo.sectId
          this.params.sect_id = this.userInfo.sectId
        } else {
          this.params.sect_id = this.sectId
        }
        this.zong()
      }
    }
  },
  created() {
    vm = this;
  },
  mounted() {
    this.initUser()
    vm.TabsList();
    vm.unitselect();
    vm.getHousin();
    let url = location.href.split("#")[0];
    var data = {
                vm:vm,
                wx:wx,
                apiList:['scanQRCode','getLocation'],
                url:url
            }
    vm.receiveData.wxconfig(data);

    vm.Compatibility();
    // 判断是否是专业版
  },
  methods: {
    initUser() {
      this.userInfo = Storage.get("userInfo")
      if(this.userInfo) {
        this.sectName = this.userInfo.xiaoquName
      }
      
    },
    TabsList() {//获取localstorage中的选项卡
      let wuyeTabs = window.localStorage.getItem("wuyeTabsList");
      vm.sectId = cookie.get('sectId');//
      vm.cardPayService = cookie.get('cardPayService');//获取sectId
      if(wuyeTabs && (wuyeTabs != 'null' && wuyeTabs != 'undefined')) {//不等于空获取
         vm.wuyeTabsList = JSON.parse(window.localStorage.getItem("wuyeTabsList"));
         vm.selected = vm.wuyeTabsList[0].value;
      }
      if(!wuyeTabs || wuyeTabs == 'null' || wuyeTabs == 'undefined' || !vm.sectId || (vm.cardPayService =='' || vm.cardPayService  == undefined)){
          let n = "GET",
          a = "userInfo?oriApp="+vm.getUrlParam('oriApp'),
          i = null,
          e = function(n) {
            cookie.set('userId',n.result.id);
            cookie.set('cspId',n.result.cspId);
            cookie.set('sectId',n.result.sectId);
            cookie.set('cardPayService',n.result.cardPayService);
            if(n.result.wuyeTabsList) { //判断是否有值重新填入
              vm.common.localSet('wuyeTabsList',JSON.stringify(n.result.wuyeTabsList))
              //填入后在获取赋值
              vm.wuyeTabsList = JSON.parse(window.localStorage.getItem("wuyeTabsList"));
              vm.selected = vm.wuyeTabsList[0].value;
            }else {
              Dialog({message: '没有配置选项卡'})
              return
            }
            vm.sectId=cookie.get('sectId'); //获取sectid
            vm.cardPayService =cookie.get('cardPayService');
            Storage.set("userInfo", n.result)
            this.userInfo = n.result
            vm.initUser()
          },
          r = function(n) {

          };
        this.common.invokeApi(n, a, i, null, e, r);
      }
    },
    removeAddr(){
      this.cellAddr = ''
      this.selectShow = false
      this.cellShow = false
    },
    queryAddr(){
			if(!this.query.sectID || !this.cellAddr) {
				return false
			}
			let param = {
				sectId: this.query.sectID,
				cellAddr: this.cellAddr
			}
			Api.getCellAddrList(param).then((response)=>{
				let data = response.data
				if(data.success){
					this.houseList = data.result.house_info
					this.cellShow = true
				}
			})
		},
    selectCell(s){
			vm.$nextTick(()=>{
				this.cellAddr = s.name
				this.cellShow = false
				this.selectShow = true
				this.query.house = s.id

        this.getCoupons()
			})
		},
    //跳转绑定房子
    Myhouse() {
      vm.$router.push({path:'/Myhouse'});
    },
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

    Compatibility(){
      const u = navigator.userAgent, app = navigator.appVersion;
      // Android 判断
      const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
      // iOS 判断
      const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      if (isAndroid) {
        vm.andios='Android';
      }
      if (isIOS) {
        vm.andios='ios';
      }
    },
    Changename(){
      vm.specifiName();
    },
    Blurname(){
      window.scrollTo(0,0);
      vm.specifiName();
    },
    specifiName(){
      if(vm.is_null=="0"){
          endData=vm.formatDate(vm.endData,'yyyyMMdd');
          startData=vm.startData;
          // startData = vm.formatDate(startData,'yyyyMMdd');
          vm.wuzhangdan(startData,endData);
          vm.isshow=true;
          vm.showp=true;
        }else{
          startData = vm.formatDate(vm.startData,'yyyyMMdd');
          endData=vm.formatDate(vm.endData,'yyyyMMdd');
          vm.wuzhangdan(startData,endData);
          vm.isshow=true;
          vm.showp=true;
        }
    },
    //模仿线上用户信息
    //105/747/384
     //请求 停车缴费 和 物业缴费首屏数据
    zong(){
      if(vm.selected=="b"&&vm.mine){
        if(vm.sectId!=0 && vm.sectId!= null) {
            vm.isshow=true;
            vm.showp = true;
            vm.receiveData.getData(vm,"/billList","data",function() {
              if(vm.data.success) {
                  if(vm.data.result!=null) {
                      vm.mine=false;
                      vm.pay_least_month = vm.data.result.pay_least_month;
                      vm.reduceMode = vm.data.result.reduce_mode; //减免方式
                      vm.permit_skip_pay = vm.data.result.permit_skip_pay; //判断跳跃付款
                      if(vm.data.result.bill_info.length>0) {//不是空数组
                        vm.billInfo = vm.data.result.bill_info; //物业缴费
                      }else {
                        vm.billInfo = vm.data.result.bill_info
                        // Dialog({message: '没有可以缴费的账单'})
                      }
                      vm.billPage += 1;
                  }else {
                        // Dialog({message: '没有可以缴费的账单'})
                  }
              }else {
                  Dialog({message: vm.data.message})
              }
              vm.isshow=false;
              vm.showp = false;
            },vm.params);
        }
      }
    },
    //跳转到查询缴费
    unitselect() {
      if (this.$route.query.selected == "d") {
        vm.selected = this.$route.query.selected;
        vm.query.sect = this.$route.query.userunit;
        vm.query.sectID = this.$route.query.queryID;
        vm.regionname = this.$route.query.City;
      }
    },

    //获取小区
    getHousin() {
      if(vm.query.sect==''){
       return
      }
      let url =
        "/getVagueSectByName?sect_name=" +
        this.$route.query.userunit +
        "&regionname=" +
        this.$route.query.City;
        vm.receiveData.getData(vm, url, "Datas", function() {
            //判断是标准还是专业版
            // if (vm.Datas.result.sect_info[0].version == "01") {
            //   vm.getversion = vm.Datas.result.sect_info[0].version;
            //   vm.zhuanpay = "biaozhun";
            // } else {
            //   vm.standard1 = false;
            // }
            let link = [];
            link = vm.Datas.result.sect_info;
            for(var i =0;i<link.length;i++) {
                if(vm.$route.query.queryID == link[i].id) { //判断是哪个小区
                  //判断是标准还是专业版
                  if (link[i].version == "01") {
                    vm.getversion = link[i].version;
                    vm.zhuanpay = "biaozhun";
                  } else {
                    vm.standard1 = false;
                  }
                  vm.wschat_house_sel_mode = link[i].params.WECHAT_HOUSE_SEL_MODE;
                  vm.qrCodeOper = link[i].qrCodeOper
                  vm.telList = link[i].telList
                }
            }
            if (link && link.length > 0) {
              if(vm.wschat_house_sel_mode=='0'){
                vm.add();
              }
              vm.showi = true;
            } else {
              vm.showi = false;
            }
      });
    },
    // 查询小区
    fond() {
      vm.$router.push({ path: "/fontUnit" });
    },
    //叉叉
    clicki() {
      vm.query.sect = "";
      vm.query.build = "";
      vm.query.unit = "";
      vm.query.house = "";
      vm.huhao="";
      vm.startData = "";
      vm.endData = "";

      vm.buildList = [];
      vm.unitList = [];
      vm.houseList = [];
      var add = document.getElementById("btnd");
      add.value = "";

      vm.showi = false;
      vm.queryBillInfo = []; //清空查询账单列表
      vm.otherbillinfo = []; //清空无账单查询列表
      vm.standard1= false;
      vm.standard2= false;
      vm.standard3= false;
      vm.quan = false;
    },
    add() {
      vm.getCellMng(vm.query.sectID,"", "","03");
      vm.getCellMng(vm.query.sectID,"0","","02");
      vm.getCellMng(vm.query.sectID,"0","0","01");
    },

    //楼宇选中
    getCouponSelected() {
      vm.unitList = [];
      vm.houseList = [];
      vm.getCellMng(vm.query.sectID, vm.query.build, "", "02");
      vm.getCellMng(vm.query.sectID, vm.query.build, "0", "01");
      vm.standard1= false;
      vm.standard2= false;
      vm.standard3= false;

      // vm.standard4= false;
      vm.otherbillinfo = [];
    },
    //门牌选中
    getCoupon() {
      vm.houseList = [];
      if(this.query.build=="") {
        this.query.build="0";
      }
      this.getCellMng(this.query.sectID,this.query.build,this.query.unit,"01");
      vm.standard1= false;
      vm.standard2= false;
      vm.standard3= false;
      vm.otherbillinfo = [];
    },
    //室号选中
    getCoupons() {
      //获取用户数据
     vm.standard1= false;
      vm.standard2= false;
      vm.standard3= false;
      vm.queryBillInfo = []; //清空查询账单列表
      vm.otherbillinfo = [];
      vm.queryBillPage = 1; //页码重置
      isloadPage=false;//重置加载状态
      vm.queryisLastPage = false; //是否最后一页重置
      // 请求查询账单数据
      if (vm.getversion == "01") {
        if(vm.query.house!="0"){
           vm.getBillStartDate();
        }
        vm.version = vm.getversion;
      } else {
        vm.version = "02";
        vm.queryBillList();
      }
    },

    getBillStartDate() {
      this.showOverlay = true
      vm.receiveData.getData(
        vm,
        "/getBillStartDateSDO?regionname=" +
          this.$route.query.City +
          "&house_id=" +
          vm.query.house,
        "res",
        function() {
          vm.showOverlay = false
          if (vm.res.success) {
            vm.is_null=vm.res.result.is_null;
            if(vm.is_null=='0'){
                  vm.startData=vm.res.result.start_date;
                  vm.endData=vm.res.result.end_date;
                  vm.endData=vm.endData.replace(/^(\d{4})(\d{2})(\d{2})$/, "$1-$2-$3");
                  startData=vm.startData;
                  endData=vm.formatDate(vm.endData,'yyyyMMdd');
                  vm.wuzhangdan(startData,endData);
                  vm.isshow=true;
                  vm.showp = true;
                  vm.standard3 =true;
                  vm.standard2=true;
              }else if(vm.is_null=="1"){
                  vm.standard1=true;
                  vm.standard2=true;
                  vm.startData=vm.res.result.start_date;
                  vm.endData=vm.res.result.end_date;
                  vm.startData=vm.startData.replace(/^(\d{4})(\d{2})(\d{2})$/, "$1-$2-$3");
                  vm.endData=vm.endData.replace(/^(\d{4})(\d{2})(\d{2})$/, "$1-$2-$3");
                  endData=vm.formatDate(vm.endData,'yyyyMMdd');
                  startData=vm.formatDate(vm.startData,'yyyyMMdd');
                  vm.wuzhangdan(startData,endData);
                  vm.isshow=true;
                  vm.showp = true;
            }else {
                 return;
            }
          }else {
            Dialog({message: vm.res.message})
          }
        }
      );
    },
    //无账单接口
    wuzhangdan(startData,endData) {
      vm.receiveData.getData(
        vm,
        "/getPayListStd?regionname=" +
          this.$route.query.City +
          "&house_id=" +
          vm.query.house +
          "&start_date=" +
          startData +
          "&end_date=" +
          endData,
        "res",
        function() {
          if (vm.res.success) {
            if(vm.res.result==null){
              Dialog({message: '没有搜索到账单'})
              vm.isshow=false;
              vm.showp = false;
             }
            vm.otherbillinfo = vm.res.result.other_bill_info;
            vm.reduceMode = vm.res.result.reduce_mode;
            vm.bills = vm.res.result.other_bill_info[0].bills;
            vm.isshow=false;
            vm.showp = false;
          }else {
            Dialog({message: vm.res.message})
            vm.isshow = false;
            vm.showp = false;
          }

        }
      );
    },
    //请求 楼宇 门牌 室号 数据
    // 参数1： 小区id 参数2： 楼宇id 参数3： 室号id 参数4： 数据类型（03：楼宇；02：门牌；01：房屋）
    getCellMng(sect_id, build_id, unit_id, data_type) {
      vm.isshow=true;
      vm.showp = true;
      let url = "/getHeXieCellById?regionname=" + this.$route.query.City;
      let params = {
        sect_id,
        build_id,
        unit_id,
        data_type
      };
      vm.receiveData.getData(
        vm,
        url,
        "queryInfo",
        function() {
          if(vm.queryInfo.success) {
              let InfoList = vm.queryInfo.result;
              if (Array.isArray(InfoList) && InfoList.length <= 0) {
              vm.showp = false;
              vm.isshow=false;
              } else {
                vm.queryBillInfo = []; //清空查询账单列表
                if ("03" == data_type) {
                  vm.buildList = InfoList.build_info;
                  vm.buildList.unshift({ id: "0", name: "请选择" });
                  // vm.unitList = [];
                  // vm.houseList = [];
                } else if ("02" == data_type) {
                  vm.unitList = InfoList.unit_info;
                  vm.unitList.unshift({ id: "0", name: "请选择" });
                  // vm.houseList = [];
                } else if ("01" == data_type) {
                  vm.houseList = InfoList.house_info;
                  vm.houseList.unshift({ id: "0", name: "请选择" });
                }
                vm.showp = false;
                vm.isshow=false;
              }
          }else {
              if ("03" == data_type) {
                vm.buildList =[];
                vm.unitList = [];
                vm.houseList = [];
              } else if ("02" == data_type) {
                vm.unitList = [];
                vm.houseList = [];
              } else if ("01" == data_type) {
                vm.houseList = [];
              }
            vm.showp = false;
            vm.isshow=false;
          }
        },
        params
      );
    },
     //去掉户号空格
    toTrim() {
      this.huhao = this.huhao.replace(/\s/g, "");
    },
    //户号查询交给
    huhaoserach() {
      //判断是否为正确户号号
      var reg = /^\d{12}$/
      if(reg.test(vm.huhao)) {
          vm.showOverlay = true
          vm.queryBillInfo = []; //清空查询账单列表
          vm.otherbillinfo = [];

          vm.receiveData.getData(vm, "/hexiehouse/" + vm.huhao, "res", function() {
            vm.showOverlay = false
            vm.query.sectID = vm.res.result.sect_id;
            vm.query.house = vm.res.result.mng_cell_id;
            vm.queryBillPage = 1; //页码重置
            isloadPage = false; //重置加载状态
            if (vm.res.success) {
              if (vm.getversion == "01") {
                vm.getBillStartDate();
                vm.version = vm.getversion;
                // vm.zhuanpay = "biaozhun";
              } else {
                vm.version = "02";
                vm.queryBillList();
              }
            }else {
              Dialog({message: vm.res.message})
            }
          })
        }else {
            Dialog({message: '请输入正确户号'})
        }

    },
    //请求查询缴费 账单列表
    queryBillList() {
      // vm.getBillStartDate();
      vm.showOverlay = true
      vm.isshow=true;
      vm.showp = true;
      let url = "billList?regionname=" + this.$route.query.City;
      vm.params.house_id = vm.query.house;
      vm.params.sect_id = vm.query.sectID;
      vm.params.currentPage = vm.queryBillPage;
      vm.receiveData.getData(
        vm,
        url,
        "queryBillInfo",
        function() {
          vm.showOverlay = false
          if (vm.queryBillInfo.success) {
            if (vm.queryBillInfo.result == null) {
              vm.queryBillInfo = [];
            } else {
              vm.queryBillPage+=1;
              vm.permit_skip_pay = vm.queryBillInfo.result.permit_skip_pay;
              vm.pay_least_month = vm.queryBillInfo.result.pay_least_month; //3月份
              vm.reduceMode = vm.queryBillInfo.result.reduce_mode; //从新赋值减免方式
              // console.log('我是减免方式:'+vm.queryBillInfo.result.reduce_mode+'我把他赋值给'+vm.reduceMode)

              if (
                vm.queryBillInfo.result.bill_info &&
                vm.queryBillInfo.result.bill_info.length > 0
              ) {
                vm.queryBillInfo = vm.queryBillInfo.result.bill_info;
              } else {
                Dialog({message: '没有可缴费的账单'})
                vm.queryBillInfo = [];
              }
            }
          } else {
            Dialog({message: '没有可缴费的账单'})
            vm.queryBillInfo = [];
          }
          vm.showp = false;
          vm.isshow=false;
        },
        vm.params
      );
    },

    submit() {
      //请求扫码快速缴费数据
      if (vm.stmtId == "" || vm.stmtId.length != 18) {
        Dialog({message: '请输入正确账单号'})
        return;
      }
       isloadPage=false; //重置加载状态
			vm.quickAllselect = false;//重置加载状态
      vm.quickBillpage = 1;
      let url =
        "quickPayBillList/" +
        vm.stmtId +
        "/" +
        vm.quickBillpage +
        "/" +
        vm.params.totalCount;
      vm.receiveData.getData(vm, url, "quickData", function() {
        if (vm.quickData.result && vm.quickData.result.bill_info.length > 0) {
          vm.permit_skip_pay = vm.quickData.result.permit_skip_pay;
          vm.quickBillInfo = vm.quickData.result.bill_info;
          vm.reduceMode = vm.quickData.result.reduce_mode;
          vm.pay_least_month = vm.quickData.result.pay_least_month;
          vm.quickBillpage+=1
        } else {
          Dialog({message: '未查询到数据'})
        }
      });
    },
    //分页
		 getscroll(e) {
			var st = e.srcElement.scrollTop;
			// console.log(st);
			var ad=window.innerHeight
			var hd=$('#word').height();
			// console.log(st+ad)
			if( st+ad >=hd && !isloadPage) {
				isloadPage=true;
				if(vm.selected=='a'){
					vm.quickloadBottom();
				}else if(vm.selected=='b') {
					vm.loadBottom();
				}else {
					vm.queryLoadBottom();
				}
			}
       },
    queryLoadBottom() {
      //查询缴费上拉加载数据
      let tempArr = null;
      //页码加1
      vm.params.currentPage = vm.queryBillPage;
      let url = "billList?regionname=" + this.$route.query.City;
      vm.receiveData.getData(
        vm,
        url,
        "pageData4",
        function() {
          tempArr = vm.pageData4.result.bill_info;
          if (tempArr && tempArr.length > 0) {
            vm.queryBillInfo =vm.queryBillInfo.concat(tempArr); //快捷缴费
            vm.queryAllselect=false;
            vm.queryBillPage+=1;
            isloadPage=false;
          } else {
            vm.quan = true;
          }
        },
        vm.params
      );
    },

    quickloadBottom() {
      //快捷缴费上拉加载数据
      //临时接收的数组
      let tempArr = null;
      //页码加1
      let url =
        "quickPayBillList/" +
        vm.stmtId +
        "/" +
        vm.quickBillpage +
        "/" +
        vm.params.totalCount;
      //请求接口数据
      vm.receiveData.getData(vm, url, "pageData3", function() {
        tempArr = vm.pageData3.result.bill_info;
        if (tempArr && tempArr.length > 0) {
          vm.quickBillInfo = vm.quickBillInfo.concat(tempArr); //快捷缴费
          vm.quickAllselect = false;
          vm.quickBillpage += 1;
          isloadPage=false;
        } else {
          vm.quan1 = true;
        }
      });
    },
    loadBottom() {
      //物业缴费 上拉加载数据
      //临时接收的数组
      let tempArr = null;
      //页码自增
      vm.params.currentPage = vm.billPage;
      //请求接口数据
      vm.receiveData.getData(
        vm,
        // vm.url,
        "/billList",
        "pageData",
        function() {
            tempArr = vm.pageData.result.bill_info; //物业缴费
          vm.billPage += 1;

          if (tempArr && tempArr.length > 0) {
            vm.billInfo = vm.billInfo.concat(tempArr); //物业缴费
            vm.bAllSelect = false;
            isloadPage=false;
          } else {
            // vm.bisLastPage = true;
            vm.quan2 = true;
          }
        },
        vm.params
      );
    },
     pays(list, allPrice, allselect){ // 专业版
        if (vm[allPrice] < 0.01) {
          Dialog({message: '请选择账单后支付'})
          return;
        }
        let selectedArr = []; //所有数据
        var sel_bill_arr = new Array(); //日期
        if (vm[allselect] == true) {
          //全部选中
          for (let i in vm[list]) {
            var ret = jQuery.inArray(
              vm[list][i].service_fee_cycle,
              sel_bill_arr
            );
            if (-1 == ret) {
              sel_bill_arr.push(vm[list][i].service_fee_cycle);
            }
            selectedArr.push(vm[list][i]);
          }
        } else {
          //只选中一部分
          for (let i in vm[list]) {
            if (vm[list][i].selected) {
              var ret = jQuery.inArray(
                vm[list][i].service_fee_cycle,
                sel_bill_arr
              );
              if (-1 == ret) {
                sel_bill_arr.push(vm[list][i].service_fee_cycle);
              }
              selectedArr.push(vm[list][i]);
            }
          }
        }
        let bills = ""; //id
        for (let i in selectedArr) {
          if (selectedArr.length - 1 == i) {
            bills += selectedArr[i].bill_id;
          } else {
            bills += selectedArr[i].bill_id + ",";
          }
        }
        if (vm.pay_least_month > 0) {
          if (vm.pay_least_month > sel_bill_arr.length) {
            Dialog({message: '请至少选择' + vm.pay_least_month + '个月的账单进行支付。'})
            return false;
          }
        }
        var oriapp=vm.common.getoriApp();
        var oriap = vm.getUrlParam('oriApp');
        if(oriap == 'wxe8dea53aad1a93b9') {
          window.location.href =vm.basedhzj3Url +"wuyepay.html?"+oriapp+"#/?billIds=" +bills + "&stmtId=" + vm.stmtId +
         "&totalPrice=" +vm[allPrice] + "&reduceMode=" + vm.reduceMode + "&regionname=" +vm.regionname +"&getversion=" + "02"+"&cardPayService="+vm.cardPayService + "&payFeeType=01" + "&selected="+vm.selected;
        }else {
         window.location.href =vm.basePageUrl +"wuyepay.html?"+oriapp+"#/?billIds=" +bills + "&stmtId=" + vm.stmtId +
         "&totalPrice=" +vm[allPrice] + "&reduceMode=" + vm.reduceMode + "&regionname=" +vm.regionname +"&getversion=" + "02"+"&cardPayService="+vm.cardPayService + "&payFeeType=01" + "&selected="+vm.selected;
        }
    },
    //点击物业缴费按钮
    pay(list, allPrice, allselect, otherbillinfo, queryallPrice1) {
      //第一个参数 账单数组，第二个参数 总价 第三个参数 是否全选,所有参数 string
      if (vm.getversion == "01") { //标准版
        if (vm[queryallPrice1] < 0.01) {
          Dialog({message: '请选择帐单后支付'})
          return;
        }
        var oriapp=vm.common.getoriApp();
        var oriap = vm.getUrlParam('oriApp');
        if(oriap == 'wxe8dea53aad1a93b9') {
          window.location.href =vm.basedhzj3Url +"wuyepay.html?"+oriapp+"#/?billIds=" +vm.bills + "&regionname=" +this.$route.query.City +"&totalPrice="+vm[queryallPrice1] +"&house_id=" +
          vm.query.house +"&sect_id=" +vm.query.sectID + "&start_date=" +startData + "&end_date=" + endData +"&getversion=" + '01' + "&reduceMode=" + vm.reduceMode + "&cardPayService="+vm.cardPayService + "&payFeeType=01" + "&selected="+vm.selected;
        }else {
          window.location.href =vm.basePageUrl +"wuyepay.html?"+oriapp+"#/?billIds=" +vm.bills + "&regionname=" +this.$route.query.City +"&totalPrice="+vm[queryallPrice1] +"&house_id=" +
          vm.query.house +"&sect_id=" +vm.query.sectID + "&start_date=" +startData + "&end_date=" + endData +"&getversion=" + '01' + "&reduceMode=" + vm.reduceMode + "&cardPayService="+vm.cardPayService + "&payFeeType=01" + "&selected="+vm.selected;
        }
      } else { // 专业版
         vm.pays(list, allPrice, allselect)
      }
    },

    //调用微信扫一扫接口, 成功 数据返回到stmtId,显示在input上
    show() {
      vm.receiveData.scan(vm, wx, "stmtId");
    },
    //点击某个选中按钮 params1:被点击按钮的下标 params2:被点击按钮所属的数组
    itemClick: function(index, version, b, otherBillinfo) {
      //3个页面对应不同的三个数组
      //if 01标准版  else 02专业版
      if (version == "01") {
        if (otherBillinfo[index].selected) {
           vm.$set(otherBillinfo[index], "selected", false);
        }else{
           vm.$set(otherBillinfo[index], "selected", true);
        }
      } else {
        let len = b.length;
        if (b[index].pay_status != "02") {
          return;
        }
        //permit_skip_pay  0允许  1不允许
        if (vm.permit_skip_pay == "1") {
          if (b[index].selected) {
            //选中状态下
            for (let i = index; i < len; i++) {
              //后面的全部取消选中
              vm.$set(b[i], "selected", false);
            }
            //某一个点击了取消后全选消失
            vm.bAllSelect = false;
            vm.queryAllselect = false;
            vm.quickAllselect = false;
            //    console.log(vm.bAllSelect)
          } else {
            //未选中状态下，前面全部选中
            for (let j = index; j >= 0; j--) {
              //
              vm.$set(b[j], "selected", true);
            }
          }
        } else if (vm.permit_skip_pay == "0") {
          if (b[index].selected) {
            //选中状态下
            vm.$set(b[index], "selected", false);
            //某一个点击了取消后全选消失
            vm.bAllSelect = false;
            vm.queryAllselect = false;
            vm.quickAllselect = false;
            //    console.log(vm.bAllSelect)
          } else {
            //未选中状态下，前面全部选中
            vm.$set(b[index], "selected", true);
          }
        }
      }
    },

    //点击全选按钮 params:需要被全部选中的数组
    allSelect: function(arr, a) {
      if (vm[a]) {
        //取消全选
        for (let i in arr) {
          vm.$set(arr[i], "selected", false);
        }
      } else {
        //全部选中
        for (let i in arr) {
          if (vm.$set(arr[i], "selected", true)) {
            vm.$set(arr[i], "selected", true);
          }
        }
      }
      //取反
      vm[a] = !vm[a];
    },

    getSwitchSectTips() {
            TipsApi.getSwitchSectTips('pay').then((response)=>{
                let data = response.data
                if(data && data.errorCode === 0){
                    if(data.result){
                        this.showSwitchTips = true
                        this.switchTips = data.result
                    }
                }
            }).catch((error)=>{
                console.log(error)
            })
        },
        switchSect() {
            this.showSectList = true
            this.getBindHouList()
        },
        getBindHouList() {
            BaseInfoApi.queryHouseByUser().then((response)=>{
                let data = response.data
                if(data && data.errorCode === 0){
                    if(data.result){
                        this.bindHouList = data.result
                    }
                }
            }).catch((error)=>{
                console.log(error)
                Toast(error)
            })
        },
        selectHouse(house) {
            let param = {
                province: house.province_name,
                city: house.city_name,
                county: house.region_name,
                sectId: house.sect_id,
                sectName: house.sect_name,
                cspId: house.csp_id
            }
            BaseInfoApi.switchSect(param).then((response)=>{
                let data = response.data
                if(data && data.errorCode === 0){
                    if(data.result) {
                        this.userInfo = data.result
                        this.sectName = this.userInfo.xiaoquName
                        if(!this.sectName) {
                            this.sectName = '游客'
                        }
                        Storage.set('userInfo', data.result)
                        this.common.updatecookie(data.result.cardStatus,data.result.cardService,data.result.id,data.result.appid,
                        data.result.cspId,data.result.sectId,data.result.cardPayService,data.result.bgImageList,data.result.wuyeTabsList,
                        data.result.qrCode,data.result);
                        this.mine = true
                        this.sectId = house.sect_id
                        this.params.sect_id = this.sectId
                        this.billPage = 1  //页码重置
                        this.params.currentPage = 1
                        this.zong()
                        isloadPage = false
                    }
                } else {
                    Toast(data.message)
                }
                this.showSectList = false
                
            }).catch((error)=>{
                console.log(error)
                Toast(error)
            })
        }
    },
}
</script>
<style>
.mint-tab-item-label {
  font-size: 0.3rem;
}
body {
  height: 100vh;
  -webkit-tap-highlight-color: transparent;
  background: #eee;
}
</style>
<style scoped lang="less">

@import "../../assets/less/mixin.less";

.header{
    margin: 0.35rem 0.2rem 0rem 0.2rem;
    width: 93%;
    height: 0.28rem;
    // background-color: #fff;
}
.location{
    &-image{
        float: left;
        width: 0.25rem;
        height: 0.28rem;
    }
    &-text{
        margin-left: 0.15rem;
        // margin-top: 0.04rem;
        float: left;
        text-align: left;
        font-size: 0.28rem;
        color: var(--primary-color);
    }
}
.selected {
  //../../assets/images/common/icon_selected.png
  background: var(--primary-icon-selected) no-repeat;
  background-size: 0.32rem;
  background-position: center;
}
.bill-item {
  overflow: hidden;
  color: #666;
  border-radius: 3px;
  border: 1px solid #cdcdcb;
  background: white;
  height: 1.6rem;
  top: -2.5rem;
  position: relative;
  width: 92%;
  left: 4%;
}
.bill-item1 {
  border: 0px solid #cdcdcb !important;
}
.classinput1 {
  text-align: left;
}
a {
  color: black;
}
/*查询缴费*/
.input-row .classinput {
  padding-right: 0.36rem;
  /* user-select: none; */
  left: 0.3rem;
  position: relative;
}

.query-data {
  /* height: 18vh; */
  padding: 0.25rem 0.4rem;
  /* margin-bottom: 0.2rem; */
}
.virtual-input {
  width: 4rem;
  border: 1px solid #e5e5e5;
  border-radius: 5px;
  padding-left: 0.2rem;
  display: inline-block;
  height: 0.52rem;
  line-height: 0.52rem;
  background-color: #fff;
  font-size: 0.25rem;
  box-sizing: border-box;
  left: 0.3rem;
  position: relative;
}
.input-row {
  padding-bottom: 0.3rem;
  font: 0.26rem/0.5rem "";
  color: #2e2e2e;
  height: 0.6rem;
  line-height: 0.6rem;
  position: relative;
  font-size: 0.28rem;
  float: left;
  text-align: right;
  width: 90%;
}

.input-row .input-uis {
	  width: 93vw;
    position: absolute;
    top: 0.7rem;
    left: 0rem;
    z-index: 666;
    background-color: #F5F4F3;
    color: #696969;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin-left: -0.4rem;
	}
	.input-row .input-uis li {
		font-size: 0.3rem;
		height:0.7rem;
		line-height:0.7rem;
		border-bottom: 1px solid #ccc;
		padding-left:0.3rem;
		background-color:#fff;
		width: 90vw;
    text-align: left;
	}
.classc {
  position: absolute;
  right: 0rem;
  /* top: 0.04rem; */
  color: #ccc;
}
.test::-webkit-scrollbar {
  width: 0.2rem;
  height: 1px;
}
.test::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #fff;
}
.test::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  /* -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2); */
  border-radius: 10px;
  /* background: #EDEDED; */
}
.top2 {
  position: relative;
  top: -0.2rem;
}
/*footbtn start*/
.blank {
  padding-bottom: 1rem;
}

.btn-fixed {
  position: fixed;
  color: #fff;
  left: 0;
  right: 0;
  bottom: .3rem;
  height: 0.92rem;
  line-height: 0.92rem;
  text-align: center;
}
.btn-fixed img {
  border-style: none;
  width: 72%;
  height: 1rem;
}

.select-btn {
  padding-left: 36px;
  background: url("../../assets/images/pay/icon_unselect_white.png") no-repeat;
  background-color: rgba(0, 0, 0, 0.6);
  background-size: 16px;
  background-position: 15px center;
  /* height: 0.92rem; */
  /* line-height: 0.92rem; */
  height: 0.75rem;
 line-height: 0.75rem;
 border-radius: 5px;
 position:relative;
 top:.1rem;
}

.allSelected {
  background: url("../../assets/images/pay/icon_selected_white.png") no-repeat;
  background-color: rgba(0, 0, 0, 0.6);
  background-size: 16px;
  background-position: 15px center;
}

.pay {
 bottom: -0.1rem;
  text-align: center;
  position: relative;
  font-size: 0.3rem;
  width: 80%;
  overflow:hidden;
  background-size: 310px;
  background-color: var(--primary-color);
  background-position: -11px center;
    line-height: 0.8rem;
    border-radius: 5px;
    margin-top: .05rem;
    margin:0;
    margin-left: 10%;
}
/* #divwuye {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background:#fff;
		overflow:auto;
	} */
.mint-tab-container {
  background: white;
  width: 96%;
  margin: auto;
  margin: 0.1rem 2% 0.2rem 2%;
  overflow: visible;
}
.btext {
    background-color: rgb(238, 238, 238);
    text-align: center;
    font-size: 0.3rem;
    padding-top:0.2rem;
}
.bhouse {
    display: inline-block;
    margin-top: 0.2rem;
    padding: 0.2rem;
    color:#fff;
    border-radius: 5px;
    font-size:0.3rem;
    background-color: var(--primary-color);
}
/*footbtn end*/

.main {
  width: 100%;
  margin: 0 0;
}

.mint-navbar .mint-tab-item {
  border-bottom: 1px solid white;
}

.mint-navbar .mint-tab-item.is-selected {
  border-bottom: 1.5px solid var(--primary-color);
  margin-bottom: 0;
  color: var(--primary-color);
}

.lite-divider {
  border-bottom: 1px solid #d4cfc8;
  padding-left: 0.15rem;
  overflow: hidden;
  padding: 1px;
  margin-top: 35px;
}
.hidden-input {
  height: 0.4rem;
  margin-top: 0.4rem;
  width: 4rem;
  -background: black;
  border: none;
  outline: none;
  background-color: transparent;
  font-size: 0.28rem;
  padding: 0 0.15rem 0.15rem;
  left:-2.5rem;
  /* left:0.2rem; */
  /* position:relative; */
}

.scan-icon {
  float: right;
  margin-top: 0.35rem;
  margin-right: 0.3rem;
  display: inline-block;
  height: 0.4rem;
  width: 0.4rem;
  background: url("../../assets/images/house/icon_scan.png");
  background-size: cover;
  position:absolute;
  right:0rem;
}
.subBtn {
  height: 0.88rem;
  line-height: 0.88rem;
  background-color: var(--primary-color);
  font-size: 0.3rem;
  color: white;
  width: 6rem;
  margin: 0.6rem auto 0;
}

/*加载中*/
#phoneErro {
  margin: 100px auto 0;
  top: 25%;
  left: 25%;
  width: 50%;
  text-align: center;
  height: 60px;
  line-height: 60px;
  background-color: #ccc;
  -moz-opacity: 0.8;
  opacity: 0.8;
  filter: alpha(opacity=80);
  position: fixed;
  z-index: 1999;
  overflow: auto;
  color: white;
  -moz-border-radius: 15px;
  -webkit-border-radius: 15px;
  font-size: 14px;
  display: none;
}

#phoneAjax {
  position: fixed;
  top: 25%;
  left: 50%;
  width: 60px;
  height: 60px;
  line-height: 60px;
  margin-left: -30px;
  text-align: center;
  /* background-color: black; */
  /* -moz-opacity: 0.8; */
  /* opacity: 0.8; */
  /* filter: alpha(opacity=80); */
  z-index: 1998;
  /* overflow: auto; */
  -moz-border-radius: 15px;
  -webkit-border-radius: 15px;
}
.hidden {
  visibility: hidden;
}
.city {
  background-color: #fff;
}
.city2 {
  background-color: #e0e0e0;
}
/* 查询账单样式 */
#word{
  overflow: hidden;
  width: 100%;
  position: relative;
  background: #eee;
  border: 0px;
}
/* 滚动 */
#divwuye {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: auto;
}
.mint-tab-container-wrap{
  display:flex;
}
.mint-tab-container-item{
  flex-shrink: 0;
    width: 100%;
}
.hint{
  color: #ff1a1a;
  margin:-0.3rem 0 0.2rem 0rem;
  height: 0.2rem;
  font-size: 0.28rem;
}
.hint2{
  color: #ff1a1a;
  margin: -0.1rem 0 0.2rem 2.2rem;
  font-size: 0.28rem;
  text-align: left;
  width: 55vw;
  line-height: 0.4rem;
}
.overlay-loading{
  margin-top: 7rem;
}
.link-tel{
  color: #0000EE;
}
.sect-select {
    width: 100%;
    min-height: 100%;
    margin: 0;
    padding: 0;

    &-title {
        margin: 0.4rem 0;
        text-align: center;
        font-weight: bolder;
        font-size: 0.4rem;
    }
    &-current {
        &-text  {
            margin: 0.25rem 0.4rem;
            font-size: 0.3rem;
            color: #A9A9A9;
        }
        &-sect {
            margin: 0rem 0.4rem;
            font-size: 0.3rem;
        }
        &-name {
            font-weight: 600;
            font-size: 0.3rem;
            vertical-align: text-top;
        }
    }
    &-divider {
        margin-top: 0.4rem;
        height: 0.2rem;
        width: 100%;
        background-color: #F7F7F8;
    }
}
</style>

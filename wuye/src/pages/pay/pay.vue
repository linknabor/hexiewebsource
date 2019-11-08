<template>
<div id="divwuye"  @scroll="getscroll">
  <div class="main">
    <!-- 加载中 -->
    <div id="phoneErro"></div>
    <!-- class="hidden" -->
    <div id="phoneAjax" v-show="showp">
      <img
        src="../../assets/images/house/c3d7f369-4a5e-4c4a-9fb9-a4b9d274c7e1.gif"
        style="width:40px;height:40px;vertical-align: middle;"
      />
    </div>

    <mt-navbar id="navBar" v-model="selected">
      <mt-tab-item id="a">账单缴费</mt-tab-item>
      <!--  -->
      <mt-tab-item id="b">物业缴费</mt-tab-item>
      <!-- <mt-tab-item id="c">停车缴费</mt-tab-item> -->
      <mt-tab-item id="d">查询缴费</mt-tab-item>
    </mt-navbar>
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
          <Bill :bill-info="quickBillInfo" :version="version" @itemClick="itemClick"></Bill>
        </div>
        <div style="width:100%;height:2.2rem;background:#eee;"></div>
        <div class="btn-fixed">
          <!-- <img src="../../assets/images/house/paymoney.png" /> -->
          <div class="fl select-btn" v-show="quan1" :class="{allSelected:quickAllselect}"  @click="allSelect(quickBillInfo,'quickAllselect')">全选&nbsp;</div>
          <div class="pay" @click="pay('quickBillInfo','quickAllPrice','quickAllselect')">
            我要缴费
            <span>￥{{quickAllPrice}}</span>
          </div>
        </div>
        <!-- 账单缴费结束 -->
      </mt-tab-container-item>
      <mt-tab-container-item id="b">
        <!-- 物业缴费开始 -->
        <div id="word">
          <Bill :bill-info="billInfo" @itemClick="itemClick"  :version="version" ></Bill>
        </div>
        <!-- <div style="width:100%;height:0.92rem;"></div> -->
        <div style="width:100%;height:2.2rem;background:#eee;"></div>
        <div class="btn-fixed">
          <!-- <img src="../../assets/images/house/paymoney.png" /> -->
          <div
            class="fl select-btn"
            v-show="quan2"
            :class="{allSelected:bAllSelect }"
            @click="allSelect(billInfo,'bAllSelect')"
          >全选&nbsp;</div>
          <div class="pay" @click="pay('billInfo','allPrice','bAllSelect')">
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
          <div class="input-row">
            <label>楼宇：</label>
            <select class="virtual-input" v-model="query.build" @change="getCouponSelected">
              <!-- <option value="0">请选择</option> -->
              <option v-for="item in buildList" :value="item.id">{{item.name}}</option>
            </select>
          </div>
          <div class="input-row">
            <label>门牌：</label>
            <select class="virtual-input" v-model="query.unit" @change="getCoupon">
              <!-- <option value="0">请选择</option> -->
              <option v-for="item in unitList" :value="item.id">{{item.name}}</option>
            </select>
          </div>
          <div class="input-row">
            <label>室号：</label>
            <select class="virtual-input" v-model="query.house" @change="getCoupons">
              <!-- <option value="0">请选择</option> -->
              <option v-for="item in houseList" :value="item.id">{{item.name}}</option>
            </select>
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
          <div class="input-row" v-if="standard2">
            <label>结束日期：</label>
            <input class="virtual-input classinput1" type="date" value="" v-model="endData" @change="specifiName()">
              
          </div>
          <!-- <div class="input-row" v-if="standard4">
            <label>结束日期：</label>
            <div class="virtual-input classinput1 aa" type="date">{{endData | moment("YYYY/MM/DD")}}</div>
              
          </div> -->
        </div>
        <div id="word">
          
          <Bill
            :bill-info="queryBillInfo"
            :version="version"
            :other-billinfo="otherbillinfo"
            @itemClick="itemClick"
          ></Bill>
          <!-- <div  v-show="isshow"
      style=" background: rgba(0,0,0,0.5);display: none;width: 100%;height: 38.5%;top: 6.8rem; position: absolute;"></div> -->

        </div>
        <!-- <div style="width:100%;height:0.92rem;background:#eee;"></div> -->
        <div style="wdith:100%;height:2.2rem;background:#eee;"></div>
        <div class="btn-fixed" id="st" v-show="showt">
          <!-- <img src="../../assets/images/house/paymoney.png" /> -->
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
          
            我要缴费
            <span v-if="zhuanpay=='zhuanye'">￥{{queryAllPrice}}</span>
            <span v-if="zhuanpay=='biaozhun'">￥{{queryAllPrice1}}</span>
          </div>
        </div>
      </mt-tab-container-item>
    </mt-tab-container>
    <Foot></Foot>
    <div  v-show="isshow"
      style=" background: rgba(0,0,0,0.5);display: none;width: 100%;height: 38.5%;top: 7.25rem; position: absolute;"></div>
  </div>
    
  </div>

</template>
<script>
let vm;
let timer,startData,endData;
let isloadPage=false;
import wx from "weixin-js-sdk";
import "../../tap.js";
import axios from "axios";
import { MessageBox } from "mint-ui";
import Bill from "../../components/bill.vue";
import { Indicator, Loadmore } from "mint-ui";
import Foot from "../../components/footer.vue";
import moment from "../filter/datafromat";

export default {
  components: { Bill, Foot },

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
      isshow:true,
      version: "02",
      zhuanpay: "zhuanye",
      getversion: "02",
      regionname: "上海市",
       regionname1: "",
      standard1: false,
      standard2: false,
      standard3: false,
      // standard4: false,
      startData: "",
      addr: "",
      verNumber: "",
      endData: "",
      sectList: [], //小区列表
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
      // bisLastPage: false, //物业缴费是否为最后一页
      // carisLastPage: false, //停车缴费是否最后一页
      // quickisLastPage: false, //快捷缴费是否为最后一页
      // queryisLastPage: false, //查询缴费是否为最后一页
      bAllSelect: false, //物业缴费全选
      // carAllselect: false, //停车缴费全选
      quickAllselect: false, //快速缴费全选
      queryAllselect: false, //查询缴费全选
      billInfo: [], //物业缴费数据
      carBillInfo: [], //停车缴费数据
      queryBillInfo: [], //查询缴费数据
      quickBillInfo: [], //快捷查询数据
      otherbillinfo: [], //无账单缴费
      selected: "a", //选项卡 默认选中
      billPage: 1, // 物业缴费页码
      // carBillPage: 1, //停车缴费页码
      queryBillPage: 1, //查询缴费页码
      quickBillpage: 1,
      pay_least_month: 1,
      reduceMode: 1, //减免金额的方式
      shows: false,
      id: "",
      showi: true,
      showp: false,
      showt: true,
      quan: false,
      quan1: false,
      quan2: false,
      one: "one",
      permit_skip_pay: "1",
       is_null:''
    };
  },
  //时间戳转换成日期
  filters: {
    moment
  },
  watch: {
    selected(newv,old){
      isloadPage=false;
    }
  },
  created() {
    vm = this;
  },
  mounted() {
     vm.city();
    vm.getHousin();
     vm.unitselect();
    // this.initSession4Test();
    let url = location.href.split("#")[0];
    vm.receiveData.wxconfig(vm, wx, ["scanQRCode","getLocation"], url);
   
    // 判断是否是专业版
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
    specifiName(){
      if(vm.is_null=="0"){
          endData=vm.formatDate(vm.endData,'yyyyMMdd');
          startData=vm.startData;
          // startData = vm.formatDate(startData,'yyyyMMdd');
          vm.wuzhangdan(startData,endData);
          }else{
            
            startData = vm.formatDate(vm.startData,'yyyyMMdd');
            endData=vm.formatDate(vm.endData,'yyyyMMdd');
            vm.wuzhangdan(startData,endData);
          }
          
        
    },
    
      
    
    //模仿线上用户信息
    //105/747/384
     //请求 停车缴费 和 物业缴费首屏数据
    zong(){
      vm.receiveData.getData(vm,"/billList?regionname="+vm.regionname1,
      "data",
      function() {
        vm.pay_least_month = vm.data.result.pay_least_month;
        vm.billInfo = vm.data.result.bill_info; //物业缴费
        vm.reduceMode = vm.data.result.reduce_mode; //减免方式
        vm.permit_skip_pay = vm.data.result.permit_skip_pay; //判断跳跃付款
        vm.billPage += 1;
      },
      vm.params
      
    );
    },
     city() {
        wx.ready(function() {
        wx.checkJsApi({
          jsApiList: ['getLocation'],
          success: function(res) {
            if (res.checkResult.getLocation == false) {
              alert(
                "你的微信版本太低，不支持微信JS接口，请升级到最新的微信版本！"
              );
              return;
            }
          }
        });
        wx.getLocation({

          type: "wgs84",
          success: function(res) {
             
            let latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
            let longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
            vm.getRegionurl(longitude, latitude);
            return;
            
          },
          cancel: function(res) {
            console.log("用户取消");
          }
        });
        wx.error(function(res) {
          alert("获取位置失败");
        });
      });
    },
getRegionurl(longitude, latitude) {
      vm.receiveData.getData(
        vm,
        "/getRegionUrl?coordinate=" + longitude + "," + latitude,
        "res",
        function() {
          if (vm.res.success) {
            vm.regionname1 = vm.res.result.address;
            vm.zong();
          } else {
            alert("获取数据失败");
          }
        }
      );
    },



    initSession4Test() {
      let url = "/initSession4Test/105";
      vm.receiveData.getData(vm, url, "Data", function() {});
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
      let url =
        "/getVagueSectByName?sect_name=" +
        this.$route.query.userunit +
        "&regionname=" +
        this.$route.query.City;
      vm.receiveData.getData(vm, url, "Datas", function() {
        //判断是标准还是专业版
        if (vm.Datas.result.sect_info[0].version == "01") {
          vm.getversion = vm.Datas.result.sect_info[0].version;
          // vm.standard1 = true;
          vm.zhuanpay = "biaozhun";
        } else {
          vm.standard1 = false;
        }

        let link = null;
        link = vm.Datas.result.sect_info;
        if (link && link.length > 0) {
          vm.sectList = vm.Datas.result.sect_info;
          vm.add();

          vm.shows = true;
          vm.showi = true;
        } else {
          vm.shows = false;
          vm.showi = true;
          // alert('没有搜索到该小区');
          // return false;
        }
      });
    },
    // 查询小区
    fond() {
      vm.$router.push({ path: "/fontUnit" });
    },
    //叉叉
    clicki() {
      if (vm.sectList.length <= 0) {
        vm.query.sect = "";
        vm.query.build = "";
        vm.query.unit = "";
        vm.query.house = "";
        vm.startData = "";
        vm.endData = "";
        var add = document.getElementById("btnd");
        add.value = "";
      }
      vm.query.sect = "";
      vm.query.build = "";
      vm.query.unit = "";
      vm.query.house = "";
      vm.startData = "";
      vm.endData = "";

      vm.buildList = [];
      vm.unitList = [];
      vm.houseList = [];
      vm.startData = "";
      vm.endData = "";
      var add = document.getElementById("btnd");
      add.value = "";

      vm.shows = false;
      vm.showi = false;
      vm.queryBillInfo = []; //清空查询账单列表
      vm.otherbillinfo = []; //清空无账单查询列表
      vm.standard1= false;
      vm.standard2= false;
      vm.standard3= false;
      // vm.standard4= false;
      vm.quan = false;
    },
    add() {
      vm.getCellMng(vm.query.sectID, "", "", "03");
      vm.getCellMng(vm.query.sectID, vm.query.build, "", "02");
      vm.getCellMng(vm.query.sectID, vm.query.build, vm.query.unit, "01");
    },

    // 失去焦点
    shi() {
      if (vm.query.sect != "" && vm.sectList.length >= 0) {
      }
      //
      if (vm.one != "two" && vm.query.sect != "" && vm.sectList.length >= 0) {
        vm.shows = false;
        vm.showi = true;
        var id = "";
        for (var i = 0; i < vm.sectList.length; i++) {
          if (vm.query.sect === vm.sectList[i].name) {
            id = vm.sectList[i].id;
          }
        }
        this.query.sectID = id;
        vm.add();
      }
    },
    // 获取焦点
    huo() {
      if (vm.query.sect != "" && vm.sectList.length > 0) {
        vm.shows = true;
        vm.showi = true;
      }
    },

    //楼宇选中
    getCouponSelected() {
      // sectList:[],//小区列表
      // buildList:[],//楼宇列表
      // unitList:[],//门牌列表
      // houseList:[],//室号列表

      vm.getCellMng(vm.query.sectID, vm.query.build, "", "02");
     vm.standard1= false;
      vm.standard2= false;
      vm.standard3= false;
      // vm.standard4= false;
      vm.otherbillinfo = []; 
    },
    //门牌选中
    getCoupon() {
      this.getCellMng(
        this.query.sectID,
        this.query.build,
        this.query.unit,
        "01"
      );
      vm.standard1= false;
      vm.standard2= false;
      vm.standard3= false;
      // vm.standard4= false;
      vm.otherbillinfo = []; 
    },
    //室号选中
    getCoupons() {
      //获取用户数据
      //重置
      vm.startData= '';
      vm.endData= '';
     
      vm.queryBillInfo = []; //清空查询账单列表
       vm.otherbillinfo = []; 
      vm.queryBillPage = 1; //页码重置
      isloadPage=false;//重置加载状态
      vm.queryisLastPage = false; //是否最后一页重置
      // 请求查询账单数据
      if (vm.getversion == "01") {
        vm.getBillStartDate();
        vm.version = vm.getversion;
      } else {
        vm.version = "02";
        vm.queryBillList();
      }
    },
    
    getBillStartDate() {
      vm.receiveData.getData(
        vm,
        "/getBillStartDateSDO?regionname=" +
          this.$route.query.City +
          "&house_id=" +
          vm.query.house,
        "res",
        function() {
          if (vm.res.success) {
           
            vm.is_null=vm.res.result.is_null;
            if(vm.is_null=='0'){
              vm.startData=vm.res.result.start_date;
              vm.standard3 =true;
              vm.standard2=true;
              }else{

              vm.standard1=true;
              vm.standard2=true;
              
             
            }
           
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
          "&sect_id=" +
          vm.query.sectID +
          "&start_date=" +
          startData +
          "&end_date=" +
          endData,
        "res",
        function() {
          if (vm.res.success) {
            vm.otherbillinfo = vm.res.result.other_bill_info;
          }
          console.log(addr);
        }
      );
    },
    //请求 楼宇 门牌 室号 数据
    // 参数1： 小区id 参数2： 楼宇id 参数3： 室号id 参数4： 数据类型（03：楼宇；02：门牌；01：房屋）
    getCellMng(sect_id, build_id, unit_id, data_type) {
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
          let InfoList = vm.queryInfo.result;
          if (Array.isArray(InfoList) && InfoList.length <= "0") {
            vm.showp = false;
          } else {
            vm.queryBillInfo = []; //清空查询账单列表
            if ("03" == data_type) {
              vm.buildList = InfoList.build_info;
              vm.buildList.unshift({ id: "0", name: "请选择" });
              vm.unitList = [];
              vm.houseList = [];
            } else if ("02" == data_type) {
              vm.unitList = InfoList.unit_info;
              vm.unitList.unshift({ id: "0", name: "请选择" });
              // vm.unitList=[];
              vm.houseList = [];
              if (vm.unitList.length == 1) {
                vm.getCellMng(
                  vm.query.sectID,

                  vm.query.build,
                  vm.query.unit,
                  "01"
                );
              }
            } else if ("01" == data_type) {
              vm.houseList = InfoList.house_info;
              vm.houseList.unshift({ id: "0", name: "请选择" });
            }
            vm.showp = false;
          }
        },
        params
      );
    },
    //请求查询缴费 账单列表
    queryBillList() {
      // vm.getBillStartDate();
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

                // vm.showp = false;
              } else {
                alert("没有搜索到账单");
                vm.queryBillInfo = [];
              }
            }
          } else {
            alert("没有搜索到账单");
            vm.queryBillInfo = [];
          }
          vm.showp = false;
        },
        vm.params
      );
    },

    submit() {
      //请求扫码快速缴费数据
      if (vm.stmtId == "" || vm.stmtId.length != 18) {
        alert("请输入正确账单号");
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
          alert("未查询到数据");
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
      // vm.queryBillPage += 1;
      vm.params.currentPage = vm.queryBillPage;
      let url = "billList?regionname=" + this.$route.query.City;
      vm.receiveData.getData(
        vm,
        url,
        "pageData4",
        function() {
          tempArr = vm.pageData4.result.bill_info;
          if (tempArr && tempArr.length > 0) {
            vm.queryBillInfo = vm.queryBillInfo.concat(tempArr); //快捷缴费
            vm.queryAllselect=false;
            vm.queryBillPage+=1;
            isloadPage=false;
          } else {
            // vm.queryisLastPage = true;
            vm.quan = true;
          }

        },
        vm.params
      );
      // vm.$refs.loadmore.onBottomLoaded();
    },

    quickloadBottom() {
      //快捷缴费上拉加载数据
      //临时接收的数组
      let tempArr = null;
      //页码加1
      // vm.quickBillpage += 1;
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
      // vm.$refs.loadmore1.onBottomLoaded();
    },
    loadBottom() {
      //物业缴费 上拉加载数据
      //临时接收的数组
      let tempArr = null;
      //页码自增
      // vm.billPage += 1;
      vm.params.currentPage = vm.billPage;
      //请求接口数据
      vm.receiveData.getData(
        vm,
        // vm.url,
        "/billList?regionname="+vm.regionname1,
        "pageData",
        function() {
          vm.billPage += 1;
          tempArr = vm.pageData.result.bill_info; //物业缴费
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
      // vm.$refs.loadmore2.onBottomLoaded();
    },
  
    //点击物业缴费按钮
    pay(list, allPrice, allselect, otherbillinfo, queryallPrice1) {
 

      //第一个参数 账单数组，第二个参数 总价 第三个参数 是否全选,所有参数 string
      if (vm.getversion == "01") {
        if (vm[queryallPrice1] < 0.01) {
          alert("请选择帐单后支付");
          return;
        }
        var oriapp=vm.getUrlParam('oriApp')?'oriApp='+vm.getUrlParam('oriApp'):'';
        window.location.href =vm.basePageUrl +"wuyepay.html?"+oriapp+"#/?regionname=" +this.$route.query.City +"&totalPrice="+vm[queryallPrice1] +"&house_id=" +
          vm.query.house +"&sect_id=" +vm.query.sectID + "&start_date=" +startData + "&end_date=" + endData +"&getversion=" + '01';
      } else {
        if (vm[allPrice] < 0.01) {
          alert("请选择账单后支付");
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
        let pay_addr = selectedArr[0].pay_addr;
        for (let i in selectedArr) {
          if (selectedArr.length - 1 == i) {
            bills += selectedArr[i].bill_id;
          } else {
            bills += selectedArr[i].bill_id + ",";
          }
        }
        if (vm.pay_least_month > 0) {
          if (vm.pay_least_month > sel_bill_arr.length) {
            alert("请至少选择" + vm.pay_least_month + "个月的账单进行支付。");
            return false;
          }
        }

        //----------过佳家
        // vm.str = 'https://test.e-shequ.com/weixin/';
        // let url = vm.str + "paymentdetail.html?#/?billIds="+bills+"&stmtId="+vm.stmtId+"&payAddr="+escape(pay_addr)+"&totalPrice="+vm[allPrice]+"&reduceMode="+vm.reduceMode;
        // window.location.href = url;
   var oriapp=vm.getUrlParam('oriApp')?'oriApp='+vm.getUrlParam('oriApp'):'';
        window.location.href =vm.basePageUrl +"wuyepay.html?"+oriapp+"#/?billIds=" +bills + "&stmtId=" + vm.stmtId + "&payAddr=" + escape(pay_addr) +
          "&totalPrice=" +vm[allPrice] + "&reduceMode=" + vm.reduceMode + "&regionname=" +vm.regionname +"&getversion=" + "02";
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
        } else {
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
    }
  },
  
};
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
<style scoped>
.selected {
  background: url("../../assets/images/common/icon_selected.png") no-repeat;
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
  left: 0.6rem;
  position: relative;
}

.query-data {
  /* height: 100%; */
  padding: 0.25rem 0.4rem;
  margin-bottom: 0.2rem;
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
  left: 0.6rem;
  position: relative;
}
.input-row {
  padding-bottom: 0.3rem;
  font: 0.26rem/0.5rem "";
  color: #2e2e2e;
  height: 0.6rem;
  position: relative;
  font-size: 0.28rem;
  float: left;
  text-align: right;
  width: 90%;
}

.input-row .input-uis {
  width: 3.5rem;
  position: absolute;
  top: 32px;
  left: 39px;
  height: 184px;
  z-index: 666;
  background-color: #f5f4f3;
  overflow: hidden;
  color: #000;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  overflow-y: auto;
}
.input-row .input-uis li {
  overflow: hidden;
  font-size: 16px;
  height: 30px;
  line-height: 30px;
  border-bottom: 1px solid #ccc;
  letter-spacing: 0.08rem;
  color: #707070;
  padding-left: 0.2rem;
  background-color: #fff;
}
.classc {
  position: absolute;
  right: -0.5rem;
  top: 0.04rem;
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
  /* bottom: 1.5rem; */
  bottom: 1.55rem;
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
 margin-top: .05rem;
}

.allSelected {
  background: url("../../assets/images/pay/icon_selected_white.png") no-repeat;
  background-color: rgba(0, 0, 0, 0.6);
  background-size: 16px;
  background-position: 15px center;
}

.pay {
 bottom: -0.05rem;
  text-align: center;
  position: relative;
  font-size: 0.3rem;
  width: 80%;
  overflow:hidden;
  background-size: 310px;
  background:url("../../assets/images/house/paymoney.png") no-repeat;
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
  /* margin: 0.2rem 0.3rem; */
  background: white;
  width: 94%;
  margin: auto;
  margin: 0.2rem;
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
  border-bottom: 1.5px solid #ff8a00;
  margin-bottom: 0;
  color: #ff8a00;
}

.lite-divider {
  border-bottom: 1px solid #d4cfc8;
  -padding-left: 0.15rem;
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
  background-color: #ff8a00;
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
  top: 20%;
  left: 50%;
  width: 60px;
  height: 60px;
  line-height: 60px;
  margin-left: -30px;
  text-align: center;
  background-color: #ccc;
  -moz-opacity: 0.8;
  opacity: 0.8;
  filter: alpha(opacity=80);
  z-index: 1998;
  overflow: auto;
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
</style>
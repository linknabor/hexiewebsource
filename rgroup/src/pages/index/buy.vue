<template>
  <div>
    <div>
      <div
        id="zzmb"
        v-show="zzshow"
        class="zzmb"
        style="display: none; position: fixed"
      ></div>
      <!-- 新增地址 -->
      <div class="diz" v-show="showd">
        <div v-show="showm">
          <!-- <div class="dividers"></div> -->
          <div
            class="plr15s arrow-margins menu-links mt1s fs14s address-wraps lite-dividers"
            v-for="item in addresses"
            :key="item.id"
            @click="checks(item)"
          >
            <i
              class="checkboxs fl"
              :class="{
                checkeds: checkedAddress && checkedAddress.id === item.id,
              }"
            ></i>
            <div style="margin: 10px 0 10px 30px">
              <span>{{ item.receiveName }}</span>
              <span style="margin-left: 15px">{{ item.tel }}</span>
              <span
                style="margin-left: 15px"
                class="default_item"
                v-show="item.main"
                >默认</span
              >
            </div>
            <div class="locations">
              {{ item.province }}{{ item.city }}{{ item.county
              }}{{ item.locationAddr }}({{ item.xiaoquName }}){{
                item.detailAddress
              }}
            </div>
          </div>
          <div class="tc mt2">
            <!-- <div class="addr_btn_plain" @click="toAddAddress">新增收货地址</div> -->
            <br />
          </div>
        </div>

        <div v-show="showz">
          <div v-show="currentPage == 'xinzen'">
            <div class="input-wrap lite-divider">
              <span class="fl fs15">联系人</span>
              <input
                placeholder="请输入联系人姓名"
                class="fr fs14 hidden-input"
                v-model="submitAddress.receiveName"
              />
            </div>
            <div class="input-wrap lite-divider">
              <span class="fl fs15">手机号</span>
              <input
                type="tel"
                placeholder="请输入手机号码"
                class="fr fs14 hidden-input"
                v-model="submitAddress.tel"
              />
            </div>
            <div @click="showRegion" class="input-wrap lite-divider menu-link">
              <span class="fl fs15" style="color: #3b3937">所在地区</span>
              <!-- -->
              <span class="fr fs14" style="color: #aeaeae" v-if="!distinct"
                >请选择所在地区</span
              >
              <span class="fr fs14" v-if="distinct">{{ distinct }}</span>
            </div>
            <!-- 选择省  市 县-->
            <div v-if="selectRegion == true">
              <div class="tc">
                <div
                  class="region fl"
                  :class="{ check: currentRegionType == 1 }"
                  @click="backRegion(1)"
                >
                  选择省
                </div>
                <div
                  class="region fl"
                  :class="{ check: currentRegionType == 2 }"
                  @click="backRegion(2)"
                >
                  市
                </div>
                <div
                  class="region fl"
                  :class="{ check: currentRegionType == 3 }"
                >
                  区县
                </div>
              </div>
              <div
                style="
                  width: 100%;
                  clear: both;
                  background-color: #e0dede;
                  overflow: hidden;
                "
              >
                <div
                  v-for="(region, i) in regions"
                  :key="region.id"
                  :class="{
                    city: Math.floor((i / 4) % 2) == 0,
                    city2: Math.floor((i / 4) % 2) == 1,
                  }"
                  class="fs14 fl"
                  @click="updateRegion(region)"
                >
                  {{ region.name }}
                </div>
              </div>
              <div>&nbsp;</div>
            </div>
            <div style="clear: both" v-if="selectRegion == false">
              <div
                class="input-wrap lite-divider menu-link"
                @click="showLocation"
              >
                <span class="fl fs15">小区或大厦</span>
                <span
                  class="fr fs14"
                  style="color: #aeaeae"
                  v-if="submitAddress.xiaoquName == ''"
                  >请输入小区或大厦</span
                >
                <span class="fr fs14" v-if="submitAddress.xiaoquName">{{
                  submitAddress.xiaoquName
                }}</span>
              </div>
              <div class="input-wrap lite-divider">
                <span class="fl fs15">小区地址</span>
                <input
                  placeholder="例如：三林路128弄"
                  class="fr fs14 hidden-input"
                  v-model="submitAddress.amapDetailAddr"
                />
              </div>
              <div class="input-wrap lite-divider">
                <span class="fl fs15">楼栋门牌号</span>
                <input
                  placeholder="例如：1号楼402室"
                  class="fr fs14 hidden-input"
                  v-model="submitAddress.homeAddress"
                />
              </div>
              <div class="addr_btn" @click="addAddressa()">保存</div>
              <div class="addr_btn" @click="showpage()">返回列表</div>
            </div>
          </div>
        </div>
        <!--	使用高德地图搜索-->
        <div style="background-color: #fffff8" v-if="currentPage == 'location'">
          <div class="location-wrap">
            <div class="location-input-wrap">
              <div class="location-i">
                <input
                  placeholder="请输入小区名称"
                  class="location-input"
                  v-model="suggestLocation"
                />
              </div>
              <i
                class="location-btn-cancel"
                @click="cancelLocation"
                v-if="suggestLocation"
              ></i>
            </div>
            <span class="location-btn-ensure" @click="submitLocation"
              >确定</span
            >
          </div>
          <div class="location-empty-tip" v-if="!suggestions.length">
            准确的小区、街道或大厦名称能加快送货速度
          </div>
          <div v-if="suggestions.length">
                <div
                    class="location-location"
                    @click="chooseLocation(suggestion)"
                    v-for="suggestion in suggestions"
                    :key="suggestion.id"
                >
                    <span
                    style="position: relative; font-color: #cccccc; font-size: 16px"
                    >{{ suggestion._name }} - {{ suggestion._address }}</span
                    >
                </div>
           </div>
        </div>
      </div>
      <!-- 主页面 -->
      <div class="zhi" v-show="shouyin">
        <div>
          <div
            @click="gotosgrouprulr"
            :class="{ rule_intro: searchBarFixed }"
            v-show="type == 4"
            style="width: 100%"
            id="searchBar"
          >
            <img
              alt=""
              src="../../assets/images/index/img_tuangou_zhifu.png"
              style="100%"
            />
          </div>
        </div>
        <div style="background: white; height: 15px; width: 100%">&nbsp;</div>
        <!-- 新增地址 -->
        <div class="addr_area" >
          <div class="addr-top">&nbsp;</div>
          <div style="text-align: center; background-color: #f7f7f1">
            <a
              href="javascript:void(0);"
              class="btn-plain add_btn_style"
              v-show="!checkedAddress.receiveName"
              style=""
              >暂无收货地址</a
            >
          </div>

          <a
            href="javascript:void(0);"
            class="menu-link fs14 addr_detail"
            v-show="checkedAddress.receiveName"
          >
            <span style="color: #3b3937" id="infoname">付款人：</span>
            <span style="color: #3b3937" id="infoname">{{
              checkedAddress.receiveName
            }}</span>
            <span style="margin-left: 15px; color: #3b3937" id="infotel">{{
              checkedAddress.tel
            }}</span>
            <div class="addr_location" id="infoaddr">
              {{ checkedAddress.province }}{{ checkedAddress.city
              }}{{ checkedAddress.county }}（{{ checkedAddress.xiaoquName }}）{{
                checkedAddress.detailAddress
              }}
            </div>
          </a>
          <div class="addr-f">&nbsp;</div>
        </div>

        <div class="product_detail">
          <img class="product_picture" :src="product.smallPicture" />
          <div class="product_content">
            <div class="product_name">{{ product.name }}</div>
            <div class="product_pri_area">
              <div class="fl fs16 highlight pt5">¥{{ rule.price }}</div>
              <div
                class="fl fs13"
                style="margin-left: 10px; padding-top: 7px; color: #888888"
              >
                <del>¥{{ product.oriPrice }}</del>
              </div>
              <div class="fr fs13" style="padding-top: 7px; color: #888888">
                X {{ count }}
              </div>
            </div>
          </div>
        </div>

        <div class="line p15 fs15">
          <span>商品价格</span>
          <span class="fr highlight">¥&nbsp;{{ productAmount }}</span>
        </div>

        <div class="line fs15" style="height: 50px; line-height: 50px">
          <span>购买数量</span>
          <span class="fr">
            <span
              class="sbtn btn-minus minus-btn-size"
              :class="{ active: count > 1 }"
              @click="minusCount"
            ></span>
            <span class="number fs16">{{ count }}</span>
            <span
              class="sbtn btn-add active minus-btn-size"
              @click="addCount"
            ></span>
          </span>
        </div>

        <div class="line p15 fs15" style="height: 20px">
          <span class="fl">快递费</span>
          <span class="fl baoyou_desc" v-show="rule.freeShippingNum < 999"
            >&nbsp;&nbsp;{{ rule.freeShippingNum }}件包邮</span
          >
          <span class="fr" v-show="postFee != 0">
            ¥&nbsp;{{ rule.postageFee }}</span
          >
          <span class="fr" v-show="postFee == 0"
            ><del> ¥&nbsp;{{ rule.postageFee }}</del></span
          >
        </div>

        <div class="line" style="height: 30px; line-height: 30px;">
          <span class="fl">
            <span class="total fs15">商品总额</span>
            <span class="fs10">共{{ count }}个商品</span>
          </span>
          <span class="fs20 fr" style="margin-right: 5px"
            >¥&nbsp;{{ amount }}</span
          >
        </div>
        
        <div class="addr_area" v-if="checkedAddress.id!=0 && areaItem.areaLeader">
            <div class="addr-top">&nbsp;</div>
            <div class="addr_detail">
              <span style="color: #3b3937" id="infoname">发货人：</span>
              <span style="color: #3b3937" id="infoname">{{areaItem.areaLeader}}</span>
              <span style="margin-left: 15px; color: #3b3937" id="infotel">{{areaItem.areaLeaderTel}}</span>
              <div class="addr_location" id="infoaddr">
                  {{areaItem.areaLeaderAddr}}
              </div>
            
            </div>
            <div class="addr-f">&nbsp;</div>
        </div>
        <!-- <div class="info-wrap bgwhite">
          <div class="section-title">收货时间</div>
          <a
            href="javascript:void(0)"
            class="menu-link custom-menu-link fs14"
            style="height: 30px"
            @click="showModal"
          >
            <i class="address_icon time-icon fl"></i>{{ datechoooser.time }}</a
          >
        </div> -->

        <div class="bgwhite">
          <div class="fs15" style="height: 30px; padding: 15px 0 5px 15px">
            备注
          </div>
          <div
            contenteditable
            ref="bgbei"
            class="content p15"
            @click="focus"
            @blur="storeMemo"
            style="font-size: 15px"
          ></div>
          <div style="height: 80px; position: relative">&nbsp;</div>
        </div>

        <div class="btn-fixed">
          <div class="btn" @click="pay">立即微信支付</div>
        </div>

        <div class="vue-popup">
            <div class="mask" v-show="Mask"></div>
            <transition name="slide">
                <div class="popup-content" v-show="Mask" >
                      <span class="close" @click="showclose()">×</span>
                      <div class="proup" >
                          <div>
                            <span class="fs3">¥ </span><span class="fs4 fs4w">{{totalAmount}}</span>
                          </div>
                          <div class="couponitem">
                                <span class="fl">订单金额</span>
                                <span class="fr">¥{{totaltam}}</span>
                          </div>
                          <div class="couponitem" @click="showCoupons()">
                              <div class="fl">
                                  <span>优惠券</span>
                                  <span class=" baoyou_desc">&nbsp;&nbsp;{{ couponNum }}张可用</span>
                              </div>
                              <div class="fr">
                                  <span>{{couponDesc}}</span>
                              </div>
                          </div>
                          <div class="btn1 btn2" @click="onlinePay" >立即支付</div>
                      </div>
                </div>
            </transition>
        </div>

        <div
          class="modal-mask"
          v-show="datechoooser.modalShown"
          @click="hideModal"
        >
          <div class="modal">
            <div
              class="ptb15 lite-divider"
              v-for="(item, i) in datechoooser.timePicker"
              :key="i"
              :class="{ checkedItem: item.checked }"
              @click="selectTime(i)"
            >
              {{ item.name }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
let vm;
import wx from "weixin-js-sdk";
import cookie from "js-cookie";
export default {
  data() {
    return {
      Mask:this.$route.query.Mask||false,//显示支付
      searchBarFixed: false,
      currentPage: "xinzen",
      zzshow: false,
      shouyin: true,
      ruleId: this.$route.query.ruleId,
      type: this.$route.query.type /**3默认特卖*/,
      product: {},
      rule: { limitNumOnce: 10, price: 0 },
      areaItem: {},
      address: {},
      checkedAddress: {},
      count: 1, //数量
      productAmount: 0, //商品价格
      postFee: 0, // 是否包邮
      amount: 0, //总价格
      couponNum: 0,
      coupon: null,
      couponDesc: '不使用',
      coupons:[],//优惠券
      couponid:this.$route.query.couponid,
      totalAmount: 0,
      totaltam:0,
      totalprice:0,
      suspend:this.$route.query.suspend,
      order: {},
      receiveTimeType: 2,
      //备注
      comment: "",
      //送货事件
      datechoooser: {
        time: "任何时间",
        comment: "",
        timePicker: [
          {
            name: "工作日",
            value: 0,
            checked: false,
          },
          {
            name: "节假日",
            value: 1,
            checked: false,
          },
          {
            name: "任何时间",
            value: 2,
            checked: true,
          },
        ],
        modalShown: false,
      },
      //地址参数
      showd: false,
      addresses: [],
      showm: false,
      regions: [], //获取区域
      provinces: [],
      citys: [],
      countys: [],
      submitAddress: {
        receiveName: "", //联系人
        tel: "", //手机
        provinceId: 0,
        province: "", //省
        cityId: 0,
        city: "", //市
        countyId: 0,
        county: "", //县
        xiaoquName: "", //小区
        amapId: 0,
        amapDetailAddr: "", //小区地址 例如：三林路128弄"
        homeAddress: "", //例如：1号楼402室
      },
      selectRegion: false,
      currentRegionType: 1,
      distinct: "",

      showz: false,
      suggestLocation: "", //小区名
      suggestion: {},
      suggestions: [],
      paying: false, //支付限制
    };
  },
  watch: {
    suggestLocation(vn, vw) {
      if (
        vm.suggestLocation != vm.suggestion._name &&
        vm.suggestLocation.length >= 2
      ) {
        vm.getSuggestion();
      }
    },
    },
  created() {
    vm = this;
  },
  mounted() {
    // this.initSession4Test();
    vm.roady();
    this.dataAddress();
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  components: {
    
  },
  methods: {
    //滚动固定顶部
    handleScroll() {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      var offsetTop = document.querySelector("#searchBar").offsetTop;
      if (scrollTop > offsetTop) {
        vm.searchBarFixed = true;
      } else {
        vm.searchBarFixed = false;
      }
    },
    roady() {
      if (vm.ruleId && vm.type) {
        vm.queryBuyInfo();
      }
    },
    //团购规则
    gotosgrouprulr() {
      vm.$router.push({ path: "/sgrouprule" });
    },
    //模仿线上用户信息
    initSession4Test() {
      let url = "/login/8427?code=8427";
      var data = {
        'oriApp':'wx95f46f41ca5e570e'
      }
      vm.receiveData.postData(vm, url,data,"res",function () {});
    },
    queryBuyInfo() {
      vm.receiveData.getData(
        vm,
        "/queryBuyInfo/" + vm.type + "/" + vm.ruleId,
        "res",
        function () {
          if (vm.res.success) {
            vm.product = vm.res.result.product;
            vm.rule = vm.res.result.rule;
            vm.areaItem = vm.res.result.rgroupAreaItem;
            vm.checkedAddress = vm.res.result.address;
            vm.issuspend();
            vm.queryCoupon();
            vm.computeAmount();
          } else {
            alert("订单处理中，请稍后再试！");
          }
        }
      );
    },
    // 优惠券
    queryCoupon() {
       var data = {
                salePlanType:vm.type,
                itemList: [
                    {
                        ruleId:vm.ruleId,
                        count:vm.count
                    }
                ]
        }
        vm.receiveData.postData(vm,'/coupon/valid',data,'res',function() {
               if(vm.res.success) {
                  if(vm.res.result != null) {
                      vm.coupons=vm.res.result;
                      vm.couponNum=vm.coupons.length;//可有优惠券数量
                      if(vm.suspend == 1){
                        if(vm.couponid == '') {
                           vm.couponid = undefined;  
                        }
                      }else {
                        vm.coupon=vm.coupons[0];
                        vm.couponid = vm.coupon.id;
                      }
                      vm.computeAmount();
                  }
               }else {
                   alert(vm.res.message);
               }
           
           })
        },
   
    //减
    minusCount() {
      vm.count > 1 && --vm.count && vm.computeAmount();
    },
    //加
    addCount() {
      if (vm.count < vm.rule.limitNumOnce) {
        vm.count++;
        vm.computeAmount();
      } else {
        alert("数量限购" + vm.rule.limitNumOnce + "件");
      }
    },
    issuspend() {
      if(vm.suspend == 1) {
          vm.totalprice = this.$route.query.totalprice
          vm.count=this.$route.query.counts;
          vm.Mask = true;
      }
    },
    //计算价格
    computeAmount() {
      var pa, pf, a, ta;
      pa = vm.rule.price * vm.count;
      pf = vm.count < vm.rule.freeShippingNum ? vm.rule.postageFee : 0;
      a = pa + pf;
      vm.totaltam = a;
      //使用优惠券计算金额
      if(vm.couponid != undefined) {
          for(var i=0;i<vm.coupons.length;i++){
              if(vm.couponid == vm.coupons[i].id) {
                  vm.coupon = vm.coupons[i];
              }
          }
      }
     //  console.log(111,vm.coupon);

      if (vm.coupon != null) {
          if(vm.coupon.usageCondition ==null || vm.coupon.usageCondition > a) {
              alert('当前优惠券不可用');
              vm.coupon = null;  
          }else {
              vm.couponDesc = '-¥ '+vm.coupon.amount;
          }
      }

      if (vm.coupon == null) {
        ta = a;
      }else if (vm.coupon.amount > 0) {
        ta = a - vm.coupon.amount;
      }

      vm.productAmount = pa.toFixed(2);
      vm.postFee = pf.toFixed(2);
      vm.amount = a.toFixed(2);
      if (ta > 0) {
        vm.totalAmount = ta.toFixed(2);
      } else {
        vm.totalAmount = "0.01";
      }
    },
    showclose() {
      vm.Mask = false;
      // setTimeout(()=>{
      //   vm.$router.push({path:'/buy',
      //   query:{
      //     type:vm.type,
      //     ruleId:vm.ruleId,
      //     }});
      //   this.$router.go(0);
      // },150)
    },
    //点击优惠券
    showCoupons() {
      if(vm.coupons.length != 0 && vm.coupons != null) {
          vm.$router.push({
            path: "/coupon",
            query: {
              type: vm.type,
              ruleId: vm.ruleId,
              count:vm.count,
              totalAmount :vm.totalAmount,
              couponid:vm.couponid
            },
          });
      }
    },

    //备注
    focus() {},
    storeMemo() {
      vm.comment = vm.$refs.bgbei.innerHTML;
    },
    //点击收货时间
    showModal() {
      vm.datechoooser.modalShown = true;
    },
    //选择日期
    hideModal(e) {
      // console.log(e.target.className)
      if ("ptb15 lite-divider" === e.target.className) {
        vm.datechoooser.modalShown = false;
      }
    },
    selectTime(i) {
      for (var d = 0; d < vm.datechoooser.timePicker.length; d++) {
        vm.datechoooser.timePicker[d].checked = false;
      }
      vm.datechoooser.timePicker[i].checked = true;
      vm.datechoooser.time = vm.datechoooser.timePicker[i].name;
      vm.receiveTimeType = vm.datechoooser.timePicker[i].value;
      vm.datechoooser.modalShown = false;
    },
    //新增地址
    //初始地址
    dataAddress() {
      vm.receiveData.getData(vm, "/addresses?module=rgroup", "data", function () {
        if (vm.data.success) {
          vm.addresses = vm.data.result;
          vm.showm = true;
        } else {
          alert("获取地址信息失败！");
          vm.addresses = [];
          vm.showm = false;
        }
      });
    },
    //点击所在地区
    showRegion() {
      vm.selectRegion = !vm.selectRegion;
      if (vm.selectRegion) {
        vm.changeRegionView();
      }
    },
    backRegion(a) {
      vm.getRegions(a, 1);
    },
    backRegion(b) {
      vm.getRegions(b, vm.submitAddress.provinceId);
    },
    updateRegion(region) {
      vm.changeRegionView(region.regionType, region.id, region.name);
    },
    changeRegionView(regionType, regionId, regionNam) {
      if (!regionType) {
        if (vm.provinces.length == 0) {
          vm.getRegions(1, 1);
        } else {
          vm.regions = vm.provinces;
        }
      } else {
        if (regionType == 1) {
          if (vm.submitAddress.provinceId != regionId || vm.citys.length == 0) {
            vm.getRegions(2, regionId);
          } else {
            vm.regions = vm.citys;
          }
          vm.submitAddress.province = regionNam; //省
          vm.submitAddress.provinceId = regionId; //ID
          // console.log(vm.submitAddress.province, vm.submitAddress.provinceId )
          vm.currentRegionType = 2;
        } else if (regionType == 2) {
          if (vm.submitAddress.cityId != regionId || vm.countys.length == 0) {
            vm.getRegions(3, regionId);
          } else {
            vm.regions = vm.countys;
          }
          vm.submitAddress.city = regionNam; //市
          vm.submitAddress.cityId = regionId;
          // console.log(vm.submitAddress.city,vm.submitAddress.cityId)
          vm.currentRegionType = 3;
        } else if (regionType == 3) {
          vm.submitAddress.county = regionNam;
          vm.submitAddress.countyId = regionId;
          vm.distinct =
            vm.submitAddress.province +
            vm.submitAddress.city +
            vm.submitAddress.county;
          vm.selectRegion = false;
        }
      }
    },
    //获取区域
    getRegions(type, id) {
      vm.currentRegionType = type;
      vm.receiveData.getData(
        vm,
        "/regions/" + type + "/" + id,
        "data",
        function () {
          if (vm.data.success) {
            vm.regions = vm.data.result;
          } else {
            alert("获取区域信息失败，请稍后重试！");
          }
        }
      );
    },
    //选择小区
    showLocation() {
      if (
        vm.submitAddress.city == "" ||
        vm.submitAddress.county == "" ||
        vm.submitAddress.province == ""
      ) {
        alert("请先选择你所在的区域");
      } else {
        vm.suggestions = [];
        vm.currentPage = "location";
      }
    },
    //小区数据
    getSuggestion() {
      vm.receiveData.getData(
        vm,
        "amap/" + vm.submitAddress.city + "/" + vm.suggestLocation,
        "data",
        function () {
          if (vm.data.success) {
            vm.suggestions = vm.data.result;
          } else {
            vm.suggestions = [];
          }
        }
      );
    },
    //点击叉叉
    cancelLocation() {
      vm.suggestLocation = "";
      vm.currentPage = "xinzen";
    },
    //点击确定
    submitLocation() {
      vm.submitAddress.xiaoquName = vm.suggestLocation;
      vm.submitAddress.amapId = vm.suggestion._id;
      vm.submitAddress.amapDetailAddr = vm.suggestion.detailaddress;
      vm.currentPage = "xinzen";
    },
    //选中小区地址
    chooseLocation(suggestion) {
      vm.suggestion = suggestion;
      vm.suggestLocation = suggestion._name;
      vm.suggestions = [];
    },
    showAddress() {
      //隐藏主页面
      vm.shouyin = false;
      vm.showd = true;
      vm.showm = true;
    },
    checks(address) {
      vm.checkedAddress = address;
      vm.shouyin = true;
      vm.showd = false;
    },
    //点击新增 显示添加地址样式
    toAddAddress() {
      vm.showm = false;
      vm.showz = true;
      vm.submitAddress = {
        receiveName: "", //联系人
        tel: "", //手机
        provinceId: 0,
        province: "", //省
        cityId: 0,
        city: "", //市
        countyId: 0,
        county: "", //县
        xiaoquName: "", //小区
        amapId: 0,
        amapDetailAddr: "", //小区地址 例如：三林路128弄"
        homeAddress: "", //例如：1号楼402室
      };
      vm.distinct = "";
      vm.suggestLocation = "";
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
      addr.countyId = vm.submitAddress.countyId;
      addr.county = vm.submitAddress.county;
      addr.xiaoquName = vm.submitAddress.xiaoquName;
      addr.detailAddress =
        vm.submitAddress.amapDetailAddr + vm.submitAddress.homeAddress;
      addr.amapDetailAddr = vm.submitAddress.amapDetailAddr;
      addr.amapId = vm.submitAddress.amapId;
      addr.main = vm.isDefault;
      vm.zzshow = true;
      vm.receiveData.postData(vm, "/addAddress", addr, "n", function () {
        if (vm.n.success) {
          vm.addresses.push(vm.n.result);
          vm.checkedAddress = vm.n.result;
          vm.zzshow = false;
          vm.showz = false;
          if (!vm.showz) {
            vm.shouyin = true;
          }
        } else {
          alert(vm.n.message == null ? "地址保存失败，请重试！" : vm.n.message);
        }
        $("#zzmb").hide();
      });
    },
    //保存
    addAddressa() {
      if (
        vm.submitAddress.province == "" ||
        vm.submitAddress.city == "" ||
        vm.submitAddress.county == ""
      ) {
        alert("请选择地址！");
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
    //返回列表
    showpage() {
      vm.showm = true;
      vm.showz = false;
    },
    pay() {
      vm.Mask = true;
    },//显示支付

    onlinePay() {
      if (this.checkedAddress && this.checkedAddress.id == 0) {
        alert("您暂未绑定房屋，点击确定后进行绑定房屋操作。");
        location.href =
          vm.basePageUrl +
          "wuye/index.html?" +
          vm.common.getoriApp() +
          "#/myhouse?ruleId="+this.ruleId;
        return false;
      }
      if (vm.paying) {
        alert("订单处理中，请勿重复提交！");
        return;
      }
      vm.paying = true;
      vm.zzshow = true;
      var order = {
        orderType: "4", //特卖3，团购4
        productId: vm.product.id,
        ruleId: vm.rule.id,
        count: vm.count,
        serviceAddressId: vm.checkedAddress.id,
        memo: vm.comment,
        receiveTimeType: vm.receiveTimeType,
        payType: 2,
      };
      if (vm.coupon != null) {
        order.couponId = vm.coupon.id;
      }
      if (vm.checkedAddress.id == undefined || vm.checkedAddress.id == 0) {
        alert("请选择地址！");
        return;
      }
      vm.createOrder(order);
    },
    createOrder(order) {
      if (vm.order != {} && vm.order.id > 0) {
        vm.requestPay();
        return;
      }
      vm.receiveData.postData(vm, "/createOrder", order, "n", function () {
        if (vm.n.success) {
          vm.order = vm.n.result;
          vm.requestPay();
        } else {
          alert(
            vm.n.message == null ? "订单创建失败，请稍后重试！" : vm.n.message
          );
          vm.paying = false;
          vm.zzshow = false;
        }
      });
    },
    requestPay() {
      vm.receiveData.getData(
        vm,
        "/requestPay/" + vm.order.id,
        "n",
        function () {
          if (vm.n.success) {
            wx.config({
              debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
              appId: vm.n.result.appId, // 必填，公众号的唯一标识
              timestamp: vm.n.result.timestamp, // 必填，生成签名的时间戳
              nonceStr: vm.n.result.nonceStr, // 必填，生成签名的随机串
              signature: vm.n.result.signature, // 必填，签名，见附录1
              jsApiList: ["chooseWXPay"], // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });
            wx.chooseWXPay({
              appId: vm.n.result.appId,
              timestamp: vm.n.result.timestamp,
              nonceStr: vm.n.result.nonceStr,
              package: vm.n.result.pkgStr,
              signType: vm.n.result.signType,
              paySign: vm.n.result.signature,
              success: function (res) {
                console.log(res)
                // 支付成功后的回调函数
                vm.zzshow = false;
                vm.$router.push({
                  path: "/success",
                  query: { orderId: vm.order.id, type: vm.type },
                });
                alert("下单成功！");
              },
              fail: function (res) {
                vm.zzshow = false;
                console.log(JSON.stringify(res));
              },
              cancel: function (res) {
                alert("支付取消");
                vm.zzshow = false;
                vm.paying = false;
              },
            });  
          } else {
            if (vm.n.message != null) {
              alert(vm.n.message);
              vm.zzshow = false;
              vm.paying = false;
            }
          }
        }
      );
    },
  },

  computed: {},
};
</script>

<style  scoped>
.leader {
  height: 30px;
  line-height: 30px;
  width: 100%;
}
.leader-addr {
  height: 90px;
  line-height: 20px;
  width: 100%;
}
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
  background: #f7f7f1;
}
.rule_intro {
  position: fixed;
  top: 0;
  z-index: 10;
}
img {
  max-width: 100%;
  height: auto;
}
.addr_area {
  background: #f7f7f1;
}
.addr-top {
  background: url(../../assets/images/img/bg_line_location_top.png) repeat-x;
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
  background: url(../../assets/images/group/icon_arrow.png) no-repeat;
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
  background: url(../../assets/images/img/bg_line_location_bottom.png) repeat-x;
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
  font-size: 16px;
  color: #3b3937;
  line-height: 20px;
  height: 40px;
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
  background-image: url(../../assets/images/group/btn_reduce_disable.png);
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
  background-image: url(../../assets/images/group/btn_add.png);
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
  background: url(../../assets/images/group/icon_arrow.png) no-repeat;
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
.section-title,
.lite-divider {
  border-bottom: 1px solid #d4cfc8;
  padding-left: 15px;
}
.title,
.section-title {
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
  background: url(../../assets/images/group/icon_arrow.png) no-repeat;
  background-size: 7px 12px;
  background-position: right center;
  padding-right: 15px;
}
.fs14 {
  font-size: 14px;
}
.time-icon {
  background-image: url(../../assets/images/group/icon_time_gray.png);
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
  color: #fff !important;
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
  background: rgba(0, 0, 0, 0.5);
}
.modal {
  background: #fff;
  border-radius: 5px;
  margin: 200px auto;
  padding: 10px 15px;
  width: 60%;
}

.ptb15 {
  padding: 15px 0;
}
.checkedItem {
  background: url(../../assets/images/group/icon_selected.png) no-repeat;
  background-position: right center;
  background-size: 16px;
}

/* 新增地址样式 */
.diz {
  padding: 10px;
  font-size: 14px;
  background: white;
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
  background: url(../../assets/images/group/icon_arrow.png) no-repeat;
  background-size: 7px 12px;
  background-position: right center;
  padding-right: 15px;
}

.mt1s {
  margin-top: 30px;
}
.fs14s {
  font-size: 14px;
}

.checkboxs.checkeds {
  background-image: url(../../assets/images/group/icon_selected.png);
}
.checkboxs {
  float: left;
  display: inline-block;
  width: 16px;
  height: 16px;
  background: url(../../assets/images/group/icon_unselect.png) no-repeat;
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
  background: url(../../assets/images/group/icon_arrow.png) no-repeat;
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
  height: 0.8rem;
  line-height: 0.8rem;
}

.location-wrap {
  position: relative;
  height: 49px;
  line-height: 49px;
  border-bottom: 1px solid #d4cfc8;
}

.location-input-wrap {
  position: relative;
  padding: 5px 10px;
  margin-right: 80px;
  border: none;
  left: 0px;
}
.location-i {
  padding-right: 30px;
  border-radius: 4px;
  border: 1px solid #d4cfc8;
}
.location-input {
  display: block;
  height: 36px;
  width: 100%;
  outline: none;
  border: none;
  vertical-align: middle;
  font-size: 15px;
}

.location-btn-cancel {
  position: absolute;
  top: 6px;
  right: 10px;
  display: inline-block;
  height: 36px;
  width: 30px;
  background: url(../../assets/images/group/icon_cancel.png) no-repeat;
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
.default_item {
  color: #ff7e00;
  border: 1px solid #ff7e00;
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

.addr_btn {
  color: white;
  background: #ff7e00;
  bottom: 4px;
  width: 93%;
  margin-left: 2%;
  height: 30px;
  line-height: 30px;
  text-align: center;
  padding: 4px 0;
  font-size: 18px;
  border-radius: 6px;
  margin-top: 20px;
}
/* 优惠券 */
.couponitem {
  padding:10px 0;
  background-color:#fff;
  overflow: hidden;
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
.proup {
    position: absolute;
    top: 0;
    width: 100%;
    bottom: 0;
    opacity: 1;
    background-color: #fff;
    padding: 7%;
    padding-bottom:0;
    box-sizing: border-box;
    z-index: 9999;
    text-align: center;
}
.fs3 {
  font-size: 0.3rem;
}
.fs4 {
  font-size: 0.4rem;
}
.fs4w {
  font-weight: 600;
}
/* 按钮 */
.btn2 {
  display: block;
  margin: 10px;
  height: 44px;
  line-height: 44px;
  color: #fff !important;
  font-size: 15px;
  text-align: center;
  background-color: #ff8a00;
  border-radius: 3px;
}
.btn1 {
  margin: 0;
  position: absolute;
  width: 88%;
  bottom: 2px;
}
/* 动画 */
.popup-content {
    position: fixed;
    top:40%;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: white;
    -webkit-transition: all 0.2s ease-in;
    transition: all 0.2s ease-in;
}
.close {
    position: absolute;
    top: 0.07rem;
    right: 0.2rem;
    font-size: 0.5rem;
    z-index: 99999;
}
.mask {
    position: fixed;
    width: 100%;
    left: 0;
    top: 0;
    height: 100%;
    background-color:#F3F3F3;
    opacity: 0.55;
    transition: all 0.2s ease-in;
}
.slide-enter-active {
    animation-name: slideInUp;
    animation-duration: 0.2s;
    animation-fill-mode: both;
}
.slide-leave-active {
    animation-name: slideOutDown;
    animation-duration: 0.2s;
    animation-fill-mode: both;
}
@keyframes slideInUp {
    0% {
        transform: translate3d(0, 100%, 0);
        visibility: visible;
    }

    to {
        transform: translateZ(0);
    }
}
@keyframes slideOutDown {
    0% {
        transform: translateZ(0);
    }

    to {
        visibility: hidden;
        transform: translate3d(0, 100%, 0);
    }
}
.delay-leave-active {
    -webkit-animation-delay: 0.2s;
    -moz-animation-delay: 0.2s;
    -o-animation-delay: 0.2s;
    animation-delay: 0.2s;
}
</style>
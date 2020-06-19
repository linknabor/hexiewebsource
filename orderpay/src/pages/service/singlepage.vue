<template>
  <div class="singlepage">
  <div id="zzmb"  class="zzmb" ></div>
  <div v-show="page =='main'">  
    <div class="topLine">
      <div class="fl single-img">
        <img src="../../assets/images/fu.png" alt />
      </div>
      <div class="fl">
        <span>{{service_order.service_title}}</span>
      </div>
      <div class="fr" v-show="!(service_order.price == 0)">
        <span>¥{{service_order.price}}</span>
      </div>
    </div>

    <div class="addr_area" @click="choseAddress">
        <div class="addrtop">&nbsp;</div>
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
    <!-- -------- -->
    <div>
      <div class="single-wt">具体描述</div>
      <div class="single-content">
        <textarea class="single-text" @blur="fixScroll" placeholder="输入具体内容..." v-model="memo"></textarea>
      </div>
    </div>
    <!-- <div class="single-wt">上传图片</div>
    <div class="pdr2">
      <div id="pic" class="pic_frame"></div>
      <div>
        <div id="add" @click="addPic" class="add-pic-bg fl"></div>
      </div>
      <div class="clear"></div>
    </div> -->
    <div style="width: 100%;height: 80px;"></div>
    <div class="btn-fixed">
            <div class="btn" @click="determine()">确定</div>
    </div>
  </div>
        <!-- 选择地址 -->
  <div  class="addrlist" v-show ="page == 'list'">
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
      >{{item.province}}{{item.city}}{{item.county}}{{item.xiaoquName}}){{item.detailAddress}}</div>
    </div>
  </div>  
  </div>
</template>

<script>
let vm;
import wx from "weixin-js-sdk";
import cookie  from 'js-cookie';
export default {
  data() {
    return {
      memo:'',//具体内容
      localIdsid:"",
      uploadPicId:"",
      service_order:JSON.parse(window.localStorage.getItem('service_order')),
      address: {}, //报修地址
      addrd:'',
      addresses: [],
      page:'main'
    };
  },
  created() {
    vm = this;
    let url = location.href.split('#')[0];
    vm.receiveData.wxconfig(vm,wx,['chooseImage','previewImage','uploadImage','downloadImage'],url);
  },
  components: {},
  computed: {},
  mounted() {
    vm.initInfo();
  },
  methods: {
    //初始地址
    initInfo() {
      let url = 'repair/project/1';
      vm.receiveData.getData(vm, url, "res", function() {
      if (vm.res.success) {
        if (vm.res.result.address) {
          vm.address = vm.res.result.address;
        }
      } else {
        alert(vm.res.message == null ? "请稍后重试！" : vm.res.message);
      }
     });
    },
    //地址切换
    choseAddress(){
      vm.page = 'list';
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
    //ios中留白问题
    fixScroll() {
      let u = navigator.userAgent;
      let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if (isiOS) {
        window.scrollTo(0, 0);
      }
    },
 

    //点击添加上传图片
    addPic() {
        wx.chooseImage({
            count:6,//默认9
            sizeType:['compressed'],// 可以指定是原图还是压缩图，默认二者都有
            sourceType:['album','camera'],//可以指定来源是相册还是相机，默认两者都有
            success:function(res) {
                var localIds = res.localIds;//返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                vm.localIdsid=res.localIds;//保存起来
                var html = "";
                var pic_length = $("[name='pice']").length;
                if( pic_length+localIds.length > 6) {
                    alert("所选图片超过6张");
                    return;
                }
                var i = 0;
                if(window._wxjs_is_wkwebview) {
                    function addimage(i) {
                        wx.getLocalImgData({
                            localId: localIds[i],
                            success: function(res) {
                                localData = localData.replace('jgp','jpeg');
                                html = "<div name='pics' class=\"fl\" style=\"margin-right:5px;\"><img src=\""+localData+"\" id =\""+vm.localIdsid[i]+"\" style=\"height:100px;width:90px;\"/></div>"
                                $('#pic').append(html);
                                i++;
                                if(i < localIds.length) {
                                    addimage(i);
                                }
                            },
                            fail:function(res) {
                                alert(res);
                            }
                        })
                    }
                    addimage(i)
                }else {
                    for(var i=0;i<localIds.length;i++){
                      html = "<div name='pics' class=\"fl\" style=\"margin-right:5px;\"><img src=\""+localIds[i]+"\"  id=\""+localIds[i]+"\" style=\"height:100px;width:90px;\"/></div>"
                      $("#pic").append(html);
                    }    
                }
                if(pic_length+localIds.length >= 6) {
                    $("#add").hide();
                }
            },
            fail:function(err) {
                alert(err);
            }
        });
    },
    //上传图片到微信
    loadToWechat() { 
        var i = 0;
        var pics = $("[name='pice']");
        function upload() {
            var img = pics.eq(i).find("img");
            var id = img.attr("id");
            setTimeout(function(){
                wx.uploadImage({
                    localId:id,// 需要上传的图片的本地ID，由chooseImage接口获得
                    isShowProgressTips:1, //默认为1，显示进度提升
                    success:function(res) {
                        var serverId = res.serverId;//返回图片的服务器端ID
                        vm.uploadPicId+=serverId+",";
                        i++;
                        if(i<pics.length) {
                            upload();
                        }else if(i == pics.length){
                            vm.payMent()
                        }
                    }
                })
            },50)
        }
        upload();
    },
    //点击确定
    determine() {
      if(vm.memo==''){
        alert('描述内容不能为空');return;
      }
      // var pic_length = $("[name='pics']").length;
      // if(pic_length>0){
      //     vm.uploadToWechat();
      // }else {
          vm.payMent();
      // }
    },
    //支付
    payMent(){
      $("#zzmb").show();
      //拼接地址
      vm.addrd = vm.address.province+''+vm.address.city+''+vm.address.county+''+vm.address.xiaoquName+''+vm.address.detailAddress;
      var data = {
        service_id :vm.service_order.service_id,
        service_title :vm.service_order.service_title,
        image :vm.service_order.image,
        link_man :vm.address.receiveName,
        link_tel :vm.address.tel,
        service_addr :vm.addrd,
        tran_amt:vm.service_order.price,
        memo:vm.memo,
        sect_name:vm.address.xiaoquName,
        sect_id:vm.address.xiaoquId
      }
      vm.receiveData.postData(vm, "/customService/order", data, "res", function() {
        if (vm.res.success) {
          if(vm.res.result.package == null){
              vm.$router.push({path:'/checkoutsuccess',query:{'address':vm.addrd,orderId:vm.res.result.orderId}})
          }else {
              wx.config({
                  debug: false,//开启调试模式，调用的所有api的返回值会在客户端alert出来，若要查看查出出入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端是才会打印
                  appId:vm.res.result.appid, //必填，公众号的唯一标识
                  timestamp:vm.res.result.timestamp, //必填，生成签名的时间戳
                  nonceStr:vm.res.result.noncestr, // 必填，生成签名的随机串，
                  signature:vm.res.result.paysign, //必填签名，见附录1
                  jsApiList:["chooseWXPay"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
              });
              wx.chooseWXPay({
                timestamp:vm.res.result.timestamp,
                nonceStr:vm.res.result.noncestr,
                package:vm.res.result.package,
                signType:vm.res.result.signtype,
                paySign:vm.res.result.paysign,
                success:function(res) {
                  alert('支付成功！')
                  $("#zzmb").hide();
                  vm.$router.push({path:'/checkoutsuccess',query:{'address':vm.addrd,orderId:vm.res.result.orderId}});
                },
                fail() {
                  $("#zzmb").hide();
                },
                cancel(){
                  alert('支付取消');
                  $("#zzmb").hide();
                }
              })
          } 
        }else {
            alert(vm.res.message == null ?"支付请求失败，请稍后重试!":vm.res.message);
        }
      });
    }
  }
};
</script>

<style scoped>
.singlepage {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color:#fff;  
}
.zzmb {
  z-index: 100000;
  position: fixed;top: 0;left: 0;
  -moz-opacity: 0.65;opacity: 0.65;
  filter: alpha(opacity=65);
  background: #000;width: 100%;
  height: 100%;
  display: none;
}
/* ------------ */
.addr_area {
  background: #f7f7f1;
}
.addrtop {
  height: 5px;
  background-size: 100% 5px;
  background: url("../../assets/images/icon_address_top_02.png") repeat-x;}
.addrbottom {
  background: url("../../assets/images/icon_address_bottom_04.png") repeat-x;
  height: 5px;
  background-size: 100% 5px;
}
.custom-menu-link {
  background: url("../../assets/images/icon_arrow.png") no-repeat;
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
.addr_location {
  color: #888;
  line-height: 20px;
  margin-top: 6px;
}
.sustoma {
  color: #3b3937;
  display: inline-block;
}  

/* -- */
.topLine {
  margin-top: 0.3rem;
  margin-bottom: 0.2rem;
  padding: 0.2rem 0.3rem;
  background: #fff8ee;
  line-height: 19px;
  border-top: 1px solid #e5e2dd;
  border-bottom: 1px solid #e5e2dd;
  height: 19px;
  font-size: 0.3rem;
  color: #ff8000
}
.single-img {
  width: 0.4rem;
  margin-right: 0.3rem;
}
.single-img img {
  width: 100%;
  vertical-align: bottom;
}
/* ------------------ */
.single-wt {
  padding: 0.25rem 0.2rem;
  font-size: 0.3rem;
}
.single-content {
  margin: 0 0.5rem;
}
.single-text {
  width: 94%;
  height: 100px;
  background: #f9f9f9;
  padding: 3%;
  border: 1px solid #dad7d2;
  outline: none;
  resize: none;
}
/* 选择地址 */
.addrlist {
  padding: 10px;
  font-size: 14px;
  background: white;
}
.fs14s[data-v-6193e9a6] {
  font-size: 14px;
}
.mt1s {
  margin-top: 30px;
}
.menu-links {
  background: url(../../assets/images/icon_arrow.png) no-repeat;
  background-size: 8px 12px;
  background-position: right center;
  margin: 0 15px;
  color: #3b3937;
  padding: 5px 4px;
  display: block;
  overflow: hidden;
  padding-right: 12px;
}
.arrow-margins {
  background-position: 100% center;
}
.address-wraps {
  padding-bottom: 15px;
}
.section-titles,.lite-dividers {
  border-bottom: 1px solid #d4cfc8;
  padding-left: 15px;
}
.checkboxs.checkeds {
  background-image: url(../../assets/images/icon_selected.png);
}
.checkboxs {
  float: left;display: inline-block;width: 16px;
  height: 16px;
  background:url(../../assets/images/icon_unselect.png) no-repeat;
  background-size: 16px;
  margin-top: 12px;
}
.mainlian {
  padding: 4px 8px;
  border-radius: 2px;
}
.locations {
  line-height: 20px;
  margin-top: 6px;
  }
/* 上传图片 */
.pdr2 {
  margin: 0 0.2rem;
}
.pic_frame {
  width: 94%;
  margin: 0 0 0 6%;
}
.add-pic-bg {
  background: url("../../assets/images/bg.png") right;
  height: 100px;
  width: 95px;
}
.clear{
    clear: both;
}
.btn-fixed {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
}
.btn {
    display: block;
    margin: 0.2rem;
    height: 0.8rem;
    line-height: 0.8rem;
    color: #fff!important;
    font-size: 0.35rem;
    text-align: center;
    background-color: #ff8a00;
    border-radius: 3px;
    outline: none;
    border: none;
    text-decoration: none;
}
</style>

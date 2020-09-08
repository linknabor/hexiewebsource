<template>
<div :class="{wapcontent:cvertion == 'conv'}">     
    <div class="wapr"  v-show="cvertion == 'sale'">
        <div class="salepas">
            <div class="region">
                <img src="../../assets/images/ssq.png" class="seleimg" alt="">
                <span class="mgg" >省份</span>
                <select name="province" id="" :class="{scolor:province!=''}" v-model="province" @change="setprovince()">
                    <option value="" selected="selected">省份</option>
                    <option :value="item.provinceId" v-for="item in provincelist" :key="item.id">{{item.name}}</option>
                </select>
            </div>
            <div class="region">
                <img src="../../assets/images/ss1.png" class="seleimg" alt="">
                <span class="mgg">城市</span>
                <select name="city" id=""  :class="{scolor:city!=''}" v-model="city" @change="setcity">
                    <option value="" selected="selected">城市</option>
                    <option :value="item.cityId" v-for="item in citylist" :key="item.id">{{item.name}}</option>
                </select>
            </div>
             <div class="region">
                 <img src="../../assets/images/ss1.png" class="seleimg" alt="">
                 <span style="margin-right: 0.07rem;">行政区域</span>
                <select name="area" id="" :class="{scolor:area!=''}" v-model="area">
                    <option value="" selected="selected">区域</option>
                    <option :value="item.countyId" v-for="item in arealist" :key="item.id">{{item.name}}</option>
                </select>
            </div>
            <div class="region">
                <img src="../../assets/images/yuny.png" class="seleimg1" alt="">
                <span>运营小区</span>
                <input type="text" placeholder="请输入您想要运营的小区名" v-model="residential">
            </div>
            <div class="region">
                <img src="../../assets/images/name.png" class="seleimg1" alt="">
                <span>您的姓名</span>
                <input type="text" placeholder="请输入您的姓名" v-model="resname">
            </div>
              <div class="region">
                  <img src="../../assets/images/tel.png" class="seleimg1" alt="">
                <span class=" szym ">手机号</span>
                <input type="tel" class="tel" placeholder="请输入手机号" v-model="tel">
                <span class="yzz marg-yzm" @click="getCaptcha">{{yzmstr}}</span>
            </div>
              <div class="region" >
                  <img src="../../assets/images/yzm.png" class="seleimg1" alt="">
                <span class="szym">验证码</span>
                <input type="number" oninput="if(value.length>6)value=value.slice(0,6)"  class="yzm" placeholder="请输入验证码" v-model="yzm">
            </div>
            <div style="height:0.4rem; width:100%"></div>
        </div>
        <div class="btn"  v-show="isOriginHei">
            <div class="btn-agree">
                <label class="chendad" :class="{'addse adds':agree == true}" for="checkbox_a6">
                </label>
				<span>已阅读并同意</span>
                <!-- <router-link :to="{path:'/conventions'}" class="ageecolor">
                    《用户服务须知》
                </router-link> -->
                <span @click="aggver" class="ageecolor">《用户服务须知》</span>
                <input type="checkbox" v-model="agree" id="checkbox_a6">
            </div>
            <div class="pay" @click="pay">
                <span>立即支付</span>
            </div>
        </div>
        <div id="zzmb" v-show="zzshow" class="zzmb"></div>
    </div> 
    <conventions v-show="cvertion == 'conv'" @fromChild="getChild"></conventions>      
</div>
</template>

<script>
let vm;
let Token;
import cookie from 'js-cookie';
import wx from 'weixin-js-sdk';
import conventions from './conventions'
export default {
    data() {
        return {
            zzshow:false,
            cvertion:'sale',
            province:'',//省
            city:'',//市
            area:'',//区
            provincelist:[],
            citylist:[],
            arealist:[],
            residential:'',//小区
            resname:'',
            tel:'',
            yzm:'',
            yzmtime : 60,
            yzmstr:"获取验证码",
            agree:true,//是否同意
            ruleId:this.$route.query.ruleId,
            productType:this.$route.query.productType,
            shareCode:this.$route.query.shareCode,
            isOriginHei: true,//底部按钮顶起问题
            screenHeight: document.documentElement.clientHeight,//当前屏幕高度      
            originHeight: document.documentElement.clientHeight,//当前屏幕高度 
        };
    },
    created() {
        vm=this;
    },
    components: {
        conventions
    },
    computed: {

    },
    mounted() {
        window.onresize = function() {//底部按钮顶起问题
            return (function(){
                vm.screenHeight = document.documentElement.clientHeight;
            })()
        }
        vm.getprovince();
    },
    watch:{
        screenHeight (val) {//底部按钮顶起问题
            if(this.originHeight > val + 100) {        //加100为了兼容华为的返回键
                this.isOriginHei = false;
            }else{
                this.isOriginHei = true;
            }

        }
    },
    methods: {
        //省
        getprovince() {
            var n = "get",
            a = "province",
            i = null,
            b = function(xhr,data) {
                 //获取请求头标识
                Token=xhr.getResponseHeader('Access-Control-Allow-Token');
            },
            e = function(n) {
                if(n.success) {
                   vm.provincelist = n.result;
                }else {
                    alert(n.message)
                }
            },
            r = function(n) {
                alert(n.message)
            };
            vm.common.invokeApi(n, a, i, b, e, r);
        },
        setprovince() {
            if(vm.province !="") {
               vm.getcity();
               
            }
            vm.citylist = [];
            vm.arealist = [];
            vm.city="";
            vm.area="";
        },
        //市
        getcity() {
            vm.receiveData.getData(vm, "/city/"+vm.province, "res", function() {
                if(vm.res.success) {
                    vm.citylist = vm.res.result;
                }
                else {
                    alert(vm.res.message);
                }
            })
        },
        setcity() {
            if(vm.city != "") {
                vm.getarea();
            }else {
                vm.arealist = [];
                vm.area="";
            }
            
        },
        //区
        getarea() {
            vm.receiveData.getData(vm, "/county/"+vm.city, "res", function() {
                if(vm.res.success) {
                    vm.arealist = vm.res.result;
                }
                else {
                    alert(vm.res.message);
                }
            })
        },
        getCaptcha() {
             var reg = /^1[3-9][0-9]\d{8}$/;
            if(!reg.test(vm.tel)) {
                alert('请输入正确的手机号')
                return
            }
            if(vm.yzmstr=="获取验证码"||vm.yzmstr=="重新获取"){
	       		vm.yzmstr="获取中";
	       		vm.yzmreq();
	       	}
        },
        yzmreq(){
            var n = "POST",
            a = "getyzm",
            i = {mobile:vm.tel,type:'103'},
            b = function(xhr) {
                //  setRequestHeader设置头部
                xhr.setRequestHeader('Access-Control-Allow-Token',Token);
            },
            e = function(n) {
                if(n.success) {
                      vm.yzmtime=60;
                    alert("验证码已下发，请查收短信");
                    var tt=setInterval(function() {
                        vm.yzmstr=vm.yzmtime+'秒后重新获取';
                        vm.yzmtime--;
                        if(vm.yzmtime<=0) {
                            vm.yzmstr='重新获取'
                        }
                    },1000);
                    var ss = setTimeout(function(){clearInterval(tt);}, 61*1000);
                }else {
                    alert(n.message)
                }
              
            },
            r = function(n) {
          
            };
            vm.common.invokeApi(n, a, i, b, e, r)
        },
        //协议
        aggver() {
           vm.cvertion = 'conv';
        },
        getChild(v) {
            console.log(v);
            vm.cvertion = v.name;
            vm.agree = v.agr;
        },
        pay() {
            if(!vm.agree) {
                alert('请勾选同意下方的《用户服务须知》');
                return;
            }
            if(vm.province=="" || vm.city == "" || vm.area == "" || vm.residential== "" || vm.resname == "" || vm.tel == "" || vm.zym == "") {
                alert("请填写完整信息");
                return;
            }
            vm.zzshow = true;
            var data = {
                province:vm.province,
                city:vm.city,
                county:vm.area,
                sectName:vm.residential,
                name:vm.resname,
                mobile:vm.tel,
                code:vm.yzm,
                ruleId:vm.ruleId,
                productType:vm.productType,//推广，售卖产品类型
                shareCode:vm.shareCode,
            }
            vm.receiveData.postData(vm,"/promotionPay",data, "res", function() {
                console.log(vm.res)
                if(vm.res.success) {
                    let wd = vm.res;
                    wx.config({
                        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                        appId: wd.result.appId, // 必填，公众号的唯一标识
                        timestamp: wd.result.timestamp, // 必填，生成签名的时间戳
                        nonceStr: wd.result.nonceStr, // 必填，生成签名的随机串
                        signature: wd.result.signature,// 必填，签名，见附录1
                        jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                    });
                     wx.chooseWXPay({
                        "appId":wd.result.appId,
                        "timestamp":wd.result.timestamp,
                        "nonceStr":wd.result.nonceStr,
                        "package":wd.result.pkgStr,
                        "signType":wd.result.signType,
                        "paySign":wd.result.signature,
                        success: function (res) {
                            //支付成功跳转详情
                            vm.zzshow = false;
                            cookie.set('tel',vm.tel);
                            vm.$router.push({path:'/salessuccess'})
                        },
                        fail:function(res) {
                            console.log(JSON.stringify(res))
                        },
                        cancel:function(res){
                            vm.zzshow = false;
                            alert('支付取消');
                        }
                     })
                }else {
                    vm.zzshow = false;
                    alert(vm.res.message)
                }
            })

        },

    }
};
</script>

<style scoped>
.wapcontent {
     position:absolute;
    padding:5%;
    width: 100%;
    height: 100%;
    background-color:rgba(0, 0, 0, 0.5);
    box-sizing: border-box;
}
.wapr {
    position:absolute;
    top:0;
    left:0;
    right:0;
    bottom:0;
    background-color:#fff;
}
.salepas {
    background-color:#fff;
    padding:3% 0 0 0;
}
.region {
    height: 0.58rem;
    line-height: 0.58rem;
    font-size: 0.35rem;
    text-align: left;
    padding: 0.2rem;
    padding-left: 0.1rem;
    padding-right: 0;
}
.region span {
    margin-right:0.1rem;
    color: #F08500;
}
.region select {
   width:55%;
   height: 100%;
   font-size: 0.3rem;
   border-color:#BBBBBB;
   border-radius:0.1rem;
   color:#888888;
   box-sizing: border-box;
   background-color:#fff;
   outline: none;
}
.region select  option {
     color: #000;
}
.region .scolor {
    color: #000;
}
.seleimg {
    width: 0.6rem;
    vertical-align: middle;
}
.seleimg1 {
    margin-left: 0.07rem;
    width: 0.5rem;
    vertical-align: middle;
}
.region input {
    width: 55%;
    height: 100%;
    font-size: 0.3rem;
    outline: none;
    border:1px solid #BBBBBB;
    box-sizing: border-box;
    padding-left: 0.1rem;
}
.region .tel {
    width: 32%;
    font-size: 0.3rem;
}
.region .mgg {
    margin-right: 0.76rem;
}
.region .yzz {
    font-size: 0.3rem;
    padding: 0.05rem;
    border: 1px solid #BBBBBB;
    border-radius: 0.05rem;
}
.region .yzm {
    width: 32%;
    font-size: 0.3rem;
}
.region .marg-yzm {
    margin-right: 0;
}
.region .szym {
    margin-right:0.44rem;
}

.btn {
    position: fixed;
    left:0;
    right: 0;
    bottom: 0;
}
.btn-agree {
    height: 0.58rem;
    line-height: 0.58rem;
    padding-left: 0.2rem;
    font-size: 0.3rem;
}
.btn-agree input{
    width: 0.339rem;
    height: 0.339rem;
    top: 0.04rem;
    display: none;
}
.chendad {
   display: inline-block;
   width: 0.339rem;
   height: 0.339rem;
   line-height: 0.339rem;    
   border:1px solid #ccc; 
   border-radius: 0.05rem;
   background-color: #fff;
   vertical-align: sub;
}
.btn-agree .adds {
   vertical-align: baseline;
}
.addse:after {
   width: 0.339rem;
   height: 0.339rem;
   line-height: 0.339rem;    
   border-radius: 0.05rem;
   background-color: #fff;
	content: '\2713';
	font-size: 0.3rem;
    color: #fff;
    text-align: center;
    background-color:#F08500;
    display: inline-block;
}
.btn .pay {
    height: 1.13rem;
    line-height: 1.13rem;
    text-align: center;
    font-size: 0.3rem;
    color: #fff;
    background-color: #F08500 ;
}
.zzmb {
  z-index: 100000;
  position: fixed;
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
.ageecolor {
    color:#F08500;
}
</style>}

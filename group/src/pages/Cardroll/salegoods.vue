<template>
    <div class="cardrollgoods">
        <div style="background: white;height: 15px;width:100%;">&nbsp;</div>
        <div class="addr-top">&nbsp;</div>
        <div class="goods-warp">
            <div class="centrent">
                <div class="ov">
                    <img class="icon-goods fl" :src="pictures"/>
                    <div class="ov sale-name">
                        <span class="nowrap">{{name}}</span><br>
                        <span class="color">¥{{price}}</span> <del>{{oriPrice}}</del>
                    </div>
                </div>
            </div>
        </div>
        <div class="addr-f">&nbsp;</div>
        <div class="goods-warps"> 
            <div >
                <div class="region">
                      <img src="../../assets/images/group/tel.png" class="seleimg1" alt="">
                    <span class=" szym ">手机号</span>
                    <input type="tel" placeholder="请输入手机号" v-model="tel">
                    <span class="yzz" @click="getCaptcha">{{yzmstr}}</span>
                </div>
                <div class="region" >
                    <img src="../../assets/images/group/yzm.png" class="seleimg1" alt="">
                    <span class="szym">验证码</span>
                    <input type="number" oninput="if(value.length>6)value=value.slice(0,6)"  class="yzm" placeholder="请输入验证码" v-model="yzm">
                </div>
            </div>
        </div>
        <div class="btn" @click="btnpay" v-show="isOriginHei">
            立即支付
        </div>
        <div id="zzmb" v-show="zzshow" class="zzmb"></div>
    </div>
</template>

<script>
let vm;
let Token;
import wx from 'weixin-js-sdk';
export default {
    data() {
        return {
            zzshow:false,
            ruleId:this.$route.query.ruleId,//参数
            productType:this.$route.query.productType,
            name:this.$route.query.name,
            price:this.$route.query.price,
            oriPrice:this.$route.query.oriPrice,
            pictures:this.$route.query.pictures,
            shareCode:this.$route.query.shareCode,
            tel:'',
            yzm:'',
            yzmtime : 60,
            yzmstr:"获取验证码",
            isOriginHei: true,//底部按钮顶起问题
            screenHeight: document.documentElement.clientHeight,//当前屏幕高度      
            originHeight: document.documentElement.clientHeight,//当前屏幕高度 
        };
    },
    created() {
        vm = this;
    },
    components: {

    },
    computed: {

    },
    mounted() {
         window.onresize = function() {//底部按钮顶起问题
            return (function(){
                vm.screenHeight = document.documentElement.clientHeight;
            })()
        }
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
        //获取验证码
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
                    vm.yzmtime=60;
                    alert(n.result);
                    var tt=setInterval(function() {
                        vm.yzmstr=vm.yzmtime+'秒后重新获取';
                        vm.yzmtime--;
                        if(vm.yzmtime<=0) {
                            vm.yzmstr='重新获取'
                        }
                    },1000);
                    var ss = setTimeout(function(){clearInterval(tt);}, 61*1000);
            },
            r = function(n) {
                alert(n.message == null?'获取验证码失败':n.message)
            };
            vm.common.invokeApi(n, a, i, b, e, r)
        },
        btnpay() {
            vm.zzshow = true;
            let url ="/promotionPay";
            var data = {
                ruleId:vm.ruleId,
                productType:vm.productType,
                mobile:vm.tel,
                code:vm.yzm,
                shareCode:vm.shareCode,
            }
                vm.receiveData.postData(vm,url,data,'res',function(){
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
                                vm.$router.push({path:'/sassuccess'})
                            },
                            fail:function(res) {
                                vm.zzshow = false;
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
            });    
        }
    }
};
</script>

<style scoped>
.cardrollgoods {
  background: white;
  position:absolute;
  left:0;
  right:0;
  top:0;
  bottom:0;
  
}

.centrent {
    font-size:0.3rem;
    letter-spacing: 0.02rem;
}

.ov {
  overflow:hidden;
}
.goods-warp {
    margin:0.3rem;
}
.goods-warps {
    margin-left:0.32rem;
    margin-top:0.3rem;
}
.icon-goods {
    height: 2rem;
    width: 2rem;
    border-radius: 3px
}
.sale-name {
    padding-left: 0.5rem;
    font-size: 0.35rem;
    line-height: 0.75rem;
    margin-top: 0.3rem;
}

.addr-top {
    background: url('../../assets/images/group/bg_line_location_top.png') repeat-x;
    height: 2px;
    background-size: 100% 2px;
}
.addr-f {
    background: url('../../assets/images/group/bg_line_location_bottom.png') repeat-x;
    height: 2px;
    background-size: 100% 2px;
}
.seleimg1 {
    width: 0.5rem;
    vertical-align: middle;
}

.region {
    height: 0.58rem;
    line-height: 0.58rem;
    font-size: 0.35rem;
    text-align: left;
    margin-bottom:0.3rem;
}
.region input {
    width: 30%;
    height: 100%;
    font-size: 0.3rem;
    outline: none;
    border:1px solid #BBBBBB;
    box-sizing: border-box;
    padding-left: 0.1rem;
}
.region .yzz {
    font-size: 0.3rem;
    padding: 0.05rem;
    border: 1px solid #BBBBBB;
    border-radius: 0.1rem;
}
.region .szym {
    margin-right:0.05rem;
}
.region span {
    color: #F08500;
}
.btn {
    position: fixed;
    width:100%;
    height: 1.1rem;
    line-height: 1.1rem;
    background-color:#E28A32;
    color:#fff;
    text-align: center;
    font-size: 0.4rem;
    bottom:0;
}
.color {
    color:#E3994F;
}
.nowrap {
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
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
del {
    color:rgb(136, 136, 136);
}
</style>

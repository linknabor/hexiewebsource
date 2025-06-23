<template>
<div :class="{wapcontent:cvertion == 'conv'}">
   <div class="reg" v-show="cvertion == 'sale'">
       <div id="zzmb" class="zzmb" v-show="zzmb"></div>
       <div id="phoneAjax" class="hidden"  v-show="zzmb">
             <img src="../assets/images/img/7f1b3b58-c5b6-4022-b1ed-dc4188c43a3a.gif" style="vertical-align: middle;">
	   </div>

       <div class="divider"></div>
            <div class="info-wrap">
                    <div class="input-wrap lite-divider">
                        <span class="fl fs15">用户名</span>
                        <input placeholder="请输入用户名" class="fr fs14 hidden-input pr15" v-model="user.name"/>
                    </div>
                    <div class="input-wrap lite-divider">
                        <span class="fl fs15">手机号</span>
                        <input type="tel" placeholder="请输入手机号码" class="fr fs14 hidden-input pr15" v-model="user.tel"/>
                    </div>
                   <div class="input-wrap lite-divider">
                        <input placeholder="输入验证码" class="fl fs14 hidden-input" style="padding-bottom: 15px;text-align: left;margin-bottom: 6px;" v-model="captcha" maxlength="6"/>
                        <span class="fr btn-plain" style="margin-top: 10px;" :class="{useless:yzmstr!='获取验证码'&&yzmstr!='重新获取'}" @click="getCaptcha">{{yzmstr}}</span>
                   </div> 
                   <div class="messages">{{message}}</div>
                    <div style="width:100%;height:90px;clear:both">
                            &nbsp;
                    </div>
                    <div class="btn-fixed">
                            <div class="btn-agree">
                                <label class="chendad" :class="{'addse adds':agree == true}" for="checkbox_a6">
                                </label>
                                <input type="checkbox" v-model="agree" id="checkbox_a6">
                                <span>已阅读并同意</span>
                                <!-- <router-link :to="{path:'/ageess'}" class="ageecolor">
                                       《用户注册须知》
                                </router-link> -->
                                <span @click="aggver" class="ageecolor">《用户服务须知》</span>
                             </div>
                            <div class="submit-btn ov fs16" @click="save">保存</div>
                    </div> 
		    </div>
   </div>
   <ageess v-show="cvertion == 'conv'" @fromChild="getChild"></ageess>
</div>   
</template>

<script>
let vm;
let Token;
import ageess from './ageess';
export default {
   data () {
       return {
           cvertion:'sale',
            omeFrom:"",
            user:{},
            yzmtime : 60,
            yzmstr:"获取验证码",
            captcha: '',
            zzmb:false,
            isClick: false,
            comeFrom:'',
            message:"",
            agree:true,//是否同意
       };
   },
   created() {
       vm=this;
   },
   mounted() {
        vm.getComeFrom()
        vm.getUserInfo();
   },
   
   methods: {
        getUserInfo() {
            var n = "GET",
            a = "userInfo?oriApp="+vm.getUrlParam('oriApp'),
            i = null,
            c = function(xhr,data) {
                //获取请求头标识
                Token=xhr.getResponseHeader('Access-Control-Allow-Token');
            },
            e = function(n) {
                if(n.success&&n.result==null) {
                    console.log('no user info, will reLogin !')
                    reLogin();
                }     
                vm.user = n.result;
                let userInfo = vm.user
                let wdappids = vm.masterConfig.C('wdappids')
                console.log(wdappids)
                if(wdappids.indexOf(userInfo.appId)>-1) {
                    const secondaryColor = getComputedStyle(document.documentElement).getPropertyValue('--secondary-color');
                    document.documentElement.style.setProperty('--primary-color', secondaryColor);
                } else {
                    const originColor = getComputedStyle(document.documentElement).getPropertyValue('--origin-color');
                    document.documentElement.style.setProperty('--primary-color', originColor);
                }
                alert('tel : ' + vm.user.tel)
                alert('comeFrom : ' + vm.comeFrom)
                if(vm.user.tel && vm.user.tel!='null') {
                    console.log('user registered, will forward ! ')
                    vm.common.updateUserStatus(n.result);
                    var forwardPage = "";
                    if(vm.comeFrom){
                        forwardPage = vm.comeFrom;
                    } else {
                        // let oriapp=vm.getUrlParam('oriApp')?'oriApp='+vm.getUrlParam('oriApp'):'';
                        forwardPage = vm.basePageUrl+'person/index.html?'+vm.common.getoriApp();
                    }
                    console.log('forward page : ' + forwardPage);
                    location.href = forwardPage;
                }
                
            },
            r = function() {};
            vm.common.invokeApi(n, a, i, null, e, r,c)
        },
        //获取验证码
        getCaptcha() {
            let tel = vm.user.tel
            if (!tel) {
                alert("请输入正确的手机号");
                return false;
            }
            tel = tel.trim()
            if (tel.length !== 11) {
                alert("请输入正确的手机号");
                return false;
            }
            if(vm.yzmstr=="获取验证码"||vm.yzmstr=="重新获取"){
	       		vm.yzmstr="获取中";
	       		vm.yzmreq();
	       	}
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
        yzmreq() {
            var n = "POST",
            a = "getyzm",
            i = {mobile:vm.user.tel},
            b = function(xhr) {
                //  setRequestHeader设置头部
		    	xhr.setRequestHeader('Access-Control-Allow-Token',Token)
            },
            e = function(n) {
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
            },
            r = function(n) {
                vm.yzmtime = 60;
                vm.message=n.message;
                var tt=setInterval(function() {
                    vm.yzmstr=vm.yzmtime+'秒后重新获取';
                    vm.yzmtime--;
                    if(vm.yzmtime<=0) {
                        vm.yzmstr='重新获取'
                    }
                },1000);
                var ss = setTimeout(function(){clearInterval(tt);}, 61*1000);
            };
            vm.common.invokeApi(n, a, i, b, e, r)
        },

        //保存
        save() {
            if(!vm.agree) {
                alert('请勾选同意下方的《用户服务须知》');
                return;
            }
            if(!(/^1[3-9][0-9]\d{8}$/.test(vm.user.tel))) {
        		alert("请填写正确的手机号！");
        		return;
        	}
        	if(vm.captcha=='') {
    			alert('请输入验证码！');
    			return;
            }
            if(!vm.agree) {
                return;
            }
            vm. zzmb=true;
            if(vm.isClick == true) {
                alert('请勿重复提交')
            }
            vm.isClick=true;
            vm.simpleRegister();
        },
        simpleRegister() {
             vm.receiveData.postData(vm,'simpleRegister',{mobile:vm.user.tel,name:vm.user.name,yzm:vm.captcha},'res',function(){
                 if(vm.res.success) {
                        vm.common.updateUserStatus(vm.res.result);
                        var forwardPage = "";
                        if(vm.comeFrom){
                            forwardPage = vm.comeFrom;
                        } else {
                            // let oriapp=vm.getUrlParam('oriApp')?'oriApp='+vm.getUrlParam('oriApp'):'';
                            forwardPage = vm.basePageUrl+'person/index.html?'+vm.common.getoriApp();
                        }
                        alert("注册成功。");
                        location.href = forwardPage;
                } else {
                     vm.zzmb=false;
                    vm.isClick=false;
                    alert(vm.res.message==null?"验证码不正确或信息保存失败，请重试！":vm.res.message);
                }
            });
        },
         getUrlParam(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
            var r = window.location.search.substr(1).match(reg);  //匹配目标参数
            if (r != null) return unescape(r[2]); return ""; //返回参数值
        },
         getComeFrom(){
                let comeFrom=vm.getUrlParam("comeFrom") || vm.$route.query.comeFrom;
                var url = location.href;
                var idx = url.lastIndexOf('#');
                alert('hashIdx : ' + idx)
                var hash = ''
                if (idx > -1) {
                    hash = url.substring(idx);
                } else {
                    var index = url.lastIndexOf('/')
                    var markIndex = url.lastIndexOf('&')
                    if (markIndex === -1) {
                        markIndex = url.indexOf('?')
                    }
                    if(markIndex < index) {
                        hash = url.substring(index)
                    }
                }
                if (hash) {
                    hash = hash.replace('/', '#')
                    if(!hash.startsWith('#')) {
                        hash = '#' + hash
                    }
                }
                alert('hash : ' + hash)
                vm.comeFrom =comeFrom +''+hash;
                console.log(vm.comeFrom)
        }
   },
   components: {
         ageess
   }

}
</script>

<style  scoped>
.wapcontent {
    position: absolute;
    padding: 5%;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}
.reg {
    background-color: #fffff8;
    padding-bottom: 1px;
}
.zzmb {
    z-index: 100000;
    position: fixed;
    top: 0;
    left: 0;
    /* -moz-opacity: 0.65; */
    /* opacity: 0.65; */
    /* filter: alpha(opacity=65); */
    /* background: #000; */
    width: 100%;
    height: 100%;
    display: block;
}
#phoneAjax {
    position: fixed;
    top: 30%;
    left: 50%;
    width: 60px;
    height: 60px;
    line-height: 60px;
    margin-left: -30px;
    text-align: center;
    /* background-color: black; */
    /* -moz-opacity: .8; */
    /* opacity: .80; */
    /* filter: alpha(opacity=80); */
    z-index: 1998;
    /* overflow: auto; */
    -moz-border-radius: 15px;
    -webkit-border-radius: 15px;
}
.info-wrap {
    padding: 4px;
    /* border-bottom: 5px solid #f9f9e9; */
    font-size: 12px;
    color: #3b3937;
}
.input-wrap {
    overflow: hidden;
    line-height: 45px;
}
 .lite-divider {
    border-bottom: 1px solid #d4cfc8;
    padding-left: 15px;
}
.fs15 {
    font-size: 15px;
}
.hidden-input {
    height: 20px;
    margin-top: 12px;
    border: none;
    outline: none;
    background-color: transparent;
    text-align: right;
}
.fs14 {
    font-size: 14px;
}
.pr15 {
    padding-right: 15px;
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
    background: var(--primary-color);
    text-align: center;
}
.fs16 {
    font-size: 16px;
}
.ov {
    overflow: hidden;
    padding: 1px;
}
.useless {
	  background-color: #D7D5D4;
}
.messages {
    padding:15px;
    color:red;
    font-size: 15px;
}
.btn-agree span {
    color:#000;
}
.btn-agree {
    height: 0.58rem;
    line-height: 0.58rem;
    font-size: 0.3rem;
    margin-bottom: 0.14rem;
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
    background-color: var(--primary-color);
    display: inline-block;
}
.btn-agree .ageecolor {
    color: var(--primary-color);
}
</style>
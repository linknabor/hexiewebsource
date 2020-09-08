<template>
    <div class="ress">
        <div class="header">
            <div v-show="flag">
                <div class="title">
                    <div class="top">您的用户名为</div>
                    <div>{{tel}}</div>
                </div>
                <div>
                    <input type="number" oninput="if(value.length>6)value=value.slice(0,6)"  placeholder="请输入验证码" v-model="yzm">
                    <span class="szym" @click="yzms">{{yzmstr}}</span>
                </div>
                <div class="reset" @click="reset">
                    查看/重置密码
                </div>
            </div>
        </div>
    </div>
</template>

<script>
var vm;
var Token;
import wx from 'weixin-js-sdk';
import { MessageBox } from 'mint-ui';
import cookie from 'js-cookie';
export default {
    data() {
        return {
            name:'',
            tel:'',
            flag:false,
            yzm:'',
            yzmtime : 60,
            yzmstr:"获取验证码",
            ruleId:'',
            productType:'',
        };
    },
    created() {
        vm =this;
    },
    components: {

    },
    computed: {

    },
    mounted() { 
        vm.info();
        vm.getdetail();       
    },
    methods: {
        initSession4Test() {
            let url = "/initSession4Test/8427";
            vm.receiveData.getData(vm, url, "Data", function() {});
        },
         query() {
             vm.receiveData.getData(vm, "/queryPromotionOrder", "res", function() {
                if(vm.res.success) {
                    if(vm.res.result == 0 ) {
                        var text = '未查询到您的用户名</br>请先成为社区合伙人后进行重置密码操作';
                        MessageBox.alert(text).then( action =>{
                              window.location.href = vm.basePageUrl+'group/onsales.html?'+vm.common.getoriApp()+'#/salesdetail?ruleId='+vm.ruleId+'&productType='+vm.productType;
                        })
                    }
                    else {
                        vm.flag = true;
                    }
                }else {
                    if(vm.res.message!=null) {
                        alert(vm.res.message);
                    }
                }
            })
        },
        getdetail() {
            vm.receiveData.getData(vm, "/onsales/getPromotion", "res", function() {
                if(vm.res.success) {
                    vm.ruleId = vm.res.result[0].ruleId;
                    vm.productType = vm.res.result[0].productType;
                }else {
                    if(vm.res.message!=null) {
                       alert(vm.res.message);
                    }
                }
            })
        },
        info() {
            vm.receiveData.getData(vm, 'userInfo?oriApp='+vm.getUrlParam('oriApp'), "res", function() { 
                if(vm.res.success) {
                    vm.name = vm.res.result.name;
                    vm.tel = vm.res.result.tel;
                    if(!vm.tel) {
                        cookie.set('tel','');
                        var text = '未查询到您的用户名</br>请先成为社区合伙人后进行重置密码操作';
                        MessageBox.alert(text).then( action =>{
                             location.href=vm.basePageUrl+'group/onsales.html?'+vm.common.getoriApp()+'#/salesdetail?ruleId='+vm.ruleId+'&productType='+vm.productType;
                        })
                    }else {
                        vm.query();
                    }
                }else {
                  if(vm.res.message!=null) {
                       alert(vm.res.message);
                  }
                }
            });
        },
        reset() {
            if(vm.yzm == "") {
                alert('请输入验证码')
                return;
            }
            let url = "/promotion/password/reset?vericode="+vm.yzm;
            vm.receiveData.getData(vm, url, "res", function() {
                if(vm.res.success) {
                    alert('重置成功');
                    wx.closeWindow();
                }else {
                    alert(vm.res.message)
                }
            });
        },
        yzms() {
            var n = "POST",
            a = "getyzm",
            i = {mobile:vm.tel,type:'104'},
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
        }
    }
};
</script>
<style >
.mint-msgbox-content {
    padding: 10px 15px 15px;
}
</style>
<style scoped>
.ress {
    position: absolute;
    width:100%;
    height:100%;
    background-color:#fff;
}
.header {
    color:#F29B2F;
    font-size: 0.35rem;
    line-height: 0.6rem;
    position: absolute;
    top:50%;
    left:50%;
    transform: translate(-50%,-100%);
    width: 5.1rem;
    text-align: center;
}
.reset {
    color:#fff;
    font-size: 0.35rem;
    padding: 0.1rem 0.5rem;
    background-color:#F08500;
    border:1px solid #ccc;
    border-radius: 0.2rem;
    margin-top:0.6rem;
    width: 3rem;
    display: inline-block;
}
.title {
    margin-bottom: 0.5rem;
}
input {
    width: 47%;
    height: 0.6rem;
    outline: none;
    border: 1px solid #ccc;
    box-sizing: border-box;
    padding-left: 0.1rem;
     border-radius: 0.1rem;
}
span {
    font-size: 0.3rem;
    height: 0.6rem;
    padding-left: 0.1rem;
    padding-right:0.1rem;
    border: 1px solid #BBBBBB;
    border-radius: 0.1rem;
    display: inline-block;
    box-sizing: border-box;
}
</style>

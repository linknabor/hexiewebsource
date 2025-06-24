<template>
    <div>
        <div class="gbcolor" v-show="flay">
            <div id="phoneAjax">
                <img
                    src="../../assets/images/common/c3d7f369-4a5e-4c4a-9fb9-a4b9d274c7e1.gif"
                    style="width:40px;height40px;vertical-align: middle;"
                /> 
            </div>
        </div>        
    </div>
</template>

<script>
import Storage from '../../assets/js/storage.js'
var vm;
export default {
    data() {
        return {
            flay:true,//判断遮罩
            sectIds:this.$route.query.sectIds,
            timestamp:this.$route.query.timestamp,
            type:this.$route.query.type
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
        vm.weixinAuthorize();
        // vm.initUserInfo();
    },
    methods: {
        IsWeixinOrAlipay() {
            var ua = window.navigator.userAgent.toLowerCase();
            //判断是不是微信环境
            if (ua.match(/MicroMessenger/i) == 'micromessenger') {
                return "WeiXin";
            }else {
                alert('请使用微信扫码');
                return
            }
        },
        weixinAuthorize() {
            let checkclient = vm.IsWeixinOrAlipay();
            if("WeiXin" === checkclient) {
                   vm.initUserInfo();
            }
        },
        //授权获取user    
        initUserInfo(){
                let n = "GET",
                a = "userInfo?oriApp="+vm.getUrlParam('oriApp'),
                i = null,
                e = function(n) {
                    if(n.success&&n.result==null) {
                         reLogin();
                         return
                    }
                    if(n.result!=null) {
                        vm.common.updatecookie(n.result.cardStatus,n.result.cardService,n.result.id,n.result.appid,n.result.cspId,n.result.sectId,n.result.cardPayService,n.result.bgImageList,n.result.wuyeTabsList,n.result.qrCode,n.result);
                        Storage.set('userInfo', n.result)
                        //判断是否领卡
                        if(n.result.cardService && n.result.cardStatus != 3) {
                            if(n.result.tel ==null || n.result.tel == "") {
                                 vm.common.checkRegisterStatus();
                            }else {
                                 setTimeout(function(){
                                    vm.initquery(); 
                                 },2000)   
                            }
                        }else {
                            setTimeout(function(){
                                vm.initquery(); 
                            },2000)
                        }
                    }
                },
                r = function(res) { 
                   alert(res.message)
                };
                this.common.invokeApi(n, a, i, null, e, r);
        },
        //获取数据
        initquery() {
            let url = "oper/authorize?sectIds=" + vm.sectIds +'&timestamp=' + vm.timestamp + '&type=' + vm.type;
            let n = "post",
                a = url,
                i = null,
                e = function(n) {
                    vm.flay = false;
                    alert('授权成功');
                    vm.$router.push({path:'/mass-notice'});
                },
                r = function(res) { 
                    vm.flay = false;
                    alert(res.message);
                };
            this.common.invokeApi(n, a, i, null, e, r);
        }
    }
};
</script>

<style scoped>
.gbcolor {
    position:fixed;
    top:0;
    left:0;
    right: 0;
    bottom:0;
    background-color:rgba(0, 0, 0, 0.4);
}

#phoneAjax {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 60px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    background-color: black;
    -moz-opacity: 0.8;
    opacity: 0.8;
    filter: alpha(opacity=80);
    z-index: 1998;
    overflow: auto;
    -moz-border-radius: 15px;
    -webkit-border-radius: 15px;
}
</style>

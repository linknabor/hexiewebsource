<template>
<div class="delivery">
    <div class="outside">
        <div class="title">
            发货方式
        </div>
        <div class="logis ov">
            <div class="fl posi">
                <input type='radio' id='logistics'  name="logistics" v-model="logisticType" value='2'/>
                <label for='logistics' class="fors"><i class="devrad" :class="{devradi:logisticType==2,devrad2:logisticType==2}"></i>需要物流</label>
            </div>
            <div class="fl posi">
                <input type='radio' id='business' name="logistics" v-model="logisticType" value='0'/>
                <label for='business'>商家配送<i class="devrad" :class="{devradi:logisticType==0,devrad2:logisticType==0}"></i></label>
            </div>
        </div>
        <div class="main" v-show="logisticType != 0">
            <div class="main-type">运单号:</div>
            <div class="main-yun">
                 <!-- v-on:input="shousuo()" -->
                <input type="text" placeholder="单行输入" v-model="logisticNo" @input="toTrim" @blur="fixScroll">
                <div class="scan-icon"  @click="show"></div>
            </div>
        </div>

        <div class="main" v-show="logisticType != 0">
            <div class="main-type">请选择快递公司</div>
            <div class="main-sele">
                <select name="" id="" v-model="logisticNamecode" @blur="fixScroll">
                    <option :value="item.name" :logisindex="item.index"  v-for="(item,index) in logisticList" :key="index">{{item.name}}</option>
                </select>
                <div class="fang iconfont icon-sousuo"></div>
            </div>
        </div>

        <div style="height:1rem;"></div>
        <div class="btn" @click="logis" v-show="isOriginHei">
            点击发货
        </div>
    </div>
</div>
</template>

<script>
let vm;
let timer;
import wx from "weixin-js-sdk";
export default {
    data() {
        return {
            orderId:this.$route.query.orderId,
            logisticType:2,
            logisticNamecode:'',//快递公司，
            logisticNo:'',//快递单号
            logisticList:[],
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
    watch: {
        logisticNo(nm,nw) {
            vm.shousuo();
        },
        screenHeight (val) {//底部按钮顶起问题
            if(this.originHeight > val + 100) {        //加100为了兼容华为的返回键
                this.isOriginHei = false;
            }else{
                this.isOriginHei = true;
            }
        },
    },
    mounted() {
        let self = this;
        window.onresize = function() {//底部按钮顶起问题
            return (function(){
                self.screenHeight = document.documentElement.clientHeight;
            })()
        }
        let url = location.href.split("#")[0];
        vm.receiveData.wxconfig(vm, wx, ["scanQRCode","getLocation"], url);
    },
    methods: {
        //调用微信扫一扫接口, 成功 数据返回到stmtId,显示在input上
        show() {
            vm.receiveData.scan(vm, wx, "logisticNo");
        },
        shousuo() {
            if (timer) {
                clearTimeout(timer);
            }
            timer = setTimeout(() => {
                if (vm.logisticNo != "") {
                     this.logistics();
                }
            }, 400);
        },
        //快递单号查询物流公司
        logistics() {
                vm.receiveData.getData(vm,'/logistics/'+vm.logisticNo, "res", function() {
                if (vm.res.success) {
                        vm.logisticList = vm.res.result;
                        if(vm.logisticList.length == 1) {
                            vm.logisticNamecode = vm.logisticList[0].name;
                        }else if(vm.logisticList.length > 1) {
                             vm.logisticNamecode = '';
                             alert('未准确查询到对应物流公司，请选择');
                        }else {
                            vm.logisticList.push({
                                code: null,
                                createDate: null,
                                id: null,
                                name: "其他",
                            })
                            vm.logisticNamecode = vm.logisticList[0].name;
                        }
                } else {
                    alert(vm.res.message == null ? "请稍后重试！" : vm.res.message);
                }
            });
        },
        //去掉空格
        toTrim(){
            vm.logisticNo=vm.logisticNo.replace(/\s/g, "")
        },
        //ios中留白问题
        fixScroll() {
            let u = navigator.userAgent;
            let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
            if (isiOS) {
            window.scrollTo(0,0);
            }
        },
        logis(){
            if(vm.logisticType == 2){
                if(vm.logisticNo =='' || vm.logisticNamecode == '' ||vm.logisticNamecode == undefined) {
                    alert('请输入运单号或者物流公司');
                    return;
                }
            }
            if(vm.logisticType == 0) {
                vm.logisticNo = '';
                vm.logisticNamecode = '';
            }
            let code = '';
            for(var i = 0;i<vm.logisticList.length;i++) {
                if(vm.logisticNamecode == vm.logisticList[i].name) {
                    code = vm.logisticList[i].code;
                }
            }
            var data = {
                orderId:vm.orderId,
                logisticType:vm.logisticType,
                logisticNo:vm.logisticNo,
                logisticCode:code,
                logisticName:vm.logisticNamecode
            }
             vm.receiveData.postData(vm,'/logistics/save',data,'res',function(){
                if(vm.res.success) {
                    vm.$router.push({path:'/consignment',query:{'orderId':vm.orderId}}); 
                }else {
                    alert(vm.res.message)
                }
            });
        },
    }
};
</script>

<style scoped>
.delivery {
    position:absolute;
    width:100%;
    height:100%;
    background-color:#fff;
}
.outside {
    padding:0.8rem 1rem 0 1rem;;
}
.title {
    height: 0.44rem;
    line-height: 0.44rem;
    text-align: left;
    font-size: 0.32rem;
    margin-bottom: 0.34rem
}
.logis {
    font-size: 0.32rem;
    margin-bottom:0.4rem;
}
.posi {
    position: relative;
    height: 0.45rem;
    padding-left: 0.6rem;

}
.devrad {
    position: absolute;
    top: 0;
    left: 0;
    width: 0.4rem;
    height: 0.4rem;
    outline: none;
    border: 1px solid #ccc;
    background: #ffffff;
    border-radius: 50%;
    transition: border-color .3s;
    -webkit-transition: border-color .3s;
    box-sizing: border-box;
}
.posi .devradi:after {
    position: absolute;
    content: '';
    top: 0.059rem;
    left: 0.05rem;
    width: 0.26rem;
    height: 0.26rem;
    border-radius: 50%;
    background-color: #4278FB;
    opacity: 1;
    box-sizing: border-box;
    transition: opacity .1s;
    -webkit-transition: opacity .1s;
}
.devrad2 {
   border-color:#4278FB;
}
.logis input{
    position: absolute;
    left: -9999px;
}
.logis .fors {
    margin-right:0.6rem;
}
.main {
    font-size:0.32rem;
    margin-bottom: 0.5rem;
}
.main-type {
    margin-bottom:0.4rem;
}
.main-sele {
    position: relative;
    border: 1px solid rgba(187, 187, 187, 1);
    border-radius: 5px;
    box-sizing: border-box;
    margin-left: 2%;
    width: 94%;
}
.main select {
    text-indent: 0.4rem;
    width:100%;
    height:0.5rem;
    line-height:0.5rem;
    border-radius: 5px;
    outline: none;
    border:none;
    background-color:#fff;
}
.fang {
    position:absolute;
    left: 0.15rem;
    top: 0.1rem;
    font-size: 0.3rem;
}
.main-yun {
    width: 92%;
    position: relative;
    width: 94%;
    margin-left: 2%;
    border: 1px solid rgba(187, 187, 187, 1);
    border-radius: 3px;
    box-sizing: border-box;
}
.main-yun input{
    width: 89%;
    border:none;
    border-radius: 3px;
    outline: none; 
    height: 0.5rem;
    line-height: 0.5rem;
    padding-left: 0.17rem;
    box-sizing: border-box;
}
.scan-icon {
  height: 0.37rem;
  width: 0.37rem;
  background: url("../../assets/images/icon_scan.png");
  background-size: cover;
  position:absolute;
  right:0rem;
  right: 0.1rem;
  top: 0.1rem;
}
.btn {
  position:fixed;
  left:0;
  right:0;
  bottom:0;
  background-color:#F08500;
  height: 1rem;
  line-height: 1rem;
  text-align: center;
  color:#fff;
  z-index:9999;
}
</style>

<template>
    <div class="records">
        <div >
            <div class="search">
                <form  action="javascript:void 0">
                    <input type="number" pattern="[0-9]*" oninput="this.value=this.value.replace(/\D/g,'');" placeholder="请输入核销劵码" @keyup.13="tapToSearch" @blur="tapblur" v-model="code"> 
                    <em class="iconfont icon-sousuo" v-show="andios != 'ios'" @click.stop="search"></em>
                    <em class="iconfont icon-sousuo" v-show="andios == 'ios'"></em>
                </form>
            </div>
            <div v-for="item in Operator" :key="item.orderId">
                <div class="ov right-text" >   
                    <div class="title">{{item.productName}}</div>
                    <div class="mar-top ov" >
                            <span class="fl">数量:{{item.counts}}</span><span class="fr money">¥{{item.acturalPrice}}</span>
                    </div>
                    <div class="mar-top">{{'下单手机号:'+item.tel}}</div>
                    <div class="mar-top">{{'核销时间：'+item.consumeDate}}</div>   
                </div>
            </div>
        </div>
    </div>
</template>

<script>
let vm;
export default {
    data() {
        return {
            code:'',
            Operator:[],
            andios:'',
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
        vm.query();
        vm.Compatibility();
    },
    methods: {
        query() {
            let url = "/evoucher/getByOperator";
            vm.receiveData.getData(vm, url, "res", function() {
                if(vm.res.success) {
                    vm.Operator=vm.res.result;
                }
            });
        },
        Compatibility(){
            const u = navigator.userAgent, app = navigator.appVersion;
            // iOS 判断
            const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); 
            if (isIOS) {
                vm.andios='ios';
            }
        },
        bycode(){
            document.activeElement.blur();
            let url = "/evoucher/getByCode/"+vm.code;
            vm.receiveData.getData(vm, url, "res", function() {
                if(vm.res.success) {
                    if(vm.res.result.code == null){
                        alert('已消费')
                    }else {
                          vm.$router.push({path:'/cardrollgoods',query:{'code':vm.code}})
                    }
                }else {
                    alert(vm.res.message == null?'劵码错误':vm.res.message);
                }
            });
        },
        //点击搜索
        search(){
            if(!(vm.andios == 'ios')) {
                if(vm.code != '' && vm.code.length == 17) {
                    vm.bycode();
                }
            }
        },
        //点击键盘确定
        tapToSearch() {
            // alert('触发了')
            if(vm.code != '' && vm.code.length == 17) {
                vm.bycode();
            }
        },
        //失去焦点
        tapblur(){
            if(vm.andios == 'ios') {
                if(vm.code != '' && vm.code.length == 17) {
                     vm.bycode();
                }
            }
        }
    }
};
</script>

<style scoped>
.records {
  background: #FFFFFF ;
  position:absolute;
  left:0;
  right:0;
  top:0;
  bottom:0;
}
.search{
    padding:0.2rem 1.1rem;
    border-bottom: 1px solid rgba(187, 187, 187, 1);
}
.search input {
    width: 100%;
    height:0.6rem;
    border: 1px solid #CFCFCF;      
    box-sizing: border-box;
    position: relative;
    padding-right: 0.68rem;
    padding-left: 0.2rem;
    border-radius: 0.3rem;
    outline: none;
}
.search em {
    position: absolute;
    right: 1.13rem;
    top: 0.26rem;
    width: 0.68rem;
    text-align: center;
    font-size: 0.45rem;
}
.ov {
    overflow: hidden;
}
.right-text {
    font-size: 0.22rem;
    background-color:#fff;
    border-bottom: 1px solid rgba(187, 187, 187, 1);
    padding: 22px 5px 22px 26px;
    color:#A29A9A;
}
.title {
    font-size: 0.3rem;
    font-weight: 500;
    color:#000;
}
.mar-top {
    padding-top:0.2rem;
}
.money {
    font-size: 0.3rem;
    color: #F0851F;
    padding-right: 0.2rem;
}
</style>

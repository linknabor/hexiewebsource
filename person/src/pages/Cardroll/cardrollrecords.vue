<template>
    <div class="records">
        <div >
            <div class="search">
                <form  action="javascript:javascript:viod 0" class="fl">
                    <input type="number" pattern="[0-9]*" oninput="this.value=this.value.replace(/\D/g,'');" placeholder="请输入核销劵码" @keyup.13="tapToSearch"  v-model="code"> 
                    <em class="iconfont icon-sousuo" ></em>
                </form>
                <div class="fr search-sub"  :class="{'scolor':code!=''}"  @click.stop="search">核销</div>
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
            faly:true,
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
    },
    methods: {
        query() {
            let url = "/evoucher/getByOperator";
            vm.receiveData.getData(vm, url, "res", function() {
                if(vm.res.success) {
                    vm.Operator=vm.res.result;
                }else {
                    alert(vm.res.message)
                }
            });
        },
    
        bycode(){
            if(vm.faly){
                vm.faly = false;
                let url = "/evoucher/getByCode/"+vm.code;
                vm.receiveData.getData(vm, url, "res", function() {
                    if(vm.res.success) {
                        if(vm.res.result.code == null){
                            alert('核销失败！该券码不存在');
                        }else {
                            if(vm.res.result.status == 2) {
                               alert('核销失败：券码已核销');
                            }else if(vm.res.result.status == 3) {
                               alert('核销失败：券码已过期');
                            }else if(vm.res.result.status == 4){
                                alert('核销失败：券码已退款');
                            }else {
                                vm.$router.push({path:'/cardrollgoods',query:{'code':vm.code}})
                            }
                        }
                    }else {
                        alert(vm.res.message == null?'核销失败！该券码不存在':vm.res.message);
                    }
                    vm.faly = true;
                });
            }


        },
        //点击搜索
        search(){
                if(vm.code != '') {
                    vm.bycode();
                }
        },
        //点击键盘确定
        tapToSearch() {
            // alert('触发了')
            if(vm.code != '') {
                vm.bycode();
            }
        },
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
    padding:0.2rem 0.8rem;
    border-bottom: 1px solid rgba(187, 187, 187, 1);
    overflow: hidden;
}
.search form {
    position:relative;
    width: 75%;
}
.search input {
    width: 100%;
    height:0.6rem;
    border: 1px solid #CFCFCF;      
    box-sizing: border-box;
    padding-right: 0.68rem;
    padding-left: 0.2rem;
    border-radius: 0.3rem;
    outline: none;
}
.search em {
    position: absolute;
    right: 0.03rem;
    top: 0.05rem;
    width: 0.68rem;
    text-align: center;
    font-size: 0.45rem;
}
.search-sub {
    width: 20%;
    height: 0.6rem;
    line-height: 0.6rem;
    text-align: center;
    font-size: 0.3rem;
    background-color: #EEE;
    border-radius: 0.07rem;
}
.scolor {
    color:#fff;
    background-color:#F0851F;
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

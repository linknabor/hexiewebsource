<template>
    <div class="cardrollgoods">
        <div class="goods-warp">
        <div class="centrent">
            <div class="ov">
                <img class="icon-goods fl" :src="item.smallPicture"/>
                <div class="fr goods-r">
                    <span>{{item.name}}</span><br>
                    <span>¥{{item.actualPrice}}</span>
                </div>
            </div>
        </div>
        <div class="goods-hr"></div>
        <div class="goods-message">
             <div>
                <span class="goods-marg15">数量&nbsp;&nbsp;&nbsp;</span><span class="goods-color"> {{item.count}}</span>
            </div>
            <div>
                <span class="goods-marg15">手机号</span><span class="goods-color"> {{item.tel}}</span>
            </div>
        </div>
        </div>
        <div class="goods-hr3"></div>
        <div class="btn" v-show="evoucherOperator">
            <div class="btn-top" @click="btn()">确认核销</div>
            <div class="btn-bott">核销后不可撤回</div>
        </div>
    </div>
</template>

<script>
var vm;
export default {
    data() {
        return {
            code:this.$route.query.code,
            item:{},
            evoucherOperator:'',
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
        vm.info();
    },
    methods: {
        query(){
            let url = "/evoucher/getByCode/"+vm.code;
            vm.receiveData.getData(vm, url, "res", function() {
                if(vm.res.success) {
                    vm.item=vm.res.result;
                }else {
                    alert(vm.res.message == null?'该券码不存在':vm.res.message);
                }
            });
        },
        info() {
            let n = "GET",
                a = "userInfo?oriApp="+vm.getUrlParam('oriApp'),
                i = null,
                d = function() {},
                e = function(n) {
                if(n.success&&n.result==null) {
                        reLogin();
                        return
                }else {
                    vm.evoucherOperator = n.result.serveRole.evoucherOperator;
                    vm.query();
                }
                },
                r = function(n) {
                    alert(vm.n.message);
                };
            vm.common.invokeApi(n, a, i, d, e, r);
        },
        btn(){
            let url = "/evoucher/consume/"+vm.code+"?evouchers=1";
            vm.receiveData.postData(vm, url,{},"res", function() {
                if(vm.res.success) {
                    alert('核销成功');
                    vm.$router.push({path:'/cardrollrecords'})
                }else {
                    alert(vm.res.message == null?'核销失败':vm.res.message);
                }
            });
        },
    },
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
.goods-warp {
    border: 3px solid #F4F4F4;
    border-bottom: none;
    margin: 0.3rem;
    border-radius: 13px;
    box-shadow: 1px 1px 5px 1px #F4F4F4;
    margin-bottom: 0;
    position:relative;
}
.centrent {
    padding: 0.4rem;
    padding-right:0.5rem;
    padding-bottom: 0.2rem;
    font-size:0.3rem;
    letter-spacing: 0.02rem;
}
.ov {
  overflow:hidden;
}
.icon-goods {
    height: 1.6rem;
    width: 1.6rem;
    border: 1px solid #d4cfc8;
    border-radius: 3px
}
.goods-r {
    text-align: right;
}
.goods-r span {
    display:inline-block;
    padding-top:0.3rem;
}

.goods-hr {
    border:1px solid #EEEEEE;
    margin:0 0.3rem;
}
.goods-hr3 {
    border-top: 0.08rem dotted #E7E7E7;
    margin: 0.2rem 0.5rem;
}
.goods-message {
    padding-left: 0.8rem;
    line-height: 0.5rem;
    padding-top: 0.2rem;
    padding-bottom: 0.2rem;
    letter-spacing: 0.02rem;
}
.goods-marg15 {
        margin-right: 1.78rem;
}
.goods-color {
    color:#C9C4CB;
}
.btn {
    /* position: fixed;
    bottom:2rem;
    left:1.2rem;
    right:1.2rem; */
    /* width:2rem;
    height: 1.5rem;; */
    text-align:center;
    font-size: 0.3rem;
    letter-spacing: 2px;
}
.btn-top {
    width: 4.8rem;
    margin: 0 auto;
    height: 0.8rem;
    line-height: 0.8rem;
    background-color: #F08500;
    color: #fff;
    border-radius: 5px;
}
.btn-bott {
    font-size: 0.25rem;
    color:#C8C4C4;
    margin-top:0.2rem;
}
</style>

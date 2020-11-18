<template>
    <div class="cust">
        <img src="../../assets/images/group/tapd_22553051_base64_1599792874_28.png" alt="" v-show="coverup">
    </div>
</template>

<script>
var vm;
import { MessageBox } from "mint-ui";
export default {
    data() {
        return {
            ruleId:'',
            productType:'',
            coverup:false,
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
        vm.query();
    },
    methods: {
        query() {
                vm.receiveData.getData(vm, "/promotion/partner/checkValidation","res",function () {
                    if (vm.res.success) {
                        if(vm.res.result == 'success') {
                            vm.coverup = true;
                        }
                    }else {
                        if (vm.res.errorCode != 40001) {
                            vm.getdetail();
                        }
                    }
                }
                );
            },

     //获取规则id
        getdetail() {
        vm.receiveData.getData(
            vm,
            "/onsales/getPromotion?prodcutType=1003",
            "res",
            function () {
            if (vm.res.success) {
                vm.ruleId = vm.res.result[0].ruleId;
                vm.productType = vm.res.result[0].productType;
                //判断是否是合伙人或是否到期
                MessageBox.alert('请先成为社区合伙人').then( action =>{
                window.location.href = vm.basePageUrl+'group/onsales.html?'+vm.common.getoriApp()+'#/salesdetail?ruleId='+vm.ruleId+'&productType='+vm.productType;
                })
            } else {
                if (vm.res.message != null) {
                    alert(vm.res.message);
                }
            }
            }
        );
        },
    }
};
</script>

<style scoped>
.cust {
    position: absolute;
    top:50%;
    transform: translateY(-50%);
    margin: 0 10%;
}
</style>

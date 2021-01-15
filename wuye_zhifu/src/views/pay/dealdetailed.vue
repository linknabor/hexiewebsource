<template>
    <div >
        <div class="deals">
            <div>
                <div class="title">
                    <img src="../../assets/image/hxlogin.png" alt="">
                    <div>
                        <p class="names">{{deal_detailed.mch_name}}</p>
                        <h4>-{{deal_detailed.total_amt}}</h4>
                    </div>
                </div>
            </div>
            <ul class="content">
                <li>
                    交易方式 : {{deal_detailed.pay_method}}
                </li>
                <li>
                    交易时间 : {{deal_detailed.tran_date}}
                </li>
                <li>
                    交易流水号 : {{deal_detailed.trade_water_id}}
                </li>
                <li class="lines"></li>
                <li>
                    小区名称 : {{sect_name}}
                </li>
                <li id="addss">
                    <ul class="gaps" v-for="(item,index) in deal_detailed.trade_detail" :key="index">
                        <li>
                            业主地址 : {{item.pay_cell_addr}}
                        </li>
                        <li>
                            业主姓名 : {{item.pay_cust_name}}
                        </li>
                        <li>    
                            收费内容 :
                        </li>
                        <li >
                            <ul  v-for="(items,indexs) in item.fee_type_list" :key="indexs">
                                <li >
                                    {{items.fee_name}}                  
                                </li>
                                <li>
                                    {{items.bill_date}}
                                </li>
                            </ul>
                        </li>
                    </ul>    
                </li>
                <li style="margin-bottom:0;">
                    缴费金额: &yen;{{deal_detailed.total_amt}}
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
var vm;
export default {
    data() {
        return {
            sect_name:'',//小区
            deal_detailed:{},
            trade_water_id:this.$route.query.trade_water_id,
            sys_source:this.$route.query.sys_source
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
        //获取交易信息
        query() {
            let url = '/eReceipt/'+vm.trade_water_id+'/'+vm.sys_source;
            vm.receiveData.getData(vm,url,'res',function(){
                if(vm.res.success) {
                    vm.deal_detailed = vm.res.result;
                    vm.sect_name = vm.res.result.trade_detail[0].sect_name;
                }else {
                    alert(vm.res.message);
                }
                
            })
        }
    }
};
</script>

<style scoped>
    .deals {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        overflow: auto;
        background-color:#EEEEEE;
        padding:0.2rem 0.3rem;
    }
    .title {
       text-align: center; 
       margin-top:0.3rem;
       margin-bottom:0.2rem;
       font-size:0.3rem;
       letter-spacing:0.01rem;
    }
    .title img {
        width:1.3rem;
        border-radius: 50%;
    }
    .names{
        margin-top:0.15rem;    
    }
    h4 {
        margin:0.25rem 0;
        color:#040404;
        font-size: 0.45rem;
    }
    .content {
        background-color:#fff;
        border-radius: 0.3rem;
        padding:0.3rem;
        font-size:0.3rem;
        letter-spacing:0.01rem;
    }
    .content li {
        margin-bottom:0.2rem;
    }
    .lines {
        border-top:1px solid #CFCFCF;
    }
    .gaps {
        margin-bottom:0.6rem;
    }
    .deals .content #addss ul:last-child {
        margin-bottom:0;
    }
</style>

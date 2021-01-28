<template>
<div class="notice">
    <div>
        <div class="handertitle">
            <div class="searchboxbt">
                消息推送 → 选择小区
            </div>
        </div>
        <div class="formtable">
            <div class="gridl ov">
                <div class="tab_mianrow" v-for="(item,index) in sectaddress" :key="index" @click="selectadd(item)">
                    <span class="addr_name">{{item.name}}</span><span class="addr">{{item.sect_addr}}</span>
                </div>
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
            sectaddress:[],//小区地址
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
        vm.queryaddress();
    },
    methods: {
        //获取小区
        queryaddress() {
            let url = '/oper/region/16';
                vm.receiveData.getData(vm,url,'res',function(){
                    vm.sectaddress = vm.res.result;
                });
        },
        //监控点击选择小区 获取id
        selectadd(item) {
            vm.$router.push({path:'/mass-content',query:{sect_id:item.sect_id,sect_addr:item.name+item.sect_addr}});
        }
    }
};
</script>

<style scoped>
.notice {
    position:absolute;
    top:0;
    left:0;
    right:0;
    bottom:0;
    background-color:#EEEEEE;
    overflow: auto;
    padding:0.25rem 0.3rem;
}
.handertitle {
    border-radius: 0.2rem;
    background-color: #f69c05;
    color:#fff;
}
.searchboxbt {
    height: 0.8rem;
    line-height: 0.8rem;
    font-size: 0.3rem;
    font-weight: bold;
    text-align: center;
}

.formtable {
    margin-top:0.13rem;
    border-bottom-left-radius: 0.13rem;
    border-bottom-right-radius:0.13rem;
    background:#fff;
    position: absolute;
    right: 0.3rem;
    left: 0.3rem;
    bottom: 0.25rem;
    top: 1.1rem;
    overflow: auto;
}
.tab_mianrow {
    border-bottom: 1px solid #e3ecf5;
    height: 1rem;
    line-height: 1rem;
    font-size: 0.27rem;
    padding:0 0.24rem;
    letter-spacing: 0.02rem;
    background: url('../../assets/images/person/icon_arrow.png') no-repeat;
    background-size: 0.15rem;
    background-position: 99% center;
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
    color:#B1B1B1;
} 

.tab_mianrow .addr_name {
    color:#000;
}
.tab_mianrow .addr {
    font-size: 0.25rem;
}

</style>

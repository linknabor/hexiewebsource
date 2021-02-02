<template>
<div class="notice">
        <div class="tab_mianrow titlecolor">
            <span class="tab_name">小区名称</span> 
            <span class="tab_count">条数</span>
            <span class="tab_date_time">发送日期</span>
        </div> 
        <div class="formtable">
            <div class="tab_mianrow bg" v-for="(item,index) in record" :key="index" @click="pushrecord(item.batch_no)">
                <span class="tab_name add">{{item.sect_name}}</span> 
                <span class="tab_count">{{item.count}}</span>
                <span class="tab_date_time">{{item.date_time}}</span>
            </div>
        </div>
</div>    
</template>

<script>
let vm;
export default {
    data() {
        return {
            record:[],//推送记录
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
        vm.queryrecord();
    },
    methods: {
        //获取小区
        queryrecord() {
            let url = '/hexiemessage/history';
                vm.receiveData.getData(vm,url,'res',function(){
                    if(vm.res.success) {
                        vm.record = vm.res.result.data;
                    }else {
                        alert(vm.res.message);
                    }
                });
        },
        //跳转
        pushrecord(batchNo) {
            location.href = vm.basePageUrl+'smsMsg.html'+'?batchNo=' +batchNo; 
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
.formtable {
    border-bottom-left-radius: 0.2rem;
    border-bottom-right-radius:0.2rem;
    background:#fff;
    position: absolute;
    right: 0.3rem;
    left: 0.3rem;
    bottom: 0.25rem;
    top: 1.05rem;
    overflow: auto;
}
.titlecolor {
    background-color: #f69c05;
    color: #fff;
}
.tab_mianrow{
   font-size: 0.26rem;
   padding:0 0.23rem;
   height: 0.8rem;
   line-height: 0.8rem;
   border-bottom:1px solid #e3ecf5;
}
.formtable .bg {
   background: url('../../assets/images/person/icon_arrow.png') no-repeat;
   background-size: 0.15rem;
   background-position: 99% center;
}
.tab_mianrow  span {
    float:left;
    text-align:center;
}
.tab_name {
    width:40%;
}
.tab_count {
    width: 14%;
    padding: 0 1%;
}
.tab_date_time {
    width:44%;
}
.add {
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
}
</style>

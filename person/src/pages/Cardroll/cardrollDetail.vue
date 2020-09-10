<template>
    <div class="carddetail">
        <div >
            <div class="hander">
                <div class="header-name">{{list.name}}</div>
                <div class="hander-mess">有效期至：{{list.endDate}}</div>
            </div>
            <div class="mrg-b15"> 
                <div class="v-mg03">
                    <span>劵码:</span><span class="color" :class="{'greycolor':list.status == '2' || list.status == '3' || list.status == '4'}">{{code+''+foter_code}}</span><br>
                    <span>数量:</span><span class="color" :class="{'greycolor':list.status == '2' || list.status == '3' || list.status == '4'}">{{list.count}}</span>
                    <img class="used" src="../../assets/images/img/yishiy.png" alt="" v-show="list.status == '2'">
                    <img class="used" src="../../assets/images/img/guoqi.png" alt="" v-show="list.status == '3'">
                    <img class="used" src="../../assets/images/img/tuikuan.png" alt="" v-show="list.status == '4'">
                </div>   
            </div>
            <div class="footer"  v-show="list.qrcode != null"> 
                <img :src="list.qrcode" alt="">
            </div>
        </div>    
    </div>
</template>

<script>
var vm;
export default {
    data() {
        return {
            orderId:this.$route.query.orderId,
            list:{},
            code:'',
            foter_code:'',
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
        query(){
            let url = "/evoucher/getByOrder/"+vm.orderId;
            vm.receiveData.getData(vm, url, "res", function() {
                if(vm.res.success) {
                    vm.list = vm.res.result;
                    var cull_code = vm.list.code.slice(0,vm.list.code.length-5);
                    vm.code = cull_code.replace(/\s/g,'').replace(/(.{4})/g,"$1 ");
                    vm.foter_code = vm.list.code.slice(vm.list.code.length-5,vm.list.code.length);
                }else {
                    alert(vm.res.message)
                }
            });
        },
    }
};
</script>

<style scoped>
.carddetail {
  background: white;
  position:absolute;
  left:0;
  right:0;
  top:0;
  bottom:0;
}
.hander {
    margin:0.8rem 0;
    text-align: center;
    font-size: 0.45rem;
    font-weight: 500;
    font-family: PingFangSC-regular;
    color: rgba(16, 16, 16, 1);
}
.header-name {
    letter-spacing: 0.02rem;
}
.hander-mess {
    color: rgba(162, 154, 154, 1);
    font-size: 0.25rem;
    margin-top: 0.1rem;
    letter-spacing: 0.02rem;
}
.v-mg03 {
    padding-left: 0.5rem;
    font-size: 0.35rem;
    position: relative;
}
.used {
    position:absolute;
    width: 1.1rem;
    top: -0.17rem;
    right: 0.7rem;
}
.color {
    color:#F08500;
}
.greycolor {
    color:#A29A9A;  
}
.mrg-b15 {
    margin-bottom: 0.4rem;
    letter-spacing: 0.02rem;
}
.footer {
    padding: 5px 15%;
    margin: 0 10%;
    box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.4);
    /* border: 1px solid rgba(255, 255, 255, 0); */
}
</style>

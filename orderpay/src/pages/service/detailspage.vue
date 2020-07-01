<template>
    <div class="det">
        <div class="topLine">
            <div class="fl dtp-img">
                <img src="../../assets/images/fu.png" alt />
            </div>
            <div class="fl">
                <span>{{service_order.service_title}}</span>
            </div>
            <div class="fr" v-show="!(service_order.price == 0)">
                <span>¥{{service_order.price}}</span>
            </div>
         </div>
        <div>
            <div class="dtp-wt">
                服务描述
            </div>
            <div class="content">
                <div v-html="service_order.context"></div>
            </div>
        </div>
        <div style="height:1rem"></div>
        <div class="btn-fixed">
            <div class="btn" @click="paybtn()">立即下单</div>
        </div>
    </div>
</template>

<script>
let vm;
export default {
    data() {
        return {
            service_order:JSON.parse(window.localStorage.getItem('service_order')),
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
       
    },
    methods: {
        Homepage(){
            
        },
        paybtn() {
            vm.$router.push({path:'/singlepage'})
        }
    }
};
</script>

<style scoped>
.det {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color:#fff;
}
.topLine {
    margin-top: 0.3rem;
    padding: 0.2rem 0.3rem;
    background: #fff8ee;
    line-height: 19px;
    border-top: 1px solid #e5e2dd;
    border-bottom: 1px solid #e5e2dd;
    height: 19px;
    font-size: 0.3rem;
    color: #ff8000;
}
.dtp-img  {
    width: 0.4rem;
    margin-right: 0.3rem;
}
.dtp-img img {
    width: 100%;
    vertical-align: bottom;
}
.dtp-wt {
    padding: 0.2rem 0.3rem;
    font-size: 0.3rem;
    color:#FB9447;
}
.content {
    margin:0 0.2rem;
    word-wrap: break-word;
    word-break: break-all;
    border-bottom:2px solid #ECECEC;
}

.btn-fixed {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
}
.btn {
    display: block;
    margin: 0.2rem;
    height: 0.8rem;
    line-height: 0.8rem;
    color: #fff!important;
    font-size: 0.35rem;
    text-align: center;
    background-color: #ff8a00;
    border-radius: 3px;
    outline: none;
    border: none;
    text-decoration: none;
}
</style>

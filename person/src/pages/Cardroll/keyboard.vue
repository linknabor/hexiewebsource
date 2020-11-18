<template>
    <div class="wapkey">
        <div class="context">
            <input type="text" class="key-text" pattern="[0-9]*" maxlength="17" oninput="this.value=this.value.replace(/\D/g,'');" placeholder="请输入核销劵码" @focus="showcountF" ref="address" v-model="code">
        </div>
        <div class="mian">
        <div class="num">
            <div @click="getnum"><a href="javascript:void(0);" >1</a></div>
            <div @click="getnum"><a href="javascript:void(0);" >2</a></div>
            <div @click="getnum"><a href="javascript:void(0);" >3</a></div>
        </div>
         <div class="num">
            <div @click="getnum"><a href="javascript:void(0);">4</a></div>
            <div @click="getnum"><a href="javascript:void(0);">5</a></div>
            <div @click="getnum"><a href="javascript:void(0);">6</a></div>
        </div>
         <div class="num">
            <div @click="getnum"><a href="javascript:void(0);">7</a></div>
            <div @click="getnum"><a href="javascript:void(0);">8</a></div>
            <div @click="getnum"><a href="javascript:void(0);">9</a></div>
        </div>
        <div class="num">
            <div @click="getnum"><a href="javascript:void(0);">0</a></div>
            <div class="num-yan"><a href="javascript:void(0);" @click="getkey">验证</a></div>
            <!-- <div>验证</div> -->
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
        };
    },
    created() {
        vm=this;
    },
    components: {

    },
    computed: {

    },
    mounted() {

    },
    methods: {
        //禁止唤起默认键盘
        showcountF() {
            document.activeElement.blur();
        },
        //获取点击的数字
        getnum(event){
            vm.code +=event.target.innerText;
        },
        //验证
        getkey(){
            if(vm.code != '' && vm.code.length == 17){
                vm.$router.push({path:'/cardrollgoods',query:{'code':vm.code}})
            }
        },

    }
};
</script>

<style scoped>
.wapkey {
  background: #FFFFFF ;
  position:absolute;
  left:0;
  right:0;
  top:0;
  bottom:0;
}
.context {
    margin:5% 5% 15%;
}
.key-text {
    width: 100%;
    height: 1.26rem;
    border: none;
    outline: none;
    background-color: #F2F2F2;
    text-indent: 0.3rem;
    font-size: 0.35rem;
    letter-spacing: 0.05rem;
    
}
.mian {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly; 
    height: 70%;
}
.num {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    /* margin-bottom: 1rem; */
}
.num div {
    width: 1.66rem;
    height: 1.66rem;
    border-radius: 0.83rem;
    line-height: 1.66rem;
    border: 1px solid #DDDDDD;
    font-size: 0.6rem;
    font-weight: 600;
    text-align: center;
}
.num a {
    border-radius: 0.83rem;
    display: block;
    color: #000;
}
.num a:active {
    background: #e0e0e0;
}
.num .num-yan {
    width: 3.95rem;
    height: 1.66rem;
    background-color:#D2D2D2;
    color:#fff;
}
.num .num-yan a {
    color:#fff;
}
</style>

<template>
    <div >
        <div v-show="falg">
            <canvas id="canvas"></canvas>
            <img :src="imgUrl" id="bg" crossOrigin="Anonymous">
        </div>
        <img :src="imgs" alt="">
        <img :src="item.qrcode" alt="" style="display:none">
    </div>
</template>

<script>
var vm;
import wx from 'weixin-js-sdk';
export default {
    data() {
        return {
            item:{},
            imgUrl:'',
            falg:false,
            imgs:''
        };
    },
    created() {
        vm  = this;
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
             vm.receiveData.getData(vm, "/queryPromotionOrder?orderType=13", "res", function() {
                if(vm.res.success) {
                    if(vm.res.result == 0 ) {
                         vm.order();
                    }
                    else {
                        vm.$router.push({path:'/salescoupon'})
                    }
                }else {
                      if(vm.res.message!=null) {
                       alert(vm.res.message);
                      }
                }
            })
        },
        order (){
            vm.receiveData.getData(vm, "/evoucher/getDefaultPromotion", "res", function() {
                if(vm.res.success) {
                    vm.item = vm.res.result;
                    vm.bgload();
                }else {
                    if(vm.res.message!=null) {
                       alert(vm.res.message);
                    }
                }
                
            })
        },
        bgload(){
            vm.imgUrl='http://img.e-shequ.com/FogXNV1BmqMXGGTQ-LDyVr1rkRZk';
            var w = document.documentElement.clientWidth || document.body.clientWidth;
            var h = document.documentElement.clientHeight || document.body.clientHeight;
            var bg=document.getElementById("bg");
            var imgCode=vm.item.qrcode;
            var canvas="";
            bg.onload= function() {
                canvas=document.getElementById("canvas");
                var ctx=canvas.getContext("2d");
                var getPixelRatio = function (context) {
                    var backingStore = context.backingStorePixelRatio ||
                        context.webkitBackingStorePixelRatio ||
                        context.mozBackingStorePixelRatio ||
                        context.msBackingStorePixelRatio ||
                        context.oBackingStorePixelRatio ||
                        context.backingStorePixelRatio || 1;
                    return (window.devicePixelRatio || 1) / backingStore;
                };
                canvas.style.width = w + 'px';
                canvas.style.height = h + 'px'
                var ratio = getPixelRatio(ctx);
                canvas.width = w  * ratio;
                canvas.height = h  * ratio;  
                var img= new Image();
                img.src=imgCode;
                    ctx.drawImage(bg, 0, 0, ctx.canvas.width, ctx.canvas.height);
                    ctx.drawImage(img, canvas.width-canvas.height/4, canvas.height-canvas.height/8-10, canvas.height/8, canvas.height/8); 
                    vm.imgs =canvas.toDataURL("image/jpeg"); 
                    vm.falg =false;
                    $('#bg').hide();
                }
        },    
    }
};

</script>

<style scoped>

</style>

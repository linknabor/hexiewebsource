<template>
    <div >
        <div v-show="falg">
            <canvas id="canvas"></canvas>
            <img :src="imgUrl" id="bg" crossOrigin="Anonymous">
        </div>
            <img id="imgs" :src="imgs" alt="" width="750" height="1334">
           <img :src="item.qrcode" alt="" style="display:none">
    </div>
</template>

<script>
var vm;
import wx from 'weixin-js-sdk';
export default {
    data() {
        return {
            orderId:'',
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
             vm.receiveData.getData(vm, "/queryPromotionOrder", "res", function() {
                if(vm.res.success) {
                    if(vm.res.result == 0 ) {
                        vm.getdetail();
                    }
                    else {
                        vm.orderId = vm.res.result;
                        vm.order();                      
                    }
                }else {
                      if(vm.res.message!=null) {
                       alert(vm.res.message);
                      }
                }
            })
        },
        order (){
            vm.receiveData.getData(vm, "/evoucher/getByOrder/"+vm.orderId, "res", function() {
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
        getdetail() {
            vm.receiveData.getData(vm, "/onsales/getPromotion", "res", function() {
                if(vm.res.success) {
                    vm.$router.push({path:'/salesdetail',query:{ruleId:vm.res.result[0].ruleId,productType:vm.res.result[0].productType}})
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

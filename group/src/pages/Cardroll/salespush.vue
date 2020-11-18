<template>
    <div class="add">
        <div v-show="falg">
            <canvas id="canvas"></canvas>
            <img :src="imgUrl" id="bg" crossOrigin="Anonymous">
        </div>
        <img :src="imgs" alt="" @click="good">
    </div>
</template>

<script>
var vm;
export default {
    data() {
        return {
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
        vm.bgload();
    },
    methods: {

        bgload(){
            vm.imgUrl='http://img.e-shequ.com/FszR3YBT5tH_TMtKe4TuIvk2tE3p';
            var w = document.documentElement.clientWidth || document.body.clientWidth;
            var h = document.documentElement.clientHeight || document.body.clientHeight;
            var bg=document.getElementById("bg");
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
                    ctx.drawImage(bg, 0, 0, ctx.canvas.width, ctx.canvas.height);
                    vm.imgs =canvas.toDataURL("image/jpeg"); 
                }
        }, 
        good() {
            vm.$router.push({path:'/salesnabo'})
        }   
    }
};

</script>
<style >
</style>
<style scoped>
img {
    vertical-align: top;
}
</style>

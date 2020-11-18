<template>
    <div class="getcoupons">
        <div class="getcolor">
            <div>
                <img alt="" src="http://img.e-shequ.cn/Fqutep8d0GYcSVEGlTgxtZo6aDbv" style="width:100%">
            </div>
            <div class="content" >
                <div class="coupon ov"  v-for="(item,index) in coupons" :key="item.id" >
                    <div class="fl coupon-left " >
                        <div class="tSemicircle"></div>
                        <div class="fl number" :class="{'Received-l' : item.gained == true || item.usedup == true}">
                            <span class="rmb">¥</span>
                            <span class="f48">{{item.amount}}</span>
                        </div>
                        <div class="ov describe" :class="{'Received-l' : item.gained == true || item.usedup == true}">
                            <span class="text1" :class="{'Received-l' : item.gained == true || item.usedup == true}">{{item.title}}</span>
                            <span class="text3 ellipsis2">{{item.couponDesc}}</span>
                            <span class="text3" v-show="item.useEndDate !=null">{{item.useStartDateStr}}-{{item.useEndDateStr}}</span>
                            <span class="text3" v-show="item.useEndDate ==null">领取后{{item.expiredDays}}天有效</span>
                        </div>
                        <div class="bSemicircle"></div>
                    </div>
                    <div class="fl coupon-right"  :class="{'Received-r' :item.gained == false && item.usedup == true}">
                        <div class="receive" v-show="item.gained == false"  @click="getreceive(item,index)">
                            <span>立即</span><br>
                            <span>领取</span>
                        </div>
                        <div class="receive"  v-show="item.gained == true" @click="used(item)">
                            <span>点击</span><br>
                            <span>使用</span>
                        </div>
                        <div class="iconimg" v-show="item.gained == true">
                            <span>已领取</span>
                        </div>

                        <div class="iconimg" v-show="item.gained == false && item.usedup == true">
                            <span>已抢完</span>
                        </div>
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
            useed:true,
            draw:true,
            Received:false,
            coupons:[],
            couponList:[]
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
        vm.getcoupon();
    },
    methods: {
        getcoupon(){
            vm.receiveData.getData(vm,'/coupon/v2/seedList', "res", function() {
                if(vm.res.success) {
                    if(vm.res.result !=null) {
                        vm.coupons = vm.res.result; 
                    }
                    if((Array.isArray(vm.coupons) && vm.coupons.length === 0)) {
                            alert('暂无可领取优惠券，敬请期待！');
                            location.href=vm.basePageUrl+'wuye/index.html?'+vm.common.getoriApp()
                    }  
                               
                }else {
                    alert("您暂未绑定房屋，请前往“我是业主”\r\n进行操作，感谢！");
                    location.href=vm.basePageUrl+'wuye/index.html?'+vm.common.getoriApp()+'#/myhouse';
                }
            });
        },
        getreceive(item,index) {
             //改变状态限制已领取的
            if(item.usedup) {
                return
            }
            if(item.gained){
                return;
            }else {
                vm.$set(vm.coupons[index],'gained',true);
                vm.receiveData.getData(vm,'/coupon/v2/gain/'+item.seedStr, "res", function() {
                    if(vm.res.success) {
                        item.gained = true;
                    }else {
                        alert(vm.res.message);
                    }
                });
            }
        },
        //点击使用
        used(item) {
            if(item.usedup) {
                return
            }
            location.href = item.suggestUrl;
        }
    }
};
</script>

<style scoped>
.getcoupons {
    position:absolute;
    top:0;
    left:0;
    right: 0;
    bottom:0;
    background-color:#F5F5F5;
    overflow: auto;
}
.getcolor {
    background-color:#F5F5F5;
}
.content {
    padding: 4%;
    padding-bottom: 0;
}
.coupon {
    width:100%;
    height:1.6rem;
    background-color:#fff;
    margin-bottom:4%;
    border-radius: 0.1rem;
}
.coupon-left {
    width:75%;
    height: 100%;
    position: relative;
    padding-right: 0.2rem;
    border-right: 1px dashed #BBBBBB;
    box-sizing: border-box;
}
.coupon-right {
    width:25%;
    height: 100%;
    background-color:#F08500;
    color:#fff;
    padding-left: 0.2rem;
    box-sizing: border-box;
    text-align: center;
    letter-spacing: 0.04rem;
    position: relative;
}
.coupon-right .receive span {
    font-size: 0.33rem;
    display: inline-block;
    margin-top:0.25rem;
}
.number {
    width: 35%;
    height: 100%;
    line-height: 1.6rem;
    text-align: center;
    color:#F08500;
}
.rmb {
    font-size:0.24rem;
}
.f48 {
    font-size: 0.6rem;
    font-weight: 600;
}
.tSemicircle {
    width: 0.4rem;
    height: 0.4rem;
    background-color: #F5F5F5;
    border-radius: 50%;
    position: absolute;
    top: -0.2rem;
    right: -0.2rem;
    z-index: 999;
}
.bSemicircle {
    width: 0.4rem;
    height: 0.4rem;
    background-color: #F5F5F5;
    border-radius: 50%;
    position: absolute;
    bottom: -0.2rem;
    right: -0.2rem;
    z-index: 999;
}
.describe {
    height: 100%;
}
.describe span{
    display:block;
    margin-top:0.16rem;
}
.describe .ellipsis2 {
    display: -webkit-box;
    display: -moz-box;
    text-overflow: -o-ellipsis-lastline;
    text-overflow: ellipsis;
    overflow: hidden;
    -webkit-line-clamp: 2; /*控制文本行数，多少行以后开始省略号 */
    line-clamp: 2;
    -webkit-box-orient: vertical;
}
.text1 {
    font-size: 0.33rem;
    color: #F08500;
}
.text3 {
    font-size: 0.2rem;
}
.getcoupons .Received-l {
    color:#C8C4C4;
}
.getcoupons .Received-r{
    background-color:#E8E8E8;
}
.iconimg {
    width: 1rem;
    height: 1rem;
    line-height: 1rem;
    border:2px solid #C8C4C4;
    border-radius: 50%;
    position:absolute;
    top:50%;
    left:-54%;
    text-align: center;
    transform: translate(35%,-50%);
    box-sizing: border-box;
}
.iconimg span {
    display: inline-block;
    transform: rotate(45deg);
    color:#C8C4C4;
}

</style>

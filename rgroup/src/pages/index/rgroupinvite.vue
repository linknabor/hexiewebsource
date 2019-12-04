<template>
   <div class="invite">
       <div style="background-color:#fff;">
         <div   @click="gotosgrouprulr" style="width:100%;">
                 <img alt="" src="../../assets/images/index/img_tuangou_zhifu.png" style="width: 100%;">
        </div>  
        <div class="rule_intro"  @click="gotosgrouprulr" style="width:100%;">
                 <img alt="" src="../../assets/images/index/img_tuangou_zhifu.png" style="width: 100%;">
        </div>
           
        <div class="divider"></div>

        <div class="mt2 bb3">
            <div  v-if="rule.leftSeconds >= 0">
                <div class="time-wrap">
                <span class="time-text">剩余</span>
                <span  v-if="left.days!='00'"><span class="time-number">{{left.days}}</span>天</span>
                <span class="time-number">{{left.hours}}</span><span>时</span>
                <span class="time-number">{{left.minitus}}</span><span >分</span>
                <span ><span class="time-number" >{{left.seconds}}</span>秒</span>
                <span class="time-text">结束</span>
                </div>
                <div class="mt1 fs15 mb25" style="text-align: center;">
                    <span v-if="rule.groupMinNum-rule.currentNum <= 0">
                        成功啦，还没加入的小伙伴抓紧啦！马上要发货咯！
                    </span>
                    <span v-if="rule.groupMinNum-rule.currentNum > 0">
                        还差<span class="highlight">{{rule.groupMinNum-rule.currentNum}}</span>份就可以成团发货啦
                    </span>
                </div>
		    </div>

            <div  v-if="rule.leftSeconds < 0">
                <div class="mt1 fs15 mb25" style="text-align: center;">
                    <span v-if="rule.groupMinNum-rule.currentNum <= 0">
                        团购成功！错过的小伙伴可以逛逛其他商品
                    </span>
                    <span v-if="rule.groupMinNum-rule.currentNum > 0">
                        很遗憾，没达到目标人数哦，再去逛逛其他商品吧！
                    </span>
                </div>
		    </div>
        </div>

        <!-- 轮播图 -->
        <div>
            <swiper v-if="product.pictureList.length>0" :options="swiperOption" ref="mySwiper">
                <swiper-slide  v-for="(picture,index) in  product.pictureList" :key="index">
                    <div class="ban1" >
                            <img :src="picture" alt="">
                            <!-- <img src="../../assets/images/index/bg_index.png" alt=""> -->
                    </div> 
                </swiper-slide>
                <div class="swiper-pagination" slot="pagination"></div>       
            </swiper>
        </div>

        <div class="product-info p15">
            <div class="product-detail-name fs16">{{rule.name}}</div>
            <div style="width: 100%;height:30px;">
                <div class="highlight fs22 fl three_div">¥&nbsp;{{rule.price}}&nbsp;</div>
                <div class="highlight fl fs14 three_div" style="padding-top:8px">{{rule.discount}}&nbsp;</div>
                <div class="ori-price2 three_div"  style="padding-top:8px">运费&nbsp;&nbsp;<span class="highlight">¥{{rule.postageFee}}</span></div>
            </div>
            <div style="width: 100%;height:20px">
                <div class="ori-price2 fl three_div">市场价<del>¥&nbsp;{{product.oriPrice}}</del></div>
                <div class="ori-price2 fl three_div">目标份数<span class="highlight" >{{rule.groupMinNum}}</span>份</div>
                <div class="ori-price2 three_div"  v-if="rule.freeShippingNum<999"><span class="highlight">{{rule.freeShippingNum}}</span>件包邮</div>
            </div>
            <div style="width:100%;height:1px">&nbsp;</div>
	    </div>
        <div style="width:100%;height:80px">&nbsp;</div>

        <div class="btn-fixed" v-if="share_page!='1'">
            <span  class="fl" 
                style="height:40px;line-height:40px;color:#fff;width:36%;background-color:#444;text-align:center;font-size:20px;" @click="golist()">
                更多团购
            </span>
            <span  class="fl" 
                style="height:40px;line-height:40px;color:#fff; width:64%;background-color:#ff8a00;text-align: center;font-size:20px;"  @click="goGroupProduct()"   :class="{useless:rule.leftSeconds < 0}">
                马上参团
            </span>
        </div>
        <div v-if="share_page=='1'">
            <div style="position: fixed;bottom:5px;left:5px;right:5px;text-align:center;background-color: #ff8600;height:40px;color:#ffffff;font-size: 16px;line-height: 40px;z-index: 10000">
                点击右上方分享，邀请好友一起参与
            </div>
        </div>
    </div>            
   </div>
</template>

<script>
let vm;
import wx from 'weixin-js-sdk';
export default {
   data () {
       return {
        ruleId:this.$route.query.ruleId,//参数
        share_page:this.$route.query.share,
        finished:true,
        showDetail: false,
        left:{ //剩余时间
            days:"0",
            hours:"0",
            minitus:"0",
            seconds:"0"
            },
        product: {
            pictureList:[],
        },
        rule:{
            currentNum:0,
        },
         swiperOption:{//轮播图
                notNextTick:true,
                // autoplay:false,
                autoplay: {
                    disableOnInteraction:false,
                    delay:6000
                },
                pagination: {
                el: '.swiper-pagination'
                },
                loop: true,
            },
       };
   },
   created() {
       vm=this;
   },
   mounted() {
        let url = location.href.split('#')[0];
        vm.receiveData.wxconfig(vm,wx,['onMenuShareTimeline','onMenuShareAppMessage'],url);
        vm.query();
   },

   components: {},

   methods: {
  
    query() {
        let url ="getRgroupRule/"+vm.ruleId;
        vm.receiveData.getData(vm,url,'Data',function(){
            if(vm.Data.success) {
                    if(vm.Data.result) {
                    vm.rule=vm.Data.result;                          
                    vm.products(vm.rule.productId)
                    setInterval(vm.updateLeftTime,1000);//倒计时 
                    }
            }else {    
                alert(vm.Data.message==null?"获取团购信息失败！":vm.Data.message);
            }
        });  
    },
    products(productId) {
        let url ="getProduct/"+productId;
            vm.receiveData.getData(vm,url,'res',function(){
                if(vm.res.success) {
                    if(vm.res.result) {
                        vm.product = vm.res.result;     
                        vm.initShareSetting(vm.product)
                    }
                }else {
                    alert(vm.res.message==null ?"获取产品信息失败！":vm.res.message);
                }
        });
    },
    initShareSetting (product) {
        var title = vm.rule.name;
		var link=vm.basePageUrlpay+"hxrgroups.html?"+vm.common.getoriApp()+"#/rgroupinvite?ruleId="+vm.ruleId;
		var img=product.smallPicture;
		var desc="我在"+vm.common.newname+"参与了一个"+vm.rule.name+"的团购，大家一起来参与吧";
		vm.common.initShareConfig(title,link,img,desc,wx)
    },
    //剩余时间
    updateLeftTime() {
        if(vm.rule.leftSeconds > 0){
			vm.finished = false;
			vm.rule.leftSeconds=vm.rule.leftSeconds-1;
			var iRemain = vm.rule.leftSeconds;
			var days=parseInt(iRemain/86400);
			vm.left.days = days<10?"0"+days:days;
			iRemain%=86400;

			var hours=parseInt(iRemain/3600);
			vm.left.hours = hours<10?"0"+hours:hours;
			iRemain%=3600;

			var minitus = parseInt(iRemain/60);
			vm.left.minitus = minitus<10?"0"+minitus:minitus;
			iRemain%=60;

			vm.left.seconds=iRemain<10?"0"+iRemain:iRemain;
		}else{
			vm.finished = true;
		}
    },
    //团购规则
    gotosgrouprulr() {
        vm.$router.push({path:'/sgrouprule'})
    },
    golist() {
       location.href=vm.basePageUrlpay+"hxrgroups.html?"+vm.common.getoriApp()+"&type="+vm.rule.productType;
    },
    goGroupProduct() {
        vm.$router.push({path:'/rgroupdetail',query:{'ruleId':vm.ruleId}})
    }
   },

   computed: {},
}
</script>

<style  scoped>
.invite {
    position: absolute;;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #fff;
}
.rule_intro{
	    position: fixed;
	    top: 0;
	    z-index: 10;
		background:#f7f7f1;
}
.divider {
    border-bottom: 10px solid #f7f7f2;
}
.bb3 {
    border-bottom: 5px solid #f7f7f1;
}
.mt2 {
    margin-top: .5rem;
}
.time-wrap {
    text-align: center;
    height: 48px;
}
.time-text {
    font-size: 18px;
    color: #996c33;
    margin-left: 5px;
    margin-right: 5px;
}
.time-number {
    font-size: 17px;
    padding: 4px 6px;
    color: white;
    background: url(../../assets/images/index/img_time.png) no-repeat;
    background-size: 100% 100%;
}
.mt1 {
    margin-top: .3rem;
}
.fs15 {
    font-size: 15px;
}
.mb25 {
    margin-bottom: 25px;
}
.highlight {
    color: #ff8a00;
}
.product-info {
    clear: both;
    background-color: #E2E2E2;
}
.p15 {
    padding: 15px;
}
.fs16 {
    font-size: 16px;
}
.product-detail-name {
    height: 40px;
    color: #000000;
    line-height: 20px;
    text-overflow: ellipsis;
    overflow: hidden;
}
.three_div {
    width: 33%;
    float: left;
}
.highlight {
    color: #ff8a00;
}
.fs22 {
    font-size: 22px;
}
.ori-price2 {
    font-size: 14px;
    color: #999999
}
useless {
    background-color: #D7D5D4;
}
</style>
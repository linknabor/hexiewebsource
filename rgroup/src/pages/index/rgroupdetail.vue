<template>
   <div class="controller">
        <!-- load -->
		<div class="load6" id="LoadingBar" v-show="load">
			<div class="bounce1"></div>
			<div class="bounce2"></div>
			<div class="bounce3"></div>
		</div>
		<div id="fade" class="black_overlay" v-show="load">
		</div>
         <!-- load -->
        <!-- <div class="rule_intro" @click="gotosgrouprulr">
                 <img alt="" src="../../assets/images/index/img_tuangou_zhifu.png" style="width: 100%;">
        </div> 
        <div style="width:100%;">
            <img alt="" src="../../assets/images/index/img_tuangou_zhifu.png" style="width: 100%;"/>
        </div> -->
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
                    <div class="ori-price2 fl three_div" style="margin-top:3%"><span>满<span class="highlight" >{{rule.groupMinNum}}</span>人开通</span></div>
                    <!-- <div class="highlight fl fs14 three_div" style="padding-top:8px">{{rule.discount}}&nbsp;</div> -->
                    <!-- <div class="ori-price2 three_div"  style="padding-top:8px">运费&nbsp;&nbsp;<span class="highlight">¥{{rule.postageFee}}</span></div> -->
                </div>
                <div style="width: 100%;height:20px">
                    <!-- <div class="ori-price2 fl three_div">市场价<del>¥&nbsp;{{product.oriPrice}}</del></div>
                    <div class="ori-price2 fl three_div">目标份数<span class="highlight" >{{rule.groupMinNum}}</span>份</div>
                    <div class="ori-price2 three_div" ms-visible="rule.freeShippingNum<999"><span class="highlight">{{rule.freeShippingNum}}</span>件包邮</div> -->
                </div>
                <div style="width:100%;height:1px">&nbsp;</div>
	    </div>
        <!-- //剩余时间 -->
        <div class="mt2 time-wrap bb3" v-if="!finished">
                <span class="time-text">剩余</span>
                <span v-if="left.days!='00'"><span class="time-number">{{left.days}}</span>天</span>
                <span class="time-number">{{left.hours}}</span><span>时</span>
                <span class="time-number">{{left.minitus}}</span><span >分</span>
                <span ><span class="time-number" >{{left.seconds}}</span>秒</span>
                <span class="time-text">结束</span>
    	</div>
        <div class="mt2 time-wrap bb3  fs18" v-if="finished">
		    已结束
	    </div>

        <div class="rgroup-info bb3" id="products">
            <div class="fl " style="margin-top:23px;margin-left:15px;color:#999;font-size: 14px;">报名进度</div>
            <div class="fr plr10" style="border-left:#d5d59d 1px solid ;"  id="processImg">
              <canvas width="70px" height="70px" ></canvas>
            </div>
            <div class="fr" style="margin-top:23px;color:#333;font-size: 15px;margin-right: 15px;">已报名人数<span style="color:#FF9933;font-size:15px;margin-left: 5px;">{{rule.currentNum}}</span></div>
	    </div>

        <div class="p15 mb15">
            <div class="section-title" style="padding-left:0px;padding-top:0px;"  @click="toggleDetail">
                报名规则
                <i class="icon more-icon align-right fr" :class={topIcon:showDetail}></i>
            </div>
            <ul class="" style="padding-top: 3px;">
                <li class="detail-item" v-html="product.serviceDesc"></li>
            </ul>
            <ul class=""  v-if="showDetail" style="padding-top: 3px">
                <li class="detail-item" v-html="product.serviceDescMore"></li>
            </ul>
	    </div> 

        <div class="activityTitleLine" style="margin-bottom: 85px;display: block;" >
             <span class="more_btn" @click="goclassify()">点击查看更多商品</span>
        </div>

        <div class="btn-home-fixed" style="color: white; position: fixed;width: 100%;bottom: 0px;">
            <!-- <span  class="fl" 
                style="height:40px;line-height:40px;width:36%;background-color:#444;text-align:center;font-size:15px;" @click="goclassify()">
                更多团购
            </span>
            <span  class="fl" 
                style="height:40px;line-height:40px;width:64%;background-color:#ff8a00;text-align: center;font-size:15px;"  @click="buy" :class="{useless:rule.leftSeconds < 0}">
                马上参团
            </span> -->
            <span  class="fl" 
			    style="height:40px;line-height:40px;width:100%;background-color:#ff8a00;text-align: center;font-size:15px;"  @click="buy" :class="{useless:rule.leftSeconds < 0}">
			    马上报名
		    </span>
    	</div>

   </div>
</template>

<script>
let vm;
import {swiper,swiperSlide} from 'vue-awesome-swiper';
import wx from 'weixin-js-sdk';
export default {
   data () {
       return {
           load:true,
           finished:false,
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
           ruleId:this.$route.query.ruleId,//参数
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
   created(){
       vm=this;
   },
   mounted() {
        // this.common.checkRegisterStatus()
         let url = location.href.split('#')[0];
        vm.receiveData.wxconfig(vm,wx,['onMenuShareTimeline','onMenuShareAppMessage'],url);
        
       vm.read();
     vm.query()
   },
   updated(){
       vm.drawP()
   },

   methods: {
        read() {
            if(vm.ruleId!=""){
                vm.query()
            }
        },
        query() {
            let url ="getRgroupRule/"+vm.ruleId;
                vm.receiveData.getData(vm,url,'Data',function(){
                    if(vm.Data.success) {
                         if(vm.Data.result) {
                             vm.load=false;
                            vm.rule=vm.Data.result;                          
                            vm.products(vm.rule.productId)
                           setInterval(vm.updateLeftTime,1000);//倒计时 
                         }
                    }else {    
                        vm.load=false;                  
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
			                vm.common.initShareConfig('代扔垃圾服务报名，限时优惠中！',vm.basePageUrl+"rgroups.html?state=123#/rgroupdetail?ruleId="+vm.ruleId,vm.product.smallPicture,"小区报名满50人开通",wx);

                        }
                    }else {
                        alert(vm.res.message==null ?"获取产品信息失败！":vm.res.message);
                    }
            });
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
        //canvas
        drawP() {
            vm.drawProcess($("#products canvas")[0],35,35,28,vm.rule.process,'#E5E2DD','#FF8A00','#FF8A00')
        },
         drawProcess(canvas,x,y,radius,process,backColor,proColor,fontColor){
                if(process == undefined || process == null) {
                    return;
                }
                if (canvas.getContext) {
                    var cts = canvas.getContext('2d');
                }else{
                    return;
                }
                //画圆
                cts.beginPath();  
                // 坐标移动到圆心  
                cts.moveTo(x, y);  
                // 画圆,圆心是24,24,半径24,从角度0开始,画到2PI结束,最后一个参数是方向顺时针还是逆时针  
                cts.arc(x, y, radius, 0, Math.PI * 2, false);  
                cts.closePath();  
                cts.fillStyle = backColor;  
                cts.fill();

                //画扇形
                cts.beginPath();  
                // 画扇形的时候这步很重要,画笔不在圆心画出来的不是扇形  
                cts.moveTo(x, y);  
                // 跟上面的圆唯一的区别在这里,不画满圆,画个扇形  
                cts.arc(x, y, radius, Math.PI * 1.5, Math.PI * 1.5 +  Math.PI * 2 * process / 100, false);  
                cts.closePath();  
                cts.fillStyle = proColor;  
                cts.fill(); 
                
                //填充背景白色
                cts.beginPath();  
                cts.moveTo(x, y); 
                cts.arc(x, y, radius - (radius * 0.04), 0, Math.PI * 2, true);  
                cts.closePath();
                cts.fillStyle = 'rgba(255,255,255,1)';  
                cts.fill(); 

                // 画一条线  
                cts.beginPath();  
                cts.arc(x, y, radius-(radius*0.04), 0, Math.PI * 2, true);  
                cts.closePath();  
                // 与画实心圆的区别,fill是填充,stroke是画线  
                cts.strokeStyle = backColor;  
                cts.stroke();  
                
                //在中间写字 
                cts.font = "8pt Arial";  
                cts.fillStyle = fontColor;  
                cts.textAlign = 'center';  
                cts.textBaseline = 'middle';  
                cts.moveTo(x, y-7);  
                cts.fillText(process+"%", x, y-7);  
                
                cts.moveTo(x, y+7);  
                var statusStr = process<100?"进行中":"已成团";
                cts.fillText(statusStr, x, y+7);  
                
                var circleX = x + Math.sin(Math.PI * 2 * process / 100) * (radius-1.6);
                var circleY = y - Math.cos(Math.PI * 2 * process / 100) * (radius-1.6);
                cts.beginPath();  
                cts.moveTo(circleX, circleY); 
                cts.arc(circleX, circleY, 3, 0, Math.PI * 2, true);  
                cts.closePath();
                cts.fillStyle = proColor;  
                cts.fill(); 
        },
        toggleDetail() {
            vm.showDetail = !vm.showDetail;
        },
        // //团购规则
        // gotosgrouprulr() {
        //     vm.$router.push({path:'/sgrouprule'})
        // },
        //更多商品
        goclassify() {
            // vm.$router.push({path:'/'})
            location.href=vm.basePageUrl+"rgroups.html?type="+vm.rule.productType;
        },
        //马上参团
        buy() {
            //  if(vm.rule.id) {
            //      vm.$router.push({path:'/buy',query:{type:'4',ruleId:vm.rule.id}})
            //  }
             
            let shareCode = getUrlParam("shareCode");
        	if(vm.common.checkRegisterStatus()&&vm.rule.id){
				let url =vm.basePageUrl+"rgroups.html?state=123#/buy?type=4&ruleId="+vm.rule.id;
				if(shareCode){
					url+= "&shareCode="+shareCode;
				}
        		location.href=url;
        	}
        }
   },
    components: {
        swiper,
        swiperSlide
   },
   computed: {},
}
</script>
<style>
.controller .swiper-pagination-bullet-active {
    opacity: 1;
    background: #fff;
}
</style>

<style  scoped>
.controller {
     background-color: #fffff8;
    padding-bottom: 1px;
}
 /* load */
.load6 {
    margin: 100px auto 0;
    width: 150px;
    top: 25%;
    left: 25%;
    width: 50%;
    text-align: center;
    position: fixed;
    z-index: 1002;
    overflow: auto;
}

.load6>div {
    width: 30px;
    height: 30px;
    background-color: #FF8A00;
    border-radius: 100%;
    display: inline-block;
    -webkit-animation: bouncedelay 1.4s infinite ease-in-out;
    animation: bouncedelay 1.4s infinite ease-in-out;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
}
.load6 .bounce1 {
    -webkit-animation-delay: -0.32s;
    animation-delay: -0.32s;
}
.load6 .bounce2 {
    -webkit-animation-delay: -0.16s;
    animation-delay: -0.16s;
}
@-webkit-keyframes bouncedelay{
    0%,80%,100%{-webkit-transform:scale(0.0)}
    40%{-webkit-transform:scale(1.0)}}
@keyframes bouncedelay{
    0%,80%,100%{transform:scale(0.0);-webkit-transform:scale(0.0)}
    40%{transform:scale(1.0);-webkit-transform:scale(1.0)}}

.black_overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #f5f5f5;
    z-index: 1001;
    -moz-opacity: .8;
    opacity: .80;
    filter: alpha(opacity=80);
}
 /* load */
.rule_intro{
	    position: fixed;
	    top: 0;
	    z-index: 10;
		background:#f7f7f1;
		width:100%;
}      
.ban1{width: 100%;}
.ban1 img{width: 100%; }
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
    font-size: 16px;
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
.fs14 {
    font-size: 14px;
}
.ori-price2 {
    font-size: 14px;
    color: #999999;
}
/* 剩余时间 */
.time-wrap {
    text-align: center;
    /* widht: 100%; */
    height: 48px;
    /* inline-height: 48px; */
}
.bb3 {
    border-bottom: 5px solid #f7f7f1;
}
.mt2 {
    margin-top: .5rem;
}
.time-text {
    font-size: 18px;
    color: #996c33;
    margin-left: 5px;
    margin-right: 5px;
}
.time-number {
    font-size: 20px;
    padding: 4px 6px;
    color: white;
    background: url(../../assets/images/index/img_time.png) no-repeat;
    background-size: 100% 100%;
}
.fs18 {
    font-size:18px;
}
/* 剩余时间 */
.rgroup-info {
    /* widht: 100%; */
    height: 70px;
}
.plr10 {
    padding: 0 10px;
}
/* 商品详情 */
 .section-title {
    display: block;
    font-size: 13px;
    color: #7e6b5a;
    padding-bottom: 7px;
    border-bottom: 1px solid #d4cfc8;
}
.more-icon {
    background-image: url(../../assets/images/index/icon_more.png);
    background-size: 18px 3px;
    background-position-y: 8px;
}
.icon {
    display: inline-block;
    width: 25px;
    height: 25px;
    background-repeat: no-repeat;
}
.topIcon {
    background-image: url(../../assets/images/index/icon_top.png);
    background-size: 12px 7px;
}
.detail-item {
    width: 100%;
    margin-top: 12px;
    font-size: 12px;
    color: #323937;
}
.activityTitleLine {
    text-align: center;
    font-size: 16px;
}
.more_btn {
    color: #996c33;
    border: #cfa972 solid 1px;
    padding: 8px 30px;
    font-size: 14px;
    margin-top: 25px;
    margin-bottom: 25px;
    border-radius: 6px;
}
.useless {
    background-color: #D7D5D4;
}
</style>
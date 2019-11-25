<template>
   <div >
       <!-- <div id ="div11" v-show="rgoupscontent=='list'" style="margin:0 auto;border:0px solid #000;width:300px;height:100px;line-height: 450px;text-align: center;">
           <span style='font-size: 18px;'>您的小区尚未开通报名，敬请期待！</span>
       </div> -->
       <div id="div12" v-show="rgoupscontent=='main'">
        <!-- load -->
		<div class="load6" id="LoadingBar" v-show="load">
			<div class="bounce1"></div>
			<div class="bounce2"></div>
			<div class="bounce3"></div>
		</div>

		<div id="fade" class="black_overlay" v-show="load">
		</div>

		<div id="phoneErro" v-show="phoneErro">
            <span>没有更多</span>
        </div>

		<div id="phoneAjax" class="hidden" v-show="hidden">
			<img src="../../assets/images/index/c3d7f369-4a5e-4c4a-9fb9-a4b9d274c7e1.gif" style="width:40px;height40px;vertical-align: middle;">
		</div>
	    <!-- load -->
        <div class="mb_6" id="indexDiv" >
            <div class="banner">
                <img alt="" src="http://img.e-shequ.com/Frjki5qYnDFQ3SxPoPKMJvWb36g8" style="width:100%">
            </div>
            <!-- 商品 -->
            <div id="products" class="mlr1">
                <div class="tuangou-item" v-for="(rgroup,index) in  rgroups" :key="index" style="padding-bottom:75px;width:100%" @click="Hrefs(rgroup.ruleId)" >
                    <img alt="" class="product-image" :src="rgroup.productPic"/>
                    <!-- <img alt="" class="product-image" src="http://img.e-shequ.com/FkcZqBr8qH41Ks7cUj4XeGVXFsSy"/> -->
                    <div style="width:100%">
                        <div class="fl pt5" style="height:70px;width: 100%;">
                            <div class="product-name pl05 fs20 pt" style="margin-right: 75px;line-height: 15px;">{{rgroup.ruleName}}</div>
                            <div class="mt1 ml1" >
                                <span class="highlight fs20">¥&nbsp;{{rgroup.price}}&nbsp;</span>
                                <span class="ori-price"><del>¥&nbsp;{{rgroup.oriPrice}}&nbsp;</del></span>
                                <span class=" product-lefttime" >{{leftTimeStrs(index)}}</span>
                            </div>
                        </div>
                         <div class="fr process-left-border" id="processImg">
                            <canvas ref="can" style="z-index:10; background-color: white;" width="70px" height="70px" ></canvas>
                        </div>
                       
			    	</div>
                </div>
            </div>
        </div>
        <div style="height:.5rem;clear:both">&nbsp;</div>
       </div>
   </div>
</template>

<script>
let vm;
import wx from 'weixin-js-sdk';
import But from '../api/but.js'
let hasNext=true,isloadPage=false;
export default {
   data () {
       return {
           load:true,
           phoneErro:false,
           hidden:false,
           page:0,
           rgroups:[],//团购商品
           rgoupscontent:'main'
       };
   },
   created(){
       vm=this;
       },
   mounted() {

         let url = location.href.split('#')[0];
        vm.receiveData.wxconfig(vm,wx,['onMenuShareTimeline','onMenuShareAppMessage'],url);

        vm.initShareSetting();
        
        // vm.initSession4Test();
       vm.User();
       vm.query();
       vm.updateLeftTime();//计时器
        
       window.addEventListener('scroll',vm.getscroll);

   },
   updated(){
       vm.drawP()     
   },
    
   components: {
       
   },

   methods: {
        initShareSetting(){
            var title = "社区服务";
            var link=vm.basePageUrlpay+"hxrgroups.html?state=123";
            var img=vm.basePageUrlpay+"rgroupspay/share_tuan.jpg";
            var desc="【"+vm.common.newname+"】为您提供更好的服务！";
            vm.common.initShareConfig(title,link,img,desc,wx);
        },
        
        //模仿线上用户信息
            // 105/747/384
        initSession4Test(){
                let url ='/initSession4Test/1';
                    vm.receiveData.getData(vm,url,'Data',function(){
                });
        },
         User() {
        //获取页面数据
        let n = "GET",
            a = "userInfo?oriApp="+vm.getUrlParam('oriApp'),
            i = null,
            d = function() {},
            e = function(n) {
            But.$emit('sends',n.result.iconList)
            },
            r = function() {
            };
        this.common.invokeApi(n, a, i, d, e, r);

        },
       query() {
        let n = "GET",
            a = "rgroups/"+vm.page,
            i = null,
            d=function() { },
            e = function(n){
                 vm.rgroups = n.result;
                 vm.load=false;
                 vm.page++;  
                //  if(vm.rgroups.length==0) {
                //      vm.rgoupscontent="list"
                //  }
            },
            r = function(){
                vm.load=false;
            };
           this.common.invokeApi(n,a,i,d,e,r);
       },
       //canvas 画板
       drawP(){
        //    console.log(vm.$refs.can)
            for(var i=0;i<vm.rgroups.length;i++) {
                vm.drawProcess($("#products canvas")[i],35,35,28,vm.rgroups[i].process,'#E5E2DD','#FF8A00','#FF8A00')
           }
           
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
        //倒计时
        updateLeftTime() {
            setInterval(function (param) {
                    for(var i=0;i<vm.rgroups.length; i++){
                        if(vm.rgroups[i]!=null&&vm.rgroups[i].leftTime > 0){
                            vm.rgroups[i].leftTime=vm.rgroups[i].leftTime-1;
                        }
                    }
              },1000);
        },
        //跳转
        Hrefs(id){
            vm.$router.push({path:'/rgroupdetail',query:{'ruleId':id}})
        },
        getscroll() {
            var st = $(window).scrollTop();
            let loadheight = $("#indexDiv").height();
            var hook=loadheight-st;
            if(hook<800&&hasNext&&!isloadPage){
                isloadPage=true;
                vm.hidden=true;
            vm.loadNextPage();
        }
          
        },
        loadNextPage(){
            let url ="rgroups/"+vm.page;
                vm.receiveData.getData(vm,url,'Data',function(){
                    if(vm.Data.success){
                        if(vm.Data.result==null||vm.Data.result.length==0) {
                                vm.hidden=false;
                                hasNext=false;
                                vm.phoneErro=true;
                                 setTimeout(() => {
                                    vm.phoneErro=false;
                                }, 1000);
                            } else {
                                isloadPage = false;
                                 vm.hidden=false;
                                vm.rgroups = vm.rgroups.concat(vm.Data.result);
                            }
                           vm.page++;
                    }else {
                        isloadPage = false;
                        vm.hidden=false;
                        alert('加载团购信息失败')
                    }
            });
        }
   },
   computed: {
       leftTimeStrs() {
           return function (i) {
              if(vm.rgroups[i]!=null) {
               var iRemain=vm.rgroups[i].leftTime;
                    if(iRemain > 0){
                    var iDay=parseInt(iRemain/86400);
                    iRemain%=86400;
                    
                    var iHour=parseInt(iRemain/3600);
                    iRemain%=3600;

                    var iMin=parseInt(iRemain/60);
                    iRemain%=60;

                    var iSec=parseInt(iRemain);
                    
                    var resStr = "剩余  ";
                    if(iDay>0) {
                        resStr += iDay+"天 "
                    }
                    if(iDay<=0&&iHour<=0) {
                    } else if(iHour<10){
                        resStr += "0"+iHour+":"
                    } else {
                        resStr += iHour+":"
                    }
                    
                    if(iMin<10){
                        resStr += "0"+iMin+":"
                    } else {
                        resStr += iMin+":"
                    }
                    
                    if(iSec<10){
                        resStr += "0"+iSec;
                    } else {
                        resStr += iSec;
                    }
                    return resStr + " 结束";
                }else{
                    return "已结束";
                }
        	} else {
        		return "";
        	}
           }
       },

   },
}

</script>

<style  scoped>
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
    /* overflow: auto; */
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
#phoneErro {
    margin: 100px auto 0;
    top: 25%;
    left: 25%;
    width: 50%;
    text-align: center;
    height: 60px;
    line-height: 60px;
    background-color: black;
    -moz-opacity: .8;
    opacity: .80;
    filter: alpha(opacity=80);
    position: fixed;
    z-index: 1999;
    overflow: auto;
    color: white;
    -moz-border-radius: 15px;
    -webkit-border-radius: 15px;
    font-size: 14px;
}
#phoneAjax {
    position: fixed;
    top: 20%;
    left: 50%;
    width: 60px;
    height: 60px;
    line-height: 60px;
    margin-left: -30px;
    text-align: center;
    background-color: black;
    -moz-opacity: .8;
    opacity: .80;
    filter: alpha(opacity=80);
    z-index: 1998;
    overflow: auto;
    -moz-border-radius: 15px;
    -webkit-border-radius: 15px;
}
 /* load */
 .mlr1 {
    margin-left: .2rem;
    margin-right: .2rem;
}
.tuangou-item {
    display: block;
    position: relative;
    margin-top: 6px;
    /* float: left; */
    border: 1px solid #d4cfc8;
}
.pt5 {
    padding-top: 5px;
}
.fs20 {
    font-size: 20px;
}
.product-name {
       font-size: 12px;
    height: 30px;
    color: #000000;
    line-height: 15px;
    text-overflow: ellipsis;
    overflow: hidden
}
.pl05 {
    padding-left: 0.2rem;
}

.ml1 {
    margin-left: .3rem;
    margin-top: .2rem;
}

.highlight {
    color: #ff8a00;
}
.ori-price {
    font-size: 11px;
    color: #999999;
}
.product-lefttime {
    color: #666666;
    /* padding-left: 10px; */
}

.process-left-border {
    border-left: #e5e2dd 1px solid;
    z-index: 1;
    position: absolute;
    right: 0px;
}
</style>
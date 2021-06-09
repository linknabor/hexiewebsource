<style scoped>
#divwuye {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background:#fff;
  overflow:auto;
}
.wuye{font-family: PingFangSC-Regular;width: 100%;
  margin-bottom: 60px;
  font-size: 14px;
     }
a{color: #000;}
.ban1{width: 100%;}
.ban1 img{width: 100%;}
.jiugongge{width: 100%;overflow: hidden;background-color: white;}
.jgg_li{float: left;width: 25%;height: 80px; text-align: center;letter-spacing: 0.98px;font-size: 12px;}
.jgg_li a{    opacity: 1;
    color: rgba(16, 16, 16, 1);
    font-family: 'PingFangSC-regular';}
.jgg_img{
    margin: 10px auto 10px;
    width: 40px;
    /* height: 30px; */
}
.jgg_img img{width:100%;height: 100%;}
/* 资讯 */
.inner{
width: 100%;
/* height: 350px; */
overflow: hidden; background-color: white;}
.tabmain {
    border-bottom: 1px solid #d4cfc8;
    height: 46px;
}
.tab {
    height: 46px;
    width: 100%;
    overflow: auto;
    -ms-touch-action: none;
    touch-action: none;
    position: absolute;
    /* box-sizing: border-box; */
}
.tabscon {
    width: 100%;
    position: absolute;
}
.notice-tab-title {
    display: inline-block;
    width: 25%;
    /* color: #dd9c4d; */
    color: #000;
    font-size: 14px;
    text-align: center;
    /* padding: 15px 0; */
    height: 45px;
    line-height: 45px;
    transition: all 1s ;
    -webkit-transition: all 1s;
}  

.tab .notice-tab-title.active {
    color: #47B3FF;
    border-bottom: 1px solid #47B3FF;
}  
 .tabadd {
     text-align: left;
     transition: all 1s;
     -webkit-transition: all 1s;
 }
 .dhwidth {
     width:33.3%;
 }  
.tab::-webkit-scrollbar {
        display: none;
    }
.section3_notice{
    margin: 15px 0px 15px 4%;
    font-size: 15px;
    color: #000000;
    text-align: left
}
.section3_divider{
    border-bottom: 1px solid #BBBBBB;
}    

 .section3_zixuns{
    overflow: hidden;
    border-bottom: 1px solid #BBBBBB;

}
.section3_sub_main_left{
    float: left;
}
        
.section3_sub_main_right{
    /* float: left;
    width: 60%; */
    margin:0  10px;
    text-align:left;
}  
.section3_sub_img{
    width: 80px;
    height: 60px;
    margin: 10px;
    margin-right:20px;
    float: left;
}
 .section3_sub_title{
    margin-top: 10px;
    font-size: 13px;
    color: #000000;
    letter-spacing: 1.14px;
    line-height: 20px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;   
}
.section3_sub_content{    
    /* height: 59px; */
    margin: 5px 0px 0px 0px;
    font-size: 10px;
    color: #C8C4C4;
    line-height: 20px;
    letter-spacing: 1.14px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
        /*! autoprefixer: off */
    -webkit-box-orient: vertical;
    /* autoprefixer: on */
    overflow: hidden;
}


.avatar-wraps {
    overflow: hidden;
    position: relative;
    padding: 1px;
    height: 5rem;
    text-align: center;
    }
.center-bgs {
    height: 5rem;
    text-align: center;
    background-image: url('../../assets/images/common/bg_publish.jpg');
    background-size: cover;
    background-position: 50%;
}    

/* 强制订阅 */
.subscribe-shede {
    position:fixed;
    top:0;
    bottom:0;
    left:0;
    right:0;
    background-color:#E8E8E8;
    z-index: 999;
    letter-spacing: 2px;
    background-color: rgba(232, 232, 232, 0.61);
}
.subscribe-shede .subscribe-content {
    position:absolute;
    bottom: 60px;
    width:100%;
    color:#F08500;
    background-color:#fff;
    padding: 0.3rem 0;
    z-index: 10000;
}
.subscribe-title {
    text-align: center;
    margin-bottom:0.2rem;
}
.subscribe-title h6 {
   font-size: 16px;
}
.subscribe-title img {
   width:160px;
}
.subscribe-title p {
   font-size: 14px;
}
.subscribe-footer {
    margin:0 0.5rem;
    background-color:#EEEEEE;
    font-size:14px;
    padding: 3px;
}
.subscribe-step {
    text-indent: 3em;
    line-height:0.47rem;
}
</style>
<template>
<div id="divwuye" @scroll="getscroll">
    <div class="wuye">
        <swiper :options="swiperOption" ref="mySwiper" v-if="banners.length>0">
            <swiper-slide v-for="item in banners" :key="item.id">
                <div class="ban1">
                    <a :href="item.bannerUrl" >
                        <img :src="item.picture" alt="">
                    </a>                  
                </div> 
            </swiper-slide>
            <!-- <div class="swiper-pagination" slot="pagination"></div>        -->
        </swiper>
        
    <div class="jiugongge">
      <ul>
        <li class="jgg_li">
          <router-link to="/pay">
          <!-- <div @click="
          ('/pay')"> -->
            <div class="jgg_img">
              <img v-show="!kyappid" src="http://img.e-shequ.cn/Fhq2GvOWKsy9tG2IPvN_KouykRT5" alt="tt">
              <img v-show="kyappid" src="http://img.e-shequ.cn/Fpb22vqH_vRqrv4Cv93jku3wpblT" alt="tt">
            </div>
            <span>物业缴费</span>
          <!-- </div>  -->
          </router-link>
        </li>

        <li class="jgg_li" v-show="!kyappid">
          <router-link to="/paymentquery">
            <div class="jgg_img">
              <img src="http://img.e-shequ.cn/FpyFhyQVInnK_7miteFa-Xq5ndp5" alt="tt">
            </div>
            <span>缴费查询</span>
          </router-link>
        </li> 

        <li class="jgg_li" v-show="kyappid">
          <div @click="gotoThread()">
            <div class="jgg_img">
              <img src="http://img.e-shequ.cn/FmBwFvjiR7rtIoV83JOcFF_UcuGt" alt="tt">
            </div>
            <span>社区互动</span>
          </div>
        </li>    

        <li class="jgg_li" >
          <router-link to="/myhouse">
          <!-- <div @click="Publicjump('/myhouse')"> -->
            <div class="jgg_img">
              <img v-show="!kyappid" src="http://img.e-shequ.cn/FoR1Saide9rMWK9nEBtbuxE5Vmh0" alt="tt">
              <img v-show="kyappid" src="http://img.e-shequ.cn/FvqDXOVlBl5JiFuULnSWbobLCoUJ" alt="tt">
            </div>
            <span>我是业主</span>
          <!-- </div>   -->
          </router-link>
        </li> 
        
        <li class="jgg_li" >
            <div class="link"  @click="gotorepair()">
                <div class="jgg_img">
                    <img v-show="!kyappid" src="http://img.e-shequ.cn/FvXta8SzetfBaBYyaB3fX-HQ1Vza" alt="tt">
                    <img v-show="kyappid" src="http://img.e-shequ.cn/FvCBrn2fVvHqpvTy9T24vvCmTUwa" alt="tt">
                </div>
                <span class="jgg-span" v-show="!kyappid">便民维修</span>
                <span class="jgg-span" v-show="kyappid">物业报修</span>
            </div>
        </li>

        <li class="jgg_li" >
          <div @click="Paystop">
            <div class="jgg_img">
              <img v-show="!kyappid" src="http://img.e-shequ.cn/FuGXrSZLRWdYqydXGir48wipF2Fn" alt="tt">
              <img v-show="kyappid" src="http://img.e-shequ.cn/Fr9wzxp17jaOsu0WMgZfp-2_xVhV" alt="tt">
            </div>
            <span>社区电商</span>
          </div>
        </li>

        <li class="jgg_li">
          <a :href="this.basePageUrlpay+'hxrgroups.html?'+this.common.getoriApp()">
            <div class="jgg_img">
              <img v-show="!kyappid" src="http://img.e-shequ.cn/FkJWpnGhosNorRy4zPilU0kWZmG9" alt="tt">
              <img v-show="kyappid" src="http://img.e-shequ.cn/FhtqTqm5MyJRA8e7fSO8ptnPDP-Z" alt="tt">
            </div>
            <span>社区团购</span>
          </a>
        </li>
        
        <li class="jgg_li">
          <a :href="this.basePageUrl+'home/index.html?'+this.common.getoriApp()">
            <div class="jgg_img">
              <img v-show="!kyappid" src="http://img.e-shequ.cn/FqovzXqEh_kowBX9eXVVGtkwkivP" alt="tt">
              <img v-show="kyappid" src="http://img.e-shequ.cn/FgVwSOkHJzHD758K9m2px_fdnKW9" alt="tt">
            </div>
            <span v-show="!kyappid">周边服务</span>
            <span v-show="kyappid">家政服务</span>
          </a>
        </li>

        <li class="jgg_li">
          <a :href="this.basePageUrl+'group/onsales.html?'+this.common.getoriApp()+'#/cardrollindex'">
            <div class="jgg_img">
              <img v-show="!kyappid" src="http://img.e-shequ.cn/Frut5vg031RPFCfsfDmqEotlVXlg" alt="tt">
              <img v-show="kyappid" src="http://img.e-shequ.cn/FtDdOHIIy_OtREne8Z98l3WsTjeo" alt="tt">
            </div>
            <span>周边优惠</span>
          </a>
        </li>

        <!-- <li class="jgg_li" v-show="coronaPy">
          <div @click="goepi()">
            <div class="jgg_img">
              <img src="../../assets/img/snqx.png" alt="tt">
            </div>
            <span>社区防疫</span>
          </div>
        </li> -->
        <!-- <li class="jgg_li" v-show="coronaPj">
          <div @click="gotoThread()">
            <div class="jgg_img">
              <img src="http://img.e-shequ.cn/FvOdWYYKMdqshuLarpN0URwzk_x5" alt="tt">
            </div>
            <span>业主意见</span>
          </div>
        </li>  -->
     <!--<li class="jgg_li" >
          <a :href="this.basePageUrl+'wuye/index.html?'+this.common.getoriApp()+'#/mysteward?n=12'">
            <div class="jgg_img">
              <img src="http://img.e-shequ.cn/FokvKXxpY9__2_6FRzVe1Ay0mBkb" alt="tt">
            </div>
            <span>预约服务</span>
          </a>
        </li> -->

      </ul>
    </div>
      <div class="inner">
        <!-- <div class="section3_notice">通知及公告</div> -->
        <div class="section3_divider"></div>
        <div class="tabmain">
            <div class="tab" ref="tabs" >
                <div ref="tabcon" class="tabscon">
                    <div  ref="tabtitle" class="notice-tab-title" v-for="(tab,index) in tabs"  :key="index" :class="{active:tab.active,tabadd:tab.ali,dhwidth:tab.dhwidth}" @click="changeTab(index,tab.type)">{{tab.name}}</div>
                </div>
            </div>
        </div>
         <!-- <div style="width:100%;height:47px;"></div> -->
        <div id="word">
            <div class="section3_zixuns" v-for="zixun in zixuns1" @click="jumpToDetail(zixun.id)" :key="zixun.id">
					<div class="section3_sub_main_left">
                    <img class="section3_sub_img" :src="zixun.smallImage"/>
                    </div>
                   
					<div class="section3_sub_main_right">
						<div class="section3_sub_title">{{zixun.title}}</div>
						<div class="section3_sub_content">{{zixun.summary}}</div>
					</div>
			</div>
            <div class="avatar-wraps " v-show="zixuns1.length == 0">    
        	    <div class="center-bgs" ></div>
    	    </div>
        </div>
        <wxsubscribe v-if="showWxSubscribe"></wxsubscribe>
        <init-user v-if="testMode"></init-user>
    </div>   
    </div>

    <div class="subscribe-shede" v-if="isconcern"> 
        <div class="subscribe-content">
            <div class="subscribe-title">
                <h6>关注公众号</h6>
                <img :src="qrCode" alt="">
                <p>
                    长按图片「识别二维码」关注公众号
                </p>
            </div>
            <div class="subscribe-footer">
                <p>若无法识别，您还可以</p>
                <p class="subscribe-step">1.打开微信，点击「添加朋友」\</p>
                <p class="subscribe-step">2.点击「公众号」搜索微信号：e-shequ<br></p>
                <p class="subscribe-step">3.点击「关注」即可<br></p>
            </div>
            
        </div>
    </div>
</div>    
</template>

<script>
let vm;
import {swiper,swiperSlide} from 'vue-awesome-swiper';
import BScroll from 'better-scroll';
import Bus from '../../api/bus.js';
import WxSubscribe from '../../components/WxSubscribe.vue';
import InitUser from '@/components/InitUser.vue'
export default {
    name: 'index',
    components: {
        swiper,
        swiperSlide,
        'wxsubscribe':WxSubscribe,
        'init-user': InitUser
    },
    data () {
        return {
            testMode: this.testMode,
            showWxSubscribe: false,
            kyappid:false,
            isloadPage:false,
            isconcern:false,//是否关注
            zixuns1:[],
            page : 0,
            banners :[],
            cfgParam:{},
            sectId:0,
            messtype:'',
            coronaPy: false,//疫情防控
            coronaPj: true,//业主意见
            qrCode:'',//二维码
            // subscribe:'',//是否订阅公众号标识，0代表用户没有关注，拉取不到信息
            donghu:false,//东湖标记
            //swiper参数配置
            swiperOption:{
                notNextTick:true,
                autoplay:false,
                autoplay:{
                    disableOnInteraction:false,
                    delay:20000000
                },
                pagination: {
                el: '.swiper-pagination'
                },
                loop: false,
            },
             tabs: [
                //   {
                //     name: '社区生活',
                //     type: 9,
                //     active:true  
                // }
             ],
        };
    },
    created(){
        vm = this;  
 
    },
    mounted(){
        // this.initSession4Test();
        Bus.$on("sends",this.getMsgFromZha);
        vm.getky();
    },
    updated() {
        vm.$nextTick(()=> {
            // setTimeout(() => {
                vm.personScroll();
            // },2000)
        })
    },
    beforeDestroy() {
            Bus.$off();
　　},
    methods: {
        //判断昆亿公众号
        getky() {
            var urloriapp = vm.common.getoriApp();//url标识
            var comappid ="oriApp="+vm.is_config.C('kyappid');//配置appid
            var dcappid ="oriApp="+vm.is_config.C('dcappid');//配置appid
            vm.kyappid = comappid == urloriapp || urloriapp == dcappid ? true:false; // true显示最新图片
        },
        //轮播图
        bannerss() {
            let url = 'banner/3';
             vm.receiveData.getData(vm,url,'Data',function(){
                vm.banners = vm.Data.result;
            });
        },
        getMsgFromZha(result) {
            vm.cfgParam=result.cfgParam;
            vm.sectId=result.sectId;
            vm.qrCode=result.qrCode;//公众号二维码
            // vm.subscribe=result.subscribe;//是否关注标记 0没有关注
            vm.donghu=result.donghu;//东湖标识
            if(result.coronaPrevention){
                if(vm.cfgParam){
                    if(vm.cfgParam.CORONA_PREVENTION_MODE){
                        if(vm.cfgParam.CORONA_PREVENTION_MODE == 1){
                            vm.coronaPy = true;
                            vm.coronaPj = false;
                        }else {
                            vm.coronaPy = false;
                            vm.coronaPj = true;
                        }
                    }
                }         
            }
            if(!vm.coronaPy){
                vm.coronaPj = true
            }
            vm.bannerss();
            vm.query();   
         },
        query() {
                if(vm.donghu){
                    vm.tabs=[ 
                        {
                            name: '物业公告',
                            type: 0,
                            active:true,
                            dhwidth:true,
                        },
                        {
                            name: '业委会公告',
                            type: 1,
                            active:false,
                            dhwidth:true, 
                        },
                        {
                            name: '居委会公告',
                            type: 2,
                            active:false,
                            dhwidth:true,
                        },
                    ]
                }else {
                    if(vm.cfgParam == null){
                        return;
                    }
                    if(vm.cfgParam.ONLINE_MESSAGE==1) {
                        if(vm.kyappid) {
                             vm.tabs=[ 
                                {
                                    name: '招聘信息发布',
                                    type: 1,
                                    active:true,
                                    dhwidth:true,
                                },
                                {
                                    name: '物业公告',
                                    type: 0 ,
                                    active:false,
                                    dhwidth:true,
                                },
                                {
                                    name: '闲置物品发布',
                                    type: 2,
                                    active:false,
                                    dhwidth:true,
                                },
                            ] 
                            
                        }else {
                            vm.tabs=[ 
                                {
                                    name: '社区生活',
                                    type: 9,
                                    active:true  
                                },
                                {
                                    name: '物业公告',
                                    type: 0 ,
                                    active:false
                                },
                                {
                                    name: '业委会公告',
                                    type: 1,
                                    active:false 
                                },
                                {
                                    name: '居委会公告',
                                    type: 2,
                                    active:false,
                                    ali:true
                                },
                            ]  
                        }

                    }else {
                        vm.tabs=[ 
                                {
                                name: '社区生活',
                                type: 9,
                                active:true  
                            }
                        ]    
                    }
                }
            vm.message(vm.tabs[0].type) 

        },
        message(type){
            vm.page=0;
            vm.messtype=type;
            let n = "GET",
                a = "messages/"+type+"/"+vm.page,
                i = null,
                e = function(n){
                    if(n.result) {
                        vm.zixuns1=n.result;                     
                        vm.page++;
                    }
                    
                },
                r = function(){
                    
                };
            this.common.invokeApi(n,a,i,null,e,r);

        },    
         //点击切换资讯
        changeTab(index,type) {
            for(var i=0; i<vm.tabs.length;i++) {
                vm.tabs[i].active = false;
            }
            vm.tabs[index].active = true;
            vm.isloadPage=false;//重置分页
            vm.message(type) 
        },
        jumpToDetail(mid) {
            if(mid==29){
    		   window.location.href="https://mp.weixin.qq.com/s/3N-yinJvq0jDJmh6fd6scw";
    	   }else if(mid==30){
    		   window.location.href="https://mp.weixin.qq.com/s/WTgWmG5lknKExBmOsughmQ";
    	   }else if(mid==31){
    		   window.location.href="https://mp.weixin.qq.com/s/-6gMOUi3vWJMRraOqtC2wQ";
		   }else if(mid==76){
			   window.location.href="http://mp.weixin.qq.com/s/LoJjEaaQ0xhi2wD7uuJVJQ";	
		   }else if(mid==78){
			   window.location.href="http://mp.weixin.qq.com/s/28gpc3gW7byK6k3kQHqX8A";
		   }else if(mid==79){
			   window.location.href="http://mp.weixin.qq.com/s/Em3EJ6lo4V8eITXpPcA3LQ";
		   }else if(mid==86){
			   window.location.href="http://m.eqxiu.com/s/kg2hoy34?from=singlemessage&isappinstalled=0";
		   }else if(mid==110){
			   window.location.href="http://mp.weixin.qq.com/s/4Ool8tH0lvij5PE8j14QMA";
		   }else if(mid==112){
			   window.location.href="http://mp.weixin.qq.com/s/gQGtpj_taPUXddQNh_EJWA";
		   }else if(mid==189){
			   window.location.href="http://mp.weixin.qq.com/s/8hjgD4eu7fhQHx8mKK9TRA";
		   }else if(mid==190){
			   window.location.href="http://mp.weixin.qq.com/s/L6OoaaJmRD72NHsUtRdqig";
       	   }else if(mid==197){
			   window.location.href="https://mp.weixin.qq.com/s/X34PcEoCP-GizVczTC73nA";
		   }else if(mid==198){
			   window.location.href="https://mp.weixin.qq.com/s/JEE5Yyx5ugzF8-WzrkVF4g";
		   }else if(mid==225){
			   window.location.href="https://mp.weixin.qq.com/s/f-N1W8U1Q3Py-vTC_TjR6Q";
		   }else{
    		   vm.$router.push({path:'/message',query:{'messageId':mid}})
    	   }
        },

        //强制关注  物业缴费，我是业主
        // Publicjump(baseurl) {
        //     // alert(vm.subscribe); 
        //     vm.subscribe != 0 ? vm.$router.push({path:baseurl}) : vm.isconcern = true;
        // },

        //便民维修
        gotorepair() {
                if(vm.sectId==0|| vm.sectId== null)
                {
                    alert("您暂未绑定房屋，请前往“我是业主”\r\n进行操作，感谢！");
                    return;
                }else  if(vm.cfgParam==null || vm.cfgParam.ONLINE_REPAIR == undefined||vm.cfgParam.ONLINE_REPAIR==0) {
                    alert("当前所在的小区未开启当前业务");
                    return   
                }else {
                    if(vm.donghu) {
                         vm.$router.push({path:'/maintain',query:{'n':'2'}})
                    }else {
                         vm.$router.push({path:'/repair',query:{'projectId':'1'}})
                    }
                }

        },
        //社区电商
        Paystop(){
            location.href=vm.basePageUrl+'/group/onsales.html?'+vm.common.getoriApp()+'#/classification';
        },
        //业主意见
        gotoThread() {
            if(vm.sectId==0 || vm.sectId== null)
        	{
        		alert("您暂未绑定房屋，请前往“我是业主”\r\n进行操作，感谢！");
        		return;
        	}else  if(vm.cfgParam==null || vm.cfgParam.ONLINE_SUGGESTION == undefined||vm.cfgParam.ONLINE_SUGGESTION==0) {
                alert("当前所在的小区未开启当前业务");
                return  
            } else {
                if(vm.donghu) {
                    vm.$router.push({path:'/mysteward',query:{'n':'2'}})
                }else {
                    vm.$router.push({path:'/mysteward',query:{'n':'9'}})
                }
             	
            }
        },

        //左右滑动
       personScroll() {
                if(vm.tabs.length>3) {
                    vm.$refs.tabcon.style.width= 33 *vm.tabs.length+'%';
                }
                if(vm.tabs.length==3){
                    vm.$refs.tabcon.style.width= '100%';
                }
                vm.$nextTick(() => {
                    if (!vm.scroll) {
                        vm.listScroll  = new BScroll(vm.$refs.tabs, {
                            startX:0,
                            // click: true,
                            scrollX: true,//
                            scrollY: false,
                            useTransition:false,
                            eventPassthrough: "vertical"
                        });               
                    } else {
                        vm.scroll.refresh();
                    }

                     vm.listScroll.on('scrollStart', (pos) => {
                        $('.tabadd').css({'text-align':'center'})
                     })
                    
                     vm.listScroll.on('scrollEnd', (pos) => {
                         var add =Math.abs(pos.x);
                        if(add==0) {
                           $('.tabadd').css({'text-align':'left'})
                        }
                     })
                })
                
       },
       //分页
       getscroll(e) {
        var st = e.srcElement.scrollTop;
        var ad=window.innerHeight
        var hd=$('#word').height();
        if( st+ad >=hd && !vm.isloadPage) {
            vm.isloadPage=true;
            vm.loadNextPage();
        }
       },
       loadNextPage() {
          vm.receiveData.getData(vm,"messages/"+vm.messtype+"/"+vm.page,'Data',function(){
                 if(vm.Data.success) {
                     if(vm.Data.result.length>0) {
                        vm.zixuns1=vm.zixuns1.concat(vm.Data.result);
                        vm.isloadPage=false;
                        vm.page++
                     }
                 }
            });
       },
       //社区防疫
       goepi(){
            vm.$router.push({path:'/catalog'})
       }

    },
    
}

</script>
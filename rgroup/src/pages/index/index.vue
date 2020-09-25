<template>
   <div >
       <div id="div12">
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
        <div class="mb_6" id="indexDivs" @scroll="getscroll">
        <div id="indexDiv">    
            <div class="banner">
                <img alt="" src="http://img.e-shequ.com/Frjki5qYnDFQ3SxPoPKMJvWb36g8" style="width:100%">
            </div>
            <!-- 商品 -->
            <div class="mlr5" >
                <div style="width: 50%;float:left;" v-for="(product,index) in rgroups" :key="product.id" >
                    <div class="product-item" :class="{pleft:index%2==1,pright:index%2==0}" @click="Hrefs(product.ruleId)">
                        <div class="pic_container">
                            <div class="pic_dummy"></div>
                            <img alt="" class="product-image pic_content" :src="product.productPic"/>
                            <img v-if="product.tagUrl!=null&&product.tagUrl!=''" class="product-tag" :src="product.tagUrl"/>
                        </div>
                        <div class="product-name pl05">{{product.ruleName}}</div>
                        <div class="mt1 pl05">
                            <span class="highlight fs20">¥&nbsp;{{product.price}}&nbsp;</span>
                            <span class="ori-price"><del>¥&nbsp;{{product.oriPrice}}&nbsp;</del></span>
                            <span  class="product-discount">{{product.discount}}</span>
                        </div>
                    </div>
                </div>
                <div style="clear:both;"></div>
            </div>
        </div>
        <div style="height:60px;clear:both">&nbsp;</div>
        </div>
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
           sectId:'',
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
   },
   updated(){
   },
    
   components: {
       
   },

   methods: {
        initShareSetting(){
            var title = "社区服务";
            var link=vm.basePageUrlpay+"hxrgroups.html?"+vm.common.getoriApp();
            var img=vm.basePageUrlpay+"rgroupspay/share_tuan.jpg";
            var desc="【"+vm.common.newname+"】为您提供更好的服务！";
            vm.common.initShareConfig(title,link,img,desc,wx);
        },
        
        //模仿线上用户信息
            // 105/747/384
        initSession4Test(){
                let url ='/initSession4Test/8462';
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
            vm.sectId = n.result.sectId;    
            But.$emit('sends',n.result.iconList);
            vm.query();
            //存储cookie中
            vm.common.updatecookie(n.result.cardStatus,n.result.cardService,n.result.id,n.result.appid,n.result.cspId,n.result.sectId,n.result.cardPayService,n.result.bgImageList,n.result.wuyeTabsList,n.result.qrCode,n.result);
            },
            r = function() {
            };
        this.common.invokeApi(n, a, i, d, e, r);

        },
       query() {
        let n = "GET",
            a = "rgroups/v2/"+vm.page,
            i = null,
            d=function() { },
            e = function(n){
                if(vm.sectId == "" || vm.sectId == 'null' || vm.sectId == 0 || vm.sectId == null) {
                     vm.rgroups = n.result;
                     vm.load=false;
                     vm.page++;
                }else {
                    if(n.result.length == 0) {
                        vm.load=false;
                        alert("您所在小区暂未开通该功能，敬请期待");
                        window.location.href = vm.basePageUrl+'wuye/index.html?'+vm.common.getoriApp()+'#/';
                        return 
                    }else {
                        vm.rgroups = n.result;
                        vm.load=false;
                        vm.page++;
                    }
                 } 
                  
            },
            r = function(){
                vm.load=false;
            };
           this.common.invokeApi(n,a,i,d,e,r);
       },
        //跳转
        Hrefs(id){
            vm.$router.push({path:'/rgroupdetail',query:{'ruleId':id}})
        },
        getscroll(e) {
            var st = e.srcElement.scrollTop;
            let loadheight = $("#indexDiv").height();
            var hook=loadheight-st;
            if(hook<800&&hasNext&&!isloadPage){
                isloadPage=true;
                vm.hidden=true;
            vm.loadNextPage();
        }
          
        },
        loadNextPage(){
            let url ="rgroups/v2/"+vm.page;
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
                        alert(vm.Data.message == null?'加载团购信息失败':vm.Data.message)
                    }
            });
        }
   },
   computed: {
  
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
#indexDivs {
    position:absolute;
    left: 0;
    top:0;
    right: 0;
    bottom: 0;
    overflow:auto;
}
/*  */
.mlr5 {
    margin-left: 5px;
    margin-right: 5px;
}
.product-item {
    position: relative;
    border: 1px solid #f4eff8;
}
.pic_container {
    width: 100%;
    position: relative;
    display: inline-block;
}
.pic_dummy {
    margin-top: 100%;
}
.pic_content {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
}
.product-image {
    height: auto;
}

img {
    width: 100%;
    max-width: 100%;
    
}
.product-name {
    font-size: 12px;
    height: 30px;
    color: #000000;
    line-height: 15px;
    /* text-overflow: ellipsis;
    overflow: hidden; */
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
.pl05 {
    padding-left: 0.5rem;
}
.pright {
    margin-right: 1px;
}
.pleft {
    margin-left: 1px;
}
.fs20 {
    font-size: 20px;
}
.highlight {
    color: #ff8a00;
}
.pl05 {
    padding-left: 0.1rem;
}
.mt1 {
    margin-top: .05em;
}
.ori-price {
    font-size: 11px;
    color: #999999;
}
.product-discount {
    background-color: #ff8a00;
    padding-right: 4px;
    margin-right: 4px;
    height: 16px;
    font-size: 12px;
    line-height: 16px;
    display: block;
    color: white;
    border: #ff8a00 1px solid;
    border-radius: 4px;
    padding-left: 4px;
    float: right;
}
</style>
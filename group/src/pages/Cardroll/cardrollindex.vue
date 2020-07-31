<template>
   <div >
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
        
     <div id="indexdivs" @scroll="getscroll">
        <div id="indexDiv">
        <div class="banner" v-for="banner in banners" :key="banner.id" >
		    <img :src="banner.picture">
	    </div>
        <!-- <div v-for="banner in titles" :key="banner.id" >
            <div class="product-l"></div>
            <div class="product-d">
                <div class="product-d-d">
                    <span class="product-d-d-s">
                        <img :src="banner.picture" class="store-icon" />
                        <span class="fs17" style="color: #FF8A00;">{{banner.brandName}}</span>
                    </span> 
                </div>
            </div>	
        </div>     -->
        <div class="mlr5" >
            <div style="width: 50%;float:left;" v-for="(product,index) in temais" :key="product.id">
                <div class="product-item" :class="{pleft:index%2==1,pright:index%2==0}" @click="Href(product.ruleId)">
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
     <div style="height:60px;clear:both"> </div>
    </div>
     <Footer></Footer>   
   </div>
</template>

<script>
let vm;
let hasNext=true,isloadPage=false,loadheight;
import Footer from '../index.vue';
export default {
   data () {
       return {
           load:true,
           hidden:false,
           phoneErro:false,
           temais:[],
           page:0,
           banners:[],
           titles:[],
       };
   },
   created() {
       vm=this;
       vm.flush();
   },
   mounted() {
    // vm.initSession4Test();     
    vm.getBannerType();
    vm.query();
   },
   components: {Footer},

   methods: {
       //判断刷新
       flush(){
           if(this.$route.query.flush==1) {
               hasNext=true;
               isloadPage=false;
           }
       },
            // 105/747/384
        initSession4Test(){
                let url ='/initSession4Test/79185';
                    vm.receiveData.getData(vm,url,'Data',function(){
                });
        },
        getBannerType() {
            vm.receiveData.getData(vm,'banner/6','res',function(){
                if(vm.res.success) {
                    vm.banners=vm.res.result;
                }else {
                    // alert("获取banner异常");
                } 
            });
            // vm.receiveData.getData(vm,'banner/5','res',function(){
            //     if(vm.res.success) {
            //         vm.titles=vm.res.result;
            //     }else {
            //         // alert("获取banner异常");
            //     } 
            // });
        },
       query() {
            vm.receiveData.getData(vm,"onsales/v2/1000/"+vm.page,"res", function() {
                if (vm.res.success) {
                    vm.temais = vm.res.result;
                    vm.load=false;
                    vm.page++;
                } else {
                    vm.temais=[];
                    vm.load=false;
                    alert(vm.messages)
                }
            })
       },
       Href(id) {
           vm.$router.push({path:'/cardrolldetail',query:{'ruleId':id}})
       },
        getscroll(e) {
            var st = e.srcElement.scrollTop;
            loadheight = $("#indexDiv").height();
            var hook=loadheight-st;
            if(hook<800&&hasNext&&!isloadPage){
                isloadPage=true;
                vm.hidden=true;
                vm.loadNextPage();
            }
        },
        loadNextPage() {
            let url ="onsales/v2/1000/"+vm.page;
                vm.receiveData.getData(vm,url,'Data',function(){
                    if(vm.Data.success){
                        if(vm.Data.result==null||vm.Data.result.length==0) {
                                vm.hidden=false;
                                hasNext=false;
                                isloadPage = false;
                                vm.phoneErro=true;
                                 setTimeout(() => {
                                    vm.phoneErro=false;
                                }, 1000);
                            } else {
                                isloadPage = false;
                                 vm.hidden=false;
                                vm.temais = vm.temais.concat(vm.Data.result);
                                vm.page++;  
                            }
                    }else {
                        isloadPage = false;
                        alert(vm.Data.messages)
                    }
            });
        }
   },

   computed: {},
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
#indexdivs {
    position:absolute;
    left: 0;
    top:0;
    right: 0;
    bottom: 0;
    overflow:auto;
}
 /* load */
 .product-l{
	height:1px; 
	background-color:#d3d3d3; 
	bottom: -28px; 
	position:relative; 
	margin:0 10px;
}

.product-d-d{
   	position: relative; 
   	text-align: center;
   	width: 100%; 
   	padding: 15px 0;
}
.product-d-d-s{
   	background-color: white ; 
   	padding: 0 10px;
}
.store-icon{
   	height:15px ; 
   	width: 15px; 
}
.fs17 {
    font-size:17px;
}
 /* --- */
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
    text-overflow: ellipsis;
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
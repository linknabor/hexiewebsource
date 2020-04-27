<template>
   <div class="section" @scroll="getscroll">
        <mt-navbar v-model="selected" class="tabNav">
				<mt-tab-item id="0">物业板块</mt-tab-item>
				<mt-tab-item id="1">业委会板块</mt-tab-item>
				<mt-tab-item id="2">居委会板块</mt-tab-item>
		</mt-navbar>

        <!-- tab-container -->
        <mt-tab-container v-model="selected">
            <mt-tab-container-item id="0" class="word">
                <div  class="section3_zixuns" v-for="(item,index) in zixuns1" @click="jumpToDetail(item.id)" :key="index">
                    <div class="section3_sub_main_left">
                        <img class="section3_sub_img" :src="item.smallImage"/>
                    </div>
                    <div class="section3_sub_main_right">
                        <div class="section3_sub_title subadd">{{item.title}}</div>
                        <div class="section3_sub_content ">{{item.summary}}</div>
                    </div>
                </div>
            </mt-tab-container-item>
            <mt-tab-container-item id="1" class="word">
                <div  class="section3_zixuns" v-for="(item,index) in zixuns2" @click="jumpToDetail(item.id)" :key="index">
                    <div class="section3_sub_main_left">
                        <img class="section3_sub_img" :src="item.smallImage"/>
                    </div>
                    <div class="section3_sub_main_right">
                        <div class="section3_sub_title subadd">{{item.title}}</div>
                        <div class="section3_sub_content">{{item.summary}}</div>
                    </div>
                </div>
            </mt-tab-container-item>
            <mt-tab-container-item id="2"  class="word" >
                <div class="section3_zixuns" v-for="(item,index) in zixuns3" @click="jumpToDetail(item.id)" :key="index">
                    <div class="section3_sub_main_left">
                        <img class="section3_sub_img" :src="item.smallImage"/>
                    </div>
                    <div class="section3_sub_main_right">
                        <div class="section3_sub_title subadd">{{item.title}}</div>
                        <div class="section3_sub_content">{{item.summary}}</div>
                    </div>
                </div>
            </mt-tab-container-item>
        </mt-tab-container>
   </div>
</template>

<script>
let vm;
export default {
   data () {
       return {
            selected:this.$route.query.type || '0',
            zixuns1:[],
            zixuns2:[],
            zixuns3:[],
            type:this.$route.query.type || '0',
            page:0,
            isloadPage:false
       };
   },
   created() {
       vm=this;
   },
   mounted() {
    //    let _this = this;
	// 			let url = '/initSession4Test/105';
	// 			_this.receiveData.getData(_this,url,'Data',function(){
	// 				// vm.tab();
	// 			});
       vm.tab();
   },

   components: {},
    watch:{
        selected(nes,nel) {
           vm.type=nes;
           vm.page=0;  
           vm.tab();
        }   
    },
   methods: {
         tab(){
				this.common.invokeApi("GET", "messages/"+vm.type+"/"+vm.page, null, null, function(n) {
                    if(vm.type=='0') {
					    vm.zixuns1 = n.result;
                    }else if(vm.type=='1'){
					    vm.zixuns2 = n.result;
                    }else {
					    vm.zixuns3 = n.result;
                    }
					vm.page++;
				}, function() {

				})		
        },
               //分页
       getscroll(e) {
            var st = e.srcElement.scrollTop;
            var ad=window.innerHeight;
            var hd=$('.word').height();
            console.log(st,ad,hd)
            if( st+ad >=hd && !vm.isloadPage) {
                vm.isloadPage=true;
                vm.loadNextPage();
            }
        },
        loadNextPage() {
          vm.receiveData.getData(vm,"messages/"+vm.type+"/"+vm.page,'Data',function(){
                 if(vm.Data.success) {
                    if(vm.Data.result.length>0) {
                        if(vm.type=='0') {
                            vm.zixuns1 =vm.zixuns1.concat(vm.Data.result);
                        }else if(vm.type=='1'){
                            vm.zixuns2 =vm.zixuns2.concat(vm.Data.result);
                        }else {
                            vm.zixuns3 =vm.zixuns3.concat(vm.Data.result);
                        }
                        vm.isloadPage=false;
                        vm.page++
                    }
                 }else {}
            });
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
				}else if(mid==239){
					window.location.href="https://mp.weixin.qq.com/s/9kW4VqWJB3P74zwZM1R2Lw";
				}else if(mid==240){
					window.location.href="https://mp.weixin.qq.com/s/mSdQgIyVYBkG_Ceorxcl2g";
				}else if(mid==245){
					window.location.href="https://mp.weixin.qq.com/s/ICAowITM_9n72BsBMxFZ8Q";
				}else if(mid==246){
					window.location.href="https://mp.weixin.qq.com/s/Jp9fBZXSK4lyoImTL92iqw";
				}else{
					this.$router.push({
						path:'/message',
						query:{
							messageId:mid
						}
					})
		    	}
        }  
	  },

   computed: {},
}
</script>



<style  scoped>
.section {
    position: absolute;
    width:100%;
    height: 100%;
    font-family: 微软雅黑;
    background: rgb(255, 255, 255);
    overflow:auto;
}
.section .mint-navbar .mint-tab-item.is-selected {
    border-bottom: 1px solid #26a2ff;
    margin-bottom: 0px;
}
.tabNav {
    border-bottom: 1px solid #ccc;
}
.section3_zixuns{height: 105px;border-bottom: 1px solid #d4cfc8;
	background-color: white;}
.section3_sub_main_left{height: 105px;float: left;}
.section3_sub_main_right{height: 105px;float: left;
    width: 60%;margin-left: 6%;text-align: left;}
.section3_sub_img{width: 100px;height: 75px;margin: 15px 0px 15px 0px;
    float: left;}
.section3_sub_title{height: 18px;margin: 16px 0px 0px 0px;
    font-size: 15px;color: #000000;}
.subadd {
	overflow: hidden;/*超出部分隐藏*/
	white-space: nowrap;/*不换行*/
	text-overflow:ellipsis;
	/* padding: 1px; */
}
.san {
	display: -webkit-box;
		-webkit-box-orient: vertical;
		 -webkit-line-clamp: 3; /*//需要控制的文本行数 */
		overflow: hidden;
}
.section3_sub_content{height: 59px;margin: 10px 0px 0px 0px;
    font-size: 13px;color: #a1a1a1;}
</style>
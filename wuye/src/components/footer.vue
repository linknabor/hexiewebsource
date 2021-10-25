<style scoped>
.footer {width: 100%;height: 60px;position: fixed;bottom: 0;
  left: 50%;-webkit-transform: translate3d(-50%,0,0);transform: translate3d(-50%,0,0);
  overflow: hidden;background-color: #fff;border-top: #eceded;
  -webkit-box-shadow: 0 0 4px rgba(0,0,0,.2);box-shadow: 0 0 4px rgba(0,0,0,.2)}
.footer li {float: left;text-align: center;height: 100%;
/* width: 50%; */
}
.footer a {color: #777;font-size: 14px}
.footer a:hover,.footer a:focus {color: #666;font-size: 18px}
.footer a.active {color: #ff8a00}
.footer .nav-controller {position: relative;height: 100%;display: block;padding-top: 10px}
.footer .nav-controller i {display: block;font-size: 12px;margin-bottom: 0px; height:28px}
.footer_logo{background-position: 50% 0;background-size: 22px;
    background-repeat: no-repeat;}
#login {
    position: fixed;
    top: 35%;
    left: 50%;
    width: 60px;
    height: 60px;
    line-height: 60px;
    margin-left: -30px;
    text-align: center;
    z-index: 1998;
    -moz-border-radius: 15px;
    -webkit-border-radius: 15px;
}
/* 合协 */
.footer_wuye_selected{background-image: url('../assets/images/common/icon_property_selected.png');}
.footer_person{background-image: url('../assets/images/common/icon_my.png');}
.footer_home{background-image: url('../assets/images/common/icon_daojia.png');}
.footer_group{background-image: url('../assets/images/common/icon_pindan.png');}

/* 大楼 */
.footer_fuwu_baofang {background-image: url('../assets/images/icon/icon_property_selected.png')}
.footer_shequ_baofang {background-image: url('../assets/images/icon/icon_daojia.png')}
.footer_person_baofang {background-image: url('../assets/images/icon/icon_my.png')}
.footer_group_baofang{background-image: url('../assets/images/common/icon_pindan.png');}
/* 奉贤 */
.footer_fuwu_liangyou {background-image: url('../assets/images/icon/icon_property_selected.png')}
.footer_shequ_liangyou {background-image: url('../assets/images/icon/icon_daojia.png')}
.footer_person_liangyou {background-image: url('../assets/images/icon/icon_my.png')}
.footer_group_lianyou{background-image: url('../assets/images/common/icon_pindan.png');}
/* 金桥 */
.footer_fuwu_weifa {background-image: url('../assets/images/icon/icon_property_selected.png')}
.footer_shequ_weifa {background-image: url('../assets/images/icon/icon_daojia.png')}
.footer_person_weifa {background-image: url('../assets/images/icon/icon_my.png')}
.footer_group_weifa{background-image: url('../assets/images/common/icon_pindan.png');}
/* 友宜 */
.footer_fuwu_youyi {background-image: url('../assets/images/icon/icon_property_selected.png')}
.footer_shequ_youyi {background-image: url('../assets/images/icon/icon_daojia.png')}
.footer_person_youyi {background-image: url('../assets/images/icon/icon_my.png')}
.footer_group_youyi{background-image: url('../assets/images/common/icon_pindan.png');}
/* 贵州 */
.footer_fuwu_guizhou {background-image: url('../assets/images/icon/footer_shequ_selected.png')}
.footer_shequ_guizhou {background-image: url('../assets/images/icon/footer_zenzhi.png')}
.footer_person_guizhou {background-image: url('../assets/images/icon/footer_wode.png')}
.footer_group_guizhou{background-image: url('../assets/images/common/icon_pindan.png');}

.overlay-loading{
  margin-top: 3rem;
}

</style>

<template>
	<div class="index">
    <footer class="footer">
      <nav>
        <ul  >
          <li ref="listli" v-for="item in list" :key="item.id" >
            <a ref="lista" :href='item.iconLink' class="nav-controller" :class="item.iconLink==link?'active':''">
              <i :class="item.iconClass"></i>
              {{item.iconName}}
            </a>
          </li>
        </ul>
      </nav>
    </footer>   
    <van-overlay :show="showOverlay">
    	<div class="overlay-loading">
			  <!-- <van-loading type="spinner" color="#ff8a00" vertical>加载中...</van-loading> -->
    	</div>
    </van-overlay>
    
	</div>
</template>

<script>
let vm;
import Bus from '../api/bus.js'
import { Loading, Overlay } from 'vant'
import Storage from '../assets/js/storage.js'

export default{
    data(){
      return {
        list:[],
        link:'',
        userInfo:{},
        showOverlay: false	//遮罩
      }
    },
    created() {
      vm=this;
    },
    mounted(){
      vm.initUserInfo();
      vm.geturl();
    },
    updated(){
      vm.getclass();
    },
    components: {
      [Loading.name]: Loading,
      [Overlay.name]: Overlay
    },
    methods: {

         initUserInfo(){
           vm.showOverlay = true
            let n = "GET",
                a = "userInfo?oriApp="+vm.getUrlParam('oriApp'),
                i = null,
                e = function(n) {
                    if(n.success&&n.result==null) {
                         reLogin();
                         return
                    }
                    if(n.result!=null) {
                      vm.list=n.result.iconList;
                      Bus.$emit('sends',n.result);
                      vm.$emit("userInfo", n.result)
                      vm.showOverlay = false
                      //存储cookie
                      vm.common.updatecookie(n.result.cardStatus,n.result.cardService,n.result.id,n.result.appid,n.result.cspId,n.result.sectId,n.result.cardPayService,n.result.bgImageList,n.result.wuyeTabsList,n.result.qrCode,n.result);
                      Storage.set('userInfo', n.result)
                      // Bus.$emit('wxSubscribe', subscribeTemplateIds);
                      // console.log(cookie.get('sectId'))
                    }
                    // cookie.set('userId',n.result.id);
                    // cookie.set('appid',n.result.appid);
                    // cookie.set('cspId',n.result.cspId);
                    // cookie.set('sectId',n.result.sectId);
                    // cookie.set('cardPayService',n.result.cardPayService);
                    // var duration = new Date().getTime()/1000 + 3600*24*30;
                    // if(n.result.bgImageList) {
                    //   for(var j=0;j<n.result.bgImageList.length;j++){
                    //       vm.common.localSet(n.result.bgImageList[j].type,n.result.bgImageList[j].imgUrl)
                    //   }
                    // }
                    // if(n.result.wuyeTabsList) {
                    //       vm.common.localSet('wuyeTabsList',JSON.stringify(n.result.wuyeTabsList));
                    // }
                },
                r = function() { 
                   vm.showOverlay = false
                };
            this.common.invokeApi(n, a, i, null, e, r);

        },
       getclass(){
         if(!vm.$refs.listli){
           return
         }
         for(var i=0;i<vm.$refs.listli.length;i++) {
            vm.$refs.listli[i].style.width=100/vm.$refs.listli.length+'%'
         } 
       },
       geturl() {
        var geturl=vm.getUrlParam('oriApp');
        if(geturl) {
             vm.link=location.origin+location.pathname+'?oriApp='+geturl;
        }else {
          vm.link=location.origin+location.pathname;
        }
       },

    }
    
}
</script>
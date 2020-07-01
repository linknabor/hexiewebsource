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
.footer_wuye_selected{background-image: url('../assets/images/fonter/icon_property.png');}
.footer_person{background-image: url('../assets/images/fonter/icon_my.png');} 
.footer_home{background-image: url('../assets/images/fonter/icon_daojia_selected.png');}
.footer_group{background-image: url('../assets/images/fonter/icon_pindan.png');}

/* 大楼 */
.footer_fuwu_baofang {background-image: url('../assets/images/icon/icon_property.png')}
.footer_shequ_baofang {background-image: url('../assets/images/icon/icon_daojia_selected.png')}
.footer_person_baofang {background-image: url('../assets/images/icon/icon_my.png')}
.footer_group_baofang{background-image: url('../assets/images/fonter/icon_pindan.png');}

/* 奉贤 */
.footer_fuwu_liangyou {background-image: url('../assets/images/icon/icon_property.png')}
.footer_shequ_liangyou {background-image: url('../assets/images/icon/icon_daojia_selected.png')}
.footer_person_liangyou {background-image: url('../assets/images/icon/icon_my.png')}
.footer_group_liangyou{background-image: url('../assets/images/fonter/icon_pindan.png');}

/* 金桥 */
.footer_fuwu_weifa {background-image: url('../assets/images/icon/icon_property.png')}
.footer_shequ_weifa {background-image: url('../assets/images/icon/icon_daojia_selected.png')}
.footer_person_weifa {background-image: url('../assets/images/icon/icon_my.png')}
.footer_group_weifa{background-image: url('../assets/images/fonter/icon_pindan.png');}

/* 友宜 */
.footer_fuwu_youyi {background-image: url('../assets/images/icon/icon_property.png')}
.footer_shequ_youyi {background-image: url('../assets/images/icon/icon_daojia_selected.png')}
.footer_person_youyi {background-image: url('../assets/images/icon/icon_my.png')}
.footer_group_youyi{background-image: url('../assets/images/fonter/icon_pindan.png');}
/* 贵州 */
.footer_fuwu_guizhou {background-image: url('../assets/images/icon/footer_shequ.png')}
.footer_shequ_guizhou {background-image: url('../assets/images/icon/footer_zenzhi_selected.png')}
.footer_person_guizhou {background-image: url('../assets/images/icon/footer_wode.png')}
.footer_group_guizhou{background-image: url('../assets/images/fonter/icon_pindan.png');}
</style>

<template>
	<div class="index">
    <footer class="footer">
      <nav>
        <ul  >
          <li ref="listli" v-for="item in list" :key="item.id">
            <a ref="lista" :href='item.iconLink' class="nav-controller " :class="item.iconLink==link?'active':''">
              <i :class='item.iconClass'></i>
              {{item.iconName}}
            </a>
          </li>
        </ul>
      </nav>
    </footer>     
    <div  v-show="login"
      style=" background: rgba(0,0,0,0.5);display: none;width: 100%;height: 100%;top: 0rem; position: fixed;z-index:999">
    </div>
    <div id="login" v-show="login"> 
      <img
        src="../assets/images/img/7f1b3b58-c5b6-4022-b1ed-dc4188c43a3a.gif"
        style="width:100%;vertical-align: middle;"
      />
    </div >
	</div>
</template>

<script>
let vm;
import Bus from '../api/bus.js';
export default{
    data(){
      return {
        list:[],
        link:'',
        login:true

      }
    },
    created() {
      vm=this;
    },
    mounted(){
      // this.initSession4Test();
      this.initUserInfo(); 
      vm.geturl();
    },
    updated(){
      vm.getclass();
    },
    methods: {
          //模仿线上用户信息
        //105/747/384
        initSession4Test() {
          let _this = this;
          let url = "/initSession4Test/62";
          _this.receiveData.getData(_this, url, "Data", function() {
            
          });
        },
        initUserInfo() {
          let _this = this;
          let n = "GET",
            a = "userInfo?oriApp=" + _this.getUrlParam("oriApp"),
            i = null,
            e = function(n) {
            if (n.success && n.result == null) {
                reLogin();
                return;
            }else {
              _this.login=false;
              _this.list=n.result.iconList;
              Bus.$emit('sends',n.result);
              var duration = new Date().getTime()/1000 + 3600*24*30;
              for(var j=0;j<n.result.bgImageList.length;j++){
                    _this.common.localSet(n.result.bgImageList[j].type,n.result.bgImageList[j].imgUrl,duration)
              }
            }
            },
            r = function() {_this.login=false;};
          _this.common.invokeApi(n, a, i, null, e, r);
        },
       getclass(){
         for(var i=0;i<vm.$refs.listli.length;i++) {
            vm.$refs.listli[i].style.width=100/vm.$refs.listli.length+'%'
         }
       },
       geturl() {
          var geturl=vm.getUrlParam('oriApp');
          if(geturl) {
              //  console.log(location.origin+location.pathname+'?oriApp='+geturl);
              vm.link=location.origin+location.pathname+'?oriApp='+geturl;
          }else {
            // console.log(location.origin+location.pathname);
            vm.link=location.origin+location.pathname;
          }
        },
    }
    
}
</script>
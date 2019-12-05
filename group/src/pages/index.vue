<style scoped>
.footer {width: 100%;height: 60px;position: fixed;bottom: 0;
  left: 50%;-webkit-transform: translate3d(-50%,0,0);transform: translate3d(-50%,0,0);
  overflow: hidden;background-color: #fff;border-top: #eceded;
  -webkit-box-shadow: 0 0 4px rgba(0,0,0,.2);box-shadow: 0 0 4px rgba(0,0,0,.2)}
.footer li {float: left;text-align: center;height: 100%;
/* width: 25%; */
}
.footer a {color: #777;font-size: 14px}
.footer a:hover,.footer a:focus {color: #666;font-size: 18px}
.footer a.active {color: #ff8a00}
.footer .nav-controller {position: relative;height: 100%;display: block;padding-top: 10px}
.footer .nav-controller i {display: block;font-size: 12px;margin-bottom: 0px; height:28px}
.footer_logo{background-position: 50% 0;background-size: 22px;
    background-repeat: no-repeat;}
/* 合协 */
.footer_wuye_selected{background-image: url('../assets/images/footer/icon_property.png');}
.footer_person{background-image: url('../assets/images/footer/icon_my.png');}
.footer_home{background-image: url('../assets/images/footer/icon_daojia.png');} 
.footer_group{background-image: url('../assets/images/footer/icon_shopping_selected.png');}
/* 大楼 */
.footer_fuwu_baofang {background-image: url('../assets/images/icon/icon_property.png')}
.footer_shequ_baofang {background-image: url('../assets/images/icon/icon_daojia.png')}
.footer_person_baofang {background-image: url('../assets/images/icon/icon_my.png')}
.footer_group_baofang{background-image: url('../assets/images/footer/icon_shopping_selected.png');}
/* 奉贤 */
.footer_fuwu_liangyou {background-image: url('../assets/images/icon/icon_property.png')}
.footer_shequ_liangyou {background-image: url('../assets/images/icon/icon_daojia.png')}
.footer_person_liangyou {background-image: url('../assets/images/icon/icon_my.png')}
.footer_group_liangyou{background-image: url('../assets/images/footer/icon_shopping_selected.png');}
/* 金桥 */
.footer_fuwu_weifa {background-image: url('../assets/images/icon/icon_property.png')}
.footer_shequ_weifa {background-image: url('../assets/images/icon/icon_daojia.png')}
.footer_person_weifa {background-image: url('../assets/images/icon/icon_my.png')}
.footer_group_weifa{background-image: url('../assets/images/footer/icon_shopping_selected.png');}
/* 友宜 */
.footer_fuwu_youyi {background-image: url('../assets/images/icon/icon_property.png')}
.footer_shequ_youyi {background-image: url('../assets/images/icon/icon_daojia.png')}
.footer_person_youyi {background-image: url('../assets/images/icon/icon_my.png')}
.footer_group_youyi{background-image: url('../assets/images/footer/icon_shopping_selected.png');}

/* 贵州 */
.footer_fuwu_guizhou {background-image: url('../assets/images/icon/footer_shequ.png')}
.footer_shequ_guizhou {background-image: url('../assets/images/icon/footer_zenzhi.png')}
.footer_person_guizhou {background-image: url('../assets/images/icon/footer_wode.png')}
.footer_group_guizhou{background-image: url('../assets/images/footer/icon_shopping_selected.png');}
</style>

<template>
	<div class="index">
		<!-- <router-view class="contetn"></router-view> -->
    <footer class="footer">
      <nav>
        <ul>
         <li ref="listli" v-for="item in list" :key="item.id" >
            <a ref="lista" :href='item.iconLink' class="nav-controller" :class="item.iconLink==link?'active':''">
              <i :class="item.iconClass"></i>
              {{item.iconName}}
            </a>
          </li>
        </ul>
      </nav>
    </footer>     	
	</div>
</template>

<script>
  import cookie from 'js-cookie';
  import Bus from '../api/bus.js';
  let vm;
	export default{
    data() {
      return {
        list:[],
        link:'',
      }
    },
    created() {
      vm=this;
    },
    mounted() {
      // vm.initSession4Test();
      vm.initUserInfo();

      vm.geturl();
      
    },
    updated(){
      vm.getclass();
    },
    methods:{
        //模仿线上用户信息/105/747/384/
      initSession4Test(){
          let url = '/initSession4Test/79187';
              vm.receiveData.getData(vm,url,'Data',function(){
          });
      },
      initUserInfo(){
            let n = "GET",
                a = "userInfo?oriApp="+vm.getUrlParam('oriApp'),
                i = null,
                e = function(n) {
                    if(n.success&&n.result==null) {
                            reLogin();
                    }
                    if(n.result!=null) {
                        Bus.$emit('logins',false)
                        vm.list=n.result.iconList;
                    }
                   
                },
                r = function() { 
                };
            this.common.invokeApi(n, a, i, null, e, r);
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
<style scoped>
.contetn {
  padding-bottom:72px;
}
</style>

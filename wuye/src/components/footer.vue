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
/* .footer_home{background-image: url('../assets/images/common/icon_daojia.png');} */
/* .footer_temai{background-image: url('../assets/images/common/icon_shopping.png');} */

/* 合协 */
.footer_wuye_selected{background-image: url('../assets/images/common/icon_property_selected.png');}
.footer_person{background-image: url('../assets/images/common/icon_my.png');}

/* 大楼 */
.footer_fuwu_baofang {background-image: url('../assets/images/icon/icon_property_selected.png')}
.footer_shequ_baofang {background-image: url('../assets/images/icon/icon_daojia.png')}
.footer_person_baofang {background-image: url('../assets/images/icon/icon_my.png')}
/* 奉贤 */
.footer_fuwu_liangyou {background-image: url('../assets/images/icon/icon_property_selected.png')}
.footer_shequ_liangyou {background-image: url('../assets/images/icon/icon_daojia.png')}
.footer_person_liangyou {background-image: url('../assets/images/icon/icon_my.png')}
/* 金桥 */
.footer_fuwu_weifa {background-image: url('../assets/images/icon/icon_property_selected.png')}
.footer_shequ_weifa {background-image: url('../assets/images/icon/icon_daojia.png')}
.footer_person_weifa {background-image: url('../assets/images/icon/icon_my.png')}
/* 友宜 */
.footer_fuwu_youyi {background-image: url('../assets/images/icon/icon_property_selected.png')}
.footer_shequ_youyi {background-image: url('../assets/images/icon/icon_daojia.png')}
.footer_person_youyi {background-image: url('../assets/images/icon/icon_my.png')}

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
	</div>
</template>

<script>
let vm;
import Bus from '../api/bus.js'
export default{
    data(){
      return {
        list:[],
        link:'',
      }
    },
    created() {
      vm=this;
    },
    mounted(){
      let url = '/initSession4Test/1';
                vm.receiveData.getData(vm,url,'Data',function(){
            });
      // vm.initUserInfo();
      vm.geturl();
    },
    updated(){
      vm.getclass();
    },
    methods: {
         initUserInfo(){
            let n = "GET",
                a = "userInfo?oriApp="+vm.getUrlParam('oriApp'),
                i = null,
                e = function(n) {
                   Bus.$emit('sends',n.result)
                    if(n.result!=null) {
                      vm.list=n.result.iconList;
                    }
                    if(n.success&&n.result==null) {
                         reLogin();
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
             vm.link=location.origin+location.pathname+'?oriApp='+geturl;
        }else {
          vm.link=location.origin+location.pathname;
        }
       },

    }
    
}
</script>
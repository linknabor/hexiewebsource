<style scoped>
.footer {width: 100%;height: 60px;position: fixed;bottom: 0;
  left: 50%;-webkit-transform: translate3d(-50%,0,0);transform: translate3d(-50%,0,0);
  overflow: hidden;background-color: #fff;border-top: #eceded;
  -webkit-box-shadow: 0 0 4px rgba(0,0,0,.2);box-shadow: 0 0 4px rgba(0,0,0,.2)}
.footer li {float: left;width: 50%;text-align: center;height: 100%}
.footer a {color: #777;font-size: 14px}
.footer a:hover,.footer a:focus {color: #666;font-size: 18px}
.footer a.active {color: #ff8a00}
.footer .nav-controller {position: relative;height: 100%;display: block;padding-top: 10px}
.footer .nav-controller i {display: block;font-size: 12px;margin-bottom: 0px; height:28px}
.footer_logo{background-position: 50% 0;background-size: 22px;
    background-repeat: no-repeat;}
.footer_home{background-image: url('../assets/images/common/icon_daojia.png');}
.footer_temai{background-image: url('../assets/images/common/icon_shopping.png');}
.footer_wuye_selected{background-image: url('../assets/images/common/icon_property_selected.png');}
.footer_person{background-image: url('../assets/images/common/icon_my.png');}
</style>

<template>
	<div class="index">
    <footer class="footer">
      <nav>
        <ul>
          <li>
            <a href="https://test.e-shequ.com/weixin/wuye/index.html" class="nav-controller active">
              <i class="footer_logo footer_wuye_selected"></i>社区
            </a>
          </li>
          <li>
            <a href="https://test.e-shequ.com/weixin/person/index.html" class="nav-controller">
              <i class="footer_logo footer_person"></i>我的
            </a>
          </li>
        </ul>
      </nav>
    </footer>     	
	</div>
</template>

<script>
    // import cookie from 'js-cookie'
    export default{
        mounted(){
            
        }
    }
</script>
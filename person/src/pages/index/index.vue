<template>
   <div class="ind"> 
        <div class="avatar-wrap rel ov">
                <div class=" menu-person-link-white" @click="gotoEdit">
                        <img class="avatar center-bg"  :src="user.headimgurl" style="border: 2px solid white; float: left;">
                        <span class=" avatar-info" style="float: left;overflow: hidden;
                        width: 60%;">
                        <div class="name fs16">{{user.name}}</div>
                        <div class="fs14">常住小区&nbsp;{{user.city}}&nbsp;{{user.xiaoquName}} </div>
                        </span>
                </div>

                <div id="point-list" style="border-bottom: none;" class="div_bottom">
                    <div class="point-item-wrap" >
                        <div class="point-item">
                            <div class="point-info fs16">{{user.zhima}}</div>
                            <div class="point-title fs14">我的芝麻</div>
                        </div>
                    </div>
                    <div class="point-item-wrap" >
                        <div class="point-item">
                            <div class="point-info fs16">{{user.lvdou}}</div>
                            <div class="point-title fs14">我的绿豆</div>
                        </div>
                    </div>
                    <div class="point-item-wrap">
                        <div class="point-item" @click="coupons">
                            <div class="point-info fs16">{{user.couponCount}}</div>
                            <div class="point-title fs14">我的现金劵</div>
                        </div>
                    </div>
                </div>
         </div>

         <div class="info-wrap" style="overflow:hidden; clear: both; border-bottom:none ;">
                 <!-- 链接地址要换 -->
                <a :href="this.basePageUrl+'orderpay.html?start=123#/orders'" class="input-wrap menu-person-link lite-divider">
                        <span class="input-info lf30 fs16">全部订单</span>
                        <span class="fr fs14 left_color">查看全部订单&nbsp;&nbsp;&nbsp;&nbsp;</span>
                </a> 
          </div>

        <div id="module-list" >
            <div class="module-item-wrap">
                <!-- 链接地址要换 -->
                 <a :href="this.basePageUrl+'orderpay.html?start=123#/onsaleorders'" class="module-item">
                    <div class="module-logo logo1" ></div>
                    <div class="module-title fs14">商品订单</div>
                </a>

            </div>
            <div class="module-item-wrap">
                <a class="module-item" :href="this.basePageUrl+'orderpay.html?start=123#/grouporders'">
                    <div class="module-logo logo2" ></div>
                    <div class="module-title fs14">团购订单</div>
                </a>    
            </div>
            <div class="module-item-wrap" >
                 <a class="module-item" :href="this.basePageUrl+'orderpay.html?start=123#/homeorders'">
                    <div class="module-logo logo3" ></div>
                    <div class="module-title fs14">服务订单</div>
                 </a>
            </div>	
	    </div>

         <div class="info-wrap" style="overflow:hidden; clear: both;">
                <router-link :to="{path:'/myrepair'}" class="input-wrap menu-person-link lite-divider">
                    <span class="input-info lf30 fs16">我的维修单</span>
                    <span class="fr fs14 left_color">查看维修单&nbsp;&nbsp;&nbsp;&nbsp;</span>
                </router-link>
               <!-- 我是维修工目前不隐藏 v-show="user.repairOperator" -->
                <router-link :to="{path:'/operatorOrders'}" class="input-wrap menu-person-link lite-divider"  v-show="user.repairOperator">
                    <span class="input-info lf30 fs16">我是维修工</span>
                    <span class="fr fs14 left_color">查看维修单&nbsp;&nbsp;&nbsp;&nbsp;</span>
                </router-link>

                <div class="input-wrap menu-person-link lite-divider" @click="Notice">
                    <span class="input-info lf30 fs16">我的消息</span>
                    <span class="fr fs14 left_color">查看消息&nbsp;&nbsp;&nbsp;&nbsp;</span>
                </div>

                <router-link :to="{path:'/myPublish'}" class="input-wrap menu-person-link lite-divider">
                    <span class="input-info lf30 fs16">我的发布</span>
                    <span class="fr fs14 left_color"><span id="mypublic"></span>查看发布&nbsp;&nbsp;&nbsp;&nbsp;</span>
                </router-link>
         </div>

        <div class="info-wrap">
                    <a :href="this.basePageUrl+'wuye/index.html?#/Myhouse'" class="input-wrap menu-person-link lite-divider ">
                        <span class="input-info lf30 fs16">我是业主</span>
                        <span class="fr fs14 left_color">绑定房屋&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    </a>
                    <a @click="gotoAddress" class="input-wrap menu-person-link lite-divider ">
                        <span class="input-info lf30 fs16">常用地址</span>
                        <span class="fr fs14 left_color">收货地址&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    </a>
       </div>
            
          <div class="info-wrap" style="border-bottom: none;">
              <!-- /abort -->
                    <router-link :to="{path:'/abort'}" href="#" class="input-wrap menu-person-link  lite-divider">
                        <span class="input-info lf30 fs16">关注我们</span>
                    </router-link>

                     <a :href="'tel:'+user.officeTel" v-show="user.officeTel!=null && user.officeTel!=''" class="input-wrap menu-person-link lite-divider special-link ">
                            <span class="input-info lf30 fs16">小区电话</span>
                            <span class="fr fs14 left_color">{{user.officeTel}}</span>
                    </a>

                    <a href="tel:021-50876295" class="input-wrap menu-person-link lite-divider special-link ">
                        <span class="input-info lf30 fs16">客服电话</span>
                        <span class="fr fs14 left_color">021-50876295</span>
                    </a>
                    <!--<a href=" " class="input-wrap menu-person-link ">   
                        <span class="input-info lf30 fs16">在线客服</span>
                    </a>-->
        </div>

        <div class="bottom-info divider" style="text-align: center; display: block;">
            <div class="divider highlight" style="text-align: center;width:100%;font-size:16px">长按关注合协社区，尊享更多服务和商品</div>
            <img style="width: 200px;" src="http://img.e-shequ.com/FrNERaxTnTNFrFO-iYMY6vx2kRe6">
	   </div>
   </div>
</template>

<script>
let vm;
import img from '../../assets/images/common/logo.jpg';
export default {
   data () {
       return {
           user: {
        	headimgurl:"",/**默认头像*/
            name:"",
        	level:"",
        	zhima:"0",
        	lvdou:"0",
            couponCount:0,
        },
        user_info: {
            avatar: img,
            nickname: "游客",
            levelname: "普通会员"
        },
        user_level:{
            0 : "普通会员",
            1 : "钻石会员",
            2 : "大楼VIP"
        },
       };
   },
   created() {
       vm=this;

   },
   mounted() {
    //    this.initSession4Test();
       this.User();
       this.updateCouponStatus();
   },
   components: {},
   methods: {
        //模仿线上用户信息
            // 105/747/384
            initSession4Test(){
                let url = '/initSession4Test/105';
                    vm.receiveData.getData(vm,url,'Data',function(){
                });
            },
       User() {
        //获取页面数据
        let n = "GET",
            a = "userInfo",
            i = null,
            d=function() {
           
            },
            e = function(n){
                    vm.user = n.result
                    vm.user.headimgurl= ""!=n.result.name|| n.result?n.result.headimgurl: vm.user_info.avatar;
                    vm.user.name= "" != n.result.name ? n.result.name: vm.user_info.nickname;
            },
            r = function(){
                vm.user={};
			    vm.user.headimgurl = vm.user_info.avatar,
			    vm.user.name = vm.user_info.nickname
            };
           this.common.invokeApi(n,a,i,d,e,r);
          },
          //更新红包状态
        updateCouponStatus(){
            var n = "GET",
            a = "updateCouponStatus",
            i = null,
            e = function(n) {
                console.log(JSON.stringify(n));
            },
            r = function() {

            };
            vm.common.invokeApi(n, a, i, null, e, r)
        },
        //点击头像
        gotoEdit() {
            if(this.common.hasRegister()) {
                this.$router.push({path:'/bindphone'})
            }else {
                this.$router.push({path:'/register'})
                // location.href="https://www.e-shequ.com/shijiazhuang/weixin/person/register.html?v=20151217"
            }
        }  ,
        //现金券
        coupons() {
            vm.$router.push({path:'/coupons'})
        },
        gotoAddress() {
            if(vm.common.hasRegister()){
                 vm.$router.push({path:'/addresses'})
            	// location.href=MasterConfig.C('basePageUrl')+"person/addresses.html?v=20151217";
        	} else {
                // location.href="https://www.e-shequ.com/shijiazhuang/weixin/person/register.html?v=20151217";
                this.$router.push({path:'/register'})
        	}
        },
        Notice() {
            window.location.href=vm.basePageUrl+'person/index.html?v=20160229#/notices';
        }
   },
   computed: {},
}
</script>

<style  scoped>
.ind {
    background-color:#fffff8;
}
.avatar-wrap {
    height: 3.1rem;
    background-color: #FF8A00;
}
.rel {
    position: relative;
}
.ov {
    overflow: hidden;
    padding: 1px;
}
/* 头部 */
.menu-person-link-white {
    display: block;
    background: url(../../assets/images/person/icon_person_arrow.png) no-repeat;
    background-size: 7px 14px;
    height: 1.5rem;
    margin-right: 10px;
    background-position: right 36px;
}
.avatar-wrap span {
    display: inline-block;
    vertical-align: middle;
}
.avatar {
    margin: 15px;
}
.center-bg {
    background-size: cover;
    background-position: center;
}
.avatar {
    height: 60px;
    width: 60px;
    /* margin: 15px 20px; */
    border-radius: 50%;
}
.avatar-info {
    color: #fff;
}
.name {
    margin-top: 25px;
    margin-bottom: 10px;
}
.fs16 {
    font-size: 16px;
}
.fs14 {
    font-size: 14px;
}
#point-list {
    width: 100%;
}
.div_bottom {
    position: absolute;
    /* bottom: 0; */
}
.left_color {
    color: #999999;
}
#point-list .point-item-wrap {
    margin-top: 0.5rem;
    width: 33%;
    float: left;
    position: relative;
}
#point-list .point-item-wrap .point-item {
    border-radius: 2px;
    -webkit-border-radius: 2px;
    height: 40px;
    margin: 0 4px 4px 0;
    display: block;
}
#point-list .point-item-wrap .point-item .point-info {
    color: white;
    text-align: center;
}
#point-list .point-item-wrap .point-item .point-title {
    margin-top: 5px;
    margin-bottom: 20px;
    text-align: center;
    position: relative;
    color: white;
}
/* 全部订单 */
.info-wrap {
    padding-left: 8px;
    padding-right: 10px;
    color: #3b3937;
    padding-bottom: 0;
    border-bottom: 10px solid #eeeeee;
}
.info-wrap {
    padding:0  4px;
    /* border-bottom: 5px solid #f9f9e9; */
    font-size: 12px;
    /* color: #3b3937; */
}
.section-title, .lite-divider {
    border-bottom: 1px solid #f2f2f2;
}
.menu-person-link {
    padding-right: 1rem;
    color: #3b3937;
}
.input-wrap {
    overflow: hidden;
    line-height: 1rem;
}
.section-title, .lite-divider {
    /* border-bottom: 1px solid #d4cfc8; */
    padding-left: 15px;
}
.menu-person-link {
    display: block;
    background: url(../../assets/images/person/icon_arrow.png) no-repeat;
    background-size: 7px 14px;
    background-position: right center;
    padding-right: 15px;
}
/* 订单服务 */
#module-list {
    width: 100%;
    overflow: hidden;
}
#module-list .module-item-wrap {
    margin-top: 8px;
    width: 33%;
    float: left;
    border-bottom: 10px solid #eeeeee;
    position: relative;
}
#module-list .module-item-wrap .module-item {
    margin-top: 10px;
    display: block;
    width: 100%;
    height: 1.5rem;
    background-position: 50% 0;
    background-size: 42px;
    background-repeat: no-repeat;
}
#module-list .module-item-wrap .module-item {
    font-size: 16px;
    color: #3b3937;
}
#module-list .module-item-wrap .module-item {
    -webkit-border-radius: 2px;
    margin: 0 4px 4px 0;
}
.module-logo {
    margin-top: 4px;
    display: block;
    height: 43px;
    background-position: 50% 0;
    background-size: .6rem;
    background-repeat: no-repeat;
}
.module-title {
    text-align: center;
    margin-top: 10px;
    color: #3b3937;
}
.logo1 {
background-image: url("../../assets/images/person/icon_person_tehui.png");
}
.logo2 {
background-image: url("../../assets/images/person/icon_person_tuangou.png");
}
.logo3 {
 background-image: url("../../assets/images/person/icon_person_yuyue.png");
}

.bottom-info {
    padding: 20px 15px 5px 15px;
}
.divider {
    border-bottom: 10px solid #f7f7f2;
}
.highlight {
    color: #ff8a00;
}
.divider {
    border-bottom: 10px solid #f7f7f2;
}
.special-link {
    padding-right: 0;
    background: none;
}
</style>
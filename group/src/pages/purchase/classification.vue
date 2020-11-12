<template>
    <div>
        <div class="ification">
             <!-- <div class="header">
                    <i class="iconfont icon-fangdajing"></i>
                    <input type="search" placeholder="搜索商品"  v-model="search"  @click="searchs()" @blur="fixScroll">
            </div> -->
            <div class="content" >
               <div class="fl ov type-left" ref="wrapper">
                   <ul>
                       <li v-for="(item,index) in Category" :key="item.id" @click="showtype(item,index)" :class="{active:index==elm}">
                           <span  :class="{action:index==elm}" >{{item.name}}</span> 
                           <div class="counts" v-show="item.count != 0">{{item.count}}</div>
                       </li>
                   </ul>
               </div>
               <div class="ov type-right" ref="wrappers">
                   <div>
                        <div class="r-content" v-for="(item,index) in wares" :key="item.id" >
                            <div class="zddm" @click="details(item.ruleId)"></div>
                            <div class="fl imgs">
                                <img :src="item.productPic" alt="">
                            </div>
                            <div class="ov text-right">
                                <span class="f14 marg15 littleBit">{{item.ruleName}}</span><br>
                                <del class="marg15">¥{{item.oriPrice}}</del><br>
                                <span class="color">¥{{item.price}}</span>
                                <div class="cart"  @click="clkart(item)" v-show="item.count == 0 && item.totalCount > item.count" ><i class="iconfont icon-gouwuchezhengpin"></i></div>
                                <div class="carttext" v-show="item.totalCount <= item.count ">无货</div>
                                <div class="choose-num" v-show="item.count > 0 && item.totalCount > item.count">
                                        <span class="reducee" :class="{'reduceecolor':item.count >= 2}" @click="reducee(item)">-</span>
                                        <!-- <input type="number" class="numberr" v-model="item.count" readonly> -->
                                        <span  class="numberr reduceecolor"> {{item.count}}</span>
                                        <span class="addd" :class="{'adddcolor':item.ruleId == xiangou}" @click="add(item,index)">+</span>
                                </div>
                            </div>
                        </div>
                   </div>
               </div>
            </div>
            <div style="height:49px;"></div>
            <div class="footer" @click="pay">立即购买</div>
        </div>
    </div>
</template>

<script>
let vm ;
let map = new Map();
let promap = new Map();
import BScroll from 'better-scroll';
export default {
    data() {
        return {
            search:'',
            elm:0,
            count:0,
            cart:'0',
            actindex:0,
            cartnumber:'',
            clientHeight:document.documentElement.clientHeight-49,
            Category:[],
            wares:[],
            ruleIdlist:[],
            cartlist:[],
            sectId:'',
            xiangou:'', 
        };
    },
    created() {
        vm = this;
    },
    components: {

    },
    computed: {

    },
    mounted() {
        vm.changeFixed();
        vm.info();
    },
    methods: {
        info() {
            let n = "GET",
                a = "userInfo?oriApp="+vm.getUrlParam('oriApp'),
                i = null,
                e = function(n) {
                    if(n.success&&n.result==null) {
                            reLogin();
                    }
                    if(n.result!=null) {
                        vm.sectId = n.result.sectId;
                        vm.getcart();
                        vm.common.updatecookie(n.result.cardStatus,n.result.cardService,n.result.id,n.result.appid,n.result.cspId,n.result.sectId,n.result.cardPayService,n.result.bgImageList,n.result.wuyeTabsList,n.result.qrCode,n.result);
                    }
                },
                r = function() { 
                  
                };
            this.common.invokeApi(n, a, i, null, e, r); 
       },
        //设置高度
        changeFixed() {
            vm.$refs.wrapper.style.height = vm.clientHeight+'px';
            vm.$refs.wrappers.style.height = vm.clientHeight+'px';
        },
        initScrollleft() {
            vm.$nextTick(()=> {
                if(!vm.Scroll) {
                    vm.Scroll = new BScroll(vm.$refs.wrapper,{
                        click:true, //配置允许点击事件
                        scrollY:true, // 开启纵向滚动
                        useTransition:false, // 防止iphone微信滑动卡顿
                        bounce:false    //关闭弹性
                    })
                }else {
                    vm.Scroll.refresh(); // 重新计算 better-scroll，当 DOM 结构发生变化的时确保滚动效果正常
                }
            })
        },
        initScrollright() {
            vm.$nextTick(()=> {
                if(!vm.Scroll1) {
                    vm.Scroll1 = new BScroll(vm.$refs.wrappers,{
                        click:true, //配置允许点击事件
                        scrollY:true, // 开启纵向滚动
                        useTransition:false, // 防止iphone微信滑动卡顿
                        bounce:false    //关闭弹性
                    })
                }else {
                    vm.Scroll1.refresh(); // 重新计算 better-scroll，当 DOM 结构发生变化的时确保滚动效果正常
                }
            })
        },
        // 点击购物车
        clkart(item) {
            if(item.totalCount < 0) {

            }
            vm.addurl(item);

        },
        //ios中留白问题
        fixScroll() {
            let u = navigator.userAgent;
            let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
            if (isiOS) {
            window.scrollTo(0,0);
            }
        },
        // 点击减
        reducee(item) {
            vm.delurl(item);
        },
        delurl(item) {
            item.count--;
            if(item.count < 0) {
                item.count = 0;
                return;
            }
            var pcount = map.get(item.productCategoryId);
            if(!pcount) {
                pcount = 0;
            }
            pcount--;
            map.set(item.productCategoryId,pcount);

            var procount = promap.get(item.ruleId);
            if(!procount) {
                procount = 0;
            }
            procount--;
            promap.set(item.ruleId,procount);

            let url ='/cart/del';
            var data = {
                ruleId:item.ruleId,
                count:1,
            }
            vm.receiveData.postData(vm,url,data,'res',function(){
                if(vm.res.success) {
                    
                }else {
                    if(vm.res.message !=null) {
                        alert(vm.res.message)
                    }
                }
            });
            for(var i =0; i<vm.Category.length;i++) {
                if(vm.Category[i].id == item.productCategoryId) {
                        vm.Category[i].count = map.get(vm.Category[i].id);
                        return
                }
            } 
        },
        // 点击加
        add(item,index) {
            vm.addurl(item);
        },
        addurl(item) {
            let url ='/cart/add';
            var data = {
                ruleId:item.ruleId,
                count: 1,
            }
            vm.receiveData.postData(vm,url,data,'res',function(){
                if(vm.res.success) {
                    item.count++;
                    var procount = promap.get(item.ruleId);
                    if(!procount) {
                        procount = 0;
                    }
                    procount++;
                    promap.set(item.ruleId,procount);

                    var pcount = map.get(item.productCategoryId);
                        if(!pcount) {
                            pcount = 0;
                        }
                     pcount++;
            
                     map.set(item.productCategoryId,pcount);
                    for(var i =0; i<vm.Category.length;i++) {
                        if(vm.Category[i].id == item.productCategoryId) {
                                vm.Category[i].count = map.get(vm.Category[i].id);
                                return
                        }
                    }
                }else {
                    if(vm.res.message !=null) {
                        alert(vm.res.message);
                        if(vm.res.message == '每人限购1件。') {
                            vm.xiangou = item.ruleId;
                        }
                    }
                }
            });
         
        },
         //搜索
        searchs() {
            // vm.$router.push({path:'/cartsearch'});
          
        },
        //左边列表
        getCategory() {
            let url ='/getOnsaleCategory/1001';
            vm.receiveData.getData(vm,url,'res',function(){
                if(vm.res.success) {
                    if(vm.sectId == "" || vm.sectId == 'null' || vm.sectId == 0 || vm.sectId == null) {
                        vm.Category = vm.res.result;
                    }else {
                        if(vm.res.result.length == 0) {
                            alert("您所在小区暂未开通该功能，敬请期待");
                            window.location.href = vm.basePageUrl+'wuye/index.html?'+vm.common.getoriApp()+'#/';
                            return 
                        }else {
                            vm.Category = vm.res.result;
                        }
                    }  
                    vm.query(vm.Category[0]);//默认第一个
                    vm.initScrollleft();//初始化左边滚动

                }else {
                    vm.Category = [] ;
                    if(vm.res.message !=null && vm.res.errorCode != 40001) {
                        alert(vm.res.message);
                    }
                }
                //购物车有取出左边map
                for(var i =0; i<vm.Category.length;i++) {
                    if(map.get(vm.Category[i].id)) {
                            vm.Category[i].count = map.get(vm.Category[i].id);
                    }
                }
            });
        },

        // 点击类别
        showtype(item,index) {
            vm.elm=index;
            vm.query(item);
        },
        //右边商品
        query(item) {
            let url ='/onsales/v2/1001/'+item.id+'/0 ';
            vm.receiveData.getData(vm,url,'res',function(){
                if(vm.res.success) {
                    vm.wares = vm.res.result;
                    vm.initScrollright();//初始化右边滚动
                    //购物车有取出右边map
                   for(var i =0; i<vm.wares.length;i++) {
                       if(promap.get(vm.wares[i].ruleId)) {
                            vm.wares[i].count = promap.get(vm.wares[i].ruleId);
                       }
                    }
                }else {
                    if(vm.res.message !=null  && vm.res.errorCode != 40001) {
                        alert(vm.res.message);
                    }
                }
            });
        },
        //获取购物车商品
        getcart() {
            let url ="/cart/get";
            vm.receiveData.getData(vm,url,'res',function(){
                vm.getCategory();
                if(vm.res.success) {
                        vm.cartlist = vm.res.result.items; 
                        map.clear();
                        promap.clear();
                        for(var i=0; i < vm.cartlist.length;i++) {
                             //购物车有添加到左边map
                              var pcount = map.get(vm.cartlist[i].productCategoryId);
                                if(!pcount) {
                                    pcount = 0;
                                    map.set(vm.cartlist[i].productCategoryId,vm.cartlist[i].count);
                                }else {
                                    var count = map.get(vm.cartlist[i].productCategoryId);
                                    var totalcount = vm.cartlist[i].count +count;
                                    map.set(vm.cartlist[i].productCategoryId,totalcount);
                                }
                                //购物车有添加到右边map
                                var parductcount = promap.get(vm.cartlist[i].ruleId);
                                 if(!parductcount) {
                                    parductcount = 0;
                                    promap.set(vm.cartlist[i].ruleId,vm.cartlist[i].count);
                                }else {
                                    promap.set(vm.cartlist[i].ruleId,totalcount);
                                }
                        }
                       
                        console.log(promap,map);
                        
                }else {
                    if(vm.res.message != null && vm.res.errorCode != 40001) {
                        alert(vm.res.message)
                    }
                }
            });
        }, 
        //点击商品
        details(ruleId) {
           vm.$router.push({path:"/commoditydetails",query:{'ruleId':ruleId}})
        },
        pay() {
            vm.$router.push({path:"/cart"})
        }
    }
};
</script>

<style scoped>
.ification {
    position: absolute;
    top:0;
    left:0;
    right: 0;
    bottom: 0;
}
.header {
    height: 30px;
    background-color:#F5F5F5;
    padding: 7px 12px;
    position: relative;
}
.header i {
    position: absolute;
    font-size: 0.34rem;
    top: 0.18rem;
    left: 0.4rem;
}
.header input {
    width: 100%;
    height: 100%;
    line-height: 100%;
    border-radius: 50px;
    background-color: #fff;
    border: none;
    outline: none;
    padding-left: 0.6rem;
    box-sizing: border-box;
}
ul {
    background-color:#EEEEEE;
}
.type-left {
    background-color:#EEEEEE;
}
.type-left ul li {
    width: 1.93rem;
    height:0.9rem;
    line-height: 0.5rem;
    text-align: center;
    color: #909090;
    padding: 0.2rem;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    font-family: 'SourceHanSansSC-bold';
    position: relative;
} 

.type-left ul li .counts {
    position:absolute;
    top:0.1rem;
    right:0.04rem;
    width: 0.32rem;
    height: 0.32rem;
    line-height: 0.32rem;
    font-size: 0.22rem;
    text-align:center;
    color:#fff;
    border-radius: 0.25rem;
    background-color:#F08500;
}
.type-left ul li span {
    display: block;
}
.type-left ul li.active {
    color:#101010;
    background-color:#fff;
}
.type-left ul li span.action {
    width: 100%;
    border-left: 2px solid #F08500;
}
.type-right {
    background-color: #fff;
}
.footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 49px;
    line-height: 49px;
    text-align: center;
    background-color: #F08500;
    font-size: 0.35rem;
    color: #fff;
}
.r-content {
    overflow: hidden;
    position:relative;
}
.r-content .zddm {
    position:absolute;
    width:65%;
    height: 100%;
    z-index: 99999;
}
.imgs {
    margin-top: 0.40rem;
    margin-bottom: 0.40rem;
    margin-left: 0.18rem;
    margin-right: 0.22rem;
    width: 1.54rem;
    height: 1.42rem;
}
.imgs  img {
    width:100%;
}
.text-right {
    padding-top: 0.6rem;
    position:relative;
}
.f14 {
    font-size: 0.3rem;
    color:#101010;
}
.marg15 {
    display: inline-block;
    margin-bottom: 0.26rem;
}
.color{
    color:#CE5F41;
    font-weight: 700;
}
del {
    color:#9D9E9D;
}
.cart {
    position: absolute;
    width: 0.4rem;
    height: 0.4rem;
    line-height: 0.4rem;
    text-align: center;
    border-radius: 0.18rem;
    bottom: 0.44rem;
    right: 0.323rem;
    background-color: #F08500;
    color: #fff;
}
.carttext {
    position: absolute;
    bottom: 0.44rem;
    right: 0.323rem;
    /* font-size: 0.3rem; */
    color:#F08500;
}
.cart i {
    font-size: 0.3rem;
}

.choose-num {
    position: absolute;
    right: 0;
    right: 0.2rem;
    bottom: 0.3rem;
    border:1px solid #E6E6E6;
}
.reducee{
    font-size: 0.3rem;
    width: 0.4rem;
    height: 0.4rem;
    line-height: 0.4rem;
    display: inline-block;
    text-align: center;
    color: #EDEDED;
    border-right:1px solid #E6E6E6;
    vertical-align: bottom;
}
.reduceecolor {
    color: #000;
}
.numberr {
    /* border:none;
    outline: none;
    width: 0.55rem;
    text-align: center; */

    padding:0 0.03rem;
    line-height: 0.35rem;
    text-align: center;
    vertical-align: bottom;
}
.addd {
    font-size: 0.3rem;
    width: 0.4rem;
    height: 0.4rem;
    line-height: 0.4rem;    
    display: inline-block;
    text-align: center;
    color:#000;
    border-left:1px solid #E6E6E6;
    vertical-align: bottom;
}
.adddcolor {
    color: #EDEDED;
}
.littleBit {
    width: 97%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>

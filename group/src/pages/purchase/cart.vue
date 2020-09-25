<template>
<div>
<div class="carts">
    <div class="cart">
     <!-- 图片产品名称价格数量展示   左移删除-->
    <mt-cell-swipe 
        v-for="(item,index) in cartlist.items" :key="index"
        :right="[{
            content: '删除',
            style: { background: 'red', color: '#fff' },
            handler: () => deleteSection(item,index)
        }]"
    >
        <!-- style="touch-action: none"-->
        <div class="head-border">
            <div class="fl car-select" :class="{'actives':item.selected}"  @click="checkeds(item,index)"></div>
            <div class="ov">
                <div class="fl ">
                    <div class="cart-imgs">
                        <img :src="item.productThumbPic" alt="">
                    </div>
                </div>
                <div class="ov cart-content ">
                    <span class="fname marb4 littleBit color0">{{item.ruleName}}</span><br>
                    <br>
                    <span class="marb4 free color">满{{item.freeShippingNum}}件免运费</span><br>
                    <del class="marb4">¥{{item.oriPrice}}</del><br>
                    <span class="color1">¥{{item.price}}</span><span></span>
                    <div class="choose-num">
                        <span class="reducee" :class="{'reduceecolor':item.count >= 2}" @click="reducee(item,index)">-</span>
                        <input type="number" class="numberr"  :value="item.count" readonly>
                        <span class="addd" :class="{'adddcolor':item.ruleId == xiangou}" @click="add(item,index)">+</span>
                    </div>
                </div>
            </div>
        </div>
    </mt-cell-swipe>
    </div>
    <div style="width:100%;height:50px;"></div>
    <div class="btn">
        <div class="fl btn-left">
            <div class="fl"  @click="Selectall()">
                 <div class="btn-select" :class="{'active':quan}"></div>全选
            </div>
            <div class="fr total">
                <span>合计：</span><span class="color money">¥{{totalPrice}}</span><br>
                <span>不含运费</span>
            </div>
        </div>
        <div class="fr btn-right f14"  @click="settlement">
            结算
        </div>
    </div>
</div>   
</div> 
</template>

<script>
let vm;
let totalp = 0;
let ta = 0;
export default {
    data() {
        return {
            count:0,
            cartlist:[],
            ruleId:this.$route.query.ruleId,
            totalPrice:0,
            freePrice:0,
            quan:false,
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
    watch: {
       
    },
    mounted() {
        vm.getcart();
    },
    methods: {
        //获取购物车商品
        getcart() {
            let url ="/cart/get";
            vm.receiveData.getData(vm,url,'res',function(){
                if(vm.res.success) {
                    if(vm.res.result != null) {
                        vm.cartlist = vm.res.result;  
                        vm.cartlist.items.forEach(v=> {
                        vm.$set(v, 'selected', true);
                        })
                        vm.totalPrice = (parseFloat(vm.res.result.totalPrice) - parseFloat(vm.res.result.totalShipFee)).toFixed(2);
                        if(vm.cartlist.items.length == 0) {
                            vm.quan = false;
                        }else {
                            vm.quan = true;
                        }
                    }
                }else {
                    alert(vm.res.message)
                }
            });
        },      
         // 点击减
        reducee(item,index) {
            item.count--;
            if(item.count < 1) {
                item.count = 1;
                return;
            }
            vm.delsetprice(item);
            vm.delcount(item.ruleId,1);
        },
        //减
        delcount(ruleId,deecon) {
            let url ='/cart/del';
            var data = {
                ruleId:ruleId,
                count:deecon,
            }
            vm.receiveData.postData(vm,url,data,'res',function(){
                if(vm.res.success) {
                }else {
                    if(vm.res.message !=null) {
                        alert(vm.res.message)
                    }
                }
            });
        },
        // 点击加
        add(item,index) {
            vm.addsetprice(item);
            vm.addcount(item);
        },
        // 点击加
        addcount(item) {
            let url ='/cart/add';
            var data = {
                ruleId:item.ruleId,
                count:1,
            }
            vm.receiveData.postData(vm,url,data,'res',function(){
                if(vm.res.success) {
                    item.count++;
                }else {
                    if(vm.res.message !=null) {
                        alert(vm.res.message)
                        if(vm.res.message == '每人限购1件。') {
                            vm.xiangou = item.ruleId;
                        }
                    }
                }
            });
        },
        //删除
        deleteSection(item,index) {
            vm.cartlist.items.splice(index,1);
            vm.totalPrice = (parseFloat(vm.totalPrice) -  item.price * item.count).toFixed(2);
            if(vm.cartlist.items.length == 0) {
                vm.quan = false;
            }
            vm.delcount(item.ruleId,item.count);
        },
        //选中取消
        checkeds(item,index) {
            if(vm.cartlist.items[index].selected) {
               vm.cartlist.items[index].selected = false;    
               vm.quan = false;       
            }else {
               vm.cartlist.items[index].selected = true;
               var onOff=true;
               for(var i =0;i < vm.cartlist.items.length;i++) {
                   if(!vm.cartlist.items[i].selected) {
                      onOff = false; 
                   }
               }
               if(onOff) {
                   vm.quan = true;
               }
            }
            vm.selectprice(item);
        },
        //全选
        Selectall() {
            var delpic = 0;
            if(vm.quan) {
                vm.cartlist.items.forEach(v => {
                    v.selected = false;
                })
                vm.quan = false;
                vm.totalPrice = 0; //取消全选
            }else {
                vm.cartlist.items.forEach(v => {
                    v.selected = true;
                    delpic += v.price * v.count;
                })    
                vm.quan = true;
                vm.totalPrice = parseFloat(delpic).toFixed(2);//全选
            }

        },
        //选中计算价格
        selectprice(item) {
            if(item.selected) {
                vm.totalPrice = (parseFloat(vm.totalPrice) + item.price * item.count).toFixed(2);
            }else {
                vm.totalPrice = (parseFloat(vm.totalPrice) -  item.price * item.count).toFixed(2);
            }
        },
        //加减计算价格
        addsetprice(item) {
            if(item.selected) {
                  vm.totalPrice = (parseFloat(vm.totalPrice) + parseFloat(item.price)).toFixed(2);
            }
        },
        delsetprice(item) {
            if(item.selected) {
                  vm.totalPrice = (parseFloat(vm.totalPrice) - parseFloat(item.price)).toFixed(2);
            }
        },
        settlement() {

            if(vm.totalPrice == 0) {
                return
            }
            var itemList = [];
            for(var i =0;i < vm.cartlist.items.length;i++) {
                if(vm.cartlist.items[i].selected && vm.cartlist.items[i].count>0) {
                    itemList.push({
                        ruleId:vm.cartlist.items[i].ruleId,
                        count:vm.cartlist.items[i].count,
                    })
                }
            }
            let url = '/order/check';
            let data = {
                rderType:'3',
                payType:'2',
                itemList:itemList
            }
            vm.receiveData.postData(vm,url,data,'res',function(){
                if(vm.res.success) {
                    window.localStorage.setItem('itemList',JSON.stringify(itemList));
                    window.location.href=vm.basePageUrlpay+'hxgrouppay.html?'+vm.common.getoriApp()+'#/confirmation?v=1';  
                }else {
                    if(vm.res.message !=null) {
                        alert(vm.res.message);
                    }
                }
            });
           
        }
    }
};
</script>

<style >
/* miut修改样式	 */
.carts .mint-cell-wrapper {
    padding:0;
    border-radius: 0.2rem;
}
.carts .mint-cell-title {
    -webkit-box-flex: 0; 
    -ms-flex: 0; 
    flex: 0;
}
 .mint-cell-wrapper .mint-cell-value {
    color: #888;
    width:100%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: inline-block;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
}
.carts .mint-cell-swipe-button {
    height: 100%;
    display: inline-block;
    padding: 0 10px;
    line-height: 48px;
    padding-top: 0.3rem;
    box-sizing: border-box;
}
.carts .mint-cell  {
    border-radius: 0.2rem;
    margin:0.2rem;

    background-color: #fff;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: inherit;
    min-height: 48px;
    display: block;
    overflow: hidden;
    position: relative;
    text-decoration: none;
}
</style>
<style scoped>
.carts {
    position: absolute;
    top:0;
    left:0;
    right: 0;
    bottom: 0;
    background-color:#F4F8F9; 
    /* overflow: scroll; */
}
.cart {
    background-color:#F4F8F9; 
    overflow: hidden;
}
.head-border {
    background-color: #fff;
}
.headNone {
    height: 0;
}

.car-select {
    width:1.2rem;
    height:2.23rem;
    background: url('../../assets/images/group/icon_unselect.png') no-repeat;
    background-size: .35rem;
    background-position:0.34rem 50%;
}
.cart .actives {
    background: url('../../assets/images/group/icon_selectted.png') no-repeat;
    background-size: .35rem;
    background-position:0.34rem 50%;
}
.cart-imgs {
    width: 1.6rem;
    height: 1.6rem;
    margin-top: 0.38rem;
    margin-right: 0.2rem;
}
.cart-content {
    padding-top:0.3rem;
    position:relative;
}
.fname {
    font-size:0.3rem;
   /*  height:0.27rem; */
}
.marb4 {
    margin-bottom: 0.1rem;
    display: inline-block;
}   
.free {
    font-size: 12px;
    padding:3px 2px;
    border:1px solid #F08500;
    border-radius: 5px;
} 
del {
    font-size: 12px;;
    color:#9D9E9D;
}
.color {
    color:#F08500;
}
.color1 {
    color:#CE5F41;
}
.color0 {
     color:#000;
}
/* --- */
.choose-num {
    position: absolute;
    right: 0;
    right: 0.2rem;
    bottom: 0.5rem;
    border:1px solid #E6E6E6;
}
.reducee{
    font-size: 0.3rem;
    width: 0.4rem;
    height: 0.35rem;
    line-height: 0.35rem;
    display: inline-block;
    text-align: center;
    border-right:1px solid #E6E6E6;
    color: #EDEDED;
}
.reduceecolor {
    color: #000;
}
.numberr {
    border:none;
    outline: none;
    width: 0.4rem;
    text-align: center;
}
.addd {
    font-size: 0.3rem;
    width: 0.4rem;
    height: 0.35rem;
    line-height: 0.35rem;    
    display: inline-block;
    text-align: center;
    border-left:1px solid #E6E6E6;
    color:#000;
}
.adddcolor {
    color: #EDEDED;
}
/* --- */
.btn {
    position:fixed;
    bottom:0;
    width:100%;
    height: 50px;
    background-color:#fff;
   
}
.btn-left {
    width: 50%;
    height: 50px;
    padding-left: 12%;
    padding-right: 8%;
}
.btn-right {
    width: 30%;
    height:100%;
    line-height: 50px;
    text-align:center;
    color:#fff;
    background-color:#F08500;
}
.btn-select {
    display: inline-block;
    width: 0.66rem;
    height: 50px;
    border-radius: 0.33rem;
    background: url('../../assets/images/group/icon_unselect.png') no-repeat;
    background-size: .4rem;
    background-position:0 50%;
    vertical-align: middle;
    margin-right: 0.1rem;
}
.btn-select.active {
    background: url('../../assets/images/group/icon_selectted.png') no-repeat;
    background-size: .4rem;
    background-position:0 50%;
}
.total {
    text-align: right;
    padding-top: 0.16rem;
    line-height: 0.35rem;
}
.money {
    font-weight: 600;
}
.littleBit {
    width: 97%;
    overflow: hidden; 
    text-overflow: ellipsis;
    white-space: nowrap; 
}
</style>

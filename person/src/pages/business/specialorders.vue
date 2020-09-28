<template>
    <div class="wapr">
        <div class="header ov" :class="{'header-width':evoucherOperator == 'true'}">
            <div class="fl" :class="{'white':type == 1}" @click="goorder(1)">
                <span :class="{'spanborder':type == 1}">电商订单</span>
            </div>
            <div class="fl writeshow " :class="{'white':type == 2,'writeoff':evoucherOperator == 'true' }" @click="goorder(2)">
                <span :class="{'spanborder':type == 2}">核销记录</span>
            </div>
            <div class="fl" :class="{'white':type == 3}" @click="goorder(3)">
                <span :class="{'spanborder':type == 3}">团购订单</span>
            </div>
        </div>
        <div>
            <div class="dropdown-wrap " :class="{dropdownCollapsed:dropdownCollapsed}" @click="toggleDropdown">
                <span>{{selectedName}}</span>
                <div class="dropdown" v-if="dropdownCollapsed">
                    <div
                    class="dropdown-item"
                    v-for="(item,i) in dropdowns"
                    :class="{noborder:dropdowns.length-1==i}"
                    @click="selectDropdown(i)"
                    :key="i"
                    >{{item.name}}</div>
                </div>
             </div>
        </div>
        <div class="ov lite-order pd10 " style="color:#3b3937" v-for="item in orders" :key="item.id" @click.stop="detail(item)">
            <div class="marg-bottom">
                <img class="icon-repair fl" :src="item.productThumbPic"/>
                <div class="ov right-text not-used" >   
                    <div class="spot pbottom">{{item.productName}}</div>
                    <div class="pbottom">¥{{item.price}}</div>
                    <div class="ptop ov " >
                        <span class="fl ">数量: {{item.count}}</span>
                        <span class="p15 right-color used-r">{{item.statusStr}}</span>
                    </div>
                </div>
            </div>
            <div class="mrg5">
                    <span class="fl marbottom">{{item.createDateStr}}</span>
                    <span class="fr crrd-color card-jm" @click.stop="orderConfirm(item)" v-show="item.status==9">点击发货</span>
            </div>
        </div>
        <div class="box-bg" v-show="Mask"></div>
    </div>
</template>

<script>
let vm;
import { MessageBox } from "mint-ui";
import wx from 'weixin-js-sdk';
export default {
    data() {
        return {
            Mask:false,//遮罩
            type:this.$route.query.type,
            evoucherOperator:this.$route.query.evoucherOperator,//核销卡卷
            orders: [], //订单数组
            currentStatus: "PREPARE", //参数
            dropdownCollapsed: false, //切换订单
            selectedName: "订单筛选",
            dropdowns: [
                {
                name: "全部订单",
                value: "ALL" //根据需要传给后台的查询参数修改这些value
                },
                {
                name: "配货中",
                value: "PREPARE" //根据需要传给后台的查询参数修改这些value
                },
            ],
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
        vm.query();
        // vm.initSession4Test();
    },
    methods: {
         initSession4Test() {
            let url = "/initSession4Test/8427";
            vm.receiveData.getData(vm, url, "Data", function() {});
        },
        query() {
            vm.receiveData.getData(vm, "orders/status/onsale/" + vm.currentStatus,"res", function() {
                if (vm.res.success) {
                    vm.orders = vm.res.result;
                } else {
                    if(vm.res.message !=null && vm.res.errorCode !=40001) {
                         alert(vm.res.message)
                    }
                }
                }
            );
        },
        //切换订单
        toggleDropdown() {
            vm.dropdownCollapsed = !vm.dropdownCollapsed;
        },
        //    选中切换订单
        selectDropdown(i) {
            vm.selectedName = vm.dropdowns[i].name;
            vm.currentStatus = vm.dropdowns[i].value;
            vm.query();
        },
        //切换订单
        goorder(ind) {
            if(ind == 1) {
                vm.$router.push({path:'/specialorders',query:{'evoucherOperator':vm.evoucherOperator,'type':ind}});
            }else if (ind == 2) {
                vm.$router.push({path:'/cardrollrecords',query:{'evoucherOperator':vm.evoucherOperator,'type':ind}});
            }else {
                vm.$router.push({path:'/grouporders',query:{'evoucherOperator':vm.evoucherOperator,'type':ind}})
            }
        },
        detail(item) {
            // vm.$router.push({path:'/clientdetail',query:{'orderId':item.id}})
            location.href = this.basePageUrlpay+'orderpay.html?'+this.common.getoriApp()+'#/clientdetail?orderId='+item.id;
        },
        orderConfirm(item) {
           location.href = this.basePageUrlpay+'orderpay.html?'+this.common.getoriApp()+'#/specialdetail?orderId='+item.id;
        }
    }
};
</script>

<style scoped>
.wapr {
    position:absolute;
    width:100%;
    height: 100%;
    background-color:#EEEEEE;
    overflow:auto;
}
.header {
    font-size: 14px;
    background-color:#E8E8E8;
}
.header div {
    width:50%;
    height: 45px;
    line-height: 45px;
    text-align: center;
}
.writeshow {
    display: none;
}
.header-width  div{
    width:33.3%;
}
.header .writeoff {
    display: block;
}
.header div .spanborder{
   padding-bottom:5px;
   border-bottom:2px solid #F08500;
}
.header div.white {
    background-color:white;
}

.dropdown-wrap {
  position: relative;
  padding: 15px 20px;
  border-bottom: 1px solid #d4cfc8;
  background: url('../../assets/images/community/icon_bottom.png') no-repeat;
  background-size: 12px 7px;
  background-position: 95px;
  color:#000;
  background-color:#fff;
}
.dropdownCollapsed {
  background: url('../../assets/images/community/icon_top.png') no-repeat;
  background-size: 12px 7px;
  background-position: 95px;
  background-color:#fff;
}

.lite-order {
    margin:0.2rem;
    background-color:#fff;
    border-radius: 0.2rem;
}

.pd10 {
    /* padding-top: 10px;
    padding-bottom:2px;
    padding-left: 10px;; */
    padding: 0.17rem;
}
.ov {
    overflow: hidden;
}
.icon-repair {
    height: 1.6rem;
    width: 1.6rem;
    margin-right: 15px;
    /* margin-bottom: 15px; */
    /* padding: 3%; */
    border: 1px solid #d4cfc8;
    border-radius: 3px;
}

/* 筛选弹出框 */
.dropdown {
  position: absolute;
  top: 42px;
  width: 100%;
  border: 1px solid #d4cfc8;
  background-color: #fffff8;
  z-index: 1;
}
.dropdown-item {
  padding: 15px 0;
  margin: 0 15px;
  border-bottom: 1px solid #d4cfc8;
}
.noborder {
  border: none !important;
}

.right-text {
    color:#000;
    /* line-height: 0.6rem; */
    font-size: 0.3rem;
}
.spot {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.pbottom {
    padding: 0.12rem 0;
}
.ptop {
    padding-top: 0.17rem;
}
.p15 {
    padding-right: 15px;
}
.right-color {
    color: #F0851F;
}
.not-used {
    position: relative;
}
.used-r {
    position: absolute;
    right: 3px;
    bottom: 30px;
}
.mrg5 {
    position: relative;
}
.marbottom {
    position: relative;
    top: 0.1rem
}
.marg-bottom {
    margin-bottom:0.1rem;
}
.mrg5 span{
    font-size: 0.24rem;
}
.mrg5 .card-jm {
    display: inline-block;
    padding:3px 15px;
    border-radius: 4px;
    margin-right: 0.1rem;
    position: absolute;
    right: 0;
    bottom: -0.2rem;
    z-index: 9999;
}
.mrg5 .crrd-color {
    color:#fff;
    background-color:#F08500;
}
.box-bg {width: 100%;opacity: .5;height: 100%;position: fixed;
	    background-color: #666;top: 0;left: 0;z-index: 100;}
</style>

<template>
   <div class="collocattion" >
       <div class="notice_line" id="notice_line">{{collocation.title}}}活动火热进行中</div>
       <div class="discount_title" id="discount_title">满{{collocation.satisfyAmount}}减{{collocation.discountAmount}}&nbsp;&nbsp;&nbsp;合计￥{{needPayPrice}}<span v-if="disCountAmount>0">(已优惠{{disCountAmount}}元)</span></div>
       <div class="product_detail" >
           <img class="product_picture" :src="mainItem.productPic" />
           <div class="product_content">
               <div class="product_name">{{mainItem.ruleName}}</div>
               	<div class="product_pri_area">
                    <div class="fl fs14 highlight" style="margin-left: 10px;padding-top: 20px"> ¥{{mainItem.price}} </div>
				    <div class="fl fs14" style="margin-left: 10px;padding-top: 20px;color:#888888"> <del>¥{{mainItem.oriPrice}}</del> </div>  
                    <div class="fr"  style="margin-top:8px;" >
                        <span class="sbtn btn-minus minus-btn-size" :class="{active:mainItem.count>1}" @click="minusMainCount"></span>
                        <span class="number fs16">{{mainItem.count}}</span>
                        <span class="sbtn btn-add active minus-btn-size" @click="addMainCount"></span>
				    </div>
               	</div>
           </div>   
       </div>

       <div class="coll_detail" style="margin-top: 5px;" v-for="(item,index) in otherItems" :key="item.id">
           <i class="checkbox fl" style="margin-top:40px;margin-left: 15px;" :class="{checked:item.selected}" @click="selectItem(index)"></i>
            <img class="coll_picture" :src="item.productPic" @click="gotoDetail(index)"/>
            <div class="coll_content">
                <div class="coll_name" @click="gotoDetail(index)">{{item.ruleName}}</div>
                <div class="coll_pri_area">
                    <div class="fl fs14 highlight" style="margin-left: 10px;padding-top: 12px"> ¥{{item.price}} </div>
				    <div class="fl fs14" style="margin-left: 10px;padding-top: 12px;color:#888888"> <del>¥{{item.oriPrice}}</del> </div>
                    <div class="fr" style="margin-top:8px;">
                        <span class="sbtn btn-minus minus-btn-size"  @click="minusCount(index)" :class="{active:otherItems[index]!=null&&otherItems[index].count>1}"></span>
                        <span class="number fs16">{{item.count}}</span>
                        <span class="sbtn btn-add active minus-btn-size" @click="addCount(index)"></span>
				</div>
                </div>    
            </div>   
       </div>  

       <div class="line p15 fs15" style="height:30px">
           <span class="fr">
               <span class="fs12">共{{totalCount}}个商品</span>
                <span class="total fs15">合计</span>
                <span class="fs20" style="margin-right: 5px;">¥&nbsp;{{totalAmount}}</span>
           </span>
       </div>  

       <!--	当满减底价为0或者为0.0时不显示活动信息-->
        <div class="line p15 fs15" style="height:20px;text-align:center" v-if="collocation.satisfyAmount>0">
            <span class="fl">活动优惠</span> 
            <span class="baoyou_desc" >满{{collocation.satisfyAmount}}减{{collocation.discountAmount}}</span>
            <span class="fr highlight">&nbsp; -¥{{disCountAmount}}  </span>
	    </div>
        <div class="p15  " style="height:24px">
            <span class="fr">
                <span class="highlight fs14 ml10">优惠后金额 </span> 
                <span class="fs10 mr10">（不含邮费）</span> 
                <span class="highlight fs22">¥&nbsp;{{needPayPrice}}  </span>
            </span>
	    </div>

        <!--	当满免邮费价为0或者为0.0时不显示包邮信息-->
        <div class="p15  " style="height:20px" >
            <span class=" fs15"><span class=" fs20 highlight">●</span>  快递费 {{collocation.shipAmount}}元</span> 
            <span class="fs14" v-if="collocation.freeShipAmount > 0&&collocation.shipAmount>0">，<span class="highlight">优惠后金额满{{collocation.freeShipAmount}}元包邮</span></span> 
	    </div>
        <div style="height: 80px;position: relative;">&nbsp;</div>

        <div class="btn-fixed" style="z-index:1003">
            <div  class="btn" @click="pay">
                立即购买
            </div>
	    </div>
   </div>   
</template>

<script>
let vm;
let loadheight=$('#notice_line').height();
export default {
   data () {
       return {
           collId:this.$route.query.collId,
           ruleId:this.$route.query.ruleId,
           collocation:{},
           mainItem:{},
           otherItems:[],
           disCountAmount:0,
           needPayPrice:0,
           totalCount:1,
           totalAmount:0,
           logisticeFee:0,
           showDiscountTitle:false,
       
       };
   },
   created() {
       vm=this;
   },
   mounted() {
    //    vm.common.checkRegisterStatus()
       vm.getCollocation();
       window.addEventListener('scroll',vm.getscroll)
   },

   components: {},

   methods: {
    getCollocation() {
        let url ="collocation/" + vm.collId;
        vm.receiveData.getData(vm,url,'Data',function(){
            if(vm.Data.success) {
                vm.collocation=vm.Data.result;
                vm.resetItems();
            }else {
                alert(vm.Data.message==null?"获取优惠组合信息失败！":vm.Data.message);
            }
        });
    },
    resetItems() {
        vm.mainItem={id:0};
        vm.otherItems=[];
        for(var i=0;i<vm.collocation.products.length;i++) {
            // console.log(vm.collocation.products[i].salePlanId)
            if(vm.collocation.products[i].salePlanId == vm.ruleId) {
                vm.mainItem=vm.collocation.products[i];
                vm.mainItem.count=1;
            }else {
                var item = vm.collocation.products[i];
                item.count=0;
                item.select=false;
                vm.otherItems.push(item);
            }
        }
        if(vm.mainItem.id==0){
			vm.mainItem=vm.otherItems.pop();
        }
         vm.refreshAmountCount();
    },
    //滚动
    getscroll() {
        loadheight = $('#notice_line').height();
        var st=$(window).scrollTop();
        if(loadheight-st>0&& vm.showDiscountTitle) {
            vm.showDiscountTitle=false;
            $('#discount_title').animate({top:'-30px'})
        }else if(loadheight-st<0&&!vm.showDiscountTitle) {
            vm.showDiscountTitle=true;
            $('#discount_title').animate({top:'0'})
        }     
    },
    //统计数量
    getTotalCount () {
        var count=vm.mainItem.count;
        for(var i=0;i<vm.otherItems.length;i++) {
            if(vm.otherItems[i]!=null&&vm.otherItems[i].selected) {
                count+=vm.otherItems[i].count;
            }
        }
        return count
    },
    getAmount() {
        var amount = vm.mainItem.count*vm.mainItem.price;
         for(var i=0;i<vm.otherItems.length;i++) {
            if(vm.otherItems[i]!=null&&vm.otherItems[i].selected) {
                amount+=vm.otherItems[i].count*vm.otherItems[i].price;
            }
         }
         return amount.toFixed(2)
    },
    //计算
    refreshAmountCount() {
        vm.totalCount=vm.getTotalCount();
        vm.totalAmount=vm.getAmount();
        // console.log(Number(vm.totalAmount))
        var discountTime=Math.floor(vm.totalAmount/vm.collocation.satisfyAmount);
        vm.disCountAmount=(vm.collocation.discountAmount * discountTime).toFixed(2);
        if(isNaN(vm.disCountAmount)) {
            vm.disCountAmount=0;
        }
        if(vm.collocation.freeShipAmount >0 && vm.totalAmount-vm.disCountAmount>=vm.collocation.freeShipAmount) {
            vm.logisticeFee=0;
        }else {
            vm.logisticeFee=vm.collocation.shipAmount;
        }
        if((vm.totalAmount-vm.disCountAmount)>0) {
            vm.needPayPrice=(vm.totalAmount-vm.disCountAmount).toFixed(2);
        }else {
            vm.needpayprice="0.01";
        }
    },
    //减
    minusMainCount() {
        if(vm.mainItem.count>1) {
            vm.mainItem.count--;
            vm.refreshAmountCount();
        }
    },
    //加
    addMainCount() {
        if(vm.mainItem.limitNumOnce==null||vm.mainItem.limitNumOnce==0||vm.mainItem.count<vm.mainItem.limitNumOnce) {
        		vm.mainItem.count = vm.mainItem.count+1;
        		vm.refreshAmountCount();
        	}
    },
    selectItem(idx) {
        vm.otherItems[idx].selected=!vm.otherItems[idx].selected;
        if(!vm.otherItems[idx].selected) {
            vm.otherItems[idx].count=0
        }else {
            vm.otherItems[idx].count=1;
        }
         vm.refreshAmountCount();
    },
    gotoDetail(idx) {
        vm.$router.push({path:'/onsaledetail',query:{'ruleId':vm.otherItems[idx].salePlanId}})
    },
    //下面减
    minusCount(idx) {
       if(vm.otherItems[idx].count>0) {
           vm.otherItems[idx].count--;
           vm.otherItems[idx].selected=(vm.otherItems[idx].count>0)
            vm.refreshAmountCount();
       }

    },
    //下面加 
    addCount(idx) {
        if(vm.mainItem.limitNumOnce==null || vm.otherItems[idx].count<vm.otherItems[idx].limitNumOnce) {
            vm.otherItems[idx].count++;
            vm.otherItems[idx].selected=true;
             vm.refreshAmountCount();
        }else if(vm.otherItems[idx].count== vm.otherItems[idx].limitNumOnce) {
            if(!vm.otherItems[idx].selected) {
                vm.otherItems[idx].selected=true;
                 vm.refreshAmountCount();
            }else {
                alert("该商品限购"+vm.otherItems[idx].limitNumOnce+"件")
            }
        }

    },
    pay() {
        var items=[];
        var amount=vm.mainItem.count*vm.mainItem.price;
        items.push({
            collocationId:vm.collId,
            ruleId:vm.ruleId,
            orderType:vm.collocation.salePlanType,
            count:vm.mainItem.count
        })
        for(var i=0;i<vm.otherItems.length;i++) {
            if(vm.otherItems[i]!=null&&vm.otherItems[i].selected) {
                items.push({
                    collocationId:vm.collId,
                    ruleId:vm.otherItems[i].salePlanId,
                    orderType:vm.collocation.salePlanType,
                    count:vm.otherItems[i].count
                })
            }
        }
        let url='collocation/saveToCart';
       vm.receiveData.postData(vm,url,{items:items},'res',function(){
           if(vm.res.success) {
               //跳转支付
                 location.href=vm.basePageUrlpay+'hxgrouppay.html?'+vm.common.getoriApp();
           }else {
               	alert(vm.res.message==null?"下单失败，请稍后重试！":vm.res.message);
           }
       }) 

    }
   },

   computed: {
      
   },
}
</script>

<style  scoped>
.collocattion {
    background: #F7F7F1;
    padding-bottom: 1px;
}
.notice_line {
    background: #ffe1d3;
    height: 35px;
    line-height: 35px;
    text-align: center;
    font-size: 14px;
    color: #ff6600
}
.discount_title {
    background-color: #ff8a00;
    color: white;
    text-align: center;
    width: 100%;
    height: 30px;
    line-height: 30px;
    font-size: 16px;
    position: fixed;
    z-index: 1000;
    top: -30px;
    display: block;
}
/* ------------- */
.product_detail {
    height: 90px;
    /* background-color: #F7F7F1; */
}
.product_picture {
    width: 70px;
    height: 70px;
    float:left;
    margin:15px 15px 0 15px;
    border:1px solid #e7e7e1;
}
.product_content {
    margin-right: 10px;
    margin-left: 110px;
    padding-top:15px;
}
.product_name {
    font-size:16px;
    color:#3b3937;
    line-height:16px;
    height: 32px;
    overflow: hidden;
}
.product_pri_area {
    width: 100%;
    height: 30px;
}
.fs14 {
    font-size:14px;
}
.highlight {
    color: #ff8a00;
}
.sbtn {
   display: inline-block;
   position:relative;
   border:1px solid #bfbfbf;
   width:18px;
   height: 18px;
   border-radius: 2px;
   background-repeat: no-repeat;
   background-size: 18px;
}
.sbtn.btn-minus {
    background-image: url(../../assets/images/group/btn_reduce_disable.png);
}
.sbtn.btn-minus.active {
    background-image: url(../../assets/images/group/btn_reduce.png);    
}
.sbtn.active {
    border-color: #ff8a00;
    color: #ff8a00;
}
.sbtn.btn-add {
     background-image: url(../../assets/images/group/btn_add.png);
}
.number {
    padding : 0 20px;
    vertical-align: super;
}
.fs16 {
    font-size:16px;
}
.coll_detail {
    height: 95px;
    background-color: white;
}
.checkbox {
    display: inline-block;
    width: 16px;
    height: 16px;
    background-image: url(../../assets/images/group/icon_unselect.png);
    background-size: 16px;
}
.coll_detail .checked {
    background-image: url(../../assets/images/group/icon_selected.png);
}
.coll_picture {
    width: 70px;
    height: 70px;
    float: left;
    border: 1px solid #e7e7e1;
    margin:10px;
}
.coll_content {
    margin-left: 120px;
    margin-right: 10px;
    padding-top:10px;
}
.coll_name {
    height: 32px;
    line-height: 16px;
    color:#3b3937;
    font-size: 12px;
    overflow: hidden;
}
.coll_pri_area {
    width:100%;
    border-bottom:2px solid #f7f7f1;
    height: 40px;
}
.line {
    padding:15px 15px;
    margin-left: 10px;
    background-color: #f7f7f1;
    border-bottom:1px solid #c2c2c2;
}
.fs15 {
    font-size:15px;
}
.fs12 {
    font-size: 12px;
}
.fs20 {
    font-size: 20px;
}
.baoyou_desc {
    padding:2px 15px;
    border:1px solid #ff8a00;
    color:#ff8a00;
    margin-left: 10px;
    border-radius: 2px;
}
.fs10 {
    font-size: 10px;
}
.fs22 {
     font-size: 22px;
}
.mr10 {
    margin-right: 10px;
}
.p15 {
    padding: 15px;
}
.btn-fixed {
    position: fixed;
    bottom: -15px;
    left: -15px;
    right: -15px;
}
.btn {
    height: 44px;
    line-height: 44px;
    text-align: center;
    font-size:15px;
    display: block;
    background-color: #ff8a00;
    border-radius: 3px;
    color:#fff !important;
    margin:15px;
}
</style>
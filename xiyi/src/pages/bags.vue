<template>
   <div class="bags">
       <span class="title">{{type.description}}</span>
    <div class="showlist" v-for="(bags,index) in washbags" :key="bags.id">
        <div class="fl imgshow">
            <img :src="bags.imageUrl" alt="" />
            <p class="imgtype">{{bags.title}} <span style="color:#ff8a00">{{bags.price}}</span><span style="color:#ff8a00">元</span></p>
            <p class="imgstyle">{{bags.extraDesc1}}</p>
        </div>
        <div class="fl infoshow"  v-html="bags.description">
         </div>
        <div class="fl btnhome">
            <div class="btns">
                <input class="fl reduce" type="button" @click="reduce(index)"/>
                <span class="fl nums">{{bags.count}}</span>
                <input class="fl addbtn" type="button" @click="add(index)"/>
            </div>
        </div>
    </div>
    <div style="height:50px;"></div>
    <div id="foot">
        <p class="fl paynums">
            <span style="font-size: 19px;">{{totalStr}}</span>&nbsp;&nbsp;/&nbsp;&nbsp;
            <span id="carNum">{{carNum}}</span>{{unit}}
        </p>
        <div class="fr paybtn" @click="toShopCart()">立即支付</div>
    </div>
   </div>
</template>

<script>
let vm;
import cookie from 'js-cookie'
export default {
   data () {
       return {
        type:this.$route.query.type,
        types:{},
        washbags:[],
        unit:"件",
        carNum:0,
		totals:0,
		totalStr:"0.0",
       };
   },
   created() {vm=this},
   mounted() {
        vm.getInfo();
   },
   methods: {
       getInfo() {
           if(vm.type==201) {
               vm.unit='袋'
           }
           var region =cookie.get('regionId');
            if(!region){region=19;}
            vm.receiveData.getData(vm,"yunxiyi/serviceItems/"+region+"/"+vm.type,'res',function(){
                if(vm.res.success) {
                   vm.washbags=vm.res.result.items;
		           vm.type = vm.res.result.type;
                }
            });

       },
       //减
       reduce(idx) {
           if(vm.washbags[idx].count<=0){
			vm.washbags[idx].count==0;
		}else{
			vm.washbags[idx].count--;
			vm.carNum--;
			vm.totals-=vm.washbags[idx].price;
		}
		vm.updateAmountShow()
       },
       //加
       add(idx) {
            vm.washbags[idx].count++;
            vm.carNum++;
            vm.totals+=vm.washbags[idx].price;
            vm.updateAmountShow();
       },
       //计算
       updateAmountShow() {
            if(vm.totals&&vm.totals>0){
			    vm.totalStr = vm.totals.toFixed(2);
            } else {
                vm.totalStr = "0.0";
            }
       },
       //立即支付
       toShopCart() {
           	if(vm.carNum<=0){
			alert("请选择需要清洗的衣物类型！");
			return;
		}
            var items = [];
            for(var i=0;i<vm.washbags.length;i++){
                if(vm.washbags[i].count>0) {
                    items.push({serviceId:vm.washbags[i].id,count:vm.washbags[i].count});
                }
            }
            vm.receiveData.postData( vm,"home/putToCart",{"items":items},'res', function(){
                if(vm.res.success) {
                    vm.$router.push({path:'xiyi_pay'})
                }
            })
       }
   },
   components: {},
   computed: {},
}
</script>

<style  scoped>
.bags {
    box-sizing: border-box;
    background-color: #efeeec;
    font-size: 10px;
}
.title {
    padding: 15px;
    font-size: 13px;
    display: block;
    text-align: center;
    color: #b2b2b2;
}
.showlist {
    overflow: hidden;
    background-color: #fff;
    margin: 0px 15px 15px 15px;
}
.imgshow {
    text-align: center;
    width: 40%;
}
.infoshow {
    width: 60%;
    margin-top: 15px;
    font-size: 15px;
}
.imgshow img {
    width: 100px;
    height: 100px;
    max-width: 100px;
    margin-top: 50px;
}
.imgshow .imgtype {
    font-size: 14px;
    margin: 15px 0px;
}
.imgshow .imgstyle {
    font-size: 12px;
    color: #bbb;
}
.btnhome {
    position: relative;
    margin-top: 30px;
    border-top: 1px solid #ddd;
    height: 70px;
    width: 100%;
}
.btnhome {
    position: relative;
    margin-top: 30px;
    border-top: 1px solid #ddd;
    height: 70px;
    width: 100%;
}
.btnhome .btns {
    height: 30px;
    position: absolute;
    right: 15px;
    bottom: 15px;
}
.reduce {
    width: 30px;
    height: 30px;
    border: none;
    background-color: transparent;
    background-image: url(../assets/images/index/reduce.png);
    background-size: 100%;
    font: 0/0 a;
}
.nums {
    width: 30px;
    height: 30px;
    line-height: 30px;
    font-size: 16px;
    text-align: center;
}
.addbtn {
    width: 30px;
    height: 30px;
    border: none;
    background-color: transparent;
    background-image: url(../assets/images/index/add.png);
    background-size: 100%;
    font: 0/0 a;
}
#foot {
    width: 100%;
    height: 50px;
    position: fixed;
    bottom: 0px;
    /* border: 1px solid #aaa; */
    background-color: #fff;
}
#foot .paynums {
    height: 50px;
    width: 150px;
    line-height: 50px;
    text-align: center;
    color: #ff8a00;
}
#foot .paybtn {
    height: 40px;
    width: 120px;
    line-height: 40px;
    text-align: center;
    background-color: #ff8a00;
    margin: 5px 30px 0px 0px;
    color: #fff;
    border-radius: 5px;
    font-size: 15px;
}
</style>
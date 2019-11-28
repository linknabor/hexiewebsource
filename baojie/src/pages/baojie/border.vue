<template>
 <div :class="{addborder:bills.length == 0}">   
   <div class="orders">
        <div class="avatar-wrap rel ov" v-show="bills.length == 0">
        	<div class="filter-img avatar-wrap center-bg">
                <!-- <img src="../../assets/img/bg_orders.jpg" alt=""> -->
                <img :src="bgImage" alt="">
            </div>
    	</div>

        <!-- v-for="(bill,index) in bills" :key="bill.id" -->
        <div  v-for="(bill,index) in bills" :key="bill.id"  @click.stop="gotoDetail(index)">
            <div class="background_picture"></div>
            <div class="order_num">
                <span class="span1">订单编号：{{bill.orderNo}}</span>
                <span class="span2">{{bill.statusStr}}</span>
            </div>
             <div class="product">
                <img :src="bill.billLogo" class="icon1"/>
                <p class="item">项目：{{bill.typeName}}</p>
                <p class="time_long">时长：{{bill.itemCount}}小时</p>
                <p class="time">预约时间：{{bill.requireDateStr}}</p>
            </div>
             <div class="order_time">
                <span class="span3">下单时间：{{bill.createDateStr}}</span>
                <span class="span4 yellow_btn" v-show="bill.status==1" @click.stop="gotoPay(index)">支付</span>
                <span class="span4 mr10" v-show="bill.status==1" @click.stop="cancels(index)">取消</span>
                <a  href="tel:021-50876295">
                    <span class="span4" v-show="bill.status==2" @click.stop="contact()">联系客服</span>
                </a>
			</div>
        </div>
   </div>
</div>   
</template>

<script>
let vm;
import wx from 'weixin-js-sdk';
export default {
   data () {
       return {
            bills:[
                //     {
                //     billLogo:"http://img.e-shequ.com/FndH5ftmymD3IxRRnF5OXml__lwg",
                //     createDateStr:"2018-11-08 11:26",
                //     id:18,
                //     itemCount:"2.0",
                //     orderNo:"201811081126O73027",
                //     projectName:"日常保洁",
                //     requireDateStr:"2018-11-08 13:00",
                //     status:1 ,
                //     statusStr:"待支付",
                //     typeName:"日常保洁"
                // },
            ],
            page:0,
            bgImage:this.common.GetImages('1'),//背景图

       };
   },
   created() {
       vm=this;
   },
   mounted() {
      
        // let url1 = '/initSession4Test/105';
        // vm.receiveData.getData(vm,url1,'data1',function(){
            
        // })
        vm.query();
   },

   components: {},

   methods: {
       query() {
           let url="/baojie/query/"+vm.page;
            vm.receiveData.getData(vm,url,'res',function(){
                if(vm.res.result) {
                     vm.bills=vm.res.result;
                     vm.page++;
                }
               
            })
       },
       gotoDetail(index) {
          var bill=vm.bills[index];
          vm.$router.push({path:'/borderdetail',query:{'billId':bill.id}});
        //    event.stopPropagation()
       },
       //支付
       gotoPay(index){
           vm.requestPay(index);
            // event.stopPropagation()
       },
       requestPay(index) {
            let url="/baojie/pay/"+vm.bills[index].id
            // vm.receiveData.postData( vm, url,{},'res', function(){
                //     if(vm.res.success) {
                //          wx.config({
                //             appId: vm.res.result.appId, // 必填，公众号的唯一标识
                //             timestamp: vm.res.result.timestamp , // 必填，生成签名的时间戳
                //             nonceStr: vm.res.result.nonceStr, // 必填，生成签名的随机串
                //             signature: vm.res.result.signature,// 必填，签名，见附录1
                //             jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                //         });
                //          wx.chooseWXPay({
                //             "timestamp":vm.res.result.timestamp,
                //             "nonceStr":vm.res.result.nonceStr,
                //             "package":vm.res.result.pkgStr,
                //             "signType":vm.res.result.signType,
                //             "paySign":vm.res.result.signature,
                //             success: function (res) {
                //                 vm.notifyPayed(index)
                //                 // common.invokeApi("GET", "baojie/notifyPayed/"+o.bills[idx].id);
                //                 alert("支付成功！");
                //                 vm.bills[index].statusStr="已支付";
                //                 vm.bills[index].status=2;
                //             },
                //             fail:function(res) {
                //                 alert(JSON.stringify(res));
                            
                //             },
                //             cancel:function(res){
                //                 console.log(JSON.stringify(n));
                            
                //             }
                //      });
                //     }else{
                //         alert(vm.res.message==null?"支付请求失败，请稍后重试！":vm.res.message);
                //     }     
            // })
         this.axios.post(
					url,
					{},
				).then(
                    function(res){
                            let wd = JSON.parse(res.data);
                            // console.log(wd)
                        if(wd.success == false){
                                alert(wd.message);
                                return;
                        }  
                         wx.config({
                            debug: false, 
                            appId: wd.result.appId, // 必填，公众号的唯一标识
                            timestamp: wd.result.timestamp , // 必填，生成签名的时间戳
                            nonceStr: wd.result.nonceStr, // 必填，生成签名的随机串
                            signature: wd.result.signature,// 必填，签名，见附录1
                            jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                        }); 
                        wx.chooseWXPay({
                            "timestamp":wd.result.timestamp,
                            "nonceStr":wd.result.nonceStr,
                            "package":wd.result.pkgStr,
                            "signType":wd.result.signType,
                            "paySign":wd.result.signature,
                        success: function (res) {
                                vm.notifyPayed(index)
                                vm.bills[index].statusStr="已支付";
                                vm.bills[index].status=2;
                        },
                        fail:function(res) {
                                alert(JSON.stringify(res));
                                
                            },
                        cancel:function(res){
                                alert('支付取消');
                            } 
                         }) 
                    }   
                ).catch(
					function(err){
                        console.log(err);
                    }
				)    
       },
       notifyPayed(index) {
         let url="baojie/notifyPayed/"+vm.bills[index].id;
          vm.receiveData.postData( vm, url,{},'res', function(){
           
         })
       },
       //取消
       cancels(index) {
           let url="/baojie/cancel/"+vm.bills[index].id
            vm.receiveData.postData( vm, url,{},'res', function(){
              if(vm.res.success) {
                vm.bills[index].statusStr="已取消";
                vm.bills[index].status=8;
              }else
                {
                    alert(vm.res.message==null?"订单取消失败，请稍后重试！":vm.res.message);
                }
            })
            // event.stopPropagation();

       },       //联系客服
        contact(){
            localtion.href="tel:021-50876295";
            // event.stopPropagation();
        }   
        },

   computed: {},
}
</script>

<style  scoped>
.addborder {
    height: 100%;
    background-color: #fff;
}
.orders {
    margin: 0;
    background-color: #f4f5f6;
}

.rel {
    position: relative;
}
.ov {
    overflow: hidden;
    padding: 1px;
}
.avatar-wrap {
    /* height: 37rem; */
    text-align: center;
    background-color: #fff;
}
img {
    width:100%;
    height: auto;
}
.background_picture{
    background:url('../../assets/img/icon_line_06.png') repeat-x;
    height:2px;
    background-size: 100%;
}
.order_num{
    padding: 14px 15px 15px 15px;
    background-color: #FFFFFF;
    border-bottom: 1px solid #f3f5f7;
}
.span1{
    font-family: "微软雅黑";
    font-size: 15px;
    color: #AAAAAA;
}
.span2{
    float: right;
    font-family: "微软雅黑";
    font-size: 15px;
    color: #FF8A00;
}
.product{
    padding: 14px;
    background-color: #FFFFFF;
    border-bottom: 1px solid #f3f5f7;
}
.icon1{
    float: left;
    width: 86px;
    height: 86px;
    margin-right: 14px;
}
.item,.time_long{
    font-family: "微软雅黑";
    font-size: 14px;
    color: #000000;
    margin-top:0 ;
    margin-bottom: 14px;
}
.time{
    font-family: "微软雅黑";
    font-size: 14px;
    color: #000000;
    margin-bottom: 0;
    margin-top: 0;
}
.order_time{
    padding: 14px;
    background-color: #FFFFFF;
    margin-bottom: 10px;
}
.span3{
    font-family: "微软雅黑";
    font-size: 15px;
    color: #AAAAAA;
}
.span4{
    border: 1px solid #AAAAAA;
    border-radius: 3px;
    display: inline-block;
    font-family: "微软雅黑";
    font-size: 13px;
    color: #AAAAAA;
    height: 15px;
    line-height: 15px;
    text-align: center;
    float: right;
    margin-top: -2px;
    padding: 4px 15px;
}
.yellow_btn{
    background: #ff8a00;
    color:white;
    border:none;
}
.mr10{
    margin-right:10px
}
</style>
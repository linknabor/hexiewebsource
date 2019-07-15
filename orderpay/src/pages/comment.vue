
<template>
   <div>
            <div class="order-number fs13 plr15">订单编号&nbsp;{{order.orderNo}}</div>
            <div class="p15">
                    <img class="fl order-picture" :src="order.productThumbPic"/>
                    <div class="ov pb15 fs14">{{order.productName}}</div>
                    <div class="ov pb15" style="color:#3b3937">
                        <span class="fl fs15">
                            总计&nbsp;¥{{order.price}}
                        </span>
                        <span class="fr fs15 highlight">共{{order.count}}个商品</span>
                    </div>
       
            </div>
            <div class="title fs18">评论内容</div>
            <div style="line-height: 35px;">
                    <span class="grade fs15">服务评价：</span>
                    <ul style="float: right; margin-right: 15px; ">
                    <li v-for="(itemClass,index) in itemClasses" :class="itemClass" @click="serverClick(index)" class="fwpin  fl" style="margin-left: 10px;"></li>
                    </ul>
            </div>
             <div style="line-height: 35px;">
                    <span class="grade fs15">商品评价：</span>
                    <ul style="float: right; margin-right: 15px; ">
                    <li v-for="(itemClass,index) in itemClasses1" :class="itemClass" @click="serverClick1(index)" class="fwpin  fl" style="margin-left: 10px;"></li>
                    </ul>
            </div>
             <div style="line-height: 35px;">
                    <span class="grade fs15">物流评价：</span>
                    <ul style="float: right; margin-right: 15px; ">
                    <li v-for="(itemClass,index) in itemClasses2" :class="itemClass" @click="serverClick2(index)" class="fwpin  fl" style="margin-left: 10px;"></li>
                    </ul>
            </div>
            <!-- <div class="content p15 fs15">
              <textarea  class="text" placeholder="亲，您的评价对其他朋友有很大的帮助哦 ~" v-model="comments"></textarea>
            </div> -->
               <div contenteditable class="content p15 fs15" style="line-height: 20px;" :class="{hasvalue:comments}" @click="focus" @blur="storeComment"></div>

            <div class="fr pr15 fs15" style="margin-top:15px" @click="toggleCheckbox">
                <i class="checkbox" :class="{checked:anonymous}" style="margin-right:5px"></i>
                我要匿名评论
            </div>
            <div class="btn" style="margin-top:190px" @click="submit">发表评论</div>
   </div>
</template>

<script>
let vm;
export default {
   data () {
       return {
           order:{},
           score: 5,
           score1: 5,
           score2: 5,
           comments: '',
           anonymous:false,
       };
   },
   created() {
       vm=this;
   },
   mounted() {
       vm.comment();
   },
   computed: {
       itemClasses() {
             let result = []; // 返回的是一个数组,用来遍历输出星星
            let score = Math.floor(this.score * 2 ) / 2; // 计算所有星星的数量
            let integer = Math.floor(score); // 整数星星判断
            for(let i=0;i<integer;i++){ // 整数星星使用on
                result.push("on"); // 一个整数星星就push一个CLS_ON到数组
            }
            while(result.length < 5){// 余下的用无星星补全,使用off
            result.push("off");
            }
            return result;
            },
            itemClasses1() {
                let result = []; // 返回的是一个数组,用来遍历输出星星
                    let score = Math.floor(this.score1 * 2 ) / 2; // 计算所有星星的数量
                    let integer = Math.floor(score); // 整数星星判断
                    for(let i=0;i<integer;i++){ // 整数星星使用on
                        result.push("on"); // 一个整数星星就push一个CLS_ON到数组
                    }
                    while(result.length < 5){// 余下的用无星星补全,使用off
                    result.push("off");
                    }
                    return result;
               },
                itemClasses2() {
                        let result = []; // 返回的是一个数组,用来遍历输出星星
                            let score = Math.floor(this.score2 * 2 ) / 2; // 计算所有星星的数量
                            let integer = Math.floor(score); // 整数星星判断
                            for(let i=0;i<integer;i++){ // 整数星星使用on
                                result.push("on"); // 一个整数星星就push一个CLS_ON到数组
                            }
                            while(result.length < 5){// 余下的用无星星补全,使用off
                            result.push("off");
                            }
                            return result;
                    },

        },
   methods: {
       comment() {
            vm.receiveData.getData(vm,'/getOrder/'+vm.$route.query.orderId,'n',function() {
                if(vm.n.success) {
                     vm.order=vm.n.result;
                }else {
                    alert("获取订单信息失败！");
                }
             })
       },
       focus() {
        
       },
       storeComment(e) {
           vm.comments=e.srcElement.innerText
        },
       serverClick(index) {
           vm.score=index+1;
       },
       serverClick1(index) {
           vm.score1=index+1;
       },
       serverClick2(index) {
           vm.score2=index+1;
       },
 
         toggleCheckbox() {
             vm.anonymous=!vm.anonymous;
         },
         submit () {
             if(vm.comments=="" || vm.comments.length<5) {
                     alert("评论字数不能小于5个！");
                     return;
             }
             if(vm.comments.length>400) {
                 alert('评论字数不能大于400！')
                 return
                 }
                 vm.sendComment();
           
         },
         sendComment() {
             var add= {
                orderId:vm.order.id,
        		productId:vm.order.productId,
        		productName:vm.order.productName,
        		anonymous:vm.anonymous,
        		serviceNo:vm.score,
        		productNo:vm.score1,
        		logisticNo:vm.score2,
        		comments:vm.comments 
             }
             vm.receiveData.postData(vm,'/comment',add,'res',function() {
                 if(vm.res.success) {
                      alert("评价成功！");
                    vm.$router.push({path:'/orders'})
                 }else {
                     alert("评价失败，请稍后重试！");
                 }
             })
         }


   },
}
</script>

<style  scoped>
.fs13 {
    font-size: 13px;
}
.plr15 {
    padding: 0 15px;
}
.order-number {
    display: inline-block;
    margin-top: 15px;
    height: 24px;
    line-height: 24px;
    border: 1px solid #d4cfc8;
    color: #a6937c;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
}
/* 商品 */
.p15 {
    padding: 15px;
}
.order-picture {
    width: 75px;
    height: 75px;
    margin-right: 15px;
    border: 1px solid #d4cfc8;
}
.fs14 {
    font-size: 14px;
}
.ov {
    overflow: hidden;
    padding: 1px;
}
.pb15 {
    padding-bottom: 15px;
}
.fs15 {
    font-size: 15px;
}
.highlight {
    color: #ff8a00;
}
/* 评论 */
.title {
    padding-left: 15px;
    padding-right: 15px;
}
.fs18 {
    font-size: 18px;
}
.title, .section-title {
    display: block;
    /* font-size: 13px; */
    color: #7e6b5a;
    padding-top: 15px;
    padding-bottom: 7px;
}
/* 评价 */
.grade {
    padding-left: 15px;
    padding-right: 15px;
}

.fwpin {
    height: 30px;
    width: 30px;
    background-repeat: no-repeat;
    background-size: 100%;
}
.fwpin.on {
     background-image: url(../assets/images/icon_star_red.png);
}
.fwpin.off {
     background-image: url(../assets/images/icon_star.png);
}

/*  */
.fs15 {
    font-size: 15px;
}
.p15 {
    padding: 15px;
}
.content {
    position: relative;
    height: 100px;
    margin: 0 15px;
    background-color: #fffff8;
    border: 1px solid #d4cfc8;
     outline: none;
}
.content:before {
    content: "亲，您的评价对其他朋友有很大的帮助哦 ~";
    position: absolute;
    top: 50%;
    margin-top: -10px;
    left: 50%;
    margin-left: -120px;
}
.content:before {
    font-size: 13px;
    color: #bfbfbf;
}
.content:focus:before, 
.content.hasvalue:before {
	display: none;
}

.text {
    width:100%;
    height:100%;
    outline: none;
    border: none;
}
/* 匿名 */
.pr15 {
    padding-right: 15px;
}
.checkbox.checked {
    background-image: url(../assets/images/icon_selected.png);
}

.checkbox {
    display: inline-block;
    width: 16px;
    height: 16px;
    background: url(../assets/images/icon_unselect.png) no-repeat;
    background-size: 16px;
    vertical-align: sub;
}

.btn {
    display: block;
    margin: 15px;
    height: 44px;
    line-height: 44px;
    color: #fff!important;
    font-size: 15px;
    text-align: center;
    background-color: #ff8a00;
    border-radius: 3px;
    outline: none;
    border: none;
    text-decoration: none;
}
</style>
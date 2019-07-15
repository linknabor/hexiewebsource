<template>
   <div class="sgrooup">
        <div class="divider"></div>
        <div id="container">
                <div id="titleDiv">团购规则说明</div>
                <div id="selectImage1" class="subtitleImageClass">
                    <img src="../assets/images/img_rule1 (1).png" />
                </div>
                <div id="selectTitleDiv" class="subTitleClass">选择商品</div>
                <div id="clear"></div>
                <div id="selectImage2" class="bodyImageClass">
                    <img src="../assets/images/img_rule22.png" />
                </div>
                <div id="selectBodyDiv" class="bodyClass">选择心仪的团购商品下单</div>
                <div id="clear"></div>
                <!-- 2 -->
                <div id="payImage1" class="subtitleImageClass">
                    <img src="../assets/images/img_rule1 (1).png" />
                </div>
                <div id="payTitleDiv" class="subTitleClass">支付参团</div>
                <div id="clear"></div>
                <div id="payImage2" class="bodyImageClass">
                    <img src="../assets/images/img_rule22.png" />
                </div>
                <div id="payBodyDiv" class="bodyClass">完成支付后，参团成功</div>
                <div id="clear"></div>
                <!-- 3 -->
                <div id="inviteImage1" class="subtitleImageClass"><img src="../assets/images/img_rule1 (1).png" /></div>
                <div id="inviteTitleDiv" class="subTitleClass">邀请好友参团</div>
                <div id="clear"></div>
                <div id="inviteImage2" class="bodyImageClass"><img src="../assets/images/img_rule22.png" /></div>
                <div id="inviteBodyDiv" class="bodyClass">邀请更多小伙伴来参加团购</div>
                <div id="clear"></div>
                <!-- 4 -->
                <div id="successImage1" class="subtitleImageClass"><img src="../assets/images/img_rule1 (1).png" /></div>
                <div id="successTitleDiv" class="subTitleClass">达到人数参团成功</div>

                <div id="clear"></div>
                <div id="successImage3"><img src="../assets/images/img_rule33.png" /></div>
            <!-- 5 -->
            <div id="successBodyDiv">
                <div>
                    <p>
                    团购成功：
                    <br />
                    在团购活动结束时，达到或超过目标参团人数，即团购成功。团购成功后统一发货。
                    <br />
                    <br />
                    团购失败：
                    <br />
                    在团购活动结束时未达到目标参团人数，则团购失败。

                    </p>
                    </div>
            </div>
            <div id="clear"></div>
            <div id="bottomDiv" class="bottomClass">
                <br />
                参加团购：活动期间，无论是否达到参团目标人数，小伙伴都可以加入到团购中。
                <br />
                <br />
                退款说明：团购失败后,系统自动提交微信退款处理，微信审核后在2-5个工作日自动原路退款至您的支付账号。

            </div>
        </div>    
   </div>
</template>

<script>
export default {
   data () {
       return {
       };
   },
   mounted() {
        this.common.checkRegisterStatus()
   },

   components: {},

   methods: {},

   computed: {},
}
</script>

<style  scoped>
.sgrooup {
    margin:0px;
    padding:0px;
    font-size:18px;
    background-color:#FFFFFF;
    text-align:left
}
.divider {
    /* border-bottom: 10px solid #f7f7f2; */
    height: 10px;
    background-color:#FFFFFF;
}
#container {
    /* width: 980px; */
    padding-left: 15px;
    padding-right: 15px;
}
#titleDiv {
    text-align: center;
    font-size: 24px;
}
.subtitleImageClass {
    float: left;
    height: 25px;
    line-height: 25px;
    /* font-size: 38px; */

}
.subTitleClass {
    float: left;
    height: 25px;
    line-height: 25px;
    font-size: 18px;
    color: #FFBA0F;
}
.bodyImageClass, .bodyClass {
    float: left;
    height: 90px;
    line-height: 90px;
}
#clear {
    clear: both;
}


/* 文字 */
#successBodyDiv {
    position: static;
    display: table;
    /* height: 330px; */
    float:left;
    margin:15px 0;
}
#successBodyDiv>div {
    display: table-cell;
    vertical-align: middle;
    position: static;
}
#successBodyDiv div {
    /* position: absolute; */
    top: 50%;
    left: 0;
}
#successBodyDiv p {
    position: relative;
    top: -50%;
}
#bottomDiv {
    margin-left: 15px;
}
#successImage3 {
    float:left;
}
</style>
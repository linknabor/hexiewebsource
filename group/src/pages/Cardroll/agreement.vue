<template>
   <div class="sgrooup">
        <div id="container">
            <div id="titleDiv">团购规则说明</div>
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
            <div class="fonter">
                <div class="fl">不同意</div>
                <div class="fr color">同意</div>
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
        // vm.common.checkRegisterStatus()
   },

   components: {},

   methods: {},

   computed: {},
}
</script>

<style  scoped>
.sgrooup {
    position: fixed;
    left:0;
    right:0;
    top:0;
    bottom: 0;
    background-color:rgba(0,0,0,0.3);
    z-index: 9999999;
}
#container {
    font-size: 14px;
    background-color: #FFFFFF;
    text-align: left;
    margin: 2rem 0.4rem 0 0.4rem;
    padding: 0.3rem;
    border-radius: 0.4rem;
}
#titleDiv {
    text-align: center;
    font-size: 24px;
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
.fonter {
    overflow: hidden;
    width:100%

}
.fonter div {
    margin-top: 0.5rem;
    width: 45%;
    height: 0.8rem;
    line-height: 0.8rem;
    text-align: center;
    border:1px solid #ccc;
    border-radius: 0.1rem;
}
.color {
    background-color:#F08500 ;
}
</style>
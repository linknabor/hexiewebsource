<template>
    <div>
        <div class="sales">
            <div class="header">
                <div class="title">
                    <span>欢迎加入“合协社区”</span>
                </div>
                <div class="next">
                    <span>请注意查收账号短信通知。务必扫描下方二维码<br>
                        关注“合协课堂”公众号获取教程及最新资讯。</span>
                </div>
            </div>
            <div class="content">
                <img src="../../assets/images/saless.png" alt="">
            </div>
        </div>
    </div>
</template>

<script>
var vm;
export default {
    data() {
        return {
            
        };
    },
    created() {
        vm  = this;
    },
    components: {

    },
    computed: {

    },
    mounted() {
        
    },
    methods: {
  
    }
};
</script>

<style scoped>
.sales {
    position: absolute;
    top:0;
    left:0;
    right:0;
    bottom:0;
    background-color: #fff;
    padding-top:15%;
}
.header {
    /* margin-left:1rem; */
    text-align: center;
}
.title {
    font-size: 0.4rem;
    margin-bottom: 0.7rem;
    color:#F08500;
    font-weight: 600;
}
.next {
    margin: 0 6%;
    margin-bottom: 0.7rem;
    line-height:0.45rem;
}
.next span{
    font-size: 0.3rem;
    display: inline-block;
}
.content {
    padding: 5px 15%;
    margin: 0 7%;
    box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.4);
}
</style>

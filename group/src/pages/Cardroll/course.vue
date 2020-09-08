<template>
    <div class="manual">
        <div class="content">
            <div class="hander"> 
                教程
            </div>
            <ul>
                <li class="title">一、物业SAAS</li>
                <li class="first">物业saas项目介绍</li>
                <li><a href="https://www.e-shequ.cn/servplat/course/物业saas软件产品介绍-收银产品.pdf">物业saas软件产品介绍-收银产品</a></li>
                <li><a href="https://www.e-shequ.cn/servplat/course/物业saas软件产品介绍-互动产品.pdf">物业saas软件产品介绍-互动产品</a></li>

                <li class="first">物业saas销售</li>
                <li><a href="https://www.e-shequ.cn/servplat/course/现场销售基本过程.pdf">现场销售基本过程</a></li>
                <li><a href="https://www.e-shequ.cn/servplat/course/现场销售注意事项.pdf">现场销售注意事项</a></li>
                <li><a href="https://www.e-shequ.cn/servplat/course/不同客户类型及产品应对策略.pdf">不同客户类型及产品应对策略</a></li>
                <li><a href="https://www.e-shequ.cn/servplat/course/产品报价说明及策略.pdf">产品报价说明及策略</a></li>
                <li><a href="https://www.e-shequ.cn/servplat/course/现场销售常见问题解答.pdf">现场销售常见问题解答</a></li>
                <li><a href="https://www.e-shequ.cn/servplat/course/合协社区产品特色.pdf">合协社区产品特色</a></li>

                <li class="first">售后维护</li>
                <li><a href="https://www.e-shequ.cn/servplat/course/产品使用常见问题FAQ.pdf">产品使用常见问题FAQ</a></li>
            </ul>

            <ul>
                <li class="title">二、社区服务</li>
                <li class="first">社区合伙人落地运营</li>
                <li class="first">商户（供应商）</li>
                <li ><a href="https://www.e-shequ.cn/servplat/course/如何获客.pdf">如何获客</a></li>
                <li ><a href="https://www.e-shequ.cn/servplat/course/如何谈判.pdf">如何谈判</a></li>
                <li >如何上架</li>
                <li class="first">用户</li>
                <li ><a href="https://www.e-shequ.cn/servplat/course/如何拉新.pdf">如何拉新</a></li>
                <li ><a href="https://www.e-shequ.cn/servplat/course/如何运营.pdf">如何运营</a></li>
                <li >售后服务</li>
            </ul>

            <ul>
                <li class="title">三、操作指南</li>
                <li class="first"><a href="https://www.e-shequ.cn/servplat/course/周边优惠操作手册.pdf">周边优惠操作手册</a></li>
                <li class="first"><a href="https://www.e-shequ.cn/servplat/course/周边服务操作手册.pdf">周边服务操作手册</a></li>
        
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {

        };
    },
    created() {

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
.manual {
    position:absolute;
    width:100%;
    height:100%;
    background-color:#fff;
}
.title {
    font-size: 0.5rem;
    padding-left: 0;
    font-weight: 600;
}
a {
    /* color:#000; */
}
a:link  {
    color:blue;
}
ul .first{
    font-size: 0.34rem;
    padding-left: 0;
    font-weight: 600;
}
.content {
    padding-top:0.3rem;
    padding-left:0.5rem;
}
ul {
    font-size: 0.35rem;
    line-height: 0.7rem;
}

ul li {
    padding-left:0.3rem;
}
.hander {
    text-align: center;
    font-size: 0.5rem;
    font-weight: 600;
    padding:0.3rem 0;
}
</style>

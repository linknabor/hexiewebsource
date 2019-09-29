<style scoped>
	.title_area{
    	padding: 45px 0;
        background:#f7f7f1;
    }
    .brand-tip-1 {
        text-align: center;
        font-size: 30px;
        background: url("../../assets/images/common/icon_successful.png") no-repeat #f7f7f1;
        background-position: 25% center;
        background-size: 28px;
        color: #FF8A00;
    }
    .brand-tip-2 {
        text-align: center;
        background:#f7f7f1;
        margin-top:25px;
        font-size: 20px;
        color: #FF8A00;
    }
    .top-info {
        margin: 15px;
    }
    .item {
        overflow: hidden;
        margin-bottom: 15px;
        font-size: 14px;
        color: #666;
    }
    label {
        display: inline-block;
        width: 70px;
    }
    label:after {
        content: " :";
    }
    .value {
        float: right;
        display: block;
        margin-left: 15px;
        color: #a6937c;
        width:70%;
    }
	.wbord {
		word-break: break-all;
		word-wrap: break-word;
	}
    .btn {
        display: block;
        margin: 10px;
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
    .main_btn{
        width: 80%;
        height: 60px;
        margin: 30px auto;
    }
    .bottom-line{
    	border-bottom: 1px solid #d4cfc8;
    }

</style>
<template>
	<div>
		<div class="title_area">
		    <div class="brand-tip-1">报修成功</div>
		    <div class="brand-tip-2" v-if="!order.publicProject">我们将尽快安排师傅上门维修</div>
		    <div class="brand-tip-2" v-if="order.publicProject">
		    该维修项目或维修设施属于公共部位<br/>
		    我们将通知物业管理处进行处理<br/>
		    感谢你的反馈
		    </div>
		</div>
	    <div class="top-info bottom-line">
	        <!-- <div class="item">
	            <label>维修类型</label><span class="value">{{typeName}}</span>
	        </div> -->
	        <div class="item">
	            <label>维修内容</label><span class="value wbord">{{order.memo}}</span>
	        </div>
	    </div>

	    <div class="top-info" style="margin-top:15px">
	        <div class="item">
	            <label>联系地址</label><span class="value">{{order.address}}</span>
	        </div>
	        <!-- <div class="item">
	            <label>预约时间</label><span class="value">{{order.requireDateStr}}</span>
	        </div> -->
	        <div class="item">
	            <label>联系人</label><span class="value">{{order.receiverName}}</span>
	        </div>
	        <div class="item">
	            <label>手机号</label><span class="value">{{order.tel}}</span>
	        </div>
	    </div>

	    <div class="main_btn">
	        <div class="btn" @click="goback">返回</div>
	    </div>

	</div>
</template>
<script>
	let vm;
	export default {
		data(){
			return {
				typeConfig:{
			    	// 1:["浴室维修",require('../../assets/images/icon_btn_yushiweixiu_03.png')],
			    	// 2:["厨房维修",require('../../assets/images/icon_btn_chufangweixiu_03.png')],
			    	// 3:["客厅卧室维修",require('../../assets/images/icon_btn_ketingweixiu_03.png')],
			    	// 4:["强弱电维修",require('../../assets/images/icon_btn_qiangruodianweixiu_03.png')],
			    	// 5:["门窗维修",require('../../assets/images/icon_btn_menchuanweixiu_03.png')],
			        // 6:["其它维修",require('../../assets/images/icon_btn_qitaweixiu_03.png')],
			        // 7:["家电",require('../../assets/images/icon_btn_jiadianweixiu_03.png')]
			    },
			    
			    order:{},
			    // typeName:''
			}
		},
		beforeCreate(){//刷新页面
			
		},
		created(){
			vm = this;
		},
		watch:{
			
		},
		mounted(){
	  		vm.init();
		},
		methods:{
			init(){
				vm.axios({
					url:'repair/query/'+vm.$route.query.oId,
					methods:'get'
				}).then(res=>{
					console.log(res);
					let data = JSON.parse(res.data);
					vm.order = data.result;
					
					// vm.typeName = vm.typeConfig[vm.order.repairType][0];
				})
			},
			goback(){
				vm.$router.push({path:'/'})
				// window.location.href = this.basePageUrl+'wuye/index.html?v=20162299'
			}
		}
	}
</script>
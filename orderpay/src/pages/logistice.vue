<template>
   <div class="log">
       <!-- load -->
		<div class="load6" v-show="shows" id="LoadingBar">
			<div class="bounce1"></div>
			<div class="bounce2"></div>
			<div class="bounce3"></div>
		</div>

		<div id="fade" class="black_overlay" v-show="shows">
		</div>

		<div id="phoneErro"></div>

		<!-- <div id="phoneAjax" class="hidden">
			<img src="http://7xlem4.com2.z0.glb.qiniucdn.com/backed/images/load2.gif" style="width:40px;height40px;vertical-align: middle;">
		</div> -->
	<!-- load -->

        <div class="order-item p15 divider fs14" v-show="logisticsinfo.hasInfo==0">订单正在处理中，暂时没有物流信息!</div>
            <div v-show="logisticsinfo.hasInfo==1" v-for="data in logisticsinfo">
		<div class="order-item p15 divider">
			<div class="ov pb10 fs14">物流公司：{{data.logisticsname}}</div>
			<div class="ov pb10 fs14">快递单号：{{data.logisticsno}}</div>
			<div class="ov pb10 fs14"  v-show="data.signstatus ==0">物流状态：在途</div>
			<div class="ov pb10 fs14"  v-show="data.signstatus ==1">物流状态：揽件</div>
			<div class="ov pb10 fs14"  v-show="data.signstatus ==2">物流状态：疑难</div>
			<div class="ov pb10 fs14"  v-show="data.signstatus ==3">物流状态：签收</div>
			<div class="ov pb10 fs14"  v-show="data.signstatus ==4">物流状态：退签</div>
			<div class="ov pb10 fs14"  v-show="data.signstatus ==5">物流状态：派件</div>
			<div class="ov pb10 fs14"  v-show="data.signstatus ==6">物流状态：退回</div>
			<div class="ov pb10 fs14"  v-show="data.signstatus ==7">物流信息尚未同步到合协社区，请稍后再试试!</div>
			<div class="ov pb10 fs14"  v-show="data.signstatus ==8"></div>
		</div>
		<div class="desc-wrap fs13  divider" >
			<div class="fs15" v-show="data.signstatus<7">物流信息</div>
			    <ul class="desc-items" v-for="note in data.description_array">
			        <li>{{note.time}}</li>
					<li>{{note.context}}</li>
				</ul>
		</div>
			
	</div>
   </div>
</template>

<script>
var vm;

export default {
   data () {
       return {
            shows:true,
            com:'',
            nu:'',
        	logisticsinfo:{}
       };
   },
   created() {
       vm=this;
   },
   mounted() {
       vm.getLogisticsParams();
   },

   methods: {
        getUrlParam(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
            var r = window.location.search.substr(1).match(reg);  //匹配目标参数
            if (r != null) return unescape(r[2]); return ''; //返回参数值
        },
        getLogisticsParams() {
            // vm.com=vm.getUrlParam("com");
            vm.com=this.$route.query.com;
	     	vm.com = unescape(vm.com);
            // vm.nu=vm.getUrlParam("nu");
             vm.nu=this.$route.query.nu;
            if(''!=vm.nu){
                vm.queryLogisticsInfo();
            }else{
                vm.logisticsinfo.hasInfo="0";
                vm.shows=false;
            }
        },
        queryLogisticsInfo() {
                 vm.receiveData.getData(vm,"logistics/"+vm.nu +"/"+vm.com,'res',function(){
                        if(vm.res.success) {
                             vm.logisticsinfo =vm.res.result;
                             vm.logisticsinfo.hasInfo="1";
                             vm.shows=false;
                        }else {
                            vm.shows=false;
                            if(vm.res.result==null||vm.res.message==null){
                                    alert("查询快递异常，请稍后再试！");
                            }else{
                                alert(vm.res.message);
                            }
                        }
                           
                });
        }
   },

   computed: {},
}
</script>

<style  scoped>
.log {
    margin: 0;
    /* height: 100%; */
    background-color: #fffff8;
}
.load6 {
    margin: 100px auto 0;
    width: 150px;
    top: 25%;
    left: 25%;
    width: 50%;
    text-align: center;
    position: fixed;
    z-index: 1002;
    overflow: auto;
}

.load6>div {
    width: 30px;
    height: 30px;
    background-color: #FF8A00;
    border-radius: 100%;
    display: inline-block;
    -webkit-animation: bouncedelay 1.4s infinite ease-in-out;
    animation: bouncedelay 1.4s infinite ease-in-out;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
}
.load6 .bounce1 {
    -webkit-animation-delay: -0.32s;
    animation-delay: -0.32s;
}
.load6 .bounce2 {
    -webkit-animation-delay: -0.16s;
    animation-delay: -0.16s;
}
@-webkit-keyframes bouncedelay{
    0%,80%,100%{-webkit-transform:scale(0.0)}
    40%{-webkit-transform:scale(1.0)}}
@keyframes bouncedelay{
    0%,80%,100%{transform:scale(0.0);-webkit-transform:scale(0.0)}
    40%{transform:scale(1.0);-webkit-transform:scale(1.0)}}

.black_overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #f5f5f5;
    z-index: 1001;
    -moz-opacity: .8;
    opacity: .80;
    filter: alpha(opacity=80);
}
#phoneErro {
    margin: 100px auto 0;
    top: 25%;
    left: 25%;
    width: 50%;
    text-align: center;
    height: 60px;
    line-height: 60px;
    background-color: black;
    -moz-opacity: .8;
    opacity: .80;
    filter: alpha(opacity=80);
    position: fixed;
    z-index: 1999;
    overflow: auto;
    color: white;
    -moz-border-radius: 15px;
    -webkit-border-radius: 15px;
    font-size: 14px;
    display: none;
}
#phoneAjax {
    position: fixed;
    top: 20%;
    left: 50%;
    width: 60px;
    height: 60px;
    line-height: 60px;
    margin-left: -30px;
    text-align: center;
    background-color: black;
    -moz-opacity: .8;
    opacity: .80;
    filter: alpha(opacity=80);
    z-index: 1998;
    overflow: auto;
    -moz-border-radius: 15px;
    -webkit-border-radius: 15px;
}

.p15 {
    padding: 15px;
}
.fs14 {
    font-size: 14px;
}
.fs15 {
    font-size: 15px;
}
.divider {
    border-bottom: 5px solid #f9f9e9;
}

/* 包裹 */
.ov {
    overflow: hidden;
    padding: 1px;
}
.pb10 {
    padding-bottom: 10px;
}
.desc-wrap {
	border: 1px solid #d4cfc8;
	color: #3b3937;
	padding: 15px;
}
.desc-items {
	margin-top: 12px;
	margin-bottom: 0;
	padding-left: 15px; 
}
.desc-items li {
	padding-bottom: 6px;
}
</style>
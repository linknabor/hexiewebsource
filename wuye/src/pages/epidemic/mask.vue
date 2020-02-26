<template>
   <div class="mask">
       <div>
        <div class="main">
            <div class="mint-tab-container-item">
                <div class="query-data">
                   	<div class="input-row">
			  		小区：
					  <input type="text" id="btnd" class="virtual-input classinput" value=""  placeholder="请输入小区" v-on:input="sousuo(query.sect)" v-model="query.sect">
					  	<i class="iconfont icon-chacha  classc" @click="clicki" v-show="showi"></i>
					<ul class="input-uis test" v-show="shows" >
						<li :data-idd="item.id" v-for="item in sectList" :key="item.id"  v-tap="{fn:alertFN,name:item.name,id:item.id,params:item.params}">{{item.name}}</li>
					</ul>
			    	</div>
                    <div class="input-row">
                        楼宇：
                        <select class="virtual-input" v-model="query.build"  @change="getCouponSelected()">
                            <option v-for="item in buildList" :value="item.id" :key="item.id">{{item.name}}</option>
                        </select>
                    </div>
                    <div class="input-row">
                        门牌：
                        <select class="virtual-input" v-model="query.unit" @change="getCoupon()">
                            <option v-for="item in unitList" :value="item.id" :key="item.id">{{item.name}}</option>	
                        </select>
                    </div>
                    <div class="input-row">
                        室号：
                        <select class="virtual-input" v-model="query.house" @change="getCoupons()">
                            <option v-for="(item,index) in houseList" :value="item.id" :key="index">{{item.name}}</option>	
                        </select>
                    </div>
                </div>
            </div>
       </div>
       <div class="hand">
           <div class="handtest">
               <em>*</em>请填写预约人姓名:<br>
                <input type="text" class="topt" placeholder="请填写预约人的姓名" v-model="name">
           </div>
            <div class="handtest">
               <em>*</em>请选择预约人证件类型:<br>
               <div>
                <select class="handselect" v-model="select" @blur="fixScroll">
                    <option value="0">身份证</option>
                    <option value="1">港澳台身份证</option>
                    <option value="2">护照</option>
                </select>
                </div>
           </div>
            <div class="handtest" >
               <em>*</em>请填写预约人证件号:<br>
                <input style="margin-left:0.25rem;width:100%;" type="text" class="topt" placeholder="请输入预约人证件号:" v-model="hao" @blur="fixScroll">
           </div>
       </div>
        <div style="height:1rem;"></div>
        <div class="btn-fabu" v-show="isOriginHei" @click="ben()">
            提交
        </div> 
      </div>  
   </div>
</template>

<script>
let vm;
let timer;
import '../../tap.js';
export default {
   data () {
       return {
           name:'',
           select:'0',
           hao:'',
           isOriginHei: true,//底部按钮顶起问题
           screenHeight: document.documentElement.clientHeight,//当前屏幕高度      
           originHeight: document.documentElement.clientHeight,//当前屏幕高度 
           pageHeight:'',//页面高度
           sectList:[],//小区列表
           buildList:[],//楼宇列表
           unitList:[],//门牌列表
           houseList:[],//室号列表
           query:{//查询缴费数据
                sect:'',//小区
                sectID:'',//小区id
                buildname:'',
                build:'',//楼宇id
                unitname:'',
                unit:'',//门牌id
                housename:'',
                house:'',//室号id
           },
           shows:false,//查出的小区
           showi:false,//叉叉
           flay:true,
       };
   },
   created(){
       vm=this;
   },
   updated(){

   },
   mounted() {
        let self = this;
        window.onresize = function() {//底部按钮顶起问题
            return (function(){
                self.screenHeight = document.documentElement.clientHeight;
            })()
        }
   },
    watch:{
        screenHeight (val) {//底部按钮顶起问题
            if(this.originHeight > val + 100) {        //加100为了兼容华为的返回键
                this.isOriginHei = false;
            }else{
                this.isOriginHei = true;
            }

        }
    },
   components: {},

   methods: {
        //搜索小区
       sousuo(name){
            if (timer) {
                clearTimeout(timer);
            }
            timer = setTimeout(() => {
                if (name != "") {
                    this.getHousin(name); 
                }else {
                   vm.shows=false;
                }
            },500);
       },
        getHousin(name){
            let url = '/getVagueSectByName?sect_name='+name;
            vm.receiveData.getData(vm,url,'res',function(){
                    let data=vm.res.result;
                    if(data!=null){
                        vm.sectList=vm.res.result.sect_info;
                        if(vm.sectList.length>0){
                            vm.shows=true;
                        }
                        vm.showi=true;
                    }else{
                        vm.shows=false;
                        vm.showi=true;
                    }
            });
       },
       //点击叉叉
       clicki(){
           	if(vm.sectList.length<=0) {
				vm.query.sect='';
				vm.query.build='';
				vm.query.unit='';
				vm.query.house='';
				var add=document.getElementById('btnd')
				add.value=''
			}
			vm.query.sect='';
			vm.query.build='';
			vm.query.unit='';
			vm.query.house='';

			vm.buildList=[];
			vm.unitList=[];
			vm.houseList=[];
			var add=document.getElementById('btnd')
				add.value='';
			vm.shows=false;
			vm.showi=false;
       },
       //替换搜索内容
	   alertFN(s) {
            vm.$nextTick(function(){
                var add=document.getElementById('btnd')
                add.value=s.name
                vm.query.sect = s.name;
                vm.query.sectID=s.id;
                let coronapreventionmode=s.params.CORONA_PREVENTION_MODE;
                if(coronapreventionmode=="0" || coronapreventionmode==undefined || coronapreventionmode=="") {
                    alert("您选择的小区没有开放该功能，您的登记可能无效");
                } 
                vm.shows=false;
                vm.add();
            })
       },
       add() {
            vm.getCellMng(vm.query.sectID,"", "","03");
            vm.getCellMng(vm.query.sectID,"0","","02");
            vm.getCellMng(vm.query.sectID,"0","0","01");
		},
       //楼宇选中
	   getCouponSelected() {
           for(var i=0;i<vm.buildList.length;i++){
               if(vm.query.build==vm.buildList[i].id) {
                   vm.query.buildname=vm.buildList[i].name
               }
           }
            vm.getCellMng(vm.query.sectID,vm.query.build,'','02');
            vm.getCellMng(vm.query.sectID, vm.query.build, "0", "01");
       },
       //门牌选中
	   getCoupon(){
           for(var i=0;i<vm.unitList.length;i++){
               if(vm.query.unit==vm.unitList[i].id) {
                   vm.query.unitname=vm.unitList[i].name
               }
           }
			vm.getCellMng(vm.query.sectID,vm.query.build,vm.query.unit,'01');
       },
       //室号选中
		getCoupons() {
            for(var i=0;i<vm.houseList.length;i++){
               if(vm.query.house==vm.houseList[i].id) {
                   vm.query.housename=vm.houseList[i].name
               }
            }
        },
        //请求 楼宇 门牌 室号 数据
	  	// 参数1： 小区id 参数2： 楼宇id 参数3： 室号id 参数4： 数据类型（03：楼宇；02：门牌；01：房屋）
	  	getCellMng(sect_id,build_id,unit_id,data_type){
			let url='/getHeXieCellById'
			let params = {
				sect_id, 
				build_id,
				unit_id,
				data_type 
			};
			vm.receiveData.getData(vm,url,'queryInfo',function(){
                if(vm.queryInfo.success){
			    	let InfoList = vm.queryInfo.result;
                    if ("03"==data_type) {
                        vm.buildList = InfoList.build_info;
                        vm.buildList.unshift({ id: "0", name: "请选择" });
                    }else if("02"==data_type){
                        vm.unitList= InfoList.unit_info;
                        vm.unitList.unshift({ id: "0", name: "请选择" });
                    }else if("01"==data_type){
                        vm.houseList = InfoList.house_info;
                        vm.houseList.unshift({ id: "0", name: "请选择" });
                    }
                }else {
                    if ("03" == data_type) {
                        vm.buildList =[];
                        vm.unitList = [];
                        vm.houseList = [];
                    } else if ("02" == data_type) {
                        vm.unitList = [];
                        vm.houseList = [];
                    } else if ("01" == data_type) {
                        vm.houseList = [];
                    }
                }
			},params)
		},
        //ios中留白问题
        fixScroll() {
            let u = navigator.userAgent;
            let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
            if (isiOS) {
            window.scrollTo(0,0);
            }
        },
        ben() {
            if(vm.flay) {
                vm.flay=false;
                if(vm.query.sect==""|| vm.name==''||vm.select==""||vm.hao==""||vm.query.housenam==""){
                    let r=confirm("预约信息为填写完整!");
                    vm.flay=true;
                }else {
                    if(vm.query.housename=="请选择"||vm.query.housename==""){
                        alert("请选择您所在小区地址");
                        vm.flay=true;
                    }else {
                         vm.content();
                    }
                }
            }
        },
        content(){
                let url="/health/maskResv";
                    vm.receiveData.postData(vm,url,
                    {
                        threadContent:vm.name+","+vm.select+","+vm.hao,
                        userSectId:vm.query.sectID,
                        userSectName:vm.query.sect,
                        userAddress:vm.query.buildname+""+vm.query.unitname+""+vm.query.housename
                    },'res',function(){
                    if(vm.res.success){
                        alert('提交成功')
                        vm.$router.push({path:'/catalog'});
                    }else {
                        vm.flay=true;
                        alert(vm.res.message==null?'提交失败，请重试':vm.res.message);
                    }
                })
            }    
        
   },

   computed: {},
}
</script>

<style  scoped>
.mask {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #ffffff;;
    overflow:auto;
}
/*选小区 -- */
.main {
    padding: 0 .3rem;
}
.mint-tab-container-item {
    -ms-flex-negative: 0;
    flex-shrink: 0;
    width: 100%;
}
.query-data{
    padding: .25rem 1rem;
}
.virtual-input{
    width:3.4rem;
    border:1px solid #4c4c4c;
    border-radius: 5px;
    padding-left: 0.2rem;
    display: inline-block;
    height: 0.6rem;
    background-color: #fff;
    font-size:16px;
    box-sizing: border-box;
}
.input-row{
    padding-bottom: 0.3rem;
    font: 0.26rem/0.5rem "";
    color: #a6937c;
    height: 0.6rem;
    position:relative;
}

.input-row .input-uis {
width: 3.5rem;
position: absolute;
top: 32px;
left: 39px;
height: 184px;
z-index: 666;
background-color: #F5F4F3;
overflow: hidden;
color: #000;
-webkit-box-sizing: border-box;
box-sizing: border-box;
overflow-y: auto;
}
.input-row .input-uis li {
    overflow: hidden;
    font-size: 16px;
    height:30px;
    line-height:30px;
    border-bottom: 1px solid #ccc;
    letter-spacing: 0.08rem;
    color: #707070;
    padding-left:0.2rem;
    background-color:#fff;
}
/* -- */
.hand {
    padding:0.3rem 0.5rem 0; 
}
.handtest {
    font-size: 0.4rem;
    color: #2b2b2b;
    letter-spacing: 0.02rem;
    margin-bottom: 0.2rem;
}
em {
    font-size: 0.5rem;
    position: relative;
    top: 0.08rem;
    color: #FE161D;
    margin-right: 0.02rem;
    width: 0.25rem;
    display:inline-block
}
.topt {
    width: 100%;
    height: 0.3rem;
    line-height: 0.3rem;
    text-indent: 0.25rem;
    font-size: 0.28rem;
    margin: 0.2rem 0;
    border: 1px solid #d5d5d5;
    padding: 0.1rem 0;
    outline: none;
}
.handselect {
    width: 100%;
    font-size: 0.28rem;
    line-height: 0.3rem;
    text-indent: 0.25rem;
    margin: 0.2rem 0;
    border: 1px solid #d5d5d5;
    padding: 0.054rem 0;
    outline: none;
    margin-left: 0.25rem;
    color:#747474;
    background:#ffffff;
    font-size: 0.28rem;
}
.btn-fabu {
    position: absolute;
    width: 70%;
    height: 0.76rem;
    bottom: 0.3rem;
    left: 15%;
    right: 15%;
    border-radius: 5px;
    background-color: #FF7F00;
    line-height: 0.76rem;
    color: white;
    text-align: center;
    letter-spacing: 0.05rem;
    font-size: 0.45rem;
    font-family: PingFangSC-Semibold, sans-serif;
    z-index: 999;
    }
</style>
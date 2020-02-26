<template>
   <div class="regs">
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
       <div class="toptest" style="font-size: 0.375rem;padding: 0.3rem 0.6rem;">
            为避免新型冠状病毒在小区内传播,<br>
            请各位如实填写此收集表，祝各位<br>业主身体健康。
       </div>
       <div class="toptest test1">
          <p>
            <span>01.</span>当日是否有咳嗽、胸闷、发热、乏力、干咳等症状? (必填)
          </p>   
          <div class="test2">
            <div class="test2res">
                <input type='radio' id='wushi' value='1' v-model='xuan1'/>
                <label for='wushi'>无身体不适</label>
            </div>  
            <div class="test2res">
                <input type='radio' id='wushi1' value='2' v-model='xuan1'/>
                <label for='wushi1'>有其中一项或多项症状</label>
            </div>
          </div>
       </div>
       <div class="toptest test1">
          <p>
            <span>02.</span>当日接触的亲属及朋友,有无咳嗽、胸闷、发热、乏力、干咳等症状? (必填)
          </p>   
          <div class="test2">
            <div class="test2res">
                <input type='radio' id='kesao' value='1' v-model='xuan2'/>
                <label for='kesao'>无身体不适</label>  
            </div>
            <div class="test2res">
                <input type='radio' id='kesao1' value='2' v-model='xuan2'/>
                <label for='kesao1'>有其中一项或多项症状</label>
            </div>
          </div>
       </div>
       <div class="toptest test1">
          <p>
            <span>03.</span>是否接触过以下人员？ (必填)
          </p>   
          <div class="test2">
            <div class="test2res">
                <input type='radio' id='ran' value='1' v-model='xuan3'/>
                <label for='ran'>接触过从湖北地区回来的人员</label>  
            </div>
            <div class="test2res">
                <input type='radio' id='ran1' value='2' v-model='xuan3'/>
                <label for='ran1'>接触过确诊或疑似的病患</label>
            </div>
            <div class="test2res">
                <input type='radio' id='ran2' value='3' v-model='xuan3'/>
                <label for='ran2'>在定点医院就医或定点医院的医生、病人接触过</label>
            </div>
            <div class="test2res">
                <input type='radio' id='ran3' value='4' v-model='xuan3'/>
                <label for='ran3'>无相关接触史</label>
            </div>
          </div>
       </div>
        <div class="toptest test1 testb">
          <p>
            <span>04.</span>如果当日有就医或其他特殊情况，请说明
          </p>   
          <div class="test2">
              <input type='type' @blur="fixScroll" placeholder="点击填写" class="botn" v-model='content'/>
          </div>

          <div class="btn" :class="{'btnback':back}" @click="btnn()">
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
           xuan1:'',
           xuan2:'',
           xuan3:'',
           content:'',
           back:false,
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
           faly:true
       };
   },
   created() {
       vm=this;
   },
   mounted() {
   },
   watch:{
       xuan1(nw,nv){
           if(nw!=""&&vm.xuan2!=""&&vm.xuan3!=""){
               vm.back=true;
           }
       },
       xuan2(nw,nv){
           if(nw!=""&&vm.xuan1!=""&&vm.xuan3!=""){
               vm.back=true;
           }
       },
       xuan3(nw,nv){
           if(nw!=""&&vm.xuan1!=""&&vm.xuan2!=""){
               vm.back=true;
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
       btnn() {
          if(vm.faly) {
            vm.faly=false;
            if(vm.xuan1!=''&&vm.xuan2!=""&&vm.xuan3!="") {
                if(vm.query.housename=="请选择"||vm.query.housename==""){
                    let r=confirm("请选择您所在小区地址");
                    vm.faly=true;
                }else {
                    vm.contents();
                }
            }
            else {
               vm.faly=true; 
            }
          }
       },
        contents(){
                let url="/health/report";
                vm.receiveData.postData(vm,url,
                {
                    threadContent:vm.xuan1+","+vm.xuan2+","+vm.xuan3+","+vm.content,
                    userSectId:vm.query.sectID,
                    userSectName:vm.query.sect,
                    userAddress:vm.query.buildname+""+vm.query.unitname+""+vm.query.housename
                },'res',function(){
                    if(vm.res.success){
                        alert('提交成功')
                        vm.$router.push({path:'/catalog'});
                    }else {
                        vm.faly=true;
                        alert(vm.res.message==null?'提交失败，请重试':vm.res.message);
                    }
                })
        },  
        //ios中留白问题
        fixScroll() {
            let u = navigator.userAgent;
            let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
            if (isiOS) {
            window.scrollTo(0,0);
            }
        }
   },

   computed: {},
}
</script>

<style  scoped>
.regs {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background:#F5F5F5;
  overflow:auto;
}
/* 选小区-- */
.main {
    padding: 0 .3rem;
    background: #fff;
}
.mint-tab-container-item {
    -ms-flex-negative: 0;
    flex-shrink: 0;
    width: 100%;
}
.query-data{
    padding: .25rem 1rem;
    margin-bottom: .2rem;
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
.toptest {
    padding: 0.3rem 0.5rem;
    background: #fff;
    font-family: Microsoft YaHei;
    font-size: 0.39rem;
    letter-spacing: 0.03rem;
    line-height: 0.7rem;
    margin-bottom:0.2rem;
    font-weight: 500;
}
span {
    color: #FF7809;
    font-family: 400;
}
.test1 {
    padding: 0.25rem;
}
.regs .testb {
    margin-bottom:0;
}
.botn {
    border: none;
    width: 100%;
    height: 0.6rem; 
    line-height:0.6rem;
    outline: none;
    overflow-wrap: break-word;
    overflow: hidden;
    border-bottom:2px solid #F5F7FA;
}
p {
    margin-bottom:0.2rem;
}
.test2 {
    font-size: 0.3rem;
    color:#878787;
}
.test2res {
    position: relative;
    line-height: 0.5rem;
    text-indent: 0.36rem;
}

input[type='radio']{
    display:none; 
}
input[type='radio'] + label:before{
	content: "";
    display: inline-block;
    width: 0.23rem;
    height: 0.23rem;
    border-radius: 50%;
    border: 1px solid #ACACAC;
    vertical-align: middle;
    position: absolute;
    left: 0;
    top: 0.12rem;
}
 
input[type='radio']:checked+label:before{
    width: 0.15rem;
    height: 0.15rem;
    border-radius: 50%;
   	border: 4px solid #FF6300;
    color: #fff;
}

.btn {
    text-align: center;
    background: #ffcc9b;
    color: #ffffff;
    width: 94%;
    height: 0.8rem;
    line-height: 0.8rem;
    margin: 0.8rem auto 0.2rem;
    border-radius: 0.07rem;
    font-size: 0.5rem;
}
.btnback {
    background: #FF7401;
}
</style>
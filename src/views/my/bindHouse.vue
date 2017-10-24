<style scoped>
	.bottomBtn{
		position: fixed;
		bottom: 0;
		height: 44px;
		background-color:#ff8a00;
		color:white;
	}
	ul{
		margin: 10px 0 0;
		padding: 0;
	}
	ul li{
		font-size: '微软雅黑';
		color: #000;
		padding: 10px 15px ;
		list-style: none;
	}
	.fr{
		float: right;
		
	}
</style>

<template>
	<div class="bindhouse">
		<ul>
			<li>{{name}}&nbsp;{{result.city_name}}</li>
			<li>
				<span class="fl">{{result.cell_addr}}</span>
				<span class="fr">{{result.cnst_area}}平米</span>
			</li>
			<li>
				{{result.mng_cell_id}}(户号)
			</li>
		</ul>
		<mt-button  size="large" class="bottomBtn" @click.native="addHouse" >添加房子</mt-button>
	</div>
</template>

	
<script>
	let vm;
	import { MessageBox } from 'mint-ui';
	export default {
	  created(){
	  	vm = this;
	  },
	  data(){
	  	return{
	  		result:{},
	  		axiosParams:{
        		number: this.$route.params.number
        	},
	  		name:'华川家园',
	  		city:'上海市',
	  		address : '浦东新区秒传路1弄1号1室',
	  		size:'10.0',
	  		number:13456567 //户号

	  	}
	  },
	  mounted(){
	  	//查询number下的房屋
	  	 let url = '/hexiehouse/'+ this.axiosParams.number
	  	//getData: function (vm, url, params, backdataname) {
	  		this.receiveData.getData(vm,url,{},'result')
	  },
	  methods:{
	  	addHouse(){//添加房子
	  		
	  		console.log(this.result)

	  		//MessageBox.alert('添加房屋成功','www.e-she.com');
	  	},

	  	//字符串转为对象
	  	loadxml: function(xmlStr){
        	
        	var root = document.createElement('XMLROOT');
        	root.innerHTML = xmlStr;
        	return vm.parse(root)
    	},
    	
    	//递归解析 将xml 对象转为 json
    	parse: function(node){
	        var result = {};
	        for(var i = 0 ; i < node.childNodes.length ; ++i){
	            if(node.childNodes[i].nodeType == 1){//元素节点 继续递归解析
	                result[node.childNodes[i].nodeName.toLowerCase()] = this.parse(node.childNodes[i]);
	            }else if(node.childNodes[i].nodeType==3){//文本节点 返回
	                return node.childNodes[i].nodeValue;
	            }
	        }
	        return result;
    	} ,
	




	  }
	}
</script>
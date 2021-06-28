<template>
	<div class="main">
		<van-overlay :show="showOverlay">
			<div class="overlay-loading">
				<van-loading type="spinner" color="#ff8a00" vertical>处理中...</van-loading>
			</div>
		</van-overlay>
		<div class="white-space"></div>
		<div class="search-body">
			<van-cell-group :border="false">
				<van-search v-model="sectName" placeholder="小区名称" @input="queryInput" @clear="onSectClear">
					<template slot="left">
						<div class="title-text">小区名称</div>
					</template>
				</van-search>
				<div class="search-values" v-for="sect in sectList" :key="sect.id" @click="selectSect(sect)">{{sect.name}}</div>
			</van-cell-group>
			<van-cell-group :border="false" v-show="version==='0'">
				<van-search v-if="selSect&&selSect.length>0" v-model="cellAddr" placeholder="房屋地址" @input="queryCellInput" 
					@clear="onCellClear">
					<template slot="left">
						<div class="title-text">房屋地址</div>
					</template>
				</van-search>
				<div class="addr-hint" v-if="selSect&&selSect.length>0">如1号101，输入1-101即可</div>
				<div class="search-values" v-for="cell in cellList" :key="cell.id" @click="selectCell(cell)">{{cell.name|subString}}</div>

				<van-search v-if="selCell&&selCell.length>0" placeholder="建筑面积  ㎡" @focus="showKeyboard = true"
					readonly clickable :value="cellArea">
					<template slot="left" >
						<div class="title-text">建筑面积</div>
					</template>
					<template slot="left-icon">
						<van-icon name="wap-home-o" />
					</template>
				</van-search>
				<van-number-keyboard :show="showKeyboard"  @blur="showKeyboard = false" theme="custom" extra-key="." close-button-text="完成"
				v-model="cellArea" @touchstart.native.stop="showKeyboard = true"/>
				<div class="select-cell-hint" v-if="selCell">选中的房屋：</div>
				<div class="select-cell" v-if="selCell">{{selSectName}}<br>{{selCellName}}</div>
			</van-cell-group>
			<van-cell-group :border="false" v-show="version==='1'">
				<van-search v-if="selSect&&selSect.length>0" v-model="verno" placeholder="房屋户号" @input="queryVerNoInput" 
					@clear="onVerNoClear" @search="onBindSubmit">
					<template slot="left">
						<div class="title-text">房屋户号</div>
					</template>
					<template slot="left-icon">
						<van-icon name="wap-home-o" />
					</template>
				</van-search>
				<div class="addr-hint" v-if="selSect&&selSect.length>0">户号可咨询所在小区物业，请拨打物业管理处电话 
					<a v-for="(item, key) in telList" :key="key" class="link-tel" :href="'tel:'+item">{{item}}&nbsp;&nbsp;<br></a>
				</div>
			</van-cell-group>
			
			<van-goods-action :safe-area-inset-bottom="true">
				<van-goods-action-button color="#ff8a00" type="warning" text="绑定房屋" @click="onBindSubmit"/>
			</van-goods-action>
		</div>
	</div>
</template>

<script>
	import BaseInfoApi from '@/api/BaseInfoApi.js'
	import {Search, CellGroup, Field, Overlay, Loading, Dialog, Toast, Icon, GoodsAction, GoodsActionButton, NumberKeyboard } from 'vant'

	export default{
		components: {
			[Search.name]: Search,
			[Overlay.name]: Overlay,
			[Loading.name]: Loading,
			[CellGroup.name]: CellGroup,
			[Field.name]: Field,
			[Icon.name]: Icon,
			[GoodsAction.name]: GoodsAction,
			[GoodsActionButton.name]: GoodsActionButton,
			[NumberKeyboard.name]: NumberKeyboard,
		},
		filters: {
			subString(value) {
				if(value != "" && value.length > 20){
					let addr = value.substring(value.length-20, value.length)
					addr = '…'+ addr
					return addr
				} else {
					return value
				}

			}
		},
		data(){
			return{
				showOverlay: false, //遮罩
				sectName: '',
				cellAddr: '',
				sectList: [],
				cellList: [],
				selSect: '',
				selSectName: '',
				selCell: '',
				selCellName: '',
				cellArea: '',
				showKeyboard: false,
				version: 99,	//0面积绑定，1户号绑定
				verno: '',	//户号
				telList: [],

			}
		},
		methods: {
			querySect() {
				let param = {sect_name: this.sectName}
				return BaseInfoApi.querySectList(param)
			},
			queryInput() {
				if(!this.sectName) {
					return false
				}
				this.querySect().then((response)=>{
					if(response.data.success) {
						if(response.data.result.sect_info) {
							this.sectList = response.data.result.sect_info
						}
					}else {
						Toast(response.data.message)
					}
				}).catch((error)=>{
					Toast(error)
				})
			},
			queryCell(){
				let param = {
					sectId: this.selSect,
					cellAddr: this.cellAddr
				}
				return BaseInfoApi.queryCellList(param)
			},
			queryCellInput(){
				if(!this.cellAddr) {
					return false
				}
				this.queryCell().then((response)=>{
					if(response.data.success) {
						if(response.data.result.house_info) {
							this.cellList = response.data.result.house_info
						}
					}else {
						Toast(response.data.message)
					}
				}).catch((error)=>{
					Toast(error)
				})
			},
			selectSect(sect) {
				this.selSect = sect.id
				this.selSectName = sect.name
				this.sectList = []
				this.sectName = sect.name
				this.version = sect.params.WECHAT_HOUSE_SEL_MODE
				this.telList = sect.telList
			},
			selectCell(cell) {
				this.selCell = cell.id
				this.selCellName = cell.name
				this.cellList = []
				this.cellAddr = cell.name
			},
			onSectClear(){
				this.sectName = ''
				this.sectList = []
				this.selSect = ''
				this.selSectName = ''
				this.version = 99
				this.telList = []
				
				this.cellAddr = ''
				this.cellList = []
				this.selCell = ''
				this.selCellName = ''
			},
			onCellClear(){
				this.cellAddr = ''
				this.cellList = []
				this.selCell = ''
				this.selCellName = ''
			},
			queryVerNoInput(){
				if(!this.verno){
					return false
				}else {
					this.verno = this.verno.replace(/\s/g, "")
				}
			},
			onVerNoClear(){
				this.verno = ''
			},
			onBindSubmit(){
				if(this.version === '0') {
					if(!this.selSect){
						Toast('请选择小区')
						return false
					}
					if(!this.cellArea){
						Toast('请输入房屋建筑面积')
						return false
					}
					let param = {
						area: this.cellArea,
						houseId: this.selCell
					}
					Dialog.confirm({
						message: this.cellAddr + '，确认要添加吗？',
					}).then(() => {
						BaseInfoApi.bindHouseByArea(param).then((response)=>{
							if(response.data.success) {
								Dialog.alert({
									message: '绑定房屋成功'
								}).then(() => {
									this.$router.push("/myhouse")
								}).catch((error)=>{
									Toast(error)
								})

							}else {
								let message = response.data.message
								if(!message) {
									message = response.data.errorCode
								}
								Dialog.alert({
									message: message
								})
								return false
							}
						}).catch((error)=>{
							Toast(error)
						})
					}).catch(() => {
						return false
					})

				}else if(this.version === '1'){
					console.log(this.verno)
					if(!this.verno){
						Toast('请填写正确的户号')
						return false
					}
					let reg = /^\d{12}$/
					if(!reg.test(this.verno)){//为数字即通过
						Toast('请填写正确的户号')
						return false
					}
					this.showOverlay = true
					BaseInfoApi.queryHouseByVersno(this.verno).then((response)=>{
						if(response.data.success) {
							this.showOverlay = false
							if(response.data.result && response.data.result.length>0){
								this.$router.push({path:'/bindHouse/' + vm.huhao,query:{type:'1'}});
							}else{
								Dialog({message: '未查询到该房屋'})
							}
						}else {
							let message = response.data.message
							if(!message) {
								message = response.data.errorCode
							}
							Dialog({message: message})
							this.showOverlay = false
							return false
						}
					}).catch((error)=>{
						Toast(error)
						this.showOverlay = false
					})

				}else {
					Toast('请选择小区')
				}

			}

		}
	}
	
</script>

<style scoped>

.white-space {
	width: 100%;
	height: 5vh;
}
.title-text {
	margin: 0 0.2rem 0 0.2rem;
	color: #a6937c;
}
.search-body {
	width: 100%;
}
.search-values {
	margin-left: 0.3rem;
	padding: 0.15rem;
	border-bottom: 1px solid #ccc;
	width: 80%;
}
.addr-hint {
	color: red;
	margin-left: 1.8rem;
	margin-right: 0.2rem;
}
.select-cell {
	margin: 0 0.5rem 0rem 0.5rem;
	color: #4994df;
	font-weight: bolder;
	font-size: .35rem;
}
.select-cell-hint {
	margin: 10vh 0.5rem 0.2rem 0.5rem;
	color: red;
	/* font-weight: bolder; */
	font-size: .35rem;
}
.link-tel{
	color: #0000EE;	
}
</style>
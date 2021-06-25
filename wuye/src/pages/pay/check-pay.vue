<template>
	<div class="main">
		<van-overlay :show="false">
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
			</van-cell-group>
			<van-cell-group :border="false">
				<div class="search-values" v-for="sect in sectList" :key="sect.id" @click="selectSect(sect)">{{sect.name}}</div>
				<van-search v-if="selSect&&selSect.length>0" v-model="cellAddr" placeholder="房屋地址" @input="queryCellInput" 
					@clear="onCellClear">
					<template slot="left">
						<div class="title-text">房屋地址</div>
					</template>
				</van-search>
				<div class="addr-hint" v-if="selSect&&selSect.length>0">如1号101，输入1-101即可</div>
				<div class="search-values" v-for="cell in cellList" :key="cell.id" @click="selectCell(cell)">{{cell.name|subString}}</div>

				<van-search v-if="selCell&&selCell.length>0" v-model="cellArea" placeholder="建筑面积  ㎡" @input="queryInput">
					<template slot="left">
						<div class="title-text">建筑面积</div>
					</template>
					<template slot="left-icon">
						<van-icon name="wap-home-o" />
					</template>
				</van-search>
				<div class="select-cell-hint" v-if="selCell">选中的房屋：</div>
				<div class="select-cell" v-if="selCell">{{selSectName}}<br>{{selCellName}}</div>
			</van-cell-group>
		</div>
	</div>
</template>

<script>
	import BaseInfoApi from '@/api/BaseInfoApi.js'
	import {Search, CellGroup, Field, Overlay, Loading, Dialog, Toast, Icon } from 'vant'

	export default{
		components: {
			[Search.name]: Search,
			[Overlay.name]: Overlay,
			[Loading.name]: Loading,
			[CellGroup.name]: CellGroup,
			[Field.name]: Field,
			[Icon.name]: Icon,
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
				sectName: '',
				cellAddr: '',
				sectList: [],
				cellList: [],
				selSect: '',
				selSectName: '',
				selCell: '',
				selCellName: '',
				cellArea: '',
			}
		},
		methods: {
			querySect() {
				return BaseInfoApi.querySectList(this.sectName)
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
						// Toast(response.data.message)
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
						// Toast(response.data.message)
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
				this.onCellClear()
			},
			onCellClear(){
				this.cellAddr = ''
				this.cellList = []
				this.selCell = ''
				this.selCellName = ''
				this.onSectClear()
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
	margin-left: 1.65rem;
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
</style>
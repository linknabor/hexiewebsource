<template>
	<!-- 确定选中的状态   点击radio改变状态,emmit一个事件 -->
<div>
	
	<div  class="bill-item ov" v-for="(item,index) in billInfo" @click="select(index)">
		<div class="select-item fl" :class="{selected:item.selected }" ></div>
		<div class="fl info">
			<p class="top ov">
				<span class="title fl">{{item.service_fee_name}}</span>
				<span class="price fr">￥{{item.fee_price}}</span>
			</p>
			<p class="bottom ov">
				<span class="addr fl">{{item.pay_cell_addr}}</span>
				<span class="date fr data-height">{{item.service_fee_cycle}}</span>
			</p>
		</div>	
	</div>
</div>
</template>
<script>
	export default{
		props:{
			billInfo:{
				type:Array,
				required: true
			},
		},
		methods:{
			select(index){ 
				this.$emit('itemClick',index,this.billInfo)
			}
		}

	}
</script>
<style>
.bill-item{
	margin-top: 0.3rem;
	overflow: hidden;
	color: #666;
	border-radius: 3px;
	border:1px solid #cdcdcb;
}
.select-item {
    background: url('../../static/image/icon_unselect.png') no-repeat ;
    background-size: 0.32rem;
    background-position: center;
    width:0.7rem;
    height: 2.6rem;
    border-right: 1px solid #cdcdcb;
}
.selected {
	background: url('../../static/image/icon_selected.png') no-repeat ;
	background-size: 0.32rem;
   background-position: center;
}

.info{
	padding: 0.2rem 0.3rem 0.1rem 0.3rem;
	width: calc(100% - 1.4rem);
	/*padding: 0.3rem 0.1rem;*/
}

.top{
	padding: 0;
	margin: 0;
	line-height:1.12rem;
	height: 1.12rem;
	font-size: 0.3rem;
}

.top .title{
	color: #000;
}

.top .price{
	color:#ff8a00;
}

.bottom{
	line-height: 0.4rem;
	padding: 0;
	margin: 0;
}

.bottom .addr{
	width: 3rem;
	-background-color: #000;
	margin-right:0.5rem;
	overflow: hidden;
}

.bottom .date{
	padding-left: 0.35rem;
	background: url('../../static/image/icon_time_gray.png') no-repeat left center;
	background-size: 0.3rem;
}
.data-height{}
</style>
<template>
  <div class="main">
    <div class="header" v-if="skeletonLoading"></div>
    <van-overlay :show="showOverlay">
        <van-loading type="spinner" color="#1989fa" vertical class="loading">处理中...</van-loading>
    </van-overlay>
    <van-skeleton title :row="3" :loading="skeletonLoading">
    <van-nav-bar title="工单明细" left-text="返回" left-arrow @click-left="onClickNav"/>
      <van-empty v-show="empty" description="没有查询到工单哦"/>
      <van-cell-group v-show="!empty">
        <van-cell title="基本信息" class="title-text" />
        <van-cell :value="orderDetail.order_id" value-class="order-text">
          <template slot="title"
            >工单号&nbsp;&nbsp;<van-tag
              type="primary"
              v-clipboard:copy="orderDetail.order_id" v-clipboard:success="onCopy" v-clipboard:error="onError"
              >复制</van-tag
            ></template
          >
        </van-cell>
        <van-cell title="下单时间" :value="orderDetail.createDateStr" />
        <van-cell title="工单类型" :value="orderDetail.workorder_type_cn" />
        <van-cell title="工单状态" :value="orderDetail.workorder_status_cn" />
        <van-cell title="工单区域" :value="orderDetail.dist_type_cn" />
        <van-cell title="工单来源" :value="orderDetail.workorder_source_cn" />
        <van-cell title="所在小区" :label="orderDetail.sect_name" label-class="label-text"/>
        <van-cell title="服务地址" :label="orderDetail.serve_address" label-class="label-text"/>
        <van-cell title="工单内容" :label="orderDetail.content" label-class="label-text"/>
        <van-image class="image-view" lazy-load v-for="(image, index) in orderDetail.images" :key="index"
            width="80" height="80" :scr="image" @click="imagePreview(index, orderDetail.images)"/>
      </van-cell-group>
      <van-steps direction="vertical" :active="active">
        <van-step v-for="(step, index) in steps" :key="index">
            <h3>{{step.text}}</h3>
            <p>{{step.desc}} <a :href="'tel:' + step.mobile" class="mobile-view">{{step.mobile}}</a></p>
        </van-step>
      </van-steps> 
      <van-field v-show="orderDetail.workorder_status==='00'" v-model="reason" placeholder="如需撤回工单，请填写驳回原因" left-icon="records"/>
      <div class="end-view"></div>
      <van-goods-action v-if="orderDetail.workorder_status==='00'||orderDetail.workorder_status==='03'">
        <van-goods-action-button type="warning" text="订单撤回" v-if="orderDetail.workorder_status==='00'" @click="reverse"/>
        <van-goods-action-button type="danger" text="支付" v-if="orderDetail.workorder_status==='03'" @click="pay"/>
      </van-goods-action>
    </van-skeleton>
  </div>
</template>
<script>
import WorkOrderApi from '@/api/WorkOrderApi.js';
import {
  Toast, Dialog, Loading, Overlay, 
  Skeleton,
  Cell,
  CellGroup,
  NavBar,
  Empty,
  Tag,
  Image as VanImage,
  ImagePreview,
  Step,
  Steps,
  Field,
  GoodsAction, GoodsActionButton
} from 'vant';
export default {
  data() {
    return {
      showOverlay: false,
      skeletonLoading: true,
      orderId: this.$route.query.orderId,
      empty: true,
      active: 0,
      orderDetail: {},
      orderFlow: [],
      steps: [],
      reason: '',
    }
  },
  components: {
    [Skeleton.name]: Skeleton,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [NavBar.name]: NavBar,
    [Empty.name]: Empty,
    [Tag.name]: Tag,
    [VanImage.name]: VanImage,
    [ImagePreview.name]: ImagePreview,
    [Step.name]: Step,
    [Steps.name]: Steps,
    [Field.name]: Field,
    [GoodsAction.name]: GoodsAction,
    [GoodsActionButton.name]: GoodsActionButton,
    [Dialog.Component.name]: Dialog.Component,
    [Loading.name]: Loading,
    [Overlay.name]: Overlay
  },
  mounted() {
    if (this.orderId) {
      this.getOrderDetail(this.orderId);
    }
    setTimeout(() => {
      this.skeletonLoading = false
    }, 1000); //延迟时间 这里是1秒
  },
  methods: {
    getOrderDetail(orderId) {
      WorkOrderApi.getOrderDetail(orderId).then((response) => {
          if (response.data.success) {
            this.orderDetail = response.data.result.order_detail;
            this.orderFlow = response.data.result.order_flow;
            if(this.orderDetail.order_id) {
                this.empty = false
            }
            let steps = []
            this.orderFlow.forEach((flow)=>{
                let step = {}
                step.text = flow.operDateStr
                step.desc = '订单' + flow.operation_cn + ' ' + flow.oper + ' '
                step.mobile = flow.oper_contact
                steps.push(step)
            })
            this.steps = steps
            this.active = steps.length-1
          } else {
            Toast(response.data.message);
          }
        })
        .catch((error) => {
          Toast(error);
        });
    },
    onCopy() {
      Toast('复制成功');
    },
    onError() {
      Toast('复制失败');
    },
    imagePreview(index, images) {
      ImagePreview({
        images: images,
        startPosition: index,
      });
    },
    reverse() {
        let reason = this.reason.trim()
        if(!reason) {
            Toast('请填写撤回原因')
            return false
        }
        Dialog.confirm({
            message: '确认要撤回订单么？',
        }).then(() => {
            let data = {
                reason: this.reason
            }
            this.showOverlay = true
            WorkOrderApi.reverseOrder(this.orderId, data).then((response)=>{
                if(response.data.success){
                    Toast('订单撤消成功, 即将为您跳转...')
                    setTimeout(() => {
                        let url = 'workOrderList'
                        this.$router.push({path: url})
                    }, 1000); //延迟时间 这里是1秒
                }else{
                    Toast(response.data.message)
                    this.showOverlay = false
                }
            }).catch((error)=>{
                Toast(error)
                this.showOverlay = false
            })
        }).catch(() => {
            return false
        });
        
    },
    onClickNav() {},
  },
};
</script>

<style scoped>
.main {
  margin: 0;
  padding: 0;
  background-color: #fafafa;
  min-height: 100vh;
  height: auto;
}
.header {
  height: 3vh;
  widows: 100%;
  background-color: #fafafa;
}
.title-text {
  font-weight: bolder;
}
.order-text {
  font-size: 13px;
}
.label-text {
  font-size: 14px;
}
.image-view {
  margin-left: 5%;
}
.mobile-view {
  color: #1989fa;
}
.end-view {
  height: 15vh;
}
.loading {
    margin-top: 45vh;
}
</style>
<template>
  <div class="main">
    <van-nav-bar title="工单明细" left-text="返回" left-arrow @click-left="onClickNav"/>
    <div class="header"></div>
    <van-skeleton title :row="3" :loading="skeletonLoading">
      <van-empty :style="{ display: empty }" description="没有查询到工单哦" />
      <van-cell-group>
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
      <van-field v-model="reason" placeholder="如需撤回工单，请填写驳回原因" left-icon="records"/>
    </van-skeleton>
  </div>
</template>
<script>
import WorkOrderApi from '@/api/WorkOrderApi.js';
import {
  Toast,
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
} from 'vant';
export default {
  data() {
    return {
      skeletonLoading: true,
      orderId: this.$route.query.orderId,
      empty: 'block',
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
  },
  mounted() {
    if (this.orderId) {
      this.getOrderDetail(this.orderId);
    }
    setTimeout(() => {
      this.skeletonLoading = false;
    }, 1000); //延迟时间 这里是1秒
  },
  methods: {
    getOrderDetail(orderId) {
      WorkOrderApi.getOrderDetail(orderId)
        .then((response) => {
          if (response.data.success) {
            this.orderDetail = response.data.result.order_detail;
            this.orderFlow = response.data.result.order_flow;
            this.empty = 'none';
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
  height: 10vh;
}
</style>
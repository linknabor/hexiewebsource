<template>
  <div class="main">
    <van-overlay :show="show_overlay">
      <van-loading type="spinner" />
    </van-overlay>

    <van-cell-group v-for="(item, index) in carList" :key="index">
      <van-swipe-cell :before-close="beforeClose" :name="item.car_no">
        <van-cell :title="item.car_no" :border="false" size="large" icon="location-o"/>
        <template #right>
          <van-button square type="danger" text="删除" />
        </template>
      </van-swipe-cell>
    </van-cell-group>

  </div>
</template>

<script>
  import {Cell, CellGroup, SwipeCell, Button, Toast, Overlay, Loading, Dialog} from 'vant';
  import ParkApi from "@/api/Park.js"
  export default {
    name: "queryCarList",
    data() {
      return {
        show_overlay: true,
        carList: []
      }
    },

    components: {
      [Cell.name]: Cell,
      [CellGroup.name]: CellGroup,
      [SwipeCell.name]: SwipeCell,
      [Button.name]: Button,
      [Overlay.name]: Overlay,
      [Dialog.Component.name]: Dialog.Component,
      [Loading.name]: Loading
    },

    mounted() {
      this.getCarList()
    },
    methods: {

      getCarList() {
        this.show_overlay = true
        let param = {
          carNo: ''
        }
        ParkApi.getCarList(param).then((response) => {
          let data = response.data
          if(data && data.success) {
            this.carList = data.result
          }
          this.show_overlay = false
        })
      },

      beforeClose({position, instance}) {
        switch (position) {
          case 'right':
            Dialog.confirm({
              message: '确定删除吗？',
            }).then(() => {
              this.delCar(instance.name)
            });
            break;
        }
      },

      delCar(car_no) {
        this.show_overlay = true
        ParkApi.delCar(car_no).then((response) => {
          let data = response.data
          if(data.result) {
            Toast("删除成功")
          }
          this.show_overlay = false
          this.getCarList()
        })
      },

      goBack() {
        this.$router.push('/indexCar');
      }
    }
  }
</script>

<style scoped>

  .main {
    width: 100%;
    background-color: #F5F6F7;
    height: 100%;
    min-height: 100vh;
    overflow: hidden
  }

  .van-cell-group {
    border-radius: 0.5rem;
    margin: 0.2rem 0.2rem;
  }
</style>

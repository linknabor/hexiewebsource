<template>
  <div class="main">
    <van-nav-bar title="车辆信息" left-text="返回" left-arrow placeholder fixed @click-left="goBack"
    />

    <van-cell-group v-for="(item, index) in carList" :key="index">
      <van-swipe-cell>
        <van-cell :title="item.car_no" :border="false" size="large" icon="location-o"/>
        <template #right>
          <van-button square type="danger" text="删除" />
        </template>
      </van-swipe-cell>
    </van-cell-group>

  </div>
</template>

<script>
  import {Cell, CellGroup, NavBar, SwipeCell, Button} from 'vant';

  export default {
    name: "queryCarList",
    data() {
      return {
        carList: [
          {
            car_id: '',
            car_no: '沪A45321'
          },
          {
            car_id: '',
            car_no: '沪B23SD2'
          }
        ]
      }
    },

    components: {
      [Cell.name]: Cell,
      [CellGroup.name]: CellGroup,
      [NavBar.name]: NavBar,
      [SwipeCell.name]: SwipeCell,
      [Button.name]: Button
    },

    mounted() {
    },
    methods: {

      delCar(car_id) {
        console.log(car_id)
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

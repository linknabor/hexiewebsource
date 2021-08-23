<template>
  <div class="main">
    <van-nav-bar title="添加车牌" left-text="返回" left-arrow placeholder fixed @click-left="goBack"
    />
    <plateNumber @getPlateLicense="getPlateLicense" :mat="formData" :butName="butName" :isShowCheck="isShowCheck"></plateNumber>
    <div class="css-bt">
      <div class="submit-box">
        <button @click="queryCar">查看我的车辆</button>
      </div>
    </div>

  </div>
</template>

<script>
  import plateNumber from '@/components/plateNumber'
  import { NavBar } from 'vant';

  export default {
    name: "addCar",
    data() {
      return {
        isShowCheck: 1,
        butName:'保存',
        formData:{
          commonCard: '1',
          num0: '',
          num1: '',
          num2: '',
          num3: '',
          num4: '',
          num5: '',
          num6: '',
          num7: ''
        },
      }
    },

    components: {
      plateNumber,
      [NavBar.name]: NavBar
    },

    mounted() {
    },
    methods: {
      getPlateLicense(data, checked) {
        this.showDia = true
      },

      queryCar() {
        this.$router.push('/queryCarList');
      },

      goBack() {
        this.$router.push('/indexCar');
      }
    }
  }
</script>

<style scoped>

  .css-bt{
    padding: 0.1rem 0.4rem;
    margin: 0.1rem 0.1rem;
  }
  .submit-box button{
    width: 100%;
    height: 0.8rem;
    border-radius: 0.25rem;
    font-size: 0.3rem;
    margin-top: 0.7rem;
    background-color: white;
    border: 0.001rem solid blue;
    color: blue;
  }
</style>

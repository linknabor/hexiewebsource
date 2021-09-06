<template>
  <div class="main">
    <van-overlay :show="show_overlay">
      <van-loading type="spinner" />
    </van-overlay>

    <div style="height: 4.5rem">
      <plateNumber @getPlateLicense="getPlateLicense" :mat="formData" :butName="butName" :isShowCheck="isShowCheck"></plateNumber>
    </div>
    <div class="css-bt">
      <div class="submit-box">
        <button @click="queryCar">查看我的车辆</button>
      </div>
    </div>

  </div>
</template>

<script>
  import plateNumber from '@/components/plateNumber'
  import { Toast, Overlay, Loading } from 'vant';
  import ParkApi from "@/api/Park.js"

  export default {
    name: "addCar",
    data() {
      return {
        show_overlay: false,
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
      [Toast.name]: Toast,
      [Overlay.name]: Overlay,
      [Loading.name]: Loading
    },

    mounted() {
    },
    methods: {
      getPlateLicense(data, checked) {
        this.show_overlay = true;
        let param = {
          carNo: data,
          checked: checked
        }
        ParkApi.saveCar(param).then((response) => {
          let data = response.data
          if(data.result) {
            Toast("保存成功")
          }
          this.show_overlay = false
        })
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
    background-color: white;
    border: 0.001rem solid blue;
    color: blue;
  }
  .van-loading {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
</style>

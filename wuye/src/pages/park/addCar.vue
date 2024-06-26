<template>
  <div class="main">
    <van-overlay :show="show_overlay">
      <van-loading type="spinner"/>
    </van-overlay>

    <div style="height: 4rem;margin: 0.1rem">
      <plateNumber @getPlateLicense="getPlateLicense" :carObj="carObj"></plateNumber>
    </div>

    <div class="">
      <van-radio-group v-model="checkedCar">
        <van-cell-group title="我的车">
          <van-cell v-for="(item, index) in carList" :key="index" clickable icon="edit"
                    @click="checkedRad(item.car_no)">
            <template #title>
              <div style="width: 90%;float: left">
                <span class="custom-title">{{ item.car_no }}</span>
                <van-tag round color="#07C160" v-if="item.is_default === '1'">默认</van-tag>
              </div>
            </template>
            <template #right-icon>
              <van-radio :name="item.car_no"/>
            </template>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </div>

  </div>
</template>

<script>
  import plateNumber from '@/components/plateNumber'
  import {Toast, Overlay, Loading, Button, RadioGroup, Radio, Cell, CellGroup, Tag} from 'vant';
  import ParkApi from "@/api/Park.js"

  export default {
    name: "addCar",
    data() {
      return {
        show_overlay: false,
        carObj:{
          carNums:[],
          isDefault: false,
          showBtnType: 1,
        },
        carList: [],
        checkedCar: '',
        tempChecked: '',
      }
    },

    components: {
      plateNumber,
      [Toast.name]: Toast,
      [Overlay.name]: Overlay,
      [Loading.name]: Loading,
      [Radio.name]: Radio,
      [RadioGroup.name]: RadioGroup,
      [Cell.name]: Cell,
      [CellGroup.name]: CellGroup,
      [Tag.name]: Tag,
      [Button.name]: Button,
    },

    mounted() {
      this.getCarList()
    },
    methods: {
      getPlateLicense(oper, data, isDefault) {
        if('clear' === oper) {
          this.goClear()
        } else if('delete' === oper) {
          this.delCar()
        } else if('add' === oper) {
          this.show_overlay = true;
          let is_default = "0";
          if (isDefault) {
            is_default = "1";
          }
          let param = {
            carNo: data,
            checked: is_default
          }
          ParkApi.saveCar(param).then((response) => {
            let data = response.data
            if (data.result) {
              Toast("保存成功")
              this.getCarList();
              this.goClear();
            }
            this.show_overlay = false
          })
        }
      },

      getCarList() {
        this.show_overlay = true
        let param = {
          carNo: ''
        }
        ParkApi.getCarList(param).then((response) => {
          let data = response.data
          if (data && data.success) {
            this.carList = data.result
          }
          this.show_overlay = false
        })
      },

      goClear() {
        this.carObj.carNums.splice(0)
        this.carObj.isDefault = false
        this.checkedCar = '';
      },
      checkedRad(carNo) {
        this.goClear()
        if (this.tempChecked === carNo) {
          this.checkedCar = '';
          this.tempChecked = '';
        } else {
          this.checkedCar = carNo;
          this.tempChecked = carNo;
          var strs = carNo.split("")
          for (let i = 0; i < strs.length; i++) {
            this.$set(this.carObj.carNums, i, strs[i])
          }
          let is_default = false;
          this.carList.forEach(function (o) {
            if (carNo === o.car_no) {
              if (o.is_default === '1') {
                is_default = true;
              }
            }
          })
          this.carObj.isDefault = is_default
        }
      },

      delCar() {
        this.show_overlay = true
        ParkApi.delCar(this.checkedCar).then((response) => {
          let data = response.data
          if (data.result) {
            Toast("删除成功")
            this.getCarList();
            this.goClear();
          }
          this.show_overlay = false
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

  .van-loading {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .van-cell-group__title {
    font-size: 0.28rem;
  }
</style>

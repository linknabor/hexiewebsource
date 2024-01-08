<template>
  <div class="main">
    <van-overlay :show="show_overlay">
      <van-loading type="spinner"/>
    </van-overlay>

    <div style="height: 4.5rem">
      <plateNumber @getPlateLicense="getPlateLicense" :mat="formData" :butName="butName"
                   :isShowCheck="isShowCheck"></plateNumber>
    </div>
    <div class="css-bt">
      <van-button class="delBtn" type="default" :disabled="disabled" color="lightgrey" block @click="delCar">删除车辆</van-button>
    </div>

    <div class="">
      <van-radio-group v-model="checkedCar">
        <van-cell-group inset>
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
        isShowCheck: 1,
        butName: '保存',
        formData: {
          commonCard: '1',
          is_default: false,
          num0: '',
          num1: '',
          num2: '',
          num3: '',
          num4: '',
          num5: '',
          num6: '',
          num7: ''
        },
        carList: [],
        checkedCar: '',
        tempChecked: '',
        disabled: true
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
      getPlateLicense(data, checked) {
        console.log(checked)
        this.show_overlay = true;
        let is_default = "0";
        if (checked) {
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
            this.initFormData();
          }
          this.show_overlay = false
        })
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

      checkedRad(carNo) {
        if (this.tempChecked === carNo) {
          this.checkedCar = '';
          this.tempChecked = '';
          this.initFormData();
          this.disabled = true;
        } else {
          this.checkedCar = carNo;
          this.tempChecked = carNo;
          this.radioChange();
          this.disabled = false;
        }
      },

      radioChange() {
        let carNo = this.checkedCar;
        let carBit = carNo.split("");
        let data = this.formData;
        for (let i = 0; i < carBit.length; i++) {
          this.formData['num' + i] = carBit[i];
        }
        if (carBit.length === 7) {
          data.commonCard = '1';
        } else {
          data.commonCard = '2';
        }

        this.carList.forEach(function (o) {
          if (carNo === o.car_no) {
            let is_default = false;
            if (o.is_default === '1') {
              is_default = true;
            }
            data.is_default = is_default
          }
        })
      },

      initFormData() {
        for (let i = 0; i < 7; i++) {
          this.formData['num' + i] = '';
        }
        this.formData.commonCard = '1';
        this.formData.is_default = false;
      },

      delCar() {
        this.show_overlay = true
        ParkApi.delCar(this.checkedCar).then((response) => {
          let data = response.data
          if (data.result) {
            Toast("删除成功")
            this.getCarList();
            this.initFormData();
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

  .css-bt {
    padding: 0.1rem 0.4rem;
    margin: 0.1rem 0.1rem;
  }

  .delBtn {
    border-radius: 0.25rem;
    height: 0.8rem;
    margin-top: -0.2rem;
  }
  .van-loading {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>

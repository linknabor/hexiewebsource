<template>
  <div class="main">
    <van-checkbox-group v-model="checkedObj" ref="checkboxGroup">
      <div v-for="(item,index) in billInfo">
        <van-checkbox :name="index" checked-color="var(--primary-color)" @click="select(index)">
          <template #default>
            <van-cell :title="item.service_fee_name" :label="item.pay_cell_addr" :value="'￥'.concat(item.fee_price)" value-class="text-val" style="padding: 0.1rem"/>
            <van-cell :title="item.service_fee_cycle" style="padding: 0.1rem"/>
          </template>
        </van-checkbox>
        <van-divider />
      </div>
    </van-checkbox-group>
  </div>
</template>
<script>
  import {Checkbox, CheckboxGroup, Cell, CellGroup, Divider} from 'vant';

  export default {
    components: {
      [Cell.name]: Cell,
      [CellGroup.name]: CellGroup,
      [CheckboxGroup.name]: CheckboxGroup,
      [Checkbox.name]: Checkbox,
      [Divider.name]: Divider,
    },
    data() {
      return {
        checkedObj: [],
      }
    },
    props: ["billInfo"],
    watch: {
      checkedObj :{
        handler(arr) {
          this.checkedObj = arr
        }
      }
    },
    methods: {
      select(index) {
        this.$emit("itemClick", index, this.billInfo);
      }
    }
  };
</script>
<style>

  .main {
    margin: .1rem .3rem;
  }
  .van-checkbox__label {
    width: 100% !important;
  }

  .text-val {
    font-weight: bold;
    color: #323233;
  }
</style>

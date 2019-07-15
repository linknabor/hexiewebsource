<style scoped>

</style>

<template>
  <div>
    <wuye></wuye>
    <foot></foot>
  </div>
</template>

<script>
import wuye from '../pages/main/index'
import foot from '../components/footer.vue'
import cookie from "js-cookie";
export default {
  components:{
    foot,
    wuye
  },
  mounted() {

  }
};
</script>
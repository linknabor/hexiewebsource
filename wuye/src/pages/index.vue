<style scoped>
#divs {
  position: absolute;
  /* width:100%; */
  /* height: 100%; */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background:#fff;
}
</style>

<template>
  <div id="divs">
    <wuye></wuye>
    <foot></foot>
    <wx-open-subsc></wx-open-subsc>
  </div>
</template>

<script>
import wuye from '../pages/main/index'
import foot from '../components/footer.vue'
import WxOpenSubsc from '../components/WxOpenSubsc.vue'
import cookie from "js-cookie";
export default {
  components:{
    foot,
    wuye,
    WxOpenSubsc
  },
  mounted() {

  },
  methods:{
   
  }
};
</script>
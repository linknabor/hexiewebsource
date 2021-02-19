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
  </div>
</template>

<script>
import Wuye from '../pages/main/index.vue'
import Foot from '../components/footer.vue'

export default {
  components:{
    'foot':Foot,
    'wuye':Wuye
  },
  mounted() {

  },
  methods:{
   
  }
};
</script>
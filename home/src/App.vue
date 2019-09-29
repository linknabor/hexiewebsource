<template>
  <div id="app">
    <router-view/>
		<foot></foot>

  </div>
</template>

<script>
import foot from './components/footer.vue'
export default {
  name: 'App',
  data(){
    return {
      
    }
  },
  components: {
    foot
  }
}
</script>

<style>
#app {
font-size: 0.26rem;
}
body {
  background:#f2f2f2;
}

   body {
    -webkit-tap-highlight-color: transparent;
  }
</style>

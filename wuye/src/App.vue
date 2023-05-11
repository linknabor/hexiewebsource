<template>
  <div id="app">
    <router-view/>   
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      
    };
  },
  created() {
    
  },
  mounted() {
    console.log('加载 app.vue')
  },
  beforeDestroy(){
     
  },
  methods:{
     
  }
}
</script>

<style>
	#app{
		font-size: 0.26rem;
  }
   body {
    -webkit-tap-highlight-color: transparent;
  }
  :root {
    --origin-color: #ff8a00;
    --primary-color: #ff8a00;
    --secondary-color: #d01120;

    --origin-icon-selected: url("~@/assets/images/common/icon_selected.png");
    --primary-icon-selected: url("~@/assets/images/common/icon_selected.png");
    --secondary-icon-selected: url("~@/assets/images/common/icon_selected_ngs.png");
  }
</style>

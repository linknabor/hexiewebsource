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
    
    const secondaryColor = getComputedStyle(document.documentElement).getPropertyValue('--secondary-color');
    document.documentElement.style.setProperty('--primary-color', secondaryColor);

    const secondarySelIcon = getComputedStyle(document.documentElement).getPropertyValue('--secondary-icon-selected');
    document.documentElement.style.setProperty('--primary-icon-selected', secondarySelIcon);
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
    --primary-color: #ff8a00;
    --secondary-color: #d01120;

    --primary-icon-selected: url("~@/assets/images/common/icon_selected.png");
    --secondary-icon-selected: url("~@/assets/images/common/icon_selected_ngs.png");


  }
</style>

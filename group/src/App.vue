<template>
  <div id="app">
    <router-view/>
    <div id="login" v-show="login"></div>
  </div>
</template>

<script>
import cookie  from 'js-cookie';
export default {
  name: 'App',
  data() {
    return {
      login:true
    };
  },
  created() {
    this.shaDe();
  },
  mounted() {

  },
  methods:{
    shaDe(){
      if(cookie.get('shade')== 'true') {
        this.login=false;
      }
    }
  },
}
</script>

<style>
#app {
font-size: 0.26rem;
}

body {
    -webkit-tap-highlight-color: transparent;
    font-family: "微软雅黑";
    background: #ffffff;
}
#login {
    background: rgba(0,0,0,0.5);
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    position: fixed; 
    z-index:10000000;
}
</style>

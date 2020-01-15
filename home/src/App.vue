<template>
  <div id="app">
    <router-view/>
		<foot></foot>
    <div  v-show="login"
      style=" background: rgba(0,0,0,0.5);display: none;width: 100%;height: 100%;top: 0rem; position: fixed;z-index:999">
    </div>
    <div id="login" v-show="login"> 
      <img
        src="./assets/images/img/7f1b3b58-c5b6-4022-b1ed-dc4188c43a3a.gif"
        style="width:100%;vertical-align: middle;"
      />
    </div >
  </div>
</template>

<script>
import foot from './components/footer.vue'
import cookie  from 'js-cookie';
import Bus from './api/bus.js';
export default {
  name: 'App',
    data() {
    return {
      login:true
    };
  },
  created() {
   
  },
  mounted() {
      Bus.$on("logins",this.getLogin);
  },
  beforeDestroy(){
      Bus.$off();
  },
  methods:{
      getLogin(e) {
        this.login=e;
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
  -webkit-tap-highlight-color: transparent;
}
#login {
    position: fixed;
    top: 35%;
    left: 50%;
    width: 60px;
    height: 60px;
    line-height: 60px;
    margin-left: -30px;
    text-align: center;
    z-index: 1998;
    -moz-border-radius: 15px;
    -webkit-border-radius: 15px;
}
</style>

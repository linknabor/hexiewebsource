<template>
  <div class="code" @click="Ruturn">
    <div class="title">请扫描下方二维码</div>
    <div class="head">
      <div>
        <img class="head-img1" src="../../assets/images/img/wei.png" alt>
        <img class="head-img2" src="../../assets/images/img/zhifubao.png" alt>
      </div>
    </div>
    <div class="contemt">
      <img :src='imgUrl' alt>
    </div>
    <div class="bottom">
      <span>{{sect_name}}</span>
    </div>
    <div class="bottom">
      <span>{{service_type_cn}}</span>
    </div>
  </div>
</template>

<script>
let vm;
export default {
  data() {
    return {
      qrcode_id: this.$route.query.qrcode_id,
      sect_name: this.$route.query.sect_name,
      service_type_cn: this.$route.query.service_type_cn,
      imgUrl:''
    };
  },
  created() {
    vm = this;
  },
  mounted() {
      vm.qrcode();
  },

  components: {},

  methods: {
    Ruturn() {
      vm.$router.push({ path: "/service" });
    },
    qrcode() {
   
    vm.axios.get('/qrCode?qrCodeId='+vm.qrcode_id,
    {   
       responseType:'arraybuffer'
    }).then(res=>{
         return 'data:image/png;base64,' + btoa(
                new Uint8Array(res.data)
                  .reduce((data, byte) => data + String.fromCharCode(byte), '')
              );
    }).then(data => {
        vm.imgUrl=data;
    })
    }
  },

  computed: {}
};
</script>

<style  scoped>
.code {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #f09734;
}
.title {
  margin-top: 0.7rem;
  text-align: center;
  font-size: 0.35rem;
  color: #fff;
  letter-spacing: 2px;
}
.head {
  padding: 0.4rem 0;
  text-align: center;
}
.head-img1 {
  width: 1.3rem;
  padding-right: 0.46rem;
}
.head-img2 {
  padding-left: 0.5rem;
   width: 1.12rem;
}
.contemt {
  margin: 0 20%;
}
.bottom {
  padding-top: 0.3rem;
  text-align: center;
  font-size: 0.4rem;
  color: #fff;
  letter-spacing: 2px;
}
</style>
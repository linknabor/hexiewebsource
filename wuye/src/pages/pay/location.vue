<style >
body {
  background:#eee;
}
.location {
  width: 100%;
  height: 100vh;
  background: #eee;
}
.loccity {
  width: 94%;
  /* height: 7rem; */
  background: white;
  margin: auto;
  top: 0.2rem;
  position: relative;
}
.loccity-t {
  width: 100%;
  height: 2rem;
}
.locity-t-t {
  width: 92%;
  font-size: 0.4rem;
  position: relative;
  padding: 0.24rem 0.34rem;
  letter-spacing: 2px;
  top: 0.22rem;
  color: #BCBCBC;
}
.locity-t-b {
  /* width: 1rem; */
  height: 0.48rem;
  font-size: 0.37rem;
  color: #ff9800;
  text-indent:2px;
  line-height: 0.48rem;
  left: 1rem;
  top: 1.2rem;
  position: absolute;
}
.hx {
  width: 80%;
  background: #d2d2d2;
  height: 0.02rem;
  top: 1rem;
  margin: auto;
  margin-top: 0.2em;
}
.choosecity {
  width: 100%;
  /* top: 0.5rem; */
  position: relative;
  overflow: hidden;
}
.choose-t {
  width: 92%;
  height: 1rem;
  font-size: 0.4rem;
  position: relative;
  letter-spacing: 2px;
  top: 0.22rem;
  margin: auto;
  color: #BCBCBC;
}
.choose-b {
  width: 100%;
  /* top: 0.32rem; */
  /* position: relative; */
  overflow: hidden;
  padding: 0.4rem 0;
}
.choose-ct {
  width: 33.3%;
  float: left;
  margin-bottom:10px;
}
.choose-ct-1 {
  width: 1.3rem;
  height: 0.48rem;
  font-size: 0.3rem;
  text-align: center;
  line-height: 0.48rem;
  position: relative;
  margin: 0 auto;
  padding:0.1rem;
  background-color:#F5F5F5;
}

</style>

<template>
  <div class="location">
    <!-- 定位城市 -->
    <div class="loccity">
      <div class="loccity-t">
        <div class="locity-t-t">
          定位城市
        </div>
        <!-- <input type="text" v-model="value2" class="locity-t-b" id="btnd1" /> -->
        <div class="locity-t-b" id="btnd1">
          {{value2}}
        </div>
      </div>
      <div class="hx"></div>
      <!-- 可选城市 -->
      <div class="choosecity">
        <div class="choose-t">可选城市</div>
        <div class="choose-b">
          <div class="choose-ct" v-for="item in citys" :key="item.id">
            <div class="choose-ct-1" @click="dj(item)">{{item.regionName}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
     let vm;
     import wx from 'weixin-js-sdk';
    export default {
      data() {
        return {
          value2:"",
          citys: [
          ],
        
          // latitude:'',//维度
          // longitude:'',//经度
        };
      },
        created() {
          vm = this;
        },
        mounted(){
        vm.city();    //触发获取城市方法
         let url2 = location.href.split('#')[0];
        vm.receiveData.wxconfig(vm,wx,['getLocation'],url2);

        },
  
        methods: {

          dj(item){
              
              var citydata=item.regionName;
              vm.$router.push({path:'/Fontunit',query:{citydata1:citydata}})
          },
           city(){    //定义获取城市方法
           
              wx.ready(function () {
               
              wx.checkJsApi({
                  jsApiList: [
                      'getLocation'
                  ],
              success: function (res) {
                  if (res.checkResult.getLocation == false) {
                      alert('你的微信版本太低，不支持微信JS接口，请升级到最新的微信版本！');
                      return;
                  }
                }
                });
                  wx.getLocation({
                  type: 'wgs84',
                  success: function (res) {
                   
                  let latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                  let longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                 
                  vm.getRegionurl(longitude,latitude);
                  
                    return;
                  },  
                  cancel: function (res) {
                      console.log('用户取消')
                  }
                });
                  wx.error(function(res){
                      alert("获取位置失败")
                  });

                })
              },
          getRegionurl(longitude,latitude){
          
              vm.receiveData.getData(vm,'/getRegionUrl?coordinate='+longitude+','+latitude,'res',function(){
                if(vm.res.success){
                vm.value2=vm.res.result.address;
                vm.citys=vm.res.result.regionUrl;
                }else{
                  alert("获取数据失败")
                }
              })
          }
             
          }



        }

</script>
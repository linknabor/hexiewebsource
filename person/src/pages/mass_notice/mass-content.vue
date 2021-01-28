<template>
  <div class="notice">
    <div class="formbox">
      <div class="title">通知群发推送</div>
      <ul class="content">
        <li>
              <div class="omit">
                小区名称:&nbsp;&nbsp;{{sect_addr}}
              </div>
        </li>
        <li>
          <div class="choose">
              <span class="mr15">推送方式:</span>
              <label for="means1" class="radio">
                <i :class="{'borerspot' : means == 0,'circle' : means == 0}"></i>
                <input  type="radio" name="message" value="0" v-model="means" id="means1"/>
                &nbsp;公众号
              </label>
            
              <label for="means2" class="radio">
                <i :class="{'borerspot' : means == 1,'circle' : means == 1}"></i>
                <input  type="radio" name="message" value="1" v-model="means" id="means2"/>
                &nbsp;短信
                </label>

              <label for="means3" class="radio">
                <i :class="{'borerspot' : means == 2,'circle' : means == 2}"></i>
                <input type="radio" name="message" value="2" v-model="means" id="means3"/>
                &nbsp;全部
              </label>
          </div>      
        </li>
        <!-- <li>
            <div class="choose">
              <span class="mr15">发送范围:</span>
              <label for="range1" class="radio">
                <i :class="{'borerspot' : range == 0,'circle' : range == 0}"></i>
                <input type="radio" name="range" value="0" v-model="range" id="range1"/>
                &nbsp;指定范围
              </label>

              <label for="range2" class="radio">
                <i :class="{'borerspot' : range == 1,'circle' : range == 1}"></i>
                <input type="radio" name="range" value="1" v-model="range" id="range2"/>
                &nbsp;全部
              </label>
            </div>
        </li>
        <li>
          <span>地址:</span>
        </li> -->
        <li>请输入推送内容:</li>
        <li>
          <textarea
            class="reply_content"
            cols="30"
            rows="5"
            v_empty="0"
            v_min="1"
            v_max="120"
            v-model="content"
          ></textarea>
        </li>
        <li>
          <div class="avatar">
            <div class="imgtext">
                <span>上传照片</span>
            </div> 
            <div>
               <img :src="avatar" @click="setAvatar">
               <input type="file" name="avatar" accept="image/gif,image/jpeg,image/jpg,image/png" style="display:none;" @change="changeImage($event)" ref="avatarInput">
            </div>
          </div>  
          <div style="height:1.3rem"></div>
          <div class="btn-fixed">
            <div class="btn" @click="submit">确定</div>
          </div>
        </li>
      </ul>
    </div>
    <div class="gbcolor" v-show="flay">
            <div id="phoneAjax">
                <img
                    src="../../assets/images/common/c3d7f369-4a5e-4c4a-9fb9-a4b9d274c7e1.gif"
                    style="width:40px;height40px;vertical-align: middle;"
                /> 
            </div>
    </div>
  </div>
</template>

<script>
let vm;
export default {
  data() {
    return {
        flay:false,//判断遮罩
        means:'0',//方式 0公众号，1短信，2全部
        range:'0',//发送范围 0全部，1指定范围
        content:'',//内容
        image:'',//上传图片
        avatar: require('../../assets/images/community/bg.png'),
        sect_id : this.$route.query.sect_id,//小区id
        sect_addr : this.$route.query.sect_addr,//小区地址
    };
  },
  created() {
      vm = this;
  },
  components: {},
  computed: {},
  mounted() {},
  methods: {
    //点击图片会触发setAvatar函数，该函数会触发input的click事件
    setAvatar() {
      this.$refs.avatarInput.click()
    },
    //弹出文件选择框，当我们选择了一张图片后，触发chageImage函数,预览你上传的图片
    changeImage(e) {
      var file = e.target.files[0];
      // console.log(file);
      var reader = new FileReader();
      // console.log(reader);
      var that = this;
      reader.readAsDataURL(file);
      reader.onload = function(e) {
        that.avatar = this.result;//返回的base64
        vm.image = this.result;
      }
    },
    //确定
    submit() {
      // console.log(vm.means,vm.range,vm.content,vm.image);
      vm.flay = true;//展示遮住
      let url = '/hexiemessage';
      let data = {
          type:vm.means,
          range:vm.range,
          content:vm.content,
          imgUrls:vm.image,
          sect_id:vm.sect_id
      };
      vm.receiveData.postData(vm,url,data,'res',function(){
          if(vm.res.success) {
            vm.flay = false;//取消遮住
          }else {
            alert(vm.res.message);
          }
      });
    }
  },
};
</script>

<style scoped>
.notice {
    position:absolute;
    top:0;
    left:0;
    right:0;
    bottom:0;
    background-color:#EEEEEE;
    overflow: auto;
    padding:0.25rem 0.3rem;
}
.formbox {
    background-color: #fff;
    border-radius: 0.2rem;
    height: 100%;
    position:relative;
}
.content {
    /* padding: 0.4rem 0.3rem 0 0.3rem; */
    padding-top:0.4rem;
    font-size: 0.3rem;
}
.title {
    height: 1rem;
    line-height: 1rem;
    text-align: center;
    font-size: 0.34rem;
    color: #fff;
    font-weight: 700;
    letter-spacing: 0.02rem;
    background-color:#f69c05;
    border-top-left-radius: 0.2rem;
    border-top-right-radius:0.2rem;
}
.mr15 {
    margin-right:0.5rem;
}
ul li {
    margin-bottom: 0.22rem;
    padding-left: 0.3rem;
    padding-right: 0.3rem;
    background-color: #fff;
}

.reply_content {
    margin-left:1px;
    width:97%;
    border:1px solid #f69c05;
    background-color:#fff;
    border-radius: 0.03rem;
}

/* ------------ */
.choose {
    position: relative;
}
 
.choose .radio {
    position: relative;
    display: inline-block;
    font-weight: 400;
    color: #0c4757;
    padding-left: 0.38rem;
    padding-right: 0.15rem;
    cursor: pointer;
}
 
.choose .radio input {
    position: absolute;
    left: -9999px;
}
 
.choose .radio i {
    display: block;
    position: absolute;
    top: -3px;
    left: 0;
    width: 18px;
    height: 18px;
    outline: 0;
    border: 1px solid rgb(134, 133, 133);
    background: #ffffff;
    border-radius: 50%;
    transition: border-color .3s;
    -webkit-transition: border-color .3s;
}
 
.choose .radio i:after {
    position: absolute;
    content: '';
    top: 4px;
    left: 4px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #0077FE;
    opacity: 0;
    transition: opacity .1s;
    -webkit-transition: opacity .1s;
}
 
.choose .radio .circle {
    border:1px solid #0077FE;
}

.choose .radio .borerspot:after {
    opacity: 1;
}

.avatar .imgtext {
  margin-top:15px;
  width:100%;
  margin-bottom: 0.3rem;
  font-size: 14px;
  color: #666
}
.avatar img {
  width:1.8rem;
}
.btn-fixed {
  position: fixed;
  left:0.6rem;
  right:0.6rem;
  bottom:0.5rem;
}
.btn {
  display: block;
  height: 0.8rem;
  line-height: 0.8rem;
  color: #fff!important;
  font-size: 0.34rem;
  text-align: center;
  background-color: #ff8a00;
  border-radius: 0.2rem;
}

.gbcolor {
    position:fixed;
    top:0;
    left:0;
    right: 0;
    bottom:0;
    background-color:rgba(0, 0, 0, 0.4);
}

#phoneAjax {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 60px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    background-color: black;
    -moz-opacity: 0.8;
    opacity: 0.8;
    filter: alpha(opacity=80);
    z-index: 1998;
    overflow: auto;
    -moz-border-radius: 15px;
    -webkit-border-radius: 15px;
}
.omit {
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
}
</style>

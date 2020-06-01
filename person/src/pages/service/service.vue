<template>
  <div>
    <ul class="content" v-for="(item,index) in service_list" :key="index">
      <li>
        <span>项目: {{item.sect_name}}</span>
      </li>
      <li>
        <span>服务内容: {{item.service_type_cn}}</span>
      </li>
      <li>
        <span class="fl border" @click="ViewQRcode(item.qrcode_id,item.sect_name,item.service_type_cn)">查看二维码</span>
        <span
          class="fr border1"
          @click="SigninOut(index,item.cfg_id,item.sect_id,item.signin_flag)"
        >{{item.signin_flag == '1'?'下线':'上线'}}</span>
      </li>
    </ul>

    <div class="v-modal" v-show="Mask == 1"  @click="cancel()"></div>
    <div style="position: absolute; z-index: 2003;" v-show="Mask == 1">
      <div class="mint-msgbox">
        <div class="mint-msgbox-header">
            <div class="mint-msgbox-title">提示</div>
        </div>
        <div class="mint-msgbox-content">
            <div class="mint-msgbox-message">{{text}}</div>
        </div>
        <div class="mint-msgbox-btns">
          <div class="mint-msgbox-btn mint-msgbox-cancel "  @click="cancel()">取消</div>
          <div class="mint-msgbox-btn mint-msgbox-confirm " @click="Determine()">确定</div>
        </div>
      </div>  
    </div>
  </div>
  
</template>

<script>
let vm;
export default {
  data() {
    return {
      service_list: [
        // {
          //   cfg_id: "200525100541722277",
          //   oper_type: "03",
          //   qrcode_id: "10",
          //   sect_id: "200514100541704675",
          //   sect_name: "合协社区",
          //   service_type_cn: "管理服务费",
          //   sginin_flag: "1"
        // },
      ],
      flay:true,
      Mask:0,
      text:'',
      index:'',
      cfg_id:'',
      sect_id:'',
      signin_flag:''
      // openid: "o_3Dlwdy4btrm8kiyWHkmvyQO_ls",
    };
  },
  created() {
    vm = this;
  },
  mounted() {
    vm.qrCodeService();
  },

  components: {},

  methods: {
    qrCodeService(){
      if(window.localStorage.getItem('service_list')){
        vm.service_list = JSON.parse(window.localStorage.getItem('service_list'));
      }else {
        vm.receiveData.getData(vm, "/qrCodePayService", "res", function() {
          if (vm.res.success) {
              vm.service_list = vm.res.result.service_list;
              vm.common.localSet('service_list',JSON.stringify(vm.res.result.service_list));
          } else {
            alert(vm.res.message);
          }
        }); 
      }
     
    },
    //查看二维码
    ViewQRcode(qrcode_id,sect_name,service_type_cn) {
      vm.$router.push({ path: "/codeimg",query:{'qrcode_id':qrcode_id,'sect_name':sect_name,'service_type_cn':service_type_cn} });
    },
    //上线 下线
    SigninOut(index, cfg_id, sect_id, signin_flag) {
        if(vm.flay) {
          vm.Mask = 1;//显示遮罩
        }else {
          vm.Mask = 0;//隐藏遮罩  
        }
        vm.index = index; 
        vm.cfg_id = cfg_id;
        vm.sect_id = sect_id;
        vm.signin_flag = signin_flag;
        if(vm.signin_flag == '1') {
            vm.text = '是否下线';
        }else {
            vm.text = '是否上线';   
        }
    },
    Determine() {//确定
      if(vm.flay) {
        vm.flay = false;
        let sigin_in;
        let index = vm.index;
        if(vm.signin_flag == '1') {
            sigin_in = '0';
        }else {
            sigin_in = '1';   
        }
        let data = {
          // openid: vm.openid,
          cfg_id: vm.cfg_id,
          sect_id: vm.sect_id,
          sign_in: sigin_in
        };
        if(vm.signin_flag == '1'){//上线状态
            vm.receiveData.postData(vm, "/signInOut", data, "res", function() {
                if (vm.res.success) {
                  vm.flay = true;
                  vm.Mask = 0;//隐藏遮罩
                  vm.$set(vm.service_list[index],'signin_flag','0');
                  vm.common.localSet('service_list',JSON.stringify(vm.service_list));
                } else {
                  vm.flay = true;
                  vm.Mask = 0;//隐藏遮罩
                  alert(vm.res.message);
                }
            })
        }else {//0 下线状态
            vm.receiveData.postData(vm, "/signInOut", data, "res", function() {
                if (vm.res.success) {
                  vm.flay = true;
                  vm.Mask = 0;//隐藏遮罩
                  vm.$set(vm.service_list[index],'signin_flag','1');
                  vm.common.localSet('service_list',JSON.stringify(vm.service_list));
                } else {
                  vm.flay = true;
                  vm.Mask = 0;//隐藏遮罩
                  alert(vm.res.message);
                }
              }) 
       };
      }
    },
    cancel() { //取消
       vm.flay = true; 
       vm.Mask = 0;//隐藏遮罩
    }
  },
  computed: {}
};
</script>

<style  scoped>
.content {
  padding: 0.3rem;
  overflow: hidden;
  text-align: left;
  border-bottom: 2px solid #e8e8e8;
  font-size: 0.3rem;
}
li {
  margin-bottom: 0.2rem;
}
li:last-child {
  margin-bottom: 0;
}
.border,.border1 {
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color:#fff;
  color:#ff8a00;
  padding: 0.1rem;
}
.border1 {
  padding: 0.1rem 0.4rem 0.1rem;
}
/* 弹出框 */
.v-modal {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0.5;
    background: #000;
}
.mint-msgbox {
    position: fixed;
    top: 50%;
    left: 50%;
    -webkit-transform: translate3d(-50%, -50%, 0);
    transform: translate3d(-50%, -50%, 0);
    background-color: #fff;
    width: 85%;
    border-radius: 3px;
    font-size: 16px;
    -webkit-user-select: none;
    overflow: hidden;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    -webkit-transition: .2s;
    transition: .2s;
}
.mint-msgbox-header {
    padding: 15px 0 0;
}
.mint-msgbox-title {
    text-align: center;
    padding-left: 0;
    margin-bottom: 0;
    font-size: 16px;
    font-weight: 700;
    color: #333;
}
.mint-msgbox-content {
    padding: 10px 20px 15px;
    border-bottom: 1px solid #ddd;
    min-height: 36px;
    position: relative;
}
.mint-msgbox-message {
    color: #999;
    margin: 0;
    text-align: center;
    line-height: 36px;
}
.mint-msgbox-btns {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    height: 40px;
    line-height: 40px;
    text-align: center;
}
.mint-msgbox-btns .mint-msgbox-cancel {
    width: 50%;
    border-right: 1px solid #ddd;
}
.mint-msgbox-btn {
    line-height: 35px;
    display: block;
    background-color: #fff;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    margin: 0;
    border: 0;
}
.mint-msgbox-confirm {
    color: #26a2ff;
    width: 50%;
}
.mint-msgbox-btn {
    line-height: 35px;
    display: block;
    background-color: #fff;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    margin: 0;
    border: 0;
}
</style>
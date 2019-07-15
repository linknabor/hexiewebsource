<template>
   <div class="bind">
       <div class="divider"></div>
       <div class="input-wrap lite-divider">
            <span class="fl fs15">微信名</span>
            <span class="fr fs14 value" > {{user.nickname}}</span>
        </div>

         <div class="input-wrap lite-divider">
            <span class="fl fs15">用户名</span>
            <input placeholder="请输入用户名" class="fr fs14 hidden-input" v-model="user.name"/>
        </div>

        <div class="input-wrap lite-divider">
            <span class="fl fs15">姓名</span>
            <input placeholder="请输入真实姓名" class="fr fs14 hidden-input" v-model="user.realName"/>
        </div>

         <div class="input-wrap lite-divider">
            <span class="fl fs15">性别</span>
            <span class="fr fs14 value placeholder" v-if="xin" @click="showModal">请选择性别</span>
            <span class="fr fs14 value" style="width:40px" v-if="user.sex!=''" @click="showModal" >{{sex}}</span>
        </div>

         <div class="modal-mask" v-if="modalShown" @click="hideModal">
            <div class="modal">
                <div class="ptb15 lite-divider fs14" v-for="(item,i) in genderPicker" :class="{checkedItem:item.checked}" @click="selectGender(i)">{{item.name}}</div>
            </div>
         </div>

         <div class="input-wrap lite-divider">
	 		<span class="fl fs15">手机号</span>
            <input placeholder="输入11位手机号" maxlength="11" class="fr fs14 hidden-input" v-model="user.tel"/>
        </div>

        <div class="input-wrap lite-divider" v-show="oriPhone!=user.tel">
            <input placeholder="输入验证码" class="fs14 hidden-input" v-model="captcha"/>
            <span class="fr btn-plain fs14"  :class="{useless:yzmstr!='获取验证码'&&yzmstr!='重新获取'}" @click="getCaptcha">{{yzmstr}}</span>
        </div>

        <div class="btn-fixed">
		   <div class="submit-btn ov fs16" @click="save" >保存</div>
	    </div>
   </div>
</template>

<script>
let vm;
export default {
   data () {
       return {
            oriPhone:'',
            yzmtime : 60,
            yzmstr:"获取验证码",
            captcha: '',
            user:{},
            sex:'',
            xin:true,
            genderPicker: [
                {
                    name: '男',
                    sex: 1,
                    checked:false
                },
                {
                    name: '女',
                        sex: 2,
                        checked:false
                    }
                ],
                modalShown:false,
       };
   },
   created() {
       vm=this;
   },
   mounted() {
       this.getUserInfo();
   },

   components: {},

   methods: {
       getUserInfo() {
            var n = "GET",
            a = "userInfo",
            i = null,
            e = function(n) {
                vm.user = n.result;
                vm.oriPhone = vm.user.tel;
            },
            r = function() {};
            vm.common.invokeApi(n, a, i, null, e, r)
        },
        //点击选择性别
        showModal() {
            vm.modalShown=true;
            for(var i =0; i<vm.genderPicker.length;i++) {
                vm.genderPicker[i].checked=false;
            }
        },
        //点击模态框
        hideModal(e) {
            if('modal-mask' ===e.target.className){
                 vm.modalShown=false;
                  vm.getGender() 
            }

        },
        selectGender(index) {
            for(var i =0; i<vm.genderPicker.length;i++) {
                vm.genderPicker[i].checked=false;
            }
            vm.genderPicker[index].checked=true;
            vm.user.sex=vm.genderPicker[index].sex;
            vm.getGender(vm.user.sex) 
            vm.modalShown=false;
             vm.xin=false;
        },
        getGender(sex) {
            if(sex==2){
			   	vm.sex='女'
			} else if(sex==1){
				vm.sex='男';
			} else {
                vm.sex='未知';
                vm.xin=false;
			}
        },
        getCaptcha() {
            var reg = /^0?1[3|4|5|8][0-9]\d{8}$/;
	       	if (!reg.test(vm.user.tel)) {
	       	     alert("请输入正确的手机号");
	       	     return;
               };
               if(vm.yzmstr=="获取验证码"||vm.yzmstr=="重新获取"){
	       		vm.yzmreq();
	       	}
        },
        yzmreq() {
             vm.receiveData.postData(vm,'/getyzm',{mobile:vm.user.tel},'n',function(){
                vm.yzmtime = 60;
        	   var tt=setInterval(function(){
                    vm.yzmstr=vm.yzmtime+"秒后重新获取";
                        vm.yzmtime--;
                        console.log(vm.yzmtime)
                        if(vm.yzmtime<=0){
                            vm.yzmstr="重新获取";
                        }
                    },1000);
               var ss = setTimeout(function(){clearInterval(tt);}, 61*1000);
                if(!vm.res.success) {
                    alert("验证码已下发，请查收短信");
                    vm.yzmtime = 60;
                    vm.yzmstr="重新获取";
                }
                   })
        },
        save() {
            if(vm.user.name=="" || vm.user.realName=="" || vm.user.tel=="") {
                alert('请完善个人信息')
                return;
            }
            if(vm.oriPhone!= vm.user.tel && vm.captcha == '') {
                alert('请输入验证码')
                return
            }
            vm.saveInfo();
        },
        saveInfo() {
            if(vm.user.tel == vm.oriPhone) {
                vm.captcha='00000'
            }
            if(vm.captcha!='' && vm.user.tel!='' ) {
                var order={
                    name:vm.user.name,
                    realName:vm.user.realName,
                    tel:vm.user.tel,
                    sex:vm.user.sex
                }
                 vm.receiveData.postData(vm,'/savePersonInfo/'+vm.captcha,order,'n',function(){
                     if(vm.n.success) {
                         var add=vm.n.result;
                        vm.common.updateUserStatus(add);
                        vm.$router.push({path:'/'})
                     }else {
                        alert(n.message==''?"验证码校验失败！":n.message);
                     }
                   })
            }else {
                alert("请完善输入信息");
            }
        },
        
   },

   computed: {},
}
</script>

<style  scoped>
.bind {
    position:absolute;
    left: 0;
    right: 0;
    top:0;
    bottom:0;
    background-color:#fff;
}
.divider {
    border-bottom: 10px solid #f7f7f2;
}
.input-wrap {
    overflow: hidden;
    line-height: 45px;
    padding-left: 10px;
    padding-right: 10px;
}
.section-title, .lite-divider {
    border-bottom: 1px solid #d4cfc8;
    /* padding-left: 15px; */
}
.fs15 {
    font-size: 15px;
}
.fs14 {
    font-size: 14px;
}
.hidden-input {
    margin: 15px 0;
    text-align: right;
}
input {
    border:none;
    outline: none
}
.modal-mask {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.5);
}
.modal {
    background: #fff;
    border-radius: 5px;
    margin: 200px auto;
    padding: 10px 15px;
    width: 60%;
}
.ptb15 {
    padding: 15px 0;
}
.checkedItem {
    /*  */
    background: url(../assets/images/person/icon_selected.png) no-repeat;
    background-position: right center;
    background-size: 16px;
}
.fs14 {
    font-size: 14px;
}
.btn-plain {
    display: inline-block;
    padding: 0 20px;
    height: 27px;
    line-height: 27px;
    color: #3b3937;
    border-radius: 3px;
    border: 1px solid #bfbfbf;
    margin-top: 10px;
}
.btn-fixed {
    position: fixed;
    color: #fff;
    left: 3%;
    right: 3%;
    bottom: 10px;
}
.submit-btn {
    height: 44px;
    line-height: 44px;
    background: #ff8a00;
    text-align: center;
}
.fs16 {
    font-size: 16px;
}
.ov {
    overflow: hidden;
    padding: 1px;
}
.useless {
	  background-color: #D7D5D4;
	}
</style>
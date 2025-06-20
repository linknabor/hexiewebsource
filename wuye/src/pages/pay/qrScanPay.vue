<template>
  <div>
    <van-overlay :show="showOverlay" class="sect-laoding">
      <van-loading type="spinner" />
    </van-overlay>
    <user-info @getUserInfo="getUserInfo"></user-info>
  </div>
</template>

<script>
import { Overlay, Dialog, Loading } from "vant"
import BaseInfoApi from '@/api/BaseInfoApi.js'
import UserInfo from "../../components/UserInfo.vue"

export default {
  data() {
    return {
      userInfo: {},
      showOverlay: true,
      oriApp: '',
      sectId: '',
      sectName: '',
      province: '',
      clientType: '0'
    }
  },
  components: {
    "user-info": UserInfo,
    [Overlay.name]: Overlay,
    [Loading.name]: Loading,
  },
  mounted() {
    //初始化参数
    const oriApp = this.getUrlParam("oriApp")
    const sectId = this.getUrlParam("sectId")
    this.oriApp = oriApp
    this.sectId = sectId
  },
  watch: {
    userInfo: {
      handler(newVal) {
        console.log('watch')
        if (newVal && newVal.id) {
          this.getSect()
        }
      }
    }
  },
  methods: {
    getUserInfo(result) {
      this.userInfo = result;
    },
    getSect() {
      if (!this.sectId) {
        Dialog({
          message: '未获取到项目信息！'
        })
        return false
      }
      BaseInfoApi.mySect(this.sectId, this.clientType).then(response => {
        const data = response.data
        if (data.success) {
          this.province = data.result.province_name
          this.sectId = data.result.sect_id
          this.sectName = data.result.sect_name
          this.checkSect()
        } else {
          Dialog({ message: data.message })
          this.province = '上海市'
        }
      }).catch(err => {
        Dialog({ message: err })
        this.province = '上海市'
      })
    },
    checkSect() {
      this.$router.push({
        path: "/Pay",
        query: { selected: "d", userunit: this.sectName, queryID: this.sectId, City: this.province }
      })
    },

  }
}
</script>

<style lang="less" scoped>
.sect-laoding {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

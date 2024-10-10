<template>
  <div>
    <div style="width: 100%; height: 2vh"></div>
    <van-search
      v-model="sectName"
      shape="round"
      placeholder="请输入所在小区名称"
      @click-input="clickSearch"
      @focus="clickSearch"
    >
      <template slot="left">
        <div @click="clickProvince">{{ province | ellipsis}}<span style="margin-left: 0.2rem"></span
          ><van-icon name="arrow-down" /><span style="margin-left: 0.2rem"></span></div>
      </template>
    </van-search>
    <van-cell-group title="当前定位">
      <van-cell :to="{name: 'Pay', query: {selected: 'd'}}">
        <template slot="title" >
          <van-icon name="location-o" />{{ currAddrName }}
        </template>
        <template>
          <div style="color: var(--primary-color);">重新定位</div>
        </template>
      </van-cell>
    </van-cell-group>
    <div style="width: 100%; height: 2vh; background-color: rgb(238, 238, 238);"></div>
    <van-cell-group title="附近小区">
        <van-cell v-for="(item, index) in sectList" :title="item.sect_name" :value="item.distance" :label="item.sect_address" :key="index" @click="checkSect(item)" />
    </van-cell-group>
  </div>
</template>

<script>
import wx from "weixin-js-sdk";
import { Search, Icon, Dialog, Cell, CellGroup } from "vant"
import UserApi from '@/api/api.js'
import LocationApi from '@/api/LocationApi.js'

export default {
  data() {
    return {
      sectList: [], //小区列表
      sectName: '',
      province: '',
      provinceAbbr: '',
      currAddr: '',
      currAddrName: '',
      jsApiList: ["getLocation"],
      coordinate: '',
    };
  },
  components: {
    [Search.name]: Search,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
  },
  mounted () {
    // below for local debug
    // const longitude = '121.812406'
    // const latitude = '31.484573'
    // let coordinate = longitude + ',' + latitude
    // this.getLocation(coordinate)
    this.initWxConfig()
  },
  filters: {
    ellipsis (value) {
        if (!value) return ''
        if (value.length > 5) {
            return value.slice(0,5) + '...'
        }
        return value
    }
  },
  methods: {
    initWxConfig() {
      let currPageUrl = location.href.split("#")[0];
      const that = this
      UserApi.getUrlJsSign({ url: currPageUrl }).then((response) => {
          let n = response.data;
          let success = n.success;
          if (!success) {
            return false;
          }
          let result = n.result; //接口返回的嵌入数据
          let jsApiList = this.jsApiList;
          wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: result.appId, // 必填，公众号的唯一标识
            timestamp: result.timestamp, // 必填，生成签名的时间戳
            nonceStr: result.nonceStr, // 必填，生成签名的随机串
            signature: result.signature, // 必填，签名，见附录1
            jsApiList, // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            openTagList: [],
          });
          wx.ready(() => {
            console.log("begin exec wx.ready.");
            wx.checkJsApi({
              jsApiList,
              success: function (res) {
                console.log(res);
                if (!res.checkResult.getLocation) {
                  Dialog.alert({
                    message: "您的微信版本太低，请升级到最新的微信版本！",
                  }).then(() => {
                    return false;
                  });
                } else {
                  wx.getLocation({
                    type: "wgs84",
                    success: function (res) {
                      console.log(res)
                      const latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                      const longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                      let coordinate = longitude + "," + latitude
                      that.getLocation(coordinate)
                      that.coordinate = coordinate
                      return;
                    },
                    fail: function (res) {
                      console.log(res);
                    },
                    cancel: function (res) {
                      console.log(res);
                      console.log("用户取消");
                    },
                  });
                }
              },
            });
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getLocation(coordinate) {
      const appid = this.getUrlParam('oriApp')
        const param = {
          coordinate,
          appid
        }
        const defaultPro = '上海市'
        const defaultProAbbr = '上海'
        LocationApi.getLocation(param).then(response => {
            const data = response.data
            if(data.success) {
                this.province = data.result.province
                this.provinceAbbr = data.result.provinceAbbr
                this.sectList = data.result.sectList
                this.currAddr = data.result.currentAddr
                this.currAddrName = data.result.currentName
            } else {
                Dialog({message: data.message})
                this.province = defaultPro
                this.provinceAbbr = defaultProAbbr
            }
        }).catch(err => {
            Dialog({message: data.message})
            this.province = defaultPro
            this.provinceAbbr = defaultProAbbr
        })
    },
    checkSect(obj) {
      this.$router.push({
        path: "/Pay",
        query: { selected: "d", userunit: obj.sect_name, queryID: obj.sect_id, City: this.province }
      })
    },
    clickSearch() {
      this.$router.push({ path: "/fontUnit" })
    },
    clickProvince() {
      this.$router.push({ path: "/location", query: {from: '1', coordinate: this.coordinate} })
    }
  }
};
</script>

<style lang="less" scoped>
.van-search__content {
  background-color: #dcdcdc;
}

div /deep/ input.van-field__control::placeholder {
  color: #808080;
}
</style>

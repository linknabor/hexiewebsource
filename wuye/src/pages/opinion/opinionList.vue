<template>
  <div>
    <van-empty v-show="showEmpty" description="您还没有提过意见"/>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <div v-show="show" class="main">

        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :error.sync="loadError">
          <div class="p15" v-for="interact in interacts">
            <div class="ov">
              <div><img class="fl thread-picture" :src="interact.user_head"/></div>
              <div class="thread_user_name">
                <van-cell style="padding: 0" :title="interact.user_name" :label="interact.sect_name"/>
              </div>
            </div>
            <div class="pt15" @click="gotoDetail(interact.interact_id)">
              {{ interact.ex_content }}
            </div>

            <div class="pictures">
              <img v-for="(previewurl) in interact.thumbnailLink"
                   @click="viewSrcImg(interact.imgUrlLink);" :src="previewurl"/>
            </div>

            <div class="threadDate">
              <van-icon name="underway-o" size="14px" style="position: relative;top: 2px"/>
              &nbsp;{{ interact.formattedDateTime }}
              <div class="threadCount" style="text-align: right;" @click="gotoDetail(interact.interact_id)">
                <van-icon name="other-pay" size="14px"
                          style="position: relative;top: 2px"/>&nbsp;{{ interact.comments_count }}
              </div>
            </div>
          </div>
        </van-list>
      </div>
    </van-pull-refresh>
    <div class="pull-btn">
      <van-icon slot="right-icon" name="add" size="50px" @click="goPullOpinion"/>
    </div>
  </div>
</template>

<script>
  import opinionApi from "@/api/OpinionApi.js";
  import {List, PullRefresh, Uploader, ImagePreview, Empty, Dialog, Button, Cell, Icon} from 'vant';
  import Storage from '../../assets/js/storage.js';

  export default {
    name: "opinionList",
    data() {
      return {
        interacts: [],//评论数据
        page: 1, //页数
        loading: false,
        finished: false,
        refreshing: false,
        loadError: false,
        show: true,
        showEmpty: false,
        userInfo: {},
        zflag: true,
      }
    },
    components: {
      [List.name]: List,
      [PullRefresh.name]: PullRefresh,
      [Uploader.name]: Uploader,
      [ImagePreview.Component.name]: ImagePreview.Component,
      [Empty.name]: Empty,
      [Button.name]: Button,
      [Cell.name]: Cell,
      [Icon.name]: Icon,
    },
    mounted() {
      let userInfo = Storage.get('userInfo')
      var sectId = userInfo.sectId
      if (sectId === '0' || sectId == null || sectId === 'null') {
        Dialog.alert({
          message: '未绑定房屋',
        }).then(() => {
          this.$router.go(-1);
        });
      }

      if (userInfo) {
        this.userInfo = userInfo
        let wdappids = this.is_config.C('wdappids')
        if (wdappids.indexOf(userInfo.appId) > -1) {
          const secondaryColor = getComputedStyle(document.documentElement).getPropertyValue('--secondary-color');
          document.documentElement.style.setProperty('--primary-color', secondaryColor);
          const secondarySelIcon = getComputedStyle(document.documentElement).getPropertyValue('--secondary-icon-selected');
          document.documentElement.style.setProperty('--primary-icon-selected', secondarySelIcon);
        } else {
          const originColor = getComputedStyle(document.documentElement).getPropertyValue('--origin-color');
          document.documentElement.style.setProperty('--primary-color', originColor);
          const originSelIcon = getComputedStyle(document.documentElement).getPropertyValue('--origin-icon-selected');
          document.documentElement.style.setProperty('--primary-icon-selected', originSelIcon);
        }
      }
    },

    methods: {
      onLoad() {
        setTimeout(() => {
          this.getInteractList()
        }, 1000);
      },

      getInteractList() {
        let param = {
          exGroup: '1,2', //投诉、建议
          curr_page: this.page,
        }
        opinionApi.getInteractList(param).then((response) => {
          this.loading = false
          this.refreshing = false
          let data = response.data
          if (data && data.success) {
            if (data.result.length > 0) {
              this.interacts = this.interacts.concat(data.result);
              this.page++
            } else {
              this.finished = true
            }
          } else {
            this.loadError = true
          }

          if (this.interacts.length === 0) {
            this.show = false
            this.showEmpty = true
          }
        }).catch((error) => {
          this.finished = true
        });
      },
      onRefresh() {
        this.finished = false;
        // 重新加载数据
        // 将 loading 设置为 true，表示处于加载状态
        this.loading = true;
        this.onLoad();
      },

      gotoDetail(interactId) {
        this.$router.push({path: '/opinionDetail', query: {'interactId': interactId}})
      },

      viewSrcImg(imgs) {
        ImagePreview(imgs)
      },

      goPullOpinion() {
        this.$router.push({path: '/addOpinion'})
      }
    }

  }
</script>

<style scoped>
  .main {
    width: 100%;
    min-height: 100vh;
    height: auto;
    overflow: hidden;
  }

  .pictures {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
    grid-auto-rows: 90px;
    grid-gap: 5px;
    margin-left: 50px;
  }

  .pictures img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 5px;
  }

  .thread-picture {
    width: 42px;
    height: 42px;
    margin-right: 10px;
    border-radius: 10px;
  }

  .thread_user_name {
    float: left;
    font-weight: bold;
  }

  .ov {
    overflow: hidden;
    padding: 1px;
  }

  .p15 {
    padding: 15px;
    font-size: 13px;
    border-bottom: 1px solid #EBEDF0;
  }

  .pt15 {
    padding: 5px 5px 10px 50px;
    word-wrap: break-word;
    overflow: hidden;
    font-size: 13px;
    height: auto;
    min-height: 20px;
    line-height: 20px;
  }

  .threadDate {
    font-size: 12px;
    color: #a6937c;
    width: 100%;
    padding-left: 50px;
    margin-top: 10px;
  }

  .threadCount {
    float: right;
    padding-right: 60px;
  }

  .pull-btn {
    position: fixed;
    color: var(--primary-color);
    top: 75vh;
    left: 80%;
  }
</style>

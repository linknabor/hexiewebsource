<template>
  <div id="words">
    <van-empty v-show="showEmpty" description="您还没有提过意见"/>
    <div v-show="show">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">

        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :error.sync="loadError">
          <div class="p15" v-for="thread in threads">
            <div class="ov" style="width: 100%;">
              <div><img class="fl thread-picture" :src="thread.userHead"/></div>
              <div class="thread_user_name">{{ thread.userName }}</div>
              <div class="thread_user_addr">{{ thread.userSectName }}</div>
            </div>
            <div class="ov pt15" @click="gotoDetail(thread.threadId)">{{ thread.threadContent }}</div>

            <div class="preview_img_layer">
              <div v-for="(previewurl,index) in thread.previewLink">
                <div class="sub_img_layer" @click="viewSrcImg(thread.imgUrlLink);">
                  <img class="preview_img" :src="previewurl"/>
                </div>
              </div>
            </div>

            <div class="threadDate">
              <img class="timeImg"
                   src="../../assets/images/common/icon_time_gray.png"/>&nbsp;{{ thread.formattedDateTime }}
              <div class="threadCount" style="text-align: right;" @click="gotoDetail(thread.threadId)">
                <img class="timeImg"
                     src="../../assets/images/common/icon_comment_gray.png"/>&nbsp;{{ thread.commentsCount }}
              </div>
            </div>

          </div>
        </van-list>
      </van-pull-refresh>
    </div>
    <div style="position: fixed; bottom:0.5px; width: 100%; color: white;">
      <div class="submit-btn-black" @click="gotoBack" style="width: 25%">返回</div>
      <div class="submit-btn-orange" @click="newOpinion" style="width: 73%">我要发布</div>
    </div>


  </div>
</template>

<script>
  import opinionApi from "@/api/OpinionApi.js";
  import {List, PullRefresh, Uploader, ImagePreview, Empty, Dialog } from 'vant';
  // import cookie  from 'js-cookie';

  export default {
    name: "opinionList",
    data() {
      return {
        threads: [],//评论数据
        page: 0, //页数
        loading: false,
        finished: false,
        refreshing: false,
        loadError: false,
        show: true,
        showEmpty:false,
      }
    },
    components: {
      [List.name]: List,
      [PullRefresh.name]: PullRefresh,
      [Uploader.name]: Uploader,
      [ImagePreview.Component.name]: ImagePreview.Component,
      [Empty.name]: Empty,
      [Dialog.name]: Dialog,
    },
    mounted() {
      var sectId = cookie.get('sectId');
      if(sectId == '0' || sectId == null || sectId == 'null') {
        Dialog({ message: '未绑定房屋' });
        this.$router.push({path: '/Version2'})
      }
    },

    methods: {
      onLoad() {
        setTimeout(() => {
          this.getThreadList()
        }, 1000);
      },

      getThreadList() {
        let param = {
          threadCategory: '9'
        }
        opinionApi.getThreadList('n', this.page, param).then((response) => {
          this.loading = false
          this.refreshing = false
          let data = response.data
          if (data && data.success) {
            if (data.result.length > 0) {
              this.threads = this.threads.concat(data.result);
              this.page++
            } else {
              this.finished = true
            }
          } else {
            this.loadError = true
          }

          if (this.threads.length == 0) {
            this.show = false
            this.showEmpty = true
          }
        })
      },
      onRefresh() {
        this.finished = false;

        // 重新加载数据
        // 将 loading 设置为 true，表示处于加载状态
        this.loading = true;
        this.onLoad();
      },

      gotoDetail(threadId) {
        this.$router.push({path: '/opinionDetail', query: {'threadId': threadId}})
      },

      newOpinion() {
        this.$router.push({path: '/addOpinion'})
      },

      gotoBack() {
        this.$router.push({path: '/'})
      },

      viewSrcImg(imgs) {
        ImagePreview(imgs)
      }
    }

  }
</script>

<style scoped>
  #words {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    overflow: auto;
  }

  .thread-picture {
    width: 42px;
    height: 42px;
    margin-right: 15px;
    border: 1px solid #d4cfc8;
    border-radius: 42px;
  }

  .thread_user_name {
    font-size: 14px;
    margin-top: 10.5px;
    color: #3b3937;
    height: 21px;
    line-height: 21x;
    width: 45%;
    float: left;
  }

  .thread_user_addr {
    margin: 10.5px 0px 0px 0px;
    color: #666;
    float: left;
    font-size: 12px;
    height: 21px;
    line-height: 21x;
    text-align: right;
    width: 33%;
  }

  .ov {
    overflow: hidden;
    padding: 1px;
  }

  .p15 {
    padding: 15px;
    font-size: 13px;
    border-bottom: 1px solid #d4cfc8;
  }

  .pt15 {
    padding-top: 15px;
    padding-bottom: 15px;
    color: #3b3937;
    word-wrap: break-word;
    overflow: hidden;
    font-size: 13px;
  }

  .threadDate {
    font-size: 13px;
    color: #a6937c;
    line-height: 23px;
    width: 100%;
  }

  .timeImg {
    width: 13px;
    height: 13px;
  }

  .threadCount {
    float: right;
    padding-right: 15px;
  }

  .submit-btn-black {
    height: 35px;
    margin-left: 1%;
    line-height: 35px;
    background: #3b3738;
    text-align: center;
    font-size: 14px;
    float: left;
  }

  .submit-btn-orange {
    height: 35px;
    margin-right: 0;
    line-height: 35px;
    background: #ff8a00;
    text-align: center;
    font-size: 14px;
    float: left;
  }

  .preview_img_layer {
    float: left;
    width: 100%;
  }

  .sub_img_layer {
    float: left;
    padding-bottom: 15px;
    width: 32%;
    margin-right: 1%;
  }

  .preview_img_layer {
    float: left;
    width: 100%;
  }
</style>

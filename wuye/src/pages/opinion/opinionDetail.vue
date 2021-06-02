<template>
  <div>
    <van-overlay :show="show">
      <van-loading vertical >加载中...</van-loading>
    </van-overlay>
    <div class="cssTitle">
      <div class="fl">
        <img class="fl comment-post-picture" :src="thread.userHead"/>
      </div>
      <div class="thread_user_head">{{ thread.userName }}</div>
    </div>

    <div class="" v-for="(thumbnailurl,index) in thread.thumbnailLink">
      <div class="cssMain" @click="viewSrcImg(thread.imgUrlLink)">
        <img class="sub_img_layer" :src="thumbnailurl"/>
      </div>
    </div>

    <div class="cssHead">{{ thread.threadContent }}</div>

    <div class="cssTime fl">
      <img class="cssTimeImg"
           src="../../assets/images/common/icon_time_gray.png"/>&nbsp;{{ thread.formattedDateTime }}
    </div>

    <div class="cssDel" v-show="thread.isThreadOwner == 'true'">
      <div class="cssDelText" @click="delThread">删除</div>
    </div>

    <div class="cssLine">&nbsp;</div>

    <div id="total_comments" class="comments_title">
      <div class="fl commentsText">评论</div>
    </div>

    <div class="cssDetail" v-for="(comment,index) in comments">
      <div class="cssDetailSub">
        <div class="cssDetailImg">
          <img class="cssDetailImgTxt" :src="comment.commentUserHead"/>
        </div>
        <div style="width: 79%" class="fl">
          <div class="comments_user_name">{{ comment.commentUserName }}</div>
          <div class="comments_user_count">{{ comment.commentContent }}
          </div>
          <!-- ------------ -->
          <div class="preview_img_layer">
            <div v-for="(items,indexc) in comment.previewLink">
              <div class="sub_img_layer" @click="viewSrcImg(comment.imgUrlLink);">
                <img class="preview_img" :src="items"/>
              </div>
            </div>
          </div>
          <!-- ------------ -->
          <div class="cssDetailTime">
            <img style="width: 12px; " src="../../assets/images/common/icon_time_gray.png"/>&nbsp;
            {{ comment.fmtCommentDateTime }}
          </div>
          <div class="cssDetailDel">
            <div style="float: right" v-show="comment.isCommentOwner == 'true'">
              <div class="cssDetailDelTxt" @click="delComment(comment,index)">删除</div>
            </div>
          </div>
          <div class="fl">&nbsp;</div>
        </div>
        <div style="width: 100%;" class="cssLine fl">&nbsp;</div>
      </div>
    </div>

    <div class="butt">
      <div id="input" class="cssReply">
        <textarea name="comment_content" class="comment_input" placeholder="回复" v-model="commentContent"></textarea>
        <div class="submit-btn" @click="saveComment" style="width:20%; color: white;">发送</div>
      </div>
    </div>

    <div class="loadImg">
      <van-uploader v-model="fileList" :after-read="uploadImgs" :before-delete="delImgs"/>
    </div>

  </div>
</template>

<script>
  import opinionApi from "@/api/OpinionApi.js";
  import {ImagePreview, Toast, Uploader, Overlay, Loading } from 'vant'

  export default {
    name: "",
    data() {
      return {
        threadId: this.$route.query.threadId,
        thread: {},
        comments: [],
        commentContent: '', //回复内容
        attachmentUrl: '',
        upImgs:[],
        fileList:[],
        show: false,
      }
    },
    components: {
      [Toast.name]: Toast,
      [Uploader.name]: Uploader,
      [Overlay.name]: Overlay,
      [Loading.name]: Loading,
      [ImagePreview.Component.name]: ImagePreview.Component,
    },
    mounted() {
      this.getThread();
    },

    methods: {
      getThread() {
        this.show = true
        setTimeout(() => {
          this.threadList();
          this.show = false
        }, 2000);
      },

      threadList() {
        let param = {
          threadId: this.threadId,
        }
        opinionApi.getThread(param).then((response) => {
          let data = response.data
          if (data && data.success) {
            this.thread = data.result;
            this.comments = this.thread.comments;
          }
        })
      },

      delThread() {
        this.show = true
        let param = {
          threadId: this.threadId,
        }
        opinionApi.delThread(param).then((response) => {
          let data = response.data
          if (data && data.success) {
            Toast("删除成功")
            this.$router.push({path: '/opinionList'})
          } else {
            Toast("删除发布信息失败，请重试！")
          }
          this.show = false
        })
      },

      delComment(comment, index) {
        this.show = true
        let param = {
          commentId: comment.commentId,
          threadId: comment.threadId
        }
        opinionApi.delComment(param).then((response) => {
          let data = response.data
          if (data && data.success) {
            this.comments.splice(index, 1);
          } else {
            Toast("删除回复信息失败，请重试！")
          }
          this.show = false
        })
      },

      saveComment() {
        if (!this.commentContent) {
          Toast("回复内容不为空")
          return;
        }

        this.show = true
        let str = ""
        if(this.upImgs.length > 0) {
          str = this.upImgs.join() + ","
        }

        let param = {
          commentContent: this.commentContent,
          threadId: this.threadId,
          attachmentUrl: str
        }
        opinionApi.addComment(param).then((response) => {
          let data = response.data
          if (data && data.success) {
            this.comments.push(data.result)
            this.commentContent = ''
            this.attachmentUrl = ''
            this.fileList = ''
          } else {
            Toast("发布信息保存失败，请重试！")
          }
          this.show = false
        })
      },

      uploadImgs(file) {
        file.status = 'uploading';
        file.message = '上传中...';

        let data = new FormData();
        data.append("picture", file.file);
        opinionApi.upload(data).then((response) => {
          let data = response.data
          if (data && data.success) {
            this.upImgs.push(data.result)
            file.status = 'done';
          } else {
            file.status = 'failed';
            file.message = '上传失败';
          }
        })
      },

      delImgs(file, detail) {
        this.upImgs.splice(detail.index, 1)
        this.fileList.splice(detail.index, 1)
      },

      viewSrcImg(imgs){
        ImagePreview(imgs)
      },
    }
  }
</script>

<style scoped>
  .cssTitle {
    overflow: hidden;
    padding-left: 15px;
    padding-bottom: 15px;
    font-size: 14px;
    padding-top: 15px
  }

  .fl {
    float: left;
  }

  .comment-post-picture {
    width: 42px;
    height: 42px;
    margin-right: 15px;
    border: 1px solid #d4cfc8;
    border-radius: 42px;
  }

  .thread_user_head {
    float: left;
    margin-top: 10.5px;
    font-size: 14px;
    color: #393b37;
  }

  .cssHead {
    overflow: hidden;
    padding-left: 15px;
    padding-bottom: 15px;
    font-size: 13px;
    color: #3b3937;
    word-wrap: break-word;
  }

  .cssTime {
    overflow: hidden;
    padding-left: 15px;
    padding-bottom: 15px;
    font-size: 13px;
    color: #a6937c;
    line-height: 23px
  }

  .cssTimeImg {
    width: 13px;
    height: 13px;
  }

  .comments_title {
    margin: 15px 4% 0 4%;
    height: 15px;
    border-bottom: 1px solid #d4cfc8;
    padding-bottom: 5px;
  }

  .commentsText {
    line-height: 15px;
    color: #888
  }

  .cssLine {
    padding-top: 15px;
    border-bottom: 5px solid #f9f9e9;
  }

  .cssDel {
    position: relative;
    overflow: hidden;
    padding: 1px;
    float: right;
  }

  .cssDelText {
    font-size: 13px;
    padding-right: 25px;
    color: #a6937c;
    text-align: right;
    line-height: 23px
  }

  .cssDetail {
    overflow: hidden;
  }

  .cssDetailSub {
    padding-top: 15px;
    width: 100%;
    min-height: 100px;
    float: left;
    padding-left: 15px;
    overflow: hidden;
  }

  .cssDetailImg {
    padding-bottom: 15px;
    font-size: 14px;
    float: left;
    width: 15%;
  }

  .cssDetailImgTxt {
    width: 35px;
    height: 35px;
    margin-right: 15px;
    border: 1px solid #d4cfc8;
    border-radius: 35px;
    float: left;
  }

  .comments_user_name {
    font-size: 14px;
    color: #3b3937;
    margin: 5px 0px 15px 0px;
  }

  .comments_user_count {
    color: #3b3937;
    word-wrap: break-word;
    overflow: hidden;
    font-size: 13px;
  }

  .preview_img_layer {
    float: left;
    width: 100%;
  }

  .sub_img_layer {
    float: left;
    padding-bottom: 10px;
    width: 32%;
    margin-right: 1%;
  }

  .cssDetailTime {
    font-size: 12px;
    padding-top: 15px;
    float: left;
    color: #888;
  }

  .cssDetailDel {
    padding-top: 15px;
    font-size: 12px;
    color: #a6937c;
    float: right;
  }

  .cssDetailDelTxt {
    font-size: 12px;
    padding-right: 25px;
    color: grey;
    text-align: right
  }

  .butt {
    overflow: hidden;
    margin-top: 10px;
  }

  .cssReply {
    float: left;
    top: 10px;
    background-color: white;
    width: 98%;
    text-align: center;
    border: 1px;
    margin-left: 2%;
  }

  .comment_input {
    text-align: left;
    float: left;
    overflow: hidden;
    width: 70%;
    display: block;
    height: 35px;
    line-height: 35px;
    outline: none;
    border: 1px solid #d4cfc8;
    border-radius: 4px;
    padding: 0 10px;
    vertical-align: middle;
    font-size: 15px;
  }

  .submit-btn {
    height: 35px;
    margin-left: 1%;
    line-height: 35px;
    background: #ff8a00;
    text-align: center;
    overflow: hidden;
    padding: 1px;
    font-size: 14px;
    float: left;
  }

  .loadImg {
    overflow: hidden;
    padding-top: 10px;
    padding-bottom: 1.6rem;
    padding-left: 0.2rem;
  }

  .cssMain{
    overflow: hidden;
    padding: 1px;
    padding-bottom: 15px;
    font-size: 14px;
    padding-left: 15px;
  }

  .van-loading{
    position: absolute;
    top: 50%;
    left: 45%;
  }
</style>

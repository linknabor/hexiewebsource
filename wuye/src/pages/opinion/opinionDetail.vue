<template>
  <div class="main">
    <van-overlay :show="show">
      <van-loading vertical>加载中...</van-loading>
    </van-overlay>
    <div class="p15">
      <div class="ov">
        <div><img class="fl thread-picture" :src="interact.user_head"/></div>
        <div class="thread_user_name">
          <van-cell style="padding: 0" :title="interact.user_name" title-class="custom-title" :label="interact.sect_name" label-class="custom-label"/>
        </div>
      </div>

      <div class="pt15">
        {{ interact.ex_content }}
      </div>

      <div class="pictures">
        <img v-for="(thumbnailurl) in interact.thumbnailLink"
             @click="viewSrcImg(interact.imgUrlLink);" :src="thumbnailurl"/>
      </div>

      <div class="threadDate">
        <van-icon name="underway-o" size="14px" style="position: relative;top: 2px"/>
        &nbsp;{{ interact.formattedDateTime }}
        <div class="threadCount" style="text-align: right;" v-show="interact.isThreadOwner === 'true'">
          <div @click="delInteract">删除</div>
        </div>
      </div>
    </div>


    <div id="total_comments" class="comments_title">
      <div class="fl commentsText">评论 {{interact.comments_count}}</div>
    </div>
    <div class="p151" v-for="(comment,index) in comments">
      <div class="ov">
        <div><img class="fl thread-picture" :src="comment.comment_user_head"/></div>
        <div class="thread_user_name">
          <van-cell style="padding: 1px 0 5px 1px" :title="comment.comment_user_name" />
        </div>
      </div>

      <div class="pt151" v-if="comment.comment_content != ''">
        {{ comment.comment_content }}
      </div>

      <div class="pictures">
        <img v-for="(items) in comment.thumbnailLink"
             @click="viewSrcImg(comment.imgUrlLink);" :src="items"/>
      </div>

      <div class="fl threadDate">
        <van-icon name="underway-o" size="14px" style="position: relative;top: 2px"/>
        &nbsp;{{ comment.fmtCommentDateTime }}
        <div class="threadCount" style="text-align: right;" v-show="comment.isCommentOwner === 'true'">
          <div @click="delComment(comment,index)">删除</div>
        </div>
      </div>
      <div style="height: 35px;">&nbsp;</div>
    </div>
    <div style="height: 180px">&nbsp;</div>

    <div class="cssBottom">
      <div class="but">
        <van-field v-model="commentContent" clearable placeholder="发表评论" use-button-slot class="comment_input" type="textarea" maxlength="100">
          <van-button slot="button" class="submit-btn" size="normal" type="primary" @click="saveComment">发送</van-button>
        </van-field>
        <div class="loadImg">
          <van-uploader v-model="fileList" :before-delete="delImgs" :max-count="3" preview-size="70px" upload-text="拍照上传"/>
        </div>
      </div>
    </div>

    <user-info @getUserInfo="getUserInfo"></user-info>
  </div>
</template>

<script>
  import opinionApi from "@/api/OpinionApi.js";
  import {ImagePreview, Toast, Uploader, Overlay, Loading, Dialog, Cell, Image, Icon, Field, Button} from 'vant'
  import UserInfo from "@/components/UserInfo";

  export default {
    name: "",
    data() {
      return {
        interactId: this.$route.query.interactId,
        interact: {}, //主信息
        comments: [], //回复列表
        commentContent: '', //回复内容
        attachmentUrl: [], //上传后的图片地址
        fileList: [], //上传图片原地址
        page:1, //回复分页
        show: false,
        userInfo: {},
        autosize: {minHeight: 40},
      }
    },
    components: {
      [Toast.name]: Toast,
      [Uploader.name]: Uploader,
      [Overlay.name]: Overlay,
      [Loading.name]: Loading,
      [ImagePreview.Component.name]: ImagePreview.Component,
      [Cell.name]: Cell,
      [Image.name]: Image,
      [Icon.name]: Icon,
      [Field.name]: Field,
      [Button.name]: Button,
      "user-info": UserInfo,
    },
    mounted() {
      this.getInteractInfo();
    },

    methods: {
      getUserInfo(result) {
        this.userInfo = result;
        var sectId = this.userInfo.sectId;
        if (sectId === '0' || sectId == null || sectId === 'null') {
          Dialog({message: '未绑定房屋'});
          this.$router.push({path: '/Version2'})
        }
      },
      getInteractInfo() {
        this.show = true
        setTimeout(() => {
          this.interactDetail();
          this.getCommentList();
        }, 1000);
      },

      interactDetail() {
        let param = {
          interactId: this.interactId,
        }
        opinionApi.getInteract(param).then((response) => {
          let data = response.data
          if (data && data.success) {
            this.interact = data.result;
          }
        })
      },
      getCommentList() {
        let param = {
          interactId: this.interactId,
          page: this.page
        }
        opinionApi.getCommentList(param).then((response) => {
          let data = response.data
          if (data && data.success) {
            this.comments = data.result;
          }
        })
        this.show = false
      },

      delInteract() {
        this.show = true
        let param = {
          interactId: this.interactId,
        }
        opinionApi.delInteract(param).then((response) => {
          let data = response.data
          if (data && data.success) {
            Toast.success("删除成功")
            this.$router.push({path: '/opinionList'})
          } else {
            Toast.fail("删除发布信息失败，请重试！")
          }
          this.show = false
        })
      },

      delComment(comment, index) {
        this.show = true
        let param = {
          commentId: comment.comment_id,
        }
        opinionApi.delComment(param).then((response) => {
          let data = response.data
          if (data && data.success) {
            this.comments.splice(index, 1);
            this.interact.comments_count = this.interact.comments_count - 1;
          } else {
            Toast("删除回复信息失败，请重试！")
          }
          this.show = false
        })
      },

      async saveComment() {
        if (!this.commentContent) {
          Toast.fail("回复内容不为空");
          return;
        }
        if(this.commentContent.length > 100) {
          Toast.fail("回复内容过长");
          return;
        }
        this.show = true
        for (let i = 0; i < this.fileList.length; i++) {
          await this.uploadServerImgs(this.fileList[i]);
        }
        await this.saveCommentInfo();
      },

      saveCommentInfo() {
        let str = ""
        if (this.attachmentUrl.length > 0) {
          str = this.attachmentUrl.join() + ","
        }

        if(this.fileList.length !== this.attachmentUrl.length) {
          Toast.fail("上传照片失败，请重试");
          return;
        }
        let param = {
          comment_content: this.commentContent,
          interact_id: this.interactId,
          attachment_urls: str
        }
        opinionApi.addComment(param).then((response) => {
          let data = response.data;
          if (data && data.success) {
            this.comments.unshift(data.result);
            this.commentContent = '';
            this.fileList = [];
            this.attachmentUrl = [];
            this.interact.comments_count = this.interact.comments_count + 1;
          } else {
            Toast.fail("发布信息保存失败，请重试！")
          }
          this.show = false
        })
      },

      //上传到服务器
      async uploadServerImgs(file) {
        let data = new FormData();
        data.append("picture", file.file);
        await opinionApi.upload(data).then((response) => {
          let data = response.data
          if (data && data.success) {
            this.attachmentUrl.push(data.result)
            file.status = 'done';
          } else {
            file.status = 'failed';
            file.message = '上传失败';
          }
        })
      },

      delImgs(file, detail) {
        this.fileList.splice(detail.index, 1)
      },

      viewSrcImg(imgs) {
        ImagePreview(imgs)
      },
    }
  }
</script>

<style scoped>
  .main {
    width: 100%;
    min-height: 100vh;
    height: auto;
    overflow: hidden;
    font-size: 16px;
  }

  .custom-title{
    margin: 0;
    font-size: 15px;
  }

  .custom-label{
    margin: 0;
    font-size: 13px;
  }

  .p15 {
    padding: 5px 15px;
    font-size: 13px;
  }

  .p151 {
    padding: 5px 15px;
    font-size: 13px;
    border-bottom: 1px solid #eff0f4;
  }

  .ov {
    overflow: hidden;
    padding: 1px;
  }

  .thread-picture {
    width: 42px;
    height: 42px;
    margin-right: 8px;
    border-radius: 10px;
  }

  .thread_user_name {
    float: left;
    font-weight: bold;
  }

  .pt15 {
    padding: 5px 5px 10px 50px;
    word-wrap: break-word;
    overflow: hidden;
    font-size: 15px;
    height: auto;
    min-height: 20px;
    line-height: 20px;
    font-weight: 400;
  }

  .pt151 {
    padding: 5px 5px 10px 50px;
    word-wrap: break-word;
    overflow: hidden;
    font-size: 15px;
    height: auto;
    min-height: 20px;
    line-height: 20px;
    margin-top: -20px;
    font-weight: 400;
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

  .threadDate {
    font-size: 13px;
    color: #a6937c;
    width: 100%;
    padding-left: 50px;
    padding-top: 10px;
    line-height: 20px;
    padding-bottom: 5px;
    font-weight: 400;
  }

  .threadCount {
    float: right;
    padding-right: 80px;
  }

  .comments_title {
    margin: 10px 4% 0 4%;
    height: 15px;
    border-bottom: 1px solid #d4cfc8;
    padding-bottom: 5px;
  }

  .commentsText {
    line-height: 15px;
    color: #888;
    font-size: 13px;
  }

  .but {
    background-color: white;
    width: 98%;
    margin-left: 2%;
  }

  .cssBottom{
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 180px;
  }

  .comment_input {
    background-color: #f0f1f4 !important;
    height: 60px;
  }

  .comment_input::placeholder {
    line-height: 35px;
  }

  .submit-btn {
    width: 75px;
    height: 38px;
    background: var(--primary-color);
    border-radius: 5px;
    border: 0;
  }

  .loadImg {
    overflow: hidden;
    padding-top: 10px;
    padding-bottom: 1.6rem;
    padding-left: 0.2rem;
  }

  .van-loading {
    position: absolute;
    top: 50%;
    left: 45%;
  }

</style>

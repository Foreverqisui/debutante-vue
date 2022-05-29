<template>
  <div>
    <ul>
      <li
        v-for="item in formLabelAlign.data"
        v-bind:key="item"
        data-v-bf28f726=""
        class="clearfix"
      >
        <div data-v-bf28f726="" class="discuss-detail">
          <div data-v-bf28f726="" class="discuss-head">
            <el-card :body-style="{ padding: '0px' }">
              <!-- 头像 -->
              <a
                data-v-bf28f726=""
                data-card-uid="173362216"
                href="#/forum/Head"
                class="head-pic"
                data-card-index="1"
                ><img
                  data-v-bf28f726=""
                  alt="头像"
                  v-bind:src="item.pictureoss"
              /></a>
              <!-- 用户名 -->
              <a
                data-v-bf28f726=""
                data-card-uid="173362216"
                href="#/forum/userInfo"
                class="d-name level-color-8"
                style="font-size: 14px"
                data-card-index="2"
                >{{ item.username }}</a
              >
              <el-tag type="info"> pc精品🐲 </el-tag>
              <!-- 内容简介 -->
              <div class="discuss-main clearfix">
                <router-link
                  :to="{
                    path: '/forum/description',
                    query: {
                      title: item.title,
                      author: item.username,
                      userId: item.userId,
                      pictureoss: item.pictureoss,
                    },
                  }"
                  >{{ item.title }}</router-link
                >
              </div>
            </el-card>
          </div>
          <!-- 点赞 评论 浏览量 -->
          <div class="feed-foot">
            <span style="margin: 6px 0px"></span>
            <div class="feed-legend">
              <div class="feed-legend-content">
                <span class="no-after"
                  ><img
                    data-v-bf28f726=""
                    src="//static.nowcoder.com/images-nk/oss/page/discuss/center/browse.png"
                    alt=""
                  />{{ item.page }}</span
                >

                <span data-v-bf28f726="" class="no-after"
                  ><img
                    data-v-bf28f726=""
                    src="//static.nowcoder.com/images-nk/oss/page/discuss/center/comment.png"
                    alt=""
                  />{{ item.commentCount }}</span
                >
                <span data-v-bf28f726="" class="no-after"
                  ><img
                    data-v-bf28f726=""
                    src="//static.nowcoder.com/images-nk/oss/page/discuss/center/like.png"
                    alt=""
                  />{{ item.score }}</span
                >
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import forum from "../../api/forumDemo/forum";
import { ref, reactive, computed } from "vue";
import { onBeforeRouteUpdate, useRouter } from "vue-router";
import { ElMessage } from "element-plus";
export default {
  setup() {
    const router = useRouter();
    let formLabelAlign = reactive({
      data1: [],
    });
    return {
        formLabelAlign
    };
  },
};
</script>

<style>
</style>
<template>
  <div class="nk-container">
    <div class="nk-main clearfix">
      <el-page-header @back="toHome()"></el-page-header>
      <!--主体内容-->
      <div class="nk-content">
        <div
          class="module-box discuss-topic js-copy-mark"
          data-mark-info="作者：牛客实习助手"
        >
          <!-- 标题 -->
          <div class="discuss-topic-head">
            <h1 style="text-align: center; font-size: 25px">
              <span>{{ formLabelAlign.params.title }}</span>
            </h1>
            <!-- 头像 -->
            <el-row :span="24">
              <el-col :span="16" :xs="11">
                <el-avatar
                  class="card-avator"
                  v-bind:src="formLabelAlign.params.imgHead"
                  :size="150"
                  style="margin-top: 20px"
                >
                </el-avatar>
              </el-col>
              <el-col :span="16" :xs="13">
                <el-card shadow="hover" style="height: 100px; margin-top: 20px">
                  <div class="discuss-author clearfix">
                    <span>
                      {{ formLabelAlign.params.username }}
                      <el-tag
                        type="success"
                        effect="plain"
                        round
                        size="large"
                        hit="true"
                        color="black"
                        style="margin-left: 5px"
                        v-if=" formLabelAlign.params.type == 2"
                      >
                        置顶👑
                      </el-tag>
                      <el-tag
                        type="warning"
                        effect="light"
                        round
                        style="margin-left: 5px"
                        hit="true"
                        v-if=" formLabelAlign.params.type == 1"
                      >
                        精华🎆
                      </el-tag>
                      <el-tag type="info" v-if=" formLabelAlign.params.type == 0">
                        pc精品🐲
                      </el-tag>
                    </span>
                    <div>
                      <span class="post-time">
                        {{ formLabelAlign.params.loginTime }}
                      </span>
                    </div>
                    <!-- 作者 -->
                  </div>
                </el-card>
                <el-button @click="turnBtn()" type="success"
                  >更改为小字布局
                </el-button>
                <el-button
                  @click="like(type, formLabelAlign.params.id)"
                  type="warning"
                  plain
                  round
                  icon="Star"
                  >点赞</el-button
                >
              </el-col>
            </el-row>
          </div>
          <el-divider>
            <el-icon><star-filled /></el-icon>
          </el-divider>
          <!--内容-->

          <div class="post-topic-main">
            <div class="post-topic-des nc-post-content js-nc-pop-image">
              <el-card>
                <span style="color: rgb(0, 51, 153)"
                  ><b>{{ formLabelAlign.params.content }}</b></span
                >
              </el-card>
              <div>
                <br />
              </div>
            </div>
          </div>
        </div>
        <!-- 中间部分 -->

        <h3>总帖数: {{ formLabelAlign.params.commentCount }}</h3>
        <el-button
          type="info"
          style="margin-left: 330px; margin-top: -40px"
          icon="ChatLineRound"
          @click="dialFormVisible = true"
          >回帖</el-button
        >

        <el-dialog v-model="dialFormVisible" title="回复帖子" center>
          <el-form>
            <el-form-item label="内容">
              <el-input
                style="height: 60px"
                type="textarea"
                :row="10"
                resize="both"
                v-model="content"
                placeholder="请输入回复内容"
              ></el-input>
            </el-form-item>
          </el-form>

          <el-button
            type="info"
            style="margin-left: 60px; margin-top: 20px"
            @click="replayAuthor(formLabelAlign.params.id, content)"
            >回帖</el-button
          >
        </el-dialog>
        <!-- 评论部分 -->
        <ul>
          <li
            v-for="item in commentData.data"
            v-bind:key="item"
            data-v-bf28f726=""
            class="clearfix"
          >
            <div data-v-bf28f726="" class="discuss-detail">
              <div data-v-bf28f726="" class="discuss-head">
                <!-- 头像 -->
                <el-avatar
                  class="card-avator"
                  v-bind:src="commentData.pictureoss"
                  :size="50"
                  style="margin-top: 20px"
                >
                </el-avatar>
                <!-- 用户名 -->
                匿名{{ item.userId }}
                <el-tag type="info"> pc精品🐲 </el-tag>
                <el-card>
                  {{ item.content }}
                </el-card>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed, onMounted } from "vue";
import forum from "../../api/forumDemo/forum";
import { onBeforeRouteUpdate, useRouter } from "vue-router";
import { ElMessage, ElNotification } from "element-plus";

export default {
  components: {},
  setup() {
    const router = useRouter();
    let title = router.currentRoute.value.query.title;
    let author = router.currentRoute.value.query.author;
    let userId = router.currentRoute.value.query.userId;
    let pictureoss = router.currentRoute.value.query.pictureoss;
    //表内信息
    let formLabelAlign = reactive({
      params: {
        id: "",
        username: author,
        imgHead: pictureoss,
        password: "1",
        title: title,
        type: "",
        content: "",
        page: "1080",
        forumCount: "20",
        pointGood: "20",
        loginTime: "2022-04-28 17:29",
        otherInfo: "三天前回复",
        commentCount: "",
      },
    });
    let commentData = reactive({
      data: [],
      pictureoss:
        "http://pc5201314.oss-cn-beijing.aliyuncs.com/2022/05/%E5%A4%B4%E5%83%8F/%E7%B2%89%E8%89%B2%E6%AF%9B%E5%88%A9%E5%B0%8F%E4%BA%94%E9%83%8E.jpeg",
    });
    let dialFormVisible = ref(false);
    let content = ref("");
    let type = ref("1");
    //点赞
    function like(type, entityId) {
      forum.like(type, entityId).then((res) => {
        if (res.data.code == 200) {
          ElMessage.success("点赞成功");
        } else {
          ElMessage.warning("请不要重复点赞");
        }
      });
    }

    //回复作者的方法
    function replayAuthor(entityId, content) {
      forum.replayAuthor(entityId, content).then((res) => {
        dialFormVisible = false;
        ElMessage.success("🐲恭喜回复成功");
        setTimeout(() => {
          window.location.reload();
        }, 500);
      });
    }
    //获取到评论内容
    function getCommont(id) {
      forum.findCommentById(id).then((res) => {
        commentData.data = res.data.data;
      });
    }
    //获取详细内容
    function showCommont(title, userId) {
      forum.showCommont(title, userId).then((res) => {
        getCommont(res.data.data.id);
        formLabelAlign.params.id = res.data.data.id;
        formLabelAlign.params.commentCount = res.data.data.commentCount;
        formLabelAlign.params.type = res.data.data.type;
        formLabelAlign.params.content = res.data.data.content;
        formLabelAlign.params.loginTime = res.data.data.createTime;
      });
    }
    // 发帖功能
    function publishWord() {
      router.push("/forum/publishWord").then(() => {
        window.location.reload();
      });
    }
    //回主页
    function toHome() {
      router.push("/to_forum").then(() => {});
    }
    function turnBtn() {
      window.location.reload();
    }
    showCommont(title, userId);
    return {
      formLabelAlign,
      commentData,
      dialFormVisible,
      userId,
      content,
      type,
      publishWord,
      toHome,
      turnBtn,
      replayAuthor,
      like,
    };
  },
};
</script>

<style>
ul {
  margin: 0;
  padding: 0;
  font-weight: 400;
}
body,
html {
  margin: 0;
  height: 100%;
}
</style>
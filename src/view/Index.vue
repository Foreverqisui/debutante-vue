<template>
  <div
    v-loading="loading"
    element-loading-text="截图正在提交，请不要退出"
    :element-loading-svg="svg"
    element-loading-svg-view-box="-10, -10, 50, 50"
    element-loading-background="rgba(122, 122, 122, 0.8)"
    style="width: 100%"
  >
    <el-row :gutter="20">
      <el-col :span="8" :xs="24" :sm="8" :md="7"
        ><div class="grid-content bg-purple" />
        <el-card shadow="hover" class="mgb20" style="height: 252px">
          <div class="user-info">
            <el-avatar
              class="card-avator"
              v-bind:src="formLabelAlign.params.pictureoss"
            >
            </el-avatar>
            <div class="user-info-cont">
              <div class="user-info-name">
                {{ formLabelAlign.params.username }}
                <el-tag
                  type="danger"
                  effect="dark"
                  round
                  @click="tagBtn()"
                  v-if="statusTag.error"
                >
                  最晚提交截图人员👹
                </el-tag>
                <el-tag
                  type="success"
                  effect="dark"
                  round
                  v-if="statusTag.success"
                >
                  最早提交截图🥇
                </el-tag>
                <el-tag type="info" effect="dark" round v-if="statusTag.second">
                  第二提交截图🥈
                </el-tag>
                <el-tag type="info" effect="dark" round v-if="statusTag.info">
                  准时提交截图🎖
                </el-tag>
              </div>
              <div>{{ formLabelAlign.params.uid }}</div>
            </div>
          </div>
          <el-divider>
            <el-icon><star-filled /></el-icon>
          </el-divider>
          <div class="user-info-list">
            上次登录时间：
            <span>{{ formLabelAlign.params.uploadtime }}</span>
          </div>
          <div class="user-info-list">
            是否提交截图：
            <span>
              {{ status }}
            </span>
          </div>
        </el-card>
      </el-col>
      <el-col :span="16" :xs="24">
        <el-upload
          class="upload-demo"
          drag
          action="http://123.56.156.8:5580/api/oss/file/uploadFile"
          multiple
          :on-success="uploadOss"
          :before-upload="beforeAvatarUpload"
          :on-progress="uploadOssProgress"
        >
          <el-icon class="el-icon--upload"><upload-filled /></el-icon>
          <div class="el-upload__text">上传青年大学习截图 <em>click</em></div>
          <template #tip>
            <div class="el-upload__tip">截图需要限制在1MB以下</div>
          </template>
        </el-upload>
      </el-col>
    </el-row>
    <el-row :span="16">
      <el-col :span="16" :xs="15">
        <el-button type="waring" round @click="logout()"> 退出登录 </el-button>
        <el-button type="waring" round @click="lookRankList()">
          查看排行榜
        </el-button>
      </el-col>
    </el-row>
    <el-button type="warning" round @click="miaoshaRef()">头像秒杀</el-button>
    <el-button type="warning" round @click="forumRef()">网站论坛</el-button>
  </div>
</template>

<script>
import login from "../api/login/login";
import { ref, reactive, computed } from "vue";
import { onBeforeRouteUpdate, useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import cookie from "js-cookie";

export default {
  components: {},
  setup() {
    //表内信息
    let formLabelAlign = reactive({
      params: {
        username: "",
        logintime: "",
        status: "",
        pictureoss: "",
        uploadtime: "",
        tagStatus: "",
      },
    });
    //tag属性
    var statusTag = reactive({
      error: false,
      success: false,
      second: false,
      info: false,
    });
    //加载属性
    var loading = ref(false);
    const svg = `
        <path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
      `;
    //是否提交截图
    let status = ref({});
    //头像地址
    let pictureoss = ref({});
    const router = useRouter();

    //根据cookie中的信息获取用户信息
    function getUserInfoByToken() {
      let cookieInfo = cookie.get("userInfo");
      if (cookieInfo) {
        formLabelAlign.params = JSON.parse(cookieInfo);
      }
      //根据状态码返回是否提交
      if (formLabelAlign.params.status == 1) {
        status = "已提交";
      } else if (formLabelAlign.params.status == 0) {
        status = "未提交";
      }
      // 根据状态码判别是第几个提交 -1为最后 0为正常 1 为最早
      if (formLabelAlign.params.tagStatus == -1) {
        statusTag.error = true;
        ElMessage.error("你怎么好意思的😒");
        setTimeout(() => {
          ElMessage.error("你下次还要这么晚交么🤬");
          setTimeout(() => {
            ElMessage.warning("希望下次你不会再见到这个提示👺");
            setTimeout(() => {
              ElMessage.info("☠☠☠☠☠☠");
            }, 300);
          }, 300);
        }, 300);
      } else if (formLabelAlign.params.tagStatus == 1) {
        statusTag.success = true;
      } else if (formLabelAlign.params.tagStatus == 2) {
        statusTag.second = true;
      } else {
        statusTag.info = true;
      }
    }
    //标签
    function tagBtn() {
      ElMessage.warning("你怎么好意思的");
    }
    //退出登录
    function logout() {
      cookie.set("userInfo", "", { domain: "foreverqisui.top" });
      cookie.set("cookieName", "", { domain: "foreverqisui.top" });
      router.push("/").then(() => {
        window.location.reload();
      });
    }
    //限制上传图片的大小
    function beforeAvatarUpload(file) {
      const isLimtSize = file.size / 1024 / 1024 < 1;
      if (!isLimtSize) {
        ElMessage.warning("请限制提交大小在1MB以下");
        return false;
      }
    }
    //正在上传的操作
    function uploadOssProgress() {
      loading.value = true;
      setTimeout(() => {
        loading = false;
      }, 2000);
    }
    //上传照片后执行的操
    function uploadOss() {
      uploadTimes(formLabelAlign.params);
      router.push("/uploadForm").then(() => {
        ElMessage.success("提交成功");
      });
    }
    //提交时间
    function uploadTimes(data) {
      login.uploadTime(data).then((res) => {});
    }
    //查看排行榜
    function lookRankList() {
      router.push("/uploadForm").then(() => {
        window.location.reload();
      });
    }
    //跳转至秒杀页面
    function miaoshaRef() {
      router.push("/to_miaoshagoods").then(() => {
        window.location.reload();
      });
    }
    //跳转至论坛
    function forumRef() {
      router.push("/to_forum").then(() => {
        window.location.reload();
      });
    }
    getUserInfoByToken();
    // getUserInfo(id);
    return {
      formLabelAlign,
      logout,
      uploadOss,
      status,
      lookRankList,
      pictureoss,
      miaoshaRef,
      loading,
      svg,
      statusTag,
      beforeAvatarUpload,
      uploadOssProgress,
      tagBtn,
      forumRef,
    };
  },
};

// //获取连接中的id
// //得到id值
// const id = router.currentRoute.value.params.id;

// //根据id查询信息
// function getUserInfo(id) {
//   login.findById(id).then((res) => {
//     formLabelAlign.params = res.data.userInfoById;
//   });
// }
</script>

<style>
.alert-header {
  height: 100px;
}
.card-avator {
  width: 70px;
  height: 70px;
  border-radius: 100%;
  margin-top: 20px;
  margin-left: 10px;
}
.user-info-name {
  margin-bottom: 10px;
  font-size: 20px;
}
.user-info-cont {
  font-size: 10px;
  color: #999;
  margin-left: 100px;
  margin-top: -70px;
}
.user-info-list {
  font-size: 14px;
  color: #999;
  line-height: 25px;
}
.upload-container {
  margin-top: 100px;
  margin-left: 20px;
}

.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
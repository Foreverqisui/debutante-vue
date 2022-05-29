<template>
  <div>
    <el-row :gutter="20">
      <el-col span="24" xs="10">
        <e-card shadow="hover" class="magrinTop">
          <el-table
            :data="query.list"
            height="350px"
            style="width: 100%"
            class="magrinTop"
          >
            <el-table-column
              prop="uid"
              label="学号"
              width="120"
            ></el-table-column>
            <el-table-column prop="username" label="用户名" width="120" />
            <!-- 通过状态码来判断是否可以使用 -->
            <el-table-column label="状态" width="130">
              <template #default="scope">
                <el-tag
                  :type="
                    scope.row.status == 1
                      ? 'success'
                      : scope.row.status == 0
                      ? 'danger'
                      : ''
                  "
                  >{{ scope.row.state }}
                </el-tag>
                <el-tag
                  type="danger"
                  effect="dark"
                  round
                  v-if="scope.row.tagStatus == -1"
                >
                  最晚提交截图👹
                </el-tag>
                <el-tag
                  type="success"
                  effect="dark"
                  round
                  v-if="scope.row.tagStatus == 1"
                >
                  最早提交截图🥇
                </el-tag>
                <el-tag
                  type="waring"
                  effect="dark"
                  round
                  v-if="scope.row.tagStatus == 2"
                >
                  第二提交截图🥈
                </el-tag>
                <el-tag
                  type="info"
                  effect="dark"
                  round
                  v-if="scope.row.tagStatus == 0"
                >
                  准时提交截图🎖
                </el-tag>
              </template>
            </el-table-column>
          </el-table>
          <el-button @click="logout()">退出登录</el-button>
        </e-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col span="20" :xs="10" :sm="8" :md="7">
        <ShengDanOldMan></ShengDanOldMan>
      </el-col>
    </el-row>
  </div>
</template>


<script>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { ElMessage, ElMessageBox } from "element-plus";
import { Delete, Edit } from "@element-plus/icons-vue";
import ShengDanOldMan from "../components/ShengDanOldMan.vue";
import login from "../api/login/login";
import cookie from "js-cookie";

export default {
  components: {
    ShengDanOldMan,
  },
  setup() {
    const value = ref("100");
    const router = useRouter();
    const user = reactive({
      username: "Aa潘七岁",
    });
    const query = reactive({
      current: 1,
      limit: 4,
      formInfo: {},
      list: [],
      total: 10,
    });
    // 获取表格数据
    function getData(page = 1) {
      query.current = page;
      login
        .uploadForm(query.current, query.limit, query.formInfo)
        .then((res) => {
          query.list = res.data.uploadPage.records;
        });
    }
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
    });
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
    }
    //退出登录
    function logout() {
      cookie.set("userInfo", "", { domain: "foreverqisui.top" });
      cookie.set("cookieName", "", { domain: "foreverqisui.top" });
      router.push("/").then(() => {
        window.location.reload();
      });
    }
    getUserInfoByToken();
    getData();
    return {
      user,
      value,
      query,
      statusTag,

      getData,
      logout,
    };
  },
};
</script>

<style scoped>
.imgs {
  width: 100px;
  height: 100px;
}

.user-info {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 2px solid #ccc;
  margin-bottom: 20px;
}

.user-avator {
  width: 120px;
  height: 120px;
  border-radius: 50%;
}

.user-info-cont {
  padding-left: 50px;
  flex: 1;
  font-size: 14px;
  color: #999;
}

.user-info-cont div:first-child {
  font-size: 30px;
  color: #222;
}

.user-info-list {
  font-size: 14px;
  color: #999;
  line-height: 25px;
}

.user-info-list span {
  margin-left: 70px;
}

.mgb20 {
  margin-bottom: 20px;
  background-color: rgb(59, 58, 58);
}

.demo-image__lazy {
  height: 400px;
  width: 350px;
  overflow-y: auto;
}
.demo-image__lazy .el-image {
  display: block;
  min-height: 200px;
  margin-bottom: 10px;
}
.demo-image__lazy .el-image:last-child {
  margin-bottom: 0;
}

.demo-progress .el-progress--line {
  margin-bottom: 20px;
  width: 300px;
  height: 20px;
}
.magrinTop {
  margin-top: 25px;
  background-color: rgb(59, 58, 58);
}
</style>
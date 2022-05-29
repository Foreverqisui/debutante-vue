<template>
  <div style="margin-top: 100px">
    <h1 style="text-align: center">发布帖子</h1>
    <el-input
      v-model="title"
      autosize
      type="textarea"
      placeholder="请输入标题"
    />
    <div style="margin: 20px 0" />
    <el-input
      v-model="message"
      :autosize="{ minRows: 2, maxRows: 4 }"
      type="textarea"
      placeholder="请输入内容"
    />
    <el-button
      type="info"
      @click="publishCommont(title, message)"
      style="margin-left: 160px; margin-top: 20px"
      >发布帖子</el-button
    >
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
    let title = ref("");
    let message = ref("");

    function publishCommont(title, message) {
      forum.publishCommont(title, message).then((res) => {
        if (res.data.flag == 200) {
          ElMessage.success("发帖成功")
          setTimeout(() =>{
            router.push("/to_forum").then(() => {
            window.location.reload();
          });
          }, 1000)
        }else {
          ElMessage.error("发帖失败")
          router.push("/to_forum").then(() => {
            window.location.reload();
          });
        }
      });
    }

    return {
      title,
      message,
      publishCommont,
    };
  },
};
</script>

<style>
</style>
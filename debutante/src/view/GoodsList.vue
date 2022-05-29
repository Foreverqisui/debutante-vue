<template>
  <div>
    <el-row :gutter="20">
      <el-col span="24" xs="10">
        <e-card shadow="hover" class="magrinTop">
          <el-table
            :data="query.list"
            height="700px"
            style="width: 500px"
            class="magrinTop"
          >
            <el-table-column prop="id" label="ID" v-if="false" />
            <el-table-column prop="goodsImg" label="商品图片" width="100">
              <template #default="scope">
                <img
                  v-bind:src="scope.row.goodsImg"
                  width="100"
                  height="80"
                />
              </template>
            </el-table-column>
            <el-table-column prop="goodsName" label="商品名" width="100" />
            <el-table-column prop="goodsPrice" label="原价" width="60" />
            <el-table-column prop="miaoshaPrice" label="秒杀价" width="80" />

            <el-table-column width="50">
              <template #default="scope">
                <el-button type="info" @click="refTo(scope.row.id)"
                  >详情</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </e-card>
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
import goodsList from "../api/miaosha/miaoshagoods.js";

export default {
  components: {
    ShengDanOldMan,
  },
  setup() {
    const router = useRouter();
    const query = reactive({
      list: [],
    });
    // 获取表格数据
    function getData() {
      goodsList.goodsList().then((res) => {
        query.list = res.data.goodsVos;
        console.log(query.list);
      });
    }
    //跳转至详情页
    function refTo(goodsId) {
      //调用接口 通过goodsId 获取信息
      goodsList.getdetailByGoosId(goodsId).then((res) => {
        //记录倒计时
        var time = res.data.remainSeconds;
        //根据返回状态码确定状态 是否开始秒杀
        if (res.code == 201) {
          if (time == -1) {
            ElMessageBox.alert("秒杀已经结束");
          } else {
            ElMessageBox.alert("秒杀还未开始,剩余时间为：" + time);
          }
        } else {
          //通过路由传递 goodsId
          router
            .push({ path: "/to_detail", query: { id: goodsId } })
            .then(() => {
              ElMessage.success("秒杀正在进行，请抓紧时间抢购");
              window.location.reload();
            });
        }
      });
    }
    getData();
    return {
      query,
      refTo,
    };
  },
};
</script>

<style>
.el-table .warning-row {
  --el-table-tr-bg-color: var(--el-color-warning-light-9);
}
.el-table .success-row {
  --el-table-tr-bg-color: var(--el-color-success-light-9);
}
</style>
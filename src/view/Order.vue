<template>
  <div>
    <p>商品名：{{ query.goodsName }}</p>
    <p>价格：{{ query.goodsPrice }}</p>
    <p v-if="query.status == 1">待支付</p>
    <p v-if="query.status == 0">已支付</p>
    <el-button type="button" @click="reduceProperty(query.uid, query.goodsId)"
      >立即支付</el-button
    >
    <el-button type="button" @click="toRef()">回主页</el-button>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import goodsList from "../api/miaosha/miaoshagoods.js";
import { reactive, ref } from "vue";
import { ElMessageBox } from "element-plus";
export default {
  setup() {
    const router = useRouter();
    const uid = router.currentRoute.value.query.uid;
    const goodsId = router.currentRoute.value.query.goodsId;
    const query = reactive({
      goodsName: "",
      goodsPrice: "",
      status: "",
      uid: "",
      goodsId: "",
    });
    query.goodsId = goodsId;
    //获取订单信息
    function getInfo(uid, goodsId) {
      goodsList.orderInfoBy(uid, goodsId).then((res) => {
        query.goodsName = res.data.orderInfo.goodsName;
        query.goodsPrice = res.data.orderInfo.goodsPrice;
        query.status = res.data.orderInfo.status;
        query.uid = router.currentRoute.value.query.uid;
      });
    }
    //扣钱
    function reduceProperty(uid, goodsId) {
      goodsList.reduceProperty(uid, goodsId).then((res) => {
        var status = res.data.questionStatus;
        if (status == 5000) {
          //证明余额不足 扣钱失败
          ElMessageBox.alert("余额不足");
        } else if (status == 2001) {
          //证明已经支付过
          ElMessageBox.alert("请不要重复支付");
        } else {
          ElMessageBox.alert("支付成功");
          window.location.reload()
        }
      });
    }
    //回主页
    function toRef() {
      router.push("/loginIndex").then(() => {
        window.location.reload();
      });
    }
    getInfo(uid, goodsId);
    return { query, reduceProperty, toRef };
  },
};
</script>

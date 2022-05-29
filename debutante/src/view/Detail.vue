<template>
  <div>
    <div>
      <el-card
        style="
           {
            padding: 0px;
          }
        "
      >
        <img v-bind:src="query.goodsImg" width="200" height="300" />
        <p>
          {{ query.goodsName }}
          原价：{{ query.goodsPrice }} 现价：{{ query.miaoshaPrice }}
        </p>
      </el-card>
    </div>
    <div>
      <el-card>
        <el-button type="info" @click="toRefList()">回到商品列表</el-button>
        <el-button type="danger" @click="costMoney()">抢购</el-button>
        <el-button type="info" @click="toRef()">订单</el-button>
      </el-card>
      <el-tooltip content="微信号:foreverqisui" effect="customized">
        <el-button>遇到任何问题请联系作者</el-button>
      </el-tooltip>
    </div>
  </div>
</template>


<style>
.el-popper.is-customized {
  /* Set padding to ensure the height is 32px */
  padding: 6px 12px;
  background: linear-gradient(90deg, rgb(159, 229, 151), rgb(204, 229, 129));
}
.el-popper.is-customized .el-popper__arrow::before {
  background: linear-gradient(45deg, #b2e68d, #bce689);
  right: 0;
}
</style>
<script>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import goodsList from "../api/miaosha/miaoshagoods.js";
import cookie from "js-cookie";
import { ElMessageBox, ElMessage } from "element-plus";

export default {
  setup() {
    const query = reactive({
      list: [],
      goodsName: "",
      goodsPrice: "",
      stockCount: "",
      miaoshaPrice: "",
    });
    var uid = "";
    //通过路由传递id参数
    const router = useRouter();
    const goodsId = router.currentRoute.value.query.id;
    //通过goodsId获取信息
    function getInfo(goodsId) {
      goodsList.getdetailByGoosId(goodsId).then((res) => {
        const info = res.data.good;
        query.goodsName = info.goodsName;
        query.goodsPrice = info.goodsPrice;
        query.stockCount = info.stockCount;
        query.miaoshaPrice = info.miaoshaPrice;
        query.goodsImg = info.goodsImg;
      });
    }
    //抢购
    function costMoney() {
      goodsList.doSekill(uid, goodsId).then((res) => {
        if (res.data.questionStatus == 4000) {
          ElMessageBox.alert("商品已经秒空");
        } else if (res.data.questionStatus == 5000) {
          ElMessageBox.alert("你已经购买过了，请不要重复购买");
        } else if (res.data.questionStatus == 3000) {
          
          goodsList.getSekillResult(uid, goodsId).then((res) => {
            if (res.data.questionStatus == 3005) {
              setTimeout(() => {
                ElMessageBox.alert("恭喜抢到,请去订单页支付");
              }, 3000);
              ElMessage.warning("排队中");
            } else {
              ElMessageBox.alert("秒杀失败,请检查订单是否已经购买过");
            }
          });
        }
      });
    }
    //通过cookie做二次 判断 并获得用户信息
    //根据cookie中的信息获取用户信息
    function getUserInfoByToken() {
      let cookieInfo = cookie.get("userInfo");
      if (cookieInfo) {
        const info = JSON.parse(cookieInfo);
        uid = info.uid;
      }
    }
    function getResult(uid, goodsId) {
      goodsList.getSekillResult(uid, goodsId).then((res) => {});
    }
    // 跳转至订单详情页
    function toRef() {
      router
        .push({ path: "/to_order", query: { uid: uid, goodsId: goodsId } })
        .then(() => {
          window.location.reload();
        });
    }
    //回到列表页
    function toRefList() {
      router.push({ path: "/to_miaoshagoods" }).then(() => {
        window.location.reload();
      });
    }
    getInfo(goodsId);
    getUserInfoByToken();
    return { query, costMoney, toRef, toRefList };
  },
};
</script>
import request from '../../utils/request';

export default {
    // 登录
    goodsList() {
        return request({
            url: `/admin/debutante/goods/findGoodsList`,
            method: 'GET',
        })
    },
    // 根据goodsId查询信息
    getdetailByGoosId(goodsId) {
        return request({
            url: `/admin/debutante/goods/detailById/${goodsId}`,
            method: 'GET',
        })
    },
    // 做秒杀功能 下订单 减库存
    doSekill(uid, goodsId) {
        return request({
            url: `/admin/debutante/miaoshaOptimization/seckill/${goodsId}/${uid}`,
            method: 'POST',
        })
    },
    // 秒杀优化功能 下订单 减库存
    getSekillResult(uid, goodsId) {
        return request({
            url: `/admin/debutante/miaoshaOptimization/to_result?uid=${uid}&goodsId=${goodsId}`,
            method: 'GET',
        })
    },
    // 做订单查询
    orderInfoBy(uid, goodsId) {
        return request({
            url: `/admin/debutante/order/getOrderInfo?uid=${uid}&goodsId=${goodsId}`,
            method: 'GET',
        })
    },
    // 支付后扣钱
    reduceProperty(uid, goodsId) {
        return request({
            url: `/admin/debutante/reduceProperty/${uid}/${goodsId}`,
            method: 'POST',
        })
    },
}
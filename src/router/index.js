import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
    {
        //路径选择
        path: "/",
        //路径名称
        name: "Login",
        //组件导入
        component: () => import("../view/Login.vue"),
    },
    {
        //隐藏路由方式
        path: '/loginIndex',
        name: "loginIndex",
        component: () => import("../view/Index.vue"),
        meta: { title: '数据回显' },
        hidden: true
    },
    //404报错
    {
        path: "/:catchAll(.*)",
        name: "404",
        component: () => import("../components/404.vue"),
    },
    //注册页面
    {
        path: "/form",
        name: "form",
        component: () => import("../view/Form.vue"),
    },
    //测试页面
    {
        path: "/test",
        name: "test",
        component: () => import("../components/ShengDanOldMan.vue"),
    },
    //排行榜页面
    {
        path: "/uploadForm",
        name: "uploadForm",
        component: () => import("../view/Leaderboard.vue"),
    },
    //秒杀商品页面
    {
        path: "/to_miaoshagoods",
        name: "miaoshagoods",
        component: () => import("../view/GoodsList.vue"),
    },
    //秒杀详情页
    {
        path: "/to_detail",
        name: "to_detail",
        component: () => import("../view/Detail.vue"),
    },
    //订单详情页
    {
        path: "/to_order",
        name: "to_order",
        component: () => import("../view/Order.vue"),
    },
     //论坛详情页
     {
        path: "/to_forum",
        name: "to_forum",
        component: () => import("../view/ForumModel/Forum.vue"),
    },
    // 用户信息
    {
        //路径选择
        path: "/forum/userInfo",
        //路径名称
        name: "forumUserInfo",
        //组件导入
        component: () => import("../view/ForumModel/userInfo.vue"),
    },
    // 文章描述
    {
        //路径选择
        path: "/forum/description",
        //路径名称
        name: "forumDescription",
        //组件导入
        component: () => import("../view/ForumModel/Description.vue"),
    },
    // 发布帖子
    {
        //路径选择
        path: "/forum/publishWord",
        //路径名称
        name: "forumPublishWords",
        //组件导入
        component: () => import("../view/ForumModel/PublishWord.vue"),
    },
    {
        //路径选择
        path: "/forum/message",
        //路径名称
        name: "message",
        //组件导入
        component: () => import("../view/ForumModel/Message.vue"),
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;
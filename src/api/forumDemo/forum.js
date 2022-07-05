import request from '../../utils/requestFourm';

export default {
    // 发布帖子
    publishCommont(title, message) {
        return request({
            url: `/admin/ForumDemo/discuss-post/publishPosts?title=${title}&message=${message}`,
            method: 'POST',
            data: title, message
        })
    },
    // 帖子详情
    showCommont(title, userId) {
        return request({
            url: `/admin/ForumDemo/discuss-post/findByToken/toShow?title=${title}&userId=${userId}`,
            method: 'GET',
        })
    },
    //联合查询获取信息
    findAll() {
        return request({
            url: `/admin/ForumDemo/discuss-post/findAll`,
            method: 'GET',
        })
    },
    //根据discuss表的id匹配查询comment的评论数据
    findCommentById(id) {
        return request({
            url: `/admin/ForumDemo/discuss-post/findCommentById?id=${id}`,
            method: 'GET',
        })
    },
    //回复作者评论
    replayAuthor(entityId, content) {
        return request({
            url: `/admin/ForumDemo/discuss-post/replayAuthor?entityId=${entityId}&content=${content}`,
            method: 'POST',
        })
    },
    //点赞操作
    like(entityType,entityId) {
        return request({
            url: `/admin/ForumDemo/discuss-post/like?entityType=${entityType}&entityId=${entityId}`,
            method: 'POST',
        })
    },
    //点赞数量查询
    likeCount(entityType,entityId) {
        return request({
            url: `/admin/ForumDemo/discuss-post/like/count?entityType=${entityType}&entityId=${entityId}`,
            method: 'Get',
        })
    },


}



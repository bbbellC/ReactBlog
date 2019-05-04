const { decodeToken, checkAuth } = require('../lib/token')
const { sequelize } = require('../db');
const model = require('../model');
//let Article = model.Article;
//let Category = model.Category;
let Comment = model.Comment;
let Reply = model.Reply;
//let Tag = model.Tag;
let User = model.User;

// 查询某文章下的所有评论
const getCommentList = async articleId =>
  Comment.findAndCountAll({
    where: { articleId },
    attributes: ['id', 'userId', 'content', 'createdAt'],
    include: [
      {
        model: Reply,
        attributes: ['id', 'userId', 'content', 'createdAt'],
        include: [{ model: User, as: 'user', attributes: ['username'] }]
      },
      { model: User, as: 'user', attributes: ['username'] }
    ],
    order: [['createdAt', 'DESC']]
  })

// 创建评论
const createComment = async (ctx) => {
  //console.log(ctx.request.body);
  //console.log(decodeToken(ctx));
  const { userId } = decodeToken(ctx)
  const { articleId, content } = ctx.request.body
  await Comment.create({ userId, articleId, content })
  const data = await getCommentList(articleId)
  ctx.body = { code: 200, message: 'success', ...data }
};

// 创建回复
const createReply = async (ctx) => {
  //console.log(ctx)
  const { userId } = decodeToken(ctx)
  const { articleId, content, commentId } = ctx.request.body
  await Reply.create({ userId, articleId, content, commentId })
  const data = await getCommentList(articleId)
  ctx.body = { code: 200, message: 'success', ...data }
}

// 删除评论、回复
const del = async (ctx) => {
  const isAuth = checkAuth(ctx)
  const { commentId, replyId } = ctx.query
  if (isAuth) {
    if (commentId) {
      await sequelize.query(
        `delete comment, reply from comment left join reply on comment.id=reply.commentId where comment.id=${commentId}`
      )
      ctx.body = { code: 200, message: '成功删除该评论！' }
    } else if (replyId) {
      await Reply.destroy({ where: { id: replyId } })
      ctx.body = { code: 200, message: '成功删除该回复！' }
    } else {
      ctx.body = { code: 400, message: 'id 不能为空！' }
    }
  }
};

const getAboutComments = async (ctx) => {
  const data = await getCommentList(0)
  ctx.body = { code: 200, ...data }
}

module.exports = {
    'POST /comment': createComment,
    'DELETE /comment/del': del,
    'POST /reply': createReply,
    'DELETE /reply/del': del,
    'GET /comment/about': getAboutComments
    //'GET /comment/getList': getArticleList,
};


const model = require('../model');
const { sequelize } = require('../db');
let Article = model.Article;
let Category = model.Category;
//let Comment = model.Comment;
//let Reply = model.Reply;
let Tag = model.Tag;
//let User = model.User;

// 获取tags列表
const getTags = async (ctx) => {
  const data = await Tag.findAll({
    attributes: ['name', [sequelize.fn('COUNT', sequelize.col('name')), 'count']],
    group: 'name'
  })
  ctx.body = { code: 200, data }
};

// 通过标签获取该标签的所有文章
const getArticlesByTag = async (ctx) => {
  console.log("in getArticlesByTag.. ctx = ")
  console.log(ctx)
  let { page = 1, pageSize = 15, name } = ctx.query,
    offset = (page - 1) * pageSize

  pageSize = parseInt(pageSize)

  const data = await Article.findAndCountAll({
    attributes: ['id', 'title', 'createdAt'],
    include: [{ model: Tag, where: { name } }, { model: Category }],
    offset,
    limit: pageSize,
    order: [['createdAt', 'DESC']],
    distinct: true
  })

  ctx.body = { code: 200, ...data }
}

module.exports = {
    'GET /tags/getList': getTags,
    'GET /tags/getArticles': getArticlesByTag
};


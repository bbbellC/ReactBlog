const model = require('../model');
const { sequelize } = require('../db');
let Article = model.Article;
let Category = model.Category;
let Tag = model.Tag;

// 获取tags列表
const getTags = async (ctx) => {
  const data = await Tag.findAll({
    attributes: ['name', [sequelize.fn('COUNT', sequelize.col('name')), 'count']],
    group: 'name'
  })
  ctx.body = { code: 200, data }
};

// 获取categories列表
const getCategories = async (ctx) => {
  const data = await Category.findAll({
    attributes: ['name', [sequelize.fn('COUNT', sequelize.col('name')), 'count']],
    group: 'name'
  })
  ctx.body = { code: 200, data }
}

// 通过标签获取该标签的所有文章
const getArticlesByTag = async (ctx) => {
  let { page = 1, pageSize = 15, name } = ctx.query,
    offset = (page - 1) * pageSize
  pageSize = parseInt(pageSize)
  const data = await Article.findAndCountAll({
    attributes: ['id', 'title', 'createdAt'],
    // include: [{ model: Tag, where: { name } }, { model: Category }],
    include: [{ model: Tag, attributes: ['name'], where: { name } }],
    offset,
    limit: pageSize,
    order: [['createdAt', 'DESC']],
    distinct: true
  })
  ctx.body = { code: 200, ...data }
}

// 通过类别获取该类别的所有文章
const getArticlesByCate = async (ctx) => {
  let { page = 1, pageSize = 15, name } = ctx.query,
    offset = (page - 1) * pageSize
  pageSize = parseInt(pageSize)
  const data = await Article.findAndCountAll({
    attributes: ['id', 'title', 'createdAt'],
    include: [{ model: Category, attributes: ['name'], where: { name } }],
    offset,
    limit: pageSize,
    order: [['createdAt', 'DESC']],
    distinct: true
  })
  ctx.body = { code: 200, ...data }
}

module.exports = {
    'GET /tags/getList': getTags,
    'GET /tags/getArticles': getArticlesByTag,
    'GET /categories/getList': getCategories,
    'GET /categories/getArticles': getArticlesByCate
};


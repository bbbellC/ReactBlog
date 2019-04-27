const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const model = require('../model');
let Article = model.Article;
let Category = model.Category;
let Comment = model.Comment;
let Reply = model.Reply;
let Tag = model.Tag;
let User = model.User;

//查询文章列表
const getArticleList = async (ctx) => {
    console.log("in getArticleList..")
    console.log(ctx.query);
    let { page = 1, pageSize = 10, title, tag, category, rangTime } = ctx.query,
        offset = (page - 1) * pageSize,
        //titleFilter = title ? { title: { $like: `%${title}%` } } : {}
        titleFilter = title ? { title: { [Op.like]: `%${title}` } } : {}
    // const tagFilter = tag ? { name: { $like: `%${tag}%` } } : {}
    // const categoryFilter = category ? { name: { $like: category } } : {}
    const tagFilter = tag ? { name: tag } : {}
    const categoryFilter = category ? { name: category } : {}

console.log(titleFilter)
    //console.log("title = \n"+title+"tag = \n"+tag+"category = \n"+category);

    pageSize = parseInt(pageSize) // 处理 pageSize

    const data = await Article.findAndCountAll({
        where: titleFilter,
        include: [
            { model: Tag, attributes: ['name'], where: tagFilter },
            { model: Category, attributes: ['name'], where: categoryFilter },
            {
                model: Comment,
                attributes: ['id'],
                include: [{ model: Reply, attributes: ['id'] }]
            }
        ],
        offset, //开始的数据索引
        limit: pageSize,    //每页限制返回的数据条数
        order: [['createdAt', 'DESC']],
        row: true,
        distinct: true
    })
    console.log(data)
    ctx.body = { code: 200, ...data }
};

// 获取文章详情
const getArticleById = async (ctx) => {
    const id = ctx.params.id
console.log("get getArticleById...");
//console.log(id);
    const data = await Article.findOne({
        where: { id },
        include: [
            { model: Tag, attributes: ['name'] },
            { model: Category, attributes: ['name'] },
            {
                model: Comment,
                attributes: ['id', 'userId', 'content', 'createdAt'],
                include: [
                    {
                        model: Reply,
                        attributes: ['id', 'userId', 'content', 'createdAt'],
                        include: [{ model: User, as: 'user', attributes: ['username'] }]
                    },
                    { model: User, as: 'user', attributes: ['username'] }
                ]
            }
        ],
        order: [[Comment, 'createdAt', 'DESC']],
        row: true
    })

    ctx.body = { code: 200, data }
};

// 创建文章
const create = async (ctx) => {
    const isAuth = checkAuth(ctx)
    if (isAuth) {
	const { title, content, categories, tags } = ctx.request.body
    	const tagList = tags.map(t => ({ name: t }))
    	const categoryList = categories.map(c => ({ name: c }))
    	const data = await ArticleModel.create(
    	    { title, content, tags: tagList, categories: categoryList },
    	    { include: [TagModel, CategoryModel] }
    	)
    	ctx.body = { code: 200, message: '成功创建文章', data }
    }
};


module.exports = {
    'GET /article/getList': getArticleList,
    'GET /article/:id': getArticleById
};


// 导入koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示:
const Koa = require('koa');
// 注意require('koa-router')返回的是函数:
//const router = require('koa-router')();
// 引入koa-bodyParser处理post请求以解析request的body
const bodyParser = require('koa-bodyparser');
//
const controller = require('./controller');
//
const cors = require('koa2-cors')

// 创建一个Koa对象表示web app本身:
const app = new Koa();

const model = require('./model');
let Article = model.Article;
let Category = model.Category;
let Comment = model.Comment;
let Reply = model.Reply;
let Tag = model.Tag;
let User = model.User;



// 对于任何请求，app将调用该异步函数处理请求：
// log request URL:
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});

app.use(cors());
/*app.use(cors({
    origin: 'http://localhost:3000'
}));*/
// add koa-bodyparser: (middleware must before rouuter)
app.use(bodyParser());
// add router middleware:
//app.use(router.routes());
// add controllers:
app.use(controller());
// add url-route:

//app.listen(8086, '112.74.43.202', (err) => {
app.listen(8086, (err) => {
    if (err) {
        console.error(err);
    } else {
        console.info("服务器起动成功..");
    }
})
console.log('app started at port 8086...');
/*
(async () => {
  const tagFilter = {}
  const categoryFilter = {}
  var articles = await Article.findAndCountAll({
      include: [
          { model: Tag, attributes: ['name'], where: tagFilter },
          { model: Category, attributes: ['name'], where: categoryFilter },
          {
              model: Comment,
              attributes: ['id'],
              include: [{ model: Reply, attributes: ['id'] }]
          }
      ],
      offset: 0,
      limit: 10,
      order: [['createdAt', 'DESC']],
      row: true,
      distinct: true
  });
    console.log("flag1")
    console.log(JSON.stringify(articles));
    console.log("flag2")
    // 查询数据
})();*/

/*
var articles = await Article.findAndCountAll({
    include: [
        { model: Tag, attributes: ['name'] },
        { model: Category, attributes: ['name'] },
        {
            model: Comment,
            attributes: ['id'],
            include: [{ model: Reply, attributes: ['id'] }]
        }
    ],
    offset: 0,
    limit: 10,
    order: [['createdAt', 'DESC']],
    row: true,
    distinct: true
});
*/

/*instance.get('/acticle/getList')
.then(function (response) {
    console.log("then");
    console.log(response.data);
})
.catch(function (error) {
    console.log("catch");
    console.log(error);
});*/


/*
const Sequelize = require('sequelize')
const config = require('./server/config')
const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config.options
)
// 在端口3000监听:
app.listen(3306, () => {
    sequelize
        .sync({ force: false, logging: false }) // If force is true, each DAO will do DROP TABLE IF EXISTS ..., before it tries to create its own table
        .then(() => {
            // require('./initData')()

            console.log('sequelize connect success')
            console.log('sever listen on http://112.74.43.202:3306')
        })
        .catch(err => {
            console.log(err)
        })
});*/

/*
const Article = require('./models/Article')
(async () => {
    //add
    /*await Article.create({
        title:`cute me`,
        content:`test add article!!!`
    });
    await Category.create({
        name:`类别1`,
        articleId:1
    });*/
    //console.log("created..  "+JSON.stringify(a1));
    // 查询数据
    /*var articles = await Article.findAll({
        where: {
            id: 3
        }
    });

    console.log(`find ${articles.length} articles:`);
    for (let p of articles) {
        console.log(JSON.stringify(p));
    }
})();*/


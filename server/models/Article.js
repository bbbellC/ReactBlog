// 遵守规范,通过db.js间接地定义Model映射数据库表
const db = require('../db');
/*module.exports = db.defineModel('article', {
    title: db.STRING,
    content: db.TEXT
});*/
const Article = db.defineModel('article', {
    title: db.STRING,
    content: db.TEXT
});
Article.associate = models => {
    Article.hasMany(models.Tag)
    Article.hasMany(models.Category)
    Article.hasMany(models.Comment)
}
module.exports = Article;

/*module.exports = db.defineModel('article', {
    title: db.STRING,
    content: db.TEXT,
}, {
        timestamps: false,  //关闭Sequelize的自动添加timestamp
        freezeTableName: true   //关闭默认给表名加s
    });*/

// 定义模型Pet，告诉Sequelize如何映射数据库表
/*var Article = sequelize.define('article', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    title: Sequelize.STRING,
    content: Sequelize.TEXT,
    createAt: Sequelize.DATE,
    updateAt: Sequelize.DATE,
}, {
        timestamps: false,  //关闭Sequelize的自动添加timestamp
        freezeTableName: true   //关闭默认给表名加s
    });*/
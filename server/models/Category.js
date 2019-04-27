const db = require('../db');
/*module.exports = db.defineModel('category', {
    name: db.STRING,
    articleId: db.INTEGER
});*/
const Category = db.defineModel('category', {
    name: db.STRING,
    articleId: db.INTEGER
});
Category.associate = models => {
    Category.belongsTo(models.Article);
}
module.exports = Category;
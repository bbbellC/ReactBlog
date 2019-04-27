const db = require('../db');
const model = require('../model');
let Article = model.Article;

/*module.exports = db.defineModel('tag', {
    name: db.STRING,
    articleId: {
        type: db.INTEGER,
        references: {
            model: model.Article,
            key: 'id'
        }
    }
});*/
const Tag = db.defineModel('tag', {
    name: db.STRING,
    articleId: db.INTEGER
});
Tag.associate = models => {
    Tag.belongsTo(models.Article);
}
module.exports = Tag;

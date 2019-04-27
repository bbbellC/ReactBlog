const db = require('../db');
/*module.exports = db.defineModel('comment', {
    content: db.TEXT,
    userId: db.INTEGER,
    articleId: db.INTEGER  
});*/
const Comment = db.defineModel('comment', {
    content: db.TEXT,
    userId: db.INTEGER,
    articleId: db.INTEGER
});
Comment.associate = models => {
    Comment.belongsTo(models.Article);
    Comment.belongsTo(models.User);
    Comment.hasMany(models.Reply);
}
module.exports = Comment;
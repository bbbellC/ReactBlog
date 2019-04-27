const db = require('../db');
/*module.exports = db.defineModel('reply', {
    content: db.TEXT,
    commentId: db.INTEGER,
    userId: db.INTEGER
});*/
const Reply = db.defineModel('reply', {
    content: db.TEXT,
    commentId: db.INTEGER,
    userId: db.INTEGER
});
Reply.associate = models => {
    Reply.belongsTo(models.Comment);
    Reply.belongsTo(models.User);
}
module.exports = Reply;
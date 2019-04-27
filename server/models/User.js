const db = require('../db');
/*module.exports = db.defineModel('user', {
    username: db.STRING,
    password: db.STRING
});*/
const User = db.defineModel('user', {
    username: db.STRING,
    password: db.STRING,
    auth: db.TINYINT
})
User.associate = models => {
    User.hasMany(models.Comment);
    User.hasMany(models.Reply);
}
module.exports = User;

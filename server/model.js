// 自动扫描并导入所有Model
const fs = require('fs');
const db = require('./db');

let files = fs.readdirSync(__dirname + '/models');

let js_files = files.filter((f) => {
    return f.endsWith('.js');
}, files);

module.exports = {};
let models = {}
for (let f of js_files) {
    console.log(`import model from file ${f}...`);
    let name = f.substring(0, f.length - 3);
    //module.exports[name] = require(__dirname + '/models/' + f);
    models[name] = require(__dirname + '/models/' + f);
}
Object.keys(models).forEach(modelName => {
    if (models[modelName].associate) {
        models[modelName].associate(models)
    }
})
module.exports = models
/*module.exports.sync = () => {
    db.sync();
};*/

// 导入所有Model
/*const model = require('./server/model');
let Article = model.Article;
let Tag = model.Tag;
let Category = model.Category;
let Comment = model.Comment;
let Reply = model.Reply;
let User = model.User;

Tag.belongsTo(Article);
Article.hasMany(Tag);

Category.belongsTo(Article);
Article.hasMany(Category);

Comment.belongsTo(Article);
Article.hasMany(Comment);

Comment.belongsTo(User);
User.hasMany(Comment);

Reply.belongsTo(Comment);
Comment.hasMany(Reply);

Reply.belongsTo(User);
User.hasMany(Reply);*/
// 导入所有Model
//controller-acticle
const { createToken, checkAuth } = require('../lib/token')
const model = require('../model');
let User = model.User;


// 登录
const login = async (ctx) => {
    const { username, password } = ctx.request.body
console.log("username="+username+",password="+password)
    const user = await User.findOne({ where: { username } })
    let response
    if (!user) {
      response = { code: 400, message: '用户不存在' }
    } else {
      //const isMatch = await comparePassword(password, user.password)
      const isMatch = password == user.password
      if (!isMatch) {
        response = { code: 400, message: '密码不正确' }
      } else {
        const { id, auth } = user
        const token = createToken({ username, userId: id, auth }) // 生成 token
console.log("生成 token")
console.log(token)
        response = { code: 200, message: '登录成功', username, auth: user.auth, token }
      }
    }
    ctx.body = response
};

//注册
const register = async (ctx) => {
    const { username, password } = ctx.request.body
    if (username && password) {
      const checkUser = await User.findOne({ where: { username } })
      let response
      if (checkUser) {
        response = { code: 400, message: '用户名已被注册' }
      } else {
        //const saltPassword = await encrypt(password)
        // await User.create({ username, password: saltPassword })
        await User.create({ username, password, auth:2 })
        response = { code: 200, message: '注册成功' }
      }
      ctx.body = response
    } else {
      ctx.body = { code: 400, message: '用户名或密码不能为空' }
    }
}; 

module.exports = {
    //'GET /': fn_index,
    //'POST /signin': fn_signin,
    'POST /login': login,
    'POST /register': register
};


/*
var fn_index = async (ctx, next) => {
    ctx.response.type = 'text/html';
    ctx.response.charset = "utf-8";
    ctx.response.body = `<h1>Index</h1>
        <form action="/signin" method="post">
            <p>Name: <input name="name" value="koa"></p>
            <p>Password: <input name="password" type="password"></p>
            <p><input type="submit" value="Submit"></p>
        </form>`;
};

var fn_signin = async (ctx, next) => {
    var
        name = ctx.request.body.name || '',
        password = ctx.request.body.password || '';
    console.log(`signin with name: ${name}, password: ${password}`);
    if (name === 'koa' && password === '12345') {
        ctx.response.type = 'text/html';
        ctx.response.charset = "utf-8";
        ctx.response.body = `<h1>Welcome, ${name}!</h1>`;
    } else {
        ctx.response.type = 'text/html';
        ctx.response.charset = "utf-8";
        ctx.response.body = `<h1>Login failed!</h1>
        <p><a href="/">Try again</a></p>`;
    }
};
*/

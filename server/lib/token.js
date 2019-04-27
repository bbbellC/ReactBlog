const { TOKEN_SECRET, TOKEN_EXPIRESIN } = require('../config')
const jwt = require('jsonwebtoken')

exports.createToken = info => {
  const token = jwt.sign(info, TOKEN_SECRET, { expiresIn: TOKEN_EXPIRESIN })
  console.log('generated token', token)
  return token
}

const decodeToken = ctx => {
  console.log("decodeToken")
  console.log(ctx)
  const authorizationHeader = ctx.headers['authorization']
  //console.log(authorizationHeader)
  const token = authorizationHeader.split(' ')[1] // 取到 token
  console.log("decode token=")
  console.log(token)
  return jwt.decode(token)
}

exports.decodeToken = decodeToken

exports.checkAuth = ctx => {
  const { auth } = decodeToken(ctx)
  if (auth === 1) { // 检查权限 权限 1 为博主~
    return true
  } else {
    ctx.body = { code: 401, message: '您无权限进行此操作' }
    return false
  }
}
/*
module.exports = {
  createToken: info => {
    const token = jwt.sign(info, TOKEN_SECRET, { expiresIn: TOKEN_EXPIRESIN })
    console.log('generated token', token)
    return token
  },
  decodeToken: ctx => {
	  console.log("decodeToken")
	  console.log(ctx)
    const authorizationHeader = ctx.headers['authorization']
	  //console.log(authorizationHeader)
    const token = authorizationHeader.split(' ')[1] // 取到 token
  	console.log("decode token=")
  	console.log(token)
    return jwt.decode(token)
  },
  checkAuth: ctx => {
    const { auth } = decodeToken(ctx)
    if (auth === 1) { // 检查权限 权限 1 为博主~
      return true
    } else {
      ctx.body = { code: 401, message: '您无权限进行此操作' }
      return false
    }
  }
}*/


module.exports = {
    database: 'react_blog', // 使用哪个数据库
    username: 'root', // 用户名
    password: '#', // 口令
    host: '#', // 主机名
    port: 3306, // 端口号，MySQL默认3306
    options: {
        host: '#', // 连接的 host 地址
        dialect: 'mysql', // 连接到 mysql
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        define: {
            timestamps: false, // 默认不加时间戳
            freezeTableName: true // 表名默认不加 s
        },
        //timezone: '+08:00'
    },
  SALT_WORK_FACTOR: 10, // 生成salt的迭代次数
  TOKEN_SECRET: 'react-blog',
  TOKEN_EXPIRESIN: '720h' // token 有效期
};

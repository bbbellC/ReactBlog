// 创建一个sequelize对象实例
const Sequelize = require('sequelize');
const config = require('./config');
var dateFormat = require('dateformat');

console.log('init sequelize...');

var sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: 'mysql',
    /*dialectOptions: {
        socketPath: '/tmp/mysql.sock' // 指定套接字文件路径
    },*/
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    }
});

//const ID_TYPE = Sequelize.STRING(50);

function defineModel(name, attributes) {
    var attrs = {};
    for (let key in attributes) {
        let value = attributes[key];
        if (typeof value === 'object' && value['type']) {
            value.allowNull = value.allowNull || false;
            attrs[key] = value;
        } else {
            attrs[key] = {
                type: value,
                allowNull: false
            };
        }
    }
    /*attrs.id = {
        //type: ID_TYPE,
        type: Sequelize.INTEGER, 
        primaryKey: true,
        autoIncrement: true
    };
    attrs.createdAt = {
        type: Sequelize.DATE,
        get() {
            return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss');
        }
    };
    attrs.updatedAt = {
        type: Sequelize.DATE,
        get() {
            return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss');
        }
    };*/
    /*attrs.version = {
        type: Sequelize.BIGINT,
        allowNull: false
    };*/
    return sequelize.define(name, attrs, {
        tableName: name,
        timestamps: true,  //Sequelize的自动添加timestamp
        deletedAt: false,
        freezeTableName: true,   //关闭默认给表名加s
        hooks: {
            beforeValidate: function (obj) {
                //let now = Date.now();
                // sequelize 存取时间是按照 UTC标准时间,要想存储北京时间设置timezone为-8:00
                let now = dateFormat(Date.now() - (-8 * 3600 * 1000), "yyyy.mm.dd HH:MM:ss")   
                console.log(now);
                if (obj.isNewRecord) {
                    obj.createdAt = now;
                    obj.updatedAt = now;
                    //obj.version = 0;
                } else {
                    obj.updatedAt = now;
                    //obj.version++;
                }
            }
        }
    });
}

const TYPES = ['STRING', 'INTEGER', 'TINYINT', 'BIGINT', 'TEXT', 'DOUBLE', 'DATEONLY', 'BOOLEAN'];

var exp = {
    defineModel: defineModel,
    sync: () => {
        // only allow create ddl in non-production environment:
        if (process.env.NODE_ENV !== 'production') {
            sequelize.sync({ force: true });
        } else {
            throw new Error('Cannot sync() when NODE_ENV is set to \'production\'.');
        }
    }
};

for (let type of TYPES) {
    exp[type] = Sequelize[type];
}

//exp.ID = ID_TYPE;
//exp.generateId = generateId;

exp.sequelize = sequelize;

module.exports = exp;

const dbConfig = require('../config/db.config');

const {Sequelize, DataTypes} = require('sequelize');

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorsAliases: false,

        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle

        }
    }
)

sequelize.authenticate()
.then(() => {
    console.log('connected..')
})
.catch(err => {
    console.log('Error'+ err)
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.catering = require('./cateringModel')(sequelize, DataTypes)
db.dress = require('./dressModel.js')(sequelize, DataTypes)
db.registered = require('./regModel.js')(sequelize, DataTypes)
db.hall = require('./hallModel.js')(sequelize, DataTypes)
db.salon = require('./salonModel')(sequelize, DataTypes)
db.vehicle = require('./vehicleModel')(sequelize, DataTypes)
db.feedback = require('./feedbackModel')(sequelize, DataTypes)
db.order = require('./orderModel')(sequelize, DataTypes)

db.sequelize.sync({ force: false })
.then(() => {
    console.log('yes re-sync done!')
})

db.registered.hasMany(db.order);
db.order.belongsTo(db.registered);

db.catering.hasMany(db.order);
db.order.belongsTo(db.catering);

db.hall.hasMany(db.order);
db.order.belongsTo(db.hall);

db.dress.hasMany(db.order);
db.order.belongsTo(db.dress);

db.salon.hasMany(db.order);
db.order.belongsTo(db.salon);

db.vehicle.hasMany(db.order);
db.order.belongsTo(db.vehicle);

db.feedback.hasMany(db.order);
db.order.belongsTo(db.feedback);
module.exports = db

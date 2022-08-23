const { Sequelize } = require('sequelize');

// Option 3: Passing parameters separately (other dialects)
// 1. xây dựng hàm kiểm tra kết nối đến database hoidanit
const sequelize_hoidanit = new Sequelize('hoidanit', 'root', null, {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});
let connectDB = async () => {
    try {
        await sequelize_hoidanit.authenticate();
        console.log('Connection has been established successfully hoi dan IT.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
module.exports = connectDB;

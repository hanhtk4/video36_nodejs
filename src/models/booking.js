'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Booking extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here --chỉ ra các mối quan hệ giữa các bảng
        }
    };
    //  tạo bảng user:  email, firstName,lastName,password,address,phonenumber,gender,roleid,image
    Booking.init({
        statusId: DataTypes.STRING,
        doctorId: DataTypes.INTEGER,
        patientid: DataTypes.INTEGER,
        date: DataTypes.DATE,
        timeType: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Booking',
    });
    return Booking;
};
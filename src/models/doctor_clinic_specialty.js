'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Doctor_clinic_specialties extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here --chỉ ra các mối quan hệ giữa các bảng
        }
    };
    Doctor_clinic_specialties.init({
        doctorId: DataTypes.STRING,
        clinicId: DataTypes.STRING,
        specialtyId: DataTypes.STRING,
    },
        {
            sequelize,
            modelName: 'Doctor_clinic_specialties',
        });
    return Doctor_clinic_specialties;
};
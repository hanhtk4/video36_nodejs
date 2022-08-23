'use strict';
// email: DataTypes.STRING,
// firstName: DataTypes.STRING,
// lastName: DataTypes.STRING,
// password: DataTypes.STRING,
// address: DataTypes.STRING,
// gender: DataTypes.BOOLEAN,
// roleid: DataTypes.STRING,
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      email: 'admin@gmail.com',
      firstName: 'HANH',
      lastName: 'NGUYEN',
      password: '123456',
      gender: 1,
      roleId: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};

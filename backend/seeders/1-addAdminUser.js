'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const passwordHash = require("password-hash");
    let adminPass = passwordHash.generate("admin")
    return queryInterface.bulkInsert('Users', [{
      email: 'admin@gmail.com',
      password: adminPass,
      role: true,
      // artist: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};

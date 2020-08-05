'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn("Skills", "HackerId", {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: "Hackers",
            key: "id"
          }
        }),
        queryInterface.addColumn("Votes", "UserId", {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: "Users",
            key: "id"
          }
        }),
        queryInterface.addColumn("Votes", "HackerId", {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: "Hackers",
            key: "id"
          }
        }),
      ]);
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn("Skills", "HackerId"),
        queryInterface.removeColumn("Votes", "UserId"),
        queryInterface.removeColumn("Votes", "HackerId"),
      ]);
    });
  }
};
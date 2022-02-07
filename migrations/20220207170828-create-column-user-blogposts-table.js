'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('BlogPosts', 'user', {
      type: Sequelize.INTEGER,
      defaultValue: 1,
      references: {
        model: 'Users',
        key: 'id',
      },
      OnUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('BlogPosts', 'user');
  },
};

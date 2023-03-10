'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.renameColumn('Users', 'emailId', 'email');
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.renameColumn('Users', 'email', 'emailId');
  }
};

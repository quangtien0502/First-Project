'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      email: 'ready@gmail.com',
      password: '123456',
      firstName: 'Harrison',
      lastName: 'Wells',
      address: 'Viet Phu Thanh Chuong',
      gender: 1,
      roleId: 'ROLE',
      positionId: 'R1',
      image: 'Bac Si Tien',
      createdAt: new Date(),
      updatedAt: new Date()

    }]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};

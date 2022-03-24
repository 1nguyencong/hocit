'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // address: DataTypes.STRING,
    // discription: DataTypes.STRING,
    // image: DataTypes.STRING

    await queryInterface.createTable('clinics', {

      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      address: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      discription: {
        type: Sequelize.TEXT
      },
      image: {
        type: Sequelize.STRING
      },
     
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('clinics');
  }
};
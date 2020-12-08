const bcrypt = require('bcrypt')
const randomstring = require("randomstring");

module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert({
          tableName: 'users',
          schema: 'public'
        },
        [
            {
                email: 'admin@mail.com',
                password: bcrypt.hashSync("password", 10),
                fullName: 'Admin',
                authKey: randomstring.generate(),
                isActive: true,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ], {})
    },
  
    down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete({
        tableName: 'users',
        schema: 'public'
      }, null, {});
  
    }
  };
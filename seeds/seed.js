const sequelize = require('../config/connection');

const {Department,Roll,Employee} = require('../models');

const departmentSeedData = require('./departmentSeedData.json');

async function seedDataBase() {
    await sequelize.sync({force:true});
    await Department.bulkCreate(departmentSeedData);
}

seedDataBase();
const sequelize = require('../config/connection');

const {Department,Roll,Employee} = require('../models');

const departmentSeedData = require('./departmentSeedData.json');
const rollSeedData = require('./rollSeedData.json');
const employeeSeedData = require('./employeeSeedData.json');

async function seedDataBase() {
    await sequelize.sync({force:true});
    await Department.bulkCreate(departmentSeedData);
    await Roll.bulkCreate(rollSeedData);
    await Employee.bulkCreate(employeeSeedData);
    // for(let i = 0; i < 3; i++){
    //     //Create lead roll
    //     let rollData = rollSeedData[i*2];
    //     rollData['department_id'] = i+1;
    //     let currentRoll = await Roll.create(rollData);
    //     //Create Lead Employee to match current roll
    //     rollData = rollSeedData[i*2+1];
    //     rollData['department_id'] = i+1;
    //     await Roll.create(rollData);
        
    // }
}

seedDataBase();
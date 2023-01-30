const {Department,Roll,Employee} = require('../models');
const cTable = require('console.table');
const sequelize = require('../config/connection');

const getAllDepartments = () => {
    return new Promise(async (resolve, reject) => {
        const departments = JSON.parse(JSON.stringify(await Department.findAll()));
        resolve(departments);
    })
}

const get



// getAllDepartments();
module.exports = {getAllDepartments};
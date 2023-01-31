const {Department,Roll,Employee} = require('../models');
const cTable = require('console.table');
const sequelize = require('../config/connection');

/**
 * This promise returns all of the departments in the database
 * @returns {Promise} The promise of all of the departments in the database
 */
const getAllDepartments = () => {
    return new Promise(async (resolve, reject) => {
        const departments = JSON.parse(JSON.stringify(await Department.findAll()));
        resolve(departments);
    })
}

/**
 * The 
 * @param {number} id The id of the department you want
 * @returns The promise of the departmet that matches the id
 */
const getDepartment = (id) => {
    return new Promise(async (resolve,reject) => {
        const departmentData = await Department.findByPk(id)
        const department = JSON.parse(JSON.stringify(departmentData))
        console.table(department);
        resolve(department);
    });
}

const addDepartment = (departmentName) => {
    return new Promise(async (resolve, reject) => {
        try{
            await Department.create(departmentName);
            resolve(`Successfully Created New Department`);
        } catch (err) {
            reject(err);
        }
    })
}



// getAllDepartments();
module.exports = {getAllDepartments,getDepartment,addDepartment};
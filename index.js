const cTable = require('console.table');
const inquirer = require('inquirer');
const { getDepartment, getAllDepartments, addDepartment } = require('./src/departmentQueryFunctions');

async function test(){
    //test addDepartment function
    console.log(await addDepartment({name: "Software"}));
}
test();
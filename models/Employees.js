const db = require('../config/connection');
const {Table} = require('../src/Table');
const {getTableInfo} = require('../src/ask');
const inquirer = require('inquirer');

const Employee = function(){
    const name = 'employees'
    return {
        ...Table(name),
        getData: async () => {
            const [data,metaData] = await db.query(`SELECT employees.id, employees.first_name, employees.last_name, rolls.title as 'Roll', employees.manager_id FROM employees INNER JOIN rolls on employees.roll_id = rolls.id ORDER BY employees.id`);
            return data;
        },
        create: async (newData) => {
            let keys = Object.keys(newData)
            const values = [];
            for (let i = 0; i<keys.length; i++){
                let {[keys[i]]: value} = newData;
                if(isNaN(value)){
                    value = '"' + value + '"';
                }
                values.push(value);
            }
            // console.log(`INSERT INTO ${name} (${keys}) VALUES (${values});`)
            await db.query(`INSERT INTO ${name} (${keys}) VALUES (${values});`);
            const [data,metaData] = await db.query(`SELECT employees.id, employees.first_name, employees.last_name, rolls.title as 'Roll', employees.manager_id FROM employees INNER JOIN rolls on employees.roll_id = rolls.id ORDER BY employees.id`);
            return data;
        },
        askInfo: async () => {
            const keys = ['id','first_name','last_name','roll_id','manager_id'];
            const [rollData,rollMetaData] = await  db.query('SELECT * FROM rolls');
            const rolls = rollData.map(roll => {
                return roll.title
            })
            // console.log(rolls);
            const answer = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'first_name',
                    message: "What is the new employee's first name?",
                    validate(answer){
                        return new Promise((resolve, reject) => {
                            if(!answer){
                                reject(new Error('Expected first name to be a non-emtpy string'));
                            }
                            resolve(true);
                        })
                    }
                },
                {
                    type: "input",
                    name: "last_name",
                    message: "What is the new employee's last name?",
                    validate(answer){
                        return new Promise((resolve,reject)=> {
                            if(!answer){
                                reject(new Error('Expected last name to be a non-empty string'))
                            }
                            resolve(true);
                        })
                    }
                },
                {
                    type: "list",
                    name: "roll",
                    message: "What is the new employee's roll?",
                    choices: rolls
                }
            ]);
            const [rollInfo,metaData] = await db.query(`SELECT * FROM rolls WHERE title = '${answer.roll}'`) 
            // console.log(rollInfo[0].id % 10);
            if(rollInfo[0].id % 10){
                const multiplier = Math.floor(rollInfo[0].id / 10)
                // console.log(multiplier);
                const [managerData,metaData] = await db.query(`SELECT * FROM employees WHERE roll_id = ${multiplier*10}`)
                const managers = managerData.map(manager => {
                    return `Name: ${manager.first_name} ${manager.last_name} ID: ${manager.id}`
                })
                // console.log(managers)
                const manager = await inquirer.prompt([{
                    type: 'list',
                    name: 'info',
                    message: 'Which manager is this new employee under?',
                    choices: managers
                }])
                const id = manager.info.match(/\d+/);
                return {
                    first_name: answer.first_name,
                    last_name: answer.last_name,
                    roll_id: rollInfo[0].id,
                    manager_id: id[0]
                }
            } else {
                return {
                    first_name: answer.first_name,
                    last_name: answer.last_name,
                    roll_id: rollInfo[0].id
                }
            }
        },
        getManagers: async () =>{

        }
    }
}

const Employees = Employee();

module.exports = Employees;
const inquirer = require('inquirer');
const db = require('../config/connection');
const {Table} = require('../src/Table');
const {getTableInfo} = require('../src/ask');

const Department = function(table_name){
    const name = 'departments'
    // console.log(Table(name));
    return {
        ...Table(name),
        getData: async () => {
            const [data,metaData] = await db.query(`SELECT * FROM ${name};`);
            return data;
        },
        create: async (newData) => {
            const keys = Object.keys(newData)
            const values = [];
            for (let i = 0; i<keys.length; i++){
                let {[keys[i]]: value} = newData;
                if(isNaN(value)){
                    value = '"' + value + '"';
                    // console.log(value);
                }
                values.push(value);
            }
            [match,matchMetaData] = await db.query(`SELECT ${keys[0]} FROM ${name} WHERE ${keys[0]} = ${values[0]}`)
                // console.log(match);
            if(match[0]){
                console.log(`The ${name.split('s')[0]} '${match[0].name}' already exists in ${name}!\nPlease try again.`);
                return;
            }
            console.log(`INSERT INTO ${name} (${keys}) VALUES (${values});`)
            await db.query(`INSERT INTO ${name} (${keys}) VALUES (${values});`);
            const [data,metaData] = await db.query(`SELECT * FROM ${name};`);
            return data;
        },
        askInfo: async () => {
            const table = await getTableInfo(name)
            return await table.askInfo();
        },
    }
}

const Departments = Department();

module.exports = Departments;

// async function test(){
//     const info = await Departments.askId()
//     console.log(info);
//     // console.log(Departments);
// }


// test();
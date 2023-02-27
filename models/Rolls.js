const db = require('../config/connection');
const {Table} = require('../src/Table');
const {getTableInfo} = require('../src/ask');

const Roll = function(){
    const name = 'rolls'
    return {
        ...Table(name),
        getData: async () => {
            const [data,metaData] = await db.query(`SELECT rolls.id, rolls.title, departments.name as 'department' FROM rolls INNER JOIN departments on rolls.department_id = departments.id`);
            return data;
        },
        create: async (newData) => {
            let keys = Object.keys(newData)
            const values = [];
            for (let i = 0; i<keys.length; i++){
                let {[keys[i]]: value} = newData;
                if(isNaN(value)){
                    if(keys[i]==='department'){
                        const [depData,metaData] = await db.query(`SELECT * FROM departments WHERE departments.name = '${value.toLowerCase()}'`);
                        value = depData[0].id;
                        keys[i] = 'department_id';
                    } else {
                        value = '"' + value + '"';
                    }
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
            const [data,metaData] = await db.query(`SELECT rolls.id, rolls.title, departments.name as 'department' FROM rolls INNER JOIN departments on rolls.department_id = departments.id`);
            return data;
        },
        askInfo: async () => {
            const table = await getTableInfo(name)
            return await table.askInfo();
        },
    }
}

const Rolls = Roll();

module.exports = Rolls;
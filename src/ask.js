const inquirer = require('inquirer');
const db = require('../config/connection');
const cTable = require('console.table');

/**
 * Factory function for asking for a list
 * @param {Array} questionList An array with what you want to ask the user
 * @returns A function that returns a promise of an action based on the questionList input
 */
const askList = function (questionList,answer){
    const promptList = questionList;
    return function(){
        console.log('-------------------------------')
        return inquirer.prompt([
            {
                type: 'list',
                name: answer,
                message: 'What do you want to do?',
                choices: promptList
            }
        ]);
    }
}

const getTableInfo = async function(tableName){
    const name = tableName;
    const [tableData,tableMetaData] = await db.query(`SELECT * FROM ${name}`);
    const keys = Object.keys(tableData[0])
    // let rowInfo = [];
    if(name === 'employees'){
        [rowInfo, namesMetaData] = await db.query(`SELECT ${keys[0]} , ${keys[1]}, ${keys[2]} FROM ${name} `)
    } else {
        [rowInfo, namesMetaData] = await db.query(`SELECT ${keys[0]} , ${keys[1]} FROM ${name} `)
    }
    const questions = [];
    const re = /id/;
    for (let i = 1; i<keys.length; i++){
        //create prompt based on stuff and verify if text, number and select cases of null
        let {[keys[i]]: value} = tableData[0];
        // console.log(re.test(keys[i]));
        let question = {};
        console.log()
        if(re.test(keys[i]) && (keys[i].split('_')[0] !== 'manager') ){
            [relatedTableData,metaData] = await db.query(`SELECT * FROM ${keys[i].split('_')[0]+`s`}`);
            // console.log(relatedTableData);
            question = {
                type: 'list',
                name: keys[i].split('_')[0],
                message: `Which ${keys[i].split('_')[0]} does this ${name} belong to?`,
                choices: relatedTableData
            }
        } else {
            question = {
                type: 'input',
                name: keys[i],
                message: `What is the new ${name.split('s')[0]}'s ${keys[i]}`,
                validate(answer){
                    return new Promise((resolve,reject)=>{
                        if(!isNaN(value) && (isNaN(answer) || !answer || answer < 1)){
                            if(keys[i] === 'manager_id'){
                                answer = null;
                                resolve(true)
                                return;
                            }
                            reject(new Error(`Expected '${keys[i]}' to be a number greater than 0`));
                        } else if(!answer){
                            reject(new Error(`Expected '${keys[i]}' to be a non-empty string`));
                        } 
                        resolve(true);
                    });
                }
            }
        }
        questions.push(question);
    }
    const choices = []
    for(let i = 0; i<rowInfo.length; i++){
        let {[keys[1]]: value} = rowInfo[i]
        let choice = `${name.split('s')[0]}_id: ${rowInfo[i].id}, ${value}`
        if(name === 'employees'){
            let {[keys[2]]: value} = rowInfo[i]
            choice += ` ${value}`
        }
        choices.push(choice);
    }
    // console.log(questions);
    return {
        askInfo: async function (){
            // console.table(tableData);
            console.log('-------------------------------')
            // console.log(questions);
            return await inquirer.prompt(questions);
        },
        // askId: async function
        askId: async function () {
            const answer = await inquirer.prompt([{
                type: 'list',
                name: 'label',
                message: `Which ${name.split('s')[0]} would you like to delete?`,
                choices: choices,
            }])
            const id = answer.label.match(/\d+/)
            return id[0];
        }
    }
}

module.exports = {
    askList, 
    getTableInfo
}

// const test = async function(){
//     const askDepartmentInfo = await getTableInfo('employees');
//     console.log(await askDepartmentInfo.askRowId());
// }

// test();
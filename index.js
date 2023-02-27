const inquirer = require('inquirer');
const {askList} = require('./src/ask');
const {Departments,Employees,Rolls} = require('./models')
const cTable = require('console.table');

const intro = require('./src/intro')


// //function for asking for main actions
const askMainActions = askList(['View Departments','View Rolls','View Employees','Quit'],'action');
const askDepartmentActions = askList(['Add Department','Delete Department','Back'],'action')
const askRollActions = askList(['Add Roll','Delete Roll','Back'],'action');
const askEmployeeActions = askList(['Add Employee', 'Delete Employee','Back'],'action');

init();

async function init(){
    //loop for asking main actions
    console.log(intro);
    let quit = false;
    while(!quit){
        //ask for what main action to take
        
        const answer = await askMainActions()

        //if the answer is department actions, prompt for department actions
        if(answer.action === 'View Departments'){
            // loop for asking for department actions
            const departmentData = await Departments.getData();
            console.table(departmentData);
            let back = false;
            while(!back){
                //ask for department actions
                const answer = await askDepartmentActions();
                //if the answer is 'view departments' display the departments
                if(answer.action === 'View Departments'){
                    //display departments
                    
                    // console.log(answer.action)
                }
                //if the answer is 'add department' ask the user for the department info, then display the list of departments
                else if(answer.action === 'Add Department'){
                    //Show the user the prompts for adding a department
                    // console.log(answer.action)
                    const newInfo = await Departments.askInfo();
                    const newDepartmentData = await Departments.create(newInfo);
                    console.table(newDepartmentData);
                }
                //if the answer is 'remove department' ask the user for which department to delete, then display the list of departments
                else if(answer.action === 'Delete Department'){
                    //Show the user the prompts for deleting a department
                    // console.log(answer.action)
                    const departmentId = await Departments.askId();
                    const newDepartmentData = await Departments.destroy(departmentId);
                    console.table(newDepartmentData)
                }
                //if the answer is 'view department' display the department budgets
                else if(answer.action === 'View Department Budgets'){
                    //show the user the departments with budgets ONLY IF ENOUGH TIME
                }
                //if the answer is 'back' return to the main actions
                else {
                    // console.log(answer.action)
                    back = true;
                }
            }
        } 

        //else if the answer is roll actions, prompt for roll actions
        else if(answer.action === 'View Rolls'){
            // console.log(answer.action)
            //loop for asking for department actions
            const rollData = await Rolls.getData();
            console.table(rollData);
            let back = false;
            while(!back){
                //ask the user what roll action they want
                const answer = await askRollActions();
                //if the answer is 'view rolls' display the rolls
                if(answer.action === 'View Rolls'){
                    //display the rolls
                }
                //if the answer is 'add roll' prompt the user to add a roll, then display the updated rolls
                else if(answer.action === 'Add Roll'){
                    //prompt user for new roll and display new data
                    const newData = await Rolls.askInfo();
                    await Rolls.create(newData);
                    console.table(await Rolls.getData());
                }
                //if the answer is 'delete roll' prompt the user to delete a roll, then display the update rolls
                else if(answer.action === 'Delete Roll'){
                    //prompt user for roll to delete and display new data
                    const rollId = await Rolls.askId();
                    await Rolls.destroy(rollId);
                    console.table(await Rolls.getData());
                }
                //if the answer is 'view rolls by department' ask the user what department they wish to see only do if enough time

                //if the answer is 'back'return to main anctions
                else {
                    back = true;
                }
            }
        } 
        
        //else if the answer is employee actions, prompt for employee actions
        else if(answer.action === 'View Employees'){
            // console.log(answer.action)
            //loop for asking for department actions
            const employeeData = await Employees.getData();
            console.table(employeeData);
            let back = false;
            while(!back){
                const answer = await askEmployeeActions();
                if(answer.action === 'Add Employee'){
                    const newData = await Employees.askInfo();
                    // console.log(newData);
                    console.table(await Employees.create(newData));
                } 
                else if (answer.action === 'Delete Employee'){
                    const id = await Employees.askId();
                    await Employees.destroy(id)
                    console.table(await Employees.getData())
                }
                else {
                    back = true;
                }
            }
        } 

        //else quit if the answer is quit
        else {
            console.log(answer.action)
            quit = true;
            // throw new Error('Exiting Application...')
            console.log('Exititing Application...')
            process.exit(1)
        }
    }
}


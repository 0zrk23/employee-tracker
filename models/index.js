const Department = require('../models/Department');
const Roll = require('../models/Roll');
const Employee = require('../models/Employee');

Department.hasMany(Roll, {
    foreignKey: "department_id",
    onDelete: "CASCADE",
});

Roll.belongsTo(Department, {
    foreignKey: 'department_id',
})

Roll.hasMany(Employee, {
    foreignKey: "roll_id",
    onDelete: "CASCADE"
})

Employee.belongsTo(Roll, {
    foreignKey: 'roll_id'
})

Employee.hasMany(Employee, {
    foreignKey: 'employee_id',
    onDelete: 'CASCADE'
})

Employee.belongsTo(Employee, {
    foreignKey: 'manager_id',
    onDelete: 'CASCADE'
})

module.exports = {Department,Roll,Employee}
const {Model,DataTypes} = require("sequelize");
const sequelize = require('../config/connection');

class Roll extends Model {}

Roll.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isAlphanumeric: true,
                max: 30
            }
        },
        salary: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
        department_id:{
            type: DataTypes.INTEGER,
            references: {
                model: "department",
                key: "id"
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: "roll"
    }
);

module.exports = Roll;
const db = require('../config/connection');
const {getData,destroy,create} = require('../src/sqlQueries')
const {getTableInfo} = require('../src/ask')
const cTable = require('console.table');

/**
 * This function creates an object with methods attached, in this case
 * it is used for creating a simpler way of getting and manupulating 
 * mysql tables
 * @param {String} Table_name The name of the table you want to use
 * @returns {Methods} 
 */

const Table = (name) => {
    // let name = Table_name;
    return {
        // // ...getData(),
        // // ...destroy(),
        // // ...create()
        // askInfo: async () => {
        //     const table = await getTableInfo(name)
        //     return await table.askInfo();
        // },
        askId: async () => {
            const table = await getTableInfo(name)
            return await table.askId();
        },
        destroy: async (id) => {
            await db.query(`DELETE FROM ${name} WHERE id = ${id};`)
            const [data,metaData] = await db.query(`SELECT * FROM ${name};`);
            return data;
        },
    }
}


module.exports = {Table};
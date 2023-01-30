const Promise = require('bluebird');
const initOptions = {
    error: function (error, e) {
        if (e.cn) {
            // A connection-related error;
            console.log("CN:", e.cn);
            console.log("EVENT:", error.message);
        }
    },
    query: function (e) {
        console.clear();
        console.log(e.query);
        if (e.params) {
            console.log('PARAMS:', e.params);
        }
    },
    promiseLib: Promise,
    capSQL: true
};

const pgp = require('pg-promise')(initOptions);

class dbUtilityClass {

    connect() {
        const dbConnection = {
            host: process.env.API_DB_HOST,
            port: process.env.API_DB_PORT,
            database: process.env.API_DB_NAME,
            user: process.env.API_DB_USER,
            password: process.env.API_DB_PASSWORD
        }
        const db = pgp(dbConnection);
        return db;
    }

    insertSql(row, configSQL) {

        const column = Object.keys(row);
        const query=pgp.helpers.insert(row, column, configSQL.table) + 'returning id;';
        return query;

    }
    insertManySql(rows, configSQL) {

        const column = Object.keys(rows[0]);
        const query=pgp.helpers.insert(rows, column, configSQL.table) ;
        return query;

    }

}
export const dbUtility = new dbUtilityClass();
export const db = new dbUtilityClass().connect();
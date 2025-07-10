const sql = require('mssql');

const config = {
    user: 'sqladmin',                // your username
    password: 'Admin1234@',     // your password
    server: 'eventhorizon-sqlserver1.database.windows.net', // your server
    database: 'EventHorizonDB',      // your database
    options: {
        encrypt: true,
        enableArithAbort: true
    }
};

module.exports = {
    sql, config
};

require('dotenv').config();
const mysql = require('mysql2');

// Create a connection pool
const pool = mysql.createPool({
    host: 'srv1338.hstgr.io',
    user: 'u895774783_relive',
    port: 3306,
    password: 'Redefined@1011',
    database: 'u895774783_relive',
    waitForConnections: true,
    connectionLimit: 510,
    queueLimit: 0 
});

// Promisify the pool query method for convenience
const db = pool.promise();

module.exports = db;

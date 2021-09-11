const mysql = require('mysql');
const util = require('util');
let db;

function connectDatabase() {
    db = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'ensolvers-db'
    });

    db.connect((err) => {
        if(!err) {
            console.log('You are already connected to the database!');
        }else{
            console.log('Connection to the database has failed');
        }
    });

    db.query = util.promisify(db.query);
    return db;
}

module.exports = connectDatabase();
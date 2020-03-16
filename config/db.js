const mysql = require('mysql');
const config = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: "root",
    database: 'root'
};
// const connection = mysql.createConnection(config);

// connection.connect(err => {
//     if (err) {
//         console.log('connect fail');
//     } else {
//         console.log('connect success');
//     }
// });

const pool = mysql.createPool(config);

const query = (sql) => {
    return new Promise((res, rej) => {
        pool.getConnection((err, connection) => {
            connection.query(sql, (err, rows) => {
                if (err) {
                    rej(err);
                } else {
                    res(rows);
                }
                connection.release();
            });
        });
    });
}

exports.query = query;
exports.userTable = 'users';
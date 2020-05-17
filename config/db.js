const mysql = require('mysql');
// const config = {
//     host: '139.9.113.43',
//     port: 3306,
//     user: 'root',
//     password: "wfyrgqgyy",
//     database: 'douniu'
// };
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
            if (err) {
                console.log(err);
            } else {
                connection.query(sql, (err, rows) => {
                    if (err) {
                        rej(err);
                    } else {
                        res(rows);
                    }
                    connection.release();
                });
            }
        });
    });
}

exports.query = query;
exports.userTable = 'users';
exports.roomTable = 'rooms';
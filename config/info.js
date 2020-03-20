const db = require('./db');

module.exports.getUserInfoByWs = function getUserInfoByWs(ws) {
	const { path } = ws;
	const token = path.split('token=').slice(-1)[0];
	const sql = `select * from ${db.userTable} where token = '${token}'`;
	return db.query(sql).then(res => {
		return JSON.parse(JSON.stringify(res))[0];
	});
};

module.exports.getUserInfoByToken = function getUserInfoByToken(token) {
	const sql = `select * from ${db.userTable} where token = '${token}'`;
	return db.query(sql).then(res => {
		return JSON.parse(JSON.stringify(res))[0];
	});
};

module.exports.getRoomInfoById = function getRoomInfoById(id) {
	const sql = `select * from ${db.roomTable} where id = ${id}`;
	return db.query(sql).then(res => {
		return JSON.parse(JSON.stringify(res))[0];
	});
};
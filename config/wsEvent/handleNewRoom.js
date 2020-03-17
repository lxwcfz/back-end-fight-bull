const getToken = require('../getToken');
const db = require('../db');

module.exports = function handleNewRoom(data, ws) {
	const { name } = data;
	const { path } = ws;
	const token = getToken(path);
	// 查询身份
	const sql = `select * from ${db.userTable}`;
	db.query(sql).then(res => {
		const userInfo = JSON.parse(JSON.stringify(res))[0];
		const sql1 = `select count(*) as count from ${db.roomTable}`;
		// 获取房间数
		db.query(sql1).then(res1 => {
			const room = {
				id: res1[0].count + 1,
				name: name || `${userInfo.name}的房间`,
				creator: JSON.stringify({ name: userInfo.name, id: userInfo.id })
			};
			const sql2 = `insert into ${db.roomTable} (id, name, creator) values(${room.id}, '${room.name}', '${room.creator}')`;
			// 插入新房间
			db.query(sql2).then(res2 => {
				// 返回创建的房间
				ws.sendText(JSON.stringify({
					type: 0,
					data: room
				}));
			});
		});
	});
};
const db = require('../db');
const { getUserInfoByWs } = require('../info');
const { WS_EVENT_TYPE } = require('../data');
const {sendMsg} = require('../tool');

module.exports = async function handleNewRoom(data, ws, server) {
	const { name } = data;
	// 查询身份
	const userInfo = await getUserInfoByWs(ws);
	const room = {
		name: name || `${userInfo.name}的房间`,
		creator: JSON.stringify({name: userInfo.name, id: userInfo.id})
	};
	const sql = `insert into ${db.roomTable} (name, creator) values('${room.name}', '${room.creator}')`;
	db.query(sql).then(res1 => {
		// 插入新房间
		const sql2 = `select * from ${db.roomTable} order by id desc limit 1`;
		db.query(sql2).then(res2 => {
			room.id = res2[0].id;
			// 返回创建的房间
			sendMsg(
				server,
				{
					type: WS_EVENT_TYPE.newRoom,
					data: {
						data: room
					}
				}
			)
		});
	});
};
const db = require('../db');
const { getUserInfoByWs } = require('../info');
const { WS_EVENT_TYPE } = require('../data');
const {sendMsg} = require('../tool');

module.exports = function handleDeleteRoom(data, ws, server) {
	const roomId = data.id;
	const sql = `delete from ${db.roomTable} where id = ${roomId}`;
	db.query(sql).then(res => {
		// console.log(`删除了id为${roomId}的房间`);
		const sql2 = `select * from ${db.roomTable}`;
		db.query(sql2).then(res => {
			const room = res;
			sendMsg(
				server,
				{
					type: WS_EVENT_TYPE.deleteRoom,
					data: {
						data: room
					}
				}
			);
		});
	});
};

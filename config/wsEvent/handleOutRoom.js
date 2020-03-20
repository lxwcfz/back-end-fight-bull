const db = require('../db');
const { getUserInfoByWs } = require('../info');
const { WS_EVENT_TYPE } = require('../data');
const {sendMsg} = require('../tool');

module.exports = function handleOutRoom(data, ws, server) {
	const userInfo = getUserInfoByWs(ws);
	const roomId = data.roomId;
	const sql = `select * from ${db.roomTable} where id = ${roomId}`;
	db.query(sql).then(res => {
		const room = JSON.parse(JSON.stringify(res))[0];
		const member = JSON.parse(room.member);
		member.splice(member.findIndex(item => item.id == userInfo.id), 1);
		const sql2 = `update ${db.roomTable} set member = '${JSON.stringify(member)}' where id = ${roomId}`;
		db.query(sql2).then(res => {
			sendMsg(
				server,
				{
					type: WS_EVENT_TYPE.outRoom,
					data: member
				}
			)
		});
	});
	sendMsg(
		server,
		{
			type: WS_EVENT_TYPE.outRoom,
			data: {
				data
			}
		}
	);
};

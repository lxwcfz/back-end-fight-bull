const db = require('../db');
const { getUserInfoByWs } = require('../info');
const { WS_EVENT_TYPE } = require('../data');
const {sendMsg} = require('../tool');

module.exports = async function handleOutRoom(data, ws, server) {
	const userInfo = await getUserInfoByWs(ws);
	const roomId = data.roomId;
	const sql = `select * from ${db.roomTable} where id = ${roomId}`;
	db.query(sql).then(res => {
		const room = JSON.parse(JSON.stringify(res))[0];
		const member = JSON.parse(room.member);
		const list = [];
		
		member.forEach(element => {
			// console.log(element.user.id, userInfo.id);
			if (element.user.id !== userInfo.id) {
				list.push(element);
			}
		});
		const sql2 = `update ${db.roomTable} set member = '${JSON.stringify(list)}' where id = ${roomId}`;
		db.query(sql2).then(res => {
			sendMsg(
				server,
				{
					type: WS_EVENT_TYPE.outRoom,
					data: {
						data: {
							outId: userInfo.id
						}
					}
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

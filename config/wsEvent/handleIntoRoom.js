const db = require('../db');
const { getUserInfoByWs } = require('../info');
const { WS_EVENT_TYPE } = require('../data');
const {sendMsg} = require('../tool');

module.exports = async function handleIntoRoom(data, ws, server) {
	const roomId = data.roomId;
	const userInfo = await getUserInfoByWs(ws);
	delete userInfo.password;
	delete userInfo.token;
	const sql = `select * from ${db.roomTable} where id = ${roomId}`;
	db.query(sql).then(res => {
		let { member } = JSON.parse(JSON.stringify(res))[0];
		// console.log('member:',typeof member);
		member = member == null ? [] : JSON.parse(member);
		if(member.findIndex(item => item.user.id == userInfo.id) == -1) {
			member.push({
				user: userInfo,
				card: []
			});
		}
		const sql2 = `update ${db.roomTable} set member = '${JSON.stringify(member)}' where id = ${roomId}`;
		db.query(sql2).then(res => {
			// console.log(`有人进入了id为${roomId}的房间`);
			sendMsg(
				server,
				{
					type: WS_EVENT_TYPE.intoRoom,
					data: {
						data: member
					}
				}
			);
		});
	});
};

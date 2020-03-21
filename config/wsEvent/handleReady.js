const db = require('../db');
const { getUserInfoByWs, getRoomInfoById } = require('../info');
const { WS_EVENT_TYPE } = require('../data');
const handOutCard = require('./handOutCard');
const { sendMsg } = require('../tool');

module.exports = async function handleReady(data, ws, server) {
	// 该用户准备
	const userInfo = await getUserInfoByWs(ws);
	const { roomId } = data;
	const roomInfo = await setReadyAndGetReady(userInfo.id, roomId);
	const member = JSON.parse(roomInfo.member);
	sendMsg(
		server,
		{  // 前台对应显示准备OK图标
			type: WS_EVENT_TYPE.ready,
			data: {
				data: member
			}
		}
	);
	// 获取房间信息
	
	if (member.every(item => item.ready)) {  // 所有人准备完毕
		let sec = 3;
		const timer = setInterval(() => {
			// sendMsg(
			// 	server,
			// 	{  // 前台对应显示发牌倒计时
			// 		type: WS_EVENT_TYPE.ready,
			// 		data: {
			// 			msg: sec > 0 ? sec : '洗牌中，准备发牌'
			// 		}
			// 	}
			// );
			if (sec == 0) {
				clearInterval(timer);
				// 发牌
				handOutCard(roomId, ws);
			}
			sec -= 1;
		}, 1000);
	}

};
async function setReadyAndGetReady(userId, roomId) {
	const roomInfo = await getRoomInfoById(roomId);
	let ready = true;
	const member = JSON.parse(roomInfo.member);
	member.forEach(item => {
		if (item.user.id == userId) {
			item.ready = true;
		}
		if (!item.ready) {
			ready = false;
		}
	});
	
	const sql = `update ${db.roomTable} set member = '${JSON.stringify(member)}' where id = ${roomId}`;
	return db.query(sql).then(res => {
		const sql2 = `select * from ${db.roomTable} where id = ${roomId}`;
		return db.query(sql2).then(res => {
			return JSON.parse(JSON.stringify(res))[0];
		});
	}).catch(e => console.log(e));
}
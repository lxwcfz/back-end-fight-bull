const db = require('../db');
const { getUserInfoByWs, getRoomInfoById } = require('../info');
const { WS_EVENT_TYPE } = require('../data');
const handOutCard = require('./handOutCard');
const { sendMsg } = require('../tool');

module.exports = async function handleReady(data, ws, server) {
	// 该用户准备
	const userInfo = getUserInfoByWs(ws);
	const { roomId } = data;
	const ready = await setReadyAndGetReady(userInfo.id, roomId);
	sendMsg(
		server,
		{  // 前台对应显示准备OK图标
			type: WS_EVENT_TYPE.ready,
			data: {
				id: userInfo.id
			}
		}
	);
	// 获取房间信息
	if (ready) {  // 所有人准备完毕
		let sec = 3;
		const timer = setInterval(() => {
			sendMsg(
				server,
				{  // 前台对应显示发牌倒计时
					type: WS_EVENT_TYPE.ready,
					data: {
						msg: sec > 0 ? sec : '洗牌中，准备发牌'
					}
				}
			);
			if (sec == 0) {
				clearInterval(timer);
				// 发牌
				handOutCard(roomId, ws);
			}
			sec -= 1;
		}, 1000);
	}

};
function setReadyAndGetReady(userId, roomId) {
	const { member } = getRoomInfoById(roomId);
	let ready = true;
	member.forEach(item => {
		if (item.id == userId) {
			item.ready = true;
		}
		if (!item.ready) {
			ready = false;
		}
	});
	const sql = `update ${db.roomTable} set member = '${JSON.stringify(member)}' where id = ${roomId}`;
	return db.query(sql).then(res => {
		return ready;
	});
}
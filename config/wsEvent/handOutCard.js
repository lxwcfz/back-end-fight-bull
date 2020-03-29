const db = require('../db');
const { getUserInfoByWs, getRoomInfoById } = require('../info');
const { WS_EVENT_TYPE } = require('../data');
const { getRandomCardNumber } = require('../card');
const { sendMsg } = require('../tool');

module.exports = async function handOutCard(roomId, ws, server) {
	let cards = []; // 已选牌
	const roomInfo = await getRoomInfoById(roomId);
	const member = JSON.parse(roomInfo.member);  // 房间内人员

	member.forEach(item => {
		const { list, restCards } = getCard([], cards);
		item.card = list;
		cards = restCards;
	});
	// 选牌完毕
	sendMsg(server, {
		type: WS_EVENT_TYPE.handOutCard,
		data: {
			data: member
		}
	});
}
function getCard(currentList, totalList) {
	const newCard = getRandomCardNumber(totalList);
	const list = currentList;
	const total = totalList;
	list.push(newCard);
	total.push(newCard);
	if (list.length < 5) {
		return getCard(list, total);
	} else {
		return {
			list,
			restCards: total
		}
	}
}
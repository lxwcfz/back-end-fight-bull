const db = require('../db');
const { getUserInfoByWs, getRoomInfoById } = require('../info');
const { WS_EVENT_TYPE } = require('../data');
const { sendMsg } = require('../tool');

module.exports = async function handleGetHost(data, ws, server) {
    const roomInfo = await getRoomInfoById(data.roomId);
    const userInfo = await getUserInfoByWs(ws);
    const member = JSON.parse(roomInfo.member);
    member.forEach(item => {
        if (item.user.id == userInfo.id) {
            item.card = [];
            item.score = -1;
            item.finish = false;
            item.ready = false;
        }
    });
    const sql = `update ${db.roomTable} set member = '${JSON.stringify(member)}', host = null where id = ${roomInfo.id}`;
    if (member.every(item => item.card.length == 0)) {
        // 所有人都点了再来一把
    }
    db.query(sql).then(res => {
        sendMsg(server, {
            type: WS_EVENT_TYPE.again,
            data: {
                data: member
            }
        });
    });
}
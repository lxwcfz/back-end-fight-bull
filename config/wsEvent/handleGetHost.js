const db = require('../db');
const { getUserInfoByWs, getRoomInfoById } = require('../info');
const { WS_EVENT_TYPE } = require('../data');
const { sendMsg } = require('../tool');

module.exports = async function handleGetHost(data, ws, server) {
    const roomInfo = await getRoomInfoById(data.roomId);
    const userInfo = await getUserInfoByWs(ws);
    // console.log('get host', userInfo.name);
	if (!roomInfo.host) {
        // console.log('got', userInfo.name);
        const host = {
            id: userInfo.id,
            name: userInfo.name
        }
        roomInfo.host = host;
        // 插入
        const sql = `update ${db.roomTable} set host = '${JSON.stringify(host)}' where id = ${roomInfo.id}`;
        db.query(sql).then(res => {
            sendMsg(server, {
                type: WS_EVENT_TYPE.getHost,
                data: {
                    data: host
                }
            })
        });
    } else {
        sendMsg(server, {
            type: WS_EVENT_TYPE.getHost,
            data: {
                data: JSON.parse(roomInfo.host)
            }
        });
    }
    
}
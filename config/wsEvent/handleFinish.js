const db = require('../db');
const { getUserInfoByWs, getRoomInfoById } = require('../info');
const { WS_EVENT_TYPE } = require('../data');
const { sendMsg } = require('../tool');
const { sortCard } = require('../sort');

module.exports = async function handleFinish(data, ws, server) {
    const roomInfo = await getRoomInfoById(data.roomId);
    const userInfo = await getUserInfoByWs(ws);
    const member = JSON.parse(roomInfo.member);
    member.forEach(item => {
        // console.log(item);
        if (item.user.id == userInfo.id) {
            item.finish = true;
            item.score = sortCard(item.card);
        }
    });
    // 插入
    const sql = `update ${db.roomTable} set member = '${JSON.stringify(member)}' where id = ${roomInfo.id}`;
    db.query(sql).then(res => {
        // 所有人都开牌了
        let end = '';
        if (member.every(item => item.finish)) {
            end = true;
            const sql2 = `update ${db.roomTable} set host = null where id = ${roomInfo.id}`;
            db.query(sql2);
            console.log(roomInfo);
            const hostScore = member.filter(ware => ware.user.id == JSON.parse(roomInfo.host).id)[0].score;
            member.forEach(item => {
                let add = 0;
                if (item.user.id == JSON.parse(roomInfo.host).id) {
                    member.forEach(ware => {
                        if (ware.user.id != item.user.id) {
                            if (ware.score > hostScore) {
                                add -= 10;
                            }
                            if (ware.score < hostScore) {
                                add += 10;
                            }
                            if (hostScore == 11 && ware.score == 0.5) {
                                add -= 20;
                            }
                        }
                    });
                } else {
                    if (item.score > hostScore) {
                        add = 10;
                    }
                    if (item.score < hostScore) {
                        add = -10;
                    }
                }
                console.log(item.user.name, add);
                item.money = add;
                const user = item.user;
                user.score += add;
                item.user = user;
                const sql = `select * from ${db.userTable} where id = ${item.user.id}`;
                db.query(sql).then(res => {
                    const info = JSON.parse(JSON.stringify(res[0]));
                    info.score += add;
                    const sql1 = `update ${db.userTable} set score = ${info.score} where id = ${info.id}`;
                    db.query(sql1);
                });
            });
        }
        const sql3 = `update ${db.roomTable} set member = '${JSON.stringify(member)}' where id = ${roomInfo.id}`;
        if (end) {
            db.query(sql3);
        }
        sendMsg(server, {
            type: WS_EVENT_TYPE.finish,
            data: {
                data: {
                    member,
                    end
                }
            }
        });
	});
}
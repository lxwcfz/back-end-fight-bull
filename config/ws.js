const handleNewRoom = require("./wsEvent/handleNewRoom");

const ws = require('nodejs-websocket');
console.log('connecting');
const wsEventType = {
	newRoom: {
		type: 0,
		func: handleNewRoom
	}
};
function getWs() {
	const server = ws.createServer(conn => {
		conn.on('text', msg => {
			const data = JSON.parse(msg);
			const type = data.type;
			// 创建房间
			if (type == wsEventType.newRoom.type) {
				console.log('handle newRoom');
				wsEventType.newRoom.func(data.data, conn);
			}
		});
		conn.on("close", (code, reason) => {
			console.log("关闭连接");
		});
		conn.on("error", (code, reason) => {
			console.log("异常关闭");
		});
	}).listen(8001);
	console.log('websocket built');
	return server;
}

module.exports = getWs;
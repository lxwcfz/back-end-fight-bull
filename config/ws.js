const handleNewRoom = require("./wsEvent/handleNewRoom");
const handleReady = require('./wsEvent/handleReady');
const handleIntoRoom = require('./wsEvent/handleIntoRoom');
const handleDeleteRoom = require('./wsEvent/handleDeleteRoom');
const handleOutRoom = require('./wsEvent/handleOutRoom');
const handleGetHost = require('./wsEvent/handleGetHost');
const handleFinish = require('./wsEvent/handleFinish');
const handleAgain = require('./wsEvent/handleAgain');
const { WS_EVENT_TYPE } = require('./data');
const ws = require('nodejs-websocket');

console.log('connecting');
const wsEventType = {
	[WS_EVENT_TYPE.newRoom]: {
		func: handleNewRoom
	},
	[WS_EVENT_TYPE.intoRoom]: {
		func: handleIntoRoom
	},
	[WS_EVENT_TYPE.ready]: {
		func: handleReady
	},
	[WS_EVENT_TYPE.deleteRoom]: {
		func: handleDeleteRoom
	},
	[WS_EVENT_TYPE.outRoom]: {
		func: handleOutRoom
	},
	[WS_EVENT_TYPE.getHost]: {
		func: handleGetHost
	},
	[WS_EVENT_TYPE.finish]: {
		func: handleFinish
	},
	[WS_EVENT_TYPE.again]: {
		func: handleAgain
	},
};
function getWs() {
	const server = ws.createServer(conn => {
		conn.on('text', msg => {
			const data = JSON.parse(msg);
			const type = data.type;
			wsEventType[type].func(data.data, conn, server);
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
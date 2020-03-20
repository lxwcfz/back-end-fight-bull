module.exports.sendMsg = function sendMsg(server, data) {
	server.connections.forEach(conn => {
		conn.sendText(JSON.stringify(data));
	});
};
module.exports = function getToken(path) {
	const token = path.split('token=').slice(-1)[0];
	return token;
};
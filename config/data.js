const responseInfo = {
	data: null, // 赋值个人信息（除密码）
	msg: 'success',
	status: 200
};
const responseErr = {
	data: null,
	msg: '出错了',
	status: 500
};

module.exports = {
	responseInfo,
	responseErr
};
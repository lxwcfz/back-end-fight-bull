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
const WS_EVENT_TYPE = {
	newRoom: 0, // 创建房间
	ready: 1, // 点击准备
	handOutCard: 2, // 发牌
	intoRoom: 3,  // 进入房间
	outRoom: 4, // 离开房间
	deleteRoom: 5,  // 删除房间
};

module.exports = {
	responseInfo,
	responseErr,
	WS_EVENT_TYPE
};
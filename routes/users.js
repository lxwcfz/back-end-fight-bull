var express = require('express');
var router = express.Router();
const db = require('../config/db');
const deepClone = require('../config/deepClone.js');
const JwtUtil = require('../config/jwt');
/**
 * 登录->是否注册？->用户名是否重复？-> 密码是否正确？（暂存该条数据）->更新过期时间->返回个人信息状态3
 *          ↓no            ↓               ↓no         ↑            
 *        返回状态1---------↓---------------↓-registe---↑
*                      返回状态4            ↓
*                                       返回状态2
 */
// 状态：
const responseNotRegisted = {
	data: null,
	msg: '该账户尚未注册',
	status: 200
};
const responseWrongPass = {
	data: null,
	msg: '密码错误',
	status: 400
};
const responseInfo = {
	data: null, // 赋值个人信息（除密码）
	msg: 'success',
	status: 200
};
const responseRegisted = {
	data: null,
	msg: '该用户名已被注册',
	status: 400
}
const responseErr = {
	data: null,
	msg: '出错了',
	status: 500
}
/* GET users listing. */
function getToken(id) {
	const jwt = new JwtUtil(id);
	return jwt.generateToken();
}
function getUserFromTable(name) {
	const sql = `select * from ${db.userTable} where name = ${name}`;
	return db.query(sql).then(res => JSON.parse(JSON.stringify(res)));
}
function doRegiste({ name, password }) {
	return new Promise((resolve, rej) => {
		const sql = `select count(*) as count from ${db.userTable}`;
		db.query(sql).then(res => {
			const id = res[0].count + 1;
			const token = getToken(id);
			const insert = `insert into ${db.userTable} (name, password, id, token) values(${name}, ${password}, ${id}, '${token}')`;
			db.query(insert).then(rows => {
				// 注册成功
				resolve({
					name,
					id,
					token
				});
			}).catch(err => rej(err));
		}).catch(err => rej(err))
	})
}
function doLogin({ name, password }) {
	return getUserFromTable(name).then(row => {
		const info = row[0];
		if (password === info.password) {
			// 登录成功
			const item = info;
			item.token = getToken(item.id);
			return item;
		} else {
			return null;
		}
	})
}
/**-------------------------------------------route--------------------------- */
router.post('/login', function (req, res, next) {
	const { name, password, registe } = req.body;
	// 是否直接注册？
	if (registe) {  // 直接注册
		// 是否用户名重复
		getUserFromTable(name).then(row => {
			if (row.length > 0) {
				res.json(responseRegisted);
			} else {
				doRegiste({
					name,
					password
				}).then(info => {
					const data = deepClone(responseInfo);
					data.data = info;
					res.json(data);
				}).catch(err => {
					res.json(responseErr)
				});
			}
		}).catch(() => res.json(responseErr));
	} else {	// 登录
		// 是否注册过
		getUserFromTable(name).then(row => {
			if (row.length > 0) {	// 已经注册
				doLogin({name, password}).then(info => {
					if (info) {
						const data = deepClone(responseInfo);
						data.data = info;
						res.json(data);
					} else {
						res.json(responseWrongPass);	// 密码错误
					}
				})
			} else {
				res.json(responseNotRegisted);
			}
		})
	}
});

module.exports = router;

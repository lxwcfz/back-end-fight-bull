var express = require('express');
var router = express.Router();
const db = require('../config/db');
const deepClone = require('../config/deepClone.js');
const { responseInfo, responseErr } = require('../config/data');

router.get('/list', (req, res) => {
	const sql = `select * from ${db.roomTable}`;
	db.query(sql).then(resp => {
		const data = deepClone(responseInfo);
		data.data = resp;
		res.json(data);
	}).catch(err => {
		res.json(responseErr);
	});
});

module.exports = router;
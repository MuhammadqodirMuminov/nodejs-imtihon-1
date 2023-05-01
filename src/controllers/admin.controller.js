const { createHash } = require('crypto');
const { read } = require('../models/model');

exports.getAdmin = async (req, res) => {
	try {
		const admin = read('admin');
		const { username, password } = JSON.parse(await req.body);
		const hashedPassword = createHash('sha256').update(password).digest('hex');
		const existUser = admin.filter(a => a.username == username && a.password == hashedPassword);

		if (existUser.length > 0) {
			res.JSON(200, JSON.stringify({ status: 200, message: 'ok!' }));
		} else {
			res.JSON(404, JSON.stringify({ status: 404, message: 'Username or password wrong' }));
		}
	} catch (error) {
		res.JSON(400, JSON.stringify({ status: 400, message: error.message }));
	}
};

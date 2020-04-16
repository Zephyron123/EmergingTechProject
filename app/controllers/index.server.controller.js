const sessionController = require('./session.server.controller');


exports.render = (req, res, next) => {
	sessionController.get(req, res, () => {
		res.render("index", {
			title: "Main Page",
		});
	});
};

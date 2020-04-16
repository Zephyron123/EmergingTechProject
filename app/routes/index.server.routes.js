module.exports = (app) => {
    // Sets the controllers
	const index = require('../controllers/index.server.controller');
	const login = require('../controllers/login.server.controller');
	const signup = require('../controllers/signup.server.controller');
	const patient = require('../controllers/patient.server.controller');
	const nurse = require('../controllers/nurse.server.controller');

    // Route the default route.
    app.get('/', index.render);
	app.post('/', index.render);
	app.get('/login', login.render);
	app.post('/login', login.post);

	app.get('/signup', signup.render);
	app.post('/signup', signup.post);

	app.get('/patient', patient.render);
	app.get('/patient/emergency', patient.emergency);
	app.get('/patient/motivation', patient.motivation);
	app.get('/patient/report', patient.reportGet);
	app.post('/patient/report', patient.reportPost);
	app.get('/patient/diagnosis', patient.diagnosisGet);
	app.post('/patient/diagnosis', patient.diagnosisPost);

	app.get('/nurse', nurse.render);
	app.get('/nurse/report', nurse.reportGet);
	app.post('/nurse/report', nurse.reportPost);
	app.get('/nurse/viewReports', nurse.viewReportsGet);
	app.post('/nurse/viewReports', nurse.viewReportsPost);
	app.get('/nurse/submitMotivation', nurse.submitMotivation);
	app.post('/nurse/submitMotivation', nurse.submitMotivationPost);

	app.get('/logout', (req, res) => {
		req.session.user = null;
		res.redirect('/');
	})
}
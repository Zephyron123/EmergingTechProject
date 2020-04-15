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

	app.get('/signup', signup.render);
	app.post('/signup', signup.post);

	app.get('/patient', patient.render);
	app.get('/patient/emergency', patient.emergency);
	app.get('/patient/motivation', patient.motivation);
	app.get('/patient/report', patient.report);
	app.get('/patient/diagnosis', patient.diagnosis);

	app.get('/nurse', nurse.render);
	app.get('/nurse/report', nurse.report);
	app.get('/nurse/viewReports', nurse.viewReports);
	app.get('/nurse/submitMotivation', nurse.submitMotivation);
}
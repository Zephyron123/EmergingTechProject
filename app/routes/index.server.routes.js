module.exports = (app) => {
    // Sets the controllers
    const index = require('../controllers/index.server.controller');
    const login = require('../controllers/login.server.controller');

    // Route the default route.
    app.get('/', index.render);

    app.get('/login', login.get);
    app.post('/login', login.post);

    app.get('/signup', signup.get);
    app.post('/signup', signup.post);
}
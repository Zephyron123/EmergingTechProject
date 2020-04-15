module.exports = (app) => {
    // Sets the controllers
    const login = require('../controllers/login.server.controller');

    // Route the default route.
    app.get('/', login.render);
    app.post('/', login.render);
}
const controller = require('../controllers/PaisesController');

module.exports = (app) => {
    app.get('/paises/:nome', controller.getByName);
    app.get('/paises/', controller.getAll);
    app.post('/paises/', controller.insertCountry);
}
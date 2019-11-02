const http = require('http');
const { log } = require('console');

const database = require('./src/configuration/database');
const app = require('./src/configuration/express')();

http.createServer(app).listen(app.get('port'), () => {
  log(`Servidor iniciado na porta ${app.get('port')}`);
});


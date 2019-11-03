const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const consign = require('consign');

const config = require('./config');

const swaggerUi = require('swagger-ui-express');
const openApiDocumentation = require('./swagger');

module.exports = () => {
  const app = express();
  
  app.set('port', config.PORT);
  
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiDocumentation));

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Seguranca
  app.use(helmet());
  app.use(helmet.hidePoweredBy({ setTo: 'PHP 5.5.14' }));
  app.use(helmet.frameguard());
  app.use(helmet.xssFilter());
  app.use(helmet.noSniff());
  app.disable('x-powered-by');

  // Configuracao de rotas
  consign({
    cwd: 'src',
    verbose: true,
    extensions: ['.js'],
  })
    .include('routes')
    .into(app);

  // Configuracao de logs
  app.use(morgan(config.ENV));

  return app;
};
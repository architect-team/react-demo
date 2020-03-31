const winston = require('winston');
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'backend' },
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: `${__dirname}/../logs/backend.log` })
  ]
});

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.POSTGRES_DB, process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  dialect: 'postgres'
});

const Name = sequelize.define('name', {
  name: Sequelize.STRING
});

app.get('/names', async (req, res) => {
  logger.info(`GET /names`)
  const names = await Name.findAll({
    order: [
      ['id', 'DESC'],
    ]
  });
  if (names) {
    return res.status(200).json(names);
  }
  return res.status(404).json({ 'error': 'Not found' });
});

app.post('/name', async (req, res) => {
  try {
    logger.info(`POST /name`);
    const name = await Name.create({ name: req.body.name });
    return res.status(201).json(name);
  } catch (err) {
    return res.status(500);
  }
});

sequelize.query(`select exists(SELECT datname FROM pg_catalog.pg_database WHERE lower(datname) = lower('${process.env.POSTGRES_DB}'));`)
  .then(async result => {
    if (!result[0][0].exists) {
      logger.info('Creating database');
      await sequelize.query(`CREATE DATABASE "${process.env.POSTGRES_DB}"`);
    }

    logger.info('Database exists');
    sequelize.sync().then(function () {
      const { HOST, PORT, MAIN_PORT, SECONDARY_PORT } = process.env;
      app.listen(PORT, () => { // 8080
        logger.info(`Listening at ${HOST}:${PORT}`);
      });
      // app.listen(8080, () => { // should be listening at 8080 and ....
      //   logger.info(`Listening at ${HOST}:${MAIN_PORT}`);
      // });
      // app.listen(8081, () => { // 8081
      //   logger.info(`Listening at ${HOST}:${SECONDARY_PORT}`);
      // });
    }).catch(err => {
      logger.error(`Sequelize sync failed\n${err}`);
    });
  }).catch(err => {
    logger.error(`Sequelize init failed\n${err}`);
  });

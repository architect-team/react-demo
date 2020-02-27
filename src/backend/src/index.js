const fs = require('fs');
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

const express = require("express");
const cors = require('cors');

const app = express();
app.use(cors());

const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.POSTGRES_DB, process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  dialect: 'postgres'
});

const Name = sequelize.define('name', {
  name: Sequelize.STRING
});

// app.get('/documents', async (req, res) => {
//   logger.info(`GET /document`)
//   const documents = await Document.findAll();
//   if (documents) {
//     return res.status(200).json(documents);
//   }
//   return res.status(404).json({ 'error': 'Not found' });
// });

// app.get('/document/:id', async (req, res) => {
//   logger.info(`GET /document/${req.params.id}`)
//   const document = await Document.findByPk(req.params.id);
//   if (document) {
//     return res.status(200).json(document);
//   }
//   return res.status(404).json({ 'error': 'Not found' });
// });

app.post('/name', async (req, res) => {
  logger.info(`POST /name`);
  console.log(req.body.name)
  const name = await Name.create(req.body.name);
  return res.status(201).json(name);
});

sequelize.query(`select exists(SELECT datname FROM pg_catalog.pg_database WHERE lower(datname) = lower('${process.env.POSTGRES_DB}'));`)
  .then(async result => {
    if (!result[0][0].exists) {
      logger.info('Creating database');
      await sequelize.query(`CREATE DATABASE "${process.env.POSTGRES_DB}"`);
    }

    logger.info('Database exists');
    sequelize.sync().then(function () {
      const { HOST, PORT } = process.env;
      app.listen(PORT, () => {
        logger.info('Listening at %s:%s', HOST, PORT);
      });
    }).catch(err => {
      logger.error(`Sequelize sync failed\n${err}`);
    });
  }).catch(err => {
    logger.error(`Sequelize init failed\n${err}`);
  });

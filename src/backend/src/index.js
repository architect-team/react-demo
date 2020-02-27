const fs = require('fs');
const winston = require('winston');
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'bouncer' },
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: `${__dirname}/../logs/bouncer.log` })
  ]
});

const express = require("express");
const cors = require('cors');
const busboy = require('connect-busboy');

const app = express();
app.use(busboy());
app.use(cors());

const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.POSTGRES_DB, process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  dialect: 'postgres'
});

const Document = sequelize.define('document', {
  result: Sequelize.JSON
});

app.get('/documents', async (req, res) => {
  logger.info(`GET /document`)
  const documents = await Document.findAll();
  if (documents) {
    return res.status(200).json(documents);
  }
  return res.status(404).json({ 'error': 'Not found' });
});

app.get('/document/:id', async (req, res) => {
  logger.info(`GET /document/${req.params.id}`)
  const document = await Document.findByPk(req.params.id);
  if (document) {
    return res.status(200).json(document);
  }
  return res.status(404).json({ 'error': 'Not found' });
});

app.post('/document', (req, res) => {
  logger.info(`POST /document`);
  let documentType = '';
  req.pipe(req.busboy);
  req.busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
    documentType = filename.split('-')[0];
    const stream = fs.createWriteStream(__dirname + filename);
    file.pipe(stream);
  });

  req.busboy.on('finish', async () => {
    const mock_data = {
      result: {
        overallScore: 100
      }
    };
    const document = await Document.create(mock_data);
    return res.status(201).json({ result: mock_data.result, id: document.id });
  });
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

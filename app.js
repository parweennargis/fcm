require('dotenv').config();
require('./src/utils/db');

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const responseTime = require('response-time');
const compression = require('compression');
const helmet = require('helmet');
const { v4: uuidv4 } = require('uuid');

const { checkToken } = require('./src/utils/common');

morgan.token('id', function getId (req) {
    return req.id;
});

const app = express();

const router = express.Router();

const routes = require('./src/routers')(app, router);

app.use(assignId);
app.use(morgan(':id - :remote-addr - :date[format] :method :url :status :response-time ms :total-time ms'));
app.use(responseTime());
app.use(cors());
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ limit: '5mb' }));
app.use(checkToken);
app.use(compression());
app.use(helmet());

app.use('/', routes);

function assignId (req, res, next) {
    req.id = uuidv4();
    next();
}


const port = process.env.PORT || 5000;

app.listen(port, () => { console.log(`Running on http://localhost:${port}`) });

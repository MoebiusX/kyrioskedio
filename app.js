var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');
var session = require('express-session');

const config = require('./config');
const db = require('./model-mysql');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: 'masterplan',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Server API
app.post('/api/sessions', login);

//static files
app.use('/', express.static(config.webpages, { extensions: ['html'] }));

async function login(req, res) {
    try {
        const authenticated = await db.login(req.body.user_name, req.body.password);
        let session = req.session;
        req.session.userId = authenticated.userid;
        req.session.user = authenticated.username;
        req.session.usertype = authenticated.usertype;
        res.redirect('/week');
    } catch (e) {
        error(res, e);
    }
}

function error(res, msg) {
    res.sendStatus(500);
    console.error(msg);
}

module.exports = app;

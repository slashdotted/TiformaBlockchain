//file di gestione delle api
var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var cors = require('cors');
var upload = require('./upload');
var query = require('./query-server');
const fs = require('fs');
var mysql = require('mysql');
var jwt = require('jsonwebtoken');
const { secret } = require('./config.json');
var app = express();
app.use(bodyParser.json());
app.use(cors());
var endpoint = 'http://localhost:3000/api';
var queriesEndpoint = 'http://localhost:3000/api/queries/';
var con;
var  expressJwt = require ('express-jwt');
var _ = require('underscore');
var crypt = require ('./crypt');

module.exports={
    
}
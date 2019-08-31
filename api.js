//file di gestione delle api
var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var cors = require('cors');
const fs = require('fs');
var jwt = require('jsonwebtoken');
const { secret } = require('./config.json');
var app = express();
app.use(bodyParser.json());
app.use(cors());
var endpoint = 'http://localhost:3000/api';
var db = require ('./db')
var _ = require('underscore');
var crypt = require('./crypt');
var authFunctions=require('./auth-functions');
var con=db.connect();



module.exports = {
    getUsers: function (req, res) {
        var con=db.connect();
        var token = authFunctions.getUserFromToken(req.headers.authorization);
        var obj = {
            operation: req.originalUrl,
            success: false,
            date: new Date().toISOString(),
            user: token.user.username
        }
        con.query("SELECT username FROM user", function (err, result, fields) {
            if (err) throw err;
            obj.success = true;
            res.send(result);
        });
        authFunctions.printOperation(obj);
    },
    deleteUser: function (req, res) {
        var con=db.connect();
        console.log("sono entrato dentro il table");
        var token = authFunctions.getUserFromToken(req.headers.authorization);
        var obj = {
            operation: req.originalUrl,
            success: false,
            date: new Date().toISOString(),
            user: token.user.username
        }
        var usernameToDelete = req.originalUrl.split('/')[3];
        con.query("DELETE FROM user WHERE username='" + usernameToDelete + "'", function (err, result, fields) {
            if (err) throw err;
            obj.success = true;
            res.status(200).send();
        });
        authFunctions.printOperation(obj);
    },
    getGeneral: function (req, res) {
        console.log("chiamata: "+req.originalUrl);
        var obj = {
            operation: req.originalUrl,
            success: false,
            date: new Date().toISOString(),
            user: req.user.user.username
        }
        http.get(endpoint + req.originalUrl, (resServer) => {
            resServer.setEncoding('utf8');
            resServer.on('data', function (chunk) {
                res.send(chunk);
            });
        });
        obj.success = true;
        console.log(obj);
        authFunctions.printOperation(obj);
    },
    getCertificationPerStudent: function (req, res) {
        http.get(endpoint+"/Certification",(resServer)=>{
            resServer.setEncoding('utf8');
            resServer.on('data',function(chunk){
                var certifications=JSON.parse(chunk);
                var filterCertifications=_.where(certifications,{student : "resource:ch.supsi.Student#"+req.originalUrl.split('/')[2]});
                var arrayCertification=[]
                for(var c in filterCertifications){
                    var obj={}
                    obj.name=filterCertifications[c].module.split('#')[1];
                    obj.grade=filterCertifications[c].grade;
                    arrayCertification.push(obj);
                }
                res.send(JSON.parse(JSON.stringify(arrayCertification)));
                
            })
        })
    },
    getPerId: function (req, res) {
        console.log("OPERAZIONE "+req.originalUrl+" IN CORSO ...");
        var token = authFunctions.getUserFromToken(req.headers.authorization);
        var obj = {
            operation: req.originalUrl,
            success: false,
            date: new Date().toISOString(),
            user: token.user.username
        }
        if (authFunctions.checkTokenValidity(req.headers.authorization)) {
            http.get(endpoint + req.originalUrl, (resServer) => {
                resServer.setEncoding('utf8');
                resServer.on('data', function (chunk) {
                    res.send(chunk);
                });
            });
            obj.success = true;
        }
        authFunctions.printOperation(obj);
    },
    putGeneral : function (req, res) {
        var token = authFunctions.getUserFromToken(req.headers.authorization);
        var obj = {
            operation: req.originalUrl,
            success: false,
            date: new Date().toISOString(),
            user: token.user.username
        }
        if (authFunctions.checkTokenValidity(req.headers.authorization)) {
            var options = {
                host: 'localhost',
                path: endpoint + req.originalUrl,
                port: 3000,
                method: 'PUT',
                "headers": {
                    "Content-Type": "application/json",
                }
            };
            var callback = function (response) {
                var str = '';
    
                //another chunk of data has been recieved, so append it to `str`
                response.on('data', function (chunk) {
                    str += chunk;
                });
    
                //the whole response has been recieved, so we just print it out here
                response.on('end', function () {
                    res.send(str);
                });
            };
            http.request(options, callback).end(JSON.stringify(req.body));
            obj.success = true;
        }
        authFunctions.printOperation(obj);
    },
    deleteById : function (req, res) {
        var token = authFunctions.getUserFromToken(req.headers.authorization);
        var obj = {
            operation: req.originalUrl,
            success: false,
            date: new Date().toISOString(),
            user: token.user.username
        }
        if (authFunctions.checkTokenValidity(req.headers.authorization)) {
            var options = {
                host: 'localhost',
                path: endpoint + req.originalUrl,
                port: 3000,
                method: 'DELETE',
            };
            var callback = function (response) {
                res.status(204).send();
            };
            http.request(options, callback).end();
            obj.success = true;
        }
        authFunctions.printOperation(obj);
    },
    register: function (req,res){
        var con=db.connect();
        var token = authFunctions.getUserFromToken(req.headers.authorization);
        var obj = {
            operation: req.originalUrl,
            success: false,
            date: new Date().toISOString(),
            user: token.user.username
        }
        if (authFunctions.checkTokenValidity(req.headers.authorization)) {
            console.log('REGISTRAZIONE IN CORSO ...');
            var salt = crypt.generateSalt();
            var hashedPassword=crypt.crypt(req.body.password,salt);
            con.query("INSERT INTO user VALUES ('" + req.body.name + "','" + req.body.surname + "','" + req.body.username + "','" + hashedPassword.passwordHash + "','" + req.body.role + "','" + hashedPassword.salt + "');",
                function (err, result, fields) {
                    if (err) throw err;
                    obj.success=true;
                    console.log("   RECORD INSERITO");
                    
                });
    
        }
        authFunctions.printOperation(obj);
    },
    login: function (req, res) {
        var con=db.connect();
        console.log('LOGIN IN CORSO ...');
        con.query("SELECT * FROM user where username='" + req.body.username + "'", function (err, result, fields) {
            if (err) throw err;
            if (result.length > 0) {
                var user = result[0]; 
                var hashedPassword = crypt.crypt(req.body.password,user.salt);
                if (user.password === hashedPassword.passwordHash) {
                    var claims = user;
                    var token = jwt.sign({ user: claims }, { secret }.secret, { expiresIn: '2h' });
                    res.send({ token });
                    console.log("   LOGIN AVVENUTO CON SUCCESSO.")
                } else {
                    res.status(400).send();
                }
            } else {
                res.status(400).send();
            }
        });
    },
    postCustomTransaction: function (req, res) {
        console.log('richiesta ' + req.originalUrl + ' è avvenuta');
            var token = authFunctions.getUserFromToken(req.headers.authorization);
            var obj = {
                operation: req.originalUrl,
                success: false,
                date: new Date().toISOString(),
                user: token.user.username
            }
            if (authFunctions.checkTokenValidity(req.headers.authorization)) {
                var options = {
                    host: 'localhost',
                    path: endpoint + req.originalUrl,
                    port: 3000,
                    method: 'POST',
                    "headers": {
                        "Content-Type": "application/json",
                    }
                };
                var callback = function (response) {
                    var str = '';
    
                    //another chunk of data has been recieved, so append it to `str`
                    response.on('data', function (chunk) {
                        str += chunk;
                    });
    
                    //the whole response has been recieved, so we just print it out here
                    response.on('end', function () {
                        res.send(str);
                    });
                };
                http.request(options, callback).end(JSON.stringify(req.body));
                obj.success = true;
            }
        
        authFunctions.printOperation(obj);
    }
}
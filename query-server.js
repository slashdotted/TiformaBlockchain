var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var cors = require('cors');
var upload = require('./attachment');
var query = require('./query-server');
const fs = require('fs');
//var accessToken = '?access_token=yvB5imJivOSf5gIHr6a0J1cVSwF6LWK9ppfIfxNUAMcpjPbnvve9KsmMUXzt7gfJ';
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
var authFunction = require ('./auth-functions');

//configuro l'express jwt
app.use(
    expressJwt({
        secret: {secret}.secret

    }).unless({path:['/login']})
);



module.exports = {
    getStudentsByName: function (req, res) {
        var searchValue=req.query.paramName;
        console.log(searchValue);
        var token = authFunction.getUserFromToken(req.headers.authorization);
        var obj = {
            operation: req.originalUrl,
            success: false,
            date: new Date().toISOString(),
            user: token.user.username
        }
        http.get(endpoint + "/Student", (resServer) => {
            resServer.setEncoding('utf8');
            resServer.on('data', function (chunk) {
                var filtered =[];
                var array=JSON.parse(chunk);
                for(var i in array){
                    if(array[i].name.includes(searchValue)){
                        filtered.push(array[i]);
                    }
                }
                res.send(filtered);
            });
        });
        obj.success = true;
        authFunction.printOperation(obj);
    },

    getStudentsBySurname: function (req, res) {
        var searchValue=req.query.paramSurname;
        console.log(searchValue);
        var token = authFunction.getUserFromToken(req.headers.authorization);
        var obj = {
            operation: req.originalUrl,
            success: false,
            date: new Date().toISOString(),
            user: token.user.username
        }
        http.get(endpoint + "/Student", (resServer) => {
            resServer.setEncoding('utf8');
            resServer.on('data', function (chunk) {
                var filtered =[];
                var array=JSON.parse(chunk);
                for(var i in array){
                    if(array[i].surname.includes(searchValue)){
                        filtered.push(array[i]);
                    }
                }
                res.send(filtered);
            });
        });
        obj.success = true;
        authFunction.printOperation(obj);
    },

    getStudentsBySerialNumber :function (req, res) {
        var searchValue=req.query.paramSerialNumber;
        console.log(searchValue);
        var token = authFunction.getUserFromToken(req.headers.authorization);
        var obj = {
            operation: req.originalUrl,
            success: false,
            date: new Date().toISOString(),
            user: token.user.username
        }
        http.get(endpoint + "/Student", (resServer) => {
            resServer.setEncoding('utf8');
            resServer.on('data', function (chunk) {
                var filtered =[];
                var array=JSON.parse(chunk);
                for(var i in array){
                    if(array[i].serialNumber.includes(searchValue)){
                        filtered.push(array[i]);
                    }
                }
                res.send(filtered);
            });
        });
        obj.success = true;
        authFunction.printOperation(obj);
    },

    getDepartmentsByName: function (req, res) {
        var searchValue=req.query.paramName;
        console.log(searchValue);
        var token = authFunction.getUserFromToken(req.headers.authorization);
        var obj = {
            operation: req.originalUrl,
            success: false,
            date: new Date().toISOString(),
            user: token.user.username
        }
        http.get(endpoint + "/Department", (resServer) => {
            resServer.setEncoding('utf8');
            resServer.on('data', function (chunk) {
                var filtered =[];
                var array=JSON.parse(chunk);
                for(var i in array){
                    if(array[i].name.includes(searchValue)){
                        filtered.push(array[i]);
                    }
                }
                res.send(filtered);
            });
        });
        obj.success = true;
        authFunction.printOperation(obj);
    },

    getCoursesByName: function (req, res) {
        var searchValue=req.query.paramName;
        console.log(searchValue);
        var token = authFunction.getUserFromToken(req.headers.authorization);
        var obj = {
            operation: req.originalUrl,
            success: false,
            date: new Date().toISOString(),
            user: token.user.username
        }
        http.get(endpoint + "/Course", (resServer) => {
            resServer.setEncoding('utf8');
            resServer.on('data', function (chunk) {
                var filtered =[];
                var array=JSON.parse(chunk);
                for(var i in array){
                    if(array[i].name.includes(searchValue)){
                        filtered.push(array[i]);
                    }
                }
                res.send(filtered);
            });
        });
        obj.success = true;
        authFunction.printOperation(obj);
    },

    getCoursesByCourseCode: function (req, res) {
        var searchValue=req.query.paramCourseCode;
        console.log(searchValue);
        var token = authFunction.getUserFromToken(req.headers.authorization);
        var obj = {
            operation: req.originalUrl,
            success: false,
            date: new Date().toISOString(),
            user: token.user.username
        }
        http.get(endpoint + "/Course", (resServer) => {
            resServer.setEncoding('utf8');
            resServer.on('data', function (chunk) {
                var filtered =[];
                var array=JSON.parse(chunk);
                for(var i in array){
                    if(array[i].courseCode.includes(searchValue)){
                        filtered.push(array[i]);
                    }
                }
                res.send(filtered);
            });
        });
        obj.success = true;
        authFunction.printOperation(obj);
    },

    getModulesByName: function (req, res) {
        var searchValue=req.query.paramName;
        console.log(searchValue);
        var token = authFunction.getUserFromToken(req.headers.authorization);
        var obj = {
            operation: req.originalUrl,
            success: false,
            date: new Date().toISOString(),
            user: token.user.username
        }
        http.get(endpoint + "/Module", (resServer) => {
            resServer.setEncoding('utf8');
            resServer.on('data', function (chunk) {
                var filtered =[];
                var array=JSON.parse(chunk);
                for(var i in array){
                    if(array[i].name.includes(searchValue)){
                        filtered.push(array[i]);
                    }
                }
                res.send(filtered);
            });
        });
        obj.success = true;
        authFunction.printOperation(obj);
    },

    getModulesByModuleCode: function (req, res) {
        var searchValue=req.query.paramModuleCode;
        console.log(searchValue);
        var token = authFunction.getUserFromToken(req.headers.authorization);
        var obj = {
            operation: req.originalUrl,
            success: false,
            date: new Date().toISOString(),
            user: token.user.username
        }
        http.get(endpoint + "/Module", (resServer) => {
            resServer.setEncoding('utf8');
            resServer.on('data', function (chunk) {
                var filtered =[];
                var array=JSON.parse(chunk);
                for(var i in array){
                    if(array[i].moduleCode.includes(searchValue)){
                        filtered.push(array[i]);
                    }
                }
                res.send(filtered);
            });
        });
        obj.success = true;
        authFunction.printOperation(obj);
    },
//formazione
    getStudentModulesByName: function (req, res) {
        var searchValue=req.query.paramstudyplanName;
        console.log(searchValue);
        var token = authFunction.getUserFromToken(req.headers.authorization);
        var obj = {
            operation: req.originalUrl,
            success: false,
            date: new Date().toISOString(),
            user: token.user.username
        }
        http.get(endpoint + "/StudyPlan", (resServer) => {
            resServer.setEncoding('utf8');
            resServer.on('data', function (chunk) {
                var filtered =[];
                var array=JSON.parse(chunk);
                for(var i in array){
                    if(array[i].name.includes(searchValue)){
                        filtered.push(array[i]);
                    }
                }
                res.send(filtered);
            });
        });
        obj.success = true;
        authFunction.printOperation(obj);
    },

    getStudentModulesByModuleCode: function (req, res) {
        var searchValue=req.query.paramModuleCode;
        var token = authFunction.getUserFromToken(req.headers.authorization);
        var obj = {
            operation: req.originalUrl,
            success: false,
            date: new Date().toISOString(),
            user: token.user.username
        }
        http.get(endpoint + "/StudyPlan", (resServer) => {
            resServer.setEncoding('utf8');
            resServer.on('data', function (chunk) {
                var filtered = [];
                var array = JSON.parse(chunk);
                for (var i in array) {
                    for (var k in array[i].modules) {
                        if (array[i].modules[k].includes(searchValue)) {
                            filtered.push(array[i]);
                        }
                    }
                }
                res.send(filtered);
            });
        });
        obj.success = true;
        authFunction.printOperation(obj);
    },

    getSemestersByName: function (req, res) {
        var searchValue=req.query.paramName;
        console.log(searchValue);
        var token = authFunction.getUserFromToken(req.headers.authorization);
        var obj = {
            operation: req.originalUrl,
            success: false,
            date: new Date().toISOString(),
            user: token.user.username
        }
        http.get(endpoint + "/Semester", (resServer) => {
            resServer.setEncoding('utf8');
            resServer.on('data', function (chunk) {
                var filtered =[];
                var array=JSON.parse(chunk);
                for(var i in array){
                    if(array[i].name.includes(searchValue)){
                        filtered.push(array[i]);
                    }
                }
                res.send(filtered);
            });
        });
        obj.success = true;
        authFunction.printOperation(obj);
    },

    getSemestersByModuleCode: function (req, res) {
        var searchValue=req.query.paramModuleCode;
        var token = authFunction.getUserFromToken(req.headers.authorization);
        var obj = {
            operation: req.originalUrl,
            success: false,
            date: new Date().toISOString(),
            user: token.user.username
        }
        http.get(endpoint + "/Semester", (resServer) => {
            resServer.setEncoding('utf8');
            resServer.on('data', function (chunk) {
                var filtered = [];
                var array = JSON.parse(chunk);
                for (var i in array) {
                    for (var k in array[i].modules) {
                        if (array[i].modules[k].includes(searchValue)) {
                            filtered.push(array[i]);
                        }
                    }
                }
                res.send(filtered);
            });
        });
        obj.success = true;
        authFunction.printOperation(obj);

    },

    getCertificationByStudentName :function (req, res) {
        var searchValue=req.query.paramStudentName;
        var token = authFunction.getUserFromToken(req.headers.authorization);
        var obj = {
            operation: req.originalUrl,
            success: false,
            date: new Date().toISOString(),
            user: token.user.username
        }
        
        
        http.get(endpoint + "/Certification", (resServer1) => {



            resServer1.setEncoding('utf8');
            resServer1.on('data', function (chunk1) {

                http.get(endpoint + "/Student", (resServer2) => {
                    resServer2.setEncoding('utf8');
                    resServer2.on('data', function (chunk2) {
                        var students = JSON.parse(chunk2);
                        var filteredStudents = [];
                        var certifications = JSON.parse(chunk1);
                        var filteredCertification=[];
                        for (var i in students) {
                            if(students[i].name.includes(searchValue)){
                                
                                var temp=_.where(certifications,{student: "resource:ch.supsi.Student#"+students[i].contactID });
                                for(var c in temp){
                                    filteredCertification.push(certifications[c]);

                                }
                            }
                        }
                        res.send(filteredCertification);
                    });
                });               
            });
        });
        obj.success = true;
        authFunction.printOperation(obj);
    },
    getCertificationByStudentSurname : function (req, res) {
        var searchValue=req.query.paramStudentSurname;
        var token = authFunction.getUserFromToken(req.headers.authorization);
        var obj = {
            operation: req.originalUrl,
            success: false,
            date: new Date().toISOString(),
            user: token.user.username
        }
        
        
        http.get(endpoint + "/Certification", (resServer1) => {



            resServer1.setEncoding('utf8');
            resServer1.on('data', function (chunk1) {

                http.get(endpoint + "/Student", (resServer2) => {
                    resServer2.setEncoding('utf8');
                    resServer2.on('data', function (chunk2) {
                        var students = JSON.parse(chunk2);
                        var filteredStudents = [];
                        var certifications = JSON.parse(chunk1);
                        var filteredCertification=[];
                        for (var i in students) {
                            if(students[i].surname.includes(searchValue)){
                                
                                var temp=_.where(certifications,{student: "resource:ch.supsi.Student#"+students[i].contactID });
                                for(var c in temp){
                                    filteredCertification.push(certifications[c]);

                                }
                            }
                        }
                        res.send(filteredCertification);
                    });
                });               
            });
        });
        obj.success = true;
        authFunction.printOperation(obj);
    },
    getCertificationByStudentModuleCode : function (req, res) {
        var searchValue=req.query.paramModuleCode;
        var token = authFunction.getUserFromToken(req.headers.authorization);
        var obj = {
            operation: req.originalUrl,
            success: false,
            date: new Date().toISOString(),
            user: token.user.username
        }
        http.get(endpoint + "/Certification", (resServer) => {
            resServer.setEncoding('utf8');
            resServer.on('data', function (chunk) {
                var filtered = [];
                var array = JSON.parse(chunk);
                for (var i in array) {
                    for (var k in array[i].modules) {
                        if (array[i].modules[k].includes(searchValue)) {
                            filtered.push(array[i]);
                        }
                    }
                }
                res.send(filtered);
            });
        });
        obj.success = true;
        authFunction.printOperation(obj);

    }
}
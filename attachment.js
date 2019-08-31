const IncomingForm = require('formidable').IncomingForm;
var fs = require('fs');
var http = require('http');
var endpoint = 'http://localhost:3000/api';
var secretPublicKey = 'todo-app-super-shared-secret';
var jwt = require('jsonwebtoken');
var authFunctions=require('./auth-functions');

module.exports = {
    upload: function upload(req, res) {
        var token = authFunctions.getUserFromToken(req.headers.authorization);
        var obj = {
            operation: req.originalUrl,
            success: false,
            user: token.user.username
        }
        if (authFunctions.checkTokenValidity(req.headers.authorization)) {

            console.log('Upload process executing');
            var filename = req.body.name;
            var contactID = req.originalUrl.split('/')[1];
            console.log(req.body);
            if (!fs.existsSync('./uploads/' + contactID)) {
                fs.mkdirSync('./uploads/' + contactID);
            }


            var form = new IncomingForm();
            console.log('Upload process executing');

            form.on('file', (field, file) => {

                
                filename = file.name;
                console.log(filename);
                fs.copyFile(file.path, './uploads/' + contactID + '/' + filename, (err) => {
                    if (err) throw err;
                    console.log(file.name + ' has been created!');
                });
            });

            

            http.get(endpoint + "/Student/" + contactID, (resServer) => {
                resServer.setEncoding('utf8');
                resServer.on('data', function (chunk) {
                    var student = JSON.parse(chunk);
                    if (student.attachments.indexOf(filename) == -1) {
                        console.log(filename);
                        student.attachments.push(filename);
                    }

                    var options = {
                        host: 'localhost',
                        path: endpoint + "/Student/" + contactID,
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
                            console.log(str);
                        });
                    };
                    http.request(options, callback).end(JSON.stringify(student));

                });
            });



            form.on('end', () => {
                res.status(200).send();
            });
            form.parse(req);
            obj.success = true;
        }
        authFunctions.printOperation(JSON.stringify(obj));
    },
    download: function (request, response) {
        
       
            console.log('Entered');
            var arrayURL = request.originalUrl.split('/');
            var filename = arrayURL[arrayURL.length - 1];
            var contactID = request.originalUrl.split('/')[1];
            response.sendFile(__dirname + '/uploads/' + contactID + '/' + filename);
            
        
        
    },
    remove: function (request, response) {
        console.log("chiamato");
        var token = authFunctions.getUserFromToken(request.headers.authorization);
        var obj = {
            operation: request.originalUrl,
            success: false,
            date: new Date().toISOString(),
            user: token.user.username
        }
        if (authFunctions.checkTokenValidity(request.headers.authorization)) {
            console.log("Starting remove operation");
            var arrayURL = request.originalUrl.split('/');
            var filename = arrayURL[arrayURL.length - 1];
            var contactID = request.originalUrl.split('/')[1];
            //rimuovere file dal disco del server
            const pathFileToDelete = __dirname + "/uploads/" + contactID + "/" + filename;
            try {
                fs.unlinkSync(pathFileToDelete); //file removed
                http.get(endpoint + "/Student/" + contactID, (resServer) => {
                    resServer.setEncoding('utf8');
                    resServer.on('data', function (chunk) {
                        var student = JSON.parse(chunk);
                        if (student.attachments.indexOf(filename) != -1) {
    
                            student.attachments.splice(student.attachments.indexOf(filename), 1);
    
                        }
    
                        var options = {
                            host: 'localhost',
                            path: endpoint + "/Student/" + contactID,
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
    
                            });
                        };
                        http.request(options, callback).end(JSON.stringify(student));
    
                    });
                });
                response.status(200).send();
            } catch (err) {
                console.log(err);
                response.status(400).send();
            }
    
            //aggiornare il rest server eliminando il nome
            obj.success = true;
        }
        authFunctions.printOperation(obj);
    }

}
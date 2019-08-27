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
var api = require('./api');

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//configuro l'express jwt
app.use(
    expressJwt({
        secret: {secret}.secret

    }).unless({path:['/login']})
);

//ruoli disponibili al momento
var view_operation_roles = ['Admin', 'Professore','Studente'];
var modify_operation_roles = ['Admin'];

function authorize(roles=[]){
// roles param can be a single role string (e.g. Role.User or 'User') 
    // or an array of roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])
    if (typeof roles === 'string') {
        roles = [roles];
    }
    return [
        // authenticate JWT token and attach user to request object (req.user)
        
        expressJwt( {secret} ),

        // authorize based on user role
        (req, res, next) => {
            console.log("USER INSIDE AUTHORIZE: "+JSON.stringify(req.user.user));
            if (roles.length && !roles.includes(req.user.user.role)) {
                
                // user's role is not authorized
               
                return res.status(401).json({ message: 'Unauthorized' });
            }
            console.log("authorization success");
            // authentication and authorization successful
            next();
        }
    ];
}


function printOperation(text) {
    fs.readFile('log/log.json', function (err, data) {
        var json = JSON.parse(data)
        json.push(text);
    
        fs.writeFile("log/log.json", JSON.stringify(json))
    })
}

function checkTokenValidity(t) {
    try {
        jwt.verify(t.split(' ')[1], {secret}.secret);
        //nel caso di validità
        return true;
    } catch (err) {
        return false;
        //in caso di non validità
    }
}
app.listen(8080, function () {
    console.log('listening on port 8080!');
    // effettuo connessione al server phpmyadmin per connettermi al db con all'interno le utenze
    con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "TiformaSupsiBlockchain_schema"
    })

    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
    });

});

function getUserFromToken(t) {
    
    return jwt.verify(t.split(' ')[1], {secret}.secret, { complete: true }).payload;
}
app.get('/users',authorize('Admin'),function(req,res){
    
    var token = getUserFromToken(req.headers.authorization);
    var obj = {
        operation: req.originalUrl,
        success: false,
        date: new Date().toISOString(),
        user: token.user.username
    }
    con.query("SELECT username FROM user",function (err,result,fields){
        if(err) throw err;
        obj.success=true;
        res.send(result);
    });
    printOperation(obj);
});

app.get('/users/delete/[a-zA-Z]+',authorize('Admin'),function(req,res){
    console.log("sono entrato dentro il table");
    var token = getUserFromToken(req.headers.authorization);
    var obj = {
        operation: req.originalUrl,
        success: false,
        date: new Date().toISOString(),
        user: token.user.username
    }
    var usernameToDelete=req.originalUrl.split('/')[3];
    con.query("DELETE FROM user WHERE username='"+ usernameToDelete +"'",function (err,result,fields){
        if(err) throw err;
        obj.success=true;
        res.status(200).send();
    });
    printOperation(obj);
});

app.get('/queries/selectStudentByName?[a-zA-Z]+', authorize(view_operation_roles),query.getStudentsByName);
app.get('/queries/selectStudentsBySurname?[a-zA-Z]+', authorize(view_operation_roles),query.getStudentsBySurname);
app.get('/queries/selectStudentsBySerialNumber?[a-zA-Z]+', authorize(view_operation_roles),query.getStudentsBySerialNumber);
app.get('/queries/selectDepartmentByName?[a-zA-Z]+', authorize(view_operation_roles),query.getDepartmentsByName);
app.get('/queries/selectCoursesByName?[a-zA-Z]+', authorize(view_operation_roles),query.getCoursesByName);
app.get('/queries/selectCoursesByCourseCode?[a-zA-Z]+', authorize(view_operation_roles),query.getCoursesByCourseCode);
app.get('/queries/selectModulesByName?[a-zA-Z]+', authorize(view_operation_roles),query.getModulesByName);
app.get('/queries/selectModulesByModuleCode?[a-zA-Z]+', authorize(view_operation_roles),query.getModulesByModuleCode);
app.get('/queries/selectStudyPlanByName?[a-zA-Z]+', authorize(view_operation_roles),query.getStudentModulesByName);
app.get('/queries/selectStudyPlanByModuleCode?[a-zA-Z]+', authorize(view_operation_roles),query.getStudentModulesByModuleCode);
app.get('/queries/selectSemestersByName?[a-zA-Z]+', authorize(view_operation_roles),query.getSemestersByName);
app.get('/queries/selectSemestersByModuleCode?[a-zA-Z]+', authorize(view_operation_roles),query.getSemestersByModuleCode);
app.get('/queries/selectCertificationByStudentName?[a-zA-Z]+', authorize(view_operation_roles),query.getCertificationByStudentName);
app.get('/queries/selectCertificationByStudentSurame?[a-zA-Z]+', authorize(view_operation_roles),query.getCertificationByStudentSurname);
app.get('/queries/selectCertificationByModuleCode?[a-zA-Z]+', authorize(view_operation_roles),query.getCertificationByStudentModuleCode);

// Ritorna tutti gli elementi, esempio http://localhost:3000/api/Student
app.get('/[a-zA-Z]+', authorize(view_operation_roles), function (req, res) {
    console.log("ciao sono qui");
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
    printOperation(obj);
});
app.get('/CertificationPerStudent/[0-9a-zA-Z]+', authorize(view_operation_roles), function (req, res) {
    http.get(endpoint+"/Certification",(resServer)=>{
        resServer.setEncoding('utf8');
        resServer.on('data',function(chunk){
            var certifications=JSON.parse(chunk);
            var filterCertifications=_.where(certifications,{student : "resource:ch.supsi.Student#"+req.originalUrl.split('/')[2]});
            var arrayCertification=[]
            for(var c in filterCertifications){
                var obj={}
                //console.log(certifications[c].certificationID);
                obj.name=filterCertifications[c].module.split('#')[1];
                obj.grade=filterCertifications[c].grade;
                arrayCertification.push(obj);
            }
            //console.log(JSON.parse(JSON.stringify(arrayCertification)));
            res.send(JSON.parse(JSON.stringify(arrayCertification)));
            
        })
    })
});

// Ritorna un singolo elemento selezionato dall'ID, esempio http://localhost:3000/api/Student/5
app.get('/[a-zA-Z]+/[0-9a-zA-Z]+', authorize(view_operation_roles), function (req, res) {
    console.log(req.originalUrl);
    var token = getUserFromToken(req.headers.authorization);
    var obj = {
        operation: req.originalUrl,
        success: false,
        date: new Date().toISOString(),
        user: token.user.username
    }
    if (checkTokenValidity(req.headers.authorization)) {
        http.get(endpoint + req.originalUrl, (resServer) => {
            resServer.setEncoding('utf8');
            resServer.on('data', function (chunk) {
                res.send(chunk);
            });
        });
        obj.success = true;
    }
    printOperation(obj);
});

// Aggiorna un singolo elemento selezionato dall'ID passandoli un oggetto JSON, esempio http://localhost:3000/api/Student/5
app.put('/[a-zA-Z]+/[0-9a-zA-Z]+', authorize(modify_operation_roles), function (req, res) {
    var token = getUserFromToken(req.headers.authorization);
    var obj = {
        operation: req.originalUrl,
        success: false,
        date: new Date().toISOString(),
        user: token.user.username
    }
    if (checkTokenValidity(req.headers.authorization)) {
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
    printOperation(obj);
});

// Elimina un singolo elemento selezionato dall'ID, esempio http://localhost:3000/api/Student/5
app.delete('/[a-zA-Z]+/[0-9a-zA-Z]+', authorize(modify_operation_roles), function (req, res) {
    var token = getUserFromToken(req.headers.authorization);
    var obj = {
        operation: req.originalUrl,
        success: false,
        date: new Date().toISOString(),
        user: token.user.username
    }
    if (checkTokenValidity(req.headers.authorization)) {
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
    printOperation(obj);
});

app.post('/register',authorize('Admin'),function (req,res){
    var token = getUserFromToken(req.headers.authorization);
    var obj = {
        operation: req.originalUrl,
        success: false,
        date: new Date().toISOString(),
        user: token.user.username
    }
    if (checkTokenValidity(req.headers.authorization)) {
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
    printOperation(obj);
});

app.post('/login', function (req, res) {
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
});
// Esegue le transazioni custom create passandoli un elemento JSON, esempio http://localhost:3000/api/CreateStudent
app.post('/[a-zA-Z]+', authorize(modify_operation_roles), function (req, res) {


    console.log('richiesta ' + req.originalUrl + ' è avvenuta');
    console.log("REQUEST PATH"+endpoint + req.originalUrl);
        var token = getUserFromToken(req.headers.authorization);
        var obj = {
            operation: req.originalUrl,
            success: false,
            date: new Date().toISOString(),
            user: token.user.username
        }
        if (checkTokenValidity(req.headers.authorization)) {
            // gestisco le altre richieste
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
    
    printOperation(obj);
});

//Esegue l'upload dei file come foto e allegati url prende /contactID/upload/nomefile.estensione
app.post('/[a-zA-Z0-9]+/Upload', authorize(modify_operation_roles), upload);
//Permette di scaricare un file precedentemente caricato
app.get('/[a-zA-Z0-9]+/Download/[a-zA-Z]+\.[a-zA-Z]+', authorize(view_operation_roles), function (request, response) {
    var token = getUserFromToken(req.headers.authorization);
    var obj = {
        operation: req.originalUrl,
        success: false,
        date: new Date().toISOString(),
        user: token.user.username
    }
    if (checkTokenValidity(req.headers.authorization)) {
        console.log('Entered');
        var arrayURL = request.originalUrl.split('/');
        var filename = arrayURL[arrayURL.length - 1];
        var contactID = request.originalUrl.split('/')[1];
        response.sendFile(__dirname + '/uploads/' + contactID + '/' + filename);
        obj.success = true;
    }
    printOperation(obj);
});

app.get('/[a-zA-Z0-9]+/Delete/[a-zA-Z]+\.[a-zA-Z]+', authorize(modify_operation_roles), function (request, response) {
    var token = getUserFromToken(req.headers.authorization);
    var obj = {
        operation: req.originalUrl,
        success: false,
        date: new Date().toISOString(),
        user: token.user.username
    }
    if (checkTokenValidity(req.headers.authorization)) {
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
    printOperation(obj);
});




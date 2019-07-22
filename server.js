var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
var endpoint = 'http://localhost:3000/api';


app.listen(8080, function () {
    console.log('listening on port 8080!');

});

// Ritorna tutti gli elementi, esempio http://localhost:3000/api/Student
app.get('/[a-zA-Z]+', function (req, res) {
    http.get(endpoint + req.originalUrl, (resServer) => {
        resServer.setEncoding('utf8');
        resServer.on('data', function (chunk) {
            res.send(chunk);
        });
    });
});

// Ritorna un singolo elemento selezionato dall'ID, esempio http://localhost:3000/api/Student/5
app.get('/[a-zA-Z]+/[0-9a-zA-Z]+', function (req, res) {
    http.get(endpoint + req.originalUrl, (resServer) => {
        resServer.setEncoding('utf8');
        resServer.on('data', function (chunk) {
            res.send(chunk);
        });
    
    });
});

// Aggiorna un singolo elemento selezionato dall'ID passandoli un oggetto JSON, esempio http://localhost:3000/api/Student/5
app.put('/[a-zA-Z]+/[0-9a-zA-Z]+', function (req, res) {
    var options = {
        host: 'localhost',
        path: endpoint + req.originalUrl,
        port: 3000,
        method: 'PUT',
        "headers": { 
            "Content-Type" : "application/json",
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
});

// Elimina un singolo elemento selezionato dall'ID, esempio http://localhost:3000/api/Student/5
app.delete('/[a-zA-Z]+/[0-9a-zA-Z]+', function (req, res) {
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
});

// Esegue le transazioni custom create passandoli un elemento JSON, esempio http://localhost:3000/api/CreateStudent
app.post('/[a-zA-Z]+', function (req, res) {
    var options = {
        host: 'localhost',
        path: endpoint + req.originalUrl,
        port: 3000,
        method: 'POST',
        "headers": { 
            "Content-Type" : "application/json",
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
});